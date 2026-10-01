// 20 real clubs across 5 prestige tiers, taken from the openfootball/football.json data
// (https://github.com/openfootball/football.json, public domain / CC0): the current
// 2026/27 Premier League, Championship and top European leagues, and League One and
// League Two from 2025/26 (the latest season the data has for them, mid-table clubs).
// Kit colours and grounds are the clubs' real ones; crests are simple generated badges
// with the club's initial (not the clubs' own crests). The crest pattern also sets the
// kit design (stripes, band, halves, contrast sleeves).
export const DATA_SOURCE = 'openfootball/football.json (CC0) · seasons 2026/27 and 2025/26';
export const TIERS = [
  { tier: 1, league: 'League Two', venue: 'community', label: 'League Two' },
  { tier: 2, league: 'League One', venue: 'town', label: 'League One' },
  { tier: 3, league: 'Championship', venue: 'regional', label: 'Championship' },
  { tier: 4, league: 'Premier League', venue: 'premier', label: 'Premier League' },
  { tier: 5, league: 'European Elite', venue: 'continental', label: 'European Elite' },
];

// colors: [shirt, secondary/change shirt, shorts]
export const CLUBS = [
  { id: 'swindon', name: 'Swindon Town', short: 'SWI', tier: 1, colors: ['#d1101e', '#ffffff', '#ffffff'], style: 'wing', crest: { shape: 'shield', pattern: 'chevron', symbol: 'S' }, ground: 'County Ground' },
  { id: 'chesterfield', name: 'Chesterfield', short: 'CHF', tier: 1, colors: ['#0a3d91', '#ffffff', '#ffffff'], style: 'direct', crest: { shape: 'circle', pattern: 'chevron', symbol: 'C' }, ground: 'SMH Group Stadium' },
  { id: 'bromley', name: 'Bromley', short: 'BRO', tier: 1, colors: ['#f5f5f5', '#111111', '#111111'], style: 'counter', crest: { shape: 'diamond', pattern: 'chevron', symbol: 'B' }, ground: 'Hayes Lane' },
  { id: 'grimsby', name: 'Grimsby Town', short: 'GRI', tier: 1, colors: ['#151515', '#f5f5f5', '#151515'], style: 'possession', crest: { shape: 'shield', pattern: 'stripes', symbol: 'G' }, ground: 'Blundell Park' },

  { id: 'bradford', name: 'Bradford City', short: 'BRA', tier: 2, colors: ['#7d1d3f', '#f6a800', '#111111'], style: 'possession', crest: { shape: 'shield', pattern: 'stripes', symbol: 'B' }, ground: 'Valley Parade' },
  { id: 'barnsley', name: 'Barnsley', short: 'BNS', tier: 2, colors: ['#d71920', '#ffffff', '#ffffff'], style: 'pressing', crest: { shape: 'circle', pattern: 'chevron', symbol: 'B' }, ground: 'Oakwell' },
  { id: 'wigan', name: 'Wigan Athletic', short: 'WIG', tier: 2, colors: ['#1d59af', '#ffffff', '#1d59af'], style: 'direct', crest: { shape: 'hex', pattern: 'stripes', symbol: 'W' }, ground: 'Brick Community Stadium' },
  { id: 'plymouth', name: 'Plymouth Argyle', short: 'PLY', tier: 2, colors: ['#00573f', '#ffffff', '#111111'], style: 'wing', crest: { shape: 'diamond', pattern: 'chevron', symbol: 'P' }, ground: 'Home Park' },

  { id: 'westham', name: 'West Ham United', short: 'WHU', tier: 3, colors: ['#7a263a', '#1bb1e7', '#ffffff'], style: 'pressing', crest: { shape: 'shield', pattern: 'quarters', symbol: 'W' }, ground: 'London Stadium' },
  { id: 'wolves', name: 'Wolverhampton Wanderers', short: 'WOL', tier: 3, colors: ['#fdb913', '#231f20', '#231f20'], style: 'counter', crest: { shape: 'circle', pattern: 'chevron', symbol: 'W' }, ground: 'Molineux' },
  { id: 'southampton', name: 'Southampton', short: 'SOU', tier: 3, colors: ['#d71920', '#ffffff', '#111111'], style: 'wing', crest: { shape: 'hex', pattern: 'stripes', symbol: 'S' }, ground: "St Mary's Stadium" },
  { id: 'swansea', name: 'Swansea City', short: 'SWA', tier: 3, colors: ['#f5f5f5', '#121212', '#f5f5f5'], style: 'possession', crest: { shape: 'shield', pattern: 'chevron', symbol: 'S' }, ground: 'Swansea.com Stadium' },

  { id: 'mancity', name: 'Manchester City', short: 'MCI', tier: 4, colors: ['#6cabdd', '#1c2c5b', '#ffffff'], style: 'possession', crest: { shape: 'circle', pattern: 'chevron', symbol: 'M' }, ground: 'Etihad Stadium' },
  { id: 'arsenal', name: 'Arsenal', short: 'ARS', tier: 4, colors: ['#ef0107', '#ffffff', '#ffffff'], style: 'pressing', crest: { shape: 'shield', pattern: 'quarters', symbol: 'A' }, ground: 'Emirates Stadium' },
  { id: 'liverpool', name: 'Liverpool', short: 'LIV', tier: 4, colors: ['#c8102e', '#f6eb61', '#c8102e'], style: 'direct', crest: { shape: 'shield', pattern: 'chevron', symbol: 'L' }, ground: 'Anfield' },
  { id: 'chelsea', name: 'Chelsea', short: 'CHE', tier: 4, colors: ['#034694', '#ffffff', '#034694'], style: 'counter', crest: { shape: 'circle', pattern: 'chevron', symbol: 'C' }, ground: 'Stamford Bridge' },

  { id: 'realmadrid', name: 'Real Madrid', short: 'RMA', tier: 5, colors: ['#f5f5f5', '#1c2b5a', '#f5f5f5'], style: 'counter', crest: { shape: 'circle', pattern: 'crown', symbol: 'R' }, ground: 'Santiago Bernabéu' },
  { id: 'barcelona', name: 'FC Barcelona', short: 'BAR', tier: 5, colors: ['#a50044', '#004d98', '#004d98'], style: 'possession', crest: { shape: 'shield', pattern: 'stripes', symbol: 'B' }, ground: 'Camp Nou' },
  { id: 'bayern', name: 'Bayern München', short: 'BAY', tier: 5, colors: ['#dc052d', '#ffffff', '#dc052d'], style: 'pressing', crest: { shape: 'circle', pattern: 'chevron', symbol: 'B' }, ground: 'Allianz Arena' },
  { id: 'psg', name: 'Paris Saint-Germain', short: 'PSG', tier: 5, colors: ['#004170', '#da291c', '#004170'], style: 'wing', crest: { shape: 'hex', pattern: 'band', symbol: 'P' }, ground: 'Parc des Princes' },
];

// the fictional clubs of earlier versions, mapped to the real club in the same tier slot
// (old careers and links keep working)
export const LEGACY_IDS = {
  millbrook: 'swindon', ashford: 'chesterfield', kettle: 'bromley', harbour: 'grimsby',
  oldbridge: 'bradford', fenwick: 'barnsley', stonegate: 'wigan', crowmere: 'plymouth',
  redcliffe: 'westham', northvale: 'wolves', easthaven: 'southampton', marlow: 'swansea',
  kingsport: 'mancity', westmoor: 'arsenal', ironside: 'liverpool', solace: 'chelsea',
  valmonte: 'realmadrid', nordhavn: 'barcelona', castellan: 'bayern', aurelio: 'psg',
};

export const clubById = (id) => CLUBS.find((c) => c.id === id) || CLUBS.find((c) => c.id === LEGACY_IDS[id]);
export const clubsInTier = (t) => CLUBS.filter((c) => c.tier === t);
export const tierInfo = (t) => TIERS[t - 1];

// base strength for the league simulation and AI player attributes
export function clubStrength(c) {
  const idx = CLUBS.filter((x) => x.tier === c.tier).indexOf(c);
  return 38 + c.tier * 9 + (3 - idx) * 1.5;
}

// SVG crest built from simple shapes
export function crestSVG(c, size = 48) {
  const [a, b] = c.colors;
  const cr = c.crest;
  const clip = {
    shield: 'M6 4 H42 V22 C42 34 33 42 24 46 C15 42 6 34 6 22 Z',
    circle: 'M24 3 A21 21 0 1 1 23.99 3 Z',
    diamond: 'M24 2 L46 24 L24 46 L2 24 Z',
    hex: 'M14 4 H34 L45 24 L34 44 H14 L3 24 Z',
  }[cr.shape] || 'M6 4 H42 V22 C42 34 33 42 24 46 C15 42 6 34 6 22 Z';
  const id = `c${c.id}${size}`;
  let pat = '';
  switch (cr.pattern) {
    case 'chevron': pat = `<path d="M0 26 L24 12 L48 26 V34 L24 20 L0 34 Z" fill="${b}"/>`; break;
    case 'stripes': pat = [10, 22, 34].map((x) => `<rect x="${x}" y="0" width="6" height="48" fill="${b}"/>`).join(''); break;
    case 'half': pat = `<rect x="24" y="0" width="24" height="48" fill="${b}"/>`; break;
    case 'band': pat = `<rect x="0" y="18" width="48" height="10" fill="${b}"/>`; break;
    case 'quarters': pat = `<rect x="24" y="0" width="24" height="24" fill="${b}"/><rect x="0" y="24" width="24" height="24" fill="${b}"/>`; break;
    case 'crown': pat = `<path d="M13 16 L17 8 L21 14 L24 6 L27 14 L31 8 L35 16 Z" fill="${b}"/>`; break;
    default: break;
  }
  const lum = (h) => { const n = parseInt(h.slice(1), 16); return ((n >> 16) * 0.3 + ((n >> 8) & 255) * 0.59 + (n & 255) * 0.11) / 255; };
  const txt = lum(a) > 0.6 ? '#111' : '#fff';
  return `<svg class="crest" width="${size}" height="${size}" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="${id}"><path d="${clip}"/></clipPath></defs><g clip-path="url(#${id})"><rect width="48" height="48" fill="${a}"/>${pat}</g><path d="${clip}" fill="none" stroke="#111" stroke-width="2.5"/><text x="24" y="${cr.pattern === 'crown' ? 36 : 31}" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="15" text-anchor="middle" fill="${txt}" stroke="${txt === '#fff' ? '#111' : '#fff'}" stroke-width="0.6">${cr.symbol}</text></svg>`;
}

export const NATIONALITIES = ['England', 'Scotland', 'Wales', 'Ireland', 'France', 'Spain', 'Portugal', 'Italy', 'Germany', 'Netherlands', 'Belgium', 'Denmark', 'Norway', 'Sweden', 'Poland', 'Croatia', 'Serbia', 'Greece', 'Turkey', 'Morocco', 'Nigeria', 'Ghana', 'Senegal', 'Egypt', 'Brazil', 'Argentina', 'Uruguay', 'Colombia', 'Mexico', 'USA', 'Canada', 'Japan', 'South Korea', 'Australia'];

const FIRST = ['Alex', 'Sam', 'Jordan', 'Luca', 'Mateo', 'Noah', 'Kai', 'Theo', 'Rafa', 'Idris', 'Tomas', 'Jonas', 'Emil', 'Kofi', 'Yusuf', 'Diego', 'Ben', 'Oscar', 'Leo', 'Marco', 'Hugo', 'Ruben', 'Nico', 'Arlo', 'Felix', 'Ade', 'Kenji', 'Milo', 'Sven', 'Ivo'];
const LAST = ['Hart', 'Moreno', 'Okafor', 'Lindqvist', 'Bennett', 'Costa', 'Novak', 'Reyes', 'Walsh', 'Kowalski', 'Mensah', 'Rossi', 'Dubois', 'Larsen', 'Silva', 'Ibrahim', 'Clarke', 'Varga', 'Tanaka', 'Moss', 'Keane', 'Adeyemi', 'Brandt', 'Petrov', 'Ferreira', 'Holt', 'Quinn', 'Sato', 'Doyle', 'Marsh'];

export function squadName(clubId, slot) {
  let h = 0;
  for (const ch of clubId) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const f = FIRST[(h + slot * 7) % FIRST.length], l = LAST[(h * 3 + slot * 11) % LAST.length];
  return `${f[0]}. ${l}`;
}
