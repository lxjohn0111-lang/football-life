// Builds match team configurations from clubs (AI squads + the human player).
import { clubStrength, squadName } from './clubs.js';
import { FORMATIONS, formationFor } from '../sim/formations.js';
import { Rng, hashString } from '../sim/rng.js';

const ROLE_BONUS = {
  GK: {},
  DEF: { tackling: 7, stamina: 2, pace: 1 },
  CM: { passing: 5, stamina: 4, control: 1 },
  AM: { passing: 4, control: 4, finishing: 1 },
  W: { pace: 6, control: 3 },
  ST: { finishing: 6, pace: 3 },
};
const NUMBERS = { GK: [1], DEF: [2, 5, 4, 3], CM: [6, 8, 4], AM: [10, 8], W: [7, 11], ST: [9, 10] };

export function attrsFor(role, base, rng) {
  const a = {};
  for (const k of ['pace', 'stamina', 'control', 'passing', 'finishing', 'tackling']) a[k] = Math.round(base + rng.range(-4, 4) + (ROLE_BONUS[role][k] || 0) - (k === 'tackling' && (role === 'ST' || role === 'W') ? 6 : 0) - (k === 'finishing' && role === 'DEF' ? 6 : 0));
  return a;
}

export function buildTeamConfig(club, o = {}) {
  const human = o.human || null;
  const rng = new Rng(hashString(club.id + (o.seed || '')));
  const base = o.strength ?? clubStrength(club);
  const formation = formationFor(club.style, human ? human.role : null);
  const slots = FORMATIONS[formation];
  const used = new Set();
  if (human) used.add(human.number);
  const players = slots.map((s, i) => {
    const cands = NUMBERS[s.role] || [i + 1];
    let num = cands.find((n) => !used.has(n));
    if (num == null) { num = 12; while (used.has(num)) num++; }
    used.add(num);
    return {
      role: s.role, number: num, name: squadName(club.id, i),
      attrs: attrsFor(s.role, base, rng), keeping: Math.round(base + 4 + rng.range(-3, 3)),
      foot: rng.next() < 0.78 ? 'R' : 'L',
    };
  });
  if (human) {
    const idx = players.findIndex((p) => p.role === human.role);
    const k = idx >= 0 ? idx : players.findIndex((p) => p.role !== 'GK');
    // free the human's number if an AI took it
    players[k] = { role: human.role, number: human.number, name: human.name, attrs: { ...human.attrs }, foot: human.foot || 'R', isHuman: true, look: human.look };
  }
  return { name: club.name, short: club.short, tier: club.tier, style: club.style, formation, players, clubId: club.id };
}

export function defaultPlayer() {
  return {
    name: 'A. Newcomer', number: 9, nationality: 'England', foot: 'R', role: 'ST',
    attrs: { pace: 52, stamina: 50, control: 50, passing: 48, finishing: 54, tackling: 42 },
    look: { skin: '#e0b48c', hair: '#3b2a1e', boots: '#111111' },
  };
}
