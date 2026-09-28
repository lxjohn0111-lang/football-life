import { makeMatch } from './helpers.mjs';
import { DT } from '../src/sim/constants.js';
const m = makeMatch({ seed: Number(process.argv[2] || 3) });
const t0 = Number(process.argv[3] || 10), t1 = Number(process.argv[4] || 40);
const name = (p) => p ? `${p.team}${p.role}${p.number}` : '-';
m.events.on('*', (e) => {
  if (m.time < t0 || m.time > t1) return;
  if (['bounce', 'touch', 'tackleAttempt'].includes(e.type)) return;
  const b = m.ball;
  let extra = '';
  if (e.type === 'kick') extra = `${e.kind} -> ${name(e.target)} spd=${e.speed.toFixed(1)}`;
  if (e.type === 'possession') extra = `${e.cause} prev=${name(e.prev)}`;
  if (e.type === 'release') extra = e.reason;
  if (e.type === 'deflect') extra = `spd=${e.speed.toFixed(1)}`;
  console.log(m.time.toFixed(2), e.type.padEnd(10), name(e.player), extra, `ball(${b.pos.x.toFixed(1)},${b.pos.z.toFixed(1)}) v=${b.speed.toFixed(1)}`, e.player ? `pl(${e.player.pos.x.toFixed(1)},${e.player.pos.z.toFixed(1)})` : '');
});
m.start();
while (m.time < t1) m.step(DT);
