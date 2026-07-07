# Generator go-live checklist (one-time, ~5 minutes in the Vercel dashboard)

The self-serve generator ships dark: every endpoint returns 501 until these exist, and the
site's generate page shows a "briefly offline" state instead of breaking. Flip them in
**Vercel → project → Storage / Settings → Environment Variables**, then redeploy.

1. **KV queue** — Storage → Create → *Upstash Redis (or KV)* → connect to the project.
   Auto-injects `KV_REST_API_URL` + `KV_REST_API_TOKEN` (Upstash naming also supported).
2. **Blob store** — Storage → Create → *Blob* → connect. Auto-injects `BLOB_READ_WRITE_TOKEN`.
   (Holds intake uploads + the final clean MP4s customers download.)
3. **`WORKER_SECRET`** — Settings → Env Vars → add any long random string, e.g. output of
   `node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"`.
   Put the SAME value in `pipeline/.env` on the box as `WORKER_SECRET=...` and set
   `JOBS_API=https://throughlineexplainers.com`.
4. **Stripe** — already wired (`STRIPE_SECRET_KEY`). No webhook needed: payment is verified
   server-side on the success redirect (`/api/job?session=`).
5. **Blob token ON THE BOX (for downloads only)** — the box worker pushes the final clean MP4s
   straight to Blob (they're 10-30MB, too big to route through a serverless function). Copy the
   `BLOB_READ_WRITE_TOKEN` value from Vercel (Storage → your Blob store → `.env.local` tab, or
   Settings → Env Vars) into `pipeline/.env` on the box as `BLOB_READ_WRITE_TOKEN=...`.
   Previews work WITHOUT this; only the paid unlock/download step needs it.

Worker on the box: `node pipeline/jobsWorker.mjs once` builds the next pending job;
`node pipeline/jobsWorker.mjs drain` loops until the queue is empty. For real customer UX run it
often — either fold `jobsWorker drain` into the sweep each cycle, or (better) run a tight poll
loop so previews land in minutes instead of up to a full cadence.

STATUS 2026-07-06: end-to-end **verified working** — a seeded Linear job built a full brand-matched
preview (youtu.be/nJXzdaFAg_c) autonomously: brand read → brief → real screenshot → script → VO →
animate → 6 gates → upload. Fixes shipped during the test: worker always resolves a `brand.palette`
(schema-required) from intake→/api/palette→default, and auto-generates a wordmark logo when the
customer doesn't upload one (the `logo_present` gate). Live-Stripe key confirmed, so real checkouts
charge real money — use `/api/seed` (WORKER_SECRET-gated) for no-charge test builds.

Flow: /generate → POST /api/generate (job + Stripe) → pay → /watch?job=ID&session=… (verifies,
queues) → worker claims → stages report live → preview_ready (watermarked YouTube embed) →
Unlock (Stripe) → worker pushes clean masters to Blob → final_ready (download links).
