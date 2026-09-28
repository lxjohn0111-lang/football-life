// A live match (or drill) wired to the view, input, HUD and audio.
// Fixed-timestep simulation with interpolated rendering.
import { Match } from '../sim/match.js';
import { HumanController } from '../sim/human.js';
import { DT, PITCH } from '../sim/constants.js';
import { VENUES } from '../render/venues.js';

const MAX_STEPS = 12;

export class MatchSession {
  constructor(app, cfg) {
    this.app = app;
    this.cfg = cfg;
    this.view = app.view;
    this.audio = app.audio;
    this.hud = app.hud;
    this.input = app.input;
    this.match = cfg.matchObject || new Match(cfg.match);
    const m = this.match;
    this.human = m.human;
    if (this.human) {
      this.ctl = new HumanController(m, this.human);
      m.humanCtl = this.ctl;
    }
    this.cam = { mode: this.human ? 'fp' : 'orbit', yaw: 0, pitch: -0.14, eye: 1.65, fov: app.settings.fov, bob: app.settings.bob ? 1 : 0, shake: app.settings.shake ? 1 : 0, angle: 0, radius: 58, height: 26 };
    this.acc = 0;
    this.paused = false;
    this.ended = false;
    this.excite = 0;
    this.slideEye = 0;
    this.unsubs = [];
    this.kitA = cfg.colours ? cfg.colours.kits[0].shirt : '#c00';
    this.kitB = cfg.colours ? cfg.colours.kits[1].shirt : '#00c';
    this.view.setVenue(cfg.venue || 'community', cfg.venueOpts || {});
    this.view.setMatch(m, cfg.colours);
    this.view.localPlayer = this.human;
    this.view.firstPerson = !!this.human;
    this.hookEvents();
    if (this.human) {
      this.unsubs.push(this.input.on((type, down) => {
        if (this.paused || !this.ctl) return;
        if (down) this.ctl.press(type); else this.ctl.release(type);
      }));
    }
  }

  start() {
    const m = this.match;
    if (this.cfg.kickoffTeam != null) m.start(this.cfg.kickoffTeam); else if (!this.cfg.noStart) m.start();
    if (this.human) this.cam.yaw = this.human.yaw;
    const loud = (VENUES[this.cfg.venue] || VENUES.community).loud;
    if (this.cfg.mode !== 'menu') this.audio.startCrowd(0.25 + loud * 0.75);
  }

  hookEvents() {
    const m = this.match, ev = m.events, a = this.audio, v = this.view;
    const on = (t, f) => this.unsubs.push(ev.on(t, f));
    const menu = this.cfg.mode === 'menu';
    const spatial = (pos, base = 1) => {
      if (menu) return { gain: 0 };
      const c = v.camera.position;
      const dx = pos.x - c.x, dz = pos.z - c.z;
      const d = Math.hypot(dx, dz);
      const yaw = this.cam.yaw;
      const right = -Math.cos(yaw) * dx + Math.sin(yaw) * dz;
      return { gain: base / (1 + d * 0.045), pan: right / (d + 3) };
    };
    on('kick', (e) => {
      const sp = spatial(e.pos, 1);
      if (e.kind === 'shot') { a.play('shot', { ...sp, gain: sp.gain * Math.min(1.2, 0.55 + e.speed / 40) }); if (e.player === this.human) v.shake = 1; this.excite = Math.max(this.excite, 0.7); }
      else if (e.kind === 'throw') a.play('touch', { ...sp, gain: sp.gain * 0.3 });
      else a.play('pass', { ...sp, gain: sp.gain * Math.min(1, 0.4 + e.speed / 30), rate: 0.95 + Math.random() * 0.1 });
      if (e.restart === 'kickoff') a.play('whistle', { gain: menu ? 0 : 0.8 });
    });
    on('touch', (e) => a.play('touch', { ...spatial(e.player.pos, e.kind === 'receive' ? 0.8 : 0.55), rate: 0.9 + Math.random() * 0.2 }));
    on('deflect', (e) => a.play('bounce', spatial(e.player.pos, Math.min(1, e.speed / 10))));
    on('bounce', (e) => { if (e.speed > 2) a.play('bounce', spatial(m.ball.pos, Math.min(0.6, e.speed / 16))); });
    on('frame', (e) => { a.play('post', spatial(m.ball.pos, Math.min(1, e.speed / 18))); a.play('groan', { group: 'crowd', gain: menu ? 0 : 0.7 }); this.excite = 1; });
    on('save', (e) => { a.play(e.caught ? 'catch' : 'bounce', spatial(e.player.pos, 1)); if (e.shot && e.shot.onTarget) a.play('groan', { group: 'crowd', gain: menu ? 0 : 0.5 }); });
    on('tackle', (e) => a.play('tackle', spatial(e.player.pos, 0.9)));
    on('slide', (e) => a.play('slide', spatial(e.player.pos, 0.8)));
    on('foul', (e) => { a.play('whistle', { gain: menu ? 0 : 0.9 }); if (e.victim === this.human || e.player === this.human) this.hud.notify(e.player === this.human ? 'FOUL' : 'FOULED', 'bad'); if (e.penalty && !menu) this.hud.showBanner('PENALTY', '', 1800); });
    on('halftime', () => { a.play('whistleLong', { gain: menu ? 0 : 0.9 }); if (!menu) this.hud.showBanner('HALF TIME', `${m.teams[0].short} ${m.scoreline[0]} - ${m.scoreline[1]} ${m.teams[1].short}`, 3000); });
    on('fulltime', () => {
      a.play('whistleLong', { gain: menu ? 0 : 0.9 });
      if (menu) return;
      const [x, y] = m.scoreline;
      const won = this.human && (this.human.team === 0 ? x > y : y > x);
      if (this.cfg.final && won) {
        // trophy presentation for the Continental Cup final
        this.hud.showBanner('CHAMPIONS', `${this.cfg.final} winners!`, 6000, 'mine');
        a.play('cheer', { group: 'crowd', gain: 1 });
        v.crowdLevel = 1;
        for (let i = 0; i < 3; i++) setTimeout(() => v.celebrate((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, this.human.team, 1.4), i * 500);
      } else this.hud.showBanner('FULL TIME', `${m.teams[0].short} ${x} - ${y} ${m.teams[1].short}`, 4000);
    });
    on('snap', () => { if (!menu) this.hud.flashFade(); });
    on('humanYaw', (e) => { this.cam.yaw = e.yaw; this.cam.pitch = -0.14; });
    on('request', () => a.play('shout', { gain: 0.5 }));
    on('ack', (e) => { a.play('ack', { gain: 0.6 }); this.ackPlayer = e.player; this.ackUntil = m.time + 1.2; });
    on('goal', (e) => {
      a.play('net', spatial(e.pos, 1));
      if (!menu) a.play('cheer', { group: 'crowd', gain: 1 });
      this.excite = 1;
      v.crowdLevel = 1;
      v.celebrate(e.pos.x, e.pos.z, e.team, 1);
      if (!menu) {
        const who = e.ownGoal ? `Own goal (${e.ownGoalBy ? e.ownGoalBy.name : ''})` : e.scorer ? `${e.scorer.name}${e.assist ? ` · assist ${e.assist.name}` : ''}` : '';
        const mine = this.human && e.scorer === this.human;
        this.hud.showBanner(mine ? 'GOAL!' : 'GOAL', `${m.teams[0].short} ${m.scoreline[0]} - ${m.scoreline[1]} ${m.teams[1].short} · ${who}`, 2600, mine ? 'mine' : '');
      }
    });
    on('credit', (e) => {
      if (e.player !== this.human || menu) return;
      const map = { passCompleted: ['PASS COMPLETED', ''], assist: ['ASSIST', 'good'], tackleWon: ['TACKLE WON', 'good'], interception: ['INTERCEPTION', 'good'], possessionLost: ['POSSESSION LOST', 'bad'], shotSaved: ['SHOT SAVED', ''] };
      const n = map[e.kind];
      if (n) this.hud.notify(n[0], n[1]);
    });
    on('goal', (e) => { if (!menu && this.human && e.scorer === this.human) this.hud.notify('GOAL', 'good'); });
  }

  // one rendered frame
  frame(dtReal) {
    const m = this.match;
    if (!this.paused && !this.ended) {
      if (this.human && this.ctl) {
        const ax = this.input.axes();
        this.input.consumeLook(this.cam, dtReal);
        const ci = this.ctl.input;
        ci.moveF = ax.f; ci.moveR = ax.r; ci.sprint = ax.sprint;
        ci.yaw = this.cam.yaw; ci.pitch = this.cam.pitch;
        const held = this.input.held;
        ci.lmb = held.lmb; ci.rmb = held.rmb;
      }
      this.acc += Math.min(dtReal, 0.1) * (this.cfg.timeScale || 1);
      let n = 0;
      while (this.acc >= DT && n < MAX_STEPS) { m.step(DT); this.acc -= DT; n++; if (this.cfg.onStep) this.cfg.onStep(m); }
      if (n >= MAX_STEPS) this.acc = 0;
      if (m.phase === 'fulltime' && !this.ended && m.phaseT > (this.cfg.mode === 'menu' ? 0 : 2.5)) {
        this.ended = true;
        if (this.cfg.onEnd) this.cfg.onEnd(this);
      }
    }
    const alpha = this.paused ? 1 : this.acc / DT;
    // atmosphere: crowd follows danger near the goals
    const b = m.ball.pos;
    const near = Math.max(0, 1 - Math.min(Math.abs(b.x - PITCH.HL), Math.abs(b.x + PITCH.HL)) / 24);
    this.excite = Math.max(near * 0.45, this.excite - dtReal * 0.25);
    if (this.cfg.mode !== 'menu') this.audio.setExcitement(this.excite);
    // camera eye height (slides lower the view smoothly)
    if (this.human) {
      const a = this.human.action;
      const target = a && a.type === 'slide' ? (a.t < 0.7 ? 0.72 : 1.65) : m.time < this.human.downUntil ? 0.6 : 1.65;
      this.cam.eye += (target - this.cam.eye) * (1 - Math.exp(-dtReal * 9));
    } else {
      this.cam.angle += dtReal * 0.05;
    }
    this.cam.fov = this.app.settings.fov;
    this.cam.bob = this.app.settings.bob ? 1 : 0;
    this.cam.shake = this.app.settings.shake ? 1 : 0;
    const cam = this.app.debugCam ? { mode: 'free', pos: this.app.debugCam.pos, look: this.app.debugCam.look, fov: this.cam.fov } : this.cam;
    this.view.render(alpha, dtReal, cam, { crowd: this.excite * 0.5 });
    this.updateMarkers();
    if (this.cfg.mode !== 'menu') this.hud.update(this.hudState());
  }

  updateMarkers() {
    const mk = this.view.markers, m = this.match;
    mk.hideAll();
    if (!this.ctl || this.cfg.mode === 'menu') return;
    const t = this.ctl.passTarget;
    if (t && this.ctl.targetVisible) mk.showRing(t.pos.x, t.pos.z, m.time);
    if (this.ackPlayer && m.time < this.ackUntil) mk.showAck(this.ackPlayer.pos.x, 2.25, this.ackPlayer.pos.z, m.time);
    const pi = m.passIntent;
    if (pi && pi.target === this.human && pi.point && !m.ball.owner) mk.showIncoming(pi.point.x, pi.point.z);
  }

  hudState() {
    const m = this.match, h = this.human;
    let hint = '';
    if (h) {
      const r = m.restart;
      if (m.phase === 'restart' && r && r.taker === h) {
        hint = r.type === 'throwin' ? 'Throw-in: RMB/Space short throw · LMB long throw'
          : r.type === 'corner' ? 'Corner: LMB cross to where you aim · RMB short pass'
            : r.type === 'penalty' ? 'Penalty: aim and hold LMB, release to shoot'
              : r.type === 'kickoff' ? 'Kick-off: RMB pass to a teammate'
                : 'Free kick: RMB pass · Space through ball · LMB shoot';
      } else if (m.phase === 'goal' || m.phase === 'halftime') hint = 'Press any action to skip';
      else if (m.ball.owner === h) hint = 'LMB shoot · RMB pass · Space through ball';
      else if (m.ball.owner && m.ball.owner.team !== h.team) hint = m.ball.owner.pos.distXZ(h.pos) < 3 ? 'E tackle · C slide' : '';
      else if (m.ball.owner && m.ball.owner.team === h.team) hint = h.requestUntil > m.time ? 'Pass requested' : 'Space: call for the ball';
    }
    const it = this.ctl && this.ctl.intent;
    return {
      match: m, camera: this.view.camera, view: this.view, camYaw: this.cam.yaw, style: this.view.style,
      kitA: this.kitA, kitB: this.kitB, hint,
      intentCharge: it && it.kind === 'shot' ? it.charge : 0,
      phaseText: m.phase === 'halftime' ? 'HALF TIME' : m.phase === 'fulltime' ? 'FULL TIME' : m.half === 2 ? '2ND HALF' : '1ST HALF',
      clockText: this.cfg.clockText ? this.cfg.clockText(m) : undefined,
      noArrow: this.cfg.noArrow,
    };
  }

  setPaused(p) {
    this.paused = p;
    if (this.ctl && p) { this.ctl.buffer.length = 0; }
  }

  dispose() {
    for (const u of this.unsubs) u();
    this.unsubs = [];
    this.audio.stopCrowd();
    this.view.markers.hideAll();
  }
}
