// The human's controller. Turns buffered input into the same actions AI players
// use. Presses are buffered for ~150 ms; a pass or shot pressed just before a
// ball arrives becomes a natural first-time kick when contact becomes possible.
import { V3, clamp } from './vec.js';
import { RULES, AREA, PITCH } from './constants.js';
import { startKick, releaseCharge, startTackle, startSlide, reachEta, canAct } from './actions.js';
import { choosePassTarget } from './passing.js';

export class HumanController {
  constructor(match, player) {
    this.m = match;
    this.p = player;
    this.input = { moveF: 0, moveR: 0, sprint: false, yaw: 0, pitch: 0, lmb: false, rmb: false };
    this.buffer = [];
    this.intent = null;
    this.passTarget = null;
    this.targetVisible = false;
    this.lastAction = null;
  }

  press(type) { this.buffer.push({ type, t: this.m.time }); }
  release(type) { this.buffer.push({ type: type + 'Up', t: this.m.time }); }

  update(dt) {
    const m = this.m, p = this.p, now = m.time, ball = m.ball, inp = this.input;
    const yaw = inp.yaw;
    const fx = Math.sin(yaw), fz = Math.cos(yaw);
    const rx = -Math.cos(yaw), rz = Math.sin(yaw);
    let mx = fx * inp.moveF + rx * inp.moveR, mz = fz * inp.moveF + rz * inp.moveR;
    const ml = Math.hypot(mx, mz);
    if (ml > 1) { mx /= ml; mz /= ml; }
    const hasBall = ball.owner === p && ball.state === 'controlled';
    p.sprint = inp.sprint && ml > 0.1;
    const max = p.maxSpeed(p.sprint, hasBall);
    p.desired.set(mx * max, 0, mz * max);
    p.faceYaw = yaw;

    const taker = m.phase === 'restart' && m.restart && m.restart.taker === p && m.restart.placed;
    // selected receiver marker (with hysteresis inside choosePassTarget)
    const incoming = !hasBall && !ball.owner && ball.state !== 'dead' && (this.intent || (m.passIntent && m.passIntent.target === p));
    if (hasBall || taker || incoming) {
      this.passTarget = choosePassTarget(m, p, yaw, this.passTarget, m.assist.passCone);
      this.targetVisible = !!this.passTarget;
    } else {
      this.targetVisible = false;
      if (!ball.owner || ball.owner.team !== p.team) this.passTarget = null;
    }

    // shot aim follows the crosshair while charging
    const a = p.action;
    if (a && a.type === 'kick' && a.kind === 'shot' && !a.contacted && !a.ai) { a.aimYaw = yaw; a.aimPitch = inp.pitch; }

    if (m.phase === 'goal' || m.phase === 'halftime') {
      for (const e of this.buffer) if (!e.type.endsWith('Up')) m.requestSkip();
      this.buffer.length = 0;
      return;
    }
    if (taker) { this.restartControls(); return; }
    if (m.phase !== 'playing') {
      // keep releases so held charges don't stick, drop other presses
      this.buffer = this.buffer.filter((e) => now - e.t < RULES.INPUT_BUFFER && !e.type.endsWith('Up'));
      return;
    }

    // process buffered presses in order; unconsumed presses expire after ~150 ms
    const keep = [];
    for (const e of this.buffer) {
      if (this.handle(e, hasBall)) continue;
      // tackles wait a little longer for a cooldown or a finishing action
      const life = e.type === 'tackle' || e.type === 'slide' ? 0.4 : RULES.INPUT_BUFFER;
      if (now - e.t < life && !e.type.endsWith('Up')) keep.push(e);
    }
    this.buffer = keep;
    this.updateIntent(hasBall);
  }

  handle(e, hasBall) {
    const m = this.m, p = this.p, now = m.time, inp = this.input;
    const a = p.action;
    switch (e.type) {
      case 'passUp':
        if (a && a.type === 'kick' && a.kind === 'pass' && a.charging) releaseCharge(a);
        if (this.intent && this.intent.kind === 'pass') this.intent.released = true;
        return true;
      case 'shootUp':
        if (a && a.type === 'kick' && a.kind === 'shot' && a.charging) { a.aimYaw = inp.yaw; a.aimPitch = inp.pitch; releaseCharge(a); }
        if (this.intent && this.intent.kind === 'shot' && !this.intent.released) {
          this.intent.released = true;
          this.intent.charge = Math.min(1, (now - this.intent.t0) / 0.65);
        }
        return true;
      case 'pass':
      case 'shoot':
      case 'through': {
        const kind = e.type === 'shoot' ? 'shot' : e.type;
        if (hasBall) {
          if (!canAct(m, p)) return false;
          if (kind === 'shot') startKick(m, p, 'shot', { charging: inp.lmb, aimYaw: inp.yaw, aimPitch: inp.pitch });
          else startKick(m, p, kind, { target: this.passTarget, charging: kind === 'pass' && inp.rmb, aimYaw: inp.yaw });
          this.lastAction = { kind, t: now };
          this.intent = null;
          return true;
        }
        if (kind === 'through') { this.requestPass(); return true; }
        // no ball yet: remember the intent until contact becomes possible
        const eta = reachEta(m, p, 0.75);
        this.intent = {
          kind, t0: e.t, released: kind === 'shot' ? !inp.lmb : !inp.rmb, charge: 0,
          until: now + Math.max(RULES.INPUT_BUFFER, eta != null ? eta + 0.12 : 0),
        };
        return true;
      }
      case 'tackle':
      case 'slide': {
        if (hasBall) return false; // on the ball: hold the press briefly in case it is being lost
        // a tackle press overrides a first-time kick that hasn't been struck yet
        if (a && a.type === 'kick' && !a.contacted && !a.owned) { p.action = null; p.faceYaw = null; }
        this.intent = null;
        const ok = e.type === 'tackle' ? startTackle(m, p) : startSlide(m, p);
        if (ok) this.lastAction = { kind: e.type, t: now };
        return ok;
      }
      default:
        return true;
    }
  }

  updateIntent(hasBall) {
    const it = this.intent;
    if (!it) return;
    const m = this.m, p = this.p, now = m.time, inp = this.input;
    if (it.kind === 'shot' && !it.released) it.charge = Math.min(1, (now - it.t0) / 0.65);
    if (hasBall) {
      if (!canAct(m, p)) return;
      // the ball was controlled first: play it straight away
      if (it.kind === 'shot') startKick(m, p, 'shot', { charge: it.charge, aimYaw: inp.yaw, aimPitch: inp.pitch, minContact: 0.06 });
      else startKick(m, p, 'pass', { target: this.passTarget, aimYaw: inp.yaw, minContact: 0.06 });
      this.intent = null;
      return;
    }
    if (now > it.until || (m.ball.owner && m.ball.owner !== p)) { this.intent = null; return; }
    if (!canAct(m, p)) return;
    const eta = reachEta(m, p, 0.5);
    if (eta != null && eta <= 0.13) {
      const kind = it.kind === 'shot' ? 'shot' : 'pass';
      startKick(m, p, kind, {
        target: kind === 'pass' ? this.passTarget : null, aimYaw: inp.yaw, aimPitch: inp.pitch,
        charge: kind === 'shot' ? Math.max(0.25, it.charge) : 0, firstTime: true,
        minContact: Math.max(0.04, eta), deadline: eta + 0.22,
      });
      this.lastAction = { kind, t: now, firstTime: true };
      this.intent = null;
    } else if (eta != null) {
      it.until = Math.max(it.until, now + eta + 0.05);
    }
  }

  requestPass() {
    const m = this.m, p = this.p, now = m.time;
    if (now < p.requestReadyAt) return;
    p.requestUntil = now + 2.4;
    p.requestReadyAt = now + RULES.REQUEST_COOLDOWN;
    m.events.emit('request', { player: p, t: now });
  }

  restartControls() {
    const m = this.m, p = this.p, now = m.time, inp = this.input, r = m.restart;
    const keep = [];
    const a = p.action;
    for (const e of this.buffer) {
      if (e.type === 'shootUp') { if (a && a.kind === 'shot' && a.charging) { a.aimYaw = inp.yaw; a.aimPitch = inp.pitch; releaseCharge(a); } continue; }
      if (e.type === 'passUp') { if (a && a.charging) releaseCharge(a); continue; }
      if (p.action) continue;
      if (e.type === 'pass' || e.type === 'through') {
        if (r.type === 'throwin') startKick(m, p, 'throw', { target: this.passTarget, aimYaw: inp.yaw, restart: r, point: this.passTarget ? null : aimPoint(p, inp.yaw, 12) });
        else startKick(m, p, e.type === 'through' ? 'through' : 'pass', { target: this.passTarget, aimYaw: inp.yaw, restart: r, charging: e.type === 'pass' && inp.rmb });
        continue;
      }
      if (e.type === 'shoot') {
        if (r.type === 'throwin') startKick(m, p, 'throw', { point: aimPoint(p, inp.yaw, 20), restart: r });
        else if (r.type === 'corner') startKick(m, p, 'cross', { point: aimPoint(p, inp.yaw, clamp(18 + inp.pitch * 30, 8, 30)), restart: r });
        else startKick(m, p, 'shot', { charging: inp.lmb, aimYaw: inp.yaw, aimPitch: inp.pitch, restart: r });
        continue;
      }
      if (now - e.t < RULES.INPUT_BUFFER) keep.push(e);
    }
    this.buffer = keep;
  }
}

function aimPoint(p, yaw, d) {
  return new V3(clamp(p.pos.x + Math.sin(yaw) * d, -PITCH.HL + 1, PITCH.HL - 1), 0, clamp(p.pos.z + Math.cos(yaw) * d, -PITCH.HW + 1, PITCH.HW - 1));
}
