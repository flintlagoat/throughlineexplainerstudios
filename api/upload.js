// POST /api/upload?name=logo.png — small intake uploads (logo / screenshots) straight to
// Vercel Blob over its REST API (no npm dep). Raw body (≤4MB, Vercel's serverless limit).
// Returns { url }. Requires BLOB_READ_WRITE_TOKEN (Vercel dashboard → Storage → Blob).

const MAX = 4 * 1024 * 1024;
const OK_TYPES = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/svg+xml': '.svg' };

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) { res.status(501).json({ error: 'blob_not_configured' }); return; }

  const type = String(req.headers['content-type'] || '');
  const ext = OK_TYPES[type.split(';')[0]];
  if (!ext) { res.status(415).json({ error: 'bad_type' }); return; }

  // read raw body
  const chunks = [];
  let size = 0;
  await new Promise((resolve, reject) => {
    req.on('data', (c) => { size += c.length; if (size > MAX) { reject(new Error('too_big')); req.destroy(); } else chunks.push(c); });
    req.on('end', resolve);
    req.on('error', reject);
  }).catch((e) => { res.status(413).json({ error: String(e.message || e) }); });
  if (res.writableEnded) return;
  const body = Buffer.concat(chunks);
  if (!body.length) { res.status(400).json({ error: 'empty' }); return; }

  const safe = String(req.query.name || 'upload').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'upload';
  const path = 'intake/' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8) + '-' + safe + ext;

  try {
    const r = await fetch('https://blob.vercel-storage.com/' + path, {
      method: 'PUT',
      headers: { Authorization: 'Bearer ' + token, 'x-api-version': '7', 'Content-Type': type, 'x-content-type': type, 'x-add-random-suffix': '0' },
      body,
    });
    const j = await r.json();
    if (!r.ok || !j.url) { res.status(500).json({ error: 'blob_error', detail: JSON.stringify(j).slice(0, 200) }); return; }
    res.status(200).json({ url: j.url });
  } catch (e) {
    res.status(500).json({ error: 'blob_error', message: String((e && e.message) || e) });
  }
};

module.exports.config = { api: { bodyParser: false } };
