// Training ground drills (30-60 s) and a free practice scene. They reuse the
// exact same match simulation; only the scenario around it is scripted.
import * as THREE from 'three';
import { V3, yawOf, clamp } from '../sim/vec.js';
import { PITCH, GOAL, BALL_R } from '../sim/constants.js';
import { startKick } from '../sim/actions.js';
import { GeoBuilder } from '../render/geometry.js';
import { R } from '../render/palette.js';
import { makeSolidMaterial, makeEdgeMaterial } from '../render/shaders.js';

export const DRILLS = {
  passing: { name: 'Passing Gates', time: 45, desc: 'Pass through the highlighted gate to the teammate behind it. Each clean pass through a gate scores.' },
  finishing: { name: 'Finishing', time: 50, desc: 'Balls are served into the box. Finish past the goalkeeper - first-time finishes are encouraged.' },
  dribbling: { name: 'Dribbling Course', time: 60, desc: 'Dribble the ball through every gate in order, as fast as you can.' },
  practice: { name: 'Free Practice', time: 0, desc: 'Receive, pass, move and shoot with a teammate against a defender and a goalkeeper. No timer, no XP.' },
};

function segCross(ax, az, bx, bz, cx, cz, dx, dz) {
  // does segment a->b cross segment c->d ?
  const d1 = (bx - ax) * (cz - az) - (bz - az) * (cx - ax);
  const d2 = (bx - ax) * (dz - az) - (bz - az) * (dx - ax);
  const d3 = (dx - cx) * (az - cz) - (dz - cz) * (ax - cx);
  const d4 = (dx - cx) * (bz - cz) - (dz - cz) * (bx - cx);
  return d1 * d2 < 0 && d3 * d4 < 0;
}

function player(role, number, name, attrs, extra = {}) {
  return { role, number, name, attrs: attrs || { pace: 55, stamina: 70, control: 60, passing: 60, finishing: 50, tackling: 50 }, keeping: 55, foot: 'R', ...extra };
}

export class Drill {
  constructor(kind, human) {
    this.kind = kind;
    this.def = DRILLS[kind];
    this.human = human;
    this.score = 0;
    this.t = 0;
    this.done = false;
    this.events = [];
    this.props = null;
  }

  matchConfig() {
    const h = { ...this.human, isHuman: true, name: this.human.name, attrs: { ...this.human.attrs } };
    let t0, t1;
    switch (this.kind) {
      case 'passing':
        h.role = 'CM';
        t0 = [h, player('W', 11, 'Station A'), player('W', 7, 'Station B'), player('ST', 9, 'Station C'), player('AM', 10, 'Station D')];
        t1 = [];
        break;
      case 'finishing':
        h.role = 'ST';
        t0 = [h, player('CM', 8, 'Coach')];
        t1 = [player('GK', 1, 'Keeper', null)];
        break;
      case 'dribbling':
        h.role = 'W';
        t0 = [h]; t1 = [];
        break;
      default:
        t0 = [h, player('CM', 8, 'Teammate')];
        t1 = [player('DEF', 4, 'Defender', { pace: 50, stamina: 70, control: 45, passing: 45, finishing: 40, tackling: 52 }), player('GK', 1, 'Keeper')];
    }
    const mk = (name, players) => ({ name, short: name.slice(0, 3).toUpperCase(), tier: 1, style: 'wing', players });
    return { seed: 7 + Math.floor(Math.random() * 1000), halfLength: 1e6, difficulty: 'assisted', rules: false, mode: 'drill', teams: [mk('Training', t0), t1.length ? mk('Opposition', t1) : null] };
  }

  // called once the Match exists
  setup(m, view) {
    this.m = m;
    this.view = view;
    m.phase = 'playing';
    m.clock = 0;
    const h = m.human;
    this.h = h;
    for (const p of m.players) p.scripted = !p.isHuman && !p.isGK && this.kind !== 'practice';
    const b = new GeoBuilder();
    if (this.kind === 'passing') {
      this.center = new V3(-4, 0, 0);
      h.pos.copy(this.center);
      const st = [[10, 9], [10, -9], [-12, 11], [-12, -11]];
      this.stations = [];
      const mates = m.teams[0].players.filter((p) => !p.isHuman);
      st.forEach(([x, z], i) => {
        const p = mates[i];
        p.pos.set(this.center.x + x, 0, this.center.z + z);
        p.home = { station: p.pos.clone() };
        const gx = this.center.x + x * 0.5, gz = this.center.z + z * 0.5;
        const len = Math.hypot(x, z), nx = -z / len, nz = x / len;
        const g = { p, a: new V3(gx + nx * 1.1, 0, gz + nz * 1.1), b: new V3(gx - nx * 1.1, 0, gz - nz * 1.1), c: new V3(gx, 0, gz) };
        this.stations.push(g);
        b.cone(R.CONE, 0.16, 0.42, 10, g.a.x, 0.21, g.a.z);
        b.cone(R.CONE, 0.16, 0.42, 10, g.b.x, 0.21, g.b.z);
      });
      this.active = 0;
      this.pickActive();
      this.resetBall();
    } else if (this.kind === 'finishing') {
      h.pos.set(PITCH.HL - 15, 0, 0);
      this.server = m.teams[0].players.find((p) => !p.isHuman);
      this.served = 0;
      this.maxBalls = 8;
      this.serve();
    } else if (this.kind === 'dribbling') {
      this.gates = [];
      const xs = [-20, -14, -8, -2, 4, 10, 16, 22];
      xs.forEach((x, i) => {
        const z = i % 2 ? -4 : 4;
        const g = { a: new V3(x, 0, z - 1.25), b: new V3(x, 0, z + 1.25), c: new V3(x, 0, z) };
        this.gates.push(g);
        b.cone(R.CONE, 0.16, 0.42, 10, g.a.x, 0.21, g.a.z);
        b.cone(R.CONE, 0.16, 0.42, 10, g.b.x, 0.21, g.b.z);
        b.box(R.TARGET, 0.05, 0.05, 2.5, x, 0.6, z);
      });
      const fin = { a: new V3(27, 0, -3), b: new V3(27, 0, 3), c: new V3(27, 0, 0), finish: true };
      this.gates.push(fin);
      for (let z = -3; z <= 3; z += 1.5) b.cone(R.TARGET, 0.14, 0.36, 10, 27, 0.18, z);
      h.pos.set(-27, 0, 0);
      h.yaw = Math.PI / 2;
      m.ball.place(-26.2, 0);
      m.ball.state = 'free';
      this.next = 0;
      this.started = false;
    } else {
      h.pos.set(-6, 0, 0);
      m.teams[0].players.find((p) => !p.isHuman).pos.set(4, 0, 10);
      const def = m.teams[1].players.find((p) => !p.isGK);
      def.pos.set(14, 0, 0);
      m.keeper(1).pos.set(PITCH.HL - 1, 0, 0);
      this.resetBall(true);
    }
    for (const p of m.players) { p.prevPos.copy(p.pos); if (!p.isHuman) p.yaw = yawOf(h.pos.x - p.pos.x, h.pos.z - p.pos.z); p.prevYaw = p.yaw; }
    if (!h.yaw) h.yaw = Math.PI / 2;
    m.events.emit('humanYaw', { yaw: this.kind === 'passing' ? yawOf(this.stations[this.active].c.x - h.pos.x, this.stations[this.active].c.z - h.pos.z) : Math.PI / 2 });
    if (b.vcount) {
      this.props = new THREE.Group();
      this.props.add(new THREE.Mesh(b.buildSolid(), makeSolidMaterial({})));
      const e = new THREE.Mesh(b.buildEdges(), makeEdgeMaterial({}));
      e.frustumCulled = false;
      this.props.add(e);
      view.scene.add(this.props);
    }
    m.preStep = (dt) => this.preStep(dt);
  }

  dispose() {
    if (this.props) { this.view.scene.remove(this.props); this.props.traverse((o) => o.geometry && o.geometry.dispose()); }
    if (this.m) this.m.preStep = null;
  }

  resetBall(practice = false) {
    const m = this.m, h = this.h;
    const f = h.yaw;
    m.ball.place(h.pos.x + Math.sin(f) * 0.7, h.pos.z + Math.cos(f) * 0.7);
    m.ball.state = 'free';
    m.ball.owner = null;
    m.ball.lastKick = null;
    this.lastKickSeen = null;
    this.gateOk = false;
    this.resetAt = null;
    if (practice) m.passIntent = null;
  }

  pickActive() {
    let n = this.active;
    while (n === this.active) n = Math.floor(Math.random() * this.stations.length);
    this.active = n;
  }

  serve() {
    const m = this.m, s = this.server, h = this.h;
    const side = Math.random() < 0.5 ? 1 : -1;
    s.pos.set(PITCH.HL - 9 - Math.random() * 6, 0, side * (13 + Math.random() * 3));
    s.prevPos.copy(s.pos);
    s.vel.set(0, 0, 0);
    s.yaw = yawOf(h.pos.x - s.pos.x, h.pos.z - s.pos.z);
    m.ball.place(s.pos.x + Math.sin(s.yaw) * 0.6, s.pos.z + Math.cos(s.yaw) * 0.6);
    m.ball.state = 'free';
    m.ball.owner = null;
    m.ball.lastKick = null;
    this.serveAt = m.time + 0.9;
    this.shotAt = null;
    this.resetAt = null;
    this.served++;
    this.ballDone = false;
  }

  preStep(dt) {
    const m = this.m, h = this.h, ball = m.ball, now = m.time;
    if (this.kind === 'passing') {
      for (const g of this.stations) {
        const p = g.p;
        const home = p.home.station;
        const d = p.pos.distXZ(home);
        if (ball.owner === p) {
          p.desired.set(0, 0, 0);
          p.faceYaw = yawOf(h.pos.x - p.pos.x, h.pos.z - p.pos.z);
          if (!p.action && now - (p.gotAt || now) > 0.55) startKick(m, p, 'pass', { target: h, ai: true });
        } else {
          p.gotAt = now;
          // stay near the station, stepping toward a ball arriving nearby
          const bd = ball.pos.distXZ(p.pos);
          if (!ball.owner && bd < 4 && ball.speed < 12) { const dx = ball.pos.x - p.pos.x, dz = ball.pos.z - p.pos.z; p.desired.set(dx * 2, 0, dz * 2); }
          else if (d > 0.3) p.desired.set((home.x - p.pos.x) * 2.5, 0, (home.z - p.pos.z) * 2.5);
          else p.desired.set(0, 0, 0);
          p.faceYaw = yawOf(ball.pos.x - p.pos.x, ball.pos.z - p.pos.z);
        }
      }
    } else if (this.kind === 'finishing') {
      const s = this.server;
      s.desired.set(0, 0, 0);
      s.faceYaw = yawOf(h.pos.x - s.pos.x, h.pos.z - s.pos.z);
      if (this.serveAt && now >= this.serveAt && !s.action) {
        this.serveAt = null;
        const lofted = Math.random() < 0.3;
        const pt = new V3(h.pos.x + (Math.random() - 0.5) * 2, 0, h.pos.z + (Math.random() - 0.5) * 2);
        if (lofted) startKick(m, s, 'cross', { point: pt, ai: true, elev: 0.35 });
        else startKick(m, s, 'pass', { target: h, ai: true });
      }
    }
  }

  step() {
    const m = this.m, h = this.h, ball = m.ball, now = m.time;
    if (this.done) return;
    this.t += 1 / 120;
    const limit = this.def.time;
    if (this.kind === 'passing') {
      const k = ball.lastKick;
      if (k && k !== this.lastKickSeen) {
        this.lastKickSeen = k;
        if (k.player === h) { this.gateOk = false; this.passTarget = this.stations[this.active]; }
      }
      // ball crossing the active gate after the human's pass
      const g = this.stations[this.active];
      if (k && k.player === h && segCross(ball.prevPos.x, ball.prevPos.z, ball.pos.x, ball.pos.z, g.a.x, g.a.z, g.b.x, g.b.z)) this.gateOk = true;
      if (ball.owner && ball.owner !== h && k && k.player === h && !this.resolved) {
        this.resolved = true;
        if (ball.owner === g.p && this.gateOk) { this.score++; this.note('GATE +1', 'good'); this.pickActive(); }
        else this.note(ball.owner === g.p ? 'MISSED THE GATE' : 'WRONG TEAMMATE', 'bad');
      }
      if (ball.owner === h) this.resolved = false;
      // stray ball: bring it back
      if (!ball.owner && (ball.pos.distXZ(this.center) > 26 || (ball.speed < 0.2 && ball.pos.distXZ(h.pos) > 3 && !this.stations.some((s) => s.p.pos.distXZ(ball.pos) < 3)))) {
        if (!this.resetAt) this.resetAt = now + 0.8;
        if (now >= this.resetAt) this.resetBall();
      }
      this.view.markers.showIncoming(g.c.x, g.c.z);
    } else if (this.kind === 'finishing') {
      const k = ball.lastKick;
      if (k && k.player === h && k.kind === 'shot' && !this.shotAt) this.shotAt = now;
      const inGoal = ball.pos.x - BALL_R > PITCH.HL && ball.crossing[0] && ball.crossing[0].inMouth;
      if (!this.ballDone) {
        if (inGoal) { this.score++; this.ballDone = true; this.note(k && k.firstTime ? 'FIRST-TIME GOAL!' : 'GOAL', 'good'); this.resetAt = now + 1.4; m.events.emit('drillGoal', { pos: ball.pos.clone() }); }
        else if (ball.state === 'held') { this.ballDone = true; this.note('SAVED', 'bad'); this.resetAt = now + 1.0; }
        else if (ball.pos.x - BALL_R > PITCH.HL || Math.abs(ball.pos.z) > PITCH.HW || (this.shotAt && now - this.shotAt > 3.2)) { this.ballDone = true; this.note('MISSED', 'bad'); this.resetAt = now + 0.9; }
        else if (!this.shotAt && this.serveAt == null && ball.speed < 0.3 && !ball.owner && now > 6 && ball.pos.distXZ(h.pos) > 6) { this.ballDone = true; this.resetAt = now + 0.5; }
      }
      if (this.resetAt && now >= this.resetAt) {
        if (m.keeper(1).hold) { m.keeper(1).hold = null; }
        const gk = m.keeper(1);
        gk.action = null; gk.pos.set(PITCH.HL - 1, 0, 0);
        if (this.served >= this.maxBalls) this.finish();
        else this.serve();
      }
    } else if (this.kind === 'dribbling') {
      if (!this.started && (h.speed > 0.5 || ball.owner === h)) { this.started = true; this.t = 0; }
      if (!this.started) this.t = 0;
      const g = this.gates[this.next];
      if (g && segCross(ball.prevPos.x, ball.prevPos.z, ball.pos.x, ball.pos.z, g.a.x, g.a.z, g.b.x, g.b.z) && ball.lastTouch === h) {
        this.next++;
        this.score = this.next;
        if (g.finish) { this.note(`FINISHED ${this.t.toFixed(1)} s`, 'good'); this.finish(); }
        else this.note(`GATE ${this.next}/${this.gates.length - 1}`, 'good');
      }
      if (g) this.view.markers.showIncoming(g.c.x, g.c.z);
      // lost the ball far away: return it to the player
      if (!ball.owner && ball.speed < 0.2 && ball.pos.distXZ(h.pos) > 6) {
        if (!this.resetAt) this.resetAt = now + 1;
        if (now > this.resetAt) this.resetBall();
      } else if (ball.owner) this.resetAt = null;
    } else {
      // free practice: reset after goals and balls out of play
      const out = Math.abs(ball.pos.z) - BALL_R > PITCH.HW || Math.abs(ball.pos.x) - BALL_R > PITCH.HL;
      const inGoal = ball.pos.x - BALL_R > PITCH.HL && ball.crossing[0] && ball.crossing[0].inMouth;
      if ((out || ball.state === 'held') && !this.resetAt) {
        if (inGoal) { this.score++; this.note('GOAL', 'good'); m.events.emit('drillGoal', { pos: ball.pos.clone() }); }
        this.resetAt = now + (ball.state === 'held' ? 1.2 : 1.5);
      }
      if (this.resetAt && now >= this.resetAt) {
        const gk = m.keeper(1);
        gk.hold = null; gk.action = null; gk.pos.set(PITCH.HL - 1, 0, 0);
        this.resetBall(true);
      }
    }
    if (limit && this.t >= limit) this.finish();
  }

  note(text, kind) { this.events.push({ text, kind }); }

  finish() {
    if (this.done) return;
    this.done = true;
    this.m.phase = 'fulltime';
    this.m.phaseT = 0;
  }

  clockText() {
    if (!this.def.time) return `Goals ${this.score}`;
    const left = Math.max(0, this.def.time - this.t);
    if (this.kind === 'dribbling') return `${this.t.toFixed(1)} s · gate ${Math.min(this.next + 1, this.gates.length)}/${this.gates.length}`;
    if (this.kind === 'finishing') return `${Math.ceil(left)} s · goals ${this.score} · ball ${Math.min(this.served, this.maxBalls)}/${this.maxBalls}`;
    return `${Math.ceil(left)} s · gates ${this.score}`;
  }

  result() {
    let xp = 0, text = '';
    if (this.kind === 'passing') { xp = clamp(Math.round(8 + this.score * 2.5), 8, 35); text = `${this.score} gate passes in ${this.def.time} s`; }
    else if (this.kind === 'finishing') { xp = clamp(Math.round(8 + this.score * 4), 8, 35); text = `${this.score} goals from ${this.maxBalls} balls`; }
    else if (this.kind === 'dribbling') {
      const finished = this.next >= this.gates.length;
      xp = finished ? clamp(Math.round(45 - this.t), 12, 35) : clamp(4 + this.next * 2, 4, 18);
      text = finished ? `Course completed in ${this.t.toFixed(1)} s` : `${this.next} of ${this.gates.length} gates in the time limit`;
    }
    return { xp, text, score: this.score };
  }
}
