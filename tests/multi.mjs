// Run many full AI matches: detect crashes, stalls, and summarise flow.
import { makeMatch } from './helpers.mjs';
import { DT } from '../src/sim/constants.js';
const N = Number(process.argv[2] || 8), tier = Number(process.argv[3] || 1);
const agg = { goals: 0, shots: 0, passes: 0, cmp: 0, tackles: 0, fouls: 0, restarts: {}, maxRestart: 0, saves: 0, pens: 0 };
for (let s = 1; s <= N; s++) {
  const m = makeMatch({ seed: s * 13, tier });
  let restartT = 0, maxStill = 0, still = 0;
  m.events.on('restartSetup', (e) => { agg.restarts[e.restart] = (agg.restarts[e.restart] || 0) + 1; });
  m.events.on('foul', (e) => { agg.fouls++; if (e.penalty) agg.pens++; });
  m.events.on('save', () => agg.saves++);
  m.events.on('tackle', (e) => { if (e.success) agg.tackles++; });
  m.start();
  let steps = 0;
  while (m.phase !== 'fulltime' && steps < 120 * 60 * 30) {
    m.step(DT); steps++;
    if (m.phase === 'restart') { restartT += DT; agg.maxRestart = Math.max(agg.maxRestart, m.phaseT); }
    if (!m.ball.pos.isFinite()) throw new Error('NaN ball');
    if (m.phase === 'playing' && m.ball.speed < 0.05 && !m.ball.owner && m.ball.state !== 'held') { still += DT; maxStill = Math.max(maxStill, still); } else still = 0;
  }
  let sh = 0, cmp = 0, att = 0;
  for (const p of m.players) { const st = m.stats.s(p); sh += st.shots; cmp += st.passCmp; att += st.passAtt; }
  agg.goals += m.scoreline[0] + m.scoreline[1]; agg.shots += sh; agg.passes += att; agg.cmp += cmp;
  console.log(`seed ${s * 13}: ${m.scoreline.join('-')} simT=${m.time.toFixed(0)} restartT=${restartT.toFixed(0)} shots=${sh} pass=${cmp}/${att} maxStill=${maxStill.toFixed(1)} phase=${m.phase}`);
}
console.log('avg goals', (agg.goals / N).toFixed(2), 'shots', (agg.shots / N).toFixed(1), 'pass%', (agg.cmp / agg.passes * 100).toFixed(0), 'tackles', (agg.tackles / N).toFixed(1), 'fouls', (agg.fouls / N).toFixed(1), 'pens', agg.pens, 'saves', (agg.saves / N).toFixed(1), 'maxRestartPhase', agg.maxRestart.toFixed(1), agg.restarts);
