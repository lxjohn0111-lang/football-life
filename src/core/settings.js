// Settings persisted in localStorage (separately from the career save).
const KEY = 'firsttouch.settings.v1';
const STYLE_KEY = 'firsttouch.style';

// Field of view is horizontal, in degrees: 60-200 (above 120 the wide projection is used).
export const FOV_MIN = 60, FOV_MAX = 200;
const SETTINGS_REV = 2; // rev 2: default FOV raised from 85 to 100

export const DEFAULT_SETTINGS = {
  rev: SETTINGS_REV,
  sensitivity: 1, invertY: false, fov: 100,
  master: 0.8, sfx: 0.9, crowd: 0.6,
  difficulty: 'assisted', bob: true, shake: true, quality: 'high', matchLength: 'normal',
};

export function loadSettings() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const s = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    // players still on the old default field of view move to the new one
    if ((s.rev || 1) < 2 && s.fov === 85) s.fov = DEFAULT_SETTINGS.fov;
    s.rev = SETTINGS_REV;
    s.fov = Math.min(FOV_MAX, Math.max(FOV_MIN, Number(s.fov) || DEFAULT_SETTINGS.fov));
    return s;
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
