import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 800, height: 450 } });
page.setDefaultTimeout(120000);
await page.mouse.move(400, 225);
await page.goto(`http://localhost:8080/index.html?auto=quick&home=kingsport&away=westmoor&style=${process.argv[2] || 'classic'}`);
await page.waitForTimeout(1500);
await page.mouse.click(400, 225);
await page.waitForTimeout(300);
const r = await page.evaluate(() => {
  const a = window.__ft, s = a.session, m = s.match;
  s.paused = true; m.phase = 'playing'; m.restart = null;
  const gk = m.keeper(1); gk.pos.set(31, 0, 2.3); gk.scripted = true;
  m.ball.owner = null; m.ball.place(24, -1.2); m.ball.pos.y = 0.9; m.ball.state = 'air';
  m.ball.setVelocity({ x: 25, y: 1.0, z: -0.3 });
  a.debugCam = { pos: [36.8, 1.3, 0.8], look: [33, 0.9, -1.4] };
  let maxDepth = 0, steps = 0;
  for (let i = 0; i < 120; i++) { m.step(1 / 120); steps++; const n = m.ball.net[0]; if (n) { maxDepth = Math.max(maxDepth, n.depth); if (n.depth > 0.12) break; } }
  s.frame(0);
  return { steps, maxDepth, ball: [m.ball.pos.x, m.ball.pos.y, m.ball.pos.z].map((v) => +v.toFixed(2)), phase: m.phase };
});
console.log(JSON.stringify(r));
await page.waitForTimeout(300);
await page.screenshot({ path: 'tests/out/net_bulge.png' });
await browser.close();
