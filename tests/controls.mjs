// Real keyboard/mouse path in the browser: E tackles an opponent carrier, W+Shift
// dribbling keeps the ball close, and the settings FOV slider reaches 200.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 800, height: 450 } });
page.setDefaultTimeout(240000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto('http://localhost:8080/index.html?auto=quick&seed=3&style=classic');
await page.waitForTimeout(2500);
await page.mouse.click(400, 225);
await page.waitForTimeout(800);
const ev = (fn, a) => page.evaluate(fn, a);
// if pointer lock was refused in headless, use the drag-look fallback the game offers
await ev(() => { const a = window.__ft; if (!a.input.locked) { a.input.dragMode = true; if (a.paused) a.unpause && a.unpause(); } });
const state = () => ev(() => { const a = window.__ft, s = a.session; return { paused: a.paused || s.paused, active: a.input.active, locked: a.input.locked, drag: a.input.dragMode, phase: s.match.phase }; });
await ev(() => { const a = window.__ft, m = a.session.match; a.session.paused = true; let n = 0; while (m.phase !== 'playing' && n++ < 120 * 20) m.step(1 / 120); a.session.paused = false; });
console.log('state', JSON.stringify(await state()));
// trace what happens to the human's possession
await ev(() => { const m = window.__ft.session.match; window.__ftLog = []; for (const k of ['release', 'possession', 'tackle', 'kick', 'deflect']) m.events.on(k, (e) => { if (e.player === m.human || e.victim === m.human) window.__ftLog.push(`${m.time.toFixed(2)} ${k} ${e.reason || e.cause || e.kind || ''} ${e.player ? e.player.name : ''}`); }); });

// 1) tackle with the E key: stop the clock, put an opponent with the ball 2.4 m in front
const setupTackle = () => ev(() => {
  const s = window.__ft.session, m = s.match, h = s.human;
  s.paused = true;
  m.phase = 'playing';
  const o = m.teams[1].players.find((p) => !p.isGK);
  if (m.ball.owner) m.loseControl('loose');
  h.pos.set(0, 0, 0); h.vel.set(0, 0, 0); h.yaw = Math.PI / 2; s.cam.yaw = h.yaw; s.ctl.input.yaw = h.yaw;
  o.pos.set(2.6, 0, 0); o.vel.set(0, 0, 0); o.yaw = -Math.PI / 2; o.ai && (o.ai.nextDecision = m.time + 5);
  m.ball.place(2.05, 0); m.ball.state = 'free';
  for (let i = 0; i < 4; i++) m.step(1 / 120);
  window.__tk = false;
  if (!m.__wrapped) { const orig = m.step.bind(m); m.step = (dt) => { orig(dt); if (h.action && h.action.type === 'tackle') window.__tk = true; }; m.__wrapped = true; }
  s.paused = false;
  return { owner: m.ball.owner && m.ball.owner.name, opp: o.name };
});
let won = 0, fired = 0;
for (let k = 0; k < 5; k++) {
  const r0 = await setupTackle();
  await page.keyboard.press('KeyE');
  r0.atPress = await ev(() => { const m = window.__ft.session.match, h = m.human; const o = m.ball.owner; return `t=${m.time.toFixed(2)} h=${h.pos.x.toFixed(2)},${h.pos.z.toFixed(2)} ball=${m.ball.pos.x.toFixed(2)},${m.ball.pos.z.toFixed(2)} owner=${o ? o.name + '@' + o.pos.x.toFixed(2) : '-'} act=${h.action ? h.action.type + ':' + h.action.t.toFixed(2) : '-'}`; });
  // the headless software renderer is far below real time, so advance the match by hand
  const r = await ev(() => {
    const s = window.__ft.session, m = s.match, h = s.human;
    s.paused = true;
    for (let i = 0; i < 120; i++) m.step(1 / 120);
    return { tackled: window.__tk, owner: m.ball.owner ? m.ball.owner.name : 'loose', human: h.name, simT: m.time.toFixed(2) };
  });
  if (r.tackled) fired++;
  if (r.owner === r.human) won++;
  if (k < 2) console.log('tackle setup', JSON.stringify(r0), 'result', JSON.stringify(r));
}
console.log(`E key: tackle fired ${fired}/5, ball won ${won}/5`);
console.log((await ev(() => window.__ftLog.slice(-12))).join('\n'));

// 2) dribble with W + Shift held for real (clock running), turning the view with the mouse
const d0 = await ev(() => {
  const s = window.__ft.session, m = s.match, h = s.human;
  for (const o of m.players) if (!o.isHuman) { o.pos.x = Math.max(-30, Math.min(30, o.pos.x)); if (Math.abs(o.pos.z) < 8 && Math.abs(o.pos.x) < 20) o.pos.z = 12 * Math.sign(o.pos.z || 1); }
  if (m.ball.owner) m.loseControl('loose');
  h.pos.set(-20, 0, 0); h.yaw = Math.PI / 2; s.cam.yaw = h.yaw; s.ctl.input.yaw = h.yaw; s.cam.pitch = -0.4;
  m.ball.place(-19.5, 0); m.ball.state = 'free';
  for (let i = 0; i < 12; i++) m.step(1 / 120);
  s.paused = false; window.__ft.paused = false;
  window.__ftMaxD = 0;
  window.__ftTrack = setInterval(() => { const d = h.pos.distXZ(m.ball.pos); if (d > window.__ftMaxD) { window.__ftMaxD = d; window.__ftAt = m.time.toFixed(2) + ' phase ' + m.phase; } }, 16);
  window.__ftLog.push('--- dribble start ' + m.time.toFixed(2));
  return m.ball.owner === h;
});
await page.keyboard.down('KeyW'); await page.keyboard.down('ShiftLeft');
for (let i = 0; i < 20; i++) { await page.mouse.move(400 + (i % 10 < 5 ? 40 : -40) * (i % 5), 225, { steps: 2 }); await page.waitForTimeout(80); }
await page.keyboard.up('ShiftLeft'); await page.keyboard.up('KeyW');
const d1 = await ev(() => { clearInterval(window.__ftTrack); const s = window.__ft.session, m = s.match; return { owner: m.ball.owner ? m.ball.owner.name : 'loose', human: s.human.name, maxD: +window.__ftMaxD.toFixed(2), at: window.__ftAt, phase: m.phase, moved: +(s.human.pos.x + 20).toFixed(1), glow: document.querySelector('.hud-poss').classList.contains('on') }; });
console.log('dribble had ball at start', d0, JSON.stringify(d1));
console.log((await ev(() => window.__ftLog.slice(-14))).join('\n'));

// 3) settings slider
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
const fov = await ev(() => { window.__ft.screens.settings(true); const r = document.querySelector('#s-fov'); return { min: r.min, max: r.max, value: r.value, label: document.querySelector('#v-fov').textContent }; });
console.log('fov slider', JSON.stringify(fov));
console.log(errors.length ? errors.join('\n') : 'no errors');
await browser.close();
