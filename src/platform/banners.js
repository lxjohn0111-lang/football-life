// CrazyGames banner ads on the menu and result screens (never during play).
//
// - Up to two banners at once (the platform's limit per screen): one along the bottom
//   (728x90, 468x60, 320x100 or 320x50, whichever fits the window) and, on wide
//   screens, a 300x250 on the right.
// - The screens make room for them (CSS --ad-bottom / --ad-right), so a banner never
//   covers any of the game's buttons or text, at any window size.
// - Each banner is refreshed as often as the SDK allows: 30 seconds after the last one
//   was served, up to 120 times per size in a session. Leaving the menus clears them;
//   coming back shows them again as soon as a refresh is allowed.
// - Errors that mean banners can't show here (Basic Launch, the mobile app) switch
//   that banner off for the session; an unfilled one is simply tried again later.
import { platform } from './crazygames.js';

export const BANNER_REFRESH = 30000; // ms, the SDK's minimum between refreshes
const MARGIN = 600; // ms after the last request settled, so the SDK never sees an early one
const PER_SIZE = 120; // refreshes per size and session
const RETRY = 10000; // ms after a transient error (container not ready, an ad playing)
const FATAL = /basiclaunch|mobileapp|disabled|unavailable/i;
const LABEL = 14; // px for the "Advertisement" caption above a banner

const SLOTS = [
  {
    id: 'cg-banner-bottom', side: 'bottom',
    sizes: () => {
      const W = innerWidth, H = innerHeight;
      const s = [];
      if (W >= 760 && H >= 560) s.push([728, 90]);
      if (W >= 500 && H >= 430) s.push([468, 60]);
      if (W < 500 && H >= 760) s.push([320, 100]);
      if (W >= 336 && H >= 300) s.push([320, 50]);
      return s;
    },
  },
  {
    id: 'cg-banner-side', side: 'right',
    // only where the screens can give up 324 px on the right and still lay out comfortably
    sizes: () => (innerWidth >= 1360 && innerHeight >= 640 ? [[300, 250]] : []),
  },
];

export class Banners {
  constructor(parent = document.body) {
    this.enabled = platform.active && !!(platform.sdk && platform.sdk.banner);
    this.want = false;
    this.refreshMs = BANNER_REFRESH;
    this.counts = {};
    this.slots = SLOTS.map((d) => ({ ...d, el: null, box: null, size: null, shown: false, pending: false, filled: false, dead: false, next: 0 }));
    if (!this.enabled) return;
    // a dark strip / column behind the banners keeps them apart from the game's own screens
    this.backs = ['ad-back-bottom', 'ad-back-right'].map((c) => {
      const d = document.createElement('div');
      d.className = `ad-back ${c}`;
      d.hidden = true;
      parent.appendChild(d);
      return d;
    });
    for (const s of this.slots) {
      s.el = document.createElement('div');
      s.el.className = `ad-slot ad-${s.side}`;
      s.el.hidden = true;
      s.el.innerHTML = `<div class="ad-label">Advertisement</div><div class="ad-box" id="${s.id}"></div>`;
      s.box = s.el.lastChild;
      parent.appendChild(s.el);
    }
  }

  // called every frame: want = a screen where banners are allowed is up
  update(want) {
    if (!this.enabled) return;
    const now = performance.now();
    if (want !== this.want) {
      this.want = want;
      if (!want) for (const s of this.slots) this.hide(s, true);
    }
    if (!want || platform.adPlaying) return;
    for (const s of this.slots) {
      if (s.dead || s.pending) continue;
      const size = this.pick(s);
      // the window changed and this size doesn't fit any more
      if (s.shown && (!size || size[0] !== s.size[0] || size[1] !== s.size[1])) this.hide(s, true);
      if (!size || now < s.next) continue;
      this.request(s, size);
    }
  }

  pick(s) {
    return s.sizes().find(([w, h]) => (this.counts[`${w}x${h}`] || 0) < PER_SIZE) || null;
  }

  request(s, size) {
    const [w, h] = size, key = `${w}x${h}`;
    this.counts[key] = (this.counts[key] || 0) + 1;
    s.size = size;
    this.show(s);
    s.pending = true;
    platform.requestBanner(s.id, w, h).then(() => {
      s.filled = true;
      s.el.classList.add('filled');
      return this.refreshMs;
    }, (e) => {
      const code = String((e && (e.code || e.message)) || e || '');
      if (FATAL.test(code)) { s.dead = true; this.hide(s, false); return 0; }
      // an unfilled request still counts as one; a banner that wasn't requested doesn't
      if (/notvisible|notcreated|videoadplaying|missingid/i.test(code)) { this.counts[key]--; return RETRY; }
      if (/noavailablesizes/i.test(code)) this.counts[key] = PER_SIZE;
      return this.refreshMs;
    }).then((wait) => {
      s.pending = false;
      s.next = performance.now() + wait + MARGIN;
      // the player left the menus while it loaded: take it down again
      if (!this.want) { platform.clearBanner(s.id); this.hide(s, false); }
    });
  }

  show(s) {
    const [w, h] = s.size;
    s.box.style.width = `${w}px`;
    s.box.style.height = `${h}px`;
    // placed without transforms, so the SDK's visibility check sees exactly the box
    if (s.side === 'bottom') s.el.style.left = `calc(50% - ${w / 2}px)`;
    else s.el.style.top = `calc((100% - var(--ad-bottom, 0px) - ${h + LABEL}px) / 2)`;
    s.el.hidden = false;
    s.shown = true;
    this.reserve();
  }

  hide(s, clear) {
    if (!s.shown) return;
    if (clear && !s.pending) platform.clearBanner(s.id);
    s.shown = false;
    s.filled = false;
    s.el.hidden = true;
    s.el.classList.remove('filled');
    this.reserve();
  }

  // room for the banners, so they never cover the screens
  reserve() {
    const st = document.documentElement.style;
    const b = this.slots[0], r = this.slots[1];
    st.setProperty('--ad-bottom', b.shown ? `calc(${b.size[1] + LABEL + 10}px + env(safe-area-inset-bottom, 0px))` : '0px');
    st.setProperty('--ad-right', r.shown ? `${r.size[0] + 24}px` : '0px');
    this.backs[0].hidden = !b.shown;
    this.backs[1].hidden = !r.shown;
  }
}
