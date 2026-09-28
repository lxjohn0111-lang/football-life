import { makeMatch } from './helpers.mjs';
import { DT } from '../src/sim/constants.js';
for (const seed of [13, 52, 78]) {
  const m = makeMatch({ seed });
  m.events.on('goal', (e) => {
    const k = m.ball.lastKick;
    console.log(seed, m.time.toFixed(1), 'team', e.team, 'scorer', e.scorer ? e.scorer.role + e.scorer.number : '-', 'own', e.ownGoal, e.ownGoalBy ? e.ownGoalBy.role : '', 'lastKick', k ? `${k.kind} by ${k.player.team}${k.player.role} restart=${k.restart} t-${(m.time - k.t).toFixed(1)}` : '-', 'lastTouch', m.ball.lastTouch ? m.ball.lastTouch.team + m.ball.lastTouch.role : '-');
  });
  m.start();
  while (m.phase !== 'fulltime') m.step(DT);
}
