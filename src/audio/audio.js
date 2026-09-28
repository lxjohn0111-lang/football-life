// All sounds are synthesised at load time and pre-rendered to AudioBuffers, so
// a kick plays on the same frame as the simulated foot-to-ball contact.
const SR = 44100;

function mkRand(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 2147483648 - 1; }; }

function onePoleLP(buf, cutoff) {
  const a = Math.exp(-2 * Math.PI * cutoff / SR);
  let y = 0;
  for (let i = 0; i < buf.length; i++) { y = (1 - a) * buf[i] + a * y; buf[i] = y; }
}
function onePoleHP(buf, cutoff) {
  const a = Math.exp(-2 * Math.PI * cutoff / SR);
  let y = 0, px = 0;
  for (let i = 0; i < buf.length; i++) { const x = buf[i]; y = a * (y + x - px); px = x; buf[i] = y; }
}
function bandpass(buf, f, q) {
  // RBJ biquad band-pass
  const w = 2 * Math.PI * f / SR, al = Math.sin(w) / (2 * q), c = Math.cos(w);
  const b0 = al, b2 = -al, a0 = 1 + al, a1 = -2 * c, a2 = 1 - al;
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < buf.length; i++) {
    const x = buf[i];
    const y = (b0 * x + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x; y2 = y1; y1 = y; buf[i] = y;
  }
}
function normalize(buf, peak = 0.9) {
  let m = 0;
  for (let i = 0; i < buf.length; i++) m = Math.max(m, Math.abs(buf[i]));
  if (m > 0) for (let i = 0; i < buf.length; i++) buf[i] *= peak / m;
  return buf;
}

// ---------------------------------------------------------------- recipes
function kick(dur, f0, f1, click, noiseAmt, seed) {
  const n = Math.floor(SR * dur), b = new Float32Array(n), r = mkRand(seed);
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const f = f1 + (f0 - f1) * Math.exp(-t * 38);
    ph += 2 * Math.PI * f / SR;
    const env = Math.exp(-t * (dur > 0.12 ? 26 : 40));
    b[i] = Math.sin(ph) * env + r() * noiseAmt * Math.exp(-t * 140) + (i < SR * 0.004 ? r() * click : 0);
  }
  onePoleLP(b, 5000);
  return normalize(b, 0.95);
}
function clang(seed) {
  const n = Math.floor(SR * 1.2), b = new Float32Array(n), r = mkRand(seed);
  const parts = [[523, 1], [1320, 0.6], [2130, 0.45], [3310, 0.3], [4870, 0.2]];
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let v = 0;
    for (const [f, a] of parts) v += Math.sin(2 * Math.PI * f * t) * a * Math.exp(-t * (3 + f / 900));
    b[i] = v + r() * 0.3 * Math.exp(-t * 120);
  }
  return normalize(b, 0.8);
}
function noiseBurst(dur, lp, hp, attack, decay, seed) {
  const n = Math.floor(SR * dur), b = new Float32Array(n), r = mkRand(seed);
  for (let i = 0; i < n; i++) { const t = i / SR; b[i] = r() * Math.min(1, t / attack) * Math.exp(-t * decay); }
  if (lp) onePoleLP(b, lp);
  if (hp) onePoleHP(b, hp);
  return normalize(b, 0.8);
}
function whistle(pattern) {
  const n = Math.floor(SR * pattern.reduce((a, [d, g]) => a + d + g, 0)), b = new Float32Array(n);
  let i0 = 0;
  for (const [d, gap] of pattern) {
    const len = Math.floor(SR * d);
    let ph = 0;
    for (let i = 0; i < len; i++) {
      const t = i / SR;
      const f = 2950 + 90 * Math.sin(2 * Math.PI * 28 * t) + 40 * Math.sin(2 * Math.PI * 7 * t);
      ph += 2 * Math.PI * f / SR;
      const env = Math.min(1, t / 0.02) * Math.min(1, (d - t) / 0.04);
      b[i0 + i] = (Math.sin(ph) * 0.7 + Math.sin(ph * 2) * 0.12) * env;
    }
    i0 += len + Math.floor(SR * gap);
  }
  return normalize(b, 0.55);
}
function crowdLoop(seed, dur = 6) {
  const n = Math.floor(SR * dur), b = new Float32Array(n), r = mkRand(seed);
  for (let i = 0; i < n; i++) b[i] = r();
  const voices = new Float32Array(n);
  // murmur: several band-passed noise layers with slow amplitude drift
  for (const [f, q, g] of [[420, 1.2, 1], [900, 1.5, 0.8], [1800, 2, 0.4], [260, 0.9, 0.7]]) {
    const layer = b.slice();
    bandpass(layer, f, q);
    const ph = r() * 6;
    for (let i = 0; i < n; i++) voices[i] += layer[i] * g * (0.75 + 0.25 * Math.sin(2 * Math.PI * (i / n) * 3 + ph));
  }
  // seamless loop: crossfade the ends
  const fade = Math.floor(SR * 0.5);
  for (let i = 0; i < fade; i++) { const t = i / fade; voices[i] = voices[i] * t + voices[n - fade + i] * (1 - t); }
  return normalize(voices.subarray(0, n - fade), 0.6);
}
function cheer(seed, dur = 3.2) {
  const n = Math.floor(SR * dur), b = new Float32Array(n), r = mkRand(seed);
  for (let i = 0; i < n; i++) b[i] = r();
  const out = new Float32Array(n);
  for (const [f, q, g] of [[700, 1.4, 1], [1300, 1.8, 0.7], [2500, 2.2, 0.35], [380, 1, 0.6]]) {
    const layer = b.slice(); bandpass(layer, f, q);
    for (let i = 0; i < n; i++) out[i] += layer[i] * g;
  }
  for (let i = 0; i < n; i++) { const t = i / SR; out[i] *= Math.min(1, t / 0.25) * Math.exp(-Math.max(0, t - 1.2) * 1.3); }
  return normalize(out, 0.85);
}
function groan(seed) {
  const n = Math.floor(SR * 1.6), b = new Float32Array(n), r = mkRand(seed);
  for (let i = 0; i < n; i++) b[i] = r();
  const out = new Float32Array(n);
  for (let v = 0; v < 3; v++) {
    const layer = b.slice(); bandpass(layer, 380 + v * 180, 3);
    for (let i = 0; i < n; i++) out[i] += layer[i];
  }
  for (let i = 0; i < n; i++) { const t = i / SR; out[i] *= Math.min(1, t / 0.15) * Math.exp(-t * 1.6) * (1 - 0.3 * t / 1.6); }
  return normalize(out, 0.7);
}
function blip(f, dur, seed) {
  const n = Math.floor(SR * dur), b = new Float32Array(n);
  for (let i = 0; i < n; i++) { const t = i / SR; b[i] = Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 30) * Math.min(1, t / 0.003); }
  void seed;
  return normalize(b, 0.5);
}
function shout(seed) {
  // a short "hey!" style call made from a formant-filtered buzz
  const n = Math.floor(SR * 0.28), src = new Float32Array(n);
  let ph = 0;
  for (let i = 0; i < n; i++) { const t = i / SR; const f = 210 - 60 * t; ph += f / SR; src[i] = (ph % 1) * 2 - 1; }
  const out = new Float32Array(n);
  for (const [f, q, g] of [[650, 5, 1], [1700, 7, 0.6], [2600, 8, 0.3]]) {
    const layer = src.slice(); bandpass(layer, f, q);
    for (let i = 0; i < n; i++) out[i] += layer[i] * g;
  }
  for (let i = 0; i < n; i++) { const t = i / SR; out[i] *= Math.min(1, t / 0.02) * Math.exp(-t * 7); }
  void seed;
  return normalize(out, 0.6);
}

export class AudioSystem {
  constructor() {
    this.ctx = null;
    this.buffers = {};
    this.vol = { master: 0.8, sfx: 0.9, crowd: 0.6 };
    this.ready = false;
    this.crowdLevel = 0.3;
    this.muted = false;
  }

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try { this.ctx = new AC({ latencyHint: 'interactive' }); } catch (e) { return; }
    const c = this.ctx;
    this.master = c.createGain();
    this.sfx = c.createGain();
    this.crowd = c.createGain();
    this.sfx.connect(this.master); this.crowd.connect(this.master); this.master.connect(c.destination);
    const defs = {
      touch: kick(0.07, 260, 120, 0.25, 0.25, 1),
      pass: kick(0.1, 220, 90, 0.5, 0.35, 2),
      shot: kick(0.16, 190, 60, 1.0, 0.7, 3),
      bounce: kick(0.08, 140, 70, 0.1, 0.1, 4),
      post: clang(5),
      net: noiseBurst(0.6, 3000, 400, 0.01, 7, 6),
      tackle: noiseBurst(0.18, 1800, 120, 0.004, 22, 7),
      slide: noiseBurst(0.55, 2400, 500, 0.03, 5, 8),
      catch: kick(0.1, 160, 80, 0.6, 0.6, 9),
      whistle: whistle([[0.32, 0]]),
      whistleLong: whistle([[0.3, 0.12], [0.3, 0.12], [0.75, 0]]),
      crowd: crowdLoop(10),
      cheer: cheer(11),
      groan: groan(12),
      ui: blip(1400, 0.06, 13),
      ack: blip(1900, 0.09, 14),
      shout: shout(15),
    };
    for (const [k, data] of Object.entries(defs)) {
      const buf = c.createBuffer(1, data.length, SR);
      buf.copyToChannel(data, 0);
      this.buffers[k] = buf;
    }
    this.applyVolumes();
    this.ready = true;
  }

  resume() { if (this.ctx && this.ctx.state !== 'running' && !this.muted) this.ctx.resume().catch(() => {}); }
  suspend() { if (this.ctx && this.ctx.state === 'running') this.ctx.suspend().catch(() => {}); }
  setMuted(m) { this.muted = m; if (m) this.suspend(); else this.resume(); }

  setVolumes(v) { Object.assign(this.vol, v); this.applyVolumes(); }
  applyVolumes() {
    if (!this.ctx) return;
    this.master.gain.value = this.vol.master;
    this.sfx.gain.value = this.vol.sfx;
    this.crowd.gain.value = this.vol.crowd;
  }

  play(name, o = {}) {
    if (!this.ready || this.ctx.state !== 'running') return;
    const buf = this.buffers[name];
    if (!buf) return;
    const c = this.ctx;
    const src = c.createBufferSource();
    src.buffer = buf;
    if (o.rate) src.playbackRate.value = o.rate;
    const g = c.createGain();
    g.gain.value = o.gain ?? 1;
    let node = g;
    if (o.pan && c.createStereoPanner) {
      const p = c.createStereoPanner();
      p.pan.value = Math.max(-1, Math.min(1, o.pan));
      g.connect(p); node = p;
    }
    src.connect(g);
    node.connect(o.group === 'crowd' ? this.crowd : this.sfx);
    src.start();
    return src;
  }

  startCrowd(level = 0.4) {
    if (!this.ready) return;
    this.stopCrowd();
    const c = this.ctx;
    this.crowdSrc = c.createBufferSource();
    this.crowdSrc.buffer = this.buffers.crowd;
    this.crowdSrc.loop = true;
    this.crowdGain = c.createGain();
    this.crowdGain.gain.value = 0;
    this.crowdSrc.connect(this.crowdGain).connect(this.crowd);
    this.crowdSrc.start();
    this.baseCrowd = level;
    this.setExcitement(0);
  }
  stopCrowd() {
    if (this.crowdSrc) { try { this.crowdSrc.stop(); } catch (e) { /* already stopped */ } this.crowdSrc.disconnect(); this.crowdSrc = null; }
  }
  setExcitement(x) {
    if (!this.crowdGain) return;
    const v = this.baseCrowd * (0.45 + 0.9 * Math.min(1, x));
    this.crowdGain.gain.setTargetAtTime(v, this.ctx.currentTime, 0.4);
  }
}
