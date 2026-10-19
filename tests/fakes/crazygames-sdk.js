// A stand-in for https://sdk.crazygames.com/crazygames-sdk-v3.js used by
// tests/crazygames.mjs (the real SDK isn't reachable from the test environment). It has
// the v3 surface the game uses and records every call in window.__cg.calls (and banner
// requests with their times in window.__cg.banners).
// Query options: ?cgenv=local|crazygames|disabled (default crazygames),
// ?cgdata=off (data module not enabled: its calls throw), ?cgad=error (video ads fail),
// ?cgadblock=1 (hasAdblock() says yes), ?cgbanner=basic|unfilled|mobileapp,
// ?cgrefresh=<ms> (minimum time between two requests for one banner, default 30000),
// ?cguser=<name> (logged in as that CrazyGames user; a guest otherwise).
// window.__cg.login(name) / logout() change the account during the session.
(() => {
  const q = new URLSearchParams(location.search);
  const env = q.get('cgenv') || 'crazygames';
  const calls = [];
  const rec = (name, arg) => { calls.push(arg === undefined ? name : `${name}:${arg}`); };
  const disabled = () => { throw new Error('CrazySDK is disabled on this domain'); };
  // the "cloud": kept in localStorage under a prefix so it survives reloads in the test
  const P = 'cgcloud:';
  const data = {
    getItem(k) { if (q.get('cgdata') === 'off') throw new Error('Data module is not enabled'); rec('data.getItem', k); return localStorage.getItem(P + k); },
    setItem(k, v) { if (q.get('cgdata') === 'off') throw new Error('Data module is not enabled'); rec('data.setItem', k); localStorage.setItem(P + k, String(v)); },
    removeItem(k) { rec('data.removeItem', k); localStorage.removeItem(P + k); },
    clear() { for (const k of Object.keys(localStorage)) if (k.startsWith(P)) localStorage.removeItem(k); },
  };
  const settingsListeners = [];
  const authListeners = [];
  let user = q.get('cguser') ? { username: q.get('cguser'), profilePictureUrl: '' } : null;
  const guard = (o) => new Proxy(o, { get: (t, p) => (env === 'disabled' && typeof t[p] === 'function' ? disabled : t[p]) });
  const banners = [];
  const lastBanner = {};
  const minRefresh = Number(q.get('cgrefresh') || 30000);
  let adPlaying = false;
  window.__cg = {
    calls,
    banners,
    tooSoon: 0,
    rewardedWatched: 0,
    setMute(m) { SDK.game.settings.muteAudio = m; for (const f of settingsListeners) f({ muteAudio: m, disableChat: false }); },
    login(name) { user = { username: name, profilePictureUrl: '' }; for (const f of authListeners) f(user); },
    logout() { user = null; for (const f of authListeners) f(null); },
  };
  const fail = (code) => Promise.reject(Object.assign(new Error(code), { code }));
  const SDK = {
    environment: 'uninitialized',
    async init() { rec('init'); await new Promise((r) => setTimeout(r, 30)); SDK.environment = env; },
    data: guard(data),
    user: guard({
      isUserAccountAvailable: true,
      async getUser() { rec('getUser'); await new Promise((r) => setTimeout(r, 10)); return user; },
      addAuthListener(f) { authListeners.push(f); },
      removeAuthListener(f) { const i = authListeners.indexOf(f); if (i >= 0) authListeners.splice(i, 1); },
    }),
    game: guard({
      settings: { muteAudio: q.get('muteAudio') === 'true', disableChat: false },
      loadingStart() { rec('loadingStart'); },
      loadingStop() { rec('loadingStop'); },
      gameplayStart() { rec('gameplayStart'); },
      gameplayStop() { rec('gameplayStop'); },
      happytime() { rec('happytime'); },
      addSettingsChangeListener(f) { settingsListeners.push(f); },
    }),
    ad: guard({
      requestAd(type, cb) {
        rec('requestAd', type);
        const matchTime = () => (window.__ft && window.__ft.session ? window.__ft.session.match.time : null);
        if (q.get('cgad') === 'error' || window.__cg.failNext) { window.__cg.failNext = false; setTimeout(() => cb.adError && cb.adError({ code: 'unfilled' }), 20); return; }
        setTimeout(() => {
          adPlaying = true;
          cb.adStarted && cb.adStarted();
          window.__cg.mutedDuringAd = window.__ft && window.__ft.audio.platformMute;
          window.__cg.pausedDuringAd = window.__ft && window.__ft.session ? window.__ft.paused : null;
          window.__cg.gameplayDuringAd = window.__ft && window.__ft.platform.playing;
          window.__cg.tStart = matchTime();
        }, 20);
        setTimeout(() => { adPlaying = false; window.__cg.tEnd = matchTime(); if (type === 'rewarded') window.__cg.rewardedWatched++; cb.adFinished && cb.adFinished(); }, 400);
      },
      hasAdblock() { return Promise.resolve(q.get('cgadblock') === '1'); },
    }),
    banner: guard({
      requestBanner({ id, width, height }) {
        const t = performance.now();
        rec('requestBanner', `${id}:${width}x${height}`);
        const el = document.getElementById(id);
        if (!id) return fail('missingId');
        if (!el) return fail('notCreated');
        const b = q.get('cgbanner');
        if (b === 'basic') return fail('bannersDisabledBasicLaunch');
        if (b === 'mobileapp') return fail('bannersDisabledMobileApp');
        if (adPlaying) return fail('videoAdPlaying');
        const r = el.getBoundingClientRect();
        const vis = el.offsetParent !== null && r.width >= width && r.height >= height && r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight;
        if (!vis) return fail('notVisible');
        if (lastBanner[id] != null && t - lastBanner[id] < minRefresh) { window.__cg.tooSoon++; return fail('bannerRefreshTooSoon'); }
        lastBanner[id] = t;
        banners.push({ id, width, height, t });
        if (b === 'unfilled') return new Promise((_, rej) => setTimeout(() => rej(Object.assign(new Error('unfilled'), { code: 'unfilled' })), 30));
        return new Promise((res) => setTimeout(() => {
          el.innerHTML = `<div class="fake-ad" style="width:${width}px;height:${height}px;background:#e0e0e0;color:#333;font:12px sans-serif;display:flex;align-items:center;justify-content:center">AD ${width}x${height}</div>`;
          res();
        }, 30));
      },
      clearBanner(id) { rec('clearBanner', id); const el = document.getElementById(id); if (el) el.innerHTML = ''; },
      clearAllBanners() { rec('clearAllBanners'); },
    }),
  };
  window.CrazyGames = { SDK };
})();
