// First-run tutorial: shows on a first visit, a scripted player completes every
// step well inside two minutes, the result screen appears, and it never shows
// again. Skipping works from the start card, the pause menu and (touch) the
// coach card's button. Screenshots: tests/out/tut_*.png.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const OUT = 'tests/out';
const style = process.argv[2] || 'classic';
const URL = `http://localhost:8080/index.html?tutorial&nofs&style=${style}`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errors = [];
const results = [];
const check = (name, ok, info = '') => results.push(`${ok ? 'ok  ' : 'FAIL'} ${name}${info ? ' - ' + info : ''}`);
const text = (page) => page.evaluate(() => document.querySelector('.screens').textContent);
const flag = (page) => page.evaluate(() => localStorage.getItem('firsttouch.tutorial'));

// ---------------------------------------------------------- full run (desktop)
{
  const ctx = await browser.newContext({ viewport: { width: 960, height: 540 } });
  const page = await ctx.newPage();
  page.setDefaultTimeout(240000);
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(URL);
  await page.waitForTimeout(3000);
  check('first visit opens the tutorial start card', /Welcome to First Touch/.test(await text(page)) && /Skip tutorial/.test(await text(page)));
  await page.screenshot({ path: `${OUT}/tut_intro_${style}.png` });
  await page.click('[data-act="start"]');
  await page.waitForTimeout(800);
  check('Start begins play', await page.evaluate(() => !window.__ft.paused));
  // look away from the star: the objective arrow points the way
  await page.evaluate(() => {
    const s = window.__ft.session, tut = s.tutorial, h = s.human, m = s.match;
    s.paused = true;
    // wait out any step transition, then face directly away from the current objective
    let n = 0; while (!tut.objective(h.pos.clone()) && n++ < 240) { m.step(1 / 120); tut.step(); }
    const p = tut.objective(h.pos.clone());
    const y = Math.atan2(p.x - h.pos.x, p.z - h.pos.z) + Math.PI;
    s.cam.yaw = y; s.ctl.input.yaw = y; s.cam.pitch = -0.1; s.ctl.input.pitch = -0.1; s.frame(0);
  });
  await page.waitForTimeout(700);
  check('arrow points to an objective that is out of view', await page.evaluate(() => !document.querySelector('.tut-arrow').classList.contains('hidden')));
  await page.screenshot({ path: `${OUT}/tut_look_${style}.png` });
  await page.evaluate(() => { window.__ft.session.paused = false; });
  // scripted player: steps the simulation by hand and plays each step
  const run = await page.evaluate(() => {
    const a = window.__ft, s = a.session, m = s.match, tut = s.tutorial, h = s.human, ctl = s.ctl, inp = ctl.input;
    s.paused = true;
    const log = [];
    const face = (x, z, pitch = -0.2) => { const y = Math.atan2(x - h.pos.x, z - h.pos.z); inp.yaw = y; s.cam.yaw = y; inp.pitch = pitch; s.cam.pitch = pitch; };
    const go = (x, z, sprint = false) => { face(x, z); inp.moveF = Math.hypot(x - h.pos.x, z - h.pos.z) > 0.3 ? 1 : 0; inp.moveR = 0; inp.sprint = sprint; };
    const stop = () => { inp.moveF = 0; inp.moveR = 0; inp.sprint = false; };
    const tick = () => { m.step(1 / 120); tut.step(); };
    let pressed = null, lastIdx = -1;
    for (let i = 0; i < 120 * 130 && !tut.done; i++) {
      const st = tut.current;
      if (tut.idx !== lastIdx) { lastIdx = tut.idx; pressed = null; if (st) log.push(`${st.id}@${tut.t.toFixed(1)}`); }
      if (!st || tut.waitUntil != null) { stop(); tick(); continue; }
      const b = m.ball;
      switch (st.id) {
        case 'look': { const p = tut.star.position; const d = Math.hypot(p.x - h.pos.x, p.z - h.pos.z); face(p.x, p.z, Math.atan2(p.y - 1.65, d)); stop(); break; }
        case 'move': go(tut.target.x, tut.target.z); break;
        case 'sprint': go(tut.target.x, tut.target.z, true); break;
        case 'ball': go(b.pos.x, b.pos.z); break;
        case 'dribble': {
          const g = tut.gateLine, cx = (g.ax + g.bx) / 2, cz = (g.az + g.bz) / 2;
          const dx = cx - h.pos.x, dz = cz - h.pos.z, l = Math.hypot(dx, dz) || 1;
          if (b.owner === h) go(cx + dx / l * 3, cz + dz / l * 3); else go(b.pos.x, b.pos.z);
          break;
        }
        case 'pass': {
          const j = tut.jojo;
          if (b.owner !== h) { if (!b.owner && b.pos.distXZ(h.pos) < 6) go(b.pos.x, b.pos.z); else stop(); break; }
          stop(); face(j.pos.x, j.pos.z);
          if (!pressed && ctl.passTarget === j) { ctl.press('pass'); pressed = 'pass'; tick(); ctl.release('pass'); }
          break;
        }
        case 'receive': stop(); if (!b.owner) face(b.pos.x, b.pos.z); break;
        case 'shoot': {
          if (b.owner !== h) { if (!b.owner && b.speed < 1) go(b.pos.x, b.pos.z); else stop(); break; }
          stop();
          const tx = 32, tz = h.pos.z > 0 ? -1.7 : 1.7, d = Math.hypot(tx - h.pos.x, tz - h.pos.z);
          face(tx, tz, Math.atan2(0.6 - 1.65, d));
          if (!h.action) { ctl.press('shoot'); inp.lmb = true; for (let k = 0; k < 30; k++) tick(); ctl.release('shoot'); inp.lmb = false; }
          break;
        }
        case 'tackle': {
          const tb = b.owner ? b.owner.pos : b.pos;
          go(tb.x, tb.z);
          if (b.owner && b.owner !== h && b.pos.distXZ(h.pos) < 2.6 && !h.action) ctl.press('tackle');
          break;
        }
      }
      tick();
    }
    stop();
    return { log, done: tut.done, t: +tut.t.toFixed(1), stars: tut.stars, results: tut.results.map((r) => `${r.id}:${r.ok ? (r.star ? '★' : 'ok') : 'timeout'}:${r.t.toFixed(1)}`) };
  });
  check('scripted player finishes every step', run.done && run.results.every((r) => !r.includes('timeout')), JSON.stringify(run.results));
  check('whole tutorial under two minutes', run.t < 120, `${run.t} s of play, ${run.stars} stars`);
  await page.evaluate(() => { window.__ft.session.paused = false; });
  await page.waitForFunction(() => /WARM-UP COMPLETE|TIME'S UP/.test(document.querySelector('.screens').textContent), null, { timeout: 60000 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/tut_result_${style}.png` });
  check('result screen with stars', /★/.test(await text(page)) && /Start your career|Continue your career/.test(await text(page)));
  check('finishing marks it done', (await flag(page)) === 'done');
  await page.click('[data-act="menu"]');
  await page.goto(URL);
  await page.waitForTimeout(2500);
  check('not shown again after finishing', !(/Welcome to First Touch/.test(await text(page))) && !!(await page.evaluate(() => document.querySelector('.menu'))));
  await ctx.close();
}

// ---------------------------------------------------------- idle player: still over within two minutes
{
  const ctx = await browser.newContext({ viewport: { width: 640, height: 360 } });
  const page = await ctx.newPage();
  page.setDefaultTimeout(240000);
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(URL);
  await page.waitForTimeout(2500);
  await page.click('[data-act="start"]');
  await page.waitForTimeout(600);
  const idle = await page.evaluate(() => {
    const s = window.__ft.session, m = s.match, tut = s.tutorial, inp = s.ctl.input;
    s.paused = true;
    inp.moveF = 0; inp.moveR = 0; inp.sprint = false; inp.pitch = 0.8; inp.yaw = 0; // staring at the sky
    let n = 0; while (!tut.done && n++ < 120 * 150) { m.step(1 / 120); tut.step(); }
    s.paused = false;
    return { done: tut.done, t: +tut.t.toFixed(1), steps: tut.results.length, timeUp: tut.timeUp };
  });
  check('an idle player is still done within two minutes', idle.done && idle.t <= 120.01, JSON.stringify(idle));
  await page.waitForFunction(() => /WARM-UP COMPLETE|TIME'S UP/.test(document.querySelector('.screens').textContent), null, { timeout: 60000 });
  check('idle run still reaches the result screen', true);
  await ctx.close();
}

// ---------------------------------------------------------- skip from the start card
{
  const ctx = await browser.newContext({ viewport: { width: 960, height: 540 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(URL);
  await page.waitForTimeout(2500);
  await page.click('[data-act="skip"]');
  await page.waitForTimeout(500);
  check('Skip on the start card goes to the main menu', !!(await page.evaluate(() => document.querySelector('.menu'))) && (await flag(page)) === 'skipped');
  await page.goto(URL);
  await page.waitForTimeout(2500);
  check('not shown again after skipping', !(/Welcome to First Touch/.test(await text(page))));
  await ctx.close();
}

// ---------------------------------------------------------- skip from the pause menu
{
  const ctx = await browser.newContext({ viewport: { width: 960, height: 540 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(URL);
  await page.waitForTimeout(2500);
  await page.click('[data-act="start"]');
  await page.waitForTimeout(1200);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  const label = await page.evaluate(() => { const b = document.querySelector('[data-act="exit"]'); return b ? b.textContent : null; });
  check('pause menu offers Skip tutorial', label === 'Skip tutorial', String(label));
  if (label) await page.click('[data-act="exit"]');
  await page.waitForTimeout(500);
  check('skipping from the pause menu ends it for good', (await flag(page)) === 'skipped' && !!(await page.evaluate(() => document.querySelector('.menu'))));
  await ctx.close();
}

// ---------------------------------------------------------- phone: coach card and its Skip button
for (const [w, h, tag] of [[844, 390, 'land'], [390, 844, 'port']]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  page.setDefaultTimeout(240000);
  page.on('pageerror', (e) => errors.push(e.message));
  const cdp = await ctx.newCDPSession(page);
  await page.goto(URL);
  await page.waitForTimeout(2500);
  await page.tap('[data-act="start"]');
  await page.waitForTimeout(1200);
  // advance to the pass step so the card shows a mid-tutorial state with a touch hint
  await page.evaluate(() => { const s = window.__ft.session, tut = s.tutorial, m = s.match; s.paused = true; for (let i = 0; i < 5 && !tut.done; i++) { tut.complete(true); for (let k = 0; k < 130; k++) { m.step(1 / 120); tut.step(); } } s.paused = false; });
  await page.waitForTimeout(1500);
  const card = await page.evaluate(() => { const c = document.querySelector('.coach'); const r = c.getBoundingClientRect(); const sk = document.querySelector('.coach-skip').getBoundingClientRect(); return { visible: !c.classList.contains('hidden'), say: document.querySelector('.coach-say').textContent, hint: document.querySelector('.coach-hint').textContent, top: r.top, bottom: r.bottom, left: r.left, right: r.right, skip: [sk.x + sk.width / 2, sk.y + sk.height / 2] }; });
  check(`phone ${tag}: coach card visible with a touch hint`, card.visible && /PASS/.test(card.hint) && card.say.length <= 30 && card.hint.length <= 30, JSON.stringify({ say: card.say, hint: card.hint }));
  // short and small: the card never takes more than a quarter of the screen height
  check(`phone ${tag}: card stays on screen and small`, card.left >= 0 && card.right <= w && card.top >= 0 && card.bottom < h * 0.25, JSON.stringify([card.left, card.top, card.right, card.bottom].map(Math.round)));
  await page.screenshot({ path: `${OUT}/tut_phone_${tag}_${style}.png` });
  const [sx, sy] = card.skip;
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: sx, y: sy, id: 1 }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForTimeout(800);
  check(`phone ${tag}: Skip button on the coach card works`, (await flag(page)) === 'skipped' && !!(await page.evaluate(() => document.querySelector('.menu'))));
  await ctx.close();
}

console.log(results.join('\n'));
console.log(errors.length ? 'page errors:\n' + errors.join('\n') : 'no errors');
await browser.close();
