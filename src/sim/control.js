// Possession: claiming a loose ball, soft first touches, physical dribbling and
// ball-body deflections. Only one player can control the ball at a time.
import { V3, clamp, yawOf, angleDiff, pointSegDistXZ } from './vec.js';
import { RULES, BALL_R, PITCH, GOAL } from './constants.js';
import { netBackX } from './ball.js';
import { stanceFraction, strideLength } from './player.js';

function insideGoal(x, y, z) {
  const ax = Math.abs(x);
  return ax > PITCH.HL && Math.abs(z) < GOAL.HW + 0.05 && y < GOAL.H + 0.05 && ax < netBackX(y) + 0.05;
}

// Is the path from player to ball clear of other bodies and the goal frame/net?
export function lineOfSight(match, p, ball) {
  const px = p.pos.x, pz = p.pos.z, bx = ball.pos.x, bz = ball.pos.z;
  if (insideGoal(bx, ball.pos.y, bz) !== insideGoal(px, 0.5, pz)) return false;
  for (const q of match.players) {
    if (q === p) continue;
    const r = pointSegDistXZ(q.pos.x, q.pos.z, px, pz, bx, bz);
    if (r.t > 0.2 && r.t < 0.85 && r.d < 0.24) return false;
  }
  return true;
}

export function canClaim(match, p, ball) {
  const now = match.time;
  if (now < p.noCaptureUntil || now < p.downUntil) return false;
  const a = p.action;
  if (a) {
    if (a.type === 'slide' || a.type === 'dive' || a.type === 'tackle') return false;
    if (a.type === 'kick' && !a.contacted) return false;
  }
  if (p.isGK && match.keeperHandles(p, ball)) return false; // hands take over in the box
  const dx = ball.pos.x - p.pos.x, dz = ball.pos.z - p.pos.z;
  const d = Math.sqrt(dx * dx + dz * dz);
  // the human's receiving zone grows with the difficulty's assistance
  const radius = RULES.CONTROL_RADIUS * (p.isHuman ? match.assist.claim : 1);
  if (d > radius) return false;
  if (ball.pos.y > RULES.CONTROL_HEIGHT) return false;
  // wait for the ball to arrive near the feet unless it is passing by
  const approach = -(dx * (ball.vel.x - p.vel.x) + dz * (ball.vel.z - p.vel.z)) / (d || 1);
  if (d > 0.72 && approach > 0.6) return false;
  const rvx = ball.vel.x - p.vel.x, rvz = ball.vel.z - p.vel.z, rvy = ball.vel.y;
  const rel = Math.sqrt(rvx * rvx + rvz * rvz + rvy * rvy);
  const limit = (ball.pos.y > 0.35 ? 10.5 : 14.5) + p.attrs.control * 0.08 + (p.isHuman ? (match.assist.claim - 1) * 16 : 0);
  if (rel > limit) return false;
  // a fast ball must pass closer to the feet to be controlled
  if (d > radius * (1 - clamp((rel - 6) / 14, 0, 0.45))) return false;
  // nobody reacts instantly to a fresh kick they weren't expecting; opponents
  // are slower still to read the human's passes on easier difficulties
  const k = ball.lastKick;
  if (k && k.player !== p && k.target !== p && rel > 4) {
    const react = k.player && k.player.isHuman && match.isOpp(p) ? match.assist.oppHumanPassReact : 0.16;
    if (match.time - k.t < react) return false;
  }
  const o = ball.owner;
  if (o) {
    if (o.team === p.team) return false;
    const od = o.pos.distXZ(ball.pos);
    // the human's close control shields a wider zone on easier difficulties: opponents
    // have to tackle for it rather than simply stepping in
    const protect = RULES.PROTECT_RADIUS + (o.isHuman ? 0.5 * match.assist.stick : 0);
    if (od <= protect) return false;
    if (d >= od - 0.05) return false;
  }
  return lineOfSight(match, p, ball);
}

export function updateControl(match, dt) {
  const ball = match.ball;
  if (ball.state === 'held' || ball.state === 'dead') return;
  const now = match.time;
  const o = ball.owner;
  if (o) {
    const d = o.pos.distXZ(ball.pos);
    if (d > RULES.LOSE_RADIUS || ball.pos.y > 1.7 || now < o.downUntil || (o.action && o.action.type === 'slide')) {
      match.loseControl('loose');
    }
  }
  let best = null, bestD = 1e9;
  for (const p of match.players) {
    if (p === ball.owner) continue;
    if (!canClaim(match, p, ball)) continue;
    const d = p.pos.distXZ(ball.pos);
    // deterministic resolution: nearest wins, ties by id
    if (d < bestD - 1e-6 || (Math.abs(d - bestD) <= 1e-6 && best && p.id < best.id)) { best = p; bestD = d; }
  }
  if (best) {
    firstTouch(match, best);
    match.gainControl(best);
  }
  if (ball.owner && ball.state === 'controlled') dribble(match, ball.owner, dt);
}

// Soft first touch: kills the pace and places the ball naturally in front,
// into the direction the receiver wants to go.
export function firstTouch(match, p) {
  const ball = match.ball;
  const rvx = ball.vel.x - p.vel.x, rvz = ball.vel.z - p.vel.z;
  const rel = Math.sqrt(rvx * rvx + rvz * rvz + ball.vel.y * ball.vel.y);
  const ctl = p.attrs.control / 100;
  let heavy = clamp((rel - 4) / 15, 0, 1) * (1.15 - ctl * 0.7);
  if (p.isHuman) heavy *= match.assist.touch;
  else if (match.isOpp(p)) { const t = match.aiParams[p.team].touch; heavy = Math.min(1.2, heavy * t + 0.04 * (t - 1)); }
  const dl = Math.hypot(p.desired.x, p.desired.z);
  let dx, dz;
  if (dl > 1) { dx = p.desired.x / dl; dz = p.desired.z / dl; }
  else { dx = Math.sin(p.yaw); dz = Math.cos(p.yaw); }
  let push = 0.7 + heavy * 3.0 + (p.sprint && dl > 1 ? 1.2 : 0);
  if (p.isHuman) push *= 1 - 0.45 * match.assist.stick; // the ball drops close to the feet
  const err = match.rng.gauss() * heavy * 0.45;
  const c = Math.cos(err), s = Math.sin(err);
  const ex = dx * c + dz * s, ez = -dx * s + dz * c;
  const keep = dl > 1 ? 0.95 : 0.6;
  const vx = p.vel.x * keep + ex * push;
  const vz = p.vel.z * keep + ez * push;
  let vy = 0;
  if (ball.pos.y > 0.2) vy = Math.min(0, ball.vel.y) * 0.15 - 0.4;
  ball.setVelocity(new V3(vx, vy, vz));
  ball.sideSpin = 0;
  const side = (ball.pos.x - p.pos.x) * Math.cos(p.yaw) - (ball.pos.z - p.pos.z) * Math.sin(p.yaw);
  p.touch = { foot: side > 0 ? 'L' : 'R', time: match.time, x: ball.pos.x, y: ball.pos.y, z: ball.pos.z, kind: 'receive' };
  p.lastDribbleTouch = match.time;
  match.events.emit('touch', { player: p, kind: 'receive', strength: rel, t: match.time });
}

// Physical dribbling: short foot-contact impulses toward a point ahead.
function dribble(match, p, dt) {
  const a = p.action;
  if (a && ((a.type === 'kick' && !a.charging) || a.type === 'tackle' || a.type === 'slide')) return;
  const charging = !!(a && a.type === 'kick' && a.charging);
  if (p.isHuman && match.assist.stick > 0) { stickyDribble(match, p, dt, charging); return; }
  const ball = match.ball, now = match.time;
  if (now - (p.lastDribbleTouch || 0) < 0.14) return;
  if (ball.pos.y > 0.45) return;
  const dxb = ball.pos.x - p.pos.x, dzb = ball.pos.z - p.pos.z;
  const d = Math.hypot(dxb, dzb);
  if (d > 1.12) return;
  const dsp = Math.hypot(p.desired.x, p.desired.z);
  const sp = p.speed;
  const bvx = ball.vel.x, bvz = ball.vel.z;
  const bsp = Math.hypot(bvx, bvz);

  // desired movement and how the ball currently relates to it
  const moving = dsp >= 0.5;
  const mx = moving ? p.desired.x / dsp : Math.sin(p.yaw), mz = moving ? p.desired.z / dsp : Math.cos(p.yaw);
  const targetSpeed = moving ? Math.min(dsp, p.maxSpeed(p.sprint, true)) : 0;
  const sprinting = p.sprint && targetSpeed > p.jogSpeed() * 1.02;
  let lead = 0.45 + targetSpeed * 0.07 + (sprinting ? targetSpeed * 0.17 : 0);
  if (charging) lead = 0.4 + targetSpeed * 0.05; // setting up a shot: keep it close
  const dirOff = bsp > 1 && moving ? Math.abs(angleDiff(yawOf(bvx, bvz), yawOf(mx, mz))) : 0;
  const relV = (bvx - p.vel.x) * mx + (bvz - p.vel.z) * mz;
  const ahead0 = dxb * mx + dzb * mz;
  // urgent touches (sharp turns, ball escaping) don't wait for the next stride
  const urgent = moving && ((dirOff > 0.6 && bsp > 1.5) || (ahead0 > lead * 1.1 && relV > 1.2));

  // normal touch opportunities come from the gait: mid-swing of either foot
  let foot = null;
  if (sp > 1.3 && !urgent) {
    const stride = strideLength(sp);
    const beta = stanceFraction(stride);
    const mid = beta + (1 - beta) * 0.55;
    for (const [f, off] of [['L', 0], ['R', 0.5]]) {
      const u0 = ((p.prevGait - off) % 1 + 1) % 1, u1 = ((p.gait - off) % 1 + 1) % 1;
      if ((u0 < mid && u1 >= mid) || (u1 < u0 && (u0 < mid || u1 >= mid))) foot = f;
    }
    if (!foot) return;
  } else {
    if (!urgent && now - (p.lastDribbleTouch || 0) < 0.28) return;
    const side = dxb * Math.cos(p.yaw) - dzb * Math.sin(p.yaw);
    foot = side > 0 ? 'L' : 'R';
  }

  if (!moving) {
    // stopping: trap the ball under the sole if it is getting away
    const rel = Math.hypot(bvx - p.vel.x, bvz - p.vel.z);
    if (rel > 0.8 || bsp > 1.2) {
      ball.setVelocity(new V3(p.vel.x * 0.45, 0, p.vel.z * 0.45));
      touchFx(match, p, foot, 'stop', 1);
    }
    return;
  }
  if (ahead0 < -0.35 && sp > 2.5) return; // ball has fallen behind at speed; can't touch it forward

  const T = 0.26;
  const rx = dxb + (bvx - p.vel.x) * T, rz = dzb + (bvz - p.vel.z) * T;
  const relAhead = rx * mx + rz * mz;
  const lateral = Math.abs(rx * mz - rz * mx);
  const need = urgent || relAhead < lead * 0.6 || lateral > 0.3 || dirOff > 0.35 || (bsp < targetSpeed * 0.75 && relAhead < lead);
  if (!need) return;

  // Push the ball so its furthest point ahead of the player is about `lead`:
  // the ball decelerates (rolling resistance) while the player holds speed, so a
  // relative speed r0 buys a gain of r0^2 / (2a). The player's remaining
  // acceleration is accounted for so the ball doesn't run away from a standing start.
  const Tc = sprinting ? 1.0 : 0.8;
  const latNow = dxb * mz - dzb * mx;
  const vpAlong = p.vel.x * mx + p.vel.z * mz;
  const deficit = vpAlong < targetSpeed ? ((targetSpeed - vpAlong) ** 2) / (2 * 13) : 0;
  const gain = Math.max(0, lead - ahead0 - deficit);
  let along = targetSpeed;
  for (let k = 0; k < 2; k++) {
    const decel = 0.6 + 0.014 * along * along;
    along = targetSpeed + Math.sqrt(2 * decel * gain);
  }
  if (ahead0 > lead) along = targetSpeed - Math.min(1.5, (ahead0 - lead) * 1.5); // too far ahead: slow it
  along = clamp(along, targetSpeed * 0.6, targetSpeed + 3);
  const side = -latNow / Tc;
  const vx = mx * along + mz * side, vz = mz * along - mx * side;
  let v = Math.hypot(vx, vz) || 0.01;
  let ux = vx / v, uz = vz / v;
  // turning with a moving ball takes more than one touch at speed
  if (bsp > 2.5) {
    const maxTurn = sprinting ? 0.9 : 1.4;
    const cur = yawOf(bvx, bvz), want = yawOf(ux, uz);
    const diff = angleDiff(cur, want);
    if (Math.abs(diff) > maxTurn) {
      const y = cur + Math.sign(diff) * maxTurn;
      ux = Math.sin(y); uz = Math.cos(y);
      v = Math.min(v, targetSpeed * 0.8 + 1);
    }
  }
  // close control quality
  const ctl = p.attrs.control;
  let sig = (100 - ctl) * 0.00045 * (1 + sp / 6);
  if (p.isHuman) sig *= match.assist.touch;
  else if (match.isOpp(p)) sig *= match.aiParams[p.team].touch;
  const e = match.rng.gauss() * sig;
  const c = Math.cos(e), sn = Math.sin(e);
  const fx = ux * c + uz * sn, fz = -ux * sn + uz * c;
  v *= 1 + match.rng.gauss() * (100 - ctl) * 0.0012;
  ball.setVelocity(new V3(fx * v, 0, fz * v));
  touchFx(match, p, foot, 'dribble', v);
}

// Assisted close control for the human only: the ball is steered to a point just
// ahead of the feet (leading the run, biased toward where the player looks), so
// it stays with the player through turns and sprints. Opponents can still win it
// with tackles, slides and body blocks; feet still animate touches on the stride.
function stickyDribble(match, p, dt, charging) {
  const ball = match.ball, now = match.time;
  if (ball.pos.y > 0.9) return;
  const st = match.assist.stick;
  const fy = p.faceYaw != null ? p.faceYaw : p.yaw;
  const fx = Math.sin(fy), fz = Math.cos(fy);
  const dsp = Math.hypot(p.desired.x, p.desired.z);
  let dx = fx, dz = fz;
  if (dsp > 0.5) {
    const mx = p.desired.x / dsp, mz = p.desired.z / dsp;
    // running forward or sideways: the ball leads the run; backpedalling: drag it back in front
    if (mx * fx + mz * fz > -0.3) {
      dx = mx * 0.75 + fx * 0.25; dz = mz * 0.75 + fz * 0.25;
      const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l;
    }
  }
  const sp = Math.hypot(p.vel.x, p.vel.z);
  // about 0.5 m ahead when walking, ~0.85 m at a full sprint (inside the protected zone)
  let lead = charging ? 0.48 + sp * 0.03 : 0.45 + sp * 0.035 + (p.sprint ? sp * 0.02 : 0);
  lead *= 1 + (1 - st) * 0.5;
  const tx = p.pos.x + dx * lead, tz = p.pos.z + dz * lead;
  // spring toward the target on top of the player's own velocity
  const w = 5 + 6 * st;
  let vx = p.vel.x + (tx - ball.pos.x) * w, vz = p.vel.z + (tz - ball.pos.z) * w;
  const rvx = vx - p.vel.x, rvz = vz - p.vel.z, rl = Math.hypot(rvx, rvz), maxRel = 3.5 + 3.5 * st;
  if (rl > maxRel) { vx = p.vel.x + rvx / rl * maxRel; vz = p.vel.z + rvz / rl * maxRel; }
  const k = 1 - Math.exp(-(8 + 22 * st) * dt);
  ball.vel.x += (vx - ball.vel.x) * k;
  ball.vel.z += (vz - ball.vel.z) * k;
  ball.sideSpin = 0;
  // touches for the animation and sound: mid-swing of a foot, or a periodic tap when slow
  if (now - (p.lastDribbleTouch || 0) < 0.3) return;
  const bdx = ball.pos.x - p.pos.x, bdz = ball.pos.z - p.pos.z;
  if (Math.hypot(bdx, bdz) > 1.1) return;
  let foot = null;
  if (sp > 1.3) {
    const stride = strideLength(sp);
    const mid = stanceFraction(stride) + (1 - stanceFraction(stride)) * 0.55;
    for (const [f, off] of [['L', 0], ['R', 0.5]]) {
      const u0 = ((p.prevGait - off) % 1 + 1) % 1, u1 = ((p.gait - off) % 1 + 1) % 1;
      if ((u0 < mid && u1 >= mid) || (u1 < u0 && (u0 < mid || u1 >= mid))) foot = f;
    }
    if (!foot || now - (p.lastDribbleTouch || 0) < 0.42) return;
  } else {
    const rel = Math.hypot(ball.vel.x - p.vel.x, ball.vel.z - p.vel.z);
    if (rel < 0.6 || now - (p.lastDribbleTouch || 0) < 0.45) return;
    foot = bdx * Math.cos(p.yaw) - bdz * Math.sin(p.yaw) > 0 ? 'L' : 'R';
  }
  touchFx(match, p, foot, 'dribble', Math.hypot(ball.vel.x, ball.vel.z));
}

function touchFx(match, p, foot, kind, strength) {
  const ball = match.ball;
  p.touch = { foot, time: match.time, x: ball.pos.x, y: ball.pos.y, z: ball.pos.z, kind };
  p.lastDribbleTouch = match.time;
  ball.lastTouch = p; ball.lastTouchTime = match.time;
  match.events.emit('touch', { player: p, kind, strength, t: match.time });
}

// ball vs player bodies inside ball substeps: deflections, blocks and keeper saves
export function bodyCollisions(match, ball, h) {
  const now = match.time;
  for (const p of match.players) {
    if (p === ball.owner) continue;
    if (ball.lastTouch === p && now - p.lastKickAt < RULES.KICK_RELEASE_LOCK) continue;
    if (p.isGK && match.keeperHandles(p, ball)) {
      if (match.keeperContact(p, ball)) return;
      continue;
    }
    if (ball.pos.y > 1.9 + BALL_R) continue;
    const sliding = p.action && p.action.type === 'slide' && p.action.sliding;
    if (sliding && ball.pos.y > 0.55) continue;
    const dx = ball.pos.x - p.pos.x, dz = ball.pos.z - p.pos.z;
    const rad = (ball.pos.y < 0.95 ? 0.24 : 0.2) + BALL_R;
    const d2 = dx * dx + dz * dz;
    if (d2 >= rad * rad || d2 < 1e-8) continue;
    const d = Math.sqrt(d2);
    const nx = dx / d, nz = dz / d;
    ball.pos.x = p.pos.x + nx * rad; ball.pos.z = p.pos.z + nz * rad;
    const rvx = ball.vel.x - p.vel.x, rvz = ball.vel.z - p.vel.z;
    const vn = rvx * nx + rvz * nz;
    if (vn < 0) {
      ball.vel.x -= nx * vn * 1.3; ball.vel.z -= nz * vn * 1.3;
      ball.vel.y *= 0.7;
      ball.version++;
      const blockAt = ball.owner && ball.owner.isHuman ? 2.5 + 3 * match.assist.stick : 2.5;
      if (ball.owner && ball.owner.team !== p.team && -vn > blockAt) {
        // ran the ball into an opponent: it squirts loose
        match.loseControl('blocked');
      }
      if (-vn > 0.8) {
        ball.lastTouch = p; ball.lastTouchTime = now;
        match.events.emit('deflect', { player: p, speed: -vn, t: now });
      }
    }
  }
}
