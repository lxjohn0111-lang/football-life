import { makeMatch } from './helpers.mjs';
import { Bot } from './bot.mjs';
import { DT, PITCH } from '../src/sim/constants.js';
for (const seed of [7, 14, 21]) {
  const m = makeMatch({ seed, human: { role: 'ST', attrs: { pace: 52, stamina: 50, control: 50, passing: 48, finishing: 54, tackling: 44 } } });
  const bot = new Bot(m, m.humanCtl);
  let last = null;
  m.events.on('kick', (e) => {
    if (e.kind !== 'shot' || e.player !== m.human) return;
    const gk = m.keeper(1 - m.human.team);
    last = { t: e.t, from: `(${e.pos.x.toFixed(1)},${e.pos.z.toFixed(1)})`, gk: `(${gk.pos.x.toFixed(1)},${gk.pos.z.toFixed(1)}) ${gk.ai.state || ''} act=${gk.action ? gk.action.type : '-'}`, spd: e.speed.toFixed(1), on: e.onTarget, pt: e.point ? `(${e.point.x.toFixed(1)},${e.point.y.toFixed(1)},${e.point.z.toFixed(1)})` : '' };
  });
  m.events.on('save', (e) => { if (last) console.log(seed, 'SAVE', e.caught ? 'catch' : 'parry', JSON.stringify(last), 'dt', (m.time - last.t).toFixed(2)); last = null; });
  m.events.on('goal', (e) => { if (last) console.log(seed, 'GOAL', JSON.stringify(last)); last = null; });
  m.events.on('out', (e) => { if (last) console.log(seed, 'OUT', JSON.stringify(last)); last = null; });
  m.start();
  while (m.phase !== 'fulltime') { bot.update(); m.step(DT); }
}
