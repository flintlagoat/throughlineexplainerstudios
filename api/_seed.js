// POST /api/_seed — WORKER-ONLY: seed a job straight into the QUEUED state (skips Stripe) so the
// full build→preview→deliver path can be validated end-to-end without a live charge. Gated by
// WORKER_SECRET; harmless if the secret leaks only in that it lets someone spend our render time.
// Body: { secret, url, tier?, archetype?, name?, oneLiner?, assetMix?, aspectPick?, unlock? }

const J = require('./_jobs');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }
  if (!J.configured()) { res.status(501).json({ error: 'queue_not_configured' }); return; }
  if (!J.workerAuthed(req)) { res.status(403).json({ error: 'forbidden' }); return; }

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (_) { b = {}; } }
  b = b || {};

  const tier = J.TIERS[b.tier] ? b.tier : 'standard';
  const t = J.TIERS[tier];
  const url = J.clean(b.url, 300).trim() || 'https://linear.app';

  let aspects = ['16:9'];
  if (t.aspects === 3) aspects = J.ASPECTS.slice();
  else if (t.aspects === 2) aspects = ['16:9', J.ASPECTS.includes(b.aspectPick) && b.aspectPick !== '16:9' ? b.aspectPick : '9:16'];

  const job = {
    id: J.newId(),
    created: new Date().toISOString(),
    status: 'queued', stage: 'queued',
    tier, aspects,
    email: 'seed@throughlineexplainers.com',
    paidAt: new Date().toISOString(), seeded: true,
    intake: {
      url, name: J.clean(b.name, 80), oneLiner: J.clean(b.oneLiner, 220), notes: '',
      palette: b.palette && b.palette.primary ? { primary: J.clean(b.palette.primary, 9) } : null,
      archetype: J.ARCHETYPES.includes(b.archetype) ? b.archetype : 'blueprint_board',
      assetMix: Math.max(0, Math.min(100, Number(b.assetMix != null ? b.assetMix : 65) || 65)),
      uploads: [],
    },
    restylesUsed: 0, tweaksUsed: 0,
  };
  if (b.unlock) { job.unlockPaid = true; } // seed can also pre-authorize the delivery test
  await J.putJob(job);
  await J.enqueue(job.id, !!t.priority);
  res.status(200).json({ jobId: job.id, status: job.status });
};
