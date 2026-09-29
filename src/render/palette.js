// Every surface belongs to a material role. Roles are shared THREE.Color objects
// referenced by all ink materials, so switching visual style only recolours
// them in place: no material or geometry is ever rebuilt.
import * as THREE from 'three';

export const R = {
  PITCH_A: 1, PITCH_B: 2, LINES: 3, SURROUND: 4, TRACK: 5,
  GOAL_FRAME: 6, NET: 7,
  STAND_A: 8, STAND_B: 9, STAND_C: 10, ROOF: 11, CONCRETE: 12, METAL: 13, WOOD: 14, FENCE: 15,
  HOUSE_A: 16, HOUSE_B: 17, ROOF_TILE: 18, TREE: 19, TRUNK: 20,
  BANNER_HOME: 21, BANNER_AWAY: 22, BOARD_A: 23, BOARD_B: 24, SCREEN: 25, LAMP: 26,
  CROWD_1: 27, CROWD_2: 28, CROWD_3: 29, CROWD_4: 30,
  SKIN_1: 31, SKIN_2: 32, SKIN_3: 33, SKIN_H: 34,
  HAIR_1: 35, HAIR_2: 36, HAIR_H: 37,
  BOOT: 38, BOOT_H: 39,
  SHIRT_0: 40, SHORTS_0: 41, SOCKS_0: 42, GK_0: 43, NUM_0: 44,
  SHIRT_1: 45, SHORTS_1: 46, SOCKS_1: 47, GK_1: 48, NUM_1: 49,
  BALL_W: 50, BALL_B: 51, GLOVE: 52, CONE: 53, TARGET: 54, CLOUD: 55,
  SKY_TOP: 56, SKY_BOTTOM: 57, GOLD: 58, EYE: 59, GKX_0: 60, GKX_1: 61, INK: 62, MARKER: 63,
  // kit trim (collar, cuffs, stripes) in each club's second colour, and scenery details
  TRIM_0: 64, TRIM_1: 65, GLASS: 66, DOOR: 67, BRICK: 68, TREE_2: 69, HEDGE: 70, FLOWER: 71,
};
export const NUM_ROLES = 72;

// the shared role colours
export const palette = Array.from({ length: NUM_ROLES }, () => new THREE.Color(1, 1, 1));

function hex(h) { return new THREE.Color(h); }

const CLASSIC = {
  name: 'classic',
  label: 'Classic',
  bg: '#f2f1ea', fog: '#f2f1ea', fogNear: 60, fogFar: 330,
  ink: '#161616', lineWidth: 1.2, toon: 0, shadow: 0, clouds: false, blobs: true,
  roles: {
    PITCH_A: '#d3e6c3', PITCH_B: '#c6ddb4', LINES: '#ffffff', SURROUND: '#dde9d0', TRACK: '#ebe6dc',
    GOAL_FRAME: '#ffffff', NET: '#8a8a8a',
    STAND_A: '#f6f6f2', STAND_B: '#ecebe5', STAND_C: '#e2e0d8', ROOF: '#fafaf7', CONCRETE: '#efeee8', METAL: '#e8e8e6', WOOD: '#f1ebe0', FENCE: '#dcdcdc',
    HOUSE_A: '#f8f6f0', HOUSE_B: '#efece4', ROOF_TILE: '#e7e2d8', TREE: '#e4ecdc', TRUNK: '#ece6dc',
    BOARD_A: '#fbfbf8', BOARD_B: '#efefea', SCREEN: '#f7f7f4', LAMP: '#ffffff',
    CROWD_3: '#efefeb', CROWD_4: '#e3e2dc',
    SKIN_1: '#fbf6f0', SKIN_2: '#f3eadf', SKIN_3: '#e8dccd',
    HAIR_1: '#d9d4cc', HAIR_2: '#bdb7ae',
    BOOT: '#3a3a3a', BALL_W: '#ffffff', BALL_B: '#1b1b1b', GLOVE: '#f5f5f0', CONE: '#f2c9a0', TARGET: '#f0b8b0',
    CLOUD: '#ffffff', SKY_TOP: '#f4f3ee', SKY_BOTTOM: '#f2f1ea', GOLD: '#eadcaa', EYE: '#1b1b1b', INK: '#161616', MARKER: '#222222',
    GLASS: '#e3eaee', DOOR: '#e6ddd0', BRICK: '#ece4d8', TREE_2: '#d8e4cc', HEDGE: '#dce7d1', FLOWER: '#f3dcdc',
  },
  kitMix: 0.42, kitSat: 0.75, skinMix: 0.55,
};

const NEO = {
  name: 'neo',
  label: 'Neobrutalist',
  bg: '#8fe3ff', fog: '#b6efff', fogNear: 110, fogFar: 520,
  ink: '#000000', lineWidth: 3, toon: 1, shadow: 1, clouds: true, blobs: false,
  roles: {
    PITCH_A: '#39c24a', PITCH_B: '#2fb041', LINES: '#ffffff', SURROUND: '#27a03a', TRACK: '#ff8a4c',
    GOAL_FRAME: '#ffffff', NET: '#1a1a1a',
    STAND_A: '#ff5c8a', STAND_B: '#ffd23f', STAND_C: '#3d9bff', ROOF: '#ffffff', CONCRETE: '#d9d2ff', METAL: '#b5b5c8', WOOD: '#ffb347', FENCE: '#7b7bff',
    HOUSE_A: '#ff9ecb', HOUSE_B: '#8ff0c4', ROOF_TILE: '#ff5a36', TREE: '#1fd06b', TRUNK: '#a9632e',
    BOARD_A: '#ffffff', BOARD_B: '#ffe45c', SCREEN: '#141414', LAMP: '#fffbe0',
    CROWD_3: '#ffe45c', CROWD_4: '#b48cff',
    SKIN_1: '#ffd8b8', SKIN_2: '#d9a27a', SKIN_3: '#9a6440',
    HAIR_1: '#2b1d14', HAIR_2: '#f2c14e',
    BOOT: '#101010', BALL_W: '#ffffff', BALL_B: '#101010', GLOVE: '#fff45c', CONE: '#ff7a1a', TARGET: '#ff3d6e',
    CLOUD: '#ffffff', SKY_TOP: '#1fb8ff', SKY_BOTTOM: '#c4f4ff', GOLD: '#ffc81a', EYE: '#000000', INK: '#000000', MARKER: '#ff3dcf',
    GLASS: '#3ee0ff', DOOR: '#7b4dff', BRICK: '#ff8a4c', TREE_2: '#12a954', HEDGE: '#1bbd57', FLOWER: '#ff5c8a',
  },
  kitMix: 0, kitSat: 1.15, skinMix: 0,
};

export const STYLES = { classic: CLASSIC, neo: NEO };

// per-match colours (kits and appearance) before style treatment
const matchColours = {
  kits: [
    { shirt: '#c8102e', shorts: '#ffffff', socks: '#c8102e', gk: '#f2c500', gkx: '#222222', number: '#ffffff' },
    { shirt: '#1d4ed8', shorts: '#1d4ed8', socks: '#ffffff', gk: '#22c55e', gkx: '#111111', number: '#ffffff' },
  ],
  human: { skin: '#e0b48c', hair: '#3b2a1e', boots: '#111111' },
};

let currentStyle = CLASSIC;

function treat(c, style, mixWhite, satMul) {
  const col = hex(c);
  const hsl = {};
  col.getHSL(hsl);
  col.setHSL(hsl.h, Math.min(1, hsl.s * satMul), hsl.l);
  if (mixWhite > 0) col.lerp(new THREE.Color(1, 1, 1), mixWhite);
  return col;
}

export function applyStyle(styleName) {
  const st = STYLES[styleName] || CLASSIC;
  currentStyle = st;
  for (const [k, v] of Object.entries(st.roles)) palette[R[k]].set(v);
  applyMatchColours();
  return st;
}

export function setMatchColours(kits, human) {
  if (kits) matchColours.kits = kits;
  if (human) matchColours.human = human;
  applyMatchColours();
}

function applyMatchColours() {
  const st = currentStyle;
  const k = matchColours.kits;
  const mix = st.kitMix, sat = st.kitSat;
  for (let t = 0; t < 2; t++) {
    const kit = k[t];
    const base = t === 0 ? 0 : 5;
    palette[R.SHIRT_0 + base].copy(treat(kit.shirt, st, mix, sat));
    palette[R.SHORTS_0 + base].copy(treat(kit.shorts, st, mix, sat));
    palette[R.SOCKS_0 + base].copy(treat(kit.socks, st, mix, sat));
    palette[R.GK_0 + base].copy(treat(kit.gk, st, mix, sat));
    palette[R.NUM_0 + base].copy(treat(kit.number, st, st.name === 'classic' ? 0 : 0, 1));
    palette[(t === 0 ? R.GKX_0 : R.GKX_1)].copy(treat(kit.gkx, st, mix * 0.6, sat));
    // trim: the club's second colour, or black/white if it would vanish against the shirt
    const trim = kit.trim || kit.number || '#ffffff';
    const tc = colourDistance(trim, kit.shirt) < 0.3 ? (colourDistance(kit.shirt, '#ffffff') > 0.6 ? '#ffffff' : '#141414') : trim;
    palette[t === 0 ? R.TRIM_0 : R.TRIM_1].copy(treat(tc, st, mix, sat));
  }
  // numbers must contrast with the shirt
  for (let t = 0; t < 2; t++) {
    const shirt = palette[t === 0 ? R.SHIRT_0 : R.SHIRT_1];
    const lum = shirt.r * 0.3 + shirt.g * 0.59 + shirt.b * 0.11;
    palette[t === 0 ? R.NUM_0 : R.NUM_1].set(lum > 0.6 ? '#141414' : '#ffffff');
  }
  palette[R.BANNER_HOME].copy(treat(k[0].shirt, st, mix * 0.7, sat));
  palette[R.BANNER_AWAY].copy(treat(k[1].shirt, st, mix * 0.7, sat));
  palette[R.CROWD_1].copy(treat(k[0].shirt, st, st.name === 'classic' ? 0.62 : 0, sat));
  palette[R.CROWD_2].copy(treat(k[1].shirt, st, st.name === 'classic' ? 0.62 : 0, sat));
  const h = matchColours.human;
  palette[R.SKIN_H].copy(treat(h.skin, st, st.skinMix, 1));
  palette[R.HAIR_H].copy(treat(h.hair, st, st.skinMix * 0.8, 1));
  palette[R.BOOT_H].copy(treat(h.boots, st, st.name === 'classic' ? 0.15 : 0, 1));
}

export function colourDistance(a, b) {
  const ca = hex(a), cb = hex(b);
  return Math.hypot(ca.r - cb.r, ca.g - cb.g, ca.b - cb.b);
}

// Choose kits that keep both teams (and keepers) clearly distinct
// shirt design from the club crest: stripes, a chest band, halves, contrasting sleeves or plain
const KIT_PATTERNS = { stripes: 'stripes', band: 'band', half: 'halves', quarters: 'sleeves', chevron: 'plain' };
export function kitPattern(club) { return (club && club.crest && KIT_PATTERNS[club.crest.pattern]) || 'plain'; }

export function resolveKits(homeClub, awayClub) {
  const home = { shirt: homeClub.colors[0], shorts: homeClub.colors[2] || homeClub.colors[1], socks: homeClub.colors[0], number: homeClub.colors[1], pattern: kitPattern(homeClub) };
  let away = { shirt: awayClub.colors[0], shorts: awayClub.colors[2] || awayClub.colors[1], socks: awayClub.colors[0], number: awayClub.colors[1], pattern: kitPattern(awayClub) };
  if (colourDistance(home.shirt, away.shirt) < 0.55) {
    // away side switches to its change kit
    away = { shirt: awayClub.colors[1], shorts: awayClub.colors[0], socks: awayClub.colors[1], number: awayClub.colors[0], pattern: kitPattern(awayClub) };
    if (colourDistance(home.shirt, away.shirt) < 0.55) away = { shirt: '#f4f4f4', shorts: '#222222', socks: '#f4f4f4', number: '#111111', pattern: 'plain' };
  }
  const gkOptions = ['#f2c500', '#22c55e', '#9333ea', '#f97316', '#0ea5e9', '#ec4899', '#111827'];
  const pickGK = (avoid) => {
    let best = gkOptions[0], bd = -1;
    for (const g of gkOptions) {
      const d = Math.min(...avoid.map((a) => colourDistance(g, a)));
      if (d > bd) { bd = d; best = g; }
    }
    return best;
  };
  home.gk = pickGK([home.shirt, away.shirt]);
  away.gk = pickGK([home.shirt, away.shirt, home.gk]);
  home.gkx = '#1f1f1f'; away.gkx = '#1f1f1f';
  return [home, away];
}

export function currentStyleDef() { return currentStyle; }
