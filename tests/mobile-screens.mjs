// Menus on phone screens (landscape and portrait): settings, visual style and a
// full-time match report. Checks nothing overflows sideways; screenshots m2_*.png.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errors = [];
for (const [w, h, tag] of [[844, 390, 'land'], [390, 844, 'port']]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  page.setDefaultTimeout(240000);
  page.on('pageerror', (e) => errors.push(e.message));
  const over = () => page.evaluate(() => { const s = document.querySelector('.screen'); return s ? s.scrollWidth > s.clientWidth + 1 : false; });
  await page.goto('http://localhost:8080/index.html?nofs');
  await page.waitForTimeout(2000);
  await page.tap('[data-act="settings"]'); await page.waitForTimeout(400);
  console.log(tag, 'settings overflow sideways:', await over());
  await page.screenshot({ path: `tests/out/m2_settings_${tag}.png` });
  await page.tap('[data-act="back"]'); await page.waitForTimeout(300);
  await page.tap('[data-act="style"]'); await page.waitForTimeout(2500);
  console.log(tag, 'style overflow sideways:', await over());
  await page.screenshot({ path: `tests/out/m2_style_${tag}.png` });
  // short quick match straight to the report
  await page.goto('http://localhost:8080/index.html?auto=quick&half=8&nofs');
  await page.waitForTimeout(2500);
  await page.tap('.screen'); await page.waitForTimeout(600);
  await page.evaluate(() => { const a = window.__ft, m = a.session.match; let n = 0; while (m.phase !== 'fulltime' && n++ < 120 * 120) { m.step(1 / 120); if (m.phase === 'halftime' || m.phase === 'goal') m.requestSkip(); } m.phaseT = 5; });
  await page.waitForFunction(() => /Match Report/.test(document.querySelector('.screens').textContent), null, { timeout: 60000 });
  await page.waitForTimeout(400);
  console.log(tag, 'report overflow sideways:', await over());
  await page.screenshot({ path: `tests/out/m2_report_${tag}.png` });
  await ctx.close();
}
console.log(errors.length ? errors.join('\n') : 'no errors');
await browser.close();
