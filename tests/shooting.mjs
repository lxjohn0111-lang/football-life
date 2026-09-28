// Human shooting against the keeper from set positions: goal/save/miss rates.
import { Match } from '../src/sim/match.js';
import { HumanController } from '../src/sim/human.js';
import { DT, PITCH } from '../src/sim/constants.js';
import { makeTeam } from './helpers.mjs';
function trial(seed, dist, zAim, yAim, hold, tier = 1, lat = 0) {
  const t0 = makeTeam('A', 1, 'wing', { human: { role: 'ST' } });
  t0.players = t0.players.filter((p) => p.isHuman);
  const t1 = makeTeam('B', tier, 'wing'); t1.players = t1.players.filter((p) => p.role === 'GK');
  const m = new Match({ seed, teams: [t0, t1], rules: true, difficulty: 'assisted' });
  const ctl = new HumanController(m, m.human); m.humanCtl = ctl;
  m.phase = 'playing';
  const h = m.human; h.pos.set(PITCH.HL - dist, 0, lat); h.yaw = Math.PI / 2;
  m.ball.place(h.pos.x + 0.5, lat); m.ball.state = 'free';
  const gk = m.keeper(1); gk.pos.set(PITCH.HL - 1.2, 0, 0);
  const eye = 1.65;
  const yaw = Math.atan2(PITCH.HL - h.pos.x, zAim - h.pos.z);
  const pitch = Math.atan2(yAim - eye, Math.hypot(PITCH.HL - h.pos.x, zAim - h.pos.z));
  ctl.input.yaw = yaw; ctl.input.pitch = pitch;
  let res = null;
  m.events.on('goal', () => { res = res || 'goal'; });
  m.events.on('save', (e) => { res = res || (e.caught ? 'catch' : 'parry'); });
  m.events.on('out', () => { res = res || 'miss'; });
  for (let i = 0; i < 20; i++) m.step(DT);
  ctl.press('shoot'); ctl.input.lmb = true;
  for (let i = 0; i < 120 * 4 && !res; i++) {
    if (i === Math.round(hold * 120)) { ctl.release('shoot'); ctl.input.lmb = false; }
    m.step(DT);
  }
  return res || 'none';
}
const cfgs = [
  ['16m low corner, tap', 16, 1.9, 0.3, 0.05], ['16m low corner, half', 16, 1.9, 0.3, 0.35], ['16m low corner, full', 16, 1.9, 0.3, 0.7],
  ['12m low corner, half', 12, 2.0, 0.3, 0.35], ['16m high corner, full', 16, 1.9, 1.7, 0.7], ['16m central, full', 16, 0, 1.0, 0.7],
  ['22m corner full', 22, 1.9, 0.4, 0.7], ['9m angle', 9, 1.8, 0.4, 0.3], ['16m wide aim (3m)', 16, 3.0, 0.4, 0.5],
];
for (const [label, d, z, y, hold] of cfgs) {
  const c = {};
  for (let s = 1; s <= 40; s++) { const r = trial(s, d, z * (s % 2 ? 1 : -1), y, hold); c[r] = (c[r] || 0) + 1; }
  console.log(label.padEnd(26), JSON.stringify(c));
}
