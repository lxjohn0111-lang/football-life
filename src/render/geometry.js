// Primitive templates (box, cylinder, sphere, cone, plane) with precomputed
// edge adjacency, and a builder that merges thousands of primitives into one
// solid mesh + one fat-line edge batch (per material role via vertex roles).
import * as THREE from 'three';

const templateCache = new Map();

function toTemplate(geo, crease, withEdges = true) {
  const g = geo.index ? geo.toNonIndexed() : geo;
  const positions = new Float32Array(g.attributes.position.array);
  const normals = new Float32Array(g.attributes.normal.array);
  const uvs = g.attributes.uv ? new Float32Array(g.attributes.uv.array) : null;
  const edges = withEdges ? extractEdges(geo, crease) : [];
  return { positions, normals, uvs, edges };
}

// weld by position, collect adjacent face normals for every edge
export function extractEdges(geo, creaseDeg = 32) {
  const pos = geo.attributes.position;
  const map = new Map();
  const welded = [];
  const remap = new Int32Array(pos.count);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const key = `${Math.round(x * 1e4)},${Math.round(y * 1e4)},${Math.round(z * 1e4)}`;
    let id = map.get(key);
    if (id === undefined) { id = welded.length; map.set(key, id); welded.push([x, y, z]); }
    remap[i] = id;
  }
  const idx = geo.index ? geo.index.array : null;
  const triCount = idx ? idx.length / 3 : pos.count / 3;
  const edgeMap = new Map();
  const N = welded.length;
  const e1 = new THREE.Vector3(), e2 = new THREE.Vector3(), n = new THREE.Vector3();
  for (let t = 0; t < triCount; t++) {
    const ia = remap[idx ? idx[t * 3] : t * 3], ib = remap[idx ? idx[t * 3 + 1] : t * 3 + 1], ic = remap[idx ? idx[t * 3 + 2] : t * 3 + 2];
    if (ia === ib || ib === ic || ia === ic) continue;
    const A = welded[ia], B = welded[ib], C = welded[ic];
    e1.set(B[0] - A[0], B[1] - A[1], B[2] - A[2]);
    e2.set(C[0] - A[0], C[1] - A[1], C[2] - A[2]);
    n.crossVectors(e1, e2);
    if (n.lengthSq() < 1e-14) continue;
    n.normalize();
    const nn = [n.x, n.y, n.z];
    for (const [u, v] of [[ia, ib], [ib, ic], [ic, ia]]) {
      const lo = Math.min(u, v), hi = Math.max(u, v);
      const key = lo * N + hi;
      let e = edgeMap.get(key);
      if (!e) { e = { a: lo, b: hi, normals: [] }; edgeMap.set(key, e); }
      e.normals.push(nn);
    }
  }
  const cosT = Math.cos((creaseDeg * Math.PI) / 180);
  const out = [];
  for (const e of edgeMap.values()) {
    const n1 = e.normals[0];
    if (e.normals.length === 1) {
      out.push({ a: welded[e.a], b: welded[e.b], n1, n2: [0, 0, 0], crease: 1 });
      continue;
    }
    const n2 = e.normals[1];
    const d = n1[0] * n2[0] + n1[1] * n2[1] + n1[2] * n2[2];
    if (d > 0.9999) continue; // flat: never a crease nor a silhouette
    out.push({ a: welded[e.a], b: welded[e.b], n1, n2, crease: d < cosT ? 1 : 0 });
  }
  return out;
}

export function tBox(w, h, d) {
  const key = `box:${w}:${h}:${d}`;
  if (!templateCache.has(key)) templateCache.set(key, toTemplate(new THREE.BoxGeometry(w, h, d), 30));
  return templateCache.get(key);
}
export function tCyl(rt, rb, h, seg = 8, open = false) {
  const key = `cyl:${rt}:${rb}:${h}:${seg}:${open}`;
  if (!templateCache.has(key)) templateCache.set(key, toTemplate(new THREE.CylinderGeometry(rt, rb, h, seg, 1, open), seg <= 4 ? 30 : 60));
  return templateCache.get(key);
}
export function tSphere(r, ws = 12, hs = 8, phiLen = Math.PI * 2, thetaLen = Math.PI) {
  const key = `sph:${r}:${ws}:${hs}:${phiLen}:${thetaLen}`;
  if (!templateCache.has(key)) templateCache.set(key, toTemplate(new THREE.SphereGeometry(r, ws, hs, 0, phiLen, 0, thetaLen), 70));
  return templateCache.get(key);
}
export function tCone(r, h, seg = 8) {
  const key = `cone:${r}:${h}:${seg}`;
  if (!templateCache.has(key)) templateCache.set(key, toTemplate(new THREE.ConeGeometry(r, h, seg), seg <= 4 ? 30 : 60));
  return templateCache.get(key);
}
export function tPlane(w, d, edges = false) {
  const key = `plane:${w}:${d}:${edges}`;
  if (!templateCache.has(key)) {
    const g = new THREE.PlaneGeometry(w, d);
    g.rotateX(-Math.PI / 2);
    templateCache.set(key, toTemplate(g, 30, edges));
  }
  return templateCache.get(key);
}
export function tQuad(w, h) { // vertical, facing +z
  const key = `quad:${w}:${h}`;
  if (!templateCache.has(key)) templateCache.set(key, toTemplate(new THREE.PlaneGeometry(w, h), 30, false));
  return templateCache.get(key);
}
// arbitrary cached template built by a factory returning a BufferGeometry
export function tFrom(key, factory, crease = 30, edges = true) {
  if (!templateCache.has(key)) templateCache.set(key, toTemplate(factory(), crease, edges));
  return templateCache.get(key);
}

export function tIco(r, detail = 1) {
  const key = `ico:${r}:${detail}`;
  if (!templateCache.has(key)) templateCache.set(key, toTemplate(new THREE.IcosahedronGeometry(r, detail), 70));
  return templateCache.get(key);
}

const _m = new THREE.Matrix4(), _nm = new THREE.Matrix3(), _v = new THREE.Vector3(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _s = new THREE.Vector3();

export class GeoBuilder {
  constructor(o = {}) {
    this.opts = o;
    this.pos = []; this.nor = []; this.role = []; this.part = []; this.bob = []; this.uv = [];
    this.eA = []; this.eB = []; this.eN1 = []; this.eN2 = []; this.eMeta = []; this.eBob = [];
    this.vcount = 0;
  }

  // add a template transformed by matrix
  add(t, matrix, role, o = {}) {
    _nm.getNormalMatrix(matrix);
    const e = matrix.elements;
    const P = t.positions, N = t.normals;
    const part = o.part ?? -1;
    const bob = o.bob || null;
    const uvRect = o.uvRect || null;
    const roleOf = o.roleFn || null;
    for (let i = 0; i < P.length; i += 3) {
      const x = P[i], y = P[i + 1], z = P[i + 2];
      this.pos.push(e[0] * x + e[4] * y + e[8] * z + e[12], e[1] * x + e[5] * y + e[9] * z + e[13], e[2] * x + e[6] * y + e[10] * z + e[14]);
      _v.set(N[i], N[i + 1], N[i + 2]).applyMatrix3(_nm).normalize();
      this.nor.push(_v.x, _v.y, _v.z);
      this.role.push(o.roles ? o.roles[i / 3] : roleOf ? roleOf(i / 3, x, y, z) : role);
      if (this.opts.parts) this.part.push(part);
      if (this.opts.bob) this.bob.push(bob ? bob[0] : 0, bob ? bob[1] : 0);
      if (this.opts.atlas) {
        if (uvRect && t.uvs) {
          const k = (i / 3) * 2;
          this.uv.push(uvRect[0] + t.uvs[k] * (uvRect[2] - uvRect[0]), uvRect[1] + t.uvs[k + 1] * (uvRect[3] - uvRect[1]));
        } else this.uv.push(-1, -1);
      }
    }
    this.vcount += P.length / 3;
    if (o.noEdges || !t.edges.length) return this;
    const creaseOnly = !!o.creaseOnly;
    for (const ed of t.edges) {
      if (creaseOnly && ed.crease < 0.5) continue;
      const a = ed.a, b = ed.b;
      this.eA.push(e[0] * a[0] + e[4] * a[1] + e[8] * a[2] + e[12], e[1] * a[0] + e[5] * a[1] + e[9] * a[2] + e[13], e[2] * a[0] + e[6] * a[1] + e[10] * a[2] + e[14]);
      this.eB.push(e[0] * b[0] + e[4] * b[1] + e[8] * b[2] + e[12], e[1] * b[0] + e[5] * b[1] + e[9] * b[2] + e[13], e[2] * b[0] + e[6] * b[1] + e[10] * b[2] + e[14]);
      _v.set(ed.n1[0], ed.n1[1], ed.n1[2]).applyMatrix3(_nm).normalize();
      this.eN1.push(_v.x, _v.y, _v.z);
      if (ed.n2[0] === 0 && ed.n2[1] === 0 && ed.n2[2] === 0) this.eN2.push(0, 0, 0);
      else { _v.set(ed.n2[0], ed.n2[1], ed.n2[2]).applyMatrix3(_nm).normalize(); this.eN2.push(_v.x, _v.y, _v.z); }
      this.eMeta.push(part, ed.crease);
      if (this.opts.bob) this.eBob.push(bob ? bob[0] : 0, bob ? bob[1] : 0);
    }
    return this;
  }

  // explicit line segment (always drawn), e.g. fences and nets
  line(ax, ay, az, bx, by, bz, part = -1) {
    this.eA.push(ax, ay, az); this.eB.push(bx, by, bz);
    this.eN1.push(0, 1, 0); this.eN2.push(0, 0, 0);
    this.eMeta.push(part, 1);
    if (this.opts.bob) this.eBob.push(0, 0);
    return this;
  }

  static mat(x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) {
    _e.set(rx, ry, rz, 'YXZ');
    _q.setFromEuler(_e);
    return new THREE.Matrix4().compose(_v.set(x, y, z).clone(), _q.clone(), _s.set(sx, sy, sz).clone());
  }

  box(role, w, h, d, x, y, z, ry = 0, o = {}) { return this.add(tBox(w, h, d), GeoBuilder.mat(x, y, z, o.rx || 0, ry, o.rz || 0), role, o); }
  cyl(role, rt, rb, h, seg, x, y, z, o = {}) { return this.add(tCyl(rt, rb, h, seg, o.open), GeoBuilder.mat(x, y, z, o.rx || 0, o.ry || 0, o.rz || 0, o.sx || 1, 1, o.sz || 1), role, o); }
  sphere(role, r, x, y, z, o = {}) { return this.add(tSphere(r, o.ws || 12, o.hs || 8, o.phi, o.theta), GeoBuilder.mat(x, y, z, o.rx || 0, o.ry || 0, o.rz || 0, o.sx || 1, o.sy || 1, o.sz || 1), role, o); }
  cone(role, r, h, seg, x, y, z, o = {}) { return this.add(tCone(r, h, seg), GeoBuilder.mat(x, y, z, o.rx || 0, o.ry || 0, o.rz || 0, o.sx || 1, o.sy || 1, o.sz || 1), role, o); }
  plane(role, w, d, x, y, z, o = {}) { return this.add(tPlane(w, d, !!o.edges), GeoBuilder.mat(x, y, z, 0, o.ry || 0, 0), role, { noEdges: !o.edges, ...o }); }
  quad(role, w, h, x, y, z, ry = 0, o = {}) { return this.add(tQuad(w, h), GeoBuilder.mat(x, y, z, o.rx || 0, ry, 0), role, { noEdges: true, ...o }); }

  // cylinder spanning two points
  between(role, r, ax, ay, az, bx, by, bz, seg = 6, o = {}) {
    const dx = bx - ax, dy = by - ay, dz = bz - az;
    const len = Math.hypot(dx, dy, dz);
    const m = new THREE.Matrix4();
    const dir = new THREE.Vector3(dx, dy, dz).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    m.compose(new THREE.Vector3((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2), q, new THREE.Vector3(1, 1, 1));
    return this.add(tCyl(r, r, len, seg), m, role, o);
  }

  buildSolid() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute('aRole', new THREE.Float32BufferAttribute(this.role, 1));
    if (this.opts.parts) g.setAttribute('aPart', new THREE.Float32BufferAttribute(this.part, 1));
    if (this.opts.bob) g.setAttribute('aBob', new THREE.Float32BufferAttribute(this.bob, 2));
    if (this.opts.atlas) g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    g.computeBoundingSphere();
    return g;
  }

  buildEdges() {
    const g = new THREE.InstancedBufferGeometry();
    const base = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0];
    g.setIndex([0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5]);
    g.setAttribute('position', new THREE.Float32BufferAttribute(base, 3));
    const n = this.eA.length / 3;
    g.setAttribute('iA', new THREE.InstancedBufferAttribute(new Float32Array(this.eA), 3));
    g.setAttribute('iB', new THREE.InstancedBufferAttribute(new Float32Array(this.eB), 3));
    g.setAttribute('iN1', new THREE.InstancedBufferAttribute(new Float32Array(this.eN1), 3));
    g.setAttribute('iN2', new THREE.InstancedBufferAttribute(new Float32Array(this.eN2), 3));
    g.setAttribute('iMeta', new THREE.InstancedBufferAttribute(new Float32Array(this.eMeta), 2));
    if (this.opts.bob) g.setAttribute('iBob', new THREE.InstancedBufferAttribute(new Float32Array(this.eBob), 2));
    g.instanceCount = n;
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    return g;
  }

  get edgeCount() { return this.eA.length / 3; }
}
