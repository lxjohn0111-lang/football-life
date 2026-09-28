// Stickman rig geometry. Every player (and the ball) is merged into ONE mesh and
// ONE edge batch; each vertex belongs to a rigid part whose world matrix is
// fetched from a float texture updated every frame by the animator.
import * as THREE from 'three';
import { GeoBuilder, tBox, tCyl, tSphere, tQuad, tFrom } from './geometry.js';
import { R } from './palette.js';
import { makeSolidMaterial, makeEdgeMaterial, makePartsDepthMaterial, SU } from './shaders.js';

export const P = { PELVIS: 0, TORSO: 1, HEAD: 2, UARM_L: 3, UARM_R: 4, FARM_L: 5, FARM_R: 6, THIGH_L: 7, THIGH_R: 8, SHIN_L: 9, SHIN_R: 10, BOOT_L: 11, BOOT_R: 12 };
export const PER = 13;
export const DIM = { thigh: 0.44, shin: 0.43, ankle: 0.08, upper: 0.29, fore: 0.27, hipW: 0.095, shoulderW: 0.19, torsoH: 0.5, waist: 0.07, neck: 0.08 };

const M = (x, y, z, rx = 0, ry = 0, rz = 0) => GeoBuilder.mat(x, y, z, rx, ry, rz);

const torsoT = () => tFrom('torso', () => {
  const g = new THREE.CylinderGeometry(0.265, 0.205, 0.5, 4, 1);
  g.rotateY(Math.PI / 4);
  g.scale(1, 1, 0.58);
  g.translate(0, 0.25, 0);
  return g;
}, 30);

const HAIRS = [R.HAIR_1, R.HAIR_2, R.HAIR_1];
const SKINS = [R.SKIN_1, R.SKIN_2, R.SKIN_3];

function roleSet(p) {
  const t = p.team;
  const gk = p.isGK;
  return {
    shirt: gk ? (t === 0 ? R.GK_0 : R.GK_1) : (t === 0 ? R.SHIRT_0 : R.SHIRT_1),
    shorts: gk ? (t === 0 ? R.GKX_0 : R.GKX_1) : (t === 0 ? R.SHORTS_0 : R.SHORTS_1),
    socks: gk ? (t === 0 ? R.GKX_0 : R.GKX_1) : (t === 0 ? R.SOCKS_0 : R.SOCKS_1),
    num: t === 0 ? R.NUM_0 : R.NUM_1,
    skin: p.isHuman ? R.SKIN_H : SKINS[(p.id * 7) % 3],
    hair: p.isHuman ? R.HAIR_H : HAIRS[(p.id * 5) % 3],
    boot: p.isHuman ? R.BOOT_H : R.BOOT,
    hand: gk ? R.GLOVE : (p.isHuman ? R.SKIN_H : SKINS[(p.id * 7) % 3]),
  };
}

function addCharacter(b, p, base, atlas) {
  const r = roleSet(p);
  const part = (k) => ({ part: base + k });
  // pelvis / shorts
  b.add(tBox(0.3, 0.2, 0.19), M(0, -0.01, 0), r.shorts, part(P.PELVIS));
  // shirt-shaped torso, neck
  b.add(torsoT(), M(0, 0, 0), r.shirt, part(P.TORSO));
  b.add(tCyl(0.045, 0.05, 0.1, 8), M(0, 0.53, 0), r.skin, part(P.TORSO));
  // shirt number on the back
  const num = String(p.number ?? 0);
  const dw = num.length > 1 ? 0.12 : 0.16;
  for (let i = 0; i < num.length; i++) {
    const x = (i - (num.length - 1) / 2) * dw * 0.95;
    b.add(tQuad(dw, 0.2), M(x, 0.3, -0.113, 0, Math.PI, 0), r.num, { ...part(P.TORSO), uvRect: atlas.digit(+num[i]), noEdges: true });
  }
  // small front number
  b.add(tQuad(0.07, 0.09), M(0.09, 0.36, 0.113, 0, 0, 0), r.num, { ...part(P.TORSO), uvRect: atlas.digit(+num[num.length - 1]), noEdges: true });
  // head, hair and eyes
  b.add(tSphere(0.12, 14, 10), M(0, 0.13, 0), r.skin, part(P.HEAD));
  b.add(tSphere(0.126, 14, 6, Math.PI * 2, Math.PI * 0.42), M(0, 0.14, -0.012, -0.25, 0, 0), r.hair, { ...part(P.HEAD), creaseOnly: false });
  for (const s of [-1, 1]) b.add(tBox(0.026, 0.038, 0.012), M(s * 0.045, 0.145, 0.114), R.EYE, { ...part(P.HEAD), noEdges: true });
  // arms
  for (const [ua, fa, s] of [[P.UARM_L, P.FARM_L, 1], [P.UARM_R, P.FARM_R, -1]]) {
    b.add(tCyl(0.064, 0.058, 0.13, 8), M(0, -0.055, 0), r.shirt, part(ua));
    b.add(tCyl(0.043, 0.04, 0.29, 7), M(0, -0.145, 0), r.skin, { ...part(ua), noEdges: false });
    b.add(tCyl(0.039, 0.034, 0.26, 7), M(0, -0.13, 0), r.skin, part(fa));
    b.add(tSphere(p.isGK ? 0.062 : 0.05, 8, 6), M(0, -0.285, 0.005), r.hand, part(fa));
    void s;
  }
  // legs
  for (const [th, sh, bt] of [[P.THIGH_L, P.SHIN_L, P.BOOT_L], [P.THIGH_R, P.SHIN_R, P.BOOT_R]]) {
    b.add(tCyl(0.078, 0.07, 0.2, 8), M(0, -0.08, 0), r.shorts, part(th));
    b.add(tCyl(0.062, 0.052, 0.44, 8), M(0, -0.22, 0), r.skin, part(th));
    b.add(tCyl(0.054, 0.045, 0.42, 8), M(0, -0.21, 0), r.socks, part(sh));
    b.add(tBox(0.1, 0.075, 0.26), M(0, -0.045, 0.06), r.boot, part(bt));
    b.add(tBox(0.104, 0.02, 0.27), M(0, -0.08, 0.06), R.INK, { ...part(bt), noEdges: true });
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
  constructor(players, atlas) {
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
    players.forEach((p, i) => addCharacter(b, p, i * PER, atlas));
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
  static edgeMaterial() { return (CharacterBatch._em ||= makeEdgeMaterial({ parts: true })); }
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
