// Shared helpers for headless simulation tests.
import { Match } from '../src/sim/match.js';
import { HumanController } from '../src/sim/human.js';

export function makeTeam(name, tier, style, opts = {}) {
  const roles = ['GK', 'DEF', 'DEF', 'CM', 'W', 'W', 'ST'];
  const base = 40 + tier * 8;
  const players = roles.map((role, i) => ({
    role, number: i + 1, name: `${name} ${i + 1}`,
    attrs: { pace: base, stamina: base, control: base, passing: base, finishing: base, tackling: base },
    keeping: base, foot: 'R',
  }));
  if (opts.human) {
    let idx = players.findIndex((p) => p.role === opts.human.role);
    if (idx < 0) idx = players.findIndex((p) => p.role === 'CM');
    players[idx] = { ...players[idx], ...opts.human, isHuman: true, name: 'Hero' };
  }
  return { name, short: name.slice(0, 3).toUpperCase(), tier, style, players, kit: {} };
}

export function makeMatch(o = {}) {
  const m = new Match({
    seed: o.seed ?? 7,
    halfLength: o.halfLength ?? 180,
    difficulty: o.difficulty ?? 'assisted',
    teams: [makeTeam('Home', o.tier ?? 1, o.style0 ?? 'wing', { human: o.human }), makeTeam('Away', o.tier ?? 1, o.style1 ?? 'possession')],
  });
  if (m.human) m.humanCtl = new HumanController(m, m.human);
  return m;
}
