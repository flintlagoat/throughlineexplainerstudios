// /api/checkout — creates a Stripe Checkout Session for a locked-in quote.
//
// SETUP (one time): in Vercel → your project → Settings → Environment Variables, add
//   STRIPE_SECRET_KEY = sk_test_...   (use a TEST key first, then swap to sk_live_... when ready)
// then redeploy. Until that var exists this endpoint returns 501 and the site
// gracefully falls back to its email-booking flow — so the site works before Stripe is wired.
//
// The price is RECOMPUTED here from the selected options — the client-sent total is never trusted.

const Stripe = require('stripe');

const PRICE = { base: 90000, aspect: 20000, priority: 20000 }; // cents — keep in sync with the site's PRICE
const VALID_EXTRAS = ['1:1', '9:16'];

function dollars(cents) { return '$' + Math.round(cents / 100).toLocaleString('en-US'); }
function clean(v, max) { return String(v == null ? '' : v).slice(0, max || 500); }

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) { res.status(501).json({ error: 'not_configured' }); return; } // → client falls back to email booking

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (_) { b = {}; } }
  b = b || {};

  // recompute the amount server-side — never trust a client total
  const extras = Array.isArray(b.extras) ? b.extras.filter(function (f) { return VALID_EXTRAS.indexOf(f) !== -1; }) : [];
  const priority = !!b.priority;
  const amount = PRICE.base + extras.length * PRICE.aspect + (priority ? PRICE.priority : 0);
  const formats = ['16:9'].concat(extras).join(', ');
  const delivery = priority ? 'Priority — overnight' : 'Standard — 2-3 business days';

  const origin = (req.headers.origin && /^https?:\/\//.test(req.headers.origin))
    ? req.headers.origin
    : ('https://' + (req.headers.host || 'throughlineexplainers.com'));

  try {
    const stripe = Stripe(key);
    const email = clean(b.email, 200);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: {
            name: 'Throughline — brand-matched explainer video',
            description: '75-sec custom explainer · ' + formats + ' · ' + delivery,
          },
        },
      }],
      customer_email: /.+@.+\..+/.test(email) ? email : undefined,
      allow_promotion_codes: true,
      metadata: {
        name: clean(b.name, 200),
        company: clean(b.company, 200),
        website: clean(b.website, 300),
        industry: clean(b.industry, 200),
        product: clean(b.does, 400),
        phone: clean(b.phone, 60),
        contact_pref: b.phonePref ? 'TEXT' : 'email',
        formats: formats,
        delivery: delivery,
        quoted_total: dollars(amount),
        notes: clean(b.notes, 480),
      },
      success_url: origin + '/?paid=1',
      cancel_url: origin + '/?canceled=1#quote',
    });
    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: 'stripe_error', message: String((e && e.message) || e) });
  }
};
