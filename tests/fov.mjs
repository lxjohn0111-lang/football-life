// Field-of-view screenshots in a live quick match: normal (100), wide (150) and
// maximum (200) projections from the same spot, plus draw calls per frame.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const OUT = 'tests/out';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.setDefaultTimeout(240000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(`http://localhost:8080/index.html?auto=quick&seed=3&style=${process.argv[2] || 'classic'}`);
await page.waitForTimeout(2500);
await page.mouse.click(480, 270);
await page.waitForTimeout(600);
const ev = (fn, a) => page.evaluate(fn, a);
await ev(() => { const s = window.__ft.session; s.paused = true; window.__ft.debugStep(240); });
for (const fov of (process.argv[3] || '100,121,150,200').split(',').map(Number)) {
  const r = await ev((fov) => {
    const a = window.__ft, s = a.session;
    a.settings.fov = fov; a.applySettings();
    s.cam.yaw = Math.PI / 2; s.ctl.input.yaw = Math.PI / 2; s.cam.pitch = -0.12; s.ctl.input.pitch = -0.12;
    const t0 = performance.now();
    for (let i = 0; i < 3; i++) s.frame(1 / 60);
    return { ms: ((performance.now() - t0) / 3).toFixed(0), ...a.view.stats(), arrow: !document.querySelector('.hud-arrow').classList.contains('hidden') };
  }, fov);
  console.log('fov', fov, JSON.stringify(r));
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${OUT}/fov_${fov}.png` });
}
console.log(errors.length ? errors.join('\n') : 'no errors');
await browser.close();
