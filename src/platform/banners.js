// CrazyGames banner ads in the career hub, the screen players spend the most time on
// between matches. Nowhere else: not on the main menu (players leave it too quickly for a
// banner to render), never during play, never on result screens or dialogs.
//
// - The banners are part of the hub's own layout, in cards drawn like its other panels
//   (never a separate strip or frame around the game): a wide card under the hub's
//   panels (728x90, 468x60, 320x100 or 320x50, whichever its CSS gives the window; on
//   phones right after the match card) and, on wide screens, a 300x250 card as a third
//   column next to them. On computers the hub's CSS keeps them in view without
//   scrolling (a more compact hub in short windows, the tabs scrolling in their panel).
// - The hub is re-drawn often (an upgrade, a reward), which would throw a banner away,
//   so the SDK's container is not inside the hub: it is laid exactly over the card's
//   hole every frame and outlives the re-draws.
// - A banner is only requested once the hub has been on screen for a moment and the hole
//   is fully in view, so quick navigation never wastes one.
// - Each banner is refreshed as often as the SDK allows: 30 seconds after the last one
//   was served (while it is in view), up to 120 times per size in a session. Leaving the
//   hub clears them; coming back shows them again as soon as a refresh is allowed.
// - Errors that mean banners can't show here (Basic Launch, the mobile app) remove that
//   card for the session; an unfilled one is simply tried again later. Until a banner
//   is served, the card shows a tip instead of an empty box.
import { platform } from './crazygames.js';

export const BANNER_REFRESH = 30000; // ms, the SDK's minimum between refreshes
const MARGIN = 600; // ms after the last request settled, so the SDK never sees an early one
const PER_SIZE = 120; // refreshes per size and session
const RETRY = 10000; // ms after a transient error (container not ready, an ad playing)
const DWELL = 700; // ms the hub must have been on screen before the first request
const FATAL = /basiclaunch|mobileapp|disabled|unavailable/i;
const SIZES = ['728x90', '468x60', '320x100', '320x50', '300x250'];
const TIPS = [
  'Clubs watch your form: good ratings bring transfer offers.',
  'Every level gives an upgrade point. Spend them in the Player tab.',
  'Train between matches for extra XP.',
  'Call for the ball when you are in space.',
  'A charged shot flies harder; a quick one is easier to place.',
  'Win your league to play in the Continental Cup.',
  'Sprint into space, then take your first touch.',
];

const SLOTS = [
  { id: 'cg-banner-wide', place: 'wide' },
  { id: 'cg-banner-side', place: 'side' },
];

export class Banners {
  constructor(parent = document.body) {
    this.enabled = platform.active && !!(platform.sdk && platform.sdk.banner);
    this.want = false;
    this.since = 0;
    this.refreshMs = BANNER_REFRESH;
    this.counts = {};
    this.tip = Math.floor(Math.random() * TIPS.length);
    this.slots = SLOTS.map((d) => ({ ...d, el: null, box: null, size: null, shown: false, pending: false, filled: false, dead: false, next: 0 }));
    if (!this.enabled) return;
    // the SDK fills the boxes; they sit above the screens, laid over the cards' holes
    for (const s of this.slots) {
      s.el = document.createElement('div');
      s.el.className = `ad-slot ad-${s.place}`;
      s.el.hidden = true;
      s.el.innerHTML = `<div class="ad-box" id="${s.id}"></div>`;
      s.box = s.el.firstChild;
      parent.appendChild(s.el);
    }
  }

  // the card a screen puts in its layout ('' when that banner can't show)
  card(place) {
    const s = this.slots.find((x) => x.place === place);
    if (!this.enabled || !s || s.dead) return '';
    const tip = TIPS[(this.tip + (place === 'side' ? 3 : 0)) % TIPS.length];
    return `<div class="ad-card ad-${place}${s.filled ? ' filled' : ''}" data-ad="${place}"><div class="ad-label">Advertisement</div><div class="ad-hole"><span class="ad-tip"><b>Tip</b>${tip}</span></div></div>`;
  }

  // called every frame: want = the hub is up (no match running)
  update(want) {
    if (!this.enabled) return;
    const now = performance.now();
    if (want !== this.want) {
      this.want = want;
      this.since = now;
      if (want) this.tip = (this.tip + 1) % TIPS.length;
      else for (const s of this.slots) this.hide(s, true);
    }
    if (!want) return;
    for (const s of this.slots) {
      const card = document.querySelector(`.ad-card[data-ad="${s.place}"]`);
      if (s.dead) { if (card) this.drop(card); continue; }
      const hole = card && card.querySelector('.ad-hole');
      const size = hole && this.sizeOf(hole);
      // the card is gone or the window changed its size: take the banner down
      if (s.shown && !s.pending && (!size || size[0] !== s.size[0] || size[1] !== s.size[1])) this.hide(s, true);
      if (!size) continue;
      const r = hole.getBoundingClientRect();
      if (s.shown) this.place(s, r);
      card.classList.toggle('filled', s.filled);
      if (s.pending || now < s.next || now - this.since < DWELL || platform.adPlaying || platform.adPending) continue;
      // only fully in view (the hub scrolls on small screens)
      if (r.left < 0 || r.top < 0 || r.right > innerWidth + 0.5 || r.bottom > innerHeight + 0.5) continue;
      if ((this.counts[size.join('x')] || 0) >= PER_SIZE) continue;
      this.request(s, size, r);
    }
  }

  // the hole's size, when it is one the SDK serves (the CSS picks it for the window)
  sizeOf(hole) {
    if (!hole.offsetParent) return null;
    const w = hole.offsetWidth, h = hole.offsetHeight;
    return SIZES.includes(`${w}x${h}`) ? [w, h] : null;
  }

  request(s, size, rect) {
    const [w, h] = size, key = `${w}x${h}`;
    this.counts[key] = (this.counts[key] || 0) + 1;
    s.size = size;
    s.shown = true;
    s.pending = true;
    s.box.style.width = `${w}px`;
    s.box.style.height = `${h}px`;
    s.el.hidden = false;
    this.place(s, rect);
    platform.requestBanner(s.id, w, h).then(() => {
      s.filled = true;
      return this.refreshMs;
    }, (e) => {
      const code = String((e && (e.code || e.message)) || e || '');
      s.filled = false;
      if (FATAL.test(code)) { s.dead = true; return 0; }
      // a banner that wasn't requested doesn't count; an unfilled one does
      if (/notvisible|notcreated|videoadplaying|missingid/i.test(code)) { this.counts[key]--; return RETRY; }
      if (/noavailablesizes/i.test(code)) this.counts[key] = PER_SIZE;
      return this.refreshMs;
    }).then((wait) => {
      s.pending = false;
      s.next = performance.now() + wait + MARGIN;
      // nothing to show (refused, unfilled), or the player left the hub while it loaded
      if (!s.filled || !this.want) this.hide(s, !this.want);
    });
  }

  // over the card's hole, without transforms (the SDK checks where its container is)
  place(s, r) {
    s.el.style.left = `${Math.round(r.left)}px`;
    s.el.style.top = `${Math.round(r.top)}px`;
  }

  hide(s, clear) {
    if (!s.shown) return;
    if (clear && !s.pending) platform.clearBanner(s.id);
    if (!s.pending) s.shown = false;
    s.filled = false;
    s.el.hidden = true;
  }

  // a banner that can't show here: its card leaves the layout
  drop(card) {
    if (card.classList.contains('ad-side')) card.parentElement.classList.remove('with-ad');
    card.remove();
  }
}
