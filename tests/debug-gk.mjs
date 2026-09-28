import { Match } from '../src/sim/match.js';
import { HumanController } from '../src/sim/human.js';
import { DT, PITCH } from '../src/sim/constants.js';
import { makeTeam } from './helpers.mjs';
const t0 = makeTeam('A', 1, 'wing', { human: { role: 'ST' } }); t0.players = t0.players.filter((p) => p.isHuman);
const t1 = makeTeam('B', 5, 'wing'); t1.players = t1.players.filter((p) => p.role === 'GK');
const m = new Match({ seed: 3, teams: [t0, t1], rules: true, difficulty: 'standard' });
const ctl = new HumanController(m, m.human); m.humanCtl = ctl; m.phase = 'playing';
const h = m.human; h.pos.set(PITCH.HL - 16, 0, 0); h.yaw = Math.PI / 2;
m.ball.place(h.pos.x + 0.5, 0); m.ball.state = 'free';
const gk = m.keeper(1); gk.pos.set(PITCH.HL - 1.2, 0, 0);
const zAim = 1.9, yAim = 0.3;
ctl.input.yaw = Math.atan2(PITCH.HL - h.pos.x, zAim); ctl.input.pitch = Math.atan2(yAim - 1.65, 16);
console.log('params', m.aiParams[1].gkReaction, 'keeping', gk.keeping);
for (let i = 0; i < 20; i++) m.step(DT);
ctl.press('shoot'); ctl.input.lmb = true;
m.events.on('*', (e) => { if (['kick', 'dive', 'save', 'goal'].includes(e.type)) console.log(m.time.toFixed(3), e.type); });
for (let i = 0; i < 120 * 1.5; i++) {
  if (i === 40) { ctl.release('shoot'); ctl.input.lmb = false; }
  m.step(DT);
  if (i % 6 === 0 && m.ball.speed > 5) console.log(m.time.toFixed(3), 'ball', m.ball.pos.x.toFixed(2), m.ball.pos.y.toFixed(2), m.ball.pos.z.toFixed(2), 'gk', gk.pos.x.toFixed(2), gk.pos.z.toFixed(2), gk.action ? gk.action.type + ' t=' + gk.action.t.toFixed(2) : '-', 'set', gk.ai.set, 'reactAt', (gk.ai.reactAt||0).toFixed(2));
}
