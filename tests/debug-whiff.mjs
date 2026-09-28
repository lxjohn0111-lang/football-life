import { makeMatch } from './helpers.mjs';
import { DT } from '../src/sim/constants.js';
const m = makeMatch({ seed: 3 });
const out = [];
m.events.on('whiff', (e) => {
  const p = e.player, b = m.ball;
  const dx = b.pos.x - p.pos.x, dz = b.pos.z - p.pos.z;
  const fwd = dx * Math.sin(p.yaw) + dz * Math.cos(p.yaw);
  out.push(`${e.kind} d=${Math.hypot(dx,dz).toFixed(2)} y=${b.pos.y.toFixed(2)} fwd=${fwd.toFixed(2)} owner=${b.owner ? (b.owner===p?'self':'other') : 'none'} state=${b.state} bsp=${b.speed.toFixed(1)} psp=${p.speed.toFixed(1)}`);
});
m.start();
let steps = 0;
while (m.phase !== 'fulltime' && steps < 120 * 60 * 20) { m.step(DT); steps++; }
const agg = {};
for (const o of out) { const k = o.split(' ').filter(s=>s.startsWith('owner')||s.startsWith('state')).join(' '); agg[k]=(agg[k]||0)+1; }
console.log(agg); console.log(out.slice(0, 25).join('\n'));
