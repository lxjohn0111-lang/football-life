import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
page.setDefaultTimeout(240000);
await page.goto('http://localhost:8080/index.html?style=' + (process.argv[2] || 'classic'));
await page.waitForTimeout(1500);
for (const [v, cam] of [['continental', { pos: [-70, 34, 58], look: [0, 4, 0] }], ['continental', { pos: [-10, 1.7, 12], look: [20, 3, -10] }], ['premier', { pos: [-66, 30, 52], look: [0, 4, 0] }]]) {
  await page.evaluate(({ v, cam }) => { const a = window.__ft; a.view.setVenue(v, { homeName: 'Valmonte Sporting', final: true }); a.debugCam = cam; a.screens.clear(); a.menuSession.paused = true; }, { v, cam });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `tests/out/big_${v}_${cam.pos[0]}.png` });
}
await browser.close();
