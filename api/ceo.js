// /api/ceo — password-gated data feed for the private /ceodashboard page.
//
// This is the ONLY way the dashboard gets its numbers: the lead list lives in the
// underscore-prefixed support file ./_leads.js (and the playbook in ./_playbook.js),
// which sit off the static surface — Vercel never serves an api/_*.js file as a route,
// so the raw leads can't be fetched by URL. The dashboard POSTs a password here and
// this endpoint returns the leads + playbook only on a correct password.
//
// SETUP (optional): in Vercel → Settings → Environment Variables, set
//   CEO_PASSWORD = <something-strong>
// to harden it. With no env var it falls back to "11223" so it works with zero config.

const leads = require('./_leads.js');
const playbook = require('./_playbook.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'method_not_allowed' }); return; }

  const expected = process.env.CEO_PASSWORD || '11223';

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (_) { b = {}; } }
  b = b || {};

  const supplied = b.password == null ? '' : String(b.password);
  if (supplied !== expected) { res.status(401).json({ ok: false, error: 'bad_password' }); return; }

  const leadList = Array.isArray(leads) ? leads : [];
  const playbookList = Array.isArray(playbook) ? playbook : [];

  res.status(200).json({
    ok: true,
    meta: {
      generated: new Date().toISOString(),
      leadCount: leadList.length,
      goal: 900,
    },
    leads: leadList,
    playbook: playbookList,
  });
};
