// 7v7 shapes. u: -1 own goal line .. +1 opponent goal line, v: +1 team's left .. -1 right.
export const FORMATIONS = {
  '2-3-1': [
    { role: 'GK', u: -0.95, v: 0 },
    { role: 'DEF', u: -0.6, v: 0.36 },
    { role: 'DEF', u: -0.6, v: -0.36 },
    { role: 'W', u: 0.04, v: 0.68 },
    { role: 'CM', u: -0.22, v: 0 },
    { role: 'W', u: 0.04, v: -0.68 },
    { role: 'ST', u: 0.36, v: 0 },
  ],
  '2-2-1-1': [
    { role: 'GK', u: -0.95, v: 0 },
    { role: 'DEF', u: -0.6, v: 0.38 },
    { role: 'DEF', u: -0.6, v: -0.38 },
    { role: 'CM', u: -0.24, v: 0.34 },
    { role: 'CM', u: -0.24, v: -0.34 },
    { role: 'AM', u: 0.1, v: 0 },
    { role: 'ST', u: 0.4, v: 0 },
  ],
  '3-2-1': [
    { role: 'GK', u: -0.95, v: 0 },
    { role: 'DEF', u: -0.58, v: 0.5 },
    { role: 'DEF', u: -0.66, v: 0 },
    { role: 'DEF', u: -0.58, v: -0.5 },
    { role: 'CM', u: -0.14, v: 0.33 },
    { role: 'CM', u: -0.14, v: -0.33 },
    { role: 'ST', u: 0.38, v: 0 },
  ],
  '2-1-2-1': [
    { role: 'GK', u: -0.95, v: 0 },
    { role: 'DEF', u: -0.6, v: 0.36 },
    { role: 'DEF', u: -0.6, v: -0.36 },
    { role: 'CM', u: -0.3, v: 0 },
    { role: 'AM', u: 0.08, v: 0.42 },
    { role: 'AM', u: 0.08, v: -0.42 },
    { role: 'ST', u: 0.4, v: 0 },
  ],
};

export const STYLES = {
  possession: { formation: '2-2-1-1', passShort: 0.25, cross: 0.05, press: 0.0, line: 0.0, width: 1.0, dribble: 0.0, tempo: 0.9, label: 'Patient possession' },
  direct: { formation: '3-2-1', passShort: -0.2, cross: 0.1, press: -0.05, line: -0.04, width: 0.95, dribble: 0.05, tempo: 1.1, label: 'Direct football' },
  wing: { formation: '2-3-1', passShort: 0.0, cross: 0.3, press: 0.0, line: 0.0, width: 1.15, dribble: 0.12, tempo: 1.0, label: 'Wing play' },
  pressing: { formation: '2-3-1', passShort: 0.1, cross: 0.05, press: 0.25, line: 0.08, width: 1.0, dribble: 0.05, tempo: 1.15, label: 'High pressing' },
  counter: { formation: '3-2-1', passShort: -0.1, cross: 0.05, press: -0.15, line: -0.1, width: 0.9, dribble: 0.15, tempo: 1.05, label: 'Counter attack' },
};

// Pick a formation that contains the human's position.
export function formationFor(style, humanRole) {
  const base = (STYLES[style] || STYLES.wing).formation;
  if (!humanRole) return base;
  if (FORMATIONS[base].some((s) => s.role === humanRole)) return base;
  if (humanRole === 'AM') return '2-2-1-1';
  return '2-3-1';
}

export const ROLE_BOUNDS = {
  GK: [-1, -0.7],
  DEF: [-0.9, 0.3],
  CM: [-0.75, 0.6],
  AM: [-0.5, 0.82],
  W: [-0.6, 0.86],
  ST: [-0.3, 0.9],
};
