'use strict';

// Genera las capturas recreadas de Windows 11: `npm run screens`.
// Requiere Chromium de Playwright (`npx playwright install chromium`) o la
// variable CHROMIUM_PATH apuntando a un Chromium instalado.

const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const screens = require('./screens');

const OUT = path.join(__dirname, '..', 'public', 'img', 'screens');
const fontDir = path.dirname(require.resolve('@fontsource/inter/package.json'));

function fontFace(weight) {
  const file = path.join(fontDir, 'files', `inter-latin-${weight}-normal.woff2`);
  const data = fs.readFileSync(file).toString('base64');
  return `@font-face{font-family:'Inter';font-weight:${weight};src:url(data:font/woff2;base64,${data}) format('woff2')}`;
}

const css = [400, 500, 600, 700].map(fontFace).join('\n') + fs.readFileSync(path.join(__dirname, 'oobe.css'), 'utf8');

const osBar = `<div class="os-bar">
  <svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2" fill="currentColor"/><path d="M5 9h14M12 9v6m0 0l-4 6m4-6l4 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
  <svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 9a4 4 0 0 1 0 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
  <svg viewBox="0 0 24 24"><rect x="3" y="7" width="16" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="5" y="9" width="9" height="6" fill="currentColor"/><rect x="20" y="10" width="2" height="4" fill="currentColor"/></svg>
</div>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 1000, height: 625 }, deviceScaleFactor: 2 });
  for (const s of screens) {
    await page.setContent(`<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${css}</style></head><body>${s.html}${osBar}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(OUT, `${s.id}.jpg`);
    await page.screenshot({ path: file, type: 'jpeg', quality: 88 });
    console.log('✓', path.relative(process.cwd(), file));
  }
  await browser.close();
})();
