// Team and player AI. States: maintain shape -> support or mark -> approach a
// loose ball -> receive or challenge -> pass, dribble or shoot -> recover.
// AI players use exactly the same movement limits, contact rules and cooldowns
// as the human. Higher tiers think faster and choose better, nothing more.
import { V3, clamp, lerp, yawOf, angleDiff, pointSegDistXZ } from './vec.js';
import { PITCH, GOAL, AREA, RULES } from './constants.js';
import { ROLE_BOUNDS } from './formations.js';
import { startKick, startTackle, startSlide, canAct } from './actions.js';
import { laneOpenness, leadPoint, goalAngle, clampInPitch } from './passing.js';
import { updateKeeper, inOwnBox } from './keeper.js';

const tA = new V3(), tB = new V3(), tC = new V3();

export function aiParamsFor(match, team) {
  const t = match.teams[team];
  const idx = clamp((t.tier || 1) - 1, 0, 4);
  const humanTeam = match.human && match.human.team === team;
  const opp = match.human && !humanTeam;
  const d = match.assist;
  const style = t.style || { press: 0 };
  return {
    reaction: [0.4, 0.34, 0.29, 0.25, 0.21][idx] * (opp ? d.oppReact : 1),
    think: [0.3, 0.26, 0.22, 0.19, 0.16][idx],
    noise: Math.max(0.02, [0.2, 0.15, 0.11, 0.08, 0.06][idx] + (opp ? d.oppNoise : 0)),
    aggro: [0.34, 0.4, 0.48, 0.56, 0.64][idx] * (opp ? d.oppAggro : 1),
    pressRange: [11, 12.5, 14, 16, 18][idx] * (1 + (style.press || 0)) * (opp ? 0.5 + 0.5 * d.oppAggro : 1),
    tackleBonus: [-0.06, -0.03, 0, 0.02, 0.04][idx],
    humanBonus: humanTeam ? [0.42, 0.36, 0.3, 0.24, 0.2][idx] : 0,
    holdMin: [0.55, 0.45, 0.38, 0.3, 0.26][idx],
    gkReaction: [0.34, 0.3, 0.27, 0.24, 0.21][idx] * (opp ? d.oppReact : 1),
    gkHold: [1.9, 1.7, 1.5, 1.35, 1.2][idx],
    slideChance: [0.04, 0.05, 0.05, 0.06, 0.06][idx] * (opp ? d.oppAggro : 1),
    shootBias: [0.0, 0.02, 0.04, 0.05, 0.06][idx],
  };
}

class TeamState {
  constructor() {
    this.phase = 'loose';
    this.winner = null;
    this.chaser = null;
    this.chaseT = 99;
    this.chasePoint = new V3();
    this.presser = null;
    this.cover = null;
    this.supporters = [];
    this.runner = null;
    this.marks = new Map();
    this.lastDefU = 0.5;
    this.deepestOppU = -0.5;
  }
}

export class AIDirector {
  constructor(match) {
    this.m = match;
    this.ts = [new TeamState(), new TeamState()];
    this.nextTeamThink = 0;
    this.intercepts = new Map();
  }

  params(team) { return this.m.aiParams[team]; }

  update(dt) {
    const m = this.m;
    if (m.time >= this.nextTeamThink) {
      this.nextTeamThink = m.time + 0.1;
      if (m.phase === 'playing') { this.computeIntercepts(); this.teamThink(0); this.teamThink(1); }
    }
    for (const p of m.players) {
      if (p.isHuman || p.scripted) continue;
      p.sprint = false;
      if (p.isGK) {
        if (m.phase === 'playing' || (m.ball.state === 'held' && m.ball.owner === p)) updateKeeper(m, p, dt, this.params(p.team));
        else this.nonPlayingMove(p);
        continue;
      }
      if (m.phase === 'playing') this.playing(p, dt);
      else this.nonPlayingMove(p);
    }
  }

  // ------------------------------------------------------------------ team
  computeIntercepts() {
    const m = this.m, ball = m.ball, tr = m.traj;
    this.intercepts.clear();
    if (ball.owner || ball.state === 'held' || ball.state === 'dead') return;
    const off = m.time - tr.t0;
    for (const p of m.players) {
      if (p.isGK || p.isHuman && false) { /* humans are included for team reasoning */ }
      let res = null;
      const react = p.isHuman ? 0.1 : this.params(p.team).reaction * 0.5;
      const busy = (p.action && (p.action.type === 'slide' || p.action.type === 'dive')) || m.time < p.downUntil ? 0.6 : 0;
      for (let t = 0; t <= 3.2; t += 0.08) {
        tr.at(t + off, tA);
        if (tA.y > 1.6) continue;
        const d = Math.max(0, Math.hypot(tA.x - p.pos.x, tA.z - p.pos.z) - 0.7);
        const need = d / p.sprintSpeed() + react + busy;
        if (need <= t) { res = { t, x: tA.x, z: tA.z }; break; }
      }
      if (!res) {
        tr.at(3.2 + off, tA);
        const d = Math.hypot(tA.x - p.pos.x, tA.z - p.pos.z);
        res = { t: 3.2 + d / p.sprintSpeed(), x: tA.x, z: tA.z };
      }
      this.intercepts.set(p, res);
    }
  }

  teamThink(team) {
    const m = this.m, ball = m.ball, ts = this.ts[team];
    const players = m.teams[team].players;
    const opps = m.teams[1 - team].players;
    const owner = ball.owner;
    if (!players.length) return;
    // phase with the possession
    if (owner && ball.state !== 'held') ts.phase = owner.team === team ? 'attack' : 'defend';
    else if (ball.state === 'held' && owner) ts.phase = owner.team === team ? 'attack' : 'defend';
    else ts.phase = 'loose';

    // opponent defensive line / deepest attacker in our normalised coords
    let lastDef = -1, deepest = 1;
    for (const o of opps) {
      if (o.isGK) continue;
      const u = m.uOf(team, o.pos.x);
      if (u > lastDef) lastDef = u;
      if (u < deepest) deepest = u;
    }
    ts.lastDefU = lastDef; ts.deepestOppU = deepest;

    // loose ball: best interceptor per team
    ts.chaser = null; ts.chaseT = 99;
    if (ts.phase === 'loose' && this.intercepts.size) {
      let best = null, bt = 99, humanT = 99, oppT = 99;
      for (const p of m.players) {
        const ic = this.intercepts.get(p);
        if (!ic) continue;
        if (p.team !== team) { if (!p.isGK && ic.t < oppT) oppT = ic.t; continue; }
        if (p.isHuman) { humanT = ic.t; continue; }
        if (p.isGK) continue;
        let t = ic.t;
        if (m.passIntent && m.passIntent.target === p) t -= 0.6;
        if (t < bt) { bt = t; best = p; }
      }
      // let the human go for it alone when clearly quicker
      if (best && !(humanT < bt - 0.45)) {
        ts.chaser = best; ts.chaseT = bt;
        const ic = this.intercepts.get(best);
        ts.chasePoint.set(ic.x, 0, ic.z);
      }
      const myBest = Math.min(bt, humanT);
      ts.winner = myBest < oppT - 0.15 ? team : oppT < myBest - 0.15 ? 1 - team : null;
    }

    // pressing: nearest suitable defender presses, the second covers
    ts.presser = null; ts.cover = null;
    if (ts.phase === 'defend' && owner) {
      const params = this.params(team);
      const goalX = m.ownGoalX(team);
      let b1 = null, c1 = 1e9, b2 = null, c2 = 1e9;
      for (const p of players) {
        if (p.isGK || p.isHuman) continue;
        const dist = p.pos.distXZ(owner.pos);
        m.toWorld(team, p.home.u, p.home.v, tA);
        const zone = tA.distXZ(owner.pos);
        const goalSide = (p.pos.x - owner.pos.x) * Math.sign(goalX - owner.pos.x) > -1 ? 0 : 3;
        const cost = dist + Math.max(0, zone - params.pressRange) * 0.9 + goalSide;
        if (cost < c1) { b2 = b1; c2 = c1; b1 = p; c1 = cost; }
        else if (cost < c2) { b2 = p; c2 = cost; }
      }
      const h = m.human;
      if (h && h.team === team && h.pos.distXZ(owner.pos) < 3 && b1) { ts.cover = b1; }
      else { ts.presser = b1; ts.cover = b2; }
    }

    // support and forward runs in possession
    ts.supporters = [];
    if (ts.phase === 'attack' && owner && owner.team === team && !owner.isGK) {
      const cands = players.filter((p) => p !== owner && !p.isGK && !p.isHuman)
        .sort((a, b) => a.pos.distXZ(owner.pos) - b.pos.distXZ(owner.pos));
      const taken = [];
      for (const p of cands.slice(0, 2)) {
        const spot = this.supportSpot(p, owner, taken);
        if (spot) { taken.push(spot); ts.supporters.push(p); p.ai.support = spot; }
      }
      // forward run into space behind the line
      const now = m.time;
      if (ts.runner && ts.runner.ai.run && ts.runner.ai.run.until < now) ts.runner = null;
      const ownerU = m.uOf(team, owner.pos.x);
      if (!ts.runner && ownerU > -0.45 && now > (ts.nextRun || 0)) {
        let pick = null, pu = -2;
        for (const p of players) {
          if (p === owner || p.isHuman || p.isGK || !['ST', 'W', 'AM'].includes(p.role)) continue;
          if (ts.supporters.includes(p)) continue;
          const u = m.uOf(team, p.pos.x);
          if (u > pu) { pu = u; pick = p; }
        }
        if (pick) {
          const u = Math.min(0.88, Math.max(lastDef + 0.1, m.uOf(team, pick.pos.x) + 0.2));
          const v = m.vOf(team, pick.pos.z) * 0.6;
          m.toWorld(team, u, v, tB);
          let crowd = 99;
          for (const o of opps) crowd = Math.min(crowd, o.pos.distXZ(tB));
          if (crowd > 3.5) {
            pick.ai.run = { until: now + 2.8, target: tB.clone() };
            ts.runner = pick;
            ts.nextRun = now + 4.5;
          }
        }
      }
    } else {
      ts.runner = null;
    }

    // marking assignments when defending
    ts.marks.clear();
    if (ts.phase === 'defend' || (ts.phase === 'loose' && ts.winner === 1 - team)) {
      const threats = opps.filter((o) => !o.isGK && o !== owner)
        .sort((a, b) => m.uOf(team, a.pos.x) - m.uOf(team, b.pos.x));
      const free = players.filter((p) => !p.isGK && !p.isHuman && p !== ts.presser && p !== ts.cover && p !== ts.chaser);
      const order = ['DEF', 'CM', 'AM', 'W', 'ST'];
      free.sort((a, b) => order.indexOf(a.role) - order.indexOf(b.role));
      const used = new Set();
      for (const p of free) {
        this.shapeTarget(p, tA);
        let best = null, bd = 13;
        for (const o of threats) {
          if (used.has(o)) continue;
          if (m.uOf(team, o.pos.x) > 0.35 && p.role === 'DEF') continue;
          const d = o.pos.distXZ(tA);
          if (d < bd) { bd = d; best = o; }
        }
        if (best) { used.add(best); ts.marks.set(p, best); }
      }
    }
  }

  supportSpot(p, carrier, taken) {
    const m = this.m, team = p.team;
    const att = m.attackDir(team);
    let best = null, bestS = -1e9;
    this.shapeTarget(p, tC);
    const fwdRole = p.role === 'ST' || p.role === 'W' || p.role === 'AM';
    for (const deg of [-140, -100, -65, -35, 0, 35, 65, 100, 140]) {
      const a = (deg * Math.PI) / 180;
      for (const r of [8, 12, 16]) {
        const x = carrier.pos.x + Math.cos(a) * r * att;
        const z = carrier.pos.z + Math.sin(a) * r;
        if (Math.abs(x) > PITCH.HL - 2 || Math.abs(z) > PITCH.HW - 1.5) continue;
        const open = laneOpenness(m, carrier.pos.x, carrier.pos.z, x, z, team, 12);
        let space = 99;
        for (const o of m.players) if (o.team !== team) space = Math.min(space, Math.hypot(o.pos.x - x, o.pos.z - z));
        let crowd = 0;
        for (const q of m.teams[team].players) {
          if (q === p || q === carrier) continue;
          const d = Math.hypot(q.pos.x - x, q.pos.z - z);
          if (d < 6) crowd += (6 - d) / 6;
        }
        for (const t of taken) { const d = Math.hypot(t.x - x, t.z - z); if (d < 7) crowd += (7 - d) / 5; }
        const fwd = ((x - carrier.pos.x) * att) / r;
        const home = Math.hypot(tC.x - x, tC.z - z);
        const s = open * 1.0 + Math.min(space, 8) / 8 * 0.8 + fwd * (fwdRole ? 0.45 : 0.25) - home * 0.035 - crowd * 0.6 - p.pos.distXZ(tA.set(x, 0, z)) * 0.015;
        if (s > bestS) { bestS = s; best = { x, z }; }
      }
    }
    return best ? new V3(best.x, 0, best.z) : null;
  }

  shapeTarget(p, out) {
    const m = this.m, team = m.teams[p.team], st = team.style;
    const ball = m.ball, ts = this.ts[p.team];
    const bu = m.uOf(p.team, ball.pos.x), bv = m.vOf(p.team, ball.pos.z);
    const attacking = ts.phase === 'attack' || (ts.phase === 'loose' && ts.winner === p.team);
    let u = p.home.u + bu * 0.42 + (st.line || 0);
    let v = p.home.v;
    if (attacking) u += p.role === 'DEF' ? 0.12 : 0.2;
    else u -= 0.06;
    v = v * (attacking ? 1.12 * (st.width || 1) : 0.8) + bv * (attacking ? 0.2 : 0.35);
    const b = ROLE_BOUNDS[p.role] || [-0.9, 0.9];
    u = clamp(u, b[0], b[1]);
    if (!attacking && (p.role === 'DEF' || p.role === 'CM')) u = Math.min(u, bu - (p.role === 'DEF' ? 0.1 : 0.02));
    if (p.role === 'DEF') u = Math.min(u, ts.deepestOppU - 0.03, attacking ? 0.3 : 0.1);
    u = clamp(u, -0.92, 0.92);
    v = clamp(v, -0.92, 0.92);
    return m.toWorld(p.team, u, v, out);
  }

  // ------------------------------------------------------------- players
  playing(p, dt) {
    const m = this.m, ball = m.ball, now = m.time, ts = this.ts[p.team], params = this.params(p.team);
    const ai = p.ai;
    p.faceYaw = null;
    if (now < p.downUntil) { p.desired.set(0, 0, 0); return; }
    if (p.action && (p.action.type === 'slide' || p.action.type === 'dive')) return;

    if (ball.owner === p) { this.carrier(p, dt); return; }

    // pass on its way to me: move to a reachable interception point
    const pi = m.passIntent;
    if (pi && pi.target === p && !ball.owner && now - pi.t < 4) {
      const ic = this.intercepts.get(p);
      const pt = ic && ic.t < 3 ? tA.set(ic.x, 0, ic.z) : tA.set(pi.point ? pi.point.x : ball.pos.x, 0, pi.point ? pi.point.z : ball.pos.z);
      this.moveTo(p, pt, true, 0.2);
      if (p.pos.distXZ(pt) < 1.2) p.faceYaw = yawOf(ball.pos.x - p.pos.x, ball.pos.z - p.pos.z);
      ai.state = 'receive';
      return;
    }

    if (ts.phase === 'loose') {
      if (ts.chaser === p) {
        ai.state = 'chase';
        this.moveTo(p, ts.chasePoint, true, 0.05);
        p.faceYaw = p.pos.distXZ(ts.chasePoint) < 1.5 ? yawOf(ball.pos.x - p.pos.x, ball.pos.z - p.pos.z) : null;
        return;
      }
      ai.state = 'shape';
      this.shapeTarget(p, tA);
      this.moveTo(p, tA, false, 0.6);
      this.faceBallIfClose(p, tA);
      return;
    }

    if (ts.phase === 'attack') {
      if (ai.run && ai.run.until > now && ts.runner === p) {
        ai.state = 'run';
        this.moveTo(p, ai.run.target, true, 0.3);
        return;
      }
      if (ts.supporters.includes(p) && ai.support) {
        ai.state = 'support';
        this.moveTo(p, ai.support, ai.support.distXZ(p.pos) > 10, 0.6);
        this.faceBallIfClose(p, ai.support);
        return;
      }
      ai.state = 'shape';
      this.shapeTarget(p, tA);
      this.moveTo(p, tA, p.pos.distXZ(tA) > 14, 0.8);
      this.faceBallIfClose(p, tA);
      return;
    }

    // defending
    const owner = ball.owner;
    if (ts.presser === p && owner) { this.press(p, owner, dt, params); return; }
    if (ts.cover === p && owner) {
      ai.state = 'cover';
      const gx = m.ownGoalX(p.team);
      const dx = gx - owner.pos.x, dz = -owner.pos.z;
      const d = Math.hypot(dx, dz) || 1;
      tA.set(owner.pos.x + dx / d * 5, 0, owner.pos.z + dz / d * 5);
      this.moveTo(p, tA, p.pos.distXZ(tA) > 6, 0.5);
      p.faceYaw = yawOf(owner.pos.x - p.pos.x, owner.pos.z - p.pos.z);
      return;
    }
    const mk = ts.marks.get(p);
    if (mk) {
      ai.state = 'mark';
      const gx = m.ownGoalX(p.team);
      let dx = gx - mk.pos.x, dz = -mk.pos.z;
      let d = Math.hypot(dx, dz) || 1;
      let bx = ball.pos.x - mk.pos.x, bz = ball.pos.z - mk.pos.z;
      const bd = Math.hypot(bx, bz) || 1;
      tA.set(mk.pos.x + dx / d * 1.6 + bx / bd * 0.9, 0, mk.pos.z + dz / d * 1.6 + bz / bd * 0.9);
      this.moveTo(p, tA, p.pos.distXZ(tA) > 5, 0.35);
      p.faceYaw = yawOf(ball.pos.x - p.pos.x, ball.pos.z - p.pos.z);
      // opportunistic interception of a nearby pass is handled by the loose-ball logic
      return;
    }
    ai.state = 'shape';
    this.shapeTarget(p, tA);
    this.moveTo(p, tA, p.pos.distXZ(tA) > 10, 0.7);
    this.faceBallIfClose(p, tA);
  }

  press(p, owner, dt, params) {
    const m = this.m, ball = m.ball, now = m.time, ai = p.ai;
    ai.state = 'press';
    const gx = m.ownGoalX(p.team);
    const dx = gx - owner.pos.x, dz = -owner.pos.z;
    const d = Math.hypot(dx, dz) || 1;
    const dist = p.pos.distXZ(owner.pos);
    // jockey goal-side of the ball, just outside tackling range, until committing
    const standOff = 1.3;
    const bpx = ball.pos.x + ball.vel.x * 0.2, bpz = ball.pos.z + ball.vel.z * 0.2;
    const gdx = gx - bpx, gdz = -bpz; const gd = Math.hypot(gdx, gdz) || 1;
    tA.set(bpx + gdx / gd * standOff, 0, bpz + gdz / gd * standOff);
    this.moveTo(p, tA, dist > 5, 0, true);
    p.faceYaw = yawOf(ball.pos.x - p.pos.x, ball.pos.z - p.pos.z);
    // challenge decisions happen at the AI's own reaction cadence
    if (now < (ai.nextChallenge || 0) || !canAct(m, p)) return;
    ai.nextChallenge = now + params.think * (0.8 + m.rng.next() * 0.5);
    if (m.phase !== 'playing' || now - (m.lastRestartAt || -10) < 0.8) return;
    const bd = ball.pos.distXZ(p.pos);
    if (bd < 1.45 && ball.pos.y < 0.5) {
      // prefer the exposed side of the ball
      const ox = ball.pos.x - owner.pos.x, oz = ball.pos.z - owner.pos.z;
      const tx = p.pos.x - ball.pos.x, tz = p.pos.z - ball.pos.z;
      const exp = (ox * tx + oz * tz) / ((Math.hypot(ox, oz) || 1) * (Math.hypot(tx, tz) || 1));
      if (exp > -0.2 && m.rng.next() < params.aggro * (0.7 + exp * 0.4)) startTackle(m, p);
    } else if (bd > 1.7 && bd < 3.0 && owner.speed > 3.5 && m.rng.next() < params.slideChance) {
      // slide only from the front or side of a running carrier
      const vx = owner.vel.x / owner.speed, vz = owner.vel.z / owner.speed;
      const fx = (p.pos.x - owner.pos.x) / dist, fz = (p.pos.z - owner.pos.z) / dist;
      if (vx * fx + vz * fz > -0.1) {
        p.yaw = yawOf(ball.pos.x + ball.vel.x * 0.25 - p.pos.x, ball.pos.z + ball.vel.z * 0.25 - p.pos.z);
        p.vel.set(Math.sin(p.yaw) * p.speed, 0, Math.cos(p.yaw) * p.speed);
        startSlide(m, p);
      }
    }
  }

  // ------------------------------------------------------------- carrier
  carrier(p, dt) {
    const m = this.m, ball = m.ball, now = m.time, ai = p.ai, params = this.params(p.team);
    const team = m.teams[p.team];
    if (p.action && p.action.type === 'kick') { return; }
    if (ai.ownedSince == null || ai.ownerEpoch !== m.possEpoch) {
      ai.ownerEpoch = m.possEpoch;
      ai.ownedSince = now;
      ai.nextDecision = now + params.reaction * (0.8 + m.rng.next() * 0.4);
      ai.dribbleTarget = null;
      this.pickDribble(p, 0);
    }
    const att = m.attackDir(p.team);
    // pressure
    let near = 99, nearOpp = null;
    for (const o of m.opponents(p.team)) { const d = o.pos.distXZ(p.pos); if (d < near) { near = d; nearOpp = o; } }
    // acknowledge a pass request from the human
    const h = m.human;
    if (h && h.team === p.team && h.requestUntil > now && h.ackedReq !== h.requestUntil) {
      p.ackUntil = now + 1.2;
      h.ackedReq = h.requestUntil;
      m.events.emit('ack', { player: p, to: h, t: now });
    }
    const urgent = near < 1.6 && now - ai.ownedSince > 0.2;
    const ballClose = ball.pos.distXZ(p.pos) < 1.3;
    if (ballClose && (now >= ai.nextDecision || (urgent && now >= (ai.urgentAt || 0)))) {
      ai.nextDecision = now + params.think * (0.8 + m.rng.next() * 0.45) * (2 - (team.style.tempo || 1));
      if (urgent) ai.urgentAt = now + 0.25;
      if (now - ai.ownedSince >= params.holdMin || urgent) {
        if (this.decide(p, near, nearOpp)) return;
      }
    }
    // keep dribbling toward the current target
    if (!ai.dribbleTarget || now > ai.dribbleUntil) this.pickDribble(p, near);
    const tgt = ai.dribbleTarget;
    let dx = tgt.x - p.pos.x, dz = tgt.z - p.pos.z;
    let d = Math.hypot(dx, dz) || 1;
    // the ball comes first: if it has run ahead or fallen behind the intended line,
    // go and get it before steering somewhere new
    const bx = ball.pos.x + ball.vel.x * 0.25 - p.pos.x, bz = ball.pos.z + ball.vel.z * 0.25 - p.pos.z;
    const bd = Math.hypot(bx, bz);
    const aheadOnLine = (bx * dx + bz * dz) / d;
    let sprint = ai.dribbleSprint && p.stamina > 0.25;
    if (bd > 1.25 || aheadOnLine < -0.1) {
      dx = bx; dz = bz; d = bd || 1;
      sprint = bd > 2.2 && p.stamina > 0.15;
    }
    const sp = p.maxSpeed(sprint, true) * (d < 1 ? 0.6 : 1);
    p.desired.set(dx / d * sp, 0, dz / d * sp);
    p.sprint = sprint;
    this.addSeparation(p, 0.4);
  }

  pickDribble(p, near) {
    const m = this.m, ai = p.ai, now = m.time;
    const att = m.attackDir(p.team);
    const goalX = att * PITCH.HL;
    // best open direction among a fan pointing forward
    let best = null, bs = -1e9, bestSpace = 0;
    for (const deg of [-75, -45, -20, 0, 20, 45, 75, 130, -130]) {
      const a = (deg * Math.PI) / 180;
      const dx = Math.cos(a) * att, dz = Math.sin(a);
      const x = p.pos.x + dx * 6, z = p.pos.z + dz * 6;
      if (Math.abs(x) > PITCH.HL - 1.5 || Math.abs(z) > PITCH.HW - 1.2) continue;
      let space = 12;
      for (const o of m.opponents(p.team)) {
        const ox = o.pos.x - p.pos.x, oz = o.pos.z - p.pos.z;
        const along = ox * dx + oz * dz;
        const perp = Math.abs(ox * dz - oz * dx);
        if (along > -0.5 && perp < 2.5 + along * 0.3) space = Math.min(space, Math.max(0, along));
      }
      let s = space * 0.1 + Math.cos(a) * 0.5;
      // wingers go down the line, others toward goal
      if (p.role === 'W' && Math.abs(p.pos.z) > 10) s += Math.abs(deg) < 25 ? 0.2 : 0;
      else s += -Math.abs(z) * 0.01 + (Math.abs(x - goalX) < 16 ? -Math.abs(z) * 0.03 : 0);
      if (s > bs) { bs = s; best = { x, z }; bestSpace = space; }
    }
    if (!best) best = { x: p.pos.x - att * 3, z: p.pos.z * 0.8 };
    ai.dribbleTarget = new V3(best.x, 0, best.z);
    ai.dribbleUntil = now + 0.45;
    ai.dribbleSprint = bestSpace > 7 && m.uOf(p.team, p.pos.x) > -0.3;
  }

  decide(p, near, nearOpp) {
    const m = this.m, ball = m.ball, now = m.time, params = this.params(p.team), ai = p.ai;
    const team = m.teams[p.team], st = team.style;
    const att = m.attackDir(p.team);
    const goalX = att * PITCH.HL;
    const u = m.uOf(p.team, p.pos.x);
    const vAbs = Math.abs(m.vOf(p.team, p.pos.z));
    const pressure = clamp((3 - near) / 3, 0, 1);
    const rng = m.rng;
    let best = { kind: 'dribble', s: 0.2 + (st.dribble || 0) + (p.role === 'W' ? 0.08 : 0) - pressure * 0.35 };
    // space ahead for dribbling
    let spaceF = 12;
    for (const o of m.opponents(p.team)) {
      const ox = (o.pos.x - p.pos.x) * att, oz = o.pos.z - p.pos.z;
      if (ox > 0 && Math.abs(oz) < ox * 0.9 + 1.5) spaceF = Math.min(spaceF, Math.hypot(ox, oz));
    }
    best.s += Math.min(spaceF, 12) * 0.035;
    best.s += rng.gauss() * params.noise;

    // shooting
    const dGoal = Math.hypot(goalX - p.pos.x, p.pos.z);
    if (dGoal < 27) {
      const ang = goalAngle(p.pos.x, p.pos.z, att);
      let blockers = 0;
      for (const o of m.opponents(p.team)) {
        if (o.isGK) continue;
        const r = pointSegDistXZ(o.pos.x, o.pos.z, p.pos.x, p.pos.z, goalX, clamp(p.pos.z * 0.2, -2, 2));
        if (r.t > 0.05 && r.t < 0.95 && r.d < 1.0 + r.t * 1.5) blockers++;
      }
      const q = clamp(ang / 0.5, 0, 1) * clamp((28 - dGoal) / 19, 0, 1) * Math.max(0, 1 - 0.32 * blockers);
      const s = q * 1.55 + (dGoal < 12 ? 0.25 : 0) - 0.12 + params.shootBias + rng.gauss() * params.noise;
      if (s > best.s) best = { kind: 'shot', s };
    }

    // passing options
    const h = m.human;
    for (const t of m.teams[p.team].players) {
      if (t === p || now < t.downUntil) continue;
      if (t.isGK && !(u < -0.4 && pressure > 0.5)) continue;
      leadPoint(p.pos, t, tA, 0.75);
      const d = p.pos.distXZ(tA);
      if (d < 4 || d > 38) continue;
      // never play a ball across the face of our own goal (keeper excepted)
      const ogx = m.ownGoalX(p.team);
      if (!t.isGK && Math.abs(tA.x - ogx) < 7 && Math.abs(tA.z) < 9) continue;
      if (t.isGK && Math.abs(p.pos.z) < 6 && Math.abs(p.pos.x - ogx) < 14) continue;
      const open = laneOpenness(m, p.pos.x, p.pos.z, tA.x, tA.z, p.team, 12);
      let space = 10;
      for (const o of m.opponents(p.team)) space = Math.min(space, o.pos.distXZ(tA));
      const progress = (tA.x - p.pos.x) * att;
      let s = 0.2 + open * 0.55 + space * 0.045 + progress * 0.028 * (1 - (st.passShort || 0) * 0.6) - Math.abs(d - 14) * 0.008 * (1 + (st.passShort || 0));
      if (t.isHuman) {
        s += params.humanBonus;
        if (t.requestUntil > now) s += open > 0.55 ? 0.7 : -0.2; // honour requests only when the lane is open
      }
      if (t === ai.receivedFrom && now - ai.ownedSince < 2.5 && pressure < 0.4) s -= 0.3;
      if (progress < -4 && pressure < 0.3) s -= 0.12;
      if (open < 0.35) continue;
      s += rng.gauss() * params.noise;
      if (s > best.s) best = { kind: 'pass', s, target: t };
      // through ball for runners
      if (t.ai.run && t.ai.run.until > now || (t.isHuman && t.speed > 4 && t.vel.x * att > 2)) {
        const ts2 = 0.45 + open * 0.3 + Math.max(0, progress) * 0.02 + (t.isHuman ? params.humanBonus * 0.7 : 0) + rng.gauss() * params.noise;
        if (ts2 > best.s && m.uOf(p.team, t.pos.x) > 0.1) best = { kind: 'through', s: ts2, target: t };
      }
    }

    // crossing from wide areas in the final third
    if (u > 0.5 && vAbs > 0.35) {
      let tgt = null, tbest = -1;
      for (const t of m.teams[p.team].players) {
        if (t === p || t.isGK) continue;
        if (!inOppBox(m, p.team, t.pos.x, t.pos.z)) continue;
        let space = 10;
        for (const o of m.opponents(p.team)) space = Math.min(space, o.pos.distXZ(t.pos));
        if (space > tbest) { tbest = space; tgt = t; }
      }
      if (tgt) {
        const s = 0.35 + (st.cross || 0) + tbest * 0.05 + (u > 0.75 ? 0.15 : 0) + rng.gauss() * params.noise;
        if (s > best.s) best = { kind: 'cross', s, target: tgt };
      }
    }

    // clearance under pressure deep in our half
    if (u < -0.55 && pressure > 0.45 && best.s < 0.55) best = { kind: 'clear', s: 0.6 };

    switch (best.kind) {
      case 'shot': {
        const gk = m.keeper(1 - p.team);
        let side = Math.sign(p.pos.z) * -1 || 1;
        if (gk) side = gk.pos.z > 0 ? -1 : 1;
        if (rng.next() < 0.25) side = -side;
        const z = side * (GOAL.HW - 0.45 - rng.next() * 0.55);
        const y = 0.25 + rng.next() * 1.2;
        startKick(m, p, 'shot', { point: new V3(goalX, y, z), power: 0.72 + rng.next() * 0.28, ai: true });
        return true;
      }
      case 'pass':
        startKick(m, p, 'pass', { target: best.target, ai: true });
        best.target.ai.receivedFrom = p;
        return true;
      case 'through':
        startKick(m, p, 'through', { target: best.target, ai: true });
        return true;
      case 'cross': {
        const t = best.target;
        const pt = new V3(t.pos.x + t.vel.x * 0.8, 0, t.pos.z + t.vel.z * 0.8);
        startKick(m, p, 'cross', { point: pt, target: t, ai: true });
        return true;
      }
      case 'clear': {
        const pt = new V3(att * 10 + p.pos.x * 0.2, 0, Math.sign(p.pos.z || 1) * 14);
        startKick(m, p, 'clear', { point: pt, ai: true });
        return true;
      }
      default:
        this.pickDribble(p, near);
        return false;
    }
  }

  // --------------------------------------------------------- restarts
  restartTarget(p, r, snap = false, out = new V3()) {
    const m = this.m;
    const team = p.team;
    const gs = m.attackDir(team);
    const spot = r.spot;
    const taking = r.team === team;
    if (p === r.taker) {
      return out.copy(spot).addScaled(new V3(-gs, 0, 0), 0.7);
    }
    if (p.isGK) {
      const gx = m.ownGoalX(team);
      if (r.type === 'penalty' && !taking) return out.set(gx + gs * 0.1, 0, 0);
      return out.set(gx + gs * (r.type === 'kickoff' ? 1.2 : 1.5), 0, 0);
    }
    let u = p.home.u, v = p.home.v;
    switch (r.type) {
      case 'kickoff': {
        u = Math.min(u * 0.85 - 0.05, -0.05);
        m.toWorld(team, u, v, out);
        if (taking && p.role === (r.taker && r.taker.role === 'ST' ? 'AM' : 'CM')) out.set(-gs * 3.5, 0, 1.8);
        const dc = Math.hypot(out.x, out.z);
        if (!taking && dc < AREA.CIRCLE_R + 0.6) { const k = (AREA.CIRCLE_R + 0.8) / (dc || 1); out.x *= k; out.z *= k; if (Math.abs(out.x) < 0.5) out.x = -gs * (AREA.CIRCLE_R + 0.8); }
        return out;
      }
      case 'penalty': {
        const box = spot.x > 0 ? 1 : -1;
        const edge = box * (PITCH.HL - AREA.PEN_D - 1.8);
        const idx = m.players.indexOf(p);
        return out.set(edge - box * (idx % 2) * 2.5, 0, ((idx % 7) - 3) * 3.2);
      }
      case 'corner': {
        const box = spot.x > 0 ? 1 : -1;
        if (taking) {
          const roles = { ST: [2, 0.8], AM: [5.5, -1.5], W: [4, 3.5], CM: [11, 0], DEF: [22, 4] };
          const rr = roles[p.role] || [8, 0];
          const zSide = Math.sign(spot.z);
          out.set(box * (PITCH.HL - rr[0]), 0, rr[1] * -zSide + (p.side || 0) * 1.5);
          if (p.role === 'DEF' && p.home.v < 0) out.z = -out.z;
          return clampInPitch(out, 1);
        }
        // defenders in the box, marking space
        const roles = { DEF: [1.8, 1.2], CM: [4.5, -1.2], AM: [9, 2], W: [6, 4], ST: [14, 0] };
        const rr = roles[p.role] || [5, 0];
        out.set(box * (PITCH.HL - rr[0]), 0, rr[1] * (p.home.v >= 0 ? 1 : -1));
        return clampInPitch(out, 1);
      }
      case 'goalkick': {
        if (taking) { m.toWorld(team, Math.min(u, -0.2) + 0.05, v * 1.1, out); }
        else {
          m.toWorld(team, Math.max(u, -0.1) + 0.2, v, out);
          const gx = spot.x > 0 ? PITCH.HL : -PITCH.HL;
          if (Math.abs(out.x - gx) < AREA.PEN_D + 1 && Math.abs(out.z) < AREA.PEN_HW + 1) out.x = gx - Math.sign(gx) * (AREA.PEN_D + 1.5);
        }
        return out;
      }
      default: {
        // throw-ins and free kicks: current shape around the ball, keeping legal distance
        this.shapeTarget(p, out);
        if (taking) {
          // offer short options near the ball
          const d = out.distXZ(spot);
          if (d > 18 && (p.role === 'CM' || p.role === 'W' || p.role === 'AM')) out.lerp(spot, 0.35);
        } else if (r.type === 'freekick') {
          const gx = m.ownGoalX(team);
          const dg = Math.hypot(spot.x - gx, spot.z);
          if (dg < 26 && (p.role === 'DEF' || p.role === 'CM') && p.home.v !== undefined) {
            // two-player wall on the line to goal
            const dx = gx - spot.x, dz = -spot.z; const l = Math.hypot(dx, dz) || 1;
            const side = p.home.v >= 0 ? 1 : -1;
            out.set(spot.x + dx / l * (RULES.RESTART_DIST + 0.3) - dz / l * 0.38 * side, 0, spot.z + dz / l * (RULES.RESTART_DIST + 0.3) + dx / l * 0.38 * side);
          }
        }
        if (!taking) {
          const R = r.type === 'throwin' ? RULES.THROW_DIST : RULES.RESTART_DIST;
          const d = out.distXZ(spot);
          if (d < R + 0.4) {
            const dx = out.x - spot.x, dz = out.z - spot.z; const l = Math.hypot(dx, dz) || 1;
            out.set(spot.x + dx / l * (R + 0.6), 0, spot.z + dz / l * (R + 0.6));
          }
        }
        return clampInPitch(out, 0.8);
      }
    }
  }

  enforceDistances(r) {
    const m = this.m;
    for (const p of m.players) {
      if (p.team === r.team || p.isHuman) continue;
      const R = r.type === 'throwin' ? RULES.THROW_DIST : r.type === 'kickoff' ? AREA.CIRCLE_R : RULES.RESTART_DIST;
      const d = p.pos.distXZ(r.spot);
      if (d < R) {
        const t = this.restartTarget(p, r);
        p.pos.copy(t); p.prevPos.copy(t); p.vel.set(0, 0, 0);
      }
    }
  }

  nonPlayingMove(p) {
    const m = this.m, now = m.time;
    p.faceYaw = null;
    if (m.phase === 'restart' && m.restart) {
      const r = m.restart;
      if (p === r.taker && r.placed) {
        p.desired.set(0, 0, 0);
        return;
      }
      const t = this.restartTarget(p, r, false, tA);
      this.moveTo(p, t, p.pos.distXZ(t) > 8, 0.25);
      if (p.pos.distXZ(t) < 1) p.faceYaw = yawOf(m.ball.pos.x - p.pos.x, m.ball.pos.z - p.pos.z);
      return;
    }
    if (m.phase === 'goal') {
      if (p.celebrate > now) {
        const scorerTeam = m.lastGoalTeam;
        const cx = m.attackDir(scorerTeam) * (PITCH.HL - 4);
        const cz = Math.sign(m.ball.pos.z || 1) * (PITCH.HW - 3);
        tA.set(cx, 0, cz);
        this.moveTo(p, tA, true, 1.5);
        return;
      }
      this.shapeTarget(p, tA);
      tA.x *= 0.5;
      this.moveTo(p, tA, false, 1, false, 2.2);
      return;
    }
    if (m.phase === 'halftime' || m.phase === 'fulltime') {
      p.desired.set(0, 0, 0);
      return;
    }
    // stoppage: drift back into shape
    this.shapeTarget(p, tA);
    this.moveTo(p, tA, false, 1, false, 3);
  }

  takeRestart(p, r) {
    const m = this.m, rng = m.rng;
    const gs = m.attackDir(p.team);
    const goalX = gs * PITCH.HL;
    m.lastRestartAt = m.time;
    const bestPass = (maxD, minOpen = 0.45) => {
      let best = null, bs = -1e9;
      for (const t of m.teams[p.team].players) {
        if (t === p || t.isGK) continue;
        const d = t.pos.distXZ(r.spot);
        if (d > maxD || d < 3) continue;
        const open = laneOpenness(m, r.spot.x, r.spot.z, t.pos.x, t.pos.z, p.team, 11);
        if (open < minOpen) continue;
        const s = open + (t.pos.x - r.spot.x) * gs * 0.02 - d * 0.01 + (t.isHuman ? this.params(p.team).humanBonus + (t.requestUntil > m.time ? 0.6 : 0) : 0) + rng.next() * 0.2;
        if (s > bs) { bs = s; best = t; }
      }
      return best;
    };
    const faceTo = (x, z) => { p.yaw = yawOf(x - p.pos.x, z - p.pos.z); };
    switch (r.type) {
      case 'kickoff': {
        const t = bestPass(20, 0.2) || m.teams[p.team].players.find((q) => q !== p && !q.isGK);
        faceTo(t.pos.x, t.pos.z);
        startKick(m, p, 'pass', { target: t, restart: r, ai: true });
        break;
      }
      case 'throwin': {
        const t = bestPass(18, 0.35);
        if (t) { faceTo(t.pos.x, t.pos.z); startKick(m, p, 'throw', { target: t, restart: r, ai: true }); }
        else {
          const pt = new V3(r.spot.x + gs * 10, 0, r.spot.z * 0.5);
          faceTo(pt.x, pt.z); startKick(m, p, 'throw', { point: pt, restart: r, ai: true });
        }
        break;
      }
      case 'corner': {
        const box = [];
        for (const t of m.teams[p.team].players) if (t !== p && !t.isGK && inOppBox(m, p.team, t.pos.x, t.pos.z)) box.push(t);
        if (box.length && rng.next() < 0.75) {
          const t = box[Math.floor(rng.next() * box.length)];
          const pt = new V3(t.pos.x, 0, t.pos.z);
          faceTo(pt.x, pt.z); startKick(m, p, 'cross', { point: pt, target: t, restart: r, ai: true, elev: 0.45 });
        } else {
          const t = bestPass(14, 0.3) || box[0];
          if (t) { faceTo(t.pos.x, t.pos.z); startKick(m, p, 'pass', { target: t, restart: r, ai: true }); }
          else { const pt = new V3(goalX - gs * 7, 0, 0); faceTo(pt.x, pt.z); startKick(m, p, 'cross', { point: pt, restart: r, ai: true }); }
        }
        break;
      }
      case 'goalkick': {
        const t = bestPass(22, 0.7);
        if (t && rng.next() < 0.6) { faceTo(t.pos.x, t.pos.z); startKick(m, p, 'pass', { target: t, restart: r, ai: true }); }
        else {
          let tgt = null, bs = -1;
          for (const q of m.teams[p.team].players) {
            if (q === p || q.isGK) continue;
            let space = 10;
            for (const o of m.opponents(p.team)) space = Math.min(space, o.pos.distXZ(q.pos));
            const s = space + m.uOf(p.team, q.pos.x) * 4 + rng.next();
            if (s > bs) { bs = s; tgt = q; }
          }
          const pt = tgt ? new V3(tgt.pos.x, 0, tgt.pos.z) : new V3(0, 0, 0);
          faceTo(pt.x, pt.z); startKick(m, p, 'lob', { point: pt, target: tgt, restart: r, ai: true, elev: 0.5 });
        }
        break;
      }
      case 'penalty': {
        const side = rng.next() < 0.5 ? -1 : 1;
        const pt = new V3(goalX, 0.3 + rng.next() * 0.9, side * (1.2 + rng.next() * 0.9));
        faceTo(pt.x, pt.z);
        startKick(m, p, 'shot', { point: pt, power: 0.8 + rng.next() * 0.15, restart: r, ai: true });
        break;
      }
      default: {
        // free kick / drop ball
        const dGoal = Math.hypot(goalX - r.spot.x, r.spot.z);
        if (r.type === 'freekick' && dGoal < 24 && goalAngle(r.spot.x, r.spot.z, gs) > 0.22 && rng.next() < 0.45) {
          const side = rng.next() < 0.5 ? -1 : 1;
          const pt = new V3(goalX, 1.2 + rng.next() * 0.6, side * (1.4 + rng.next() * 0.9));
          faceTo(pt.x, pt.z);
          startKick(m, p, 'shot', { point: pt, power: 0.8 + rng.next() * 0.2, restart: r, ai: true });
        } else {
          const t = bestPass(26, 0.4) || bestPass(35, 0.1);
          if (t) { faceTo(t.pos.x, t.pos.z); startKick(m, p, 'pass', { target: t, restart: r, ai: true }); }
          else { const pt = new V3(r.spot.x + gs * 20, 0, r.spot.z * 0.5); faceTo(pt.x, pt.z); startKick(m, p, 'lob', { point: pt, restart: r, ai: true }); }
        }
      }
    }
  }

  // ---------------------------------------------------------- steering
  moveTo(p, target, sprint, arrive = 0.5, noSep = false, speedCap = Infinity) {
    const dx = target.x - p.pos.x, dz = target.z - p.pos.z;
    const d = Math.hypot(dx, dz);
    const ai = p.ai, now = this.m.time;
    // stuck recovery: if not getting closer, sidestep for a moment
    if (now > (ai.progressCheck || 0)) {
      if (d > 2.5 && ai.lastDist - d < 0.4 && p.speed < 1) ai.sidestepUntil = now + 0.7;
      ai.lastDist = d; ai.progressCheck = now + 1.2;
    }
    if (d < arrive) { p.desired.set(0, 0, 0); if (!noSep) this.addSeparation(p, 1); return; }
    const canSprint = sprint && (p.stamina > 0.2 || (this.ts[p.team].chaser === p));
    let s = Math.min(p.maxSpeed(canSprint, false), speedCap);
    if (d < 3) s *= Math.max(0.25, d / 3);
    let ux = dx / d, uz = dz / d;
    if (ai.sidestepUntil > now) { const t = ux; ux = ux * 0.5 - uz * 0.85; uz = uz * 0.5 + t * 0.85; }
    p.desired.set(ux * s, 0, uz * s);
    p.sprint = canSprint && d > 3;
    if (!noSep) this.addSeparation(p, 1);
  }

  addSeparation(p, k) {
    let sx = 0, sz = 0;
    const ball = this.m.ball;
    const nearBall = p.pos.distXZ(ball.pos) < 2.5;
    for (const q of this.m.players) {
      if (q === p) continue;
      const dx = p.pos.x - q.pos.x, dz = p.pos.z - q.pos.z;
      const d2 = dx * dx + dz * dz;
      if (d2 > 16 || d2 < 1e-6) continue;
      const d = Math.sqrt(d2);
      if (d < 1.4 && !nearBall) { const w = (1.4 - d) / 1.4 * 2.6; sx += dx / d * w; sz += dz / d * w; }
      else if (q.team === p.team && !nearBall) { const w = (4 - d) / 4 * 0.9; sx += dx / d * w; sz += dz / d * w; }
    }
    p.desired.x += sx * k; p.desired.z += sz * k;
  }

  faceBallIfClose(p, target) {
    if (p.pos.distXZ(target) < 1.5) {
      const b = this.m.ball.pos;
      p.faceYaw = yawOf(b.x - p.pos.x, b.z - p.pos.z);
    }
  }
}

function inOppBox(m, team, x, z) {
  const gx = m.attackDir(team) * PITCH.HL;
  return Math.sign(x) === Math.sign(gx) && Math.abs(x - gx) < AREA.PEN_D && Math.abs(z) < AREA.PEN_HW;
}
