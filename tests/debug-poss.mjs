import { makeMatch } from './helpers.mjs';
import { DT } from '../src/sim/constants.js';
const m = makeMatch({ seed: Number(process.argv[2]||3) });
const agg = {}; let lastRelease = null;
m.events.on('release', (e) => { lastRelease = e; agg['release:' + e.reason] = (agg['release:' + e.reason] || 0) + 1; });
m.events.on('possession', (e) => {
  const k = 'poss:' + e.cause + (e.prev ? (e.prev.team === e.team ? ':fromTeam' : ':fromOpp') : '');
  agg[k] = (agg[k] || 0) + 1;
});
m.events.on('kick', (e) => { agg['kick:' + e.kind] = (agg['kick:' + e.kind] || 0) + 1; });
let owned = 0, ownDist = 0, samples=0, far=0;
m.start();
let steps = 0;
while (m.phase !== 'fulltime' && steps < 120 * 60 * 20) {
  m.step(DT); steps++;
  if (m.ball.owner && m.phase==='playing') { const d = m.ball.owner.pos.distXZ(m.ball.pos); ownDist += d; samples++; if (d>1.5) far++; }
}
console.log(agg, 'avg owner-ball dist', (ownDist/samples).toFixed(2), 'far%', (far/samples*100).toFixed(1));
