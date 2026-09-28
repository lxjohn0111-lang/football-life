// 20 fictional clubs across 5 prestige tiers. Crests are built from simple
// shapes at runtime (SVG), kits and playing styles are data.
export const TIERS = [
  { tier: 1, league: 'Parkside League', venue: 'community', label: 'Community' },
  { tier: 2, league: 'County Division', venue: 'town', label: 'Town' },
  { tier: 3, league: 'Regional Championship', venue: 'regional', label: 'Regional' },
  { tier: 4, league: 'Premier Circuit', venue: 'premier', label: 'Premier' },
  { tier: 5, league: 'Continental Elite', venue: 'continental', label: 'Continental' },
];

// colors: [shirt, secondary/change shirt, shorts]
export const CLUBS = [
  { id: 'millbrook', name: 'Millbrook Rovers', short: 'MIL', tier: 1, colors: ['#1f8a4c', '#f5f5f0', '#f5f5f0'], style: 'wing', crest: { shape: 'shield', pattern: 'chevron', symbol: 'M' }, ground: 'Millbrook Rec' },
  { id: 'ashford', name: 'Ashford Athletic', short: 'ASH', tier: 1, colors: ['#c8102e', '#111111', '#111111'], style: 'direct', crest: { shape: 'circle', pattern: 'stripes', symbol: 'A' }, ground: 'Station Lane' },
  { id: 'kettle', name: 'Kettle Lane FC', short: 'KET', tier: 1, colors: ['#f07c1b', '#1c2a4a', '#1c2a4a'], style: 'counter', crest: { shape: 'diamond', pattern: 'half', symbol: 'K' }, ground: 'Kettle Lane' },
  { id: 'harbour', name: 'Harbour Park Wanderers', short: 'HPW', tier: 1, colors: ['#5fb7e8', '#ffffff', '#ffffff'], style: 'possession', crest: { shape: 'shield', pattern: 'band', symbol: 'H' }, ground: 'Harbour Park' },

  { id: 'oldbridge', name: 'Oldbridge Town', short: 'OLD', tier: 2, colors: ['#7a1f3d', '#8ccdf0', '#ffffff'], style: 'possession', crest: { shape: 'shield', pattern: 'quarters', symbol: 'O' }, ground: 'Bridge Road' },
  { id: 'fenwick', name: 'Fenwick United', short: 'FEN', tier: 2, colors: ['#f2c500', '#111111', '#111111'], style: 'pressing', crest: { shape: 'circle', pattern: 'band', symbol: 'F' }, ground: 'Fenwick Meadow' },
  { id: 'stonegate', name: 'Stonegate Albion', short: 'STA', tier: 2, colors: ['#1d2f6f', '#ffffff', '#ffffff'], style: 'direct', crest: { shape: 'hex', pattern: 'chevron', symbol: 'S' }, ground: 'The Gatehouse' },
  { id: 'crowmere', name: 'Crowmere City', short: 'CRO', tier: 2, colors: ['#6b3fa0', '#e8c547', '#ffffff'], style: 'wing', crest: { shape: 'diamond', pattern: 'stripes', symbol: 'C' }, ground: 'Crowmere Park' },

  { id: 'redcliffe', name: 'Redcliffe County', short: 'RED', tier: 3, colors: ['#d62828', '#ffffff', '#ffffff'], style: 'pressing', crest: { shape: 'shield', pattern: 'stripes', symbol: 'R' }, ground: 'Cliffside Stadium' },
  { id: 'northvale', name: 'Northvale Forest', short: 'NVF', tier: 3, colors: ['#1b5e3a', '#f2f2f2', '#f2f2f2'], style: 'counter', crest: { shape: 'circle', pattern: 'chevron', symbol: 'N' }, ground: 'Vale Ground' },
  { id: 'easthaven', name: 'Easthaven Rangers', short: 'EHR', tier: 3, colors: ['#1565c0', '#ffffff', '#ffffff'], style: 'wing', crest: { shape: 'hex', pattern: 'half', symbol: 'E' }, ground: 'Haven Road' },
  { id: 'marlow', name: 'Marlow Heath', short: 'MAR', tier: 3, colors: ['#1a1a1a', '#f4f4f4', '#1a1a1a'], style: 'possession', crest: { shape: 'shield', pattern: 'quarters', symbol: 'M' }, ground: 'Heath Lane' },

  { id: 'kingsport', name: 'Kingsport Royals', short: 'KIN', tier: 4, colors: ['#2446c7', '#f2c14e', '#ffffff'], style: 'possession', crest: { shape: 'circle', pattern: 'crown', symbol: 'K' }, ground: 'Royal Park' },
  { id: 'westmoor', name: 'Westmoor Athletic', short: 'WES', tier: 4, colors: ['#f4f4f4', '#111111', '#111111'], style: 'pressing', crest: { shape: 'shield', pattern: 'band', symbol: 'W' }, ground: 'Moorside Arena' },
  { id: 'ironside', name: 'Ironside FC', short: 'IRO', tier: 4, colors: ['#5d6470', '#e0352b', '#e0352b'], style: 'direct', crest: { shape: 'hex', pattern: 'stripes', symbol: 'I' }, ground: 'The Foundry' },
  { id: 'solace', name: 'Solace Bay', short: 'SOL', tier: 4, colors: ['#0f8b8d', '#f58a07', '#ffffff'], style: 'wing', crest: { shape: 'diamond', pattern: 'chevron', symbol: 'S' }, ground: 'Bayfront Arena' },

  { id: 'valmonte', name: 'Valmonte Sporting', short: 'VAL', tier: 5, colors: ['#f5f5f5', '#6a2c91', '#6a2c91'], style: 'possession', crest: { shape: 'shield', pattern: 'crown', symbol: 'V' }, ground: 'Estadio Valmonte' },
  { id: 'nordhavn', name: 'Nordhavn Kickers', short: 'NOR', tier: 5, colors: ['#d7263d', '#ffffff', '#ffffff'], style: 'pressing', crest: { shape: 'circle', pattern: 'half', symbol: 'N' }, ground: 'Nordhavn Arena' },
  { id: 'castellan', name: 'Castellan Imperial', short: 'CAS', tier: 5, colors: ['#141414', '#d4af37', '#141414'], style: 'counter', crest: { shape: 'hex', pattern: 'crown', symbol: 'C' }, ground: 'Imperial Bowl' },
  { id: 'aurelio', name: 'Aurelio Club', short: 'AUR', tier: 5, colors: ['#7cc6f2', '#10265c', '#10265c'], style: 'wing', crest: { shape: 'shield', pattern: 'stripes', symbol: 'A' }, ground: 'Porto Aurelio' },
];

export const clubById = (id) => CLUBS.find((c) => c.id === id);
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
