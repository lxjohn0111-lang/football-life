// Headless career run: plays fixtures with the scripted human, commits results,
// handles transfer windows and seasons, and checks save/backup/corruption handling.
import { makeMatch } from './helpers.mjs';
import { Bot } from './bot.mjs';
import { DT } from '../src/sim/constants.js';
import { Match } from '../src/sim/match.js';
import { HumanController } from '../src/sim/human.js';
import { createCareer, prepareMatch, commitMatch, acceptOffer, declineWindow, canStartNewSeason, startNewSeason, upgradeAttr, ATTRS, interestList, nextFixture } from '../src/career/career.js';
import { clubById } from '../src/career/clubs.js';
import { buildTeamConfig } from '../src/career/teams.js';

// in-memory localStorage for the save system
const mem = new Map();
globalThis.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
const { CareerStore } = await import('../src/career/save.js');

const role = process.argv[2] || 'ST';
const maxMatches = Number(process.argv[3] || 40);
const halfLength = Number(process.argv[4] || 120);
const career = createCareer({ name: 'Test Hero', number: 9, nationality: 'England', foot: 'R', role, look: { skin: '#e0b48c', hair: '#333', boots: '#111' } }, 1234);
const store = new CareerStore();
store.set(career);

function playMatch(c, prep) {
  const fx = prep.fx;
  const home = clubById(fx.home), away = clubById(fx.away);
  const side = fx.home === c.clubId ? 0 : 1;
  const human = { ...c.player };
  const teams = [buildTeamConfig(home, { human: side === 0 ? human : null }), buildTeamConfig(away, { human: side === 1 ? human : null })];
  const m = new Match({ seed: c.nextMatchId * 17 + 3, halfLength, difficulty: 'assisted', teams });
  m.humanCtl = new HumanController(m, m.human);
  const bot = new Bot(m, m.humanCtl);
  m.start();
  while (m.phase !== 'fulltime') { bot.update(); m.step(DT); }
  const rep = m.stats.report(m.human);
  return { rep, fx };
}

let played = 0;
const tierAt = [];
while (played < maxMatches) {
  const c = store.career;
  if (c.window) {
    const w = c.window;
    const best = w.offers.findIndex((o) => o.kind === 'transfer' && o.tier > clubById(c.clubId).tier);
    const renewal = w.offers.findIndex((o) => o.kind === 'renewal');
    if (best >= 0) { console.log(`  window(${w.type}) S${c.seasonNo}: ACCEPT ${w.offers[best].clubId} (tier ${w.offers[best].tier}) wage ${w.offers[best].wage}`); acceptOffer(c, best); }
    else if (renewal >= 0) { console.log(`  window(${w.type}): renewal`); acceptOffer(c, renewal); }
    else { console.log(`  window(${w.type}) S${c.seasonNo}: ${w.offers.length} offers, staying. interest: ${interestList(c).map((i) => `${i.club.short}:${Math.round(i.score * 100)}${i.qualifies ? '*' : ''}`).join(' ')}`); declineWindow(c); }
    store.save();
    continue;
  }
  if (canStartNewSeason(c)) { startNewSeason(c); store.save(); console.log(`  -- season ${c.seasonNo} at ${c.clubId}`); continue; }
  const prep = prepareMatch(c);
  if (!prep) { console.log('no fixture?', JSON.stringify(c.season.final)); break; }
  const { rep, fx } = playMatch(c, prep);
  const res = commitMatch(c, prep.id, fx, { score: rep.score, rating: rep.rating, minutes: rep.minutes, stats: rep.stats, motm: rep.motm && rep.motm.isHuman });
  const dup = commitMatch(c, prep.id, fx, { score: rep.score, rating: rep.rating, minutes: rep.minutes, stats: rep.stats });
  if (!dup.duplicate) throw new Error('duplicate commit was not rejected');
  while (c.player.points > 0) { const k = ATTRS.slice().sort((a, b) => c.player.attrs[a] - c.player.attrs[b])[0]; upgradeAttr(c, k); }
  played++;
  tierAt.push(clubById(c.clubId).tier);
  console.log(`M${played} S${c.seasonNo} ${fx.final ? 'FINAL' : 'R' + fx.round} ${clubById(fx.home).short}-${clubById(fx.away).short} ${rep.score.join('-')} rating ${rep.rating} g${rep.stats.goals} a${rep.stats.assists} rep ${c.player.reputation.toFixed(1)} lvl ${c.player.level} xp+${res.xp}`);
  const r = store.save();
  if (!r.ok) throw new Error('save failed');
}
const c = store.career;
console.log('final club', c.clubId, 'tier', clubById(c.clubId).tier, 'season', c.seasonNo, 'attrs', JSON.stringify(c.player.attrs));
console.log('trophies', JSON.stringify(c.trophies));
console.log('timeline:\n ' + c.timeline.map((t) => `S${t.season}: ${t.text}`).join('\n '));
console.log('tier progression', tierAt.join(''));

// save round-trip, corruption and backup recovery
const s2 = new CareerStore();
if (!s2.career || s2.career.player.name !== 'Test Hero') throw new Error('reload failed');
mem.set('firsttouch.career', mem.get('firsttouch.career').slice(0, 200) + 'garbage');
const s3 = new CareerStore();
console.log('corrupt main ->', s3.career ? 'restored from backup' : 'lost', '|', s3.notice && s3.notice.text);
mem.set('firsttouch.career', '{bad json');
mem.set('firsttouch.career.backup', 'also bad');
const s4 = new CareerStore();
console.log('both corrupt ->', s4.career ? 'loaded?!' : 'no career', '|', s4.notice && s4.notice.text);
