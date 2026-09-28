// Versioned career save with a backup copy and corruption detection.
import { CAREER_VERSION } from './career.js';
import { clubById } from './clubs.js';

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
  const data = JSON.parse(env.data);
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
    try { raw = localStorage.getItem(KEY); } catch (e) { this.notice = { bad: true, text: 'Saving is unavailable in this browser (storage blocked). Progress will not persist.' }; return; }
    if (!raw) return;
    try {
      this.career = parse(raw);
    } catch (e) {
      let backup = null;
      try { backup = localStorage.getItem(BACKUP); } catch (e2) { /* ignore */ }
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
      const prev = localStorage.getItem(KEY);
      if (prev) {
        // keep the last good save as the backup
        try { parse(prev); localStorage.setItem(BACKUP, prev); } catch (e) { /* previous save unreadable: keep old backup */ }
      }
      localStorage.setItem(KEY, env);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e && e.name === 'QuotaExceededError' ? 'Browser storage is full.' : 'Browser storage is unavailable.' };
    }
  }

  set(c) { this.career = c; return this.save(); }

  erase() {
    this.career = null;
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  }
}
