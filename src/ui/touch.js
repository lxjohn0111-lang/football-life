// On-screen touch controls for phones and tablets. A floating analog stick on
// the left side (push to the edge to sprint), drag anywhere on the right side to
// look and aim, and contextual action buttons on the right:
//   in attack  SHOOT (hold to charge) · PASS · THRU (with the ball) or CALL
//   in defence TACKLE · SLIDE
// Each button press is resolved to an action when the finger goes down and sends
// the matching release when it lifts, so a context change mid-press never
// leaves an action stuck. Everything goes through Input, exactly like the keys.

const el = (tag, cls, parent, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  if (parent) parent.appendChild(e);
  return e;
};

// look speed for finger drags relative to mouse movement (per CSS pixel)
const LOOK_SCALE = 1.35;
// dragging a finger on SHOOT or PASS also aims, a little more finely
const AIM_SCALE = 0.9;
const LAYOUT = {
  attack: { a: ['shoot', 'SHOOT'], b: ['pass', 'PASS'], c: ['through', 'THRU'] },
  call: { a: ['shoot', 'SHOOT'], b: ['pass', 'PASS'], c: ['through', 'CALL'] },
  defend: { a: ['tackle', 'TACKLE'], b: ['slide', 'SLIDE'], c: [null, ''] },
  loose: { a: ['shoot', 'SHOOT'], b: ['pass', 'PASS'], c: ['slide', 'SLIDE'] },
};

export class TouchControls {
  constructor(app, parent) {
    this.app = app;
    this.input = app.input;
    const root = this.root = el('div', 'touch hidden', parent);
    this.zone = el('div', 'tc-zone', root);
    this.stick = el('div', 'tc-stick idle', root);
    this.knob = el('div', 'tc-knob', this.stick);
    this.btn = {};
    for (const k of ['c', 'b', 'a']) { this.btn[k] = el('button', `tc-btn tc-${k}`, root); this.btn[k].dataset.k = k; }
    this.pauseBtn = el('button', 'tc-pause', root, '<i></i><i></i>');
    this.pauseBtn.setAttribute('aria-label', 'Pause');
    el('div', 'tc-rotate', root, 'Turn your phone sideways for a wider view');
    this.ptrs = new Map();
    this.stickId = null;
    this.layout = 'attack';
    this.visible = false;
    this.applyLayout();

    const down = (e) => this.onDown(e);
    const move = (e) => this.onMove(e);
    const up = (e) => this.onUp(e);
    root.addEventListener('pointerdown', down);
    root.addEventListener('pointermove', move);
    root.addEventListener('pointerup', up);
    root.addEventListener('pointercancel', up);
    root.addEventListener('lostpointercapture', up);
    root.addEventListener('contextmenu', (e) => e.preventDefault());
    this.input.onReleaseAll = () => this.reset();
  }

  setVisible(on) {
    if (on === this.visible) return;
    this.visible = on;
    this.root.classList.toggle('hidden', !on);
    if (!on) this.reset();
  }

  // forget every finger (pause, focus loss, end of match)
  reset() {
    for (const [, p] of this.ptrs) if (p.kind === 'btn') this.btn[p.k].classList.remove('down');
    for (const [, p] of this.ptrs) if (p.kind === 'btn' && p.type) this.input.touchAction(p.type, false);
    this.ptrs.clear();
    this.stickId = null;
    const t = this.input.touch;
    t.active = false; t.f = 0; t.r = 0; t.sprint = false;
    this.stick.classList.add('idle');
    this.stick.classList.remove('sprint');
    this.stick.style.left = ''; this.stick.style.top = '';
    this.knob.style.transform = '';
  }

  // called every rendered frame by the match session
  update(session) {
    const m = session.match, h = session.human;
    if (!h) return;
    const b = m.ball, o = b.owner;
    let layout = 'loose';
    if (o === h || (m.phase === 'restart' && m.restart && m.restart.taker === h)) layout = 'attack';
    else if (o && o.team !== h.team) layout = 'defend';
    else if (o) layout = 'call';
    // the defensive buttons stay put for a moment after the opponent loses the ball, so a
    // tap never lands on a button that has just changed under the finger
    if (layout === 'defend') this.defendUntil = m.time + 0.8;
    else if (layout !== 'attack' && m.time < (this.defendUntil || 0)) layout = 'defend';
    if (layout !== this.layout) { this.layout = layout; this.applyLayout(); }
    // cooldown feedback on the tackle button (a slide is never on cooldown)
    if (layout === 'defend') this.btn.a.classList.toggle('cool', m.time < h.tackleReadyAt);
  }

  applyLayout() {
    const L = LAYOUT[this.layout];
    for (const k of ['a', 'b', 'c']) {
      const [type, label] = L[k];
      const b = this.btn[k];
      b.textContent = label;
      b.dataset.type = type || '';
      b.classList.toggle('off', !type);
      b.classList.remove('cool');
    }
  }

  radius() { return Math.max(46, Math.min(72, Math.min(innerWidth, innerHeight) * 0.14)); }

  onDown(e) {
    if (e.pointerType === 'mouse') return;
    e.preventDefault();
    const t = e.target;
    try { t.setPointerCapture(e.pointerId); } catch (err) { /* capture is best effort */ }
    if (t === this.pauseBtn) { this.ptrs.set(e.pointerId, { kind: 'pause' }); return; }
    const k = t.classList.contains('tc-btn') ? t.dataset.k : null;
    if (k) {
      const type = this.btn[k].dataset.type;
      if (!type) return;
      this.ptrs.set(e.pointerId, { kind: 'btn', k, type, x: e.clientX, y: e.clientY });
      this.btn[k].classList.add('down');
      this.input.touchAction(type, true);
      return;
    }
    // the left side of the screen moves, the rest looks
    if (e.clientX < innerWidth * 0.42 && this.stickId == null) {
      this.stickId = e.pointerId;
      const p = { kind: 'stick', ox: e.clientX, oy: e.clientY };
      this.ptrs.set(e.pointerId, p);
      this.stick.classList.remove('idle');
      this.placeStick(p);
      this.moveStick(p, e.clientX, e.clientY);
    } else {
      this.ptrs.set(e.pointerId, { kind: 'look', x: e.clientX, y: e.clientY });
    }
  }

  onMove(e) {
    const p = this.ptrs.get(e.pointerId);
    if (!p) return;
    e.preventDefault();
    if (p.kind === 'stick') this.moveStick(p, e.clientX, e.clientY);
    else if (p.kind === 'look' || (p.kind === 'btn' && (p.type === 'shoot' || p.type === 'pass'))) {
      const s = p.kind === 'look' ? LOOK_SCALE : AIM_SCALE;
      this.input.touchLook((e.clientX - p.x) * s, (e.clientY - p.y) * s);
      p.x = e.clientX; p.y = e.clientY;
    }
  }

  onUp(e) {
    const p = this.ptrs.get(e.pointerId);
    if (!p) return;
    this.ptrs.delete(e.pointerId);
    if (p.kind === 'pause') { if (e.type === 'pointerup') this.app.pause(); return; }
    if (p.kind === 'btn') {
      this.btn[p.k].classList.remove('down');
      this.input.touchAction(p.type, false);
      return;
    }
    if (p.kind === 'stick') {
      this.stickId = null;
      const t = this.input.touch;
      t.active = false; t.f = 0; t.r = 0; t.sprint = false;
      this.stick.classList.add('idle');
      this.stick.classList.remove('sprint');
      this.stick.style.left = ''; this.stick.style.top = '';
      this.knob.style.transform = '';
    }
  }

  placeStick(p) {
    this.stick.style.left = `${p.ox}px`;
    this.stick.style.top = `${p.oy}px`;
  }

  moveStick(p, x, y) {
    const R = this.radius();
    let dx = x - p.ox, dy = y - p.oy;
    let len = Math.hypot(dx, dy);
    // the stick follows a thumb that slides well past its edge
    const follow = R * 1.25;
    if (len > follow) {
      p.ox += (dx / len) * (len - follow); p.oy += (dy / len) * (len - follow);
      dx = x - p.ox; dy = y - p.oy; len = follow;
      this.placeStick(p);
    }
    const mag = Math.min(1, len / R);
    const dead = 0.12;
    const v = mag < dead ? 0 : (mag - dead) / (1 - dead);
    const t = this.input.touch;
    t.active = true;
    t.f = len > 0 ? (-dy / len) * v : 0;
    t.r = len > 0 ? (dx / len) * v : 0;
    t.sprint = len / R > 0.92;
    this.stick.classList.toggle('sprint', t.sprint);
    const k = Math.min(len, R) / (len || 1);
    this.knob.style.transform = `translate(${dx * k}px, ${dy * k}px)`;
  }
}
