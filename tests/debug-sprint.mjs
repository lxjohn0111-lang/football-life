import { Match } from '../src/sim/match.js';
import { DT } from '../src/sim/constants.js';
import { makeTeam } from './helpers.mjs';
const t = makeTeam('A', 1, 'wing');
t.players = [{ role: 'CM', number: 8, name: 'D', attrs: { pace: 50, stamina: 90, control: 50, passing: 50, finishing: 50, tackling: 50 } }];
const m = new Match({ seed: 1, teams: [t, null], rules: false });
m.ai.update = () => {};
const p = m.players[0];
p.pos.set(-25, 0, 0); p.yaw = Math.PI/2; m.ball.place(-24.4, 0); m.ball.state = 'free'; m.phase = 'playing';
m.events.on('touch', (e) => console.log('touch', m.time.toFixed(2), e.kind, e.strength.toFixed(2)));
m.events.on('release', (e) => console.log('RELEASE', m.time.toFixed(2)));
for (let i = 0; i < 120 * 5; i++) {
  p.sprint = true; const s = p.maxSpeed(true, true); p.desired.set(s, 0, 0);
  m.step(DT);
  if (i % 12 === 0) console.log(m.time.toFixed(2), 'ahead', (m.ball.pos.x - p.pos.x).toFixed(2), 'bv', m.ball.vel.x.toFixed(2), 'pv', p.vel.x.toFixed(2), 'own', !!m.ball.owner);
}
