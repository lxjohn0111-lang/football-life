// How many strong matches does it take to climb from tier 1 to tier 5?
import { createCareer, prepareMatch, commitMatch, acceptOffer, declineWindow, canStartNewSeason, startNewSeason } from '../src/career/career.js';
import { clubById } from '../src/career/clubs.js';
import { Rng } from '../src/sim/rng.js';
const profiles = {
  ST: (r) => ({ goals: r.next() < 0.55 ? 1 : 0, assists: r.next() < 0.25 ? 1 : 0, passCmp: 10, passAtt: 13, shotsOn: 2, tacklesWon: 1, interceptions: 1, keyPasses: 1 }),
  W: (r) => ({ goals: r.next() < 0.35 ? 1 : 0, assists: r.next() < 0.35 ? 1 : 0, passCmp: 12, passAtt: 15, shotsOn: 1, tacklesWon: 1, interceptions: 1, keyPasses: 2 }),
  AM: (r) => ({ goals: r.next() < 0.3 ? 1 : 0, assists: r.next() < 0.4 ? 1 : 0, passCmp: 18, passAtt: 22, shotsOn: 1, tacklesWon: 1, interceptions: 1, keyPasses: 2 }),
  CM: (r) => ({ goals: r.next() < 0.1 ? 1 : 0, assists: r.next() < 0.2 ? 1 : 0, passCmp: 24, passAtt: 28, shotsOn: 0, tacklesWon: 2, interceptions: 2, keyPasses: 1 }),
  DEF: (r) => ({ goals: 0, assists: r.next() < 0.1 ? 1 : 0, passCmp: 20, passAtt: 24, shotsOn: 0, tacklesWon: 3, interceptions: 3, keyPasses: 0 }),
};
for (const role of Object.keys(profiles)) {
  for (const [lo, hi] of [[7.2, 8.0], [6.6, 7.2]]) {
    const r = new Rng(7);
    const c = createCareer({ name: 'P', number: 9, nationality: 'X', foot: 'R', role, look: {} }, 99);
    let n = 0, reached = null;
    while (n < 60 && !reached) {
      if (c.window) { const i = c.window.offers.findIndex((o) => o.kind === 'transfer' && o.tier > clubById(c.clubId).tier); if (i >= 0) acceptOffer(c, i); else { const j = c.window.offers.findIndex((o) => o.kind === 'renewal'); if (j >= 0) acceptOffer(c, j); else declineWindow(c); } continue; }
      if (canStartNewSeason(c)) { startNewSeason(c); continue; }
      const prep = prepareMatch(c);
      const p = profiles[role](r);
      const rating = lo + r.next() * (hi - lo);
      commitMatch(c, prep.id, prep.fx, { score: [2, 1], rating, minutes: 90, stats: { ...p, shots: p.shotsOn + 1, possLost: 3, fouls: 0 } });
      n++;
      if (clubById(c.clubId).tier === 5) reached = n;
    }
    console.log(role.padEnd(3), `ratings ${lo}-${hi}`, reached ? `tier 5 after ${reached} matches` : `tier ${clubById(c.clubId).tier} after ${n}`);
  }
}
