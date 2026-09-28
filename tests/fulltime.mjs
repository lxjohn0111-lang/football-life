import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1100, height: 620 } });
page.setDefaultTimeout(120000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.mouse.move(550, 310);
await page.goto('http://localhost:8080/index.html?auto=quick&half=20&role=CM');
await page.waitForTimeout(1500);
await page.mouse.click(550, 310);
await page.waitForTimeout(400);
const r1 = await page.evaluate(() => { const s = window.__ft.session, m = s.match; const a0 = m.attackDir(0); let n = 0; while (m.phase !== 'halftime' && n < 120 * 120) { m.step(1 / 120); n++; } s.frame(0); return { phase: m.phase, a0, half: m.half }; });
await page.waitForTimeout(300);
await page.screenshot({ path: 'tests/out/halftime.png' });
const r2 = await page.evaluate(() => { const s = window.__ft.session, m = s.match; let n = 0; while (m.phase === 'halftime' && n < 120 * 10) { m.step(1 / 120); n++; } for (let i = 0; i < 240; i++) m.step(1 / 120); s.frame(0); return { phase: m.phase, a0: m.attackDir(0), half: m.half, clock: m.displayClock }; });
await page.waitForTimeout(300);
await page.screenshot({ path: 'tests/out/secondhalf.png' });
await page.evaluate(() => { const m = window.__ft.session.match; let n = 0; while (m.phase !== 'fulltime' && n < 120 * 200) { m.step(1 / 120); n++; } });
for (let i = 0; i < 30; i++) { if (await page.getByText('MATCH RATING').count()) break; await page.waitForTimeout(500); }
await page.screenshot({ path: 'tests/out/report.png' });
console.log(JSON.stringify({ r1, r2, report: await page.getByText('MATCH RATING').count() }));
console.log(errors.length ? errors.join('\n') : 'no errors');
await browser.close();
