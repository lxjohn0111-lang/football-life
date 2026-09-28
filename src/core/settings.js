// Settings persisted in localStorage (separately from the career save).
const KEY = 'firsttouch.settings.v1';
const STYLE_KEY = 'firsttouch.style';

export const DEFAULT_SETTINGS = {
  sensitivity: 1, invertY: false, fov: 85,
  master: 0.8, sfx: 0.9, crowd: 0.6,
  difficulty: 'assisted', bob: true, shake: true, quality: 'high', matchLength: 'normal',
};

export function loadSettings() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return { ...DEFAULT_SETTINGS };
  }
}
export function saveSettings(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); return true; } catch (e) { return false; }
}
export function loadStyle() {
  try { const s = localStorage.getItem(STYLE_KEY); return s === 'neo' || s === 'classic' ? s : 'classic'; } catch (e) { return 'classic'; }
}
export function saveStyle(s) {
  try { localStorage.setItem(STYLE_KEY, s); } catch (e) { /* storage unavailable: choice lasts for this session */ }
}
