// The match report fits the window without a scrollbar (desktop sizes down to 960x540,
// the CrazyGames frame, short laptops, phones in landscape and portrait), with the
// reward line and the rewarded "Double your XP" button showing; only an opened "More
// stats" may scroll. Runs the CrazyGames build with the stand-in SDK. Screenshots:
// tests/out/report_<w>x<h>.png. Needs `npm run crazygames` and `node server.js`.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const fake = fs.readFileSync(new URL('./fakes/crazygames-sdk.js', import.meta.url), 'utf8');
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errors = [];
const results = [];
const check = (name, ok, info = '') => { const l = `${ok ? 'ok  ' : 'FAIL'} ${name}${info ? ' - ' + info : ''}`; results.push(l); console.log(l); };
const SIZES = [[1920, 1080], [1280, 720], [1150, 590], [1024, 576], [960, 540], [800, 450, true], [844, 390, true], [667, 340, true], [390, 844, true]];
for (const [w, h, touch] of SIZES) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...(touch ? { isMobile: true, hasTouch: true, deviceScaleFactor: 1 } : {}) });
  await ctx.addInitScript(() => { localStorage.setItem('firsttouch.tutorial', 'done'); localStorage.setItem('firsttouch.settings.v1', JSON.stringify({ rev: 3, quality: 'low' })); });
  const page = await ctx.newPage();
  page.setDefaultTimeout(240000);
  page.on('pageerror', (e) => errors.push(e.message));
  await page.route('https://sdk.crazygames.com/**', (r) => r.fulfill({ status: 200, contentType: 'application/javascript', body: fake }));
  await page.goto('http://localhost:8080/crazygames/upload/index.html?half=6&cguser=SuperStriker99');
  await page.waitForFunction(() => window.__ft, null, { timeout: 60000 });
  await page.evaluate(() => { const a = window.__ft; a.view.noDraw = true; a.screens.newCareer(); document.querySelector('[data-act="go"]').click(); });
  await page.evaluate(() => { const a = window.__ft; a.platform.lastVideoAt = performance.now(); a.playCareerMatch(); });
  await page.waitForFunction(() => window.__ft.session, null, { timeout: 60000 });
  // a big win with a long list of scorers: the tallest report there is
  await page.evaluate(() => {
    const a = window.__ft, s = a.session, m = s.match; a.loop = () => {}; a.halftimeBreak = () => {}; a.unpause();
    let n = 0; while (m.phase !== 'fulltime' && n++ < 120 * 900) { m.step(1 / 120); if (m.phase === 'goal' || m.phase === 'halftime') m.requestSkip(); }
    const t = s.human.team;
    for (let i = 0; i < 6; i++) m.stats.goalLog.push({ team: i < 5 ? t : 1 - t, scorer: i % 2 ? s.human.name : 'N. Ibrahimovic-Larsen', clock: `${10 + i * 12}:0${i}`, half: 1 });
    m.stats.s(s.human).goals += 3;
    m.teams[t].score = 5; m.teams[1 - t].score = 1; m.phaseT = 5; s.frame(1 / 30);
  });
  await page.waitForSelector('.result', { timeout: 30000 });
  await page.waitForTimeout(900);
  const r = await page.evaluate(() => {
    const scr = document.querySelector('.screens .screen');
    const act = document.querySelector('[data-act="cont"]').getBoundingClientRect();
    return { sh: scr.scrollHeight, ch: scr.clientHeight, sw: scr.scrollWidth, cw: scr.clientWidth, rw: !!document.querySelector('[data-act="double"]'), reward: !!document.querySelector('.reward'), actBottom: Math.round(act.bottom), name: window.__ft.store.career.player.name };
  });
  await page.screenshot({ path: `tests/out/report_${w}x${h}.png` });
  check(`${w}x${h}: the report fits without scrolling, buttons in view`, r.sh <= r.ch + 1 && r.sw <= r.cw + 1 && r.actBottom <= h && r.rw && r.reward, JSON.stringify(r));
  if (w === 1150) {
    check('the player plays under the CrazyGames username', r.name === 'SuperStriker99', r.name);
    await page.click('[data-act="more"]');
    await page.waitForTimeout(300);
    const open = await page.evaluate(() => { const scr = document.querySelector('.screens .screen'); return { sh: scr.scrollHeight, ch: scr.clientHeight }; });
    check('opening More stats may scroll (the only case)', open.sh >= open.ch, JSON.stringify(open));
  }
  await ctx.close();
}
console.log(errors.length ? 'page errors:\n' + errors.join('\n') : 'no errors');
await browser.close();
