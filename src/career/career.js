// Career rules: seasons of 6 league fixtures, a consistently simulated table,
// development XP, rolling form + long-term reputation, club interest, offers
// at clear transfer windows, contracts and a career timeline.
import { CLUBS, clubById, clubsInTier, tierInfo, clubStrength } from './clubs.js';
import { Rng, hashString } from '../sim/rng.js';
import { POSITIONS } from '../sim/constants.js';

export const CAREER_VERSION = 2;
export const ATTRS = ['pace', 'stamina', 'control', 'passing', 'finishing', 'tackling'];
export const ATTR_LABELS = { pace: 'Pace', stamina: 'Stamina', control: 'Ball control', passing: 'Passing', finishing: 'Finishing', tackling: 'Tackling' };
export const posName = (r) => (POSITIONS.find((p) => p.id === r) || { name: r }).name;

const POS_BONUS = {
  ST: { finishing: 6, pace: 3 }, W: { pace: 6, control: 3 }, AM: { passing: 4, control: 5 },
  CM: { passing: 5, stamina: 4 }, DEF: { tackling: 7, stamina: 2 },
};

export function startingAttrs(role) {
  const a = { pace: 47, stamina: 47, control: 46, passing: 46, finishing: 45, tackling: 44 };
  for (const [k, v] of Object.entries(POS_BONUS[role] || {})) a[k] += v;
  return a;
}

// Interest requirements for clubs of a given tier
export const TIER_REQ = {
  1: { avg: 5.8, rep: 0, apps: 0 },
  2: { avg: 6.6, rep: 10, apps: 3 },
  3: { avg: 6.9, rep: 28, apps: 5 },
  4: { avg: 7.1, rep: 48, apps: 5 },
  5: { avg: 7.3, rep: 68, apps: 5 },
};
const WAGE = [0, 160, 650, 2600, 11000, 42000];

function emptyTotals() {
  return { apps: 0, minutes: 0, goals: 0, assists: 0, ratingSum: 0, passCmp: 0, passAtt: 0, shots: 0, shotsOn: 0, tackles: 0, interceptions: 0, possLost: 0, fouls: 0, motm: 0, wins: 0, draws: 0, losses: 0, trophies: 0 };
}

// ---------------------------------------------------------------- seasons
function roundRobin(ids) {
  const [a, b, c, d] = ids;
  const first = [[[a, b], [c, d]], [[c, a], [d, b]], [[a, d], [b, c]]];
  const second = first.map((r) => r.map(([h, w]) => [w, h]));
  return [...first, ...second];
}

export function newSeason(career, clubId, seasonNo) {
  const club = clubById(clubId);
  const ids = clubsInTier(club.tier).map((c) => c.id);
  // rotate so the schedule differs by season
  const rng = new Rng(hashString(`${career.seed}:${seasonNo}:${club.tier}`));
  for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(rng.next() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  const rounds = roundRobin(ids);
  const fixtures = [];
  rounds.forEach((r, i) => r.forEach(([h, a]) => fixtures.push({ round: i + 1, home: h, away: a, score: null })));
  return {
    no: seasonNo, tier: club.tier, league: tierInfo(club.tier).league, fixtures, round: 1,
    table: ids.map((id) => ({ id, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 })),
    finished: false, final: null, placement: null,
  };
}

export function sortedTable(season) {
  return [...season.table].sort((x, y) => y.pts - x.pts || (y.gf - y.ga) - (x.gf - x.ga) || y.gf - x.gf || x.id.localeCompare(y.id));
}

function applyResult(season, fx, hg, ag) {
  fx.score = [hg, ag];
  const H = season.table.find((t) => t.id === fx.home), A = season.table.find((t) => t.id === fx.away);
  H.p++; A.p++; H.gf += hg; H.ga += ag; A.gf += ag; A.ga += hg;
  if (hg > ag) { H.w++; A.l++; H.pts += 3; } else if (hg < ag) { A.w++; H.l++; A.pts += 3; } else { H.d++; A.d++; H.pts++; A.pts++; }
}

function poisson(rng, lambda) {
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= rng.next(); } while (p > L && k < 10);
  return k - 1;
}

// deterministic simulation of an AI-only fixture
export function simulateFixture(career, season, fx) {
  const rng = new Rng(hashString(`${career.seed}:${season.no}:${season.tier}:${fx.round}:${fx.home}:${fx.away}`));
  const sh = clubStrength(clubById(fx.home)) + 2.5, sa = clubStrength(clubById(fx.away));
  const lh = Math.max(0.3, 1.35 * Math.pow(sh / sa, 1.6)), la = Math.max(0.3, 1.15 * Math.pow(sa / sh, 1.6));
  applyResult(season, fx, poisson(rng, lh), poisson(rng, la));
}

export function nextFixture(career) {
  const s = career.season;
  if (s.finished) return s.final && !s.final.played ? { final: true, ...s.final } : null;
  return s.fixtures.find((f) => f.round === s.round && (f.home === career.clubId || f.away === career.clubId)) || null;
}

// ---------------------------------------------------------------- creation
export function createCareer(p, seed = (Date.now() % 1e9) | 0) {
  const rng = new Rng(seed);
  const starters = clubsInTier(1);
  const club = p.clubId ? clubById(p.clubId) : starters[Math.floor(rng.next() * starters.length)];
  const career = {
    version: CAREER_VERSION, seed, createdAt: Date.now(),
    player: {
      name: p.name, number: p.number, nationality: p.nationality, foot: p.foot, role: p.role,
      look: { ...p.look }, attrs: startingAttrs(p.role), xp: 0, points: 0, level: 1, reputation: 5,
    },
    clubId: club.id,
    contract: { clubId: club.id, wage: WAGE[1], years: 2, role: `Starting ${posName(p.role)}`, expectations: 'Average rating 6.0+, learn the game', signedSeason: 1 },
    seasonNo: 1, season: null,
    form: [], appsAtClub: 0,
    totals: emptyTotals(), seasons: [],
    matchLog: [], timeline: [], trophies: [],
    window: null, trainingAvailable: true, committed: [], nextMatchId: 1, earnings: 0,
    flags: {},
  };
  career.season = newSeason(career, club.id, 1);
  seasonRecord(career);
  addTimeline(career, `Signed for ${club.name} (${tierInfo(1).league}) as ${posName(p.role)}`, 'transfer');
  return career;
}

function seasonRecord(career) {
  let r = career.seasons.find((s) => s.season === career.seasonNo && s.clubId === career.clubId);
  if (!r) { r = { season: career.seasonNo, clubId: career.clubId, tier: clubById(career.clubId).tier, ...emptyTotals(), placement: null }; career.seasons.push(r); }
  return r;
}

function addTimeline(career, text, kind = 'info') {
  career.timeline.push({ season: career.seasonNo, round: career.season ? career.season.round : 0, text, kind });
}

// ---------------------------------------------------------------- matches
export function prepareMatch(career) {
  const fx = nextFixture(career);
  if (!fx) return null;
  const id = `m${career.nextMatchId}`;
  return { id, fx, clubId: career.clubId };
}

// Commit a finished match exactly once (repeated calls with the same id are ignored)
export function commitMatch(career, matchId, fx, result) {
  if (career.committed.includes(matchId)) return { duplicate: true };
  career.committed.push(matchId);
  if (career.committed.length > 200) career.committed.splice(0, career.committed.length - 200);
  career.nextMatchId++;
  const s = career.season;
  const club = clubById(career.clubId);
  const isHome = fx.home === career.clubId;
  const [hg, ag] = result.score;
  const my = isHome ? hg : ag, their = isHome ? ag : hg;
  const st = result.stats;
  const rating = result.rating;
  const summary = { xp: 0, levelUps: 0, rep: 0, notes: [] };

  if (fx.final) {
    s.final.played = true;
    s.final.score = [hg, ag];
    s.final.won = my > their || (my === their && result.penaltyWin);
  } else {
    const real = s.fixtures.find((f) => f.round === fx.round && f.home === fx.home && f.away === fx.away);
    applyResult(s, real, hg, ag);
    for (const other of s.fixtures) if (other.round === fx.round && !other.score) simulateFixture(career, s, other);
    s.round++;
  }

  // statistics: career totals and this season at this club
  const rec = seasonRecord(career);
  for (const t of [career.totals, rec]) {
    t.apps++; t.minutes += result.minutes; t.goals += st.goals; t.assists += st.assists; t.ratingSum += rating;
    t.passCmp += st.passCmp; t.passAtt += st.passAtt; t.shots += st.shots; t.shotsOn += st.shotsOn;
    t.tackles += st.tacklesWon; t.interceptions += st.interceptions; t.possLost += st.possLost; t.fouls += st.fouls;
    if (result.motm) t.motm++;
    if (my > their) t.wins++; else if (my < their) t.losses++; else t.draws++;
  }
  const oppId = isHome ? fx.away : fx.home;
  career.matchLog.push({
    season: career.seasonNo, round: fx.final ? 'F' : fx.round, clubId: career.clubId, opp: oppId, home: isHome,
    score: [my, their], rating, goals: st.goals, assists: st.assists, passCmp: st.passCmp, passAtt: st.passAtt,
    tackles: st.tacklesWon, interceptions: st.interceptions, keyPasses: st.keyPasses, shotsOn: st.shotsOn, tier: club.tier,
  });
  if (career.matchLog.length > 400) career.matchLog.shift();
  career.form.push(rating);
  if (career.form.length > 10) career.form.shift();
  career.appsAtClub++;

  // milestones
  const T = career.totals;
  if (career.appsAtClub === 1) addTimeline(career, `Debut for ${club.name} vs ${clubById(oppId).name} (rating ${rating.toFixed(1)})`, 'debut');
  if (st.goals > 0 && T.goals === st.goals) addTimeline(career, `First career goal, vs ${clubById(oppId).name}`, 'goal');
  if (st.assists > 0 && T.assists === st.assists) addTimeline(career, `First career assist, vs ${clubById(oppId).name}`, 'assist');
  if (st.goals >= 3) addTimeline(career, `Hat-trick vs ${clubById(oppId).name}!`, 'goal');
  if (result.motm && T.motm === 1) addTimeline(career, 'First Player of the Match award', 'award');

  // reputation (long-term) and development XP
  const repDelta = (rating - 6.3) * 2.5 + (club.tier - 1) * 0.8 + st.goals * 0.6 + st.assists * 0.4;
  career.player.reputation = Math.max(0, Math.min(100, career.player.reputation + repDelta));
  summary.rep = repDelta;
  const xp = Math.round(30 + Math.max(0, rating - 5.5) * 25 + st.goals * 12 + st.assists * 8 + (my > their ? 10 : 0));
  summary.levelUps = addXp(career, xp);
  summary.xp = xp;
  career.earnings += career.contract.wage;
  career.trainingAvailable = true;

  // transfer window after the 3rd fixture, season end after the 6th (+ final)
  if (!fx.final && s.round === 4 && !s.finished) openWindow(career, 'mid');
  if (!fx.final && s.round > 6) endLeague(career);
  if (fx.final) finishFinal(career);
  return summary;
}

export function addXp(career, xp) {
  const p = career.player;
  p.xp += xp;
  let ups = 0;
  while (p.xp >= 100) { p.xp -= 100; p.points++; p.level++; ups++; }
  return ups;
}

export function attrStep(v) { return v < 60 ? 3 : v < 75 ? 2 : 1; }
export function upgradeAttr(career, key) {
  const p = career.player;
  if (p.points <= 0 || !ATTRS.includes(key) || p.attrs[key] >= 99) return false;
  p.attrs[key] = Math.min(99, p.attrs[key] + attrStep(p.attrs[key]));
  p.points--;
  return true;
}

function endLeague(career) {
  const s = career.season;
  s.finished = true;
  const table = sortedTable(s);
  const pos = table.findIndex((t) => t.id === career.clubId) + 1;
  s.placement = pos;
  seasonRecord(career).placement = pos;
  const lg = tierInfo(s.tier).league;
  if (pos === 1) {
    const trophy = `${lg} champions (Season ${career.seasonNo})`;
    career.trophies.push({ season: career.seasonNo, name: `${lg} title`, clubId: career.clubId });
    career.totals.trophies++; seasonRecord(career).trophies++;
    addTimeline(career, `Won the ${lg} with ${clubById(career.clubId).name}!`, 'trophy');
    void trophy;
  } else {
    addTimeline(career, `Finished ${ordinal(pos)} in the ${lg}`, 'season');
  }
  // top two of the elite league meet in the Continental Cup final
  if (s.tier === 5 && pos <= 2) {
    const opp = table[pos === 1 ? 1 : 0].id;
    s.final = { home: career.clubId, away: opp, played: false, name: 'Continental Cup Final', round: 'F' };
    return;
  }
  openWindow(career, 'end');
}

function finishFinal(career) {
  const s = career.season;
  if (s.final.won) {
    career.trophies.push({ season: career.seasonNo, name: 'Continental Cup', clubId: career.clubId });
    career.totals.trophies++; seasonRecord(career).trophies++;
    addTimeline(career, `Lifted the Continental Cup with ${clubById(career.clubId).name}!`, 'trophy');
  } else addTimeline(career, 'Runner-up in the Continental Cup Final', 'season');
  openWindow(career, 'end');
}

export function ordinal(n) { return n + (['th', 'st', 'nd', 'rd'][(n % 100 - 20) % 10] || ['th', 'st', 'nd', 'rd'][n % 100] || 'th'); }

// ---------------------------------------------------------------- interest
function recent(career, n = 5) {
  return career.matchLog.filter((m) => m.season >= career.seasonNo - 1).slice(-n);
}

export function contribution(career, games) {
  const r = career.player.role;
  const n = Math.max(1, games.length);
  const sum = (k) => games.reduce((a, g) => a + (g[k] || 0), 0);
  const pa = sum('passAtt'), pc = sum('passCmp');
  const acc = pa ? pc / pa : 0;
  const def = (sum('tackles') + sum('interceptions')) / n;
  switch (r) {
    case 'ST': return { value: (sum('goals') + 0.5 * sum('assists') + 0.15 * sum('shotsOn')) / n, label: 'goal threat', unit: 'goal involvements per match' };
    case 'W': return { value: (sum('goals') + sum('assists') + 0.2 * sum('keyPasses')) / n, label: 'goals and chance creation', unit: 'contributions per match' };
    case 'AM': return { value: (sum('assists') + sum('goals') + 0.3 * sum('keyPasses')) / n, label: 'strong passing and chance creation', unit: 'chances per match' };
    case 'CM': return { value: acc * 0.6 + def * 0.12 + 0.2 * sum('keyPasses') / n, label: 'reliable passing and ball winning', unit: 'index', acc, def };
    default: return { value: def * 0.22 + acc * 0.45, label: 'defensive solidity and distribution', unit: 'index', acc, def };
  }
}
const CONTRIB_REQ = { ST: [0.3, 0.42, 0.52, 0.6], W: [0.3, 0.4, 0.5, 0.58], AM: [0.32, 0.42, 0.52, 0.6], CM: [0.55, 0.62, 0.68, 0.74], DEF: [0.62, 0.7, 0.78, 0.86] };

export function clubInterest(career, club) {
  const req = TIER_REQ[club.tier];
  const games = recent(career, 5);
  const avg = games.length ? games.reduce((a, g) => a + g.rating, 0) / games.length : 0;
  const rep = career.player.reputation;
  const c = contribution(career, games);
  const cReq = CONTRIB_REQ[career.player.role][Math.max(0, club.tier - 2)] ?? 0.5;
  const formS = games.length < 3 ? 0 : Math.max(0, Math.min(1, (avg - (req.avg - 1.2)) / 1.2));
  const repS = req.rep ? Math.min(1, rep / req.rep) : 1;
  const conS = Math.min(1, c.value / cReq);
  const appsS = Math.min(1, career.appsAtClub / Math.max(1, req.apps));
  const needs = clubNeedsRole(career, club);
  const score = needs ? 0.45 * formS + 0.25 * conS + 0.2 * repS + 0.1 * appsS : 0.15 * repS;
  const qualifies = needs && games.length >= 3 && avg >= req.avg && rep >= req.rep && conS >= 0.85 && career.appsAtClub >= req.apps;
  const text = needs
    ? `Average rating ${req.avg.toFixed(1)} over 5 matches (you: ${games.length ? avg.toFixed(2) : '-'}); reputation ${req.rep}+ (you: ${Math.round(rep)}); ${c.label}; ${req.apps}+ appearances for your current club (you: ${career.appsAtClub}).`
    : `No ${posName(career.player.role).toLowerCase()} role available at the moment.`;
  return { club, score, qualifies, avg, rep, needs, text, contrib: c, conS };
}

function clubNeedsRole(career, club) {
  // deterministic per window: most clubs have a place for the player's position
  const w = Math.floor((career.seasonNo * 2 + (career.season.round > 3 ? 1 : 0)));
  const h = hashString(`${career.seed}:${club.id}:${career.player.role}:${w}`);
  return (h % 5) !== 0;
}

export function interestList(career) {
  const tier = clubById(career.clubId).tier;
  const targets = tier < 5 ? clubsInTier(tier + 1) : [];
  return targets.map((c) => clubInterest(career, c)).sort((a, b) => b.score - a.score);
}

function wageFor(tier, avg) { return Math.round(WAGE[tier] * (0.9 + Math.max(0, avg - 6.5) * 0.25) / 10) * 10; }

export function openWindow(career, type) {
  const offers = [];
  const cur = clubById(career.clubId);
  for (const it of interestList(career)) {
    if (!it.qualifies) continue;
    const reasons = [`Recent form: average ${it.avg.toFixed(2)} over the last 5 matches`, `Reputation ${Math.round(it.rep)}`];
    const c = it.contrib;
    if (c.acc != null) reasons.push(`${c.label} (pass accuracy ${Math.round(c.acc * 100)}%, ${c.def.toFixed(1)} tackles + interceptions per match)`);
    else reasons.push(`${c.label}: ${c.value.toFixed(2)} ${c.unit}`);
    offers.push({
      clubId: it.club.id, tier: it.club.tier, role: `Starting ${posName(career.player.role)}`,
      wage: wageFor(it.club.tier, it.avg), years: 2 + (hashString(it.club.id + career.seasonNo) % 2),
      expectations: `Average rating ${(TIER_REQ[it.club.tier].avg - 0.2).toFixed(1)}+ and ${c.label}`,
      reasons, kind: 'transfer',
    });
  }
  offers.sort((a, b) => b.wage - a.wage);
  offers.splice(3);
  if (type === 'end') {
    const expiring = career.contract.years <= 1;
    const games = recent(career, 5);
    const avg = games.length ? games.reduce((a, g) => a + g.rating, 0) / games.length : 6;
    if (expiring) {
      // the current club always offers a new deal so there is always a next step
      offers.push({ clubId: cur.id, tier: cur.tier, role: `Starting ${posName(career.player.role)}`, wage: wageFor(cur.tier, avg), years: 2, expectations: 'Keep your place in the side', reasons: ['Contract renewal offer'], kind: 'renewal' });
      if (avg < 6.2 && cur.tier > 1) {
        const lower = clubsInTier(cur.tier - 1)[hashString(career.seed + ':' + career.seasonNo) % 4];
        offers.push({ clubId: lower.id, tier: lower.tier, role: `Starting ${posName(career.player.role)}`, wage: wageFor(lower.tier, avg), years: 2, expectations: 'Rebuild your form with regular football', reasons: ['Guaranteed starting place'], kind: 'transfer' });
      }
    }
  }
  career.window = { type, offers, season: career.seasonNo, round: career.season.round };
  if (offers.length) addTimeline(career, `${type === 'end' ? 'Season-end' : 'Mid-season'} window: ${offers.length} offer${offers.length > 1 ? 's' : ''}`, 'window');
  return career.window;
}

export function acceptOffer(career, idx) {
  const w = career.window;
  if (!w) return false;
  const o = w.offers[idx];
  if (!o) return false;
  const club = clubById(o.clubId);
  if (o.kind === 'renewal') {
    career.contract = { clubId: club.id, wage: o.wage, years: o.years + 1, role: o.role, expectations: o.expectations, signedSeason: career.seasonNo };
    addTimeline(career, `Signed a new ${o.years}-season contract with ${club.name}`, 'contract');
    career.window = null;
    return true;
  }
  const from = clubById(career.clubId);
  career.clubId = club.id;
  career.contract = { clubId: club.id, wage: o.wage, years: o.years + (w.type === 'end' ? 1 : 0), role: o.role, expectations: o.expectations, signedSeason: career.seasonNo };
  career.appsAtClub = 0;
  addTimeline(career, `Transferred from ${from.name} to ${club.name} (${tierInfo(club.tier).league})`, 'transfer');
  career.window = null;
  if (w.type === 'mid') {
    // join the new club's league mid-season: its first rounds were already played
    const s = newSeason(career, club.id, career.seasonNo);
    const played = career.season.round - 1;
    for (const fx of s.fixtures) if (fx.round <= played) simulateFixture(career, s, fx);
    s.round = played + 1;
    career.season = s;
    seasonRecord(career);
  }
  return true;
}

export function declineWindow(career) {
  if (!career.window) return;
  const w = career.window;
  const hadRenewal = w.offers.some((o) => o.kind === 'renewal');
  career.window = null;
  // declining a renewal while out of contract keeps you at the club on a rolling deal
  if (hadRenewal && career.contract.years <= 1) {
    career.contract.years = 2;
    addTimeline(career, `Stayed at ${clubById(career.clubId).name} on a rolling contract`, 'contract');
  }
}

export function canStartNewSeason(career) {
  const s = career.season;
  return s.finished && (!s.final || s.final.played) && !career.window;
}

export function startNewSeason(career) {
  career.seasonNo++;
  career.contract.years = Math.max(0, career.contract.years - 1);
  career.season = newSeason(career, career.clubId, career.seasonNo);
  seasonRecord(career);
  career.trainingAvailable = true;
  addTimeline(career, `Season ${career.seasonNo} begins with ${clubById(career.clubId).name}`, 'season');
}

export function avgRating(t) { return t.apps ? t.ratingSum / t.apps : 0; }
export { CLUBS };
