// Switching visual style mid-action must not change the simulation at all.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
async function run(switchStyles) {
  const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
  page.setDefaultTimeout(120000);
  await page.mouse.move(320, 180);
  await page.goto('http://localhost:8080/index.html?auto=quick&half=30&role=ST&seed=77');
  await page.waitForTimeout(1200);
  await page.mouse.click(320, 180);
  await page.waitForTimeout(300);
  const out = await page.evaluate(async (sw) => {
    const a = window.__ft, s = a.session, m = s.match;
    s.paused = true;
    const snap = () => JSON.stringify({ b: [m.ball.pos, m.ball.vel, m.ball.state], p: m.players.map((p) => [p.pos, p.vel, p.stamina, p.action && p.action.type]), c: m.clock, sc: m.scoreline, st: m.players.map((p) => m.stats.s(p)) });
    const log = [];
    const stepN = (n) => { for (let i = 0; i < n; i++) m.step(1 / 120); };
    const h = m.human;
    stepN(300);
    // moving ball + a shot + a slide + (maybe) a goal celebration, switching styles at each moment
    const moments = [
      () => {},
      () => { m.ball.owner = null; m.ball.state = 'air'; m.ball.place(h.pos.x + 1, h.pos.z); m.ball.state = 'air'; m.ball.setVelocity({ x: 18, y: 2, z: 0 }); },
      () => { s.ctl.press('slide'); },
      () => { m.ball.owner = null; m.ball.place(26, 0); m.ball.state = 'air'; m.ball.pos.y = 0.8; m.ball.setVelocity({ x: 30, y: 0.5, z: 1 }); m.ball.lastTouch = h; },
    ];
    for (const mo of moments) {
      mo();
      stepN(20);
      const before = snap();
      if (sw) { a.setStyle('neo'); s.frame(0); a.setStyle('classic'); s.frame(0); a.setStyle('neo'); s.frame(0); }
      else { s.frame(0); s.frame(0); s.frame(0); }
      log.push(before === snap());
      stepN(60);
      log.push(snap().length);
    }
    return { log, final: snap(), phase: m.phase };
  }, switchStyles);
  await page.close();
  return out;
}
const a = await run(true), b = await run(false);
console.log('unchanged at each switch:', a.log.filter((x) => typeof x === 'boolean').every(Boolean), 'phase', a.phase);
console.log('identical continuation vs no switching:', a.final === b.final);
await browser.close();
