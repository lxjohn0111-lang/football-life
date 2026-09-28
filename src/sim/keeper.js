// Goalkeepers: positioning, approach, catching, parrying, diving, recovery and
// distribution. Saves need physical contact between the keeper's hands/body and
// the ball; reaction delay and limited dive reach mean strong, well placed shots
// can beat them.
import { V3, clamp, lerp, yawOf, pointSegDistXZ } from './vec.js';
import { PITCH, GOAL, AREA, BALL_R, RULES } from './constants.js';
import { startKick } from './actions.js';
import { laneOpenness } from './passing.js';

const tA = new V3();

export function inOwnBox(match, gk, x, z, margin = 0) {
  const gx = match.ownGoalX(gk.team);
  return Math.sign(x) === Math.sign(gx) && Math.abs(x - gx) < AREA.PEN_D + margin && Math.abs(z) < AREA.PEN_HW + margin && Math.abs(x) <= PITCH.HL + 0.5;
}

export function keeperHandles(match, gk, ball) {
  if (!gk.isGK || match.phase !== 'playing') return false;
  if (ball.owner || ball.state === 'held' || ball.state === 'dead') return false;
  if (match.time < gk.downUntil) return false;
  if (match.time < gk.noCaptureUntil) return false;
  return inOwnBox(match, gk, ball.pos.x, ball.pos.z, 0.3);
}

// Geometry of the keeper's contact volume: segment a->b with radius r
export function keeperVolume(match, gk, out) {
  const a = gk.action;
  if (a && a.type === 'dive') {
    const tau = Math.max(0, a.t - a.delay);
    const e = clamp(tau / a.flight, 0, 1);
    const handY = lerp(1.25, a.handY, clamp(tau / (a.flight * 0.55), 0, 1));
    const bodyY = lerp(1.0, clamp(a.handY * 0.7, 0.25, 1.5), clamp(tau / (a.flight * 0.5), 0, 1));
    const reach = 0.45 + 0.45 * Math.min(1, e * 1.6);
    out.ax = gk.pos.x - a.dirX * 0.35; out.ay = bodyY; out.az = gk.pos.z - a.dirZ * 0.35;
    out.bx = gk.pos.x + a.dirX * reach; out.by = handY; out.bz = gk.pos.z + a.dirZ * reach;
    out.r = 0.2;
    out.diving = true;
    return out;
  }
  const fx = Math.sin(gk.yaw), fz = Math.cos(gk.yaw);
  out.ax = gk.pos.x + fx * 0.12; out.ay = 0.05; out.az = gk.pos.z + fz * 0.12;
  out.bx = out.ax; out.by = 2.15; out.bz = out.az;
  out.r = gk.ai.set ? 0.42 : 0.34;
  out.diving = false;
  return out;
}

function segDist3(px, py, pz, v) {
  const abx = v.bx - v.ax, aby = v.by - v.ay, abz = v.bz - v.az;
  const l2 = abx * abx + aby * aby + abz * abz;
  let t = l2 > 1e-9 ? ((px - v.ax) * abx + (py - v.ay) * aby + (pz - v.az) * abz) / l2 : 0;
  t = clamp(t, 0, 1);
  const cx = v.ax + abx * t, cy = v.ay + aby * t, cz = v.az + abz * t;
  return { d: Math.hypot(px - cx, py - cy, pz - cz), t, cx, cy, cz };
}

const vol = {};
export function keeperContact(match, gk, ball) {
  keeperVolume(match, gk, vol);
  const hit = segDist3(ball.pos.x, ball.pos.y, ball.pos.z, vol);
  if (hit.d > vol.r + BALL_R) return false;
  const now = match.time;
  const sp = ball.speed;
  let catchLimit = 12.5 + gk.keeping * 0.09;
  if (vol.diving) catchLimit -= 3.5;
  if (ball.pos.y > 1.9) catchLimit -= 3;
  const edge = hit.d / (vol.r + BALL_R); // 1 = fingertips
  const gs = match.attackDir(gk.team); // away from own goal
  const k = ball.lastKick;
  const shot = k && k.kind === 'shot' && k.team !== gk.team ? k : null;
  gk.touch = { foot: 'H', time: now, x: ball.pos.x, y: ball.pos.y, z: ball.pos.z, kind: 'save' };
  ball.lastTouch = gk; ball.lastTouchTime = now;
  if (sp < catchLimit && edge < 0.92 && match.rng.next() > (sp / catchLimit - 0.75) * 1.4) {
    // clean catch
    ball.owner = gk;
    ball.state = 'held';
    ball.vel.set(0, 0, 0);
    ball.spin.set(0, 0, 0);
    ball.version++;
    gk.hold = 'gk';
    gk.ai.holdStart = now;
    gk.ai.state = 'hold';
    match.possTeam = gk.team;
    match.passIntent = null;
    match.events.emit('save', { player: gk, caught: true, speed: sp, shot, t: now });
    match.events.emit('possession', { player: gk, team: gk.team, prev: null, cause: 'catch', t: now });
    return true;
  }
  // parry: push the ball away from goal and wide
  let side = Math.sign(ball.pos.z - gk.pos.z) || (match.rng.next() < 0.5 ? -1 : 1);
  if (sp > catchLimit + 9 && edge > 0.8) {
    // fingertip touch on a thunderbolt: only slightly deflected
    ball.vel.x *= 0.62; ball.vel.z += side * 2.2; ball.vel.y += 1.0;
  } else {
    const out = 2 + sp * 0.22;
    ball.vel.set(gs * out * (0.5 + match.rng.next() * 0.5), 1.2 + match.rng.next() * 2.4, side * (2.5 + sp * 0.22));
  }
  ball.state = 'air';
  ball.version++;
  gk.noCaptureUntil = now + 0.3;
  match.events.emit('save', { player: gk, caught: false, speed: sp, shot, t: now });
  return true;
}

function startDive(match, gk, targetZ, targetX, handY, delay = 0.07) {
  const dz = targetZ - gk.pos.z, dx = targetX - gk.pos.x;
  const lateral = Math.abs(dz);
  const dirZ = Math.sign(dz) || 1;
  const fwd = clamp(dx, -0.8, 0.8) * 0.3;
  const l = Math.hypot(dirZ, fwd);
  const dist = clamp(lateral - 0.35, 0.3, 1.95 + gk.keeping * 0.004);
  gk.action = { type: 'dive', t: 0, delay, flight: 0.56 - gk.keeping * 0.0008, dist, dirX: fwd / l, dirZ: dirZ / l, handY: clamp(handY, 0.15, 2.3), dur: 1.25 };
  gk.yaw = yawOf(match.attackDir(gk.team), 0);
  match.events.emit('dive', { player: gk, t: match.time });
}

function updateDive(match, gk, a, dt) {
  const tau = a.t - a.delay;
  if (tau < 0) { gk.vel.set(0, 0, 0); return; }
  if (tau < a.flight) {
    const s = (2 * a.dist / a.flight) * (1 - tau / a.flight);
    gk.vel.set(a.dirX * s, 0, a.dirZ * s);
  } else {
    gk.vel.set(0, 0, 0);
  }
  // smother a ball at an attacker's feet
  const ball = match.ball;
  if (ball.owner && ball.owner.team !== gk.team && tau > 0 && tau < a.flight && !a.smotherDone) {
    keeperVolume(match, gk, vol);
    const hit = segDist3(ball.pos.x, ball.pos.y, ball.pos.z, vol);
    if (hit.d < vol.r + BALL_R + 0.1) {
      a.smotherDone = true;
      if (match.rng.next() < 0.5 + gk.keeping * 0.004) {
        const gs = match.attackDir(gk.team);
        match.dislodge(ball.owner, gk, new V3(gs * 2.5, 0.5, a.dirZ * 3));
      }
    }
  }
  if (a.t > a.dur) {
    gk.action = null;
    gk.ai.set = false;
  }
}

// Find where the predicted ball path crosses x = planeX (towards own goal)
function crossPlane(match, planeX, dirSign, maxT) {
  const tr = match.traj;
  const off = match.time - tr.t0;
  const pts = tr.pts;
  for (let i = 1; i < tr.count; i++) {
    const t = i * tr.step - off;
    if (t < 0) continue;
    if (t > maxT) break;
    const x0 = pts[(i - 1) * 3], x1 = pts[i * 3];
    // dirSign: +1 when the ball travels towards +x
    if ((planeX - x0) * dirSign > 0 && (planeX - x1) * dirSign <= 0) {
      const f = (x0 - planeX) / (x0 - x1 || 1e-6);
      return {
        t: t - tr.step * (1 - f),
        y: pts[(i - 1) * 3 + 1] + (pts[i * 3 + 1] - pts[(i - 1) * 3 + 1]) * f,
        z: pts[(i - 1) * 3 + 2] + (pts[i * 3 + 2] - pts[(i - 1) * 3 + 2]) * f,
      };
    }
  }
  return null;
}

export function updateKeeper(match, gk, dt, params) {
  const ball = match.ball, now = match.time, ai = gk.ai;
  const gs = match.attackDir(gk.team);
  const goalX = -gs * PITCH.HL;
  gk.sprint = false;
  gk.faceYaw = null;
  if (gk.action && gk.action.type === 'dive') { updateDive(match, gk, gk.action, dt); gk.desired.set(0, 0, 0); return; }
  if (now < gk.downUntil) { gk.desired.set(0, 0, 0); return; }

  // holding the ball: look up, then distribute within a few seconds
  if (ball.state === 'held' && ball.owner === gk) {
    const held = now - (ai.holdStart ?? now);
    const edgeX = goalX + gs * (AREA.PEN_D - 2);
    tA.set(edgeX, 0, clamp(gk.pos.z, -6, 6));
    steer(gk, tA, 1.6);
    gk.faceYaw = yawOf(gs, 0);
    if (!gk.action && (held > params.gkHold || held > RULES.GK_MAX_HOLD - 0.4 || (held > 0.8 && humanWantsIt(match, gk)))) distribute(match, gk, params);
    return;
  }
  if (match.phase !== 'playing') return;

  // --- shot / threat detection with reaction delay ---
  const kick = ball.lastKick;
  const incoming = !ball.owner && ball.vel.x * -gs > 2.5;
  if (ball.version !== ai.seenVersion) {
    ai.seenVersion = ball.version;
    ai.reactAt = now + params.gkReaction * (0.9 + match.rng.next() * 0.25);
    if (kick && kick.restart === 'penalty' && kick.team !== gk.team && now - kick.t < 0.05) {
      ai.reactAt = now + 0.12;
      ai.penalty = true;
    }
  }
  const planeX = gk.pos.x;
  let threat = null;
  if (incoming) {
    const line = crossPlane(match, goalX, -gs, 2.4);
    if (line && Math.abs(line.z) < GOAL.HW + 0.6 && line.y < GOAL.H + 0.4) {
      threat = crossPlane(match, planeX + gs * 0.05, -gs, 2.4) || line;
      if (Math.abs(ball.pos.x - goalX) < Math.abs(planeX - goalX) + 0.2) threat = line;
    }
  }
  if (threat) {
    ai.set = true;
    gk.faceYaw = yawOf(ball.pos.x - gk.pos.x, ball.pos.z - gk.pos.z);
    if (now < ai.reactAt) { gk.desired.set(0, 0, 0); return; }
    const dz = threat.z - gk.pos.z;
    const adz = Math.abs(dz);
    if (ai.penalty) {
      ai.penalty = false;
      const correct = match.rng.next() < 0.55;
      const guessZ = correct ? threat.z : -Math.sign(threat.z || 1) * 2;
      if (Math.abs(guessZ - gk.pos.z) > 0.6) { startDive(match, gk, guessZ, gk.pos.x, threat.y, 0.02); return; }
    }
    if (adz < 0.5 && threat.y < 2.1) {
      tA.set(gk.pos.x, 0, threat.z);
      steer(gk, tA, 3);
    } else if (adz - 0.5 < 3.0 * Math.max(0, threat.t - 0.12) && threat.y < 1.9 && threat.t > 0.35) {
      tA.set(gk.pos.x, 0, threat.z);
      gk.sprint = true;
      steer(gk, tA, 5);
    } else if (threat.t < 1.4) {
      startDive(match, gk, threat.z, gk.pos.x + gs * 0.2, threat.y);
    }
    return;
  }
  ai.set = false;

  // --- a pass from a teammate: go and meet it ---
  const pi = match.passIntent;
  if (pi && pi.target === gk && !ball.owner && now - pi.t < 4) {
    const tr = match.traj;
    for (let t = 0.05; t < 3; t += 0.05) {
      tr.at(t + (now - tr.t0), tA);
      if (gk.pos.distXZ(tA) / 5.5 <= t) break;
    }
    steer(gk, tA, 5.5);
    gk.sprint = true;
    gk.faceYaw = yawOf(ball.pos.x - gk.pos.x, ball.pos.z - gk.pos.z);
    return;
  }

  // --- rush out to collect a loose ball in or near the box ---
  if (!ball.owner && ball.state !== 'held' && ball.state !== 'dead') {
    const tr = match.traj;
    let best = null;
    for (let t = 0.1; t < 2.5; t += 0.1) {
      tr.at(t + (now - tr.t0), tA);
      if (!inOwnBox(match, gk, tA.x, tA.z, -0.5)) continue;
      const reach = gk.pos.distXZ(tA) / 6.2 + 0.2;
      if (reach <= t && tA.y < 2.2) { best = { t, x: tA.x, z: tA.z }; break; }
    }
    if (best) {
      const oppT = fastestOpponent(match, gk.team, best.x, best.z);
      if (oppT > best.t + 0.05) {
        tA.set(best.x, 0, best.z);
        gk.sprint = true;
        steer(gk, tA, 6.2);
        gk.faceYaw = yawOf(ball.pos.x - gk.pos.x, ball.pos.z - gk.pos.z);
        return;
      }
    }
  }

  // --- 1v1: narrow the angle and smother ---
  const o = ball.owner;
  if (o && o.team !== gk.team && inOwnBox(match, gk, o.pos.x, o.pos.z, 1)) {
    const dGoal = Math.hypot(o.pos.x - goalX, o.pos.z);
    let covered = false;
    for (const d of match.teams[gk.team].players) {
      if (d === gk || d.isGK) continue;
      const r = pointSegDistXZ(d.pos.x, d.pos.z, o.pos.x, o.pos.z, goalX, 0);
      if (r.d < 1.2 && r.t > 0.1) covered = true;
    }
    if (!covered && dGoal < 13) {
      const dist = ball.pos.distXZ(gk.pos);
      if (dist < 2.0 && now > (ai.smotherReady || 0)) {
        ai.smotherReady = now + 1.5;
        startDive(match, gk, ball.pos.z, ball.pos.x, 0.2, 0.05);
        return;
      }
      const f = clamp((dGoal - 2.5) / dGoal, 0, 1);
      tA.set(goalX + (o.pos.x - goalX) * f, 0, o.pos.z * f);
      gk.sprint = true;
      steer(gk, tA, 5.5);
      gk.faceYaw = yawOf(o.pos.x - gk.pos.x, o.pos.z - gk.pos.z);
      return;
    }
  }

  // --- positioning on the ball-goal line ---
  const bx = ball.pos.x, bz = ball.pos.z;
  const tx = bx - goalX, tz = bz;
  const dist = Math.hypot(tx, tz) || 1;
  const depth = clamp(0.7 + (dist - 8) * 0.06, 0.6, 3.2);
  tA.set(goalX + (tx / dist) * depth, 0, clamp((tz / dist) * depth * 1.2, -2.3, 2.3));
  if ((tA.x - goalX) * gs < 0.4) tA.x = goalX + gs * 0.4;
  steer(gk, tA, dist < 20 ? 4 : 2.5);
  gk.faceYaw = yawOf(bx - gk.pos.x, bz - gk.pos.z);
}

function steer(p, target, maxSpeed) {
  const dx = target.x - p.pos.x, dz = target.z - p.pos.z;
  const d = Math.hypot(dx, dz);
  if (d < 0.08) { p.desired.set(0, 0, 0); return; }
  const s = Math.min(maxSpeed, d * 3.5);
  p.desired.set((dx / d) * s, 0, (dz / d) * s);
}

function fastestOpponent(match, team, x, z) {
  let best = 99;
  for (const o of match.players) {
    if (o.team === team) continue;
    const d = Math.hypot(o.pos.x - x, o.pos.z - z);
    const t = Math.max(0, d - 0.8) / o.sprintSpeed() + 0.2;
    if (t < best) best = t;
  }
  return best;
}

function humanWantsIt(match, gk) {
  const h = match.human;
  return h && h.team === gk.team && h.requestUntil > match.time;
}

function distribute(match, gk, params) {
  const gs = match.attackDir(gk.team);
  let best = null, bestScore = -1e9, bestKind = 'gkthrow';
  for (const t of match.teams[gk.team].players) {
    if (t === gk) continue;
    const d = gk.pos.distXZ(t.pos);
    if (d < 5) continue;
    let space = 99;
    for (const o of match.players) if (o.team !== gk.team) space = Math.min(space, o.pos.distXZ(t.pos));
    const open = laneOpenness(match, gk.pos.x, gk.pos.z, t.pos.x, t.pos.z, gk.team, 11);
    const human = t.isHuman ? params.humanBonus + (t.requestUntil > match.time ? 0.5 : 0) : 0;
    if (d < 30) {
      const s = open * 1.2 + Math.min(space, 10) * 0.07 - d * 0.01 + human;
      if (s > bestScore && open > 0.45) { bestScore = s; best = t; bestKind = 'gkthrow'; }
    }
    const adv = match.uOf(gk.team, t.pos.x);
    if (adv > -0.2 && space > 3.5) {
      const s = 0.35 + adv * 0.4 + Math.min(space, 10) * 0.05 + human * 0.6;
      if (s > bestScore) { bestScore = s; best = t; bestKind = 'gkkick'; }
    }
  }
  if (!best) {
    // hoof it forward
    startKick(match, gk, 'gkkick', { point: new V3(gs * 8, 0, (match.rng.next() - 0.5) * 20), ai: true });
  } else {
    gk.yaw = yawOf(best.pos.x - gk.pos.x, best.pos.z - gk.pos.z);
    startKick(match, gk, bestKind, { target: best, ai: true });
  }
  gk.hold = bestKind === 'gkkick' ? 'gk' : 'gk';
  match.events.emit('distribute', { player: gk, target: best, t: match.time });
}
