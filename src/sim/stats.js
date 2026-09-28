// Match statistics and ratings derived only from authoritative match events.
// Pending passes, tackles and shots are resolved exactly once, and all of them
// are resolved at restarts, halftime and full time so nothing leaks.
import { PITCH, RULES } from './constants.js';
import { clamp } from './vec.js';

const COUNTED_PASSES = new Set(['pass', 'through', 'cross', 'lob', 'gkthrow', 'gkkick']);

export function emptyStats() {
  return {
    touches: 0, goals: 0, ownGoals: 0, assists: 0, passAtt: 0, passCmp: 0,
    shots: 0, shotsOn: 0, tacklesWon: 0, tackleAtt: 0, interceptions: 0,
    possLost: 0, fouls: 0, saves: 0, keyPasses: 0,
  };
}

export const WEIGHTS = {
  ST: { goal: 1.05, assist: 0.7, tackle: 0.22, intercept: 0.16, pass: 0.035, prog: 0.03, key: 0.2, shotOn: 0.1, shotOff: -0.02, lost: -0.07, foul: -0.2, conceded: -0.03, clean: 0.05 },
  W: { goal: 1.0, assist: 0.75, tackle: 0.24, intercept: 0.17, pass: 0.04, prog: 0.03, key: 0.22, shotOn: 0.09, shotOff: -0.02, lost: -0.08, foul: -0.2, conceded: -0.03, clean: 0.05 },
  AM: { goal: 1.0, assist: 0.8, tackle: 0.26, intercept: 0.18, pass: 0.045, prog: 0.035, key: 0.25, shotOn: 0.09, shotOff: -0.02, lost: -0.09, foul: -0.2, conceded: -0.04, clean: 0.08 },
  CM: { goal: 1.0, assist: 0.8, tackle: 0.33, intercept: 0.25, pass: 0.055, prog: 0.035, key: 0.22, shotOn: 0.08, shotOff: -0.02, lost: -0.1, foul: -0.2, conceded: -0.07, clean: 0.2 },
  DEF: { goal: 1.1, assist: 0.8, tackle: 0.4, intercept: 0.3, pass: 0.05, prog: 0.03, key: 0.2, shotOn: 0.08, shotOff: -0.02, lost: -0.14, foul: -0.22, conceded: -0.15, clean: 0.45 },
  GK: { goal: 1.0, assist: 0.6, tackle: 0.2, intercept: 0.15, pass: 0.02, prog: 0.01, key: 0.1, shotOn: 0.05, shotOff: 0, lost: -0.1, foul: -0.3, conceded: -0.3, clean: 0.6, save: 0.3 },
};

export const CATEGORY_LABELS = {
  goals: 'Goals', assists: 'Assists', tackles: 'Tackles won', interceptions: 'Interceptions',
  passing: 'Passing', keyPasses: 'Chances created', shooting: 'Shooting', lost: 'Possession lost',
  fouls: 'Fouls', defending: 'Defending (goals conceded / clean sheet)', result: 'Match result',
  involvement: 'Involvement', positioning: 'Positioning', decisions: 'Poor decisions', saves: 'Saves',
};

export class MatchStats {
  constructor(match) {
    this.m = match;
    this.by = new Map();
    this.contrib = new Map();
    for (const p of match.players) { this.by.set(p, emptyStats()); this.contrib.set(p, []); }
    this.pendingPass = null;
    this.pendingTackle = null;
    this.pendingShot = null;
    this.lastCompleted = null;
    this.controller = null;
    this.looseFrom = null;
    this.pairCount = new Map();
    this.teamPossTime = [0, 0];
    this.teamShots = [0, 0];
    this.teamShotsOn = [0, 0];
    this.posSamples = new Map();
    this.sampleT = 0;
    this.longShots = new Map();
    this.finalised = false;
    this.goalLog = [];
    const ev = match.events;
    ev.on('kick', (e) => this.onKick(e));
    ev.on('possession', (e) => this.onPossession(e));
    ev.on('release', (e) => { if (e.reason === 'loose' || e.reason === 'blocked') this.looseFrom = e.player; this.controller = null; });
    ev.on('tackle', (e) => this.onTackle(e));
    ev.on('save', (e) => this.onSave(e));
    ev.on('deflect', (e) => this.onDeflect(e));
    ev.on('goal', (e) => this.onGoal(e));
    ev.on('foul', (e) => { this.s(e.player).fouls++; this.add(e.player, 'fouls', this.w(e.player).foul); this.resolveAll('foul'); });
    ev.on('out', (e) => this.onOut(e));
    ev.on('restartSetup', () => this.resolveAll('restart'));
    ev.on('halftime', () => this.resolveAll('half'));
    ev.on('fulltime', () => { this.resolveAll('full'); this.finalise(); });
    ev.on('touch', (e) => { if (e.kind === 'receive') return; });
  }

  s(p) { let st = this.by.get(p); if (!st) { st = emptyStats(); this.by.set(p, st); this.contrib.set(p, []); } return st; }
  w(p) { return WEIGHTS[p.role] || WEIGHTS.CM; }
  add(p, cat, v) { if (!p || !v) return; this.contrib.get(p)?.push({ cat, v, t: this.m.time }); }
  credit(p, kind) { if (p) this.m.events.emit('credit', { player: p, kind, t: this.m.time }); }

  // called every fixed step while playing
  update(dt) {
    const m = this.m;
    if (m.phase !== 'playing') return;
    if (m.possTeam != null && (m.ball.owner || m.ball.state === 'held')) this.teamPossTime[m.possTeam] += dt;
    if (this.pendingTackle && m.time - this.pendingTackle.t > RULES.TACKLE_WINDOW) this.pendingTackle = null;
    this.sampleT += dt;
    if (this.sampleT >= 1) {
      this.sampleT = 0;
      for (const p of m.players) {
        if (p.isGK) continue;
        const good = this.goodPosition(p);
        const rec = this.posSamples.get(p) || { good: 0, n: 0 };
        rec.n++; if (good) rec.good++;
        this.posSamples.set(p, rec);
      }
    }
  }

  goodPosition(p) {
    const m = this.m, ball = m.ball;
    const own = m.ownGoalX(p.team);
    const u = m.uOf(p.team, p.pos.x);
    const bd = p.pos.distXZ(ball.pos);
    const inPoss = m.possTeam === p.team;
    switch (p.role) {
      case 'DEF':
        if (inPoss) return u < 0.35 || bd < 14;
        return Math.abs(p.pos.x - own) <= Math.abs(ball.pos.x - own) + 1 || bd < 6;
      case 'CM': return bd < 22 && u < 0.7;
      case 'AM': return inPoss ? (u > -0.1 || bd < 14) : bd < 22;
      case 'W': return inPoss ? (Math.abs(p.pos.z) > 7 || u > 0.35 || bd < 12) : u > -0.5;
      case 'ST': return inPoss ? (u > 0.15 || bd < 12) : u > -0.35;
      default: return true;
    }
  }

  onKick(e) {
    const p = e.player, st = this.s(p);
    st.touches++;
    const pp = this.pendingPass;
    if (pp) {
      if (pp.passer === p) this.pendingPass = null; // kicked again without anyone else touching
      else if (e.team === pp.team) this.completePass(pp, p); // first-time pass/shot by a teammate
      else this.failPass(pp, null, e.team);
    }
    this.controller = null;
    this.looseFrom = null;
    if (COUNTED_PASSES.has(e.kind)) {
      st.passAtt++;
      this.pendingPass = { passer: p, team: p.team, kind: e.kind, t: e.t, fromX: e.pos.x, target: e.target, id: e.id };
    }
    if (e.kind === 'shot') {
      st.shots++;
      this.teamShots[p.team]++;
      this.pendingShot = { shooter: p, onTarget: e.onTarget, t: e.t, resolved: false };
      const lc = this.lastCompleted;
      if (lc && lc.receiver === p && e.t - lc.recvT < 6 && !lc.keyCounted) {
        lc.keyCounted = true;
        this.s(lc.passer).keyPasses++;
        this.add(lc.passer, 'keyPasses', this.w(lc.passer).key);
      }
      const gx = this.m.attackDir(p.team) * PITCH.HL;
      const dist = Math.hypot(gx - e.pos.x, e.pos.z);
      if (dist > 28 && !e.restart) {
        const n = (this.longShots.get(p) || 0) + 1;
        this.longShots.set(p, n);
        if (n > 1) this.add(p, 'decisions', -0.06);
      }
    }
  }

  completePass(pp, receiver) {
    this.pendingPass = null;
    const passer = pp.passer, st = this.s(passer), w = this.w(passer);
    st.passCmp++;
    const att = this.m.attackDir(passer.team);
    const gain = (receiver.pos.x - pp.fromX) * att;
    const progressive = gain >= 8;
    const key = passer.id + ':' + receiver.id;
    const n = (this.pairCount.get(key) || 0) + 1;
    this.pairCount.set(key, n);
    const decay = Math.pow(progressive ? 0.85 : 0.65, n - 1);
    this.add(passer, 'passing', (w.pass + (progressive ? w.prog : 0)) * decay);
    this.credit(passer, 'passCompleted');
    this.lastCompleted = { passer, receiver, team: passer.team, t: pp.t, recvT: this.m.time, keyCounted: false };
  }

  failPass(pp, interceptor, byTeam) {
    this.pendingPass = null;
    const passer = pp.passer;
    if (interceptor) {
      const n = ++this.s(interceptor).interceptions;
      this.add(interceptor, 'interceptions', this.w(interceptor).intercept * (n <= 3 ? 1 : Math.pow(0.8, n - 3)));
      this.credit(interceptor, 'interception');
    }
    if (byTeam != null && byTeam !== passer.team) {
      this.s(passer).possLost++;
      this.add(passer, 'lost', this.w(passer).lost);
      this.credit(passer, 'possessionLost');
    }
  }

  onPossession(e) {
    const p = e.player, team = e.team, st = this.s(p);
    st.touches++;
    const pp = this.pendingPass;
    if (pp) {
      if (pp.passer === p) this.pendingPass = null;
      else if (pp.team === team) this.completePass(pp, p);
      else this.failPass(pp, this.m.time - pp.t <= 3 ? p : null, team); // interception = cut out while the pass is live
    }
    let tackleCredited = false;
    const pt = this.pendingTackle;
    if (pt) {
      if (pt.team === team && this.m.time - pt.t <= RULES.TACKLE_WINDOW) {
        const n = ++this.s(pt.tackler).tacklesWon;
        this.add(pt.tackler, 'tackles', this.w(pt.tackler).tackle * (n <= 4 ? 1 : Math.pow(0.85, n - 4)));
        this.credit(pt.tackler, 'tackleWon');
        if (pt.victim) { this.s(pt.victim).possLost++; this.add(pt.victim, 'lost', this.w(pt.victim).lost); this.credit(pt.victim, 'possessionLost'); }
        tackleCredited = true;
      }
      this.pendingTackle = null;
    }
    // lost a controlled dribble to the other team (without a tackle)
    if (!tackleCredited) {
      const loser = e.prev && e.prev.team !== team ? e.prev : (this.looseFrom && this.looseFrom.team !== team ? this.looseFrom : null);
      if (loser) { this.s(loser).possLost++; this.add(loser, 'lost', this.w(loser).lost); this.credit(loser, 'possessionLost'); }
    }
    this.looseFrom = null;
    if (this.lastCompleted && this.lastCompleted.team !== team) this.lastCompleted = null;
    this.controller = p;
  }

  onTackle(e) {
    this.s(e.player).tackleAtt++;
    if (e.success) {
      this.pendingTackle = { tackler: e.player, victim: e.victim, team: e.player.team, t: e.t };
      this.looseFrom = null;
      this.controller = null;
    }
  }

  onSave(e) {
    const ps = this.pendingShot;
    if (ps && !ps.resolved) {
      ps.resolved = true;
      if (ps.onTarget) {
        this.s(ps.shooter).shotsOn++;
        this.teamShotsOn[ps.shooter.team]++;
        this.add(ps.shooter, 'shooting', this.w(ps.shooter).shotOn);
        this.credit(ps.shooter, 'shotSaved');
        this.s(e.player).saves++;
        this.add(e.player, 'saves', WEIGHTS.GK.save);
      } else {
        this.add(ps.shooter, 'shooting', this.w(ps.shooter).shotOff);
      }
    }
  }

  onDeflect(e) {
    const ps = this.pendingShot;
    if (ps && !ps.resolved && e.player.team !== ps.shooter.team && !e.player.isGK && this.m.time - ps.t < 3) {
      ps.resolved = true; // blocked by an outfield player: not on target
      ps.blocked = true;
    }
  }

  onGoal(e) {
    const scorer = e.scorer;
    const ps = this.pendingShot;
    if (scorer) {
      const st = this.s(scorer);
      st.goals++;
      if (ps && ps.shooter === scorer && (!ps.resolved || ps.blocked)) {
        st.shotsOn++; this.teamShotsOn[scorer.team]++; ps.resolved = true;
      } else if (!ps || ps.shooter !== scorer) {
        st.shots++; st.shotsOn++; this.teamShots[scorer.team]++; this.teamShotsOn[scorer.team]++;
      }
      this.add(scorer, 'goals', this.w(scorer).goal);
      const lc = this.lastCompleted;
      if (lc && lc.receiver === scorer && lc.team === e.team && lc.passer !== scorer && e.t - lc.t <= RULES.ASSIST_WINDOW) {
        this.s(lc.passer).assists++;
        this.add(lc.passer, 'assists', this.w(lc.passer).assist);
        e.assist = lc.passer;
        this.credit(lc.passer, 'assist');
      }
    } else if (e.ownGoal && e.ownGoalBy) {
      this.s(e.ownGoalBy).ownGoals++;
      this.add(e.ownGoalBy, 'decisions', -0.3);
    }
    // conceding hurts the defending team a little
    for (const p of this.m.teams[1 - e.team].players) this.add(p, 'defending', this.w(p).conceded);
    this.goalLog.push({ team: e.team, scorer: scorer ? scorer.name : null, scorerRef: scorer, assist: e.assist ? e.assist.name : null, ownGoal: e.ownGoal, ownGoalBy: e.ownGoalBy ? e.ownGoalBy.name : null, clock: this.m.displayClock, half: this.m.half });
    this.resolveAll('goal');
  }

  onOut(e) {
    const pp = this.pendingPass;
    if (pp) this.failPass(pp, null, e.team); // out-of-bounds turnover if the restart goes to the opponents
    else if (e.controller && e.team !== e.controller.team) {
      this.s(e.controller).possLost++;
      this.add(e.controller, 'lost', this.w(e.controller).lost);
    }
    this.resolveAll('out');
  }

  resolveAll(reason) {
    // stale events cannot leak across restarts
    if (this.pendingPass) this.pendingPass = null;
    this.pendingTackle = null;
    const ps = this.pendingShot;
    if (ps && !ps.resolved) {
      ps.resolved = true;
      if (reason !== 'goal') this.add(ps.shooter, 'shooting', this.w(ps.shooter).shotOff);
    }
    this.pendingShot = null;
    this.looseFrom = null;
    if (reason !== 'goal') this.lastCompleted = null;
  }

  finalise() {
    if (this.finalised) return;
    this.finalised = true;
    const m = this.m;
    const [a, b] = m.scoreline;
    for (const p of m.players) {
      const w = this.w(p);
      const my = p.team === 0 ? a : b, their = p.team === 0 ? b : a;
      this.add(p, 'result', my > their ? 0.25 : my < their ? -0.2 : 0);
      if (their === 0) this.add(p, 'defending', w.clean);
      const st = this.s(p);
      if (!p.isGK) {
        if (st.touches < 4) this.add(p, 'involvement', -0.25);
        else if (st.touches > 25) this.add(p, 'involvement', 0.15);
        const ps = this.posSamples.get(p);
        if (ps && ps.n > 20) this.add(p, 'positioning', (ps.good / ps.n - 0.55) * 0.5);
      }
    }
  }

  rating(p) {
    let sum = 0;
    for (const c of this.contrib.get(p) || []) sum += c.v;
    return Math.round(clamp(6 + sum, 1, 10) * 10) / 10;
  }

  breakdown(p) {
    const agg = {};
    for (const c of this.contrib.get(p) || []) agg[c.cat] = (agg[c.cat] || 0) + c.v;
    const list = Object.entries(agg).map(([cat, v]) => ({ cat, label: CATEGORY_LABELS[cat] || cat, v }));
    const pos = list.filter((x) => x.v > 0.005).sort((x, y) => y.v - x.v);
    const neg = list.filter((x) => x.v < -0.005).sort((x, y) => x.v - y.v);
    return { pos, neg, all: list };
  }

  possessionPct() {
    const [a, b] = this.teamPossTime;
    const t = a + b;
    return t > 0 ? [Math.round((a / t) * 100), 100 - Math.round((a / t) * 100)] : [50, 50];
  }

  report(p) {
    const st = this.s(p);
    const m = this.m;
    const total = m.halfLength * 2;
    const minutes = Math.round(Math.min(1, m.clock / total) * 90);
    let best = null, br = -1;
    for (const q of m.players) { const r = this.rating(q); if (r > br) { br = r; best = q; } }
    return {
      score: m.scoreline,
      minutes,
      rating: this.rating(p),
      stats: { ...st, passAcc: st.passAtt ? Math.round((st.passCmp / st.passAtt) * 100) : 0 },
      breakdown: this.breakdown(p),
      possession: this.possessionPct(),
      teamShots: [...this.teamShots],
      teamShotsOn: [...this.teamShotsOn],
      motm: best ? { name: best.name, team: best.team, rating: br, isHuman: best.isHuman } : null,
      goals: this.goalLog.map((g) => ({ ...g, scorerRef: undefined })),
    };
  }
}
