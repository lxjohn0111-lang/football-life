// Venue construction: the 64x42 pitch with accurate markings, goals, and six
// distinct locations. All static geometry is merged into one solid mesh and one
// edge batch (roles give each part its colour); crowds animate in the shader.
import * as THREE from 'three';
import { GeoBuilder, tBox, tSphere, tIco, tCone, tFrom } from './geometry.js';
import { R } from './palette.js';
import { PITCH, GOAL, AREA } from '../sim/constants.js';

export const VENUES = {
  community: { name: 'Community Ground', crowd: 130, loud: 0.35 },
  town: { name: 'Town Stadium', crowd: 520, loud: 0.55 },
  regional: { name: 'Regional Stadium', crowd: 1200, loud: 0.75 },
  premier: { name: 'Premier Arena', crowd: 2400, loud: 0.9 },
  continental: { name: 'Continental Stadium', crowd: 3400, loud: 1.0 },
  training: { name: 'Training Ground', crowd: 0, loud: 0 },
};

// deterministic pseudo random for decoration
function rnd(seed) { let s = seed >>> 0 || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
// a child generator for a detail whose piece count depends on quality: it takes one
// draw from the parent, so the rest of the venue is laid out the same at every quality
const fork = (rand) => rnd(Math.floor(rand() * 4294967296));

const LINE_W = 0.1;
const LY = 0.012;

function markingStrip(b, x0, z0, x1, z1) {
  const dx = x1 - x0, dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  const ry = Math.atan2(dx, dz);
  b.plane(R.LINES, LINE_W, len + LINE_W * 0.5, (x0 + x1) / 2, LY, (z0 + z1) / 2, { ry });
}

function arc(b, cx, cz, r, a0, a1, seg = 40) {
  for (let i = 0; i < seg; i++) {
    const t0 = a0 + (a1 - a0) * (i / seg), t1 = a0 + (a1 - a0) * ((i + 1) / seg);
    markingStrip(b, cx + Math.cos(t0) * r, cz + Math.sin(t0) * r, cx + Math.cos(t1) * r, cz + Math.sin(t1) * r);
  }
}

function spot(b, x, z, r = 0.12) {
  for (let i = 0; i < 4; i++) b.plane(R.LINES, r * 2, r * 0.9, x, LY, z, { ry: (i * Math.PI) / 4 });
}

export function buildPitch(b, o = {}) {
  const HL = PITCH.HL, HW = PITCH.HW;
  // mown stripes
  const n = 16, w = PITCH.L / n;
  for (let i = 0; i < n; i++) b.plane(i % 2 ? R.PITCH_A : R.PITCH_B, w, PITCH.W, -HL + w * (i + 0.5), 0, 0);
  // surround grass
  const ex = o.surroundX || 44, ez = o.surroundZ || 33;
  b.plane(R.SURROUND, ex * 2, ez - HW, 0, -0.004, HW + (ez - HW) / 2);
  b.plane(R.SURROUND, ex * 2, ez - HW, 0, -0.004, -HW - (ez - HW) / 2);
  b.plane(R.SURROUND, ex - HL, PITCH.W, HL + (ex - HL) / 2, -0.004, 0);
  b.plane(R.SURROUND, ex - HL, PITCH.W, -HL - (ex - HL) / 2, -0.004, 0);
  // boundary lines (outer edges on the playing-area edges)
  const h = LINE_W / 2;
  markingStrip(b, -HL, HW - h, HL, HW - h);
  markingStrip(b, -HL, -HW + h, HL, -HW + h);
  markingStrip(b, HL - h, -HW, HL - h, HW);
  markingStrip(b, -HL + h, -HW, -HL + h, HW);
  // halfway, centre circle, spot
  markingStrip(b, 0, -HW, 0, HW);
  arc(b, 0, 0, AREA.CIRCLE_R, 0, Math.PI * 2, 56);
  spot(b, 0, 0, 0.15);
  for (const s of [1, -1]) {
    const gx = s * HL;
    const px = gx - s * AREA.PEN_D;
    markingStrip(b, px, -AREA.PEN_HW, px, AREA.PEN_HW);
    markingStrip(b, gx, AREA.PEN_HW, px, AREA.PEN_HW);
    markingStrip(b, gx, -AREA.PEN_HW, px, -AREA.PEN_HW);
    const gax = gx - s * AREA.GOAL_D;
    markingStrip(b, gax, -AREA.GOAL_HW, gax, AREA.GOAL_HW);
    markingStrip(b, gx, AREA.GOAL_HW, gax, AREA.GOAL_HW);
    markingStrip(b, gx, -AREA.GOAL_HW, gax, -AREA.GOAL_HW);
    const sx = gx - s * AREA.SPOT;
    spot(b, sx, 0);
    // penalty arc outside the area
    const dx = Math.abs(px - sx);
    const a = Math.acos(Math.min(1, dx / AREA.ARC_R));
    const base = s > 0 ? Math.PI : 0;
    arc(b, sx, 0, AREA.ARC_R, base - a, base + a, 16);
    // corner arcs + flags
    for (const zs of [1, -1]) {
      // quarter circle from the goal line direction to the touchline direction, inside the pitch
      const tA = s > 0 ? Math.PI : 0;
      const tB = -zs * Math.PI / 2;
      let delta = tB - tA;
      while (delta > Math.PI) delta -= Math.PI * 2;
      while (delta < -Math.PI) delta += Math.PI * 2;
      arc(b, gx, zs * HW, AREA.CORNER_R, tA, tA + delta, 8);
      b.cyl(R.METAL, 0.02, 0.02, 1.5, 6, gx, 0.75, zs * HW);
      b.box(R.BANNER_HOME, 0.02, 0.26, 0.36, gx, 1.36, zs * HW - zs * 0.19);
    }
  }
}

export function buildGoals(b) {
  const pr = GOAL.POST_R;
  for (const s of [1, -1]) {
    const x = s * (PITCH.HL - pr);
    for (const zs of [1, -1]) b.cyl(R.GOAL_FRAME, pr, pr, GOAL.H + pr, 12, x, (GOAL.H + pr) / 2, zs * (GOAL.HW + pr));
    b.cyl(R.GOAL_FRAME, pr, pr, GOAL.W + pr * 4, 12, x, GOAL.H + pr, 0, { rx: Math.PI / 2 });
    // back frame
    const bx0 = s * (PITCH.HL + GOAL.DEPTH), bx1 = s * (PITCH.HL + GOAL.TOP_DEPTH);
    for (const zs of [1, -1]) {
      const z = zs * (GOAL.HW + pr);
      b.between(R.METAL, 0.03, bx0, 0.03, z, bx1, GOAL.H, z, 6);
      b.between(R.METAL, 0.03, x, GOAL.H + pr, z, bx1, GOAL.H, z, 6);
      b.between(R.METAL, 0.025, x, 0.03, z, bx0, 0.03, z, 6);
    }
    b.between(R.METAL, 0.03, bx1, GOAL.H, -(GOAL.HW + pr), bx1, GOAL.H, GOAL.HW + pr, 6);
    b.between(R.METAL, 0.025, bx0, 0.03, -(GOAL.HW + pr), bx0, 0.03, GOAL.HW + pr, 6);
  }
}

// net meshes: explicit line grid, deformed in the shader around impacts
export function buildNets() {
  const b = new GeoBuilder();
  const step = 0.2;
  for (const s of [1, -1]) {
    const x0 = s * PITCH.HL;
    const backX = (y) => s * (PITCH.HL + GOAL.DEPTH + (GOAL.TOP_DEPTH - GOAL.DEPTH) * (y / GOAL.H));
    const hw = GOAL.HW;
    // back
    for (let z = -hw; z <= hw + 1e-6; z += step) for (let y = 0; y < GOAL.H - 1e-6; y += step) b.line(backX(y), y, z, backX(y + step), y + step, z);
    for (let y = 0; y <= GOAL.H + 1e-6; y += step) for (let z = -hw; z < hw - 1e-6; z += step) b.line(backX(y), y, z, backX(y), y, z + step);
    // sides
    for (const zs of [1, -1]) {
      const z = zs * hw;
      for (let y = 0; y <= GOAL.H + 1e-6; y += step) {
        const bx = backX(y);
        const n = Math.max(1, Math.round(Math.abs(bx - x0) / step));
        for (let i = 0; i < n; i++) b.line(x0 + (bx - x0) * (i / n), y, z, x0 + (bx - x0) * ((i + 1) / n), y, z);
      }
      for (let i = 0; i <= 8; i++) {
        const f = i / 8;
        for (let y = 0; y < GOAL.H - 1e-6; y += step) {
          const xa = x0 + (backX(y) - x0) * f, xb = x0 + (backX(y + step) - x0) * f;
          b.line(xa, y, z, xb, y + step, z);
        }
      }
    }
    // roof
    const rx = backX(GOAL.H);
    const nr = Math.max(1, Math.round(Math.abs(rx - x0) / step));
    for (let z = -hw; z <= hw + 1e-6; z += step) for (let i = 0; i < nr; i++) b.line(x0 + (rx - x0) * (i / nr), GOAL.H, z, x0 + (rx - x0) * ((i + 1) / nr), GOAL.H, z);
    for (let i = 0; i <= nr; i++) for (let z = -hw; z < hw - 1e-6; z += step) b.line(x0 + (rx - x0) * (i / nr), GOAL.H, z, x0 + (rx - x0) * (i / nr), GOAL.H, z + step);
  }
  return b.buildEdges();
}

// ---------------------------------------------------------------------------
// local frame helper for structures facing the pitch
class Frame {
  constructor(b, cx, cz, ry) { this.b = b; this.cx = cx; this.cz = cz; this.ry = ry; this.c = Math.cos(ry); this.s = Math.sin(ry); }
  w(lx, lz) { return [this.cx + lx * this.c + lz * this.s, this.cz - lx * this.s + lz * this.c]; }
  box(role, w, h, d, lx, y, lz, o = {}) { const [x, z] = this.w(lx, lz); this.b.box(role, w, h, d, x, y, z, this.ry + (o.ry || 0), o); }
  cyl(role, r0, r1, h, seg, lx, y, lz, o = {}) { const [x, z] = this.w(lx, lz); this.b.cyl(role, r0, r1, h, seg, x, y, z, o); }
  sphere(role, r, lx, y, lz, o = {}) { const [x, z] = this.w(lx, lz); this.b.sphere(role, r, x, y, z, o); }
  quad(role, w, h, lx, y, lz, o = {}) { const [x, z] = this.w(lx, lz); this.b.quad(role, w, h, x, y, z, this.ry + Math.PI + (o.ry || 0), o); }
}

const CROWD_ROLES = [R.CROWD_1, R.CROWD_1, R.CROWD_1, R.CROWD_2, R.CROWD_3, R.CROWD_4, R.CROWD_1, R.CROWD_3];
const SKINS = [R.SKIN_1, R.SKIN_2, R.SKIN_3];

// A fan: body, head, and on higher quality shoulders and arms (some raised). Some
// wear a scarf in their club's colour or a bobble hat. Everyone bobs with the crowd.
function person(f, lx, y, lz, rand, seated = true, arms = true) {
  const role = CROWD_ROLES[Math.floor(rand() * CROWD_ROLES.length)];
  const bob = [rand(), 1];
  const h = seated ? 0.46 : 0.62;
  const team = rand() < 0.5 ? R.CROWD_1 : R.CROWD_2;
  f.box(role, 0.42, h, 0.27, lx, y + h / 2, lz, { bob });
  const [x, z] = f.w(lx, lz);
  const skin = SKINS[Math.floor(rand() * 3)];
  f.b.add(tIco(0.135, 0), GeoBuilder.mat(x, y + h + 0.16, z, 0, rand() * 6, 0), skin, { bob });
  // arms, scarves and hats are fine detail: their ink fades out in the far stands
  if (arms) {
    const up = rand() < 0.14;
    for (const s of [-1, 1]) {
      if (up) f.box(role, 0.1, 0.42, 0.11, lx + s * 0.25, y + h + 0.18, lz, { bob, rz: s * 0.25, detail: true });
      else f.box(role, 0.1, h * 0.8, 0.12, lx + s * 0.26, y + h * 0.56, lz - 0.02, { bob, detail: true });
    }
  }
  const extra = rand();
  if (extra < 0.18) f.box(team, 0.46, 0.09, 0.3, lx, y + h - 0.02, lz, { bob, detail: true });
  else if (extra < 0.3) { const [hx, hz] = f.w(lx, lz); f.b.add(tCone(0.12, 0.2, 6), GeoBuilder.mat(hx, y + h + 0.3, hz), team, { bob, detail: true }); }
}

// A tiered stand. Local frame: x along the stand, z away from the pitch.
function stand(b, o, rand, stats) {
  const f = new Frame(b, o.cx, o.cz, o.ry);
  const rows = o.rows, rd = o.rowDepth || 0.85, rh = o.rowHeight || 0.42, base = o.base || 0.6, len = o.len;
  const z0 = o.z0 || 0;
  const roles = o.roles || [R.STAND_A, R.STAND_B];
  // front wall with a railing on top
  f.box(o.wallRole || R.CONCRETE, len, base, 0.3, 0, base / 2, z0 - 0.15);
  const posts = Math.max(2, Math.round(len / 2.2));
  b.fine(() => {
    for (let i = 0; i <= posts; i++) f.cyl(R.METAL, 0.03, 0.03, 0.95, 5, -len / 2 + (len * i) / posts, base + 0.47, z0 - 0.15);
    const [ax, az] = f.w(-len / 2, z0 - 0.15), [bx, bz] = f.w(len / 2, z0 - 0.15);
    b.between(R.METAL, 0.035, ax, base + 0.95, az, bx, base + 0.95, bz, 6); b.line(ax, base + 0.5, az, bx, base + 0.5, bz);
  });
  // aisles with steps split the rows of seats into blocks
  const nAisle = Math.max(1, Math.round(len / 13));
  const aisles = [];
  for (let k = 1; k < nAisle + 1; k++) aisles.push(-len / 2 + (len * k) / (nAisle + 1));
  const aw = 1.1;
  for (let i = 0; i < rows; i++) {
    const y = base + i * rh;
    const tread = roles[Math.floor(i / (o.band || 2)) % roles.length];
    const seatRole = roles[(Math.floor(i / (o.band || 2)) + 1) % roles.length];
    f.box(tread, len, rh, rd, 0, y + rh / 2, z0 + rd * (i + 0.5));
    // seat backs along the row, broken at each aisle, and half-height steps in the aisles
    const edges = [-len / 2, ...aisles.flatMap((ax) => [ax - aw / 2, ax + aw / 2]), len / 2];
    b.fine(() => {
      for (let k = 0; k < edges.length; k += 2) {
        const a0 = edges[k] + 0.1, a1 = edges[k + 1] - 0.1;
        if (a1 - a0 > 0.4) f.box(seatRole, a1 - a0, 0.3, 0.07, (a0 + a1) / 2, y + rh + 0.15, z0 + rd * (i + 1) - 0.1);
      }
      for (const ax of aisles) f.box(R.CONCRETE, aw - 0.1, rh / 2, rd / 2, ax, y + rh + rh / 4, z0 + rd * (i + 0.25));
    });
    // seats on this row (spectators are sampled later to a fixed budget)
    if (o.density > 0) {
      const n = Math.floor(len / 0.62);
      for (let k = 0; k < n; k++) {
        const lx = -len / 2 + 0.31 + k * 0.62 + (rand() - 0.5) * 0.1;
        if (aisles.some((ax) => Math.abs(lx - ax) < aw / 2 + 0.15)) continue; // nobody sits on the steps
        stats.seats.push({ f, lx, y: y + rh, lz: z0 + rd * (i + 0.5) + 0.05, w: o.density, seated: true, row: i + (o.z0 ? 20 : 0) });
      }
    }
  }
  const top = base + rows * rh;
  const back = z0 + rd * rows;
  // back wall and side walls
  f.box(o.wallRole || R.CONCRETE, len + 0.4, top + 1.4, 0.35, 0, (top + 1.4) / 2, back + 0.17);
  for (const sx of [-1, 1]) f.box(o.wallRole || R.CONCRETE, 0.35, top + 0.6, back - z0, sx * (len / 2 + 0.17), (top + 0.6) / 2, z0 + (back - z0) / 2);
  if (o.roof) {
    const rh2 = top + (o.roofClear || 3.2);
    const depth = back - z0 + 1.5;
    const ncol = Math.max(2, Math.round(len / 12));
    for (let i = 0; i <= ncol; i++) {
      const lx = -len / 2 + (len * i) / ncol;
      f.cyl(R.METAL, 0.16, 0.16, rh2, 8, lx, rh2 / 2, back + 0.1);
    }
    f.box(o.roofRole || R.ROOF, len + 1.2, 0.35, depth, 0, rh2, back - depth / 2 + 0.6, { rx: -0.07 });
    f.box(R.METAL, len + 1.2, 0.5, 0.25, 0, rh2 - 0.3, back - depth + 0.7);
    // roof trusses: a braced triangle over every column, and a purlin under the roof
    b.detail = true;
    const front = back - depth + 0.7;
    const slope = Math.tan(0.07);
    for (let i = 0; i <= ncol; i++) {
      const lx = -len / 2 + (len * i) / ncol;
      const [cx, cz] = f.w(lx, back + 0.1), [fx, fz] = f.w(lx, front);
      const yTop = rh2 - 0.2, yFront = rh2 - 0.2 + (back + 0.1 - front) * -slope;
      b.between(R.METAL, 0.07, cx, yTop, cz, fx, yFront, fz, 5);
      const n = 6;
      for (let k = 0; k < n; k++) {
        const t0 = k / n, t1 = (k + 1) / n;
        const [ax, az] = f.w(lx, back + 0.1 + (front - back - 0.1) * t0), [bx2, bz2] = f.w(lx, back + 0.1 + (front - back - 0.1) * t1);
        const y0 = yTop + (yFront - yTop) * t0, y1 = yTop + (yFront - yTop) * t1;
        const drop = 1.1 * (1 - t0) + 0.2, drop1 = 1.1 * (1 - t1) + 0.2;
        b.line(ax, y0, az, bx2, y1 - drop1, bz2);
        b.line(ax, y0 - drop, az, bx2, y1 - drop1, bz2);
      }
    }
    for (const t of [0.35, 0.7]) {
      const lzp = back + 0.1 + (front - back - 0.1) * t;
      const [ax, az] = f.w(-len / 2, lzp), [bx2, bz2] = f.w(len / 2, lzp);
      const yp = rh2 - 0.25 + (back + 0.1 - lzp) * -slope;
      b.between(R.METAL, 0.05, ax, yp, az, bx2, yp, bz2, 5);
    }
    b.detail = false;
  }
  if (o.banners) {
    const nb = Math.max(1, Math.floor(len / 10));
    for (let i = 0; i < nb; i++) {
      const lx = -len / 2 + (len * (i + 0.5)) / nb;
      f.box(i % 2 ? R.BANNER_HOME : R.GOLD, 5, 0.9, 0.06, lx, base * 0.55 + 0.3, z0 - 0.35);
    }
  }
  return { top, back };
}

// lattice floodlight tower: four tapering legs with cross bracing, a ladder, a
// platform with a railing and a head of round lamps aimed at the pitch
function floodlight(b, x, z, h) {
  const ry = Math.atan2(-x, -z);
  const f = new Frame(b, x, z, ry);
  const r0 = 1.0, r1 = 0.4;
  const corner = (sx, sz, t) => { const r = r0 + (r1 - r0) * t; return f.w(sx * r, sz * r); };
  const C = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  for (const [sx, sz] of C) { const [ax, az] = corner(sx, sz, 0), [bx, bz] = corner(sx, sz, 1); b.between(R.METAL, 0.07, ax, 0, az, bx, h, bz, 6); }
  // zigzag (Warren) bracing on each face: light enough to read as a lattice from afar
  b.detail = true;
  const panels = Math.round(h / 3);
  for (let k = 0; k < panels; k++) {
    const t0 = k / panels, t1 = (k + 1) / panels;
    for (let c = 0; c < 4; c++) {
      const [sa, za] = C[c], [sb, zb] = C[(c + 1) % 4];
      const [a0x, a0z] = corner(sa, za, t0), [b0x, b0z] = corner(sb, zb, t0), [a1x, a1z] = corner(sa, za, t1), [b1x, b1z] = corner(sb, zb, t1);
      if (k % 2) b.line(a0x, h * t0, a0z, b1x, h * t1, b1z); else b.line(b0x, h * t0, b0z, a1x, h * t1, a1z);
      if (k % 2) b.line(a1x, h * t1, a1z, b1x, h * t1, b1z);
    }
  }
  // ladder up the back
  for (const dx of [-0.2, 0.2]) { const [ax, az] = f.w(dx, 1.05), [bx, bz] = f.w(dx, 0.45); b.line(ax, 0.2, az, bx, h, bz); }
  for (let k = 1; k < h / 0.6; k++) { const t = (k * 0.6) / h, lz = 1.05 + (0.45 - 1.05) * t; const [ax, az] = f.w(-0.2, lz), [bx, bz] = f.w(0.2, lz); b.line(ax, k * 0.6, az, bx, k * 0.6, bz); }
  // platform and railing
  f.box(R.METAL, 3.2, 0.15, 1.6, 0, h, 0);
  for (const [px, pz] of [[-1.6, -0.8], [1.6, -0.8], [1.6, 0.8], [-1.6, 0.8]]) f.cyl(R.METAL, 0.03, 0.03, 1.0, 5, px, h + 0.5, pz);
  for (const [ax0, az0, bx0, bz0] of [[-1.6, -0.8, 1.6, -0.8], [1.6, -0.8, 1.6, 0.8], [1.6, 0.8, -1.6, 0.8], [-1.6, 0.8, -1.6, -0.8]]) {
    const [ax, az] = f.w(ax0, az0), [bx, bz] = f.w(bx0, bz0);
    b.line(ax, h + 1.0, az, bx, h + 1.0, bz);
  }
  b.detail = false;
  // head: frame tilted towards the pitch with a grid of round lamps
  f.box(R.METAL, 4.2, 2.8, 0.22, 0, h + 2.4, 0.3, { rx: 0.35 });
  const tilt = 0.35;
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
    const lx = -1.5 + i * 1.0, ly = -0.9 + j * 0.9;
    const y = h + 2.4 + ly * Math.cos(tilt), lz = 0.3 - 0.2 - ly * Math.sin(tilt);
    f.cyl(R.METAL, 0.36, 0.36, 0.3, 10, lx, y, lz, { rx: Math.PI / 2 + tilt });
    f.cyl(R.LAMP, 0.29, 0.29, 0.32, 10, lx, y, lz - 0.02, { rx: Math.PI / 2 + tilt });
  }
}

// advertising boards around the perimeter, words facing the pitch
function adBoards(b, atlas, words) {
  const H = 0.9, zEdge = 28.6, xEdge = 39.6;
  let wi = 0;
  // alongZ: board line runs along z at x = fixed, otherwise along x at z = fixed
  const seg = (fixed, from, to, alongZ, faceRy) => {
    const len = Math.abs(to - from);
    const n = Math.max(1, Math.round(len / 8));
    const l = len / n;
    for (let i = 0; i < n; i++) {
      const c = Math.min(from, to) + l * (i + 0.5);
      const cx = alongZ ? fixed : c, cz = alongZ ? c : fixed;
      b.box(i % 2 ? R.BOARD_A : R.BOARD_B, l - 0.06, H, 0.12, cx, H / 2, cz, alongZ ? Math.PI / 2 : 0);
      const off = 0.075;
      const px = cx + (alongZ ? -Math.sign(fixed) * off : 0), pz = cz + (alongZ ? 0 : -Math.sign(fixed) * off);
      const word = words[wi++ % words.length];
      b.quad(i % 3 === 0 ? R.BANNER_HOME : R.INK, Math.min(l - 0.6, 6), 0.62, px, H / 2, pz, faceRy, { uvRect: atlas.word(word) });
    }
  };
  seg(zEdge, -xEdge, xEdge, false, Math.PI);
  seg(-zEdge, -xEdge, xEdge, false, 0);
  seg(xEdge, -zEdge + 1, -GOAL.HW - 4, true, -Math.PI / 2);
  seg(xEdge, GOAL.HW + 4, zEdge - 1, true, -Math.PI / 2);
  seg(-xEdge, -zEdge + 1, -GOAL.HW - 4, true, Math.PI / 2);
  seg(-xEdge, GOAL.HW + 4, zEdge - 1, true, Math.PI / 2);
}

// dugouts: back wall, curved perspex canopy on a frame, glass ends and bucket seats
function dugouts(b, z = 27.2) {
  for (const [x, seatRole] of [[-9, R.BANNER_HOME], [9, R.BANNER_AWAY]]) {
    const f = new Frame(b, x, z, 0);
    f.box(R.STAND_C, 7, 2.3, 0.15, 0, 1.15, 1.0);
    f.box(R.CONCRETE, 7.2, 0.12, 1.9, 0, 0.06, 0.25);
    // canopy: four panels bending from the back wall over the front
    const arc = [[1.0, 2.3], [0.55, 2.42], [0.0, 2.38], [-0.5, 2.2], [-0.8, 1.9]];
    for (let k = 0; k < arc.length - 1; k++) {
      const [z0, y0] = arc[k], [z1, y1] = arc[k + 1];
      const len = Math.hypot(z1 - z0, y1 - y0);
      f.box(R.GLASS, 7.1, 0.05, len, 0, (y0 + y1) / 2, (z0 + z1) / 2, { rx: Math.atan2(y1 - y0, z0 - z1) });
    }
    for (const sx of [-1, 1]) {
      f.box(R.GLASS, 0.06, 1.9, 1.6, sx * 3.55, 1.2, 0.2);
      f.box(R.METAL, 0.1, 2.3, 0.1, sx * 3.55, 1.15, -0.7);
    }
    b.fine(() => {
      for (let i = 0; i < 7; i++) {
        const lx = -2.85 + i * 0.95;
        f.box(seatRole, 0.5, 0.08, 0.45, lx, 0.48, 0.62);
        f.box(seatRole, 0.5, 0.5, 0.07, lx, 0.72, 0.86, { rx: -0.12 });
        f.box(R.METAL, 0.06, 0.44, 0.06, lx, 0.22, 0.62);
      }
    });
  }
}

// Medium quality trims small scenery details (glazing bars, some tree clumps and bush
// lumps); Low simplifies further (no garden fences, tile courses or tree branches)
let lowDetail = false, midDetail = false;

// ---------------------------------------------------------------- trees
// pine: trunk and four stacked tiers; broadleaf: branching trunk under a crown of
// leafy clumps; poplar: tall narrow crown. Two foliage tones for depth.
function tree(b, x, z, s, parentRand, kind) {
  const k = kind || (parentRand() < 0.45 ? 'pine' : parentRand() < 0.75 ? 'broadleaf' : 'poplar');
  const rand = fork(parentRand);
  const lean = (rand() - 0.5) * 0.06;
  if (k === 'pine') {
    b.cyl(R.TRUNK, 0.14 * s, 0.24 * s, 2.4 * s, 7, x, 1.2 * s, z);
    const tiers = lowDetail ? 3 : 4;
    for (let i = 0; i < tiers; i++) {
      const t = i / tiers;
      const r = (1.95 - t * 1.25) * s, h = (2.5 - t * 0.7) * s;
      b.cone(i % 2 ? R.TREE_2 : R.TREE, r, h, 9, x + lean * i, (1.9 + t * 3.6) * s + h / 2, z, { ry: rand() * 3, rz: lean });
    }
  } else if (k === 'poplar') {
    b.cyl(R.TRUNK, 0.12 * s, 0.2 * s, 2.2 * s, 7, x, 1.1 * s, z);
    b.add(tIco(1, 1), GeoBuilder.mat(x, 4.6 * s, z, 0, rand() * 3, lean, 1.25 * s, 3.1 * s, 1.25 * s), R.TREE_2);
    b.add(tIco(1, 1), GeoBuilder.mat(x + 0.35 * s, 3.6 * s, z - 0.3 * s, 0, rand() * 3, 0, 1.0 * s, 1.9 * s, 1.0 * s), R.TREE);
  } else {
    // broadleaf: trunk, three branches and a dome of clumps
    const th = 2.6 * s;
    b.cyl(R.TRUNK, 0.18 * s, 0.3 * s, th, 8, x, th / 2, z);
    const clumps = [];
    const extra = lowDetail ? 1 : midDetail ? 2 : 3;
    for (let i = 0; i < extra; i++) {
      const a = rand() * Math.PI * 2 + i * 2.1, len = (1.3 + rand() * 0.6) * s;
      const bx = x + Math.cos(a) * len, bz = z + Math.sin(a) * len, by = th + (0.9 + rand() * 0.6) * s;
      b.between(R.TRUNK, 0.1 * s, x, th - 0.4 * s, z, bx, by, bz, 6);
      clumps.push([bx, by + 0.5 * s, bz, (1.3 + rand() * 0.4) * s]);
    }
    clumps.push([x, th + 2.3 * s, z, 1.7 * s]);
    for (let i = 0; i < extra; i++) { const a = rand() * Math.PI * 2; clumps.push([x + Math.cos(a) * 1.1 * s, th + (1.1 + rand() * 1.2) * s, z + Math.sin(a) * 1.1 * s, (1.1 + rand() * 0.4) * s]); }
    clumps.forEach(([cx, cy, cz, r], i) => b.add(tIco(1, 1), GeoBuilder.mat(cx, cy, cz, rand() * 3, rand() * 3, 0, r, r * 0.85, r), i % 2 ? R.TREE_2 : R.TREE));
  }
}

function bush(b, x, z, s, parentRand, role = R.HEDGE) {
  const rand = fork(parentRand);
  const n = 2 + Math.floor(rand() * 2) - (midDetail && s < 1 ? 1 : 0);
  for (let i = 0; i < n; i++) {
    const r = (0.45 + rand() * 0.3) * s;
    b.add(tIco(1, 1), GeoBuilder.mat(x + (i - (n - 1) / 2) * 0.55 * s, r * 0.75, z + (rand() - 0.5) * 0.4 * s, 0, rand() * 3, 0, r, r * 0.8, r), i % 2 ? role : R.TREE_2);
  }
}

// ---------------------------------------------------------------- houses
// unit pyramid (1 x 1 base, height 1) for hip roofs, scaled per building
const pyramidT = () => tFrom('pyramid', () => { const g = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4); g.rotateY(Math.PI / 4); return g; }, 30);
function roof(b, x, y, z, w, h, d, ry, role = R.ROOF_TILE) { b.add(pyramidT(), GeoBuilder.mat(x, y + h / 2, z, 0, ry, 0, w, h, d), role); }
// unit gable prism: ridge along x, 1 wide (z) at the base, apex at y 1
const prismT = () => tFrom('prism', () => {
  const v = [
    [-0.5, 0, -0.5], [0.5, 0, -0.5], [0.5, 0, 0.5], [-0.5, 0, 0.5], [-0.5, 1, 0], [0.5, 1, 0],
  ];
  // counter-clockwise from outside: gable ends, front and back slopes, base
  const tri = [[0, 3, 4], [1, 5, 2], [0, 5, 1], [0, 4, 5], [3, 5, 4], [3, 2, 5], [0, 2, 3], [0, 1, 2]];
  const pos = [];
  for (const t of tri) for (const i of t) pos.push(...v[i]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
}, 30);

// a gable roof over a w x d footprint in frame f (ridge along local x), with tile
// courses drawn as ink lines, a ridge cap and gable walls underneath
function gableRoof(f, w, d, h, rise, ov, wallRole) {
  const b = f.b;
  const [cx, cz] = f.w(0, 0);
  b.add(prismT(), GeoBuilder.mat(cx, h - 0.02, cz, 0, f.ry, 0, w - 0.02, rise - 0.08, d - 0.02), wallRole);
  b.add(prismT(), GeoBuilder.mat(cx, h, cz, 0, f.ry, 0, w + ov * 2, rise + 0.12, d + ov * 2), R.ROOF_TILE);
  f.box(R.ROOF_TILE, w + ov * 2 + 0.1, 0.12, 0.2, 0, h + rise + 0.1, 0);
  const courses = lowDetail ? 0 : Math.max(2, Math.round(rise / 0.45));
  b.detail = true;
  for (let i = 1; i < courses; i++) {
    const t = i / courses;
    const y = h + (rise + 0.12) * t + 0.015, zz = (d / 2 + ov) * (1 - t) + 0.02;
    for (const sz of [-1, 1]) {
      const [ax, az] = f.w(-(w / 2 + ov), sz * zz), [bx, bz] = f.w(w / 2 + ov, sz * zz);
      b.line(ax, y, az, bx, y, bz);
    }
  }
  b.detail = false;
}

function windowAt(f, lx, y, lz, w, h, facing = 0) {
  // frame, glass set back a little, a cross of glazing bars and a sill
  const o = { ry: facing, detail: true };
  f.box(R.LINES, w + 0.16, h + 0.16, 0.1, lx, y, lz, o);
  f.box(R.GLASS, w, h, 0.12, lx, y, lz, o);
  if (!midDetail) {
    f.box(R.LINES, 0.06, h, 0.14, lx, y, lz, o);
    f.box(R.LINES, w, 0.06, 0.14, lx, y + h * 0.12, lz, o);
  }
  f.box(R.CONCRETE, w + 0.3, 0.08, 0.26, lx, y - h / 2 - 0.1, lz, o);
}

function doorAt(f, lx, lz, role = R.DOOR) { f.b.fine(() => doorParts(f, lx, lz, role)); }
function doorParts(f, lx, lz, role) {
  f.box(R.LINES, 1.16, 2.22, 0.1, lx, 1.11, lz);
  f.box(role, 0.96, 2.08, 0.13, lx, 1.04, lz);
  f.box(R.GLASS, 0.5, 0.36, 0.15, lx, 1.72, lz);
  if (midDetail) f.box(R.GOLD, 0.07, 0.07, 0.08, lx + 0.32, 1.05, lz - 0.08);
  else f.sphere(R.GOLD, 0.045, lx + 0.32, 1.05, lz - 0.08, { ws: 6, hs: 4 });
  f.box(R.CONCRETE, 1.5, 0.16, 0.6, lx, 0.08, lz - 0.3);
  f.box(R.ROOF_TILE, 1.6, 0.1, 0.7, lx, 2.45, lz - 0.3, { rx: 0.2 });
}

function chimney(f, lx, y0, lz, h) {
  f.box(R.BRICK, 0.7, h, 0.6, lx, y0 + h / 2, lz);
  f.box(R.CONCRETE, 0.84, 0.1, 0.74, lx, y0 + h + 0.05, lz);
  for (const dx of [-0.16, 0.16]) f.cyl(R.BRICK, 0.08, 0.09, 0.32, 7, lx + dx, y0 + h + 0.26, lz);
}

function gutter(f, w, lz, y) {
  const [ax, az] = f.w(-w / 2, lz), [bx, bz] = f.w(w / 2, lz);
  f.b.fine(() => {
    f.b.between(R.METAL, 0.06, ax, y, az, bx, y, bz, 6);
    f.cyl(R.METAL, 0.045, 0.045, y, 6, w / 2 - 0.1, y / 2, lz);
  });
}

function frontGarden(f, w, lz, rand, doorX) {
  // low picket fence or a hedge, a path to the door and a couple of bushes
  const gr = fork(rand);
  if (lowDetail) return;
  f.b.fine(() => gardenParts(f, w, lz, gr, doorX));
}
function gardenParts(f, w, lz, rand, doorX) {
  const gz = lz - 3.2;
  if (rand() < 0.5) {
    const n = Math.round(w / 0.5);
    for (let i = 0; i <= n; i++) {
      const lx = -w / 2 + (w * i) / n;
      if (Math.abs(lx - doorX) < 0.6) continue;
      f.box(R.LINES, 0.08, 0.9, 0.05, lx, 0.45, gz);
    }
    for (const y of [0.3, 0.72]) {
      f.box(R.LINES, doorX + w / 2 - 0.6, 0.07, 0.05, (-w / 2 + doorX - 0.6) / 2, y, gz);
      f.box(R.LINES, w / 2 - doorX - 0.6, 0.07, 0.05, (w / 2 + doorX + 0.6) / 2, y, gz);
    }
  } else {
    f.box(R.HEDGE, doorX + w / 2 - 0.7, 0.95, 0.6, (-w / 2 + doorX - 0.7) / 2, 0.47, gz);
    f.box(R.HEDGE, w / 2 - doorX - 0.7, 0.95, 0.6, (w / 2 + doorX + 0.7) / 2, 0.47, gz);
  }
  f.box(R.CONCRETE, 1.1, 0.03, 3.1, doorX, 0.015, lz - 1.6);
  const [bx, bz] = f.w(-w / 2 + 1, lz - 1.3);
  bush(f.b, bx, bz, 0.9, rand, R.HEDGE);
  if (rand() < 0.6) { const [fx, fz] = f.w(w / 2 - 1.2, lz - 1.2); bush(f.b, fx, fz, 0.6, rand, R.FLOWER); }
}

// Houses face -z in their frame (towards the pitch). Kinds: a two-storey gabled
// house, a hip-roofed house with a porch, a row of three terraced houses and a
// cottage with a dormer window.
function house(b, x, z, ry, rand, kind) {
  const f = new Frame(b, x, z, ry);
  const k = kind || ['gable', 'hip', 'terrace', 'cottage', 'gable'][Math.floor(rand() * 5)];
  const wall = rand() < 0.5 ? R.HOUSE_A : R.HOUSE_B;
  if (k === 'terrace') {
    const unit = 4.6, n = 3, w = unit * n, d = 7, h = 5.6;
    for (let i = 0; i < n; i++) {
      const lx = -w / 2 + unit * (i + 0.5);
      f.box(i % 2 ? R.HOUSE_A : R.HOUSE_B, unit, h, d, lx, h / 2, 0);
      windowAt(f, lx + 0.9, h * 0.72, -d / 2 - 0.02, 1.1, 1.2);
      windowAt(f, lx - 1.0, h * 0.72, -d / 2 - 0.02, 0.9, 1.2);
      windowAt(f, lx + 0.9, 1.5, -d / 2 - 0.02, 1.3, 1.3);
      doorAt(f, lx - 1.0, -d / 2 - 0.02);
      if (i > 0) chimney(f, -w / 2 + unit * i, h + 0.6, 0.6, 1.8);
      f.box(R.LINES, 0.1, h, 0.05, -w / 2 + unit * i, h / 2, -d / 2 - 0.03);
    }
    f.box(R.BRICK, w + 0.1, 0.5, d + 0.1, 0, 0.25, 0);
    gableRoof(f, w, d, h, 2.4, 0.35, wall);
    gutter(f, w, -d / 2 - 0.4, h);
    f.box(R.CONCRETE, w, 0.03, 3.4, 0, 0.015, -d / 2 - 1.7);
    return;
  }
  const w = 7.5 + rand() * 2.5, d = 6.5 + rand() * 1.5;
  const h = k === 'cottage' ? 3.2 : 5.6 + rand() * 0.8;
  f.box(wall, w, h, d, 0, h / 2, 0);
  f.box(R.BRICK, w + 0.1, 0.5, d + 0.1, 0, 0.25, 0);
  const doorX = (rand() < 0.5 ? -1 : 1) * w * 0.18;
  doorAt(f, doorX, -d / 2 - 0.02);
  const ground = [-w * 0.33, w * 0.33].filter((lx) => Math.abs(lx - doorX) > 1.2);
  for (const lx of ground) windowAt(f, lx, 1.5, -d / 2 - 0.02, 1.4, 1.3);
  // side windows
  for (const sx of [-1, 1]) windowAt(f, sx * (w / 2 + 0.02), k === 'cottage' ? 1.5 : h * 0.7, 0, 1.1, 1.1, Math.PI / 2);
  if (k !== 'cottage') for (const lx of [-w * 0.3, 0, w * 0.3]) windowAt(f, lx, h * 0.72, -d / 2 - 0.02, 1.1, 1.2);
  if (k === 'hip') {
    const [wx, wz] = f.w(0, 0);
    roof(b, wx, h, wz, w + 0.9, 2.3, d + 0.9, f.ry);
    chimney(f, w * 0.28, h + 0.5, d * 0.15, 1.9);
    // porch on posts around the door
    f.box(R.ROOF_TILE, 2.6, 0.14, 1.6, doorX, 2.75, -d / 2 - 0.8);
    for (const px of [-1.15, 1.15]) f.cyl(R.LINES, 0.07, 0.07, 2.7, 8, doorX + px, 1.35, -d / 2 - 1.45);
  } else {
    const rise = k === 'cottage' ? 3.0 : 2.6;
    gableRoof(f, w, d, h, rise, 0.4, wall);
    chimney(f, -w * 0.32, h + rise * 0.45, d * 0.12, 1.4 + rise * 0.45);
    if (k === 'cottage') {
      // dormer window on the front slope
      const dz = -d * 0.18, dy = h + rise * 0.3;
      f.box(wall, 1.6, 1.3, 1.6, 0, dy + 0.4, dz);
      const [cx, cz] = f.w(0, dz);
      b.add(prismT(), GeoBuilder.mat(cx, dy + 1.05, cz, 0, f.ry + Math.PI / 2, 0, 1.9, 0.7, 1.9), R.ROOF_TILE);
      windowAt(f, 0, dy + 0.4, dz - 0.82, 0.9, 0.8);
    }
  }
  gutter(f, w + 0.6, -d / 2 - 0.35, h);
  frontGarden(f, w, -d / 2, rand, doorX);
}

// clubhouse: long single-storey building with a veranda, windows and a name board
function clubhouse(b, cx, cz, ry, w, d, h, rand) {
  const f = new Frame(b, cx, cz, ry);
  f.box(R.HOUSE_B, w, h, d, 0, h / 2, 0);
  f.box(R.BRICK, w + 0.1, 0.5, d + 0.1, 0, 0.25, 0);
  gableRoof(f, w, d, h, 2.0, 0.5, R.HOUSE_B);
  const n = Math.max(2, Math.floor(w / 3.4));
  for (let i = 0; i < n; i++) {
    const lx = -w / 2 + (w * (i + 0.5)) / n;
    if (Math.abs(lx) < 1.4) continue;
    windowAt(f, lx, 2.0, -d / 2 - 0.02, 1.8, 1.3);
  }
  doorAt(f, 0, -d / 2 - 0.02);
  // veranda: deck, posts, rail and roof
  f.box(R.WOOD, w, 0.25, 2.6, 0, 0.12, -d / 2 - 1.3);
  const np = Math.max(3, Math.round(w / 3));
  for (let i = 0; i <= np; i++) f.cyl(R.WOOD, 0.08, 0.08, h - 0.4, 7, -w / 2 + (w * i) / np, (h - 0.4) / 2, -d / 2 - 2.5);
  f.box(R.ROOF_TILE, w + 0.4, 0.14, 2.9, 0, h - 0.35, -d / 2 - 1.35, { rx: 0.12 });
  for (let i = 0; i < np; i++) {
    const lx = -w / 2 + (w * (i + 0.5)) / np;
    if (Math.abs(lx) < 1) continue;
    f.box(R.WOOD, w / np - 0.2, 0.08, 0.08, lx, 0.95, -d / 2 - 2.5);
  }
  f.box(R.LINES, 4.2, 0.7, 0.12, 0, h + 0.2, -d / 2 - 0.1);
  f.box(R.BANNER_HOME, 3.9, 0.45, 0.14, 0, h + 0.2, -d / 2 - 0.1);
  chimney(f, w * 0.3, h + 0.6, 0.5, 1.8);
  gutter(f, w + 1, -d / 2 - 0.45, h);
  for (let i = 0; i < 3; i++) { const [bx, bz] = f.w(-w / 2 + 2 + i * (w - 4) / 2, d / 2 + 1.2); bush(b, bx, bz, 1, rand); }
}

function fence(b, x0, z0, x1, z1, h = 2.2) {
  const len = Math.hypot(x1 - x0, z1 - z0);
  const n = Math.max(1, Math.round(len / 3));
  for (let i = 0; i <= n; i++) {
    const x = x0 + (x1 - x0) * (i / n), z = z0 + (z1 - z0) * (i / n);
    b.cyl(R.FENCE, 0.04, 0.04, h, 6, x, h / 2, z);
  }
  b.between(R.FENCE, 0.03, x0, h, z0, x1, h, z1, 6);
  // chain-link mesh as a sparse diamond grid of ink lines
  const m = Math.max(1, Math.round(len / 0.6));
  for (let i = 0; i < m; i++) {
    const xa = x0 + (x1 - x0) * (i / m), za = z0 + (z1 - z0) * (i / m);
    const xb = x0 + (x1 - x0) * ((i + 1) / m), zb = z0 + (z1 - z0) * ((i + 1) / m);
    b.line(xa, 0.05, za, xb, h, zb);
    b.line(xb, 0.05, zb, xa, h, za);
  }
}

function scoreboardFrame(b, x, y, z, ry, w, h) {
  const f = new Frame(b, x, z, ry);
  f.box(R.METAL, w + 0.8, h + 0.8, 0.5, 0, y, 0.3);
  f.box(R.BANNER_HOME, w + 0.9, 0.22, 0.56, 0, y + h / 2 + 0.3, 0.3);
  const legH = y - h / 2;
  for (const sx of [-1, 1]) f.cyl(R.METAL, 0.2, 0.2, legH, 8, sx * w * 0.35, legH / 2, 0.4);
  // cross bracing between the legs
  const n = Math.max(1, Math.round(legH / 2.4));
  b.fine(() => {
    for (let k = 0; k < n; k++) {
      const y0 = (legH * k) / n, y1 = (legH * (k + 1)) / n;
      const [ax, az] = f.w(-w * 0.35, 0.4), [bx, bz] = f.w(w * 0.35, 0.4);
      b.line(ax, y0, az, bx, y1, bz); b.line(bx, y0, bz, ax, y1, az);
    }
  });
  return { x, y, z, ry, w, h };
}

function arch(b, span, height, z, seg = 28) {
  let px = -span / 2, py = 0;
  for (let i = 1; i <= seg; i++) {
    const t = i / seg;
    const x = -span / 2 + span * t;
    const y = height * (1 - Math.pow(2 * t - 1, 2));
    b.between(R.GOAL_FRAME, 1.3, px, py, z, x, y, z, 10);
    px = x; py = y;
  }
  // cables to the roof ring
  for (let i = 2; i < seg - 1; i += 2) {
    const t = i / seg;
    const x = -span / 2 + span * t;
    const y = height * (1 - Math.pow(2 * t - 1, 2));
    b.line(x, y, z, x, 30, 40);
    b.line(x, y, z, x, 30, -40);
  }
}

function crowdRing(b, rand, stats, cfg) {
  // four stands around the pitch plus corner fillers
  const L = cfg.lenX, Wd = cfg.lenZ;
  const sides = [
    { cx: 0, cz: -cfg.dz, ry: Math.PI, len: L },
    { cx: 0, cz: cfg.dz, ry: 0, len: L },
    { cx: cfg.dx, cz: 0, ry: Math.PI / 2, len: Wd },
    { cx: -cfg.dx, cz: 0, ry: -Math.PI / 2, len: Wd },
  ];
  const res = [];
  for (const s of sides) res.push(stand(b, { ...cfg.stand, ...s }, rand, stats));
  if (cfg.corners) {
    for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
      const ang = Math.atan2(sx, sz);
      const cx = sx * (cfg.dx - 3), cz = sz * (cfg.dz - 3);
      res.push(stand(b, { ...cfg.stand, cx: cx + sx * 4, cz: cz + sz * 4, ry: ang, len: 14, banners: false }, rand, stats));
    }
  }
  return res;
}

// ---------------------------------------------------------------------------
export function buildVenue(type, ctx) {
  const { atlas, quality = 'high', homeName = 'HOME', final = false, seed = 7 } = ctx;
  const rand = rnd(seed * 31 + type.length);
  const density = quality === 'low' ? 0.35 : quality === 'medium' ? 0.65 : 1;
  lowDetail = quality === 'low';
  midDetail = quality !== 'high';
  const b = new GeoBuilder({ bob: true, atlas: true });
  const bc = new GeoBuilder(); // shadow casters near the pitch (goal frames)
  const stats = { people: 0, seats: [] };
  const screens = [];
  const words = [homeName.toUpperCase(), 'FIRST TOUCH', 'PLAY FAIR', 'KICKWELL', 'GRASSROOTS FC', 'NORTHLINE', 'VOLTA SPORTS', 'BLUEBIRD BANK'];
  atlas.reset();
  const v = { type, name: VENUES[type].name };

  buildPitch(b, { surroundX: type === 'training' ? 90 : 60, surroundZ: type === 'training' ? 70 : 45 });
  buildGoals(bc);

  switch (type) {
    case 'community': {
      fence(b, -40, -29, 40, -29); fence(b, -40, 29, 40, 29); fence(b, -40, -29, -40, 29); fence(b, 40, -29, 40, 29);
      stand(b, { cx: 0, cz: -31, ry: Math.PI, len: 26, rows: 4, rowHeight: 0.38, base: 0.4, roles: [R.WOOD, R.STAND_B], roof: true, roofClear: 2.6, density: 0.6 * density, wallRole: R.WOOD }, rand, stats);
      // people leaning on the fence
      const ff = new Frame(b, 0, 30.2, 0);
      for (let i = 0; i < 60; i++) stats.seats.push({ f: ff, lx: -34 + rand() * 68, y: 0, lz: rand() * 0.8, w: 1, seated: false });
      dugouts(b, 26.5);
      // clubhouse behind a goal
      // local -z is a building's front: north of the pitch that needs ry 0, south of it PI, west of it -PI/2
      clubhouse(b, -48, 8, -Math.PI / 2, 16, 8, 4.2, rand);
      // houses and trees around the ground, facing it from both sides
      for (let i = 0; i < 7; i++) house(b, -48 + i * 16 + rand() * 3, 48 + rand() * 4, 0, rand);
      for (let i = 0; i < 6; i++) house(b, -44 + i * 17 + rand() * 3, -52 - rand() * 4, Math.PI, rand);
      for (let i = 0; i < 16; i++) tree(b, -60 + rand() * 120, (rand() < 0.5 ? 1 : -1) * (36 + rand() * 6), 0.8 + rand() * 0.5, rand);
      for (let i = 0; i < 6; i++) tree(b, 48 + rand() * 10, -25 + rand() * 50, 0.8 + rand() * 0.5, rand);
      screens.push(scoreboardFrame(b, 46, 3.2, -16, -Math.PI / 2, 4, 1.5));
      break;
    }
    case 'town': {
      adBoards(b, atlas, words);
      stand(b, { cx: 0, cz: -31, ry: Math.PI, len: 54, rows: 9, roof: true, roofClear: 3.4, density: 0.5 * density, banners: true, roles: [R.STAND_C, R.STAND_A] }, rand, stats);
      stand(b, { cx: 0, cz: 31, ry: 0, len: 44, rows: 5, density: 0.45 * density, roles: [R.STAND_B, R.STAND_A] }, rand, stats);
      stand(b, { cx: 42, cz: 0, ry: Math.PI / 2, len: 30, rows: 4, density: 0.45 * density }, rand, stats);
      stand(b, { cx: -42, cz: 0, ry: -Math.PI / 2, len: 30, rows: 4, density: 0.4 * density }, rand, stats);
      dugouts(b);
      for (const [x, z] of [[-44, -34], [44, -34], [-44, 34], [44, 34]]) floodlight(b, x, z, 24);
      screens.push(scoreboardFrame(b, -47, 7, 18, Math.PI / 2, 6, 2.2));
      for (let i = 0; i < 10; i++) tree(b, -70 + rand() * 140, (rand() < 0.5 ? 1 : -1) * (52 + rand() * 12), 1 + rand() * 0.5, rand);
      for (let i = 0; i < 5; i++) house(b, -60 + i * 28, 72, 0, rand);
      break;
    }
    case 'regional': {
      adBoards(b, atlas, words);
      const st = { rows: 12, roof: true, roofClear: 3.4, density: 0.72 * density, banners: true, roles: [R.STAND_A, R.STAND_B, R.STAND_C] };
      stand(b, { ...st, cx: 0, cz: -31, ry: Math.PI, len: 66 }, rand, stats);
      // main stand with an upper tier
      stand(b, { ...st, cx: 0, cz: 31, ry: 0, len: 66, roof: false, rows: 10 }, rand, stats);
      stand(b, { ...st, cx: 0, cz: 31, ry: 0, len: 60, rows: 8, base: 6.4, z0: 9.5, roofClear: 3.6, roof: true, banners: false }, rand, stats);
      stand(b, { ...st, cx: 42, cz: 0, ry: Math.PI / 2, len: 46, rows: 9, roof: false }, rand, stats);
      stand(b, { ...st, cx: -42, cz: 0, ry: -Math.PI / 2, len: 46, rows: 9, roof: false }, rand, stats);
      // players' tunnel from the main stand to the touchline
      const t = new Frame(b, 0, 26.2, 0);
      t.box(R.STAND_C, 3.6, 2.8, 5.4, 0, 1.4, 0.6);
      t.cyl(R.BANNER_HOME, 1.8, 1.8, 5.4, 12, 0, 2.8, 0.6, { rx: Math.PI / 2, theta: Math.PI });
      t.box(R.CONCRETE, 2.6, 2.2, 0.1, 0, 1.1, -2.15);
      dugouts(b, 27.5);
      for (const [x, z] of [[-40, -38], [40, -38], [-40, 38], [40, 38]]) floodlight(b, x, z, 30);
      screens.push(scoreboardFrame(b, 46, 10, 0, -Math.PI / 2, 8, 3));
      break;
    }
    case 'premier': {
      adBoards(b, atlas, words);
      const stc = { rows: 13, roofClear: 3.6, density: 0.85 * density, banners: true, roles: [R.STAND_A, R.STAND_B] };
      crowdRing(b, rand, stats, { lenX: 68, lenZ: 48, dx: 42, dz: 31, corners: true, stand: stc });
      crowdRing(b, rand, stats, { lenX: 72, lenZ: 52, dx: 42, dz: 31, corners: false, stand: { ...stc, base: 7, z0: 12, rows: 10, roof: true, banners: false, roles: [R.STAND_C, R.STAND_A] } });
      crowdRing(b, rand, stats, { lenX: 74, lenZ: 54, dx: 42, dz: 31, corners: false, stand: { ...stc, base: 12.5, z0: 21, rows: 7, roof: true, roofClear: 4, banners: false, density: 0.7 * density, roles: [R.STAND_B] } });
      dugouts(b, 27.5);
      screens.push(scoreboardFrame(b, 60, 17, 0, -Math.PI / 2, 14, 5.5));
      screens.push(scoreboardFrame(b, -60, 17, 0, Math.PI / 2, 14, 5.5));
      break;
    }
    case 'continental': {
      adBoards(b, atlas, final ? ['FINAL', 'CONTINENTAL CUP', 'FIRST TOUCH', homeName.toUpperCase()] : words);
      const stc = { rows: 14, roofClear: 3.6, density: 0.95 * density, banners: true, roles: final ? [R.GOLD, R.STAND_A] : [R.STAND_A, R.STAND_C] };
      crowdRing(b, rand, stats, { lenX: 68, lenZ: 48, dx: 42, dz: 31, corners: true, stand: stc });
      crowdRing(b, rand, stats, { lenX: 74, lenZ: 54, dx: 42, dz: 31, corners: true, stand: { ...stc, base: 7.4, z0: 12.5, rows: 12, banners: final } });
      crowdRing(b, rand, stats, { lenX: 78, lenZ: 58, dx: 42, dz: 31, corners: false, stand: { ...stc, base: 14, z0: 24, rows: 8, roof: true, roofClear: 5, banners: false, density: 0.8 * density, roles: [R.STAND_B] } });
      // distinctive arch over the pitch and a ring roof
      arch(b, 150, 72, 0);
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        const x = Math.cos(a) * 80, z = Math.sin(a) * 58;
        const x2 = Math.cos(a + Math.PI / 12) * 80, z2 = Math.sin(a + Math.PI / 12) * 58;
        b.between(R.METAL, 0.5, x, 30, z, x2, 30, z2, 6);
      }
      if (final) {
        for (let i = 0; i < 8; i++) b.box(i % 2 ? R.GOLD : R.BANNER_HOME, 1.2, 9, 0.1, -35 + i * 10, 22, -52, 0);
      }
      dugouts(b, 27.5);
      screens.push(scoreboardFrame(b, 64, 21, 0, -Math.PI / 2, 16, 6));
      screens.push(scoreboardFrame(b, -64, 21, 0, Math.PI / 2, 16, 6));
      break;
    }
    case 'training': {
      fence(b, -46, -36, 46, -36); fence(b, -46, 36, 46, 36); fence(b, -46, -36, -46, 36); fence(b, 46, -36, 46, 36);
      // shooting targets in the top corners of the +x goal
      for (const zs of [1, -1]) {
        const x = PITCH.HL - 0.05, z = zs * (GOAL.HW - 0.55), y = GOAL.H - 0.5;
        b.box(R.TARGET, 0.06, 0.9, 0.08, x, y, z - 0.45); b.box(R.TARGET, 0.06, 0.9, 0.08, x, y, z + 0.45);
        b.box(R.TARGET, 0.06, 0.08, 0.9, x, y - 0.45, z); b.box(R.TARGET, 0.06, 0.08, 0.9, x, y + 0.45, z);
      }
      // decorative cone lines and target gates by the halfway line
      for (let i = 0; i < 8; i++) b.cone(R.CONE, 0.14, 0.32, 10, -26 + i * 1.8, 0.16, -24.5);
      for (let g = 0; g < 3; g++) {
        const gx = -20 + g * 8;
        for (const zs of [0, 1.6]) b.cone(R.CONE, 0.16, 0.4, 10, gx, 0.2, -27 + zs);
        b.box(R.TARGET, 0.06, 0.06, 1.6, gx, 0.55, -26.2);
      }
      // small-sided practice area with mini goals
      const sx0 = 10, sz0 = -30;
      for (const [x0, z0, x1, z1] of [[sx0, sz0, sx0 + 26, sz0], [sx0, sz0 - 1, sx0, sz0 - 5], [sx0 + 26, sz0, sx0 + 26, sz0 - 5]]) {
        const len = Math.hypot(x1 - x0, z1 - z0);
        b.plane(R.LINES, len, LINE_W, (x0 + x1) / 2, LY, (z0 + z1) / 2, { ry: Math.atan2(z1 - z0, x1 - x0) });
      }
      for (const gx of [sx0 + 1, sx0 + 25]) {
        b.cyl(R.GOAL_FRAME, 0.04, 0.04, 1.2, 8, gx, 0.6, sz0 - 1.8); b.cyl(R.GOAL_FRAME, 0.04, 0.04, 1.2, 8, gx, 0.6, sz0 - 3.8);
        b.between(R.GOAL_FRAME, 0.04, gx, 1.2, sz0 - 1.8, gx, 1.2, sz0 - 3.8, 8);
      }
      // clubhouse and training shed
      clubhouse(b, 0, 49, 0, 26, 10, 4.6, rand);
      for (let i = 0; i < 18; i++) tree(b, -80 + rand() * 160, (rand() < 0.5 ? 1 : -1) * (44 + rand() * 20), 0.9 + rand() * 0.6, rand);
      // benches and ball bags
      for (let i = 0; i < 3; i++) b.box(R.WOOD, 3, 0.45, 0.5, -10 + i * 10, 0.22, 33);
      for (let i = 0; i < 6; i++) b.sphere(R.BALL_W, 0.11, 20 + i * 0.3, 0.11, 33 + (i % 2) * 0.25, { ws: 8, hs: 6 });
      screens.push(scoreboardFrame(b, 46, 3, 20, -Math.PI / 2, 4, 1.5));
      break;
    }
  }
  // fill the stands up to the venue's crowd budget (weighted by each stand's popularity)
  const budget = Math.round(VENUES[type].crowd * density);
  if (budget > 0 && stats.seats.length) {
    const seats = stats.seats;
    const wsum = seats.reduce((a, q) => a + q.w, 0);
    const p = Math.min(1, budget / wsum);
    for (const q of seats) {
      // arms only on High quality and only in the front rows of the lower tiers, where they
      // can be seen: the biggest crowds hold thousands of fans
      if (rand() < q.w * p) { person(q.f, q.lx, q.y, q.lz, rand, q.seated, quality === 'high' && (q.row == null || q.row < 6)); stats.people++; }
    }
  }
  v.people = stats.people;
  v.solid = b.buildSolid();
  v.edges = b.buildEdges();
  v.casterSolid = bc.buildSolid();
  v.casterEdges = bc.buildEdges();
  v.screens = screens;
  v.edgeCount = b.edgeCount;
  v.vertCount = b.vcount;
  return v;
}

// clouds for the neobrutalist sky
export function buildClouds(seed = 3) {
  const rand = rnd(seed);
  const b = new GeoBuilder();
  for (let i = 0; i < 14; i++) {
    const a = rand() * Math.PI * 2, d = 260 + rand() * 180;
    const x = Math.cos(a) * d, z = Math.sin(a) * d, y = 70 + rand() * 70;
    const n = 3 + Math.floor(rand() * 3);
    for (let k = 0; k < n; k++) {
      const s = 9 + rand() * 10;
      b.sphere(R.CLOUD, s, x + (k - n / 2) * s * 1.1, y + rand() * 4, z + (rand() - 0.5) * 8, { ws: 10, hs: 6, sy: 0.55 });
    }
  }
  return { solid: b.buildSolid(), edges: b.buildEdges() };
}
