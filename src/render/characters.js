// Stickman rig geometry. Every player (and the ball) is merged into ONE mesh and
// ONE edge batch; each vertex belongs to a rigid part whose world matrix is
// fetched from a float texture updated every frame by the animator.
import * as THREE from 'three';
import { GeoBuilder, tBox, tCyl, tSphere, tCone, tQuad, tFrom, tLoft, tIco } from './geometry.js';
import { R } from './palette.js';
import { makeSolidMaterial, makeEdgeMaterial, makePartsDepthMaterial, SU } from './shaders.js';

export const P = { PELVIS: 0, TORSO: 1, HEAD: 2, UARM_L: 3, UARM_R: 4, FARM_L: 5, FARM_R: 6, THIGH_L: 7, THIGH_R: 8, SHIN_L: 9, SHIN_R: 10, BOOT_L: 11, BOOT_R: 12 };
export const PER = 13;
export const DIM = { thigh: 0.44, shin: 0.43, ankle: 0.08, upper: 0.29, fore: 0.27, hipW: 0.095, shoulderW: 0.19, torsoH: 0.5, waist: 0.07, neck: 0.08 };

const M = (x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => GeoBuilder.mat(x, y, z, rx, ry, rz, sx, sy, sz);

// radial segments per quality: body, limbs, head [width, height], small details and
// knee/elbow joints [width, height], boot soles; studs and laces are optional
const DETAIL = {
  high: { body: 16, limb: 11, head: [16, 12], small: [8, 6], joint: [11, 8], sole: 11, studs: true, laces: true },
  medium: { body: 10, limb: 8, head: [12, 9], small: [6, 4], joint: [7, 5], sole: 7, studs: false, laces: true },
  low: { body: 8, limb: 6, head: [10, 7], small: [5, 4], joint: [6, 4], sole: 6, studs: false, laces: false },
};

// Sculpted shapes as lofted ellipses: [y, half width, half depth, forward offset]
const TORSO = [[0, 0.165, 0.112, 0], [0.1, 0.176, 0.118, 0.004], [0.22, 0.2, 0.128, 0.01], [0.34, 0.226, 0.134, 0.012], [0.44, 0.236, 0.124, 0.002], [0.5, 0.2, 0.108, -0.004], [0.545, 0.1, 0.07, 0]];
const PELVIS = [[-0.13, 0.155, 0.112, 0], [-0.03, 0.171, 0.121, 0.002], [0.08, 0.166, 0.114, 0]];
const WAISTBAND = [[0.035, 0.172, 0.12, 0], [0.075, 0.17, 0.118, 0]];
const SHORTS_LEG = [[-0.215, 0.079, 0.081, 0], [-0.02, 0.087, 0.089, 0.002], [0.03, 0.086, 0.088, 0]];
const THIGH = [[-0.455, 0.044, 0.046, 0.004], [-0.4, 0.05, 0.053, 0.004], [-0.3, 0.056, 0.058, 0.004], [-0.14, 0.064, 0.069, 0.008], [0, 0.066, 0.067, 0.004]];
const SOCK = [[-0.43, 0.04, 0.041, 0.002], [-0.3, 0.045, 0.046, 0], [-0.14, 0.055, 0.061, -0.009], [-0.06, 0.054, 0.058, -0.004], [-0.035, 0.049, 0.052, -0.002]];
const SOCK_BAND = [[-0.085, 0.057, 0.062, -0.006], [-0.05, 0.057, 0.061, -0.005]];
const SLEEVE = [[-0.155, 0.058, 0.058, 0], [-0.05, 0.066, 0.067, 0], [0.01, 0.066, 0.067, 0]];
const CUFF = [[-0.162, 0.06, 0.06, 0], [-0.138, 0.061, 0.061, 0]];
const FORE = [[-0.255, 0.029, 0.026, 0], [-0.08, 0.042, 0.041, 0], [0, 0.04, 0.041, 0]];
// boots run along +z (heel to toe): [z, half width, half height, -(centre height)]
const BOOT = [[-0.058, 0.03, 0.03, 0.047], [-0.04, 0.043, 0.048, 0.036], [0.03, 0.049, 0.052, 0.034], [0.1, 0.053, 0.04, 0.046], [0.16, 0.049, 0.03, 0.056], [0.205, 0.03, 0.019, 0.064]];
const SOLE = [[-0.06, 0.036, 0.008, 0.086], [-0.035, 0.047, 0.008, 0.087], [0.1, 0.057, 0.008, 0.087], [0.17, 0.052, 0.008, 0.087], [0.212, 0.03, 0.008, 0.085]];

const HAIRS = [R.HAIR_1, R.HAIR_2, R.HAIR_1];
const SKINS = [R.SKIN_1, R.SKIN_2, R.SKIN_3];
const HAIR_STYLES = ['crop', 'curly', 'buzz', 'quiff', 'bun', 'beard'];

function roleSet(p) {
  const t = p.team;
  const gk = p.isGK;
  return {
    shirt: gk ? (t === 0 ? R.GK_0 : R.GK_1) : (t === 0 ? R.SHIRT_0 : R.SHIRT_1),
    shorts: gk ? (t === 0 ? R.GKX_0 : R.GKX_1) : (t === 0 ? R.SHORTS_0 : R.SHORTS_1),
    socks: gk ? (t === 0 ? R.GKX_0 : R.GKX_1) : (t === 0 ? R.SOCKS_0 : R.SOCKS_1),
    trim: gk ? (t === 0 ? R.GKX_0 : R.GKX_1) : (t === 0 ? R.TRIM_0 : R.TRIM_1),
    num: t === 0 ? R.NUM_0 : R.NUM_1,
    skin: p.isHuman ? R.SKIN_H : SKINS[(p.id * 7) % 3],
    hair: p.isHuman ? R.HAIR_H : HAIRS[(p.id * 5) % 3],
    boot: p.isHuman ? R.BOOT_H : R.BOOT,
    hand: gk ? R.GLOVE : (p.isHuman ? R.SKIN_H : SKINS[(p.id * 7) % 3]),
  };
}

// per-vertex roles for a loft from each face's segment (around) and level (up), so kit
// patterns follow the loft's own faces and stay crisp; caps get level -1
function loftRoles(t, nLevels, seg, fn) {
  const P = t.positions, roles = new Array(P.length / 3);
  const side = (nLevels - 1) * seg * 2;
  for (let k = 0; k < P.length / 9; k++) {
    const r = k < side ? fn(Math.floor((k % (2 * seg)) / 2), Math.floor(k / (2 * seg))) : fn(-1, -1);
    roles[k * 3] = roles[k * 3 + 1] = roles[k * 3 + 2] = r;
  }
  return roles;
}

// point on the torso surface at height y and lateral x, with the angle of its normal
function torsoSurface(y, x, back) {
  let i = 0;
  while (i < TORSO.length - 2 && TORSO[i + 1][0] < y) i++;
  const a = TORSO[i], b = TORSO[i + 1], t = Math.min(1, Math.max(0, (y - a[0]) / (b[0] - a[0])));
  const rx = a[1] + (b[1] - a[1]) * t, rz = a[2] + (b[2] - a[2]) * t, dz = a[3] + (b[3] - a[3]) * t;
  const u = Math.min(0.97, Math.abs(x) / rx);
  const zz = rz * Math.sqrt(1 - u * u) * (back ? -1 : 1);
  return { z: dz + zz, ry: Math.atan2(x / (rx * rx), zz / (rz * rz)) };
}

function addHead(b, r, part, D, style) {
  const [hw, hh] = D.head, [sw, sh] = D.small;
  b.add(tSphere(0.113, hw, hh), M(0, 0.14, -0.004, 0, 0, 0, 0.93, 1.03, 1), r.skin, part);
  b.add(tSphere(0.083, Math.round(hw * 0.75), Math.round(hh * 0.75)), M(0, 0.078, 0.022, 0, 0, 0, 0.97, 0.86, 1), r.skin, part);
  for (const s of [-1, 1]) {
    b.add(tSphere(0.027, sw, sh), M(s * 0.106, 0.125, -0.004, 0, 0, 0, 0.45, 1.15, 0.8), r.skin, part);
    b.add(tSphere(0.0135, sw, sh), M(s * 0.041, 0.142, 0.101, 0, 0, 0, 1.25, 1, 0.55), R.EYE, { ...part, noEdges: true });
    b.add(tBox(0.04, 0.01, 0.012), M(s * 0.041, 0.166, 0.1, 0, 0, -s * 0.12), r.hair, { ...part, creaseOnly: true });
  }
  b.add(tCone(0.019, 0.042, 6), M(0, 0.118, 0.11, Math.PI / 2 + 0.25), r.skin, part);
  b.add(tBox(0.036, 0.005, 0.006), M(0, 0.071, 0.103), R.EYE, { ...part, noEdges: true });
  // hair
  const cap = (rad, len, tilt, y = 0.145, z = -0.012) => b.add(tSphere(rad, hw, Math.max(4, Math.round(hh * 0.5)), Math.PI * 2, Math.PI * len), M(0, y, z, tilt), r.hair, part);
  switch (style) {
    case 'buzz': cap(0.1165, 0.37, -0.2); break;
    case 'curly': {
      cap(0.118, 0.44, -0.25);
      for (let k = 0; k < 9; k++) {
        const a = (k / 9) * Math.PI * 2, el = k % 2 ? 0.55 : 0.95;
        // low-poly clumps: bumpy is the look, and they stay cheap
        b.add(tIco(0.046 + (k % 3) * 0.004, 0), M(Math.sin(a) * 0.085 * Math.sin(el), 0.15 + 0.085 * Math.cos(el), -0.015 + Math.cos(a) * 0.075 * Math.sin(el) - 0.01, k, k * 2, 0), r.hair, part);
      }
      break;
    }
    case 'quiff': cap(0.119, 0.42, -0.25); b.add(tSphere(0.052, sw, sh), M(0, 0.232, 0.045, -0.3, 0, 0, 1.45, 0.75, 1.25), r.hair, part); break;
    case 'bun': cap(0.12, 0.45, -0.3); b.add(tSphere(0.045, sw, sh), M(0, 0.222, -0.088), r.hair, part); break;
    case 'beard':
      cap(0.1155, 0.33, -0.15);
      b.add(tSphere(0.089, hw, Math.max(4, Math.round(hh * 0.5)), Math.PI * 2, Math.PI * 0.46), M(0, 0.078, 0.022, Math.PI - 0.6, 0, 0, 0.97, 0.86, 1), r.hair, part);
      break;
    default: cap(0.12, 0.43, -0.25);
  }
}

function addCharacter(b, p, base, atlas, D, pattern) {
  const r = roleSet(p);
  const part = (k) => ({ part: base + k });
  const pat = p.isGK ? 'plain' : pattern || 'plain';
  const sleeveRole = pat === 'sleeves' ? r.trim : r.shirt;
  // shorts: hips, waistband and legs with a side stripe
  b.add(tLoft('pelvis', PELVIS, D.body), M(0, 0, 0), r.shorts, part(P.PELVIS));
  b.add(tLoft('waistband', WAISTBAND, D.body, { caps: [false, false] }), M(0, 0, 0), r.trim, part(P.PELVIS));
  // shirt: sculpted torso with the club's pattern, collar, neck
  const torso = tLoft('torso', TORSO, D.body);
  let roles = null;
  const n = D.body, nl = TORSO.length;
  // segment i spans angles (i..i+1)/n of a turn from the front centre; the back centre is at n/2
  const backPanel = (i, l) => Math.abs((i + 0.5) / n - 0.5) < 0.09 && l >= 1 && l <= 3;
  if (pat === 'stripes') roles = loftRoles(torso, nl, n, (i, l) => (i >= 0 && i % 2 === 1 && !backPanel(i, l) ? r.trim : r.shirt));
  else if (pat === 'band') roles = loftRoles(torso, nl, n, (i, l) => (l === 2 ? r.trim : r.shirt));
  else if (pat === 'halves') roles = loftRoles(torso, nl, n, (i) => (i >= n / 2 ? r.trim : r.shirt));
  b.add(torso, M(0, 0, 0), r.shirt, { ...part(P.TORSO), roles });
  b.add(tLoft('collar', [[0.515, 0.084, 0.064, 0.002], [0.55, 0.074, 0.056, 0.002]], D.body, { caps: [false, false] }), M(0, 0, 0), r.trim, part(P.TORSO));
  b.add(tCyl(0.047, 0.053, 0.12, D.limb), M(0, 0.575, 0), r.skin, part(P.TORSO));
  // numbers follow the curve of the back; small number and crest on the chest
  const num = String(p.number ?? 0);
  const dw = num.length > 1 ? 0.12 : 0.16;
  for (let i = 0; i < num.length; i++) {
    const x = (i - (num.length - 1) / 2) * dw * 0.95;
    const sf = torsoSurface(0.3, x, true);
    b.add(tQuad(dw, 0.2), M(x, 0.3, sf.z - 0.005, 0, sf.ry, 0), r.num, { ...part(P.TORSO), uvRect: atlas.digit(+num[i]), noEdges: true });
  }
  const fn = torsoSurface(0.37, -0.085, false);
  b.add(tQuad(0.06, 0.08), M(-0.085, 0.37, fn.z + 0.004, 0, fn.ry, 0), r.num, { ...part(P.TORSO), uvRect: atlas.digit(+num[num.length - 1]), noEdges: true });
  const cr = torsoSurface(0.38, 0.085, false);
  b.add(tBox(0.042, 0.05, 0.008), M(0.085, 0.38, cr.z + 0.002, 0, cr.ry, 0), r.trim, part(P.TORSO));
  b.add(tBox(0.02, 0.02, 0.01), M(0.085, 0.383, cr.z + 0.005, 0, cr.ry, Math.PI / 4), r.shirt, { ...part(P.TORSO), noEdges: true });
  // head and face
  const style = p.isHuman ? 'crop' : HAIR_STYLES[(p.id * 5 + (p.number || 0) * 3) % HAIR_STYLES.length];
  addHead(b, r, part(P.HEAD), D, style);
  // arms: rounded shoulders, sleeves with cuffs, elbows, forearms, hands (gloves for keepers)
  const [sw, sh] = D.small;
  for (const [ua, fa, s] of [[P.UARM_L, P.FARM_L, 1], [P.UARM_R, P.FARM_R, -1]]) {
    b.add(tSphere(0.066, D.limb, Math.round(D.limb * 0.7)), M(0, -0.005, 0), sleeveRole, part(ua));
    b.add(tLoft('sleeve', SLEEVE, D.limb, { caps: [false, false] }), M(0, 0, 0), sleeveRole, part(ua));
    b.add(tLoft('cuff', CUFF, D.limb, { caps: [false, false] }), M(0, 0, 0), r.trim, part(ua));
    b.add(tCyl(0.045, 0.039, 0.3, D.limb), M(0, -0.15, 0), r.skin, part(ua));
    b.add(tSphere(0.04, D.joint[0], D.joint[1]), M(0, 0, 0), r.skin, { ...part(fa), noEdges: true });
    b.add(tLoft('fore', FORE, D.limb), M(0, 0, 0), r.skin, part(fa));
    const g = p.isGK ? 1.32 : 1;
    b.add(tSphere(0.046, sw + 2, sh + 1), M(0, -0.29 - (g - 1) * 0.02, 0.004, 0, 0, 0, 0.72 * g, 1.12 * g, 0.5 * g), r.hand, part(fa));
    b.add(tSphere(0.02, sw, sh), M(-s * 0.016 * g, -0.272, 0.028 * g, 0.3, 0, 0, 0.9 * g, 1.5 * g, 0.9 * g), r.hand, part(fa));
    if (p.isGK) b.add(tLoft('wrist', [[-0.27, 0.046, 0.042, 0], [-0.238, 0.045, 0.041, 0]], D.limb, { caps: [false, false] }), M(0, 0, 0), r.trim, part(fa));
  }
  // legs: shorts legs with side stripes, thighs, knees, socks with bands, boots
  for (const [th, shn, bt, s] of [[P.THIGH_L, P.SHIN_L, P.BOOT_L, 1], [P.THIGH_R, P.SHIN_R, P.BOOT_R, -1]]) {
    b.add(tLoft('shortsleg', SHORTS_LEG, D.limb, { caps: [false, false] }), M(0, 0, 0), r.shorts, part(th));
    b.add(tBox(0.014, 0.2, 0.024), M(s * 0.084, -0.1, 0), r.trim, { ...part(th), creaseOnly: true });
    b.add(tLoft('thigh', THIGH, D.limb), M(0, 0, 0), r.skin, part(th));
    b.add(tSphere(0.047, D.joint[0], D.joint[1]), M(0, -0.005, 0.006), r.skin, { ...part(shn), noEdges: true });
    b.add(tLoft('sock', SOCK, D.limb), M(0, 0, 0), r.socks, part(shn));
    b.add(tLoft('sockband', SOCK_BAND, D.limb, { caps: [false, false] }), M(0, 0, 0), r.trim, part(shn));
    b.add(tLoft('boot', BOOT, D.limb, { axis: 'z' }), M(0, 0, 0), r.boot, part(bt));
    b.add(tLoft('sole', SOLE, D.sole, { axis: 'z' }), M(0, 0, 0), R.INK, { ...part(bt), creaseOnly: true });
    // studs (only seen when the foot lifts, so High quality only)
    if (D.studs) for (const [sx, sz] of [[-0.028, -0.035], [0.028, -0.035], [-0.034, 0.07], [0.034, 0.07], [-0.03, 0.14], [0.03, 0.14]]) b.add(tCyl(0.009, 0.007, 0.014, 5), M(sx, -0.1, sz), R.INK, { ...part(bt), noEdges: true });
    // a contrasting flash along each side and laces on top
    if (D.laces) {
      for (const side of [-1, 1]) b.add(tBox(0.004, 0.012, 0.11), M(side * 0.051, -0.05, 0.06, -0.18), R.LINES, { ...part(bt), noEdges: true });
      for (let k = 0; k < 3; k++) b.add(tBox(0.034, 0.004, 0.008), M(0, -0.004 - k * 0.006, 0.02 + k * 0.03, -0.2), R.LINES, { ...part(bt), noEdges: true });
    }
    void s;
  }
}

// football: icosphere with black geometric panels around the 12 icosahedron vertices
function addBall(b, row) {
  const geo = new THREE.IcosahedronGeometry(0.11, 3);
  const ico = new THREE.IcosahedronGeometry(1, 0).toNonIndexed();
  const dirs = [];
  const ip = ico.attributes.position;
  for (let i = 0; i < ip.count; i++) {
    const v = new THREE.Vector3(ip.getX(i), ip.getY(i), ip.getZ(i)).normalize();
    if (!dirs.some((d) => d.distanceTo(v) < 1e-3)) dirs.push(v);
  }
  const t = tFrom('ball', () => geo, 70);
  const roles = [];
  const c = new THREE.Vector3();
  for (let i = 0; i < t.positions.length; i += 9) {
    c.set(t.positions[i] + t.positions[i + 3] + t.positions[i + 6], t.positions[i + 1] + t.positions[i + 4] + t.positions[i + 7], t.positions[i + 2] + t.positions[i + 5] + t.positions[i + 8]).normalize();
    let best = -1;
    for (const d of dirs) best = Math.max(best, d.dot(c));
    const role = best > Math.cos(0.36) ? R.BALL_B : R.BALL_W;
    roles.push(role, role, role);
  }
  b.add(t, new THREE.Matrix4(), R.BALL_W, { part: row, roles });
}

export class CharacterBatch {
  constructor(players, atlas, o = {}) {
    this.players = players;
    this.rows = players.length * PER + 1;
    this.ballRow = players.length * PER;
    const h = Math.max(1, this.rows);
    this.data = new Float32Array(4 * 4 * h);
    this.texture = new THREE.DataTexture(this.data, 4, h, THREE.RGBAFormat, THREE.FloatType);
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.needsUpdate = true;
    SU.uParts.value = this.texture;
    const b = new GeoBuilder({ parts: true, atlas: true });
    const D = DETAIL[o.quality] || DETAIL.high;
    const kits = o.kits || [];
    players.forEach((p, i) => addCharacter(b, p, i * PER, atlas, D, kits[p.team] && kits[p.team].pattern));
    addBall(b, this.ballRow);
    this.solidGeo = b.buildSolid();
    this.edgeGeo = b.buildEdges();
    this.mesh = new THREE.Mesh(this.solidGeo, CharacterBatch.solidMaterial());
    this.mesh.frustumCulled = false;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.customDepthMaterial = CharacterBatch.depthMaterial();
    this.edges = new THREE.Mesh(this.edgeGeo, CharacterBatch.edgeMaterial());
    this.edges.frustumCulled = false;
    this.edges.renderOrder = 1;
    for (let r = 0; r < this.rows; r++) this.setIdentity(r);
  }

  static solidMaterial() { return (CharacterBatch._sm ||= makeSolidMaterial({ parts: true, atlas: true })); }
  // players' ink is a little finer than the scenery's: they carry far more edges each
  static edgeMaterial() { return (CharacterBatch._em ||= makeEdgeMaterial({ parts: true, widthScale: 0.75 })); }
  static depthMaterial() { return (CharacterBatch._dm ||= makePartsDepthMaterial()); }

  setIdentity(row) { const o = row * 16; this.data.fill(0, o, o + 16); this.data[o] = this.data[o + 5] = this.data[o + 10] = this.data[o + 15] = 1; }
  setMatrix(row, m) { this.data.set(m.elements, row * 16); }
  hide(row) { const o = row * 16; this.data.fill(0, o, o + 16); this.data[o] = this.data[o + 5] = this.data[o + 10] = 0.0001; this.data[o + 13] = -50; this.data[o + 15] = 1; }
  commit() { this.texture.needsUpdate = true; }

  dispose() {
    this.solidGeo.dispose();
    this.edgeGeo.dispose();
    this.texture.dispose();
  }
}
