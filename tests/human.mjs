// Full matches with the scripted human. Reports the human's involvement and stats.
import { makeMatch } from './helpers.mjs';
import { Bot } from './bot.mjs';
import { DT } from '../src/sim/constants.js';

const N = Number(process.argv[2] || 4), role = process.argv[3] || 'ST', tier = Number(process.argv[4] || 1);
const tot = {};
for (let s = 1; s <= N; s++) {
  const m = makeMatch({ seed: s * 7, tier, human: { role, attrs: { pace: 52, stamina: 50, control: 50, passing: 48, finishing: 54, tackling: 44 } } });
  const bot = new Bot(m, m.humanCtl);
  const kinds = {};
  m.events.on('possession', (e) => { if (e.player === m.human) kinds['poss:' + e.cause] = (kinds['poss:' + e.cause] || 0) + 1; });
  m.events.on('kick', (e) => { if (e.player === m.human) kinds['kick:' + e.kind + (e.firstTime ? ':ft' : '')] = (kinds['kick:' + e.kind + (e.firstTime ? ':ft' : '')] || 0) + 1; });
  m.events.on('whiff', (e) => { if (e.player === m.human) kinds.whiff = (kinds.whiff || 0) + 1; });
  m.events.on('credit', (e) => { if (e.player === m.human) kinds['credit:' + e.kind] = (kinds['credit:' + e.kind] || 0) + 1; });
  m.start();
  while (m.phase !== 'fulltime') { bot.update(); m.step(DT); }
  const r = m.stats.report(m.human);
  const st = r.stats;
  console.log(`seed ${s * 7} ${r.score.join('-')} rating ${r.rating} touches ${st.touches} pass ${st.passCmp}/${st.passAtt} shots ${st.shots}/${st.shotsOn} goals ${st.goals} ast ${st.assists} tkl ${st.tacklesWon}/${st.tackleAtt} int ${st.interceptions} lost ${st.possLost} fouls ${st.fouls}`);
  console.log('   ', JSON.stringify(kinds));
  console.log('    why+', r.breakdown.pos.slice(0, 3).map((x) => `${x.label} ${x.v.toFixed(2)}`).join(', '), '| why-', r.breakdown.neg.slice(0, 3).map((x) => `${x.label} ${x.v.toFixed(2)}`).join(', '));
  for (const [k, v] of Object.entries(st)) tot[k] = (tot[k] || 0) + v;
}
console.log('avg', Object.fromEntries(Object.entries(tot).map(([k, v]) => [k, +(v / N).toFixed(1)])));
