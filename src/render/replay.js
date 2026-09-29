// Goal replays. While a match is played the view records what it draws about 60 times
// a second into a ring buffer: every player's 13 part matrices (so the replay shows the
// exact same animation, the player's own body included), the ball, the goal nets and
// the crowd. After a goal the session plays a clip of the build-up, the shot and the
// ball hitting the net back in slow motion, filmed by a drone camera.
import * as THREE from 'three';
import { PER } from './characters.js';
import { PITCH } from '../sim/constants.js';

const HZ = 60;
const SECONDS = 12;
// matrix elements kept per part (the bottom row of an affine matrix is always 0 0 0 1)
const KEEP = [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14];
// frame layout: ball position (3) and rotation (4), crowd level (1), both nets (2 x 7)
const HEAD = 3 + 4 + 1 + 14;

export class ReplayRecorder {
  constructor(nPlayers) {
    this.n = nPlayers;
    this.parts = nPlayers * PER;
    this.size = HEAD + this.parts * 12;
    this.cap = HZ * SECONDS;
    this.buf = new Float32Array(this.size * this.cap);
    this.times = new Float64Array(this.cap);
    this.clear();
    // scratch frame handed to the view
    this.frame = { ball: new THREE.Vector3(), q: new THREE.Quaternion(), crowd: 0, nets: new Float32Array(14), parts: new Float32Array(this.parts * 12) };
    this._q2 = new THREE.Quaternion();
  }

  clear() { this.count = 0; this.start = 0; this.lastT = -1e9; this.cur = -1; }

  phys(k) { return (this.start + k) % this.cap; }

  // start a frame at sim time t; false when this frame is not recorded (too soon after
  // the last one, or time did not move because the game is paused)
  begin(t) {
    if (t < this.lastT - 0.5) this.clear(); // a new match or a rewind
    if (t - this.lastT < 1 / HZ - 1e-4) { this.cur = -1; return false; }
    if (this.count < this.cap) this.count++;
    else this.start = (this.start + 1) % this.cap;
    this.cur = this.phys(this.count - 1);
    this.times[this.cur] = t;
    this.lastT = t;
    return true;
  }

  putPlayer(i, mats) {
    if (this.cur < 0) return;
    let o = this.cur * this.size + HEAD + i * PER * 12;
    const b = this.buf;
    for (let k = 0; k < PER; k++) {
      const e = mats[k].elements;
      for (let j = 0; j < 12; j++) b[o++] = e[KEEP[j]];
    }
  }

  // ball, crowd and the two nets' uniforms (x, y, z, displacement, direction x, y, z)
  end(ballPos, ballQ, crowd, netA, netDA, netB, netDB) {
    if (this.cur < 0) return;
    const b = this.buf, o = this.cur * this.size;
    b[o] = ballPos.x; b[o + 1] = ballPos.y; b[o + 2] = ballPos.z;
    b[o + 3] = ballQ.x; b[o + 4] = ballQ.y; b[o + 5] = ballQ.z; b[o + 6] = ballQ.w;
    b[o + 7] = crowd;
    b[o + 8] = netA.x; b[o + 9] = netA.y; b[o + 10] = netA.z; b[o + 11] = netA.w;
    b[o + 12] = netDA.x; b[o + 13] = netDA.y; b[o + 14] = netDA.z;
    b[o + 15] = netB.x; b[o + 16] = netB.y; b[o + 17] = netB.z; b[o + 18] = netB.w;
    b[o + 19] = netDB.x; b[o + 20] = netDB.y; b[o + 21] = netDB.z;
    this.cur = -1;
  }

  get firstT() { return this.count ? this.times[this.phys(0)] : 0; }

  // logical index of the last frame at or before t
  indexAt(t) {
    let lo = 0, hi = this.count - 1;
    if (hi < 0) return -1;
    if (t <= this.times[this.phys(0)]) return 0;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (this.times[this.phys(mid)] <= t) lo = mid; else hi = mid - 1;
    }
    return lo;
  }

  // position of player i's pelvis in logical frame k
  rootAt(k, i, out) {
    const o = this.phys(k) * this.size + HEAD + i * PER * 12 + 9;
    return out.set(this.buf[o], this.buf[o + 1], this.buf[o + 2]);
  }

  // the recorded frame at time t, interpolated between the two nearest frames
  sample(t) {
    const f = this.frame;
    const k = this.indexAt(t);
    if (k < 0) return null;
    const k2 = Math.min(this.count - 1, k + 1);
    const t0 = this.times[this.phys(k)], t1 = this.times[this.phys(k2)];
    const w = k2 === k || t1 <= t0 ? 0 : THREE.MathUtils.clamp((t - t0) / (t1 - t0), 0, 1);
    const a = this.phys(k) * this.size, c = this.phys(k2) * this.size, b = this.buf;
    const L = (i) => b[a + i] + (b[c + i] - b[a + i]) * w;
    f.ball.set(L(0), L(1), L(2));
    f.q.set(b[a + 3], b[a + 4], b[a + 5], b[a + 6]);
    f.q.slerp(this._q2.set(b[c + 3], b[c + 4], b[c + 5], b[c + 6]), w);
    f.crowd = L(7);
    for (let i = 0; i < 14; i++) f.nets[i] = L(8 + i);
    const p = f.parts, n = this.parts * 12;
    for (let i = 0; i < n; i++) p[i] = b[a + HEAD + i] + (b[c + HEAD + i] - b[a + HEAD + i]) * w;
    return f;
  }

  // Clip around a goal: from a couple of seconds before the key moment (the shot, or
  // the last second before the goal) to just after the ball hits the net. The start is
  // moved later past any teleport (a restart setting players in place).
  clip(goalT, keyT) {
    if (this.count < 10) return null;
    const endK = this.indexAt(goalT + 1.4);
    const keyK = this.indexAt(keyT);
    let startK = this.indexAt(keyT - 2.1);
    const a = new THREE.Vector3(), b = new THREE.Vector3();
    for (let k = keyK; k > startK; k--) {
      let jump = false;
      for (let i = 0; i < this.n && !jump; i++) {
        this.rootAt(k, i, a); this.rootAt(k - 1, i, b);
        if (a.distanceToSquared(b) > 1.2 * 1.2) jump = true;
      }
      if (jump || this.times[this.phys(k)] - this.times[this.phys(k - 1)] > 0.3) { startK = k; break; }
    }
    const t0 = this.times[this.phys(startK)], t1 = this.times[this.phys(endK)];
    if (t1 - t0 < 0.8) return null;
    return { t0, t1 };
  }
}

const smooth = (a, b, x) => { const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

// Plays a clip: maps real time to clip time (slow motion around the shot and the goal)
// and flies the drone: it follows the scorer from behind and above, then swoops down
// beside the goal as the ball goes in.
export class ReplayDirector {
  constructor(rec, clip, o) {
    this.rec = rec;
    this.t0 = clip.t0; this.t1 = clip.t1;
    this.t = clip.t0;
    this.goalT = o.goalT;
    this.shotT = o.shotT != null && o.shotT > clip.t0 && o.shotT < o.goalT ? o.shotT : null;
    this.subject = o.subject; // index of the scorer in the recorded players (or -1)
    this.clock = 0; // real seconds since the replay started
    this.done = false;
    this.cues = { shot: this.shotT == null, goal: false };
    const f = rec.sample(o.goalT);
    // the goal that was scored and the direction the attack came from
    this.goal = new THREE.Vector3(Math.sign(f ? f.ball.x : 1) * PITCH.HL, 1.1, 0);
    const from = new THREE.Vector3();
    if (!this.subjectPos(this.shotT ?? o.goalT - 0.6, from)) from.set(this.goal.x - Math.sign(this.goal.x) * 16, 0, 0);
    const d = new THREE.Vector3(from.x - this.goal.x, 0, from.z - this.goal.z);
    if (d.lengthSq() < 4) d.set(-Math.sign(this.goal.x), 0, 0.3);
    d.normalize();
    this.dir = d;
    // the drone stays on the shooter's side of the shot line, so neither blocks the other
    const n = new THREE.Vector3(-d.z, 0, d.x);
    const side = Math.sign(from.z || 1) * Math.sign(n.z || 1);
    this.side = n.multiplyScalar(side);
    this.cam = { mode: 'free', pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 62, roll: 0 };
    this.first = true;
    this._a = new THREE.Vector3(); this._b = new THREE.Vector3(); this._c = new THREE.Vector3(); this._l = new THREE.Vector3();
  }

  subjectPos(t, out) {
    if (this.subject < 0) return null;
    const k = this.rec.indexAt(t);
    if (k < 0) return null;
    return this.rec.rootAt(k, this.subject, out);
  }

  // playback speed at clip time t
  speed(t) {
    let s = 0.85;
    if (this.shotT != null) {
      s -= 0.55 * Math.exp(-(((t - this.shotT) / 0.35) ** 2));
      if (t > this.shotT && t < this.goalT) s = Math.min(s, 0.45);
    }
    s -= 0.6 * Math.exp(-(((t - this.goalT) / 0.45) ** 2));
    return Math.max(0.25, s);
  }

  // advance by real time dt; returns the events crossed ('shot', 'goal')
  advance(dt) {
    const ev = [];
    if (this.done) return ev;
    this.clock += dt;
    this.t = Math.min(this.t1, this.t + dt * this.speed(this.t));
    if (!this.cues.shot && this.t >= this.shotT) { this.cues.shot = true; ev.push('shot'); }
    if (!this.cues.goal && this.t >= this.goalT) { this.cues.goal = true; ev.push('goal'); }
    if (this.t >= this.t1) this.done = true;
    return ev;
  }

  frame() { return this.rec.sample(this.t); }

  // drone camera for the current frame
  camera(f, dt) {
    const t = this.t, c = this.cam;
    const keyT = this.shotT ?? this.goalT - 0.6;
    // 0 while following the scorer, 1 once the ball is in the net
    const w = smooth(keyT + 0.05, this.goalT + 0.35, t);
    const subj = this.subjectPos(Math.min(t, keyT + 0.3), this._a) || this._a.copy(f.ball);
    const ball = f.ball;
    // following: close behind the scorer (away from goal), off to the side and above
    const follow = this._b.copy(subj).addScaledVector(this.dir, 6.5).addScaledVector(this.side, 3.4);
    follow.y = 4.6;
    // finish: in front of the goal and to the side, low, looking into the net
    const end = this._c.copy(this.goal).addScaledVector(this.dir, 7).addScaledVector(this.side, 4.8);
    end.y = 2.8;
    const pos = follow.lerp(end, w);
    // a slow drift and bob, like a drone holding position in the wind
    pos.x += Math.sin(this.clock * 0.9) * 0.18;
    pos.y += Math.sin(this.clock * 1.3 + 1) * 0.12;
    pos.z += Math.cos(this.clock * 0.7) * 0.18;
    pos.y = Math.max(1.6, pos.y);
    pos.x = THREE.MathUtils.clamp(pos.x, -PITCH.HL - 6, PITCH.HL + 6);
    pos.z = THREE.MathUtils.clamp(pos.z, -PITCH.HW - 5, PITCH.HW + 5);
    // look at the scorer (a little towards goal), then between the scorer and the ball
    // as it is struck, then follow the ball into the net
    const look = this._l.copy(subj).setY(1.0).lerp(this.goal, 0.12);
    look.lerp(this._c.copy(subj).setY(0.9).lerp(ball, 0.5), smooth(keyT - 0.3, keyT + 0.15, t));
    look.lerp(ball, smooth(keyT + 0.2, keyT + 0.2 + 0.6 * Math.max(0.3, this.goalT - keyT), t));
    look.lerp(this._a.copy(ball).lerp(this.goal, 0.35), smooth(this.goalT - 0.1, this.goalT + 0.6, t));
    if (this.first) { c.pos.copy(pos); c.look.copy(look); this.first = false; }
    else {
      c.pos.lerp(pos, 1 - Math.exp(-dt * 3.2));
      c.look.lerp(look, 1 - Math.exp(-dt * 5));
    }
    c.fov = 60 - 10 * w;
    c.roll = Math.sin(this.clock * 0.8) * 0.018;
    return c;
  }
}
