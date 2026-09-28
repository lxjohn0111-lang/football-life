// DOM screens: main menu, career creation, career hub, match report, quick
// match, training, visual style (with previews rendered by the game itself),
// settings, how to play / credits and the pause menu.
import { CONTROLS } from '../core/input.js';
import { FOV_MIN, FOV_MAX } from '../core/settings.js';
import { CLUBS, clubById, crestSVG, tierInfo, NATIONALITIES, clubsInTier, TIERS } from '../career/clubs.js';
import {
  createCareer, nextFixture, sortedTable, ATTRS, ATTR_LABELS, posName, upgradeAttr, attrStep, interestList,
  acceptOffer, declineWindow, canStartNewSeason, startNewSeason, commitMatch, avgRating, ordinal, addXp, TIER_REQ,
} from '../career/career.js';
import { POSITIONS, HALF_LENGTHS } from '../sim/constants.js';
import { DIFFICULTY } from '../sim/match.js';
import { DRILLS, Drill } from '../game/drills.js';
import { defaultPlayer } from '../career/teams.js';
import { resolveKits } from '../render/palette.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const f1 = (x) => (Math.round(x * 10) / 10).toFixed(1);

export class Screens {
  constructor(app) {
    this.app = app;
    this.root = document.createElement('div');
    this.root.className = 'screens';
    app.uiRoot.appendChild(this.root);
    this.current = null;
    this.stack = [];
  }

  // render html and bind [data-act] buttons
  show(html, acts = {}, cls = 'screen center dim') {
    this.root.innerHTML = `<div class="${cls}">${html}</div>`;
    this.root.querySelectorAll('[data-act]').forEach((b) => {
      const fn = acts[b.dataset.act];
      if (fn) b.addEventListener('click', (e) => { e.preventDefault(); this.app.audio.play('ui', { gain: 0.4 }); fn(b, e); });
    });
    return this.root.firstChild;
  }
  clear() { this.root.innerHTML = ''; this.current = null; }
  back() {
    if (this.current === 'menu' || this.app.session) return;
    if (this.current === 'hubSub') { this.hub(); return; }
    this.mainMenu();
  }
  toast(text, bad = false, ms = 3200) {
    const t = document.createElement('div');
    t.className = 'toast' + (bad ? ' bad' : '');
    t.textContent = text;
    this.app.uiRoot.appendChild(t);
    setTimeout(() => t.remove(), ms);
  }
  saveCareer() {
    const r = this.app.store.save();
    if (!r.ok) this.toast(`Could not save your career: ${r.error} Your progress is kept only until you close the page.`, true, 6000);
    return r.ok;
  }

  // ---------------------------------------------------------------- menu
  mainMenu() {
    this.current = 'menu';
    const app = this.app;
    app.hud.show(false);
    const c = app.store.career;
    const cont = c ? `<button class="btn big primary" data-act="cont">Continue Career<small>${esc(c.player.name)} · ${esc(clubById(c.clubId).name)} · Season ${c.seasonNo}</small></button>` : '';
    this.show(`
      <div class="title">First<br>Touch</div>
      <div class="subtitle">A first-person football career. You are one player on the pitch.</div>
      ${cont}
      <button class="btn big ${c ? '' : 'primary'}" data-act="new">New Career<small>Create a footballer and start at a community club</small></button>
      <button class="btn big" data-act="quick">Quick Match<small>Any two clubs, no effect on your career</small></button>
      <button class="btn big" data-act="train">Training<small>Passing, finishing and dribbling drills, free practice</small></button>
      <button class="btn big" data-act="style">Visual Style<small>Classic ink or Neobrutalist</small></button>
      <button class="btn big" data-act="settings">Settings</button>
      <button class="btn big" data-act="help">How to Play / Credits</button>
    `, {
      cont: () => this.hub(),
      new: () => (c ? this.confirm('Start a new career? Your existing career will be overwritten.', () => this.newCareer(), () => this.mainMenu()) : this.newCareer()),
      quick: () => this.quickMatch(),
      train: () => this.training(),
      style: () => this.styleMenu(),
      settings: () => this.settings(),
      help: () => this.howTo(),
    }, 'screen menu');
    if (app.store.notice) { this.toast(app.store.notice.text, app.store.notice.bad, 7000); app.store.notice = null; }
  }

  confirm(text, yes, no) {
    this.show(`<div class="panel" style="max-width:520px"><h2>Are you sure?</h2><p>${esc(text)}</p><div class="row"><button class="btn danger" data-act="yes">Yes, overwrite</button><button class="btn" data-act="no">Cancel</button></div></div>`, { yes, no });
  }

  // --------------------------------------------------------- new career
  newCareer() {
    this.current = 'new';
    const d = defaultPlayer();
    const pos = POSITIONS.map((p) => `<button class="btn ${p.id === 'ST' ? 'on' : ''}" data-pos="${p.id}">${p.name}</button>`).join('');
    const starters = clubsInTier(1).map((c, i) => `<button class="btn ${i === 0 ? 'on' : ''}" data-club="${c.id}">${crestSVG(c, 22)} ${esc(c.name)}</button>`).join('');
    const posDesc = {
      ST: 'Starts high up the pitch. Judged on goals, shots on target and movement. Training favours finishing.',
      W: 'Starts wide. Judged on goals, assists and chances created. Training favours pace and dribbling.',
      AM: 'Plays behind the striker. Judged on chance creation, assists and goals. Training favours passing.',
      CM: 'The link of the team. Judged on passing accuracy, ball winning and chances created.',
      DEF: 'Protects the goal. Judged on tackles, interceptions, clean sheets and distribution.',
    };
    const el = this.show(`
      <div class="panel" style="width:min(820px,94vw)">
        <h2>Create your footballer</h2>
        <div class="grid2">
          <label class="f">Name<input id="nc-name" maxlength="22" value="${esc(d.name)}"></label>
          <label class="f">Shirt number<input id="nc-num" type="number" min="1" max="99" value="9"></label>
          <label class="f">Nationality<select id="nc-nat">${NATIONALITIES.map((n) => `<option>${n}</option>`).join('')}</select></label>
          <label class="f">Dominant foot<select id="nc-foot"><option value="R">Right</option><option value="L">Left</option></select></label>
        </div>
        <h3>Appearance</h3>
        <div class="row">
          <label class="f">Skin<input id="nc-skin" type="color" value="#e0b48c"></label>
          <label class="f">Hair<input id="nc-hair" type="color" value="#3b2a1e"></label>
          <label class="f">Boots<input id="nc-boots" type="color" value="#111111"></label>
        </div>
        <h3>Preferred position</h3>
        <div class="seg" id="nc-pos">${pos}</div>
        <p class="muted small" id="nc-posdesc">${posDesc.ST}</p>
        <h3>Starting club</h3>
        <div class="seg" id="nc-club">${starters}</div>
        <p class="muted small">You start at a community club with a guaranteed place in the team. Goalkeepers are AI-controlled.</p>
        <div class="row" style="margin-top:14px"><button class="btn primary big" data-act="go">Sign your first contract</button><button class="btn" data-act="back">Back</button></div>
      </div>`, {
      back: () => this.mainMenu(),
      go: () => {
        const name = el.querySelector('#nc-name').value.trim() || 'A. Newcomer';
        const num = Math.max(1, Math.min(99, parseInt(el.querySelector('#nc-num').value, 10) || 9));
        const role = el.querySelector('#nc-pos .on').dataset.pos;
        const clubId = el.querySelector('#nc-club .on').dataset.club;
        const career = createCareer({
          name, number: num, nationality: el.querySelector('#nc-nat').value, foot: el.querySelector('#nc-foot').value, role, clubId,
          look: { skin: el.querySelector('#nc-skin').value, hair: el.querySelector('#nc-hair').value, boots: el.querySelector('#nc-boots').value },
        });
        this.app.store.career = career;
        this.saveCareer();
        this.hub();
      },
    });
    el.querySelectorAll('#nc-pos .btn').forEach((b) => b.addEventListener('click', () => {
      el.querySelectorAll('#nc-pos .btn').forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      el.querySelector('#nc-posdesc').textContent = posDesc[b.dataset.pos];
      const nums = { ST: 9, W: 11, AM: 10, CM: 8, DEF: 4 };
      el.querySelector('#nc-num').value = nums[b.dataset.pos];
    }));
    el.querySelectorAll('#nc-club .btn').forEach((b) => b.addEventListener('click', () => {
      el.querySelectorAll('#nc-club .btn').forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
    }));
  }

  // --------------------------------------------------------------- hub
  hub() {
    this.current = 'hub';
    const app = this.app;
    const c = app.store.career;
    if (!c) { this.mainMenu(); return; }
    const club = clubById(c.clubId);
    const s = c.season;
    const p = c.player;
    const fx = nextFixture(c);
    let next = '';
    if (c.window) {
      next = `<div class="next-fixture">Transfer window open</div><p class="muted">Review the offers before continuing.</p>`;
    } else if (fx) {
      const home = clubById(fx.home), away = clubById(fx.away);
      const venue = fx.final ? 'Continental Stadium (neutral)' : `${esc(home.ground)} · ${tierInfo(home.tier).venue === 'community' ? 'Community Ground' : tierInfo(home.tier).label + ' stadium'}`;
      next = `<div class="muted small">${fx.final ? esc(fx.name) : `${esc(s.league)} · Round ${fx.round} of 6`}</div>
        <div class="next-fixture">${crestSVG(home, 36)} ${esc(home.name)} <span class="muted">v</span> ${esc(away.name)} ${crestSVG(away, 36)}</div>
        <div class="muted small">${venue}</div>
        <div class="row" style="margin-top:12px"><button class="btn huge primary" data-act="play">Play Match</button></div>`;
    } else if (canStartNewSeason(c)) {
      const cup = s.final && s.final.played ? `<p>${s.final.won ? '🏆 <b>Continental Cup winners!</b>' : `Continental Cup Final: lost ${s.final.score ? s.final.score.join('-') : ''}.`}</p>` : '';
      next = `<div class="next-fixture">Season ${c.seasonNo} complete</div>
        <p>${esc(club.name)} finished <b>${ordinal(s.placement)}</b> in the ${esc(s.league)}.${s.placement === 1 ? ' 🏆 <b>Champions!</b>' : ''}</p>${cup}
        <button class="btn huge primary" data-act="season">Start Season ${c.seasonNo + 1}</button>`;
    }
    const table = sortedTable(s).map((t, i) => `<tr class="${t.id === c.clubId ? 'me' : ''}"><td>${i + 1}</td><td>${crestSVG(clubById(t.id), 18)} ${esc(clubById(t.id).name)}</td><td class="n">${t.p}</td><td class="n">${t.w}</td><td class="n">${t.d}</td><td class="n">${t.l}</td><td class="n">${t.gf - t.ga}</td><td class="n"><b>${t.pts}</b></td></tr>`).join('');
    const results = s.fixtures.filter((f) => f.score && (f.home === c.clubId || f.away === c.clubId)).map((f) => `<div>R${f.round}: ${esc(clubById(f.home).short)} ${f.score[0]}-${f.score[1]} ${esc(clubById(f.away).short)}</div>`).join('');
    const attrs = ATTRS.map((k) => `<div class="attr"><span>${ATTR_LABELS[k]}</span><div class="bar"><i style="width:${p.attrs[k]}%"></i></div><b>${p.attrs[k]}</b><button class="btn" data-act="up" data-k="${k}" ${p.points > 0 && p.attrs[k] < 99 ? '' : 'disabled'} title="+${attrStep(p.attrs[k])}">+</button></div>`).join('');
    const form = c.form.slice(-5).map((r) => `<span class="${r >= 7 ? 'hi' : r < 6 ? 'lo' : ''}">${f1(r)}</span>`).join('') || '<span class="muted small">no matches yet</span>';
    const T = c.totals;
    const seasonRec = c.seasons.find((x) => x.season === c.seasonNo && x.clubId === c.clubId) || { apps: 0, goals: 0, assists: 0, ratingSum: 0 };
    const interest = interestList(c).map((it) => `<div style="margin:8px 0"><div class="row">${crestSVG(it.club, 20)} <b>${esc(it.club.name)}</b><span class="spacer"></span><span class="small">${Math.round(it.score * 100)}%</span></div><div class="bar ${it.qualifies ? 'good' : ''}"><i style="width:${Math.round(it.score * 100)}%"></i></div><div class="small muted">${esc(it.text)}</div></div>`).join('') || '<p class="muted">You are at the top level. Keep performing to win the league and the Continental Cup.</p>';
    let offers = '';
    if (c.window) {
      offers = `<h3>${c.window.type === 'end' ? 'Season-end' : 'Mid-season'} transfer window</h3>` + (c.window.offers.length ? c.window.offers.map((o, i) => {
        const oc = clubById(o.clubId);
        return `<div class="offer"><div class="row">${crestSVG(oc, 30)}<div><b>${esc(oc.name)}</b> <span class="pill">Tier ${o.tier}</span><div class="small">${esc(o.role)} · ${o.wage.toLocaleString()} cr/week · ${o.years} season${o.years > 1 ? 's' : ''}</div></div></div>
          <div class="small" style="margin-top:6px"><b>Expectations:</b> ${esc(o.expectations)}</div>
          <div class="small"><b>Why:</b> ${o.reasons.map(esc).join('; ')}</div>
          <div class="row" style="margin-top:8px"><button class="btn primary" data-act="accept" data-i="${i}">${o.kind === 'renewal' ? 'Sign renewal' : 'Accept transfer'}</button></div></div>`;
      }).join('') : '<p class="muted">No clubs made an offer this window. Build your form and reputation.</p>')
        + `<button class="btn" data-act="decline">${c.window.offers.length ? `Stay at ${esc(club.name)}` : 'Continue'}</button>`;
    }
    const hist = c.seasons.map((r) => `<tr><td>S${r.season}</td><td>${esc(clubById(r.clubId).short)}</td><td class="n">${r.apps}</td><td class="n">${r.goals}</td><td class="n">${r.assists}</td><td class="n">${r.apps ? f1(r.ratingSum / r.apps) : '-'}</td><td class="n">${r.passAtt ? Math.round(r.passCmp / r.passAtt * 100) + '%' : '-'}</td><td class="n">${r.tackles}</td><td class="n">${r.placement ? ordinal(r.placement) : '-'}</td></tr>`).join('');
    const timeline = [...c.timeline].reverse().map((t) => `<div><span class="muted small">S${t.season}${t.round ? ' R' + Math.min(6, t.round) : ''}</span> ${esc(t.text)}</div>`).join('');
    const trophies = c.trophies.map((t) => `<span class="pill">🏆 ${esc(t.name)} S${t.season}</span>`).join(' ') || '<span class="muted small">none yet</span>';
    this.show(`
      <div class="hub-head">${crestSVG(club, 64)}<div><h1>${esc(club.name)}</h1><div class="muted">${esc(s.league)} · Season ${c.seasonNo} · ${esc(p.name)} #${p.number} · ${posName(p.role)} · ${esc(p.nationality)}</div></div>
        <span class="spacer"></span>
        <div class="col" style="text-align:right"><div><b>Level ${p.level}</b> · XP ${p.xp}/100 · Reputation ${Math.round(p.reputation)}</div><div class="small muted">Contract: ${c.contract.wage.toLocaleString()} cr/week · ${c.contract.years} season(s) left · ${esc(c.contract.role)}</div></div>
        <button class="btn" data-act="menu">Main Menu</button></div>
      <div class="hub-grid">
        <div class="col">
          <div class="panel">${next}${fx && !c.window ? `<div class="row" style="margin-top:10px"><button class="btn" data-act="train">Training ${c.trainingAvailable ? '(XP available)' : '(no XP until next match)'}</button></div>` : ''}</div>
          <div class="panel"><h3>${esc(s.league)}</h3><table class="t"><tr><th>#</th><th>Club</th><th class="n">P</th><th class="n">W</th><th class="n">D</th><th class="n">L</th><th class="n">GD</th><th class="n">Pts</th></tr>${table}</table><div class="small muted" style="margin-top:6px">${results}</div></div>
        </div>
        <div class="col">
          <div class="panel"><h3>Attributes</h3>${attrs}<div class="small muted">Upgrade points: <b>${p.points}</b>. Earn XP by playing (and a little from training).</div></div>
          <div class="panel"><h3>Recent form</h3><div class="form-dots">${form}</div>
            <h3>This season</h3><div class="small">${seasonRec.apps} apps · ${seasonRec.goals} goals · ${seasonRec.assists} assists · avg ${seasonRec.apps ? f1(seasonRec.ratingSum / seasonRec.apps) : '-'}</div>
            <h3>Career</h3><div class="small">${T.apps} apps · ${T.goals} goals · ${T.assists} assists · avg rating ${T.apps ? f1(avgRating(T)) : '-'} · pass accuracy ${T.passAtt ? Math.round(T.passCmp / T.passAtt * 100) + '%' : '-'} · ${T.tackles} tackles · earnings ${c.earnings.toLocaleString()} cr</div>
            <div style="margin-top:6px">${trophies}</div></div>
        </div>
        <div class="col">
          ${offers ? `<div class="panel">${offers}</div>` : ''}
          <div class="panel"><h3>Club interest</h3>${interest}<div class="small muted">Offers only arrive at transfer windows (after fixture 3 and at season end). Training does not count.</div></div>
          <div class="panel"><h3>Career history</h3><table class="t"><tr><th>S</th><th>Club</th><th class="n">Apps</th><th class="n">G</th><th class="n">A</th><th class="n">Avg</th><th class="n">Pass</th><th class="n">Tkl</th><th class="n">Pos</th></tr>${hist}</table>
            <h3>Timeline</h3><div class="timeline">${timeline}</div></div>
        </div>
      </div>`, {
      menu: () => this.mainMenu(),
      play: () => this.app.playCareerMatch(),
      train: () => this.training(true),
      season: () => { startNewSeason(c); this.saveCareer(); this.hub(); },
      up: (b) => { if (upgradeAttr(c, b.dataset.k)) { this.saveCareer(); this.hub(); } },
      accept: (b) => { acceptOffer(c, +b.dataset.i); this.saveCareer(); this.hub(); },
      decline: () => { declineWindow(c); this.saveCareer(); this.hub(); },
    }, 'screen hub');
  }

  // ------------------------------------------------------------ report
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
    const bd = rep.breakdown;
    const why = [...bd.pos.slice(0, 3).map((x) => `<div class="plus">+${x.v.toFixed(2)} ${esc(x.label)}</div>`), ...bd.neg.slice(0, 3).map((x) => `<div class="minus">${x.v.toFixed(2)} ${esc(x.label)}</div>`)].join('') || '<div class="muted">A quiet game.</div>';
    const goals = rep.goals.map((g) => `<div class="small">${g.clock} ${esc(m.teams[g.team].short)} - ${g.ownGoal ? `own goal (${esc(g.ownGoalBy || '')})` : esc(g.scorer || '?')}${g.assist ? ` (assist ${esc(g.assist)})` : ''}</div>`).join('');
    const stat = (v, l) => `<div class="stat"><b>${v}</b><span>${l}</span></div>`;
    const resultWord = (() => {
      const my = rep.score[h.team], th = rep.score[1 - h.team];
      return my > th ? 'Win' : my < th ? 'Defeat' : 'Draw';
    })();
    const xpLine = summary && !summary.duplicate ? `<div class="small">+${summary.xp} XP${summary.levelUps ? ` · <b>${summary.levelUps} upgrade point${summary.levelUps > 1 ? 's' : ''} earned</b>` : ''} · reputation ${summary.rep >= 0 ? '+' : ''}${summary.rep.toFixed(1)}</div>` : o.quick ? '<div class="small muted">Quick match: no effect on your career.</div>' : '';
    this.show(`
      <div class="panel report">
        <div class="row"><h2>${o.title || 'Match Report'}</h2><span class="spacer"></span><span class="pill">${resultWord}</span></div>
        <div class="big-score">${esc(m.teams[0].name)} ${rep.score[0]} - ${rep.score[1]} ${esc(m.teams[1].name)}</div>
        ${goals}
        <div class="row" style="margin:12px 0;gap:24px">
          <div><div class="small">MATCH RATING</div><div class="rating-big">${f1(rep.rating)}</div></div>
          <div class="why small"><b>Biggest rating changes</b>${why}</div>
          <span class="spacer"></span>
          <div class="small">Minutes played: <b>${rep.minutes}</b><br>Possession ${rep.possession[0]}% - ${rep.possession[1]}%<br>Shots ${rep.teamShots[0]} (${rep.teamShotsOn[0]}) - ${rep.teamShots[1]} (${rep.teamShotsOn[1]})<br>Player of the match: <b>${rep.motm ? esc(rep.motm.name) + ' ' + f1(rep.motm.rating) : '-'}</b></div>
        </div>
        <div class="statgrid">
          ${stat(st.goals, 'Goals')}${stat(st.assists, 'Assists')}${stat(`${st.passCmp}/${st.passAtt}`, 'Passes completed')}${stat(st.passAtt ? st.passAcc + '%' : '-', 'Pass accuracy')}
          ${stat(st.shots, 'Shots')}${stat(st.shotsOn, 'On target')}${stat(st.tacklesWon, 'Tackles won')}${stat(st.interceptions, 'Interceptions')}
          ${stat(st.possLost, 'Possession lost')}${stat(st.fouls, 'Fouls')}${stat(st.keyPasses, 'Chances created')}${stat(st.touches, 'Touches')}
        </div>
        ${xpLine}
        <div class="row" style="margin-top:14px"><button class="btn primary big" data-act="cont">${o.career ? 'Continue to Career Hub' : 'Continue'}</button>${o.quick ? '<button class="btn" data-act="again">Play again</button>' : ''}</div>
      </div>`, {
      cont: () => { app.endSession(); if (o.career) this.hub(); else if (o.quick) this.quickMatch(); else this.mainMenu(); },
      again: () => { app.endSession(); app.startQuickMatch(this.lastQuick || {}); },
    });
  }

  // ------------------------------------------------------- quick match
  quickMatch() {
    this.current = 'quick';
    const app = this.app;
    const q = this.lastQuick || { home: 'millbrook', away: 'ashford', side: 0, role: (app.store.career ? app.store.career.player.role : 'ST'), len: app.settings.matchLength };
    const opts = (sel) => TIERS.map((t) => `<optgroup label="Tier ${t.tier} · ${t.league}">${clubsInTier(t.tier).map((c) => `<option value="${c.id}" ${c.id === sel ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</optgroup>`).join('');
    const el = this.show(`
      <div class="panel" style="width:min(640px,94vw)">
        <h2>Quick Match</h2>
        <div class="grid2">
          <label class="f">Home club<select id="q-home">${opts(q.home)}</select></label>
          <label class="f">Away club<select id="q-away">${opts(q.away)}</select></label>
          <label class="f">You play for<select id="q-side"><option value="0" ${q.side === 0 ? 'selected' : ''}>Home</option><option value="1" ${q.side === 1 ? 'selected' : ''}>Away</option></select></label>
          <label class="f">Position<select id="q-role">${POSITIONS.map((p) => `<option value="${p.id}" ${p.id === q.role ? 'selected' : ''}>${p.name}</option>`).join('')}</select></label>
          <label class="f">Match length<select id="q-len"><option value="short">2 min halves</option><option value="normal">3 min halves</option><option value="long">5 min halves</option></select></label>
        </div>
        <p class="small muted">Uses ${app.store.career ? 'your career player' : 'a default player'} and the home club's stadium. Quick matches never change career progress.</p>
        <div class="row"><button class="btn primary big" data-act="go">Kick Off</button><button class="btn" data-act="back">Back</button></div>
      </div>`, {
      back: () => this.mainMenu(),
      go: () => {
        const o = { home: el.querySelector('#q-home').value, away: el.querySelector('#q-away').value, side: +el.querySelector('#q-side').value, role: el.querySelector('#q-role').value, len: el.querySelector('#q-len').value };
        if (o.home === o.away) { this.toast('Pick two different clubs.', true); return; }
        this.lastQuick = { ...o, halfLength: HALF_LENGTHS[o.len] };
        app.startQuickMatch(this.lastQuick);
      },
    });
    el.querySelector('#q-len').value = q.len || 'normal';
  }

  // --------------------------------------------------------- training
  training(fromHub = false) {
    this.current = fromHub ? 'hubSub' : 'training';
    const c = this.app.store.career;
    const xpNote = c ? (c.trainingAvailable ? 'Your next completed drill earns development XP (once between matches).' : 'You have already trained since your last match: drills give no XP until you play again.') : 'Without a career, drills are just for practice.';
    const cards = Object.entries(DRILLS).map(([k, d]) => `<div class="panel"><h3>${esc(d.name)}</h3><p class="small">${esc(d.desc)}</p><div class="small muted">${d.time ? `${d.time} seconds` : 'Untimed'}</div><button class="btn primary" data-act="go" data-k="${k}" style="margin-top:8px">Start</button></div>`).join('');
    this.show(`<div class="panel" style="width:min(1000px,96vw)"><h2>Training Ground</h2><p class="small">${xpNote} Training never counts towards club interest.</p><div class="grid2">${cards}</div><div class="row" style="margin-top:12px"><button class="btn" data-act="back">Back</button></div></div>`, {
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
    app.hud.showBanner(DRILLS[kind].name, DRILLS[kind].desc, 3500);
  }

  drillResult(drill, fromHub) {
    const app = this.app;
    app.input.active = false;
    app.input.exitLock();
    const r = drill.result();
    const c = app.store.career;
    let xpText = '';
    if (drill.kind === 'practice') xpText = '<p class="muted">Free practice gives no XP.</p>';
    else if (c && c.trainingAvailable) {
      const ups = addXp(c, r.xp);
      c.trainingAvailable = false;
      this.saveCareer();
      xpText = `<p><b>+${r.xp} XP</b>${ups ? ` · ${ups} upgrade point${ups > 1 ? 's' : ''} earned` : ''}</p>`;
    } else if (c) xpText = '<p class="muted">No XP: you have already trained since your last match.</p>';
    this.show(`<div class="panel" style="max-width:520px"><h2>${esc(drill.def.name)}</h2><p style="font-size:20px"><b>${esc(r.text)}</b></p>${xpText}
      <div class="row"><button class="btn primary" data-act="again">Try again</button><button class="btn" data-act="back">Back to Training</button></div></div>`, {
      again: () => { app.endSession(); this.startDrill(drill.kind, fromHub); },
      back: () => { app.endSession(); this.training(fromHub); },
    });
  }

  // ------------------------------------------------------ visual style
  styleMenu(fromPause = false) {
    this.current = fromPause ? 'pauseSub' : 'style';
    const app = this.app;
    let imgs = {};
    try {
      // with a match running, preview exactly what the player sees; otherwise a pitch-side view
      const pc = app.session ? null : { pos: [-14, 8, 27], look: [6, 0.8, -2] };
      for (const s of ['classic', 'neo']) imgs[s] = app.view.renderPreview(s, 480, 270, pc);
    } catch (e) { imgs = {}; }
    const card = (s, label, desc) => `<div class="preview ${app.style === s ? 'on' : ''}" data-act="pick" data-s="${s}">${imgs[s] ? `<img src="${imgs[s]}" alt="${label}">` : ''}<h3>${label}</h3><div class="small">${desc}</div></div>`;
    this.show(`<div class="panel" style="width:min(820px,96vw)"><h2>Visual Style</h2><p class="small muted">Previews are rendered live from the game. Switching is instant and never interrupts play.</p>
      <div class="previews">${card('classic', 'Classic', 'Pale unlit surfaces, thin black ink edges, restrained kits, paper interface.')}${card('neo', 'Neobrutalist', 'Saturated colours, 3 px outlines, toon shading with hard sun shadows, bold interface.')}</div>
      <div class="row" style="margin-top:14px"><button class="btn" data-act="back">Back</button></div></div>`, {
      pick: (b) => { app.setStyle(b.dataset.s); this.styleMenu(fromPause); },
      back: () => (fromPause ? this.pauseMenu() : this.mainMenu()),
    });
  }

  // ---------------------------------------------------------- settings
  settings(fromPause = false) {
    this.current = fromPause ? 'pauseSub' : 'settings';
    const app = this.app, s = app.settings;
    const seg = (key, opts) => `<div class="seg" data-key="${key}">${opts.map(([v, l]) => `<button class="btn ${String(s[key]) === String(v) ? 'on' : ''}" data-v="${v}">${l}</button>`).join('')}</div>`;
    const el = this.show(`<div class="panel" style="width:min(640px,96vw)"><h2>Settings</h2>
      <div class="grid2">
        <label class="f">Mouse sensitivity <span id="v-sens">${s.sensitivity.toFixed(2)}</span><input type="range" min="0.2" max="3" step="0.05" id="s-sens" value="${s.sensitivity}"></label>
        <label class="f">Field of view <span id="v-fov">${fovLabel(s.fov)}</span><input type="range" min="${FOV_MIN}" max="${FOV_MAX}" step="1" id="s-fov" value="${s.fov}"></label>
        <label class="f">Master volume<input type="range" min="0" max="1" step="0.05" id="s-master" value="${s.master}"></label>
        <label class="f">Effects volume<input type="range" min="0" max="1" step="0.05" id="s-sfx" value="${s.sfx}"></label>
        <label class="f">Crowd volume<input type="range" min="0" max="1" step="0.05" id="s-crowd" value="${s.crowd}"></label>
      </div>
      <h3>Controls</h3>${seg('invertY', [[false, 'Normal Y'], [true, 'Invert Y']])}
      <h3>Difficulty</h3>${seg('difficulty', Object.entries(DIFFICULTY).map(([k, d]) => [k, d.label]))}
      <div class="small muted">Assisted (default): the ball sticks to your feet, passes find teammates and are chipped over blocked lanes, and opponents are slower and make more mistakes. Expert keeps only light assistance.</div>
      <h3>Camera</h3>${seg('bob', [[true, 'View bob on'], [false, 'View bob off']])} <div style="height:6px"></div>${seg('shake', [[true, 'Camera shake on'], [false, 'Camera shake off']])}
      <h3>Quality</h3>${seg('quality', [['low', 'Low'], ['medium', 'Medium'], ['high', 'High']])}
      <h3>Match length</h3>${seg('matchLength', [['short', '2 min halves'], ['normal', '3 min halves'], ['long', '5 min halves']])}
      <div class="row" style="margin-top:14px"><button class="btn primary" data-act="back">Done</button></div></div>`, {
      back: () => { app.applySettings(); fromPause ? this.pauseMenu() : this.mainMenu(); },
    });
    const bindRange = (id, key, lab) => el.querySelector(id).addEventListener('input', (e) => { s[key] = parseFloat(e.target.value); if (lab) el.querySelector(lab).textContent = key === 'fov' ? fovLabel(s[key]) : s[key].toFixed(2); app.applySettings(); });
    bindRange('#s-sens', 'sensitivity', '#v-sens'); bindRange('#s-fov', 'fov', '#v-fov');
    bindRange('#s-master', 'master'); bindRange('#s-sfx', 'sfx'); bindRange('#s-crowd', 'crowd');
    el.querySelectorAll('.seg').forEach((g) => g.querySelectorAll('.btn').forEach((b) => b.addEventListener('click', () => {
      const key = g.dataset.key;
      let v = b.dataset.v;
      if (v === 'true') v = true; else if (v === 'false') v = false;
      s[key] = v;
      g.querySelectorAll('.btn').forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      app.applySettings();
      if (key === 'difficulty' && app.session) this.toast('Difficulty applies from the next match.');
    })));
  }

  // ------------------------------------------------------------ how to
  howTo(fromPause = false) {
    this.current = fromPause ? 'pauseSub' : 'help';
    const rows = CONTROLS.map(([k, d]) => `<tr><td><b>${k}</b></td><td>${d}</td></tr>`).join('');
    this.show(`<div class="panel" style="width:min(860px,96vw);max-height:92vh;overflow:auto"><h2>How to Play</h2>
      <table class="t">${rows}</table>
      <h3>Playing</h3>
      <p class="small">You control one footballer and see the match through their eyes. Your teammates and opponents are AI. Receive the ball with a soft first touch by simply letting it reach your feet (move to push the touch into space). Press pass just before the ball arrives for a first-time pass; hold shoot while the ball arrives for a first-time finish. The ring shows who your pass will go to - look towards a teammate to choose them. While you have the ball the screen edge glows green; your close control keeps it at your feet, so opponents have to tackle you for it. Press E near a dribbler to lunge in with a tackle. Press Space without the ball to call for it: a teammate acknowledges and passes when you are open. Settings has the difficulty (how much help you get and how sharp the opponents are) and a field of view from 60 to 200 degrees.</p>
      <h3>Rules</h3>
      <p class="small">7-a-side on a 64 x 42 m pitch with 5 x 2 m goals. Two halves (3 minutes each by default; the clock is shown as a 90-minute match and stops during stoppages). Kick-offs, throw-ins, corners, goal kicks, free kicks and penalties are used. <b>There is no offside</b> in this small-sided format. Keepers may handle anywhere in their own area (no back-pass rule). A goal counts only when the whole ball crosses the line between the posts and under the bar.</p>
      <h3>Career</h3>
      <p class="small">Start at a community club. Each season has 6 league fixtures. Matches give development XP (100 XP = 1 upgrade point); drills give a little XP once between matches. Club interest comes from your last 5 ratings, your reputation, contributions in your position and appearances - never from training or time passing. Offers arrive at transfer windows after fixture 3 and at season end, normally from one tier higher.</p>
      <h3>Credits</h3>
      <p class="small">First Touch - design, code, geometry and synthesised audio made for this game. Rendering with three.js (MIT licence, vendored). All clubs, players and competitions are fictional.</p>
      <div class="row"><button class="btn primary" data-act="back">Back</button></div></div>`, {
      back: () => (fromPause ? this.pauseMenu() : this.mainMenu()),
    });
  }

  // -------------------------------------------------------------- pause
  pauseMenu() {
    this.current = 'pause';
    const app = this.app;
    const sess = app.session;
    const exitLabel = sess && sess.cfg.mode === 'career' ? 'Exit to Career Hub' : sess && sess.cfg.mode === 'drill' ? 'Exit to Training' : 'Exit to Main Menu';
    this.show(`<div class="panel" style="width:min(420px,92vw)"><h2>Paused</h2>
      <div class="col">
        <button class="btn primary big" data-act="resume">Resume</button>
        <button class="btn" data-act="controls">Controls</button>
        <button class="btn" data-act="settings">Settings</button>
        <button class="btn" data-act="style">Visual Style</button>
        ${sess && sess.cfg.mode !== 'drill' ? '<button class="btn" data-act="stats">Match Statistics</button>' : ''}
        <button class="btn danger" data-act="exit">${exitLabel}</button>
      </div>
      ${sess && sess.cfg.mode === 'career' ? '<p class="small muted">Leaving now abandons the match: it will not count and the fixture stays unplayed.</p>' : ''}</div>`, {
      resume: () => app.resume(),
      controls: () => this.howTo(true),
      settings: () => this.settings(true),
      style: () => this.styleMenu(true),
      stats: () => this.liveStats(),
      exit: () => {
        const mode = sess ? sess.cfg.mode : null;
        app.endSession();
        if (mode === 'career') this.hub(); else if (mode === 'drill') this.training(!!app.store.career); else this.mainMenu();
      },
    });
  }

  liveStats() {
    const m = this.app.session.match;
    const h = m.human;
    const r = m.stats.report(h);
    const st = r.stats;
    this.show(`<div class="panel" style="width:min(560px,94vw)"><h2>Match Statistics</h2>
      <div class="big-score">${esc(m.teams[0].short)} ${r.score[0]} - ${r.score[1]} ${esc(m.teams[1].short)}</div>
      <table class="t">
        <tr><td>Current rating</td><td class="n"><b>${f1(r.rating)}</b></td></tr>
        <tr><td>Goals / assists</td><td class="n">${st.goals} / ${st.assists}</td></tr>
        <tr><td>Passes completed</td><td class="n">${st.passCmp}/${st.passAtt} (${st.passAcc}%)</td></tr>
        <tr><td>Shots (on target)</td><td class="n">${st.shots} (${st.shotsOn})</td></tr>
        <tr><td>Tackles won / interceptions</td><td class="n">${st.tacklesWon} / ${st.interceptions}</td></tr>
        <tr><td>Possession lost / fouls</td><td class="n">${st.possLost} / ${st.fouls}</td></tr>
        <tr><td>Team possession</td><td class="n">${r.possession[0]}% - ${r.possession[1]}%</td></tr>
      </table>
      <div class="row" style="margin-top:12px"><button class="btn" data-act="back">Back</button></div></div>`, { back: () => this.pauseMenu() });
  }

  // one click starts play (pointer lock needs a user gesture)
  clickToPlay() {
    this.current = 'click';
    const sess = this.app.session;
    const first = !this.seenControls;
    this.seenControls = true;
    const title = sess && sess.cfg.title ? `<h2>${esc(sess.cfg.title)}</h2>` : '';
    const rows = CONTROLS.map(([k, d]) => `<tr><td><b>${k}</b></td><td>${d}</td></tr>`).join('');
    const tips = `<div class="small" style="margin-top:8px;text-align:left">Let passes reach your feet for a soft first touch. Look at a teammate to select them (ring), then right-click. Press pass or hold shoot just before the ball arrives to play it first time.</div>`;
    this.show(`<div class="panel" style="text-align:center;max-width:620px">${title}<div class="lockmsg">Click to play</div>
      ${first ? `<table class="t small" style="margin-top:10px;text-align:left">${rows}</table>${tips}` : '<div class="small muted">Mouse look · WASD move · Shift sprint · LMB shoot · RMB pass · Space through / call · E tackle · C slide · Esc pause</div>'}</div>`, {}, 'screen center dim');
    const scr = this.root.firstChild;
    scr.addEventListener('click', () => { this.app.resume(); }, { once: true });
  }

  lockRefused() {
    this.show(`<div class="panel" style="text-align:center"><div class="lockmsg">Click to resume</div><p class="small">The browser did not capture the mouse. Click again (browsers refuse for about a second after Esc).<br>Or play without capture: hold a mouse button and drag to look, or use the arrow keys.</p>
      <div class="row" style="justify-content:center"><button class="btn primary" data-act="r">Resume</button><button class="btn" data-act="d">Play with drag-look</button></div></div>`, {
      r: () => this.app.resume(),
      d: () => { this.app.input.dragMode = true; this.app.resume(); },
    });
  }
}

// field of view readout; past 120 degrees the game switches to its wide projection
function fovLabel(v) { return v > 120 ? `${v}° (wide view)` : `${v}°`; }
