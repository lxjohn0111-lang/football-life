import { makeMatch } from './helpers.mjs';
import { DT } from '../src/sim/constants.js';

const m = makeMatch({ seed: Number(process.argv[2] || 3), tier: Number(process.argv[3] || 1) });
const counts = {};
m.events.on('*', (e) => { counts[e.type] = (counts[e.type] || 0) + 1; });
m.start();
const t0 = Date.now();
let steps = 0;
while (m.phase !== 'fulltime' && steps < 120 * 60 * 20) { m.step(DT); steps++; }
console.log('sim seconds', m.time.toFixed(1), 'wall ms', Date.now() - t0, 'phase', m.phase, 'score', m.scoreline);
console.log(counts);
for (const p of m.players) {
  const s = m.stats.s(p);
  console.log(p.team, p.role.padEnd(3), String(p.number).padStart(2), 'r', m.stats.rating(p).toFixed(1), 'touch', s.touches, 'pass', s.passCmp + '/' + s.passAtt, 'sh', s.shots + '/' + s.shotsOn, 'g', s.goals, 'a', s.assists, 'tk', s.tacklesWon + '/' + s.tackleAtt, 'int', s.interceptions, 'lost', s.possLost, 'f', s.fouls, 'sv', s.saves);
}
console.log('possession', m.stats.possessionPct(), 'shots', m.stats.teamShots, m.stats.teamShotsOn);
