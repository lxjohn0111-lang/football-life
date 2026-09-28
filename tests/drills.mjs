import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errors = [];
for (const kind of ['passing', 'finishing', 'dribbling']) {
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
  page.setDefaultTimeout(120000);
  page.on('pageerror', (e) => errors.push(kind + ': ' + e.message));
  await page.mouse.move(480, 270);
  await page.goto(`http://localhost:8080/index.html?auto=drill:${kind}`);
  await page.waitForTimeout(1500);
  await page.mouse.click(480, 270);
  await page.waitForTimeout(400);
  const res = await page.evaluate((kind) => {
    const a = window.__ft, s = a.session, m = s.match, d = s.drill, h = s.human, ctl = s.ctl;
    s.paused = true;
    const step = (n) => { for (let i = 0; i < n; i++) { m.step(1 / 120); d.step(); } };
    const look = (x, z) => { const y = Math.atan2(x - h.pos.x, z - h.pos.z); ctl.input.yaw = y; s.cam.yaw = y; };
    let log = [];
    if (kind === 'passing') {
      for (let k = 0; k < 4; k++) {
        step(90);
        // wait for the ball at the feet
        for (let i = 0; i < 400 && m.ball.owner !== h; i++) step(1);
        const g = d.stations[d.active];
        look(g.p.pos.x, g.p.pos.z);
        step(20);
        ctl.press('pass'); step(2); ctl.release('pass');
        step(240);
        log.push(`score=${d.score}`);
      }
    } else if (kind === 'finishing') {
      for (let k = 0; k < 4; k++) {
        for (let i = 0; i < 400 && !(m.ball.owner === h || (m.passIntent && m.passIntent.target === h && m.ball.pos.distXZ(h.pos) < 3)); i++) step(1);
        const zc = (k % 2 ? 1.8 : -1.8);
        look(32, zc); ctl.input.pitch = Math.atan2(0.4 - 1.65, 32 - h.pos.x);
        ctl.press('shoot'); ctl.input.lmb = true; step(30); ctl.release('shoot'); ctl.input.lmb = false;
        step(360);
        log.push(`score=${d.score} served=${d.served}`);
      }
    } else {
      // dribble through the gates by steering toward each gate centre
      for (let i = 0; i < 120 * 40 && !d.done; i++) {
        const g = d.gates[d.next];
        if (!g) break;
        // line up in front of the gate first, then run straight through it
        const lined = h.pos.x > g.c.x - 1.2 || Math.abs(h.pos.z - g.c.z) < 0.5;
        const tx = lined ? g.c.x + 2.5 : g.c.x - 1.8, tz = g.c.z;
        const target = m.ball.owner === h || m.ball.pos.distXZ(h.pos) < 1.5 ? { x: tx, z: tz } : { x: m.ball.pos.x, z: m.ball.pos.z };
        const y = Math.atan2(target.x - h.pos.x, target.z - h.pos.z);
        ctl.input.yaw = y; s.cam.yaw = y; ctl.input.moveF = 1; ctl.input.moveR = 0;
        step(1);
      }
      log.push(`gates=${d.next}/${d.gates.length} t=${d.t.toFixed(1)} done=${d.done}`);
    }
    s.frame(0);
    return log;
  }, kind);
  console.log(kind, JSON.stringify(res));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `tests/out/drill_${kind}.png` });
  // finish and view the result screen
  await page.evaluate(() => { const s = window.__ft.session; s.drill.finish(); s.paused = false; });
  await page.waitForTimeout(4500);
  await page.screenshot({ path: `tests/out/drill_${kind}_result.png` });
  const txt = await page.evaluate(() => document.querySelector('.screens')?.innerText?.slice(0, 160));
  console.log('  result:', JSON.stringify(txt));
  await page.close();
}
console.log(errors.length ? errors.join('\n') : 'no errors');
await browser.close();
