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

// Horizontal field of view (degrees) up to which a normal perspective camera is
// used. Wider views render a cube map around the eye and remap it to the screen
// with a general perspective projection r = (d+1)·sinθ / (d+cosθ): d = 0 is the
// ordinary rectilinear view (so the switch is seamless), d = 1 is stereographic,
// which can show 200 degrees and more without extreme stretching.
export const RECTILINEAR_MAX_FOV = 120;
const WIDE_FULL_AT = 175;

function wideParams(hfov) {
  const d = THREE.MathUtils.clamp((hfov - RECTILINEAR_MAX_FOV) / (WIDE_FULL_AT - RECTILINEAR_MAX_FOV), 0, 1);
  const half = (hfov * Math.PI) / 360;
  return { d, R: ((d + 1) * Math.sin(half)) / (d + Math.cos(half)) };
}

const WIDE_VERT = `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
const WIDE_FRAG = `
uniform samplerCube tCube;
uniform mat3 uRot;
uniform float uD, uR, uAspect;
varying vec2 vUv;
void main() {
  vec2 sc = (vUv * 2.0 - 1.0) * vec2(uR, uR / uAspect);
  float r = length(sc);
  float k = uD + 1.0;
  float th = atan(r, k) + asin(clamp(r * uD / sqrt(k * k + r * r), -1.0, 1.0));
  vec2 u = r > 1e-6 ? sc / r : vec2(0.0);
  vec3 dir = uRot * vec3(u * sin(th), -cos(th));
  gl_FragColor = textureCube(tCube, dir);
}`;

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
    this.hfov = 100;
    this.wide = null;
    this.resize();
  }

  setQuality(q) {
    this.quality = q;
    const dpr = window.devicePixelRatio || 1;
    const base = q === 'low' ? Math.min(1, dpr) * 0.75 : q === 'medium' ? Math.min(1.25, dpr) : Math.min(2, dpr);
    this.renderer.setPixelRatio(base * (this.resScale || 1));
    const size = q === 'high' ? 2048 : 1024;
    if (this.sun.shadow.mapSize.x !== size) {
      this.sun.shadow.mapSize.set(size, size);
      if (this.sun.shadow.map) { this.sun.shadow.map.dispose(); this.sun.shadow.map = null; }
    }
    this.resize();
  }

  // adaptive performance: scales the render resolution below the quality's own
  setResolutionScale(k) {
    if (Math.abs(k - (this.resScale || 1)) < 0.01) return;
    this.resScale = k;
    this.setQuality(this.quality);
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
        if (ctx.local && this.hideHead) {
          this.batch.hide(base + P.HEAD); this.batch.hide(base + P.TORSO);
          if (this.isWide()) for (const k of [P.UARM_L, P.UARM_R, P.FARM_L, P.FARM_R]) this.batch.hide(base + k);
        }
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
    if (this.isWide()) this.renderWide();
    else this.renderer.render(this.scene, this.camera);
  }

  // ------------------------------------------------------------- wide FOV
  isWide() { return this.hfov > RECTILINEAR_MAX_FOV + 0.01; }

  ensureWide(size) {
    let w = this.wide;
    if (!w) {
      const mat = new THREE.ShaderMaterial({
        uniforms: { tCube: { value: null }, uRot: { value: new THREE.Matrix3() }, uD: { value: 0 }, uR: { value: 1 }, uAspect: { value: 1 } },
        vertexShader: WIDE_VERT, fragmentShader: WIDE_FRAG, depthTest: false, depthWrite: false,
      });
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
      quad.frustumCulled = false;
      const scene = new THREE.Scene();
      scene.add(quad);
      w = this.wide = { mat, scene, cam: new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), rt: null, cube: null, size: 0, fwd: new THREE.Vector3(), dir: new THREE.Vector3() };
    }
    if (!w.rt || Math.abs(size - w.size) / w.size > 0.15) {
      if (w.rt) w.rt.dispose();
      w.rt = new THREE.WebGLCubeRenderTarget(size, { generateMipmaps: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
      w.cube = new THREE.CubeCamera(this.camera.near, this.camera.far, w.rt);
      w.size = size;
      w.mat.uniforms.tCube.value = w.rt.texture;
    }
    return w;
  }

  renderWide() {
    const r = this.renderer, c = this.camera;
    const { d, R } = wideParams(this.hfov);
    const buf = r.getDrawingBufferSize(this._buf || (this._buf = new THREE.Vector2()));
    const aspect = buf.x / buf.y;
    // face resolution: a little over one face texel per screen pixel at the centre of
    // the view (cube faces can't be multisampled, so this doubles as anti-aliasing)
    const ppr = buf.x / 2 / R;
    const cap = this.quality === 'low' ? 1024 : this.quality === 'medium' ? 1536 : 2048;
    const ss = this.quality === 'low' ? 1 : 1.35;
    const size = THREE.MathUtils.clamp(Math.round((2 * ppr * ss) / 64) * 64, 512, cap);
    const w = this.ensureWide(size);
    const cube = w.cube;
    if (cube.coordinateSystem !== r.coordinateSystem) { cube.coordinateSystem = r.coordinateSystem; cube.updateCoordinateSystem(); }
    c.updateMatrixWorld();
    cube.position.copy(c.position);
    cube.updateMatrixWorld();
    // lines keep their on-screen width: scale from screen pixels to face texels
    const res = SU.uResolution.value, oldW = res.x, oldH = res.y, lw = SU.uLineWidth.value, mw = SU.uMinWidth.value;
    const k = w.size / 2 / ppr;
    res.set(w.size, w.size);
    SU.uLineWidth.value = lw * k; SU.uMinWidth.value = mw * k;
    // only faces that can appear in the view are rendered; shadows update once
    c.getWorldDirection(w.fwd);
    const corner = R * Math.sqrt(1 + 1 / (aspect * aspect));
    const kk = d + 1;
    const thetaMax = Math.atan2(corner, kk) + Math.asin(Math.min(1, (corner * d) / Math.sqrt(kk * kk + corner * corner)));
    const limit = Math.cos(Math.min(Math.PI, thetaMax + 0.96));
    const auto = r.shadowMap.autoUpdate;
    if (auto) { r.shadowMap.autoUpdate = false; r.shadowMap.needsUpdate = true; }
    const prevTarget = r.getRenderTarget();
    let calls = 0;
    for (let i = 0; i < 6; i++) {
      const fc = cube.children[i];
      fc.getWorldDirection(w.dir);
      if (w.dir.dot(w.fwd) < limit) continue;
      r.setRenderTarget(w.rt, i);
      r.render(this.scene, fc);
      calls += r.info.render.calls;
    }
    r.shadowMap.autoUpdate = auto;
    r.setRenderTarget(prevTarget);
    res.set(oldW, oldH);
    SU.uLineWidth.value = lw; SU.uMinWidth.value = mw;
    const u = w.mat.uniforms;
    u.uRot.value.setFromMatrix4(c.matrixWorld);
    u.uD.value = d; u.uR.value = R; u.uAspect.value = aspect;
    r.render(w.scene, w.cam);
    this.wideCalls = calls + 1;
  }

  // Screen position (NDC, -1..1) of a world point under the current projection;
  // off-screen or behind points come back with |x| or |y| > 1 in their direction.
  projectToScreen(pos, out) {
    const c = this.camera;
    if (!this.isWide()) {
      out.copy(pos).applyMatrix4(c.matrixWorldInverse);
      if (out.z > -0.05) {
        // beside or behind the camera: point towards the shorter way to turn
        const sx = out.x >= 0 ? 1 : -1;
        const up = THREE.MathUtils.clamp(out.y / (Math.hypot(out.x, out.z) + 1e-3), -0.6, 0.6);
        return out.set(sx * 50, up * 50, 0);
      }
      return out.applyMatrix4(c.projectionMatrix);
    }
    const { d, R } = wideParams(this.hfov);
    out.copy(pos).applyMatrix4(c.matrixWorldInverse);
    const len = out.length() || 1;
    const cosT = -out.z / len;
    const pl = Math.hypot(out.x, out.y) || 1e-6;
    const ux = out.x / pl, uy = out.y / pl;
    const den = d + cosT;
    const rr = den > 1e-4 ? ((d + 1) * Math.sqrt(Math.max(0, 1 - cosT * cosT))) / den : 1e4;
    out.set((ux * rr) / R, (uy * rr * c.aspect) / R, 0);
    return out;
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
      // the FOV setting is horizontal (as in most first-person games); three.js wants
      // vertical. Beyond RECTILINEAR_MAX_FOV the wide cube-map projection takes over.
      let v;
      if (c.aspect < 1) {
        // portrait screens (phones held upright): the setting applies to the long,
        // vertical side and only the ordinary projection is used
        this.hfov = Math.min(cam.fov, RECTILINEAR_MAX_FOV);
        v = THREE.MathUtils.clamp(Math.min(cam.fov, 110), 35, 110);
      } else {
        this.hfov = cam.mode === 'fp' ? cam.fov : Math.min(cam.fov, RECTILINEAR_MAX_FOV);
        const h = Math.min(this.hfov, RECTILINEAR_MAX_FOV);
        v = THREE.MathUtils.clamp(2 * Math.atan(Math.tan((h * Math.PI) / 360) / c.aspect) * 180 / Math.PI, 35, 110);
      }
      if (Math.abs(v - c.fov) > 0.01) { c.fov = v; c.updateProjectionMatrix(); }
    } else {
      this.hfov = Math.min(this.hfov, RECTILINEAR_MAX_FOV);
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
    return { calls: this.isWide() ? this.wideCalls : i.render.calls, tris: i.render.triangles, people: this.venue ? this.venue.people : 0, wide: this.isWide() };
  }
}
