import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1000, height: 600 } });
page.setDefaultTimeout(120000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.mouse.move(500, 300);
await page.goto('http://localhost:8080/index.html?auto=quick');
await page.waitForTimeout(1500);
await page.mouse.click(500, 300);
await page.waitForTimeout(500);
const before = await page.evaluate(() => ({ paused: window.__ft.paused, t: window.__ft.session.match.time }));
await page.evaluate(() => window.dispatchEvent(new Event('blur')));
await page.waitForTimeout(500);
const after = await page.evaluate(() => ({ paused: window.__ft.paused, t: window.__ft.session.match.time, menu: !!document.querySelector('.screens')?.innerText.includes('Paused'), audio: window.__ft.audio.ctx ? window.__ft.audio.ctx.state : 'none' }));
await page.waitForTimeout(700);
const t2 = await page.evaluate(() => window.__ft.session.match.time);
console.log('blur ->', JSON.stringify({ before, after, frozen: Math.abs(t2 - after.t) < 1e-9 }));
// corrupted save recovery
await page.evaluate(() => { localStorage.setItem('firsttouch.career', '{"version":2,"sum":"00","data":"{broken'); localStorage.removeItem('firsttouch.career.backup'); });
await page.goto('http://localhost:8080/index.html');
await page.waitForTimeout(1500);
const toast = await page.evaluate(() => document.querySelector('.toast')?.innerText || '');
const menu = await page.evaluate(() => document.querySelector('.screens')?.innerText.slice(0, 60));
console.log('corrupt save ->', JSON.stringify({ toast, menu }));
// fps emulation: sim time per wall second should match at 20 fps
await page.goto('http://localhost:8080/index.html?auto=quick&fps=20');
await page.waitForTimeout(1500);
await page.mouse.click(500, 300);
await page.waitForTimeout(500);
const r = await page.evaluate(async () => { const m = window.__ft.session.match; const t0 = m.time, w0 = performance.now(); await new Promise((r) => setTimeout(r, 3000)); return { sim: m.time - t0, wall: (performance.now() - w0) / 1000 }; });
console.log('fps=20 sim/wall', JSON.stringify(r));
console.log(errors.length ? errors.join('\n') : 'no errors');
await browser.close();
