// In-match HUD: score and clock at the top, rating and stamina, a small
// crosshair, contextual hints, short notifications, an off-screen ball arrow
// and a radar that keeps the player's team attacking upwards.
import * as THREE from 'three';
import { PITCH, GOAL, AREA } from '../sim/constants.js';

const el = (tag, cls, parent, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  if (parent) parent.appendChild(e);
  return e;
};

export class Hud {
  constructor(root) {
    this.root = el('div', 'hud hidden', root);
    const top = el('div', 'hud-top', this.root);
    this.teamA = el('span', 'hud-team', top);
    this.score = el('span', 'hud-score', top, '0 - 0');
    this.teamB = el('span', 'hud-team', top);
    this.clock = el('div', 'hud-clock', this.root, '00:00');
    this.phase = el('div', 'hud-phase', this.root);
    const tl = el('div', 'hud-player', this.root);
    this.ratingEl = el('div', 'hud-rating', tl, '6.0');
    el('div', 'hud-rating-label', tl, 'RATING');
    const stam = el('div', 'hud-stamina', tl);
    this.stamFill = el('div', 'hud-stamina-fill', stam);
    this.nameEl = el('div', 'hud-name', tl);
    this.cross = el('div', 'hud-cross', this.root);
    this.power = el('div', 'hud-power hidden', this.root);
    this.powerFill = el('div', 'hud-power-fill', this.power);
    this.hint = el('div', 'hud-hint', this.root);
    this.notes = el('div', 'hud-notes', this.root);
    this.arrow = el('div', 'hud-arrow hidden', this.root);
    this.banner = el('div', 'hud-banner hidden', this.root);
    this.fade = el('div', 'hud-fade', this.root);
    this.radar = el('canvas', 'hud-radar', this.root);
    this.radar.width = 180; this.radar.height = 250;
    this.rctx = this.radar.getContext('2d');
    this.lastNotes = [];
    this.v = new THREE.Vector3();
    this.bannerUntil = 0;
    this.fadeUntil = 0;
  }

  show(on) { this.root.classList.toggle('hidden', !on); }

  notify(text, kind = '') {
    const n = el('div', 'hud-note ' + kind, this.notes, text);
    this.lastNotes.push(n);
    setTimeout(() => n.classList.add('out'), 1300);
    setTimeout(() => n.remove(), 1700);
    while (this.notes.children.length > 3) this.notes.firstChild.remove();
  }

  showBanner(text, sub = '', ms = 2200, kind = '') {
    this.banner.className = 'hud-banner ' + kind;
    this.banner.innerHTML = `<div class="b-main">${text}</div>${sub ? `<div class="b-sub">${sub}</div>` : ''}`;
    this.bannerUntil = performance.now() + ms;
  }

  flashFade() { this.fade.classList.remove('on'); void this.fade.offsetWidth; this.fade.classList.add('on'); }

  update(s) {
    const m = s.match;
    const h = m.human;
    this.teamA.textContent = m.teams[0].short;
    this.teamB.textContent = m.teams[1].short;
    this.teamA.style.setProperty('--kit', s.kitA || '#c00');
    this.teamB.style.setProperty('--kit', s.kitB || '#00c');
    this.score.textContent = `${m.teams[0].score} - ${m.teams[1].score}`;
    this.clock.textContent = s.clockText ?? m.displayClock;
    this.phase.textContent = s.phaseText || '';
    if (h) {
      this.ratingEl.textContent = m.stats.rating(h).toFixed(1);
      this.stamFill.style.width = `${Math.round(h.stamina * 100)}%`;
      this.stamFill.classList.toggle('low', h.stamina < 0.3);
      this.nameEl.textContent = `${h.number} ${h.name}`;
    }
    // shot power
    const a = h && h.action;
    const charging = a && a.type === 'kick' && (a.kind === 'shot' || a.kind === 'pass') && !a.contacted && a.charge > 0.01;
    const intentCharge = s.intentCharge || 0;
    this.power.classList.toggle('hidden', !(charging || intentCharge > 0.01));
    if (charging || intentCharge > 0.01) this.powerFill.style.width = `${Math.round((charging ? a.charge : intentCharge) * 100)}%`;
    this.hint.textContent = s.hint || '';
    this.banner.classList.toggle('hidden', performance.now() > this.bannerUntil);
    this.updateArrow(s);
    this.drawRadar(s);
  }

  updateArrow(s) {
    const cam = s.camera, m = s.match;
    const b = m.ball.pos;
    const v = this.v.set(b.x, b.y, b.z).project(cam);
    const behind = v.z > 1;
    const off = behind || Math.abs(v.x) > 0.98 || Math.abs(v.y) > 0.98;
    if (!off || m.phase === 'goal' || s.noArrow) { this.arrow.classList.add('hidden'); return; }
    let x = v.x, y = v.y;
    if (behind) { x = -x; y = -y; }
    const ang = Math.atan2(y, x);
    const r = 0.86;
    const k = Math.min(r / Math.max(Math.abs(Math.cos(ang)), 1e-3), r / Math.max(Math.abs(Math.sin(ang)), 1e-3));
    const px = (Math.cos(ang) * k * 0.5 + 0.5) * 100, py = (-Math.sin(ang) * k * 0.5 + 0.5) * 100;
    this.arrow.classList.remove('hidden');
    this.arrow.style.left = `${px}%`;
    this.arrow.style.top = `${py}%`;
    this.arrow.style.transform = `translate(-50%,-50%) rotate(${-ang}rad)`;
  }

  drawRadar(s) {
    const m = s.match, c = this.rctx, W = this.radar.width, H = this.radar.height;
    const h = m.human;
    const team = h ? h.team : 0;
    const att = m.attackDir(team);
    // radar is rotated so our team attacks up the screen
    const pad = 10;
    const sx = (W - pad * 2) / PITCH.W, sy = (H - pad * 2) / PITCH.L;
    const map = (x, z) => [pad + (PITCH.HW + z * att) * sx, pad + (PITCH.HL - x * att) * sy];
    const st = s.style;
    c.clearRect(0, 0, W, H);
    c.fillStyle = st === 'neo' ? 'rgba(40,180,70,0.85)' : 'rgba(250,250,245,0.82)';
    c.fillRect(0, 0, W, H);
    c.strokeStyle = st === 'neo' ? '#fff' : '#222';
    c.lineWidth = 1;
    c.strokeRect(pad, pad, W - pad * 2, H - pad * 2);
    c.beginPath(); c.moveTo(pad, H / 2); c.lineTo(W - pad, H / 2); c.stroke();
    c.beginPath(); c.arc(W / 2, H / 2, AREA.CIRCLE_R * sx, 0, Math.PI * 2); c.stroke();
    // goals and boxes
    for (const gx of [PITCH.HL, -PITCH.HL]) {
      const [x0, y0] = map(gx, AREA.PEN_HW), [x1, y1] = map(gx - Math.sign(gx) * AREA.PEN_D, -AREA.PEN_HW);
      c.strokeRect(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), Math.abs(y1 - y0));
      const [g0x, g0y] = map(gx, GOAL.HW), [g1x] = map(gx, -GOAL.HW);
      c.lineWidth = 3;
      c.beginPath(); c.moveTo(g0x, g0y); c.lineTo(g1x, g0y); c.stroke();
      c.lineWidth = 1;
    }
    for (const p of m.players) {
      const [x, y] = map(p.pos.x, p.pos.z);
      c.fillStyle = p.team === 0 ? s.kitA : s.kitB;
      c.strokeStyle = '#111';
      c.beginPath(); c.arc(x, y, p === h ? 0 : 3.6, 0, Math.PI * 2); c.fill(); c.stroke();
    }
    if (h) {
      // the player: facing wedge
      const [x, y] = map(h.pos.x, h.pos.z);
      const yaw = s.camYaw;
      const fx = Math.sin(yaw), fz = Math.cos(yaw);
      const dx = fz * att, dy = -fx * att;
      c.fillStyle = st === 'neo' ? '#ffe45c' : '#111';
      c.beginPath();
      c.moveTo(x + dx * 9, y + dy * 9);
      c.lineTo(x - dy * 5 - dx * 3, y + dx * 5 - dy * 3);
      c.lineTo(x + dy * 5 - dx * 3, y - dx * 5 - dy * 3);
      c.closePath(); c.fill();
      c.strokeStyle = st === 'neo' ? '#000' : '#fff'; c.stroke();
    }
    const [bx, by] = map(m.ball.pos.x, m.ball.pos.z);
    c.fillStyle = '#fff'; c.strokeStyle = '#000'; c.lineWidth = 1.5;
    c.beginPath(); c.arc(bx, by, 3, 0, Math.PI * 2); c.fill(); c.stroke();
  }
}
