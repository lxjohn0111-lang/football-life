// CrazyGames build (crazygames/upload/index.html) with a stand-in SDK (tests/fakes): saves
// go through the data module and survive a reload, earlier localStorage saves are copied in,
// loading and gameplay events follow real play (pauses for lost focus don't count), a
// midgame ad plays (muted) only when leaving a match's result screen, happytime on a win,
// the platform mute silences the game, and on other domains ("disabled") or without the
// data module the game falls back to localStorage.
// Needs `npm run crazygames` first and `node server.js` running. Usage: node tests/crazygames.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const fake = fs.readFileSync(new URL('./fakes/crazygames-sdk.js', import.meta.url), 'utf8');
const BASE = 'http://localhost:8080/crazygames/upload/index.html';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errors = [];
const results = [];
const check = (name, ok, info = '') => { const line = `${ok ? 'ok  ' : 'FAIL'} ${name}${info ? ' - ' + info : ''}`; results.push(line); console.log(line); };

async function open(ctx, query = '') {
  const page = await ctx.newPage();
  page.setDefaultTimeout(180000);
  page.on('pageerror', (e) => errors.push(e.message));
  await page.route('https://sdk.crazygames.com/**', (r) => r.fulfill({ status: 200, contentType: 'application/javascript', body: fake }));
  await page.goto(`${BASE}?x=1${query}`);
  await page.waitForFunction(() => window.__ft, null, { timeout: 30000 });
  await page.waitForTimeout(500);
  return page;
}
const calls = (page) => page.evaluate(() => window.__cg.calls.slice());

// ---------------------------------------------------------------- saving
{
  const ctx = await browser.newContext({ viewport: { width: 640, height: 360 } });
  // an older save in this browser's localStorage, from before the data module
  await ctx.addInitScript(() => {
    if (!sessionStorage.getItem('seeded')) {
      sessionStorage.setItem('seeded', '1');
      localStorage.setItem('firsttouch.tutorial', 'done');
      localStorage.setItem('firsttouch.settings.v1', JSON.stringify({ rev: 3, quality: 'low', fov: 111 }));
    }
  });
  let page = await open(ctx);
  const st = await page.evaluate(() => ({ env: window.__ft.platform.env, saves: window.__ft.platform.saves, fov: window.__ft.settings.fov }));
  const c0 = await calls(page);
  check('SDK initialised before the game loads', c0[0] === 'init' && c0.includes('loadingStart') && c0.includes('loadingStop') && c0.indexOf('init') < c0.indexOf('loadingStart'), c0.slice(0, 6).join(','));
  check('saves go to the data module', st.env === 'crazygames' && st.saves === 'crazygames', JSON.stringify(st));
  check('earlier localStorage saves are copied into the data module', st.fov === 111 && (await page.evaluate(() => !!localStorage.getItem('cgcloud:firsttouch.settings.v1'))));
  // a new career and a settings change
  await page.evaluate(() => { const s = window.__ft.screens; s.newCareer(); document.querySelector('#nc-name').value = 'Cloud Kid'; document.querySelector('[data-act="go"]').click(); });
  await page.evaluate(() => { const a = window.__ft; a.settings.sensitivity = 1.7; a.applySettings(); });
  const stored = await page.evaluate(() => ({ cloud: !!localStorage.getItem('cgcloud:firsttouch.career'), local: !!localStorage.getItem('firsttouch.career'), sens: JSON.parse(localStorage.getItem('cgcloud:firsttouch.settings.v1')).sensitivity }));
  check('career and settings are written through the data module only', stored.cloud && !stored.local && stored.sens === 1.7, JSON.stringify(stored));
  await page.reload();
  await page.waitForFunction(() => window.__ft, null, { timeout: 30000 });
  await page.waitForTimeout(500);
  const back = await page.evaluate(() => ({ name: window.__ft.store.career && window.__ft.store.career.player.name, sens: window.__ft.settings.sensitivity }));
  check('after a reload the career and settings come back from the data module', back.name === 'Cloud Kid' && back.sens === 1.7, JSON.stringify(back));
  await ctx.close();
}

// ---------------------------------------------------------------- gameplay events, ads, mute
{
  const ctx = await browser.newContext({ viewport: { width: 640, height: 360 } });
  await ctx.addInitScript(() => { localStorage.setItem('firsttouch.tutorial', 'done'); localStorage.setItem('firsttouch.settings.v1', JSON.stringify({ rev: 3, quality: 'low' })); });
  const page = await open(ctx, '&auto=quick&home=chesterfield&away=grimsby&venue=community&half=6');
  // the test drives the app by hand (the software GPU is slow): stop its loop
  await page.evaluate(() => { const a = window.__ft; a.loop = () => {}; a.view.noDraw = true; });
  const tick = () => page.evaluate(() => { const a = window.__ft; if (a.session) a.session.frame(1 / 30); a.updatePlatform(); });
  await tick();
  let c = await calls(page);
  check('no gameplayStart on the click-to-play screen', !c.includes('gameplayStart'), c.join(','));
  await page.evaluate(() => window.__ft.unpause()); await tick();
  c = await calls(page);
  check('gameplayStart when play begins', c.filter((x) => x === 'gameplayStart').length === 1, c.slice(-3).join(','));
  await page.evaluate(() => window.__ft.pause('user')); await tick();
  c = await calls(page);
  check('gameplayStop on a pause', c[c.length - 1] === 'gameplayStop', c.slice(-3).join(','));
  await page.evaluate(() => window.__ft.unpause()); await tick();
  await page.evaluate(() => window.__ft.onBlur()); await tick();
  c = await calls(page);
  check('losing focus pauses the game but sends no gameplayStop', c[c.length - 1] === 'gameplayStart' && (await page.evaluate(() => window.__ft.paused)), c.slice(-3).join(','));
  await page.evaluate(() => window.__ft.unpause()); await tick();
  // platform mute
  await page.evaluate(() => { window.__ft.audio.init(); window.__cg.setMute(true); });
  const muted = await page.evaluate(() => window.__ft.audio.platformMute);
  await page.evaluate(() => window.__cg.setMute(false));
  check('the platform mute setting silences the game', muted === true && (await page.evaluate(() => !window.__ft.audio.platformMute)));
  // play to a won full time: result screen, then leaving it shows a midgame ad first
  await page.evaluate(() => { const a = window.__ft, s = a.session, m = s.match; let n = 0; while (m.phase !== 'fulltime' && n++ < 120 * 900) { m.step(1 / 120); if (m.phase === 'goal' || m.phase === 'halftime') m.requestSkip(); } m.teams[s.human.team].score = m.teams[1 - s.human.team].score + 1; m.phaseT = 5; });
  await tick();
  await page.waitForFunction(() => document.querySelector('[data-act="again"]'), null, { timeout: 30000 });
  await tick();
  c = await calls(page);
  check('gameplayStop and happytime at a won full time', c.includes('happytime') && c.lastIndexOf('gameplayStop') > c.lastIndexOf('gameplayStart'), c.slice(-4).join(','));
  check('no ad before the player leaves the result screen', !c.some((x) => x.startsWith('requestAd')));
  await page.click('[data-act="menu"]');
  await page.waitForTimeout(150);
  const during = await page.evaluate(() => ({ menu: !!document.querySelector('.menu'), disabled: [...document.querySelectorAll('.result button')].every((b) => b.disabled) }));
  await page.waitForFunction(() => document.querySelector('.menu'), null, { timeout: 10000 });
  c = await calls(page);
  check('leaving the result screen shows a midgame ad, then goes on', c.includes('requestAd:midgame') && !during.menu && during.disabled, JSON.stringify(during));
  check('the game is muted while the ad plays and unmuted after', (await page.evaluate(() => window.__cg.mutedDuringAd)) === true && (await page.evaluate(() => !window.__ft.audio.platformMute)));
  await ctx.close();
}

// ---------------------------------------------------------------- an ad that fails
{
  const ctx = await browser.newContext({ viewport: { width: 640, height: 360 } });
  await ctx.addInitScript(() => localStorage.setItem('firsttouch.tutorial', 'done'));
  const page = await open(ctx, '&cgad=error&auto=quick&venue=community&half=6');
  await page.evaluate(() => { const a = window.__ft; a.loop = () => {}; a.view.noDraw = true; a.unpause(); const s = a.session, m = s.match; let n = 0; while (m.phase !== 'fulltime' && n++ < 120 * 900) { m.step(1 / 120); if (m.phase === 'goal' || m.phase === 'halftime') m.requestSkip(); } m.phaseT = 5; s.frame(1 / 30); });
  await page.waitForFunction(() => document.querySelector('[data-act="menu"]'), null, { timeout: 30000 });
  await page.click('[data-act="menu"]');
  await page.waitForFunction(() => document.querySelector('.menu'), null, { timeout: 10000 }).catch(() => {});
  check('a failed ad still continues the game', await page.evaluate(() => !!document.querySelector('.menu')));
  await ctx.close();
}

// ---------------------------------------------------------------- fallbacks
for (const [query, label] of [['&cgenv=disabled', 'other domains (SDK disabled)'], ['&cgdata=off', 'data module not enabled']]) {
  const ctx = await browser.newContext({ viewport: { width: 640, height: 360 } });
  await ctx.addInitScript(() => localStorage.setItem('firsttouch.tutorial', 'done'));
  const page = await open(ctx, query);
  await page.evaluate(() => { const s = window.__ft.screens; s.newCareer(); document.querySelector('[data-act="go"]').click(); });
  const r = await page.evaluate(() => ({ saves: window.__ft.platform.saves, local: !!localStorage.getItem('firsttouch.career'), menuOk: !!window.__ft.store.career }));
  check(`${label}: falls back to localStorage and keeps working`, r.saves === 'localStorage' && r.local && r.menuOk, JSON.stringify(r));
  await ctx.close();
}

console.log(errors.length ? 'page errors:\n' + errors.join('\n') : 'no errors');
await browser.close();
