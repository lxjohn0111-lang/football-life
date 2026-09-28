// Pass target selection, lane evaluation and kick velocity solvers.
// Assistance only shapes the initial kick. Once released the ball is pure physics.
import { V3, clamp, lerp, yawOf, angleDiff, wrapAngle } from './vec.js';
import { Ball, Trajectory, rollSpeedFor, rollTime, rollDistance } from './ball.js';
import { PITCH, GOAL, BALL_R, BALL, G } from './constants.js';

const tmpA = new V3(), tmpB = new V3();

export function passArriveSpeed(d) { return clamp(6.2 + d * 0.15, 6.5, 11.5); }

// Opponent interception risk along a ground pass lane. 1 = completely open.
export function laneOpenness(match, fx, fz, tx, tz, team, avgSpeed = 12, ignore = null) {
  const dx = tx - fx, dz = tz - fz;
  const L = Math.hypot(dx, dz);
  if (L < 0.01) return 1;
  const ux = dx / L, uz = dz / L;
  let risk = 0;
  const ps = match.players;
  for (let i = 0; i < ps.length; i++) {
    const o = ps[i];
    if (o.team === team || o === ignore) continue;
    if (match.time < o.downUntil) continue;
    const rx = o.pos.x - fx, rz = o.pos.z - fz;
    const along = rx * ux + rz * uz;
    const perp = Math.abs(rx * uz - rz * ux);
    // an opponent right on top of the ball blocks the pass at the source
    if (along > -0.4 && along < 0.9 && perp < 0.9) { risk = Math.max(risk, 0.9); continue; }
    if (along < 0.6 || along > L + 1.2) continue;
    const reach = o.isGK ? 1.5 : 0.95;
    const tb = Math.min(along, L) / avgSpeed;
    const to = Math.max(0, perp - reach) / 6.2 + 0.22;
    const r = clamp((tb - to + 0.3) / 0.55, 0, 1);
    if (r > risk) risk = r;
  }
  return 1 - risk;
}

// Estimated lead point for a moving receiver of a ground pass
export function leadPoint(from, target, out, leadFactor = 0.75, arriveBonus = 0) {
  out.set(target.pos.x, 0, target.pos.z);
  let T = 0;
  for (let it = 0; it < 3; it++) {
    const d = Math.hypot(out.x - from.x, out.z - from.z);
    const va = passArriveSpeed(d) + arriveBonus;
    const v0 = Math.min(26, rollSpeedFor(d, va));
    T = rollTime(v0, va);
    out.x = target.pos.x + target.vel.x * T * leadFactor;
    out.z = target.pos.z + target.vel.z * T * leadFactor;
  }
  clampInPitch(out, 0.8);
  return T;
}

export function clampInPitch(v, margin = 0.5) {
  v.x = clamp(v.x, -PITCH.HL + margin, PITCH.HL - margin);
  v.z = clamp(v.z, -PITCH.HW + margin, PITCH.HW - margin);
  return v;
}

// Choose the teammate the human is aiming at. `cone` is the half-angle (radians)
// the difficulty's pass assist allows; with a wide cone and nobody inside it the
// search widens further so a pass still finds a teammate.
export function choosePassTarget(match, p, aimYaw, prev, cone = 0.72) {
  let best = pickTarget(match, p, aimYaw, prev, cone);
  if (!best && cone >= 1.0) best = pickTarget(match, p, aimYaw, null, 1.6);
  return best;
}

function pickTarget(match, p, aimYaw, prev, cone) {
  let best = null, bestScore = -Infinity, prevScore = -Infinity;
  for (const t of match.players) {
    if (t === p || t.team !== p.team) continue;
    if (match.time < t.downUntil) continue;
    leadPoint(p.pos, t, tmpA, 0.6);
    const dx = tmpA.x - p.pos.x, dz = tmpA.z - p.pos.z;
    const d = Math.hypot(dx, dz);
    if (d < 2.2 || d > 48) continue;
    const ang = Math.abs(angleDiff(aimYaw, Math.atan2(dx, dz)));
    if (ang > cone) continue;
    const angScore = 1 - ang / cone;
    const distScore = d < 5 ? 0.55 : d < 26 ? 1 - Math.abs(d - 14) / 30 : Math.max(0, 0.6 - (d - 26) / 30);
    const open = laneOpenness(match, p.pos.x, p.pos.z, tmpA.x, tmpA.z, p.team, 12);
    let score = angScore * angScore * 1.8 + distScore * 0.45 + open * (cone > 0.9 ? 1.1 : 0.8);
    if (t.isGK) score -= 0.7;
    if (t === prev) { score += 0.3; prevScore = score; }
    if (score > bestScore) { bestScore = score; best = t; }
  }
  // hysteresis: only switch away from the previous target with a clear margin
  if (prev && best !== prev && prevScore > -Infinity && bestScore < prevScore + 0.12) best = prev;
  if (!best || bestScore < 0.35) return null;
  return best;
}

// --- velocity solvers -------------------------------------------------------

export function groundPassVelocity(from, to, arrive, out) {
  const dx = to.x - from.x, dz = to.z - from.z;
  const d = Math.hypot(dx, dz);
  const v0 = clamp(rollSpeedFor(d, arrive), 4, 27);
  out.set((dx / d) * v0, 0, (dz / d) * v0);
  return v0;
}

// Find arrival speed so a ground ball reaches distance d at time tr
export function throughArrive(d, tr) {
  let lo = 1.5, hi = 12;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    const t = rollTime(rollSpeedFor(d, mid), mid);
    if (t > tr) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

const ghost = new Ball();
// simulate a lofted ball (air only). Returns landing distance & time; fills hit info at target distance
function simulateAir(x, y, z, vx, vy, vz, spin, maxT, cb) {
  ghost.pos.set(x, y, z); ghost.vel.set(vx, vy, vz); ghost.sideSpin = spin;
  const h = 1 / 120;
  let t = 0;
  while (t < maxT) {
    const v = ghost.vel;
    v.y -= G * h;
    const sp = v.len();
    const k = BALL.AIR_DRAG * sp * h;
    v.x -= v.x * k; v.y -= v.y * k; v.z -= v.z * k;
    ghost.pos.addScaled(v, h);
    t += h;
    if (cb && cb(ghost.pos, t)) return t;
    if (ghost.pos.y < BALL_R) return t;
  }
  return t;
}

// Lofted ball from `from` landing near `to` at a given launch elevation (radians)
export function lobVelocity(from, fromY, to, elev, out) {
  const dx = to.x - from.x, dz = to.z - from.z;
  const d = Math.hypot(dx, dz);
  const ux = dx / d, uz = dz / d;
  const ce = Math.cos(elev), se = Math.sin(elev);
  let lo = 3, hi = 40;
  for (let i = 0; i < 22; i++) {
    const s = (lo + hi) / 2;
    simulateAir(from.x, fromY, from.z, ux * ce * s, se * s, uz * ce * s, 0, 6, null);
    const land = Math.hypot(ghost.pos.x - from.x, ghost.pos.z - from.z);
    if (land < d) lo = s; else hi = s;
  }
  const s = (lo + hi) / 2;
  out.set(ux * ce * s, se * s, uz * ce * s);
  return s;
}

// Solve launch elevation to pass through point (tx, ty, tz) at speed s.
export function aimElevation(fx, fy, fz, tx, ty, tz, speed) {
  const dx = tx - fx, dz = tz - fz;
  const d = Math.hypot(dx, dz);
  const ux = dx / d, uz = dz / d;
  let lo = -0.25, hi = 0.75;
  for (let i = 0; i < 20; i++) {
    const e = (lo + hi) / 2;
    let hitY = -100;
    simulateAir(fx, fy, fz, ux * Math.cos(e) * speed, Math.sin(e) * speed, uz * Math.cos(e) * speed, 0, 3,
      (pos) => {
        const along = (pos.x - fx) * ux + (pos.z - fz) * uz;
        if (along >= d) { hitY = pos.y; return true; }
        return false;
      });
    if (hitY === -100) hitY = -1; // fell short: needs more elevation
    if (hitY < ty) lo = e; else hi = e;
  }
  return (lo + hi) / 2;
}

// Does a free trajectory go into the goal? goalSign: +1 for the goal at +x.
// Uses the full ball model (bounces, posts) but ignores players.
const onTargetTraj = new Trajectory(240, 1 / 60);
const probe = new Ball();
export function trajectoryOnTarget(pos, vel, spin, goalSign) {
  probe.pos.copy(pos); probe.vel.copy(vel); probe.sideSpin = spin || 0;
  const tr = onTargetTraj.compute(probe, 0);
  const pts = tr.pts;
  for (let i = 1; i < tr.count; i++) {
    const x0 = pts[(i - 1) * 3] * goalSign, x1 = pts[i * 3] * goalSign;
    if (x0 < PITCH.HL && x1 >= PITCH.HL) {
      const f = (PITCH.HL - x0) / (x1 - x0 || 1);
      const z = pts[(i - 1) * 3 + 2] + (pts[i * 3 + 2] - pts[(i - 1) * 3 + 2]) * f;
      const y = pts[(i - 1) * 3 + 1] + (pts[i * 3 + 1] - pts[(i - 1) * 3 + 1]) * f;
      return Math.abs(z) < GOAL.HW && y < GOAL.H;
    }
  }
  return false;
}

// Visible angle of the goal mouth from a point (radians)
export function goalAngle(x, z, goalSign) {
  const gx = goalSign * PITCH.HL;
  const a1 = Math.atan2(GOAL.HW - z, Math.abs(gx - x));
  const a2 = Math.atan2(-GOAL.HW - z, Math.abs(gx - x));
  return Math.abs(a1 - a2);
}
