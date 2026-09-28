// First Touch - application shell: boot, main loop, menus, pause and focus handling.
import css from './ui/styles.css';
import { SceneView } from './render/view.js';
import { AudioSystem } from './audio/audio.js';
import { Input } from './core/input.js';
import { Hud } from './ui/hud.js';
import { MatchSession } from './game/session.js';
import { loadSettings, saveSettings, loadStyle, saveStyle } from './core/settings.js';
import { CLUBS, clubById, tierInfo } from './career/clubs.js';
import { buildTeamConfig, defaultPlayer } from './career/teams.js';
import { resolveKits } from './render/palette.js';
import { HALF_LENGTHS } from './sim/constants.js';
import { Screens } from './ui/screens.js';
import { CareerStore } from './career/save.js';
import { prepareMatch } from './career/career.js';
import { hashString } from './sim/rng.js';

class App {
  constructor() {
    const st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    this.params = new URLSearchParams(location.search);
    this.settings = loadSettings();
    this.canvas = document.getElementById('game');
    this.uiRoot = document.getElementById('ui');
    this.view = new SceneView(this.canvas, { quality: this.settings.quality, preserve: this.params.has('preserve') });
    this.view.setQuality(this.settings.quality);
    this.style = this.params.get('style') || loadStyle();
    this.view.setStyle(this.style);
    this.audio = new AudioSystem();
    this.audio.setVolumes({ master: this.settings.master, sfx: this.settings.sfx, crowd: this.settings.crowd });
    this.input = new Input(this.canvas);
    this.input.sensitivity = this.settings.sensitivity;
    this.input.invertY = this.settings.invertY;
    this.hud = new Hud(this.uiRoot);
    this.store = new CareerStore();
    this.screens = new Screens(this);
    this.session = null;
    this.menuSession = null;
    this.paused = false;
    this.last = performance.now();
    this.fpsCap = Number(this.params.get('fps') || 0);
    this.frameAcc = 0;

    this.input.onPause = () => this.togglePause();
    this.input.onLockLost = () => { if (this.session && !this.paused) this.pause(); };
    this.input.onLockError = () => { if (this.session && this.paused) this.screens.lockRefused(); };
    document.addEventListener('visibilitychange', () => { if (document.hidden) this.onBlur(); else this.onFocus(); });
    window.addEventListener('blur', () => this.onBlur());
    window.addEventListener('focus', () => this.onFocus());
    window.addEventListener('resize', () => this.view.resize());
    // first user gesture unlocks audio
    const unlock = () => { this.audio.init(); this.audio.resume(); };
    window.addEventListener('pointerdown', unlock, { capture: true });
    window.addEventListener('keydown', unlock, { capture: true });

    document.getElementById('boot')?.remove();
    this.startMenuBackground();
    this.screens.mainMenu();
    requestAnimationFrame((t) => this.loop(t));
    window.__ft = this;
    const auto = this.params.get('auto');
    if (auto) setTimeout(() => this.autostart(auto), 50);
  }

  autostart(kind) {
    if (kind === 'quick') this.startQuickMatch({ home: this.params.get('home') || 'millbrook', away: this.params.get('away') || 'ashford', role: this.params.get('role') || 'ST', venue: this.params.get('venue') });
    else if (kind === 'practice') this.startTraining('practice');
    else if (kind.startsWith('drill:')) this.startTraining(kind.slice(6));
    else if (kind === 'hub') this.screens.hub();
  }

  // ------------------------------------------------------------------ loop
  loop(t) {
    requestAnimationFrame((tt) => this.loop(tt));
    let dt = (t - this.last) / 1000;
    if (this.fpsCap) {
      // test hook: emulate a lower frame rate
      this.frameAcc += dt;
      this.last = t;
      if (this.frameAcc < 1 / this.fpsCap) return;
      dt = this.frameAcc;
      this.frameAcc = 0;
    } else this.last = t;
    dt = Math.min(dt, 0.1);
    const s = this.session || this.menuSession;
    if (s) s.frame(this.paused && this.session ? 0 : dt);
    if (this.onFrame) this.onFrame(dt);
  }

  // --------------------------------------------------------- background
  startMenuBackground(venue = 'town') {
    if (this.menuSession) return;
    const home = clubById('oldbridge'), away = clubById('fenwick');
    const kits = resolveKits(home, away);
    const cfg = {
      mode: 'menu', venue, venueOpts: { homeName: home.name },
      colours: { kits, human: defaultPlayer().look },
      match: { seed: 99, halfLength: 100000, difficulty: 'standard', teams: [buildTeamConfig(home), buildTeamConfig(away)] },
    };
    this.menuSession = new MatchSession(this, cfg);
    this.menuSession.cam.radius = 60; this.menuSession.cam.height = 24;
    this.menuSession.start();
  }
  stopMenuBackground() {
    if (this.menuSession) { this.menuSession.dispose(); this.menuSession = null; }
  }

  // ------------------------------------------------------------ matches
  matchConfig({ homeClub, awayClub, human, humanSide = 0, seed = 1, halfLength, difficulty, strengths }) {
    const kits = resolveKits(homeClub, awayClub);
    const hT = buildTeamConfig(homeClub, { human: humanSide === 0 ? human : null, strength: strengths && strengths[0] });
    const aT = buildTeamConfig(awayClub, { human: humanSide === 1 ? human : null, strength: strengths && strengths[1] });
    return {
      kits,
      match: { seed, halfLength: halfLength || HALF_LENGTHS[this.settings.matchLength] || 180, difficulty: difficulty || this.settings.difficulty, teams: [hT, aT] },
    };
  }

  startSession(cfg) {
    this.stopMenuBackground();
    if (this.session) this.session.dispose();
    this.screens.clear();
    this.session = new MatchSession(this, cfg);
    this.hud.show(true);
    this.session.start();
    // wait for a click so pointer lock can be requested inside a user gesture
    this.paused = true;
    this.session.setPaused(true);
    this.input.active = true;
    this.screens.clickToPlay();
    return this.session;
  }

  endSession() {
    if (this.session) this.session.dispose();
    this.session = null;
    this.paused = false;
    this.input.active = false;
    this.input.exitLock();
    this.hud.show(false);
    this.startMenuBackground();
  }

  startQuickMatch(o) {
    const home = clubById(o.home) || CLUBS[0], away = clubById(o.away) || CLUBS[1];
    const career = this.store.career;
    const human = { ...(career ? career.player : defaultPlayer()) };
    if (o.role) human.role = o.role;
    const side = o.side || 0;
    const c = this.matchConfig({ homeClub: home, awayClub: away, human, humanSide: side, seed: (Date.now() & 0xffff) + 1, halfLength: o.halfLength });
    // every tier plays at the home club's stadium
    const venue = o.venue || tierInfo(home.tier).venue;
    return this.startSession({
      mode: 'quick', venue, venueOpts: { homeName: home.name },
      colours: { kits: c.kits, human: human.look }, match: c.match,
      onEnd: (s) => this.screens.report(s, { quick: true }),
    });
  }

  startTraining(kind) {
    return this.screens.startDrill(kind);
  }

  playCareerMatch() {
    const c = this.store.career;
    const prep = prepareMatch(c);
    if (!prep) return;
    const fx = prep.fx;
    const home = clubById(fx.home), away = clubById(fx.away);
    const side = fx.home === c.clubId ? 0 : 1;
    const human = { ...c.player };
    const cfg = this.matchConfig({ homeClub: home, awayClub: away, human, humanSide: side, seed: hashString(`${c.seed}:${c.seasonNo}:${fx.round}:${prep.id}`) });
    const venue = fx.final ? 'continental' : tierInfo(home.tier).venue;
    const matchId = prep.id;
    return this.startSession({
      mode: 'career', venue, venueOpts: { homeName: home.name, final: !!fx.final },
      colours: { kits: cfg.kits, human: human.look }, match: cfg.match,
      onEnd: (s) => this.screens.report(s, { career: true, matchId, fx, title: fx.final ? 'Continental Cup Final' : `Round ${fx.round} report` }),
    });
  }

  // -------------------------------------------------------------- pause
  togglePause() {
    if (!this.session) { this.screens.back(); return; }
    if (this.paused) this.resume(); else this.pause();
  }
  pause() {
    if (!this.session || this.session.ended) return;
    this.paused = true;
    this.session.setPaused(true);
    this.input.releaseAll();
    this.input.exitLock();
    this.audio.suspend();
    this.screens.pauseMenu();
  }
  // called from a click handler (user gesture) so pointer lock can be requested
  resume() {
    if (!this.session) return;
    this.screens.clear();
    this.paused = false;
    this.session.setPaused(false);
    this.audio.resume();
    this.input.active = true;
    this.input.requestLock();
  }
  onBlur() {
    this.audio.setMuted(true);
    if (this.session && !this.paused && !this.session.ended) this.pause();
  }
  onFocus() { this.audio.setMuted(false); if (this.paused) this.audio.suspend(); }

  // ------------------------------------------------------------ settings
  applySettings() {
    const s = this.settings;
    this.input.sensitivity = s.sensitivity;
    this.input.invertY = s.invertY;
    this.audio.setVolumes({ master: s.master, sfx: s.sfx, crowd: s.crowd });
    if (this.view.quality !== s.quality) {
      this.view.setQuality(s.quality);
      this.view.venueKey = null;
      const cur = this.session || this.menuSession;
      if (cur) this.view.setVenue(cur.cfg.venue, cur.cfg.venueOpts || {});
    }
    if (!saveSettings(s)) this.screens.toast('Settings could not be saved (storage unavailable).', true);
  }
  setStyle(name) {
    this.style = name;
    this.view.setStyle(name);
    saveStyle(name);
  }
}

function boot() {
  try {
    new App();
  } catch (e) {
    console.error(e);
    const b = document.getElementById('boot');
    if (b) b.textContent = 'First Touch could not start: ' + e.message + ' (a browser with WebGL2 is required).';
  }
}
if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', boot); else boot();
