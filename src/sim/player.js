// Player physical model shared by the human and every AI player.
// Everyone obeys the same speed, acceleration, stamina and cooldown rules.
import { V3, clamp, wrapAngle, turnTowards, yawOf } from './vec.js';

export function strideLength(speed) {
  // distance covered per full gait cycle (two steps)
  if (speed < 1.5) return 1.0 + speed * 0.17;
  if (speed < 5) return 1.25 + (speed - 1.5) * 0.4;
  return 2.65 + (speed - 5) * 0.27;
}
export function stanceFraction(stride) { return clamp(0.64 / stride, 0.18, 0.6); }

let NEXT_ID = 1;

export function makeAttrs(base = 50) {
  return { pace: base, stamina: base, control: base, passing: base, finishing: base, tackling: base };
}

export class Player {
  constructor(o = {}) {
    this.id = NEXT_ID++;
    this.team = o.team ?? 0;
    this.slot = o.slot ?? 0;
    this.role = o.role || 'CM';        // GK DEF CM AM W ST
    this.side = o.side ?? 0;           // formation side (-1 right .. 1 left)
    this.number = o.number ?? 7;
    this.name = o.name || 'Player';
    this.isHuman = !!o.isHuman;
    this.isGK = this.role === 'GK';
    this.attrs = Object.assign(makeAttrs(50), o.attrs || {});
    this.keeping = o.keeping ?? 50;    // goalkeeper reflexes/handling
    this.foot = o.foot || 'R';
    this.look = o.look || null;        // appearance for rendering

    this.pos = new V3();
    this.prevPos = new V3();
    this.vel = new V3();
    this.yaw = 0;
    this.prevYaw = 0;
    this.headYaw = 0;          // relative head turn (render only)
    this.desired = new V3();   // desired velocity from controller
    this.sprint = false;
    this.faceYaw = null;       // requested facing (null = face movement)
    this.stamina = 1;
    this.gait = 0; this.prevGait = 0;

    this.action = null;
    this.slideReadyAt = 0;
    this.tackleReadyAt = 0;
    this.noCaptureUntil = 0;
    this.stumbleUntil = 0;
    this.downUntil = 0;        // on the ground after a foul/trip
    this.touch = null;         // last foot contact {foot, time, x, y, z, kind}
    this.celebrate = 0;
    this.hold = null;          // restart hold pose ('throw', 'gk')
    this.requestUntil = 0;
    this.requestReadyAt = 0;
    this.ackUntil = 0;
    this.lastKickAt = -10;
    this.ai = { state: 'shape', target: new V3(), think: 0, sprint: false, stuckT: 0, lastDist: 0 };
  }

  get speed() { return Math.sqrt(this.vel.x * this.vel.x + this.vel.z * this.vel.z); }

  jogSpeed() { return 4.9 + (this.attrs.pace - 50) * 0.018; }
  sprintSpeed() {
    const fat = this.stamina < 0.35 ? (0.35 - this.stamina) / 0.35 : 0;
    return (7.0 + (this.attrs.pace - 50) * 0.03) * (1 - 0.12 * fat);
  }
  maxSpeed(sprint, withBall) {
    let s = sprint && this.stamina > 0.02 ? this.sprintSpeed() : this.jogSpeed();
    if (withBall) s *= sprint ? 0.9 : 0.93;
    return s;
  }
  forwardX() { return Math.sin(this.yaw); }
  forwardZ() { return Math.cos(this.yaw); }
}

export function resetPlayerState(p) {
  p.action = null;
  p.vel.set(0, 0, 0);
  p.desired.set(0, 0, 0);
  p.stumbleUntil = 0;
  p.downUntil = 0;
  p.celebrate = 0;
  p.hold = null;
  p.requestUntil = 0;
  p.prevPos.copy(p.pos);
  p.prevYaw = p.yaw;
}

// Movement integration for one fixed step.
export function movePlayer(p, dt, now, speedCap = Infinity, withBall = false) {
  p.prevPos.copy(p.pos);
  p.prevYaw = p.yaw;
  p.prevGait = p.gait;

  const a = p.action;
  if (a && a.type === 'slide' && a.sliding) {
    // velocity fully driven by the slide
    p.pos.addScaled(p.vel, dt);
    advanceGait(p, dt, true);
    return;
  }
  if (a && a.type === 'dive') {
    p.pos.addScaled(p.vel, dt);
    p.pos.y = 0;
    return;
  }
  let cap = speedCap;
  if (now < p.downUntil) cap = 0;
  else if (now < p.stumbleUntil) cap = Math.min(cap, 1.6);

  // desired velocity limited by max speed
  const d = p.desired;
  let dl = Math.sqrt(d.x * d.x + d.z * d.z);
  const max = Math.min(p.maxSpeed(p.sprint, withBall), cap);
  let tx = d.x, tz = d.z;
  if (dl > max) { tx *= max / dl; tz *= max / dl; dl = max; }

  const vx = p.vel.x, vz = p.vel.z;
  let dvx = tx - vx, dvz = tz - vz;
  const dvl = Math.sqrt(dvx * dvx + dvz * dvz);
  // quick stops and direction changes, smooth acceleration
  const accel = 12.5 + p.attrs.pace * 0.04;
  const slowing = tx * vx + tz * vz < vx * vx + vz * vz - 0.01;
  const rate = (slowing ? 24 : accel) * dt;
  if (dvl > rate) { dvx *= rate / dvl; dvz *= rate / dvl; }
  p.vel.x += dvx; p.vel.z += dvz; p.vel.y = 0;
  p.pos.x += p.vel.x * dt; p.pos.z += p.vel.z * dt; p.pos.y = 0;

  // facing
  let targetYaw = p.faceYaw;
  const sp = p.speed;
  if (targetYaw == null) targetYaw = sp > 0.4 ? yawOf(p.vel.x, p.vel.z) : p.yaw;
  const turnRate = (p.isHuman ? 14 : 9) * dt;
  p.yaw = turnTowards(p.yaw, targetYaw, turnRate);

  // stamina: sprinting drains, jogging/walking restores
  const drainMul = 1.35 - p.attrs.stamina * 0.007;
  if (p.sprint && sp > p.jogSpeed() * 1.03) p.stamina -= 0.068 * drainMul * dt;
  else if (sp < 2.2) p.stamina += 0.05 * dt;
  else p.stamina += 0.014 * dt;
  p.stamina = clamp(p.stamina, 0, 1);

  advanceGait(p, dt, false);
}

function advanceGait(p, dt, sliding) {
  const sp = sliding ? 0 : p.speed;
  if (sp > 0.05) p.gait += (sp * dt) / strideLength(sp);
}

// keep players from overlapping (deterministic order)
export function separatePlayers(players) {
  const n = players.length;
  for (let i = 0; i < n; i++) {
    const a = players[i];
    for (let j = i + 1; j < n; j++) {
      const b = players[j];
      const dx = b.pos.x - a.pos.x, dz = b.pos.z - a.pos.z;
      const d2 = dx * dx + dz * dz;
      const min = 0.62;
      if (d2 < min * min && d2 > 1e-8) {
        const d = Math.sqrt(d2);
        const push = (min - d) * 0.5;
        const nx = dx / d, nz = dz / d;
        // players on the ground or sliding don't get shoved as much
        const wa = a.action && a.action.type === 'slide' ? 0.3 : 1;
        const wb = b.action && b.action.type === 'slide' ? 0.3 : 1;
        const sw = wa + wb;
        a.pos.x -= nx * push * 2 * (wa / sw); a.pos.z -= nz * push * 2 * (wa / sw);
        b.pos.x += nx * push * 2 * (wb / sw); b.pos.z += nz * push * 2 * (wb / sw);
      } else if (d2 <= 1e-8) {
        b.pos.x += 0.05; // deterministic nudge
      }
    }
  }
}
