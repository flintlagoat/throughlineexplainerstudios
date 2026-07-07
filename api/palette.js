// GET /api/palette?url=https://... — lite brand reader for the live "we just read your site"
// moment on the generator page. Pure JS (no canvas/native deps — Vercel-safe): fetches the HTML
// + first same-ish stylesheet, harvests colors from CSS custom props, inline styles and
// meta theme-color, frequency-ranks them, filters out near-black/near-white/greys, and returns
// the top candidates plus a product-name guess. The box worker does the full extraction later;
// this only has to feel like magic in <2s.

const UA = 'Mozilla/5.0 (compatible; ThroughlineBot/1.0; +https://throughlineexplainers.com)';
const TIMEOUT = 6500;

function hexes(text) {
  const out = [];
  const re = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
  let m;
  while ((m = re.exec(text)) && out.length < 4000) {
    let h = m[1].toLowerCase();
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    out.push('#' + h);
  }
  const rre = /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/g;
  while ((m = rre.exec(text)) && out.length < 5000) {
    const [r, g, b] = [+m[1], +m[2], +m[3]];
    if (r <= 255 && g <= 255 && b <= 255) out.push('#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join(''));
  }
  return out;
}

function usable(hex) { // drop greys + near-black/white — we want the BRAND color
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const sat = mx === 0 ? 0 : (mx - mn) / mx;
  return lum > 0.08 && lum < 0.93 && sat > 0.22;
}

async function grab(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIMEOUT);
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,text/css,*/*' }, signal: ctl.signal, redirect: 'follow' });
    if (!r.ok) return '';
    return (await r.text()).slice(0, 900000);
  } catch (_) { return ''; } finally { clearTimeout(t); }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') { res.status(405).json({ error: 'method_not_allowed' }); return; }
  let url = String(req.query.url || '').trim();
  if (!/^https?:\/\//.test(url)) url = 'https://' + url;
  let u;
  try { u = new URL(url); } catch (_) { res.status(400).json({ error: 'bad_url' }); return; }
  if (!/\./.test(u.hostname) || /^(localhost|127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(u.hostname)) { res.status(400).json({ error: 'bad_url' }); return; }

  const html = await grab(u.href);
  if (!html) { res.status(200).json({ ok: false }); return; }

  // name guess: og:site_name → og:title → <title>
  const name =
    (/property=["']og:site_name["'][^>]*content=["']([^"']{1,60})["']/i.exec(html) || [])[1] ||
    (/content=["']([^"']{1,60})["'][^>]*property=["']og:site_name["']/i.exec(html) || [])[1] ||
    (/<title[^>]*>([^<|–—-]{1,60})/i.exec(html) || [])[1] || '';

  const counts = new Map();
  const bump = (h, w) => counts.set(h, (counts.get(h) || 0) + w);

  // meta theme-color is a strong signal
  const theme = (/name=["']theme-color["'][^>]*content=["'](#[0-9a-fA-F]{3,6})["']/i.exec(html) || [])[1];
  if (theme) hexes(theme).forEach((h) => bump(h, 60));
  // CSS custom props named like brand/primary/accent get weighted
  const propRe = /--[a-z0-9-]*?(brand|primary|accent|main|theme)[a-z0-9-]*\s*:\s*([^;}]+)/gi;
  let pm; while ((pm = propRe.exec(html))) hexes(pm[2]).forEach((h) => bump(h, 40));
  hexes(html).forEach((h) => bump(h, 1));

  // first same-site stylesheet
  const cssHref = (/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/i.exec(html) || [])[1];
  if (cssHref) {
    try {
      const cssUrl = new URL(cssHref, u.href).href;
      const css = await grab(cssUrl);
      let cm; const propRe2 = /--[a-z0-9-]*?(brand|primary|accent|main|theme)[a-z0-9-]*\s*:\s*([^;}]+)/gi;
      while ((cm = propRe2.exec(css))) hexes(cm[2]).forEach((h) => bump(h, 40));
      hexes(css).forEach((h) => bump(h, 1));
    } catch (_) { /* fine */ }
  }

  const ranked = [...counts.entries()].filter(([h]) => usable(h)).sort((a, b) => b[1] - a[1]).map(([h]) => h);
  // dedupe near-identical shades
  const picks = [];
  for (const h of ranked) {
    const close = picks.some((p) => {
      const d = [1, 3, 5].reduce((s, i) => s + Math.abs(parseInt(h.slice(i, i + 2), 16) - parseInt(p.slice(i, i + 2), 16)), 0);
      return d < 60;
    });
    if (!close) picks.push(h);
    if (picks.length >= 5) break;
  }

  res.setHeader('Cache-Control', 's-maxage=86400');
  res.status(200).json({ ok: picks.length > 0, name: name.trim(), colors: picks });
};
