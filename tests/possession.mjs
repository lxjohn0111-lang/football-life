// The green "you have the ball" edge glow: appears when the human controls the
// ball, disappears when they lose it. Screenshots in both visual styles.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.setDefaultTimeout(240000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto('http://localhost:8080/index.html?auto=quick&seed=3&style=classic');
await page.waitForTimeout(2500);
await page.mouse.click(480, 270);
await page.waitForTimeout(600);
const ev = (fn, a) => page.evaluate(fn, a);
await ev(() => { const s = window.__ft.session; s.paused = true; window.__ft.debugStep(240); });
const give = () => ev(() => {
  const s = window.__ft.session, m = s.match, h = s.human;
  if (m.ball.owner) m.loseControl('loose');
  m.ball.place(h.pos.x + Math.sin(h.yaw) * 0.5, h.pos.z + Math.cos(h.yaw) * 0.5); m.ball.state = 'free';
  s.cam.yaw = h.yaw; s.ctl.input.yaw = h.yaw; s.cam.pitch = -0.3; s.ctl.input.pitch = -0.3;
  window.__ft.debugStep(6); s.frame(1 / 60);
  return { owner: m.ball.owner === h, on: document.querySelector('.hud-poss').classList.contains('on') };
});
for (const style of ['classic', 'neo']) {
  await ev((st) => window.__ft.setStyle(st), style);
  const r = await give();
  console.log(style, 'with ball', JSON.stringify(r));
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `tests/out/poss_${style}.png` });
}
const lost = await ev(() => {
  const s = window.__ft.session, m = s.match;
  m.loseControl('loose'); m.ball.place(20, 15); m.ball.state = 'free';
  window.__ft.debugStep(4); s.frame(1 / 60);
  return document.querySelector('.hud-poss').classList.contains('on');
});
console.log('after losing it, glow on =', lost);
console.log(errors.length ? errors.join('\n') : 'no errors');
await browser.close();
