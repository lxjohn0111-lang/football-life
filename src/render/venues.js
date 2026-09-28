// Venue construction: the 64x42 pitch with accurate markings, goals, and six
// distinct locations. All static geometry is merged into one solid mesh and one
// edge batch (roles give each part its colour); crowds animate in the shader.
import * as THREE from 'three';
import { GeoBuilder, tBox, tSphere } from './geometry.js';
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

function person(f, lx, y, lz, rand, seated = true) {
  const role = CROWD_ROLES[Math.floor(rand() * CROWD_ROLES.length)];
  const bob = [rand(), 1];
  const h = seated ? 0.46 : 0.62;
  f.box(role, 0.42, h, 0.28, lx, y + h / 2, lz, { bob });
  f.sphere(SKINS[Math.floor(rand() * 3)], 0.13, lx, y + h + 0.15, lz, { ws: 6, hs: 4, bob });
}

// A tiered stand. Local frame: x along the stand, z away from the pitch.
function stand(b, o, rand, stats) {
  const f = new Frame(b, o.cx, o.cz, o.ry);
  const rows = o.rows, rd = o.rowDepth || 0.85, rh = o.rowHeight || 0.42, base = o.base || 0.6, len = o.len;
  const z0 = o.z0 || 0;
  const roles = o.roles || [R.STAND_A, R.STAND_B];
  // front wall
  f.box(o.wallRole || R.CONCRETE, len, base, 0.3, 0, base / 2, z0 - 0.15);
  for (let i = 0; i < rows; i++) {
    const y = base + i * rh;
    f.box(roles[Math.floor(i / (o.band || 2)) % roles.length], len, rh, rd, 0, y + rh / 2, z0 + rd * (i + 0.5));
    // crowd on this row
    if (o.density > 0) {
      const n = Math.floor(len / 0.62);
      for (let k = 0; k < n; k++) {
        if (rand() > o.density) continue;
        const lx = -len / 2 + 0.31 + k * 0.62 + (rand() - 0.5) * 0.1;
        person(f, lx, y + rh, z0 + rd * (i + 0.5) + 0.05, rand, true);
        stats.people++;
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

function floodlight(b, x, z, h, aimY) {
  b.cyl(R.METAL, 0.22, 0.32, h, 8, x, h / 2, z);
  const ry = Math.atan2(-x, -z);
  const f = new Frame(b, x, z, ry);
  f.box(R.METAL, 3.6, 2.4, 0.3, 0, h + 1.2, 0.2, { rx: 0.35 });
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) f.box(R.LAMP, 0.9, 0.7, 0.2, -1.15 + i * 1.15, h + 0.65 + j * 1.1, -0.05, { rx: 0.35 });
  void aimY;
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

function dugouts(b, z = 27.2) {
  for (const x of [-9, 9]) {
    const f = new Frame(b, x, z, 0);
    f.box(R.STAND_C, 7, 2.2, 0.15, 0, 1.1, 1.0);
    f.box(R.ROOF, 7.2, 0.12, 1.8, 0, 2.25, 0.2, { rx: -0.08 });
    for (const sx of [-1, 1]) f.box(R.STAND_C, 0.12, 2.1, 1.7, sx * 3.5, 1.05, 0.2);
    f.box(R.WOOD, 6.4, 0.45, 0.5, 0, 0.22, 0.6);
  }
}

function tree(b, x, z, s, rand) {
  b.cyl(R.TRUNK, 0.18 * s, 0.25 * s, 2.2 * s, 6, x, 1.1 * s, z);
  b.cone(R.TREE, 1.8 * s, 4.5 * s, 8, x, 2.2 * s + 2.25 * s, z, { ry: rand() * 3 });
  b.cone(R.TREE, 1.3 * s, 3.2 * s, 8, x, 2.2 * s + 3.6 * s, z, { ry: rand() * 3 });
}

function house(b, x, z, ry, rand) {
  const f = new Frame(b, x, z, ry);
  const w = 7 + rand() * 3, d = 6 + rand() * 2, h = 5 + rand() * 2.5;
  const role = rand() < 0.5 ? R.HOUSE_A : R.HOUSE_B;
  f.box(role, w, h, d, 0, h / 2, 0);
  // pyramid roof: 4-sided cone rotated 45 degrees and stretched
  const [wx, wz] = f.w(0, 0);
  b.cone(R.ROOF_TILE, 0.72, 2.6, 4, wx, h + 1.3, wz, { ry: ry + Math.PI / 4, sx: w * 0.99, sz: d * 0.99 });
  // windows and door facing the pitch
  for (let i = -1; i <= 1; i += 2) f.box(R.STAND_C, 1.3, 1.2, 0.08, i * w * 0.25, h * 0.62, -d / 2 - 0.04);
  f.box(R.WOOD, 1.1, 2.1, 0.08, 0, 1.05, -d / 2 - 0.04);
  f.cyl(R.CONCRETE, 0.35, 0.35, 1.4, 6, w * 0.3, h + 1.0, d * 0.15);
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
  for (const sx of [-1, 1]) f.cyl(R.METAL, 0.2, 0.2, y - h / 2, 8, sx * w * 0.35, (y - h / 2) / 2, 0.4);
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
  const b = new GeoBuilder({ bob: true, atlas: true });
  const bc = new GeoBuilder(); // shadow casters near the pitch (goal frames)
  const stats = { people: 0 };
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
      for (let i = 0; i < 40 * density; i++) { person(ff, -34 + rand() * 68, 0, rand() * 0.8, rand, false); stats.people++; }
      dugouts(b, 26.5);
      // clubhouse behind a goal
      const ch = new Frame(b, -47, 8, Math.PI / 2);
      ch.box(R.HOUSE_B, 16, 4.5, 8, 0, 2.25, 0);
      const [cx, cz] = ch.w(0, 0);
      b.cone(R.ROOF_TILE, 0.72, 2.4, 4, cx, 5.7, cz, { ry: Math.PI / 2 + Math.PI / 4, sx: 8, sz: 16 });
      ch.box(R.WOOD, 2, 2.2, 0.1, 0, 1.1, -4.05);
      ch.box(R.STAND_C, 3, 1.2, 0.1, -5, 2.6, -4.05);
      ch.box(R.STAND_C, 3, 1.2, 0.1, 5, 2.6, -4.05);
      // houses and trees around the ground
      for (let i = 0; i < 7; i++) house(b, -48 + i * 16 + rand() * 3, 46 + rand() * 4, Math.PI, rand);
      for (let i = 0; i < 6; i++) house(b, -44 + i * 17 + rand() * 3, -50 - rand() * 4, 0, rand);
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
      for (let i = 0; i < 5; i++) house(b, -60 + i * 28, 70, Math.PI, rand);
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
      const ch = new Frame(b, 0, 48, 0);
      ch.box(R.HOUSE_A, 26, 6, 10, 0, 3, 0);
      ch.box(R.ROOF, 27, 0.4, 11, 0, 6.2, 0);
      for (let i = -3; i <= 3; i++) ch.box(R.STAND_C, 2.2, 1.6, 0.1, i * 3.4, 3.4, -5.05);
      ch.box(R.WOOD, 2.4, 2.6, 0.1, 0, 1.3, -5.05);
      for (let i = 0; i < 18; i++) tree(b, -80 + rand() * 160, (rand() < 0.5 ? 1 : -1) * (44 + rand() * 20), 0.9 + rand() * 0.6, rand);
      // benches and ball bags
      for (let i = 0; i < 3; i++) b.box(R.WOOD, 3, 0.45, 0.5, -10 + i * 10, 0.22, 33);
      for (let i = 0; i < 6; i++) b.sphere(R.BALL_W, 0.11, 20 + i * 0.3, 0.11, 33 + (i % 2) * 0.25, { ws: 8, hs: 6 });
      screens.push(scoreboardFrame(b, 46, 3, 20, -Math.PI / 2, 4, 1.5));
      break;
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
