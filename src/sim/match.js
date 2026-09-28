// Match lifecycle and rules: setup -> kickoff -> playing -> stoppage/goal ->
// restart -> halftime/full time. One authoritative place for possession changes,
// kicks, goals and restarts; everything is announced on the event bus.
import { V3, clamp, yawOf } from './vec.js';
import { DT, PITCH, GOAL, AREA, BALL_R, RULES, WORLD } from './constants.js';
import { EventBus } from './events.js';
import { Rng } from './rng.js';
import { Ball, Trajectory, stepBall } from './ball.js';
import { Player, movePlayer, separatePlayers, resetPlayerState } from './player.js';
import { updateAction, actionSpeedCap, startKick, PASS_KINDS } from './actions.js';
import { updateControl, bodyCollisions } from './control.js';
import { FORMATIONS, STYLES, formationFor } from './formations.js';
import { AIDirector, aiParamsFor } from './ai.js';
import { keeperHandles, keeperContact } from './keeper.js';
import { MatchStats } from './stats.js';

export const DIFFICULTY = {
  assisted: { label: 'Assisted', passError: 0.55, shotError: 0.72, shotAim: 1.0, touch: 0.6, tackle: 0.06, oppReact: 1.22, oppAggro: 0.75, oppNoise: 0.04 },
  standard: { label: 'Standard', passError: 0.8, shotError: 0.9, shotAim: 0.6, touch: 0.8, tackle: 0.02, oppReact: 1.0, oppAggro: 1.0, oppNoise: 0 },
  expert: { label: 'Expert', passError: 1.0, shotError: 1.0, shotAim: 0.3, touch: 1.0, tackle: 0, oppReact: 0.86, oppAggro: 1.2, oppNoise: -0.02 },
};

export class Match {
  constructor(cfg) {
    this.cfg = cfg;
    this.mode = cfg.mode || 'match';
    this.events = new EventBus();
    this.rng = new Rng(cfg.seed || 12345);
    this.ball = new Ball();
    this.traj = new Trajectory(200, 1 / 60);
    this.trajVersion = -1;
    this.players = [];
    this.time = 0;
    this.clock = 0;
    this.half = 1;
    this.halfLength = cfg.halfLength || 180;
    this.phase = 'setup';
    this.phaseT = 0;
    this.restart = null;
    this.pendingRestart = null;
    this.possTeam = null;
    this.skipRequested = false;
    this.kickoffTeam = 0;
    this.nextKickId = 1;
    this.passIntent = null;
    this.lastProgress = 0;
    this.snapCount = 0;
    this.rules = cfg.rules !== false;
    this.difficulty = cfg.difficulty || 'assisted';
    this.assist = DIFFICULTY[this.difficulty] || DIFFICULTY.assisted;
    this.human = null;
    this.humanCtl = null;
    this.teams = [];
    this.ballHooks = {
      onBounce: (b, v) => this.events.emit('bounce', { speed: v, t: this.time }),
      onFrame: (b, v, what) => this.events.emit('frame', { what, speed: v, t: this.time }),
      bodies: (b, h) => bodyCollisions(this, b, h),
    };
    this.buildTeams(cfg);
    this.aiParams = [aiParamsFor(this, 0), aiParamsFor(this, 1)];
    this.ai = new AIDirector(this);
    this.stats = new MatchStats(this);
  }

  buildTeams(cfg) {
    for (let ti = 0; ti < 2; ti++) {
      const tc = cfg.teams[ti];
      if (!tc) { this.teams.push({ index: ti, attack: ti === 0 ? 1 : -1, score: 0, players: [], name: 'None', style: STYLES.wing, empty: true }); continue; }
      const humanRole = tc.players.find((p) => p.isHuman)?.role || null;
      const formationName = tc.formation || formationFor(tc.style, humanRole);
      const team = {
        index: ti, attack: ti === 0 ? 1 : -1, score: 0, players: [],
        name: tc.name, short: tc.short || tc.name.slice(0, 3).toUpperCase(),
        kit: tc.kit, styleName: tc.style || 'wing', style: STYLES[tc.style] || STYLES.wing,
        tier: tc.tier || 1, formationName, formation: FORMATIONS[formationName],
        clubId: tc.clubId,
      };
      this.teams.push(team);
      // assign formation slots
      const slots = team.formation.map((s, i) => ({ ...s, i, used: false }));
      const ordered = [...tc.players].sort((a, b) => (b.isHuman ? 1 : 0) - (a.isHuman ? 1 : 0));
      for (const pc of ordered) {
        let slot = slots.find((s) => !s.used && s.role === pc.role);
        if (!slot) slot = slots.find((s) => !s.used && s.role !== 'GK' && pc.role !== 'GK') || slots.find((s) => !s.used);
        if (!slot) continue;
        slot.used = true;
        const p = new Player({
          team: ti, slot: slot.i, role: slot.role, number: pc.number, name: pc.name,
          isHuman: pc.isHuman, attrs: pc.attrs, keeping: pc.keeping, foot: pc.foot, look: pc.look,
        });
        p.home = { u: slot.u, v: slot.v };
        team.players.push(p);
        this.players.push(p);
        if (p.isHuman) this.human = p;
      }
      team.players.sort((a, b) => a.slot - b.slot);
    }
    this.players.sort((a, b) => a.id - b.id);
  }

  attackDir(team) { return this.teams[team].attack; }
  ownGoalX(team) { return -this.teams[team].attack * PITCH.HL; }
  teamOf(p) { return this.teams[p.team]; }
  opponents(team) { return this.teams[1 - team].players; }
  keeper(team) { return this.teams[team].players.find((p) => p.isGK) || null; }
  get scoreline() { return [this.teams[0].score, this.teams[1].score]; }

  // world position from team-normalised (u, v)
  toWorld(team, u, v, out) {
    const a = this.teams[team].attack;
    return out.set(u * PITCH.HL * a, 0, -v * PITCH.HW * a);
  }
  // team-normalised u of a world x
  uOf(team, x) { return (x / PITCH.HL) * this.teams[team].attack; }
  vOf(team, z) { return (-z / PITCH.HW) * this.teams[team].attack; }

  keeperHandles(gk, ball) { return keeperHandles(this, gk, ball); }
  keeperContact(gk, ball) { return keeperContact(this, gk, ball); }

  start(kickoffTeam = null) {
    this.kickoffTeam = kickoffTeam ?? (this.rng.next() < 0.5 ? 0 : 1);
    this.events.emit('matchStart', { t: 0 });
    this.setupRestart({ type: 'kickoff', team: this.kickoffTeam, spot: new V3(0, 0, 0) });
  }

  // ---------------------------------------------------------------------
  step(dt = DT) {
    this.time += dt;
    this.phaseT += dt;
    const ball = this.ball;

    if (this.humanCtl) this.humanCtl.update(dt);
    this.ai.update(dt);
    if (this.preStep) this.preStep(dt);

    for (const p of this.players) updateAction(this, p, dt);
    for (const p of this.players) {
      let cap = actionSpeedCap(p);
      if (this.phase === 'restart' && this.restart && this.restart.taker === p && this.restart.placed) cap = 0;
      if (p.celebrate > this.time) cap = Math.min(cap, 6.5);
      movePlayer(p, dt, this.time, cap, ball.owner === p);
    }
    separatePlayers(this.players);
    for (const p of this.players) {
      p.pos.x = clamp(p.pos.x, -WORLD.HL + 1, WORLD.HL - 1);
      p.pos.z = clamp(p.pos.z, -WORLD.HW + 1, WORLD.HW - 1);
    }

    if (ball.state === 'held' && ball.owner) this.positionHeldBall(ball.owner);
    else if (ball.state === 'dead' && this.restart && this.restart.handsBall && this.restart.taker) this.positionThrowBall(this.restart.taker);
    stepBall(ball, dt, this.ballHooks);
    if (ball.version !== this.trajVersion || this.time - this.traj.t0 > 0.12) {
      this.traj.compute(ball, this.time);
      this.trajVersion = ball.version;
    }

    if (this.phase === 'playing') updateControl(this, dt);
    this.stats.update(dt);
    this.updatePhase(dt);
  }

  positionHeldBall(gk) {
    const b = this.ball;
    const f = gk.hold === 'throw' ? -0.05 : 0.32;
    const y = gk.hold === 'throw' ? 2.05 : 1.05;
    b.pos.set(gk.pos.x + Math.sin(gk.yaw) * f, y, gk.pos.z + Math.cos(gk.yaw) * f);
    b.vel.set(0, 0, 0);
  }
  positionThrowBall(p) {
    const b = this.ball;
    b.pos.set(p.pos.x + Math.sin(p.yaw) * -0.05, 2.08, p.pos.z + Math.cos(p.yaw) * -0.05);
    b.vel.set(0, 0, 0);
  }

  // ---------------------------------------------------------------------
  updatePhase(dt) {
    switch (this.phase) {
      case 'playing': {
        this.clock += dt;
        if (this.rules) this.checkBall();
        if (this.phase !== 'playing') break;
        this.checkDeadlock();
        if (this.rules && this.clock >= this.halfLength * this.half && !this.shotInFlight()) this.endHalf();
        break;
      }
      case 'stoppage':
        if (this.phaseT > (this.stoppageDelay || 0.8)) this.setupRestart(this.pendingRestart);
        break;
      case 'restart':
        this.updateRestart(dt);
        break;
      case 'goal':
        if (this.phaseT > 2.8 || (this.skipRequested && this.phaseT > 0.6)) {
          this.skipRequested = false;
          const conceding = 1 - this.lastGoalTeam;
          this.setupRestart({ type: 'kickoff', team: conceding, spot: new V3(0, 0, 0) });
        }
        break;
      case 'halftime':
        if (this.phaseT > 3.2 || (this.skipRequested && this.phaseT > 0.5)) {
          this.skipRequested = false;
          this.startSecondHalf();
        }
        break;
      default: break;
    }
  }

  shotInFlight() {
    const k = this.ball.lastKick;
    if (!k || k.kind !== 'shot') return false;
    if (this.time - k.t > 2.5) return false;
    const gs = this.attackDir(k.team);
    return this.ball.vel.x * gs > 3 && !this.ball.owner;
  }

  checkBall() {
    const b = this.ball;
    if (b.state === 'held' || b.state === 'dead') return;
    const p = b.pos;
    for (let gi = 0; gi < 2; gi++) {
      const s = gi === 0 ? 1 : -1;
      if (p.x * s - BALL_R > PITCH.HL) {
        const cr = b.crossing[gi];
        if (cr && cr.inMouth && Math.abs(p.z) < GOAL.HW && p.y < GOAL.H) {
          const scoring = this.teams[0].attack === s ? 0 : 1;
          this.goal(scoring);
        } else {
          this.outOverGoalLine(s);
        }
        return;
      }
    }
    if (Math.abs(p.z) - BALL_R > PITCH.HW) {
      const lt = b.lastTouch;
      const team = lt ? 1 - lt.team : (this.possTeam != null ? 1 - this.possTeam : 0);
      const spot = new V3(clamp(p.x, -PITCH.HL + 1, PITCH.HL - 1), 0, Math.sign(p.z) * PITCH.HW);
      this.ballOut('throwin', team, spot);
      return;
    }
    // left the world entirely (should not happen): fair restart from the nearest line
    if (Math.abs(p.x) > WORLD.HL - 0.5 || Math.abs(p.z) > WORLD.HW - 0.5) {
      const lt = b.lastTouch;
      const team = lt ? 1 - lt.team : 0;
      const spot = new V3(clamp(p.x, -PITCH.HL + 1, PITCH.HL - 1), 0, clamp(p.z, -PITCH.HW, PITCH.HW));
      this.ballOut('throwin', team, spot);
    }
  }

  outOverGoalLine(s) {
    const b = this.ball;
    const defending = this.teams[0].attack === -s ? 0 : 1; // team whose goal is at side s
    const attacking = 1 - defending;
    const lt = b.lastTouch;
    if (lt && lt.team === defending) {
      const spot = new V3(s * (PITCH.HL - 0.4), 0, Math.sign(b.pos.z || 1) * (PITCH.HW - 0.4));
      this.ballOut('corner', attacking, spot);
    } else {
      const spot = new V3(s * (PITCH.HL - AREA.GOAL_D * 0.5), 0, clamp(b.pos.z * 0.3, -2.5, 2.5));
      this.ballOut('goalkick', defending, spot);
    }
  }

  ballOut(type, team, spot) {
    const b = this.ball;
    const lt = b.lastTouch;
    this.events.emit('out', { restart: type, team, lastTouch: lt, controller: b.owner, t: this.time, pos: b.pos.clone() });
    if (b.owner) { b.owner = null; }
    b.state = 'free';
    this.phase = 'stoppage';
    this.phaseT = 0;
    this.stoppageDelay = 0.75;
    this.pendingRestart = { type, team, spot };
  }

  goal(scoring) {
    if (this.phase !== 'playing') return;
    const b = this.ball;
    const lt = b.lastTouch;
    let scorer = null, ownGoal = false, ownGoalBy = null;
    const k = b.lastKick;
    if (lt && lt.team === scoring) scorer = lt;
    else if (k && k.team === scoring && k.kind === 'shot' && k.onTarget && this.time - k.t < 4) scorer = k.player;
    else if (lt) { ownGoal = true; ownGoalBy = lt; }
    this.teams[scoring].score++;
    this.lastGoalTeam = scoring;
    if (b.owner) b.owner = null;
    b.state = 'free';
    this.phase = 'goal';
    this.phaseT = 0;
    this.skipRequested = false;
    if (scorer) { scorer.celebrate = this.time + 2.8; scorer.action = { type: 'celebrate', t: 0, dur: 2.8 }; }
    for (const p of this.teams[scoring].players) if (p !== scorer) p.celebrate = this.time + 2.8;
    this.events.emit('goal', {
      team: scoring, scorer, ownGoal, ownGoalBy, t: this.time, clock: this.clock,
      score: this.scoreline, pos: b.pos.clone(),
    });
  }

  foul(fouler, victim, slide) {
    if (this.phase !== 'playing') return;
    const now = this.time;
    victim.downUntil = now + 1.1;
    victim.action = { type: 'stumble', t: 0, dur: 1.1, fall: true };
    const spot = victim.pos.clone();
    spot.x = clamp(spot.x, -PITCH.HL + 0.5, PITCH.HL - 0.5);
    spot.z = clamp(spot.z, -PITCH.HW + 0.5, PITCH.HW - 0.5);
    const fg = this.ownGoalX(fouler.team);
    const inBox = Math.abs(spot.x - fg) < AREA.PEN_D && Math.abs(spot.z) < AREA.PEN_HW && Math.sign(spot.x) === Math.sign(fg);
    const type = inBox ? 'penalty' : 'freekick';
    if (inBox) spot.set(Math.sign(fg) * (PITCH.HL - AREA.SPOT), 0, 0);
    this.events.emit('foul', { player: fouler, victim, slide, penalty: inBox, t: now, pos: victim.pos.clone() });
    if (this.ball.owner) this.ball.owner = null;
    this.ball.state = 'free';
    this.phase = 'stoppage';
    this.phaseT = 0;
    this.stoppageDelay = 1.1;
    this.pendingRestart = { type, team: victim.team, spot, victim };
  }

  dislodge(owner, tackler, vel, slide = false) {
    const b = this.ball;
    b.owner = null;
    b.state = 'free';
    b.setVelocity(vel);
    b.lastTouch = tackler; b.lastTouchTime = this.time;
    owner.noCaptureUntil = this.time + 0.45;
    owner.stumbleUntil = Math.max(owner.stumbleUntil, this.time + 0.3);
    this.events.emit('tackle', { player: tackler, victim: owner, success: true, slide, t: this.time });
  }

  touchBall(p, kind) {
    this.ball.lastTouch = p;
    this.ball.lastTouchTime = this.time;
    this.events.emit('touch', { player: p, kind, strength: this.ball.speed, t: this.time });
  }

  gainControl(p) {
    const b = this.ball;
    const prev = b.owner;
    const k = b.lastKick;
    let cause = 'loose';
    if (prev && prev.team !== p.team) cause = 'steal';
    else if (k && PASS_KINDS.has(k.kind) && this.time - k.t < 8 && k.player !== p) cause = k.team === p.team ? 'receive' : 'interception';
    b.owner = p;
    b.state = 'controlled';
    b.lastTouch = p; b.lastTouchTime = this.time;
    this.possTeam = p.team;
    this.possEpoch = (this.possEpoch || 0) + 1;
    this.lastProgress = this.time;
    if (prev) prev.noCaptureUntil = this.time + 0.35;
    if (this.passIntent && this.passIntent.target === p) this.passIntent = null;
    this.events.emit('possession', { player: p, team: p.team, prev, cause, t: this.time });
  }

  loseControl(reason) {
    const b = this.ball;
    const o = b.owner;
    if (!o) return;
    b.owner = null;
    b.state = b.pos.y > BALL_R + 0.05 ? 'air' : 'free';
    this.events.emit('release', { player: o, reason, t: this.time });
  }

  applyKick(p, vel, a, info) {
    const b = this.ball;
    b.owner = null;
    b.setVelocity(vel);
    b.state = vel.y > 0.8 || b.pos.y > BALL_R + 0.1 ? 'air' : 'free';
    b.lastTouch = p; b.lastTouchTime = this.time;
    p.noCaptureUntil = this.time + RULES.KICK_RELEASE_LOCK;
    p.lastKickAt = this.time;
    p.hold = null;
    p.touch = { foot: a.foot, time: this.time, x: b.pos.x, y: b.pos.y, z: b.pos.z, kind: a.kind === 'shot' ? 'shot' : 'kick' };
    const restartType = a.restart ? a.restart.type : null;
    const e = this.events.emit('kick', {
      player: p, team: p.team, kind: a.kind, target: info.target || null, point: info.point || null,
      onTarget: !!info.onTarget, speed: vel.len(), t: this.time, restart: restartType,
      firstTime: a.firstTime, pos: b.pos.clone(), kickId: this.nextKickId++,
    });
    b.lastKick = e;
    this.lastProgress = this.time;
    if (info.target && PASS_KINDS.has(a.kind)) this.passIntent = { target: info.target, point: info.point, t: this.time, from: p };
    else this.passIntent = a.kind === 'shot' ? null : this.passIntent;
    if (a.restart && this.phase === 'restart') {
      this.phase = 'playing';
      this.phaseT = 0;
      this.restart = null;
      for (const q of this.players) q.hold = null;
    }
  }

  // ---------------------------------------------------------------------
  setupRestart(r) {
    const b = this.ball;
    this.phase = 'restart';
    this.phaseT = 0;
    this.skipRequested = false;
    this.passIntent = null;
    this.events.emit('restartSetup', { restart: r.type, team: r.team, t: this.time });
    const spot = r.spot.clone();
    const taker = this.chooseTaker(r);
    this.restart = {
      type: r.type, team: r.team, spot, taker, placed: false, victim: r.victim || null,
      readyAt: { kickoff: 1.1, throwin: 0.9, corner: 1.3, goalkick: 1.2, freekick: 1.3, penalty: 1.8, dropball: 0.6 }[r.type] || 1.2,
      handsBall: r.type === 'throwin', humanTaker: taker && taker.isHuman, decided: false,
    };
    b.owner = null;
    b.place(spot.x, spot.z);
    b.state = 'dead';
    b.lastKick = null;
    for (const p of this.players) {
      if (p.action && p.action.type !== 'celebrate') p.action = null;
      p.faceYaw = null;
      p.hold = null;
    }
    if (r.type === 'kickoff' || r.type === 'penalty') {
      this.snapPositions();
    } else if (taker && (taker.isHuman || taker.pos.distXZ(spot) > 14)) {
      // bring the taker to the ball quickly (brief fade on screen)
      this.placeTaker(taker);
      this.events.emit('snap', { t: this.time, who: 'taker' });
    }
    if (r.type === 'goalkick' && taker && taker.isGK) this.placeTaker(taker);
  }

  chooseTaker(r) {
    const team = this.teams[r.team];
    const outfield = team.players.filter((p) => !p.isGK);
    const h = this.human && this.human.team === r.team ? this.human : null;
    const nearest = (list) => {
      let best = null, bd = 1e9;
      for (const p of list) { const d = p.pos.distXZ(r.spot); if (d < bd) { bd = d; best = p; } }
      return [best, bd];
    };
    switch (r.type) {
      case 'kickoff': {
        if (h && (h.role === 'ST' || h.role === 'AM')) return h;
        return outfield.find((p) => p.role === 'ST') || outfield.find((p) => p.role === 'AM') || outfield[outfield.length - 1];
      }
      case 'goalkick': return team.players.find((p) => p.isGK) || outfield[0];
      case 'penalty': {
        if (h && (['ST', 'W', 'AM'].includes(h.role) || r.victim === h)) return h;
        return [...outfield].sort((a, b) => b.attrs.finishing - a.attrs.finishing)[0];
      }
      case 'corner': {
        const cands = outfield.filter((p) => p.role === 'W' || p.role === 'AM' || p.role === 'CM');
        const [best] = nearest(cands.length ? cands : outfield);
        if (h && h.pos.distXZ(r.spot) < 14 && h.pos.distXZ(r.spot) <= best.pos.distXZ(r.spot) + 3) return h;
        return best;
      }
      default: {
        const [best, bd] = nearest(outfield.filter((p) => this.time >= p.downUntil || p === r.victim));
        if (h && (r.victim === h || (h.pos.distXZ(r.spot) < 12 && h.pos.distXZ(r.spot) <= bd + 2))) return h;
        return best || outfield[0];
      }
    }
  }

  placeTaker(taker) {
    const r = this.restart;
    const spot = r.spot;
    const gs = this.attackDir(taker.team);
    let fx, fz;
    if (r.type === 'throwin') {
      fx = 0.3 * gs; fz = -Math.sign(spot.z);
      const l = Math.hypot(fx, fz); fx /= l; fz /= l;
      taker.pos.set(spot.x - fx * 0.35, 0, spot.z - fz * 0.35);
    } else {
      // face roughly toward the opponent goal / pitch centre
      const tx = r.type === 'corner' ? spot.x - gs * 8 : gs * PITCH.HL;
      const tz = r.type === 'corner' ? 0 : 0;
      fx = tx - spot.x; fz = tz - spot.z;
      const l = Math.hypot(fx, fz) || 1; fx /= l; fz /= l;
      taker.pos.set(spot.x - fx * 0.7, 0, spot.z - fz * 0.7);
    }
    taker.yaw = yawOf(fx, fz);
    taker.prevYaw = taker.yaw;
    taker.prevPos.copy(taker.pos);
    taker.vel.set(0, 0, 0);
    if (taker.isHuman) this.events.emit('humanYaw', { yaw: taker.yaw });
  }

  snapPositions() {
    this.snapCount++;
    this.events.emit('snap', { t: this.time, who: 'all' });
    for (const p of this.players) {
      const t = this.ai.restartTarget(p, this.restart, true);
      p.pos.copy(t);
      resetPlayerState(p);
      p.celebrate = 0;
      // face the ball / opponent goal
      const gs = this.attackDir(p.team);
      const dx = this.restart.spot.x - p.pos.x, dz = this.restart.spot.z - p.pos.z;
      p.yaw = Math.hypot(dx, dz) > 0.5 ? yawOf(dx, dz) : yawOf(gs, 0);
      p.prevYaw = p.yaw;
      p.prevPos.copy(p.pos);
    }
    if (this.restart.taker) this.placeTaker(this.restart.taker);
    if (this.human) this.events.emit('humanYaw', { yaw: this.human.yaw });
  }

  updateRestart(dt) {
    const r = this.restart;
    if (!r) return;
    const taker = r.taker;
    if (!taker) { this.phase = 'playing'; return; }
    const d = taker.pos.distXZ(r.spot);
    if (!r.placed) {
      if (d < 0.9 || taker.isHuman || this.phaseT > 3.5) {
        if (d >= 0.9) this.placeTaker(taker);
        r.placed = true;
        r.placedAt = this.phaseT;
        if (r.type === 'throwin') taker.hold = 'throw';
      }
      return;
    }
    if (this.phaseT > 4.5 && !r.cleared) {
      r.cleared = true;
      this.ai.enforceDistances(r);
    }
    if (this.phaseT < r.readyAt || this.phaseT - r.placedAt < 0.35) return;
    if (r.humanTaker && !r.autoTaken) {
      if (this.phaseT > 12) { r.autoTaken = true; this.ai.takeRestart(taker, r); }
      return;
    }
    if (!taker.action) this.ai.takeRestart(taker, r);
  }

  startSecondHalf() {
    this.half = 2;
    this.clock = this.halfLength;
    for (const t of this.teams) t.attack = -t.attack;
    this.events.emit('secondHalf', { t: this.time });
    this.setupRestart({ type: 'kickoff', team: 1 - this.kickoffTeam, spot: new V3(0, 0, 0) });
  }

  endHalf() {
    this.events.emit('whistle', { kind: this.half === 1 ? 'half' : 'full', t: this.time });
    if (this.ball.owner) this.ball.owner = null;
    this.ball.state = 'free';
    for (const p of this.players) if (p.action && p.action.type !== 'celebrate') p.action = null;
    if (this.half === 1) {
      this.phase = 'halftime';
      this.phaseT = 0;
      this.events.emit('halftime', { t: this.time, score: this.scoreline });
    } else {
      this.phase = 'fulltime';
      this.phaseT = 0;
      this.events.emit('fulltime', { t: this.time, score: this.scoreline });
    }
  }

  checkDeadlock() {
    const b = this.ball;
    // progress = someone has the ball or it is moving
    if (b.owner || b.speed > 0.3) { this.lastProgress = this.time; return; }
    if (this.time - this.lastProgress > 9) {
      // nobody has been able to reach a still ball: drop ball to the team that didn't touch it last
      const lt = b.lastTouch;
      const team = lt ? 1 - lt.team : 0;
      const spot = new V3(clamp(b.pos.x, -PITCH.HL + 2, PITCH.HL - 2), 0, clamp(b.pos.z, -PITCH.HW + 2, PITCH.HW - 2));
      this.events.emit('dropball', { t: this.time });
      this.phase = 'stoppage'; this.phaseT = 0; this.stoppageDelay = 0.3;
      this.pendingRestart = { type: 'freekick', team, spot };
      this.lastProgress = this.time;
    }
  }

  requestSkip() { this.skipRequested = true; }

  get displayClock() {
    const total = this.halfLength * 2;
    const secs = Math.min(this.clock, total) / total * 90 * 60;
    const m = Math.floor(secs / 60), s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}
