# Throughline Explainers — marketing site

Self-contained static site (`index.html`, inline CSS + vanilla JS) + one Vercel serverless
function (`api/checkout.js`) that creates a Stripe Checkout Session. Domain: **throughlineexplainers.com**.

## Deploy (Vercel)
1. Push this folder to GitHub: `flintlagoat/throughlineexplainerstudios`.
2. Vercel → New Project → import the repo → **Deploy** (no build step needed; framework preset = "Other").
3. Add the domain: Vercel → Project → Settings → Domains → add `throughlineexplainers.com` and `www`, then point DNS at Vercel per the instructions it shows.

## Stripe (take payment on "Lock in")
1. Create a Stripe account → Developers → API keys.
2. Vercel → Project → Settings → Environment Variables → add **`STRIPE_SECRET_KEY`**
   - start with the **test** key (`sk_test_...`), verify a test payment, then swap to **live** (`sk_live_...`).
3. Redeploy. Done — "Lock in this price" now sends the buyer to Stripe-hosted checkout for the
   exact computed total ($900 base + $200/extra format + $200 priority), then returns them to
   `/?paid=1` (the "you're booked, we'll email your script" screen).

**Until `STRIPE_SECRET_KEY` is set**, `/api/checkout` returns 501 and the site falls back to its
email-booking flow (the brief is still captured via Web3Forms) — so nothing breaks pre-Stripe.

The price is **recomputed server-side** in `api/checkout.js` from the selected options; the
client-sent total is never trusted. Keep `PRICE` there in sync with the `PRICE` in `index.html`.

The buyer's brief (name, company, product, phone, contact preference, formats, delivery, notes)
rides along as Stripe **metadata** on the payment, and also lands in your inbox via Web3Forms.
