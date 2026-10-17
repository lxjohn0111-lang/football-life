// Kicks never look like flying: over a whole match (and the tutorial's pass to Jojo and
// back) no player kicking the ball has both boots off the ground, and no boot is pulled
// more than a stride away from the body toward a ball that is still far off.
// Usage: node tests/kickpose.mjs (server on 8080)
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errors = [];
const results = [];
const check = (name, ok, info = '') => { const l = `${ok ? 'ok  ' : 'FAIL'} ${name}${info ? ' - ' + info : ''}`; results.push(l); console.log(l); };

// measures every kicking player's boots each frame while `drive` advances the game
const MEASURE = `(drive, frames) => {
  const a = window.__ft, v = a.view;
  let kickFrames = 0, airborne = 0, worstLow = 0, farFoot = 0, worstFar = 0, where = '';
  for (let f = 0; f < frames; f++) {
    drive(f);
    for (const an of v.animators || []) {
      const p = an.p, act = p.action, M = an.m;
      if (!M || !act || act.type !== 'kick' || act.fromHands) continue;
      kickFrames++;
      const L = M[11].elements, R = M[12].elements, pel = M[0].elements;
      const low = Math.min(L[13], R[13]);
      // running at speed has a natural flight phase; a kick at walking pace or standing
      // still must keep a boot on the ground
      const speed = Math.hypot(p.vel.x, p.vel.z);
      if (low > 0.2 && speed < 3) { airborne++; if (low > worstLow) { worstLow = low; where = 'player ' + p.id + ' ' + act.kind + ' frame ' + f + ' speed ' + speed.toFixed(1) + ' contacted ' + act.contacted; } }
      for (const B of [L, R]) {
        const d = Math.hypot(B[12] - pel[12], B[14] - pel[14]);
        if (d > 0.95) { farFoot++; if (d > worstFar) worstFar = d; }
      }
    }
  }
  return { kickFrames, airborne, worstLow: +worstLow.toFixed(2), farFoot, worstFar: +worstFar.toFixed(2), where };
}`;

{
  const page = await browser.newPage({ viewport: { width: 480, height: 270 } });
  page.setDefaultTimeout(300000);
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() => localStorage.setItem('firsttouch.tutorial', 'done'));
  await page.goto('http://localhost:8080/index.html?auto=quick&home=chesterfield&away=grimsby&seed=9&venue=community&half=60');
  await page.waitForFunction(() => window.__ft && window.__ft.session, null, { timeout: 60000 });
  const r = await page.evaluate(`(() => { const a = window.__ft, s = a.session; a.loop = () => {}; a.view.noDraw = true; a.screens.clear(); a.unpause(); return (${MEASURE})(() => s.frame(1 / 60), 60 * 60); })()`);
  check('match: kicking players keep a boot on the ground', r.kickFrames > 200 && r.airborne === 0, JSON.stringify(r));
  check('match: no boot stretched toward a far-off ball', r.farFoot === 0, JSON.stringify({ farFoot: r.farFoot, worstFar: r.worstFar }));
  await page.close();
}
{
  const page = await browser.newPage({ viewport: { width: 480, height: 270 } });
  page.setDefaultTimeout(300000);
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://localhost:8080/index.html?tutorial&nofs');
  await page.waitForFunction(() => window.__ft && window.__ft.session && window.__ft.session.tutorial, null, { timeout: 60000 });
  // jump to the pass step and pass to Jojo, then watch him play it back
  const r = await page.evaluate(`(() => {
    const a = window.__ft, s = a.session, m = s.match, tut = s.tutorial, h = s.human, ctl = s.ctl;
    a.loop = () => {}; a.view.noDraw = true;
    tut.hold = false;
    let guard = 0;
    while (tut.current && tut.current.id !== 'pass' && guard++ < 20) { tut.complete(true); for (let k = 0; k < 130; k++) { m.step(1 / 120); tut.step(); } }
    let pressed = 0;
    const face = (x, z) => { const y = Math.atan2(x - h.pos.x, z - h.pos.z); s.cam.yaw = y; s.cam.pitch = -0.2; };
    const drive = () => {
      const j = tut.jojo, b = m.ball, keys = a.input.keys;
      if (!pressed && b.owner !== h) { face(b.pos.x, b.pos.z); if (b.pos.distXZ(h.pos) > 0.3) keys.add('KeyW'); else keys.delete('KeyW'); }
      else if (!pressed) { keys.delete('KeyW'); face(j.pos.x, j.pos.z); if (ctl.passTarget === j) { ctl.press('pass'); pressed = 1; } }
      else { keys.clear(); face(j.pos.x, j.pos.z); if (pressed === 1) { ctl.release('pass'); pressed = 2; } }
      s.frame(1 / 60);
    };
    return (${MEASURE})(drive, 60 * 12);
  })()`);
  const jojoKicked = await page.evaluate(() => window.__ft.session.tutorial.results.map((x) => x.id).join(','));
  check('tutorial: Jojo plays the ball back without floating', r.kickFrames > 20 && r.airborne === 0 && r.farFoot === 0, JSON.stringify({ ...r, steps: jojoKicked }));
  await page.close();
}
console.log(errors.length ? 'page errors:\n' + errors.join('\n') : 'no errors');
await browser.close();
