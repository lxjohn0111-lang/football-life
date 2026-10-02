// Settings persisted in the game's storage (localStorage, or the CrazyGames data module),
// separately from the career save.
import { storage } from './storage.js';

const KEY = 'firsttouch.settings.v1';
const STYLE_KEY = 'firsttouch.style';

// Field of view is horizontal, in degrees: 60-200 (above 120 the wide projection is used).
export const FOV_MIN = 60, FOV_MAX = 200;
// rev 2: default FOV raised from 85 to 100; rev 3: touch screens default to look sensitivity 2.25
const SETTINGS_REV = 3;
export const TOUCH_SENSITIVITY = 2.25;

export const DEFAULT_SETTINGS = {
  rev: SETTINGS_REV,
  sensitivity: 1, invertY: false, fov: 100,
  master: 0.8, sfx: 0.9, crowd: 0.6,
  difficulty: 'assisted', bob: true, shake: true, quality: 'high', matchLength: 'normal',
  touch: 'auto', // on-screen touch controls: auto (touch screens), on, off
  replays: true, // slow-motion drone replay after every goal
};

export function hasSavedSettings() {
  try { return !!storage.getItem(KEY); } catch (e) { return false; }
}

// `touch`: the device has a touch screen as its main pointer (phones and tablets)
export function loadSettings(touch = false) {
  const fresh = () => ({ ...DEFAULT_SETTINGS, ...(touch ? { sensitivity: TOUCH_SENSITIVITY } : {}) });
  try {
    const raw = storage.getItem(KEY);
    if (!raw) return fresh();
    const s = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    // players still on the old default field of view move to the new one
    if ((s.rev || 1) < 2 && s.fov === 85) s.fov = DEFAULT_SETTINGS.fov;
    // touch players still on the old default look sensitivity move to the new one
    if ((s.rev || 1) < 3 && touch && s.sensitivity === 1) s.sensitivity = TOUCH_SENSITIVITY;
    s.rev = SETTINGS_REV;
    s.fov = Math.min(FOV_MAX, Math.max(FOV_MIN, Number(s.fov) || DEFAULT_SETTINGS.fov));
    return s;
  } catch (e) {
    return fresh();
  }
}
export function saveSettings(s) {
  try { storage.setItem(KEY, JSON.stringify(s)); return true; } catch (e) { return false; }
}
export function loadStyle() {
  try { const s = storage.getItem(STYLE_KEY); return s === 'neo' || s === 'classic' ? s : 'classic'; } catch (e) { return 'classic'; }
}
export function saveStyle(s) {
  try { storage.setItem(STYLE_KEY, s); } catch (e) { /* storage unavailable: choice lasts for this session */ }
}
