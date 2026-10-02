// Versioned career save with a backup copy and corruption detection.
import { CAREER_VERSION } from './career.js';
import { clubById, LEGACY_IDS } from './clubs.js';
import { storage } from '../core/storage.js';

const KEY = 'firsttouch.career';
const BACKUP = 'firsttouch.career.backup';

function checksum(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(16);
}

function validate(c) {
  if (!c || typeof c !== 'object') return false;
  if (!c.player || typeof c.player.name !== 'string' || !c.player.attrs) return false;
  if (!clubById(c.clubId) || !c.season || !Array.isArray(c.season.fixtures) || !Array.isArray(c.season.table)) return false;
  if (!c.totals || !Array.isArray(c.timeline) || !Array.isArray(c.committed)) return false;
  return true;
}

// upgrade older save versions in place
function migrate(c, fromVersion) {
  if (fromVersion < 2) {
    c.flags = c.flags || {};
    c.earnings = c.earnings || 0;
    c.trophies = c.trophies || [];
  }
  c.version = CAREER_VERSION;
  return c;
}

function parse(raw) {
  const env = JSON.parse(raw);
  if (!env || typeof env.data !== 'string' || checksum(env.data) !== env.sum) throw new Error('checksum mismatch');
  // careers from before the real clubs: every old club id becomes its real club
  let text = env.data;
  for (const [o, n] of Object.entries(LEGACY_IDS)) text = text.split(`"${o}"`).join(`"${n}"`);
  const data = JSON.parse(text);
  const v = env.version || 1;
  if (v > CAREER_VERSION) throw new Error('save from a newer version');
  const c = migrate(data, v);
  if (!validate(c)) throw new Error('invalid career data');
  return c;
}

export class CareerStore {
  constructor() {
    this.career = null;
    this.notice = null;
    this.load();
  }

  load() {
    let raw = null;
    try { raw = storage.getItem(KEY); } catch (e) { this.notice = { bad: true, text: 'Saving is unavailable in this browser (storage blocked). Progress will not persist.' }; return; }
    if (!raw) return;
    try {
      this.career = parse(raw);
    } catch (e) {
      let backup = null;
      try { backup = storage.getItem(BACKUP); } catch (e2) { /* ignore */ }
      try {
        if (!backup) throw new Error('no backup');
        this.career = parse(backup);
        this.notice = { bad: true, text: 'Your career save was damaged, so the backup copy was restored.' };
        this.save();
      } catch (e3) {
        this.career = null;
        this.corrupt = raw;
        this.notice = { bad: true, text: 'Your career save was damaged and no usable backup exists. Start a new career to continue.' };
      }
    }
  }

  // returns { ok, error }
  save() {
    if (!this.career) return { ok: false, error: 'no career' };
    try {
      const data = JSON.stringify(this.career);
      const env = JSON.stringify({ version: CAREER_VERSION, savedAt: Date.now(), sum: checksum(data), data });
      const prev = storage.getItem(KEY);
      if (prev) {
        // keep the last good save as the backup
        try { parse(prev); storage.setItem(BACKUP, prev); } catch (e) { /* previous save unreadable: keep old backup */ }
      }
      storage.setItem(KEY, env);
      return { ok: true };
    } catch (e) {
      const full = e && (e.name === 'QuotaExceededError' || /dataLimitExc/i.test(e.code || e.message || ''));
      return { ok: false, error: full ? 'The save storage is full.' : 'Saving is unavailable right now.' };
    }
  }

  set(c) { this.career = c; return this.save(); }

  erase() {
    this.career = null;
    try { storage.removeItem(KEY); } catch (e) { /* ignore */ }
  }
}
