// One player dribbling alone: measure ball distance, touches and control losses.
import { Match } from '../src/sim/match.js';
import { V3 } from '../src/sim/vec.js';
import { DT } from '../src/sim/constants.js';
import { makeTeam } from './helpers.mjs';
function run(label, sprint, turnEvery, ctl = 50) {
  const t = makeTeam('A', 1, 'wing');
  t.players = [{ role: 'CM', number: 8, name: 'D', attrs: { pace: 50, stamina: 90, control: ctl, passing: 50, finishing: 50, tackling: 50 }, isHuman: false }];
  const m = new Match({ seed: 1, teams: [t, null], rules: false });
  m.ai.update = () => {};
  const p = m.players[0];
  p.pos.set(-20, 0, 0); m.ball.place(-19.4, 0); m.ball.state = 'free'; m.phase = 'playing';
  let loses = 0, touches = 0, dsum = 0, n = 0, dmax = 0;
  m.events.on('release', () => loses++);
  m.events.on('touch', () => touches++);
  let yaw = Math.PI / 2;
  for (let i = 0; i < 120 * 8; i++) {
    if (turnEvery && i % (120 * turnEvery) === 0 && i > 0) yaw += Math.PI / 2;
    p.sprint = sprint;
    const s = p.maxSpeed(sprint, true);
    p.desired.set(Math.sin(yaw) * s, 0, Math.cos(yaw) * s);
    m.step(DT);
    if (Math.abs(p.pos.x) > 28 || Math.abs(p.pos.z) > 18) { p.pos.set(-20, 0, 0); }
    if (m.ball.owner === p) { const d = p.pos.distXZ(m.ball.pos); dsum += d; n++; dmax = Math.max(dmax, d); }
  }
  console.log(label.padEnd(18), 'owned%', (n / 960 * 100).toFixed(0), 'avg', (dsum / n).toFixed(2), 'max', dmax.toFixed(2), 'touches', touches, 'loses', loses, 'speed', p.speed.toFixed(1));
}
run('jog straight', false, 0);
run('sprint straight', true, 0);
run('jog turning', false, 1.5);
run('sprint turning', true, 1.5);
run('jog ctl30', false, 0, 30);
run('sprint ctl80', true, 1.5, 80);
