// Robustness sweep: many matches across tiers/positions with the scripted human.
import { makeMatch } from './helpers.mjs';
import { Bot } from './bot.mjs';
import { DT } from '../src/sim/constants.js';
const roles = process.argv[2] ? process.argv[2].split(',') : ['ST', 'W', 'AM', 'CM', 'DEF'];
let n = 0, errors = 0, maxRestart = 0, maxStill = 0;
const ratings = {};
for (let tier = 1; tier <= 5; tier++) {
  for (const role of roles) {
    const seed = tier * 100 + roles.indexOf(role) * 7 + 1;
    try {
      const m = makeMatch({ seed, tier, halfLength: 90, human: { role, attrs: { pace: 45 + tier * 6, stamina: 45 + tier * 6, control: 45 + tier * 6, passing: 45 + tier * 6, finishing: 45 + tier * 6, tackling: 45 + tier * 6 } } });
      const bot = new Bot(m, m.humanCtl);
      m.start();
      let still = 0, steps = 0;
      while (m.phase !== 'fulltime' && steps < 120 * 60 * 10) {
        bot.update(); m.step(DT); steps++;
        if (m.phase === 'restart') maxRestart = Math.max(maxRestart, m.phaseT);
        if (m.phase === 'playing' && !m.ball.owner && m.ball.speed < 0.05) { still += DT; maxStill = Math.max(maxStill, still); } else still = 0;
        if (!m.ball.pos.isFinite()) throw new Error('ball NaN');
        for (const p of m.players) if (!p.pos.isFinite()) throw new Error('player NaN');
      }
      if (m.phase !== 'fulltime') throw new Error('did not finish');
      const r = m.stats.rating(m.human);
      (ratings[role] ||= []).push(r);
      n++;
    } catch (e) { errors++; console.log('ERROR', tier, role, e.stack); }
  }
}
console.log({ matches: n, errors, maxRestart: maxRestart.toFixed(1), maxStill: maxStill.toFixed(1) });
for (const [k, v] of Object.entries(ratings)) console.log(k, v.map((x) => x.toFixed(1)).join(' '));
