// The scene view: renderer, venue, characters, ball, nets, sky and effects,
// plus live visual-style switching that only recolours shared role colours
// and flips uniforms (nothing is rebuilt, the simulation is never touched).
import * as THREE from 'three';
import { SU, makeSolidMaterial, makeEdgeMaterial, makeSkyMaterial, makeScreenMaterial } from './shaders.js';
import { palette, R, applyStyle, STYLES, setMatchColours } from './palette.js';
import { buildVenue, buildNets, buildClouds } from './venues.js';
import { CharacterBatch, PER, P } from './characters.js';
import { Animator } from './anim.js';
import { Atlas, ScoreboardTexture } from './atlas.js';
import { BlobShadows, Markers, Burst } from './effects.js';
import { BALL_R, PITCH } from '../sim/constants.js';

THREE.ColorManagement.enabled = false;

export class SceneView {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.quality = opts.quality || 'high';
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: !!opts.preserve });
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.shadowMap.autoUpdate = false;
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xf2f1ea, 60, 330);
    this.camera = new THREE.PerspectiveCamera(85, 16 / 9, 0.07, 1500);
    this.camera.rotation.order = 'YXZ';

    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(-36, 64, 30);
    sun.castShadow = true;
    const sc = sun.shadow.camera;
    sc.left = -46; sc.right = 46; sc.top = 34; sc.bottom = -34; sc.near = 1; sc.far = 200;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0008;
    sun.shadow.normalBias = 0.02;
    this.sun = sun;
    this.scene.add(sun, sun.target);
    SU.uLightDir.value.copy(sun.position).normalize();

    this.sky = new THREE.Mesh(new THREE.SphereGeometry(1200, 24, 12), makeSkyMaterial());
    this.sky.renderOrder = -10;
    this.sky.frustumCulled = false;
    this.scene.add(this.sky);

    const clouds = buildClouds();
    this.clouds = new THREE.Group();
    const cm = new THREE.Mesh(clouds.solid, makeSolidMaterial({ fog: false }));
    const ce = new THREE.Mesh(clouds.edges, makeEdgeMaterial({ fog: false }));
    ce.frustumCulled = false;
    this.clouds.add(cm, ce);
    this.scene.add(this.clouds);

    this.atlas = new Atlas();
    SU.uAtlas.value = this.atlas.texture;
    this.scoreTex = new ScoreboardTexture();
    this.screenMat = makeScreenMaterial(this.scoreTex.texture);

    this.staticMat = makeSolidMaterial({ crowd: true, atlas: true });
    this.staticEdgeMat = makeEdgeMaterial({ crowd: true });
    this.casterMat = makeSolidMaterial({});
    this.casterEdgeMat = makeEdgeMaterial({});
    this.netMat = makeEdgeMaterial({ net: true, role: R.NET, widthScale: 0.5 });
    this.nets = new THREE.Mesh(buildNets(), this.netMat);
    this.nets.frustumCulled = false;
    this.scene.add(this.nets);
    this.netState = [{ amp: 0, t: 9, x: 0, y: 0, z: 0, dx: 1, dy: 0, dz: 0, count: 0 }, { amp: 0, t: 9, x: 0, y: 0, z: 0, dx: -1, dy: 0, dz: 0, count: 0 }];

    this.blobs = new BlobShadows(24);
    this.markers = new Markers();
    this.burst = new Burst(200);
    this.scene.add(this.blobs.mesh, this.markers.group, this.burst.mesh);

    this.venue = null;
    this.venueObjs = [];
    this.batch = null;
    this.animators = [];
    this.match = null;
    this.style = 'classic';
    this.fov = 85;
    this.time = 0;
    this.shake = 0;
    this.ballPos = new THREE.Vector3();
    this.ballQ = new THREE.Quaternion();
    this.ballM = new THREE.Matrix4();
    this.crowdLevel = 0;
    this.localPlayer = null;
    this.firstPerson = true;
    this.hideHead = true;
    this.resize();
  }

  setQuality(q) {
    this.quality = q;
    const dpr = window.devicePixelRatio || 1;
    this.renderer.setPixelRatio(q === 'low' ? Math.min(1, dpr) * 0.75 : q === 'medium' ? Math.min(1.25, dpr) : Math.min(2, dpr));
    const size = q === 'low' ? 1024 : 2048;
    if (this.sun.shadow.mapSize.x !== size) {
      this.sun.shadow.mapSize.set(size, size);
      if (this.sun.shadow.map) { this.sun.shadow.map.dispose(); this.sun.shadow.map = null; }
    }
    this.resize();
  }

  resize() {
    const w = this.canvas.clientWidth || window.innerWidth, h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    const pr = this.renderer.getPixelRatio();
    SU.uResolution.value.set(w * pr, h * pr);
    this.pixelRatio = pr;
    this.applyLineWidth();
  }

  applyLineWidth() {
    const st = STYLES[this.style];
    const pr = this.pixelRatio || 1;
    SU.uLineWidth.value = st.lineWidth * pr;
    SU.uMinWidth.value = Math.min(st.lineWidth, 1.1) * pr;
    SU.uTaper.value = st.name === 'neo' ? 16 : 40;
  }

  // ------------------------------------------------------------- style
  setStyle(name) {
    const st = applyStyle(name);
    this.style = st.name;
    SU.uToon.value = st.toon;
    SU.uShadowAmt.value = st.shadow;
    this.renderer.shadowMap.autoUpdate = st.shadow > 0;
    this.renderer.shadowMap.needsUpdate = st.shadow > 0;
    this.scene.fog.color.set(st.fog);
    this.scene.fog.near = st.fogNear;
    this.scene.fog.far = st.fogFar;
    this.clouds.visible = st.clouds;
    this.blobShowPlayers = st.blobs;
    this.applyLineWidth();
    if (this.match) this.updateScoreboard(true);
    document.documentElement.dataset.style = st.name;
  }

  // ------------------------------------------------------------- venue
  setVenue(type, o = {}) {
    const key = `${type}|${o.homeName}|${o.final}|${this.quality}`;
    if (this.venueKey === key) return;
    this.venueKey = key;
    for (const obj of this.venueObjs) { this.scene.remove(obj); obj.geometry.dispose(); }
    this.venueObjs = [];
    const v = buildVenue(type, { atlas: this.atlas, quality: this.quality, homeName: o.homeName || 'HOME', final: !!o.final, seed: o.seed || 7 });
    this.venue = v;
    const solid = new THREE.Mesh(v.solid, this.staticMat);
    solid.receiveShadow = true;
    const edges = new THREE.Mesh(v.edges, this.staticEdgeMat);
    edges.frustumCulled = false;
    const cs = new THREE.Mesh(v.casterSolid, this.casterMat);
    cs.castShadow = true; cs.receiveShadow = true;
    const ceM = new THREE.Mesh(v.casterEdges, this.casterEdgeMat);
    ceM.frustumCulled = false;
    this.venueObjs.push(solid, edges, cs, ceM);
    for (const s of v.screens) {
      const q = new THREE.Mesh(new THREE.PlaneGeometry(s.w, s.h), this.screenMat);
      q.position.set(s.x, s.y, s.z);
      q.rotation.y = s.ry + Math.PI;
      q.translateZ(-0.06);
      this.venueObjs.push(q);
    }
    for (const o2 of this.venueObjs) this.scene.add(o2);
    this.renderer.shadowMap.needsUpdate = true;
  }

  // ------------------------------------------------------------- match
  setMatch(match, colours) {
    this.match = match;
    if (colours) setMatchColours(colours.kits, colours.human);
    this.rebuildCharacters();
    this.burst.clear();
    this.netState.forEach((n) => { n.amp = 0; n.t = 9; });
    this.updateScoreboard(true);
  }

  rebuildCharacters() {
    if (this.batch) { this.scene.remove(this.batch.mesh, this.batch.edges); this.batch.dispose(); }
    this.batch = new CharacterBatch(this.match.players, this.atlas);
    this.scene.add(this.batch.mesh, this.batch.edges);
    this.animators = this.match.players.map((p) => new Animator(p));
  }

  updateScoreboard(force) {
    const m = this.match;
    if (!m) return;
    this.scoreTex.update(m.teams[0].short || 'HOM', m.teams[1].short || 'AWY', m.scoreline, m.displayClock.slice(0, 2) + "'", this.style, m.phase === 'fulltime');
    if (force) this.scoreTex.key = '';
  }

  // ------------------------------------------------------------- per frame
  // cam: { yaw, pitch, mode: 'fp'|'orbit'|'free', pos? }
  render(alpha, dt, cam, extras = {}) {
    const m = this.match;
    this.time += dt;
    SU.uTime.value = this.time;
    // crowd excitement
    this.crowdLevel = Math.max(extras.crowd ?? 0, this.crowdLevel - dt * 0.35);
    SU.uCrowd.value = this.crowdLevel;
    if (m && this.batch) {
      const now = m.time - (1 - alpha) * (1 / 120);
      const b = m.ball;
      this.ballPos.set(b.prevPos.x + (b.pos.x - b.prevPos.x) * alpha, b.prevPos.y + (b.pos.y - b.prevPos.y) * alpha, b.prevPos.z + (b.pos.z - b.prevPos.z) * alpha);
      const qa = this._qa || (this._qa = new THREE.Quaternion()), qb = this._qb || (this._qb = new THREE.Quaternion());
      qa.set(b.prevQ[0], b.prevQ[1], b.prevQ[2], b.prevQ[3]);
      qb.set(b.q[0], b.q[1], b.q[2], b.q[3]);
      this.ballQ.slerpQuaternions(qa, qb, alpha);
      this.ballM.compose(this.ballPos, this.ballQ, this._one || (this._one = new THREE.Vector3(1, 1, 1)));
      this.batch.setMatrix(this.batch.ballRow, this.ballM);
      const ctx = { match: m, alpha, dt, now, ball: this.ballPos, local: false };
      this.blobs.begin();
      for (let i = 0; i < this.animators.length; i++) {
        const an = this.animators[i];
        const p = an.p;
        ctx.local = p === this.localPlayer && this.firstPerson;
        const mats = an.update(ctx);
        const base = i * PER;
        for (let k = 0; k < PER; k++) this.batch.setMatrix(base + k, mats[k]);
        if (ctx.local && this.hideHead) { this.batch.hide(base + P.HEAD); this.batch.hide(base + P.TORSO); }
        if (this.blobShowPlayers) this.blobs.add(an.root.x, an.root.z, 0.95, 0.2);
      }
      const h = Math.max(0, this.ballPos.y - BALL_R);
      this.blobs.add(this.ballPos.x, this.ballPos.z, 0.34 + h * 0.12, 0.42 / (1 + h * 0.8));
      this.blobs.end();
      this.batch.commit();
      this.updateNets(dt);
      this.updateScoreboard(false);
    }
    this.burst.update(dt);
    this.updateCamera(cam, dt, alpha);
    this.renderer.render(this.scene, this.camera);
  }

  updateNets(dt) {
    const b = this.match.ball;
    for (let gi = 0; gi < 2; gi++) {
      const st = this.netState[gi];
      const c = b.net[gi];
      if (c && c.count !== st.count) {
        // the ball is pushing into the net: bulge around the contact point
        st.count = c.count;
        st.amp = Math.max(st.amp * 0.9, Math.min(0.6, 0.12 + c.depth * 2));
        st.x = c.x; st.y = c.y; st.z = c.z;
        st.dx = -c.nx; st.dy = -c.ny; st.dz = -c.nz;
        st.t = 0;
        st.contact = true;
        c.depth = 0;
      } else {
        st.t += dt;
        st.contact = false;
      }
      const disp = st.amp * Math.cos(st.t * 14) * Math.exp(-st.t * 3.4);
      if (st.t > 3) st.amp = 0;
      const u = gi === 0 ? SU.uNetA.value : SU.uNetB.value;
      const d = gi === 0 ? SU.uNetDA.value : SU.uNetDB.value;
      u.set(st.x, st.y, st.z, disp);
      d.set(st.dx, st.dy, st.dz);
    }
  }

  updateCamera(cam, dt, alpha) {
    const c = this.camera;
    if (cam.fov) {
      // the FOV setting is horizontal (as in most first-person games); three.js wants vertical
      const v = THREE.MathUtils.clamp(2 * Math.atan(Math.tan((cam.fov * Math.PI) / 360) / c.aspect) * 180 / Math.PI, 35, 95);
      if (Math.abs(v - c.fov) > 0.01) { c.fov = v; c.updateProjectionMatrix(); }
    }
    if (cam.mode === 'fp' && this.localPlayer && this.match) {
      const p = this.localPlayer;
      const x = p.prevPos.x + (p.pos.x - p.prevPos.x) * alpha;
      const z = p.prevPos.z + (p.pos.z - p.prevPos.z) * alpha;
      let eye = cam.eye ?? 1.65;
      if (cam.bob) {
        const sp = Math.min(1, p.speed / 7.5);
        eye += Math.sin((p.prevGait + (p.gait - p.prevGait) * alpha) * Math.PI * 4) * 0.012 * sp * cam.bob;
      }
      c.position.set(x + Math.sin(cam.yaw) * 0.08, eye, z + Math.cos(cam.yaw) * 0.08);
      if (cam.shake && this.shake > 0) {
        const s = this.shake * cam.shake;
        c.position.x += (Math.random() - 0.5) * 0.02 * s;
        c.position.y += (Math.random() - 0.5) * 0.02 * s;
      }
      this.shake = Math.max(0, this.shake - dt * 4);
      c.rotation.set(cam.pitch, cam.yaw + Math.PI, 0, 'YXZ');
    } else if (cam.mode === 'orbit') {
      const a = cam.angle;
      c.position.set(Math.cos(a) * cam.radius, cam.height, Math.sin(a) * cam.radius);
      c.lookAt(cam.target || (this._origin || (this._origin = new THREE.Vector3())));
    } else if (cam.pos) {
      const P = cam.pos, L = cam.look;
      c.position.set(P.x ?? P[0], P.y ?? P[1], P.z ?? P[2]);
      if (L) c.lookAt(L.x ?? L[0], L.y ?? L[1], L.z ?? L[2]); else c.rotation.set(cam.pitch || 0, (cam.yaw || 0) + Math.PI, 0, 'YXZ');
    }
  }

  celebrate(x, z, team, big = 1) {
    const roles = this.style === 'neo'
      ? [team === 0 ? R.SHIRT_0 : R.SHIRT_1, R.GOLD, R.MARKER, R.LINES, R.STAND_C]
      : [R.INK, R.LINES, team === 0 ? R.SHIRT_0 : R.SHIRT_1];
    this.burst.spawn(x, 1.5, z, Math.round(70 * big), roles, 7);
  }

  // render the live scene in a given style into a small image (for the style menu)
  renderPreview(styleName, w, h, cam) {
    const prev = this.style;
    const rt = new THREE.WebGLRenderTarget(w, h, { samples: 4 });
    const oldRes = SU.uResolution.value.clone();
    const oldAspect = this.camera.aspect;
    this.setStyle(styleName);
    SU.uResolution.value.set(w, h);
    SU.uLineWidth.value = STYLES[styleName].lineWidth;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    const savedPos = this.camera.position.clone(), savedQ = this.camera.quaternion.clone();
    if (cam) {
      this.camera.position.set(cam.pos[0], cam.pos[1], cam.pos[2]);
      this.camera.lookAt(new THREE.Vector3(cam.look[0], cam.look[1], cam.look[2]));
    }
    this.renderer.shadowMap.needsUpdate = true;
    this.renderer.setRenderTarget(rt);
    this.renderer.render(this.scene, this.camera);
    const buf = new Uint8Array(w * h * 4);
    this.renderer.readRenderTargetPixels(rt, 0, 0, w, h, buf);
    this.renderer.setRenderTarget(null);
    rt.dispose();
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    const ctx2 = cv.getContext('2d');
    const img = ctx2.createImageData(w, h);
    for (let y = 0; y < h; y++) img.data.set(buf.subarray((h - 1 - y) * w * 4, (h - y) * w * 4), y * w * 4);
    ctx2.putImageData(img, 0, 0);
    this.setStyle(prev);
    this.camera.position.copy(savedPos);
    this.camera.quaternion.copy(savedQ);
    SU.uResolution.value.copy(oldRes);
    this.applyLineWidth();
    this.camera.aspect = oldAspect;
    this.camera.updateProjectionMatrix();
    return cv.toDataURL('image/png');
  }

  stats() {
    const i = this.renderer.info;
    return { calls: i.render.calls, tris: i.render.triangles, people: this.venue ? this.venue.people : 0 };
  }
}
