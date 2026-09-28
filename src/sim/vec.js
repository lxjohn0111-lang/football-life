// Small mutable vector + math helpers used by the simulation.
// The simulation never depends on three.js so it can run headless in Node.

export class V3 {
  constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
  set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
  copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
  clone() { return new V3(this.x, this.y, this.z); }
  add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
  sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
  addScaled(v, s) { this.x += v.x * s; this.y += v.y * s; this.z += v.z * s; return this; }
  scale(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
  subVectors(a, b) { this.x = a.x - b.x; this.y = a.y - b.y; this.z = a.z - b.z; return this; }
  len() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
  lenSq() { return this.x * this.x + this.y * this.y + this.z * this.z; }
  lenXZ() { return Math.sqrt(this.x * this.x + this.z * this.z); }
  dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
  dotXZ(v) { return this.x * v.x + this.z * v.z; }
  dist(v) { const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z; return Math.sqrt(dx * dx + dy * dy + dz * dz); }
  distXZ(v) { const dx = this.x - v.x, dz = this.z - v.z; return Math.sqrt(dx * dx + dz * dz); }
  normalize() { const l = this.len(); if (l > 1e-9) { this.x /= l; this.y /= l; this.z /= l; } return this; }
  flatNormalize() { this.y = 0; const l = Math.sqrt(this.x * this.x + this.z * this.z); if (l > 1e-9) { this.x /= l; this.z /= l; } return this; }
  lerp(v, t) { this.x += (v.x - this.x) * t; this.y += (v.y - this.y) * t; this.z += (v.z - this.z) * t; return this; }
  isFinite() { return Number.isFinite(this.x) && Number.isFinite(this.y) && Number.isFinite(this.z); }
}

export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const smoothstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
export const TAU = Math.PI * 2;

export function wrapAngle(a) {
  a = (a + Math.PI) % TAU;
  if (a < 0) a += TAU;
  return a - Math.PI;
}
export const angleDiff = (a, b) => wrapAngle(b - a);
// yaw 0 faces +z; direction = (sin yaw, 0, cos yaw)
export const yawOf = (x, z) => Math.atan2(x, z);
export const dirX = (yaw) => Math.sin(yaw);
export const dirZ = (yaw) => Math.cos(yaw);

export function turnTowards(cur, target, maxStep) {
  const d = angleDiff(cur, target);
  if (Math.abs(d) <= maxStep) return target;
  return wrapAngle(cur + Math.sign(d) * maxStep);
}

// distance from point p to segment ab in the XZ plane, returns {d, t}
export function pointSegDistXZ(px, pz, ax, az, bx, bz) {
  const abx = bx - ax, abz = bz - az;
  const l2 = abx * abx + abz * abz;
  let t = l2 > 1e-9 ? ((px - ax) * abx + (pz - az) * abz) / l2 : 0;
  t = clamp(t, 0, 1);
  const cx = ax + abx * t, cz = az + abz * t;
  const dx = px - cx, dz = pz - cz;
  return { d: Math.sqrt(dx * dx + dz * dz), t };
}

export function approach(cur, target, maxDelta) {
  if (cur < target) return Math.min(target, cur + maxDelta);
  return Math.max(target, cur - maxDelta);
}
