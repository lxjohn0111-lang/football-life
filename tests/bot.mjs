// A scripted "human" that plays through the real HumanController inputs
// (camera yaw/pitch, WASD axes, button presses). Used by headless tests.
import { PITCH } from '../src/sim/constants.js';

const yawTo = (from, x, z) => Math.atan2(x - from.pos.x, z - from.pos.z);

export class Bot {
  constructor(match, ctl, opts = {}) {
    this.m = match; this.ctl = ctl; this.p = ctl.p;
    this.o = { firstTime: true, requests: true, ...opts };
    this.state = 'idle';
    this.nextAct = 0;
    this.holdShot = null;
    this.log = [];
  }

  look(yaw, pitch = -0.12) { this.ctl.input.yaw = yaw; this.ctl.input.pitch = pitch; }

  // move toward world point with camera looking at `lookYaw`
  moveTo(x, z, lookYaw, sprint = false) {
    const p = this.p, inp = this.ctl.input;
    const dx = x - p.pos.x, dz = z - p.pos.z;
    const d = Math.hypot(dx, dz);
    const yaw = lookYaw ?? Math.atan2(dx, dz);
    inp.yaw = yaw;
    if (d < 0.4) { inp.moveF = 0; inp.moveR = 0; inp.sprint = false; return; }
    const wx = dx / d, wz = dz / d;
    // camera-relative axes: forward (sin yaw, cos yaw), right (-cos yaw, sin yaw)
    inp.moveF = wx * Math.sin(yaw) + wz * Math.cos(yaw);
    inp.moveR = wx * -Math.cos(yaw) + wz * Math.sin(yaw);
    inp.sprint = sprint;
  }

  tap(btn, t) {
    this.ctl.press(btn);
    if (btn === 'pass') this.ctl.input.rmb = true;
    if (btn === 'shoot') this.ctl.input.lmb = true;
    this.pending = { btn, at: this.m.time + (t ?? 0.05) };
  }

  update() {
    const m = this.m, p = this.p, ball = m.ball, now = m.time, inp = this.ctl.input;
    if (this.pending && now >= this.pending.at) {
      this.ctl.release(this.pending.btn);
      if (this.pending.btn === 'pass') inp.rmb = false;
      if (this.pending.btn === 'shoot') inp.lmb = false;
      this.pending = null;
    }
    if (m.phase === 'restart' && m.restart && m.restart.taker === p) {
      if (m.restart.placed && now > this.nextAct && m.phaseT > 1.2) {
        this.nextAct = now + 1;
        const mate = this.bestMate();
        if (mate) this.look(yawTo(p, mate.pos.x, mate.pos.z));
        this.tap('pass', 0.05);
      }
      return;
    }
    if (m.phase !== 'playing') { inp.moveF = inp.moveR = 0; return; }
    const att = m.attackDir(p.team);
    const goalX = att * PITCH.HL;
    const owner = ball.owner;
    if (p.action && p.action.type === 'kick' && !p.action.contacted && this.aim) {
      // keep the crosshair where we aimed until the strike
      this.look(this.aim.yaw, this.aim.pitch);
      inp.moveF = 0; inp.moveR = 0;
      return;
    }
    this.aim = null;
    if (owner === p) {
      const dGoal = Math.hypot(goalX - p.pos.x, p.pos.z);
      if (dGoal < 20 && now > this.nextAct) {
        // shoot at a corner, aiming low
        const z = (p.pos.z > 0 ? -1 : 1) * 1.7;
        const yaw = yawTo(p, goalX, z);
        const pitch = Math.atan2(0.5 - 1.65, dGoal);
        this.look(yaw, pitch);
        this.aim = { yaw, pitch };
        this.tap('shoot', 0.35);
        this.nextAct = now + 1.2;
        return;
      }
      // dribble forward a little, then pass to the most useful teammate
      if (now > this.nextAct && (this.carryT = (this.carryT || 0) + 1 / 120) > 0.8) {
        const mate = this.bestMate();
        if (mate) {
          this.look(yawTo(p, mate.pos.x, mate.pos.z));
          this.aim = { yaw: yawTo(p, mate.pos.x, mate.pos.z), pitch: -0.12 };
          this.tap('pass', 0.05);
          this.nextAct = now + 0.6;
          this.carryT = 0;
          return;
        }
      }
      this.moveTo(goalX, p.pos.z * 0.8, yawTo(p, goalX, 0), false);
      return;
    }
    this.carryT = 0;
    // incoming pass: optionally play it first time
    const pi = m.passIntent;
    if (pi && pi.target === p && !owner) {
      const d = ball.pos.distXZ(p.pos);
      if (this.o.firstTime && d < 3.5 && d > 1.2 && now > this.nextAct) {
        const mate = this.bestMate();
        const dGoal = Math.hypot(goalX - p.pos.x, p.pos.z);
        if (dGoal < 18) { this.look(yawTo(p, goalX, 1.5), -0.05); this.tap('shoot', 0.1); }
        else if (mate) { this.look(yawTo(p, mate.pos.x, mate.pos.z)); this.tap('pass', 0.05); }
        this.nextAct = now + 0.8;
      }
      this.moveTo(pi.point ? pi.point.x : ball.pos.x, pi.point ? pi.point.z : ball.pos.z, yawTo(p, ball.pos.x, ball.pos.z));
      return;
    }
    if (owner && owner.team === p.team) {
      // support ahead of the ball, call for it when open
      const tx = owner.pos.x + att * 10, tz = owner.pos.z * 0.5 + (p.pos.z > 0 ? 6 : -6);
      this.moveTo(Math.max(-PITCH.HL + 3, Math.min(PITCH.HL - 6, tx)), tz, yawTo(p, ball.pos.x, ball.pos.z), p.pos.distXZ({ x: tx, z: tz }) > 8);
      if (this.o.requests && now > this.nextAct && p.pos.distXZ(owner.pos) < 22) { this.ctl.press('through'); this.nextAct = now + 2.5; }
      return;
    }
    if (owner && owner.team !== p.team) {
      const d = owner.pos.distXZ(p.pos);
      this.moveTo(ball.pos.x, ball.pos.z, yawTo(p, ball.pos.x, ball.pos.z), d > 3);
      if (d < 1.4 && now > this.nextAct) { this.ctl.press('tackle'); this.nextAct = now + 0.8; }
      return;
    }
    // loose ball
    this.moveTo(ball.pos.x + ball.vel.x * 0.3, ball.pos.z + ball.vel.z * 0.3, yawTo(p, ball.pos.x, ball.pos.z), true);
  }

  bestMate() {
    const m = this.m, p = this.p, att = m.attackDir(p.team);
    let best = null, bs = -1e9;
    for (const t of m.teams[p.team].players) {
      if (t === p || t.isGK) continue;
      const d = t.pos.distXZ(p.pos);
      if (d < 5 || d > 30) continue;
      let near = 99;
      for (const o of m.opponents(p.team)) near = Math.min(near, o.pos.distXZ(t.pos));
      const s = (t.pos.x - p.pos.x) * att * 0.1 + Math.min(near, 8) * 0.3 - d * 0.02;
      if (s > bs) { bs = s; best = t; }
    }
    return best;
  }
}
