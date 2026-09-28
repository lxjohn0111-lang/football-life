// Procedural animation from simulation state. Feet are planted in world space
// (no sliding) using the sim's gait phase; legs and arms use analytic two-bone
// IK. Kicks show anticipation -> contact -> follow-through with the kicking foot
// meeting the ball exactly where the simulation applied the impulse.
import * as THREE from 'three';
import { P, DIM } from './characters.js';
import { strideLength, stanceFraction } from '../sim/player.js';
import { keeperVolume } from '../sim/keeper.js';

const UP = new THREE.Vector3(0, 1, 0);
const tmp = Array.from({ length: 24 }, () => new THREE.Vector3());
const mA = new THREE.Matrix4(), qA = new THREE.Quaternion(), eA = new THREE.Euler();
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const smooth = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
function lerpAngle(a, b, t) { let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return a + d * t; }
function frac(x) { return x - Math.floor(x); }

const V3 = () => new THREE.Vector3();
const LS = { x: V3(), y: V3(), z: V3() };
const IKS = { d: V3(), bend: V3(), r: V3(), t: V3() };
// scratch owned by the pose builders (never shared with update())
const U = { pelvis: V3(), waist: V3(), neck: V3(), fwd: V3(), side: V3(), hip: V3(), ankT: V3(), knee: V3(), ankle: V3(), pole: V3(), back: V3(), sh: V3(), tgt: V3(), off: V3(), elbow: V3(), hand: V3(), pole2: V3() };
const D = { hands: V3(), body: V3(), axis: V3(), sh: V3(), pelvis: V3(), face: V3(), z: V3(), x: V3(), p1: V3(), p2: V3(), hip: V3(), knee: V3(), ankle: V3(), shp: V3(), tgt: V3(), elbow: V3(), hand: V3() };

// matrix for a limb segment extending along local -Y from `from` to `to`
function limb(out, from, to, fwdHint) {
  const y = LS.y.subVectors(from, to);
  if (y.lengthSq() < 1e-8) y.set(0, 1, 0);
  y.normalize();
  const z = LS.z.copy(fwdHint).addScaledVector(y, -fwdHint.dot(y));
  if (z.lengthSq() < 1e-6) { z.set(0, 0, 1).addScaledVector(y, -y.z); if (z.lengthSq() < 1e-6) z.set(1, 0, 0); }
  z.normalize();
  const x = LS.x.crossVectors(y, z);
  out.makeBasis(x, y, z);
  out.setPosition(from);
  return out;
}

// two-bone IK. returns joint position in `mid`, adjusted end in `end`
function ik(root0, target0, l1, l2, pole, mid, end) {
  const root = IKS.r.copy(root0), target = IKS.t.copy(target0);
  const d = IKS.d.subVectors(target, root);
  let len = d.length();
  if (len < 1e-4) { d.set(0, -1, 0); len = 1e-4; } else d.divideScalar(len);
  len = clamp(len, Math.abs(l1 - l2) + 0.02, l1 + l2 - 0.002);
  end.copy(root).addScaledVector(d, len);
  const cosA = clamp((l1 * l1 + len * len - l2 * l2) / (2 * l1 * len), -1, 1);
  const sinA = Math.sqrt(1 - cosA * cosA);
  const bend = IKS.bend.copy(pole).addScaledVector(d, -pole.dot(d));
  if (bend.lengthSq() < 1e-6) bend.set(0, 0, 1);
  bend.normalize();
  mid.copy(root).addScaledVector(d, l1 * cosA).addScaledVector(bend, l1 * sinA);
}

class Foot {
  constructor() {
    this.pos = new THREE.Vector3(); this.plant = new THREE.Vector3(); this.from = new THREE.Vector3();
    this.swing = false; this.step = null; this.out = new THREE.Vector3();
  }
}

export class Animator {
  constructor(player) {
    this.p = player;
    this.feet = [new Foot(), new Foot()];
    this.ready = false;
    this.lastRoot = new THREE.Vector3();
    this.lean = 0;
    this.headYaw = 0;
    this.headPitch = 0;
    this.fall = 0;
    this.m = Array.from({ length: 13 }, () => new THREE.Matrix4());
    this.root = new THREE.Vector3();
    this.yaw = 0;
    this.hands = [new THREE.Vector3(), new THREE.Vector3()];
    this.handW = 0;
  }

  reset() { this.ready = false; }

  // ctx: { match, alpha, dt, now, ball (THREE.Vector3 rendered), local }
  update(ctx) {
    const p = this.p, m = ctx.match, dt = Math.min(ctx.dt, 0.05), now = ctx.now;
    const alpha = ctx.alpha;
    const a = p.action;
    const root = this.root.set(lerp(p.prevPos.x, p.pos.x, alpha), 0, lerp(p.prevPos.z, p.pos.z, alpha));
    const yaw = this.yaw = lerpAngle(p.prevYaw, p.yaw, alpha);
    const fwd = tmp[0].set(Math.sin(yaw), 0, Math.cos(yaw));
    const left = tmp[1].set(Math.cos(yaw), 0, -Math.sin(yaw));
    const vx = p.vel.x, vz = p.vel.z;
    const speed = Math.hypot(vx, vz);
    const sf = clamp(speed / 7.5, 0, 1);

    if (!this.ready || this.lastRoot.distanceTo(root) > 2.5) {
      this.ready = true;
      for (let i = 0; i < 2; i++) {
        const f = this.feet[i];
        f.pos.copy(root).addScaledVector(left, i === 0 ? 0.11 : -0.11);
        f.plant.copy(f.pos); f.swing = false; f.step = null;
      }
    }
    this.lastRoot.copy(root);

    // ---------------- locomotion: planted feet driven by the gait phase
    const g = lerp(p.prevGait, p.gait, alpha);
    const moving = speed > 0.35 && !(a && (a.type === 'slide' || a.type === 'dive'));
    const S = strideLength(Math.max(speed, 0.6));
    const beta = stanceFraction(S);
    const vdx = speed > 0.01 ? vx / speed : fwd.x, vdz = speed > 0.01 ? vz / speed : fwd.z;
    for (let i = 0; i < 2; i++) {
      const f = this.feet[i];
      const sgn = i === 0 ? 1 : -1;
      const latX = left.x * 0.11 * sgn, latZ = left.z * 0.11 * sgn;
      if (moving) {
        f.step = null;
        const u = frac(g - (i === 0 ? 0 : 0.5));
        if (u < beta) {
          if (f.swing) { f.swing = false; f.plant.set(f.pos.x, 0, f.pos.z); }
          // a planted foot left too far behind (sharp turn / knock) gets re-planted
          const hx = root.x + latX, hz = root.z + latZ;
          if (Math.hypot(f.plant.x - hx, f.plant.z - hz) > 0.9) f.plant.set(hx + vdx * 0.2, 0, hz + vdz * 0.2);
          f.pos.copy(f.plant);
        } else {
          if (!f.swing) { f.swing = true; f.from.set(f.pos.x, 0, f.pos.z); }
          const s = (u - beta) / (1 - beta);
          const tRemain = ((1 - u) * S) / Math.max(speed, 0.5);
          let tx = root.x + vx * tRemain + vdx * beta * S * 0.5 + latX;
          let tz = root.z + vz * tRemain + vdz * beta * S * 0.5 + latZ;
          // anticipate a dribble touch: swing toward the ball
          if (m.ball.owner === p && !a) {
            const bx = ctx.ball.x + m.ball.vel.x * tRemain * 0.5, bz = ctx.ball.z + m.ball.vel.z * tRemain * 0.5;
            const ahead = (bx - root.x) * vdx + (bz - root.z) * vdz;
            if (ahead > 0.1 && ahead < 1.0) { tx = lerp(tx, bx - vdx * 0.12, 0.35); tz = lerp(tz, bz - vdz * 0.12, 0.35); }
          }
          const e = smooth(s);
          f.pos.set(lerp(f.from.x, tx, e), (0.09 + speed * 0.035) * Math.sin(Math.PI * Math.pow(s, 0.75)), lerp(f.from.z, tz, e));
        }
      } else {
        // idle: feet stay planted; small corrective steps when stance is awkward
        const ix = root.x + latX + fwd.x * (i === 0 ? 0.03 : -0.03), iz = root.z + latZ + fwd.z * (i === 0 ? 0.03 : -0.03);
        if (f.swing) { f.swing = false; f.step = { fx: f.pos.x, fz: f.pos.z, t: 0, dur: 0.14 }; }
        const other = this.feet[1 - i];
        if (f.step) {
          f.step.t += dt;
          const s = clamp(f.step.t / f.step.dur, 0, 1), e = smooth(s);
          f.pos.set(lerp(f.step.fx, ix, e), 0.07 * Math.sin(Math.PI * s), lerp(f.step.fz, iz, e));
          if (s >= 1) { f.step = null; f.plant.set(ix, 0, iz); }
        } else if (Math.hypot(f.plant.x - ix, f.plant.z - iz) > 0.22 && !other.step) {
          f.step = { fx: f.plant.x, fz: f.plant.z, t: 0, dur: 0.16 };
        } else f.pos.copy(f.plant);
      }
      f.out.copy(f.pos);
    }

    // ---------------- body basics
    let pelvisY = 0.935 - 0.05 * sf + 0.018 * sf * Math.cos(g * Math.PI * 4);
    let lean = 0.05 + 0.16 * sf + (p.sprint ? 0.05 : 0);
    let bodyYaw = yaw;
    let twist = 0.16 * sf * Math.sin(g * Math.PI * 2);
    let pitchExtra = 0;
    let torsoRoll = 0;
    // arm swing defaults (hand targets relative to shoulders, in body frame)
    const swing = Math.sin(g * Math.PI * 2);
    const armAmp = 0.08 + 0.3 * sf;
    let handL = tmp[2].set(0.05, -0.5 + 0.18 * sf, -swing * armAmp);
    let handR = tmp[3].set(-0.05, -0.5 + 0.18 * sf, swing * armAmp);
    let handsWorld = false; // hand targets given in world space
    const wHL = tmp[4], wHR = tmp[5];
    let headLook = null;
    let fullBody = null; // special whole-body poses (slide, dive, fall)

    // ---------------- action overrides
    const ball = ctx.ball;
    const touch = p.touch;
    if (a && a.type === 'kick' && !a.fromHands) {
      const kf = a.foot === 'L' ? 0 : 1;
      const kyaw = a.contacted ? (a.kyaw ?? yaw) : yaw;
      if (a.contacted && a.kyaw == null) a.kyaw = yaw;
      const kd = tmp[6].set(Math.sin(kyaw), 0, Math.cos(kyaw));
      const kl = tmp[7].set(Math.cos(kyaw), 0, -Math.sin(kyaw)).multiplyScalar(kf === 0 ? 1 : -1); // kicking-foot side
      const B = tmp[8];
      if (a.contacted && touch && touch.kind !== 'receive') B.set(touch.x, 0, touch.z); else B.set(ball.x, 0, ball.z);
      const lofted = a.kind === 'cross' || a.kind === 'lob' || a.kind === 'clear';
      const power = a.kind === 'shot' ? (a.charging ? a.charge : Math.max(a.charge || 0, a.ai ? a.power : 0.35)) : lofted ? 0.8 : 0.3 + (a.charge || 0) * 0.4;
      const support = tmp[9].copy(B).addScaledVector(kd, -0.14).addScaledVector(kl, -0.25);
      const kfF = this.feet[kf].out, sfF = this.feet[1 - kf].out;
      if (!a.contacted) {
        const w = a.charging ? 0.35 + 0.4 * a.charge : clamp(a.t / Math.max(0.06, a.t + a.eta), 0, 1);
        const back = tmp[10].copy(B).addScaledVector(kd, -(0.32 + 0.38 * power)).addScaledVector(kl, 0.06);
        back.y = 0.12 + 0.32 * power;
        if (w < 0.75) kfF.lerp(back, smooth(w / 0.75));
        else kfF.copy(back).lerp(tmp[11].copy(B).setY(0.06), (w - 0.75) / 0.25);
        sfF.lerp(support, smooth(w * 2.2));
        lean = 0.12 - (lofted ? 0.08 : 0);
      } else {
        const f = (a.t - a.contactT) / a.follow;
        const thr = tmp[10].copy(B).addScaledVector(kd, 0.45 + 0.5 * power);
        thr.y = 0.2 + 0.5 * power;
        const cp = tmp[11].copy(B).setY(0.06);
        if (f < 0.5) kfF.copy(cp.lerp(thr, smooth(f / 0.5)));
        else kfF.lerp(thr, 1 - smooth((f - 0.5) / 0.5));
        if (f < 0.65) sfF.copy(support);
        else sfF.lerp(support, 1 - smooth((f - 0.65) / 0.35));
        lean = 0.1 - (lofted ? 0.12 : 0) * (1 - f);
      }
      // balance arms: kicking-side arm back and out, other arm forward
      const ks = kf === 0 ? 1 : -1;
      const kHand = ks > 0 ? handL : handR, oHand = ks > 0 ? handR : handL;
      kHand.set(ks * 0.35, -0.35, -0.2);
      oHand.set(-ks * 0.3, -0.3, 0.25);
    } else if (a && a.type === 'kick' && a.fromHands) {
      // throw-ins and keeper distribution
      const f = a.contacted ? clamp((a.t - a.contactT) / a.follow, 0, 1) : clamp(a.t / Math.max(0.1, a.t + a.eta), 0, 1);
      if (a.kind === 'throw') {
        const back = !a.contacted ? f : 1 - f;
        handL.set(0.12, 0.62 - 0.05 * back, -0.25 * back + (a.contacted ? 0.35 * f : 0));
        handR.set(-0.12, 0.62 - 0.05 * back, -0.25 * back + (a.contacted ? 0.35 * f : 0));
        lean = -0.12 * (a.contacted ? 1 - f : f) + (a.contacted ? 0.15 * f : 0);
      } else if (a.kind === 'gkthrow') {
        handR.set(-0.12, -0.45, a.contacted ? 0.45 * (1 - f) + 0.2 : -0.35 * f);
        handL.set(0.25, -0.35, 0.1);
        lean = 0.25;
      } else {
        // punt: ball held out, then kicking leg swings high
        handL.set(0.1, -0.2, 0.35); handR.set(-0.1, -0.2, 0.35);
        const kfF = this.feet[1].out;
        const kd = tmp[6].set(Math.sin(yaw), 0, Math.cos(yaw));
        if (a.contacted) { kfF.copy(root).addScaledVector(kd, 0.3 + 0.5 * f); kfF.y = 0.3 + 0.6 * Math.sin(Math.PI * f); }
        else { kfF.copy(root).addScaledVector(kd, -0.3 * f); kfF.y = 0.15 * f; }
      }
    } else if (a && a.type === 'tackle') {
      const t = a.t;
      const ext = t < 0.07 ? t / 0.07 * 0.3 : t < 0.3 ? 0.3 + Math.min(1, (t - 0.07) / 0.1) * 0.7 : Math.max(0, 1 - (t - 0.3) / 0.18);
      const dir = tmp[6].set(Math.sin(a.dir), 0, Math.cos(a.dir));
      const kfF = this.feet[1].out;
      const tgt = tmp[7].copy(root).addScaledVector(dir, 0.3 + 0.75 * ext).addScaledVector(left, -0.05);
      tgt.y = 0.06;
      kfF.lerp(tgt, clamp(ext * 1.4, 0, 1));
      lean = 0.1 + 0.25 * ext;
      pelvisY -= 0.08 * ext;
      handL.set(0.35, -0.3, 0.1); handR.set(-0.35, -0.3, -0.15);
    } else if (a && a.type === 'slide') {
      fullBody = 'slide';
    } else if (a && a.type === 'dive') {
      fullBody = 'dive';
    } else if (now < p.downUntil) {
      fullBody = 'fall';
    } else if (a && a.type === 'celebrate' || p.celebrate > now) {
      const t = now * 6 + p.id;
      handL.set(0.25, 0.55 + 0.08 * Math.sin(t), 0.05);
      handR.set(-0.25, 0.55 + 0.08 * Math.cos(t), 0.05);
      if (a && a.type === 'celebrate' && speed < 1) pelvisY += 0.12 * Math.max(0, Math.sin(now * 9));
    } else if (p.hold === 'throw' || (m.restart && m.restart.handsBall && m.restart.taker === p && m.phase === 'restart')) {
      handsWorld = true;
      wHL.set(ball.x, ball.y, ball.z).addScaledVector(left, 0.1);
      wHR.set(ball.x, ball.y, ball.z).addScaledVector(left, -0.1);
    } else if (p.isGK && m.ball.state === 'held' && m.ball.owner === p) {
      handsWorld = true;
      wHL.set(ball.x, ball.y, ball.z).addScaledVector(left, 0.1).addScaledVector(fwd, -0.04);
      wHR.set(ball.x, ball.y, ball.z).addScaledVector(left, -0.1).addScaledVector(fwd, -0.04);
    } else if (p.isGK && p.ai.set) {
      pelvisY = 0.8;
      lean = 0.22;
      handL.set(0.3, -0.12, 0.3); handR.set(-0.3, -0.12, 0.3);
      // reach toward a ball that is arriving at the keeper
      const d = Math.hypot(ball.x - root.x, ball.z - root.z);
      if (d < 1.4) {
        handsWorld = true;
        wHL.set(ball.x, ball.y, ball.z).addScaledVector(left, 0.12);
        wHR.set(ball.x, ball.y, ball.z).addScaledVector(left, -0.12);
      }
    } else if (now < p.stumbleUntil) {
      const w = Math.sin(now * 20) * 0.15;
      handL.set(0.4, -0.1 + w, 0); handR.set(-0.4, -0.1 - w, 0);
      torsoRoll = w * 0.4;
    }

    // first-touch and dribble contact: the foot meets the ball where it was touched
    if (!fullBody && touch && (touch.kind === 'receive' || touch.kind === 'dribble' || touch.kind === 'stop' || touch.kind === 'poke') && !(a && a.type === 'kick')) {
      const dtT = now - touch.time;
      if (dtT > -0.05 && dtT < 0.2) {
        const w = 1 - Math.abs(dtT - 0.02) / 0.18;
        const fi = touch.foot === 'L' ? 0 : 1;
        const tp = tmp[12].set(touch.x, 0.05 + (touch.kind === 'receive' ? Math.min(0.5, touch.y) * 0.8 : 0), touch.z);
        tp.addScaledVector(tmp[13].set(touch.x - root.x, 0, touch.z - root.z).normalize(), -0.1);
        this.feet[fi].out.lerp(tp, clamp(w, 0, 1) * 0.85);
      }
    }

    // ---------------- assemble matrices
    const Mx = this.m;
    if (fullBody === 'slide') this.poseSlide(p, a, root, yaw, Mx);
    else if (fullBody === 'dive') this.poseDive(p, m, root, yaw, Mx);
    else if (fullBody === 'fall') this.poseFall(p, now, root, yaw, Mx, fwd, left);
    else {
      // look at the ball
      const bx = ball.x - root.x, bz = ball.z - root.z;
      const by = Math.atan2(bx, bz);
      let hy = by - bodyYaw;
      while (hy > Math.PI) hy -= Math.PI * 2; while (hy < -Math.PI) hy += Math.PI * 2;
      hy = clamp(hy, -1.1, 1.1);
      this.headYaw = lerp(this.headYaw, hy, 1 - Math.exp(-dt * 8));
      const bd = Math.hypot(bx, bz);
      this.headPitch = lerp(this.headPitch, clamp(Math.atan2(1.55 - ball.y, bd) * 0.6, -0.3, 0.5), 1 - Math.exp(-dt * 6));
      this.lean = lerp(this.lean, lean, 1 - Math.exp(-dt * 10));
      this.poseUpright(p, root, bodyYaw, pelvisY, this.lean + pitchExtra, twist, torsoRoll, handL, handR, handsWorld ? wHL : null, handsWorld ? wHR : null, Mx, ctx.local);
    }
    return Mx;
  }

  poseUpright(p, root, yaw, pelvisY, lean, twist, roll, handL, handR, wHL, wHR, Mx, local) {
    const pelvis = U.pelvis.set(root.x, pelvisY, root.z);
    const fwd = U.fwd.set(Math.sin(yaw), 0, Math.cos(yaw));
    const side = U.side.set(Math.cos(yaw), 0, -Math.sin(yaw));
    if (local) pelvis.addScaledVector(fwd, -0.1); // keep the torso clear of the first-person camera
    eA.set(0, yaw - twist * 0.4, 0, 'YXZ');
    Mx[P.PELVIS].makeRotationFromEuler(eA).setPosition(pelvis);
    const pelvisM = Mx[P.PELVIS];
    // torso
    const waist = U.waist.set(0, DIM.waist, 0).applyMatrix4(pelvisM);
    eA.set(lean, yaw + twist, roll, 'YXZ');
    Mx[P.TORSO].makeRotationFromEuler(eA).setPosition(waist);
    const torsoM = Mx[P.TORSO];
    // head
    const neck = U.neck.set(0, 0.58, 0).applyMatrix4(torsoM);
    eA.set(this.headPitch - lean * 0.5, yaw + this.headYaw, 0, 'YXZ');
    Mx[P.HEAD].makeRotationFromEuler(eA).setPosition(neck);
    // legs
    for (let i = 0; i < 2; i++) {
      const hip = U.hip.set(i === 0 ? DIM.hipW : -DIM.hipW, -0.02, 0).applyMatrix4(pelvisM);
      const foot = this.feet[i].out;
      const ankleT = U.ankT.set(foot.x, foot.y + DIM.ankle, foot.z);
      const pole = U.pole.copy(fwd).addScaledVector(UP, 0.1);
      ik(hip, ankleT, DIM.thigh, DIM.shin, pole, U.knee, U.ankle);
      limb(Mx[i === 0 ? P.THIGH_L : P.THIGH_R], hip, U.knee, fwd);
      limb(Mx[i === 0 ? P.SHIN_L : P.SHIN_R], U.knee, U.ankle, fwd);
      // boot: toe follows body yaw, pitches with the swing
      const pitch = clamp((U.ankle.y - DIM.ankle) * 1.2, 0, 0.6) * (this.feet[i].swing ? 1 : 0);
      eA.set(pitch, yaw, 0, 'YXZ');
      Mx[i === 0 ? P.BOOT_L : P.BOOT_R].makeRotationFromEuler(eA).setPosition(U.ankle);
    }
    // arms via IK toward hand targets
    const back = U.back.set(-fwd.x, -0.6, -fwd.z);
    for (let i = 0; i < 2; i++) {
      const s = i === 0 ? 1 : -1;
      const sh = U.sh.set(s * DIM.shoulderW, 0.45, 0).applyMatrix4(torsoM);
      let target;
      if (wHL) target = U.tgt.copy(i === 0 ? wHL : wHR);
      else target = U.tgt.copy(i === 0 ? handL : handR).add(U.off.set(s * DIM.shoulderW, 0.45, 0)).applyMatrix4(torsoM);
      const pole = U.pole2.copy(back).addScaledVector(side, s * 0.5);
      ik(sh, target, DIM.upper, DIM.fore, pole, U.elbow, U.hand);
      limb(Mx[i === 0 ? P.UARM_L : P.UARM_R], sh, U.elbow, fwd);
      limb(Mx[i === 0 ? P.FARM_L : P.FARM_R], U.elbow, U.hand, fwd);
      this.hands[i].copy(U.hand);
    }
  }

  poseSlide(p, a, root, yaw, Mx) {
    const t = a.t;
    const getUp = clamp((t - 0.62) / 0.43, 0, 1);
    const down = clamp(t / 0.12, 0, 1) * (1 - smooth(getUp));
    const dir = tmp[0].set(Math.sin(a.dir), 0, Math.cos(a.dir));
    const left = tmp[1].set(Math.cos(a.dir), 0, -Math.sin(a.dir));
    const pelvisY = lerp(0.93, 0.2, down);
    const lean = lerp(0.05, -1.05, down);
    // lead leg along the ground, trailing leg tucked
    this.feet[1].out.copy(root).addScaledVector(dir, lerp(0.1, 1.0, down)).addScaledVector(left, -0.08).setY(lerp(0, 0.05, down));
    this.feet[0].out.copy(root).addScaledVector(dir, lerp(0.0, 0.25, down)).addScaledVector(left, 0.22).setY(0);
    const hl = tmp[2].set(0.35, lerp(-0.5, -0.2, down), lerp(0, -0.35, down));
    const hr = tmp[3].set(-0.4, lerp(-0.5, -0.1, down), lerp(0, 0.2, down));
    this.lean = lean;
    this.headPitch = lerp(this.headPitch, 0.5 * down, 0.2);
    this.poseUpright(p, root, a.dir, pelvisY, lean, 0, 0, hl, hr, null, null, Mx, false);
  }

  poseFall(p, now, root, yaw, Mx, fwd, left) {
    const a = p.action;
    const total = a && a.dur ? a.dur : 1.0;
    const t = a ? a.t : total - (p.downUntil - now);
    const down = smooth(t / 0.35) * (1 - smooth((t - (total - 0.45)) / 0.45));
    const pelvisY = lerp(0.93, 0.22, down);
    const lean = lerp(0.05, 1.35, down);
    this.feet[0].out.copy(root).addScaledVector(fwd, -0.5 * down).addScaledVector(left, 0.14).setY(0.02 * down);
    this.feet[1].out.copy(root).addScaledVector(fwd, -0.6 * down).addScaledVector(left, -0.14).setY(0.05 * down);
    const hl = tmp[2].set(0.25, lerp(-0.5, -0.05, down), lerp(0, 0.45, down));
    const hr = tmp[3].set(-0.25, lerp(-0.5, -0.05, down), lerp(0, 0.45, down));
    this.poseUpright(p, root, yaw, pelvisY, lean, 0, 0, hl, hr, null, null, Mx, false);
  }

  poseDive(p, m, root, yaw, Mx) {
    const vol = keeperVolume(m, p, {});
    const hands = D.hands.set(vol.bx, vol.by, vol.bz);
    const axis = D.axis.subVectors(hands, D.body.set(vol.ax, vol.ay, vol.az));
    axis.divideScalar(axis.length() || 1);
    // body frame: up along the dive axis, chest facing the pitch
    const shoulders = D.sh.copy(hands).addScaledVector(axis, -0.52);
    const pelvis = D.pelvis.copy(shoulders).addScaledVector(axis, -0.5);
    pelvis.y = Math.max(0.18, pelvis.y);
    const face = D.face.set(Math.sin(yaw), 0, Math.cos(yaw));
    const zAxis = D.z.copy(face).addScaledVector(axis, -face.dot(axis)).normalize();
    const xAxis = D.x.crossVectors(axis, zAxis);
    mA.makeBasis(xAxis, axis, zAxis);
    Mx[P.PELVIS].copy(mA).setPosition(pelvis);
    Mx[P.TORSO].copy(mA).setPosition(D.p1.copy(pelvis).addScaledVector(axis, DIM.waist));
    Mx[P.HEAD].copy(mA).setPosition(D.p2.copy(pelvis).addScaledVector(axis, DIM.waist + 0.58));
    // legs trail behind
    for (let i = 0; i < 2; i++) {
      const s = i === 0 ? 1 : -1;
      const hip = D.hip.copy(pelvis).addScaledVector(xAxis, s * DIM.hipW);
      const knee = D.knee.copy(hip).addScaledVector(axis, -DIM.thigh).addScaledVector(zAxis, 0.08);
      knee.y = Math.max(0.08, knee.y);
      const ankle = D.ankle.copy(knee).addScaledVector(axis, -DIM.shin).addScaledVector(zAxis, -0.05);
      ankle.y = Math.max(0.08, ankle.y);
      limb(Mx[i === 0 ? P.THIGH_L : P.THIGH_R], hip, knee, zAxis);
      limb(Mx[i === 0 ? P.SHIN_L : P.SHIN_R], knee, ankle, zAxis);
      eA.set(0, yaw, 0, 'YXZ');
      Mx[i === 0 ? P.BOOT_L : P.BOOT_R].makeRotationFromEuler(eA).setPosition(ankle);
    }
    // arms stretched to the save point
    for (let i = 0; i < 2; i++) {
      const s = i === 0 ? 1 : -1;
      const sh = D.shp.copy(shoulders).addScaledVector(xAxis, s * DIM.shoulderW);
      const target = D.tgt.copy(hands).addScaledVector(xAxis, s * 0.09);
      ik(sh, target, DIM.upper, DIM.fore, zAxis, D.elbow, D.hand);
      limb(Mx[i === 0 ? P.UARM_L : P.UARM_R], sh, D.elbow, zAxis);
      limb(Mx[i === 0 ? P.FARM_L : P.FARM_R], D.elbow, D.hand, zAxis);
      this.hands[i].copy(D.hand);
    }
    void root;
  }
}
