// First Touch - application shell: boot, main loop, menus, pause and focus handling.
import css from './ui/styles.css';
import { SceneView } from './render/view.js';
import { AudioSystem } from './audio/audio.js';
import { Input } from './core/input.js';
import { Hud } from './ui/hud.js';
import { TouchControls } from './ui/touch.js';
import { MatchSession } from './game/session.js';
import { loadSettings, saveSettings, loadStyle, saveStyle, hasSavedSettings } from './core/settings.js';
import { CLUBS, clubById, tierInfo } from './career/clubs.js';
import { buildTeamConfig, defaultPlayer } from './career/teams.js';
import { resolveKits } from './render/palette.js';
import { HALF_LENGTHS } from './sim/constants.js';
import { Screens } from './ui/screens.js';
import { CareerStore } from './career/save.js';
import { prepareMatch } from './career/career.js';
import { hashString } from './sim/rng.js';
import { tutorialSeen } from './game/tutorial.js';
import { platform } from './platform/crazygames.js';

class App {
  constructor() {
    const st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    this.params = new URLSearchParams(location.search);
    // phones and tablets: touch controls, a lighter default quality and a higher look sensitivity on first run
    this.coarse = !!(window.matchMedia && matchMedia('(pointer: coarse)').matches);
    this.settings = loadSettings(this.coarse);
    if (this.coarse && !hasSavedSettings()) this.settings.quality = 'medium';
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
    this.touch = new TouchControls(this, this.uiRoot);
    this.setTouchMode(this.settings.touch === 'on' || (this.settings.touch !== 'off' && this.coarse));
    // switch automatically between touch and mouse as the player changes device
    window.addEventListener('pointerdown', (e) => {
      if (this.settings.touch !== 'auto') return;
      if (e.pointerType === 'touch' && !this.input.touchMode) this.setTouchMode(true);
      else if (e.pointerType === 'mouse' && this.input.touchMode && !this.input.fromTouch(e)) this.setTouchMode(false);
    }, true);
    this.store = new CareerStore();
    // CrazyGames: the career plays under the account's username (or the guest name),
    // also when the player logs in or out during the session
    this.syncPlayerName();
    platform.onName(() => { this.syncPlayerName(); if (this.screens && this.screens.current === 'hub' && !this.session) this.screens.hub(); });
    this.screens = new Screens(this);
    this.session = null;
    this.menuSession = null;
    this.paused = false;
    this.last = performance.now();
    this.fpsCap = Number(this.params.get('fps') || 0);
    this.frameAcc = 0;
    // adaptive resolution (off under automated browsers unless asked for, so test
    // screenshots stay at a fixed resolution)
    this.adapt = { on: this.params.has('adapt') || (!navigator.webdriver && !this.fpsCap), ema: 1 / 60, scale: 1, floor: 0.5, low: 0, high: 0, check: null };

    this.input.onPause = () => this.togglePause();
    this.input.onToggleLock = () => this.toggleLock();
    // Enter skips the tutorial (its Skip button can't be clicked while the mouse is captured)
    this.input.onSkip = () => { if (this.session && this.session.tutorial && !this.paused) this.screens.skipTutorial(); };
    // a click on the game while playing without the mouse captured captures it
    this.canvas.addEventListener('click', () => {
      if (this.session && !this.paused && this.input.active && !this.input.touchMode && !this.input.locked && !this.input.dragMode) this.input.requestLock();
    });
    // losing the mouse because the window lost focus is not the player taking a break
    // Esc (the browser's key for freeing the mouse and leaving fullscreen) never opens the
    // pause menu: the match just waits for a click; losing the window is a real pause
    this.input.onLockLost = () => { if (this.session && !this.paused) this.pause(document.hasFocus() ? 'lock' : 'blur'); };
    this.input.onLockGained = () => { this.lockFails = 0; if (this.session && this.awaitingLock) this.unpause(); };
    this.input.onLockError = () => { if (this.session && this.awaitingLock) this.lockFailed(); };
    document.addEventListener('visibilitychange', () => { if (document.hidden) this.onBlur(); else this.onFocus(); });
    window.addEventListener('blur', () => this.onBlur());
    window.addEventListener('focus', () => this.onFocus());
    window.addEventListener('resize', () => this.view.resize());
    // first user gesture unlocks audio (mobile browsers only accept the end of a tap)
    const unlock = () => { this.audio.init(); if (!this.paused || !this.session) this.audio.resume(); };
    for (const t of ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown']) window.addEventListener(t, unlock, { capture: true });
    // no pinch-zoom of the game page on iOS
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    // no browser context menu anywhere in the game (text fields keep theirs)
    document.addEventListener('contextmenu', (e) => { if (!(e.target.closest && e.target.closest('input'))) e.preventDefault(); });
    // the hosting platform's mute setting (and its ads) silence the game
    this.platform = platform;
    platform.onMute((m) => this.audio.setPlatformMute(m));
    platform.onAd((on) => this.onAd(on));

    document.getElementById('boot')?.remove();
    const auto = this.params.get('auto');
    // first visit: Coach Ada's warm-up instead of the menu (automated test browsers opt in with ?tutorial)
    // it starts straight away: no welcome card, just play (a Skip button is on the coach card)
    const firstRun = !auto && !tutorialSeen() && (!navigator.webdriver || this.params.has('tutorial'));
    if (firstRun) this.screens.startTutorial({ first: true });
    else { this.startMenuBackground(); this.screens.mainMenu(); }
    requestAnimationFrame((t) => this.loop(t));
    window.__ft = this;
    // test hook: advance the live simulation deterministically by n fixed steps
    this.debugStep = (n) => { const m = (this.session || this.menuSession).match; for (let i = 0; i < n; i++) m.step(1 / 120); };
    if (auto) setTimeout(() => this.autostart(auto), 50);
  }

  autostart(kind) {
    const half = this.params.get('half') ? Number(this.params.get('half')) : undefined;
    if (half) this.testHalf = half;
    if (kind === 'quick') this.startQuickMatch({ home: this.params.get('home') || 'swindon', away: this.params.get('away') || 'chesterfield', role: this.params.get('role') || 'ST', venue: this.params.get('venue'), halfLength: half });
    else if (kind === 'practice') this.startTraining('practice');
    else if (kind === 'tutorial') this.screens.startTutorial();
    else if (kind.startsWith('drill:')) this.startTraining(kind.slice(6));
    else if (kind === 'hub') this.screens.hub();
  }

  // ------------------------------------------------------------------ loop
  loop(t) {
    requestAnimationFrame((tt) => this.loop(tt));
    let dt = (t - this.last) / 1000;
    this.adaptResolution(dt);
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
    if (this.countdown && !this.paused) this.tickCountdown(dt);
    if (s) s.frame((this.paused || this.adHold || this.countdown) && this.session ? 0 : dt);
    this.updateLockHint();
    const playing = !!(this.session && this.session.human && !this.paused && !this.session.ended && !this.session.replay);
    this.touch.setVisible(this.input.touchMode && playing);
    if (this.touch.visible) this.touch.update(this.session);
    this.updatePlatform();
    if (this.onFrame) this.onFrame(dt);
  }

  // the platform hears when real play starts and stops: any pause (the menu, a lost
  // focus, the freed cursor, an ad) is a stop, and play resuming is a start
  updatePlatform() {
    platform.setGameplay(!!this.session && !this.session.ended && !this.adHold && !this.paused);
  }

  // a video ad started or ended: play stops while it runs (it needs the mouse), and on
  // a computer one click captures the mouse again afterwards
  onAd(on) {
    if (on) {
      if (this.session && !this.session.ended && !this.paused) {
        this.pausedForAd = true;
        this.paused = true;
        this.session.setPaused(true);
        this.input.releaseAll();
        this.touch.setVisible(false);
        this.input.exitLock();
        this.screens.clear();
      }
      return;
    }
    if (!this.pausedForAd) return;
    this.pausedForAd = false;
    if (!this.session || this.session.ended) return;
    // play goes on by itself after the ad (no click needed): a short countdown into the
    // second half; on a computer a click on the game captures the mouse again
    this.unpause();
    this.startCountdown(this.session.match.phase === 'halftime' ? 'Second half' : 'Back to the game');
  }

  // "SECOND HALF · 3 · 2 · 1 · GO!" over a frozen match, then play starts
  startCountdown(title) {
    const m = this.session.match;
    // the teams line up for the second-half kick-off now, so the countdown shows them ready
    if (m.phase === 'halftime') { m.requestSkip(); m.phaseT = Math.max(m.phaseT, 0.6); m.step(1 / 120); }
    this.countdown = { t: 0, dur: 2.4, last: '3' };
    this.hud.bannerUntil = 0; // the HALF TIME banner makes way
    this.hud.root.classList.add('counting');
    this.hud.showCountdown(title, '3');
    this.audio.play('uiClick', { gain: 0.35 });
  }
  // 3 · 2 · 1 with the match frozen, then GO! as play starts (GO! stays a moment)
  tickCountdown(dt) {
    const c = this.countdown;
    c.t += dt;
    const left = c.dur - c.t;
    if (left <= 0) {
      this.countdown = null;
      this.hud.showCountdown(null, 'GO!');
      this.audio.play('whistle', { gain: 0.5 });
      clearTimeout(this.goTimer);
      this.goTimer = setTimeout(() => { this.hud.endCountdown(); this.hud.root.classList.remove('counting'); }, 750);
      return;
    }
    const label = left > 1.6 ? '3' : left > 0.8 ? '2' : '1';
    if (label !== c.last) {
      c.last = label;
      this.hud.showCountdown(null, label);
      this.audio.play('uiClick', { gain: 0.35 });
    }
  }

  // playing without the mouse captured (after an ad): a hint that one click captures it;
  // in drag-to-look, a reminder that Tab captures it
  updateLockHint() {
    const show = !!(this.session && !this.paused && !this.countdown && !this.hud.root.classList.contains('counting') && !this.session.ended && this.session.cfg.mode !== 'tutorial' && this.session.human
      && this.input.active && !this.input.touchMode && !this.input.locked && !this.input.dragMode);
    if (!this.lockHint && show) {
      this.lockHint = document.createElement('div');
      this.lockHint.className = 'tut-click';
      this.lockHint.innerHTML = 'Click to take control<small>the mouse looks and aims</small>';
      this.uiRoot.appendChild(this.lockHint);
    }
    if (this.lockHint) this.lockHint.hidden = !show;
    // drag-to-look: a small reminder that Tab captures the cursor again
    const drag = !!(this.session && !this.paused && !this.session.ended && this.session.human && this.input.active && !this.input.touchMode && !this.input.locked && this.input.dragMode);
    if (!this.dragHint && drag) {
      this.dragHint = document.createElement('div');
      this.dragHint.className = 'drag-hint';
      this.dragHint.textContent = 'Drag to look · Tab captures the cursor';
      this.uiRoot.appendChild(this.dragHint);
    }
    if (this.dragHint) this.dragHint.hidden = !drag;
  }

  // half time is a natural break: a midgame ad if the platform has one (the match
  // waits for the answer; without an ad it simply goes on)
  halftimeBreak(session) {
    if (!platform.active || this.session !== session) return;
    this.adHold = true;
    platform.midgameAd(() => { this.adHold = false; });
  }

  // Keeps matches smooth on weaker devices: if frames stay slow the render
  // resolution steps down (to half at most); with headroom it steps back up. If a
  // step down doesn't help (e.g. a phone capped at 30 fps) it is undone and the
  // resolution is not lowered that far again for the next 30 seconds.
  adaptResolution(dt) {
    const a = this.adapt;
    if (!a.on || dt <= 0 || dt > 0.5) return;
    const active = !!(this.session && !this.paused && !document.hidden);
    if (!active) { a.low = 0; a.high = 0; a.check = null; return; }
    a.ema += (dt - a.ema) * 0.06;
    a.floorT = (a.floorT || 0) + dt;
    if (a.floor > 0.5 && a.floorT > 30) a.floor = 0.5;
    if (a.check) {
      a.check.t += dt;
      if (a.check.t > 2) {
        if (a.ema > a.check.before * 0.92) { a.floor = a.check.prev; a.floorT = 0; a.scale = a.check.prev; this.view.setResolutionScale(a.scale); }
        a.check = null;
      }
      return;
    }
    if (a.ema > 1 / 42) { a.low += dt; a.high = 0; } else if (a.ema < 1 / 56) { a.high += dt; a.low = 0; } else { a.low = 0; a.high = 0; }
    if (a.low > 1.5 && a.scale > a.floor + 0.01) {
      const prev = a.scale;
      a.scale = Math.max(a.floor, a.scale * 0.85);
      this.view.setResolutionScale(a.scale);
      a.check = { before: a.ema, prev, t: 0 };
      a.low = 0;
    } else if (a.high > 6 && a.scale < 1) {
      a.scale = Math.min(1, a.scale * 1.12);
      this.view.setResolutionScale(a.scale);
      a.high = 0;
    }
  }

  syncPlayerName() {
    const name = platform.lockedName, c = this.store.career;
    if (!name || !c || c.player.name === name) return;
    c.player.name = name;
    this.store.save();
  }

  setTouchMode(on) {
    this.input.touchMode = on;
    document.documentElement.dataset.touch = on ? '1' : '0';
    if (!on) this.touch.setVisible(false);
  }

  // phones: go fullscreen and landscape when play starts (best effort; many
  // browsers and embedded views refuse, and the game works either way)
  tryFullscreen() {
    // on CrazyGames the platform has its own fullscreen button
    if (!this.input.touchMode || document.fullscreenElement || this.params.has('nofs') || platform.active) return;
    const el = document.documentElement;
    try {
      const r = el.requestFullscreen && el.requestFullscreen({ navigationUI: 'hide' });
      if (r && r.then) r.then(() => { try { const o = screen.orientation && screen.orientation.lock && screen.orientation.lock('landscape'); if (o && o.catch) o.catch(() => {}); } catch (e) { /* not supported */ } }).catch(() => {});
    } catch (e) { /* not supported */ }
  }

  // --------------------------------------------------------- background
  startMenuBackground(venue = 'town') {
    if (this.menuSession) return;
    const home = clubById('bradford'), away = clubById('barnsley');
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
    this.adHold = false;
    this.pausedForAd = false;
    this.countdown = null;
    clearTimeout(this.goTimer);
    this.hud.endCountdown();
    this.hud.root.classList.remove('counting');
    this.session = new MatchSession(this, cfg);
    this.hud.show(true);
    this.session.start();
    if (cfg.mode === 'career' || cfg.mode === 'quick') {
      const s = this.session;
      s.match.events.on('halftime', () => this.halftimeBreak(s));
    }
    this.input.active = true;
    // live: play starts at once (the first click on the game captures the mouse)
    if (cfg.live) {
      this.paused = false;
      this.pausedByBlur = false;
      this.session.setPaused(false);
      return this.session;
    }
    // wait for a click so pointer lock can be requested inside a user gesture
    this.paused = true;
    this.session.setPaused(true);
    this.screens.clickToPlay();
    return this.session;
  }

  endSession() {
    if (this.session) this.session.dispose();
    this.session = null;
    this.paused = false;
    this.adHold = false;
    this.pausedForAd = false;
    this.countdown = null;
    clearTimeout(this.goTimer);
    this.hud.endCountdown();
    this.hud.root.classList.remove('counting');
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
    const seed = this.params.get('seed') ? Number(this.params.get('seed')) : (Date.now() & 0xffff) + 1;
    const c = this.matchConfig({ homeClub: home, awayClub: away, human, humanSide: side, seed, halfLength: o.halfLength });
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
    // a match boost earned with a rewarded ad lifts every attribute for this match only
    const boost = c.boost || 0;
    if (boost) human.attrs = Object.fromEntries(Object.entries(c.player.attrs).map(([k, v]) => [k, Math.min(99, v + boost)]));
    const cfg = this.matchConfig({ homeClub: home, awayClub: away, human, humanSide: side, seed: hashString(`${c.seed}:${c.seasonNo}:${fx.round}:${prep.id}`), halfLength: this.testHalf });
    const venue = fx.final ? 'continental' : tierInfo(home.tier).venue;
    const matchId = prep.id;
    return this.startSession({
      mode: 'career', venue, venueOpts: { homeName: home.name, final: !!fx.final },
      final: fx.final ? fx.name : null, boost,
      title: (fx.final ? `${fx.name}: ${home.name} v ${away.name}` : `${tierInfo(home.tier).league} · Round ${fx.round}: ${home.name} v ${away.name}`) + (boost ? ` · Boost +${boost}` : ''),
      colours: { kits: cfg.kits, human: human.look }, match: cfg.match,
      onEnd: (s) => this.screens.report(s, { career: true, matchId, fx, title: fx.final ? 'Continental Cup Final' : `Round ${fx.round} report` }),
    });
  }

  // -------------------------------------------------------------- pause
  // P (the game never uses Esc: browsers use it to free the mouse and leave fullscreen)
  togglePause() {
    if (!this.session || this.session.ended || this.pausedForAd || platform.adPlaying) return;
    // on a "click to play / continue" card P opens the menu
    if (this.paused && this.screens.current === 'click') { this.screens.pauseMenu(); return; }
    if (this.paused) this.resume(); else this.pause();
  }
  pause(reason = 'user') {
    if (!this.session || this.session.ended) return;
    this.pausedForAd = false;
    this.paused = true;
    this.pausedByBlur = reason === 'blur';
    this.session.setPaused(true);
    this.input.releaseAll();
    this.touch.setVisible(false);
    this.input.exitLock();
    this.audio.suspend();
    if (reason === 'lock') this.screens.clickToPlay({ resume: true });
    else this.screens.pauseMenu();
  }
  // called from a click handler (user gesture) so pointer lock can be requested
  resume() {
    if (!this.session) return;
    this.input.active = true;
    // touch screens have no pointer lock: the on-screen controls take over
    if (this.input.touchMode) { this.tryFullscreen(); this.unpause(); return; }
    if (this.input.locked) { this.unpause(); return; }
    // drag-look the player chose (or a browser without pointer lock) carries on as it is;
    // Tab captures the cursor from there
    if (this.input.dragMode) { this.unpause(); return; }
    // stay paused until the browser actually grants pointer lock
    this.screens.clear();
    this.awaitingLock = true;
    this.requestLockSoon();
  }
  // browsers refuse to capture the cursor again for about a second after Esc freed it:
  // within that second the request waits (the click's permission lasts long enough)
  requestLockSoon() {
    clearTimeout(this.lockDelay);
    clearTimeout(this.lockTimer);
    const wait = Math.max(0, this.input.lastLockExit + 1150 - performance.now());
    const go = () => {
      if (!this.input.requestLock()) { this.awaitingLock = false; this.input.dragMode = true; this.unpause(); return; }
      this.lockTimer = setTimeout(() => { if (this.awaitingLock && !this.input.locked) this.lockFailed(); }, 1500);
    };
    if (wait > 0) this.lockDelay = setTimeout(go, wait); else go();
  }
  // the cursor wasn't captured: no warning, just ask for another click (after two misses
  // drag-to-look is offered too)
  lockFailed() {
    this.awaitingLock = false;
    clearTimeout(this.lockTimer);
    this.lockFails = (this.lockFails || 0) + 1;
    if (this.session && this.paused) this.screens.clickToPlay({ resume: true, retry: this.lockFails });
  }
  // Tab: free the cursor (the match waits) or capture it again (also out of drag-look)
  toggleLock() {
    if (!this.session || this.session.ended || this.input.touchMode || this.pausedForAd || platform.adPlaying) return;
    if (this.input.locked) { this.pause('lock'); return; }
    this.input.dragMode = false;
    if (this.paused) { this.resume(); return; }
    this.awaitingLock = false;
    this.requestLockSoon();
  }
  unpause() {
    this.awaitingLock = false;
    this.pausedByBlur = false;
    this.commitSettings();
    this.screens.clear();
    this.paused = false;
    if (this.session) this.session.setPaused(false);
    this.audio.resume();
  }
  onBlur() {
    this.audio.setMuted(true);
    // a video ad takes the focus: that is not the player leaving
    if (platform.adPlaying || platform.adPending) return;
    if (this.session && !this.paused && !this.session.ended) this.pause('blur');
  }
  onFocus() { this.audio.setMuted(false); if (this.paused) this.audio.suspend(); }

  // ------------------------------------------------------------ settings
  applySettings() {
    const s = this.settings;
    const wantTouch = s.touch === 'on' || (s.touch !== 'off' && (this.coarse || this.input.touchMode));
    if (wantTouch !== this.input.touchMode) this.setTouchMode(wantTouch);
    this.input.sensitivity = s.sensitivity;
    this.input.invertY = s.invertY;
    this.audio.setVolumes({ master: s.master, sfx: s.sfx, crowd: s.crowd });
    if (this.view.quality !== s.quality) {
      this.view.setQuality(s.quality);
      this.view.venueKey = null;
      const cur = this.session || this.menuSession;
      if (cur) this.view.setVenue(cur.cfg.venue, cur.cfg.venueOpts || {});
      // players are built at the quality's level of detail too
      if (this.view.match) this.view.rebuildCharacters();
    }
    this.settingsDirty = true;
  }
  setStyle(name) {
    this.style = name;
    this.view.setStyle(name);
    this.styleDirty = true;
  }
  // settings and the visual style are applied live but saved once, when the player
  // leaves the screen (Done), not on every change
  commitSettings() {
    if (this.settingsDirty) {
      this.settingsDirty = false;
      if (!saveSettings(this.settings)) this.screens.toast('Settings could not be saved (storage unavailable).', true);
    }
    if (this.styleDirty) { this.styleDirty = false; saveStyle(this.style); }
  }
}

async function boot() {
  // the CrazyGames SDK (when its script is on the page) is ready before anything is loaded,
  // so the career and settings are read from the right place
  await platform.init();
  platform.loadingStart();
  try {
    new App();
  } catch (e) {
    console.error(e);
    const b = document.getElementById('boot');
    if (b) b.textContent = 'First Touch could not start: ' + e.message + ' (a browser with WebGL2 is required).';
  }
  platform.loadingStop();
}
if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', boot); else boot();
