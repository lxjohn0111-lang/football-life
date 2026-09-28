// Pooled effects: soft ground shadows, pass-target and acknowledgement markers,
// short geometric celebration bursts. Allocated once and reused.
import * as THREE from 'three';
import { palette, R } from './palette.js';
import { makeBlobMaterial, makeFlatMaterial } from './shaders.js';

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _p = new THREE.Vector3(), _e = new THREE.Euler();

export class BlobShadows {
  constructor(max = 20) {
    const g = new THREE.PlaneGeometry(1, 1);
    g.rotateX(-Math.PI / 2);
    this.alpha = new THREE.InstancedBufferAttribute(new Float32Array(max), 1);
    g.setAttribute('aAlpha', this.alpha);
    this.mesh = new THREE.InstancedMesh(g, makeBlobMaterial(), max);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 2;
    this.max = max;
    this.count = 0;
  }
  begin() { this.count = 0; }
  add(x, z, size, a) {
    if (this.count >= this.max) return;
    _m.makeScale(size, 1, size).setPosition(x, 0.018, z);
    this.mesh.setMatrixAt(this.count, _m);
    this.alpha.setX(this.count, a);
    this.count++;
  }
  end() {
    this.mesh.count = this.count;
    this.mesh.instanceMatrix.needsUpdate = true;
    this.alpha.needsUpdate = true;
  }
}

export class Markers {
  constructor() {
    this.group = new THREE.Group();
    const ringG = new THREE.RingGeometry(0.5, 0.62, 40);
    ringG.rotateX(-Math.PI / 2);
    this.ring = new THREE.Mesh(ringG, makeFlatMaterial(R.MARKER, 0.85));
    this.ring.renderOrder = 3;
    this.ring.visible = false;
    const ackG = new THREE.ConeGeometry(0.16, 0.34, 4);
    ackG.rotateX(Math.PI);
    this.ack = new THREE.Mesh(ackG, makeFlatMaterial(R.MARKER, 1));
    this.ack.visible = false;
    const inG = new THREE.RingGeometry(0.2, 0.3, 24);
    inG.rotateX(-Math.PI / 2);
    this.incoming = new THREE.Mesh(inG, makeFlatMaterial(R.MARKER, 0.6));
    this.incoming.visible = false;
    this.group.add(this.ring, this.ack, this.incoming);
    this.ringT = 0;
  }
  showRing(x, z, t) {
    this.ring.visible = true;
    this.ringT = t;
    const s = 1 + 0.06 * Math.sin(t * 8);
    this.ring.position.set(x, 0.03, z);
    this.ring.scale.set(s, 1, s);
  }
  showAck(x, y, z, t) {
    this.ack.visible = true;
    this.ack.position.set(x, y + 0.1 * Math.sin(t * 10), z);
    this.ack.rotation.y = t * 3;
  }
  showIncoming(x, z) { this.incoming.visible = true; this.incoming.position.set(x, 0.03, z); }
  hideAll() { this.ring.visible = false; this.ack.visible = false; this.incoming.visible = false; }
}

// geometric celebration burst (confetti / ink shards), pooled
export class Burst {
  constructor(max = 180) {
    const g = new THREE.TetrahedronGeometry(0.16, 0);
    this.mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.mesh = new THREE.InstancedMesh(g, this.mat, max);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.max = max;
    this.parts = Array.from({ length: max }, () => ({ alive: false, p: new THREE.Vector3(), v: new THREE.Vector3(), r: new THREE.Vector3(), w: new THREE.Vector3(), life: 0, s: 1 }));
    this.col = new THREE.Color();
    for (let i = 0; i < max; i++) this.mesh.setColorAt(i, this.col.set(1, 1, 1));
    this.mesh.count = 0;
    this.active = 0;
  }
  spawn(x, y, z, n, roles, spread = 6, rand = Math.random) {
    let k = 0;
    for (const q of this.parts) {
      if (k >= n) break;
      if (q.alive) continue;
      q.alive = true;
      q.p.set(x + (rand() - 0.5) * 2, y + rand() * 1.5, z + (rand() - 0.5) * 2);
      const a = rand() * Math.PI * 2, up = 4 + rand() * 6;
      q.v.set(Math.cos(a) * spread * rand(), up, Math.sin(a) * spread * rand());
      q.r.set(rand() * 6, rand() * 6, rand() * 6);
      q.w.set((rand() - 0.5) * 12, (rand() - 0.5) * 12, (rand() - 0.5) * 12);
      q.life = 1.6 + rand() * 1.2;
      q.s = 0.6 + rand() * 0.9;
      q.role = roles[Math.floor(rand() * roles.length)];
      k++;
    }
  }
  update(dt) {
    let n = 0;
    for (const q of this.parts) {
      if (!q.alive) continue;
      q.life -= dt;
      if (q.life <= 0) { q.alive = false; continue; }
      q.v.y -= 9.8 * dt * 0.6;
      q.v.multiplyScalar(1 - 1.2 * dt);
      q.p.addScaledVector(q.v, dt);
      if (q.p.y < 0.05) { q.p.y = 0.05; q.v.set(0, 0, 0); }
      q.r.addScaledVector(q.w, dt);
      _e.set(q.r.x, q.r.y, q.r.z);
      _q.setFromEuler(_e);
      const sc = q.s * Math.min(1, q.life * 2);
      _m.compose(q.p, _q, _s.set(sc, sc, sc));
      this.mesh.setMatrixAt(n, _m);
      this.mesh.setColorAt(n, palette[q.role]);
      n++;
    }
    this.mesh.count = n;
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
    this.active = n;
  }
  clear() { for (const q of this.parts) q.alive = false; this.mesh.count = 0; }
}
