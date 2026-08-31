import { chromium } from 'playwright';

const BASE = 'http://localhost:5174';
const PAGES = ['/', '/music', '/about', '/gallery', '/events', '/shop'];
const WIDTHS = [320, 375, 390, 428, 768, 1024, 1280, 1440, 1920];

const b = await chromium.launch();
const problems = [];

for (const w of WIDTHS) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  for (const path of PAGES) {
    await p.goto(BASE + path, { waitUntil: 'networkidle' });
    await p.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 25)); }
      window.scrollTo(0, 0);
    });
    await p.waitForTimeout(200);

    const r = await p.evaluate(() => {
      const de = document.documentElement;
      const overflow = de.scrollWidth - de.clientWidth;
      const offenders = [];
      if (overflow > 0) {
        for (const el of document.querySelectorAll('*')) {
          const rect = el.getBoundingClientRect();
          if (rect.width === 0) continue;
          if (rect.right > de.clientWidth + 1) {
            offenders.push({ tag: el.tagName.toLowerCase(), cls: (el.className?.toString?.()||'').slice(0,60), right: Math.round(rect.right) });
          }
        }
      }
      const small = [];
      for (const el of document.querySelectorAll('a, button')) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        if (rect.height < 32) small.push({ text: (el.textContent||'').trim().slice(0,24), h: Math.round(rect.height) });
      }
      const imgs = [...document.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0);
      return { overflow, offenders: offenders.slice(0,3), small: small.slice(0,3), brokenImgs: imgs.length };
    });

    if (r.overflow > 0) problems.push({ w, path, type: 'OVERFLOW', px: r.overflow, offenders: r.offenders });
    if (r.brokenImgs) problems.push({ w, path, type: 'BROKEN_IMG', n: r.brokenImgs });
    if (r.small.length && w <= 428) problems.push({ w, path, type: 'TAP<32', small: r.small });
  }
  await p.close();
}
await b.close();

if (!problems.length) console.log('CLEAN across', WIDTHS.length, 'widths x', PAGES.length, 'pages: no overflow, no broken images, no tap targets under 32px.');
else problems.forEach(x => console.log(JSON.stringify(x)));
