// Do AI teammates honour pass requests when the human is open?
import { makeMatch } from './helpers.mjs';
import { Bot } from './bot.mjs';
import { DT } from '../src/sim/constants.js';
let req = 0, ack = 0, toHuman = 0, afterReq = 0;
for (const seed of [3, 9, 15]) {
  const m = makeMatch({ seed, human: { role: 'CM', attrs: { pace: 52, stamina: 50, control: 50, passing: 50, finishing: 45, tackling: 50 } } });
  const bot = new Bot(m, m.humanCtl);
  let lastReq = -10;
  m.events.on('request', () => { req++; lastReq = m.time; });
  m.events.on('ack', () => ack++);
  m.events.on('kick', (e) => { if (e.target === m.human) { toHuman++; if (m.time - lastReq < 2.5) afterReq++; } });
  m.start();
  while (m.phase !== 'fulltime') { bot.update(); m.step(DT); }
}
console.log({ req, ack, toHuman, afterReq });
