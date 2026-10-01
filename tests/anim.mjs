// Animation smoothness: plays a quick match with the renderer running and measures, for every
// player, how far each part (relative to the player's pelvis) jumps between consecutive
// frames. Pops show up as large jumps; NaNs as errors. Usage: node tests/anim.mjs
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 480, height: 270 } });
page.setDefaultTimeout(240000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(`http://localhost:${process.argv[2] || 8080}/index.html?auto=quick&home=chesterfield&away=grimsby&seed=9&venue=community`);
await page.waitForTimeout(3000);
await page.mouse.click(240, 135);
await page.waitForTimeout(500);
const r = await page.evaluate(() => {
  const a = window.__ft, s = a.session, m = s.match, v = a.view;
  a.screens.clear(); s.paused = false; a.paused = false;
  const dt = 1 / 60;
  const prev = new Map();
  let big40 = 0, maxJump = 0, worst = '', frames = 0, nan = 0;
  const jumps = [];
  for (let f = 0; f < 60 * 25; f++) {
    // 60 fps frames driving the fixed-step simulation
    s.frame(dt);
    v.batch.commit && 0;
    for (const an of v.animators || []) {
      const M = an.m; if (!M) continue;
      const pel = M[0].elements;
      const cur = [];
      for (let j = 0; j < 13; j++) {
        const e = M[j].elements;
        if (!Number.isFinite(e[12] + e[13] + e[14])) nan++;
        // position relative to the pelvis, in the body's own frame (so turning isn't a jump)
        const dx = e[12] - pel[12], dz = e[14] - pel[14], c = Math.cos(an.yaw), sn = Math.sin(an.yaw);
        cur.push(dx * c - dz * sn, e[13] - pel[13], dx * sn + dz * c);
      }
      const pv = prev.get(an);
      if (pv) {
        for (let j = 1; j < 13; j++) {
          const d = Math.hypot(cur[j * 3] - pv[j * 3], cur[j * 3 + 1] - pv[j * 3 + 1], cur[j * 3 + 2] - pv[j * 3 + 2]);
          // ignore the pelvis itself; parts moving with the body barely change relative to it
          if (d > 0.25) jumps.push(d);
          if (d > 0.4) big40++;
          if (d > maxJump) { maxJump = d; worst = `player ${an.p.id} part ${j} frame ${f}`; }
        }
      }
      prev.set(an, cur);
    }
    frames++;
  }
  return { frames, nan, maxJump: +maxJump.toFixed(3), worst, bigJumps: jumps.length, over40cm: big40, animators: (v.animators || []).length };
});
console.log(JSON.stringify(r));
console.log(errors.length ? errors.join('\n') : 'no errors');
await browser.close();
