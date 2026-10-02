// First-run tutorial: a quick warm-up with Coach Ada on the training ground.
// Nine short steps (look, move, sprint, take the ball, dribble, pass, receive,
// shoot, tackle), each with a par time that earns a star and a cap after which
// the coach simply moves on, so the whole thing never runs past two minutes.
// It uses the ordinary match simulation; only the scenario around it is scripted.
import * as THREE from 'three';
import { V3, yawOf, clamp } from '../sim/vec.js';
import { PITCH, BALL_R } from '../sim/constants.js';
import { startKick } from '../sim/actions.js';
import { GeoBuilder } from '../render/geometry.js';
import { R } from '../render/palette.js';
import { makeSolidMaterial, makeEdgeMaterial, makeFlatMaterial } from '../render/shaders.js';
import { storage } from '../core/storage.js';

export const TUTORIAL_LIMIT = 120; // seconds of play, hard cap
const KEY = 'firsttouch.tutorial';

// finished or skipped once: never shown automatically again
export function tutorialSeen() {
  try { return !!storage.getItem(KEY); } catch (e) { return false; }
}
export function markTutorial(how) {
  try { storage.setItem(KEY, how); } catch (e) { /* storage unavailable: it may show again next time */ }
}

// say: what Coach Ada says; hint: [mouse & keyboard, touch]
export const STEPS = [
  { id: 'look', par: 6, cap: 12, say: 'Find the golden star', hint: ['Move the mouse', 'Drag on the right'] },
  { id: 'move', par: 7, cap: 12, say: 'Run to the glowing circle', hint: ['W A S D', 'Drag with the left thumb'] },
  { id: 'sprint', par: 5, cap: 10, say: 'Sprint to the next circle', hint: ['Hold Shift', 'Push the stick all the way'] },
  { id: 'ball', par: 5, cap: 10, say: 'Run into the ball', hint: ['', ''] },
  { id: 'dribble', par: 7, cap: 14, say: 'Dribble through the gate', hint: ['', ''] },
  { id: 'pass', par: 6, cap: 12, say: 'Pass to Jojo', hint: ['Look at him, right-click', 'Look at him, tap PASS'] },
  { id: 'receive', par: 4, cap: 8, say: 'Let it come to your feet', hint: ['', ''] },
  { id: 'shoot', par: 8, cap: 20, say: 'Score past Sam!', hint: ['Hold left click, release', 'Hold SHOOT, release'] },
  { id: 'tackle', par: 6, cap: 14, say: 'Win the ball back!', hint: ['Get close, press E', 'Get close, tap TACKLE'] },
];

const PRAISE = ['Nice!', 'Lovely!', 'Class!', 'Sharp!', 'Easy!'];
const RANKS = [[9, 'Superstar'], [7, 'Starting XI'], [4, 'Squad player'], [0, 'Future legend']];

function segCross(ax, az, bx, bz, cx, cz, dx, dz) {
  const d1 = (bx - ax) * (cz - az) - (bz - az) * (cx - ax);
  const d2 = (bx - ax) * (dz - az) - (bz - az) * (dx - ax);
  const d3 = (dx - cx) * (az - cz) - (dz - cz) * (ax - cx);
  const d4 = (dx - cx) * (bz - cz) - (dz - cz) * (bx - cx);
  return d1 * d2 < 0 && d3 * d4 < 0;
}
const inPitch = (v, m = 2) => { v.x = clamp(v.x, -PITCH.HL + m, PITCH.HL - m); v.z = clamp(v.z, -PITCH.HW + m, PITCH.HW - m); return v; };
function player(role, number, name, attrs, extra = {}) {
  return { role, number, name, attrs, keeping: 55, foot: 'R', ...extra };
}

export class Tutorial {
  constructor(human) {
    this.kind = 'tutorial';
    this.human = human;
    this.def = { name: 'Warm-up with Coach Ada', time: TUTORIAL_LIMIT };
    this.t = 0;
    this.done = false;
    this.timeUp = false;
    this.events = [];
    this.idx = -1;
    this.stepT = 0;
    this.stars = 0;
    this.results = [];
    this.say = '';
    this.waitUntil = null;
    this.endAt = null;
  }

  matchConfig() {
    const h = { ...this.human, isHuman: true, role: 'CM', attrs: { ...this.human.attrs } };
    const t0 = [h, player('CM', 8, 'Jojo', { pace: 55, stamina: 80, control: 70, passing: 72, finishing: 50, tackling: 50 })];
    const t1 = [
      player('DEF', 5, 'Big Barry', { pace: 34, stamina: 60, control: 22, passing: 30, finishing: 20, tackling: 20 }),
      player('GK', 1, 'Sleepy Sam', { pace: 40, stamina: 60, control: 40, passing: 40, finishing: 20, tackling: 20 }, { keeping: 8 }),
    ];
    const mk = (name, players) => ({ name, short: name.slice(0, 3).toUpperCase(), tier: 1, style: 'wing', players });
    return { seed: 4242, halfLength: 1e6, difficulty: 'assisted', rules: false, mode: 'tutorial', teams: [mk('Training', t0), mk('Coaches', t1)] };
  }

  // called once the Match exists
  setup(m, view) {
    this.m = m;
    this.view = view;
    m.phase = 'playing';
    m.clock = 0;
    // no restarts in a warm-up: fouls are only a warning, and the idle ball is never re-dropped
    m.foul = () => this.note('Careful, that\'s a foul!', 'bad');
    m.checkDeadlock = () => {};
    const h = this.h = m.human;
    this.jojo = m.teams[0].players.find((p) => !p.isHuman);
    this.barry = m.teams[1].players.find((p) => !p.isGK);
    this.sam = m.keeper(1);
    this.jojo.scripted = true;
    this.barry.scripted = true;
    if (m.aiParams[1]) m.aiParams[1].gkReaction = 0.8; // Sam is a little slow to wake up
    h.pos.set(-8, 0, 0); h.yaw = Math.PI / 2;
    this.jojo.pos.set(-4, 0, 9);
    this.barry.pos.set(-29, 0, -18);
    this.sam.pos.set(PITCH.HL - 1, 0, 0); this.sam.yaw = -Math.PI / 2;
    this.parkBall();
    for (const p of m.players) { if (p !== h && p !== this.sam) p.yaw = yawOf(h.pos.x - p.pos.x, h.pos.z - p.pos.z); p.prevPos.copy(p.pos); p.prevYaw = p.yaw; }
    this.buildProps(view);
    m.preStep = (dt) => this.preStep(dt);
    m.events.emit('humanYaw', { yaw: h.yaw });
    this.next();
  }

  buildProps(view) {
    const mesh = (b) => {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(b.buildSolid(), makeSolidMaterial({})));
      const e = new THREE.Mesh(b.buildEdges(), makeEdgeMaterial({}));
      e.frustumCulled = false;
      g.add(e);
      g.visible = false;
      return g;
    };
    // a spinning golden gem
    const s = new GeoBuilder();
    s.cone(R.GOLD, 0.42, 0.55, 5, 0, 0.275, 0);
    s.cone(R.GOLD, 0.42, 0.55, 5, 0, -0.275, 0, { rx: Math.PI });
    this.star = mesh(s);
    // a gate of two cones and a bar, built along local z
    const gb = new GeoBuilder();
    gb.cone(R.CONE, 0.18, 0.5, 10, 0, 0.25, -1.3);
    gb.cone(R.CONE, 0.18, 0.5, 10, 0, 0.25, 1.3);
    gb.box(R.TARGET, 0.06, 0.06, 2.6, 0, 0.75, 0);
    this.gate = mesh(gb);
    // a target circle with a beacon so it can be found from anywhere
    const ring = new THREE.Group();
    const rg = new THREE.RingGeometry(0.95, 1.25, 40); rg.rotateX(-Math.PI / 2);
    const r1 = new THREE.Mesh(rg, makeFlatMaterial(R.MARKER, 0.85)); r1.position.y = 0.04; r1.renderOrder = 3;
    const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 6, 10, 1, true), makeFlatMaterial(R.GOLD, 0.45));
    beacon.position.y = 3;
    ring.add(r1, beacon);
    ring.visible = false;
    this.ring = ring;
    this.props = new THREE.Group();
    this.props.add(this.star, this.gate, this.ring);
    view.scene.add(this.props);
  }

  dispose() {
    if (this.props) {
      this.view.scene.remove(this.props);
      this.props.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    }
    if (this.m) this.m.preStep = null;
  }

  note(text, kind = '') { this.events.push({ type: 'note', text, kind }); }
  fx(type, o = {}) { this.events.push({ type, ...o }); }

  get current() { return STEPS[this.idx] || null; }
  get index() { return Math.max(0, Math.min(this.idx, STEPS.length - 1)); }

  // ------------------------------------------------------------ helpers
  parkBall() {
    const b = this.m.ball;
    b.place(-27, 17); b.state = 'free'; b.owner = null; b.lastKick = null;
  }
  ballAtFeet() {
    const m = this.m, h = this.h, b = m.ball;
    if (b.owner && b.owner !== h) m.loseControl('loose');
    b.place(h.pos.x + Math.sin(h.yaw) * 0.55, h.pos.z + Math.cos(h.yaw) * 0.55);
    b.state = 'free'; b.owner = null; b.lastKick = null;
  }
  dirToGoal(from) {
    const dx = PITCH.HL - from.x, dz = -from.z, l = Math.hypot(dx, dz) || 1;
    return { x: dx / l, z: dz / l };
  }
  showRing(p) { this.ring.visible = true; this.ring.position.set(p.x, 0, p.z); this.target = p; }
  resetKeeper() {
    const s = this.sam;
    s.hold = null; s.action = null; s.vel.set(0, 0, 0); s.pos.set(PITCH.HL - 1, 0, 0); s.prevPos.copy(s.pos); s.yaw = -Math.PI / 2;
  }

  // ------------------------------------------------------------ flow
  next() {
    this.idx++;
    this.stepT = 0;
    this.ring.visible = false; this.star.visible = false; this.gate.visible = false;
    const st = this.current;
    if (!st) {
      this.say = 'Ready for the pitch!';
      this.endAt = this.t + 1.8;
      this.fx('finale');
      return;
    }
    this.say = st.say;
    this.enter(st.id);
    this.fx('step', { index: this.idx });
  }

  enter(id) {
    const m = this.m, h = this.h, b = m.ball;
    this.misses = 0;
    this.resetAt = null;
    switch (id) {
      case 'look': {
        const y = h.yaw + 1.0;
        const p = inPitch(new V3(h.pos.x + Math.sin(y) * 9, 0, h.pos.z + Math.cos(y) * 9));
        this.star.position.set(p.x, 2.3, p.z);
        this.star.visible = true;
        break;
      }
      case 'move': this.showRing(inPitch(new V3(h.pos.x + 6, 0, h.pos.z + 4))); break;
      case 'sprint': this.sprinted = false; this.showRing(inPitch(new V3(h.pos.x + 12, 0, h.pos.z - 6))); break;
      case 'ball': {
        const d = this.dirToGoal(h.pos);
        b.place(h.pos.x + d.x * 3.5, h.pos.z + d.z * 3.5); b.state = 'free'; b.owner = null; b.lastKick = null;
        break;
      }
      case 'dribble': {
        const d = this.dirToGoal(h.pos);
        // across the pitch a little so there is room left to pass and shoot
        const c = inPitch(new V3(h.pos.x + d.x * 6.5, 0, h.pos.z + d.z * 6.5 + 2.2), 10);
        const dx = c.x - h.pos.x, dz = c.z - h.pos.z, l = Math.hypot(dx, dz) || 1;
        const nx = -dz / l, nz = dx / l; // gate line is perpendicular to the approach
        this.gateLine = { ax: c.x + nx * 1.3, az: c.z + nz * 1.3, bx: c.x - nx * 1.3, bz: c.z - nz * 1.3 };
        this.gate.position.set(c.x, 0, c.z);
        this.gate.rotation.y = yawOf(dx, dz) + Math.PI / 2; // cones either side of the approach
        this.gate.visible = true;
        // Jojo jogs to a spot out wide, ready for the next step
        const side = c.z > 0 ? -1 : 1;
        this.jojoSpot = inPitch(new V3(c.x - 1, 0, c.z + side * 11), 3);
        break;
      }
      case 'pass': break;
      case 'receive': {
        // if the pass step timed out, give Jojo the ball so he can play it back
        const j = this.jojo;
        const toHuman = m.passIntent && m.passIntent.target === h && !b.owner;
        if (b.owner !== j && !toHuman) {
          if (b.owner) m.loseControl('loose');
          b.place(j.pos.x + Math.sin(j.yaw) * 0.6, j.pos.z + Math.cos(j.yaw) * 0.6); b.state = 'free'; b.owner = null;
        }
        break;
      }
      case 'shoot': {
        this.resetKeeper();
        const d = Math.hypot(PITCH.HL - h.pos.x, h.pos.z);
        if (d > 20 || Math.abs(h.pos.z) > 12) {
          // too far out: a quick fade to a good shooting spot
          this.fx('fade');
          h.pos.set(PITCH.HL - 13, 0, clamp(h.pos.z, -5, 5)); h.prevPos.copy(h.pos); h.vel.set(0, 0, 0);
          h.yaw = yawOf(PITCH.HL - h.pos.x, -h.pos.z);
          m.events.emit('humanYaw', { yaw: h.yaw });
        }
        if (b.owner !== h) this.ballAtFeet();
        this.shotAt = null;
        break;
      }
      case 'tackle': {
        this.fx('fade');
        this.resetKeeper();
        if (b.owner) m.loseControl('loose');
        // Barry turns up between you and the centre spot, ball at his feet
        const dx = -h.pos.x, dz = -h.pos.z, l = Math.hypot(dx, dz) || 1;
        const bp = inPitch(new V3(h.pos.x + (dx / l) * 7, 0, h.pos.z + (dz / l) * 7), 4);
        const br = this.barry;
        br.pos.copy(bp); br.prevPos.copy(bp); br.vel.set(0, 0, 0);
        br.yaw = yawOf(h.pos.x - bp.x, h.pos.z - bp.z); br.prevYaw = br.yaw;
        b.place(bp.x + Math.sin(br.yaw) * 0.55, bp.z + Math.cos(br.yaw) * 0.55); b.state = 'free'; b.owner = null; b.lastKick = null;
        h.vel.set(0, 0, 0);
        h.yaw = yawOf(bp.x - h.pos.x, bp.z - h.pos.z);
        m.events.emit('humanYaw', { yaw: h.yaw });
        this.tackled = false;
        break;
      }
    }
  }

  complete(ok, line) {
    const st = this.current;
    const star = ok && this.stepT <= st.par;
    if (star) this.stars++;
    this.results.push({ id: st.id, ok, star, t: this.stepT });
    const at = this.target && this.ring.visible ? this.target : this.h.pos;
    this.fx('done', { ok, star, x: at.x, z: at.z, big: st.id === 'shoot' && ok });
    // the coach card shows the praise, so there is no separate on-screen note
    this.say = ok ? `${line || PRAISE[this.idx % PRAISE.length]}${star ? ' ★' : ''}` : 'Keep going!';
    this.waitUntil = this.t + (st.id === 'shoot' && ok ? 1.6 : 0.9);
  }

  // ------------------------------------------------------------ per tick
  preStep() {
    const m = this.m, h = this.h, b = m.ball, now = m.time;
    const j = this.jojo, br = this.barry;
    // Jojo: jogs to his spot, collects passes near him and plays the ball back
    if (b.owner === j) {
      j.desired.set(0, 0, 0);
      j.faceYaw = yawOf(h.pos.x - j.pos.x, h.pos.z - j.pos.z);
      if (!j.action && now - (j.gotAt || now) > 0.7) startKick(m, j, 'pass', { target: h, ai: true });
    } else {
      j.gotAt = now;
      const spot = this.jojoSpot;
      const bd = b.pos.distXZ(j.pos);
      if (!b.owner && bd < 5 && b.speed < 13 && b.lastKick && b.lastKick.player === h) j.desired.set((b.pos.x - j.pos.x) * 2.5, 0, (b.pos.z - j.pos.z) * 2.5);
      else if (spot && j.pos.distXZ(spot) > 0.4) {
        const dx = spot.x - j.pos.x, dz = spot.z - j.pos.z, l = Math.hypot(dx, dz);
        const sp = Math.min(j.jogSpeed(), l * 2);
        j.desired.set((dx / l) * sp, 0, (dz / l) * sp);
      } else j.desired.set(0, 0, 0);
      j.faceYaw = yawOf(h.pos.x - j.pos.x, h.pos.z - j.pos.z);
    }
    // Big Barry: only plays in the tackle step, walking the ball slowly at you
    if (this.current && this.current.id === 'tackle') {
      if (b.owner === br) {
        const dx = h.pos.x - br.pos.x, dz = h.pos.z - br.pos.z, l = Math.hypot(dx, dz) || 1;
        const sp = l > 2 ? 1.4 : 0;
        br.desired.set((dx / l) * sp, 0, (dz / l) * sp);
        br.faceYaw = yawOf(dx, dz);
      } else if (!b.owner && b.pos.distXZ(br.pos) < 3 && this.stepT < 1.5) {
        br.desired.set((b.pos.x - br.pos.x) * 2, 0, (b.pos.z - br.pos.z) * 2);
      } else br.desired.set(0, 0, 0);
    } else { br.desired.set(0, 0, 0); br.faceYaw = yawOf(h.pos.x - br.pos.x, h.pos.z - br.pos.z); }
  }

  step() {
    if (this.done) return;
    const dt = 1 / 120;
    const m = this.m, h = this.h, b = m.ball, now = m.time;
    this.t += dt;
    this.animate();
    if (this.t >= TUTORIAL_LIMIT) { this.timeUp = true; this.say = 'Time\'s up. Good effort!'; this.finish(); return; }
    if (this.endAt != null) { if (this.t >= this.endAt) this.finish(); return; }
    if (this.waitUntil != null) {
      if (this.t >= this.waitUntil) { this.waitUntil = null; this.next(); }
      return;
    }
    const st = this.current;
    this.stepT += dt;
    switch (st.id) {
      case 'look': {
        const ci = m.humanCtl ? m.humanCtl.input : { yaw: h.yaw, pitch: 0 };
        const cp = Math.cos(ci.pitch);
        const lx = Math.sin(ci.yaw) * cp, ly = Math.sin(ci.pitch), lz = Math.cos(ci.yaw) * cp;
        const sx = this.star.position.x - h.pos.x, sy = this.star.position.y - 1.65, sz = this.star.position.z - h.pos.z;
        const sl = Math.hypot(sx, sy, sz) || 1;
        if ((lx * sx + ly * sy + lz * sz) / sl > Math.cos(0.2)) { this.fx('star', { x: this.star.position.x, y: this.star.position.y, z: this.star.position.z }); this.complete(true, 'Found it!'); }
        break;
      }
      case 'move':
      case 'sprint':
        if (h.sprint) this.sprinted = true;
        if (h.pos.distXZ(this.target) < (st.id === 'move' ? 1.3 : 1.6)) this.complete(true, st.id === 'sprint' && this.sprinted ? 'Rapid!' : 'Made it!');
        break;
      case 'ball':
        if (b.owner === h) this.complete(true, 'Got it!');
        break;
      case 'dribble': {
        const g = this.gateLine;
        if ((b.owner === h || b.lastTouch === h) && segCross(b.prevPos.x, b.prevPos.z, b.pos.x, b.pos.z, g.ax, g.az, g.bx, g.bz)) { this.complete(true, 'Silky!'); break; }
        this.recoverBall();
        break;
      }
      case 'pass': {
        const k = b.lastKick;
        if (b.owner === this.jojo && k && k.player === h) { this.complete(true, 'Perfect pass!'); break; }
        if (b.owner === this.jojo) { this.jojo.gotAt = now; } // hold it until the human passes (ball placed on reset)
        this.recoverBall(k && k.player === h ? 'Aim at Jojo' : null);
        break;
      }
      case 'receive':
        if (b.owner === h) { this.complete(true, 'Lovely first touch!'); break; }
        if (!b.owner && b.speed < 0.3 && b.pos.distXZ(h.pos) > 4 && b.pos.distXZ(this.jojo.pos) > 3) { this.ballAtFeet(); }
        break;
      case 'shoot': {
        const k = b.lastKick;
        if (k && k.player === h && k.kind === 'shot' && !this.shotAt) this.shotAt = now;
        const inGoal = b.pos.x - BALL_R > PITCH.HL && b.crossing[0] && b.crossing[0].inMouth;
        if (inGoal && !this.resetAt) { this.fx('goal', { x: b.pos.x, z: b.pos.z }); this.complete(true, 'GOAL! Top bins!'); break; }
        if (!this.resetAt && this.shotAt) {
          const out = b.pos.x - BALL_R > PITCH.HL || Math.abs(b.pos.z) > PITCH.HW;
          if (out || b.state === 'held' || now - this.shotAt > 3) { this.resetAt = now + 1.1; this.note(b.state === 'held' ? 'Saved! Again!' : 'So close! Again!', 'bad'); }
        }
        if (this.resetAt && now >= this.resetAt) { this.resetAt = null; this.shotAt = null; this.resetKeeper(); this.ballAtFeet(); }
        break;
      }
      case 'tackle': {
        if (h.action && h.action.type === 'tackle') this.tackled = true;
        if (b.owner === h) this.complete(true, this.tackled ? 'What a tackle!' : 'Got it back!');
        break;
      }
    }
    if (this.waitUntil == null && this.stepT >= st.cap) this.timeout(st.id);
  }

  // a stray ball comes back to the player's feet after a moment
  recoverBall(msg) {
    const m = this.m, h = this.h, b = m.ball, now = m.time;
    const stray = !b.owner && b.speed < 0.4 && b.pos.distXZ(h.pos) > 3.5 && b.pos.distXZ(this.jojo.pos) > 2.5;
    if (!stray) { this.resetAt = null; return; }
    if (this.resetAt == null) { this.resetAt = now + 1.2; if (msg) this.note(msg, 'bad'); }
    else if (now >= this.resetAt) { this.resetAt = null; this.ballAtFeet(); }
  }

  timeout(id) {
    if (id === 'ball' && this.m.ball.owner !== this.h) this.ballAtFeet();
    this.complete(false);
  }

  animate() {
    const t = this.t;
    if (this.star.visible) { this.star.rotation.y = t * 2.2; this.star.position.y = 2.3 + Math.sin(t * 3) * 0.18; }
    if (this.ring.visible) { const s = 1 + 0.08 * Math.sin(t * 6); this.ring.children[0].scale.set(s, 1, s); }
  }

  finish() {
    if (this.done) return;
    this.done = true;
    this.star.visible = false; this.ring.visible = false; this.gate.visible = false;
    this.m.phase = 'fulltime';
    this.m.phaseT = 1.5; // the session shows the result about a second later
  }

  clockText() { return ''; }

  // where the player should be heading or looking right now (for the on-screen arrow)
  objective(out) {
    const st = this.current, b = this.m.ball, h = this.h;
    if (!st || this.waitUntil != null || this.endAt != null) return null;
    const own = b.owner === h;
    switch (st.id) {
      case 'look': return out.set(this.star.position.x, this.star.position.y, this.star.position.z);
      case 'move': case 'sprint': return out.set(this.target.x, 0.8, this.target.z);
      case 'dribble': return own ? out.set(this.gate.position.x, 0.5, this.gate.position.z) : out.set(b.pos.x, b.pos.y, b.pos.z);
      case 'pass': return own ? out.set(this.jojo.pos.x, 1.2, this.jojo.pos.z) : out.set(b.pos.x, b.pos.y, b.pos.z);
      case 'shoot': return own ? out.set(PITCH.HL, 1, 0) : out.set(b.pos.x, b.pos.y, b.pos.z);
      default: return out.set(b.pos.x, b.pos.y, b.pos.z);
    }
  }

  result() {
    const rank = RANKS.find(([n]) => this.stars >= n)[1];
    return { stars: this.stars, total: STEPS.length, time: this.t, timeUp: this.timeUp, rank, completed: this.results.filter((r) => r.ok).length };
  }
}
