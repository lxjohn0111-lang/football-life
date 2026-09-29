/* First Touch - bundled game. three.js is MIT licensed (see vendor/three/LICENSE). */
(()=>{var Qu=`/* First Touch UI. Two themes selected by html[data-style]:
   classic = paper panels, thin ink borders, clear black type
   neo     = 3px borders, hard offset shadows, saturated colour */
:root {
  --ink: #161616; --paper: #faf8f1; --paper2: #f1eee4; --muted: #6b6a64; --accent: #161616; --accent-ink: #faf8f1;
  --good: #1c7c3c; --bad: #b3261e; --line: 1.5px; --shadow: 0 1px 0 rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08);
  --radius: 3px; --font: "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif; --display: Georgia, "Times New Roman", serif;
  --hl: #efe6c8; --bar: #161616; --barbg: #e4e0d4;
}
html[data-style="neo"] {
  --ink: #000; --paper: #fffdf5; --paper2: #fff1a8; --muted: #333; --accent: #ff4fa3; --accent-ink: #000;
  --good: #00b050; --bad: #ff2d2d; --line: 3px; --shadow: 6px 6px 0 #000; --radius: 0px;
  --font: "Arial Black", "Helvetica Neue", Arial, system-ui, sans-serif; --display: "Arial Black", Impact, sans-serif;
  --hl: #3ee0ff; --bar: #000; --barbg: #fff;
}
#ui { position: fixed; inset: 0; pointer-events: none; font-family: var(--font); color: var(--ink); z-index: 10; }
#ui * { box-sizing: border-box; }
html, body { overscroll-behavior: none; }
#game { touch-action: none; }
#ui { -webkit-tap-highlight-color: transparent; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }
#ui input, #ui select { -webkit-user-select: text; user-select: text; }
.hidden { display: none !important; }
.screen { position: absolute; inset: 0; pointer-events: auto; display: flex; overflow: auto; }
.screen { touch-action: pan-x pan-y; }
/* centred when it fits, scrollable from the top when it doesn't (short phone screens) */
.screen.center { align-items: flex-start; justify-content: flex-start; padding: 12px; }
.screen.center > .panel { margin: auto; max-width: 100%; }
.dim { background: rgba(242,241,234,0.72); }
html[data-style="neo"] .dim { background: rgba(0, 190, 255, 0.35); }

.panel { background: var(--paper); border: var(--line) solid var(--ink); border-radius: var(--radius); box-shadow: var(--shadow); padding: 18px 22px; }
.panel h2 { font-family: var(--display); margin: 0 0 12px; font-size: 26px; letter-spacing: 0.5px; }
.panel h3 { margin: 14px 0 8px; font-size: 15px; text-transform: uppercase; letter-spacing: 1px; }
html[data-style="neo"] .panel h3 { background: var(--ink); color: #fff; display: inline-block; padding: 3px 8px; }
.muted { color: var(--muted); }
.small { font-size: 12px; }

.btn { font: inherit; font-weight: 700; font-size: 15px; color: var(--ink); background: var(--paper); border: var(--line) solid var(--ink); border-radius: var(--radius); padding: 10px 16px; cursor: pointer; text-align: left; transition: transform .06s, background .1s; }
.btn:hover { background: var(--hl); }
.btn:active { transform: translateY(1px); }
.btn:disabled { opacity: 0.4; cursor: default; }
.btn.primary { background: var(--accent); color: var(--accent-ink); }
html[data-style="classic"] .btn.primary:hover { background: #333; }
html[data-style="neo"] .btn { box-shadow: 4px 4px 0 #000; text-transform: uppercase; }
html[data-style="neo"] .btn:hover { transform: translate(-1px,-1px); box-shadow: 5px 5px 0 #000; }
html[data-style="neo"] .btn:active { transform: translate(3px,3px); box-shadow: 1px 1px 0 #000; }
.btn.big { font-size: 20px; padding: 14px 22px; }
.btn.huge { font-size: 26px; padding: 18px 28px; text-align: center; }
.btn.danger { border-color: var(--bad); color: var(--bad); }
.row { display: flex; gap: 12px; align-items: center; }
.col { display: flex; flex-direction: column; gap: 10px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.spacer { flex: 1; }

/* main menu */
.menu { padding: 5vh 6vw; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; }
.title { font-family: var(--display); font-size: clamp(44px, 7vw, 92px); line-height: 0.95; margin: 0 0 6px; letter-spacing: -1px; }
html[data-style="classic"] .title { font-style: italic; }
html[data-style="neo"] .title { background: #ffe45c; border: 3px solid #000; box-shadow: 8px 8px 0 #000; padding: 6px 16px; text-transform: uppercase; }
.subtitle { font-size: 15px; margin-bottom: 18px; }
html[data-style="neo"] .subtitle { background: #fff; border: 3px solid #000; padding: 4px 10px; }
.menu .btn { width: min(360px, 80vw); }
.menu .btn small { display: block; font-weight: 400; font-size: 12px; opacity: 0.75; text-transform: none; }

/* forms */
label.f { display: flex; flex-direction: column; gap: 4px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; }
input, select { font: inherit; font-size: 15px; padding: 7px 9px; border: var(--line) solid var(--ink); border-radius: var(--radius); background: #fff; color: #111; }
input[type=range] { padding: 0; border: none; background: transparent; accent-color: var(--ink); }
input[type=color] { padding: 0; width: 44px; height: 32px; }
.seg { display: flex; flex-wrap: wrap; gap: 6px; }
.seg .btn { padding: 7px 10px; font-size: 13px; }
.seg .btn.on { background: var(--ink); color: var(--paper); }
html[data-style="neo"] .seg .btn.on { background: #3ee0ff; color: #000; }

/* tables */
table.t { border-collapse: collapse; width: 100%; font-size: 14px; }
table.t th, table.t td { padding: 6px 8px; border-bottom: 1px solid rgba(0,0,0,0.15); text-align: left; }
table.t th { font-size: 11px; text-transform: uppercase; letter-spacing: .6px; }
table.t tr.me td { background: var(--hl); font-weight: 700; }
table.t td.n, table.t th.n { text-align: right; }

.bar { height: 10px; background: var(--barbg); border: 1px solid var(--ink); position: relative; }
html[data-style="neo"] .bar { border-width: 2px; height: 14px; }
.bar > i { position: absolute; left: 0; top: 0; bottom: 0; background: var(--bar); }
.bar.good > i { background: var(--good); }
.pill { display: inline-block; padding: 2px 8px; border: 1px solid var(--ink); border-radius: 20px; font-size: 11px; font-weight: 700; }
html[data-style="neo"] .pill { border-width: 2px; border-radius: 0; background: #ffe45c; }

/* hub */
.hub { padding: 22px 28px; flex-direction: column; gap: 14px; background: var(--paper2); }
html[data-style="neo"] .hub { background: #7fe0ff; }
.hub-head { display: flex; gap: 16px; align-items: center; }
.hub-head h1 { margin: 0; font-family: var(--display); font-size: 32px; }
.hub-grid { display: grid; grid-template-columns: 1.15fr 1fr 1fr; gap: 16px; align-items: start; }
@media (max-width: 1100px) { .hub-grid { grid-template-columns: 1fr 1fr; } }
.attr { display: grid; grid-template-columns: 110px 1fr 34px 30px; align-items: center; gap: 8px; font-size: 13px; margin: 5px 0; }
.attr .btn { padding: 1px 7px; font-size: 13px; text-align: center; }
.form-dots { display: flex; gap: 4px; }
.form-dots span { width: 34px; text-align: center; font-size: 12px; font-weight: 700; border: 1px solid var(--ink); padding: 3px 0; }
.form-dots span.hi { background: var(--good); color: #fff; }
.form-dots span.lo { background: var(--bad); color: #fff; }
.timeline { max-height: 220px; overflow: auto; font-size: 13px; }
.timeline div { padding: 3px 0; border-bottom: 1px dashed rgba(0,0,0,0.2); }
.offer { border: var(--line) solid var(--ink); padding: 10px 12px; margin: 8px 0; background: #fff; }
html[data-style="neo"] .offer { box-shadow: 4px 4px 0 #000; }
.crest { vertical-align: middle; }
.next-fixture { display: flex; align-items: center; gap: 14px; font-size: 20px; font-weight: 700; margin: 8px 0 14px; }

/* report */
.report { max-width: 980px; width: 94vw; }
.big-score { font-family: var(--display); font-size: 44px; text-align: center; margin: 6px 0; }
.rating-big { font-size: 56px; font-weight: 900; font-family: var(--display); }
html[data-style="neo"] .rating-big { background: #ffe45c; border: 3px solid #000; padding: 0 12px; box-shadow: 4px 4px 0 #000; }
.statgrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.stat { border: 1px solid var(--ink); padding: 8px; }
html[data-style="neo"] .stat { border-width: 3px; background: #fff; }
.stat b { display: block; font-size: 22px; }
.stat span { font-size: 11px; text-transform: uppercase; letter-spacing: .5px; }
.why .plus { color: var(--good); } .why .minus { color: var(--bad); }

/* style previews */
.previews { display: flex; gap: 18px; flex-wrap: wrap; }
.preview { width: 360px; cursor: pointer; }
.preview img { width: 100%; display: block; border: var(--line) solid var(--ink); }
.preview.on { outline: 4px solid var(--accent); outline-offset: 3px; }

/* toast */
.toast { position: absolute; left: 50%; bottom: 28px; transform: translateX(-50%); pointer-events: auto; padding: 10px 16px; background: var(--paper); border: var(--line) solid var(--ink); box-shadow: var(--shadow); font-weight: 700; z-index: 50; }
.toast.bad { border-color: var(--bad); color: var(--bad); }

/* ------------------------------------------------------------- HUD */
.hud { position: absolute; inset: 0; pointer-events: none; }
.hud-top { position: absolute; top: 14px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 0; background: var(--paper); border: var(--line) solid var(--ink); box-shadow: var(--shadow); font-weight: 900; }
.hud-team { padding: 6px 12px; font-size: 16px; border-left: 6px solid var(--kit, #888); }
.hud-team:last-child { border-left: none; border-right: 6px solid var(--kit, #888); }
.hud-score { padding: 6px 14px; font-size: 22px; background: var(--ink); color: var(--paper); font-family: var(--display); }
html[data-style="neo"] .hud-score { background: #ffe45c; color: #000; border-left: 3px solid #000; border-right: 3px solid #000; }
.hud-clock { position: absolute; top: 56px; left: 50%; transform: translateX(-50%); font-weight: 700; font-size: 14px; background: var(--paper); border: 1px solid var(--ink); padding: 1px 8px; }
html[data-style="neo"] .hud-clock { border-width: 3px; top: 60px; }
.hud-phase { position: absolute; top: 80px; left: 50%; transform: translateX(-50%); font-size: 10px; font-weight: 700; letter-spacing: 1px; opacity: .7; }
.hud-player { position: absolute; top: 14px; left: 14px; background: var(--paper); border: var(--line) solid var(--ink); box-shadow: var(--shadow); padding: 6px 10px; min-width: 150px; }
.hud-rating { font-size: 28px; font-weight: 900; font-family: var(--display); line-height: 1; }
.hud-rating-label { font-size: 9px; letter-spacing: 1px; font-weight: 700; }
.hud-stamina { height: 6px; background: var(--barbg); border: 1px solid var(--ink); margin-top: 6px; }
.hud-stamina-fill { height: 100%; background: var(--good); }
.hud-stamina-fill.low { background: var(--bad); }
.hud-name { font-size: 11px; margin-top: 4px; font-weight: 700; }
.hud-cross { position: absolute; left: 50%; top: 50%; width: 14px; height: 14px; transform: translate(-50%,-50%); }
.hud-cross::before, .hud-cross::after { content: ""; position: absolute; background: var(--ink); }
.hud-cross::before { left: 6px; top: 0; width: 2px; height: 14px; }
.hud-cross::after { top: 6px; left: 0; height: 2px; width: 14px; }
html[data-style="neo"] .hud-cross::before, html[data-style="neo"] .hud-cross::after { background: #fff; box-shadow: 0 0 0 1px #000; }
.hud-power { position: absolute; left: 50%; top: calc(50% + 22px); transform: translateX(-50%); width: 120px; height: 8px; border: 1.5px solid var(--ink); background: rgba(255,255,255,0.6); }
.hud-power-fill { height: 100%; background: var(--ink); }
html[data-style="neo"] .hud-power-fill { background: #ff4fa3; }
.hud-hint { position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%); font-size: 13px; font-weight: 700; background: var(--paper); border: 1px solid var(--ink); padding: 4px 10px; white-space: nowrap; }
.hud-hint:empty { display: none; }
html[data-style="neo"] .hud-hint { border-width: 3px; box-shadow: 4px 4px 0 #000; }
.hud-notes { position: absolute; top: 104px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 5px; }
.hud-note { font-weight: 900; font-size: 15px; letter-spacing: 1px; padding: 3px 10px; background: var(--paper); border: 1px solid var(--ink); animation: noteIn .18s ease-out; transition: opacity .35s, transform .35s; }
.hud-note.good { background: var(--good); color: #fff; }
.hud-note.bad { background: var(--bad); color: #fff; }
.hud-note.out { opacity: 0; transform: translateY(-8px); }
html[data-style="neo"] .hud-note { border-width: 3px; box-shadow: 4px 4px 0 #000; }
@keyframes noteIn { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.hud-arrow { position: absolute; width: 0; height: 0; border-top: 11px solid transparent; border-bottom: 11px solid transparent; border-left: 20px solid var(--ink); opacity: 0.75; }
html[data-style="neo"] .hud-arrow { border-left-color: #ff4fa3; opacity: 1; }
.hud-radar { position: absolute; right: 14px; bottom: 14px; width: 140px; height: 194px; border: var(--line) solid var(--ink); box-shadow: var(--shadow); }
.hud-banner { position: absolute; top: 32%; left: 50%; transform: translate(-50%,-50%); text-align: center; background: var(--paper); border: var(--line) solid var(--ink); box-shadow: var(--shadow); padding: 12px 28px; animation: bannerIn .25s ease-out; }
.hud-banner .b-main { font-family: var(--display); font-size: 48px; font-weight: 900; letter-spacing: 2px; }
.hud-banner .b-sub { font-size: 15px; font-weight: 700; margin-top: 4px; }
.hud-banner.mine .b-main { color: var(--good); }
html[data-style="neo"] .hud-banner { background: #ffe45c; transform: translate(-50%,-50%) rotate(-2deg); }
html[data-style="neo"] .hud-banner.mine { background: #ff4fa3; }
@keyframes bannerIn { from { transform: translate(-50%,-50%) scale(0.6); opacity: 0; } }
/* possession: the screen edge pulses green while the player has the ball */
.hud-poss { position: absolute; inset: 0; opacity: 0; transition: opacity .18s ease-out; box-shadow: inset 0 0 0 5px rgba(16,140,58,0.95); }
.hud-poss::before { content: ""; position: absolute; inset: 0; box-shadow: inset 0 0 60px 26px rgba(12,168,64,0.7); animation: possPulse 1s ease-in-out infinite alternate; }
.hud-poss.on { opacity: 1; }
.hud-poss-label { position: absolute; left: 50%; bottom: 58px; transform: translateX(-50%); font-weight: 900; font-size: 15px; letter-spacing: 2px; color: #fff; background: #1a9a48; border: 1px solid #0d5e2a; padding: 4px 14px; white-space: nowrap; animation: possLabel 1s ease-in-out infinite alternate; }
.hud-poss.on .hud-poss-label { animation: possIn .22s ease-out, possLabel 1s ease-in-out .22s infinite alternate; }
html[data-style="neo"] .hud-poss { box-shadow: inset 0 0 0 9px #00d65c, inset 0 0 0 12px #000; }
html[data-style="neo"] .hud-poss::before { box-shadow: inset 0 0 0 22px rgba(0,214,92,0.45); }
html[data-style="neo"] .hud-poss-label { background: #00d65c; color: #000; border: 3px solid #000; box-shadow: 4px 4px 0 #000; font-size: 17px; bottom: 64px; }
@keyframes possPulse { from { opacity: 0.3; } to { opacity: 1; } }
@keyframes possLabel { from { transform: translateX(-50%) scale(1); } to { transform: translateX(-50%) scale(1.06); } }
@keyframes possIn { from { transform: translateX(-50%) scale(0.6); opacity: 0; } to { transform: translateX(-50%) scale(1); opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .hud-poss::before, .hud-poss-label, .hud-poss.on .hud-poss-label { animation: none; }
  .hud-poss::before { opacity: 0.8; }
}
.hud-fade { position: absolute; inset: 0; background: var(--paper); opacity: 0; }
.hud-fade.on { animation: fadeFlash .45s ease-out; }
@keyframes fadeFlash { 0% { opacity: 1; } 100% { opacity: 0; } }
.pausebar { position: absolute; top: 0; left: 0; right: 0; }
.lockmsg { font-size: 18px; font-weight: 700; }


/* ------------------------------------------------------------- touch controls */
.touch { position: absolute; inset: 0; pointer-events: auto; touch-action: none; }
.tc-zone { position: absolute; inset: 0; }
.tc-stick { position: absolute; width: 0; height: 0; pointer-events: none; }
.tc-stick::before { content: ""; position: absolute; width: var(--stick, 124px); height: var(--stick, 124px); left: calc(var(--stick, 124px) / -2); top: calc(var(--stick, 124px) / -2); border-radius: 50%; border: 2px solid rgba(22,22,22,0.55); background: rgba(250,248,241,0.18); }
.tc-knob { position: absolute; width: 56px; height: 56px; left: -28px; top: -28px; border-radius: 50%; background: rgba(250,248,241,0.85); border: 2px solid #161616; }
.tc-stick.idle { left: calc(96px + env(safe-area-inset-left, 0px)); top: calc(100% - 104px - env(safe-area-inset-bottom, 0px)); opacity: 0.45; }
.tc-stick.sprint .tc-knob { background: #1a9a48; }
.tc-btn { position: absolute; border-radius: 50%; border: 2px solid #161616; background: rgba(250,248,241,0.82); color: #161616; font: 900 13px/1 var(--font); letter-spacing: .5px; display: flex; align-items: center; justify-content: center; padding: 0; touch-action: none; transition: transform .06s, opacity .15s; }
.tc-btn.down { transform: scale(0.92); background: #161616; color: #faf8f1; }
.tc-btn.off { opacity: 0; pointer-events: none; }
.tc-btn.cool { opacity: 0.45; }
.tc-a { --s: clamp(66px, 21vh, 92px); width: var(--s); height: var(--s); right: calc(22px + env(safe-area-inset-right, 0px)); bottom: calc(24px + env(safe-area-inset-bottom, 0px)); font-size: 15px; }
.tc-b { --s: clamp(54px, 16vh, 72px); width: var(--s); height: var(--s); right: calc(22px + clamp(66px, 21vh, 92px) + 14px + env(safe-area-inset-right, 0px)); bottom: calc(18px + env(safe-area-inset-bottom, 0px)); }
.tc-c { --s: clamp(50px, 15vh, 64px); width: var(--s); height: var(--s); right: calc(22px + env(safe-area-inset-right, 0px) + clamp(8px, 2vh, 14px)); bottom: calc(24px + clamp(66px, 21vh, 92px) + 12px + env(safe-area-inset-bottom, 0px)); font-size: 12px; }
.tc-pause { position: absolute; left: calc(10px + env(safe-area-inset-left, 0px)); top: calc(10px + env(safe-area-inset-top, 0px)); width: 42px; height: 42px; border-radius: 8px; border: 2px solid #161616; background: rgba(250,248,241,0.85); display: flex; gap: 6px; align-items: center; justify-content: center; padding: 0; }
.tc-pause i { display: block; width: 5px; height: 16px; background: #161616; }
.tc-rotate { display: none; position: absolute; left: 50%; top: calc(96px + env(safe-area-inset-top, 0px)); transform: translateX(-50%); font-size: 12px; font-weight: 700; padding: 4px 10px; background: var(--paper); border: 1px solid var(--ink); white-space: nowrap; pointer-events: none; }
@media (orientation: portrait) { .tc-rotate { display: block; } }
html[data-style="neo"] .tc-btn { border-width: 3px; border-color: #000; background: #ffe45c; color: #000; box-shadow: 4px 4px 0 #000; }
html[data-style="neo"] .tc-a { background: #ff4fa3; }
html[data-style="neo"] .tc-c { background: #3ee0ff; }
html[data-style="neo"] .tc-btn.down { transform: translate(3px,3px); box-shadow: 1px 1px 0 #000; background: #000; color: #fff; }
html[data-style="neo"] .tc-knob { background: #ffe45c; border: 3px solid #000; }
html[data-style="neo"] .tc-stick::before { border: 3px solid #000; background: rgba(255,255,255,0.25); }
html[data-style="neo"] .tc-stick.sprint .tc-knob { background: #00d65c; }
html[data-style="neo"] .tc-pause { border: 3px solid #000; background: #fff; box-shadow: 3px 3px 0 #000; border-radius: 0; }
html[data-style="neo"] .tc-rotate { border-width: 3px; }

/* HUD with touch controls: pause top-left, compact player card, radar top-right,
   the bottom corners belong to the thumbs */
html[data-touch="1"] .hud-player { left: calc(62px + env(safe-area-inset-left, 0px)); top: calc(10px + env(safe-area-inset-top, 0px)); min-width: 0; padding: 4px 8px; }
html[data-touch="1"] .hud-rating { font-size: 20px; }
html[data-touch="1"] .hud-name { display: none; }
html[data-touch="1"] .hud-radar { top: calc(10px + env(safe-area-inset-top, 0px)); right: calc(10px + env(safe-area-inset-right, 0px)); bottom: auto; width: 76px; height: 105px; }
html[data-touch="1"] .hud-hint { bottom: calc(10px + env(safe-area-inset-bottom, 0px)); font-size: 12px; max-width: 42vw; white-space: normal; text-align: center; }
html[data-touch="1"] .hud-poss-label { bottom: calc(46px + env(safe-area-inset-bottom, 0px)); font-size: 12px; letter-spacing: 1px; }
html[data-touch="1"] .hud-power { width: 96px; }
html[data-touch="1"] .hud-arrow { opacity: 0.6; }

/* ------------------------------------------------------------- small screens */
@media (hover: none) {
  .btn:hover { background: var(--paper); }
  .btn.primary:hover, html[data-style="classic"] .btn.primary:hover { background: var(--accent); }
  html[data-style="neo"] .btn:hover { transform: none; box-shadow: 4px 4px 0 #000; }
}
@media (pointer: coarse) {
  #ui input, #ui select { font-size: 16px; } /* keeps iOS from zooming into fields */
  .seg .btn { padding: 9px 12px; }
}
@media (max-height: 520px) {
  .hud-top { top: 8px; }
  .hud-team { padding: 4px 8px; font-size: 13px; }
  .hud-score { padding: 4px 10px; font-size: 17px; }
  .hud-clock { top: 42px; font-size: 12px; }
  html[data-style="neo"] .hud-clock { top: 44px; }
  .hud-phase { top: 62px; }
  .hud-notes { top: 78px; }
  .hud-note { font-size: 13px; }
  .hud-banner .b-main { font-size: 30px; }
  .hud-banner { padding: 8px 18px; }
}
/* short landscape phones: the main menu becomes two columns of compact buttons */
@media (max-height: 560px) and (orientation: landscape) {
  .menu { flex-direction: row; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px 28px; padding: 14px 4vw; }
  .menu-head { max-width: 34vw; }
  html[data-style="classic"] .menu-head { background: rgba(250,248,241,0.86); border: var(--line) solid var(--ink); padding: 8px 14px 10px; }
  .title { font-size: clamp(34px, 11vh, 60px); }
  .subtitle { font-size: 13px; margin-bottom: 0; }
  .menu-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .menu .btn { width: min(250px, 30vw); }
  .menu .btn.big { font-size: 15px; padding: 9px 12px; }
  .menu .btn small { display: none; }
  .panel { padding: 12px 14px; }
  .panel h2 { font-size: 21px; margin-bottom: 8px; }
}
.menu-buttons { display: flex; flex-direction: column; gap: 10px; }
@media (max-width: 700px) {
  .hub { padding: 12px; }
  .hub-grid, .grid2, .grid3 { grid-template-columns: 1fr; }
  .hub-head { flex-wrap: wrap; }
  .hub-head h1 { font-size: 22px; }
  .statgrid { grid-template-columns: repeat(2, 1fr); }
  .big-score { font-size: 30px; }
  .rating-big { font-size: 40px; }
  .panel { padding: 12px 14px; }
  .panel h2 { font-size: 21px; }
  .preview { width: 100%; }
  .row { flex-wrap: wrap; }
  .attr { grid-template-columns: 92px 1fr 30px 28px; }
  .next-fixture { font-size: 16px; flex-wrap: wrap; }
  table.t { font-size: 12px; }
  table.t th, table.t td { padding: 4px 5px; }
  .menu { padding: 4vh 5vw; }
  .menu .btn { width: min(360px, 90vw); }
}

/* narrow (portrait) touch screens: score and clock drop to a second row below
   the pause button, rating card and radar */
@media (max-width: 600px) {
  html[data-touch="1"] .hud-top { top: calc(62px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .hud-clock, html[data-style="neo"][data-touch="1"] .hud-clock { top: calc(102px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .hud-phase { top: calc(126px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .tc-rotate { top: calc(144px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .hud-notes { top: calc(176px + env(safe-area-inset-top, 0px)); }
  html[data-touch="1"] .hud-banner .b-main { font-size: 30px; }
}

/* ------------------------------------------------------------- tutorial */
.coach { position: absolute; top: calc(12px + env(safe-area-inset-top, 0px)); left: 50%; transform: translateX(-50%); width: min(560px, 92vw); background: var(--paper); border: var(--line) solid var(--ink); box-shadow: var(--shadow); padding: 9px 14px 10px; pointer-events: none; z-index: 5; }
.coach-head { display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 900; letter-spacing: 1.5px; }
.coach-name { background: var(--ink); color: var(--paper); padding: 2px 6px; white-space: nowrap; }
.coach-dots { display: flex; gap: 4px; flex: 1; flex-wrap: wrap; }
.coach-dots i { width: 9px; height: 9px; border-radius: 50%; border: 1.5px solid var(--ink); transition: background .2s; }
.coach-dots i.done { background: var(--good); border-color: var(--good); }
.coach-dots i.now { background: var(--ink); animation: dotPulse .8s ease-in-out infinite alternate; }
.coach-stars { color: #a87a00; font-size: 14px; white-space: nowrap; }
.coach-say { font-family: var(--display); font-size: 20px; font-weight: 700; margin-top: 6px; line-height: 1.2; }
.coach-say.pop { animation: coachPop .3s ease-out; }
.coach-hint { font-size: 13px; margin-top: 4px; color: var(--muted); font-weight: 700; }
.coach-hint.empty { display: none; }
.coach-foot { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
.coach-bar { flex: 1; height: 5px; background: var(--barbg); overflow: hidden; }
.coach-bar i { display: block; height: 100%; background: var(--ink); }
.coach-skip { pointer-events: auto; font: inherit; font-size: 12px; font-weight: 700; padding: 6px 10px; border: 1px solid var(--ink); background: var(--paper); color: var(--ink); cursor: pointer; border-radius: var(--radius); touch-action: manipulation; white-space: nowrap; }
@keyframes coachPop { from { transform: translateY(4px) scale(0.96); opacity: 0.2; } to { transform: none; opacity: 1; } }
@keyframes dotPulse { from { transform: scale(0.85); } to { transform: scale(1.15); } }
html[data-style="neo"] .coach { background: #fff; border-width: 3px; box-shadow: 6px 6px 0 #000; }
html[data-style="neo"] .coach-name { background: #ff4fa3; color: #000; border: 2px solid #000; }
html[data-style="neo"] .coach-dots i { border-width: 2px; border-color: #000; }
html[data-style="neo"] .coach-dots i.done { background: #00d65c; border-color: #000; }
html[data-style="neo"] .coach-dots i.now { background: #ffe45c; }
html[data-style="neo"] .coach-stars { color: #000; background: #ffe45c; border: 2px solid #000; padding: 0 5px; }
html[data-style="neo"] .coach-say { font-family: var(--font); }
html[data-style="neo"] .coach-bar { border: 2px solid #000; height: 9px; background: #fff; }
html[data-style="neo"] .coach-bar i { background: #3ee0ff; }
html[data-style="neo"] .coach-skip { border: 2px solid #000; box-shadow: 3px 3px 0 #000; text-transform: uppercase; background: #fff; }
/* the warm-up hides the match furniture; notes drop below the card */
.hud.tut .hud-top, .hud.tut .hud-clock, .hud.tut .hud-phase, .hud.tut .hud-player, .hud.tut .hud-hint, .hud.tut .hud-arrow { display: none; }
.tut-arrow { position: absolute; width: 0; height: 0; border-top: 16px solid transparent; border-bottom: 16px solid transparent; border-left: 30px solid #d9a400; filter: drop-shadow(0 0 1px #161616) drop-shadow(0 0 1px #161616); transform: translate(-50%,-50%) rotate(var(--rot, 0rad)); animation: tutArrow .6s ease-in-out infinite alternate; pointer-events: none; z-index: 4; }
html[data-style="neo"] .tut-arrow { border-left-color: #ffe45c; filter: drop-shadow(0 0 0 #000) drop-shadow(2px 2px 0 #000); }
@keyframes tutArrow { from { opacity: 0.55; } to { opacity: 1; } }
.hud.tut .hud-notes { top: 150px; }
html[data-touch="1"] .coach { top: calc(8px + env(safe-area-inset-top, 0px)); width: min(520px, calc(100vw - 210px)); }
@media (max-height: 520px) {
  .coach { padding: 6px 12px 8px; }
  .coach-say { font-size: 16px; margin-top: 4px; }
  .coach-hint { font-size: 12px; margin-top: 2px; }
  .coach-foot { margin-top: 5px; }
  .hud.tut .hud-notes { top: 132px; }
}
@media (max-width: 600px) {
  html[data-touch="1"] .coach { top: calc(62px + env(safe-area-inset-top, 0px)); width: calc(100vw - 20px); }
  html[data-touch="1"] .hud.tut .hud-notes { top: calc(222px + env(safe-area-inset-top, 0px)); }
}
@media (prefers-reduced-motion: reduce) { .coach-say.pop, .coach-dots i.now { animation: none; } }
.tut-badge { display: inline-block; font-size: 11px; font-weight: 900; letter-spacing: 2px; padding: 3px 8px; border: 1px solid var(--ink); margin-bottom: 8px; }
html[data-style="neo"] .tut-badge { background: #ffe45c; border: 2px solid #000; }
.tut-stars { font-size: 32px; letter-spacing: 3px; color: #a87a00; margin: 2px 0 4px; line-height: 1.1; word-break: break-all; }
html[data-style="neo"] .tut-stars { color: #ff4fa3; -webkit-text-stroke: 1px #000; }
.tut-card p { margin: 6px 0; }
`;var wd=0,sh=1,Td=2;var rh=0,to=1,Ed=2,lr=3,ai=0,Qe=1,Un=2,li=0,cr=1,oh=2,ah=3,lh=4,Ad=5;var vs=100,Rd=101,Cd=102,Pd=103,Id=104,Ld=200,Nd=201,Dd=202,kd=203,ch=204,hh=205,Ud=206,Od=207,Fd=208,zd=209,Bd=210,Hd=211,Gd=212,Vd=213,Wd=214,ta=0,ea=1,na=2,Js=3,ia=4,sa=5,ra=6,oa=7,uh=0,Xd=1,$d=2,$n=0,dh=1,fh=2,ph=3,mh=4,gh=5,xh=6,yh=7;var vh=300,qi=301,_s=302,La=303,Na=304,eo=306,aa=1e3,ei=1001,la=1002,ze=1003,qd=1004;var no=1005;var Xe=1006,Da=1007;var Yi=1008;var vn=1009,_h=1010,bh=1011,hr=1012,ka=1013,qn=1014,_n=1015,Yn=1016,Ua=1017,Oa=1018,ur=1020,Mh=35902,Sh=35899,wh=1021,Th=1022,bn=1023,ni=1026,Ki=1027,Fa=1028,za=1029,Zi=1030,Ba=1031;var Ha=1033,io=33776,so=33777,ro=33778,oo=33779,Ga=35840,Va=35841,Wa=35842,Xa=35843,$a=36196,qa=37492,Ya=37496,Ka=37488,Za=37489,ao=37490,Ja=37491,ja=37808,Qa=37809,tl=37810,el=37811,nl=37812,il=37813,sl=37814,rl=37815,ol=37816,al=37817,ll=37818,cl=37819,hl=37820,ul=37821,dl=36492,fl=36494,pl=36495,ml=36283,gl=36284,lo=36285,xl=36286;var Fr=2300,ca=2301,jo=2302,Jc=2303,jc=2400,Qc=2401,th=2402;var Yd=3200;var Eh=0,Kd=1,Ti="",En="srgb",ps="srgb-linear",zr="linear",ye="srgb";var Qo=7680;var Zd=519,Jd=512,jd=513,Qd=514,yl=515,tf=516,ef=517,vl=518,nf=519,sf=35044,Ah=35048;var Rh="300 es",Xn=2e3,js=2001;function Um(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Om(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Br(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function rf(){let s=Br("canvas");return s.style.display="block",s}var td={},Qs=null;function Ch(...s){let t="THREE."+s.shift();Qs?Qs("log",t,...s):console.log(t,...s)}function of(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Gt(...s){s=of(s);let t="THREE."+s.shift();if(Qs)Qs("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Xt(...s){s=of(s);let t="THREE."+s.shift();if(Qs)Qs("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function fs(...s){let t=s.join(" ");t in td||(td[t]=!0,Gt(...s))}function af(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var lf={[ta]:ea,[na]:ra,[ia]:oa,[Js]:sa,[ea]:ta,[ra]:na,[oa]:ia,[sa]:Js},ii=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ed=1234567,Ur=Math.PI/180,tr=180/Math.PI;function dr(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(rn[s&255]+rn[s>>8&255]+rn[s>>16&255]+rn[s>>24&255]+"-"+rn[t&255]+rn[t>>8&255]+"-"+rn[t>>16&15|64]+rn[t>>24&255]+"-"+rn[e&63|128]+rn[e>>8&255]+"-"+rn[e>>16&255]+rn[e>>24&255]+rn[n&255]+rn[n>>8&255]+rn[n>>16&255]+rn[n>>24&255]).toLowerCase()}function ue(s,t,e){return Math.max(t,Math.min(e,s))}function Ph(s,t){return(s%t+t)%t}function Fm(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function zm(s,t,e){return s!==t?(e-s)/(t-s):0}function Or(s,t,e){return(1-e)*s+e*t}function Bm(s,t,e,n){return Or(s,t,1-Math.exp(-e*n))}function Hm(s,t=1){return t-Math.abs(Ph(s,t*2)-t)}function Gm(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Vm(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Wm(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Xm(s,t){return s+Math.random()*(t-s)}function $m(s){return s*(.5-Math.random())}function qm(s){s!==void 0&&(ed=s);let t=ed+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ym(s){return s*Ur}function Km(s){return s*tr}function Zm(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function Jm(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function jm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Qm(s,t,e,n,i){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*d,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*d,a*c);break;case"ZXZ":s.set(l*d,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:Gt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ks(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function dn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var bs={DEG2RAD:Ur,RAD2DEG:tr,generateUUID:dr,clamp:ue,euclideanModulo:Ph,mapLinear:Fm,inverseLerp:zm,lerp:Or,damp:Bm,pingpong:Hm,smoothstep:Gm,smootherstep:Vm,randInt:Wm,randFloat:Xm,randFloatSpread:$m,seededRandom:qm,degToRad:Ym,radToDeg:Km,isPowerOfTwo:Zm,ceilPowerOfTwo:Jm,floorPowerOfTwo:jm,setQuaternionFromProperEuler:Qm,normalize:dn,denormalize:Ks},kh=class kh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ue(this.x,t.x,e.x),this.y=ue(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ue(this.x,t,e),this.y=ue(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ue(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};kh.prototype.isVector2=!0;var Zt=kh,Be=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(d!==x||l!==u||c!==f||h!==g){let p=l*u+c*f+h*g+d*x;p<0&&(u=-u,f=-f,g=-g,x=-x,p=-p);let m=1-a;if(p<.9995){let M=Math.acos(p),y=Math.sin(M);m=Math.sin(m*M)/y,a=Math.sin(a*M)/y,l=l*m+u*a,c=c*m+f*a,h=h*m+g*a,d=d*m+x*a}else{l=l*m+u*a,c=c*m+f*a,h=h*m+g*a,d=d*m+x*a;let M=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=M,c*=M,h*=M,d*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-a*f,t[e+2]=c*g+h*f+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(r/2),u=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Gt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ue(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,i=-i,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Uh=class Uh{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(nd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(nd.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=i+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ue(this.x,t.x,e.x),this.y=ue(this.y,t.y,e.y),this.z=ue(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ue(this.x,t,e),this.y=ue(this.y,t,e),this.z=ue(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ue(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Pc.copy(this).projectOnVector(t),this.sub(Pc)}reflect(t){return this.sub(Pc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Uh.prototype.isVector3=!0;var L=Uh,Pc=new L,nd=new Be,Oh=class Oh{constructor(t,e,n,i,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],x=i[0],p=i[3],m=i[6],M=i[1],y=i[4],v=i[7],b=i[2],S=i[5],E=i[8];return r[0]=o*x+a*M+l*b,r[3]=o*p+a*y+l*S,r[6]=o*m+a*v+l*E,r[1]=c*x+h*M+d*b,r[4]=c*p+h*y+d*S,r[7]=c*m+h*v+d*E,r[2]=u*x+f*M+g*b,r[5]=u*p+f*y+g*S,r[8]=u*m+f*v+g*E,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=e*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(i*c-h*n)*x,t[2]=(a*n-i*o)*x,t[3]=u*x,t[4]=(h*e-i*l)*x,t[5]=(i*r-a*e)*x,t[6]=f*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return fs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ic.makeScale(t,e)),this}rotate(t){return fs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ic.makeRotation(-t)),this}translate(t,e){return fs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ic.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Oh.prototype.isMatrix3=!0;var Wt=Oh,Ic=new Wt,id=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sd=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function t0(){let s={enabled:!0,workingColorSpace:ps,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ye&&(i.r=Si(i.r),i.g=Si(i.g),i.b=Si(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ye&&(i.r=Zs(i.r),i.g=Zs(i.g),i.b=Zs(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ti?zr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return fs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return fs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[ps]:{primaries:t,whitePoint:n,transfer:zr,toXYZ:id,fromXYZ:sd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:En},outputColorSpaceConfig:{drawingBufferColorSpace:En}},[En]:{primaries:t,whitePoint:n,transfer:ye,toXYZ:id,fromXYZ:sd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:En}}}),s}var ae=t0();function Si(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Zs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var ks,ha=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ks===void 0&&(ks=Br("canvas")),ks.width=t.width,ks.height=t.height;let i=ks.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=ks}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Br("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Si(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Si(e[n]/255)*255):e[n]=Si(e[n]);return{data:e,width:t.width,height:t.height}}else return Gt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},e0=0,er=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:e0++}),this.uuid=dr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Lc(i[o].image)):r.push(Lc(i[o]))}else r=Lc(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function Lc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ha.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Gt("Texture: Unable to serialize Texture."),{})}var n0=0,Nc=new L,fn=class s extends ii{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=ei,i=ei,r=Xe,o=Yi,a=bn,l=vn,c=s.DEFAULT_ANISOTROPY,h=Ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:n0++}),this.uuid=dr(),this.name="",this.source=new er(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Zt(0,0),this.repeat=new Zt(1,1),this.center=new Zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Nc).x}get height(){return this.source.getSize(Nc).y}get depth(){return this.source.getSize(Nc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Gt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Gt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==vh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case aa:t.x=t.x-Math.floor(t.x);break;case ei:t.x=t.x<0?0:1;break;case la:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case aa:t.y=t.y-Math.floor(t.y);break;case ei:t.y=t.y<0?0:1;break;case la:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=vh;fn.DEFAULT_ANISOTROPY=1;var Fh=class Fh{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],x=l[2],p=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(c+1)/2,v=(f+1)/2,b=(m+1)/2,S=(h+u)/4,E=(d+x)/4,_=(g+p)/4;return y>v&&y>b?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=S/n,r=E/n):v>b?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=S/i,r=_/i):b<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(b),n=E/r,i=_/r),this.set(n,i,r,e),this}let M=Math.sqrt((p-g)*(p-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(d-x)/M,this.z=(u-h)/M,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ue(this.x,t.x,e.x),this.y=ue(this.y,t.y,e.y),this.z=ue(this.z,t.z,e.z),this.w=ue(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ue(this.x,t,e),this.y=ue(this.y,t,e),this.z=ue(this.z,t,e),this.w=ue(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ue(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Fh.prototype.isVector4=!0;var Te=Fh,ua=class extends ii{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Te(0,0,t,e),this.scissorTest=!1,this.viewport=new Te(0,0,t,e),this.textures=[];let i={width:t,height:e,depth:n.depth},r=new fn(i),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Xe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new er(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ln=class extends ua{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Hr=class extends fn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ze,this.minFilter=ze,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var da=class extends fn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ze,this.minFilter=ze,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Ia=class Ia{constructor(t,e,n,i,r,o,a,l,c,h,d,u,f,g,x,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,d,u,f,g,x,p)}set(t,e,n,i,r,o,a,l,c,h,d,u,f,g,x,p){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=x,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ia().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/Us.setFromMatrixColumn(t,0).length(),r=1/Us.setFromMatrixColumn(t,1).length(),o=1/Us.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,g=a*h,x=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-x*c,e[9]=-a*l,e[2]=x-u*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,x=c*d;e[0]=u+x*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=x+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,x=c*d;e[0]=u-x*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=x-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,f=o*d,g=a*h,x=a*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+x,e[1]=l*d,e[5]=x*c+u,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-x*d}else if(t.order==="XZY"){let u=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+x,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(i0,t,s0)}lookAt(t,e,n){let i=this.elements;return wn.subVectors(t,e),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Ni.crossVectors(n,wn),Ni.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Ni.crossVectors(n,wn)),Ni.normalize(),Lo.crossVectors(wn,Ni),i[0]=Ni.x,i[4]=Lo.x,i[8]=wn.x,i[1]=Ni.y,i[5]=Lo.y,i[9]=wn.y,i[2]=Ni.z,i[6]=Lo.z,i[10]=wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],x=n[6],p=n[10],m=n[14],M=n[3],y=n[7],v=n[11],b=n[15],S=i[0],E=i[4],_=i[8],A=i[12],C=i[1],P=i[5],N=i[9],F=i[13],I=i[2],z=i[6],q=i[10],Y=i[14],st=i[3],Z=i[7],tt=i[11],$=i[15];return r[0]=o*S+a*C+l*I+c*st,r[4]=o*E+a*P+l*z+c*Z,r[8]=o*_+a*N+l*q+c*tt,r[12]=o*A+a*F+l*Y+c*$,r[1]=h*S+d*C+u*I+f*st,r[5]=h*E+d*P+u*z+f*Z,r[9]=h*_+d*N+u*q+f*tt,r[13]=h*A+d*F+u*Y+f*$,r[2]=g*S+x*C+p*I+m*st,r[6]=g*E+x*P+p*z+m*Z,r[10]=g*_+x*N+p*q+m*tt,r[14]=g*A+x*F+p*Y+m*$,r[3]=M*S+y*C+v*I+b*st,r[7]=M*E+y*P+v*z+b*Z,r[11]=M*_+y*N+v*q+b*tt,r[15]=M*A+y*F+v*Y+b*$,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],x=t[7],p=t[11],m=t[15],M=l*f-c*u,y=a*f-c*d,v=a*u-l*d,b=o*f-c*h,S=o*u-l*h,E=o*d-a*h;return e*(x*M-p*y+m*v)-n*(g*M-p*b+m*S)+i*(g*y-x*b+m*E)-r*(g*v-x*S+p*E)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+i*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],x=t[13],p=t[14],m=t[15],M=e*a-n*o,y=e*l-i*o,v=e*c-r*o,b=n*l-i*a,S=n*c-r*a,E=i*c-r*l,_=h*x-d*g,A=h*p-u*g,C=h*m-f*g,P=d*p-u*x,N=d*m-f*x,F=u*m-f*p,I=M*F-y*N+v*P+b*C-S*A+E*_;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/I;return t[0]=(a*F-l*N+c*P)*z,t[1]=(i*N-n*F-r*P)*z,t[2]=(x*E-p*S+m*b)*z,t[3]=(u*S-d*E-f*b)*z,t[4]=(l*C-o*F-c*A)*z,t[5]=(e*F-i*C+r*A)*z,t[6]=(p*v-g*E-m*y)*z,t[7]=(h*E-u*v+f*y)*z,t[8]=(o*N-a*C+c*_)*z,t[9]=(n*C-e*N-r*_)*z,t[10]=(g*S-x*v+m*M)*z,t[11]=(d*v-h*S-f*M)*z,t[12]=(a*A-o*P-l*_)*z,t[13]=(e*P-n*A+i*_)*z,t[14]=(x*y-g*b-p*M)*z,t[15]=(h*b-d*y+u*M)*z,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,x=o*h,p=o*d,m=a*d,M=l*c,y=l*h,v=l*d,b=n.x,S=n.y,E=n.z;return i[0]=(1-(x+m))*b,i[1]=(f+v)*b,i[2]=(g-y)*b,i[3]=0,i[4]=(f-v)*S,i[5]=(1-(u+m))*S,i[6]=(p+M)*S,i[7]=0,i[8]=(g+y)*E,i[9]=(p-M)*E,i[10]=(1-(u+x))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Us.set(i[0],i[1],i[2]).length(),a=Us.set(i[4],i[5],i[6]).length(),l=Us.set(i[8],i[9],i[10]).length();r<0&&(o=-o),Hn.copy(this);let c=1/o,h=1/a,d=1/l;return Hn.elements[0]*=c,Hn.elements[1]*=c,Hn.elements[2]*=c,Hn.elements[4]*=h,Hn.elements[5]*=h,Hn.elements[6]*=h,Hn.elements[8]*=d,Hn.elements[9]*=d,Hn.elements[10]*=d,e.setFromRotationMatrix(Hn),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,i,r,o,a=Xn,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i),g,x;if(l)g=r/(o-r),x=o*r/(o-r);else if(a===Xn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===js)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Xn,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-i),u=-(e+t)/(e-t),f=-(n+i)/(n-i),g,x;if(l)g=1/(o-r),x=o/(o-r);else if(a===Xn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===js)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Ia.prototype.isMatrix4=!0;var oe=Ia,Us=new L,Hn=new oe,i0=new L(0,0,0),s0=new L(1,1,1),Ni=new L,Lo=new L,wn=new L,rd=new oe,od=new Be,xn=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ue(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ue(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ue(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ue(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Gt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return rd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(rd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return od.setFromEuler(this),this.setFromQuaternion(od,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};xn.DEFAULT_ORDER="XYZ";var Gr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},r0=0,ad=new L,Os=new Be,yi=new oe,No=new L,Pr=new L,o0=new L,a0=new Be,ld=new L(1,0,0),cd=new L(0,1,0),hd=new L(0,0,1),ud={type:"added"},l0={type:"removed"},Fs={type:"childadded",child:null},Dc={type:"childremoved",child:null},pn=class s extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=dr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new L,e=new xn,n=new Be,i=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new oe},normalMatrix:{value:new Wt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Os.setFromAxisAngle(t,e),this.quaternion.multiply(Os),this}rotateOnWorldAxis(t,e){return Os.setFromAxisAngle(t,e),this.quaternion.premultiply(Os),this}rotateX(t){return this.rotateOnAxis(ld,t)}rotateY(t){return this.rotateOnAxis(cd,t)}rotateZ(t){return this.rotateOnAxis(hd,t)}translateOnAxis(t,e){return ad.copy(t).applyQuaternion(this.quaternion),this.position.add(ad.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ld,t)}translateY(t){return this.translateOnAxis(cd,t)}translateZ(t){return this.translateOnAxis(hd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?No.copy(t):No.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(Pr,No,this.up):yi.lookAt(No,Pr,this.up),this.quaternion.setFromRotationMatrix(yi),i&&(yi.extractRotation(i.matrixWorld),Os.setFromRotationMatrix(yi),this.quaternion.premultiply(Os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Xt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ud),Fs.child=t,this.dispatchEvent(Fs),Fs.child=null):Xt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(l0),Dc.child=t,this.dispatchEvent(Dc),Dc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yi.multiply(t.parent.matrixWorld)),t.applyMatrix4(yi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ud),Fs.child=t,this.dispatchEvent(Fs),Fs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,t,o0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,a0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};pn.DEFAULT_UP=new L(0,1,0);pn.DEFAULT_MATRIX_AUTO_UPDATE=!0;pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Je=class extends pn{constructor(){super(),this.isGroup=!0,this.type="Group"}},c0={type:"move"},nr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let p=e.getJointPose(x,n),m=this._getHandJoint(c,x);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(c0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Je;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},cf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},Do={h:0,s:0,l:0};function kc(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Qt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=En){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=ae.workingColorSpace){if(t=Ph(t,1),e=ue(e,0,1),n=ue(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=kc(o,r,t+1/3),this.g=kc(o,r,t),this.b=kc(o,r,t-1/3)}return ae.colorSpaceToWorking(this,i),this}setStyle(t,e=En){function n(r){r!==void 0&&parseFloat(r)<1&&Gt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Gt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Gt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=En){let n=cf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Gt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Si(t.r),this.g=Si(t.g),this.b=Si(t.b),this}copyLinearToSRGB(t){return this.r=Zs(t.r),this.g=Zs(t.g),this.b=Zs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=En){return ae.workingToColorSpace(on.copy(this),t),Math.round(ue(on.r*255,0,255))*65536+Math.round(ue(on.g*255,0,255))*256+Math.round(ue(on.b*255,0,255))}getHexString(t=En){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.workingToColorSpace(on.copy(this),e);let n=on.r,i=on.g,r=on.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.workingToColorSpace(on.copy(this),e),t.r=on.r,t.g=on.g,t.b=on.b,t}getStyle(t=En){ae.workingToColorSpace(on.copy(this),t);let e=on.r,n=on.g,i=on.b;return t!==En?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Di),this.setHSL(Di.h+t,Di.s+e,Di.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Di),t.getHSL(Do);let n=Or(Di.h,Do.h,e),i=Or(Di.s,Do.s,e),r=Or(Di.l,Do.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},on=new Qt;Qt.NAMES=cf;var Vr=class s{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Qt(t),this.near=e,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ir=class extends pn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Gn=new L,vi=new L,Uc=new L,_i=new L,zs=new L,Bs=new L,dd=new L,Oc=new L,Fc=new L,zc=new L,Bc=new Te,Hc=new Te,Gc=new Te,Fi=class s{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Gn.subVectors(t,e),i.cross(Gn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Gn.subVectors(i,e),vi.subVectors(n,e),Uc.subVectors(t,e);let o=Gn.dot(Gn),a=Gn.dot(vi),l=Gn.dot(Uc),c=vi.dot(vi),h=vi.dot(Uc),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,_i)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,_i.x),l.addScaledVector(o,_i.y),l.addScaledVector(a,_i.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return Bc.setScalar(0),Hc.setScalar(0),Gc.setScalar(0),Bc.fromBufferAttribute(t,e),Hc.fromBufferAttribute(t,n),Gc.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Bc,r.x),o.addScaledVector(Hc,r.y),o.addScaledVector(Gc,r.z),o}static isFrontFacing(t,e,n,i){return Gn.subVectors(n,e),vi.subVectors(t,e),Gn.cross(vi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Gn.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Gn.cross(vi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;zs.subVectors(i,n),Bs.subVectors(r,n),Oc.subVectors(t,n);let l=zs.dot(Oc),c=Bs.dot(Oc);if(l<=0&&c<=0)return e.copy(n);Fc.subVectors(t,i);let h=zs.dot(Fc),d=Bs.dot(Fc);if(h>=0&&d<=h)return e.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(zs,o);zc.subVectors(t,r);let f=zs.dot(zc),g=Bs.dot(zc);if(g>=0&&f<=g)return e.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Bs,a);let p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return dd.subVectors(r,i),a=(d-h)/(d-h+(f-g)),e.copy(i).addScaledVector(dd,a);let m=1/(p+x+u);return o=x*m,a=u*m,e.copy(n).addScaledVector(zs,o).addScaledVector(Bs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},si=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Vn):Vn.fromBufferAttribute(r,o),Vn.applyMatrix4(t.matrixWorld),this.expandByPoint(Vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ko.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ko.copy(n.boundingBox)),ko.applyMatrix4(t.matrixWorld),this.union(ko)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Vn),Vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ir),Uo.subVectors(this.max,Ir),Hs.subVectors(t.a,Ir),Gs.subVectors(t.b,Ir),Vs.subVectors(t.c,Ir),ki.subVectors(Gs,Hs),Ui.subVectors(Vs,Gs),cs.subVectors(Hs,Vs);let e=[0,-ki.z,ki.y,0,-Ui.z,Ui.y,0,-cs.z,cs.y,ki.z,0,-ki.x,Ui.z,0,-Ui.x,cs.z,0,-cs.x,-ki.y,ki.x,0,-Ui.y,Ui.x,0,-cs.y,cs.x,0];return!Vc(e,Hs,Gs,Vs,Uo)||(e=[1,0,0,0,1,0,0,0,1],!Vc(e,Hs,Gs,Vs,Uo))?!1:(Oo.crossVectors(ki,Ui),e=[Oo.x,Oo.y,Oo.z],Vc(e,Hs,Gs,Vs,Uo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},bi=[new L,new L,new L,new L,new L,new L,new L,new L],Vn=new L,ko=new si,Hs=new L,Gs=new L,Vs=new L,ki=new L,Ui=new L,cs=new L,Ir=new L,Uo=new L,Oo=new L,hs=new L;function Vc(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){hs.fromArray(s,r);let a=i.x*Math.abs(hs.x)+i.y*Math.abs(hs.y)+i.z*Math.abs(hs.z),l=t.dot(hs),c=e.dot(hs),h=n.dot(hs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var We=new L,Fo=new Zt,h0=0,An=class extends ii{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:h0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=sf,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Fo.fromBufferAttribute(this,e),Fo.applyMatrix3(t),this.setXY(e,Fo.x,Fo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix3(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix4(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyNormalMatrix(t),this.setXYZ(e,We.x,We.y,We.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.transformDirection(t),this.setXYZ(e,We.x,We.y,We.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ks(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=dn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ks(e,this.array)),e}setX(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ks(e,this.array)),e}setY(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ks(e,this.array)),e}setZ(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ks(e,this.array)),e}setW(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=dn(e,this.array),n=dn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=dn(e,this.array),n=dn(n,this.array),i=dn(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=dn(e,this.array),n=dn(n,this.array),i=dn(i,this.array),r=dn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Wr=class extends An{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Xr=class extends An{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var me=class extends An{constructor(t,e,n){super(new Float32Array(t),e,n)}},u0=new si,Lr=new L,Wc=new L,ri=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):u0.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Lr.subVectors(t,this.center);let e=Lr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Lr,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Wc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Lr.copy(t.center).add(Wc)),this.expandByPoint(Lr.copy(t.center).sub(Wc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},d0=0,kn=new oe,Xc=new pn,Ws=new L,Tn=new si,Nr=new si,Ze=new L,je=class s extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:d0++}),this.uuid=dr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Um(t)?Xr:Wr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Wt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return kn.makeRotationFromQuaternion(t),this.applyMatrix4(kn),this}rotateX(t){return kn.makeRotationX(t),this.applyMatrix4(kn),this}rotateY(t){return kn.makeRotationY(t),this.applyMatrix4(kn),this}rotateZ(t){return kn.makeRotationZ(t),this.applyMatrix4(kn),this}translate(t,e,n){return kn.makeTranslation(t,e,n),this.applyMatrix4(kn),this}scale(t,e,n){return kn.makeScale(t,e,n),this.applyMatrix4(kn),this}lookAt(t){return Xc.lookAt(t),Xc.updateMatrix(),this.applyMatrix4(Xc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ws).negate(),this.translate(Ws.x,Ws.y,Ws.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new me(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Gt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ze.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(Ze),Ze.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(Ze)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ri);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(Tn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Nr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ze.addVectors(Tn.min,Nr.min),Tn.expandByPoint(Ze),Ze.addVectors(Tn.max,Nr.max),Tn.expandByPoint(Ze)):(Tn.expandByPoint(Nr.min),Tn.expandByPoint(Nr.max))}Tn.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Ze.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ze));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ze.fromBufferAttribute(a,c),l&&(Ws.fromBufferAttribute(t,c),Ze.add(Ws)),i=Math.max(i,n.distanceToSquared(Ze))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Xt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Xt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new An(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let _=0;_<n.count;_++)a[_]=new L,l[_]=new L;let c=new L,h=new L,d=new L,u=new Zt,f=new Zt,g=new Zt,x=new L,p=new L;function m(_,A,C){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,A),d.fromBufferAttribute(n,C),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,A),g.fromBufferAttribute(r,C),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),a[_].add(x),a[A].add(x),a[C].add(x),l[_].add(p),l[A].add(p),l[C].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let _=0,A=M.length;_<A;++_){let C=M[_],P=C.start,N=C.count;for(let F=P,I=P+N;F<I;F+=3)m(t.getX(F+0),t.getX(F+1),t.getX(F+2))}let y=new L,v=new L,b=new L,S=new L;function E(_){b.fromBufferAttribute(i,_),S.copy(b);let A=a[_];y.copy(A),y.sub(b.multiplyScalar(b.dot(A))).normalize(),v.crossVectors(S,A);let P=v.dot(l[_])<0?-1:1;o.setXYZW(_,y.x,y.y,y.z,P)}for(let _=0,A=M.length;_<A;++_){let C=M[_],P=C.start,N=C.count;for(let F=P,I=P+N;F<I;F+=3)E(t.getX(F+0)),E(t.getX(F+1)),E(t.getX(F+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new An(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,d=new L;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),x=t.getX(u+1),p=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,p),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ze.fromBufferAttribute(t,e),Ze.normalize(),t.setXYZ(e,Ze.x,Ze.y,Ze.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let x=0,p=l.length;x<p;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let m=0;m<h;m++)u[g++]=c[f++]}return new An(u,h,d)}if(this.index===null)return Gt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var $c=new L,f0=new L,p0=new Wt,Wn=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=$c.subVectors(n,e).cross(f0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta($c),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||p0.getNormalMatrix(t),i=this.coplanarPoint($c).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},m0=0,ms=class extends ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:m0++}),this.uuid=dr(),this.name="",this.type="Material",this.blending=cr,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ch,this.blendDst=hh,this.blendEquation=vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=Js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qo,this.stencilZFail=Qo,this.stencilZPass=Qo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Gt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Gt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Qt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Wn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Zt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Zt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Mi=new L,qc=new L,zo=new L,Bo=new L,fa=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Mi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Mi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Mi.copy(this.origin).addScaledVector(this.direction,e),Mi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){qc.copy(t).add(e).multiplyScalar(.5),zo.copy(e).sub(t).normalize(),Bo.copy(this.origin).sub(qc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(zo),a=Bo.dot(this.direction),l=-Bo.dot(zo),c=Bo.lengthSq(),h=Math.abs(1-o*o),d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let x=1/h;d*=x,u*=x,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(qc).addScaledVector(zo,u),f}intersectSphere(t,e){if(t.radius<0)return null;Mi.subVectors(t.center,this.origin);let n=Mi.dot(this.direction),i=Mi.dot(Mi)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Mi)!==null}intersectTriangle(t,e,n,i,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,d=t.x-o.x,u=t.y-o.y,f=t.z-o.z,g=e.x-o.x,x=e.y-o.y,p=e.z-o.z,m=n.x-o.x,M=n.y-o.y,y=n.z-o.z,v=Math.abs(l),b=Math.abs(c),S=Math.abs(h),E,_,A,C,P,N,F,I,z,q,Y,st;if(v>=b&&v>=S?(A=l,N=d,z=g,st=m,l>=0?(E=c,_=h,C=u,P=f,F=x,I=p,q=M,Y=y):(E=h,_=c,C=f,P=u,F=p,I=x,q=y,Y=M)):b>=S?(A=c,N=u,z=x,st=M,c>=0?(E=h,_=l,C=f,P=d,F=p,I=g,q=y,Y=m):(E=l,_=h,C=d,P=f,F=g,I=p,q=m,Y=y)):(A=h,N=f,z=p,st=y,h>=0?(E=l,_=c,C=d,P=u,F=g,I=x,q=m,Y=M):(E=c,_=l,C=u,P=d,F=x,I=g,q=M,Y=m)),A===0)return null;let Z=E/A,tt=_/A,$=1/A,_t=C-Z*N,Et=P-tt*N,lt=F-Z*z,nt=I-tt*z,Bt=q-Z*st,V=Y-tt*st,K=Bt*nt-V*lt,ut=_t*V-Et*Bt,At=lt*Et-nt*_t;if(i){if(K<0||ut<0||At<0)return null}else if((K<0||ut<0||At<0)&&(K>0||ut>0||At>0))return null;let ct=K+ut+At;if(ct===0)return null;let Ut=$*(K*N+ut*z+At*st);return(ct>0?Ut<0:Ut>0)?null:this.at(Ut/ct,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},gs=class extends ms{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=uh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},fd=new oe,us=new fa,Ho=new ri,pd=new L,Go=new L,Vo=new L,Wo=new L,Yc=new L,Xo=new L,md=new L,$o=new L,ie=class extends pn{constructor(t=new je,e=new gs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){Xo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(Yc.fromBufferAttribute(d,t),o?Xo.addScaledVector(Yc,h):Xo.addScaledVector(Yc.sub(e),h))}e.add(Xo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ho.copy(n.boundingSphere),Ho.applyMatrix4(r),us.copy(t.ray).recast(t.near),!(Ho.containsPoint(us.origin)===!1&&(us.intersectSphere(Ho,pd)===null||us.origin.distanceToSquared(pd)>(t.far-t.near)**2))&&(fd.copy(r).invert(),us.copy(t.ray).applyMatrix4(fd),!(n.boundingBox!==null&&us.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,us)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let p=u[g],m=o[p.materialIndex],M=Math.max(p.start,f.start),y=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let v=M,b=y;v<b;v+=3){let S=a.getX(v),E=a.getX(v+1),_=a.getX(v+2);i=qo(this,m,t,n,c,h,d,S,E,_),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let M=a.getX(p),y=a.getX(p+1),v=a.getX(p+2);i=qo(this,o,t,n,c,h,d,M,y,v),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let p=u[g],m=o[p.materialIndex],M=Math.max(p.start,f.start),y=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=M,b=y;v<b;v+=3){let S=v,E=v+1,_=v+2;i=qo(this,m,t,n,c,h,d,S,E,_),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let M=p,y=p+1,v=p+2;i=qo(this,o,t,n,c,h,d,M,y,v),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}};function g0(s,t,e,n,i,r,o,a){let l;if(t.side===Qe?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===ai,a),l===null)return null;$o.copy(a),$o.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo($o);return c<e.near||c>e.far?null:{distance:c,point:$o.clone(),object:s}}function qo(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,Go),s.getVertexPosition(l,Vo),s.getVertexPosition(c,Wo);let h=g0(s,t,e,n,Go,Vo,Wo,md);if(h){let d=new L;Fi.getBarycoord(md,Go,Vo,Wo,d),i&&(h.uv=Fi.getInterpolatedAttribute(i,a,l,c,d,new Zt)),r&&(h.uv1=Fi.getInterpolatedAttribute(r,a,l,c,d,new Zt)),o&&(h.normal=Fi.getInterpolatedAttribute(o,a,l,c,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new L,materialIndex:0};Fi.getNormal(Go,Vo,Wo,u.normal),h.face=u,h.barycoord=d}return h}var xs=class extends fn{constructor(t=null,e=1,n=1,i,r,o,a,l,c=ze,h=ze,d,u){super(null,o,a,l,c,h,i,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var yn=class extends An{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Xs=new oe,gd=new oe,Yo=[],xd=new si,x0=new oe,Dr=new ie,kr=new ri,sr=class extends ie{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new yn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,x0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new si),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Xs),xd.copy(t.boundingBox).applyMatrix4(Xs),this.boundingBox.union(xd)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ri),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Xs),kr.copy(t.boundingSphere).applyMatrix4(Xs),this.boundingSphere.union(kr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(Dr.geometry=this.geometry,Dr.material=this.material,Dr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),kr.copy(this.boundingSphere),kr.applyMatrix4(n),t.ray.intersectsSphere(kr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Xs),gd.multiplyMatrices(n,Xs),Dr.matrixWorld=gd,Dr.raycast(t,Yo);for(let o=0,a=Yo.length;o<a;o++){let l=Yo[o];l.instanceId=r,l.object=this,e.push(l)}Yo.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new yn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new xs(new Float32Array(i*this.count),i,this.count,Fa,_n));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ds=new ri,y0=new Zt(.5,.5),Ko=new L,rr=class{constructor(t=new Wn,e=new Wn,n=new Wn,i=new Wn,r=new Wn,o=new Wn){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Xn,n=!1){let i=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],x=r[9],p=r[10],m=r[11],M=r[12],y=r[13],v=r[14],b=r[15];if(i[0].setComponents(c-o,f-h,m-g,b-M).normalize(),i[1].setComponents(c+o,f+h,m+g,b+M).normalize(),i[2].setComponents(c+a,f+d,m+x,b+y).normalize(),i[3].setComponents(c-a,f-d,m-x,b-y).normalize(),n)i[4].setComponents(l,u,p,v).normalize(),i[5].setComponents(c-l,f-u,m-p,b-v).normalize();else if(i[4].setComponents(c-l,f-u,m-p,b-v).normalize(),e===Xn)i[5].setComponents(c+l,f+u,m+p,b+v).normalize();else if(e===js)i[5].setComponents(l,u,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(t){ds.center.set(0,0,0);let e=y0.distanceTo(t.center);return ds.radius=.7071067811865476+e,ds.applyMatrix4(t.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Ko.x=i.normal.x>0?t.max.x:t.min.x,Ko.y=i.normal.y>0?t.max.y:t.min.y,Ko.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ko)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var $r=class extends fn{constructor(t=[],e=qi,n,i,r,o,a,l,c,h){super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},or=class extends fn{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var zi=class extends fn{constructor(t,e,n=qn,i,r,o,a=ze,l=ze,c,h=ni,d=1){if(h!==ni&&h!==Ki)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new er(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},pa=class extends zi{constructor(t,e=qn,n=qi,i,r,o=ze,a=ze,l,c=ni){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,i,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},qr=class extends fn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Bi=class s extends je{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new me(c,3)),this.setAttribute("normal",new me(h,3)),this.setAttribute("uv",new me(d,2));function g(x,p,m,M,y,v,b,S,E,_,A){let C=v/E,P=b/_,N=v/2,F=b/2,I=S/2,z=E+1,q=_+1,Y=0,st=0,Z=new L;for(let tt=0;tt<q;tt++){let $=tt*P-F;for(let _t=0;_t<z;_t++){let Et=_t*C-N;Z[x]=Et*M,Z[p]=$*y,Z[m]=I,c.push(Z.x,Z.y,Z.z),Z[x]=0,Z[p]=0,Z[m]=S>0?1:-1,h.push(Z.x,Z.y,Z.z),d.push(_t/E),d.push(1-tt/_),Y+=1}}for(let tt=0;tt<_;tt++)for(let $=0;$<E;$++){let _t=u+$+z*tt,Et=u+$+z*(tt+1),lt=u+($+1)+z*(tt+1),nt=u+($+1)+z*tt;l.push(_t,Et,nt),l.push(Et,lt,nt),st+=6}a.addGroup(f,st,A),f+=st,u+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var oi=class s extends je{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,x=[],p=n/2,m=0;M(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new me(d,3)),this.setAttribute("normal",new me(u,3)),this.setAttribute("uv",new me(f,2));function M(){let v=new L,b=new L,S=0,E=(e-t)/n;for(let _=0;_<=r;_++){let A=[],C=_/r,P=C*(e-t)+t;for(let N=0;N<=i;N++){let F=N/i,I=F*l+a,z=Math.sin(I),q=Math.cos(I);b.x=P*z,b.y=-C*n+p,b.z=P*q,d.push(b.x,b.y,b.z),v.set(z,E,q).normalize(),u.push(v.x,v.y,v.z),f.push(F,1-C),A.push(g++)}x.push(A)}for(let _=0;_<i;_++)for(let A=0;A<r;A++){let C=x[A][_],P=x[A+1][_],N=x[A+1][_+1],F=x[A][_+1];(t>0||A!==0)&&(h.push(C,P,F),S+=3),(e>0||A!==r-1)&&(h.push(P,N,F),S+=3)}c.addGroup(m,S,0),m+=S}function y(v){let b=g,S=new Zt,E=new L,_=0,A=v===!0?t:e,C=v===!0?1:-1;for(let N=1;N<=i;N++)d.push(0,p*C,0),u.push(0,C,0),f.push(.5,.5),g++;let P=g;for(let N=0;N<=i;N++){let I=N/i*l+a,z=Math.cos(I),q=Math.sin(I);E.x=A*q,E.y=p*C,E.z=A*z,d.push(E.x,E.y,E.z),u.push(0,C,0),S.x=z*.5+.5,S.y=q*.5*C+.5,f.push(S.x,S.y),g++}for(let N=0;N<i;N++){let F=b+N,I=P+N;v===!0?h.push(I,I+1,F):h.push(I+1,I,F),_+=3}c.addGroup(m,_,v===!0?1:2),m+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},wi=class s extends oi{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Yr=class s extends je{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new me(r,3)),this.setAttribute("normal",new me(r.slice(),3)),this.setAttribute("uv",new me(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(M){let y=new L,v=new L,b=new L;for(let S=0;S<e.length;S+=3)f(e[S+0],y),f(e[S+1],v),f(e[S+2],b),l(y,v,b,M)}function l(M,y,v,b){let S=b+1,E=[];for(let _=0;_<=S;_++){E[_]=[];let A=M.clone().lerp(v,_/S),C=y.clone().lerp(v,_/S),P=S-_;for(let N=0;N<=P;N++)N===0&&_===S?E[_][N]=A:E[_][N]=A.clone().lerp(C,N/P)}for(let _=0;_<S;_++)for(let A=0;A<2*(S-_)-1;A++){let C=Math.floor(A/2);A%2===0?(u(E[_][C+1]),u(E[_+1][C]),u(E[_][C])):(u(E[_][C+1]),u(E[_+1][C+1]),u(E[_+1][C]))}}function c(M){let y=new L;for(let v=0;v<r.length;v+=3)y.x=r[v+0],y.y=r[v+1],y.z=r[v+2],y.normalize().multiplyScalar(M),r[v+0]=y.x,r[v+1]=y.y,r[v+2]=y.z}function h(){let M=new L;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];let v=p(M)/2/Math.PI+.5,b=m(M)/Math.PI+.5;o.push(v,1-b)}g(),d()}function d(){for(let M=0;M<o.length;M+=6){let y=o[M+0],v=o[M+2],b=o[M+4],S=Math.max(y,v,b),E=Math.min(y,v,b);S>.9&&E<.1&&(y<.2&&(o[M+0]+=1),v<.2&&(o[M+2]+=1),b<.2&&(o[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function f(M,y){let v=M*3;y.x=t[v+0],y.y=t[v+1],y.z=t[v+2]}function g(){let M=new L,y=new L,v=new L,b=new L,S=new Zt,E=new Zt,_=new Zt;for(let A=0,C=0;A<r.length;A+=9,C+=6){M.set(r[A+0],r[A+1],r[A+2]),y.set(r[A+3],r[A+4],r[A+5]),v.set(r[A+6],r[A+7],r[A+8]),S.set(o[C+0],o[C+1]),E.set(o[C+2],o[C+3]),_.set(o[C+4],o[C+5]),b.copy(M).add(y).add(v).divideScalar(3);let P=p(b);x(S,C+0,M,P),x(E,C+2,y,P),x(_,C+4,v,P)}}function x(M,y,v,b){b<0&&M.x===1&&(o[y]=M.x-1),v.x===0&&v.z===0&&(o[y]=b/2/Math.PI+.5)}function p(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.detail)}};var Hi=class s extends Yr{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var Rn=class s extends je{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=t/a,u=e/l,f=[],g=[],x=[],p=[];for(let m=0;m<h;m++){let M=m*u-o;for(let y=0;y<c;y++){let v=y*d-r;g.push(v,-M,0),x.push(0,0,1),p.push(y/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<a;M++){let y=M+c*m,v=M+c*(m+1),b=M+1+c*(m+1),S=M+1+c*m;f.push(y,v,S),f.push(v,b,S)}this.setIndex(f),this.setAttribute("position",new me(g,3)),this.setAttribute("normal",new me(x,3)),this.setAttribute("uv",new me(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},Gi=class s extends je{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],h=[],d=t,u=(e-t)/i,f=new L,g=new Zt;for(let x=0;x<=i;x++){for(let p=0;p<=n;p++){let m=r+p/n*o;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let x=0;x<i;x++){let p=x*(n+1);for(let m=0;m<n;m++){let M=m+p,y=M,v=M+n+1,b=M+n+2,S=M+1;a.push(y,v,S),a.push(v,b,S)}}this.setIndex(a),this.setAttribute("position",new me(l,3)),this.setAttribute("normal",new me(c,3)),this.setAttribute("uv",new me(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var ys=class s extends je{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new L,u=new L,f=[],g=[],x=[],p=[];for(let m=0;m<=n;m++){let M=[],y=m/n,v=o+y*a,b=t*Math.cos(v),S=Math.sqrt(t*t-b*b),E=0;m===0&&o===0?E=.5/e:m===n&&l===Math.PI&&(E=-.5/e);for(let _=0;_<=e;_++){let A=_/e,C=i+A*r;d.x=-S*Math.cos(C),d.y=b,d.z=S*Math.sin(C),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),p.push(A+E,1-y),M.push(c++)}h.push(M)}for(let m=0;m<n;m++)for(let M=0;M<e;M++){let y=h[m][M+1],v=h[m][M],b=h[m+1][M],S=h[m+1][M+1];(m!==0||o>0)&&f.push(y,v,S),(m!==n-1||l<Math.PI)&&f.push(v,b,S)}this.setIndex(f),this.setAttribute("position",new me(g,3)),this.setAttribute("normal",new me(x,3)),this.setAttribute("uv",new me(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Kr=class s extends Yr{constructor(t=1,e=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};function Ms(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];if(yd(i))i.isRenderTargetTexture?(Gt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(yd(i[0])){let r=[];for(let o=0,a=i.length;o<a;o++)r[o]=i[o].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function cn(s){let t={};for(let e=0;e<s.length;e++){let n=Ms(s[e]);for(let i in n)t[i]=n[i]}return t}function yd(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function v0(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Ih(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}var co={clone:Ms,merge:cn},_0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,b0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Oe=class extends ms{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_0,this.fragmentShader=b0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ms(t.uniforms),this.uniformsGroups=v0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new Qt().setHex(i.value);break;case"v2":this.uniforms[n].value=new Zt().fromArray(i.value);break;case"v3":this.uniforms[n].value=new L().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Te().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Wt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new oe().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ma=class extends Oe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ga=class extends ms{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},xa=class extends ms{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function $s(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function Kc(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var Vi=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ya=class extends Vi{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:jc,endingEnd:jc}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Qc:r=t,a=2*e-n;break;case th:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Qc:o=t,l=2*n-e;break;case th:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-e)/(i-e),x=g*g,p=x*g,m=-u*p+2*u*x-u*g,M=(1+u)*p+(-1.5-2*u)*x+(-.5+u)*g+1,y=(-1-f)*p+(1.5+f)*x+.5*g,v=f*p-f*x;for(let b=0;b!==a;++b)r[b]=m*o[h+b]+M*o[c+b]+y*o[l+b]+v*o[d+b];return r}},va=class extends Vi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},_a=class extends Vi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},ba=class extends Vi{interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-e)/(i-e),x=1-g;for(let p=0;p!==a;++p)r[p]=o[c+p]*x+o[l+p]*g;return r}let u=a*2,f=t-1;for(let g=0;g!==a;++g){let x=o[c+g],p=o[l+g],m=f*u+g*2,M=d[m],y=d[m+1],v=t*u+g*2,b=h[v],S=h[v+1],E=S0(n,e,M,b,i);r[g]=hf(E,x,y,S,p)}return r}};function hf(s,t,e,n,i){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function M0(s,t,e,n,i){let r=1-s;return 3*r*r*(e-t)+6*r*s*(n-e)+3*s*s*(i-n)}function S0(s,t,e,n,i){let r=(s-t)/(i-t);for(let o=0;o<8;o++){let a=hf(r,t,e,n,i)-s;if(Math.abs(a)<1e-10)break;let l=M0(r,t,e,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var Cn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=$s(e,this.TimeBufferType),this.values=$s(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:$s(t.times,Array),values:$s(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),Kc(t.settings)&&(n.settings={inTangents:$s(t.settings.inTangents,Array),outTangents:$s(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new _a(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new va(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ya(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new ba(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Fr:e=this.InterpolantFactoryMethodDiscrete;break;case ca:e=this.InterpolantFactoryMethodLinear;break;case jo:e=this.InterpolantFactoryMethodSmooth;break;case Jc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Gt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fr;case this.InterpolantFactoryMethodLinear:return ca;case this.InterpolantFactoryMethodSmooth:return jo;case this.InterpolantFactoryMethodBezier:return Jc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;Kc(this.settings)&&(vd(this.settings.inTangents,t),vd(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Xt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Xt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Xt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Xt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&Om(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){Xt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===jo,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let x=e[d+g];if(x!==e[u+g]||x!==e[f+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,Kc(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function vd(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]*=t}Cn.prototype.ValueTypeName="";Cn.prototype.TimeBufferType=Float32Array;Cn.prototype.ValueBufferType=Float32Array;Cn.prototype.DefaultInterpolation=ca;var Wi=class extends Cn{constructor(t,e,n){super(t,e,n)}};Wi.prototype.ValueTypeName="bool";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=Fr;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ma=class extends Cn{constructor(t,e,n,i){super(t,e,n,i)}};Ma.prototype.ValueTypeName="color";var Sa=class extends Cn{constructor(t,e,n,i){super(t,e,n,i)}};Sa.prototype.ValueTypeName="number";var wa=class extends Vi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)Be.slerpFlat(r,0,o,c-a,o,c,l);return r}},Zr=class extends Cn{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new wa(this.times,this.values,this.getValueSize(),t)}};Zr.prototype.ValueTypeName="quaternion";Zr.prototype.InterpolantFactoryMethodSmooth=void 0;var Xi=class extends Cn{constructor(t,e,n){super(t,e,n)}};Xi.prototype.ValueTypeName="string";Xi.prototype.ValueBufferType=Array;Xi.prototype.DefaultInterpolation=Fr;Xi.prototype.InterpolantFactoryMethodLinear=void 0;Xi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ta=class extends Cn{constructor(t,e,n,i){super(t,e,n,i)}};Ta.prototype.ValueTypeName="vector";var Ea=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},uf=new Ea,Aa=class{constructor(t){this.manager=t!==void 0?t:uf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Aa.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ra=class extends pn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var Zc=new oe,_d=new L,bd=new L,Ca=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Zt(512,512),this.mapType=vn,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rr,this._frameExtents=new Zt(1,1),this._viewportCount=1,this._viewports=[new Te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;_d.setFromMatrixPosition(t.matrixWorld),e.position.copy(_d),bd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(bd),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){Zc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Zc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=i?i.z/r.x:1,a=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;t.coordinateSystem===js||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(Zc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Zo=new L,Jo=new Be,ti=new L,Jr=class extends pn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=Xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Zo,Jo,ti),ti.x===1&&ti.y===1&&ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zo,Jo,ti.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Zo,Jo,ti),ti.x===1&&ti.y===1&&ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zo,Jo,ti.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Oi=new L,Md=new Zt,Sd=new Zt,an=class extends Jr{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=tr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ur*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return tr*2*Math.atan(Math.tan(Ur*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Oi.x,Oi.y).multiplyScalar(-t/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Oi.x,Oi.y).multiplyScalar(-t/Oi.z)}getViewSize(t,e){return this.getViewBounds(t,Md,Sd),e.subVectors(Sd,Md)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ur*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var $i=class extends Jr{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},eh=class extends Ca{constructor(){super(new $i(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},jr=class extends Ra{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.target=new pn,this.shadow=new eh}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Qr=class extends je{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var qs=-90,Ys=1,ar=class extends pn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new an(qs,Ys,t,e);i.layers=this.layers,this.add(i);let r=new an(qs,Ys,t,e);r.layers=this.layers,this.add(r);let o=new an(qs,Ys,t,e);o.layers=this.layers,this.add(o);let a=new an(qs,Ys,t,e);a.layers=this.layers,this.add(a);let l=new an(qs,Ys,t,e);l.layers=this.layers,this.add(l);let c=new an(qs,Ys,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Xn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===js)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Pa=class extends an{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Lh="\\[\\]\\.:\\/",w0=new RegExp("["+Lh+"]","g"),Nh="[^"+Lh+"]",T0="[^"+Lh.replace("\\.","")+"]",E0=/((?:WC+[\/:])*)/.source.replace("WC",Nh),A0=/(WCOD+)?/.source.replace("WCOD",T0),R0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Nh),C0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Nh),P0=new RegExp("^"+E0+A0+R0+C0+"$"),I0=["material","materials","bones","map"],nh=class{constructor(t,e,n){let i=n||Ie.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ie=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(w0,"")}static parseTrackName(t){let e=P0.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);I0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Gt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Xt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Xt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Xt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Xt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Xt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Xt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Xt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;Xt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Xt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Xt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ie.Composite=nh;Ie.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ie.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ie.prototype.GetterByBindingType=[Ie.prototype._getValue_direct,Ie.prototype._getValue_array,Ie.prototype._getValue_arrayElement,Ie.prototype._getValue_toArray];Ie.prototype.SetterByBindingTypeAndVersioning=[[Ie.prototype._setValue_direct,Ie.prototype._setValue_direct_setNeedsUpdate,Ie.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_array,Ie.prototype._setValue_array_setNeedsUpdate,Ie.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_arrayElement,Ie.prototype._setValue_arrayElement_setNeedsUpdate,Ie.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_fromArray,Ie.prototype._setValue_fromArray_setNeedsUpdate,Ie.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Jb=new Float32Array(1);var zh=class zh{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}};zh.prototype.isMatrix2=!0;var ih=zh;function Dh(s,t,e,n){let i=L0(n);switch(e){case wh:return s*t;case Fa:return s*t/i.components*i.byteLength;case za:return s*t/i.components*i.byteLength;case Zi:return s*t*2/i.components*i.byteLength;case Ba:return s*t*2/i.components*i.byteLength;case Th:return s*t*3/i.components*i.byteLength;case bn:return s*t*4/i.components*i.byteLength;case Ha:return s*t*4/i.components*i.byteLength;case io:case so:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ro:case oo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Va:case Xa:return Math.max(s,16)*Math.max(t,8)/4;case Ga:case Wa:return Math.max(s,8)*Math.max(t,8)/2;case $a:case qa:case Ka:case Za:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ya:case ao:case Ja:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ja:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Qa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case tl:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case el:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case nl:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case il:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case sl:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case rl:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case ol:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case al:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case ll:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case cl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case hl:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case ul:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case dl:case fl:case pl:return Math.ceil(s/4)*Math.ceil(t/4)*16;case ml:case gl:return Math.ceil(s/4)*Math.ceil(t/4)*8;case lo:case xl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function L0(s){switch(s){case vn:case _h:return{byteLength:1,components:1};case hr:case bh:case Yn:return{byteLength:2,components:1};case Ua:case Oa:return{byteLength:2,components:4};case qn:case ka:case _n:return{byteLength:4,components:1};case Mh:case Sh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Gt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Nf(){let s=null,t=!1,e=null,n=null;function i(r,o){n=s.requestAnimationFrame(i),e(r,o)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function D0(s){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,a),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let x=d[f];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var k0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,U0=`#ifdef USE_ALPHAHASH
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
#endif`,O0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,F0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,z0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,B0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,H0=`#ifdef USE_AOMAP
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
#endif`,G0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,V0=`#ifdef USE_BATCHING
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
#endif`,W0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,X0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,q0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Y0=`#ifdef USE_IRIDESCENCE
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
#endif`,K0=`#ifdef USE_BUMPMAP
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
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,J0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,j0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Q0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,eg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ng=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ig=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,sg=`#define PI 3.141592653589793
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
} // validated`,rg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,og=`vec3 transformedNormal = objectNormal;
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
#endif`,ag=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ug="gl_FragColor = linearToOutputTexel( gl_FragColor );",dg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fg=`#ifdef USE_ENVMAP
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
#endif`,pg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,mg=`#ifdef USE_ENVMAP
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
#endif`,gg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xg=`#ifdef USE_ENVMAP
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
#endif`,yg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_g=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mg=`#ifdef USE_GRADIENTMAP
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
}`,Sg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Eg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Ag=`#ifdef USE_ENVMAP
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
#endif`,Rg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ig=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lg=`PhysicalMaterial material;
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
#endif`,Ng=`uniform sampler2D dfgLUT;
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
}`,Dg=`
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
#endif`,kg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ug=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Og=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Fg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Xg=`#if defined( USE_POINTS_UV )
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
#endif`,$g=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jg=`#ifdef USE_MORPHTARGETS
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
#endif`,jg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,tx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ex=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ix=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,sx=`#ifdef USE_NORMALMAP
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
#endif`,rx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ox=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ax=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ux=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,px=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_x=`float getShadowMask() {
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
}`,bx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mx=`#ifdef USE_SKINNING
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
#endif`,Sx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wx=`#ifdef USE_SKINNING
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
#endif`,Tx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ex=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ax=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cx=`#ifdef USE_TRANSMISSION
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
#endif`,Px=`#ifdef USE_TRANSMISSION
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
#endif`,Ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,kx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ux=`uniform sampler2D t2D;
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
}`,Ox=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hx=`#include <common>
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
}`,Gx=`#if DEPTH_PACKING == 3200
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
}`,Vx=`#define DISTANCE
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
}`,Wx=`#define DISTANCE
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
}`,Xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$x=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qx=`uniform float scale;
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
}`,Yx=`uniform vec3 diffuse;
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
}`,Kx=`#include <common>
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
}`,Zx=`uniform vec3 diffuse;
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
}`,Jx=`#define LAMBERT
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
}`,jx=`#define LAMBERT
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
}`,Qx=`#define MATCAP
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
}`,ty=`#define MATCAP
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
}`,ey=`#define NORMAL
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
}`,ny=`#define NORMAL
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
}`,iy=`#define PHONG
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
}`,sy=`#define PHONG
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
}`,ry=`#define STANDARD
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
}`,oy=`#define STANDARD
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
}`,ay=`#define TOON
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
}`,ly=`#define TOON
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
}`,cy=`uniform float size;
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
}`,hy=`uniform vec3 diffuse;
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
}`,uy=`#include <common>
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
}`,dy=`uniform vec3 color;
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
}`,fy=`uniform float rotation;
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
}`,py=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:k0,alphahash_pars_fragment:U0,alphamap_fragment:O0,alphamap_pars_fragment:F0,alphatest_fragment:z0,alphatest_pars_fragment:B0,aomap_fragment:H0,aomap_pars_fragment:G0,batching_pars_vertex:V0,batching_vertex:W0,begin_vertex:X0,beginnormal_vertex:$0,bsdfs:q0,iridescence_fragment:Y0,bumpmap_pars_fragment:K0,clipping_planes_fragment:Z0,clipping_planes_pars_fragment:J0,clipping_planes_pars_vertex:j0,clipping_planes_vertex:Q0,color_fragment:tg,color_pars_fragment:eg,color_pars_vertex:ng,color_vertex:ig,common:sg,cube_uv_reflection_fragment:rg,defaultnormal_vertex:og,displacementmap_pars_vertex:ag,displacementmap_vertex:lg,emissivemap_fragment:cg,emissivemap_pars_fragment:hg,colorspace_fragment:ug,colorspace_pars_fragment:dg,envmap_fragment:fg,envmap_common_pars_fragment:pg,envmap_pars_fragment:mg,envmap_pars_vertex:gg,envmap_physical_pars_fragment:Ag,envmap_vertex:xg,fog_vertex:yg,fog_pars_vertex:vg,fog_fragment:_g,fog_pars_fragment:bg,gradientmap_pars_fragment:Mg,lightmap_pars_fragment:Sg,lights_lambert_fragment:wg,lights_lambert_pars_fragment:Tg,lights_pars_begin:Eg,lights_toon_fragment:Rg,lights_toon_pars_fragment:Cg,lights_phong_fragment:Pg,lights_phong_pars_fragment:Ig,lights_physical_fragment:Lg,lights_physical_pars_fragment:Ng,lights_fragment_begin:Dg,lights_fragment_maps:kg,lights_fragment_end:Ug,lightprobes_pars_fragment:Og,logdepthbuf_fragment:Fg,logdepthbuf_pars_fragment:zg,logdepthbuf_pars_vertex:Bg,logdepthbuf_vertex:Hg,map_fragment:Gg,map_pars_fragment:Vg,map_particle_fragment:Wg,map_particle_pars_fragment:Xg,metalnessmap_fragment:$g,metalnessmap_pars_fragment:qg,morphinstance_vertex:Yg,morphcolor_vertex:Kg,morphnormal_vertex:Zg,morphtarget_pars_vertex:Jg,morphtarget_vertex:jg,normal_fragment_begin:Qg,normal_fragment_maps:tx,normal_pars_fragment:ex,normal_pars_vertex:nx,normal_vertex:ix,normalmap_pars_fragment:sx,clearcoat_normal_fragment_begin:rx,clearcoat_normal_fragment_maps:ox,clearcoat_pars_fragment:ax,iridescence_pars_fragment:lx,opaque_fragment:cx,packing:hx,premultiplied_alpha_fragment:ux,project_vertex:dx,dithering_fragment:fx,dithering_pars_fragment:px,roughnessmap_fragment:mx,roughnessmap_pars_fragment:gx,shadowmap_pars_fragment:xx,shadowmap_pars_vertex:yx,shadowmap_vertex:vx,shadowmask_pars_fragment:_x,skinbase_vertex:bx,skinning_pars_vertex:Mx,skinning_vertex:Sx,skinnormal_vertex:wx,specularmap_fragment:Tx,specularmap_pars_fragment:Ex,tonemapping_fragment:Ax,tonemapping_pars_fragment:Rx,transmission_fragment:Cx,transmission_pars_fragment:Px,uv_pars_fragment:Ix,uv_pars_vertex:Lx,uv_vertex:Nx,worldpos_vertex:Dx,background_vert:kx,background_frag:Ux,backgroundCube_vert:Ox,backgroundCube_frag:Fx,cube_vert:zx,cube_frag:Bx,depth_vert:Hx,depth_frag:Gx,distance_vert:Vx,distance_frag:Wx,equirect_vert:Xx,equirect_frag:$x,linedashed_vert:qx,linedashed_frag:Yx,meshbasic_vert:Kx,meshbasic_frag:Zx,meshlambert_vert:Jx,meshlambert_frag:jx,meshmatcap_vert:Qx,meshmatcap_frag:ty,meshnormal_vert:ey,meshnormal_frag:ny,meshphong_vert:iy,meshphong_frag:sy,meshphysical_vert:ry,meshphysical_frag:oy,meshtoon_vert:ay,meshtoon_frag:ly,points_vert:cy,points_frag:hy,shadow_vert:uy,shadow_frag:dy,sprite_vert:fy,sprite_frag:py},dt={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new Zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new Zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},hi={basic:{uniforms:cn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:cn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Qt(0)},envMapIntensity:{value:1}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:cn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:cn([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:cn([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Qt(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:cn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:cn([dt.points,dt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:cn([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:cn([dt.common,dt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:cn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:cn([dt.sprite,dt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distance:{uniforms:cn([dt.common,dt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distance_vert,fragmentShader:se.distance_frag},shadow:{uniforms:cn([dt.lights,dt.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};hi.physical={uniforms:cn([hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new Zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new Zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new Zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};var _l={r:0,b:0,g:0},my=new oe,Df=new Wt;Df.set(-1,0,0,0,1,0,0,0,1);function gy(s,t,e,n,i,r){let o=new Qt(0),a=i===!0?0:1,l,c,h=null,d=0,u=null;function f(M){let y=M.isScene===!0?M.background:null;if(y&&y.isTexture){let v=M.backgroundBlurriness>0;y=t.get(y,v)}return y}function g(M){let y=!1,v=f(M);v===null?p(o,a):v&&v.isColor&&(p(v,1),y=!0);let b=s.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||y)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(M,y){let v=f(y);v&&(v.isCubeTexture||v.mapping===eo)?(c===void 0&&(c=new ie(new Bi(1,1,1),new Oe({name:"BackgroundCubeMaterial",uniforms:Ms(hi.backgroundCube.uniforms),vertexShader:hi.backgroundCube.vertexShader,fragmentShader:hi.backgroundCube.fragmentShader,side:Qe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,S,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(my.makeRotationFromEuler(y.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Df),c.material.toneMapped=ae.getTransfer(v.colorSpace)!==ye,(h!==v||d!==v.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ie(new Rn(2,2),new Oe({name:"BackgroundMaterial",uniforms:Ms(hi.background.uniforms),vertexShader:hi.background.vertexShader,fragmentShader:hi.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=ae.getTransfer(v.colorSpace)!==ye,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=s.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,y){M.getRGB(_l,Ih(s)),e.buffers.color.setClear(_l.r,_l.g,_l.b,y,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,y=1){o.set(M),a=y,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,p(o,a)},render:g,addToRenderList:x,dispose:m}}function xy(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,o=!1;function a(P,N,F,I,z){let q=!1,Y=d(P,I,F,N);r!==Y&&(r=Y,c(r.object)),q=f(P,I,F,z),q&&g(P,I,F,z),z!==null&&t.update(z,s.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,v(P,N,F,I),z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return s.createVertexArray()}function c(P){return s.bindVertexArray(P)}function h(P){return s.deleteVertexArray(P)}function d(P,N,F,I){let z=I.wireframe===!0,q=n[N.id];q===void 0&&(q={},n[N.id]=q);let Y=P.isInstancedMesh===!0?P.id:0,st=q[Y];st===void 0&&(st={},q[Y]=st);let Z=st[F.id];Z===void 0&&(Z={},st[F.id]=Z);let tt=Z[z];return tt===void 0&&(tt=u(l()),Z[z]=tt),tt}function u(P){let N=[],F=[],I=[];for(let z=0;z<e;z++)N[z]=0,F[z]=0,I[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:F,attributeDivisors:I,object:P,attributes:{},index:null}}function f(P,N,F,I){let z=r.attributes,q=N.attributes,Y=0,st=F.getAttributes();for(let Z in st)if(st[Z].location>=0){let $=z[Z],_t=q[Z];if(_t===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(_t=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(_t=P.instanceColor)),$===void 0||$.attribute!==_t||_t&&$.data!==_t.data)return!0;Y++}return r.attributesNum!==Y||r.index!==I}function g(P,N,F,I){let z={},q=N.attributes,Y=0,st=F.getAttributes();for(let Z in st)if(st[Z].location>=0){let $=q[Z];$===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&($=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&($=P.instanceColor));let _t={};_t.attribute=$,$&&$.data&&(_t.data=$.data),z[Z]=_t,Y++}r.attributes=z,r.attributesNum=Y,r.index=I}function x(){let P=r.newAttributes;for(let N=0,F=P.length;N<F;N++)P[N]=0}function p(P){m(P,0)}function m(P,N){let F=r.newAttributes,I=r.enabledAttributes,z=r.attributeDivisors;F[P]=1,I[P]===0&&(s.enableVertexAttribArray(P),I[P]=1),z[P]!==N&&(s.vertexAttribDivisor(P,N),z[P]=N)}function M(){let P=r.newAttributes,N=r.enabledAttributes;for(let F=0,I=N.length;F<I;F++)N[F]!==P[F]&&(s.disableVertexAttribArray(F),N[F]=0)}function y(P,N,F,I,z,q,Y){Y===!0?s.vertexAttribIPointer(P,N,F,z,q):s.vertexAttribPointer(P,N,F,I,z,q)}function v(P,N,F,I){x();let z=I.attributes,q=F.getAttributes(),Y=N.defaultAttributeValues;for(let st in q){let Z=q[st];if(Z.location>=0){let tt=z[st];if(tt===void 0&&(st==="instanceMatrix"&&P.instanceMatrix&&(tt=P.instanceMatrix),st==="instanceColor"&&P.instanceColor&&(tt=P.instanceColor)),tt!==void 0){let $=tt.normalized,_t=tt.itemSize,Et=t.get(tt);if(Et===void 0)continue;let lt=Et.buffer,nt=Et.type,Bt=Et.bytesPerElement,V=nt===s.INT||nt===s.UNSIGNED_INT||tt.gpuType===ka;if(tt.isInterleavedBufferAttribute){let K=tt.data,ut=K.stride,At=tt.offset;if(K.isInstancedInterleavedBuffer){for(let ct=0;ct<Z.locationSize;ct++)m(Z.location+ct,K.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ct=0;ct<Z.locationSize;ct++)p(Z.location+ct);s.bindBuffer(s.ARRAY_BUFFER,lt);for(let ct=0;ct<Z.locationSize;ct++)y(Z.location+ct,_t/Z.locationSize,nt,$,ut*Bt,(At+_t/Z.locationSize*ct)*Bt,V)}else{if(tt.isInstancedBufferAttribute){for(let K=0;K<Z.locationSize;K++)m(Z.location+K,tt.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let K=0;K<Z.locationSize;K++)p(Z.location+K);s.bindBuffer(s.ARRAY_BUFFER,lt);for(let K=0;K<Z.locationSize;K++)y(Z.location+K,_t/Z.locationSize,nt,$,_t*Bt,_t/Z.locationSize*K*Bt,V)}}else if(Y!==void 0){let $=Y[st];if($!==void 0)switch($.length){case 2:s.vertexAttrib2fv(Z.location,$);break;case 3:s.vertexAttrib3fv(Z.location,$);break;case 4:s.vertexAttrib4fv(Z.location,$);break;default:s.vertexAttrib1fv(Z.location,$)}}}}M()}function b(){A();for(let P in n){let N=n[P];for(let F in N){let I=N[F];for(let z in I){let q=I[z];for(let Y in q)h(q[Y].object),delete q[Y];delete I[z]}}delete n[P]}}function S(P){if(n[P.id]===void 0)return;let N=n[P.id];for(let F in N){let I=N[F];for(let z in I){let q=I[z];for(let Y in q)h(q[Y].object),delete q[Y];delete I[z]}}delete n[P.id]}function E(P){for(let N in n){let F=n[N];for(let I in F){let z=F[I];if(z[P.id]===void 0)continue;let q=z[P.id];for(let Y in q)h(q[Y].object),delete q[Y];delete z[P.id]}}}function _(P){for(let N in n){let F=n[N],I=P.isInstancedMesh===!0?P.id:0,z=F[I];if(z!==void 0){for(let q in z){let Y=z[q];for(let st in Y)h(Y[st].object),delete Y[st];delete z[q]}delete F[I],Object.keys(F).length===0&&delete n[N]}}}function A(){C(),o=!0,r!==i&&(r=i,c(r.object))}function C(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:A,resetDefaultState:C,dispose:b,releaseStatesOfGeometry:S,releaseStatesOfObject:_,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:p,disableUnusedAttributes:M}}function yy(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function vy(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let E=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==bn&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){let _=E===Yn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==vn&&E!==_n&&!_&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Gt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Gt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),b=s.getParameter(s.MAX_SAMPLES),S=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:v,maxSamples:b,samples:S}}function _y(s){let t=this,e=null,n=0,i=!1,r=!1,o=new Wn,a=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,x=d.clipIntersection,p=d.clipShadows,m=s.get(d);if(!i||g===null||g.length===0||r&&!p)r?h(null):c();else{let M=r?0:n,y=M*4,v=m.clippingState||null;l.value=v,v=h(g,u,y,f);for(let b=0;b!==y;++b)v[b]=e[b];m.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){let x=d!==null?d.length:0,p=null;if(x!==0){if(p=l.value,g!==!0||p===null){let m=f+x*4,M=u.matrixWorldInverse;a.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let y=0,v=f;y!==x;++y,v+=4)o.copy(d[y]).applyMatrix4(M,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}var pr=4,by=6,My=20,Sy=256,ho=new $i,df=new Qt,Bh=null,Hh=0,Gh=0,Vh=!1,wy=new L,Ss=new L,Ml=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){let{size:o=256,position:a=wy}=r;Bh=this._renderer.getRenderTarget(),Hh=this._renderer.getActiveCubeFace(),Gh=this._renderer.getActiveMipmapLevel(),Vh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Bh,Hh,Gh),this._renderer.xr.enabled=Vh,t.scissorTest=!1,fr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===qi||t.mapping===_s?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Bh=this._renderer.getRenderTarget(),Hh=this._renderer.getActiveCubeFace(),Gh=this._renderer.getActiveMipmapLevel(),Vh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Xe,minFilter:Xe,generateMipmaps:!1,type:Yn,format:bn,colorSpace:ps,depthBuffer:!1},i=ff(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ff(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ty(r)),this._blurMaterial=Ay(r,t,e),this._ggxMaterial=Ey(r,t,e)}return i}_compileMaterial(t){let e=new ie(new je,t);this._renderer.compile(e,ho)}_sceneToCubeUV(t,e,n,i,r){let l=new an(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(df),d.toneMapping=$n,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ie(new Bi,new gs({name:"PMREM.Background",side:Qe,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,p=x.material,m=!1,M=t.background;M?M.isColor&&(p.color.copy(M),t.background=null,m=!0):(p.color.copy(df),m=!0);for(let y=0;y<6;y++){let v=y%3;v===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):v===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));let b=this._cubeSize;fr(i,v*b,y>2?b:0,b,b),d.setRenderTarget(i),m&&d.render(x,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=M}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===qi||t.mapping===_s;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=mf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pf());let r=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;fr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ho)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let i=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:g}=this,x=this._sizeLods[n],p=3*x*(n>g-pr?n-g+pr:0),m=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-e,fr(r,p,m,3*x,2*x),i.setRenderTarget(r),i.render(a,ho),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,fr(t,p,m,3*x,2*x),i.setRenderTarget(t),i.render(a,ho)}_blur(t,e,n,i){let r=this._pingPongRenderTarget,o=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,i,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[i];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],d=3*h*(i>this._lodMax-pr?i-this._lodMax+pr:0),u=4*(this._cubeSize-h);fr(e,d,u,3*h,2*h),o.setRenderTarget(e),o.render(l,ho)}};function Ty(s){let t=[],e=[],n=s,i=s-pr+1+by;for(let r=0;r<i;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,g=new Float32Array(f*u*d),x=new Float32Array(f*u*d);for(let m=0;m<d;m++){let M=m%3*2/3-1,y=m>2?0:-1,v=[M,y,0,M+2/3,y,0,M+2/3,y+1,0,M,y,0,M+2/3,y+1,0,M,y+1,0];g.set(v,f*u*m);for(let b=0;b<u;b++){let S=h[b*2]*2-1,E=h[b*2+1]*2-1;m===0?Ss.set(1,E,S):m===1?Ss.set(-S,1,-E):m===2?Ss.set(-S,E,1):m===3?Ss.set(-1,E,-S):m===4?Ss.set(-S,-1,E):Ss.set(S,E,-1),Ss.toArray(x,(m*u+b)*f)}}let p=new je;p.setAttribute("position",new An(g,f)),p.setAttribute("outputDirection",new An(x,f)),e.push(new ie(p,null)),n>pr&&n--}return{lodMeshes:e,sizeLods:t}}function ff(s,t,e){let n=new ln(s,t,e);return n.texture.mapping=eo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Ey(s,t,e){return new Oe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Sy,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:wl(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function Ay(s,t,e){return new Oe({name:"SphericalGaussianBlur",defines:{SAMPLES:My,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:wl(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function pf(){return new Oe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wl(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function mf(){return new Oe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function wl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var gr=class extends ln{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new $r(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Bi(5,5,5),r=new Oe({name:"CubemapFromEquirect",uniforms:Ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Qe,blending:li});r.uniforms.tEquirect.value=e;let o=new ie(i,r),a=e.minFilter;return e.minFilter===Yi&&(e.minFilter=Xe),new ar(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}};function Ry(s){let t=new WeakMap,e=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===La||f===Na)if(t.has(u)){let g=t.get(u).texture;return a(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let x=new gr(g.height);return x.fromEquirectangularTexture(s,u),t.set(u,x),u.addEventListener("dispose",c),a(x.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let f=u.mapping,g=f===La||f===Na,x=f===qi||f===_s;if(g||x){let p=e.get(u),m=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new Ml(s)),p=g?n.fromEquirectangular(u,p):n.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),p.texture;if(p!==void 0)return p.texture;{let M=u.image;return g&&M&&M.height>0||x&&M&&l(M)?(n===null&&(n=new Ml(s)),p=g?n.fromEquirectangular(u):n.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function a(u,f){return f===La?u.mapping=qi:f===Na&&(u.mapping=_s),u}function l(u){let f=0,g=6;for(let x=0;x<g;x++)u[x]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function Cy(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&fs("WebGLRenderer: "+n+" extension not supported."),i}}}function Py(s,t,e,n){let i={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete i[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],s.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,x=0;if(g===void 0)return;if(f!==null){let M=f.array;x=f.version;for(let y=0,v=M.length;y<v;y+=3){let b=M[y+0],S=M[y+1],E=M[y+2];u.push(b,S,S,E,E,b)}}else{let M=g.array;x=g.version;for(let y=0,v=M.length/3-1;y<v;y+=3){let b=y+0,S=y+1,E=y+2;u.push(b,S,S,E,E,b)}}let p=new(g.count>=65535?Xr:Wr)(u,1);p.version=x;let m=r.get(d);m&&t.remove(m),r.set(d,p)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Iy(s,t,e){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,u){s.drawElements(n,u,r,d*o),e.update(u,n,1)}function c(d,u,f){f!==0&&(s.drawElementsInstanced(n,u,r,d*o,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let x=0;for(let p=0;p<f;p++)x+=u[p];e.update(x,n,1)}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Ly(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:Xt("WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Ny(s,t,e){let n=new WeakMap,i=new Te;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let A=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],y=0;f===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let v=a.attributes.position.count*y,b=1;v>t.maxTextureSize&&(b=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let S=new Float32Array(v*b*4*d),E=new Hr(S,v,b,d);E.type=_n,E.needsUpdate=!0;let _=y*4;for(let C=0;C<d;C++){let P=p[C],N=m[C],F=M[C],I=v*b*4*C;for(let z=0;z<P.count;z++){let q=z*_;f===!0&&(i.fromBufferAttribute(P,z),S[I+q+0]=i.x,S[I+q+1]=i.y,S[I+q+2]=i.z,S[I+q+3]=0),g===!0&&(i.fromBufferAttribute(N,z),S[I+q+4]=i.x,S[I+q+5]=i.y,S[I+q+6]=i.z,S[I+q+7]=0),x===!0&&(i.fromBufferAttribute(F,z),S[I+q+8]=i.x,S[I+q+9]=i.y,S[I+q+10]=i.z,S[I+q+11]=F.itemSize===4?i.w:1)}}u={count:d,texture:E,size:new Zt(v,b)},n.set(a,u),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Dy(s,t,e,n,i){let r=new WeakMap;function o(c){let h=i.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var ky={[dh]:"LINEAR_TONE_MAPPING",[fh]:"REINHARD_TONE_MAPPING",[ph]:"CINEON_TONE_MAPPING",[mh]:"ACES_FILMIC_TONE_MAPPING",[xh]:"AGX_TONE_MAPPING",[yh]:"NEUTRAL_TONE_MAPPING",[gh]:"CUSTOM_TONE_MAPPING"};function Uy(s,t,e,n,i,r){let o=new ln(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new je;c.setAttribute("position",new me([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new me([0,2,0,0,2,0],2));let h=new ma({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new ie(c,h),u=new $i(-1,1,1,-1,0,1),f=null,g=null,x=!1,p,m=null,M=[],y=!1;this.setSize=function(v,b){o.setSize(v,b),a!==null&&a.setSize(v,b),l!==null&&l.setSize(v,b);for(let S=0;S<M.length;S++){let E=M[S];E.setSize&&E.setSize(v,b)}},this.setEffects=function(v){M=v,y=M.length>0&&M[0].isRenderPass===!0;let b=o.width,S=o.height;M.length>0&&a===null&&(a=new ln(b,S,{type:Yn,depthBuffer:!1,stencilBuffer:!1}),l=new ln(b,S,{type:Yn,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<M.length;E++){let _=M[E];_.setSize&&_.setSize(b,S)}},this.begin=function(v,b){if(x||v.toneMapping===$n&&M.length===0)return!1;if(m=b,b!==null){let S=b.width,E=b.height;(o.width!==S||o.height!==E)&&this.setSize(S,E)}return y===!1&&v.setRenderTarget(o),p=v.toneMapping,v.toneMapping=$n,!0},this.hasRenderPass=function(){return y},this.end=function(v,b){v.toneMapping=p,x=!0;let S=o,E=a;for(let _=0;_<M.length;_++){let A=M[_];A.enabled!==!1&&(A.render(v,E,S,b),A.needsSwap!==!1&&(S=E,E=E===a?l:a))}if(f!==v.outputColorSpace||g!==v.toneMapping){f=v.outputColorSpace,g=v.toneMapping,h.defines={},ae.getTransfer(f)===ye&&(h.defines.SRGB_TRANSFER="");let _=ky[g];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,v.setRenderTarget(m),v.render(d,u),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var kf=new fn,$h=new zi(1,1),Uf=new Hr,Of=new da,Ff=new $r,gf=[],xf=[],yf=new Float32Array(16),vf=new Float32Array(9),_f=new Float32Array(4);function xr(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=gf[i];if(r===void 0&&(r=new Float32Array(i),gf[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function qe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ye(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Tl(s,t){let e=xf[t];e===void 0&&(e=new Int32Array(t),xf[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Oy(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Fy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;s.uniform2fv(this.addr,t),Ye(e,t)}}function zy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(qe(e,t))return;s.uniform3fv(this.addr,t),Ye(e,t)}}function By(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;s.uniform4fv(this.addr,t),Ye(e,t)}}function Hy(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(qe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ye(e,t)}else{if(qe(e,n))return;_f.set(n),s.uniformMatrix2fv(this.addr,!1,_f),Ye(e,n)}}function Gy(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(qe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ye(e,t)}else{if(qe(e,n))return;vf.set(n),s.uniformMatrix3fv(this.addr,!1,vf),Ye(e,n)}}function Vy(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(qe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ye(e,t)}else{if(qe(e,n))return;yf.set(n),s.uniformMatrix4fv(this.addr,!1,yf),Ye(e,n)}}function Wy(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Xy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;s.uniform2iv(this.addr,t),Ye(e,t)}}function $y(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(qe(e,t))return;s.uniform3iv(this.addr,t),Ye(e,t)}}function qy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;s.uniform4iv(this.addr,t),Ye(e,t)}}function Yy(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Ky(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;s.uniform2uiv(this.addr,t),Ye(e,t)}}function Zy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(qe(e,t))return;s.uniform3uiv(this.addr,t),Ye(e,t)}}function Jy(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;s.uniform4uiv(this.addr,t),Ye(e,t)}}function jy(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?($h.compareFunction=e.isReversedDepthBuffer()?vl:yl,r=$h):r=kf,e.setTexture2D(t||r,i)}function Qy(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Of,i)}function tv(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Ff,i)}function ev(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Uf,i)}function nv(s){switch(s){case 5126:return Oy;case 35664:return Fy;case 35665:return zy;case 35666:return By;case 35674:return Hy;case 35675:return Gy;case 35676:return Vy;case 5124:case 35670:return Wy;case 35667:case 35671:return Xy;case 35668:case 35672:return $y;case 35669:case 35673:return qy;case 5125:return Yy;case 36294:return Ky;case 36295:return Zy;case 36296:return Jy;case 35678:case 36198:case 36298:case 36306:case 35682:return jy;case 35679:case 36299:case 36307:return Qy;case 35680:case 36300:case 36308:case 36293:return tv;case 36289:case 36303:case 36311:case 36292:return ev}}function iv(s,t){s.uniform1fv(this.addr,t)}function sv(s,t){let e=xr(t,this.size,2);s.uniform2fv(this.addr,e)}function rv(s,t){let e=xr(t,this.size,3);s.uniform3fv(this.addr,e)}function ov(s,t){let e=xr(t,this.size,4);s.uniform4fv(this.addr,e)}function av(s,t){let e=xr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function lv(s,t){let e=xr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function cv(s,t){let e=xr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function hv(s,t){s.uniform1iv(this.addr,t)}function uv(s,t){s.uniform2iv(this.addr,t)}function dv(s,t){s.uniform3iv(this.addr,t)}function fv(s,t){s.uniform4iv(this.addr,t)}function pv(s,t){s.uniform1uiv(this.addr,t)}function mv(s,t){s.uniform2uiv(this.addr,t)}function gv(s,t){s.uniform3uiv(this.addr,t)}function xv(s,t){s.uniform4uiv(this.addr,t)}function yv(s,t,e){let n=this.cache,i=t.length,r=Tl(e,i);qe(n,r)||(s.uniform1iv(this.addr,r),Ye(n,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=$h:o=kf;for(let a=0;a!==i;++a)e.setTexture2D(t[a]||o,r[a])}function vv(s,t,e){let n=this.cache,i=t.length,r=Tl(e,i);qe(n,r)||(s.uniform1iv(this.addr,r),Ye(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Of,r[o])}function _v(s,t,e){let n=this.cache,i=t.length,r=Tl(e,i);qe(n,r)||(s.uniform1iv(this.addr,r),Ye(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Ff,r[o])}function bv(s,t,e){let n=this.cache,i=t.length,r=Tl(e,i);qe(n,r)||(s.uniform1iv(this.addr,r),Ye(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Uf,r[o])}function Mv(s){switch(s){case 5126:return iv;case 35664:return sv;case 35665:return rv;case 35666:return ov;case 35674:return av;case 35675:return lv;case 35676:return cv;case 5124:case 35670:return hv;case 35667:case 35671:return uv;case 35668:case 35672:return dv;case 35669:case 35673:return fv;case 5125:return pv;case 36294:return mv;case 36295:return gv;case 36296:return xv;case 35678:case 36198:case 36298:case 36306:case 35682:return yv;case 35679:case 36299:case 36307:return vv;case 35680:case 36300:case 36308:case 36293:return _v;case 36289:case 36303:case 36311:case 36292:return bv}}var qh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=nv(e.type)}},Yh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Mv(e.type)}},Kh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},Wh=/(\w+)(\])?(\[|\.)?/g;function bf(s,t){s.seq.push(t),s.map[t.id]=t}function Sv(s,t,e){let n=s.name,i=n.length;for(Wh.lastIndex=0;;){let r=Wh.exec(n),o=Wh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){bf(e,c===void 0?new qh(a,s,t):new Yh(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new Kh(a),bf(e,d)),e=d}}}var mr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);Sv(a,l,this)}let i=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(o):r.push(o);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function Mf(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var wv=37297,Tv=0;function Ev(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Sf=new Wt;function Av(s){ae._getMatrix(Sf,ae.workingColorSpace,s);let t=`mat3( ${Sf.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(s)){case zr:return[t,"LinearTransferOETF"];case ye:return[t,"sRGBTransferOETF"];default:return Gt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function wf(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Ev(s.getShaderSource(t),a)}else return r}function Rv(s,t){let e=Av(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Cv={[dh]:"Linear",[fh]:"Reinhard",[ph]:"Cineon",[mh]:"ACESFilmic",[xh]:"AgX",[yh]:"Neutral",[gh]:"Custom"};function Pv(s,t){let e=Cv[t];return e===void 0?(Gt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var bl=new L;function Iv(){ae.getLuminanceCoefficients(bl);let s=bl.x.toFixed(4),t=bl.y.toFixed(4),e=bl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fo).join(`
`)}function Nv(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Dv(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function fo(s){return s!==""}function Tf(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ef(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var kv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zh(s){return s.replace(kv,Ov)}var Uv=new Map;function Ov(s,t){let e=se[t];if(e===void 0){let n=Uv.get(t);if(n!==void 0)e=se[n],Gt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Zh(e)}var Fv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Af(s){return s.replace(Fv,zv)}function zv(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Rf(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}var Bv={[to]:"SHADOWMAP_TYPE_PCF",[lr]:"SHADOWMAP_TYPE_VSM"};function Hv(s){return Bv[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Gv={[qi]:"ENVMAP_TYPE_CUBE",[_s]:"ENVMAP_TYPE_CUBE",[eo]:"ENVMAP_TYPE_CUBE_UV"};function Vv(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Gv[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var Wv={[_s]:"ENVMAP_MODE_REFRACTION"};function Xv(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Wv[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var $v={[uh]:"ENVMAP_BLENDING_MULTIPLY",[Xd]:"ENVMAP_BLENDING_MIX",[$d]:"ENVMAP_BLENDING_ADD"};function qv(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":$v[s.combine]||"ENVMAP_BLENDING_NONE"}function Yv(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Kv(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Hv(e),c=Vv(e),h=Xv(e),d=qv(e),u=Yv(e),f=Lv(e),g=Nv(r),x=i.createProgram(),p,m,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fo).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fo).join(`
`),m.length>0&&(m+=`
`)):(p=[Rf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fo).join(`
`),m=[Rf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?se.tonemapping_pars_fragment:"",e.toneMapping!==$n?Pv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,Rv("linearToOutputTexel",e.outputColorSpace),Iv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(fo).join(`
`)),o=Zh(o),o=Tf(o,e),o=Ef(o,e),a=Zh(a),a=Tf(a,e),a=Ef(a,e),o=Af(o),a=Af(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Rh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Rh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let y=M+p+o,v=M+m+a,b=Mf(i,i.VERTEX_SHADER,y),S=Mf(i,i.FRAGMENT_SHADER,v);i.attachShader(x,b),i.attachShader(x,S),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function E(P){if(s.debug.checkShaderErrors){let N=i.getProgramInfoLog(x)||"",F=i.getShaderInfoLog(b)||"",I=i.getShaderInfoLog(S)||"",z=N.trim(),q=F.trim(),Y=I.trim(),st=!0,Z=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(st=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,b,S);else{let tt=wf(i,b,"vertex"),$=wf(i,S,"fragment");Xt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+tt+`
`+$)}else z!==""?Gt("WebGLProgram: Program Info Log:",z):(q===""||Y==="")&&(Z=!1);Z&&(P.diagnostics={runnable:st,programLog:z,vertexShader:{log:q,prefix:p},fragmentShader:{log:Y,prefix:m}})}i.deleteShader(b),i.deleteShader(S),_=new mr(i,x),A=Dv(i,x)}let _;this.getUniforms=function(){return _===void 0&&E(this),_};let A;this.getAttributes=function(){return A===void 0&&E(this),A};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=i.getProgramParameter(x,wv)),C},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Tv++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=b,this.fragmentShader=S,this}var Zv=0,Jh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new jh(t),e.set(t,n)),n}},jh=class{constructor(t){this.id=Zv++,this.code=t,this.usedTimes=0}};function Jv(s){return s===Zi||s===ao||s===lo}function jv(s,t,e,n,i,r){let o=new Gr,a=new Jh,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function x(_,A,C,P,N,F){let I=P.fog,z=N.geometry,q=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,Y=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,st=t.get(_.envMap||q,Y),Z=st&&st.mapping===eo?st.image.height:null,tt=f[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Gt("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let $=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,_t=$!==void 0?$.length:0,Et=0;z.morphAttributes.position!==void 0&&(Et=1),z.morphAttributes.normal!==void 0&&(Et=2),z.morphAttributes.color!==void 0&&(Et=3);let lt,nt,Bt,V;if(tt){let Re=hi[tt];lt=Re.vertexShader,nt=Re.fragmentShader}else{lt=_.vertexShader,nt=_.fragmentShader;let Re=a.getVertexShaderStage(_),ge=a.getFragmentShaderStage(_);a.update(_,Re,ge),Bt=Re.id,V=ge.id}let K=s.getRenderTarget(),ut=s.state.buffers.depth.getReversed(),At=N.isInstancedMesh===!0,ct=N.isBatchedMesh===!0,Ut=!!_.map,pe=!!_.matcap,qt=!!st,Yt=!!_.aoMap,re=!!_.lightMap,Lt=!!_.bumpMap&&_.wireframe===!1,ce=!!_.normalMap,Ae=!!_.displacementMap,Ke=!!_.emissiveMap,Se=!!_.metalnessMap,Ge=!!_.roughnessMap,O=_.anisotropy>0,nn=_.clearcoat>0,_e=_.dispersion>0,R=_.retroreflectivity>0,w=_.iridescence>0,B=_.sheen>0,W=_.transmission>0,J=O&&!!_.anisotropyMap,at=nn&&!!_.clearcoatMap,pt=nn&&!!_.clearcoatNormalMap,j=nn&&!!_.clearcoatRoughnessMap,it=w&&!!_.iridescenceMap,mt=w&&!!_.iridescenceThicknessMap,Nt=B&&!!_.sheenColorMap,vt=B&&!!_.sheenRoughnessMap,gt=!!_.specularMap,Dt=!!_.specularColorMap,Ht=!!_.specularIntensityMap,jt=W&&!!_.transmissionMap,U=W&&!!_.thicknessMap,xt=!!_.gradientMap,et=!!_.alphaMap,yt=_.alphaTest>0,St=!!_.alphaHash,rt=!!_.extensions,kt=$n;_.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(kt=s.toneMapping);let Pt={shaderID:tt,shaderType:_.type,shaderName:_.name,vertexShader:lt,fragmentShader:nt,defines:_.defines,customVertexShaderID:Bt,customFragmentShaderID:V,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:ct,batchingColor:ct&&N._colorsTexture!==null,instancing:At,instancingColor:At&&N.instanceColor!==null,instancingMorph:At&&N.morphTexture!==null,outputColorSpace:K===null?s.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:ae.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Ut,matcap:pe,envMap:qt,envMapMode:qt&&st.mapping,envMapCubeUVHeight:Z,aoMap:Yt,lightMap:re,bumpMap:Lt,normalMap:ce,displacementMap:Ae,emissiveMap:Ke,normalMapObjectSpace:ce&&_.normalMapType===Kd,normalMapTangentSpace:ce&&_.normalMapType===Eh,packedNormalMap:ce&&_.normalMapType===Eh&&Jv(_.normalMap.format),metalnessMap:Se,roughnessMap:Ge,anisotropy:O,anisotropyMap:J,clearcoat:nn,clearcoatMap:at,clearcoatNormalMap:pt,clearcoatRoughnessMap:j,dispersion:_e,retroreflection:R,iridescence:w,iridescenceMap:it,iridescenceThicknessMap:mt,sheen:B,sheenColorMap:Nt,sheenRoughnessMap:vt,specularMap:gt,specularColorMap:Dt,specularIntensityMap:Ht,transmission:W,transmissionMap:jt,thicknessMap:U,gradientMap:xt,opaque:_.transparent===!1&&_.blending===cr&&_.alphaToCoverage===!1,alphaMap:et,alphaTest:yt,alphaHash:St,combine:_.combine,mapUv:Ut&&g(_.map.channel),aoMapUv:Yt&&g(_.aoMap.channel),lightMapUv:re&&g(_.lightMap.channel),bumpMapUv:Lt&&g(_.bumpMap.channel),normalMapUv:ce&&g(_.normalMap.channel),displacementMapUv:Ae&&g(_.displacementMap.channel),emissiveMapUv:Ke&&g(_.emissiveMap.channel),metalnessMapUv:Se&&g(_.metalnessMap.channel),roughnessMapUv:Ge&&g(_.roughnessMap.channel),anisotropyMapUv:J&&g(_.anisotropyMap.channel),clearcoatMapUv:at&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:pt&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:it&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:vt&&g(_.sheenRoughnessMap.channel),specularMapUv:gt&&g(_.specularMap.channel),specularColorMapUv:Dt&&g(_.specularColorMap.channel),specularIntensityMapUv:Ht&&g(_.specularIntensityMap.channel),transmissionMapUv:jt&&g(_.transmissionMap.channel),thicknessMapUv:U&&g(_.thicknessMap.channel),alphaMapUv:et&&g(_.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(ce||O),vertexNormals:!!z.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!z.attributes.uv&&(Ut||et),fog:!!I,useFog:_.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||z.attributes.normal===void 0&&ce===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ut,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:Et,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:kt,decodeVideoTexture:Ut&&_.map.isVideoTexture===!0&&ae.getTransfer(_.map.colorSpace)===ye,decodeVideoTextureEmissive:Ke&&_.emissiveMap.isVideoTexture===!0&&ae.getTransfer(_.emissiveMap.colorSpace)===ye,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Un,flipSided:_.side===Qe,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:rt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&_.extensions.multiDraw===!0||ct)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Pt.vertexUv1s=l.has(1),Pt.vertexUv2s=l.has(2),Pt.vertexUv3s=l.has(3),l.clear(),Pt}function p(_){let A=[];if(_.shaderID?A.push(_.shaderID):(A.push(_.customVertexShaderID),A.push(_.customFragmentShaderID)),_.defines!==void 0)for(let C in _.defines)A.push(C),A.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(m(A,_),M(A,_),A.push(s.outputColorSpace)),A.push(_.customProgramCacheKey),A.join()}function m(_,A){_.push(A.precision),_.push(A.outputColorSpace),_.push(A.envMapMode),_.push(A.envMapCubeUVHeight),_.push(A.mapUv),_.push(A.alphaMapUv),_.push(A.lightMapUv),_.push(A.aoMapUv),_.push(A.bumpMapUv),_.push(A.normalMapUv),_.push(A.displacementMapUv),_.push(A.emissiveMapUv),_.push(A.metalnessMapUv),_.push(A.roughnessMapUv),_.push(A.anisotropyMapUv),_.push(A.clearcoatMapUv),_.push(A.clearcoatNormalMapUv),_.push(A.clearcoatRoughnessMapUv),_.push(A.iridescenceMapUv),_.push(A.iridescenceThicknessMapUv),_.push(A.sheenColorMapUv),_.push(A.sheenRoughnessMapUv),_.push(A.specularMapUv),_.push(A.specularColorMapUv),_.push(A.specularIntensityMapUv),_.push(A.transmissionMapUv),_.push(A.thicknessMapUv),_.push(A.combine),_.push(A.fogExp2),_.push(A.sizeAttenuation),_.push(A.morphTargetsCount),_.push(A.morphAttributeCount),_.push(A.numSunLights),_.push(A.numDirLights),_.push(A.numPointLights),_.push(A.numSpotLights),_.push(A.numSpotLightMaps),_.push(A.numHemiLights),_.push(A.numRectAreaLights),_.push(A.numSunLightShadows),_.push(A.numDirLightShadows),_.push(A.numPointLightShadows),_.push(A.numSpotLightShadows),_.push(A.numSpotLightShadowsWithMaps),_.push(A.numLightProbes),_.push(A.shadowMapType),_.push(A.toneMapping),_.push(A.numClippingPlanes),_.push(A.numClipIntersection),_.push(A.depthPacking)}function M(_,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.retroreflection&&o.enable(24),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),A.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function y(_){let A=f[_.type],C;if(A){let P=hi[A];C=co.clone(P.uniforms)}else C=_.uniforms;return C}function v(_,A){let C=h.get(A);return C!==void 0?++C.usedTimes:(C=new Kv(s,A,_,i),c.push(C),h.set(A,C)),C}function b(_){if(--_.usedTimes===0){let A=c.indexOf(_);c[A]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function S(_){a.remove(_)}function E(){a.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:y,acquireProgram:v,releaseProgram:b,releaseShaderCache:S,programs:c,dispose:E}}function Qv(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function t_(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Cf(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Pf(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,g,x,p,m){let M=s[t];return M===void 0?(M={id:u.id,object:u,geometry:f,material:g,materialVariant:o(u),groupOrder:x,renderOrder:u.renderOrder,z:p,group:m},s[t]=M):(M.id=u.id,M.object=u,M.geometry=f,M.material=g,M.materialVariant=o(u),M.groupOrder=x,M.renderOrder=u.renderOrder,M.z=p,M.group=m),t++,M}function l(u,f,g,x,p,m,M){M.reversedDepth===!0&&(p=-p);let y=a(u,f,g,x,p,m);g.transmission>0?n.push(y):g.transparent===!0?i.push(y):e.push(y)}function c(u,f,g,x,p,m){let M=a(u,f,g,x,p,m);g.transmission>0?n.unshift(M):g.transparent===!0?i.unshift(M):e.unshift(M)}function h(u,f){e.length>1&&e.sort(u||t_),n.length>1&&n.sort(f||Cf),i.length>1&&i.sort(f||Cf)}function d(){for(let u=t,f=s.length;u<f;u++){let g=s[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:d,sort:h}}function e_(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new Pf,s.set(n,[o])):i>=r.length?(o=new Pf,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function n_(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new L,color:new Qt};break;case"SpotLight":e={position:new L,direction:new L,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new L,halfWidth:new L,halfHeight:new L};break}return s[t.id]=e,e}}}function i_(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var s_=0;function r_(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function o_(s){let t=new n_,e=i_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let i=new L,r=new oe,o=new oe;function a(c){let h=0,d=0,u=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let f=0,g=0,x=0,p=0,m=0,M=0,y=0,v=0,b=0,S=0,E=0,_=0,A=0,C=0;c.sort(r_);for(let N=0,F=c.length;N<F;N++){let I=c[N],z=I.color,q=I.intensity,Y=I.distance,st=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Zi?st=I.shadow.map.texture:st=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=z.r*q,d+=z.g*q,u+=z.b*q;else if(I.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(I.sh.coefficients[Z],q);C++}else if(I.isSunLight){let Z=t.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let tt=I.shadow,$=e.get(I);$.shadowIntensity=tt.intensity,$.shadowBias=tt.bias,$.shadowNormalBias=tt.normalBias,$.shadowRadius=tt.radius,$.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),n.sunShadow[g]=$,n.sunShadowMap[g]=st;let _t=tt.getViewportCount();for(let Et=0;Et<_t;Et++)n.sunShadowMatrix[x+Et]=tt.getMatrix(Et),n.sunShadowCascade[x+Et]=tt._cascadeData[Et];x+=_t,g++}n.sun[f]=Z,f++}else if(I.isDirectionalLight){let Z=t.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let tt=I.shadow,$=e.get(I);$.shadowIntensity=tt.intensity,$.shadowBias=tt.bias,$.shadowNormalBias=tt.normalBias,$.shadowRadius=tt.radius,$.shadowMapSize=tt.mapSize,n.directionalShadow[p]=$,n.directionalShadowMap[p]=st,n.directionalShadowMatrix[p]=I.shadow.matrix,b++}n.directional[p]=Z,p++}else if(I.isSpotLight){let Z=t.get(I);Z.position.setFromMatrixPosition(I.matrixWorld),Z.color.copy(z).multiplyScalar(q),Z.distance=Y,Z.coneCos=Math.cos(I.angle),Z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Z.decay=I.decay,n.spot[M]=Z;let tt=I.shadow;if(I.map&&(n.spotLightMap[_]=I.map,_++,tt.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[M]=tt.matrix,I.castShadow){let $=e.get(I);$.shadowIntensity=tt.intensity,$.shadowBias=tt.bias,$.shadowNormalBias=tt.normalBias,$.shadowRadius=tt.radius,$.shadowMapSize=tt.mapSize,n.spotShadow[M]=$,n.spotShadowMap[M]=st,E++}M++}else if(I.isRectAreaLight){let Z=t.get(I);Z.color.copy(z).multiplyScalar(q),Z.halfWidth.set(I.width*.5,0,0),Z.halfHeight.set(0,I.height*.5,0),n.rectArea[y]=Z,y++}else if(I.isPointLight){let Z=t.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity),Z.distance=I.distance,Z.decay=I.decay,I.castShadow){let tt=I.shadow,$=e.get(I);$.shadowIntensity=tt.intensity,$.shadowBias=tt.bias,$.shadowNormalBias=tt.normalBias,$.shadowRadius=tt.radius,$.shadowMapSize=tt.mapSize,$.shadowCameraNear=tt.camera.near,$.shadowCameraFar=tt.camera.far,n.pointShadow[m]=$,n.pointShadowMap[m]=st,n.pointShadowMatrix[m]=I.shadow.matrix,S++}n.point[m]=Z,m++}else if(I.isHemisphereLight){let Z=t.get(I);Z.skyColor.copy(I.color).multiplyScalar(q),Z.groundColor.copy(I.groundColor).multiplyScalar(q),n.hemi[v]=Z,v++}}y>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let P=n.hash;(P.sunLength!==f||P.directionalLength!==p||P.pointLength!==m||P.spotLength!==M||P.rectAreaLength!==y||P.hemiLength!==v||P.numSunShadows!==g||P.numDirectionalShadows!==b||P.numPointShadows!==S||P.numSpotShadows!==E||P.numSpotMaps!==_||P.numLightProbes!==C)&&(n.sun.length=f,n.directional.length=p,n.spot.length=M,n.rectArea.length=y,n.point.length=m,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=E,n.spotShadowMap.length=E,n.spotLightMatrix.length=E+_-A,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,P.sunLength=f,P.directionalLength=p,P.pointLength=m,P.spotLength=M,P.rectAreaLength=y,P.hemiLength=v,P.numSunShadows=g,P.numDirectionalShadows=b,P.numPointShadows=S,P.numSpotShadows=E,P.numSpotMaps=_,P.numLightProbes=C,n.version=s_++)}function l(c,h){let d=0,u=0,f=0,g=0,x=0,p=0,m=h.matrixWorldInverse;for(let M=0,y=c.length;M<y;M++){let v=c[M];if(v.isSunLight){let b=n.sun[d];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(m),d++}else if(v.isDirectionalLight){let b=n.directional[u];b.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),u++}else if(v.isSpotLight){let b=n.spot[g];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),g++}else if(v.isRectAreaLight){let b=n.rectArea[x];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),b.halfWidth.set(v.width*.5,0,0),b.halfHeight.set(0,v.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),x++}else if(v.isPointLight){let b=n.point[f];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){let b=n.hemi[p];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(m),p++}}}return{setup:a,setupView:l,state:n}}function If(s){let t=new o_(s),e=[],n=[],i=[];function r(u){d.camera=u,e.length=0,n.length=0,i.length=0}function o(u){e.push(u)}function a(u){n.push(u)}function l(u){i.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function a_(s){let t=new WeakMap;function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new If(s),t.set(i,[a])):r>=o.length?(a=new If(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var l_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,c_=`uniform sampler2D shadow_pass;
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
}`,h_=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],u_=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Lf=new oe,uo=new L,Xh=new L;function d_(s,t,e){let n=new rr,i=new Zt,r=new Zt,o=new Te,a=new ga,l=new xa,c={},h=e.maxTextureSize,d={[ai]:Qe,[Qe]:ai,[Un]:Un},u=new Oe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Zt},radius:{value:4}},vertexShader:l_,fragmentShader:c_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new je;g.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ie(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=to;let m=this.type;this.render=function(S,E,_){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;this.type===Ed&&(Gt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=to);let A=s.getRenderTarget(),C=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),N=s.state;N.setBlending(li),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let F=m!==this.type;F&&E.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(z=>z.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,z=S.length;I<z;I++){let q=S[I],Y=q.shadow;if(Y===void 0){Gt("WebGLShadowMap:",q,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;i.copy(Y.mapSize);let st=Y.getFrameExtents();i.multiply(st),r.copy(Y.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/st.x),i.x=r.x*st.x,Y.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/st.y),i.y=r.y*st.y,Y.mapSize.y=r.y));let Z=s.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=Z,Y.map===null||F===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===lr){if(q.isPointLight){Gt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new ln(i.x,i.y,{format:Zi,type:Yn,minFilter:Xe,magFilter:Xe,generateMipmaps:!1}),Y.map.texture.name=q.name+".shadowMap",Y.map.depthTexture=new zi(i.x,i.y,_n),Y.map.depthTexture.name=q.name+".shadowMapDepth",Y.map.depthTexture.format=ni,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=ze,Y.map.depthTexture.magFilter=ze}else q.isPointLight?(Y.map=new gr(i.x),Y.map.depthTexture=new pa(i.x,qn)):(Y.map=new ln(i.x,i.y),Y.map.depthTexture=new zi(i.x,i.y,qn)),Y.map.depthTexture.name=q.name+".shadowMap",Y.map.depthTexture.format=ni,this.type===to?(Y.map.depthTexture.compareFunction=Z?vl:yl,Y.map.depthTexture.minFilter=Xe,Y.map.depthTexture.magFilter=Xe):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=ze,Y.map.depthTexture.magFilter=ze);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==i.x||Y.map.height!==i.y)&&Y.map.setSize(i.x,i.y);let tt=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();q.isPointLight!==!0&&Y.updateMatrices(q,_);for(let $=0;$<tt;$++){let _t=Y.getCamera($);if(q.isPointLight){let Et=Y.camera,lt=Y.matrix,nt=q.distance||Et.far;nt!==Et.far&&(Et.far=nt,Et.updateProjectionMatrix()),uo.setFromMatrixPosition(q.matrixWorld),Et.position.copy(uo),Xh.copy(Et.position),Xh.add(h_[$]),Et.up.copy(u_[$]),Et.lookAt(Xh),Et.updateMatrixWorld(),lt.makeTranslation(-uo.x,-uo.y,-uo.z),Lf.multiplyMatrices(Et.projectionMatrix,Et.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(Lf,Et.coordinateSystem,Et.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)s.setRenderTarget(Y.map,$),s.clear();else{$===0&&(s.setRenderTarget(Y.map),s.clear());let Et=Y.getViewport($);o.set(r.x*Et.x,r.y*Et.y,r.x*Et.z,r.y*Et.w),N.viewport(o)}n=Y.getFrustum($),v(E,_,_t,q,this.type)}Y.isPointLightShadow!==!0&&this.type===lr&&M(Y,_),Y.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(A,C,P)};function M(S,E){let _=t.update(x);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null?S.mapPass=new ln(i.x,i.y,{format:Zi,type:Yn}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(E,null,_,u,x,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(E,null,_,f,x,null)}function y(S,E,_,A){let C=null,P=_.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)C=P;else if(C=_.isPointLight===!0?l:a,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let N=C.uuid,F=E.uuid,I=c[N];I===void 0&&(I={},c[N]=I);let z=I[F];z===void 0&&(z=C.clone(),I[F]=z,E.addEventListener("dispose",b)),C=z}if(C.visible=E.visible,C.wireframe=E.wireframe,A===lr?C.side=E.shadowSide!==null?E.shadowSide:E.side:C.side=E.shadowSide!==null?E.shadowSide:d[E.side],C.alphaMap=E.alphaMap,C.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,C.map=E.map,C.clipShadows=E.clipShadows,C.clippingPlanes=E.clippingPlanes,C.clipIntersection=E.clipIntersection,C.displacementMap=E.displacementMap,C.displacementScale=E.displacementScale,C.displacementBias=E.displacementBias,C.wireframeLinewidth=E.wireframeLinewidth,C.linewidth=E.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let N=s.properties.get(C);N.light=_}return C}function v(S,E,_,A,C){if(S.visible===!1)return;if(S.layers.test(E.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&C===lr)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,S.matrixWorld);let F=t.update(S),I=S.material;if(Array.isArray(I)){let z=F.groups;for(let q=0,Y=z.length;q<Y;q++){let st=z[q],Z=I[st.materialIndex];if(Z&&Z.visible){let tt=y(S,Z,A,C);S.onBeforeShadow(s,S,E,_,F,tt,st),s.renderBufferDirect(_,null,F,tt,S,st),S.onAfterShadow(s,S,E,_,F,tt,st)}}}else if(I.visible){let z=y(S,I,A,C);S.onBeforeShadow(s,S,E,_,F,z,null),s.renderBufferDirect(_,null,F,z,S,null),S.onAfterShadow(s,S,E,_,F,z,null)}}let N=S.children;for(let F=0,I=N.length;F<I;F++)v(N[F],E,_,A,C)}function b(S){S.target.removeEventListener("dispose",b);for(let _ in c){let A=c[_],C=S.target.uuid;C in A&&(A[C].dispose(),delete A[C])}}}function f_(s,t){function e(){let U=!1,xt=new Te,et=null,yt=new Te(0,0,0,0);return{setMask:function(St){et!==St&&!U&&(s.colorMask(St,St,St,St),et=St)},setLocked:function(St){U=St},setClear:function(St,rt,kt,Pt,Re){Re===!0&&(St*=Pt,rt*=Pt,kt*=Pt),xt.set(St,rt,kt,Pt),yt.equals(xt)===!1&&(s.clearColor(St,rt,kt,Pt),yt.copy(xt))},reset:function(){U=!1,et=null,yt.set(-1,0,0,0)}}}function n(){let U=!1,xt=!1,et=null,yt=null,St=null;return{setReversed:function(rt){if(xt!==rt){let kt=t.get("EXT_clip_control");rt?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT),xt=rt;let Pt=St;St=null,this.setClear(Pt)}},getReversed:function(){return xt},setTest:function(rt){rt?K(s.DEPTH_TEST):ut(s.DEPTH_TEST)},setMask:function(rt){et!==rt&&!U&&(s.depthMask(rt),et=rt)},setFunc:function(rt){if(xt&&(rt=lf[rt]),yt!==rt){switch(rt){case ta:s.depthFunc(s.NEVER);break;case ea:s.depthFunc(s.ALWAYS);break;case na:s.depthFunc(s.LESS);break;case Js:s.depthFunc(s.LEQUAL);break;case ia:s.depthFunc(s.EQUAL);break;case sa:s.depthFunc(s.GEQUAL);break;case ra:s.depthFunc(s.GREATER);break;case oa:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}yt=rt}},setLocked:function(rt){U=rt},setClear:function(rt){St!==rt&&(St=rt,xt&&(rt=1-rt),s.clearDepth(rt))},reset:function(){U=!1,et=null,yt=null,St=null,xt=!1}}}function i(){let U=!1,xt=null,et=null,yt=null,St=null,rt=null,kt=null,Pt=null,Re=null;return{setTest:function(ge){U||(ge?K(s.STENCIL_TEST):ut(s.STENCIL_TEST))},setMask:function(ge){xt!==ge&&!U&&(s.stencilMask(ge),xt=ge)},setFunc:function(ge,Bn,jn){(et!==ge||yt!==Bn||St!==jn)&&(s.stencilFunc(ge,Bn,jn),et=ge,yt=Bn,St=jn)},setOp:function(ge,Bn,jn){(rt!==ge||kt!==Bn||Pt!==jn)&&(s.stencilOp(ge,Bn,jn),rt=ge,kt=Bn,Pt=jn)},setLocked:function(ge){U=ge},setClear:function(ge){Re!==ge&&(s.clearStencil(ge),Re=ge)},reset:function(){U=!1,xt=null,et=null,yt=null,St=null,rt=null,kt=null,Pt=null,Re=null}}}let r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],x=null,p=!1,m=null,M=null,y=null,v=null,b=null,S=null,E=null,_=new Qt(0,0,0),A=0,C=!1,P=null,N=null,F=null,I=null,z=null,q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,st=0,Z=s.getParameter(s.VERSION);Z.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(Z)[1]),Y=st>=1):Z.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),Y=st>=2);let tt=null,$={},_t=s.getParameter(s.SCISSOR_BOX),Et=s.getParameter(s.VIEWPORT),lt=new Te().fromArray(_t),nt=new Te().fromArray(Et);function Bt(U,xt,et,yt){let St=new Uint8Array(4),rt=s.createTexture();s.bindTexture(U,rt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let kt=0;kt<et;kt++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(xt,0,s.RGBA,1,1,yt,0,s.RGBA,s.UNSIGNED_BYTE,St):s.texImage2D(xt+kt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,St);return rt}let V={};V[s.TEXTURE_2D]=Bt(s.TEXTURE_2D,s.TEXTURE_2D,1),V[s.TEXTURE_CUBE_MAP]=Bt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[s.TEXTURE_2D_ARRAY]=Bt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),V[s.TEXTURE_3D]=Bt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(s.DEPTH_TEST),o.setFunc(Js),Lt(!1),ce(sh),K(s.CULL_FACE),Yt(li);function K(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function ut(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function At(U,xt){return u[U]!==xt?(s.bindFramebuffer(U,xt),u[U]=xt,U===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=xt),U===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=xt),!0):!1}function ct(U,xt){let et=g,yt=!1;if(U){et=f.get(xt),et===void 0&&(et=[],f.set(xt,et));let St=U.textures;if(et.length!==St.length||et[0]!==s.COLOR_ATTACHMENT0){for(let rt=0,kt=St.length;rt<kt;rt++)et[rt]=s.COLOR_ATTACHMENT0+rt;et.length=St.length,yt=!0}}else et[0]!==s.BACK&&(et[0]=s.BACK,yt=!0);yt&&s.drawBuffers(et)}function Ut(U){return x!==U?(s.useProgram(U),x=U,!0):!1}let pe={[vs]:s.FUNC_ADD,[Rd]:s.FUNC_SUBTRACT,[Cd]:s.FUNC_REVERSE_SUBTRACT};pe[Pd]=s.MIN,pe[Id]=s.MAX;let qt={[Ld]:s.ZERO,[Nd]:s.ONE,[Dd]:s.SRC_COLOR,[ch]:s.SRC_ALPHA,[Bd]:s.SRC_ALPHA_SATURATE,[Fd]:s.DST_COLOR,[Ud]:s.DST_ALPHA,[kd]:s.ONE_MINUS_SRC_COLOR,[hh]:s.ONE_MINUS_SRC_ALPHA,[zd]:s.ONE_MINUS_DST_COLOR,[Od]:s.ONE_MINUS_DST_ALPHA,[Hd]:s.CONSTANT_COLOR,[Gd]:s.ONE_MINUS_CONSTANT_COLOR,[Vd]:s.CONSTANT_ALPHA,[Wd]:s.ONE_MINUS_CONSTANT_ALPHA};function Yt(U,xt,et,yt,St,rt,kt,Pt,Re,ge){if(U===li){p===!0&&(ut(s.BLEND),p=!1);return}if(p===!1&&(K(s.BLEND),p=!0),U!==Ad){if(U!==m||ge!==C){if((M!==vs||b!==vs)&&(s.blendEquation(s.FUNC_ADD),M=vs,b=vs),ge)switch(U){case cr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case oh:s.blendFunc(s.ONE,s.ONE);break;case ah:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case lh:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Xt("WebGLState: Invalid blending: ",U);break}else switch(U){case cr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case oh:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case ah:Xt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lh:Xt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xt("WebGLState: Invalid blending: ",U);break}y=null,v=null,S=null,E=null,_.set(0,0,0),A=0,m=U,C=ge}return}St=St||xt,rt=rt||et,kt=kt||yt,(xt!==M||St!==b)&&(s.blendEquationSeparate(pe[xt],pe[St]),M=xt,b=St),(et!==y||yt!==v||rt!==S||kt!==E)&&(s.blendFuncSeparate(qt[et],qt[yt],qt[rt],qt[kt]),y=et,v=yt,S=rt,E=kt),(Pt.equals(_)===!1||Re!==A)&&(s.blendColor(Pt.r,Pt.g,Pt.b,Re),_.copy(Pt),A=Re),m=U,C=!1}function re(U,xt){U.side===Un?ut(s.CULL_FACE):K(s.CULL_FACE);let et=U.side===Qe;xt&&(et=!et),Lt(et),U.blending===cr&&U.transparent===!1?Yt(li):Yt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);let yt=U.stencilWrite;a.setTest(yt),yt&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ke(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?K(s.SAMPLE_ALPHA_TO_COVERAGE):ut(s.SAMPLE_ALPHA_TO_COVERAGE)}function Lt(U){P!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),P=U)}function ce(U){U!==wd?(K(s.CULL_FACE),U!==N&&(U===sh?s.cullFace(s.BACK):U===Td?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ut(s.CULL_FACE),N=U}function Ae(U){U!==F&&(Y&&s.lineWidth(U),F=U)}function Ke(U,xt,et){U?(K(s.POLYGON_OFFSET_FILL),(I!==xt||z!==et)&&(I=xt,z=et,o.getReversed()&&(xt=-xt),s.polygonOffset(xt,et))):ut(s.POLYGON_OFFSET_FILL)}function Se(U){U?K(s.SCISSOR_TEST):ut(s.SCISSOR_TEST)}function Ge(U){U===void 0&&(U=s.TEXTURE0+q-1),tt!==U&&(s.activeTexture(U),tt=U)}function O(U,xt,et){et===void 0&&(tt===null?et=s.TEXTURE0+q-1:et=tt);let yt=$[et];yt===void 0&&(yt={type:void 0,texture:void 0},$[et]=yt),(yt.type!==U||yt.texture!==xt)&&(tt!==et&&(s.activeTexture(et),tt=et),s.bindTexture(U,xt||V[U]),yt.type=U,yt.texture=xt)}function nn(){let U=$[tt];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function _e(){try{s.compressedTexImage2D(...arguments)}catch(U){Xt("WebGLState:",U)}}function R(){try{s.compressedTexImage3D(...arguments)}catch(U){Xt("WebGLState:",U)}}function w(){try{s.texSubImage2D(...arguments)}catch(U){Xt("WebGLState:",U)}}function B(){try{s.texSubImage3D(...arguments)}catch(U){Xt("WebGLState:",U)}}function W(){try{s.compressedTexSubImage2D(...arguments)}catch(U){Xt("WebGLState:",U)}}function J(){try{s.compressedTexSubImage3D(...arguments)}catch(U){Xt("WebGLState:",U)}}function at(){try{s.texStorage2D(...arguments)}catch(U){Xt("WebGLState:",U)}}function pt(){try{s.texStorage3D(...arguments)}catch(U){Xt("WebGLState:",U)}}function j(){try{s.texImage2D(...arguments)}catch(U){Xt("WebGLState:",U)}}function it(){try{s.texImage3D(...arguments)}catch(U){Xt("WebGLState:",U)}}function mt(U){return d[U]!==void 0?d[U]:s.getParameter(U)}function Nt(U,xt){d[U]!==xt&&(s.pixelStorei(U,xt),d[U]=xt)}function vt(U){lt.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),lt.copy(U))}function gt(U){nt.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),nt.copy(U))}function Dt(U,xt){let et=c.get(xt);et===void 0&&(et=new WeakMap,c.set(xt,et));let yt=et.get(U);yt===void 0&&(yt=s.getUniformBlockIndex(xt,U.name),et.set(U,yt))}function Ht(U,xt){let yt=c.get(xt).get(U);l.get(xt)!==yt&&(s.uniformBlockBinding(xt,yt,U.__bindingPointIndex),l.set(xt,yt))}function jt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},tt=null,$={},u={},f=new WeakMap,g=[],x=null,p=!1,m=null,M=null,y=null,v=null,b=null,S=null,E=null,_=new Qt(0,0,0),A=0,C=!1,P=null,N=null,F=null,I=null,z=null,lt.set(0,0,s.canvas.width,s.canvas.height),nt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:K,disable:ut,bindFramebuffer:At,drawBuffers:ct,useProgram:Ut,setBlending:Yt,setMaterial:re,setFlipSided:Lt,setCullFace:ce,setLineWidth:Ae,setPolygonOffset:Ke,setScissorTest:Se,activeTexture:Ge,bindTexture:O,unbindTexture:nn,compressedTexImage2D:_e,compressedTexImage3D:R,texImage2D:j,texImage3D:it,pixelStorei:Nt,getParameter:mt,updateUBOMapping:Dt,uniformBlockBinding:Ht,texStorage2D:at,texStorage3D:pt,texSubImage2D:w,texSubImage3D:B,compressedTexSubImage2D:W,compressedTexSubImage3D:J,scissor:vt,viewport:gt,reset:jt}}function p_(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Zt,h=new WeakMap,d=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,w){return g?new OffscreenCanvas(R,w):Br("canvas")}function p(R,w,B){let W=1,J=_e(R);if((J.width>B||J.height>B)&&(W=B/Math.max(J.width,J.height)),W<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let at=Math.floor(W*J.width),pt=Math.floor(W*J.height);u===void 0&&(u=x(at,pt));let j=w?x(at,pt):u;return j.width=at,j.height=pt,j.getContext("2d").drawImage(R,0,0,at,pt),Gt("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+at+"x"+pt+")."),j}else return"data"in R&&Gt("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),R;return R}function m(R){return R.generateMipmaps}function M(R){s.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(R,w,B,W,J,at=!1){if(R!==null){if(s[R]!==void 0)return s[R];Gt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let pt;W&&(pt=t.get("EXT_texture_norm16"),pt||Gt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=w;if(w===s.RED&&(B===s.FLOAT&&(j=s.R32F),B===s.HALF_FLOAT&&(j=s.R16F),B===s.UNSIGNED_BYTE&&(j=s.R8),B===s.UNSIGNED_SHORT&&pt&&(j=pt.R16_EXT),B===s.SHORT&&pt&&(j=pt.R16_SNORM_EXT)),w===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(j=s.R8UI),B===s.UNSIGNED_SHORT&&(j=s.R16UI),B===s.UNSIGNED_INT&&(j=s.R32UI),B===s.BYTE&&(j=s.R8I),B===s.SHORT&&(j=s.R16I),B===s.INT&&(j=s.R32I)),w===s.RG&&(B===s.FLOAT&&(j=s.RG32F),B===s.HALF_FLOAT&&(j=s.RG16F),B===s.UNSIGNED_BYTE&&(j=s.RG8),B===s.UNSIGNED_SHORT&&pt&&(j=pt.RG16_EXT),B===s.SHORT&&pt&&(j=pt.RG16_SNORM_EXT)),w===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(j=s.RG8UI),B===s.UNSIGNED_SHORT&&(j=s.RG16UI),B===s.UNSIGNED_INT&&(j=s.RG32UI),B===s.BYTE&&(j=s.RG8I),B===s.SHORT&&(j=s.RG16I),B===s.INT&&(j=s.RG32I)),w===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(j=s.RGB8UI),B===s.UNSIGNED_SHORT&&(j=s.RGB16UI),B===s.UNSIGNED_INT&&(j=s.RGB32UI),B===s.BYTE&&(j=s.RGB8I),B===s.SHORT&&(j=s.RGB16I),B===s.INT&&(j=s.RGB32I)),w===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(j=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(j=s.RGBA16UI),B===s.UNSIGNED_INT&&(j=s.RGBA32UI),B===s.BYTE&&(j=s.RGBA8I),B===s.SHORT&&(j=s.RGBA16I),B===s.INT&&(j=s.RGBA32I)),w===s.RGB&&(B===s.UNSIGNED_SHORT&&pt&&(j=pt.RGB16_EXT),B===s.SHORT&&pt&&(j=pt.RGB16_SNORM_EXT),B===s.UNSIGNED_INT_5_9_9_9_REV&&(j=s.RGB9_E5),B===s.UNSIGNED_INT_10F_11F_11F_REV&&(j=s.R11F_G11F_B10F)),w===s.RGBA){let it=at?zr:ae.getTransfer(J);B===s.FLOAT&&(j=s.RGBA32F),B===s.HALF_FLOAT&&(j=s.RGBA16F),B===s.UNSIGNED_BYTE&&(j=it===ye?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT&&pt&&(j=pt.RGBA16_EXT),B===s.SHORT&&pt&&(j=pt.RGBA16_SNORM_EXT),B===s.UNSIGNED_SHORT_4_4_4_4&&(j=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(j=s.RGB5_A1)}return(j===s.R16F||j===s.R32F||j===s.RG16F||j===s.RG32F||j===s.RGBA16F||j===s.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function b(R,w){let B;return R?w===null||w===qn||w===ur?B=s.DEPTH24_STENCIL8:w===_n?B=s.DEPTH32F_STENCIL8:w===hr&&(B=s.DEPTH24_STENCIL8,Gt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===qn||w===ur?B=s.DEPTH_COMPONENT24:w===_n?B=s.DEPTH_COMPONENT32F:w===hr&&(B=s.DEPTH_COMPONENT16),B}function S(R,w){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==ze&&R.minFilter!==Xe?Math.log2(Math.max(w.width,w.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?w.mipmaps.length:1}function E(R){let w=R.target;w.removeEventListener("dispose",E),A(w),w.isVideoTexture&&h.delete(w),w.isHTMLTexture&&d.delete(w)}function _(R){let w=R.target;w.removeEventListener("dispose",_),P(w)}function A(R){let w=n.get(R);if(w.__webglInit===void 0)return;let B=R.source,W=f.get(B);if(W){let J=W[w.__cacheKey];J.usedTimes--,J.usedTimes===0&&C(R),Object.keys(W).length===0&&f.delete(B)}n.remove(R)}function C(R){let w=n.get(R);s.deleteTexture(w.__webglTexture);let B=R.source,W=f.get(B);delete W[w.__cacheKey],o.memory.textures--}function P(R){let w=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(w.__webglFramebuffer[W]))for(let J=0;J<w.__webglFramebuffer[W].length;J++)s.deleteFramebuffer(w.__webglFramebuffer[W][J]);else s.deleteFramebuffer(w.__webglFramebuffer[W]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[W])}else{if(Array.isArray(w.__webglFramebuffer))for(let W=0;W<w.__webglFramebuffer.length;W++)s.deleteFramebuffer(w.__webglFramebuffer[W]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let W=0;W<w.__webglColorRenderbuffer.length;W++)w.__webglColorRenderbuffer[W]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[W]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let B=R.textures;for(let W=0,J=B.length;W<J;W++){let at=n.get(B[W]);at.__webglTexture&&(s.deleteTexture(at.__webglTexture),o.memory.textures--),n.remove(B[W])}n.remove(R)}let N=0;function F(){N=0}function I(){return N}function z(R){N=R}function q(){let R=N;return R>=i.maxTextures&&Gt("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+i.maxTextures),N+=1,R}function Y(R){let w=[];return w.push(R.wrapS),w.push(R.wrapT),w.push(R.wrapR||0),w.push(R.magFilter),w.push(R.minFilter),w.push(R.anisotropy),w.push(R.internalFormat),w.push(R.format),w.push(R.type),w.push(R.generateMipmaps),w.push(R.premultiplyAlpha),w.push(R.flipY),w.push(R.unpackAlignment),w.push(R.colorSpace),w.join()}function st(R,w){let B=n.get(R);if(R.isVideoTexture&&O(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&B.__version!==R.version){let W=R.image;if(W===null)Gt("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Gt("WebGLRenderer: Texture marked for update but image is incomplete");else{ut(B,R,w);return}}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+w)}function Z(R,w){let B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){ut(B,R,w);return}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+w)}function tt(R,w){let B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){ut(B,R,w);return}e.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+w)}function $(R,w){let B=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&B.__version!==R.version){At(B,R,w);return}e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+w)}let _t={[aa]:s.REPEAT,[ei]:s.CLAMP_TO_EDGE,[la]:s.MIRRORED_REPEAT},Et={[ze]:s.NEAREST,[qd]:s.NEAREST_MIPMAP_NEAREST,[no]:s.NEAREST_MIPMAP_LINEAR,[Xe]:s.LINEAR,[Da]:s.LINEAR_MIPMAP_NEAREST,[Yi]:s.LINEAR_MIPMAP_LINEAR},lt={[Jd]:s.NEVER,[nf]:s.ALWAYS,[jd]:s.LESS,[yl]:s.LEQUAL,[Qd]:s.EQUAL,[vl]:s.GEQUAL,[tf]:s.GREATER,[ef]:s.NOTEQUAL};function nt(R,w){if(w.type===_n&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Xe||w.magFilter===Da||w.magFilter===no||w.magFilter===Yi||w.minFilter===Xe||w.minFilter===Da||w.minFilter===no||w.minFilter===Yi)&&Gt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,_t[w.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,_t[w.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,_t[w.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,Et[w.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,Et[w.minFilter]),w.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,lt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===ze||w.minFilter!==no&&w.minFilter!==Yi||w.type===_n&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");s.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Bt(R,w){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,w.addEventListener("dispose",E));let W=w.source,J=f.get(W);J===void 0&&(J={},f.set(W,J));let at=Y(w);if(at!==R.__cacheKey){J[at]===void 0&&(J[at]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,B=!0),J[at].usedTimes++;let pt=J[R.__cacheKey];pt!==void 0&&(J[R.__cacheKey].usedTimes--,pt.usedTimes===0&&C(w)),R.__cacheKey=at,R.__webglTexture=J[at].texture}return B}function V(R,w,B){return Math.floor(Math.floor(R/B)/w)}function K(R,w,B,W){let at=R.updateRanges;if(at.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,w.width,w.height,B,W,w.data);else{at.sort((Nt,vt)=>Nt.start-vt.start);let pt=0;for(let Nt=1;Nt<at.length;Nt++){let vt=at[pt],gt=at[Nt],Dt=vt.start+vt.count,Ht=V(gt.start,w.width,4),jt=V(vt.start,w.width,4);gt.start<=Dt+1&&Ht===jt&&V(gt.start+gt.count-1,w.width,4)===Ht?vt.count=Math.max(vt.count,gt.start+gt.count-vt.start):(++pt,at[pt]=gt)}at.length=pt+1;let j=e.getParameter(s.UNPACK_ROW_LENGTH),it=e.getParameter(s.UNPACK_SKIP_PIXELS),mt=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,w.width);for(let Nt=0,vt=at.length;Nt<vt;Nt++){let gt=at[Nt],Dt=Math.floor(gt.start/4),Ht=Math.ceil(gt.count/4),jt=Dt%w.width,U=Math.floor(Dt/w.width),xt=Ht,et=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,jt),e.pixelStorei(s.UNPACK_SKIP_ROWS,U),e.texSubImage2D(s.TEXTURE_2D,0,jt,U,xt,et,B,W,w.data)}R.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,j),e.pixelStorei(s.UNPACK_SKIP_PIXELS,it),e.pixelStorei(s.UNPACK_SKIP_ROWS,mt)}}function ut(R,w,B){let W=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(W=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(W=s.TEXTURE_3D);let J=Bt(R,w),at=w.source;e.bindTexture(W,R.__webglTexture,s.TEXTURE0+B);let pt=n.get(at);if(at.version!==pt.__version||J===!0){if(e.activeTexture(s.TEXTURE0+B),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){let et=ae.getPrimaries(ae.workingColorSpace),yt=w.colorSpace===Ti?null:ae.getPrimaries(w.colorSpace),St=w.colorSpace===Ti||et===yt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,St)}e.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment);let it=p(w.image,!1,i.maxTextureSize);it=nn(w,it);let mt=r.convert(w.format,w.colorSpace),Nt=r.convert(w.type),vt=v(w.internalFormat,mt,Nt,w.normalized,w.colorSpace,w.isVideoTexture);nt(W,w);let gt,Dt=w.mipmaps,Ht=w.isVideoTexture!==!0,jt=pt.__version===void 0||J===!0,U=at.dataReady,xt=S(w,it);if(w.isDepthTexture)vt=b(w.format===Ki,w.type),jt&&(Ht?e.texStorage2D(s.TEXTURE_2D,1,vt,it.width,it.height):e.texImage2D(s.TEXTURE_2D,0,vt,it.width,it.height,0,mt,Nt,null));else if(w.isDataTexture)if(Dt.length>0){Ht&&jt&&e.texStorage2D(s.TEXTURE_2D,xt,vt,Dt[0].width,Dt[0].height);for(let et=0,yt=Dt.length;et<yt;et++)gt=Dt[et],Ht?U&&e.texSubImage2D(s.TEXTURE_2D,et,0,0,gt.width,gt.height,mt,Nt,gt.data):e.texImage2D(s.TEXTURE_2D,et,vt,gt.width,gt.height,0,mt,Nt,gt.data);w.generateMipmaps=!1}else Ht?(jt&&e.texStorage2D(s.TEXTURE_2D,xt,vt,it.width,it.height),U&&K(w,it,mt,Nt)):e.texImage2D(s.TEXTURE_2D,0,vt,it.width,it.height,0,mt,Nt,it.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Ht&&jt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,xt,vt,Dt[0].width,Dt[0].height,it.depth);for(let et=0,yt=Dt.length;et<yt;et++)if(gt=Dt[et],w.format!==bn)if(mt!==null)if(Ht){if(U)if(w.layerUpdates.size>0){let St=Dh(gt.width,gt.height,w.format,w.type);for(let rt of w.layerUpdates){let kt=gt.data.subarray(rt*St/gt.data.BYTES_PER_ELEMENT,(rt+1)*St/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,et,0,0,rt,gt.width,gt.height,1,mt,kt)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,et,0,0,0,gt.width,gt.height,it.depth,mt,gt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,et,vt,gt.width,gt.height,it.depth,0,gt.data,0,0);else Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?U&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,et,0,0,0,gt.width,gt.height,it.depth,mt,Nt,gt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,et,vt,gt.width,gt.height,it.depth,0,mt,Nt,gt.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{Ht&&jt&&e.texStorage2D(s.TEXTURE_2D,xt,vt,Dt[0].width,Dt[0].height);for(let et=0,yt=Dt.length;et<yt;et++)gt=Dt[et],w.format!==bn?mt!==null?Ht?U&&e.compressedTexSubImage2D(s.TEXTURE_2D,et,0,0,gt.width,gt.height,mt,gt.data):e.compressedTexImage2D(s.TEXTURE_2D,et,vt,gt.width,gt.height,0,gt.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?U&&e.texSubImage2D(s.TEXTURE_2D,et,0,0,gt.width,gt.height,mt,Nt,gt.data):e.texImage2D(s.TEXTURE_2D,et,vt,gt.width,gt.height,0,mt,Nt,gt.data)}else if(w.isDataArrayTexture)if(Ht){if(jt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,xt,vt,it.width,it.height,it.depth),U)if(w.layerUpdates.size>0){let et=Dh(it.width,it.height,w.format,w.type);for(let yt of w.layerUpdates){let St=it.data.subarray(yt*et/it.data.BYTES_PER_ELEMENT,(yt+1)*et/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,yt,it.width,it.height,1,mt,Nt,St)}w.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,mt,Nt,it.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,vt,it.width,it.height,it.depth,0,mt,Nt,it.data);else if(w.isData3DTexture)Ht?(jt&&e.texStorage3D(s.TEXTURE_3D,xt,vt,it.width,it.height,it.depth),U&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,mt,Nt,it.data)):e.texImage3D(s.TEXTURE_3D,0,vt,it.width,it.height,it.depth,0,mt,Nt,it.data);else if(w.isFramebufferTexture){if(jt)if(Ht)e.texStorage2D(s.TEXTURE_2D,xt,vt,it.width,it.height);else{let et=it.width,yt=it.height;for(let St=0;St<xt;St++)e.texImage2D(s.TEXTURE_2D,St,vt,et,yt,0,mt,Nt,null),et>>=1,yt>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in s){let et=s.canvas;if(et.hasAttribute("layoutsubtree")||et.setAttribute("layoutsubtree","true"),it.parentNode!==et){et.appendChild(it),d.add(w),et.onpaint=yt=>{let St=yt.changedElements;for(let rt of d)St.includes(rt.image)&&(rt.needsUpdate=!0)},et.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,it);else{let St=s.RGBA,rt=s.RGBA,kt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,St,rt,kt,it)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Dt.length>0){if(Ht&&jt){let et=_e(Dt[0]);e.texStorage2D(s.TEXTURE_2D,xt,vt,et.width,et.height)}for(let et=0,yt=Dt.length;et<yt;et++)gt=Dt[et],Ht?U&&e.texSubImage2D(s.TEXTURE_2D,et,0,0,mt,Nt,gt):e.texImage2D(s.TEXTURE_2D,et,vt,mt,Nt,gt);w.generateMipmaps=!1}else if(Ht){if(jt){let et=_e(it);e.texStorage2D(s.TEXTURE_2D,xt,vt,et.width,et.height)}U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,mt,Nt,it)}else e.texImage2D(s.TEXTURE_2D,0,vt,mt,Nt,it);m(w)&&M(W),pt.__version=at.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function At(R,w,B){if(w.image.length!==6)return;let W=Bt(R,w),J=w.source;e.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+B);let at=n.get(J);if(J.version!==at.__version||W===!0){e.activeTexture(s.TEXTURE0+B);let pt=ae.getPrimaries(ae.workingColorSpace),j=w.colorSpace===Ti?null:ae.getPrimaries(w.colorSpace),it=w.colorSpace===Ti||pt===j?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);let mt=w.isCompressedTexture||w.image[0].isCompressedTexture,Nt=w.image[0]&&w.image[0].isDataTexture,vt=[];for(let rt=0;rt<6;rt++)!mt&&!Nt?vt[rt]=p(w.image[rt],!0,i.maxCubemapSize):vt[rt]=Nt?w.image[rt].image:w.image[rt],vt[rt]=nn(w,vt[rt]);let gt=vt[0],Dt=r.convert(w.format,w.colorSpace),Ht=r.convert(w.type),jt=v(w.internalFormat,Dt,Ht,w.normalized,w.colorSpace),U=w.isVideoTexture!==!0,xt=at.__version===void 0||W===!0,et=J.dataReady,yt=S(w,gt);nt(s.TEXTURE_CUBE_MAP,w);let St;if(mt){U&&xt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,yt,jt,gt.width,gt.height);for(let rt=0;rt<6;rt++){St=vt[rt].mipmaps;for(let kt=0;kt<St.length;kt++){let Pt=St[kt];w.format!==bn?Dt!==null?U?et&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,kt,0,0,Pt.width,Pt.height,Dt,Pt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,kt,jt,Pt.width,Pt.height,0,Pt.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,kt,0,0,Pt.width,Pt.height,Dt,Ht,Pt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,kt,jt,Pt.width,Pt.height,0,Dt,Ht,Pt.data)}}}else{if(St=w.mipmaps,U&&xt){St.length>0&&yt++;let rt=_e(vt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,yt,jt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(Nt){U?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,vt[rt].width,vt[rt].height,Dt,Ht,vt[rt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,jt,vt[rt].width,vt[rt].height,0,Dt,Ht,vt[rt].data);for(let kt=0;kt<St.length;kt++){let Re=St[kt].image[rt].image;U?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,kt+1,0,0,Re.width,Re.height,Dt,Ht,Re.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,kt+1,jt,Re.width,Re.height,0,Dt,Ht,Re.data)}}else{U?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Dt,Ht,vt[rt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,jt,Dt,Ht,vt[rt]);for(let kt=0;kt<St.length;kt++){let Pt=St[kt];U?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,kt+1,0,0,Dt,Ht,Pt.image[rt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,kt+1,jt,Dt,Ht,Pt.image[rt])}}}m(w)&&M(s.TEXTURE_CUBE_MAP),at.__version=J.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function ct(R,w,B,W,J,at){let pt=r.convert(B.format,B.colorSpace),j=r.convert(B.type),it=v(B.internalFormat,pt,j,B.normalized,B.colorSpace),mt=n.get(w),Nt=n.get(B);if(Nt.__renderTarget=w,!mt.__hasExternalTextures){let vt=Math.max(1,w.width>>at),gt=Math.max(1,w.height>>at);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?e.texImage3D(J,at,it,vt,gt,w.depth,0,pt,j,null):e.texImage2D(J,at,it,vt,gt,0,pt,j,null)}e.bindFramebuffer(s.FRAMEBUFFER,R),Ge(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,W,J,Nt.__webglTexture,0,Se(w)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,W,J,Nt.__webglTexture,at),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ut(R,w,B){if(s.bindRenderbuffer(s.RENDERBUFFER,R),w.depthBuffer){let W=w.depthTexture,J=W&&W.isDepthTexture?W.type:null,at=b(w.stencilBuffer,J),pt=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Ge(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Se(w),at,w.width,w.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,Se(w),at,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,at,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,pt,s.RENDERBUFFER,R)}else{let W=w.textures;for(let J=0;J<W.length;J++){let at=W[J],pt=r.convert(at.format,at.colorSpace),j=r.convert(at.type),it=v(at.internalFormat,pt,j,at.normalized,at.colorSpace);Ge(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Se(w),it,w.width,w.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,Se(w),it,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,it,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function pe(R,w,B){let W=w.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,R),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let J=n.get(w.depthTexture);if(J.__renderTarget=w,(!J.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),W){if(J.__webglInit===void 0&&(J.__webglInit=!0,w.depthTexture.addEventListener("dispose",E)),J.__webglTexture===void 0){J.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),nt(s.TEXTURE_CUBE_MAP,w.depthTexture);let mt=r.convert(w.depthTexture.format),Nt=r.convert(w.depthTexture.type),vt;w.depthTexture.format===ni?vt=s.DEPTH_COMPONENT24:w.depthTexture.format===Ki&&(vt=s.DEPTH24_STENCIL8);for(let gt=0;gt<6;gt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,vt,w.width,w.height,0,mt,Nt,null)}}else st(w.depthTexture,0);let at=J.__webglTexture,pt=Se(w),j=W?s.TEXTURE_CUBE_MAP_POSITIVE_X+B:s.TEXTURE_2D,it=w.depthTexture.format===Ki?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(w.depthTexture.format===ni)Ge(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,it,j,at,0,pt):s.framebufferTexture2D(s.FRAMEBUFFER,it,j,at,0);else if(w.depthTexture.format===Ki)Ge(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,it,j,at,0,pt):s.framebufferTexture2D(s.FRAMEBUFFER,it,j,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function qt(R){let w=n.get(R),B=R.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==R.depthTexture){let W=R.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),W){let J=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,W.removeEventListener("dispose",J)};W.addEventListener("dispose",J),w.__depthDisposeCallback=J}w.__boundDepthTexture=W}if(R.depthTexture&&!w.__autoAllocateDepthBuffer)if(B)for(let W=0;W<6;W++)pe(w.__webglFramebuffer[W],R,W);else{let W=R.texture.mipmaps;W&&W.length>0?pe(w.__webglFramebuffer[0],R,0):pe(w.__webglFramebuffer,R,0)}else if(B){w.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[W]),w.__webglDepthbuffer[W]===void 0)w.__webglDepthbuffer[W]=s.createRenderbuffer(),Ut(w.__webglDepthbuffer[W],R,!1);else{let J=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,at=w.__webglDepthbuffer[W];s.bindRenderbuffer(s.RENDERBUFFER,at),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,at)}}else{let W=R.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),Ut(w.__webglDepthbuffer,R,!1);else{let J=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,at=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,at),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,at)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Yt(R,w,B){let W=n.get(R);w!==void 0&&ct(W.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&qt(R)}function re(R){let w=R.texture,B=n.get(R),W=n.get(w);R.addEventListener("dispose",_);let J=R.textures,at=R.isWebGLCubeRenderTarget===!0,pt=J.length>1;if(pt||(W.__webglTexture===void 0&&(W.__webglTexture=s.createTexture()),W.__version=w.version,o.memory.textures++),at){B.__webglFramebuffer=[];for(let j=0;j<6;j++)if(w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer[j]=[];for(let it=0;it<w.mipmaps.length;it++)B.__webglFramebuffer[j][it]=s.createFramebuffer()}else B.__webglFramebuffer[j]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer=[];for(let j=0;j<w.mipmaps.length;j++)B.__webglFramebuffer[j]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(pt)for(let j=0,it=J.length;j<it;j++){let mt=n.get(J[j]);mt.__webglTexture===void 0&&(mt.__webglTexture=s.createTexture(),o.memory.textures++)}if(R.samples>0&&Ge(R)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let j=0;j<J.length;j++){let it=J[j];B.__webglColorRenderbuffer[j]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[j]);let mt=r.convert(it.format,it.colorSpace),Nt=r.convert(it.type),vt=v(it.internalFormat,mt,Nt,it.normalized,it.colorSpace,R.isXRRenderTarget===!0),gt=Se(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,gt,vt,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+j,s.RENDERBUFFER,B.__webglColorRenderbuffer[j])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),Ut(B.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(at){e.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture),nt(s.TEXTURE_CUBE_MAP,w);for(let j=0;j<6;j++)if(w.mipmaps&&w.mipmaps.length>0)for(let it=0;it<w.mipmaps.length;it++)ct(B.__webglFramebuffer[j][it],R,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+j,it);else ct(B.__webglFramebuffer[j],R,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);m(w)&&M(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let j=0,it=J.length;j<it;j++){let mt=J[j],Nt=n.get(mt),vt=s.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(vt=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(vt,Nt.__webglTexture),nt(vt,mt),ct(B.__webglFramebuffer,R,mt,s.COLOR_ATTACHMENT0+j,vt,0),m(mt)&&M(vt)}e.unbindTexture()}else{let j=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(j=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(j,W.__webglTexture),nt(j,w),w.mipmaps&&w.mipmaps.length>0)for(let it=0;it<w.mipmaps.length;it++)ct(B.__webglFramebuffer[it],R,w,s.COLOR_ATTACHMENT0,j,it);else ct(B.__webglFramebuffer,R,w,s.COLOR_ATTACHMENT0,j,0);m(w)&&M(j),e.unbindTexture()}R.depthBuffer&&qt(R)}function Lt(R){let w=R.textures;for(let B=0,W=w.length;B<W;B++){let J=w[B];if(m(J)){let at=y(R),pt=n.get(J).__webglTexture;e.bindTexture(at,pt),M(at),e.unbindTexture()}}}let ce=[],Ae=[];function Ke(R){if(R.samples>0){if(Ge(R)===!1){let w=R.textures,B=R.width,W=R.height,J=s.COLOR_BUFFER_BIT,at=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pt=n.get(R),j=w.length>1;if(j)for(let mt=0;mt<w.length;mt++)e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer);let it=R.texture.mipmaps;it&&it.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,pt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let mt=0;mt<w.length;mt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),j){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);let Nt=n.get(w[mt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Nt,0)}s.blitFramebuffer(0,0,B,W,0,0,B,W,J,s.NEAREST),l===!0&&(ce.length=0,Ae.length=0,ce.push(s.COLOR_ATTACHMENT0+mt),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(ce.push(at),Ae.push(at),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ae)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ce))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),j)for(let mt=0;mt<w.length;mt++){e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);let Nt=n.get(w[mt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.TEXTURE_2D,Nt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let w=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function Se(R){return Math.min(i.maxSamples,R.samples)}function Ge(R){let w=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function O(R){let w=o.render.frame;h.get(R)!==w&&(h.set(R,w),R.update())}function nn(R,w){let B=R.colorSpace,W=R.format,J=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==ps&&B!==Ti&&(ae.getTransfer(B)===ye?(W!==bn||J!==vn)&&Gt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xt("WebGLTextures: Unsupported texture color space:",B)),w}function _e(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=F,this.getTextureUnits=I,this.setTextureUnits=z,this.setTexture2D=st,this.setTexture2DArray=Z,this.setTexture3D=tt,this.setTextureCube=$,this.rebindTextures=Yt,this.setupRenderTarget=re,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=Ke,this.setupDepthRenderbuffer=qt,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=Ge,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function m_(s,t){function e(n,i=Ti){let r,o=ae.getTransfer(i);if(n===vn)return s.UNSIGNED_BYTE;if(n===Ua)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Oa)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Mh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Sh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===_h)return s.BYTE;if(n===bh)return s.SHORT;if(n===hr)return s.UNSIGNED_SHORT;if(n===ka)return s.INT;if(n===qn)return s.UNSIGNED_INT;if(n===_n)return s.FLOAT;if(n===Yn)return s.HALF_FLOAT;if(n===wh)return s.ALPHA;if(n===Th)return s.RGB;if(n===bn)return s.RGBA;if(n===ni)return s.DEPTH_COMPONENT;if(n===Ki)return s.DEPTH_STENCIL;if(n===Fa)return s.RED;if(n===za)return s.RED_INTEGER;if(n===Zi)return s.RG;if(n===Ba)return s.RG_INTEGER;if(n===Ha)return s.RGBA_INTEGER;if(n===io||n===so||n===ro||n===oo)if(o===ye)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===io)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===so)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===io)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===so)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===oo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ga||n===Va||n===Wa||n===Xa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ga)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Va)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===$a||n===qa||n===Ya||n===Ka||n===Za||n===ao||n===Ja)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===$a||n===qa)return o===ye?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ya)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ka)return r.COMPRESSED_R11_EAC;if(n===Za)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ao)return r.COMPRESSED_RG11_EAC;if(n===Ja)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ja||n===Qa||n===tl||n===el||n===nl||n===il||n===sl||n===rl||n===ol||n===al||n===ll||n===cl||n===hl||n===ul)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ja)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qa)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===tl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===el)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===nl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===il)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===sl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===rl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ol)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===al)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ll)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===cl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===hl)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ul)return o===ye?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===dl||n===fl||n===pl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===dl)return o===ye?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===fl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ml||n===gl||n===lo||n===xl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ml)return r.COMPRESSED_RED_RGTC1_EXT;if(n===gl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===lo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===xl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ur?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var g_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,x_=`
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

}`,Qh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new qr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Oe({vertexShader:g_,fragmentShader:x_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ie(new Rn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},tu=class extends ii{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,x=typeof XRWebGLBinding<"u",p=new Qh,m={},M=e.getContextAttributes(),y=null,v=null,b=[],S=[],E=new Zt,_=null,A=null,C=new an;C.viewport=new Te;let P=new an;P.viewport=new Te;let N=[C,P],F=new Pa,I=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let K=b[V];return K===void 0&&(K=new nr,b[V]=K),K.getTargetRaySpace()},this.getControllerGrip=function(V){let K=b[V];return K===void 0&&(K=new nr,b[V]=K),K.getGripSpace()},this.getHand=function(V){let K=b[V];return K===void 0&&(K=new nr,b[V]=K),K.getHandSpace()};function q(V){let K=S.indexOf(V.inputSource);if(K===-1)return;let ut=b[K];ut!==void 0&&(ut.update(V.inputSource,V.frame,c||o),ut.dispatchEvent({type:V.type,data:V.inputSource}))}function Y(){i.removeEventListener("select",q),i.removeEventListener("selectstart",q),i.removeEventListener("selectend",q),i.removeEventListener("squeeze",q),i.removeEventListener("squeezestart",q),i.removeEventListener("squeezeend",q),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",st);for(let V=0;V<b.length;V++){let K=S[V];K!==null&&(S[V]=null,b[V].disconnect(K))}I=null,z=null,p.reset();for(let V in m)delete m[V];if(t.setRenderTarget(y),f=null,u=null,d=null,i=null,v=null,Bt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(E.width,E.height,!1),A!==null){let V=A.camera;V.fov=A.fov,V.zoom=A.zoom,V.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&Gt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,n.isPresenting===!0&&Gt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(V){if(i=V,i!==null){if(y=t.getRenderTarget(),i.addEventListener("select",q),i.addEventListener("selectstart",q),i.addEventListener("selectend",q),i.addEventListener("squeeze",q),i.addEventListener("squeezestart",q),i.addEventListener("squeezeend",q),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",st),M.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(E),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ut=null,At=null,ct=null;M.depth&&(ct=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ut=M.stencil?Ki:ni,At=M.stencil?ur:qn);let Ut={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ut),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new ln(u.textureWidth,u.textureHeight,{format:bn,type:vn,depthTexture:new zi(u.textureWidth,u.textureHeight,At,void 0,void 0,void 0,void 0,void 0,void 0,ut),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let ut={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,ut),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new ln(f.framebufferWidth,f.framebufferHeight,{format:bn,type:vn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Bt.setContext(i),Bt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function st(V){for(let K=0;K<V.removed.length;K++){let ut=V.removed[K],At=S.indexOf(ut);At>=0&&(S[At]=null,b[At].disconnect(ut))}for(let K=0;K<V.added.length;K++){let ut=V.added[K],At=S.indexOf(ut);if(At===-1){for(let Ut=0;Ut<b.length;Ut++)if(Ut>=S.length){S.push(ut),At=Ut;break}else if(S[Ut]===null){S[Ut]=ut,At=Ut;break}if(At===-1)break}let ct=b[At];ct&&ct.connect(ut)}}let Z=new L,tt=new L;function $(V,K,ut){Z.setFromMatrixPosition(K.matrixWorld),tt.setFromMatrixPosition(ut.matrixWorld);let At=Z.distanceTo(tt),ct=K.projectionMatrix.elements,Ut=ut.projectionMatrix.elements,pe=ct[14]/(ct[10]-1),qt=ct[14]/(ct[10]+1),Yt=(ct[9]+1)/ct[5],re=(ct[9]-1)/ct[5],Lt=(ct[8]-1)/ct[0],ce=(Ut[8]+1)/Ut[0],Ae=pe*Lt,Ke=pe*ce,Se=At/(-Lt+ce),Ge=Se*-Lt;if(K.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Ge),V.translateZ(Se),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),ct[10]===-1)V.projectionMatrix.copy(K.projectionMatrix),V.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{let O=pe+Se,nn=qt+Se,_e=Ae-Ge,R=Ke+(At-Ge),w=Yt*qt/nn*O,B=re*qt/nn*O;V.projectionMatrix.makePerspective(_e,R,w,B,O,nn),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function _t(V,K){K===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(K.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(i===null)return;let K=V.near,ut=V.far;p.texture!==null&&(p.depthNear>0&&(K=p.depthNear),p.depthFar>0&&(ut=p.depthFar)),F.near=P.near=C.near=K,F.far=P.far=C.far=ut,(I!==F.near||z!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),I=F.near,z=F.far),F.layers.mask=V.layers.mask|6,C.layers.mask=F.layers.mask&-5,P.layers.mask=F.layers.mask&-3;let At=V.parent,ct=F.cameras;_t(F,At);for(let Ut=0;Ut<ct.length;Ut++)_t(ct[Ut],At);ct.length===2?$(F,C,P):F.projectionMatrix.copy(C.projectionMatrix),A===null&&V.isPerspectiveCamera&&(A={camera:V,fov:V.fov,zoom:V.zoom}),Et(V,F,At)};function Et(V,K,ut){ut===null?V.matrix.copy(K.matrixWorld):(V.matrix.copy(ut.matrixWorld),V.matrix.invert(),V.matrix.multiply(K.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(K.projectionMatrix),V.projectionMatrixInverse.copy(K.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=tr*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(V){l=V,u!==null&&(u.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(V){return m[V]};let lt=null;function nt(V,K){if(h=K.getViewerPose(c||o),g=K,h!==null){let ut=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let At=!1;ut.length!==F.cameras.length&&(F.cameras.length=0,At=!0);for(let qt=0;qt<ut.length;qt++){let Yt=ut[qt],re=null;if(f!==null)re=f.getViewport(Yt);else{let ce=d.getViewSubImage(u,Yt);re=ce.viewport,qt===0&&(t.setRenderTargetTextures(v,ce.colorTexture,ce.depthStencilTexture),t.setRenderTarget(v))}let Lt=N[qt];Lt===void 0&&(Lt=new an,Lt.layers.enable(qt),Lt.viewport=new Te,N[qt]=Lt),Lt.matrix.fromArray(Yt.transform.matrix),Lt.matrix.decompose(Lt.position,Lt.quaternion,Lt.scale),Lt.projectionMatrix.fromArray(Yt.projectionMatrix),Lt.projectionMatrixInverse.copy(Lt.projectionMatrix).invert(),Lt.viewport.set(re.x,re.y,re.width,re.height),qt===0&&(F.matrix.copy(Lt.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),At===!0&&F.cameras.push(Lt)}let ct=i.enabledFeatures;if(ct&&ct.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let qt=d.getDepthInformation(ut[0]);qt&&qt.isValid&&qt.texture&&p.init(qt,i.renderState)}if(ct&&ct.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let qt=0;qt<ut.length;qt++){let Yt=ut[qt].camera;if(Yt){let re=m[Yt];re||(re=new qr,m[Yt]=re);let Lt=d.getCameraImage(Yt);re.sourceTexture=Lt}}}}for(let ut=0;ut<b.length;ut++){let At=S[ut],ct=b[ut];At!==null&&ct!==void 0&&ct.update(At,K,c||o)}lt&&lt(V,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}let Bt=new Nf;Bt.setAnimationLoop(nt),this.setAnimationLoop=function(V){lt=V},this.dispose=function(){}}},y_=new oe,zf=new Wt;zf.set(-1,0,0,0,1,0,0,0,1);function v_(s,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Ih(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,M,y,v){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),d(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,v)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),x(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,M,y):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Qe&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Qe&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let M=t.get(m),y=M.envMap,v=M.envMapRotation;y&&(p.envMap.value=y,p.envMapRotation.value.setFromMatrix4(y_.makeRotationFromEuler(v)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(zf),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,y){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=y*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Qe&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function x(p,m){let M=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function __(s,t,e,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,b){let S=b.program;n.uniformBlockBinding(v,S)}function c(v,b){let S=i[v.id];S===void 0&&(p(v),S=h(v),i[v.id]=S,v.addEventListener("dispose",M));let E=b.program;n.updateUBOMapping(v,E);let _=t.render.frame;r[v.id]!==_&&(u(v),r[v.id]=_)}function h(v){let b=d();v.__bindingPointIndex=b;let S=s.createBuffer(),E=v.__size,_=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,E,_),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,S),S}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Xt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let b=i[v.id],S=v.uniforms,E=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let _=0,A=S.length;_<A;_++){let C=S[_];if(Array.isArray(C))for(let P=0,N=C.length;P<N;P++)f(C[P],_,P,E);else f(C,_,0,E)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(v,b,S,E){if(x(v,b,S,E)===!0){let _=v.__offset,A=v.value;if(Array.isArray(A)){let C=0;for(let P=0;P<A.length;P++){let N=A[P],F=m(N);g(N,v.__data,C),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(C+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,_,v.__data)}}function g(v,b,S){typeof v=="number"||typeof v=="boolean"?b[0]=v:v.isMatrix3?(b[0]=v.elements[0],b[1]=v.elements[1],b[2]=v.elements[2],b[3]=0,b[4]=v.elements[3],b[5]=v.elements[4],b[6]=v.elements[5],b[7]=0,b[8]=v.elements[6],b[9]=v.elements[7],b[10]=v.elements[8],b[11]=0):ArrayBuffer.isView(v)?b.set(new v.constructor(v.buffer,v.byteOffset,b.length)):v.toArray(b,S)}function x(v,b,S,E){let _=v.value,A=b+"_"+S;if(E[A]===void 0)return typeof _=="number"||typeof _=="boolean"?E[A]=_:ArrayBuffer.isView(_)?E[A]=_.slice():E[A]=_.clone(),!0;{let C=E[A];if(typeof _=="number"||typeof _=="boolean"){if(C!==_)return E[A]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(C.equals(_)===!1)return C.copy(_),!0}}return!1}function p(v){let b=v.uniforms,S=0,E=16;for(let A=0,C=b.length;A<C;A++){let P=Array.isArray(b[A])?b[A]:[b[A]];for(let N=0,F=P.length;N<F;N++){let I=P[N],z=Array.isArray(I.value)?I.value:[I.value];for(let q=0,Y=z.length;q<Y;q++){let st=z[q],Z=m(st),tt=S%E,$=tt%Z.boundary,_t=tt+$;S+=$,_t!==0&&E-_t<Z.storage&&(S+=E-_t),I.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=S,S+=Z.storage}}}let _=S%E;return _>0&&(S+=E-_),v.__size=S,v.__cache={},this}function m(v){let b={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(b.boundary=4,b.storage=4):v.isVector2?(b.boundary=8,b.storage=8):v.isVector3||v.isColor?(b.boundary=16,b.storage=12):v.isVector4?(b.boundary=16,b.storage=16):v.isMatrix3?(b.boundary=48,b.storage=48):v.isMatrix4?(b.boundary=64,b.storage=64):v.isTexture?Gt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(b.boundary=16,b.storage=v.byteLength):Gt("WebGLRenderer: Unsupported uniform value type.",v),b}function M(v){let b=v.target;b.removeEventListener("dispose",M);let S=o.indexOf(b.__bindingPointIndex);o.splice(S,1),s.deleteBuffer(i[b.id]),delete i[b.id],delete r[b.id]}function y(){for(let v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:l,update:c,dispose:y}}var b_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ci=null;function M_(){return ci===null&&(ci=new xs(b_,16,16,Zi,Yn),ci.name="DFG_LUT",ci.minFilter=Xe,ci.magFilter=Xe,ci.wrapS=ei,ci.wrapT=ei,ci.generateMipmaps=!1,ci.needsUpdate=!0),ci}var Sl=class{constructor(t={}){let{canvas:e=rf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=vn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let x=f,p=new Set([Ha,Ba,za]),m=new Set([vn,qn,hr,ur,Ua,Oa]),M=new Uint32Array(4),y=new Int32Array(4),v=new L,b=null,S=null,E=[],_=[],A=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,P=!1,N=null,F=null,I=null,z=null;this._outputColorSpace=En;let q=0,Y=0,st=null,Z=-1,tt=null,$=new Te,_t=new Te,Et=null,lt=new Qt(0),nt=0,Bt=e.width,V=e.height,K=1,ut=null,At=null,ct=new Te(0,0,Bt,V),Ut=new Te(0,0,Bt,V),pe=!1,qt=new rr,Yt=!1,re=!1,Lt=new oe,ce=new L,Ae=new Te,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Se=!1;function Ge(){return st===null?K:1}let O=n;function nn(T,k){return e.getContext(T,k)}let _e,R,w,B,W,J,at,pt,j,it,mt,Nt,vt,gt,Dt,Ht,jt,U,xt,et,yt,St,rt;try{let T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Re,!1),e.addEventListener("webglcontextrestored",ge,!1),e.addEventListener("webglcontextcreationerror",Bn,!1),O===null){let k="webgl2";if(O=nn(k,T),O===null)throw nn(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}kt()}catch(T){throw e.removeEventListener("webglcontextlost",Re,!1),e.removeEventListener("webglcontextrestored",ge,!1),e.removeEventListener("webglcontextcreationerror",Bn,!1),Xt("WebGLRenderer: "+T.message),T}function kt(){_e=new Cy(O),_e.init(),yt=new m_(O,_e),R=new vy(O,_e,t,yt),w=new f_(O,_e),R.reversedDepthBuffer&&u&&w.buffers.depth.setReversed(!0),F=O.createFramebuffer(),I=O.createFramebuffer(),z=O.createFramebuffer(),B=new Ly(O),W=new Qv,J=new p_(O,_e,w,W,R,yt,B),at=new Ry(C),pt=new D0(O),St=new xy(O,pt),j=new Py(O,pt,B,St),it=new Dy(O,j,pt,St,B),U=new Ny(O,R,J),Dt=new _y(W),mt=new jv(C,at,_e,R,St,Dt),Nt=new v_(C,W),vt=new e_,gt=new a_(_e),jt=new gy(C,at,w,it,g,l),Ht=new d_(C,it,R),rt=new __(O,B,R,w),xt=new yy(O,_e,B),et=new Iy(O,_e,B),B.programs=mt.programs,C.capabilities=R,C.extensions=_e,C.properties=W,C.renderLists=vt,C.shadowMap=Ht,C.state=w,C.info=B}x!==vn&&(A=new Uy(x,e.width,e.height,a,i,r));let Pt=new tu(C,O);this.xr=Pt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let T=_e.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=_e.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(T){T!==void 0&&(K=T,this.setSize(Bt,V,!1))},this.getSize=function(T){return T.set(Bt,V)},this.setSize=function(T,k,X=!0){if(Pt.isPresenting){Gt("WebGLRenderer: Can't change size while VR device is presenting.");return}Bt=T,V=k,e.width=Math.floor(T*K),e.height=Math.floor(k*K),X===!0&&(e.style.width=T+"px",e.style.height=k+"px"),A!==null&&A.setSize(e.width,e.height),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(Bt*K,V*K).floor()},this.setDrawingBufferSize=function(T,k,X){Bt=T,V=k,K=X,e.width=Math.floor(T*X),e.height=Math.floor(k*X),this.setViewport(0,0,T,k)},this.setEffects=function(T){if(x===vn){Xt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let k=0;k<T.length;k++)if(T[k].isOutputPass===!0){Gt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy($)},this.getViewport=function(T){return T.copy(ct)},this.setViewport=function(T,k,X,H){T.isVector4?ct.set(T.x,T.y,T.z,T.w):ct.set(T,k,X,H),w.viewport($.copy(ct).multiplyScalar(K).round())},this.getScissor=function(T){return T.copy(Ut)},this.setScissor=function(T,k,X,H){T.isVector4?Ut.set(T.x,T.y,T.z,T.w):Ut.set(T,k,X,H),w.scissor(_t.copy(Ut).multiplyScalar(K).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(T){w.setScissorTest(pe=T)},this.setOpaqueSort=function(T){ut=T},this.setTransparentSort=function(T){At=T},this.getClearColor=function(T){return T.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor(...arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,X=!0){let H=0;if(T){let G=!1;if(st!==null){let Mt=st.texture.format;G=p.has(Mt)}if(G){let Mt=st.texture.type,Tt=m.has(Mt),bt=jt.getClearColor(),Rt=jt.getClearAlpha(),It=bt.r,ne=bt.g,he=bt.b;Tt?(M[0]=It,M[1]=ne,M[2]=he,M[3]=Rt,O.clearBufferuiv(O.COLOR,0,M)):(y[0]=It,y[1]=ne,y[2]=he,y[3]=Rt,O.clearBufferiv(O.COLOR,0,y))}else H|=O.COLOR_BUFFER_BIT}k&&(H|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),N=T},this.dispose=function(){e.removeEventListener("webglcontextlost",Re,!1),e.removeEventListener("webglcontextrestored",ge,!1),e.removeEventListener("webglcontextcreationerror",Bn,!1),jt.dispose(),vt.dispose(),gt.dispose(),W.dispose(),at.dispose(),it.dispose(),St.dispose(),rt.dispose(),mt.dispose(),Pt.dispose(),Pt.removeEventListener("sessionstart",Wu),Pt.removeEventListener("sessionend",Xu),ls.stop()};function Re(T){T.preventDefault(),Ch("WebGLRenderer: Context Lost."),P=!0}function ge(){Ch("WebGLRenderer: Context Restored."),P=!1;let T=B.autoReset,k=Ht.enabled,X=Ht.autoUpdate,H=Ht.needsUpdate,G=Ht.type;kt(),B.autoReset=T,Ht.enabled=k,Ht.autoUpdate=X,Ht.needsUpdate=H,Ht.type=G}function Bn(T){Xt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function jn(T){let k=T.target;k.removeEventListener("dispose",jn),Rm(k)}function Rm(T){Cm(T),W.remove(T)}function Cm(T){let k=W.get(T).programs;k!==void 0&&(k.forEach(function(X){mt.releaseProgram(X)}),T.isShaderMaterial&&mt.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,X,H,G,Mt){k===null&&(k=Ke);let Tt=G.isMesh&&G.matrixWorld.determinantAffine()<0,bt=Lm(T,k,X,H,G);w.setMaterial(H,Tt);let Rt=X.index,It=1;if(H.wireframe===!0){if(Rt=j.getWireframeAttribute(X),Rt===void 0)return;It=2}let ne=X.drawRange,he=X.attributes.position,Ct=ne.start*It,xe=(ne.start+ne.count)*It;Mt!==null&&(Ct=Math.max(Ct,Mt.start*It),xe=Math.min(xe,(Mt.start+Mt.count)*It)),Rt!==null?(Ct=Math.max(Ct,0),xe=Math.min(xe,Rt.count)):he!=null&&(Ct=Math.max(Ct,0),xe=Math.min(xe,he.count));let Ve=xe-Ct;if(Ve<0||Ve===1/0)return;St.setup(G,H,bt,X,Rt);let Pe,we=xt;if(Rt!==null&&(Pe=pt.get(Rt),we=et,we.setIndex(Pe)),G.isMesh)H.wireframe===!0?(w.setLineWidth(H.wireframeLinewidth*Ge()),we.setMode(O.LINES)):we.setMode(O.TRIANGLES);else if(G.isLine){let sn=H.linewidth;sn===void 0&&(sn=1),w.setLineWidth(sn*Ge()),G.isLineSegments?we.setMode(O.LINES):G.isLineLoop?we.setMode(O.LINE_LOOP):we.setMode(O.LINE_STRIP)}else G.isPoints?we.setMode(O.POINTS):G.isSprite&&we.setMode(O.TRIANGLES);if(G.isBatchedMesh)if(_e.get("WEBGL_multi_draw"))we.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let sn=G._multiDrawStarts,wt=G._multiDrawCounts,un=G._multiDrawCount,de=Rt?pt.get(Rt).bytesPerElement:1,Dn=W.get(H).currentProgram.getUniforms();for(let Qn=0;Qn<un;Qn++)Dn.setValue(O,"_gl_DrawID",Qn),we.render(sn[Qn]/de,wt[Qn])}else if(G.isInstancedMesh)we.renderInstances(Ct,Ve,G.count);else if(X.isInstancedBufferGeometry){let sn=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,wt=Math.min(X.instanceCount,sn);we.renderInstances(Ct,Ve,wt)}else we.render(Ct,Ve)};function Vu(T,k,X,H){N!==null&&T.isNodeMaterial&&N.setObject(H,T),Yt===!0&&Dt.setState(T,X,!1),T.transparent===!0&&T.side===Un&&T.forceSinglePass===!1?(T.side=Qe,T.needsUpdate=!0,Io(T,k,H),T.side=ai,T.needsUpdate=!0,Io(T,k,H),T.side=Un):Io(T,k,H)}this.compile=function(T,k,X=null){X===null&&(X=T),N!==null&&N.renderStart(T,k,X),S=gt.get(X),S.init(k),_.push(S),X.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),T!==X&&T.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),S.setupLights(),N!==null&&N.updateLights(S.state.lightsArray),re=this.localClippingEnabled,Yt=Dt.init(this.clippingPlanes,re),Yt===!0&&Dt.setGlobalState(this.clippingPlanes,k),N!==null&&Ht.render(S.state.shadowsArray,X,k);let H=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let Mt=G.material;if(Mt)if(Array.isArray(Mt))for(let Tt=0;Tt<Mt.length;Tt++){let bt=Mt[Tt];Vu(bt,X,k,G),H.add(bt)}else Vu(Mt,X,k,G),H.add(Mt)}),S=_.pop(),N!==null&&N.renderEnd(),H},this.compileAsync=function(T,k,X=null){let H=this.compile(T,k,X);return new Promise(G=>{function Mt(){if(H.forEach(function(Tt){let Rt=W.get(Tt).currentProgram;(Rt===void 0||Rt.isReady())&&H.delete(Tt)}),H.size===0){G(T);return}setTimeout(Mt,10)}_e.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let Rc=null;function Pm(T){Rc&&Rc(T)}function Wu(){ls.stop()}function Xu(){ls.start()}let ls=new Nf;ls.setAnimationLoop(Pm),typeof self<"u"&&ls.setContext(self),this.setAnimationLoop=function(T){Rc=T,Pt.setAnimationLoop(T),T===null?ls.stop():ls.start()},Pt.addEventListener("sessionstart",Wu),Pt.addEventListener("sessionend",Xu),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){Xt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;N!==null&&N.renderStart(T,k);let X=Pt.enabled===!0&&Pt.isPresenting===!0,H=A!==null&&(st===null||X)&&A.begin(C,st);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Pt.enabled===!0&&Pt.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Pt.cameraAutoUpdate===!0&&Pt.updateCamera(k),k=Pt.getCamera()),T.isScene===!0&&T.onBeforeRender(C,T,k,st),S=gt.get(T,_.length),S.init(k),S.state.textureUnits=J.getTextureUnits(),_.push(S),Lt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),qt.setFromProjectionMatrix(Lt,Xn,k.reversedDepth),re=this.localClippingEnabled,Yt=Dt.init(this.clippingPlanes,re),b=vt.get(T,E.length),b.init(),E.push(b),Pt.enabled===!0&&Pt.isPresenting===!0){let Tt=C.xr.getDepthSensingMesh();Tt!==null&&Cc(Tt,k,-1/0,C.sortObjects)}Cc(T,k,0,C.sortObjects),b.finish(),N!==null&&N.updateLights(S.state.lightsArray),C.sortObjects===!0&&b.sort(ut,At),Se=Pt.enabled===!1||Pt.isPresenting===!1||Pt.hasDepthSensing()===!1,Se&&jt.addToRenderList(b,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Yt===!0&&Dt.beginShadows();let G=S.state.shadowsArray;if(Ht.render(G,T,k),Yt===!0&&Dt.endShadows(),(H&&A.hasRenderPass())===!1){let Tt=b.opaque,bt=b.transmissive;if(S.setupLights(),k.isArrayCamera){let Rt=k.cameras;if(bt.length>0)for(let It=0,ne=Rt.length;It<ne;It++){let he=Rt[It];qu(Tt,bt,T,he)}Se&&jt.render(T);for(let It=0,ne=Rt.length;It<ne;It++){let he=Rt[It];$u(b,T,he,he.viewport)}}else bt.length>0&&qu(Tt,bt,T,k),Se&&jt.render(T),$u(b,T,k)}st!==null&&Y===0&&(J.updateMultisampleRenderTarget(st),J.updateRenderTargetMipmap(st)),H&&A.end(C),T.isScene===!0&&T.onAfterRender(C,T,k),St.resetDefaultState(),Z=-1,tt=null,_.pop(),_.length>0?(S=_[_.length-1],J.setTextureUnits(S.state.textureUnits),Yt===!0&&Dt.setGlobalState(C.clippingPlanes,S.state.camera)):S=null,E.pop(),E.length>0?b=E[E.length-1]:b=null,N!==null&&N.renderEnd()};function Cc(T,k,X,H){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLightProbeGrid)S.pushLightProbeGrid(T);else if(T.isLight)S.pushLight(T),T.castShadow&&S.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(qt)){H&&Ae.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Lt);let Tt=it.update(T),bt=T.material;bt.visible&&b.push(T,Tt,bt,X,Ae.z,null,k)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(qt))){let Tt=it.update(T),bt=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ae.copy(T.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),Ae.copy(Tt.boundingSphere.center)),Ae.applyMatrix4(T.matrixWorld).applyMatrix4(Lt)),Array.isArray(bt)){let Rt=Tt.groups;for(let It=0,ne=Rt.length;It<ne;It++){let he=Rt[It],Ct=bt[he.materialIndex];Ct&&Ct.visible&&b.push(T,Tt,Ct,X,Ae.z,he,k)}}else bt.visible&&b.push(T,Tt,bt,X,Ae.z,null,k)}}let Mt=T.children;for(let Tt=0,bt=Mt.length;Tt<bt;Tt++)Cc(Mt[Tt],k,X,H)}function $u(T,k,X,H){let{opaque:G,transmissive:Mt,transparent:Tt}=T;S.setupLightsView(X),Yt===!0&&Dt.setGlobalState(C.clippingPlanes,X),H&&w.viewport($.copy(H)),G.length>0&&Po(G,k,X),Mt.length>0&&Po(Mt,k,X),Tt.length>0&&Po(Tt,k,X),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function qu(T,k,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[H.id]===void 0){let Ct=_e.has("EXT_color_buffer_half_float")||_e.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[H.id]=new ln(1,1,{generateMipmaps:!0,type:Ct?Yn:vn,minFilter:Yi,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ae.workingColorSpace})}let Mt=S.state.transmissionRenderTarget[H.id],Tt=H.viewport||$;Mt.setSize(Tt.z*C.transmissionResolutionScale,Tt.w*C.transmissionResolutionScale);let bt=C.getRenderTarget(),Rt=C.getActiveCubeFace(),It=C.getActiveMipmapLevel();C.setRenderTarget(Mt),C.getClearColor(lt),nt=C.getClearAlpha(),nt<1&&C.setClearColor(16777215,.5),C.clear(),Se&&jt.render(X);let ne=C.toneMapping;C.toneMapping=$n;let he=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),S.setupLightsView(H),Yt===!0&&Dt.setGlobalState(C.clippingPlanes,H),Po(T,X,H),J.updateMultisampleRenderTarget(Mt),J.updateRenderTargetMipmap(Mt),_e.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let xe=0,Ve=k.length;xe<Ve;xe++){let Pe=k[xe],{object:we,geometry:sn,material:wt,group:un}=Pe;if(wt.side===Un&&we.layers.test(H.layers)){let de=wt.side;wt.side=Qe,wt.needsUpdate=!0,Yu(we,X,H,sn,wt,un),wt.side=de,wt.needsUpdate=!0,Ct=!0}}Ct===!0&&(J.updateMultisampleRenderTarget(Mt),J.updateRenderTargetMipmap(Mt))}C.setRenderTarget(bt,Rt,It),C.setClearColor(lt,nt),he!==void 0&&(H.viewport=he),C.toneMapping=ne}function Po(T,k,X){let H=k.isScene===!0?k.overrideMaterial:null;for(let G=0,Mt=T.length;G<Mt;G++){let Tt=T[G],{object:bt,geometry:Rt,group:It}=Tt,ne=Tt.material;ne.allowOverride===!0&&H!==null&&(ne=H),bt.layers.test(X.layers)&&Yu(bt,k,X,Rt,ne,It)}}function Yu(T,k,X,H,G,Mt){N!==null&&G.isNodeMaterial&&N.setObject(T,G),T.onBeforeRender(C,k,X,H,G,Mt),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(C,k,X,H,T,Mt),G.transparent===!0&&G.side===Un&&G.forceSinglePass===!1?(G.side=Qe,G.needsUpdate=!0,C.renderBufferDirect(X,k,H,G,T,Mt),G.side=ai,G.needsUpdate=!0,C.renderBufferDirect(X,k,H,G,T,Mt),G.side=Un):C.renderBufferDirect(X,k,H,G,T,Mt),T.onAfterRender(C,k,X,H,G,Mt)}function Io(T,k,X){k.isScene!==!0&&(k=Ke);let H=W.get(T),G=S.state.lights,Mt=S.state.shadowsArray,Tt=G.state.version,bt=mt.getParameters(T,G.state,Mt,k,X,S.state.lightProbeGridArray),Rt=mt.getProgramCacheKey(bt),It=H.programs;H.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?k.environment:null,H.fog=k.fog;let ne=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;H.envMap=at.get(T.envMap||H.environment,ne),H.envMapRotation=H.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,It===void 0&&(T.addEventListener("dispose",jn),It=new Map,H.programs=It);let he=It.get(Rt);if(he!==void 0){if(H.currentProgram===he&&H.lightsStateVersion===Tt)return Zu(T,bt),he}else bt.uniforms=mt.getUniforms(T),N!==null&&T.isNodeMaterial&&N.build(T,X,bt),T.onBeforeCompile(bt,C),he=mt.acquireProgram(bt,Rt),It.set(Rt,he),H.uniforms=bt.uniforms;let Ct=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ct.clippingPlanes=Dt.uniform),Zu(T,bt),H.needsLights=Dm(T),H.lightsStateVersion=Tt,H.needsLights&&(Ct.ambientLightColor.value=G.state.ambient,Ct.lightProbe.value=G.state.probe,Ct.sunLights.value=G.state.sun,Ct.sunLightShadows.value=G.state.sunShadow,Ct.directionalLights.value=G.state.directional,Ct.directionalLightShadows.value=G.state.directionalShadow,Ct.spotLights.value=G.state.spot,Ct.spotLightShadows.value=G.state.spotShadow,Ct.rectAreaLights.value=G.state.rectArea,Ct.ltc_1.value=G.state.rectAreaLTC1,Ct.ltc_2.value=G.state.rectAreaLTC2,Ct.pointLights.value=G.state.point,Ct.pointLightShadows.value=G.state.pointShadow,Ct.hemisphereLights.value=G.state.hemi,Ct.sunShadowMatrix.value=G.state.sunShadowMatrix,Ct.sunShadowCascade.value=G.state.sunShadowCascade,Ct.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ct.spotLightMatrix.value=G.state.spotLightMatrix,Ct.spotLightMap.value=G.state.spotLightMap,Ct.pointShadowMatrix.value=G.state.pointShadowMatrix),H.lightProbeGrid=S.state.lightProbeGridArray.length>0,H.currentProgram=he,H.uniformsList=null,he}function Ku(T){if(T.uniformsList===null){let k=T.currentProgram.getUniforms();T.uniformsList=mr.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function Zu(T,k){let X=W.get(T);X.outputColorSpace=k.outputColorSpace,X.batching=k.batching,X.batchingColor=k.batchingColor,X.instancing=k.instancing,X.instancingColor=k.instancingColor,X.instancingMorph=k.instancingMorph,X.skinning=k.skinning,X.morphTargets=k.morphTargets,X.morphNormals=k.morphNormals,X.morphColors=k.morphColors,X.morphTargetsCount=k.morphTargetsCount,X.numClippingPlanes=k.numClippingPlanes,X.numIntersection=k.numClipIntersection,X.vertexAlphas=k.vertexAlphas,X.vertexTangents=k.vertexTangents,X.toneMapping=k.toneMapping}function Im(T,k){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;v.setFromMatrixPosition(k.matrixWorld);for(let X=0,H=T.length;X<H;X++){let G=T[X];if(G.texture!==null&&G.boundingBox.containsPoint(v))return G}return null}function Lm(T,k,X,H,G){k.isScene!==!0&&(k=Ke),J.resetTextureUnits();let Mt=k.fog,Tt=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?k.environment:null,bt=st===null?C.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:ae.workingColorSpace,Rt=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,It=at.get(H.envMap||Tt,Rt),ne=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,he=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ct=!!X.morphAttributes.position,xe=!!X.morphAttributes.normal,Ve=!!X.morphAttributes.color,Pe=$n;H.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Pe=C.toneMapping);let we=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,sn=we!==void 0?we.length:0,wt=W.get(H),un=S.state.lights;if(Yt===!0&&(re===!0||T!==tt)){let Ce=T===tt&&H.id===Z;Dt.setState(H,T,Ce)}let de=!1;H.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==un.state.version||wt.outputColorSpace!==bt||G.isBatchedMesh&&wt.batching===!1||!G.isBatchedMesh&&wt.batching===!0||G.isBatchedMesh&&wt.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&wt.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&wt.instancing===!1||!G.isInstancedMesh&&wt.instancing===!0||G.isSkinnedMesh&&wt.skinning===!1||!G.isSkinnedMesh&&wt.skinning===!0||G.isInstancedMesh&&wt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&wt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&wt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&wt.instancingMorph===!1&&G.morphTexture!==null||wt.envMap!==It||H.fog===!0&&wt.fog!==Mt||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==Dt.numPlanes||wt.numIntersection!==Dt.numIntersection)||wt.vertexAlphas!==ne||wt.vertexTangents!==he||wt.morphTargets!==Ct||wt.morphNormals!==xe||wt.morphColors!==Ve||wt.toneMapping!==Pe||wt.morphTargetsCount!==sn||!!wt.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(de=!0):(de=!0,wt.__version=H.version);let Dn=wt.currentProgram;de===!0&&(Dn=Io(H,k,G),N&&H.isNodeMaterial&&N.onUpdateProgram(H,Dn,wt));let Qn=!1,Pi=!1,Ns=!1,be=Dn.getUniforms(),Fe=wt.uniforms;if(w.useProgram(Dn.program)&&(Qn=!0,Pi=!0,Ns=!0),H.id!==Z&&(Z=H.id,Pi=!0),wt.needsLights){let Ce=Im(S.state.lightProbeGridArray,G);wt.lightProbeGrid!==Ce&&(wt.lightProbeGrid=Ce,Pi=!0)}if(Qn||tt!==T){w.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),be.setValue(O,"projectionMatrix",T.projectionMatrix),be.setValue(O,"viewMatrix",T.matrixWorldInverse);let Li=be.map.cameraPosition;Li!==void 0&&Li.setValue(O,ce.setFromMatrixPosition(T.matrixWorld)),R.logarithmicDepthBuffer&&be.setValue(O,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&be.setValue(O,"isOrthographic",T.isOrthographicCamera===!0),tt!==T&&(tt=T,Pi=!0,Ns=!0)}if(wt.needsLights&&(un.state.sunShadowMap.length>0&&be.setValue(O,"sunShadowMap",un.state.sunShadowMap,J),un.state.directionalShadowMap.length>0&&be.setValue(O,"directionalShadowMap",un.state.directionalShadowMap,J),un.state.spotShadowMap.length>0&&be.setValue(O,"spotShadowMap",un.state.spotShadowMap,J),un.state.pointShadowMap.length>0&&be.setValue(O,"pointShadowMap",un.state.pointShadowMap,J)),G.isSkinnedMesh){be.setOptional(O,G,"bindMatrix"),be.setOptional(O,G,"bindMatrixInverse");let Ce=G.skeleton;Ce&&(Ce.boneTexture===null&&Ce.computeBoneTexture(),be.setValue(O,"boneTexture",Ce.boneTexture,J))}G.isBatchedMesh&&(be.setOptional(O,G,"batchingTexture"),be.setValue(O,"batchingTexture",G._matricesTexture,J),be.setOptional(O,G,"batchingIdTexture"),be.setValue(O,"batchingIdTexture",G._indirectTexture,J),be.setOptional(O,G,"batchingColorTexture"),G._colorsTexture!==null&&be.setValue(O,"batchingColorTexture",G._colorsTexture,J));let Ii=X.morphAttributes;if((Ii.position!==void 0||Ii.normal!==void 0||Ii.color!==void 0)&&U.update(G,X,Dn),(Pi||wt.receiveShadow!==G.receiveShadow)&&(wt.receiveShadow=G.receiveShadow,be.setValue(O,"receiveShadow",G.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&k.environment!==null&&(Fe.envMapIntensity.value=k.environmentIntensity),Fe.dfgLUT!==void 0&&(Fe.dfgLUT.value=M_()),Pi){if(be.setValue(O,"toneMappingExposure",C.toneMappingExposure),wt.needsLights&&Nm(Fe,Ns),Mt&&H.fog===!0&&Nt.refreshFogUniforms(Fe,Mt),Nt.refreshMaterialUniforms(Fe,H,K,V,S.state.transmissionRenderTarget[T.id]),wt.needsLights&&wt.lightProbeGrid){let Ce=wt.lightProbeGrid;Fe.probesSH.value=Ce.texture,Fe.probesMin.value.copy(Ce.boundingBox.min),Fe.probesMax.value.copy(Ce.boundingBox.max),Fe.probesResolution.value.copy(Ce.resolution)}mr.upload(O,Ku(wt),Fe,J)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(mr.upload(O,Ku(wt),Fe,J),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&be.setValue(O,"center",G.center),be.setValue(O,"modelViewMatrix",G.modelViewMatrix),be.setValue(O,"normalMatrix",G.normalMatrix),be.setValue(O,"modelMatrix",G.matrixWorld),H.uniformsGroups!==void 0){let Ce=H.uniformsGroups;for(let Li=0,Ds=Ce.length;Li<Ds;Li++){let ju=Ce[Li];rt.update(ju,Dn),rt.bind(ju,Dn)}}return Dn}function Nm(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.sunLights.needsUpdate=k,T.sunLightShadows.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Dm(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return st},this.setRenderTargetTextures=function(T,k,X){let H=W.get(T);H.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),W.get(T.texture).__webglTexture=k,W.get(T.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){let X=W.get(T);X.__webglFramebuffer=k,X.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,X=0){st=T,q=k,Y=X;let H=null,G=!1,Mt=!1;if(T){let bt=W.get(T);if(bt.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(O.FRAMEBUFFER,bt.__webglFramebuffer),$.copy(T.viewport),_t.copy(T.scissor),Et=T.scissorTest,w.viewport($),w.scissor(_t),w.setScissorTest(Et),Z=-1;return}else if(bt.__webglFramebuffer===void 0)J.setupRenderTarget(T);else if(bt.__hasExternalTextures)J.rebindTextures(T,W.get(T.texture).__webglTexture,W.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let ne=T.depthTexture;if(bt.__boundDepthTexture!==ne){if(ne!==null&&W.has(ne)&&(T.width!==ne.image.width||T.height!==ne.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(T)}}let Rt=T.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(Mt=!0);let It=W.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(It[k])?H=It[k][X]:H=It[k],G=!0):T.samples>0&&J.useMultisampledRTT(T)===!1?H=W.get(T).__webglMultisampledFramebuffer:Array.isArray(It)?H=It[X]:H=It,$.copy(T.viewport),_t.copy(T.scissor),Et=T.scissorTest}else $.copy(ct).multiplyScalar(K).floor(),_t.copy(Ut).multiplyScalar(K).floor(),Et=pe;if(X!==0&&(H=F),w.bindFramebuffer(O.FRAMEBUFFER,H)&&w.drawBuffers(T,H),w.viewport($),w.scissor(_t),w.setScissorTest(Et),G){let bt=W.get(T.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+k,bt.__webglTexture,X)}else if(Mt){let bt=k;for(let Rt=0;Rt<T.textures.length;Rt++){let It=W.get(T.textures[Rt]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Rt,It.__webglTexture,X,bt)}}else if(T!==null&&X!==0){let bt=W.get(T.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,bt.__webglTexture,X)}Z=-1};function Ju(T){let k=W.get(T);return(k.__readFormat!==T.format||k.__readType!==T.type)&&(k.__readFormat=T.format,k.__readType=T.type,k.__formatReadable=R.textureFormatReadable(T.format),k.__typeReadable=R.textureTypeReadable(T.type)),k}this.readRenderTargetPixels=function(T,k,X,H,G,Mt,Tt,bt=0){if(!(T&&T.isWebGLRenderTarget)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=W.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt){w.bindFramebuffer(O.FRAMEBUFFER,Rt);try{let It=T.textures[bt],ne=It.format,he=It.type;T.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+bt);let Ct=Ju(It);if(Ct.__formatReadable===!1){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ct.__typeReadable===!1){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-H&&X>=0&&X<=T.height-G&&O.readPixels(k,X,H,G,yt.convert(ne),yt.convert(he),Mt)}finally{let It=st!==null?W.get(st).__webglFramebuffer:null;w.bindFramebuffer(O.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(T,k,X,H,G,Mt,Tt,bt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=W.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt)if(k>=0&&k<=T.width-H&&X>=0&&X<=T.height-G){w.bindFramebuffer(O.FRAMEBUFFER,Rt);let It=T.textures[bt],ne=It.format,he=It.type;T.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+bt);let Ct=Ju(It);if(Ct.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ct.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xe=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,xe),O.bufferData(O.PIXEL_PACK_BUFFER,Mt.byteLength,O.STREAM_READ),O.readPixels(k,X,H,G,yt.convert(ne),yt.convert(he),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let Ve=st!==null?W.get(st).__webglFramebuffer:null;w.bindFramebuffer(O.FRAMEBUFFER,Ve);let Pe=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await af(O,Pe,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,xe),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Mt),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(xe),O.deleteSync(Pe),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,X=0){let H=Math.pow(2,-X),G=Math.floor(T.image.width*H),Mt=Math.floor(T.image.height*H),Tt=k!==null?k.x:0,bt=k!==null?k.y:0;J.setTexture2D(T,0),O.copyTexSubImage2D(O.TEXTURE_2D,X,0,0,Tt,bt,G,Mt),w.unbindTexture()},this.copyTextureToTexture=function(T,k,X=null,H=null,G=0,Mt=0){let Tt,bt,Rt,It,ne,he,Ct,xe,Ve,Pe=T.isCompressedTexture?T.mipmaps[Mt]:T.image;if(X!==null)Tt=X.max.x-X.min.x,bt=X.max.y-X.min.y,Rt=X.isBox3?X.max.z-X.min.z:1,It=X.min.x,ne=X.min.y,he=X.isBox3?X.min.z:0;else{let Fe=Math.pow(2,-G);Tt=Math.floor(Pe.width*Fe),bt=Math.floor(Pe.height*Fe),T.isDataArrayTexture?Rt=Pe.depth:T.isData3DTexture?Rt=Math.floor(Pe.depth*Fe):Rt=1,It=0,ne=0,he=0}H!==null?(Ct=H.x,xe=H.y,Ve=H.z):(Ct=0,xe=0,Ve=0);let we=yt.convert(k.format),sn=yt.convert(k.type),wt;k.isData3DTexture?(J.setTexture3D(k,0),wt=O.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(J.setTexture2DArray(k,0),wt=O.TEXTURE_2D_ARRAY):(J.setTexture2D(k,0),wt=O.TEXTURE_2D),w.activeTexture(O.TEXTURE0),w.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,k.flipY),w.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),w.pixelStorei(O.UNPACK_ALIGNMENT,k.unpackAlignment);let un=w.getParameter(O.UNPACK_ROW_LENGTH),de=w.getParameter(O.UNPACK_IMAGE_HEIGHT),Dn=w.getParameter(O.UNPACK_SKIP_PIXELS),Qn=w.getParameter(O.UNPACK_SKIP_ROWS),Pi=w.getParameter(O.UNPACK_SKIP_IMAGES);w.pixelStorei(O.UNPACK_ROW_LENGTH,Pe.width),w.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Pe.height),w.pixelStorei(O.UNPACK_SKIP_PIXELS,It),w.pixelStorei(O.UNPACK_SKIP_ROWS,ne),w.pixelStorei(O.UNPACK_SKIP_IMAGES,he);let Ns=T.isDataArrayTexture||T.isData3DTexture,be=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){let Fe=W.get(T),Ii=W.get(k),Ce=W.get(Fe.__renderTarget),Li=W.get(Ii.__renderTarget);w.bindFramebuffer(O.READ_FRAMEBUFFER,Ce.__webglFramebuffer),w.bindFramebuffer(O.DRAW_FRAMEBUFFER,Li.__webglFramebuffer);for(let Ds=0;Ds<Rt;Ds++)Ns&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,W.get(T).__webglTexture,G,he+Ds),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,W.get(k).__webglTexture,Mt,Ve+Ds)),O.blitFramebuffer(It,ne,Tt,bt,Ct,xe,Tt,bt,O.DEPTH_BUFFER_BIT,O.NEAREST);w.bindFramebuffer(O.READ_FRAMEBUFFER,null),w.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(G!==0||T.isRenderTargetTexture||W.has(T)){let Fe=W.get(T),Ii=W.get(k);w.bindFramebuffer(O.READ_FRAMEBUFFER,I),w.bindFramebuffer(O.DRAW_FRAMEBUFFER,z);for(let Ce=0;Ce<Rt;Ce++)Ns?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Fe.__webglTexture,G,he+Ce):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Fe.__webglTexture,G),be?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ii.__webglTexture,Mt,Ve+Ce):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ii.__webglTexture,Mt),G!==0?O.blitFramebuffer(It,ne,Tt,bt,Ct,xe,Tt,bt,O.COLOR_BUFFER_BIT,O.NEAREST):be?O.copyTexSubImage3D(wt,Mt,Ct,xe,Ve+Ce,It,ne,Tt,bt):O.copyTexSubImage2D(wt,Mt,Ct,xe,It,ne,Tt,bt);w.bindFramebuffer(O.READ_FRAMEBUFFER,null),w.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else be?T.isDataTexture||T.isData3DTexture?O.texSubImage3D(wt,Mt,Ct,xe,Ve,Tt,bt,Rt,we,sn,Pe.data):k.isCompressedArrayTexture?O.compressedTexSubImage3D(wt,Mt,Ct,xe,Ve,Tt,bt,Rt,we,Pe.data):O.texSubImage3D(wt,Mt,Ct,xe,Ve,Tt,bt,Rt,we,sn,Pe):T.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Mt,Ct,xe,Tt,bt,we,sn,Pe.data):T.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Mt,Ct,xe,Pe.width,Pe.height,we,Pe.data):O.texSubImage2D(O.TEXTURE_2D,Mt,Ct,xe,Tt,bt,we,sn,Pe);w.pixelStorei(O.UNPACK_ROW_LENGTH,un),w.pixelStorei(O.UNPACK_IMAGE_HEIGHT,de),w.pixelStorei(O.UNPACK_SKIP_PIXELS,Dn),w.pixelStorei(O.UNPACK_SKIP_ROWS,Qn),w.pixelStorei(O.UNPACK_SKIP_IMAGES,Pi),Mt===0&&k.generateMipmaps&&O.generateMipmap(wt),w.unbindTexture()},this.initRenderTarget=function(T){W.get(T).__webglFramebuffer===void 0&&J.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?J.setTextureCube(T,0):T.isData3DTexture?J.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?J.setTexture2DArray(T,0):J.setTexture2D(T,0),w.unbindTexture()},this.resetState=function(){q=0,Y=0,st=null,w.reset(),St.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}};var D={PITCH_A:1,PITCH_B:2,LINES:3,SURROUND:4,TRACK:5,GOAL_FRAME:6,NET:7,STAND_A:8,STAND_B:9,STAND_C:10,ROOF:11,CONCRETE:12,METAL:13,WOOD:14,FENCE:15,HOUSE_A:16,HOUSE_B:17,ROOF_TILE:18,TREE:19,TRUNK:20,BANNER_HOME:21,BANNER_AWAY:22,BOARD_A:23,BOARD_B:24,SCREEN:25,LAMP:26,CROWD_1:27,CROWD_2:28,CROWD_3:29,CROWD_4:30,SKIN_1:31,SKIN_2:32,SKIN_3:33,SKIN_H:34,HAIR_1:35,HAIR_2:36,HAIR_H:37,BOOT:38,BOOT_H:39,SHIRT_0:40,SHORTS_0:41,SOCKS_0:42,GK_0:43,NUM_0:44,SHIRT_1:45,SHORTS_1:46,SOCKS_1:47,GK_1:48,NUM_1:49,BALL_W:50,BALL_B:51,GLOVE:52,CONE:53,TARGET:54,CLOUD:55,SKY_TOP:56,SKY_BOTTOM:57,GOLD:58,EYE:59,GKX_0:60,GKX_1:61,INK:62,MARKER:63},iu=64,Le=Array.from({length:iu},()=>new Qt(1,1,1));function nu(s){return new Qt(s)}var su={name:"classic",label:"Classic",bg:"#f2f1ea",fog:"#f2f1ea",fogNear:60,fogFar:330,ink:"#161616",lineWidth:1.2,toon:0,shadow:0,clouds:!1,blobs:!0,roles:{PITCH_A:"#d3e6c3",PITCH_B:"#c6ddb4",LINES:"#ffffff",SURROUND:"#dde9d0",TRACK:"#ebe6dc",GOAL_FRAME:"#ffffff",NET:"#8a8a8a",STAND_A:"#f6f6f2",STAND_B:"#ecebe5",STAND_C:"#e2e0d8",ROOF:"#fafaf7",CONCRETE:"#efeee8",METAL:"#e8e8e6",WOOD:"#f1ebe0",FENCE:"#dcdcdc",HOUSE_A:"#f8f6f0",HOUSE_B:"#efece4",ROOF_TILE:"#e7e2d8",TREE:"#e4ecdc",TRUNK:"#ece6dc",BOARD_A:"#fbfbf8",BOARD_B:"#efefea",SCREEN:"#f7f7f4",LAMP:"#ffffff",CROWD_3:"#efefeb",CROWD_4:"#e3e2dc",SKIN_1:"#fbf6f0",SKIN_2:"#f3eadf",SKIN_3:"#e8dccd",HAIR_1:"#d9d4cc",HAIR_2:"#bdb7ae",BOOT:"#3a3a3a",BALL_W:"#ffffff",BALL_B:"#1b1b1b",GLOVE:"#f5f5f0",CONE:"#f2c9a0",TARGET:"#f0b8b0",CLOUD:"#ffffff",SKY_TOP:"#f4f3ee",SKY_BOTTOM:"#f2f1ea",GOLD:"#eadcaa",EYE:"#1b1b1b",INK:"#161616",MARKER:"#222222"},kitMix:.42,kitSat:.75,skinMix:.55},S_={name:"neo",label:"Neobrutalist",bg:"#8fe3ff",fog:"#b6efff",fogNear:110,fogFar:520,ink:"#000000",lineWidth:3,toon:1,shadow:1,clouds:!0,blobs:!1,roles:{PITCH_A:"#39c24a",PITCH_B:"#2fb041",LINES:"#ffffff",SURROUND:"#27a03a",TRACK:"#ff8a4c",GOAL_FRAME:"#ffffff",NET:"#1a1a1a",STAND_A:"#ff5c8a",STAND_B:"#ffd23f",STAND_C:"#3d9bff",ROOF:"#ffffff",CONCRETE:"#d9d2ff",METAL:"#b5b5c8",WOOD:"#ffb347",FENCE:"#7b7bff",HOUSE_A:"#ff9ecb",HOUSE_B:"#8ff0c4",ROOF_TILE:"#ff5a36",TREE:"#1fd06b",TRUNK:"#a9632e",BOARD_A:"#ffffff",BOARD_B:"#ffe45c",SCREEN:"#141414",LAMP:"#fffbe0",CROWD_3:"#ffe45c",CROWD_4:"#b48cff",SKIN_1:"#ffd8b8",SKIN_2:"#d9a27a",SKIN_3:"#9a6440",HAIR_1:"#2b1d14",HAIR_2:"#f2c14e",BOOT:"#101010",BALL_W:"#ffffff",BALL_B:"#101010",GLOVE:"#fff45c",CONE:"#ff7a1a",TARGET:"#ff3d6e",CLOUD:"#ffffff",SKY_TOP:"#1fb8ff",SKY_BOTTOM:"#c4f4ff",GOLD:"#ffc81a",EYE:"#000000",INK:"#000000",MARKER:"#ff3dcf"},kitMix:0,kitSat:1.15,skinMix:0},Al={classic:su,neo:S_},El={kits:[{shirt:"#c8102e",shorts:"#ffffff",socks:"#c8102e",gk:"#f2c500",gkx:"#222222",number:"#ffffff"},{shirt:"#1d4ed8",shorts:"#1d4ed8",socks:"#ffffff",gk:"#22c55e",gkx:"#111111",number:"#ffffff"}],human:{skin:"#e0b48c",hair:"#3b2a1e",boots:"#111111"}},Bf=su;function In(s,t,e,n){let i=nu(s),r={};return i.getHSL(r),i.setHSL(r.h,Math.min(1,r.s*n),r.l),e>0&&i.lerp(new Qt(1,1,1),e),i}function Hf(s){let t=Al[s]||su;Bf=t;for(let[e,n]of Object.entries(t.roles))Le[D[e]].set(n);return Vf(),t}function Gf(s,t){s&&(El.kits=s),t&&(El.human=t),Vf()}function Vf(){let s=Bf,t=El.kits,e=s.kitMix,n=s.kitSat;for(let r=0;r<2;r++){let o=t[r],a=r===0?0:5;Le[D.SHIRT_0+a].copy(In(o.shirt,s,e,n)),Le[D.SHORTS_0+a].copy(In(o.shorts,s,e,n)),Le[D.SOCKS_0+a].copy(In(o.socks,s,e,n)),Le[D.GK_0+a].copy(In(o.gk,s,e,n)),Le[D.NUM_0+a].copy(In(o.number,s,(s.name==="classic",0),1)),Le[r===0?D.GKX_0:D.GKX_1].copy(In(o.gkx,s,e*.6,n))}for(let r=0;r<2;r++){let o=Le[r===0?D.SHIRT_0:D.SHIRT_1],a=o.r*.3+o.g*.59+o.b*.11;Le[r===0?D.NUM_0:D.NUM_1].set(a>.6?"#141414":"#ffffff")}Le[D.BANNER_HOME].copy(In(t[0].shirt,s,e*.7,n)),Le[D.BANNER_AWAY].copy(In(t[1].shirt,s,e*.7,n)),Le[D.CROWD_1].copy(In(t[0].shirt,s,s.name==="classic"?.62:0,n)),Le[D.CROWD_2].copy(In(t[1].shirt,s,s.name==="classic"?.62:0,n));let i=El.human;Le[D.SKIN_H].copy(In(i.skin,s,s.skinMix,1)),Le[D.HAIR_H].copy(In(i.hair,s,s.skinMix*.8,1)),Le[D.BOOT_H].copy(In(i.boots,s,s.name==="classic"?.15:0,1))}function eu(s,t){let e=nu(s),n=nu(t);return Math.hypot(e.r-n.r,e.g-n.g,e.b-n.b)}function yr(s,t){let e={shirt:s.colors[0],shorts:s.colors[2]||s.colors[1],socks:s.colors[0],number:s.colors[1]},n={shirt:t.colors[0],shorts:t.colors[2]||t.colors[1],socks:t.colors[0],number:t.colors[1]};eu(e.shirt,n.shirt)<.55&&(n={shirt:t.colors[1],shorts:t.colors[0],socks:t.colors[1],number:t.colors[0]},eu(e.shirt,n.shirt)<.55&&(n={shirt:"#f4f4f4",shorts:"#222222",socks:"#f4f4f4",number:"#111111"}));let i=["#f2c500","#22c55e","#9333ea","#f97316","#0ea5e9","#ec4899","#111827"],r=o=>{let a=i[0],l=-1;for(let c of i){let h=Math.min(...o.map(d=>eu(c,d)));h>l&&(l=h,a=c)}return a};return e.gk=r([e.shirt,n.shirt]),n.gk=r([e.shirt,n.shirt,e.gk]),e.gkx="#1f1f1f",n.gkx="#1f1f1f",[e,n]}var $t={uPalette:{value:Le},uLightDir:{value:new L(-.45,.8,.38).normalize()},uToon:{value:0},uShadowAmt:{value:0},uLineWidth:{value:1.2},uMinWidth:{value:1},uTaper:{value:22},uResolution:{value:new Zt(1280,720)},uTime:{value:0},uCrowd:{value:0},uParts:{value:null},uAtlas:{value:null},uNetA:{value:new Te(0,0,0,0)},uNetDA:{value:new L(1,0,0)},uNetB:{value:new Te(0,0,0,0)},uNetDB:{value:new L(-1,0,0)}},ru=`
uniform highp sampler2D uParts;
mat4 partMatrix(float idx) {
  int row = int(idx + 0.5);
  return mat4(texelFetch(uParts, ivec2(0, row), 0), texelFetch(uParts, ivec2(1, row), 0),
              texelFetch(uParts, ivec2(2, row), 0), texelFetch(uParts, ivec2(3, row), 0));
}
`,Wf=`
uniform float uTime;
uniform float uCrowd;
float crowdLift(vec2 bob) {
  float rate = 2.6 + fract(bob.x * 7.31) * 2.4 + uCrowd * 4.0;
  float s = sin(uTime * rate + bob.x * 6.2831);
  return bob.y * (0.035 * s + uCrowd * (0.18 + 0.2 * fract(bob.x * 3.7)) * max(0.0, s));
}
`,w_=`
uniform vec4 uNetA; uniform vec3 uNetDA;
uniform vec4 uNetB; uniform vec3 uNetDB;
vec3 netDisp(vec3 p) {
  vec3 da = p - uNetA.xyz; vec3 db = p - uNetB.xyz;
  float fa = uNetA.w * exp(-dot(da, da) / 0.5);
  float fb = uNetB.w * exp(-dot(db, db) / 0.5);
  return uNetDA * fa + uNetDB * fb;
}
`,T_=`
attribute float aRole;
#ifdef PARTS
attribute float aPart;
${ru}
#endif
#ifdef CROWD
attribute vec2 aBob;
${Wf}
#endif
uniform vec3 uPalette[${iu}];
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
`,E_=`
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
`;function ui(s={}){let t={};s.parts&&(t.PARTS=""),s.crowd&&(t.CROWD=""),s.atlas&&(t.USE_ATLAS="");let e=co.merge([dt.lights,dt.fog]);return Object.assign(e,{uPalette:$t.uPalette,uLightDir:$t.uLightDir,uToon:$t.uToon,uShadowAmt:$t.uShadowAmt,uParts:$t.uParts,uAtlas:$t.uAtlas,uTime:$t.uTime,uCrowd:$t.uCrowd}),new Oe({uniforms:e,defines:t,vertexShader:T_,fragmentShader:E_,lights:!0,fog:s.fog!==!1,side:s.doubleSided?Un:ai,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})}var A_=`
attribute vec3 iA;
attribute vec3 iB;
attribute vec3 iN1;
attribute vec3 iN2;
attribute vec2 iMeta;
#ifdef PARTS
${ru}
#endif
#ifdef CROWD
attribute vec2 iBob;
${Wf}
#endif
#ifdef NET
${w_}
#endif
uniform float uLineWidth;
uniform float uWidthScale;
uniform float uMinWidth;
uniform float uTaper;
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
  float crease = iMeta.y;
  bool boundary = dot(n2, n2) < 0.01;
  if (!boundary) {
    vec3 V = 0.5 * (wa.xyz + wb.xyz) - cameraPosition;
    float d1 = dot(mat3(modelMatrix) * n1, V);
    float d2 = dot(mat3(modelMatrix) * n2, V);
    bool silhouette = d1 * d2 <= 0.0;
    bool visibleCrease = crease > 0.5 && (d1 < 0.0 || d2 < 0.0);
    if (!silhouette && !visibleCrease) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
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
  wpx = max(min(wpx, uMinWidth), wpx * clamp(uTaper / max(clip.w, 0.1), 0.35, 1.0));
  offset *= wpx;
  offset /= uResolution.y;
  offset *= clip.w;
  clip.xy += offset;
  clip.z -= 0.00025 * clip.w;
  gl_Position = clip;
  vec4 mvPosition = (position.y < 0.5) ? start : end;
  #include <fog_vertex>
}
`,R_=`
uniform vec3 uColor;
uniform float uOpacity;
#include <common>
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uColor, uOpacity);
  #include <fog_fragment>
}
`;function Kn(s={}){let t={};s.parts&&(t.PARTS=""),s.crowd&&(t.CROWD=""),s.net&&(t.NET="");let e=co.merge([dt.fog]);return Object.assign(e,{uLineWidth:$t.uLineWidth,uMinWidth:$t.uMinWidth,uTaper:$t.uTaper,uResolution:$t.uResolution,uParts:$t.uParts,uTime:$t.uTime,uCrowd:$t.uCrowd,uNetA:$t.uNetA,uNetDA:$t.uNetDA,uNetB:$t.uNetB,uNetDB:$t.uNetDB,uColor:{value:Le[s.role??D.INK]},uOpacity:{value:s.opacity??1},uWidthScale:{value:s.widthScale??1}}),new Oe({uniforms:e,defines:t,vertexShader:A_,fragmentShader:R_,fog:s.fog!==!1,transparent:(s.opacity??1)<1,depthWrite:(s.opacity??1)>=1})}function Xf(){return new Oe({uniforms:{uParts:$t.uParts},vertexShader:`${ru}
attribute float aPart;
void main(){ vec3 p = (partMatrix(aPart) * vec4(position,1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0); }`,fragmentShader:"void main(){ gl_FragColor = vec4(1.0); }"})}function $f(){return new Oe({uniforms:{uTop:{value:Le[D.SKY_TOP]},uBottom:{value:Le[D.SKY_BOTTOM]}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uTop; uniform vec3 uBottom; varying vec3 vDir; void main(){ float t = smoothstep(-0.02, 0.55, vDir.y); gl_FragColor = vec4(mix(uBottom, uTop, t), 1.0); }",side:Qe,depthWrite:!1,fog:!1})}function qf(){return new Oe({uniforms:{uInk:{value:Le[D.INK]}},vertexShader:"attribute float aAlpha; varying vec2 vP; varying float vA; void main(){ vP = position.xz * 2.0; vA = aAlpha; gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uInk; varying vec2 vP; varying float vA; void main(){ float d = length(vP); float a = (1.0 - smoothstep(0.35, 1.0, d)) * vA; if (a < 0.01) discard; gl_FragColor = vec4(uInk, a); }",transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function ws(s,t=1){return new Oe({uniforms:{uColor:{value:Le[s]},uOpacity:{value:t}},vertexShader:"void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uColor; uniform float uOpacity; void main(){ gl_FragColor = vec4(uColor, uOpacity); }",transparent:t<1,depthWrite:t>=1})}function Yf(s){return new Oe({uniforms:{uMap:{value:s}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(uMap, vUv).rgb, 1.0); }"})}var ke=new Map;function Ji(s,t,e=!0){let n=s.index?s.toNonIndexed():s,i=new Float32Array(n.attributes.position.array),r=new Float32Array(n.attributes.normal.array),o=n.attributes.uv?new Float32Array(n.attributes.uv.array):null,a=e?C_(s,t):[];return{positions:i,normals:r,uvs:o,edges:a}}function C_(s,t=32){let e=s.attributes.position,n=new Map,i=[],r=new Int32Array(e.count);for(let x=0;x<e.count;x++){let p=e.getX(x),m=e.getY(x),M=e.getZ(x),y=`${Math.round(p*1e4)},${Math.round(m*1e4)},${Math.round(M*1e4)}`,v=n.get(y);v===void 0&&(v=i.length,n.set(y,v),i.push([p,m,M])),r[x]=v}let o=s.index?s.index.array:null,a=o?o.length/3:e.count/3,l=new Map,c=i.length,h=new L,d=new L,u=new L;for(let x=0;x<a;x++){let p=r[o?o[x*3]:x*3],m=r[o?o[x*3+1]:x*3+1],M=r[o?o[x*3+2]:x*3+2];if(p===m||m===M||p===M)continue;let y=i[p],v=i[m],b=i[M];if(h.set(v[0]-y[0],v[1]-y[1],v[2]-y[2]),d.set(b[0]-y[0],b[1]-y[1],b[2]-y[2]),u.crossVectors(h,d),u.lengthSq()<1e-14)continue;u.normalize();let S=[u.x,u.y,u.z];for(let[E,_]of[[p,m],[m,M],[M,p]]){let A=Math.min(E,_),C=Math.max(E,_),P=A*c+C,N=l.get(P);N||(N={a:A,b:C,normals:[]},l.set(P,N)),N.normals.push(S)}}let f=Math.cos(t*Math.PI/180),g=[];for(let x of l.values()){let p=x.normals[0];if(x.normals.length===1){g.push({a:i[x.a],b:i[x.b],n1:p,n2:[0,0,0],crease:1});continue}let m=x.normals[1],M=p[0]*m[0]+p[1]*m[1]+p[2]*m[2];M>.9999||g.push({a:i[x.a],b:i[x.b],n1:p,n2:m,crease:M<f?1:0})}return g}function vr(s,t,e){let n=`box:${s}:${t}:${e}`;return ke.has(n)||ke.set(n,Ji(new Bi(s,t,e),30)),ke.get(n)}function di(s,t,e,n=8,i=!1){let r=`cyl:${s}:${t}:${e}:${n}:${i}`;return ke.has(r)||ke.set(r,Ji(new oi(s,t,e,n,1,i),n<=4?30:60)),ke.get(r)}function po(s,t=12,e=8,n=Math.PI*2,i=Math.PI){let r=`sph:${s}:${t}:${e}:${n}:${i}`;return ke.has(r)||ke.set(r,Ji(new ys(s,t,e,0,n,0,i),70)),ke.get(r)}function P_(s,t,e=8){let n=`cone:${s}:${t}:${e}`;return ke.has(n)||ke.set(n,Ji(new wi(s,t,e),e<=4?30:60)),ke.get(n)}function I_(s,t,e=!1){let n=`plane:${s}:${t}:${e}`;if(!ke.has(n)){let i=new Rn(s,t);i.rotateX(-Math.PI/2),ke.set(n,Ji(i,30,e))}return ke.get(n)}function Cl(s,t){let e=`quad:${s}:${t}`;return ke.has(e)||ke.set(e,Ji(new Rn(s,t),30,!1)),ke.get(e)}function mo(s,t,e=30,n=!0){return ke.has(s)||ke.set(s,Ji(t(),e,n)),ke.get(s)}function Jf(s,t=1){let e=`ico:${s}:${t}`;return ke.has(e)||ke.set(e,Ji(new Hi(s,t),70)),ke.get(e)}var Aw=new oe,Rl=new Wt,Ln=new L,Kf=new Be,Zf=new xn,L_=new L,tn=class s{constructor(t={}){this.opts=t,this.pos=[],this.nor=[],this.role=[],this.part=[],this.bob=[],this.uv=[],this.eA=[],this.eB=[],this.eN1=[],this.eN2=[],this.eMeta=[],this.eBob=[],this.vcount=0}add(t,e,n,i={}){Rl.getNormalMatrix(e);let r=e.elements,o=t.positions,a=t.normals,l=i.part??-1,c=i.bob||null,h=i.uvRect||null,d=i.roleFn||null;for(let f=0;f<o.length;f+=3){let g=o[f],x=o[f+1],p=o[f+2];if(this.pos.push(r[0]*g+r[4]*x+r[8]*p+r[12],r[1]*g+r[5]*x+r[9]*p+r[13],r[2]*g+r[6]*x+r[10]*p+r[14]),Ln.set(a[f],a[f+1],a[f+2]).applyMatrix3(Rl).normalize(),this.nor.push(Ln.x,Ln.y,Ln.z),this.role.push(i.roles?i.roles[f/3]:d?d(f/3,g,x,p):n),this.opts.parts&&this.part.push(l),this.opts.bob&&this.bob.push(c?c[0]:0,c?c[1]:0),this.opts.atlas)if(h&&t.uvs){let m=f/3*2;this.uv.push(h[0]+t.uvs[m]*(h[2]-h[0]),h[1]+t.uvs[m+1]*(h[3]-h[1]))}else this.uv.push(-1,-1)}if(this.vcount+=o.length/3,i.noEdges||!t.edges.length)return this;let u=!!i.creaseOnly;for(let f of t.edges){if(u&&f.crease<.5)continue;let g=f.a,x=f.b;this.eA.push(r[0]*g[0]+r[4]*g[1]+r[8]*g[2]+r[12],r[1]*g[0]+r[5]*g[1]+r[9]*g[2]+r[13],r[2]*g[0]+r[6]*g[1]+r[10]*g[2]+r[14]),this.eB.push(r[0]*x[0]+r[4]*x[1]+r[8]*x[2]+r[12],r[1]*x[0]+r[5]*x[1]+r[9]*x[2]+r[13],r[2]*x[0]+r[6]*x[1]+r[10]*x[2]+r[14]),Ln.set(f.n1[0],f.n1[1],f.n1[2]).applyMatrix3(Rl).normalize(),this.eN1.push(Ln.x,Ln.y,Ln.z),f.n2[0]===0&&f.n2[1]===0&&f.n2[2]===0?this.eN2.push(0,0,0):(Ln.set(f.n2[0],f.n2[1],f.n2[2]).applyMatrix3(Rl).normalize(),this.eN2.push(Ln.x,Ln.y,Ln.z)),this.eMeta.push(l,f.crease),this.opts.bob&&this.eBob.push(c?c[0]:0,c?c[1]:0)}return this}line(t,e,n,i,r,o,a=-1){return this.eA.push(t,e,n),this.eB.push(i,r,o),this.eN1.push(0,1,0),this.eN2.push(0,0,0),this.eMeta.push(a,1),this.opts.bob&&this.eBob.push(0,0),this}static mat(t,e,n,i=0,r=0,o=0,a=1,l=1,c=1){return Zf.set(i,r,o,"YXZ"),Kf.setFromEuler(Zf),new oe().compose(Ln.set(t,e,n).clone(),Kf.clone(),L_.set(a,l,c).clone())}box(t,e,n,i,r,o,a,l=0,c={}){return this.add(vr(e,n,i),s.mat(r,o,a,c.rx||0,l,c.rz||0),t,c)}cyl(t,e,n,i,r,o,a,l,c={}){return this.add(di(e,n,i,r,c.open),s.mat(o,a,l,c.rx||0,c.ry||0,c.rz||0,c.sx||1,1,c.sz||1),t,c)}sphere(t,e,n,i,r,o={}){return this.add(po(e,o.ws||12,o.hs||8,o.phi,o.theta),s.mat(n,i,r,o.rx||0,o.ry||0,o.rz||0,o.sx||1,o.sy||1,o.sz||1),t,o)}cone(t,e,n,i,r,o,a,l={}){return this.add(P_(e,n,i),s.mat(r,o,a,l.rx||0,l.ry||0,l.rz||0,l.sx||1,l.sy||1,l.sz||1),t,l)}plane(t,e,n,i,r,o,a={}){return this.add(I_(e,n,!!a.edges),s.mat(i,r,o,0,a.ry||0,0),t,{noEdges:!a.edges,...a})}quad(t,e,n,i,r,o,a=0,l={}){return this.add(Cl(e,n),s.mat(i,r,o,l.rx||0,a,0),t,{noEdges:!0,...l})}between(t,e,n,i,r,o,a,l,c=6,h={}){let d=o-n,u=a-i,f=l-r,g=Math.hypot(d,u,f),x=new oe,p=new L(d,u,f).normalize(),m=new Be().setFromUnitVectors(new L(0,1,0),p);return x.compose(new L((n+o)/2,(i+a)/2,(r+l)/2),m,new L(1,1,1)),this.add(di(e,e,g,c),x,t,h)}buildSolid(){let t=new je;return t.setAttribute("position",new me(this.pos,3)),t.setAttribute("normal",new me(this.nor,3)),t.setAttribute("aRole",new me(this.role,1)),this.opts.parts&&t.setAttribute("aPart",new me(this.part,1)),this.opts.bob&&t.setAttribute("aBob",new me(this.bob,2)),this.opts.atlas&&t.setAttribute("uv",new me(this.uv,2)),t.computeBoundingSphere(),t}buildEdges(){let t=new Qr,e=[-1,0,0,1,0,0,-1,1,0,1,1,0];t.setIndex([0,1,2,2,1,3]),t.setAttribute("position",new me(e,3));let n=this.eA.length/3;return t.setAttribute("iA",new yn(new Float32Array(this.eA),3)),t.setAttribute("iB",new yn(new Float32Array(this.eB),3)),t.setAttribute("iN1",new yn(new Float32Array(this.eN1),3)),t.setAttribute("iN2",new yn(new Float32Array(this.eN2),3)),t.setAttribute("iMeta",new yn(new Float32Array(this.eMeta),2)),this.opts.bob&&t.setAttribute("iBob",new yn(new Float32Array(this.eBob),2)),t.instanceCount=n,t.boundingSphere=new ri(new L,1e6),t}get edgeCount(){return this.eA.length/3}};var Ts=.008333333333333333,Q={L:64,W:42,HL:32,HW:21},ft={W:5,HW:2.5,H:2,DEPTH:1.6,TOP_DEPTH:1,POST_R:.06},Kt={PEN_D:9,PEN_HW:10,GOAL_D:3,GOAL_HW:4.5,SPOT:7.5,CIRCLE_R:6,ARC_R:5,CORNER_R:1},hn={HL:40,HW:29},fe=.11,Pl=9.81,Mn={AIR_DRAG:.0125,ROLL_A0:.6,ROLL_C:.014,BOUNCE:.55,BOUNCE_FRICTION:.82,MAGNUS:.003},ve={RESTART_DIST:6,THROW_DIST:3,KICK_RELEASE_LOCK:.25,CONTROL_RADIUS:1,CONTROL_HEIGHT:1,PROTECT_RADIUS:1.15,LOSE_RADIUS:4,ASSIST_WINDOW:8,TACKLE_WINDOW:2,SLIDE_COOLDOWN:1.5,TACKLE_COOLDOWN:.55,REQUEST_COOLDOWN:1.6,INPUT_BUFFER:.15,GK_MAX_HOLD:4},Il={short:120,normal:180,long:300};var go=[{id:"ST",name:"Striker"},{id:"W",name:"Winger"},{id:"AM",name:"Attacking Midfielder"},{id:"CM",name:"Central Midfielder"},{id:"DEF",name:"Defender"}];var yo={community:{name:"Community Ground",crowd:130,loud:.35},town:{name:"Town Stadium",crowd:520,loud:.55},regional:{name:"Regional Stadium",crowd:1200,loud:.75},premier:{name:"Premier Arena",crowd:2400,loud:.9},continental:{name:"Continental Stadium",crowd:3400,loud:1},training:{name:"Training Ground",crowd:0,loud:0}};function ep(s){let t=s>>>0||1;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}var Dl=.1,lu=.012;function On(s,t,e,n,i){let r=n-t,o=i-e,a=Math.hypot(r,o),l=Math.atan2(r,o);s.plane(D.LINES,Dl,a+Dl*.5,(t+n)/2,lu,(e+i)/2,{ry:l})}function ou(s,t,e,n,i,r,o=40){for(let a=0;a<o;a++){let l=i+(r-i)*(a/o),c=i+(r-i)*((a+1)/o);On(s,t+Math.cos(l)*n,e+Math.sin(l)*n,t+Math.cos(c)*n,e+Math.sin(c)*n)}}function jf(s,t,e,n=.12){for(let i=0;i<4;i++)s.plane(D.LINES,n*2,n*.9,t,lu,e,{ry:i*Math.PI/4})}function N_(s,t={}){let e=Q.HL,n=Q.HW,i=16,r=Q.L/i;for(let c=0;c<i;c++)s.plane(c%2?D.PITCH_A:D.PITCH_B,r,Q.W,-e+r*(c+.5),0,0);let o=t.surroundX||44,a=t.surroundZ||33;s.plane(D.SURROUND,o*2,a-n,0,-.004,n+(a-n)/2),s.plane(D.SURROUND,o*2,a-n,0,-.004,-n-(a-n)/2),s.plane(D.SURROUND,o-e,Q.W,e+(o-e)/2,-.004,0),s.plane(D.SURROUND,o-e,Q.W,-e-(o-e)/2,-.004,0);let l=Dl/2;On(s,-e,n-l,e,n-l),On(s,-e,-n+l,e,-n+l),On(s,e-l,-n,e-l,n),On(s,-e+l,-n,-e+l,n),On(s,0,-n,0,n),ou(s,0,0,Kt.CIRCLE_R,0,Math.PI*2,56),jf(s,0,0,.15);for(let c of[1,-1]){let h=c*e,d=h-c*Kt.PEN_D;On(s,d,-Kt.PEN_HW,d,Kt.PEN_HW),On(s,h,Kt.PEN_HW,d,Kt.PEN_HW),On(s,h,-Kt.PEN_HW,d,-Kt.PEN_HW);let u=h-c*Kt.GOAL_D;On(s,u,-Kt.GOAL_HW,u,Kt.GOAL_HW),On(s,h,Kt.GOAL_HW,u,Kt.GOAL_HW),On(s,h,-Kt.GOAL_HW,u,-Kt.GOAL_HW);let f=h-c*Kt.SPOT;jf(s,f,0);let g=Math.abs(d-f),x=Math.acos(Math.min(1,g/Kt.ARC_R)),p=c>0?Math.PI:0;ou(s,f,0,Kt.ARC_R,p-x,p+x,16);for(let m of[1,-1]){let M=c>0?Math.PI:0,v=-m*Math.PI/2-M;for(;v>Math.PI;)v-=Math.PI*2;for(;v<-Math.PI;)v+=Math.PI*2;ou(s,h,m*n,Kt.CORNER_R,M,M+v,8),s.cyl(D.METAL,.02,.02,1.5,6,h,.75,m*n),s.box(D.BANNER_HOME,.02,.26,.36,h,1.36,m*n-m*.19)}}}function D_(s){let t=ft.POST_R;for(let e of[1,-1]){let n=e*(Q.HL-t);for(let o of[1,-1])s.cyl(D.GOAL_FRAME,t,t,ft.H+t,12,n,(ft.H+t)/2,o*(ft.HW+t));s.cyl(D.GOAL_FRAME,t,t,ft.W+t*4,12,n,ft.H+t,0,{rx:Math.PI/2});let i=e*(Q.HL+ft.DEPTH),r=e*(Q.HL+ft.TOP_DEPTH);for(let o of[1,-1]){let a=o*(ft.HW+t);s.between(D.METAL,.03,i,.03,a,r,ft.H,a,6),s.between(D.METAL,.03,n,ft.H+t,a,r,ft.H,a,6),s.between(D.METAL,.025,n,.03,a,i,.03,a,6)}s.between(D.METAL,.03,r,ft.H,-(ft.HW+t),r,ft.H,ft.HW+t,6),s.between(D.METAL,.025,i,.03,-(ft.HW+t),i,.03,ft.HW+t,6)}}function np(){let s=new tn,t=.2;for(let e of[1,-1]){let n=e*Q.HL,i=l=>e*(Q.HL+ft.DEPTH+(ft.TOP_DEPTH-ft.DEPTH)*(l/ft.H)),r=ft.HW;for(let l=-r;l<=r+1e-6;l+=t)for(let c=0;c<ft.H-1e-6;c+=t)s.line(i(c),c,l,i(c+t),c+t,l);for(let l=0;l<=ft.H+1e-6;l+=t)for(let c=-r;c<r-1e-6;c+=t)s.line(i(l),l,c,i(l),l,c+t);for(let l of[1,-1]){let c=l*r;for(let h=0;h<=ft.H+1e-6;h+=t){let d=i(h),u=Math.max(1,Math.round(Math.abs(d-n)/t));for(let f=0;f<u;f++)s.line(n+(d-n)*(f/u),h,c,n+(d-n)*((f+1)/u),h,c)}for(let h=0;h<=8;h++){let d=h/8;for(let u=0;u<ft.H-1e-6;u+=t){let f=n+(i(u)-n)*d,g=n+(i(u+t)-n)*d;s.line(f,u,c,g,u+t,c)}}}let o=i(ft.H),a=Math.max(1,Math.round(Math.abs(o-n)/t));for(let l=-r;l<=r+1e-6;l+=t)for(let c=0;c<a;c++)s.line(n+(o-n)*(c/a),ft.H,l,n+(o-n)*((c+1)/a),ft.H,l);for(let l=0;l<=a;l++)for(let c=-r;c<r-1e-6;c+=t)s.line(n+(o-n)*(l/a),ft.H,c,n+(o-n)*(l/a),ft.H,c+t)}return s.buildEdges()}var Zn=class{constructor(t,e,n,i){this.b=t,this.cx=e,this.cz=n,this.ry=i,this.c=Math.cos(i),this.s=Math.sin(i)}w(t,e){return[this.cx+t*this.c+e*this.s,this.cz-t*this.s+e*this.c]}box(t,e,n,i,r,o,a,l={}){let[c,h]=this.w(r,a);this.b.box(t,e,n,i,c,o,h,this.ry+(l.ry||0),l)}cyl(t,e,n,i,r,o,a,l,c={}){let[h,d]=this.w(o,l);this.b.cyl(t,e,n,i,r,h,a,d,c)}sphere(t,e,n,i,r,o={}){let[a,l]=this.w(n,r);this.b.sphere(t,e,a,i,l,o)}quad(t,e,n,i,r,o,a={}){let[l,c]=this.w(i,o);this.b.quad(t,e,n,l,r,c,this.ry+Math.PI+(a.ry||0),a)}},Qf=[D.CROWD_1,D.CROWD_1,D.CROWD_1,D.CROWD_2,D.CROWD_3,D.CROWD_4,D.CROWD_1,D.CROWD_3],k_=[D.SKIN_1,D.SKIN_2,D.SKIN_3];function U_(s,t,e,n,i,r=!0){let o=Qf[Math.floor(i()*Qf.length)],a=[i(),1],l=r?.46:.62;s.box(o,.44,l,.28,t,e+l/2,n,{bob:a});let[c,h]=s.w(t,n);s.b.add(Jf(.14,0),tn.mat(c,e+l+.16,h,0,i()*6,0),k_[Math.floor(i()*3)],{bob:a})}function Fn(s,t,e,n){let i=new Zn(s,t.cx,t.cz,t.ry),r=t.rows,o=t.rowDepth||.85,a=t.rowHeight||.42,l=t.base||.6,c=t.len,h=t.z0||0,d=t.roles||[D.STAND_A,D.STAND_B];i.box(t.wallRole||D.CONCRETE,c,l,.3,0,l/2,h-.15);for(let g=0;g<r;g++){let x=l+g*a;if(i.box(d[Math.floor(g/(t.band||2))%d.length],c,a,o,0,x+a/2,h+o*(g+.5)),t.density>0){let p=Math.floor(c/.62);for(let m=0;m<p;m++){let M=-c/2+.31+m*.62+(e()-.5)*.1;n.seats.push({f:i,lx:M,y:x+a,lz:h+o*(g+.5)+.05,w:t.density,seated:!0})}}}let u=l+r*a,f=h+o*r;i.box(t.wallRole||D.CONCRETE,c+.4,u+1.4,.35,0,(u+1.4)/2,f+.17);for(let g of[-1,1])i.box(t.wallRole||D.CONCRETE,.35,u+.6,f-h,g*(c/2+.17),(u+.6)/2,h+(f-h)/2);if(t.roof){let g=u+(t.roofClear||3.2),x=f-h+1.5,p=Math.max(2,Math.round(c/12));for(let m=0;m<=p;m++){let M=-c/2+c*m/p;i.cyl(D.METAL,.16,.16,g,8,M,g/2,f+.1)}i.box(t.roofRole||D.ROOF,c+1.2,.35,x,0,g,f-x/2+.6,{rx:-.07}),i.box(D.METAL,c+1.2,.5,.25,0,g-.3,f-x+.7)}if(t.banners){let g=Math.max(1,Math.floor(c/10));for(let x=0;x<g;x++){let p=-c/2+c*(x+.5)/g;i.box(x%2?D.BANNER_HOME:D.GOLD,5,.9,.06,p,l*.55+.3,h-.35)}}return{top:u,back:f}}function tp(s,t,e,n,i){s.cyl(D.METAL,.22,.32,n,8,t,n/2,e);let r=Math.atan2(-t,-e),o=new Zn(s,t,e,r);o.box(D.METAL,3.6,2.4,.3,0,n+1.2,.2,{rx:.35});for(let a=0;a<3;a++)for(let l=0;l<2;l++)o.box(D.LAMP,.9,.7,.2,-1.15+a*1.15,n+.65+l*1.1,-.05,{rx:.35})}function Ll(s,t,e){let o=0,a=(l,c,h,d,u)=>{let f=Math.abs(h-c),g=Math.max(1,Math.round(f/8)),x=f/g;for(let p=0;p<g;p++){let m=Math.min(c,h)+x*(p+.5),M=d?l:m,y=d?m:l;s.box(p%2?D.BOARD_A:D.BOARD_B,x-.06,.9,.12,M,.9/2,y,d?Math.PI/2:0);let v=.075,b=M+(d?-Math.sign(l)*v:0),S=y+(d?0:-Math.sign(l)*v),E=e[o++%e.length];s.quad(p%3===0?D.BANNER_HOME:D.INK,Math.min(x-.6,6),.62,b,.9/2,S,u,{uvRect:t.word(E)})}};a(28.6,-39.6,39.6,!1,Math.PI),a(-28.6,-39.6,39.6,!1,0),a(39.6,-28.6+1,-ft.HW-4,!0,-Math.PI/2),a(39.6,ft.HW+4,28.6-1,!0,-Math.PI/2),a(-39.6,-28.6+1,-ft.HW-4,!0,Math.PI/2),a(-39.6,ft.HW+4,28.6-1,!0,Math.PI/2)}function xo(s,t=27.2){for(let e of[-9,9]){let n=new Zn(s,e,t,0);n.box(D.STAND_C,7,2.2,.15,0,1.1,1),n.box(D.ROOF,7.2,.12,1.8,0,2.25,.2,{rx:-.08});for(let i of[-1,1])n.box(D.STAND_C,.12,2.1,1.7,i*3.5,1.05,.2);n.box(D.WOOD,6.4,.45,.5,0,.22,.6)}}function Nl(s,t,e,n,i){s.cyl(D.TRUNK,.18*n,.25*n,2.2*n,6,t,1.1*n,e),s.cone(D.TREE,1.8*n,4.5*n,8,t,2.2*n+2.25*n,e,{ry:i()*3}),s.cone(D.TREE,1.3*n,3.2*n,8,t,2.2*n+3.6*n,e,{ry:i()*3})}var O_=()=>mo("pyramid",()=>{let s=new wi(Math.SQRT1_2,1,4);return s.rotateY(Math.PI/4),s},30);function ip(s,t,e,n,i,r,o,a){s.add(O_(),tn.mat(t,e+r/2,n,0,a,0,i,r,o),D.ROOF_TILE)}function au(s,t,e,n,i){let r=new Zn(s,t,e,n),o=7+i()*3,a=6+i()*2,l=5+i()*2.5,c=i()<.5?D.HOUSE_A:D.HOUSE_B;r.box(c,o,l,a,0,l/2,0);let[h,d]=r.w(0,0);ip(s,h,l,d,o+.4,2.6,a+.4,n);for(let u=-1;u<=1;u+=2)r.box(D.STAND_C,1.3,1.2,.08,u*o*.25,l*.62,-a/2-.04);r.box(D.WOOD,1.1,2.1,.08,0,1.05,-a/2-.04),r.cyl(D.CONCRETE,.35,.35,1.4,6,o*.3,l+1,a*.15)}function ji(s,t,e,n,i,r=2.2){let o=Math.hypot(n-t,i-e),a=Math.max(1,Math.round(o/3));for(let c=0;c<=a;c++){let h=t+(n-t)*(c/a),d=e+(i-e)*(c/a);s.cyl(D.FENCE,.04,.04,r,6,h,r/2,d)}s.between(D.FENCE,.03,t,r,e,n,r,i,6);let l=Math.max(1,Math.round(o/.6));for(let c=0;c<l;c++){let h=t+(n-t)*(c/l),d=e+(i-e)*(c/l),u=t+(n-t)*((c+1)/l),f=e+(i-e)*((c+1)/l);s.line(h,.05,d,u,r,f),s.line(u,.05,f,h,r,d)}}function Qi(s,t,e,n,i,r,o){let a=new Zn(s,t,n,i);a.box(D.METAL,r+.8,o+.8,.5,0,e,.3);for(let l of[-1,1])a.cyl(D.METAL,.2,.2,e-o/2,8,l*r*.35,(e-o/2)/2,.4);return{x:t,y:e,z:n,ry:i,w:r,h:o}}function F_(s,t,e,n,i=28){let r=-t/2,o=0;for(let a=1;a<=i;a++){let l=a/i,c=-t/2+t*l,h=e*(1-Math.pow(2*l-1,2));s.between(D.GOAL_FRAME,1.3,r,o,n,c,h,n,10),r=c,o=h}for(let a=2;a<i-1;a+=2){let l=a/i,c=-t/2+t*l,h=e*(1-Math.pow(2*l-1,2));s.line(c,h,n,c,30,40),s.line(c,h,n,c,30,-40)}}function _r(s,t,e,n){let i=n.lenX,r=n.lenZ,o=[{cx:0,cz:-n.dz,ry:Math.PI,len:i},{cx:0,cz:n.dz,ry:0,len:i},{cx:n.dx,cz:0,ry:Math.PI/2,len:r},{cx:-n.dx,cz:0,ry:-Math.PI/2,len:r}],a=[];for(let l of o)a.push(Fn(s,{...n.stand,...l},t,e));if(n.corners)for(let[l,c]of[[1,1],[1,-1],[-1,1],[-1,-1]]){let h=Math.atan2(l,c),d=l*(n.dx-3),u=c*(n.dz-3);a.push(Fn(s,{...n.stand,cx:d+l*4,cz:u+c*4,ry:h,len:14,banners:!1},t,e))}return a}function sp(s,t){let{atlas:e,quality:n="high",homeName:i="HOME",final:r=!1,seed:o=7}=t,a=ep(o*31+s.length),l=n==="low"?.35:n==="medium"?.65:1,c=new tn({bob:!0,atlas:!0}),h=new tn,d={people:0,seats:[]},u=[],f=[i.toUpperCase(),"FIRST TOUCH","PLAY FAIR","KICKWELL","GRASSROOTS FC","NORTHLINE","VOLTA SPORTS","BLUEBIRD BANK"];e.reset();let g={type:s,name:yo[s].name};switch(N_(c,{surroundX:s==="training"?90:60,surroundZ:s==="training"?70:45}),D_(h),s){case"community":{ji(c,-40,-29,40,-29),ji(c,-40,29,40,29),ji(c,-40,-29,-40,29),ji(c,40,-29,40,29),Fn(c,{cx:0,cz:-31,ry:Math.PI,len:26,rows:4,rowHeight:.38,base:.4,roles:[D.WOOD,D.STAND_B],roof:!0,roofClear:2.6,density:.6*l,wallRole:D.WOOD},a,d);let p=new Zn(c,0,30.2,0);for(let v=0;v<60;v++)d.seats.push({f:p,lx:-34+a()*68,y:0,lz:a()*.8,w:1,seated:!1});xo(c,26.5);let m=new Zn(c,-47,8,Math.PI/2);m.box(D.HOUSE_B,16,4.5,8,0,2.25,0);let[M,y]=m.w(0,0);ip(c,M,4.5,y,16.4,2.4,8.4,Math.PI/2),m.box(D.WOOD,2,2.2,.1,0,1.1,-4.05),m.box(D.STAND_C,3,1.2,.1,-5,2.6,-4.05),m.box(D.STAND_C,3,1.2,.1,5,2.6,-4.05);for(let v=0;v<7;v++)au(c,-48+v*16+a()*3,46+a()*4,Math.PI,a);for(let v=0;v<6;v++)au(c,-44+v*17+a()*3,-50-a()*4,0,a);for(let v=0;v<16;v++)Nl(c,-60+a()*120,(a()<.5?1:-1)*(36+a()*6),.8+a()*.5,a);for(let v=0;v<6;v++)Nl(c,48+a()*10,-25+a()*50,.8+a()*.5,a);u.push(Qi(c,46,3.2,-16,-Math.PI/2,4,1.5));break}case"town":{Ll(c,e,f),Fn(c,{cx:0,cz:-31,ry:Math.PI,len:54,rows:9,roof:!0,roofClear:3.4,density:.5*l,banners:!0,roles:[D.STAND_C,D.STAND_A]},a,d),Fn(c,{cx:0,cz:31,ry:0,len:44,rows:5,density:.45*l,roles:[D.STAND_B,D.STAND_A]},a,d),Fn(c,{cx:42,cz:0,ry:Math.PI/2,len:30,rows:4,density:.45*l},a,d),Fn(c,{cx:-42,cz:0,ry:-Math.PI/2,len:30,rows:4,density:.4*l},a,d),xo(c);for(let[p,m]of[[-44,-34],[44,-34],[-44,34],[44,34]])tp(c,p,m,24);u.push(Qi(c,-47,7,18,Math.PI/2,6,2.2));for(let p=0;p<10;p++)Nl(c,-70+a()*140,(a()<.5?1:-1)*(52+a()*12),1+a()*.5,a);for(let p=0;p<5;p++)au(c,-60+p*28,70,Math.PI,a);break}case"regional":{Ll(c,e,f);let p={rows:12,roof:!0,roofClear:3.4,density:.72*l,banners:!0,roles:[D.STAND_A,D.STAND_B,D.STAND_C]};Fn(c,{...p,cx:0,cz:-31,ry:Math.PI,len:66},a,d),Fn(c,{...p,cx:0,cz:31,ry:0,len:66,roof:!1,rows:10},a,d),Fn(c,{...p,cx:0,cz:31,ry:0,len:60,rows:8,base:6.4,z0:9.5,roofClear:3.6,roof:!0,banners:!1},a,d),Fn(c,{...p,cx:42,cz:0,ry:Math.PI/2,len:46,rows:9,roof:!1},a,d),Fn(c,{...p,cx:-42,cz:0,ry:-Math.PI/2,len:46,rows:9,roof:!1},a,d);let m=new Zn(c,0,26.2,0);m.box(D.STAND_C,3.6,2.8,5.4,0,1.4,.6),m.cyl(D.BANNER_HOME,1.8,1.8,5.4,12,0,2.8,.6,{rx:Math.PI/2,theta:Math.PI}),m.box(D.CONCRETE,2.6,2.2,.1,0,1.1,-2.15),xo(c,27.5);for(let[M,y]of[[-40,-38],[40,-38],[-40,38],[40,38]])tp(c,M,y,30);u.push(Qi(c,46,10,0,-Math.PI/2,8,3));break}case"premier":{Ll(c,e,f);let p={rows:13,roofClear:3.6,density:.85*l,banners:!0,roles:[D.STAND_A,D.STAND_B]};_r(c,a,d,{lenX:68,lenZ:48,dx:42,dz:31,corners:!0,stand:p}),_r(c,a,d,{lenX:72,lenZ:52,dx:42,dz:31,corners:!1,stand:{...p,base:7,z0:12,rows:10,roof:!0,banners:!1,roles:[D.STAND_C,D.STAND_A]}}),_r(c,a,d,{lenX:74,lenZ:54,dx:42,dz:31,corners:!1,stand:{...p,base:12.5,z0:21,rows:7,roof:!0,roofClear:4,banners:!1,density:.7*l,roles:[D.STAND_B]}}),xo(c,27.5),u.push(Qi(c,60,17,0,-Math.PI/2,14,5.5)),u.push(Qi(c,-60,17,0,Math.PI/2,14,5.5));break}case"continental":{Ll(c,e,r?["FINAL","CONTINENTAL CUP","FIRST TOUCH",i.toUpperCase()]:f);let p={rows:14,roofClear:3.6,density:.95*l,banners:!0,roles:r?[D.GOLD,D.STAND_A]:[D.STAND_A,D.STAND_C]};_r(c,a,d,{lenX:68,lenZ:48,dx:42,dz:31,corners:!0,stand:p}),_r(c,a,d,{lenX:74,lenZ:54,dx:42,dz:31,corners:!0,stand:{...p,base:7.4,z0:12.5,rows:12,banners:r}}),_r(c,a,d,{lenX:78,lenZ:58,dx:42,dz:31,corners:!1,stand:{...p,base:14,z0:24,rows:8,roof:!0,roofClear:5,banners:!1,density:.8*l,roles:[D.STAND_B]}}),F_(c,150,72,0);for(let m=0;m<24;m++){let M=m/24*Math.PI*2,y=Math.cos(M)*80,v=Math.sin(M)*58,b=Math.cos(M+Math.PI/12)*80,S=Math.sin(M+Math.PI/12)*58;c.between(D.METAL,.5,y,30,v,b,30,S,6)}if(r)for(let m=0;m<8;m++)c.box(m%2?D.GOLD:D.BANNER_HOME,1.2,9,.1,-35+m*10,22,-52,0);xo(c,27.5),u.push(Qi(c,64,21,0,-Math.PI/2,16,6)),u.push(Qi(c,-64,21,0,Math.PI/2,16,6));break}case"training":{ji(c,-46,-36,46,-36),ji(c,-46,36,46,36),ji(c,-46,-36,-46,36),ji(c,46,-36,46,36);for(let y of[1,-1]){let v=Q.HL-.05,b=y*(ft.HW-.55),S=ft.H-.5;c.box(D.TARGET,.06,.9,.08,v,S,b-.45),c.box(D.TARGET,.06,.9,.08,v,S,b+.45),c.box(D.TARGET,.06,.08,.9,v,S-.45,b),c.box(D.TARGET,.06,.08,.9,v,S+.45,b)}for(let y=0;y<8;y++)c.cone(D.CONE,.14,.32,10,-26+y*1.8,.16,-24.5);for(let y=0;y<3;y++){let v=-20+y*8;for(let b of[0,1.6])c.cone(D.CONE,.16,.4,10,v,.2,-27+b);c.box(D.TARGET,.06,.06,1.6,v,.55,-26.2)}let p=10,m=-30;for(let[y,v,b,S]of[[p,m,p+26,m],[p,m-1,p,m-5],[p+26,m,p+26,m-5]]){let E=Math.hypot(b-y,S-v);c.plane(D.LINES,E,Dl,(y+b)/2,lu,(v+S)/2,{ry:Math.atan2(S-v,b-y)})}for(let y of[p+1,p+25])c.cyl(D.GOAL_FRAME,.04,.04,1.2,8,y,.6,m-1.8),c.cyl(D.GOAL_FRAME,.04,.04,1.2,8,y,.6,m-3.8),c.between(D.GOAL_FRAME,.04,y,1.2,m-1.8,y,1.2,m-3.8,8);let M=new Zn(c,0,48,0);M.box(D.HOUSE_A,26,6,10,0,3,0),M.box(D.ROOF,27,.4,11,0,6.2,0);for(let y=-3;y<=3;y++)M.box(D.STAND_C,2.2,1.6,.1,y*3.4,3.4,-5.05);M.box(D.WOOD,2.4,2.6,.1,0,1.3,-5.05);for(let y=0;y<18;y++)Nl(c,-80+a()*160,(a()<.5?1:-1)*(44+a()*20),.9+a()*.6,a);for(let y=0;y<3;y++)c.box(D.WOOD,3,.45,.5,-10+y*10,.22,33);for(let y=0;y<6;y++)c.sphere(D.BALL_W,.11,20+y*.3,.11,33+y%2*.25,{ws:8,hs:6});u.push(Qi(c,46,3,20,-Math.PI/2,4,1.5));break}}let x=Math.round(yo[s].crowd*l);if(x>0&&d.seats.length){let p=d.seats,m=p.reduce((y,v)=>y+v.w,0),M=Math.min(1,x/m);for(let y of p)a()<y.w*M&&(U_(y.f,y.lx,y.y,y.lz,a,y.seated),d.people++)}return g.people=d.people,g.solid=c.buildSolid(),g.edges=c.buildEdges(),g.casterSolid=h.buildSolid(),g.casterEdges=h.buildEdges(),g.screens=u,g.edgeCount=c.edgeCount,g.vertCount=c.vcount,g}function rp(s=3){let t=ep(s),e=new tn;for(let n=0;n<14;n++){let i=t()*Math.PI*2,r=260+t()*180,o=Math.cos(i)*r,a=Math.sin(i)*r,l=70+t()*70,c=3+Math.floor(t()*3);for(let h=0;h<c;h++){let d=9+t()*10;e.sphere(D.CLOUD,d,o+(h-c/2)*d*1.1,l+t()*4,a+(t()-.5)*8,{ws:10,hs:6,sy:.55})}}return{solid:e.buildSolid(),edges:e.buildEdges()}}var Ot={PELVIS:0,TORSO:1,HEAD:2,UARM_L:3,UARM_R:4,FARM_L:5,FARM_R:6,THIGH_L:7,THIGH_R:8,SHIN_L:9,SHIN_R:10,BOOT_L:11,BOOT_R:12},br=13,$e={thigh:.44,shin:.43,ankle:.08,upper:.29,fore:.27,hipW:.095,shoulderW:.19,torsoH:.5,waist:.07,neck:.08},en=(s,t,e,n=0,i=0,r=0)=>tn.mat(s,t,e,n,i,r),z_=()=>mo("torso",()=>{let s=new oi(.265,.205,.5,4,1);return s.rotateY(Math.PI/4),s.scale(1,1,.58),s.translate(0,.25,0),s},30),B_=[D.HAIR_1,D.HAIR_2,D.HAIR_1],op=[D.SKIN_1,D.SKIN_2,D.SKIN_3];function H_(s){let t=s.team,e=s.isGK;return{shirt:e?t===0?D.GK_0:D.GK_1:t===0?D.SHIRT_0:D.SHIRT_1,shorts:e?t===0?D.GKX_0:D.GKX_1:t===0?D.SHORTS_0:D.SHORTS_1,socks:e?t===0?D.GKX_0:D.GKX_1:t===0?D.SOCKS_0:D.SOCKS_1,num:t===0?D.NUM_0:D.NUM_1,skin:s.isHuman?D.SKIN_H:op[s.id*7%3],hair:s.isHuman?D.HAIR_H:B_[s.id*5%3],boot:s.isHuman?D.BOOT_H:D.BOOT,hand:e?D.GLOVE:s.isHuman?D.SKIN_H:op[s.id*7%3]}}function G_(s,t,e,n){let i=H_(t),r=l=>({part:e+l});s.add(vr(.3,.2,.19),en(0,-.01,0),i.shorts,r(Ot.PELVIS)),s.add(z_(),en(0,0,0),i.shirt,r(Ot.TORSO)),s.add(di(.045,.05,.1,8),en(0,.53,0),i.skin,r(Ot.TORSO));let o=String(t.number??0),a=o.length>1?.12:.16;for(let l=0;l<o.length;l++){let c=(l-(o.length-1)/2)*a*.95;s.add(Cl(a,.2),en(c,.3,-.113,0,Math.PI,0),i.num,{...r(Ot.TORSO),uvRect:n.digit(+o[l]),noEdges:!0})}s.add(Cl(.07,.09),en(.09,.36,.113,0,0,0),i.num,{...r(Ot.TORSO),uvRect:n.digit(+o[o.length-1]),noEdges:!0}),s.add(po(.12,14,10),en(0,.13,0),i.skin,r(Ot.HEAD)),s.add(po(.126,14,6,Math.PI*2,Math.PI*.42),en(0,.14,-.012,-.25,0,0),i.hair,{...r(Ot.HEAD),creaseOnly:!1});for(let l of[-1,1])s.add(vr(.026,.038,.012),en(l*.045,.145,.114),D.EYE,{...r(Ot.HEAD),noEdges:!0});for(let[l,c,h]of[[Ot.UARM_L,Ot.FARM_L,1],[Ot.UARM_R,Ot.FARM_R,-1]])s.add(di(.064,.058,.13,8),en(0,-.055,0),i.shirt,r(l)),s.add(di(.043,.04,.29,7),en(0,-.145,0),i.skin,{...r(l),noEdges:!1}),s.add(di(.039,.034,.26,7),en(0,-.13,0),i.skin,r(c)),s.add(po(t.isGK?.062:.05,8,6),en(0,-.285,.005),i.hand,r(c));for(let[l,c,h]of[[Ot.THIGH_L,Ot.SHIN_L,Ot.BOOT_L],[Ot.THIGH_R,Ot.SHIN_R,Ot.BOOT_R]])s.add(di(.078,.07,.2,8),en(0,-.08,0),i.shorts,r(l)),s.add(di(.062,.052,.44,8),en(0,-.22,0),i.skin,r(l)),s.add(di(.054,.045,.42,8),en(0,-.21,0),i.socks,r(c)),s.add(vr(.1,.075,.26),en(0,-.045,.06),i.boot,r(h)),s.add(vr(.104,.02,.27),en(0,-.08,.06),D.INK,{...r(h),noEdges:!0})}function V_(s,t){let e=new Hi(.11,3),n=new Hi(1,0).toNonIndexed(),i=[],r=n.attributes.position;for(let c=0;c<r.count;c++){let h=new L(r.getX(c),r.getY(c),r.getZ(c)).normalize();i.some(d=>d.distanceTo(h)<.001)||i.push(h)}let o=mo("ball",()=>e,70),a=[],l=new L;for(let c=0;c<o.positions.length;c+=9){l.set(o.positions[c]+o.positions[c+3]+o.positions[c+6],o.positions[c+1]+o.positions[c+4]+o.positions[c+7],o.positions[c+2]+o.positions[c+5]+o.positions[c+8]).normalize();let h=-1;for(let u of i)h=Math.max(h,u.dot(l));let d=h>Math.cos(.36)?D.BALL_B:D.BALL_W;a.push(d,d,d)}s.add(o,new oe,D.BALL_W,{part:t,roles:a})}var kl=class s{constructor(t,e){this.players=t,this.rows=t.length*br+1,this.ballRow=t.length*br;let n=Math.max(1,this.rows);this.data=new Float32Array(16*n),this.texture=new xs(this.data,4,n,bn,_n),this.texture.minFilter=ze,this.texture.magFilter=ze,this.texture.needsUpdate=!0,$t.uParts.value=this.texture;let i=new tn({parts:!0,atlas:!0});t.forEach((r,o)=>G_(i,r,o*br,e)),V_(i,this.ballRow),this.solidGeo=i.buildSolid(),this.edgeGeo=i.buildEdges(),this.mesh=new ie(this.solidGeo,s.solidMaterial()),this.mesh.frustumCulled=!1,this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.mesh.customDepthMaterial=s.depthMaterial(),this.edges=new ie(this.edgeGeo,s.edgeMaterial()),this.edges.frustumCulled=!1,this.edges.renderOrder=1;for(let r=0;r<this.rows;r++)this.setIdentity(r)}static solidMaterial(){return s._sm||(s._sm=ui({parts:!0,atlas:!0}))}static edgeMaterial(){return s._em||(s._em=Kn({parts:!0}))}static depthMaterial(){return s._dm||(s._dm=Xf())}setIdentity(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=this.data[e+15]=1}setMatrix(t,e){this.data.set(e.elements,t*16)}hide(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=1e-4,this.data[e+13]=-50,this.data[e+15]=1}commit(){this.texture.needsUpdate=!0}dispose(){this.solidGeo.dispose(),this.edgeGeo.dispose(),this.texture.dispose()}};var ot=class s{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}clone(){return new s(this.x,this.y,this.z)}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}addScaled(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}scale(t){return this.x*=t,this.y*=t,this.z*=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}len(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}lenSq(){return this.x*this.x+this.y*this.y+this.z*this.z}lenXZ(){return Math.sqrt(this.x*this.x+this.z*this.z)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}dotXZ(t){return this.x*t.x+this.z*t.z}dist(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return Math.sqrt(e*e+n*n+i*i)}distXZ(t){let e=this.x-t.x,n=this.z-t.z;return Math.sqrt(e*e+n*n)}normalize(){let t=this.len();return t>1e-9&&(this.x/=t,this.y/=t,this.z/=t),this}flatNormalize(){this.y=0;let t=Math.sqrt(this.x*this.x+this.z*this.z);return t>1e-9&&(this.x/=t,this.z/=t),this}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}isFinite(){return Number.isFinite(this.x)&&Number.isFinite(this.y)&&Number.isFinite(this.z)}},ht=(s,t,e)=>s<t?t:s>e?e:s,vo=(s,t,e)=>s+(t-s)*e;var ap=Math.PI*2;function lp(s){return s=(s+Math.PI)%ap,s<0&&(s+=ap),s-Math.PI}var ts=(s,t)=>lp(t-s),Ft=(s,t)=>Math.atan2(s,t);function cp(s,t,e){let n=ts(s,t);return Math.abs(n)<=e?t:lp(s+Math.sign(n)*e)}function Jn(s,t,e,n,i,r){let o=i-e,a=r-n,l=o*o+a*a,c=l>1e-9?((s-e)*o+(t-n)*a)/l:0;c=ht(c,0,1);let h=e+o*c,d=n+a*c,u=s-h,f=t-d;return{d:Math.sqrt(u*u+f*f),t:c}}function Mr(s){return s<1.5?1+s*.17:s<5?1.25+(s-1.5)*.4:2.65+(s-5)*.27}function Sr(s){return ht(.64/s,.18,.6)}var W_=1;function X_(s=50){return{pace:s,stamina:s,control:s,passing:s,finishing:s,tackling:s}}var Ul=class{constructor(t={}){this.id=W_++,this.team=t.team??0,this.slot=t.slot??0,this.role=t.role||"CM",this.side=t.side??0,this.number=t.number??7,this.name=t.name||"Player",this.isHuman=!!t.isHuman,this.isGK=this.role==="GK",this.attrs=Object.assign(X_(50),t.attrs||{}),this.keeping=t.keeping??50,this.foot=t.foot||"R",this.look=t.look||null,this.pos=new ot,this.prevPos=new ot,this.vel=new ot,this.yaw=0,this.prevYaw=0,this.headYaw=0,this.desired=new ot,this.sprint=!1,this.faceYaw=null,this.stamina=1,this.gait=0,this.prevGait=0,this.action=null,this.slideReadyAt=0,this.tackleReadyAt=0,this.noCaptureUntil=0,this.stumbleUntil=0,this.downUntil=0,this.touch=null,this.celebrate=0,this.hold=null,this.requestUntil=0,this.requestReadyAt=0,this.ackUntil=0,this.lastKickAt=-10,this.ai={state:"shape",target:new ot,think:0,sprint:!1,stuckT:0,lastDist:0}}get speed(){return Math.sqrt(this.vel.x*this.vel.x+this.vel.z*this.vel.z)}jogSpeed(){return 4.9+(this.attrs.pace-50)*.018}sprintSpeed(){let t=this.stamina<.35?(.35-this.stamina)/.35:0;return(7+(this.attrs.pace-50)*.03)*(1-.12*t)}maxSpeed(t,e){let n=t&&this.stamina>.02?this.sprintSpeed():this.jogSpeed();return e&&(n*=t?.9:.93),n}forwardX(){return Math.sin(this.yaw)}forwardZ(){return Math.cos(this.yaw)}};function up(s){s.action=null,s.vel.set(0,0,0),s.desired.set(0,0,0),s.stumbleUntil=0,s.downUntil=0,s.celebrate=0,s.hold=null,s.requestUntil=0,s.prevPos.copy(s.pos),s.prevYaw=s.yaw}function dp(s,t,e,n=1/0,i=!1){s.prevPos.copy(s.pos),s.prevYaw=s.yaw,s.prevGait=s.gait;let r=s.action;if(r&&r.type==="slide"&&r.sliding){s.pos.addScaled(s.vel,t),hp(s,t,!0);return}if(r&&r.type==="dive"){s.pos.addScaled(s.vel,t),s.pos.y=0;return}let o=n;e<s.downUntil?o=0:e<s.stumbleUntil&&(o=Math.min(o,1.6));let a=s.desired,l=Math.sqrt(a.x*a.x+a.z*a.z),c=Math.min(s.maxSpeed(s.sprint,i),o),h=a.x,d=a.z;l>c&&(h*=c/l,d*=c/l,l=c);let u=s.vel.x,f=s.vel.z,g=h-u,x=d-f,p=Math.sqrt(g*g+x*x),m=12.5+s.attrs.pace*.04,y=(h*u+d*f<u*u+f*f-.01?24:m)*t;p>y&&(g*=y/p,x*=y/p),s.vel.x+=g,s.vel.z+=x,s.vel.y=0,s.pos.x+=s.vel.x*t,s.pos.z+=s.vel.z*t,s.pos.y=0;let v=s.faceYaw,b=s.speed;v==null&&(v=b>.4?Ft(s.vel.x,s.vel.z):s.yaw);let S=(s.isHuman?14:9)*t;s.yaw=cp(s.yaw,v,S);let E=1.35-s.attrs.stamina*.007;s.sprint&&b>s.jogSpeed()*1.03?s.stamina-=.068*E*t:b<2.2?s.stamina+=.05*t:s.stamina+=.014*t,s.stamina=ht(s.stamina,0,1),hp(s,t,!1)}function hp(s,t,e){let n=e?0:s.speed;n>.05&&(s.gait+=n*t/Mr(n))}function fp(s){let t=s.length;for(let e=0;e<t;e++){let n=s[e];for(let i=e+1;i<t;i++){let r=s[i],o=r.pos.x-n.pos.x,a=r.pos.z-n.pos.z,l=o*o+a*a,c=.62;if(l<c*c&&l>1e-8){let h=Math.sqrt(l),d=(c-h)*.5,u=o/h,f=a/h,g=n.action&&n.action.type==="slide"?.3:1,x=r.action&&r.action.type==="slide"?.3:1,p=g+x;n.pos.x-=u*d*2*(g/p),n.pos.z-=f*d*2*(g/p),r.pos.x+=u*d*2*(x/p),r.pos.z+=f*d*2*(x/p)}else l<=1e-8&&(r.pos.x+=.05)}}}var Jt=fe,es=class{constructor(){this.pos=new ot(0,Jt,0),this.prevPos=new ot(0,Jt,0),this.vel=new ot,this.spin=new ot,this.sideSpin=0,this.q=[0,0,0,1],this.prevQ=[0,0,0,1],this.state="dead",this.owner=null,this.lastTouch=null,this.lastTouchTime=-10,this.lastKick=null,this.lastValid=new ot(0,Jt,0),this.crossing=[null,null],this.net=[null,null],this.version=0,this.onGround=!0}place(t,e,n=Jt){this.net[0]=this.net[1]=null,this.pos.set(t,n,e),this.prevPos.copy(this.pos),this.vel.set(0,0,0),this.spin.set(0,0,0),this.sideSpin=0,this.crossing[0]=this.crossing[1]=null,this.version++}setVelocity(t){this.vel.copy(t),this.version++}get speed(){return this.vel.len()}get airborne(){return this.pos.y>Jt+.04||Math.abs(this.vel.y)>.3}};function uu(s,t=0){let e=Mn.ROLL_A0,n=Mn.ROLL_C,i=Math.sqrt(n/e),r=Math.sqrt(e*n);return(Math.atan(s*i)-Math.atan(t*i))/r}function zl(s,t){let e=Mn.ROLL_A0,n=Mn.ROLL_C,i=((e+n*t*t)*Math.exp(2*n*s)-e)/n;return Math.sqrt(Math.max(0,i))}var $w=new ot;function gp(s,t){let e=s.vel,n=s.pos,i=n.y<=Jt+.002&&Math.abs(e.y)<.05;if(s.onGround=i,i){n.y=Jt,e.y=0;let r=Math.sqrt(e.x*e.x+e.z*e.z);if(r>0){let o=(Mn.ROLL_A0+Mn.ROLL_C*r*r)*t,a=r-o;a<.035?(e.x=0,e.z=0):(e.x*=a/r,e.z*=a/r)}s.spin.x=e.z/Jt,s.spin.z=-e.x/Jt,s.spin.y*=.96,s.sideSpin*=.9}else{e.y-=Pl*t;let r=e.len(),o=Mn.AIR_DRAG*r*t;if(e.x-=e.x*o,e.y-=e.y*o,e.z-=e.z*o,s.sideSpin!==0){let a=Mn.MAGNUS*s.sideSpin*t,l=e.x,c=e.z;e.x+=a*c,e.z-=a*l,s.sideSpin*=1-.3*t}s.spin.x*=1-.05*t,s.spin.y*=1-.05*t,s.spin.z*=1-.05*t}n.x+=e.x*t,n.y+=e.y*t,n.z+=e.z*t}function xp(s,t){let e=s.pos,n=s.vel;if(e.y<Jt)if(e.y=Jt,n.y<-.9){let i=-n.y;n.y=i*Mn.BOUNCE*(i>7?.92:1),n.x*=Mn.BOUNCE_FRICTION,n.z*=Mn.BOUNCE_FRICTION,s.sideSpin*=.6,t&&t.onBounce&&t.onBounce(s,i)}else n.y=0}function pp(s,t,e,n,i,r,o,a,l){let c=s.pos,h=s.vel;if(c.y<n-Jt||c.y>i+Jt)return!1;let d=c.x-t,u=c.z-e,f=ht(c.y,n,i),g=c.y-f,x=d*d+u*u+g*g,p=Jt+r;if(x>=p*p||x<1e-10)return!1;let m=Math.sqrt(x),M=d/m,y=g/m,v=u/m,b=p-m;c.x+=M*b,c.y+=y*b,c.z+=v*b;let S=h.x*M+h.y*y+h.z*v;return S<0&&(h.x-=(1+o)*S*M,h.y-=(1+o)*S*y,h.z-=(1+o)*S*v,h.x*=.92,h.z*=.92,h.y*=.95,s.sideSpin*=.3,s.version++,a&&a.onFrame&&-S>1.2&&a.onFrame(s,-S,l)),!0}function $_(s,t,e,n,i,r,o){let a=s.pos,l=s.vel,c=ht(a.z,-n,n),h=a.x-t,d=a.y-e,u=a.z-c,f=h*h+d*d+u*u,g=Jt+i;if(f>=g*g||f<1e-10)return!1;let x=Math.sqrt(f),p=h/x,m=d/x,M=u/x,y=g-x;a.x+=p*y,a.y+=m*y,a.z+=M*y;let v=l.x*p+l.y*m+l.z*M;return v<0&&(l.x-=(1+r)*v*p,l.y-=(1+r)*v*m,l.z-=(1+r)*v*M,l.x*=.93,l.z*=.93,s.version++,o&&o.onFrame&&-v>1.2&&o.onFrame(s,-v,"bar")),!0}function Ol(s){let t=ht(s/ft.H,0,1);return Q.HL+ft.DEPTH+(ft.TOP_DEPTH-ft.DEPTH)*t}var cu=.42;function hu(s,t,e,n,i,r,o){let a=s.vel,l=a.x*t+a.y*e+a.z*n;if(l<0){let d=Math.min(1,(35+900*i)*r),u=-l*d;a.x+=t*u,a.y+=e*u,a.z+=n*u}else{let d=40*i*r;if(a.x+=t*d,a.y+=e*d,a.z+=n*d,l=a.x*t+a.y*e+a.z*n,l>1.2){let u=l-1.2;a.x-=t*u,a.y-=e*u,a.z-=n*u}}let c=1-Math.min(.5,4*r);if(a.x*=c,a.z*=c,i>cu){let d=i-cu;s.pos.x+=t*d,s.pos.y+=e*d,s.pos.z+=n*d}let h=s.net[o]||(s.net[o]={x:0,y:0,z:0,depth:0,nx:t,ny:e,nz:n,count:0});h.count++,i>=h.depth&&(h.x=s.pos.x,h.y=s.pos.y,h.z=s.pos.z,h.depth=Math.min(i,cu),h.nx=t,h.ny=e,h.nz=n),s.version++}function Fl(s,t,e,n,i){let r=s.pos,o=s.vel,a=Q.HL,l=ft.HW,c=ft.H,h=ft.POST_R,d=r.x*t;if(d<a-1.5||d>a+ft.DEPTH+1)return;let u=t*(a-h);if(pp(s,u,l+h,0,c+h,h,.62,i,"post"),pp(s,u,-(l+h),0,c+h,h,.62,i,"post"),$_(s,u,c+h,l+h,h,.6,i),d<a-Jt)return;let f=Ol(r.y),g=s.crossing[e];if(g&&g.inMouth&&d>a||Math.abs(r.z)<l&&r.y<c&&d<f){let p=f-d;if(p<Jt){let M=(ft.TOP_DEPTH-ft.DEPTH)/ft.H,y=-t,v=M,b=Math.hypot(1,M);y/=b,v/=b,hu(s,y,v,0,(Jt-p)/b,n,e)}if(l-Math.abs(r.z)<Jt){let M=Math.sign(r.z)||1;hu(s,0,0,-M,Jt-(l-Math.abs(r.z)),n,e)}c-r.y<Jt&&d>a&&hu(s,0,-1,0,Jt-(c-r.y),n,e);let m=Ol(Math.min(r.y,c))+.45;d>m&&(r.x=t*m,o.x*t>0&&(o.x*=-.1)),Math.abs(r.z)>l+.45&&(r.z=Math.sign(r.z)*(l+.45),o.z*=-.1),r.y>c+.45&&(r.y=c+.45,o.y>0&&(o.y*=-.1))}else if(d>a-Jt&&d<f+Jt&&r.y<c+Jt){let p=Math.abs(r.z)-l;if(p>-Jt&&p<Jt&&d>a){let m=Math.sign(r.z)||1,M=Jt-p;r.z+=m*M,o.z*m<0&&(o.z=-o.z*.15,o.x*=.7,o.y*=.8,s.version++)}else if(r.y>c-Jt&&Math.abs(r.z)<l&&d>a&&d<f){let m=Jt-(r.y-c);m>0&&(r.y+=m,o.y<0&&(o.y=-o.y*.2,o.x*=.8,o.z*=.8,s.version++))}else if(d>f-Jt&&d<f+Jt&&Math.abs(r.z)<l&&r.y<c){let m=f+Jt-d;m>0&&(r.x+=t*m,o.x*t<0&&(o.x=-o.x*.15,s.version++))}}}function q_(s){let t=s.pos,e=s.vel;t.x>hn.HL-Jt&&(t.x=hn.HL-Jt,e.x>0&&(e.x=-e.x*.3)),t.x<-hn.HL+Jt&&(t.x=-hn.HL+Jt,e.x<0&&(e.x=-e.x*.3)),t.z>hn.HW-Jt&&(t.z=hn.HW-Jt,e.z>0&&(e.z=-e.z*.3)),t.z<-hn.HW+Jt&&(t.z=-hn.HW+Jt,e.z<0&&(e.z=-e.z*.3)),t.y>40&&(t.y=40,e.y>0&&(e.y=0))}function Y_(s,t){for(let e=0;e<2;e++){let n=e===0?1:-1,i=t*n,r=s.pos.x*n;i<Q.HL&&r>=Q.HL?s.crossing[e]={z:s.pos.z,y:s.pos.y,inMouth:Math.abs(s.pos.z)<ft.HW&&s.pos.y<ft.H}:r<Q.HL-.5&&(s.crossing[e]=null)}}function yp(s,t,e){if(s.prevPos.copy(s.pos),s.prevQ[0]=s.q[0],s.prevQ[1]=s.q[1],s.prevQ[2]=s.q[2],s.prevQ[3]=s.q[3],s.state==="held"||s.state==="dead"){mp(s,t);return}let n=s.vel.len(),i=Math.min(10,Math.max(1,Math.ceil(n*t/.06))),r=t/i;for(let o=0;o<i;o++){let a=s.pos.x;gp(s,r),xp(s,e),Fl(s,1,0,r,e),Fl(s,-1,1,r,e),q_(s),Y_(s,a),e&&e.bodies&&e.bodies(s,r)}!s.pos.isFinite()||!s.vel.isFinite()?(s.pos.copy(s.lastValid),s.vel.set(0,0,0),s.version++):s.lastValid.copy(s.pos),s.pos.y>Jt+.03||s.vel.y>.2?s.state==="free"&&(s.state="air"):s.state==="air"&&(s.state="free"),mp(s,t)}function mp(s,t){let e=s.spin,n=s.q,i=.5*t*e.x,r=.5*t*e.y,o=.5*t*e.z,a=n[0],l=n[1],c=n[2],h=n[3];n[0]=a+(i*h+r*c-o*l),n[1]=l+(r*h+o*a-i*c),n[2]=c+(o*h+i*l-r*a),n[3]=h-(i*a+r*l+o*c);let d=Math.hypot(n[0],n[1],n[2],n[3])||1;n[0]/=d,n[1]/=d,n[2]/=d,n[3]/=d}var wr=class{constructor(t=200,e=1/60){this.steps=t,this.step=e,this.pts=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.count=0,this.t0=0,this.ghost=new es}compute(t,e){let n=this.ghost;n.pos.copy(t.pos),n.vel.copy(t.vel),n.sideSpin=t.sideSpin,n.state="free",n.spin.set(0,0,0),n.net[0]=n.net[1]=null,this.t0=e;let i=2,r=this.step/i,o=0;for(;o<this.steps;o++){this.pts[o*3]=n.pos.x,this.pts[o*3+1]=n.pos.y,this.pts[o*3+2]=n.pos.z,this.vel[o*3]=n.vel.x,this.vel[o*3+1]=n.vel.y,this.vel[o*3+2]=n.vel.z;for(let a=0;a<i;a++)gp(n,r),xp(n,null),Fl(n,1,0,r,null),Fl(n,-1,1,r,null);if(n.vel.x===0&&n.vel.z===0&&n.pos.y<=Jt+.001){o++;break}}return this.count=o,this}at(t,e){let n=t/this.step;n<=0&&(n=0);let i=Math.floor(n);if(i>=this.count-1){let l=(this.count-1)*3;return e.set(this.pts[l],this.pts[l+1],this.pts[l+2])}let r=n-i,o=i*3,a=o+3;return e.set(this.pts[o]+(this.pts[a]-this.pts[o])*r,this.pts[o+1]+(this.pts[a+1]-this.pts[o+1])*r,this.pts[o+2]+(this.pts[a+2]-this.pts[o+2])*r)}velAt(t,e){let n=Math.floor(Math.max(0,t)/this.step);return n>this.count-1&&(n=this.count-1),e.set(this.vel[n*3],this.vel[n*3+1],this.vel[n*3+2])}get duration(){return(this.count-1)*this.step}};var _o=new ot,eT=new ot;function du(s){return ht(6.2+s*.15,6.5,11.5)}function fi(s,t,e,n,i,r,o=12,a=null){let l=n-t,c=i-e,h=Math.hypot(l,c);if(h<.01)return 1;let d=l/h,u=c/h,f=0,g=s.players;for(let x=0;x<g.length;x++){let p=g[x];if(p.team===r||p===a||s.time<p.downUntil)continue;let m=p.pos.x-t,M=p.pos.z-e,y=m*d+M*u,v=Math.abs(m*u-M*d);if(y>-.4&&y<.9&&v<.9){f=Math.max(f,.9);continue}if(y<.6||y>h+1.2)continue;let b=p.isGK?1.5:.95,S=Math.min(y,h)/o,E=Math.max(0,v-b)/6.2+.22,_=ht((S-E+.3)/.55,0,1);_>f&&(f=_)}return 1-f}function Tr(s,t,e,n=.75,i=0){e.set(t.pos.x,0,t.pos.z);let r=0;for(let o=0;o<3;o++){let a=Math.hypot(e.x-s.x,e.z-s.z),l=du(a)+i,c=Math.min(26,zl(a,l));r=uu(c,l),e.x=t.pos.x+t.vel.x*r*n,e.z=t.pos.z+t.vel.z*r*n}return Ai(e,.8),r}function Ai(s,t=.5){return s.x=ht(s.x,-Q.HL+t,Q.HL-t),s.z=ht(s.z,-Q.HW+t,Q.HW-t),s}function _p(s,t,e,n,i=.72){let r=vp(s,t,e,n,i);return!r&&i>=1&&(r=vp(s,t,e,null,1.6)),r}function vp(s,t,e,n,i){let r=null,o=-1/0,a=-1/0;for(let l of s.players){if(l===t||l.team!==t.team||s.time<l.downUntil)continue;Tr(t.pos,l,_o,.6);let c=_o.x-t.pos.x,h=_o.z-t.pos.z,d=Math.hypot(c,h);if(d<2.2||d>48)continue;let u=Math.abs(ts(e,Math.atan2(c,h)));if(u>i)continue;let f=1-u/i,g=d<5?.55:d<26?1-Math.abs(d-14)/30:Math.max(0,.6-(d-26)/30),x=fi(s,t.pos.x,t.pos.z,_o.x,_o.z,t.team,12),p=f*f*1.8+g*.45+x*(i>.9?1.1:.8);l.isGK&&(p-=.7),l===n&&(p+=.3,a=p),p>o&&(o=p,r=l)}return n&&r!==n&&a>-1/0&&o<a+.12&&(r=n),!r||o<.35?null:r}function Er(s,t,e,n){let i=t.x-s.x,r=t.z-s.z,o=Math.hypot(i,r),a=ht(zl(o,e),4,27);return n.set(i/o*a,0,r/o*a),a}function bp(s,t){let e=1.5,n=12;for(let i=0;i<24;i++){let r=(e+n)/2;uu(zl(s,r),r)>t?e=r:n=r}return(e+n)/2}var Ei=new es;function Mp(s,t,e,n,i,r,o,a,l){Ei.pos.set(s,t,e),Ei.vel.set(n,i,r),Ei.sideSpin=o;let c=1/120,h=0;for(;h<a;){let d=Ei.vel;d.y-=Pl*c;let u=d.len(),f=Mn.AIR_DRAG*u*c;if(d.x-=d.x*f,d.y-=d.y*f,d.z-=d.z*f,Ei.pos.addScaled(d,c),h+=c,l&&l(Ei.pos,h)||Ei.pos.y<fe)return h}return h}function Hl(s,t,e,n,i){let r=e.x-s.x,o=e.z-s.z,a=Math.hypot(r,o),l=r/a,c=o/a,h=Math.cos(n),d=Math.sin(n),u=3,f=40;for(let x=0;x<22;x++){let p=(u+f)/2;Mp(s.x,t,s.z,l*h*p,d*p,c*h*p,0,6,null),Math.hypot(Ei.pos.x-s.x,Ei.pos.z-s.z)<a?u=p:f=p}let g=(u+f)/2;return i.set(l*h*g,d*g,c*h*g),g}function Sp(s,t,e,n,i,r,o){let a=n-s,l=r-e,c=Math.hypot(a,l),h=a/c,d=l/c,u=-.25,f=.75;for(let g=0;g<20;g++){let x=(u+f)/2,p=-100;Mp(s,t,e,h*Math.cos(x)*o,Math.sin(x)*o,d*Math.cos(x)*o,0,3,m=>(m.x-s)*h+(m.z-e)*d>=c?(p=m.y,!0):!1),p===-100&&(p=-1),p<i?u=x:f=x}return(u+f)/2}var K_=new wr(240,1/60),Bl=new es;function wp(s,t,e,n){Bl.pos.copy(s),Bl.vel.copy(t),Bl.sideSpin=e||0;let i=K_.compute(Bl,0),r=i.pts;for(let o=1;o<i.count;o++){let a=r[(o-1)*3]*n,l=r[o*3]*n;if(a<Q.HL&&l>=Q.HL){let c=(Q.HL-a)/(l-a||1),h=r[(o-1)*3+2]+(r[o*3+2]-r[(o-1)*3+2])*c,d=r[(o-1)*3+1]+(r[o*3+1]-r[(o-1)*3+1])*c;return Math.abs(h)<ft.HW&&d<ft.H}}return!1}function fu(s,t,e){let n=e*Q.HL,i=Math.atan2(ft.HW-t,Math.abs(n-s)),r=Math.atan2(-ft.HW-t,Math.abs(n-s));return Math.abs(i-r)}var Z_={pass:.11,through:.12,shot:.085,cross:.17,lob:.15,clear:.13,throw:.32,gkthrow:.32,gkkick:.36,touch:.05},J_={shot:.34,pass:.26,through:.26,cross:.3,lob:.3,clear:.3,throw:.35,gkthrow:.35,gkkick:.45},Xl=new Set(["pass","through","cross","lob","throw","gkthrow","gkkick"]),Gl=new ot,aT=new ot,lT=new ot;function Tp(s,t,e=0){let n=t.pos.x-s.pos.x,i=t.pos.z-s.pos.z,r=Math.sqrt(n*n+i*i);return!(r>1.1+e||t.pos.y>1||r>.8&&n*Math.sin(s.yaw)+i*Math.cos(s.yaw)<-.2)}function pu(s,t,e=.7){let n=s.ball;if(Tp(t,n))return 0;if(n.state==="held"||n.state==="dead"||n.owner&&n.owner!==t)return null;let i=s.traj,r=1/60;for(let o=r;o<=e;o+=r){i.at(o+(s.time-i.t0),Gl);let a=t.pos.x+t.vel.x*o*.8,l=t.pos.z+t.vel.z*o*.8;if(Math.hypot(Gl.x-a,Gl.z-l)<.95&&Gl.y<.95)return o}return null}function j_(s,t){let e=t.pos.x-s.pos.x,n=t.pos.z-s.pos.z,i=e*Math.cos(s.yaw)-n*Math.sin(s.yaw);return i>.25?"L":i<-.25?"R":s.foot||"R"}function ns(s,t){if(s.time<t.downUntil)return!1;let e=t.action;return e?e.type==="kick"&&e.contacted?e.t>e.contactT+.1:e.type==="tackle"?e.t>.4:!1:!0}function le(s,t,e,n={}){let i=n.minContact??Z_[e]??.12,r={type:"kick",kind:e,t:0,charging:!!n.charging,holdT:0,charge:n.charge??0,minContact:i,deadline:n.deadline??i+.75,contacted:!1,contactT:0,follow:J_[e]??.28,target:n.target||null,point:n.point?new ot().copy(n.point):null,aimYaw:n.aimYaw??t.yaw,aimPitch:n.aimPitch??0,power:n.power??.6,elev:n.elev??null,firstTime:!!n.firstTime,restart:n.restart||null,foot:j_(t,s.ball),eta:i,fromHands:e==="throw"||e==="gkthrow"||e==="gkkick",ai:!!n.ai,owned:s.ball.owner===t};return t.action=r,r}function Es(s){if(!s||!s.charging)return;s.charging=!1;let t=s.kind==="shot"?.085:.02;s.minContact=Math.max(s.minContact,s.t+t),s.deadline=s.minContact+.6}function Ep(s){let t=s.action;if(!t)return 1/0;let e=s.jogSpeed();return t.type==="kick"?t.fromHands?t.contacted?e*.5:1.2:t.contacted?e*.85:t.kind==="shot"&&t.charging?e*.7:t.inReach?e*.85:1/0:t.type==="tackle"?t.t<.32?t.lunge||4.2:2.2:t.type==="slide"?t.sliding?1/0:.4:(t.type==="celebrate",1/0)}function Q_(s,t,e){return e.kind==="shot"?e.aimYaw:e.target?Ft(e.target.pos.x-t.pos.x,e.target.pos.z-t.pos.z):e.point?Ft(e.point.x-t.pos.x,e.point.z-t.pos.z):e.aimYaw}function Ap(s,t,e){let n=t.action;if(n)switch(n.t+=e,n.type){case"kick":tb(s,t,n,e);break;case"tackle":rb(s,t,n,e);break;case"slide":ob(s,t,n,e);break;case"celebrate":n.t>n.dur&&(t.action=null);break;case"stumble":n.t>n.dur&&(t.action=null);break;case"dive":break;default:n.dur&&n.t>n.dur&&(t.action=null)}}function tb(s,t,e,n){let i=s.ball;if(e.charging&&(e.holdT+=n,e.kind==="shot"?(e.charge=Math.min(1,e.holdT/.65),e.holdT>=.85&&Es(e)):(e.charge=Math.min(1,Math.max(0,e.holdT-.1)/.3),e.holdT>=.4&&Es(e))),e.contacted)e.t>e.contactT+e.follow&&(t.action=null,t.faceYaw=null);else{if(t.faceYaw=Q_(s,t,e),e.owned&&!e.restart&&i.owner!==t&&i.lastTouch!==t){t.action=null,t.faceYaw=null;return}let r=!i.owner||i.owner===t,o=e.restart?!0:e.fromHands?i.state==="held"&&i.owner===t:i.state!=="held"&&i.state!=="dead",a=e.fromHands||e.restart?!0:Tp(t,i);if(e.inReach=a,e.charging||(e.eta=Math.max(0,e.minContact-e.t)),!e.charging&&e.t>=e.minContact&&r&&o&&a){e.contacted=!0,e.contactT=e.t,nb(s,t,e);return}if(!e.fromHands&&!e.restart&&r&&o&&!e.charging){let l=i.pos.x+i.vel.x*.15,c=i.pos.z+i.vel.z*.15,h=t.pos.x-l,d=t.pos.z-c,u=Math.hypot(h,d)||1;h=h/u*.7-Math.sin(t.faceYaw)*.3,d=d/u*.7-Math.cos(t.faceYaw)*.3;let f=Math.hypot(h,d)||1,g=l+h/f*.45,x=c+d/f*.45,p=g-t.pos.x,m=x-t.pos.z,M=Math.hypot(p,m);if(M<4){let y=Math.min(8,M*6)/(M||1);t.desired.x=p*y+i.vel.x,t.desired.z=m*y+i.vel.z}}!e.charging&&e.t>e.deadline&&(e.contacted=!0,e.missed=!0,e.contactT=e.t,s.events.emit("whiff",{player:t,kind:e.kind,t:s.time}))}}function Vl(s){return s.gauss()}function eb(s,t){let e=99;for(let n of s.players){if(n.team===t.team)continue;let i=n.pos.distXZ(t.pos);i<e&&(e=i)}return ht((2.4-e)/2.4,0,1)}function Wl(s,t){let e=Math.cos(t),n=Math.sin(t),i=s.x*e+s.z*n,r=-s.x*n+s.z*e;return s.x=i,s.z=r,s}function nb(s,t,e){let n=s.ball,i=s.rng,r=new ot,o=0,a=e.point?e.point.clone():null,l=s.attackDir(t.team),c=t.isHuman,h=c?s.assist:null,d=!c&&s.isOpp(t)?s.aiParams[t.team]:null,u=ht(t.speed/7.5,0,1),f=eb(s,t),g=!1,x=e.target,p=n.pos;e.kind==="throw"?n.pos.set(t.pos.x+Math.sin(t.yaw)*.25,2.05,t.pos.z+Math.cos(t.yaw)*.25):e.kind==="gkthrow"?n.pos.set(t.pos.x+Math.sin(t.yaw)*.6,.35,t.pos.z+Math.cos(t.yaw)*.6):e.kind==="gkkick"&&n.pos.set(t.pos.x+Math.sin(t.yaw)*.55,.7,t.pos.z+Math.cos(t.yaw)*.55),p=n.pos;let m=E=>{let _;return E==="shot"?_=(.011+(100-t.attrs.finishing)*45e-5)*(1+.45*u+.6*f):_=(.004+(100-t.attrs.passing)*22e-5)*(1+.35*u+.45*f),c&&h&&(_*=E==="shot"?h.shotError:h.passError),d&&(_*=E==="shot"?d.shotErr:d.passErr),e.foot!==t.foot&&(_*=1.12),_};switch(e.kind){case"pass":case"gkthrow":{if(x){a=new ot,Tr(p,x,a,x.isGK?0:.75,e.charge*3);let E=p.distXZ(a),_=x.isGK?3.5:du(E)+e.charge*4.5;c&&h.autoLob&&e.kind==="pass"&&!e.restart&&E>7&&!x.isGK&&fi(s,p.x,p.z,a.x,a.z,t.team,12)<.45?(Hl(p,p.y,a,ht(.42+E*.006,.42,.62),r),e.lofted=!0):Er(p,a,_,r)}else{let E=(e.kind==="gkthrow"?18:11)+e.charge*18;a=a||new ot(p.x+Math.sin(e.aimYaw)*E,0,p.z+Math.cos(e.aimYaw)*E),Ai(a,.6),Er(p,a,2.4,r)}Wl(r,Vl(i)*m("pass")),e.kind==="gkthrow"&&(r.y=-.5);break}case"through":{if(x){a=ib(s,x,a);let E=a.distXZ(x.pos)/x.sprintSpeed()+.28,_=p.distXZ(a);if(fi(s,p.x,p.z,a.x,a.z,t.team,11)<.4&&_>12)Hl(p,p.y,a,.62,r);else{let C=ht(bp(_,E),2.6,10);Er(p,a,C,r)}}else a=new ot(p.x+Math.sin(e.aimYaw)*17,0,p.z+Math.cos(e.aimYaw)*17),Ai(a,1),Er(p,a,3.2,r);Wl(r,Vl(i)*m("pass"));break}case"cross":case"lob":case"clear":case"gkkick":case"throw":{!a&&x&&(a=new ot,Tr(p,x,a,.6)),a||(a=new ot(p.x+Math.sin(e.aimYaw)*25,0,p.z+Math.cos(e.aimYaw)*25)),Ai(a,.5);let E=e.elev??(e.kind==="cross"?.4:e.kind==="clear"?.6:e.kind==="throw"?.42:e.kind==="gkkick"?.55:.5),_=Hl(p,p.y,a,E,r);e.kind==="throw"&&_>15.5&&r.scale(15.5/_),Wl(r,Vl(i)*m("pass")*1.2),r.y*=1+Vl(i)*.03;break}case"shot":{let E=sb(s,t,e,r,m("shot"));o=E.spin,a=E.point;break}case"touch":{a=new ot(p.x+Math.sin(e.aimYaw)*4,0,p.z+Math.cos(e.aimYaw)*4),Er(p,a,2,r);break}}if(d&&Xl.has(e.kind)&&e.kind!=="throw"&&i.next()<d.mistake){Wl(r,(i.next()<.5?-1:1)*(.1+i.next()*.22));let E=i.next()<.6?.55+i.next()*.2:1.18+i.next()*.2;r.x*=E,r.z*=E,r.y>0&&(r.y*=Math.sqrt(E)),e.mishit=!0}e.kind==="shot"&&(g=wp(p,r,o,l));let M=r.len(),y=r.x/(M||1),v=r.z/(M||1),b=r.y>3,S=(b?-1:1)*M/fe*(b?.35:.6);n.spin.set(v*S,(o||0)*2,-y*S),n.sideSpin=o||0,s.applyKick(t,r,e,{point:a,target:x,onTarget:g})}function ib(s,t,e){let n=s.attackDir(t.team),i=n,r=0,o=t.speed;o>1.5&&t.vel.x*n>0&&(i+=t.vel.x/o*.9,r+=t.vel.z/o*.9),Math.abs(t.pos.z)>11&&(r-=Math.sign(t.pos.z)*.35);let a=Math.hypot(i,r);i/=a,r/=a;let l=9;for(let d of s.players){if(d.team===t.team||d.isGK)continue;let u=d.pos.x-t.pos.x,f=d.pos.z-t.pos.z,g=u*i+f*r,x=Math.abs(u*r-f*i);g>0&&x<4&&(l=Math.min(l,g+1.5))}let c=ht(l,4.5,9),h=e?e.clone():new ot(t.pos.x+i*c,0,t.pos.z+r*c);return h.x=ht(h.x,-Q.HL+1.5,Q.HL-1.5),h.z=ht(h.z,-Q.HW+1.5,Q.HW-1.5),h}function sb(s,t,e,n,i){let r=s.ball,o=s.rng,a=s.attackDir(t.team),l=a*Q.HL,c=t.isHuman?s.assist.shotAim:0,h;if(e.ai&&e.point)h=e.point.clone();else{let v=t.pos.x,b=t.pos.z,S=Math.cos(e.aimPitch),E=Math.sin(e.aimYaw)*S,_=Math.sin(e.aimPitch),A=Math.cos(e.aimYaw)*S;if(E*a>.25&&(l-v)*a>1){let P=(l-v)/E;h=new ot(l,1.65+_*P,b+A*P);let N=Math.abs(h.z),F=ft.HW-.4;if(N>F&&N<ft.HW+1.8){let I=N-F,z=c*.6*ht(1-(N-ft.HW)/1.8,0,1);h.z-=Math.sign(h.z)*I*z}h.y>ft.H-.3&&h.y<ft.H+1.3&&(h.y-=(h.y-(ft.H-.35))*c*.45),h.y=ht(h.y,fe,4.5)}else h=new ot(v+E*22,ht(1.65+_*22,fe,7),b+A*22)}let d=e.ai?e.power:e.charge,u=vo(15.5,29,Math.pow(ht(d,0,1),.85))*(.86+t.attrs.finishing*.0028);h.y+=d*d*.3;let f=Math.atan2(h.x-r.pos.x,h.z-r.pos.z),g=Sp(r.pos.x,r.pos.y,r.pos.z,h.x,h.y,h.z,u);g=ht(g,-.12,.62);let x=Math.abs(ts(t.yaw,f))/Math.PI,p=i*(1+x*.8)*(.75+.45*d);f+=o.gauss()*p,g+=o.gauss()*p*.55;let m=Math.cos(g);return n.set(Math.sin(f)*m*u,Math.sin(g)*u,Math.cos(f)*m*u),{spin:o.gauss()*4,point:h}}function $l(s,t){let e=s.time;if(e<t.tackleReadyAt||!ns(s,t))return!1;let n=s.ball,i=t.yaw,r=n.pos.distXZ(t.pos),o=t.isHuman&&r<3.4&&n.state!=="held"&&n.state!=="dead";(r<2.6||o)&&(i=Ft(n.pos.x+n.vel.x*.15-t.pos.x,n.pos.z+n.vel.z*.15-t.pos.z));let a=o?ht((r-.5)/.26+1.5,4.2,7.5):4.2;return t.action={type:"tackle",t:0,dir:i,done:!1,dur:.5,victims:new Set,homing:o,lunge:a},t.tackleReadyAt=e+ve.TACKLE_COOLDOWN,t.faceYaw=i,s.events.emit("tackleAttempt",{player:t,t:e}),!0}function rb(s,t,e,n){let i=s.ball,r=s.time;e.homing&&!e.done&&e.t<.2&&(e.dir=Ft(i.pos.x+i.vel.x*.1-t.pos.x,i.pos.z+i.vel.z*.1-t.pos.z)),t.faceYaw=e.dir;let o=Math.sin(e.dir),a=Math.cos(e.dir);e.t<(e.homing?.28:.22)&&(t.desired.x=o*e.lunge,t.desired.z=a*e.lunge);let l=e.homing?.04:.07,c=e.homing?.36:.3;if(!e.done&&e.t>=l&&e.t<=c){let h=e.homing?1.2:1.05,d=e.homing?.38:.3,u=t.pos.x+o*.2,f=t.pos.z+a*.2,g=t.pos.x+o*h,x=t.pos.z+a*h,p=Jn(i.pos.x,i.pos.z,u,f,g,x),m=i.owner;if(p.d<d+fe&&i.pos.y<.6&&i.state!=="held"&&i.state!=="dead"){if(e.done=!0,e.contactT=e.t,t.touch={foot:"R",time:r,x:i.pos.x,y:i.pos.y,z:i.pos.z,kind:"tackle"},m&&m.team!==t.team){let M=i.pos.x-m.pos.x,y=i.pos.z-m.pos.z,v=Math.hypot(M,y)||1,b=t.pos.x-i.pos.x,S=t.pos.z-i.pos.z,E=Math.hypot(b,S)||1,_=(M*b+y*S)/(v*E),A=.56+(t.attrs.tackling-m.attrs.control)*.007+_*.26-ht(m.speed/8,0,1)*.1;!t.isHuman&&s.aiParams[t.team]&&(A+=s.aiParams[t.team].tackleBonus),t.isHuman&&(A+=s.assist.tackle),m.isHuman&&(A-=s.assist.oppProtect),A=ht(A,m.isHuman?.1:.18,t.isHuman?.96:.93);let C=s.rng.next()<A;if(C&&t.isHuman){let P=(s.rng.next()-.5)*.6;s.dislodge(m,t,new ot(-o*1.3+a*P,0,-a*1.3-o*P)),e.dur=Math.min(e.dur,e.t+.08)}else if(C){let P=s.rng.next()<.5?-1:1,N=-o*.2+a*P*.6+M/v*.5,F=-a*.2-o*P*.6+y/v*.5,I=Math.hypot(N,F)||1,z=2.2+s.rng.next()*1.8;s.dislodge(m,t,new ot(N/I*z,0,F/I*z))}else s.events.emit("tackle",{player:t,victim:m,success:!1,t:r}),m.stumbleUntil=Math.max(m.stumbleUntil,r+.15)}else if(!m||m===t)if(t.isHuman)i.setVelocity(new ot(t.vel.x*.7,0,t.vel.z*.7)),i.state="free",i.owner=null,s.touchBall(t,"poke"),e.dur=Math.min(e.dur,e.t+.05);else{let M=Math.max(3,i.speed*.3);i.setVelocity(new ot(o*M,0,a*M)),i.state="free",i.owner=null,s.touchBall(t,"poke")}}else if(m&&m.team!==t.team&&!e.victims.has(m)&&Jn(m.pos.x,m.pos.z,u,f,g,x).d<.42){e.victims.add(m);let v=Math.cos(m.yaw)*(t.pos.z-m.pos.z)+Math.sin(m.yaw)*(t.pos.x-m.pos.x)<-.2?.6:.18;s.rng.next()<v&&s.foul(t,m,!1)}}e.t>e.dur&&(t.action=null,t.faceYaw=null)}function ql(s,t){let e=s.time;if(e<t.slideReadyAt||!ns(s,t)||t.stamina<.06)return!1;let n=t.yaw;t.speed>1.2?n=Ft(t.vel.x,t.vel.z):t.desired.lenXZ()>.5&&(n=Ft(t.desired.x,t.desired.z));let i=Math.max(t.speed+1.2,6.3);return t.action={type:"slide",t:0,dir:n,speed0:i,sliding:!0,ballFirst:!1,victims:new Set,dur:1.05},t.slideReadyAt=e+ve.SLIDE_COOLDOWN,t.stamina=Math.max(0,t.stamina-.07),s.events.emit("slide",{player:t,t:e}),!0}function ob(s,t,e,n){let i=s.ball,r=s.time,o=Math.sin(e.dir),a=Math.cos(e.dir);if(t.faceYaw=e.dir,t.yaw=e.dir,e.sliding){let l=ht(1-e.t/.68,0,1),c=e.speed0*Math.pow(l,.8);t.vel.set(o*c,0,a*c),e.t>.62&&(e.sliding=!1,t.vel.set(o*.4,0,a*.4))}else t.desired.set(0,0,0);if(e.t>.04&&e.t<.62){let l=t.pos.x+o*.2,c=t.pos.z+a*.2,h=t.pos.x+o*1.1,d=t.pos.z+a*1.1;if(!e.ballDone&&i.state!=="held"&&i.state!=="dead"&&i.pos.y<.5&&Jn(i.pos.x,i.pos.z,l,c,h,d).d<.28+fe&&i.owner!==t){e.ballDone=!0,e.ballFirst=!0;let f=i.owner,g=s.rng.next()<.5?-1:1,x=Math.max(4.5,i.speed*.35),p=new ot((o+a*g*.25)*x,.4,(a-o*g*.25)*x);t.touch={foot:"R",time:r,x:i.pos.x,y:i.pos.y,z:i.pos.z,kind:"slide"},f&&f.team!==t.team?s.dislodge(f,t,p,!0):(i.owner=null,i.state="free",i.setVelocity(p),s.touchBall(t,"slide"))}for(let u of s.players){if(u===t||u.team===t.team||e.victims.has(u))continue;Jn(u.pos.x,u.pos.z,t.pos.x,t.pos.z,h,d).d<.42&&(e.victims.add(u),e.ballFirst?s.rng.next()<.5&&(u.stumbleUntil=r+.5):s.rng.next()<.85?s.foul(t,u,!0):u.downUntil=r+.7)}}e.t>e.dur&&(t.action=null,t.faceYaw=null)}var Ue=new ot;function gu(s,t,e,n,i=0){let r=s.ownGoalX(t.team);return Math.sign(e)===Math.sign(r)&&Math.abs(e-r)<Kt.PEN_D+i&&Math.abs(n)<Kt.PEN_HW+i&&Math.abs(e)<=Q.HL+.5}function Cp(s,t,e){return!t.isGK||s.phase!=="playing"||e.owner||e.state==="held"||e.state==="dead"||s.time<t.downUntil||s.time<t.noCaptureUntil?!1:gu(s,t,e.pos.x,e.pos.z,.3)}function Yl(s,t,e){let n=t.action;if(n&&n.type==="dive"){let o=Math.max(0,n.t-n.delay),a=ht(o/n.flight,0,1),l=vo(1.25,n.handY,ht(o/(n.flight*.55),0,1)),c=vo(1,ht(n.handY*.7,.25,1.5),ht(o/(n.flight*.5),0,1)),h=.45+.45*Math.min(1,a*1.6);return e.ax=t.pos.x-n.dirX*.35,e.ay=c,e.az=t.pos.z-n.dirZ*.35,e.bx=t.pos.x+n.dirX*h,e.by=l,e.bz=t.pos.z+n.dirZ*h,e.r=.2,e.diving=!0,e}let i=Math.sin(t.yaw),r=Math.cos(t.yaw);return e.ax=t.pos.x+i*.12,e.ay=.05,e.az=t.pos.z+r*.12,e.bx=e.ax,e.by=2.15,e.bz=e.az,e.r=t.ai.set?.42:.34,e.diving=!1,e}function Pp(s,t,e,n){let i=n.bx-n.ax,r=n.by-n.ay,o=n.bz-n.az,a=i*i+r*r+o*o,l=a>1e-9?((s-n.ax)*i+(t-n.ay)*r+(e-n.az)*o)/a:0;l=ht(l,0,1);let c=n.ax+i*l,h=n.ay+r*l,d=n.az+o*l;return{d:Math.hypot(s-c,t-h,e-d),t:l,cx:c,cy:h,cz:d}}var is={};function Ip(s,t,e){Yl(s,t,is);let n=Pp(e.pos.x,e.pos.y,e.pos.z,is);if(n.d>is.r+fe)return!1;let i=s.time,r=e.speed,o=12.5+t.keeping*.09;is.diving&&(o-=3.5),e.pos.y>1.9&&(o-=3);let a=n.d/(is.r+fe),l=s.attackDir(t.team),c=e.lastKick,h=c&&c.kind==="shot"&&c.team!==t.team?c:null;if(t.touch={foot:"H",time:i,x:e.pos.x,y:e.pos.y,z:e.pos.z,kind:"save"},e.lastTouch=t,e.lastTouchTime=i,r<o&&a<.92&&s.rng.next()>(r/o-.75)*1.4)return e.owner=t,e.state="held",e.vel.set(0,0,0),e.spin.set(0,0,0),e.version++,t.hold="gk",t.ai.holdStart=i,t.ai.state="hold",s.possTeam=t.team,s.passIntent=null,s.events.emit("save",{player:t,caught:!0,speed:r,shot:h,t:i}),s.events.emit("possession",{player:t,team:t.team,prev:null,cause:"catch",t:i}),!0;let d=Math.sign(e.pos.z-t.pos.z)||(s.rng.next()<.5?-1:1);if(r>o+9&&a>.8)e.vel.x*=.62,e.vel.z+=d*2.2,e.vel.y+=1;else{let u=2+r*.22;e.vel.set(l*u*(.5+s.rng.next()*.5),1.2+s.rng.next()*2.4,d*(2.5+r*.22))}return e.state="air",e.version++,t.noCaptureUntil=i+.3,s.events.emit("save",{player:t,caught:!1,speed:r,shot:h,t:i}),!0}function mu(s,t,e,n,i,r=.07){let o=e-t.pos.z,a=n-t.pos.x,l=Math.abs(o),c=Math.sign(o)||1,h=ht(a,-.8,.8)*.3,d=Math.hypot(c,h),u=ht(l-.35,.3,1.95+t.keeping*.004);t.action={type:"dive",t:0,delay:r,flight:.56-t.keeping*8e-4,dist:u,dirX:h/d,dirZ:c/d,handY:ht(i,.15,2.3),dur:1.25},t.yaw=Ft(s.attackDir(t.team),0),s.events.emit("dive",{player:t,t:s.time})}function ab(s,t,e,n){let i=e.t-e.delay;if(i<0){t.vel.set(0,0,0);return}if(i<e.flight){let o=2*e.dist/e.flight*(1-i/e.flight);t.vel.set(e.dirX*o,0,e.dirZ*o)}else t.vel.set(0,0,0);let r=s.ball;if(r.owner&&r.owner.team!==t.team&&i>0&&i<e.flight&&!e.smotherDone&&(Yl(s,t,is),Pp(r.pos.x,r.pos.y,r.pos.z,is).d<is.r+fe+.1&&(e.smotherDone=!0,s.rng.next()<.5+t.keeping*.004))){let a=s.attackDir(t.team);s.dislodge(r.owner,t,new ot(a*2.5,.5,e.dirZ*3))}e.t>e.dur&&(t.action=null,t.ai.set=!1)}function Rp(s,t,e,n){let i=s.traj,r=s.time-i.t0,o=i.pts;for(let a=1;a<i.count;a++){let l=a*i.step-r;if(l<0)continue;if(l>n)break;let c=o[(a-1)*3],h=o[a*3];if((t-c)*e>0&&(t-h)*e<=0){let d=(c-t)/(c-h||1e-6);return{t:l-i.step*(1-d),y:o[(a-1)*3+1]+(o[a*3+1]-o[(a-1)*3+1])*d,z:o[(a-1)*3+2]+(o[a*3+2]-o[(a-1)*3+2])*d}}}return null}function Lp(s,t,e,n){let i=s.ball,r=s.time,o=t.ai,a=s.attackDir(t.team),l=-a*Q.HL;if(t.sprint=!1,t.faceYaw=null,t.action&&t.action.type==="dive"){ab(s,t,t.action,e),t.desired.set(0,0,0);return}if(r<t.downUntil){t.desired.set(0,0,0);return}if(i.state==="held"&&i.owner===t){let b=r-(o.holdStart??r),S=l+a*(Kt.PEN_D-2);Ue.set(S,0,ht(t.pos.z,-6,6)),As(t,Ue,1.6),t.faceYaw=Ft(a,0),!t.action&&(b>n.gkHold||b>ve.GK_MAX_HOLD-.4||b>.8&&cb(s,t))&&hb(s,t,n);return}if(s.phase!=="playing")return;let c=i.lastKick,h=!i.owner&&i.vel.x*-a>2.5;i.version!==o.seenVersion&&(o.seenVersion=i.version,o.reactAt=r+n.gkReaction*(.9+s.rng.next()*.25),c&&c.restart==="penalty"&&c.team!==t.team&&r-c.t<.05&&(o.reactAt=r+.12,o.penalty=!0));let d=t.pos.x,u=null;if(h){let b=Rp(s,l,-a,2.4);b&&Math.abs(b.z)<ft.HW+.6&&b.y<ft.H+.4&&(u=Rp(s,d+a*.05,-a,2.4)||b,Math.abs(i.pos.x-l)<Math.abs(d-l)+.2&&(u=b))}if(u){if(o.set=!0,t.faceYaw=Ft(i.pos.x-t.pos.x,i.pos.z-t.pos.z),r<o.reactAt){t.desired.set(0,0,0);return}let b=u.z-t.pos.z,S=Math.abs(b);if(o.penalty){o.penalty=!1;let _=s.rng.next()<.55?u.z:-Math.sign(u.z||1)*2;if(Math.abs(_-t.pos.z)>.6){mu(s,t,_,t.pos.x,u.y,.02);return}}S<.5&&u.y<2.1?(Ue.set(t.pos.x,0,u.z),As(t,Ue,3)):S-.5<3*Math.max(0,u.t-.12)&&u.y<1.9&&u.t>.35?(Ue.set(t.pos.x,0,u.z),t.sprint=!0,As(t,Ue,5)):u.t<1.4&&mu(s,t,u.z,t.pos.x+a*.2,u.y);return}o.set=!1;let f=s.passIntent;if(f&&f.target===t&&!i.owner&&r-f.t<4){let b=s.traj;for(let S=.05;S<3&&(b.at(S+(r-b.t0),Ue),!(t.pos.distXZ(Ue)/5.5<=S));S+=.05);As(t,Ue,5.5),t.sprint=!0,t.faceYaw=Ft(i.pos.x-t.pos.x,i.pos.z-t.pos.z);return}if(!i.owner&&i.state!=="held"&&i.state!=="dead"){let b=s.traj,S=null;for(let E=.1;E<2.5;E+=.1){if(b.at(E+(r-b.t0),Ue),!gu(s,t,Ue.x,Ue.z,-.5))continue;if(t.pos.distXZ(Ue)/6.2+.2<=E&&Ue.y<2.2){S={t:E,x:Ue.x,z:Ue.z};break}}if(S&&lb(s,t.team,S.x,S.z)>S.t+.05){Ue.set(S.x,0,S.z),t.sprint=!0,As(t,Ue,6.2),t.faceYaw=Ft(i.pos.x-t.pos.x,i.pos.z-t.pos.z);return}}let g=i.owner;if(g&&g.team!==t.team&&gu(s,t,g.pos.x,g.pos.z,1)){let b=Math.hypot(g.pos.x-l,g.pos.z),S=!1;for(let E of s.teams[t.team].players){if(E===t||E.isGK)continue;let _=Jn(E.pos.x,E.pos.z,g.pos.x,g.pos.z,l,0);_.d<1.2&&_.t>.1&&(S=!0)}if(!S&&b<13){if(i.pos.distXZ(t.pos)<2&&r>(o.smotherReady||0)){o.smotherReady=r+1.5,mu(s,t,i.pos.z,i.pos.x,.2,.05);return}let _=ht((b-2.5)/b,0,1);Ue.set(l+(g.pos.x-l)*_,0,g.pos.z*_),t.sprint=!0,As(t,Ue,5.5),t.faceYaw=Ft(g.pos.x-t.pos.x,g.pos.z-t.pos.z);return}}let x=i.pos.x,p=i.pos.z,m=x-l,M=p,y=Math.hypot(m,M)||1,v=ht(.7+(y-8)*.06,.6,3.2);Ue.set(l+m/y*v,0,ht(M/y*v*1.2,-2.3,2.3)),(Ue.x-l)*a<.4&&(Ue.x=l+a*.4),As(t,Ue,y<20?4:2.5),t.faceYaw=Ft(x-t.pos.x,p-t.pos.z)}function As(s,t,e){let n=t.x-s.pos.x,i=t.z-s.pos.z,r=Math.hypot(n,i);if(r<.08){s.desired.set(0,0,0);return}let o=Math.min(e,r*3.5);s.desired.set(n/r*o,0,i/r*o)}function lb(s,t,e,n){let i=99;for(let r of s.players){if(r.team===t)continue;let o=Math.hypot(r.pos.x-e,r.pos.z-n),a=Math.max(0,o-.8)/r.sprintSpeed()+.2;a<i&&(i=a)}return i}function cb(s,t){let e=s.human;return e&&e.team===t.team&&e.requestUntil>s.time}function hb(s,t,e){let n=s.attackDir(t.team),i=null,r=-1e9,o="gkthrow";for(let a of s.teams[t.team].players){if(a===t)continue;let l=t.pos.distXZ(a.pos);if(l<5)continue;let c=99;for(let f of s.players)f.team!==t.team&&(c=Math.min(c,f.pos.distXZ(a.pos)));let h=fi(s,t.pos.x,t.pos.z,a.pos.x,a.pos.z,t.team,11),d=a.isHuman?e.humanBonus+(a.requestUntil>s.time?.5:0):0;if(l<30){let f=h*1.2+Math.min(c,10)*.07-l*.01+d;f>r&&h>.45&&(r=f,i=a,o="gkthrow")}let u=s.uOf(t.team,a.pos.x);if(u>-.2&&c>3.5){let f=.35+u*.4+Math.min(c,10)*.05+d*.6;f>r&&(r=f,i=a,o="gkkick")}}i?(t.yaw=Ft(i.pos.x-t.pos.x,i.pos.z-t.pos.z),le(s,t,o,{target:i,ai:!0})):le(s,t,"gkkick",{point:new ot(n*8,0,(s.rng.next()-.5)*20),ai:!0}),t.hold="gk",s.events.emit("distribute",{player:t,target:i,t:s.time})}var ub=new L(0,1,0),Ne=Array.from({length:24},()=>new L),Kl=new oe,yT=new Be,pi=new xn,Me=(s,t,e)=>s+(t-s)*e,mn=(s,t,e)=>s<t?t:s>e?e:s,mi=s=>(s=mn(s,0,1),s*s*(3-2*s));function db(s,t,e){let n=t-s;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return s+n*e}function fb(s){return s-Math.floor(s)}var te=()=>new L,xu={x:te(),y:te(),z:te()},Zl={d:te(),bend:te(),r:te(),t:te()},Ee={pelvis:te(),waist:te(),neck:te(),fwd:te(),side:te(),hip:te(),ankT:te(),knee:te(),ankle:te(),pole:te(),back:te(),sh:te(),tgt:te(),off:te(),elbow:te(),hand:te(),pole2:te()},He={hands:te(),body:te(),axis:te(),sh:te(),pelvis:te(),face:te(),z:te(),x:te(),p1:te(),p2:te(),hip:te(),knee:te(),ankle:te(),shp:te(),tgt:te(),elbow:te(),hand:te()};function ss(s,t,e,n){let i=xu.y.subVectors(t,e);i.lengthSq()<1e-8&&i.set(0,1,0),i.normalize();let r=xu.z.copy(n).addScaledVector(i,-n.dot(i));r.lengthSq()<1e-6&&(r.set(0,0,1).addScaledVector(i,-i.z),r.lengthSq()<1e-6&&r.set(1,0,0)),r.normalize();let o=xu.x.crossVectors(i,r);return s.makeBasis(o,i,r),s.setPosition(t),s}function yu(s,t,e,n,i,r,o){let a=Zl.r.copy(s),l=Zl.t.copy(t),c=Zl.d.subVectors(l,a),h=c.length();h<1e-4?(c.set(0,-1,0),h=1e-4):c.divideScalar(h),h=mn(h,Math.abs(e-n)+.02,e+n-.002),o.copy(a).addScaledVector(c,h);let d=mn((e*e+h*h-n*n)/(2*e*h),-1,1),u=Math.sqrt(1-d*d),f=Zl.bend.copy(i).addScaledVector(c,-i.dot(c));f.lengthSq()<1e-6&&f.set(0,0,1),f.normalize(),r.copy(a).addScaledVector(c,e*d).addScaledVector(f,e*u)}var Jl=class{constructor(){this.pos=new L,this.plant=new L,this.from=new L,this.swing=!1,this.step=null,this.out=new L}},jl=class{constructor(t){this.p=t,this.feet=[new Jl,new Jl],this.ready=!1,this.lastRoot=new L,this.lean=0,this.headYaw=0,this.headPitch=0,this.fall=0,this.m=Array.from({length:13},()=>new oe),this.root=new L,this.yaw=0,this.hands=[new L,new L],this.handW=0}reset(){this.ready=!1}update(t){let e=this.p,n=t.match,i=Math.min(t.dt,.05),r=t.now,o=t.alpha,a=e.action,l=this.root.set(Me(e.prevPos.x,e.pos.x,o),0,Me(e.prevPos.z,e.pos.z,o)),c=this.yaw=db(e.prevYaw,e.yaw,o),h=Ne[0].set(Math.sin(c),0,Math.cos(c)),d=Ne[1].set(Math.cos(c),0,-Math.sin(c)),u=e.vel.x,f=e.vel.z,g=Math.hypot(u,f),x=mn(g/7.5,0,1);if(!this.ready||this.lastRoot.distanceTo(l)>2.5){this.ready=!0;for(let lt=0;lt<2;lt++){let nt=this.feet[lt];nt.pos.copy(l).addScaledVector(d,lt===0?.11:-.11),nt.plant.copy(nt.pos),nt.swing=!1,nt.step=null}}this.lastRoot.copy(l);let p=Me(e.prevGait,e.gait,o),m=g>.35&&!(a&&(a.type==="slide"||a.type==="dive")),M=Mr(Math.max(g,.6)),y=Sr(M),v=g>.01?u/g:h.x,b=g>.01?f/g:h.z;for(let lt=0;lt<2;lt++){let nt=this.feet[lt],Bt=lt===0?1:-1,V=d.x*.11*Bt,K=d.z*.11*Bt;if(m){nt.step=null;let ut=fb(p-(lt===0?0:.5));if(ut<y){nt.swing&&(nt.swing=!1,nt.plant.set(nt.pos.x,0,nt.pos.z));let At=l.x+V,ct=l.z+K;Math.hypot(nt.plant.x-At,nt.plant.z-ct)>.9&&nt.plant.set(At+v*.2,0,ct+b*.2),nt.pos.copy(nt.plant)}else{nt.swing||(nt.swing=!0,nt.from.set(nt.pos.x,0,nt.pos.z));let At=(ut-y)/(1-y),ct=(1-ut)*M/Math.max(g,.5),Ut=l.x+u*ct+v*y*M*.5+V,pe=l.z+f*ct+b*y*M*.5+K;if(n.ball.owner===e&&!a){let Yt=t.ball.x+n.ball.vel.x*ct*.5,re=t.ball.z+n.ball.vel.z*ct*.5,Lt=(Yt-l.x)*v+(re-l.z)*b;Lt>.1&&Lt<1&&(Ut=Me(Ut,Yt-v*.12,.35),pe=Me(pe,re-b*.12,.35))}let qt=mi(At);nt.pos.set(Me(nt.from.x,Ut,qt),(.09+g*.035)*Math.sin(Math.PI*Math.pow(At,.75)),Me(nt.from.z,pe,qt))}}else{let ut=l.x+V+h.x*(lt===0?.03:-.03),At=l.z+K+h.z*(lt===0?.03:-.03);nt.swing&&(nt.swing=!1,nt.step={fx:nt.pos.x,fz:nt.pos.z,t:0,dur:.14});let ct=this.feet[1-lt];if(nt.step){nt.step.t+=i;let Ut=mn(nt.step.t/nt.step.dur,0,1),pe=mi(Ut);nt.pos.set(Me(nt.step.fx,ut,pe),.07*Math.sin(Math.PI*Ut),Me(nt.step.fz,At,pe)),Ut>=1&&(nt.step=null,nt.plant.set(ut,0,At))}else Math.hypot(nt.plant.x-ut,nt.plant.z-At)>.22&&!ct.step?nt.step={fx:nt.plant.x,fz:nt.plant.z,t:0,dur:.16}:nt.pos.copy(nt.plant)}nt.out.copy(nt.pos)}let S=.935-.05*x+.018*x*Math.cos(p*Math.PI*4),E=.05+.16*x+(e.sprint?.05:0),_=c,A=.16*x*Math.sin(p*Math.PI*2),C=0,P=0,N=Math.sin(p*Math.PI*2),F=.08+.3*x,I=Ne[2].set(.05,-.5+.18*x,-N*F),z=Ne[3].set(-.05,-.5+.18*x,N*F),q=!1,Y=Ne[4],st=Ne[5],Z=null,tt=null,$=t.ball,_t=e.touch;if(a&&a.type==="kick"&&!a.fromHands){let lt=a.foot==="L"?0:1,nt=a.contacted?a.kyaw??c:c;a.contacted&&a.kyaw==null&&(a.kyaw=c);let Bt=Ne[6].set(Math.sin(nt),0,Math.cos(nt)),V=Ne[7].set(Math.cos(nt),0,-Math.sin(nt)).multiplyScalar(lt===0?1:-1),K=Ne[8];a.contacted&&_t&&_t.kind!=="receive"?K.set(_t.x,0,_t.z):K.set($.x,0,$.z);let ut=a.kind==="cross"||a.kind==="lob"||a.kind==="clear",At=a.kind==="shot"?a.charging?a.charge:Math.max(a.charge||0,a.ai?a.power:.35):ut?.8:.3+(a.charge||0)*.4,ct=Ne[9].copy(K).addScaledVector(Bt,-.14).addScaledVector(V,-.25),Ut=this.feet[lt].out,pe=this.feet[1-lt].out;if(a.contacted){let Lt=(a.t-a.contactT)/a.follow,ce=Ne[10].copy(K).addScaledVector(Bt,.45+.5*At);ce.y=.2+.5*At;let Ae=Ne[11].copy(K).setY(.06);Lt<.5?Ut.copy(Ae.lerp(ce,mi(Lt/.5))):Ut.lerp(ce,1-mi((Lt-.5)/.5)),Lt<.65?pe.copy(ct):pe.lerp(ct,1-mi((Lt-.65)/.35)),E=.1-(ut?.12:0)*(1-Lt)}else{let Lt=a.charging?.35+.4*a.charge:mn(a.t/Math.max(.06,a.t+a.eta),0,1),ce=Ne[10].copy(K).addScaledVector(Bt,-(.32+.38*At)).addScaledVector(V,.06);ce.y=.12+.32*At,Lt<.75?Ut.lerp(ce,mi(Lt/.75)):Ut.copy(ce).lerp(Ne[11].copy(K).setY(.06),(Lt-.75)/.25),pe.lerp(ct,mi(Lt*2.2)),E=.12-(ut?.08:0)}let qt=lt===0?1:-1,Yt=qt>0?I:z,re=qt>0?z:I;Yt.set(qt*.35,-.35,-.2),re.set(-qt*.3,-.3,.25)}else if(a&&a.type==="kick"&&a.fromHands){let lt=a.contacted?mn((a.t-a.contactT)/a.follow,0,1):mn(a.t/Math.max(.1,a.t+a.eta),0,1);if(a.kind==="throw"){let nt=a.contacted?1-lt:lt;I.set(.12,.62-.05*nt,-.25*nt+(a.contacted?.35*lt:0)),z.set(-.12,.62-.05*nt,-.25*nt+(a.contacted?.35*lt:0)),E=-.12*(a.contacted?1-lt:lt)+(a.contacted?.15*lt:0)}else if(a.kind==="gkthrow")z.set(-.12,-.45,a.contacted?.45*(1-lt)+.2:-.35*lt),I.set(.25,-.35,.1),E=.25;else{I.set(.1,-.2,.35),z.set(-.1,-.2,.35);let nt=this.feet[1].out,Bt=Ne[6].set(Math.sin(c),0,Math.cos(c));a.contacted?(nt.copy(l).addScaledVector(Bt,.3+.5*lt),nt.y=.3+.6*Math.sin(Math.PI*lt)):(nt.copy(l).addScaledVector(Bt,-.3*lt),nt.y=.15*lt)}}else if(a&&a.type==="tackle"){let lt=a.t,nt=lt<.07?lt/.07*.3:lt<.3?.3+Math.min(1,(lt-.07)/.1)*.7:Math.max(0,1-(lt-.3)/.18),Bt=Ne[6].set(Math.sin(a.dir),0,Math.cos(a.dir)),V=this.feet[1].out,K=Ne[7].copy(l).addScaledVector(Bt,.3+.75*nt).addScaledVector(d,-.05);K.y=.06,V.lerp(K,mn(nt*1.4,0,1)),E=.1+.25*nt,S-=.08*nt,I.set(.35,-.3,.1),z.set(-.35,-.3,-.15)}else if(a&&a.type==="slide")tt="slide";else if(a&&a.type==="dive")tt="dive";else if(r<e.downUntil)tt="fall";else if(a&&a.type==="celebrate"||e.celebrate>r){let lt=r*6+e.id;I.set(.25,.55+.08*Math.sin(lt),.05),z.set(-.25,.55+.08*Math.cos(lt),.05),a&&a.type==="celebrate"&&g<1&&(S+=.12*Math.max(0,Math.sin(r*9)))}else if(e.hold==="throw"||n.restart&&n.restart.handsBall&&n.restart.taker===e&&n.phase==="restart")q=!0,Y.set($.x,$.y,$.z).addScaledVector(d,.1),st.set($.x,$.y,$.z).addScaledVector(d,-.1);else if(e.isGK&&n.ball.state==="held"&&n.ball.owner===e)q=!0,Y.set($.x,$.y,$.z).addScaledVector(d,.1).addScaledVector(h,-.04),st.set($.x,$.y,$.z).addScaledVector(d,-.1).addScaledVector(h,-.04);else if(e.isGK&&e.ai.set)S=.8,E=.22,I.set(.3,-.12,.3),z.set(-.3,-.12,.3),Math.hypot($.x-l.x,$.z-l.z)<1.4&&(q=!0,Y.set($.x,$.y,$.z).addScaledVector(d,.12),st.set($.x,$.y,$.z).addScaledVector(d,-.12));else if(r<e.stumbleUntil){let lt=Math.sin(r*20)*.15;I.set(.4,-.1+lt,0),z.set(-.4,-.1-lt,0),P=lt*.4}if(!tt&&_t&&(_t.kind==="receive"||_t.kind==="dribble"||_t.kind==="stop"||_t.kind==="poke")&&!(a&&a.type==="kick")){let lt=r-_t.time;if(lt>-.05&&lt<.2){let nt=1-Math.abs(lt-.02)/.18,Bt=_t.foot==="L"?0:1,V=Ne[12].set(_t.x,.05+(_t.kind==="receive"?Math.min(.5,_t.y)*.8:0),_t.z);V.addScaledVector(Ne[13].set(_t.x-l.x,0,_t.z-l.z).normalize(),-.1),this.feet[Bt].out.lerp(V,mn(nt,0,1)*.85)}}let Et=this.m;if(tt==="slide")this.poseSlide(e,a,l,c,Et);else if(tt==="dive")this.poseDive(e,n,l,c,Et);else if(tt==="fall")this.poseFall(e,r,l,c,Et,h,d);else{let lt=$.x-l.x,nt=$.z-l.z,V=Math.atan2(lt,nt)-_;for(;V>Math.PI;)V-=Math.PI*2;for(;V<-Math.PI;)V+=Math.PI*2;V=mn(V,-1.1,1.1),this.headYaw=Me(this.headYaw,V,1-Math.exp(-i*8));let K=Math.hypot(lt,nt);this.headPitch=Me(this.headPitch,mn(Math.atan2(1.55-$.y,K)*.6,-.3,.5),1-Math.exp(-i*6)),this.lean=Me(this.lean,E,1-Math.exp(-i*10)),this.poseUpright(e,l,_,S,this.lean+C,A,P,I,z,q?Y:null,q?st:null,Et,t.local)}return Et}poseUpright(t,e,n,i,r,o,a,l,c,h,d,u,f){let g=Ee.pelvis.set(e.x,i,e.z),x=Ee.fwd.set(Math.sin(n),0,Math.cos(n)),p=Ee.side.set(Math.cos(n),0,-Math.sin(n));f&&g.addScaledVector(x,-.02),pi.set(0,n-o*.4,0,"YXZ"),u[Ot.PELVIS].makeRotationFromEuler(pi).setPosition(g);let m=u[Ot.PELVIS],M=Ee.waist.set(0,$e.waist,0).applyMatrix4(m);pi.set(r,n+o,a,"YXZ"),u[Ot.TORSO].makeRotationFromEuler(pi).setPosition(M);let y=u[Ot.TORSO],v=Ee.neck.set(0,.58,0).applyMatrix4(y);pi.set(this.headPitch-r*.5,n+this.headYaw,0,"YXZ"),u[Ot.HEAD].makeRotationFromEuler(pi).setPosition(v);for(let S=0;S<2;S++){let E=Ee.hip.set(S===0?$e.hipW:-$e.hipW,-.02,0).applyMatrix4(m),_=this.feet[S].out,A=Ee.ankT.set(_.x,_.y+$e.ankle,_.z),C=Ee.pole.copy(x).addScaledVector(ub,.1);yu(E,A,$e.thigh,$e.shin,C,Ee.knee,Ee.ankle),ss(u[S===0?Ot.THIGH_L:Ot.THIGH_R],E,Ee.knee,x),ss(u[S===0?Ot.SHIN_L:Ot.SHIN_R],Ee.knee,Ee.ankle,x);let P=mn((Ee.ankle.y-$e.ankle)*1.2,0,.6)*(this.feet[S].swing?1:0);pi.set(P,n,0,"YXZ"),u[S===0?Ot.BOOT_L:Ot.BOOT_R].makeRotationFromEuler(pi).setPosition(Ee.ankle)}let b=Ee.back.set(-x.x,-.6,-x.z);for(let S=0;S<2;S++){let E=S===0?1:-1,_=Ee.sh.set(E*$e.shoulderW,.45,0).applyMatrix4(y),A;h?A=Ee.tgt.copy(S===0?h:d):A=Ee.tgt.copy(S===0?l:c).add(Ee.off.set(E*$e.shoulderW,.45,0)).applyMatrix4(y);let C=Ee.pole2.copy(b).addScaledVector(p,E*.5);yu(_,A,$e.upper,$e.fore,C,Ee.elbow,Ee.hand),ss(u[S===0?Ot.UARM_L:Ot.UARM_R],_,Ee.elbow,x),ss(u[S===0?Ot.FARM_L:Ot.FARM_R],Ee.elbow,Ee.hand,x),this.hands[S].copy(Ee.hand)}}poseSlide(t,e,n,i,r){let o=e.t,a=mn((o-.62)/.43,0,1),l=mn(o/.12,0,1)*(1-mi(a)),c=Ne[0].set(Math.sin(e.dir),0,Math.cos(e.dir)),h=Ne[1].set(Math.cos(e.dir),0,-Math.sin(e.dir)),d=Me(.93,.2,l),u=Me(.05,-1.05,l);this.feet[1].out.copy(n).addScaledVector(c,Me(.1,1,l)).addScaledVector(h,-.08).setY(Me(0,.05,l)),this.feet[0].out.copy(n).addScaledVector(c,Me(0,.25,l)).addScaledVector(h,.22).setY(0);let f=Ne[2].set(.35,Me(-.5,-.2,l),Me(0,-.35,l)),g=Ne[3].set(-.4,Me(-.5,-.1,l),Me(0,.2,l));this.lean=u,this.headPitch=Me(this.headPitch,.5*l,.2),this.poseUpright(t,n,e.dir,d,u,0,0,f,g,null,null,r,!1)}poseFall(t,e,n,i,r,o,a){let l=t.action,c=l&&l.dur?l.dur:1,h=l?l.t:c-(t.downUntil-e),d=mi(h/.35)*(1-mi((h-(c-.45))/.45)),u=Me(.93,.22,d),f=Me(.05,1.35,d);this.feet[0].out.copy(n).addScaledVector(o,-.5*d).addScaledVector(a,.14).setY(.02*d),this.feet[1].out.copy(n).addScaledVector(o,-.6*d).addScaledVector(a,-.14).setY(.05*d);let g=Ne[2].set(.25,Me(-.5,-.05,d),Me(0,.45,d)),x=Ne[3].set(-.25,Me(-.5,-.05,d),Me(0,.45,d));this.poseUpright(t,n,i,u,f,0,0,g,x,null,null,r,!1)}poseDive(t,e,n,i,r){let o=Yl(e,t,this.vol||(this.vol={})),a=He.hands.set(o.bx,o.by,o.bz),l=He.axis.subVectors(a,He.body.set(o.ax,o.ay,o.az));l.divideScalar(l.length()||1);let c=He.sh.copy(a).addScaledVector(l,-.52),h=He.pelvis.copy(c).addScaledVector(l,-.5);h.y=Math.max(.18,h.y);let d=He.face.set(Math.sin(i),0,Math.cos(i)),u=He.z.copy(d).addScaledVector(l,-d.dot(l)).normalize(),f=He.x.crossVectors(l,u);Kl.makeBasis(f,l,u),r[Ot.PELVIS].copy(Kl).setPosition(h),r[Ot.TORSO].copy(Kl).setPosition(He.p1.copy(h).addScaledVector(l,$e.waist)),r[Ot.HEAD].copy(Kl).setPosition(He.p2.copy(h).addScaledVector(l,$e.waist+.58));for(let g=0;g<2;g++){let x=g===0?1:-1,p=He.hip.copy(h).addScaledVector(f,x*$e.hipW),m=He.knee.copy(p).addScaledVector(l,-$e.thigh).addScaledVector(u,.08);m.y=Math.max(.08,m.y);let M=He.ankle.copy(m).addScaledVector(l,-$e.shin).addScaledVector(u,-.05);M.y=Math.max(.08,M.y),ss(r[g===0?Ot.THIGH_L:Ot.THIGH_R],p,m,u),ss(r[g===0?Ot.SHIN_L:Ot.SHIN_R],m,M,u),pi.set(0,i,0,"YXZ"),r[g===0?Ot.BOOT_L:Ot.BOOT_R].makeRotationFromEuler(pi).setPosition(M)}for(let g=0;g<2;g++){let x=g===0?1:-1,p=He.shp.copy(c).addScaledVector(f,x*$e.shoulderW),m=He.tgt.copy(a).addScaledVector(f,x*.09);yu(p,m,$e.upper,$e.fore,u,He.elbow,He.hand),ss(r[g===0?Ot.UARM_L:Ot.UARM_R],p,He.elbow,u),ss(r[g===0?Ot.FARM_L:Ot.FARM_R],He.elbow,He.hand,u),this.hands[g].copy(He.hand)}}};var Ql=1024,tc=1024,ec=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=Ql,this.canvas.height=tc,this.ctx=this.canvas.getContext("2d"),this.texture=new or(this.canvas),this.texture.anisotropy=4,this.words=new Map,this.reset()}reset(){let t=this.ctx;t.clearRect(0,0,Ql,tc),t.fillStyle="#fff",t.textAlign="center",t.textBaseline="middle",t.font='bold 88px "Arial Black", Arial, Helvetica, sans-serif';for(let e=0;e<10;e++)t.fillText(String(e),e*64+32,52);this.words.clear(),this.slot=0,this.texture.needsUpdate=!0}rect(t,e,n,i){return[t/Ql,1-(e+i)/tc,(t+n)/Ql,1-e/tc]}digit(t){return this.rect(t*64+6,4,52,96)}word(t){if(this.words.has(t))return this.words.get(t);let e=this.slot%2,n=Math.floor(this.slot/2);if(n>13)return this.rect(0,0,1,1);this.slot++;let i=e*512,r=112+n*64,o=this.ctx;o.save(),o.clearRect(i,r,512,64),o.fillStyle="#fff",o.textAlign="center",o.textBaseline="middle";let a=46;for(o.font=`bold ${a}px "Arial Black", Arial, Helvetica, sans-serif`;o.measureText(t).width>496&&a>14;)a-=2,o.font=`bold ${a}px "Arial Black", Arial, Helvetica, sans-serif`;o.fillText(t,i+256,r+33),o.restore();let l=this.rect(i+2,r+2,508,60);return this.words.set(t,l),this.texture.needsUpdate=!0,l}},nc=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=512,this.canvas.height=192,this.ctx=this.canvas.getContext("2d"),this.texture=new or(this.canvas),this.key=""}update(t,e,n,i,r,o=!1){let a=`${t}|${e}|${n}|${i}|${r}|${o}`;if(a===this.key)return;this.key=a;let l=this.ctx,c=r==="neo";l.fillStyle=c?"#111":"#f6f5ef",l.fillRect(0,0,512,192),l.strokeStyle=c?"#ffd23f":"#222",l.lineWidth=c?10:4,l.strokeRect(8,8,496,176),l.fillStyle=c?"#fff":"#161616",l.textAlign="center",l.textBaseline="middle",l.font='bold 40px "Arial Black", Arial, sans-serif',l.fillText(t,128,52),l.fillText(e,384,52),l.font='bold 72px "Arial Black", Arial, sans-serif',l.fillStyle=c?"#ffd23f":"#161616",l.fillText(`${n[0]}  -  ${n[1]}`,256,112),l.font="bold 30px Arial, sans-serif",l.fillStyle=c?"#3ee0ff":"#444",l.fillText(o?"FINAL":i,256,162),this.texture.needsUpdate=!0}};var ic=new oe,Np=new Be,pb=new L,ST=new L,Dp=new xn,sc=class{constructor(t=20){let e=new Rn(1,1);e.rotateX(-Math.PI/2),this.alpha=new yn(new Float32Array(t),1),e.setAttribute("aAlpha",this.alpha),this.mesh=new sr(e,qf(),t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,this.max=t,this.count=0}begin(){this.count=0}add(t,e,n,i){this.count>=this.max||(ic.makeScale(n,1,n).setPosition(t,.018,e),this.mesh.setMatrixAt(this.count,ic),this.alpha.setX(this.count,i),this.count++)}end(){this.mesh.count=this.count,this.mesh.instanceMatrix.needsUpdate=!0,this.alpha.needsUpdate=!0}},rc=class{constructor(){this.group=new Je;let t=new Gi(.5,.62,40);t.rotateX(-Math.PI/2),this.ring=new ie(t,ws(D.MARKER,.85)),this.ring.renderOrder=3,this.ring.visible=!1;let e=new wi(.16,.34,4);e.rotateX(Math.PI),this.ack=new ie(e,ws(D.MARKER,1)),this.ack.visible=!1;let n=new Gi(.2,.3,24);n.rotateX(-Math.PI/2),this.incoming=new ie(n,ws(D.MARKER,.6)),this.incoming.visible=!1,this.group.add(this.ring,this.ack,this.incoming),this.ringT=0}showRing(t,e,n){this.ring.visible=!0,this.ringT=n;let i=1+.06*Math.sin(n*8);this.ring.position.set(t,.03,e),this.ring.scale.set(i,1,i)}showAck(t,e,n,i){this.ack.visible=!0,this.ack.position.set(t,e+.1*Math.sin(i*10),n),this.ack.rotation.y=i*3}showIncoming(t,e){this.incoming.visible=!0,this.incoming.position.set(t,.03,e)}hideAll(){this.ring.visible=!1,this.ack.visible=!1,this.incoming.visible=!1}},oc=class{constructor(t=180){let e=new Kr(.16,0);this.mat=new gs({color:16777215}),this.mesh=new sr(e,this.mat,t),this.mesh.instanceMatrix.setUsage(Ah),this.mesh.frustumCulled=!1,this.max=t,this.parts=Array.from({length:t},()=>({alive:!1,p:new L,v:new L,r:new L,w:new L,life:0,s:1})),this.col=new Qt;for(let n=0;n<t;n++)this.mesh.setColorAt(n,this.col.set(1,1,1));this.mesh.count=0,this.active=0}spawn(t,e,n,i,r,o=6,a=Math.random){let l=0;for(let c of this.parts){if(l>=i)break;if(c.alive)continue;c.alive=!0,c.p.set(t+(a()-.5)*2,e+a()*1.5,n+(a()-.5)*2);let h=a()*Math.PI*2,d=4+a()*6;c.v.set(Math.cos(h)*o*a(),d,Math.sin(h)*o*a()),c.r.set(a()*6,a()*6,a()*6),c.w.set((a()-.5)*12,(a()-.5)*12,(a()-.5)*12),c.life=1.6+a()*1.2,c.s=.6+a()*.9,c.role=r[Math.floor(a()*r.length)],l++}}update(t){let e=0;for(let n of this.parts){if(!n.alive)continue;if(n.life-=t,n.life<=0){n.alive=!1;continue}n.v.y-=9.8*t*.6,n.v.multiplyScalar(1-1.2*t),n.p.addScaledVector(n.v,t),n.p.y<.05&&(n.p.y=.05,n.v.set(0,0,0)),n.r.addScaledVector(n.w,t),Dp.set(n.r.x,n.r.y,n.r.z),Np.setFromEuler(Dp);let i=n.s*Math.min(1,n.life*2);ic.compose(n.p,Np,pb.set(i,i,i)),this.mesh.setMatrixAt(e,ic),this.mesh.setColorAt(e,Le[n.role]),e++}this.mesh.count=e,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0),this.active=e}clear(){for(let t of this.parts)t.alive=!1;this.mesh.count=0}};ae.enabled=!1;var Rs=120,mb=175;function kp(s){let t=bs.clamp((s-Rs)/(mb-Rs),0,1),e=s*Math.PI/360;return{d:t,R:(t+1)*Math.sin(e)/(t+Math.cos(e))}}var gb="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",xb=`
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
}`,ac=class{constructor(t,e={}){this.canvas=t,this.quality=e.quality||"high";let n=new Sl({canvas:t,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!!e.preserve});n.outputColorSpace=ps,n.shadowMap.enabled=!0,n.shadowMap.type=rh,n.shadowMap.autoUpdate=!1,this.renderer=n,this.scene=new ir,this.scene.fog=new Vr(15921642,60,330),this.camera=new an(85,16/9,.07,1500),this.camera.rotation.order="YXZ";let i=new jr(16777215,1);i.position.set(-36,64,30),i.castShadow=!0;let r=i.shadow.camera;r.left=-46,r.right=46,r.top=34,r.bottom=-34,r.near=1,r.far=200,i.shadow.mapSize.set(2048,2048),i.shadow.bias=-8e-4,i.shadow.normalBias=.02,this.sun=i,this.scene.add(i,i.target),$t.uLightDir.value.copy(i.position).normalize(),this.sky=new ie(new ys(1200,24,12),$f()),this.sky.renderOrder=-10,this.sky.frustumCulled=!1,this.scene.add(this.sky);let o=rp();this.clouds=new Je;let a=new ie(o.solid,ui({fog:!1})),l=new ie(o.edges,Kn({fog:!1}));l.frustumCulled=!1,this.clouds.add(a,l),this.scene.add(this.clouds),this.atlas=new ec,$t.uAtlas.value=this.atlas.texture,this.scoreTex=new nc,this.screenMat=Yf(this.scoreTex.texture),this.staticMat=ui({crowd:!0,atlas:!0}),this.staticEdgeMat=Kn({crowd:!0}),this.casterMat=ui({}),this.casterEdgeMat=Kn({}),this.netMat=Kn({net:!0,role:D.NET,widthScale:.5}),this.nets=new ie(np(),this.netMat),this.nets.frustumCulled=!1,this.scene.add(this.nets),this.netState=[{amp:0,t:9,x:0,y:0,z:0,dx:1,dy:0,dz:0,count:0},{amp:0,t:9,x:0,y:0,z:0,dx:-1,dy:0,dz:0,count:0}],this.blobs=new sc(24),this.markers=new rc,this.burst=new oc(200),this.scene.add(this.blobs.mesh,this.markers.group,this.burst.mesh),this.venue=null,this.venueObjs=[],this.batch=null,this.animators=[],this.match=null,this.style="classic",this.fov=85,this.time=0,this.shake=0,this.ballPos=new L,this.ballQ=new Be,this.ballM=new oe,this.crowdLevel=0,this.localPlayer=null,this.firstPerson=!0,this.hideHead=!0,this.hfov=100,this.wide=null,this.resize()}setQuality(t){this.quality=t;let e=window.devicePixelRatio||1,n=t==="low"?Math.min(1,e)*.75:Math.min(t==="medium"?1.25:2,e);this.renderer.setPixelRatio(n*(this.resScale||1));let i=t==="high"?2048:1024;this.sun.shadow.mapSize.x!==i&&(this.sun.shadow.mapSize.set(i,i),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null)),this.resize()}setResolutionScale(t){Math.abs(t-(this.resScale||1))<.01||(this.resScale=t,this.setQuality(this.quality))}resize(){let t=this.canvas.clientWidth||window.innerWidth,e=this.canvas.clientHeight||window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix();let n=this.renderer.getPixelRatio();$t.uResolution.value.set(t*n,e*n),this.pixelRatio=n,this.applyLineWidth()}applyLineWidth(){let t=Al[this.style],e=this.pixelRatio||1;$t.uLineWidth.value=t.lineWidth*e,$t.uMinWidth.value=Math.min(t.lineWidth,1.1)*e,$t.uTaper.value=t.name==="neo"?16:40}setStyle(t){let e=Hf(t);this.style=e.name,$t.uToon.value=e.toon,$t.uShadowAmt.value=e.shadow,this.renderer.shadowMap.autoUpdate=e.shadow>0,this.renderer.shadowMap.needsUpdate=e.shadow>0,this.scene.fog.color.set(e.fog),this.scene.fog.near=e.fogNear,this.scene.fog.far=e.fogFar,this.clouds.visible=e.clouds,this.blobShowPlayers=e.blobs,this.applyLineWidth(),this.match&&this.updateScoreboard(!0),document.documentElement.dataset.style=e.name}setVenue(t,e={}){let n=`${t}|${e.homeName}|${e.final}|${this.quality}`;if(this.venueKey===n)return;this.venueKey=n;for(let c of this.venueObjs)this.scene.remove(c),c.geometry.dispose();this.venueObjs=[];let i=sp(t,{atlas:this.atlas,quality:this.quality,homeName:e.homeName||"HOME",final:!!e.final,seed:e.seed||7});this.venue=i;let r=new ie(i.solid,this.staticMat);r.receiveShadow=!0;let o=new ie(i.edges,this.staticEdgeMat);o.frustumCulled=!1;let a=new ie(i.casterSolid,this.casterMat);a.castShadow=!0,a.receiveShadow=!0;let l=new ie(i.casterEdges,this.casterEdgeMat);l.frustumCulled=!1,this.venueObjs.push(r,o,a,l);for(let c of i.screens){let h=new ie(new Rn(c.w,c.h),this.screenMat);h.position.set(c.x,c.y,c.z),h.rotation.y=c.ry+Math.PI,h.translateZ(-.06),this.venueObjs.push(h)}for(let c of this.venueObjs)this.scene.add(c);this.renderer.shadowMap.needsUpdate=!0}setMatch(t,e){this.match=t,e&&Gf(e.kits,e.human),this.rebuildCharacters(),this.burst.clear(),this.netState.forEach(n=>{n.amp=0,n.t=9}),this.updateScoreboard(!0)}rebuildCharacters(){this.batch&&(this.scene.remove(this.batch.mesh,this.batch.edges),this.batch.dispose()),this.batch=new kl(this.match.players,this.atlas),this.scene.add(this.batch.mesh,this.batch.edges),this.animators=this.match.players.map(t=>new jl(t))}updateScoreboard(t){let e=this.match;e&&(this.scoreTex.update(e.teams[0].short||"HOM",e.teams[1].short||"AWY",e.scoreline,e.displayClock.slice(0,2)+"'",this.style,e.phase==="fulltime"),t&&(this.scoreTex.key=""))}render(t,e,n,i={}){let r=this.match;if(this.time+=e,$t.uTime.value=this.time,this.crowdLevel=Math.max(i.crowd??0,this.crowdLevel-e*.35),$t.uCrowd.value=this.crowdLevel,r&&this.batch){let o=r.time-(1-t)*.008333333333333333,a=r.ball;this.ballPos.set(a.prevPos.x+(a.pos.x-a.prevPos.x)*t,a.prevPos.y+(a.pos.y-a.prevPos.y)*t,a.prevPos.z+(a.pos.z-a.prevPos.z)*t);let l=this._qa||(this._qa=new Be),c=this._qb||(this._qb=new Be);l.set(a.prevQ[0],a.prevQ[1],a.prevQ[2],a.prevQ[3]),c.set(a.q[0],a.q[1],a.q[2],a.q[3]),this.ballQ.slerpQuaternions(l,c,t),this.ballM.compose(this.ballPos,this.ballQ,this._one||(this._one=new L(1,1,1))),this.batch.setMatrix(this.batch.ballRow,this.ballM);let h={match:r,alpha:t,dt:e,now:o,ball:this.ballPos,local:!1};this.blobs.begin();for(let u=0;u<this.animators.length;u++){let f=this.animators[u],g=f.p;h.local=g===this.localPlayer&&this.firstPerson;let x=f.update(h),p=u*br;for(let m=0;m<br;m++)this.batch.setMatrix(p+m,x[m]);if(h.local&&this.hideHead&&(this.batch.hide(p+Ot.HEAD),this.batch.hide(p+Ot.TORSO),this.isWide()))for(let m of[Ot.UARM_L,Ot.UARM_R,Ot.FARM_L,Ot.FARM_R])this.batch.hide(p+m);this.blobShowPlayers&&this.blobs.add(f.root.x,f.root.z,.95,.2)}let d=Math.max(0,this.ballPos.y-fe);this.blobs.add(this.ballPos.x,this.ballPos.z,.34+d*.12,.42/(1+d*.8)),this.blobs.end(),this.batch.commit(),this.updateNets(e),this.updateScoreboard(!1)}this.burst.update(e),this.updateCamera(n,e,t),this.isWide()?this.renderWide():this.renderer.render(this.scene,this.camera)}isWide(){return this.hfov>Rs+.01}ensureWide(t){let e=this.wide;if(!e){let n=new Oe({uniforms:{tCube:{value:null},uRot:{value:new Wt},uD:{value:0},uR:{value:1},uAspect:{value:1}},vertexShader:gb,fragmentShader:xb,depthTest:!1,depthWrite:!1}),i=new ie(new Rn(2,2),n);i.frustumCulled=!1;let r=new ir;r.add(i),e=this.wide={mat:n,scene:r,cam:new $i(-1,1,1,-1,0,1),rt:null,cube:null,size:0,fwd:new L,dir:new L}}return(!e.rt||Math.abs(t-e.size)/e.size>.15)&&(e.rt&&e.rt.dispose(),e.rt=new gr(t,{generateMipmaps:!1,minFilter:Xe,magFilter:Xe}),e.cube=new ar(this.camera.near,this.camera.far,e.rt),e.size=t,e.mat.uniforms.tCube.value=e.rt.texture),e}renderWide(){let t=this.renderer,e=this.camera,{d:n,R:i}=kp(this.hfov),r=t.getDrawingBufferSize(this._buf||(this._buf=new Zt)),o=r.x/r.y,a=r.x/2/i,l=this.quality==="low"?1024:this.quality==="medium"?1536:2048,c=this.quality==="low"?1:1.35,h=bs.clamp(Math.round(2*a*c/64)*64,512,l),d=this.ensureWide(h),u=d.cube;u.coordinateSystem!==t.coordinateSystem&&(u.coordinateSystem=t.coordinateSystem,u.updateCoordinateSystem()),e.updateMatrixWorld(),u.position.copy(e.position),u.updateMatrixWorld();let f=$t.uResolution.value,g=f.x,x=f.y,p=$t.uLineWidth.value,m=$t.uMinWidth.value,M=d.size/2/a;f.set(d.size,d.size),$t.uLineWidth.value=p*M,$t.uMinWidth.value=m*M,e.getWorldDirection(d.fwd);let y=i*Math.sqrt(1+1/(o*o)),v=n+1,b=Math.atan2(y,v)+Math.asin(Math.min(1,y*n/Math.sqrt(v*v+y*y))),S=Math.cos(Math.min(Math.PI,b+.96)),E=t.shadowMap.autoUpdate;E&&(t.shadowMap.autoUpdate=!1,t.shadowMap.needsUpdate=!0);let _=t.getRenderTarget(),A=0;for(let P=0;P<6;P++){let N=u.children[P];N.getWorldDirection(d.dir),!(d.dir.dot(d.fwd)<S)&&(t.setRenderTarget(d.rt,P),t.render(this.scene,N),A+=t.info.render.calls)}t.shadowMap.autoUpdate=E,t.setRenderTarget(_),f.set(g,x),$t.uLineWidth.value=p,$t.uMinWidth.value=m;let C=d.mat.uniforms;C.uRot.value.setFromMatrix4(e.matrixWorld),C.uD.value=n,C.uR.value=i,C.uAspect.value=o,t.render(d.scene,d.cam),this.wideCalls=A+1}projectToScreen(t,e){let n=this.camera;if(!this.isWide()){if(e.copy(t).applyMatrix4(n.matrixWorldInverse),e.z>-.05){let f=e.x>=0?1:-1,g=bs.clamp(e.y/(Math.hypot(e.x,e.z)+.001),-.6,.6);return e.set(f*50,g*50,0)}return e.applyMatrix4(n.projectionMatrix)}let{d:i,R:r}=kp(this.hfov);e.copy(t).applyMatrix4(n.matrixWorldInverse);let o=e.length()||1,a=-e.z/o,l=Math.hypot(e.x,e.y)||1e-6,c=e.x/l,h=e.y/l,d=i+a,u=d>1e-4?(i+1)*Math.sqrt(Math.max(0,1-a*a))/d:1e4;return e.set(c*u/r,h*u*n.aspect/r,0),e}updateNets(t){let e=this.match.ball;for(let n=0;n<2;n++){let i=this.netState[n],r=e.net[n];r&&r.count!==i.count?(i.count=r.count,i.amp=Math.max(i.amp*.9,Math.min(.6,.12+r.depth*2)),i.x=r.x,i.y=r.y,i.z=r.z,i.dx=-r.nx,i.dy=-r.ny,i.dz=-r.nz,i.t=0,i.contact=!0,r.depth=0):(i.t+=t,i.contact=!1);let o=i.amp*Math.cos(i.t*14)*Math.exp(-i.t*3.4);i.t>3&&(i.amp=0);let a=n===0?$t.uNetA.value:$t.uNetB.value,l=n===0?$t.uNetDA.value:$t.uNetDB.value;a.set(i.x,i.y,i.z,o),l.set(i.dx,i.dy,i.dz)}}updateCamera(t,e,n){let i=this.camera;if(t.fov){let r;if(i.aspect<1)this.hfov=Math.min(t.fov,Rs),r=bs.clamp(Math.min(t.fov,110),35,110);else{this.hfov=t.mode==="fp"?t.fov:Math.min(t.fov,Rs);let o=Math.min(this.hfov,Rs);r=bs.clamp(2*Math.atan(Math.tan(o*Math.PI/360)/i.aspect)*180/Math.PI,35,110)}Math.abs(r-i.fov)>.01&&(i.fov=r,i.updateProjectionMatrix())}else this.hfov=Math.min(this.hfov,Rs);if(t.mode==="fp"&&this.localPlayer&&this.match){let r=this.localPlayer,o=r.prevPos.x+(r.pos.x-r.prevPos.x)*n,a=r.prevPos.z+(r.pos.z-r.prevPos.z)*n,l=t.eye??1.65;if(t.bob){let c=Math.min(1,r.speed/7.5);l+=Math.sin((r.prevGait+(r.gait-r.prevGait)*n)*Math.PI*4)*.012*c*t.bob}if(i.position.set(o+Math.sin(t.yaw)*.08,l,a+Math.cos(t.yaw)*.08),t.shake&&this.shake>0){let c=this.shake*t.shake;i.position.x+=(Math.random()-.5)*.02*c,i.position.y+=(Math.random()-.5)*.02*c}this.shake=Math.max(0,this.shake-e*4),i.rotation.set(t.pitch,t.yaw+Math.PI,0,"YXZ")}else if(t.mode==="orbit"){let r=t.angle;i.position.set(Math.cos(r)*t.radius,t.height,Math.sin(r)*t.radius),i.lookAt(t.target||this._origin||(this._origin=new L))}else if(t.pos){let r=t.pos,o=t.look;i.position.set(r.x??r[0],r.y??r[1],r.z??r[2]),o?i.lookAt(o.x??o[0],o.y??o[1],o.z??o[2]):i.rotation.set(t.pitch||0,(t.yaw||0)+Math.PI,0,"YXZ")}}celebrate(t,e,n,i=1){let r=this.style==="neo"?[n===0?D.SHIRT_0:D.SHIRT_1,D.GOLD,D.MARKER,D.LINES,D.STAND_C]:[D.INK,D.LINES,n===0?D.SHIRT_0:D.SHIRT_1];this.burst.spawn(t,1.5,e,Math.round(70*i),r,7)}renderPreview(t,e,n,i){let r=this.style,o=new ln(e,n,{samples:4}),a=$t.uResolution.value.clone(),l=this.camera.aspect;this.setStyle(t),$t.uResolution.value.set(e,n),$t.uLineWidth.value=Al[t].lineWidth,this.camera.aspect=e/n,this.camera.updateProjectionMatrix();let c=this.camera.position.clone(),h=this.camera.quaternion.clone();i&&(this.camera.position.set(i.pos[0],i.pos[1],i.pos[2]),this.camera.lookAt(new L(i.look[0],i.look[1],i.look[2]))),this.renderer.shadowMap.needsUpdate=!0,this.renderer.setRenderTarget(o),this.renderer.render(this.scene,this.camera);let d=new Uint8Array(e*n*4);this.renderer.readRenderTargetPixels(o,0,0,e,n,d),this.renderer.setRenderTarget(null),o.dispose();let u=document.createElement("canvas");u.width=e,u.height=n;let f=u.getContext("2d"),g=f.createImageData(e,n);for(let x=0;x<n;x++)g.data.set(d.subarray((n-1-x)*e*4,(n-x)*e*4),x*e*4);return f.putImageData(g,0,0),this.setStyle(r),this.camera.position.copy(c),this.camera.quaternion.copy(h),$t.uResolution.value.copy(a),this.applyLineWidth(),this.camera.aspect=l,this.camera.updateProjectionMatrix(),u.toDataURL("image/png")}stats(){let t=this.renderer.info;return{calls:this.isWide()?this.wideCalls:t.render.calls,tris:t.render.triangles,people:this.venue?this.venue.people:0,wide:this.isWide()}}};function Ar(s){let t=s>>>0;return()=>(t=t*1664525+1013904223>>>0,t/2147483648-1)}function Fp(s,t){let e=Math.exp(-2*Math.PI*t/44100),n=0;for(let i=0;i<s.length;i++)n=(1-e)*s[i]+e*n,s[i]=n}function yb(s,t){let e=Math.exp(-2*Math.PI*t/44100),n=0,i=0;for(let r=0;r<s.length;r++){let o=s[r];n=e*(n+o-i),i=o,s[r]=n}}function cc(s,t,e){let n=2*Math.PI*t/44100,i=Math.sin(n)/(2*e),r=Math.cos(n),o=i,a=-i,l=1+i,c=-2*r,h=1-i,d=0,u=0,f=0,g=0;for(let x=0;x<s.length;x++){let p=s[x],m=(o*p+a*u-c*f-h*g)/l;u=d,d=p,g=f,f=m,s[x]=m}}function Ri(s,t=.9){let e=0;for(let n=0;n<s.length;n++)e=Math.max(e,Math.abs(s[n]));if(e>0)for(let n=0;n<s.length;n++)s[n]*=t/e;return s}function bo(s,t,e,n,i,r){let o=Math.floor(44100*s),a=new Float32Array(o),l=Ar(r),c=0;for(let h=0;h<o;h++){let d=h/44100,u=e+(t-e)*Math.exp(-d*38);c+=2*Math.PI*u/44100;let f=Math.exp(-d*(s>.12?26:40));a[h]=Math.sin(c)*f+l()*i*Math.exp(-d*140)+(h<44100*.004?l()*n:0)}return Fp(a,5e3),Ri(a,.95)}function vb(s){let t=Math.floor(52920),e=new Float32Array(t),n=Ar(s),i=[[523,1],[1320,.6],[2130,.45],[3310,.3],[4870,.2]];for(let r=0;r<t;r++){let o=r/44100,a=0;for(let[l,c]of i)a+=Math.sin(2*Math.PI*l*o)*c*Math.exp(-o*(3+l/900));e[r]=a+n()*.3*Math.exp(-o*120)}return Ri(e,.8)}function vu(s,t,e,n,i,r){let o=Math.floor(44100*s),a=new Float32Array(o),l=Ar(r);for(let c=0;c<o;c++){let h=c/44100;a[c]=l()*Math.min(1,h/n)*Math.exp(-h*i)}return t&&Fp(a,t),e&&yb(a,e),Ri(a,.8)}function Up(s){let t=Math.floor(44100*s.reduce((i,[r,o])=>i+r+o,0)),e=new Float32Array(t),n=0;for(let[i,r]of s){let o=Math.floor(44100*i),a=0;for(let l=0;l<o;l++){let c=l/44100,h=2950+90*Math.sin(2*Math.PI*28*c)+40*Math.sin(2*Math.PI*7*c);a+=2*Math.PI*h/44100;let d=Math.min(1,c/.02)*Math.min(1,(i-c)/.04);e[n+l]=(Math.sin(a)*.7+Math.sin(a*2)*.12)*d}n+=o+Math.floor(44100*r)}return Ri(e,.55)}function _b(s,t=6){let e=Math.floor(44100*t),n=new Float32Array(e),i=Ar(s);for(let a=0;a<e;a++)n[a]=i();let r=new Float32Array(e);for(let[a,l,c]of[[420,1.2,1],[900,1.5,.8],[1800,2,.4],[260,.9,.7]]){let h=n.slice();cc(h,a,l);let d=i()*6;for(let u=0;u<e;u++)r[u]+=h[u]*c*(.75+.25*Math.sin(2*Math.PI*(u/e)*3+d))}let o=Math.floor(44100*.5);for(let a=0;a<o;a++){let l=a/o;r[a]=r[a]*l+r[e-o+a]*(1-l)}return Ri(r.subarray(0,e-o),.6)}function bb(s,t=3.2){let e=Math.floor(44100*t),n=new Float32Array(e),i=Ar(s);for(let o=0;o<e;o++)n[o]=i();let r=new Float32Array(e);for(let[o,a,l]of[[700,1.4,1],[1300,1.8,.7],[2500,2.2,.35],[380,1,.6]]){let c=n.slice();cc(c,o,a);for(let h=0;h<e;h++)r[h]+=c[h]*l}for(let o=0;o<e;o++){let a=o/44100;r[o]*=Math.min(1,a/.25)*Math.exp(-Math.max(0,a-1.2)*1.3)}return Ri(r,.85)}function Mb(s){let t=Math.floor(70560),e=new Float32Array(t),n=Ar(s);for(let r=0;r<t;r++)e[r]=n();let i=new Float32Array(t);for(let r=0;r<3;r++){let o=e.slice();cc(o,380+r*180,3);for(let a=0;a<t;a++)i[a]+=o[a]}for(let r=0;r<t;r++){let o=r/44100;i[r]*=Math.min(1,o/.15)*Math.exp(-o*1.6)*(1-.3*o/1.6)}return Ri(i,.7)}function Op(s,t,e){let n=Math.floor(44100*t),i=new Float32Array(n);for(let r=0;r<n;r++){let o=r/44100;i[r]=Math.sin(2*Math.PI*s*o)*Math.exp(-o*30)*Math.min(1,o/.003)}return Ri(i,.5)}function Sb(s){let t=Math.floor(12348.000000000002),e=new Float32Array(t),n=0;for(let r=0;r<t;r++){let a=210-60*(r/44100);n+=a/44100,e[r]=n%1*2-1}let i=new Float32Array(t);for(let[r,o,a]of[[650,5,1],[1700,7,.6],[2600,8,.3]]){let l=e.slice();cc(l,r,o);for(let c=0;c<t;c++)i[c]+=l[c]*a}for(let r=0;r<t;r++){let o=r/44100;i[r]*=Math.min(1,o/.02)*Math.exp(-o*7)}return Ri(i,.6)}var lc=class{constructor(){this.ctx=null,this.buffers={},this.vol={master:.8,sfx:.9,crowd:.6},this.ready=!1,this.crowdLevel=.3,this.muted=!1}init(){if(this.ctx)return;let t=window.AudioContext||window.webkitAudioContext;if(!t)return;try{this.ctx=new t({latencyHint:"interactive"})}catch{return}let e=this.ctx;this.master=e.createGain(),this.sfx=e.createGain(),this.crowd=e.createGain(),this.sfx.connect(this.master),this.crowd.connect(this.master),this.master.connect(e.destination);let n={touch:bo(.07,260,120,.25,.25,1),pass:bo(.1,220,90,.5,.35,2),shot:bo(.16,190,60,1,.7,3),bounce:bo(.08,140,70,.1,.1,4),post:vb(5),net:vu(.6,3e3,400,.01,7,6),tackle:vu(.18,1800,120,.004,22,7),slide:vu(.55,2400,500,.03,5,8),catch:bo(.1,160,80,.6,.6,9),whistle:Up([[.32,0]]),whistleLong:Up([[.3,.12],[.3,.12],[.75,0]]),crowd:_b(10),cheer:bb(11),groan:Mb(12),ui:Op(1400,.06,13),ack:Op(1900,.09,14),shout:Sb(15)};for(let[i,r]of Object.entries(n)){let o=e.createBuffer(1,r.length,44100);o.copyToChannel(r,0),this.buffers[i]=o}this.applyVolumes(),this.ready=!0}resume(){this.ctx&&this.ctx.state!=="running"&&!this.muted&&this.ctx.resume().catch(()=>{})}suspend(){this.ctx&&this.ctx.state==="running"&&this.ctx.suspend().catch(()=>{})}setMuted(t){this.muted=t,t?this.suspend():this.resume()}setVolumes(t){Object.assign(this.vol,t),this.applyVolumes()}applyVolumes(){this.ctx&&(this.master.gain.value=this.vol.master,this.sfx.gain.value=this.vol.sfx,this.crowd.gain.value=this.vol.crowd)}play(t,e={}){if(!this.ready||this.ctx.state!=="running")return;let n=this.buffers[t];if(!n)return;let i=this.ctx,r=i.createBufferSource();r.buffer=n,e.rate&&(r.playbackRate.value=e.rate);let o=i.createGain();o.gain.value=e.gain??1;let a=o;if(e.pan&&i.createStereoPanner){let l=i.createStereoPanner();l.pan.value=Math.max(-1,Math.min(1,e.pan)),o.connect(l),a=l}return r.connect(o),a.connect(e.group==="crowd"?this.crowd:this.sfx),r.start(),r}startCrowd(t=.4){if(!this.ready)return;this.stopCrowd();let e=this.ctx;this.crowdSrc=e.createBufferSource(),this.crowdSrc.buffer=this.buffers.crowd,this.crowdSrc.loop=!0,this.crowdGain=e.createGain(),this.crowdGain.gain.value=0,this.crowdSrc.connect(this.crowdGain).connect(this.crowd),this.crowdSrc.start(),this.baseCrowd=t,this.setExcitement(0)}stopCrowd(){if(this.crowdSrc){try{this.crowdSrc.stop()}catch{}this.crowdSrc.disconnect(),this.crowdSrc=null}}setExcitement(t){if(!this.crowdGain)return;let e=this.baseCrowd*(.45+.9*Math.min(1,t));this.crowdGain.gain.setTargetAtTime(e,this.ctx.currentTime,.4)}};var _u=[["W A S D","Move (relative to where you look)"],["Mouse","Look"],["Shift","Sprint"],["Left mouse","Shoot (hold to charge, release to strike)"],["Right mouse","Pass to the highlighted teammate (hold briefly for more power)"],["Space","Through pass (with the ball) / call for a pass (without it)"],["E","Standing tackle (lunges at the ball when it is close)"],["C","Slide tackle"],["Esc","Pause"]],bu=[["Left thumb","Drag anywhere on the left side to move; push to the edge of the stick to sprint"],["Right thumb","Drag anywhere on the right side to look and aim"],["SHOOT","Hold to charge, release to strike (slide your thumb on it to fine-tune the aim)"],["PASS","Pass to the ringed teammate (hold briefly for more power)"],["THRU / CALL","Through pass with the ball; call for the ball without it"],["TACKLE / SLIDE","Replace SHOOT and PASS while an opponent has the ball"],["II","Pause"]],hc=class{constructor(t){this.el=t,this.keys=new Set,this.lookX=0,this.lookY=0,this.buttons=0,this.locked=!1,this.lockSupported="requestPointerLock"in t,this.dragMode=!this.lockSupported,this.active=!1,this.listeners=[],this.onPause=null,this.onLockLost=null,this.onLockError=null,this.sensitivity=1,this.invertY=!1,this.lastLockExit=0,this.touchMode=!1,this.touch={active:!1,f:0,r:0,sprint:!1},this.lastTouchAt=-1e9,this.handlers={keydown:e=>this.keydown(e),keyup:e=>this.keyup(e),mousemove:e=>this.mousemove(e),mousedown:e=>this.mousedown(e),mouseup:e=>this.mouseup(e),contextmenu:e=>{this.active&&e.preventDefault()},plc:()=>this.lockChange(),ple:()=>{this.locked=!1,this.onLockError&&this.onLockError()},blur:()=>{this.keys.clear(),this.releaseAll()},touchSeen:e=>{(e.pointerType==="touch"||e.pointerType==="pen")&&(this.lastTouchAt=performance.now())}},window.addEventListener("pointerdown",this.handlers.touchSeen,!0),window.addEventListener("pointerup",this.handlers.touchSeen,!0),window.addEventListener("keydown",this.handlers.keydown),window.addEventListener("keyup",this.handlers.keyup),window.addEventListener("mousemove",this.handlers.mousemove),window.addEventListener("mousedown",this.handlers.mousedown),window.addEventListener("mouseup",this.handlers.mouseup),window.addEventListener("contextmenu",this.handlers.contextmenu),document.addEventListener("pointerlockchange",this.handlers.plc),document.addEventListener("pointerlockerror",this.handlers.ple),window.addEventListener("blur",this.handlers.blur)}on(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(e=>e!==t)}}emit(t,e){for(let n of this.listeners)n(t,e)}requestLock(){if(!this.lockSupported)return this.dragMode=!0,!1;try{let t=this.el.requestPointerLock();t&&t.catch&&t.catch(()=>{this.onLockError&&this.onLockError()})}catch{return this.dragMode=!0,!1}return!0}exitLock(){document.pointerLockElement&&document.exitPointerLock()}lockChange(){let t=this.locked;this.locked=document.pointerLockElement===this.el,this.locked&&(this.dragMode=!1,!t&&this.onLockGained&&this.onLockGained()),t&&!this.locked&&(this.lastLockExit=performance.now(),this.releaseAll(),this.active&&this.onLockLost&&this.onLockLost())}releaseAll(){this.buttons&1&&this.emit("shoot",!1),this.buttons&2&&this.emit("pass",!1),this.buttons=0,this.touch.active=!1,this.touch.f=0,this.touch.r=0,this.touch.sprint=!1,this.onReleaseAll&&this.onReleaseAll()}fromTouch(t){return t.sourceCapabilities&&t.sourceCapabilities.firesTouchEvents||performance.now()-this.lastTouchAt<900}touchAction(t,e){this.active&&(t==="shoot"&&(e?this.buttons|=1:this.buttons&=-2),t==="pass"&&(e?this.buttons|=2:this.buttons&=-3),!(!e&&(t==="tackle"||t==="slide"))&&this.emit(t,e))}touchLook(t,e){this.active&&(this.lookX+=t,this.lookY+=e)}keydown(t){let e=t.code;if(e==="Escape"){this.onPause&&this.onPause();return}this.active&&(["Space","ShiftLeft","ShiftRight","KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e)&&t.preventDefault(),!t.repeat&&(this.keys.add(e),e==="Space"?this.emit("through",!0):e==="KeyE"?this.emit("tackle",!0):e==="KeyC"?this.emit("slide",!0):e==="KeyP"&&this.onPause&&this.onPause()))}keyup(t){this.keys.delete(t.code),t.code==="Space"&&this.emit("through",!1)}mousedown(t){!this.active||this.fromTouch(t)||!this.locked&&!this.dragMode||t.target!==this.el&&!this.locked||(t.button===0&&(this.buttons|=1,this.emit("shoot",!0)),t.button===2&&(this.buttons|=2,this.emit("pass",!0),t.preventDefault()))}mouseup(t){this.fromTouch(t)||(t.button===0&&this.buttons&1&&(this.buttons&=-2,this.emit("shoot",!1)),t.button===2&&this.buttons&2&&(this.buttons&=-3,this.emit("pass",!1)))}mousemove(t){!this.active||this.fromTouch(t)||(this.locked||this.dragMode&&t.buttons&7)&&(this.lookX+=t.movementX||0,this.lookY+=t.movementY||0)}axes(){let t=this.keys,e=(t.has("KeyW")?1:0)-(t.has("KeyS")?1:0),n=(t.has("KeyD")?1:0)-(t.has("KeyA")?1:0),i=t.has("ShiftLeft")||t.has("ShiftRight"),r=this.touch;return r.active&&(e=Math.max(-1,Math.min(1,e+r.f)),n=Math.max(-1,Math.min(1,n+r.r)),i=i||r.sprint),{f:e,r:n,sprint:i}}consumeLook(t,e){let n=.0022*this.sensitivity;t.yaw-=this.lookX*n,t.pitch-=this.lookY*n*(this.invertY?-1:1);let i=this.keys,r=2.2*e*this.sensitivity;i.has("ArrowLeft")&&(t.yaw+=r),i.has("ArrowRight")&&(t.yaw-=r),i.has("ArrowUp")&&(t.pitch+=r*.6*(this.invertY?-1:1)),i.has("ArrowDown")&&(t.pitch-=r*.6*(this.invertY?-1:1)),this.lookX=0,this.lookY=0,t.pitch=Math.max(-1.35,Math.min(1,t.pitch))}get held(){return{lmb:!!(this.buttons&1),rmb:!!(this.buttons&2)}}};var De=(s,t,e,n)=>{let i=document.createElement(s);return t&&(i.className=t),n!=null&&(i.innerHTML=n),e&&e.appendChild(i),i},uc=class{constructor(t){this.root=De("div","hud hidden",t),this.poss=De("div","hud-poss",this.root),De("div","hud-poss-label",this.poss,"YOU HAVE THE BALL"),this.hasBall=!1;let e=De("div","hud-top",this.root);this.teamA=De("span","hud-team",e),this.score=De("span","hud-score",e,"0 - 0"),this.teamB=De("span","hud-team",e),this.clock=De("div","hud-clock",this.root,"00:00"),this.phase=De("div","hud-phase",this.root);let n=De("div","hud-player",this.root);this.ratingEl=De("div","hud-rating",n,"6.0"),De("div","hud-rating-label",n,"RATING");let i=De("div","hud-stamina",n);this.stamFill=De("div","hud-stamina-fill",i),this.nameEl=De("div","hud-name",n),this.cross=De("div","hud-cross",this.root),this.power=De("div","hud-power hidden",this.root),this.powerFill=De("div","hud-power-fill",this.power),this.hint=De("div","hud-hint",this.root),this.notes=De("div","hud-notes",this.root),this.arrow=De("div","hud-arrow hidden",this.root),this.banner=De("div","hud-banner hidden",this.root),this.fade=De("div","hud-fade",this.root),this.radar=De("canvas","hud-radar",this.root),this.radar.width=180,this.radar.height=250,this.rctx=this.radar.getContext("2d"),this.lastNotes=[],this.v=new L,this.bannerUntil=0,this.fadeUntil=0}show(t){this.root.classList.toggle("hidden",!t)}notify(t,e=""){let n=De("div","hud-note "+e,this.notes,t);for(this.lastNotes.push(n),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700);this.notes.children.length>3;)this.notes.firstChild.remove()}showBanner(t,e="",n=2200,i=""){this.banner.className="hud-banner "+i,this.banner.innerHTML=`<div class="b-main">${t}</div>${e?`<div class="b-sub">${e}</div>`:""}`,this.bannerUntil=performance.now()+n}flashFade(){this.fade.classList.remove("on"),this.fade.offsetWidth,this.fade.classList.add("on")}update(t){let e=t.match,n=e.human;this.teamA.textContent=e.teams[0].short,this.teamB.textContent=e.teams[1].short,this.teamA.style.setProperty("--kit",t.kitA||"#c00"),this.teamB.style.setProperty("--kit",t.kitB||"#00c"),this.score.textContent=`${e.teams[0].score} - ${e.teams[1].score}`,this.clock.textContent=t.clockText??e.displayClock,this.phase.textContent=t.phaseText||"",n&&(this.ratingEl.textContent=e.stats.rating(n).toFixed(1),this.stamFill.style.width=`${Math.round(n.stamina*100)}%`,this.stamFill.classList.toggle("low",n.stamina<.3),this.nameEl.textContent=`${n.number} ${n.name}`);let i=n&&n.action,r=i&&i.type==="kick"&&(i.kind==="shot"||i.kind==="pass")&&!i.contacted&&i.charge>.01,o=t.intentCharge||0;this.power.classList.toggle("hidden",!(r||o>.01)),(r||o>.01)&&(this.powerFill.style.width=`${Math.round((r?i.charge:o)*100)}%`),this.hint.textContent=t.hint||"";let a=!!n&&e.ball.owner===n&&e.ball.state==="controlled"&&e.phase==="playing";a!==this.hasBall&&(this.hasBall=a,this.poss.classList.toggle("on",a)),this.banner.classList.toggle("hidden",performance.now()>this.bannerUntil),this.updateArrow(t),this.drawRadar(t)}updateArrow(t){let e=t.match,n=e.ball.pos,i=t.view.projectToScreen(this.v.set(n.x,n.y,n.z),this.v);if(!(Math.abs(i.x)>.98||Math.abs(i.y)>.98)||e.phase==="goal"||t.noArrow||this.hasBall){this.arrow.classList.add("hidden");return}let o=Math.atan2(i.y,i.x),a=.86,l=Math.min(a/Math.max(Math.abs(Math.cos(o)),.001),a/Math.max(Math.abs(Math.sin(o)),.001)),c=(Math.cos(o)*l*.5+.5)*100,h=(-Math.sin(o)*l*.5+.5)*100;this.arrow.classList.remove("hidden"),this.arrow.style.left=`${c}%`,this.arrow.style.top=`${h}%`,this.arrow.style.transform=`translate(-50%,-50%) rotate(${-o}rad)`}drawRadar(t){let e=t.match,n=this.rctx,i=this.radar.width,r=this.radar.height,o=e.human,a=o?o.team:0,l=e.attackDir(a),c=10,h=(i-c*2)/Q.W,d=(r-c*2)/Q.L,u=(p,m)=>[c+(Q.HW+m*l)*h,c+(Q.HL-p*l)*d],f=t.style;n.clearRect(0,0,i,r),n.fillStyle=f==="neo"?"rgba(40,180,70,0.85)":"rgba(250,250,245,0.82)",n.fillRect(0,0,i,r),n.strokeStyle=f==="neo"?"#fff":"#222",n.lineWidth=1,n.strokeRect(c,c,i-c*2,r-c*2),n.beginPath(),n.moveTo(c,r/2),n.lineTo(i-c,r/2),n.stroke(),n.beginPath(),n.arc(i/2,r/2,Kt.CIRCLE_R*h,0,Math.PI*2),n.stroke();for(let p of[Q.HL,-Q.HL]){let[m,M]=u(p,Kt.PEN_HW),[y,v]=u(p-Math.sign(p)*Kt.PEN_D,-Kt.PEN_HW);n.strokeRect(Math.min(m,y),Math.min(M,v),Math.abs(y-m),Math.abs(v-M));let[b,S]=u(p,ft.HW),[E]=u(p,-ft.HW);n.lineWidth=3,n.beginPath(),n.moveTo(b,S),n.lineTo(E,S),n.stroke(),n.lineWidth=1}for(let p of e.players){let[m,M]=u(p.pos.x,p.pos.z);n.fillStyle=p.team===0?t.kitA:t.kitB,n.strokeStyle="#111",n.beginPath(),n.arc(m,M,p===o?0:3.6,0,Math.PI*2),n.fill(),n.stroke()}if(o){let[p,m]=u(o.pos.x,o.pos.z),M=t.camYaw,y=Math.sin(M),b=Math.cos(M)*l,S=-y*l;n.fillStyle=f==="neo"?"#ffe45c":"#111",n.beginPath(),n.moveTo(p+b*9,m+S*9),n.lineTo(p-S*5-b*3,m+b*5-S*3),n.lineTo(p+S*5-b*3,m-b*5-S*3),n.closePath(),n.fill(),n.strokeStyle=f==="neo"?"#000":"#fff",n.stroke()}let[g,x]=u(e.ball.pos.x,e.ball.pos.z);n.fillStyle="#fff",n.strokeStyle="#000",n.lineWidth=1.5,n.beginPath(),n.arc(g,x,3,0,Math.PI*2),n.fill(),n.stroke()}};var Cs=(s,t,e,n)=>{let i=document.createElement(s);return t&&(i.className=t),n!=null&&(i.innerHTML=n),e&&e.appendChild(i),i};var wb={attack:{a:["shoot","SHOOT"],b:["pass","PASS"],c:["through","THRU"]},call:{a:["shoot","SHOOT"],b:["pass","PASS"],c:["through","CALL"]},defend:{a:["tackle","TACKLE"],b:["slide","SLIDE"],c:[null,""]}},dc=class{constructor(t,e){this.app=t,this.input=t.input;let n=this.root=Cs("div","touch hidden",e);this.zone=Cs("div","tc-zone",n),this.stick=Cs("div","tc-stick idle",n),this.knob=Cs("div","tc-knob",this.stick),this.btn={};for(let a of["c","b","a"])this.btn[a]=Cs("button",`tc-btn tc-${a}`,n),this.btn[a].dataset.k=a;this.pauseBtn=Cs("button","tc-pause",n,"<i></i><i></i>"),this.pauseBtn.setAttribute("aria-label","Pause"),Cs("div","tc-rotate",n,"Turn your phone sideways for a wider view"),this.ptrs=new Map,this.stickId=null,this.layout="attack",this.visible=!1,this.applyLayout();let i=a=>this.onDown(a),r=a=>this.onMove(a),o=a=>this.onUp(a);n.addEventListener("pointerdown",i),n.addEventListener("pointermove",r),n.addEventListener("pointerup",o),n.addEventListener("pointercancel",o),n.addEventListener("lostpointercapture",o),n.addEventListener("contextmenu",a=>a.preventDefault()),this.input.onReleaseAll=()=>this.reset()}setVisible(t){t!==this.visible&&(this.visible=t,this.root.classList.toggle("hidden",!t),t||this.reset())}reset(){for(let[,e]of this.ptrs)e.kind==="btn"&&this.btn[e.k].classList.remove("down");for(let[,e]of this.ptrs)e.kind==="btn"&&e.type&&this.input.touchAction(e.type,!1);this.ptrs.clear(),this.stickId=null;let t=this.input.touch;t.active=!1,t.f=0,t.r=0,t.sprint=!1,this.stick.classList.add("idle"),this.stick.classList.remove("sprint"),this.stick.style.left="",this.stick.style.top="",this.knob.style.transform=""}update(t){let e=t.match,n=t.human;if(!n)return;let i=e.ball,r=i.owner,o="call";r===n||e.phase==="restart"&&e.restart&&e.restart.taker===n?o="attack":r&&r.team!==n.team&&i.state==="controlled"&&(o="defend"),o!==this.layout&&(this.layout=o,this.applyLayout()),o==="defend"&&(this.btn.a.classList.toggle("cool",e.time<n.tackleReadyAt),this.btn.b.classList.toggle("cool",e.time<n.slideReadyAt))}applyLayout(){let t=wb[this.layout];for(let e of["a","b","c"]){let[n,i]=t[e],r=this.btn[e];r.textContent=i,r.dataset.type=n||"",r.classList.toggle("off",!n),r.classList.remove("cool")}}radius(){return Math.max(46,Math.min(72,Math.min(innerWidth,innerHeight)*.14))}onDown(t){if(t.pointerType==="mouse")return;t.preventDefault();let e=t.target;try{e.setPointerCapture(t.pointerId)}catch{}if(e===this.pauseBtn){this.ptrs.set(t.pointerId,{kind:"pause"});return}let n=e.classList.contains("tc-btn")?e.dataset.k:null;if(n){let i=this.btn[n].dataset.type;if(!i)return;this.ptrs.set(t.pointerId,{kind:"btn",k:n,type:i,x:t.clientX,y:t.clientY}),this.btn[n].classList.add("down"),this.input.touchAction(i,!0);return}if(t.clientX<innerWidth*.42&&this.stickId==null){this.stickId=t.pointerId;let i={kind:"stick",ox:t.clientX,oy:t.clientY};this.ptrs.set(t.pointerId,i),this.stick.classList.remove("idle"),this.placeStick(i),this.moveStick(i,t.clientX,t.clientY)}else this.ptrs.set(t.pointerId,{kind:"look",x:t.clientX,y:t.clientY})}onMove(t){let e=this.ptrs.get(t.pointerId);if(e){if(t.preventDefault(),e.kind==="stick")this.moveStick(e,t.clientX,t.clientY);else if(e.kind==="look"||e.kind==="btn"&&(e.type==="shoot"||e.type==="pass")){let n=e.kind==="look"?1.35:.9;this.input.touchLook((t.clientX-e.x)*n,(t.clientY-e.y)*n),e.x=t.clientX,e.y=t.clientY}}}onUp(t){let e=this.ptrs.get(t.pointerId);if(e){if(this.ptrs.delete(t.pointerId),e.kind==="pause"){t.type==="pointerup"&&this.app.pause();return}if(e.kind==="btn"){this.btn[e.k].classList.remove("down"),this.input.touchAction(e.type,!1);return}if(e.kind==="stick"){this.stickId=null;let n=this.input.touch;n.active=!1,n.f=0,n.r=0,n.sprint=!1,this.stick.classList.add("idle"),this.stick.classList.remove("sprint"),this.stick.style.left="",this.stick.style.top="",this.knob.style.transform=""}}}placeStick(t){this.stick.style.left=`${t.ox}px`,this.stick.style.top=`${t.oy}px`}moveStick(t,e,n){let i=this.radius(),r=e-t.ox,o=n-t.oy,a=Math.hypot(r,o),l=i*1.25;a>l&&(t.ox+=r/a*(a-l),t.oy+=o/a*(a-l),r=e-t.ox,o=n-t.oy,a=l,this.placeStick(t));let c=Math.min(1,a/i),h=.12,d=c<h?0:(c-h)/(1-h),u=this.input.touch;u.active=!0,u.f=a>0?-o/a*d:0,u.r=a>0?r/a*d:0,u.sprint=a/i>.92,this.stick.classList.toggle("sprint",u.sprint);let f=Math.min(a,i)/(a||1);this.knob.style.transform=`translate(${r*f}px, ${o*f}px)`}};var fc=class{constructor(){this.handlers=new Map,this.log=[],this.nextId=1,this.maxLog=4e3}on(t,e){return this.handlers.has(t)||this.handlers.set(t,[]),this.handlers.get(t).push(e),()=>{let n=this.handlers.get(t),i=n.indexOf(e);i>=0&&n.splice(i,1)}}emit(t,e){let n=Object.assign({id:this.nextId++,type:t},e);this.log.push(n),this.log.length>this.maxLog&&this.log.splice(0,this.log.length-this.maxLog);let i=this.handlers.get(t);if(i)for(let o=0;o<i.length;o++)i[o](n);let r=this.handlers.get("*");if(r)for(let o=0;o<r.length;o++)r[o](n);return n}};var gi=class{constructor(t=1){this.s=t>>>0||1}next(){let t=(this.s+=1831565813)>>>0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return Math.floor(this.range(t,e+1))}chance(t){return this.next()<t}pick(t){return t[Math.floor(this.next()*t.length)%t.length]}gauss(){return(this.next()+this.next()+this.next()+this.next()-2)*1.732}};function xi(s){let t=2166136261;for(let e=0;e<s.length;e++)t^=s.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function zp(s,t,e){let n=Math.abs(s);return n>Q.HL&&Math.abs(e)<ft.HW+.05&&t<ft.H+.05&&n<Ol(t)+.05}function Tb(s,t,e){let n=t.pos.x,i=t.pos.z,r=e.pos.x,o=e.pos.z;if(zp(r,e.pos.y,o)!==zp(n,.5,i))return!1;for(let a of s.players){if(a===t)continue;let l=Jn(a.pos.x,a.pos.z,n,i,r,o);if(l.t>.2&&l.t<.85&&l.d<.24)return!1}return!0}function Eb(s,t,e){let n=s.time;if(n<t.noCaptureUntil||n<t.downUntil)return!1;let i=t.action;if(i&&(i.type==="slide"||i.type==="dive"||i.type==="tackle"||i.type==="kick"&&!i.contacted)||t.isGK&&s.keeperHandles(t,e))return!1;let r=e.pos.x-t.pos.x,o=e.pos.z-t.pos.z,a=Math.sqrt(r*r+o*o),l=ve.CONTROL_RADIUS*(t.isHuman?s.assist.claim:1);if(a>l||e.pos.y>ve.CONTROL_HEIGHT)return!1;let c=-(r*(e.vel.x-t.vel.x)+o*(e.vel.z-t.vel.z))/(a||1);if(a>.72&&c>.6)return!1;let h=e.vel.x-t.vel.x,d=e.vel.z-t.vel.z,u=e.vel.y,f=Math.sqrt(h*h+d*d+u*u),g=(e.pos.y>.35?10.5:14.5)+t.attrs.control*.08+(t.isHuman?(s.assist.claim-1)*16:0);if(f>g||a>l*(1-ht((f-6)/14,0,.45)))return!1;let x=e.lastKick;if(x&&x.player!==t&&x.target!==t&&f>4){let m=x.player&&x.player.isHuman&&s.isOpp(t)?s.assist.oppHumanPassReact:.16;if(s.time-x.t<m)return!1}let p=e.owner;if(p){if(p.team===t.team)return!1;let m=p.pos.distXZ(e.pos),M=ve.PROTECT_RADIUS+(p.isHuman?.5*s.assist.stick:0);if(m<=M||a>=m-.05)return!1}return Tb(s,t,e)}function Bp(s,t){let e=s.ball;if(e.state==="held"||e.state==="dead")return;let n=s.time,i=e.owner;i&&(i.pos.distXZ(e.pos)>ve.LOSE_RADIUS||e.pos.y>1.7||n<i.downUntil||i.action&&i.action.type==="slide")&&s.loseControl("loose");let r=null,o=1e9;for(let a of s.players){if(a===e.owner||!Eb(s,a,e))continue;let l=a.pos.distXZ(e.pos);(l<o-1e-6||Math.abs(l-o)<=1e-6&&r&&a.id<r.id)&&(r=a,o=l)}r&&(Ab(s,r),s.gainControl(r)),e.owner&&e.state==="controlled"&&Rb(s,e.owner,t)}function Ab(s,t){let e=s.ball,n=e.vel.x-t.vel.x,i=e.vel.z-t.vel.z,r=Math.sqrt(n*n+i*i+e.vel.y*e.vel.y),o=t.attrs.control/100,a=ht((r-4)/15,0,1)*(1.15-o*.7);if(t.isHuman)a*=s.assist.touch;else if(s.isOpp(t)){let S=s.aiParams[t.team].touch;a=Math.min(1.2,a*S+.04*(S-1))}let l=Math.hypot(t.desired.x,t.desired.z),c,h;l>1?(c=t.desired.x/l,h=t.desired.z/l):(c=Math.sin(t.yaw),h=Math.cos(t.yaw));let d=.7+a*3+(t.sprint&&l>1?1.2:0);t.isHuman&&(d*=1-.45*s.assist.stick);let u=s.rng.gauss()*a*.45,f=Math.cos(u),g=Math.sin(u),x=c*f+h*g,p=-c*g+h*f,m=l>1?.95:.6,M=t.vel.x*m+x*d,y=t.vel.z*m+p*d,v=0;e.pos.y>.2&&(v=Math.min(0,e.vel.y)*.15-.4),e.setVelocity(new ot(M,v,y)),e.sideSpin=0;let b=(e.pos.x-t.pos.x)*Math.cos(t.yaw)-(e.pos.z-t.pos.z)*Math.sin(t.yaw);t.touch={foot:b>0?"L":"R",time:s.time,x:e.pos.x,y:e.pos.y,z:e.pos.z,kind:"receive"},t.lastDribbleTouch=s.time,s.events.emit("touch",{player:t,kind:"receive",strength:r,t:s.time})}function Rb(s,t,e){let n=t.action;if(n&&(n.type==="kick"&&!n.charging||n.type==="tackle"||n.type==="slide"))return;let i=!!(n&&n.type==="kick"&&n.charging);if(t.isHuman&&s.assist.stick>0){Cb(s,t,e,i);return}let r=s.ball,o=s.time;if(o-(t.lastDribbleTouch||0)<.14||r.pos.y>.45)return;let a=r.pos.x-t.pos.x,l=r.pos.z-t.pos.z;if(Math.hypot(a,l)>1.12)return;let h=Math.hypot(t.desired.x,t.desired.z),d=t.speed,u=r.vel.x,f=r.vel.z,g=Math.hypot(u,f),x=h>=.5,p=x?t.desired.x/h:Math.sin(t.yaw),m=x?t.desired.z/h:Math.cos(t.yaw),M=x?Math.min(h,t.maxSpeed(t.sprint,!0)):0,y=t.sprint&&M>t.jogSpeed()*1.02,v=.45+M*.07+(y?M*.17:0);i&&(v=.4+M*.05);let b=g>1&&x?Math.abs(ts(Ft(u,f),Ft(p,m))):0,S=(u-t.vel.x)*p+(f-t.vel.z)*m,E=a*p+l*m,_=x&&(b>.6&&g>1.5||E>v*1.1&&S>1.2),A=null;if(d>1.3&&!_){let Yt=Mr(d),re=Sr(Yt),Lt=re+(1-re)*.55;for(let[ce,Ae]of[["L",0],["R",.5]]){let Ke=((t.prevGait-Ae)%1+1)%1,Se=((t.gait-Ae)%1+1)%1;(Ke<Lt&&Se>=Lt||Se<Ke&&(Ke<Lt||Se>=Lt))&&(A=ce)}if(!A)return}else{if(!_&&o-(t.lastDribbleTouch||0)<.28)return;A=a*Math.cos(t.yaw)-l*Math.sin(t.yaw)>0?"L":"R"}if(!x){(Math.hypot(u-t.vel.x,f-t.vel.z)>.8||g>1.2)&&(r.setVelocity(new ot(t.vel.x*.45,0,t.vel.z*.45)),Mu(s,t,A,"stop",1));return}if(E<-.35&&d>2.5)return;let C=.26,P=a+(u-t.vel.x)*C,N=l+(f-t.vel.z)*C,F=P*p+N*m,I=Math.abs(P*m-N*p);if(!(_||F<v*.6||I>.3||b>.35||g<M*.75&&F<v))return;let q=y?1:.8,Y=a*m-l*p,st=t.vel.x*p+t.vel.z*m,Z=st<M?(M-st)**2/26:0,tt=Math.max(0,v-E-Z),$=M;for(let Yt=0;Yt<2;Yt++){let re=.6+.014*$*$;$=M+Math.sqrt(2*re*tt)}E>v&&($=M-Math.min(1.5,(E-v)*1.5)),$=ht($,M*.6,M+3);let _t=-Y/q,Et=p*$+m*_t,lt=m*$-p*_t,nt=Math.hypot(Et,lt)||.01,Bt=Et/nt,V=lt/nt;if(g>2.5){let Yt=y?.9:1.4,re=Ft(u,f),Lt=Ft(Bt,V),ce=ts(re,Lt);if(Math.abs(ce)>Yt){let Ae=re+Math.sign(ce)*Yt;Bt=Math.sin(Ae),V=Math.cos(Ae),nt=Math.min(nt,M*.8+1)}}let K=t.attrs.control,ut=(100-K)*45e-5*(1+d/6);t.isHuman?ut*=s.assist.touch:s.isOpp(t)&&(ut*=s.aiParams[t.team].touch);let At=s.rng.gauss()*ut,ct=Math.cos(At),Ut=Math.sin(At),pe=Bt*ct+V*Ut,qt=-Bt*Ut+V*ct;nt*=1+s.rng.gauss()*(100-K)*.0012,r.setVelocity(new ot(pe*nt,0,qt*nt)),Mu(s,t,A,"dribble",nt)}function Cb(s,t,e,n){let i=s.ball,r=s.time;if(i.pos.y>.9)return;let o=s.assist.stick,a=t.faceYaw!=null?t.faceYaw:t.yaw,l=Math.sin(a),c=Math.cos(a),h=Math.hypot(t.desired.x,t.desired.z),d=l,u=c;if(h>.5){let N=t.desired.x/h,F=t.desired.z/h;if(N*l+F*c>-.3){d=N*.75+l*.25,u=F*.75+c*.25;let I=Math.hypot(d,u)||1;d/=I,u/=I}}let f=Math.hypot(t.vel.x,t.vel.z),g=n?.48+f*.03:.45+f*.035+(t.sprint?f*.02:0);g*=1+(1-o)*.5;let x=t.pos.x+d*g,p=t.pos.z+u*g,m=5+6*o,M=t.vel.x+(x-i.pos.x)*m,y=t.vel.z+(p-i.pos.z)*m,v=M-t.vel.x,b=y-t.vel.z,S=Math.hypot(v,b),E=3.5+3.5*o;S>E&&(M=t.vel.x+v/S*E,y=t.vel.z+b/S*E);let _=1-Math.exp(-(8+22*o)*e);if(i.vel.x+=(M-i.vel.x)*_,i.vel.z+=(y-i.vel.z)*_,i.sideSpin=0,r-(t.lastDribbleTouch||0)<.3)return;let A=i.pos.x-t.pos.x,C=i.pos.z-t.pos.z;if(Math.hypot(A,C)>1.1)return;let P=null;if(f>1.3){let N=Mr(f),F=Sr(N)+(1-Sr(N))*.55;for(let[I,z]of[["L",0],["R",.5]]){let q=((t.prevGait-z)%1+1)%1,Y=((t.gait-z)%1+1)%1;(q<F&&Y>=F||Y<q&&(q<F||Y>=F))&&(P=I)}if(!P||r-(t.lastDribbleTouch||0)<.42)return}else{if(Math.hypot(i.vel.x-t.vel.x,i.vel.z-t.vel.z)<.6||r-(t.lastDribbleTouch||0)<.45)return;P=A*Math.cos(t.yaw)-C*Math.sin(t.yaw)>0?"L":"R"}Mu(s,t,P,"dribble",Math.hypot(i.vel.x,i.vel.z))}function Mu(s,t,e,n,i){let r=s.ball;t.touch={foot:e,time:s.time,x:r.pos.x,y:r.pos.y,z:r.pos.z,kind:n},t.lastDribbleTouch=s.time,r.lastTouch=t,r.lastTouchTime=s.time,s.events.emit("touch",{player:t,kind:n,strength:i,t:s.time})}function Hp(s,t,e){let n=s.time;for(let i of s.players){if(i===t.owner||t.lastTouch===i&&n-i.lastKickAt<ve.KICK_RELEASE_LOCK)continue;if(i.isGK&&s.keeperHandles(i,t)){if(s.keeperContact(i,t))return;continue}if(t.pos.y>1.9+fe||i.action&&i.action.type==="slide"&&i.action.sliding&&t.pos.y>.55)continue;let o=t.pos.x-i.pos.x,a=t.pos.z-i.pos.z,l=(t.pos.y<.95?.24:.2)+fe,c=o*o+a*a;if(c>=l*l||c<1e-8)continue;let h=Math.sqrt(c),d=o/h,u=a/h;t.pos.x=i.pos.x+d*l,t.pos.z=i.pos.z+u*l;let f=t.vel.x-i.vel.x,g=t.vel.z-i.vel.z,x=f*d+g*u;if(x<0){t.vel.x-=d*x*1.3,t.vel.z-=u*x*1.3,t.vel.y*=.7,t.version++;let p=t.owner&&t.owner.isHuman?2.5+3*s.assist.stick:2.5;t.owner&&t.owner.team!==i.team&&-x>p&&s.loseControl("blocked"),-x>.8&&(t.lastTouch=i,t.lastTouchTime=n,s.events.emit("deflect",{player:i,speed:-x,t:n}))}}}var Mo={"2-3-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.6,v:.36},{role:"DEF",u:-.6,v:-.36},{role:"W",u:.04,v:.68},{role:"CM",u:-.22,v:0},{role:"W",u:.04,v:-.68},{role:"ST",u:.36,v:0}],"2-2-1-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.6,v:.38},{role:"DEF",u:-.6,v:-.38},{role:"CM",u:-.24,v:.34},{role:"CM",u:-.24,v:-.34},{role:"AM",u:.1,v:0},{role:"ST",u:.4,v:0}],"3-2-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.58,v:.5},{role:"DEF",u:-.66,v:0},{role:"DEF",u:-.58,v:-.5},{role:"CM",u:-.14,v:.33},{role:"CM",u:-.14,v:-.33},{role:"ST",u:.38,v:0}],"2-1-2-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.6,v:.36},{role:"DEF",u:-.6,v:-.36},{role:"CM",u:-.3,v:0},{role:"AM",u:.08,v:.42},{role:"AM",u:.08,v:-.42},{role:"ST",u:.4,v:0}]},Rr={possession:{formation:"2-2-1-1",passShort:.25,cross:.05,press:0,line:0,width:1,dribble:0,tempo:.9,label:"Patient possession"},direct:{formation:"3-2-1",passShort:-.2,cross:.1,press:-.05,line:-.04,width:.95,dribble:.05,tempo:1.1,label:"Direct football"},wing:{formation:"2-3-1",passShort:0,cross:.3,press:0,line:0,width:1.15,dribble:.12,tempo:1,label:"Wing play"},pressing:{formation:"2-3-1",passShort:.1,cross:.05,press:.25,line:.08,width:1,dribble:.05,tempo:1.15,label:"High pressing"},counter:{formation:"3-2-1",passShort:-.1,cross:.05,press:-.15,line:-.1,width:.9,dribble:.15,tempo:1.05,label:"Counter attack"}};function pc(s,t){let e=(Rr[s]||Rr.wing).formation;return!t||Mo[e].some(n=>n.role===t)?e:t==="AM"?"2-2-1-1":"2-3-1"}var Gp={GK:[-1,-.7],DEF:[-.9,.3],CM:[-.75,.6],AM:[-.5,.82],W:[-.6,.86],ST:[-.3,.9]};var zt=new ot,Su=new ot,wu=new ot;function Tu(s,t){let e=s.teams[t],n=ht((e.tier||1)-1,0,4),i=s.human&&s.human.team===t,r=s.human&&!i,o=s.assist,a=e.style||{press:0};return{reaction:[.4,.34,.29,.25,.21][n]*(r?o.oppReact:1),think:[.3,.26,.22,.19,.16][n],noise:Math.max(.02,[.2,.15,.11,.08,.06][n]+(r?o.oppNoise:0)),aggro:[.34,.4,.48,.56,.64][n]*(r?o.oppAggro:1),pressRange:[11,12.5,14,16,18][n]*(1+(a.press||0))*(r?.5+.5*o.oppAggro:1),tackleBonus:[-.06,-.03,0,.02,.04][n],humanBonus:i?[.42,.36,.3,.24,.2][n]:0,holdMin:[.55,.45,.38,.3,.26][n],gkReaction:[.34,.3,.27,.24,.21][n]*(r?1+(o.oppReact-1)*.5:1),gkHold:[1.9,1.7,1.5,1.35,1.2][n],slideChance:[.04,.05,.05,.06,.06][n]*(r?o.oppAggro:1),shootBias:[0,.02,.04,.05,.06][n],passErr:r?1+(o.oppPassError-1)*(1-.1*n):1,shotErr:r?1+(o.oppShotError-1)*(1-.1*n):1,touch:r?1+(o.oppTouch-1)*(1-.1*n):1,mistake:r?o.oppMistake*(1-.1*n):0}}var mc=class{constructor(){this.phase="loose",this.winner=null,this.chaser=null,this.chaseT=99,this.chasePoint=new ot,this.presser=null,this.cover=null,this.supporters=[],this.runner=null,this.marks=new Map,this.lastDefU=.5,this.deepestOppU=-.5}},gc=class{constructor(t){this.m=t,this.ts=[new mc,new mc],this.nextTeamThink=0,this.intercepts=new Map}params(t){return this.m.aiParams[t]}update(t){let e=this.m;e.time>=this.nextTeamThink&&(this.nextTeamThink=e.time+.1,e.phase==="playing"&&(this.computeIntercepts(),this.teamThink(0),this.teamThink(1)));for(let n of e.players)if(!(n.isHuman||n.scripted)){if(n.sprint=!1,n.isGK){e.phase==="playing"||e.ball.state==="held"&&e.ball.owner===n?Lp(e,n,t,this.params(n.team)):this.nonPlayingMove(n);continue}e.phase==="playing"?this.playing(n,t):this.nonPlayingMove(n)}}computeIntercepts(){let t=this.m,e=t.ball,n=t.traj;if(this.intercepts.clear(),e.owner||e.state==="held"||e.state==="dead")return;let i=t.time-n.t0;for(let r of t.players){r.isGK||r.isHuman;let o=null,a=r.isHuman?.1:this.params(r.team).reaction*.5,l=r.action&&(r.action.type==="slide"||r.action.type==="dive")||t.time<r.downUntil?.6:0;for(let c=0;c<=3.2;c+=.08){if(n.at(c+i,zt),zt.y>1.6)continue;if(Math.max(0,Math.hypot(zt.x-r.pos.x,zt.z-r.pos.z)-.7)/r.sprintSpeed()+a+l<=c){o={t:c,x:zt.x,z:zt.z};break}}o||(n.at(3.2+i,zt),o={t:3.2+Math.hypot(zt.x-r.pos.x,zt.z-r.pos.z)/r.sprintSpeed(),x:zt.x,z:zt.z}),this.intercepts.set(r,o)}}teamThink(t){let e=this.m,n=e.ball,i=this.ts[t],r=e.teams[t].players,o=e.teams[1-t].players,a=n.owner;if(!r.length)return;a&&n.state!=="held"||n.state==="held"&&a?i.phase=a.team===t?"attack":"defend":i.phase="loose";let l=-1,c=1;for(let h of o){if(h.isGK)continue;let d=e.uOf(t,h.pos.x);d>l&&(l=d),d<c&&(c=d)}if(i.lastDefU=l,i.deepestOppU=c,i.chaser=null,i.chaseT=99,i.phase==="loose"&&this.intercepts.size){let h=null,d=99,u=99,f=99;for(let x of e.players){let p=this.intercepts.get(x);if(!p)continue;if(x.team!==t){!x.isGK&&p.t<f&&(f=p.t);continue}if(x.isHuman){u=p.t;continue}if(x.isGK)continue;let m=p.t;e.passIntent&&e.passIntent.target===x&&(m-=.6),m<d&&(d=m,h=x)}if(h&&!(u<d-.45)){i.chaser=h,i.chaseT=d;let x=this.intercepts.get(h);i.chasePoint.set(x.x,0,x.z)}let g=Math.min(d,u);i.winner=g<f-.15?t:f<g-.15?1-t:null}if(i.presser=null,i.cover=null,i.phase==="defend"&&a){let h=this.params(t),d=e.ownGoalX(t),u=null,f=1e9,g=null,x=1e9;for(let m of r){if(m.isGK||m.isHuman)continue;let M=m.pos.distXZ(a.pos);e.toWorld(t,m.home.u,m.home.v,zt);let y=zt.distXZ(a.pos),v=(m.pos.x-a.pos.x)*Math.sign(d-a.pos.x)>-1?0:3,b=M+Math.max(0,y-h.pressRange)*.9+v;b<f?(g=u,x=f,u=m,f=b):b<x&&(g=m,x=b)}let p=e.human;p&&p.team===t&&p.pos.distXZ(a.pos)<3&&u?i.cover=u:(i.presser=u,i.cover=g)}if(i.supporters=[],i.phase==="attack"&&a&&a.team===t&&!a.isGK){let h=r.filter(g=>g!==a&&!g.isGK&&!g.isHuman).sort((g,x)=>g.pos.distXZ(a.pos)-x.pos.distXZ(a.pos)),d=[];for(let g of h.slice(0,2)){let x=this.supportSpot(g,a,d);x&&(d.push(x),i.supporters.push(g),g.ai.support=x)}let u=e.time;i.runner&&i.runner.ai.run&&i.runner.ai.run.until<u&&(i.runner=null);let f=e.uOf(t,a.pos.x);if(!i.runner&&f>-.45&&u>(i.nextRun||0)){let g=null,x=-2;for(let p of r){if(p===a||p.isHuman||p.isGK||!["ST","W","AM"].includes(p.role)||i.supporters.includes(p))continue;let m=e.uOf(t,p.pos.x);m>x&&(x=m,g=p)}if(g){let p=Math.min(.88,Math.max(l+.1,e.uOf(t,g.pos.x)+.2)),m=e.vOf(t,g.pos.z)*.6;e.toWorld(t,p,m,Su);let M=99;for(let y of o)M=Math.min(M,y.pos.distXZ(Su));M>3.5&&(g.ai.run={until:u+2.8,target:Su.clone()},i.runner=g,i.nextRun=u+4.5)}}}else i.runner=null;if(i.marks.clear(),i.phase==="defend"||i.phase==="loose"&&i.winner===1-t){let h=o.filter(g=>!g.isGK&&g!==a).sort((g,x)=>e.uOf(t,g.pos.x)-e.uOf(t,x.pos.x)),d=r.filter(g=>!g.isGK&&!g.isHuman&&g!==i.presser&&g!==i.cover&&g!==i.chaser),u=["DEF","CM","AM","W","ST"];d.sort((g,x)=>u.indexOf(g.role)-u.indexOf(x.role));let f=new Set;for(let g of d){this.shapeTarget(g,zt);let x=null,p=13;for(let m of h){if(f.has(m)||e.uOf(t,m.pos.x)>.35&&g.role==="DEF")continue;let M=m.pos.distXZ(zt);M<p&&(p=M,x=m)}x&&(f.add(x),i.marks.set(g,x))}}}supportSpot(t,e,n){let i=this.m,r=t.team,o=i.attackDir(r),a=null,l=-1e9;this.shapeTarget(t,wu);let c=t.role==="ST"||t.role==="W"||t.role==="AM";for(let h of[-140,-100,-65,-35,0,35,65,100,140]){let d=h*Math.PI/180;for(let u of[8,12,16]){let f=e.pos.x+Math.cos(d)*u*o,g=e.pos.z+Math.sin(d)*u;if(Math.abs(f)>Q.HL-2||Math.abs(g)>Q.HW-1.5)continue;let x=fi(i,e.pos.x,e.pos.z,f,g,r,12),p=99;for(let b of i.players)b.team!==r&&(p=Math.min(p,Math.hypot(b.pos.x-f,b.pos.z-g)));let m=0;for(let b of i.teams[r].players){if(b===t||b===e)continue;let S=Math.hypot(b.pos.x-f,b.pos.z-g);S<6&&(m+=(6-S)/6)}for(let b of n){let S=Math.hypot(b.x-f,b.z-g);S<7&&(m+=(7-S)/5)}let M=(f-e.pos.x)*o/u,y=Math.hypot(wu.x-f,wu.z-g),v=x*1+Math.min(p,8)/8*.8+M*(c?.45:.25)-y*.035-m*.6-t.pos.distXZ(zt.set(f,0,g))*.015;v>l&&(l=v,a={x:f,z:g})}}return a?new ot(a.x,0,a.z):null}shapeTarget(t,e){let n=this.m,i=n.teams[t.team],r=i.style,o=n.ball,a=this.ts[t.team],l=n.uOf(t.team,o.pos.x),c=n.vOf(t.team,o.pos.z),h=a.phase==="attack"||a.phase==="loose"&&a.winner===t.team,d=t.home.u+l*.42+(r.line||0),u=t.home.v;h?d+=t.role==="DEF"?.12:.2:d-=.06,u=u*(h?1.12*(r.width||1):.8)+c*(h?.2:.35);let f=Gp[t.role]||[-.9,.9];return d=ht(d,f[0],f[1]),!h&&(t.role==="DEF"||t.role==="CM")&&(d=Math.min(d,l-(t.role==="DEF"?.1:.02))),t.role==="DEF"&&(d=Math.min(d,a.deepestOppU-.03,h?.3:.1)),d=ht(d,-.92,.92),u=ht(u,-.92,.92),n.toWorld(t.team,d,u,e)}playing(t,e){let n=this.m,i=n.ball,r=n.time,o=this.ts[t.team],a=this.params(t.team),l=t.ai;if(t.faceYaw=null,r<t.downUntil){t.desired.set(0,0,0);return}if(t.action&&(t.action.type==="slide"||t.action.type==="dive"))return;if(i.owner===t){this.carrier(t,e);return}let c=n.passIntent;if(c&&c.target===t&&!i.owner&&r-c.t<4){let u=this.intercepts.get(t),f=u&&u.t<3?zt.set(u.x,0,u.z):zt.set(c.point?c.point.x:i.pos.x,0,c.point?c.point.z:i.pos.z);this.moveTo(t,f,!0,.2),t.pos.distXZ(f)<1.2&&(t.faceYaw=Ft(i.pos.x-t.pos.x,i.pos.z-t.pos.z)),l.state="receive";return}if(o.phase==="loose"){if(o.chaser===t){l.state="chase",this.moveTo(t,o.chasePoint,!0,.05),t.faceYaw=t.pos.distXZ(o.chasePoint)<1.5?Ft(i.pos.x-t.pos.x,i.pos.z-t.pos.z):null;return}l.state="shape",this.shapeTarget(t,zt),this.moveTo(t,zt,!1,.6),this.faceBallIfClose(t,zt);return}if(o.phase==="attack"){if(l.run&&l.run.until>r&&o.runner===t){l.state="run",this.moveTo(t,l.run.target,!0,.3);return}if(o.supporters.includes(t)&&l.support){l.state="support",this.moveTo(t,l.support,l.support.distXZ(t.pos)>10,.6),this.faceBallIfClose(t,l.support);return}l.state="shape",this.shapeTarget(t,zt),this.moveTo(t,zt,t.pos.distXZ(zt)>14,.8),this.faceBallIfClose(t,zt);return}let h=i.owner;if(o.presser===t&&h){this.press(t,h,e,a);return}if(o.cover===t&&h){l.state="cover";let f=n.ownGoalX(t.team)-h.pos.x,g=-h.pos.z,x=Math.hypot(f,g)||1;zt.set(h.pos.x+f/x*5,0,h.pos.z+g/x*5),this.moveTo(t,zt,t.pos.distXZ(zt)>6,.5),t.faceYaw=Ft(h.pos.x-t.pos.x,h.pos.z-t.pos.z);return}let d=o.marks.get(t);if(d){l.state="mark";let f=n.ownGoalX(t.team)-d.pos.x,g=-d.pos.z,x=Math.hypot(f,g)||1,p=i.pos.x-d.pos.x,m=i.pos.z-d.pos.z,M=Math.hypot(p,m)||1;zt.set(d.pos.x+f/x*1.6+p/M*.9,0,d.pos.z+g/x*1.6+m/M*.9),this.moveTo(t,zt,t.pos.distXZ(zt)>5,.35),t.faceYaw=Ft(i.pos.x-t.pos.x,i.pos.z-t.pos.z);return}l.state="shape",this.shapeTarget(t,zt),this.moveTo(t,zt,t.pos.distXZ(zt)>10,.7),this.faceBallIfClose(t,zt)}press(t,e,n,i){let r=this.m,o=r.ball,a=r.time,l=t.ai;l.state="press";let c=r.ownGoalX(t.team),h=c-e.pos.x,d=-e.pos.z,u=Math.hypot(h,d)||1,f=t.pos.distXZ(e.pos),g=1.3,x=o.pos.x+o.vel.x*.2,p=o.pos.z+o.vel.z*.2,m=c-x,M=-p,y=Math.hypot(m,M)||1;if(zt.set(x+m/y*g,0,p+M/y*g),this.moveTo(t,zt,f>5,0,!0),t.faceYaw=Ft(o.pos.x-t.pos.x,o.pos.z-t.pos.z),a<(l.nextChallenge||0)||!ns(r,t)||(l.nextChallenge=a+i.think*(.8+r.rng.next()*.5),r.phase!=="playing"||a-(r.lastRestartAt||-10)<.8))return;let v=o.pos.distXZ(t.pos);if(v<1.45&&o.pos.y<.5){let b=o.pos.x-e.pos.x,S=o.pos.z-e.pos.z,E=t.pos.x-o.pos.x,_=t.pos.z-o.pos.z,A=(b*E+S*_)/((Math.hypot(b,S)||1)*(Math.hypot(E,_)||1));A>-.2&&r.rng.next()<i.aggro*(.7+A*.4)&&$l(r,t)}else if(v>1.7&&v<3&&e.speed>3.5&&r.rng.next()<i.slideChance){let b=e.vel.x/e.speed,S=e.vel.z/e.speed,E=(t.pos.x-e.pos.x)/f,_=(t.pos.z-e.pos.z)/f;b*E+S*_>-.1&&(t.yaw=Ft(o.pos.x+o.vel.x*.25-t.pos.x,o.pos.z+o.vel.z*.25-t.pos.z),t.vel.set(Math.sin(t.yaw)*t.speed,0,Math.cos(t.yaw)*t.speed),ql(r,t))}}carrier(t,e){let n=this.m,i=n.ball,r=n.time,o=t.ai,a=this.params(t.team),l=n.teams[t.team];if(t.action&&t.action.type==="kick")return;(o.ownedSince==null||o.ownerEpoch!==n.possEpoch)&&(o.ownerEpoch=n.possEpoch,o.ownedSince=r,o.nextDecision=r+a.reaction*(.8+n.rng.next()*.4),o.dribbleTarget=null,this.pickDribble(t,0));let c=n.attackDir(t.team),h=99,d=null;for(let A of n.opponents(t.team)){let C=A.pos.distXZ(t.pos);C<h&&(h=C,d=A)}let u=n.human;u&&u.team===t.team&&u.requestUntil>r&&u.ackedReq!==u.requestUntil&&(t.ackUntil=r+1.2,u.ackedReq=u.requestUntil,n.events.emit("ack",{player:t,to:u,t:r}));let f=h<1.6&&r-o.ownedSince>.2;if(i.pos.distXZ(t.pos)<1.3&&(r>=o.nextDecision||f&&r>=(o.urgentAt||0))&&(o.nextDecision=r+a.think*(.8+n.rng.next()*.45)*(2-(l.style.tempo||1)),f&&(o.urgentAt=r+.25),(r-o.ownedSince>=a.holdMin||f)&&this.decide(t,h,d)))return;(!o.dribbleTarget||r>o.dribbleUntil)&&this.pickDribble(t,h);let x=o.dribbleTarget,p=x.x-t.pos.x,m=x.z-t.pos.z,M=Math.hypot(p,m)||1,y=i.pos.x+i.vel.x*.25-t.pos.x,v=i.pos.z+i.vel.z*.25-t.pos.z,b=Math.hypot(y,v),S=(y*p+v*m)/M,E=o.dribbleSprint&&t.stamina>.25;(b>1.25||S<-.1)&&(p=y,m=v,M=b||1,E=b>2.2&&t.stamina>.15);let _=t.maxSpeed(E,!0)*(M<1?.6:1);t.desired.set(p/M*_,0,m/M*_),t.sprint=E,this.addSeparation(t,.4)}pickDribble(t,e){let n=this.m,i=t.ai,r=n.time,o=n.attackDir(t.team),a=o*Q.HL,l=null,c=-1e9,h=0;for(let d of[-75,-45,-20,0,20,45,75,130,-130]){let u=d*Math.PI/180,f=Math.cos(u)*o,g=Math.sin(u),x=t.pos.x+f*6,p=t.pos.z+g*6;if(Math.abs(x)>Q.HL-1.5||Math.abs(p)>Q.HW-1.2)continue;let m=12;for(let y of n.opponents(t.team)){let v=y.pos.x-t.pos.x,b=y.pos.z-t.pos.z,S=v*f+b*g,E=Math.abs(v*g-b*f);S>-.5&&E<2.5+S*.3&&(m=Math.min(m,Math.max(0,S)))}let M=m*.1+Math.cos(u)*.5;t.role==="W"&&Math.abs(t.pos.z)>10?M+=Math.abs(d)<25?.2:0:M+=-Math.abs(p)*.01+(Math.abs(x-a)<16?-Math.abs(p)*.03:0),M>c&&(c=M,l={x,z:p},h=m)}l||(l={x:t.pos.x-o*3,z:t.pos.z*.8}),i.dribbleTarget=new ot(l.x,0,l.z),i.dribbleUntil=r+.45,i.dribbleSprint=h>7&&n.uOf(t.team,t.pos.x)>-.3}decide(t,e,n){let i=this.m,r=i.ball,o=i.time,a=this.params(t.team),l=t.ai,c=i.teams[t.team],h=c.style,d=i.attackDir(t.team),u=d*Q.HL,f=i.uOf(t.team,t.pos.x),g=Math.abs(i.vOf(t.team,t.pos.z)),x=ht((3-e)/3,0,1),p=i.rng,m={kind:"dribble",s:.2+(h.dribble||0)+(t.role==="W"?.08:0)-x*.35},M=12;for(let b of i.opponents(t.team)){let S=(b.pos.x-t.pos.x)*d,E=b.pos.z-t.pos.z;S>0&&Math.abs(E)<S*.9+1.5&&(M=Math.min(M,Math.hypot(S,E)))}m.s+=Math.min(M,12)*.035,m.s+=p.gauss()*a.noise;let y=Math.hypot(u-t.pos.x,t.pos.z);if(y<27){let b=fu(t.pos.x,t.pos.z,d),S=0;for(let A of i.opponents(t.team)){if(A.isGK)continue;let C=Jn(A.pos.x,A.pos.z,t.pos.x,t.pos.z,u,ht(t.pos.z*.2,-2,2));C.t>.05&&C.t<.95&&C.d<1+C.t*1.5&&S++}let _=ht(b/.5,0,1)*ht((28-y)/19,0,1)*Math.max(0,1-.32*S)*1.55+(y<12?.25:0)-.12+a.shootBias+p.gauss()*a.noise;_>m.s&&(m={kind:"shot",s:_})}let v=i.human;for(let b of i.teams[t.team].players){if(b===t||o<b.downUntil||b.isGK&&!(f<-.4&&x>.5))continue;Tr(t.pos,b,zt,.75);let S=t.pos.distXZ(zt);if(S<4||S>38)continue;let E=i.ownGoalX(t.team);if(!b.isGK&&Math.abs(zt.x-E)<7&&Math.abs(zt.z)<9||b.isGK&&Math.abs(t.pos.z)<6&&Math.abs(t.pos.x-E)<14)continue;let _=fi(i,t.pos.x,t.pos.z,zt.x,zt.z,t.team,12),A=10;for(let N of i.opponents(t.team))A=Math.min(A,N.pos.distXZ(zt));let C=(zt.x-t.pos.x)*d,P=.2+_*.55+A*.045+C*.028*(1-(h.passShort||0)*.6)-Math.abs(S-14)*.008*(1+(h.passShort||0));if(b.isHuman&&(P+=a.humanBonus,b.requestUntil>o&&(P+=_>.55?.7:-.2)),b===l.receivedFrom&&o-l.ownedSince<2.5&&x<.4&&(P-=.3),C<-4&&x<.3&&(P-=.12),!(_<.35)&&(P+=p.gauss()*a.noise,P>m.s&&(m={kind:"pass",s:P,target:b}),b.ai.run&&b.ai.run.until>o||b.isHuman&&b.speed>4&&b.vel.x*d>2)){let N=.45+_*.3+Math.max(0,C)*.02+(b.isHuman?a.humanBonus*.7:0)+p.gauss()*a.noise;N>m.s&&i.uOf(t.team,b.pos.x)>.1&&(m={kind:"through",s:N,target:b})}}if(f>.5&&g>.35){let b=null,S=-1;for(let E of i.teams[t.team].players){if(E===t||E.isGK||!Vp(i,t.team,E.pos.x,E.pos.z))continue;let _=10;for(let A of i.opponents(t.team))_=Math.min(_,A.pos.distXZ(E.pos));_>S&&(S=_,b=E)}if(b){let E=.35+(h.cross||0)+S*.05+(f>.75?.15:0)+p.gauss()*a.noise;E>m.s&&(m={kind:"cross",s:E,target:b})}}switch(f<-.55&&x>.45&&m.s<.55&&(m={kind:"clear",s:.6}),m.kind){case"shot":{let b=i.keeper(1-t.team),S=Math.sign(t.pos.z)*-1||1;b&&(S=b.pos.z>0?-1:1),p.next()<.25&&(S=-S);let E=S*(ft.HW-.45-p.next()*.55),_=.25+p.next()*1.2;return le(i,t,"shot",{point:new ot(u,_,E),power:.72+p.next()*.28,ai:!0}),!0}case"pass":return le(i,t,"pass",{target:m.target,ai:!0}),m.target.ai.receivedFrom=t,!0;case"through":return le(i,t,"through",{target:m.target,ai:!0}),!0;case"cross":{let b=m.target,S=new ot(b.pos.x+b.vel.x*.8,0,b.pos.z+b.vel.z*.8);return le(i,t,"cross",{point:S,target:b,ai:!0}),!0}case"clear":{let b=new ot(d*10+t.pos.x*.2,0,Math.sign(t.pos.z||1)*14);return le(i,t,"clear",{point:b,ai:!0}),!0}default:return this.pickDribble(t,e),!1}}restartTarget(t,e,n=!1,i=new ot){let r=this.m,o=t.team,a=r.attackDir(o),l=e.spot,c=e.team===o;if(t===e.taker)return i.copy(l).addScaled(new ot(-a,0,0),.7);if(t.isGK){let u=r.ownGoalX(o);return e.type==="penalty"&&!c?i.set(u+a*.1,0,0):i.set(u+a*(e.type==="kickoff"?1.2:1.5),0,0)}let h=t.home.u,d=t.home.v;switch(e.type){case"kickoff":{h=Math.min(h*.85-.05,-.05),r.toWorld(o,h,d,i),c&&t.role===(e.taker&&e.taker.role==="ST"?"AM":"CM")&&i.set(-a*3.5,0,1.8);let u=Math.hypot(i.x,i.z);if(!c&&u<Kt.CIRCLE_R+.6){let f=(Kt.CIRCLE_R+.8)/(u||1);i.x*=f,i.z*=f,Math.abs(i.x)<.5&&(i.x=-a*(Kt.CIRCLE_R+.8))}return i}case"penalty":{let u=l.x>0?1:-1,f=u*(Q.HL-Kt.PEN_D-1.8),g=r.players.indexOf(t);return i.set(f-u*(g%2)*2.5,0,(g%7-3)*3.2)}case"corner":{let u=l.x>0?1:-1;if(c){let p={ST:[2,.8],AM:[5.5,-1.5],W:[4,3.5],CM:[11,0],DEF:[22,4]}[t.role]||[8,0],m=Math.sign(l.z);return i.set(u*(Q.HL-p[0]),0,p[1]*-m+(t.side||0)*1.5),t.role==="DEF"&&t.home.v<0&&(i.z=-i.z),Ai(i,1)}let g={DEF:[1.8,1.2],CM:[4.5,-1.2],AM:[9,2],W:[6,4],ST:[14,0]}[t.role]||[5,0];return i.set(u*(Q.HL-g[0]),0,g[1]*(t.home.v>=0?1:-1)),Ai(i,1)}case"goalkick":{if(c)r.toWorld(o,Math.min(h,-.2)+.05,d*1.1,i);else{r.toWorld(o,Math.max(h,-.1)+.2,d,i);let u=l.x>0?Q.HL:-Q.HL;Math.abs(i.x-u)<Kt.PEN_D+1&&Math.abs(i.z)<Kt.PEN_HW+1&&(i.x=u-Math.sign(u)*(Kt.PEN_D+1.5))}return i}default:{if(this.shapeTarget(t,i),c)i.distXZ(l)>18&&(t.role==="CM"||t.role==="W"||t.role==="AM")&&i.lerp(l,.35);else if(e.type==="freekick"){let u=r.ownGoalX(o);if(Math.hypot(l.x-u,l.z)<26&&(t.role==="DEF"||t.role==="CM")&&t.home.v!==void 0){let g=u-l.x,x=-l.z,p=Math.hypot(g,x)||1,m=t.home.v>=0?1:-1;i.set(l.x+g/p*(ve.RESTART_DIST+.3)-x/p*.38*m,0,l.z+x/p*(ve.RESTART_DIST+.3)+g/p*.38*m)}}if(!c){let u=e.type==="throwin"?ve.THROW_DIST:ve.RESTART_DIST;if(i.distXZ(l)<u+.4){let g=i.x-l.x,x=i.z-l.z,p=Math.hypot(g,x)||1;i.set(l.x+g/p*(u+.6),0,l.z+x/p*(u+.6))}}return Ai(i,.8)}}}enforceDistances(t){let e=this.m;for(let n of e.players){if(n.team===t.team||n.isHuman)continue;let i=t.type==="throwin"?ve.THROW_DIST:t.type==="kickoff"?Kt.CIRCLE_R:ve.RESTART_DIST;if(n.pos.distXZ(t.spot)<i){let o=this.restartTarget(n,t);n.pos.copy(o),n.prevPos.copy(o),n.vel.set(0,0,0)}}}nonPlayingMove(t){let e=this.m,n=e.time;if(t.faceYaw=null,e.phase==="restart"&&e.restart){let i=e.restart;if(t===i.taker&&i.placed){t.desired.set(0,0,0);return}let r=this.restartTarget(t,i,!1,zt);this.moveTo(t,r,t.pos.distXZ(r)>8,.25),t.pos.distXZ(r)<1&&(t.faceYaw=Ft(e.ball.pos.x-t.pos.x,e.ball.pos.z-t.pos.z));return}if(e.phase==="goal"){if(t.celebrate>n){let i=e.lastGoalTeam,r=e.attackDir(i)*(Q.HL-4),o=Math.sign(e.ball.pos.z||1)*(Q.HW-3);zt.set(r,0,o),this.moveTo(t,zt,!0,1.5);return}this.shapeTarget(t,zt),zt.x*=.5,this.moveTo(t,zt,!1,1,!1,2.2);return}if(e.phase==="halftime"||e.phase==="fulltime"){t.desired.set(0,0,0);return}this.shapeTarget(t,zt),this.moveTo(t,zt,!1,1,!1,3)}takeRestart(t,e){let n=this.m,i=n.rng,r=n.attackDir(t.team),o=r*Q.HL;n.lastRestartAt=n.time;let a=(c,h=.45)=>{let d=null,u=-1e9;for(let f of n.teams[t.team].players){if(f===t||f.isGK)continue;let g=f.pos.distXZ(e.spot);if(g>c||g<3)continue;let x=fi(n,e.spot.x,e.spot.z,f.pos.x,f.pos.z,t.team,11);if(x<h)continue;let p=x+(f.pos.x-e.spot.x)*r*.02-g*.01+(f.isHuman?this.params(t.team).humanBonus+(f.requestUntil>n.time?.6:0):0)+i.next()*.2;p>u&&(u=p,d=f)}return d},l=(c,h)=>{t.yaw=Ft(c-t.pos.x,h-t.pos.z)};switch(e.type){case"kickoff":{let c=a(20,.2)||n.teams[t.team].players.find(h=>h!==t&&!h.isGK);l(c.pos.x,c.pos.z),le(n,t,"pass",{target:c,restart:e,ai:!0});break}case"throwin":{let c=a(18,.35);if(c)l(c.pos.x,c.pos.z),le(n,t,"throw",{target:c,restart:e,ai:!0});else{let h=new ot(e.spot.x+r*10,0,e.spot.z*.5);l(h.x,h.z),le(n,t,"throw",{point:h,restart:e,ai:!0})}break}case"corner":{let c=[];for(let h of n.teams[t.team].players)h!==t&&!h.isGK&&Vp(n,t.team,h.pos.x,h.pos.z)&&c.push(h);if(c.length&&i.next()<.75){let h=c[Math.floor(i.next()*c.length)],d=new ot(h.pos.x,0,h.pos.z);l(d.x,d.z),le(n,t,"cross",{point:d,target:h,restart:e,ai:!0,elev:.45})}else{let h=a(14,.3)||c[0];if(h)l(h.pos.x,h.pos.z),le(n,t,"pass",{target:h,restart:e,ai:!0});else{let d=new ot(o-r*7,0,0);l(d.x,d.z),le(n,t,"cross",{point:d,restart:e,ai:!0})}}break}case"goalkick":{let c=a(22,.7);if(c&&i.next()<.6)l(c.pos.x,c.pos.z),le(n,t,"pass",{target:c,restart:e,ai:!0});else{let h=null,d=-1;for(let f of n.teams[t.team].players){if(f===t||f.isGK)continue;let g=10;for(let p of n.opponents(t.team))g=Math.min(g,p.pos.distXZ(f.pos));let x=g+n.uOf(t.team,f.pos.x)*4+i.next();x>d&&(d=x,h=f)}let u=h?new ot(h.pos.x,0,h.pos.z):new ot(0,0,0);l(u.x,u.z),le(n,t,"lob",{point:u,target:h,restart:e,ai:!0,elev:.5})}break}case"penalty":{let c=i.next()<.5?-1:1,h=new ot(o,.3+i.next()*.9,c*(1.2+i.next()*.9));l(h.x,h.z),le(n,t,"shot",{point:h,power:.8+i.next()*.15,restart:e,ai:!0});break}default:{let c=Math.hypot(o-e.spot.x,e.spot.z);if(e.type==="freekick"&&c<24&&fu(e.spot.x,e.spot.z,r)>.22&&i.next()<.45){let h=i.next()<.5?-1:1,d=new ot(o,1.2+i.next()*.6,h*(1.4+i.next()*.9));l(d.x,d.z),le(n,t,"shot",{point:d,power:.8+i.next()*.2,restart:e,ai:!0})}else{let h=a(26,.4)||a(35,.1);if(h)l(h.pos.x,h.pos.z),le(n,t,"pass",{target:h,restart:e,ai:!0});else{let d=new ot(e.spot.x+r*20,0,e.spot.z*.5);l(d.x,d.z),le(n,t,"lob",{point:d,restart:e,ai:!0})}}}}}moveTo(t,e,n,i=.5,r=!1,o=1/0){let a=e.x-t.pos.x,l=e.z-t.pos.z,c=Math.hypot(a,l),h=t.ai,d=this.m.time;if(d>(h.progressCheck||0)&&(c>2.5&&h.lastDist-c<.4&&t.speed<1&&(h.sidestepUntil=d+.7),h.lastDist=c,h.progressCheck=d+1.2),c<i){t.desired.set(0,0,0),r||this.addSeparation(t,1);return}let u=n&&(t.stamina>.2||this.ts[t.team].chaser===t),f=Math.min(t.maxSpeed(u,!1),o);c<3&&(f*=Math.max(.25,c/3));let g=a/c,x=l/c;if(h.sidestepUntil>d){let p=g;g=g*.5-x*.85,x=x*.5+p*.85}t.desired.set(g*f,0,x*f),t.sprint=u&&c>3,r||this.addSeparation(t,1)}addSeparation(t,e){let n=0,i=0,r=this.m.ball,o=t.pos.distXZ(r.pos)<2.5;for(let a of this.m.players){if(a===t)continue;let l=t.pos.x-a.pos.x,c=t.pos.z-a.pos.z,h=l*l+c*c;if(h>16||h<1e-6)continue;let d=Math.sqrt(h);if(d<1.4&&!o){let u=(1.4-d)/1.4*2.6;n+=l/d*u,i+=c/d*u}else if(a.team===t.team&&!o){let u=(4-d)/4*.9;n+=l/d*u,i+=c/d*u}}t.desired.x+=n*e,t.desired.z+=i*e}faceBallIfClose(t,e){if(t.pos.distXZ(e)<1.5){let n=this.m.ball.pos;t.faceYaw=Ft(n.x-t.pos.x,n.z-t.pos.z)}}};function Vp(s,t,e,n){let i=s.attackDir(t)*Q.HL;return Math.sign(e)===Math.sign(i)&&Math.abs(e-i)<Kt.PEN_D&&Math.abs(n)<Kt.PEN_HW}var Pb=new Set(["pass","through","cross","lob","gkthrow","gkkick"]);function Wp(){return{touches:0,goals:0,ownGoals:0,assists:0,passAtt:0,passCmp:0,shots:0,shotsOn:0,tacklesWon:0,tackleAtt:0,interceptions:0,possLost:0,fouls:0,saves:0,keyPasses:0}}var Eu={ST:{goal:1.05,assist:.7,tackle:.22,intercept:.16,pass:.035,prog:.03,key:.2,shotOn:.1,shotOff:-.02,lost:-.07,foul:-.2,conceded:-.03,clean:.05},W:{goal:1,assist:.75,tackle:.24,intercept:.17,pass:.04,prog:.03,key:.22,shotOn:.09,shotOff:-.02,lost:-.08,foul:-.2,conceded:-.03,clean:.05},AM:{goal:1,assist:.8,tackle:.26,intercept:.18,pass:.045,prog:.035,key:.25,shotOn:.09,shotOff:-.02,lost:-.09,foul:-.2,conceded:-.04,clean:.08},CM:{goal:1,assist:.8,tackle:.33,intercept:.25,pass:.055,prog:.035,key:.22,shotOn:.08,shotOff:-.02,lost:-.1,foul:-.2,conceded:-.07,clean:.2},DEF:{goal:1.1,assist:.8,tackle:.4,intercept:.3,pass:.05,prog:.03,key:.2,shotOn:.08,shotOff:-.02,lost:-.14,foul:-.22,conceded:-.15,clean:.45},GK:{goal:1,assist:.6,tackle:.2,intercept:.15,pass:.02,prog:.01,key:.1,shotOn:.05,shotOff:0,lost:-.1,foul:-.3,conceded:-.3,clean:.6,save:.3}},Ib={goals:"Goals",assists:"Assists",tackles:"Tackles won",interceptions:"Interceptions",passing:"Passing",keyPasses:"Chances created",shooting:"Shooting",lost:"Possession lost",fouls:"Fouls",defending:"Defending (goals conceded / clean sheet)",result:"Match result",involvement:"Involvement",positioning:"Positioning",decisions:"Poor decisions",saves:"Saves"},xc=class{constructor(t){this.m=t,this.by=new Map,this.contrib=new Map;for(let n of t.players)this.by.set(n,Wp()),this.contrib.set(n,[]);this.pendingPass=null,this.pendingTackle=null,this.pendingShot=null,this.lastCompleted=null,this.controller=null,this.looseFrom=null,this.pairCount=new Map,this.teamPossTime=[0,0],this.teamShots=[0,0],this.teamShotsOn=[0,0],this.posSamples=new Map,this.sampleT=0,this.longShots=new Map,this.finalised=!1,this.goalLog=[];let e=t.events;e.on("kick",n=>this.onKick(n)),e.on("possession",n=>this.onPossession(n)),e.on("release",n=>{(n.reason==="loose"||n.reason==="blocked")&&(this.looseFrom=n.player),this.controller=null}),e.on("tackle",n=>this.onTackle(n)),e.on("save",n=>this.onSave(n)),e.on("deflect",n=>this.onDeflect(n)),e.on("goal",n=>this.onGoal(n)),e.on("foul",n=>{this.s(n.player).fouls++,this.add(n.player,"fouls",this.w(n.player).foul),this.resolveAll("foul")}),e.on("out",n=>this.onOut(n)),e.on("restartSetup",()=>this.resolveAll("restart")),e.on("halftime",()=>this.resolveAll("half")),e.on("fulltime",()=>{this.resolveAll("full"),this.finalise()}),e.on("touch",n=>{n.kind})}s(t){let e=this.by.get(t);return e||(e=Wp(),this.by.set(t,e),this.contrib.set(t,[])),e}w(t){return Eu[t.role]||Eu.CM}add(t,e,n){!t||!n||this.contrib.get(t)?.push({cat:e,v:n,t:this.m.time})}credit(t,e){t&&this.m.events.emit("credit",{player:t,kind:e,t:this.m.time})}update(t){let e=this.m;if(e.phase==="playing"&&(e.possTeam!=null&&(e.ball.owner||e.ball.state==="held")&&(this.teamPossTime[e.possTeam]+=t),this.pendingTackle&&e.time-this.pendingTackle.t>ve.TACKLE_WINDOW&&(this.pendingTackle=null),this.sampleT+=t,this.sampleT>=1)){this.sampleT=0;for(let n of e.players){if(n.isGK)continue;let i=this.goodPosition(n),r=this.posSamples.get(n)||{good:0,n:0};r.n++,i&&r.good++,this.posSamples.set(n,r)}}}goodPosition(t){let e=this.m,n=e.ball,i=e.ownGoalX(t.team),r=e.uOf(t.team,t.pos.x),o=t.pos.distXZ(n.pos),a=e.possTeam===t.team;switch(t.role){case"DEF":return a?r<.35||o<14:Math.abs(t.pos.x-i)<=Math.abs(n.pos.x-i)+1||o<6;case"CM":return o<22&&r<.7;case"AM":return a?r>-.1||o<14:o<22;case"W":return a?Math.abs(t.pos.z)>7||r>.35||o<12:r>-.5;case"ST":return a?r>.15||o<12:r>-.35;default:return!0}}onKick(t){let e=t.player,n=this.s(e);n.touches++;let i=this.pendingPass;if(i&&(i.passer===e?this.pendingPass=null:t.team===i.team?this.completePass(i,e):this.failPass(i,null,t.team)),this.controller=null,this.looseFrom=null,Pb.has(t.kind)&&(n.passAtt++,this.pendingPass={passer:e,team:e.team,kind:t.kind,t:t.t,fromX:t.pos.x,target:t.target,id:t.id}),t.kind==="shot"){n.shots++,this.teamShots[e.team]++,this.pendingShot={shooter:e,onTarget:t.onTarget,t:t.t,resolved:!1};let r=this.lastCompleted;r&&r.receiver===e&&t.t-r.recvT<6&&!r.keyCounted&&(r.keyCounted=!0,this.s(r.passer).keyPasses++,this.add(r.passer,"keyPasses",this.w(r.passer).key));let o=this.m.attackDir(e.team)*Q.HL;if(Math.hypot(o-t.pos.x,t.pos.z)>28&&!t.restart){let l=(this.longShots.get(e)||0)+1;this.longShots.set(e,l),l>1&&this.add(e,"decisions",-.06)}}}completePass(t,e){this.pendingPass=null;let n=t.passer,i=this.s(n),r=this.w(n);i.passCmp++;let o=this.m.attackDir(n.team),l=(e.pos.x-t.fromX)*o>=8,c=n.id+":"+e.id,h=(this.pairCount.get(c)||0)+1;this.pairCount.set(c,h);let d=Math.pow(l?.85:.65,h-1);this.add(n,"passing",(r.pass+(l?r.prog:0))*d),this.credit(n,"passCompleted"),this.lastCompleted={passer:n,receiver:e,team:n.team,t:t.t,recvT:this.m.time,keyCounted:!1}}failPass(t,e,n){this.pendingPass=null;let i=t.passer;if(e){let r=++this.s(e).interceptions;this.add(e,"interceptions",this.w(e).intercept*(r<=3?1:Math.pow(.8,r-3))),this.credit(e,"interception")}n!=null&&n!==i.team&&(this.s(i).possLost++,this.add(i,"lost",this.w(i).lost),this.credit(i,"possessionLost"))}onPossession(t){let e=t.player,n=t.team,i=this.s(e);i.touches++;let r=this.pendingPass;r&&(r.passer===e?this.pendingPass=null:r.team===n?this.completePass(r,e):this.failPass(r,this.m.time-r.t<=3?e:null,n));let o=!1,a=this.pendingTackle;if(a){if(a.team===n&&this.m.time-a.t<=ve.TACKLE_WINDOW){let l=++this.s(a.tackler).tacklesWon;this.add(a.tackler,"tackles",this.w(a.tackler).tackle*(l<=4?1:Math.pow(.85,l-4))),this.credit(a.tackler,"tackleWon"),a.victim&&(this.s(a.victim).possLost++,this.add(a.victim,"lost",this.w(a.victim).lost),this.credit(a.victim,"possessionLost")),o=!0}this.pendingTackle=null}if(!o){let l=t.prev&&t.prev.team!==n?t.prev:this.looseFrom&&this.looseFrom.team!==n?this.looseFrom:null;l&&(this.s(l).possLost++,this.add(l,"lost",this.w(l).lost),this.credit(l,"possessionLost"))}this.looseFrom=null,this.lastCompleted&&this.lastCompleted.team!==n&&(this.lastCompleted=null),this.controller=e}onTackle(t){this.s(t.player).tackleAtt++,t.success&&(this.pendingTackle={tackler:t.player,victim:t.victim,team:t.player.team,t:t.t},this.looseFrom=null,this.controller=null)}onSave(t){let e=this.pendingShot;e&&!e.resolved&&(e.resolved=!0,e.onTarget?(this.s(e.shooter).shotsOn++,this.teamShotsOn[e.shooter.team]++,this.add(e.shooter,"shooting",this.w(e.shooter).shotOn),this.credit(e.shooter,"shotSaved"),this.s(t.player).saves++,this.add(t.player,"saves",Eu.GK.save)):this.add(e.shooter,"shooting",this.w(e.shooter).shotOff))}onDeflect(t){let e=this.pendingShot;e&&!e.resolved&&t.player.team!==e.shooter.team&&!t.player.isGK&&this.m.time-e.t<3&&(e.resolved=!0,e.blocked=!0)}onGoal(t){let e=t.scorer,n=this.pendingShot;if(e){let i=this.s(e);i.goals++,n&&n.shooter===e&&(!n.resolved||n.blocked)?(i.shotsOn++,this.teamShotsOn[e.team]++,n.resolved=!0):(!n||n.shooter!==e)&&(i.shots++,i.shotsOn++,this.teamShots[e.team]++,this.teamShotsOn[e.team]++),this.add(e,"goals",this.w(e).goal);let r=this.lastCompleted;r&&r.receiver===e&&r.team===t.team&&r.passer!==e&&t.t-r.t<=ve.ASSIST_WINDOW&&(this.s(r.passer).assists++,this.add(r.passer,"assists",this.w(r.passer).assist),t.assist=r.passer,this.credit(r.passer,"assist"))}else t.ownGoal&&t.ownGoalBy&&(this.s(t.ownGoalBy).ownGoals++,this.add(t.ownGoalBy,"decisions",-.3));for(let i of this.m.teams[1-t.team].players)this.add(i,"defending",this.w(i).conceded);this.goalLog.push({team:t.team,scorer:e?e.name:null,scorerRef:e,assist:t.assist?t.assist.name:null,ownGoal:t.ownGoal,ownGoalBy:t.ownGoalBy?t.ownGoalBy.name:null,clock:this.m.displayClock,half:this.m.half}),this.resolveAll("goal")}onOut(t){let e=this.pendingPass;e?this.failPass(e,null,t.team):t.controller&&t.team!==t.controller.team&&(this.s(t.controller).possLost++,this.add(t.controller,"lost",this.w(t.controller).lost)),this.resolveAll("out")}resolveAll(t){this.pendingPass&&(this.pendingPass=null),this.pendingTackle=null;let e=this.pendingShot;e&&!e.resolved&&(e.resolved=!0,t!=="goal"&&this.add(e.shooter,"shooting",this.w(e.shooter).shotOff)),this.pendingShot=null,this.looseFrom=null,t!=="goal"&&(this.lastCompleted=null)}finalise(){if(this.finalised)return;this.finalised=!0;let t=this.m,[e,n]=t.scoreline;for(let i of t.players){let r=this.w(i),o=i.team===0?e:n,a=i.team===0?n:e;this.add(i,"result",o>a?.25:o<a?-.2:0),a===0&&this.add(i,"defending",r.clean);let l=this.s(i);if(!i.isGK){l.touches<4?this.add(i,"involvement",-.25):l.touches>25&&this.add(i,"involvement",.15);let c=this.posSamples.get(i);c&&c.n>20&&this.add(i,"positioning",(c.good/c.n-.55)*.5)}}}rating(t){let e=0;for(let n of this.contrib.get(t)||[])e+=n.v;return Math.round(ht(6+e,1,10)*10)/10}breakdown(t){let e={};for(let o of this.contrib.get(t)||[])e[o.cat]=(e[o.cat]||0)+o.v;let n=Object.entries(e).map(([o,a])=>({cat:o,label:Ib[o]||o,v:a})),i=n.filter(o=>o.v>.005).sort((o,a)=>a.v-o.v),r=n.filter(o=>o.v<-.005).sort((o,a)=>o.v-a.v);return{pos:i,neg:r,all:n}}possessionPct(){let[t,e]=this.teamPossTime,n=t+e;return n>0?[Math.round(t/n*100),100-Math.round(t/n*100)]:[50,50]}report(t){let e=this.s(t),n=this.m,i=n.halfLength*2,r=Math.round(Math.min(1,n.clock/i)*90),o=null,a=-1;for(let l of n.players){let c=this.rating(l);c>a&&(a=c,o=l)}return{score:n.scoreline,minutes:r,rating:this.rating(t),stats:{...e,passAcc:e.passAtt?Math.round(e.passCmp/e.passAtt*100):0},breakdown:this.breakdown(t),possession:this.possessionPct(),teamShots:[...this.teamShots],teamShotsOn:[...this.teamShotsOn],motm:o?{name:o.name,team:o.team,rating:a,isHuman:o.isHuman}:null,goals:this.goalLog.map(l=>({...l,scorerRef:void 0}))}}};var yc={assisted:{label:"Assisted",passError:.3,shotError:.65,shotAim:1,touch:.45,tackle:.24,stick:1,claim:1.25,passCone:1.1,autoLob:!0,oppReact:1.55,oppAggro:.5,oppNoise:.14,oppPassError:3,oppMistake:.16,oppTouch:2,oppShotError:1.7,oppProtect:.24,oppHumanPassReact:.34},standard:{label:"Standard",passError:.55,shotError:.85,shotAim:.7,touch:.65,tackle:.14,stick:.75,claim:1.12,passCone:.95,autoLob:!0,oppReact:1,oppAggro:1.1,oppNoise:.03,oppPassError:1.35,oppMistake:.04,oppTouch:1.15,oppShotError:1.05,oppProtect:0,oppHumanPassReact:.2},expert:{label:"Expert",passError:.85,shotError:1,shotAim:.35,touch:.9,tackle:.02,stick:.5,claim:1.05,passCone:.8,autoLob:!1,oppReact:.9,oppAggro:1.22,oppNoise:0,oppPassError:1,oppMistake:.01,oppTouch:1,oppShotError:.95,oppProtect:-.04,oppHumanPassReact:.16}},vc=class{constructor(t){this.cfg=t,this.mode=t.mode||"match",this.events=new fc,this.rng=new gi(t.seed||12345),this.ball=new es,this.traj=new wr(200,1/60),this.trajVersion=-1,this.players=[],this.time=0,this.clock=0,this.half=1,this.halfLength=t.halfLength||180,this.phase="setup",this.phaseT=0,this.restart=null,this.pendingRestart=null,this.possTeam=null,this.skipRequested=!1,this.kickoffTeam=0,this.nextKickId=1,this.passIntent=null,this.lastProgress=0,this.snapCount=0,this.rules=t.rules!==!1,this.difficulty=t.difficulty||"assisted",this.assist=yc[this.difficulty]||yc.assisted,this.human=null,this.humanCtl=null,this.teams=[],this.ballHooks={onBounce:(e,n)=>this.events.emit("bounce",{speed:n,t:this.time}),onFrame:(e,n,i)=>this.events.emit("frame",{what:i,speed:n,t:this.time}),bodies:(e,n)=>Hp(this,e,n)},this.buildTeams(t),this.aiParams=[Tu(this,0),Tu(this,1)],this.ai=new gc(this),this.stats=new xc(this)}buildTeams(t){for(let e=0;e<2;e++){let n=t.teams[e];if(!n){this.teams.push({index:e,attack:e===0?1:-1,score:0,players:[],name:"None",style:Rr.wing,empty:!0});continue}let i=n.players.find(c=>c.isHuman)?.role||null,r=n.formation||pc(n.style,i),o={index:e,attack:e===0?1:-1,score:0,players:[],name:n.name,short:n.short||n.name.slice(0,3).toUpperCase(),kit:n.kit,styleName:n.style||"wing",style:Rr[n.style]||Rr.wing,tier:n.tier||1,formationName:r,formation:Mo[r],clubId:n.clubId};this.teams.push(o);let a=o.formation.map((c,h)=>({...c,i:h,used:!1})),l=[...n.players].sort((c,h)=>(h.isHuman?1:0)-(c.isHuman?1:0));for(let c of l){let h=a.find(u=>!u.used&&u.role===c.role);if(h||(h=a.find(u=>!u.used&&u.role!=="GK"&&c.role!=="GK")||a.find(u=>!u.used)),!h)continue;h.used=!0;let d=new Ul({team:e,slot:h.i,role:h.role,number:c.number,name:c.name,isHuman:c.isHuman,attrs:c.attrs,keeping:c.keeping,foot:c.foot,look:c.look});d.home={u:h.u,v:h.v},o.players.push(d),this.players.push(d),d.isHuman&&(this.human=d)}o.players.sort((c,h)=>c.slot-h.slot)}this.players.sort((e,n)=>e.id-n.id)}attackDir(t){return this.teams[t].attack}ownGoalX(t){return-this.teams[t].attack*Q.HL}teamOf(t){return this.teams[t.team]}opponents(t){return this.teams[1-t].players}isOpp(t){return!!this.human&&t.team!==this.human.team}keeper(t){return this.teams[t].players.find(e=>e.isGK)||null}get scoreline(){return[this.teams[0].score,this.teams[1].score]}toWorld(t,e,n,i){let r=this.teams[t].attack;return i.set(e*Q.HL*r,0,-n*Q.HW*r)}uOf(t,e){return e/Q.HL*this.teams[t].attack}vOf(t,e){return-e/Q.HW*this.teams[t].attack}keeperHandles(t,e){return Cp(this,t,e)}keeperContact(t,e){return Ip(this,t,e)}start(t=null){this.kickoffTeam=t??(this.rng.next()<.5?0:1),this.events.emit("matchStart",{t:0}),this.setupRestart({type:"kickoff",team:this.kickoffTeam,spot:new ot(0,0,0)})}step(t=Ts){this.time+=t,this.phaseT+=t;let e=this.ball;this.humanCtl&&this.humanCtl.update(t),this.ai.update(t),this.preStep&&this.preStep(t);for(let n of this.players)Ap(this,n,t);for(let n of this.players){let i=Ep(n);this.phase==="restart"&&this.restart&&this.restart.taker===n&&this.restart.placed&&(i=0),n.celebrate>this.time&&(i=Math.min(i,6.5)),dp(n,t,this.time,i,e.owner===n)}fp(this.players);for(let n of this.players)n.pos.x=ht(n.pos.x,-hn.HL+1,hn.HL-1),n.pos.z=ht(n.pos.z,-hn.HW+1,hn.HW-1);e.state==="held"&&e.owner?this.positionHeldBall(e.owner):e.state==="dead"&&this.restart&&this.restart.handsBall&&this.restart.taker&&this.positionThrowBall(this.restart.taker),yp(e,t,this.ballHooks),(e.version!==this.trajVersion||this.time-this.traj.t0>.12)&&(this.traj.compute(e,this.time),this.trajVersion=e.version),this.phase==="playing"&&Bp(this,t),this.stats.update(t),this.updatePhase(t)}positionHeldBall(t){let e=this.ball,n=t.hold==="throw"?-.05:.32,i=t.hold==="throw"?2.05:1.05;e.pos.set(t.pos.x+Math.sin(t.yaw)*n,i,t.pos.z+Math.cos(t.yaw)*n),e.vel.set(0,0,0)}positionThrowBall(t){let e=this.ball;e.pos.set(t.pos.x+Math.sin(t.yaw)*-.05,2.08,t.pos.z+Math.cos(t.yaw)*-.05),e.vel.set(0,0,0)}updatePhase(t){switch(this.phase){case"playing":{if(this.clock+=t,this.rules&&this.checkBall(),this.phase!=="playing")break;this.checkDeadlock(),this.rules&&this.clock>=this.halfLength*this.half&&!this.shotInFlight()&&this.endHalf();break}case"stoppage":this.phaseT>(this.stoppageDelay||.8)&&this.setupRestart(this.pendingRestart);break;case"restart":this.updateRestart(t);break;case"goal":if(this.phaseT>2.8||this.skipRequested&&this.phaseT>.6){this.skipRequested=!1;let e=1-this.lastGoalTeam;this.setupRestart({type:"kickoff",team:e,spot:new ot(0,0,0)})}break;case"halftime":(this.phaseT>3.2||this.skipRequested&&this.phaseT>.5)&&(this.skipRequested=!1,this.startSecondHalf());break;default:break}}shotInFlight(){let t=this.ball.lastKick;if(!t||t.kind!=="shot"||this.time-t.t>2.5)return!1;let e=this.attackDir(t.team);return this.ball.vel.x*e>3&&!this.ball.owner}checkBall(){let t=this.ball;if(t.state==="held"||t.state==="dead")return;let e=t.pos;for(let n=0;n<2;n++){let i=n===0?1:-1;if(e.x*i-fe>Q.HL){let r=t.crossing[n];if(r&&r.inMouth&&Math.abs(e.z)<ft.HW&&e.y<ft.H){let o=this.teams[0].attack===i?0:1;this.goal(o)}else this.outOverGoalLine(i);return}}if(Math.abs(e.z)-fe>Q.HW){let n=t.lastTouch,i=n?1-n.team:this.possTeam!=null?1-this.possTeam:0,r=new ot(ht(e.x,-Q.HL+1,Q.HL-1),0,Math.sign(e.z)*Q.HW);this.ballOut("throwin",i,r);return}if(Math.abs(e.x)>hn.HL-.5||Math.abs(e.z)>hn.HW-.5){let n=t.lastTouch,i=n?1-n.team:0,r=new ot(ht(e.x,-Q.HL+1,Q.HL-1),0,ht(e.z,-Q.HW,Q.HW));this.ballOut("throwin",i,r)}}outOverGoalLine(t){let e=this.ball,n=this.teams[0].attack===-t?0:1,i=1-n,r=e.lastTouch;if(r&&r.team===n){let o=new ot(t*(Q.HL-.4),0,Math.sign(e.pos.z||1)*(Q.HW-.4));this.ballOut("corner",i,o)}else{let o=new ot(t*(Q.HL-Kt.GOAL_D*.5),0,ht(e.pos.z*.3,-2.5,2.5));this.ballOut("goalkick",n,o)}}ballOut(t,e,n){let i=this.ball,r=i.lastTouch;this.events.emit("out",{restart:t,team:e,lastTouch:r,controller:i.owner,t:this.time,pos:i.pos.clone()}),i.owner&&(i.owner=null),i.state="free",this.phase="stoppage",this.phaseT=0,this.stoppageDelay=.75,this.pendingRestart={type:t,team:e,spot:n}}goal(t){if(this.phase!=="playing")return;let e=this.ball,n=e.lastTouch,i=null,r=!1,o=null,a=e.lastKick;n&&n.team===t?i=n:a&&a.team===t&&a.kind==="shot"&&a.onTarget&&this.time-a.t<4?i=a.player:n&&(r=!0,o=n),this.teams[t].score++,this.lastGoalTeam=t,e.owner&&(e.owner=null),e.state="free",this.phase="goal",this.phaseT=0,this.skipRequested=!1,i&&(i.celebrate=this.time+2.8,i.action={type:"celebrate",t:0,dur:2.8});for(let l of this.teams[t].players)l!==i&&(l.celebrate=this.time+2.8);this.events.emit("goal",{team:t,scorer:i,ownGoal:r,ownGoalBy:o,t:this.time,clock:this.clock,score:this.scoreline,pos:e.pos.clone()})}foul(t,e,n){if(this.phase!=="playing")return;let i=this.time;e.downUntil=i+1.1,e.action={type:"stumble",t:0,dur:1.1,fall:!0};let r=e.pos.clone();r.x=ht(r.x,-Q.HL+.5,Q.HL-.5),r.z=ht(r.z,-Q.HW+.5,Q.HW-.5);let o=this.ownGoalX(t.team),a=Math.abs(r.x-o)<Kt.PEN_D&&Math.abs(r.z)<Kt.PEN_HW&&Math.sign(r.x)===Math.sign(o),l=a?"penalty":"freekick";a&&r.set(Math.sign(o)*(Q.HL-Kt.SPOT),0,0),this.events.emit("foul",{player:t,victim:e,slide:n,penalty:a,t:i,pos:e.pos.clone()}),this.ball.owner&&(this.ball.owner=null),this.ball.state="free",this.phase="stoppage",this.phaseT=0,this.stoppageDelay=1.1,this.pendingRestart={type:l,team:e.team,spot:r,victim:e}}dislodge(t,e,n,i=!1){let r=this.ball;r.owner=null,r.state="free",r.setVelocity(n),r.lastTouch=e,r.lastTouchTime=this.time,t.noCaptureUntil=this.time+.45,t.stumbleUntil=Math.max(t.stumbleUntil,this.time+.3),this.events.emit("tackle",{player:e,victim:t,success:!0,slide:i,t:this.time})}touchBall(t,e){this.ball.lastTouch=t,this.ball.lastTouchTime=this.time,this.events.emit("touch",{player:t,kind:e,strength:this.ball.speed,t:this.time})}gainControl(t){let e=this.ball,n=e.owner,i=e.lastKick,r="loose";n&&n.team!==t.team?r="steal":i&&Xl.has(i.kind)&&this.time-i.t<8&&i.player!==t&&(r=i.team===t.team?"receive":"interception"),e.owner=t,e.state="controlled",e.lastTouch=t,e.lastTouchTime=this.time,this.possTeam=t.team,this.possEpoch=(this.possEpoch||0)+1,this.lastProgress=this.time,n&&(n.noCaptureUntil=this.time+.35),this.passIntent&&this.passIntent.target===t&&(this.passIntent=null),this.events.emit("possession",{player:t,team:t.team,prev:n,cause:r,t:this.time})}loseControl(t){let e=this.ball,n=e.owner;n&&(e.owner=null,e.state=e.pos.y>fe+.05?"air":"free",this.events.emit("release",{player:n,reason:t,t:this.time}))}applyKick(t,e,n,i){let r=this.ball;r.owner=null,r.setVelocity(e),r.state=e.y>.8||r.pos.y>fe+.1?"air":"free",r.lastTouch=t,r.lastTouchTime=this.time,t.noCaptureUntil=this.time+ve.KICK_RELEASE_LOCK,t.lastKickAt=this.time,t.hold=null,t.touch={foot:n.foot,time:this.time,x:r.pos.x,y:r.pos.y,z:r.pos.z,kind:n.kind==="shot"?"shot":"kick"};let o=n.restart?n.restart.type:null,a=this.events.emit("kick",{player:t,team:t.team,kind:n.kind,target:i.target||null,point:i.point||null,onTarget:!!i.onTarget,speed:e.len(),t:this.time,restart:o,firstTime:n.firstTime,pos:r.pos.clone(),kickId:this.nextKickId++});if(r.lastKick=a,this.lastProgress=this.time,i.target&&Xl.has(n.kind)?this.passIntent={target:i.target,point:i.point,t:this.time,from:t}:this.passIntent=n.kind==="shot"?null:this.passIntent,n.restart&&this.phase==="restart"){this.phase="playing",this.phaseT=0,this.restart=null;for(let l of this.players)l.hold=null}}setupRestart(t){let e=this.ball;this.phase="restart",this.phaseT=0,this.skipRequested=!1,this.passIntent=null,this.events.emit("restartSetup",{restart:t.type,team:t.team,t:this.time});let n=t.spot.clone(),i=this.chooseTaker(t);this.restart={type:t.type,team:t.team,spot:n,taker:i,placed:!1,victim:t.victim||null,readyAt:{kickoff:1.1,throwin:.9,corner:1.3,goalkick:1.2,freekick:1.3,penalty:1.8,dropball:.6}[t.type]||1.2,handsBall:t.type==="throwin",humanTaker:i&&i.isHuman,decided:!1},e.owner=null,e.place(n.x,n.z),e.state="dead",e.lastKick=null;for(let r of this.players)r.action&&r.action.type!=="celebrate"&&(r.action=null),r.faceYaw=null,r.hold=null;t.type==="kickoff"||t.type==="penalty"?this.snapPositions():i&&(i.isHuman||i.pos.distXZ(n)>14)&&(this.placeTaker(i),this.events.emit("snap",{t:this.time,who:"taker"})),t.type==="goalkick"&&i&&i.isGK&&this.placeTaker(i)}chooseTaker(t){let e=this.teams[t.team],n=e.players.filter(o=>!o.isGK),i=this.human&&this.human.team===t.team?this.human:null,r=o=>{let a=null,l=1e9;for(let c of o){let h=c.pos.distXZ(t.spot);h<l&&(l=h,a=c)}return[a,l]};switch(t.type){case"kickoff":return i&&(i.role==="ST"||i.role==="AM")?i:n.find(o=>o.role==="ST")||n.find(o=>o.role==="AM")||n[n.length-1];case"goalkick":return e.players.find(o=>o.isGK)||n[0];case"penalty":return i&&(["ST","W","AM"].includes(i.role)||t.victim===i)?i:[...n].sort((o,a)=>a.attrs.finishing-o.attrs.finishing)[0];case"corner":{let o=n.filter(l=>l.role==="W"||l.role==="AM"||l.role==="CM"),[a]=r(o.length?o:n);return i&&i.pos.distXZ(t.spot)<14&&i.pos.distXZ(t.spot)<=a.pos.distXZ(t.spot)+3?i:a}default:{let[o,a]=r(n.filter(l=>this.time>=l.downUntil||l===t.victim));return i&&(t.victim===i||i.pos.distXZ(t.spot)<12&&i.pos.distXZ(t.spot)<=a+2)?i:o||n[0]}}}placeTaker(t){let e=this.restart,n=e.spot,i=this.attackDir(t.team),r,o;if(e.type==="throwin"){r=.3*i,o=-Math.sign(n.z);let a=Math.hypot(r,o);r/=a,o/=a,t.pos.set(n.x-r*.35,0,n.z-o*.35)}else{let a=e.type==="corner"?n.x-i*8:i*Q.HL,l=(e.type==="corner",0);r=a-n.x,o=l-n.z;let c=Math.hypot(r,o)||1;r/=c,o/=c,t.pos.set(n.x-r*.7,0,n.z-o*.7)}t.yaw=Ft(r,o),t.prevYaw=t.yaw,t.prevPos.copy(t.pos),t.vel.set(0,0,0),t.isHuman&&this.events.emit("humanYaw",{yaw:t.yaw})}snapPositions(){this.snapCount++,this.events.emit("snap",{t:this.time,who:"all"});for(let t of this.players){let e=this.ai.restartTarget(t,this.restart,!0);t.pos.copy(e),up(t),t.celebrate=0;let n=this.attackDir(t.team),i=this.restart.spot.x-t.pos.x,r=this.restart.spot.z-t.pos.z;t.yaw=Math.hypot(i,r)>.5?Ft(i,r):Ft(n,0),t.prevYaw=t.yaw,t.prevPos.copy(t.pos)}this.restart.taker&&this.placeTaker(this.restart.taker),this.human&&this.events.emit("humanYaw",{yaw:this.human.yaw})}updateRestart(t){let e=this.restart;if(!e)return;let n=e.taker;if(!n){this.phase="playing";return}let i=n.pos.distXZ(e.spot);if(!e.placed){(i<.9||n.isHuman||this.phaseT>3.5)&&(i>=.9&&this.placeTaker(n),e.placed=!0,e.placedAt=this.phaseT,e.type==="throwin"&&(n.hold="throw"));return}if(this.phaseT>4.5&&!e.cleared&&(e.cleared=!0,this.ai.enforceDistances(e)),!(this.phaseT<e.readyAt||this.phaseT-e.placedAt<.35)){if(e.humanTaker&&!e.autoTaken){this.phaseT>12&&(e.autoTaken=!0,this.ai.takeRestart(n,e));return}n.action||this.ai.takeRestart(n,e)}}startSecondHalf(){this.half=2,this.clock=this.halfLength;for(let t of this.teams)t.attack=-t.attack;this.events.emit("secondHalf",{t:this.time}),this.setupRestart({type:"kickoff",team:1-this.kickoffTeam,spot:new ot(0,0,0)})}endHalf(){this.events.emit("whistle",{kind:this.half===1?"half":"full",t:this.time}),this.ball.owner&&(this.ball.owner=null),this.ball.state="free";for(let t of this.players)t.action&&t.action.type!=="celebrate"&&(t.action=null);this.half===1?(this.phase="halftime",this.phaseT=0,this.events.emit("halftime",{t:this.time,score:this.scoreline})):(this.phase="fulltime",this.phaseT=0,this.events.emit("fulltime",{t:this.time,score:this.scoreline}))}checkDeadlock(){let t=this.ball;if(t.owner||t.speed>.3){this.lastProgress=this.time;return}if(this.time-this.lastProgress>9){let e=t.lastTouch,n=e?1-e.team:0,i=new ot(ht(t.pos.x,-Q.HL+2,Q.HL-2),0,ht(t.pos.z,-Q.HW+2,Q.HW-2));this.events.emit("dropball",{t:this.time}),this.phase="stoppage",this.phaseT=0,this.stoppageDelay=.3,this.pendingRestart={type:"freekick",team:n,spot:i},this.lastProgress=this.time}}requestSkip(){this.skipRequested=!0}get displayClock(){let t=this.halfLength*2,e=Math.min(this.clock,t)/t*90*60,n=Math.floor(e/60),i=Math.floor(e%60);return`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}};var _c=class{constructor(t,e){this.m=t,this.p=e,this.input={moveF:0,moveR:0,sprint:!1,yaw:0,pitch:0,lmb:!1,rmb:!1},this.buffer=[],this.intent=null,this.passTarget=null,this.targetVisible=!1,this.lastAction=null}press(t){this.buffer.push({type:t,t:this.m.time})}release(t){this.buffer.push({type:t+"Up",t:this.m.time})}update(t){let e=this.m,n=this.p,i=e.time,r=e.ball,o=this.input,a=o.yaw,l=Math.sin(a),c=Math.cos(a),h=-Math.cos(a),d=Math.sin(a),u=l*o.moveF+h*o.moveR,f=c*o.moveF+d*o.moveR,g=Math.hypot(u,f);g>1&&(u/=g,f/=g);let x=r.owner===n&&r.state==="controlled";n.sprint=o.sprint&&g>.1;let p=n.maxSpeed(n.sprint,x);n.desired.set(u*p,0,f*p),n.faceYaw=a;let m=e.phase==="restart"&&e.restart&&e.restart.taker===n&&e.restart.placed,M=!x&&!r.owner&&r.state!=="dead"&&(this.intent||e.passIntent&&e.passIntent.target===n);x||m||M?(this.passTarget=_p(e,n,a,this.passTarget,e.assist.passCone),this.targetVisible=!!this.passTarget):(this.targetVisible=!1,(!r.owner||r.owner.team!==n.team)&&(this.passTarget=null));let y=n.action;if(y&&y.type==="kick"&&y.kind==="shot"&&!y.contacted&&!y.ai&&(y.aimYaw=a,y.aimPitch=o.pitch),e.phase==="goal"||e.phase==="halftime"){for(let b of this.buffer)b.type.endsWith("Up")||e.requestSkip();this.buffer.length=0;return}if(m){this.restartControls();return}if(e.phase!=="playing"){this.buffer=this.buffer.filter(b=>i-b.t<ve.INPUT_BUFFER&&!b.type.endsWith("Up"));return}let v=[];for(let b of this.buffer){if(this.handle(b,x))continue;let S=b.type==="tackle"||b.type==="slide"?.4:ve.INPUT_BUFFER;i-b.t<S&&!b.type.endsWith("Up")&&v.push(b)}this.buffer=v,this.updateIntent(x)}handle(t,e){let n=this.m,i=this.p,r=n.time,o=this.input,a=i.action;switch(t.type){case"passUp":return a&&a.type==="kick"&&a.kind==="pass"&&a.charging&&Es(a),this.intent&&this.intent.kind==="pass"&&(this.intent.released=!0),!0;case"shootUp":return a&&a.type==="kick"&&a.kind==="shot"&&a.charging&&(a.aimYaw=o.yaw,a.aimPitch=o.pitch,Es(a)),this.intent&&this.intent.kind==="shot"&&!this.intent.released&&(this.intent.released=!0,this.intent.charge=Math.min(1,(r-this.intent.t0)/.65)),!0;case"pass":case"shoot":case"through":{let l=t.type==="shoot"?"shot":t.type;if(e)return ns(n,i)?(l==="shot"?le(n,i,"shot",{charging:o.lmb,aimYaw:o.yaw,aimPitch:o.pitch}):le(n,i,l,{target:this.passTarget,charging:l==="pass"&&o.rmb,aimYaw:o.yaw}),this.lastAction={kind:l,t:r},this.intent=null,!0):!1;if(l==="through")return this.requestPass(),!0;let c=pu(n,i,.75);return this.intent={kind:l,t0:t.t,released:l==="shot"?!o.lmb:!o.rmb,charge:0,until:r+Math.max(ve.INPUT_BUFFER,c!=null?c+.12:0)},!0}case"tackle":case"slide":{if(e)return!1;a&&a.type==="kick"&&!a.contacted&&!a.owned&&(i.action=null,i.faceYaw=null),this.intent=null;let l=t.type==="tackle"?$l(n,i):ql(n,i);return l&&(this.lastAction={kind:t.type,t:r}),l}default:return!0}}updateIntent(t){let e=this.intent;if(!e)return;let n=this.m,i=this.p,r=n.time,o=this.input;if(e.kind==="shot"&&!e.released&&(e.charge=Math.min(1,(r-e.t0)/.65)),t){if(!ns(n,i))return;e.kind==="shot"?le(n,i,"shot",{charge:e.charge,aimYaw:o.yaw,aimPitch:o.pitch,minContact:.06}):le(n,i,"pass",{target:this.passTarget,aimYaw:o.yaw,minContact:.06}),this.intent=null;return}if(r>e.until||n.ball.owner&&n.ball.owner!==i){this.intent=null;return}if(!ns(n,i))return;let a=pu(n,i,.5);if(a!=null&&a<=.13){let l=e.kind==="shot"?"shot":"pass";le(n,i,l,{target:l==="pass"?this.passTarget:null,aimYaw:o.yaw,aimPitch:o.pitch,charge:l==="shot"?Math.max(.25,e.charge):0,firstTime:!0,minContact:Math.max(.04,a),deadline:a+.22}),this.lastAction={kind:l,t:r,firstTime:!0},this.intent=null}else a!=null&&(e.until=Math.max(e.until,r+a+.05))}requestPass(){let t=this.m,e=this.p,n=t.time;n<e.requestReadyAt||(e.requestUntil=n+2.4,e.requestReadyAt=n+ve.REQUEST_COOLDOWN,t.events.emit("request",{player:e,t:n}))}restartControls(){let t=this.m,e=this.p,n=t.time,i=this.input,r=t.restart,o=[],a=e.action;for(let l of this.buffer){if(l.type==="shootUp"){a&&a.kind==="shot"&&a.charging&&(a.aimYaw=i.yaw,a.aimPitch=i.pitch,Es(a));continue}if(l.type==="passUp"){a&&a.charging&&Es(a);continue}if(!e.action){if(l.type==="pass"||l.type==="through"){r.type==="throwin"?le(t,e,"throw",{target:this.passTarget,aimYaw:i.yaw,restart:r,point:this.passTarget?null:Au(e,i.yaw,12)}):le(t,e,l.type==="through"?"through":"pass",{target:this.passTarget,aimYaw:i.yaw,restart:r,charging:l.type==="pass"&&i.rmb});continue}if(l.type==="shoot"){r.type==="throwin"?le(t,e,"throw",{point:Au(e,i.yaw,20),restart:r}):r.type==="corner"?le(t,e,"cross",{point:Au(e,i.yaw,ht(18+i.pitch*30,8,30)),restart:r}):le(t,e,"shot",{charging:i.lmb,aimYaw:i.yaw,aimPitch:i.pitch,restart:r});continue}n-l.t<ve.INPUT_BUFFER&&o.push(l)}}this.buffer=o}};function Au(s,t,e){return new ot(ht(s.pos.x+Math.sin(t)*e,-Q.HL+1,Q.HL-1),0,ht(s.pos.z+Math.cos(t)*e,-Q.HW+1,Q.HW-1))}var Xp=12,So=class{constructor(t,e){this.app=t,this.cfg=e,this.view=t.view,this.audio=t.audio,this.hud=t.hud,this.input=t.input,this.match=e.matchObject||new vc(e.match);let n=this.match;this.human=n.human,this.human&&(this.ctl=new _c(n,this.human),n.humanCtl=this.ctl),this.cam={mode:this.human?"fp":"orbit",yaw:0,pitch:-.14,eye:1.65,fov:t.settings.fov,bob:t.settings.bob?1:0,shake:t.settings.shake?1:0,angle:0,radius:58,height:26},this.acc=0,this.paused=!1,this.ended=!1,this.excite=0,this.slideEye=0,this.unsubs=[],this.kitA=e.colours?e.colours.kits[0].shirt:"#c00",this.kitB=e.colours?e.colours.kits[1].shirt:"#00c",this.view.setVenue(e.venue||"community",e.venueOpts||{}),this.view.setMatch(n,e.colours),this.view.localPlayer=this.human,this.view.firstPerson=!!this.human,this.hookEvents(),this.human&&this.unsubs.push(this.input.on((i,r)=>{this.paused||!this.ctl||(r?this.ctl.press(i):this.ctl.release(i))}))}start(){let t=this.match;this.cfg.kickoffTeam!=null?t.start(this.cfg.kickoffTeam):this.cfg.noStart||t.start(),this.human&&(this.cam.yaw=this.human.yaw);let e=(yo[this.cfg.venue]||yo.community).loud;this.cfg.mode!=="menu"&&this.audio.startCrowd(.25+e*.75)}hookEvents(){let t=this.match,e=t.events,n=this.audio,i=this.view,r=(l,c)=>this.unsubs.push(e.on(l,c)),o=this.cfg.mode==="menu",a=(l,c=1)=>{if(o)return{gain:0};let h=i.camera.position,d=l.x-h.x,u=l.z-h.z,f=Math.hypot(d,u),g=this.cam.yaw,x=-Math.cos(g)*d+Math.sin(g)*u;return{gain:c/(1+f*.045),pan:x/(f+3)}};r("kick",l=>{let c=a(l.pos,1);l.kind==="shot"?(n.play("shot",{...c,gain:c.gain*Math.min(1.2,.55+l.speed/40)}),l.player===this.human&&(i.shake=1),this.excite=Math.max(this.excite,.7)):l.kind==="throw"?n.play("touch",{...c,gain:c.gain*.3}):n.play("pass",{...c,gain:c.gain*Math.min(1,.4+l.speed/30),rate:.95+Math.random()*.1}),l.restart==="kickoff"&&n.play("whistle",{gain:o?0:.8})}),r("touch",l=>n.play("touch",{...a(l.player.pos,l.kind==="receive"?.8:.55),rate:.9+Math.random()*.2})),r("deflect",l=>n.play("bounce",a(l.player.pos,Math.min(1,l.speed/10)))),r("bounce",l=>{l.speed>2&&n.play("bounce",a(t.ball.pos,Math.min(.6,l.speed/16)))}),r("frame",l=>{n.play("post",a(t.ball.pos,Math.min(1,l.speed/18))),n.play("groan",{group:"crowd",gain:o?0:.7}),this.excite=1}),r("save",l=>{n.play(l.caught?"catch":"bounce",a(l.player.pos,1)),l.shot&&l.shot.onTarget&&n.play("groan",{group:"crowd",gain:o?0:.5})}),r("tackle",l=>n.play("tackle",a(l.player.pos,.9))),r("slide",l=>n.play("slide",a(l.player.pos,.8))),r("foul",l=>{n.play("whistle",{gain:o?0:.9}),(l.victim===this.human||l.player===this.human)&&this.hud.notify(l.player===this.human?"FOUL":"FOULED","bad"),l.penalty&&!o&&this.hud.showBanner("PENALTY","",1800)}),r("halftime",()=>{n.play("whistleLong",{gain:o?0:.9}),o||this.hud.showBanner("HALF TIME",`${t.teams[0].short} ${t.scoreline[0]} - ${t.scoreline[1]} ${t.teams[1].short}`,3e3)}),r("fulltime",()=>{if(n.play("whistleLong",{gain:o?0:.9}),o)return;let[l,c]=t.scoreline,h=this.human&&(this.human.team===0?l>c:c>l);if(this.cfg.final&&h){this.hud.showBanner("CHAMPIONS",`${this.cfg.final} winners!`,6e3,"mine"),n.play("cheer",{group:"crowd",gain:1}),i.crowdLevel=1;for(let d=0;d<3;d++)setTimeout(()=>i.celebrate((Math.random()-.5)*30,(Math.random()-.5)*20,this.human.team,1.4),d*500)}else this.hud.showBanner("FULL TIME",`${t.teams[0].short} ${l} - ${c} ${t.teams[1].short}`,4e3)}),r("snap",()=>{o||this.hud.flashFade()}),r("humanYaw",l=>{this.cam.yaw=l.yaw,this.cam.pitch=-.14}),r("request",()=>n.play("shout",{gain:.5})),r("ack",l=>{n.play("ack",{gain:.6}),this.ackPlayer=l.player,this.ackUntil=t.time+1.2}),r("goal",l=>{if(n.play("net",a(l.pos,1)),o||n.play("cheer",{group:"crowd",gain:1}),this.excite=1,i.crowdLevel=1,i.celebrate(l.pos.x,l.pos.z,l.team,1),!o){let c=l.ownGoal?`Own goal (${l.ownGoalBy?l.ownGoalBy.name:""})`:l.scorer?`${l.scorer.name}${l.assist?` \xB7 assist ${l.assist.name}`:""}`:"",h=this.human&&l.scorer===this.human;this.hud.showBanner(h?"GOAL!":"GOAL",`${t.teams[0].short} ${t.scoreline[0]} - ${t.scoreline[1]} ${t.teams[1].short} \xB7 ${c}`,2600,h?"mine":"")}}),r("credit",l=>{if(l.player!==this.human||o)return;let h={passCompleted:["PASS COMPLETED",""],assist:["ASSIST","good"],tackleWon:["TACKLE WON","good"],interception:["INTERCEPTION","good"],possessionLost:["POSSESSION LOST","bad"],shotSaved:["SHOT SAVED",""]}[l.kind];h&&this.hud.notify(h[0],h[1])}),r("goal",l=>{!o&&this.human&&l.scorer===this.human&&this.hud.notify("GOAL","good")})}frame(t){let e=this.match;if(!this.paused&&!this.ended){if(this.human&&this.ctl){let l=this.input.axes();this.input.consumeLook(this.cam,t);let c=this.ctl.input;c.moveF=l.f,c.moveR=l.r,c.sprint=l.sprint,c.yaw=this.cam.yaw,c.pitch=this.cam.pitch;let h=this.input.held;c.lmb=h.lmb,c.rmb=h.rmb}this.acc+=Math.min(t,.1)*(this.cfg.timeScale||1);let a=0;for(;this.acc>=Ts&&a<Xp;)e.step(Ts),this.acc-=Ts,a++,this.cfg.onStep&&this.cfg.onStep(e);a>=Xp&&(this.acc=0),e.phase==="fulltime"&&!this.ended&&e.phaseT>(this.cfg.mode==="menu"?0:2.5)&&(this.ended=!0,this.cfg.onEnd&&this.cfg.onEnd(this))}let n=this.paused?1:this.acc/Ts,i=e.ball.pos,r=Math.max(0,1-Math.min(Math.abs(i.x-Q.HL),Math.abs(i.x+Q.HL))/24);if(this.excite=Math.max(r*.45,this.excite-t*.25),this.cfg.mode!=="menu"&&this.audio.setExcitement(this.excite),this.human){let a=this.human.action,l=a&&a.type==="slide"?a.t<.7?.72:1.65:e.time<this.human.downUntil?.6:1.65;this.cam.eye+=(l-this.cam.eye)*(1-Math.exp(-t*9))}else this.cam.angle+=t*.05;this.cam.fov=this.app.settings.fov,this.cam.bob=this.app.settings.bob?1:0,this.cam.shake=this.app.settings.shake?1:0;let o=this.app.debugCam?{mode:"free",pos:this.app.debugCam.pos,look:this.app.debugCam.look,fov:this.cam.fov}:this.cam;this.view.render(n,t,o,{crowd:this.excite*.5}),this.updateMarkers(),this.cfg.mode!=="menu"&&this.hud.update(this.hudState())}updateMarkers(){let t=this.view.markers,e=this.match;if(t.hideAll(),!this.ctl||this.cfg.mode==="menu")return;let n=this.ctl.passTarget;n&&this.ctl.targetVisible&&t.showRing(n.pos.x,n.pos.z,e.time),this.ackPlayer&&e.time<this.ackUntil&&t.showAck(this.ackPlayer.pos.x,2.25,this.ackPlayer.pos.z,e.time);let i=e.passIntent;i&&i.target===this.human&&i.point&&!e.ball.owner&&t.showIncoming(i.point.x,i.point.z)}hudState(){let t=this.match,e=this.human,n="",i=this.input.touchMode;if(e){let o=t.restart;t.phase==="restart"&&o&&o.taker===e?n=i?o.type==="throwin"?"Throw-in: PASS short throw \xB7 SHOOT long throw":o.type==="corner"?"Corner: SHOOT crosses to where you aim \xB7 PASS short":o.type==="penalty"?"Penalty: aim, hold SHOOT and release":o.type==="kickoff"?"Kick-off: PASS to a teammate":"Free kick: PASS \xB7 THRU \xB7 SHOOT":o.type==="throwin"?"Throw-in: RMB/Space short throw \xB7 LMB long throw":o.type==="corner"?"Corner: LMB cross to where you aim \xB7 RMB short pass":o.type==="penalty"?"Penalty: aim and hold LMB, release to shoot":o.type==="kickoff"?"Kick-off: RMB pass to a teammate":"Free kick: RMB pass \xB7 Space through ball \xB7 LMB shoot":t.phase==="goal"||t.phase==="halftime"?n=i?"Tap any button to skip":"Press any action to skip":i?n=t.ball.owner&&t.ball.owner.team===e.team&&t.ball.owner!==e&&e.requestUntil>t.time?"Pass requested":"":t.ball.owner===e?n="LMB shoot \xB7 RMB pass \xB7 Space through ball":t.ball.owner&&t.ball.owner.team!==e.team?n=t.ball.owner.pos.distXZ(e.pos)<3?"E tackle \xB7 C slide":"":t.ball.owner&&t.ball.owner.team===e.team&&(n=e.requestUntil>t.time?"Pass requested":"Space: call for the ball")}let r=this.ctl&&this.ctl.intent;return{match:t,camera:this.view.camera,view:this.view,camYaw:this.cam.yaw,style:this.view.style,kitA:this.kitA,kitB:this.kitB,hint:n,intentCharge:r&&r.kind==="shot"?r.charge:0,phaseText:t.phase==="halftime"?"HALF TIME":t.phase==="fulltime"?"FULL TIME":t.half===2?"2ND HALF":"1ST HALF",clockText:this.cfg.clockText?this.cfg.clockText(t):void 0,noArrow:this.cfg.noArrow}}setPaused(t){this.paused=t,this.ctl&&t&&(this.ctl.buffer.length=0)}dispose(){for(let t of this.unsubs)t();this.unsubs=[],this.audio.stopCrowd(),this.view.markers.hideAll()}};var Ru="firsttouch.settings.v1",$p="firsttouch.style";var wo={rev:2,sensitivity:1,invertY:!1,fov:100,master:.8,sfx:.9,crowd:.6,difficulty:"assisted",bob:!0,shake:!0,quality:"high",matchLength:"normal",touch:"auto"};function qp(){try{return!!localStorage.getItem(Ru)}catch{return!1}}function Yp(){try{let s=localStorage.getItem(Ru);if(!s)return{...wo};let t={...wo,...JSON.parse(s)};return(t.rev||1)<2&&t.fov===85&&(t.fov=wo.fov),t.rev=2,t.fov=Math.min(200,Math.max(60,Number(t.fov)||wo.fov)),t}catch{return{...wo}}}function Kp(s){try{return localStorage.setItem(Ru,JSON.stringify(s)),!0}catch{return!1}}function Zp(){try{let s=localStorage.getItem($p);return s==="neo"||s==="classic"?s:"classic"}catch{return"classic"}}function Jp(s){try{localStorage.setItem($p,s)}catch{}}var Cu=[{tier:1,league:"Parkside League",venue:"community",label:"Community"},{tier:2,league:"County Division",venue:"town",label:"Town"},{tier:3,league:"Regional Championship",venue:"regional",label:"Regional"},{tier:4,league:"Premier Circuit",venue:"premier",label:"Premier"},{tier:5,league:"Continental Elite",venue:"continental",label:"Continental"}],Sn=[{id:"millbrook",name:"Millbrook Rovers",short:"MIL",tier:1,colors:["#1f8a4c","#f5f5f0","#f5f5f0"],style:"wing",crest:{shape:"shield",pattern:"chevron",symbol:"M"},ground:"Millbrook Rec"},{id:"ashford",name:"Ashford Athletic",short:"ASH",tier:1,colors:["#c8102e","#111111","#111111"],style:"direct",crest:{shape:"circle",pattern:"stripes",symbol:"A"},ground:"Station Lane"},{id:"kettle",name:"Kettle Lane FC",short:"KET",tier:1,colors:["#f07c1b","#1c2a4a","#1c2a4a"],style:"counter",crest:{shape:"diamond",pattern:"half",symbol:"K"},ground:"Kettle Lane"},{id:"harbour",name:"Harbour Park Wanderers",short:"HPW",tier:1,colors:["#5fb7e8","#ffffff","#ffffff"],style:"possession",crest:{shape:"shield",pattern:"band",symbol:"H"},ground:"Harbour Park"},{id:"oldbridge",name:"Oldbridge Town",short:"OLD",tier:2,colors:["#7a1f3d","#8ccdf0","#ffffff"],style:"possession",crest:{shape:"shield",pattern:"quarters",symbol:"O"},ground:"Bridge Road"},{id:"fenwick",name:"Fenwick United",short:"FEN",tier:2,colors:["#f2c500","#111111","#111111"],style:"pressing",crest:{shape:"circle",pattern:"band",symbol:"F"},ground:"Fenwick Meadow"},{id:"stonegate",name:"Stonegate Albion",short:"STA",tier:2,colors:["#1d2f6f","#ffffff","#ffffff"],style:"direct",crest:{shape:"hex",pattern:"chevron",symbol:"S"},ground:"The Gatehouse"},{id:"crowmere",name:"Crowmere City",short:"CRO",tier:2,colors:["#6b3fa0","#e8c547","#ffffff"],style:"wing",crest:{shape:"diamond",pattern:"stripes",symbol:"C"},ground:"Crowmere Park"},{id:"redcliffe",name:"Redcliffe County",short:"RED",tier:3,colors:["#d62828","#ffffff","#ffffff"],style:"pressing",crest:{shape:"shield",pattern:"stripes",symbol:"R"},ground:"Cliffside Stadium"},{id:"northvale",name:"Northvale Forest",short:"NVF",tier:3,colors:["#1b5e3a","#f2f2f2","#f2f2f2"],style:"counter",crest:{shape:"circle",pattern:"chevron",symbol:"N"},ground:"Vale Ground"},{id:"easthaven",name:"Easthaven Rangers",short:"EHR",tier:3,colors:["#1565c0","#ffffff","#ffffff"],style:"wing",crest:{shape:"hex",pattern:"half",symbol:"E"},ground:"Haven Road"},{id:"marlow",name:"Marlow Heath",short:"MAR",tier:3,colors:["#1a1a1a","#f4f4f4","#1a1a1a"],style:"possession",crest:{shape:"shield",pattern:"quarters",symbol:"M"},ground:"Heath Lane"},{id:"kingsport",name:"Kingsport Royals",short:"KIN",tier:4,colors:["#2446c7","#f2c14e","#ffffff"],style:"possession",crest:{shape:"circle",pattern:"crown",symbol:"K"},ground:"Royal Park"},{id:"westmoor",name:"Westmoor Athletic",short:"WES",tier:4,colors:["#f4f4f4","#111111","#111111"],style:"pressing",crest:{shape:"shield",pattern:"band",symbol:"W"},ground:"Moorside Arena"},{id:"ironside",name:"Ironside FC",short:"IRO",tier:4,colors:["#5d6470","#e0352b","#e0352b"],style:"direct",crest:{shape:"hex",pattern:"stripes",symbol:"I"},ground:"The Foundry"},{id:"solace",name:"Solace Bay",short:"SOL",tier:4,colors:["#0f8b8d","#f58a07","#ffffff"],style:"wing",crest:{shape:"diamond",pattern:"chevron",symbol:"S"},ground:"Bayfront Arena"},{id:"valmonte",name:"Valmonte Sporting",short:"VAL",tier:5,colors:["#f5f5f5","#6a2c91","#6a2c91"],style:"possession",crest:{shape:"shield",pattern:"crown",symbol:"V"},ground:"Estadio Valmonte"},{id:"nordhavn",name:"Nordhavn Kickers",short:"NOR",tier:5,colors:["#d7263d","#ffffff","#ffffff"],style:"pressing",crest:{shape:"circle",pattern:"half",symbol:"N"},ground:"Nordhavn Arena"},{id:"castellan",name:"Castellan Imperial",short:"CAS",tier:5,colors:["#141414","#d4af37","#141414"],style:"counter",crest:{shape:"hex",pattern:"crown",symbol:"C"},ground:"Imperial Bowl"},{id:"aurelio",name:"Aurelio Club",short:"AUR",tier:5,colors:["#7cc6f2","#10265c","#10265c"],style:"wing",crest:{shape:"shield",pattern:"stripes",symbol:"A"},ground:"Porto Aurelio"}],ee=s=>Sn.find(t=>t.id===s),rs=s=>Sn.filter(t=>t.tier===s),zn=s=>Cu[s-1];function To(s){let t=Sn.filter(e=>e.tier===s.tier).indexOf(s);return 38+s.tier*9+(3-t)*1.5}function os(s,t=48){let[e,n]=s.colors,i=s.crest,r={shield:"M6 4 H42 V22 C42 34 33 42 24 46 C15 42 6 34 6 22 Z",circle:"M24 3 A21 21 0 1 1 23.99 3 Z",diamond:"M24 2 L46 24 L24 46 L2 24 Z",hex:"M14 4 H34 L45 24 L34 44 H14 L3 24 Z"}[i.shape]||"M6 4 H42 V22 C42 34 33 42 24 46 C15 42 6 34 6 22 Z",o=`c${s.id}${t}`,a="";switch(i.pattern){case"chevron":a=`<path d="M0 26 L24 12 L48 26 V34 L24 20 L0 34 Z" fill="${n}"/>`;break;case"stripes":a=[10,22,34].map(h=>`<rect x="${h}" y="0" width="6" height="48" fill="${n}"/>`).join("");break;case"half":a=`<rect x="24" y="0" width="24" height="48" fill="${n}"/>`;break;case"band":a=`<rect x="0" y="18" width="48" height="10" fill="${n}"/>`;break;case"quarters":a=`<rect x="24" y="0" width="24" height="24" fill="${n}"/><rect x="0" y="24" width="24" height="24" fill="${n}"/>`;break;case"crown":a=`<path d="M13 16 L17 8 L21 14 L24 6 L27 14 L31 8 L35 16 Z" fill="${n}"/>`;break;default:break}let c=(h=>{let d=parseInt(h.slice(1),16);return((d>>16)*.3+(d>>8&255)*.59+(d&255)*.11)/255})(e)>.6?"#111":"#fff";return`<svg class="crest" width="${t}" height="${t}" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="${o}"><path d="${r}"/></clipPath></defs><g clip-path="url(#${o})"><rect width="48" height="48" fill="${e}"/>${a}</g><path d="${r}" fill="none" stroke="#111" stroke-width="2.5"/><text x="24" y="${i.pattern==="crown"?36:31}" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="15" text-anchor="middle" fill="${c}" stroke="${c==="#fff"?"#111":"#fff"}" stroke-width="0.6">${i.symbol}</text></svg>`}var tm=["England","Scotland","Wales","Ireland","France","Spain","Portugal","Italy","Germany","Netherlands","Belgium","Denmark","Norway","Sweden","Poland","Croatia","Serbia","Greece","Turkey","Morocco","Nigeria","Ghana","Senegal","Egypt","Brazil","Argentina","Uruguay","Colombia","Mexico","USA","Canada","Japan","South Korea","Australia"],jp=["Alex","Sam","Jordan","Luca","Mateo","Noah","Kai","Theo","Rafa","Idris","Tomas","Jonas","Emil","Kofi","Yusuf","Diego","Ben","Oscar","Leo","Marco","Hugo","Ruben","Nico","Arlo","Felix","Ade","Kenji","Milo","Sven","Ivo"],Qp=["Hart","Moreno","Okafor","Lindqvist","Bennett","Costa","Novak","Reyes","Walsh","Kowalski","Mensah","Rossi","Dubois","Larsen","Silva","Ibrahim","Clarke","Varga","Tanaka","Moss","Keane","Adeyemi","Brandt","Petrov","Ferreira","Holt","Quinn","Sato","Doyle","Marsh"];function em(s,t){let e=0;for(let r of s)e=e*31+r.charCodeAt(0)>>>0;let n=jp[(e+t*7)%jp.length],i=Qp[(e*3+t*11)%Qp.length];return`${n[0]}. ${i}`}var Lb={GK:{},DEF:{tackling:7,stamina:2,pace:1},CM:{passing:5,stamina:4,control:1},AM:{passing:4,control:4,finishing:1},W:{pace:6,control:3},ST:{finishing:6,pace:3}},Nb={GK:[1],DEF:[2,5,4,3],CM:[6,8,4],AM:[10,8],W:[7,11],ST:[9,10]};function Db(s,t,e){let n={};for(let i of["pace","stamina","control","passing","finishing","tackling"])n[i]=Math.round(t+e.range(-4,4)+(Lb[s][i]||0)-(i==="tackling"&&(s==="ST"||s==="W")?6:0)-(i==="finishing"&&s==="DEF"?6:0));return n}function Eo(s,t={}){let e=t.human||null,n=new gi(xi(s.id+(t.seed||""))),i=t.strength??To(s),r=pc(s.style,e?e.role:null),o=Mo[r],a=new Set;e&&a.add(e.number);let l=o.map((c,h)=>{let u=(Nb[c.role]||[h+1]).find(f=>!a.has(f));if(u==null)for(u=12;a.has(u);)u++;return a.add(u),{role:c.role,number:u,name:em(s.id,h),attrs:Db(c.role,i,n),keeping:Math.round(i+4+n.range(-3,3)),foot:n.next()<.78?"R":"L"}});if(e){let c=l.findIndex(d=>d.role===e.role),h=c>=0?c:l.findIndex(d=>d.role!=="GK");l[h]={role:e.role,number:e.number,name:e.name,attrs:{...e.attrs},foot:e.foot||"R",isHuman:!0,look:e.look}}return{name:s.name,short:s.short,tier:s.tier,style:s.style,formation:r,players:l,clubId:s.id}}function Ps(){return{name:"A. Newcomer",number:9,nationality:"England",foot:"R",role:"ST",attrs:{pace:52,stamina:50,control:50,passing:48,finishing:54,tackling:42},look:{skin:"#e0b48c",hair:"#3b2a1e",boots:"#111111"}}}var Ao=2,Iu=["pace","stamina","control","passing","finishing","tackling"],im={pace:"Pace",stamina:"Stamina",control:"Ball control",passing:"Passing",finishing:"Finishing",tackling:"Tackling"},as=s=>(go.find(t=>t.id===s)||{name:s}).name,kb={ST:{finishing:6,pace:3},W:{pace:6,control:3},AM:{passing:4,control:5},CM:{passing:5,stamina:4},DEF:{tackling:7,stamina:2}};function Ub(s){let t={pace:47,stamina:47,control:46,passing:46,finishing:45,tackling:44};for(let[e,n]of Object.entries(kb[s]||{}))t[e]+=n;return t}var sm={1:{avg:5.8,rep:0,apps:0},2:{avg:6.6,rep:10,apps:3},3:{avg:6.9,rep:28,apps:5},4:{avg:7.1,rep:48,apps:5},5:{avg:7.3,rep:68,apps:5}},rm=[0,160,650,2600,11e3,42e3];function om(){return{apps:0,minutes:0,goals:0,assists:0,ratingSum:0,passCmp:0,passAtt:0,shots:0,shotsOn:0,tackles:0,interceptions:0,possLost:0,fouls:0,motm:0,wins:0,draws:0,losses:0,trophies:0}}function Ob(s){let[t,e,n,i]=s,r=[[[t,e],[n,i]],[[n,t],[i,e]],[[t,i],[e,n]]],o=r.map(a=>a.map(([l,c])=>[c,l]));return[...r,...o]}function Lu(s,t,e){let n=ee(t),i=rs(n.tier).map(l=>l.id),r=new gi(xi(`${s.seed}:${e}:${n.tier}`));for(let l=i.length-1;l>0;l--){let c=Math.floor(r.next()*(l+1));[i[l],i[c]]=[i[c],i[l]]}let o=Ob(i),a=[];return o.forEach((l,c)=>l.forEach(([h,d])=>a.push({round:c+1,home:h,away:d,score:null}))),{no:e,tier:n.tier,league:zn(n.tier).league,fixtures:a,round:1,table:i.map(l=>({id:l,p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0})),finished:!1,final:null,placement:null}}function Nu(s){return[...s.table].sort((t,e)=>e.pts-t.pts||e.gf-e.ga-(t.gf-t.ga)||e.gf-t.gf||t.id.localeCompare(e.id))}function am(s,t,e,n){t.score=[e,n];let i=s.table.find(o=>o.id===t.home),r=s.table.find(o=>o.id===t.away);i.p++,r.p++,i.gf+=e,i.ga+=n,r.gf+=n,r.ga+=e,e>n?(i.w++,r.l++,i.pts+=3):e<n?(r.w++,i.l++,r.pts+=3):(i.d++,r.d++,i.pts++,r.pts++)}function nm(s,t){let e=Math.exp(-t),n=0,i=1;do n++,i*=s.next();while(i>e&&n<10);return n-1}function lm(s,t,e){let n=new gi(xi(`${s.seed}:${t.no}:${t.tier}:${e.round}:${e.home}:${e.away}`)),i=To(ee(e.home))+2.5,r=To(ee(e.away)),o=Math.max(.3,1.35*Math.pow(i/r,1.6)),a=Math.max(.3,1.15*Math.pow(r/i,1.6));am(t,e,nm(n,o),nm(n,a))}function Du(s){let t=s.season;return t.finished?t.final&&!t.final.played?{final:!0,...t.final}:null:t.fixtures.find(e=>e.round===t.round&&(e.home===s.clubId||e.away===s.clubId))||null}function cm(s,t=Date.now()%1e9|0){let e=new gi(t),n=rs(1),i=s.clubId?ee(s.clubId):n[Math.floor(e.next()*n.length)],r={version:Ao,seed:t,createdAt:Date.now(),player:{name:s.name,number:s.number,nationality:s.nationality,foot:s.foot,role:s.role,look:{...s.look},attrs:Ub(s.role),xp:0,points:0,level:1,reputation:5},clubId:i.id,contract:{clubId:i.id,wage:rm[1],years:2,role:`Starting ${as(s.role)}`,expectations:"Average rating 6.0+, learn the game",signedSeason:1},seasonNo:1,season:null,form:[],appsAtClub:0,totals:om(),seasons:[],matchLog:[],timeline:[],trophies:[],window:null,trainingAvailable:!0,committed:[],nextMatchId:1,earnings:0,flags:{}};return r.season=Lu(r,i.id,1),Is(r),gn(r,`Signed for ${i.name} (${zn(1).league}) as ${as(s.role)}`,"transfer"),r}function Is(s){let t=s.seasons.find(e=>e.season===s.seasonNo&&e.clubId===s.clubId);return t||(t={season:s.seasonNo,clubId:s.clubId,tier:ee(s.clubId).tier,...om(),placement:null},s.seasons.push(t)),t}function gn(s,t,e="info"){s.timeline.push({season:s.seasonNo,round:s.season?s.season.round:0,text:t,kind:e})}function hm(s){let t=Du(s);return t?{id:`m${s.nextMatchId}`,fx:t,clubId:s.clubId}:null}function um(s,t,e,n){if(s.committed.includes(t))return{duplicate:!0};s.committed.push(t),s.committed.length>200&&s.committed.splice(0,s.committed.length-200),s.nextMatchId++;let i=s.season,r=ee(s.clubId),o=e.home===s.clubId,[a,l]=n.score,c=o?a:l,h=o?l:a,d=n.stats,u=n.rating,f={xp:0,levelUps:0,rep:0,notes:[]};if(e.final)i.final.played=!0,i.final.score=[a,l],i.final.won=c>h||c===h&&n.penaltyWin;else{let y=i.fixtures.find(v=>v.round===e.round&&v.home===e.home&&v.away===e.away);am(i,y,a,l);for(let v of i.fixtures)v.round===e.round&&!v.score&&lm(s,i,v);i.round++}let g=Is(s);for(let y of[s.totals,g])y.apps++,y.minutes+=n.minutes,y.goals+=d.goals,y.assists+=d.assists,y.ratingSum+=u,y.passCmp+=d.passCmp,y.passAtt+=d.passAtt,y.shots+=d.shots,y.shotsOn+=d.shotsOn,y.tackles+=d.tacklesWon,y.interceptions+=d.interceptions,y.possLost+=d.possLost,y.fouls+=d.fouls,n.motm&&y.motm++,c>h?y.wins++:c<h?y.losses++:y.draws++;let x=o?e.away:e.home;s.matchLog.push({season:s.seasonNo,round:e.final?"F":e.round,clubId:s.clubId,opp:x,home:o,score:[c,h],rating:u,goals:d.goals,assists:d.assists,passCmp:d.passCmp,passAtt:d.passAtt,tackles:d.tacklesWon,interceptions:d.interceptions,keyPasses:d.keyPasses,shotsOn:d.shotsOn,tier:r.tier}),s.matchLog.length>400&&s.matchLog.shift(),s.form.push(u),s.form.length>10&&s.form.shift(),s.appsAtClub++;let p=s.totals;s.appsAtClub===1&&gn(s,`Debut for ${r.name} vs ${ee(x).name} (rating ${u.toFixed(1)})`,"debut"),d.goals>0&&p.goals===d.goals&&gn(s,`First career goal, vs ${ee(x).name}`,"goal"),d.assists>0&&p.assists===d.assists&&gn(s,`First career assist, vs ${ee(x).name}`,"assist"),d.goals>=3&&gn(s,`Hat-trick vs ${ee(x).name}!`,"goal"),n.motm&&p.motm===1&&gn(s,"First Player of the Match award","award");let m=(u-6.3)*2.5+(r.tier-1)*.8+d.goals*.6+d.assists*.4;s.player.reputation=Math.max(0,Math.min(100,s.player.reputation+m)),f.rep=m;let M=Math.round(30+Math.max(0,u-5.5)*25+d.goals*12+d.assists*8+(c>h?10:0));return f.levelUps=ku(s,M),f.xp=M,s.earnings+=s.contract.wage,s.trainingAvailable=!0,!e.final&&i.round===4&&!i.finished&&Fu(s,"mid"),!e.final&&i.round>6&&Fb(s),e.final&&zb(s),f}function ku(s,t){let e=s.player;e.xp+=t;let n=0;for(;e.xp>=100;)e.xp-=100,e.points++,e.level++,n++;return n}function Uu(s){return s<60?3:s<75?2:1}function dm(s,t){let e=s.player;return e.points<=0||!Iu.includes(t)||e.attrs[t]>=99?!1:(e.attrs[t]=Math.min(99,e.attrs[t]+Uu(e.attrs[t])),e.points--,!0)}function Fb(s){let t=s.season;t.finished=!0;let e=Nu(t),n=e.findIndex(r=>r.id===s.clubId)+1;t.placement=n,Is(s).placement=n;let i=zn(t.tier).league;if(n===1){let r=`${i} champions (Season ${s.seasonNo})`;s.trophies.push({season:s.seasonNo,name:`${i} title`,clubId:s.clubId}),s.totals.trophies++,Is(s).trophies++,gn(s,`Won the ${i} with ${ee(s.clubId).name}!`,"trophy")}else gn(s,`Finished ${bc(n)} in the ${i}`,"season");if(t.tier===5&&n<=2){let r=e[n===1?1:0].id;t.final={home:s.clubId,away:r,played:!1,name:"Continental Cup Final",round:"F"};return}Fu(s,"end")}function zb(s){s.season.final.won?(s.trophies.push({season:s.seasonNo,name:"Continental Cup",clubId:s.clubId}),s.totals.trophies++,Is(s).trophies++,gn(s,`Lifted the Continental Cup with ${ee(s.clubId).name}!`,"trophy")):gn(s,"Runner-up in the Continental Cup Final","season"),Fu(s,"end")}function bc(s){return s+(["th","st","nd","rd"][(s%100-20)%10]||["th","st","nd","rd"][s%100]||"th")}function fm(s,t=5){return s.matchLog.filter(e=>e.season>=s.seasonNo-1).slice(-t)}function Bb(s,t){let e=s.player.role,n=Math.max(1,t.length),i=c=>t.reduce((h,d)=>h+(d[c]||0),0),r=i("passAtt"),o=i("passCmp"),a=r?o/r:0,l=(i("tackles")+i("interceptions"))/n;switch(e){case"ST":return{value:(i("goals")+.5*i("assists")+.15*i("shotsOn"))/n,label:"goal threat",unit:"goal involvements per match"};case"W":return{value:(i("goals")+i("assists")+.2*i("keyPasses"))/n,label:"goals and chance creation",unit:"contributions per match"};case"AM":return{value:(i("assists")+i("goals")+.3*i("keyPasses"))/n,label:"strong passing and chance creation",unit:"chances per match"};case"CM":return{value:a*.6+l*.12+.2*i("keyPasses")/n,label:"reliable passing and ball winning",unit:"index",acc:a,def:l};default:return{value:l*.22+a*.45,label:"defensive solidity and distribution",unit:"index",acc:a,def:l}}}var Hb={ST:[.3,.42,.52,.6],W:[.3,.4,.5,.58],AM:[.32,.42,.52,.6],CM:[.55,.62,.68,.74],DEF:[.62,.7,.78,.86]};function Gb(s,t){let e=sm[t.tier],n=fm(s,5),i=n.length?n.reduce((p,m)=>p+m.rating,0)/n.length:0,r=s.player.reputation,o=Bb(s,n),a=Hb[s.player.role][Math.max(0,t.tier-2)]??.5,l=n.length<3?0:Math.max(0,Math.min(1,(i-(e.avg-1.2))/1.2)),c=e.rep?Math.min(1,r/e.rep):1,h=Math.min(1,o.value/a),d=Math.min(1,s.appsAtClub/Math.max(1,e.apps)),u=Vb(s,t),f=u?.45*l+.25*h+.2*c+.1*d:.15*c,g=u&&n.length>=3&&i>=e.avg&&r>=e.rep&&h>=.85&&s.appsAtClub>=e.apps,x=u?`Average rating ${e.avg.toFixed(1)} over 5 matches (you: ${n.length?i.toFixed(2):"-"}); reputation ${e.rep}+ (you: ${Math.round(r)}); ${o.label}; ${e.apps}+ appearances for your current club (you: ${s.appsAtClub}).`:`No ${as(s.player.role).toLowerCase()} role available at the moment.`;return{club:t,score:f,qualifies:g,avg:i,rep:r,needs:u,text:x,contrib:o,conS:h}}function Vb(s,t){let e=Math.floor(s.seasonNo*2+(s.season.round>3?1:0));return xi(`${s.seed}:${t.id}:${s.player.role}:${e}`)%5!==0}function Ou(s){let t=ee(s.clubId).tier;return(t<5?rs(t+1):[]).map(n=>Gb(s,n)).sort((n,i)=>i.score-n.score)}function Pu(s,t){return Math.round(rm[s]*(.9+Math.max(0,t-6.5)*.25)/10)*10}function Fu(s,t){let e=[],n=ee(s.clubId);for(let i of Ou(s)){if(!i.qualifies)continue;let r=[`Recent form: average ${i.avg.toFixed(2)} over the last 5 matches`,`Reputation ${Math.round(i.rep)}`],o=i.contrib;o.acc!=null?r.push(`${o.label} (pass accuracy ${Math.round(o.acc*100)}%, ${o.def.toFixed(1)} tackles + interceptions per match)`):r.push(`${o.label}: ${o.value.toFixed(2)} ${o.unit}`),e.push({clubId:i.club.id,tier:i.club.tier,role:`Starting ${as(s.player.role)}`,wage:Pu(i.club.tier,i.avg),years:2+xi(i.club.id+s.seasonNo)%2,expectations:`Average rating ${(sm[i.club.tier].avg-.2).toFixed(1)}+ and ${o.label}`,reasons:r,kind:"transfer"})}if(e.sort((i,r)=>r.wage-i.wage),e.splice(3),t==="end"){let i=s.contract.years<=1,r=fm(s,5),o=r.length?r.reduce((a,l)=>a+l.rating,0)/r.length:6;if(i&&(e.push({clubId:n.id,tier:n.tier,role:`Starting ${as(s.player.role)}`,wage:Pu(n.tier,o),years:2,expectations:"Keep your place in the side",reasons:["Contract renewal offer"],kind:"renewal"}),o<6.2&&n.tier>1)){let a=rs(n.tier-1)[xi(s.seed+":"+s.seasonNo)%4];e.push({clubId:a.id,tier:a.tier,role:`Starting ${as(s.player.role)}`,wage:Pu(a.tier,o),years:2,expectations:"Rebuild your form with regular football",reasons:["Guaranteed starting place"],kind:"transfer"})}}return s.window={type:t,offers:e,season:s.seasonNo,round:s.season.round},e.length&&gn(s,`${t==="end"?"Season-end":"Mid-season"} window: ${e.length} offer${e.length>1?"s":""}`,"window"),s.window}function pm(s,t){let e=s.window;if(!e)return!1;let n=e.offers[t];if(!n)return!1;let i=ee(n.clubId);if(n.kind==="renewal")return s.contract={clubId:i.id,wage:n.wage,years:n.years+1,role:n.role,expectations:n.expectations,signedSeason:s.seasonNo},gn(s,`Signed a new ${n.years}-season contract with ${i.name}`,"contract"),s.window=null,!0;let r=ee(s.clubId);if(s.clubId=i.id,s.contract={clubId:i.id,wage:n.wage,years:n.years+(e.type==="end"?1:0),role:n.role,expectations:n.expectations,signedSeason:s.seasonNo},s.appsAtClub=0,gn(s,`Transferred from ${r.name} to ${i.name} (${zn(i.tier).league})`,"transfer"),s.window=null,e.type==="mid"){let o=Lu(s,i.id,s.seasonNo),a=s.season.round-1;for(let l of o.fixtures)l.round<=a&&lm(s,o,l);o.round=a+1,s.season=o,Is(s)}return!0}function mm(s){if(!s.window)return;let e=s.window.offers.some(n=>n.kind==="renewal");s.window=null,e&&s.contract.years<=1&&(s.contract.years=2,gn(s,`Stayed at ${ee(s.clubId).name} on a rolling contract`,"contract"))}function gm(s){let t=s.season;return t.finished&&(!t.final||t.final.played)&&!s.window}function xm(s){s.seasonNo++,s.contract.years=Math.max(0,s.contract.years-1),s.season=Lu(s,s.clubId,s.seasonNo),Is(s),s.trainingAvailable=!0,gn(s,`Season ${s.seasonNo} begins with ${ee(s.clubId).name}`,"season")}function ym(s){return s.apps?s.ratingSum/s.apps:0}var Ro={passing:{name:"Passing Gates",time:45,desc:"Pass through the highlighted gate to the teammate behind it. Each clean pass through a gate scores."},finishing:{name:"Finishing",time:50,desc:"Balls are served into the box. Finish past the goalkeeper - first-time finishes are encouraged."},dribbling:{name:"Dribbling Course",time:60,desc:"Dribble the ball through every gate in order, as fast as you can."},practice:{name:"Free Practice",time:0,desc:"Receive, pass, move and shoot with a teammate against a defender and a goalkeeper. No timer, no XP."}};function vm(s,t,e,n,i,r,o,a){let l=(e-s)*(r-t)-(n-t)*(i-s),c=(e-s)*(a-t)-(n-t)*(o-s),h=(o-i)*(t-r)-(a-r)*(s-i),d=(o-i)*(n-r)-(a-r)*(e-i);return l*c<0&&h*d<0}function Ci(s,t,e,n,i={}){return{role:s,number:t,name:e,attrs:n||{pace:55,stamina:70,control:60,passing:60,finishing:50,tackling:50},keeping:55,foot:"R",...i}}var Mc=class{constructor(t,e){this.kind=t,this.def=Ro[t],this.human=e,this.score=0,this.t=0,this.done=!1,this.events=[],this.props=null}matchConfig(){let t={...this.human,isHuman:!0,name:this.human.name,attrs:{...this.human.attrs}},e,n;switch(this.kind){case"passing":t.role="CM",e=[t,Ci("W",11,"Station A"),Ci("W",7,"Station B"),Ci("ST",9,"Station C"),Ci("AM",10,"Station D")],n=[];break;case"finishing":t.role="ST",e=[t,Ci("CM",8,"Coach")],n=[Ci("GK",1,"Keeper",null)];break;case"dribbling":t.role="W",e=[t],n=[];break;default:e=[t,Ci("CM",8,"Teammate")],n=[Ci("DEF",4,"Defender",{pace:50,stamina:70,control:45,passing:45,finishing:40,tackling:52}),Ci("GK",1,"Keeper")]}let i=(r,o)=>({name:r,short:r.slice(0,3).toUpperCase(),tier:1,style:"wing",players:o});return{seed:7+Math.floor(Math.random()*1e3),halfLength:1e6,difficulty:"assisted",rules:!1,mode:"drill",teams:[i("Training",e),n.length?i("Opposition",n):null]}}setup(t,e){this.m=t,this.view=e,t.phase="playing",t.clock=0;let n=t.human;this.h=n;for(let r of t.players)r.scripted=!r.isHuman&&!r.isGK&&this.kind!=="practice";let i=new tn;if(this.kind==="passing"){this.center=new ot(-4,0,0),n.pos.copy(this.center);let r=[[10,9],[10,-9],[-12,11],[-12,-11]];this.stations=[];let o=t.teams[0].players.filter(a=>!a.isHuman);r.forEach(([a,l],c)=>{let h=o[c];h.pos.set(this.center.x+a,0,this.center.z+l),h.home={station:h.pos.clone()};let d=this.center.x+a*.5,u=this.center.z+l*.5,f=Math.hypot(a,l),g=-l/f,x=a/f,p={p:h,a:new ot(d+g*1.1,0,u+x*1.1),b:new ot(d-g*1.1,0,u-x*1.1),c:new ot(d,0,u)};this.stations.push(p),i.cone(D.CONE,.16,.42,10,p.a.x,.21,p.a.z),i.cone(D.CONE,.16,.42,10,p.b.x,.21,p.b.z)}),this.active=0,this.pickActive(),this.resetBall()}else if(this.kind==="finishing")n.pos.set(Q.HL-15,0,0),this.server=t.teams[0].players.find(r=>!r.isHuman),this.served=0,this.maxBalls=8,this.serve();else if(this.kind==="dribbling"){this.gates=[],[-20,-14,-8,-2,4,10,16,22].forEach((a,l)=>{let c=l%2?-4:4,h={a:new ot(a,0,c-1.25),b:new ot(a,0,c+1.25),c:new ot(a,0,c)};this.gates.push(h),i.cone(D.CONE,.16,.42,10,h.a.x,.21,h.a.z),i.cone(D.CONE,.16,.42,10,h.b.x,.21,h.b.z),i.box(D.TARGET,.05,.05,2.5,a,.6,c)});let o={a:new ot(27,0,-3),b:new ot(27,0,3),c:new ot(27,0,0),finish:!0};this.gates.push(o);for(let a=-3;a<=3;a+=1.5)i.cone(D.TARGET,.14,.36,10,27,.18,a);n.pos.set(-27,0,0),n.yaw=Math.PI/2,t.ball.place(-26.2,0),t.ball.state="free",this.next=0,this.started=!1}else n.pos.set(-6,0,0),n.yaw=Math.PI/2,t.teams[0].players.find(o=>!o.isHuman).pos.set(4,0,10),t.teams[1].players.find(o=>!o.isGK).pos.set(14,0,0),t.keeper(1).pos.set(Q.HL-1,0,0),this.resetBall(!0);for(let r of t.players)r.prevPos.copy(r.pos),r.isHuman||(r.yaw=Ft(n.pos.x-r.pos.x,n.pos.z-r.pos.z)),r.prevYaw=r.yaw;if(n.yaw||(n.yaw=Math.PI/2),t.events.emit("humanYaw",{yaw:this.kind==="passing"?Ft(this.stations[this.active].c.x-n.pos.x,this.stations[this.active].c.z-n.pos.z):Math.PI/2}),i.vcount){this.props=new Je,this.props.add(new ie(i.buildSolid(),ui({})));let r=new ie(i.buildEdges(),Kn({}));r.frustumCulled=!1,this.props.add(r),e.scene.add(this.props)}t.preStep=r=>this.preStep(r)}dispose(){this.props&&(this.view.scene.remove(this.props),this.props.traverse(t=>t.geometry&&t.geometry.dispose())),this.m&&(this.m.preStep=null)}resetBall(t=!1){let e=this.m,n=this.h,i=n.yaw;e.ball.place(n.pos.x+Math.sin(i)*.7,n.pos.z+Math.cos(i)*.7),e.ball.state="free",e.ball.owner=null,e.ball.lastKick=null,this.lastKickSeen=null,this.gateOk=!1,this.resetAt=null,t&&(e.passIntent=null)}pickActive(){let t=this.active;for(;t===this.active;)t=Math.floor(Math.random()*this.stations.length);this.active=t}serve(){let t=this.m,e=this.server,n=this.h,i=Math.random()<.5?1:-1;e.pos.set(Q.HL-9-Math.random()*6,0,i*(13+Math.random()*3)),e.prevPos.copy(e.pos),e.vel.set(0,0,0),e.yaw=Ft(n.pos.x-e.pos.x,n.pos.z-e.pos.z),t.ball.place(e.pos.x+Math.sin(e.yaw)*.6,e.pos.z+Math.cos(e.yaw)*.6),t.ball.state="free",t.ball.owner=null,t.ball.lastKick=null,this.serveAt=t.time+.9,this.shotAt=null,this.resetAt=null,this.served++,this.ballDone=!1}preStep(t){let e=this.m,n=this.h,i=e.ball,r=e.time;if(this.kind==="passing")for(let o of this.stations){let a=o.p,l=a.home.station,c=a.pos.distXZ(l);if(i.owner===a)a.desired.set(0,0,0),a.faceYaw=Ft(n.pos.x-a.pos.x,n.pos.z-a.pos.z),!a.action&&r-(a.gotAt||r)>.55&&le(e,a,"pass",{target:n,ai:!0});else{a.gotAt=r;let h=i.pos.distXZ(a.pos);if(!i.owner&&h<4&&i.speed<12){let d=i.pos.x-a.pos.x,u=i.pos.z-a.pos.z;a.desired.set(d*2,0,u*2)}else c>.3?a.desired.set((l.x-a.pos.x)*2.5,0,(l.z-a.pos.z)*2.5):a.desired.set(0,0,0);a.faceYaw=Ft(i.pos.x-a.pos.x,i.pos.z-a.pos.z)}}else if(this.kind==="finishing"){let o=this.server;if(o.desired.set(0,0,0),o.faceYaw=Ft(n.pos.x-o.pos.x,n.pos.z-o.pos.z),this.serveAt&&r>=this.serveAt&&!o.action){this.serveAt=null;let a=Math.random()<.3,l=new ot(n.pos.x+(Math.random()-.5)*2,0,n.pos.z+(Math.random()-.5)*2);a?le(e,o,"cross",{point:l,ai:!0,elev:.35}):le(e,o,"pass",{target:n,ai:!0})}}}step(){let t=this.m,e=this.h,n=t.ball,i=t.time;if(this.done)return;this.t+=1/120;let r=this.def.time;if(this.kind==="passing"){let o=n.lastKick;o&&o!==this.lastKickSeen&&(this.lastKickSeen=o,o.player===e&&(this.gateOk=!1,this.passTarget=this.stations[this.active]));let a=this.stations[this.active];o&&o.player===e&&vm(n.prevPos.x,n.prevPos.z,n.pos.x,n.pos.z,a.a.x,a.a.z,a.b.x,a.b.z)&&(this.gateOk=!0),n.owner&&n.owner!==e&&o&&o.player===e&&!this.resolved&&(this.resolved=!0,n.owner===a.p&&this.gateOk?(this.score++,this.note("GATE +1","good"),this.pickActive()):this.note(n.owner===a.p?"MISSED THE GATE":"WRONG TEAMMATE","bad")),n.owner===e&&(this.resolved=!1),!n.owner&&(n.pos.distXZ(this.center)>26||n.speed<.2&&n.pos.distXZ(e.pos)>3&&!this.stations.some(l=>l.p.pos.distXZ(n.pos)<3))&&(this.resetAt||(this.resetAt=i+.8),i>=this.resetAt&&this.resetBall()),this.view.markers.showIncoming(a.c.x,a.c.z)}else if(this.kind==="finishing"){let o=n.lastKick;o&&o.player===e&&o.kind==="shot"&&!this.shotAt&&(this.shotAt=i);let a=n.pos.x-fe>Q.HL&&n.crossing[0]&&n.crossing[0].inMouth;if(this.ballDone||(a?(this.score++,this.ballDone=!0,this.note(o&&o.firstTime?"FIRST-TIME GOAL!":"GOAL","good"),this.resetAt=i+1.4,t.events.emit("drillGoal",{pos:n.pos.clone()})):n.state==="held"?(this.ballDone=!0,this.note("SAVED","bad"),this.resetAt=i+1):n.pos.x-fe>Q.HL||Math.abs(n.pos.z)>Q.HW||this.shotAt&&i-this.shotAt>3.2?(this.ballDone=!0,this.note("MISSED","bad"),this.resetAt=i+.9):!this.shotAt&&this.serveAt==null&&n.speed<.3&&!n.owner&&i>6&&n.pos.distXZ(e.pos)>6&&(this.ballDone=!0,this.resetAt=i+.5)),this.resetAt&&i>=this.resetAt){t.keeper(1).hold&&(t.keeper(1).hold=null);let l=t.keeper(1);l.action=null,l.pos.set(Q.HL-1,0,0),this.served>=this.maxBalls?this.finish():this.serve()}}else if(this.kind==="dribbling"){!this.started&&(e.speed>.5||n.owner===e)&&(this.started=!0,this.t=0),this.started||(this.t=0);let o=this.gates[this.next];o&&vm(n.prevPos.x,n.prevPos.z,n.pos.x,n.pos.z,o.a.x,o.a.z,o.b.x,o.b.z)&&n.lastTouch===e&&(this.next++,this.score=this.next,o.finish?(this.note(`FINISHED ${this.t.toFixed(1)} s`,"good"),this.finish()):this.note(`GATE ${this.next}/${this.gates.length-1}`,"good")),o&&this.view.markers.showIncoming(o.c.x,o.c.z),!n.owner&&n.speed<.2&&n.pos.distXZ(e.pos)>6?(this.resetAt||(this.resetAt=i+1),i>this.resetAt&&this.resetBall()):n.owner&&(this.resetAt=null)}else{let o=Math.abs(n.pos.z)-fe>Q.HW||Math.abs(n.pos.x)-fe>Q.HL,a=n.pos.x-fe>Q.HL&&n.crossing[0]&&n.crossing[0].inMouth;if((o||n.state==="held")&&!this.resetAt&&(a&&(this.score++,this.note("GOAL","good"),t.events.emit("drillGoal",{pos:n.pos.clone()})),this.resetAt=i+(n.state==="held"?1.2:1.5)),this.resetAt&&i>=this.resetAt){let l=t.keeper(1);l.hold=null,l.action=null,l.pos.set(Q.HL-1,0,0),this.resetBall(!0)}}r&&this.t>=r&&this.finish()}note(t,e){this.events.push({text:t,kind:e})}finish(){this.done||(this.done=!0,this.m.phase="fulltime",this.m.phaseT=0)}clockText(){if(!this.def.time)return`Goals ${this.score}`;let t=Math.max(0,this.def.time-this.t);return this.kind==="dribbling"?`${this.t.toFixed(1)} s \xB7 gate ${Math.min(this.next+1,this.gates.length)}/${this.gates.length}`:this.kind==="finishing"?`${Math.ceil(t)} s \xB7 goals ${this.score} \xB7 ball ${Math.min(this.served,this.maxBalls)}/${this.maxBalls}`:`${Math.ceil(t)} s \xB7 gates ${this.score}`}result(){let t=0,e="";if(this.kind==="passing")t=ht(Math.round(8+this.score*2.5),8,35),e=`${this.score} gate passes in ${this.def.time} s`;else if(this.kind==="finishing")t=ht(Math.round(8+this.score*4),8,35),e=`${this.score} goals from ${this.maxBalls} balls`;else if(this.kind==="dribbling"){let n=this.next>=this.gates.length;t=n?ht(Math.round(45-this.t),12,35):ht(4+this.next*2,4,18),e=n?`Course completed in ${this.t.toFixed(1)} s`:`${this.next} of ${this.gates.length} gates in the time limit`}return{xp:t,text:e,score:this.score}}};var _m=120,Mm="firsttouch.tutorial";function Sm(){try{return!!localStorage.getItem(Mm)}catch{return!1}}function Bu(s){try{localStorage.setItem(Mm,s)}catch{}}var Co=[{id:"look",par:6,cap:12,say:"Welcome, rookie! First things first: find the golden star.",hint:["Move the mouse to look around","Drag on the right side of the screen to look around"]},{id:"move",par:7,cap:12,say:"Sharp eyes! Now jog over to the glowing circle.",hint:["W A S D to move","Left thumb: drag to move"]},{id:"sprint",par:5,cap:10,say:"Feel the wind! Sprint to the next circle.",hint:["Hold Shift while you move","Push the stick all the way out to sprint"]},{id:"ball",par:5,cap:10,say:"Here's the ball. Just run into it to take it.",hint:["Run into the ball","Run into the ball"]},{id:"dribble",par:7,cap:14,say:"Green glow = YOUR ball. Dribble it through the gate!",hint:["The ball sticks to your feet: just move","The ball sticks to your feet: just move"]},{id:"pass",par:6,cap:12,say:"Jojo is calling for it! Look at him and pass.",hint:["Look at Jojo (ring under him), then right-click","Look at Jojo (ring under him), then tap PASS"]},{id:"receive",par:4,cap:8,say:"Here it comes back. Let it roll to your feet.",hint:["Stand still or step towards it","Stand still or step towards it"]},{id:"shoot",par:8,cap:20,say:"The fun part: score past Sleepy Sam!",hint:["Aim with the crosshair, hold left mouse to power up, release","Aim by looking, hold SHOOT to power up, release"]},{id:"tackle",par:6,cap:14,say:"Uh-oh, Big Barry nicked it. Win it back!",hint:["Get close and press E to tackle","Get close and tap TACKLE"]}],bm=["Nice!","Lovely!","Class!","Sharp!","Easy!"],Wb=[[9,"Superstar"],[7,"Starting XI"],[4,"Squad player"],[0,"Future legend"]];function Xb(s,t,e,n,i,r,o,a){let l=(e-s)*(r-t)-(n-t)*(i-s),c=(e-s)*(a-t)-(n-t)*(o-s),h=(o-i)*(t-r)-(a-r)*(s-i),d=(o-i)*(n-r)-(a-r)*(e-i);return l*c<0&&h*d<0}var Cr=(s,t=2)=>(s.x=ht(s.x,-Q.HL+t,Q.HL-t),s.z=ht(s.z,-Q.HW+t,Q.HW-t),s);function zu(s,t,e,n,i={}){return{role:s,number:t,name:e,attrs:n,keeping:55,foot:"R",...i}}var Sc=class{constructor(t){this.kind="tutorial",this.human=t,this.def={name:"Warm-up with Coach Ada",time:_m},this.t=0,this.done=!1,this.timeUp=!1,this.events=[],this.idx=-1,this.stepT=0,this.stars=0,this.results=[],this.say="",this.waitUntil=null,this.endAt=null}matchConfig(){let e=[{...this.human,isHuman:!0,role:"CM",attrs:{...this.human.attrs}},zu("CM",8,"Jojo",{pace:55,stamina:80,control:70,passing:72,finishing:50,tackling:50})],n=[zu("DEF",5,"Big Barry",{pace:34,stamina:60,control:22,passing:30,finishing:20,tackling:20}),zu("GK",1,"Sleepy Sam",{pace:40,stamina:60,control:40,passing:40,finishing:20,tackling:20},{keeping:8})],i=(r,o)=>({name:r,short:r.slice(0,3).toUpperCase(),tier:1,style:"wing",players:o});return{seed:4242,halfLength:1e6,difficulty:"assisted",rules:!1,mode:"tutorial",teams:[i("Training",e),i("Coaches",n)]}}setup(t,e){this.m=t,this.view=e,t.phase="playing",t.clock=0,t.foul=()=>this.note("Easy, tiger! That's a foul in a real match.","bad"),t.checkDeadlock=()=>{};let n=this.h=t.human;this.jojo=t.teams[0].players.find(i=>!i.isHuman),this.barry=t.teams[1].players.find(i=>!i.isGK),this.sam=t.keeper(1),this.jojo.scripted=!0,this.barry.scripted=!0,t.aiParams[1]&&(t.aiParams[1].gkReaction=.8),n.pos.set(-8,0,0),n.yaw=Math.PI/2,this.jojo.pos.set(-4,0,9),this.barry.pos.set(-29,0,-18),this.sam.pos.set(Q.HL-1,0,0),this.sam.yaw=-Math.PI/2,this.parkBall();for(let i of t.players)i!==n&&i!==this.sam&&(i.yaw=Ft(n.pos.x-i.pos.x,n.pos.z-i.pos.z)),i.prevPos.copy(i.pos),i.prevYaw=i.yaw;this.buildProps(e),t.preStep=i=>this.preStep(i),t.events.emit("humanYaw",{yaw:n.yaw}),this.next()}buildProps(t){let e=c=>{let h=new Je;h.add(new ie(c.buildSolid(),ui({})));let d=new ie(c.buildEdges(),Kn({}));return d.frustumCulled=!1,h.add(d),h.visible=!1,h},n=new tn;n.cone(D.GOLD,.42,.55,5,0,.275,0),n.cone(D.GOLD,.42,.55,5,0,-.275,0,{rx:Math.PI}),this.star=e(n);let i=new tn;i.cone(D.CONE,.18,.5,10,0,.25,-1.3),i.cone(D.CONE,.18,.5,10,0,.25,1.3),i.box(D.TARGET,.06,.06,2.6,0,.75,0),this.gate=e(i);let r=new Je,o=new Gi(.95,1.25,40);o.rotateX(-Math.PI/2);let a=new ie(o,ws(D.MARKER,.85));a.position.y=.04,a.renderOrder=3;let l=new ie(new oi(.1,.1,6,10,1,!0),ws(D.GOLD,.45));l.position.y=3,r.add(a,l),r.visible=!1,this.ring=r,this.props=new Je,this.props.add(this.star,this.gate,this.ring),t.scene.add(this.props)}dispose(){this.props&&(this.view.scene.remove(this.props),this.props.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()})),this.m&&(this.m.preStep=null)}note(t,e=""){this.events.push({type:"note",text:t,kind:e})}fx(t,e={}){this.events.push({type:t,...e})}get current(){return Co[this.idx]||null}get index(){return Math.max(0,Math.min(this.idx,Co.length-1))}parkBall(){let t=this.m.ball;t.place(-27,17),t.state="free",t.owner=null,t.lastKick=null}ballAtFeet(){let t=this.m,e=this.h,n=t.ball;n.owner&&n.owner!==e&&t.loseControl("loose"),n.place(e.pos.x+Math.sin(e.yaw)*.55,e.pos.z+Math.cos(e.yaw)*.55),n.state="free",n.owner=null,n.lastKick=null}dirToGoal(t){let e=Q.HL-t.x,n=-t.z,i=Math.hypot(e,n)||1;return{x:e/i,z:n/i}}showRing(t){this.ring.visible=!0,this.ring.position.set(t.x,0,t.z),this.target=t}resetKeeper(){let t=this.sam;t.hold=null,t.action=null,t.vel.set(0,0,0),t.pos.set(Q.HL-1,0,0),t.prevPos.copy(t.pos),t.yaw=-Math.PI/2}next(){this.idx++,this.stepT=0,this.ring.visible=!1,this.star.visible=!1,this.gate.visible=!1;let t=this.current;if(!t){this.say="You're match-fit! See you on the pitch.",this.endAt=this.t+1.8,this.fx("finale");return}this.say=t.say,this.enter(t.id),this.fx("step",{index:this.idx})}enter(t){let e=this.m,n=this.h,i=e.ball;switch(this.misses=0,this.resetAt=null,t){case"look":{let r=n.yaw+1,o=Cr(new ot(n.pos.x+Math.sin(r)*9,0,n.pos.z+Math.cos(r)*9));this.star.position.set(o.x,2.3,o.z),this.star.visible=!0;break}case"move":this.showRing(Cr(new ot(n.pos.x+6,0,n.pos.z+4)));break;case"sprint":this.sprinted=!1,this.showRing(Cr(new ot(n.pos.x+12,0,n.pos.z-6)));break;case"ball":{let r=this.dirToGoal(n.pos);i.place(n.pos.x+r.x*3.5,n.pos.z+r.z*3.5),i.state="free",i.owner=null,i.lastKick=null;break}case"dribble":{let r=this.dirToGoal(n.pos),o=Cr(new ot(n.pos.x+r.x*6.5,0,n.pos.z+r.z*6.5+2.2),10),a=o.x-n.pos.x,l=o.z-n.pos.z,c=Math.hypot(a,l)||1,h=-l/c,d=a/c;this.gateLine={ax:o.x+h*1.3,az:o.z+d*1.3,bx:o.x-h*1.3,bz:o.z-d*1.3},this.gate.position.set(o.x,0,o.z),this.gate.rotation.y=Ft(a,l)+Math.PI/2,this.gate.visible=!0;let u=o.z>0?-1:1;this.jojoSpot=Cr(new ot(o.x-1,0,o.z+u*11),3);break}case"pass":break;case"receive":{let r=this.jojo,o=e.passIntent&&e.passIntent.target===n&&!i.owner;i.owner!==r&&!o&&(i.owner&&e.loseControl("loose"),i.place(r.pos.x+Math.sin(r.yaw)*.6,r.pos.z+Math.cos(r.yaw)*.6),i.state="free",i.owner=null);break}case"shoot":{this.resetKeeper(),(Math.hypot(Q.HL-n.pos.x,n.pos.z)>20||Math.abs(n.pos.z)>12)&&(this.fx("fade"),n.pos.set(Q.HL-13,0,ht(n.pos.z,-5,5)),n.prevPos.copy(n.pos),n.vel.set(0,0,0),n.yaw=Ft(Q.HL-n.pos.x,-n.pos.z),e.events.emit("humanYaw",{yaw:n.yaw})),i.owner!==n&&this.ballAtFeet(),this.shotAt=null;break}case"tackle":{this.fx("fade"),this.resetKeeper(),i.owner&&e.loseControl("loose");let r=-n.pos.x,o=-n.pos.z,a=Math.hypot(r,o)||1,l=Cr(new ot(n.pos.x+r/a*7,0,n.pos.z+o/a*7),4),c=this.barry;c.pos.copy(l),c.prevPos.copy(l),c.vel.set(0,0,0),c.yaw=Ft(n.pos.x-l.x,n.pos.z-l.z),c.prevYaw=c.yaw,i.place(l.x+Math.sin(c.yaw)*.55,l.z+Math.cos(c.yaw)*.55),i.state="free",i.owner=null,i.lastKick=null,n.vel.set(0,0,0),n.yaw=Ft(l.x-n.pos.x,l.z-n.pos.z),e.events.emit("humanYaw",{yaw:n.yaw}),this.tackled=!1;break}}}complete(t,e){let n=this.current,i=t&&this.stepT<=n.par;i&&this.stars++,this.results.push({id:n.id,ok:t,star:i,t:this.stepT});let r=this.target&&this.ring.visible?this.target:this.h.pos;this.note(e||(t?bm[this.idx%bm.length]:"No worries, let's keep going!"),t?"good":""),this.fx("done",{ok:t,star:i,x:r.x,z:r.z,big:n.id==="shoot"&&t}),this.say=t?i?`${e||"Nice!"} That's a star!`:e||"Nice!":"No worries, let's keep going!",this.waitUntil=this.t+(n.id==="shoot"&&t?1.6:.9)}preStep(){let t=this.m,e=this.h,n=t.ball,i=t.time,r=this.jojo,o=this.barry;if(n.owner===r)r.desired.set(0,0,0),r.faceYaw=Ft(e.pos.x-r.pos.x,e.pos.z-r.pos.z),!r.action&&i-(r.gotAt||i)>.7&&le(t,r,"pass",{target:e,ai:!0});else{r.gotAt=i;let a=this.jojoSpot,l=n.pos.distXZ(r.pos);if(!n.owner&&l<5&&n.speed<13&&n.lastKick&&n.lastKick.player===e)r.desired.set((n.pos.x-r.pos.x)*2.5,0,(n.pos.z-r.pos.z)*2.5);else if(a&&r.pos.distXZ(a)>.4){let c=a.x-r.pos.x,h=a.z-r.pos.z,d=Math.hypot(c,h),u=Math.min(r.jogSpeed(),d*2);r.desired.set(c/d*u,0,h/d*u)}else r.desired.set(0,0,0);r.faceYaw=Ft(e.pos.x-r.pos.x,e.pos.z-r.pos.z)}if(this.current&&this.current.id==="tackle")if(n.owner===o){let a=e.pos.x-o.pos.x,l=e.pos.z-o.pos.z,c=Math.hypot(a,l)||1,h=c>2?1.4:0;o.desired.set(a/c*h,0,l/c*h),o.faceYaw=Ft(a,l)}else!n.owner&&n.pos.distXZ(o.pos)<3&&this.stepT<1.5?o.desired.set((n.pos.x-o.pos.x)*2,0,(n.pos.z-o.pos.z)*2):o.desired.set(0,0,0);else o.desired.set(0,0,0),o.faceYaw=Ft(e.pos.x-o.pos.x,e.pos.z-o.pos.z)}step(){if(this.done)return;let t=1/120,e=this.m,n=this.h,i=e.ball,r=e.time;if(this.t+=t,this.animate(),this.t>=_m){this.timeUp=!0,this.say="Time's up, but you've got the basics!",this.finish();return}if(this.endAt!=null){this.t>=this.endAt&&this.finish();return}if(this.waitUntil!=null){this.t>=this.waitUntil&&(this.waitUntil=null,this.next());return}let o=this.current;switch(this.stepT+=t,o.id){case"look":{let a=e.humanCtl?e.humanCtl.input:{yaw:n.yaw,pitch:0},l=Math.cos(a.pitch),c=Math.sin(a.yaw)*l,h=Math.sin(a.pitch),d=Math.cos(a.yaw)*l,u=this.star.position.x-n.pos.x,f=this.star.position.y-1.65,g=this.star.position.z-n.pos.z,x=Math.hypot(u,f,g)||1;(c*u+h*f+d*g)/x>Math.cos(.2)&&(this.fx("star",{x:this.star.position.x,y:this.star.position.y,z:this.star.position.z}),this.complete(!0,"Found it!"));break}case"move":case"sprint":n.sprint&&(this.sprinted=!0),n.pos.distXZ(this.target)<(o.id==="move"?1.3:1.6)&&this.complete(!0,o.id==="sprint"&&this.sprinted?"Rapid!":"Made it!");break;case"ball":i.owner===n&&this.complete(!0,"Got it!");break;case"dribble":{let a=this.gateLine;if((i.owner===n||i.lastTouch===n)&&Xb(i.prevPos.x,i.prevPos.z,i.pos.x,i.pos.z,a.ax,a.az,a.bx,a.bz)){this.complete(!0,"Silky!");break}this.recoverBall();break}case"pass":{let a=i.lastKick;if(i.owner===this.jojo&&a&&a.player===n){this.complete(!0,"Perfect pass!");break}i.owner===this.jojo&&(this.jojo.gotAt=r),this.recoverBall(a&&a.player===n?"Look right at Jojo and try again.":null);break}case"receive":if(i.owner===n){this.complete(!0,"Lovely first touch!");break}!i.owner&&i.speed<.3&&i.pos.distXZ(n.pos)>4&&i.pos.distXZ(this.jojo.pos)>3&&this.ballAtFeet();break;case"shoot":{let a=i.lastKick;if(a&&a.player===n&&a.kind==="shot"&&!this.shotAt&&(this.shotAt=r),i.pos.x-fe>Q.HL&&i.crossing[0]&&i.crossing[0].inMouth&&!this.resetAt){this.fx("goal",{x:i.pos.x,z:i.pos.z}),this.complete(!0,"GOAL! Top bins!");break}!this.resetAt&&this.shotAt&&(i.pos.x-fe>Q.HL||Math.abs(i.pos.z)>Q.HW||i.state==="held"||r-this.shotAt>3)&&(this.resetAt=r+1.1,this.note(i.state==="held"?"Saved! Sam woke up. Again!":"So close! Go again.","bad")),this.resetAt&&r>=this.resetAt&&(this.resetAt=null,this.shotAt=null,this.resetKeeper(),this.ballAtFeet());break}case"tackle":{n.action&&n.action.type==="tackle"&&(this.tackled=!0),i.owner===n&&this.complete(!0,this.tackled?"What a tackle!":"Got it back!");break}}this.waitUntil==null&&this.stepT>=o.cap&&this.timeout(o.id)}recoverBall(t){let e=this.m,n=this.h,i=e.ball,r=e.time;if(!(!i.owner&&i.speed<.4&&i.pos.distXZ(n.pos)>3.5&&i.pos.distXZ(this.jojo.pos)>2.5)){this.resetAt=null;return}this.resetAt==null?(this.resetAt=r+1.2,t&&this.note(t,"bad")):r>=this.resetAt&&(this.resetAt=null,this.ballAtFeet())}timeout(t){t==="ball"&&this.m.ball.owner!==this.h&&this.ballAtFeet(),this.complete(!1)}animate(){let t=this.t;if(this.star.visible&&(this.star.rotation.y=t*2.2,this.star.position.y=2.3+Math.sin(t*3)*.18),this.ring.visible){let e=1+.08*Math.sin(t*6);this.ring.children[0].scale.set(e,1,e)}}finish(){this.done||(this.done=!0,this.star.visible=!1,this.ring.visible=!1,this.gate.visible=!1,this.m.phase="fulltime",this.m.phaseT=1.5)}clockText(){return""}objective(t){let e=this.current,n=this.m.ball,i=this.h;if(!e||this.waitUntil!=null||this.endAt!=null)return null;let r=n.owner===i;switch(e.id){case"look":return t.set(this.star.position.x,this.star.position.y,this.star.position.z);case"move":case"sprint":return t.set(this.target.x,.8,this.target.z);case"dribble":return r?t.set(this.gate.position.x,.5,this.gate.position.z):t.set(n.pos.x,n.pos.y,n.pos.z);case"pass":return r?t.set(this.jojo.pos.x,1.2,this.jojo.pos.z):t.set(n.pos.x,n.pos.y,n.pos.z);case"shoot":return r?t.set(Q.HL,1,0):t.set(n.pos.x,n.pos.y,n.pos.z);default:return t.set(n.pos.x,n.pos.y,n.pos.z)}}result(){let t=Wb.find(([e])=>this.stars>=e)[1];return{stars:this.stars,total:Co.length,time:this.t,timeUp:this.timeUp,rank:t,completed:this.results.filter(e=>e.ok).length}}};var Nn=(s,t,e,n)=>{let i=document.createElement(s);return t&&(i.className=t),n!=null&&(i.innerHTML=n),e&&e.appendChild(i),i},wc=class{constructor(t,e,n){this.root=Nn("div","coach hidden",t);let i=Nn("div","coach-head",this.root);Nn("span","coach-name",i,"COACH ADA"),this.dots=Nn("span","coach-dots",i);for(let o=0;o<e;o++)Nn("i","",this.dots);this.starsEl=Nn("span","coach-stars",i,"\u2605 0"),this.sayEl=Nn("div","coach-say",this.root),this.hintEl=Nn("div","coach-hint",this.root);let r=Nn("div","coach-foot",this.root);this.bar=Nn("div","coach-bar",r),this.barFill=Nn("i","",this.bar),this.skip=Nn("button","coach-skip",r,"Skip tutorial"),this.skip.addEventListener("click",o=>{o.preventDefault(),n()}),this.skip.addEventListener("pointerdown",o=>o.stopPropagation()),this.arrow=Nn("div","tut-arrow hidden",t),this.last={}}pointAt(t){let e=t&&(Math.abs(t.x)>.92||Math.abs(t.y)>.92);if(this.arrow.classList.toggle("hidden",!e),!e)return;let n=Math.atan2(t.y,t.x),i=.8,r=Math.min(i/Math.max(Math.abs(Math.cos(n)),.001),i/Math.max(Math.abs(Math.sin(n)),.001));this.arrow.style.left=`${(Math.cos(n)*r*.5+.5)*100}%`,this.arrow.style.top=`${(-Math.sin(n)*r*.5+.5)*100}%`,this.arrow.style.setProperty("--rot",`${-n}rad`)}show(t){this.root.classList.toggle("hidden",!t)}dispose(){this.root.remove(),this.arrow.remove()}update(t){let e=this.last;t.say!==e.say&&(this.sayEl.textContent=t.say,this.sayEl.classList.remove("pop"),this.sayEl.offsetWidth,this.sayEl.classList.add("pop")),t.hint!==e.hint&&(this.hintEl.textContent=t.hint||"",this.hintEl.classList.toggle("empty",!t.hint)),(t.index!==e.index||t.doneCount!==e.doneCount)&&[...this.dots.children].forEach((n,i)=>{n.className=i<t.doneCount?"done":i===t.index?"now":""}),t.stars!==e.stars&&(this.starsEl.textContent=`\u2605 ${t.stars}`),t.keyboard!==e.keyboard&&(this.skip.textContent=t.keyboard?"Skip tutorial (Esc)":"Skip tutorial"),this.barFill.style.width=`${Math.round(Math.max(0,Math.min(1,t.frac))*100)}%`,this.last={...t}}};var Vt=s=>String(s).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Ls=s=>(Math.round(s*10)/10).toFixed(1),Tc=class{constructor(t){this.app=t,this.root=document.createElement("div"),this.root.className="screens",t.uiRoot.appendChild(this.root),this.current=null,this.stack=[]}show(t,e={},n="screen center dim"){return this.root.innerHTML=`<div class="${n}">${t}</div>`,this.root.querySelectorAll("[data-act]").forEach(i=>{let r=e[i.dataset.act];r&&i.addEventListener("click",o=>{o.preventDefault(),this.app.audio.play("ui",{gain:.4}),r(i,o)})}),this.root.firstChild}clear(){this.root.innerHTML="",this.current=null}back(){if(!(this.current==="menu"||this.app.session)){if(this.current==="hubSub"){this.hub();return}this.mainMenu()}}toast(t,e=!1,n=3200){let i=document.createElement("div");i.className="toast"+(e?" bad":""),i.textContent=t,this.app.uiRoot.appendChild(i),setTimeout(()=>i.remove(),n)}saveCareer(){let t=this.app.store.save();return t.ok||this.toast(`Could not save your career: ${t.error} Your progress is kept only until you close the page.`,!0,6e3),t.ok}mainMenu(){this.current="menu";let t=this.app;t.hud.show(!1);let e=t.store.career,n=e?`<button class="btn big primary" data-act="cont">Continue Career<small>${Vt(e.player.name)} \xB7 ${Vt(ee(e.clubId).name)} \xB7 Season ${e.seasonNo}</small></button>`:"";this.show(`
      <div class="menu-head"><div class="title">First<br>Touch</div>
      <div class="subtitle">A first-person football career. You are one player on the pitch.</div></div>
      <div class="menu-buttons">
      ${n}
      <button class="btn big ${e?"":"primary"}" data-act="new">New Career<small>Create a footballer and start at a community club</small></button>
      <button class="btn big" data-act="quick">Quick Match<small>Any two clubs, no effect on your career</small></button>
      <button class="btn big" data-act="train">Training<small>Passing, finishing and dribbling drills, free practice</small></button>
      <button class="btn big" data-act="style">Visual Style<small>Classic ink or Neobrutalist</small></button>
      <button class="btn big" data-act="settings">Settings</button>
      <button class="btn big" data-act="help">How to Play / Credits</button>
      </div>
    `,{cont:()=>this.hub(),new:()=>e?this.confirm("Start a new career? Your existing career will be overwritten.",()=>this.newCareer(),()=>this.mainMenu()):this.newCareer(),quick:()=>this.quickMatch(),train:()=>this.training(),style:()=>this.styleMenu(),settings:()=>this.settings(),help:()=>this.howTo()},"screen menu"),t.store.notice&&(this.toast(t.store.notice.text,t.store.notice.bad,7e3),t.store.notice=null)}confirm(t,e,n){this.show(`<div class="panel" style="max-width:520px"><h2>Are you sure?</h2><p>${Vt(t)}</p><div class="row"><button class="btn danger" data-act="yes">Yes, overwrite</button><button class="btn" data-act="no">Cancel</button></div></div>`,{yes:e,no:n})}newCareer(){this.current="new";let t=Ps(),e=go.map(o=>`<button class="btn ${o.id==="ST"?"on":""}" data-pos="${o.id}">${o.name}</button>`).join(""),n=rs(1).map((o,a)=>`<button class="btn ${a===0?"on":""}" data-club="${o.id}">${os(o,22)} ${Vt(o.name)}</button>`).join(""),i={ST:"Starts high up the pitch. Judged on goals, shots on target and movement. Training favours finishing.",W:"Starts wide. Judged on goals, assists and chances created. Training favours pace and dribbling.",AM:"Plays behind the striker. Judged on chance creation, assists and goals. Training favours passing.",CM:"The link of the team. Judged on passing accuracy, ball winning and chances created.",DEF:"Protects the goal. Judged on tackles, interceptions, clean sheets and distribution."},r=this.show(`
      <div class="panel" style="width:min(820px,94vw)">
        <h2>Create your footballer</h2>
        <div class="grid2">
          <label class="f">Name<input id="nc-name" maxlength="22" value="${Vt(t.name)}"></label>
          <label class="f">Shirt number<input id="nc-num" type="number" min="1" max="99" value="9"></label>
          <label class="f">Nationality<select id="nc-nat">${tm.map(o=>`<option>${o}</option>`).join("")}</select></label>
          <label class="f">Dominant foot<select id="nc-foot"><option value="R">Right</option><option value="L">Left</option></select></label>
        </div>
        <h3>Appearance</h3>
        <div class="row">
          <label class="f">Skin<input id="nc-skin" type="color" value="#e0b48c"></label>
          <label class="f">Hair<input id="nc-hair" type="color" value="#3b2a1e"></label>
          <label class="f">Boots<input id="nc-boots" type="color" value="#111111"></label>
        </div>
        <h3>Preferred position</h3>
        <div class="seg" id="nc-pos">${e}</div>
        <p class="muted small" id="nc-posdesc">${i.ST}</p>
        <h3>Starting club</h3>
        <div class="seg" id="nc-club">${n}</div>
        <p class="muted small">You start at a community club with a guaranteed place in the team. Goalkeepers are AI-controlled.</p>
        <div class="row" style="margin-top:14px"><button class="btn primary big" data-act="go">Sign your first contract</button><button class="btn" data-act="back">Back</button></div>
      </div>`,{back:()=>this.mainMenu(),go:()=>{let o=r.querySelector("#nc-name").value.trim()||"A. Newcomer",a=Math.max(1,Math.min(99,parseInt(r.querySelector("#nc-num").value,10)||9)),l=r.querySelector("#nc-pos .on").dataset.pos,c=r.querySelector("#nc-club .on").dataset.club,h=cm({name:o,number:a,nationality:r.querySelector("#nc-nat").value,foot:r.querySelector("#nc-foot").value,role:l,clubId:c,look:{skin:r.querySelector("#nc-skin").value,hair:r.querySelector("#nc-hair").value,boots:r.querySelector("#nc-boots").value}});this.app.store.career=h,this.saveCareer(),this.hub()}});r.querySelectorAll("#nc-pos .btn").forEach(o=>o.addEventListener("click",()=>{r.querySelectorAll("#nc-pos .btn").forEach(l=>l.classList.remove("on")),o.classList.add("on"),r.querySelector("#nc-posdesc").textContent=i[o.dataset.pos];let a={ST:9,W:11,AM:10,CM:8,DEF:4};r.querySelector("#nc-num").value=a[o.dataset.pos]})),r.querySelectorAll("#nc-club .btn").forEach(o=>o.addEventListener("click",()=>{r.querySelectorAll("#nc-club .btn").forEach(a=>a.classList.remove("on")),o.classList.add("on")}))}hub(){this.current="hub";let e=this.app.store.career;if(!e){this.mainMenu();return}let n=ee(e.clubId),i=e.season,r=e.player,o=Du(e),a="";if(e.window)a='<div class="next-fixture">Transfer window open</div><p class="muted">Review the offers before continuing.</p>';else if(o){let y=ee(o.home),v=ee(o.away),b=o.final?"Continental Stadium (neutral)":`${Vt(y.ground)} \xB7 ${zn(y.tier).venue==="community"?"Community Ground":zn(y.tier).label+" stadium"}`;a=`<div class="muted small">${o.final?Vt(o.name):`${Vt(i.league)} \xB7 Round ${o.round} of 6`}</div>
        <div class="next-fixture">${os(y,36)} ${Vt(y.name)} <span class="muted">v</span> ${Vt(v.name)} ${os(v,36)}</div>
        <div class="muted small">${b}</div>
        <div class="row" style="margin-top:12px"><button class="btn huge primary" data-act="play">Play Match</button></div>`}else if(gm(e)){let y=i.final&&i.final.played?`<p>${i.final.won?"\u{1F3C6} <b>Continental Cup winners!</b>":`Continental Cup Final: lost ${i.final.score?i.final.score.join("-"):""}.`}</p>`:"";a=`<div class="next-fixture">Season ${e.seasonNo} complete</div>
        <p>${Vt(n.name)} finished <b>${bc(i.placement)}</b> in the ${Vt(i.league)}.${i.placement===1?" \u{1F3C6} <b>Champions!</b>":""}</p>${y}
        <button class="btn huge primary" data-act="season">Start Season ${e.seasonNo+1}</button>`}let l=Nu(i).map((y,v)=>`<tr class="${y.id===e.clubId?"me":""}"><td>${v+1}</td><td>${os(ee(y.id),18)} ${Vt(ee(y.id).name)}</td><td class="n">${y.p}</td><td class="n">${y.w}</td><td class="n">${y.d}</td><td class="n">${y.l}</td><td class="n">${y.gf-y.ga}</td><td class="n"><b>${y.pts}</b></td></tr>`).join(""),c=i.fixtures.filter(y=>y.score&&(y.home===e.clubId||y.away===e.clubId)).map(y=>`<div>R${y.round}: ${Vt(ee(y.home).short)} ${y.score[0]}-${y.score[1]} ${Vt(ee(y.away).short)}</div>`).join(""),h=Iu.map(y=>`<div class="attr"><span>${im[y]}</span><div class="bar"><i style="width:${r.attrs[y]}%"></i></div><b>${r.attrs[y]}</b><button class="btn" data-act="up" data-k="${y}" ${r.points>0&&r.attrs[y]<99?"":"disabled"} title="+${Uu(r.attrs[y])}">+</button></div>`).join(""),d=e.form.slice(-5).map(y=>`<span class="${y>=7?"hi":y<6?"lo":""}">${Ls(y)}</span>`).join("")||'<span class="muted small">no matches yet</span>',u=e.totals,f=e.seasons.find(y=>y.season===e.seasonNo&&y.clubId===e.clubId)||{apps:0,goals:0,assists:0,ratingSum:0},g=Ou(e).map(y=>`<div style="margin:8px 0"><div class="row">${os(y.club,20)} <b>${Vt(y.club.name)}</b><span class="spacer"></span><span class="small">${Math.round(y.score*100)}%</span></div><div class="bar ${y.qualifies?"good":""}"><i style="width:${Math.round(y.score*100)}%"></i></div><div class="small muted">${Vt(y.text)}</div></div>`).join("")||'<p class="muted">You are at the top level. Keep performing to win the league and the Continental Cup.</p>',x="";e.window&&(x=`<h3>${e.window.type==="end"?"Season-end":"Mid-season"} transfer window</h3>`+(e.window.offers.length?e.window.offers.map((y,v)=>{let b=ee(y.clubId);return`<div class="offer"><div class="row">${os(b,30)}<div><b>${Vt(b.name)}</b> <span class="pill">Tier ${y.tier}</span><div class="small">${Vt(y.role)} \xB7 ${y.wage.toLocaleString()} cr/week \xB7 ${y.years} season${y.years>1?"s":""}</div></div></div>
          <div class="small" style="margin-top:6px"><b>Expectations:</b> ${Vt(y.expectations)}</div>
          <div class="small"><b>Why:</b> ${y.reasons.map(Vt).join("; ")}</div>
          <div class="row" style="margin-top:8px"><button class="btn primary" data-act="accept" data-i="${v}">${y.kind==="renewal"?"Sign renewal":"Accept transfer"}</button></div></div>`}).join(""):'<p class="muted">No clubs made an offer this window. Build your form and reputation.</p>')+`<button class="btn" data-act="decline">${e.window.offers.length?`Stay at ${Vt(n.name)}`:"Continue"}</button>`);let p=e.seasons.map(y=>`<tr><td>S${y.season}</td><td>${Vt(ee(y.clubId).short)}</td><td class="n">${y.apps}</td><td class="n">${y.goals}</td><td class="n">${y.assists}</td><td class="n">${y.apps?Ls(y.ratingSum/y.apps):"-"}</td><td class="n">${y.passAtt?Math.round(y.passCmp/y.passAtt*100)+"%":"-"}</td><td class="n">${y.tackles}</td><td class="n">${y.placement?bc(y.placement):"-"}</td></tr>`).join(""),m=[...e.timeline].reverse().map(y=>`<div><span class="muted small">S${y.season}${y.round?" R"+Math.min(6,y.round):""}</span> ${Vt(y.text)}</div>`).join(""),M=e.trophies.map(y=>`<span class="pill">\u{1F3C6} ${Vt(y.name)} S${y.season}</span>`).join(" ")||'<span class="muted small">none yet</span>';this.show(`
      <div class="hub-head">${os(n,64)}<div><h1>${Vt(n.name)}</h1><div class="muted">${Vt(i.league)} \xB7 Season ${e.seasonNo} \xB7 ${Vt(r.name)} #${r.number} \xB7 ${as(r.role)} \xB7 ${Vt(r.nationality)}</div></div>
        <span class="spacer"></span>
        <div class="col" style="text-align:right"><div><b>Level ${r.level}</b> \xB7 XP ${r.xp}/100 \xB7 Reputation ${Math.round(r.reputation)}</div><div class="small muted">Contract: ${e.contract.wage.toLocaleString()} cr/week \xB7 ${e.contract.years} season(s) left \xB7 ${Vt(e.contract.role)}</div></div>
        <button class="btn" data-act="menu">Main Menu</button></div>
      <div class="hub-grid">
        <div class="col">
          <div class="panel">${a}${o&&!e.window?`<div class="row" style="margin-top:10px"><button class="btn" data-act="train">Training ${e.trainingAvailable?"(XP available)":"(no XP until next match)"}</button></div>`:""}</div>
          <div class="panel"><h3>${Vt(i.league)}</h3><table class="t"><tr><th>#</th><th>Club</th><th class="n">P</th><th class="n">W</th><th class="n">D</th><th class="n">L</th><th class="n">GD</th><th class="n">Pts</th></tr>${l}</table><div class="small muted" style="margin-top:6px">${c}</div></div>
        </div>
        <div class="col">
          <div class="panel"><h3>Attributes</h3>${h}<div class="small muted">Upgrade points: <b>${r.points}</b>. Earn XP by playing (and a little from training).</div></div>
          <div class="panel"><h3>Recent form</h3><div class="form-dots">${d}</div>
            <h3>This season</h3><div class="small">${f.apps} apps \xB7 ${f.goals} goals \xB7 ${f.assists} assists \xB7 avg ${f.apps?Ls(f.ratingSum/f.apps):"-"}</div>
            <h3>Career</h3><div class="small">${u.apps} apps \xB7 ${u.goals} goals \xB7 ${u.assists} assists \xB7 avg rating ${u.apps?Ls(ym(u)):"-"} \xB7 pass accuracy ${u.passAtt?Math.round(u.passCmp/u.passAtt*100)+"%":"-"} \xB7 ${u.tackles} tackles \xB7 earnings ${e.earnings.toLocaleString()} cr</div>
            <div style="margin-top:6px">${M}</div></div>
        </div>
        <div class="col">
          ${x?`<div class="panel">${x}</div>`:""}
          <div class="panel"><h3>Club interest</h3>${g}<div class="small muted">Offers only arrive at transfer windows (after fixture 3 and at season end). Training does not count.</div></div>
          <div class="panel"><h3>Career history</h3><table class="t"><tr><th>S</th><th>Club</th><th class="n">Apps</th><th class="n">G</th><th class="n">A</th><th class="n">Avg</th><th class="n">Pass</th><th class="n">Tkl</th><th class="n">Pos</th></tr>${p}</table>
            <h3>Timeline</h3><div class="timeline">${m}</div></div>
        </div>
      </div>`,{menu:()=>this.mainMenu(),play:()=>this.app.playCareerMatch(),train:()=>this.training(!0),season:()=>{xm(e),this.saveCareer(),this.hub()},up:y=>{dm(e,y.dataset.k)&&(this.saveCareer(),this.hub())},accept:y=>{pm(e,+y.dataset.i),this.saveCareer(),this.hub()},decline:()=>{mm(e),this.saveCareer(),this.hub()}},"screen hub")}report(t,e={}){let n=this.app;n.input.active=!1,n.input.exitLock(),n.hud.show(!1),this.current="report";let i=t.match,r=i.human,o=i.stats.report(r),a=o.stats,l=null;if(e.career&&!t.committed){t.committed=!0;let x=n.store.career;l=um(x,e.matchId,e.fx,{score:o.score,rating:o.rating,minutes:o.minutes,stats:a,motm:o.motm&&o.motm.isHuman}),t.summary=l,this.saveCareer()}else e.career&&(l=t.summary);let c=o.breakdown,h=[...c.pos.slice(0,3).map(x=>`<div class="plus">+${x.v.toFixed(2)} ${Vt(x.label)}</div>`),...c.neg.slice(0,3).map(x=>`<div class="minus">${x.v.toFixed(2)} ${Vt(x.label)}</div>`)].join("")||'<div class="muted">A quiet game.</div>',d=o.goals.map(x=>`<div class="small">${x.clock} ${Vt(i.teams[x.team].short)} - ${x.ownGoal?`own goal (${Vt(x.ownGoalBy||"")})`:Vt(x.scorer||"?")}${x.assist?` (assist ${Vt(x.assist)})`:""}</div>`).join(""),u=(x,p)=>`<div class="stat"><b>${x}</b><span>${p}</span></div>`,f=(()=>{let x=o.score[r.team],p=o.score[1-r.team];return x>p?"Win":x<p?"Defeat":"Draw"})(),g=l&&!l.duplicate?`<div class="small">+${l.xp} XP${l.levelUps?` \xB7 <b>${l.levelUps} upgrade point${l.levelUps>1?"s":""} earned</b>`:""} \xB7 reputation ${l.rep>=0?"+":""}${l.rep.toFixed(1)}</div>`:e.quick?'<div class="small muted">Quick match: no effect on your career.</div>':"";this.show(`
      <div class="panel report">
        <div class="row"><h2>${e.title||"Match Report"}</h2><span class="spacer"></span><span class="pill">${f}</span></div>
        <div class="big-score">${Vt(i.teams[0].name)} ${o.score[0]} - ${o.score[1]} ${Vt(i.teams[1].name)}</div>
        ${d}
        <div class="row" style="margin:12px 0;gap:24px">
          <div><div class="small">MATCH RATING</div><div class="rating-big">${Ls(o.rating)}</div></div>
          <div class="why small"><b>Biggest rating changes</b>${h}</div>
          <span class="spacer"></span>
          <div class="small">Minutes played: <b>${o.minutes}</b><br>Possession ${o.possession[0]}% - ${o.possession[1]}%<br>Shots ${o.teamShots[0]} (${o.teamShotsOn[0]}) - ${o.teamShots[1]} (${o.teamShotsOn[1]})<br>Player of the match: <b>${o.motm?Vt(o.motm.name)+" "+Ls(o.motm.rating):"-"}</b></div>
        </div>
        <div class="statgrid">
          ${u(a.goals,"Goals")}${u(a.assists,"Assists")}${u(`${a.passCmp}/${a.passAtt}`,"Passes completed")}${u(a.passAtt?a.passAcc+"%":"-","Pass accuracy")}
          ${u(a.shots,"Shots")}${u(a.shotsOn,"On target")}${u(a.tacklesWon,"Tackles won")}${u(a.interceptions,"Interceptions")}
          ${u(a.possLost,"Possession lost")}${u(a.fouls,"Fouls")}${u(a.keyPasses,"Chances created")}${u(a.touches,"Touches")}
        </div>
        ${g}
        <div class="row" style="margin-top:14px"><button class="btn primary big" data-act="cont">${e.career?"Continue to Career Hub":"Continue"}</button>${e.quick?'<button class="btn" data-act="again">Play again</button>':""}</div>
      </div>`,{cont:()=>{n.endSession(),e.career?this.hub():e.quick?this.quickMatch():this.mainMenu()},again:()=>{n.endSession(),n.startQuickMatch(this.lastQuick||{})}})}quickMatch(){this.current="quick";let t=this.app,e=this.lastQuick||{home:"millbrook",away:"ashford",side:0,role:t.store.career?t.store.career.player.role:"ST",len:t.settings.matchLength},n=r=>Cu.map(o=>`<optgroup label="Tier ${o.tier} \xB7 ${o.league}">${rs(o.tier).map(a=>`<option value="${a.id}" ${a.id===r?"selected":""}>${Vt(a.name)}</option>`).join("")}</optgroup>`).join(""),i=this.show(`
      <div class="panel" style="width:min(640px,94vw)">
        <h2>Quick Match</h2>
        <div class="grid2">
          <label class="f">Home club<select id="q-home">${n(e.home)}</select></label>
          <label class="f">Away club<select id="q-away">${n(e.away)}</select></label>
          <label class="f">You play for<select id="q-side"><option value="0" ${e.side===0?"selected":""}>Home</option><option value="1" ${e.side===1?"selected":""}>Away</option></select></label>
          <label class="f">Position<select id="q-role">${go.map(r=>`<option value="${r.id}" ${r.id===e.role?"selected":""}>${r.name}</option>`).join("")}</select></label>
          <label class="f">Match length<select id="q-len"><option value="short">2 min halves</option><option value="normal">3 min halves</option><option value="long">5 min halves</option></select></label>
        </div>
        <p class="small muted">Uses ${t.store.career?"your career player":"a default player"} and the home club's stadium. Quick matches never change career progress.</p>
        <div class="row"><button class="btn primary big" data-act="go">Kick Off</button><button class="btn" data-act="back">Back</button></div>
      </div>`,{back:()=>this.mainMenu(),go:()=>{let r={home:i.querySelector("#q-home").value,away:i.querySelector("#q-away").value,side:+i.querySelector("#q-side").value,role:i.querySelector("#q-role").value,len:i.querySelector("#q-len").value};if(r.home===r.away){this.toast("Pick two different clubs.",!0);return}this.lastQuick={...r,halfLength:Il[r.len]},t.startQuickMatch(this.lastQuick)}});i.querySelector("#q-len").value=e.len||"normal"}training(t=!1){this.current=t?"hubSub":"training";let e=this.app.store.career,n=e?e.trainingAvailable?"Your next completed drill earns development XP (once between matches).":"You have already trained since your last match: drills give no XP until you play again.":"Without a career, drills are just for practice.",i=Object.entries(Ro).map(([o,a])=>`<div class="panel"><h3>${Vt(a.name)}</h3><p class="small">${Vt(a.desc)}</p><div class="small muted">${a.time?`${a.time} seconds`:"Untimed"}</div><button class="btn primary" data-act="go" data-k="${o}" style="margin-top:8px">Start</button></div>`).join("");this.show(`<div class="panel" style="width:min(1000px,96vw)"><h2>Training Ground</h2><p class="small">${n} Training never counts towards club interest.</p><div class="grid2"><div class="panel"><h3>Tutorial with Coach Ada</h3><p class="small">The basics in under two minutes: look, move, dribble, pass, shoot and tackle. Earn a star for each quick drill.</p><div class="small muted">About 2 minutes \xB7 no XP</div><button class="btn primary" data-act="tut" style="margin-top:8px">Start</button></div>${i}</div><div class="row" style="margin-top:12px"><button class="btn" data-act="back">Back</button></div></div>`,{tut:()=>this.startTutorial(),go:o=>this.startDrill(o.dataset.k,t),back:()=>t?this.hub():this.mainMenu()})}startDrill(t,e=!1){let n=this.app,i=n.store.career,r={...i?i.player:Ps()},o=new Mc(t,r),a=i?ee(i.clubId):Sn[0],l=yr(a,Sn.find(u=>u.id!==a.id&&u.tier===a.tier)||Sn[1]),c=n.startSession({mode:"drill",venue:"training",venueOpts:{homeName:"Training"},colours:{kits:l,human:r.look},match:o.matchConfig(),noStart:!0,clockText:()=>o.clockText(),onStep:()=>o.step(),onEnd:()=>this.drillResult(o,e)});o.setup(c.match,n.view),c.drill=o,c.cam.yaw=c.human.yaw;let h=c.dispose.bind(c);c.dispose=()=>{o.dispose(),h()};let d=()=>{if(n.session===c){for(;o.events.length;){let u=o.events.shift();n.hud.notify(u.text,u.kind)}requestAnimationFrame(d)}};d(),c.match.events.on("drillGoal",u=>{n.view.celebrate(u.pos.x,u.pos.z,0,.5),n.audio.play("net"),n.audio.play("cheer",{gain:.3})}),n.hud.showBanner(Ro[t].name,Ro[t].desc,3500)}startTutorial(t={}){let e=this.app,n=e.store.career,i={...n?n.player:Ps()},r=new Sc(i),o=n?ee(n.clubId):Sn[0],a=yr(o,Sn.find(f=>f.id!==o.id&&f.tier===o.tier)||Sn[1]);this.tutorialFirst=!!t.first;let l=e.startSession({mode:"tutorial",venue:"training",venueOpts:{homeName:"Training"},colours:{kits:a,human:i.look},match:r.matchConfig(),noStart:!0,clockText:()=>"",onStep:()=>r.step(),onEnd:()=>this.tutorialResult(r)});r.setup(l.match,e.view),l.tutorial=r,l.cam.yaw=l.human.yaw,e.hud.root.classList.add("tut");let c=new wc(e.uiRoot,Co.length,()=>this.skipTutorial()),h=l.dispose.bind(l);l.dispose=()=>{r.dispose(),c.dispose(),e.hud.root.classList.remove("tut"),h()};let d=new L,u=()=>{if(e.session!==l)return;for(;r.events.length;)this.tutorialFx(r.events.shift(),l);let f=r.current,g=e.input.touchMode,x=f&&r.waitUntil==null&&r.endAt==null;c.show(!e.paused&&!l.ended);let p=!e.paused&&!l.ended?r.objective(d):null;c.pointAt(p?e.view.projectToScreen(p,p):null),c.update({index:r.idx,doneCount:r.results.length,say:r.say,stars:r.stars,keyboard:!g,hint:x?f.hint[g?1:0]:"",frac:x?1-r.stepT/f.cap:0}),requestAnimationFrame(u)};return u(),l}tutorialFx(t,e){let n=this.app,i=n.view,r=e.human;switch(t.type){case"note":n.hud.notify(t.text,t.kind);break;case"step":n.audio.play("ui",{gain:.35});break;case"star":i.celebrate(t.x,t.z,0,.45);break;case"done":t.ok&&(i.celebrate(t.x,t.z,0,t.big?1.2:.3),n.audio.play(t.star?"ack":"ui",{gain:.55}));break;case"goal":n.audio.play("net"),n.audio.play("cheer",{gain:.55}),n.hud.showBanner("GOAL!","Sleepy Sam never saw it coming",1400,"mine");break;case"fade":n.hud.flashFade();break;case"finale":n.audio.play("whistle",{gain:.5}),n.audio.play("cheer",{gain:.35}),i.celebrate(r.pos.x+Math.sin(r.yaw)*4,r.pos.z+Math.cos(r.yaw)*4,0,1.2);break}}skipTutorial(){Bu("skipped");let t=this.app;t.session&&t.endSession(),this.mainMenu(),this.toast("Tutorial skipped. You can replay it any time from Training.")}tutorialResult(t){let e=this.app;e.input.active=!1,e.input.exitLock(),Bu("done");let n=t.result(),i="\u2605".repeat(n.stars)+"\u2606".repeat(n.total-n.stars),r=`${Math.floor(n.time/60)}:${String(Math.floor(n.time%60)).padStart(2,"0")}`,o=e.store.career,a={Superstar:"Nine out of nine. Are you sure you haven't done this before?","Starting XI":"Starting XI material. The scouts will be watching.","Squad player":"Solid work. A few matches and you'll fly.","Future legend":"Every legend starts somewhere. Yours starts now."};this.current="tutorialResult",this.show(`<div class="panel tut-card" style="text-align:center;max-width:540px">
      <div class="tut-badge">${n.timeUp?"TIME'S UP":"WARM-UP COMPLETE"}</div>
      <div class="tut-stars" aria-label="${n.stars} of ${n.total} stars">${i}</div>
      <h2>${Vt(n.rank)}</h2>
      <p>${n.stars} of ${n.total} stars \xB7 ${r}</p>
      <p class="small">Coach Ada: "${Vt(a[n.rank])}"</p>
      <div class="row" style="justify-content:center;margin-top:10px">
        <button class="btn primary big" data-act="career">${o?"Continue your career":"Start your career"}</button>
        <button class="btn" data-act="menu">Main menu</button>
      </div></div>`,{career:()=>{e.endSession(),o?this.hub():this.newCareer()},menu:()=>{e.endSession(),this.mainMenu()}})}drillResult(t,e){let n=this.app;n.input.active=!1,n.input.exitLock();let i=t.result(),r=n.store.career,o="";if(t.kind==="practice")o='<p class="muted">Free practice gives no XP.</p>';else if(r&&r.trainingAvailable){let a=ku(r,i.xp);r.trainingAvailable=!1,this.saveCareer(),o=`<p><b>+${i.xp} XP</b>${a?` \xB7 ${a} upgrade point${a>1?"s":""} earned`:""}</p>`}else r&&(o='<p class="muted">No XP: you have already trained since your last match.</p>');this.show(`<div class="panel" style="max-width:520px"><h2>${Vt(t.def.name)}</h2><p style="font-size:20px"><b>${Vt(i.text)}</b></p>${o}
      <div class="row"><button class="btn primary" data-act="again">Try again</button><button class="btn" data-act="back">Back to Training</button></div></div>`,{again:()=>{n.endSession(),this.startDrill(t.kind,e)},back:()=>{n.endSession(),this.training(e)}})}styleMenu(t=!1){this.current=t?"pauseSub":"style";let e=this.app,n={};try{let r=e.session?null:{pos:[-14,8,27],look:[6,.8,-2]};for(let o of["classic","neo"])n[o]=e.view.renderPreview(o,480,270,r)}catch{n={}}let i=(r,o,a)=>`<div class="preview ${e.style===r?"on":""}" data-act="pick" data-s="${r}">${n[r]?`<img src="${n[r]}" alt="${o}">`:""}<h3>${o}</h3><div class="small">${a}</div></div>`;this.show(`<div class="panel" style="width:min(820px,96vw)"><h2>Visual Style</h2><p class="small muted">Previews are rendered live from the game. Switching is instant and never interrupts play.</p>
      <div class="previews">${i("classic","Classic","Pale unlit surfaces, thin black ink edges, restrained kits, paper interface.")}${i("neo","Neobrutalist","Saturated colours, 3 px outlines, toon shading with hard sun shadows, bold interface.")}</div>
      <div class="row" style="margin-top:14px"><button class="btn" data-act="back">Back</button></div></div>`,{pick:r=>{e.setStyle(r.dataset.s),this.styleMenu(t)},back:()=>t?this.pauseMenu():this.mainMenu()})}settings(t=!1){this.current=t?"pauseSub":"settings";let e=this.app,n=e.settings,i=(a,l)=>`<div class="seg" data-key="${a}">${l.map(([c,h])=>`<button class="btn ${String(n[a])===String(c)?"on":""}" data-v="${c}">${h}</button>`).join("")}</div>`,r=this.show(`<div class="panel" style="width:min(640px,96vw)"><h2>Settings</h2>
      <div class="grid2">
        <label class="f">Look sensitivity <span id="v-sens">${n.sensitivity.toFixed(2)}</span><input type="range" min="0.2" max="3" step="0.05" id="s-sens" value="${n.sensitivity}"></label>
        <label class="f">Field of view <span id="v-fov">${wm(n.fov)}</span><input type="range" min="${60}" max="${200}" step="1" id="s-fov" value="${n.fov}"></label>
        <label class="f">Master volume<input type="range" min="0" max="1" step="0.05" id="s-master" value="${n.master}"></label>
        <label class="f">Effects volume<input type="range" min="0" max="1" step="0.05" id="s-sfx" value="${n.sfx}"></label>
        <label class="f">Crowd volume<input type="range" min="0" max="1" step="0.05" id="s-crowd" value="${n.crowd}"></label>
      </div>
      <h3>Controls</h3>${i("invertY",[[!1,"Normal Y"],[!0,"Invert Y"]])}
      <div style="height:6px"></div>${i("touch",[["auto","Touch controls: auto"],["on","Touch controls on"],["off","Touch controls off"]])}
      <h3>Difficulty</h3>${i("difficulty",Object.entries(yc).map(([a,l])=>[a,l.label]))}
      <div class="small muted">Assisted (default): the ball sticks to your feet, passes find teammates and are chipped over blocked lanes, and opponents are slower and make more mistakes. Expert keeps only light assistance.</div>
      <h3>Camera</h3>${i("bob",[[!0,"View bob on"],[!1,"View bob off"]])} <div style="height:6px"></div>${i("shake",[[!0,"Camera shake on"],[!1,"Camera shake off"]])}
      <h3>Quality</h3>${i("quality",[["low","Low"],["medium","Medium"],["high","High"]])}
      <h3>Match length</h3>${i("matchLength",[["short","2 min halves"],["normal","3 min halves"],["long","5 min halves"]])}
      <div class="row" style="margin-top:14px"><button class="btn primary" data-act="back">Done</button></div></div>`,{back:()=>{e.applySettings(),t?this.pauseMenu():this.mainMenu()}}),o=(a,l,c)=>r.querySelector(a).addEventListener("input",h=>{n[l]=parseFloat(h.target.value),c&&(r.querySelector(c).textContent=l==="fov"?wm(n[l]):n[l].toFixed(2)),e.applySettings()});o("#s-sens","sensitivity","#v-sens"),o("#s-fov","fov","#v-fov"),o("#s-master","master"),o("#s-sfx","sfx"),o("#s-crowd","crowd"),r.querySelectorAll(".seg").forEach(a=>a.querySelectorAll(".btn").forEach(l=>l.addEventListener("click",()=>{let c=a.dataset.key,h=l.dataset.v;h==="true"?h=!0:h==="false"&&(h=!1),n[c]=h,a.querySelectorAll(".btn").forEach(d=>d.classList.remove("on")),l.classList.add("on"),e.applySettings(),c==="difficulty"&&e.session&&this.toast("Difficulty applies from the next match.")})))}howTo(t=!1){this.current=t?"pauseSub":"help";let e=_u.map(([a,l])=>`<tr><td><b>${a}</b></td><td>${l}</td></tr>`).join(""),n=bu.map(([a,l])=>`<tr><td><b>${a}</b></td><td>${l}</td></tr>`).join(""),i=this.app.input.touchMode,r=`<h3>Keyboard and mouse</h3><table class="t">${e}</table>`,o=`<h3>Touch screen</h3><table class="t">${n}</table>`;this.show(`<div class="panel" style="width:min(860px,96vw)"><h2>How to Play</h2>
      ${i?o+r:r+o}
      <h3>Playing</h3>
      <p class="small">You control one footballer and see the match through their eyes. Your teammates and opponents are AI. Receive the ball with a soft first touch by simply letting it reach your feet (move to push the touch into space). Press pass just before the ball arrives for a first-time pass; hold shoot while the ball arrives for a first-time finish. The ring shows who your pass will go to - look towards a teammate to choose them. While you have the ball the screen edge glows green; your close control keeps it at your feet, so opponents have to tackle you for it. Press E near a dribbler to lunge in with a tackle. Press Space without the ball to call for it: a teammate acknowledges and passes when you are open. Settings has the difficulty (how much help you get and how sharp the opponents are) and a field of view from 60 to 200 degrees.</p>
      <h3>Rules</h3>
      <p class="small">7-a-side on a 64 x 42 m pitch with 5 x 2 m goals. Two halves (3 minutes each by default; the clock is shown as a 90-minute match and stops during stoppages). Kick-offs, throw-ins, corners, goal kicks, free kicks and penalties are used. <b>There is no offside</b> in this small-sided format. Keepers may handle anywhere in their own area (no back-pass rule). A goal counts only when the whole ball crosses the line between the posts and under the bar.</p>
      <h3>Career</h3>
      <p class="small">Start at a community club. Each season has 6 league fixtures. Matches give development XP (100 XP = 1 upgrade point); drills give a little XP once between matches. Club interest comes from your last 5 ratings, your reputation, contributions in your position and appearances - never from training or time passing. Offers arrive at transfer windows after fixture 3 and at season end, normally from one tier higher.</p>
      <h3>Credits</h3>
      <p class="small">First Touch - design, code, geometry and synthesised audio made for this game. Rendering with three.js (MIT licence, vendored). All clubs, players and competitions are fictional.</p>
      <div class="row"><button class="btn primary" data-act="back">Back</button></div></div>`,{back:()=>t?this.pauseMenu():this.mainMenu()})}pauseMenu(){this.current="pause";let t=this.app,e=t.session,n=e?e.cfg.mode:null,i=n==="career"?"Exit to Career Hub":n==="drill"?"Exit to Training":n==="tutorial"?"Skip tutorial":"Exit to Main Menu";this.show(`<div class="panel" style="width:min(420px,92vw)"><h2>Paused</h2>
      <div class="col">
        <button class="btn primary big" data-act="resume">Resume</button>
        <button class="btn" data-act="controls">Controls</button>
        <button class="btn" data-act="settings">Settings</button>
        <button class="btn" data-act="style">Visual Style</button>
        ${e&&n!=="drill"&&n!=="tutorial"?'<button class="btn" data-act="stats">Match Statistics</button>':""}
        <button class="btn danger" data-act="exit">${i}</button>
      </div>
      ${e&&e.cfg.mode==="career"?'<p class="small muted">Leaving now abandons the match: it will not count and the fixture stays unplayed.</p>':""}</div>`,{resume:()=>t.resume(),controls:()=>this.howTo(!0),settings:()=>this.settings(!0),style:()=>this.styleMenu(!0),stats:()=>this.liveStats(),exit:()=>{if(n==="tutorial"){this.skipTutorial();return}t.endSession(),n==="career"?this.hub():n==="drill"?this.training(!!t.store.career):this.mainMenu()}})}liveStats(){let t=this.app.session.match,e=t.human,n=t.stats.report(e),i=n.stats;this.show(`<div class="panel" style="width:min(560px,94vw)"><h2>Match Statistics</h2>
      <div class="big-score">${Vt(t.teams[0].short)} ${n.score[0]} - ${n.score[1]} ${Vt(t.teams[1].short)}</div>
      <table class="t">
        <tr><td>Current rating</td><td class="n"><b>${Ls(n.rating)}</b></td></tr>
        <tr><td>Goals / assists</td><td class="n">${i.goals} / ${i.assists}</td></tr>
        <tr><td>Passes completed</td><td class="n">${i.passCmp}/${i.passAtt} (${i.passAcc}%)</td></tr>
        <tr><td>Shots (on target)</td><td class="n">${i.shots} (${i.shotsOn})</td></tr>
        <tr><td>Tackles won / interceptions</td><td class="n">${i.tacklesWon} / ${i.interceptions}</td></tr>
        <tr><td>Possession lost / fouls</td><td class="n">${i.possLost} / ${i.fouls}</td></tr>
        <tr><td>Team possession</td><td class="n">${n.possession[0]}% - ${n.possession[1]}%</td></tr>
      </table>
      <div class="row" style="margin-top:12px"><button class="btn" data-act="back">Back</button></div></div>`,{back:()=>this.pauseMenu()})}clickToPlay(){this.current="click";let t=this.app.session,e=!this.seenControls;this.seenControls=!0;let n=t&&t.cfg.title?`<h2>${Vt(t.cfg.title)}</h2>`:"";if(t&&t.cfg.mode==="tutorial"){let a=this.app.input.touchMode;this.show(`<div class="panel tut-card" style="text-align:center;max-width:560px">
        <div class="tut-badge">2-MINUTE WARM-UP</div>
        <h2>Welcome to First Touch!</h2>
        <p>Coach Ada will show you the basics: look around, run, dribble, pass, shoot and tackle. Be quick on each drill to earn a star.</p>
        <div class="row" style="justify-content:center;margin-top:6px"><button class="btn primary big" data-act="start">Start tutorial</button><button class="btn" data-act="skip">Skip tutorial</button></div>
        <div class="small muted" style="margin-top:10px">${a?"Best played with the phone sideways.":"Starting captures your mouse. Press Esc at any time to pause or skip."}</div></div>`,{start:()=>this.app.resume(),skip:()=>this.skipTutorial()});return}if(this.app.input.touchMode){let a=bu.map(([l,c])=>`<tr><td><b>${l}</b></td><td>${c}</td></tr>`).join("");this.show(`<div class="panel tap-panel" style="text-align:center;max-width:620px">${n}<div class="lockmsg">Tap to play</div>
        ${e?`<table class="t small" style="margin-top:10px;text-align:left">${a}</table><div class="small muted" style="margin-top:8px">Best played with the phone sideways.</div>`:'<div class="small muted">Left thumb move \xB7 right thumb look \xB7 SHOOT / PASS / THRU \xB7 TACKLE / SLIDE \xB7 II pause</div>'}</div>`,{},"screen center dim"),this.root.firstChild.addEventListener("click",()=>{this.app.resume()},{once:!0});return}let i=_u.map(([a,l])=>`<tr><td><b>${a}</b></td><td>${l}</td></tr>`).join("");this.show(`<div class="panel" style="text-align:center;max-width:620px">${n}<div class="lockmsg">Click to play</div>
      ${e?`<table class="t small" style="margin-top:10px;text-align:left">${i}</table><div class="small" style="margin-top:8px;text-align:left">Let passes reach your feet for a soft first touch. Look at a teammate to select them (ring), then right-click. Press pass or hold shoot just before the ball arrives to play it first time.</div>`:'<div class="small muted">Mouse look \xB7 WASD move \xB7 Shift sprint \xB7 LMB shoot \xB7 RMB pass \xB7 Space through / call \xB7 E tackle \xB7 C slide \xB7 Esc pause</div>'}</div>`,{},"screen center dim"),this.root.firstChild.addEventListener("click",()=>{this.app.resume()},{once:!0})}lockRefused(){this.show(`<div class="panel" style="text-align:center"><div class="lockmsg">Click to resume</div><p class="small">The browser did not capture the mouse. Click again (browsers refuse for about a second after Esc).<br>Or play without capture: hold a mouse button and drag to look, or use the arrow keys.</p>
      <div class="row" style="justify-content:center"><button class="btn primary" data-act="r">Resume</button><button class="btn" data-act="d">Play with drag-look</button></div></div>`,{r:()=>this.app.resume(),d:()=>{this.app.input.dragMode=!0,this.app.resume()}})}};function wm(s){return s>120?`${s}\xB0 (wide view)`:`${s}\xB0`}var Ec="firsttouch.career",Tm="firsttouch.career.backup";function Em(s){let t=2166136261;for(let e=0;e<s.length;e++)t^=s.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0).toString(16)}function Yb(s){return!(!s||typeof s!="object"||!s.player||typeof s.player.name!="string"||!s.player.attrs||!ee(s.clubId)||!s.season||!Array.isArray(s.season.fixtures)||!Array.isArray(s.season.table)||!s.totals||!Array.isArray(s.timeline)||!Array.isArray(s.committed))}function Kb(s,t){return t<2&&(s.flags=s.flags||{},s.earnings=s.earnings||0,s.trophies=s.trophies||[]),s.version=Ao,s}function Hu(s){let t=JSON.parse(s);if(!t||typeof t.data!="string"||Em(t.data)!==t.sum)throw new Error("checksum mismatch");let e=JSON.parse(t.data),n=t.version||1;if(n>Ao)throw new Error("save from a newer version");let i=Kb(e,n);if(!Yb(i))throw new Error("invalid career data");return i}var Ac=class{constructor(){this.career=null,this.notice=null,this.load()}load(){let t=null;try{t=localStorage.getItem(Ec)}catch{this.notice={bad:!0,text:"Saving is unavailable in this browser (storage blocked). Progress will not persist."};return}if(t)try{this.career=Hu(t)}catch{let n=null;try{n=localStorage.getItem(Tm)}catch{}try{if(!n)throw new Error("no backup");this.career=Hu(n),this.notice={bad:!0,text:"Your career save was damaged, so the backup copy was restored."},this.save()}catch{this.career=null,this.corrupt=t,this.notice={bad:!0,text:"Your career save was damaged and no usable backup exists. Start a new career to continue."}}}}save(){if(!this.career)return{ok:!1,error:"no career"};try{let t=JSON.stringify(this.career),e=JSON.stringify({version:Ao,savedAt:Date.now(),sum:Em(t),data:t}),n=localStorage.getItem(Ec);if(n)try{Hu(n),localStorage.setItem(Tm,n)}catch{}return localStorage.setItem(Ec,e),{ok:!0}}catch(t){return{ok:!1,error:t&&t.name==="QuotaExceededError"?"Browser storage is full.":"Browser storage is unavailable."}}}set(t){return this.career=t,this.save()}erase(){this.career=null;try{localStorage.removeItem(Ec)}catch{}}};var Gu=class{constructor(){let t=document.createElement("style");t.textContent=Qu,document.head.appendChild(t),this.params=new URLSearchParams(location.search),this.settings=Yp(),this.coarse=!!(window.matchMedia&&matchMedia("(pointer: coarse)").matches),this.coarse&&!qp()&&(this.settings.quality="medium"),this.canvas=document.getElementById("game"),this.uiRoot=document.getElementById("ui"),this.view=new ac(this.canvas,{quality:this.settings.quality,preserve:this.params.has("preserve")}),this.view.setQuality(this.settings.quality),this.style=this.params.get("style")||Zp(),this.view.setStyle(this.style),this.audio=new lc,this.audio.setVolumes({master:this.settings.master,sfx:this.settings.sfx,crowd:this.settings.crowd}),this.input=new hc(this.canvas),this.input.sensitivity=this.settings.sensitivity,this.input.invertY=this.settings.invertY,this.hud=new uc(this.uiRoot),this.touch=new dc(this,this.uiRoot),this.setTouchMode(this.settings.touch==="on"||this.settings.touch!=="off"&&this.coarse),window.addEventListener("pointerdown",r=>{this.settings.touch==="auto"&&(r.pointerType==="touch"&&!this.input.touchMode?this.setTouchMode(!0):r.pointerType==="mouse"&&this.input.touchMode&&!this.input.fromTouch(r)&&this.setTouchMode(!1))},!0),this.store=new Ac,this.screens=new Tc(this),this.session=null,this.menuSession=null,this.paused=!1,this.last=performance.now(),this.fpsCap=Number(this.params.get("fps")||0),this.frameAcc=0,this.adapt={on:this.params.has("adapt")||!navigator.webdriver&&!this.fpsCap,ema:1/60,scale:1,floor:.5,low:0,high:0,check:null},this.input.onPause=()=>this.togglePause(),this.input.onLockLost=()=>{this.session&&!this.paused&&this.pause()},this.input.onLockGained=()=>{this.session&&this.awaitingLock&&this.unpause()},this.input.onLockError=()=>{this.session&&this.awaitingLock&&(this.awaitingLock=!1,this.screens.lockRefused())},document.addEventListener("visibilitychange",()=>{document.hidden?this.onBlur():this.onFocus()}),window.addEventListener("blur",()=>this.onBlur()),window.addEventListener("focus",()=>this.onFocus()),window.addEventListener("resize",()=>this.view.resize());let e=()=>{this.audio.init(),(!this.paused||!this.session)&&this.audio.resume()};for(let r of["pointerdown","pointerup","touchend","click","keydown"])window.addEventListener(r,e,{capture:!0});document.addEventListener("gesturestart",r=>r.preventDefault()),document.getElementById("boot")?.remove();let n=this.params.get("auto");!n&&!Sm()&&(!navigator.webdriver||this.params.has("tutorial"))?this.screens.startTutorial({first:!0}):(this.startMenuBackground(),this.screens.mainMenu()),requestAnimationFrame(r=>this.loop(r)),window.__ft=this,this.debugStep=r=>{let o=(this.session||this.menuSession).match;for(let a=0;a<r;a++)o.step(1/120)},n&&setTimeout(()=>this.autostart(n),50)}autostart(t){let e=this.params.get("half")?Number(this.params.get("half")):void 0;e&&(this.testHalf=e),t==="quick"?this.startQuickMatch({home:this.params.get("home")||"millbrook",away:this.params.get("away")||"ashford",role:this.params.get("role")||"ST",venue:this.params.get("venue"),halfLength:e}):t==="practice"?this.startTraining("practice"):t==="tutorial"?this.screens.startTutorial():t.startsWith("drill:")?this.startTraining(t.slice(6)):t==="hub"&&this.screens.hub()}loop(t){requestAnimationFrame(r=>this.loop(r));let e=(t-this.last)/1e3;if(this.adaptResolution(e),this.fpsCap){if(this.frameAcc+=e,this.last=t,this.frameAcc<1/this.fpsCap)return;e=this.frameAcc,this.frameAcc=0}else this.last=t;e=Math.min(e,.1);let n=this.session||this.menuSession;n&&n.frame(this.paused&&this.session?0:e);let i=!!(this.session&&this.session.human&&!this.paused&&!this.session.ended);this.touch.setVisible(this.input.touchMode&&i),this.touch.visible&&this.touch.update(this.session),this.onFrame&&this.onFrame(e)}adaptResolution(t){let e=this.adapt;if(!e.on||t<=0||t>.5)return;if(!!!(this.session&&!this.paused&&!document.hidden)){e.low=0,e.high=0,e.check=null;return}if(e.ema+=(t-e.ema)*.06,e.floorT=(e.floorT||0)+t,e.floor>.5&&e.floorT>30&&(e.floor=.5),e.check){e.check.t+=t,e.check.t>2&&(e.ema>e.check.before*.92&&(e.floor=e.check.prev,e.floorT=0,e.scale=e.check.prev,this.view.setResolutionScale(e.scale)),e.check=null);return}if(e.ema>1/42?(e.low+=t,e.high=0):e.ema<1/56?(e.high+=t,e.low=0):(e.low=0,e.high=0),e.low>1.5&&e.scale>e.floor+.01){let i=e.scale;e.scale=Math.max(e.floor,e.scale*.85),this.view.setResolutionScale(e.scale),e.check={before:e.ema,prev:i,t:0},e.low=0}else e.high>6&&e.scale<1&&(e.scale=Math.min(1,e.scale*1.12),this.view.setResolutionScale(e.scale),e.high=0)}setTouchMode(t){this.input.touchMode=t,document.documentElement.dataset.touch=t?"1":"0",t||this.touch.setVisible(!1)}tryFullscreen(){if(!this.input.touchMode||document.fullscreenElement||this.params.has("nofs"))return;let t=document.documentElement;try{let e=t.requestFullscreen&&t.requestFullscreen({navigationUI:"hide"});e&&e.then&&e.then(()=>{try{let n=screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape");n&&n.catch&&n.catch(()=>{})}catch{}}).catch(()=>{})}catch{}}startMenuBackground(t="town"){if(this.menuSession)return;let e=ee("oldbridge"),n=ee("fenwick"),i=yr(e,n),r={mode:"menu",venue:t,venueOpts:{homeName:e.name},colours:{kits:i,human:Ps().look},match:{seed:99,halfLength:1e5,difficulty:"standard",teams:[Eo(e),Eo(n)]}};this.menuSession=new So(this,r),this.menuSession.cam.radius=60,this.menuSession.cam.height=24,this.menuSession.start()}stopMenuBackground(){this.menuSession&&(this.menuSession.dispose(),this.menuSession=null)}matchConfig({homeClub:t,awayClub:e,human:n,humanSide:i=0,seed:r=1,halfLength:o,difficulty:a,strengths:l}){let c=yr(t,e),h=Eo(t,{human:i===0?n:null,strength:l&&l[0]}),d=Eo(e,{human:i===1?n:null,strength:l&&l[1]});return{kits:c,match:{seed:r,halfLength:o||Il[this.settings.matchLength]||180,difficulty:a||this.settings.difficulty,teams:[h,d]}}}startSession(t){return this.stopMenuBackground(),this.session&&this.session.dispose(),this.screens.clear(),this.session=new So(this,t),this.hud.show(!0),this.session.start(),this.paused=!0,this.session.setPaused(!0),this.input.active=!0,this.screens.clickToPlay(),this.session}endSession(){this.session&&this.session.dispose(),this.session=null,this.paused=!1,this.input.active=!1,this.input.exitLock(),this.hud.show(!1),this.startMenuBackground()}startQuickMatch(t){let e=ee(t.home)||Sn[0],n=ee(t.away)||Sn[1],i=this.store.career,r={...i?i.player:Ps()};t.role&&(r.role=t.role);let o=t.side||0,a=this.params.get("seed")?Number(this.params.get("seed")):(Date.now()&65535)+1,l=this.matchConfig({homeClub:e,awayClub:n,human:r,humanSide:o,seed:a,halfLength:t.halfLength}),c=t.venue||zn(e.tier).venue;return this.startSession({mode:"quick",venue:c,venueOpts:{homeName:e.name},colours:{kits:l.kits,human:r.look},match:l.match,onEnd:h=>this.screens.report(h,{quick:!0})})}startTraining(t){return this.screens.startDrill(t)}playCareerMatch(){let t=this.store.career,e=hm(t);if(!e)return;let n=e.fx,i=ee(n.home),r=ee(n.away),o=n.home===t.clubId?0:1,a={...t.player},l=this.matchConfig({homeClub:i,awayClub:r,human:a,humanSide:o,seed:xi(`${t.seed}:${t.seasonNo}:${n.round}:${e.id}`),halfLength:this.testHalf}),c=n.final?"continental":zn(i.tier).venue,h=e.id;return this.startSession({mode:"career",venue:c,venueOpts:{homeName:i.name,final:!!n.final},final:n.final?n.name:null,title:n.final?`${n.name}: ${i.name} v ${r.name}`:`${zn(i.tier).league} \xB7 Round ${n.round}: ${i.name} v ${r.name}`,colours:{kits:l.kits,human:a.look},match:l.match,onEnd:d=>this.screens.report(d,{career:!0,matchId:h,fx:n,title:n.final?"Continental Cup Final":`Round ${n.round} report`})})}togglePause(){if(!this.session){this.screens.back();return}this.paused?this.resume():this.pause()}pause(){!this.session||this.session.ended||(this.paused=!0,this.session.setPaused(!0),this.input.releaseAll(),this.touch.setVisible(!1),this.input.exitLock(),this.audio.suspend(),this.screens.pauseMenu())}resume(){if(!this.session)return;if(this.input.active=!0,this.input.touchMode){this.tryFullscreen(),this.unpause();return}if(this.input.dragMode||this.input.locked){this.unpause();return}if(this.screens.clear(),this.awaitingLock=!0,!this.input.requestLock()){this.awaitingLock=!1,this.unpause();return}clearTimeout(this.lockTimer),this.lockTimer=setTimeout(()=>{this.awaitingLock&&!this.input.locked&&(this.awaitingLock=!1,this.screens.lockRefused())},1500)}unpause(){this.awaitingLock=!1,this.screens.clear(),this.paused=!1,this.session&&this.session.setPaused(!1),this.audio.resume()}onBlur(){this.audio.setMuted(!0),this.session&&!this.paused&&!this.session.ended&&this.pause()}onFocus(){this.audio.setMuted(!1),this.paused&&this.audio.suspend()}applySettings(){let t=this.settings,e=t.touch==="on"||t.touch!=="off"&&(this.coarse||this.input.touchMode);if(e!==this.input.touchMode&&this.setTouchMode(e),this.input.sensitivity=t.sensitivity,this.input.invertY=t.invertY,this.audio.setVolumes({master:t.master,sfx:t.sfx,crowd:t.crowd}),this.view.quality!==t.quality){this.view.setQuality(t.quality),this.view.venueKey=null;let n=this.session||this.menuSession;n&&this.view.setVenue(n.cfg.venue,n.cfg.venueOpts||{})}Kp(t)||this.screens.toast("Settings could not be saved (storage unavailable).",!0)}setStyle(t){this.style=t,this.view.setStyle(t),Jp(t)}};function Am(){try{new Gu}catch(s){console.error(s);let t=document.getElementById("boot");t&&(t.textContent="First Touch could not start: "+s.message+" (a browser with WebGL2 is required).")}}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",Am):Am();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
