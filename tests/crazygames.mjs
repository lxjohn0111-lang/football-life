// CrazyGames build (crazygames/upload/index.html) with a stand-in SDK (tests/fakes): saves
// go through the data module and survive a reload, earlier localStorage saves are copied in,
// loading and gameplay events follow real play (pauses for lost focus don't count),
// happytime on a win, the platform mute silences the game, and on other domains
// ("disabled") or without the data module the game falls back to localStorage.
// Ads: midgame ads at natural breaks only (half time, leaving a result screen, kick-off
// from the menus, leaving a match), never two video ads back to back, the game paused and
// muted while one plays; banners on menu and result screens only, sized to the window,
// never covering the screens, refreshed no faster than the SDK allows, off in Basic
// Launch; rewarded ads (match boost, double XP, extra training) that give their reward
// only when watched, and aren't offered when no ad can play.
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

// ---------------------------------------------------------------- banners
const rectsOf = (page) => page.evaluate(() => {
  const r = (e) => { const b = e.getBoundingClientRect(); return { l: b.left, t: b.top, r: b.right, b: b.bottom }; };
  const slots = [...document.querySelectorAll('.ad-slot')].filter((e) => !e.hidden).map((e) => ({ cls: e.className, box: r(e.querySelector('.ad-box')), slot: r(e) }));
  const scr = document.querySelector('.screens .screen');
  const sr = scr && r(scr);
  // buttons only where they can be seen: the screens scroll and clip what's below their edge
  const btns = [...document.querySelectorAll('.screens .screen button')].filter((b) => b.offsetParent).map(r)
    .map((b) => ({ l: Math.max(b.l, sr.l), t: Math.max(b.t, sr.t), r: Math.min(b.r, sr.r), b: Math.min(b.b, sr.b) })).filter((b) => b.r > b.l && b.b > b.t);
  return { slots, screen: sr, btns, adBottom: getComputedStyle(document.documentElement).getPropertyValue('--ad-bottom').trim(), adRight: getComputedStyle(document.documentElement).getPropertyValue('--ad-right').trim() };
});
const overlaps = (a, b) => a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b;
const bannerReqs = (page, id) => page.evaluate((id) => window.__cg.banners.filter((b) => !id || b.id === id).map((b) => ({ ...b })), id);
// a 1.5 s refresh for the test (the stand-in SDK enforces the same minimum)
const fast = (page) => page.evaluate(() => { const a = window.__ft; a.view.noDraw = true; a.banners.refreshMs = 1500; for (const s of a.banners.slots) s.next = Math.min(s.next, performance.now() + 2100); });
const cloudCareer = async (page) => JSON.parse(JSON.parse(await page.evaluate(() => localStorage.getItem('cgcloud:firsttouch.career'))).data);
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(() => { localStorage.setItem('firsttouch.tutorial', 'done'); localStorage.setItem('firsttouch.settings.v1', JSON.stringify({ rev: 3, quality: 'low' })); });
  const page = await open(ctx, '&cgrefresh=1500');
  check('banners refresh every 30 s (the SDK minimum) in the real game', (await page.evaluate(() => window.__ft.banners.refreshMs)) === 30000);
  // the rest of the test runs the refresh at 1.5 s (and the stand-in SDK enforces that)
  await fast(page);
  await page.waitForTimeout(800);
  let r = await rectsOf(page);
  const b0 = await bannerReqs(page);
  check('main menu: a bottom banner sized to the window (728x90), no side banner at 1280 px', b0.length >= 1 && b0[0].id === 'cg-banner-bottom' && b0[0].width === 728 && r.slots.length === 1, JSON.stringify(b0.map((b) => `${b.id}:${b.width}x${b.height}`)));
  check('main menu: the screen makes room, no button under the banner', r.screen.b <= r.slots[0].slot.t + 0.5 && r.btns.every((b) => !overlaps(b, r.slots[0].slot)), JSON.stringify({ screenBottom: r.screen.b, slotTop: r.slots[0].slot.t, adBottom: r.adBottom }));
  await page.screenshot({ path: 'tests/out/cg_menu_banner.png' });
  // refreshed at the allowed pace while the menu stays open
  await page.waitForTimeout(5200);
  const b1 = await bannerReqs(page, 'cg-banner-bottom');
  const gaps = b1.slice(1).map((b, i) => b.t - b1[i].t);
  check('the banner refreshes as soon as allowed, never too soon', b1.length >= 3 && gaps.every((g) => g >= 1500) && (await page.evaluate(() => window.__cg.tooSoon)) === 0, `${b1.length} requests, gaps ${gaps.map((g) => Math.round(g)).join(',')}`);
  // into a match: banners gone
  await page.click('[data-act="quick"]');
  await page.waitForTimeout(300);
  r = await rectsOf(page);
  check('quick match setup: banner stays, buttons clear of it', r.slots.length === 1 && r.btns.every((b) => !overlaps(b, r.slots[0].slot)));
  await page.click('[data-act="go"]');
  await page.waitForFunction(() => window.__ft.session, null, { timeout: 30000 });
  await page.waitForTimeout(500);
  let c = await calls(page);
  r = await rectsOf(page);
  check('kick-off from the menus is a midgame ad break', c.includes('requestAd:midgame'));
  check('no banners in a match (cleared, no room kept)', r.slots.length === 0 && c.includes('clearBanner:cg-banner-bottom') && r.adBottom === '0px', JSON.stringify(r.slots));
  await page.evaluate(() => { const a = window.__ft; a.input.dragMode = true; a.unpause(); });
  const nPlay = (await bannerReqs(page)).length;
  await page.waitForTimeout(3500);
  check('no banner requests during play', (await bannerReqs(page)).length === nPlay && !(await page.evaluate(() => [...document.querySelectorAll('.ad-slot')].some((e) => !e.hidden))));
  // leaving the match from the pause menu right after the kick-off ad: no second ad in a row
  const midBefore = (await calls(page)).filter((x) => x === 'requestAd:midgame').length;
  await page.evaluate(() => window.__ft.pause('user'));
  await page.click('[data-act="exit"]');
  await page.waitForFunction(() => document.querySelector('.menu'), null, { timeout: 10000 });
  c = await calls(page);
  check('never two video ads back to back', c.filter((x) => x === 'requestAd:midgame').length === midBefore);
  // a minute later the same exit would be an ad break
  await page.click('[data-act="quick"]');
  await page.evaluate(() => { window.__ft.platform.lastVideoAt = -1e9; });
  await page.click('[data-act="go"]');
  await page.waitForFunction(() => window.__ft.session && window.__ft.screens.current === 'click', null, { timeout: 30000 });
  await page.evaluate(() => { const a = window.__ft; a.unpause(); a.pause('user'); a.platform.lastVideoAt = -1e9; });
  await page.click('[data-act="exit"]');
  await page.waitForTimeout(150);
  const midExit = (await calls(page)).filter((x) => x === 'requestAd:midgame').length;
  await page.waitForFunction(() => document.querySelector('.menu'), null, { timeout: 10000 });
  check('leaving a match from the pause menu is a midgame ad break', midExit === midBefore + 2, `${midExit} midgame requests`);
  await page.waitForTimeout(2500);
  r = await rectsOf(page);
  check('back on the menu the banner returns', r.slots.length === 1);
  await ctx.close();
}
for (const [w, h, label, expect, touch] of [[1440, 900, 'wide desktop', ['728x90', '300x250'], false], [844, 390, 'phone landscape', ['320x50'], true], [390, 844, 'phone portrait', ['320x100'], true]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...(touch ? { isMobile: true, hasTouch: true, deviceScaleFactor: 1 } : {}) });
  await ctx.addInitScript(() => { localStorage.setItem('firsttouch.tutorial', 'done'); localStorage.setItem('firsttouch.settings.v1', JSON.stringify({ rev: 3, quality: 'low' })); });
  const page = await open(ctx, '&cgrefresh=1500');
  await fast(page);
  await page.waitForTimeout(1000);
  // the career hub, the screen players spend the most time on
  await page.evaluate(() => { const s = window.__ft.screens; s.newCareer(); document.querySelector('[data-act="go"]').click(); });
  await page.waitForTimeout(800);
  const r = await rectsOf(page);
  const sizes = [...new Set((await bannerReqs(page)).map((b) => `${b.width}x${b.height}`))];
  const fits = r.slots.every((sl) => sl.box.l >= 0 && sl.box.t >= 0 && sl.box.r <= w && sl.box.b <= h);
  const clear = r.slots.every((sl) => r.btns.every((b) => !overlaps(b, sl.slot)) && !overlaps(r.screen, sl.slot));
  check(`${label}: ${expect.join(' + ')} on the career hub, on screen, covering nothing`, JSON.stringify(sizes.sort()) === JSON.stringify([...expect].sort()) && r.slots.length === expect.length && fits && clear, JSON.stringify({ sizes, slots: r.slots.length, fits, clear }));
  await page.screenshot({ path: `tests/out/cg_hub_banner_${w}x${h}.png` });
  await ctx.close();
}
for (const [query, label] of [['&cgbanner=basic', 'Basic Launch'], ['&cgbanner=mobileapp', 'the CrazyGames mobile app']]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => localStorage.setItem('firsttouch.tutorial', 'done'));
  const page = await open(ctx, query + '&cgrefresh=1500');
  await fast(page);
  await page.waitForTimeout(4000);
  const r = await rectsOf(page);
  const n = (await calls(page)).filter((x) => x.startsWith('requestBanner')).length;
  check(`${label}: banners give up after the first refusal and leave no gap`, n === 2 && r.slots.length === 0 && r.adBottom === '0px' && r.adRight === '0px', `${n} requests`);
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
  check('after the ad one click captures the mouse for the second half', after.screen === 'click' && after.paused, JSON.stringify(after));
  await page.evaluate(() => { const a = window.__ft; a.input.dragMode = true; a.resume(); });
  await page.waitForFunction(() => window.__ft.session.match.half === 2 && window.__ft.session.match.phase === 'playing', null, { timeout: 60000 });
  check('the second half plays on', await page.evaluate(() => !window.__ft.paused && window.__ft.platform.playing));
  await ctx.close();
}

// ---------------------------------------------------------------- rewarded ads
const career = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.__ft.store.career)));
const totalXp = (c) => c.player.level * 100 + c.player.xp;
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(() => { localStorage.setItem('firsttouch.tutorial', 'done'); localStorage.setItem('firsttouch.settings.v1', JSON.stringify({ rev: 3, quality: 'low' })); });
  const page = await open(ctx, '&cgrefresh=1500&half=6');
  await fast(page);
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
  await page.evaluate(() => window.__ft.updatePlatform());
  await page.waitForTimeout(300);
  await page.evaluate(() => window.__ft.updatePlatform());
  check('a banner shows on the match report', (await rectsOf(page)).slots.length === 1);
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

console.log(errors.length ? 'page errors:\n' + errors.join('\n') : 'no errors');
await browser.close();
