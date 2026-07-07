// POST /api/generate — create a generator job + Stripe Checkout session for the preview fee.
// Body: { tier, url, name?, oneLiner?, palette?{primary,secondary?,accent?}, archetype?,
//         assetMix?(0-100, 0=illustrated 100=product-real), aspects?[...extra picks], uploads?[blobUrls], email? }
// Returns { url } (Stripe) — success lands on /watch?job=ID&session={CHECKOUT_SESSION_ID}.

const Stripe = require('stripe');
const J = require('./_jobs');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }
  if (!J.configured()) { res.status(501).json({ error: 'queue_not_configured' }); return; }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) { res.status(501).json({ error: 'stripe_not_configured' }); return; }

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (_) { b = {}; } }
  b = b || {};

  const tier = J.TIERS[b.tier] ? b.tier : null;
  if (!tier) { res.status(400).json({ error: 'bad_tier' }); return; }
  const t = J.TIERS[tier];

  const url = J.clean(b.url, 300).trim();
  if (!/^https?:\/\/[^ ]+\.[^ ]{2,}/.test(url)) { res.status(400).json({ error: 'bad_url' }); return; }

  // aspects: 16:9 always; Pro adds one pick; Max gets all three.
  let aspects = ['16:9'];
  if (t.aspects === 3) aspects = J.ASPECTS.slice();
  else if (t.aspects === 2) {
    const pick = J.ASPECTS.includes(b.aspectPick) && b.aspectPick !== '16:9' ? b.aspectPick : '9:16';
    aspects = ['16:9', pick];
  }

  const archetype = J.ARCHETYPES.includes(b.archetype) ? b.archetype : 'blueprint_board';
  const assetMix = Math.max(0, Math.min(100, Number(b.assetMix != null ? b.assetMix : 65) || 65));

  const job = {
    id: J.newId(),
    created: new Date().toISOString(),
    status: 'awaiting_payment', stage: 'awaiting_payment',
    tier, aspects,
    intake: {
      url,
      name: J.clean(b.name, 80),
      oneLiner: J.clean(b.oneLiner, 220),
      notes: J.clean(b.notes, 500),
      palette: b.palette && typeof b.palette === 'object' ? {
        primary: J.clean(b.palette.primary, 9), secondary: J.clean(b.palette.secondary, 9), accent: J.clean(b.palette.accent, 9),
      } : null,
      archetype, assetMix,
      uploads: Array.isArray(b.uploads) ? b.uploads.slice(0, 8).map((u) => J.clean(u, 500)).filter((u) => /^https:\/\//.test(u)) : [],
    },
    restylesUsed: 0, tweaksUsed: 0,
  };

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
          currency: 'usd', unit_amount: t.previewCents,
          product_data: {
            name: 'Throughline Generator — ' + t.name + ' preview',
            description: '~' + t.seconds + 's brand-matched explainer preview for ' + job.intake.url + ' · watermarked · ' + aspects.join(', ') + ' on unlock',
          },
        },
      }],
      client_reference_id: job.id,
      customer_email: /.+@.+\..+/.test(J.clean(b.email, 200)) ? J.clean(b.email, 200) : undefined,
      allow_promotion_codes: true,
      metadata: { jobId: job.id, tier, kind: 'preview' },
      success_url: origin + '/watch?job=' + job.id + '&session={CHECKOUT_SESSION_ID}',
      cancel_url: origin + '/generate?canceled=1',
    });
    job.stripe = { previewSession: session.id };
    await J.putJob(job);
    res.status(200).json({ url: session.url, jobId: job.id });
  } catch (e) {
    res.status(500).json({ error: 'stripe_error', message: String((e && e.message) || e) });
  }
};
