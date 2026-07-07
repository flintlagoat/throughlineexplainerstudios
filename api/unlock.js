// POST /api/unlock — Stripe Checkout for the final-files unlock (additional to the preview fee).
// Body: { id } → { url }. Success lands back on /watch?job=ID&unlock_session={CHECKOUT_SESSION_ID}.

const Stripe = require('stripe');
const J = require('./_jobs');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }
  if (!J.configured()) { res.status(501).json({ error: 'queue_not_configured' }); return; }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) { res.status(501).json({ error: 'stripe_not_configured' }); return; }

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (_) { b = {}; } }
  const job = await J.getJob(String((b && b.id) || ''));
  if (!job) { res.status(404).json({ error: 'not_found' }); return; }
  if (job.unlockPaid) { res.status(409).json({ error: 'already_unlocked' }); return; }
  if (job.status !== 'preview_ready') { res.status(409).json({ error: 'preview_not_ready' }); return; }

  const t = J.TIERS[job.tier];
  const origin = (req.headers.origin && /^https?:\/\//.test(req.headers.origin))
    ? req.headers.origin
    : ('https://' + (req.headers.host || 'throughlineexplainers.com'));

  try {
    const stripe = Stripe(key);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'usd', unit_amount: t.unlockCents,
          product_data: {
            name: 'Throughline Generator — ' + t.name + ' final files',
            description: 'Clean full-res files, no watermark · ' + (job.aspects || []).join(', ') + ' · commercial license',
          },
        },
      }],
      customer_email: /.+@.+\..+/.test(job.email || '') ? job.email : undefined,
      allow_promotion_codes: true,
      metadata: { jobId: job.id, tier: job.tier, kind: 'unlock' },
      success_url: origin + '/watch?job=' + job.id + '&unlock_session={CHECKOUT_SESSION_ID}',
      cancel_url: origin + '/watch?job=' + job.id,
    });
    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: 'stripe_error', message: String((e && e.message) || e) });
  }
};
