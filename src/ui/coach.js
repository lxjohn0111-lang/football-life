// Coach Ada's card during the tutorial: a short instruction, one short hint for the
// current device, progress dots, stars earned, a thin timer bar and a Skip button.
// It is kept small so it never covers the play.
const el = (tag, cls, parent, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  if (parent) parent.appendChild(e);
  return e;
};

export class CoachCard {
  constructor(parent, total, onSkip) {
    this.root = el('div', 'coach hidden', parent);
    const main = el('div', 'coach-main', this.root);
    const txt = el('div', 'coach-txt', main);
    this.sayEl = el('div', 'coach-say', txt);
    this.hintEl = el('div', 'coach-hint', txt);
    this.skip = el('button', 'coach-skip', main, 'Skip tutorial');
    this.skip.addEventListener('click', (e) => { e.preventDefault(); onSkip(); });
    this.skip.addEventListener('pointerdown', (e) => e.stopPropagation());
    const foot = el('div', 'coach-foot', this.root);
    this.dots = el('span', 'coach-dots', foot);
    for (let i = 0; i < total; i++) el('i', '', this.dots);
    this.starsEl = el('span', 'coach-stars', foot, '★ 0');
    this.bar = el('div', 'coach-bar', this.root);
    this.barFill = el('i', '', this.bar);
    // pulsing arrow at the screen edge towards an objective that is out of view
    this.arrow = el('div', 'tut-arrow hidden', parent);
    this.last = {};
  }

  // v: objective position in screen space (-1..1), or null
  pointAt(v) {
    const off = v && (Math.abs(v.x) > 0.92 || Math.abs(v.y) > 0.92);
    this.arrow.classList.toggle('hidden', !off);
    if (!off) return;
    const ang = Math.atan2(v.y, v.x);
    const r = 0.8;
    const k = Math.min(r / Math.max(Math.abs(Math.cos(ang)), 1e-3), r / Math.max(Math.abs(Math.sin(ang)), 1e-3));
    this.arrow.style.left = `${(Math.cos(ang) * k * 0.5 + 0.5) * 100}%`;
    this.arrow.style.top = `${(-Math.sin(ang) * k * 0.5 + 0.5) * 100}%`;
    this.arrow.style.setProperty('--rot', `${-ang}rad`);
  }

  show(on) { this.root.classList.toggle('hidden', !on); }
  dispose() { this.root.remove(); this.arrow.remove(); }

  // s: { index, say, hint, stars, frac, pop, keyboard }
  update(s) {
    const L = this.last;
    if (s.say !== L.say) {
      this.sayEl.textContent = s.say;
      this.sayEl.classList.remove('pop'); void this.sayEl.offsetWidth; this.sayEl.classList.add('pop');
    }
    if (s.hint !== L.hint) { this.hintEl.textContent = s.hint || ''; this.hintEl.classList.toggle('empty', !s.hint); }
    if (s.index !== L.index || s.doneCount !== L.doneCount) {
      [...this.dots.children].forEach((d, i) => { d.className = i < s.doneCount ? 'done' : i === s.index ? 'now' : ''; });
    }
    if (s.stars !== L.stars) this.starsEl.textContent = `★ ${s.stars}`;
    if (s.keyboard !== L.keyboard) this.skip.textContent = s.keyboard ? 'Skip (Esc)' : 'Skip';
    this.barFill.style.width = `${Math.round(Math.max(0, Math.min(1, s.frac)) * 100)}%`;
    this.last = { ...s };
  }
}
