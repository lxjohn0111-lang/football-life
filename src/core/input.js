// Keyboard + mouse input with pointer lock (requested inside click handlers)
// and a click-and-drag / arrow-key look fallback when pointer lock is refused.
// One control scheme everywhere: WASD move, mouse look, Shift sprint,
// LMB shoot, RMB pass, Space through pass / request, E tackle, C slide, Esc pause.
// On touch screens the on-screen controls (ui/touch.js) feed the same actions:
// an analog stick for movement, drags for look, and buttons for the actions.

export const CONTROLS = [
  ['W A S D', 'Move (relative to where you look)'],
  ['Mouse', 'Look'],
  ['Shift', 'Sprint'],
  ['Left mouse', 'Shoot (hold to charge, release to strike)'],
  ['Right mouse', 'Pass to the highlighted teammate (hold briefly for more power)'],
  ['Space', 'Through pass (with the ball) / call for a pass (without it)'],
  ['E', 'Standing tackle (lunges at the ball when it is close)'],
  ['C', 'Slide tackle'],
  ['Esc', 'Pause'],
];

export const TOUCH_CONTROLS = [
  ['Left thumb', 'Drag anywhere on the left side to move; push to the edge of the stick to sprint'],
  ['Right thumb', 'Drag anywhere on the right side to look and aim'],
  ['SHOOT', 'Hold to charge, release to strike (slide your thumb on it to fine-tune the aim)'],
  ['PASS', 'Pass to the ringed teammate (hold briefly for more power)'],
  ['THRU / CALL', 'Through pass with the ball; call for the ball without it'],
  ['TACKLE / SLIDE', 'Replace SHOOT and PASS while an opponent has the ball'],
  ['II', 'Pause'],
];

export class Input {
  constructor(el) {
    this.el = el;
    this.keys = new Set();
    this.lookX = 0; this.lookY = 0;
    this.buttons = 0;
    this.locked = false;
    this.lockSupported = 'requestPointerLock' in el;
    this.dragMode = !this.lockSupported;
    this.active = false; // gameplay capturing input
    this.listeners = [];
    this.onPause = null;
    this.onLockLost = null;
    this.onLockError = null;
    this.sensitivity = 1;
    this.invertY = false;
    this.lastLockExit = 0;
    // touch: analog stick state from the on-screen controls
    this.touchMode = false;
    this.touch = { active: false, f: 0, r: 0, sprint: false };
    this.lastTouchAt = -1e9;

    this.handlers = {
      keydown: (e) => this.keydown(e),
      keyup: (e) => this.keyup(e),
      mousemove: (e) => this.mousemove(e),
      mousedown: (e) => this.mousedown(e),
      mouseup: (e) => this.mouseup(e),
      contextmenu: (e) => { if (this.active) e.preventDefault(); },
      plc: () => this.lockChange(),
      ple: () => { this.locked = false; if (this.onLockError) this.onLockError(); },
      blur: () => { this.keys.clear(); this.releaseAll(); },
      touchSeen: (e) => { if (e.pointerType === 'touch' || e.pointerType === 'pen') this.lastTouchAt = performance.now(); },
    };
    window.addEventListener('pointerdown', this.handlers.touchSeen, true);
    window.addEventListener('pointerup', this.handlers.touchSeen, true);
    window.addEventListener('keydown', this.handlers.keydown);
    window.addEventListener('keyup', this.handlers.keyup);
    window.addEventListener('mousemove', this.handlers.mousemove);
    window.addEventListener('mousedown', this.handlers.mousedown);
    window.addEventListener('mouseup', this.handlers.mouseup);
    window.addEventListener('contextmenu', this.handlers.contextmenu);
    document.addEventListener('pointerlockchange', this.handlers.plc);
    document.addEventListener('pointerlockerror', this.handlers.ple);
    window.addEventListener('blur', this.handlers.blur);
  }

  on(fn) { this.listeners.push(fn); return () => { this.listeners = this.listeners.filter((f) => f !== fn); }; }
  emit(type, down) { for (const f of this.listeners) f(type, down); }

  // must be called from inside a user gesture (click) handler
  requestLock() {
    if (!this.lockSupported) { this.dragMode = true; return false; }
    try {
      const r = this.el.requestPointerLock();
      if (r && r.catch) r.catch(() => { if (this.onLockError) this.onLockError(); });
    } catch (e) {
      this.dragMode = true;
      return false;
    }
    return true;
  }
  exitLock() { if (document.pointerLockElement) document.exitPointerLock(); }

  lockChange() {
    const was = this.locked;
    this.locked = document.pointerLockElement === this.el;
    if (this.locked) { this.dragMode = false; if (!was && this.onLockGained) this.onLockGained(); }
    if (was && !this.locked) {
      this.lastLockExit = performance.now();
      this.releaseAll();
      if (this.active && this.onLockLost) this.onLockLost();
    }
  }

  releaseAll() {
    if (this.buttons & 1) this.emit('shoot', false);
    if (this.buttons & 2) this.emit('pass', false);
    this.buttons = 0;
    this.touch.active = false; this.touch.f = 0; this.touch.r = 0; this.touch.sprint = false;
    if (this.onReleaseAll) this.onReleaseAll();
  }

  // browsers follow a tap with emulated mouse events; those must not shoot or pass
  fromTouch(e) {
    return (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) || performance.now() - this.lastTouchAt < 900;
  }

  // on-screen buttons: same actions as the mouse buttons and keys
  touchAction(type, down) {
    if (!this.active) return;
    if (type === 'shoot') { if (down) this.buttons |= 1; else this.buttons &= ~1; }
    if (type === 'pass') { if (down) this.buttons |= 2; else this.buttons &= ~2; }
    if (!down && (type === 'tackle' || type === 'slide')) return;
    this.emit(type, down);
  }
  touchLook(dx, dy) { if (this.active) { this.lookX += dx; this.lookY += dy; } }

  keydown(e) {
    const k = e.code;
    if (k === 'Escape') { if (this.onPause) this.onPause(); return; }
    if (!this.active) return;
    if (['Space', 'ShiftLeft', 'ShiftRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(k)) e.preventDefault();
    if (e.repeat) return;
    this.keys.add(k);
    if (k === 'Space') this.emit('through', true);
    else if (k === 'KeyE') this.emit('tackle', true);
    else if (k === 'KeyC') this.emit('slide', true);
    else if (k === 'KeyP') { if (this.onPause) this.onPause(); }
  }
  keyup(e) {
    this.keys.delete(e.code);
    if (e.code === 'Space') this.emit('through', false);
  }

  mousedown(e) {
    if (!this.active || this.fromTouch(e)) return;
    if (!this.locked && !this.dragMode) return;
    if (e.target !== this.el && !this.locked) return;
    if (e.button === 0) { this.buttons |= 1; this.emit('shoot', true); }
    if (e.button === 2) { this.buttons |= 2; this.emit('pass', true); e.preventDefault(); }
  }
  mouseup(e) {
    if (this.fromTouch(e)) return;
    if (e.button === 0 && this.buttons & 1) { this.buttons &= ~1; this.emit('shoot', false); }
    if (e.button === 2 && this.buttons & 2) { this.buttons &= ~2; this.emit('pass', false); }
  }
  mousemove(e) {
    if (!this.active || this.fromTouch(e)) return;
    if (this.locked || (this.dragMode && (e.buttons & 7))) {
      this.lookX += e.movementX || 0;
      this.lookY += e.movementY || 0;
    }
  }

  // camera-relative movement axes
  axes() {
    const k = this.keys;
    let f = (k.has('KeyW') ? 1 : 0) - (k.has('KeyS') ? 1 : 0);
    let r = (k.has('KeyD') ? 1 : 0) - (k.has('KeyA') ? 1 : 0);
    let sprint = k.has('ShiftLeft') || k.has('ShiftRight');
    const t = this.touch;
    if (t.active) {
      // analog stick: partial deflection walks, full deflection sprints
      f = Math.max(-1, Math.min(1, f + t.f)); r = Math.max(-1, Math.min(1, r + t.r));
      sprint = sprint || t.sprint;
    }
    return { f, r, sprint };
  }

  // apply accumulated look to yaw/pitch
  consumeLook(state, dt) {
    const s = 0.0022 * this.sensitivity;
    state.yaw -= this.lookX * s;
    state.pitch -= this.lookY * s * (this.invertY ? -1 : 1);
    // arrow keys also look (fallback)
    const k = this.keys;
    const kr = 2.2 * dt * this.sensitivity;
    if (k.has('ArrowLeft')) state.yaw += kr;
    if (k.has('ArrowRight')) state.yaw -= kr;
    if (k.has('ArrowUp')) state.pitch += kr * 0.6 * (this.invertY ? -1 : 1);
    if (k.has('ArrowDown')) state.pitch -= kr * 0.6 * (this.invertY ? -1 : 1);
    this.lookX = 0; this.lookY = 0;
    state.pitch = Math.max(-1.35, Math.min(1.0, state.pitch));
  }

  get held() { return { lmb: !!(this.buttons & 1), rmb: !!(this.buttons & 2) }; }
}
