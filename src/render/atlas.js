// Generated canvas textures: an alpha atlas for shirt numbers and stadium words,
// and the live scoreboard screen. Nothing is loaded from disk.
import * as THREE from 'three';

const W = 1024, H = 1024;

export class Atlas {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = W; this.canvas.height = H;
    this.ctx = this.canvas.getContext('2d');
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.anisotropy = 4;
    this.words = new Map();
    this.reset();
  }

  reset() {
    const c = this.ctx;
    c.clearRect(0, 0, W, H);
    c.fillStyle = '#fff';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.font = 'bold 88px "Arial Black", Arial, Helvetica, sans-serif';
    for (let d = 0; d < 10; d++) c.fillText(String(d), d * 64 + 32, 52);
    this.words.clear();
    this.slot = 0;
    this.texture.needsUpdate = true;
  }

  rect(x, y, w, h) { return [x / W, 1 - (y + h) / H, (x + w) / W, 1 - y / H]; }

  digit(d) { return this.rect(d * 64 + 6, 4, 52, 96); }

  word(text) {
    if (this.words.has(text)) return this.words.get(text);
    const col = this.slot % 2, row = Math.floor(this.slot / 2);
    if (row > 13) return this.rect(0, 0, 1, 1);
    this.slot++;
    const x = col * 512, y = 112 + row * 64;
    const c = this.ctx;
    c.save();
    c.clearRect(x, y, 512, 64);
    c.fillStyle = '#fff';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    let size = 46;
    c.font = `bold ${size}px "Arial Black", Arial, Helvetica, sans-serif`;
    while (c.measureText(text).width > 496 && size > 14) { size -= 2; c.font = `bold ${size}px "Arial Black", Arial, Helvetica, sans-serif`; }
    c.fillText(text, x + 256, y + 33);
    c.restore();
    const r = this.rect(x + 2, y + 2, 508, 60);
    this.words.set(text, r);
    this.texture.needsUpdate = true;
    return r;
  }
}

export class ScoreboardTexture {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 512; this.canvas.height = 192;
    this.ctx = this.canvas.getContext('2d');
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.key = '';
  }
  update(home, away, score, clock, style, final = false) {
    const key = `${home}|${away}|${score}|${clock}|${style}|${final}`;
    if (key === this.key) return;
    this.key = key;
    const c = this.ctx;
    const neo = style === 'neo';
    c.fillStyle = neo ? '#111' : '#f6f5ef';
    c.fillRect(0, 0, 512, 192);
    c.strokeStyle = neo ? '#ffd23f' : '#222';
    c.lineWidth = neo ? 10 : 4;
    c.strokeRect(8, 8, 496, 176);
    c.fillStyle = neo ? '#fff' : '#161616';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = 'bold 40px "Arial Black", Arial, sans-serif';
    c.fillText(home, 128, 52);
    c.fillText(away, 384, 52);
    c.font = 'bold 72px "Arial Black", Arial, sans-serif';
    c.fillStyle = neo ? '#ffd23f' : '#161616';
    c.fillText(`${score[0]}  -  ${score[1]}`, 256, 112);
    c.font = 'bold 30px Arial, sans-serif';
    c.fillStyle = neo ? '#3ee0ff' : '#444';
    c.fillText(final ? 'FINAL' : clock, 256, 162);
    this.texture.needsUpdate = true;
  }
}
