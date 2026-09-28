// Authoritative ball simulation: gravity, drag, rolling resistance, energy-losing
// bounces, swept collisions (substeps) against posts, crossbar, nets and perimeter.
import { V3, clamp } from './vec.js';
import { BALL_R, BALL, G, GOAL, PITCH, WORLD } from './constants.js';

const R = BALL_R;

export class Ball {
  constructor() {
    this.pos = new V3(0, R, 0);
    this.prevPos = new V3(0, R, 0);
    this.vel = new V3();
    this.spin = new V3();      // angular velocity for rendering (rad/s)
    this.sideSpin = 0;         // vertical-axis spin used for gentle curl
    this.q = [0, 0, 0, 1];     // orientation quaternion (x, y, z, w)
    this.prevQ = [0, 0, 0, 1];
    this.state = 'dead';       // free | controlled | air | held | dead
    this.owner = null;         // controlling player (controlled/held)
    this.lastTouch = null;
    this.lastTouchTime = -10;
    this.lastKick = null;
    this.lastValid = new V3(0, R, 0);
    this.crossing = [null, null]; // per goal side: where the centre crossed the goal line
    this.net = [null, null];      // net contact for each goal: {x,y,z,depth,nx}
    this.version = 0;
    this.onGround = true;
  }

  place(x, z, y = R) {
    this.pos.set(x, y, z);
    this.prevPos.copy(this.pos);
    this.vel.set(0, 0, 0);
    this.spin.set(0, 0, 0);
    this.sideSpin = 0;
    this.crossing[0] = this.crossing[1] = null;
    this.version++;
  }

  setVelocity(v) {
    this.vel.copy(v);
    this.version++;
  }

  get speed() { return this.vel.len(); }
  get airborne() { return this.pos.y > R + 0.04 || Math.abs(this.vel.y) > 0.3; }
}

// Rolling ball closed forms: deceleration a = A0 + C v^2
export function rollDistance(v0, v1 = 0) {
  const A = BALL.ROLL_A0, C = BALL.ROLL_C;
  if (v0 <= v1) return 0;
  return Math.log((A + C * v0 * v0) / (A + C * v1 * v1)) / (2 * C);
}
export function rollTime(v0, v1 = 0) {
  const A = BALL.ROLL_A0, C = BALL.ROLL_C;
  const k = Math.sqrt(C / A), s = Math.sqrt(A * C);
  return (Math.atan(v0 * k) - Math.atan(v1 * k)) / s;
}
// speed needed to roll distance d and still be moving at arrive speed
export function rollSpeedFor(d, arrive) {
  const A = BALL.ROLL_A0, C = BALL.ROLL_C;
  const v2 = ((A + C * arrive * arrive) * Math.exp(2 * C * d) - A) / C;
  return Math.sqrt(Math.max(0, v2));
}
// speed after rolling distance d starting at v0 (0 if it stops before)
export function rollSpeedAfter(v0, d) {
  const A = BALL.ROLL_A0, C = BALL.ROLL_C;
  const v2 = ((A + C * v0 * v0) * Math.exp(-2 * C * d) - A) / C;
  return v2 > 0 ? Math.sqrt(v2) : 0;
}

const tmp = new V3();

function integrate(ball, h) {
  const v = ball.vel, p = ball.pos;
  const grounded = p.y <= R + 0.002 && Math.abs(v.y) < 0.05;
  ball.onGround = grounded;
  if (grounded) {
    p.y = R; v.y = 0;
    const s = Math.sqrt(v.x * v.x + v.z * v.z);
    if (s > 0) {
      const dec = (BALL.ROLL_A0 + BALL.ROLL_C * s * s) * h;
      const ns = s - dec;
      if (ns < 0.035) { v.x = 0; v.z = 0; } else { v.x *= ns / s; v.z *= ns / s; }
    }
    // rolling without slipping: w = up x v / R
    ball.spin.x = v.z / R; ball.spin.z = -v.x / R; ball.spin.y *= 0.96;
    ball.sideSpin *= 0.9;
  } else {
    v.y -= G * h;
    const sp = v.len();
    const k = BALL.AIR_DRAG * sp * h;
    v.x -= v.x * k; v.y -= v.y * k; v.z -= v.z * k;
    if (ball.sideSpin !== 0) {
      // Magnus effect from vertical-axis spin: a = k * w * (up x v)
      const m = BALL.MAGNUS * ball.sideSpin * h;
      const vx = v.x, vz = v.z;
      v.x += m * vz; v.z -= m * vx;
      ball.sideSpin *= 1 - 0.3 * h;
    }
    ball.spin.x *= 1 - 0.05 * h; ball.spin.y *= 1 - 0.05 * h; ball.spin.z *= 1 - 0.05 * h;
  }
  p.x += v.x * h; p.y += v.y * h; p.z += v.z * h;
}

function collideGround(ball, hooks) {
  const p = ball.pos, v = ball.vel;
  if (p.y < R) {
    p.y = R;
    if (v.y < -0.9) {
      const vin = -v.y;
      v.y = vin * BALL.BOUNCE * (vin > 7 ? 0.92 : 1);
      v.x *= BALL.BOUNCE_FRICTION; v.z *= BALL.BOUNCE_FRICTION;
      // bounce converts some spin
      ball.sideSpin *= 0.6;
      if (hooks && hooks.onBounce) hooks.onBounce(ball, vin);
    } else {
      v.y = 0;
    }
  }
}

// --- goal frame -----------------------------------------------------------
function collideCylinderVertical(ball, cx, cz, y0, y1, rad, e, hooks, what) {
  const p = ball.pos, v = ball.vel;
  if (p.y < y0 - R || p.y > y1 + R) return false;
  const dx = p.x - cx, dz = p.z - cz;
  const py = clamp(p.y, y0, y1);
  const dy = p.y - py;
  const d2 = dx * dx + dz * dz + dy * dy;
  const min = R + rad;
  if (d2 >= min * min || d2 < 1e-10) return false;
  const d = Math.sqrt(d2);
  const nx = dx / d, ny = dy / d, nz = dz / d;
  const pen = min - d;
  p.x += nx * pen; p.y += ny * pen; p.z += nz * pen;
  const vn = v.x * nx + v.y * ny + v.z * nz;
  if (vn < 0) {
    v.x -= (1 + e) * vn * nx; v.y -= (1 + e) * vn * ny; v.z -= (1 + e) * vn * nz;
    // tangential loss
    v.x *= 0.92; v.z *= 0.92; v.y *= 0.95;
    ball.sideSpin *= 0.3;
    ball.version++;
    if (hooks && hooks.onFrame && -vn > 1.2) hooks.onFrame(ball, -vn, what);
  }
  return true;
}

function collideCrossbar(ball, cx, cy, zr, rad, e, hooks) {
  const p = ball.pos, v = ball.vel;
  const pz = clamp(p.z, -zr, zr);
  const dx = p.x - cx, dy = p.y - cy, dz = p.z - pz;
  const d2 = dx * dx + dy * dy + dz * dz;
  const min = R + rad;
  if (d2 >= min * min || d2 < 1e-10) return false;
  const d = Math.sqrt(d2);
  const nx = dx / d, ny = dy / d, nz = dz / d;
  const pen = min - d;
  p.x += nx * pen; p.y += ny * pen; p.z += nz * pen;
  const vn = v.x * nx + v.y * ny + v.z * nz;
  if (vn < 0) {
    v.x -= (1 + e) * vn * nx; v.y -= (1 + e) * vn * ny; v.z -= (1 + e) * vn * nz;
    v.x *= 0.93; v.z *= 0.93;
    ball.version++;
    if (hooks && hooks.onFrame && -vn > 1.2) hooks.onFrame(ball, -vn, 'bar');
  }
  return true;
}

// back of the net: slanted plane from ground depth to roof depth
export function netBackX(y) {
  const t = clamp(y / GOAL.H, 0, 1);
  return PITCH.HL + GOAL.DEPTH + (GOAL.TOP_DEPTH - GOAL.DEPTH) * t;
}

const NET_MAX = 0.42;

// The net is soft and inelastic: it absorbs the ball's speed (more strongly the
// deeper it bulges) and only nudges it back gently, so the ball drops in the goal.
function netSoft(ball, nx, ny, nz, pen, h, gi) {
  // nx.. = inward normal (towards goal interior). pen = penetration beyond net surface
  const v = ball.vel;
  let vn = v.x * nx + v.y * ny + v.z * nz;
  if (vn < 0) {
    const k = Math.min(1, (35 + 900 * pen) * h);
    const dv = -vn * k;
    v.x += nx * dv; v.y += ny * dv; v.z += nz * dv;
  } else {
    const push = 40 * pen * h;
    v.x += nx * push; v.y += ny * push; v.z += nz * push;
    vn = v.x * nx + v.y * ny + v.z * nz;
    if (vn > 1.2) { const c = vn - 1.2; v.x -= nx * c; v.y -= ny * c; v.z -= nz * c; }
  }
  // friction along the mesh
  const f = 1 - Math.min(0.5, 4 * h);
  v.x *= f; v.z *= f;
  if (pen > NET_MAX) {
    const excess = pen - NET_MAX;
    ball.pos.x += nx * excess; ball.pos.y += ny * excess; ball.pos.z += nz * excess;
  }
  const n = ball.net[gi];
  if (!n || pen > n.depth) {
    ball.net[gi] = { x: ball.pos.x, y: ball.pos.y, z: ball.pos.z, depth: Math.min(pen, NET_MAX), nx, ny, nz, fresh: true };
  }
  ball.version++;
}

function collideGoal(ball, s, gi, h, hooks) {
  const p = ball.pos, v = ball.vel;
  const hl = PITCH.HL, hw = GOAL.HW, H = GOAL.H, pr = GOAL.POST_R;
  const ax = p.x * s; // x in goal-local positive direction
  if (ax < hl - 1.5 || ax > hl + GOAL.DEPTH + 1.0) return;
  // posts and crossbar sit on the goal line
  const px = s * (hl - pr);
  collideCylinderVertical(ball, px, hw + pr, 0, H + pr, pr, 0.62, hooks, 'post');
  collideCylinderVertical(ball, px, -(hw + pr), 0, H + pr, pr, 0.62, hooks, 'post');
  collideCrossbar(ball, px, H + pr, hw + pr, pr, 0.6, hooks);

  if (ax < hl - R) return;
  const back = netBackX(p.y);
  // a ball that entered through the mouth stays caught by the net even if a
  // very fast shot momentarily bulges past the net surfaces
  const cr = ball.crossing[gi];
  const inside = (cr && cr.inMouth && ax > hl) || (Math.abs(p.z) < hw && p.y < H && ax < back);
  if (inside) {
    // soft net from the inside
    const bx = back - ax;               // distance to back plane (approx along x)
    if (bx < R) {
      // slanted plane normal (inward): pointing -s in x plus slight y
      const slope = (GOAL.TOP_DEPTH - GOAL.DEPTH) / GOAL.H;
      let nx = -s, ny = slope; const l = Math.hypot(1, slope);
      nx /= l; ny /= l;
      netSoft(ball, nx, ny, 0, (R - bx) / l, h, gi);
    }
    if (hw - Math.abs(p.z) < R) {
      const sz = Math.sign(p.z) || 1;
      netSoft(ball, 0, 0, -sz, R - (hw - Math.abs(p.z)), h, gi);
    }
    if (H - p.y < R && ax > hl) {
      netSoft(ball, 0, -1, 0, R - (H - p.y), h, gi);
    }
    // hard limit: the net never lets the ball through
    const lim = netBackX(Math.min(p.y, H)) + 0.45;
    if (ax > lim) { p.x = s * lim; if (v.x * s > 0) v.x *= -0.1; }
    if (Math.abs(p.z) > hw + 0.45) { p.z = Math.sign(p.z) * (hw + 0.45); v.z *= -0.1; }
    if (p.y > H + 0.45) { p.y = H + 0.45; if (v.y > 0) v.y *= -0.1; }
  } else if (ax > hl - R && ax < back + R && p.y < H + R) {
    // outside of the net: firm, damped surface
    const dzOut = Math.abs(p.z) - hw;
    if (dzOut > -R && dzOut < R && ax > hl) {
      const sz = Math.sign(p.z) || 1;
      const pen = R - dzOut;
      p.z += sz * pen;
      if (v.z * sz < 0) { v.z = -v.z * 0.15; v.x *= 0.7; v.y *= 0.8; ball.version++; }
    } else if (p.y > H - R && Math.abs(p.z) < hw && ax > hl && ax < back) {
      const pen = R - (p.y - H);
      if (pen > 0) { p.y += pen; if (v.y < 0) { v.y = -v.y * 0.2; v.x *= 0.8; v.z *= 0.8; ball.version++; } }
    } else if (ax > back - R && ax < back + R && Math.abs(p.z) < hw && p.y < H) {
      const pen = back + R - ax;
      if (pen > 0) { p.x += s * pen; if (v.x * s < 0) { v.x = -v.x * 0.15; ball.version++; } }
    }
  }
}

function collideBoards(ball) {
  const p = ball.pos, v = ball.vel;
  if (p.x > WORLD.HL - R) { p.x = WORLD.HL - R; if (v.x > 0) v.x = -v.x * 0.3; }
  if (p.x < -WORLD.HL + R) { p.x = -WORLD.HL + R; if (v.x < 0) v.x = -v.x * 0.3; }
  if (p.z > WORLD.HW - R) { p.z = WORLD.HW - R; if (v.z > 0) v.z = -v.z * 0.3; }
  if (p.z < -WORLD.HW + R) { p.z = -WORLD.HW + R; if (v.z < 0) v.z = -v.z * 0.3; }
  if (p.y > 40) { p.y = 40; if (v.y > 0) v.y = 0; }
}

function trackCrossing(ball, prevX) {
  for (let gi = 0; gi < 2; gi++) {
    const s = gi === 0 ? 1 : -1;
    const a = prevX * s, b = ball.pos.x * s;
    if (a < PITCH.HL && b >= PITCH.HL) {
      ball.crossing[gi] = { z: ball.pos.z, y: ball.pos.y, inMouth: Math.abs(ball.pos.z) < GOAL.HW && ball.pos.y < GOAL.H };
    } else if (b < PITCH.HL - 0.5) {
      ball.crossing[gi] = null;
    }
  }
}

// Advance the ball by dt. hooks: {onBounce, onFrame, bodies(ball, h)}
export function stepBall(ball, dt, hooks) {
  ball.prevPos.copy(ball.pos);
  ball.prevQ[0] = ball.q[0]; ball.prevQ[1] = ball.q[1]; ball.prevQ[2] = ball.q[2]; ball.prevQ[3] = ball.q[3];
  if (ball.net[0]) ball.net[0].fresh = false;
  if (ball.net[1]) ball.net[1].fresh = false;
  if (ball.state === 'held' || ball.state === 'dead') {
    integrateRotation(ball, dt);
    return;
  }
  const speed = ball.vel.len();
  const n = Math.min(10, Math.max(1, Math.ceil((speed * dt) / 0.06)));
  const h = dt / n;
  for (let i = 0; i < n; i++) {
    const px = ball.pos.x;
    integrate(ball, h);
    collideGround(ball, hooks);
    collideGoal(ball, 1, 0, h, hooks);
    collideGoal(ball, -1, 1, h, hooks);
    collideBoards(ball);
    trackCrossing(ball, px);
    if (hooks && hooks.bodies) hooks.bodies(ball, h);
  }
  if (!ball.pos.isFinite() || !ball.vel.isFinite()) {
    ball.pos.copy(ball.lastValid); ball.vel.set(0, 0, 0); ball.version++;
  } else {
    ball.lastValid.copy(ball.pos);
  }
  if (ball.pos.y > R + 0.03 || ball.vel.y > 0.2) { if (ball.state === 'free') ball.state = 'air'; }
  else if (ball.state === 'air') ball.state = 'free';
  integrateRotation(ball, dt);
}

export function integrateRotation(ball, dt) {
  const w = ball.spin, q = ball.q;
  const hx = 0.5 * dt * w.x, hy = 0.5 * dt * w.y, hz = 0.5 * dt * w.z;
  const qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  // q += 0.5 * (0,w) * q * dt
  q[0] = qx + (hx * qw + hy * qz - hz * qy);
  q[1] = qy + (hy * qw + hz * qx - hx * qz);
  q[2] = qz + (hz * qw + hx * qy - hy * qx);
  q[3] = qw - (hx * qx + hy * qy + hz * qz);
  const l = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
  q[0] /= l; q[1] /= l; q[2] /= l; q[3] /= l;
}

// Predict a free ball's path ignoring players (used by AI, keepers and HUD).
// Writes into out: Float32Array of [x,y,z] per step of `step` seconds.
export class Trajectory {
  constructor(steps = 200, step = 1 / 60) {
    this.steps = steps; this.step = step;
    this.pts = new Float32Array(steps * 3);
    this.vel = new Float32Array(steps * 3);
    this.count = 0;
    this.t0 = 0;
    this.ghost = new Ball();
  }
  compute(ball, t0) {
    const g = this.ghost;
    g.pos.copy(ball.pos); g.vel.copy(ball.vel); g.sideSpin = ball.sideSpin;
    g.state = 'free'; g.spin.set(0, 0, 0);
    g.net[0] = g.net[1] = null;
    this.t0 = t0;
    const sub = 2, h = this.step / sub;
    let i = 0;
    for (; i < this.steps; i++) {
      this.pts[i * 3] = g.pos.x; this.pts[i * 3 + 1] = g.pos.y; this.pts[i * 3 + 2] = g.pos.z;
      this.vel[i * 3] = g.vel.x; this.vel[i * 3 + 1] = g.vel.y; this.vel[i * 3 + 2] = g.vel.z;
      for (let k = 0; k < sub; k++) {
        integrate(g, h);
        collideGround(g, null);
        collideGoal(g, 1, 0, h, null);
        collideGoal(g, -1, 1, h, null);
      }
      if (g.vel.x === 0 && g.vel.z === 0 && g.pos.y <= R + 0.001) { i++; break; }
    }
    // fill the rest with the resting point
    this.count = i;
    return this;
  }
  // position at time offset dt from t0
  at(dt, out) {
    let f = dt / this.step;
    if (f <= 0) f = 0;
    const i = Math.floor(f);
    if (i >= this.count - 1) {
      const j = (this.count - 1) * 3;
      return out.set(this.pts[j], this.pts[j + 1], this.pts[j + 2]);
    }
    const t = f - i, a = i * 3, b = a + 3;
    return out.set(
      this.pts[a] + (this.pts[b] - this.pts[a]) * t,
      this.pts[a + 1] + (this.pts[b + 1] - this.pts[a + 1]) * t,
      this.pts[a + 2] + (this.pts[b + 2] - this.pts[a + 2]) * t,
    );
  }
  velAt(dt, out) {
    let i = Math.floor(Math.max(0, dt) / this.step);
    if (i > this.count - 1) i = this.count - 1;
    return out.set(this.vel[i * 3], this.vel[i * 3 + 1], this.vel[i * 3 + 2]);
  }
  get duration() { return (this.count - 1) * this.step; }
}
