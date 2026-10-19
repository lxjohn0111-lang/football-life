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
// - midgame ads only just before play starts (kick-off from the menus, Play again, a
//   drill starting, and the second half). The SDK decides whether one is shown (at most
//   one every 3 minutes, none right at the start); the game never shows two ads back to
//   back. No ads on purely navigational buttons, and no banners.
// - rewarded ads only when the player asks for one, and the reward only when it finished.
// - the game is muted and paused while a video ad plays; the platform's mute setting
//   silences the game.
// - no fullscreen requests of our own (the platform has its own fullscreen button).
// - the player's name is locked: a logged-in player plays under their CrazyGames
//   username, a guest under the game's default name; nobody can type their own.
import { useStorage, SAVE_KEYS } from '../core/storage.js';

const INIT_TIMEOUT = 10000;
const MOVED_FLAG = 'firsttouch.copiedToDataModule';
// no answer to an ad request at all (blocked script, a lost callback): go on without it
const MIDGAME_WAIT = 6000;
const REWARDED_WAIT = 15000;
// never a midgame ad right after another video ad (no chained ads)
const AD_GAP = 60000;
// error codes that mean ads won't work in this session (Basic Launch, ad blockers)
const ADS_OFF = /disabled|basic|adblock/i;

const errCode = (e) => String((e && (e.code || e.message)) || e || 'error');
// the name guests play under (logged-in players get their CrazyGames username)
export const GUEST_NAME = 'A. Newcomer';

export const platform = {
  sdk: null, // the SDK, once initialised in a usable environment
  env: 'none', // 'none' (no SDK on the page), 'disabled' (other domain), 'local', 'crazygames'
  saves: 'localStorage',
  playing: false,
  adPlaying: false,
  adPending: false,
  lastVideoAt: -1e9,
  rewardedOff: false,
  muted: false,
  muteListeners: [],
  adListeners: [],
  user: null, // the CrazyGames account ({ username, ... }) or null for a guest
  nameListeners: [],

  get active() { return !!this.sdk; },
  // rewarded ad buttons are only offered when an ad can actually be watched
  get rewardedReady() { return !!this.sdk && !this.rewardedOff; },
  // on CrazyGames the player's name can't be chosen: the account's username, or the guest
  // name; null elsewhere (the name is then typed in when creating a player)
  get lockedName() { return this.sdk ? (this.user && this.user.username) || GUEST_NAME : null; },
  // fn(name): the player logged in or out during the session
  onName(fn) { this.nameListeners.push(fn); },

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
    // the account: logged in → its username is the player's name; guests play as guests
    try {
      if (CG.user && CG.user.isUserAccountAvailable !== false) {
        let timer;
        this.user = (await Promise.race([CG.user.getUser(), new Promise((res) => { timer = setTimeout(() => res(null), 4000); })])) || null;
        clearTimeout(timer);
        if (CG.user.addAuthListener) {
          CG.user.addAuthListener((u) => {
            this.user = u || null;
            for (const f of this.nameListeners) f(this.lockedName);
          });
        }
      }
    } catch (e) { this.user = null; }
    // with an ad blocker no rewarded ad can play: don't offer any
    try {
      const r = CG.ad.hasAdblock && CG.ad.hasAdblock();
      if (r && r.then) r.then((b) => { if (b) this.rewardedOff = true; }).catch(() => {});
    } catch (e) { /* no adblock check in this SDK version */ }
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

  call(fn) { if (this.sdk) { try { return fn(this.sdk); } catch (e) { console.warn('[First Touch] CrazyGames SDK call failed:', e && e.message); } } return undefined; },

  loadingStart() { this.call((s) => s.game.loadingStart()); },
  loadingStop() { this.call((s) => s.game.loadingStop()); },
  // called every frame with whether the player is playing; the SDK hears the changes
  setGameplay(on) {
    on = !!on && !this.adPlaying && !this.adPending;
    if (on === this.playing) return;
    this.playing = on;
    this.call((s) => (on ? s.game.gameplayStart() : s.game.gameplayStop()));
  },
  happytime() { this.call((s) => s.game.happytime()); },

  // fn(muted): told now and whenever the platform mute or an ad changes it
  onMute(fn) { this.muteListeners.push(fn); fn(this.muted || this.adPlaying); },
  notifyMute() { for (const f of this.muteListeners) f(this.muted || this.adPlaying); },
  // fn(playing): a video ad started or ended (the game pauses and mutes for it)
  onAd(fn) { this.adListeners.push(fn); },
  setAdPlaying(on) {
    if (this.adPlaying === on) return;
    this.adPlaying = on;
    if (on) this.setGameplay(false);
    else this.lastVideoAt = performance.now();
    this.notifyMute();
    for (const f of this.adListeners) f(on);
  },

  // one video ad request; done(result, error) exactly once: 'finished', 'error' or 'none'.
  // onLateFinish: the ad started after we stopped waiting and has now finished.
  videoAd(type, wait, done, onLateFinish) {
    let settled = false;
    const end = (res, err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      this.adPending = false;
      this.setAdPlaying(false);
      done(res, err);
    };
    const timer = setTimeout(() => { if (!this.adPlaying) end('none'); }, wait);
    this.adPending = true;
    this.setGameplay(false);
    try {
      this.sdk.ad.requestAd(type, {
        adStarted: () => { clearTimeout(timer); this.setAdPlaying(true); },
        adFinished: () => { if (settled) { this.setAdPlaying(false); if (onLateFinish) onLateFinish(); } else end('finished'); },
        adError: (e) => { if (settled) this.setAdPlaying(false); else end('error', e); },
      });
    } catch (e) { end('error', e); }
  },

  // a midgame ad at a natural break; done(shown) is called exactly once, after the ad or
  // at once when there is none (no SDK, too soon after the last ad, an error)
  midgameAd(done) {
    if (!this.sdk || this.adPlaying || this.adPending || performance.now() - this.lastVideoAt < AD_GAP) { done(false); return; }
    this.videoAd('midgame', MIDGAME_WAIT, (res) => done(res === 'finished'));
  },

  // a rewarded ad the player asked for: onReward() when it was watched to the end,
  // onEnd(result, code) when the request is over ('finished', 'error' or 'none')
  rewardedAd({ onReward, onEnd }) {
    if (!this.rewardedReady || this.adPlaying || this.adPending) { if (onEnd) onEnd('none'); return; }
    this.videoAd('rewarded', REWARDED_WAIT, (res, err) => {
      const code = res === 'error' ? errCode(err) : '';
      if (code && ADS_OFF.test(code)) this.rewardedOff = true;
      if (res === 'finished' && onReward) onReward();
      if (onEnd) onEnd(res, code);
    }, onReward);
  },
};
