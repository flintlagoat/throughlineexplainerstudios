// _jobs.js — shared job-queue plumbing for the self-serve generator.
//
// Storage: Upstash Redis / Vercel KV over its REST API (no npm dep). Provision once in the
// Vercel dashboard (Storage → create KV/Upstash) which injects the env vars automatically:
//   KV_REST_API_URL + KV_REST_API_TOKEN   (Vercel KV naming)
//   or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (Upstash naming)
// Worker auth: WORKER_SECRET (any long random string, same value in pipeline/.env on the box).
//
// Job lifecycle:
//   awaiting_payment → queued → building → preview_ready
//   (unlock paid)    → delivering → final_ready
//   restyle/tweak    → queued again (stage says why)         failed → (manual refund)

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

// One source of truth for the ladder. Cents. Finals are ADDITIONAL to the preview fee
// (Standard $5 → +$20 = $25 all-in; Pro $7 → +$25 = $32; Max $10 → +$35 = $45).
const TIERS = {
  standard: { name: 'Standard', previewCents: 500,  unlockCents: 2000, seconds: 40, aspects: 1, restyles: 0, tweaks: 0, customAssets: false, priority: false },
  pro:      { name: 'Pro',      previewCents: 700,  unlockCents: 2500, seconds: 60, aspects: 2, restyles: 1, tweaks: 1, customAssets: false, priority: false },
  max:      { name: 'Max',      previewCents: 1000, unlockCents: 3500, seconds: 75, aspects: 3, restyles: 2, tweaks: 1, customAssets: true,  priority: true  },
};
const ASPECTS = ['16:9', '1:1', '9:16'];
const ARCHETYPES = ['blueprint_board', 'flat_motion_explainer', 'documentary_slate', 'notebook_sketch', 'tech_terminal', 'vintage_press', 'editorial_magazine', 'chalkboard'];

function configured() { return !!(KV_URL && KV_TOKEN); }

// Single Redis command over REST, e.g. kv(['SET','k','v']) / kv(['GET','k']) / kv(['LPUSH','l','x'])
async function kv(cmd) {
  const r = await fetch(KV_URL, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + KV_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error('kv ' + cmd[0] + ' -> ' + r.status + ': ' + (await r.text()).slice(0, 200));
  const j = await r.json();
  return j.result;
}

async function getJob(id) {
  if (!/^tl_[a-z0-9]+$/.test(String(id))) return null;
  const raw = await kv(['GET', 'job:' + id]);
  return raw ? JSON.parse(raw) : null;
}
async function putJob(job) {
  job.updated = new Date().toISOString();
  await kv(['SET', 'job:' + job.id, JSON.stringify(job)]);
  return job;
}
// Two pending lists; Max-tier jobs and quick deliveries go on the priority list.
async function enqueue(id, priority) {
  await kv(['LPUSH', priority ? 'jobs:pending:pri' : 'jobs:pending', id]);
}
async function claimNext() {
  let id = await kv(['RPOP', 'jobs:pending:pri']);
  if (!id) id = await kv(['RPOP', 'jobs:pending']);
  return id || null;
}

function newId() {
  let s = 'tl_';
  const abc = 'abcdefghjkmnpqrstuvwxyz23456789';
  for (let i = 0; i < 12; i++) s += abc[Math.floor(Math.random() * abc.length)];
  return s;
}

// What the browser is allowed to see (no secrets, no internal notes).
function publicView(job) {
  if (!job) return null;
  const t = TIERS[job.tier] || {};
  return {
    id: job.id, status: job.status, stage: job.stage || null, tier: job.tier,
    created: job.created, updated: job.updated,
    productName: (job.intake && job.intake.name) || '',
    archetype: (job.intake && job.intake.archetype) || '',
    aspects: job.aspects || [],
    preview: job.preview || null,                     // { youtubeId }
    finals: job.status === 'final_ready' ? (job.finals || []) : [],
    restylesLeft: Math.max(0, (t.restyles || 0) - (job.restylesUsed || 0)),
    tweaksLeft: Math.max(0, (t.tweaks || 0) - (job.tweaksUsed || 0)),
    script: (job.status === 'preview_ready' && job.buildMeta && job.buildMeta.script) || undefined,
    unlocked: !!job.unlockPaid,
    unlockCents: t.unlockCents, error: job.status === 'failed' ? 'build_failed' : undefined,
  };
}

function clean(v, max) { return String(v == null ? '' : v).slice(0, max || 400); }

function workerAuthed(req) {
  const s = process.env.WORKER_SECRET;
  const got = (req.headers['x-worker-secret'] || (req.query && req.query.secret) || (req.body && req.body.secret) || '');
  return !!(s && got && got === s);
}

module.exports = { TIERS, ASPECTS, ARCHETYPES, configured, kv, getJob, putJob, enqueue, claimNext, newId, publicView, clean, workerAuthed };
