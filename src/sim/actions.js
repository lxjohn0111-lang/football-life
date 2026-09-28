// Actions with anticipation, an explicit contact moment and follow-through.
// The ball impulse (and the contact sound, via the 'kick' event) happens exactly
// at the contact tick, and only if the ball is inside the foot's reachable zone.
import { V3, clamp, lerp, yawOf, angleDiff, pointSegDistXZ } from './vec.js';
import { RULES, PITCH, GOAL, AREA, BALL_R } from './constants.js';
import {
  groundPassVelocity, passArriveSpeed, leadPoint, lobVelocity, aimElevation,
  throughArrive, clampInPitch, trajectoryOnTarget, laneOpenness,
} from './passing.js';

const KICK_WINDUP = {
  pass: 0.11, through: 0.12, shot: 0.085, cross: 0.17, lob: 0.15, clear: 0.13,
  throw: 0.32, gkthrow: 0.32, gkkick: 0.36, touch: 0.05,
};
const FOLLOW = { shot: 0.34, pass: 0.26, through: 0.26, cross: 0.3, lob: 0.3, clear: 0.3, throw: 0.35, gkthrow: 0.35, gkkick: 0.45 };
export const PASS_KINDS = new Set(['pass', 'through', 'cross', 'lob', 'throw', 'gkthrow', 'gkkick']);

const tA = new V3(), tB = new V3(), tC = new V3();

// Is the ball within the reachable zone of this player's kicking foot?
export function kickReach(p, ball, extra = 0) {
  const dx = ball.pos.x - p.pos.x, dz = ball.pos.z - p.pos.z;
  const d = Math.sqrt(dx * dx + dz * dz);
  if (d > 1.1 + extra) return false;
  if (ball.pos.y > 1.0) return false;
  if (d > 0.8) {
    const fwd = dx * Math.sin(p.yaw) + dz * Math.cos(p.yaw);
    if (fwd < -0.2) return false; // cannot reach a ball well behind the body
  }
  return true;
}

// time until the ball enters kicking reach (null if not within horizon)
export function reachEta(match, p, horizon = 0.7) {
  const ball = match.ball;
  if (kickReach(p, ball)) return 0;
  if (ball.state === 'held' || ball.state === 'dead') return null;
  if (ball.owner && ball.owner !== p) return null;
  const tr = match.traj;
  const step = 1 / 60;
  for (let t = step; t <= horizon; t += step) {
    tr.at(t + (match.time - tr.t0), tA);
    const px = p.pos.x + p.vel.x * t * 0.8, pz = p.pos.z + p.vel.z * t * 0.8;
    const d = Math.hypot(tA.x - px, tA.z - pz);
    if (d < 0.95 && tA.y < 0.95) return t;
  }
  return null;
}

function chooseFoot(p, ball) {
  const dx = ball.pos.x - p.pos.x, dz = ball.pos.z - p.pos.z;
  // positive = ball to the left of the body
  const side = dx * Math.cos(p.yaw) - dz * Math.sin(p.yaw);
  if (side > 0.25) return 'L';
  if (side < -0.25) return 'R';
  return p.foot || 'R';
}

export function canAct(match, p) {
  if (match.time < p.downUntil) return false;
  const a = p.action;
  if (!a) return true;
  if (a.type === 'kick' && a.contacted) return a.t > a.contactT + 0.1;
  if (a.type === 'tackle') return a.t > 0.4;
  return false;
}

export function startKick(match, p, kind, o = {}) {
  const minContact = o.minContact ?? KICK_WINDUP[kind] ?? 0.12;
  const a = {
    type: 'kick', kind, t: 0,
    charging: !!o.charging, holdT: 0, charge: o.charge ?? 0,
    minContact, deadline: o.deadline ?? minContact + 0.75,
    contacted: false, contactT: 0, follow: FOLLOW[kind] ?? 0.28,
    target: o.target || null,
    point: o.point ? new V3().copy(o.point) : null,
    aimYaw: o.aimYaw ?? p.yaw, aimPitch: o.aimPitch ?? 0,
    power: o.power ?? 0.6, elev: o.elev ?? null,
    firstTime: !!o.firstTime, restart: o.restart || null,
    foot: chooseFoot(p, match.ball),
    eta: minContact,
    fromHands: kind === 'throw' || kind === 'gkthrow' || kind === 'gkkick',
    ai: !!o.ai,
    owned: match.ball.owner === p,
  };
  p.action = a;
  return a;
}

export function releaseCharge(a) {
  if (!a || !a.charging) return;
  a.charging = false;
  const strike = a.kind === 'shot' ? 0.085 : 0.02;
  a.minContact = Math.max(a.minContact, a.t + strike);
  a.deadline = a.minContact + 0.6;
}

export function actionSpeedCap(p) {
  const a = p.action;
  if (!a) return Infinity;
  const jog = p.jogSpeed();
  if (a.type === 'kick') {
    if (a.fromHands) return a.contacted ? jog * 0.5 : 1.2;
    if (!a.contacted) {
      if (a.kind === 'shot' && a.charging) return jog * 0.7;
      return a.inReach ? jog * 0.85 : Infinity; // chase the ball down before striking
    }
    return jog * 0.85;
  }
  if (a.type === 'tackle') return a.t < 0.32 ? (a.lunge || 4.2) : 2.2;
  if (a.type === 'slide') return a.sliding ? Infinity : 0.4;
  if (a.type === 'celebrate') return Infinity;
  return Infinity;
}

// estimated kick direction for facing / animation
function kickFacing(match, p, a) {
  if (a.kind === 'shot') return a.aimYaw;
  if (a.target) return yawOf(a.target.pos.x - p.pos.x, a.target.pos.z - p.pos.z);
  if (a.point) return yawOf(a.point.x - p.pos.x, a.point.z - p.pos.z);
  return a.aimYaw;
}

export function updateAction(match, p, dt) {
  const a = p.action;
  if (!a) return;
  a.t += dt;
  switch (a.type) {
    case 'kick': updateKick(match, p, a, dt); break;
    case 'tackle': updateTackle(match, p, a, dt); break;
    case 'slide': updateSlide(match, p, a, dt); break;
    case 'celebrate': if (a.t > a.dur) p.action = null; break;
    case 'stumble': if (a.t > a.dur) p.action = null; break;
    case 'dive': break; // keeper module drives dives
    default: if (a.dur && a.t > a.dur) p.action = null;
  }
}

function updateKick(match, p, a, dt) {
  const ball = match.ball;
  if (a.charging) {
    a.holdT += dt;
    if (a.kind === 'shot') {
      a.charge = Math.min(1, a.holdT / 0.65);
      if (a.holdT >= 0.85) releaseCharge(a);
    } else {
      a.charge = Math.min(1, Math.max(0, a.holdT - 0.1) / 0.3);
      if (a.holdT >= 0.4) releaseCharge(a);
    }
  }
  if (!a.contacted) {
    p.faceYaw = kickFacing(match, p, a);
    // a kick prepared while in possession is abandoned once someone else has played the ball
    if (a.owned && !a.restart && ball.owner !== p && ball.lastTouch !== p) { p.action = null; p.faceYaw = null; return; }
    const ownerOk = !ball.owner || ball.owner === p;
    const stateOk = a.restart ? true : a.fromHands ? (ball.state === 'held' && ball.owner === p) : (ball.state !== 'held' && ball.state !== 'dead');
    const reach = a.fromHands || a.restart ? true : kickReach(p, ball);
    a.inReach = reach;
    // anticipation estimate for the animation
    if (!a.charging) a.eta = Math.max(0, a.minContact - a.t);
    if (!a.charging && a.t >= a.minContact && ownerOk && stateOk && reach) {
      a.contacted = true;
      a.contactT = a.t;
      performKick(match, p, a);
      return;
    }
    // movement assistance: close in on the ball to strike it (never moves the ball)
    if (!a.fromHands && !a.restart && ownerOk && stateOk && !a.charging) {
      const bx = ball.pos.x + ball.vel.x * 0.15, bz = ball.pos.z + ball.vel.z * 0.15;
      let ax = p.pos.x - bx, az = p.pos.z - bz;
      const al = Math.hypot(ax, az) || 1;
      // stand ~0.45 m from the ball, slightly behind it relative to the kick
      ax = ax / al * 0.7 - Math.sin(p.faceYaw) * 0.3; az = az / al * 0.7 - Math.cos(p.faceYaw) * 0.3;
      const nl = Math.hypot(ax, az) || 1;
      const tx = bx + ax / nl * 0.45, tz = bz + az / nl * 0.45;
      const dx = tx - p.pos.x, dz = tz - p.pos.z;
      const dl = Math.hypot(dx, dz);
      if (dl < 4) {
        const k = Math.min(8, dl * 6) / (dl || 1);
        p.desired.x = dx * k + ball.vel.x;
        p.desired.z = dz * k + ball.vel.z;
      }
    }
    if (!a.charging && a.t > a.deadline) {
      // missed: the foot never reached the ball, so the ball is left alone
      a.contacted = true; a.missed = true; a.contactT = a.t;
      match.events.emit('whiff', { player: p, kind: a.kind, t: match.time });
    }
  } else if (a.t > a.contactT + a.follow) {
    p.action = null;
    p.faceYaw = null;
  }
}

// ---------------------------------------------------------------------------
function gauss(rng) { return rng.gauss(); }

function pressureOn(match, p) {
  let near = 99;
  for (const o of match.players) {
    if (o.team === p.team) continue;
    const d = o.pos.distXZ(p.pos);
    if (d < near) near = d;
  }
  return clamp((2.4 - near) / 2.4, 0, 1);
}

function rotateXZ(v, ang) {
  const c = Math.cos(ang), s = Math.sin(ang);
  const x = v.x * c + v.z * s, z = -v.x * s + v.z * c;
  v.x = x; v.z = z;
  return v;
}

export function performKick(match, p, a) {
  const ball = match.ball;
  const rng = match.rng;
  const vel = new V3();
  let spin = 0;
  let point = a.point ? a.point.clone() : null;
  const att = match.attackDir(p.team);
  const human = p.isHuman;
  const assist = human ? match.assist : null;
  const opp = !human && match.isOpp(p) ? match.aiParams[p.team] : null;
  const run = clamp(p.speed / 7.5, 0, 1);
  const pressure = pressureOn(match, p);
  let onTarget = false;
  let target = a.target;
  let from = ball.pos;

  if (a.kind === 'throw') {
    ball.pos.set(p.pos.x + Math.sin(p.yaw) * 0.25, 2.05, p.pos.z + Math.cos(p.yaw) * 0.25);
  } else if (a.kind === 'gkthrow') {
    ball.pos.set(p.pos.x + Math.sin(p.yaw) * 0.6, 0.35, p.pos.z + Math.cos(p.yaw) * 0.6);
  } else if (a.kind === 'gkkick') {
    ball.pos.set(p.pos.x + Math.sin(p.yaw) * 0.55, 0.7, p.pos.z + Math.cos(p.yaw) * 0.55);
  }
  from = ball.pos;

  const errScale = (kind) => {
    let s;
    if (kind === 'shot') s = (0.011 + (100 - p.attrs.finishing) * 0.00045) * (1 + 0.45 * run + 0.6 * pressure);
    else s = (0.004 + (100 - p.attrs.passing) * 0.00022) * (1 + 0.35 * run + 0.45 * pressure);
    if (human && assist) s *= kind === 'shot' ? assist.shotError : assist.passError;
    if (opp) s *= kind === 'shot' ? opp.shotErr : opp.passErr;
    if (a.foot !== p.foot) s *= 1.12;
    return s;
  };

  switch (a.kind) {
    case 'pass':
    case 'gkthrow': {
      if (target) {
        point = new V3();
        leadPoint(from, target, point, target.isGK ? 0 : 0.75, a.charge * 3);
        const d = from.distXZ(point);
        const arrive = target.isGK ? 3.5 : passArriveSpeed(d) + a.charge * 4.5;
        // pass assist: a ground pass that an opponent would cut out is chipped over instead
        if (human && assist.autoLob && a.kind === 'pass' && !a.restart && d > 7 && !target.isGK &&
            laneOpenness(match, from.x, from.z, point.x, point.z, p.team, 12) < 0.45) {
          lobVelocity(from, from.y, point, clamp(0.42 + d * 0.006, 0.42, 0.62), vel);
          a.lofted = true;
        } else {
          groundPassVelocity(from, point, arrive, vel);
        }
      } else {
        const d = (a.kind === 'gkthrow' ? 18 : 11) + a.charge * 18;
        point = point || new V3(from.x + Math.sin(a.aimYaw) * d, 0, from.z + Math.cos(a.aimYaw) * d);
        clampInPitch(point, 0.6);
        groundPassVelocity(from, point, 2.4, vel);
      }
      rotateXZ(vel, gauss(rng) * errScale('pass'));
      if (a.kind === 'gkthrow') vel.y = -0.5;
      break;
    }
    case 'through': {
      if (target) {
        point = throughPoint(match, target, point);
        const tr = point.distXZ(target.pos) / target.sprintSpeed() + 0.28;
        const d = from.distXZ(point);
        const open = laneOpenness(match, from.x, from.z, point.x, point.z, p.team, 11);
        if (open < 0.4 && d > 12) {
          lobVelocity(from, from.y, point, 0.62, vel);
        } else {
          const arrive = clamp(throughArrive(d, tr), 2.6, 10);
          groundPassVelocity(from, point, arrive, vel);
        }
      } else {
        const d = 17;
        point = new V3(from.x + Math.sin(a.aimYaw) * d, 0, from.z + Math.cos(a.aimYaw) * d);
        clampInPitch(point, 1);
        groundPassVelocity(from, point, 3.2, vel);
      }
      rotateXZ(vel, gauss(rng) * errScale('pass'));
      break;
    }
    case 'cross':
    case 'lob':
    case 'clear':
    case 'gkkick':
    case 'throw': {
      if (!point && target) { point = new V3(); leadPoint(from, target, point, 0.6); }
      if (!point) point = new V3(from.x + Math.sin(a.aimYaw) * 25, 0, from.z + Math.cos(a.aimYaw) * 25);
      clampInPitch(point, 0.5);
      const elev = a.elev ?? (a.kind === 'cross' ? 0.4 : a.kind === 'clear' ? 0.6 : a.kind === 'throw' ? 0.42 : a.kind === 'gkkick' ? 0.55 : 0.5);
      const s = lobVelocity(from, from.y, point, elev, vel);
      if (a.kind === 'throw' && s > 15.5) vel.scale(15.5 / s);
      rotateXZ(vel, gauss(rng) * errScale('pass') * 1.2);
      vel.y *= 1 + gauss(rng) * 0.03;
      break;
    }
    case 'shot': {
      const r = shotVelocity(match, p, a, vel, errScale('shot'));
      spin = r.spin; point = r.point;
      break;
    }
    case 'touch': {
      // small controlled push in a direction (restart tap or poke)
      const d = 4;
      point = new V3(from.x + Math.sin(a.aimYaw) * d, 0, from.z + Math.cos(a.aimYaw) * d);
      groundPassVelocity(from, point, 2, vel);
      break;
    }
  }
  // opponents on easier difficulties sometimes mishit a pass: wrong direction, under or over hit
  if (opp && PASS_KINDS.has(a.kind) && a.kind !== 'throw' && rng.next() < opp.mistake) {
    rotateXZ(vel, (rng.next() < 0.5 ? -1 : 1) * (0.1 + rng.next() * 0.22));
    const f = rng.next() < 0.6 ? 0.55 + rng.next() * 0.2 : 1.18 + rng.next() * 0.2;
    vel.x *= f; vel.z *= f; if (vel.y > 0) vel.y *= Math.sqrt(f);
    a.mishit = true;
  }
  if (a.kind === 'shot') onTarget = trajectoryOnTarget(from, vel, spin, att);

  // spin for rendering: topspin on drives, backspin on lofted balls
  const sp = vel.len();
  const hx = vel.x / (sp || 1), hz = vel.z / (sp || 1);
  const lofted = vel.y > 3;
  const spinMag = (lofted ? -1 : 1) * sp / BALL_R * (lofted ? 0.35 : 0.6);
  ball.spin.set(hz * spinMag, (spin || 0) * 2, -hx * spinMag);
  ball.sideSpin = spin || 0;
  match.applyKick(p, vel, a, { point, target, onTarget });
}

function throughPoint(match, t, suggested) {
  const att = match.attackDir(t.team);
  let rx = att, rz = 0;
  const sp = t.speed;
  if (sp > 1.5 && t.vel.x * att > 0) { rx += (t.vel.x / sp) * 0.9; rz += (t.vel.z / sp) * 0.9; }
  if (Math.abs(t.pos.z) > 11) rz -= Math.sign(t.pos.z) * 0.35;
  const l = Math.hypot(rx, rz); rx /= l; rz /= l;
  // run into the space ahead, shorter when defenders are close in front
  let space = 9;
  for (const o of match.players) {
    if (o.team === t.team || o.isGK) continue;
    const dx = o.pos.x - t.pos.x, dz = o.pos.z - t.pos.z;
    const along = dx * rx + dz * rz;
    const perp = Math.abs(dx * rz - dz * rx);
    if (along > 0 && perp < 4) space = Math.min(space, along + 1.5);
  }
  const L = clamp(space, 4.5, 9);
  const out = suggested ? suggested.clone() : new V3(t.pos.x + rx * L, 0, t.pos.z + rz * L);
  // never beyond the goal line
  out.x = clamp(out.x, -PITCH.HL + 1.5, PITCH.HL - 1.5);
  out.z = clamp(out.z, -PITCH.HW + 1.5, PITCH.HW - 1.5);
  return out;
}

// Shot aimed with the crosshair: ray from the eye to a target point, modest assist
// toward the goal opening when facing it, then small execution errors.
export function shotVelocity(match, p, a, out, sigma) {
  const ball = match.ball;
  const rng = match.rng;
  const gs = match.attackDir(p.team);
  const goalX = gs * PITCH.HL;
  const assistK = p.isHuman ? match.assist.shotAim : 0;
  let T;
  if (a.ai && a.point) {
    T = a.point.clone();
  } else {
    const ey = 1.65, ex = p.pos.x, ez = p.pos.z;
    const cp = Math.cos(a.aimPitch);
    const dx = Math.sin(a.aimYaw) * cp, dy = Math.sin(a.aimPitch), dz = Math.cos(a.aimYaw) * cp;
    const facingGoal = dx * gs > 0.25 && (goalX - ex) * gs > 1;
    if (facingGoal) {
      const t = (goalX - ex) / dx;
      T = new V3(goalX, ey + dy * t, ez + dz * t);
      // horizontal assist: pull slightly-wide aims back inside, keep the chosen side
      const az = Math.abs(T.z), inner = GOAL.HW - 0.4;
      if (az > inner && az < GOAL.HW + 1.8) {
        const outBy = az - inner;
        const k = assistK * 0.6 * clamp(1 - (az - GOAL.HW) / 1.8, 0, 1);
        T.z -= Math.sign(T.z) * outBy * k;
      }
      // vertical assist: shots just over the bar are brought down a little
      if (T.y > GOAL.H - 0.3 && T.y < GOAL.H + 1.3) T.y -= (T.y - (GOAL.H - 0.35)) * assistK * 0.45;
      T.y = clamp(T.y, BALL_R, 4.5);
    } else {
      const t = 22;
      T = new V3(ex + dx * t, clamp(ey + dy * t, BALL_R, 7), ez + dz * t);
    }
  }
  const charge = a.ai ? a.power : a.charge;
  let speed = lerp(15.5, 29, Math.pow(clamp(charge, 0, 1), 0.85)) * (0.86 + p.attrs.finishing * 0.0028);
  T.y += charge * charge * 0.3; // powerful strikes rise a touch
  let yaw = Math.atan2(T.x - ball.pos.x, T.z - ball.pos.z);
  let elev = aimElevation(ball.pos.x, ball.pos.y, ball.pos.z, T.x, T.y, T.z, speed);
  elev = clamp(elev, -0.12, 0.62);
  // execution error: running, shooting across the body and pressure widen it slightly
  const body = Math.abs(angleDiff(p.yaw, yaw)) / Math.PI;
  const s = sigma * (1 + body * 0.8) * (0.75 + 0.45 * charge);
  yaw += rng.gauss() * s;
  elev += rng.gauss() * s * 0.55;
  const ce = Math.cos(elev);
  out.set(Math.sin(yaw) * ce * speed, Math.sin(elev) * speed, Math.cos(yaw) * ce * speed);
  const spin = rng.gauss() * 4;
  return { spin, point: T };
}

// ---------------------------------------------------------------------------
// Standing tackle: short range, rewards approaching the exposed side of the ball.
export function startTackle(match, p) {
  const now = match.time;
  if (now < p.tackleReadyAt || !canAct(match, p)) return false;
  const ball = match.ball;
  let dir = p.yaw;
  const d = ball.pos.distXZ(p.pos);
  // the human's tackle homes in on the ball from a little further away and
  // lunges quickly enough to reach it
  const homing = p.isHuman && d < 3.4 && ball.state !== 'held' && ball.state !== 'dead';
  if (d < 2.6 || homing) dir = yawOf(ball.pos.x + ball.vel.x * 0.15 - p.pos.x, ball.pos.z + ball.vel.z * 0.15 - p.pos.z);
  const lunge = homing ? clamp((d - 0.5) / 0.26 + 1.5, 4.2, 7.5) : 4.2;
  p.action = { type: 'tackle', t: 0, dir, done: false, dur: 0.5, victims: new Set(), homing, lunge };
  p.tackleReadyAt = now + RULES.TACKLE_COOLDOWN;
  p.faceYaw = dir;
  match.events.emit('tackleAttempt', { player: p, t: now });
  return true;
}

function updateTackle(match, p, a, dt) {
  const ball = match.ball, now = match.time;
  if (a.homing && !a.done && a.t < 0.2) {
    // keep tracking the ball during the first part of the lunge
    a.dir = yawOf(ball.pos.x + ball.vel.x * 0.1 - p.pos.x, ball.pos.z + ball.vel.z * 0.1 - p.pos.z);
  }
  p.faceYaw = a.dir;
  const fx = Math.sin(a.dir), fz = Math.cos(a.dir);
  if (a.t < (a.homing ? 0.28 : 0.22)) {
    // forward weight shift (a real lunge for the human)
    p.desired.x = fx * a.lunge; p.desired.z = fz * a.lunge;
  }
  const t0 = a.homing ? 0.04 : 0.07, t1 = a.homing ? 0.36 : 0.3;
  if (!a.done && a.t >= t0 && a.t <= t1) {
    const reachF = a.homing ? 1.2 : 1.05, hitR = a.homing ? 0.38 : 0.3;
    const ax = p.pos.x + fx * 0.2, az = p.pos.z + fz * 0.2;
    const bx = p.pos.x + fx * reachF, bz = p.pos.z + fz * reachF;
    const hit = pointSegDistXZ(ball.pos.x, ball.pos.z, ax, az, bx, bz);
    const owner = ball.owner;
    if (hit.d < hitR + BALL_R && ball.pos.y < 0.6 && ball.state !== 'held' && ball.state !== 'dead') {
      a.done = true;
      a.contactT = a.t;
      p.touch = { foot: 'R', time: now, x: ball.pos.x, y: ball.pos.y, z: ball.pos.z, kind: 'tackle' };
      if (owner && owner.team !== p.team) {
        // exposed side: tackler on the far side of the ball from its controller
        const ox = ball.pos.x - owner.pos.x, oz = ball.pos.z - owner.pos.z;
        const ol = Math.hypot(ox, oz) || 1;
        const tx = p.pos.x - ball.pos.x, tz = p.pos.z - ball.pos.z;
        const tl = Math.hypot(tx, tz) || 1;
        const exposure = (ox * tx + oz * tz) / (ol * tl); // 1 = ball fully exposed to tackler
        let chance = 0.56 + (p.attrs.tackling - owner.attrs.control) * 0.007 + exposure * 0.26 - clamp(owner.speed / 8, 0, 1) * 0.1;
        if (!p.isHuman && match.aiParams[p.team]) chance += match.aiParams[p.team].tackleBonus;
        if (p.isHuman) chance += match.assist.tackle;
        if (owner.isHuman) chance -= match.assist.oppProtect;
        chance = clamp(chance, owner.isHuman ? 0.1 : 0.18, p.isHuman ? 0.96 : 0.93);
        const success = match.rng.next() < chance;
        if (success && p.isHuman) {
          // the human's tackle knocks the ball back toward their own feet so it can be collected
          const lat = (match.rng.next() - 0.5) * 0.6;
          match.dislodge(owner, p, new V3(-fx * 1.3 + fz * lat, 0, -fz * 1.3 - fx * lat));
          a.dur = Math.min(a.dur, a.t + 0.08);
        } else if (success) {
          // dislodge the ball: it pops loose to the tackler's side
          const side = match.rng.next() < 0.5 ? -1 : 1;
          const px = -fx * 0.2 + fz * side * 0.6 + ox / ol * 0.5;
          const pz = -fz * 0.2 - fx * side * 0.6 + oz / ol * 0.5;
          const pl = Math.hypot(px, pz) || 1;
          const s = 2.2 + match.rng.next() * 1.8;
          match.dislodge(owner, p, new V3(px / pl * s, 0, pz / pl * s));
        } else {
          match.events.emit('tackle', { player: p, victim: owner, success: false, t: now });
          owner.stumbleUntil = Math.max(owner.stumbleUntil, now + 0.15);
        }
      } else if (!owner || owner === p) {
        if (p.isHuman) {
          // the human reaching a loose ball simply stops it at their feet
          ball.setVelocity(new V3(p.vel.x * 0.7, 0, p.vel.z * 0.7));
          ball.state = 'free'; ball.owner = null;
          match.touchBall(p, 'poke');
          a.dur = Math.min(a.dur, a.t + 0.05);
        } else {
          // loose ball poke
          const s = Math.max(3, ball.speed * 0.3);
          ball.setVelocity(new V3(fx * s, 0, fz * s));
          ball.state = 'free'; ball.owner = null;
          match.touchBall(p, 'poke');
        }
      }
    } else if (owner && owner.team !== p.team && !a.victims.has(owner)) {
      // body-first contact on the ball carrier
      const vd = pointSegDistXZ(owner.pos.x, owner.pos.z, ax, az, bx, bz).d;
      if (vd < 0.42) {
        a.victims.add(owner);
        const behind = Math.cos(owner.yaw) * (p.pos.z - owner.pos.z) + Math.sin(owner.yaw) * (p.pos.x - owner.pos.x) < -0.2;
        const pFoul = behind ? 0.6 : 0.18;
        if (match.rng.next() < pFoul) match.foul(p, owner, false);
      }
    }
  }
  if (a.t > a.dur) { p.action = null; p.faceYaw = null; }
}

// ---------------------------------------------------------------------------
// Slide tackle: long reach, longer recovery, limited by a cooldown and stamina.
export function startSlide(match, p) {
  const now = match.time;
  if (now < p.slideReadyAt || !canAct(match, p) || p.stamina < 0.06) return false;
  let dir = p.yaw;
  if (p.speed > 1.2) dir = yawOf(p.vel.x, p.vel.z);
  else if (p.desired.lenXZ() > 0.5) dir = yawOf(p.desired.x, p.desired.z);
  const speed0 = Math.max(p.speed + 1.2, 6.3);
  p.action = { type: 'slide', t: 0, dir, speed0, sliding: true, ballFirst: false, victims: new Set(), dur: 1.05 };
  p.slideReadyAt = now + RULES.SLIDE_COOLDOWN;
  p.stamina = Math.max(0, p.stamina - 0.07);
  match.events.emit('slide', { player: p, t: now });
  return true;
}

function updateSlide(match, p, a, dt) {
  const ball = match.ball, now = match.time;
  const fx = Math.sin(a.dir), fz = Math.cos(a.dir);
  p.faceYaw = a.dir;
  p.yaw = a.dir;
  if (a.sliding) {
    const k = clamp(1 - a.t / 0.68, 0, 1);
    const s = a.speed0 * Math.pow(k, 0.8);
    p.vel.set(fx * s, 0, fz * s);
    if (a.t > 0.62) { a.sliding = false; p.vel.set(fx * 0.4, 0, fz * 0.4); }
  } else {
    p.desired.set(0, 0, 0);
  }
  if (a.t > 0.04 && a.t < 0.62) {
    // extended leg along the ground
    const ax = p.pos.x + fx * 0.2, az = p.pos.z + fz * 0.2;
    const bx = p.pos.x + fx * 1.1, bz = p.pos.z + fz * 1.1;
    if (!a.ballDone && ball.state !== 'held' && ball.state !== 'dead' && ball.pos.y < 0.5) {
      const hit = pointSegDistXZ(ball.pos.x, ball.pos.z, ax, az, bx, bz);
      if (hit.d < 0.28 + BALL_R && !(ball.owner === p)) {
        a.ballDone = true; a.ballFirst = true;
        const owner = ball.owner;
        const side = match.rng.next() < 0.5 ? -1 : 1;
        const s = Math.max(4.5, ball.speed * 0.35);
        const v = new V3((fx + fz * side * 0.25) * s, 0.4, (fz - fx * side * 0.25) * s);
        p.touch = { foot: 'R', time: now, x: ball.pos.x, y: ball.pos.y, z: ball.pos.z, kind: 'slide' };
        if (owner && owner.team !== p.team) match.dislodge(owner, p, v, true);
        else { ball.owner = null; ball.state = 'free'; ball.setVelocity(v); match.touchBall(p, 'slide'); }
      }
    }
    for (const o of match.players) {
      if (o === p || o.team === p.team || a.victims.has(o)) continue;
      const d = pointSegDistXZ(o.pos.x, o.pos.z, p.pos.x, p.pos.z, bx, bz).d;
      if (d < 0.42) {
        a.victims.add(o);
        if (!a.ballFirst) {
          // late, body-first contact
          if (match.rng.next() < 0.85) match.foul(p, o, true);
          else o.downUntil = now + 0.7;
        } else if (match.rng.next() < 0.5) {
          o.stumbleUntil = now + 0.5; // tangled legs after winning the ball
        }
      }
    }
  }
  if (a.t > a.dur) { p.action = null; p.faceYaw = null; }
}
