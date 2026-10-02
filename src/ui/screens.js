// DOM screens: main menu, career creation, career hub, result screens, quick match,
// training, visual style (with previews rendered by the game itself), settings, how
// to play and the pause menu. All built from the shared arcade design system in
// styles.css: one obvious primary action per screen, custom controls (no native
// selects, colour pickers or plain sliders), short text, and sound on every action.
import * as THREE from 'three';
import { CONTROLS, TOUCH_CONTROLS } from '../core/input.js';
import { FOV_MIN, FOV_MAX } from '../core/settings.js';
import { CLUBS, clubById, crestSVG, tierInfo, NATIONALITIES, clubsInTier, TIERS } from '../career/clubs.js';
import {
  createCareer, nextFixture, sortedTable, ATTRS, ATTR_LABELS, posName, upgradeAttr, attrStep, interestList,
  acceptOffer, declineWindow, canStartNewSeason, startNewSeason, commitMatch, avgRating, ordinal, addXp,
} from '../career/career.js';
import { POSITIONS, HALF_LENGTHS } from '../sim/constants.js';
import { DIFFICULTY } from '../sim/match.js';
import { DRILLS, Drill } from '../game/drills.js';
import { Tutorial, STEPS, markTutorial } from '../game/tutorial.js';
import { CoachCard } from './coach.js';
import { icon } from './icons.js';
import { defaultPlayer } from '../career/teams.js';
import { resolveKits } from '../render/palette.js';
import { platform } from '../platform/crazygames.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const f1 = (x) => (Math.round(x * 10) / 10).toFixed(1);

const BALL_SVG = `<svg class="logo-ball" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#070b1d" stroke-width="6"/>
  <path d="M50 30 69 44 62 66H38L31 44z" fill="#0e1430"/><path d="M50 30V8M69 44l20-8M62 66l13 19M38 66 25 85M31 44l-20-8" stroke="#0e1430" stroke-width="5"/>
  <path d="M50 4 63 9 50 15 37 9zM93 38 92 52 85 44 87 32zM80 88 66 92 70 80 82 78zM20 88 34 92 30 80 18 78zM7 38 8 52 15 44 13 32z" fill="#0e1430"/></svg>`;

const POS_SHORT = { ST: 'Scores goals up front.', W: 'Pace and crosses out wide.', AM: 'Creates chances behind the striker.', CM: 'Passes and wins the ball.', DEF: 'Tackles and protects the goal.' };
const SKIN = ['#f3d2b3', '#e0b48c', '#c68b5e', '#a26a43', '#7b4b2c', '#4f2f1c'];
const HAIR = ['#111111', '#3b2a1e', '#7a4a24', '#c58b3a', '#e8d18a', '#b23a1d'];
const BOOTS = ['#111111', '#f5f5f5', '#ffc61a', '#2fd4ff', '#ff4d5e', '#33d36c'];

export class Screens {
  constructor(app) {
    this.app = app;
    this.root = document.createElement('div');
    this.root.className = 'screens';
    app.uiRoot.appendChild(this.root);
    this.current = null;
    this.lastShown = null;
    this.stack = [];
    // a soft tick when the mouse moves onto anything clickable
    let hovered = null, lastHover = 0;
    this.root.addEventListener('pointerover', (e) => {
      if (e.pointerType !== 'mouse') return;
      const t = e.target.closest('.btn:not(:disabled), .card.pick, .tab, .opt, .sw');
      if (!t || t === hovered) return;
      hovered = t;
      const now = performance.now();
      if (now - lastHover > 60) { lastHover = now; this.sfx('uiHover', 0.12); }
    });
  }

  sfx(name, gain = 0.4) { this.app.audio.play(name, { gain }); }

  // render a screen and bind its [data-act] controls; re-rendering the same screen
  // (e.g. after an upgrade) doesn't replay the entrance animation
  show(html, acts = {}, cls = 'screen center dim') {
    const again = this.current && this.current === this.lastShown;
    this.lastShown = this.current;
    if (!again) this.sfx('uiSwoosh', 0.18);
    this.root.innerHTML = `<div class="${cls}">${html}</div>`;
    const scr = this.root.firstChild;
    if (again) scr.querySelectorAll(':scope > *').forEach((e) => { e.style.animation = 'none'; });
    scr.querySelectorAll('[data-act]').forEach((b) => {
      const fn = acts[b.dataset.act];
      if (fn) {
        b.addEventListener('click', (e) => {
          e.preventDefault();
          if (b.disabled) return;
          this.sfx(b.classList.contains('primary') ? 'uiConfirm' : 'uiClick', b.classList.contains('primary') ? 0.35 : 0.4);
          fn(b, e);
        });
      }
    });
    return scr;
  }
  clear() { this.root.innerHTML = ''; this.current = null; this.lastShown = null; }
  back() {
    if (this.current === 'menu' || this.app.session) return;
    if (this.current === 'hubSub') { this.hub(); return; }
    this.mainMenu();
  }
  toast(text, bad = false, ms = 3200) {
    const t = document.createElement('div');
    t.className = 'toast' + (bad === true ? ' bad' : bad === 'good' ? ' good' : '');
    t.textContent = text;
    this.app.uiRoot.appendChild(t);
    if (bad === true) this.sfx('uiError', 0.35);
    setTimeout(() => t.remove(), ms);
  }
  saveCareer() {
    const r = this.app.store.save();
    if (!r.ok) this.toast(`Could not save your career: ${r.error} Progress is kept only until you close the page.`, true, 6000);
    return r.ok;
  }

  // ------------------------------------------------------------- building blocks
  seg(key, opts, value) {
    return `<div class="seg" data-key="${key}">${opts.map(([v, l]) => `<button class="opt ${String(value) === String(v) ? 'on' : ''}" data-v="${v}">${l}</button>`).join('')}</div>`;
  }
  // single-choice groups: .seg[data-key] buttons and .choices cards; onPick(key, value, el)
  bindChoices(el, onPick) {
    el.querySelectorAll('.seg').forEach((g) => g.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => {
      g.querySelectorAll('.opt').forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      this.sfx('uiClick', 0.35);
      let v = b.dataset.v;
      if (v === 'true') v = true; else if (v === 'false') v = false;
      onPick(g.dataset.key, v, b);
    })));
  }
  slider(id, min, max, step, value, label) {
    const p = ((value - min) / (max - min)) * 100;
    return `<div class="slider"><input class="range" type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${value}" style="--p:${p}%"></div><span class="val" id="v-${id.slice(2)}">${label}</span>`;
  }

  // ------------------------------------------------------------------ menu
  mainMenu() {
    this.current = 'menu';
    const app = this.app;
    app.hud.show(false);
    const c = app.store.career;
    const sub = c ? `${esc(clubById(c.clubId).name)} · Season ${c.seasonNo}` : 'New Career · start in League Two';
    this.show(`
      <div class="menu-inner">
        <div class="menu-head">
          <div class="logo">${BALL_SVG}<div class="logo-text">First<em>Touch</em></div></div>
          <div class="tagline">One player. Your eyes. Your career.</div>
        </div>
        <div class="menu-actions col">
          <div class="menu-play"><button class="btn xl primary" data-act="play">${icon('play', 36)}<span class="stack">Play<small>${sub}</small></span></button></div>
          <div class="menu-row">
            <button class="btn lg" data-act="quick">${icon('ball')} Quick Match</button>
            <button class="btn lg" data-act="train">${icon('cone')} Training</button>
          </div>
          <div class="menu-icons">
            <button class="btn sm" data-act="settings">${icon('gear', 18)} Settings</button>
            <button class="btn sm" data-act="help">${icon('help', 18)} How to Play</button>
            <button class="btn sm" data-act="tut">${icon('whistle', 18)} Tutorial</button>
          </div>
          ${c ? '<div><button class="btn sm ghost" data-act="new">New Career</button></div>' : ''}
        </div>
      </div>`, {
      play: () => (c ? this.hub() : this.newCareer()),
      new: () => this.confirm('Your current career will be replaced.', () => this.newCareer(), () => this.mainMenu()),
      quick: () => this.quickMatch(),
      train: () => this.training(),
      settings: () => this.settings(),
      help: () => this.howTo(),
      tut: () => this.startTutorial(),
    }, 'screen menu');
    if (app.store.notice) { this.toast(app.store.notice.text, app.store.notice.bad, 7000); app.store.notice = null; }
  }

  confirm(text, yes, no) {
    this.current = 'confirm';
    this.show(`<div class="panel narrow center-t"><div class="h-title">Are you sure?</div><p class="lead">${esc(text)}</p>
      <div class="actions mid"><button class="btn danger lg" data-act="yes">Yes, start over</button><button class="btn ghost" data-act="no">Cancel</button></div></div>`, { yes, no });
  }

  // ------------------------------------------------------------ new career
  newCareer() {
    this.current = 'new';
    const d = defaultPlayer();
    const st = { pos: 'ST', club: clubsInTier(1)[0].id, num: 9, nat: 0, foot: 'R', skin: d.look.skin, hair: d.look.hair, boots: d.look.boots };
    const sw = (key, list) => `<div class="swatches" data-sw="${key}">${list.map((c) => `<button class="sw ${c === st[key] ? 'on' : ''}" data-c="${c}" style="background:${c}" aria-label="${key} ${c}"></button>`).join('')}</div>`;
    const pos = POSITIONS.map((p) => `<button class="card pick choice ${p.id === st.pos ? 'on' : ''}" data-pos="${p.id}"><b>${p.name}</b><span>${POS_SHORT[p.id]}</span></button>`).join('');
    const clubs = clubsInTier(1).map((c) => `<button class="card pick choice club-chip ${c.id === st.club ? 'on' : ''}" data-club="${c.id}">${crestSVG(c, 34)}<b>${esc(c.name)}</b></button>`).join('');
    const el = this.show(`
      <div class="panel wide">
        <div class="h-title">Create your player</div>
        <div class="grid2">
          <div class="col">
            <div class="h-sec">Name</div>
            <input class="field" id="nc-name" maxlength="22" value="${esc(d.name)}" aria-label="Name">
            <div class="row" style="gap:var(--s5)">
              <div><div class="h-sec">Number</div><div class="stepper"><button class="btn icon sm" data-step="-1" aria-label="Lower">${icon('minus')}</button><span class="pv" id="nc-num">9</span><button class="btn icon sm" data-step="1" aria-label="Higher">${icon('plus')}</button></div></div>
              <div><div class="h-sec">Foot</div>${this.seg('foot', [['L', 'Left'], ['R', 'Right']], 'R')}</div>
            </div>
            <div class="h-sec">Nationality</div>
            <div class="picker"><button class="btn icon sm" data-nat="-1" aria-label="Previous">${icon('left')}</button><span class="pv" id="nc-nat">${esc(NATIONALITIES[0])}</span><button class="btn icon sm" data-nat="1" aria-label="Next">${icon('right')}</button></div>
          </div>
          <div class="col">
            <div class="h-sec">Skin</div>${sw('skin', SKIN)}
            <div class="h-sec">Hair</div>${sw('hair', HAIR)}
            <div class="h-sec">Boots</div>${sw('boots', BOOTS)}
          </div>
        </div>
        <div class="h-sec">Position</div>
        <div class="choices" id="nc-pos">${pos}</div>
        <div class="h-sec">Your first club · League Two</div>
        <div class="choices" id="nc-club">${clubs}</div>
        <div class="actions"><button class="btn primary lg" data-act="go">${icon('check')} Sign your first contract</button><button class="btn ghost" data-act="back">Back</button></div>
      </div>`, {
      back: () => this.mainMenu(),
      go: () => {
        const name = el.querySelector('#nc-name').value.trim() || 'A. Newcomer';
        const career = createCareer({
          name, number: st.num, nationality: NATIONALITIES[st.nat], foot: st.foot, role: st.pos, clubId: st.club,
          look: { skin: st.skin, hair: st.hair, boots: st.boots },
        });
        this.app.store.career = career;
        this.saveCareer();
        this.sfx('uiReward', 0.35);
        this.hub();
      },
    });
    const pickIn = (sel, attr, key, after) => el.querySelectorAll(`${sel} [data-${attr}]`).forEach((b) => b.addEventListener('click', () => {
      el.querySelectorAll(`${sel} [data-${attr}]`).forEach((x) => x.classList.remove('on'));
      b.classList.add('on'); st[key] = b.dataset[attr]; this.sfx('uiClick', 0.35);
      if (after) after(b.dataset[attr]);
    }));
    const nums = { ST: 9, W: 11, AM: 10, CM: 8, DEF: 4 };
    pickIn('#nc-pos', 'pos', 'pos', (p) => { st.num = nums[p]; el.querySelector('#nc-num').textContent = st.num; });
    pickIn('#nc-club', 'club', 'club');
    el.querySelectorAll('[data-sw]').forEach((g) => g.querySelectorAll('.sw').forEach((b) => b.addEventListener('click', () => {
      g.querySelectorAll('.sw').forEach((x) => x.classList.remove('on'));
      b.classList.add('on'); st[g.dataset.sw] = b.dataset.c; this.sfx('uiClick', 0.3);
    })));
    el.querySelectorAll('[data-step]').forEach((b) => b.addEventListener('click', () => {
      st.num = ((st.num - 1 + +b.dataset.step + 99) % 99) + 1;
      el.querySelector('#nc-num').textContent = st.num; this.sfx('uiClick', 0.3);
    }));
    el.querySelectorAll('[data-nat]').forEach((b) => b.addEventListener('click', () => {
      st.nat = (st.nat + +b.dataset.nat + NATIONALITIES.length) % NATIONALITIES.length;
      el.querySelector('#nc-nat').textContent = NATIONALITIES[st.nat]; this.sfx('uiClick', 0.3);
    }));
    this.bindChoices(el, (k, v) => { if (k === 'foot') st.foot = v; });
  }

  // --------------------------------------------------------------- hub
  hub(tab) {
    this.current = 'hub';
    const app = this.app;
    const c = app.store.career;
    if (!c) { this.mainMenu(); return; }
    const club = clubById(c.clubId);
    const s = c.season;
    const p = c.player;
    const fx = nextFixture(c);
    // arriving with unspent upgrade points opens the player tab; otherwise the last tab
    if (!tab && p.points > 0) tab = 'player';
    tab = tab || this.hubTab || 'table';
    this.hubTab = tab;

    // the main card: whatever the player should do next, with one big button
    let main = '';
    if (c.window) {
      const offers = c.window.offers.map((o, i) => {
        const oc = clubById(o.clubId);
        return `<div class="card offer"><div class="row">${crestSVG(oc, 40)}<div style="flex:1;min-width:0"><div class="club-chip">${esc(oc.name)}</div>
          <div class="small muted">${esc(tierInfo(oc.tier).league)} · ${o.wage.toLocaleString()} cr/week · ${o.years} season${o.years > 1 ? 's' : ''}</div>
          <div class="small" style="margin-top:4px">${esc(o.reasons[0] || o.expectations)}</div></div></div>
          <div class="actions" style="margin-top:var(--s3)"><button class="btn primary" data-act="accept" data-i="${i}">${o.kind === 'renewal' ? 'Sign renewal' : 'Accept transfer'}</button></div></div>`;
      }).join('');
      main = `<div class="panel next"><div class="comp">${c.window.type === 'end' ? 'Season-end' : 'Mid-season'} transfer window</div>
        <div class="h-title" style="margin-top:var(--s2)">${c.window.offers.length ? `${c.window.offers.length} offer${c.window.offers.length > 1 ? 's' : ''}!` : 'No offers'}</div>
        ${offers || '<p class="lead">Build your form and reputation for the next window.</p>'}
        <div class="actions mid"><button class="btn ${c.window.offers.length ? 'ghost' : 'primary lg'}" data-act="decline">${c.window.offers.length ? `Stay at ${esc(club.name)}` : 'Continue'}</button></div></div>`;
    } else if (fx) {
      const home = clubById(fx.home), away = clubById(fx.away);
      const venue = fx.final ? 'Continental Stadium · neutral' : esc(home.ground);
      main = `<div class="panel next">
        <div class="comp">${fx.final ? esc(fx.name) : `${esc(s.league)} · Round ${fx.round} of 6`}</div>
        <div class="fixture"><div class="side">${crestSVG(home, 72)}${esc(home.name)}</div><div class="v">VS</div><div class="side">${crestSVG(away, 72)}${esc(away.name)}</div></div>
        <div class="venue">${venue}</div>
        <button class="btn xl primary block" data-act="play">${icon('play', 32)} Play Match</button>
        <div class="actions mid" style="margin-top:var(--s4)"><button class="btn sm" data-act="train">${icon('cone', 18)} Training${c.trainingAvailable ? ' <span class="badge gold">+XP</span>' : ''}</button></div></div>`;
    } else if (canStartNewSeason(c)) {
      const won = s.placement === 1, cup = s.final && s.final.played && s.final.won;
      main = `<div class="panel next"><div class="comp">Season ${c.seasonNo} complete</div>
        <div class="result-word ${won || cup ? 'win' : ''}" style="font-size:52px;margin:var(--s3) 0">${won ? 'Champions!' : ordinal(s.placement)}</div>
        <p class="lead">${esc(club.name)} finished ${ordinal(s.placement)} in the ${esc(s.league)}.${cup ? ' Continental Cup winners!' : ''}</p>
        <button class="btn xl primary block" data-act="season">Start Season ${c.seasonNo + 1}</button></div>`;
    }

    // tabs: one topic at a time instead of a wall of tables
    const seasonRec = c.seasons.find((x) => x.season === c.seasonNo && x.clubId === c.clubId) || { apps: 0, goals: 0, assists: 0, ratingSum: 0 };
    const mini = (v, l) => `<div class="mini"><b>${v}</b><span>${l}</span></div>`;
    const attrs = ATTRS.map((k) => `<div class="attr"><span>${ATTR_LABELS[k]}</span><div class="bar ${p.attrs[k] >= 75 ? 'good' : ''}"><i style="width:${p.attrs[k]}%"></i></div><b>${p.attrs[k]}</b><button class="btn ${p.points > 0 && p.attrs[k] < 99 ? 'primary' : ''}" data-act="up" data-k="${k}" ${p.points > 0 && p.attrs[k] < 99 ? '' : 'disabled'} title="+${attrStep(p.attrs[k])}">+</button></div>`).join('');
    const form = c.form.slice(-5).map((r) => `<span class="${r >= 7 ? 'hi' : r < 6 ? 'lo' : ''}">${f1(r)}</span>`).join('') || '<span class="muted small">No matches yet</span>';
    const tPlayer = `${p.points > 0 ? `<div class="row" style="margin-bottom:var(--s2)"><span class="badge gold pulse">${p.points} upgrade point${p.points > 1 ? 's' : ''}</span><span class="small muted">Tap + to improve</span></div>` : ''}
      ${attrs}
      <div class="h-sec">Form</div><div class="form-dots">${form}</div>
      <div class="mini-stats">${mini(seasonRec.apps, 'Apps')}${mini(seasonRec.goals, 'Goals')}${mini(seasonRec.assists, 'Assists')}${mini(seasonRec.apps ? f1(seasonRec.ratingSum / seasonRec.apps) : '-', 'Avg')}</div>`;
    const table = sortedTable(s).map((t, i) => `<tr class="${t.id === c.clubId ? 'me' : ''}"><td>${i + 1}</td><td><span class="row" style="gap:6px">${crestSVG(clubById(t.id), 20)} ${esc(clubById(t.id).name)}</span></td><td class="n">${t.p}</td><td class="n">${t.gf - t.ga}</td><td class="n"><b>${t.pts}</b></td></tr>`).join('');
    const results = s.fixtures.filter((f) => f.score && (f.home === c.clubId || f.away === c.clubId)).map((f) => `<span class="badge">${esc(clubById(f.home).short)} ${f.score[0]}-${f.score[1]} ${esc(clubById(f.away).short)}</span>`).join(' ');
    const tTable = `<table class="t"><tr><th>#</th><th>Club</th><th class="n">P</th><th class="n">GD</th><th class="n">Pts</th></tr>${table}</table>${results ? `<div class="trophies" style="margin-top:var(--s3)">${results}</div>` : ''}`;
    const interest = interestList(c).map((it) => `<div style="margin:var(--s3) 0"><div class="row">${crestSVG(it.club, 26)}<b class="club-chip" style="flex:1">${esc(it.club.name)}</b><span class="big-num">${Math.round(it.score * 100)}%</span></div><div class="bar ${it.qualifies ? 'good' : ''}" style="margin-top:6px"><i style="width:${Math.round(it.score * 100)}%"></i></div><div class="small muted" style="margin-top:4px">${esc(it.text)}</div></div>`).join('') || '<p class="lead">You are at the top. Win the league and the Continental Cup!</p>';
    const tTransfers = `${interest}<div class="small muted">Offers come at transfer windows (after round 3 and at season end).</div>`;
    const T = c.totals;
    const hist = c.seasons.map((r) => `<tr><td>S${r.season}</td><td>${esc(clubById(r.clubId).short)}</td><td class="n">${r.apps}</td><td class="n">${r.goals}</td><td class="n">${r.assists}</td><td class="n">${r.apps ? f1(r.ratingSum / r.apps) : '-'}</td><td class="n">${r.placement ? ordinal(r.placement) : '-'}</td></tr>`).join('');
    const timeline = [...c.timeline].reverse().slice(0, 30).map((t) => `<div><span class="muted">S${t.season}</span> ${esc(t.text)}</div>`).join('');
    const trophies = c.trophies.map((t) => `<span class="badge gold">${icon('trophy', 14)} ${esc(t.name)} S${t.season}</span>`).join(' ');
    const tHistory = `<div class="mini-stats" style="margin-top:0">${mini(T.apps, 'Apps')}${mini(T.goals, 'Goals')}${mini(T.assists, 'Assists')}${mini(T.apps ? f1(avgRating(T)) : '-', 'Avg')}</div>
      ${trophies ? `<div class="trophies" style="margin-top:var(--s3)">${trophies}</div>` : ''}
      <div class="h-sec">Seasons</div><table class="t"><tr><th>S</th><th>Club</th><th class="n">Apps</th><th class="n">G</th><th class="n">A</th><th class="n">Avg</th><th class="n">Pos</th></tr>${hist}</table>
      <div class="h-sec">Timeline</div><div class="timeline">${timeline}</div>`;
    const tabs = [['player', 'Player', icon('user', 16), p.points], ['table', 'Table', icon('chart', 16)], ['transfers', 'Transfers', icon('swap', 16)], ['history', 'History', icon('trophy', 16)]];
    const body = { player: tPlayer, table: tTable, transfers: tTransfers, history: tHistory };
    const xp = Math.max(0, Math.min(100, p.xp));

    const el = this.show(`
      <div class="topbar">
        <div class="who">${crestSVG(club, 56)}<div><h1>${esc(club.name)}</h1><div class="sub">${esc(s.league)} · Season ${c.seasonNo} · ${esc(p.name)} #${p.number} · ${posName(p.role)}</div></div></div>
        <span class="spacer"></span>
        <div class="lvl" title="Level ${p.level}"><div class="ring">${p.level}</div><div><div class="small" style="font-weight:800">XP ${p.xp}/100</div><div class="bar gold"><i style="width:${xp}%"></i></div></div></div>
        <button class="btn icon" data-act="menu" title="Main Menu" aria-label="Main Menu">${icon('home')}</button>
      </div>
      <div class="hub-main">
        ${main}
        <div class="panel">
          <div class="tabs">${tabs.map(([k, l, ic, n]) => `<button class="tab ${k === tab ? 'on' : ''}" data-tab="${k}">${ic} ${l}${n ? `<span class="dot-new">${n}</span>` : ''}</button>`).join('')}</div>
          ${tabs.map(([k]) => `<div class="tab-body" data-body="${k}" ${k === tab ? '' : 'hidden'}>${body[k]}</div>`).join('')}
        </div>
      </div>`, {
      menu: () => { this.hubTab = null; this.mainMenu(); },
      play: () => this.app.playCareerMatch(),
      train: () => this.training(true),
      season: () => { startNewSeason(c); this.saveCareer(); this.hub(); },
      up: (b) => { if (upgradeAttr(c, b.dataset.k)) { this.saveCareer(); this.sfx('uiReward', 0.3); this.hub('player'); } },
      accept: (b) => { acceptOffer(c, +b.dataset.i); this.saveCareer(); this.sfx('uiReward', 0.4); this.hub(); },
      decline: () => { declineWindow(c); this.saveCareer(); this.hub(); },
    }, 'screen hub');
    el.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => {
      this.hubTab = t.dataset.tab;
      el.querySelectorAll('.tab').forEach((x) => x.classList.toggle('on', x === t));
      el.querySelectorAll('.tab-body').forEach((b) => { b.hidden = b.dataset.body !== t.dataset.tab; });
      this.sfx('uiClick', 0.3);
    }));
  }

  // ------------------------------------------------------------ result screen
  report(session, o = {}) {
    const app = this.app;
    app.input.active = false;
    app.input.exitLock();
    app.hud.show(false);
    this.current = 'report';
    const m = session.match;
    const h = m.human;
    const rep = m.stats.report(h);
    const st = rep.stats;
    let summary = null;
    if (o.career && !session.committed) {
      session.committed = true;
      const c = app.store.career;
      summary = commitMatch(c, o.matchId, o.fx, { score: rep.score, rating: rep.rating, minutes: rep.minutes, stats: st, motm: rep.motm && rep.motm.isHuman });
      session.summary = summary;
      this.saveCareer();
    } else if (o.career) summary = session.summary;
    const my = rep.score[h.team], th = rep.score[1 - h.team];
    const outcome = my > th ? 'win' : my < th ? 'loss' : 'draw';
    const word = { win: 'You win!', loss: 'Defeat', draw: 'Draw' }[outcome];
    const crestFor = (t) => { const cl = CLUBS.find((x) => x.name === m.teams[t].name); return cl ? crestSVG(cl, 56) : ''; };
    const goals = rep.goals.map((g) => `${g.clock} ${g.ownGoal ? `OG (${esc(g.ownGoalBy || '')})` : esc(g.scorer || '?')}`).join(' · ');
    const mini = (v, l) => `<div class="mini"><b>${v}</b><span>${l}</span></div>`;
    const key = h.role === 'DEF' ? [[st.tacklesWon, 'Tackles'], [st.interceptions, 'Interceptions'], [st.passAtt ? st.passAcc + '%' : '-', 'Passing']]
      : [[st.goals, 'Goals'], [st.assists, 'Assists'], [st.passAtt ? st.passAcc + '%' : '-', 'Passing']];
    const bd = rep.breakdown;
    const why = [...bd.pos.slice(0, 3).map((x) => `<div class="plus">+${x.v.toFixed(2)} ${esc(x.label)}</div>`), ...bd.neg.slice(0, 3).map((x) => `<div class="minus">${x.v.toFixed(2)} ${esc(x.label)}</div>`)].join('') || '<div class="muted">A quiet game.</div>';
    const reward = summary && !summary.duplicate
      ? `<div class="reward">${icon('star', 18)} +${summary.xp} XP${summary.levelUps ? ` · ${summary.levelUps} upgrade point${summary.levelUps > 1 ? 's' : ''}!` : ''}</div>`
      : o.quick ? '<div class="reward plain">Quick match · no career effect</div>' : '';
    const el = this.show(`
      <div class="panel result">
        <div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${esc(o.title || 'Full time')}</div>
        <div class="result-word ${outcome}">${word}</div>
        <div class="scoreline"><div class="side">${crestFor(0)}${esc(m.teams[0].name)}</div><div class="sc">${rep.score[0]} - ${rep.score[1]}</div><div class="side">${crestFor(1)}${esc(m.teams[1].name)}</div></div>
        <div class="scorers">${goals}</div>
        <div class="rating-hero"><span class="lab">Your rating</span><span class="num ${rep.rating >= 7 ? 'hi' : rep.rating < 6 ? 'lo' : ''}" id="r-num">0.0</span></div>
        <div class="key-stats">${key.map(([v, l]) => mini(v, l)).join('')}</div>
        ${reward}
        <details class="more"><summary>More stats</summary>
          <div class="mini-stats">${mini(`${st.passCmp}/${st.passAtt}`, 'Passes')}${mini(st.shots, 'Shots')}${mini(st.shotsOn, 'On target')}${mini(st.keyPasses, 'Chances')}${mini(st.tacklesWon, 'Tackles')}${mini(st.interceptions, 'Intercept.')}${mini(st.possLost, 'Lost ball')}${mini(st.touches, 'Touches')}</div>
          <div class="grid2" style="margin-top:var(--s3)"><div class="why small"><div class="h-sec" style="margin:0 0 6px">Rating</div>${why}</div>
          <div class="small" style="font-weight:700;color:var(--text2)"><div class="h-sec" style="margin:0 0 6px">Match</div>Possession ${rep.possession[0]}% - ${rep.possession[1]}%<br>Shots ${rep.teamShots[0]} - ${rep.teamShots[1]}<br>Minutes ${rep.minutes}<br>Player of the match: ${rep.motm ? esc(rep.motm.name) : '-'}</div></div>
        </details>
        <div class="actions mid">
          ${o.career ? '<button class="btn primary lg" data-act="cont">Continue</button>'
            : o.quick ? `<button class="btn primary lg" data-act="again">${icon('play')} Play again</button><button class="btn" data-act="change">Change teams</button><button class="btn ghost" data-act="menu">Main menu</button>`
              : '<button class="btn primary lg" data-act="menu">Continue</button>'}
        </div>
      </div>`, {
      cont: () => this.afterMatch(el, () => { app.endSession(); this.hub(); }),
      again: () => this.afterMatch(el, () => { app.endSession(); app.startQuickMatch(this.lastQuick || {}); }),
      change: () => this.afterMatch(el, () => { app.endSession(); this.quickMatch(); }),
      menu: () => this.afterMatch(el, () => { app.endSession(); this.mainMenu(); }),
    });
    this.sfx(outcome === 'win' ? 'uiReward' : 'uiConfirm', 0.4);
    if (outcome === 'win') platform.happytime();
    // the rating counts up
    const num = el.querySelector('#r-num');
    const t0 = performance.now(), target = rep.rating;
    const tick = () => {
      const k = Math.min(1, (performance.now() - t0) / 900);
      num.textContent = f1(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1 && num.isConnected) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // leaving a match's result screen is the natural break for a CrazyGames midgame ad;
  // without the SDK (or with no ad to show) it goes straight on
  afterMatch(el, go) {
    el.querySelectorAll('button').forEach((b) => { b.disabled = true; });
    platform.midgameAd(go);
  }

  // ------------------------------------------------------- quick match
  quickMatch() {
    this.current = 'quick';
    const app = this.app;
    const q = this.lastQuick || { home: 'swindon', away: 'chesterfield', side: 0, role: (app.store.career ? app.store.career.player.role : 'ST'), len: app.settings.matchLength };
    const st = { home: q.home, away: q.away, side: q.side || 0, role: q.role || 'ST', len: q.len || app.settings.matchLength || 'normal' };
    const order = CLUBS.map((c) => c.id);
    const el = this.show(`
      <div class="panel wide">
        <div class="h-title">Quick Match</div>
        <div class="vs">
          <div class="card team-pick pick" data-side="0" id="tp-0"></div>
          <div class="vs-mid">VS</div>
          <div class="card team-pick pick" data-side="1" id="tp-1"></div>
        </div>
        <div id="club-grid"></div>
        <div class="grid2" style="margin-top:var(--s4)">
          <div><div class="h-sec">Your position</div>${this.seg('role', POSITIONS.map((p) => [p.id, p.id]), st.role)}</div>
          <div><div class="h-sec">Halves</div>${this.seg('len', [['short', '2 min'], ['normal', '3 min'], ['long', '5 min']], st.len)}</div>
        </div>
        <div class="actions"><button class="btn primary lg" data-act="go">${icon('play')} Kick Off</button><button class="btn ghost" data-act="back">Back</button></div>
      </div>`, {
      back: () => this.mainMenu(),
      go: () => {
        if (st.home === st.away) { this.toast('Pick two different clubs.', true); return; }
        this.lastQuick = { home: st.home, away: st.away, side: st.side, role: st.role, len: st.len, halfLength: HALF_LENGTHS[st.len] };
        app.startQuickMatch(this.lastQuick);
      },
    });
    const draw = () => {
      for (const side of [0, 1]) {
        const id = side === 0 ? st.home : st.away, c = clubById(id);
        const card = el.querySelector(`#tp-${side}`);
        card.classList.toggle('on', st.side === side);
        card.innerHTML = `<div class="row"><button class="btn icon sm" data-cyc="${side}" data-d="-1" aria-label="Previous club">${icon('left')}</button>${crestSVG(c, 72)}<button class="btn icon sm" data-cyc="${side}" data-d="1" aria-label="Next club">${icon('right')}</button></div>
          <div class="tp-name">${esc(c.name)}</div><div class="tp-tier">${esc(tierInfo(c.tier).league)} · ${side === 0 ? 'Home' : 'Away'}</div>
          <div class="row mid" style="justify-content:center"><button class="btn sm" data-pick="${side === 0 ? 'home' : 'away'}">All clubs</button></div>
          <div class="me">${st.side === side ? '<span class="badge gold">You play here</span>' : '<span class="badge">Tap to play here</span>'}</div>`;
      }
      el.querySelectorAll('[data-cyc]').forEach((b) => b.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = b.dataset.cyc === '0' ? 'home' : 'away';
        st[key] = order[(order.indexOf(st[key]) + +b.dataset.d + order.length) % order.length];
        this.sfx('uiClick', 0.3); draw();
      }));
      el.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); this.sfx('uiClick', 0.3); grid(b.dataset.pick); }));
    };
    const grid = (key) => {
      const g = el.querySelector('#club-grid');
      if (g.dataset.key === key && g.innerHTML) { g.innerHTML = ''; g.dataset.key = ''; return; }
      g.dataset.key = key;
      g.innerHTML = `<div class="club-grid">${TIERS.map((t) => `<div class="h-sec">${esc(t.league)}</div>${clubsInTier(t.tier).map((c) => `<button class="card pick club-chip ${c.id === st[key] ? 'on' : ''}" data-club="${c.id}">${crestSVG(c, 28)} ${esc(c.name)}</button>`).join('')}`).join('')}</div>`;
      g.querySelectorAll('[data-club]').forEach((b) => b.addEventListener('click', () => { st[key] = b.dataset.club; g.innerHTML = ''; g.dataset.key = ''; this.sfx('uiClick', 0.35); draw(); }));
    };
    el.querySelectorAll('.team-pick').forEach((card) => card.addEventListener('click', () => { st.side = +card.dataset.side; this.sfx('uiClick', 0.3); draw(); }));
    this.bindChoices(el, (k, v) => { st[k] = v; });
    draw();
  }

  // --------------------------------------------------------- training
  training(fromHub = false) {
    this.current = fromHub ? 'hubSub' : 'training';
    const c = this.app.store.career;
    const xpNote = c ? (c.trainingAvailable ? 'Your next drill earns XP.' : 'No XP until your next match.') : 'Practice only: no career running.';
    const card = (act, k, ic, name, desc, meta) => `<div class="card col" style="justify-content:space-between"><div><div class="row">${icon(ic, 26)}<b class="club-chip" style="font-size:17px">${esc(name)}</b></div>
      <div class="small" style="color:var(--text2);margin-top:6px;font-weight:600">${esc(desc)}</div></div>
      <div class="row"><span class="badge">${meta}</span><span class="spacer"></span><button class="btn primary sm" data-act="${act}" ${k ? `data-k="${k}"` : ''}>Start</button></div></div>`;
    const short = { passing: 'Pass through the lit gate to your teammate.', finishing: 'Finish the balls served into the box.', dribbling: 'Dribble through every gate, fast.', practice: 'Free play with a teammate, a defender and a keeper.' };
    const cards = Object.entries(DRILLS).map(([k, d]) => card('go', k, k === 'finishing' ? 'ball' : k === 'practice' ? 'eye' : 'cone', d.name, short[k] || d.desc, d.time ? `${d.time} s` : 'No timer')).join('');
    this.show(`<div class="panel wide"><div class="row"><div class="h-title" style="margin:0">Training</div><span class="spacer"></span><span class="badge ${c && c.trainingAvailable ? 'gold' : ''}">${esc(xpNote)}</span></div>
      <div class="grid2" style="margin-top:var(--s4)">${card('tut', '', 'whistle', 'Tutorial', 'The basics in under two minutes.', '2 min')}${cards}</div>
      <div class="actions"><button class="btn ghost" data-act="back">${icon('back', 18)} Back</button></div></div>`, {
      tut: () => this.startTutorial(),
      go: (b) => this.startDrill(b.dataset.k, fromHub),
      back: () => (fromHub ? this.hub() : this.mainMenu()),
    });
  }

  startDrill(kind, fromHub = false) {
    const app = this.app;
    const c = app.store.career;
    const human = { ...(c ? c.player : defaultPlayer()) };
    const drill = new Drill(kind, human);
    const club = c ? clubById(c.clubId) : CLUBS[0];
    const kits = resolveKits(club, CLUBS.find((x) => x.id !== club.id && x.tier === club.tier) || CLUBS[1]);
    const session = app.startSession({
      mode: 'drill', venue: 'training', venueOpts: { homeName: 'Training' },
      colours: { kits, human: human.look }, match: drill.matchConfig(), noStart: true,
      clockText: () => drill.clockText(), onStep: () => drill.step(),
      onEnd: () => this.drillResult(drill, fromHub),
    });
    drill.setup(session.match, app.view);
    session.drill = drill;
    session.cam.yaw = session.human.yaw;
    const orig = session.dispose.bind(session);
    session.dispose = () => { drill.dispose(); orig(); };
    const pump = () => {
      if (app.session !== session) return;
      while (drill.events.length) { const e = drill.events.shift(); app.hud.notify(e.text, e.kind); }
      requestAnimationFrame(pump);
    };
    pump();
    session.match.events.on('drillGoal', (e) => { app.view.celebrate(e.pos.x, e.pos.z, 0, 0.5); app.audio.play('net'); app.audio.play('cheer', { gain: 0.3 }); });
    app.hud.showBanner(DRILLS[kind].name, '', 2500);
  }

  // ------------------------------------------------------------ tutorial
  // Coach Ada's warm-up. Shown automatically on the first visit; finishing or
  // skipping it (here, in the pause menu or on its start card) retires it for good.
  startTutorial(o = {}) {
    const app = this.app;
    const c = app.store.career;
    const human = { ...(c ? c.player : defaultPlayer()) };
    const tut = new Tutorial(human);
    const club = c ? clubById(c.clubId) : CLUBS[0];
    const kits = resolveKits(club, CLUBS.find((x) => x.id !== club.id && x.tier === club.tier) || CLUBS[1]);
    this.tutorialFirst = !!o.first;
    const session = app.startSession({
      mode: 'tutorial', venue: 'training', venueOpts: { homeName: 'Training' },
      colours: { kits, human: human.look }, match: tut.matchConfig(), noStart: true,
      clockText: () => '', onStep: () => tut.step(),
      onEnd: () => this.tutorialResult(tut),
    });
    tut.setup(session.match, app.view);
    session.tutorial = tut;
    session.cam.yaw = session.human.yaw;
    app.hud.root.classList.add('tut');
    const card = new CoachCard(app.uiRoot, STEPS.length, () => this.skipTutorial());
    const orig = session.dispose.bind(session);
    session.dispose = () => { tut.dispose(); card.dispose(); app.hud.root.classList.remove('tut'); orig(); };
    const objV = new THREE.Vector3();
    const pump = () => {
      if (app.session !== session) return;
      while (tut.events.length) this.tutorialFx(tut.events.shift(), session);
      const st = tut.current;
      const touch = app.input.touchMode;
      const live = st && tut.waitUntil == null && tut.endAt == null;
      card.show(!app.paused && !session.ended);
      const goal = !app.paused && !session.ended ? tut.objective(objV) : null;
      card.pointAt(goal ? app.view.projectToScreen(goal, goal) : null);
      card.update({
        index: tut.idx, doneCount: tut.results.length, say: tut.say, stars: tut.stars, keyboard: !touch,
        hint: live ? st.hint[touch ? 1 : 0] : '', frac: live ? 1 - tut.stepT / st.cap : 0,
      });
      requestAnimationFrame(pump);
    };
    pump();
    return session;
  }

  tutorialFx(e, session) {
    const app = this.app, v = app.view, h = session.human;
    switch (e.type) {
      case 'note': app.hud.notify(e.text, e.kind); break;
      case 'step': app.audio.play('uiConfirm', { gain: 0.3 }); break;
      case 'star': v.celebrate(e.x, e.z, 0, 0.45); break;
      case 'done': if (e.ok) { v.celebrate(e.x, e.z, 0, e.big ? 1.2 : 0.3); app.audio.play(e.star ? 'uiReward' : 'uiConfirm', { gain: 0.45 }); } break;
      case 'goal': app.audio.play('net'); app.audio.play('cheer', { gain: 0.55 }); app.hud.showBanner('GOAL!', 'Sleepy Sam never saw it coming', 1400, 'mine'); break;
      case 'fade': app.hud.flashFade(); break;
      case 'finale': app.audio.play('whistle', { gain: 0.5 }); app.audio.play('cheer', { gain: 0.35 }); v.celebrate(h.pos.x + Math.sin(h.yaw) * 4, h.pos.z + Math.cos(h.yaw) * 4, 0, 1.2); break;
    }
  }

  skipTutorial() {
    markTutorial('skipped');
    const app = this.app;
    if (app.session) app.endSession();
    this.mainMenu();
    this.toast('Tutorial skipped. Replay it any time from the menu.');
  }

  tutorialResult(tut) {
    const app = this.app;
    app.input.active = false;
    app.input.exitLock();
    markTutorial('done');
    platform.happytime();
    const r = tut.result();
    const stars = Array.from({ length: r.total }, (_, i) => `<i class="${i < r.stars ? '' : 'off'}" style="animation-delay:${0.25 + i * 0.08}s">★</i>`).join('');
    const time = `${Math.floor(r.time / 60)}:${String(Math.floor(r.time % 60)).padStart(2, '0')}`;
    const c = app.store.career;
    this.current = 'tutorialResult';
    this.show(`<div class="panel result">
      <span class="badge gold">${r.timeUp ? 'Time\'s up' : 'Warm-up complete'}</span>
      <div class="stars" aria-label="${r.stars} of ${r.total} stars" style="margin-top:var(--s3)">${stars}</div>
      <div class="result-word win" style="font-size:clamp(40px,8vw,64px)">${esc(r.rank)}</div>
      <p class="lead" style="margin-top:var(--s3)">${r.stars} of ${r.total} stars · ${time}</p>
      <div class="actions mid">
        <button class="btn primary lg" data-act="career">${c ? 'Continue your career' : 'Start your career'}</button>
        <button class="btn ghost" data-act="menu">Main menu</button>
      </div></div>`, {
      career: () => { app.endSession(); if (c) this.hub(); else this.newCareer(); },
      menu: () => { app.endSession(); this.mainMenu(); },
    });
    this.sfx('uiReward', 0.4);
  }

  drillResult(drill, fromHub) {
    const app = this.app;
    app.input.active = false;
    app.input.exitLock();
    const r = drill.result();
    const c = app.store.career;
    let reward = '';
    if (drill.kind === 'practice') reward = '<div class="reward plain">Free practice · no XP</div>';
    else if (c && c.trainingAvailable) {
      const ups = addXp(c, r.xp);
      c.trainingAvailable = false;
      this.saveCareer();
      reward = `<div class="reward">${icon('star', 18)} +${r.xp} XP${ups ? ` · ${ups} upgrade point${ups > 1 ? 's' : ''}!` : ''}</div>`;
    } else if (c) reward = '<div class="reward plain">No XP until your next match</div>';
    this.current = 'drillResult';
    this.show(`<div class="panel result"><div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${esc(drill.def.name)}</div>
      <div class="result-word" style="font-size:clamp(34px,6vw,52px);margin:var(--s3) 0">${esc(r.text)}</div>${reward}
      <div class="actions mid"><button class="btn primary lg" data-act="again">${icon('play')} Try again</button><button class="btn ghost" data-act="back">Back to Training</button></div></div>`, {
      again: () => { app.endSession(); this.startDrill(drill.kind, fromHub); },
      back: () => { app.endSession(); this.training(fromHub); },
    });
    this.sfx('uiReward', 0.35);
  }

  // ------------------------------------------------------ visual style
  styleMenu(fromPause = false, back = null) {
    this.current = fromPause ? 'pauseSub' : 'style';
    const app = this.app;
    let imgs = {};
    try {
      // with a match running, preview exactly what the player sees; otherwise a pitch-side view
      const pc = app.session ? null : { pos: [-14, 8, 27], look: [6, 0.8, -2] };
      for (const s of ['classic', 'neo']) imgs[s] = app.view.renderPreview(s, 480, 270, pc);
    } catch (e) { imgs = {}; }
    const card = (s, label, desc) => `<div class="card pick preview ${app.style === s ? 'on' : ''}" data-act="pick" data-s="${s}">${imgs[s] ? `<img src="${imgs[s]}" alt="${label}">` : ''}<h3>${label}</h3><div class="small" style="color:var(--text2);font-weight:600">${desc}</div></div>`;
    this.show(`<div class="panel wide"><div class="h-title">Visual Style</div>
      <div class="previews">${card('classic', 'Classic', 'Ink drawing: pale colours, thin black lines.')}${card('neo', 'Neobrutalist', 'Bold colours, thick outlines, hard shadows.')}</div>
      <div class="actions"><button class="btn primary" data-act="back">Done</button></div></div>`, {
      pick: (b) => { app.setStyle(b.dataset.s); this.styleMenu(fromPause, back); },
      back: () => (back ? back() : fromPause ? this.pauseMenu() : this.mainMenu()),
    });
  }

  // ---------------------------------------------------------- settings
  settings(fromPause = false, tab = 'game') {
    this.current = fromPause ? 'pauseSub' : 'settings';
    const app = this.app, s = app.settings;
    const sec = (k, html) => `<div class="tab-body" data-body="${k}" ${k === tab ? '' : 'hidden'}>${html}</div>`;
    const row = (label, ctrl) => `<div class="set"><span class="lab">${label}</span>${ctrl}</div>`;
    const onOff = (key) => this.seg(key, [[true, 'On'], [false, 'Off']], s[key]);
    const el = this.show(`<div class="panel mid"><div class="h-title">Settings</div>
      <div class="tabs">${[['game', 'Game'], ['controls', 'Controls'], ['video', 'Video'], ['audio', 'Audio']].map(([k, l]) => `<button class="tab ${k === tab ? 'on' : ''}" data-tab="${k}">${l}</button>`).join('')}</div>
      ${sec('game', `${row('Difficulty', this.seg('difficulty', Object.entries(DIFFICULTY).map(([k, d]) => [k, d.label]), s.difficulty))}
        <div class="small muted" style="margin:-4px 0 6px">Assisted: the ball sticks to you, passes find teammates, easier opponents.</div>
        ${row('Halves', this.seg('matchLength', [['short', '2 min'], ['normal', '3 min'], ['long', '5 min']], s.matchLength))}
        ${row('Goal replays', onOff('replays'))}`)}
      ${sec('controls', `${row('Look speed', this.slider('s-sens', 0.2, 3, 0.05, s.sensitivity, s.sensitivity.toFixed(2)))}
        ${row('Invert Y', this.seg('invertY', [[false, 'Off'], [true, 'On']], s.invertY))}
        ${row('Touch controls', this.seg('touch', [['auto', 'Auto'], ['on', 'On'], ['off', 'Off']], s.touch))}`)}
      ${sec('video', `${row('Style', `<div class="row">${this.seg('style', [['classic', 'Classic'], ['neo', 'Neo']], app.style)}<button class="btn sm icon" data-act="preview" title="Preview" aria-label="Preview styles">${icon('eye', 18)}</button></div>`)}
        ${row('Quality', this.seg('quality', [['low', 'Low'], ['medium', 'Medium'], ['high', 'High']], s.quality))}
        ${row('Field of view', this.slider('s-fov', FOV_MIN, FOV_MAX, 1, s.fov, fovLabel(s.fov)))}
        ${row('View bob', onOff('bob'))}
        ${row('Camera shake', onOff('shake'))}`)}
      ${sec('audio', `${row('Master', this.slider('s-master', 0, 1, 0.05, s.master, pct(s.master)))}
        ${row('Effects', this.slider('s-sfx', 0, 1, 0.05, s.sfx, pct(s.sfx)))}
        ${row('Crowd', this.slider('s-crowd', 0, 1, 0.05, s.crowd, pct(s.crowd)))}`)}
      <div class="actions"><button class="btn primary lg" data-act="back">Done</button></div></div>`, {
      back: () => { app.applySettings(); fromPause ? this.pauseMenu() : this.mainMenu(); },
      preview: () => { app.applySettings(); this.styleMenu(fromPause, () => this.settings(fromPause, 'video')); },
    });
    el.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => {
      tab = t.dataset.tab;
      el.querySelectorAll('.tab').forEach((x) => x.classList.toggle('on', x === t));
      el.querySelectorAll('.tab-body').forEach((b) => { b.hidden = b.dataset.body !== tab; });
      this.sfx('uiClick', 0.3);
    }));
    const bindRange = (id, key, fmt) => {
      const r = el.querySelector(`#${id}`);
      r.addEventListener('input', () => {
        s[key] = parseFloat(r.value);
        r.style.setProperty('--p', `${((s[key] - +r.min) / (+r.max - +r.min)) * 100}%`);
        el.querySelector(`#v-${id.slice(2)}`).textContent = fmt(s[key]);
        app.applySettings();
      });
    };
    bindRange('s-sens', 'sensitivity', (v) => v.toFixed(2)); bindRange('s-fov', 'fov', fovLabel);
    bindRange('s-master', 'master', pct); bindRange('s-sfx', 'sfx', pct); bindRange('s-crowd', 'crowd', pct);
    this.bindChoices(el, (key, v) => {
      if (key === 'style') { app.setStyle(v); return; }
      s[key] = v;
      app.applySettings();
      if (key === 'difficulty' && app.session) this.toast('Difficulty applies from the next match.');
    });
  }

  // ------------------------------------------------------------ how to
  howTo(fromPause = false) {
    this.current = fromPause ? 'pauseSub' : 'help';
    const touchFirst = this.app.input.touchMode;
    const keys = (list) => `<div class="keys">${list.map(([k, d]) => `<div class="key"><span class="kc">${esc(k)}</span><span>${esc(d.split(' (')[0].split(';')[0])}</span></div>`).join('')}</div>`;
    const tip = (t, d) => `<div class="tip"><b>${t}</b>${d}</div>`;
    const el = this.show(`<div class="panel wide"><div class="h-title">How to Play</div>
      <div class="tabs"><button class="tab ${touchFirst ? '' : 'on'}" data-tab="kb">Keyboard &amp; mouse</button><button class="tab ${touchFirst ? 'on' : ''}" data-tab="touch">Touch</button></div>
      <div class="tab-body" data-body="kb" ${touchFirst ? 'hidden' : ''}>${keys(CONTROLS)}</div>
      <div class="tab-body" data-body="touch" ${touchFirst ? '' : 'hidden'}>${keys(TOUCH_CONTROLS)}</div>
      <div class="h-sec">Tips</div>
      <div class="tips">
        ${tip('First touch', 'Just let the ball reach your feet.')}
        ${tip('Passing', 'Look at a teammate: the ring shows who gets it.')}
        ${tip('Green edge', 'The ball is yours. It sticks to your feet.')}
        ${tip('Defending', 'Get close and tackle, or slide in.')}
      </div>
      <div class="h-sec">Rules</div>
      <div class="tips">
        ${tip('7-a-side', 'Two short halves. No offside.')}
        ${tip('Career', 'Play well, earn XP, get offers from bigger clubs.')}
      </div>
      <div class="small muted" style="margin-top:var(--s4)">Rendering: three.js (MIT). Clubs, kit colours and grounds: openfootball/football.json (public domain, 2026/27 and 2025/26). Crests are generated badges; squad players are fictional.</div>
      <div class="actions"><button class="btn primary" data-act="back">Got it</button></div></div>`, {
      back: () => (fromPause ? this.pauseMenu() : this.mainMenu()),
    });
    el.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => {
      el.querySelectorAll('.tab').forEach((x) => x.classList.toggle('on', x === t));
      el.querySelectorAll('.tab-body').forEach((b) => { b.hidden = b.dataset.body !== t.dataset.tab; });
      this.sfx('uiClick', 0.3);
    }));
  }

  // -------------------------------------------------------------- pause
  pauseMenu() {
    this.current = 'pause';
    const app = this.app;
    const sess = app.session;
    const mode = sess ? sess.cfg.mode : null;
    const exitLabel = mode === 'career' ? 'Exit to Career Hub' : mode === 'drill' ? 'Exit to Training' : mode === 'tutorial' ? 'Skip tutorial' : 'Exit to Main Menu';
    this.show(`<div class="panel narrow center-t"><div class="h-title">Paused</div>
      <div class="col">
        <button class="btn primary lg block" data-act="resume">${icon('play')} Resume</button>
        <div class="grid2" style="gap:var(--s2)">
          <button class="btn sm" data-act="settings">${icon('gear', 18)} Settings</button>
          <button class="btn sm" data-act="controls">${icon('help', 18)} Controls</button>
          <button class="btn sm" data-act="style">${icon('brush', 18)} Visual Style</button>
          ${sess && mode !== 'drill' && mode !== 'tutorial' ? `<button class="btn sm" data-act="stats">${icon('chart', 18)} Stats</button>` : ''}
        </div>
        <button class="btn ghost block" data-act="exit">${exitLabel}</button>
      </div>
      ${mode === 'career' ? '<div class="small muted" style="margin-top:var(--s3)">Leaving abandons this match.</div>' : ''}</div>`, {
      resume: () => app.resume(),
      controls: () => this.howTo(true),
      settings: () => this.settings(true),
      style: () => this.styleMenu(true),
      stats: () => this.liveStats(),
      exit: () => {
        if (mode === 'tutorial') { this.skipTutorial(); return; }
        app.endSession();
        if (mode === 'career') this.hub(); else if (mode === 'drill') this.training(!!app.store.career); else this.mainMenu();
      },
    });
  }

  liveStats() {
    this.current = 'pauseSub';
    const m = this.app.session.match;
    const h = m.human;
    const r = m.stats.report(h);
    const st = r.stats;
    const mini = (v, l) => `<div class="mini"><b>${v}</b><span>${l}</span></div>`;
    this.show(`<div class="panel narrow center-t"><div class="h-title">Match Stats</div>
      <div class="scoreline" style="margin-top:0"><div class="side">${esc(m.teams[0].short)}</div><div class="sc">${r.score[0]} - ${r.score[1]}</div><div class="side">${esc(m.teams[1].short)}</div></div>
      <div class="rating-hero"><span class="lab">Rating now</span><span class="num">${f1(r.rating)}</span></div>
      <div class="mini-stats">${mini(st.goals, 'Goals')}${mini(st.assists, 'Assists')}${mini(st.passAtt ? st.passAcc + '%' : '-', 'Passing')}${mini(st.tacklesWon, 'Tackles')}</div>
      <div class="small muted" style="margin-top:var(--s3)">Possession ${r.possession[0]}% - ${r.possession[1]}%</div>
      <div class="actions mid"><button class="btn primary" data-act="back">Back</button></div></div>`, { back: () => this.pauseMenu() });
  }

  // one click starts play (pointer lock needs a user gesture)
  clickToPlay() {
    this.current = 'click';
    const sess = this.app.session;
    const first = !this.seenControls;
    this.seenControls = true;
    const title = sess && sess.cfg.title ? `<div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${esc(sess.cfg.title)}</div>` : '';
    const touch = this.app.input.touchMode;
    if (sess && sess.cfg.mode === 'tutorial') {
      this.show(`<div class="panel narrow center-t">
        <span class="badge gold">2-minute warm-up</span>
        <div class="h-title" style="margin-top:var(--s3)">Welcome to First Touch!</div>
        <p class="lead">Coach Ada shows you the basics. Be quick to earn stars.</p>
        <div class="actions mid"><button class="btn primary lg" data-act="start">${icon('play')} Start tutorial</button><button class="btn ghost" data-act="skip">Skip tutorial</button></div>
        <div class="small muted" style="margin-top:var(--s3)">${touch ? 'Best with the phone sideways.' : 'Esc pauses at any time.'}</div></div>`, {
        start: () => this.app.resume(),
        skip: () => this.skipTutorial(),
      });
      return;
    }
    const quick = touch
      ? [['Left thumb', 'Move'], ['Right thumb', 'Look'], ['SHOOT', 'Hold & release'], ['PASS', 'To the ring'], ['TACKLE', 'Win it back'], ['II', 'Pause']]
      : [['WASD', 'Move'], ['Mouse', 'Look'], ['Shift', 'Sprint'], ['Left click', 'Shoot'], ['Right click', 'Pass'], ['E / C', 'Tackle / slide']];
    const keys = `<div class="keys" style="margin-top:var(--s4);text-align:left">${quick.map(([k, d]) => `<div class="key"><span class="kc">${k}</span><span>${d}</span></div>`).join('')}</div>`;
    this.show(`<div class="panel mid go-card">${title}<div class="go-big">${touch ? 'Tap to play' : 'Click to play'}</div>
      ${first ? keys : `<div class="go-sub">${touch ? 'Left thumb move · right thumb look' : 'WASD move · mouse look · Esc pause'}</div>`}</div>`, {}, 'screen center dim');
    this.root.firstChild.addEventListener('click', () => { this.sfx('uiConfirm', 0.3); this.app.resume(); }, { once: true });
  }

  lockRefused() {
    this.current = 'lock';
    this.show(`<div class="panel narrow center-t"><div class="go-big" style="font-size:36px">Click to resume</div><p class="lead">The browser didn't capture the mouse. Click again, or play with drag-to-look.</p>
      <div class="actions mid"><button class="btn primary lg" data-act="r">Resume</button><button class="btn" data-act="d">Drag-look</button></div></div>`, {
      r: () => this.app.resume(),
      d: () => { this.app.input.dragMode = true; this.app.resume(); },
    });
  }
}

// field of view readout; past 120 degrees the game switches to its wide projection
function fovLabel(v) { return v > 120 ? `${v}° wide` : `${v}°`; }
function pct(v) { return `${Math.round(v * 100)}%`; }
