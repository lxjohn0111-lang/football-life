// Outline checks: a line-up of players seen from 4 to 80 m, and a stand and houses from
// afar. Hidden parts must not show their ink through the front, and far figures must
// stay readable instead of turning into solid black. Screenshots go to tests/out/ink_*.png.
// Usage: node tests/ink.mjs [classic|neo] [port]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const OUT = 'tests/out';
const style = process.argv[2] || 'classic';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.setDefaultTimeout(240000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const ev = (fn, a) => page.evaluate(fn, a);
const snap = async (name) => { await ev(() => { const a = window.__ft; a.screens.clear(); a.hud.show(false); a.session.frame(0); }); await page.waitForTimeout(300); await page.screenshot({ path: `${OUT}/ink_${name}_${tag}.png` }); };

const port = process.argv[3] || 8080;
const tag = port == 8080 ? style : `${style}_${port}`;
await page.goto(`http://localhost:${port}/index.html?auto=quick&home=chesterfield&away=grimsby&style=${style}&seed=5&venue=town`);
await page.waitForTimeout(3000);
await page.mouse.click(480, 270);
await page.waitForTimeout(600);
await ev(() => {
  const a = window.__ft, s = a.session, m = s.match;
  s.paused = true;
  a.hud.show(false);
  const teams = [m.teams[0].players.filter((p) => !p.isGK && !p.isHuman).slice(0, 4), m.teams[1].players.filter((p) => !p.isGK).slice(0, 3)];
  window.__pick = [...teams[0], ...teams[1]];
  for (const p of m.players) if (!window.__pick.includes(p)) { p.pos.set(-25, 0, 40); p.prevPos.copy(p.pos); }
  m.ball.place(0, 0); m.ball.state = 'free';
});
// the camera stays at x = 25; the line of players moves away from it
for (const d of [4, 10, 20, 35, 60]) {
  await ev((d) => {
    const a = window.__ft, m = a.session.match;
    window.__pick.forEach((p, i) => { p.pos.set(25 - d, 0, (i - 3) * 1.6); p.prevPos.copy(p.pos); p.vel.set(0, 0, 0); p.yaw = Math.PI / 2; p.prevYaw = p.yaw; p.action = null; });
    a.debugCam = { pos: [25, 1.7, 0], look: [25 - d, 1.1, 0] };
  }, d);
  await snap(`players_${d}`);
}
// players standing one behind another, seen side-on: nothing behind may draw over the front
for (const d of [3, 8, 20]) {
  await ev((d) => {
    const a = window.__ft;
    window.__pick.forEach((p, i) => {
      const k = i % 4;
      p.pos.set(25 - d - k * 0.9, 0, (k % 2 ? 0.35 : -0.3) + (i < 4 ? 0 : 40)); p.prevPos.copy(p.pos); p.vel.set(0, 0, 0);
      p.yaw = k * 0.8; p.prevYaw = p.yaw; p.action = null;
    });
    a.debugCam = { pos: [25, 1.6, 0], look: [25 - d - 0.9, 1.0, 0], fov: Math.max(20, 100 / d * 2.5) };
  }, d);
  await snap(`overlap_${d}`);
}
// a full line of scenery from far away
await ev(() => { const a = window.__ft; a.debugCam = { pos: [0, 2.2, 24], look: [0, 6, -40] }; });
await snap('stand_far');
console.log(errors.length ? errors.join('\n') : 'no errors');
await browser.close();
