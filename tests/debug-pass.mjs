import { makeMatch } from './helpers.mjs';
import { DT } from '../src/sim/constants.js';
import { laneOpenness } from '../src/sim/passing.js';
const m = makeMatch({ seed: Number(process.argv[2] || 3) });
let pending = null; const res = { ok: 0, int: 0, out: 0, other: 0 }; const samples = [];
m.events.on('kick', (e) => {
  if (e.kind !== 'pass') return;
  const t = e.target;
  const open = t ? laneOpenness(m, e.pos.x, e.pos.z, t.pos.x, t.pos.z, e.team, 12) : -1;
  let near = 99; for (const o of m.players) if (o.team !== e.team) near = Math.min(near, o.pos.distXZ(e.pos));
  pending = { e, d: t ? t.pos.distXZ(e.pos) : 0, open, near, spd: e.speed };
});
m.events.on('possession', (e) => {
  if (!pending) return;
  const k = e.team === pending.e.team ? 'ok' : 'int';
  res[k]++; if (k === 'int') samples.push(`d=${pending.d.toFixed(1)} open=${pending.open.toFixed(2)} nearOpp=${pending.near.toFixed(1)} spd=${pending.spd.toFixed(1)} dt=${(e.t - pending.e.t).toFixed(2)} by=${e.player.role} cause=${e.cause}`);
  pending = null;
});
m.events.on('out', () => { if (pending) { res.out++; pending = null; } });
m.start();
while (m.phase !== 'fulltime') m.step(DT);
console.log(res); console.log(samples.slice(0, 30).join('\n'));
