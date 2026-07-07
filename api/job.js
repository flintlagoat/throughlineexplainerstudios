// /api/job — job state + transitions.
//
// GET  ?id=tl_xxx[&session=cs_...][&unlock_session=cs_...]
//   Public job view for the watch page. If a Stripe session id is present and the job hasn't
//   been promoted yet, verifies payment server-side (redirect-verify — no webhook needed) and
//   promotes: awaiting_payment→queued, or marks unlock paid → delivering.
//
// POST (browser)  { id, action:'restyle'|'tweak', archetype?|script? }
//   Spends an included restyle/tweak credit and re-queues the job. Paid extras come later.
//
// POST (worker)   { secret, id, patch:{...} }
//   Worker stage/status reports: patch merged, no questions asked (status/stage/preview/finals/
//   error/masters). Auth via WORKER_SECRET.

const Stripe = require('stripe');
const J = require('./_jobs');

async function verifyPaidSession(stripe, sessionId, jobId, kind) {
  try {
    const s = await stripe.checkout.sessions.retrieve(sessionId);
    if (!s || s.payment_status !== 'paid') return null;
    if ((s.metadata && s.metadata.jobId) !== jobId) return null;
    if ((s.metadata && s.metadata.kind) !== kind) return null;
    return s;
  } catch (_) { return null; }
}

module.exports = async function handler(req, res) {
  if (!J.configured()) { res.status(501).json({ error: 'queue_not_configured' }); return; }

  if (req.method === 'GET') {
    const id = String(req.query.id || '');
    const job = await J.getJob(id);
    if (!job) { res.status(404).json({ error: 'not_found' }); return; }

    const key = process.env.STRIPE_SECRET_KEY;
    // promote on first arrival from Stripe success redirect
    if (key && job.status === 'awaiting_payment' && req.query.session) {
      const s = await verifyPaidSession(Stripe(key), String(req.query.session), job.id, 'preview');
      if (s) {
        job.status = 'queued'; job.stage = 'queued';
        job.email = (s.customer_details && s.customer_details.email) || job.email || '';
        job.paidAt = new Date().toISOString();
        await J.putJob(job);
        await J.enqueue(job.id, !!J.TIERS[job.tier].priority);
      }
    }
    if (key && !job.unlockPaid && req.query.unlock_session) {
      const s = await verifyPaidSession(Stripe(key), String(req.query.unlock_session), job.id, 'unlock');
      if (s && job.status === 'preview_ready') {
        job.unlockPaid = true; job.status = 'delivering'; job.stage = 'delivering';
        await J.putJob(job);
        await J.enqueue(job.id, true); // delivery is quick — jump the queue
      }
    }
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(J.publicView(job));
    return;
  }

  if (req.method === 'POST') {
    let b = req.body;
    if (typeof b === 'string') { try { b = JSON.parse(b); } catch (_) { b = {}; } }
    b = b || {};

    // ── worker patch ──
    if (b.secret) {
      if (!J.workerAuthed(req)) { res.status(403).json({ error: 'forbidden' }); return; }
      const job = await J.getJob(String(b.id || ''));
      if (!job) { res.status(404).json({ error: 'not_found' }); return; }
      const p = b.patch || {};
      for (const k of ['status', 'stage', 'preview', 'finals', 'masters', 'error', 'buildMeta']) {
        if (p[k] !== undefined) job[k] = p[k];
      }
      await J.putJob(job);
      res.status(200).json({ ok: true });
      return;
    }

    // ── browser: spend an included restyle / script tweak ──
    const job = await J.getJob(String(b.id || ''));
    if (!job) { res.status(404).json({ error: 'not_found' }); return; }
    if (job.status !== 'preview_ready') { res.status(409).json({ error: 'not_ready' }); return; }
    const t = J.TIERS[job.tier];

    if (b.action === 'restyle') {
      if ((job.restylesUsed || 0) >= t.restyles) { res.status(402).json({ error: 'no_restyles_left' }); return; }
      const arch = J.ARCHETYPES.includes(b.archetype) ? b.archetype : null;
      if (!arch || arch === job.intake.archetype) { res.status(400).json({ error: 'bad_archetype' }); return; }
      job.restylesUsed = (job.restylesUsed || 0) + 1;
      job.intake.archetype = arch;
      job.request = { kind: 'restyle' };
      job.status = 'queued'; job.stage = 'restyling';
      await J.putJob(job);
      await J.enqueue(job.id, !!t.priority);
      res.status(200).json(J.publicView(job));
      return;
    }
    if (b.action === 'tweak') {
      if ((job.tweaksUsed || 0) >= t.tweaks) { res.status(402).json({ error: 'no_tweaks_left' }); return; }
      const script = J.clean(b.script, 2400).trim();
      if (script.split(/\s+/).length < 30) { res.status(400).json({ error: 'script_too_short' }); return; }
      job.tweaksUsed = (job.tweaksUsed || 0) + 1;
      job.request = { kind: 'tweak', script };
      job.status = 'queued'; job.stage = 'revoicing';
      await J.putJob(job);
      await J.enqueue(job.id, !!t.priority);
      res.status(200).json(J.publicView(job));
      return;
    }
    res.status(400).json({ error: 'bad_action' });
    return;
  }

  res.status(405).json({ error: 'method_not_allowed' });
};
