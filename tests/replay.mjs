// Goal replay: the player dribbles in and scores for real (simulation and controls);
// after the celebration a slow-motion drone replay starts with the match frozen, shows
// the player's whole body from outside, and ends on its own or with Skip (button or any
// action), after which the match goes on to the kick-off.
// Screenshots go to tests/out/replay_*.png. Usage: node tests/replay.mjs [classic|neo]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const OUT = 'tests/out';
const style = process.argv[2] || 'classic';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 480, height: 270 } });
page.setDefaultTimeout(300000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const results = [];
const check = (name, ok, info = '') => { console.log((ok ? 'ok   ' : 'FAIL ') + name + (info ? ' - ' + info : '')); results.push(`${ok ? 'ok  ' : 'FAIL'} ${name}${info ? ' - ' + info : ''}`); };
const ev = (fn, a) => page.evaluate(fn, a);
// n frames of 1/15 s each: animated, recorded and replayed like in a game, but only the
// frames that are photographed are drawn (the software GPU is far too slow for all of them)
const frames = (n) => ev((n) => { const s = window.__ft.session; for (let i = 0; i < n; i++) s.frame(1 / 15); return { replay: !!s.replay, t: s.replay ? +(s.replay.t - s.replay.t0).toFixed(2) : null, phase: s.match.phase }; }, n);

await page.goto(`http://localhost:8080/index.html?auto=quick&home=ashford&away=harbour&style=${style}&seed=11&venue=community`);
await page.waitForTimeout(3000);
await page.mouse.click(240, 135);
await page.waitForTimeout(500);
// the test drives every frame itself (the game's own loop would compete for the slow software GPU)
await ev(() => { window.__ft.loop = () => {}; window.__ft.view.noDraw = true; });
const shoot = async (path) => {
  await ev(() => { const a = window.__ft; a.view.noDraw = false; a.session.frame(0); });
  await page.screenshot({ path });
  await ev(() => { window.__ft.view.noDraw = true; });
};
await page.waitForTimeout(300);

// a scripted goal: the player 14 m out with the ball, keeper away, dribble then shoot
const goal = async () => {
  await ev(() => {
    const a = window.__ft, s = a.session, m = s.match, h = s.human;
    a.screens.clear(); a.paused = false; s.setPaused(false);
    a.settings.quality = 'low'; a.applySettings();
    let n = 0; while (m.phase !== 'playing' && n++ < 4000) m.step(1 / 120);
    const dir = m.attackDir(h.team), gx = dir * 32;
    for (const p of m.players) if (p !== h) {
      p.scripted = true; p.vel.set(0, 0, 0); p.action = null;
      if (p.team !== h.team) { p.pos.set(p.isGK ? gx - dir * 1 : gx - dir * 30, 0, p.isGK ? 12 : (p.id % 5) * 3 - 6); p.prevPos.copy(p.pos); }
    }
    if (m.ball.owner) m.loseControl('loose');
    h.pos.set(gx - dir * 17, 0, 3); h.prevPos.copy(h.pos); h.vel.set(0, 0, 0); h.action = null;
    h.yaw = Math.atan2(gx - h.pos.x, -h.pos.z); h.prevYaw = h.yaw;
    s.cam.yaw = h.yaw; s.cam.pitch = -0.05;
    m.ball.place(h.pos.x + Math.sin(h.yaw) * 0.5, h.pos.z + Math.cos(h.yaw) * 0.5); m.ball.state = 'free';
    a.input.keys.add('KeyW');
    window.__goals = window.__goals || 0;
    if (!window.__hooked) { m.events.on('goal', () => { window.__goals++; }); window.__hooked = true; }
  });
  await frames(28); // about two seconds of dribbling towards goal
  const shot = await ev(() => {
    const a = window.__ft, s = a.session, m = s.match, h = s.human;
    a.input.keys.delete('KeyW');
    const gx = m.attackDir(h.team) * 32;
    s.cam.yaw = Math.atan2(gx - h.pos.x, -0.8 - h.pos.z); s.cam.pitch = 0.02;
    a.input.emit('shoot', true); a.input.emit('shoot', false);
    return { owner: m.ball.owner === h, dist: +Math.abs(gx - h.pos.x).toFixed(1) };
  });
  let st;
  for (let i = 0; i < 12; i++) { st = await frames(5); if (await ev(() => window.__goals) > 0 && st.phase === 'goal') break; }
  return { shot, st, goals: await ev(() => window.__goals) };
};

const g1 = await goal();
check('scripted goal is scored', g1.goals === 1, JSON.stringify(g1));
// celebration: the replay starts when it ends
let st = await frames(8);
for (let i = 0; i < 10 && !st.replay; i++) st = await frames(5);
const ui = await ev(() => {
  const hud = document.querySelector('.hud'), sk = document.querySelector('.rp-skip');
  const r = sk.getBoundingClientRect();
  return { replaying: hud.classList.contains('replaying'), skip: sk.textContent, skipVisible: r.width > 0 && r.height > 0, info: document.querySelector('.rp-info').textContent };
});
check('replay starts after the celebration', st.replay && ui.replaying, JSON.stringify({ st, ui }));
check('skip button shown', ui.skipVisible && /Skip replay/.test(ui.skip), ui.skip);
const frozen = await ev(() => window.__ft.session.match.time);
// walk through it, taking pictures
const shots = [];
for (let i = 0; i < 6; i++) {
  await shoot(`${OUT}/replay_${i}_${style}.png`);
  const cam = await ev(() => { const v = window.__ft.view, h = window.__ft.session.human, c = v.camera.position; return { cam: [c.x, c.y, c.z].map((x) => +x.toFixed(1)), dist: +Math.hypot(c.x - h.pos.x, c.z - h.pos.z).toFixed(1), fp: v.camera.position.y > 1.5 && v.camera.position.y < 1.8 && Math.hypot(c.x - h.pos.x, c.z - h.pos.z) < 0.3 }; });
  shots.push(cam);
  st = await frames(11);
  if (!st.replay) break;
}
check('drone camera: above and away from the player', shots.every((c) => !c.fp && c.cam[1] > 1.5), JSON.stringify(shots.map((c) => c.cam)));
check('match frozen during the replay', await ev((t) => { const s = window.__ft.session; return !s.replay || s.match.time === t; }, frozen));
for (let i = 0; i < 20 && st.replay; i++) st = await frames(8);
check('replay ends by itself', !st.replay);
st = await frames(10);
check('then the kick-off', st.phase === 'restart' || st.phase === 'playing', st.phase);
check('HUD back after the replay', await ev(() => !document.querySelector('.hud').classList.contains('replaying')));

// second goal: skip with the button
const g2 = await goal();
st = await frames(8);
for (let i = 0; i < 10 && !st.replay; i++) st = await frames(5);
check('second goal replays too', g2.goals === 2 && st.replay, JSON.stringify(g2));
st = await frames(10);
// with the mouse captured (pointer lock) a click is the shoot action, which skips too;
// without it (drag mode, touch screens) the button itself takes the click
await ev(() => { const a = window.__ft; a.input.onLockLost = null; a.input.exitLock(); });
await page.waitForTimeout(300);
await page.click('.rp-skip');
st = await frames(2);
check('Skip replay button ends it at once', !st.replay);
st = await frames(10);
check('kick-off after skipping', st.phase === 'restart' || st.phase === 'playing', st.phase);

// third goal: any action skips it (click / Space / buttons)
await goal();
st = await frames(8);
for (let i = 0; i < 10 && !st.replay; i++) st = await frames(5);
const before = st.replay;
await ev(() => window.__ft.input.emit('through', true));
st = await frames(2);
check('any action skips the replay', before && !st.replay);

// setting off: no replay
await ev(() => { const a = window.__ft; a.settings.replays = false; a.session.replays = false; });
await goal();
st = await frames(10);
for (let i = 0; i < 8 && !st.replay; i++) st = await frames(5);
check('no replay with the setting off', !st.replay);

console.log(results.join('\n'));
console.log(errors.length ? 'page errors:\n' + errors.join('\n') : 'no errors');
await browser.close();
