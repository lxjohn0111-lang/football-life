// Phone emulation (touch screen, landscape then portrait) driving the game with
// real multi-touch events: menus fit, tap to play without pointer lock, the
// analog stick moves, right-side drags look, SHOOT / PASS / TACKLE buttons act,
// the pause button pauses. Screenshots go to tests/out/m_*.png.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const OUT = 'tests/out';
const style = process.argv[2] || 'classic';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errors = [];
const results = [];
const check = (name, ok, info = '') => { results.push(`${ok ? 'ok  ' : 'FAIL'} ${name}${info ? ' - ' + info : ''}`); };

async function phone(width, height) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36' });
  const page = await ctx.newPage();
  page.setDefaultTimeout(240000);
  page.on('pageerror', (e) => errors.push(e.message));
  const cdp = await ctx.newCDPSession(page);
  const touch = (type, pts) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: pts.map(([x, y, id]) => ({ x, y, id, radiusX: 4, radiusY: 4, force: 1 })) });
  return { ctx, page, touch };
}
const center = (page, sel) => page.evaluate((sel) => { const r = document.querySelector(sel).getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, sel);
const fits = (page, sel) => page.evaluate((sel) => { const e = document.querySelector(sel); return { sh: e.scrollHeight, ch: e.clientHeight, sw: e.scrollWidth, cw: e.clientWidth }; }, sel);

// ---------------------------------------------------------------- landscape
{
  const { ctx, page, touch } = await phone(844, 390);
  await page.goto(`http://localhost:8080/index.html?style=${style}&nofs`);
  await page.waitForTimeout(2500);
  const info = await page.evaluate(() => ({ touch: window.__ft.input.touchMode, quality: window.__ft.settings.quality, coarse: window.__ft.coarse }));
  check('touch mode on a touch phone', info.touch && info.coarse, JSON.stringify(info));
  const f = await fits(page, '.screen');
  check('main menu fits a landscape phone without scrolling', f.sh <= f.ch + 1 && f.sw <= f.cw + 1, JSON.stringify(f));
  await page.screenshot({ path: `${OUT}/m_menu_land.png` });
  await page.tap('[data-act="quick"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/m_quick_land.png` });
  await page.tap('[data-act="go"]');
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${OUT}/m_tap_land.png` });
  check('"Tap to play" shown', await page.evaluate(() => /Tap to play/.test(document.querySelector('.screens').textContent)));
  await page.tap('.screen');
  // the controls appear on the next rendered frame (slow under a software renderer)
  await page.waitForFunction(() => !window.__ft.paused && !document.querySelector('.touch').classList.contains('hidden'), null, { timeout: 20000 }).catch(() => {});
  const st = await page.evaluate(() => { const a = window.__ft; return { paused: a.paused, locked: a.input.locked, overlay: !document.querySelector('.touch').classList.contains('hidden'), phase: a.session.match.phase }; });
  check('tap starts play without pointer lock, controls visible', !st.paused && !st.locked && st.overlay, JSON.stringify(st));
  // let kick-off happen, then control the world for each check
  await page.evaluate(() => { const a = window.__ft, m = a.session.match; let n = 0; while (m.phase !== 'playing' && n++ < 2400) m.step(1 / 120); });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/m_play_land.png` });

  // 1) analog stick: push up (forward) with the left thumb
  const before = await page.evaluate(() => { const s = window.__ft.session, h = s.human; return { x: h.pos.x, z: h.pos.z, yaw: s.cam.yaw }; });
  await touch('touchStart', [[150, 290, 1]]);
  for (let i = 1; i <= 6; i++) { await touch('touchMove', [[150, 290 - i * 12, 1]]); await page.waitForTimeout(30); }
  await page.waitForTimeout(1500);
  const mid = await page.evaluate(() => { const a = window.__ft, s = a.session, h = s.human, t = a.input.touch; return { x: h.pos.x, z: h.pos.z, t: { ...t }, simT: s.match.time }; });
  await touch('touchEnd', []);
  const dx = mid.x - before.x, dz = mid.z - before.z, d = Math.hypot(dx, dz);
  const along = (dx * Math.sin(before.yaw) + dz * Math.cos(before.yaw)) / (d || 1);
  check('stick moves the player forward (camera-relative)', d > 1 && along > 0.7, `moved ${d.toFixed(2)} m, forward share ${along.toFixed(2)}, stick ${JSON.stringify(mid.t)}`);

  // 2) look: drag on the right half
  const y0 = await page.evaluate(() => window.__ft.session.cam.yaw);
  await touch('touchStart', [[600, 200, 2]]);
  for (let i = 1; i <= 8; i++) { await touch('touchMove', [[600 + i * 15, 200, 2]]); await page.waitForTimeout(25); }
  await touch('touchEnd', []);
  await page.waitForTimeout(300);
  const y1 = await page.evaluate(() => window.__ft.session.cam.yaw);
  check('right-side drag turns the view', Math.abs(y1 - y0) > 0.15, `yaw change ${(y1 - y0).toFixed(3)} rad`);

  // 3) both thumbs at once
  const b2 = await page.evaluate(() => { const s = window.__ft.session; return { x: s.human.pos.x, z: s.human.pos.z, yaw: s.cam.yaw }; });
  await touch('touchStart', [[150, 290, 3], [620, 180, 4]]);
  for (let i = 1; i <= 6; i++) { await touch('touchMove', [[150, 290 - i * 12, 3], [620 - i * 12, 180, 4]]); await page.waitForTimeout(40); }
  await page.waitForTimeout(900);
  await touch('touchEnd', []);
  const a2 = await page.evaluate(() => { const s = window.__ft.session; return { x: s.human.pos.x, z: s.human.pos.z, yaw: s.cam.yaw }; });
  check('move and look together (multi-touch)', Math.hypot(a2.x - b2.x, a2.z - b2.z) > 0.5 && Math.abs(a2.yaw - b2.yaw) > 0.1, `moved ${Math.hypot(a2.x - b2.x, a2.z - b2.z).toFixed(2)} m, yaw ${(a2.yaw - b2.yaw).toFixed(2)}`);

  // 4) SHOOT and PASS with the ball
  const giveBall = () => page.evaluate(() => {
    const a = window.__ft, s = a.session, m = s.match, h = s.human;
    window.__kicks = window.__kicks || [];
    if (!window.__hooked) { m.events.on('kick', (e) => { if (e.player === h) window.__kicks.push(e.kind); }); window.__hooked = true; }
    let n = 0; while (m.phase !== 'playing' && n++ < 2400) m.step(1 / 120); // e.g. after a goal
    for (const p of m.players) if (p !== h) p.scripted = true; // other players hold still for the button checks
    if (m.ball.owner) m.loseControl('loose');
    h.vel.set(0, 0, 0); h.action = null;
    m.ball.place(h.pos.x + Math.sin(h.yaw) * 0.5, h.pos.z + Math.cos(h.yaw) * 0.5); m.ball.state = 'free';
    for (let i = 0; i < 60 && m.ball.owner !== h; i++) m.step(1 / 120);
    window.__phase = m.phase;
    return m.ball.owner === h;
  }).then(async (owner) => {
    // labels follow on the next rendered frames
    await page.waitForFunction(() => document.querySelector('.tc-c').textContent === 'THRU', null, { timeout: 5000 }).catch(() => {});
    return page.evaluate((owner) => ({ owner, a: document.querySelector('.tc-a').textContent, b: document.querySelector('.tc-b').textContent, c: document.querySelector('.tc-c').textContent }), owner);
  });
  const g1 = await giveBall();
  check('attack buttons with the ball', g1.owner && g1.a === 'SHOOT' && g1.b === 'PASS' && g1.c === 'THRU', JSON.stringify(g1));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/m_ball_land.png` });
  const [ax, ay] = await center(page, '.tc-a');
  const kicked = (kind) => page.waitForFunction((kind) => window.__kicks.includes(kind), kind, { timeout: 20000 }).catch(() => {});
  await touch('touchStart', [[ax, ay, 5]]); await page.waitForTimeout(350); await touch('touchEnd', []);
  await kicked('shot');
  const [bx, by] = await center(page, '.tc-b');
  await giveBall();
  await touch('touchStart', [[bx, by, 6]]); await page.waitForTimeout(60); await touch('touchEnd', []);
  await kicked('pass');
  const kicks = await page.evaluate(() => window.__kicks.concat(['phase:' + window.__phase]));
  check('SHOOT then PASS buttons kick the ball', kicks.includes('shot') && kicks.includes('pass'), JSON.stringify(kicks));

  // 5) defence: an opponent on the ball in front -> TACKLE
  const d1 = await page.evaluate(() => {
    const a = window.__ft, s = a.session, m = s.match, h = s.human;
    if (m.ball.owner) m.loseControl('loose');
    const o = m.teams[1 - h.team].players.find((p) => !p.isGK);
    const fx = Math.sin(s.cam.yaw), fz = Math.cos(s.cam.yaw);
    o.pos.set(h.pos.x + fx * 2.4, 0, h.pos.z + fz * 2.4); o.vel.set(0, 0, 0);
    m.ball.place(h.pos.x + fx * 1.9, h.pos.z + fz * 1.9); m.ball.state = 'free';
    h.vel.set(0, 0, 0); h.action = null;
    for (let i = 0; i < 60 && !(m.ball.owner === o); i++) m.step(1 / 120);
    if (o.ai) o.ai.nextDecision = m.time + 5;
    window.__tk = false;
    const orig = m.step.bind(m);
    m.step = (dt) => { orig(dt); if (h.action && h.action.type === 'tackle') window.__tk = true; };
    return m.ball.owner && m.ball.owner.team !== h.team;
  }).then(async (owner) => {
    await page.waitForFunction(() => document.querySelector('.tc-a').textContent === 'TACKLE', null, { timeout: 5000 }).catch(() => {});
    return page.evaluate((owner) => ({ owner, a: document.querySelector('.tc-a').textContent, b: document.querySelector('.tc-b').textContent, cHidden: document.querySelector('.tc-c').classList.contains('off') }), owner);
  });
  check('defence buttons when an opponent has the ball', d1.owner && d1.a === 'TACKLE' && d1.b === 'SLIDE' && d1.cHidden, JSON.stringify(d1));
  const [tx, ty] = await center(page, '.tc-a');
  await touch('touchStart', [[tx, ty, 7]]); await page.waitForTimeout(60); await touch('touchEnd', []);
  await page.waitForFunction(() => window.__tk, null, { timeout: 8000 }).catch(() => {});
  check('TACKLE button tackles', await page.evaluate(() => window.__tk));

  // 6) pause button and resume
  const [px, py] = await center(page, '.tc-pause');
  await touch('touchStart', [[px, py, 8]]); await touch('touchEnd', []);
  await page.waitForTimeout(500);
  const p1 = await page.evaluate(() => ({ paused: window.__ft.paused, menu: !!document.querySelector('[data-act="resume"]'), overlay: !document.querySelector('.touch').classList.contains('hidden') }));
  check('pause button opens the pause menu and hides the controls', p1.paused && p1.menu && !p1.overlay, JSON.stringify(p1));
  await page.screenshot({ path: `${OUT}/m_pause_land.png` });
  await page.tap('[data-act="resume"]');
  await page.waitForTimeout(500);
  check('resume from the pause menu', await page.evaluate(() => !window.__ft.paused));
  // no emulated mouse click fired a shot: the only shot is from the SHOOT button
  check('taps never produce mouse shots', (await page.evaluate(() => window.__kicks.filter((k) => k === 'shot').length)) === 1);
  await ctx.close();
}

// ---------------------------------------------------------------- portrait
{
  const { ctx, page } = await phone(390, 844);
  await page.goto(`http://localhost:8080/index.html?style=${style}&nofs`);
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${OUT}/m_menu_port.png` });
  const w = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  check('no horizontal overflow in portrait', w.sw <= w.cw, JSON.stringify(w));
  await page.tap('[data-act="play"]'); // no career yet: PLAY starts one
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/m_new_port.png` });
  await page.tap('[data-act="go"]');
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/m_hub_port.png`, fullPage: false });
  const hub = await fits(page, '.screen');
  check('career hub scrolls vertically only', hub.sw <= hub.cw + 1, JSON.stringify(hub));
  await page.tap('[data-act="play"]');
  await page.waitForTimeout(2500);
  await page.tap('.screen');
  await page.waitForTimeout(800);
  await page.evaluate(() => { const m = window.__ft.session.match; let n = 0; while (m.phase !== 'playing' && n++ < 2400) m.step(1 / 120); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/m_play_port.png` });
  check('rotate hint in portrait', await page.evaluate(() => getComputedStyle(document.querySelector('.tc-rotate')).display !== 'none'));
  await ctx.close();
}

console.log(results.join('\n'));
console.log(errors.length ? 'page errors:\n' + errors.join('\n') : 'no errors');
await browser.close();
