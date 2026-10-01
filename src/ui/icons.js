// Small inline SVG icons for the interface (24 x 24, drawn with the current colour).
const P = {
  play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M21.2 12h-2.6M5.4 12H2.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3 5.5 5.5"/><circle cx="12" cy="12" r="6.6"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.4 9.3a2.7 2.7 0 1 1 3.9 2.4c-.8.4-1.3 1-1.3 1.9v.6"/><circle cx="12" cy="17.2" r=".9" fill="currentColor"/>',
  whistle: '<path d="M3 11.5h9.5a5.5 5.5 0 1 1-5.4 6.5H5a2 2 0 0 1-2-2z"/><path d="M12.5 11.5 18 6M15 4.5l1.5 1.5"/><circle cx="12.6" cy="16.5" r="1.6"/>',
  ball: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5l3.4 2.5-1.3 4h-4.2l-1.3-4z" fill="currentColor"/><path d="M12 3v4.5M15.4 10l4.3-1.6M14.1 14l2.6 3.8M9.9 14l-2.6 3.8M8.6 10 4.3 8.4"/>',
  cone: '<path d="M9.5 4h5l4 14h-13z"/><path d="M4 20h16M8 12h8"/>',
  trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v3M8 20h8l-1-3H9z"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" fill="currentColor"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  left: '<path d="M15 5l-7 7 7 7"/>',
  right: '<path d="M9 5l7 7-7 7"/>',
  home: '<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>',
  pause: '<path d="M8 5v14M16 5v14" stroke-width="3.4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  chart: '<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3"/>',
  swap: '<path d="M4 8h14l-3-3M20 16H6l3 3"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="M4.5 12.5l5 5 10-11"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  brush: '<path d="M14.5 4.5 19.5 9.5 11 18l-5-5zM6 13l-2 7 7-2"/>',
};

export function icon(name, size = 22) {
  return `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ''}</svg>`;
}
