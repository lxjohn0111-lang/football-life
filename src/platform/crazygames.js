// CrazyGames HTML5 SDK v3 integration. The CrazyGames build's index.html loads
// https://sdk.crazygames.com/crazygames-sdk-v3.js before the game; every other build
// (double-clicked index.html, the test server) has no SDK and runs exactly as before.
//
// What it does on CrazyGames:
// - saves go through the SDK's data module (guests: kept in the browser by the SDK;
//   logged-in players: their CrazyGames account, synced across devices). Saves made
//   earlier in this browser's localStorage are copied over once.
// - loadingStart / loadingStop around start-up; gameplayStart / gameplayStop while a
//   match, drill or the tutorial is actually being played; happytime on a win.
// - midgame ads only at natural breaks (leaving a match's result screen), with the game
//   muted while they play; the platform's mute setting silences the game.
// - no fullscreen requests of our own (the platform has its own fullscreen button).
import { useStorage, SAVE_KEYS } from '../core/storage.js';

const INIT_TIMEOUT = 10000;
const MOVED_FLAG = 'firsttouch.copiedToDataModule';

export const platform = {
  sdk: null, // the SDK, once initialised in a usable environment
  env: 'none', // 'none' (no SDK on the page), 'disabled' (other domain), 'local', 'crazygames'
  saves: 'localStorage',
  playing: false,
  adPlaying: false,
  muted: false,
  muteListeners: [],

  get active() { return !!this.sdk; },

  async init() {
    const CG = window.CrazyGames && window.CrazyGames.SDK;
    if (!CG) return this;
    try {
      let timer;
      await Promise.race([CG.init(), new Promise((_, rej) => { timer = setTimeout(() => rej(new Error('SDK init timed out')), INIT_TIMEOUT); })]);
      clearTimeout(timer);
    } catch (e) {
      console.warn('[First Touch] CrazyGames SDK unavailable, playing without it:', e && e.message);
      this.env = 'disabled';
      return this;
    }
    this.env = CG.environment || 'disabled';
    // on other domains the SDK is "disabled" and every call would throw
    if (this.env !== 'local' && this.env !== 'crazygames') return this;
    this.sdk = CG;
    this.useDataModule(CG.data);
    try {
      this.muted = !!(CG.game.settings && CG.game.settings.muteAudio);
      CG.game.addSettingsChangeListener((s) => { this.muted = !!(s && s.muteAudio); this.notifyMute(); });
    } catch (e) { /* settings not available: never muted by the platform */ }
    return this;
  },

  // saves through the data module, when it is enabled for the game ("Progress Save" in the
  // submission); if it isn't, the SDK throws and the game keeps using localStorage
  useDataModule(data) {
    try {
      if (!data) throw new Error('no data module');
      data.getItem('firsttouch.probe');
    } catch (e) {
      console.warn('[First Touch] CrazyGames data module unavailable, saving to localStorage:', e && e.message);
      return;
    }
    // a one-time copy of anything saved in this browser before the data module was used
    // (the local copy is left alone: guest data of the SDK lives in the browser too)
    try {
      const ls = window.localStorage;
      if (!ls.getItem(MOVED_FLAG)) {
        for (const k of SAVE_KEYS) {
          const local = ls.getItem(k);
          if (local != null && data.getItem(k) == null) data.setItem(k, local);
        }
        ls.setItem(MOVED_FLAG, '1');
      }
    } catch (e) { /* localStorage blocked or data limit: nothing to copy */ }
    useStorage(data, 'crazygames');
    this.saves = 'crazygames';
  },

  call(fn) { if (this.sdk) { try { fn(this.sdk); } catch (e) { console.warn('[First Touch] CrazyGames SDK call failed:', e && e.message); } } },

  loadingStart() { this.call((s) => s.game.loadingStart()); },
  loadingStop() { this.call((s) => s.game.loadingStop()); },
  // called every frame with whether the player is playing; the SDK hears the changes
  setGameplay(on) {
    on = !!on && !this.adPlaying;
    if (on === this.playing) return;
    this.playing = on;
    this.call((s) => (on ? s.game.gameplayStart() : s.game.gameplayStop()));
  },
  happytime() { this.call((s) => s.game.happytime()); },

  // fn(muted): told now and whenever the platform mute or an ad changes it
  onMute(fn) { this.muteListeners.push(fn); fn(this.muted || this.adPlaying); },
  notifyMute() { for (const f of this.muteListeners) f(this.muted || this.adPlaying); },

  // a midgame ad at a natural break; done() is called exactly once, after the ad or at once
  // when there is no ad (no SDK, ad error, too soon after the last one)
  midgameAd(done) {
    if (!this.sdk) { done(); return; }
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      this.adPlaying = false;
      this.notifyMute();
      done();
    };
    try {
      this.setGameplay(false);
      this.sdk.ad.requestAd('midgame', {
        adStarted: () => { this.adPlaying = true; this.notifyMute(); },
        adFinished: finish,
        adError: finish,
      });
    } catch (e) { finish(); }
  },
};
