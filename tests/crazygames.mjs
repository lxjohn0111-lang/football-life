// CrazyGames build (crazygames/upload/index.html) with a stand-in SDK (tests/fakes): saves
// go through the data module and survive a reload, earlier localStorage saves are copied in,
// loading and gameplay events follow real play (pauses for lost focus don't count),
// happytime on a win, the platform mute silences the game, and on other domains
// ("disabled") or without the data module the game falls back to localStorage.
// Ads: midgame ads only just before play starts (kick-off from the menus, Play again, the
// second half), never on navigational buttons and never two video ads back to back, the
// game paused and muted while one plays and the second half starting by itself after a
// half-time ad; no banners at all; rewarded ads (match boost, double XP, extra training)
// that give their reward only when watched, and aren't offered when no ad can play.
// Also: settings are saved once (Done), Esc freeing the mouse never opens the menu, Tab
// frees and captures the cursor (gameplayStop / gameplayStart with it), a refused capture
// just asks for another click, drag-to-look can go back to a captured cursor, and the
// player's name is locked to the CrazyGames username (or the guest name).
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
  await page.evaluate(() => { const s = window.__ft.screens; s.newCareer(); document.querySelector('[data-act="go"]').click(); });
  await page.evaluate(() => { const a = window.__ft; a.settings.sensitivity = 1.7; a.applySettings(); a.commitSettings(); });
  const stored = await page.evaluate(() => ({ cloud: !!localStorage.getItem('cgcloud:firsttouch.career'), local: !!localStorage.getItem('firsttouch.career'), sens: JSON.parse(localStorage.getItem('cgcloud:firsttouch.settings.v1')).sensitivity }));
  check('career and settings are written through the data module only', stored.cloud && !stored.local && stored.sens === 1.7, JSON.stringify(stored));
  // the settings screen: changes apply at once, but are saved once, when Done is pressed
  await page.evaluate(() => window.__ft.screens.settings(false, 'audio'));
  const saves = async () => (await calls(page)).filter((x) => x === 'data.setItem:firsttouch.settings.v1').length;
  const s0 = await saves();
  for (const v of ['0.2', '0.4', '0.6', '0.3', '0.9']) await page.locator('#s-master').fill(v);
  const s1 = await saves();
  const live = await page.evaluate(() => window.__ft.settings.master);
  await page.click('[data-act="back"]');
  const s2 = await saves();
  check('settings apply at once but are saved once, on Done', s1 === s0 && live === 0.9 && s2 === s0 + 1, JSON.stringify({ before: s0, whileChanging: s1, afterDone: s2 }));
  await page.reload();
  await page.waitForFunction(() => window.__ft, null, { timeout: 30000 });
  await page.waitForTimeout(500);
  const back = await page.evaluate(() => ({ name: window.__ft.store.career && window.__ft.store.career.player.name, sens: window.__ft.settings.sensitivity }));
  check('after a reload the career and settings come back from the data module', back.name === 'A. Newcomer' && back.sens === 1.7, JSON.stringify(back));
  await ctx.close();
}

// ---------------------------------------------------------------- gameplay events, ads, mute
{
  const ctx = await browser.newContext({ viewport: { width: 640, height: 360 } });
  await ctx.addInitScript(() => { localStorage.setItem('firsttouch.tutorial', 'done'); localStorage.setItem('firsttouch.settings.v1', JSON.stringify({ rev: 3, quality: 'low' })); });
  const page = await open(ctx, '&auto=quick&home=chesterfield&away=grimsby&venue=community&half=6');
  // the test drives the app by hand (the software GPU is slow): stop its loop (half time's
  // ad break has its own test below)
  await page.evaluate(() => { const a = window.__ft; a.loop = () => {}; a.view.noDraw = true; a.halftimeBreak = () => {}; });
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
  check('losing focus opens the pause menu and sends gameplayStop', c[c.length - 1] === 'gameplayStop' && (await page.evaluate(() => window.__ft.paused && !!document.querySelector('[data-act="exit"]'))), c.slice(-3).join(','));
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
  check('no ad on the result screen', !c.some((x) => x.startsWith('requestAd')));
  // Play again starts play: the midgame ad comes first, then the new match
  await page.click('[data-act="again"]');
  await page.waitForTimeout(150);
  const during = await page.evaluate(() => ({ disabled: [...document.querySelectorAll('.result button')].every((b) => b.disabled) }));
  await page.waitForFunction(() => window.__ft.session && window.__ft.screens.current === 'click', null, { timeout: 30000 });
  c = await calls(page);
  check('Play again is a midgame ad break, then the match starts', c.includes('requestAd:midgame') && during.disabled, JSON.stringify(during));
  check('the game is muted while the ad plays and unmuted after', (await page.evaluate(() => window.__cg.mutedDuringAd)) === true && (await page.evaluate(() => !window.__ft.audio.platformMute)));
  // Esc frees the mouse during play: a "click to continue" card, never the pause menu
  await page.evaluate(() => { const a = window.__ft; a.input.dragMode = false; a.unpause(); a.input.onLockLost(); });
  const esc = await page.evaluate(() => ({ paused: window.__ft.paused, screen: window.__ft.screens.current, menu: !!document.querySelector('[data-act="exit"]'), text: document.querySelector('.screens').textContent }));
  check('Esc (the mouse freed) never opens the pause menu', esc.paused && esc.screen === 'click' && !esc.menu && /Click to continue/.test(esc.text), JSON.stringify({ ...esc, text: esc.text.slice(0, 40) }));
  await page.keyboard.press('KeyP');
  await page.waitForTimeout(200);
  check('P opens the pause menu', await page.evaluate(() => !!document.querySelector('[data-act="exit"]')));
  await ctx.close();
}

// ---------------------------------------------------------------- an ad that fails
{
  const ctx = await browser.newContext({ viewport: { width: 640, height: 360 } });
  await ctx.addInitScript(() => localStorage.setItem('firsttouch.tutorial', 'done'));
  const page = await open(ctx, '&cgad=error&auto=quick&venue=community&half=6');
  await page.evaluate(() => { const a = window.__ft; a.loop = () => {}; a.view.noDraw = true; a.unpause(); const s = a.session, m = s.match; let n = 0; while (m.phase !== 'fulltime' && n++ < 120 * 900) { m.step(1 / 120); if (m.phase === 'goal' || m.phase === 'halftime') m.requestSkip(); } m.phaseT = 5; s.frame(1 / 30); });
  await page.waitForFunction(() => document.querySelector('[data-act="again"]'), null, { timeout: 30000 });
  await page.click('[data-act="again"]');
  await page.waitForFunction(() => window.__ft.screens.current === 'click', null, { timeout: 10000 }).catch(() => {});
  check('a failed ad still continues the game', await page.evaluate(() => window.__ft.screens.current === 'click' && !!window.__ft.session));
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

// ---------------------------------------------------------------- where midgame ads may show, no banners
const midgames = async (page) => (await calls(page)).filter((x) => x === 'requestAd:midgame').length;
const toFullTime = (page) => page.evaluate(() => { const a = window.__ft, s = a.session, m = s.match; a.halftimeBreak = () => {}; let n = 0; while (m.phase !== 'fulltime' && n++ < 120 * 900) { m.step(1 / 120); if (m.phase === 'goal' || m.phase === 'halftime') m.requestSkip(); } m.phaseT = 5; s.frame(1 / 30); });
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(() => { localStorage.setItem('firsttouch.tutorial', 'done'); localStorage.setItem('firsttouch.settings.v1', JSON.stringify({ rev: 3, quality: 'low' })); });
  const page = await open(ctx, '&half=6');
  await page.evaluate(() => { window.__ft.view.noDraw = true; });
  await page.waitForTimeout(1500);
  check('no banners anywhere', !(await calls(page)).some((x) => /banner/i.test(x)) && (await page.evaluate(() => !document.querySelector('.ad-slot'))));
  await page.click('[data-act="quick"]');
  await page.click('[data-act="go"]');
  await page.waitForFunction(() => window.__ft.session && window.__ft.screens.current === 'click', null, { timeout: 30000 });
  check('kick-off from the menus is a midgame ad break', (await midgames(page)) === 1);
  // leaving a match from the pause menu is navigation: no ad
  await page.evaluate(() => { const a = window.__ft; a.input.dragMode = true; a.unpause(); a.pause('user'); a.platform.lastVideoAt = -1e9; });
  await page.click('[data-act="exit"]');
  await page.waitForFunction(() => document.querySelector('.menu'), null, { timeout: 10000 });
  check('Exit from the pause menu shows no ad', (await midgames(page)) === 1);
  // straight back into a match within a minute of the last ad: no second ad
  await page.evaluate(() => { window.__ft.platform.lastVideoAt = performance.now(); });
  await page.click('[data-act="quick"]');
  await page.click('[data-act="go"]');
  await page.waitForFunction(() => window.__ft.session && window.__ft.screens.current === 'click', null, { timeout: 30000 });
  check('never two video ads back to back', (await midgames(page)) === 1);
  // the result screen's navigational buttons: no ad
  await page.evaluate(() => { const a = window.__ft; a.loop = () => {}; a.unpause(); a.platform.lastVideoAt = -1e9; });
  await toFullTime(page);
  await page.waitForSelector('[data-act="change"]', { timeout: 30000 });
  await page.click('[data-act="change"]');
  await page.waitForTimeout(300);
  check('Change teams on the result screen shows no ad', (await midgames(page)) === 1 && (await page.evaluate(() => window.__ft.screens.current === 'quick')));
  await ctx.close();
}

// ---------------------------------------------------------------- half time ad break
{
  const ctx = await browser.newContext({ viewport: { width: 640, height: 360 } });
  await ctx.addInitScript(() => { localStorage.setItem('firsttouch.tutorial', 'done'); localStorage.setItem('firsttouch.settings.v1', JSON.stringify({ rev: 3, quality: 'low' })); });
  const page = await open(ctx, '&auto=quick&venue=community&half=6');
  await page.evaluate(() => { const a = window.__ft; a.view.noDraw = true; a.unpause(); });
  await page.waitForFunction(() => window.__cg.calls.includes('requestAd:midgame'), null, { timeout: 120000 });
  const atHalf = await page.evaluate(() => ({ phase: window.__ft.session.match.phase, hold: window.__ft.adHold, playing: window.__ft.platform.playing }));
  check('half time is a midgame ad break: the match waits for the answer', atHalf.phase === 'halftime' && atHalf.hold && !atHalf.playing, JSON.stringify(atHalf));
  await page.waitForTimeout(800);
  const after = await page.evaluate(() => ({ cg: { paused: window.__cg.pausedDuringAd, gameplay: window.__cg.gameplayDuringAd, muted: window.__cg.mutedDuringAd, tStart: window.__cg.tStart, tEnd: window.__cg.tEnd }, screen: window.__ft.screens.current, paused: window.__ft.paused }));
  check('during the ad the match is paused, muted and frozen', after.cg.paused === true && after.cg.gameplay === false && after.cg.muted === true && after.cg.tStart === after.cg.tEnd, JSON.stringify(after.cg));
  const cd = await page.evaluate(() => ({ screen: window.__ft.screens.current, paused: window.__ft.paused, countdown: !!window.__ft.countdown, shown: !document.querySelector('.hud-count').classList.contains('hidden'), title: document.querySelector('.hud-count .c-title').textContent, t: window.__ft.session.match.time }));
  check('after the ad the second half starts by itself: no click, a countdown plays', cd.screen !== 'click' && !cd.paused && cd.countdown && cd.shown && /second half/i.test(cd.title), JSON.stringify(cd));
  await page.waitForTimeout(600);
  check('the match waits during the countdown', (await page.evaluate(() => window.__ft.session.match.time)) === cd.t || !(await page.evaluate(() => !!window.__ft.countdown)));
  await page.waitForFunction(() => window.__ft.session.match.half === 2 && window.__ft.session.match.phase === 'playing', null, { timeout: 60000 });
  await page.waitForTimeout(900);
  const go = await page.evaluate(() => ({ paused: window.__ft.paused, playing: window.__ft.platform.playing, count: !document.querySelector('.hud-count').classList.contains('hidden'), hint: !!document.querySelector('.tut-click:not([hidden])') && /take control/i.test(document.querySelector('.tut-click:not([hidden])').textContent) }));
  check('then the second half plays, with a hint that a click captures the mouse', !go.paused && go.playing && !go.count && go.hint, JSON.stringify(go));
  await ctx.close();
}

// ---------------------------------------------------------------- rewarded ads
const career = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.__ft.store.career)));
const cloudCareer = async (page) => JSON.parse(JSON.parse(await page.evaluate(() => localStorage.getItem('cgcloud:firsttouch.career'))).data);
const totalXp = (c) => c.player.level * 100 + c.player.xp;
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(() => { localStorage.setItem('firsttouch.tutorial', 'done'); localStorage.setItem('firsttouch.settings.v1', JSON.stringify({ rev: 3, quality: 'low' })); });
  const page = await open(ctx, '&half=6');
  await page.evaluate(() => { window.__ft.view.noDraw = true; });
  await page.evaluate(() => { const s = window.__ft.screens; s.newCareer(); document.querySelector('[data-act="go"]').click(); });
  await page.waitForTimeout(400);
  check('career hub offers a match boost (labelled as an ad)', await page.evaluate(() => /AD/.test(document.querySelector('[data-act="rwBoost"]')?.textContent || '')));
  // an ad that fails: no reward, the button comes back
  await page.evaluate(() => { window.__cg.failNext = true; });
  await page.click('[data-act="rwBoost"]');
  await page.waitForTimeout(400);
  check('a rewarded ad that fails gives nothing and says so', await page.evaluate(() => !window.__ft.store.career.boost && !!document.querySelector('.toast.bad') && !document.querySelector('[data-act="rwBoost"]').disabled));
  await page.waitForTimeout(3500);
  await page.click('[data-act="rwBoost"]');
  await page.waitForSelector('.boost-on', { timeout: 10000 });
  let c = await career(page);
  check('watching it boosts the next match and is saved', c.boost === 6 && (await cloudCareer(page)).boost === 6);
  const base = c.player.attrs;
  const midBefore = (await calls(page)).filter((x) => x === 'requestAd:midgame').length;
  await page.click('[data-act="play"]');
  await page.waitForFunction(() => window.__ft.session, null, { timeout: 30000 });
  const attrs = await page.evaluate(() => ({ ...window.__ft.session.match.human.attrs }));
  check('no midgame ad right after the rewarded one', (await calls(page)).filter((x) => x === 'requestAd:midgame').length === midBefore);
  check('the boost lifts every attribute in the match', Object.keys(base).every((k) => attrs[k] === Math.min(99, base[k] + 6)), JSON.stringify({ base, attrs }));
  // play it to full time
  await page.evaluate(() => { const a = window.__ft; a.loop = () => {}; a.halftimeBreak = () => {}; a.unpause(); const s = a.session, m = s.match; let n = 0; while (m.phase !== 'fulltime' && n++ < 120 * 900) { m.step(1 / 120); if (m.phase === 'goal' || m.phase === 'halftime') m.requestSkip(); } m.phaseT = 5; s.frame(1 / 30); a.updatePlatform(); });
  await page.waitForSelector('[data-act="double"]', { timeout: 30000 });
  c = await career(page);
  check('the boost is used up by that match', c.boost === undefined);
  const before = totalXp(c);
  const gained = await page.evaluate(() => window.__ft.session.summary.xp);
  await page.click('[data-act="double"]');
  await page.waitForSelector('.rw-done', { timeout: 10000 });
  c = await career(page);
  check('Double XP adds the match XP again and saves it', totalXp(c) - before === gained && totalXp(await cloudCareer(page)) === totalXp(c), `${before} -> ${totalXp(c)} (+${gained})`);
  // training: an extra XP session
  await page.evaluate(() => { const a = window.__ft; a.endSession(); a.store.career.trainingAvailable = false; a.screens.training(true); });
  await page.click('[data-act="rwTrain"]');
  await page.waitForFunction(() => window.__ft.store.career.trainingAvailable === true, null, { timeout: 10000 });
  check('an extra training session unlocks XP for the next drill', /Your next drill earns XP/.test(await page.evaluate(() => document.querySelector('.screens').textContent)));
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(() => localStorage.setItem('firsttouch.tutorial', 'done'));
  const page = await open(ctx, '&cgadblock=1');
  await page.evaluate(() => { const s = window.__ft.screens; s.newCareer(); document.querySelector('[data-act="go"]').click(); });
  await page.waitForTimeout(300);
  check('with an ad blocker no rewarded buttons are offered', await page.evaluate(() => !document.querySelector('.btn.rw') && !!document.querySelector('[data-act="play"]')));
  await ctx.close();
}
// no SDK (the plain build): no ads, no banners, no rewarded buttons
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(() => localStorage.setItem('firsttouch.tutorial', 'done'));
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://localhost:8080/index.html');
  await page.waitForFunction(() => window.__ft, null, { timeout: 30000 });
  await page.evaluate(() => { const s = window.__ft.screens; s.newCareer(); document.querySelector('[data-act="go"]').click(); });
  await page.waitForTimeout(500);
  check('without the SDK: no banner slots and no rewarded buttons', await page.evaluate(() => !document.querySelector('.ad-slot') && !document.querySelector('.btn.rw')));
  await ctx.close();
}

// ---------------------------------------------------------------- cursor lock: Tab, refused captures, drag-to-look
{
  const ctx = await browser.newContext({ viewport: { width: 960, height: 540 } });
  await ctx.addInitScript(() => { localStorage.setItem('firsttouch.tutorial', 'done'); localStorage.setItem('firsttouch.settings.v1', JSON.stringify({ rev: 3, quality: 'low' })); });
  const page = await open(ctx, '&auto=quick&venue=community&half=60');
  // the browser's pointer lock is stood in for: requests are counted, grants are simulated
  await page.evaluate(() => {
    const a = window.__ft, inp = a.input;
    a.view.noDraw = true;
    window.__req = 0;
    inp.requestLock = () => { window.__req++; return true; };
    inp.exitLock = () => { if (inp.locked) { inp.locked = false; inp.lastLockExit = performance.now(); } };
    window.__grant = () => { inp.locked = true; inp.dragMode = false; inp.onLockGained(); };
    a.unpause(); a.updatePlatform();
  });
  const st = () => page.evaluate(() => { const a = window.__ft; a.updatePlatform(); return { paused: a.paused, screen: a.screens.current, playing: a.platform.playing, req: window.__req, locked: a.input.locked, drag: a.input.dragMode, text: (document.querySelector('.screens').textContent || '').slice(0, 80) }; });
  await page.keyboard.press('Tab');
  await page.waitForTimeout(100);
  await page.evaluate(() => window.__grant());
  let s1 = await st();
  check('Tab captures the cursor during play', s1.req === 1 && s1.locked && !s1.paused && s1.playing, JSON.stringify(s1));
  const focusBefore = await page.evaluate(() => document.activeElement && document.activeElement.tagName);
  await page.keyboard.press('Tab');
  await page.waitForTimeout(100);
  s1 = await st();
  const focusAfter = await page.evaluate(() => document.activeElement && document.activeElement.tagName);
  let c = await calls(page);
  check('Tab again frees it: the match waits behind "Click to continue", gameplayStop', !s1.locked && s1.paused && s1.screen === 'click' && /Tab/.test(s1.text) && c[c.length - 1] === 'gameplayStop' && focusBefore === focusAfter, JSON.stringify({ ...s1, focusBefore, focusAfter }));
  // Tab right after the cursor was freed: the capture waits out the browser's 1 s guard
  await page.keyboard.press('Tab');
  await page.waitForTimeout(300);
  const early = (await st()).req;
  await page.waitForTimeout(1200);
  const late = (await st()).req;
  check('capturing again waits out the browser\'s second after a release', early === 1 && late === 2, JSON.stringify({ early, late }));
  await page.evaluate(() => window.__grant());
  s1 = await st();
  c = await calls(page);
  check('and play resumes with gameplayStart once captured', !s1.paused && s1.locked && c[c.length - 1] === 'gameplayStart', JSON.stringify(s1));
  // a refused capture: no warning, just one more click (drag-to-look offered after two misses)
  await page.evaluate(() => { const a = window.__ft; a.pause('lock'); a.input.lastLockExit = 0; a.resume(); a.input.onLockError(); });
  s1 = await st();
  check('a refused capture asks for one more click, no warning', s1.paused && s1.screen === 'click' && /once more/i.test(s1.text) && !(await page.evaluate(() => !!document.querySelector('[data-act="drag"]'))), JSON.stringify(s1));
  await page.evaluate(() => { const a = window.__ft; a.resume(); a.input.onLockError(); });
  check('after two refusals drag-to-look is offered', await page.evaluate(() => !!document.querySelector('[data-act="drag"]')));
  await page.click('[data-act="drag"]');
  await page.waitForTimeout(400);
  s1 = await st();
  const hint = await page.evaluate(() => { const e = document.querySelector('.drag-hint'); return !!e && !e.hidden && /Tab/.test(e.textContent); });
  check('drag-to-look plays on, with a reminder that Tab captures the cursor', !s1.paused && s1.drag && hint, JSON.stringify({ ...s1, hint }));
  const before = (await st()).req;
  await page.keyboard.press('Tab');
  await page.waitForTimeout(100);
  s1 = await st();
  check('Tab leaves drag-to-look and captures the cursor again', s1.req === before + 1 && !s1.drag, JSON.stringify(s1));
  await ctx.close();
}

// ---------------------------------------------------------------- the player's name is locked
for (const [query, expect, label] of [['&cguser=SuperStriker99', 'SuperStriker99', 'logged in'], ['', 'A. Newcomer', 'guest']]) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(() => {
    localStorage.setItem('firsttouch.tutorial', 'done');
  });
  const page = await open(ctx, query);
  await page.evaluate(() => { window.__ft.view.noDraw = true; window.__ft.screens.newCareer(); });
  const f = await page.evaluate(() => ({ input: !!document.querySelector('#nc-name'), shown: (document.querySelector('#nc-name-locked') || {}).textContent }));
  check(`${label}: the name can't be typed in, it is the ${label === 'guest' ? 'guest name' : 'CrazyGames username'}`, !f.input && (f.shown || '').includes(expect), JSON.stringify(f));
  await page.click('[data-act="go"]');
  const name = await page.evaluate(() => window.__ft.store.career.player.name);
  check(`${label}: the career plays under that name`, name === expect, name);
  if (label === 'guest') {
    // logging in during the session: the career takes the account's username
    await page.evaluate(() => window.__cg.login('LateLogin'));
    await page.waitForTimeout(200);
    const after = await page.evaluate(() => ({ name: window.__ft.store.career.player.name, saved: JSON.parse(JSON.parse(localStorage.getItem('cgcloud:firsttouch.career')).data).player.name, hub: document.querySelector('.screens').textContent.includes('LateLogin') }));
    check('logging in during the session switches the career to the username', after.name === 'LateLogin' && after.saved === 'LateLogin' && after.hub, JSON.stringify(after));
  } else {
    // a name typed in before the lock is replaced when the career loads
    await page.evaluate(() => { const a = window.__ft; a.store.career.player.name = 'Typed Name'; a.store.save(); });
    await page.reload();
    await page.waitForFunction(() => window.__ft, null, { timeout: 30000 });
    check('an older typed-in name is replaced by the username on load', (await page.evaluate(() => window.__ft.store.career.player.name)) === expect);
  }
  await ctx.close();
}

console.log(errors.length ? 'page errors:\n' + errors.join('\n') : 'no errors');
await browser.close();
