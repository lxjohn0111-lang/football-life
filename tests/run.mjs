// Headless test suite: node tests/run.mjs
// Physics, goal-line rule, statistics definitions (from real match events),
// duplicate protection, halftime and frame-rate independence.
import assert from 'node:assert/strict';
import { Match } from '../src/sim/match.js';
import { HumanController } from '../src/sim/human.js';
import { DT, PITCH, GOAL, BALL_R } from '../src/sim/constants.js';
import { Ball, stepBall, rollDistance } from '../src/sim/ball.js';
import { V3 } from '../src/sim/vec.js';
import { startKick } from '../src/sim/actions.js';
import { makeTeam, makeMatch } from './helpers.mjs';

let passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ok  ', name); } catch (e) { failed++; console.log('  FAIL', name, '\n       ', e.message); }
}

// a small controllable match: human (team 0) + optional others, rules on
function scene({ human = 'CM', mates = [], opps = [], keeper = false, difficulty = 'assisted' } = {}) {
  const t0 = makeTeam('A', 1, 'wing', { human: { role: human } });
  t0.players = [t0.players.find((p) => p.isHuman), ...mates.map((r, i) => ({ role: r, number: 20 + i, name: `M${i}`, attrs: { pace: 50, stamina: 60, control: 60, passing: 60, finishing: 50, tackling: 50 } }))];
  const t1 = makeTeam('B', 1, 'wing');
  t1.players = [...opps.map((r, i) => ({ role: r, number: 30 + i, name: `O${i}`, attrs: { pace: 50, stamina: 60, control: 50, passing: 50, finishing: 50, tackling: 50 } })), ...(keeper ? [{ role: 'GK', number: 1, name: 'GK', keeping: 50, attrs: { pace: 50, stamina: 50, control: 50, passing: 50, finishing: 50, tackling: 50 } }] : [])];
  const m = new Match({ seed: 5, teams: [t0, t1], rules: true, difficulty });
  m.humanCtl = new HumanController(m, m.human);
  m.phase = 'playing';
  for (const p of m.players) p.scripted = true; // AI off unless enabled
  return m;
}
const run = (m, sec, each) => { for (let i = 0; i < sec * 120; i++) { if (each) each(i); m.step(DT); } };

console.log('Ball physics');
test('rolling ball slows gradually and settles without jitter', () => {
  const b = new Ball(); b.state = 'free'; b.place(0, 0); b.state = 'free'; b.setVelocity(new V3(8, 0, 0));
  let t = 0; while (b.vel.lenXZ() > 0 && t < 20) { stepBall(b, DT, null); t += DT; }
  assert.ok(t > 3 && t < 12, `roll time ${t}`);
  const x = b.pos.x; for (let i = 0; i < 240; i++) stepBall(b, DT, null);
  assert.equal(b.pos.x, x); assert.equal(b.pos.y, BALL_R);
  assert.ok(Math.abs(x - rollDistance(8)) < 0.6, `distance ${x} vs ${rollDistance(8)}`);
});
test('bounces lose energy and come to rest', () => {
  const b = new Ball(); b.place(0, 0, 3); b.state = 'air';
  let peaks = [], prevVy = 0;
  for (let i = 0; i < 120 * 6; i++) { stepBall(b, DT, null); if (prevVy > 0 && b.vel.y <= 0) peaks.push(b.pos.y); prevVy = b.vel.y; }
  assert.ok(peaks.length >= 2 && peaks.every((p, i) => i === 0 || p < peaks[i - 1]), `peaks ${peaks}`);
  assert.equal(b.pos.y, BALL_R);
});
test('fast shot cannot tunnel through a post', () => {
  const b = new Ball(); b.place(PITCH.HL - 6, GOAL.HW + GOAL.POST_R); b.state = 'air'; b.pos.y = 1;
  b.setVelocity(new V3(38, 0, 0));
  let hit = false;
  for (let i = 0; i < 60; i++) stepBall(b, DT, { onFrame: () => { hit = true; } });
  assert.ok(hit, 'post contact'); assert.ok(b.vel.x < 0, 'rebounded');
});
test('net absorbs a ball that enters the goal', () => {
  const b = new Ball(); b.place(PITCH.HL - 3, 0); b.state = 'air'; b.pos.y = 1;
  b.setVelocity(new V3(28, 0, 0));
  for (let i = 0; i < 240; i++) stepBall(b, DT, null);
  assert.ok(b.pos.x > PITCH.HL + BALL_R && b.pos.x < PITCH.HL + GOAL.DEPTH + 0.5, `x=${b.pos.x}`);
  assert.ok(b.speed < 2, `speed ${b.speed}`);
});

console.log('Rules');
test('goal counts only when the whole ball crosses the line', () => {
  const m = scene();
  m.ball.state = 'free'; m.ball.place(PITCH.HL - 0.05, 0); m.ball.state = 'free';
  m.ball.crossing[0] = { z: 0, y: BALL_R, inMouth: true };
  m.step(DT);
  assert.equal(m.phase, 'playing', 'half over the line is not a goal');
  m.ball.pos.x = PITCH.HL + BALL_R + 0.02; m.step(DT);
  assert.equal(m.phase, 'goal');
  assert.equal(m.scoreline[0], 1);
  const goals = m.events.log.filter((e) => e.type === 'goal').length;
  run(m, 1);
  assert.equal(m.events.log.filter((e) => e.type === 'goal').length, goals, 'counted once');
});
test('ball over the touchline gives a throw-in to the other team', () => {
  const m = scene({ opps: ['DEF'] });
  m.ball.place(0, PITCH.HW - 0.3); m.ball.state = 'free'; m.ball.lastTouch = m.human; m.ball.setVelocity(new V3(0, 0, 4));
  run(m, 0.5);
  const out = m.events.log.find((e) => e.type === 'out');
  assert.ok(out && out.restart === 'throwin' && out.team === 1);
});
test('halftime reverses attacking directions for both teams', () => {
  const m = makeMatch({ seed: 3, halfLength: 5 });
  m.start(0);
  const a0 = m.attackDir(0), a1 = m.attackDir(1);
  let n = 0; while (m.half === 1 && n < 120 * 60) { m.step(DT); n++; }
  assert.equal(m.attackDir(0), -a0); assert.equal(m.attackDir(1), -a1);
  run(m, 1.5);
  const own = m.players.filter((p) => !p.isGK && p.team === 0);
  assert.ok(own.every((p) => p.pos.x * m.attackDir(0) <= 0.5), 'team 0 lines up in its new half');
});

console.log('Statistics from events');
test('completed pass, then assist + goal credited once', () => {
  const m = scene({ mates: ['ST'] });
  const mate = m.players.find((p) => p.role === 'ST');
  m.human.pos.set(10, 0, 0); m.human.yaw = Math.PI / 2; mate.pos.set(22, 0, 3);
  m.ball.place(10.6, 0); m.ball.state = 'free';
  run(m, 0.3);
  assert.equal(m.ball.owner, m.human, 'human controls the ball');
  m.humanCtl.input.yaw = Math.atan2(mate.pos.x - m.human.pos.x, mate.pos.z - m.human.pos.z);
  run(m, 0.1);
  m.humanCtl.press('pass'); m.humanCtl.release('pass');
  run(m, 2.5);
  assert.equal(m.ball.owner, mate, 'teammate received');
  const st = m.stats.s(m.human);
  assert.equal(st.passAtt, 1); assert.equal(st.passCmp, 1);
  // the striker scores
  startKick(m, mate, 'shot', { point: new V3(PITCH.HL, 0.5, 1.5), power: 0.9, ai: true });
  run(m, 2);
  assert.equal(m.scoreline[0], 1);
  assert.equal(st.assists, 1, 'assist');
  assert.equal(m.stats.s(mate).goals, 1);
  run(m, 3);
  assert.equal(st.assists, 1, 'no duplicate assist');
});
test('intercepted pass: interception for the opponent, possession lost for the passer', () => {
  // expert: no pass assist, so the ground pass runs straight into the defender
  const m = scene({ mates: ['ST'], opps: ['DEF'], difficulty: 'expert' });
  const mate = m.players.find((p) => p.role === 'ST'), opp = m.players.find((p) => p.team === 1);
  m.human.pos.set(0, 0, 0); m.human.yaw = Math.PI / 2; mate.pos.set(14, 0, 0); opp.pos.set(7, 0, 0.4);
  m.ball.place(0.6, 0); m.ball.state = 'free';
  run(m, 0.3);
  m.humanCtl.input.yaw = Math.PI / 2;
  m.humanCtl.press('pass'); m.humanCtl.release('pass');
  run(m, 2);
  assert.equal(m.ball.owner, opp);
  assert.equal(m.stats.s(opp).interceptions, 1);
  assert.equal(m.stats.s(m.human).possLost, 1);
  assert.equal(m.stats.s(m.human).passCmp, 0);
});
test('pass assist chips a blocked pass over the defender to the teammate', () => {
  const m = scene({ mates: ['ST'], opps: ['DEF'] });
  const mate = m.players.find((p) => p.role === 'ST'), opp = m.players.find((p) => p.team === 1);
  m.human.pos.set(0, 0, 0); m.human.yaw = Math.PI / 2; mate.pos.set(14, 0, 0); opp.pos.set(7, 0, 0.4);
  m.ball.place(0.6, 0); m.ball.state = 'free';
  run(m, 0.3);
  m.humanCtl.input.yaw = Math.PI / 2;
  m.humanCtl.press('pass'); m.humanCtl.release('pass');
  run(m, 2.5);
  assert.equal(m.ball.owner, mate);
  assert.equal(m.stats.s(m.human).passCmp, 1);
});
test('shot saved by the keeper counts as on target', () => {
  const m = scene({ keeper: true });
  const gk = m.keeper(1); gk.scripted = false;
  m.human.pos.set(PITCH.HL - 14, 0, 0); m.human.yaw = Math.PI / 2;
  gk.pos.set(PITCH.HL - 1, 0, 0);
  m.ball.place(PITCH.HL - 13.4, 0); m.ball.state = 'free';
  run(m, 0.3);
  // weak central shot at the keeper
  m.humanCtl.input.yaw = Math.PI / 2; m.humanCtl.input.pitch = Math.atan2(1.0 - 1.65, 14);
  m.humanCtl.press('shoot'); m.humanCtl.release('shoot');
  run(m, 2);
  const st = m.stats.s(m.human);
  assert.equal(st.shots, 1); assert.equal(st.shotsOn, 1);
  assert.equal(m.stats.s(gk).saves, 1);
  assert.equal(m.scoreline[0], 0);
});
test('successful tackle credited when the team gains control; victim loses possession', () => {
  const m = scene({ opps: ['ST'] });
  const opp = m.players.find((p) => p.team === 1);
  m.human.pos.set(-8, 0, 0);
  opp.pos.set(0, 0, 0); opp.yaw = -Math.PI / 2; opp.attrs.control = 20;
  m.ball.place(-0.7, 0); m.ball.state = 'free';
  run(m, 0.3);
  assert.equal(m.ball.owner, opp);
  m.human.pos.set(-1.9, 0, 0); m.human.yaw = Math.PI / 2; m.humanCtl.input.yaw = Math.PI / 2;
  m.human.attrs.tackling = 99;
  let tries = 0;
  while (m.stats.s(m.human).tacklesWon === 0 && tries < 12) {
    m.humanCtl.press('tackle'); run(m, 0.7);
    if (m.ball.owner !== opp && m.ball.owner !== m.human) { m.ball.place(opp.pos.x - 0.7, opp.pos.z); m.ball.owner = null; m.ball.state = 'free'; run(m, 0.3); }
    m.human.pos.set(opp.pos.x - 1.9, 0, opp.pos.z); m.human.yaw = Math.PI / 2;
    tries++;
  }
  assert.ok(m.stats.s(m.human).tacklesWon >= 1, 'tackle won');
  assert.ok(m.stats.s(opp).possLost >= 1, 'victim lost possession');
});
test('late slide through the player is a foul and gives a free kick or penalty', () => {
  const m = scene({ opps: ['ST'] });
  const opp = m.players.find((p) => p.team === 1);
  opp.pos.set(0, 0, 0); opp.yaw = Math.PI / 2;
  m.ball.place(5, 5); m.ball.state = 'free';
  m.human.pos.set(-2.5, 0, 0); m.human.yaw = Math.PI / 2; m.human.vel.set(5, 0, 0);
  m.humanCtl.input.yaw = Math.PI / 2; m.humanCtl.input.moveF = 1;
  m.humanCtl.press('slide');
  run(m, 1);
  assert.equal(m.stats.s(m.human).fouls, 1);
  assert.ok(['stoppage', 'restart'].includes(m.phase));
});
test('dribbling out of play is a possession loss (missed shots are not)', () => {
  const m = scene({ keeper: true });
  m.human.pos.set(0, 0, PITCH.HW - 2); m.human.yaw = 0; m.humanCtl.input.yaw = 0;
  m.ball.place(0, PITCH.HW - 1.4); m.ball.state = 'free';
  run(m, 0.2);
  assert.equal(m.ball.owner, m.human);
  m.humanCtl.input.moveF = 1; m.humanCtl.input.sprint = true;
  run(m, 2);
  assert.equal(m.stats.s(m.human).possLost, 1);
  // a shot that goes wide is only a shot
  const m2 = scene({ keeper: true });
  m2.human.pos.set(PITCH.HL - 16, 0, 0); m2.human.yaw = Math.PI / 2;
  m2.ball.place(PITCH.HL - 15.4, 0); m2.ball.state = 'free';
  run(m2, 0.3);
  m2.humanCtl.input.yaw = Math.PI / 2 - 0.5; m2.humanCtl.input.pitch = 0;
  m2.humanCtl.press('shoot'); m2.humanCtl.release('shoot');
  run(m2, 3);
  assert.equal(m2.stats.s(m2.human).shots, 1);
  assert.equal(m2.stats.s(m2.human).possLost, 0);
});

console.log('Assistance');
test('assisted dribbling keeps the ball at the human\'s feet through sprints and turns', () => {
  const m = scene({ opps: [] });
  m.human.pos.set(-20, 0, 0); m.human.yaw = Math.PI / 2; m.humanCtl.input.yaw = Math.PI / 2;
  m.ball.place(-19.4, 0); m.ball.state = 'free';
  run(m, 0.3);
  assert.equal(m.ball.owner, m.human);
  let maxD = 0;
  const yaws = [Math.PI / 2, 0, Math.PI, Math.PI / 2 + 0.8, -Math.PI / 2];
  m.humanCtl.input.moveF = 1; m.humanCtl.input.sprint = true;
  for (const y of yaws) {
    m.humanCtl.input.yaw = y;
    run(m, 1.2, () => { maxD = Math.max(maxD, m.human.pos.distXZ(m.ball.pos)); });
  }
  assert.equal(m.ball.owner, m.human);
  // stays inside the protected zone, so opponents can only win it with a tackle
  assert.ok(maxD < 1.1, `ball strayed ${maxD.toFixed(2)} m`);
});
test('tackle press fires even while a first-time kick is pending or on cooldown', () => {
  const m = scene({ opps: ['ST'] });
  const opp = m.players.find((p) => p.team === 1);
  opp.pos.set(10, 0, 10);
  m.human.pos.set(0, 0, 0);
  m.ball.place(6, 0); m.ball.state = 'free'; m.ball.setVelocity(new V3(-6, 0, 0));
  m.humanCtl.press('pass'); // intent to play the incoming ball first time
  run(m, 0.3);
  m.humanCtl.press('tackle');
  run(m, 1 / 120);
  assert.equal(m.human.action && m.human.action.type, 'tackle');
  // a second press during the cooldown is held and fires once allowed
  run(m, 0.2);
  m.humanCtl.press('tackle');
  let fired = false; const t0 = m.human.action;
  run(m, 0.45, () => { if (m.human.action && m.human.action.type === 'tackle' && m.human.action !== t0) fired = true; });
  assert.ok(fired, 'buffered tackle fired');
});
test('the human\'s tackle reaches a carrier 2.5 m away and wins the ball', () => {
  let won = 0;
  for (let k = 0; k < 4; k++) {
    const m = scene({ opps: ['ST'] });
    m.rng.s = 100 + k;
    const opp = m.players.find((p) => p.team === 1);
    m.human.pos.set(-12, 0, 0);
    opp.pos.set(0, 0, 0); opp.yaw = -Math.PI / 2;
    m.ball.place(-0.6, 0); m.ball.state = 'free';
    run(m, 0.3);
    assert.equal(m.ball.owner, opp);
    m.human.pos.set(-3.1, 0, 0); m.human.yaw = Math.PI / 2; m.humanCtl.input.yaw = Math.PI / 2;
    m.humanCtl.press('tackle');
    run(m, 1.2);
    if (m.ball.owner === m.human) won++;
  }
  assert.ok(won >= 3, `won ${won}/4`);
});

console.log('Determinism and frame-rate independence');
test('identical results regardless of how frames chunk the fixed steps', () => {
  // the render loop may run 1..12 fixed steps per frame; the simulation must not care
  const sim = (chunk) => {
    const m = makeMatch({ seed: 11, halfLength: 20 });
    m.start(0);
    let steps = 0;
    while (steps < 1440) { const n = Math.min(chunk(steps), 1440 - steps); for (let i = 0; i < n; i++) m.step(DT); steps += n; }
    return JSON.stringify([m.ball.pos, m.players.map((p) => [p.pos.x.toFixed(5), p.pos.z.toFixed(5)])]);
  };
  const a = sim(() => 4), b = sim(() => 1), c = sim((s) => 1 + (s % 7));
  assert.equal(a, b); assert.equal(b, c);
});
test('ball travel matches for 30 fps and 144 fps accumulators', () => {
  const travel = (fps) => {
    const bl = new Ball(); bl.place(0, 0); bl.state = 'free'; bl.setVelocity(new V3(10, 0, 0));
    let acc = 0, t = 0;
    while (t < 2 - 1e-9) { acc += 1 / fps; t += 1 / fps; while (acc >= DT - 1e-12) { stepBall(bl, DT, null); acc -= DT; } }
    return bl.pos.x;
  };
  assert.ok(Math.abs(travel(30) - travel(144)) < 0.1, `${travel(30)} vs ${travel(144)}`);
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
