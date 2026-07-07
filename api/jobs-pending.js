// GET /api/jobs-pending?secret=... — the box worker claims the next job.
// Single-worker design: RPOP is the claim. Returns the FULL job (intake included) or {job:null}.
// Priority list (Max tier + unlock deliveries) drains first.

const J = require('./_jobs');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') { res.status(405).json({ error: 'method_not_allowed' }); return; }
  if (!J.configured()) { res.status(501).json({ error: 'queue_not_configured' }); return; }
  if (!J.workerAuthed(req)) { res.status(403).json({ error: 'forbidden' }); return; }

  const id = await J.claimNext();
  if (!id) { res.status(200).json({ job: null }); return; }
  const job = await J.getJob(id);
  if (!job) { res.status(200).json({ job: null }); return; }

  // stamp the claim so a crashed build is visible (and re-queueable by hand)
  job.claimedAt = new Date().toISOString();
  if (job.status === 'queued') { job.status = 'building'; job.stage = job.stage === 'restyling' || job.stage === 'revoicing' ? job.stage : 'reading_brand'; }
  await J.putJob(job);
  res.status(200).json({ job });
};
