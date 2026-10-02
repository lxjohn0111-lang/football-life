/* First Touch - bundled game. three.js is MIT licensed (see vendor/three/LICENSE). */
(()=>{var Cd=`/* First Touch interface: one arcade design system for every screen, the HUD and the
   touch controls (independent of the 3D visual style). Everything below is built from
   these shared tokens: colours, radii, borders, depth, type, sizes and spacing. */
:root {
  /* colour */
  --bg: #0e1430; --bg2: #141c40;
  --panel: #1b244e; --panel2: #243063; --panel3: #2f3d7a;
  --line: #070b1d; --edge: rgba(255, 255, 255, 0.09);
  --text: #ffffff; --text2: #c3cbef; --muted: #8d98c8;
  --primary: #ffc61a; --primary-hi: #ffdb52; --primary-lo: #d69600; --primary-ink: #2b1c00;
  --secondary: #3b4892; --secondary-hi: #4b5ab0; --secondary-lo: #283270;
  --accent: #2fd4ff; --accent-lo: #129bc4;
  --success: #33d36c; --success-lo: #1d9a49;
  --danger: #ff4d5e; --danger-lo: #c22b3d;
  --warn: #ff9f1c;
  --gold: #ffc61a;
  /* shape */
  --r-sm: 10px; --r: 14px; --r-lg: 20px; --r-pill: 999px;
  --bw: 3px;
  --depth: 5px;
  --sh-panel: 0 16px 40px rgba(0, 0, 0, 0.45);
  --hi: inset 0 2px 0 rgba(255, 255, 255, 0.22);
  /* type */
  --f-display: "Arial Rounded MT Bold", "Arial Black", "Segoe UI Black", "Helvetica Neue", system-ui, sans-serif;
  --f-body: system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  /* sizes and spacing */
  --h-xl: 76px; --h-lg: 60px; --h-md: 50px; --h-sm: 40px;
  --s1: 4px; --s2: 8px; --s3: 12px; --s4: 16px; --s5: 24px; --s6: 32px; --s7: 48px;
  /* motion */
  --t-fast: 0.12s; --t: 0.2s; --t-slow: 0.3s;
  --pop: cubic-bezier(0.2, 0.9, 0.3, 1.25);
  --out: cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* ------------------------------------------------------------- base */
#ui { position: fixed; inset: 0; pointer-events: none; font-family: var(--f-body); color: var(--text); z-index: 10; -webkit-font-smoothing: antialiased; }
#ui * { box-sizing: border-box; }
html, body { overscroll-behavior: none; }
#game { touch-action: none; }
#ui { -webkit-tap-highlight-color: transparent; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }
#ui input { -webkit-user-select: text; user-select: text; }
.hidden { display: none !important; }
.ico { display: inline-block; vertical-align: middle; flex: none; }

.screen { position: absolute; inset: 0; pointer-events: auto; display: flex; overflow: auto; touch-action: pan-x pan-y; }
.screen.center { align-items: flex-start; justify-content: flex-start; padding: var(--s4); }
.screen.center > .panel { margin: auto; max-width: 100%; }
/* the game keeps running behind every screen: a coloured veil keeps the UI readable */
.dim { background: radial-gradient(ellipse at 50% 40%, rgba(20, 28, 70, 0.62), rgba(6, 9, 26, 0.86)); }
.screen > * { animation: screenIn var(--t-slow) var(--out) both; }
@keyframes screenIn { from { opacity: 0; transform: translateY(14px) scale(0.98); } }

/* ------------------------------------------------------------- type */
.h-title { font-family: var(--f-display); font-weight: 900; font-size: 32px; letter-spacing: 0.5px; text-transform: uppercase; margin: 0 0 var(--s4); line-height: 1.05; }
.h-sec { font-family: var(--f-display); font-weight: 900; font-size: 14px; letter-spacing: 1.6px; text-transform: uppercase; color: var(--text2); margin: var(--s5) 0 var(--s3); }
.h-sec:first-child { margin-top: 0; }
.lead { font-size: 16px; color: var(--text2); margin: 0 0 var(--s4); line-height: 1.4; }
.muted { color: var(--muted); }
.small { font-size: 13px; }
.center-t { text-align: center; }
.big-num { font-family: var(--f-display); font-weight: 900; font-variant-numeric: tabular-nums; }

/* ------------------------------------------------------------- panels and cards */
.panel { background: linear-gradient(180deg, var(--panel2), var(--panel) 120px); border: var(--bw) solid var(--line); border-radius: var(--r-lg); box-shadow: var(--sh-panel), inset 0 1px 0 var(--edge); padding: var(--s5); }
.panel.narrow { width: min(460px, 94vw); }
.panel.mid { width: min(640px, 94vw); }
.panel.wide { width: min(920px, 96vw); }
.card { background: var(--panel2); border: var(--bw) solid var(--line); border-radius: var(--r); padding: var(--s4); box-shadow: 0 var(--depth) 0 var(--line), var(--hi); transition: transform var(--t) var(--pop), box-shadow var(--t), border-color var(--t), background var(--t); }
.card.pick { cursor: pointer; }
.card.pick:hover { transform: translateY(-3px); background: var(--panel3); }
.card.pick:active { transform: translateY(2px); box-shadow: 0 1px 0 var(--line), var(--hi); }
.card.on, .card.pick.on { border-color: var(--accent); background: var(--panel3); box-shadow: 0 var(--depth) 0 var(--accent-lo), 0 0 0 3px rgba(47, 212, 255, 0.25), var(--hi); transform: translateY(-3px); }
.row { display: flex; gap: var(--s3); align-items: center; }
.row.wrap { flex-wrap: wrap; }
.row.end { justify-content: flex-end; }
.row.mid { justify-content: center; }
.col { display: flex; flex-direction: column; gap: var(--s3); }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s4); }
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s3); }
.spacer { flex: 1; }
.actions { display: flex; gap: var(--s3); align-items: center; margin-top: var(--s5); flex-wrap: wrap; }
.actions.mid { justify-content: center; }

/* ------------------------------------------------------------- buttons */
.btn { --b: var(--secondary); --b-hi: var(--secondary-hi); --b-lo: var(--secondary-lo); --b-ink: #fff;
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--s2);
  min-height: var(--h-md); padding: 0 var(--s5); font: 900 16px/1.1 var(--f-display); letter-spacing: 0.8px; text-transform: uppercase;
  color: var(--b-ink); background: linear-gradient(180deg, var(--b-hi), var(--b)); border: var(--bw) solid var(--line); border-radius: var(--r);
  box-shadow: 0 var(--depth) 0 var(--line), var(--hi); cursor: pointer; text-align: center; white-space: nowrap; overflow: hidden;
  transition: transform var(--t-fast) var(--pop), box-shadow var(--t-fast), filter var(--t-fast), background var(--t); }
.btn:hover { transform: translateY(-2px) scale(1.03); filter: brightness(1.08); box-shadow: 0 calc(var(--depth) + 2px) 0 var(--line), var(--hi); }
.btn:active, .btn.pressed { transform: translateY(var(--depth)) scale(0.99); box-shadow: 0 0 0 var(--line), var(--hi); filter: brightness(0.96); transition-duration: 0.05s; }
.btn:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
.btn:disabled, .btn.disabled { filter: grayscale(0.85) brightness(0.7); cursor: not-allowed; transform: none; box-shadow: 0 var(--depth) 0 var(--line); opacity: 0.6; }
.btn small { display: block; font: 600 12px/1.2 var(--f-body); letter-spacing: 0; text-transform: none; opacity: 0.85; margin-top: 3px; }
.btn .stack { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
.btn.primary { --b: var(--primary); --b-hi: var(--primary-hi); --b-lo: var(--primary-lo); --b-ink: var(--primary-ink); }
.btn.success { --b: var(--success); --b-hi: #52e386; --b-ink: #052812; }
.btn.danger { --b: var(--danger); --b-hi: #ff6b79; --b-ink: #fff; }
.btn.ghost { background: transparent; box-shadow: none; border-color: rgba(255, 255, 255, 0.22); color: var(--text2); }
.btn.ghost:hover { background: rgba(255, 255, 255, 0.07); box-shadow: none; color: #fff; }
.btn.ghost:active { transform: scale(0.97); }
.btn.sm { min-height: var(--h-sm); padding: 0 var(--s4); font-size: 14px; border-radius: var(--r-sm); --depth: 4px; }
.btn.lg { min-height: var(--h-lg); padding: 0 var(--s6); font-size: 20px; }
.btn.xl { min-height: var(--h-xl); padding: 0 var(--s7); font-size: 30px; letter-spacing: 1.5px; border-radius: var(--r-lg); --depth: 7px; }
.btn.icon { min-width: var(--h-md); padding: 0; }
.btn.icon.sm { min-width: var(--h-sm); }
.btn.block { display: flex; width: 100%; }
.btn { max-width: 100%; }
/* the primary action catches the eye with a highlight that sweeps across it */
.btn.primary::after { content: ""; position: absolute; top: -20%; bottom: -20%; width: 40%; left: -60%; background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.55), transparent); transform: skewX(-18deg); animation: shine 3.2s ease-in-out infinite; pointer-events: none; }
@keyframes shine { 0%, 62% { left: -60%; } 85%, 100% { left: 130%; } }
.badge { display: inline-flex; align-items: center; gap: 4px; font: 900 12px/1 var(--f-display); letter-spacing: 0.6px; text-transform: uppercase; padding: 5px 9px; border-radius: var(--r-pill); background: var(--panel3); color: var(--text); border: 2px solid var(--line); }
.badge.gold { background: var(--primary); color: var(--primary-ink); }
.badge.good { background: var(--success); color: #052812; }
.badge.bad { background: var(--danger); color: #fff; }
.badge.cyan { background: var(--accent); color: #032430; }
.badge.pulse { animation: badgePulse 1.2s ease-in-out infinite; }
@keyframes badgePulse { 50% { transform: scale(1.12); } }
.dot-new { position: absolute; top: -6px; right: -6px; min-width: 22px; height: 22px; border-radius: 11px; background: var(--danger); color: #fff; font: 900 12px/18px var(--f-display); text-align: center; border: 2px solid var(--line); padding: 0 5px; animation: badgePulse 1.2s ease-in-out infinite; }

/* ------------------------------------------------------------- controls */
/* segmented choice (also the on / off switches) */
.seg { display: inline-flex; flex-wrap: wrap; gap: 4px; padding: 4px; background: var(--bg); border: var(--bw) solid var(--line); border-radius: var(--r); }
.seg .opt { font: 900 14px/1 var(--f-display); letter-spacing: 0.6px; text-transform: uppercase; color: var(--text2); background: transparent; border: none; border-radius: var(--r-sm); min-height: 38px; padding: 0 var(--s4); cursor: pointer; transition: background var(--t), color var(--t), transform var(--t-fast) var(--pop); }
.seg .opt:hover { color: #fff; background: rgba(255, 255, 255, 0.08); }
.seg .opt:active { transform: scale(0.95); }
.seg .opt.on { background: var(--accent); color: #032430; box-shadow: 0 3px 0 var(--accent-lo); animation: optOn var(--t) var(--pop); }
@keyframes optOn { from { transform: scale(0.88); } }
/* labelled setting row */
.set { display: flex; align-items: center; justify-content: space-between; gap: var(--s4); padding: var(--s3) 0; border-bottom: 2px solid rgba(255, 255, 255, 0.06); }
.set:last-child { border-bottom: none; }
.set > label, .set > .lab { font: 900 15px/1.2 var(--f-display); letter-spacing: 0.4px; text-transform: uppercase; }
.set .val { font: 900 15px var(--f-display); color: var(--primary); min-width: 3.5em; text-align: right; font-variant-numeric: tabular-nums; }
/* slider */
.slider { display: flex; align-items: center; gap: var(--s3); flex: 1; max-width: 340px; }
input.range { -webkit-appearance: none; appearance: none; flex: 1; height: 14px; border-radius: var(--r-pill); border: var(--bw) solid var(--line); outline: none; padding: 0; margin: 0; cursor: pointer;
  background: linear-gradient(90deg, var(--primary) 0 var(--p, 50%), var(--bg) var(--p, 50%) 100%); }
input.range::-webkit-slider-thumb { -webkit-appearance: none; width: 28px; height: 28px; border-radius: 50%; background: #fff; border: var(--bw) solid var(--line); box-shadow: 0 3px 0 var(--line); transition: transform var(--t-fast) var(--pop); }
input.range::-moz-range-thumb { width: 24px; height: 24px; border-radius: 50%; background: #fff; border: var(--bw) solid var(--line); box-shadow: 0 3px 0 var(--line); }
input.range:hover::-webkit-slider-thumb { transform: scale(1.12); }
input.range:active::-webkit-slider-thumb { transform: scale(0.95); }
/* text field */
.field { width: 100%; font: 800 18px var(--f-body); color: #fff; background: var(--bg); border: var(--bw) solid var(--line); border-radius: var(--r); padding: 0 var(--s4); min-height: var(--h-md); outline: none; box-shadow: inset 0 3px 0 rgba(0, 0, 0, 0.35); transition: border-color var(--t), box-shadow var(--t); }
.field:focus { border-color: var(--accent); box-shadow: inset 0 3px 0 rgba(0, 0, 0, 0.35), 0 0 0 4px rgba(47, 212, 255, 0.25); }
/* arrow picker (one value at a time, with arrows) */
.picker { display: flex; align-items: center; gap: var(--s2); }
.picker .pv { flex: 1; min-height: var(--h-md); display: flex; align-items: center; justify-content: center; gap: var(--s2); font: 900 16px var(--f-display); text-transform: uppercase; background: var(--bg); border: var(--bw) solid var(--line); border-radius: var(--r); padding: 0 var(--s3); text-align: center; }
/* stepper */
.stepper { display: flex; align-items: center; gap: var(--s2); }
.stepper .pv { min-width: 64px; text-align: center; font: 900 26px var(--f-display); }
/* colour swatches */
.swatches { display: flex; flex-wrap: wrap; gap: var(--s2); }
.sw { width: 40px; height: 40px; border-radius: 50%; border: var(--bw) solid var(--line); cursor: pointer; box-shadow: 0 3px 0 var(--line); transition: transform var(--t-fast) var(--pop); }
.sw:hover { transform: scale(1.12); }
.sw.on { box-shadow: 0 0 0 3px #fff, 0 0 0 6px var(--accent); transform: scale(1.08); }
/* tabs */
.tabs { display: flex; gap: var(--s2); flex-wrap: wrap; margin-bottom: var(--s4); }
.tab { position: relative; font: 900 14px/1 var(--f-display); letter-spacing: 0.8px; text-transform: uppercase; color: var(--text2); background: var(--bg); border: var(--bw) solid var(--line); border-radius: var(--r-pill); min-height: 42px; padding: 0 var(--s4); cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: background var(--t), color var(--t), transform var(--t-fast) var(--pop); }
.tab:hover { color: #fff; transform: translateY(-1px); }
.tab:active { transform: scale(0.96); }
.tab.on { background: #fff; color: var(--bg); }

/* bars */
.bar { height: 12px; background: var(--bg); border: 2px solid var(--line); border-radius: var(--r-pill); overflow: hidden; position: relative; }
.bar > i { position: absolute; left: 0; top: 0; bottom: 0; background: linear-gradient(180deg, #7fe0ff, var(--accent)); border-radius: var(--r-pill); transition: width 0.6s var(--out); }
.bar.good > i { background: linear-gradient(180deg, #7ff0a6, var(--success)); }
.bar.gold > i { background: linear-gradient(180deg, var(--primary-hi), var(--primary)); }
.crest { vertical-align: middle; flex: none; filter: drop-shadow(0 2px 0 rgba(0, 0, 0, 0.35)); }

/* ------------------------------------------------------------- toast */
.toast { position: absolute; left: 50%; bottom: calc(28px + env(safe-area-inset-bottom, 0px)); transform: translateX(-50%); pointer-events: auto; max-width: min(560px, 92vw); padding: var(--s3) var(--s5); background: var(--panel2); color: #fff; border: var(--bw) solid var(--line); border-left: 8px solid var(--accent); border-radius: var(--r); box-shadow: var(--sh-panel); font: 800 15px/1.35 var(--f-body); z-index: 50; animation: toastIn var(--t-slow) var(--pop); }
.toast.bad { border-left-color: var(--danger); }
.toast.good { border-left-color: var(--success); }
@keyframes toastIn { from { opacity: 0; transform: translate(-50%, 16px) scale(0.92); } }

/* ------------------------------------------------------------- main menu */
.menu { align-items: stretch; background: linear-gradient(90deg, rgba(8, 12, 32, 0.92) 0%, rgba(8, 12, 32, 0.78) 34%, rgba(8, 12, 32, 0.15) 70%, rgba(8, 12, 32, 0) 100%); }
.menu-inner { display: flex; flex-direction: column; justify-content: center; gap: var(--s5); padding: 5vh 6vw; width: min(680px, 100%); }
.logo { display: flex; align-items: center; gap: var(--s4); animation: logoIn 0.5s var(--pop) both; }
.logo-ball { width: 78px; height: 78px; flex: none; animation: ballSpin 6s linear infinite; filter: drop-shadow(0 6px 0 rgba(0, 0, 0, 0.5)); }
.logo-text { font-family: var(--f-display); font-weight: 900; font-size: clamp(46px, 7.5vw, 88px); line-height: 0.88; letter-spacing: -1px; text-transform: uppercase; color: #fff; text-shadow: 0 6px 0 var(--line), 0 0 30px rgba(0, 0, 0, 0.4); -webkit-text-stroke: 2px var(--line); }
.logo-text em { font-style: normal; color: var(--primary); display: block; }
.tagline { font: 800 17px/1.35 var(--f-body); color: var(--text2); margin-top: var(--s3); max-width: 440px; text-shadow: 0 2px 0 var(--line); }
@keyframes logoIn { from { opacity: 0; transform: translateY(-14px) scale(0.94); } }
@keyframes ballSpin { to { transform: rotate(360deg); } }
.menu-play { display: flex; flex-direction: column; gap: var(--s3); }
.menu-play .btn.xl { justify-content: flex-start; padding-left: var(--s5); }
.menu-play .btn.xl .ico { width: 36px; height: 36px; }
.menu-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s3); }
.menu-row .btn { justify-content: flex-start; padding: 0 var(--s4); font-size: 18px; }
.menu-icons { display: flex; gap: var(--s3); }
.menu-icons .btn { flex: 1; font-size: 12px; letter-spacing: 0.3px; padding: 0 var(--s2); gap: 6px; }
.menu-foot { font-size: 12px; color: var(--muted); }

/* ------------------------------------------------------------- choice cards */
.choices { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: var(--s3); }
.choice { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; cursor: pointer; padding: var(--s3) var(--s4); text-align: left; color: #fff; font: inherit; }
.choice b { font: 900 16px/1.1 var(--f-display); text-transform: uppercase; letter-spacing: 0.4px; }
.choice span { font-size: 12px; color: var(--text2); line-height: 1.3; }
.club-chip { display: flex; align-items: center; gap: var(--s2); font: 900 14px/1.1 var(--f-display); text-transform: uppercase; }

/* ------------------------------------------------------------- quick match */
.vs { display: grid; grid-template-columns: 1fr auto 1fr; gap: var(--s4); align-items: stretch; }
.vs-mid { align-self: center; font: 900 30px var(--f-display); color: var(--primary); text-shadow: 0 4px 0 var(--line); }
.team-pick { display: flex; flex-direction: column; align-items: center; gap: var(--s2); text-align: center; padding: var(--s4); }
.team-pick .tp-name { font: 900 18px/1.1 var(--f-display); text-transform: uppercase; min-height: 2.2em; display: flex; align-items: center; }
.team-pick .tp-tier { font-size: 12px; color: var(--text2); font-weight: 700; }
.team-pick .row { width: 100%; justify-content: space-between; }
.team-pick .me { margin-top: var(--s1); }
.club-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: var(--s2); margin-top: var(--s3); }
.club-grid .h-sec { grid-column: 1 / -1; margin: var(--s3) 0 0; }
.club-grid .card { padding: var(--s2) var(--s3); }

/* ------------------------------------------------------------- hub */
.hub { flex-direction: column; gap: var(--s4); padding: var(--s4) var(--s5); background: linear-gradient(180deg, rgba(8, 12, 32, 0.9), rgba(8, 12, 32, 0.8)); }
.topbar { display: flex; align-items: center; gap: var(--s4); flex-wrap: wrap; }
.topbar .who { display: flex; align-items: center; gap: var(--s3); min-width: 0; }
.topbar h1 { margin: 0; font: 900 28px/1 var(--f-display); text-transform: uppercase; }
.topbar .sub { color: var(--text2); font-size: 14px; font-weight: 700; margin-top: 4px; }
.lvl { display: flex; align-items: center; gap: var(--s3); background: var(--panel); border: var(--bw) solid var(--line); border-radius: var(--r-pill); padding: 6px 14px 6px 6px; }
.lvl .ring { width: 40px; height: 40px; border-radius: 50%; background: var(--primary); color: var(--primary-ink); display: grid; place-items: center; font: 900 18px var(--f-display); border: var(--bw) solid var(--line); }
.lvl .bar { width: 110px; }
.hub-main { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: var(--s4); align-items: start; }
.next { text-align: center; }
.next .comp { font: 900 13px var(--f-display); letter-spacing: 1.2px; text-transform: uppercase; color: var(--text2); }
.fixture { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: var(--s3); margin: var(--s4) 0; }
.fixture .side { display: flex; flex-direction: column; align-items: center; gap: var(--s2); font: 900 18px/1.1 var(--f-display); text-transform: uppercase; }
.fixture .v { font: 900 26px var(--f-display); color: var(--primary); }
.next .venue { font-size: 13px; color: var(--muted); font-weight: 700; margin-bottom: var(--s4); }
.attr { display: grid; grid-template-columns: 110px 1fr 36px 40px; align-items: center; gap: var(--s3); margin: 8px 0; font-weight: 800; font-size: 14px; }
.attr b { font: 900 16px var(--f-display); text-align: right; }
.attr .btn { min-height: 34px; min-width: 40px; padding: 0; font-size: 18px; --depth: 3px; }
.mini-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--s2); margin-top: var(--s3); }
.mini { background: var(--bg); border: 2px solid var(--line); border-radius: var(--r-sm); padding: var(--s2); text-align: center; }
.mini b { display: block; font: 900 22px var(--f-display); }
.mini span { font-size: 11px; color: var(--text2); font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
.form-dots { display: flex; gap: 6px; }
.form-dots span { min-width: 42px; text-align: center; font: 900 13px var(--f-display); border-radius: var(--r-sm); padding: 6px 0; background: var(--panel3); border: 2px solid var(--line); }
.form-dots span.hi { background: var(--success); color: #052812; }
.form-dots span.lo { background: var(--danger); }
table.t { border-collapse: separate; border-spacing: 0 4px; width: 100%; font-size: 14px; font-weight: 700; }
table.t th { font: 900 11px var(--f-display); text-transform: uppercase; letter-spacing: 0.8px; color: var(--muted); padding: 2px 8px; text-align: left; }
table.t td { padding: 7px 8px; background: rgba(255, 255, 255, 0.04); }
table.t td:first-child { border-radius: var(--r-sm) 0 0 var(--r-sm); }
table.t td:last-child { border-radius: 0 var(--r-sm) var(--r-sm) 0; }
table.t tr.me td { background: rgba(255, 198, 26, 0.2); color: #fff; }
table.t td.n, table.t th.n { text-align: right; font-variant-numeric: tabular-nums; }
.offer { margin: var(--s3) 0; }
.offer .row { align-items: flex-start; }
.timeline { max-height: 240px; overflow: auto; font-size: 13px; font-weight: 600; color: var(--text2); }
.timeline div { padding: 6px 0; border-bottom: 2px solid rgba(255, 255, 255, 0.05); }
.trophies { display: flex; gap: var(--s2); flex-wrap: wrap; }

/* ------------------------------------------------------------- result screen */
.result { width: min(620px, 96vw); text-align: center; }
.result-word { margin-top: var(--s2); font: 900 clamp(48px, 10vw, 84px)/0.95 var(--f-display); text-transform: uppercase; letter-spacing: 1px; color: var(--primary); text-shadow: 0 7px 0 var(--line); -webkit-text-stroke: 2px var(--line); animation: punch 0.55s var(--pop) both; }
.result-word.win { color: var(--success); }
.result-word.loss { color: var(--danger); }
@keyframes punch { 0% { transform: scale(0.4); opacity: 0; } 60% { transform: scale(1.12); opacity: 1; } 100% { transform: scale(1); } }
.scoreline { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: var(--s3); margin: var(--s4) 0 var(--s2); }
.scoreline .side { display: flex; flex-direction: column; align-items: center; gap: 6px; font: 900 15px/1.1 var(--f-display); text-transform: uppercase; }
.scoreline .sc { font: 900 46px var(--f-display); font-variant-numeric: tabular-nums; background: var(--bg); border: var(--bw) solid var(--line); border-radius: var(--r); padding: 2px var(--s4); }
.scorers { font-size: 13px; color: var(--text2); font-weight: 700; min-height: 1em; }
.rating-hero { display: inline-flex; flex-direction: column; align-items: center; margin: var(--s4) 0 var(--s2); }
.rating-hero .lab { font: 900 12px var(--f-display); letter-spacing: 1.5px; color: var(--text2); text-transform: uppercase; }
.rating-hero .num { font: 900 64px/1 var(--f-display); color: #fff; text-shadow: 0 5px 0 var(--line); }
.rating-hero .num.hi { color: var(--success); } .rating-hero .num.lo { color: var(--danger); }
.key-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s2); margin: var(--s3) 0; }
.reward { display: inline-flex; align-items: center; gap: var(--s2); font: 900 17px var(--f-display); text-transform: uppercase; background: var(--primary); color: var(--primary-ink); border: var(--bw) solid var(--line); border-radius: var(--r-pill); padding: 8px 18px; box-shadow: 0 4px 0 var(--line); animation: rewardIn 0.5s 0.5s var(--pop) both; }
.reward.plain { background: var(--panel3); color: var(--text2); }
@keyframes rewardIn { from { opacity: 0; transform: scale(0.5) rotate(-6deg); } }
details.more { margin-top: var(--s3); text-align: left; }
details.more summary { cursor: pointer; font: 900 13px var(--f-display); letter-spacing: 1px; text-transform: uppercase; color: var(--text2); list-style: none; text-align: center; padding: var(--s2); border-radius: var(--r-sm); }
details.more summary::-webkit-details-marker { display: none; }
details.more summary:hover { color: #fff; background: rgba(255, 255, 255, 0.06); }
.why .plus { color: var(--success); } .why .minus { color: var(--danger); }
.stars { font-size: 40px; letter-spacing: 4px; color: var(--primary); text-shadow: 0 4px 0 var(--line); line-height: 1.1; }
.stars i { font-style: normal; display: inline-block; animation: punch 0.45s var(--pop) both; }
.stars i.off { color: var(--panel3); }

/* ------------------------------------------------------------- style previews */
.previews { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s4); }
.preview { cursor: pointer; padding: var(--s3); }
.preview img { width: 100%; display: block; border-radius: var(--r-sm); border: 2px solid var(--line); }
.preview h3 { margin: var(--s3) 0 4px; font: 900 18px var(--f-display); text-transform: uppercase; }

/* ------------------------------------------------------------- how to play */
.keys { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--s2); }
.key { display: flex; align-items: center; gap: var(--s3); background: var(--bg); border: 2px solid var(--line); border-radius: var(--r); padding: var(--s2) var(--s3); font-weight: 700; font-size: 14px; }
.kc { display: inline-flex; align-items: center; justify-content: center; min-width: 40px; height: 36px; padding: 0 8px; border-radius: 8px; background: #fff; color: var(--bg); font: 900 13px var(--f-display); text-transform: uppercase; border: 2px solid var(--line); box-shadow: 0 3px 0 var(--line); white-space: nowrap; }
.tips { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--s2); }
.tip { background: var(--bg); border: 2px solid var(--line); border-radius: var(--r); padding: var(--s3); font-size: 14px; font-weight: 700; color: var(--text2); }
.tip b { display: block; color: #fff; font: 900 14px var(--f-display); text-transform: uppercase; margin-bottom: 4px; }

/* ------------------------------------------------------------- click / tap to play */
.go-card { text-align: center; }
.go-big { font: 900 clamp(34px, 6vw, 56px)/1 var(--f-display); text-transform: uppercase; color: var(--primary); text-shadow: 0 5px 0 var(--line); animation: goPulse 1.1s ease-in-out infinite; margin: var(--s2) 0 var(--s4); }
@keyframes goPulse { 50% { transform: scale(1.06); } }
.go-sub { color: var(--text2); font-weight: 700; font-size: 14px; }

/* ------------------------------------------------------------- HUD */
.hud { position: absolute; inset: 0; pointer-events: none; font-family: var(--f-body); }
.hud-top { position: absolute; top: calc(12px + env(safe-area-inset-top, 0px)); left: 50%; transform: translateX(-50%); display: flex; align-items: stretch; border: var(--bw) solid var(--line); border-radius: var(--r); overflow: hidden; box-shadow: 0 4px 0 var(--line); font: 900 16px/1 var(--f-display); text-transform: uppercase; }
.hud-team { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: rgba(14, 20, 48, 0.88); color: #fff; letter-spacing: 0.8px; }
.hud-team::before { content: ""; width: 12px; height: 12px; border-radius: 3px; background: var(--kit, #888); border: 2px solid #fff; }
.hud-team:last-child { flex-direction: row-reverse; }
.hud-score { padding: 8px 14px; background: var(--primary); color: var(--primary-ink); font-size: 21px; font-variant-numeric: tabular-nums; border-left: var(--bw) solid var(--line); border-right: var(--bw) solid var(--line); display: flex; align-items: center; }
.hud-score.bump { animation: punch 0.45s var(--pop); }
.hud-clock { position: absolute; top: calc(58px + env(safe-area-inset-top, 0px)); left: 50%; transform: translateX(-50%); font: 900 13px var(--f-display); font-variant-numeric: tabular-nums; color: #fff; background: rgba(14, 20, 48, 0.88); border: 2px solid var(--line); border-radius: var(--r-pill); padding: 3px 10px; }
.hud-phase { position: absolute; top: calc(84px + env(safe-area-inset-top, 0px)); left: 50%; transform: translateX(-50%); font: 900 10px var(--f-display); letter-spacing: 1.4px; color: #fff; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8); opacity: 0.8; }
.hud-player { position: absolute; top: calc(12px + env(safe-area-inset-top, 0px)); left: calc(12px + env(safe-area-inset-left, 0px)); background: rgba(14, 20, 48, 0.88); color: #fff; border: var(--bw) solid var(--line); border-radius: var(--r); box-shadow: 0 4px 0 var(--line); padding: 8px 12px; min-width: 140px; }
.hud-rating { font: 900 28px/1 var(--f-display); color: var(--primary); font-variant-numeric: tabular-nums; }
.hud-rating-label { font: 900 9px var(--f-display); letter-spacing: 1.4px; color: var(--text2); }
.hud-stamina { height: 8px; background: rgba(0, 0, 0, 0.45); border-radius: var(--r-pill); margin-top: 6px; overflow: hidden; }
.hud-stamina-fill { height: 100%; background: var(--success); border-radius: var(--r-pill); transition: width 0.3s; }
.hud-stamina-fill.low { background: var(--danger); animation: lowPulse 0.8s ease-in-out infinite; }
@keyframes lowPulse { 50% { opacity: 0.5; } }
.hud-name { font: 800 11px var(--f-body); margin-top: 5px; color: var(--text2); }
.hud-cross { position: absolute; left: 50%; top: 50%; width: 16px; height: 16px; transform: translate(-50%, -50%); }
.hud-cross::before, .hud-cross::after { content: ""; position: absolute; background: #fff; box-shadow: 0 0 0 1.5px rgba(7, 11, 29, 0.85); border-radius: 1px; }
.hud-cross::before { left: 7px; top: 0; width: 2px; height: 16px; }
.hud-cross::after { top: 7px; left: 0; height: 2px; width: 16px; }
.hud-power { position: absolute; left: 50%; top: calc(50% + 24px); transform: translateX(-50%); width: 130px; height: 12px; border: 2px solid var(--line); border-radius: var(--r-pill); background: rgba(14, 20, 48, 0.7); overflow: hidden; }
.hud-power-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--warn), var(--danger)); }
.hud-hint { position: absolute; left: 50%; bottom: calc(18px + env(safe-area-inset-bottom, 0px)); transform: translateX(-50%); font: 800 13px var(--f-body); color: #fff; background: rgba(14, 20, 48, 0.85); border: 2px solid var(--line); border-radius: var(--r-pill); padding: 6px 14px; white-space: nowrap; }
.hud-hint:empty { display: none; }
.hud-notes { position: absolute; top: calc(106px + env(safe-area-inset-top, 0px)); left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 6px; }
.hud-note { font: 900 15px var(--f-display); letter-spacing: 1px; text-transform: uppercase; padding: 6px 14px; color: #fff; background: rgba(14, 20, 48, 0.92); border: var(--bw) solid var(--line); border-radius: var(--r-pill); box-shadow: 0 4px 0 var(--line); animation: punch 0.35s var(--pop); transition: opacity 0.35s, transform 0.35s; }
.hud-note.good { background: var(--success); color: #052812; }
.hud-note.bad { background: var(--danger); }
.hud-note.out { opacity: 0; transform: translateY(-10px) scale(0.9); }
.hud-arrow { position: absolute; width: 0; height: 0; border-top: 12px solid transparent; border-bottom: 12px solid transparent; border-left: 22px solid var(--primary); filter: drop-shadow(0 0 1px var(--line)) drop-shadow(0 2px 0 var(--line)); }
.hud-radar { position: absolute; right: calc(12px + env(safe-area-inset-right, 0px)); bottom: calc(12px + env(safe-area-inset-bottom, 0px)); width: 124px; height: 172px; border: var(--bw) solid var(--line); border-radius: var(--r); box-shadow: 0 4px 0 var(--line); }
.hud-banner { position: absolute; top: 32%; left: 50%; transform: translate(-50%, -50%); text-align: center; animation: bannerIn 0.5s var(--pop); }
.hud-banner .b-main { font: 900 clamp(48px, 9vw, 96px)/0.95 var(--f-display); letter-spacing: 2px; text-transform: uppercase; color: #fff; text-shadow: 0 7px 0 var(--line); -webkit-text-stroke: 3px var(--line); }
.hud-banner.mine .b-main { color: var(--primary); }
.hud-banner .b-sub { display: inline-block; font: 800 15px var(--f-body); margin-top: 10px; color: #fff; background: rgba(14, 20, 48, 0.88); border: 2px solid var(--line); border-radius: var(--r-pill); padding: 6px 16px; }
@keyframes bannerIn { 0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; } 60% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(1); } }
/* possession: the screen edge pulses green while the player has the ball */
.hud-poss { position: absolute; inset: 0; opacity: 0; transition: opacity 0.18s ease-out; box-shadow: inset 0 0 0 5px rgba(51, 211, 108, 0.95); }
.hud-poss::before { content: ""; position: absolute; inset: 0; box-shadow: inset 0 0 60px 24px rgba(51, 211, 108, 0.6); animation: possPulse 1s ease-in-out infinite alternate; }
.hud-poss.on { opacity: 1; }
.hud-poss-label { position: absolute; left: 50%; bottom: calc(58px + env(safe-area-inset-bottom, 0px)); transform: translateX(-50%); font: 900 15px var(--f-display); letter-spacing: 1.5px; color: #052812; background: var(--success); border: var(--bw) solid var(--line); border-radius: var(--r-pill); box-shadow: 0 4px 0 var(--line); padding: 6px 16px; white-space: nowrap; animation: possLabel 1s ease-in-out infinite alternate; }
.hud-poss.on .hud-poss-label { animation: possIn 0.25s var(--pop), possLabel 1s ease-in-out 0.25s infinite alternate; }
@keyframes possPulse { from { opacity: 0.3; } to { opacity: 1; } }
@keyframes possLabel { from { transform: translateX(-50%) scale(1); } to { transform: translateX(-50%) scale(1.06); } }
@keyframes possIn { from { transform: translateX(-50%) scale(0.5); opacity: 0; } to { transform: translateX(-50%) scale(1); opacity: 1; } }
.hud-fade { position: absolute; inset: 0; background: #fff; opacity: 0; }
.hud-fade.on { animation: fadeFlash 0.4s ease-out; }
@keyframes fadeFlash { 0% { opacity: 0.9; } 100% { opacity: 0; } }

/* goal replay: everything else in the HUD steps aside for cinema bars */
.hud-replay { display: none; position: absolute; inset: 0; pointer-events: none; color: #fff; }
.hud.replaying .hud-replay { display: block; }
.hud.replaying > :not(.hud-replay):not(.hud-fade) { display: none !important; }
.rp-bar { position: absolute; left: 0; right: 0; height: 8.5vh; background: #050816; }
.rp-top { top: 0; } .rp-bot { bottom: 0; }
.rp-tag { position: absolute; top: calc(8.5vh + 12px); left: calc(16px + env(safe-area-inset-left, 0px)); font: 900 15px var(--f-display); letter-spacing: 4px; background: var(--danger); border: var(--bw) solid var(--line); border-radius: var(--r-pill); box-shadow: 0 4px 0 var(--line); padding: 6px 14px 6px 12px; display: flex; align-items: center; gap: 8px; }
.rp-tag i { width: 10px; height: 10px; border-radius: 50%; background: #fff; animation: rpDot 1s steps(2) infinite; }
@keyframes rpDot { 50% { opacity: 0.2; } }
.rp-info { position: absolute; bottom: calc(8.5vh + 16px); left: calc(16px + env(safe-area-inset-left, 0px)); font: 900 16px var(--f-display); text-transform: uppercase; text-shadow: 0 2px 0 var(--line); max-width: 58vw; }
.rp-prog { position: absolute; left: 0; right: 0; bottom: 8.5vh; height: 4px; background: rgba(255, 255, 255, 0.15); }
.rp-prog i { display: block; height: 100%; width: 0; background: var(--primary); }
.rp-skip { --b: var(--primary); --b-hi: var(--primary-hi); position: absolute; bottom: calc(8.5vh + 12px); right: calc(16px + env(safe-area-inset-right, 0px)); pointer-events: auto; min-height: 48px; padding: 0 var(--s5); font: 900 15px var(--f-display); letter-spacing: 0.8px; text-transform: uppercase; color: var(--primary-ink); background: linear-gradient(180deg, var(--b-hi), var(--b)); border: var(--bw) solid var(--line); border-radius: var(--r); box-shadow: 0 5px 0 var(--line), var(--hi); cursor: pointer; touch-action: manipulation; transition: transform var(--t-fast) var(--pop), box-shadow var(--t-fast); }
.rp-skip:hover { transform: translateY(-2px) scale(1.04); }
.rp-skip:active { transform: translateY(5px); box-shadow: 0 0 0 var(--line), var(--hi); }
.rp-skip b { font: 800 11px var(--f-body); opacity: 0.65; margin-left: 6px; text-transform: none; letter-spacing: 0; }
@media (max-height: 520px) { .rp-bar { height: 6vh; } .rp-tag { top: calc(6vh + 8px); font-size: 13px; } .rp-info { bottom: calc(6vh + 12px); font-size: 13px; } .rp-prog { bottom: 6vh; } .rp-skip { bottom: calc(6vh + 8px); } }
@media (max-width: 600px) { .rp-info { font-size: 12px; max-width: 45vw; } .rp-skip { font-size: 13px; padding: 0 var(--s3); } .rp-skip b { display: none; } }

/* ------------------------------------------------------------- touch controls */
.touch { position: absolute; inset: 0; pointer-events: auto; touch-action: none; }
.tc-zone { position: absolute; inset: 0; }
.tc-stick { position: absolute; width: 0; height: 0; pointer-events: none; }
.tc-stick::before { content: ""; position: absolute; width: var(--stick, 124px); height: var(--stick, 124px); left: calc(var(--stick, 124px) / -2); top: calc(var(--stick, 124px) / -2); border-radius: 50%; border: var(--bw) solid rgba(255, 255, 255, 0.55); background: rgba(14, 20, 48, 0.3); }
.tc-knob { position: absolute; width: 58px; height: 58px; left: -29px; top: -29px; border-radius: 50%; background: #fff; border: var(--bw) solid var(--line); box-shadow: 0 4px 0 var(--line); }
.tc-stick.idle { left: calc(96px + env(safe-area-inset-left, 0px)); top: calc(100% - 104px - env(safe-area-inset-bottom, 0px)); opacity: 0.5; }
.tc-stick.sprint .tc-knob { background: var(--success); }
.tc-btn { --b: var(--secondary); --b-hi: var(--secondary-hi); position: absolute; border-radius: 50%; border: var(--bw) solid var(--line); background: radial-gradient(circle at 50% 30%, var(--b-hi), var(--b)); color: #fff; font: 900 13px/1 var(--f-display); letter-spacing: 0.6px; display: flex; align-items: center; justify-content: center; padding: 0; touch-action: none; box-shadow: 0 5px 0 var(--line), var(--hi); transition: transform 0.06s, box-shadow 0.06s, opacity 0.15s; }
.tc-btn.down { transform: translateY(5px) scale(0.95); box-shadow: 0 0 0 var(--line), var(--hi); filter: brightness(1.15); }
.tc-btn.off { opacity: 0; pointer-events: none; }
.tc-btn.cool { opacity: 0.45; }
.tc-a { --b: var(--primary); --b-hi: var(--primary-hi); color: var(--primary-ink); --s: clamp(70px, 22vh, 96px); width: var(--s); height: var(--s); right: calc(22px + env(safe-area-inset-right, 0px)); bottom: calc(26px + env(safe-area-inset-bottom, 0px)); font-size: 16px; }
.tc-b { --b: var(--accent-lo); --b-hi: var(--accent); color: #032430; --s: clamp(56px, 16vh, 74px); width: var(--s); height: var(--s); right: calc(22px + clamp(70px, 22vh, 96px) + 14px + env(safe-area-inset-right, 0px)); bottom: calc(20px + env(safe-area-inset-bottom, 0px)); }
.tc-c { --b: var(--success-lo); --b-hi: var(--success); color: #052812; --s: clamp(52px, 15vh, 66px); width: var(--s); height: var(--s); right: calc(22px + env(safe-area-inset-right, 0px) + clamp(8px, 2vh, 14px)); bottom: calc(26px + clamp(70px, 22vh, 96px) + 14px + env(safe-area-inset-bottom, 0px)); font-size: 12px; }
.tc-btn[data-type="tackle"], .tc-btn[data-type="slide"] { --b: var(--danger-lo); --b-hi: var(--danger); color: #fff; }
.tc-pause { position: absolute; left: calc(10px + env(safe-area-inset-left, 0px)); top: calc(10px + env(safe-area-inset-top, 0px)); width: 46px; height: 46px; border-radius: var(--r); border: var(--bw) solid var(--line); background: rgba(14, 20, 48, 0.88); box-shadow: 0 4px 0 var(--line); display: flex; gap: 6px; align-items: center; justify-content: center; padding: 0; }
.tc-pause i { display: block; width: 5px; height: 17px; border-radius: 2px; background: #fff; }
.tc-pause:active { transform: translateY(4px); box-shadow: none; }
.tc-rotate { display: none; position: absolute; left: 50%; top: calc(100px + env(safe-area-inset-top, 0px)); transform: translateX(-50%); font: 800 12px var(--f-body); color: #fff; padding: 5px 12px; background: rgba(14, 20, 48, 0.88); border: 2px solid var(--line); border-radius: var(--r-pill); white-space: nowrap; pointer-events: none; }
@media (orientation: portrait) { .tc-rotate { display: block; } }

/* HUD with touch controls: pause top-left, compact player card, radar top-right,
   the bottom corners belong to the thumbs */
html[data-touch="1"] .hud-player { left: calc(66px + env(safe-area-inset-left, 0px)); top: calc(10px + env(safe-area-inset-top, 0px)); min-width: 0; padding: 5px 9px; }
html[data-touch="1"] .hud-rating { font-size: 20px; }
html[data-touch="1"] .hud-name { display: none; }
html[data-touch="1"] .hud-radar { top: calc(10px + env(safe-area-inset-top, 0px)); right: calc(10px + env(safe-area-inset-right, 0px)); bottom: auto; width: 74px; height: 102px; }
html[data-touch="1"] .hud-hint { bottom: calc(10px + env(safe-area-inset-bottom, 0px)); font-size: 12px; max-width: 42vw; white-space: normal; text-align: center; }
html[data-touch="1"] .hud-poss-label { bottom: calc(46px + env(safe-area-inset-bottom, 0px)); font-size: 12px; letter-spacing: 1px; }
html[data-touch="1"] .hud-power { width: 96px; }

/* ------------------------------------------------------------- tutorial */
.coach { position: absolute; top: calc(12px + env(safe-area-inset-top, 0px)); left: 50%; transform: translateX(-50%); width: min(420px, 92vw); background: rgba(14, 20, 48, 0.94); color: #fff; border: var(--bw) solid var(--line); border-radius: var(--r); box-shadow: 0 5px 0 var(--line); padding: 8px 12px 12px; pointer-events: none; z-index: 5; overflow: hidden; }
.coach-main { display: flex; align-items: flex-start; gap: 8px; }
.coach-txt { flex: 1; min-width: 0; }
.coach-say { font: 900 19px/1.15 var(--f-display); text-transform: uppercase; color: var(--primary); }
.coach-say.pop { animation: punch 0.35s var(--pop); }
.coach-hint { font: 700 13px/1.2 var(--f-body); margin-top: 2px; color: var(--text2); }
.coach-hint.empty { display: none; }
.coach-skip { pointer-events: auto; font: 900 11px var(--f-display); letter-spacing: 0.6px; text-transform: uppercase; padding: 6px 10px; border: 2px solid rgba(255, 255, 255, 0.3); background: transparent; color: var(--text2); cursor: pointer; border-radius: var(--r-sm); touch-action: manipulation; white-space: nowrap; transition: background var(--t), color var(--t); }
.coach-skip:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
.coach-skip:active { transform: scale(0.95); }
.coach-foot { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
.coach-dots { display: flex; gap: 4px; flex: 1; }
.coach-dots i { width: 9px; height: 9px; border-radius: 50%; background: rgba(255, 255, 255, 0.18); transition: background var(--t), transform var(--t) var(--pop); }
.coach-dots i.done { background: var(--success); }
.coach-dots i.now { background: var(--primary); animation: dotPulse 0.8s ease-in-out infinite alternate; }
.coach-stars { color: var(--primary); font: 900 13px var(--f-display); white-space: nowrap; }
.coach-bar { position: absolute; left: 0; right: 0; bottom: 0; height: 5px; background: rgba(255, 255, 255, 0.08); }
.coach-bar i { display: block; height: 100%; background: var(--primary); }
@keyframes dotPulse { from { transform: scale(0.85); } to { transform: scale(1.25); } }
/* the warm-up hides the match furniture; notes drop below the card */
.hud.tut .hud-top, .hud.tut .hud-clock, .hud.tut .hud-phase, .hud.tut .hud-player, .hud.tut .hud-hint, .hud.tut .hud-arrow { display: none; }
.tut-arrow { position: absolute; width: 0; height: 0; border-top: 16px solid transparent; border-bottom: 16px solid transparent; border-left: 30px solid var(--primary); filter: drop-shadow(0 0 1px var(--line)) drop-shadow(0 3px 0 var(--line)); transform: translate(-50%, -50%) rotate(var(--rot, 0rad)); animation: tutArrow 0.6s ease-in-out infinite alternate; pointer-events: none; z-index: 4; }
@keyframes tutArrow { from { opacity: 0.55; } to { opacity: 1; } }
.hud.tut .hud-notes { top: 104px; }
html[data-touch="1"] .coach { top: calc(6px + env(safe-area-inset-top, 0px)); width: min(340px, calc(100vw - 250px)); }

/* ------------------------------------------------------------- responsive */
@media (hover: none) {
  .btn:hover { transform: none; filter: none; box-shadow: 0 var(--depth) 0 var(--line), var(--hi); }
  .btn.ghost:hover { box-shadow: none; background: transparent; }
  .card.pick:hover { transform: none; background: var(--panel2); }
  .card.on:hover { background: var(--panel3); transform: translateY(-3px); }
}
@media (pointer: coarse) { #ui input.field { font-size: 16px; } }
@media (max-width: 900px) {
  .hub-main { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 700px) {
  .panel { padding: var(--s4); border-radius: var(--r); }
  .h-title { font-size: 26px; }
  .grid2, .grid3, .previews { grid-template-columns: 1fr; }
  .hub { padding: var(--s3); }
  .topbar h1 { font-size: 21px; }
  .mini-stats { grid-template-columns: repeat(2, 1fr); }
  .attr { grid-template-columns: 92px 1fr 30px 38px; }
  .menu { background: linear-gradient(180deg, rgba(8, 12, 32, 0.6), rgba(8, 12, 32, 0.92)); }
  .menu-inner { padding: 5vh 6vw; width: 100%; }
  .vs { grid-template-columns: minmax(0, 1fr); }
  .btn.xl { padding: 0 var(--s4); font-size: 24px; }
  .btn.lg { padding: 0 var(--s4); }
  .fixture .side { font-size: 15px; }
  .vs-mid { text-align: center; }
  .scoreline .sc { font-size: 36px; }
}
/* short windows: the result screen tightens up so its buttons stay in view */
@media (max-height: 680px) {
  .result-word { font-size: 50px; }
  .scoreline { margin: var(--s2) 0 var(--s1); }
  .scoreline .sc { font-size: 34px; }
  .scoreline .crest { width: 44px; height: 44px; }
  .rating-hero { margin: var(--s2) 0 0; }
  .rating-hero .num { font-size: 44px; }
  .key-stats { margin: var(--s2) 0; }
  .mini b { font-size: 18px; }
  .result .actions { margin-top: var(--s3); }
}
/* short landscape phones: the main menu becomes two columns */
@media (max-height: 560px) and (orientation: landscape) {
  .menu-inner { flex-direction: row; flex-wrap: wrap; align-items: center; gap: var(--s3) var(--s5); padding: 3vh 4vw; width: 100%; }
  .menu-head { flex: 1 1 260px; }
  .menu-actions { flex: 1 1 320px; display: flex; flex-direction: column; gap: var(--s2); }
  .logo-ball { width: 52px; height: 52px; }
  .logo-text { font-size: clamp(32px, 11vh, 56px); }
  .tagline { font-size: 13px; margin-top: 0; }
  .btn.xl { min-height: 60px; font-size: 24px; }
  .menu-row .btn { font-size: 15px; }
  .menu-icons .btn { font-size: 11px; }
  .btn { min-height: 44px; }
  .menu { background: linear-gradient(90deg, rgba(8, 12, 32, 0.9), rgba(8, 12, 32, 0.6)); }
  .panel { padding: var(--s3) var(--s4); }
  .h-title { font-size: 22px; margin-bottom: var(--s3); }
  .result-word { font-size: 46px; }
  .rating-hero .num { font-size: 46px; }
  .hud-top { top: 6px; }
  .hud-team { padding: 5px 9px; font-size: 13px; }
  .hud-score { padding: 5px 10px; font-size: 17px; }
  .hud-clock { top: 46px; font-size: 11px; }
  .hud-phase { top: 68px; }
  .hud-notes { top: 82px; }
  .hud-note { font-size: 13px; }
  .coach { padding: 5px 9px 9px; }
  .coach-say { font-size: 15px; }
  .coach-hint { font-size: 11px; margin-top: 0; }
  .coach-foot { margin-top: 3px; }
  .coach-skip { font-size: 10px; padding: 4px 7px; }
  .hud.tut .hud-notes { top: 78px; }
}
/* narrow (portrait) touch screens: score and clock drop below the pause button,
   rating card and radar */
@media (max-width: 600px) {
  html[data-touch="1"] .hud-top { top: calc(62px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .hud-clock { top: calc(108px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .hud-phase { top: calc(134px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .tc-rotate { top: calc(152px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .hud-notes { top: calc(184px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .coach { top: calc(8px + env(safe-area-inset-top, 0px)); width: calc(100vw - 120px); }
  html[data-touch="1"] .hud.tut .hud-notes { top: calc(96px + env(safe-area-inset-top, 0px)); }
}
@media (prefers-reduced-motion: reduce) {
  .screen > *, .btn.primary::after, .logo-ball, .go-big, .badge.pulse, .dot-new, .hud-poss::before, .hud-poss-label, .hud-poss.on .hud-poss-label, .coach-say.pop, .coach-dots i.now, .rp-tag i { animation: none !important; }
  .hud-poss::before { opacity: 0.8; }
}
`;var tf=0,Sh=1,ef=2;var wh=0,da=1,nf=2,mr=3,pn=0,ii=1,Bi=2,mn=0,gr=1,Th=2,Eh=3,Ah=4,sf=5;var Rs=100,rf=101,af=102,of=103,lf=104,cf=200,hf=201,uf=202,df=203,Rh=204,Ch=205,ff=206,pf=207,mf=208,gf=209,xf=210,vf=211,yf=212,bf=213,_f=214,po=0,mo=1,go=2,sr=3,xo=4,vo=5,yo=6,bo=7,Ih=0,Mf=1,Sf=2,ji=0,Ph=1,Lh=2,kh=3,Nh=4,Dh=5,Oh=6,Uh=7;var zh=300,is=301,Cs=302,Xo=303,qo=304,fa=306,_o=1e3,cn=1001,Mo=1002,Ve=1003,wf=1004;var pa=1005;var Ye=1006,Yo=1007;var ns=1008;var Si=1009,Fh=1010,Bh=1011,xr=1012,Ko=1013,Qi=1014,wi=1015,tn=1016,Zo=1017,Jo=1018,vr=1020,Hh=35902,Gh=35899,Vh=1021,Wh=1022,Ti=1023,hn=1026,ss=1027,jo=1028,Qo=1029,rs=1030,tl=1031;var el=1033,ma=33776,ga=33777,xa=33778,va=33779,il=35840,nl=35841,sl=35842,rl=35843,al=36196,ol=37492,ll=37496,cl=37488,hl=37489,ya=37490,ul=37491,dl=37808,fl=37809,pl=37810,ml=37811,gl=37812,xl=37813,vl=37814,yl=37815,bl=37816,_l=37817,Ml=37818,Sl=37819,wl=37820,Tl=37821,El=36492,Al=36494,Rl=36495,Cl=36283,Il=36284,ba=36285,Pl=36286;var Zr=2300,So=2301,uo=2302,gh=2303,xh=2400,vh=2401,yh=2402;var Tf=3200;var $h=0,Ef=1,Ln="",Li="srgb",Ss="srgb-linear",Jr="linear",_e="srgb";var fo=7680;var Af=519,Rf=512,Cf=513,If=514,Ll=515,Pf=516,Lf=517,kl=518,kf=519,Nf=35044,Xh=35048;var qh="300 es",Ji=2e3,rr=2001;function _0(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function M0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function jr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Df(){let s=jr("canvas");return s.style.display="block",s}var Id={},ar=null;function Yh(...s){let t="THREE."+s.shift();ar?ar("log",t,...s):console.log(t,...s)}function Of(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Vt(...s){s=Of(s);let t="THREE."+s.shift();if(ar)ar("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Xt(...s){s=Of(s);let t="THREE."+s.shift();if(ar)ar("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function Ms(...s){let t=s.join(" ");t in Id||(Id[t]=!0,Vt(...s))}function Uf(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var zf={[po]:mo,[go]:yo,[xo]:bo,[sr]:vo,[mo]:po,[yo]:go,[bo]:xo,[vo]:sr},un=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let n=i[t];if(n!==void 0){let r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,t);t.target=null}}},ai=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pd=1234567,Yr=Math.PI/180,or=180/Math.PI;function yr(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ai[s&255]+ai[s>>8&255]+ai[s>>16&255]+ai[s>>24&255]+"-"+ai[t&255]+ai[t>>8&255]+"-"+ai[t>>16&15|64]+ai[t>>24&255]+"-"+ai[e&63|128]+ai[e>>8&255]+"-"+ai[e>>16&255]+ai[e>>24&255]+ai[i&255]+ai[i>>8&255]+ai[i>>16&255]+ai[i>>24&255]).toLowerCase()}function de(s,t,e){return Math.max(t,Math.min(e,s))}function Kh(s,t){return(s%t+t)%t}function S0(s,t,e,i,n){return i+(s-t)*(n-i)/(e-t)}function w0(s,t,e){return s!==t?(e-s)/(t-s):0}function Kr(s,t,e){return(1-e)*s+e*t}function T0(s,t,e,i){return Kr(s,t,1-Math.exp(-e*i))}function E0(s,t=1){return t-Math.abs(Kh(s,t*2)-t)}function A0(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function R0(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function C0(s,t){return s+Math.floor(Math.random()*(t-s+1))}function I0(s,t){return s+Math.random()*(t-s)}function P0(s){return s*(.5-Math.random())}function L0(s){s!==void 0&&(Pd=s);let t=Pd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function k0(s){return s*Yr}function N0(s){return s*or}function D0(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function O0(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function U0(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function z0(s,t,e,i,n){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),u=r((t-i)/2),d=a((t-i)/2),p=r((i-t)/2),g=a((i-t)/2);switch(n){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*p,o*c);break;case"YXY":s.set(l*p,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*p,o*h,o*c);break;default:Vt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function ir(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function pi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Hi={DEG2RAD:Yr,RAD2DEG:or,generateUUID:yr,clamp:de,euclideanModulo:Kh,mapLinear:S0,inverseLerp:w0,lerp:Kr,damp:T0,pingpong:E0,smoothstep:A0,smootherstep:R0,randInt:C0,randFloat:I0,randFloatSpread:P0,seededRandom:L0,degToRad:k0,radToDeg:N0,isPowerOfTwo:D0,ceilPowerOfTwo:O0,floorPowerOfTwo:U0,setQuaternionFromProperEuler:z0,normalize:pi,denormalize:ir},tu=class tu{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=de(this.x,t.x,e.x),this.y=de(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=de(this.x,t,e),this.y=de(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(de(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(de(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*n+t.x,this.y=r*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};tu.prototype.isVector2=!0;var Zt=tu,ze=class{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3],d=r[a+0],p=r[a+1],g=r[a+2],x=r[a+3];if(u!==x||l!==d||c!==p||h!==g){let f=l*d+c*p+h*g+u*x;f<0&&(d=-d,p=-p,g=-g,x=-x,f=-f);let m=1-o;if(f<.9995){let v=Math.acos(f),w=Math.sin(v);m=Math.sin(m*v)/w,o=Math.sin(o*v)/w,l=l*m+d*o,c=c*m+p*o,h=h*m+g*o,u=u*m+x*o}else{l=l*m+d*o,c=c*m+p*o,h=h*m+g*o,u=u*m+x*o;let v=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=v,c*=v,h*=v,u*=v}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,n,r,a){let o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-o*p,t[e+2]=c*g+h*p+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,n=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),u=o(r/2),d=l(i/2),p=l(n/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:Vt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],n=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+o+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-n)*p}else if(i>o&&i>u){let p=2*Math.sqrt(1+i-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(n+a)/p,this._z=(r+c)/p}else if(o>u){let p=2*Math.sqrt(1+o-i-u);this._w=(r-c)/p,this._x=(n+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-i-o);this._w=(a-n)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(de(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+n*c-r*l,this._y=n*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},eu=class eu{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ld.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ld.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,n=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*n-o*i),h=2*(o*e-r*n),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=n+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=de(this.x,t.x,e.x),this.y=de(this.y,t.y,e.y),this.z=de(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=de(this.x,t,e),this.y=de(this.y,t,e),this.z=de(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(de(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,n=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Kc.copy(this).projectOnVector(t),this.sub(Kc)}reflect(t){return this.sub(Kc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(de(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};eu.prototype.isVector3=!0;var k=eu,Kc=new k,Ld=new ze,iu=class iu{constructor(t,e,i,n,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c)}set(t,e,i,n,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=n,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],p=i[5],g=i[8],x=n[0],f=n[3],m=n[6],v=n[1],w=n[4],b=n[7],_=n[2],M=n[5],T=n[8];return r[0]=a*x+o*v+l*_,r[3]=a*f+o*w+l*M,r[6]=a*m+o*b+l*T,r[1]=c*x+h*v+u*_,r[4]=c*f+h*w+u*M,r[7]=c*m+h*b+u*T,r[2]=d*x+p*v+g*_,r[5]=d*f+p*w+g*M,r[8]=d*m+p*b+g*T,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+n*r*c-n*a*l}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,p=c*r-a*l,g=e*u+i*d+n*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(n*c-h*i)*x,t[2]=(o*i-n*a)*x,t[3]=d*x,t[4]=(h*e-n*l)*x,t[5]=(n*r-o*e)*x,t[6]=p*x,t[7]=(i*l-c*e)*x,t[8]=(a*e-i*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-n*c,n*l,-n*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Ms("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Zc.makeScale(t,e)),this}rotate(t){return Ms("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Zc.makeRotation(-t)),this}translate(t,e){return Ms("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Zc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};iu.prototype.isMatrix3=!0;var $t=iu,Zc=new $t,kd=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nd=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function F0(){let s={enabled:!0,workingColorSpace:Ss,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===_e&&(n.r=In(n.r),n.g=In(n.g),n.b=In(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_e&&(n.r=nr(n.r),n.g=nr(n.g),n.b=nr(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ln?Jr:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return Ms("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return Ms("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[Ss]:{primaries:t,whitePoint:i,transfer:Jr,toXYZ:kd,fromXYZ:Nd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Li},outputColorSpaceConfig:{drawingBufferColorSpace:Li}},[Li]:{primaries:t,whitePoint:i,transfer:_e,toXYZ:kd,fromXYZ:Nd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Li}}}),s}var le=F0();function In(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function nr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Gs,wo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Gs===void 0&&(Gs=jr("canvas")),Gs.width=t.width,Gs.height=t.height;let n=Gs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=Gs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=jr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=In(r[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(In(e[i]/255)*255):e[i]=In(e[i]);return{data:e,width:t.width,height:t.height}}else return Vt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},B0=0,lr=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:B0++}),this.uuid=yr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(Jc(n[a].image)):r.push(Jc(n[a]))}else r=Jc(n);i.url=r}return e||(t.images[this.uuid]=i),i}};function Jc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?wo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Vt("Texture: Unable to serialize Texture."),{})}var H0=0,jc=new k,mi=class s extends un{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,i=cn,n=cn,r=Ye,a=ns,o=Ti,l=Si,c=s.DEFAULT_ANISOTROPY,h=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:H0++}),this.uuid=yr(),this.name="",this.source=new lr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Zt(0,0),this.repeat=new Zt(1,1),this.center=new Zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(jc).x}get height(){return this.source.getSize(jc).y}get depth(){return this.source.getSize(jc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Vt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Vt(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==zh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _o:t.x=t.x-Math.floor(t.x);break;case cn:t.x=t.x<0?0:1;break;case Mo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _o:t.y=t.y-Math.floor(t.y);break;case cn:t.y=t.y<0?0:1;break;case Mo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};mi.DEFAULT_IMAGE=null;mi.DEFAULT_MAPPING=zh;mi.DEFAULT_ANISOTROPY=1;var nu=class nu{constructor(t=0,e=0,i=0,n=1){this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],x=l[2],f=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+f)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(c+1)/2,b=(p+1)/2,_=(m+1)/2,M=(h+d)/4,T=(u+x)/4,y=(g+f)/4;return w>b&&w>_?w<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(w),n=M/i,r=T/i):b>_?b<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(b),i=M/n,r=y/n):_<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(_),i=T/r,n=y/r),this.set(i,n,r,e),this}let v=Math.sqrt((f-g)*(f-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(f-g)/v,this.y=(u-x)/v,this.z=(d-h)/v,this.w=Math.acos((c+p+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=de(this.x,t.x,e.x),this.y=de(this.y,t.y,e.y),this.z=de(this.z,t.z,e.z),this.w=de(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=de(this.x,t,e),this.y=de(this.y,t,e),this.z=de(this.z,t,e),this.w=de(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(de(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};nu.prototype.isVector4=!0;var Re=nu,To=class extends un{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ye,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Re(0,0,t,e),this.scissorTest=!1,this.viewport=new Re(0,0,t,e),this.textures=[];let n={width:t,height:e,depth:i.depth},r=new mi(n),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ye,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let n=Object.assign({},t.textures[e].image);this.textures[e].source=new lr(n)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ci=class extends To{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Qr=class extends mi{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Eo=class extends mi{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var $o=class $o{constructor(t,e,i,n,r,a,o,l,c,h,u,d,p,g,x,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c,h,u,d,p,g,x,f)}set(t,e,i,n,r,a,o,l,c,h,u,d,p,g,x,f){let m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=n,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=p,m[7]=g,m[11]=x,m[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $o().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,n=1/Vs.setFromMatrixColumn(t,0).length(),r=1/Vs.setFromMatrixColumn(t,1).length(),a=1/Vs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,n=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=a*h,p=a*u,g=o*h,x=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-x*c,e[9]=-o*l,e[2]=x-d*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d+x*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=x+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d-x*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=x-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*h,p=a*u,g=o*h,x=o*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,p=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=x-d*u,e[8]=g*u+p,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-x*u}else if(t.order==="XZY"){let d=a*l,p=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=a*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(G0,t,V0)}lookAt(t,e,i){let n=this.elements;return Ii.subVectors(t,e),Ii.lengthSq()===0&&(Ii.z=1),Ii.normalize(),Hn.crossVectors(i,Ii),Hn.lengthSq()===0&&(Math.abs(i.z)===1?Ii.x+=1e-4:Ii.z+=1e-4,Ii.normalize(),Hn.crossVectors(i,Ii)),Hn.normalize(),$a.crossVectors(Ii,Hn),n[0]=Hn.x,n[4]=$a.x,n[8]=Ii.x,n[1]=Hn.y,n[5]=$a.y,n[9]=Ii.y,n[2]=Hn.z,n[6]=$a.z,n[10]=Ii.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],p=i[13],g=i[2],x=i[6],f=i[10],m=i[14],v=i[3],w=i[7],b=i[11],_=i[15],M=n[0],T=n[4],y=n[8],E=n[12],C=n[1],L=n[5],R=n[9],D=n[13],N=n[2],F=n[6],X=n[10],Y=n[14],st=n[3],K=n[7],tt=n[11],q=n[15];return r[0]=a*M+o*C+l*N+c*st,r[4]=a*T+o*L+l*F+c*K,r[8]=a*y+o*R+l*X+c*tt,r[12]=a*E+o*D+l*Y+c*q,r[1]=h*M+u*C+d*N+p*st,r[5]=h*T+u*L+d*F+p*K,r[9]=h*y+u*R+d*X+p*tt,r[13]=h*E+u*D+d*Y+p*q,r[2]=g*M+x*C+f*N+m*st,r[6]=g*T+x*L+f*F+m*K,r[10]=g*y+x*R+f*X+m*tt,r[14]=g*E+x*D+f*Y+m*q,r[3]=v*M+w*C+b*N+_*st,r[7]=v*T+w*L+b*F+_*K,r[11]=v*y+w*R+b*X+_*tt,r[15]=v*E+w*D+b*Y+_*q,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],x=t[7],f=t[11],m=t[15],v=l*p-c*d,w=o*p-c*u,b=o*d-l*u,_=a*p-c*h,M=a*d-l*h,T=a*u-o*h;return e*(x*v-f*w+m*b)-i*(g*v-f*_+m*M)+n*(g*w-x*_+m*T)-r*(g*b-x*M+f*T)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(r*h-o*l)+n*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],x=t[13],f=t[14],m=t[15],v=e*o-i*a,w=e*l-n*a,b=e*c-r*a,_=i*l-n*o,M=i*c-r*o,T=n*c-r*l,y=h*x-u*g,E=h*f-d*g,C=h*m-p*g,L=u*f-d*x,R=u*m-p*x,D=d*m-p*f,N=v*D-w*R+b*L+_*C-M*E+T*y;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/N;return t[0]=(o*D-l*R+c*L)*F,t[1]=(n*R-i*D-r*L)*F,t[2]=(x*T-f*M+m*_)*F,t[3]=(d*M-u*T-p*_)*F,t[4]=(l*C-a*D-c*E)*F,t[5]=(e*D-n*C+r*E)*F,t[6]=(f*b-g*T-m*w)*F,t[7]=(h*T-d*b+p*w)*F,t[8]=(a*R-o*C+c*y)*F,t[9]=(i*C-e*R-r*y)*F,t[10]=(g*M-x*b+m*v)*F,t[11]=(u*b-h*M-p*v)*F,t[12]=(o*E-a*L-l*y)*F,t[13]=(e*L-i*E+n*y)*F,t[14]=(x*w-g*_-f*v)*F,t[15]=(h*_-u*w+d*v)*F,this}scale(t){let e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),n=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,a){return this.set(1,i,r,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){let n=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,p=r*h,g=r*u,x=a*h,f=a*u,m=o*u,v=l*c,w=l*h,b=l*u,_=i.x,M=i.y,T=i.z;return n[0]=(1-(x+m))*_,n[1]=(p+b)*_,n[2]=(g-w)*_,n[3]=0,n[4]=(p-b)*M,n[5]=(1-(d+m))*M,n[6]=(f+v)*M,n[7]=0,n[8]=(g+w)*T,n[9]=(f-v)*T,n[10]=(1-(d+x))*T,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){let n=this.elements;t.x=n[12],t.y=n[13],t.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Vs.set(n[0],n[1],n[2]).length(),o=Vs.set(n[4],n[5],n[6]).length(),l=Vs.set(n[8],n[9],n[10]).length();r<0&&(a=-a),qi.copy(this);let c=1/a,h=1/o,u=1/l;return qi.elements[0]*=c,qi.elements[1]*=c,qi.elements[2]*=c,qi.elements[4]*=h,qi.elements[5]*=h,qi.elements[6]*=h,qi.elements[8]*=u,qi.elements[9]*=u,qi.elements[10]*=u,e.setFromRotationMatrix(qi),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,n,r,a,o=Ji,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(i-n),d=(e+t)/(e-t),p=(i+n)/(i-n),g,x;if(l)g=r/(a-r),x=a*r/(a-r);else if(o===Ji)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===rr)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,r,a,o=Ji,l=!1){let c=this.elements,h=2/(e-t),u=2/(i-n),d=-(e+t)/(e-t),p=-(i+n)/(i-n),g,x;if(l)g=1/(a-r),x=a/(a-r);else if(o===Ji)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===rr)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};$o.prototype.isMatrix4=!0;var oe=$o,Vs=new k,qi=new oe,G0=new k(0,0,0),V0=new k(1,1,1),Hn=new k,$a=new k,Ii=new k,Dd=new oe,Od=new ze,_i=class s{constructor(t=0,e=0,i=0,n=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let n=t.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],u=n[2],d=n[6],p=n[10];switch(e){case"XYZ":this._y=Math.asin(de(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-de(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(de(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-de(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(de(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-de(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Vt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Dd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Dd,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Od.setFromEuler(this),this.setFromQuaternion(Od,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_i.DEFAULT_ORDER="XYZ";var ta=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},W0=0,Ud=new k,Ws=new ze,Tn=new oe,Xa=new k,Gr=new k,$0=new k,X0=new ze,zd=new k(1,0,0),Fd=new k(0,1,0),Bd=new k(0,0,1),Hd={type:"added"},q0={type:"removed"},$s={type:"childadded",child:null},Qc={type:"childremoved",child:null},gi=class s extends un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:W0++}),this.uuid=yr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new k,e=new _i,i=new ze,n=new k(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new oe},normalMatrix:{value:new $t}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ta,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ws.setFromAxisAngle(t,e),this.quaternion.multiply(Ws),this}rotateOnWorldAxis(t,e){return Ws.setFromAxisAngle(t,e),this.quaternion.premultiply(Ws),this}rotateX(t){return this.rotateOnAxis(zd,t)}rotateY(t){return this.rotateOnAxis(Fd,t)}rotateZ(t){return this.rotateOnAxis(Bd,t)}translateOnAxis(t,e){return Ud.copy(t).applyQuaternion(this.quaternion),this.position.add(Ud.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zd,t)}translateY(t){return this.translateOnAxis(Fd,t)}translateZ(t){return this.translateOnAxis(Bd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Xa.copy(t):Xa.set(t,e,i);let n=this.parent;this.updateWorldMatrix(!0,!1),Gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(Gr,Xa,this.up):Tn.lookAt(Xa,Gr,this.up),this.quaternion.setFromRotationMatrix(Tn),n&&(Tn.extractRotation(n.matrixWorld),Ws.setFromRotationMatrix(Tn),this.quaternion.premultiply(Ws.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Xt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Hd),$s.child=t,this.dispatchEvent($s),$s.child=null):Xt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(q0),Qc.child=t,this.dispatchEvent(Qc),Qc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Tn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Tn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Hd),$s.child=t,this.dispatchEvent($s),$s.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,t,$0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,X0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,n=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*n,r[13]+=i-r[1]*e-r[5]*i-r[9]*n,r[14]+=n-r[2]*e-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));n.material=o}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];n.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let n=t.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};gi.DEFAULT_UP=new k(0,1,0);gi.DEFAULT_MATRIX_AUTO_UPDATE=!0;gi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ei=class extends gi{constructor(){super(),this.isGroup=!0,this.type="Group"}},Y0={type:"move"},cr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ei,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ei,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ei,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let x of t.hand.values()){let f=e.getJointPose(x,i),m=this._getHandJoint(c,x);f!==null&&(m.matrix.fromArray(f.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=f.radius),m.visible=f!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Y0)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new ei;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Ff={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},qa={h:0,s:0,l:0};function th(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var te=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Li){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=le.workingColorSpace){return this.r=t,this.g=e,this.b=i,le.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=le.workingColorSpace){if(t=Kh(t,1),e=de(e,0,1),i=de(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=th(a,r,t+1/3),this.g=th(a,r,t),this.b=th(a,r,t-1/3)}return le.colorSpaceToWorking(this,n),this}setStyle(t,e=Li){function i(r){r!==void 0&&parseFloat(r)<1&&Vt("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Vt("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Vt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Li){let i=Ff[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Vt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=In(t.r),this.g=In(t.g),this.b=In(t.b),this}copyLinearToSRGB(t){return this.r=nr(t.r),this.g=nr(t.g),this.b=nr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Li){return le.workingToColorSpace(oi.copy(this),t),Math.round(de(oi.r*255,0,255))*65536+Math.round(de(oi.g*255,0,255))*256+Math.round(de(oi.b*255,0,255))}getHexString(t=Li){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.workingToColorSpace(oi.copy(this),e);let i=oi.r,n=oi.g,r=oi.b,a=Math.max(i,n,r),o=Math.min(i,n,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(n-r)/u+(n<r?6:0);break;case n:l=(r-i)/u+2;break;case r:l=(i-n)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=le.workingColorSpace){return le.workingToColorSpace(oi.copy(this),e),t.r=oi.r,t.g=oi.g,t.b=oi.b,t}getStyle(t=Li){le.workingToColorSpace(oi.copy(this),t);let e=oi.r,i=oi.g,n=oi.b;return t!==Li?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Gn),this.setHSL(Gn.h+t,Gn.s+e,Gn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Gn),t.getHSL(qa);let i=Kr(Gn.h,qa.h,e),n=Kr(Gn.s,qa.s,e),r=Kr(Gn.l,qa.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},oi=new te;te.NAMES=Ff;var ea=class s{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new te(t),this.near=e,this.far=i}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},hr=class extends gi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _i,this.environmentIntensity=1,this.environmentRotation=new _i,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Yi=new k,En=new k,eh=new k,An=new k,Xs=new k,qs=new k,Gd=new k,ih=new k,nh=new k,sh=new k,rh=new Re,ah=new Re,oh=new Re,Xn=class s{constructor(t=new k,e=new k,i=new k){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),Yi.subVectors(t,e),n.cross(Yi);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){Yi.subVectors(n,e),En.subVectors(i,e),eh.subVectors(t,e);let a=Yi.dot(Yi),o=Yi.dot(En),l=Yi.dot(eh),c=En.dot(En),h=En.dot(eh),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(t,e,i,n,r,a,o,l){return this.getBarycoord(t,e,i,n,An)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,An.x),l.addScaledVector(a,An.y),l.addScaledVector(o,An.z),l)}static getInterpolatedAttribute(t,e,i,n,r,a){return rh.setScalar(0),ah.setScalar(0),oh.setScalar(0),rh.fromBufferAttribute(t,e),ah.fromBufferAttribute(t,i),oh.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(rh,r.x),a.addScaledVector(ah,r.y),a.addScaledVector(oh,r.z),a}static isFrontFacing(t,e,i,n){return Yi.subVectors(i,e),En.subVectors(t,e),Yi.cross(En).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Yi.subVectors(this.c,this.b),En.subVectors(this.a,this.b),Yi.cross(En).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return s.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,n=this.b,r=this.c,a,o;Xs.subVectors(n,i),qs.subVectors(r,i),ih.subVectors(t,i);let l=Xs.dot(ih),c=qs.dot(ih);if(l<=0&&c<=0)return e.copy(i);nh.subVectors(t,n);let h=Xs.dot(nh),u=qs.dot(nh);if(h>=0&&u<=h)return e.copy(n);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(Xs,a);sh.subVectors(t,r);let p=Xs.dot(sh),g=qs.dot(sh);if(g>=0&&p<=g)return e.copy(r);let x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(qs,o);let f=h*g-p*u;if(f<=0&&u-h>=0&&p-g>=0)return Gd.subVectors(r,n),o=(u-h)/(u-h+(p-g)),e.copy(n).addScaledVector(Gd,o);let m=1/(f+x+d);return a=x*m,o=d*m,e.copy(i).addScaledVector(Xs,a).addScaledVector(qs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},dn=class{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Ki.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Ki.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Ki.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ki):Ki.fromBufferAttribute(r,a),Ki.applyMatrix4(t.matrixWorld),this.expandByPoint(Ki);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ya.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ya.copy(i.boundingBox)),Ya.applyMatrix4(t.matrixWorld),this.union(Ya)}let n=t.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ki),Ki.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vr),Ka.subVectors(this.max,Vr),Ys.subVectors(t.a,Vr),Ks.subVectors(t.b,Vr),Zs.subVectors(t.c,Vr),Vn.subVectors(Ks,Ys),Wn.subVectors(Zs,Ks),vs.subVectors(Ys,Zs);let e=[0,-Vn.z,Vn.y,0,-Wn.z,Wn.y,0,-vs.z,vs.y,Vn.z,0,-Vn.x,Wn.z,0,-Wn.x,vs.z,0,-vs.x,-Vn.y,Vn.x,0,-Wn.y,Wn.x,0,-vs.y,vs.x,0];return!lh(e,Ys,Ks,Zs,Ka)||(e=[1,0,0,0,1,0,0,0,1],!lh(e,Ys,Ks,Zs,Ka))?!1:(Za.crossVectors(Vn,Wn),e=[Za.x,Za.y,Za.z],lh(e,Ys,Ks,Zs,Ka))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ki).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ki).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Rn=[new k,new k,new k,new k,new k,new k,new k,new k],Ki=new k,Ya=new dn,Ys=new k,Ks=new k,Zs=new k,Vn=new k,Wn=new k,vs=new k,Vr=new k,Ka=new k,Za=new k,ys=new k;function lh(s,t,e,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){ys.fromArray(s,r);let o=n.x*Math.abs(ys.x)+n.y*Math.abs(ys.y)+n.z*Math.abs(ys.z),l=t.dot(ys),c=e.dot(ys),h=i.dot(ys);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var qe=new k,Ja=new Zt,K0=0,ki=class extends un{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:K0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Nf,this.updateRanges=[],this.gpuType=wi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ja.fromBufferAttribute(this,e),Ja.applyMatrix3(t),this.setXY(e,Ja.x,Ja.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix3(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix4(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.applyNormalMatrix(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.transformDirection(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ir(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=pi(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ir(e,this.array)),e}setX(t,e){return this.normalized&&(e=pi(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ir(e,this.array)),e}setY(t,e){return this.normalized&&(e=pi(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ir(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pi(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ir(e,this.array)),e}setW(t,e){return this.normalized&&(e=pi(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=pi(e,this.array),i=pi(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=pi(e,this.array),i=pi(i,this.array),n=pi(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=pi(e,this.array),i=pi(i,this.array),n=pi(n,this.array),r=pi(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var ia=class extends ki{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var na=class extends ki{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var pe=class extends ki{constructor(t,e,i){super(new Float32Array(t),e,i)}},Z0=new dn,Wr=new k,ch=new k,fn=class{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Z0.setFromPoints(t).getCenter(i);let n=0;for(let r=0,a=t.length;r<a;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Wr.subVectors(t,this.center);let e=Wr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(Wr,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ch.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Wr.copy(t.center).add(ch)),this.expandByPoint(Wr.copy(t.center).sub(ch))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},J0=0,Fi=new oe,hh=new gi,Js=new k,Pi=new dn,$r=new dn,ti=new k,Ke=class s extends un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:J0++}),this.uuid=yr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(_0(t)?na:ia)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new $t().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Fi.makeRotationFromQuaternion(t),this.applyMatrix4(Fi),this}rotateX(t){return Fi.makeRotationX(t),this.applyMatrix4(Fi),this}rotateY(t){return Fi.makeRotationY(t),this.applyMatrix4(Fi),this}rotateZ(t){return Fi.makeRotationZ(t),this.applyMatrix4(Fi),this}translate(t,e,i){return Fi.makeTranslation(t,e,i),this.applyMatrix4(Fi),this}scale(t,e,i){return Fi.makeScale(t,e,i),this.applyMatrix4(Fi),this}lookAt(t){return hh.lookAt(t),hh.updateMatrix(),this.applyMatrix4(hh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let n=0,r=t.length;n<r;n++){let a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new pe(i,3))}else{let i=Math.min(t.length,e.count);for(let n=0;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&Vt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){let r=e[i];Pi.setFromBufferAttribute(r),this.morphTargetsRelative?(ti.addVectors(this.boundingBox.min,Pi.min),this.boundingBox.expandByPoint(ti),ti.addVectors(this.boundingBox.max,Pi.max),this.boundingBox.expandByPoint(ti)):(this.boundingBox.expandByPoint(Pi.min),this.boundingBox.expandByPoint(Pi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){let i=this.boundingSphere.center;if(Pi.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];$r.setFromBufferAttribute(o),this.morphTargetsRelative?(ti.addVectors(Pi.min,$r.min),Pi.expandByPoint(ti),ti.addVectors(Pi.max,$r.max),Pi.expandByPoint(ti)):(Pi.expandByPoint($r.min),Pi.expandByPoint($r.max))}Pi.getCenter(i);let n=0;for(let r=0,a=t.count;r<a;r++)ti.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(ti));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ti.fromBufferAttribute(o,c),l&&(Js.fromBufferAttribute(t,c),ti.add(Js)),n=Math.max(n,i.distanceToSquared(ti))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Xt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Xt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,n=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new ki(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new k,l[y]=new k;let c=new k,h=new k,u=new k,d=new Zt,p=new Zt,g=new Zt,x=new k,f=new k;function m(y,E,C){c.fromBufferAttribute(i,y),h.fromBufferAttribute(i,E),u.fromBufferAttribute(i,C),d.fromBufferAttribute(r,y),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,C),h.sub(c),u.sub(c),p.sub(d),g.sub(d);let L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(L),f.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(L),o[y].add(x),o[E].add(x),o[C].add(x),l[y].add(f),l[E].add(f),l[C].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let y=0,E=v.length;y<E;++y){let C=v[y],L=C.start,R=C.count;for(let D=L,N=L+R;D<N;D+=3)m(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let w=new k,b=new k,_=new k,M=new k;function T(y){_.fromBufferAttribute(n,y),M.copy(_);let E=o[y];w.copy(E),w.sub(_.multiplyScalar(_.dot(E))).normalize(),b.crossVectors(M,E);let L=b.dot(l[y])<0?-1:1;a.setXYZW(y,w.x,w.y,w.z,L)}for(let y=0,E=v.length;y<E;++y){let C=v[y],L=C.start,R=C.count;for(let D=L,N=L+R;D<N;D+=3)T(t.getX(D+0)),T(t.getX(D+1)),T(t.getX(D+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new ki(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);let n=new k,r=new k,a=new k,o=new k,l=new k,c=new k,h=new k,u=new k;if(t)for(let d=0,p=t.count;d<p;d+=3){let g=t.getX(d+0),x=t.getX(d+1),f=t.getX(d+2);n.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,f),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,f),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(f,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)n.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ti.fromBufferAttribute(t,e),ti.normalize(),t.setXYZ(e,ti.x,ti.y,ti.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),p=0,g=0;for(let x=0,f=l.length;x<f;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*h;for(let m=0;m<h;m++)d[g++]=c[p++]}return new ki(d,h,u)}if(this.index===null)return Vt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,i=this.index.array,n=this.attributes;for(let o in n){let l=n[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],p=t(d,i);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let n={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(n[l]=h,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let n=t.attributes;for(let c in n){let h=n[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var uh=new k,j0=new k,Q0=new $t,Zi=class{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let n=uh.subVectors(i,e).cross(j0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let n=t.delta(uh),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Q0.getNormalMatrix(t),n=this.coplanarPoint(uh).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},tg=0,ws=class extends un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tg++}),this.uuid=yr(),this.name="",this.type="Material",this.blending=gr,this.side=pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Rh,this.blendDst=Ch,this.blendEquation=Rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Af,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fo,this.stencilZFail=fo,this.stencilZPass=fo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Vt(`Material: parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Vt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=n(t.textures),a=n(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new te().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Zi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Zt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Zt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Cn=new k,dh=new k,ja=new k,Qa=new k,Ao=class{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Cn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Cn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Cn.copy(this.origin).addScaledVector(this.direction,e),Cn.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){dh.copy(t).add(e).multiplyScalar(.5),ja.copy(e).sub(t).normalize(),Qa.copy(this.origin).sub(dh);let r=t.distanceTo(e)*.5,a=-this.direction.dot(ja),o=Qa.dot(this.direction),l=-Qa.dot(ja),c=Qa.lengthSq(),h=Math.abs(1-a*a),u,d,p,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(dh).addScaledVector(ja,d),p}intersectSphere(t,e){if(t.radius<0)return null;Cn.subVectors(t.center,this.origin);let i=Cn.dot(this.direction),n=Cn.dot(Cn)-i*i,r=t.radius*t.radius;if(n>r)return null;let a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,n=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,n=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,Cn)!==null}intersectTriangle(t,e,i,n,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=t.x-a.x,d=t.y-a.y,p=t.z-a.z,g=e.x-a.x,x=e.y-a.y,f=e.z-a.z,m=i.x-a.x,v=i.y-a.y,w=i.z-a.z,b=Math.abs(l),_=Math.abs(c),M=Math.abs(h),T,y,E,C,L,R,D,N,F,X,Y,st;if(b>=_&&b>=M?(E=l,R=u,F=g,st=m,l>=0?(T=c,y=h,C=d,L=p,D=x,N=f,X=v,Y=w):(T=h,y=c,C=p,L=d,D=f,N=x,X=w,Y=v)):_>=M?(E=c,R=d,F=x,st=v,c>=0?(T=h,y=l,C=p,L=u,D=f,N=g,X=w,Y=m):(T=l,y=h,C=u,L=p,D=g,N=f,X=m,Y=w)):(E=h,R=p,F=f,st=w,h>=0?(T=l,y=c,C=u,L=d,D=g,N=x,X=m,Y=v):(T=c,y=l,C=d,L=u,D=x,N=g,X=v,Y=m)),E===0)return null;let K=T/E,tt=y/E,q=1/E,mt=C-K*R,wt=L-tt*R,ot=D-K*F,it=N-tt*F,zt=X-K*st,V=Y-tt*st,J=zt*it-V*ot,ut=mt*V-wt*zt,Rt=ot*wt-it*mt;if(n){if(J<0||ut<0||Rt<0)return null}else if((J<0||ut<0||Rt<0)&&(J>0||ut>0||Rt>0))return null;let ct=J+ut+Rt;if(ct===0)return null;let Ft=q*(J*R+ut*F+Rt*st);return(ct>0?Ft<0:Ft>0)?null:this.at(Ft/ct,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ts=class extends ws{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=Ih,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Vd=new oe,bs=new Ao,to=new fn,Wd=new k,eo=new k,io=new k,no=new k,fh=new k,so=new k,$d=new k,ro=new k,se=class extends gi{constructor(t=new Ke,e=new Ts){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);let o=this.morphTargetInfluences;if(r&&o){so.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(fh.fromBufferAttribute(u,t),a?so.addScaledVector(fh,h):so.addScaledVector(fh.sub(e),h))}e.add(so)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),to.copy(i.boundingSphere),to.applyMatrix4(r),bs.copy(t.ray).recast(t.near),!(to.containsPoint(bs.origin)===!1&&(bs.intersectSphere(to,Wd)===null||bs.origin.distanceToSquared(Wd)>(t.far-t.near)**2))&&(Vd.copy(r).invert(),bs.copy(t.ray).applyMatrix4(Vd),!(i.boundingBox!==null&&bs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,bs)))}_computeIntersections(t,e,i){let n,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let f=d[g],m=a[f.materialIndex],v=Math.max(f.start,p.start),w=Math.min(o.count,Math.min(f.start+f.count,p.start+p.count));for(let b=v,_=w;b<_;b+=3){let M=o.getX(b),T=o.getX(b+1),y=o.getX(b+2);n=ao(this,m,t,i,c,h,u,M,T,y),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=f.materialIndex,e.push(n))}}else{let g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let f=g,m=x;f<m;f+=3){let v=o.getX(f),w=o.getX(f+1),b=o.getX(f+2);n=ao(this,a,t,i,c,h,u,v,w,b),n&&(n.faceIndex=Math.floor(f/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let f=d[g],m=a[f.materialIndex],v=Math.max(f.start,p.start),w=Math.min(l.count,Math.min(f.start+f.count,p.start+p.count));for(let b=v,_=w;b<_;b+=3){let M=b,T=b+1,y=b+2;n=ao(this,m,t,i,c,h,u,M,T,y),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=f.materialIndex,e.push(n))}}else{let g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let f=g,m=x;f<m;f+=3){let v=f,w=f+1,b=f+2;n=ao(this,a,t,i,c,h,u,v,w,b),n&&(n.faceIndex=Math.floor(f/3),e.push(n))}}}};function eg(s,t,e,i,n,r,a,o){let l;if(t.side===ii?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,t.side===pn,o),l===null)return null;ro.copy(o),ro.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(ro);return c<e.near||c>e.far?null:{distance:c,point:ro.clone(),object:s}}function ao(s,t,e,i,n,r,a,o,l,c){s.getVertexPosition(o,eo),s.getVertexPosition(l,io),s.getVertexPosition(c,no);let h=eg(s,t,e,i,eo,io,no,$d);if(h){let u=new k;Xn.getBarycoord($d,eo,io,no,u),n&&(h.uv=Xn.getInterpolatedAttribute(n,o,l,c,u,new Zt)),r&&(h.uv1=Xn.getInterpolatedAttribute(r,o,l,c,u,new Zt)),a&&(h.normal=Xn.getInterpolatedAttribute(a,o,l,c,u,new k),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new k,materialIndex:0};Xn.getNormal(eo,io,no,d.normal),h.face=d,h.barycoord=u}return h}var Es=class extends mi{constructor(t=null,e=1,i=1,n,r,a,o,l,c=Ve,h=Ve,u,d){super(null,a,o,l,c,h,n,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Mi=class extends ki{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},js=new oe,Xd=new oe,oo=[],qd=new dn,ig=new oe,Xr=new se,qr=new fn,ur=class extends se{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Mi(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,ig)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new dn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,js),qd.copy(t.boundingBox).applyMatrix4(js),this.boundingBox.union(qd)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new fn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,js),qr.copy(t.boundingSphere).applyMatrix4(js),this.boundingSphere.union(qr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){let i=this.matrixWorld,n=this.count;if(Xr.geometry=this.geometry,Xr.material=this.material,Xr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qr.copy(this.boundingSphere),qr.applyMatrix4(i),t.ray.intersectsSphere(qr)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,js),Xd.multiplyMatrices(i,js),Xr.matrixWorld=Xd,Xr.raycast(t,oo);for(let a=0,o=oo.length;a<o;a++){let l=oo[a];l.instanceId=r,l.object=this,e.push(l)}oo.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Mi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new Es(new Float32Array(n*this.count),n,this.count,jo,wi));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=n*t;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},_s=new fn,ng=new Zt(.5,.5),lo=new k,dr=class{constructor(t=new Zi,e=new Zi,i=new Zi,n=new Zi,r=new Zi,a=new Zi){this.planes=[t,e,i,n,r,a]}set(t,e,i,n,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Ji,i=!1){let n=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],p=r[7],g=r[8],x=r[9],f=r[10],m=r[11],v=r[12],w=r[13],b=r[14],_=r[15];if(n[0].setComponents(c-a,p-h,m-g,_-v).normalize(),n[1].setComponents(c+a,p+h,m+g,_+v).normalize(),n[2].setComponents(c+o,p+u,m+x,_+w).normalize(),n[3].setComponents(c-o,p-u,m-x,_-w).normalize(),i)n[4].setComponents(l,d,f,b).normalize(),n[5].setComponents(c-l,p-d,m-f,_-b).normalize();else if(n[4].setComponents(c-l,p-d,m-f,_-b).normalize(),e===Ji)n[5].setComponents(c+l,p+d,m+f,_+b).normalize();else if(e===rr)n[5].setComponents(l,d,f,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_s.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_s.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_s)}intersectsSprite(t){_s.center.set(0,0,0);let e=ng.distanceTo(t.center);return _s.radius=.7071067811865476+e,_s.applyMatrix4(t.matrixWorld),this.intersectsSphere(_s)}intersectsSphere(t){let e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let n=e[i];if(lo.x=n.normal.x>0?t.max.x:t.min.x,lo.y=n.normal.y>0?t.max.y:t.min.y,lo.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(lo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var sa=class extends mi{constructor(t=[],e=is,i,n,r,a,o,l,c,h){super(t,e,i,n,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},fr=class extends mi{constructor(t,e,i,n,r,a,o,l,c){super(t,e,i,n,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var qn=class extends mi{constructor(t,e,i=Qi,n,r,a,o=Ve,l=Ve,c,h=hn,u=1){if(h!==hn&&h!==ss)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,n,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new lr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ro=class extends qn{constructor(t,e=Qi,i=is,n,r,a=Ve,o=Ve,l,c=hn){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,i,n,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},ra=class extends mi{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Yn=class s extends Ke{constructor(t=1,e=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};let o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,r,4),g("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new pe(c,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(u,2));function g(x,f,m,v,w,b,_,M,T,y,E){let C=b/T,L=_/y,R=b/2,D=_/2,N=M/2,F=T+1,X=y+1,Y=0,st=0,K=new k;for(let tt=0;tt<X;tt++){let q=tt*L-D;for(let mt=0;mt<F;mt++){let wt=mt*C-R;K[x]=wt*v,K[f]=q*w,K[m]=N,c.push(K.x,K.y,K.z),K[x]=0,K[f]=0,K[m]=M>0?1:-1,h.push(K.x,K.y,K.z),u.push(mt/T),u.push(1-tt/y),Y+=1}}for(let tt=0;tt<y;tt++)for(let q=0;q<T;q++){let mt=d+q+F*tt,wt=d+q+F*(tt+1),ot=d+(q+1)+F*(tt+1),it=d+(q+1)+F*tt;l.push(mt,wt,it),l.push(wt,ot,it),st+=6}o.addGroup(p,st,E),p+=st,d+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Kn=class s extends Ke{constructor(t=1,e=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;n=Math.floor(n),r=Math.floor(r);let h=[],u=[],d=[],p=[],g=0,x=[],f=i/2,m=0;v(),a===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new pe(u,3)),this.setAttribute("normal",new pe(d,3)),this.setAttribute("uv",new pe(p,2));function v(){let b=new k,_=new k,M=0,T=(e-t)/i;for(let y=0;y<=r;y++){let E=[],C=y/r,L=C*(e-t)+t;for(let R=0;R<=n;R++){let D=R/n,N=D*l+o,F=Math.sin(N),X=Math.cos(N);_.x=L*F,_.y=-C*i+f,_.z=L*X,u.push(_.x,_.y,_.z),b.set(F,T,X).normalize(),d.push(b.x,b.y,b.z),p.push(D,1-C),E.push(g++)}x.push(E)}for(let y=0;y<n;y++)for(let E=0;E<r;E++){let C=x[E][y],L=x[E+1][y],R=x[E+1][y+1],D=x[E][y+1];(t>0||E!==0)&&(h.push(C,L,D),M+=3),(e>0||E!==r-1)&&(h.push(L,R,D),M+=3)}c.addGroup(m,M,0),m+=M}function w(b){let _=g,M=new Zt,T=new k,y=0,E=b===!0?t:e,C=b===!0?1:-1;for(let R=1;R<=n;R++)u.push(0,f*C,0),d.push(0,C,0),p.push(.5,.5),g++;let L=g;for(let R=0;R<=n;R++){let N=R/n*l+o,F=Math.cos(N),X=Math.sin(N);T.x=E*X,T.y=f*C,T.z=E*F,u.push(T.x,T.y,T.z),d.push(0,C,0),M.x=F*.5+.5,M.y=X*.5*C+.5,p.push(M.x,M.y),g++}for(let R=0;R<n;R++){let D=_+R,N=L+R;b===!0?h.push(N,N+1,D):h.push(N+1,N,D),y+=3}c.addGroup(m,y,b===!0?1:2),m+=y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Pn=class s extends Kn{constructor(t=1,e=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},aa=class s extends Ke{constructor(t=[],e=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:n};let r=[],a=[];o(n),c(i),h(),this.setAttribute("position",new pe(r,3)),this.setAttribute("normal",new pe(r.slice(),3)),this.setAttribute("uv",new pe(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let w=new k,b=new k,_=new k;for(let M=0;M<e.length;M+=3)p(e[M+0],w),p(e[M+1],b),p(e[M+2],_),l(w,b,_,v)}function l(v,w,b,_){let M=_+1,T=[];for(let y=0;y<=M;y++){T[y]=[];let E=v.clone().lerp(b,y/M),C=w.clone().lerp(b,y/M),L=M-y;for(let R=0;R<=L;R++)R===0&&y===M?T[y][R]=E:T[y][R]=E.clone().lerp(C,R/L)}for(let y=0;y<M;y++)for(let E=0;E<2*(M-y)-1;E++){let C=Math.floor(E/2);E%2===0?(d(T[y][C+1]),d(T[y+1][C]),d(T[y][C])):(d(T[y][C+1]),d(T[y+1][C+1]),d(T[y+1][C]))}}function c(v){let w=new k;for(let b=0;b<r.length;b+=3)w.x=r[b+0],w.y=r[b+1],w.z=r[b+2],w.normalize().multiplyScalar(v),r[b+0]=w.x,r[b+1]=w.y,r[b+2]=w.z}function h(){let v=new k;for(let w=0;w<r.length;w+=3){v.x=r[w+0],v.y=r[w+1],v.z=r[w+2];let b=f(v)/2/Math.PI+.5,_=m(v)/Math.PI+.5;a.push(b,1-_)}g(),u()}function u(){for(let v=0;v<a.length;v+=6){let w=a[v+0],b=a[v+2],_=a[v+4],M=Math.max(w,b,_),T=Math.min(w,b,_);M>.9&&T<.1&&(w<.2&&(a[v+0]+=1),b<.2&&(a[v+2]+=1),_<.2&&(a[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function p(v,w){let b=v*3;w.x=t[b+0],w.y=t[b+1],w.z=t[b+2]}function g(){let v=new k,w=new k,b=new k,_=new k,M=new Zt,T=new Zt,y=new Zt;for(let E=0,C=0;E<r.length;E+=9,C+=6){v.set(r[E+0],r[E+1],r[E+2]),w.set(r[E+3],r[E+4],r[E+5]),b.set(r[E+6],r[E+7],r[E+8]),M.set(a[C+0],a[C+1]),T.set(a[C+2],a[C+3]),y.set(a[C+4],a[C+5]),_.copy(v).add(w).add(b).divideScalar(3);let L=f(_);x(M,C+0,v,L),x(T,C+2,w,L),x(y,C+4,b,L)}}function x(v,w,b,_){_<0&&v.x===1&&(a[w]=v.x-1),b.x===0&&b.z===0&&(a[w]=_/2/Math.PI+.5)}function f(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.detail)}};var Zn=class s extends aa{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var Ni=class s extends Ke{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,u=t/o,d=e/l,p=[],g=[],x=[],f=[];for(let m=0;m<h;m++){let v=m*d-a;for(let w=0;w<c;w++){let b=w*u-r;g.push(b,-v,0),x.push(0,0,1),f.push(w/o),f.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<o;v++){let w=v+c*m,b=v+c*(m+1),_=v+1+c*(m+1),M=v+1+c*m;p.push(w,b,M),p.push(b,_,M)}this.setIndex(p),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(x,3)),this.setAttribute("uv",new pe(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},Jn=class s extends Ke{constructor(t=.5,e=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);let o=[],l=[],c=[],h=[],u=t,d=(e-t)/n,p=new k,g=new Zt;for(let x=0;x<=n;x++){for(let f=0;f<=i;f++){let m=r+f/i*a;p.x=u*Math.cos(m),p.y=u*Math.sin(m),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<n;x++){let f=x*(i+1);for(let m=0;m<i;m++){let v=m+f,w=v,b=v+i+1,_=v+i+2,M=v+1;o.push(w,b,M),o.push(b,_,M)}}this.setIndex(o),this.setAttribute("position",new pe(l,3)),this.setAttribute("normal",new pe(c,3)),this.setAttribute("uv",new pe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var As=class s extends Ke{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new k,d=new k,p=[],g=[],x=[],f=[];for(let m=0;m<=i;m++){let v=[],w=m/i,b=a+w*o,_=t*Math.cos(b),M=Math.sqrt(t*t-_*_),T=0;m===0&&a===0?T=.5/e:m===i&&l===Math.PI&&(T=-.5/e);for(let y=0;y<=e;y++){let E=y/e,C=n+E*r;u.x=-M*Math.cos(C),u.y=_,u.z=M*Math.sin(C),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),f.push(E+T,1-w),v.push(c++)}h.push(v)}for(let m=0;m<i;m++)for(let v=0;v<e;v++){let w=h[m][v+1],b=h[m][v],_=h[m+1][v],M=h[m+1][v+1];(m!==0||a>0)&&p.push(w,b,M),(m!==i-1||l<Math.PI)&&p.push(b,_,M)}this.setIndex(p),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(x,3)),this.setAttribute("uv",new pe(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},oa=class s extends aa{constructor(t=1,e=0){let i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],n=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,n,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};function Is(s){let t={};for(let e in s){t[e]={};for(let i in s[e]){let n=s[e][i];if(Yd(n))n.isRenderTargetTexture?(Vt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone();else if(Array.isArray(n))if(Yd(n[0])){let r=[];for(let a=0,o=n.length;a<o;a++)r[a]=n[a].clone();t[e][i]=r}else t[e][i]=n.slice();else t[e][i]=n}}return t}function hi(s){let t={};for(let e=0;e<s.length;e++){let i=Is(s[e]);for(let n in i)t[n]=i[n]}return t}function Yd(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function sg(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Zh(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:le.workingColorSpace}var _a={clone:Is,merge:hi},rg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ag=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,He=class extends ws{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rg,this.fragmentShader=ag,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Is(t.uniforms),this.uniformsGroups=sg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let n in this.uniforms){let a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let n=t.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=e[n.value]||null;break;case"c":this.uniforms[i].value=new te().setHex(n.value);break;case"v2":this.uniforms[i].value=new Zt().fromArray(n.value);break;case"v3":this.uniforms[i].value=new k().fromArray(n.value);break;case"v4":this.uniforms[i].value=new Re().fromArray(n.value);break;case"m3":this.uniforms[i].value=new $t().fromArray(n.value);break;case"m4":this.uniforms[i].value=new oe().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Co=class extends He{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Io=class extends ws{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Po=class extends ws{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Qs(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function ph(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var jn=class{constructor(t,e,i,n){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,n=e[i],r=e[i-1];i:{t:{let a;e:{n:if(!(t<n)){for(let o=i+2;;){if(n===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=n,n=e[++i],t<n)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(n=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,t,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=t*n;for(let a=0;a!==n;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Lo=class extends jn{constructor(t,e,i,n){super(t,e,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xh,endingEnd:xh}}intervalChanged_(t,e,i){let n=this.parameterPositions,r=t-2,a=t+1,o=n[r],l=n[a];if(o===void 0)switch(this.getSettings_().endingStart){case vh:r=t,o=2*e-i;break;case yh:r=n.length-2,o=e+n[r]-n[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case vh:a=t,l=2*i-e;break;case yh:a=1,l=i+n[1]-n[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(i-e)/(n-e),x=g*g,f=x*g,m=-d*f+2*d*x-d*g,v=(1+d)*f+(-1.5-2*d)*x+(-.5+d)*g+1,w=(-1-p)*f+(1.5+p)*x+.5*g,b=p*f-p*x;for(let _=0;_!==o;++_)r[_]=m*a[h+_]+v*a[c+_]+w*a[l+_]+b*a[u+_];return r}},ko=class extends jn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(n-e),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},No=class extends jn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t){return this.copySampleValue_(t-1)}},Do=class extends jn{interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(i-e)/(n-e),x=1-g;for(let f=0;f!==o;++f)r[f]=a[c+f]*x+a[l+f]*g;return r}let d=o*2,p=t-1;for(let g=0;g!==o;++g){let x=a[c+g],f=a[l+g],m=p*d+g*2,v=u[m],w=u[m+1],b=t*d+g*2,_=h[b],M=h[b+1],T=lg(i,e,v,_,n);r[g]=Bf(T,x,w,M,f)}return r}};function Bf(s,t,e,i,n){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*i+s*s*s*n}function og(s,t,e,i,n){let r=1-s;return 3*r*r*(e-t)+6*r*s*(i-e)+3*s*s*(n-i)}function lg(s,t,e,i,n){let r=(s-t)/(n-t);for(let a=0;a<8;a++){let o=Bf(r,t,e,i,n)-s;if(Math.abs(o)<1e-10)break;let l=og(r,t,e,i,n);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Di=class{constructor(t,e,i,n){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Qs(e,this.TimeBufferType),this.values=Qs(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Qs(t.times,Array),values:Qs(t.values,Array)};let n=t.getInterpolation();n!==t.DefaultInterpolation&&(i.interpolation=n),ph(t.settings)&&(i.settings={inTangents:Qs(t.settings.inTangents,Array),outTangents:Qs(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new No(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ko(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Lo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Do(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Zr:e=this.InterpolantFactoryMethodDiscrete;break;case So:e=this.InterpolantFactoryMethodLinear;break;case uo:e=this.InterpolantFactoryMethodSmooth;break;case gh:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Vt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Zr;case this.InterpolantFactoryMethodLinear:return So;case this.InterpolantFactoryMethodSmooth:return uo;case this.InterpolantFactoryMethodBezier:return gh}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]*=t;ph(this.settings)&&(Kd(this.settings.inTangents,t),Kd(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,n=i.length,r=0,a=n-1;for(;r!==n&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==n){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Xt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,n=this.values,r=i.length;r===0&&(Xt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Xt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Xt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(n!==void 0&&M0(n))for(let o=0,l=n.length;o!==l;++o){let c=n[o];if(isNaN(c)){Xt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===uo,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(n)l=!0;else{let u=o*i,d=u-i,p=u+i;for(let g=0;g!==i;++g){let x=e[u+g];if(x!==e[d+g]||x!==e[p+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*i,d=a*i;for(let p=0;p!==i;++p)e[d+p]=e[u+p]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,n=new i(this.name,t,e);return n.createInterpolant=this.createInterpolant,ph(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Kd(s,t){for(let e=0,i=s.length;e!==i;e+=2)s[e]*=t}Di.prototype.ValueTypeName="";Di.prototype.TimeBufferType=Float32Array;Di.prototype.ValueBufferType=Float32Array;Di.prototype.DefaultInterpolation=So;var Qn=class extends Di{constructor(t,e,i){super(t,e,i)}};Qn.prototype.ValueTypeName="bool";Qn.prototype.ValueBufferType=Array;Qn.prototype.DefaultInterpolation=Zr;Qn.prototype.InterpolantFactoryMethodLinear=void 0;Qn.prototype.InterpolantFactoryMethodSmooth=void 0;var Oo=class extends Di{constructor(t,e,i,n){super(t,e,i,n)}};Oo.prototype.ValueTypeName="color";var Uo=class extends Di{constructor(t,e,i,n){super(t,e,i,n)}};Uo.prototype.ValueTypeName="number";var zo=class extends jn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(n-e),c=t*o;for(let h=c+o;c!==h;c+=4)ze.slerpFlat(r,0,a,c-o,a,c,l);return r}},la=class extends Di{constructor(t,e,i,n){super(t,e,i,n)}InterpolantFactoryMethodLinear(t){return new zo(this.times,this.values,this.getValueSize(),t)}};la.prototype.ValueTypeName="quaternion";la.prototype.InterpolantFactoryMethodSmooth=void 0;var ts=class extends Di{constructor(t,e,i){super(t,e,i)}};ts.prototype.ValueTypeName="string";ts.prototype.ValueBufferType=Array;ts.prototype.DefaultInterpolation=Zr;ts.prototype.InterpolantFactoryMethodLinear=void 0;ts.prototype.InterpolantFactoryMethodSmooth=void 0;var Fo=class extends Di{constructor(t,e,i,n){super(t,e,i,n)}};Fo.prototype.ValueTypeName="vector";var Bo=class{constructor(t,e,i){let n=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Hf=new Bo,Ho=class{constructor(t){this.manager=t!==void 0?t:Hf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(n,r){i.load(t,n,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ho.DEFAULT_MATERIAL_NAME="__DEFAULT";var Go=class extends gi{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new te(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var mh=new oe,Zd=new k,Jd=new k,Vo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Zt(512,512),this.mapType=Si,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dr,this._frameExtents=new Zt(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Zd.setFromMatrixPosition(t.matrixWorld),e.position.copy(Zd),Jd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Jd),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,n){mh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(mh,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=n?n.z/r.x:1,o=n?n.w/r.y:1,l=n?n.x/r.x:0,c=n?n.y/r.y:0;t.coordinateSystem===rr||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(mh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},co=new k,ho=new ze,ln=new k,ca=class extends gi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=Ji,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(co,ho,ln),ln.x===1&&ln.y===1&&ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(co,ho,ln.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(co,ho,ln),ln.x===1&&ln.y===1&&ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(co,ho,ln.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},$n=new k,jd=new Zt,Qd=new Zt,li=class extends ca{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=or*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Yr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return or*2*Math.atan(Math.tan(Yr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,jd,Qd),e.subVectors(Qd,jd)}setViewOffset(t,e,i,n,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Yr*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,e-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var es=class extends ca{constructor(t=-1,e=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-t,a=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},bh=class extends Vo{constructor(){super(new es(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ha=class extends Go{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gi.DEFAULT_UP),this.updateMatrix(),this.target=new gi,this.shadow=new bh}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var ua=class extends Ke{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var tr=-90,er=1,pr=class extends gi{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new li(tr,er,t,e);n.layers=this.layers,this.add(n);let r=new li(tr,er,t,e);r.layers=this.layers,this.add(r);let a=new li(tr,er,t,e);a.layers=this.layers,this.add(a);let o=new li(tr,er,t,e);o.layers=this.layers,this.add(o);let l=new li(tr,er,t,e);l.layers=this.layers,this.add(l);let c=new li(tr,er,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,n,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Ji)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===rr)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let f=!1;t.isWebGLRenderer===!0?f=t.state.buffers.depth.getReversed():f=t.reversedDepthBuffer,t.setRenderTarget(i,0,n),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,n),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,n),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,n),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,n),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,n),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Wo=class extends li{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Jh="\\[\\]\\.:\\/",cg=new RegExp("["+Jh+"]","g"),jh="[^"+Jh+"]",hg="[^"+Jh.replace("\\.","")+"]",ug=/((?:WC+[\/:])*)/.source.replace("WC",jh),dg=/(WCOD+)?/.source.replace("WCOD",hg),fg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jh),pg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jh),mg=new RegExp("^"+ug+dg+fg+pg+"$"),gg=["material","materials","bones","map"],_h=class{constructor(t,e,i){let n=i||De.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,n)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},De=class s{constructor(t,e,i){this.path=e,this.parsedPath=i||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,i):new s(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(cg,"")}static parseTrackName(t){let e=mg.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);gg.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},n=i(t.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)t[e++]=i[n]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,n=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Vt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Xt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Xt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Xt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Xt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Xt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Xt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Xt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[n];if(a===void 0){let c=e.nodeName;Xt("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!t.geometry){Xt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Xt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};De.Composite=_h;De.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};De.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};De.prototype.GetterByBindingType=[De.prototype._getValue_direct,De.prototype._getValue_array,De.prototype._getValue_arrayElement,De.prototype._getValue_toArray];De.prototype.SetterByBindingTypeAndVersioning=[[De.prototype._setValue_direct,De.prototype._setValue_direct_setNeedsUpdate,De.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[De.prototype._setValue_array,De.prototype._setValue_array_setNeedsUpdate,De.prototype._setValue_array_setMatrixWorldNeedsUpdate],[De.prototype._setValue_arrayElement,De.prototype._setValue_arrayElement_setNeedsUpdate,De.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[De.prototype._setValue_fromArray,De.prototype._setValue_fromArray_setNeedsUpdate,De.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var aM=new Float32Array(1);var su=class su{constructor(t,e,i,n){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,n){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=n,this}};su.prototype.isMatrix2=!0;var Mh=su;function Qh(s,t,e,i){let n=xg(i);switch(e){case Vh:return s*t;case jo:return s*t/n.components*n.byteLength;case Qo:return s*t/n.components*n.byteLength;case rs:return s*t*2/n.components*n.byteLength;case tl:return s*t*2/n.components*n.byteLength;case Wh:return s*t*3/n.components*n.byteLength;case Ti:return s*t*4/n.components*n.byteLength;case el:return s*t*4/n.components*n.byteLength;case ma:case ga:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case xa:case va:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case nl:case rl:return Math.max(s,16)*Math.max(t,8)/4;case il:case sl:return Math.max(s,8)*Math.max(t,8)/2;case al:case ol:case cl:case hl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ll:case ya:case ul:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case dl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case fl:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case pl:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case ml:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case gl:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case xl:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case vl:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case yl:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case bl:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case _l:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ml:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Sl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case wl:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Tl:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case El:case Al:case Rl:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Cl:case Il:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ba:case Pl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function xg(s){switch(s){case Si:case Fh:return{byteLength:1,components:1};case xr:case Bh:case tn:return{byteLength:2,components:1};case Zo:case Jo:return{byteLength:2,components:4};case Qi:case Ko:case wi:return{byteLength:4,components:1};case Hh:case Gh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Vt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function cp(){let s=null,t=!1,e=null,i=null;function n(r,a){i=s.requestAnimationFrame(n),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function yg(s){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],x=u[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let x=u[p];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:a}}var bg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_g=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Mg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Eg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ag=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Cg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ig=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Lg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,kg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ng=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Dg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Og=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ug=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Bg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Hg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Gg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Vg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Wg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,$g=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Xg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Yg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Qg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,tx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ex=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ix=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,nx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ax=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ox=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ux=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,dx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,fx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,px=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,vx=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_x=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mx=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Sx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ex=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ax=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ix=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Px=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ox=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ux=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Fx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Bx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Vx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Wx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$x=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Zx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ev=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,iv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,nv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,sv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,av=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ov=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,lv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,pv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,mv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,gv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,bv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_v=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ev=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Av=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Rv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Cv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Nv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Dv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ov=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Uv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Fv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Hv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Gv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,$v=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Kv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,re={alphahash_fragment:bg,alphahash_pars_fragment:_g,alphamap_fragment:Mg,alphamap_pars_fragment:Sg,alphatest_fragment:wg,alphatest_pars_fragment:Tg,aomap_fragment:Eg,aomap_pars_fragment:Ag,batching_pars_vertex:Rg,batching_vertex:Cg,begin_vertex:Ig,beginnormal_vertex:Pg,bsdfs:Lg,iridescence_fragment:kg,bumpmap_pars_fragment:Ng,clipping_planes_fragment:Dg,clipping_planes_pars_fragment:Og,clipping_planes_pars_vertex:Ug,clipping_planes_vertex:zg,color_fragment:Fg,color_pars_fragment:Bg,color_pars_vertex:Hg,color_vertex:Gg,common:Vg,cube_uv_reflection_fragment:Wg,defaultnormal_vertex:$g,displacementmap_pars_vertex:Xg,displacementmap_vertex:qg,emissivemap_fragment:Yg,emissivemap_pars_fragment:Kg,colorspace_fragment:Zg,colorspace_pars_fragment:Jg,envmap_fragment:jg,envmap_common_pars_fragment:Qg,envmap_pars_fragment:tx,envmap_pars_vertex:ex,envmap_physical_pars_fragment:dx,envmap_vertex:ix,fog_vertex:nx,fog_pars_vertex:sx,fog_fragment:rx,fog_pars_fragment:ax,gradientmap_pars_fragment:ox,lightmap_pars_fragment:lx,lights_lambert_fragment:cx,lights_lambert_pars_fragment:hx,lights_pars_begin:ux,lights_toon_fragment:fx,lights_toon_pars_fragment:px,lights_phong_fragment:mx,lights_phong_pars_fragment:gx,lights_physical_fragment:xx,lights_physical_pars_fragment:vx,lights_fragment_begin:yx,lights_fragment_maps:bx,lights_fragment_end:_x,lightprobes_pars_fragment:Mx,logdepthbuf_fragment:Sx,logdepthbuf_pars_fragment:wx,logdepthbuf_pars_vertex:Tx,logdepthbuf_vertex:Ex,map_fragment:Ax,map_pars_fragment:Rx,map_particle_fragment:Cx,map_particle_pars_fragment:Ix,metalnessmap_fragment:Px,metalnessmap_pars_fragment:Lx,morphinstance_vertex:kx,morphcolor_vertex:Nx,morphnormal_vertex:Dx,morphtarget_pars_vertex:Ox,morphtarget_vertex:Ux,normal_fragment_begin:zx,normal_fragment_maps:Fx,normal_pars_fragment:Bx,normal_pars_vertex:Hx,normal_vertex:Gx,normalmap_pars_fragment:Vx,clearcoat_normal_fragment_begin:Wx,clearcoat_normal_fragment_maps:$x,clearcoat_pars_fragment:Xx,iridescence_pars_fragment:qx,opaque_fragment:Yx,packing:Kx,premultiplied_alpha_fragment:Zx,project_vertex:Jx,dithering_fragment:jx,dithering_pars_fragment:Qx,roughnessmap_fragment:tv,roughnessmap_pars_fragment:ev,shadowmap_pars_fragment:iv,shadowmap_pars_vertex:nv,shadowmap_vertex:sv,shadowmask_pars_fragment:rv,skinbase_vertex:av,skinning_pars_vertex:ov,skinning_vertex:lv,skinnormal_vertex:cv,specularmap_fragment:hv,specularmap_pars_fragment:uv,tonemapping_fragment:dv,tonemapping_pars_fragment:fv,transmission_fragment:pv,transmission_pars_fragment:mv,uv_pars_fragment:gv,uv_pars_vertex:xv,uv_vertex:vv,worldpos_vertex:yv,background_vert:bv,background_frag:_v,backgroundCube_vert:Mv,backgroundCube_frag:Sv,cube_vert:wv,cube_frag:Tv,depth_vert:Ev,depth_frag:Av,distance_vert:Rv,distance_frag:Cv,equirect_vert:Iv,equirect_frag:Pv,linedashed_vert:Lv,linedashed_frag:kv,meshbasic_vert:Nv,meshbasic_frag:Dv,meshlambert_vert:Ov,meshlambert_frag:Uv,meshmatcap_vert:zv,meshmatcap_frag:Fv,meshnormal_vert:Bv,meshnormal_frag:Hv,meshphong_vert:Gv,meshphong_frag:Vv,meshphysical_vert:Wv,meshphysical_frag:$v,meshtoon_vert:Xv,meshtoon_frag:qv,points_vert:Yv,points_frag:Kv,shadow_vert:Zv,shadow_frag:Jv,sprite_vert:jv,sprite_frag:Qv},dt={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new Zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new Zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},xn={basic:{uniforms:hi([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:re.meshbasic_vert,fragmentShader:re.meshbasic_frag},lambert:{uniforms:hi([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new te(0)},envMapIntensity:{value:1}}]),vertexShader:re.meshlambert_vert,fragmentShader:re.meshlambert_frag},phong:{uniforms:hi([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:re.meshphong_vert,fragmentShader:re.meshphong_frag},standard:{uniforms:hi([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag},toon:{uniforms:hi([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new te(0)}}]),vertexShader:re.meshtoon_vert,fragmentShader:re.meshtoon_frag},matcap:{uniforms:hi([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:re.meshmatcap_vert,fragmentShader:re.meshmatcap_frag},points:{uniforms:hi([dt.points,dt.fog]),vertexShader:re.points_vert,fragmentShader:re.points_frag},dashed:{uniforms:hi([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:re.linedashed_vert,fragmentShader:re.linedashed_frag},depth:{uniforms:hi([dt.common,dt.displacementmap]),vertexShader:re.depth_vert,fragmentShader:re.depth_frag},normal:{uniforms:hi([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:re.meshnormal_vert,fragmentShader:re.meshnormal_frag},sprite:{uniforms:hi([dt.sprite,dt.fog]),vertexShader:re.sprite_vert,fragmentShader:re.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:re.background_vert,fragmentShader:re.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:re.backgroundCube_vert,fragmentShader:re.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:re.cube_vert,fragmentShader:re.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:re.equirect_vert,fragmentShader:re.equirect_frag},distance:{uniforms:hi([dt.common,dt.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:re.distance_vert,fragmentShader:re.distance_frag},shadow:{uniforms:hi([dt.lights,dt.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:re.shadow_vert,fragmentShader:re.shadow_frag}};xn.physical={uniforms:hi([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new Zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new Zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new Zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag};var Nl={r:0,b:0,g:0},ty=new oe,hp=new $t;hp.set(-1,0,0,0,1,0,0,0,1);function ey(s,t,e,i,n,r){let a=new te(0),o=n===!0?0:1,l,c,h=null,u=0,d=null;function p(v){let w=v.isScene===!0?v.background:null;if(w&&w.isTexture){let b=v.backgroundBlurriness>0;w=t.get(w,b)}return w}function g(v){let w=!1,b=p(v);b===null?f(a,o):b&&b.isColor&&(f(b,1),w=!0);let _=s.xr.getEnvironmentBlendMode();_==="additive"?e.buffers.color.setClear(0,0,0,1,r):_==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(v,w){let b=p(w);b&&(b.isCubeTexture||b.mapping===fa)?(c===void 0&&(c=new se(new Yn(1,1,1),new He({name:"BackgroundCubeMaterial",uniforms:Is(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,M,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(ty.makeRotationFromEuler(w.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(hp),c.material.toneMapped=le.getTransfer(b.colorSpace)!==_e,(h!==b||u!==b.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=b,u=b.version,d=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new se(new Ni(2,2),new He({name:"BackgroundMaterial",uniforms:Is(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=le.getTransfer(b.colorSpace)!==_e,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||u!==b.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=b,u=b.version,d=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function f(v,w){v.getRGB(Nl,Zh(s)),e.buffers.color.setClear(Nl.r,Nl.g,Nl.b,w,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,w=1){a.set(v),o=w,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,f(a,o)},render:g,addToRenderList:x,dispose:m}}function iy(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=d(null),r=n,a=!1;function o(L,R,D,N,F){let X=!1,Y=u(L,N,D,R);r!==Y&&(r=Y,c(r.object)),X=p(L,N,D,F),X&&g(L,N,D,F),F!==null&&t.update(F,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,b(L,R,D,N),F!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return s.createVertexArray()}function c(L){return s.bindVertexArray(L)}function h(L){return s.deleteVertexArray(L)}function u(L,R,D,N){let F=N.wireframe===!0,X=i[R.id];X===void 0&&(X={},i[R.id]=X);let Y=L.isInstancedMesh===!0?L.id:0,st=X[Y];st===void 0&&(st={},X[Y]=st);let K=st[D.id];K===void 0&&(K={},st[D.id]=K);let tt=K[F];return tt===void 0&&(tt=d(l()),K[F]=tt),tt}function d(L){let R=[],D=[],N=[];for(let F=0;F<e;F++)R[F]=0,D[F]=0,N[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:D,attributeDivisors:N,object:L,attributes:{},index:null}}function p(L,R,D,N){let F=r.attributes,X=R.attributes,Y=0,st=D.getAttributes();for(let K in st)if(st[K].location>=0){let q=F[K],mt=X[K];if(mt===void 0&&(K==="instanceMatrix"&&L.instanceMatrix&&(mt=L.instanceMatrix),K==="instanceColor"&&L.instanceColor&&(mt=L.instanceColor)),q===void 0||q.attribute!==mt||mt&&q.data!==mt.data)return!0;Y++}return r.attributesNum!==Y||r.index!==N}function g(L,R,D,N){let F={},X=R.attributes,Y=0,st=D.getAttributes();for(let K in st)if(st[K].location>=0){let q=X[K];q===void 0&&(K==="instanceMatrix"&&L.instanceMatrix&&(q=L.instanceMatrix),K==="instanceColor"&&L.instanceColor&&(q=L.instanceColor));let mt={};mt.attribute=q,q&&q.data&&(mt.data=q.data),F[K]=mt,Y++}r.attributes=F,r.attributesNum=Y,r.index=N}function x(){let L=r.newAttributes;for(let R=0,D=L.length;R<D;R++)L[R]=0}function f(L){m(L,0)}function m(L,R){let D=r.newAttributes,N=r.enabledAttributes,F=r.attributeDivisors;D[L]=1,N[L]===0&&(s.enableVertexAttribArray(L),N[L]=1),F[L]!==R&&(s.vertexAttribDivisor(L,R),F[L]=R)}function v(){let L=r.newAttributes,R=r.enabledAttributes;for(let D=0,N=R.length;D<N;D++)R[D]!==L[D]&&(s.disableVertexAttribArray(D),R[D]=0)}function w(L,R,D,N,F,X,Y){Y===!0?s.vertexAttribIPointer(L,R,D,F,X):s.vertexAttribPointer(L,R,D,N,F,X)}function b(L,R,D,N){x();let F=N.attributes,X=D.getAttributes(),Y=R.defaultAttributeValues;for(let st in X){let K=X[st];if(K.location>=0){let tt=F[st];if(tt===void 0&&(st==="instanceMatrix"&&L.instanceMatrix&&(tt=L.instanceMatrix),st==="instanceColor"&&L.instanceColor&&(tt=L.instanceColor)),tt!==void 0){let q=tt.normalized,mt=tt.itemSize,wt=t.get(tt);if(wt===void 0)continue;let ot=wt.buffer,it=wt.type,zt=wt.bytesPerElement,V=it===s.INT||it===s.UNSIGNED_INT||tt.gpuType===Ko;if(tt.isInterleavedBufferAttribute){let J=tt.data,ut=J.stride,Rt=tt.offset;if(J.isInstancedInterleavedBuffer){for(let ct=0;ct<K.locationSize;ct++)m(K.location+ct,J.meshPerAttribute);L.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ct=0;ct<K.locationSize;ct++)f(K.location+ct);s.bindBuffer(s.ARRAY_BUFFER,ot);for(let ct=0;ct<K.locationSize;ct++)w(K.location+ct,mt/K.locationSize,it,q,ut*zt,(Rt+mt/K.locationSize*ct)*zt,V)}else{if(tt.isInstancedBufferAttribute){for(let J=0;J<K.locationSize;J++)m(K.location+J,tt.meshPerAttribute);L.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let J=0;J<K.locationSize;J++)f(K.location+J);s.bindBuffer(s.ARRAY_BUFFER,ot);for(let J=0;J<K.locationSize;J++)w(K.location+J,mt/K.locationSize,it,q,mt*zt,mt/K.locationSize*J*zt,V)}}else if(Y!==void 0){let q=Y[st];if(q!==void 0)switch(q.length){case 2:s.vertexAttrib2fv(K.location,q);break;case 3:s.vertexAttrib3fv(K.location,q);break;case 4:s.vertexAttrib4fv(K.location,q);break;default:s.vertexAttrib1fv(K.location,q)}}}}v()}function _(){E();for(let L in i){let R=i[L];for(let D in R){let N=R[D];for(let F in N){let X=N[F];for(let Y in X)h(X[Y].object),delete X[Y];delete N[F]}}delete i[L]}}function M(L){if(i[L.id]===void 0)return;let R=i[L.id];for(let D in R){let N=R[D];for(let F in N){let X=N[F];for(let Y in X)h(X[Y].object),delete X[Y];delete N[F]}}delete i[L.id]}function T(L){for(let R in i){let D=i[R];for(let N in D){let F=D[N];if(F[L.id]===void 0)continue;let X=F[L.id];for(let Y in X)h(X[Y].object),delete X[Y];delete F[L.id]}}}function y(L){for(let R in i){let D=i[R],N=L.isInstancedMesh===!0?L.id:0,F=D[N];if(F!==void 0){for(let X in F){let Y=F[X];for(let st in Y)h(Y[st].object),delete Y[st];delete F[X]}delete D[N],Object.keys(D).length===0&&delete i[R]}}}function E(){C(),a=!0,r!==n&&(r=n,c(r.object))}function C(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:E,resetDefaultState:C,dispose:_,releaseStatesOfGeometry:M,releaseStatesOfObject:y,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:f,disableUnusedAttributes:v}}function ny(s,t,e){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let d=0;for(let p=0;p<h;p++)d+=c[p];e.update(d,i,1)}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function sy(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let T=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(T){return!(T!==Ti&&i.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){let y=T===tn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Si&&T!==wi&&!y&&i.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Vt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Vt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),f=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),_=s.getParameter(s.MAX_SAMPLES),M=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:f,maxAttributes:m,maxVertexUniforms:v,maxVaryings:w,maxFragmentUniforms:b,maxSamples:_,samples:M}}function ry(s){let t=this,e=null,i=0,n=!1,r=!1,a=new Zi,o=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||i!==0||n;return n=d,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,x=u.clipIntersection,f=u.clipShadows,m=s.get(u);if(!n||g===null||g.length===0||r&&!f)r?h(null):c();else{let v=r?0:i,w=v*4,b=m.clippingState||null;l.value=b,b=h(g,d,w,p);for(let _=0;_!==w;++_)b[_]=e[_];m.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,p,g){let x=u!==null?u.length:0,f=null;if(x!==0){if(f=l.value,g!==!0||f===null){let m=p+x*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(f===null||f.length<m)&&(f=new Float32Array(m));for(let w=0,b=p;w!==x;++w,b+=4)a.copy(u[w]).applyMatrix4(v,o),a.normal.toArray(f,b),f[b+3]=a.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,f}}var _r=4,ay=6,oy=20,ly=256,Ma=new es,Gf=new te,ru=null,au=0,ou=0,lu=!1,cy=new k,Ps=new k,Ol=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,r={}){let{size:a=256,position:o=cy}=r;ru=this._renderer.getRenderTarget(),au=this._renderer.getActiveCubeFace(),ou=this._renderer.getActiveMipmapLevel(),lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$f(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(ru,au,ou),this._renderer.xr.enabled=lu,t.scissorTest=!1,br(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===is||t.mapping===Cs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ru=this._renderer.getRenderTarget(),au=this._renderer.getActiveCubeFace(),ou=this._renderer.getActiveMipmapLevel(),lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ye,minFilter:Ye,generateMipmaps:!1,type:tn,format:Ti,colorSpace:Ss,depthBuffer:!1},n=Vf(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vf(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=hy(r)),this._blurMaterial=dy(r,t,e),this._ggxMaterial=uy(r,t,e)}return n}_compileMaterial(t){let e=new se(new Ke,t);this._renderer.compile(e,Ma)}_sceneToCubeUV(t,e,i,n,r){let l=new li(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(Gf),u.toneMapping=ji,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(n),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new se(new Yn,new Ts({name:"PMREM.Background",side:ii,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,f=x.material,m=!1,v=t.background;v?v.isColor&&(f.color.copy(v),t.background=null,m=!0):(f.color.copy(Gf),m=!0);for(let w=0;w<6;w++){let b=w%3;b===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):b===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));let _=this._cubeSize;br(n,b*_,w>2?_:0,_,_),u.setRenderTarget(n),m&&u.render(x,l),u.render(t,l)}u.toneMapping=p,u.autoClear=d,t.background=v}_textureToCubeUV(t,e){let i=this._renderer,n=t.mapping===is||t.mapping===Cs;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=$f()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wf());let r=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;br(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Ma)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let n=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=c*1.25,p=u*d,{_lodMax:g}=this,x=this._sizeLods[i],f=3*x*(i>g-_r?i-g+_r:0),m=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=g-e,br(r,f,m,3*x,2*x),n.setRenderTarget(r),n.render(o,Ma),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,br(t,f,m,3*x,2*x),n.setRenderTarget(t),n.render(o,Ma)}_blur(t,e,i,n){let r=this._pingPongRenderTarget,a=Math.min(n,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,n,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[n];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[n],u=3*h*(n>this._lodMax-_r?n-this._lodMax+_r:0),d=4*(this._cubeSize-h);br(e,u,d,3*h,2*h),a.setRenderTarget(e),a.render(l,Ma)}};function hy(s){let t=[],e=[],i=s,n=s-_r+1+ay;for(let r=0;r<n;r++){let a=Math.pow(2,i);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,p=3,g=new Float32Array(p*d*u),x=new Float32Array(p*d*u);for(let m=0;m<u;m++){let v=m%3*2/3-1,w=m>2?0:-1,b=[v,w,0,v+2/3,w,0,v+2/3,w+1,0,v,w,0,v+2/3,w+1,0,v,w+1,0];g.set(b,p*d*m);for(let _=0;_<d;_++){let M=h[_*2]*2-1,T=h[_*2+1]*2-1;m===0?Ps.set(1,T,M):m===1?Ps.set(-M,1,-T):m===2?Ps.set(-M,T,1):m===3?Ps.set(-1,T,-M):m===4?Ps.set(-M,-1,T):Ps.set(M,T,-1),Ps.toArray(x,(m*d+_)*p)}}let f=new Ke;f.setAttribute("position",new ki(g,p)),f.setAttribute("outputDirection",new ki(x,p)),e.push(new se(f,null)),i>_r&&i--}return{lodMeshes:e,sizeLods:t}}function Vf(s,t,e){let i=new ci(s,t,e);return i.texture.mapping=fa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function br(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function uy(s,t,e){return new He({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ly,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:zl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function dy(s,t,e){return new He({name:"SphericalGaussianBlur",defines:{SAMPLES:oy,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:zl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Wf(){return new He({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function $f(){return new He({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function zl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Sr=class extends ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new sa(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Yn(5,5,5),r=new He({name:"CubemapFromEquirect",uniforms:Is(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ii,blending:mn});r.uniforms.tEquirect.value=e;let a=new se(n,r),o=e.minFilter;return e.minFilter===ns&&(e.minFilter=Ye),new pr(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(r)}};function fy(s){let t=new WeakMap,e=new WeakMap,i=null;function n(d,p=!1){return d==null?null:p?a(d):r(d)}function r(d){if(d&&d.isTexture){let p=d.mapping;if(p===Xo||p===qo)if(t.has(d)){let g=t.get(d).texture;return o(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let x=new Sr(g.height);return x.fromEquirectangularTexture(s,d),t.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let p=d.mapping,g=p===Xo||p===qo,x=p===is||p===Cs;if(g||x){let f=e.get(d),m=f!==void 0?f.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return i===null&&(i=new Ol(s)),f=g?i.fromEquirectangular(d,f):i.fromCubemap(d,f),f.texture.pmremVersion=d.pmremVersion,e.set(d,f),f.texture;if(f!==void 0)return f.texture;{let v=d.image;return g&&v&&v.height>0||x&&v&&l(v)?(i===null&&(i=new Ol(s)),f=g?i.fromEquirectangular(d):i.fromCubemap(d),f.texture.pmremVersion=d.pmremVersion,e.set(d,f),d.addEventListener("dispose",h),f.texture):null}}}return d}function o(d,p){return p===Xo?d.mapping=is:p===qo&&(d.mapping=Cs),d}function l(d){let p=0,g=6;for(let x=0;x<g;x++)d[x]!==void 0&&p++;return p===g}function c(d){let p=d.target;p.removeEventListener("dispose",c);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function h(d){let p=d.target;p.removeEventListener("dispose",h);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:u}}function py(s){let t={};function e(i){if(t[i]!==void 0)return t[i];let n=s.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let n=e(i);return n===null&&Ms("WebGLRenderer: "+i+" extension not supported."),n}}}function my(s,t,e,i){let n={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete n[d.id];let p=r.get(d);p&&(t.remove(p),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return n[d.id]===!0||(d.addEventListener("dispose",a),n[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let p in d)t.update(d[p],s.ARRAY_BUFFER)}function c(u){let d=[],p=u.index,g=u.attributes.position,x=0;if(g===void 0)return;if(p!==null){let v=p.array;x=p.version;for(let w=0,b=v.length;w<b;w+=3){let _=v[w+0],M=v[w+1],T=v[w+2];d.push(_,M,M,T,T,_)}}else{let v=g.array;x=g.version;for(let w=0,b=v.length/3-1;w<b;w+=3){let _=w+0,M=w+1,T=w+2;d.push(_,M,M,T,T,_)}}let f=new(g.count>=65535?na:ia)(d,1);f.version=x;let m=r.get(u);m&&t.remove(m),r.set(u,f)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function gy(s,t,e){let i;function n(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){s.drawElements(i,d,r,u*a),e.update(d,i,1)}function c(u,d,p){p!==0&&(s.drawElementsInstanced(i,d,r,u*a,p),e.update(d,i,p))}function h(u,d,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,u,0,p);let x=0;for(let f=0;f<p;f++)x+=d[f];e.update(x,i,1)}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function xy(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Xt("WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function vy(s,t,e){let i=new WeakMap,n=new Re;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(o);if(d===void 0||d.count!==u){let E=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],w=0;p===!0&&(w=1),g===!0&&(w=2),x===!0&&(w=3);let b=o.attributes.position.count*w,_=1;b>t.maxTextureSize&&(_=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let M=new Float32Array(b*_*4*u),T=new Qr(M,b,_,u);T.type=wi,T.needsUpdate=!0;let y=w*4;for(let C=0;C<u;C++){let L=f[C],R=m[C],D=v[C],N=b*_*4*C;for(let F=0;F<L.count;F++){let X=F*y;p===!0&&(n.fromBufferAttribute(L,F),M[N+X+0]=n.x,M[N+X+1]=n.y,M[N+X+2]=n.z,M[N+X+3]=0),g===!0&&(n.fromBufferAttribute(R,F),M[N+X+4]=n.x,M[N+X+5]=n.y,M[N+X+6]=n.z,M[N+X+7]=0),x===!0&&(n.fromBufferAttribute(D,F),M[N+X+8]=n.x,M[N+X+9]=n.y,M[N+X+10]=n.z,M[N+X+11]=D.itemSize===4?n.w:1)}}d={count:u,texture:T,size:new Zt(b,_)},i.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function yy(s,t,e,i,n){let r=new WeakMap;function a(c){let h=n.render.frame,u=c.geometry,d=t.get(c,u);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return d}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var by={[Ph]:"LINEAR_TONE_MAPPING",[Lh]:"REINHARD_TONE_MAPPING",[kh]:"CINEON_TONE_MAPPING",[Nh]:"ACES_FILMIC_TONE_MAPPING",[Oh]:"AGX_TONE_MAPPING",[Uh]:"NEUTRAL_TONE_MAPPING",[Dh]:"CUSTOM_TONE_MAPPING"};function _y(s,t,e,i,n,r){let a=new ci(t,e,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Ke;c.setAttribute("position",new pe([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new pe([0,2,0,0,2,0],2));let h=new Co({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new se(c,h),d=new es(-1,1,1,-1,0,1),p=null,g=null,x=!1,f,m=null,v=[],w=!1;this.setSize=function(b,_){a.setSize(b,_),o!==null&&o.setSize(b,_),l!==null&&l.setSize(b,_);for(let M=0;M<v.length;M++){let T=v[M];T.setSize&&T.setSize(b,_)}},this.setEffects=function(b){v=b,w=v.length>0&&v[0].isRenderPass===!0;let _=a.width,M=a.height;v.length>0&&o===null&&(o=new ci(_,M,{type:tn,depthBuffer:!1,stencilBuffer:!1}),l=new ci(_,M,{type:tn,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<v.length;T++){let y=v[T];y.setSize&&y.setSize(_,M)}},this.begin=function(b,_){if(x||b.toneMapping===ji&&v.length===0)return!1;if(m=_,_!==null){let M=_.width,T=_.height;(a.width!==M||a.height!==T)&&this.setSize(M,T)}return w===!1&&b.setRenderTarget(a),f=b.toneMapping,b.toneMapping=ji,!0},this.hasRenderPass=function(){return w},this.end=function(b,_){b.toneMapping=f,x=!0;let M=a,T=o;for(let y=0;y<v.length;y++){let E=v[y];E.enabled!==!1&&(E.render(b,T,M,_),E.needsSwap!==!1&&(M=T,T=T===o?l:o))}if(p!==b.outputColorSpace||g!==b.toneMapping){p=b.outputColorSpace,g=b.toneMapping,h.defines={},le.getTransfer(p)===_e&&(h.defines.SRGB_TRANSFER="");let y=by[g];y&&(h.defines[y]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=M.texture,b.setRenderTarget(m),b.render(u,d),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var up=new mi,uu=new qn(1,1),dp=new Qr,fp=new Eo,pp=new sa,Xf=[],qf=[],Yf=new Float32Array(16),Kf=new Float32Array(9),Zf=new Float32Array(4);function wr(s,t,e){let i=s[0];if(i<=0||i>0)return s;let n=t*e,r=Xf[n];if(r===void 0&&(r=new Float32Array(n),Xf[n]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Je(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function je(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function Fl(s,t){let e=qf[t];e===void 0&&(e=new Int32Array(t),qf[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function My(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Sy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Je(e,t))return;s.uniform2fv(this.addr,t),je(e,t)}}function wy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Je(e,t))return;s.uniform3fv(this.addr,t),je(e,t)}}function Ty(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Je(e,t))return;s.uniform4fv(this.addr,t),je(e,t)}}function Ey(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(Je(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),je(e,t)}else{if(Je(e,i))return;Zf.set(i),s.uniformMatrix2fv(this.addr,!1,Zf),je(e,i)}}function Ay(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(Je(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),je(e,t)}else{if(Je(e,i))return;Kf.set(i),s.uniformMatrix3fv(this.addr,!1,Kf),je(e,i)}}function Ry(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(Je(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),je(e,t)}else{if(Je(e,i))return;Yf.set(i),s.uniformMatrix4fv(this.addr,!1,Yf),je(e,i)}}function Cy(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Iy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Je(e,t))return;s.uniform2iv(this.addr,t),je(e,t)}}function Py(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Je(e,t))return;s.uniform3iv(this.addr,t),je(e,t)}}function Ly(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Je(e,t))return;s.uniform4iv(this.addr,t),je(e,t)}}function ky(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Ny(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Je(e,t))return;s.uniform2uiv(this.addr,t),je(e,t)}}function Dy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Je(e,t))return;s.uniform3uiv(this.addr,t),je(e,t)}}function Oy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Je(e,t))return;s.uniform4uiv(this.addr,t),je(e,t)}}function Uy(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(uu.compareFunction=e.isReversedDepthBuffer()?kl:Ll,r=uu):r=up,e.setTexture2D(t||r,n)}function zy(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||fp,n)}function Fy(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||pp,n)}function By(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||dp,n)}function Hy(s){switch(s){case 5126:return My;case 35664:return Sy;case 35665:return wy;case 35666:return Ty;case 35674:return Ey;case 35675:return Ay;case 35676:return Ry;case 5124:case 35670:return Cy;case 35667:case 35671:return Iy;case 35668:case 35672:return Py;case 35669:case 35673:return Ly;case 5125:return ky;case 36294:return Ny;case 36295:return Dy;case 36296:return Oy;case 35678:case 36198:case 36298:case 36306:case 35682:return Uy;case 35679:case 36299:case 36307:return zy;case 35680:case 36300:case 36308:case 36293:return Fy;case 36289:case 36303:case 36311:case 36292:return By}}function Gy(s,t){s.uniform1fv(this.addr,t)}function Vy(s,t){let e=wr(t,this.size,2);s.uniform2fv(this.addr,e)}function Wy(s,t){let e=wr(t,this.size,3);s.uniform3fv(this.addr,e)}function $y(s,t){let e=wr(t,this.size,4);s.uniform4fv(this.addr,e)}function Xy(s,t){let e=wr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function qy(s,t){let e=wr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Yy(s,t){let e=wr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Ky(s,t){s.uniform1iv(this.addr,t)}function Zy(s,t){s.uniform2iv(this.addr,t)}function Jy(s,t){s.uniform3iv(this.addr,t)}function jy(s,t){s.uniform4iv(this.addr,t)}function Qy(s,t){s.uniform1uiv(this.addr,t)}function tb(s,t){s.uniform2uiv(this.addr,t)}function eb(s,t){s.uniform3uiv(this.addr,t)}function ib(s,t){s.uniform4uiv(this.addr,t)}function nb(s,t,e){let i=this.cache,n=t.length,r=Fl(e,n);Je(i,r)||(s.uniform1iv(this.addr,r),je(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=uu:a=up;for(let o=0;o!==n;++o)e.setTexture2D(t[o]||a,r[o])}function sb(s,t,e){let i=this.cache,n=t.length,r=Fl(e,n);Je(i,r)||(s.uniform1iv(this.addr,r),je(i,r));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||fp,r[a])}function rb(s,t,e){let i=this.cache,n=t.length,r=Fl(e,n);Je(i,r)||(s.uniform1iv(this.addr,r),je(i,r));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||pp,r[a])}function ab(s,t,e){let i=this.cache,n=t.length,r=Fl(e,n);Je(i,r)||(s.uniform1iv(this.addr,r),je(i,r));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||dp,r[a])}function ob(s){switch(s){case 5126:return Gy;case 35664:return Vy;case 35665:return Wy;case 35666:return $y;case 35674:return Xy;case 35675:return qy;case 35676:return Yy;case 5124:case 35670:return Ky;case 35667:case 35671:return Zy;case 35668:case 35672:return Jy;case 35669:case 35673:return jy;case 5125:return Qy;case 36294:return tb;case 36295:return eb;case 36296:return ib;case 35678:case 36198:case 36298:case 36306:case 35682:return nb;case 35679:case 36299:case 36307:return sb;case 35680:case 36300:case 36308:case 36293:return rb;case 36289:case 36303:case 36311:case 36292:return ab}}var du=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Hy(e.type)}},fu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ob(e.type)}},pu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let n=this.seq;for(let r=0,a=n.length;r!==a;++r){let o=n[r];o.setValue(t,e[o.id],i)}}},cu=/(\w+)(\])?(\[|\.)?/g;function Jf(s,t){s.seq.push(t),s.map[t.id]=t}function lb(s,t,e){let i=s.name,n=i.length;for(cu.lastIndex=0;;){let r=cu.exec(i),a=cu.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){Jf(e,c===void 0?new du(o,s,t):new fu(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new pu(o),Jf(e,u)),e=u}}}var Mr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);lb(o,l,this)}let n=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(t,e,i,n){let r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){let n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){let i=[];for(let n=0,r=t.length;n!==r;++n){let a=t[n];a.id in e&&i.push(a)}return i}};function jf(s,t,e){let i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}var cb=37297,hb=0;function ub(s,t){let e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=n;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Qf=new $t;function db(s){le._getMatrix(Qf,le.workingColorSpace,s);let t=`mat3( ${Qf.elements.map(e=>e.toFixed(4))} )`;switch(le.getTransfer(s)){case Jr:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return Vt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function tp(s,t,e){let i=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+ub(s.getShaderSource(t),o)}else return r}function fb(s,t){let e=db(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var pb={[Ph]:"Linear",[Lh]:"Reinhard",[kh]:"Cineon",[Nh]:"ACESFilmic",[Oh]:"AgX",[Uh]:"Neutral",[Dh]:"Custom"};function mb(s,t){let e=pb[t];return e===void 0?(Vt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Dl=new k;function gb(){le.getLuminanceCoefficients(Dl);let s=Dl.x.toFixed(4),t=Dl.y.toFixed(4),e=Dl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xb(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wa).join(`
`)}function vb(s){let t=[];for(let e in s){let i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function yb(s,t){let e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let r=s.getActiveAttrib(t,n),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function wa(s){return s!==""}function ep(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ip(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var bb=/^[ \t]*#include +<([\w\d./]+)>/gm;function mu(s){return s.replace(bb,Mb)}var _b=new Map;function Mb(s,t){let e=re[t];if(e===void 0){let i=_b.get(t);if(i!==void 0)e=re[i],Vt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return mu(e)}var Sb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function np(s){return s.replace(Sb,wb)}function wb(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function sp(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Tb={[da]:"SHADOWMAP_TYPE_PCF",[mr]:"SHADOWMAP_TYPE_VSM"};function Eb(s){return Tb[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Ab={[is]:"ENVMAP_TYPE_CUBE",[Cs]:"ENVMAP_TYPE_CUBE",[fa]:"ENVMAP_TYPE_CUBE_UV"};function Rb(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Ab[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var Cb={[Cs]:"ENVMAP_MODE_REFRACTION"};function Ib(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Cb[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Pb={[Ih]:"ENVMAP_BLENDING_MULTIPLY",[Mf]:"ENVMAP_BLENDING_MIX",[Sf]:"ENVMAP_BLENDING_ADD"};function Lb(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Pb[s.combine]||"ENVMAP_BLENDING_NONE"}function kb(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Nb(s,t,e,i){let n=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Eb(e),c=Rb(e),h=Ib(e),u=Lb(e),d=kb(e),p=xb(e),g=vb(r),x=n.createProgram(),f,m,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(wa).join(`
`),f.length>0&&(f+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(wa).join(`
`),m.length>0&&(m+=`
`)):(f=[sp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wa).join(`
`),m=[sp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ji?"#define TONE_MAPPING":"",e.toneMapping!==ji?re.tonemapping_pars_fragment:"",e.toneMapping!==ji?mb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",re.colorspace_pars_fragment,fb("linearToOutputTexel",e.outputColorSpace),gb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(wa).join(`
`)),a=mu(a),a=ep(a,e),a=ip(a,e),o=mu(o),o=ep(o,e),o=ip(o,e),a=np(a),o=np(o),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,m=["#define varying in",e.glslVersion===qh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===qh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let w=v+f+a,b=v+m+o,_=jf(n,n.VERTEX_SHADER,w),M=jf(n,n.FRAGMENT_SHADER,b);n.attachShader(x,_),n.attachShader(x,M),e.index0AttributeName!==void 0?n.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function T(L){if(s.debug.checkShaderErrors){let R=n.getProgramInfoLog(x)||"",D=n.getShaderInfoLog(_)||"",N=n.getShaderInfoLog(M)||"",F=R.trim(),X=D.trim(),Y=N.trim(),st=!0,K=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if(st=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,x,_,M);else{let tt=tp(n,_,"vertex"),q=tp(n,M,"fragment");Xt("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+F+`
`+tt+`
`+q)}else F!==""?Vt("WebGLProgram: Program Info Log:",F):(X===""||Y==="")&&(K=!1);K&&(L.diagnostics={runnable:st,programLog:F,vertexShader:{log:X,prefix:f},fragmentShader:{log:Y,prefix:m}})}n.deleteShader(_),n.deleteShader(M),y=new Mr(n,x),E=yb(n,x)}let y;this.getUniforms=function(){return y===void 0&&T(this),y};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=n.getProgramParameter(x,cb)),C},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=hb++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=_,this.fragmentShader=M,this}var Db=0,gu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let n=this._getShaderCacheForMaterial(t);return n.has(e)===!1&&(n.add(e),e.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new xu(t),e.set(t,i)),i}},xu=class{constructor(t){this.id=Db++,this.code=t,this.usedTimes=0}};function Ob(s){return s===rs||s===ya||s===ba}function Ub(s,t,e,i,n,r){let a=new ta,o=new gu,l=new Set,c=[],h=new Map,u=i.logarithmicDepthBuffer,d=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function x(y,E,C,L,R,D){let N=L.fog,F=R.geometry,X=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?L.environment:null,Y=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,st=t.get(y.envMap||X,Y),K=st&&st.mapping===fa?st.image.height:null,tt=p[y.type];y.precision!==null&&(d=i.getMaxPrecision(y.precision),d!==y.precision&&Vt("WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));let q=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,mt=q!==void 0?q.length:0,wt=0;F.morphAttributes.position!==void 0&&(wt=1),F.morphAttributes.normal!==void 0&&(wt=2),F.morphAttributes.color!==void 0&&(wt=3);let ot,it,zt,V;if(tt){let Pe=xn[tt];ot=Pe.vertexShader,it=Pe.fragmentShader}else{ot=y.vertexShader,it=y.fragmentShader;let Pe=o.getVertexShaderStage(y),ye=o.getFragmentShaderStage(y);o.update(y,Pe,ye),zt=Pe.id,V=ye.id}let J=s.getRenderTarget(),ut=s.state.buffers.depth.getReversed(),Rt=R.isInstancedMesh===!0,ct=R.isBatchedMesh===!0,Ft=!!y.map,ve=!!y.matcap,qt=!!st,Yt=!!y.aoMap,ae=!!y.lightMap,kt=!!y.bumpMap&&y.wireframe===!1,he=!!y.normalMap,Ie=!!y.displacementMap,Qe=!!y.emissiveMap,Ee=!!y.metalnessMap,$e=!!y.roughnessMap,z=y.anisotropy>0,si=y.clearcoat>0,Se=y.dispersion>0,P=y.retroreflectivity>0,S=y.iridescence>0,B=y.sheen>0,W=y.transmission>0,j=z&&!!y.anisotropyMap,lt=si&&!!y.clearcoatMap,pt=si&&!!y.clearcoatNormalMap,Q=si&&!!y.clearcoatRoughnessMap,nt=S&&!!y.iridescenceMap,gt=S&&!!y.iridescenceThicknessMap,Nt=B&&!!y.sheenColorMap,bt=B&&!!y.sheenRoughnessMap,xt=!!y.specularMap,Dt=!!y.specularColorMap,Gt=!!y.specularIntensityMap,jt=W&&!!y.transmissionMap,U=W&&!!y.thicknessMap,vt=!!y.gradientMap,et=!!y.alphaMap,yt=y.alphaTest>0,St=!!y.alphaHash,rt=!!y.extensions,Ot=ji;y.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Ot=s.toneMapping);let Pt={shaderID:tt,shaderType:y.type,shaderName:y.name,vertexShader:ot,fragmentShader:it,defines:y.defines,customVertexShaderID:zt,customFragmentShaderID:V,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:ct,batchingColor:ct&&R._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&R.instanceColor!==null,instancingMorph:Rt&&R.morphTexture!==null,outputColorSpace:J===null?s.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:le.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ft,matcap:ve,envMap:qt,envMapMode:qt&&st.mapping,envMapCubeUVHeight:K,aoMap:Yt,lightMap:ae,bumpMap:kt,normalMap:he,displacementMap:Ie,emissiveMap:Qe,normalMapObjectSpace:he&&y.normalMapType===Ef,normalMapTangentSpace:he&&y.normalMapType===$h,packedNormalMap:he&&y.normalMapType===$h&&Ob(y.normalMap.format),metalnessMap:Ee,roughnessMap:$e,anisotropy:z,anisotropyMap:j,clearcoat:si,clearcoatMap:lt,clearcoatNormalMap:pt,clearcoatRoughnessMap:Q,dispersion:Se,retroreflection:P,iridescence:S,iridescenceMap:nt,iridescenceThicknessMap:gt,sheen:B,sheenColorMap:Nt,sheenRoughnessMap:bt,specularMap:xt,specularColorMap:Dt,specularIntensityMap:Gt,transmission:W,transmissionMap:jt,thicknessMap:U,gradientMap:vt,opaque:y.transparent===!1&&y.blending===gr&&y.alphaToCoverage===!1,alphaMap:et,alphaTest:yt,alphaHash:St,combine:y.combine,mapUv:Ft&&g(y.map.channel),aoMapUv:Yt&&g(y.aoMap.channel),lightMapUv:ae&&g(y.lightMap.channel),bumpMapUv:kt&&g(y.bumpMap.channel),normalMapUv:he&&g(y.normalMap.channel),displacementMapUv:Ie&&g(y.displacementMap.channel),emissiveMapUv:Qe&&g(y.emissiveMap.channel),metalnessMapUv:Ee&&g(y.metalnessMap.channel),roughnessMapUv:$e&&g(y.roughnessMap.channel),anisotropyMapUv:j&&g(y.anisotropyMap.channel),clearcoatMapUv:lt&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:pt&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:bt&&g(y.sheenRoughnessMap.channel),specularMapUv:xt&&g(y.specularMap.channel),specularColorMapUv:Dt&&g(y.specularColorMap.channel),specularIntensityMapUv:Gt&&g(y.specularIntensityMap.channel),transmissionMapUv:jt&&g(y.transmissionMap.channel),thicknessMapUv:U&&g(y.thicknessMap.channel),alphaMapUv:et&&g(y.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(he||z),vertexNormals:!!F.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!F.attributes.uv&&(Ft||et),fog:!!N,useFog:y.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||F.attributes.normal===void 0&&he===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ut,skinning:R.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:mt,morphTextureStride:wt,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:D.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ot,decodeVideoTexture:Ft&&y.map.isVideoTexture===!0&&le.getTransfer(y.map.colorSpace)===_e,decodeVideoTextureEmissive:Qe&&y.emissiveMap.isVideoTexture===!0&&le.getTransfer(y.emissiveMap.colorSpace)===_e,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Bi,flipSided:y.side===ii,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:rt&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&y.extensions.multiDraw===!0||ct)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Pt.vertexUv1s=l.has(1),Pt.vertexUv2s=l.has(2),Pt.vertexUv3s=l.has(3),l.clear(),Pt}function f(y){let E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(let C in y.defines)E.push(C),E.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(m(E,y),v(E,y),E.push(s.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function m(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numSunLights),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numSunLightShadows),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function v(y,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function w(y){let E=p[y.type],C;if(E){let L=xn[E];C=_a.clone(L.uniforms)}else C=y.uniforms;return C}function b(y,E){let C=h.get(E);return C!==void 0?++C.usedTimes:(C=new Nb(s,E,y,n),c.push(C),h.set(E,C)),C}function _(y){if(--y.usedTimes===0){let E=c.indexOf(y);c[E]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function M(y){o.remove(y)}function T(){o.dispose()}return{getParameters:x,getProgramCacheKey:f,getUniforms:w,acquireProgram:b,releaseProgram:_,releaseShaderCache:M,programs:c,dispose:T}}function zb(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:r}}function Fb(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function rp(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function ap(){let s=[],t=0,e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,g,x,f,m){let v=s[t];return v===void 0?(v={id:d.id,object:d,geometry:p,material:g,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:f,group:m},s[t]=v):(v.id=d.id,v.object=d,v.geometry=p,v.material=g,v.materialVariant=a(d),v.groupOrder=x,v.renderOrder=d.renderOrder,v.z=f,v.group=m),t++,v}function l(d,p,g,x,f,m,v){v.reversedDepth===!0&&(f=-f);let w=o(d,p,g,x,f,m);g.transmission>0?i.push(w):g.transparent===!0?n.push(w):e.push(w)}function c(d,p,g,x,f,m){let v=o(d,p,g,x,f,m);g.transmission>0?i.unshift(v):g.transparent===!0?n.unshift(v):e.unshift(v)}function h(d,p){e.length>1&&e.sort(d||Fb),i.length>1&&i.sort(p||rp),n.length>1&&n.sort(p||rp)}function u(){for(let d=t,p=s.length;d<p;d++){let g=s[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:u,sort:h}}function Bb(){let s=new WeakMap;function t(i,n){let r=s.get(i),a;return r===void 0?(a=new ap,s.set(i,[a])):n>=r.length?(a=new ap,r.push(a)):a=r[n],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Hb(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new k,color:new te};break;case"SpotLight":e={position:new k,direction:new k,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new te,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new te,groundColor:new te};break;case"RectAreaLight":e={color:new te,position:new k,halfWidth:new k,halfHeight:new k};break}return s[t.id]=e,e}}}function Gb(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var Vb=0;function Wb(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function $b(s){let t=new Hb,e=Gb(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);let n=new k,r=new oe,a=new oe;function o(c){let h=0,u=0,d=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let p=0,g=0,x=0,f=0,m=0,v=0,w=0,b=0,_=0,M=0,T=0,y=0,E=0,C=0;c.sort(Wb);for(let R=0,D=c.length;R<D;R++){let N=c[R],F=N.color,X=N.intensity,Y=N.distance,st=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===rs?st=N.shadow.map.texture:st=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=F.r*X,u+=F.g*X,d+=F.b*X;else if(N.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(N.sh.coefficients[K],X);C++}else if(N.isSunLight){let K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let tt=N.shadow,q=e.get(N);q.shadowIntensity=tt.intensity,q.shadowBias=tt.bias,q.shadowNormalBias=tt.normalBias,q.shadowRadius=tt.radius,q.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),i.sunShadow[g]=q,i.sunShadowMap[g]=st;let mt=tt.getViewportCount();for(let wt=0;wt<mt;wt++)i.sunShadowMatrix[x+wt]=tt.getMatrix(wt),i.sunShadowCascade[x+wt]=tt._cascadeData[wt];x+=mt,g++}i.sun[p]=K,p++}else if(N.isDirectionalLight){let K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let tt=N.shadow,q=e.get(N);q.shadowIntensity=tt.intensity,q.shadowBias=tt.bias,q.shadowNormalBias=tt.normalBias,q.shadowRadius=tt.radius,q.shadowMapSize=tt.mapSize,i.directionalShadow[f]=q,i.directionalShadowMap[f]=st,i.directionalShadowMatrix[f]=N.shadow.matrix,_++}i.directional[f]=K,f++}else if(N.isSpotLight){let K=t.get(N);K.position.setFromMatrixPosition(N.matrixWorld),K.color.copy(F).multiplyScalar(X),K.distance=Y,K.coneCos=Math.cos(N.angle),K.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),K.decay=N.decay,i.spot[v]=K;let tt=N.shadow;if(N.map&&(i.spotLightMap[y]=N.map,y++,tt.updateMatrices(N),N.castShadow&&E++),i.spotLightMatrix[v]=tt.matrix,N.castShadow){let q=e.get(N);q.shadowIntensity=tt.intensity,q.shadowBias=tt.bias,q.shadowNormalBias=tt.normalBias,q.shadowRadius=tt.radius,q.shadowMapSize=tt.mapSize,i.spotShadow[v]=q,i.spotShadowMap[v]=st,T++}v++}else if(N.isRectAreaLight){let K=t.get(N);K.color.copy(F).multiplyScalar(X),K.halfWidth.set(N.width*.5,0,0),K.halfHeight.set(0,N.height*.5,0),i.rectArea[w]=K,w++}else if(N.isPointLight){let K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),K.distance=N.distance,K.decay=N.decay,N.castShadow){let tt=N.shadow,q=e.get(N);q.shadowIntensity=tt.intensity,q.shadowBias=tt.bias,q.shadowNormalBias=tt.normalBias,q.shadowRadius=tt.radius,q.shadowMapSize=tt.mapSize,q.shadowCameraNear=tt.camera.near,q.shadowCameraFar=tt.camera.far,i.pointShadow[m]=q,i.pointShadowMap[m]=st,i.pointShadowMatrix[m]=N.shadow.matrix,M++}i.point[m]=K,m++}else if(N.isHemisphereLight){let K=t.get(N);K.skyColor.copy(N.color).multiplyScalar(X),K.groundColor.copy(N.groundColor).multiplyScalar(X),i.hemi[b]=K,b++}}w>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=dt.LTC_FLOAT_1,i.rectAreaLTC2=dt.LTC_FLOAT_2):(i.rectAreaLTC1=dt.LTC_HALF_1,i.rectAreaLTC2=dt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let L=i.hash;(L.sunLength!==p||L.directionalLength!==f||L.pointLength!==m||L.spotLength!==v||L.rectAreaLength!==w||L.hemiLength!==b||L.numSunShadows!==g||L.numDirectionalShadows!==_||L.numPointShadows!==M||L.numSpotShadows!==T||L.numSpotMaps!==y||L.numLightProbes!==C)&&(i.sun.length=p,i.directional.length=f,i.spot.length=v,i.rectArea.length=w,i.point.length=m,i.hemi.length=b,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.directionalShadowMatrix.length=_,i.pointShadow.length=M,i.pointShadowMap.length=M,i.pointShadowMatrix.length=M,i.spotShadow.length=T,i.spotShadowMap.length=T,i.spotLightMatrix.length=T+y-E,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,L.sunLength=p,L.directionalLength=f,L.pointLength=m,L.spotLength=v,L.rectAreaLength=w,L.hemiLength=b,L.numSunShadows=g,L.numDirectionalShadows=_,L.numPointShadows=M,L.numSpotShadows=T,L.numSpotMaps=y,L.numLightProbes=C,i.version=Vb++)}function l(c,h){let u=0,d=0,p=0,g=0,x=0,f=0,m=h.matrixWorldInverse;for(let v=0,w=c.length;v<w;v++){let b=c[v];if(b.isSunLight){let _=i.sun[u];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(m),u++}else if(b.isDirectionalLight){let _=i.directional[d];_.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(n),_.direction.transformDirection(m),d++}else if(b.isSpotLight){let _=i.spot[g];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(n),_.direction.transformDirection(m),g++}else if(b.isRectAreaLight){let _=i.rectArea[x];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(b.width*.5,0,0),_.halfHeight.set(0,b.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),x++}else if(b.isPointLight){let _=i.point[p];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),p++}else if(b.isHemisphereLight){let _=i.hemi[f];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(m),f++}}}return{setup:o,setupView:l,state:i}}function op(s){let t=new $b(s),e=[],i=[],n=[];function r(d){u.camera=d,e.length=0,i.length=0,n.length=0}function a(d){e.push(d)}function o(d){i.push(d)}function l(d){n.push(d)}function c(){t.setup(e)}function h(d){t.setupView(e,d)}let u={lightsArray:e,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Xb(s){let t=new WeakMap;function e(n,r=0){let a=t.get(n),o;return a===void 0?(o=new op(s),t.set(n,[o])):r>=a.length?(o=new op(s),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var qb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Kb=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],Zb=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],lp=new oe,Sa=new k,hu=new k;function Jb(s,t,e){let i=new dr,n=new Zt,r=new Zt,a=new Re,o=new Io,l=new Po,c={},h=e.maxTextureSize,u={[pn]:ii,[ii]:pn,[Bi]:Bi},d=new He({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Zt},radius:{value:4}},vertexShader:qb,fragmentShader:Yb}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new Ke;g.setAttribute("position",new ki(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new se(g,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=da;let m=this.type;this.render=function(M,T,y){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||M.length===0)return;this.type===nf&&(Vt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=da);let E=s.getRenderTarget(),C=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),R=s.state;R.setBlending(mn),R.buffers.depth.getReversed()===!0?R.buffers.color.setClear(0,0,0,0):R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);let D=m!==this.type;D&&T.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(F=>F.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,F=M.length;N<F;N++){let X=M[N],Y=X.shadow;if(Y===void 0){Vt("WebGLShadowMap:",X,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;n.copy(Y.mapSize);let st=Y.getFrameExtents();n.multiply(st),r.copy(Y.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/st.x),n.x=r.x*st.x,Y.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/st.y),n.y=r.y*st.y,Y.mapSize.y=r.y));let K=s.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=K,Y.map===null||D===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===mr){if(X.isPointLight){Vt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new ci(n.x,n.y,{format:rs,type:tn,minFilter:Ye,magFilter:Ye,generateMipmaps:!1}),Y.map.texture.name=X.name+".shadowMap",Y.map.depthTexture=new qn(n.x,n.y,wi),Y.map.depthTexture.name=X.name+".shadowMapDepth",Y.map.depthTexture.format=hn,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Ve,Y.map.depthTexture.magFilter=Ve}else X.isPointLight?(Y.map=new Sr(n.x),Y.map.depthTexture=new Ro(n.x,Qi)):(Y.map=new ci(n.x,n.y),Y.map.depthTexture=new qn(n.x,n.y,Qi)),Y.map.depthTexture.name=X.name+".shadowMap",Y.map.depthTexture.format=hn,this.type===da?(Y.map.depthTexture.compareFunction=K?kl:Ll,Y.map.depthTexture.minFilter=Ye,Y.map.depthTexture.magFilter=Ye):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Ve,Y.map.depthTexture.magFilter=Ve);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==n.x||Y.map.height!==n.y)&&Y.map.setSize(n.x,n.y);let tt=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();X.isPointLight!==!0&&Y.updateMatrices(X,y);for(let q=0;q<tt;q++){let mt=Y.getCamera(q);if(X.isPointLight){let wt=Y.camera,ot=Y.matrix,it=X.distance||wt.far;it!==wt.far&&(wt.far=it,wt.updateProjectionMatrix()),Sa.setFromMatrixPosition(X.matrixWorld),wt.position.copy(Sa),hu.copy(wt.position),hu.add(Kb[q]),wt.up.copy(Zb[q]),wt.lookAt(hu),wt.updateMatrixWorld(),ot.makeTranslation(-Sa.x,-Sa.y,-Sa.z),lp.multiplyMatrices(wt.projectionMatrix,wt.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(lp,wt.coordinateSystem,wt.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)s.setRenderTarget(Y.map,q),s.clear();else{q===0&&(s.setRenderTarget(Y.map),s.clear());let wt=Y.getViewport(q);a.set(r.x*wt.x,r.y*wt.y,r.x*wt.z,r.y*wt.w),R.viewport(a)}i=Y.getFrustum(q),b(T,y,mt,X,this.type)}Y.isPointLightShadow!==!0&&this.type===mr&&v(Y,y),Y.needsUpdate=!1}m=this.type,f.needsUpdate=!1,s.setRenderTarget(E,C,L)};function v(M,T){let y=t.update(x);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null?M.mapPass=new ci(n.x,n.y,{format:rs,type:tn}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),d.uniforms.shadow_pass.value=M.map.depthTexture,d.uniforms.resolution.value.set(M.map.width,M.map.height),d.uniforms.radius.value=M.radius,s.setRenderTarget(M.mapPass),s.clear(),s.renderBufferDirect(T,null,y,d,x,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value.set(M.map.width,M.map.height),p.uniforms.radius.value=M.radius,s.setRenderTarget(M.map),s.clear(),s.renderBufferDirect(T,null,y,p,x,null)}function w(M,T,y,E){let C=null,L=y.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(L!==void 0)C=L;else if(C=y.isPointLight===!0?l:o,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let R=C.uuid,D=T.uuid,N=c[R];N===void 0&&(N={},c[R]=N);let F=N[D];F===void 0&&(F=C.clone(),N[D]=F,T.addEventListener("dispose",_)),C=F}if(C.visible=T.visible,C.wireframe=T.wireframe,E===mr?C.side=T.shadowSide!==null?T.shadowSide:T.side:C.side=T.shadowSide!==null?T.shadowSide:u[T.side],C.alphaMap=T.alphaMap,C.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,C.map=T.map,C.clipShadows=T.clipShadows,C.clippingPlanes=T.clippingPlanes,C.clipIntersection=T.clipIntersection,C.displacementMap=T.displacementMap,C.displacementScale=T.displacementScale,C.displacementBias=T.displacementBias,C.wireframeLinewidth=T.wireframeLinewidth,C.linewidth=T.linewidth,y.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let R=s.properties.get(C);R.light=y}return C}function b(M,T,y,E,C){if(M.visible===!1)return;if(M.layers.test(T.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&C===mr)&&(!M.frustumCulled||M.intersectsFrustum(i))){M.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,M.matrixWorld);let D=t.update(M),N=M.material;if(Array.isArray(N)){let F=D.groups;for(let X=0,Y=F.length;X<Y;X++){let st=F[X],K=N[st.materialIndex];if(K&&K.visible){let tt=w(M,K,E,C);M.onBeforeShadow(s,M,T,y,D,tt,st),s.renderBufferDirect(y,null,D,tt,M,st),M.onAfterShadow(s,M,T,y,D,tt,st)}}}else if(N.visible){let F=w(M,N,E,C);M.onBeforeShadow(s,M,T,y,D,F,null),s.renderBufferDirect(y,null,D,F,M,null),M.onAfterShadow(s,M,T,y,D,F,null)}}let R=M.children;for(let D=0,N=R.length;D<N;D++)b(R[D],T,y,E,C)}function _(M){M.target.removeEventListener("dispose",_);for(let y in c){let E=c[y],C=M.target.uuid;C in E&&(E[C].dispose(),delete E[C])}}}function jb(s,t){function e(){let U=!1,vt=new Re,et=null,yt=new Re(0,0,0,0);return{setMask:function(St){et!==St&&!U&&(s.colorMask(St,St,St,St),et=St)},setLocked:function(St){U=St},setClear:function(St,rt,Ot,Pt,Pe){Pe===!0&&(St*=Pt,rt*=Pt,Ot*=Pt),vt.set(St,rt,Ot,Pt),yt.equals(vt)===!1&&(s.clearColor(St,rt,Ot,Pt),yt.copy(vt))},reset:function(){U=!1,et=null,yt.set(-1,0,0,0)}}}function i(){let U=!1,vt=!1,et=null,yt=null,St=null;return{setReversed:function(rt){if(vt!==rt){let Ot=t.get("EXT_clip_control");rt?Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.ZERO_TO_ONE_EXT):Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.NEGATIVE_ONE_TO_ONE_EXT),vt=rt;let Pt=St;St=null,this.setClear(Pt)}},getReversed:function(){return vt},setTest:function(rt){rt?J(s.DEPTH_TEST):ut(s.DEPTH_TEST)},setMask:function(rt){et!==rt&&!U&&(s.depthMask(rt),et=rt)},setFunc:function(rt){if(vt&&(rt=zf[rt]),yt!==rt){switch(rt){case po:s.depthFunc(s.NEVER);break;case mo:s.depthFunc(s.ALWAYS);break;case go:s.depthFunc(s.LESS);break;case sr:s.depthFunc(s.LEQUAL);break;case xo:s.depthFunc(s.EQUAL);break;case vo:s.depthFunc(s.GEQUAL);break;case yo:s.depthFunc(s.GREATER);break;case bo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}yt=rt}},setLocked:function(rt){U=rt},setClear:function(rt){St!==rt&&(St=rt,vt&&(rt=1-rt),s.clearDepth(rt))},reset:function(){U=!1,et=null,yt=null,St=null,vt=!1}}}function n(){let U=!1,vt=null,et=null,yt=null,St=null,rt=null,Ot=null,Pt=null,Pe=null;return{setTest:function(ye){U||(ye?J(s.STENCIL_TEST):ut(s.STENCIL_TEST))},setMask:function(ye){vt!==ye&&!U&&(s.stencilMask(ye),vt=ye)},setFunc:function(ye,Xi,an){(et!==ye||yt!==Xi||St!==an)&&(s.stencilFunc(ye,Xi,an),et=ye,yt=Xi,St=an)},setOp:function(ye,Xi,an){(rt!==ye||Ot!==Xi||Pt!==an)&&(s.stencilOp(ye,Xi,an),rt=ye,Ot=Xi,Pt=an)},setLocked:function(ye){U=ye},setClear:function(ye){Pe!==ye&&(s.clearStencil(ye),Pe=ye)},reset:function(){U=!1,vt=null,et=null,yt=null,St=null,rt=null,Ot=null,Pt=null,Pe=null}}}let r=new e,a=new i,o=new n,l=new WeakMap,c=new WeakMap,h={},u={},d={},p=new WeakMap,g=[],x=null,f=!1,m=null,v=null,w=null,b=null,_=null,M=null,T=null,y=new te(0,0,0),E=0,C=!1,L=null,R=null,D=null,N=null,F=null,X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,st=0,K=s.getParameter(s.VERSION);K.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(K)[1]),Y=st>=1):K.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Y=st>=2);let tt=null,q={},mt=s.getParameter(s.SCISSOR_BOX),wt=s.getParameter(s.VIEWPORT),ot=new Re().fromArray(mt),it=new Re().fromArray(wt);function zt(U,vt,et,yt){let St=new Uint8Array(4),rt=s.createTexture();s.bindTexture(U,rt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ot=0;Ot<et;Ot++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(vt,0,s.RGBA,1,1,yt,0,s.RGBA,s.UNSIGNED_BYTE,St):s.texImage2D(vt+Ot,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,St);return rt}let V={};V[s.TEXTURE_2D]=zt(s.TEXTURE_2D,s.TEXTURE_2D,1),V[s.TEXTURE_CUBE_MAP]=zt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[s.TEXTURE_2D_ARRAY]=zt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),V[s.TEXTURE_3D]=zt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(s.DEPTH_TEST),a.setFunc(sr),kt(!1),he(Sh),J(s.CULL_FACE),Yt(mn);function J(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function ut(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function Rt(U,vt){return d[U]!==vt?(s.bindFramebuffer(U,vt),d[U]=vt,U===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=vt),U===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=vt),!0):!1}function ct(U,vt){let et=g,yt=!1;if(U){et=p.get(vt),et===void 0&&(et=[],p.set(vt,et));let St=U.textures;if(et.length!==St.length||et[0]!==s.COLOR_ATTACHMENT0){for(let rt=0,Ot=St.length;rt<Ot;rt++)et[rt]=s.COLOR_ATTACHMENT0+rt;et.length=St.length,yt=!0}}else et[0]!==s.BACK&&(et[0]=s.BACK,yt=!0);yt&&s.drawBuffers(et)}function Ft(U){return x!==U?(s.useProgram(U),x=U,!0):!1}let ve={[Rs]:s.FUNC_ADD,[rf]:s.FUNC_SUBTRACT,[af]:s.FUNC_REVERSE_SUBTRACT};ve[of]=s.MIN,ve[lf]=s.MAX;let qt={[cf]:s.ZERO,[hf]:s.ONE,[uf]:s.SRC_COLOR,[Rh]:s.SRC_ALPHA,[xf]:s.SRC_ALPHA_SATURATE,[mf]:s.DST_COLOR,[ff]:s.DST_ALPHA,[df]:s.ONE_MINUS_SRC_COLOR,[Ch]:s.ONE_MINUS_SRC_ALPHA,[gf]:s.ONE_MINUS_DST_COLOR,[pf]:s.ONE_MINUS_DST_ALPHA,[vf]:s.CONSTANT_COLOR,[yf]:s.ONE_MINUS_CONSTANT_COLOR,[bf]:s.CONSTANT_ALPHA,[_f]:s.ONE_MINUS_CONSTANT_ALPHA};function Yt(U,vt,et,yt,St,rt,Ot,Pt,Pe,ye){if(U===mn){f===!0&&(ut(s.BLEND),f=!1);return}if(f===!1&&(J(s.BLEND),f=!0),U!==sf){if(U!==m||ye!==C){if((v!==Rs||_!==Rs)&&(s.blendEquation(s.FUNC_ADD),v=Rs,_=Rs),ye)switch(U){case gr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Th:s.blendFunc(s.ONE,s.ONE);break;case Eh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ah:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Xt("WebGLState: Invalid blending: ",U);break}else switch(U){case gr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Th:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Eh:Xt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ah:Xt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xt("WebGLState: Invalid blending: ",U);break}w=null,b=null,M=null,T=null,y.set(0,0,0),E=0,m=U,C=ye}return}St=St||vt,rt=rt||et,Ot=Ot||yt,(vt!==v||St!==_)&&(s.blendEquationSeparate(ve[vt],ve[St]),v=vt,_=St),(et!==w||yt!==b||rt!==M||Ot!==T)&&(s.blendFuncSeparate(qt[et],qt[yt],qt[rt],qt[Ot]),w=et,b=yt,M=rt,T=Ot),(Pt.equals(y)===!1||Pe!==E)&&(s.blendColor(Pt.r,Pt.g,Pt.b,Pe),y.copy(Pt),E=Pe),m=U,C=!1}function ae(U,vt){U.side===Bi?ut(s.CULL_FACE):J(s.CULL_FACE);let et=U.side===ii;vt&&(et=!et),kt(et),U.blending===gr&&U.transparent===!1?Yt(mn):Yt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let yt=U.stencilWrite;o.setTest(yt),yt&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Qe(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?J(s.SAMPLE_ALPHA_TO_COVERAGE):ut(s.SAMPLE_ALPHA_TO_COVERAGE)}function kt(U){L!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),L=U)}function he(U){U!==tf?(J(s.CULL_FACE),U!==R&&(U===Sh?s.cullFace(s.BACK):U===ef?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ut(s.CULL_FACE),R=U}function Ie(U){U!==D&&(Y&&s.lineWidth(U),D=U)}function Qe(U,vt,et){U?(J(s.POLYGON_OFFSET_FILL),(N!==vt||F!==et)&&(N=vt,F=et,a.getReversed()&&(vt=-vt),s.polygonOffset(vt,et))):ut(s.POLYGON_OFFSET_FILL)}function Ee(U){U?J(s.SCISSOR_TEST):ut(s.SCISSOR_TEST)}function $e(U){U===void 0&&(U=s.TEXTURE0+X-1),tt!==U&&(s.activeTexture(U),tt=U)}function z(U,vt,et){et===void 0&&(tt===null?et=s.TEXTURE0+X-1:et=tt);let yt=q[et];yt===void 0&&(yt={type:void 0,texture:void 0},q[et]=yt),(yt.type!==U||yt.texture!==vt)&&(tt!==et&&(s.activeTexture(et),tt=et),s.bindTexture(U,vt||V[U]),yt.type=U,yt.texture=vt)}function si(){let U=q[tt];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Se(){try{s.compressedTexImage2D(...arguments)}catch(U){Xt("WebGLState:",U)}}function P(){try{s.compressedTexImage3D(...arguments)}catch(U){Xt("WebGLState:",U)}}function S(){try{s.texSubImage2D(...arguments)}catch(U){Xt("WebGLState:",U)}}function B(){try{s.texSubImage3D(...arguments)}catch(U){Xt("WebGLState:",U)}}function W(){try{s.compressedTexSubImage2D(...arguments)}catch(U){Xt("WebGLState:",U)}}function j(){try{s.compressedTexSubImage3D(...arguments)}catch(U){Xt("WebGLState:",U)}}function lt(){try{s.texStorage2D(...arguments)}catch(U){Xt("WebGLState:",U)}}function pt(){try{s.texStorage3D(...arguments)}catch(U){Xt("WebGLState:",U)}}function Q(){try{s.texImage2D(...arguments)}catch(U){Xt("WebGLState:",U)}}function nt(){try{s.texImage3D(...arguments)}catch(U){Xt("WebGLState:",U)}}function gt(U){return u[U]!==void 0?u[U]:s.getParameter(U)}function Nt(U,vt){u[U]!==vt&&(s.pixelStorei(U,vt),u[U]=vt)}function bt(U){ot.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),ot.copy(U))}function xt(U){it.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),it.copy(U))}function Dt(U,vt){let et=c.get(vt);et===void 0&&(et=new WeakMap,c.set(vt,et));let yt=et.get(U);yt===void 0&&(yt=s.getUniformBlockIndex(vt,U.name),et.set(U,yt))}function Gt(U,vt){let yt=c.get(vt).get(U);l.get(vt)!==yt&&(s.uniformBlockBinding(vt,yt,U.__bindingPointIndex),l.set(vt,yt))}function jt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},tt=null,q={},d={},p=new WeakMap,g=[],x=null,f=!1,m=null,v=null,w=null,b=null,_=null,M=null,T=null,y=new te(0,0,0),E=0,C=!1,L=null,R=null,D=null,N=null,F=null,ot.set(0,0,s.canvas.width,s.canvas.height),it.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:ut,bindFramebuffer:Rt,drawBuffers:ct,useProgram:Ft,setBlending:Yt,setMaterial:ae,setFlipSided:kt,setCullFace:he,setLineWidth:Ie,setPolygonOffset:Qe,setScissorTest:Ee,activeTexture:$e,bindTexture:z,unbindTexture:si,compressedTexImage2D:Se,compressedTexImage3D:P,texImage2D:Q,texImage3D:nt,pixelStorei:Nt,getParameter:gt,updateUBOMapping:Dt,uniformBlockBinding:Gt,texStorage2D:lt,texStorage3D:pt,texSubImage2D:S,texSubImage3D:B,compressedTexSubImage2D:W,compressedTexSubImage3D:j,scissor:bt,viewport:xt,reset:jt}}function Qb(s,t,e,i,n,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Zt,h=new WeakMap,u=new Set,d,p=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(P,S){return g?new OffscreenCanvas(P,S):jr("canvas")}function f(P,S,B){let W=1,j=Se(P);if((j.width>B||j.height>B)&&(W=B/Math.max(j.width,j.height)),W<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let lt=Math.floor(W*j.width),pt=Math.floor(W*j.height);d===void 0&&(d=x(lt,pt));let Q=S?x(lt,pt):d;return Q.width=lt,Q.height=pt,Q.getContext("2d").drawImage(P,0,0,lt,pt),Vt("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+lt+"x"+pt+")."),Q}else return"data"in P&&Vt("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),P;return P}function m(P){return P.generateMipmaps}function v(P){s.generateMipmap(P)}function w(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(P,S,B,W,j,lt=!1){if(P!==null){if(s[P]!==void 0)return s[P];Vt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let pt;W&&(pt=t.get("EXT_texture_norm16"),pt||Vt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=S;if(S===s.RED&&(B===s.FLOAT&&(Q=s.R32F),B===s.HALF_FLOAT&&(Q=s.R16F),B===s.UNSIGNED_BYTE&&(Q=s.R8),B===s.UNSIGNED_SHORT&&pt&&(Q=pt.R16_EXT),B===s.SHORT&&pt&&(Q=pt.R16_SNORM_EXT)),S===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(Q=s.R8UI),B===s.UNSIGNED_SHORT&&(Q=s.R16UI),B===s.UNSIGNED_INT&&(Q=s.R32UI),B===s.BYTE&&(Q=s.R8I),B===s.SHORT&&(Q=s.R16I),B===s.INT&&(Q=s.R32I)),S===s.RG&&(B===s.FLOAT&&(Q=s.RG32F),B===s.HALF_FLOAT&&(Q=s.RG16F),B===s.UNSIGNED_BYTE&&(Q=s.RG8),B===s.UNSIGNED_SHORT&&pt&&(Q=pt.RG16_EXT),B===s.SHORT&&pt&&(Q=pt.RG16_SNORM_EXT)),S===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(Q=s.RG8UI),B===s.UNSIGNED_SHORT&&(Q=s.RG16UI),B===s.UNSIGNED_INT&&(Q=s.RG32UI),B===s.BYTE&&(Q=s.RG8I),B===s.SHORT&&(Q=s.RG16I),B===s.INT&&(Q=s.RG32I)),S===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),B===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),B===s.UNSIGNED_INT&&(Q=s.RGB32UI),B===s.BYTE&&(Q=s.RGB8I),B===s.SHORT&&(Q=s.RGB16I),B===s.INT&&(Q=s.RGB32I)),S===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),B===s.UNSIGNED_INT&&(Q=s.RGBA32UI),B===s.BYTE&&(Q=s.RGBA8I),B===s.SHORT&&(Q=s.RGBA16I),B===s.INT&&(Q=s.RGBA32I)),S===s.RGB&&(B===s.UNSIGNED_SHORT&&pt&&(Q=pt.RGB16_EXT),B===s.SHORT&&pt&&(Q=pt.RGB16_SNORM_EXT),B===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),B===s.UNSIGNED_INT_10F_11F_11F_REV&&(Q=s.R11F_G11F_B10F)),S===s.RGBA){let nt=lt?Jr:le.getTransfer(j);B===s.FLOAT&&(Q=s.RGBA32F),B===s.HALF_FLOAT&&(Q=s.RGBA16F),B===s.UNSIGNED_BYTE&&(Q=nt===_e?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT&&pt&&(Q=pt.RGBA16_EXT),B===s.SHORT&&pt&&(Q=pt.RGBA16_SNORM_EXT),B===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function _(P,S){let B;return P?S===null||S===Qi||S===vr?B=s.DEPTH24_STENCIL8:S===wi?B=s.DEPTH32F_STENCIL8:S===xr&&(B=s.DEPTH24_STENCIL8,Vt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Qi||S===vr?B=s.DEPTH_COMPONENT24:S===wi?B=s.DEPTH_COMPONENT32F:S===xr&&(B=s.DEPTH_COMPONENT16),B}function M(P,S){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Ve&&P.minFilter!==Ye?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function T(P){let S=P.target;S.removeEventListener("dispose",T),E(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&u.delete(S)}function y(P){let S=P.target;S.removeEventListener("dispose",y),L(S)}function E(P){let S=i.get(P);if(S.__webglInit===void 0)return;let B=P.source,W=p.get(B);if(W){let j=W[S.__cacheKey];j.usedTimes--,j.usedTimes===0&&C(P),Object.keys(W).length===0&&p.delete(B)}i.remove(P)}function C(P){let S=i.get(P);s.deleteTexture(S.__webglTexture);let B=P.source,W=p.get(B);delete W[S.__cacheKey],a.memory.textures--}function L(P){let S=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(S.__webglFramebuffer[W]))for(let j=0;j<S.__webglFramebuffer[W].length;j++)s.deleteFramebuffer(S.__webglFramebuffer[W][j]);else s.deleteFramebuffer(S.__webglFramebuffer[W]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[W])}else{if(Array.isArray(S.__webglFramebuffer))for(let W=0;W<S.__webglFramebuffer.length;W++)s.deleteFramebuffer(S.__webglFramebuffer[W]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let W=0;W<S.__webglColorRenderbuffer.length;W++)S.__webglColorRenderbuffer[W]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[W]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let B=P.textures;for(let W=0,j=B.length;W<j;W++){let lt=i.get(B[W]);lt.__webglTexture&&(s.deleteTexture(lt.__webglTexture),a.memory.textures--),i.remove(B[W])}i.remove(P)}let R=0;function D(){R=0}function N(){return R}function F(P){R=P}function X(){let P=R;return P>=n.maxTextures&&Vt("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+n.maxTextures),R+=1,P}function Y(P){let S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function st(P,S){let B=i.get(P);if(P.isVideoTexture&&z(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&B.__version!==P.version){let W=P.image;if(W===null)Vt("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Vt("WebGLRenderer: Texture marked for update but image is incomplete");else{ut(B,P,S);return}}else P.isExternalTexture&&(B.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+S)}function K(P,S){let B=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&B.__version!==P.version){ut(B,P,S);return}else P.isExternalTexture&&(B.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+S)}function tt(P,S){let B=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&B.__version!==P.version){ut(B,P,S);return}e.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+S)}function q(P,S){let B=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&B.__version!==P.version){Rt(B,P,S);return}e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+S)}let mt={[_o]:s.REPEAT,[cn]:s.CLAMP_TO_EDGE,[Mo]:s.MIRRORED_REPEAT},wt={[Ve]:s.NEAREST,[wf]:s.NEAREST_MIPMAP_NEAREST,[pa]:s.NEAREST_MIPMAP_LINEAR,[Ye]:s.LINEAR,[Yo]:s.LINEAR_MIPMAP_NEAREST,[ns]:s.LINEAR_MIPMAP_LINEAR},ot={[Rf]:s.NEVER,[kf]:s.ALWAYS,[Cf]:s.LESS,[Ll]:s.LEQUAL,[If]:s.EQUAL,[kl]:s.GEQUAL,[Pf]:s.GREATER,[Lf]:s.NOTEQUAL};function it(P,S){if(S.type===wi&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Ye||S.magFilter===Yo||S.magFilter===pa||S.magFilter===ns||S.minFilter===Ye||S.minFilter===Yo||S.minFilter===pa||S.minFilter===ns)&&Vt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,mt[S.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,mt[S.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,mt[S.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,wt[S.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,wt[S.minFilter]),S.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,ot[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ve||S.minFilter!==pa&&S.minFilter!==ns||S.type===wi&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");s.texParameterf(P,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,n.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function zt(P,S){let B=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",T));let W=S.source,j=p.get(W);j===void 0&&(j={},p.set(W,j));let lt=Y(S);if(lt!==P.__cacheKey){j[lt]===void 0&&(j[lt]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,B=!0),j[lt].usedTimes++;let pt=j[P.__cacheKey];pt!==void 0&&(j[P.__cacheKey].usedTimes--,pt.usedTimes===0&&C(S)),P.__cacheKey=lt,P.__webglTexture=j[lt].texture}return B}function V(P,S,B){return Math.floor(Math.floor(P/B)/S)}function J(P,S,B,W){let lt=P.updateRanges;if(lt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,S.width,S.height,B,W,S.data);else{lt.sort((Nt,bt)=>Nt.start-bt.start);let pt=0;for(let Nt=1;Nt<lt.length;Nt++){let bt=lt[pt],xt=lt[Nt],Dt=bt.start+bt.count,Gt=V(xt.start,S.width,4),jt=V(bt.start,S.width,4);xt.start<=Dt+1&&Gt===jt&&V(xt.start+xt.count-1,S.width,4)===Gt?bt.count=Math.max(bt.count,xt.start+xt.count-bt.start):(++pt,lt[pt]=xt)}lt.length=pt+1;let Q=e.getParameter(s.UNPACK_ROW_LENGTH),nt=e.getParameter(s.UNPACK_SKIP_PIXELS),gt=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,S.width);for(let Nt=0,bt=lt.length;Nt<bt;Nt++){let xt=lt[Nt],Dt=Math.floor(xt.start/4),Gt=Math.ceil(xt.count/4),jt=Dt%S.width,U=Math.floor(Dt/S.width),vt=Gt,et=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,jt),e.pixelStorei(s.UNPACK_SKIP_ROWS,U),e.texSubImage2D(s.TEXTURE_2D,0,jt,U,vt,et,B,W,S.data)}P.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,Q),e.pixelStorei(s.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(s.UNPACK_SKIP_ROWS,gt)}}function ut(P,S,B){let W=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(W=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(W=s.TEXTURE_3D);let j=zt(P,S),lt=S.source;e.bindTexture(W,P.__webglTexture,s.TEXTURE0+B);let pt=i.get(lt);if(lt.version!==pt.__version||j===!0){if(e.activeTexture(s.TEXTURE0+B),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let et=le.getPrimaries(le.workingColorSpace),yt=S.colorSpace===Ln?null:le.getPrimaries(S.colorSpace),St=S.colorSpace===Ln||et===yt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,St)}e.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment);let nt=f(S.image,!1,n.maxTextureSize);nt=si(S,nt);let gt=r.convert(S.format,S.colorSpace),Nt=r.convert(S.type),bt=b(S.internalFormat,gt,Nt,S.normalized,S.colorSpace,S.isVideoTexture);it(W,S);let xt,Dt=S.mipmaps,Gt=S.isVideoTexture!==!0,jt=pt.__version===void 0||j===!0,U=lt.dataReady,vt=M(S,nt);if(S.isDepthTexture)bt=_(S.format===ss,S.type),jt&&(Gt?e.texStorage2D(s.TEXTURE_2D,1,bt,nt.width,nt.height):e.texImage2D(s.TEXTURE_2D,0,bt,nt.width,nt.height,0,gt,Nt,null));else if(S.isDataTexture)if(Dt.length>0){Gt&&jt&&e.texStorage2D(s.TEXTURE_2D,vt,bt,Dt[0].width,Dt[0].height);for(let et=0,yt=Dt.length;et<yt;et++)xt=Dt[et],Gt?U&&e.texSubImage2D(s.TEXTURE_2D,et,0,0,xt.width,xt.height,gt,Nt,xt.data):e.texImage2D(s.TEXTURE_2D,et,bt,xt.width,xt.height,0,gt,Nt,xt.data);S.generateMipmaps=!1}else Gt?(jt&&e.texStorage2D(s.TEXTURE_2D,vt,bt,nt.width,nt.height),U&&J(S,nt,gt,Nt)):e.texImage2D(s.TEXTURE_2D,0,bt,nt.width,nt.height,0,gt,Nt,nt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Gt&&jt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,vt,bt,Dt[0].width,Dt[0].height,nt.depth);for(let et=0,yt=Dt.length;et<yt;et++)if(xt=Dt[et],S.format!==Ti)if(gt!==null)if(Gt){if(U)if(S.layerUpdates.size>0){let St=Qh(xt.width,xt.height,S.format,S.type);for(let rt of S.layerUpdates){let Ot=xt.data.subarray(rt*St/xt.data.BYTES_PER_ELEMENT,(rt+1)*St/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,et,0,0,rt,xt.width,xt.height,1,gt,Ot)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,et,0,0,0,xt.width,xt.height,nt.depth,gt,xt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,et,bt,xt.width,xt.height,nt.depth,0,xt.data,0,0);else Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?U&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,et,0,0,0,xt.width,xt.height,nt.depth,gt,Nt,xt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,et,bt,xt.width,xt.height,nt.depth,0,gt,Nt,xt.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{Gt&&jt&&e.texStorage2D(s.TEXTURE_2D,vt,bt,Dt[0].width,Dt[0].height);for(let et=0,yt=Dt.length;et<yt;et++)xt=Dt[et],S.format!==Ti?gt!==null?Gt?U&&e.compressedTexSubImage2D(s.TEXTURE_2D,et,0,0,xt.width,xt.height,gt,xt.data):e.compressedTexImage2D(s.TEXTURE_2D,et,bt,xt.width,xt.height,0,xt.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?U&&e.texSubImage2D(s.TEXTURE_2D,et,0,0,xt.width,xt.height,gt,Nt,xt.data):e.texImage2D(s.TEXTURE_2D,et,bt,xt.width,xt.height,0,gt,Nt,xt.data)}else if(S.isDataArrayTexture)if(Gt){if(jt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,vt,bt,nt.width,nt.height,nt.depth),U)if(S.layerUpdates.size>0){let et=Qh(nt.width,nt.height,S.format,S.type);for(let yt of S.layerUpdates){let St=nt.data.subarray(yt*et/nt.data.BYTES_PER_ELEMENT,(yt+1)*et/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,yt,nt.width,nt.height,1,gt,Nt,St)}S.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,gt,Nt,nt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,bt,nt.width,nt.height,nt.depth,0,gt,Nt,nt.data);else if(S.isData3DTexture)Gt?(jt&&e.texStorage3D(s.TEXTURE_3D,vt,bt,nt.width,nt.height,nt.depth),U&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,gt,Nt,nt.data)):e.texImage3D(s.TEXTURE_3D,0,bt,nt.width,nt.height,nt.depth,0,gt,Nt,nt.data);else if(S.isFramebufferTexture){if(jt)if(Gt)e.texStorage2D(s.TEXTURE_2D,vt,bt,nt.width,nt.height);else{let et=nt.width,yt=nt.height;for(let St=0;St<vt;St++)e.texImage2D(s.TEXTURE_2D,St,bt,et,yt,0,gt,Nt,null),et>>=1,yt>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in s){let et=s.canvas;if(et.hasAttribute("layoutsubtree")||et.setAttribute("layoutsubtree","true"),nt.parentNode!==et){et.appendChild(nt),u.add(S),et.onpaint=yt=>{let St=yt.changedElements;for(let rt of u)St.includes(rt.image)&&(rt.needsUpdate=!0)},et.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,nt);else{let St=s.RGBA,rt=s.RGBA,Ot=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,St,rt,Ot,nt)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Dt.length>0){if(Gt&&jt){let et=Se(Dt[0]);e.texStorage2D(s.TEXTURE_2D,vt,bt,et.width,et.height)}for(let et=0,yt=Dt.length;et<yt;et++)xt=Dt[et],Gt?U&&e.texSubImage2D(s.TEXTURE_2D,et,0,0,gt,Nt,xt):e.texImage2D(s.TEXTURE_2D,et,bt,gt,Nt,xt);S.generateMipmaps=!1}else if(Gt){if(jt){let et=Se(nt);e.texStorage2D(s.TEXTURE_2D,vt,bt,et.width,et.height)}U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,gt,Nt,nt)}else e.texImage2D(s.TEXTURE_2D,0,bt,gt,Nt,nt);m(S)&&v(W),pt.__version=lt.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function Rt(P,S,B){if(S.image.length!==6)return;let W=zt(P,S),j=S.source;e.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+B);let lt=i.get(j);if(j.version!==lt.__version||W===!0){e.activeTexture(s.TEXTURE0+B);let pt=le.getPrimaries(le.workingColorSpace),Q=S.colorSpace===Ln?null:le.getPrimaries(S.colorSpace),nt=S.colorSpace===Ln||pt===Q?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let gt=S.isCompressedTexture||S.image[0].isCompressedTexture,Nt=S.image[0]&&S.image[0].isDataTexture,bt=[];for(let rt=0;rt<6;rt++)!gt&&!Nt?bt[rt]=f(S.image[rt],!0,n.maxCubemapSize):bt[rt]=Nt?S.image[rt].image:S.image[rt],bt[rt]=si(S,bt[rt]);let xt=bt[0],Dt=r.convert(S.format,S.colorSpace),Gt=r.convert(S.type),jt=b(S.internalFormat,Dt,Gt,S.normalized,S.colorSpace),U=S.isVideoTexture!==!0,vt=lt.__version===void 0||W===!0,et=j.dataReady,yt=M(S,xt);it(s.TEXTURE_CUBE_MAP,S);let St;if(gt){U&&vt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,yt,jt,xt.width,xt.height);for(let rt=0;rt<6;rt++){St=bt[rt].mipmaps;for(let Ot=0;Ot<St.length;Ot++){let Pt=St[Ot];S.format!==Ti?Dt!==null?U?et&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot,0,0,Pt.width,Pt.height,Dt,Pt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot,jt,Pt.width,Pt.height,0,Pt.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot,0,0,Pt.width,Pt.height,Dt,Gt,Pt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot,jt,Pt.width,Pt.height,0,Dt,Gt,Pt.data)}}}else{if(St=S.mipmaps,U&&vt){St.length>0&&yt++;let rt=Se(bt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,yt,jt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(Nt){U?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,bt[rt].width,bt[rt].height,Dt,Gt,bt[rt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,jt,bt[rt].width,bt[rt].height,0,Dt,Gt,bt[rt].data);for(let Ot=0;Ot<St.length;Ot++){let Pe=St[Ot].image[rt].image;U?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot+1,0,0,Pe.width,Pe.height,Dt,Gt,Pe.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot+1,jt,Pe.width,Pe.height,0,Dt,Gt,Pe.data)}}else{U?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Dt,Gt,bt[rt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,jt,Dt,Gt,bt[rt]);for(let Ot=0;Ot<St.length;Ot++){let Pt=St[Ot];U?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot+1,0,0,Dt,Gt,Pt.image[rt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot+1,jt,Dt,Gt,Pt.image[rt])}}}m(S)&&v(s.TEXTURE_CUBE_MAP),lt.__version=j.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function ct(P,S,B,W,j,lt){let pt=r.convert(B.format,B.colorSpace),Q=r.convert(B.type),nt=b(B.internalFormat,pt,Q,B.normalized,B.colorSpace),gt=i.get(S),Nt=i.get(B);if(Nt.__renderTarget=S,!gt.__hasExternalTextures){let bt=Math.max(1,S.width>>lt),xt=Math.max(1,S.height>>lt);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?e.texImage3D(j,lt,nt,bt,xt,S.depth,0,pt,Q,null):e.texImage2D(j,lt,nt,bt,xt,0,pt,Q,null)}e.bindFramebuffer(s.FRAMEBUFFER,P),$e(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,W,j,Nt.__webglTexture,0,Ee(S)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,W,j,Nt.__webglTexture,lt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ft(P,S,B){if(s.bindRenderbuffer(s.RENDERBUFFER,P),S.depthBuffer){let W=S.depthTexture,j=W&&W.isDepthTexture?W.type:null,lt=_(S.stencilBuffer,j),pt=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;$e(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ee(S),lt,S.width,S.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ee(S),lt,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,lt,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,pt,s.RENDERBUFFER,P)}else{let W=S.textures;for(let j=0;j<W.length;j++){let lt=W[j],pt=r.convert(lt.format,lt.colorSpace),Q=r.convert(lt.type),nt=b(lt.internalFormat,pt,Q,lt.normalized,lt.colorSpace);$e(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ee(S),nt,S.width,S.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ee(S),nt,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,nt,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ve(P,S,B){let W=S.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let j=i.get(S.depthTexture);if(j.__renderTarget=S,(!j.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),W){if(j.__webglInit===void 0&&(j.__webglInit=!0,S.depthTexture.addEventListener("dispose",T)),j.__webglTexture===void 0){j.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture),it(s.TEXTURE_CUBE_MAP,S.depthTexture);let gt=r.convert(S.depthTexture.format),Nt=r.convert(S.depthTexture.type),bt;S.depthTexture.format===hn?bt=s.DEPTH_COMPONENT24:S.depthTexture.format===ss&&(bt=s.DEPTH24_STENCIL8);for(let xt=0;xt<6;xt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,bt,S.width,S.height,0,gt,Nt,null)}}else st(S.depthTexture,0);let lt=j.__webglTexture,pt=Ee(S),Q=W?s.TEXTURE_CUBE_MAP_POSITIVE_X+B:s.TEXTURE_2D,nt=S.depthTexture.format===ss?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(S.depthTexture.format===hn)$e(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,nt,Q,lt,0,pt):s.framebufferTexture2D(s.FRAMEBUFFER,nt,Q,lt,0);else if(S.depthTexture.format===ss)$e(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,nt,Q,lt,0,pt):s.framebufferTexture2D(s.FRAMEBUFFER,nt,Q,lt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function qt(P){let S=i.get(P),B=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){let W=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),W){let j=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,W.removeEventListener("dispose",j)};W.addEventListener("dispose",j),S.__depthDisposeCallback=j}S.__boundDepthTexture=W}if(P.depthTexture&&!S.__autoAllocateDepthBuffer)if(B)for(let W=0;W<6;W++)ve(S.__webglFramebuffer[W],P,W);else{let W=P.texture.mipmaps;W&&W.length>0?ve(S.__webglFramebuffer[0],P,0):ve(S.__webglFramebuffer,P,0)}else if(B){S.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[W]),S.__webglDepthbuffer[W]===void 0)S.__webglDepthbuffer[W]=s.createRenderbuffer(),Ft(S.__webglDepthbuffer[W],P,!1);else{let j=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,lt=S.__webglDepthbuffer[W];s.bindRenderbuffer(s.RENDERBUFFER,lt),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,lt)}}else{let W=P.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),Ft(S.__webglDepthbuffer,P,!1);else{let j=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,lt=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,lt),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,lt)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Yt(P,S,B){let W=i.get(P);S!==void 0&&ct(W.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&qt(P)}function ae(P){let S=P.texture,B=i.get(P),W=i.get(S);P.addEventListener("dispose",y);let j=P.textures,lt=P.isWebGLCubeRenderTarget===!0,pt=j.length>1;if(pt||(W.__webglTexture===void 0&&(W.__webglTexture=s.createTexture()),W.__version=S.version,a.memory.textures++),lt){B.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[Q]=[];for(let nt=0;nt<S.mipmaps.length;nt++)B.__webglFramebuffer[Q][nt]=s.createFramebuffer()}else B.__webglFramebuffer[Q]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let Q=0;Q<S.mipmaps.length;Q++)B.__webglFramebuffer[Q]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(pt)for(let Q=0,nt=j.length;Q<nt;Q++){let gt=i.get(j[Q]);gt.__webglTexture===void 0&&(gt.__webglTexture=s.createTexture(),a.memory.textures++)}if(P.samples>0&&$e(P)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Q=0;Q<j.length;Q++){let nt=j[Q];B.__webglColorRenderbuffer[Q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[Q]);let gt=r.convert(nt.format,nt.colorSpace),Nt=r.convert(nt.type),bt=b(nt.internalFormat,gt,Nt,nt.normalized,nt.colorSpace,P.isXRRenderTarget===!0),xt=Ee(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,xt,bt,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Q,s.RENDERBUFFER,B.__webglColorRenderbuffer[Q])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),Ft(B.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(lt){e.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture),it(s.TEXTURE_CUBE_MAP,S);for(let Q=0;Q<6;Q++)if(S.mipmaps&&S.mipmaps.length>0)for(let nt=0;nt<S.mipmaps.length;nt++)ct(B.__webglFramebuffer[Q][nt],P,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,nt);else ct(B.__webglFramebuffer[Q],P,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);m(S)&&v(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let Q=0,nt=j.length;Q<nt;Q++){let gt=j[Q],Nt=i.get(gt),bt=s.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(bt=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(bt,Nt.__webglTexture),it(bt,gt),ct(B.__webglFramebuffer,P,gt,s.COLOR_ATTACHMENT0+Q,bt,0),m(gt)&&v(bt)}e.unbindTexture()}else{let Q=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Q=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Q,W.__webglTexture),it(Q,S),S.mipmaps&&S.mipmaps.length>0)for(let nt=0;nt<S.mipmaps.length;nt++)ct(B.__webglFramebuffer[nt],P,S,s.COLOR_ATTACHMENT0,Q,nt);else ct(B.__webglFramebuffer,P,S,s.COLOR_ATTACHMENT0,Q,0);m(S)&&v(Q),e.unbindTexture()}P.depthBuffer&&qt(P)}function kt(P){let S=P.textures;for(let B=0,W=S.length;B<W;B++){let j=S[B];if(m(j)){let lt=w(P),pt=i.get(j).__webglTexture;e.bindTexture(lt,pt),v(lt),e.unbindTexture()}}}let he=[],Ie=[];function Qe(P){if(P.samples>0){if($e(P)===!1){let S=P.textures,B=P.width,W=P.height,j=s.COLOR_BUFFER_BIT,lt=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pt=i.get(P),Q=S.length>1;if(Q)for(let gt=0;gt<S.length;gt++)e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer);let nt=P.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,pt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let gt=0;gt<S.length;gt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),Q){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,pt.__webglColorRenderbuffer[gt]);let Nt=i.get(S[gt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Nt,0)}s.blitFramebuffer(0,0,B,W,0,0,B,W,j,s.NEAREST),l===!0&&(he.length=0,Ie.length=0,he.push(s.COLOR_ATTACHMENT0+gt),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(he.push(lt),Ie.push(lt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ie)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,he))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Q)for(let gt=0;gt<S.length;gt++){e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.RENDERBUFFER,pt.__webglColorRenderbuffer[gt]);let Nt=i.get(S[gt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.TEXTURE_2D,Nt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let S=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function Ee(P){return Math.min(n.maxSamples,P.samples)}function $e(P){let S=i.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function z(P){let S=a.render.frame;h.get(P)!==S&&(h.set(P,S),P.update())}function si(P,S){let B=P.colorSpace,W=P.format,j=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||B!==Ss&&B!==Ln&&(le.getTransfer(B)===_e?(W!==Ti||j!==Si)&&Vt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xt("WebGLTextures: Unsupported texture color space:",B)),S}function Se(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=D,this.getTextureUnits=N,this.setTextureUnits=F,this.setTexture2D=st,this.setTexture2DArray=K,this.setTexture3D=tt,this.setTextureCube=q,this.rebindTextures=Yt,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=qt,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=$e,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function t1(s,t){function e(i,n=Ln){let r,a=le.getTransfer(n);if(i===Si)return s.UNSIGNED_BYTE;if(i===Zo)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Jo)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Hh)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===Gh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===Fh)return s.BYTE;if(i===Bh)return s.SHORT;if(i===xr)return s.UNSIGNED_SHORT;if(i===Ko)return s.INT;if(i===Qi)return s.UNSIGNED_INT;if(i===wi)return s.FLOAT;if(i===tn)return s.HALF_FLOAT;if(i===Vh)return s.ALPHA;if(i===Wh)return s.RGB;if(i===Ti)return s.RGBA;if(i===hn)return s.DEPTH_COMPONENT;if(i===ss)return s.DEPTH_STENCIL;if(i===jo)return s.RED;if(i===Qo)return s.RED_INTEGER;if(i===rs)return s.RG;if(i===tl)return s.RG_INTEGER;if(i===el)return s.RGBA_INTEGER;if(i===ma||i===ga||i===xa||i===va)if(a===_e)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ma)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ma)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ga)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===xa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===va)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===il||i===nl||i===sl||i===rl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===il)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===nl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===sl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===rl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===al||i===ol||i===ll||i===cl||i===hl||i===ya||i===ul)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===al||i===ol)return a===_e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ll)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===cl)return r.COMPRESSED_R11_EAC;if(i===hl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ya)return r.COMPRESSED_RG11_EAC;if(i===ul)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===dl||i===fl||i===pl||i===ml||i===gl||i===xl||i===vl||i===yl||i===bl||i===_l||i===Ml||i===Sl||i===wl||i===Tl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===dl)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fl)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pl)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ml)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===gl)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xl)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vl)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===yl)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===bl)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===_l)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ml)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Sl)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===wl)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Tl)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===El||i===Al||i===Rl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===El)return a===_e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Al)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Rl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Cl||i===Il||i===ba||i===Pl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Cl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Il)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ba)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Pl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===vr?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}var e1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,i1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,vu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new ra(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new He({vertexShader:e1,fragmentShader:i1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new se(new Ni(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},yu=class extends un{constructor(t,e){super();let i=this,n=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null,x=typeof XRWebGLBinding<"u",f=new vu,m={},v=e.getContextAttributes(),w=null,b=null,_=[],M=[],T=new Zt,y=null,E=null,C=new li;C.viewport=new Re;let L=new li;L.viewport=new Re;let R=[C,L],D=new Wo,N=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let J=_[V];return J===void 0&&(J=new cr,_[V]=J),J.getTargetRaySpace()},this.getControllerGrip=function(V){let J=_[V];return J===void 0&&(J=new cr,_[V]=J),J.getGripSpace()},this.getHand=function(V){let J=_[V];return J===void 0&&(J=new cr,_[V]=J),J.getHandSpace()};function X(V){let J=M.indexOf(V.inputSource);if(J===-1)return;let ut=_[J];ut!==void 0&&(ut.update(V.inputSource,V.frame,c||a),ut.dispatchEvent({type:V.type,data:V.inputSource}))}function Y(){n.removeEventListener("select",X),n.removeEventListener("selectstart",X),n.removeEventListener("selectend",X),n.removeEventListener("squeeze",X),n.removeEventListener("squeezestart",X),n.removeEventListener("squeezeend",X),n.removeEventListener("end",Y),n.removeEventListener("inputsourceschange",st);for(let V=0;V<_.length;V++){let J=M[V];J!==null&&(M[V]=null,_[V].disconnect(J))}N=null,F=null,f.reset();for(let V in m)delete m[V];if(t.setRenderTarget(w),p=null,d=null,u=null,n=null,b=null,zt.stop(),i.isPresenting=!1,t.setPixelRatio(y),t.setSize(T.width,T.height,!1),E!==null){let V=E.camera;V.fov=E.fov,V.zoom=E.zoom,V.updateProjectionMatrix(),E=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,i.isPresenting===!0&&Vt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,i.isPresenting===!0&&Vt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(n,e)),u},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(V){if(n=V,n!==null){if(w=t.getRenderTarget(),n.addEventListener("select",X),n.addEventListener("selectstart",X),n.addEventListener("selectend",X),n.addEventListener("squeeze",X),n.addEventListener("squeezestart",X),n.addEventListener("squeezeend",X),n.addEventListener("end",Y),n.addEventListener("inputsourceschange",st),v.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(T),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ut=null,Rt=null,ct=null;v.depth&&(ct=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ut=v.stencil?ss:hn,Rt=v.stencil?vr:Qi);let Ft={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ft),n.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new ci(d.textureWidth,d.textureHeight,{format:Ti,type:Si,depthTexture:new qn(d.textureWidth,d.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,ut),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ut={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(n,e,ut),n.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new ci(p.framebufferWidth,p.framebufferHeight,{format:Ti,type:Si,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),zt.setContext(n),zt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function st(V){for(let J=0;J<V.removed.length;J++){let ut=V.removed[J],Rt=M.indexOf(ut);Rt>=0&&(M[Rt]=null,_[Rt].disconnect(ut))}for(let J=0;J<V.added.length;J++){let ut=V.added[J],Rt=M.indexOf(ut);if(Rt===-1){for(let Ft=0;Ft<_.length;Ft++)if(Ft>=M.length){M.push(ut),Rt=Ft;break}else if(M[Ft]===null){M[Ft]=ut,Rt=Ft;break}if(Rt===-1)break}let ct=_[Rt];ct&&ct.connect(ut)}}let K=new k,tt=new k;function q(V,J,ut){K.setFromMatrixPosition(J.matrixWorld),tt.setFromMatrixPosition(ut.matrixWorld);let Rt=K.distanceTo(tt),ct=J.projectionMatrix.elements,Ft=ut.projectionMatrix.elements,ve=ct[14]/(ct[10]-1),qt=ct[14]/(ct[10]+1),Yt=(ct[9]+1)/ct[5],ae=(ct[9]-1)/ct[5],kt=(ct[8]-1)/ct[0],he=(Ft[8]+1)/Ft[0],Ie=ve*kt,Qe=ve*he,Ee=Rt/(-kt+he),$e=Ee*-kt;if(J.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX($e),V.translateZ(Ee),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),ct[10]===-1)V.projectionMatrix.copy(J.projectionMatrix),V.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let z=ve+Ee,si=qt+Ee,Se=Ie-$e,P=Qe+(Rt-$e),S=Yt*qt/si*z,B=ae*qt/si*z;V.projectionMatrix.makePerspective(Se,P,S,B,z,si),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function mt(V,J){J===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(J.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(n===null)return;let J=V.near,ut=V.far;f.texture!==null&&(f.depthNear>0&&(J=f.depthNear),f.depthFar>0&&(ut=f.depthFar)),D.near=L.near=C.near=J,D.far=L.far=C.far=ut,(N!==D.near||F!==D.far)&&(n.updateRenderState({depthNear:D.near,depthFar:D.far}),N=D.near,F=D.far),D.layers.mask=V.layers.mask|6,C.layers.mask=D.layers.mask&-5,L.layers.mask=D.layers.mask&-3;let Rt=V.parent,ct=D.cameras;mt(D,Rt);for(let Ft=0;Ft<ct.length;Ft++)mt(ct[Ft],Rt);ct.length===2?q(D,C,L):D.projectionMatrix.copy(C.projectionMatrix),E===null&&V.isPerspectiveCamera&&(E={camera:V,fov:V.fov,zoom:V.zoom}),wt(V,D,Rt)};function wt(V,J,ut){ut===null?V.matrix.copy(J.matrixWorld):(V.matrix.copy(ut.matrixWorld),V.matrix.invert(),V.matrix.multiply(J.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(J.projectionMatrix),V.projectionMatrixInverse.copy(J.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=or*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(V){l=V,d!==null&&(d.fixedFoveation=V),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=V)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(D)},this.getCameraTexture=function(V){return m[V]};let ot=null;function it(V,J){if(h=J.getViewerPose(c||a),g=J,h!==null){let ut=h.views;p!==null&&(t.setRenderTargetFramebuffer(b,p.framebuffer),t.setRenderTarget(b));let Rt=!1;ut.length!==D.cameras.length&&(D.cameras.length=0,Rt=!0);for(let qt=0;qt<ut.length;qt++){let Yt=ut[qt],ae=null;if(p!==null)ae=p.getViewport(Yt);else{let he=u.getViewSubImage(d,Yt);ae=he.viewport,qt===0&&(t.setRenderTargetTextures(b,he.colorTexture,he.depthStencilTexture),t.setRenderTarget(b))}let kt=R[qt];kt===void 0&&(kt=new li,kt.layers.enable(qt),kt.viewport=new Re,R[qt]=kt),kt.matrix.fromArray(Yt.transform.matrix),kt.matrix.decompose(kt.position,kt.quaternion,kt.scale),kt.projectionMatrix.fromArray(Yt.projectionMatrix),kt.projectionMatrixInverse.copy(kt.projectionMatrix).invert(),kt.viewport.set(ae.x,ae.y,ae.width,ae.height),qt===0&&(D.matrix.copy(kt.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Rt===!0&&D.cameras.push(kt)}let ct=n.enabledFeatures;if(ct&&ct.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){u=i.getBinding();let qt=u.getDepthInformation(ut[0]);qt&&qt.isValid&&qt.texture&&f.init(qt,n.renderState)}if(ct&&ct.includes("camera-access")&&x){t.state.unbindTexture(),u=i.getBinding();for(let qt=0;qt<ut.length;qt++){let Yt=ut[qt].camera;if(Yt){let ae=m[Yt];ae||(ae=new ra,m[Yt]=ae);let kt=u.getCameraImage(Yt);ae.sourceTexture=kt}}}}for(let ut=0;ut<_.length;ut++){let Rt=M[ut],ct=_[ut];Rt!==null&&ct!==void 0&&ct.update(Rt,J,c||a)}ot&&ot(V,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),g=null}let zt=new cp;zt.setAnimationLoop(it),this.setAnimationLoop=function(V){ot=V},this.dispose=function(){}}},n1=new oe,mp=new $t;mp.set(-1,0,0,0,1,0,0,0,1);function s1(s,t){function e(f,m){f.matrixAutoUpdate===!0&&f.updateMatrix(),m.value.copy(f.matrix)}function i(f,m){m.color.getRGB(f.fogColor.value,Zh(s)),m.isFog?(f.fogNear.value=m.near,f.fogFar.value=m.far):m.isFogExp2&&(f.fogDensity.value=m.density)}function n(f,m,v,w,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(f,m):m.isMeshLambertMaterial?(r(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(f,m),u(f,m)):m.isMeshPhongMaterial?(r(f,m),h(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(f,m),d(f,m),m.isMeshPhysicalMaterial&&p(f,m,b)):m.isMeshMatcapMaterial?(r(f,m),g(f,m)):m.isMeshDepthMaterial?r(f,m):m.isMeshDistanceMaterial?(r(f,m),x(f,m)):m.isMeshNormalMaterial?r(f,m):m.isLineBasicMaterial?(a(f,m),m.isLineDashedMaterial&&o(f,m)):m.isPointsMaterial?l(f,m,v,w):m.isSpriteMaterial?c(f,m):m.isShadowMaterial?(f.color.value.copy(m.color),f.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(f,m){f.opacity.value=m.opacity,m.color&&f.diffuse.value.copy(m.color),m.emissive&&f.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(f.map.value=m.map,e(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,e(m.alphaMap,f.alphaMapTransform)),m.bumpMap&&(f.bumpMap.value=m.bumpMap,e(m.bumpMap,f.bumpMapTransform),f.bumpScale.value=m.bumpScale,m.side===ii&&(f.bumpScale.value*=-1)),m.normalMap&&(f.normalMap.value=m.normalMap,e(m.normalMap,f.normalMapTransform),f.normalScale.value.copy(m.normalScale),m.side===ii&&f.normalScale.value.negate()),m.displacementMap&&(f.displacementMap.value=m.displacementMap,e(m.displacementMap,f.displacementMapTransform),f.displacementScale.value=m.displacementScale,f.displacementBias.value=m.displacementBias),m.emissiveMap&&(f.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,f.emissiveMapTransform)),m.specularMap&&(f.specularMap.value=m.specularMap,e(m.specularMap,f.specularMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest);let v=t.get(m),w=v.envMap,b=v.envMapRotation;w&&(f.envMap.value=w,f.envMapRotation.value.setFromMatrix4(n1.makeRotationFromEuler(b)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(mp),f.reflectivity.value=m.reflectivity,f.ior.value=m.ior,f.refractionRatio.value=m.refractionRatio),m.lightMap&&(f.lightMap.value=m.lightMap,f.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,f.lightMapTransform)),m.aoMap&&(f.aoMap.value=m.aoMap,f.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,f.aoMapTransform))}function a(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,m.map&&(f.map.value=m.map,e(m.map,f.mapTransform))}function o(f,m){f.dashSize.value=m.dashSize,f.totalSize.value=m.dashSize+m.gapSize,f.scale.value=m.scale}function l(f,m,v,w){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.size.value=m.size*v,f.scale.value=w*.5,m.map&&(f.map.value=m.map,e(m.map,f.uvTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,e(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function c(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.rotation.value=m.rotation,m.map&&(f.map.value=m.map,e(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,e(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function h(f,m){f.specular.value.copy(m.specular),f.shininess.value=Math.max(m.shininess,1e-4)}function u(f,m){m.gradientMap&&(f.gradientMap.value=m.gradientMap)}function d(f,m){f.metalness.value=m.metalness,m.metalnessMap&&(f.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,f.metalnessMapTransform)),f.roughness.value=m.roughness,m.roughnessMap&&(f.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,f.roughnessMapTransform)),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)}function p(f,m,v){f.ior.value=m.ior,m.sheen>0&&(f.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),f.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(f.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,f.sheenColorMapTransform)),m.sheenRoughnessMap&&(f.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,f.sheenRoughnessMapTransform))),m.clearcoat>0&&(f.clearcoat.value=m.clearcoat,f.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(f.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,f.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(f.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===ii&&f.clearcoatNormalScale.value.negate())),m.dispersion>0&&(f.dispersion.value=m.dispersion),m.retroreflectivity>0&&(f.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(f.iridescence.value=m.iridescence,f.iridescenceIOR.value=m.iridescenceIOR,f.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(f.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,f.iridescenceMapTransform)),m.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),m.transmission>0&&(f.transmission.value=m.transmission,f.transmissionSamplerMap.value=v.texture,f.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(f.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,f.transmissionMapTransform)),f.thickness.value=m.thickness,m.thicknessMap&&(f.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=m.attenuationDistance,f.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(f.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(f.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=m.specularIntensity,f.specularColor.value.copy(m.specularColor),m.specularColorMap&&(f.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,f.specularColorMapTransform)),m.specularIntensityMap&&(f.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,m){m.matcap&&(f.matcap.value=m.matcap)}function x(f,m){let v=t.get(m).light;f.referencePosition.value.setFromMatrixPosition(v.matrixWorld),f.nearDistance.value=v.shadow.camera.near,f.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function r1(s,t,e,i){let n={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,_){let M=_.program;i.uniformBlockBinding(b,M)}function c(b,_){let M=n[b.id];M===void 0&&(f(b),M=h(b),n[b.id]=M,b.addEventListener("dispose",v));let T=_.program;i.updateUBOMapping(b,T);let y=t.render.frame;r[b.id]!==y&&(d(b),r[b.id]=y)}function h(b){let _=u();b.__bindingPointIndex=_;let M=s.createBuffer(),T=b.__size,y=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,T,y),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,M),M}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Xt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){let _=n[b.id],M=b.uniforms,T=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let y=0,E=M.length;y<E;y++){let C=M[y];if(Array.isArray(C))for(let L=0,R=C.length;L<R;L++)p(C[L],y,L,T);else p(C,y,0,T)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(b,_,M,T){if(x(b,_,M,T)===!0){let y=b.__offset,E=b.value;if(Array.isArray(E)){let C=0;for(let L=0;L<E.length;L++){let R=E[L],D=m(R);g(R,b.__data,C),typeof R!="number"&&typeof R!="boolean"&&!R.isMatrix3&&!ArrayBuffer.isView(R)&&(C+=D.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,b.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,y,b.__data)}}function g(b,_,M){typeof b=="number"||typeof b=="boolean"?_[0]=b:b.isMatrix3?(_[0]=b.elements[0],_[1]=b.elements[1],_[2]=b.elements[2],_[3]=0,_[4]=b.elements[3],_[5]=b.elements[4],_[6]=b.elements[5],_[7]=0,_[8]=b.elements[6],_[9]=b.elements[7],_[10]=b.elements[8],_[11]=0):ArrayBuffer.isView(b)?_.set(new b.constructor(b.buffer,b.byteOffset,_.length)):b.toArray(_,M)}function x(b,_,M,T){let y=b.value,E=_+"_"+M;if(T[E]===void 0)return typeof y=="number"||typeof y=="boolean"?T[E]=y:ArrayBuffer.isView(y)?T[E]=y.slice():T[E]=y.clone(),!0;{let C=T[E];if(typeof y=="number"||typeof y=="boolean"){if(C!==y)return T[E]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(C.equals(y)===!1)return C.copy(y),!0}}return!1}function f(b){let _=b.uniforms,M=0,T=16;for(let E=0,C=_.length;E<C;E++){let L=Array.isArray(_[E])?_[E]:[_[E]];for(let R=0,D=L.length;R<D;R++){let N=L[R],F=Array.isArray(N.value)?N.value:[N.value];for(let X=0,Y=F.length;X<Y;X++){let st=F[X],K=m(st),tt=M%T,q=tt%K.boundary,mt=tt+q;M+=q,mt!==0&&T-mt<K.storage&&(M+=T-mt),N.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=M,M+=K.storage}}}let y=M%T;return y>0&&(M+=T-y),b.__size=M,b.__cache={},this}function m(b){let _={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(_.boundary=4,_.storage=4):b.isVector2?(_.boundary=8,_.storage=8):b.isVector3||b.isColor?(_.boundary=16,_.storage=12):b.isVector4?(_.boundary=16,_.storage=16):b.isMatrix3?(_.boundary=48,_.storage=48):b.isMatrix4?(_.boundary=64,_.storage=64):b.isTexture?Vt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(_.boundary=16,_.storage=b.byteLength):Vt("WebGLRenderer: Unsupported uniform value type.",b),_}function v(b){let _=b.target;_.removeEventListener("dispose",v);let M=a.indexOf(_.__bindingPointIndex);a.splice(M,1),s.deleteBuffer(n[_.id]),delete n[_.id],delete r[_.id]}function w(){for(let b in n)s.deleteBuffer(n[b]);a=[],n={},r={}}return{bind:l,update:c,dispose:w}}var a1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),gn=null;function o1(){return gn===null&&(gn=new Es(a1,16,16,rs,tn),gn.name="DFG_LUT",gn.minFilter=Ye,gn.magFilter=Ye,gn.wrapS=cn,gn.wrapT=cn,gn.generateMipmaps=!1,gn.needsUpdate=!0),gn}var Ul=class{constructor(t={}){let{canvas:e=Df(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:p=Si}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let x=p,f=new Set([el,tl,Qo]),m=new Set([Si,Qi,xr,vr,Zo,Jo]),v=new Uint32Array(4),w=new Int32Array(4),b=new k,_=null,M=null,T=[],y=[],E=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,L=!1,R=null,D=null,N=null,F=null;this._outputColorSpace=Li;let X=0,Y=0,st=null,K=-1,tt=null,q=new Re,mt=new Re,wt=null,ot=new te(0),it=0,zt=e.width,V=e.height,J=1,ut=null,Rt=null,ct=new Re(0,0,zt,V),Ft=new Re(0,0,zt,V),ve=!1,qt=new dr,Yt=!1,ae=!1,kt=new oe,he=new k,Ie=new Re,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ee=!1;function $e(){return st===null?J:1}let z=i;function si(A,O){return e.getContext(A,O)}let Se,P,S,B,W,j,lt,pt,Q,nt,gt,Nt,bt,xt,Dt,Gt,jt,U,vt,et,yt,St,rt;try{let A={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Pe,!1),e.addEventListener("webglcontextrestored",ye,!1),e.addEventListener("webglcontextcreationerror",Xi,!1),z===null){let O="webgl2";if(z=si(O,A),z===null)throw si(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ot()}catch(A){throw e.removeEventListener("webglcontextlost",Pe,!1),e.removeEventListener("webglcontextrestored",ye,!1),e.removeEventListener("webglcontextcreationerror",Xi,!1),Xt("WebGLRenderer: "+A.message),A}function Ot(){Se=new py(z),Se.init(),yt=new t1(z,Se),P=new sy(z,Se,t,yt),S=new jb(z,Se),P.reversedDepthBuffer&&d&&S.buffers.depth.setReversed(!0),D=z.createFramebuffer(),N=z.createFramebuffer(),F=z.createFramebuffer(),B=new xy(z),W=new zb,j=new Qb(z,Se,S,W,P,yt,B),lt=new fy(C),pt=new yg(z),St=new iy(z,pt),Q=new my(z,pt,B,St),nt=new yy(z,Q,pt,St,B),U=new vy(z,P,j),Dt=new ry(W),gt=new Ub(C,lt,Se,P,St,Dt),Nt=new s1(C,W),bt=new Bb,xt=new Xb(Se),jt=new ey(C,lt,S,nt,g,l),Gt=new Jb(C,nt,P),rt=new r1(z,B,P,S),vt=new ny(z,Se,B),et=new gy(z,Se,B),B.programs=gt.programs,C.capabilities=P,C.extensions=Se,C.properties=W,C.renderLists=bt,C.shadowMap=Gt,C.state=S,C.info=B}x!==Si&&(E=new _y(x,e.width,e.height,o,n,r));let Pt=new yu(C,z);this.xr=Pt,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let A=Se.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=Se.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(A){A!==void 0&&(J=A,this.setSize(zt,V,!1))},this.getSize=function(A){return A.set(zt,V)},this.setSize=function(A,O,$=!0){if(Pt.isPresenting){Vt("WebGLRenderer: Can't change size while VR device is presenting.");return}zt=A,V=O,e.width=Math.floor(A*J),e.height=Math.floor(O*J),$===!0&&(e.style.width=A+"px",e.style.height=O+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,A,O)},this.getDrawingBufferSize=function(A){return A.set(zt*J,V*J).floor()},this.setDrawingBufferSize=function(A,O,$){zt=A,V=O,J=$,e.width=Math.floor(A*$),e.height=Math.floor(O*$),this.setViewport(0,0,A,O)},this.setEffects=function(A){if(x===Si){Xt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let O=0;O<A.length;O++)if(A[O].isOutputPass===!0){Vt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(q)},this.getViewport=function(A){return A.copy(ct)},this.setViewport=function(A,O,$,H){A.isVector4?ct.set(A.x,A.y,A.z,A.w):ct.set(A,O,$,H),S.viewport(q.copy(ct).multiplyScalar(J).round())},this.getScissor=function(A){return A.copy(Ft)},this.setScissor=function(A,O,$,H){A.isVector4?Ft.set(A.x,A.y,A.z,A.w):Ft.set(A,O,$,H),S.scissor(mt.copy(Ft).multiplyScalar(J).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(A){S.setScissorTest(ve=A)},this.setOpaqueSort=function(A){ut=A},this.setTransparentSort=function(A){Rt=A},this.getClearColor=function(A){return A.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor(...arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha(...arguments)},this.clear=function(A=!0,O=!0,$=!0){let H=0;if(A){let G=!1;if(st!==null){let Mt=st.texture.format;G=f.has(Mt)}if(G){let Mt=st.texture.type,Et=m.has(Mt),_t=jt.getClearColor(),Ct=jt.getClearAlpha(),Lt=_t.r,ne=_t.g,ue=_t.b;Et?(v[0]=Lt,v[1]=ne,v[2]=ue,v[3]=Ct,z.clearBufferuiv(z.COLOR,0,v)):(w[0]=Lt,w[1]=ne,w[2]=ue,w[3]=Ct,z.clearBufferiv(z.COLOR,0,w))}else H|=z.COLOR_BUFFER_BIT}O&&(H|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(H|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&z.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),R=A},this.dispose=function(){e.removeEventListener("webglcontextlost",Pe,!1),e.removeEventListener("webglcontextrestored",ye,!1),e.removeEventListener("webglcontextcreationerror",Xi,!1),jt.dispose(),bt.dispose(),xt.dispose(),W.dispose(),lt.dispose(),nt.dispose(),St.dispose(),rt.dispose(),gt.dispose(),Pt.dispose(),Pt.removeEventListener("sessionstart",bd),Pt.removeEventListener("sessionend",_d),xs.stop()};function Pe(A){A.preventDefault(),Yh("WebGLRenderer: Context Lost."),L=!0}function ye(){Yh("WebGLRenderer: Context Restored."),L=!1;let A=B.autoReset,O=Gt.enabled,$=Gt.autoUpdate,H=Gt.needsUpdate,G=Gt.type;Ot(),B.autoReset=A,Gt.enabled=O,Gt.autoUpdate=$,Gt.needsUpdate=H,Gt.type=G}function Xi(A){Xt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function an(A){let O=A.target;O.removeEventListener("dispose",an),f0(O)}function f0(A){p0(A),W.remove(A)}function p0(A){let O=W.get(A).programs;O!==void 0&&(O.forEach(function($){gt.releaseProgram($)}),A.isShaderMaterial&&gt.releaseShaderCache(A))}this.renderBufferDirect=function(A,O,$,H,G,Mt){O===null&&(O=Qe);let Et=G.isMesh&&G.matrixWorld.determinantAffine()<0,_t=x0(A,O,$,H,G);S.setMaterial(H,Et);let Ct=$.index,Lt=1;if(H.wireframe===!0){if(Ct=Q.getWireframeAttribute($),Ct===void 0)return;Lt=2}let ne=$.drawRange,ue=$.attributes.position,It=ne.start*Lt,be=(ne.start+ne.count)*Lt;Mt!==null&&(It=Math.max(It,Mt.start*Lt),be=Math.min(be,(Mt.start+Mt.count)*Lt)),Ct!==null?(It=Math.max(It,0),be=Math.min(be,Ct.count)):ue!=null&&(It=Math.max(It,0),be=Math.min(be,ue.count));let Xe=be-It;if(Xe<0||Xe===1/0)return;St.setup(G,H,_t,$,Ct);let Ne,Ae=vt;if(Ct!==null&&(Ne=pt.get(Ct),Ae=et,Ae.setIndex(Ne)),G.isMesh)H.wireframe===!0?(S.setLineWidth(H.wireframeLinewidth*$e()),Ae.setMode(z.LINES)):Ae.setMode(z.TRIANGLES);else if(G.isLine){let ri=H.linewidth;ri===void 0&&(ri=1),S.setLineWidth(ri*$e()),G.isLineSegments?Ae.setMode(z.LINES):G.isLineLoop?Ae.setMode(z.LINE_LOOP):Ae.setMode(z.LINE_STRIP)}else G.isPoints?Ae.setMode(z.POINTS):G.isSprite&&Ae.setMode(z.TRIANGLES);if(G.isBatchedMesh)if(Se.get("WEBGL_multi_draw"))Ae.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let ri=G._multiDrawStarts,Tt=G._multiDrawCounts,fi=G._multiDrawCount,ge=Ct?pt.get(Ct).bytesPerElement:1,zi=W.get(H).currentProgram.getUniforms();for(let on=0;on<fi;on++)zi.setValue(z,"_gl_DrawID",on),Ae.render(ri[on]/ge,Tt[on])}else if(G.isInstancedMesh)Ae.renderInstances(It,Xe,G.count);else if($.isInstancedBufferGeometry){let ri=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Tt=Math.min($.instanceCount,ri);Ae.renderInstances(It,Xe,Tt)}else Ae.render(It,Xe)};function yd(A,O,$,H){R!==null&&A.isNodeMaterial&&R.setObject(H,A),Yt===!0&&Dt.setState(A,$,!1),A.transparent===!0&&A.side===Bi&&A.forceSinglePass===!1?(A.side=ii,A.needsUpdate=!0,Wa(A,O,H),A.side=pn,A.needsUpdate=!0,Wa(A,O,H),A.side=Bi):Wa(A,O,H)}this.compile=function(A,O,$=null){$===null&&($=A),R!==null&&R.renderStart(A,O,$),M=xt.get($),M.init(O),y.push(M),$.traverseVisible(function(G){G.isLight&&G.layers.test(O.layers)&&(M.pushLight(G),G.castShadow&&M.pushShadow(G))}),A!==$&&A.traverseVisible(function(G){G.isLight&&G.layers.test(O.layers)&&(M.pushLight(G),G.castShadow&&M.pushShadow(G))}),M.setupLights(),R!==null&&R.updateLights(M.state.lightsArray),ae=this.localClippingEnabled,Yt=Dt.init(this.clippingPlanes,ae),Yt===!0&&Dt.setGlobalState(this.clippingPlanes,O),R!==null&&Gt.render(M.state.shadowsArray,$,O);let H=new Set;return A.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let Mt=G.material;if(Mt)if(Array.isArray(Mt))for(let Et=0;Et<Mt.length;Et++){let _t=Mt[Et];yd(_t,$,O,G),H.add(_t)}else yd(Mt,$,O,G),H.add(Mt)}),M=y.pop(),R!==null&&R.renderEnd(),H},this.compileAsync=function(A,O,$=null){let H=this.compile(A,O,$);return new Promise(G=>{function Mt(){if(H.forEach(function(Et){let Ct=W.get(Et).currentProgram;(Ct===void 0||Ct.isReady())&&H.delete(Et)}),H.size===0){G(A);return}setTimeout(Mt,10)}Se.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let qc=null;function m0(A){qc&&qc(A)}function bd(){xs.stop()}function _d(){xs.start()}let xs=new cp;xs.setAnimationLoop(m0),typeof self<"u"&&xs.setContext(self),this.setAnimationLoop=function(A){qc=A,Pt.setAnimationLoop(A),A===null?xs.stop():xs.start()},Pt.addEventListener("sessionstart",bd),Pt.addEventListener("sessionend",_d),this.render=function(A,O){if(O!==void 0&&O.isCamera!==!0){Xt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;R!==null&&R.renderStart(A,O);let $=Pt.enabled===!0&&Pt.isPresenting===!0,H=E!==null&&(st===null||$)&&E.begin(C,st);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Pt.enabled===!0&&Pt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Pt.cameraAutoUpdate===!0&&Pt.updateCamera(O),O=Pt.getCamera()),A.isScene===!0&&A.onBeforeRender(C,A,O,st),M=xt.get(A,y.length),M.init(O),M.state.textureUnits=j.getTextureUnits(),y.push(M),kt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),qt.setFromProjectionMatrix(kt,Ji,O.reversedDepth),ae=this.localClippingEnabled,Yt=Dt.init(this.clippingPlanes,ae),_=bt.get(A,T.length),_.init(),T.push(_),Pt.enabled===!0&&Pt.isPresenting===!0){let Et=C.xr.getDepthSensingMesh();Et!==null&&Yc(Et,O,-1/0,C.sortObjects)}Yc(A,O,0,C.sortObjects),_.finish(),R!==null&&R.updateLights(M.state.lightsArray),C.sortObjects===!0&&_.sort(ut,Rt),Ee=Pt.enabled===!1||Pt.isPresenting===!1||Pt.hasDepthSensing()===!1,Ee&&jt.addToRenderList(_,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Yt===!0&&Dt.beginShadows();let G=M.state.shadowsArray;if(Gt.render(G,A,O),Yt===!0&&Dt.endShadows(),(H&&E.hasRenderPass())===!1){let Et=_.opaque,_t=_.transmissive;if(M.setupLights(),O.isArrayCamera){let Ct=O.cameras;if(_t.length>0)for(let Lt=0,ne=Ct.length;Lt<ne;Lt++){let ue=Ct[Lt];Sd(Et,_t,A,ue)}Ee&&jt.render(A);for(let Lt=0,ne=Ct.length;Lt<ne;Lt++){let ue=Ct[Lt];Md(_,A,ue,ue.viewport)}}else _t.length>0&&Sd(Et,_t,A,O),Ee&&jt.render(A),Md(_,A,O)}st!==null&&Y===0&&(j.updateMultisampleRenderTarget(st),j.updateRenderTargetMipmap(st)),H&&E.end(C),A.isScene===!0&&A.onAfterRender(C,A,O),St.resetDefaultState(),K=-1,tt=null,y.pop(),y.length>0?(M=y[y.length-1],j.setTextureUnits(M.state.textureUnits),Yt===!0&&Dt.setGlobalState(C.clippingPlanes,M.state.camera)):M=null,T.pop(),T.length>0?_=T[T.length-1]:_=null,R!==null&&R.renderEnd()};function Yc(A,O,$,H){if(A.visible===!1)return;if(A.layers.test(O.layers)){if(A.isGroup)$=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(O);else if(A.isLightProbeGrid)M.pushLightProbeGrid(A);else if(A.isLight)M.pushLight(A),A.castShadow&&M.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(qt)){H&&Ie.setFromMatrixPosition(A.matrixWorld).applyMatrix4(kt);let Et=nt.update(A),_t=A.material;_t.visible&&_.push(A,Et,_t,$,Ie.z,null,O)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(qt))){let Et=nt.update(A),_t=A.material;if(H&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ie.copy(A.boundingSphere.center)):(Et.boundingSphere===null&&Et.computeBoundingSphere(),Ie.copy(Et.boundingSphere.center)),Ie.applyMatrix4(A.matrixWorld).applyMatrix4(kt)),Array.isArray(_t)){let Ct=Et.groups;for(let Lt=0,ne=Ct.length;Lt<ne;Lt++){let ue=Ct[Lt],It=_t[ue.materialIndex];It&&It.visible&&_.push(A,Et,It,$,Ie.z,ue,O)}}else _t.visible&&_.push(A,Et,_t,$,Ie.z,null,O)}}let Mt=A.children;for(let Et=0,_t=Mt.length;Et<_t;Et++)Yc(Mt[Et],O,$,H)}function Md(A,O,$,H){let{opaque:G,transmissive:Mt,transparent:Et}=A;M.setupLightsView($),Yt===!0&&Dt.setGlobalState(C.clippingPlanes,$),H&&S.viewport(q.copy(H)),G.length>0&&Va(G,O,$),Mt.length>0&&Va(Mt,O,$),Et.length>0&&Va(Et,O,$),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function Sd(A,O,$,H){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[H.id]===void 0){let It=Se.has("EXT_color_buffer_half_float")||Se.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[H.id]=new ci(1,1,{generateMipmaps:!0,type:It?tn:Si,minFilter:ns,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:le.workingColorSpace})}let Mt=M.state.transmissionRenderTarget[H.id],Et=H.viewport||q;Mt.setSize(Et.z*C.transmissionResolutionScale,Et.w*C.transmissionResolutionScale);let _t=C.getRenderTarget(),Ct=C.getActiveCubeFace(),Lt=C.getActiveMipmapLevel();C.setRenderTarget(Mt),C.getClearColor(ot),it=C.getClearAlpha(),it<1&&C.setClearColor(16777215,.5),C.clear(),Ee&&jt.render($);let ne=C.toneMapping;C.toneMapping=ji;let ue=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),M.setupLightsView(H),Yt===!0&&Dt.setGlobalState(C.clippingPlanes,H),Va(A,$,H),j.updateMultisampleRenderTarget(Mt),j.updateRenderTargetMipmap(Mt),Se.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let be=0,Xe=O.length;be<Xe;be++){let Ne=O[be],{object:Ae,geometry:ri,material:Tt,group:fi}=Ne;if(Tt.side===Bi&&Ae.layers.test(H.layers)){let ge=Tt.side;Tt.side=ii,Tt.needsUpdate=!0,wd(Ae,$,H,ri,Tt,fi),Tt.side=ge,Tt.needsUpdate=!0,It=!0}}It===!0&&(j.updateMultisampleRenderTarget(Mt),j.updateRenderTargetMipmap(Mt))}C.setRenderTarget(_t,Ct,Lt),C.setClearColor(ot,it),ue!==void 0&&(H.viewport=ue),C.toneMapping=ne}function Va(A,O,$){let H=O.isScene===!0?O.overrideMaterial:null;for(let G=0,Mt=A.length;G<Mt;G++){let Et=A[G],{object:_t,geometry:Ct,group:Lt}=Et,ne=Et.material;ne.allowOverride===!0&&H!==null&&(ne=H),_t.layers.test($.layers)&&wd(_t,O,$,Ct,ne,Lt)}}function wd(A,O,$,H,G,Mt){R!==null&&G.isNodeMaterial&&R.setObject(A,G),A.onBeforeRender(C,O,$,H,G,Mt),A.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),G.onBeforeRender(C,O,$,H,A,Mt),G.transparent===!0&&G.side===Bi&&G.forceSinglePass===!1?(G.side=ii,G.needsUpdate=!0,C.renderBufferDirect($,O,H,G,A,Mt),G.side=pn,G.needsUpdate=!0,C.renderBufferDirect($,O,H,G,A,Mt),G.side=Bi):C.renderBufferDirect($,O,H,G,A,Mt),A.onAfterRender(C,O,$,H,G,Mt)}function Wa(A,O,$){O.isScene!==!0&&(O=Qe);let H=W.get(A),G=M.state.lights,Mt=M.state.shadowsArray,Et=G.state.version,_t=gt.getParameters(A,G.state,Mt,O,$,M.state.lightProbeGridArray),Ct=gt.getProgramCacheKey(_t),Lt=H.programs;H.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?O.environment:null,H.fog=O.fog;let ne=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;H.envMap=lt.get(A.envMap||H.environment,ne),H.envMapRotation=H.environment!==null&&A.envMap===null?O.environmentRotation:A.envMapRotation,Lt===void 0&&(A.addEventListener("dispose",an),Lt=new Map,H.programs=Lt);let ue=Lt.get(Ct);if(ue!==void 0){if(H.currentProgram===ue&&H.lightsStateVersion===Et)return Ed(A,_t),ue}else _t.uniforms=gt.getUniforms(A),R!==null&&A.isNodeMaterial&&R.build(A,$,_t),A.onBeforeCompile(_t,C),ue=gt.acquireProgram(_t,Ct),Lt.set(Ct,ue),H.uniforms=_t.uniforms;let It=H.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(It.clippingPlanes=Dt.uniform),Ed(A,_t),H.needsLights=y0(A),H.lightsStateVersion=Et,H.needsLights&&(It.ambientLightColor.value=G.state.ambient,It.lightProbe.value=G.state.probe,It.sunLights.value=G.state.sun,It.sunLightShadows.value=G.state.sunShadow,It.directionalLights.value=G.state.directional,It.directionalLightShadows.value=G.state.directionalShadow,It.spotLights.value=G.state.spot,It.spotLightShadows.value=G.state.spotShadow,It.rectAreaLights.value=G.state.rectArea,It.ltc_1.value=G.state.rectAreaLTC1,It.ltc_2.value=G.state.rectAreaLTC2,It.pointLights.value=G.state.point,It.pointLightShadows.value=G.state.pointShadow,It.hemisphereLights.value=G.state.hemi,It.sunShadowMatrix.value=G.state.sunShadowMatrix,It.sunShadowCascade.value=G.state.sunShadowCascade,It.directionalShadowMatrix.value=G.state.directionalShadowMatrix,It.spotLightMatrix.value=G.state.spotLightMatrix,It.spotLightMap.value=G.state.spotLightMap,It.pointShadowMatrix.value=G.state.pointShadowMatrix),H.lightProbeGrid=M.state.lightProbeGridArray.length>0,H.currentProgram=ue,H.uniformsList=null,ue}function Td(A){if(A.uniformsList===null){let O=A.currentProgram.getUniforms();A.uniformsList=Mr.seqWithValue(O.seq,A.uniforms)}return A.uniformsList}function Ed(A,O){let $=W.get(A);$.outputColorSpace=O.outputColorSpace,$.batching=O.batching,$.batchingColor=O.batchingColor,$.instancing=O.instancing,$.instancingColor=O.instancingColor,$.instancingMorph=O.instancingMorph,$.skinning=O.skinning,$.morphTargets=O.morphTargets,$.morphNormals=O.morphNormals,$.morphColors=O.morphColors,$.morphTargetsCount=O.morphTargetsCount,$.numClippingPlanes=O.numClippingPlanes,$.numIntersection=O.numClipIntersection,$.vertexAlphas=O.vertexAlphas,$.vertexTangents=O.vertexTangents,$.toneMapping=O.toneMapping}function g0(A,O){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;b.setFromMatrixPosition(O.matrixWorld);for(let $=0,H=A.length;$<H;$++){let G=A[$];if(G.texture!==null&&G.boundingBox.containsPoint(b))return G}return null}function x0(A,O,$,H,G){O.isScene!==!0&&(O=Qe),j.resetTextureUnits();let Mt=O.fog,Et=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?O.environment:null,_t=st===null?C.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:le.workingColorSpace,Ct=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Lt=lt.get(H.envMap||Et,Ct),ne=H.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ue=!!$.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),It=!!$.morphAttributes.position,be=!!$.morphAttributes.normal,Xe=!!$.morphAttributes.color,Ne=ji;H.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Ne=C.toneMapping);let Ae=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ri=Ae!==void 0?Ae.length:0,Tt=W.get(H),fi=M.state.lights;if(Yt===!0&&(ae===!0||A!==tt)){let Le=A===tt&&H.id===K;Dt.setState(H,A,Le)}let ge=!1;H.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==fi.state.version||Tt.outputColorSpace!==_t||G.isBatchedMesh&&Tt.batching===!1||!G.isBatchedMesh&&Tt.batching===!0||G.isBatchedMesh&&Tt.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&Tt.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&Tt.instancing===!1||!G.isInstancedMesh&&Tt.instancing===!0||G.isSkinnedMesh&&Tt.skinning===!1||!G.isSkinnedMesh&&Tt.skinning===!0||G.isInstancedMesh&&Tt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Tt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Tt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Tt.instancingMorph===!1&&G.morphTexture!==null||Tt.envMap!==Lt||H.fog===!0&&Tt.fog!==Mt||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==Dt.numPlanes||Tt.numIntersection!==Dt.numIntersection)||Tt.vertexAlphas!==ne||Tt.vertexTangents!==ue||Tt.morphTargets!==It||Tt.morphNormals!==be||Tt.morphColors!==Xe||Tt.toneMapping!==Ne||Tt.morphTargetsCount!==ri||!!Tt.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(ge=!0):(ge=!0,Tt.__version=H.version);let zi=Tt.currentProgram;ge===!0&&(zi=Wa(H,O,G),R&&H.isNodeMaterial&&R.onUpdateProgram(H,zi,Tt));let on=!1,zn=!1,Bs=!1,we=zi.getUniforms(),Ge=Tt.uniforms;if(S.useProgram(zi.program)&&(on=!0,zn=!0,Bs=!0),H.id!==K&&(K=H.id,zn=!0),Tt.needsLights){let Le=g0(M.state.lightProbeGridArray,G);Tt.lightProbeGrid!==Le&&(Tt.lightProbeGrid=Le,zn=!0)}if(on||tt!==A){S.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),we.setValue(z,"projectionMatrix",A.projectionMatrix),we.setValue(z,"viewMatrix",A.matrixWorldInverse);let Bn=we.map.cameraPosition;Bn!==void 0&&Bn.setValue(z,he.setFromMatrixPosition(A.matrixWorld)),P.logarithmicDepthBuffer&&we.setValue(z,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&we.setValue(z,"isOrthographic",A.isOrthographicCamera===!0),tt!==A&&(tt=A,zn=!0,Bs=!0)}if(Tt.needsLights&&(fi.state.sunShadowMap.length>0&&we.setValue(z,"sunShadowMap",fi.state.sunShadowMap,j),fi.state.directionalShadowMap.length>0&&we.setValue(z,"directionalShadowMap",fi.state.directionalShadowMap,j),fi.state.spotShadowMap.length>0&&we.setValue(z,"spotShadowMap",fi.state.spotShadowMap,j),fi.state.pointShadowMap.length>0&&we.setValue(z,"pointShadowMap",fi.state.pointShadowMap,j)),G.isSkinnedMesh){we.setOptional(z,G,"bindMatrix"),we.setOptional(z,G,"bindMatrixInverse");let Le=G.skeleton;Le&&(Le.boneTexture===null&&Le.computeBoneTexture(),we.setValue(z,"boneTexture",Le.boneTexture,j))}G.isBatchedMesh&&(we.setOptional(z,G,"batchingTexture"),we.setValue(z,"batchingTexture",G._matricesTexture,j),we.setOptional(z,G,"batchingIdTexture"),we.setValue(z,"batchingIdTexture",G._indirectTexture,j),we.setOptional(z,G,"batchingColorTexture"),G._colorsTexture!==null&&we.setValue(z,"batchingColorTexture",G._colorsTexture,j));let Fn=$.morphAttributes;if((Fn.position!==void 0||Fn.normal!==void 0||Fn.color!==void 0)&&U.update(G,$,zi),(zn||Tt.receiveShadow!==G.receiveShadow)&&(Tt.receiveShadow=G.receiveShadow,we.setValue(z,"receiveShadow",G.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&O.environment!==null&&(Ge.envMapIntensity.value=O.environmentIntensity),Ge.dfgLUT!==void 0&&(Ge.dfgLUT.value=o1()),zn){if(we.setValue(z,"toneMappingExposure",C.toneMappingExposure),Tt.needsLights&&v0(Ge,Bs),Mt&&H.fog===!0&&Nt.refreshFogUniforms(Ge,Mt),Nt.refreshMaterialUniforms(Ge,H,J,V,M.state.transmissionRenderTarget[A.id]),Tt.needsLights&&Tt.lightProbeGrid){let Le=Tt.lightProbeGrid;Ge.probesSH.value=Le.texture,Ge.probesMin.value.copy(Le.boundingBox.min),Ge.probesMax.value.copy(Le.boundingBox.max),Ge.probesResolution.value.copy(Le.resolution)}Mr.upload(z,Td(Tt),Ge,j)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Mr.upload(z,Td(Tt),Ge,j),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&we.setValue(z,"center",G.center),we.setValue(z,"modelViewMatrix",G.modelViewMatrix),we.setValue(z,"normalMatrix",G.normalMatrix),we.setValue(z,"modelMatrix",G.matrixWorld),H.uniformsGroups!==void 0){let Le=H.uniformsGroups;for(let Bn=0,Hs=Le.length;Bn<Hs;Bn++){let Rd=Le[Bn];rt.update(Rd,zi),rt.bind(Rd,zi)}}return zi}function v0(A,O){A.ambientLightColor.needsUpdate=O,A.lightProbe.needsUpdate=O,A.sunLights.needsUpdate=O,A.sunLightShadows.needsUpdate=O,A.directionalLights.needsUpdate=O,A.directionalLightShadows.needsUpdate=O,A.pointLights.needsUpdate=O,A.pointLightShadows.needsUpdate=O,A.spotLights.needsUpdate=O,A.spotLightShadows.needsUpdate=O,A.rectAreaLights.needsUpdate=O,A.hemisphereLights.needsUpdate=O}function y0(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return st},this.setRenderTargetTextures=function(A,O,$){let H=W.get(A);H.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),W.get(A.texture).__webglTexture=O,W.get(A.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:$,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,O){let $=W.get(A);$.__webglFramebuffer=O,$.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(A,O=0,$=0){st=A,X=O,Y=$;let H=null,G=!1,Mt=!1;if(A){let _t=W.get(A);if(_t.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(z.FRAMEBUFFER,_t.__webglFramebuffer),q.copy(A.viewport),mt.copy(A.scissor),wt=A.scissorTest,S.viewport(q),S.scissor(mt),S.setScissorTest(wt),K=-1;return}else if(_t.__webglFramebuffer===void 0)j.setupRenderTarget(A);else if(_t.__hasExternalTextures)j.rebindTextures(A,W.get(A.texture).__webglTexture,W.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let ne=A.depthTexture;if(_t.__boundDepthTexture!==ne){if(ne!==null&&W.has(ne)&&(A.width!==ne.image.width||A.height!==ne.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");j.setupDepthRenderbuffer(A)}}let Ct=A.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(Mt=!0);let Lt=W.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Lt[O])?H=Lt[O][$]:H=Lt[O],G=!0):A.samples>0&&j.useMultisampledRTT(A)===!1?H=W.get(A).__webglMultisampledFramebuffer:Array.isArray(Lt)?H=Lt[$]:H=Lt,q.copy(A.viewport),mt.copy(A.scissor),wt=A.scissorTest}else q.copy(ct).multiplyScalar(J).floor(),mt.copy(Ft).multiplyScalar(J).floor(),wt=ve;if($!==0&&(H=D),S.bindFramebuffer(z.FRAMEBUFFER,H)&&S.drawBuffers(A,H),S.viewport(q),S.scissor(mt),S.setScissorTest(wt),G){let _t=W.get(A.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+O,_t.__webglTexture,$)}else if(Mt){let _t=O;for(let Ct=0;Ct<A.textures.length;Ct++){let Lt=W.get(A.textures[Ct]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ct,Lt.__webglTexture,$,_t)}}else if(A!==null&&$!==0){let _t=W.get(A.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,_t.__webglTexture,$)}K=-1};function Ad(A){let O=W.get(A);return(O.__readFormat!==A.format||O.__readType!==A.type)&&(O.__readFormat=A.format,O.__readType=A.type,O.__formatReadable=P.textureFormatReadable(A.format),O.__typeReadable=P.textureTypeReadable(A.type)),O}this.readRenderTargetPixels=function(A,O,$,H,G,Mt,Et,_t=0){if(!(A&&A.isWebGLRenderTarget)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=W.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Et!==void 0&&(Ct=Ct[Et]),Ct){S.bindFramebuffer(z.FRAMEBUFFER,Ct);try{let Lt=A.textures[_t],ne=Lt.format,ue=Lt.type;A.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+_t);let It=Ad(Lt);if(It.__formatReadable===!1){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(It.__typeReadable===!1){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=A.width-H&&$>=0&&$<=A.height-G&&z.readPixels(O,$,H,G,yt.convert(ne),yt.convert(ue),Mt)}finally{let Lt=st!==null?W.get(st).__webglFramebuffer:null;S.bindFramebuffer(z.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(A,O,$,H,G,Mt,Et,_t=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=W.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Et!==void 0&&(Ct=Ct[Et]),Ct)if(O>=0&&O<=A.width-H&&$>=0&&$<=A.height-G){S.bindFramebuffer(z.FRAMEBUFFER,Ct);let Lt=A.textures[_t],ne=Lt.format,ue=Lt.type;A.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+_t);let It=Ad(Lt);if(It.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(It.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let be=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,be),z.bufferData(z.PIXEL_PACK_BUFFER,Mt.byteLength,z.STREAM_READ),z.readPixels(O,$,H,G,yt.convert(ne),yt.convert(ue),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let Xe=st!==null?W.get(st).__webglFramebuffer:null;S.bindFramebuffer(z.FRAMEBUFFER,Xe);let Ne=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Uf(z,Ne,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,be),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Mt),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(be),z.deleteSync(Ne),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,O=null,$=0){let H=Math.pow(2,-$),G=Math.floor(A.image.width*H),Mt=Math.floor(A.image.height*H),Et=O!==null?O.x:0,_t=O!==null?O.y:0;j.setTexture2D(A,0),z.copyTexSubImage2D(z.TEXTURE_2D,$,0,0,Et,_t,G,Mt),S.unbindTexture()},this.copyTextureToTexture=function(A,O,$=null,H=null,G=0,Mt=0){let Et,_t,Ct,Lt,ne,ue,It,be,Xe,Ne=A.isCompressedTexture?A.mipmaps[Mt]:A.image;if($!==null)Et=$.max.x-$.min.x,_t=$.max.y-$.min.y,Ct=$.isBox3?$.max.z-$.min.z:1,Lt=$.min.x,ne=$.min.y,ue=$.isBox3?$.min.z:0;else{let Ge=Math.pow(2,-G);Et=Math.floor(Ne.width*Ge),_t=Math.floor(Ne.height*Ge),A.isDataArrayTexture?Ct=Ne.depth:A.isData3DTexture?Ct=Math.floor(Ne.depth*Ge):Ct=1,Lt=0,ne=0,ue=0}H!==null?(It=H.x,be=H.y,Xe=H.z):(It=0,be=0,Xe=0);let Ae=yt.convert(O.format),ri=yt.convert(O.type),Tt;O.isData3DTexture?(j.setTexture3D(O,0),Tt=z.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(j.setTexture2DArray(O,0),Tt=z.TEXTURE_2D_ARRAY):(j.setTexture2D(O,0),Tt=z.TEXTURE_2D),S.activeTexture(z.TEXTURE0),S.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,O.flipY),S.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),S.pixelStorei(z.UNPACK_ALIGNMENT,O.unpackAlignment);let fi=S.getParameter(z.UNPACK_ROW_LENGTH),ge=S.getParameter(z.UNPACK_IMAGE_HEIGHT),zi=S.getParameter(z.UNPACK_SKIP_PIXELS),on=S.getParameter(z.UNPACK_SKIP_ROWS),zn=S.getParameter(z.UNPACK_SKIP_IMAGES);S.pixelStorei(z.UNPACK_ROW_LENGTH,Ne.width),S.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ne.height),S.pixelStorei(z.UNPACK_SKIP_PIXELS,Lt),S.pixelStorei(z.UNPACK_SKIP_ROWS,ne),S.pixelStorei(z.UNPACK_SKIP_IMAGES,ue);let Bs=A.isDataArrayTexture||A.isData3DTexture,we=O.isDataArrayTexture||O.isData3DTexture;if(A.isDepthTexture){let Ge=W.get(A),Fn=W.get(O),Le=W.get(Ge.__renderTarget),Bn=W.get(Fn.__renderTarget);S.bindFramebuffer(z.READ_FRAMEBUFFER,Le.__webglFramebuffer),S.bindFramebuffer(z.DRAW_FRAMEBUFFER,Bn.__webglFramebuffer);for(let Hs=0;Hs<Ct;Hs++)Bs&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,W.get(A).__webglTexture,G,ue+Hs),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,W.get(O).__webglTexture,Mt,Xe+Hs)),z.blitFramebuffer(Lt,ne,Et,_t,It,be,Et,_t,z.DEPTH_BUFFER_BIT,z.NEAREST);S.bindFramebuffer(z.READ_FRAMEBUFFER,null),S.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(G!==0||A.isRenderTargetTexture||W.has(A)){let Ge=W.get(A),Fn=W.get(O);S.bindFramebuffer(z.READ_FRAMEBUFFER,N),S.bindFramebuffer(z.DRAW_FRAMEBUFFER,F);for(let Le=0;Le<Ct;Le++)Bs?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ge.__webglTexture,G,ue+Le):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ge.__webglTexture,G),we?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Fn.__webglTexture,Mt,Xe+Le):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Fn.__webglTexture,Mt),G!==0?z.blitFramebuffer(Lt,ne,Et,_t,It,be,Et,_t,z.COLOR_BUFFER_BIT,z.NEAREST):we?z.copyTexSubImage3D(Tt,Mt,It,be,Xe+Le,Lt,ne,Et,_t):z.copyTexSubImage2D(Tt,Mt,It,be,Lt,ne,Et,_t);S.bindFramebuffer(z.READ_FRAMEBUFFER,null),S.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else we?A.isDataTexture||A.isData3DTexture?z.texSubImage3D(Tt,Mt,It,be,Xe,Et,_t,Ct,Ae,ri,Ne.data):O.isCompressedArrayTexture?z.compressedTexSubImage3D(Tt,Mt,It,be,Xe,Et,_t,Ct,Ae,Ne.data):z.texSubImage3D(Tt,Mt,It,be,Xe,Et,_t,Ct,Ae,ri,Ne):A.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Mt,It,be,Et,_t,Ae,ri,Ne.data):A.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Mt,It,be,Ne.width,Ne.height,Ae,Ne.data):z.texSubImage2D(z.TEXTURE_2D,Mt,It,be,Et,_t,Ae,ri,Ne);S.pixelStorei(z.UNPACK_ROW_LENGTH,fi),S.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ge),S.pixelStorei(z.UNPACK_SKIP_PIXELS,zi),S.pixelStorei(z.UNPACK_SKIP_ROWS,on),S.pixelStorei(z.UNPACK_SKIP_IMAGES,zn),Mt===0&&O.generateMipmaps&&z.generateMipmap(Tt),S.unbindTexture()},this.initRenderTarget=function(A){W.get(A).__webglFramebuffer===void 0&&j.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?j.setTextureCube(A,0):A.isData3DTexture?j.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?j.setTexture2DArray(A,0):j.setTexture2D(A,0),S.unbindTexture()},this.resetState=function(){X=0,Y=0,st=null,S.reset(),St.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=le._getDrawingBufferColorSpace(t),e.unpackColorSpace=le._getUnpackColorSpace()}};var I={PITCH_A:1,PITCH_B:2,LINES:3,SURROUND:4,TRACK:5,GOAL_FRAME:6,NET:7,STAND_A:8,STAND_B:9,STAND_C:10,ROOF:11,CONCRETE:12,METAL:13,WOOD:14,FENCE:15,HOUSE_A:16,HOUSE_B:17,ROOF_TILE:18,TREE:19,TRUNK:20,BANNER_HOME:21,BANNER_AWAY:22,BOARD_A:23,BOARD_B:24,SCREEN:25,LAMP:26,CROWD_1:27,CROWD_2:28,CROWD_3:29,CROWD_4:30,SKIN_1:31,SKIN_2:32,SKIN_3:33,SKIN_H:34,HAIR_1:35,HAIR_2:36,HAIR_H:37,BOOT:38,BOOT_H:39,SHIRT_0:40,SHORTS_0:41,SOCKS_0:42,GK_0:43,NUM_0:44,SHIRT_1:45,SHORTS_1:46,SOCKS_1:47,GK_1:48,NUM_1:49,BALL_W:50,BALL_B:51,GLOVE:52,CONE:53,TARGET:54,CLOUD:55,SKY_TOP:56,SKY_BOTTOM:57,GOLD:58,EYE:59,GKX_0:60,GKX_1:61,INK:62,MARKER:63,TRIM_0:64,TRIM_1:65,GLASS:66,DOOR:67,BRICK:68,TREE_2:69,HEDGE:70,FLOWER:71},Mu=72,ke=Array.from({length:Mu},()=>new te(1,1,1));function _u(s){return new te(s)}var Su={name:"classic",label:"Classic",bg:"#f2f1ea",fog:"#f2f1ea",fogNear:60,fogFar:330,ink:"#161616",lineWidth:1.2,toon:0,shadow:0,clouds:!1,blobs:!0,roles:{PITCH_A:"#d3e6c3",PITCH_B:"#c6ddb4",LINES:"#ffffff",SURROUND:"#dde9d0",TRACK:"#ebe6dc",GOAL_FRAME:"#ffffff",NET:"#8a8a8a",STAND_A:"#f6f6f2",STAND_B:"#ecebe5",STAND_C:"#e2e0d8",ROOF:"#fafaf7",CONCRETE:"#efeee8",METAL:"#e8e8e6",WOOD:"#f1ebe0",FENCE:"#dcdcdc",HOUSE_A:"#f8f6f0",HOUSE_B:"#efece4",ROOF_TILE:"#e7e2d8",TREE:"#e4ecdc",TRUNK:"#ece6dc",BOARD_A:"#fbfbf8",BOARD_B:"#efefea",SCREEN:"#f7f7f4",LAMP:"#ffffff",CROWD_3:"#efefeb",CROWD_4:"#e3e2dc",SKIN_1:"#fbf6f0",SKIN_2:"#f3eadf",SKIN_3:"#e8dccd",HAIR_1:"#d9d4cc",HAIR_2:"#bdb7ae",BOOT:"#3a3a3a",BALL_W:"#ffffff",BALL_B:"#1b1b1b",GLOVE:"#f5f5f0",CONE:"#f2c9a0",TARGET:"#f0b8b0",CLOUD:"#ffffff",SKY_TOP:"#f4f3ee",SKY_BOTTOM:"#f2f1ea",GOLD:"#eadcaa",EYE:"#1b1b1b",INK:"#161616",MARKER:"#222222",GLASS:"#e3eaee",DOOR:"#e6ddd0",BRICK:"#ece4d8",TREE_2:"#d8e4cc",HEDGE:"#dce7d1",FLOWER:"#f3dcdc"},kitMix:.42,kitSat:.75,skinMix:.55},l1={name:"neo",label:"Neobrutalist",bg:"#8fe3ff",fog:"#b6efff",fogNear:110,fogFar:520,ink:"#000000",lineWidth:3,toon:1,shadow:1,clouds:!0,blobs:!1,roles:{PITCH_A:"#39c24a",PITCH_B:"#2fb041",LINES:"#ffffff",SURROUND:"#27a03a",TRACK:"#ff8a4c",GOAL_FRAME:"#ffffff",NET:"#1a1a1a",STAND_A:"#ff5c8a",STAND_B:"#ffd23f",STAND_C:"#3d9bff",ROOF:"#ffffff",CONCRETE:"#d9d2ff",METAL:"#b5b5c8",WOOD:"#ffb347",FENCE:"#7b7bff",HOUSE_A:"#ff9ecb",HOUSE_B:"#8ff0c4",ROOF_TILE:"#ff5a36",TREE:"#1fd06b",TRUNK:"#a9632e",BOARD_A:"#ffffff",BOARD_B:"#ffe45c",SCREEN:"#141414",LAMP:"#fffbe0",CROWD_3:"#ffe45c",CROWD_4:"#b48cff",SKIN_1:"#ffd8b8",SKIN_2:"#d9a27a",SKIN_3:"#9a6440",HAIR_1:"#2b1d14",HAIR_2:"#f2c14e",BOOT:"#101010",BALL_W:"#ffffff",BALL_B:"#101010",GLOVE:"#fff45c",CONE:"#ff7a1a",TARGET:"#ff3d6e",CLOUD:"#ffffff",SKY_TOP:"#1fb8ff",SKY_BOTTOM:"#c4f4ff",GOLD:"#ffc81a",EYE:"#000000",INK:"#000000",MARKER:"#ff3dcf",GLASS:"#3ee0ff",DOOR:"#7b4dff",BRICK:"#ff8a4c",TREE_2:"#12a954",HEDGE:"#1bbd57",FLOWER:"#ff5c8a"},kitMix:0,kitSat:1.15,skinMix:0},Hl={classic:Su,neo:l1},Bl={kits:[{shirt:"#c8102e",shorts:"#ffffff",socks:"#c8102e",gk:"#f2c500",gkx:"#222222",number:"#ffffff"},{shirt:"#1d4ed8",shorts:"#1d4ed8",socks:"#ffffff",gk:"#22c55e",gkx:"#111111",number:"#ffffff"}],human:{skin:"#e0b48c",hair:"#3b2a1e",boots:"#111111"}},gp=Su;function Ai(s,t,e,i){let n=_u(s),r={};return n.getHSL(r),n.setHSL(r.h,Math.min(1,r.s*i),r.l),e>0&&n.lerp(new te(1,1,1),e),n}function xp(s){let t=Hl[s]||Su;gp=t;for(let[e,i]of Object.entries(t.roles))ke[I[e]].set(i);return yp(),t}function vp(s,t){s&&(Bl.kits=s),t&&(Bl.human=t),yp()}function yp(){let s=gp,t=Bl.kits,e=s.kitMix,i=s.kitSat;for(let r=0;r<2;r++){let a=t[r],o=r===0?0:5;ke[I.SHIRT_0+o].copy(Ai(a.shirt,s,e,i)),ke[I.SHORTS_0+o].copy(Ai(a.shorts,s,e,i)),ke[I.SOCKS_0+o].copy(Ai(a.socks,s,e,i)),ke[I.GK_0+o].copy(Ai(a.gk,s,e,i)),ke[I.NUM_0+o].copy(Ai(a.number,s,(s.name==="classic",0),1)),ke[r===0?I.GKX_0:I.GKX_1].copy(Ai(a.gkx,s,e*.6,i));let l=a.trim||a.number||"#ffffff",c=Ta(l,a.shirt)<.3?Ta(a.shirt,"#ffffff")>.6?"#ffffff":"#141414":l;ke[r===0?I.TRIM_0:I.TRIM_1].copy(Ai(c,s,e,i))}for(let r=0;r<2;r++){let a=ke[r===0?I.SHIRT_0:I.SHIRT_1],o=a.r*.3+a.g*.59+a.b*.11;ke[r===0?I.NUM_0:I.NUM_1].set(o>.6?"#141414":"#ffffff")}ke[I.BANNER_HOME].copy(Ai(t[0].shirt,s,e*.7,i)),ke[I.BANNER_AWAY].copy(Ai(t[1].shirt,s,e*.7,i)),ke[I.CROWD_1].copy(Ai(t[0].shirt,s,s.name==="classic"?.62:0,i)),ke[I.CROWD_2].copy(Ai(t[1].shirt,s,s.name==="classic"?.62:0,i));let n=Bl.human;ke[I.SKIN_H].copy(Ai(n.skin,s,s.skinMix,1)),ke[I.HAIR_H].copy(Ai(n.hair,s,s.skinMix*.8,1)),ke[I.BOOT_H].copy(Ai(n.boots,s,s.name==="classic"?.15:0,1))}function Ta(s,t){let e=_u(s),i=_u(t);return Math.hypot(e.r-i.r,e.g-i.g,e.b-i.b)}var c1={stripes:"stripes",band:"band",half:"halves",quarters:"sleeves",chevron:"plain"};function bu(s){return s&&s.crest&&c1[s.crest.pattern]||"plain"}function Tr(s,t){let e={shirt:s.colors[0],shorts:s.colors[2]||s.colors[1],socks:s.colors[0],number:s.colors[1],pattern:bu(s)},i={shirt:t.colors[0],shorts:t.colors[2]||t.colors[1],socks:t.colors[0],number:t.colors[1],pattern:bu(t)};Ta(e.shirt,i.shirt)<.55&&(i={shirt:t.colors[1],shorts:t.colors[0],socks:t.colors[1],number:t.colors[0],pattern:bu(t)},Ta(e.shirt,i.shirt)<.55&&(i={shirt:"#f4f4f4",shorts:"#222222",socks:"#f4f4f4",number:"#111111",pattern:"plain"}));let n=["#f2c500","#22c55e","#9333ea","#f97316","#0ea5e9","#ec4899","#111827"],r=a=>{let o=n[0],l=-1;for(let c of n){let h=Math.min(...a.map(u=>Ta(c,u)));h>l&&(l=h,o=c)}return o};return e.gk=r([e.shirt,i.shirt]),i.gk=r([e.shirt,i.shirt,e.gk]),e.gkx="#1f1f1f",i.gkx="#1f1f1f",[e,i]}var At={uPalette:{value:ke},uLightDir:{value:new k(-.45,.8,.38).normalize()},uToon:{value:0},uShadowAmt:{value:0},uLineWidth:{value:1.2},uMinWidth:{value:1},uTaper:{value:22},uTaperMin:{value:.3},uDetailDist:{value:50},uCreaseDist:{value:20},uResolution:{value:new Zt(1280,720)},uTime:{value:0},uCrowd:{value:0},uParts:{value:null},uAtlas:{value:null},uNetA:{value:new Re(0,0,0,0)},uNetDA:{value:new k(1,0,0)},uNetB:{value:new Re(0,0,0,0)},uNetDB:{value:new k(-1,0,0)}},wu=`
uniform highp sampler2D uParts;
mat4 partMatrix(float idx) {
  int row = int(idx + 0.5);
  return mat4(texelFetch(uParts, ivec2(0, row), 0), texelFetch(uParts, ivec2(1, row), 0),
              texelFetch(uParts, ivec2(2, row), 0), texelFetch(uParts, ivec2(3, row), 0));
}
`,bp=`
uniform float uTime;
uniform float uCrowd;
float crowdLift(vec2 bob) {
  float rate = 2.6 + fract(bob.x * 7.31) * 2.4 + uCrowd * 4.0;
  float s = sin(uTime * rate + bob.x * 6.2831);
  return bob.y * (0.035 * s + uCrowd * (0.18 + 0.2 * fract(bob.x * 3.7)) * max(0.0, s));
}
`,h1=`
uniform vec4 uNetA; uniform vec3 uNetDA;
uniform vec4 uNetB; uniform vec3 uNetDB;
vec3 netDisp(vec3 p) {
  vec3 da = p - uNetA.xyz; vec3 db = p - uNetB.xyz;
  float fa = uNetA.w * exp(-dot(da, da) / 0.5);
  float fb = uNetB.w * exp(-dot(db, db) / 0.5);
  return uNetDA * fa + uNetDB * fb;
}
`,u1=`
attribute float aRole;
#ifdef PARTS
attribute float aPart;
${wu}
#endif
#ifdef CROWD
attribute vec2 aBob;
${bp}
#endif
uniform vec3 uPalette[${Mu}];
varying vec3 vColor;
varying vec3 vNormalW;
varying vec2 vUv2;
#include <common>
#include <fog_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
  vec3 transformed = position;
  vec3 objectNormal = normal;
#ifdef CROWD
  transformed.y += crowdLift(aBob);
#endif
#ifdef PARTS
  mat4 pm = partMatrix(aPart);
  transformed = (pm * vec4(transformed, 1.0)).xyz;
  objectNormal = mat3(pm) * objectNormal;
#endif
  vColor = uPalette[int(aRole + 0.5)];
#ifdef USE_ATLAS
  vUv2 = uv;
#else
  vUv2 = vec2(-1.0);
#endif
  vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * objectNormal);
  vec4 mvPosition = viewMatrix * worldPosition;
  gl_Position = projectionMatrix * mvPosition;
  vec3 transformedNormal = normalMatrix * objectNormal;
  #include <shadowmap_vertex>
  #include <fog_vertex>
}
`,d1=`
uniform float uToon;
uniform float uShadowAmt;
uniform vec3 uLightDir;
#ifdef USE_ATLAS
uniform sampler2D uAtlas;
#endif
varying vec3 vColor;
varying vec3 vNormalW;
varying vec2 vUv2;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
  vec3 base = vColor;
#ifdef USE_ATLAS
  if (vUv2.x >= 0.0) {
    float a = texture2D(uAtlas, vUv2).a;
    if (a < 0.5) discard;
  }
#endif
  vec3 n = normalize(vNormalW);
  if (!gl_FrontFacing) n = -n;
  float ndl = dot(n, uLightDir);
  // Classic: near-unlit paper with a whisper of form shading
  float classic = 0.9 + 0.08 * clamp(ndl * 0.5 + 0.5, 0.0, 1.0) + 0.02 * clamp(n.y, 0.0, 1.0);
  // Neobrutalist: two tone steps and hard sun shadows
  float sh = mix(1.0, getShadowMask(), uShadowAmt);
  float lit = step(0.1, ndl) * sh;
  float toon = mix(0.68, 1.0, lit);
  float shade = mix(classic, toon, uToon);
  gl_FragColor = vec4(base * shade, 1.0);
  #include <fog_fragment>
}
`;function vn(s={}){let t={};s.parts&&(t.PARTS=""),s.crowd&&(t.CROWD=""),s.atlas&&(t.USE_ATLAS="");let e=_a.merge([dt.lights,dt.fog]);return Object.assign(e,{uPalette:At.uPalette,uLightDir:At.uLightDir,uToon:At.uToon,uShadowAmt:At.uShadowAmt,uParts:At.uParts,uAtlas:At.uAtlas,uTime:At.uTime,uCrowd:At.uCrowd}),new He({uniforms:e,defines:t,vertexShader:u1,fragmentShader:d1,lights:!0,fog:s.fog!==!1,side:s.doubleSided?Bi:pn,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})}var f1=`
attribute vec3 iA;
attribute vec3 iB;
attribute vec3 iN1;
attribute vec3 iN2;
attribute vec2 iMeta;
#ifdef PARTS
${wu}
#endif
#ifdef CROWD
attribute vec2 iBob;
${bp}
#endif
#ifdef NET
${h1}
#endif
uniform float uLineWidth;
uniform float uWidthScale;
uniform float uMinWidth;
uniform float uTaper;
uniform float uTaperMin;
uniform float uDetailDist;
uniform float uCreaseDist;
uniform vec2 uResolution;
#include <common>
#include <fog_pars_vertex>

void trimSegment(const in vec4 start, inout vec4 end) {
  float a = projectionMatrix[2][2];
  float b = projectionMatrix[3][2];
  float nearEstimate = -0.5 * b / a;
  float alpha = (nearEstimate - start.z) / (end.z - start.z);
  end.xyz = mix(start.xyz, end.xyz, alpha);
}

void main() {
  vec3 a = iA, b = iB, n1 = iN1, n2 = iN2;
#ifdef PARTS
  if (iMeta.x >= 0.0) {
    mat4 pm = partMatrix(iMeta.x);
    a = (pm * vec4(a, 1.0)).xyz; b = (pm * vec4(b, 1.0)).xyz;
    n1 = mat3(pm) * n1; n2 = mat3(pm) * n2;
  }
#endif
#ifdef CROWD
  float lift = crowdLift(iBob);
  a.y += lift; b.y += lift;
#endif
#ifdef NET
  a += netDisp(a); b += netDisp(b);
#endif
  vec4 wa = modelMatrix * vec4(a, 1.0);
  vec4 wb = modelMatrix * vec4(b, 1.0);
  // iMeta.y: 1 = crease, +2 = fine detail that fades out with distance
  float detail = step(1.5, iMeta.y);
  float crease = iMeta.y - 2.0 * detail;
  float camDist = length(0.5 * (wa.xyz + wb.xyz) - cameraPosition);
  if (detail > 0.5 && camDist > uDetailDist) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  bool boundary = dot(n2, n2) < 0.01;
  if (!boundary) {
    vec3 V = 0.5 * (wa.xyz + wb.xyz) - cameraPosition;
    float d1 = dot(mat3(modelMatrix) * n1, V);
    float d2 = dot(mat3(modelMatrix) * n2, V);
    bool silhouette = d1 * d2 <= 0.0;
    bool visibleCrease = crease > 0.5 && (d1 < 0.0 || d2 < 0.0);
    if (!silhouette && !visibleCrease) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
#ifdef PARTS
    // far figures keep their outline only, not the creases between their parts
    if (!silhouette && camDist > uCreaseDist) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
#endif
  }
  vec4 start = viewMatrix * wa;
  vec4 end = viewMatrix * wb;
  if (start.z < 0.0 && end.z >= 0.0) trimSegment(start, end);
  else if (end.z < 0.0 && start.z >= 0.0) trimSegment(end, start);
  vec4 clipStart = projectionMatrix * start;
  vec4 clipEnd = projectionMatrix * end;
  vec3 ndcStart = clipStart.xyz / clipStart.w;
  vec3 ndcEnd = clipEnd.xyz / clipEnd.w;
  float aspect = uResolution.x / uResolution.y;
  vec2 dir = ndcEnd.xy - ndcStart.xy;
  dir.x *= aspect;
  dir = normalize(dir);
  vec2 offset = vec2(dir.y, -dir.x);
  dir.x /= aspect;
  offset.x /= aspect;
  if (position.x < 0.0) offset *= -1.0;
  // square caps so thick lines join cleanly at corners
  offset += (position.y < 0.5) ? -dir : dir;
  vec4 clip = (position.y < 0.5) ? clipStart : clipEnd;
  // thick ink thins out with distance so far figures stay readable
  float wpx = uLineWidth * uWidthScale;
  wpx = max(min(wpx, uMinWidth), wpx * clamp(uTaper / max(clip.w, 0.1), uTaperMin, 1.0));
  offset *= wpx;
  offset /= uResolution.y;
  offset *= clip.w;
  clip.xy += offset;
  // Depth: the ink is tested as if it sat a few centimetres nearer the eye along the same
  // view ray (screen position unchanged). A fixed bias in depth-buffer units would grow
  // with the square of the distance and let the outlines of parts behind (the far leg,
  // a stand behind a wall) show through whatever is in front of them.
  vec4 mvPosition = (position.y < 0.5) ? start : end;
  float wv = -mvPosition.z;
  float pull = min(min(0.15, 0.02 + 0.0025 * wv), 0.5 * wv);
  vec4 pz = projectionMatrix * vec4(mvPosition.xyz * ((wv - pull) / max(wv, 1e-4)), 1.0);
  clip.z = (pz.z / pz.w) * clip.w;
  gl_Position = clip;
  #include <fog_vertex>
}
`,p1=`
uniform vec3 uColor;
uniform float uOpacity;
#include <common>
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uColor, uOpacity);
  #include <fog_fragment>
}
`;function en(s={}){let t={};s.parts&&(t.PARTS=""),s.crowd&&(t.CROWD=""),s.net&&(t.NET="");let e=_a.merge([dt.fog]);return Object.assign(e,{uLineWidth:At.uLineWidth,uMinWidth:At.uMinWidth,uTaper:At.uTaper,uTaperMin:At.uTaperMin,uDetailDist:At.uDetailDist,uCreaseDist:At.uCreaseDist,uResolution:At.uResolution,uParts:At.uParts,uTime:At.uTime,uCrowd:At.uCrowd,uNetA:At.uNetA,uNetDA:At.uNetDA,uNetB:At.uNetB,uNetDB:At.uNetDB,uColor:{value:ke[s.role??I.INK]},uOpacity:{value:s.opacity??1},uWidthScale:{value:s.widthScale??1}}),new He({uniforms:e,defines:t,vertexShader:f1,fragmentShader:p1,fog:s.fog!==!1,transparent:(s.opacity??1)<1,depthWrite:(s.opacity??1)>=1})}function _p(){return new He({uniforms:{uParts:At.uParts},vertexShader:`${wu}
attribute float aPart;
void main(){ vec3 p = (partMatrix(aPart) * vec4(position,1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0); }`,fragmentShader:"void main(){ gl_FragColor = vec4(1.0); }"})}function Mp(){return new He({uniforms:{uTop:{value:ke[I.SKY_TOP]},uBottom:{value:ke[I.SKY_BOTTOM]}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uTop; uniform vec3 uBottom; varying vec3 vDir; void main(){ float t = smoothstep(-0.02, 0.55, vDir.y); gl_FragColor = vec4(mix(uBottom, uTop, t), 1.0); }",side:ii,depthWrite:!1,fog:!1})}function Sp(){return new He({uniforms:{uInk:{value:ke[I.INK]}},vertexShader:"attribute float aAlpha; varying vec2 vP; varying float vA; void main(){ vP = position.xz * 2.0; vA = aAlpha; gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uInk; varying vec2 vP; varying float vA; void main(){ float d = length(vP); float a = (1.0 - smoothstep(0.35, 1.0, d)) * vA; if (a < 0.01) discard; gl_FragColor = vec4(uInk, a); }",transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function Ls(s,t=1){return new He({uniforms:{uColor:{value:ke[s]},uOpacity:{value:t}},vertexShader:"void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uColor; uniform float uOpacity; void main(){ gl_FragColor = vec4(uColor, uOpacity); }",transparent:t<1,depthWrite:t>=1})}function wp(s){return new He({uniforms:{uMap:{value:s}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(uMap, vUv).rgb, 1.0); }"})}var Fe=new Map;function as(s,t,e=!0){let i=s.index?s.toNonIndexed():s,n=new Float32Array(i.attributes.position.array),r=new Float32Array(i.attributes.normal.array),a=i.attributes.uv?new Float32Array(i.attributes.uv.array):null,o=e?m1(s,t):[];return{positions:n,normals:r,uvs:a,edges:o}}function m1(s,t=32){let e=s.attributes.position,i=new Map,n=[],r=new Int32Array(e.count);for(let x=0;x<e.count;x++){let f=e.getX(x),m=e.getY(x),v=e.getZ(x),w=`${Math.round(f*1e4)},${Math.round(m*1e4)},${Math.round(v*1e4)}`,b=i.get(w);b===void 0&&(b=n.length,i.set(w,b),n.push([f,m,v])),r[x]=b}let a=s.index?s.index.array:null,o=a?a.length/3:e.count/3,l=new Map,c=n.length,h=new k,u=new k,d=new k;for(let x=0;x<o;x++){let f=r[a?a[x*3]:x*3],m=r[a?a[x*3+1]:x*3+1],v=r[a?a[x*3+2]:x*3+2];if(f===m||m===v||f===v)continue;let w=n[f],b=n[m],_=n[v];if(h.set(b[0]-w[0],b[1]-w[1],b[2]-w[2]),u.set(_[0]-w[0],_[1]-w[1],_[2]-w[2]),d.crossVectors(h,u),d.lengthSq()<1e-14)continue;d.normalize();let M=[d.x,d.y,d.z];for(let[T,y]of[[f,m],[m,v],[v,f]]){let E=Math.min(T,y),C=Math.max(T,y),L=E*c+C,R=l.get(L);R||(R={a:E,b:C,normals:[]},l.set(L,R)),R.normals.push(M)}}let p=Math.cos(t*Math.PI/180),g=[];for(let x of l.values()){let f=x.normals[0];if(x.normals.length===1){g.push({a:n[x.a],b:n[x.b],n1:f,n2:[0,0,0],crease:1});continue}let m=x.normals[1],v=f[0]*m[0]+f[1]*m[1]+f[2]*m[2];v>.9999||g.push({a:n[x.a],b:n[x.b],n1:f,n2:m,crease:v<p?1:0})}return g}function kn(s,t,e){let i=`box:${s}:${t}:${e}`;return Fe.has(i)||Fe.set(i,as(new Yn(s,t,e),30)),Fe.get(i)}function Er(s,t,e,i=8,n=!1){let r=`cyl:${s}:${t}:${e}:${i}:${n}`;return Fe.has(r)||Fe.set(r,as(new Kn(s,t,e,i,1,n),i<=4?30:60)),Fe.get(r)}function xi(s,t=12,e=8,i=Math.PI*2,n=Math.PI){let r=`sph:${s}:${t}:${e}:${i}:${n}`;return Fe.has(r)||Fe.set(r,as(new As(s,t,e,0,i,0,n),70)),Fe.get(r)}function Ea(s,t,e=8){let i=`cone:${s}:${t}:${e}`;return Fe.has(i)||Fe.set(i,as(new Pn(s,t,e),e<=4?30:60)),Fe.get(i)}function g1(s,t,e=!1){let i=`plane:${s}:${t}:${e}`;if(!Fe.has(i)){let n=new Ni(s,t);n.rotateX(-Math.PI/2),Fe.set(i,as(n,30,e))}return Fe.get(i)}function Vl(s,t){let e=`quad:${s}:${t}`;return Fe.has(e)||Fe.set(e,as(new Ni(s,t),30,!1)),Fe.get(e)}function Ar(s,t,e=30,i=!0){return Fe.has(s)||Fe.set(s,as(t(),e,i)),Fe.get(s)}function x1(s,t=12,e=[!0,!0]){let i=[],n=[],r=t+1;for(let[c,h,u,d=0]of s)for(let p=0;p<=t;p++){let g=p/t*Math.PI*2;i.push(Math.sin(g)*h,c,Math.cos(g)*u+d)}for(let c=0;c<s.length-1;c++)for(let h=0;h<t;h++){let u=c*r+h,d=u+1,p=u+r,g=p+1;n.push(u,d,p,d,g,p)}let a=(c,h)=>{let[u,d,p,g=0]=s[c];if(d<1e-5&&p<1e-5)return;let x=i.length/3;i.push(0,u,g);for(let f=0;f<=t;f++){let m=f/t*Math.PI*2;i.push(Math.sin(m)*d,u,Math.cos(m)*p+g)}for(let f=0;f<t;f++)h?n.push(x,x+1+f,x+2+f):n.push(x,x+2+f,x+1+f)};e[0]&&a(0,!1),e[1]&&a(s.length-1,!0);let o=new Ke;o.setAttribute("position",new pe(i,3)),o.setIndex(n),o.computeVertexNormals();let l=o.attributes.normal;for(let c=0;c<s.length;c++){let h=c*r,u=c*r+t,d=l.getX(h)+l.getX(u),p=l.getY(h)+l.getY(u),g=l.getZ(h)+l.getZ(u),x=Math.hypot(d,p,g)||1;l.setXYZ(h,d/x,p/x,g/x),l.setXYZ(u,d/x,p/x,g/x)}return o}function vi(s,t,e=12,i={}){return Ar(`loft:${s}:${e}`,()=>{let n=x1(t,e,i.caps||[!0,!0]);return i.axis==="z"&&n.rotateX(Math.PI/2),n},i.crease??55)}function os(s,t=1){let e=`ico:${s}:${t}`;return Fe.has(e)||Fe.set(e,as(new Zn(s,t),70)),Fe.get(e)}var OT=new oe,Gl=new $t,Oi=new k,Tp=new ze,Ep=new _i,v1=new k,Oe=class s{constructor(t={}){this.opts=t,this.pos=[],this.nor=[],this.role=[],this.part=[],this.bob=[],this.uv=[],this.eA=[],this.eB=[],this.eN1=[],this.eN2=[],this.eMeta=[],this.eBob=[],this.vcount=0,this.detail=!1}add(t,e,i,n={}){Gl.getNormalMatrix(e);let r=e.elements,a=t.positions,o=t.normals,l=n.part??-1,c=n.bob||null,h=n.uvRect||null,u=n.roleFn||null;for(let g=0;g<a.length;g+=3){let x=a[g],f=a[g+1],m=a[g+2];if(this.pos.push(r[0]*x+r[4]*f+r[8]*m+r[12],r[1]*x+r[5]*f+r[9]*m+r[13],r[2]*x+r[6]*f+r[10]*m+r[14]),Oi.set(o[g],o[g+1],o[g+2]).applyMatrix3(Gl).normalize(),this.nor.push(Oi.x,Oi.y,Oi.z),this.role.push(n.roles?n.roles[g/3]:u?u(g/3,x,f,m):i),this.opts.parts&&this.part.push(l),this.opts.bob&&this.bob.push(c?c[0]:0,c?c[1]:0),this.opts.atlas)if(h&&t.uvs){let v=g/3*2;this.uv.push(h[0]+t.uvs[v]*(h[2]-h[0]),h[1]+t.uvs[v+1]*(h[3]-h[1]))}else this.uv.push(-1,-1)}if(this.vcount+=a.length/3,n.noEdges||!t.edges.length)return this;let d=!!n.creaseOnly,p=n.detail??this.detail?2:0;for(let g of t.edges){if(d&&g.crease<.5)continue;let x=g.a,f=g.b;this.eA.push(r[0]*x[0]+r[4]*x[1]+r[8]*x[2]+r[12],r[1]*x[0]+r[5]*x[1]+r[9]*x[2]+r[13],r[2]*x[0]+r[6]*x[1]+r[10]*x[2]+r[14]),this.eB.push(r[0]*f[0]+r[4]*f[1]+r[8]*f[2]+r[12],r[1]*f[0]+r[5]*f[1]+r[9]*f[2]+r[13],r[2]*f[0]+r[6]*f[1]+r[10]*f[2]+r[14]),Oi.set(g.n1[0],g.n1[1],g.n1[2]).applyMatrix3(Gl).normalize(),this.eN1.push(Oi.x,Oi.y,Oi.z),g.n2[0]===0&&g.n2[1]===0&&g.n2[2]===0?this.eN2.push(0,0,0):(Oi.set(g.n2[0],g.n2[1],g.n2[2]).applyMatrix3(Gl).normalize(),this.eN2.push(Oi.x,Oi.y,Oi.z)),this.eMeta.push(l,g.crease+p),this.opts.bob&&this.eBob.push(c?c[0]:0,c?c[1]:0)}return this}line(t,e,i,n,r,a,o=-1){return this.eA.push(t,e,i),this.eB.push(n,r,a),this.eN1.push(0,1,0),this.eN2.push(0,0,0),this.eMeta.push(o,this.detail?3:1),this.opts.bob&&this.eBob.push(0,0),this}static mat(t,e,i,n=0,r=0,a=0,o=1,l=1,c=1){return Ep.set(n,r,a,"YXZ"),Tp.setFromEuler(Ep),new oe().compose(Oi.set(t,e,i).clone(),Tp.clone(),v1.set(o,l,c).clone())}box(t,e,i,n,r,a,o,l=0,c={}){return this.add(kn(e,i,n),s.mat(r,a,o,c.rx||0,l,c.rz||0),t,c)}cyl(t,e,i,n,r,a,o,l,c={}){return this.add(Er(e,i,n,r,c.open),s.mat(a,o,l,c.rx||0,c.ry||0,c.rz||0,c.sx||1,1,c.sz||1),t,c)}sphere(t,e,i,n,r,a={}){return this.add(xi(e,a.ws||12,a.hs||8,a.phi,a.theta),s.mat(i,n,r,a.rx||0,a.ry||0,a.rz||0,a.sx||1,a.sy||1,a.sz||1),t,a)}cone(t,e,i,n,r,a,o,l={}){return this.add(Ea(e,i,n),s.mat(r,a,o,l.rx||0,l.ry||0,l.rz||0,l.sx||1,l.sy||1,l.sz||1),t,l)}plane(t,e,i,n,r,a,o={}){return this.add(g1(e,i,!!o.edges),s.mat(n,r,a,0,o.ry||0,0),t,{noEdges:!o.edges,...o})}quad(t,e,i,n,r,a,o=0,l={}){return this.add(Vl(e,i),s.mat(n,r,a,l.rx||0,o,0),t,{noEdges:!0,...l})}between(t,e,i,n,r,a,o,l,c=6,h={}){let u=a-i,d=o-n,p=l-r,g=Math.hypot(u,d,p),x=new oe,f=new k(u,d,p).normalize(),m=new ze().setFromUnitVectors(new k(0,1,0),f);return x.compose(new k((i+a)/2,(n+o)/2,(r+l)/2),m,new k(1,1,1)),this.add(Er(e,e,g,c),x,t,h)}buildSolid(){let t=new Ke;return t.setAttribute("position",new pe(this.pos,3)),t.setAttribute("normal",new pe(this.nor,3)),t.setAttribute("aRole",new pe(this.role,1)),this.opts.parts&&t.setAttribute("aPart",new pe(this.part,1)),this.opts.bob&&t.setAttribute("aBob",new pe(this.bob,2)),this.opts.atlas&&t.setAttribute("uv",new pe(this.uv,2)),t.computeBoundingSphere(),t}buildEdges(){let t=new ua,e=[-1,0,0,1,0,0,-1,1,0,1,1,0];t.setIndex([0,1,2,2,1,3]),t.setAttribute("position",new pe(e,3));let i=this.eA.length/3;return t.setAttribute("iA",new Mi(new Float32Array(this.eA),3)),t.setAttribute("iB",new Mi(new Float32Array(this.eB),3)),t.setAttribute("iN1",new Mi(new Float32Array(this.eN1),3)),t.setAttribute("iN2",new Mi(new Float32Array(this.eN2),3)),t.setAttribute("iMeta",new Mi(new Float32Array(this.eMeta),2)),this.opts.bob&&t.setAttribute("iBob",new Mi(new Float32Array(this.eBob),2)),t.instanceCount=i,t.boundingSphere=new fn(new k,1e6),t}get edgeCount(){return this.eA.length/3}fine(t){let e=this.detail;this.detail=!0;try{t()}finally{this.detail=e}}};var ks=.008333333333333333,Z={L:64,W:42,HL:32,HW:21},ft={W:5,HW:2.5,H:2,DEPTH:1.6,TOP_DEPTH:1,POST_R:.06},Kt={PEN_D:9,PEN_HW:10,GOAL_D:3,GOAL_HW:4.5,SPOT:7.5,CIRCLE_R:6,ARC_R:5,CORNER_R:1},ui={HL:40,HW:29},me=.11,Wl=9.81,Ri={AIR_DRAG:.0125,ROLL_A0:.6,ROLL_C:.014,BOUNCE:.55,BOUNCE_FRICTION:.82,MAGNUS:.003},Me={RESTART_DIST:6,THROW_DIST:3,KICK_RELEASE_LOCK:.25,CONTROL_RADIUS:1,CONTROL_HEIGHT:1,PROTECT_RADIUS:1.15,LOSE_RADIUS:4,ASSIST_WINDOW:8,TACKLE_WINDOW:2,SLIDE_COOLDOWN:1.5,TACKLE_COOLDOWN:.55,REQUEST_COOLDOWN:1.6,INPUT_BUFFER:.15,GK_MAX_HOLD:4},$l={short:120,normal:180,long:300};var Aa=[{id:"ST",name:"Striker"},{id:"W",name:"Winger"},{id:"AM",name:"Attacking Midfielder"},{id:"CM",name:"Central Midfielder"},{id:"DEF",name:"Defender"}];var Ca={community:{name:"Community Ground",crowd:130,loud:.35},town:{name:"Town Stadium",crowd:520,loud:.55},regional:{name:"Regional Stadium",crowd:1200,loud:.75},premier:{name:"Premier Arena",crowd:2400,loud:.9},continental:{name:"Continental Stadium",crowd:3400,loud:1},training:{name:"Training Ground",crowd:0,loud:0}};function Lu(s){let t=s>>>0||1;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}var ku=s=>Lu(Math.floor(s()*4294967296)),Kl=.1,Nu=.012;function Gi(s,t,e,i,n){let r=i-t,a=n-e,o=Math.hypot(r,a),l=Math.atan2(r,a);s.plane(I.LINES,Kl,o+Kl*.5,(t+i)/2,Nu,(e+n)/2,{ry:l})}function Tu(s,t,e,i,n,r,a=40){for(let o=0;o<a;o++){let l=n+(r-n)*(o/a),c=n+(r-n)*((o+1)/a);Gi(s,t+Math.cos(l)*i,e+Math.sin(l)*i,t+Math.cos(c)*i,e+Math.sin(c)*i)}}function Ap(s,t,e,i=.12){for(let n=0;n<4;n++)s.plane(I.LINES,i*2,i*.9,t,Nu,e,{ry:n*Math.PI/4})}function y1(s,t={}){let e=Z.HL,i=Z.HW,n=16,r=Z.L/n;for(let c=0;c<n;c++)s.plane(c%2?I.PITCH_A:I.PITCH_B,r,Z.W,-e+r*(c+.5),0,0);let a=t.surroundX||44,o=t.surroundZ||33;s.plane(I.SURROUND,a*2,o-i,0,-.004,i+(o-i)/2),s.plane(I.SURROUND,a*2,o-i,0,-.004,-i-(o-i)/2),s.plane(I.SURROUND,a-e,Z.W,e+(a-e)/2,-.004,0),s.plane(I.SURROUND,a-e,Z.W,-e-(a-e)/2,-.004,0);let l=Kl/2;Gi(s,-e,i-l,e,i-l),Gi(s,-e,-i+l,e,-i+l),Gi(s,e-l,-i,e-l,i),Gi(s,-e+l,-i,-e+l,i),Gi(s,0,-i,0,i),Tu(s,0,0,Kt.CIRCLE_R,0,Math.PI*2,56),Ap(s,0,0,.15);for(let c of[1,-1]){let h=c*e,u=h-c*Kt.PEN_D;Gi(s,u,-Kt.PEN_HW,u,Kt.PEN_HW),Gi(s,h,Kt.PEN_HW,u,Kt.PEN_HW),Gi(s,h,-Kt.PEN_HW,u,-Kt.PEN_HW);let d=h-c*Kt.GOAL_D;Gi(s,d,-Kt.GOAL_HW,d,Kt.GOAL_HW),Gi(s,h,Kt.GOAL_HW,d,Kt.GOAL_HW),Gi(s,h,-Kt.GOAL_HW,d,-Kt.GOAL_HW);let p=h-c*Kt.SPOT;Ap(s,p,0);let g=Math.abs(u-p),x=Math.acos(Math.min(1,g/Kt.ARC_R)),f=c>0?Math.PI:0;Tu(s,p,0,Kt.ARC_R,f-x,f+x,16);for(let m of[1,-1]){let v=c>0?Math.PI:0,b=-m*Math.PI/2-v;for(;b>Math.PI;)b-=Math.PI*2;for(;b<-Math.PI;)b+=Math.PI*2;Tu(s,h,m*i,Kt.CORNER_R,v,v+b,8),s.cyl(I.METAL,.02,.02,1.5,6,h,.75,m*i),s.box(I.BANNER_HOME,.02,.26,.36,h,1.36,m*i-m*.19)}}}function b1(s){let t=ft.POST_R;for(let e of[1,-1]){let i=e*(Z.HL-t);for(let a of[1,-1])s.cyl(I.GOAL_FRAME,t,t,ft.H+t,12,i,(ft.H+t)/2,a*(ft.HW+t));s.cyl(I.GOAL_FRAME,t,t,ft.W+t*4,12,i,ft.H+t,0,{rx:Math.PI/2});let n=e*(Z.HL+ft.DEPTH),r=e*(Z.HL+ft.TOP_DEPTH);for(let a of[1,-1]){let o=a*(ft.HW+t);s.between(I.METAL,.03,n,.03,o,r,ft.H,o,6),s.between(I.METAL,.03,i,ft.H+t,o,r,ft.H,o,6),s.between(I.METAL,.025,i,.03,o,n,.03,o,6)}s.between(I.METAL,.03,r,ft.H,-(ft.HW+t),r,ft.H,ft.HW+t,6),s.between(I.METAL,.025,n,.03,-(ft.HW+t),n,.03,ft.HW+t,6)}}function Pp(){let s=new Oe,t=.2;for(let e of[1,-1]){let i=e*Z.HL,n=l=>e*(Z.HL+ft.DEPTH+(ft.TOP_DEPTH-ft.DEPTH)*(l/ft.H)),r=ft.HW;for(let l=-r;l<=r+1e-6;l+=t)for(let c=0;c<ft.H-1e-6;c+=t)s.line(n(c),c,l,n(c+t),c+t,l);for(let l=0;l<=ft.H+1e-6;l+=t)for(let c=-r;c<r-1e-6;c+=t)s.line(n(l),l,c,n(l),l,c+t);for(let l of[1,-1]){let c=l*r;for(let h=0;h<=ft.H+1e-6;h+=t){let u=n(h),d=Math.max(1,Math.round(Math.abs(u-i)/t));for(let p=0;p<d;p++)s.line(i+(u-i)*(p/d),h,c,i+(u-i)*((p+1)/d),h,c)}for(let h=0;h<=8;h++){let u=h/8;for(let d=0;d<ft.H-1e-6;d+=t){let p=i+(n(d)-i)*u,g=i+(n(d+t)-i)*u;s.line(p,d,c,g,d+t,c)}}}let a=n(ft.H),o=Math.max(1,Math.round(Math.abs(a-i)/t));for(let l=-r;l<=r+1e-6;l+=t)for(let c=0;c<o;c++)s.line(i+(a-i)*(c/o),ft.H,l,i+(a-i)*((c+1)/o),ft.H,l);for(let l=0;l<=o;l++)for(let c=-r;c<r-1e-6;c+=t)s.line(i+(a-i)*(l/o),ft.H,c,i+(a-i)*(l/o),ft.H,c+t)}return s.buildEdges()}var yn=class{constructor(t,e,i,n){this.b=t,this.cx=e,this.cz=i,this.ry=n,this.c=Math.cos(n),this.s=Math.sin(n)}w(t,e){return[this.cx+t*this.c+e*this.s,this.cz-t*this.s+e*this.c]}box(t,e,i,n,r,a,o,l={}){let[c,h]=this.w(r,o);this.b.box(t,e,i,n,c,a,h,this.ry+(l.ry||0),l)}cyl(t,e,i,n,r,a,o,l,c={}){let[h,u]=this.w(a,l);this.b.cyl(t,e,i,n,r,h,o,u,c)}sphere(t,e,i,n,r,a={}){let[o,l]=this.w(i,r);this.b.sphere(t,e,o,n,l,a)}quad(t,e,i,n,r,a,o={}){let[l,c]=this.w(n,a);this.b.quad(t,e,i,l,r,c,this.ry+Math.PI+(o.ry||0),o)}},Rp=[I.CROWD_1,I.CROWD_1,I.CROWD_1,I.CROWD_2,I.CROWD_3,I.CROWD_4,I.CROWD_1,I.CROWD_3],_1=[I.SKIN_1,I.SKIN_2,I.SKIN_3];function M1(s,t,e,i,n,r=!0,a=!0){let o=Rp[Math.floor(n()*Rp.length)],l=[n(),1],c=r?.46:.62,h=n()<.5?I.CROWD_1:I.CROWD_2;s.box(o,.42,c,.27,t,e+c/2,i,{bob:l});let[u,d]=s.w(t,i),p=_1[Math.floor(n()*3)];if(s.b.add(os(.135,0),Oe.mat(u,e+c+.16,d,0,n()*6,0),p,{bob:l}),a){let x=n()<.14;for(let f of[-1,1])x?s.box(o,.1,.42,.11,t+f*.25,e+c+.18,i,{bob:l,rz:f*.25,detail:!0}):s.box(o,.1,c*.8,.12,t+f*.26,e+c*.56,i-.02,{bob:l,detail:!0})}let g=n();if(g<.18)s.box(h,.46,.09,.3,t,e+c-.02,i,{bob:l,detail:!0});else if(g<.3){let[x,f]=s.w(t,i);s.b.add(Ea(.12,.2,6),Oe.mat(x,e+c+.3,f),h,{bob:l,detail:!0})}}function Vi(s,t,e,i){let n=new yn(s,t.cx,t.cz,t.ry),r=t.rows,a=t.rowDepth||.85,o=t.rowHeight||.42,l=t.base||.6,c=t.len,h=t.z0||0,u=t.roles||[I.STAND_A,I.STAND_B];n.box(t.wallRole||I.CONCRETE,c,l,.3,0,l/2,h-.15);let d=Math.max(2,Math.round(c/2.2));s.fine(()=>{for(let M=0;M<=d;M++)n.cyl(I.METAL,.03,.03,.95,5,-c/2+c*M/d,l+.47,h-.15);let[v,w]=n.w(-c/2,h-.15),[b,_]=n.w(c/2,h-.15);s.between(I.METAL,.035,v,l+.95,w,b,l+.95,_,6),s.line(v,l+.5,w,b,l+.5,_)});let p=Math.max(1,Math.round(c/13)),g=[];for(let v=1;v<p+1;v++)g.push(-c/2+c*v/(p+1));let x=1.1;for(let v=0;v<r;v++){let w=l+v*o,b=u[Math.floor(v/(t.band||2))%u.length],_=u[(Math.floor(v/(t.band||2))+1)%u.length];n.box(b,c,o,a,0,w+o/2,h+a*(v+.5));let M=[-c/2,...g.flatMap(T=>[T-x/2,T+x/2]),c/2];if(s.fine(()=>{for(let T=0;T<M.length;T+=2){let y=M[T]+.1,E=M[T+1]-.1;E-y>.4&&n.box(_,E-y,.3,.07,(y+E)/2,w+o+.15,h+a*(v+1)-.1)}for(let T of g)n.box(I.CONCRETE,x-.1,o/2,a/2,T,w+o+o/4,h+a*(v+.25))}),t.density>0){let T=Math.floor(c/.62);for(let y=0;y<T;y++){let E=-c/2+.31+y*.62+(e()-.5)*.1;g.some(C=>Math.abs(E-C)<x/2+.15)||i.seats.push({f:n,lx:E,y:w+o,lz:h+a*(v+.5)+.05,w:t.density,seated:!0,row:v+(t.z0?20:0)})}}}let f=l+r*o,m=h+a*r;n.box(t.wallRole||I.CONCRETE,c+.4,f+1.4,.35,0,(f+1.4)/2,m+.17);for(let v of[-1,1])n.box(t.wallRole||I.CONCRETE,.35,f+.6,m-h,v*(c/2+.17),(f+.6)/2,h+(m-h)/2);if(t.roof){let v=f+(t.roofClear||3.2),w=m-h+1.5,b=Math.max(2,Math.round(c/12));for(let T=0;T<=b;T++){let y=-c/2+c*T/b;n.cyl(I.METAL,.16,.16,v,8,y,v/2,m+.1)}n.box(t.roofRole||I.ROOF,c+1.2,.35,w,0,v,m-w/2+.6,{rx:-.07}),n.box(I.METAL,c+1.2,.5,.25,0,v-.3,m-w+.7),s.detail=!0;let _=m-w+.7,M=Math.tan(.07);for(let T=0;T<=b;T++){let y=-c/2+c*T/b,[E,C]=n.w(y,m+.1),[L,R]=n.w(y,_),D=v-.2,N=v-.2+(m+.1-_)*-M;s.between(I.METAL,.07,E,D,C,L,N,R,5);let F=6;for(let X=0;X<F;X++){let Y=X/F,st=(X+1)/F,[K,tt]=n.w(y,m+.1+(_-m-.1)*Y),[q,mt]=n.w(y,m+.1+(_-m-.1)*st),wt=D+(N-D)*Y,ot=D+(N-D)*st,it=1.1*(1-Y)+.2,zt=1.1*(1-st)+.2;s.line(K,wt,tt,q,ot-zt,mt),s.line(K,wt-it,tt,q,ot-zt,mt)}}for(let T of[.35,.7]){let y=m+.1+(_-m-.1)*T,[E,C]=n.w(-c/2,y),[L,R]=n.w(c/2,y),D=v-.25+(m+.1-y)*-M;s.between(I.METAL,.05,E,D,C,L,D,R,5)}s.detail=!1}if(t.banners){let v=Math.max(1,Math.floor(c/10));for(let w=0;w<v;w++){let b=-c/2+c*(w+.5)/v;n.box(w%2?I.BANNER_HOME:I.GOLD,5,.9,.06,b,l*.55+.3,h-.35)}}return{top:f,back:m}}function Cp(s,t,e,i){let n=Math.atan2(-t,-e),r=new yn(s,t,e,n),a=1,o=.4,l=(d,p,g)=>{let x=a+(o-a)*g;return r.w(d*x,p*x)},c=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let[d,p]of c){let[g,x]=l(d,p,0),[f,m]=l(d,p,1);s.between(I.METAL,.07,g,0,x,f,i,m,6)}s.detail=!0;let h=Math.round(i/3);for(let d=0;d<h;d++){let p=d/h,g=(d+1)/h;for(let x=0;x<4;x++){let[f,m]=c[x],[v,w]=c[(x+1)%4],[b,_]=l(f,m,p),[M,T]=l(v,w,p),[y,E]=l(f,m,g),[C,L]=l(v,w,g);d%2?s.line(b,i*p,_,C,i*g,L):s.line(M,i*p,T,y,i*g,E),d%2&&s.line(y,i*g,E,C,i*g,L)}}for(let d of[-.2,.2]){let[p,g]=r.w(d,1.05),[x,f]=r.w(d,.45);s.line(p,.2,g,x,i,f)}for(let d=1;d<i/.6;d++){let p=d*.6/i,g=1.05+(.45-1.05)*p,[x,f]=r.w(-.2,g),[m,v]=r.w(.2,g);s.line(x,d*.6,f,m,d*.6,v)}r.box(I.METAL,3.2,.15,1.6,0,i,0);for(let[d,p]of[[-1.6,-.8],[1.6,-.8],[1.6,.8],[-1.6,.8]])r.cyl(I.METAL,.03,.03,1,5,d,i+.5,p);for(let[d,p,g,x]of[[-1.6,-.8,1.6,-.8],[1.6,-.8,1.6,.8],[1.6,.8,-1.6,.8],[-1.6,.8,-1.6,-.8]]){let[f,m]=r.w(d,p),[v,w]=r.w(g,x);s.line(f,i+1,m,v,i+1,w)}s.detail=!1,r.box(I.METAL,4.2,2.8,.22,0,i+2.4,.3,{rx:.35});let u=.35;for(let d=0;d<4;d++)for(let p=0;p<3;p++){let g=-1.5+d*1,x=-.9+p*.9,f=i+2.4+x*Math.cos(u),m=.3-.2-x*Math.sin(u);r.cyl(I.METAL,.36,.36,.3,10,g,f,m,{rx:Math.PI/2+u}),r.cyl(I.LAMP,.29,.29,.32,10,g,f,m-.02,{rx:Math.PI/2+u})}}function Xl(s,t,e){let a=0,o=(l,c,h,u,d)=>{let p=Math.abs(h-c),g=Math.max(1,Math.round(p/8)),x=p/g;for(let f=0;f<g;f++){let m=Math.min(c,h)+x*(f+.5),v=u?l:m,w=u?m:l;s.box(f%2?I.BOARD_A:I.BOARD_B,x-.06,.9,.12,v,.9/2,w,u?Math.PI/2:0);let b=.075,_=v+(u?-Math.sign(l)*b:0),M=w+(u?0:-Math.sign(l)*b),T=e[a++%e.length];s.quad(f%3===0?I.BANNER_HOME:I.INK,Math.min(x-.6,6),.62,_,.9/2,M,d,{uvRect:t.word(T)})}};o(28.6,-39.6,39.6,!1,Math.PI),o(-28.6,-39.6,39.6,!1,0),o(39.6,-28.6+1,-ft.HW-4,!0,-Math.PI/2),o(39.6,ft.HW+4,28.6-1,!0,-Math.PI/2),o(-39.6,-28.6+1,-ft.HW-4,!0,Math.PI/2),o(-39.6,ft.HW+4,28.6-1,!0,Math.PI/2)}function Ra(s,t=27.2){for(let[e,i]of[[-9,I.BANNER_HOME],[9,I.BANNER_AWAY]]){let n=new yn(s,e,t,0);n.box(I.STAND_C,7,2.3,.15,0,1.15,1),n.box(I.CONCRETE,7.2,.12,1.9,0,.06,.25);let r=[[1,2.3],[.55,2.42],[0,2.38],[-.5,2.2],[-.8,1.9]];for(let a=0;a<r.length-1;a++){let[o,l]=r[a],[c,h]=r[a+1],u=Math.hypot(c-o,h-l);n.box(I.GLASS,7.1,.05,u,0,(l+h)/2,(o+c)/2,{rx:Math.atan2(h-l,o-c)})}for(let a of[-1,1])n.box(I.GLASS,.06,1.9,1.6,a*3.55,1.2,.2),n.box(I.METAL,.1,2.3,.1,a*3.55,1.15,-.7);s.fine(()=>{for(let a=0;a<7;a++){let o=-2.85+a*.95;n.box(i,.5,.08,.45,o,.48,.62),n.box(i,.5,.5,.07,o,.72,.86,{rx:-.12}),n.box(I.METAL,.06,.44,.06,o,.22,.62)}})}}var Ia=!1,Pa=!1;function ql(s,t,e,i,n,r){let a=r||(n()<.45?"pine":n()<.75?"broadleaf":"poplar"),o=ku(n),l=(o()-.5)*.06;if(a==="pine"){s.cyl(I.TRUNK,.14*i,.24*i,2.4*i,7,t,1.2*i,e);let c=Ia?3:4;for(let h=0;h<c;h++){let u=h/c,d=(1.95-u*1.25)*i,p=(2.5-u*.7)*i;s.cone(h%2?I.TREE_2:I.TREE,d,p,9,t+l*h,(1.9+u*3.6)*i+p/2,e,{ry:o()*3,rz:l})}}else if(a==="poplar")s.cyl(I.TRUNK,.12*i,.2*i,2.2*i,7,t,1.1*i,e),s.add(os(1,1),Oe.mat(t,4.6*i,e,0,o()*3,l,1.25*i,3.1*i,1.25*i),I.TREE_2),s.add(os(1,1),Oe.mat(t+.35*i,3.6*i,e-.3*i,0,o()*3,0,1*i,1.9*i,1*i),I.TREE);else{let c=2.6*i;s.cyl(I.TRUNK,.18*i,.3*i,c,8,t,c/2,e);let h=[],u=Ia?1:Pa?2:3;for(let d=0;d<u;d++){let p=o()*Math.PI*2+d*2.1,g=(1.3+o()*.6)*i,x=t+Math.cos(p)*g,f=e+Math.sin(p)*g,m=c+(.9+o()*.6)*i;s.between(I.TRUNK,.1*i,t,c-.4*i,e,x,m,f,6),h.push([x,m+.5*i,f,(1.3+o()*.4)*i])}h.push([t,c+2.3*i,e,1.7*i]);for(let d=0;d<u;d++){let p=o()*Math.PI*2;h.push([t+Math.cos(p)*1.1*i,c+(1.1+o()*1.2)*i,e+Math.sin(p)*1.1*i,(1.1+o()*.4)*i])}h.forEach(([d,p,g,x],f)=>s.add(os(1,1),Oe.mat(d,p,g,o()*3,o()*3,0,x,x*.85,x),f%2?I.TREE_2:I.TREE))}}function Au(s,t,e,i,n,r=I.HEDGE){let a=ku(n),o=2+Math.floor(a()*2)-(Pa&&i<1?1:0);for(let l=0;l<o;l++){let c=(.45+a()*.3)*i;s.add(os(1,1),Oe.mat(t+(l-(o-1)/2)*.55*i,c*.75,e+(a()-.5)*.4*i,0,a()*3,0,c,c*.8,c),l%2?r:I.TREE_2)}}var S1=()=>Ar("pyramid",()=>{let s=new Pn(Math.SQRT1_2,1,4);return s.rotateY(Math.PI/4),s},30);function w1(s,t,e,i,n,r,a,o,l=I.ROOF_TILE){s.add(S1(),Oe.mat(t,e+r/2,i,0,o,0,n,r,a),l)}var Ru=()=>Ar("prism",()=>{let s=[[-.5,0,-.5],[.5,0,-.5],[.5,0,.5],[-.5,0,.5],[-.5,1,0],[.5,1,0]],t=[[0,3,4],[1,5,2],[0,5,1],[0,4,5],[3,5,4],[3,2,5],[0,2,3],[0,1,2]],e=[];for(let n of t)for(let r of n)e.push(...s[r]);let i=new Ke;return i.setAttribute("position",new pe(e,3)),i.computeVertexNormals(),i},30);function Cu(s,t,e,i,n,r,a){let o=s.b,[l,c]=s.w(0,0);o.add(Ru(),Oe.mat(l,i-.02,c,0,s.ry,0,t-.02,n-.08,e-.02),a),o.add(Ru(),Oe.mat(l,i,c,0,s.ry,0,t+r*2,n+.12,e+r*2),I.ROOF_TILE),s.box(I.ROOF_TILE,t+r*2+.1,.12,.2,0,i+n+.1,0);let h=Ia?0:Math.max(2,Math.round(n/.45));o.detail=!0;for(let u=1;u<h;u++){let d=u/h,p=i+(n+.12)*d+.015,g=(e/2+r)*(1-d)+.02;for(let x of[-1,1]){let[f,m]=s.w(-(t/2+r),x*g),[v,w]=s.w(t/2+r,x*g);o.line(f,p,m,v,p,w)}}o.detail=!1}function hs(s,t,e,i,n,r,a=0){let o={ry:a,detail:!0};s.box(I.LINES,n+.16,r+.16,.1,t,e,i,o),s.box(I.GLASS,n,r,.12,t,e,i,o),Pa||(s.box(I.LINES,.06,r,.14,t,e,i,o),s.box(I.LINES,n,.06,.14,t,e+r*.12,i,o)),s.box(I.CONCRETE,n+.3,.08,.26,t,e-r/2-.1,i,o)}function Iu(s,t,e,i=I.DOOR){s.b.fine(()=>T1(s,t,e,i))}function T1(s,t,e,i){s.box(I.LINES,1.16,2.22,.1,t,1.11,e),s.box(i,.96,2.08,.13,t,1.04,e),s.box(I.GLASS,.5,.36,.15,t,1.72,e),Pa?s.box(I.GOLD,.07,.07,.08,t+.32,1.05,e-.08):s.sphere(I.GOLD,.045,t+.32,1.05,e-.08,{ws:6,hs:4}),s.box(I.CONCRETE,1.5,.16,.6,t,.08,e-.3),s.box(I.ROOF_TILE,1.6,.1,.7,t,2.45,e-.3,{rx:.2})}function Yl(s,t,e,i,n){s.box(I.BRICK,.7,n,.6,t,e+n/2,i),s.box(I.CONCRETE,.84,.1,.74,t,e+n+.05,i);for(let r of[-.16,.16])s.cyl(I.BRICK,.08,.09,.32,7,t+r,e+n+.26,i)}function Pu(s,t,e,i){let[n,r]=s.w(-t/2,e),[a,o]=s.w(t/2,e);s.b.fine(()=>{s.b.between(I.METAL,.06,n,i,r,a,i,o,6),s.cyl(I.METAL,.045,.045,i,6,t/2-.1,i/2,e)})}function E1(s,t,e,i,n){let r=ku(i);Ia||s.b.fine(()=>A1(s,t,e,r,n))}function A1(s,t,e,i,n){let r=e-3.2;if(i()<.5){let l=Math.round(t/.5);for(let c=0;c<=l;c++){let h=-t/2+t*c/l;Math.abs(h-n)<.6||s.box(I.LINES,.08,.9,.05,h,.45,r)}for(let c of[.3,.72])s.box(I.LINES,n+t/2-.6,.07,.05,(-t/2+n-.6)/2,c,r),s.box(I.LINES,t/2-n-.6,.07,.05,(t/2+n+.6)/2,c,r)}else s.box(I.HEDGE,n+t/2-.7,.95,.6,(-t/2+n-.7)/2,.47,r),s.box(I.HEDGE,t/2-n-.7,.95,.6,(t/2+n+.7)/2,.47,r);s.box(I.CONCRETE,1.1,.03,3.1,n,.015,e-1.6);let[a,o]=s.w(-t/2+1,e-1.3);if(Au(s.b,a,o,.9,i,I.HEDGE),i()<.6){let[l,c]=s.w(t/2-1.2,e-1.2);Au(s.b,l,c,.6,i,I.FLOWER)}}function Eu(s,t,e,i,n,r){let a=new yn(s,t,e,i),o=r||["gable","hip","terrace","cottage","gable"][Math.floor(n()*5)],l=n()<.5?I.HOUSE_A:I.HOUSE_B;if(o==="terrace"){let f=13.799999999999999,m=7,v=5.6;for(let w=0;w<3;w++){let b=-f/2+4.6*(w+.5);a.box(w%2?I.HOUSE_A:I.HOUSE_B,4.6,v,m,b,v/2,0),hs(a,b+.9,v*.72,-m/2-.02,1.1,1.2),hs(a,b-1,v*.72,-m/2-.02,.9,1.2),hs(a,b+.9,1.5,-m/2-.02,1.3,1.3),Iu(a,b-1,-m/2-.02),w>0&&Yl(a,-f/2+4.6*w,v+.6,.6,1.8),a.box(I.LINES,.1,v,.05,-f/2+4.6*w,v/2,-m/2-.03)}a.box(I.BRICK,f+.1,.5,m+.1,0,.25,0),Cu(a,f,m,v,2.4,.35,l),Pu(a,f,-m/2-.4,v),a.box(I.CONCRETE,f,.03,3.4,0,.015,-m/2-1.7);return}let c=7.5+n()*2.5,h=6.5+n()*1.5,u=o==="cottage"?3.2:5.6+n()*.8;a.box(l,c,u,h,0,u/2,0),a.box(I.BRICK,c+.1,.5,h+.1,0,.25,0);let d=(n()<.5?-1:1)*c*.18;Iu(a,d,-h/2-.02);let p=[-c*.33,c*.33].filter(g=>Math.abs(g-d)>1.2);for(let g of p)hs(a,g,1.5,-h/2-.02,1.4,1.3);for(let g of[-1,1])hs(a,g*(c/2+.02),o==="cottage"?1.5:u*.7,0,1.1,1.1,Math.PI/2);if(o!=="cottage")for(let g of[-c*.3,0,c*.3])hs(a,g,u*.72,-h/2-.02,1.1,1.2);if(o==="hip"){let[g,x]=a.w(0,0);w1(s,g,u,x,c+.9,2.3,h+.9,a.ry),Yl(a,c*.28,u+.5,h*.15,1.9),a.box(I.ROOF_TILE,2.6,.14,1.6,d,2.75,-h/2-.8);for(let f of[-1.15,1.15])a.cyl(I.LINES,.07,.07,2.7,8,d+f,1.35,-h/2-1.45)}else{let g=o==="cottage"?3:2.6;if(Cu(a,c,h,u,g,.4,l),Yl(a,-c*.32,u+g*.45,h*.12,1.4+g*.45),o==="cottage"){let x=-h*.18,f=u+g*.3;a.box(l,1.6,1.3,1.6,0,f+.4,x);let[m,v]=a.w(0,x);s.add(Ru(),Oe.mat(m,f+1.05,v,0,a.ry+Math.PI/2,0,1.9,.7,1.9),I.ROOF_TILE),hs(a,0,f+.4,x-.82,.9,.8)}}Pu(a,c+.6,-h/2-.35,u),E1(a,c,-h/2,n,d)}function Ip(s,t,e,i,n,r,a,o){let l=new yn(s,t,e,i);l.box(I.HOUSE_B,n,a,r,0,a/2,0),l.box(I.BRICK,n+.1,.5,r+.1,0,.25,0),Cu(l,n,r,a,2,.5,I.HOUSE_B);let c=Math.max(2,Math.floor(n/3.4));for(let u=0;u<c;u++){let d=-n/2+n*(u+.5)/c;Math.abs(d)<1.4||hs(l,d,2,-r/2-.02,1.8,1.3)}Iu(l,0,-r/2-.02),l.box(I.WOOD,n,.25,2.6,0,.12,-r/2-1.3);let h=Math.max(3,Math.round(n/3));for(let u=0;u<=h;u++)l.cyl(I.WOOD,.08,.08,a-.4,7,-n/2+n*u/h,(a-.4)/2,-r/2-2.5);l.box(I.ROOF_TILE,n+.4,.14,2.9,0,a-.35,-r/2-1.35,{rx:.12});for(let u=0;u<h;u++){let d=-n/2+n*(u+.5)/h;Math.abs(d)<1||l.box(I.WOOD,n/h-.2,.08,.08,d,.95,-r/2-2.5)}l.box(I.LINES,4.2,.7,.12,0,a+.2,-r/2-.1),l.box(I.BANNER_HOME,3.9,.45,.14,0,a+.2,-r/2-.1),Yl(l,n*.3,a+.6,.5,1.8),Pu(l,n+1,-r/2-.45,a);for(let u=0;u<3;u++){let[d,p]=l.w(-n/2+2+u*(n-4)/2,r/2+1.2);Au(s,d,p,1,o)}}function ls(s,t,e,i,n,r=2.2){let a=Math.hypot(i-t,n-e),o=Math.max(1,Math.round(a/3));for(let c=0;c<=o;c++){let h=t+(i-t)*(c/o),u=e+(n-e)*(c/o);s.cyl(I.FENCE,.04,.04,r,6,h,r/2,u)}s.between(I.FENCE,.03,t,r,e,i,r,n,6);let l=Math.max(1,Math.round(a/.6));for(let c=0;c<l;c++){let h=t+(i-t)*(c/l),u=e+(n-e)*(c/l),d=t+(i-t)*((c+1)/l),p=e+(n-e)*((c+1)/l);s.line(h,.05,u,d,r,p),s.line(d,.05,p,h,r,u)}}function cs(s,t,e,i,n,r,a){let o=new yn(s,t,i,n);o.box(I.METAL,r+.8,a+.8,.5,0,e,.3),o.box(I.BANNER_HOME,r+.9,.22,.56,0,e+a/2+.3,.3);let l=e-a/2;for(let h of[-1,1])o.cyl(I.METAL,.2,.2,l,8,h*r*.35,l/2,.4);let c=Math.max(1,Math.round(l/2.4));return s.fine(()=>{for(let h=0;h<c;h++){let u=l*h/c,d=l*(h+1)/c,[p,g]=o.w(-r*.35,.4),[x,f]=o.w(r*.35,.4);s.line(p,u,g,x,d,f),s.line(x,u,f,p,d,g)}}),{x:t,y:e,z:i,ry:n,w:r,h:a}}function R1(s,t,e,i,n=28){let r=-t/2,a=0;for(let o=1;o<=n;o++){let l=o/n,c=-t/2+t*l,h=e*(1-Math.pow(2*l-1,2));s.between(I.GOAL_FRAME,1.3,r,a,i,c,h,i,10),r=c,a=h}for(let o=2;o<n-1;o+=2){let l=o/n,c=-t/2+t*l,h=e*(1-Math.pow(2*l-1,2));s.line(c,h,i,c,30,40),s.line(c,h,i,c,30,-40)}}function Rr(s,t,e,i){let n=i.lenX,r=i.lenZ,a=[{cx:0,cz:-i.dz,ry:Math.PI,len:n},{cx:0,cz:i.dz,ry:0,len:n},{cx:i.dx,cz:0,ry:Math.PI/2,len:r},{cx:-i.dx,cz:0,ry:-Math.PI/2,len:r}],o=[];for(let l of a)o.push(Vi(s,{...i.stand,...l},t,e));if(i.corners)for(let[l,c]of[[1,1],[1,-1],[-1,1],[-1,-1]]){let h=Math.atan2(l,c),u=l*(i.dx-3),d=c*(i.dz-3);o.push(Vi(s,{...i.stand,cx:u+l*4,cz:d+c*4,ry:h,len:14,banners:!1},t,e))}return o}function Lp(s,t){let{atlas:e,quality:i="high",homeName:n="HOME",final:r=!1,seed:a=7}=t,o=Lu(a*31+s.length),l=i==="low"?.35:i==="medium"?.65:1;Ia=i==="low",Pa=i!=="high";let c=new Oe({bob:!0,atlas:!0}),h=new Oe,u={people:0,seats:[]},d=[],p=[n.toUpperCase(),"FIRST TOUCH","PLAY FAIR","KICKWELL","GRASSROOTS FC","NORTHLINE","VOLTA SPORTS","BLUEBIRD BANK"];e.reset();let g={type:s,name:Ca[s].name};switch(y1(c,{surroundX:s==="training"?90:60,surroundZ:s==="training"?70:45}),b1(h),s){case"community":{ls(c,-40,-29,40,-29),ls(c,-40,29,40,29),ls(c,-40,-29,-40,29),ls(c,40,-29,40,29),Vi(c,{cx:0,cz:-31,ry:Math.PI,len:26,rows:4,rowHeight:.38,base:.4,roles:[I.WOOD,I.STAND_B],roof:!0,roofClear:2.6,density:.6*l,wallRole:I.WOOD},o,u);let f=new yn(c,0,30.2,0);for(let m=0;m<60;m++)u.seats.push({f,lx:-34+o()*68,y:0,lz:o()*.8,w:1,seated:!1});Ra(c,26.5),Ip(c,-48,8,-Math.PI/2,16,8,4.2,o);for(let m=0;m<7;m++)Eu(c,-48+m*16+o()*3,48+o()*4,0,o);for(let m=0;m<6;m++)Eu(c,-44+m*17+o()*3,-52-o()*4,Math.PI,o);for(let m=0;m<16;m++)ql(c,-60+o()*120,(o()<.5?1:-1)*(36+o()*6),.8+o()*.5,o);for(let m=0;m<6;m++)ql(c,48+o()*10,-25+o()*50,.8+o()*.5,o);d.push(cs(c,46,3.2,-16,-Math.PI/2,4,1.5));break}case"town":{Xl(c,e,p),Vi(c,{cx:0,cz:-31,ry:Math.PI,len:54,rows:9,roof:!0,roofClear:3.4,density:.5*l,banners:!0,roles:[I.STAND_C,I.STAND_A]},o,u),Vi(c,{cx:0,cz:31,ry:0,len:44,rows:5,density:.45*l,roles:[I.STAND_B,I.STAND_A]},o,u),Vi(c,{cx:42,cz:0,ry:Math.PI/2,len:30,rows:4,density:.45*l},o,u),Vi(c,{cx:-42,cz:0,ry:-Math.PI/2,len:30,rows:4,density:.4*l},o,u),Ra(c);for(let[f,m]of[[-44,-34],[44,-34],[-44,34],[44,34]])Cp(c,f,m,24);d.push(cs(c,-47,7,18,Math.PI/2,6,2.2));for(let f=0;f<10;f++)ql(c,-70+o()*140,(o()<.5?1:-1)*(52+o()*12),1+o()*.5,o);for(let f=0;f<5;f++)Eu(c,-60+f*28,72,0,o);break}case"regional":{Xl(c,e,p);let f={rows:12,roof:!0,roofClear:3.4,density:.72*l,banners:!0,roles:[I.STAND_A,I.STAND_B,I.STAND_C]};Vi(c,{...f,cx:0,cz:-31,ry:Math.PI,len:66},o,u),Vi(c,{...f,cx:0,cz:31,ry:0,len:66,roof:!1,rows:10},o,u),Vi(c,{...f,cx:0,cz:31,ry:0,len:60,rows:8,base:6.4,z0:9.5,roofClear:3.6,roof:!0,banners:!1},o,u),Vi(c,{...f,cx:42,cz:0,ry:Math.PI/2,len:46,rows:9,roof:!1},o,u),Vi(c,{...f,cx:-42,cz:0,ry:-Math.PI/2,len:46,rows:9,roof:!1},o,u);let m=new yn(c,0,26.2,0);m.box(I.STAND_C,3.6,2.8,5.4,0,1.4,.6),m.cyl(I.BANNER_HOME,1.8,1.8,5.4,12,0,2.8,.6,{rx:Math.PI/2,theta:Math.PI}),m.box(I.CONCRETE,2.6,2.2,.1,0,1.1,-2.15),Ra(c,27.5);for(let[v,w]of[[-40,-38],[40,-38],[-40,38],[40,38]])Cp(c,v,w,30);d.push(cs(c,46,10,0,-Math.PI/2,8,3));break}case"premier":{Xl(c,e,p);let f={rows:13,roofClear:3.6,density:.85*l,banners:!0,roles:[I.STAND_A,I.STAND_B]};Rr(c,o,u,{lenX:68,lenZ:48,dx:42,dz:31,corners:!0,stand:f}),Rr(c,o,u,{lenX:72,lenZ:52,dx:42,dz:31,corners:!1,stand:{...f,base:7,z0:12,rows:10,roof:!0,banners:!1,roles:[I.STAND_C,I.STAND_A]}}),Rr(c,o,u,{lenX:74,lenZ:54,dx:42,dz:31,corners:!1,stand:{...f,base:12.5,z0:21,rows:7,roof:!0,roofClear:4,banners:!1,density:.7*l,roles:[I.STAND_B]}}),Ra(c,27.5),d.push(cs(c,60,17,0,-Math.PI/2,14,5.5)),d.push(cs(c,-60,17,0,Math.PI/2,14,5.5));break}case"continental":{Xl(c,e,r?["FINAL","CONTINENTAL CUP","FIRST TOUCH",n.toUpperCase()]:p);let f={rows:14,roofClear:3.6,density:.95*l,banners:!0,roles:r?[I.GOLD,I.STAND_A]:[I.STAND_A,I.STAND_C]};Rr(c,o,u,{lenX:68,lenZ:48,dx:42,dz:31,corners:!0,stand:f}),Rr(c,o,u,{lenX:74,lenZ:54,dx:42,dz:31,corners:!0,stand:{...f,base:7.4,z0:12.5,rows:12,banners:r}}),Rr(c,o,u,{lenX:78,lenZ:58,dx:42,dz:31,corners:!1,stand:{...f,base:14,z0:24,rows:8,roof:!0,roofClear:5,banners:!1,density:.8*l,roles:[I.STAND_B]}}),R1(c,150,72,0);for(let m=0;m<24;m++){let v=m/24*Math.PI*2,w=Math.cos(v)*80,b=Math.sin(v)*58,_=Math.cos(v+Math.PI/12)*80,M=Math.sin(v+Math.PI/12)*58;c.between(I.METAL,.5,w,30,b,_,30,M,6)}if(r)for(let m=0;m<8;m++)c.box(m%2?I.GOLD:I.BANNER_HOME,1.2,9,.1,-35+m*10,22,-52,0);Ra(c,27.5),d.push(cs(c,64,21,0,-Math.PI/2,16,6)),d.push(cs(c,-64,21,0,Math.PI/2,16,6));break}case"training":{ls(c,-46,-36,46,-36),ls(c,-46,36,46,36),ls(c,-46,-36,-46,36),ls(c,46,-36,46,36);for(let v of[1,-1]){let w=Z.HL-.05,b=v*(ft.HW-.55),_=ft.H-.5;c.box(I.TARGET,.06,.9,.08,w,_,b-.45),c.box(I.TARGET,.06,.9,.08,w,_,b+.45),c.box(I.TARGET,.06,.08,.9,w,_-.45,b),c.box(I.TARGET,.06,.08,.9,w,_+.45,b)}for(let v=0;v<8;v++)c.cone(I.CONE,.14,.32,10,-26+v*1.8,.16,-24.5);for(let v=0;v<3;v++){let w=-20+v*8;for(let b of[0,1.6])c.cone(I.CONE,.16,.4,10,w,.2,-27+b);c.box(I.TARGET,.06,.06,1.6,w,.55,-26.2)}let f=10,m=-30;for(let[v,w,b,_]of[[f,m,f+26,m],[f,m-1,f,m-5],[f+26,m,f+26,m-5]]){let M=Math.hypot(b-v,_-w);c.plane(I.LINES,M,Kl,(v+b)/2,Nu,(w+_)/2,{ry:Math.atan2(_-w,b-v)})}for(let v of[f+1,f+25])c.cyl(I.GOAL_FRAME,.04,.04,1.2,8,v,.6,m-1.8),c.cyl(I.GOAL_FRAME,.04,.04,1.2,8,v,.6,m-3.8),c.between(I.GOAL_FRAME,.04,v,1.2,m-1.8,v,1.2,m-3.8,8);Ip(c,0,49,0,26,10,4.6,o);for(let v=0;v<18;v++)ql(c,-80+o()*160,(o()<.5?1:-1)*(44+o()*20),.9+o()*.6,o);for(let v=0;v<3;v++)c.box(I.WOOD,3,.45,.5,-10+v*10,.22,33);for(let v=0;v<6;v++)c.sphere(I.BALL_W,.11,20+v*.3,.11,33+v%2*.25,{ws:8,hs:6});d.push(cs(c,46,3,20,-Math.PI/2,4,1.5));break}}let x=Math.round(Ca[s].crowd*l);if(x>0&&u.seats.length){let f=u.seats,m=f.reduce((w,b)=>w+b.w,0),v=Math.min(1,x/m);for(let w of f)o()<w.w*v&&(M1(w.f,w.lx,w.y,w.lz,o,w.seated,i==="high"&&(w.row==null||w.row<6)),u.people++)}return g.people=u.people,g.solid=c.buildSolid(),g.edges=c.buildEdges(),g.casterSolid=h.buildSolid(),g.casterEdges=h.buildEdges(),g.screens=d,g.edgeCount=c.edgeCount,g.vertCount=c.vcount,g}function kp(s=3){let t=Lu(s),e=new Oe;for(let i=0;i<14;i++){let n=t()*Math.PI*2,r=260+t()*180,a=Math.cos(n)*r,o=Math.sin(n)*r,l=70+t()*70,c=3+Math.floor(t()*3);for(let h=0;h<c;h++){let u=9+t()*10;e.sphere(I.CLOUD,u,a+(h-c/2)*u*1.1,l+t()*4,o+(t()-.5)*8,{ws:10,hs:6,sy:.55})}}return{solid:e.buildSolid(),edges:e.buildEdges()}}var Ut={PELVIS:0,TORSO:1,HEAD:2,UARM_L:3,UARM_R:4,FARM_L:5,FARM_R:6,THIGH_L:7,THIGH_R:8,SHIN_L:9,SHIN_R:10,BOOT_L:11,BOOT_R:12},Ci=13,Ze={thigh:.44,shin:.43,ankle:.08,upper:.29,fore:.27,hipW:.095,shoulderW:.19,torsoH:.5,waist:.07,neck:.08},ee=(s,t,e,i=0,n=0,r=0,a=1,o=1,l=1)=>Oe.mat(s,t,e,i,n,r,a,o,l),Np={high:{body:16,limb:11,head:[16,12],small:[8,6],joint:[11,8],sole:11,studs:!0,laces:!0},medium:{body:10,limb:8,head:[12,9],small:[6,4],joint:[7,5],sole:7,studs:!1,laces:!0},low:{body:8,limb:6,head:[10,7],small:[5,4],joint:[6,4],sole:6,studs:!1,laces:!1}},Cr=[[0,.165,.112,0],[.1,.176,.118,.004],[.22,.2,.128,.01],[.34,.226,.134,.012],[.44,.236,.124,.002],[.5,.2,.108,-.004],[.545,.1,.07,0]],C1=[[-.13,.155,.112,0],[-.03,.171,.121,.002],[.08,.166,.114,0]],I1=[[.035,.172,.12,0],[.075,.17,.118,0]],P1=[[-.215,.079,.081,0],[-.02,.087,.089,.002],[.03,.086,.088,0]],L1=[[-.455,.044,.046,.004],[-.4,.05,.053,.004],[-.3,.056,.058,.004],[-.14,.064,.069,.008],[0,.066,.067,.004]],k1=[[-.43,.04,.041,.002],[-.3,.045,.046,0],[-.14,.055,.061,-.009],[-.06,.054,.058,-.004],[-.035,.049,.052,-.002]],N1=[[-.085,.057,.062,-.006],[-.05,.057,.061,-.005]],D1=[[-.155,.058,.058,0],[-.05,.066,.067,0],[.01,.066,.067,0]],O1=[[-.162,.06,.06,0],[-.138,.061,.061,0]],U1=[[-.255,.029,.026,0],[-.08,.042,.041,0],[0,.04,.041,0]],z1=[[-.058,.03,.03,.047],[-.04,.043,.048,.036],[.03,.049,.052,.034],[.1,.053,.04,.046],[.16,.049,.03,.056],[.205,.03,.019,.064]],F1=[[-.06,.036,.008,.086],[-.035,.047,.008,.087],[.1,.057,.008,.087],[.17,.052,.008,.087],[.212,.03,.008,.085]],B1=[I.HAIR_1,I.HAIR_2,I.HAIR_1],Dp=[I.SKIN_1,I.SKIN_2,I.SKIN_3],Op=["crop","curly","buzz","quiff","bun","beard"];function H1(s){let t=s.team,e=s.isGK;return{shirt:e?t===0?I.GK_0:I.GK_1:t===0?I.SHIRT_0:I.SHIRT_1,shorts:e?t===0?I.GKX_0:I.GKX_1:t===0?I.SHORTS_0:I.SHORTS_1,socks:e?t===0?I.GKX_0:I.GKX_1:t===0?I.SOCKS_0:I.SOCKS_1,trim:e?t===0?I.GKX_0:I.GKX_1:t===0?I.TRIM_0:I.TRIM_1,num:t===0?I.NUM_0:I.NUM_1,skin:s.isHuman?I.SKIN_H:Dp[s.id*7%3],hair:s.isHuman?I.HAIR_H:B1[s.id*5%3],boot:s.isHuman?I.BOOT_H:I.BOOT,hand:e?I.GLOVE:s.isHuman?I.SKIN_H:Dp[s.id*7%3]}}function Du(s,t,e,i){let n=s.positions,r=new Array(n.length/3),a=(t-1)*e*2;for(let o=0;o<n.length/9;o++){let l=o<a?i(Math.floor(o%(2*e)/2),Math.floor(o/(2*e))):i(-1,-1);r[o*3]=r[o*3+1]=r[o*3+2]=l}return r}function Ou(s,t,e){let i=0;for(;i<Cr.length-2&&Cr[i+1][0]<s;)i++;let n=Cr[i],r=Cr[i+1],a=Math.min(1,Math.max(0,(s-n[0])/(r[0]-n[0]))),o=n[1]+(r[1]-n[1])*a,l=n[2]+(r[2]-n[2])*a,c=n[3]+(r[3]-n[3])*a,h=Math.min(.97,Math.abs(t)/o),u=l*Math.sqrt(1-h*h)*(e?-1:1);return{z:c+u,ry:Math.atan2(t/(o*o),u/(l*l))}}function G1(s,t,e,i,n){let[r,a]=i.head,[o,l]=i.small;s.add(xi(.113,r,a),ee(0,.14,-.004,0,0,0,.93,1.03,1),t.skin,e),s.add(xi(.083,Math.round(r*.75),Math.round(a*.75)),ee(0,.078,.022,0,0,0,.97,.86,1),t.skin,e);for(let h of[-1,1])s.add(xi(.027,o,l),ee(h*.106,.125,-.004,0,0,0,.45,1.15,.8),t.skin,e),s.add(xi(.0135,o,l),ee(h*.041,.142,.101,0,0,0,1.25,1,.55),I.EYE,{...e,noEdges:!0}),s.add(kn(.04,.01,.012),ee(h*.041,.166,.1,0,0,-h*.12),t.hair,{...e,creaseOnly:!0});s.add(Ea(.019,.042,6),ee(0,.118,.11,Math.PI/2+.25),t.skin,e),s.add(kn(.036,.005,.006),ee(0,.071,.103),I.EYE,{...e,noEdges:!0});let c=(h,u,d,p=.145,g=-.012)=>s.add(xi(h,r,Math.max(4,Math.round(a*.5)),Math.PI*2,Math.PI*u),ee(0,p,g,d),t.hair,e);switch(n){case"buzz":c(.1165,.37,-.2);break;case"curly":{c(.118,.44,-.25);for(let h=0;h<9;h++){let u=h/9*Math.PI*2,d=h%2?.55:.95;s.add(os(.046+h%3*.004,0),ee(Math.sin(u)*.085*Math.sin(d),.15+.085*Math.cos(d),-.015+Math.cos(u)*.075*Math.sin(d)-.01,h,h*2,0),t.hair,e)}break}case"quiff":c(.119,.42,-.25),s.add(xi(.052,o,l),ee(0,.232,.045,-.3,0,0,1.45,.75,1.25),t.hair,e);break;case"bun":c(.12,.45,-.3),s.add(xi(.045,o,l),ee(0,.222,-.088),t.hair,e);break;case"beard":c(.1155,.33,-.15),s.add(xi(.089,r,Math.max(4,Math.round(a*.5)),Math.PI*2,Math.PI*.46),ee(0,.078,.022,Math.PI-.6,0,0,.97,.86,1),t.hair,e);break;default:c(.12,.43,-.25)}}function V1(s,t,e,i,n,r){let a=H1(t),o=M=>({part:e+M}),l=t.isGK?"plain":r||"plain",c=l==="sleeves"?a.trim:a.shirt;s.add(vi("pelvis",C1,n.body),ee(0,0,0),a.shorts,o(Ut.PELVIS)),s.add(vi("waistband",I1,n.body,{caps:[!1,!1]}),ee(0,0,0),a.trim,o(Ut.PELVIS));let h=vi("torso",Cr,n.body),u=null,d=n.body,p=Cr.length,g=(M,T)=>Math.abs((M+.5)/d-.5)<.09&&T>=1&&T<=3;l==="stripes"?u=Du(h,p,d,(M,T)=>M>=0&&M%2===1&&!g(M,T)?a.trim:a.shirt):l==="band"?u=Du(h,p,d,(M,T)=>T===2?a.trim:a.shirt):l==="halves"&&(u=Du(h,p,d,M=>M>=d/2?a.trim:a.shirt)),s.add(h,ee(0,0,0),a.shirt,{...o(Ut.TORSO),roles:u}),s.add(vi("collar",[[.515,.084,.064,.002],[.55,.074,.056,.002]],n.body,{caps:[!1,!1]}),ee(0,0,0),a.trim,o(Ut.TORSO)),s.add(Er(.047,.053,.12,n.limb),ee(0,.575,0),a.skin,o(Ut.TORSO));let x=String(t.number??0),f=x.length>1?.12:.16;for(let M=0;M<x.length;M++){let T=(M-(x.length-1)/2)*f*.95,y=Ou(.3,T,!0);s.add(Vl(f,.2),ee(T,.3,y.z-.005,0,y.ry,0),a.num,{...o(Ut.TORSO),uvRect:i.digit(+x[M]),noEdges:!0})}let m=Ou(.37,-.085,!1);s.add(Vl(.06,.08),ee(-.085,.37,m.z+.004,0,m.ry,0),a.num,{...o(Ut.TORSO),uvRect:i.digit(+x[x.length-1]),noEdges:!0});let v=Ou(.38,.085,!1);s.add(kn(.042,.05,.008),ee(.085,.38,v.z+.002,0,v.ry,0),a.trim,o(Ut.TORSO)),s.add(kn(.02,.02,.01),ee(.085,.383,v.z+.005,0,v.ry,Math.PI/4),a.shirt,{...o(Ut.TORSO),noEdges:!0});let w=t.isHuman?"crop":Op[(t.id*5+(t.number||0)*3)%Op.length];G1(s,a,o(Ut.HEAD),n,w);let[b,_]=n.small;for(let[M,T,y]of[[Ut.UARM_L,Ut.FARM_L,1],[Ut.UARM_R,Ut.FARM_R,-1]]){s.add(xi(.066,n.limb,Math.round(n.limb*.7)),ee(0,-.005,0),c,o(M)),s.add(vi("sleeve",D1,n.limb,{caps:[!1,!1]}),ee(0,0,0),c,o(M)),s.add(vi("cuff",O1,n.limb,{caps:[!1,!1]}),ee(0,0,0),a.trim,o(M)),s.add(Er(.045,.039,.3,n.limb),ee(0,-.15,0),a.skin,o(M)),s.add(xi(.04,n.joint[0],n.joint[1]),ee(0,0,0),a.skin,{...o(T),noEdges:!0}),s.add(vi("fore",U1,n.limb),ee(0,0,0),a.skin,o(T));let E=t.isGK?1.32:1;s.add(xi(.046,b+2,_+1),ee(0,-.29-(E-1)*.02,.004,0,0,0,.72*E,1.12*E,.5*E),a.hand,o(T)),s.add(xi(.02,b,_),ee(-y*.016*E,-.272,.028*E,.3,0,0,.9*E,1.5*E,.9*E),a.hand,o(T)),t.isGK&&s.add(vi("wrist",[[-.27,.046,.042,0],[-.238,.045,.041,0]],n.limb,{caps:[!1,!1]}),ee(0,0,0),a.trim,o(T))}for(let[M,T,y,E]of[[Ut.THIGH_L,Ut.SHIN_L,Ut.BOOT_L,1],[Ut.THIGH_R,Ut.SHIN_R,Ut.BOOT_R,-1]]){if(s.add(vi("shortsleg",P1,n.limb,{caps:[!1,!1]}),ee(0,0,0),a.shorts,o(M)),s.add(kn(.014,.2,.024),ee(E*.084,-.1,0),a.trim,{...o(M),creaseOnly:!0}),s.add(vi("thigh",L1,n.limb),ee(0,0,0),a.skin,o(M)),s.add(xi(.047,n.joint[0],n.joint[1]),ee(0,-.005,.006),a.skin,{...o(T),noEdges:!0}),s.add(vi("sock",k1,n.limb),ee(0,0,0),a.socks,o(T)),s.add(vi("sockband",N1,n.limb,{caps:[!1,!1]}),ee(0,0,0),a.trim,o(T)),s.add(vi("boot",z1,n.limb,{axis:"z"}),ee(0,0,0),a.boot,o(y)),s.add(vi("sole",F1,n.sole,{axis:"z"}),ee(0,0,0),I.INK,{...o(y),creaseOnly:!0}),n.studs)for(let[C,L]of[[-.028,-.035],[.028,-.035],[-.034,.07],[.034,.07],[-.03,.14],[.03,.14]])s.add(Er(.009,.007,.014,5),ee(C,-.1,L),I.INK,{...o(y),noEdges:!0});if(n.laces){for(let C of[-1,1])s.add(kn(.004,.012,.11),ee(C*.051,-.05,.06,-.18),I.LINES,{...o(y),noEdges:!0});for(let C=0;C<3;C++)s.add(kn(.034,.004,.008),ee(0,-.004-C*.006,.02+C*.03,-.2),I.LINES,{...o(y),noEdges:!0})}}}function W1(s,t){let e=new Zn(.11,3),i=new Zn(1,0).toNonIndexed(),n=[],r=i.attributes.position;for(let c=0;c<r.count;c++){let h=new k(r.getX(c),r.getY(c),r.getZ(c)).normalize();n.some(u=>u.distanceTo(h)<.001)||n.push(h)}let a=Ar("ball",()=>e,70),o=[],l=new k;for(let c=0;c<a.positions.length;c+=9){l.set(a.positions[c]+a.positions[c+3]+a.positions[c+6],a.positions[c+1]+a.positions[c+4]+a.positions[c+7],a.positions[c+2]+a.positions[c+5]+a.positions[c+8]).normalize();let h=-1;for(let d of n)h=Math.max(h,d.dot(l));let u=h>Math.cos(.36)?I.BALL_B:I.BALL_W;o.push(u,u,u)}s.add(a,new oe,I.BALL_W,{part:t,roles:o})}var Zl=class s{constructor(t,e,i={}){this.players=t,this.rows=t.length*Ci+1,this.ballRow=t.length*Ci;let n=Math.max(1,this.rows);this.data=new Float32Array(16*n),this.texture=new Es(this.data,4,n,Ti,wi),this.texture.minFilter=Ve,this.texture.magFilter=Ve,this.texture.needsUpdate=!0,At.uParts.value=this.texture;let r=new Oe({parts:!0,atlas:!0}),a=Np[i.quality]||Np.high,o=i.kits||[];t.forEach((l,c)=>V1(r,l,c*Ci,e,a,o[l.team]&&o[l.team].pattern)),W1(r,this.ballRow),this.solidGeo=r.buildSolid(),this.edgeGeo=r.buildEdges(),this.mesh=new se(this.solidGeo,s.solidMaterial()),this.mesh.frustumCulled=!1,this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.mesh.customDepthMaterial=s.depthMaterial(),this.edges=new se(this.edgeGeo,s.edgeMaterial()),this.edges.frustumCulled=!1,this.edges.renderOrder=1;for(let l=0;l<this.rows;l++)this.setIdentity(l)}static solidMaterial(){return s._sm||(s._sm=vn({parts:!0,atlas:!0}))}static edgeMaterial(){return s._em||(s._em=en({parts:!0,widthScale:.75}))}static depthMaterial(){return s._dm||(s._dm=_p())}setIdentity(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=this.data[e+15]=1}setMatrix(t,e){this.data.set(e.elements,t*16)}hide(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=1e-4,this.data[e+13]=-50,this.data[e+15]=1}commit(){this.texture.needsUpdate=!0}dispose(){this.solidGeo.dispose(),this.edgeGeo.dispose(),this.texture.dispose()}};var at=class s{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return this.x=t,this.y=e,this.z=i,this}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}clone(){return new s(this.x,this.y,this.z)}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}addScaled(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}scale(t){return this.x*=t,this.y*=t,this.z*=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}len(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}lenSq(){return this.x*this.x+this.y*this.y+this.z*this.z}lenXZ(){return Math.sqrt(this.x*this.x+this.z*this.z)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}dotXZ(t){return this.x*t.x+this.z*t.z}dist(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return Math.sqrt(e*e+i*i+n*n)}distXZ(t){let e=this.x-t.x,i=this.z-t.z;return Math.sqrt(e*e+i*i)}normalize(){let t=this.len();return t>1e-9&&(this.x/=t,this.y/=t,this.z/=t),this}flatNormalize(){this.y=0;let t=Math.sqrt(this.x*this.x+this.z*this.z);return t>1e-9&&(this.x/=t,this.z/=t),this}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}isFinite(){return Number.isFinite(this.x)&&Number.isFinite(this.y)&&Number.isFinite(this.z)}},ht=(s,t,e)=>s<t?t:s>e?e:s,La=(s,t,e)=>s+(t-s)*e;var Up=Math.PI*2;function zp(s){return s=(s+Math.PI)%Up,s<0&&(s+=Up),s-Math.PI}var us=(s,t)=>zp(t-s),Bt=(s,t)=>Math.atan2(s,t);function Fp(s,t,e){let i=us(s,t);return Math.abs(i)<=e?t:zp(s+Math.sign(i)*e)}function nn(s,t,e,i,n,r){let a=n-e,o=r-i,l=a*a+o*o,c=l>1e-9?((s-e)*a+(t-i)*o)/l:0;c=ht(c,0,1);let h=e+a*c,u=i+o*c,d=s-h,p=t-u;return{d:Math.sqrt(d*d+p*p),t:c}}function Ir(s){return s<1.5?1+s*.17:s<5?1.25+(s-1.5)*.4:2.65+(s-5)*.27}function Pr(s){return ht(.64/s,.18,.6)}var $1=1;function X1(s=50){return{pace:s,stamina:s,control:s,passing:s,finishing:s,tackling:s}}var Jl=class{constructor(t={}){this.id=$1++,this.team=t.team??0,this.slot=t.slot??0,this.role=t.role||"CM",this.side=t.side??0,this.number=t.number??7,this.name=t.name||"Player",this.isHuman=!!t.isHuman,this.isGK=this.role==="GK",this.attrs=Object.assign(X1(50),t.attrs||{}),this.keeping=t.keeping??50,this.foot=t.foot||"R",this.look=t.look||null,this.pos=new at,this.prevPos=new at,this.vel=new at,this.yaw=0,this.prevYaw=0,this.headYaw=0,this.desired=new at,this.sprint=!1,this.faceYaw=null,this.stamina=1,this.gait=0,this.prevGait=0,this.action=null,this.slideReadyAt=0,this.tackleReadyAt=0,this.noCaptureUntil=0,this.stumbleUntil=0,this.downUntil=0,this.touch=null,this.celebrate=0,this.hold=null,this.requestUntil=0,this.requestReadyAt=0,this.ackUntil=0,this.lastKickAt=-10,this.ai={state:"shape",target:new at,think:0,sprint:!1,stuckT:0,lastDist:0}}get speed(){return Math.sqrt(this.vel.x*this.vel.x+this.vel.z*this.vel.z)}jogSpeed(){return 4.9+(this.attrs.pace-50)*.018}sprintSpeed(){let t=this.stamina<.35?(.35-this.stamina)/.35:0;return(7+(this.attrs.pace-50)*.03)*(1-.12*t)}maxSpeed(t,e){let i=t&&this.stamina>.02?this.sprintSpeed():this.jogSpeed();return e&&(i*=t?.9:.93),i}forwardX(){return Math.sin(this.yaw)}forwardZ(){return Math.cos(this.yaw)}};function Hp(s){s.action=null,s.vel.set(0,0,0),s.desired.set(0,0,0),s.stumbleUntil=0,s.downUntil=0,s.celebrate=0,s.hold=null,s.requestUntil=0,s.prevPos.copy(s.pos),s.prevYaw=s.yaw}function Gp(s,t,e,i=1/0,n=!1){s.prevPos.copy(s.pos),s.prevYaw=s.yaw,s.prevGait=s.gait;let r=s.action;if(r&&r.type==="slide"&&r.sliding){s.pos.addScaled(s.vel,t),Bp(s,t,!0);return}if(r&&r.type==="dive"){s.pos.addScaled(s.vel,t),s.pos.y=0;return}let a=i;e<s.downUntil?a=0:e<s.stumbleUntil&&(a=Math.min(a,1.6));let o=s.desired,l=Math.sqrt(o.x*o.x+o.z*o.z),c=Math.min(s.maxSpeed(s.sprint,n),a),h=o.x,u=o.z;l>c&&(h*=c/l,u*=c/l,l=c);let d=s.vel.x,p=s.vel.z,g=h-d,x=u-p,f=Math.sqrt(g*g+x*x),m=12.5+s.attrs.pace*.04,w=(h*d+u*p<d*d+p*p-.01?24:m)*t;f>w&&(g*=w/f,x*=w/f),s.vel.x+=g,s.vel.z+=x,s.vel.y=0,s.pos.x+=s.vel.x*t,s.pos.z+=s.vel.z*t,s.pos.y=0;let b=s.faceYaw,_=s.speed;b==null&&(b=_>.4?Bt(s.vel.x,s.vel.z):s.yaw);let M=(s.isHuman?14:9)*t;s.yaw=Fp(s.yaw,b,M);let T=1.35-s.attrs.stamina*.007;s.sprint&&_>s.jogSpeed()*1.03?s.stamina-=.068*T*t:_<2.2?s.stamina+=.05*t:s.stamina+=.014*t,s.stamina=ht(s.stamina,0,1),Bp(s,t,!1)}function Bp(s,t,e){let i=e?0:s.speed;i>.05&&(s.gait+=i*t/Ir(i))}function Vp(s){let t=s.length;for(let e=0;e<t;e++){let i=s[e];for(let n=e+1;n<t;n++){let r=s[n],a=r.pos.x-i.pos.x,o=r.pos.z-i.pos.z,l=a*a+o*o,c=.62;if(l<c*c&&l>1e-8){let h=Math.sqrt(l),u=(c-h)*.5,d=a/h,p=o/h,g=i.action&&i.action.type==="slide"?.3:1,x=r.action&&r.action.type==="slide"?.3:1,f=g+x;i.pos.x-=d*u*2*(g/f),i.pos.z-=p*u*2*(g/f),r.pos.x+=d*u*2*(x/f),r.pos.z+=p*u*2*(x/f)}else l<=1e-8&&(r.pos.x+=.05)}}}var Jt=me,ds=class{constructor(){this.pos=new at(0,Jt,0),this.prevPos=new at(0,Jt,0),this.vel=new at,this.spin=new at,this.sideSpin=0,this.q=[0,0,0,1],this.prevQ=[0,0,0,1],this.state="dead",this.owner=null,this.lastTouch=null,this.lastTouchTime=-10,this.lastKick=null,this.lastValid=new at(0,Jt,0),this.crossing=[null,null],this.net=[null,null],this.version=0,this.onGround=!0}place(t,e,i=Jt){this.net[0]=this.net[1]=null,this.pos.set(t,i,e),this.prevPos.copy(this.pos),this.vel.set(0,0,0),this.spin.set(0,0,0),this.sideSpin=0,this.crossing[0]=this.crossing[1]=null,this.version++}setVelocity(t){this.vel.copy(t),this.version++}get speed(){return this.vel.len()}get airborne(){return this.pos.y>Jt+.04||Math.abs(this.vel.y)>.3}};function Fu(s,t=0){let e=Ri.ROLL_A0,i=Ri.ROLL_C,n=Math.sqrt(i/e),r=Math.sqrt(e*i);return(Math.atan(s*n)-Math.atan(t*n))/r}function tc(s,t){let e=Ri.ROLL_A0,i=Ri.ROLL_C,n=((e+i*t*t)*Math.exp(2*i*s)-e)/i;return Math.sqrt(Math.max(0,n))}var eE=new at;function Xp(s,t){let e=s.vel,i=s.pos,n=i.y<=Jt+.002&&Math.abs(e.y)<.05;if(s.onGround=n,n){i.y=Jt,e.y=0;let r=Math.sqrt(e.x*e.x+e.z*e.z);if(r>0){let a=(Ri.ROLL_A0+Ri.ROLL_C*r*r)*t,o=r-a;o<.035?(e.x=0,e.z=0):(e.x*=o/r,e.z*=o/r)}s.spin.x=e.z/Jt,s.spin.z=-e.x/Jt,s.spin.y*=.96,s.sideSpin*=.9}else{e.y-=Wl*t;let r=e.len(),a=Ri.AIR_DRAG*r*t;if(e.x-=e.x*a,e.y-=e.y*a,e.z-=e.z*a,s.sideSpin!==0){let o=Ri.MAGNUS*s.sideSpin*t,l=e.x,c=e.z;e.x+=o*c,e.z-=o*l,s.sideSpin*=1-.3*t}s.spin.x*=1-.05*t,s.spin.y*=1-.05*t,s.spin.z*=1-.05*t}i.x+=e.x*t,i.y+=e.y*t,i.z+=e.z*t}function qp(s,t){let e=s.pos,i=s.vel;if(e.y<Jt)if(e.y=Jt,i.y<-.9){let n=-i.y;i.y=n*Ri.BOUNCE*(n>7?.92:1),i.x*=Ri.BOUNCE_FRICTION,i.z*=Ri.BOUNCE_FRICTION,s.sideSpin*=.6,t&&t.onBounce&&t.onBounce(s,n)}else i.y=0}function Wp(s,t,e,i,n,r,a,o,l){let c=s.pos,h=s.vel;if(c.y<i-Jt||c.y>n+Jt)return!1;let u=c.x-t,d=c.z-e,p=ht(c.y,i,n),g=c.y-p,x=u*u+d*d+g*g,f=Jt+r;if(x>=f*f||x<1e-10)return!1;let m=Math.sqrt(x),v=u/m,w=g/m,b=d/m,_=f-m;c.x+=v*_,c.y+=w*_,c.z+=b*_;let M=h.x*v+h.y*w+h.z*b;return M<0&&(h.x-=(1+a)*M*v,h.y-=(1+a)*M*w,h.z-=(1+a)*M*b,h.x*=.92,h.z*=.92,h.y*=.95,s.sideSpin*=.3,s.version++,o&&o.onFrame&&-M>1.2&&o.onFrame(s,-M,l)),!0}function q1(s,t,e,i,n,r,a){let o=s.pos,l=s.vel,c=ht(o.z,-i,i),h=o.x-t,u=o.y-e,d=o.z-c,p=h*h+u*u+d*d,g=Jt+n;if(p>=g*g||p<1e-10)return!1;let x=Math.sqrt(p),f=h/x,m=u/x,v=d/x,w=g-x;o.x+=f*w,o.y+=m*w,o.z+=v*w;let b=l.x*f+l.y*m+l.z*v;return b<0&&(l.x-=(1+r)*b*f,l.y-=(1+r)*b*m,l.z-=(1+r)*b*v,l.x*=.93,l.z*=.93,s.version++,a&&a.onFrame&&-b>1.2&&a.onFrame(s,-b,"bar")),!0}function jl(s){let t=ht(s/ft.H,0,1);return Z.HL+ft.DEPTH+(ft.TOP_DEPTH-ft.DEPTH)*t}var Uu=.42;function zu(s,t,e,i,n,r,a){let o=s.vel,l=o.x*t+o.y*e+o.z*i;if(l<0){let u=Math.min(1,(35+900*n)*r),d=-l*u;o.x+=t*d,o.y+=e*d,o.z+=i*d}else{let u=40*n*r;if(o.x+=t*u,o.y+=e*u,o.z+=i*u,l=o.x*t+o.y*e+o.z*i,l>1.2){let d=l-1.2;o.x-=t*d,o.y-=e*d,o.z-=i*d}}let c=1-Math.min(.5,4*r);if(o.x*=c,o.z*=c,n>Uu){let u=n-Uu;s.pos.x+=t*u,s.pos.y+=e*u,s.pos.z+=i*u}let h=s.net[a]||(s.net[a]={x:0,y:0,z:0,depth:0,nx:t,ny:e,nz:i,count:0});h.count++,n>=h.depth&&(h.x=s.pos.x,h.y=s.pos.y,h.z=s.pos.z,h.depth=Math.min(n,Uu),h.nx=t,h.ny=e,h.nz=i),s.version++}function Ql(s,t,e,i,n){let r=s.pos,a=s.vel,o=Z.HL,l=ft.HW,c=ft.H,h=ft.POST_R,u=r.x*t;if(u<o-1.5||u>o+ft.DEPTH+1)return;let d=t*(o-h);if(Wp(s,d,l+h,0,c+h,h,.62,n,"post"),Wp(s,d,-(l+h),0,c+h,h,.62,n,"post"),q1(s,d,c+h,l+h,h,.6,n),u<o-Jt)return;let p=jl(r.y),g=s.crossing[e];if(g&&g.inMouth&&u>o||Math.abs(r.z)<l&&r.y<c&&u<p){let f=p-u;if(f<Jt){let v=(ft.TOP_DEPTH-ft.DEPTH)/ft.H,w=-t,b=v,_=Math.hypot(1,v);w/=_,b/=_,zu(s,w,b,0,(Jt-f)/_,i,e)}if(l-Math.abs(r.z)<Jt){let v=Math.sign(r.z)||1;zu(s,0,0,-v,Jt-(l-Math.abs(r.z)),i,e)}c-r.y<Jt&&u>o&&zu(s,0,-1,0,Jt-(c-r.y),i,e);let m=jl(Math.min(r.y,c))+.45;u>m&&(r.x=t*m,a.x*t>0&&(a.x*=-.1)),Math.abs(r.z)>l+.45&&(r.z=Math.sign(r.z)*(l+.45),a.z*=-.1),r.y>c+.45&&(r.y=c+.45,a.y>0&&(a.y*=-.1))}else if(u>o-Jt&&u<p+Jt&&r.y<c+Jt){let f=Math.abs(r.z)-l;if(f>-Jt&&f<Jt&&u>o){let m=Math.sign(r.z)||1,v=Jt-f;r.z+=m*v,a.z*m<0&&(a.z=-a.z*.15,a.x*=.7,a.y*=.8,s.version++)}else if(r.y>c-Jt&&Math.abs(r.z)<l&&u>o&&u<p){let m=Jt-(r.y-c);m>0&&(r.y+=m,a.y<0&&(a.y=-a.y*.2,a.x*=.8,a.z*=.8,s.version++))}else if(u>p-Jt&&u<p+Jt&&Math.abs(r.z)<l&&r.y<c){let m=p+Jt-u;m>0&&(r.x+=t*m,a.x*t<0&&(a.x=-a.x*.15,s.version++))}}}function Y1(s){let t=s.pos,e=s.vel;t.x>ui.HL-Jt&&(t.x=ui.HL-Jt,e.x>0&&(e.x=-e.x*.3)),t.x<-ui.HL+Jt&&(t.x=-ui.HL+Jt,e.x<0&&(e.x=-e.x*.3)),t.z>ui.HW-Jt&&(t.z=ui.HW-Jt,e.z>0&&(e.z=-e.z*.3)),t.z<-ui.HW+Jt&&(t.z=-ui.HW+Jt,e.z<0&&(e.z=-e.z*.3)),t.y>40&&(t.y=40,e.y>0&&(e.y=0))}function K1(s,t){for(let e=0;e<2;e++){let i=e===0?1:-1,n=t*i,r=s.pos.x*i;n<Z.HL&&r>=Z.HL?s.crossing[e]={z:s.pos.z,y:s.pos.y,inMouth:Math.abs(s.pos.z)<ft.HW&&s.pos.y<ft.H}:r<Z.HL-.5&&(s.crossing[e]=null)}}function Yp(s,t,e){if(s.prevPos.copy(s.pos),s.prevQ[0]=s.q[0],s.prevQ[1]=s.q[1],s.prevQ[2]=s.q[2],s.prevQ[3]=s.q[3],s.state==="held"||s.state==="dead"){$p(s,t);return}let i=s.vel.len(),n=Math.min(10,Math.max(1,Math.ceil(i*t/.06))),r=t/n;for(let a=0;a<n;a++){let o=s.pos.x;Xp(s,r),qp(s,e),Ql(s,1,0,r,e),Ql(s,-1,1,r,e),Y1(s),K1(s,o),e&&e.bodies&&e.bodies(s,r)}!s.pos.isFinite()||!s.vel.isFinite()?(s.pos.copy(s.lastValid),s.vel.set(0,0,0),s.version++):s.lastValid.copy(s.pos),s.pos.y>Jt+.03||s.vel.y>.2?s.state==="free"&&(s.state="air"):s.state==="air"&&(s.state="free"),$p(s,t)}function $p(s,t){let e=s.spin,i=s.q,n=.5*t*e.x,r=.5*t*e.y,a=.5*t*e.z,o=i[0],l=i[1],c=i[2],h=i[3];i[0]=o+(n*h+r*c-a*l),i[1]=l+(r*h+a*o-n*c),i[2]=c+(a*h+n*l-r*o),i[3]=h-(n*o+r*l+a*c);let u=Math.hypot(i[0],i[1],i[2],i[3])||1;i[0]/=u,i[1]/=u,i[2]/=u,i[3]/=u}var Lr=class{constructor(t=200,e=1/60){this.steps=t,this.step=e,this.pts=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.count=0,this.t0=0,this.ghost=new ds}compute(t,e){let i=this.ghost;i.pos.copy(t.pos),i.vel.copy(t.vel),i.sideSpin=t.sideSpin,i.state="free",i.spin.set(0,0,0),i.net[0]=i.net[1]=null,this.t0=e;let n=2,r=this.step/n,a=0;for(;a<this.steps;a++){this.pts[a*3]=i.pos.x,this.pts[a*3+1]=i.pos.y,this.pts[a*3+2]=i.pos.z,this.vel[a*3]=i.vel.x,this.vel[a*3+1]=i.vel.y,this.vel[a*3+2]=i.vel.z;for(let o=0;o<n;o++)Xp(i,r),qp(i,null),Ql(i,1,0,r,null),Ql(i,-1,1,r,null);if(i.vel.x===0&&i.vel.z===0&&i.pos.y<=Jt+.001){a++;break}}return this.count=a,this}at(t,e){let i=t/this.step;i<=0&&(i=0);let n=Math.floor(i);if(n>=this.count-1){let l=(this.count-1)*3;return e.set(this.pts[l],this.pts[l+1],this.pts[l+2])}let r=i-n,a=n*3,o=a+3;return e.set(this.pts[a]+(this.pts[o]-this.pts[a])*r,this.pts[a+1]+(this.pts[o+1]-this.pts[a+1])*r,this.pts[a+2]+(this.pts[o+2]-this.pts[a+2])*r)}velAt(t,e){let i=Math.floor(Math.max(0,t)/this.step);return i>this.count-1&&(i=this.count-1),e.set(this.vel[i*3],this.vel[i*3+1],this.vel[i*3+2])}get duration(){return(this.count-1)*this.step}};var ka=new at,hE=new at;function Bu(s){return ht(6.2+s*.15,6.5,11.5)}function bn(s,t,e,i,n,r,a=12,o=null){let l=i-t,c=n-e,h=Math.hypot(l,c);if(h<.01)return 1;let u=l/h,d=c/h,p=0,g=s.players;for(let x=0;x<g.length;x++){let f=g[x];if(f.team===r||f===o||s.time<f.downUntil)continue;let m=f.pos.x-t,v=f.pos.z-e,w=m*u+v*d,b=Math.abs(m*d-v*u);if(w>-.4&&w<.9&&b<.9){p=Math.max(p,.9);continue}if(w<.6||w>h+1.2)continue;let _=f.isGK?1.5:.95,M=Math.min(w,h)/a,T=Math.max(0,b-_)/6.2+.22,y=ht((M-T+.3)/.55,0,1);y>p&&(p=y)}return 1-p}function kr(s,t,e,i=.75,n=0){e.set(t.pos.x,0,t.pos.z);let r=0;for(let a=0;a<3;a++){let o=Math.hypot(e.x-s.x,e.z-s.z),l=Bu(o)+n,c=Math.min(26,tc(o,l));r=Fu(c,l),e.x=t.pos.x+t.vel.x*r*i,e.z=t.pos.z+t.vel.z*r*i}return Dn(e,.8),r}function Dn(s,t=.5){return s.x=ht(s.x,-Z.HL+t,Z.HL-t),s.z=ht(s.z,-Z.HW+t,Z.HW-t),s}function Zp(s,t,e,i,n=.72){let r=Kp(s,t,e,i,n);return!r&&n>=1&&(r=Kp(s,t,e,null,1.6)),r}function Kp(s,t,e,i,n){let r=null,a=-1/0,o=-1/0;for(let l of s.players){if(l===t||l.team!==t.team||s.time<l.downUntil)continue;kr(t.pos,l,ka,.6);let c=ka.x-t.pos.x,h=ka.z-t.pos.z,u=Math.hypot(c,h);if(u<2.2||u>48)continue;let d=Math.abs(us(e,Math.atan2(c,h)));if(d>n)continue;let p=1-d/n,g=u<5?.55:u<26?1-Math.abs(u-14)/30:Math.max(0,.6-(u-26)/30),x=bn(s,t.pos.x,t.pos.z,ka.x,ka.z,t.team,12),f=p*p*1.8+g*.45+x*(n>.9?1.1:.8);l.isGK&&(f-=.7),l===i&&(f+=.3,o=f),f>a&&(a=f,r=l)}return i&&r!==i&&o>-1/0&&a<o+.12&&(r=i),!r||a<.35?null:r}function Nr(s,t,e,i){let n=t.x-s.x,r=t.z-s.z,a=Math.hypot(n,r),o=ht(tc(a,e),4,27);return i.set(n/a*o,0,r/a*o),o}function Jp(s,t){let e=1.5,i=12;for(let n=0;n<24;n++){let r=(e+i)/2;Fu(tc(s,r),r)>t?e=r:i=r}return(e+i)/2}var Nn=new ds;function jp(s,t,e,i,n,r,a,o,l){Nn.pos.set(s,t,e),Nn.vel.set(i,n,r),Nn.sideSpin=a;let c=1/120,h=0;for(;h<o;){let u=Nn.vel;u.y-=Wl*c;let d=u.len(),p=Ri.AIR_DRAG*d*c;if(u.x-=u.x*p,u.y-=u.y*p,u.z-=u.z*p,Nn.pos.addScaled(u,c),h+=c,l&&l(Nn.pos,h)||Nn.pos.y<me)return h}return h}function ic(s,t,e,i,n){let r=e.x-s.x,a=e.z-s.z,o=Math.hypot(r,a),l=r/o,c=a/o,h=Math.cos(i),u=Math.sin(i),d=3,p=40;for(let x=0;x<22;x++){let f=(d+p)/2;jp(s.x,t,s.z,l*h*f,u*f,c*h*f,0,6,null),Math.hypot(Nn.pos.x-s.x,Nn.pos.z-s.z)<o?d=f:p=f}let g=(d+p)/2;return n.set(l*h*g,u*g,c*h*g),g}function Qp(s,t,e,i,n,r,a){let o=i-s,l=r-e,c=Math.hypot(o,l),h=o/c,u=l/c,d=-.25,p=.75;for(let g=0;g<20;g++){let x=(d+p)/2,f=-100;jp(s,t,e,h*Math.cos(x)*a,Math.sin(x)*a,u*Math.cos(x)*a,0,3,m=>(m.x-s)*h+(m.z-e)*u>=c?(f=m.y,!0):!1),f===-100&&(f=-1),f<n?d=x:p=x}return(d+p)/2}var Z1=new Lr(240,1/60),ec=new ds;function tm(s,t,e,i){ec.pos.copy(s),ec.vel.copy(t),ec.sideSpin=e||0;let n=Z1.compute(ec,0),r=n.pts;for(let a=1;a<n.count;a++){let o=r[(a-1)*3]*i,l=r[a*3]*i;if(o<Z.HL&&l>=Z.HL){let c=(Z.HL-o)/(l-o||1),h=r[(a-1)*3+2]+(r[a*3+2]-r[(a-1)*3+2])*c,u=r[(a-1)*3+1]+(r[a*3+1]-r[(a-1)*3+1])*c;return Math.abs(h)<ft.HW&&u<ft.H}}return!1}function Hu(s,t,e){let i=e*Z.HL,n=Math.atan2(ft.HW-t,Math.abs(i-s)),r=Math.atan2(-ft.HW-t,Math.abs(i-s));return Math.abs(n-r)}var J1={pass:.11,through:.12,shot:.085,cross:.17,lob:.15,clear:.13,throw:.32,gkthrow:.32,gkkick:.36,touch:.05},j1={shot:.34,pass:.26,through:.26,cross:.3,lob:.3,clear:.3,throw:.35,gkthrow:.35,gkkick:.45},ac=new Set(["pass","through","cross","lob","throw","gkthrow","gkkick"]),nc=new at,gE=new at,xE=new at;function em(s,t,e=0){let i=t.pos.x-s.pos.x,n=t.pos.z-s.pos.z,r=Math.sqrt(i*i+n*n);return!(r>1.1+e||t.pos.y>1||r>.8&&i*Math.sin(s.yaw)+n*Math.cos(s.yaw)<-.2)}function Gu(s,t,e=.7){let i=s.ball;if(em(t,i))return 0;if(i.state==="held"||i.state==="dead"||i.owner&&i.owner!==t)return null;let n=s.traj,r=1/60;for(let a=r;a<=e;a+=r){n.at(a+(s.time-n.t0),nc);let o=t.pos.x+t.vel.x*a*.8,l=t.pos.z+t.vel.z*a*.8;if(Math.hypot(nc.x-o,nc.z-l)<.95&&nc.y<.95)return a}return null}function Q1(s,t){let e=t.pos.x-s.pos.x,i=t.pos.z-s.pos.z,n=e*Math.cos(s.yaw)-i*Math.sin(s.yaw);return n>.25?"L":n<-.25?"R":s.foot||"R"}function fs(s,t){if(s.time<t.downUntil)return!1;let e=t.action;return e?e.type==="kick"&&e.contacted?e.t>e.contactT+.1:e.type==="tackle"?e.t>.4:!1:!0}function ce(s,t,e,i={}){let n=i.minContact??J1[e]??.12,r={type:"kick",kind:e,t:0,charging:!!i.charging,holdT:0,charge:i.charge??0,minContact:n,deadline:i.deadline??n+.75,contacted:!1,contactT:0,follow:j1[e]??.28,target:i.target||null,point:i.point?new at().copy(i.point):null,aimYaw:i.aimYaw??t.yaw,aimPitch:i.aimPitch??0,power:i.power??.6,elev:i.elev??null,firstTime:!!i.firstTime,restart:i.restart||null,foot:Q1(t,s.ball),eta:n,fromHands:e==="throw"||e==="gkthrow"||e==="gkkick",ai:!!i.ai,owned:s.ball.owner===t};return t.action=r,r}function Ns(s){if(!s||!s.charging)return;s.charging=!1;let t=s.kind==="shot"?.085:.02;s.minContact=Math.max(s.minContact,s.t+t),s.deadline=s.minContact+.6}function im(s){let t=s.action;if(!t)return 1/0;let e=s.jogSpeed();return t.type==="kick"?t.fromHands?t.contacted?e*.5:1.2:t.contacted?e*.85:t.kind==="shot"&&t.charging?e*.7:t.inReach?e*.85:1/0:t.type==="tackle"?t.t<.32?t.lunge||4.2:2.2:t.type==="slide"?t.sliding?1/0:.4:(t.type==="celebrate",1/0)}function t_(s,t,e){return e.kind==="shot"?e.aimYaw:e.target?Bt(e.target.pos.x-t.pos.x,e.target.pos.z-t.pos.z):e.point?Bt(e.point.x-t.pos.x,e.point.z-t.pos.z):e.aimYaw}function nm(s,t,e){let i=t.action;if(i)switch(i.t+=e,i.type){case"kick":e_(s,t,i,e);break;case"tackle":a_(s,t,i,e);break;case"slide":o_(s,t,i,e);break;case"celebrate":i.t>i.dur&&(t.action=null);break;case"stumble":i.t>i.dur&&(t.action=null);break;case"dive":break;default:i.dur&&i.t>i.dur&&(t.action=null)}}function e_(s,t,e,i){let n=s.ball;if(e.charging&&(e.holdT+=i,e.kind==="shot"?(e.charge=Math.min(1,e.holdT/.65),e.holdT>=.85&&Ns(e)):(e.charge=Math.min(1,Math.max(0,e.holdT-.1)/.3),e.holdT>=.4&&Ns(e))),e.contacted)e.t>e.contactT+e.follow&&(t.action=null,t.faceYaw=null);else{if(t.faceYaw=t_(s,t,e),e.owned&&!e.restart&&n.owner!==t&&n.lastTouch!==t){t.action=null,t.faceYaw=null;return}let r=!n.owner||n.owner===t,a=e.restart?!0:e.fromHands?n.state==="held"&&n.owner===t:n.state!=="held"&&n.state!=="dead",o=e.fromHands||e.restart?!0:em(t,n);if(e.inReach=o,e.charging||(e.eta=Math.max(0,e.minContact-e.t)),!e.charging&&e.t>=e.minContact&&r&&a&&o){e.contacted=!0,e.contactT=e.t,n_(s,t,e);return}if(!e.fromHands&&!e.restart&&r&&a&&!e.charging){let l=n.pos.x+n.vel.x*.15,c=n.pos.z+n.vel.z*.15,h=t.pos.x-l,u=t.pos.z-c,d=Math.hypot(h,u)||1;h=h/d*.7-Math.sin(t.faceYaw)*.3,u=u/d*.7-Math.cos(t.faceYaw)*.3;let p=Math.hypot(h,u)||1,g=l+h/p*.45,x=c+u/p*.45,f=g-t.pos.x,m=x-t.pos.z,v=Math.hypot(f,m);if(v<4){let w=Math.min(8,v*6)/(v||1);t.desired.x=f*w+n.vel.x,t.desired.z=m*w+n.vel.z}}!e.charging&&e.t>e.deadline&&(e.contacted=!0,e.missed=!0,e.contactT=e.t,s.events.emit("whiff",{player:t,kind:e.kind,t:s.time}))}}function sc(s){return s.gauss()}function i_(s,t){let e=99;for(let i of s.players){if(i.team===t.team)continue;let n=i.pos.distXZ(t.pos);n<e&&(e=n)}return ht((2.4-e)/2.4,0,1)}function rc(s,t){let e=Math.cos(t),i=Math.sin(t),n=s.x*e+s.z*i,r=-s.x*i+s.z*e;return s.x=n,s.z=r,s}function n_(s,t,e){let i=s.ball,n=s.rng,r=new at,a=0,o=e.point?e.point.clone():null,l=s.attackDir(t.team),c=t.isHuman,h=c?s.assist:null,u=!c&&s.isOpp(t)?s.aiParams[t.team]:null,d=ht(t.speed/7.5,0,1),p=i_(s,t),g=!1,x=e.target,f=i.pos;e.kind==="throw"?i.pos.set(t.pos.x+Math.sin(t.yaw)*.25,2.05,t.pos.z+Math.cos(t.yaw)*.25):e.kind==="gkthrow"?i.pos.set(t.pos.x+Math.sin(t.yaw)*.6,.35,t.pos.z+Math.cos(t.yaw)*.6):e.kind==="gkkick"&&i.pos.set(t.pos.x+Math.sin(t.yaw)*.55,.7,t.pos.z+Math.cos(t.yaw)*.55),f=i.pos;let m=T=>{let y;return T==="shot"?y=(.011+(100-t.attrs.finishing)*45e-5)*(1+.45*d+.6*p):y=(.004+(100-t.attrs.passing)*22e-5)*(1+.35*d+.45*p),c&&h&&(y*=T==="shot"?h.shotError:h.passError),u&&(y*=T==="shot"?u.shotErr:u.passErr),e.foot!==t.foot&&(y*=1.12),y};switch(e.kind){case"pass":case"gkthrow":{if(x){o=new at,kr(f,x,o,x.isGK?0:.75,e.charge*3);let T=f.distXZ(o),y=x.isGK?3.5:Bu(T)+e.charge*4.5;c&&h.autoLob&&e.kind==="pass"&&!e.restart&&T>7&&!x.isGK&&bn(s,f.x,f.z,o.x,o.z,t.team,12)<.45?(ic(f,f.y,o,ht(.42+T*.006,.42,.62),r),e.lofted=!0):Nr(f,o,y,r)}else{let T=(e.kind==="gkthrow"?18:11)+e.charge*18;o=o||new at(f.x+Math.sin(e.aimYaw)*T,0,f.z+Math.cos(e.aimYaw)*T),Dn(o,.6),Nr(f,o,2.4,r)}rc(r,sc(n)*m("pass")),e.kind==="gkthrow"&&(r.y=-.5);break}case"through":{if(x){o=s_(s,x,o);let T=o.distXZ(x.pos)/x.sprintSpeed()+.28,y=f.distXZ(o);if(bn(s,f.x,f.z,o.x,o.z,t.team,11)<.4&&y>12)ic(f,f.y,o,.62,r);else{let C=ht(Jp(y,T),2.6,10);Nr(f,o,C,r)}}else o=new at(f.x+Math.sin(e.aimYaw)*17,0,f.z+Math.cos(e.aimYaw)*17),Dn(o,1),Nr(f,o,3.2,r);rc(r,sc(n)*m("pass"));break}case"cross":case"lob":case"clear":case"gkkick":case"throw":{!o&&x&&(o=new at,kr(f,x,o,.6)),o||(o=new at(f.x+Math.sin(e.aimYaw)*25,0,f.z+Math.cos(e.aimYaw)*25)),Dn(o,.5);let T=e.elev??(e.kind==="cross"?.4:e.kind==="clear"?.6:e.kind==="throw"?.42:e.kind==="gkkick"?.55:.5),y=ic(f,f.y,o,T,r);e.kind==="throw"&&y>15.5&&r.scale(15.5/y),rc(r,sc(n)*m("pass")*1.2),r.y*=1+sc(n)*.03;break}case"shot":{let T=r_(s,t,e,r,m("shot"));a=T.spin,o=T.point;break}case"touch":{o=new at(f.x+Math.sin(e.aimYaw)*4,0,f.z+Math.cos(e.aimYaw)*4),Nr(f,o,2,r);break}}if(u&&ac.has(e.kind)&&e.kind!=="throw"&&n.next()<u.mistake){rc(r,(n.next()<.5?-1:1)*(.1+n.next()*.22));let T=n.next()<.6?.55+n.next()*.2:1.18+n.next()*.2;r.x*=T,r.z*=T,r.y>0&&(r.y*=Math.sqrt(T)),e.mishit=!0}e.kind==="shot"&&(g=tm(f,r,a,l));let v=r.len(),w=r.x/(v||1),b=r.z/(v||1),_=r.y>3,M=(_?-1:1)*v/me*(_?.35:.6);i.spin.set(b*M,(a||0)*2,-w*M),i.sideSpin=a||0,s.applyKick(t,r,e,{point:o,target:x,onTarget:g})}function s_(s,t,e){let i=s.attackDir(t.team),n=i,r=0,a=t.speed;a>1.5&&t.vel.x*i>0&&(n+=t.vel.x/a*.9,r+=t.vel.z/a*.9),Math.abs(t.pos.z)>11&&(r-=Math.sign(t.pos.z)*.35);let o=Math.hypot(n,r);n/=o,r/=o;let l=9;for(let u of s.players){if(u.team===t.team||u.isGK)continue;let d=u.pos.x-t.pos.x,p=u.pos.z-t.pos.z,g=d*n+p*r,x=Math.abs(d*r-p*n);g>0&&x<4&&(l=Math.min(l,g+1.5))}let c=ht(l,4.5,9),h=e?e.clone():new at(t.pos.x+n*c,0,t.pos.z+r*c);return h.x=ht(h.x,-Z.HL+1.5,Z.HL-1.5),h.z=ht(h.z,-Z.HW+1.5,Z.HW-1.5),h}function r_(s,t,e,i,n){let r=s.ball,a=s.rng,o=s.attackDir(t.team),l=o*Z.HL,c=t.isHuman?s.assist.shotAim:0,h;if(e.ai&&e.point)h=e.point.clone();else{let b=t.pos.x,_=t.pos.z,M=Math.cos(e.aimPitch),T=Math.sin(e.aimYaw)*M,y=Math.sin(e.aimPitch),E=Math.cos(e.aimYaw)*M;if(T*o>.25&&(l-b)*o>1){let L=(l-b)/T;h=new at(l,1.65+y*L,_+E*L);let R=Math.abs(h.z),D=ft.HW-.4;if(R>D&&R<ft.HW+1.8){let N=R-D,F=c*.6*ht(1-(R-ft.HW)/1.8,0,1);h.z-=Math.sign(h.z)*N*F}h.y>ft.H-.3&&h.y<ft.H+1.3&&(h.y-=(h.y-(ft.H-.35))*c*.45),h.y=ht(h.y,me,4.5)}else h=new at(b+T*22,ht(1.65+y*22,me,7),_+E*22)}let u=e.ai?e.power:e.charge,d=La(15.5,29,Math.pow(ht(u,0,1),.85))*(.86+t.attrs.finishing*.0028);h.y+=u*u*.3;let p=Math.atan2(h.x-r.pos.x,h.z-r.pos.z),g=Qp(r.pos.x,r.pos.y,r.pos.z,h.x,h.y,h.z,d);g=ht(g,-.12,.62);let x=Math.abs(us(t.yaw,p))/Math.PI,f=n*(1+x*.8)*(.75+.45*u);p+=a.gauss()*f,g+=a.gauss()*f*.55;let m=Math.cos(g);return i.set(Math.sin(p)*m*d,Math.sin(g)*d,Math.cos(p)*m*d),{spin:a.gauss()*4,point:h}}function oc(s,t){let e=s.time;if(e<t.tackleReadyAt||!fs(s,t))return!1;let i=s.ball,n=t.yaw,r=i.pos.distXZ(t.pos),a=t.isHuman&&r<3.4&&i.state!=="held"&&i.state!=="dead";(r<2.6||a)&&(n=Bt(i.pos.x+i.vel.x*.15-t.pos.x,i.pos.z+i.vel.z*.15-t.pos.z));let o=a?ht((r-.5)/.26+1.5,4.2,7.5):4.2;return t.action={type:"tackle",t:0,dir:n,done:!1,dur:.5,victims:new Set,homing:a,lunge:o},t.tackleReadyAt=e+Me.TACKLE_COOLDOWN,t.faceYaw=n,s.events.emit("tackleAttempt",{player:t,t:e}),!0}function a_(s,t,e,i){let n=s.ball,r=s.time;e.homing&&!e.done&&e.t<.2&&(e.dir=Bt(n.pos.x+n.vel.x*.1-t.pos.x,n.pos.z+n.vel.z*.1-t.pos.z)),t.faceYaw=e.dir;let a=Math.sin(e.dir),o=Math.cos(e.dir);e.t<(e.homing?.28:.22)&&(t.desired.x=a*e.lunge,t.desired.z=o*e.lunge);let l=e.homing?.04:.07,c=e.homing?.36:.3;if(!e.done&&e.t>=l&&e.t<=c){let h=e.homing?1.2:1.05,u=e.homing?.38:.3,d=t.pos.x+a*.2,p=t.pos.z+o*.2,g=t.pos.x+a*h,x=t.pos.z+o*h,f=nn(n.pos.x,n.pos.z,d,p,g,x),m=n.owner;if(f.d<u+me&&n.pos.y<.6&&n.state!=="held"&&n.state!=="dead"){if(e.done=!0,e.contactT=e.t,t.touch={foot:"R",time:r,x:n.pos.x,y:n.pos.y,z:n.pos.z,kind:"tackle"},m&&m.team!==t.team){let v=n.pos.x-m.pos.x,w=n.pos.z-m.pos.z,b=Math.hypot(v,w)||1,_=t.pos.x-n.pos.x,M=t.pos.z-n.pos.z,T=Math.hypot(_,M)||1,y=(v*_+w*M)/(b*T),E=.56+(t.attrs.tackling-m.attrs.control)*.007+y*.26-ht(m.speed/8,0,1)*.1;!t.isHuman&&s.aiParams[t.team]&&(E+=s.aiParams[t.team].tackleBonus),t.isHuman&&(E+=s.assist.tackle),m.isHuman&&(E-=s.assist.oppProtect),E=ht(E,m.isHuman?.1:.18,t.isHuman?.96:.93);let C=s.rng.next()<E;if(C&&t.isHuman){let L=(s.rng.next()-.5)*.6;s.dislodge(m,t,new at(-a*1.3+o*L,0,-o*1.3-a*L)),e.dur=Math.min(e.dur,e.t+.08)}else if(C){let L=s.rng.next()<.5?-1:1,R=-a*.2+o*L*.6+v/b*.5,D=-o*.2-a*L*.6+w/b*.5,N=Math.hypot(R,D)||1,F=2.2+s.rng.next()*1.8;s.dislodge(m,t,new at(R/N*F,0,D/N*F))}else s.events.emit("tackle",{player:t,victim:m,success:!1,t:r}),m.stumbleUntil=Math.max(m.stumbleUntil,r+.15)}else if(!m||m===t)if(t.isHuman)n.setVelocity(new at(t.vel.x*.7,0,t.vel.z*.7)),n.state="free",n.owner=null,s.touchBall(t,"poke"),e.dur=Math.min(e.dur,e.t+.05);else{let v=Math.max(3,n.speed*.3);n.setVelocity(new at(a*v,0,o*v)),n.state="free",n.owner=null,s.touchBall(t,"poke")}}else if(m&&m.team!==t.team&&!e.victims.has(m)&&nn(m.pos.x,m.pos.z,d,p,g,x).d<.42){e.victims.add(m);let b=Math.cos(m.yaw)*(t.pos.z-m.pos.z)+Math.sin(m.yaw)*(t.pos.x-m.pos.x)<-.2?.6:.18;s.rng.next()<b&&s.foul(t,m,!1)}}e.t>e.dur&&(t.action=null,t.faceYaw=null)}function lc(s,t,e={}){let i=s.time,n=t.action;if(e.force){if(i<t.downUntil||n&&n.type==="slide"&&n.sliding||n&&n.type==="kick"&&n.contacted&&n.t<=n.contactT+.1)return!1;s.ball.owner===t&&s.loseControl("loose")}else if(i<t.slideReadyAt||!fs(s,t)||t.stamina<.06)return!1;let r=t.yaw;t.speed>1.2?r=Bt(t.vel.x,t.vel.z):t.desired.lenXZ()>.5&&(r=Bt(t.desired.x,t.desired.z));let a=Math.max(t.speed+1.2,6.3);return t.action={type:"slide",t:0,dir:r,speed0:a,sliding:!0,ballFirst:!1,victims:new Set,dur:1.05},t.slideReadyAt=i+Me.SLIDE_COOLDOWN,t.stamina=Math.max(0,t.stamina-.07),s.events.emit("slide",{player:t,t:i}),!0}function o_(s,t,e,i){let n=s.ball,r=s.time,a=Math.sin(e.dir),o=Math.cos(e.dir);if(t.faceYaw=e.dir,t.yaw=e.dir,e.sliding){let l=ht(1-e.t/.68,0,1),c=e.speed0*Math.pow(l,.8);t.vel.set(a*c,0,o*c),e.t>.62&&(e.sliding=!1,t.vel.set(a*.4,0,o*.4))}else t.desired.set(0,0,0);if(e.t>.04&&e.t<.62){let l=t.pos.x+a*.2,c=t.pos.z+o*.2,h=t.pos.x+a*1.1,u=t.pos.z+o*1.1;if(!e.ballDone&&n.state!=="held"&&n.state!=="dead"&&n.pos.y<.5&&nn(n.pos.x,n.pos.z,l,c,h,u).d<.28+me&&n.owner!==t){e.ballDone=!0,e.ballFirst=!0;let p=n.owner,g=s.rng.next()<.5?-1:1,x=Math.max(4.5,n.speed*.35),f=new at((a+o*g*.25)*x,.4,(o-a*g*.25)*x);t.touch={foot:"R",time:r,x:n.pos.x,y:n.pos.y,z:n.pos.z,kind:"slide"},p&&p.team!==t.team?s.dislodge(p,t,f,!0):(n.owner=null,n.state="free",n.setVelocity(f),s.touchBall(t,"slide"))}for(let d of s.players){if(d===t||d.team===t.team||e.victims.has(d))continue;nn(d.pos.x,d.pos.z,t.pos.x,t.pos.z,h,u).d<.42&&(e.victims.add(d),e.ballFirst?s.rng.next()<.5&&(d.stumbleUntil=r+.5):s.rng.next()<.85?s.foul(t,d,!0):d.downUntil=r+.7)}}e.t>e.dur&&(t.action=null,t.faceYaw=null)}var Be=new at;function Wu(s,t,e,i,n=0){let r=s.ownGoalX(t.team);return Math.sign(e)===Math.sign(r)&&Math.abs(e-r)<Kt.PEN_D+n&&Math.abs(i)<Kt.PEN_HW+n&&Math.abs(e)<=Z.HL+.5}function rm(s,t,e){return!t.isGK||s.phase!=="playing"||e.owner||e.state==="held"||e.state==="dead"||s.time<t.downUntil||s.time<t.noCaptureUntil?!1:Wu(s,t,e.pos.x,e.pos.z,.3)}function cc(s,t,e){let i=t.action;if(i&&i.type==="dive"){let a=Math.max(0,i.t-i.delay),o=ht(a/i.flight,0,1),l=La(1.25,i.handY,ht(a/(i.flight*.55),0,1)),c=La(1,ht(i.handY*.7,.25,1.5),ht(a/(i.flight*.5),0,1)),h=.45+.45*Math.min(1,o*1.6);return e.ax=t.pos.x-i.dirX*.35,e.ay=c,e.az=t.pos.z-i.dirZ*.35,e.bx=t.pos.x+i.dirX*h,e.by=l,e.bz=t.pos.z+i.dirZ*h,e.r=.2,e.diving=!0,e}let n=Math.sin(t.yaw),r=Math.cos(t.yaw);return e.ax=t.pos.x+n*.12,e.ay=.05,e.az=t.pos.z+r*.12,e.bx=e.ax,e.by=2.15,e.bz=e.az,e.r=t.ai.set?.42:.34,e.diving=!1,e}function am(s,t,e,i){let n=i.bx-i.ax,r=i.by-i.ay,a=i.bz-i.az,o=n*n+r*r+a*a,l=o>1e-9?((s-i.ax)*n+(t-i.ay)*r+(e-i.az)*a)/o:0;l=ht(l,0,1);let c=i.ax+n*l,h=i.ay+r*l,u=i.az+a*l;return{d:Math.hypot(s-c,t-h,e-u),t:l,cx:c,cy:h,cz:u}}var ps={};function om(s,t,e){cc(s,t,ps);let i=am(e.pos.x,e.pos.y,e.pos.z,ps);if(i.d>ps.r+me)return!1;let n=s.time,r=e.speed,a=12.5+t.keeping*.09;ps.diving&&(a-=3.5),e.pos.y>1.9&&(a-=3);let o=i.d/(ps.r+me),l=s.attackDir(t.team),c=e.lastKick,h=c&&c.kind==="shot"&&c.team!==t.team?c:null;if(t.touch={foot:"H",time:n,x:e.pos.x,y:e.pos.y,z:e.pos.z,kind:"save"},e.lastTouch=t,e.lastTouchTime=n,r<a&&o<.92&&s.rng.next()>(r/a-.75)*1.4)return e.owner=t,e.state="held",e.vel.set(0,0,0),e.spin.set(0,0,0),e.version++,t.hold="gk",t.ai.holdStart=n,t.ai.state="hold",s.possTeam=t.team,s.passIntent=null,s.events.emit("save",{player:t,caught:!0,speed:r,shot:h,t:n}),s.events.emit("possession",{player:t,team:t.team,prev:null,cause:"catch",t:n}),!0;let u=Math.sign(e.pos.z-t.pos.z)||(s.rng.next()<.5?-1:1);if(r>a+9&&o>.8)e.vel.x*=.62,e.vel.z+=u*2.2,e.vel.y+=1;else{let d=2+r*.22;e.vel.set(l*d*(.5+s.rng.next()*.5),1.2+s.rng.next()*2.4,u*(2.5+r*.22))}return e.state="air",e.version++,t.noCaptureUntil=n+.3,s.events.emit("save",{player:t,caught:!1,speed:r,shot:h,t:n}),!0}function Vu(s,t,e,i,n,r=.07){let a=e-t.pos.z,o=i-t.pos.x,l=Math.abs(a),c=Math.sign(a)||1,h=ht(o,-.8,.8)*.3,u=Math.hypot(c,h),d=ht(l-.35,.3,1.95+t.keeping*.004);t.action={type:"dive",t:0,delay:r,flight:.56-t.keeping*8e-4,dist:d,dirX:h/u,dirZ:c/u,handY:ht(n,.15,2.3),dur:1.25},t.yaw=Bt(s.attackDir(t.team),0),s.events.emit("dive",{player:t,t:s.time})}function l_(s,t,e,i){let n=e.t-e.delay;if(n<0){t.vel.set(0,0,0);return}if(n<e.flight){let a=2*e.dist/e.flight*(1-n/e.flight);t.vel.set(e.dirX*a,0,e.dirZ*a)}else t.vel.set(0,0,0);let r=s.ball;if(r.owner&&r.owner.team!==t.team&&n>0&&n<e.flight&&!e.smotherDone&&(cc(s,t,ps),am(r.pos.x,r.pos.y,r.pos.z,ps).d<ps.r+me+.1&&(e.smotherDone=!0,s.rng.next()<.5+t.keeping*.004))){let o=s.attackDir(t.team);s.dislodge(r.owner,t,new at(o*2.5,.5,e.dirZ*3))}e.t>e.dur&&(t.action=null,t.ai.set=!1)}function sm(s,t,e,i){let n=s.traj,r=s.time-n.t0,a=n.pts;for(let o=1;o<n.count;o++){let l=o*n.step-r;if(l<0)continue;if(l>i)break;let c=a[(o-1)*3],h=a[o*3];if((t-c)*e>0&&(t-h)*e<=0){let u=(c-t)/(c-h||1e-6);return{t:l-n.step*(1-u),y:a[(o-1)*3+1]+(a[o*3+1]-a[(o-1)*3+1])*u,z:a[(o-1)*3+2]+(a[o*3+2]-a[(o-1)*3+2])*u}}}return null}function lm(s,t,e,i){let n=s.ball,r=s.time,a=t.ai,o=s.attackDir(t.team),l=-o*Z.HL;if(t.sprint=!1,t.faceYaw=null,t.action&&t.action.type==="dive"){l_(s,t,t.action,e),t.desired.set(0,0,0);return}if(r<t.downUntil){t.desired.set(0,0,0);return}if(n.state==="held"&&n.owner===t){let _=r-(a.holdStart??r),M=l+o*(Kt.PEN_D-2);Be.set(M,0,ht(t.pos.z,-6,6)),Ds(t,Be,1.6),t.faceYaw=Bt(o,0),!t.action&&(_>i.gkHold||_>Me.GK_MAX_HOLD-.4||_>.8&&h_(s,t))&&u_(s,t,i);return}if(s.phase!=="playing")return;let c=n.lastKick,h=!n.owner&&n.vel.x*-o>2.5;n.version!==a.seenVersion&&(a.seenVersion=n.version,a.reactAt=r+i.gkReaction*(.9+s.rng.next()*.25),c&&c.restart==="penalty"&&c.team!==t.team&&r-c.t<.05&&(a.reactAt=r+.12,a.penalty=!0));let u=t.pos.x,d=null;if(h){let _=sm(s,l,-o,2.4);_&&Math.abs(_.z)<ft.HW+.6&&_.y<ft.H+.4&&(d=sm(s,u+o*.05,-o,2.4)||_,Math.abs(n.pos.x-l)<Math.abs(u-l)+.2&&(d=_))}if(d){if(a.set=!0,t.faceYaw=Bt(n.pos.x-t.pos.x,n.pos.z-t.pos.z),r<a.reactAt){t.desired.set(0,0,0);return}let _=d.z-t.pos.z,M=Math.abs(_);if(a.penalty){a.penalty=!1;let y=s.rng.next()<.55?d.z:-Math.sign(d.z||1)*2;if(Math.abs(y-t.pos.z)>.6){Vu(s,t,y,t.pos.x,d.y,.02);return}}M<.5&&d.y<2.1?(Be.set(t.pos.x,0,d.z),Ds(t,Be,3)):M-.5<3*Math.max(0,d.t-.12)&&d.y<1.9&&d.t>.35?(Be.set(t.pos.x,0,d.z),t.sprint=!0,Ds(t,Be,5)):d.t<1.4&&Vu(s,t,d.z,t.pos.x+o*.2,d.y);return}a.set=!1;let p=s.passIntent;if(p&&p.target===t&&!n.owner&&r-p.t<4){let _=s.traj;for(let M=.05;M<3&&(_.at(M+(r-_.t0),Be),!(t.pos.distXZ(Be)/5.5<=M));M+=.05);Ds(t,Be,5.5),t.sprint=!0,t.faceYaw=Bt(n.pos.x-t.pos.x,n.pos.z-t.pos.z);return}if(!n.owner&&n.state!=="held"&&n.state!=="dead"){let _=s.traj,M=null;for(let T=.1;T<2.5;T+=.1){if(_.at(T+(r-_.t0),Be),!Wu(s,t,Be.x,Be.z,-.5))continue;if(t.pos.distXZ(Be)/6.2+.2<=T&&Be.y<2.2){M={t:T,x:Be.x,z:Be.z};break}}if(M&&c_(s,t.team,M.x,M.z)>M.t+.05){Be.set(M.x,0,M.z),t.sprint=!0,Ds(t,Be,6.2),t.faceYaw=Bt(n.pos.x-t.pos.x,n.pos.z-t.pos.z);return}}let g=n.owner;if(g&&g.team!==t.team&&Wu(s,t,g.pos.x,g.pos.z,1)){let _=Math.hypot(g.pos.x-l,g.pos.z),M=!1;for(let T of s.teams[t.team].players){if(T===t||T.isGK)continue;let y=nn(T.pos.x,T.pos.z,g.pos.x,g.pos.z,l,0);y.d<1.2&&y.t>.1&&(M=!0)}if(!M&&_<13){if(n.pos.distXZ(t.pos)<2&&r>(a.smotherReady||0)){a.smotherReady=r+1.5,Vu(s,t,n.pos.z,n.pos.x,.2,.05);return}let y=ht((_-2.5)/_,0,1);Be.set(l+(g.pos.x-l)*y,0,g.pos.z*y),t.sprint=!0,Ds(t,Be,5.5),t.faceYaw=Bt(g.pos.x-t.pos.x,g.pos.z-t.pos.z);return}}let x=n.pos.x,f=n.pos.z,m=x-l,v=f,w=Math.hypot(m,v)||1,b=ht(.7+(w-8)*.06,.6,3.2);Be.set(l+m/w*b,0,ht(v/w*b*1.2,-2.3,2.3)),(Be.x-l)*o<.4&&(Be.x=l+o*.4),Ds(t,Be,w<20?4:2.5),t.faceYaw=Bt(x-t.pos.x,f-t.pos.z)}function Ds(s,t,e){let i=t.x-s.pos.x,n=t.z-s.pos.z,r=Math.hypot(i,n);if(r<.08){s.desired.set(0,0,0);return}let a=Math.min(e,r*3.5);s.desired.set(i/r*a,0,n/r*a)}function c_(s,t,e,i){let n=99;for(let r of s.players){if(r.team===t)continue;let a=Math.hypot(r.pos.x-e,r.pos.z-i),o=Math.max(0,a-.8)/r.sprintSpeed()+.2;o<n&&(n=o)}return n}function h_(s,t){let e=s.human;return e&&e.team===t.team&&e.requestUntil>s.time}function u_(s,t,e){let i=s.attackDir(t.team),n=null,r=-1e9,a="gkthrow";for(let o of s.teams[t.team].players){if(o===t)continue;let l=t.pos.distXZ(o.pos);if(l<5)continue;let c=99;for(let p of s.players)p.team!==t.team&&(c=Math.min(c,p.pos.distXZ(o.pos)));let h=bn(s,t.pos.x,t.pos.z,o.pos.x,o.pos.z,t.team,11),u=o.isHuman?e.humanBonus+(o.requestUntil>s.time?.5:0):0;if(l<30){let p=h*1.2+Math.min(c,10)*.07-l*.01+u;p>r&&h>.45&&(r=p,n=o,a="gkthrow")}let d=s.uOf(t.team,o.pos.x);if(d>-.2&&c>3.5){let p=.35+d*.4+Math.min(c,10)*.05+u*.6;p>r&&(r=p,n=o,a="gkkick")}}n?(t.yaw=Bt(n.pos.x-t.pos.x,n.pos.z-t.pos.z),ce(s,t,a,{target:n,ai:!0})):ce(s,t,"gkkick",{point:new at(i*8,0,(s.rng.next()-.5)*20),ai:!0}),t.hold="gk",s.events.emit("distribute",{player:t,target:n,t:s.time})}var d_=new k(0,1,0),Ue=Array.from({length:24},()=>new k),hc=new oe,AE=new ze,_n=new _i,Te=(s,t,e)=>s+(t-s)*e,yi=(s,t,e)=>s<t?t:s>e?e:s,Mn=s=>(s=yi(s,0,1),s*s*(3-2*s));function f_(s,t,e){let i=t-s;for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;return s+i*e}function p_(s){return s-Math.floor(s)}var ie=()=>new k,$u={x:ie(),y:ie(),z:ie()},uc={d:ie(),bend:ie(),r:ie(),t:ie()},Ce={pelvis:ie(),waist:ie(),neck:ie(),fwd:ie(),side:ie(),hip:ie(),ankT:ie(),knee:ie(),ankle:ie(),pole:ie(),back:ie(),sh:ie(),tgt:ie(),off:ie(),elbow:ie(),hand:ie(),pole2:ie()},We={hands:ie(),body:ie(),axis:ie(),sh:ie(),pelvis:ie(),face:ie(),z:ie(),x:ie(),p1:ie(),p2:ie(),hip:ie(),knee:ie(),ankle:ie(),shp:ie(),tgt:ie(),elbow:ie(),hand:ie()};function ms(s,t,e,i){let n=$u.y.subVectors(t,e);n.lengthSq()<1e-8&&n.set(0,1,0),n.normalize();let r=$u.z.copy(i).addScaledVector(n,-i.dot(n));r.lengthSq()<1e-6&&(r.set(0,0,1).addScaledVector(n,-n.z),r.lengthSq()<1e-6&&r.set(1,0,0)),r.normalize();let a=$u.x.crossVectors(n,r);return s.makeBasis(a,n,r),s.setPosition(t),s}function Xu(s,t,e,i,n,r,a){let o=uc.r.copy(s),l=uc.t.copy(t),c=uc.d.subVectors(l,o),h=c.length();h<1e-4?(c.set(0,-1,0),h=1e-4):c.divideScalar(h),h=yi(h,Math.abs(e-i)+.02,e+i-.002),a.copy(o).addScaledVector(c,h);let u=yi((e*e+h*h-i*i)/(2*e*h),-1,1),d=Math.sqrt(1-u*u),p=uc.bend.copy(n).addScaledVector(c,-n.dot(c));p.lengthSq()<1e-6&&p.set(0,0,1),p.normalize(),r.copy(o).addScaledVector(c,e*u).addScaledVector(p,e*d)}var dc=class{constructor(){this.pos=new k,this.plant=new k,this.from=new k,this.swing=!1,this.step=null,this.out=new k}},fc=class{constructor(t){this.p=t,this.feet=[new dc,new dc],this.ready=!1,this.lastRoot=new k,this.lean=0,this.headYaw=0,this.headPitch=0,this.fall=0,this.m=Array.from({length:13},()=>new oe),this.root=new k,this.yaw=0,this.hands=[new k,new k],this.handW=0}reset(){this.ready=!1}update(t){let e=this.p,i=t.match,n=Math.min(t.dt,.05),r=t.now,a=t.alpha,o=e.action,l=this.root.set(Te(e.prevPos.x,e.pos.x,a),0,Te(e.prevPos.z,e.pos.z,a)),c=this.yaw=f_(e.prevYaw,e.yaw,a),h=Ue[0].set(Math.sin(c),0,Math.cos(c)),u=Ue[1].set(Math.cos(c),0,-Math.sin(c)),d=e.vel.x,p=e.vel.z,g=Math.hypot(d,p),x=yi(g/7.5,0,1);if(!this.ready||this.lastRoot.distanceTo(l)>2.5){this.ready=!0;for(let ot=0;ot<2;ot++){let it=this.feet[ot];it.pos.copy(l).addScaledVector(u,ot===0?.11:-.11),it.plant.copy(it.pos),it.swing=!1,it.step=null}}this.lastRoot.copy(l);let f=Te(e.prevGait,e.gait,a),m=g>.35&&!(o&&(o.type==="slide"||o.type==="dive")),v=Ir(Math.max(g,.6)),w=Pr(v),b=g>.01?d/g:h.x,_=g>.01?p/g:h.z;for(let ot=0;ot<2;ot++){let it=this.feet[ot],zt=ot===0?1:-1,V=u.x*.11*zt,J=u.z*.11*zt;if(m){it.step=null;let ut=p_(f-(ot===0?0:.5));if(ut<w){it.swing&&(it.swing=!1,it.plant.set(it.pos.x,0,it.pos.z));let Rt=l.x+V,ct=l.z+J;Math.hypot(it.plant.x-Rt,it.plant.z-ct)>.9&&it.plant.set(Rt+b*.2,0,ct+_*.2),it.pos.copy(it.plant)}else{it.swing||(it.swing=!0,it.from.set(it.pos.x,0,it.pos.z));let Rt=(ut-w)/(1-w),ct=(1-ut)*v/Math.max(g,.5),Ft=l.x+d*ct+b*w*v*.5+V,ve=l.z+p*ct+_*w*v*.5+J;if(i.ball.owner===e&&!o){let Yt=t.ball.x+i.ball.vel.x*ct*.5,ae=t.ball.z+i.ball.vel.z*ct*.5,kt=(Yt-l.x)*b+(ae-l.z)*_;kt>.1&&kt<1&&(Ft=Te(Ft,Yt-b*.12,.35),ve=Te(ve,ae-_*.12,.35))}let qt=Mn(Rt);it.pos.set(Te(it.from.x,Ft,qt),(.09+g*.035)*Math.sin(Math.PI*Math.pow(Rt,.75)),Te(it.from.z,ve,qt))}}else{let ut=l.x+V+h.x*(ot===0?.03:-.03),Rt=l.z+J+h.z*(ot===0?.03:-.03);it.swing&&(it.swing=!1,it.step={fx:it.pos.x,fz:it.pos.z,t:0,dur:.14});let ct=this.feet[1-ot];if(it.step){it.step.t+=n;let Ft=yi(it.step.t/it.step.dur,0,1),ve=Mn(Ft);it.pos.set(Te(it.step.fx,ut,ve),.07*Math.sin(Math.PI*Ft),Te(it.step.fz,Rt,ve)),Ft>=1&&(it.step=null,it.plant.set(ut,0,Rt))}else Math.hypot(it.plant.x-ut,it.plant.z-Rt)>.22&&!ct.step?it.step={fx:it.plant.x,fz:it.plant.z,t:0,dur:.16}:it.pos.copy(it.plant)}it.out.copy(it.pos)}let M=.935-.05*x+.018*x*Math.cos(f*Math.PI*4),T=.05+.16*x+(e.sprint?.05:0),y=c,E=.16*x*Math.sin(f*Math.PI*2),C=0,L=0,R=Math.sin(f*Math.PI*2),D=.08+.3*x,N=Ue[2].set(.05,-.5+.18*x,-R*D),F=Ue[3].set(-.05,-.5+.18*x,R*D),X=!1,Y=Ue[4],st=Ue[5],K=null,tt=null,q=t.ball,mt=e.touch;if(o&&o.type==="kick"&&!o.fromHands){let ot=o.foot==="L"?0:1,it=o.contacted?o.kyaw??c:c;o.contacted&&o.kyaw==null&&(o.kyaw=c);let zt=Ue[6].set(Math.sin(it),0,Math.cos(it)),V=Ue[7].set(Math.cos(it),0,-Math.sin(it)).multiplyScalar(ot===0?1:-1),J=Ue[8];o.contacted&&mt&&mt.kind!=="receive"?J.set(mt.x,0,mt.z):J.set(q.x,0,q.z);let ut=o.kind==="cross"||o.kind==="lob"||o.kind==="clear",Rt=o.kind==="shot"?o.charging?o.charge:Math.max(o.charge||0,o.ai?o.power:.35):ut?.8:.3+(o.charge||0)*.4,ct=Ue[9].copy(J).addScaledVector(zt,-.14).addScaledVector(V,-.25),Ft=this.feet[ot].out,ve=this.feet[1-ot].out;if(o.contacted){let kt=(o.t-o.contactT)/o.follow,he=Ue[10].copy(J).addScaledVector(zt,.45+.5*Rt);he.y=.2+.5*Rt;let Ie=Ue[11].copy(J).setY(.06);kt<.5?Ft.copy(Ie.lerp(he,Mn(kt/.5))):Ft.lerp(he,1-Mn((kt-.5)/.5)),kt<.65?ve.copy(ct):ve.lerp(ct,1-Mn((kt-.65)/.35)),T=.1-(ut?.12:0)*(1-kt)}else{let kt=o.charging?.35+.4*o.charge:yi(o.t/Math.max(.06,o.t+o.eta),0,1),he=Ue[10].copy(J).addScaledVector(zt,-(.32+.38*Rt)).addScaledVector(V,.06);he.y=.12+.32*Rt,kt<.75?Ft.lerp(he,Mn(kt/.75)):Ft.copy(he).lerp(Ue[11].copy(J).setY(.06),(kt-.75)/.25),ve.lerp(ct,Mn(kt*2.2)),T=.12-(ut?.08:0)}let qt=ot===0?1:-1,Yt=qt>0?N:F,ae=qt>0?F:N;Yt.set(qt*.35,-.35,-.2),ae.set(-qt*.3,-.3,.25)}else if(o&&o.type==="kick"&&o.fromHands){let ot=o.contacted?yi((o.t-o.contactT)/o.follow,0,1):yi(o.t/Math.max(.1,o.t+o.eta),0,1);if(o.kind==="throw"){let it=o.contacted?1-ot:ot;N.set(.12,.62-.05*it,-.25*it+(o.contacted?.35*ot:0)),F.set(-.12,.62-.05*it,-.25*it+(o.contacted?.35*ot:0)),T=-.12*(o.contacted?1-ot:ot)+(o.contacted?.15*ot:0)}else if(o.kind==="gkthrow")F.set(-.12,-.45,o.contacted?.45*(1-ot)+.2:-.35*ot),N.set(.25,-.35,.1),T=.25;else{N.set(.1,-.2,.35),F.set(-.1,-.2,.35);let it=this.feet[1].out,zt=Ue[6].set(Math.sin(c),0,Math.cos(c));o.contacted?(it.copy(l).addScaledVector(zt,.3+.5*ot),it.y=.3+.6*Math.sin(Math.PI*ot)):(it.copy(l).addScaledVector(zt,-.3*ot),it.y=.15*ot)}}else if(o&&o.type==="tackle"){let ot=o.t,it=ot<.07?ot/.07*.3:ot<.3?.3+Math.min(1,(ot-.07)/.1)*.7:Math.max(0,1-(ot-.3)/.18),zt=Ue[6].set(Math.sin(o.dir),0,Math.cos(o.dir)),V=this.feet[1].out,J=Ue[7].copy(l).addScaledVector(zt,.3+.75*it).addScaledVector(u,-.05);J.y=.06,V.lerp(J,yi(it*1.4,0,1)),T=.1+.25*it,M-=.08*it,N.set(.35,-.3,.1),F.set(-.35,-.3,-.15)}else if(o&&o.type==="slide")tt="slide";else if(o&&o.type==="dive")tt="dive";else if(r<e.downUntil)tt="fall";else if(o&&o.type==="celebrate"||e.celebrate>r){let ot=r*6+e.id;N.set(.25,.55+.08*Math.sin(ot),.05),F.set(-.25,.55+.08*Math.cos(ot),.05),o&&o.type==="celebrate"&&g<1&&(M+=.12*Math.max(0,Math.sin(r*9)))}else if(e.hold==="throw"||i.restart&&i.restart.handsBall&&i.restart.taker===e&&i.phase==="restart")X=!0,Y.set(q.x,q.y,q.z).addScaledVector(u,.1),st.set(q.x,q.y,q.z).addScaledVector(u,-.1);else if(e.isGK&&i.ball.state==="held"&&i.ball.owner===e)X=!0,Y.set(q.x,q.y,q.z).addScaledVector(u,.1).addScaledVector(h,-.04),st.set(q.x,q.y,q.z).addScaledVector(u,-.1).addScaledVector(h,-.04);else if(e.isGK&&e.ai.set)M=.8,T=.22,N.set(.3,-.12,.3),F.set(-.3,-.12,.3),Math.hypot(q.x-l.x,q.z-l.z)<1.4&&(X=!0,Y.set(q.x,q.y,q.z).addScaledVector(u,.12),st.set(q.x,q.y,q.z).addScaledVector(u,-.12));else if(r<e.stumbleUntil){let ot=Math.sin(r*20)*.15;N.set(.4,-.1+ot,0),F.set(-.4,-.1-ot,0),L=ot*.4}if(!tt&&mt&&(mt.kind==="receive"||mt.kind==="dribble"||mt.kind==="stop"||mt.kind==="poke")&&!(o&&o.type==="kick")){let ot=r-mt.time;if(ot>-.05&&ot<.2){let it=1-Math.abs(ot-.02)/.18,zt=mt.foot==="L"?0:1,V=Ue[12].set(mt.x,.05+(mt.kind==="receive"?Math.min(.5,mt.y)*.8:0),mt.z);V.addScaledVector(Ue[13].set(mt.x-l.x,0,mt.z-l.z).normalize(),-.1),this.feet[zt].out.lerp(V,yi(it,0,1)*.85)}}let wt=this.m;if(tt==="slide")this.poseSlide(e,o,l,c,wt);else if(tt==="dive")this.poseDive(e,i,l,c,wt);else if(tt==="fall")this.poseFall(e,r,l,c,wt,h,u);else{let ot=q.x-l.x,it=q.z-l.z,V=Math.atan2(ot,it)-y;for(;V>Math.PI;)V-=Math.PI*2;for(;V<-Math.PI;)V+=Math.PI*2;V=yi(V,-1.1,1.1),this.headYaw=Te(this.headYaw,V,1-Math.exp(-n*8));let J=Math.hypot(ot,it);this.headPitch=Te(this.headPitch,yi(Math.atan2(1.55-q.y,J)*.6,-.3,.5),1-Math.exp(-n*6)),this.lean=Te(this.lean,T,1-Math.exp(-n*10)),this.poseUpright(e,l,y,M,this.lean+C,E,L,N,F,X?Y:null,X?st:null,wt,t.local)}return wt}poseUpright(t,e,i,n,r,a,o,l,c,h,u,d,p){let g=Ce.pelvis.set(e.x,n,e.z),x=Ce.fwd.set(Math.sin(i),0,Math.cos(i)),f=Ce.side.set(Math.cos(i),0,-Math.sin(i));p&&g.addScaledVector(x,-.02),_n.set(0,i-a*.4,0,"YXZ"),d[Ut.PELVIS].makeRotationFromEuler(_n).setPosition(g);let m=d[Ut.PELVIS],v=Ce.waist.set(0,Ze.waist,0).applyMatrix4(m);_n.set(r,i+a,o,"YXZ"),d[Ut.TORSO].makeRotationFromEuler(_n).setPosition(v);let w=d[Ut.TORSO],b=Ce.neck.set(0,.58,0).applyMatrix4(w);_n.set(this.headPitch-r*.5,i+this.headYaw,0,"YXZ"),d[Ut.HEAD].makeRotationFromEuler(_n).setPosition(b);for(let M=0;M<2;M++){let T=Ce.hip.set(M===0?Ze.hipW:-Ze.hipW,-.02,0).applyMatrix4(m),y=this.feet[M].out,E=Ce.ankT.set(y.x,y.y+Ze.ankle,y.z),C=Ce.pole.copy(x).addScaledVector(d_,.1);Xu(T,E,Ze.thigh,Ze.shin,C,Ce.knee,Ce.ankle),ms(d[M===0?Ut.THIGH_L:Ut.THIGH_R],T,Ce.knee,x),ms(d[M===0?Ut.SHIN_L:Ut.SHIN_R],Ce.knee,Ce.ankle,x);let L=yi((Ce.ankle.y-Ze.ankle)*1.2,0,.6)*(this.feet[M].swing?1:0);_n.set(L,i,0,"YXZ"),d[M===0?Ut.BOOT_L:Ut.BOOT_R].makeRotationFromEuler(_n).setPosition(Ce.ankle)}let _=Ce.back.set(-x.x,-.6,-x.z);for(let M=0;M<2;M++){let T=M===0?1:-1,y=Ce.sh.set(T*Ze.shoulderW,.45,0).applyMatrix4(w),E;h?E=Ce.tgt.copy(M===0?h:u):E=Ce.tgt.copy(M===0?l:c).add(Ce.off.set(T*Ze.shoulderW,.45,0)).applyMatrix4(w);let C=Ce.pole2.copy(_).addScaledVector(f,T*.5);Xu(y,E,Ze.upper,Ze.fore,C,Ce.elbow,Ce.hand),ms(d[M===0?Ut.UARM_L:Ut.UARM_R],y,Ce.elbow,x),ms(d[M===0?Ut.FARM_L:Ut.FARM_R],Ce.elbow,Ce.hand,x),this.hands[M].copy(Ce.hand)}}poseSlide(t,e,i,n,r){let a=e.t,o=yi((a-.62)/.43,0,1),l=yi(a/.12,0,1)*(1-Mn(o)),c=Ue[0].set(Math.sin(e.dir),0,Math.cos(e.dir)),h=Ue[1].set(Math.cos(e.dir),0,-Math.sin(e.dir)),u=Te(.93,.2,l),d=Te(.05,-1.05,l);this.feet[1].out.copy(i).addScaledVector(c,Te(.1,1,l)).addScaledVector(h,-.08).setY(Te(0,.05,l)),this.feet[0].out.copy(i).addScaledVector(c,Te(0,.25,l)).addScaledVector(h,.22).setY(0);let p=Ue[2].set(.35,Te(-.5,-.2,l),Te(0,-.35,l)),g=Ue[3].set(-.4,Te(-.5,-.1,l),Te(0,.2,l));this.lean=d,this.headPitch=Te(this.headPitch,.5*l,.2),this.poseUpright(t,i,e.dir,u,d,0,0,p,g,null,null,r,!1)}poseFall(t,e,i,n,r,a,o){let l=t.action,c=l&&l.dur?l.dur:1,h=l?l.t:c-(t.downUntil-e),u=Mn(h/.35)*(1-Mn((h-(c-.45))/.45)),d=Te(.93,.22,u),p=Te(.05,1.35,u);this.feet[0].out.copy(i).addScaledVector(a,-.5*u).addScaledVector(o,.14).setY(.02*u),this.feet[1].out.copy(i).addScaledVector(a,-.6*u).addScaledVector(o,-.14).setY(.05*u);let g=Ue[2].set(.25,Te(-.5,-.05,u),Te(0,.45,u)),x=Ue[3].set(-.25,Te(-.5,-.05,u),Te(0,.45,u));this.poseUpright(t,i,n,d,p,0,0,g,x,null,null,r,!1)}poseDive(t,e,i,n,r){let a=cc(e,t,this.vol||(this.vol={})),o=We.hands.set(a.bx,a.by,a.bz),l=We.axis.subVectors(o,We.body.set(a.ax,a.ay,a.az));l.divideScalar(l.length()||1);let c=We.sh.copy(o).addScaledVector(l,-.52),h=We.pelvis.copy(c).addScaledVector(l,-.5);h.y=Math.max(.18,h.y);let u=We.face.set(Math.sin(n),0,Math.cos(n)),d=We.z.copy(u).addScaledVector(l,-u.dot(l)).normalize(),p=We.x.crossVectors(l,d);hc.makeBasis(p,l,d),r[Ut.PELVIS].copy(hc).setPosition(h),r[Ut.TORSO].copy(hc).setPosition(We.p1.copy(h).addScaledVector(l,Ze.waist)),r[Ut.HEAD].copy(hc).setPosition(We.p2.copy(h).addScaledVector(l,Ze.waist+.58));for(let g=0;g<2;g++){let x=g===0?1:-1,f=We.hip.copy(h).addScaledVector(p,x*Ze.hipW),m=We.knee.copy(f).addScaledVector(l,-Ze.thigh).addScaledVector(d,.08);m.y=Math.max(.08,m.y);let v=We.ankle.copy(m).addScaledVector(l,-Ze.shin).addScaledVector(d,-.05);v.y=Math.max(.08,v.y),ms(r[g===0?Ut.THIGH_L:Ut.THIGH_R],f,m,d),ms(r[g===0?Ut.SHIN_L:Ut.SHIN_R],m,v,d),_n.set(0,n,0,"YXZ"),r[g===0?Ut.BOOT_L:Ut.BOOT_R].makeRotationFromEuler(_n).setPosition(v)}for(let g=0;g<2;g++){let x=g===0?1:-1,f=We.shp.copy(c).addScaledVector(p,x*Ze.shoulderW),m=We.tgt.copy(o).addScaledVector(p,x*.09);Xu(f,m,Ze.upper,Ze.fore,d,We.elbow,We.hand),ms(r[g===0?Ut.UARM_L:Ut.UARM_R],f,We.elbow,d),ms(r[g===0?Ut.FARM_L:Ut.FARM_R],We.elbow,We.hand,d),this.hands[g].copy(We.hand)}}};var pc=1024,mc=1024,gc=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=pc,this.canvas.height=mc,this.ctx=this.canvas.getContext("2d"),this.texture=new fr(this.canvas),this.texture.anisotropy=4,this.words=new Map,this.reset()}reset(){let t=this.ctx;t.clearRect(0,0,pc,mc),t.fillStyle="#fff",t.textAlign="center",t.textBaseline="middle",t.font='bold 88px "Arial Black", Arial, Helvetica, sans-serif';for(let e=0;e<10;e++)t.fillText(String(e),e*64+32,52);this.words.clear(),this.slot=0,this.texture.needsUpdate=!0}rect(t,e,i,n){return[t/pc,1-(e+n)/mc,(t+i)/pc,1-e/mc]}digit(t){return this.rect(t*64+6,4,52,96)}word(t){if(this.words.has(t))return this.words.get(t);let e=this.slot%2,i=Math.floor(this.slot/2);if(i>13)return this.rect(0,0,1,1);this.slot++;let n=e*512,r=112+i*64,a=this.ctx;a.save(),a.clearRect(n,r,512,64),a.fillStyle="#fff",a.textAlign="center",a.textBaseline="middle";let o=46;for(a.font=`bold ${o}px "Arial Black", Arial, Helvetica, sans-serif`;a.measureText(t).width>496&&o>14;)o-=2,a.font=`bold ${o}px "Arial Black", Arial, Helvetica, sans-serif`;a.fillText(t,n+256,r+33),a.restore();let l=this.rect(n+2,r+2,508,60);return this.words.set(t,l),this.texture.needsUpdate=!0,l}},xc=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=512,this.canvas.height=192,this.ctx=this.canvas.getContext("2d"),this.texture=new fr(this.canvas),this.key=""}update(t,e,i,n,r,a=!1){let o=`${t}|${e}|${i}|${n}|${r}|${a}`;if(o===this.key)return;this.key=o;let l=this.ctx,c=r==="neo";l.fillStyle=c?"#111":"#f6f5ef",l.fillRect(0,0,512,192),l.strokeStyle=c?"#ffd23f":"#222",l.lineWidth=c?10:4,l.strokeRect(8,8,496,176),l.fillStyle=c?"#fff":"#161616",l.textAlign="center",l.textBaseline="middle",l.font='bold 40px "Arial Black", Arial, sans-serif',l.fillText(t,128,52),l.fillText(e,384,52),l.font='bold 72px "Arial Black", Arial, sans-serif',l.fillStyle=c?"#ffd23f":"#161616",l.fillText(`${i[0]}  -  ${i[1]}`,256,112),l.font="bold 30px Arial, sans-serif",l.fillStyle=c?"#3ee0ff":"#444",l.fillText(a?"FINAL":n,256,162),this.texture.needsUpdate=!0}};var vc=new oe,cm=new ze,m_=new k,LE=new k,hm=new _i,yc=class{constructor(t=20){let e=new Ni(1,1);e.rotateX(-Math.PI/2),this.alpha=new Mi(new Float32Array(t),1),e.setAttribute("aAlpha",this.alpha),this.mesh=new ur(e,Sp(),t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,this.max=t,this.count=0}begin(){this.count=0}add(t,e,i,n){this.count>=this.max||(vc.makeScale(i,1,i).setPosition(t,.018,e),this.mesh.setMatrixAt(this.count,vc),this.alpha.setX(this.count,n),this.count++)}end(){this.mesh.count=this.count,this.mesh.instanceMatrix.needsUpdate=!0,this.alpha.needsUpdate=!0}},bc=class{constructor(){this.group=new ei;let t=new Jn(.5,.62,40);t.rotateX(-Math.PI/2),this.ring=new se(t,Ls(I.MARKER,.85)),this.ring.renderOrder=3,this.ring.visible=!1;let e=new Pn(.16,.34,4);e.rotateX(Math.PI),this.ack=new se(e,Ls(I.MARKER,1)),this.ack.visible=!1;let i=new Jn(.2,.3,24);i.rotateX(-Math.PI/2),this.incoming=new se(i,Ls(I.MARKER,.6)),this.incoming.visible=!1,this.group.add(this.ring,this.ack,this.incoming),this.ringT=0}showRing(t,e,i){this.ring.visible=!0,this.ringT=i;let n=1+.06*Math.sin(i*8);this.ring.position.set(t,.03,e),this.ring.scale.set(n,1,n)}showAck(t,e,i,n){this.ack.visible=!0,this.ack.position.set(t,e+.1*Math.sin(n*10),i),this.ack.rotation.y=n*3}showIncoming(t,e){this.incoming.visible=!0,this.incoming.position.set(t,.03,e)}hideAll(){this.ring.visible=!1,this.ack.visible=!1,this.incoming.visible=!1}},_c=class{constructor(t=180){let e=new oa(.16,0);this.mat=new Ts({color:16777215}),this.mesh=new ur(e,this.mat,t),this.mesh.instanceMatrix.setUsage(Xh),this.mesh.frustumCulled=!1,this.max=t,this.parts=Array.from({length:t},()=>({alive:!1,p:new k,v:new k,r:new k,w:new k,life:0,s:1})),this.col=new te;for(let i=0;i<t;i++)this.mesh.setColorAt(i,this.col.set(1,1,1));this.mesh.count=0,this.active=0}spawn(t,e,i,n,r,a=6,o=Math.random){let l=0;for(let c of this.parts){if(l>=n)break;if(c.alive)continue;c.alive=!0,c.p.set(t+(o()-.5)*2,e+o()*1.5,i+(o()-.5)*2);let h=o()*Math.PI*2,u=4+o()*6;c.v.set(Math.cos(h)*a*o(),u,Math.sin(h)*a*o()),c.r.set(o()*6,o()*6,o()*6),c.w.set((o()-.5)*12,(o()-.5)*12,(o()-.5)*12),c.life=1.6+o()*1.2,c.s=.6+o()*.9,c.role=r[Math.floor(o()*r.length)],l++}}update(t){let e=0;for(let i of this.parts){if(!i.alive)continue;if(i.life-=t,i.life<=0){i.alive=!1;continue}i.v.y-=9.8*t*.6,i.v.multiplyScalar(1-1.2*t),i.p.addScaledVector(i.v,t),i.p.y<.05&&(i.p.y=.05,i.v.set(0,0,0)),i.r.addScaledVector(i.w,t),hm.set(i.r.x,i.r.y,i.r.z),cm.setFromEuler(hm);let n=i.s*Math.min(1,i.life*2);vc.compose(i.p,cm,m_.set(n,n,n)),this.mesh.setMatrixAt(e,vc),this.mesh.setColorAt(e,ke[i.role]),e++}this.mesh.count=e,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0),this.active=e}clear(){for(let t of this.parts)t.alive=!1;this.mesh.count=0}};var um=60,g_=12,x_=[0,1,2,4,5,6,8,9,10,12,13,14],Dr=22,Sc=class{constructor(t){this.n=t,this.parts=t*Ci,this.size=Dr+this.parts*12,this.cap=um*g_,this.buf=new Float32Array(this.size*this.cap),this.times=new Float64Array(this.cap),this.clear(),this.frame={ball:new k,q:new ze,crowd:0,nets:new Float32Array(14),parts:new Float32Array(this.parts*12)},this._q2=new ze}clear(){this.count=0,this.start=0,this.lastT=-1e9,this.cur=-1}phys(t){return(this.start+t)%this.cap}begin(t){return t<this.lastT-.5&&this.clear(),t-this.lastT<1/um-1e-4?(this.cur=-1,!1):(this.count<this.cap?this.count++:this.start=(this.start+1)%this.cap,this.cur=this.phys(this.count-1),this.times[this.cur]=t,this.lastT=t,!0)}putPlayer(t,e){if(this.cur<0)return;let i=this.cur*this.size+Dr+t*Ci*12,n=this.buf;for(let r=0;r<Ci;r++){let a=e[r].elements;for(let o=0;o<12;o++)n[i++]=a[x_[o]]}}end(t,e,i,n,r,a,o){if(this.cur<0)return;let l=this.buf,c=this.cur*this.size;l[c]=t.x,l[c+1]=t.y,l[c+2]=t.z,l[c+3]=e.x,l[c+4]=e.y,l[c+5]=e.z,l[c+6]=e.w,l[c+7]=i,l[c+8]=n.x,l[c+9]=n.y,l[c+10]=n.z,l[c+11]=n.w,l[c+12]=r.x,l[c+13]=r.y,l[c+14]=r.z,l[c+15]=a.x,l[c+16]=a.y,l[c+17]=a.z,l[c+18]=a.w,l[c+19]=o.x,l[c+20]=o.y,l[c+21]=o.z,this.cur=-1}get firstT(){return this.count?this.times[this.phys(0)]:0}indexAt(t){let e=0,i=this.count-1;if(i<0)return-1;if(t<=this.times[this.phys(0)])return 0;for(;e<i;){let n=e+i+1>>1;this.times[this.phys(n)]<=t?e=n:i=n-1}return e}rootAt(t,e,i){let n=this.phys(t)*this.size+Dr+e*Ci*12+9;return i.set(this.buf[n],this.buf[n+1],this.buf[n+2])}sample(t){let e=this.frame,i=this.indexAt(t);if(i<0)return null;let n=Math.min(this.count-1,i+1),r=this.times[this.phys(i)],a=this.times[this.phys(n)],o=n===i||a<=r?0:Hi.clamp((t-r)/(a-r),0,1),l=this.phys(i)*this.size,c=this.phys(n)*this.size,h=this.buf,u=g=>h[l+g]+(h[c+g]-h[l+g])*o;e.ball.set(u(0),u(1),u(2)),e.q.set(h[l+3],h[l+4],h[l+5],h[l+6]),e.q.slerp(this._q2.set(h[c+3],h[c+4],h[c+5],h[c+6]),o),e.crowd=u(7);for(let g=0;g<14;g++)e.nets[g]=u(8+g);let d=e.parts,p=this.parts*12;for(let g=0;g<p;g++)d[g]=h[l+Dr+g]+(h[c+Dr+g]-h[l+Dr+g])*o;return e}clip(t,e){if(this.count<10)return null;let i=this.indexAt(t+1.4),n=this.indexAt(e),r=this.indexAt(e-2.1),a=new k,o=new k;for(let h=n;h>r;h--){let u=!1;for(let d=0;d<this.n&&!u;d++)this.rootAt(h,d,a),this.rootAt(h-1,d,o),a.distanceToSquared(o)>1.2*1.2&&(u=!0);if(u||this.times[this.phys(h)]-this.times[this.phys(h-1)]>.3){r=h;break}}let l=this.times[this.phys(r)],c=this.times[this.phys(i)];return c-l<.8?null:{t0:l,t1:c}}},Mc=(s,t,e)=>{let i=Hi.clamp((e-s)/(t-s),0,1);return i*i*(3-2*i)},wc=class{constructor(t,e,i){this.rec=t,this.t0=e.t0,this.t1=e.t1,this.t=e.t0,this.goalT=i.goalT,this.shotT=i.shotT!=null&&i.shotT>e.t0&&i.shotT<i.goalT?i.shotT:null,this.subject=i.subject,this.clock=0,this.done=!1,this.cues={shot:this.shotT==null,goal:!1};let n=t.sample(i.goalT);this.goal=new k(Math.sign(n?n.ball.x:1)*Z.HL,1.1,0);let r=new k;this.subjectPos(this.shotT??i.goalT-.6,r)||r.set(this.goal.x-Math.sign(this.goal.x)*16,0,0);let a=new k(r.x-this.goal.x,0,r.z-this.goal.z);a.lengthSq()<4&&a.set(-Math.sign(this.goal.x),0,.3),a.normalize(),this.dir=a;let o=new k(-a.z,0,a.x),l=Math.sign(r.z||1)*Math.sign(o.z||1);this.side=o.multiplyScalar(l),this.cam={mode:"free",pos:new k,look:new k,fov:62,roll:0},this.first=!0,this._a=new k,this._b=new k,this._c=new k,this._l=new k}subjectPos(t,e){if(this.subject<0)return null;let i=this.rec.indexAt(t);return i<0?null:this.rec.rootAt(i,this.subject,e)}speed(t){let e=.85;return this.shotT!=null&&(e-=.55*Math.exp(-(((t-this.shotT)/.35)**2)),t>this.shotT&&t<this.goalT&&(e=Math.min(e,.45))),e-=.6*Math.exp(-(((t-this.goalT)/.45)**2)),Math.max(.25,e)}advance(t){let e=[];return this.done||(this.clock+=t,this.t=Math.min(this.t1,this.t+t*this.speed(this.t)),!this.cues.shot&&this.t>=this.shotT&&(this.cues.shot=!0,e.push("shot")),!this.cues.goal&&this.t>=this.goalT&&(this.cues.goal=!0,e.push("goal")),this.t>=this.t1&&(this.done=!0)),e}frame(){return this.rec.sample(this.t)}camera(t,e){let i=this.t,n=this.cam,r=this.shotT??this.goalT-.6,a=Mc(r+.05,this.goalT+.35,i),o=this.subjectPos(Math.min(i,r+.3),this._a)||this._a.copy(t.ball),l=t.ball,c=this._b.copy(o).addScaledVector(this.dir,6.5).addScaledVector(this.side,3.4);c.y=4.6;let h=this._c.copy(this.goal).addScaledVector(this.dir,7).addScaledVector(this.side,4.8);h.y=2.8;let u=c.lerp(h,a);u.x+=Math.sin(this.clock*.9)*.18,u.y+=Math.sin(this.clock*1.3+1)*.12,u.z+=Math.cos(this.clock*.7)*.18,u.y=Math.max(1.6,u.y),u.x=Hi.clamp(u.x,-Z.HL-6,Z.HL+6),u.z=Hi.clamp(u.z,-Z.HW-5,Z.HW+5);let d=this._l.copy(o).setY(1).lerp(this.goal,.12);return d.lerp(this._c.copy(o).setY(.9).lerp(l,.5),Mc(r-.3,r+.15,i)),d.lerp(l,Mc(r+.2,r+.2+.6*Math.max(.3,this.goalT-r),i)),d.lerp(this._a.copy(l).lerp(this.goal,.35),Mc(this.goalT-.1,this.goalT+.6,i)),this.first?(n.pos.copy(u),n.look.copy(d),this.first=!1):(n.pos.lerp(u,1-Math.exp(-e*3.2)),n.look.lerp(d,1-Math.exp(-e*5))),n.fov=60-10*a,n.roll=Math.sin(this.clock*.8)*.018,n}};le.enabled=!1;var Os=120,v_=175;function dm(s){let t=Hi.clamp((s-Os)/(v_-Os),0,1),e=s*Math.PI/360;return{d:t,R:(t+1)*Math.sin(e)/(t+Math.cos(e))}}var y_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",b_=`
uniform samplerCube tCube;
uniform mat3 uRot;
uniform float uD, uR, uAspect;
varying vec2 vUv;
void main() {
  vec2 sc = (vUv * 2.0 - 1.0) * vec2(uR, uR / uAspect);
  float r = length(sc);
  float k = uD + 1.0;
  float th = atan(r, k) + asin(clamp(r * uD / sqrt(k * k + r * r), -1.0, 1.0));
  vec2 u = r > 1e-6 ? sc / r : vec2(0.0);
  vec3 dir = uRot * vec3(u * sin(th), -cos(th));
  gl_FragColor = textureCube(tCube, dir);
}`,Tc=class{constructor(t,e={}){this.canvas=t,this.quality=e.quality||"high";let i=new Ul({canvas:t,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!!e.preserve});i.outputColorSpace=Ss,i.shadowMap.enabled=!0,i.shadowMap.type=wh,i.shadowMap.autoUpdate=!1,this.renderer=i,this.scene=new hr,this.scene.fog=new ea(15921642,60,330),this.camera=new li(85,16/9,.07,1500),this.camera.rotation.order="YXZ";let n=new ha(16777215,1);n.position.set(-36,64,30),n.castShadow=!0;let r=n.shadow.camera;r.left=-46,r.right=46,r.top=34,r.bottom=-34,r.near=1,r.far=200,n.shadow.mapSize.set(2048,2048),n.shadow.bias=-8e-4,n.shadow.normalBias=.02,this.sun=n,this.scene.add(n,n.target),At.uLightDir.value.copy(n.position).normalize(),this.sky=new se(new As(1200,24,12),Mp()),this.sky.renderOrder=-10,this.sky.frustumCulled=!1,this.scene.add(this.sky);let a=kp();this.clouds=new ei;let o=new se(a.solid,vn({fog:!1})),l=new se(a.edges,en({fog:!1}));l.frustumCulled=!1,this.clouds.add(o,l),this.scene.add(this.clouds),this.atlas=new gc,At.uAtlas.value=this.atlas.texture,this.scoreTex=new xc,this.screenMat=wp(this.scoreTex.texture),this.staticMat=vn({crowd:!0,atlas:!0}),this.staticEdgeMat=en({crowd:!0}),this.casterMat=vn({}),this.casterEdgeMat=en({}),this.netMat=en({net:!0,role:I.NET,widthScale:.5}),this.nets=new se(Pp(),this.netMat),this.nets.frustumCulled=!1,this.scene.add(this.nets),this.netState=[{amp:0,t:9,x:0,y:0,z:0,dx:1,dy:0,dz:0,count:0},{amp:0,t:9,x:0,y:0,z:0,dx:-1,dy:0,dz:0,count:0}],this.blobs=new yc(24),this.markers=new bc,this.burst=new _c(200),this.scene.add(this.blobs.mesh,this.markers.group,this.burst.mesh),this.venue=null,this.venueObjs=[],this.batch=null,this.animators=[],this.match=null,this.style="classic",this.fov=85,this.time=0,this.shake=0,this.ballPos=new k,this.ballQ=new ze,this.ballM=new oe,this.crowdLevel=0,this.localPlayer=null,this.firstPerson=!0,this.hideHead=!0,this.hfov=100,this.wide=null,this.resize()}setQuality(t){this.quality=t;let e=window.devicePixelRatio||1,i=t==="low"?Math.min(1,e)*.75:Math.min(t==="medium"?1.25:2,e);this.renderer.setPixelRatio(i*(this.resScale||1));let n=t==="high"?2048:1024;this.sun.shadow.mapSize.x!==n&&(this.sun.shadow.mapSize.set(n,n),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null)),this.resize()}setResolutionScale(t){Math.abs(t-(this.resScale||1))<.01||(this.resScale=t,this.setQuality(this.quality))}resize(){let t=this.canvas.clientWidth||window.innerWidth,e=this.canvas.clientHeight||window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix();let i=this.renderer.getPixelRatio();At.uResolution.value.set(t*i,e*i),this.pixelRatio=i,this.applyLineWidth()}applyLineWidth(){let t=Hl[this.style],e=this.pixelRatio||1;At.uLineWidth.value=t.lineWidth*e,At.uMinWidth.value=Math.min(t.lineWidth,1.1)*e;let i=t.name==="neo";At.uTaper.value=i?10:30,At.uTaperMin.value=i?.25:.4,At.uDetailDist.value=i?34:45,At.uCreaseDist.value=i?14:20}setStyle(t){let e=xp(t);this.style=e.name,At.uToon.value=e.toon,At.uShadowAmt.value=e.shadow,this.renderer.shadowMap.autoUpdate=e.shadow>0,this.renderer.shadowMap.needsUpdate=e.shadow>0,this.scene.fog.color.set(e.fog),this.scene.fog.near=e.fogNear,this.scene.fog.far=e.fogFar,this.clouds.visible=e.clouds,this.blobShowPlayers=e.blobs,this.applyLineWidth(),this.match&&this.updateScoreboard(!0),document.documentElement.dataset.style=e.name}setVenue(t,e={}){let i=`${t}|${e.homeName}|${e.final}|${this.quality}`;if(this.venueKey===i)return;this.venueKey=i;for(let c of this.venueObjs)this.scene.remove(c),c.geometry.dispose();this.venueObjs=[];let n=Lp(t,{atlas:this.atlas,quality:this.quality,homeName:e.homeName||"HOME",final:!!e.final,seed:e.seed||7});this.venue=n;let r=new se(n.solid,this.staticMat);r.receiveShadow=!0;let a=new se(n.edges,this.staticEdgeMat);a.frustumCulled=!1;let o=new se(n.casterSolid,this.casterMat);o.castShadow=!0,o.receiveShadow=!0;let l=new se(n.casterEdges,this.casterEdgeMat);l.frustumCulled=!1,this.venueObjs.push(r,a,o,l);for(let c of n.screens){let h=new se(new Ni(c.w,c.h),this.screenMat);h.position.set(c.x,c.y,c.z),h.rotation.y=c.ry+Math.PI,h.translateZ(-.06),this.venueObjs.push(h)}for(let c of this.venueObjs)this.scene.add(c);this.renderer.shadowMap.needsUpdate=!0}setMatch(t,e){this.match=t,e&&vp(e.kits,e.human),this.kits=e&&e.kits?e.kits:null,this.rebuildCharacters(),this.burst.clear(),this.netState.forEach(i=>{i.amp=0,i.t=9}),this.updateScoreboard(!0)}rebuildCharacters(){this.batch&&(this.scene.remove(this.batch.mesh,this.batch.edges),this.batch.dispose()),this.batch=new Zl(this.match.players,this.atlas,{kits:this.kits,quality:this.quality}),this.scene.add(this.batch.mesh,this.batch.edges),this.animators=this.match.players.map(t=>new fc(t)),this.recorder&&this.setRecording(!0)}setRecording(t){if(!t||!this.match){this.recorder=null;return}let e=this.match.players.length;this.recorder&&this.recorder.n===e?this.recorder.clear():this.recorder=new Sc(e)}updateScoreboard(t){let e=this.match;e&&(this.scoreTex.update(e.teams[0].short||"HOM",e.teams[1].short||"AWY",e.scoreline,e.displayClock.slice(0,2)+"'",this.style,e.phase==="fulltime"),t&&(this.scoreTex.key=""))}render(t,e,i,n={}){let r=this.match;if(this.time+=e,At.uTime.value=this.time,this.crowdLevel=Math.max(n.crowd??0,this.crowdLevel-e*.35),At.uCrowd.value=this.crowdLevel,r&&this.batch&&n.replay)this.drawReplayFrame(n.replay,e);else if(r&&this.batch){let a=r.time-(1-t)*.008333333333333333,o=this.recorder&&this.recorder.begin(a)?this.recorder:null,l=r.ball;this.ballPos.set(l.prevPos.x+(l.pos.x-l.prevPos.x)*t,l.prevPos.y+(l.pos.y-l.prevPos.y)*t,l.prevPos.z+(l.pos.z-l.prevPos.z)*t);let c=this._qa||(this._qa=new ze),h=this._qb||(this._qb=new ze);c.set(l.prevQ[0],l.prevQ[1],l.prevQ[2],l.prevQ[3]),h.set(l.q[0],l.q[1],l.q[2],l.q[3]),this.ballQ.slerpQuaternions(c,h,t),this.ballM.compose(this.ballPos,this.ballQ,this._one||(this._one=new k(1,1,1))),this.batch.setMatrix(this.batch.ballRow,this.ballM);let u={match:r,alpha:t,dt:e,now:a,ball:this.ballPos,local:!1};this.blobs.begin();for(let p=0;p<this.animators.length;p++){let g=this.animators[p],x=g.p;u.local=x===this.localPlayer&&this.firstPerson;let f=g.update(u);o&&o.putPlayer(p,f);let m=p*Ci;for(let v=0;v<Ci;v++)this.batch.setMatrix(m+v,f[v]);if(u.local&&this.hideHead&&(this.batch.hide(m+Ut.HEAD),this.batch.hide(m+Ut.TORSO),this.isWide()))for(let v of[Ut.UARM_L,Ut.UARM_R,Ut.FARM_L,Ut.FARM_R])this.batch.hide(m+v);this.blobShowPlayers&&this.blobs.add(g.root.x,g.root.z,.95,.2)}let d=Math.max(0,this.ballPos.y-me);this.blobs.add(this.ballPos.x,this.ballPos.z,.34+d*.12,.42/(1+d*.8)),this.blobs.end(),this.batch.commit(),this.updateNets(e),o&&o.end(this.ballPos,this.ballQ,this.crowdLevel,At.uNetA.value,At.uNetDA.value,At.uNetB.value,At.uNetDB.value),this.updateScoreboard(!1)}this.burst.update(e),this.updateCamera(i,e,t),!this.noDraw&&(this.isWide()?this.renderWide():this.renderer.render(this.scene,this.camera))}drawReplayFrame(t,e){let i=this.batch,n=i.data,r=t.parts;this.ballPos.copy(t.ball),this.ballQ.copy(t.q),this.ballM.compose(this.ballPos,this.ballQ,this._one||(this._one=new k(1,1,1))),i.setMatrix(i.ballRow,this.ballM);let a=this.animators.length*Ci;for(let c=0;c<a;c++){let h=c*16,u=c*12;n[h]=r[u],n[h+1]=r[u+1],n[h+2]=r[u+2],n[h+3]=0,n[h+4]=r[u+3],n[h+5]=r[u+4],n[h+6]=r[u+5],n[h+7]=0,n[h+8]=r[u+6],n[h+9]=r[u+7],n[h+10]=r[u+8],n[h+11]=0,n[h+12]=r[u+9],n[h+13]=r[u+10],n[h+14]=r[u+11],n[h+15]=1}if(this.blobs.begin(),this.blobShowPlayers)for(let c=0;c<this.animators.length;c++)this.blobs.add(r[c*Ci*12+9],r[c*Ci*12+11],.95,.2);let o=Math.max(0,this.ballPos.y-me);this.blobs.add(this.ballPos.x,this.ballPos.z,.34+o*.12,.42/(1+o*.8)),this.blobs.end(),i.commit();let l=t.nets;At.uNetA.value.set(l[0],l[1],l[2],l[3]),At.uNetDA.value.set(l[4],l[5],l[6]),At.uNetB.value.set(l[7],l[8],l[9],l[10]),At.uNetDB.value.set(l[11],l[12],l[13]),this.crowdLevel=Math.max(this.crowdLevel,t.crowd),At.uCrowd.value=this.crowdLevel}isWide(){return this.hfov>Os+.01}ensureWide(t){let e=this.wide;if(!e){let i=new He({uniforms:{tCube:{value:null},uRot:{value:new $t},uD:{value:0},uR:{value:1},uAspect:{value:1}},vertexShader:y_,fragmentShader:b_,depthTest:!1,depthWrite:!1}),n=new se(new Ni(2,2),i);n.frustumCulled=!1;let r=new hr;r.add(n),e=this.wide={mat:i,scene:r,cam:new es(-1,1,1,-1,0,1),rt:null,cube:null,size:0,fwd:new k,dir:new k}}return(!e.rt||Math.abs(t-e.size)/e.size>.15)&&(e.rt&&e.rt.dispose(),e.rt=new Sr(t,{generateMipmaps:!1,minFilter:Ye,magFilter:Ye}),e.cube=new pr(this.camera.near,this.camera.far,e.rt),e.size=t,e.mat.uniforms.tCube.value=e.rt.texture),e}renderWide(){let t=this.renderer,e=this.camera,{d:i,R:n}=dm(this.hfov),r=t.getDrawingBufferSize(this._buf||(this._buf=new Zt)),a=r.x/r.y,o=r.x/2/n,l=this.quality==="low"?1024:this.quality==="medium"?1536:2048,c=this.quality==="low"?1:1.35,h=Hi.clamp(Math.round(2*o*c/64)*64,512,l),u=this.ensureWide(h),d=u.cube;d.coordinateSystem!==t.coordinateSystem&&(d.coordinateSystem=t.coordinateSystem,d.updateCoordinateSystem()),e.updateMatrixWorld(),d.position.copy(e.position),d.updateMatrixWorld();let p=At.uResolution.value,g=p.x,x=p.y,f=At.uLineWidth.value,m=At.uMinWidth.value,v=u.size/2/o;p.set(u.size,u.size),At.uLineWidth.value=f*v,At.uMinWidth.value=m*v,e.getWorldDirection(u.fwd);let w=n*Math.sqrt(1+1/(a*a)),b=i+1,_=Math.atan2(w,b)+Math.asin(Math.min(1,w*i/Math.sqrt(b*b+w*w))),M=Math.cos(Math.min(Math.PI,_+.96)),T=t.shadowMap.autoUpdate;T&&(t.shadowMap.autoUpdate=!1,t.shadowMap.needsUpdate=!0);let y=t.getRenderTarget(),E=0;for(let L=0;L<6;L++){let R=d.children[L];R.getWorldDirection(u.dir),!(u.dir.dot(u.fwd)<M)&&(t.setRenderTarget(u.rt,L),t.render(this.scene,R),E+=t.info.render.calls)}t.shadowMap.autoUpdate=T,t.setRenderTarget(y),p.set(g,x),At.uLineWidth.value=f,At.uMinWidth.value=m;let C=u.mat.uniforms;C.uRot.value.setFromMatrix4(e.matrixWorld),C.uD.value=i,C.uR.value=n,C.uAspect.value=a,t.render(u.scene,u.cam),this.wideCalls=E+1}projectToScreen(t,e){let i=this.camera;if(!this.isWide()){if(e.copy(t).applyMatrix4(i.matrixWorldInverse),e.z>-.05){let p=e.x>=0?1:-1,g=Hi.clamp(e.y/(Math.hypot(e.x,e.z)+.001),-.6,.6);return e.set(p*50,g*50,0)}return e.applyMatrix4(i.projectionMatrix)}let{d:n,R:r}=dm(this.hfov);e.copy(t).applyMatrix4(i.matrixWorldInverse);let a=e.length()||1,o=-e.z/a,l=Math.hypot(e.x,e.y)||1e-6,c=e.x/l,h=e.y/l,u=n+o,d=u>1e-4?(n+1)*Math.sqrt(Math.max(0,1-o*o))/u:1e4;return e.set(c*d/r,h*d*i.aspect/r,0),e}updateNets(t){let e=this.match.ball;for(let i=0;i<2;i++){let n=this.netState[i],r=e.net[i];r&&r.count!==n.count?(n.count=r.count,n.amp=Math.max(n.amp*.9,Math.min(.6,.12+r.depth*2)),n.x=r.x,n.y=r.y,n.z=r.z,n.dx=-r.nx,n.dy=-r.ny,n.dz=-r.nz,n.t=0,n.contact=!0,r.depth=0):(n.t+=t,n.contact=!1);let a=n.amp*Math.cos(n.t*14)*Math.exp(-n.t*3.4);n.t>3&&(n.amp=0);let o=i===0?At.uNetA.value:At.uNetB.value,l=i===0?At.uNetDA.value:At.uNetDB.value;o.set(n.x,n.y,n.z,a),l.set(n.dx,n.dy,n.dz)}}updateCamera(t,e,i){let n=this.camera;if(t.fov){let r;if(n.aspect<1)this.hfov=Math.min(t.fov,Os),r=Hi.clamp(Math.min(t.fov,110),35,110);else{this.hfov=t.mode==="fp"?t.fov:Math.min(t.fov,Os);let a=Math.min(this.hfov,Os);r=Hi.clamp(2*Math.atan(Math.tan(a*Math.PI/360)/n.aspect)*180/Math.PI,35,110)}Math.abs(r-n.fov)>.01&&(n.fov=r,n.updateProjectionMatrix())}else this.hfov=Math.min(this.hfov,Os);if(t.mode==="fp"&&this.localPlayer&&this.match){let r=this.localPlayer,a=r.prevPos.x+(r.pos.x-r.prevPos.x)*i,o=r.prevPos.z+(r.pos.z-r.prevPos.z)*i,l=t.eye??1.65;if(t.bob){let c=Math.min(1,r.speed/7.5);l+=Math.sin((r.prevGait+(r.gait-r.prevGait)*i)*Math.PI*4)*.012*c*t.bob}if(n.position.set(a+Math.sin(t.yaw)*.08,l,o+Math.cos(t.yaw)*.08),t.shake&&this.shake>0){let c=this.shake*t.shake;n.position.x+=(Math.random()-.5)*.02*c,n.position.y+=(Math.random()-.5)*.02*c}this.shake=Math.max(0,this.shake-e*4),n.rotation.set(t.pitch,t.yaw+Math.PI,0,"YXZ")}else if(t.mode==="orbit"){let r=t.angle;n.position.set(Math.cos(r)*t.radius,t.height,Math.sin(r)*t.radius),n.lookAt(t.target||this._origin||(this._origin=new k))}else if(t.pos){let r=t.pos,a=t.look;n.position.set(r.x??r[0],r.y??r[1],r.z??r[2]),a?n.lookAt(a.x??a[0],a.y??a[1],a.z??a[2]):n.rotation.set(t.pitch||0,(t.yaw||0)+Math.PI,0,"YXZ"),t.roll&&n.rotateZ(t.roll)}}celebrate(t,e,i,n=1){let r=this.style==="neo"?[i===0?I.SHIRT_0:I.SHIRT_1,I.GOLD,I.MARKER,I.LINES,I.STAND_C]:[I.INK,I.LINES,i===0?I.SHIRT_0:I.SHIRT_1];this.burst.spawn(t,1.5,e,Math.round(70*n),r,7)}renderPreview(t,e,i,n){let r=this.style,a=new ci(e,i,{samples:4}),o=At.uResolution.value.clone(),l=this.camera.aspect;this.setStyle(t),At.uResolution.value.set(e,i),At.uLineWidth.value=Hl[t].lineWidth,this.camera.aspect=e/i,this.camera.updateProjectionMatrix();let c=this.camera.position.clone(),h=this.camera.quaternion.clone();n&&(this.camera.position.set(n.pos[0],n.pos[1],n.pos[2]),this.camera.lookAt(new k(n.look[0],n.look[1],n.look[2]))),this.renderer.shadowMap.needsUpdate=!0,this.renderer.setRenderTarget(a),this.renderer.render(this.scene,this.camera);let u=new Uint8Array(e*i*4);this.renderer.readRenderTargetPixels(a,0,0,e,i,u),this.renderer.setRenderTarget(null),a.dispose();let d=document.createElement("canvas");d.width=e,d.height=i;let p=d.getContext("2d"),g=p.createImageData(e,i);for(let x=0;x<i;x++)g.data.set(u.subarray((i-1-x)*e*4,(i-x)*e*4),x*e*4);return p.putImageData(g,0,0),this.setStyle(r),this.camera.position.copy(c),this.camera.quaternion.copy(h),At.uResolution.value.copy(o),this.applyLineWidth(),this.camera.aspect=l,this.camera.updateProjectionMatrix(),d.toDataURL("image/png")}stats(){let t=this.renderer.info;return{calls:this.isWide()?this.wideCalls:t.render.calls,tris:t.render.triangles,people:this.venue?this.venue.people:0,wide:this.isWide()}}};function Or(s){let t=s>>>0;return()=>(t=t*1664525+1013904223>>>0,t/2147483648-1)}function mm(s,t){let e=Math.exp(-2*Math.PI*t/44100),i=0;for(let n=0;n<s.length;n++)i=(1-e)*s[n]+e*i,s[n]=i}function __(s,t){let e=Math.exp(-2*Math.PI*t/44100),i=0,n=0;for(let r=0;r<s.length;r++){let a=s[r];i=e*(i+a-n),n=a,s[r]=i}}function Ac(s,t,e){let i=2*Math.PI*t/44100,n=Math.sin(i)/(2*e),r=Math.cos(i),a=n,o=-n,l=1+n,c=-2*r,h=1-n,u=0,d=0,p=0,g=0;for(let x=0;x<s.length;x++){let f=s[x],m=(a*f+o*d-c*p-h*g)/l;d=u,u=f,g=p,p=m,s[x]=m}}function sn(s,t=.9){let e=0;for(let i=0;i<s.length;i++)e=Math.max(e,Math.abs(s[i]));if(e>0)for(let i=0;i<s.length;i++)s[i]*=t/e;return s}function Na(s,t,e,i,n,r){let a=Math.floor(44100*s),o=new Float32Array(a),l=Or(r),c=0;for(let h=0;h<a;h++){let u=h/44100,d=e+(t-e)*Math.exp(-u*38);c+=2*Math.PI*d/44100;let p=Math.exp(-u*(s>.12?26:40));o[h]=Math.sin(c)*p+l()*n*Math.exp(-u*140)+(h<44100*.004?l()*i:0)}return mm(o,5e3),sn(o,.95)}function M_(s){let t=Math.floor(52920),e=new Float32Array(t),i=Or(s),n=[[523,1],[1320,.6],[2130,.45],[3310,.3],[4870,.2]];for(let r=0;r<t;r++){let a=r/44100,o=0;for(let[l,c]of n)o+=Math.sin(2*Math.PI*l*a)*c*Math.exp(-a*(3+l/900));e[r]=o+i()*.3*Math.exp(-a*120)}return sn(e,.8)}function qu(s,t,e,i,n,r){let a=Math.floor(44100*s),o=new Float32Array(a),l=Or(r);for(let c=0;c<a;c++){let h=c/44100;o[c]=l()*Math.min(1,h/i)*Math.exp(-h*n)}return t&&mm(o,t),e&&__(o,e),sn(o,.8)}function fm(s){let t=Math.floor(44100*s.reduce((n,[r,a])=>n+r+a,0)),e=new Float32Array(t),i=0;for(let[n,r]of s){let a=Math.floor(44100*n),o=0;for(let l=0;l<a;l++){let c=l/44100,h=2950+90*Math.sin(2*Math.PI*28*c)+40*Math.sin(2*Math.PI*7*c);o+=2*Math.PI*h/44100;let u=Math.min(1,c/.02)*Math.min(1,(n-c)/.04);e[i+l]=(Math.sin(o)*.7+Math.sin(o*2)*.12)*u}i+=a+Math.floor(44100*r)}return sn(e,.55)}function S_(s,t=6){let e=Math.floor(44100*t),i=new Float32Array(e),n=Or(s);for(let o=0;o<e;o++)i[o]=n();let r=new Float32Array(e);for(let[o,l,c]of[[420,1.2,1],[900,1.5,.8],[1800,2,.4],[260,.9,.7]]){let h=i.slice();Ac(h,o,l);let u=n()*6;for(let d=0;d<e;d++)r[d]+=h[d]*c*(.75+.25*Math.sin(2*Math.PI*(d/e)*3+u))}let a=Math.floor(44100*.5);for(let o=0;o<a;o++){let l=o/a;r[o]=r[o]*l+r[e-a+o]*(1-l)}return sn(r.subarray(0,e-a),.6)}function w_(s,t=3.2){let e=Math.floor(44100*t),i=new Float32Array(e),n=Or(s);for(let a=0;a<e;a++)i[a]=n();let r=new Float32Array(e);for(let[a,o,l]of[[700,1.4,1],[1300,1.8,.7],[2500,2.2,.35],[380,1,.6]]){let c=i.slice();Ac(c,a,o);for(let h=0;h<e;h++)r[h]+=c[h]*l}for(let a=0;a<e;a++){let o=a/44100;r[a]*=Math.min(1,o/.25)*Math.exp(-Math.max(0,o-1.2)*1.3)}return sn(r,.85)}function T_(s){let t=Math.floor(70560),e=new Float32Array(t),i=Or(s);for(let r=0;r<t;r++)e[r]=i();let n=new Float32Array(t);for(let r=0;r<3;r++){let a=e.slice();Ac(a,380+r*180,3);for(let o=0;o<t;o++)n[o]+=a[o]}for(let r=0;r<t;r++){let a=r/44100;n[r]*=Math.min(1,a/.15)*Math.exp(-a*1.6)*(1-.3*a/1.6)}return sn(n,.7)}function pm(s,t,e){let i=Math.floor(44100*t),n=new Float32Array(i);for(let r=0;r<i;r++){let a=r/44100;n[r]=Math.sin(2*Math.PI*s*a)*Math.exp(-a*30)*Math.min(1,a/.003)}return sn(n,.5)}function Da(s,t){let e=Math.floor(44100*t),i=new Float32Array(e);for(let[n,r,a,o,l]of s){let c=0,h=Math.floor(a*44100),u=Math.min(e,Math.floor((a+o)*44100));for(let d=h;d<u;d++){let p=(d-h)/44100,g=p/o;c+=(n+(r-n)*g)/44100;let x=Math.min(1,p/.004)*Math.exp(-g*4);i[d]+=(Math.sin(2*Math.PI*c)+.25*Math.sin(4*Math.PI*c))*x*l}}return sn(i,.5)}function E_(s){let t=Math.floor(44100*s),e=new Float32Array(t),i=0,n=12345;for(let r=0;r<t;r++){n=n*1664525+1013904223>>>0;let a=r/t,o=.04+.5*Math.sin(Math.PI*a)**2;i+=(n/4294967296*2-1-i)*o,e[r]=i*Math.sin(Math.PI*a)}return sn(e,.35)}function A_(s){let t=Math.floor(12348.000000000002),e=new Float32Array(t),i=0;for(let r=0;r<t;r++){let o=210-60*(r/44100);i+=o/44100,e[r]=i%1*2-1}let n=new Float32Array(t);for(let[r,a,o]of[[650,5,1],[1700,7,.6],[2600,8,.3]]){let l=e.slice();Ac(l,r,a);for(let c=0;c<t;c++)n[c]+=l[c]*o}for(let r=0;r<t;r++){let a=r/44100;n[r]*=Math.min(1,a/.02)*Math.exp(-a*7)}return sn(n,.6)}var Ec=class{constructor(){this.ctx=null,this.buffers={},this.vol={master:.8,sfx:.9,crowd:.6},this.ready=!1,this.crowdLevel=.3,this.muted=!1}init(){if(this.ctx)return;let t=window.AudioContext||window.webkitAudioContext;if(!t)return;try{this.ctx=new t({latencyHint:"interactive"})}catch{return}let e=this.ctx;this.master=e.createGain(),this.sfx=e.createGain(),this.crowd=e.createGain(),this.sfx.connect(this.master),this.crowd.connect(this.master),this.master.connect(e.destination);let i={touch:Na(.07,260,120,.25,.25,1),pass:Na(.1,220,90,.5,.35,2),shot:Na(.16,190,60,1,.7,3),bounce:Na(.08,140,70,.1,.1,4),post:M_(5),net:qu(.6,3e3,400,.01,7,6),tackle:qu(.18,1800,120,.004,22,7),slide:qu(.55,2400,500,.03,5,8),catch:Na(.1,160,80,.6,.6,9),whistle:fm([[.32,0]]),whistleLong:fm([[.3,.12],[.3,.12],[.75,0]]),crowd:S_(10),cheer:w_(11),groan:T_(12),ui:pm(1400,.06,13),ack:pm(1900,.09,14),shout:A_(15),uiHover:Da([[2600,2400,0,.025,.5]],.03),uiClick:Da([[900,520,0,.07,1]],.08),uiConfirm:Da([[660,660,0,.09,.9],[990,990,.07,.16,1]],.25),uiError:Da([[300,280,0,.1,1],[220,200,.1,.16,1]],.28),uiSwoosh:E_(.22),uiReward:Da([[784,784,0,.1,.8],[988,988,.08,.1,.8],[1319,1319,.16,.3,1]],.48)};for(let[n,r]of Object.entries(i)){let a=e.createBuffer(1,r.length,44100);a.copyToChannel(r,0),this.buffers[n]=a}this.applyVolumes(),this.ready=!0}resume(){this.ctx&&this.ctx.state!=="running"&&!this.muted&&this.ctx.resume().catch(()=>{})}suspend(){this.ctx&&this.ctx.state==="running"&&this.ctx.suspend().catch(()=>{})}setMuted(t){this.muted=t,t?this.suspend():this.resume()}setVolumes(t){Object.assign(this.vol,t),this.applyVolumes()}setPlatformMute(t){this.platformMute=!!t,this.applyVolumes()}applyVolumes(){this.ctx&&(this.master.gain.value=this.platformMute?0:this.vol.master,this.sfx.gain.value=this.vol.sfx,this.crowd.gain.value=this.vol.crowd)}play(t,e={}){if(!this.ready||this.ctx.state!=="running")return;let i=this.buffers[t];if(!i)return;let n=this.ctx,r=n.createBufferSource();r.buffer=i,e.rate&&(r.playbackRate.value=e.rate);let a=n.createGain();a.gain.value=e.gain??1;let o=a;if(e.pan&&n.createStereoPanner){let l=n.createStereoPanner();l.pan.value=Math.max(-1,Math.min(1,e.pan)),a.connect(l),o=l}return r.connect(a),o.connect(e.group==="crowd"?this.crowd:this.sfx),r.start(),r}startCrowd(t=.4){if(!this.ready)return;this.stopCrowd();let e=this.ctx;this.crowdSrc=e.createBufferSource(),this.crowdSrc.buffer=this.buffers.crowd,this.crowdSrc.loop=!0,this.crowdGain=e.createGain(),this.crowdGain.gain.value=0,this.crowdSrc.connect(this.crowdGain).connect(this.crowd),this.crowdSrc.start(),this.baseCrowd=t,this.setExcitement(0)}stopCrowd(){if(this.crowdSrc){try{this.crowdSrc.stop()}catch{}this.crowdSrc.disconnect(),this.crowdSrc=null}}setExcitement(t){if(!this.crowdGain)return;let e=this.baseCrowd*(.45+.9*Math.min(1,t));this.crowdGain.gain.setTargetAtTime(e,this.ctx.currentTime,.4)}};var gm=[["W A S D","Move (relative to where you look)"],["Mouse","Look"],["Shift","Sprint"],["Left mouse","Shoot (hold to charge, release to strike)"],["Right mouse","Pass to the highlighted teammate (hold briefly for more power)"],["Space","Through pass (with the ball) / call for a pass (without it)"],["E","Standing tackle (lunges at the ball when it is close)"],["C","Slide tackle"],["Esc","Pause"]],xm=[["Left thumb","Drag anywhere on the left side to move; push to the edge of the stick to sprint"],["Right thumb","Drag anywhere on the right side to look and aim"],["SHOOT","Hold to charge, release to strike (slide your thumb on it to fine-tune the aim)"],["PASS","Pass to the ringed teammate (hold briefly for more power)"],["THRU / CALL","Through pass with the ball; call for the ball without it"],["TACKLE / SLIDE","Replace SHOOT and PASS while an opponent has the ball"],["II","Pause"]],Rc=class{constructor(t){this.el=t,this.keys=new Set,this.lookX=0,this.lookY=0,this.buttons=0,this.locked=!1,this.lockSupported="requestPointerLock"in t,this.dragMode=!this.lockSupported,this.active=!1,this.listeners=[],this.onPause=null,this.onLockLost=null,this.onLockError=null,this.sensitivity=1,this.invertY=!1,this.lastLockExit=0,this.touchMode=!1,this.touch={active:!1,f:0,r:0,sprint:!1},this.lastTouchAt=-1e9,this.handlers={keydown:e=>this.keydown(e),keyup:e=>this.keyup(e),mousemove:e=>this.mousemove(e),mousedown:e=>this.mousedown(e),mouseup:e=>this.mouseup(e),contextmenu:e=>{this.active&&e.preventDefault()},plc:()=>this.lockChange(),ple:()=>{this.locked=!1,this.onLockError&&this.onLockError()},blur:()=>{this.keys.clear(),this.releaseAll()},touchSeen:e=>{(e.pointerType==="touch"||e.pointerType==="pen")&&(this.lastTouchAt=performance.now())}},window.addEventListener("pointerdown",this.handlers.touchSeen,!0),window.addEventListener("pointerup",this.handlers.touchSeen,!0),window.addEventListener("keydown",this.handlers.keydown),window.addEventListener("keyup",this.handlers.keyup),window.addEventListener("mousemove",this.handlers.mousemove),window.addEventListener("mousedown",this.handlers.mousedown),window.addEventListener("mouseup",this.handlers.mouseup),window.addEventListener("contextmenu",this.handlers.contextmenu),document.addEventListener("pointerlockchange",this.handlers.plc),document.addEventListener("pointerlockerror",this.handlers.ple),window.addEventListener("blur",this.handlers.blur)}on(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(e=>e!==t)}}emit(t,e){for(let i of this.listeners)i(t,e)}requestLock(){if(!this.lockSupported)return this.dragMode=!0,!1;try{let t=this.el.requestPointerLock();t&&t.catch&&t.catch(()=>{this.onLockError&&this.onLockError()})}catch{return this.dragMode=!0,!1}return!0}exitLock(){document.pointerLockElement&&document.exitPointerLock()}lockChange(){let t=this.locked;this.locked=document.pointerLockElement===this.el,this.locked&&(this.dragMode=!1,!t&&this.onLockGained&&this.onLockGained()),t&&!this.locked&&(this.lastLockExit=performance.now(),this.releaseAll(),this.active&&this.onLockLost&&this.onLockLost())}releaseAll(){this.buttons&1&&this.emit("shoot",!1),this.buttons&2&&this.emit("pass",!1),this.buttons=0,this.touch.active=!1,this.touch.f=0,this.touch.r=0,this.touch.sprint=!1,this.onReleaseAll&&this.onReleaseAll()}fromTouch(t){return t.sourceCapabilities&&t.sourceCapabilities.firesTouchEvents||performance.now()-this.lastTouchAt<900}touchAction(t,e){this.active&&(t==="shoot"&&(e?this.buttons|=1:this.buttons&=-2),t==="pass"&&(e?this.buttons|=2:this.buttons&=-3),!(!e&&(t==="tackle"||t==="slide"))&&this.emit(t,e))}touchLook(t,e){this.active&&(this.lookX+=t,this.lookY+=e)}keydown(t){let e=t.code;if(e==="Escape"){this.onPause&&this.onPause();return}this.active&&(["Space","ShiftLeft","ShiftRight","KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e)&&t.preventDefault(),!t.repeat&&(this.keys.add(e),e==="Space"?this.emit("through",!0):e==="KeyE"?this.emit("tackle",!0):e==="KeyC"?this.emit("slide",!0):e==="KeyP"&&this.onPause&&this.onPause()))}keyup(t){this.keys.delete(t.code),t.code==="Space"&&this.emit("through",!1)}mousedown(t){!this.active||this.fromTouch(t)||!this.locked&&!this.dragMode||t.target!==this.el&&!this.locked||(t.button===0&&(this.buttons|=1,this.emit("shoot",!0)),t.button===2&&(this.buttons|=2,this.emit("pass",!0),t.preventDefault()))}mouseup(t){this.fromTouch(t)||(t.button===0&&this.buttons&1&&(this.buttons&=-2,this.emit("shoot",!1)),t.button===2&&this.buttons&2&&(this.buttons&=-3,this.emit("pass",!1)))}mousemove(t){!this.active||this.fromTouch(t)||(this.locked||this.dragMode&&t.buttons&7)&&(this.lookX+=t.movementX||0,this.lookY+=t.movementY||0)}axes(){let t=this.keys,e=(t.has("KeyW")?1:0)-(t.has("KeyS")?1:0),i=(t.has("KeyD")?1:0)-(t.has("KeyA")?1:0),n=t.has("ShiftLeft")||t.has("ShiftRight"),r=this.touch;return r.active&&(e=Math.max(-1,Math.min(1,e+r.f)),i=Math.max(-1,Math.min(1,i+r.r)),n=n||r.sprint),{f:e,r:i,sprint:n}}consumeLook(t,e){let i=.0022*this.sensitivity;t.yaw-=this.lookX*i,t.pitch-=this.lookY*i*(this.invertY?-1:1);let n=this.keys,r=2.2*e*this.sensitivity;n.has("ArrowLeft")&&(t.yaw+=r),n.has("ArrowRight")&&(t.yaw-=r),n.has("ArrowUp")&&(t.pitch+=r*.6*(this.invertY?-1:1)),n.has("ArrowDown")&&(t.pitch-=r*.6*(this.invertY?-1:1)),this.lookX=0,this.lookY=0,t.pitch=Math.max(-1.35,Math.min(1,t.pitch))}get held(){return{lmb:!!(this.buttons&1),rmb:!!(this.buttons&2)}}};var xe=(s,t,e,i)=>{let n=document.createElement(s);return t&&(n.className=t),i!=null&&(n.innerHTML=i),e&&e.appendChild(n),n},Cc=class{constructor(t){this.root=xe("div","hud hidden",t),this.poss=xe("div","hud-poss",this.root),xe("div","hud-poss-label",this.poss,"YOU HAVE THE BALL"),this.hasBall=!1;let e=xe("div","hud-top",this.root);this.teamA=xe("span","hud-team",e),this.score=xe("span","hud-score",e,"0 - 0"),this.teamB=xe("span","hud-team",e),this.clock=xe("div","hud-clock",this.root,"00:00"),this.phase=xe("div","hud-phase",this.root);let i=xe("div","hud-player",this.root);this.ratingEl=xe("div","hud-rating",i,"6.0"),xe("div","hud-rating-label",i,"RATING");let n=xe("div","hud-stamina",i);this.stamFill=xe("div","hud-stamina-fill",n),this.nameEl=xe("div","hud-name",i),this.cross=xe("div","hud-cross",this.root),this.power=xe("div","hud-power hidden",this.root),this.powerFill=xe("div","hud-power-fill",this.power),this.hint=xe("div","hud-hint",this.root),this.notes=xe("div","hud-notes",this.root),this.arrow=xe("div","hud-arrow hidden",this.root),this.banner=xe("div","hud-banner hidden",this.root),this.fade=xe("div","hud-fade",this.root),this.replayEl=xe("div","hud-replay",this.root),xe("div","rp-bar rp-top",this.replayEl),xe("div","rp-bar rp-bot",this.replayEl),xe("div","rp-tag",this.replayEl,"<i></i>REPLAY"),this.replayInfo=xe("div","rp-info",this.replayEl),this.replayProg=xe("i","",xe("div","rp-prog",this.replayEl)),this.replaySkip=xe("button","rp-skip",this.replayEl,"Skip replay"),this.replaySkip.addEventListener("pointerdown",r=>r.stopPropagation()),this.replaySkip.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.onSkipReplay&&this.onSkipReplay()}),this.radar=xe("canvas","hud-radar",this.root),this.radar.width=180,this.radar.height=250,this.rctx=this.radar.getContext("2d"),this.lastNotes=[],this.v=new k,this.bannerUntil=0,this.fadeUntil=0}show(t){this.root.classList.toggle("hidden",!t)}notify(t,e=""){let i=xe("div","hud-note "+e,this.notes,t);for(this.lastNotes.push(i),setTimeout(()=>i.classList.add("out"),1300),setTimeout(()=>i.remove(),1700);this.notes.children.length>3;)this.notes.firstChild.remove()}showBanner(t,e="",i=2200,n=""){this.banner.className="hud-banner "+n,this.banner.innerHTML=`<div class="b-main">${t}</div>${e?`<div class="b-sub">${e}</div>`:""}`,this.bannerUntil=performance.now()+i}flashFade(){this.fade.classList.remove("on"),this.fade.offsetWidth,this.fade.classList.add("on")}setReplay(t,e="",i=!1){this.root.classList.toggle("replaying",t),t&&(this.replayInfo.textContent=e,this.replaySkip.innerHTML=i?"Skip replay <b>Space / click</b>":"Skip replay \u25B8",this.replayProg.style.width="0%")}updateReplay(t){this.replayProg.style.width=`${Math.round((t.t-t.t0)/Math.max(.01,t.t1-t.t0)*100)}%`}update(t){let e=t.match,i=e.human;this.teamA.textContent=e.teams[0].short,this.teamB.textContent=e.teams[1].short,this.teamA.style.setProperty("--kit",t.kitA||"#c00"),this.teamB.style.setProperty("--kit",t.kitB||"#00c");let n=`${e.teams[0].score} - ${e.teams[1].score}`;n!==this.score.textContent&&((this.score.textContent!=="0 - 0"||n!=="0 - 0")&&(this.score.classList.remove("bump"),this.score.offsetWidth,this.score.classList.add("bump")),this.score.textContent=n),this.clock.textContent=t.clockText??e.displayClock,this.phase.textContent=t.phaseText||"",i&&(this.ratingEl.textContent=e.stats.rating(i).toFixed(1),this.stamFill.style.width=`${Math.round(i.stamina*100)}%`,this.stamFill.classList.toggle("low",i.stamina<.3),this.nameEl.textContent=`${i.number} ${i.name}`);let r=i&&i.action,a=r&&r.type==="kick"&&(r.kind==="shot"||r.kind==="pass")&&!r.contacted&&r.charge>.01,o=t.intentCharge||0;this.power.classList.toggle("hidden",!(a||o>.01)),(a||o>.01)&&(this.powerFill.style.width=`${Math.round((a?r.charge:o)*100)}%`),this.hint.textContent=t.hint||"";let l=!!i&&e.ball.owner===i&&e.ball.state==="controlled"&&e.phase==="playing";l!==this.hasBall&&(this.hasBall=l,this.poss.classList.toggle("on",l)),this.banner.classList.toggle("hidden",performance.now()>this.bannerUntil),this.updateArrow(t),this.drawRadar(t)}updateArrow(t){let e=t.match,i=e.ball.pos,n=t.view.projectToScreen(this.v.set(i.x,i.y,i.z),this.v);if(!(Math.abs(n.x)>.98||Math.abs(n.y)>.98)||e.phase==="goal"||t.noArrow||this.hasBall){this.arrow.classList.add("hidden");return}let a=Math.atan2(n.y,n.x),o=.86,l=Math.min(o/Math.max(Math.abs(Math.cos(a)),.001),o/Math.max(Math.abs(Math.sin(a)),.001)),c=(Math.cos(a)*l*.5+.5)*100,h=(-Math.sin(a)*l*.5+.5)*100;this.arrow.classList.remove("hidden"),this.arrow.style.left=`${c}%`,this.arrow.style.top=`${h}%`,this.arrow.style.transform=`translate(-50%,-50%) rotate(${-a}rad)`}drawRadar(t){let e=t.match,i=this.rctx,n=this.radar.width,r=this.radar.height,a=e.human,o=a?a.team:0,l=e.attackDir(o),c=10,h=(n-c*2)/Z.W,u=(r-c*2)/Z.L,d=(f,m)=>[c+(Z.HW+m*l)*h,c+(Z.HL-f*l)*u],p=t.style;i.clearRect(0,0,n,r),i.fillStyle="rgba(28,120,64,0.88)",i.fillRect(0,0,n,r),i.strokeStyle="rgba(255,255,255,0.85)",i.lineWidth=1,i.strokeRect(c,c,n-c*2,r-c*2),i.beginPath(),i.moveTo(c,r/2),i.lineTo(n-c,r/2),i.stroke(),i.beginPath(),i.arc(n/2,r/2,Kt.CIRCLE_R*h,0,Math.PI*2),i.stroke();for(let f of[Z.HL,-Z.HL]){let[m,v]=d(f,Kt.PEN_HW),[w,b]=d(f-Math.sign(f)*Kt.PEN_D,-Kt.PEN_HW);i.strokeRect(Math.min(m,w),Math.min(v,b),Math.abs(w-m),Math.abs(b-v));let[_,M]=d(f,ft.HW),[T]=d(f,-ft.HW);i.lineWidth=3,i.beginPath(),i.moveTo(_,M),i.lineTo(T,M),i.stroke(),i.lineWidth=1}for(let f of e.players){let[m,v]=d(f.pos.x,f.pos.z);i.fillStyle=f.team===0?t.kitA:t.kitB,i.strokeStyle="#111",i.beginPath(),i.arc(m,v,f===a?0:3.6,0,Math.PI*2),i.fill(),i.stroke()}if(a){let[f,m]=d(a.pos.x,a.pos.z),v=t.camYaw,w=Math.sin(v),_=Math.cos(v)*l,M=-w*l;i.fillStyle="#ffc61a",i.beginPath(),i.moveTo(f+_*9,m+M*9),i.lineTo(f-M*5-_*3,m+_*5-M*3),i.lineTo(f+M*5-_*3,m-_*5-M*3),i.closePath(),i.fill(),i.strokeStyle="#070b1d",i.lineWidth=2,i.stroke()}let[g,x]=d(e.ball.pos.x,e.ball.pos.z);i.fillStyle="#fff",i.strokeStyle="#000",i.lineWidth=1.5,i.beginPath(),i.arc(g,x,3,0,Math.PI*2),i.fill(),i.stroke()}};var Us=(s,t,e,i)=>{let n=document.createElement(s);return t&&(n.className=t),i!=null&&(n.innerHTML=i),e&&e.appendChild(n),n};var R_={attack:{a:["shoot","SHOOT"],b:["pass","PASS"],c:["through","THRU"]},call:{a:["shoot","SHOOT"],b:["pass","PASS"],c:["through","CALL"]},defend:{a:["tackle","TACKLE"],b:["slide","SLIDE"],c:[null,""]},loose:{a:["shoot","SHOOT"],b:["pass","PASS"],c:["slide","SLIDE"]}},Ic=class{constructor(t,e){this.app=t,this.input=t.input;let i=this.root=Us("div","touch hidden",e);this.zone=Us("div","tc-zone",i),this.stick=Us("div","tc-stick idle",i),this.knob=Us("div","tc-knob",this.stick),this.btn={};for(let o of["c","b","a"])this.btn[o]=Us("button",`tc-btn tc-${o}`,i),this.btn[o].dataset.k=o;this.pauseBtn=Us("button","tc-pause",i,"<i></i><i></i>"),this.pauseBtn.setAttribute("aria-label","Pause"),Us("div","tc-rotate",i,"Turn your phone sideways for a wider view"),this.ptrs=new Map,this.stickId=null,this.layout="attack",this.visible=!1,this.applyLayout();let n=o=>this.onDown(o),r=o=>this.onMove(o),a=o=>this.onUp(o);i.addEventListener("pointerdown",n),i.addEventListener("pointermove",r),i.addEventListener("pointerup",a),i.addEventListener("pointercancel",a),i.addEventListener("lostpointercapture",a),i.addEventListener("contextmenu",o=>o.preventDefault()),this.input.onReleaseAll=()=>this.reset()}setVisible(t){t!==this.visible&&(this.visible=t,this.root.classList.toggle("hidden",!t),t||this.reset())}reset(){for(let[,e]of this.ptrs)e.kind==="btn"&&this.btn[e.k].classList.remove("down");for(let[,e]of this.ptrs)e.kind==="btn"&&e.type&&this.input.touchAction(e.type,!1);this.ptrs.clear(),this.stickId=null;let t=this.input.touch;t.active=!1,t.f=0,t.r=0,t.sprint=!1,this.stick.classList.add("idle"),this.stick.classList.remove("sprint"),this.stick.style.left="",this.stick.style.top="",this.knob.style.transform=""}update(t){let e=t.match,i=t.human;if(!i)return;let n=e.ball,r=n.owner,a,o=e.phase==="restart"&&e.restart;if(r===i||o&&o.taker===i)a="attack";else if(r&&r.team!==i.team)a="defend";else if(r)a="call";else{let l=n.lastTouch;a=(o?o.team===i.team:e.possTeam===i.team&&!!l&&l.team===i.team)?"call":"loose"}a==="defend"?this.defendUntil=e.time+.8:a==="loose"&&e.time<(this.defendUntil||0)&&(a="defend"),a!==this.layout&&(this.layout=a,this.applyLayout()),a==="defend"&&this.btn.a.classList.toggle("cool",e.time<i.tackleReadyAt),a==="call"&&this.btn.c.classList.toggle("cool",e.time<i.requestReadyAt)}applyLayout(){let t=R_[this.layout];for(let e of["a","b","c"]){let[i,n]=t[e],r=this.btn[e];r.textContent=n,r.dataset.type=i||"",r.classList.toggle("off",!i),r.classList.remove("cool")}}radius(){return Math.max(46,Math.min(72,Math.min(innerWidth,innerHeight)*.14))}onDown(t){if(t.pointerType==="mouse")return;t.preventDefault();let e=t.target;try{e.setPointerCapture(t.pointerId)}catch{}if(e===this.pauseBtn){this.ptrs.set(t.pointerId,{kind:"pause"});return}let i=e.classList.contains("tc-btn")?e.dataset.k:null;if(i){let n=this.btn[i].dataset.type;if(!n)return;this.ptrs.set(t.pointerId,{kind:"btn",k:i,type:n,x:t.clientX,y:t.clientY}),this.btn[i].classList.add("down"),this.input.touchAction(n,!0);return}if(t.clientX<innerWidth*.42&&this.stickId==null){this.stickId=t.pointerId;let n={kind:"stick",ox:t.clientX,oy:t.clientY};this.ptrs.set(t.pointerId,n),this.stick.classList.remove("idle"),this.placeStick(n),this.moveStick(n,t.clientX,t.clientY)}else this.ptrs.set(t.pointerId,{kind:"look",x:t.clientX,y:t.clientY})}onMove(t){let e=this.ptrs.get(t.pointerId);if(e){if(t.preventDefault(),e.kind==="stick")this.moveStick(e,t.clientX,t.clientY);else if(e.kind==="look"||e.kind==="btn"&&(e.type==="shoot"||e.type==="pass")){let i=e.kind==="look"?1.35:.9;this.input.touchLook((t.clientX-e.x)*i,(t.clientY-e.y)*i),e.x=t.clientX,e.y=t.clientY}}}onUp(t){let e=this.ptrs.get(t.pointerId);if(e){if(this.ptrs.delete(t.pointerId),e.kind==="pause"){t.type==="pointerup"&&this.app.pause();return}if(e.kind==="btn"){this.btn[e.k].classList.remove("down"),this.input.touchAction(e.type,!1);return}if(e.kind==="stick"){this.stickId=null;let i=this.input.touch;i.active=!1,i.f=0,i.r=0,i.sprint=!1,this.stick.classList.add("idle"),this.stick.classList.remove("sprint"),this.stick.style.left="",this.stick.style.top="",this.knob.style.transform=""}}}placeStick(t){this.stick.style.left=`${t.ox}px`,this.stick.style.top=`${t.oy}px`}moveStick(t,e,i){let n=this.radius(),r=e-t.ox,a=i-t.oy,o=Math.hypot(r,a),l=n*1.25;o>l&&(t.ox+=r/o*(o-l),t.oy+=a/o*(o-l),r=e-t.ox,a=i-t.oy,o=l,this.placeStick(t));let c=Math.min(1,o/n),h=.12,u=c<h?0:(c-h)/(1-h),d=this.input.touch;d.active=!0,d.f=o>0?-a/o*u:0,d.r=o>0?r/o*u:0,d.sprint=o/n>.92,this.stick.classList.toggle("sprint",d.sprint);let p=Math.min(o,n)/(o||1);this.knob.style.transform=`translate(${r*p}px, ${a*p}px)`}};var Pc=class{constructor(){this.handlers=new Map,this.log=[],this.nextId=1,this.maxLog=4e3}on(t,e){return this.handlers.has(t)||this.handlers.set(t,[]),this.handlers.get(t).push(e),()=>{let i=this.handlers.get(t),n=i.indexOf(e);n>=0&&i.splice(n,1)}}emit(t,e){let i=Object.assign({id:this.nextId++,type:t},e);this.log.push(i),this.log.length>this.maxLog&&this.log.splice(0,this.log.length-this.maxLog);let n=this.handlers.get(t);if(n)for(let a=0;a<n.length;a++)n[a](i);let r=this.handlers.get("*");if(r)for(let a=0;a<r.length;a++)r[a](i);return i}};var Sn=class{constructor(t=1){this.s=t>>>0||1}next(){let t=(this.s+=1831565813)>>>0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return Math.floor(this.range(t,e+1))}chance(t){return this.next()<t}pick(t){return t[Math.floor(this.next()*t.length)%t.length]}gauss(){return(this.next()+this.next()+this.next()+this.next()-2)*1.732}};function wn(s){let t=2166136261;for(let e=0;e<s.length;e++)t^=s.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function vm(s,t,e){let i=Math.abs(s);return i>Z.HL&&Math.abs(e)<ft.HW+.05&&t<ft.H+.05&&i<jl(t)+.05}function C_(s,t,e){let i=t.pos.x,n=t.pos.z,r=e.pos.x,a=e.pos.z;if(vm(r,e.pos.y,a)!==vm(i,.5,n))return!1;for(let o of s.players){if(o===t)continue;let l=nn(o.pos.x,o.pos.z,i,n,r,a);if(l.t>.2&&l.t<.85&&l.d<.24)return!1}return!0}function I_(s,t,e){let i=s.time;if(i<t.noCaptureUntil||i<t.downUntil)return!1;let n=t.action;if(n&&(n.type==="slide"||n.type==="dive"||n.type==="tackle"||n.type==="kick"&&!n.contacted)||t.isGK&&s.keeperHandles(t,e))return!1;let r=e.pos.x-t.pos.x,a=e.pos.z-t.pos.z,o=Math.sqrt(r*r+a*a),l=Me.CONTROL_RADIUS*(t.isHuman?s.assist.claim:1);if(o>l||e.pos.y>Me.CONTROL_HEIGHT)return!1;let c=-(r*(e.vel.x-t.vel.x)+a*(e.vel.z-t.vel.z))/(o||1);if(o>.72&&c>.6)return!1;let h=e.vel.x-t.vel.x,u=e.vel.z-t.vel.z,d=e.vel.y,p=Math.sqrt(h*h+u*u+d*d),g=(e.pos.y>.35?10.5:14.5)+t.attrs.control*.08+(t.isHuman?(s.assist.claim-1)*16:0);if(p>g||o>l*(1-ht((p-6)/14,0,.45)))return!1;let x=e.lastKick;if(x&&x.player!==t&&x.target!==t&&p>4){let m=x.player&&x.player.isHuman&&s.isOpp(t)?s.assist.oppHumanPassReact:.16;if(s.time-x.t<m)return!1}let f=e.owner;if(f){if(f.team===t.team)return!1;let m=f.pos.distXZ(e.pos),v=Me.PROTECT_RADIUS+(f.isHuman?.5*s.assist.stick:0);if(m<=v||o>=m-.05)return!1}return C_(s,t,e)}function ym(s,t){let e=s.ball;if(e.state==="held"||e.state==="dead")return;let i=s.time,n=e.owner;n&&(n.pos.distXZ(e.pos)>Me.LOSE_RADIUS||e.pos.y>1.7||i<n.downUntil||n.action&&n.action.type==="slide")&&s.loseControl("loose");let r=null,a=1e9;for(let o of s.players){if(o===e.owner||!I_(s,o,e))continue;let l=o.pos.distXZ(e.pos);(l<a-1e-6||Math.abs(l-a)<=1e-6&&r&&o.id<r.id)&&(r=o,a=l)}r&&(P_(s,r),s.gainControl(r)),e.owner&&e.state==="controlled"&&L_(s,e.owner,t)}function P_(s,t){let e=s.ball,i=e.vel.x-t.vel.x,n=e.vel.z-t.vel.z,r=Math.sqrt(i*i+n*n+e.vel.y*e.vel.y),a=t.attrs.control/100,o=ht((r-4)/15,0,1)*(1.15-a*.7);if(t.isHuman)o*=s.assist.touch;else if(s.isOpp(t)){let M=s.aiParams[t.team].touch;o=Math.min(1.2,o*M+.04*(M-1))}let l=Math.hypot(t.desired.x,t.desired.z),c,h;l>1?(c=t.desired.x/l,h=t.desired.z/l):(c=Math.sin(t.yaw),h=Math.cos(t.yaw));let u=.7+o*3+(t.sprint&&l>1?1.2:0);t.isHuman&&(u*=1-.45*s.assist.stick);let d=s.rng.gauss()*o*.45,p=Math.cos(d),g=Math.sin(d),x=c*p+h*g,f=-c*g+h*p,m=l>1?.95:.6,v=t.vel.x*m+x*u,w=t.vel.z*m+f*u,b=0;e.pos.y>.2&&(b=Math.min(0,e.vel.y)*.15-.4),e.setVelocity(new at(v,b,w)),e.sideSpin=0;let _=(e.pos.x-t.pos.x)*Math.cos(t.yaw)-(e.pos.z-t.pos.z)*Math.sin(t.yaw);t.touch={foot:_>0?"L":"R",time:s.time,x:e.pos.x,y:e.pos.y,z:e.pos.z,kind:"receive"},t.lastDribbleTouch=s.time,s.events.emit("touch",{player:t,kind:"receive",strength:r,t:s.time})}function L_(s,t,e){let i=t.action;if(i&&(i.type==="kick"&&!i.charging||i.type==="tackle"||i.type==="slide"))return;let n=!!(i&&i.type==="kick"&&i.charging);if(t.isHuman&&s.assist.stick>0){k_(s,t,e,n);return}let r=s.ball,a=s.time;if(a-(t.lastDribbleTouch||0)<.14||r.pos.y>.45)return;let o=r.pos.x-t.pos.x,l=r.pos.z-t.pos.z;if(Math.hypot(o,l)>1.12)return;let h=Math.hypot(t.desired.x,t.desired.z),u=t.speed,d=r.vel.x,p=r.vel.z,g=Math.hypot(d,p),x=h>=.5,f=x?t.desired.x/h:Math.sin(t.yaw),m=x?t.desired.z/h:Math.cos(t.yaw),v=x?Math.min(h,t.maxSpeed(t.sprint,!0)):0,w=t.sprint&&v>t.jogSpeed()*1.02,b=.45+v*.07+(w?v*.17:0);n&&(b=.4+v*.05);let _=g>1&&x?Math.abs(us(Bt(d,p),Bt(f,m))):0,M=(d-t.vel.x)*f+(p-t.vel.z)*m,T=o*f+l*m,y=x&&(_>.6&&g>1.5||T>b*1.1&&M>1.2),E=null;if(u>1.3&&!y){let Yt=Ir(u),ae=Pr(Yt),kt=ae+(1-ae)*.55;for(let[he,Ie]of[["L",0],["R",.5]]){let Qe=((t.prevGait-Ie)%1+1)%1,Ee=((t.gait-Ie)%1+1)%1;(Qe<kt&&Ee>=kt||Ee<Qe&&(Qe<kt||Ee>=kt))&&(E=he)}if(!E)return}else{if(!y&&a-(t.lastDribbleTouch||0)<.28)return;E=o*Math.cos(t.yaw)-l*Math.sin(t.yaw)>0?"L":"R"}if(!x){(Math.hypot(d-t.vel.x,p-t.vel.z)>.8||g>1.2)&&(r.setVelocity(new at(t.vel.x*.45,0,t.vel.z*.45)),Yu(s,t,E,"stop",1));return}if(T<-.35&&u>2.5)return;let C=.26,L=o+(d-t.vel.x)*C,R=l+(p-t.vel.z)*C,D=L*f+R*m,N=Math.abs(L*m-R*f);if(!(y||D<b*.6||N>.3||_>.35||g<v*.75&&D<b))return;let X=w?1:.8,Y=o*m-l*f,st=t.vel.x*f+t.vel.z*m,K=st<v?(v-st)**2/26:0,tt=Math.max(0,b-T-K),q=v;for(let Yt=0;Yt<2;Yt++){let ae=.6+.014*q*q;q=v+Math.sqrt(2*ae*tt)}T>b&&(q=v-Math.min(1.5,(T-b)*1.5)),q=ht(q,v*.6,v+3);let mt=-Y/X,wt=f*q+m*mt,ot=m*q-f*mt,it=Math.hypot(wt,ot)||.01,zt=wt/it,V=ot/it;if(g>2.5){let Yt=w?.9:1.4,ae=Bt(d,p),kt=Bt(zt,V),he=us(ae,kt);if(Math.abs(he)>Yt){let Ie=ae+Math.sign(he)*Yt;zt=Math.sin(Ie),V=Math.cos(Ie),it=Math.min(it,v*.8+1)}}let J=t.attrs.control,ut=(100-J)*45e-5*(1+u/6);t.isHuman?ut*=s.assist.touch:s.isOpp(t)&&(ut*=s.aiParams[t.team].touch);let Rt=s.rng.gauss()*ut,ct=Math.cos(Rt),Ft=Math.sin(Rt),ve=zt*ct+V*Ft,qt=-zt*Ft+V*ct;it*=1+s.rng.gauss()*(100-J)*.0012,r.setVelocity(new at(ve*it,0,qt*it)),Yu(s,t,E,"dribble",it)}function k_(s,t,e,i){let n=s.ball,r=s.time;if(n.pos.y>.9)return;let a=s.assist.stick,o=t.faceYaw!=null?t.faceYaw:t.yaw,l=Math.sin(o),c=Math.cos(o),h=Math.hypot(t.desired.x,t.desired.z),u=l,d=c;if(h>.5){let R=t.desired.x/h,D=t.desired.z/h;if(R*l+D*c>-.3){u=R*.75+l*.25,d=D*.75+c*.25;let N=Math.hypot(u,d)||1;u/=N,d/=N}}let p=Math.hypot(t.vel.x,t.vel.z),g=i?.48+p*.03:.45+p*.035+(t.sprint?p*.02:0);g*=1+(1-a)*.5;let x=t.pos.x+u*g,f=t.pos.z+d*g,m=5+6*a,v=t.vel.x+(x-n.pos.x)*m,w=t.vel.z+(f-n.pos.z)*m,b=v-t.vel.x,_=w-t.vel.z,M=Math.hypot(b,_),T=3.5+3.5*a;M>T&&(v=t.vel.x+b/M*T,w=t.vel.z+_/M*T);let y=1-Math.exp(-(8+22*a)*e);if(n.vel.x+=(v-n.vel.x)*y,n.vel.z+=(w-n.vel.z)*y,n.sideSpin=0,r-(t.lastDribbleTouch||0)<.3)return;let E=n.pos.x-t.pos.x,C=n.pos.z-t.pos.z;if(Math.hypot(E,C)>1.1)return;let L=null;if(p>1.3){let R=Ir(p),D=Pr(R)+(1-Pr(R))*.55;for(let[N,F]of[["L",0],["R",.5]]){let X=((t.prevGait-F)%1+1)%1,Y=((t.gait-F)%1+1)%1;(X<D&&Y>=D||Y<X&&(X<D||Y>=D))&&(L=N)}if(!L||r-(t.lastDribbleTouch||0)<.42)return}else{if(Math.hypot(n.vel.x-t.vel.x,n.vel.z-t.vel.z)<.6||r-(t.lastDribbleTouch||0)<.45)return;L=E*Math.cos(t.yaw)-C*Math.sin(t.yaw)>0?"L":"R"}Yu(s,t,L,"dribble",Math.hypot(n.vel.x,n.vel.z))}function Yu(s,t,e,i,n){let r=s.ball;t.touch={foot:e,time:s.time,x:r.pos.x,y:r.pos.y,z:r.pos.z,kind:i},t.lastDribbleTouch=s.time,r.lastTouch=t,r.lastTouchTime=s.time,s.events.emit("touch",{player:t,kind:i,strength:n,t:s.time})}function bm(s,t,e){let i=s.time;for(let n of s.players){if(n===t.owner||t.lastTouch===n&&i-n.lastKickAt<Me.KICK_RELEASE_LOCK)continue;if(n.isGK&&s.keeperHandles(n,t)){if(s.keeperContact(n,t))return;continue}if(t.pos.y>1.9+me||n.action&&n.action.type==="slide"&&n.action.sliding&&t.pos.y>.55)continue;let a=t.pos.x-n.pos.x,o=t.pos.z-n.pos.z,l=(t.pos.y<.95?.24:.2)+me,c=a*a+o*o;if(c>=l*l||c<1e-8)continue;let h=Math.sqrt(c),u=a/h,d=o/h;t.pos.x=n.pos.x+u*l,t.pos.z=n.pos.z+d*l;let p=t.vel.x-n.vel.x,g=t.vel.z-n.vel.z,x=p*u+g*d;if(x<0){t.vel.x-=u*x*1.3,t.vel.z-=d*x*1.3,t.vel.y*=.7,t.version++;let f=t.owner&&t.owner.isHuman?2.5+3*s.assist.stick:2.5;t.owner&&t.owner.team!==n.team&&-x>f&&s.loseControl("blocked"),-x>.8&&(t.lastTouch=n,t.lastTouchTime=i,s.events.emit("deflect",{player:n,speed:-x,t:i}))}}}var Oa={"2-3-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.6,v:.36},{role:"DEF",u:-.6,v:-.36},{role:"W",u:.04,v:.68},{role:"CM",u:-.22,v:0},{role:"W",u:.04,v:-.68},{role:"ST",u:.36,v:0}],"2-2-1-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.6,v:.38},{role:"DEF",u:-.6,v:-.38},{role:"CM",u:-.24,v:.34},{role:"CM",u:-.24,v:-.34},{role:"AM",u:.1,v:0},{role:"ST",u:.4,v:0}],"3-2-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.58,v:.5},{role:"DEF",u:-.66,v:0},{role:"DEF",u:-.58,v:-.5},{role:"CM",u:-.14,v:.33},{role:"CM",u:-.14,v:-.33},{role:"ST",u:.38,v:0}],"2-1-2-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.6,v:.36},{role:"DEF",u:-.6,v:-.36},{role:"CM",u:-.3,v:0},{role:"AM",u:.08,v:.42},{role:"AM",u:.08,v:-.42},{role:"ST",u:.4,v:0}]},Ur={possession:{formation:"2-2-1-1",passShort:.25,cross:.05,press:0,line:0,width:1,dribble:0,tempo:.9,label:"Patient possession"},direct:{formation:"3-2-1",passShort:-.2,cross:.1,press:-.05,line:-.04,width:.95,dribble:.05,tempo:1.1,label:"Direct football"},wing:{formation:"2-3-1",passShort:0,cross:.3,press:0,line:0,width:1.15,dribble:.12,tempo:1,label:"Wing play"},pressing:{formation:"2-3-1",passShort:.1,cross:.05,press:.25,line:.08,width:1,dribble:.05,tempo:1.15,label:"High pressing"},counter:{formation:"3-2-1",passShort:-.1,cross:.05,press:-.15,line:-.1,width:.9,dribble:.15,tempo:1.05,label:"Counter attack"}};function Lc(s,t){let e=(Ur[s]||Ur.wing).formation;return!t||Oa[e].some(i=>i.role===t)?e:t==="AM"?"2-2-1-1":"2-3-1"}var _m={GK:[-1,-.7],DEF:[-.9,.3],CM:[-.75,.6],AM:[-.5,.82],W:[-.6,.86],ST:[-.3,.9]};var Ht=new at,Ku=new at,Zu=new at;function Ju(s,t){let e=s.teams[t],i=ht((e.tier||1)-1,0,4),n=s.human&&s.human.team===t,r=s.human&&!n,a=s.assist,o=e.style||{press:0};return{reaction:[.4,.34,.29,.25,.21][i]*(r?a.oppReact:1),think:[.3,.26,.22,.19,.16][i],noise:Math.max(.02,[.2,.15,.11,.08,.06][i]+(r?a.oppNoise:0)),aggro:[.34,.4,.48,.56,.64][i]*(r?a.oppAggro:1),pressRange:[11,12.5,14,16,18][i]*(1+(o.press||0))*(r?.5+.5*a.oppAggro:1),tackleBonus:[-.06,-.03,0,.02,.04][i],humanBonus:n?[.42,.36,.3,.24,.2][i]:0,holdMin:[.55,.45,.38,.3,.26][i],gkReaction:[.34,.3,.27,.24,.21][i]*(r?1+(a.oppReact-1)*.5:1),gkHold:[1.9,1.7,1.5,1.35,1.2][i],slideChance:[.04,.05,.05,.06,.06][i]*(r?a.oppAggro:1),shootBias:[0,.02,.04,.05,.06][i],passErr:r?1+(a.oppPassError-1)*(1-.1*i):1,shotErr:r?1+(a.oppShotError-1)*(1-.1*i):1,touch:r?1+(a.oppTouch-1)*(1-.1*i):1,mistake:r?a.oppMistake*(1-.1*i):0}}var kc=class{constructor(){this.phase="loose",this.winner=null,this.chaser=null,this.chaseT=99,this.chasePoint=new at,this.presser=null,this.cover=null,this.supporters=[],this.runner=null,this.marks=new Map,this.lastDefU=.5,this.deepestOppU=-.5}},Nc=class{constructor(t){this.m=t,this.ts=[new kc,new kc],this.nextTeamThink=0,this.intercepts=new Map}params(t){return this.m.aiParams[t]}update(t){let e=this.m;e.time>=this.nextTeamThink&&(this.nextTeamThink=e.time+.1,e.phase==="playing"&&(this.computeIntercepts(),this.teamThink(0),this.teamThink(1)));for(let i of e.players)if(!(i.isHuman||i.scripted)){if(i.sprint=!1,i.isGK){e.phase==="playing"||e.ball.state==="held"&&e.ball.owner===i?lm(e,i,t,this.params(i.team)):this.nonPlayingMove(i);continue}e.phase==="playing"?this.playing(i,t):this.nonPlayingMove(i)}}computeIntercepts(){let t=this.m,e=t.ball,i=t.traj;if(this.intercepts.clear(),e.owner||e.state==="held"||e.state==="dead")return;let n=t.time-i.t0;for(let r of t.players){r.isGK||r.isHuman;let a=null,o=r.isHuman?.1:this.params(r.team).reaction*.5,l=r.action&&(r.action.type==="slide"||r.action.type==="dive")||t.time<r.downUntil?.6:0;for(let c=0;c<=3.2;c+=.08){if(i.at(c+n,Ht),Ht.y>1.6)continue;if(Math.max(0,Math.hypot(Ht.x-r.pos.x,Ht.z-r.pos.z)-.7)/r.sprintSpeed()+o+l<=c){a={t:c,x:Ht.x,z:Ht.z};break}}a||(i.at(3.2+n,Ht),a={t:3.2+Math.hypot(Ht.x-r.pos.x,Ht.z-r.pos.z)/r.sprintSpeed(),x:Ht.x,z:Ht.z}),this.intercepts.set(r,a)}}teamThink(t){let e=this.m,i=e.ball,n=this.ts[t],r=e.teams[t].players,a=e.teams[1-t].players,o=i.owner;if(!r.length)return;o&&i.state!=="held"||i.state==="held"&&o?n.phase=o.team===t?"attack":"defend":n.phase="loose";let l=-1,c=1;for(let h of a){if(h.isGK)continue;let u=e.uOf(t,h.pos.x);u>l&&(l=u),u<c&&(c=u)}if(n.lastDefU=l,n.deepestOppU=c,n.chaser=null,n.chaseT=99,n.phase==="loose"&&this.intercepts.size){let h=null,u=99,d=99,p=99;for(let x of e.players){let f=this.intercepts.get(x);if(!f)continue;if(x.team!==t){!x.isGK&&f.t<p&&(p=f.t);continue}if(x.isHuman){d=f.t;continue}if(x.isGK)continue;let m=f.t;e.passIntent&&e.passIntent.target===x&&(m-=.6),m<u&&(u=m,h=x)}if(h&&!(d<u-.45)){n.chaser=h,n.chaseT=u;let x=this.intercepts.get(h);n.chasePoint.set(x.x,0,x.z)}let g=Math.min(u,d);n.winner=g<p-.15?t:p<g-.15?1-t:null}if(n.presser=null,n.cover=null,n.phase==="defend"&&o){let h=this.params(t),u=e.ownGoalX(t),d=null,p=1e9,g=null,x=1e9;for(let m of r){if(m.isGK||m.isHuman)continue;let v=m.pos.distXZ(o.pos);e.toWorld(t,m.home.u,m.home.v,Ht);let w=Ht.distXZ(o.pos),b=(m.pos.x-o.pos.x)*Math.sign(u-o.pos.x)>-1?0:3,_=v+Math.max(0,w-h.pressRange)*.9+b;_<p?(g=d,x=p,d=m,p=_):_<x&&(g=m,x=_)}let f=e.human;f&&f.team===t&&f.pos.distXZ(o.pos)<3&&d?n.cover=d:(n.presser=d,n.cover=g)}if(n.supporters=[],n.phase==="attack"&&o&&o.team===t&&!o.isGK){let h=r.filter(g=>g!==o&&!g.isGK&&!g.isHuman).sort((g,x)=>g.pos.distXZ(o.pos)-x.pos.distXZ(o.pos)),u=[];for(let g of h.slice(0,2)){let x=this.supportSpot(g,o,u);x&&(u.push(x),n.supporters.push(g),g.ai.support=x)}let d=e.time;n.runner&&n.runner.ai.run&&n.runner.ai.run.until<d&&(n.runner=null);let p=e.uOf(t,o.pos.x);if(!n.runner&&p>-.45&&d>(n.nextRun||0)){let g=null,x=-2;for(let f of r){if(f===o||f.isHuman||f.isGK||!["ST","W","AM"].includes(f.role)||n.supporters.includes(f))continue;let m=e.uOf(t,f.pos.x);m>x&&(x=m,g=f)}if(g){let f=Math.min(.88,Math.max(l+.1,e.uOf(t,g.pos.x)+.2)),m=e.vOf(t,g.pos.z)*.6;e.toWorld(t,f,m,Ku);let v=99;for(let w of a)v=Math.min(v,w.pos.distXZ(Ku));v>3.5&&(g.ai.run={until:d+2.8,target:Ku.clone()},n.runner=g,n.nextRun=d+4.5)}}}else n.runner=null;if(n.marks.clear(),n.phase==="defend"||n.phase==="loose"&&n.winner===1-t){let h=a.filter(g=>!g.isGK&&g!==o).sort((g,x)=>e.uOf(t,g.pos.x)-e.uOf(t,x.pos.x)),u=r.filter(g=>!g.isGK&&!g.isHuman&&g!==n.presser&&g!==n.cover&&g!==n.chaser),d=["DEF","CM","AM","W","ST"];u.sort((g,x)=>d.indexOf(g.role)-d.indexOf(x.role));let p=new Set;for(let g of u){this.shapeTarget(g,Ht);let x=null,f=13;for(let m of h){if(p.has(m)||e.uOf(t,m.pos.x)>.35&&g.role==="DEF")continue;let v=m.pos.distXZ(Ht);v<f&&(f=v,x=m)}x&&(p.add(x),n.marks.set(g,x))}}}supportSpot(t,e,i){let n=this.m,r=t.team,a=n.attackDir(r),o=null,l=-1e9;this.shapeTarget(t,Zu);let c=t.role==="ST"||t.role==="W"||t.role==="AM";for(let h of[-140,-100,-65,-35,0,35,65,100,140]){let u=h*Math.PI/180;for(let d of[8,12,16]){let p=e.pos.x+Math.cos(u)*d*a,g=e.pos.z+Math.sin(u)*d;if(Math.abs(p)>Z.HL-2||Math.abs(g)>Z.HW-1.5)continue;let x=bn(n,e.pos.x,e.pos.z,p,g,r,12),f=99;for(let _ of n.players)_.team!==r&&(f=Math.min(f,Math.hypot(_.pos.x-p,_.pos.z-g)));let m=0;for(let _ of n.teams[r].players){if(_===t||_===e)continue;let M=Math.hypot(_.pos.x-p,_.pos.z-g);M<6&&(m+=(6-M)/6)}for(let _ of i){let M=Math.hypot(_.x-p,_.z-g);M<7&&(m+=(7-M)/5)}let v=(p-e.pos.x)*a/d,w=Math.hypot(Zu.x-p,Zu.z-g),b=x*1+Math.min(f,8)/8*.8+v*(c?.45:.25)-w*.035-m*.6-t.pos.distXZ(Ht.set(p,0,g))*.015;b>l&&(l=b,o={x:p,z:g})}}return o?new at(o.x,0,o.z):null}shapeTarget(t,e){let i=this.m,n=i.teams[t.team],r=n.style,a=i.ball,o=this.ts[t.team],l=i.uOf(t.team,a.pos.x),c=i.vOf(t.team,a.pos.z),h=o.phase==="attack"||o.phase==="loose"&&o.winner===t.team,u=t.home.u+l*.42+(r.line||0),d=t.home.v;h?u+=t.role==="DEF"?.12:.2:u-=.06,d=d*(h?1.12*(r.width||1):.8)+c*(h?.2:.35);let p=_m[t.role]||[-.9,.9];return u=ht(u,p[0],p[1]),!h&&(t.role==="DEF"||t.role==="CM")&&(u=Math.min(u,l-(t.role==="DEF"?.1:.02))),t.role==="DEF"&&(u=Math.min(u,o.deepestOppU-.03,h?.3:.1)),u=ht(u,-.92,.92),d=ht(d,-.92,.92),i.toWorld(t.team,u,d,e)}playing(t,e){let i=this.m,n=i.ball,r=i.time,a=this.ts[t.team],o=this.params(t.team),l=t.ai;if(t.faceYaw=null,r<t.downUntil){t.desired.set(0,0,0);return}if(t.action&&(t.action.type==="slide"||t.action.type==="dive"))return;if(n.owner===t){this.carrier(t,e);return}let c=i.passIntent;if(c&&c.target===t&&!n.owner&&r-c.t<4){let d=this.intercepts.get(t),p=d&&d.t<3?Ht.set(d.x,0,d.z):Ht.set(c.point?c.point.x:n.pos.x,0,c.point?c.point.z:n.pos.z);this.moveTo(t,p,!0,.2),t.pos.distXZ(p)<1.2&&(t.faceYaw=Bt(n.pos.x-t.pos.x,n.pos.z-t.pos.z)),l.state="receive";return}if(a.phase==="loose"){if(a.chaser===t){l.state="chase",this.moveTo(t,a.chasePoint,!0,.05),t.faceYaw=t.pos.distXZ(a.chasePoint)<1.5?Bt(n.pos.x-t.pos.x,n.pos.z-t.pos.z):null;return}l.state="shape",this.shapeTarget(t,Ht),this.moveTo(t,Ht,!1,.6),this.faceBallIfClose(t,Ht);return}if(a.phase==="attack"){if(l.run&&l.run.until>r&&a.runner===t){l.state="run",this.moveTo(t,l.run.target,!0,.3);return}if(a.supporters.includes(t)&&l.support){l.state="support",this.moveTo(t,l.support,l.support.distXZ(t.pos)>10,.6),this.faceBallIfClose(t,l.support);return}l.state="shape",this.shapeTarget(t,Ht),this.moveTo(t,Ht,t.pos.distXZ(Ht)>14,.8),this.faceBallIfClose(t,Ht);return}let h=n.owner;if(a.presser===t&&h){this.press(t,h,e,o);return}if(a.cover===t&&h){l.state="cover";let p=i.ownGoalX(t.team)-h.pos.x,g=-h.pos.z,x=Math.hypot(p,g)||1;Ht.set(h.pos.x+p/x*5,0,h.pos.z+g/x*5),this.moveTo(t,Ht,t.pos.distXZ(Ht)>6,.5),t.faceYaw=Bt(h.pos.x-t.pos.x,h.pos.z-t.pos.z);return}let u=a.marks.get(t);if(u){l.state="mark";let p=i.ownGoalX(t.team)-u.pos.x,g=-u.pos.z,x=Math.hypot(p,g)||1,f=n.pos.x-u.pos.x,m=n.pos.z-u.pos.z,v=Math.hypot(f,m)||1;Ht.set(u.pos.x+p/x*1.6+f/v*.9,0,u.pos.z+g/x*1.6+m/v*.9),this.moveTo(t,Ht,t.pos.distXZ(Ht)>5,.35),t.faceYaw=Bt(n.pos.x-t.pos.x,n.pos.z-t.pos.z);return}l.state="shape",this.shapeTarget(t,Ht),this.moveTo(t,Ht,t.pos.distXZ(Ht)>10,.7),this.faceBallIfClose(t,Ht)}press(t,e,i,n){let r=this.m,a=r.ball,o=r.time,l=t.ai;l.state="press";let c=r.ownGoalX(t.team),h=c-e.pos.x,u=-e.pos.z,d=Math.hypot(h,u)||1,p=t.pos.distXZ(e.pos),g=1.3,x=a.pos.x+a.vel.x*.2,f=a.pos.z+a.vel.z*.2,m=c-x,v=-f,w=Math.hypot(m,v)||1;if(Ht.set(x+m/w*g,0,f+v/w*g),this.moveTo(t,Ht,p>5,0,!0),t.faceYaw=Bt(a.pos.x-t.pos.x,a.pos.z-t.pos.z),o<(l.nextChallenge||0)||!fs(r,t)||(l.nextChallenge=o+n.think*(.8+r.rng.next()*.5),r.phase!=="playing"||o-(r.lastRestartAt||-10)<.8))return;let b=a.pos.distXZ(t.pos);if(b<1.45&&a.pos.y<.5){let _=a.pos.x-e.pos.x,M=a.pos.z-e.pos.z,T=t.pos.x-a.pos.x,y=t.pos.z-a.pos.z,E=(_*T+M*y)/((Math.hypot(_,M)||1)*(Math.hypot(T,y)||1));E>-.2&&r.rng.next()<n.aggro*(.7+E*.4)&&oc(r,t)}else if(b>1.7&&b<3&&e.speed>3.5&&r.rng.next()<n.slideChance){let _=e.vel.x/e.speed,M=e.vel.z/e.speed,T=(t.pos.x-e.pos.x)/p,y=(t.pos.z-e.pos.z)/p;_*T+M*y>-.1&&(t.yaw=Bt(a.pos.x+a.vel.x*.25-t.pos.x,a.pos.z+a.vel.z*.25-t.pos.z),t.vel.set(Math.sin(t.yaw)*t.speed,0,Math.cos(t.yaw)*t.speed),lc(r,t))}}carrier(t,e){let i=this.m,n=i.ball,r=i.time,a=t.ai,o=this.params(t.team),l=i.teams[t.team];if(t.action&&t.action.type==="kick")return;(a.ownedSince==null||a.ownerEpoch!==i.possEpoch)&&(a.ownerEpoch=i.possEpoch,a.ownedSince=r,a.nextDecision=r+o.reaction*(.8+i.rng.next()*.4),a.dribbleTarget=null,this.pickDribble(t,0));let c=i.attackDir(t.team),h=99,u=null;for(let E of i.opponents(t.team)){let C=E.pos.distXZ(t.pos);C<h&&(h=C,u=E)}let d=i.human;d&&d.team===t.team&&d.requestUntil>r&&d.ackedReq!==d.requestUntil&&(t.ackUntil=r+1.2,d.ackedReq=d.requestUntil,i.events.emit("ack",{player:t,to:d,t:r}));let p=h<1.6&&r-a.ownedSince>.2;if(n.pos.distXZ(t.pos)<1.3&&(r>=a.nextDecision||p&&r>=(a.urgentAt||0))&&(a.nextDecision=r+o.think*(.8+i.rng.next()*.45)*(2-(l.style.tempo||1)),p&&(a.urgentAt=r+.25),(r-a.ownedSince>=o.holdMin||p)&&this.decide(t,h,u)))return;(!a.dribbleTarget||r>a.dribbleUntil)&&this.pickDribble(t,h);let x=a.dribbleTarget,f=x.x-t.pos.x,m=x.z-t.pos.z,v=Math.hypot(f,m)||1,w=n.pos.x+n.vel.x*.25-t.pos.x,b=n.pos.z+n.vel.z*.25-t.pos.z,_=Math.hypot(w,b),M=(w*f+b*m)/v,T=a.dribbleSprint&&t.stamina>.25;(_>1.25||M<-.1)&&(f=w,m=b,v=_||1,T=_>2.2&&t.stamina>.15);let y=t.maxSpeed(T,!0)*(v<1?.6:1);t.desired.set(f/v*y,0,m/v*y),t.sprint=T,this.addSeparation(t,.4)}pickDribble(t,e){let i=this.m,n=t.ai,r=i.time,a=i.attackDir(t.team),o=a*Z.HL,l=null,c=-1e9,h=0;for(let u of[-75,-45,-20,0,20,45,75,130,-130]){let d=u*Math.PI/180,p=Math.cos(d)*a,g=Math.sin(d),x=t.pos.x+p*6,f=t.pos.z+g*6;if(Math.abs(x)>Z.HL-1.5||Math.abs(f)>Z.HW-1.2)continue;let m=12;for(let w of i.opponents(t.team)){let b=w.pos.x-t.pos.x,_=w.pos.z-t.pos.z,M=b*p+_*g,T=Math.abs(b*g-_*p);M>-.5&&T<2.5+M*.3&&(m=Math.min(m,Math.max(0,M)))}let v=m*.1+Math.cos(d)*.5;t.role==="W"&&Math.abs(t.pos.z)>10?v+=Math.abs(u)<25?.2:0:v+=-Math.abs(f)*.01+(Math.abs(x-o)<16?-Math.abs(f)*.03:0),v>c&&(c=v,l={x,z:f},h=m)}l||(l={x:t.pos.x-a*3,z:t.pos.z*.8}),n.dribbleTarget=new at(l.x,0,l.z),n.dribbleUntil=r+.45,n.dribbleSprint=h>7&&i.uOf(t.team,t.pos.x)>-.3}decide(t,e,i){let n=this.m,r=n.ball,a=n.time,o=this.params(t.team),l=t.ai,c=n.teams[t.team],h=c.style,u=n.attackDir(t.team),d=u*Z.HL,p=n.uOf(t.team,t.pos.x),g=Math.abs(n.vOf(t.team,t.pos.z)),x=ht((3-e)/3,0,1),f=n.rng,m={kind:"dribble",s:.2+(h.dribble||0)+(t.role==="W"?.08:0)-x*.35},v=12;for(let _ of n.opponents(t.team)){let M=(_.pos.x-t.pos.x)*u,T=_.pos.z-t.pos.z;M>0&&Math.abs(T)<M*.9+1.5&&(v=Math.min(v,Math.hypot(M,T)))}m.s+=Math.min(v,12)*.035,m.s+=f.gauss()*o.noise;let w=Math.hypot(d-t.pos.x,t.pos.z);if(w<27){let _=Hu(t.pos.x,t.pos.z,u),M=0;for(let E of n.opponents(t.team)){if(E.isGK)continue;let C=nn(E.pos.x,E.pos.z,t.pos.x,t.pos.z,d,ht(t.pos.z*.2,-2,2));C.t>.05&&C.t<.95&&C.d<1+C.t*1.5&&M++}let y=ht(_/.5,0,1)*ht((28-w)/19,0,1)*Math.max(0,1-.32*M)*1.55+(w<12?.25:0)-.12+o.shootBias+f.gauss()*o.noise;y>m.s&&(m={kind:"shot",s:y})}let b=n.human;for(let _ of n.teams[t.team].players){if(_===t||a<_.downUntil||_.isGK&&!(p<-.4&&x>.5))continue;kr(t.pos,_,Ht,.75);let M=t.pos.distXZ(Ht);if(M<4||M>38)continue;let T=n.ownGoalX(t.team);if(!_.isGK&&Math.abs(Ht.x-T)<7&&Math.abs(Ht.z)<9||_.isGK&&Math.abs(t.pos.z)<6&&Math.abs(t.pos.x-T)<14)continue;let y=bn(n,t.pos.x,t.pos.z,Ht.x,Ht.z,t.team,12),E=10;for(let R of n.opponents(t.team))E=Math.min(E,R.pos.distXZ(Ht));let C=(Ht.x-t.pos.x)*u,L=.2+y*.55+E*.045+C*.028*(1-(h.passShort||0)*.6)-Math.abs(M-14)*.008*(1+(h.passShort||0));if(_.isHuman&&(L+=o.humanBonus,_.requestUntil>a&&(L+=y>.55?.7:-.2)),_===l.receivedFrom&&a-l.ownedSince<2.5&&x<.4&&(L-=.3),C<-4&&x<.3&&(L-=.12),!(y<.35)&&(L+=f.gauss()*o.noise,L>m.s&&(m={kind:"pass",s:L,target:_}),_.ai.run&&_.ai.run.until>a||_.isHuman&&_.speed>4&&_.vel.x*u>2)){let R=.45+y*.3+Math.max(0,C)*.02+(_.isHuman?o.humanBonus*.7:0)+f.gauss()*o.noise;R>m.s&&n.uOf(t.team,_.pos.x)>.1&&(m={kind:"through",s:R,target:_})}}if(p>.5&&g>.35){let _=null,M=-1;for(let T of n.teams[t.team].players){if(T===t||T.isGK||!Mm(n,t.team,T.pos.x,T.pos.z))continue;let y=10;for(let E of n.opponents(t.team))y=Math.min(y,E.pos.distXZ(T.pos));y>M&&(M=y,_=T)}if(_){let T=.35+(h.cross||0)+M*.05+(p>.75?.15:0)+f.gauss()*o.noise;T>m.s&&(m={kind:"cross",s:T,target:_})}}switch(p<-.55&&x>.45&&m.s<.55&&(m={kind:"clear",s:.6}),m.kind){case"shot":{let _=n.keeper(1-t.team),M=Math.sign(t.pos.z)*-1||1;_&&(M=_.pos.z>0?-1:1),f.next()<.25&&(M=-M);let T=M*(ft.HW-.45-f.next()*.55),y=.25+f.next()*1.2;return ce(n,t,"shot",{point:new at(d,y,T),power:.72+f.next()*.28,ai:!0}),!0}case"pass":return ce(n,t,"pass",{target:m.target,ai:!0}),m.target.ai.receivedFrom=t,!0;case"through":return ce(n,t,"through",{target:m.target,ai:!0}),!0;case"cross":{let _=m.target,M=new at(_.pos.x+_.vel.x*.8,0,_.pos.z+_.vel.z*.8);return ce(n,t,"cross",{point:M,target:_,ai:!0}),!0}case"clear":{let _=new at(u*10+t.pos.x*.2,0,Math.sign(t.pos.z||1)*14);return ce(n,t,"clear",{point:_,ai:!0}),!0}default:return this.pickDribble(t,e),!1}}restartTarget(t,e,i=!1,n=new at){let r=this.m,a=t.team,o=r.attackDir(a),l=e.spot,c=e.team===a;if(t===e.taker)return n.copy(l).addScaled(new at(-o,0,0),.7);if(t.isGK){let d=r.ownGoalX(a);return e.type==="penalty"&&!c?n.set(d+o*.1,0,0):n.set(d+o*(e.type==="kickoff"?1.2:1.5),0,0)}let h=t.home.u,u=t.home.v;switch(e.type){case"kickoff":{h=Math.min(h*.85-.05,-.05),r.toWorld(a,h,u,n),c&&t.role===(e.taker&&e.taker.role==="ST"?"AM":"CM")&&n.set(-o*3.5,0,1.8);let d=Math.hypot(n.x,n.z);if(!c&&d<Kt.CIRCLE_R+.6){let p=(Kt.CIRCLE_R+.8)/(d||1);n.x*=p,n.z*=p,Math.abs(n.x)<.5&&(n.x=-o*(Kt.CIRCLE_R+.8))}return n}case"penalty":{let d=l.x>0?1:-1,p=d*(Z.HL-Kt.PEN_D-1.8),g=r.players.indexOf(t);return n.set(p-d*(g%2)*2.5,0,(g%7-3)*3.2)}case"corner":{let d=l.x>0?1:-1;if(c){let f={ST:[2,.8],AM:[5.5,-1.5],W:[4,3.5],CM:[11,0],DEF:[22,4]}[t.role]||[8,0],m=Math.sign(l.z);return n.set(d*(Z.HL-f[0]),0,f[1]*-m+(t.side||0)*1.5),t.role==="DEF"&&t.home.v<0&&(n.z=-n.z),Dn(n,1)}let g={DEF:[1.8,1.2],CM:[4.5,-1.2],AM:[9,2],W:[6,4],ST:[14,0]}[t.role]||[5,0];return n.set(d*(Z.HL-g[0]),0,g[1]*(t.home.v>=0?1:-1)),Dn(n,1)}case"goalkick":{if(c)r.toWorld(a,Math.min(h,-.2)+.05,u*1.1,n);else{r.toWorld(a,Math.max(h,-.1)+.2,u,n);let d=l.x>0?Z.HL:-Z.HL;Math.abs(n.x-d)<Kt.PEN_D+1&&Math.abs(n.z)<Kt.PEN_HW+1&&(n.x=d-Math.sign(d)*(Kt.PEN_D+1.5))}return n}default:{if(this.shapeTarget(t,n),c)n.distXZ(l)>18&&(t.role==="CM"||t.role==="W"||t.role==="AM")&&n.lerp(l,.35);else if(e.type==="freekick"){let d=r.ownGoalX(a);if(Math.hypot(l.x-d,l.z)<26&&(t.role==="DEF"||t.role==="CM")&&t.home.v!==void 0){let g=d-l.x,x=-l.z,f=Math.hypot(g,x)||1,m=t.home.v>=0?1:-1;n.set(l.x+g/f*(Me.RESTART_DIST+.3)-x/f*.38*m,0,l.z+x/f*(Me.RESTART_DIST+.3)+g/f*.38*m)}}if(!c){let d=e.type==="throwin"?Me.THROW_DIST:Me.RESTART_DIST;if(n.distXZ(l)<d+.4){let g=n.x-l.x,x=n.z-l.z,f=Math.hypot(g,x)||1;n.set(l.x+g/f*(d+.6),0,l.z+x/f*(d+.6))}}return Dn(n,.8)}}}enforceDistances(t){let e=this.m;for(let i of e.players){if(i.team===t.team||i.isHuman)continue;let n=t.type==="throwin"?Me.THROW_DIST:t.type==="kickoff"?Kt.CIRCLE_R:Me.RESTART_DIST;if(i.pos.distXZ(t.spot)<n){let a=this.restartTarget(i,t);i.pos.copy(a),i.prevPos.copy(a),i.vel.set(0,0,0)}}}nonPlayingMove(t){let e=this.m,i=e.time;if(t.faceYaw=null,e.phase==="restart"&&e.restart){let n=e.restart;if(t===n.taker&&n.placed){t.desired.set(0,0,0);return}let r=this.restartTarget(t,n,!1,Ht);this.moveTo(t,r,t.pos.distXZ(r)>8,.25),t.pos.distXZ(r)<1&&(t.faceYaw=Bt(e.ball.pos.x-t.pos.x,e.ball.pos.z-t.pos.z));return}if(e.phase==="goal"){if(t.celebrate>i){let n=e.lastGoalTeam,r=e.attackDir(n)*(Z.HL-4),a=Math.sign(e.ball.pos.z||1)*(Z.HW-3);Ht.set(r,0,a),this.moveTo(t,Ht,!0,1.5);return}this.shapeTarget(t,Ht),Ht.x*=.5,this.moveTo(t,Ht,!1,1,!1,2.2);return}if(e.phase==="halftime"||e.phase==="fulltime"){t.desired.set(0,0,0);return}this.shapeTarget(t,Ht),this.moveTo(t,Ht,!1,1,!1,3)}takeRestart(t,e){let i=this.m,n=i.rng,r=i.attackDir(t.team),a=r*Z.HL;i.lastRestartAt=i.time;let o=(c,h=.45)=>{let u=null,d=-1e9;for(let p of i.teams[t.team].players){if(p===t||p.isGK)continue;let g=p.pos.distXZ(e.spot);if(g>c||g<3)continue;let x=bn(i,e.spot.x,e.spot.z,p.pos.x,p.pos.z,t.team,11);if(x<h)continue;let f=x+(p.pos.x-e.spot.x)*r*.02-g*.01+(p.isHuman?this.params(t.team).humanBonus+(p.requestUntil>i.time?.6:0):0)+n.next()*.2;f>d&&(d=f,u=p)}return u},l=(c,h)=>{t.yaw=Bt(c-t.pos.x,h-t.pos.z)};switch(e.type){case"kickoff":{let c=o(20,.2)||i.teams[t.team].players.find(h=>h!==t&&!h.isGK);l(c.pos.x,c.pos.z),ce(i,t,"pass",{target:c,restart:e,ai:!0});break}case"throwin":{let c=o(18,.35);if(c)l(c.pos.x,c.pos.z),ce(i,t,"throw",{target:c,restart:e,ai:!0});else{let h=new at(e.spot.x+r*10,0,e.spot.z*.5);l(h.x,h.z),ce(i,t,"throw",{point:h,restart:e,ai:!0})}break}case"corner":{let c=[];for(let h of i.teams[t.team].players)h!==t&&!h.isGK&&Mm(i,t.team,h.pos.x,h.pos.z)&&c.push(h);if(c.length&&n.next()<.75){let h=c[Math.floor(n.next()*c.length)],u=new at(h.pos.x,0,h.pos.z);l(u.x,u.z),ce(i,t,"cross",{point:u,target:h,restart:e,ai:!0,elev:.45})}else{let h=o(14,.3)||c[0];if(h)l(h.pos.x,h.pos.z),ce(i,t,"pass",{target:h,restart:e,ai:!0});else{let u=new at(a-r*7,0,0);l(u.x,u.z),ce(i,t,"cross",{point:u,restart:e,ai:!0})}}break}case"goalkick":{let c=o(22,.7);if(c&&n.next()<.6)l(c.pos.x,c.pos.z),ce(i,t,"pass",{target:c,restart:e,ai:!0});else{let h=null,u=-1;for(let p of i.teams[t.team].players){if(p===t||p.isGK)continue;let g=10;for(let f of i.opponents(t.team))g=Math.min(g,f.pos.distXZ(p.pos));let x=g+i.uOf(t.team,p.pos.x)*4+n.next();x>u&&(u=x,h=p)}let d=h?new at(h.pos.x,0,h.pos.z):new at(0,0,0);l(d.x,d.z),ce(i,t,"lob",{point:d,target:h,restart:e,ai:!0,elev:.5})}break}case"penalty":{let c=n.next()<.5?-1:1,h=new at(a,.3+n.next()*.9,c*(1.2+n.next()*.9));l(h.x,h.z),ce(i,t,"shot",{point:h,power:.8+n.next()*.15,restart:e,ai:!0});break}default:{let c=Math.hypot(a-e.spot.x,e.spot.z);if(e.type==="freekick"&&c<24&&Hu(e.spot.x,e.spot.z,r)>.22&&n.next()<.45){let h=n.next()<.5?-1:1,u=new at(a,1.2+n.next()*.6,h*(1.4+n.next()*.9));l(u.x,u.z),ce(i,t,"shot",{point:u,power:.8+n.next()*.2,restart:e,ai:!0})}else{let h=o(26,.4)||o(35,.1);if(h)l(h.pos.x,h.pos.z),ce(i,t,"pass",{target:h,restart:e,ai:!0});else{let u=new at(e.spot.x+r*20,0,e.spot.z*.5);l(u.x,u.z),ce(i,t,"lob",{point:u,restart:e,ai:!0})}}}}}moveTo(t,e,i,n=.5,r=!1,a=1/0){let o=e.x-t.pos.x,l=e.z-t.pos.z,c=Math.hypot(o,l),h=t.ai,u=this.m.time;if(u>(h.progressCheck||0)&&(c>2.5&&h.lastDist-c<.4&&t.speed<1&&(h.sidestepUntil=u+.7),h.lastDist=c,h.progressCheck=u+1.2),c<n){t.desired.set(0,0,0),r||this.addSeparation(t,1);return}let d=i&&(t.stamina>.2||this.ts[t.team].chaser===t),p=Math.min(t.maxSpeed(d,!1),a);c<3&&(p*=Math.max(.25,c/3));let g=o/c,x=l/c;if(h.sidestepUntil>u){let f=g;g=g*.5-x*.85,x=x*.5+f*.85}t.desired.set(g*p,0,x*p),t.sprint=d&&c>3,r||this.addSeparation(t,1)}addSeparation(t,e){let i=0,n=0,r=this.m.ball,a=t.pos.distXZ(r.pos)<2.5;for(let o of this.m.players){if(o===t)continue;let l=t.pos.x-o.pos.x,c=t.pos.z-o.pos.z,h=l*l+c*c;if(h>16||h<1e-6)continue;let u=Math.sqrt(h);if(u<1.4&&!a){let d=(1.4-u)/1.4*2.6;i+=l/u*d,n+=c/u*d}else if(o.team===t.team&&!a){let d=(4-u)/4*.9;i+=l/u*d,n+=c/u*d}}t.desired.x+=i*e,t.desired.z+=n*e}faceBallIfClose(t,e){if(t.pos.distXZ(e)<1.5){let i=this.m.ball.pos;t.faceYaw=Bt(i.x-t.pos.x,i.z-t.pos.z)}}};function Mm(s,t,e,i){let n=s.attackDir(t)*Z.HL;return Math.sign(e)===Math.sign(n)&&Math.abs(e-n)<Kt.PEN_D&&Math.abs(i)<Kt.PEN_HW}var N_=new Set(["pass","through","cross","lob","gkthrow","gkkick"]);function Sm(){return{touches:0,goals:0,ownGoals:0,assists:0,passAtt:0,passCmp:0,shots:0,shotsOn:0,tacklesWon:0,tackleAtt:0,interceptions:0,possLost:0,fouls:0,saves:0,keyPasses:0}}var ju={ST:{goal:1.05,assist:.7,tackle:.22,intercept:.16,pass:.035,prog:.03,key:.2,shotOn:.1,shotOff:-.02,lost:-.07,foul:-.2,conceded:-.03,clean:.05},W:{goal:1,assist:.75,tackle:.24,intercept:.17,pass:.04,prog:.03,key:.22,shotOn:.09,shotOff:-.02,lost:-.08,foul:-.2,conceded:-.03,clean:.05},AM:{goal:1,assist:.8,tackle:.26,intercept:.18,pass:.045,prog:.035,key:.25,shotOn:.09,shotOff:-.02,lost:-.09,foul:-.2,conceded:-.04,clean:.08},CM:{goal:1,assist:.8,tackle:.33,intercept:.25,pass:.055,prog:.035,key:.22,shotOn:.08,shotOff:-.02,lost:-.1,foul:-.2,conceded:-.07,clean:.2},DEF:{goal:1.1,assist:.8,tackle:.4,intercept:.3,pass:.05,prog:.03,key:.2,shotOn:.08,shotOff:-.02,lost:-.14,foul:-.22,conceded:-.15,clean:.45},GK:{goal:1,assist:.6,tackle:.2,intercept:.15,pass:.02,prog:.01,key:.1,shotOn:.05,shotOff:0,lost:-.1,foul:-.3,conceded:-.3,clean:.6,save:.3}},D_={goals:"Goals",assists:"Assists",tackles:"Tackles won",interceptions:"Interceptions",passing:"Passing",keyPasses:"Chances created",shooting:"Shooting",lost:"Possession lost",fouls:"Fouls",defending:"Defending (goals conceded / clean sheet)",result:"Match result",involvement:"Involvement",positioning:"Positioning",decisions:"Poor decisions",saves:"Saves"},Dc=class{constructor(t){this.m=t,this.by=new Map,this.contrib=new Map;for(let i of t.players)this.by.set(i,Sm()),this.contrib.set(i,[]);this.pendingPass=null,this.pendingTackle=null,this.pendingShot=null,this.lastCompleted=null,this.controller=null,this.looseFrom=null,this.pairCount=new Map,this.teamPossTime=[0,0],this.teamShots=[0,0],this.teamShotsOn=[0,0],this.posSamples=new Map,this.sampleT=0,this.longShots=new Map,this.finalised=!1,this.goalLog=[];let e=t.events;e.on("kick",i=>this.onKick(i)),e.on("possession",i=>this.onPossession(i)),e.on("release",i=>{(i.reason==="loose"||i.reason==="blocked")&&(this.looseFrom=i.player),this.controller=null}),e.on("tackle",i=>this.onTackle(i)),e.on("save",i=>this.onSave(i)),e.on("deflect",i=>this.onDeflect(i)),e.on("goal",i=>this.onGoal(i)),e.on("foul",i=>{this.s(i.player).fouls++,this.add(i.player,"fouls",this.w(i.player).foul),this.resolveAll("foul")}),e.on("out",i=>this.onOut(i)),e.on("restartSetup",()=>this.resolveAll("restart")),e.on("halftime",()=>this.resolveAll("half")),e.on("fulltime",()=>{this.resolveAll("full"),this.finalise()}),e.on("touch",i=>{i.kind})}s(t){let e=this.by.get(t);return e||(e=Sm(),this.by.set(t,e),this.contrib.set(t,[])),e}w(t){return ju[t.role]||ju.CM}add(t,e,i){!t||!i||this.contrib.get(t)?.push({cat:e,v:i,t:this.m.time})}credit(t,e){t&&this.m.events.emit("credit",{player:t,kind:e,t:this.m.time})}update(t){let e=this.m;if(e.phase==="playing"&&(e.possTeam!=null&&(e.ball.owner||e.ball.state==="held")&&(this.teamPossTime[e.possTeam]+=t),this.pendingTackle&&e.time-this.pendingTackle.t>Me.TACKLE_WINDOW&&(this.pendingTackle=null),this.sampleT+=t,this.sampleT>=1)){this.sampleT=0;for(let i of e.players){if(i.isGK)continue;let n=this.goodPosition(i),r=this.posSamples.get(i)||{good:0,n:0};r.n++,n&&r.good++,this.posSamples.set(i,r)}}}goodPosition(t){let e=this.m,i=e.ball,n=e.ownGoalX(t.team),r=e.uOf(t.team,t.pos.x),a=t.pos.distXZ(i.pos),o=e.possTeam===t.team;switch(t.role){case"DEF":return o?r<.35||a<14:Math.abs(t.pos.x-n)<=Math.abs(i.pos.x-n)+1||a<6;case"CM":return a<22&&r<.7;case"AM":return o?r>-.1||a<14:a<22;case"W":return o?Math.abs(t.pos.z)>7||r>.35||a<12:r>-.5;case"ST":return o?r>.15||a<12:r>-.35;default:return!0}}onKick(t){let e=t.player,i=this.s(e);i.touches++;let n=this.pendingPass;if(n&&(n.passer===e?this.pendingPass=null:t.team===n.team?this.completePass(n,e):this.failPass(n,null,t.team)),this.controller=null,this.looseFrom=null,N_.has(t.kind)&&(i.passAtt++,this.pendingPass={passer:e,team:e.team,kind:t.kind,t:t.t,fromX:t.pos.x,target:t.target,id:t.id}),t.kind==="shot"){i.shots++,this.teamShots[e.team]++,this.pendingShot={shooter:e,onTarget:t.onTarget,t:t.t,resolved:!1};let r=this.lastCompleted;r&&r.receiver===e&&t.t-r.recvT<6&&!r.keyCounted&&(r.keyCounted=!0,this.s(r.passer).keyPasses++,this.add(r.passer,"keyPasses",this.w(r.passer).key));let a=this.m.attackDir(e.team)*Z.HL;if(Math.hypot(a-t.pos.x,t.pos.z)>28&&!t.restart){let l=(this.longShots.get(e)||0)+1;this.longShots.set(e,l),l>1&&this.add(e,"decisions",-.06)}}}completePass(t,e){this.pendingPass=null;let i=t.passer,n=this.s(i),r=this.w(i);n.passCmp++;let a=this.m.attackDir(i.team),l=(e.pos.x-t.fromX)*a>=8,c=i.id+":"+e.id,h=(this.pairCount.get(c)||0)+1;this.pairCount.set(c,h);let u=Math.pow(l?.85:.65,h-1);this.add(i,"passing",(r.pass+(l?r.prog:0))*u),this.credit(i,"passCompleted"),this.lastCompleted={passer:i,receiver:e,team:i.team,t:t.t,recvT:this.m.time,keyCounted:!1}}failPass(t,e,i){this.pendingPass=null;let n=t.passer;if(e){let r=++this.s(e).interceptions;this.add(e,"interceptions",this.w(e).intercept*(r<=3?1:Math.pow(.8,r-3))),this.credit(e,"interception")}i!=null&&i!==n.team&&(this.s(n).possLost++,this.add(n,"lost",this.w(n).lost),this.credit(n,"possessionLost"))}onPossession(t){let e=t.player,i=t.team,n=this.s(e);n.touches++;let r=this.pendingPass;r&&(r.passer===e?this.pendingPass=null:r.team===i?this.completePass(r,e):this.failPass(r,this.m.time-r.t<=3?e:null,i));let a=!1,o=this.pendingTackle;if(o){if(o.team===i&&this.m.time-o.t<=Me.TACKLE_WINDOW){let l=++this.s(o.tackler).tacklesWon;this.add(o.tackler,"tackles",this.w(o.tackler).tackle*(l<=4?1:Math.pow(.85,l-4))),this.credit(o.tackler,"tackleWon"),o.victim&&(this.s(o.victim).possLost++,this.add(o.victim,"lost",this.w(o.victim).lost),this.credit(o.victim,"possessionLost")),a=!0}this.pendingTackle=null}if(!a){let l=t.prev&&t.prev.team!==i?t.prev:this.looseFrom&&this.looseFrom.team!==i?this.looseFrom:null;l&&(this.s(l).possLost++,this.add(l,"lost",this.w(l).lost),this.credit(l,"possessionLost"))}this.looseFrom=null,this.lastCompleted&&this.lastCompleted.team!==i&&(this.lastCompleted=null),this.controller=e}onTackle(t){this.s(t.player).tackleAtt++,t.success&&(this.pendingTackle={tackler:t.player,victim:t.victim,team:t.player.team,t:t.t},this.looseFrom=null,this.controller=null)}onSave(t){let e=this.pendingShot;e&&!e.resolved&&(e.resolved=!0,e.onTarget?(this.s(e.shooter).shotsOn++,this.teamShotsOn[e.shooter.team]++,this.add(e.shooter,"shooting",this.w(e.shooter).shotOn),this.credit(e.shooter,"shotSaved"),this.s(t.player).saves++,this.add(t.player,"saves",ju.GK.save)):this.add(e.shooter,"shooting",this.w(e.shooter).shotOff))}onDeflect(t){let e=this.pendingShot;e&&!e.resolved&&t.player.team!==e.shooter.team&&!t.player.isGK&&this.m.time-e.t<3&&(e.resolved=!0,e.blocked=!0)}onGoal(t){let e=t.scorer,i=this.pendingShot;if(e){let n=this.s(e);n.goals++,i&&i.shooter===e&&(!i.resolved||i.blocked)?(n.shotsOn++,this.teamShotsOn[e.team]++,i.resolved=!0):(!i||i.shooter!==e)&&(n.shots++,n.shotsOn++,this.teamShots[e.team]++,this.teamShotsOn[e.team]++),this.add(e,"goals",this.w(e).goal);let r=this.lastCompleted;r&&r.receiver===e&&r.team===t.team&&r.passer!==e&&t.t-r.t<=Me.ASSIST_WINDOW&&(this.s(r.passer).assists++,this.add(r.passer,"assists",this.w(r.passer).assist),t.assist=r.passer,this.credit(r.passer,"assist"))}else t.ownGoal&&t.ownGoalBy&&(this.s(t.ownGoalBy).ownGoals++,this.add(t.ownGoalBy,"decisions",-.3));for(let n of this.m.teams[1-t.team].players)this.add(n,"defending",this.w(n).conceded);this.goalLog.push({team:t.team,scorer:e?e.name:null,scorerRef:e,assist:t.assist?t.assist.name:null,ownGoal:t.ownGoal,ownGoalBy:t.ownGoalBy?t.ownGoalBy.name:null,clock:this.m.displayClock,half:this.m.half}),this.resolveAll("goal")}onOut(t){let e=this.pendingPass;e?this.failPass(e,null,t.team):t.controller&&t.team!==t.controller.team&&(this.s(t.controller).possLost++,this.add(t.controller,"lost",this.w(t.controller).lost)),this.resolveAll("out")}resolveAll(t){this.pendingPass&&(this.pendingPass=null),this.pendingTackle=null;let e=this.pendingShot;e&&!e.resolved&&(e.resolved=!0,t!=="goal"&&this.add(e.shooter,"shooting",this.w(e.shooter).shotOff)),this.pendingShot=null,this.looseFrom=null,t!=="goal"&&(this.lastCompleted=null)}finalise(){if(this.finalised)return;this.finalised=!0;let t=this.m,[e,i]=t.scoreline;for(let n of t.players){let r=this.w(n),a=n.team===0?e:i,o=n.team===0?i:e;this.add(n,"result",a>o?.25:a<o?-.2:0),o===0&&this.add(n,"defending",r.clean);let l=this.s(n);if(!n.isGK){l.touches<4?this.add(n,"involvement",-.25):l.touches>25&&this.add(n,"involvement",.15);let c=this.posSamples.get(n);c&&c.n>20&&this.add(n,"positioning",(c.good/c.n-.55)*.5)}}}rating(t){let e=0;for(let i of this.contrib.get(t)||[])e+=i.v;return Math.round(ht(6+e,1,10)*10)/10}breakdown(t){let e={};for(let a of this.contrib.get(t)||[])e[a.cat]=(e[a.cat]||0)+a.v;let i=Object.entries(e).map(([a,o])=>({cat:a,label:D_[a]||a,v:o})),n=i.filter(a=>a.v>.005).sort((a,o)=>o.v-a.v),r=i.filter(a=>a.v<-.005).sort((a,o)=>a.v-o.v);return{pos:n,neg:r,all:i}}possessionPct(){let[t,e]=this.teamPossTime,i=t+e;return i>0?[Math.round(t/i*100),100-Math.round(t/i*100)]:[50,50]}report(t){let e=this.s(t),i=this.m,n=i.halfLength*2,r=Math.round(Math.min(1,i.clock/n)*90),a=null,o=-1;for(let l of i.players){let c=this.rating(l);c>o&&(o=c,a=l)}return{score:i.scoreline,minutes:r,rating:this.rating(t),stats:{...e,passAcc:e.passAtt?Math.round(e.passCmp/e.passAtt*100):0},breakdown:this.breakdown(t),possession:this.possessionPct(),teamShots:[...this.teamShots],teamShotsOn:[...this.teamShotsOn],motm:a?{name:a.name,team:a.team,rating:o,isHuman:a.isHuman}:null,goals:this.goalLog.map(l=>({...l,scorerRef:void 0}))}}};var Oc={assisted:{label:"Assisted",passError:.3,shotError:.65,shotAim:1,touch:.45,tackle:.24,stick:1,claim:1.25,passCone:1.1,autoLob:!0,oppReact:1.55,oppAggro:.5,oppNoise:.14,oppPassError:3,oppMistake:.16,oppTouch:2,oppShotError:1.7,oppProtect:.24,oppHumanPassReact:.34},standard:{label:"Standard",passError:.55,shotError:.85,shotAim:.7,touch:.65,tackle:.14,stick:.75,claim:1.12,passCone:.95,autoLob:!0,oppReact:1,oppAggro:1.1,oppNoise:.03,oppPassError:1.35,oppMistake:.04,oppTouch:1.15,oppShotError:1.05,oppProtect:0,oppHumanPassReact:.2},expert:{label:"Expert",passError:.85,shotError:1,shotAim:.35,touch:.9,tackle:.02,stick:.5,claim:1.05,passCone:.8,autoLob:!1,oppReact:.9,oppAggro:1.22,oppNoise:0,oppPassError:1,oppMistake:.01,oppTouch:1,oppShotError:.95,oppProtect:-.04,oppHumanPassReact:.16}},Uc=class{constructor(t){this.cfg=t,this.mode=t.mode||"match",this.events=new Pc,this.rng=new Sn(t.seed||12345),this.ball=new ds,this.traj=new Lr(200,1/60),this.trajVersion=-1,this.players=[],this.time=0,this.clock=0,this.half=1,this.halfLength=t.halfLength||180,this.phase="setup",this.phaseT=0,this.restart=null,this.pendingRestart=null,this.possTeam=null,this.skipRequested=!1,this.kickoffTeam=0,this.nextKickId=1,this.passIntent=null,this.lastProgress=0,this.snapCount=0,this.rules=t.rules!==!1,this.difficulty=t.difficulty||"assisted",this.assist=Oc[this.difficulty]||Oc.assisted,this.human=null,this.humanCtl=null,this.teams=[],this.ballHooks={onBounce:(e,i)=>this.events.emit("bounce",{speed:i,t:this.time}),onFrame:(e,i,n)=>this.events.emit("frame",{what:n,speed:i,t:this.time}),bodies:(e,i)=>bm(this,e,i)},this.buildTeams(t),this.aiParams=[Ju(this,0),Ju(this,1)],this.ai=new Nc(this),this.stats=new Dc(this)}buildTeams(t){for(let e=0;e<2;e++){let i=t.teams[e];if(!i){this.teams.push({index:e,attack:e===0?1:-1,score:0,players:[],name:"None",style:Ur.wing,empty:!0});continue}let n=i.players.find(c=>c.isHuman)?.role||null,r=i.formation||Lc(i.style,n),a={index:e,attack:e===0?1:-1,score:0,players:[],name:i.name,short:i.short||i.name.slice(0,3).toUpperCase(),kit:i.kit,styleName:i.style||"wing",style:Ur[i.style]||Ur.wing,tier:i.tier||1,formationName:r,formation:Oa[r],clubId:i.clubId};this.teams.push(a);let o=a.formation.map((c,h)=>({...c,i:h,used:!1})),l=[...i.players].sort((c,h)=>(h.isHuman?1:0)-(c.isHuman?1:0));for(let c of l){let h=o.find(d=>!d.used&&d.role===c.role);if(h||(h=o.find(d=>!d.used&&d.role!=="GK"&&c.role!=="GK")||o.find(d=>!d.used)),!h)continue;h.used=!0;let u=new Jl({team:e,slot:h.i,role:h.role,number:c.number,name:c.name,isHuman:c.isHuman,attrs:c.attrs,keeping:c.keeping,foot:c.foot,look:c.look});u.home={u:h.u,v:h.v},a.players.push(u),this.players.push(u),u.isHuman&&(this.human=u)}a.players.sort((c,h)=>c.slot-h.slot)}this.players.sort((e,i)=>e.id-i.id)}attackDir(t){return this.teams[t].attack}ownGoalX(t){return-this.teams[t].attack*Z.HL}teamOf(t){return this.teams[t.team]}opponents(t){return this.teams[1-t].players}isOpp(t){return!!this.human&&t.team!==this.human.team}keeper(t){return this.teams[t].players.find(e=>e.isGK)||null}get scoreline(){return[this.teams[0].score,this.teams[1].score]}toWorld(t,e,i,n){let r=this.teams[t].attack;return n.set(e*Z.HL*r,0,-i*Z.HW*r)}uOf(t,e){return e/Z.HL*this.teams[t].attack}vOf(t,e){return-e/Z.HW*this.teams[t].attack}keeperHandles(t,e){return rm(this,t,e)}keeperContact(t,e){return om(this,t,e)}start(t=null){this.kickoffTeam=t??(this.rng.next()<.5?0:1),this.events.emit("matchStart",{t:0}),this.setupRestart({type:"kickoff",team:this.kickoffTeam,spot:new at(0,0,0)})}step(t=ks){this.time+=t,this.phaseT+=t;let e=this.ball;this.humanCtl&&this.humanCtl.update(t),this.ai.update(t),this.preStep&&this.preStep(t);for(let i of this.players)nm(this,i,t);for(let i of this.players){let n=im(i);this.phase==="restart"&&this.restart&&this.restart.taker===i&&this.restart.placed&&(n=0),i.celebrate>this.time&&(n=Math.min(n,6.5)),Gp(i,t,this.time,n,e.owner===i)}Vp(this.players);for(let i of this.players)i.pos.x=ht(i.pos.x,-ui.HL+1,ui.HL-1),i.pos.z=ht(i.pos.z,-ui.HW+1,ui.HW-1);e.state==="held"&&e.owner?this.positionHeldBall(e.owner):e.state==="dead"&&this.restart&&this.restart.handsBall&&this.restart.taker&&this.positionThrowBall(this.restart.taker),Yp(e,t,this.ballHooks),(e.version!==this.trajVersion||this.time-this.traj.t0>.12)&&(this.traj.compute(e,this.time),this.trajVersion=e.version),this.phase==="playing"&&ym(this,t),this.stats.update(t),this.updatePhase(t)}positionHeldBall(t){let e=this.ball,i=t.hold==="throw"?-.05:.32,n=t.hold==="throw"?2.05:1.05;e.pos.set(t.pos.x+Math.sin(t.yaw)*i,n,t.pos.z+Math.cos(t.yaw)*i),e.vel.set(0,0,0)}positionThrowBall(t){let e=this.ball;e.pos.set(t.pos.x+Math.sin(t.yaw)*-.05,2.08,t.pos.z+Math.cos(t.yaw)*-.05),e.vel.set(0,0,0)}updatePhase(t){switch(this.phase){case"playing":{if(this.clock+=t,this.rules&&this.checkBall(),this.phase!=="playing")break;this.checkDeadlock(),this.rules&&this.clock>=this.halfLength*this.half&&!this.shotInFlight()&&this.endHalf();break}case"stoppage":this.phaseT>(this.stoppageDelay||.8)&&this.setupRestart(this.pendingRestart);break;case"restart":this.updateRestart(t);break;case"goal":if(this.phaseT>2.8||this.skipRequested&&this.phaseT>.6){this.skipRequested=!1;let e=1-this.lastGoalTeam;this.setupRestart({type:"kickoff",team:e,spot:new at(0,0,0)})}break;case"halftime":(this.phaseT>3.2||this.skipRequested&&this.phaseT>.5)&&(this.skipRequested=!1,this.startSecondHalf());break;default:break}}shotInFlight(){let t=this.ball.lastKick;if(!t||t.kind!=="shot"||this.time-t.t>2.5)return!1;let e=this.attackDir(t.team);return this.ball.vel.x*e>3&&!this.ball.owner}checkBall(){let t=this.ball;if(t.state==="held"||t.state==="dead")return;let e=t.pos;for(let i=0;i<2;i++){let n=i===0?1:-1;if(e.x*n-me>Z.HL){let r=t.crossing[i];if(r&&r.inMouth&&Math.abs(e.z)<ft.HW&&e.y<ft.H){let a=this.teams[0].attack===n?0:1;this.goal(a)}else this.outOverGoalLine(n);return}}if(Math.abs(e.z)-me>Z.HW){let i=t.lastTouch,n=i?1-i.team:this.possTeam!=null?1-this.possTeam:0,r=new at(ht(e.x,-Z.HL+1,Z.HL-1),0,Math.sign(e.z)*Z.HW);this.ballOut("throwin",n,r);return}if(Math.abs(e.x)>ui.HL-.5||Math.abs(e.z)>ui.HW-.5){let i=t.lastTouch,n=i?1-i.team:0,r=new at(ht(e.x,-Z.HL+1,Z.HL-1),0,ht(e.z,-Z.HW,Z.HW));this.ballOut("throwin",n,r)}}outOverGoalLine(t){let e=this.ball,i=this.teams[0].attack===-t?0:1,n=1-i,r=e.lastTouch;if(r&&r.team===i){let a=new at(t*(Z.HL-.4),0,Math.sign(e.pos.z||1)*(Z.HW-.4));this.ballOut("corner",n,a)}else{let a=new at(t*(Z.HL-Kt.GOAL_D*.5),0,ht(e.pos.z*.3,-2.5,2.5));this.ballOut("goalkick",i,a)}}ballOut(t,e,i){let n=this.ball,r=n.lastTouch;this.events.emit("out",{restart:t,team:e,lastTouch:r,controller:n.owner,t:this.time,pos:n.pos.clone()}),n.owner&&(n.owner=null),n.state="free",this.phase="stoppage",this.phaseT=0,this.stoppageDelay=.75,this.pendingRestart={type:t,team:e,spot:i}}goal(t){if(this.phase!=="playing")return;let e=this.ball,i=e.lastTouch,n=null,r=!1,a=null,o=e.lastKick;i&&i.team===t?n=i:o&&o.team===t&&o.kind==="shot"&&o.onTarget&&this.time-o.t<4?n=o.player:i&&(r=!0,a=i),this.teams[t].score++,this.lastGoalTeam=t,e.owner&&(e.owner=null),e.state="free",this.phase="goal",this.phaseT=0,this.skipRequested=!1,n&&(n.celebrate=this.time+2.8,n.action={type:"celebrate",t:0,dur:2.8});for(let l of this.teams[t].players)l!==n&&(l.celebrate=this.time+2.8);this.events.emit("goal",{team:t,scorer:n,ownGoal:r,ownGoalBy:a,t:this.time,clock:this.clock,score:this.scoreline,pos:e.pos.clone()})}foul(t,e,i){if(this.phase!=="playing")return;let n=this.time;e.downUntil=n+1.1,e.action={type:"stumble",t:0,dur:1.1,fall:!0};let r=e.pos.clone();r.x=ht(r.x,-Z.HL+.5,Z.HL-.5),r.z=ht(r.z,-Z.HW+.5,Z.HW-.5);let a=this.ownGoalX(t.team),o=Math.abs(r.x-a)<Kt.PEN_D&&Math.abs(r.z)<Kt.PEN_HW&&Math.sign(r.x)===Math.sign(a),l=o?"penalty":"freekick";o&&r.set(Math.sign(a)*(Z.HL-Kt.SPOT),0,0),this.events.emit("foul",{player:t,victim:e,slide:i,penalty:o,t:n,pos:e.pos.clone()}),this.ball.owner&&(this.ball.owner=null),this.ball.state="free",this.phase="stoppage",this.phaseT=0,this.stoppageDelay=1.1,this.pendingRestart={type:l,team:e.team,spot:r,victim:e}}dislodge(t,e,i,n=!1){let r=this.ball;r.owner=null,r.state="free",r.setVelocity(i),r.lastTouch=e,r.lastTouchTime=this.time,t.noCaptureUntil=this.time+.45,t.stumbleUntil=Math.max(t.stumbleUntil,this.time+.3),this.events.emit("tackle",{player:e,victim:t,success:!0,slide:n,t:this.time})}touchBall(t,e){this.ball.lastTouch=t,this.ball.lastTouchTime=this.time,this.events.emit("touch",{player:t,kind:e,strength:this.ball.speed,t:this.time})}gainControl(t){let e=this.ball,i=e.owner,n=e.lastKick,r="loose";i&&i.team!==t.team?r="steal":n&&ac.has(n.kind)&&this.time-n.t<8&&n.player!==t&&(r=n.team===t.team?"receive":"interception"),e.owner=t,e.state="controlled",e.lastTouch=t,e.lastTouchTime=this.time,this.possTeam=t.team,this.possEpoch=(this.possEpoch||0)+1,this.lastProgress=this.time,i&&(i.noCaptureUntil=this.time+.35),this.passIntent&&this.passIntent.target===t&&(this.passIntent=null),this.events.emit("possession",{player:t,team:t.team,prev:i,cause:r,t:this.time})}loseControl(t){let e=this.ball,i=e.owner;i&&(e.owner=null,e.state=e.pos.y>me+.05?"air":"free",this.events.emit("release",{player:i,reason:t,t:this.time}))}applyKick(t,e,i,n){let r=this.ball;r.owner=null,r.setVelocity(e),r.state=e.y>.8||r.pos.y>me+.1?"air":"free",r.lastTouch=t,r.lastTouchTime=this.time,t.noCaptureUntil=this.time+Me.KICK_RELEASE_LOCK,t.lastKickAt=this.time,t.hold=null,t.touch={foot:i.foot,time:this.time,x:r.pos.x,y:r.pos.y,z:r.pos.z,kind:i.kind==="shot"?"shot":"kick"};let a=i.restart?i.restart.type:null,o=this.events.emit("kick",{player:t,team:t.team,kind:i.kind,target:n.target||null,point:n.point||null,onTarget:!!n.onTarget,speed:e.len(),t:this.time,restart:a,firstTime:i.firstTime,pos:r.pos.clone(),kickId:this.nextKickId++});if(r.lastKick=o,this.lastProgress=this.time,n.target&&ac.has(i.kind)?this.passIntent={target:n.target,point:n.point,t:this.time,from:t}:this.passIntent=i.kind==="shot"?null:this.passIntent,i.restart&&this.phase==="restart"){this.phase="playing",this.phaseT=0,this.restart=null;for(let l of this.players)l.hold=null}}setupRestart(t){let e=this.ball;this.phase="restart",this.phaseT=0,this.skipRequested=!1,this.passIntent=null,this.events.emit("restartSetup",{restart:t.type,team:t.team,t:this.time});let i=t.spot.clone(),n=this.chooseTaker(t);this.restart={type:t.type,team:t.team,spot:i,taker:n,placed:!1,victim:t.victim||null,readyAt:{kickoff:1.1,throwin:.9,corner:1.3,goalkick:1.2,freekick:1.3,penalty:1.8,dropball:.6}[t.type]||1.2,handsBall:t.type==="throwin",humanTaker:n&&n.isHuman,decided:!1},e.owner=null,e.place(i.x,i.z),e.state="dead",e.lastKick=null;for(let r of this.players)r.action&&r.action.type!=="celebrate"&&(r.action=null),r.faceYaw=null,r.hold=null;t.type==="kickoff"||t.type==="penalty"?this.snapPositions():n&&(n.isHuman||n.pos.distXZ(i)>14)&&(this.placeTaker(n),this.events.emit("snap",{t:this.time,who:"taker"})),t.type==="goalkick"&&n&&n.isGK&&this.placeTaker(n)}chooseTaker(t){let e=this.teams[t.team],i=e.players.filter(a=>!a.isGK),n=this.human&&this.human.team===t.team?this.human:null,r=a=>{let o=null,l=1e9;for(let c of a){let h=c.pos.distXZ(t.spot);h<l&&(l=h,o=c)}return[o,l]};switch(t.type){case"kickoff":return n&&(n.role==="ST"||n.role==="AM")?n:i.find(a=>a.role==="ST")||i.find(a=>a.role==="AM")||i[i.length-1];case"goalkick":return e.players.find(a=>a.isGK)||i[0];case"penalty":return n&&(["ST","W","AM"].includes(n.role)||t.victim===n)?n:[...i].sort((a,o)=>o.attrs.finishing-a.attrs.finishing)[0];case"corner":{let a=i.filter(l=>l.role==="W"||l.role==="AM"||l.role==="CM"),[o]=r(a.length?a:i);return n&&n.pos.distXZ(t.spot)<14&&n.pos.distXZ(t.spot)<=o.pos.distXZ(t.spot)+3?n:o}default:{let[a,o]=r(i.filter(l=>this.time>=l.downUntil||l===t.victim));return n&&(t.victim===n||n.pos.distXZ(t.spot)<12&&n.pos.distXZ(t.spot)<=o+2)?n:a||i[0]}}}placeTaker(t){let e=this.restart,i=e.spot,n=this.attackDir(t.team),r,a;if(e.type==="throwin"){r=.3*n,a=-Math.sign(i.z);let o=Math.hypot(r,a);r/=o,a/=o,t.pos.set(i.x-r*.35,0,i.z-a*.35)}else{let o=e.type==="corner"?i.x-n*8:n*Z.HL,l=(e.type==="corner",0);r=o-i.x,a=l-i.z;let c=Math.hypot(r,a)||1;r/=c,a/=c,t.pos.set(i.x-r*.7,0,i.z-a*.7)}t.yaw=Bt(r,a),t.prevYaw=t.yaw,t.prevPos.copy(t.pos),t.vel.set(0,0,0),t.isHuman&&this.events.emit("humanYaw",{yaw:t.yaw})}snapPositions(){this.snapCount++,this.events.emit("snap",{t:this.time,who:"all"});for(let t of this.players){let e=this.ai.restartTarget(t,this.restart,!0);t.pos.copy(e),Hp(t),t.celebrate=0;let i=this.attackDir(t.team),n=this.restart.spot.x-t.pos.x,r=this.restart.spot.z-t.pos.z;t.yaw=Math.hypot(n,r)>.5?Bt(n,r):Bt(i,0),t.prevYaw=t.yaw,t.prevPos.copy(t.pos)}this.restart.taker&&this.placeTaker(this.restart.taker),this.human&&this.events.emit("humanYaw",{yaw:this.human.yaw})}updateRestart(t){let e=this.restart;if(!e)return;let i=e.taker;if(!i){this.phase="playing";return}let n=i.pos.distXZ(e.spot);if(!e.placed){(n<.9||i.isHuman||this.phaseT>3.5)&&(n>=.9&&this.placeTaker(i),e.placed=!0,e.placedAt=this.phaseT,e.type==="throwin"&&(i.hold="throw"));return}if(this.phaseT>4.5&&!e.cleared&&(e.cleared=!0,this.ai.enforceDistances(e)),!(this.phaseT<e.readyAt||this.phaseT-e.placedAt<.35)){if(e.humanTaker&&!e.autoTaken){this.phaseT>12&&(e.autoTaken=!0,this.ai.takeRestart(i,e));return}i.action||this.ai.takeRestart(i,e)}}startSecondHalf(){this.half=2,this.clock=this.halfLength;for(let t of this.teams)t.attack=-t.attack;this.events.emit("secondHalf",{t:this.time}),this.setupRestart({type:"kickoff",team:1-this.kickoffTeam,spot:new at(0,0,0)})}endHalf(){this.events.emit("whistle",{kind:this.half===1?"half":"full",t:this.time}),this.ball.owner&&(this.ball.owner=null),this.ball.state="free";for(let t of this.players)t.action&&t.action.type!=="celebrate"&&(t.action=null);this.half===1?(this.phase="halftime",this.phaseT=0,this.events.emit("halftime",{t:this.time,score:this.scoreline})):(this.phase="fulltime",this.phaseT=0,this.events.emit("fulltime",{t:this.time,score:this.scoreline}))}checkDeadlock(){let t=this.ball;if(t.owner||t.speed>.3){this.lastProgress=this.time;return}if(this.time-this.lastProgress>9){let e=t.lastTouch,i=e?1-e.team:0,n=new at(ht(t.pos.x,-Z.HL+2,Z.HL-2),0,ht(t.pos.z,-Z.HW+2,Z.HW-2));this.events.emit("dropball",{t:this.time}),this.phase="stoppage",this.phaseT=0,this.stoppageDelay=.3,this.pendingRestart={type:"freekick",team:i,spot:n},this.lastProgress=this.time}}requestSkip(){this.skipRequested=!0}get displayClock(){let t=this.halfLength*2,e=Math.min(this.clock,t)/t*90*60,i=Math.floor(e/60),n=Math.floor(e%60);return`${String(i).padStart(2,"0")}:${String(n).padStart(2,"0")}`}};var zc=class{constructor(t,e){this.m=t,this.p=e,this.input={moveF:0,moveR:0,sprint:!1,yaw:0,pitch:0,lmb:!1,rmb:!1},this.buffer=[],this.intent=null,this.passTarget=null,this.targetVisible=!1,this.lastAction=null}press(t){this.buffer.push({type:t,t:this.m.time})}release(t){this.buffer.push({type:t+"Up",t:this.m.time})}update(t){let e=this.m,i=this.p,n=e.time,r=e.ball,a=this.input,o=a.yaw,l=Math.sin(o),c=Math.cos(o),h=-Math.cos(o),u=Math.sin(o),d=l*a.moveF+h*a.moveR,p=c*a.moveF+u*a.moveR,g=Math.hypot(d,p);g>1&&(d/=g,p/=g);let x=r.owner===i&&r.state==="controlled";i.sprint=a.sprint&&g>.1;let f=i.maxSpeed(i.sprint,x);i.desired.set(d*f,0,p*f),i.faceYaw=o;let m=e.phase==="restart"&&e.restart&&e.restart.taker===i&&e.restart.placed,v=!x&&!r.owner&&r.state!=="dead"&&(this.intent||e.passIntent&&e.passIntent.target===i);x||m||v?(this.passTarget=Zp(e,i,o,this.passTarget,e.assist.passCone),this.targetVisible=!!this.passTarget):(this.targetVisible=!1,(!r.owner||r.owner.team!==i.team)&&(this.passTarget=null));let w=i.action;if(w&&w.type==="kick"&&w.kind==="shot"&&!w.contacted&&!w.ai&&(w.aimYaw=o,w.aimPitch=a.pitch),e.phase==="goal"||e.phase==="halftime"){for(let _ of this.buffer)_.type.endsWith("Up")||e.requestSkip();this.buffer.length=0;return}if(m){this.restartControls();return}if(e.phase!=="playing"){this.buffer.some(_=>_.type==="through")&&(this.requestPass(),this.buffer=this.buffer.filter(_=>_.type!=="through")),this.buffer=this.buffer.filter(_=>n-_.t<Me.INPUT_BUFFER&&!_.type.endsWith("Up"));return}let b=[];for(let _ of this.buffer){if(this.handle(_,x))continue;let M=_.type==="slide"?1.2:_.type==="tackle"?.4:Me.INPUT_BUFFER;n-_.t<M&&!_.type.endsWith("Up")&&b.push(_)}this.buffer=b,this.updateIntent(x)}handle(t,e){let i=this.m,n=this.p,r=i.time,a=this.input,o=n.action;switch(t.type){case"passUp":return o&&o.type==="kick"&&o.kind==="pass"&&o.charging&&Ns(o),this.intent&&this.intent.kind==="pass"&&(this.intent.released=!0),!0;case"shootUp":return o&&o.type==="kick"&&o.kind==="shot"&&o.charging&&(o.aimYaw=a.yaw,o.aimPitch=a.pitch,Ns(o)),this.intent&&this.intent.kind==="shot"&&!this.intent.released&&(this.intent.released=!0,this.intent.charge=Math.min(1,(r-this.intent.t0)/.65)),!0;case"pass":case"shoot":case"through":{let l=t.type==="shoot"?"shot":t.type;if(e)return fs(i,n)?(l==="shot"?ce(i,n,"shot",{charging:a.lmb,aimYaw:a.yaw,aimPitch:a.pitch}):ce(i,n,l,{target:this.passTarget,charging:l==="pass"&&a.rmb,aimYaw:a.yaw}),this.lastAction={kind:l,t:r},this.intent=null,!0):!1;if(l==="through")return this.requestPass(),!0;let c=Gu(i,n,.75);return this.intent={kind:l,t0:t.t,released:l==="shot"?!a.lmb:!a.rmb,charge:0,until:r+Math.max(Me.INPUT_BUFFER,c!=null?c+.12:0)},!0}case"tackle":case"slide":{if(e&&t.type==="tackle")return!1;o&&o.type==="kick"&&!o.contacted&&!o.owned&&(n.action=null,n.faceYaw=null),this.intent=null;let l=t.type==="tackle"?oc(i,n):lc(i,n,{force:!0});return l&&(this.lastAction={kind:t.type,t:r}),l}default:return!0}}updateIntent(t){let e=this.intent;if(!e)return;let i=this.m,n=this.p,r=i.time,a=this.input;if(e.kind==="shot"&&!e.released&&(e.charge=Math.min(1,(r-e.t0)/.65)),t){if(!fs(i,n))return;e.kind==="shot"?ce(i,n,"shot",{charge:e.charge,aimYaw:a.yaw,aimPitch:a.pitch,minContact:.06}):ce(i,n,"pass",{target:this.passTarget,aimYaw:a.yaw,minContact:.06}),this.intent=null;return}if(r>e.until||i.ball.owner&&i.ball.owner!==n){this.intent=null;return}if(!fs(i,n))return;let o=Gu(i,n,.5);if(o!=null&&o<=.13){let l=e.kind==="shot"?"shot":"pass";ce(i,n,l,{target:l==="pass"?this.passTarget:null,aimYaw:a.yaw,aimPitch:a.pitch,charge:l==="shot"?Math.max(.25,e.charge):0,firstTime:!0,minContact:Math.max(.04,o),deadline:o+.22}),this.lastAction={kind:l,t:r,firstTime:!0},this.intent=null}else o!=null&&(e.until=Math.max(e.until,r+o+.05))}requestPass(){let t=this.m,e=this.p,i=t.time;i<e.requestReadyAt||(e.requestUntil=i+2.4,e.requestReadyAt=i+Me.REQUEST_COOLDOWN,t.events.emit("request",{player:e,t:i}))}restartControls(){let t=this.m,e=this.p,i=t.time,n=this.input,r=t.restart,a=[],o=e.action;for(let l of this.buffer){if(l.type==="shootUp"){o&&o.kind==="shot"&&o.charging&&(o.aimYaw=n.yaw,o.aimPitch=n.pitch,Ns(o));continue}if(l.type==="passUp"){o&&o.charging&&Ns(o);continue}if(!e.action){if(l.type==="pass"||l.type==="through"){r.type==="throwin"?ce(t,e,"throw",{target:this.passTarget,aimYaw:n.yaw,restart:r,point:this.passTarget?null:Qu(e,n.yaw,12)}):ce(t,e,l.type==="through"?"through":"pass",{target:this.passTarget,aimYaw:n.yaw,restart:r,charging:l.type==="pass"&&n.rmb});continue}if(l.type==="shoot"){r.type==="throwin"?ce(t,e,"throw",{point:Qu(e,n.yaw,20),restart:r}):r.type==="corner"?ce(t,e,"cross",{point:Qu(e,n.yaw,ht(18+n.pitch*30,8,30)),restart:r}):ce(t,e,"shot",{charging:n.lmb,aimYaw:n.yaw,aimPitch:n.pitch,restart:r});continue}i-l.t<Me.INPUT_BUFFER&&a.push(l)}}this.buffer=a}};function Qu(s,t,e){return new at(ht(s.pos.x+Math.sin(t)*e,-Z.HL+1,Z.HL-1),0,ht(s.pos.z+Math.cos(t)*e,-Z.HW+1,Z.HW-1))}var wm=12,Ua=class{constructor(t,e){this.app=t,this.cfg=e,this.view=t.view,this.audio=t.audio,this.hud=t.hud,this.input=t.input,this.match=e.matchObject||new Uc(e.match);let i=this.match;this.human=i.human,this.human&&(this.ctl=new zc(i,this.human),i.humanCtl=this.ctl),this.cam={mode:this.human?"fp":"orbit",yaw:0,pitch:-.14,eye:1.65,fov:t.settings.fov,bob:t.settings.bob?1:0,shake:t.settings.shake?1:0,angle:0,radius:58,height:26},this.acc=0,this.paused=!1,this.ended=!1,this.excite=0,this.slideEye=0,this.unsubs=[],this.kitA=e.colours?e.colours.kits[0].shirt:"#c00",this.kitB=e.colours?e.colours.kits[1].shirt:"#00c",this.view.setVenue(e.venue||"community",e.venueOpts||{}),this.view.setMatch(i,e.colours),this.view.localPlayer=this.human,this.view.firstPerson=!!this.human,this.replays=(e.mode==="career"||e.mode==="quick")&&t.settings.replays!==!1&&!t.params?.has("noreplay"),this.view.setRecording(this.replays),this.replay=null,this.pendingReplay=null,this.hud.onSkipReplay=()=>this.skipReplay(),this.hookEvents(),this.human&&this.unsubs.push(this.input.on((n,r)=>{if(!(this.paused||!this.ctl)){if(this.replay){r&&this.skipReplay();return}r?this.ctl.press(n):this.ctl.release(n)}}))}startReplay(){let t=this.pendingReplay;this.pendingReplay=null;let e=this.view.recorder,i=this.match;if(!t||!e||i.time-t.goalT>8)return!1;let n=t.shotT!=null&&t.goalT-t.shotT<3.5?t.shotT:t.goalT-.6,r=e.clip(t.goalT,n);return r?(this.replay=new wc(e,r,{goalT:t.goalT,shotT:t.shotT,subject:t.subject}),this.replay.team=t.team,this.hud.setReplay(!0,t.info,!this.input.touchMode),this.hud.flashFade(),this.ctl&&(this.ctl.buffer.length=0),!0):!1}skipReplay(){this.replay&&this.endReplay()}endReplay(){this.replay=null,this.hud.setReplay(!1),this.hud.flashFade(),this.ctl&&(this.ctl.buffer.length=0),this.match.phase==="goal"&&this.match.requestSkip()}replayFrame(t){let e=this.replay,i=this.paused?0:t;for(let a of e.advance(i))if(a==="shot"&&this.audio.play("shot",{gain:.8,rate:.72}),a==="goal"){this.audio.play("net",{gain:.9,rate:.75}),this.audio.play("cheer",{group:"crowd",gain:.8});let o=e.frame();o&&this.view.celebrate(o.ball.x,o.ball.z,e.team??0,.8)}let n=e.frame();if(!n)return this.endReplay(),!1;let r=e.camera(n,i);return this.view.render(1,i,r,{crowd:.6,replay:n}),this.view.markers.hideAll(),this.hud.updateReplay(e),e.done&&this.endReplay(),!0}start(){let t=this.match;this.cfg.kickoffTeam!=null?t.start(this.cfg.kickoffTeam):this.cfg.noStart||t.start(),this.human&&(this.cam.yaw=this.human.yaw);let e=(Ca[this.cfg.venue]||Ca.community).loud;this.cfg.mode!=="menu"&&this.audio.startCrowd(.25+e*.75)}hookEvents(){let t=this.match,e=t.events,i=this.audio,n=this.view,r=(l,c)=>this.unsubs.push(e.on(l,c)),a=this.cfg.mode==="menu",o=(l,c=1)=>{if(a)return{gain:0};let h=n.camera.position,u=l.x-h.x,d=l.z-h.z,p=Math.hypot(u,d),g=this.cam.yaw,x=-Math.cos(g)*u+Math.sin(g)*d;return{gain:c/(1+p*.045),pan:x/(p+3)}};r("kick",l=>{let c=o(l.pos,1);l.kind==="shot"?(i.play("shot",{...c,gain:c.gain*Math.min(1.2,.55+l.speed/40)}),l.player===this.human&&(n.shake=1),this.excite=Math.max(this.excite,.7)):l.kind==="throw"?i.play("touch",{...c,gain:c.gain*.3}):i.play("pass",{...c,gain:c.gain*Math.min(1,.4+l.speed/30),rate:.95+Math.random()*.1}),l.restart==="kickoff"&&i.play("whistle",{gain:a?0:.8})}),r("touch",l=>i.play("touch",{...o(l.player.pos,l.kind==="receive"?.8:.55),rate:.9+Math.random()*.2})),r("deflect",l=>i.play("bounce",o(l.player.pos,Math.min(1,l.speed/10)))),r("bounce",l=>{l.speed>2&&i.play("bounce",o(t.ball.pos,Math.min(.6,l.speed/16)))}),r("frame",l=>{i.play("post",o(t.ball.pos,Math.min(1,l.speed/18))),i.play("groan",{group:"crowd",gain:a?0:.7}),this.excite=1}),r("save",l=>{i.play(l.caught?"catch":"bounce",o(l.player.pos,1)),l.shot&&l.shot.onTarget&&i.play("groan",{group:"crowd",gain:a?0:.5})}),r("tackle",l=>i.play("tackle",o(l.player.pos,.9))),r("slide",l=>i.play("slide",o(l.player.pos,.8))),r("foul",l=>{i.play("whistle",{gain:a?0:.9}),(l.victim===this.human||l.player===this.human)&&this.hud.notify(l.player===this.human?"FOUL":"FOULED","bad"),l.penalty&&!a&&this.hud.showBanner("PENALTY","",1800)}),r("halftime",()=>{i.play("whistleLong",{gain:a?0:.9}),a||this.hud.showBanner("HALF TIME",`${t.teams[0].short} ${t.scoreline[0]} - ${t.scoreline[1]} ${t.teams[1].short}`,3e3)}),r("fulltime",()=>{if(i.play("whistleLong",{gain:a?0:.9}),a)return;let[l,c]=t.scoreline,h=this.human&&(this.human.team===0?l>c:c>l);if(this.cfg.final&&h){this.hud.showBanner("CHAMPIONS",`${this.cfg.final} winners!`,6e3,"mine"),i.play("cheer",{group:"crowd",gain:1}),n.crowdLevel=1;for(let u=0;u<3;u++)setTimeout(()=>n.celebrate((Math.random()-.5)*30,(Math.random()-.5)*20,this.human.team,1.4),u*500)}else this.hud.showBanner("FULL TIME",`${t.teams[0].short} ${l} - ${c} ${t.teams[1].short}`,4e3)}),r("snap",()=>{a||this.hud.flashFade()}),r("humanYaw",l=>{this.cam.yaw=l.yaw,this.cam.pitch=-.14}),r("request",()=>i.play("shout",{gain:.5})),r("ack",l=>{i.play("ack",{gain:.6}),this.ackPlayer=l.player,this.ackUntil=t.time+1.2}),r("goal",l=>{if(i.play("net",o(l.pos,1)),a||i.play("cheer",{group:"crowd",gain:1}),this.excite=1,n.crowdLevel=1,n.celebrate(l.pos.x,l.pos.z,l.team,1),!a){let c=l.ownGoal?`Own goal (${l.ownGoalBy?l.ownGoalBy.name:""})`:l.scorer?`${l.scorer.name}${l.assist?` \xB7 assist ${l.assist.name}`:""}`:"",h=this.human&&l.scorer===this.human;this.hud.showBanner(h?"GOAL!":"GOAL",`${t.teams[0].short} ${t.scoreline[0]} - ${t.scoreline[1]} ${t.teams[1].short} \xB7 ${c}`,2600,h?"mine":"")}}),r("credit",l=>{if(l.player!==this.human||a)return;let h={passCompleted:["PASS COMPLETED",""],assist:["ASSIST","good"],tackleWon:["TACKLE WON","good"],interception:["INTERCEPTION","good"],possessionLost:["POSSESSION LOST","bad"],shotSaved:["SHOT SAVED",""]}[l.kind];h&&this.hud.notify(h[0],h[1])}),r("goal",l=>{!a&&this.human&&l.scorer===this.human&&this.hud.notify("GOAL","good")}),r("goal",l=>{if(!this.replays||this.app.settings.replays===!1)return;let c=t.ball.lastKick,h=c&&c.team===l.team&&l.t-c.t<4?c.t:null,u=l.ownGoal?c&&c.team===l.team?c.player:l.ownGoalBy:l.scorer||c&&c.player,d=Math.max(1,Math.ceil(t.clock/60)),p=l.ownGoal?`Own goal${l.ownGoalBy?` (${l.ownGoalBy.name})`:""}`:l.scorer?l.scorer.name:"";this.pendingReplay={goalT:l.t,shotT:h,subject:u?t.players.indexOf(u):-1,team:l.team,info:`${t.teams[0].short} ${t.scoreline[0]} - ${t.scoreline[1]} ${t.teams[1].short}${p?` \xB7 ${p}`:""} \xB7 ${d}'`}})}frame(t){let e=this.match;if(this.replay&&this.replayFrame(t))return;if(!this.paused&&!this.ended){if(this.human&&this.ctl){let l=this.input.axes();this.input.consumeLook(this.cam,t);let c=this.ctl.input;c.moveF=l.f,c.moveR=l.r,c.sprint=l.sprint,c.yaw=this.cam.yaw,c.pitch=this.cam.pitch;let h=this.input.held;c.lmb=h.lmb,c.rmb=h.rmb}this.acc+=Math.min(t,.1)*(this.cfg.timeScale||1);let o=0;for(;this.acc>=ks&&o<wm;)if(e.step(ks),this.acc-=ks,o++,this.cfg.onStep&&this.cfg.onStep(e),this.pendingReplay&&(e.phase!=="goal"||e.phaseT>2.3||e.skipRequested&&e.phaseT>.5)){if(e.phase==="goal"&&this.startReplay()){this.acc=0;break}this.pendingReplay=null}if(o>=wm&&(this.acc=0),this.replay&&this.replayFrame(0))return;e.phase==="fulltime"&&!this.ended&&e.phaseT>(this.cfg.mode==="menu"?0:2.5)&&(this.ended=!0,this.cfg.onEnd&&this.cfg.onEnd(this))}let i=this.paused?1:this.acc/ks,n=e.ball.pos,r=Math.max(0,1-Math.min(Math.abs(n.x-Z.HL),Math.abs(n.x+Z.HL))/24);if(this.excite=Math.max(r*.45,this.excite-t*.25),this.cfg.mode!=="menu"&&this.audio.setExcitement(this.excite),this.human){let o=this.human.action,l=o&&o.type==="slide"?o.t<.7?.72:1.65:e.time<this.human.downUntil?.6:1.65;this.cam.eye+=(l-this.cam.eye)*(1-Math.exp(-t*9))}else this.cam.angle+=t*.05;this.cam.fov=this.app.settings.fov,this.cam.bob=this.app.settings.bob?1:0,this.cam.shake=this.app.settings.shake?1:0;let a=this.app.debugCam?{mode:"free",pos:this.app.debugCam.pos,look:this.app.debugCam.look,fov:this.app.debugCam.fov||this.cam.fov}:this.cam;this.view.render(i,t,a,{crowd:this.excite*.5}),this.updateMarkers(),this.cfg.mode!=="menu"&&this.hud.update(this.hudState())}updateMarkers(){let t=this.view.markers,e=this.match;if(t.hideAll(),!this.ctl||this.cfg.mode==="menu")return;let i=this.ctl.passTarget;i&&this.ctl.targetVisible&&t.showRing(i.pos.x,i.pos.z,e.time),this.ackPlayer&&e.time<this.ackUntil&&t.showAck(this.ackPlayer.pos.x,2.25,this.ackPlayer.pos.z,e.time);let n=e.passIntent;n&&n.target===this.human&&n.point&&!e.ball.owner&&t.showIncoming(n.point.x,n.point.z)}hudState(){let t=this.match,e=this.human,i="",n=this.input.touchMode;if(e){let a=t.restart;t.phase==="restart"&&a&&a.taker===e?i=n?a.type==="throwin"?"Throw-in: PASS short throw \xB7 SHOOT long throw":a.type==="corner"?"Corner: SHOOT crosses to where you aim \xB7 PASS short":a.type==="penalty"?"Penalty: aim, hold SHOOT and release":a.type==="kickoff"?"Kick-off: PASS to a teammate":"Free kick: PASS \xB7 THRU \xB7 SHOOT":a.type==="throwin"?"Throw-in: RMB/Space short throw \xB7 LMB long throw":a.type==="corner"?"Corner: LMB cross to where you aim \xB7 RMB short pass":a.type==="penalty"?"Penalty: aim and hold LMB, release to shoot":a.type==="kickoff"?"Kick-off: RMB pass to a teammate":"Free kick: RMB pass \xB7 Space through ball \xB7 LMB shoot":t.phase==="goal"||t.phase==="halftime"?i=n?"Tap any button to skip":"Press any action to skip":n?i=t.ball.owner&&t.ball.owner.team===e.team&&t.ball.owner!==e&&e.requestUntil>t.time?"Pass requested":"":t.ball.owner===e?i="LMB shoot \xB7 RMB pass \xB7 Space through ball":t.ball.owner&&t.ball.owner.team!==e.team?i=t.ball.owner.pos.distXZ(e.pos)<3?"E tackle \xB7 C slide":"":t.ball.owner&&t.ball.owner.team===e.team&&(i=e.requestUntil>t.time?"Pass requested":"Space: call for the ball")}let r=this.ctl&&this.ctl.intent;return{match:t,camera:this.view.camera,view:this.view,camYaw:this.cam.yaw,style:this.view.style,kitA:this.kitA,kitB:this.kitB,hint:i,intentCharge:r&&r.kind==="shot"?r.charge:0,phaseText:t.phase==="halftime"?"HALF TIME":t.phase==="fulltime"?"FULL TIME":t.half===2?"2ND HALF":"1ST HALF",clockText:this.cfg.clockText?this.cfg.clockText(t):void 0,noArrow:this.cfg.noArrow}}setPaused(t){this.paused=t,this.ctl&&t&&(this.ctl.buffer.length=0)}dispose(){for(let t of this.unsubs)t();this.unsubs=[],this.replay=null,this.pendingReplay=null,this.hud.setReplay(!1),this.hud.onSkipReplay=null,this.audio.stopCrowd(),this.view.markers.hideAll()}};var Tm=null,Em="localStorage",Am=["firsttouch.career","firsttouch.career.backup","firsttouch.settings.v1","firsttouch.style","firsttouch.tutorial"],td=()=>Tm||globalThis.localStorage,di={get kind(){return Em},getItem(s){return td().getItem(s)},setItem(s,t){td().setItem(s,String(t))},removeItem(s){td().removeItem(s)}};function Rm(s,t){Tm=s,Em=t}var ed="firsttouch.settings.v1",Im="firsttouch.style",id=60,nd=200,Pm=3,Cm=2.25,Fc={rev:Pm,sensitivity:1,invertY:!1,fov:100,master:.8,sfx:.9,crowd:.6,difficulty:"assisted",bob:!0,shake:!0,quality:"high",matchLength:"normal",touch:"auto",replays:!0};function Lm(){try{return!!di.getItem(ed)}catch{return!1}}function km(s=!1){let t=()=>({...Fc,...s?{sensitivity:Cm}:{}});try{let e=di.getItem(ed);if(!e)return t();let i={...Fc,...JSON.parse(e)};return(i.rev||1)<2&&i.fov===85&&(i.fov=Fc.fov),(i.rev||1)<3&&s&&i.sensitivity===1&&(i.sensitivity=Cm),i.rev=Pm,i.fov=Math.min(nd,Math.max(id,Number(i.fov)||Fc.fov)),i}catch{return t()}}function Nm(s){try{return di.setItem(ed,JSON.stringify(s)),!0}catch{return!1}}function Dm(){try{let s=di.getItem(Im);return s==="neo"||s==="classic"?s:"classic"}catch{return"classic"}}function Om(s){try{di.setItem(Im,s)}catch{}}var sd=[{tier:1,league:"League Two",venue:"community",label:"League Two"},{tier:2,league:"League One",venue:"town",label:"League One"},{tier:3,league:"Championship",venue:"regional",label:"Championship"},{tier:4,league:"Premier League",venue:"premier",label:"Premier League"},{tier:5,league:"European Elite",venue:"continental",label:"European Elite"}],ni=[{id:"swindon",name:"Swindon Town",short:"SWI",tier:1,colors:["#d1101e","#ffffff","#ffffff"],style:"wing",crest:{shape:"shield",pattern:"chevron",symbol:"S"},ground:"County Ground"},{id:"chesterfield",name:"Chesterfield",short:"CHF",tier:1,colors:["#0a3d91","#ffffff","#ffffff"],style:"direct",crest:{shape:"circle",pattern:"chevron",symbol:"C"},ground:"SMH Group Stadium"},{id:"bromley",name:"Bromley",short:"BRO",tier:1,colors:["#f5f5f5","#111111","#111111"],style:"counter",crest:{shape:"diamond",pattern:"chevron",symbol:"B"},ground:"Hayes Lane"},{id:"grimsby",name:"Grimsby Town",short:"GRI",tier:1,colors:["#151515","#f5f5f5","#151515"],style:"possession",crest:{shape:"shield",pattern:"stripes",symbol:"G"},ground:"Blundell Park"},{id:"bradford",name:"Bradford City",short:"BRA",tier:2,colors:["#7d1d3f","#f6a800","#111111"],style:"possession",crest:{shape:"shield",pattern:"stripes",symbol:"B"},ground:"Valley Parade"},{id:"barnsley",name:"Barnsley",short:"BNS",tier:2,colors:["#d71920","#ffffff","#ffffff"],style:"pressing",crest:{shape:"circle",pattern:"chevron",symbol:"B"},ground:"Oakwell"},{id:"wigan",name:"Wigan Athletic",short:"WIG",tier:2,colors:["#1d59af","#ffffff","#1d59af"],style:"direct",crest:{shape:"hex",pattern:"stripes",symbol:"W"},ground:"Brick Community Stadium"},{id:"plymouth",name:"Plymouth Argyle",short:"PLY",tier:2,colors:["#00573f","#ffffff","#111111"],style:"wing",crest:{shape:"diamond",pattern:"chevron",symbol:"P"},ground:"Home Park"},{id:"westham",name:"West Ham United",short:"WHU",tier:3,colors:["#7a263a","#1bb1e7","#ffffff"],style:"pressing",crest:{shape:"shield",pattern:"quarters",symbol:"W"},ground:"London Stadium"},{id:"wolves",name:"Wolverhampton Wanderers",short:"WOL",tier:3,colors:["#fdb913","#231f20","#231f20"],style:"counter",crest:{shape:"circle",pattern:"chevron",symbol:"W"},ground:"Molineux"},{id:"southampton",name:"Southampton",short:"SOU",tier:3,colors:["#d71920","#ffffff","#111111"],style:"wing",crest:{shape:"hex",pattern:"stripes",symbol:"S"},ground:"St Mary's Stadium"},{id:"swansea",name:"Swansea City",short:"SWA",tier:3,colors:["#f5f5f5","#121212","#f5f5f5"],style:"possession",crest:{shape:"shield",pattern:"chevron",symbol:"S"},ground:"Swansea.com Stadium"},{id:"mancity",name:"Manchester City",short:"MCI",tier:4,colors:["#6cabdd","#1c2c5b","#ffffff"],style:"possession",crest:{shape:"circle",pattern:"chevron",symbol:"M"},ground:"Etihad Stadium"},{id:"arsenal",name:"Arsenal",short:"ARS",tier:4,colors:["#ef0107","#ffffff","#ffffff"],style:"pressing",crest:{shape:"shield",pattern:"quarters",symbol:"A"},ground:"Emirates Stadium"},{id:"liverpool",name:"Liverpool",short:"LIV",tier:4,colors:["#c8102e","#f6eb61","#c8102e"],style:"direct",crest:{shape:"shield",pattern:"chevron",symbol:"L"},ground:"Anfield"},{id:"chelsea",name:"Chelsea",short:"CHE",tier:4,colors:["#034694","#ffffff","#034694"],style:"counter",crest:{shape:"circle",pattern:"chevron",symbol:"C"},ground:"Stamford Bridge"},{id:"realmadrid",name:"Real Madrid",short:"RMA",tier:5,colors:["#f5f5f5","#1c2b5a","#f5f5f5"],style:"counter",crest:{shape:"circle",pattern:"crown",symbol:"R"},ground:"Santiago Bernab\xE9u"},{id:"barcelona",name:"FC Barcelona",short:"BAR",tier:5,colors:["#a50044","#004d98","#004d98"],style:"possession",crest:{shape:"shield",pattern:"stripes",symbol:"B"},ground:"Camp Nou"},{id:"bayern",name:"Bayern M\xFCnchen",short:"BAY",tier:5,colors:["#dc052d","#ffffff","#dc052d"],style:"pressing",crest:{shape:"circle",pattern:"chevron",symbol:"B"},ground:"Allianz Arena"},{id:"psg",name:"Paris Saint-Germain",short:"PSG",tier:5,colors:["#004170","#da291c","#004170"],style:"wing",crest:{shape:"hex",pattern:"band",symbol:"P"},ground:"Parc des Princes"}],rd={millbrook:"swindon",ashford:"chesterfield",kettle:"bromley",harbour:"grimsby",oldbridge:"bradford",fenwick:"barnsley",stonegate:"wigan",crowmere:"plymouth",redcliffe:"westham",northvale:"wolves",easthaven:"southampton",marlow:"swansea",kingsport:"mancity",westmoor:"arsenal",ironside:"liverpool",solace:"chelsea",valmonte:"realmadrid",nordhavn:"barcelona",castellan:"bayern",aurelio:"psg"},Qt=s=>ni.find(t=>t.id===s)||ni.find(t=>t.id===rd[s]),On=s=>ni.filter(t=>t.tier===s),Wi=s=>sd[s-1];function za(s){let t=ni.filter(e=>e.tier===s.tier).indexOf(s);return 38+s.tier*9+(3-t)*1.5}function rn(s,t=48){let[e,i]=s.colors,n=s.crest,r={shield:"M6 4 H42 V22 C42 34 33 42 24 46 C15 42 6 34 6 22 Z",circle:"M24 3 A21 21 0 1 1 23.99 3 Z",diamond:"M24 2 L46 24 L24 46 L2 24 Z",hex:"M14 4 H34 L45 24 L34 44 H14 L3 24 Z"}[n.shape]||"M6 4 H42 V22 C42 34 33 42 24 46 C15 42 6 34 6 22 Z",a=`c${s.id}${t}`,o="";switch(n.pattern){case"chevron":o=`<path d="M0 26 L24 12 L48 26 V34 L24 20 L0 34 Z" fill="${i}"/>`;break;case"stripes":o=[10,22,34].map(h=>`<rect x="${h}" y="0" width="6" height="48" fill="${i}"/>`).join("");break;case"half":o=`<rect x="24" y="0" width="24" height="48" fill="${i}"/>`;break;case"band":o=`<rect x="0" y="18" width="48" height="10" fill="${i}"/>`;break;case"quarters":o=`<rect x="24" y="0" width="24" height="24" fill="${i}"/><rect x="0" y="24" width="24" height="24" fill="${i}"/>`;break;case"crown":o=`<path d="M13 16 L17 8 L21 14 L24 6 L27 14 L31 8 L35 16 Z" fill="${i}"/>`;break;default:break}let c=(h=>{let u=parseInt(h.slice(1),16);return((u>>16)*.3+(u>>8&255)*.59+(u&255)*.11)/255})(e)>.6?"#111":"#fff";return`<svg class="crest" width="${t}" height="${t}" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="${a}"><path d="${r}"/></clipPath></defs><g clip-path="url(#${a})"><rect width="48" height="48" fill="${e}"/>${o}</g><path d="${r}" fill="none" stroke="#111" stroke-width="2.5"/><text x="24" y="${n.pattern==="crown"?36:31}" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="15" text-anchor="middle" fill="${c}" stroke="${c==="#fff"?"#111":"#fff"}" stroke-width="0.6">${n.symbol}</text></svg>`}var zr=["England","Scotland","Wales","Ireland","France","Spain","Portugal","Italy","Germany","Netherlands","Belgium","Denmark","Norway","Sweden","Poland","Croatia","Serbia","Greece","Turkey","Morocco","Nigeria","Ghana","Senegal","Egypt","Brazil","Argentina","Uruguay","Colombia","Mexico","USA","Canada","Japan","South Korea","Australia"],Um=["Alex","Sam","Jordan","Luca","Mateo","Noah","Kai","Theo","Rafa","Idris","Tomas","Jonas","Emil","Kofi","Yusuf","Diego","Ben","Oscar","Leo","Marco","Hugo","Ruben","Nico","Arlo","Felix","Ade","Kenji","Milo","Sven","Ivo"],zm=["Hart","Moreno","Okafor","Lindqvist","Bennett","Costa","Novak","Reyes","Walsh","Kowalski","Mensah","Rossi","Dubois","Larsen","Silva","Ibrahim","Clarke","Varga","Tanaka","Moss","Keane","Adeyemi","Brandt","Petrov","Ferreira","Holt","Quinn","Sato","Doyle","Marsh"];function Fm(s,t){let e=0;for(let r of s)e=e*31+r.charCodeAt(0)>>>0;let i=Um[(e+t*7)%Um.length],n=zm[(e*3+t*11)%zm.length];return`${i[0]}. ${n}`}var O_={GK:{},DEF:{tackling:7,stamina:2,pace:1},CM:{passing:5,stamina:4,control:1},AM:{passing:4,control:4,finishing:1},W:{pace:6,control:3},ST:{finishing:6,pace:3}},U_={GK:[1],DEF:[2,5,4,3],CM:[6,8,4],AM:[10,8],W:[7,11],ST:[9,10]};function z_(s,t,e){let i={};for(let n of["pace","stamina","control","passing","finishing","tackling"])i[n]=Math.round(t+e.range(-4,4)+(O_[s][n]||0)-(n==="tackling"&&(s==="ST"||s==="W")?6:0)-(n==="finishing"&&s==="DEF"?6:0));return i}function Fa(s,t={}){let e=t.human||null,i=new Sn(wn(s.id+(t.seed||""))),n=t.strength??za(s),r=Lc(s.style,e?e.role:null),a=Oa[r],o=new Set;e&&o.add(e.number);let l=a.map((c,h)=>{let d=(U_[c.role]||[h+1]).find(p=>!o.has(p));if(d==null)for(d=12;o.has(d);)d++;return o.add(d),{role:c.role,number:d,name:Fm(s.id,h),attrs:z_(c.role,n,i),keeping:Math.round(n+4+i.range(-3,3)),foot:i.next()<.78?"R":"L"}});if(e){let c=l.findIndex(u=>u.role===e.role),h=c>=0?c:l.findIndex(u=>u.role!=="GK");l[h]={role:e.role,number:e.number,name:e.name,attrs:{...e.attrs},foot:e.foot||"R",isHuman:!0,look:e.look}}return{name:s.name,short:s.short,tier:s.tier,style:s.style,formation:r,players:l,clubId:s.id}}function zs(){return{name:"A. Newcomer",number:9,nationality:"England",foot:"R",role:"ST",attrs:{pace:52,stamina:50,control:50,passing:48,finishing:54,tackling:42},look:{skin:"#e0b48c",hair:"#3b2a1e",boots:"#111111"}}}var Ba=2,od=["pace","stamina","control","passing","finishing","tackling"],Hm={pace:"Pace",stamina:"Stamina",control:"Ball control",passing:"Passing",finishing:"Finishing",tackling:"Tackling"},gs=s=>(Aa.find(t=>t.id===s)||{name:s}).name,F_={ST:{finishing:6,pace:3},W:{pace:6,control:3},AM:{passing:4,control:5},CM:{passing:5,stamina:4},DEF:{tackling:7,stamina:2}};function B_(s){let t={pace:47,stamina:47,control:46,passing:46,finishing:45,tackling:44};for(let[e,i]of Object.entries(F_[s]||{}))t[e]+=i;return t}var Gm={1:{avg:5.8,rep:0,apps:0},2:{avg:6.6,rep:10,apps:3},3:{avg:6.9,rep:28,apps:5},4:{avg:7.1,rep:48,apps:5},5:{avg:7.3,rep:68,apps:5}},Vm=[0,160,650,2600,11e3,42e3];function Wm(){return{apps:0,minutes:0,goals:0,assists:0,ratingSum:0,passCmp:0,passAtt:0,shots:0,shotsOn:0,tackles:0,interceptions:0,possLost:0,fouls:0,motm:0,wins:0,draws:0,losses:0,trophies:0}}function H_(s){let[t,e,i,n]=s,r=[[[t,e],[i,n]],[[i,t],[n,e]],[[t,n],[e,i]]],a=r.map(o=>o.map(([l,c])=>[c,l]));return[...r,...a]}function ld(s,t,e){let i=Qt(t),n=On(i.tier).map(l=>l.id),r=new Sn(wn(`${s.seed}:${e}:${i.tier}`));for(let l=n.length-1;l>0;l--){let c=Math.floor(r.next()*(l+1));[n[l],n[c]]=[n[c],n[l]]}let a=H_(n),o=[];return a.forEach((l,c)=>l.forEach(([h,u])=>o.push({round:c+1,home:h,away:u,score:null}))),{no:e,tier:i.tier,league:Wi(i.tier).league,fixtures:o,round:1,table:n.map(l=>({id:l,p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0})),finished:!1,final:null,placement:null}}function cd(s){return[...s.table].sort((t,e)=>e.pts-t.pts||e.gf-e.ga-(t.gf-t.ga)||e.gf-t.gf||t.id.localeCompare(e.id))}function $m(s,t,e,i){t.score=[e,i];let n=s.table.find(a=>a.id===t.home),r=s.table.find(a=>a.id===t.away);n.p++,r.p++,n.gf+=e,n.ga+=i,r.gf+=i,r.ga+=e,e>i?(n.w++,r.l++,n.pts+=3):e<i?(r.w++,n.l++,r.pts+=3):(n.d++,r.d++,n.pts++,r.pts++)}function Bm(s,t){let e=Math.exp(-t),i=0,n=1;do i++,n*=s.next();while(n>e&&i<10);return i-1}function Xm(s,t,e){let i=new Sn(wn(`${s.seed}:${t.no}:${t.tier}:${e.round}:${e.home}:${e.away}`)),n=za(Qt(e.home))+2.5,r=za(Qt(e.away)),a=Math.max(.3,1.35*Math.pow(n/r,1.6)),o=Math.max(.3,1.15*Math.pow(r/n,1.6));$m(t,e,Bm(i,a),Bm(i,o))}function hd(s){let t=s.season;return t.finished?t.final&&!t.final.played?{final:!0,...t.final}:null:t.fixtures.find(e=>e.round===t.round&&(e.home===s.clubId||e.away===s.clubId))||null}function qm(s,t=Date.now()%1e9|0){let e=new Sn(t),i=On(1),n=s.clubId?Qt(s.clubId):i[Math.floor(e.next()*i.length)],r={version:Ba,seed:t,createdAt:Date.now(),player:{name:s.name,number:s.number,nationality:s.nationality,foot:s.foot,role:s.role,look:{...s.look},attrs:B_(s.role),xp:0,points:0,level:1,reputation:5},clubId:n.id,contract:{clubId:n.id,wage:Vm[1],years:2,role:`Starting ${gs(s.role)}`,expectations:"Average rating 6.0+, learn the game",signedSeason:1},seasonNo:1,season:null,form:[],appsAtClub:0,totals:Wm(),seasons:[],matchLog:[],timeline:[],trophies:[],window:null,trainingAvailable:!0,committed:[],nextMatchId:1,earnings:0,flags:{}};return r.season=ld(r,n.id,1),Fs(r),bi(r,`Signed for ${n.name} (${Wi(1).league}) as ${gs(s.role)}`,"transfer"),r}function Fs(s){let t=s.seasons.find(e=>e.season===s.seasonNo&&e.clubId===s.clubId);return t||(t={season:s.seasonNo,clubId:s.clubId,tier:Qt(s.clubId).tier,...Wm(),placement:null},s.seasons.push(t)),t}function bi(s,t,e="info"){s.timeline.push({season:s.seasonNo,round:s.season?s.season.round:0,text:t,kind:e})}function Ym(s){let t=hd(s);return t?{id:`m${s.nextMatchId}`,fx:t,clubId:s.clubId}:null}function Km(s,t,e,i){if(s.committed.includes(t))return{duplicate:!0};s.committed.push(t),s.committed.length>200&&s.committed.splice(0,s.committed.length-200),s.nextMatchId++;let n=s.season,r=Qt(s.clubId),a=e.home===s.clubId,[o,l]=i.score,c=a?o:l,h=a?l:o,u=i.stats,d=i.rating,p={xp:0,levelUps:0,rep:0,notes:[]};if(e.final)n.final.played=!0,n.final.score=[o,l],n.final.won=c>h||c===h&&i.penaltyWin;else{let w=n.fixtures.find(b=>b.round===e.round&&b.home===e.home&&b.away===e.away);$m(n,w,o,l);for(let b of n.fixtures)b.round===e.round&&!b.score&&Xm(s,n,b);n.round++}let g=Fs(s);for(let w of[s.totals,g])w.apps++,w.minutes+=i.minutes,w.goals+=u.goals,w.assists+=u.assists,w.ratingSum+=d,w.passCmp+=u.passCmp,w.passAtt+=u.passAtt,w.shots+=u.shots,w.shotsOn+=u.shotsOn,w.tackles+=u.tacklesWon,w.interceptions+=u.interceptions,w.possLost+=u.possLost,w.fouls+=u.fouls,i.motm&&w.motm++,c>h?w.wins++:c<h?w.losses++:w.draws++;let x=a?e.away:e.home;s.matchLog.push({season:s.seasonNo,round:e.final?"F":e.round,clubId:s.clubId,opp:x,home:a,score:[c,h],rating:d,goals:u.goals,assists:u.assists,passCmp:u.passCmp,passAtt:u.passAtt,tackles:u.tacklesWon,interceptions:u.interceptions,keyPasses:u.keyPasses,shotsOn:u.shotsOn,tier:r.tier}),s.matchLog.length>400&&s.matchLog.shift(),s.form.push(d),s.form.length>10&&s.form.shift(),s.appsAtClub++;let f=s.totals;s.appsAtClub===1&&bi(s,`Debut for ${r.name} vs ${Qt(x).name} (rating ${d.toFixed(1)})`,"debut"),u.goals>0&&f.goals===u.goals&&bi(s,`First career goal, vs ${Qt(x).name}`,"goal"),u.assists>0&&f.assists===u.assists&&bi(s,`First career assist, vs ${Qt(x).name}`,"assist"),u.goals>=3&&bi(s,`Hat-trick vs ${Qt(x).name}!`,"goal"),i.motm&&f.motm===1&&bi(s,"First Player of the Match award","award");let m=(d-6.3)*2.5+(r.tier-1)*.8+u.goals*.6+u.assists*.4;s.player.reputation=Math.max(0,Math.min(100,s.player.reputation+m)),p.rep=m;let v=Math.round(30+Math.max(0,d-5.5)*25+u.goals*12+u.assists*8+(c>h?10:0));return p.levelUps=ud(s,v),p.xp=v,s.earnings+=s.contract.wage,s.trainingAvailable=!0,!e.final&&n.round===4&&!n.finished&&pd(s,"mid"),!e.final&&n.round>6&&G_(s),e.final&&V_(s),p}function ud(s,t){let e=s.player;e.xp+=t;let i=0;for(;e.xp>=100;)e.xp-=100,e.points++,e.level++,i++;return i}function dd(s){return s<60?3:s<75?2:1}function Zm(s,t){let e=s.player;return e.points<=0||!od.includes(t)||e.attrs[t]>=99?!1:(e.attrs[t]=Math.min(99,e.attrs[t]+dd(e.attrs[t])),e.points--,!0)}function G_(s){let t=s.season;t.finished=!0;let e=cd(t),i=e.findIndex(r=>r.id===s.clubId)+1;t.placement=i,Fs(s).placement=i;let n=Wi(t.tier).league;if(i===1){let r=`${n} champions (Season ${s.seasonNo})`;s.trophies.push({season:s.seasonNo,name:`${n} title`,clubId:s.clubId}),s.totals.trophies++,Fs(s).trophies++,bi(s,`Won the ${n} with ${Qt(s.clubId).name}!`,"trophy")}else bi(s,`Finished ${Ha(i)} in the ${n}`,"season");if(t.tier===5&&i<=2){let r=e[i===1?1:0].id;t.final={home:s.clubId,away:r,played:!1,name:"Continental Cup Final",round:"F"};return}pd(s,"end")}function V_(s){s.season.final.won?(s.trophies.push({season:s.seasonNo,name:"Continental Cup",clubId:s.clubId}),s.totals.trophies++,Fs(s).trophies++,bi(s,`Lifted the Continental Cup with ${Qt(s.clubId).name}!`,"trophy")):bi(s,"Runner-up in the Continental Cup Final","season"),pd(s,"end")}function Ha(s){return s+(["th","st","nd","rd"][(s%100-20)%10]||["th","st","nd","rd"][s%100]||"th")}function Jm(s,t=5){return s.matchLog.filter(e=>e.season>=s.seasonNo-1).slice(-t)}function W_(s,t){let e=s.player.role,i=Math.max(1,t.length),n=c=>t.reduce((h,u)=>h+(u[c]||0),0),r=n("passAtt"),a=n("passCmp"),o=r?a/r:0,l=(n("tackles")+n("interceptions"))/i;switch(e){case"ST":return{value:(n("goals")+.5*n("assists")+.15*n("shotsOn"))/i,label:"goal threat",unit:"goal involvements per match"};case"W":return{value:(n("goals")+n("assists")+.2*n("keyPasses"))/i,label:"goals and chance creation",unit:"contributions per match"};case"AM":return{value:(n("assists")+n("goals")+.3*n("keyPasses"))/i,label:"strong passing and chance creation",unit:"chances per match"};case"CM":return{value:o*.6+l*.12+.2*n("keyPasses")/i,label:"reliable passing and ball winning",unit:"index",acc:o,def:l};default:return{value:l*.22+o*.45,label:"defensive solidity and distribution",unit:"index",acc:o,def:l}}}var $_={ST:[.3,.42,.52,.6],W:[.3,.4,.5,.58],AM:[.32,.42,.52,.6],CM:[.55,.62,.68,.74],DEF:[.62,.7,.78,.86]};function X_(s,t){let e=Gm[t.tier],i=Jm(s,5),n=i.length?i.reduce((f,m)=>f+m.rating,0)/i.length:0,r=s.player.reputation,a=W_(s,i),o=$_[s.player.role][Math.max(0,t.tier-2)]??.5,l=i.length<3?0:Math.max(0,Math.min(1,(n-(e.avg-1.2))/1.2)),c=e.rep?Math.min(1,r/e.rep):1,h=Math.min(1,a.value/o),u=Math.min(1,s.appsAtClub/Math.max(1,e.apps)),d=q_(s,t),p=d?.45*l+.25*h+.2*c+.1*u:.15*c,g=d&&i.length>=3&&n>=e.avg&&r>=e.rep&&h>=.85&&s.appsAtClub>=e.apps,x=d?`Average rating ${e.avg.toFixed(1)} over 5 matches (you: ${i.length?n.toFixed(2):"-"}); reputation ${e.rep}+ (you: ${Math.round(r)}); ${a.label}; ${e.apps}+ appearances for your current club (you: ${s.appsAtClub}).`:`No ${gs(s.player.role).toLowerCase()} role available at the moment.`;return{club:t,score:p,qualifies:g,avg:n,rep:r,needs:d,text:x,contrib:a,conS:h}}function q_(s,t){let e=Math.floor(s.seasonNo*2+(s.season.round>3?1:0));return wn(`${s.seed}:${t.id}:${s.player.role}:${e}`)%5!==0}function fd(s){let t=Qt(s.clubId).tier;return(t<5?On(t+1):[]).map(i=>X_(s,i)).sort((i,n)=>n.score-i.score)}function ad(s,t){return Math.round(Vm[s]*(.9+Math.max(0,t-6.5)*.25)/10)*10}function pd(s,t){let e=[],i=Qt(s.clubId);for(let n of fd(s)){if(!n.qualifies)continue;let r=[`Recent form: average ${n.avg.toFixed(2)} over the last 5 matches`,`Reputation ${Math.round(n.rep)}`],a=n.contrib;a.acc!=null?r.push(`${a.label} (pass accuracy ${Math.round(a.acc*100)}%, ${a.def.toFixed(1)} tackles + interceptions per match)`):r.push(`${a.label}: ${a.value.toFixed(2)} ${a.unit}`),e.push({clubId:n.club.id,tier:n.club.tier,role:`Starting ${gs(s.player.role)}`,wage:ad(n.club.tier,n.avg),years:2+wn(n.club.id+s.seasonNo)%2,expectations:`Average rating ${(Gm[n.club.tier].avg-.2).toFixed(1)}+ and ${a.label}`,reasons:r,kind:"transfer"})}if(e.sort((n,r)=>r.wage-n.wage),e.splice(3),t==="end"){let n=s.contract.years<=1,r=Jm(s,5),a=r.length?r.reduce((o,l)=>o+l.rating,0)/r.length:6;if(n&&(e.push({clubId:i.id,tier:i.tier,role:`Starting ${gs(s.player.role)}`,wage:ad(i.tier,a),years:2,expectations:"Keep your place in the side",reasons:["Contract renewal offer"],kind:"renewal"}),a<6.2&&i.tier>1)){let o=On(i.tier-1)[wn(s.seed+":"+s.seasonNo)%4];e.push({clubId:o.id,tier:o.tier,role:`Starting ${gs(s.player.role)}`,wage:ad(o.tier,a),years:2,expectations:"Rebuild your form with regular football",reasons:["Guaranteed starting place"],kind:"transfer"})}}return s.window={type:t,offers:e,season:s.seasonNo,round:s.season.round},e.length&&bi(s,`${t==="end"?"Season-end":"Mid-season"} window: ${e.length} offer${e.length>1?"s":""}`,"window"),s.window}function jm(s,t){let e=s.window;if(!e)return!1;let i=e.offers[t];if(!i)return!1;let n=Qt(i.clubId);if(i.kind==="renewal")return s.contract={clubId:n.id,wage:i.wage,years:i.years+1,role:i.role,expectations:i.expectations,signedSeason:s.seasonNo},bi(s,`Signed a new ${i.years}-season contract with ${n.name}`,"contract"),s.window=null,!0;let r=Qt(s.clubId);if(s.clubId=n.id,s.contract={clubId:n.id,wage:i.wage,years:i.years+(e.type==="end"?1:0),role:i.role,expectations:i.expectations,signedSeason:s.seasonNo},s.appsAtClub=0,bi(s,`Transferred from ${r.name} to ${n.name} (${Wi(n.tier).league})`,"transfer"),s.window=null,e.type==="mid"){let a=ld(s,n.id,s.seasonNo),o=s.season.round-1;for(let l of a.fixtures)l.round<=o&&Xm(s,a,l);a.round=o+1,s.season=a,Fs(s)}return!0}function Qm(s){if(!s.window)return;let e=s.window.offers.some(i=>i.kind==="renewal");s.window=null,e&&s.contract.years<=1&&(s.contract.years=2,bi(s,`Stayed at ${Qt(s.clubId).name} on a rolling contract`,"contract"))}function t0(s){let t=s.season;return t.finished&&(!t.final||t.final.played)&&!s.window}function e0(s){s.seasonNo++,s.contract.years=Math.max(0,s.contract.years-1),s.season=ld(s,s.clubId,s.seasonNo),Fs(s),s.trainingAvailable=!0,bi(s,`Season ${s.seasonNo} begins with ${Qt(s.clubId).name}`,"season")}function i0(s){return s.apps?s.ratingSum/s.apps:0}var Hc={passing:{name:"Passing Gates",time:45,desc:"Pass through the highlighted gate to the teammate behind it. Each clean pass through a gate scores."},finishing:{name:"Finishing",time:50,desc:"Balls are served into the box. Finish past the goalkeeper - first-time finishes are encouraged."},dribbling:{name:"Dribbling Course",time:60,desc:"Dribble the ball through every gate in order, as fast as you can."},practice:{name:"Free Practice",time:0,desc:"Receive, pass, move and shoot with a teammate against a defender and a goalkeeper. No timer, no XP."}};function n0(s,t,e,i,n,r,a,o){let l=(e-s)*(r-t)-(i-t)*(n-s),c=(e-s)*(o-t)-(i-t)*(a-s),h=(a-n)*(t-r)-(o-r)*(s-n),u=(a-n)*(i-r)-(o-r)*(e-n);return l*c<0&&h*u<0}function Un(s,t,e,i,n={}){return{role:s,number:t,name:e,attrs:i||{pace:55,stamina:70,control:60,passing:60,finishing:50,tackling:50},keeping:55,foot:"R",...n}}var Bc=class{constructor(t,e){this.kind=t,this.def=Hc[t],this.human=e,this.score=0,this.t=0,this.done=!1,this.events=[],this.props=null}matchConfig(){let t={...this.human,isHuman:!0,name:this.human.name,attrs:{...this.human.attrs}},e,i;switch(this.kind){case"passing":t.role="CM",e=[t,Un("W",11,"Station A"),Un("W",7,"Station B"),Un("ST",9,"Station C"),Un("AM",10,"Station D")],i=[];break;case"finishing":t.role="ST",e=[t,Un("CM",8,"Coach")],i=[Un("GK",1,"Keeper",null)];break;case"dribbling":t.role="W",e=[t],i=[];break;default:e=[t,Un("CM",8,"Teammate")],i=[Un("DEF",4,"Defender",{pace:50,stamina:70,control:45,passing:45,finishing:40,tackling:52}),Un("GK",1,"Keeper")]}let n=(r,a)=>({name:r,short:r.slice(0,3).toUpperCase(),tier:1,style:"wing",players:a});return{seed:7+Math.floor(Math.random()*1e3),halfLength:1e6,difficulty:"assisted",rules:!1,mode:"drill",teams:[n("Training",e),i.length?n("Opposition",i):null]}}setup(t,e){this.m=t,this.view=e,t.phase="playing",t.clock=0;let i=t.human;this.h=i;for(let r of t.players)r.scripted=!r.isHuman&&!r.isGK&&this.kind!=="practice";let n=new Oe;if(this.kind==="passing"){this.center=new at(-4,0,0),i.pos.copy(this.center);let r=[[10,9],[10,-9],[-12,11],[-12,-11]];this.stations=[];let a=t.teams[0].players.filter(o=>!o.isHuman);r.forEach(([o,l],c)=>{let h=a[c];h.pos.set(this.center.x+o,0,this.center.z+l),h.home={station:h.pos.clone()};let u=this.center.x+o*.5,d=this.center.z+l*.5,p=Math.hypot(o,l),g=-l/p,x=o/p,f={p:h,a:new at(u+g*1.1,0,d+x*1.1),b:new at(u-g*1.1,0,d-x*1.1),c:new at(u,0,d)};this.stations.push(f),n.cone(I.CONE,.16,.42,10,f.a.x,.21,f.a.z),n.cone(I.CONE,.16,.42,10,f.b.x,.21,f.b.z)}),this.active=0,this.pickActive(),this.resetBall()}else if(this.kind==="finishing")i.pos.set(Z.HL-15,0,0),this.server=t.teams[0].players.find(r=>!r.isHuman),this.served=0,this.maxBalls=8,this.serve();else if(this.kind==="dribbling"){this.gates=[],[-20,-14,-8,-2,4,10,16,22].forEach((o,l)=>{let c=l%2?-4:4,h={a:new at(o,0,c-1.25),b:new at(o,0,c+1.25),c:new at(o,0,c)};this.gates.push(h),n.cone(I.CONE,.16,.42,10,h.a.x,.21,h.a.z),n.cone(I.CONE,.16,.42,10,h.b.x,.21,h.b.z),n.box(I.TARGET,.05,.05,2.5,o,.6,c)});let a={a:new at(27,0,-3),b:new at(27,0,3),c:new at(27,0,0),finish:!0};this.gates.push(a);for(let o=-3;o<=3;o+=1.5)n.cone(I.TARGET,.14,.36,10,27,.18,o);i.pos.set(-27,0,0),i.yaw=Math.PI/2,t.ball.place(-26.2,0),t.ball.state="free",this.next=0,this.started=!1}else i.pos.set(-6,0,0),i.yaw=Math.PI/2,t.teams[0].players.find(a=>!a.isHuman).pos.set(4,0,10),t.teams[1].players.find(a=>!a.isGK).pos.set(14,0,0),t.keeper(1).pos.set(Z.HL-1,0,0),this.resetBall(!0);for(let r of t.players)r.prevPos.copy(r.pos),r.isHuman||(r.yaw=Bt(i.pos.x-r.pos.x,i.pos.z-r.pos.z)),r.prevYaw=r.yaw;if(i.yaw||(i.yaw=Math.PI/2),t.events.emit("humanYaw",{yaw:this.kind==="passing"?Bt(this.stations[this.active].c.x-i.pos.x,this.stations[this.active].c.z-i.pos.z):Math.PI/2}),n.vcount){this.props=new ei,this.props.add(new se(n.buildSolid(),vn({})));let r=new se(n.buildEdges(),en({}));r.frustumCulled=!1,this.props.add(r),e.scene.add(this.props)}t.preStep=r=>this.preStep(r)}dispose(){this.props&&(this.view.scene.remove(this.props),this.props.traverse(t=>t.geometry&&t.geometry.dispose())),this.m&&(this.m.preStep=null)}resetBall(t=!1){let e=this.m,i=this.h,n=i.yaw;e.ball.place(i.pos.x+Math.sin(n)*.7,i.pos.z+Math.cos(n)*.7),e.ball.state="free",e.ball.owner=null,e.ball.lastKick=null,this.lastKickSeen=null,this.gateOk=!1,this.resetAt=null,t&&(e.passIntent=null)}pickActive(){let t=this.active;for(;t===this.active;)t=Math.floor(Math.random()*this.stations.length);this.active=t}serve(){let t=this.m,e=this.server,i=this.h,n=Math.random()<.5?1:-1;e.pos.set(Z.HL-9-Math.random()*6,0,n*(13+Math.random()*3)),e.prevPos.copy(e.pos),e.vel.set(0,0,0),e.yaw=Bt(i.pos.x-e.pos.x,i.pos.z-e.pos.z),t.ball.place(e.pos.x+Math.sin(e.yaw)*.6,e.pos.z+Math.cos(e.yaw)*.6),t.ball.state="free",t.ball.owner=null,t.ball.lastKick=null,this.serveAt=t.time+.9,this.shotAt=null,this.resetAt=null,this.served++,this.ballDone=!1}preStep(t){let e=this.m,i=this.h,n=e.ball,r=e.time;if(this.kind==="passing")for(let a of this.stations){let o=a.p,l=o.home.station,c=o.pos.distXZ(l);if(n.owner===o)o.desired.set(0,0,0),o.faceYaw=Bt(i.pos.x-o.pos.x,i.pos.z-o.pos.z),!o.action&&r-(o.gotAt||r)>.55&&ce(e,o,"pass",{target:i,ai:!0});else{o.gotAt=r;let h=n.pos.distXZ(o.pos);if(!n.owner&&h<4&&n.speed<12){let u=n.pos.x-o.pos.x,d=n.pos.z-o.pos.z;o.desired.set(u*2,0,d*2)}else c>.3?o.desired.set((l.x-o.pos.x)*2.5,0,(l.z-o.pos.z)*2.5):o.desired.set(0,0,0);o.faceYaw=Bt(n.pos.x-o.pos.x,n.pos.z-o.pos.z)}}else if(this.kind==="finishing"){let a=this.server;if(a.desired.set(0,0,0),a.faceYaw=Bt(i.pos.x-a.pos.x,i.pos.z-a.pos.z),this.serveAt&&r>=this.serveAt&&!a.action){this.serveAt=null;let o=Math.random()<.3,l=new at(i.pos.x+(Math.random()-.5)*2,0,i.pos.z+(Math.random()-.5)*2);o?ce(e,a,"cross",{point:l,ai:!0,elev:.35}):ce(e,a,"pass",{target:i,ai:!0})}}}step(){let t=this.m,e=this.h,i=t.ball,n=t.time;if(this.done)return;this.t+=1/120;let r=this.def.time;if(this.kind==="passing"){let a=i.lastKick;a&&a!==this.lastKickSeen&&(this.lastKickSeen=a,a.player===e&&(this.gateOk=!1,this.passTarget=this.stations[this.active]));let o=this.stations[this.active];a&&a.player===e&&n0(i.prevPos.x,i.prevPos.z,i.pos.x,i.pos.z,o.a.x,o.a.z,o.b.x,o.b.z)&&(this.gateOk=!0),i.owner&&i.owner!==e&&a&&a.player===e&&!this.resolved&&(this.resolved=!0,i.owner===o.p&&this.gateOk?(this.score++,this.note("GATE +1","good"),this.pickActive()):this.note(i.owner===o.p?"MISSED THE GATE":"WRONG TEAMMATE","bad")),i.owner===e&&(this.resolved=!1),!i.owner&&(i.pos.distXZ(this.center)>26||i.speed<.2&&i.pos.distXZ(e.pos)>3&&!this.stations.some(l=>l.p.pos.distXZ(i.pos)<3))&&(this.resetAt||(this.resetAt=n+.8),n>=this.resetAt&&this.resetBall()),this.view.markers.showIncoming(o.c.x,o.c.z)}else if(this.kind==="finishing"){let a=i.lastKick;a&&a.player===e&&a.kind==="shot"&&!this.shotAt&&(this.shotAt=n);let o=i.pos.x-me>Z.HL&&i.crossing[0]&&i.crossing[0].inMouth;if(this.ballDone||(o?(this.score++,this.ballDone=!0,this.note(a&&a.firstTime?"FIRST-TIME GOAL!":"GOAL","good"),this.resetAt=n+1.4,t.events.emit("drillGoal",{pos:i.pos.clone()})):i.state==="held"?(this.ballDone=!0,this.note("SAVED","bad"),this.resetAt=n+1):i.pos.x-me>Z.HL||Math.abs(i.pos.z)>Z.HW||this.shotAt&&n-this.shotAt>3.2?(this.ballDone=!0,this.note("MISSED","bad"),this.resetAt=n+.9):!this.shotAt&&this.serveAt==null&&i.speed<.3&&!i.owner&&n>6&&i.pos.distXZ(e.pos)>6&&(this.ballDone=!0,this.resetAt=n+.5)),this.resetAt&&n>=this.resetAt){t.keeper(1).hold&&(t.keeper(1).hold=null);let l=t.keeper(1);l.action=null,l.pos.set(Z.HL-1,0,0),this.served>=this.maxBalls?this.finish():this.serve()}}else if(this.kind==="dribbling"){!this.started&&(e.speed>.5||i.owner===e)&&(this.started=!0,this.t=0),this.started||(this.t=0);let a=this.gates[this.next];a&&n0(i.prevPos.x,i.prevPos.z,i.pos.x,i.pos.z,a.a.x,a.a.z,a.b.x,a.b.z)&&i.lastTouch===e&&(this.next++,this.score=this.next,a.finish?(this.note(`FINISHED ${this.t.toFixed(1)} s`,"good"),this.finish()):this.note(`GATE ${this.next}/${this.gates.length-1}`,"good")),a&&this.view.markers.showIncoming(a.c.x,a.c.z),!i.owner&&i.speed<.2&&i.pos.distXZ(e.pos)>6?(this.resetAt||(this.resetAt=n+1),n>this.resetAt&&this.resetBall()):i.owner&&(this.resetAt=null)}else{let a=Math.abs(i.pos.z)-me>Z.HW||Math.abs(i.pos.x)-me>Z.HL,o=i.pos.x-me>Z.HL&&i.crossing[0]&&i.crossing[0].inMouth;if((a||i.state==="held")&&!this.resetAt&&(o&&(this.score++,this.note("GOAL","good"),t.events.emit("drillGoal",{pos:i.pos.clone()})),this.resetAt=n+(i.state==="held"?1.2:1.5)),this.resetAt&&n>=this.resetAt){let l=t.keeper(1);l.hold=null,l.action=null,l.pos.set(Z.HL-1,0,0),this.resetBall(!0)}}r&&this.t>=r&&this.finish()}note(t,e){this.events.push({text:t,kind:e})}finish(){this.done||(this.done=!0,this.m.phase="fulltime",this.m.phaseT=0)}clockText(){if(!this.def.time)return`Goals ${this.score}`;let t=Math.max(0,this.def.time-this.t);return this.kind==="dribbling"?`${this.t.toFixed(1)} s \xB7 gate ${Math.min(this.next+1,this.gates.length)}/${this.gates.length}`:this.kind==="finishing"?`${Math.ceil(t)} s \xB7 goals ${this.score} \xB7 ball ${Math.min(this.served,this.maxBalls)}/${this.maxBalls}`:`${Math.ceil(t)} s \xB7 gates ${this.score}`}result(){let t=0,e="";if(this.kind==="passing")t=ht(Math.round(8+this.score*2.5),8,35),e=`${this.score} gate passes in ${this.def.time} s`;else if(this.kind==="finishing")t=ht(Math.round(8+this.score*4),8,35),e=`${this.score} goals from ${this.maxBalls} balls`;else if(this.kind==="dribbling"){let i=this.next>=this.gates.length;t=i?ht(Math.round(45-this.t),12,35):ht(4+this.next*2,4,18),e=i?`Course completed in ${this.t.toFixed(1)} s`:`${this.next} of ${this.gates.length} gates in the time limit`}return{xp:t,text:e,score:this.score}}};var s0=120,a0="firsttouch.tutorial";function o0(){try{return!!di.getItem(a0)}catch{return!1}}function gd(s){try{di.setItem(a0,s)}catch{}}var Ga=[{id:"look",par:6,cap:12,say:"Find the golden star",hint:["Move the mouse","Drag on the right"]},{id:"move",par:7,cap:12,say:"Run to the glowing circle",hint:["W A S D","Drag with the left thumb"]},{id:"sprint",par:5,cap:10,say:"Sprint to the next circle",hint:["Hold Shift","Push the stick all the way"]},{id:"ball",par:5,cap:10,say:"Run into the ball",hint:["",""]},{id:"dribble",par:7,cap:14,say:"Dribble through the gate",hint:["",""]},{id:"pass",par:6,cap:12,say:"Pass to Jojo",hint:["Look at him, right-click","Look at him, tap PASS"]},{id:"receive",par:4,cap:8,say:"Let it come to your feet",hint:["",""]},{id:"shoot",par:8,cap:20,say:"Score past Sam!",hint:["Hold left click, release","Hold SHOOT, release"]},{id:"tackle",par:6,cap:14,say:"Win the ball back!",hint:["Get close, press E","Get close, tap TACKLE"]}],r0=["Nice!","Lovely!","Class!","Sharp!","Easy!"],Y_=[[9,"Superstar"],[7,"Starting XI"],[4,"Squad player"],[0,"Future legend"]];function K_(s,t,e,i,n,r,a,o){let l=(e-s)*(r-t)-(i-t)*(n-s),c=(e-s)*(o-t)-(i-t)*(a-s),h=(a-n)*(t-r)-(o-r)*(s-n),u=(a-n)*(i-r)-(o-r)*(e-n);return l*c<0&&h*u<0}var Fr=(s,t=2)=>(s.x=ht(s.x,-Z.HL+t,Z.HL-t),s.z=ht(s.z,-Z.HW+t,Z.HW-t),s);function md(s,t,e,i,n={}){return{role:s,number:t,name:e,attrs:i,keeping:55,foot:"R",...n}}var Gc=class{constructor(t){this.kind="tutorial",this.human=t,this.def={name:"Warm-up with Coach Ada",time:s0},this.t=0,this.done=!1,this.timeUp=!1,this.events=[],this.idx=-1,this.stepT=0,this.stars=0,this.results=[],this.say="",this.waitUntil=null,this.endAt=null}matchConfig(){let e=[{...this.human,isHuman:!0,role:"CM",attrs:{...this.human.attrs}},md("CM",8,"Jojo",{pace:55,stamina:80,control:70,passing:72,finishing:50,tackling:50})],i=[md("DEF",5,"Big Barry",{pace:34,stamina:60,control:22,passing:30,finishing:20,tackling:20}),md("GK",1,"Sleepy Sam",{pace:40,stamina:60,control:40,passing:40,finishing:20,tackling:20},{keeping:8})],n=(r,a)=>({name:r,short:r.slice(0,3).toUpperCase(),tier:1,style:"wing",players:a});return{seed:4242,halfLength:1e6,difficulty:"assisted",rules:!1,mode:"tutorial",teams:[n("Training",e),n("Coaches",i)]}}setup(t,e){this.m=t,this.view=e,t.phase="playing",t.clock=0,t.foul=()=>this.note("Careful, that's a foul!","bad"),t.checkDeadlock=()=>{};let i=this.h=t.human;this.jojo=t.teams[0].players.find(n=>!n.isHuman),this.barry=t.teams[1].players.find(n=>!n.isGK),this.sam=t.keeper(1),this.jojo.scripted=!0,this.barry.scripted=!0,t.aiParams[1]&&(t.aiParams[1].gkReaction=.8),i.pos.set(-8,0,0),i.yaw=Math.PI/2,this.jojo.pos.set(-4,0,9),this.barry.pos.set(-29,0,-18),this.sam.pos.set(Z.HL-1,0,0),this.sam.yaw=-Math.PI/2,this.parkBall();for(let n of t.players)n!==i&&n!==this.sam&&(n.yaw=Bt(i.pos.x-n.pos.x,i.pos.z-n.pos.z)),n.prevPos.copy(n.pos),n.prevYaw=n.yaw;this.buildProps(e),t.preStep=n=>this.preStep(n),t.events.emit("humanYaw",{yaw:i.yaw}),this.next()}buildProps(t){let e=c=>{let h=new ei;h.add(new se(c.buildSolid(),vn({})));let u=new se(c.buildEdges(),en({}));return u.frustumCulled=!1,h.add(u),h.visible=!1,h},i=new Oe;i.cone(I.GOLD,.42,.55,5,0,.275,0),i.cone(I.GOLD,.42,.55,5,0,-.275,0,{rx:Math.PI}),this.star=e(i);let n=new Oe;n.cone(I.CONE,.18,.5,10,0,.25,-1.3),n.cone(I.CONE,.18,.5,10,0,.25,1.3),n.box(I.TARGET,.06,.06,2.6,0,.75,0),this.gate=e(n);let r=new ei,a=new Jn(.95,1.25,40);a.rotateX(-Math.PI/2);let o=new se(a,Ls(I.MARKER,.85));o.position.y=.04,o.renderOrder=3;let l=new se(new Kn(.1,.1,6,10,1,!0),Ls(I.GOLD,.45));l.position.y=3,r.add(o,l),r.visible=!1,this.ring=r,this.props=new ei,this.props.add(this.star,this.gate,this.ring),t.scene.add(this.props)}dispose(){this.props&&(this.view.scene.remove(this.props),this.props.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()})),this.m&&(this.m.preStep=null)}note(t,e=""){this.events.push({type:"note",text:t,kind:e})}fx(t,e={}){this.events.push({type:t,...e})}get current(){return Ga[this.idx]||null}get index(){return Math.max(0,Math.min(this.idx,Ga.length-1))}parkBall(){let t=this.m.ball;t.place(-27,17),t.state="free",t.owner=null,t.lastKick=null}ballAtFeet(){let t=this.m,e=this.h,i=t.ball;i.owner&&i.owner!==e&&t.loseControl("loose"),i.place(e.pos.x+Math.sin(e.yaw)*.55,e.pos.z+Math.cos(e.yaw)*.55),i.state="free",i.owner=null,i.lastKick=null}dirToGoal(t){let e=Z.HL-t.x,i=-t.z,n=Math.hypot(e,i)||1;return{x:e/n,z:i/n}}showRing(t){this.ring.visible=!0,this.ring.position.set(t.x,0,t.z),this.target=t}resetKeeper(){let t=this.sam;t.hold=null,t.action=null,t.vel.set(0,0,0),t.pos.set(Z.HL-1,0,0),t.prevPos.copy(t.pos),t.yaw=-Math.PI/2}next(){this.idx++,this.stepT=0,this.ring.visible=!1,this.star.visible=!1,this.gate.visible=!1;let t=this.current;if(!t){this.say="Ready for the pitch!",this.endAt=this.t+1.8,this.fx("finale");return}this.say=t.say,this.enter(t.id),this.fx("step",{index:this.idx})}enter(t){let e=this.m,i=this.h,n=e.ball;switch(this.misses=0,this.resetAt=null,t){case"look":{let r=i.yaw+1,a=Fr(new at(i.pos.x+Math.sin(r)*9,0,i.pos.z+Math.cos(r)*9));this.star.position.set(a.x,2.3,a.z),this.star.visible=!0;break}case"move":this.showRing(Fr(new at(i.pos.x+6,0,i.pos.z+4)));break;case"sprint":this.sprinted=!1,this.showRing(Fr(new at(i.pos.x+12,0,i.pos.z-6)));break;case"ball":{let r=this.dirToGoal(i.pos);n.place(i.pos.x+r.x*3.5,i.pos.z+r.z*3.5),n.state="free",n.owner=null,n.lastKick=null;break}case"dribble":{let r=this.dirToGoal(i.pos),a=Fr(new at(i.pos.x+r.x*6.5,0,i.pos.z+r.z*6.5+2.2),10),o=a.x-i.pos.x,l=a.z-i.pos.z,c=Math.hypot(o,l)||1,h=-l/c,u=o/c;this.gateLine={ax:a.x+h*1.3,az:a.z+u*1.3,bx:a.x-h*1.3,bz:a.z-u*1.3},this.gate.position.set(a.x,0,a.z),this.gate.rotation.y=Bt(o,l)+Math.PI/2,this.gate.visible=!0;let d=a.z>0?-1:1;this.jojoSpot=Fr(new at(a.x-1,0,a.z+d*11),3);break}case"pass":break;case"receive":{let r=this.jojo,a=e.passIntent&&e.passIntent.target===i&&!n.owner;n.owner!==r&&!a&&(n.owner&&e.loseControl("loose"),n.place(r.pos.x+Math.sin(r.yaw)*.6,r.pos.z+Math.cos(r.yaw)*.6),n.state="free",n.owner=null);break}case"shoot":{this.resetKeeper(),(Math.hypot(Z.HL-i.pos.x,i.pos.z)>20||Math.abs(i.pos.z)>12)&&(this.fx("fade"),i.pos.set(Z.HL-13,0,ht(i.pos.z,-5,5)),i.prevPos.copy(i.pos),i.vel.set(0,0,0),i.yaw=Bt(Z.HL-i.pos.x,-i.pos.z),e.events.emit("humanYaw",{yaw:i.yaw})),n.owner!==i&&this.ballAtFeet(),this.shotAt=null;break}case"tackle":{this.fx("fade"),this.resetKeeper(),n.owner&&e.loseControl("loose");let r=-i.pos.x,a=-i.pos.z,o=Math.hypot(r,a)||1,l=Fr(new at(i.pos.x+r/o*7,0,i.pos.z+a/o*7),4),c=this.barry;c.pos.copy(l),c.prevPos.copy(l),c.vel.set(0,0,0),c.yaw=Bt(i.pos.x-l.x,i.pos.z-l.z),c.prevYaw=c.yaw,n.place(l.x+Math.sin(c.yaw)*.55,l.z+Math.cos(c.yaw)*.55),n.state="free",n.owner=null,n.lastKick=null,i.vel.set(0,0,0),i.yaw=Bt(l.x-i.pos.x,l.z-i.pos.z),e.events.emit("humanYaw",{yaw:i.yaw}),this.tackled=!1;break}}}complete(t,e){let i=this.current,n=t&&this.stepT<=i.par;n&&this.stars++,this.results.push({id:i.id,ok:t,star:n,t:this.stepT});let r=this.target&&this.ring.visible?this.target:this.h.pos;this.fx("done",{ok:t,star:n,x:r.x,z:r.z,big:i.id==="shoot"&&t}),this.say=t?`${e||r0[this.idx%r0.length]}${n?" \u2605":""}`:"Keep going!",this.waitUntil=this.t+(i.id==="shoot"&&t?1.6:.9)}preStep(){let t=this.m,e=this.h,i=t.ball,n=t.time,r=this.jojo,a=this.barry;if(i.owner===r)r.desired.set(0,0,0),r.faceYaw=Bt(e.pos.x-r.pos.x,e.pos.z-r.pos.z),!r.action&&n-(r.gotAt||n)>.7&&ce(t,r,"pass",{target:e,ai:!0});else{r.gotAt=n;let o=this.jojoSpot,l=i.pos.distXZ(r.pos);if(!i.owner&&l<5&&i.speed<13&&i.lastKick&&i.lastKick.player===e)r.desired.set((i.pos.x-r.pos.x)*2.5,0,(i.pos.z-r.pos.z)*2.5);else if(o&&r.pos.distXZ(o)>.4){let c=o.x-r.pos.x,h=o.z-r.pos.z,u=Math.hypot(c,h),d=Math.min(r.jogSpeed(),u*2);r.desired.set(c/u*d,0,h/u*d)}else r.desired.set(0,0,0);r.faceYaw=Bt(e.pos.x-r.pos.x,e.pos.z-r.pos.z)}if(this.current&&this.current.id==="tackle")if(i.owner===a){let o=e.pos.x-a.pos.x,l=e.pos.z-a.pos.z,c=Math.hypot(o,l)||1,h=c>2?1.4:0;a.desired.set(o/c*h,0,l/c*h),a.faceYaw=Bt(o,l)}else!i.owner&&i.pos.distXZ(a.pos)<3&&this.stepT<1.5?a.desired.set((i.pos.x-a.pos.x)*2,0,(i.pos.z-a.pos.z)*2):a.desired.set(0,0,0);else a.desired.set(0,0,0),a.faceYaw=Bt(e.pos.x-a.pos.x,e.pos.z-a.pos.z)}step(){if(this.done)return;let t=1/120,e=this.m,i=this.h,n=e.ball,r=e.time;if(this.t+=t,this.animate(),this.t>=s0){this.timeUp=!0,this.say="Time's up. Good effort!",this.finish();return}if(this.endAt!=null){this.t>=this.endAt&&this.finish();return}if(this.waitUntil!=null){this.t>=this.waitUntil&&(this.waitUntil=null,this.next());return}let a=this.current;switch(this.stepT+=t,a.id){case"look":{let o=e.humanCtl?e.humanCtl.input:{yaw:i.yaw,pitch:0},l=Math.cos(o.pitch),c=Math.sin(o.yaw)*l,h=Math.sin(o.pitch),u=Math.cos(o.yaw)*l,d=this.star.position.x-i.pos.x,p=this.star.position.y-1.65,g=this.star.position.z-i.pos.z,x=Math.hypot(d,p,g)||1;(c*d+h*p+u*g)/x>Math.cos(.2)&&(this.fx("star",{x:this.star.position.x,y:this.star.position.y,z:this.star.position.z}),this.complete(!0,"Found it!"));break}case"move":case"sprint":i.sprint&&(this.sprinted=!0),i.pos.distXZ(this.target)<(a.id==="move"?1.3:1.6)&&this.complete(!0,a.id==="sprint"&&this.sprinted?"Rapid!":"Made it!");break;case"ball":n.owner===i&&this.complete(!0,"Got it!");break;case"dribble":{let o=this.gateLine;if((n.owner===i||n.lastTouch===i)&&K_(n.prevPos.x,n.prevPos.z,n.pos.x,n.pos.z,o.ax,o.az,o.bx,o.bz)){this.complete(!0,"Silky!");break}this.recoverBall();break}case"pass":{let o=n.lastKick;if(n.owner===this.jojo&&o&&o.player===i){this.complete(!0,"Perfect pass!");break}n.owner===this.jojo&&(this.jojo.gotAt=r),this.recoverBall(o&&o.player===i?"Aim at Jojo":null);break}case"receive":if(n.owner===i){this.complete(!0,"Lovely first touch!");break}!n.owner&&n.speed<.3&&n.pos.distXZ(i.pos)>4&&n.pos.distXZ(this.jojo.pos)>3&&this.ballAtFeet();break;case"shoot":{let o=n.lastKick;if(o&&o.player===i&&o.kind==="shot"&&!this.shotAt&&(this.shotAt=r),n.pos.x-me>Z.HL&&n.crossing[0]&&n.crossing[0].inMouth&&!this.resetAt){this.fx("goal",{x:n.pos.x,z:n.pos.z}),this.complete(!0,"GOAL! Top bins!");break}!this.resetAt&&this.shotAt&&(n.pos.x-me>Z.HL||Math.abs(n.pos.z)>Z.HW||n.state==="held"||r-this.shotAt>3)&&(this.resetAt=r+1.1,this.note(n.state==="held"?"Saved! Again!":"So close! Again!","bad")),this.resetAt&&r>=this.resetAt&&(this.resetAt=null,this.shotAt=null,this.resetKeeper(),this.ballAtFeet());break}case"tackle":{i.action&&i.action.type==="tackle"&&(this.tackled=!0),n.owner===i&&this.complete(!0,this.tackled?"What a tackle!":"Got it back!");break}}this.waitUntil==null&&this.stepT>=a.cap&&this.timeout(a.id)}recoverBall(t){let e=this.m,i=this.h,n=e.ball,r=e.time;if(!(!n.owner&&n.speed<.4&&n.pos.distXZ(i.pos)>3.5&&n.pos.distXZ(this.jojo.pos)>2.5)){this.resetAt=null;return}this.resetAt==null?(this.resetAt=r+1.2,t&&this.note(t,"bad")):r>=this.resetAt&&(this.resetAt=null,this.ballAtFeet())}timeout(t){t==="ball"&&this.m.ball.owner!==this.h&&this.ballAtFeet(),this.complete(!1)}animate(){let t=this.t;if(this.star.visible&&(this.star.rotation.y=t*2.2,this.star.position.y=2.3+Math.sin(t*3)*.18),this.ring.visible){let e=1+.08*Math.sin(t*6);this.ring.children[0].scale.set(e,1,e)}}finish(){this.done||(this.done=!0,this.star.visible=!1,this.ring.visible=!1,this.gate.visible=!1,this.m.phase="fulltime",this.m.phaseT=1.5)}clockText(){return""}objective(t){let e=this.current,i=this.m.ball,n=this.h;if(!e||this.waitUntil!=null||this.endAt!=null)return null;let r=i.owner===n;switch(e.id){case"look":return t.set(this.star.position.x,this.star.position.y,this.star.position.z);case"move":case"sprint":return t.set(this.target.x,.8,this.target.z);case"dribble":return r?t.set(this.gate.position.x,.5,this.gate.position.z):t.set(i.pos.x,i.pos.y,i.pos.z);case"pass":return r?t.set(this.jojo.pos.x,1.2,this.jojo.pos.z):t.set(i.pos.x,i.pos.y,i.pos.z);case"shoot":return r?t.set(Z.HL,1,0):t.set(i.pos.x,i.pos.y,i.pos.z);default:return t.set(i.pos.x,i.pos.y,i.pos.z)}}result(){let t=Y_.find(([e])=>this.stars>=e)[1];return{stars:this.stars,total:Ga.length,time:this.t,timeUp:this.timeUp,rank:t,completed:this.results.filter(e=>e.ok).length}}};var Ui=(s,t,e,i)=>{let n=document.createElement(s);return t&&(n.className=t),i!=null&&(n.innerHTML=i),e&&e.appendChild(n),n},Vc=class{constructor(t,e,i){this.root=Ui("div","coach hidden",t);let n=Ui("div","coach-main",this.root),r=Ui("div","coach-txt",n);this.sayEl=Ui("div","coach-say",r),this.hintEl=Ui("div","coach-hint",r),this.skip=Ui("button","coach-skip",n,"Skip tutorial"),this.skip.addEventListener("click",o=>{o.preventDefault(),i()}),this.skip.addEventListener("pointerdown",o=>o.stopPropagation());let a=Ui("div","coach-foot",this.root);this.dots=Ui("span","coach-dots",a);for(let o=0;o<e;o++)Ui("i","",this.dots);this.starsEl=Ui("span","coach-stars",a,"\u2605 0"),this.bar=Ui("div","coach-bar",this.root),this.barFill=Ui("i","",this.bar),this.arrow=Ui("div","tut-arrow hidden",t),this.last={}}pointAt(t){let e=t&&(Math.abs(t.x)>.92||Math.abs(t.y)>.92);if(this.arrow.classList.toggle("hidden",!e),!e)return;let i=Math.atan2(t.y,t.x),n=.8,r=Math.min(n/Math.max(Math.abs(Math.cos(i)),.001),n/Math.max(Math.abs(Math.sin(i)),.001));this.arrow.style.left=`${(Math.cos(i)*r*.5+.5)*100}%`,this.arrow.style.top=`${(-Math.sin(i)*r*.5+.5)*100}%`,this.arrow.style.setProperty("--rot",`${-i}rad`)}show(t){this.root.classList.toggle("hidden",!t)}dispose(){this.root.remove(),this.arrow.remove()}update(t){let e=this.last;t.say!==e.say&&(this.sayEl.textContent=t.say,this.sayEl.classList.remove("pop"),this.sayEl.offsetWidth,this.sayEl.classList.add("pop")),t.hint!==e.hint&&(this.hintEl.textContent=t.hint||"",this.hintEl.classList.toggle("empty",!t.hint)),(t.index!==e.index||t.doneCount!==e.doneCount)&&[...this.dots.children].forEach((i,n)=>{i.className=n<t.doneCount?"done":n===t.index?"now":""}),t.stars!==e.stars&&(this.starsEl.textContent=`\u2605 ${t.stars}`),t.keyboard!==e.keyboard&&(this.skip.textContent=t.keyboard?"Skip (Esc)":"Skip"),this.barFill.style.width=`${Math.round(Math.max(0,Math.min(1,t.frac))*100)}%`,this.last={...t}}};var Z_={play:'<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',gear:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M21.2 12h-2.6M5.4 12H2.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3 5.5 5.5"/><circle cx="12" cy="12" r="6.6"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.4 9.3a2.7 2.7 0 1 1 3.9 2.4c-.8.4-1.3 1-1.3 1.9v.6"/><circle cx="12" cy="17.2" r=".9" fill="currentColor"/>',whistle:'<path d="M3 11.5h9.5a5.5 5.5 0 1 1-5.4 6.5H5a2 2 0 0 1-2-2z"/><path d="M12.5 11.5 18 6M15 4.5l1.5 1.5"/><circle cx="12.6" cy="16.5" r="1.6"/>',ball:'<circle cx="12" cy="12" r="9"/><path d="M12 7.5l3.4 2.5-1.3 4h-4.2l-1.3-4z" fill="currentColor"/><path d="M12 3v4.5M15.4 10l4.3-1.6M14.1 14l2.6 3.8M9.9 14l-2.6 3.8M8.6 10 4.3 8.4"/>',cone:'<path d="M9.5 4h5l4 14h-13z"/><path d="M4 20h16M8 12h8"/>',trophy:'<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v3M8 20h8l-1-3H9z"/>',star:'<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" fill="currentColor"/>',back:'<path d="M15 5l-7 7 7 7"/>',left:'<path d="M15 5l-7 7 7 7"/>',right:'<path d="M9 5l7 7-7 7"/>',home:'<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>',pause:'<path d="M8 5v14M16 5v14" stroke-width="3.4"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',chart:'<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3"/>',swap:'<path d="M4 8h14l-3-3M20 16H6l3 3"/>',eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',check:'<path d="M4.5 12.5l5 5 10-11"/>',close:'<path d="M6 6l12 12M18 6 6 18"/>',brush:'<path d="M14.5 4.5 19.5 9.5 11 18l-5-5zM6 13l-2 7 7-2"/>'};function fe(s,t=22){return`<svg class="ico" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Z_[s]||""}</svg>`}var J_=1e4,l0="firsttouch.copiedToDataModule",$i={sdk:null,env:"none",saves:"localStorage",playing:!1,adPlaying:!1,muted:!1,muteListeners:[],get active(){return!!this.sdk},async init(){let s=window.CrazyGames&&window.CrazyGames.SDK;if(!s)return this;try{let t;await Promise.race([s.init(),new Promise((e,i)=>{t=setTimeout(()=>i(new Error("SDK init timed out")),J_)})]),clearTimeout(t)}catch(t){return console.warn("[First Touch] CrazyGames SDK unavailable, playing without it:",t&&t.message),this.env="disabled",this}if(this.env=s.environment||"disabled",this.env!=="local"&&this.env!=="crazygames")return this;this.sdk=s,this.useDataModule(s.data);try{this.muted=!!(s.game.settings&&s.game.settings.muteAudio),s.game.addSettingsChangeListener(t=>{this.muted=!!(t&&t.muteAudio),this.notifyMute()})}catch{}return this},useDataModule(s){try{if(!s)throw new Error("no data module");s.getItem("firsttouch.probe")}catch(t){console.warn("[First Touch] CrazyGames data module unavailable, saving to localStorage:",t&&t.message);return}try{let t=window.localStorage;if(!t.getItem(l0)){for(let e of Am){let i=t.getItem(e);i!=null&&s.getItem(e)==null&&s.setItem(e,i)}t.setItem(l0,"1")}}catch{}Rm(s,"crazygames"),this.saves="crazygames"},call(s){if(this.sdk)try{s(this.sdk)}catch(t){console.warn("[First Touch] CrazyGames SDK call failed:",t&&t.message)}},loadingStart(){this.call(s=>s.game.loadingStart())},loadingStop(){this.call(s=>s.game.loadingStop())},setGameplay(s){s=!!s&&!this.adPlaying,s!==this.playing&&(this.playing=s,this.call(t=>s?t.game.gameplayStart():t.game.gameplayStop()))},happytime(){this.call(s=>s.game.happytime())},onMute(s){this.muteListeners.push(s),s(this.muted||this.adPlaying)},notifyMute(){for(let s of this.muteListeners)s(this.muted||this.adPlaying)},midgameAd(s){if(!this.sdk){s();return}let t=!1,e=()=>{t||(t=!0,this.adPlaying=!1,this.notifyMute(),s())};try{this.setGameplay(!1),this.sdk.ad.requestAd("midgame",{adStarted:()=>{this.adPlaying=!0,this.notifyMute()},adFinished:e,adError:e})}catch{e()}}};var Wt=s=>String(s).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Br=s=>(Math.round(s*10)/10).toFixed(1),j_=`<svg class="logo-ball" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#070b1d" stroke-width="6"/>
  <path d="M50 30 69 44 62 66H38L31 44z" fill="#0e1430"/><path d="M50 30V8M69 44l20-8M62 66l13 19M38 66 25 85M31 44l-20-8" stroke="#0e1430" stroke-width="5"/>
  <path d="M50 4 63 9 50 15 37 9zM93 38 92 52 85 44 87 32zM80 88 66 92 70 80 82 78zM20 88 34 92 30 80 18 78zM7 38 8 52 15 44 13 32z" fill="#0e1430"/></svg>`,Q_={ST:"Scores goals up front.",W:"Pace and crosses out wide.",AM:"Creates chances behind the striker.",CM:"Passes and wins the ball.",DEF:"Tackles and protects the goal."},tM=["#f3d2b3","#e0b48c","#c68b5e","#a26a43","#7b4b2c","#4f2f1c"],eM=["#111111","#3b2a1e","#7a4a24","#c58b3a","#e8d18a","#b23a1d"],iM=["#111111","#f5f5f5","#ffc61a","#2fd4ff","#ff4d5e","#33d36c"],Wc=class{constructor(t){this.app=t,this.root=document.createElement("div"),this.root.className="screens",t.uiRoot.appendChild(this.root),this.current=null,this.lastShown=null,this.stack=[];let e=null,i=0;this.root.addEventListener("pointerover",n=>{if(n.pointerType!=="mouse")return;let r=n.target.closest(".btn:not(:disabled), .card.pick, .tab, .opt, .sw");if(!r||r===e)return;e=r;let a=performance.now();a-i>60&&(i=a,this.sfx("uiHover",.12))})}sfx(t,e=.4){this.app.audio.play(t,{gain:e})}show(t,e={},i="screen center dim"){let n=this.current&&this.current===this.lastShown;this.lastShown=this.current,n||this.sfx("uiSwoosh",.18),this.root.innerHTML=`<div class="${i}">${t}</div>`;let r=this.root.firstChild;return n&&r.querySelectorAll(":scope > *").forEach(a=>{a.style.animation="none"}),r.querySelectorAll("[data-act]").forEach(a=>{let o=e[a.dataset.act];o&&a.addEventListener("click",l=>{l.preventDefault(),!a.disabled&&(this.sfx(a.classList.contains("primary")?"uiConfirm":"uiClick",a.classList.contains("primary")?.35:.4),o(a,l))})}),r}clear(){this.root.innerHTML="",this.current=null,this.lastShown=null}back(){if(!(this.current==="menu"||this.app.session)){if(this.current==="hubSub"){this.hub();return}this.mainMenu()}}toast(t,e=!1,i=3200){let n=document.createElement("div");n.className="toast"+(e===!0?" bad":e==="good"?" good":""),n.textContent=t,this.app.uiRoot.appendChild(n),e===!0&&this.sfx("uiError",.35),setTimeout(()=>n.remove(),i)}saveCareer(){let t=this.app.store.save();return t.ok||this.toast(`Could not save your career: ${t.error} Progress is kept only until you close the page.`,!0,6e3),t.ok}seg(t,e,i){return`<div class="seg" data-key="${t}">${e.map(([n,r])=>`<button class="opt ${String(i)===String(n)?"on":""}" data-v="${n}">${r}</button>`).join("")}</div>`}bindChoices(t,e){t.querySelectorAll(".seg").forEach(i=>i.querySelectorAll(".opt").forEach(n=>n.addEventListener("click",()=>{i.querySelectorAll(".opt").forEach(a=>a.classList.remove("on")),n.classList.add("on"),this.sfx("uiClick",.35);let r=n.dataset.v;r==="true"?r=!0:r==="false"&&(r=!1),e(i.dataset.key,r,n)})))}slider(t,e,i,n,r,a){let o=(r-e)/(i-e)*100;return`<div class="slider"><input class="range" type="range" id="${t}" min="${e}" max="${i}" step="${n}" value="${r}" style="--p:${o}%"></div><span class="val" id="v-${t.slice(2)}">${a}</span>`}mainMenu(){this.current="menu";let t=this.app;t.hud.show(!1);let e=t.store.career,i=e?`${Wt(Qt(e.clubId).name)} \xB7 Season ${e.seasonNo}`:"New Career \xB7 start in League Two";this.show(`
      <div class="menu-inner">
        <div class="menu-head">
          <div class="logo">${j_}<div class="logo-text">First<em>Touch</em></div></div>
          <div class="tagline">One player. Your eyes. Your career.</div>
        </div>
        <div class="menu-actions col">
          <div class="menu-play"><button class="btn xl primary" data-act="play">${fe("play",36)}<span class="stack">Play<small>${i}</small></span></button></div>
          <div class="menu-row">
            <button class="btn lg" data-act="quick">${fe("ball")} Quick Match</button>
            <button class="btn lg" data-act="train">${fe("cone")} Training</button>
          </div>
          <div class="menu-icons">
            <button class="btn sm" data-act="settings">${fe("gear",18)} Settings</button>
            <button class="btn sm" data-act="help">${fe("help",18)} How to Play</button>
            <button class="btn sm" data-act="tut">${fe("whistle",18)} Tutorial</button>
          </div>
          ${e?'<div><button class="btn sm ghost" data-act="new">New Career</button></div>':""}
        </div>
      </div>`,{play:()=>e?this.hub():this.newCareer(),new:()=>this.confirm("Your current career will be replaced.",()=>this.newCareer(),()=>this.mainMenu()),quick:()=>this.quickMatch(),train:()=>this.training(),settings:()=>this.settings(),help:()=>this.howTo(),tut:()=>this.startTutorial()},"screen menu"),t.store.notice&&(this.toast(t.store.notice.text,t.store.notice.bad,7e3),t.store.notice=null)}confirm(t,e,i){this.current="confirm",this.show(`<div class="panel narrow center-t"><div class="h-title">Are you sure?</div><p class="lead">${Wt(t)}</p>
      <div class="actions mid"><button class="btn danger lg" data-act="yes">Yes, start over</button><button class="btn ghost" data-act="no">Cancel</button></div></div>`,{yes:e,no:i})}newCareer(){this.current="new";let t=zs(),e={pos:"ST",club:On(1)[0].id,num:9,nat:0,foot:"R",skin:t.look.skin,hair:t.look.hair,boots:t.look.boots},i=(c,h)=>`<div class="swatches" data-sw="${c}">${h.map(u=>`<button class="sw ${u===e[c]?"on":""}" data-c="${u}" style="background:${u}" aria-label="${c} ${u}"></button>`).join("")}</div>`,n=Aa.map(c=>`<button class="card pick choice ${c.id===e.pos?"on":""}" data-pos="${c.id}"><b>${c.name}</b><span>${Q_[c.id]}</span></button>`).join(""),r=On(1).map(c=>`<button class="card pick choice club-chip ${c.id===e.club?"on":""}" data-club="${c.id}">${rn(c,34)}<b>${Wt(c.name)}</b></button>`).join(""),a=this.show(`
      <div class="panel wide">
        <div class="h-title">Create your player</div>
        <div class="grid2">
          <div class="col">
            <div class="h-sec">Name</div>
            <input class="field" id="nc-name" maxlength="22" value="${Wt(t.name)}" aria-label="Name">
            <div class="row" style="gap:var(--s5)">
              <div><div class="h-sec">Number</div><div class="stepper"><button class="btn icon sm" data-step="-1" aria-label="Lower">${fe("minus")}</button><span class="pv" id="nc-num">9</span><button class="btn icon sm" data-step="1" aria-label="Higher">${fe("plus")}</button></div></div>
              <div><div class="h-sec">Foot</div>${this.seg("foot",[["L","Left"],["R","Right"]],"R")}</div>
            </div>
            <div class="h-sec">Nationality</div>
            <div class="picker"><button class="btn icon sm" data-nat="-1" aria-label="Previous">${fe("left")}</button><span class="pv" id="nc-nat">${Wt(zr[0])}</span><button class="btn icon sm" data-nat="1" aria-label="Next">${fe("right")}</button></div>
          </div>
          <div class="col">
            <div class="h-sec">Skin</div>${i("skin",tM)}
            <div class="h-sec">Hair</div>${i("hair",eM)}
            <div class="h-sec">Boots</div>${i("boots",iM)}
          </div>
        </div>
        <div class="h-sec">Position</div>
        <div class="choices" id="nc-pos">${n}</div>
        <div class="h-sec">Your first club \xB7 League Two</div>
        <div class="choices" id="nc-club">${r}</div>
        <div class="actions"><button class="btn primary lg" data-act="go">${fe("check")} Sign your first contract</button><button class="btn ghost" data-act="back">Back</button></div>
      </div>`,{back:()=>this.mainMenu(),go:()=>{let c=a.querySelector("#nc-name").value.trim()||"A. Newcomer",h=qm({name:c,number:e.num,nationality:zr[e.nat],foot:e.foot,role:e.pos,clubId:e.club,look:{skin:e.skin,hair:e.hair,boots:e.boots}});this.app.store.career=h,this.saveCareer(),this.sfx("uiReward",.35),this.hub()}}),o=(c,h,u,d)=>a.querySelectorAll(`${c} [data-${h}]`).forEach(p=>p.addEventListener("click",()=>{a.querySelectorAll(`${c} [data-${h}]`).forEach(g=>g.classList.remove("on")),p.classList.add("on"),e[u]=p.dataset[h],this.sfx("uiClick",.35),d&&d(p.dataset[h])})),l={ST:9,W:11,AM:10,CM:8,DEF:4};o("#nc-pos","pos","pos",c=>{e.num=l[c],a.querySelector("#nc-num").textContent=e.num}),o("#nc-club","club","club"),a.querySelectorAll("[data-sw]").forEach(c=>c.querySelectorAll(".sw").forEach(h=>h.addEventListener("click",()=>{c.querySelectorAll(".sw").forEach(u=>u.classList.remove("on")),h.classList.add("on"),e[c.dataset.sw]=h.dataset.c,this.sfx("uiClick",.3)}))),a.querySelectorAll("[data-step]").forEach(c=>c.addEventListener("click",()=>{e.num=(e.num-1+ +c.dataset.step+99)%99+1,a.querySelector("#nc-num").textContent=e.num,this.sfx("uiClick",.3)})),a.querySelectorAll("[data-nat]").forEach(c=>c.addEventListener("click",()=>{e.nat=(e.nat+ +c.dataset.nat+zr.length)%zr.length,a.querySelector("#nc-nat").textContent=zr[e.nat],this.sfx("uiClick",.3)})),this.bindChoices(a,(c,h)=>{c==="foot"&&(e.foot=h)})}hub(t){this.current="hub";let i=this.app.store.career;if(!i){this.mainMenu();return}let n=Qt(i.clubId),r=i.season,a=i.player,o=hd(i);!t&&a.points>0&&(t="player"),t=t||this.hubTab||"table",this.hubTab=t;let l="";if(i.window){let R=i.window.offers.map((D,N)=>{let F=Qt(D.clubId);return`<div class="card offer"><div class="row">${rn(F,40)}<div style="flex:1;min-width:0"><div class="club-chip">${Wt(F.name)}</div>
          <div class="small muted">${Wt(Wi(F.tier).league)} \xB7 ${D.wage.toLocaleString()} cr/week \xB7 ${D.years} season${D.years>1?"s":""}</div>
          <div class="small" style="margin-top:4px">${Wt(D.reasons[0]||D.expectations)}</div></div></div>
          <div class="actions" style="margin-top:var(--s3)"><button class="btn primary" data-act="accept" data-i="${N}">${D.kind==="renewal"?"Sign renewal":"Accept transfer"}</button></div></div>`}).join("");l=`<div class="panel next"><div class="comp">${i.window.type==="end"?"Season-end":"Mid-season"} transfer window</div>
        <div class="h-title" style="margin-top:var(--s2)">${i.window.offers.length?`${i.window.offers.length} offer${i.window.offers.length>1?"s":""}!`:"No offers"}</div>
        ${R||'<p class="lead">Build your form and reputation for the next window.</p>'}
        <div class="actions mid"><button class="btn ${i.window.offers.length?"ghost":"primary lg"}" data-act="decline">${i.window.offers.length?`Stay at ${Wt(n.name)}`:"Continue"}</button></div></div>`}else if(o){let R=Qt(o.home),D=Qt(o.away),N=o.final?"Continental Stadium \xB7 neutral":Wt(R.ground);l=`<div class="panel next">
        <div class="comp">${o.final?Wt(o.name):`${Wt(r.league)} \xB7 Round ${o.round} of 6`}</div>
        <div class="fixture"><div class="side">${rn(R,72)}${Wt(R.name)}</div><div class="v">VS</div><div class="side">${rn(D,72)}${Wt(D.name)}</div></div>
        <div class="venue">${N}</div>
        <button class="btn xl primary block" data-act="play">${fe("play",32)} Play Match</button>
        <div class="actions mid" style="margin-top:var(--s4)"><button class="btn sm" data-act="train">${fe("cone",18)} Training${i.trainingAvailable?' <span class="badge gold">+XP</span>':""}</button></div></div>`}else if(t0(i)){let R=r.placement===1,D=r.final&&r.final.played&&r.final.won;l=`<div class="panel next"><div class="comp">Season ${i.seasonNo} complete</div>
        <div class="result-word ${R||D?"win":""}" style="font-size:52px;margin:var(--s3) 0">${R?"Champions!":Ha(r.placement)}</div>
        <p class="lead">${Wt(n.name)} finished ${Ha(r.placement)} in the ${Wt(r.league)}.${D?" Continental Cup winners!":""}</p>
        <button class="btn xl primary block" data-act="season">Start Season ${i.seasonNo+1}</button></div>`}let c=i.seasons.find(R=>R.season===i.seasonNo&&R.clubId===i.clubId)||{apps:0,goals:0,assists:0,ratingSum:0},h=(R,D)=>`<div class="mini"><b>${R}</b><span>${D}</span></div>`,u=od.map(R=>`<div class="attr"><span>${Hm[R]}</span><div class="bar ${a.attrs[R]>=75?"good":""}"><i style="width:${a.attrs[R]}%"></i></div><b>${a.attrs[R]}</b><button class="btn ${a.points>0&&a.attrs[R]<99?"primary":""}" data-act="up" data-k="${R}" ${a.points>0&&a.attrs[R]<99?"":"disabled"} title="+${dd(a.attrs[R])}">+</button></div>`).join(""),d=i.form.slice(-5).map(R=>`<span class="${R>=7?"hi":R<6?"lo":""}">${Br(R)}</span>`).join("")||'<span class="muted small">No matches yet</span>',p=`${a.points>0?`<div class="row" style="margin-bottom:var(--s2)"><span class="badge gold pulse">${a.points} upgrade point${a.points>1?"s":""}</span><span class="small muted">Tap + to improve</span></div>`:""}
      ${u}
      <div class="h-sec">Form</div><div class="form-dots">${d}</div>
      <div class="mini-stats">${h(c.apps,"Apps")}${h(c.goals,"Goals")}${h(c.assists,"Assists")}${h(c.apps?Br(c.ratingSum/c.apps):"-","Avg")}</div>`,g=cd(r).map((R,D)=>`<tr class="${R.id===i.clubId?"me":""}"><td>${D+1}</td><td><span class="row" style="gap:6px">${rn(Qt(R.id),20)} ${Wt(Qt(R.id).name)}</span></td><td class="n">${R.p}</td><td class="n">${R.gf-R.ga}</td><td class="n"><b>${R.pts}</b></td></tr>`).join(""),x=r.fixtures.filter(R=>R.score&&(R.home===i.clubId||R.away===i.clubId)).map(R=>`<span class="badge">${Wt(Qt(R.home).short)} ${R.score[0]}-${R.score[1]} ${Wt(Qt(R.away).short)}</span>`).join(" "),f=`<table class="t"><tr><th>#</th><th>Club</th><th class="n">P</th><th class="n">GD</th><th class="n">Pts</th></tr>${g}</table>${x?`<div class="trophies" style="margin-top:var(--s3)">${x}</div>`:""}`,v=`${fd(i).map(R=>`<div style="margin:var(--s3) 0"><div class="row">${rn(R.club,26)}<b class="club-chip" style="flex:1">${Wt(R.club.name)}</b><span class="big-num">${Math.round(R.score*100)}%</span></div><div class="bar ${R.qualifies?"good":""}" style="margin-top:6px"><i style="width:${Math.round(R.score*100)}%"></i></div><div class="small muted" style="margin-top:4px">${Wt(R.text)}</div></div>`).join("")||'<p class="lead">You are at the top. Win the league and the Continental Cup!</p>'}<div class="small muted">Offers come at transfer windows (after round 3 and at season end).</div>`,w=i.totals,b=i.seasons.map(R=>`<tr><td>S${R.season}</td><td>${Wt(Qt(R.clubId).short)}</td><td class="n">${R.apps}</td><td class="n">${R.goals}</td><td class="n">${R.assists}</td><td class="n">${R.apps?Br(R.ratingSum/R.apps):"-"}</td><td class="n">${R.placement?Ha(R.placement):"-"}</td></tr>`).join(""),_=[...i.timeline].reverse().slice(0,30).map(R=>`<div><span class="muted">S${R.season}</span> ${Wt(R.text)}</div>`).join(""),M=i.trophies.map(R=>`<span class="badge gold">${fe("trophy",14)} ${Wt(R.name)} S${R.season}</span>`).join(" "),T=`<div class="mini-stats" style="margin-top:0">${h(w.apps,"Apps")}${h(w.goals,"Goals")}${h(w.assists,"Assists")}${h(w.apps?Br(i0(w)):"-","Avg")}</div>
      ${M?`<div class="trophies" style="margin-top:var(--s3)">${M}</div>`:""}
      <div class="h-sec">Seasons</div><table class="t"><tr><th>S</th><th>Club</th><th class="n">Apps</th><th class="n">G</th><th class="n">A</th><th class="n">Avg</th><th class="n">Pos</th></tr>${b}</table>
      <div class="h-sec">Timeline</div><div class="timeline">${_}</div>`,y=[["player","Player",fe("user",16),a.points],["table","Table",fe("chart",16)],["transfers","Transfers",fe("swap",16)],["history","History",fe("trophy",16)]],E={player:p,table:f,transfers:v,history:T},C=Math.max(0,Math.min(100,a.xp)),L=this.show(`
      <div class="topbar">
        <div class="who">${rn(n,56)}<div><h1>${Wt(n.name)}</h1><div class="sub">${Wt(r.league)} \xB7 Season ${i.seasonNo} \xB7 ${Wt(a.name)} #${a.number} \xB7 ${gs(a.role)}</div></div></div>
        <span class="spacer"></span>
        <div class="lvl" title="Level ${a.level}"><div class="ring">${a.level}</div><div><div class="small" style="font-weight:800">XP ${a.xp}/100</div><div class="bar gold"><i style="width:${C}%"></i></div></div></div>
        <button class="btn icon" data-act="menu" title="Main Menu" aria-label="Main Menu">${fe("home")}</button>
      </div>
      <div class="hub-main">
        ${l}
        <div class="panel">
          <div class="tabs">${y.map(([R,D,N,F])=>`<button class="tab ${R===t?"on":""}" data-tab="${R}">${N} ${D}${F?`<span class="dot-new">${F}</span>`:""}</button>`).join("")}</div>
          ${y.map(([R])=>`<div class="tab-body" data-body="${R}" ${R===t?"":"hidden"}>${E[R]}</div>`).join("")}
        </div>
      </div>`,{menu:()=>{this.hubTab=null,this.mainMenu()},play:()=>this.app.playCareerMatch(),train:()=>this.training(!0),season:()=>{e0(i),this.saveCareer(),this.hub()},up:R=>{Zm(i,R.dataset.k)&&(this.saveCareer(),this.sfx("uiReward",.3),this.hub("player"))},accept:R=>{jm(i,+R.dataset.i),this.saveCareer(),this.sfx("uiReward",.4),this.hub()},decline:()=>{Qm(i),this.saveCareer(),this.hub()}},"screen hub");L.querySelectorAll(".tab").forEach(R=>R.addEventListener("click",()=>{this.hubTab=R.dataset.tab,L.querySelectorAll(".tab").forEach(D=>D.classList.toggle("on",D===R)),L.querySelectorAll(".tab-body").forEach(D=>{D.hidden=D.dataset.body!==R.dataset.tab}),this.sfx("uiClick",.3)}))}report(t,e={}){let i=this.app;i.input.active=!1,i.input.exitLock(),i.hud.show(!1),this.current="report";let n=t.match,r=n.human,a=n.stats.report(r),o=a.stats,l=null;if(e.career&&!t.committed){t.committed=!0;let E=i.store.career;l=Km(E,e.matchId,e.fx,{score:a.score,rating:a.rating,minutes:a.minutes,stats:o,motm:a.motm&&a.motm.isHuman}),t.summary=l,this.saveCareer()}else e.career&&(l=t.summary);let c=a.score[r.team],h=a.score[1-r.team],u=c>h?"win":c<h?"loss":"draw",d={win:"You win!",loss:"Defeat",draw:"Draw"}[u],p=E=>{let C=ni.find(L=>L.name===n.teams[E].name);return C?rn(C,56):""},g=a.goals.map(E=>`${E.clock} ${E.ownGoal?`OG (${Wt(E.ownGoalBy||"")})`:Wt(E.scorer||"?")}`).join(" \xB7 "),x=(E,C)=>`<div class="mini"><b>${E}</b><span>${C}</span></div>`,f=r.role==="DEF"?[[o.tacklesWon,"Tackles"],[o.interceptions,"Interceptions"],[o.passAtt?o.passAcc+"%":"-","Passing"]]:[[o.goals,"Goals"],[o.assists,"Assists"],[o.passAtt?o.passAcc+"%":"-","Passing"]],m=a.breakdown,v=[...m.pos.slice(0,3).map(E=>`<div class="plus">+${E.v.toFixed(2)} ${Wt(E.label)}</div>`),...m.neg.slice(0,3).map(E=>`<div class="minus">${E.v.toFixed(2)} ${Wt(E.label)}</div>`)].join("")||'<div class="muted">A quiet game.</div>',w=l&&!l.duplicate?`<div class="reward">${fe("star",18)} +${l.xp} XP${l.levelUps?` \xB7 ${l.levelUps} upgrade point${l.levelUps>1?"s":""}!`:""}</div>`:e.quick?'<div class="reward plain">Quick match \xB7 no career effect</div>':"",b=this.show(`
      <div class="panel result">
        <div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${Wt(e.title||"Full time")}</div>
        <div class="result-word ${u}">${d}</div>
        <div class="scoreline"><div class="side">${p(0)}${Wt(n.teams[0].name)}</div><div class="sc">${a.score[0]} - ${a.score[1]}</div><div class="side">${p(1)}${Wt(n.teams[1].name)}</div></div>
        <div class="scorers">${g}</div>
        <div class="rating-hero"><span class="lab">Your rating</span><span class="num ${a.rating>=7?"hi":a.rating<6?"lo":""}" id="r-num">0.0</span></div>
        <div class="key-stats">${f.map(([E,C])=>x(E,C)).join("")}</div>
        ${w}
        <details class="more"><summary>More stats</summary>
          <div class="mini-stats">${x(`${o.passCmp}/${o.passAtt}`,"Passes")}${x(o.shots,"Shots")}${x(o.shotsOn,"On target")}${x(o.keyPasses,"Chances")}${x(o.tacklesWon,"Tackles")}${x(o.interceptions,"Intercept.")}${x(o.possLost,"Lost ball")}${x(o.touches,"Touches")}</div>
          <div class="grid2" style="margin-top:var(--s3)"><div class="why small"><div class="h-sec" style="margin:0 0 6px">Rating</div>${v}</div>
          <div class="small" style="font-weight:700;color:var(--text2)"><div class="h-sec" style="margin:0 0 6px">Match</div>Possession ${a.possession[0]}% - ${a.possession[1]}%<br>Shots ${a.teamShots[0]} - ${a.teamShots[1]}<br>Minutes ${a.minutes}<br>Player of the match: ${a.motm?Wt(a.motm.name):"-"}</div></div>
        </details>
        <div class="actions mid">
          ${e.career?'<button class="btn primary lg" data-act="cont">Continue</button>':e.quick?`<button class="btn primary lg" data-act="again">${fe("play")} Play again</button><button class="btn" data-act="change">Change teams</button><button class="btn ghost" data-act="menu">Main menu</button>`:'<button class="btn primary lg" data-act="menu">Continue</button>'}
        </div>
      </div>`,{cont:()=>this.afterMatch(b,()=>{i.endSession(),this.hub()}),again:()=>this.afterMatch(b,()=>{i.endSession(),i.startQuickMatch(this.lastQuick||{})}),change:()=>this.afterMatch(b,()=>{i.endSession(),this.quickMatch()}),menu:()=>this.afterMatch(b,()=>{i.endSession(),this.mainMenu()})});this.sfx(u==="win"?"uiReward":"uiConfirm",.4),u==="win"&&$i.happytime();let _=b.querySelector("#r-num"),M=performance.now(),T=a.rating,y=()=>{let E=Math.min(1,(performance.now()-M)/900);_.textContent=Br(T*(1-Math.pow(1-E,3))),E<1&&_.isConnected&&requestAnimationFrame(y)};requestAnimationFrame(y)}afterMatch(t,e){t.querySelectorAll("button").forEach(i=>{i.disabled=!0}),$i.midgameAd(e)}quickMatch(){this.current="quick";let t=this.app,e=this.lastQuick||{home:"swindon",away:"chesterfield",side:0,role:t.store.career?t.store.career.player.role:"ST",len:t.settings.matchLength},i={home:e.home,away:e.away,side:e.side||0,role:e.role||"ST",len:e.len||t.settings.matchLength||"normal"},n=ni.map(l=>l.id),r=this.show(`
      <div class="panel wide">
        <div class="h-title">Quick Match</div>
        <div class="vs">
          <div class="card team-pick pick" data-side="0" id="tp-0"></div>
          <div class="vs-mid">VS</div>
          <div class="card team-pick pick" data-side="1" id="tp-1"></div>
        </div>
        <div id="club-grid"></div>
        <div class="grid2" style="margin-top:var(--s4)">
          <div><div class="h-sec">Your position</div>${this.seg("role",Aa.map(l=>[l.id,l.id]),i.role)}</div>
          <div><div class="h-sec">Halves</div>${this.seg("len",[["short","2 min"],["normal","3 min"],["long","5 min"]],i.len)}</div>
        </div>
        <div class="actions"><button class="btn primary lg" data-act="go">${fe("play")} Kick Off</button><button class="btn ghost" data-act="back">Back</button></div>
      </div>`,{back:()=>this.mainMenu(),go:()=>{if(i.home===i.away){this.toast("Pick two different clubs.",!0);return}this.lastQuick={home:i.home,away:i.away,side:i.side,role:i.role,len:i.len,halfLength:$l[i.len]},t.startQuickMatch(this.lastQuick)}}),a=()=>{for(let l of[0,1]){let c=l===0?i.home:i.away,h=Qt(c),u=r.querySelector(`#tp-${l}`);u.classList.toggle("on",i.side===l),u.innerHTML=`<div class="row"><button class="btn icon sm" data-cyc="${l}" data-d="-1" aria-label="Previous club">${fe("left")}</button>${rn(h,72)}<button class="btn icon sm" data-cyc="${l}" data-d="1" aria-label="Next club">${fe("right")}</button></div>
          <div class="tp-name">${Wt(h.name)}</div><div class="tp-tier">${Wt(Wi(h.tier).league)} \xB7 ${l===0?"Home":"Away"}</div>
          <div class="row mid" style="justify-content:center"><button class="btn sm" data-pick="${l===0?"home":"away"}">All clubs</button></div>
          <div class="me">${i.side===l?'<span class="badge gold">You play here</span>':'<span class="badge">Tap to play here</span>'}</div>`}r.querySelectorAll("[data-cyc]").forEach(l=>l.addEventListener("click",c=>{c.stopPropagation();let h=l.dataset.cyc==="0"?"home":"away";i[h]=n[(n.indexOf(i[h])+ +l.dataset.d+n.length)%n.length],this.sfx("uiClick",.3),a()})),r.querySelectorAll("[data-pick]").forEach(l=>l.addEventListener("click",c=>{c.stopPropagation(),this.sfx("uiClick",.3),o(l.dataset.pick)}))},o=l=>{let c=r.querySelector("#club-grid");if(c.dataset.key===l&&c.innerHTML){c.innerHTML="",c.dataset.key="";return}c.dataset.key=l,c.innerHTML=`<div class="club-grid">${sd.map(h=>`<div class="h-sec">${Wt(h.league)}</div>${On(h.tier).map(u=>`<button class="card pick club-chip ${u.id===i[l]?"on":""}" data-club="${u.id}">${rn(u,28)} ${Wt(u.name)}</button>`).join("")}`).join("")}</div>`,c.querySelectorAll("[data-club]").forEach(h=>h.addEventListener("click",()=>{i[l]=h.dataset.club,c.innerHTML="",c.dataset.key="",this.sfx("uiClick",.35),a()}))};r.querySelectorAll(".team-pick").forEach(l=>l.addEventListener("click",()=>{i.side=+l.dataset.side,this.sfx("uiClick",.3),a()})),this.bindChoices(r,(l,c)=>{i[l]=c}),a()}training(t=!1){this.current=t?"hubSub":"training";let e=this.app.store.career,i=e?e.trainingAvailable?"Your next drill earns XP.":"No XP until your next match.":"Practice only: no career running.",n=(o,l,c,h,u,d)=>`<div class="card col" style="justify-content:space-between"><div><div class="row">${fe(c,26)}<b class="club-chip" style="font-size:17px">${Wt(h)}</b></div>
      <div class="small" style="color:var(--text2);margin-top:6px;font-weight:600">${Wt(u)}</div></div>
      <div class="row"><span class="badge">${d}</span><span class="spacer"></span><button class="btn primary sm" data-act="${o}" ${l?`data-k="${l}"`:""}>Start</button></div></div>`,r={passing:"Pass through the lit gate to your teammate.",finishing:"Finish the balls served into the box.",dribbling:"Dribble through every gate, fast.",practice:"Free play with a teammate, a defender and a keeper."},a=Object.entries(Hc).map(([o,l])=>n("go",o,o==="finishing"?"ball":o==="practice"?"eye":"cone",l.name,r[o]||l.desc,l.time?`${l.time} s`:"No timer")).join("");this.show(`<div class="panel wide"><div class="row"><div class="h-title" style="margin:0">Training</div><span class="spacer"></span><span class="badge ${e&&e.trainingAvailable?"gold":""}">${Wt(i)}</span></div>
      <div class="grid2" style="margin-top:var(--s4)">${n("tut","","whistle","Tutorial","The basics in under two minutes.","2 min")}${a}</div>
      <div class="actions"><button class="btn ghost" data-act="back">${fe("back",18)} Back</button></div></div>`,{tut:()=>this.startTutorial(),go:o=>this.startDrill(o.dataset.k,t),back:()=>t?this.hub():this.mainMenu()})}startDrill(t,e=!1){let i=this.app,n=i.store.career,r={...n?n.player:zs()},a=new Bc(t,r),o=n?Qt(n.clubId):ni[0],l=Tr(o,ni.find(d=>d.id!==o.id&&d.tier===o.tier)||ni[1]),c=i.startSession({mode:"drill",venue:"training",venueOpts:{homeName:"Training"},colours:{kits:l,human:r.look},match:a.matchConfig(),noStart:!0,clockText:()=>a.clockText(),onStep:()=>a.step(),onEnd:()=>this.drillResult(a,e)});a.setup(c.match,i.view),c.drill=a,c.cam.yaw=c.human.yaw;let h=c.dispose.bind(c);c.dispose=()=>{a.dispose(),h()};let u=()=>{if(i.session===c){for(;a.events.length;){let d=a.events.shift();i.hud.notify(d.text,d.kind)}requestAnimationFrame(u)}};u(),c.match.events.on("drillGoal",d=>{i.view.celebrate(d.pos.x,d.pos.z,0,.5),i.audio.play("net"),i.audio.play("cheer",{gain:.3})}),i.hud.showBanner(Hc[t].name,"",2500)}startTutorial(t={}){let e=this.app,i=e.store.career,n={...i?i.player:zs()},r=new Gc(n),a=i?Qt(i.clubId):ni[0],o=Tr(a,ni.find(p=>p.id!==a.id&&p.tier===a.tier)||ni[1]);this.tutorialFirst=!!t.first;let l=e.startSession({mode:"tutorial",venue:"training",venueOpts:{homeName:"Training"},colours:{kits:o,human:n.look},match:r.matchConfig(),noStart:!0,clockText:()=>"",onStep:()=>r.step(),onEnd:()=>this.tutorialResult(r)});r.setup(l.match,e.view),l.tutorial=r,l.cam.yaw=l.human.yaw,e.hud.root.classList.add("tut");let c=new Vc(e.uiRoot,Ga.length,()=>this.skipTutorial()),h=l.dispose.bind(l);l.dispose=()=>{r.dispose(),c.dispose(),e.hud.root.classList.remove("tut"),h()};let u=new k,d=()=>{if(e.session!==l)return;for(;r.events.length;)this.tutorialFx(r.events.shift(),l);let p=r.current,g=e.input.touchMode,x=p&&r.waitUntil==null&&r.endAt==null;c.show(!e.paused&&!l.ended);let f=!e.paused&&!l.ended?r.objective(u):null;c.pointAt(f?e.view.projectToScreen(f,f):null),c.update({index:r.idx,doneCount:r.results.length,say:r.say,stars:r.stars,keyboard:!g,hint:x?p.hint[g?1:0]:"",frac:x?1-r.stepT/p.cap:0}),requestAnimationFrame(d)};return d(),l}tutorialFx(t,e){let i=this.app,n=i.view,r=e.human;switch(t.type){case"note":i.hud.notify(t.text,t.kind);break;case"step":i.audio.play("uiConfirm",{gain:.3});break;case"star":n.celebrate(t.x,t.z,0,.45);break;case"done":t.ok&&(n.celebrate(t.x,t.z,0,t.big?1.2:.3),i.audio.play(t.star?"uiReward":"uiConfirm",{gain:.45}));break;case"goal":i.audio.play("net"),i.audio.play("cheer",{gain:.55}),i.hud.showBanner("GOAL!","Sleepy Sam never saw it coming",1400,"mine");break;case"fade":i.hud.flashFade();break;case"finale":i.audio.play("whistle",{gain:.5}),i.audio.play("cheer",{gain:.35}),n.celebrate(r.pos.x+Math.sin(r.yaw)*4,r.pos.z+Math.cos(r.yaw)*4,0,1.2);break}}skipTutorial(){gd("skipped");let t=this.app;t.session&&t.endSession(),this.mainMenu(),this.toast("Tutorial skipped. Replay it any time from the menu.")}tutorialResult(t){let e=this.app;e.input.active=!1,e.input.exitLock(),gd("done"),$i.happytime();let i=t.result(),n=Array.from({length:i.total},(o,l)=>`<i class="${l<i.stars?"":"off"}" style="animation-delay:${.25+l*.08}s">\u2605</i>`).join(""),r=`${Math.floor(i.time/60)}:${String(Math.floor(i.time%60)).padStart(2,"0")}`,a=e.store.career;this.current="tutorialResult",this.show(`<div class="panel result">
      <span class="badge gold">${i.timeUp?"Time's up":"Warm-up complete"}</span>
      <div class="stars" aria-label="${i.stars} of ${i.total} stars" style="margin-top:var(--s3)">${n}</div>
      <div class="result-word win" style="font-size:clamp(40px,8vw,64px)">${Wt(i.rank)}</div>
      <p class="lead" style="margin-top:var(--s3)">${i.stars} of ${i.total} stars \xB7 ${r}</p>
      <div class="actions mid">
        <button class="btn primary lg" data-act="career">${a?"Continue your career":"Start your career"}</button>
        <button class="btn ghost" data-act="menu">Main menu</button>
      </div></div>`,{career:()=>{e.endSession(),a?this.hub():this.newCareer()},menu:()=>{e.endSession(),this.mainMenu()}}),this.sfx("uiReward",.4)}drillResult(t,e){let i=this.app;i.input.active=!1,i.input.exitLock();let n=t.result(),r=i.store.career,a="";if(t.kind==="practice")a='<div class="reward plain">Free practice \xB7 no XP</div>';else if(r&&r.trainingAvailable){let o=ud(r,n.xp);r.trainingAvailable=!1,this.saveCareer(),a=`<div class="reward">${fe("star",18)} +${n.xp} XP${o?` \xB7 ${o} upgrade point${o>1?"s":""}!`:""}</div>`}else r&&(a='<div class="reward plain">No XP until your next match</div>');this.current="drillResult",this.show(`<div class="panel result"><div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${Wt(t.def.name)}</div>
      <div class="result-word" style="font-size:clamp(34px,6vw,52px);margin:var(--s3) 0">${Wt(n.text)}</div>${a}
      <div class="actions mid"><button class="btn primary lg" data-act="again">${fe("play")} Try again</button><button class="btn ghost" data-act="back">Back to Training</button></div></div>`,{again:()=>{i.endSession(),this.startDrill(t.kind,e)},back:()=>{i.endSession(),this.training(e)}}),this.sfx("uiReward",.35)}styleMenu(t=!1,e=null){this.current=t?"pauseSub":"style";let i=this.app,n={};try{let a=i.session?null:{pos:[-14,8,27],look:[6,.8,-2]};for(let o of["classic","neo"])n[o]=i.view.renderPreview(o,480,270,a)}catch{n={}}let r=(a,o,l)=>`<div class="card pick preview ${i.style===a?"on":""}" data-act="pick" data-s="${a}">${n[a]?`<img src="${n[a]}" alt="${o}">`:""}<h3>${o}</h3><div class="small" style="color:var(--text2);font-weight:600">${l}</div></div>`;this.show(`<div class="panel wide"><div class="h-title">Visual Style</div>
      <div class="previews">${r("classic","Classic","Ink drawing: pale colours, thin black lines.")}${r("neo","Neobrutalist","Bold colours, thick outlines, hard shadows.")}</div>
      <div class="actions"><button class="btn primary" data-act="back">Done</button></div></div>`,{pick:a=>{i.setStyle(a.dataset.s),this.styleMenu(t,e)},back:()=>e?e():t?this.pauseMenu():this.mainMenu()})}settings(t=!1,e="game"){this.current=t?"pauseSub":"settings";let i=this.app,n=i.settings,r=(h,u)=>`<div class="tab-body" data-body="${h}" ${h===e?"":"hidden"}>${u}</div>`,a=(h,u)=>`<div class="set"><span class="lab">${h}</span>${u}</div>`,o=h=>this.seg(h,[[!0,"On"],[!1,"Off"]],n[h]),l=this.show(`<div class="panel mid"><div class="h-title">Settings</div>
      <div class="tabs">${[["game","Game"],["controls","Controls"],["video","Video"],["audio","Audio"]].map(([h,u])=>`<button class="tab ${h===e?"on":""}" data-tab="${h}">${u}</button>`).join("")}</div>
      ${r("game",`${a("Difficulty",this.seg("difficulty",Object.entries(Oc).map(([h,u])=>[h,u.label]),n.difficulty))}
        <div class="small muted" style="margin:-4px 0 6px">Assisted: the ball sticks to you, passes find teammates, easier opponents.</div>
        ${a("Halves",this.seg("matchLength",[["short","2 min"],["normal","3 min"],["long","5 min"]],n.matchLength))}
        ${a("Goal replays",o("replays"))}`)}
      ${r("controls",`${a("Look speed",this.slider("s-sens",.2,3,.05,n.sensitivity,n.sensitivity.toFixed(2)))}
        ${a("Invert Y",this.seg("invertY",[[!1,"Off"],[!0,"On"]],n.invertY))}
        ${a("Touch controls",this.seg("touch",[["auto","Auto"],["on","On"],["off","Off"]],n.touch))}`)}
      ${r("video",`${a("Style",`<div class="row">${this.seg("style",[["classic","Classic"],["neo","Neo"]],i.style)}<button class="btn sm icon" data-act="preview" title="Preview" aria-label="Preview styles">${fe("eye",18)}</button></div>`)}
        ${a("Quality",this.seg("quality",[["low","Low"],["medium","Medium"],["high","High"]],n.quality))}
        ${a("Field of view",this.slider("s-fov",id,nd,1,n.fov,c0(n.fov)))}
        ${a("View bob",o("bob"))}
        ${a("Camera shake",o("shake"))}`)}
      ${r("audio",`${a("Master",this.slider("s-master",0,1,.05,n.master,Hr(n.master)))}
        ${a("Effects",this.slider("s-sfx",0,1,.05,n.sfx,Hr(n.sfx)))}
        ${a("Crowd",this.slider("s-crowd",0,1,.05,n.crowd,Hr(n.crowd)))}`)}
      <div class="actions"><button class="btn primary lg" data-act="back">Done</button></div></div>`,{back:()=>{i.applySettings(),t?this.pauseMenu():this.mainMenu()},preview:()=>{i.applySettings(),this.styleMenu(t,()=>this.settings(t,"video"))}});l.querySelectorAll(".tab").forEach(h=>h.addEventListener("click",()=>{e=h.dataset.tab,l.querySelectorAll(".tab").forEach(u=>u.classList.toggle("on",u===h)),l.querySelectorAll(".tab-body").forEach(u=>{u.hidden=u.dataset.body!==e}),this.sfx("uiClick",.3)}));let c=(h,u,d)=>{let p=l.querySelector(`#${h}`);p.addEventListener("input",()=>{n[u]=parseFloat(p.value),p.style.setProperty("--p",`${(n[u]-+p.min)/(+p.max-+p.min)*100}%`),l.querySelector(`#v-${h.slice(2)}`).textContent=d(n[u]),i.applySettings()})};c("s-sens","sensitivity",h=>h.toFixed(2)),c("s-fov","fov",c0),c("s-master","master",Hr),c("s-sfx","sfx",Hr),c("s-crowd","crowd",Hr),this.bindChoices(l,(h,u)=>{if(h==="style"){i.setStyle(u);return}n[h]=u,i.applySettings(),h==="difficulty"&&i.session&&this.toast("Difficulty applies from the next match.")})}howTo(t=!1){this.current=t?"pauseSub":"help";let e=this.app.input.touchMode,i=a=>`<div class="keys">${a.map(([o,l])=>`<div class="key"><span class="kc">${Wt(o)}</span><span>${Wt(l.split(" (")[0].split(";")[0])}</span></div>`).join("")}</div>`,n=(a,o)=>`<div class="tip"><b>${a}</b>${o}</div>`,r=this.show(`<div class="panel wide"><div class="h-title">How to Play</div>
      <div class="tabs"><button class="tab ${e?"":"on"}" data-tab="kb">Keyboard &amp; mouse</button><button class="tab ${e?"on":""}" data-tab="touch">Touch</button></div>
      <div class="tab-body" data-body="kb" ${e?"hidden":""}>${i(gm)}</div>
      <div class="tab-body" data-body="touch" ${e?"":"hidden"}>${i(xm)}</div>
      <div class="h-sec">Tips</div>
      <div class="tips">
        ${n("First touch","Just let the ball reach your feet.")}
        ${n("Passing","Look at a teammate: the ring shows who gets it.")}
        ${n("Green edge","The ball is yours. It sticks to your feet.")}
        ${n("Defending","Get close and tackle, or slide in.")}
      </div>
      <div class="h-sec">Rules</div>
      <div class="tips">
        ${n("7-a-side","Two short halves. No offside.")}
        ${n("Career","Play well, earn XP, get offers from bigger clubs.")}
      </div>
      <div class="small muted" style="margin-top:var(--s4)">Rendering: three.js (MIT). Clubs, kit colours and grounds: openfootball/football.json (public domain, 2026/27 and 2025/26). Crests are generated badges; squad players are fictional.</div>
      <div class="actions"><button class="btn primary" data-act="back">Got it</button></div></div>`,{back:()=>t?this.pauseMenu():this.mainMenu()});r.querySelectorAll(".tab").forEach(a=>a.addEventListener("click",()=>{r.querySelectorAll(".tab").forEach(o=>o.classList.toggle("on",o===a)),r.querySelectorAll(".tab-body").forEach(o=>{o.hidden=o.dataset.body!==a.dataset.tab}),this.sfx("uiClick",.3)}))}pauseMenu(){this.current="pause";let t=this.app,e=t.session,i=e?e.cfg.mode:null,n=i==="career"?"Exit to Career Hub":i==="drill"?"Exit to Training":i==="tutorial"?"Skip tutorial":"Exit to Main Menu";this.show(`<div class="panel narrow center-t"><div class="h-title">Paused</div>
      <div class="col">
        <button class="btn primary lg block" data-act="resume">${fe("play")} Resume</button>
        <div class="grid2" style="gap:var(--s2)">
          <button class="btn sm" data-act="settings">${fe("gear",18)} Settings</button>
          <button class="btn sm" data-act="controls">${fe("help",18)} Controls</button>
          <button class="btn sm" data-act="style">${fe("brush",18)} Visual Style</button>
          ${e&&i!=="drill"&&i!=="tutorial"?`<button class="btn sm" data-act="stats">${fe("chart",18)} Stats</button>`:""}
        </div>
        <button class="btn ghost block" data-act="exit">${n}</button>
      </div>
      ${i==="career"?'<div class="small muted" style="margin-top:var(--s3)">Leaving abandons this match.</div>':""}</div>`,{resume:()=>t.resume(),controls:()=>this.howTo(!0),settings:()=>this.settings(!0),style:()=>this.styleMenu(!0),stats:()=>this.liveStats(),exit:()=>{if(i==="tutorial"){this.skipTutorial();return}t.endSession(),i==="career"?this.hub():i==="drill"?this.training(!!t.store.career):this.mainMenu()}})}liveStats(){this.current="pauseSub";let t=this.app.session.match,e=t.human,i=t.stats.report(e),n=i.stats,r=(a,o)=>`<div class="mini"><b>${a}</b><span>${o}</span></div>`;this.show(`<div class="panel narrow center-t"><div class="h-title">Match Stats</div>
      <div class="scoreline" style="margin-top:0"><div class="side">${Wt(t.teams[0].short)}</div><div class="sc">${i.score[0]} - ${i.score[1]}</div><div class="side">${Wt(t.teams[1].short)}</div></div>
      <div class="rating-hero"><span class="lab">Rating now</span><span class="num">${Br(i.rating)}</span></div>
      <div class="mini-stats">${r(n.goals,"Goals")}${r(n.assists,"Assists")}${r(n.passAtt?n.passAcc+"%":"-","Passing")}${r(n.tacklesWon,"Tackles")}</div>
      <div class="small muted" style="margin-top:var(--s3)">Possession ${i.possession[0]}% - ${i.possession[1]}%</div>
      <div class="actions mid"><button class="btn primary" data-act="back">Back</button></div></div>`,{back:()=>this.pauseMenu()})}clickToPlay(){this.current="click";let t=this.app.session,e=!this.seenControls;this.seenControls=!0;let i=t&&t.cfg.title?`<div class="small muted" style="font-weight:800;text-transform:uppercase;letter-spacing:1px">${Wt(t.cfg.title)}</div>`:"",n=this.app.input.touchMode;if(t&&t.cfg.mode==="tutorial"){this.show(`<div class="panel narrow center-t">
        <span class="badge gold">2-minute warm-up</span>
        <div class="h-title" style="margin-top:var(--s3)">Welcome to First Touch!</div>
        <p class="lead">Coach Ada shows you the basics. Be quick to earn stars.</p>
        <div class="actions mid"><button class="btn primary lg" data-act="start">${fe("play")} Start tutorial</button><button class="btn ghost" data-act="skip">Skip tutorial</button></div>
        <div class="small muted" style="margin-top:var(--s3)">${n?"Best with the phone sideways.":"Esc pauses at any time."}</div></div>`,{start:()=>this.app.resume(),skip:()=>this.skipTutorial()});return}let a=`<div class="keys" style="margin-top:var(--s4);text-align:left">${(n?[["Left thumb","Move"],["Right thumb","Look"],["SHOOT","Hold & release"],["PASS","To the ring"],["TACKLE","Win it back"],["II","Pause"]]:[["WASD","Move"],["Mouse","Look"],["Shift","Sprint"],["Left click","Shoot"],["Right click","Pass"],["E / C","Tackle / slide"]]).map(([o,l])=>`<div class="key"><span class="kc">${o}</span><span>${l}</span></div>`).join("")}</div>`;this.show(`<div class="panel mid go-card">${i}<div class="go-big">${n?"Tap to play":"Click to play"}</div>
      ${e?a:`<div class="go-sub">${n?"Left thumb move \xB7 right thumb look":"WASD move \xB7 mouse look \xB7 Esc pause"}</div>`}</div>`,{},"screen center dim"),this.root.firstChild.addEventListener("click",()=>{this.sfx("uiConfirm",.3),this.app.resume()},{once:!0})}lockRefused(){this.current="lock",this.show(`<div class="panel narrow center-t"><div class="go-big" style="font-size:36px">Click to resume</div><p class="lead">The browser didn't capture the mouse. Click again, or play with drag-to-look.</p>
      <div class="actions mid"><button class="btn primary lg" data-act="r">Resume</button><button class="btn" data-act="d">Drag-look</button></div></div>`,{r:()=>this.app.resume(),d:()=>{this.app.input.dragMode=!0,this.app.resume()}})}};function c0(s){return s>120?`${s}\xB0 wide`:`${s}\xB0`}function Hr(s){return`${Math.round(s*100)}%`}var $c="firsttouch.career",h0="firsttouch.career.backup";function u0(s){let t=2166136261;for(let e=0;e<s.length;e++)t^=s.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0).toString(16)}function nM(s){return!(!s||typeof s!="object"||!s.player||typeof s.player.name!="string"||!s.player.attrs||!Qt(s.clubId)||!s.season||!Array.isArray(s.season.fixtures)||!Array.isArray(s.season.table)||!s.totals||!Array.isArray(s.timeline)||!Array.isArray(s.committed))}function sM(s,t){return t<2&&(s.flags=s.flags||{},s.earnings=s.earnings||0,s.trophies=s.trophies||[]),s.version=Ba,s}function xd(s){let t=JSON.parse(s);if(!t||typeof t.data!="string"||u0(t.data)!==t.sum)throw new Error("checksum mismatch");let e=t.data;for(let[a,o]of Object.entries(rd))e=e.split(`"${a}"`).join(`"${o}"`);let i=JSON.parse(e),n=t.version||1;if(n>Ba)throw new Error("save from a newer version");let r=sM(i,n);if(!nM(r))throw new Error("invalid career data");return r}var Xc=class{constructor(){this.career=null,this.notice=null,this.load()}load(){let t=null;try{t=di.getItem($c)}catch{this.notice={bad:!0,text:"Saving is unavailable in this browser (storage blocked). Progress will not persist."};return}if(t)try{this.career=xd(t)}catch{let i=null;try{i=di.getItem(h0)}catch{}try{if(!i)throw new Error("no backup");this.career=xd(i),this.notice={bad:!0,text:"Your career save was damaged, so the backup copy was restored."},this.save()}catch{this.career=null,this.corrupt=t,this.notice={bad:!0,text:"Your career save was damaged and no usable backup exists. Start a new career to continue."}}}}save(){if(!this.career)return{ok:!1,error:"no career"};try{let t=JSON.stringify(this.career),e=JSON.stringify({version:Ba,savedAt:Date.now(),sum:u0(t),data:t}),i=di.getItem($c);if(i)try{xd(i),di.setItem(h0,i)}catch{}return di.setItem($c,e),{ok:!0}}catch(t){return{ok:!1,error:t&&(t.name==="QuotaExceededError"||/dataLimitExc/i.test(t.code||t.message||""))?"The save storage is full.":"Saving is unavailable right now."}}}set(t){return this.career=t,this.save()}erase(){this.career=null;try{di.removeItem($c)}catch{}}};var vd=class{constructor(){let t=document.createElement("style");t.textContent=Cd,document.head.appendChild(t),this.params=new URLSearchParams(location.search),this.coarse=!!(window.matchMedia&&matchMedia("(pointer: coarse)").matches),this.settings=km(this.coarse),this.coarse&&!Lm()&&(this.settings.quality="medium"),this.canvas=document.getElementById("game"),this.uiRoot=document.getElementById("ui"),this.view=new Tc(this.canvas,{quality:this.settings.quality,preserve:this.params.has("preserve")}),this.view.setQuality(this.settings.quality),this.style=this.params.get("style")||Dm(),this.view.setStyle(this.style),this.audio=new Ec,this.audio.setVolumes({master:this.settings.master,sfx:this.settings.sfx,crowd:this.settings.crowd}),this.input=new Rc(this.canvas),this.input.sensitivity=this.settings.sensitivity,this.input.invertY=this.settings.invertY,this.hud=new Cc(this.uiRoot),this.touch=new Ic(this,this.uiRoot),this.setTouchMode(this.settings.touch==="on"||this.settings.touch!=="off"&&this.coarse),window.addEventListener("pointerdown",r=>{this.settings.touch==="auto"&&(r.pointerType==="touch"&&!this.input.touchMode?this.setTouchMode(!0):r.pointerType==="mouse"&&this.input.touchMode&&!this.input.fromTouch(r)&&this.setTouchMode(!1))},!0),this.store=new Xc,this.screens=new Wc(this),this.session=null,this.menuSession=null,this.paused=!1,this.last=performance.now(),this.fpsCap=Number(this.params.get("fps")||0),this.frameAcc=0,this.adapt={on:this.params.has("adapt")||!navigator.webdriver&&!this.fpsCap,ema:1/60,scale:1,floor:.5,low:0,high:0,check:null},this.input.onPause=()=>this.togglePause(),this.input.onLockLost=()=>{this.session&&!this.paused&&this.pause(document.hasFocus()?"user":"blur")},this.input.onLockGained=()=>{this.session&&this.awaitingLock&&this.unpause()},this.input.onLockError=()=>{this.session&&this.awaitingLock&&(this.awaitingLock=!1,this.screens.lockRefused())},document.addEventListener("visibilitychange",()=>{document.hidden?this.onBlur():this.onFocus()}),window.addEventListener("blur",()=>this.onBlur()),window.addEventListener("focus",()=>this.onFocus()),window.addEventListener("resize",()=>this.view.resize());let e=()=>{this.audio.init(),(!this.paused||!this.session)&&this.audio.resume()};for(let r of["pointerdown","pointerup","touchend","click","keydown"])window.addEventListener(r,e,{capture:!0});document.addEventListener("gesturestart",r=>r.preventDefault()),document.addEventListener("contextmenu",r=>{r.target.closest&&r.target.closest("input")||r.preventDefault()}),this.platform=$i,$i.onMute(r=>this.audio.setPlatformMute(r)),document.getElementById("boot")?.remove();let i=this.params.get("auto");!i&&!o0()&&(!navigator.webdriver||this.params.has("tutorial"))?this.screens.startTutorial({first:!0}):(this.startMenuBackground(),this.screens.mainMenu()),requestAnimationFrame(r=>this.loop(r)),window.__ft=this,this.debugStep=r=>{let a=(this.session||this.menuSession).match;for(let o=0;o<r;o++)a.step(1/120)},i&&setTimeout(()=>this.autostart(i),50)}autostart(t){let e=this.params.get("half")?Number(this.params.get("half")):void 0;e&&(this.testHalf=e),t==="quick"?this.startQuickMatch({home:this.params.get("home")||"swindon",away:this.params.get("away")||"chesterfield",role:this.params.get("role")||"ST",venue:this.params.get("venue"),halfLength:e}):t==="practice"?this.startTraining("practice"):t==="tutorial"?this.screens.startTutorial():t.startsWith("drill:")?this.startTraining(t.slice(6)):t==="hub"&&this.screens.hub()}loop(t){requestAnimationFrame(r=>this.loop(r));let e=(t-this.last)/1e3;if(this.adaptResolution(e),this.fpsCap){if(this.frameAcc+=e,this.last=t,this.frameAcc<1/this.fpsCap)return;e=this.frameAcc,this.frameAcc=0}else this.last=t;e=Math.min(e,.1);let i=this.session||this.menuSession;i&&i.frame(this.paused&&this.session?0:e);let n=!!(this.session&&this.session.human&&!this.paused&&!this.session.ended&&!this.session.replay);this.touch.setVisible(this.input.touchMode&&n),this.touch.visible&&this.touch.update(this.session),this.updatePlatform(),this.onFrame&&this.onFrame(e)}updatePlatform(){$i.setGameplay(!!this.session&&!this.session.ended&&(!this.paused||this.pausedByBlur))}adaptResolution(t){let e=this.adapt;if(!e.on||t<=0||t>.5)return;if(!!!(this.session&&!this.paused&&!document.hidden)){e.low=0,e.high=0,e.check=null;return}if(e.ema+=(t-e.ema)*.06,e.floorT=(e.floorT||0)+t,e.floor>.5&&e.floorT>30&&(e.floor=.5),e.check){e.check.t+=t,e.check.t>2&&(e.ema>e.check.before*.92&&(e.floor=e.check.prev,e.floorT=0,e.scale=e.check.prev,this.view.setResolutionScale(e.scale)),e.check=null);return}if(e.ema>1/42?(e.low+=t,e.high=0):e.ema<1/56?(e.high+=t,e.low=0):(e.low=0,e.high=0),e.low>1.5&&e.scale>e.floor+.01){let n=e.scale;e.scale=Math.max(e.floor,e.scale*.85),this.view.setResolutionScale(e.scale),e.check={before:e.ema,prev:n,t:0},e.low=0}else e.high>6&&e.scale<1&&(e.scale=Math.min(1,e.scale*1.12),this.view.setResolutionScale(e.scale),e.high=0)}setTouchMode(t){this.input.touchMode=t,document.documentElement.dataset.touch=t?"1":"0",t||this.touch.setVisible(!1)}tryFullscreen(){if(!this.input.touchMode||document.fullscreenElement||this.params.has("nofs")||$i.active)return;let t=document.documentElement;try{let e=t.requestFullscreen&&t.requestFullscreen({navigationUI:"hide"});e&&e.then&&e.then(()=>{try{let i=screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape");i&&i.catch&&i.catch(()=>{})}catch{}}).catch(()=>{})}catch{}}startMenuBackground(t="town"){if(this.menuSession)return;let e=Qt("bradford"),i=Qt("barnsley"),n=Tr(e,i),r={mode:"menu",venue:t,venueOpts:{homeName:e.name},colours:{kits:n,human:zs().look},match:{seed:99,halfLength:1e5,difficulty:"standard",teams:[Fa(e),Fa(i)]}};this.menuSession=new Ua(this,r),this.menuSession.cam.radius=60,this.menuSession.cam.height=24,this.menuSession.start()}stopMenuBackground(){this.menuSession&&(this.menuSession.dispose(),this.menuSession=null)}matchConfig({homeClub:t,awayClub:e,human:i,humanSide:n=0,seed:r=1,halfLength:a,difficulty:o,strengths:l}){let c=Tr(t,e),h=Fa(t,{human:n===0?i:null,strength:l&&l[0]}),u=Fa(e,{human:n===1?i:null,strength:l&&l[1]});return{kits:c,match:{seed:r,halfLength:a||$l[this.settings.matchLength]||180,difficulty:o||this.settings.difficulty,teams:[h,u]}}}startSession(t){return this.stopMenuBackground(),this.session&&this.session.dispose(),this.screens.clear(),this.session=new Ua(this,t),this.hud.show(!0),this.session.start(),this.paused=!0,this.session.setPaused(!0),this.input.active=!0,this.screens.clickToPlay(),this.session}endSession(){this.session&&this.session.dispose(),this.session=null,this.paused=!1,this.input.active=!1,this.input.exitLock(),this.hud.show(!1),this.startMenuBackground()}startQuickMatch(t){let e=Qt(t.home)||ni[0],i=Qt(t.away)||ni[1],n=this.store.career,r={...n?n.player:zs()};t.role&&(r.role=t.role);let a=t.side||0,o=this.params.get("seed")?Number(this.params.get("seed")):(Date.now()&65535)+1,l=this.matchConfig({homeClub:e,awayClub:i,human:r,humanSide:a,seed:o,halfLength:t.halfLength}),c=t.venue||Wi(e.tier).venue;return this.startSession({mode:"quick",venue:c,venueOpts:{homeName:e.name},colours:{kits:l.kits,human:r.look},match:l.match,onEnd:h=>this.screens.report(h,{quick:!0})})}startTraining(t){return this.screens.startDrill(t)}playCareerMatch(){let t=this.store.career,e=Ym(t);if(!e)return;let i=e.fx,n=Qt(i.home),r=Qt(i.away),a=i.home===t.clubId?0:1,o={...t.player},l=this.matchConfig({homeClub:n,awayClub:r,human:o,humanSide:a,seed:wn(`${t.seed}:${t.seasonNo}:${i.round}:${e.id}`),halfLength:this.testHalf}),c=i.final?"continental":Wi(n.tier).venue,h=e.id;return this.startSession({mode:"career",venue:c,venueOpts:{homeName:n.name,final:!!i.final},final:i.final?i.name:null,title:i.final?`${i.name}: ${n.name} v ${r.name}`:`${Wi(n.tier).league} \xB7 Round ${i.round}: ${n.name} v ${r.name}`,colours:{kits:l.kits,human:o.look},match:l.match,onEnd:u=>this.screens.report(u,{career:!0,matchId:h,fx:i,title:i.final?"Continental Cup Final":`Round ${i.round} report`})})}togglePause(){if(!this.session){this.screens.back();return}this.paused?this.resume():this.pause()}pause(t="user"){!this.session||this.session.ended||(this.paused=!0,this.pausedByBlur=t==="blur",this.session.setPaused(!0),this.input.releaseAll(),this.touch.setVisible(!1),this.input.exitLock(),this.audio.suspend(),this.screens.pauseMenu())}resume(){if(!this.session)return;if(this.input.active=!0,this.input.touchMode){this.tryFullscreen(),this.unpause();return}if(this.input.dragMode||this.input.locked){this.unpause();return}if(this.screens.clear(),this.awaitingLock=!0,!this.input.requestLock()){this.awaitingLock=!1,this.unpause();return}clearTimeout(this.lockTimer),this.lockTimer=setTimeout(()=>{this.awaitingLock&&!this.input.locked&&(this.awaitingLock=!1,this.screens.lockRefused())},1500)}unpause(){this.awaitingLock=!1,this.pausedByBlur=!1,this.screens.clear(),this.paused=!1,this.session&&this.session.setPaused(!1),this.audio.resume()}onBlur(){this.audio.setMuted(!0),this.session&&!this.paused&&!this.session.ended&&this.pause("blur")}onFocus(){this.audio.setMuted(!1),this.paused&&this.audio.suspend()}applySettings(){let t=this.settings,e=t.touch==="on"||t.touch!=="off"&&(this.coarse||this.input.touchMode);if(e!==this.input.touchMode&&this.setTouchMode(e),this.input.sensitivity=t.sensitivity,this.input.invertY=t.invertY,this.audio.setVolumes({master:t.master,sfx:t.sfx,crowd:t.crowd}),this.view.quality!==t.quality){this.view.setQuality(t.quality),this.view.venueKey=null;let i=this.session||this.menuSession;i&&this.view.setVenue(i.cfg.venue,i.cfg.venueOpts||{}),this.view.match&&this.view.rebuildCharacters()}Nm(t)||this.screens.toast("Settings could not be saved (storage unavailable).",!0)}setStyle(t){this.style=t,this.view.setStyle(t),Om(t)}};async function d0(){await $i.init(),$i.loadingStart();try{new vd}catch(s){console.error(s);let t=document.getElementById("boot");t&&(t.textContent="First Touch could not start: "+s.message+" (a browser with WebGL2 is required).")}$i.loadingStop()}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",d0):d0();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
