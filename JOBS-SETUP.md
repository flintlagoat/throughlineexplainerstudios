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

Worker on the box: `node pipeline/jobsWorker.mjs once` builds any pending job (the sweep calls
this every cycle); `node pipeline/jobsWorker.mjs drain` loops until the queue is empty.

Flow: /generate → POST /api/generate (job + Stripe) → pay → /watch?job=ID&session=… (verifies,
queues) → worker claims → stages report live → preview_ready (watermarked YouTube embed) →
Unlock (Stripe) → worker pushes clean masters to Blob → final_ready (download links).
