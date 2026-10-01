/* First Touch - bundled game. three.js is MIT licensed (see vendor/three/LICENSE). */
(()=>{var Md=`/* First Touch UI. Two themes selected by html[data-style]:
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

/* goal replay: everything else in the HUD steps aside for cinema bars */
.hud-replay { display: none; position: absolute; inset: 0; pointer-events: none; color: #fff; }
.hud.replaying .hud-replay { display: block; }
.hud.replaying > :not(.hud-replay):not(.hud-fade) { display: none !important; }
.rp-bar { position: absolute; left: 0; right: 0; height: 8.5vh; background: #0b0b0b; }
.rp-top { top: 0; } .rp-bot { bottom: 0; }
.rp-tag { position: absolute; top: calc(8.5vh + 12px); left: calc(16px + env(safe-area-inset-left, 0px)); font-weight: 900; font-size: 14px; letter-spacing: 4px; background: rgba(0,0,0,0.6); padding: 5px 12px 5px 10px; display: flex; align-items: center; gap: 8px; }
.rp-tag i { width: 9px; height: 9px; border-radius: 50%; background: #ff3b3b; animation: rpDot 1s steps(2) infinite; }
@keyframes rpDot { 50% { opacity: 0.15; } }
.rp-info { position: absolute; bottom: calc(8.5vh + 14px); left: calc(16px + env(safe-area-inset-left, 0px)); font-weight: 800; font-size: 15px; text-shadow: 0 1px 3px rgba(0,0,0,0.8); max-width: 60vw; }
.rp-prog { position: absolute; left: 0; right: 0; bottom: 8.5vh; height: 3px; background: rgba(255,255,255,0.18); }
.rp-prog i { display: block; height: 100%; width: 0; background: #fff; }
.rp-skip { position: absolute; bottom: calc(8.5vh + 10px); right: calc(16px + env(safe-area-inset-right, 0px)); pointer-events: auto; font: inherit; font-size: 14px; font-weight: 800; min-height: 44px; padding: 8px 16px; background: rgba(250,248,241,0.95); color: #161616; border: 2px solid #161616; border-radius: var(--radius); cursor: pointer; touch-action: manipulation; }
.rp-skip b { font-size: 11px; font-weight: 700; opacity: 0.6; margin-left: 6px; }
html[data-style="neo"] .rp-tag { background: #ff4fa3; color: #000; border: 2px solid #000; box-shadow: 3px 3px 0 #000; }
html[data-style="neo"] .rp-skip { background: #ffe45c; border: 3px solid #000; box-shadow: 4px 4px 0 #000; border-radius: 0; text-transform: uppercase; }
@media (max-height: 520px) { .rp-bar { height: 6vh; } .rp-tag { top: calc(6vh + 8px); } .rp-info { bottom: calc(6vh + 10px); font-size: 13px; } .rp-prog { bottom: 6vh; } .rp-skip { bottom: calc(6vh + 8px); } }
@media (max-width: 600px) { .rp-info { font-size: 12px; max-width: 45vw; } .rp-skip { font-size: 13px; padding: 6px 12px; } .rp-skip b { display: none; } .rp-tag { font-size: 12px; letter-spacing: 3px; } }
@media (prefers-reduced-motion: reduce) { .rp-tag i { animation: none; } }
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
.coach { position: absolute; top: calc(12px + env(safe-area-inset-top, 0px)); left: 50%; transform: translateX(-50%); width: min(420px, 92vw); background: var(--paper); border: var(--line) solid var(--ink); box-shadow: var(--shadow); padding: 6px 10px 9px; pointer-events: none; z-index: 5; overflow: hidden; }
.coach-main { display: flex; align-items: flex-start; gap: 8px; }
.coach-txt { flex: 1; min-width: 0; }
.coach-say { font-family: var(--display); font-size: 18px; font-weight: 700; line-height: 1.15; }
.coach-say.pop { animation: coachPop .3s ease-out; }
.coach-hint { font-size: 12px; margin-top: 1px; color: var(--muted); font-weight: 700; line-height: 1.2; }
.coach-hint.empty { display: none; }
.coach-skip { pointer-events: auto; font: inherit; font-size: 11px; font-weight: 700; padding: 4px 8px; border: 1px solid var(--ink); background: var(--paper); color: var(--ink); cursor: pointer; border-radius: var(--radius); touch-action: manipulation; white-space: nowrap; }
.coach-foot { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
.coach-dots { display: flex; gap: 3px; flex: 1; }
.coach-dots i { width: 7px; height: 7px; border-radius: 50%; border: 1.5px solid var(--ink); transition: background .2s; }
.coach-dots i.done { background: var(--good); border-color: var(--good); }
.coach-dots i.now { background: var(--ink); animation: dotPulse .8s ease-in-out infinite alternate; }
.coach-stars { color: #a87a00; font-size: 12px; font-weight: 900; white-space: nowrap; }
.coach-bar { position: absolute; left: 0; right: 0; bottom: 0; height: 4px; background: var(--barbg); }
.coach-bar i { display: block; height: 100%; background: var(--ink); }
@keyframes coachPop { from { transform: translateY(4px) scale(0.96); opacity: 0.2; } to { transform: none; opacity: 1; } }
@keyframes dotPulse { from { transform: scale(0.85); } to { transform: scale(1.15); } }
html[data-style="neo"] .coach { background: #fff; border-width: 3px; box-shadow: 6px 6px 0 #000; }
html[data-style="neo"] .coach-dots i { border-width: 2px; border-color: #000; }
html[data-style="neo"] .coach-dots i.done { background: #00d65c; border-color: #000; }
html[data-style="neo"] .coach-dots i.now { background: #ffe45c; }
html[data-style="neo"] .coach-stars { color: #000; background: #ffe45c; border: 2px solid #000; padding: 0 5px; }
html[data-style="neo"] .coach-say { font-family: var(--font); }
html[data-style="neo"] .coach-bar { border-top: 2px solid #000; height: 8px; background: #fff; }
html[data-style="neo"] .coach-bar i { background: #3ee0ff; }
html[data-style="neo"] .coach-skip { border: 2px solid #000; box-shadow: 2px 2px 0 #000; text-transform: uppercase; background: #fff; }
html[data-style="neo"] .coach { box-shadow: 4px 4px 0 #000; }
/* the warm-up hides the match furniture; notes drop below the card */
.hud.tut .hud-top, .hud.tut .hud-clock, .hud.tut .hud-phase, .hud.tut .hud-player, .hud.tut .hud-hint, .hud.tut .hud-arrow { display: none; }
.tut-arrow { position: absolute; width: 0; height: 0; border-top: 16px solid transparent; border-bottom: 16px solid transparent; border-left: 30px solid #d9a400; filter: drop-shadow(0 0 1px #161616) drop-shadow(0 0 1px #161616); transform: translate(-50%,-50%) rotate(var(--rot, 0rad)); animation: tutArrow .6s ease-in-out infinite alternate; pointer-events: none; z-index: 4; }
html[data-style="neo"] .tut-arrow { border-left-color: #ffe45c; filter: drop-shadow(0 0 0 #000) drop-shadow(2px 2px 0 #000); }
@keyframes tutArrow { from { opacity: 0.55; } to { opacity: 1; } }
.hud.tut .hud-notes { top: 104px; }
html[data-touch="1"] .coach { top: calc(6px + env(safe-area-inset-top, 0px)); width: min(340px, calc(100vw - 250px)); }
@media (max-height: 520px) {
  .coach { padding: 4px 8px 8px; }
  .coach-say { font-size: 15px; }
  .coach-hint { font-size: 11px; margin-top: 0; }
  .coach-foot { margin-top: 3px; }
  .coach-skip { font-size: 10px; padding: 3px 6px; }
  .hud.tut .hud-notes { top: 78px; }
}
@media (max-width: 600px) {
  html[data-touch="1"] .coach { top: calc(8px + env(safe-area-inset-top, 0px)); width: calc(100vw - 120px); }
  html[data-touch="1"] .hud.tut .hud-notes { top: calc(92px + env(safe-area-inset-top, 0px)); }
}
@media (prefers-reduced-motion: reduce) { .coach-say.pop, .coach-dots i.now { animation: none; } }
.tut-badge { display: inline-block; font-size: 11px; font-weight: 900; letter-spacing: 2px; padding: 3px 8px; border: 1px solid var(--ink); margin-bottom: 8px; }
html[data-style="neo"] .tut-badge { background: #ffe45c; border: 2px solid #000; }
.tut-stars { font-size: 32px; letter-spacing: 3px; color: #a87a00; margin: 2px 0 4px; line-height: 1.1; word-break: break-all; }
html[data-style="neo"] .tut-stars { color: #ff4fa3; -webkit-text-stroke: 1px #000; }
.tut-card p { margin: 6px 0; }
`;var qd=0,xh=1,Yd=2;var yh=0,ao=1,Kd=2,fr=3,ci=0,en=1,Fn=2,hi=0,pr=1,vh=2,_h=3,bh=4,Zd=5;var Ts=100,Jd=101,jd=102,Qd=103,tf=104,ef=200,nf=201,sf=202,rf=203,Mh=204,Sh=205,of=206,af=207,lf=208,cf=209,hf=210,uf=211,df=212,ff=213,pf=214,la=0,ca=1,ha=2,nr=3,ua=4,da=5,fa=6,pa=7,wh=0,mf=1,gf=2,Zn=0,Th=1,Eh=2,Ah=3,Rh=4,Ch=5,Ih=6,Ph=7;var Lh=300,Ji=301,Es=302,Ba=303,Ha=304,lo=306,ma=1e3,si=1001,ga=1002,Ge=1003,xf=1004;var co=1005;var qe=1006,Ga=1007;var ji=1008;var Mn=1009,kh=1010,Nh=1011,mr=1012,Va=1013,Jn=1014,Sn=1015,jn=1016,Wa=1017,Xa=1018,gr=1020,Dh=35902,Oh=35899,Uh=1021,zh=1022,wn=1023,ri=1026,Qi=1027,$a=1028,qa=1029,ts=1030,Ya=1031;var Ka=1033,ho=33776,uo=33777,fo=33778,po=33779,Za=35840,Ja=35841,ja=35842,Qa=35843,tl=36196,el=37492,nl=37496,il=37488,sl=37489,mo=37490,rl=37491,ol=37808,al=37809,ll=37810,cl=37811,hl=37812,ul=37813,dl=37814,fl=37815,pl=37816,ml=37817,gl=37818,xl=37819,yl=37820,vl=37821,_l=36492,bl=36494,Ml=36495,Sl=36283,wl=36284,go=36285,Tl=36286;var Xr=2300,xa=2301,oa=2302,hh=2303,uh=2400,dh=2401,fh=2402;var yf=3200;var Fh=0,vf=1,Ai="",Pn="srgb",_s="srgb-linear",$r="linear",_e="srgb";var aa=7680;var _f=519,bf=512,Mf=513,Sf=514,El=515,wf=516,Tf=517,Al=518,Ef=519,Af=35044,Bh=35048;var Hh="300 es",Kn=2e3,ir=2001;function o0(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function a0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function qr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Rf(){let s=qr("canvas");return s.style.display="block",s}var Sd={},sr=null;function Gh(...s){let t="THREE."+s.shift();sr?sr("log",t,...s):console.log(t,...s)}function Cf(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Vt(...s){s=Cf(s);let t="THREE."+s.shift();if(sr)sr("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function $t(...s){s=Cf(s);let t="THREE."+s.shift();if(sr)sr("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function vs(...s){let t=s.join(" ");t in Sd||(Sd[t]=!0,Vt(...s))}function If(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Pf={[la]:ca,[ha]:fa,[ua]:pa,[nr]:da,[ca]:la,[fa]:ha,[pa]:ua,[da]:nr},oi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],wd=1234567,Vr=Math.PI/180,rr=180/Math.PI;function xr(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(rn[s&255]+rn[s>>8&255]+rn[s>>16&255]+rn[s>>24&255]+"-"+rn[t&255]+rn[t>>8&255]+"-"+rn[t>>16&15|64]+rn[t>>24&255]+"-"+rn[e&63|128]+rn[e>>8&255]+"-"+rn[e>>16&255]+rn[e>>24&255]+rn[n&255]+rn[n>>8&255]+rn[n>>16&255]+rn[n>>24&255]).toLowerCase()}function de(s,t,e){return Math.max(t,Math.min(e,s))}function Vh(s,t){return(s%t+t)%t}function l0(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function c0(s,t,e){return s!==t?(e-s)/(t-s):0}function Wr(s,t,e){return(1-e)*s+e*t}function h0(s,t,e,n){return Wr(s,t,1-Math.exp(-e*n))}function u0(s,t=1){return t-Math.abs(Vh(s,t*2)-t)}function d0(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function f0(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function p0(s,t){return s+Math.floor(Math.random()*(t-s+1))}function m0(s,t){return s+Math.random()*(t-s)}function g0(s){return s*(.5-Math.random())}function x0(s){s!==void 0&&(wd=s);let t=wd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function y0(s){return s*Vr}function v0(s){return s*rr}function _0(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function b0(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function M0(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function S0(s,t,e,n,i){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),m=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*m,a*c);break;case"YXY":s.set(l*m,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*m,a*h,a*c);break;default:Vt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function tr(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function dn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Bn={DEG2RAD:Vr,RAD2DEG:rr,generateUUID:xr,clamp:de,euclideanModulo:Vh,mapLinear:l0,inverseLerp:c0,lerp:Wr,damp:h0,pingpong:u0,smoothstep:d0,smootherstep:f0,randInt:p0,randFloat:m0,randFloatSpread:g0,seededRandom:x0,degToRad:y0,radToDeg:v0,isPowerOfTwo:_0,ceilPowerOfTwo:b0,floorPowerOfTwo:M0,setQuaternionFromProperEuler:S0,normalize:dn,denormalize:tr},Yh=class Yh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=de(this.x,t.x,e.x),this.y=de(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=de(this.x,t,e),this.y=de(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(de(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(de(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Yh.prototype.isVector2=!0;var Zt=Yh,Ue=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],m=r[o+1],g=r[o+2],x=r[o+3];if(u!==x||l!==d||c!==m||h!==g){let f=l*d+c*m+h*g+u*x;f<0&&(d=-d,m=-m,g=-g,x=-x,f=-f);let p=1-a;if(f<.9995){let y=Math.acos(f),_=Math.sin(y);p=Math.sin(p*y)/_,a=Math.sin(a*y)/_,l=l*p+d*a,c=c*p+m*a,h=h*p+g*a,u=u*p+x*a}else{l=l*p+d*a,c=c*p+m*a,h=h*p+g*a,u=u*p+x*a;let y=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=y,c*=y,h*=y,u*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],m=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*m-c*d,t[e+1]=l*g+h*d+c*u-a*m,t[e+2]=c*g+h*m+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),m=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*m*g,this._y=c*m*u-d*h*g,this._z=c*h*g+d*m*u,this._w=c*h*u-d*m*g;break;case"YXZ":this._x=d*h*u+c*m*g,this._y=c*m*u-d*h*g,this._z=c*h*g-d*m*u,this._w=c*h*u+d*m*g;break;case"ZXY":this._x=d*h*u-c*m*g,this._y=c*m*u+d*h*g,this._z=c*h*g+d*m*u,this._w=c*h*u-d*m*g;break;case"ZYX":this._x=d*h*u-c*m*g,this._y=c*m*u+d*h*g,this._z=c*h*g-d*m*u,this._w=c*h*u+d*m*g;break;case"YZX":this._x=d*h*u+c*m*g,this._y=c*m*u+d*h*g,this._z=c*h*g-d*m*u,this._w=c*h*u-d*m*g;break;case"XZY":this._x=d*h*u-c*m*g,this._y=c*m*u-d*h*g,this._z=c*h*g+d*m*u,this._w=c*h*u+d*m*g;break;default:Vt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(o-i)*m}else if(n>a&&n>u){let m=2*Math.sqrt(1+n-a-u);this._w=(h-l)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(r+c)/m}else if(a>u){let m=2*Math.sqrt(1+a-n-u);this._w=(r-c)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(l+h)/m}else{let m=2*Math.sqrt(1+u-n-a);this._w=(o-i)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(de(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,i=-i,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Kh=class Kh{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Td.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Td.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=de(this.x,t.x,e.x),this.y=de(this.y,t.y,e.y),this.z=de(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=de(this.x,t,e),this.y=de(this.y,t,e),this.z=de(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(de(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Vc.copy(this).projectOnVector(t),this.sub(Vc)}reflect(t){return this.sub(Vc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(de(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Kh.prototype.isVector3=!0;var L=Kh,Vc=new L,Td=new Ue,Zh=class Zh{constructor(t,e,n,i,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],m=n[5],g=n[8],x=i[0],f=i[3],p=i[6],y=i[1],_=i[4],b=i[7],M=i[2],S=i[5],T=i[8];return r[0]=o*x+a*y+l*M,r[3]=o*f+a*_+l*S,r[6]=o*p+a*b+l*T,r[1]=c*x+h*y+u*M,r[4]=c*f+h*_+u*S,r[7]=c*p+h*b+u*T,r[2]=d*x+m*y+g*M,r[5]=d*f+m*_+g*S,r[8]=d*p+m*b+g*T,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,m=c*r-o*l,g=e*u+n*d+i*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(i*c-h*n)*x,t[2]=(a*n-i*o)*x,t[3]=d*x,t[4]=(h*e-i*l)*x,t[5]=(i*r-a*e)*x,t[6]=m*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return vs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Wc.makeScale(t,e)),this}rotate(t){return vs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Wc.makeRotation(-t)),this}translate(t,e){return vs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Wc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Zh.prototype.isMatrix3=!0;var Xt=Zh,Wc=new Xt,Ed=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ad=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function w0(){let s={enabled:!0,workingColorSpace:_s,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===_e&&(i.r=Ti(i.r),i.g=Ti(i.g),i.b=Ti(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===_e&&(i.r=er(i.r),i.g=er(i.g),i.b=er(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ai?$r:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return vs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return vs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[_s]:{primaries:t,whitePoint:n,transfer:$r,toXYZ:Ed,fromXYZ:Ad,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Pn},outputColorSpaceConfig:{drawingBufferColorSpace:Pn}},[Pn]:{primaries:t,whitePoint:n,transfer:_e,toXYZ:Ed,fromXYZ:Ad,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Pn}}}),s}var le=w0();function Ti(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function er(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Bs,ya=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Bs===void 0&&(Bs=qr("canvas")),Bs.width=t.width,Bs.height=t.height;let i=Bs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Bs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=qr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ti(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ti(e[n]/255)*255):e[n]=Ti(e[n]);return{data:e,width:t.width,height:t.height}}else return Vt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},T0=0,or=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:T0++}),this.uuid=xr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Xc(i[o].image)):r.push(Xc(i[o]))}else r=Xc(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function Xc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ya.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Vt("Texture: Unable to serialize Texture."),{})}var E0=0,$c=new L,fn=class s extends oi{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=si,i=si,r=qe,o=ji,a=wn,l=Mn,c=s.DEFAULT_ANISOTROPY,h=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:E0++}),this.uuid=xr(),this.name="",this.source=new or(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Zt(0,0),this.repeat=new Zt(1,1),this.center=new Zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize($c).x}get height(){return this.source.getSize($c).y}get depth(){return this.source.getSize($c).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Vt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Vt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Lh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ma:t.x=t.x-Math.floor(t.x);break;case si:t.x=t.x<0?0:1;break;case ga:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ma:t.y=t.y-Math.floor(t.y);break;case si:t.y=t.y<0?0:1;break;case ga:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=Lh;fn.DEFAULT_ANISOTROPY=1;var Jh=class Jh{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],m=l[5],g=l[9],x=l[2],f=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+f)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let _=(c+1)/2,b=(m+1)/2,M=(p+1)/2,S=(h+d)/4,T=(u+x)/4,v=(g+f)/4;return _>b&&_>M?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=S/n,r=T/n):b>M?b<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(b),n=S/i,r=v/i):M<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(M),n=T/r,i=v/r),this.set(n,i,r,e),this}let y=Math.sqrt((f-g)*(f-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(f-g)/y,this.y=(u-x)/y,this.z=(d-h)/y,this.w=Math.acos((c+m+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=de(this.x,t.x,e.x),this.y=de(this.y,t.y,e.y),this.z=de(this.z,t.z,e.z),this.w=de(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=de(this.x,t,e),this.y=de(this.y,t,e),this.z=de(this.z,t,e),this.w=de(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(de(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Jh.prototype.isVector4=!0;var Ae=Jh,va=class extends oi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ae(0,0,t,e),this.scissorTest=!1,this.viewport=new Ae(0,0,t,e),this.textures=[];let i={width:t,height:e,depth:n.depth},r=new fn(i),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:qe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new or(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ln=class extends va{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Yr=class extends fn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var _a=class extends fn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Fa=class Fa{constructor(t,e,n,i,r,o,a,l,c,h,u,d,m,g,x,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,u,d,m,g,x,f)}set(t,e,n,i,r,o,a,l,c,h,u,d,m,g,x,f){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=m,p[7]=g,p[11]=x,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Fa().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/Hs.setFromMatrixColumn(t,0).length(),r=1/Hs.setFromMatrixColumn(t,1).length(),o=1/Hs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,m=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=m+g*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=g+m*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,m=l*u,g=c*h,x=c*u;e[0]=d+x*a,e[4]=g*a-m,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=m*a-g,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,m=l*u,g=c*h,x=c*u;e[0]=d-x*a,e[4]=-o*u,e[8]=g+m*a,e[1]=m+g*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,m=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=g*c-m,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=m*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,m=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-d*u,e[8]=g*u+m,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=m*u+g,e[10]=d-x*u}else if(t.order==="XZY"){let d=o*l,m=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=o*h,e[9]=m*u-g,e[2]=g*u-m,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(A0,t,R0)}lookAt(t,e,n){let i=this.elements;return Cn.subVectors(t,e),Cn.lengthSq()===0&&(Cn.z=1),Cn.normalize(),Oi.crossVectors(n,Cn),Oi.lengthSq()===0&&(Math.abs(n.z)===1?Cn.x+=1e-4:Cn.z+=1e-4,Cn.normalize(),Oi.crossVectors(n,Cn)),Oi.normalize(),Bo.crossVectors(Cn,Oi),i[0]=Oi.x,i[4]=Bo.x,i[8]=Cn.x,i[1]=Oi.y,i[5]=Bo.y,i[9]=Cn.y,i[2]=Oi.z,i[6]=Bo.z,i[10]=Cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],m=n[13],g=n[2],x=n[6],f=n[10],p=n[14],y=n[3],_=n[7],b=n[11],M=n[15],S=i[0],T=i[4],v=i[8],A=i[12],R=i[1],P=i[5],N=i[9],z=i[13],k=i[2],F=i[6],$=i[10],Y=i[14],st=i[3],K=i[7],tt=i[11],q=i[15];return r[0]=o*S+a*R+l*k+c*st,r[4]=o*T+a*P+l*F+c*K,r[8]=o*v+a*N+l*$+c*tt,r[12]=o*A+a*z+l*Y+c*q,r[1]=h*S+u*R+d*k+m*st,r[5]=h*T+u*P+d*F+m*K,r[9]=h*v+u*N+d*$+m*tt,r[13]=h*A+u*z+d*Y+m*q,r[2]=g*S+x*R+f*k+p*st,r[6]=g*T+x*P+f*F+p*K,r[10]=g*v+x*N+f*$+p*tt,r[14]=g*A+x*z+f*Y+p*q,r[3]=y*S+_*R+b*k+M*st,r[7]=y*T+_*P+b*F+M*K,r[11]=y*v+_*N+b*$+M*tt,r[15]=y*A+_*z+b*Y+M*q,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],m=t[14],g=t[3],x=t[7],f=t[11],p=t[15],y=l*m-c*d,_=a*m-c*u,b=a*d-l*u,M=o*m-c*h,S=o*d-l*h,T=o*u-a*h;return e*(x*y-f*_+p*b)-n*(g*y-f*M+p*S)+i*(g*_-x*M+p*T)-r*(g*b-x*S+f*T)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+i*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],m=t[11],g=t[12],x=t[13],f=t[14],p=t[15],y=e*a-n*o,_=e*l-i*o,b=e*c-r*o,M=n*l-i*a,S=n*c-r*a,T=i*c-r*l,v=h*x-u*g,A=h*f-d*g,R=h*p-m*g,P=u*f-d*x,N=u*p-m*x,z=d*p-m*f,k=y*z-_*N+b*P+M*R-S*A+T*v;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/k;return t[0]=(a*z-l*N+c*P)*F,t[1]=(i*N-n*z-r*P)*F,t[2]=(x*T-f*S+p*M)*F,t[3]=(d*S-u*T-m*M)*F,t[4]=(l*R-o*z-c*A)*F,t[5]=(e*z-i*R+r*A)*F,t[6]=(f*b-g*T-p*_)*F,t[7]=(h*T-d*b+m*_)*F,t[8]=(o*N-a*R+c*v)*F,t[9]=(n*R-e*N-r*v)*F,t[10]=(g*S-x*b+p*y)*F,t[11]=(u*b-h*S-m*y)*F,t[12]=(a*A-o*P-l*v)*F,t[13]=(e*P-n*A+i*v)*F,t[14]=(x*_-g*M-f*y)*F,t[15]=(h*M-u*_+d*y)*F,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,m=r*h,g=r*u,x=o*h,f=o*u,p=a*u,y=l*c,_=l*h,b=l*u,M=n.x,S=n.y,T=n.z;return i[0]=(1-(x+p))*M,i[1]=(m+b)*M,i[2]=(g-_)*M,i[3]=0,i[4]=(m-b)*S,i[5]=(1-(d+p))*S,i[6]=(f+y)*S,i[7]=0,i[8]=(g+_)*T,i[9]=(f-y)*T,i[10]=(1-(d+x))*T,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Hs.set(i[0],i[1],i[2]).length(),a=Hs.set(i[4],i[5],i[6]).length(),l=Hs.set(i[8],i[9],i[10]).length();r<0&&(o=-o),Xn.copy(this);let c=1/o,h=1/a,u=1/l;return Xn.elements[0]*=c,Xn.elements[1]*=c,Xn.elements[2]*=c,Xn.elements[4]*=h,Xn.elements[5]*=h,Xn.elements[6]*=h,Xn.elements[8]*=u,Xn.elements[9]*=u,Xn.elements[10]*=u,e.setFromRotationMatrix(Xn),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,i,r,o,a=Kn,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(n-i),d=(e+t)/(e-t),m=(n+i)/(n-i),g,x;if(l)g=r/(o-r),x=o*r/(o-r);else if(a===Kn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===ir)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Kn,l=!1){let c=this.elements,h=2/(e-t),u=2/(n-i),d=-(e+t)/(e-t),m=-(n+i)/(n-i),g,x;if(l)g=1/(o-r),x=o/(o-r);else if(a===Kn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===ir)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Fa.prototype.isMatrix4=!0;var ae=Fa,Hs=new L,Xn=new ae,A0=new L(0,0,0),R0=new L(1,1,1),Oi=new L,Bo=new L,Cn=new L,Rd=new ae,Cd=new Ue,_n=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(e){case"XYZ":this._y=Math.asin(de(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-de(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(de(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-de(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(de(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-de(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:Vt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Rd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Rd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Cd.setFromEuler(this),this.setFromQuaternion(Cd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_n.DEFAULT_ORDER="XYZ";var Kr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},C0=0,Id=new L,Gs=new Ue,_i=new ae,Ho=new L,Ur=new L,I0=new L,P0=new Ue,Pd=new L(1,0,0),Ld=new L(0,1,0),kd=new L(0,0,1),Nd={type:"added"},L0={type:"removed"},Vs={type:"childadded",child:null},qc={type:"childremoved",child:null},pn=class s extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:C0++}),this.uuid=xr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new L,e=new _n,n=new Ue,i=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ae},normalMatrix:{value:new Xt}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Gs.setFromAxisAngle(t,e),this.quaternion.multiply(Gs),this}rotateOnWorldAxis(t,e){return Gs.setFromAxisAngle(t,e),this.quaternion.premultiply(Gs),this}rotateX(t){return this.rotateOnAxis(Pd,t)}rotateY(t){return this.rotateOnAxis(Ld,t)}rotateZ(t){return this.rotateOnAxis(kd,t)}translateOnAxis(t,e){return Id.copy(t).applyQuaternion(this.quaternion),this.position.add(Id.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Pd,t)}translateY(t){return this.translateOnAxis(Ld,t)}translateZ(t){return this.translateOnAxis(kd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ho.copy(t):Ho.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ur.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(Ur,Ho,this.up):_i.lookAt(Ho,Ur,this.up),this.quaternion.setFromRotationMatrix(_i),i&&(_i.extractRotation(i.matrixWorld),Gs.setFromRotationMatrix(_i),this.quaternion.premultiply(Gs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?($t("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Nd),Vs.child=t,this.dispatchEvent(Vs),Vs.child=null):$t("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(L0),qc.child=t,this.dispatchEvent(qc),qc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_i.multiply(t.parent.matrixWorld)),t.applyMatrix4(_i),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Nd),Vs.child=t,this.dispatchEvent(Vs),Vs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ur,t,I0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ur,P0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),m=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};pn.DEFAULT_UP=new L(0,1,0);pn.DEFAULT_MATRIX_AUTO_UPDATE=!0;pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var tn=class extends pn{constructor(){super(),this.isGroup=!0,this.type="Group"}},k0={type:"move"},ar=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let f=e.getJointPose(x,n),p=this._getHandJoint(c,x);f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=f.radius),p.visible=f!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&d>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(k0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new tn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Lf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ui={h:0,s:0,l:0},Go={h:0,s:0,l:0};function Yc(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Qt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Pn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=le.workingColorSpace){return this.r=t,this.g=e,this.b=n,le.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=le.workingColorSpace){if(t=Vh(t,1),e=de(e,0,1),n=de(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Yc(o,r,t+1/3),this.g=Yc(o,r,t),this.b=Yc(o,r,t-1/3)}return le.colorSpaceToWorking(this,i),this}setStyle(t,e=Pn){function n(r){r!==void 0&&parseFloat(r)<1&&Vt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Vt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Vt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Pn){let n=Lf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Vt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ti(t.r),this.g=Ti(t.g),this.b=Ti(t.b),this}copyLinearToSRGB(t){return this.r=er(t.r),this.g=er(t.g),this.b=er(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Pn){return le.workingToColorSpace(on.copy(this),t),Math.round(de(on.r*255,0,255))*65536+Math.round(de(on.g*255,0,255))*256+Math.round(de(on.b*255,0,255))}getHexString(t=Pn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.workingToColorSpace(on.copy(this),e);let n=on.r,i=on.g,r=on.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=le.workingColorSpace){return le.workingToColorSpace(on.copy(this),e),t.r=on.r,t.g=on.g,t.b=on.b,t}getStyle(t=Pn){le.workingToColorSpace(on.copy(this),t);let e=on.r,n=on.g,i=on.b;return t!==Pn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Ui),this.setHSL(Ui.h+t,Ui.s+e,Ui.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ui),t.getHSL(Go);let n=Wr(Ui.h,Go.h,e),i=Wr(Ui.s,Go.s,e),r=Wr(Ui.l,Go.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},on=new Qt;Qt.NAMES=Lf;var Zr=class s{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Qt(t),this.near=e,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},lr=class extends pn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},$n=new L,bi=new L,Kc=new L,Mi=new L,Ws=new L,Xs=new L,Dd=new L,Zc=new L,Jc=new L,jc=new L,Qc=new Ae,th=new Ae,eh=new Ae,Hi=class s{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),$n.subVectors(t,e),i.cross($n);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){$n.subVectors(i,e),bi.subVectors(n,e),Kc.subVectors(t,e);let o=$n.dot($n),a=$n.dot(bi),l=$n.dot(Kc),c=bi.dot(bi),h=bi.dot(Kc),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,m=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Mi)===null?!1:Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,Mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Mi.x),l.addScaledVector(o,Mi.y),l.addScaledVector(a,Mi.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return Qc.setScalar(0),th.setScalar(0),eh.setScalar(0),Qc.fromBufferAttribute(t,e),th.fromBufferAttribute(t,n),eh.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Qc,r.x),o.addScaledVector(th,r.y),o.addScaledVector(eh,r.z),o}static isFrontFacing(t,e,n,i){return $n.subVectors(n,e),bi.subVectors(t,e),$n.cross(bi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return $n.subVectors(this.c,this.b),bi.subVectors(this.a,this.b),$n.cross(bi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;Ws.subVectors(i,n),Xs.subVectors(r,n),Zc.subVectors(t,n);let l=Ws.dot(Zc),c=Xs.dot(Zc);if(l<=0&&c<=0)return e.copy(n);Jc.subVectors(t,i);let h=Ws.dot(Jc),u=Xs.dot(Jc);if(h>=0&&u<=h)return e.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ws,o);jc.subVectors(t,r);let m=Ws.dot(jc),g=Xs.dot(jc);if(g>=0&&m<=g)return e.copy(r);let x=m*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Xs,a);let f=h*g-m*u;if(f<=0&&u-h>=0&&m-g>=0)return Dd.subVectors(r,i),a=(u-h)/(u-h+(m-g)),e.copy(i).addScaledVector(Dd,a);let p=1/(f+x+d);return o=x*p,a=d*p,e.copy(n).addScaledVector(Ws,o).addScaledVector(Xs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ai=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(qn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(qn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=qn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,qn):qn.fromBufferAttribute(r,o),qn.applyMatrix4(t.matrixWorld),this.expandByPoint(qn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Vo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Vo.copy(n.boundingBox)),Vo.applyMatrix4(t.matrixWorld),this.union(Vo)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,qn),qn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zr),Wo.subVectors(this.max,zr),$s.subVectors(t.a,zr),qs.subVectors(t.b,zr),Ys.subVectors(t.c,zr),zi.subVectors(qs,$s),Fi.subVectors(Ys,qs),ms.subVectors($s,Ys);let e=[0,-zi.z,zi.y,0,-Fi.z,Fi.y,0,-ms.z,ms.y,zi.z,0,-zi.x,Fi.z,0,-Fi.x,ms.z,0,-ms.x,-zi.y,zi.x,0,-Fi.y,Fi.x,0,-ms.y,ms.x,0];return!nh(e,$s,qs,Ys,Wo)||(e=[1,0,0,0,1,0,0,0,1],!nh(e,$s,qs,Ys,Wo))?!1:(Xo.crossVectors(zi,Fi),e=[Xo.x,Xo.y,Xo.z],nh(e,$s,qs,Ys,Wo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,qn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(qn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Si),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Si=[new L,new L,new L,new L,new L,new L,new L,new L],qn=new L,Vo=new ai,$s=new L,qs=new L,Ys=new L,zi=new L,Fi=new L,ms=new L,zr=new L,Wo=new L,Xo=new L,gs=new L;function nh(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){gs.fromArray(s,r);let a=i.x*Math.abs(gs.x)+i.y*Math.abs(gs.y)+i.z*Math.abs(gs.z),l=t.dot(gs),c=e.dot(gs),h=n.dot(gs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var $e=new L,$o=new Zt,N0=0,Ln=class extends oi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:N0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Af,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)$o.fromBufferAttribute(this,e),$o.applyMatrix3(t),this.setXY(e,$o.x,$o.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix3(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix4(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyNormalMatrix(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.transformDirection(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=tr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=dn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=tr(e,this.array)),e}setX(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=tr(e,this.array)),e}setY(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=tr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=tr(e,this.array)),e}setW(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=dn(e,this.array),n=dn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=dn(e,this.array),n=dn(n,this.array),i=dn(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=dn(e,this.array),n=dn(n,this.array),i=dn(i,this.array),r=dn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Jr=class extends Ln{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var jr=class extends Ln{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var fe=class extends Ln{constructor(t,e,n){super(new Float32Array(t),e,n)}},D0=new ai,Fr=new L,ih=new L,li=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):D0.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fr.subVectors(t,this.center);let e=Fr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Fr,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ih.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fr.copy(t.center).add(ih)),this.expandByPoint(Fr.copy(t.center).sub(ih))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},O0=0,zn=new ae,sh=new pn,Ks=new L,In=new ai,Br=new ai,Qe=new L,Ye=class s extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:O0++}),this.uuid=xr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(o0(t)?jr:Jr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return zn.makeRotationFromQuaternion(t),this.applyMatrix4(zn),this}rotateX(t){return zn.makeRotationX(t),this.applyMatrix4(zn),this}rotateY(t){return zn.makeRotationY(t),this.applyMatrix4(zn),this}rotateZ(t){return zn.makeRotationZ(t),this.applyMatrix4(zn),this}translate(t,e,n){return zn.makeTranslation(t,e,n),this.applyMatrix4(zn),this}scale(t,e,n){return zn.makeScale(t,e,n),this.applyMatrix4(zn),this}lookAt(t){return sh.lookAt(t),sh.updateMatrix(),this.applyMatrix4(sh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ks).negate(),this.translate(Ks.x,Ks.y,Ks.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new fe(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Vt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){$t("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];In.setFromBufferAttribute(r),this.morphTargetsRelative?(Qe.addVectors(this.boundingBox.min,In.min),this.boundingBox.expandByPoint(Qe),Qe.addVectors(this.boundingBox.max,In.max),this.boundingBox.expandByPoint(Qe)):(this.boundingBox.expandByPoint(In.min),this.boundingBox.expandByPoint(In.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$t('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new li);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){$t("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(In.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Br.setFromBufferAttribute(a),this.morphTargetsRelative?(Qe.addVectors(In.min,Br.min),In.expandByPoint(Qe),Qe.addVectors(In.max,Br.max),In.expandByPoint(Qe)):(In.expandByPoint(Br.min),In.expandByPoint(Br.max))}In.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Qe.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Qe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Qe.fromBufferAttribute(a,c),l&&(Ks.fromBufferAttribute(t,c),Qe.add(Ks)),i=Math.max(i,n.distanceToSquared(Qe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&$t('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){$t("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Ln(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let v=0;v<n.count;v++)a[v]=new L,l[v]=new L;let c=new L,h=new L,u=new L,d=new Zt,m=new Zt,g=new Zt,x=new L,f=new L;function p(v,A,R){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,A),u.fromBufferAttribute(n,R),d.fromBufferAttribute(r,v),m.fromBufferAttribute(r,A),g.fromBufferAttribute(r,R),h.sub(c),u.sub(c),m.sub(d),g.sub(d);let P=1/(m.x*g.y-g.x*m.y);isFinite(P)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(P),f.copy(u).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(P),a[v].add(x),a[A].add(x),a[R].add(x),l[v].add(f),l[A].add(f),l[R].add(f))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let v=0,A=y.length;v<A;++v){let R=y[v],P=R.start,N=R.count;for(let z=P,k=P+N;z<k;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}let _=new L,b=new L,M=new L,S=new L;function T(v){M.fromBufferAttribute(i,v),S.copy(M);let A=a[v];_.copy(A),_.sub(M.multiplyScalar(M.dot(A))).normalize(),b.crossVectors(S,A);let P=b.dot(l[v])<0?-1:1;o.setXYZW(v,_.x,_.y,_.z,P)}for(let v=0,A=y.length;v<A;++v){let R=y[v],P=R.start,N=R.count;for(let z=P,k=P+N;z<k;z+=3)T(t.getX(z+0)),T(t.getX(z+1)),T(t.getX(z+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Ln(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);let i=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(t)for(let d=0,m=t.count;d<m;d+=3){let g=t.getX(d+0),x=t.getX(d+1),f=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,f),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,f),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let d=0,m=e.count;d<m;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Qe.fromBufferAttribute(t,e),Qe.normalize(),t.setXYZ(e,Qe.x,Qe.y,Qe.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),m=0,g=0;for(let x=0,f=l.length;x<f;x++){a.isInterleavedBufferAttribute?m=l[x]*a.data.stride+a.offset:m=l[x]*h;for(let p=0;p<h;p++)d[g++]=c[m++]}return new Ln(d,h,u)}if(this.index===null)return Vt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],m=t(d,n);l.push(m)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let m=c[u];h.push(m.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var rh=new L,U0=new L,z0=new Xt,Yn=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=rh.subVectors(n,e).cross(U0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(rh),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||z0.getNormalMatrix(t),i=this.coplanarPoint(rh).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},F0=0,bs=class extends oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:F0++}),this.uuid=xr(),this.name="",this.type="Material",this.blending=pr,this.side=ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mh,this.blendDst=Sh,this.blendEquation=Ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=nr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_f,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=aa,this.stencilZFail=aa,this.stencilZPass=aa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Vt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Vt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Qt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Yn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Zt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Zt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var wi=new L,oh=new L,qo=new L,Yo=new L,ba=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=wi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(wi.copy(this.origin).addScaledVector(this.direction,e),wi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){oh.copy(t).add(e).multiplyScalar(.5),qo.copy(e).sub(t).normalize(),Yo.copy(this.origin).sub(oh);let r=t.distanceTo(e)*.5,o=-this.direction.dot(qo),a=Yo.dot(this.direction),l=-Yo.dot(qo),c=Yo.lengthSq(),h=Math.abs(1-o*o),u,d,m,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,m=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),m=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(oh).addScaledVector(qo,d),m}intersectSphere(t,e){if(t.radius<0)return null;wi.subVectors(t.center,this.origin);let n=wi.dot(this.direction),i=wi.dot(wi)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,wi)!==null}intersectTriangle(t,e,n,i,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=t.x-o.x,d=t.y-o.y,m=t.z-o.z,g=e.x-o.x,x=e.y-o.y,f=e.z-o.z,p=n.x-o.x,y=n.y-o.y,_=n.z-o.z,b=Math.abs(l),M=Math.abs(c),S=Math.abs(h),T,v,A,R,P,N,z,k,F,$,Y,st;if(b>=M&&b>=S?(A=l,N=u,F=g,st=p,l>=0?(T=c,v=h,R=d,P=m,z=x,k=f,$=y,Y=_):(T=h,v=c,R=m,P=d,z=f,k=x,$=_,Y=y)):M>=S?(A=c,N=d,F=x,st=y,c>=0?(T=h,v=l,R=m,P=u,z=f,k=g,$=_,Y=p):(T=l,v=h,R=u,P=m,z=g,k=f,$=p,Y=_)):(A=h,N=m,F=f,st=_,h>=0?(T=l,v=c,R=u,P=d,z=g,k=x,$=p,Y=y):(T=c,v=l,R=d,P=u,z=x,k=g,$=y,Y=p)),A===0)return null;let K=T/A,tt=v/A,q=1/A,mt=R-K*N,wt=P-tt*N,at=z-K*F,nt=k-tt*F,zt=$-K*st,V=Y-tt*st,J=zt*nt-V*at,ut=mt*V-wt*zt,Rt=at*wt-nt*mt;if(i){if(J<0||ut<0||Rt<0)return null}else if((J<0||ut<0||Rt<0)&&(J>0||ut>0||Rt>0))return null;let ct=J+ut+Rt;if(ct===0)return null;let Ft=q*(J*N+ut*F+Rt*st);return(ct>0?Ft<0:Ft>0)?null:this.at(Ft/ct,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ms=class extends bs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=wh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Od=new ae,xs=new ba,Ko=new li,Ud=new L,Zo=new L,Jo=new L,jo=new L,ah=new L,Qo=new L,zd=new L,ta=new L,se=class extends pn{constructor(t=new Ye,e=new Ms){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){Qo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(ah.fromBufferAttribute(u,t),o?Qo.addScaledVector(ah,h):Qo.addScaledVector(ah.sub(e),h))}e.add(Qo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ko.copy(n.boundingSphere),Ko.applyMatrix4(r),xs.copy(t.ray).recast(t.near),!(Ko.containsPoint(xs.origin)===!1&&(xs.intersectSphere(Ko,Ud)===null||xs.origin.distanceToSquared(Ud)>(t.far-t.near)**2))&&(Od.copy(r).invert(),xs.copy(t.ray).applyMatrix4(Od),!(n.boundingBox!==null&&xs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,xs)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let f=d[g],p=o[f.materialIndex],y=Math.max(f.start,m.start),_=Math.min(a.count,Math.min(f.start+f.count,m.start+m.count));for(let b=y,M=_;b<M;b+=3){let S=a.getX(b),T=a.getX(b+1),v=a.getX(b+2);i=ea(this,p,t,n,c,h,u,S,T,v),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=f.materialIndex,e.push(i))}}else{let g=Math.max(0,m.start),x=Math.min(a.count,m.start+m.count);for(let f=g,p=x;f<p;f+=3){let y=a.getX(f),_=a.getX(f+1),b=a.getX(f+2);i=ea(this,o,t,n,c,h,u,y,_,b),i&&(i.faceIndex=Math.floor(f/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let f=d[g],p=o[f.materialIndex],y=Math.max(f.start,m.start),_=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let b=y,M=_;b<M;b+=3){let S=b,T=b+1,v=b+2;i=ea(this,p,t,n,c,h,u,S,T,v),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=f.materialIndex,e.push(i))}}else{let g=Math.max(0,m.start),x=Math.min(l.count,m.start+m.count);for(let f=g,p=x;f<p;f+=3){let y=f,_=f+1,b=f+2;i=ea(this,o,t,n,c,h,u,y,_,b),i&&(i.faceIndex=Math.floor(f/3),e.push(i))}}}};function B0(s,t,e,n,i,r,o,a){let l;if(t.side===en?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===ci,a),l===null)return null;ta.copy(a),ta.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(ta);return c<e.near||c>e.far?null:{distance:c,point:ta.clone(),object:s}}function ea(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,Zo),s.getVertexPosition(l,Jo),s.getVertexPosition(c,jo);let h=B0(s,t,e,n,Zo,Jo,jo,zd);if(h){let u=new L;Hi.getBarycoord(zd,Zo,Jo,jo,u),i&&(h.uv=Hi.getInterpolatedAttribute(i,a,l,c,u,new Zt)),r&&(h.uv1=Hi.getInterpolatedAttribute(r,a,l,c,u,new Zt)),o&&(h.normal=Hi.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new L,materialIndex:0};Hi.getNormal(Zo,Jo,jo,d.normal),h.face=d,h.barycoord=u}return h}var Ss=class extends fn{constructor(t=null,e=1,n=1,i,r,o,a,l,c=Ge,h=Ge,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var bn=class extends Ln{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Zs=new ae,Fd=new ae,na=[],Bd=new ai,H0=new ae,Hr=new se,Gr=new li,cr=class extends se{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new bn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,H0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ai),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Zs),Bd.copy(t.boundingBox).applyMatrix4(Zs),this.boundingBox.union(Bd)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new li),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Zs),Gr.copy(t.boundingSphere).applyMatrix4(Zs),this.boundingSphere.union(Gr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(Hr.geometry=this.geometry,Hr.material=this.material,Hr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gr.copy(this.boundingSphere),Gr.applyMatrix4(n),t.ray.intersectsSphere(Gr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Zs),Fd.multiplyMatrices(n,Zs),Hr.matrixWorld=Fd,Hr.raycast(t,na);for(let o=0,a=na.length;o<a;o++){let l=na[o];l.instanceId=r,l.object=this,e.push(l)}na.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new bn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ss(new Float32Array(i*this.count),i,this.count,$a,Sn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ys=new li,G0=new Zt(.5,.5),ia=new L,hr=class{constructor(t=new Yn,e=new Yn,n=new Yn,i=new Yn,r=new Yn,o=new Yn){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Kn,n=!1){let i=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],m=r[7],g=r[8],x=r[9],f=r[10],p=r[11],y=r[12],_=r[13],b=r[14],M=r[15];if(i[0].setComponents(c-o,m-h,p-g,M-y).normalize(),i[1].setComponents(c+o,m+h,p+g,M+y).normalize(),i[2].setComponents(c+a,m+u,p+x,M+_).normalize(),i[3].setComponents(c-a,m-u,p-x,M-_).normalize(),n)i[4].setComponents(l,d,f,b).normalize(),i[5].setComponents(c-l,m-d,p-f,M-b).normalize();else if(i[4].setComponents(c-l,m-d,p-f,M-b).normalize(),e===Kn)i[5].setComponents(c+l,m+d,p+f,M+b).normalize();else if(e===ir)i[5].setComponents(l,d,f,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ys.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ys.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ys)}intersectsSprite(t){ys.center.set(0,0,0);let e=G0.distanceTo(t.center);return ys.radius=.7071067811865476+e,ys.applyMatrix4(t.matrixWorld),this.intersectsSphere(ys)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(ia.x=i.normal.x>0?t.max.x:t.min.x,ia.y=i.normal.y>0?t.max.y:t.min.y,ia.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ia)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Qr=class extends fn{constructor(t=[],e=Ji,n,i,r,o,a,l,c,h){super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ur=class extends fn{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Gi=class extends fn{constructor(t,e,n=Jn,i,r,o,a=Ge,l=Ge,c,h=ri,u=1){if(h!==ri&&h!==Qi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new or(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ma=class extends Gi{constructor(t,e=Jn,n=Ji,i,r,o=Ge,a=Ge,l,c=ri){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,i,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},to=class extends fn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Vi=class s extends Ye{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,m=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new fe(c,3)),this.setAttribute("normal",new fe(h,3)),this.setAttribute("uv",new fe(u,2));function g(x,f,p,y,_,b,M,S,T,v,A){let R=b/T,P=M/v,N=b/2,z=M/2,k=S/2,F=T+1,$=v+1,Y=0,st=0,K=new L;for(let tt=0;tt<$;tt++){let q=tt*P-z;for(let mt=0;mt<F;mt++){let wt=mt*R-N;K[x]=wt*y,K[f]=q*_,K[p]=k,c.push(K.x,K.y,K.z),K[x]=0,K[f]=0,K[p]=S>0?1:-1,h.push(K.x,K.y,K.z),u.push(mt/T),u.push(1-tt/v),Y+=1}}for(let tt=0;tt<v;tt++)for(let q=0;q<T;q++){let mt=d+q+F*tt,wt=d+q+F*(tt+1),at=d+(q+1)+F*(tt+1),nt=d+(q+1)+F*tt;l.push(mt,wt,nt),l.push(wt,at,nt),st+=6}a.addGroup(m,st,A),m+=st,d+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Wi=class s extends Ye{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],m=[],g=0,x=[],f=n/2,p=0;y(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new fe(u,3)),this.setAttribute("normal",new fe(d,3)),this.setAttribute("uv",new fe(m,2));function y(){let b=new L,M=new L,S=0,T=(e-t)/n;for(let v=0;v<=r;v++){let A=[],R=v/r,P=R*(e-t)+t;for(let N=0;N<=i;N++){let z=N/i,k=z*l+a,F=Math.sin(k),$=Math.cos(k);M.x=P*F,M.y=-R*n+f,M.z=P*$,u.push(M.x,M.y,M.z),b.set(F,T,$).normalize(),d.push(b.x,b.y,b.z),m.push(z,1-R),A.push(g++)}x.push(A)}for(let v=0;v<i;v++)for(let A=0;A<r;A++){let R=x[A][v],P=x[A+1][v],N=x[A+1][v+1],z=x[A][v+1];(t>0||A!==0)&&(h.push(R,P,z),S+=3),(e>0||A!==r-1)&&(h.push(P,N,z),S+=3)}c.addGroup(p,S,0),p+=S}function _(b){let M=g,S=new Zt,T=new L,v=0,A=b===!0?t:e,R=b===!0?1:-1;for(let N=1;N<=i;N++)u.push(0,f*R,0),d.push(0,R,0),m.push(.5,.5),g++;let P=g;for(let N=0;N<=i;N++){let k=N/i*l+a,F=Math.cos(k),$=Math.sin(k);T.x=A*$,T.y=f*R,T.z=A*F,u.push(T.x,T.y,T.z),d.push(0,R,0),S.x=F*.5+.5,S.y=$*.5*R+.5,m.push(S.x,S.y),g++}for(let N=0;N<i;N++){let z=M+N,k=P+N;b===!0?h.push(k,k+1,z):h.push(k+1,k,z),v+=3}c.addGroup(p,v,b===!0?1:2),p+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ei=class s extends Wi{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},eo=class s extends Ye{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new fe(r,3)),this.setAttribute("normal",new fe(r.slice(),3)),this.setAttribute("uv",new fe(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){let _=new L,b=new L,M=new L;for(let S=0;S<e.length;S+=3)m(e[S+0],_),m(e[S+1],b),m(e[S+2],M),l(_,b,M,y)}function l(y,_,b,M){let S=M+1,T=[];for(let v=0;v<=S;v++){T[v]=[];let A=y.clone().lerp(b,v/S),R=_.clone().lerp(b,v/S),P=S-v;for(let N=0;N<=P;N++)N===0&&v===S?T[v][N]=A:T[v][N]=A.clone().lerp(R,N/P)}for(let v=0;v<S;v++)for(let A=0;A<2*(S-v)-1;A++){let R=Math.floor(A/2);A%2===0?(d(T[v][R+1]),d(T[v+1][R]),d(T[v][R])):(d(T[v][R+1]),d(T[v+1][R+1]),d(T[v+1][R]))}}function c(y){let _=new L;for(let b=0;b<r.length;b+=3)_.x=r[b+0],_.y=r[b+1],_.z=r[b+2],_.normalize().multiplyScalar(y),r[b+0]=_.x,r[b+1]=_.y,r[b+2]=_.z}function h(){let y=new L;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];let b=f(y)/2/Math.PI+.5,M=p(y)/Math.PI+.5;o.push(b,1-M)}g(),u()}function u(){for(let y=0;y<o.length;y+=6){let _=o[y+0],b=o[y+2],M=o[y+4],S=Math.max(_,b,M),T=Math.min(_,b,M);S>.9&&T<.1&&(_<.2&&(o[y+0]+=1),b<.2&&(o[y+2]+=1),M<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function m(y,_){let b=y*3;_.x=t[b+0],_.y=t[b+1],_.z=t[b+2]}function g(){let y=new L,_=new L,b=new L,M=new L,S=new Zt,T=new Zt,v=new Zt;for(let A=0,R=0;A<r.length;A+=9,R+=6){y.set(r[A+0],r[A+1],r[A+2]),_.set(r[A+3],r[A+4],r[A+5]),b.set(r[A+6],r[A+7],r[A+8]),S.set(o[R+0],o[R+1]),T.set(o[R+2],o[R+3]),v.set(o[R+4],o[R+5]),M.copy(y).add(_).add(b).divideScalar(3);let P=f(M);x(S,R+0,y,P),x(T,R+2,_,P),x(v,R+4,b,P)}}function x(y,_,b,M){M<0&&y.x===1&&(o[_]=y.x-1),b.x===0&&b.z===0&&(o[_]=M/2/Math.PI+.5)}function f(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.detail)}};var Xi=class s extends eo{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var kn=class s extends Ye{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,m=[],g=[],x=[],f=[];for(let p=0;p<h;p++){let y=p*d-o;for(let _=0;_<c;_++){let b=_*u-r;g.push(b,-y,0),x.push(0,0,1),f.push(_/a),f.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){let _=y+c*p,b=y+c*(p+1),M=y+1+c*(p+1),S=y+1+c*p;m.push(_,b,S),m.push(b,M,S)}this.setIndex(m),this.setAttribute("position",new fe(g,3)),this.setAttribute("normal",new fe(x,3)),this.setAttribute("uv",new fe(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},$i=class s extends Ye{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],h=[],u=t,d=(e-t)/i,m=new L,g=new Zt;for(let x=0;x<=i;x++){for(let f=0;f<=n;f++){let p=r+f/n*o;m.x=u*Math.cos(p),m.y=u*Math.sin(p),l.push(m.x,m.y,m.z),c.push(0,0,1),g.x=(m.x/e+1)/2,g.y=(m.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<i;x++){let f=x*(n+1);for(let p=0;p<n;p++){let y=p+f,_=y,b=y+n+1,M=y+n+2,S=y+1;a.push(_,b,S),a.push(b,M,S)}}this.setIndex(a),this.setAttribute("position",new fe(l,3)),this.setAttribute("normal",new fe(c,3)),this.setAttribute("uv",new fe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var ws=class s extends Ye{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new L,d=new L,m=[],g=[],x=[],f=[];for(let p=0;p<=n;p++){let y=[],_=p/n,b=o+_*a,M=t*Math.cos(b),S=Math.sqrt(t*t-M*M),T=0;p===0&&o===0?T=.5/e:p===n&&l===Math.PI&&(T=-.5/e);for(let v=0;v<=e;v++){let A=v/e,R=i+A*r;u.x=-S*Math.cos(R),u.y=M,u.z=S*Math.sin(R),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),f.push(A+T,1-_),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){let _=h[p][y+1],b=h[p][y],M=h[p+1][y],S=h[p+1][y+1];(p!==0||o>0)&&m.push(_,b,S),(p!==n-1||l<Math.PI)&&m.push(b,M,S)}this.setIndex(m),this.setAttribute("position",new fe(g,3)),this.setAttribute("normal",new fe(x,3)),this.setAttribute("uv",new fe(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},no=class s extends eo{constructor(t=1,e=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};function As(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];if(Hd(i))i.isRenderTargetTexture?(Vt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(Hd(i[0])){let r=[];for(let o=0,a=i.length;o<a;o++)r[o]=i[o].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function cn(s){let t={};for(let e=0;e<s.length;e++){let n=As(s[e]);for(let i in n)t[i]=n[i]}return t}function Hd(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function V0(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Wh(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:le.workingColorSpace}var xo={clone:As,merge:cn},W0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,X0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Be=class extends bs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=W0,this.fragmentShader=X0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=As(t.uniforms),this.uniformsGroups=V0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new Qt().setHex(i.value);break;case"v2":this.uniforms[n].value=new Zt().fromArray(i.value);break;case"v3":this.uniforms[n].value=new L().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Ae().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Xt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new ae().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Sa=class extends Be{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var wa=class extends bs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ta=class extends bs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Js(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function lh(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var qi=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ea=class extends qi{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:uh,endingEnd:uh}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case dh:r=t,a=2*e-n;break;case fh:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case dh:o=t,l=2*n-e;break;case fh:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,m=this._weightNext,g=(n-e)/(i-e),x=g*g,f=x*g,p=-d*f+2*d*x-d*g,y=(1+d)*f+(-1.5-2*d)*x+(-.5+d)*g+1,_=(-1-m)*f+(1.5+m)*x+.5*g,b=m*f-m*x;for(let M=0;M!==a;++M)r[M]=p*o[h+M]+y*o[c+M]+_*o[l+M]+b*o[u+M];return r}},Aa=class extends qi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},Ra=class extends qi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Ca=class extends qi{interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(n-e)/(i-e),x=1-g;for(let f=0;f!==a;++f)r[f]=o[c+f]*x+o[l+f]*g;return r}let d=a*2,m=t-1;for(let g=0;g!==a;++g){let x=o[c+g],f=o[l+g],p=m*d+g*2,y=u[p],_=u[p+1],b=t*d+g*2,M=h[b],S=h[b+1],T=q0(n,e,y,M,i);r[g]=kf(T,x,_,S,f)}return r}};function kf(s,t,e,n,i){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function $0(s,t,e,n,i){let r=1-s;return 3*r*r*(e-t)+6*r*s*(n-e)+3*s*s*(i-n)}function q0(s,t,e,n,i){let r=(s-t)/(i-t);for(let o=0;o<8;o++){let a=kf(r,t,e,n,i)-s;if(Math.abs(a)<1e-10)break;let l=$0(r,t,e,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var Nn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Js(e,this.TimeBufferType),this.values=Js(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Js(t.times,Array),values:Js(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),lh(t.settings)&&(n.settings={inTangents:Js(t.settings.inTangents,Array),outTangents:Js(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ra(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Aa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ea(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ca(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Xr:e=this.InterpolantFactoryMethodDiscrete;break;case xa:e=this.InterpolantFactoryMethodLinear;break;case oa:e=this.InterpolantFactoryMethodSmooth;break;case hh:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Vt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Xr;case this.InterpolantFactoryMethodLinear:return xa;case this.InterpolantFactoryMethodSmooth:return oa;case this.InterpolantFactoryMethodBezier:return hh}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;lh(this.settings)&&(Gd(this.settings.inTangents,t),Gd(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&($t("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&($t("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){$t("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){$t("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&a0(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){$t("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===oa,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let u=a*n,d=u-n,m=u+n;for(let g=0;g!==n;++g){let x=e[u+g];if(x!==e[d+g]||x!==e[m+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let m=0;m!==n;++m)e[d+m]=e[u+m]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,lh(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Gd(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]*=t}Nn.prototype.ValueTypeName="";Nn.prototype.TimeBufferType=Float32Array;Nn.prototype.ValueBufferType=Float32Array;Nn.prototype.DefaultInterpolation=xa;var Yi=class extends Nn{constructor(t,e,n){super(t,e,n)}};Yi.prototype.ValueTypeName="bool";Yi.prototype.ValueBufferType=Array;Yi.prototype.DefaultInterpolation=Xr;Yi.prototype.InterpolantFactoryMethodLinear=void 0;Yi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ia=class extends Nn{constructor(t,e,n,i){super(t,e,n,i)}};Ia.prototype.ValueTypeName="color";var Pa=class extends Nn{constructor(t,e,n,i){super(t,e,n,i)}};Pa.prototype.ValueTypeName="number";var La=class extends qi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)Ue.slerpFlat(r,0,o,c-a,o,c,l);return r}},io=class extends Nn{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new La(this.times,this.values,this.getValueSize(),t)}};io.prototype.ValueTypeName="quaternion";io.prototype.InterpolantFactoryMethodSmooth=void 0;var Ki=class extends Nn{constructor(t,e,n){super(t,e,n)}};Ki.prototype.ValueTypeName="string";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=Xr;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var ka=class extends Nn{constructor(t,e,n,i){super(t,e,n,i)}};ka.prototype.ValueTypeName="vector";var Na=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let m=c[u],g=c[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Nf=new Na,Da=class{constructor(t){this.manager=t!==void 0?t:Nf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Da.DEFAULT_MATERIAL_NAME="__DEFAULT";var Oa=class extends pn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var ch=new ae,Vd=new L,Wd=new L,Ua=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Zt(512,512),this.mapType=Mn,this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hr,this._frameExtents=new Zt(1,1),this._viewportCount=1,this._viewports=[new Ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Vd.setFromMatrixPosition(t.matrixWorld),e.position.copy(Vd),Wd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Wd),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){ch.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(ch,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=i?i.z/r.x:1,a=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;t.coordinateSystem===ir||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(ch)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},sa=new L,ra=new Ue,ii=new L,so=class extends pn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=Kn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(sa,ra,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sa,ra,ii.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(sa,ra,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sa,ra,ii.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Bi=new L,Xd=new Zt,$d=new Zt,an=class extends so{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=rr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Vr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return rr*2*Math.atan(Math.tan(Vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Bi.x,Bi.y).multiplyScalar(-t/Bi.z),Bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bi.x,Bi.y).multiplyScalar(-t/Bi.z)}getViewSize(t,e){return this.getViewBounds(t,Xd,$d),e.subVectors($d,Xd)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Vr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Zi=class extends so{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ph=class extends Ua{constructor(){super(new Zi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ro=class extends Oa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.target=new pn,this.shadow=new ph}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var oo=class extends Ye{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var js=-90,Qs=1,dr=class extends pn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new an(js,Qs,t,e);i.layers=this.layers,this.add(i);let r=new an(js,Qs,t,e);r.layers=this.layers,this.add(r);let o=new an(js,Qs,t,e);o.layers=this.layers,this.add(o);let a=new an(js,Qs,t,e);a.layers=this.layers,this.add(a);let l=new an(js,Qs,t,e);l.layers=this.layers,this.add(l);let c=new an(js,Qs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Kn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let f=!1;t.isWebGLRenderer===!0?f=t.state.buffers.depth.getReversed():f=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,i),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,i),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},za=class extends an{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Xh="\\[\\]\\.:\\/",Y0=new RegExp("["+Xh+"]","g"),$h="[^"+Xh+"]",K0="[^"+Xh.replace("\\.","")+"]",Z0=/((?:WC+[\/:])*)/.source.replace("WC",$h),J0=/(WCOD+)?/.source.replace("WCOD",K0),j0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$h),Q0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$h),tg=new RegExp("^"+Z0+J0+j0+Q0+"$"),eg=["material","materials","bones","map"],mh=class{constructor(t,e,n){let i=n||Ne.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ne=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Y0,"")}static parseTrackName(t){let e=tg.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);eg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Vt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){$t("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){$t("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){$t("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){$t("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){$t("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){$t("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){$t("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;$t("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){$t("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){$t("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ne.Composite=mh;Ne.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ne.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ne.prototype.GetterByBindingType=[Ne.prototype._getValue_direct,Ne.prototype._getValue_array,Ne.prototype._getValue_arrayElement,Ne.prototype._getValue_toArray];Ne.prototype.SetterByBindingTypeAndVersioning=[[Ne.prototype._setValue_direct,Ne.prototype._setValue_direct_setNeedsUpdate,Ne.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ne.prototype._setValue_array,Ne.prototype._setValue_array_setNeedsUpdate,Ne.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ne.prototype._setValue_arrayElement,Ne.prototype._setValue_arrayElement_setNeedsUpdate,Ne.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ne.prototype._setValue_fromArray,Ne.prototype._setValue_fromArray_setNeedsUpdate,Ne.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var F1=new Float32Array(1);var jh=class jh{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}};jh.prototype.isMatrix2=!0;var gh=jh;function qh(s,t,e,n){let i=ng(n);switch(e){case Uh:return s*t;case $a:return s*t/i.components*i.byteLength;case qa:return s*t/i.components*i.byteLength;case ts:return s*t*2/i.components*i.byteLength;case Ya:return s*t*2/i.components*i.byteLength;case zh:return s*t*3/i.components*i.byteLength;case wn:return s*t*4/i.components*i.byteLength;case Ka:return s*t*4/i.components*i.byteLength;case ho:case uo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case fo:case po:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ja:case Qa:return Math.max(s,16)*Math.max(t,8)/4;case Za:case ja:return Math.max(s,8)*Math.max(t,8)/2;case tl:case el:case il:case sl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case nl:case mo:case rl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ol:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case al:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case ll:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case cl:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case hl:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case ul:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case dl:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case fl:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case pl:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case ml:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case gl:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case xl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case yl:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case vl:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case _l:case bl:case Ml:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Sl:case wl:return Math.ceil(s/4)*Math.ceil(t/4)*8;case go:case Tl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ng(s){switch(s){case Mn:case kh:return{byteLength:1,components:1};case mr:case Nh:case jn:return{byteLength:2,components:1};case Wa:case Xa:return{byteLength:2,components:4};case Jn:case Va:case Sn:return{byteLength:4,components:1};case Dh:case Oh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Vt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function np(){let s=null,t=!1,e=null,n=null;function i(r,o){n=s.requestAnimationFrame(i),e(r,o)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function sg(s){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let m;if(c instanceof Float32Array)m=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=s.HALF_FLOAT:m=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=s.SHORT;else if(c instanceof Uint32Array)m=s.UNSIGNED_INT;else if(c instanceof Int32Array)m=s.INT;else if(c instanceof Int8Array)m=s.BYTE;else if(c instanceof Uint8Array)m=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((m,g)=>m.start-g.start);let d=0;for(let m=1;m<u.length;m++){let g=u[d],x=u[m];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let m=0,g=u.length;m<g;m++){let x=u[m];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var rg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,og=`#ifdef USE_ALPHAHASH
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
#endif`,ag=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ug=`#ifdef USE_AOMAP
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
#endif`,dg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fg=`#ifdef USE_BATCHING
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
#endif`,pg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,yg=`#ifdef USE_IRIDESCENCE
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
#endif`,vg=`#ifdef USE_BUMPMAP
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
#endif`,_g=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,bg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Tg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Eg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ag=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Rg=`#define PI 3.141592653589793
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
} // validated`,Cg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ig=`vec3 transformedNormal = objectNormal;
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
#endif`,Pg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ng=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Og=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ug=`#ifdef USE_ENVMAP
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
#endif`,zg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Fg=`#ifdef USE_ENVMAP
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
#endif`,Bg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hg=`#ifdef USE_ENVMAP
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
#endif`,Gg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$g=`#ifdef USE_GRADIENTMAP
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
}`,qg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Jg=`#ifdef USE_ENVMAP
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
#endif`,jg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ex=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,nx=`PhysicalMaterial material;
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
#endif`,ix=`uniform sampler2D dfgLUT;
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
}`,sx=`
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
#endif`,rx=`#if defined( RE_IndirectDiffuse )
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
#endif`,ox=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ax=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,lx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ux=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,dx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,px=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,mx=`#if defined( USE_POINTS_UV )
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
#endif`,gx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_x=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bx=`#ifdef USE_MORPHTARGETS
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
#endif`,Mx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,wx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Tx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ex=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ax=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Rx=`#ifdef USE_NORMALMAP
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
#endif`,Cx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ix=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Px=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Dx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ox=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ux=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Wx=`float getShadowMask() {
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
}`,Xx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$x=`#ifdef USE_SKINNING
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
#endif`,qx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yx=`#ifdef USE_SKINNING
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
#endif`,Kx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Jx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qx=`#ifdef USE_TRANSMISSION
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
#endif`,ty=`#ifdef USE_TRANSMISSION
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
#endif`,ey=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ny=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,iy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ry=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,oy=`uniform sampler2D t2D;
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
}`,ay=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ly=`#ifdef ENVMAP_TYPE_CUBE
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
}`,cy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uy=`#include <common>
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
}`,dy=`#if DEPTH_PACKING == 3200
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
}`,fy=`#define DISTANCE
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
}`,py=`#define DISTANCE
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
}`,my=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xy=`uniform float scale;
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
}`,yy=`uniform vec3 diffuse;
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
}`,vy=`#include <common>
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
}`,_y=`uniform vec3 diffuse;
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
}`,by=`#define LAMBERT
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
}`,My=`#define LAMBERT
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
}`,Sy=`#define MATCAP
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
}`,wy=`#define MATCAP
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
}`,Ty=`#define NORMAL
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
}`,Ey=`#define NORMAL
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
}`,Ay=`#define PHONG
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
}`,Ry=`#define PHONG
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
}`,Cy=`#define STANDARD
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
}`,Iy=`#define STANDARD
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
}`,Py=`#define TOON
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
}`,Ly=`#define TOON
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
}`,ky=`uniform float size;
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
}`,Ny=`uniform vec3 diffuse;
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
}`,Dy=`#include <common>
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
}`,Oy=`uniform vec3 color;
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
}`,Uy=`uniform float rotation;
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
}`,zy=`uniform vec3 diffuse;
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
}`,re={alphahash_fragment:rg,alphahash_pars_fragment:og,alphamap_fragment:ag,alphamap_pars_fragment:lg,alphatest_fragment:cg,alphatest_pars_fragment:hg,aomap_fragment:ug,aomap_pars_fragment:dg,batching_pars_vertex:fg,batching_vertex:pg,begin_vertex:mg,beginnormal_vertex:gg,bsdfs:xg,iridescence_fragment:yg,bumpmap_pars_fragment:vg,clipping_planes_fragment:_g,clipping_planes_pars_fragment:bg,clipping_planes_pars_vertex:Mg,clipping_planes_vertex:Sg,color_fragment:wg,color_pars_fragment:Tg,color_pars_vertex:Eg,color_vertex:Ag,common:Rg,cube_uv_reflection_fragment:Cg,defaultnormal_vertex:Ig,displacementmap_pars_vertex:Pg,displacementmap_vertex:Lg,emissivemap_fragment:kg,emissivemap_pars_fragment:Ng,colorspace_fragment:Dg,colorspace_pars_fragment:Og,envmap_fragment:Ug,envmap_common_pars_fragment:zg,envmap_pars_fragment:Fg,envmap_pars_vertex:Bg,envmap_physical_pars_fragment:Jg,envmap_vertex:Hg,fog_vertex:Gg,fog_pars_vertex:Vg,fog_fragment:Wg,fog_pars_fragment:Xg,gradientmap_pars_fragment:$g,lightmap_pars_fragment:qg,lights_lambert_fragment:Yg,lights_lambert_pars_fragment:Kg,lights_pars_begin:Zg,lights_toon_fragment:jg,lights_toon_pars_fragment:Qg,lights_phong_fragment:tx,lights_phong_pars_fragment:ex,lights_physical_fragment:nx,lights_physical_pars_fragment:ix,lights_fragment_begin:sx,lights_fragment_maps:rx,lights_fragment_end:ox,lightprobes_pars_fragment:ax,logdepthbuf_fragment:lx,logdepthbuf_pars_fragment:cx,logdepthbuf_pars_vertex:hx,logdepthbuf_vertex:ux,map_fragment:dx,map_pars_fragment:fx,map_particle_fragment:px,map_particle_pars_fragment:mx,metalnessmap_fragment:gx,metalnessmap_pars_fragment:xx,morphinstance_vertex:yx,morphcolor_vertex:vx,morphnormal_vertex:_x,morphtarget_pars_vertex:bx,morphtarget_vertex:Mx,normal_fragment_begin:Sx,normal_fragment_maps:wx,normal_pars_fragment:Tx,normal_pars_vertex:Ex,normal_vertex:Ax,normalmap_pars_fragment:Rx,clearcoat_normal_fragment_begin:Cx,clearcoat_normal_fragment_maps:Ix,clearcoat_pars_fragment:Px,iridescence_pars_fragment:Lx,opaque_fragment:kx,packing:Nx,premultiplied_alpha_fragment:Dx,project_vertex:Ox,dithering_fragment:Ux,dithering_pars_fragment:zx,roughnessmap_fragment:Fx,roughnessmap_pars_fragment:Bx,shadowmap_pars_fragment:Hx,shadowmap_pars_vertex:Gx,shadowmap_vertex:Vx,shadowmask_pars_fragment:Wx,skinbase_vertex:Xx,skinning_pars_vertex:$x,skinning_vertex:qx,skinnormal_vertex:Yx,specularmap_fragment:Kx,specularmap_pars_fragment:Zx,tonemapping_fragment:Jx,tonemapping_pars_fragment:jx,transmission_fragment:Qx,transmission_pars_fragment:ty,uv_pars_fragment:ey,uv_pars_vertex:ny,uv_vertex:iy,worldpos_vertex:sy,background_vert:ry,background_frag:oy,backgroundCube_vert:ay,backgroundCube_frag:ly,cube_vert:cy,cube_frag:hy,depth_vert:uy,depth_frag:dy,distance_vert:fy,distance_frag:py,equirect_vert:my,equirect_frag:gy,linedashed_vert:xy,linedashed_frag:yy,meshbasic_vert:vy,meshbasic_frag:_y,meshlambert_vert:by,meshlambert_frag:My,meshmatcap_vert:Sy,meshmatcap_frag:wy,meshnormal_vert:Ty,meshnormal_frag:Ey,meshphong_vert:Ay,meshphong_frag:Ry,meshphysical_vert:Cy,meshphysical_frag:Iy,meshtoon_vert:Py,meshtoon_frag:Ly,points_vert:ky,points_frag:Ny,shadow_vert:Dy,shadow_frag:Oy,sprite_vert:Uy,sprite_frag:zy},dt={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new Zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new Zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},di={basic:{uniforms:cn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:re.meshbasic_vert,fragmentShader:re.meshbasic_frag},lambert:{uniforms:cn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Qt(0)},envMapIntensity:{value:1}}]),vertexShader:re.meshlambert_vert,fragmentShader:re.meshlambert_frag},phong:{uniforms:cn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:re.meshphong_vert,fragmentShader:re.meshphong_frag},standard:{uniforms:cn([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag},toon:{uniforms:cn([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Qt(0)}}]),vertexShader:re.meshtoon_vert,fragmentShader:re.meshtoon_frag},matcap:{uniforms:cn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:re.meshmatcap_vert,fragmentShader:re.meshmatcap_frag},points:{uniforms:cn([dt.points,dt.fog]),vertexShader:re.points_vert,fragmentShader:re.points_frag},dashed:{uniforms:cn([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:re.linedashed_vert,fragmentShader:re.linedashed_frag},depth:{uniforms:cn([dt.common,dt.displacementmap]),vertexShader:re.depth_vert,fragmentShader:re.depth_frag},normal:{uniforms:cn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:re.meshnormal_vert,fragmentShader:re.meshnormal_frag},sprite:{uniforms:cn([dt.sprite,dt.fog]),vertexShader:re.sprite_vert,fragmentShader:re.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:re.background_vert,fragmentShader:re.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:re.backgroundCube_vert,fragmentShader:re.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:re.cube_vert,fragmentShader:re.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:re.equirect_vert,fragmentShader:re.equirect_frag},distance:{uniforms:cn([dt.common,dt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:re.distance_vert,fragmentShader:re.distance_frag},shadow:{uniforms:cn([dt.lights,dt.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:re.shadow_vert,fragmentShader:re.shadow_frag}};di.physical={uniforms:cn([di.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new Zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new Zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new Zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag};var Rl={r:0,b:0,g:0},Fy=new ae,ip=new Xt;ip.set(-1,0,0,0,1,0,0,0,1);function By(s,t,e,n,i,r){let o=new Qt(0),a=i===!0?0:1,l,c,h=null,u=0,d=null;function m(y){let _=y.isScene===!0?y.background:null;if(_&&_.isTexture){let b=y.backgroundBlurriness>0;_=t.get(_,b)}return _}function g(y){let _=!1,b=m(y);b===null?f(o,a):b&&b.isColor&&(f(b,1),_=!0);let M=s.xr.getEnvironmentBlendMode();M==="additive"?e.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||_)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(y,_){let b=m(_);b&&(b.isCubeTexture||b.mapping===lo)?(c===void 0&&(c=new se(new Vi(1,1,1),new Be({name:"BackgroundCubeMaterial",uniforms:As(di.backgroundCube.uniforms),vertexShader:di.backgroundCube.vertexShader,fragmentShader:di.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,S,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Fy.makeRotationFromEuler(_.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ip),c.material.toneMapped=le.getTransfer(b.colorSpace)!==_e,(h!==b||u!==b.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=b,u=b.version,d=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new se(new kn(2,2),new Be({name:"BackgroundMaterial",uniforms:As(di.background.uniforms),vertexShader:di.background.vertexShader,fragmentShader:di.background.fragmentShader,side:ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=le.getTransfer(b.colorSpace)!==_e,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||u!==b.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=b,u=b.version,d=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function f(y,_){y.getRGB(Rl,Wh(s)),e.buffers.color.setClear(Rl.r,Rl.g,Rl.b,_,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,_=1){o.set(y),a=_,f(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,f(o,a)},render:g,addToRenderList:x,dispose:p}}function Hy(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(P,N,z,k,F){let $=!1,Y=u(P,k,z,N);r!==Y&&(r=Y,c(r.object)),$=m(P,k,z,F),$&&g(P,k,z,F),F!==null&&t.update(F,s.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,b(P,N,z,k),F!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return s.createVertexArray()}function c(P){return s.bindVertexArray(P)}function h(P){return s.deleteVertexArray(P)}function u(P,N,z,k){let F=k.wireframe===!0,$=n[N.id];$===void 0&&($={},n[N.id]=$);let Y=P.isInstancedMesh===!0?P.id:0,st=$[Y];st===void 0&&(st={},$[Y]=st);let K=st[z.id];K===void 0&&(K={},st[z.id]=K);let tt=K[F];return tt===void 0&&(tt=d(l()),K[F]=tt),tt}function d(P){let N=[],z=[],k=[];for(let F=0;F<e;F++)N[F]=0,z[F]=0,k[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:z,attributeDivisors:k,object:P,attributes:{},index:null}}function m(P,N,z,k){let F=r.attributes,$=N.attributes,Y=0,st=z.getAttributes();for(let K in st)if(st[K].location>=0){let q=F[K],mt=$[K];if(mt===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(mt=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(mt=P.instanceColor)),q===void 0||q.attribute!==mt||mt&&q.data!==mt.data)return!0;Y++}return r.attributesNum!==Y||r.index!==k}function g(P,N,z,k){let F={},$=N.attributes,Y=0,st=z.getAttributes();for(let K in st)if(st[K].location>=0){let q=$[K];q===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(q=P.instanceColor));let mt={};mt.attribute=q,q&&q.data&&(mt.data=q.data),F[K]=mt,Y++}r.attributes=F,r.attributesNum=Y,r.index=k}function x(){let P=r.newAttributes;for(let N=0,z=P.length;N<z;N++)P[N]=0}function f(P){p(P,0)}function p(P,N){let z=r.newAttributes,k=r.enabledAttributes,F=r.attributeDivisors;z[P]=1,k[P]===0&&(s.enableVertexAttribArray(P),k[P]=1),F[P]!==N&&(s.vertexAttribDivisor(P,N),F[P]=N)}function y(){let P=r.newAttributes,N=r.enabledAttributes;for(let z=0,k=N.length;z<k;z++)N[z]!==P[z]&&(s.disableVertexAttribArray(z),N[z]=0)}function _(P,N,z,k,F,$,Y){Y===!0?s.vertexAttribIPointer(P,N,z,F,$):s.vertexAttribPointer(P,N,z,k,F,$)}function b(P,N,z,k){x();let F=k.attributes,$=z.getAttributes(),Y=N.defaultAttributeValues;for(let st in $){let K=$[st];if(K.location>=0){let tt=F[st];if(tt===void 0&&(st==="instanceMatrix"&&P.instanceMatrix&&(tt=P.instanceMatrix),st==="instanceColor"&&P.instanceColor&&(tt=P.instanceColor)),tt!==void 0){let q=tt.normalized,mt=tt.itemSize,wt=t.get(tt);if(wt===void 0)continue;let at=wt.buffer,nt=wt.type,zt=wt.bytesPerElement,V=nt===s.INT||nt===s.UNSIGNED_INT||tt.gpuType===Va;if(tt.isInterleavedBufferAttribute){let J=tt.data,ut=J.stride,Rt=tt.offset;if(J.isInstancedInterleavedBuffer){for(let ct=0;ct<K.locationSize;ct++)p(K.location+ct,J.meshPerAttribute);P.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ct=0;ct<K.locationSize;ct++)f(K.location+ct);s.bindBuffer(s.ARRAY_BUFFER,at);for(let ct=0;ct<K.locationSize;ct++)_(K.location+ct,mt/K.locationSize,nt,q,ut*zt,(Rt+mt/K.locationSize*ct)*zt,V)}else{if(tt.isInstancedBufferAttribute){for(let J=0;J<K.locationSize;J++)p(K.location+J,tt.meshPerAttribute);P.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let J=0;J<K.locationSize;J++)f(K.location+J);s.bindBuffer(s.ARRAY_BUFFER,at);for(let J=0;J<K.locationSize;J++)_(K.location+J,mt/K.locationSize,nt,q,mt*zt,mt/K.locationSize*J*zt,V)}}else if(Y!==void 0){let q=Y[st];if(q!==void 0)switch(q.length){case 2:s.vertexAttrib2fv(K.location,q);break;case 3:s.vertexAttrib3fv(K.location,q);break;case 4:s.vertexAttrib4fv(K.location,q);break;default:s.vertexAttrib1fv(K.location,q)}}}}y()}function M(){A();for(let P in n){let N=n[P];for(let z in N){let k=N[z];for(let F in k){let $=k[F];for(let Y in $)h($[Y].object),delete $[Y];delete k[F]}}delete n[P]}}function S(P){if(n[P.id]===void 0)return;let N=n[P.id];for(let z in N){let k=N[z];for(let F in k){let $=k[F];for(let Y in $)h($[Y].object),delete $[Y];delete k[F]}}delete n[P.id]}function T(P){for(let N in n){let z=n[N];for(let k in z){let F=z[k];if(F[P.id]===void 0)continue;let $=F[P.id];for(let Y in $)h($[Y].object),delete $[Y];delete F[P.id]}}}function v(P){for(let N in n){let z=n[N],k=P.isInstancedMesh===!0?P.id:0,F=z[k];if(F!==void 0){for(let $ in F){let Y=F[$];for(let st in Y)h(Y[st].object),delete Y[st];delete F[$]}delete z[k],Object.keys(z).length===0&&delete n[N]}}}function A(){R(),o=!0,r!==i&&(r=i,c(r.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:A,resetDefaultState:R,dispose:M,releaseStatesOfGeometry:S,releaseStatesOfObject:v,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:f,disableUnusedAttributes:y}}function Gy(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let m=0;m<h;m++)d+=c[m];e.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Vy(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let T=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(T){return!(T!==wn&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){let v=T===jn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Mn&&T!==Sn&&!v&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Vt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Vt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),f=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),_=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),M=s.getParameter(s.MAX_SAMPLES),S=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:m,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:b,maxSamples:M,samples:S}}function Wy(s){let t=this,e=null,n=0,i=!1,r=!1,o=new Yn,a=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let m=u.length!==0||d||n!==0||i;return i=d,n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,m){let g=u.clippingPlanes,x=u.clipIntersection,f=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!f)r?h(null):c();else{let y=r?0:n,_=y*4,b=p.clippingState||null;l.value=b,b=h(g,d,_,m);for(let M=0;M!==_;++M)b[M]=e[M];p.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,m,g){let x=u!==null?u.length:0,f=null;if(x!==0){if(f=l.value,g!==!0||f===null){let p=m+x*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(f===null||f.length<p)&&(f=new Float32Array(p));for(let _=0,b=m;_!==x;++_,b+=4)o.copy(u[_]).applyMatrix4(y,a),o.normal.toArray(f,b),f[b+3]=o.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,f}}var vr=4,Xy=6,$y=20,qy=256,yo=new Zi,Df=new Qt,Qh=null,tu=0,eu=0,nu=!1,Yy=new L,Rs=new L,Il=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){let{size:o=256,position:a=Yy}=r;Qh=this._renderer.getRenderTarget(),tu=this._renderer.getActiveCubeFace(),eu=this._renderer.getActiveMipmapLevel(),nu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Qh,tu,eu),this._renderer.xr.enabled=nu,t.scissorTest=!1,yr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ji||t.mapping===Es?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Qh=this._renderer.getRenderTarget(),tu=this._renderer.getActiveCubeFace(),eu=this._renderer.getActiveMipmapLevel(),nu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:qe,minFilter:qe,generateMipmaps:!1,type:jn,format:wn,colorSpace:_s,depthBuffer:!1},i=Of(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Of(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ky(r)),this._blurMaterial=Jy(r,t,e),this._ggxMaterial=Zy(r,t,e)}return i}_compileMaterial(t){let e=new se(new Ye,t);this._renderer.compile(e,yo)}_sceneToCubeUV(t,e,n,i,r){let l=new an(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,m=u.toneMapping;u.getClearColor(Df),u.toneMapping=Zn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new se(new Vi,new Ms({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,f=x.material,p=!1,y=t.background;y?y.isColor&&(f.color.copy(y),t.background=null,p=!0):(f.color.copy(Df),p=!0);for(let _=0;_<6;_++){let b=_%3;b===0?(l.up.set(0,c[_],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[_],r.y,r.z)):b===1?(l.up.set(0,0,c[_]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[_],r.z)):(l.up.set(0,c[_],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[_]));let M=this._cubeSize;yr(i,b*M,_>2?M:0,M,M),u.setRenderTarget(i),p&&u.render(x,l),u.render(t,l)}u.toneMapping=m,u.autoClear=d,t.background=y}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Ji||t.mapping===Es;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=zf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uf());let r=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;yr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,yo)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let i=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=c*1.25,m=u*d,{_lodMax:g}=this,x=this._sizeLods[n],f=3*x*(n>g-vr?n-g+vr:0),p=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=m,l.mipInt.value=g-e,yr(r,f,p,3*x,2*x),i.setRenderTarget(r),i.render(a,yo),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,yr(t,f,p,3*x,2*x),i.setRenderTarget(t),i.render(a,yo)}_blur(t,e,n,i){let r=this._pingPongRenderTarget,o=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,i,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[i];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],u=3*h*(i>this._lodMax-vr?i-this._lodMax+vr:0),d=4*(this._cubeSize-h);yr(e,u,d,3*h,2*h),o.setRenderTarget(e),o.render(l,yo)}};function Ky(s){let t=[],e=[],n=s,i=s-vr+1+Xy;for(let r=0;r<i;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,m=3,g=new Float32Array(m*d*u),x=new Float32Array(m*d*u);for(let p=0;p<u;p++){let y=p%3*2/3-1,_=p>2?0:-1,b=[y,_,0,y+2/3,_,0,y+2/3,_+1,0,y,_,0,y+2/3,_+1,0,y,_+1,0];g.set(b,m*d*p);for(let M=0;M<d;M++){let S=h[M*2]*2-1,T=h[M*2+1]*2-1;p===0?Rs.set(1,T,S):p===1?Rs.set(-S,1,-T):p===2?Rs.set(-S,T,1):p===3?Rs.set(-1,T,-S):p===4?Rs.set(-S,-1,T):Rs.set(S,T,-1),Rs.toArray(x,(p*d+M)*m)}}let f=new Ye;f.setAttribute("position",new Ln(g,m)),f.setAttribute("outputDirection",new Ln(x,m)),e.push(new se(f,null)),n>vr&&n--}return{lodMeshes:e,sizeLods:t}}function Of(s,t,e){let n=new ln(s,t,e);return n.texture.mapping=lo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function yr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Zy(s,t,e){return new Be({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:qy,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ll(),fragmentShader:`

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
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Jy(s,t,e){return new Be({name:"SphericalGaussianBlur",defines:{SAMPLES:$y,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ll(),fragmentShader:`

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
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Uf(){return new Be({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ll(),fragmentShader:`

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
		`,blending:hi,depthTest:!1,depthWrite:!1})}function zf(){return new Be({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Ll(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var br=class extends ln{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Qr(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Vi(5,5,5),r=new Be({name:"CubemapFromEquirect",uniforms:As(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:hi});r.uniforms.tEquirect.value=e;let o=new se(i,r),a=e.minFilter;return e.minFilter===ji&&(e.minFilter=qe),new dr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}};function jy(s){let t=new WeakMap,e=new WeakMap,n=null;function i(d,m=!1){return d==null?null:m?o(d):r(d)}function r(d){if(d&&d.isTexture){let m=d.mapping;if(m===Ba||m===Ha)if(t.has(d)){let g=t.get(d).texture;return a(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let x=new br(g.height);return x.fromEquirectangularTexture(s,d),t.set(d,x),d.addEventListener("dispose",c),a(x.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){let m=d.mapping,g=m===Ba||m===Ha,x=m===Ji||m===Es;if(g||x){let f=e.get(d),p=f!==void 0?f.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new Il(s)),f=g?n.fromEquirectangular(d,f):n.fromCubemap(d,f),f.texture.pmremVersion=d.pmremVersion,e.set(d,f),f.texture;if(f!==void 0)return f.texture;{let y=d.image;return g&&y&&y.height>0||x&&y&&l(y)?(n===null&&(n=new Il(s)),f=g?n.fromEquirectangular(d):n.fromCubemap(d),f.texture.pmremVersion=d.pmremVersion,e.set(d,f),d.addEventListener("dispose",h),f.texture):null}}}return d}function a(d,m){return m===Ba?d.mapping=Ji:m===Ha&&(d.mapping=Es),d}function l(d){let m=0,g=6;for(let x=0;x<g;x++)d[x]!==void 0&&m++;return m===g}function c(d){let m=d.target;m.removeEventListener("dispose",c);let g=t.get(m);g!==void 0&&(t.delete(m),g.dispose())}function h(d){let m=d.target;m.removeEventListener("dispose",h);let g=e.get(m);g!==void 0&&(e.delete(m),g.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function Qy(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&vs("WebGLRenderer: "+n+" extension not supported."),i}}}function tv(s,t,e,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete i[d.id];let m=r.get(d);m&&(t.remove(m),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let m in d)t.update(d[m],s.ARRAY_BUFFER)}function c(u){let d=[],m=u.index,g=u.attributes.position,x=0;if(g===void 0)return;if(m!==null){let y=m.array;x=m.version;for(let _=0,b=y.length;_<b;_+=3){let M=y[_+0],S=y[_+1],T=y[_+2];d.push(M,S,S,T,T,M)}}else{let y=g.array;x=g.version;for(let _=0,b=y.length/3-1;_<b;_+=3){let M=_+0,S=_+1,T=_+2;d.push(M,S,S,T,T,M)}}let f=new(g.count>=65535?jr:Jr)(d,1);f.version=x;let p=r.get(u);p&&t.remove(p),r.set(u,f)}function h(u){let d=r.get(u);if(d){let m=u.index;m!==null&&d.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function ev(s,t,e){let n;function i(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,d){s.drawElements(n,d,r,u*o),e.update(d,n,1)}function c(u,d,m){m!==0&&(s.drawElementsInstanced(n,d,r,u*o,m),e.update(d,n,m))}function h(u,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,m);let x=0;for(let f=0;f<m;f++)x+=d[f];e.update(x,n,1)}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function nv(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:$t("WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function iv(s,t,e){let n=new WeakMap,i=new Ae;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let A=function(){T.dispose(),n.delete(a),a.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();let m=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],_=0;m===!0&&(_=1),g===!0&&(_=2),x===!0&&(_=3);let b=a.attributes.position.count*_,M=1;b>t.maxTextureSize&&(M=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let S=new Float32Array(b*M*4*u),T=new Yr(S,b,M,u);T.type=Sn,T.needsUpdate=!0;let v=_*4;for(let R=0;R<u;R++){let P=f[R],N=p[R],z=y[R],k=b*M*4*R;for(let F=0;F<P.count;F++){let $=F*v;m===!0&&(i.fromBufferAttribute(P,F),S[k+$+0]=i.x,S[k+$+1]=i.y,S[k+$+2]=i.z,S[k+$+3]=0),g===!0&&(i.fromBufferAttribute(N,F),S[k+$+4]=i.x,S[k+$+5]=i.y,S[k+$+6]=i.z,S[k+$+7]=0),x===!0&&(i.fromBufferAttribute(z,F),S[k+$+8]=i.x,S[k+$+9]=i.y,S[k+$+10]=i.z,S[k+$+11]=z.itemSize===4?i.w:1)}}d={count:u,texture:T,size:new Zt(b,M)},n.set(a,d),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let m=0;for(let x=0;x<c.length;x++)m+=c[x];let g=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function sv(s,t,e,n,i){let r=new WeakMap;function o(c){let h=i.render.frame,u=c.geometry,d=t.get(c,u);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let m=c.skeleton;r.get(m)!==h&&(m.update(),r.set(m,h))}return d}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var rv={[Th]:"LINEAR_TONE_MAPPING",[Eh]:"REINHARD_TONE_MAPPING",[Ah]:"CINEON_TONE_MAPPING",[Rh]:"ACES_FILMIC_TONE_MAPPING",[Ih]:"AGX_TONE_MAPPING",[Ph]:"NEUTRAL_TONE_MAPPING",[Ch]:"CUSTOM_TONE_MAPPING"};function ov(s,t,e,n,i,r){let o=new ln(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new Ye;c.setAttribute("position",new fe([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new fe([0,2,0,0,2,0],2));let h=new Sa({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new se(c,h),d=new Zi(-1,1,1,-1,0,1),m=null,g=null,x=!1,f,p=null,y=[],_=!1;this.setSize=function(b,M){o.setSize(b,M),a!==null&&a.setSize(b,M),l!==null&&l.setSize(b,M);for(let S=0;S<y.length;S++){let T=y[S];T.setSize&&T.setSize(b,M)}},this.setEffects=function(b){y=b,_=y.length>0&&y[0].isRenderPass===!0;let M=o.width,S=o.height;y.length>0&&a===null&&(a=new ln(M,S,{type:jn,depthBuffer:!1,stencilBuffer:!1}),l=new ln(M,S,{type:jn,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<y.length;T++){let v=y[T];v.setSize&&v.setSize(M,S)}},this.begin=function(b,M){if(x||b.toneMapping===Zn&&y.length===0)return!1;if(p=M,M!==null){let S=M.width,T=M.height;(o.width!==S||o.height!==T)&&this.setSize(S,T)}return _===!1&&b.setRenderTarget(o),f=b.toneMapping,b.toneMapping=Zn,!0},this.hasRenderPass=function(){return _},this.end=function(b,M){b.toneMapping=f,x=!0;let S=o,T=a;for(let v=0;v<y.length;v++){let A=y[v];A.enabled!==!1&&(A.render(b,T,S,M),A.needsSwap!==!1&&(S=T,T=T===a?l:a))}if(m!==b.outputColorSpace||g!==b.toneMapping){m=b.outputColorSpace,g=b.toneMapping,h.defines={},le.getTransfer(m)===_e&&(h.defines.SRGB_TRANSFER="");let v=rv[g];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,b.setRenderTarget(p),b.render(u,d),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var sp=new fn,ru=new Gi(1,1),rp=new Yr,op=new _a,ap=new Qr,Ff=[],Bf=[],Hf=new Float32Array(16),Gf=new Float32Array(9),Vf=new Float32Array(4);function Mr(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=Ff[i];if(r===void 0&&(r=new Float32Array(i),Ff[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Ze(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Je(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function kl(s,t){let e=Bf[t];e===void 0&&(e=new Int32Array(t),Bf[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function av(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function lv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;s.uniform2fv(this.addr,t),Je(e,t)}}function cv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ze(e,t))return;s.uniform3fv(this.addr,t),Je(e,t)}}function hv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;s.uniform4fv(this.addr,t),Je(e,t)}}function uv(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,n))return;Vf.set(n),s.uniformMatrix2fv(this.addr,!1,Vf),Je(e,n)}}function dv(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,n))return;Gf.set(n),s.uniformMatrix3fv(this.addr,!1,Gf),Je(e,n)}}function fv(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,n))return;Hf.set(n),s.uniformMatrix4fv(this.addr,!1,Hf),Je(e,n)}}function pv(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function mv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;s.uniform2iv(this.addr,t),Je(e,t)}}function gv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;s.uniform3iv(this.addr,t),Je(e,t)}}function xv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;s.uniform4iv(this.addr,t),Je(e,t)}}function yv(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function vv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;s.uniform2uiv(this.addr,t),Je(e,t)}}function _v(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;s.uniform3uiv(this.addr,t),Je(e,t)}}function bv(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;s.uniform4uiv(this.addr,t),Je(e,t)}}function Mv(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(ru.compareFunction=e.isReversedDepthBuffer()?Al:El,r=ru):r=sp,e.setTexture2D(t||r,i)}function Sv(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||op,i)}function wv(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||ap,i)}function Tv(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||rp,i)}function Ev(s){switch(s){case 5126:return av;case 35664:return lv;case 35665:return cv;case 35666:return hv;case 35674:return uv;case 35675:return dv;case 35676:return fv;case 5124:case 35670:return pv;case 35667:case 35671:return mv;case 35668:case 35672:return gv;case 35669:case 35673:return xv;case 5125:return yv;case 36294:return vv;case 36295:return _v;case 36296:return bv;case 35678:case 36198:case 36298:case 36306:case 35682:return Mv;case 35679:case 36299:case 36307:return Sv;case 35680:case 36300:case 36308:case 36293:return wv;case 36289:case 36303:case 36311:case 36292:return Tv}}function Av(s,t){s.uniform1fv(this.addr,t)}function Rv(s,t){let e=Mr(t,this.size,2);s.uniform2fv(this.addr,e)}function Cv(s,t){let e=Mr(t,this.size,3);s.uniform3fv(this.addr,e)}function Iv(s,t){let e=Mr(t,this.size,4);s.uniform4fv(this.addr,e)}function Pv(s,t){let e=Mr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Lv(s,t){let e=Mr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function kv(s,t){let e=Mr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Nv(s,t){s.uniform1iv(this.addr,t)}function Dv(s,t){s.uniform2iv(this.addr,t)}function Ov(s,t){s.uniform3iv(this.addr,t)}function Uv(s,t){s.uniform4iv(this.addr,t)}function zv(s,t){s.uniform1uiv(this.addr,t)}function Fv(s,t){s.uniform2uiv(this.addr,t)}function Bv(s,t){s.uniform3uiv(this.addr,t)}function Hv(s,t){s.uniform4uiv(this.addr,t)}function Gv(s,t,e){let n=this.cache,i=t.length,r=kl(e,i);Ze(n,r)||(s.uniform1iv(this.addr,r),Je(n,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=ru:o=sp;for(let a=0;a!==i;++a)e.setTexture2D(t[a]||o,r[a])}function Vv(s,t,e){let n=this.cache,i=t.length,r=kl(e,i);Ze(n,r)||(s.uniform1iv(this.addr,r),Je(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||op,r[o])}function Wv(s,t,e){let n=this.cache,i=t.length,r=kl(e,i);Ze(n,r)||(s.uniform1iv(this.addr,r),Je(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||ap,r[o])}function Xv(s,t,e){let n=this.cache,i=t.length,r=kl(e,i);Ze(n,r)||(s.uniform1iv(this.addr,r),Je(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||rp,r[o])}function $v(s){switch(s){case 5126:return Av;case 35664:return Rv;case 35665:return Cv;case 35666:return Iv;case 35674:return Pv;case 35675:return Lv;case 35676:return kv;case 5124:case 35670:return Nv;case 35667:case 35671:return Dv;case 35668:case 35672:return Ov;case 35669:case 35673:return Uv;case 5125:return zv;case 36294:return Fv;case 36295:return Bv;case 36296:return Hv;case 35678:case 36198:case 36298:case 36306:case 35682:return Gv;case 35679:case 36299:case 36307:return Vv;case 35680:case 36300:case 36308:case 36293:return Wv;case 36289:case 36303:case 36311:case 36292:return Xv}}var ou=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Ev(e.type)}},au=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=$v(e.type)}},lu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},iu=/(\w+)(\])?(\[|\.)?/g;function Wf(s,t){s.seq.push(t),s.map[t.id]=t}function qv(s,t,e){let n=s.name,i=n.length;for(iu.lastIndex=0;;){let r=iu.exec(n),o=iu.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Wf(e,c===void 0?new ou(a,s,t):new au(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new lu(a),Wf(e,u)),e=u}}}var _r=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);qv(a,l,this)}let i=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(o):r.push(o);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function Xf(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var Yv=37297,Kv=0;function Zv(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var $f=new Xt;function Jv(s){le._getMatrix($f,le.workingColorSpace,s);let t=`mat3( ${$f.elements.map(e=>e.toFixed(4))} )`;switch(le.getTransfer(s)){case $r:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return Vt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function qf(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Zv(s.getShaderSource(t),a)}else return r}function jv(s,t){let e=Jv(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Qv={[Th]:"Linear",[Eh]:"Reinhard",[Ah]:"Cineon",[Rh]:"ACESFilmic",[Ih]:"AgX",[Ph]:"Neutral",[Ch]:"Custom"};function t_(s,t){let e=Qv[t];return e===void 0?(Vt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Cl=new L;function e_(){le.getLuminanceCoefficients(Cl);let s=Cl.x.toFixed(4),t=Cl.y.toFixed(4),e=Cl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function n_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_o).join(`
`)}function i_(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function s_(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function _o(s){return s!==""}function Yf(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Kf(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var r_=/^[ \t]*#include +<([\w\d./]+)>/gm;function cu(s){return s.replace(r_,a_)}var o_=new Map;function a_(s,t){let e=re[t];if(e===void 0){let n=o_.get(t);if(n!==void 0)e=re[n],Vt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return cu(e)}var l_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zf(s){return s.replace(l_,c_)}function c_(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Jf(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}var h_={[ao]:"SHADOWMAP_TYPE_PCF",[fr]:"SHADOWMAP_TYPE_VSM"};function u_(s){return h_[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var d_={[Ji]:"ENVMAP_TYPE_CUBE",[Es]:"ENVMAP_TYPE_CUBE",[lo]:"ENVMAP_TYPE_CUBE_UV"};function f_(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":d_[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var p_={[Es]:"ENVMAP_MODE_REFRACTION"};function m_(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":p_[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var g_={[wh]:"ENVMAP_BLENDING_MULTIPLY",[mf]:"ENVMAP_BLENDING_MIX",[gf]:"ENVMAP_BLENDING_ADD"};function x_(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":g_[s.combine]||"ENVMAP_BLENDING_NONE"}function y_(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function v_(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=u_(e),c=f_(e),h=m_(e),u=x_(e),d=y_(e),m=n_(e),g=i_(r),x=i.createProgram(),f,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(_o).join(`
`),f.length>0&&(f+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(_o).join(`
`),p.length>0&&(p+=`
`)):(f=[Jf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_o).join(`
`),p=[Jf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Zn?"#define TONE_MAPPING":"",e.toneMapping!==Zn?re.tonemapping_pars_fragment:"",e.toneMapping!==Zn?t_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",re.colorspace_pars_fragment,jv("linearToOutputTexel",e.outputColorSpace),e_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(_o).join(`
`)),o=cu(o),o=Yf(o,e),o=Kf(o,e),a=cu(a),a=Yf(a,e),a=Kf(a,e),o=Zf(o),a=Zf(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,p=["#define varying in",e.glslVersion===Hh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let _=y+f+o,b=y+p+a,M=Xf(i,i.VERTEX_SHADER,_),S=Xf(i,i.FRAGMENT_SHADER,b);i.attachShader(x,M),i.attachShader(x,S),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function T(P){if(s.debug.checkShaderErrors){let N=i.getProgramInfoLog(x)||"",z=i.getShaderInfoLog(M)||"",k=i.getShaderInfoLog(S)||"",F=N.trim(),$=z.trim(),Y=k.trim(),st=!0,K=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(st=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,M,S);else{let tt=qf(i,M,"vertex"),q=qf(i,S,"fragment");$t("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+F+`
`+tt+`
`+q)}else F!==""?Vt("WebGLProgram: Program Info Log:",F):($===""||Y==="")&&(K=!1);K&&(P.diagnostics={runnable:st,programLog:F,vertexShader:{log:$,prefix:f},fragmentShader:{log:Y,prefix:p}})}i.deleteShader(M),i.deleteShader(S),v=new _r(i,x),A=s_(i,x)}let v;this.getUniforms=function(){return v===void 0&&T(this),v};let A;this.getAttributes=function(){return A===void 0&&T(this),A};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=i.getProgramParameter(x,Yv)),R},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Kv++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=M,this.fragmentShader=S,this}var __=0,hu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new uu(t),e.set(t,n)),n}},uu=class{constructor(t){this.id=__++,this.code=t,this.usedTimes=0}};function b_(s){return s===ts||s===mo||s===go}function M_(s,t,e,n,i,r){let o=new Kr,a=new hu,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,A,R,P,N,z){let k=P.fog,F=N.geometry,$=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,Y=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,st=t.get(v.envMap||$,Y),K=st&&st.mapping===lo?st.image.height:null,tt=m[v.type];v.precision!==null&&(d=n.getMaxPrecision(v.precision),d!==v.precision&&Vt("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));let q=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,mt=q!==void 0?q.length:0,wt=0;F.morphAttributes.position!==void 0&&(wt=1),F.morphAttributes.normal!==void 0&&(wt=2),F.morphAttributes.color!==void 0&&(wt=3);let at,nt,zt,V;if(tt){let Ie=di[tt];at=Ie.vertexShader,nt=Ie.fragmentShader}else{at=v.vertexShader,nt=v.fragmentShader;let Ie=a.getVertexShaderStage(v),ye=a.getFragmentShaderStage(v);a.update(v,Ie,ye),zt=Ie.id,V=ye.id}let J=s.getRenderTarget(),ut=s.state.buffers.depth.getReversed(),Rt=N.isInstancedMesh===!0,ct=N.isBatchedMesh===!0,Ft=!!v.map,xe=!!v.matcap,qt=!!st,Yt=!!v.aoMap,oe=!!v.lightMap,kt=!!v.bumpMap&&v.wireframe===!1,he=!!v.normalMap,Ce=!!v.displacementMap,je=!!v.emissiveMap,Te=!!v.metalnessMap,We=!!v.roughnessMap,U=v.anisotropy>0,nn=v.clearcoat>0,Me=v.dispersion>0,I=v.retroreflectivity>0,w=v.iridescence>0,B=v.sheen>0,W=v.transmission>0,j=U&&!!v.anisotropyMap,lt=nn&&!!v.clearcoatMap,pt=nn&&!!v.clearcoatNormalMap,Q=nn&&!!v.clearcoatRoughnessMap,it=w&&!!v.iridescenceMap,gt=w&&!!v.iridescenceThicknessMap,Nt=B&&!!v.sheenColorMap,_t=B&&!!v.sheenRoughnessMap,xt=!!v.specularMap,Dt=!!v.specularColorMap,Gt=!!v.specularIntensityMap,jt=W&&!!v.transmissionMap,O=W&&!!v.thicknessMap,yt=!!v.gradientMap,et=!!v.alphaMap,vt=v.alphaTest>0,St=!!v.alphaHash,rt=!!v.extensions,Ot=Zn;v.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Ot=s.toneMapping);let Pt={shaderID:tt,shaderType:v.type,shaderName:v.name,vertexShader:at,fragmentShader:nt,defines:v.defines,customVertexShaderID:zt,customFragmentShaderID:V,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:ct,batchingColor:ct&&N._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&N.instanceColor!==null,instancingMorph:Rt&&N.morphTexture!==null,outputColorSpace:J===null?s.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:le.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Ft,matcap:xe,envMap:qt,envMapMode:qt&&st.mapping,envMapCubeUVHeight:K,aoMap:Yt,lightMap:oe,bumpMap:kt,normalMap:he,displacementMap:Ce,emissiveMap:je,normalMapObjectSpace:he&&v.normalMapType===vf,normalMapTangentSpace:he&&v.normalMapType===Fh,packedNormalMap:he&&v.normalMapType===Fh&&b_(v.normalMap.format),metalnessMap:Te,roughnessMap:We,anisotropy:U,anisotropyMap:j,clearcoat:nn,clearcoatMap:lt,clearcoatNormalMap:pt,clearcoatRoughnessMap:Q,dispersion:Me,retroreflection:I,iridescence:w,iridescenceMap:it,iridescenceThicknessMap:gt,sheen:B,sheenColorMap:Nt,sheenRoughnessMap:_t,specularMap:xt,specularColorMap:Dt,specularIntensityMap:Gt,transmission:W,transmissionMap:jt,thicknessMap:O,gradientMap:yt,opaque:v.transparent===!1&&v.blending===pr&&v.alphaToCoverage===!1,alphaMap:et,alphaTest:vt,alphaHash:St,combine:v.combine,mapUv:Ft&&g(v.map.channel),aoMapUv:Yt&&g(v.aoMap.channel),lightMapUv:oe&&g(v.lightMap.channel),bumpMapUv:kt&&g(v.bumpMap.channel),normalMapUv:he&&g(v.normalMap.channel),displacementMapUv:Ce&&g(v.displacementMap.channel),emissiveMapUv:je&&g(v.emissiveMap.channel),metalnessMapUv:Te&&g(v.metalnessMap.channel),roughnessMapUv:We&&g(v.roughnessMap.channel),anisotropyMapUv:j&&g(v.anisotropyMap.channel),clearcoatMapUv:lt&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:pt&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:it&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:_t&&g(v.sheenRoughnessMap.channel),specularMapUv:xt&&g(v.specularMap.channel),specularColorMapUv:Dt&&g(v.specularColorMap.channel),specularIntensityMapUv:Gt&&g(v.specularIntensityMap.channel),transmissionMapUv:jt&&g(v.transmissionMap.channel),thicknessMapUv:O&&g(v.thicknessMap.channel),alphaMapUv:et&&g(v.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(he||U),vertexNormals:!!F.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!F.attributes.uv&&(Ft||et),fog:!!k,useFog:v.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||F.attributes.normal===void 0&&he===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ut,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:mt,morphTextureStride:wt,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ot,decodeVideoTexture:Ft&&v.map.isVideoTexture===!0&&le.getTransfer(v.map.colorSpace)===_e,decodeVideoTextureEmissive:je&&v.emissiveMap.isVideoTexture===!0&&le.getTransfer(v.emissiveMap.colorSpace)===_e,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Fn,flipSided:v.side===en,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:rt&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&v.extensions.multiDraw===!0||ct)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Pt.vertexUv1s=l.has(1),Pt.vertexUv2s=l.has(2),Pt.vertexUv3s=l.has(3),l.clear(),Pt}function f(v){let A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(let R in v.defines)A.push(R),A.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(p(A,v),y(A,v),A.push(s.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function p(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numSunLights),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numSunLightShadows),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function y(v,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.retroreflection&&o.enable(24),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),A.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function _(v){let A=m[v.type],R;if(A){let P=di[A];R=xo.clone(P.uniforms)}else R=v.uniforms;return R}function b(v,A){let R=h.get(A);return R!==void 0?++R.usedTimes:(R=new v_(s,A,v,i),c.push(R),h.set(A,R)),R}function M(v){if(--v.usedTimes===0){let A=c.indexOf(v);c[A]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function S(v){a.remove(v)}function T(){a.dispose()}return{getParameters:x,getProgramCacheKey:f,getUniforms:_,acquireProgram:b,releaseProgram:M,releaseShaderCache:S,programs:c,dispose:T}}function S_(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function w_(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function jf(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Qf(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(d){let m=0;return d.isInstancedMesh&&(m+=2),d.isSkinnedMesh&&(m+=1),m}function a(d,m,g,x,f,p){let y=s[t];return y===void 0?(y={id:d.id,object:d,geometry:m,material:g,materialVariant:o(d),groupOrder:x,renderOrder:d.renderOrder,z:f,group:p},s[t]=y):(y.id=d.id,y.object=d,y.geometry=m,y.material=g,y.materialVariant=o(d),y.groupOrder=x,y.renderOrder=d.renderOrder,y.z=f,y.group=p),t++,y}function l(d,m,g,x,f,p,y){y.reversedDepth===!0&&(f=-f);let _=a(d,m,g,x,f,p);g.transmission>0?n.push(_):g.transparent===!0?i.push(_):e.push(_)}function c(d,m,g,x,f,p){let y=a(d,m,g,x,f,p);g.transmission>0?n.unshift(y):g.transparent===!0?i.unshift(y):e.unshift(y)}function h(d,m){e.length>1&&e.sort(d||w_),n.length>1&&n.sort(m||jf),i.length>1&&i.sort(m||jf)}function u(){for(let d=t,m=s.length;d<m;d++){let g=s[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:u,sort:h}}function T_(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new Qf,s.set(n,[o])):i>=r.length?(o=new Qf,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function E_(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new L,color:new Qt};break;case"SpotLight":e={position:new L,direction:new L,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new L,halfWidth:new L,halfHeight:new L};break}return s[t.id]=e,e}}}function A_(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var R_=0;function C_(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function I_(s){let t=new E_,e=A_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let i=new L,r=new ae,o=new ae;function a(c){let h=0,u=0,d=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let m=0,g=0,x=0,f=0,p=0,y=0,_=0,b=0,M=0,S=0,T=0,v=0,A=0,R=0;c.sort(C_);for(let N=0,z=c.length;N<z;N++){let k=c[N],F=k.color,$=k.intensity,Y=k.distance,st=null;if(k.shadow&&k.shadow.map&&(k.shadow.map.texture.format===ts?st=k.shadow.map.texture:st=k.shadow.map.depthTexture||k.shadow.map.texture),k.isAmbientLight)h+=F.r*$,u+=F.g*$,d+=F.b*$;else if(k.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(k.sh.coefficients[K],$);R++}else if(k.isSunLight){let K=t.get(k);if(K.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){let tt=k.shadow,q=e.get(k);q.shadowIntensity=tt.intensity,q.shadowBias=tt.bias,q.shadowNormalBias=tt.normalBias,q.shadowRadius=tt.radius,q.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),n.sunShadow[g]=q,n.sunShadowMap[g]=st;let mt=tt.getViewportCount();for(let wt=0;wt<mt;wt++)n.sunShadowMatrix[x+wt]=tt.getMatrix(wt),n.sunShadowCascade[x+wt]=tt._cascadeData[wt];x+=mt,g++}n.sun[m]=K,m++}else if(k.isDirectionalLight){let K=t.get(k);if(K.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){let tt=k.shadow,q=e.get(k);q.shadowIntensity=tt.intensity,q.shadowBias=tt.bias,q.shadowNormalBias=tt.normalBias,q.shadowRadius=tt.radius,q.shadowMapSize=tt.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=st,n.directionalShadowMatrix[f]=k.shadow.matrix,M++}n.directional[f]=K,f++}else if(k.isSpotLight){let K=t.get(k);K.position.setFromMatrixPosition(k.matrixWorld),K.color.copy(F).multiplyScalar($),K.distance=Y,K.coneCos=Math.cos(k.angle),K.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),K.decay=k.decay,n.spot[y]=K;let tt=k.shadow;if(k.map&&(n.spotLightMap[v]=k.map,v++,tt.updateMatrices(k),k.castShadow&&A++),n.spotLightMatrix[y]=tt.matrix,k.castShadow){let q=e.get(k);q.shadowIntensity=tt.intensity,q.shadowBias=tt.bias,q.shadowNormalBias=tt.normalBias,q.shadowRadius=tt.radius,q.shadowMapSize=tt.mapSize,n.spotShadow[y]=q,n.spotShadowMap[y]=st,T++}y++}else if(k.isRectAreaLight){let K=t.get(k);K.color.copy(F).multiplyScalar($),K.halfWidth.set(k.width*.5,0,0),K.halfHeight.set(0,k.height*.5,0),n.rectArea[_]=K,_++}else if(k.isPointLight){let K=t.get(k);if(K.color.copy(k.color).multiplyScalar(k.intensity),K.distance=k.distance,K.decay=k.decay,k.castShadow){let tt=k.shadow,q=e.get(k);q.shadowIntensity=tt.intensity,q.shadowBias=tt.bias,q.shadowNormalBias=tt.normalBias,q.shadowRadius=tt.radius,q.shadowMapSize=tt.mapSize,q.shadowCameraNear=tt.camera.near,q.shadowCameraFar=tt.camera.far,n.pointShadow[p]=q,n.pointShadowMap[p]=st,n.pointShadowMatrix[p]=k.shadow.matrix,S++}n.point[p]=K,p++}else if(k.isHemisphereLight){let K=t.get(k);K.skyColor.copy(k.color).multiplyScalar($),K.groundColor.copy(k.groundColor).multiplyScalar($),n.hemi[b]=K,b++}}_>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let P=n.hash;(P.sunLength!==m||P.directionalLength!==f||P.pointLength!==p||P.spotLength!==y||P.rectAreaLength!==_||P.hemiLength!==b||P.numSunShadows!==g||P.numDirectionalShadows!==M||P.numPointShadows!==S||P.numSpotShadows!==T||P.numSpotMaps!==v||P.numLightProbes!==R)&&(n.sun.length=m,n.directional.length=f,n.spot.length=y,n.rectArea.length=_,n.point.length=p,n.hemi.length=b,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=T,n.spotShadowMap.length=T,n.spotLightMatrix.length=T+v-A,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,P.sunLength=m,P.directionalLength=f,P.pointLength=p,P.spotLength=y,P.rectAreaLength=_,P.hemiLength=b,P.numSunShadows=g,P.numDirectionalShadows=M,P.numPointShadows=S,P.numSpotShadows=T,P.numSpotMaps=v,P.numLightProbes=R,n.version=R_++)}function l(c,h){let u=0,d=0,m=0,g=0,x=0,f=0,p=h.matrixWorldInverse;for(let y=0,_=c.length;y<_;y++){let b=c[y];if(b.isSunLight){let M=n.sun[u];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(p),u++}else if(b.isDirectionalLight){let M=n.directional[d];M.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(p),d++}else if(b.isSpotLight){let M=n.spot[g];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(p),g++}else if(b.isRectAreaLight){let M=n.rectArea[x];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(p),o.identity(),r.copy(b.matrixWorld),r.premultiply(p),o.extractRotation(r),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),x++}else if(b.isPointLight){let M=n.point[m];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(p),m++}else if(b.isHemisphereLight){let M=n.hemi[f];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(p),f++}}}return{setup:a,setupView:l,state:n}}function tp(s){let t=new I_(s),e=[],n=[],i=[];function r(d){u.camera=d,e.length=0,n.length=0,i.length=0}function o(d){e.push(d)}function a(d){n.push(d)}function l(d){i.push(d)}function c(){t.setup(e)}function h(d){t.setupView(e,d)}let u={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function P_(s){let t=new WeakMap;function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new tp(s),t.set(i,[a])):r>=o.length?(a=new tp(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var L_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,k_=`uniform sampler2D shadow_pass;
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
}`,N_=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],D_=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],ep=new ae,vo=new L,su=new L;function O_(s,t,e){let n=new hr,i=new Zt,r=new Zt,o=new Ae,a=new wa,l=new Ta,c={},h=e.maxTextureSize,u={[ci]:en,[en]:ci,[Fn]:Fn},d=new Be({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Zt},radius:{value:4}},vertexShader:L_,fragmentShader:k_}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let g=new Ye;g.setAttribute("position",new Ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new se(g,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ao;let p=this.type;this.render=function(S,T,v){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||S.length===0)return;this.type===Kd&&(Vt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ao);let A=s.getRenderTarget(),R=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),N=s.state;N.setBlending(hi),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let z=p!==this.type;z&&T.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(F=>F.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,F=S.length;k<F;k++){let $=S[k],Y=$.shadow;if(Y===void 0){Vt("WebGLShadowMap:",$,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;i.copy(Y.mapSize);let st=Y.getFrameExtents();i.multiply(st),r.copy(Y.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/st.x),i.x=r.x*st.x,Y.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/st.y),i.y=r.y*st.y,Y.mapSize.y=r.y));let K=s.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=K,Y.map===null||z===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===fr){if($.isPointLight){Vt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new ln(i.x,i.y,{format:ts,type:jn,minFilter:qe,magFilter:qe,generateMipmaps:!1}),Y.map.texture.name=$.name+".shadowMap",Y.map.depthTexture=new Gi(i.x,i.y,Sn),Y.map.depthTexture.name=$.name+".shadowMapDepth",Y.map.depthTexture.format=ri,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Ge,Y.map.depthTexture.magFilter=Ge}else $.isPointLight?(Y.map=new br(i.x),Y.map.depthTexture=new Ma(i.x,Jn)):(Y.map=new ln(i.x,i.y),Y.map.depthTexture=new Gi(i.x,i.y,Jn)),Y.map.depthTexture.name=$.name+".shadowMap",Y.map.depthTexture.format=ri,this.type===ao?(Y.map.depthTexture.compareFunction=K?Al:El,Y.map.depthTexture.minFilter=qe,Y.map.depthTexture.magFilter=qe):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Ge,Y.map.depthTexture.magFilter=Ge);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==i.x||Y.map.height!==i.y)&&Y.map.setSize(i.x,i.y);let tt=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();$.isPointLight!==!0&&Y.updateMatrices($,v);for(let q=0;q<tt;q++){let mt=Y.getCamera(q);if($.isPointLight){let wt=Y.camera,at=Y.matrix,nt=$.distance||wt.far;nt!==wt.far&&(wt.far=nt,wt.updateProjectionMatrix()),vo.setFromMatrixPosition($.matrixWorld),wt.position.copy(vo),su.copy(wt.position),su.add(N_[q]),wt.up.copy(D_[q]),wt.lookAt(su),wt.updateMatrixWorld(),at.makeTranslation(-vo.x,-vo.y,-vo.z),ep.multiplyMatrices(wt.projectionMatrix,wt.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(ep,wt.coordinateSystem,wt.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)s.setRenderTarget(Y.map,q),s.clear();else{q===0&&(s.setRenderTarget(Y.map),s.clear());let wt=Y.getViewport(q);o.set(r.x*wt.x,r.y*wt.y,r.x*wt.z,r.y*wt.w),N.viewport(o)}n=Y.getFrustum(q),b(T,v,mt,$,this.type)}Y.isPointLightShadow!==!0&&this.type===fr&&y(Y,v),Y.needsUpdate=!1}p=this.type,f.needsUpdate=!1,s.setRenderTarget(A,R,P)};function y(S,T){let v=t.update(x);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,m.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),S.mapPass===null?S.mapPass=new ln(i.x,i.y,{format:ts,type:jn}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),d.uniforms.shadow_pass.value=S.map.depthTexture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(T,null,v,d,x,null),m.uniforms.shadow_pass.value=S.mapPass.texture,m.uniforms.resolution.value.set(S.map.width,S.map.height),m.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(T,null,v,m,x,null)}function _(S,T,v,A){let R=null,P=v.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)R=P;else if(R=v.isPointLight===!0?l:a,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let N=R.uuid,z=T.uuid,k=c[N];k===void 0&&(k={},c[N]=k);let F=k[z];F===void 0&&(F=R.clone(),k[z]=F,T.addEventListener("dispose",M)),R=F}if(R.visible=T.visible,R.wireframe=T.wireframe,A===fr?R.side=T.shadowSide!==null?T.shadowSide:T.side:R.side=T.shadowSide!==null?T.shadowSide:u[T.side],R.alphaMap=T.alphaMap,R.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,R.map=T.map,R.clipShadows=T.clipShadows,R.clippingPlanes=T.clippingPlanes,R.clipIntersection=T.clipIntersection,R.displacementMap=T.displacementMap,R.displacementScale=T.displacementScale,R.displacementBias=T.displacementBias,R.wireframeLinewidth=T.wireframeLinewidth,R.linewidth=T.linewidth,v.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let N=s.properties.get(R);N.light=v}return R}function b(S,T,v,A,R){if(S.visible===!1)return;if(S.layers.test(T.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&R===fr)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,S.matrixWorld);let z=t.update(S),k=S.material;if(Array.isArray(k)){let F=z.groups;for(let $=0,Y=F.length;$<Y;$++){let st=F[$],K=k[st.materialIndex];if(K&&K.visible){let tt=_(S,K,A,R);S.onBeforeShadow(s,S,T,v,z,tt,st),s.renderBufferDirect(v,null,z,tt,S,st),S.onAfterShadow(s,S,T,v,z,tt,st)}}}else if(k.visible){let F=_(S,k,A,R);S.onBeforeShadow(s,S,T,v,z,F,null),s.renderBufferDirect(v,null,z,F,S,null),S.onAfterShadow(s,S,T,v,z,F,null)}}let N=S.children;for(let z=0,k=N.length;z<k;z++)b(N[z],T,v,A,R)}function M(S){S.target.removeEventListener("dispose",M);for(let v in c){let A=c[v],R=S.target.uuid;R in A&&(A[R].dispose(),delete A[R])}}}function U_(s,t){function e(){let O=!1,yt=new Ae,et=null,vt=new Ae(0,0,0,0);return{setMask:function(St){et!==St&&!O&&(s.colorMask(St,St,St,St),et=St)},setLocked:function(St){O=St},setClear:function(St,rt,Ot,Pt,Ie){Ie===!0&&(St*=Pt,rt*=Pt,Ot*=Pt),yt.set(St,rt,Ot,Pt),vt.equals(yt)===!1&&(s.clearColor(St,rt,Ot,Pt),vt.copy(yt))},reset:function(){O=!1,et=null,vt.set(-1,0,0,0)}}}function n(){let O=!1,yt=!1,et=null,vt=null,St=null;return{setReversed:function(rt){if(yt!==rt){let Ot=t.get("EXT_clip_control");rt?Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.ZERO_TO_ONE_EXT):Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.NEGATIVE_ONE_TO_ONE_EXT),yt=rt;let Pt=St;St=null,this.setClear(Pt)}},getReversed:function(){return yt},setTest:function(rt){rt?J(s.DEPTH_TEST):ut(s.DEPTH_TEST)},setMask:function(rt){et!==rt&&!O&&(s.depthMask(rt),et=rt)},setFunc:function(rt){if(yt&&(rt=Pf[rt]),vt!==rt){switch(rt){case la:s.depthFunc(s.NEVER);break;case ca:s.depthFunc(s.ALWAYS);break;case ha:s.depthFunc(s.LESS);break;case nr:s.depthFunc(s.LEQUAL);break;case ua:s.depthFunc(s.EQUAL);break;case da:s.depthFunc(s.GEQUAL);break;case fa:s.depthFunc(s.GREATER);break;case pa:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}vt=rt}},setLocked:function(rt){O=rt},setClear:function(rt){St!==rt&&(St=rt,yt&&(rt=1-rt),s.clearDepth(rt))},reset:function(){O=!1,et=null,vt=null,St=null,yt=!1}}}function i(){let O=!1,yt=null,et=null,vt=null,St=null,rt=null,Ot=null,Pt=null,Ie=null;return{setTest:function(ye){O||(ye?J(s.STENCIL_TEST):ut(s.STENCIL_TEST))},setMask:function(ye){yt!==ye&&!O&&(s.stencilMask(ye),yt=ye)},setFunc:function(ye,Wn,ei){(et!==ye||vt!==Wn||St!==ei)&&(s.stencilFunc(ye,Wn,ei),et=ye,vt=Wn,St=ei)},setOp:function(ye,Wn,ei){(rt!==ye||Ot!==Wn||Pt!==ei)&&(s.stencilOp(ye,Wn,ei),rt=ye,Ot=Wn,Pt=ei)},setLocked:function(ye){O=ye},setClear:function(ye){Ie!==ye&&(s.clearStencil(ye),Ie=ye)},reset:function(){O=!1,yt=null,et=null,vt=null,St=null,rt=null,Ot=null,Pt=null,Ie=null}}}let r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},u={},d={},m=new WeakMap,g=[],x=null,f=!1,p=null,y=null,_=null,b=null,M=null,S=null,T=null,v=new Qt(0,0,0),A=0,R=!1,P=null,N=null,z=null,k=null,F=null,$=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,st=0,K=s.getParameter(s.VERSION);K.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(K)[1]),Y=st>=1):K.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Y=st>=2);let tt=null,q={},mt=s.getParameter(s.SCISSOR_BOX),wt=s.getParameter(s.VIEWPORT),at=new Ae().fromArray(mt),nt=new Ae().fromArray(wt);function zt(O,yt,et,vt){let St=new Uint8Array(4),rt=s.createTexture();s.bindTexture(O,rt),s.texParameteri(O,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(O,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ot=0;Ot<et;Ot++)O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY?s.texImage3D(yt,0,s.RGBA,1,1,vt,0,s.RGBA,s.UNSIGNED_BYTE,St):s.texImage2D(yt+Ot,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,St);return rt}let V={};V[s.TEXTURE_2D]=zt(s.TEXTURE_2D,s.TEXTURE_2D,1),V[s.TEXTURE_CUBE_MAP]=zt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[s.TEXTURE_2D_ARRAY]=zt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),V[s.TEXTURE_3D]=zt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(s.DEPTH_TEST),o.setFunc(nr),kt(!1),he(xh),J(s.CULL_FACE),Yt(hi);function J(O){h[O]!==!0&&(s.enable(O),h[O]=!0)}function ut(O){h[O]!==!1&&(s.disable(O),h[O]=!1)}function Rt(O,yt){return d[O]!==yt?(s.bindFramebuffer(O,yt),d[O]=yt,O===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=yt),O===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=yt),!0):!1}function ct(O,yt){let et=g,vt=!1;if(O){et=m.get(yt),et===void 0&&(et=[],m.set(yt,et));let St=O.textures;if(et.length!==St.length||et[0]!==s.COLOR_ATTACHMENT0){for(let rt=0,Ot=St.length;rt<Ot;rt++)et[rt]=s.COLOR_ATTACHMENT0+rt;et.length=St.length,vt=!0}}else et[0]!==s.BACK&&(et[0]=s.BACK,vt=!0);vt&&s.drawBuffers(et)}function Ft(O){return x!==O?(s.useProgram(O),x=O,!0):!1}let xe={[Ts]:s.FUNC_ADD,[Jd]:s.FUNC_SUBTRACT,[jd]:s.FUNC_REVERSE_SUBTRACT};xe[Qd]=s.MIN,xe[tf]=s.MAX;let qt={[ef]:s.ZERO,[nf]:s.ONE,[sf]:s.SRC_COLOR,[Mh]:s.SRC_ALPHA,[hf]:s.SRC_ALPHA_SATURATE,[lf]:s.DST_COLOR,[of]:s.DST_ALPHA,[rf]:s.ONE_MINUS_SRC_COLOR,[Sh]:s.ONE_MINUS_SRC_ALPHA,[cf]:s.ONE_MINUS_DST_COLOR,[af]:s.ONE_MINUS_DST_ALPHA,[uf]:s.CONSTANT_COLOR,[df]:s.ONE_MINUS_CONSTANT_COLOR,[ff]:s.CONSTANT_ALPHA,[pf]:s.ONE_MINUS_CONSTANT_ALPHA};function Yt(O,yt,et,vt,St,rt,Ot,Pt,Ie,ye){if(O===hi){f===!0&&(ut(s.BLEND),f=!1);return}if(f===!1&&(J(s.BLEND),f=!0),O!==Zd){if(O!==p||ye!==R){if((y!==Ts||M!==Ts)&&(s.blendEquation(s.FUNC_ADD),y=Ts,M=Ts),ye)switch(O){case pr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case vh:s.blendFunc(s.ONE,s.ONE);break;case _h:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case bh:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:$t("WebGLState: Invalid blending: ",O);break}else switch(O){case pr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case vh:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case _h:$t("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bh:$t("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$t("WebGLState: Invalid blending: ",O);break}_=null,b=null,S=null,T=null,v.set(0,0,0),A=0,p=O,R=ye}return}St=St||yt,rt=rt||et,Ot=Ot||vt,(yt!==y||St!==M)&&(s.blendEquationSeparate(xe[yt],xe[St]),y=yt,M=St),(et!==_||vt!==b||rt!==S||Ot!==T)&&(s.blendFuncSeparate(qt[et],qt[vt],qt[rt],qt[Ot]),_=et,b=vt,S=rt,T=Ot),(Pt.equals(v)===!1||Ie!==A)&&(s.blendColor(Pt.r,Pt.g,Pt.b,Ie),v.copy(Pt),A=Ie),p=O,R=!1}function oe(O,yt){O.side===Fn?ut(s.CULL_FACE):J(s.CULL_FACE);let et=O.side===en;yt&&(et=!et),kt(et),O.blending===pr&&O.transparent===!1?Yt(hi):Yt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);let vt=O.stencilWrite;a.setTest(vt),vt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),je(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?J(s.SAMPLE_ALPHA_TO_COVERAGE):ut(s.SAMPLE_ALPHA_TO_COVERAGE)}function kt(O){P!==O&&(O?s.frontFace(s.CW):s.frontFace(s.CCW),P=O)}function he(O){O!==qd?(J(s.CULL_FACE),O!==N&&(O===xh?s.cullFace(s.BACK):O===Yd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ut(s.CULL_FACE),N=O}function Ce(O){O!==z&&(Y&&s.lineWidth(O),z=O)}function je(O,yt,et){O?(J(s.POLYGON_OFFSET_FILL),(k!==yt||F!==et)&&(k=yt,F=et,o.getReversed()&&(yt=-yt),s.polygonOffset(yt,et))):ut(s.POLYGON_OFFSET_FILL)}function Te(O){O?J(s.SCISSOR_TEST):ut(s.SCISSOR_TEST)}function We(O){O===void 0&&(O=s.TEXTURE0+$-1),tt!==O&&(s.activeTexture(O),tt=O)}function U(O,yt,et){et===void 0&&(tt===null?et=s.TEXTURE0+$-1:et=tt);let vt=q[et];vt===void 0&&(vt={type:void 0,texture:void 0},q[et]=vt),(vt.type!==O||vt.texture!==yt)&&(tt!==et&&(s.activeTexture(et),tt=et),s.bindTexture(O,yt||V[O]),vt.type=O,vt.texture=yt)}function nn(){let O=q[tt];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Me(){try{s.compressedTexImage2D(...arguments)}catch(O){$t("WebGLState:",O)}}function I(){try{s.compressedTexImage3D(...arguments)}catch(O){$t("WebGLState:",O)}}function w(){try{s.texSubImage2D(...arguments)}catch(O){$t("WebGLState:",O)}}function B(){try{s.texSubImage3D(...arguments)}catch(O){$t("WebGLState:",O)}}function W(){try{s.compressedTexSubImage2D(...arguments)}catch(O){$t("WebGLState:",O)}}function j(){try{s.compressedTexSubImage3D(...arguments)}catch(O){$t("WebGLState:",O)}}function lt(){try{s.texStorage2D(...arguments)}catch(O){$t("WebGLState:",O)}}function pt(){try{s.texStorage3D(...arguments)}catch(O){$t("WebGLState:",O)}}function Q(){try{s.texImage2D(...arguments)}catch(O){$t("WebGLState:",O)}}function it(){try{s.texImage3D(...arguments)}catch(O){$t("WebGLState:",O)}}function gt(O){return u[O]!==void 0?u[O]:s.getParameter(O)}function Nt(O,yt){u[O]!==yt&&(s.pixelStorei(O,yt),u[O]=yt)}function _t(O){at.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),at.copy(O))}function xt(O){nt.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),nt.copy(O))}function Dt(O,yt){let et=c.get(yt);et===void 0&&(et=new WeakMap,c.set(yt,et));let vt=et.get(O);vt===void 0&&(vt=s.getUniformBlockIndex(yt,O.name),et.set(O,vt))}function Gt(O,yt){let vt=c.get(yt).get(O);l.get(yt)!==vt&&(s.uniformBlockBinding(yt,vt,O.__bindingPointIndex),l.set(yt,vt))}function jt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},tt=null,q={},d={},m=new WeakMap,g=[],x=null,f=!1,p=null,y=null,_=null,b=null,M=null,S=null,T=null,v=new Qt(0,0,0),A=0,R=!1,P=null,N=null,z=null,k=null,F=null,at.set(0,0,s.canvas.width,s.canvas.height),nt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:J,disable:ut,bindFramebuffer:Rt,drawBuffers:ct,useProgram:Ft,setBlending:Yt,setMaterial:oe,setFlipSided:kt,setCullFace:he,setLineWidth:Ce,setPolygonOffset:je,setScissorTest:Te,activeTexture:We,bindTexture:U,unbindTexture:nn,compressedTexImage2D:Me,compressedTexImage3D:I,texImage2D:Q,texImage3D:it,pixelStorei:Nt,getParameter:gt,updateUBOMapping:Dt,uniformBlockBinding:Gt,texStorage2D:lt,texStorage3D:pt,texSubImage2D:w,texSubImage3D:B,compressedTexSubImage2D:W,compressedTexSubImage3D:j,scissor:_t,viewport:xt,reset:jt}}function z_(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Zt,h=new WeakMap,u=new Set,d,m=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(I,w){return g?new OffscreenCanvas(I,w):qr("canvas")}function f(I,w,B){let W=1,j=Me(I);if((j.width>B||j.height>B)&&(W=B/Math.max(j.width,j.height)),W<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let lt=Math.floor(W*j.width),pt=Math.floor(W*j.height);d===void 0&&(d=x(lt,pt));let Q=w?x(lt,pt):d;return Q.width=lt,Q.height=pt,Q.getContext("2d").drawImage(I,0,0,lt,pt),Vt("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+lt+"x"+pt+")."),Q}else return"data"in I&&Vt("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),I;return I}function p(I){return I.generateMipmaps}function y(I){s.generateMipmap(I)}function _(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(I,w,B,W,j,lt=!1){if(I!==null){if(s[I]!==void 0)return s[I];Vt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let pt;W&&(pt=t.get("EXT_texture_norm16"),pt||Vt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=w;if(w===s.RED&&(B===s.FLOAT&&(Q=s.R32F),B===s.HALF_FLOAT&&(Q=s.R16F),B===s.UNSIGNED_BYTE&&(Q=s.R8),B===s.UNSIGNED_SHORT&&pt&&(Q=pt.R16_EXT),B===s.SHORT&&pt&&(Q=pt.R16_SNORM_EXT)),w===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(Q=s.R8UI),B===s.UNSIGNED_SHORT&&(Q=s.R16UI),B===s.UNSIGNED_INT&&(Q=s.R32UI),B===s.BYTE&&(Q=s.R8I),B===s.SHORT&&(Q=s.R16I),B===s.INT&&(Q=s.R32I)),w===s.RG&&(B===s.FLOAT&&(Q=s.RG32F),B===s.HALF_FLOAT&&(Q=s.RG16F),B===s.UNSIGNED_BYTE&&(Q=s.RG8),B===s.UNSIGNED_SHORT&&pt&&(Q=pt.RG16_EXT),B===s.SHORT&&pt&&(Q=pt.RG16_SNORM_EXT)),w===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(Q=s.RG8UI),B===s.UNSIGNED_SHORT&&(Q=s.RG16UI),B===s.UNSIGNED_INT&&(Q=s.RG32UI),B===s.BYTE&&(Q=s.RG8I),B===s.SHORT&&(Q=s.RG16I),B===s.INT&&(Q=s.RG32I)),w===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),B===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),B===s.UNSIGNED_INT&&(Q=s.RGB32UI),B===s.BYTE&&(Q=s.RGB8I),B===s.SHORT&&(Q=s.RGB16I),B===s.INT&&(Q=s.RGB32I)),w===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),B===s.UNSIGNED_INT&&(Q=s.RGBA32UI),B===s.BYTE&&(Q=s.RGBA8I),B===s.SHORT&&(Q=s.RGBA16I),B===s.INT&&(Q=s.RGBA32I)),w===s.RGB&&(B===s.UNSIGNED_SHORT&&pt&&(Q=pt.RGB16_EXT),B===s.SHORT&&pt&&(Q=pt.RGB16_SNORM_EXT),B===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),B===s.UNSIGNED_INT_10F_11F_11F_REV&&(Q=s.R11F_G11F_B10F)),w===s.RGBA){let it=lt?$r:le.getTransfer(j);B===s.FLOAT&&(Q=s.RGBA32F),B===s.HALF_FLOAT&&(Q=s.RGBA16F),B===s.UNSIGNED_BYTE&&(Q=it===_e?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT&&pt&&(Q=pt.RGBA16_EXT),B===s.SHORT&&pt&&(Q=pt.RGBA16_SNORM_EXT),B===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function M(I,w){let B;return I?w===null||w===Jn||w===gr?B=s.DEPTH24_STENCIL8:w===Sn?B=s.DEPTH32F_STENCIL8:w===mr&&(B=s.DEPTH24_STENCIL8,Vt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Jn||w===gr?B=s.DEPTH_COMPONENT24:w===Sn?B=s.DEPTH_COMPONENT32F:w===mr&&(B=s.DEPTH_COMPONENT16),B}function S(I,w){return p(I)===!0||I.isFramebufferTexture&&I.minFilter!==Ge&&I.minFilter!==qe?Math.log2(Math.max(w.width,w.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?w.mipmaps.length:1}function T(I){let w=I.target;w.removeEventListener("dispose",T),A(w),w.isVideoTexture&&h.delete(w),w.isHTMLTexture&&u.delete(w)}function v(I){let w=I.target;w.removeEventListener("dispose",v),P(w)}function A(I){let w=n.get(I);if(w.__webglInit===void 0)return;let B=I.source,W=m.get(B);if(W){let j=W[w.__cacheKey];j.usedTimes--,j.usedTimes===0&&R(I),Object.keys(W).length===0&&m.delete(B)}n.remove(I)}function R(I){let w=n.get(I);s.deleteTexture(w.__webglTexture);let B=I.source,W=m.get(B);delete W[w.__cacheKey],o.memory.textures--}function P(I){let w=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(w.__webglFramebuffer[W]))for(let j=0;j<w.__webglFramebuffer[W].length;j++)s.deleteFramebuffer(w.__webglFramebuffer[W][j]);else s.deleteFramebuffer(w.__webglFramebuffer[W]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[W])}else{if(Array.isArray(w.__webglFramebuffer))for(let W=0;W<w.__webglFramebuffer.length;W++)s.deleteFramebuffer(w.__webglFramebuffer[W]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let W=0;W<w.__webglColorRenderbuffer.length;W++)w.__webglColorRenderbuffer[W]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[W]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let B=I.textures;for(let W=0,j=B.length;W<j;W++){let lt=n.get(B[W]);lt.__webglTexture&&(s.deleteTexture(lt.__webglTexture),o.memory.textures--),n.remove(B[W])}n.remove(I)}let N=0;function z(){N=0}function k(){return N}function F(I){N=I}function $(){let I=N;return I>=i.maxTextures&&Vt("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+i.maxTextures),N+=1,I}function Y(I){let w=[];return w.push(I.wrapS),w.push(I.wrapT),w.push(I.wrapR||0),w.push(I.magFilter),w.push(I.minFilter),w.push(I.anisotropy),w.push(I.internalFormat),w.push(I.format),w.push(I.type),w.push(I.generateMipmaps),w.push(I.premultiplyAlpha),w.push(I.flipY),w.push(I.unpackAlignment),w.push(I.colorSpace),w.join()}function st(I,w){let B=n.get(I);if(I.isVideoTexture&&U(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&B.__version!==I.version){let W=I.image;if(W===null)Vt("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Vt("WebGLRenderer: Texture marked for update but image is incomplete");else{ut(B,I,w);return}}else I.isExternalTexture&&(B.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+w)}function K(I,w){let B=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&B.__version!==I.version){ut(B,I,w);return}else I.isExternalTexture&&(B.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+w)}function tt(I,w){let B=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&B.__version!==I.version){ut(B,I,w);return}e.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+w)}function q(I,w){let B=n.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&B.__version!==I.version){Rt(B,I,w);return}e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+w)}let mt={[ma]:s.REPEAT,[si]:s.CLAMP_TO_EDGE,[ga]:s.MIRRORED_REPEAT},wt={[Ge]:s.NEAREST,[xf]:s.NEAREST_MIPMAP_NEAREST,[co]:s.NEAREST_MIPMAP_LINEAR,[qe]:s.LINEAR,[Ga]:s.LINEAR_MIPMAP_NEAREST,[ji]:s.LINEAR_MIPMAP_LINEAR},at={[bf]:s.NEVER,[Ef]:s.ALWAYS,[Mf]:s.LESS,[El]:s.LEQUAL,[Sf]:s.EQUAL,[Al]:s.GEQUAL,[wf]:s.GREATER,[Tf]:s.NOTEQUAL};function nt(I,w){if(w.type===Sn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===qe||w.magFilter===Ga||w.magFilter===co||w.magFilter===ji||w.minFilter===qe||w.minFilter===Ga||w.minFilter===co||w.minFilter===ji)&&Vt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,mt[w.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,mt[w.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,mt[w.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,wt[w.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,wt[w.minFilter]),w.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,at[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Ge||w.minFilter!==co&&w.minFilter!==ji||w.type===Sn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");s.texParameterf(I,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function zt(I,w){let B=!1;I.__webglInit===void 0&&(I.__webglInit=!0,w.addEventListener("dispose",T));let W=w.source,j=m.get(W);j===void 0&&(j={},m.set(W,j));let lt=Y(w);if(lt!==I.__cacheKey){j[lt]===void 0&&(j[lt]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,B=!0),j[lt].usedTimes++;let pt=j[I.__cacheKey];pt!==void 0&&(j[I.__cacheKey].usedTimes--,pt.usedTimes===0&&R(w)),I.__cacheKey=lt,I.__webglTexture=j[lt].texture}return B}function V(I,w,B){return Math.floor(Math.floor(I/B)/w)}function J(I,w,B,W){let lt=I.updateRanges;if(lt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,w.width,w.height,B,W,w.data);else{lt.sort((Nt,_t)=>Nt.start-_t.start);let pt=0;for(let Nt=1;Nt<lt.length;Nt++){let _t=lt[pt],xt=lt[Nt],Dt=_t.start+_t.count,Gt=V(xt.start,w.width,4),jt=V(_t.start,w.width,4);xt.start<=Dt+1&&Gt===jt&&V(xt.start+xt.count-1,w.width,4)===Gt?_t.count=Math.max(_t.count,xt.start+xt.count-_t.start):(++pt,lt[pt]=xt)}lt.length=pt+1;let Q=e.getParameter(s.UNPACK_ROW_LENGTH),it=e.getParameter(s.UNPACK_SKIP_PIXELS),gt=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,w.width);for(let Nt=0,_t=lt.length;Nt<_t;Nt++){let xt=lt[Nt],Dt=Math.floor(xt.start/4),Gt=Math.ceil(xt.count/4),jt=Dt%w.width,O=Math.floor(Dt/w.width),yt=Gt,et=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,jt),e.pixelStorei(s.UNPACK_SKIP_ROWS,O),e.texSubImage2D(s.TEXTURE_2D,0,jt,O,yt,et,B,W,w.data)}I.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,Q),e.pixelStorei(s.UNPACK_SKIP_PIXELS,it),e.pixelStorei(s.UNPACK_SKIP_ROWS,gt)}}function ut(I,w,B){let W=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(W=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(W=s.TEXTURE_3D);let j=zt(I,w),lt=w.source;e.bindTexture(W,I.__webglTexture,s.TEXTURE0+B);let pt=n.get(lt);if(lt.version!==pt.__version||j===!0){if(e.activeTexture(s.TEXTURE0+B),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){let et=le.getPrimaries(le.workingColorSpace),vt=w.colorSpace===Ai?null:le.getPrimaries(w.colorSpace),St=w.colorSpace===Ai||et===vt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,St)}e.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment);let it=f(w.image,!1,i.maxTextureSize);it=nn(w,it);let gt=r.convert(w.format,w.colorSpace),Nt=r.convert(w.type),_t=b(w.internalFormat,gt,Nt,w.normalized,w.colorSpace,w.isVideoTexture);nt(W,w);let xt,Dt=w.mipmaps,Gt=w.isVideoTexture!==!0,jt=pt.__version===void 0||j===!0,O=lt.dataReady,yt=S(w,it);if(w.isDepthTexture)_t=M(w.format===Qi,w.type),jt&&(Gt?e.texStorage2D(s.TEXTURE_2D,1,_t,it.width,it.height):e.texImage2D(s.TEXTURE_2D,0,_t,it.width,it.height,0,gt,Nt,null));else if(w.isDataTexture)if(Dt.length>0){Gt&&jt&&e.texStorage2D(s.TEXTURE_2D,yt,_t,Dt[0].width,Dt[0].height);for(let et=0,vt=Dt.length;et<vt;et++)xt=Dt[et],Gt?O&&e.texSubImage2D(s.TEXTURE_2D,et,0,0,xt.width,xt.height,gt,Nt,xt.data):e.texImage2D(s.TEXTURE_2D,et,_t,xt.width,xt.height,0,gt,Nt,xt.data);w.generateMipmaps=!1}else Gt?(jt&&e.texStorage2D(s.TEXTURE_2D,yt,_t,it.width,it.height),O&&J(w,it,gt,Nt)):e.texImage2D(s.TEXTURE_2D,0,_t,it.width,it.height,0,gt,Nt,it.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Gt&&jt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,yt,_t,Dt[0].width,Dt[0].height,it.depth);for(let et=0,vt=Dt.length;et<vt;et++)if(xt=Dt[et],w.format!==wn)if(gt!==null)if(Gt){if(O)if(w.layerUpdates.size>0){let St=qh(xt.width,xt.height,w.format,w.type);for(let rt of w.layerUpdates){let Ot=xt.data.subarray(rt*St/xt.data.BYTES_PER_ELEMENT,(rt+1)*St/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,et,0,0,rt,xt.width,xt.height,1,gt,Ot)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,et,0,0,0,xt.width,xt.height,it.depth,gt,xt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,et,_t,xt.width,xt.height,it.depth,0,xt.data,0,0);else Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?O&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,et,0,0,0,xt.width,xt.height,it.depth,gt,Nt,xt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,et,_t,xt.width,xt.height,it.depth,0,gt,Nt,xt.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{Gt&&jt&&e.texStorage2D(s.TEXTURE_2D,yt,_t,Dt[0].width,Dt[0].height);for(let et=0,vt=Dt.length;et<vt;et++)xt=Dt[et],w.format!==wn?gt!==null?Gt?O&&e.compressedTexSubImage2D(s.TEXTURE_2D,et,0,0,xt.width,xt.height,gt,xt.data):e.compressedTexImage2D(s.TEXTURE_2D,et,_t,xt.width,xt.height,0,xt.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?O&&e.texSubImage2D(s.TEXTURE_2D,et,0,0,xt.width,xt.height,gt,Nt,xt.data):e.texImage2D(s.TEXTURE_2D,et,_t,xt.width,xt.height,0,gt,Nt,xt.data)}else if(w.isDataArrayTexture)if(Gt){if(jt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,yt,_t,it.width,it.height,it.depth),O)if(w.layerUpdates.size>0){let et=qh(it.width,it.height,w.format,w.type);for(let vt of w.layerUpdates){let St=it.data.subarray(vt*et/it.data.BYTES_PER_ELEMENT,(vt+1)*et/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,vt,it.width,it.height,1,gt,Nt,St)}w.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,gt,Nt,it.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,_t,it.width,it.height,it.depth,0,gt,Nt,it.data);else if(w.isData3DTexture)Gt?(jt&&e.texStorage3D(s.TEXTURE_3D,yt,_t,it.width,it.height,it.depth),O&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,gt,Nt,it.data)):e.texImage3D(s.TEXTURE_3D,0,_t,it.width,it.height,it.depth,0,gt,Nt,it.data);else if(w.isFramebufferTexture){if(jt)if(Gt)e.texStorage2D(s.TEXTURE_2D,yt,_t,it.width,it.height);else{let et=it.width,vt=it.height;for(let St=0;St<yt;St++)e.texImage2D(s.TEXTURE_2D,St,_t,et,vt,0,gt,Nt,null),et>>=1,vt>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in s){let et=s.canvas;if(et.hasAttribute("layoutsubtree")||et.setAttribute("layoutsubtree","true"),it.parentNode!==et){et.appendChild(it),u.add(w),et.onpaint=vt=>{let St=vt.changedElements;for(let rt of u)St.includes(rt.image)&&(rt.needsUpdate=!0)},et.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,it);else{let St=s.RGBA,rt=s.RGBA,Ot=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,St,rt,Ot,it)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Dt.length>0){if(Gt&&jt){let et=Me(Dt[0]);e.texStorage2D(s.TEXTURE_2D,yt,_t,et.width,et.height)}for(let et=0,vt=Dt.length;et<vt;et++)xt=Dt[et],Gt?O&&e.texSubImage2D(s.TEXTURE_2D,et,0,0,gt,Nt,xt):e.texImage2D(s.TEXTURE_2D,et,_t,gt,Nt,xt);w.generateMipmaps=!1}else if(Gt){if(jt){let et=Me(it);e.texStorage2D(s.TEXTURE_2D,yt,_t,et.width,et.height)}O&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,gt,Nt,it)}else e.texImage2D(s.TEXTURE_2D,0,_t,gt,Nt,it);p(w)&&y(W),pt.__version=lt.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function Rt(I,w,B){if(w.image.length!==6)return;let W=zt(I,w),j=w.source;e.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+B);let lt=n.get(j);if(j.version!==lt.__version||W===!0){e.activeTexture(s.TEXTURE0+B);let pt=le.getPrimaries(le.workingColorSpace),Q=w.colorSpace===Ai?null:le.getPrimaries(w.colorSpace),it=w.colorSpace===Ai||pt===Q?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);let gt=w.isCompressedTexture||w.image[0].isCompressedTexture,Nt=w.image[0]&&w.image[0].isDataTexture,_t=[];for(let rt=0;rt<6;rt++)!gt&&!Nt?_t[rt]=f(w.image[rt],!0,i.maxCubemapSize):_t[rt]=Nt?w.image[rt].image:w.image[rt],_t[rt]=nn(w,_t[rt]);let xt=_t[0],Dt=r.convert(w.format,w.colorSpace),Gt=r.convert(w.type),jt=b(w.internalFormat,Dt,Gt,w.normalized,w.colorSpace),O=w.isVideoTexture!==!0,yt=lt.__version===void 0||W===!0,et=j.dataReady,vt=S(w,xt);nt(s.TEXTURE_CUBE_MAP,w);let St;if(gt){O&&yt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,vt,jt,xt.width,xt.height);for(let rt=0;rt<6;rt++){St=_t[rt].mipmaps;for(let Ot=0;Ot<St.length;Ot++){let Pt=St[Ot];w.format!==wn?Dt!==null?O?et&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot,0,0,Pt.width,Pt.height,Dt,Pt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot,jt,Pt.width,Pt.height,0,Pt.data):Vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot,0,0,Pt.width,Pt.height,Dt,Gt,Pt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot,jt,Pt.width,Pt.height,0,Dt,Gt,Pt.data)}}}else{if(St=w.mipmaps,O&&yt){St.length>0&&vt++;let rt=Me(_t[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,vt,jt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(Nt){O?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,_t[rt].width,_t[rt].height,Dt,Gt,_t[rt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,jt,_t[rt].width,_t[rt].height,0,Dt,Gt,_t[rt].data);for(let Ot=0;Ot<St.length;Ot++){let Ie=St[Ot].image[rt].image;O?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot+1,0,0,Ie.width,Ie.height,Dt,Gt,Ie.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot+1,jt,Ie.width,Ie.height,0,Dt,Gt,Ie.data)}}else{O?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Dt,Gt,_t[rt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,jt,Dt,Gt,_t[rt]);for(let Ot=0;Ot<St.length;Ot++){let Pt=St[Ot];O?et&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot+1,0,0,Dt,Gt,Pt.image[rt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ot+1,jt,Dt,Gt,Pt.image[rt])}}}p(w)&&y(s.TEXTURE_CUBE_MAP),lt.__version=j.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function ct(I,w,B,W,j,lt){let pt=r.convert(B.format,B.colorSpace),Q=r.convert(B.type),it=b(B.internalFormat,pt,Q,B.normalized,B.colorSpace),gt=n.get(w),Nt=n.get(B);if(Nt.__renderTarget=w,!gt.__hasExternalTextures){let _t=Math.max(1,w.width>>lt),xt=Math.max(1,w.height>>lt);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?e.texImage3D(j,lt,it,_t,xt,w.depth,0,pt,Q,null):e.texImage2D(j,lt,it,_t,xt,0,pt,Q,null)}e.bindFramebuffer(s.FRAMEBUFFER,I),We(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,W,j,Nt.__webglTexture,0,Te(w)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,W,j,Nt.__webglTexture,lt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ft(I,w,B){if(s.bindRenderbuffer(s.RENDERBUFFER,I),w.depthBuffer){let W=w.depthTexture,j=W&&W.isDepthTexture?W.type:null,lt=M(w.stencilBuffer,j),pt=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;We(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Te(w),lt,w.width,w.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,Te(w),lt,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,lt,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,pt,s.RENDERBUFFER,I)}else{let W=w.textures;for(let j=0;j<W.length;j++){let lt=W[j],pt=r.convert(lt.format,lt.colorSpace),Q=r.convert(lt.type),it=b(lt.internalFormat,pt,Q,lt.normalized,lt.colorSpace);We(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Te(w),it,w.width,w.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,Te(w),it,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,it,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function xe(I,w,B){let W=w.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,I),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let j=n.get(w.depthTexture);if(j.__renderTarget=w,(!j.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),W){if(j.__webglInit===void 0&&(j.__webglInit=!0,w.depthTexture.addEventListener("dispose",T)),j.__webglTexture===void 0){j.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture),nt(s.TEXTURE_CUBE_MAP,w.depthTexture);let gt=r.convert(w.depthTexture.format),Nt=r.convert(w.depthTexture.type),_t;w.depthTexture.format===ri?_t=s.DEPTH_COMPONENT24:w.depthTexture.format===Qi&&(_t=s.DEPTH24_STENCIL8);for(let xt=0;xt<6;xt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,_t,w.width,w.height,0,gt,Nt,null)}}else st(w.depthTexture,0);let lt=j.__webglTexture,pt=Te(w),Q=W?s.TEXTURE_CUBE_MAP_POSITIVE_X+B:s.TEXTURE_2D,it=w.depthTexture.format===Qi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(w.depthTexture.format===ri)We(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,it,Q,lt,0,pt):s.framebufferTexture2D(s.FRAMEBUFFER,it,Q,lt,0);else if(w.depthTexture.format===Qi)We(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,it,Q,lt,0,pt):s.framebufferTexture2D(s.FRAMEBUFFER,it,Q,lt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function qt(I){let w=n.get(I),B=I.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==I.depthTexture){let W=I.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),W){let j=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,W.removeEventListener("dispose",j)};W.addEventListener("dispose",j),w.__depthDisposeCallback=j}w.__boundDepthTexture=W}if(I.depthTexture&&!w.__autoAllocateDepthBuffer)if(B)for(let W=0;W<6;W++)xe(w.__webglFramebuffer[W],I,W);else{let W=I.texture.mipmaps;W&&W.length>0?xe(w.__webglFramebuffer[0],I,0):xe(w.__webglFramebuffer,I,0)}else if(B){w.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[W]),w.__webglDepthbuffer[W]===void 0)w.__webglDepthbuffer[W]=s.createRenderbuffer(),Ft(w.__webglDepthbuffer[W],I,!1);else{let j=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,lt=w.__webglDepthbuffer[W];s.bindRenderbuffer(s.RENDERBUFFER,lt),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,lt)}}else{let W=I.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),Ft(w.__webglDepthbuffer,I,!1);else{let j=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,lt=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,lt),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,lt)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Yt(I,w,B){let W=n.get(I);w!==void 0&&ct(W.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&qt(I)}function oe(I){let w=I.texture,B=n.get(I),W=n.get(w);I.addEventListener("dispose",v);let j=I.textures,lt=I.isWebGLCubeRenderTarget===!0,pt=j.length>1;if(pt||(W.__webglTexture===void 0&&(W.__webglTexture=s.createTexture()),W.__version=w.version,o.memory.textures++),lt){B.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer[Q]=[];for(let it=0;it<w.mipmaps.length;it++)B.__webglFramebuffer[Q][it]=s.createFramebuffer()}else B.__webglFramebuffer[Q]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer=[];for(let Q=0;Q<w.mipmaps.length;Q++)B.__webglFramebuffer[Q]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(pt)for(let Q=0,it=j.length;Q<it;Q++){let gt=n.get(j[Q]);gt.__webglTexture===void 0&&(gt.__webglTexture=s.createTexture(),o.memory.textures++)}if(I.samples>0&&We(I)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Q=0;Q<j.length;Q++){let it=j[Q];B.__webglColorRenderbuffer[Q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[Q]);let gt=r.convert(it.format,it.colorSpace),Nt=r.convert(it.type),_t=b(it.internalFormat,gt,Nt,it.normalized,it.colorSpace,I.isXRRenderTarget===!0),xt=Te(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,xt,_t,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Q,s.RENDERBUFFER,B.__webglColorRenderbuffer[Q])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),Ft(B.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(lt){e.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture),nt(s.TEXTURE_CUBE_MAP,w);for(let Q=0;Q<6;Q++)if(w.mipmaps&&w.mipmaps.length>0)for(let it=0;it<w.mipmaps.length;it++)ct(B.__webglFramebuffer[Q][it],I,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,it);else ct(B.__webglFramebuffer[Q],I,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(w)&&y(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let Q=0,it=j.length;Q<it;Q++){let gt=j[Q],Nt=n.get(gt),_t=s.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(_t=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(_t,Nt.__webglTexture),nt(_t,gt),ct(B.__webglFramebuffer,I,gt,s.COLOR_ATTACHMENT0+Q,_t,0),p(gt)&&y(_t)}e.unbindTexture()}else{let Q=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Q=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Q,W.__webglTexture),nt(Q,w),w.mipmaps&&w.mipmaps.length>0)for(let it=0;it<w.mipmaps.length;it++)ct(B.__webglFramebuffer[it],I,w,s.COLOR_ATTACHMENT0,Q,it);else ct(B.__webglFramebuffer,I,w,s.COLOR_ATTACHMENT0,Q,0);p(w)&&y(Q),e.unbindTexture()}I.depthBuffer&&qt(I)}function kt(I){let w=I.textures;for(let B=0,W=w.length;B<W;B++){let j=w[B];if(p(j)){let lt=_(I),pt=n.get(j).__webglTexture;e.bindTexture(lt,pt),y(lt),e.unbindTexture()}}}let he=[],Ce=[];function je(I){if(I.samples>0){if(We(I)===!1){let w=I.textures,B=I.width,W=I.height,j=s.COLOR_BUFFER_BIT,lt=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pt=n.get(I),Q=w.length>1;if(Q)for(let gt=0;gt<w.length;gt++)e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer);let it=I.texture.mipmaps;it&&it.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,pt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let gt=0;gt<w.length;gt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),Q){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,pt.__webglColorRenderbuffer[gt]);let Nt=n.get(w[gt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Nt,0)}s.blitFramebuffer(0,0,B,W,0,0,B,W,j,s.NEAREST),l===!0&&(he.length=0,Ce.length=0,he.push(s.COLOR_ATTACHMENT0+gt),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(he.push(lt),Ce.push(lt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ce)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,he))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Q)for(let gt=0;gt<w.length;gt++){e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.RENDERBUFFER,pt.__webglColorRenderbuffer[gt]);let Nt=n.get(w[gt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.TEXTURE_2D,Nt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&l){let w=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function Te(I){return Math.min(i.maxSamples,I.samples)}function We(I){let w=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function U(I){let w=o.render.frame;h.get(I)!==w&&(h.set(I,w),I.update())}function nn(I,w){let B=I.colorSpace,W=I.format,j=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||B!==_s&&B!==Ai&&(le.getTransfer(B)===_e?(W!==wn||j!==Mn)&&Vt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$t("WebGLTextures: Unsupported texture color space:",B)),w}function Me(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=z,this.getTextureUnits=k,this.setTextureUnits=F,this.setTexture2D=st,this.setTexture2DArray=K,this.setTexture3D=tt,this.setTextureCube=q,this.rebindTextures=Yt,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=qt,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=We,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function F_(s,t){function e(n,i=Ai){let r,o=le.getTransfer(i);if(n===Mn)return s.UNSIGNED_BYTE;if(n===Wa)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Xa)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Dh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Oh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===kh)return s.BYTE;if(n===Nh)return s.SHORT;if(n===mr)return s.UNSIGNED_SHORT;if(n===Va)return s.INT;if(n===Jn)return s.UNSIGNED_INT;if(n===Sn)return s.FLOAT;if(n===jn)return s.HALF_FLOAT;if(n===Uh)return s.ALPHA;if(n===zh)return s.RGB;if(n===wn)return s.RGBA;if(n===ri)return s.DEPTH_COMPONENT;if(n===Qi)return s.DEPTH_STENCIL;if(n===$a)return s.RED;if(n===qa)return s.RED_INTEGER;if(n===ts)return s.RG;if(n===Ya)return s.RG_INTEGER;if(n===Ka)return s.RGBA_INTEGER;if(n===ho||n===uo||n===fo||n===po)if(o===_e)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ho)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ho)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===uo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===po)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Za||n===Ja||n===ja||n===Qa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Za)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ja)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ja)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===tl||n===el||n===nl||n===il||n===sl||n===mo||n===rl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===tl||n===el)return o===_e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===nl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===il)return r.COMPRESSED_R11_EAC;if(n===sl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===mo)return r.COMPRESSED_RG11_EAC;if(n===rl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ol||n===al||n===ll||n===cl||n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===xl||n===yl||n===vl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ol)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===al)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ll)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===cl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===hl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ul)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===dl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===pl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ml)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===gl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===_l||n===bl||n===Ml)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===_l)return o===_e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ml)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Sl||n===wl||n===go||n===Tl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Sl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===go)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Tl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===gr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var B_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,H_=`
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

}`,du=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new to(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Be({vertexShader:B_,fragmentShader:H_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new se(new kn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},fu=class extends oi{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,m=null,g=null,x=typeof XRWebGLBinding<"u",f=new du,p={},y=e.getContextAttributes(),_=null,b=null,M=[],S=[],T=new Zt,v=null,A=null,R=new an;R.viewport=new Ae;let P=new an;P.viewport=new Ae;let N=[R,P],z=new za,k=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let J=M[V];return J===void 0&&(J=new ar,M[V]=J),J.getTargetRaySpace()},this.getControllerGrip=function(V){let J=M[V];return J===void 0&&(J=new ar,M[V]=J),J.getGripSpace()},this.getHand=function(V){let J=M[V];return J===void 0&&(J=new ar,M[V]=J),J.getHandSpace()};function $(V){let J=S.indexOf(V.inputSource);if(J===-1)return;let ut=M[J];ut!==void 0&&(ut.update(V.inputSource,V.frame,c||o),ut.dispatchEvent({type:V.type,data:V.inputSource}))}function Y(){i.removeEventListener("select",$),i.removeEventListener("selectstart",$),i.removeEventListener("selectend",$),i.removeEventListener("squeeze",$),i.removeEventListener("squeezestart",$),i.removeEventListener("squeezeend",$),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",st);for(let V=0;V<M.length;V++){let J=S[V];J!==null&&(S[V]=null,M[V].disconnect(J))}k=null,F=null,f.reset();for(let V in p)delete p[V];if(t.setRenderTarget(_),m=null,d=null,u=null,i=null,b=null,zt.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(T.width,T.height,!1),A!==null){let V=A.camera;V.fov=A.fov,V.zoom=A.zoom,V.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&Vt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,n.isPresenting===!0&&Vt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(i,e)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(V){if(i=V,i!==null){if(_=t.getRenderTarget(),i.addEventListener("select",$),i.addEventListener("selectstart",$),i.addEventListener("selectend",$),i.addEventListener("squeeze",$),i.addEventListener("squeezestart",$),i.addEventListener("squeezeend",$),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",st),y.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(T),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ut=null,Rt=null,ct=null;y.depth&&(ct=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ut=y.stencil?Qi:ri,Rt=y.stencil?gr:Jn);let Ft={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ft),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new ln(d.textureWidth,d.textureHeight,{format:wn,type:Mn,depthTexture:new Gi(d.textureWidth,d.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,ut),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ut={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(i,e,ut),i.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new ln(m.framebufferWidth,m.framebufferHeight,{format:wn,type:Mn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),zt.setContext(i),zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function st(V){for(let J=0;J<V.removed.length;J++){let ut=V.removed[J],Rt=S.indexOf(ut);Rt>=0&&(S[Rt]=null,M[Rt].disconnect(ut))}for(let J=0;J<V.added.length;J++){let ut=V.added[J],Rt=S.indexOf(ut);if(Rt===-1){for(let Ft=0;Ft<M.length;Ft++)if(Ft>=S.length){S.push(ut),Rt=Ft;break}else if(S[Ft]===null){S[Ft]=ut,Rt=Ft;break}if(Rt===-1)break}let ct=M[Rt];ct&&ct.connect(ut)}}let K=new L,tt=new L;function q(V,J,ut){K.setFromMatrixPosition(J.matrixWorld),tt.setFromMatrixPosition(ut.matrixWorld);let Rt=K.distanceTo(tt),ct=J.projectionMatrix.elements,Ft=ut.projectionMatrix.elements,xe=ct[14]/(ct[10]-1),qt=ct[14]/(ct[10]+1),Yt=(ct[9]+1)/ct[5],oe=(ct[9]-1)/ct[5],kt=(ct[8]-1)/ct[0],he=(Ft[8]+1)/Ft[0],Ce=xe*kt,je=xe*he,Te=Rt/(-kt+he),We=Te*-kt;if(J.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(We),V.translateZ(Te),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),ct[10]===-1)V.projectionMatrix.copy(J.projectionMatrix),V.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let U=xe+Te,nn=qt+Te,Me=Ce-We,I=je+(Rt-We),w=Yt*qt/nn*U,B=oe*qt/nn*U;V.projectionMatrix.makePerspective(Me,I,w,B,U,nn),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function mt(V,J){J===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(J.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(i===null)return;let J=V.near,ut=V.far;f.texture!==null&&(f.depthNear>0&&(J=f.depthNear),f.depthFar>0&&(ut=f.depthFar)),z.near=P.near=R.near=J,z.far=P.far=R.far=ut,(k!==z.near||F!==z.far)&&(i.updateRenderState({depthNear:z.near,depthFar:z.far}),k=z.near,F=z.far),z.layers.mask=V.layers.mask|6,R.layers.mask=z.layers.mask&-5,P.layers.mask=z.layers.mask&-3;let Rt=V.parent,ct=z.cameras;mt(z,Rt);for(let Ft=0;Ft<ct.length;Ft++)mt(ct[Ft],Rt);ct.length===2?q(z,R,P):z.projectionMatrix.copy(R.projectionMatrix),A===null&&V.isPerspectiveCamera&&(A={camera:V,fov:V.fov,zoom:V.zoom}),wt(V,z,Rt)};function wt(V,J,ut){ut===null?V.matrix.copy(J.matrixWorld):(V.matrix.copy(ut.matrixWorld),V.matrix.invert(),V.matrix.multiply(J.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(J.projectionMatrix),V.projectionMatrixInverse.copy(J.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=rr*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(V){l=V,d!==null&&(d.fixedFoveation=V),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=V)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(z)},this.getCameraTexture=function(V){return p[V]};let at=null;function nt(V,J){if(h=J.getViewerPose(c||o),g=J,h!==null){let ut=h.views;m!==null&&(t.setRenderTargetFramebuffer(b,m.framebuffer),t.setRenderTarget(b));let Rt=!1;ut.length!==z.cameras.length&&(z.cameras.length=0,Rt=!0);for(let qt=0;qt<ut.length;qt++){let Yt=ut[qt],oe=null;if(m!==null)oe=m.getViewport(Yt);else{let he=u.getViewSubImage(d,Yt);oe=he.viewport,qt===0&&(t.setRenderTargetTextures(b,he.colorTexture,he.depthStencilTexture),t.setRenderTarget(b))}let kt=N[qt];kt===void 0&&(kt=new an,kt.layers.enable(qt),kt.viewport=new Ae,N[qt]=kt),kt.matrix.fromArray(Yt.transform.matrix),kt.matrix.decompose(kt.position,kt.quaternion,kt.scale),kt.projectionMatrix.fromArray(Yt.projectionMatrix),kt.projectionMatrixInverse.copy(kt.projectionMatrix).invert(),kt.viewport.set(oe.x,oe.y,oe.width,oe.height),qt===0&&(z.matrix.copy(kt.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Rt===!0&&z.cameras.push(kt)}let ct=i.enabledFeatures;if(ct&&ct.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let qt=u.getDepthInformation(ut[0]);qt&&qt.isValid&&qt.texture&&f.init(qt,i.renderState)}if(ct&&ct.includes("camera-access")&&x){t.state.unbindTexture(),u=n.getBinding();for(let qt=0;qt<ut.length;qt++){let Yt=ut[qt].camera;if(Yt){let oe=p[Yt];oe||(oe=new to,p[Yt]=oe);let kt=u.getCameraImage(Yt);oe.sourceTexture=kt}}}}for(let ut=0;ut<M.length;ut++){let Rt=S[ut],ct=M[ut];Rt!==null&&ct!==void 0&&ct.update(Rt,J,c||o)}at&&at(V,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}let zt=new np;zt.setAnimationLoop(nt),this.setAnimationLoop=function(V){at=V},this.dispose=function(){}}},G_=new ae,lp=new Xt;lp.set(-1,0,0,0,1,0,0,0,1);function V_(s,t){function e(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function n(f,p){p.color.getRGB(f.fogColor.value,Wh(s)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function i(f,p,y,_,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(f,p):p.isMeshLambertMaterial?(r(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(f,p),u(f,p)):p.isMeshPhongMaterial?(r(f,p),h(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(f,p),d(f,p),p.isMeshPhysicalMaterial&&m(f,p,b)):p.isMeshMatcapMaterial?(r(f,p),g(f,p)):p.isMeshDepthMaterial?r(f,p):p.isMeshDistanceMaterial?(r(f,p),x(f,p)):p.isMeshNormalMaterial?r(f,p):p.isLineBasicMaterial?(o(f,p),p.isLineDashedMaterial&&a(f,p)):p.isPointsMaterial?l(f,p,y,_):p.isSpriteMaterial?c(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,e(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===en&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,e(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===en&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,e(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,e(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);let y=t.get(p),_=y.envMap,b=y.envMapRotation;_&&(f.envMap.value=_,f.envMapRotation.value.setFromMatrix4(G_.makeRotationFromEuler(b)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(lp),f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap&&(f.lightMap.value=p.lightMap,f.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,f.lightMapTransform)),p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,f.aoMapTransform))}function o(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform))}function a(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function l(f,p,y,_){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*y,f.scale.value=_*.5,p.map&&(f.map.value=p.map,e(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function c(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function h(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function u(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function d(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,f.roughnessMapTransform)),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function m(f,p,y){f.ior.value=p.ior,p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===en&&f.clearcoatNormalScale.value.negate())),p.dispersion>0&&(f.dispersion.value=p.dispersion),p.retroreflectivity>0&&(f.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=y.texture,f.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,p){p.matcap&&(f.matcap.value=p.matcap)}function x(f,p){let y=t.get(p).light;f.referencePosition.value.setFromMatrixPosition(y.matrixWorld),f.nearDistance.value=y.shadow.camera.near,f.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function W_(s,t,e,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,M){let S=M.program;n.uniformBlockBinding(b,S)}function c(b,M){let S=i[b.id];S===void 0&&(f(b),S=h(b),i[b.id]=S,b.addEventListener("dispose",y));let T=M.program;n.updateUBOMapping(b,T);let v=t.render.frame;r[b.id]!==v&&(d(b),r[b.id]=v)}function h(b){let M=u();b.__bindingPointIndex=M;let S=s.createBuffer(),T=b.__size,v=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,T,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,S),S}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return $t("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){let M=i[b.id],S=b.uniforms,T=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let v=0,A=S.length;v<A;v++){let R=S[v];if(Array.isArray(R))for(let P=0,N=R.length;P<N;P++)m(R[P],v,P,T);else m(R,v,0,T)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function m(b,M,S,T){if(x(b,M,S,T)===!0){let v=b.__offset,A=b.value;if(Array.isArray(A)){let R=0;for(let P=0;P<A.length;P++){let N=A[P],z=p(N);g(N,b.__data,R),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(R+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,b.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,b.__data)}}function g(b,M,S){typeof b=="number"||typeof b=="boolean"?M[0]=b:b.isMatrix3?(M[0]=b.elements[0],M[1]=b.elements[1],M[2]=b.elements[2],M[3]=0,M[4]=b.elements[3],M[5]=b.elements[4],M[6]=b.elements[5],M[7]=0,M[8]=b.elements[6],M[9]=b.elements[7],M[10]=b.elements[8],M[11]=0):ArrayBuffer.isView(b)?M.set(new b.constructor(b.buffer,b.byteOffset,M.length)):b.toArray(M,S)}function x(b,M,S,T){let v=b.value,A=M+"_"+S;if(T[A]===void 0)return typeof v=="number"||typeof v=="boolean"?T[A]=v:ArrayBuffer.isView(v)?T[A]=v.slice():T[A]=v.clone(),!0;{let R=T[A];if(typeof v=="number"||typeof v=="boolean"){if(R!==v)return T[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(R.equals(v)===!1)return R.copy(v),!0}}return!1}function f(b){let M=b.uniforms,S=0,T=16;for(let A=0,R=M.length;A<R;A++){let P=Array.isArray(M[A])?M[A]:[M[A]];for(let N=0,z=P.length;N<z;N++){let k=P[N],F=Array.isArray(k.value)?k.value:[k.value];for(let $=0,Y=F.length;$<Y;$++){let st=F[$],K=p(st),tt=S%T,q=tt%K.boundary,mt=tt+q;S+=q,mt!==0&&T-mt<K.storage&&(S+=T-mt),k.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=S,S+=K.storage}}}let v=S%T;return v>0&&(S+=T-v),b.__size=S,b.__cache={},this}function p(b){let M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=48,M.storage=48):b.isMatrix4?(M.boundary=64,M.storage=64):b.isTexture?Vt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(M.boundary=16,M.storage=b.byteLength):Vt("WebGLRenderer: Unsupported uniform value type.",b),M}function y(b){let M=b.target;M.removeEventListener("dispose",y);let S=o.indexOf(M.__bindingPointIndex);o.splice(S,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function _(){for(let b in i)s.deleteBuffer(i[b]);o=[],i={},r={}}return{bind:l,update:c,dispose:_}}var X_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ui=null;function $_(){return ui===null&&(ui=new Ss(X_,16,16,ts,jn),ui.name="DFG_LUT",ui.minFilter=qe,ui.magFilter=qe,ui.wrapS=si,ui.wrapT=si,ui.generateMipmaps=!1,ui.needsUpdate=!0),ui}var Pl=class{constructor(t={}){let{canvas:e=Rf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:m=Mn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let x=m,f=new Set([Ka,Ya,qa]),p=new Set([Mn,Jn,mr,gr,Wa,Xa]),y=new Uint32Array(4),_=new Int32Array(4),b=new L,M=null,S=null,T=[],v=[],A=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,P=!1,N=null,z=null,k=null,F=null;this._outputColorSpace=Pn;let $=0,Y=0,st=null,K=-1,tt=null,q=new Ae,mt=new Ae,wt=null,at=new Qt(0),nt=0,zt=e.width,V=e.height,J=1,ut=null,Rt=null,ct=new Ae(0,0,zt,V),Ft=new Ae(0,0,zt,V),xe=!1,qt=new hr,Yt=!1,oe=!1,kt=new ae,he=new L,Ce=new Ae,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function We(){return st===null?J:1}let U=n;function nn(E,D){return e.getContext(E,D)}let Me,I,w,B,W,j,lt,pt,Q,it,gt,Nt,_t,xt,Dt,Gt,jt,O,yt,et,vt,St,rt;try{let E={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Ie,!1),e.addEventListener("webglcontextrestored",ye,!1),e.addEventListener("webglcontextcreationerror",Wn,!1),U===null){let D="webgl2";if(U=nn(D,E),U===null)throw nn(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ot()}catch(E){throw e.removeEventListener("webglcontextlost",Ie,!1),e.removeEventListener("webglcontextrestored",ye,!1),e.removeEventListener("webglcontextcreationerror",Wn,!1),$t("WebGLRenderer: "+E.message),E}function Ot(){Me=new Qy(U),Me.init(),vt=new F_(U,Me),I=new Vy(U,Me,t,vt),w=new U_(U,Me),I.reversedDepthBuffer&&d&&w.buffers.depth.setReversed(!0),z=U.createFramebuffer(),k=U.createFramebuffer(),F=U.createFramebuffer(),B=new nv(U),W=new S_,j=new z_(U,Me,w,W,I,vt,B),lt=new jy(R),pt=new sg(U),St=new Hy(U,pt),Q=new tv(U,pt,B,St),it=new sv(U,Q,pt,St,B),O=new iv(U,I,j),Dt=new Wy(W),gt=new M_(R,lt,Me,I,St,Dt),Nt=new V_(R,W),_t=new T_,xt=new P_(Me),jt=new By(R,lt,w,it,g,l),Gt=new O_(R,it,I),rt=new W_(U,B,I,w),yt=new Gy(U,Me,B),et=new ev(U,Me,B),B.programs=gt.programs,R.capabilities=I,R.extensions=Me,R.properties=W,R.renderLists=_t,R.shadowMap=Gt,R.state=w,R.info=B}x!==Mn&&(A=new ov(x,e.width,e.height,a,i,r));let Pt=new fu(R,U);this.xr=Pt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let E=Me.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Me.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(E){E!==void 0&&(J=E,this.setSize(zt,V,!1))},this.getSize=function(E){return E.set(zt,V)},this.setSize=function(E,D,X=!0){if(Pt.isPresenting){Vt("WebGLRenderer: Can't change size while VR device is presenting.");return}zt=E,V=D,e.width=Math.floor(E*J),e.height=Math.floor(D*J),X===!0&&(e.style.width=E+"px",e.style.height=D+"px"),A!==null&&A.setSize(e.width,e.height),this.setViewport(0,0,E,D)},this.getDrawingBufferSize=function(E){return E.set(zt*J,V*J).floor()},this.setDrawingBufferSize=function(E,D,X){zt=E,V=D,J=X,e.width=Math.floor(E*X),e.height=Math.floor(D*X),this.setViewport(0,0,E,D)},this.setEffects=function(E){if(x===Mn){$t("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let D=0;D<E.length;D++)if(E[D].isOutputPass===!0){Vt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(q)},this.getViewport=function(E){return E.copy(ct)},this.setViewport=function(E,D,X,H){E.isVector4?ct.set(E.x,E.y,E.z,E.w):ct.set(E,D,X,H),w.viewport(q.copy(ct).multiplyScalar(J).round())},this.getScissor=function(E){return E.copy(Ft)},this.setScissor=function(E,D,X,H){E.isVector4?Ft.set(E.x,E.y,E.z,E.w):Ft.set(E,D,X,H),w.scissor(mt.copy(Ft).multiplyScalar(J).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(E){w.setScissorTest(xe=E)},this.setOpaqueSort=function(E){ut=E},this.setTransparentSort=function(E){Rt=E},this.getClearColor=function(E){return E.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor(...arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha(...arguments)},this.clear=function(E=!0,D=!0,X=!0){let H=0;if(E){let G=!1;if(st!==null){let Mt=st.texture.format;G=f.has(Mt)}if(G){let Mt=st.texture.type,Et=p.has(Mt),bt=jt.getClearColor(),Ct=jt.getClearAlpha(),Lt=bt.r,ie=bt.g,ue=bt.b;Et?(y[0]=Lt,y[1]=ie,y[2]=ue,y[3]=Ct,U.clearBufferuiv(U.COLOR,0,y)):(_[0]=Lt,_[1]=ie,_[2]=ue,_[3]=Ct,U.clearBufferiv(U.COLOR,0,_))}else H|=U.COLOR_BUFFER_BIT}D&&(H|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&U.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),N=E},this.dispose=function(){e.removeEventListener("webglcontextlost",Ie,!1),e.removeEventListener("webglcontextrestored",ye,!1),e.removeEventListener("webglcontextcreationerror",Wn,!1),jt.dispose(),_t.dispose(),xt.dispose(),W.dispose(),lt.dispose(),it.dispose(),St.dispose(),rt.dispose(),gt.dispose(),Pt.dispose(),Pt.removeEventListener("sessionstart",fd),Pt.removeEventListener("sessionend",pd),ps.stop()};function Ie(E){E.preventDefault(),Gh("WebGLRenderer: Context Lost."),P=!0}function ye(){Gh("WebGLRenderer: Context Restored."),P=!1;let E=B.autoReset,D=Gt.enabled,X=Gt.autoUpdate,H=Gt.needsUpdate,G=Gt.type;Ot(),B.autoReset=E,Gt.enabled=D,Gt.autoUpdate=X,Gt.needsUpdate=H,Gt.type=G}function Wn(E){$t("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ei(E){let D=E.target;D.removeEventListener("dispose",ei),jm(D)}function jm(E){Qm(E),W.remove(E)}function Qm(E){let D=W.get(E).programs;D!==void 0&&(D.forEach(function(X){gt.releaseProgram(X)}),E.isShaderMaterial&&gt.releaseShaderCache(E))}this.renderBufferDirect=function(E,D,X,H,G,Mt){D===null&&(D=je);let Et=G.isMesh&&G.matrixWorld.determinantAffine()<0,bt=n0(E,D,X,H,G);w.setMaterial(H,Et);let Ct=X.index,Lt=1;if(H.wireframe===!0){if(Ct=Q.getWireframeAttribute(X),Ct===void 0)return;Lt=2}let ie=X.drawRange,ue=X.attributes.position,It=ie.start*Lt,ve=(ie.start+ie.count)*Lt;Mt!==null&&(It=Math.max(It,Mt.start*Lt),ve=Math.min(ve,(Mt.start+Mt.count)*Lt)),Ct!==null?(It=Math.max(It,0),ve=Math.min(ve,Ct.count)):ue!=null&&(It=Math.max(It,0),ve=Math.min(ve,ue.count));let Xe=ve-It;if(Xe<0||Xe===1/0)return;St.setup(G,H,bt,X,Ct);let ke,Ee=yt;if(Ct!==null&&(ke=pt.get(Ct),Ee=et,Ee.setIndex(ke)),G.isMesh)H.wireframe===!0?(w.setLineWidth(H.wireframeLinewidth*We()),Ee.setMode(U.LINES)):Ee.setMode(U.TRIANGLES);else if(G.isLine){let sn=H.linewidth;sn===void 0&&(sn=1),w.setLineWidth(sn*We()),G.isLineSegments?Ee.setMode(U.LINES):G.isLineLoop?Ee.setMode(U.LINE_LOOP):Ee.setMode(U.LINE_STRIP)}else G.isPoints?Ee.setMode(U.POINTS):G.isSprite&&Ee.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(Me.get("WEBGL_multi_draw"))Ee.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let sn=G._multiDrawStarts,Tt=G._multiDrawCounts,un=G._multiDrawCount,me=Ct?pt.get(Ct).bytesPerElement:1,Un=W.get(H).currentProgram.getUniforms();for(let ni=0;ni<un;ni++)Un.setValue(U,"_gl_DrawID",ni),Ee.render(sn[ni]/me,Tt[ni])}else if(G.isInstancedMesh)Ee.renderInstances(It,Xe,G.count);else if(X.isInstancedBufferGeometry){let sn=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Tt=Math.min(X.instanceCount,sn);Ee.renderInstances(It,Xe,Tt)}else Ee.render(It,Xe)};function dd(E,D,X,H){N!==null&&E.isNodeMaterial&&N.setObject(H,E),Yt===!0&&Dt.setState(E,X,!1),E.transparent===!0&&E.side===Fn&&E.forceSinglePass===!1?(E.side=en,E.needsUpdate=!0,Fo(E,D,H),E.side=ci,E.needsUpdate=!0,Fo(E,D,H),E.side=Fn):Fo(E,D,H)}this.compile=function(E,D,X=null){X===null&&(X=E),N!==null&&N.renderStart(E,D,X),S=xt.get(X),S.init(D),v.push(S),X.traverseVisible(function(G){G.isLight&&G.layers.test(D.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),E!==X&&E.traverseVisible(function(G){G.isLight&&G.layers.test(D.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),S.setupLights(),N!==null&&N.updateLights(S.state.lightsArray),oe=this.localClippingEnabled,Yt=Dt.init(this.clippingPlanes,oe),Yt===!0&&Dt.setGlobalState(this.clippingPlanes,D),N!==null&&Gt.render(S.state.shadowsArray,X,D);let H=new Set;return E.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let Mt=G.material;if(Mt)if(Array.isArray(Mt))for(let Et=0;Et<Mt.length;Et++){let bt=Mt[Et];dd(bt,X,D,G),H.add(bt)}else dd(Mt,X,D,G),H.add(Mt)}),S=v.pop(),N!==null&&N.renderEnd(),H},this.compileAsync=function(E,D,X=null){let H=this.compile(E,D,X);return new Promise(G=>{function Mt(){if(H.forEach(function(Et){let Ct=W.get(Et).currentProgram;(Ct===void 0||Ct.isReady())&&H.delete(Et)}),H.size===0){G(E);return}setTimeout(Mt,10)}Me.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let Hc=null;function t0(E){Hc&&Hc(E)}function fd(){ps.stop()}function pd(){ps.start()}let ps=new np;ps.setAnimationLoop(t0),typeof self<"u"&&ps.setContext(self),this.setAnimationLoop=function(E){Hc=E,Pt.setAnimationLoop(E),E===null?ps.stop():ps.start()},Pt.addEventListener("sessionstart",fd),Pt.addEventListener("sessionend",pd),this.render=function(E,D){if(D!==void 0&&D.isCamera!==!0){$t("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;N!==null&&N.renderStart(E,D);let X=Pt.enabled===!0&&Pt.isPresenting===!0,H=A!==null&&(st===null||X)&&A.begin(R,st);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Pt.enabled===!0&&Pt.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Pt.cameraAutoUpdate===!0&&Pt.updateCamera(D),D=Pt.getCamera()),E.isScene===!0&&E.onBeforeRender(R,E,D,st),S=xt.get(E,v.length),S.init(D),S.state.textureUnits=j.getTextureUnits(),v.push(S),kt.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),qt.setFromProjectionMatrix(kt,Kn,D.reversedDepth),oe=this.localClippingEnabled,Yt=Dt.init(this.clippingPlanes,oe),M=_t.get(E,T.length),M.init(),T.push(M),Pt.enabled===!0&&Pt.isPresenting===!0){let Et=R.xr.getDepthSensingMesh();Et!==null&&Gc(Et,D,-1/0,R.sortObjects)}Gc(E,D,0,R.sortObjects),M.finish(),N!==null&&N.updateLights(S.state.lightsArray),R.sortObjects===!0&&M.sort(ut,Rt),Te=Pt.enabled===!1||Pt.isPresenting===!1||Pt.hasDepthSensing()===!1,Te&&jt.addToRenderList(M,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Yt===!0&&Dt.beginShadows();let G=S.state.shadowsArray;if(Gt.render(G,E,D),Yt===!0&&Dt.endShadows(),(H&&A.hasRenderPass())===!1){let Et=M.opaque,bt=M.transmissive;if(S.setupLights(),D.isArrayCamera){let Ct=D.cameras;if(bt.length>0)for(let Lt=0,ie=Ct.length;Lt<ie;Lt++){let ue=Ct[Lt];gd(Et,bt,E,ue)}Te&&jt.render(E);for(let Lt=0,ie=Ct.length;Lt<ie;Lt++){let ue=Ct[Lt];md(M,E,ue,ue.viewport)}}else bt.length>0&&gd(Et,bt,E,D),Te&&jt.render(E),md(M,E,D)}st!==null&&Y===0&&(j.updateMultisampleRenderTarget(st),j.updateRenderTargetMipmap(st)),H&&A.end(R),E.isScene===!0&&E.onAfterRender(R,E,D),St.resetDefaultState(),K=-1,tt=null,v.pop(),v.length>0?(S=v[v.length-1],j.setTextureUnits(S.state.textureUnits),Yt===!0&&Dt.setGlobalState(R.clippingPlanes,S.state.camera)):S=null,T.pop(),T.length>0?M=T[T.length-1]:M=null,N!==null&&N.renderEnd()};function Gc(E,D,X,H){if(E.visible===!1)return;if(E.layers.test(D.layers)){if(E.isGroup)X=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(D);else if(E.isLightProbeGrid)S.pushLightProbeGrid(E);else if(E.isLight)S.pushLight(E),E.castShadow&&S.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||E.intersectsFrustum(qt)){H&&Ce.setFromMatrixPosition(E.matrixWorld).applyMatrix4(kt);let Et=it.update(E),bt=E.material;bt.visible&&M.push(E,Et,bt,X,Ce.z,null,D)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||E.intersectsFrustum(qt))){let Et=it.update(E),bt=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ce.copy(E.boundingSphere.center)):(Et.boundingSphere===null&&Et.computeBoundingSphere(),Ce.copy(Et.boundingSphere.center)),Ce.applyMatrix4(E.matrixWorld).applyMatrix4(kt)),Array.isArray(bt)){let Ct=Et.groups;for(let Lt=0,ie=Ct.length;Lt<ie;Lt++){let ue=Ct[Lt],It=bt[ue.materialIndex];It&&It.visible&&M.push(E,Et,It,X,Ce.z,ue,D)}}else bt.visible&&M.push(E,Et,bt,X,Ce.z,null,D)}}let Mt=E.children;for(let Et=0,bt=Mt.length;Et<bt;Et++)Gc(Mt[Et],D,X,H)}function md(E,D,X,H){let{opaque:G,transmissive:Mt,transparent:Et}=E;S.setupLightsView(X),Yt===!0&&Dt.setGlobalState(R.clippingPlanes,X),H&&w.viewport(q.copy(H)),G.length>0&&zo(G,D,X),Mt.length>0&&zo(Mt,D,X),Et.length>0&&zo(Et,D,X),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function gd(E,D,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[H.id]===void 0){let It=Me.has("EXT_color_buffer_half_float")||Me.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[H.id]=new ln(1,1,{generateMipmaps:!0,type:It?jn:Mn,minFilter:ji,samples:Math.max(4,I.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:le.workingColorSpace})}let Mt=S.state.transmissionRenderTarget[H.id],Et=H.viewport||q;Mt.setSize(Et.z*R.transmissionResolutionScale,Et.w*R.transmissionResolutionScale);let bt=R.getRenderTarget(),Ct=R.getActiveCubeFace(),Lt=R.getActiveMipmapLevel();R.setRenderTarget(Mt),R.getClearColor(at),nt=R.getClearAlpha(),nt<1&&R.setClearColor(16777215,.5),R.clear(),Te&&jt.render(X);let ie=R.toneMapping;R.toneMapping=Zn;let ue=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),S.setupLightsView(H),Yt===!0&&Dt.setGlobalState(R.clippingPlanes,H),zo(E,X,H),j.updateMultisampleRenderTarget(Mt),j.updateRenderTargetMipmap(Mt),Me.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let ve=0,Xe=D.length;ve<Xe;ve++){let ke=D[ve],{object:Ee,geometry:sn,material:Tt,group:un}=ke;if(Tt.side===Fn&&Ee.layers.test(H.layers)){let me=Tt.side;Tt.side=en,Tt.needsUpdate=!0,xd(Ee,X,H,sn,Tt,un),Tt.side=me,Tt.needsUpdate=!0,It=!0}}It===!0&&(j.updateMultisampleRenderTarget(Mt),j.updateRenderTargetMipmap(Mt))}R.setRenderTarget(bt,Ct,Lt),R.setClearColor(at,nt),ue!==void 0&&(H.viewport=ue),R.toneMapping=ie}function zo(E,D,X){let H=D.isScene===!0?D.overrideMaterial:null;for(let G=0,Mt=E.length;G<Mt;G++){let Et=E[G],{object:bt,geometry:Ct,group:Lt}=Et,ie=Et.material;ie.allowOverride===!0&&H!==null&&(ie=H),bt.layers.test(X.layers)&&xd(bt,D,X,Ct,ie,Lt)}}function xd(E,D,X,H,G,Mt){N!==null&&G.isNodeMaterial&&N.setObject(E,G),E.onBeforeRender(R,D,X,H,G,Mt),E.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.onBeforeRender(R,D,X,H,E,Mt),G.transparent===!0&&G.side===Fn&&G.forceSinglePass===!1?(G.side=en,G.needsUpdate=!0,R.renderBufferDirect(X,D,H,G,E,Mt),G.side=ci,G.needsUpdate=!0,R.renderBufferDirect(X,D,H,G,E,Mt),G.side=Fn):R.renderBufferDirect(X,D,H,G,E,Mt),E.onAfterRender(R,D,X,H,G,Mt)}function Fo(E,D,X){D.isScene!==!0&&(D=je);let H=W.get(E),G=S.state.lights,Mt=S.state.shadowsArray,Et=G.state.version,bt=gt.getParameters(E,G.state,Mt,D,X,S.state.lightProbeGridArray),Ct=gt.getProgramCacheKey(bt),Lt=H.programs;H.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?D.environment:null,H.fog=D.fog;let ie=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;H.envMap=lt.get(E.envMap||H.environment,ie),H.envMapRotation=H.environment!==null&&E.envMap===null?D.environmentRotation:E.envMapRotation,Lt===void 0&&(E.addEventListener("dispose",ei),Lt=new Map,H.programs=Lt);let ue=Lt.get(Ct);if(ue!==void 0){if(H.currentProgram===ue&&H.lightsStateVersion===Et)return vd(E,bt),ue}else bt.uniforms=gt.getUniforms(E),N!==null&&E.isNodeMaterial&&N.build(E,X,bt),E.onBeforeCompile(bt,R),ue=gt.acquireProgram(bt,Ct),Lt.set(Ct,ue),H.uniforms=bt.uniforms;let It=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(It.clippingPlanes=Dt.uniform),vd(E,bt),H.needsLights=s0(E),H.lightsStateVersion=Et,H.needsLights&&(It.ambientLightColor.value=G.state.ambient,It.lightProbe.value=G.state.probe,It.sunLights.value=G.state.sun,It.sunLightShadows.value=G.state.sunShadow,It.directionalLights.value=G.state.directional,It.directionalLightShadows.value=G.state.directionalShadow,It.spotLights.value=G.state.spot,It.spotLightShadows.value=G.state.spotShadow,It.rectAreaLights.value=G.state.rectArea,It.ltc_1.value=G.state.rectAreaLTC1,It.ltc_2.value=G.state.rectAreaLTC2,It.pointLights.value=G.state.point,It.pointLightShadows.value=G.state.pointShadow,It.hemisphereLights.value=G.state.hemi,It.sunShadowMatrix.value=G.state.sunShadowMatrix,It.sunShadowCascade.value=G.state.sunShadowCascade,It.directionalShadowMatrix.value=G.state.directionalShadowMatrix,It.spotLightMatrix.value=G.state.spotLightMatrix,It.spotLightMap.value=G.state.spotLightMap,It.pointShadowMatrix.value=G.state.pointShadowMatrix),H.lightProbeGrid=S.state.lightProbeGridArray.length>0,H.currentProgram=ue,H.uniformsList=null,ue}function yd(E){if(E.uniformsList===null){let D=E.currentProgram.getUniforms();E.uniformsList=_r.seqWithValue(D.seq,E.uniforms)}return E.uniformsList}function vd(E,D){let X=W.get(E);X.outputColorSpace=D.outputColorSpace,X.batching=D.batching,X.batchingColor=D.batchingColor,X.instancing=D.instancing,X.instancingColor=D.instancingColor,X.instancingMorph=D.instancingMorph,X.skinning=D.skinning,X.morphTargets=D.morphTargets,X.morphNormals=D.morphNormals,X.morphColors=D.morphColors,X.morphTargetsCount=D.morphTargetsCount,X.numClippingPlanes=D.numClippingPlanes,X.numIntersection=D.numClipIntersection,X.vertexAlphas=D.vertexAlphas,X.vertexTangents=D.vertexTangents,X.toneMapping=D.toneMapping}function e0(E,D){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;b.setFromMatrixPosition(D.matrixWorld);for(let X=0,H=E.length;X<H;X++){let G=E[X];if(G.texture!==null&&G.boundingBox.containsPoint(b))return G}return null}function n0(E,D,X,H,G){D.isScene!==!0&&(D=je),j.resetTextureUnits();let Mt=D.fog,Et=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?D.environment:null,bt=st===null?R.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:le.workingColorSpace,Ct=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Lt=lt.get(H.envMap||Et,Ct),ie=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,ue=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),It=!!X.morphAttributes.position,ve=!!X.morphAttributes.normal,Xe=!!X.morphAttributes.color,ke=Zn;H.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(ke=R.toneMapping);let Ee=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,sn=Ee!==void 0?Ee.length:0,Tt=W.get(H),un=S.state.lights;if(Yt===!0&&(oe===!0||E!==tt)){let Pe=E===tt&&H.id===K;Dt.setState(H,E,Pe)}let me=!1;H.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==un.state.version||Tt.outputColorSpace!==bt||G.isBatchedMesh&&Tt.batching===!1||!G.isBatchedMesh&&Tt.batching===!0||G.isBatchedMesh&&Tt.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&Tt.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&Tt.instancing===!1||!G.isInstancedMesh&&Tt.instancing===!0||G.isSkinnedMesh&&Tt.skinning===!1||!G.isSkinnedMesh&&Tt.skinning===!0||G.isInstancedMesh&&Tt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Tt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Tt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Tt.instancingMorph===!1&&G.morphTexture!==null||Tt.envMap!==Lt||H.fog===!0&&Tt.fog!==Mt||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==Dt.numPlanes||Tt.numIntersection!==Dt.numIntersection)||Tt.vertexAlphas!==ie||Tt.vertexTangents!==ue||Tt.morphTargets!==It||Tt.morphNormals!==ve||Tt.morphColors!==Xe||Tt.toneMapping!==ke||Tt.morphTargetsCount!==sn||!!Tt.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(me=!0):(me=!0,Tt.__version=H.version);let Un=Tt.currentProgram;me===!0&&(Un=Fo(H,D,G),N&&H.isNodeMaterial&&N.onUpdateProgram(H,Un,Tt));let ni=!1,ki=!1,zs=!1,Se=Un.getUniforms(),He=Tt.uniforms;if(w.useProgram(Un.program)&&(ni=!0,ki=!0,zs=!0),H.id!==K&&(K=H.id,ki=!0),Tt.needsLights){let Pe=e0(S.state.lightProbeGridArray,G);Tt.lightProbeGrid!==Pe&&(Tt.lightProbeGrid=Pe,ki=!0)}if(ni||tt!==E){w.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Se.setValue(U,"projectionMatrix",E.projectionMatrix),Se.setValue(U,"viewMatrix",E.matrixWorldInverse);let Di=Se.map.cameraPosition;Di!==void 0&&Di.setValue(U,he.setFromMatrixPosition(E.matrixWorld)),I.logarithmicDepthBuffer&&Se.setValue(U,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Se.setValue(U,"isOrthographic",E.isOrthographicCamera===!0),tt!==E&&(tt=E,ki=!0,zs=!0)}if(Tt.needsLights&&(un.state.sunShadowMap.length>0&&Se.setValue(U,"sunShadowMap",un.state.sunShadowMap,j),un.state.directionalShadowMap.length>0&&Se.setValue(U,"directionalShadowMap",un.state.directionalShadowMap,j),un.state.spotShadowMap.length>0&&Se.setValue(U,"spotShadowMap",un.state.spotShadowMap,j),un.state.pointShadowMap.length>0&&Se.setValue(U,"pointShadowMap",un.state.pointShadowMap,j)),G.isSkinnedMesh){Se.setOptional(U,G,"bindMatrix"),Se.setOptional(U,G,"bindMatrixInverse");let Pe=G.skeleton;Pe&&(Pe.boneTexture===null&&Pe.computeBoneTexture(),Se.setValue(U,"boneTexture",Pe.boneTexture,j))}G.isBatchedMesh&&(Se.setOptional(U,G,"batchingTexture"),Se.setValue(U,"batchingTexture",G._matricesTexture,j),Se.setOptional(U,G,"batchingIdTexture"),Se.setValue(U,"batchingIdTexture",G._indirectTexture,j),Se.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&Se.setValue(U,"batchingColorTexture",G._colorsTexture,j));let Ni=X.morphAttributes;if((Ni.position!==void 0||Ni.normal!==void 0||Ni.color!==void 0)&&O.update(G,X,Un),(ki||Tt.receiveShadow!==G.receiveShadow)&&(Tt.receiveShadow=G.receiveShadow,Se.setValue(U,"receiveShadow",G.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&D.environment!==null&&(He.envMapIntensity.value=D.environmentIntensity),He.dfgLUT!==void 0&&(He.dfgLUT.value=$_()),ki){if(Se.setValue(U,"toneMappingExposure",R.toneMappingExposure),Tt.needsLights&&i0(He,zs),Mt&&H.fog===!0&&Nt.refreshFogUniforms(He,Mt),Nt.refreshMaterialUniforms(He,H,J,V,S.state.transmissionRenderTarget[E.id]),Tt.needsLights&&Tt.lightProbeGrid){let Pe=Tt.lightProbeGrid;He.probesSH.value=Pe.texture,He.probesMin.value.copy(Pe.boundingBox.min),He.probesMax.value.copy(Pe.boundingBox.max),He.probesResolution.value.copy(Pe.resolution)}_r.upload(U,yd(Tt),He,j)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(_r.upload(U,yd(Tt),He,j),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Se.setValue(U,"center",G.center),Se.setValue(U,"modelViewMatrix",G.modelViewMatrix),Se.setValue(U,"normalMatrix",G.normalMatrix),Se.setValue(U,"modelMatrix",G.matrixWorld),H.uniformsGroups!==void 0){let Pe=H.uniformsGroups;for(let Di=0,Fs=Pe.length;Di<Fs;Di++){let bd=Pe[Di];rt.update(bd,Un),rt.bind(bd,Un)}}return Un}function i0(E,D){E.ambientLightColor.needsUpdate=D,E.lightProbe.needsUpdate=D,E.sunLights.needsUpdate=D,E.sunLightShadows.needsUpdate=D,E.directionalLights.needsUpdate=D,E.directionalLightShadows.needsUpdate=D,E.pointLights.needsUpdate=D,E.pointLightShadows.needsUpdate=D,E.spotLights.needsUpdate=D,E.spotLightShadows.needsUpdate=D,E.rectAreaLights.needsUpdate=D,E.hemisphereLights.needsUpdate=D}function s0(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return st},this.setRenderTargetTextures=function(E,D,X){let H=W.get(E);H.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),W.get(E.texture).__webglTexture=D,W.get(E.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,D){let X=W.get(E);X.__webglFramebuffer=D,X.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(E,D=0,X=0){st=E,$=D,Y=X;let H=null,G=!1,Mt=!1;if(E){let bt=W.get(E);if(bt.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(U.FRAMEBUFFER,bt.__webglFramebuffer),q.copy(E.viewport),mt.copy(E.scissor),wt=E.scissorTest,w.viewport(q),w.scissor(mt),w.setScissorTest(wt),K=-1;return}else if(bt.__webglFramebuffer===void 0)j.setupRenderTarget(E);else if(bt.__hasExternalTextures)j.rebindTextures(E,W.get(E.texture).__webglTexture,W.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let ie=E.depthTexture;if(bt.__boundDepthTexture!==ie){if(ie!==null&&W.has(ie)&&(E.width!==ie.image.width||E.height!==ie.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");j.setupDepthRenderbuffer(E)}}let Ct=E.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(Mt=!0);let Lt=W.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Lt[D])?H=Lt[D][X]:H=Lt[D],G=!0):E.samples>0&&j.useMultisampledRTT(E)===!1?H=W.get(E).__webglMultisampledFramebuffer:Array.isArray(Lt)?H=Lt[X]:H=Lt,q.copy(E.viewport),mt.copy(E.scissor),wt=E.scissorTest}else q.copy(ct).multiplyScalar(J).floor(),mt.copy(Ft).multiplyScalar(J).floor(),wt=xe;if(X!==0&&(H=z),w.bindFramebuffer(U.FRAMEBUFFER,H)&&w.drawBuffers(E,H),w.viewport(q),w.scissor(mt),w.setScissorTest(wt),G){let bt=W.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,bt.__webglTexture,X)}else if(Mt){let bt=D;for(let Ct=0;Ct<E.textures.length;Ct++){let Lt=W.get(E.textures[Ct]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ct,Lt.__webglTexture,X,bt)}}else if(E!==null&&X!==0){let bt=W.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,bt.__webglTexture,X)}K=-1};function _d(E){let D=W.get(E);return(D.__readFormat!==E.format||D.__readType!==E.type)&&(D.__readFormat=E.format,D.__readType=E.type,D.__formatReadable=I.textureFormatReadable(E.format),D.__typeReadable=I.textureTypeReadable(E.type)),D}this.readRenderTargetPixels=function(E,D,X,H,G,Mt,Et,bt=0){if(!(E&&E.isWebGLRenderTarget)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=W.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Et!==void 0&&(Ct=Ct[Et]),Ct){w.bindFramebuffer(U.FRAMEBUFFER,Ct);try{let Lt=E.textures[bt],ie=Lt.format,ue=Lt.type;E.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+bt);let It=_d(Lt);if(It.__formatReadable===!1){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(It.__typeReadable===!1){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=E.width-H&&X>=0&&X<=E.height-G&&U.readPixels(D,X,H,G,vt.convert(ie),vt.convert(ue),Mt)}finally{let Lt=st!==null?W.get(st).__webglFramebuffer:null;w.bindFramebuffer(U.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(E,D,X,H,G,Mt,Et,bt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=W.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Et!==void 0&&(Ct=Ct[Et]),Ct)if(D>=0&&D<=E.width-H&&X>=0&&X<=E.height-G){w.bindFramebuffer(U.FRAMEBUFFER,Ct);let Lt=E.textures[bt],ie=Lt.format,ue=Lt.type;E.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+bt);let It=_d(Lt);if(It.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(It.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ve=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ve),U.bufferData(U.PIXEL_PACK_BUFFER,Mt.byteLength,U.STREAM_READ),U.readPixels(D,X,H,G,vt.convert(ie),vt.convert(ue),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Xe=st!==null?W.get(st).__webglFramebuffer:null;w.bindFramebuffer(U.FRAMEBUFFER,Xe);let ke=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await If(U,ke,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ve),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Mt),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(ve),U.deleteSync(ke),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,D=null,X=0){let H=Math.pow(2,-X),G=Math.floor(E.image.width*H),Mt=Math.floor(E.image.height*H),Et=D!==null?D.x:0,bt=D!==null?D.y:0;j.setTexture2D(E,0),U.copyTexSubImage2D(U.TEXTURE_2D,X,0,0,Et,bt,G,Mt),w.unbindTexture()},this.copyTextureToTexture=function(E,D,X=null,H=null,G=0,Mt=0){let Et,bt,Ct,Lt,ie,ue,It,ve,Xe,ke=E.isCompressedTexture?E.mipmaps[Mt]:E.image;if(X!==null)Et=X.max.x-X.min.x,bt=X.max.y-X.min.y,Ct=X.isBox3?X.max.z-X.min.z:1,Lt=X.min.x,ie=X.min.y,ue=X.isBox3?X.min.z:0;else{let He=Math.pow(2,-G);Et=Math.floor(ke.width*He),bt=Math.floor(ke.height*He),E.isDataArrayTexture?Ct=ke.depth:E.isData3DTexture?Ct=Math.floor(ke.depth*He):Ct=1,Lt=0,ie=0,ue=0}H!==null?(It=H.x,ve=H.y,Xe=H.z):(It=0,ve=0,Xe=0);let Ee=vt.convert(D.format),sn=vt.convert(D.type),Tt;D.isData3DTexture?(j.setTexture3D(D,0),Tt=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(j.setTexture2DArray(D,0),Tt=U.TEXTURE_2D_ARRAY):(j.setTexture2D(D,0),Tt=U.TEXTURE_2D),w.activeTexture(U.TEXTURE0),w.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),w.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),w.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);let un=w.getParameter(U.UNPACK_ROW_LENGTH),me=w.getParameter(U.UNPACK_IMAGE_HEIGHT),Un=w.getParameter(U.UNPACK_SKIP_PIXELS),ni=w.getParameter(U.UNPACK_SKIP_ROWS),ki=w.getParameter(U.UNPACK_SKIP_IMAGES);w.pixelStorei(U.UNPACK_ROW_LENGTH,ke.width),w.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ke.height),w.pixelStorei(U.UNPACK_SKIP_PIXELS,Lt),w.pixelStorei(U.UNPACK_SKIP_ROWS,ie),w.pixelStorei(U.UNPACK_SKIP_IMAGES,ue);let zs=E.isDataArrayTexture||E.isData3DTexture,Se=D.isDataArrayTexture||D.isData3DTexture;if(E.isDepthTexture){let He=W.get(E),Ni=W.get(D),Pe=W.get(He.__renderTarget),Di=W.get(Ni.__renderTarget);w.bindFramebuffer(U.READ_FRAMEBUFFER,Pe.__webglFramebuffer),w.bindFramebuffer(U.DRAW_FRAMEBUFFER,Di.__webglFramebuffer);for(let Fs=0;Fs<Ct;Fs++)zs&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,W.get(E).__webglTexture,G,ue+Fs),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,W.get(D).__webglTexture,Mt,Xe+Fs)),U.blitFramebuffer(Lt,ie,Et,bt,It,ve,Et,bt,U.DEPTH_BUFFER_BIT,U.NEAREST);w.bindFramebuffer(U.READ_FRAMEBUFFER,null),w.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(G!==0||E.isRenderTargetTexture||W.has(E)){let He=W.get(E),Ni=W.get(D);w.bindFramebuffer(U.READ_FRAMEBUFFER,k),w.bindFramebuffer(U.DRAW_FRAMEBUFFER,F);for(let Pe=0;Pe<Ct;Pe++)zs?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,He.__webglTexture,G,ue+Pe):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,He.__webglTexture,G),Se?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ni.__webglTexture,Mt,Xe+Pe):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ni.__webglTexture,Mt),G!==0?U.blitFramebuffer(Lt,ie,Et,bt,It,ve,Et,bt,U.COLOR_BUFFER_BIT,U.NEAREST):Se?U.copyTexSubImage3D(Tt,Mt,It,ve,Xe+Pe,Lt,ie,Et,bt):U.copyTexSubImage2D(Tt,Mt,It,ve,Lt,ie,Et,bt);w.bindFramebuffer(U.READ_FRAMEBUFFER,null),w.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Se?E.isDataTexture||E.isData3DTexture?U.texSubImage3D(Tt,Mt,It,ve,Xe,Et,bt,Ct,Ee,sn,ke.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(Tt,Mt,It,ve,Xe,Et,bt,Ct,Ee,ke.data):U.texSubImage3D(Tt,Mt,It,ve,Xe,Et,bt,Ct,Ee,sn,ke):E.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Mt,It,ve,Et,bt,Ee,sn,ke.data):E.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Mt,It,ve,ke.width,ke.height,Ee,ke.data):U.texSubImage2D(U.TEXTURE_2D,Mt,It,ve,Et,bt,Ee,sn,ke);w.pixelStorei(U.UNPACK_ROW_LENGTH,un),w.pixelStorei(U.UNPACK_IMAGE_HEIGHT,me),w.pixelStorei(U.UNPACK_SKIP_PIXELS,Un),w.pixelStorei(U.UNPACK_SKIP_ROWS,ni),w.pixelStorei(U.UNPACK_SKIP_IMAGES,ki),Mt===0&&D.generateMipmaps&&U.generateMipmap(Tt),w.unbindTexture()},this.initRenderTarget=function(E){W.get(E).__webglFramebuffer===void 0&&j.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?j.setTextureCube(E,0):E.isData3DTexture?j.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?j.setTexture2DArray(E,0):j.setTexture2D(E,0),w.unbindTexture()},this.resetState=function(){$=0,Y=0,st=null,w.reset(),St.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=le._getDrawingBufferColorSpace(t),e.unpackColorSpace=le._getUnpackColorSpace()}};var C={PITCH_A:1,PITCH_B:2,LINES:3,SURROUND:4,TRACK:5,GOAL_FRAME:6,NET:7,STAND_A:8,STAND_B:9,STAND_C:10,ROOF:11,CONCRETE:12,METAL:13,WOOD:14,FENCE:15,HOUSE_A:16,HOUSE_B:17,ROOF_TILE:18,TREE:19,TRUNK:20,BANNER_HOME:21,BANNER_AWAY:22,BOARD_A:23,BOARD_B:24,SCREEN:25,LAMP:26,CROWD_1:27,CROWD_2:28,CROWD_3:29,CROWD_4:30,SKIN_1:31,SKIN_2:32,SKIN_3:33,SKIN_H:34,HAIR_1:35,HAIR_2:36,HAIR_H:37,BOOT:38,BOOT_H:39,SHIRT_0:40,SHORTS_0:41,SOCKS_0:42,GK_0:43,NUM_0:44,SHIRT_1:45,SHORTS_1:46,SOCKS_1:47,GK_1:48,NUM_1:49,BALL_W:50,BALL_B:51,GLOVE:52,CONE:53,TARGET:54,CLOUD:55,SKY_TOP:56,SKY_BOTTOM:57,GOLD:58,EYE:59,GKX_0:60,GKX_1:61,INK:62,MARKER:63,TRIM_0:64,TRIM_1:65,GLASS:66,DOOR:67,BRICK:68,TREE_2:69,HEDGE:70,FLOWER:71},gu=72,Le=Array.from({length:gu},()=>new Qt(1,1,1));function mu(s){return new Qt(s)}var xu={name:"classic",label:"Classic",bg:"#f2f1ea",fog:"#f2f1ea",fogNear:60,fogFar:330,ink:"#161616",lineWidth:1.2,toon:0,shadow:0,clouds:!1,blobs:!0,roles:{PITCH_A:"#d3e6c3",PITCH_B:"#c6ddb4",LINES:"#ffffff",SURROUND:"#dde9d0",TRACK:"#ebe6dc",GOAL_FRAME:"#ffffff",NET:"#8a8a8a",STAND_A:"#f6f6f2",STAND_B:"#ecebe5",STAND_C:"#e2e0d8",ROOF:"#fafaf7",CONCRETE:"#efeee8",METAL:"#e8e8e6",WOOD:"#f1ebe0",FENCE:"#dcdcdc",HOUSE_A:"#f8f6f0",HOUSE_B:"#efece4",ROOF_TILE:"#e7e2d8",TREE:"#e4ecdc",TRUNK:"#ece6dc",BOARD_A:"#fbfbf8",BOARD_B:"#efefea",SCREEN:"#f7f7f4",LAMP:"#ffffff",CROWD_3:"#efefeb",CROWD_4:"#e3e2dc",SKIN_1:"#fbf6f0",SKIN_2:"#f3eadf",SKIN_3:"#e8dccd",HAIR_1:"#d9d4cc",HAIR_2:"#bdb7ae",BOOT:"#3a3a3a",BALL_W:"#ffffff",BALL_B:"#1b1b1b",GLOVE:"#f5f5f0",CONE:"#f2c9a0",TARGET:"#f0b8b0",CLOUD:"#ffffff",SKY_TOP:"#f4f3ee",SKY_BOTTOM:"#f2f1ea",GOLD:"#eadcaa",EYE:"#1b1b1b",INK:"#161616",MARKER:"#222222",GLASS:"#e3eaee",DOOR:"#e6ddd0",BRICK:"#ece4d8",TREE_2:"#d8e4cc",HEDGE:"#dce7d1",FLOWER:"#f3dcdc"},kitMix:.42,kitSat:.75,skinMix:.55},q_={name:"neo",label:"Neobrutalist",bg:"#8fe3ff",fog:"#b6efff",fogNear:110,fogFar:520,ink:"#000000",lineWidth:3,toon:1,shadow:1,clouds:!0,blobs:!1,roles:{PITCH_A:"#39c24a",PITCH_B:"#2fb041",LINES:"#ffffff",SURROUND:"#27a03a",TRACK:"#ff8a4c",GOAL_FRAME:"#ffffff",NET:"#1a1a1a",STAND_A:"#ff5c8a",STAND_B:"#ffd23f",STAND_C:"#3d9bff",ROOF:"#ffffff",CONCRETE:"#d9d2ff",METAL:"#b5b5c8",WOOD:"#ffb347",FENCE:"#7b7bff",HOUSE_A:"#ff9ecb",HOUSE_B:"#8ff0c4",ROOF_TILE:"#ff5a36",TREE:"#1fd06b",TRUNK:"#a9632e",BOARD_A:"#ffffff",BOARD_B:"#ffe45c",SCREEN:"#141414",LAMP:"#fffbe0",CROWD_3:"#ffe45c",CROWD_4:"#b48cff",SKIN_1:"#ffd8b8",SKIN_2:"#d9a27a",SKIN_3:"#9a6440",HAIR_1:"#2b1d14",HAIR_2:"#f2c14e",BOOT:"#101010",BALL_W:"#ffffff",BALL_B:"#101010",GLOVE:"#fff45c",CONE:"#ff7a1a",TARGET:"#ff3d6e",CLOUD:"#ffffff",SKY_TOP:"#1fb8ff",SKY_BOTTOM:"#c4f4ff",GOLD:"#ffc81a",EYE:"#000000",INK:"#000000",MARKER:"#ff3dcf",GLASS:"#3ee0ff",DOOR:"#7b4dff",BRICK:"#ff8a4c",TREE_2:"#12a954",HEDGE:"#1bbd57",FLOWER:"#ff5c8a"},kitMix:0,kitSat:1.15,skinMix:0},Dl={classic:xu,neo:q_},Nl={kits:[{shirt:"#c8102e",shorts:"#ffffff",socks:"#c8102e",gk:"#f2c500",gkx:"#222222",number:"#ffffff"},{shirt:"#1d4ed8",shorts:"#1d4ed8",socks:"#ffffff",gk:"#22c55e",gkx:"#111111",number:"#ffffff"}],human:{skin:"#e0b48c",hair:"#3b2a1e",boots:"#111111"}},cp=xu;function En(s,t,e,n){let i=mu(s),r={};return i.getHSL(r),i.setHSL(r.h,Math.min(1,r.s*n),r.l),e>0&&i.lerp(new Qt(1,1,1),e),i}function hp(s){let t=Dl[s]||xu;cp=t;for(let[e,n]of Object.entries(t.roles))Le[C[e]].set(n);return dp(),t}function up(s,t){s&&(Nl.kits=s),t&&(Nl.human=t),dp()}function dp(){let s=cp,t=Nl.kits,e=s.kitMix,n=s.kitSat;for(let r=0;r<2;r++){let o=t[r],a=r===0?0:5;Le[C.SHIRT_0+a].copy(En(o.shirt,s,e,n)),Le[C.SHORTS_0+a].copy(En(o.shorts,s,e,n)),Le[C.SOCKS_0+a].copy(En(o.socks,s,e,n)),Le[C.GK_0+a].copy(En(o.gk,s,e,n)),Le[C.NUM_0+a].copy(En(o.number,s,(s.name==="classic",0),1)),Le[r===0?C.GKX_0:C.GKX_1].copy(En(o.gkx,s,e*.6,n));let l=o.trim||o.number||"#ffffff",c=bo(l,o.shirt)<.3?bo(o.shirt,"#ffffff")>.6?"#ffffff":"#141414":l;Le[r===0?C.TRIM_0:C.TRIM_1].copy(En(c,s,e,n))}for(let r=0;r<2;r++){let o=Le[r===0?C.SHIRT_0:C.SHIRT_1],a=o.r*.3+o.g*.59+o.b*.11;Le[r===0?C.NUM_0:C.NUM_1].set(a>.6?"#141414":"#ffffff")}Le[C.BANNER_HOME].copy(En(t[0].shirt,s,e*.7,n)),Le[C.BANNER_AWAY].copy(En(t[1].shirt,s,e*.7,n)),Le[C.CROWD_1].copy(En(t[0].shirt,s,s.name==="classic"?.62:0,n)),Le[C.CROWD_2].copy(En(t[1].shirt,s,s.name==="classic"?.62:0,n));let i=Nl.human;Le[C.SKIN_H].copy(En(i.skin,s,s.skinMix,1)),Le[C.HAIR_H].copy(En(i.hair,s,s.skinMix*.8,1)),Le[C.BOOT_H].copy(En(i.boots,s,s.name==="classic"?.15:0,1))}function bo(s,t){let e=mu(s),n=mu(t);return Math.hypot(e.r-n.r,e.g-n.g,e.b-n.b)}var Y_={stripes:"stripes",band:"band",half:"halves",quarters:"sleeves",chevron:"plain"};function pu(s){return s&&s.crest&&Y_[s.crest.pattern]||"plain"}function Sr(s,t){let e={shirt:s.colors[0],shorts:s.colors[2]||s.colors[1],socks:s.colors[0],number:s.colors[1],pattern:pu(s)},n={shirt:t.colors[0],shorts:t.colors[2]||t.colors[1],socks:t.colors[0],number:t.colors[1],pattern:pu(t)};bo(e.shirt,n.shirt)<.55&&(n={shirt:t.colors[1],shorts:t.colors[0],socks:t.colors[1],number:t.colors[0],pattern:pu(t)},bo(e.shirt,n.shirt)<.55&&(n={shirt:"#f4f4f4",shorts:"#222222",socks:"#f4f4f4",number:"#111111",pattern:"plain"}));let i=["#f2c500","#22c55e","#9333ea","#f97316","#0ea5e9","#ec4899","#111827"],r=o=>{let a=i[0],l=-1;for(let c of i){let h=Math.min(...o.map(u=>bo(c,u)));h>l&&(l=h,a=c)}return a};return e.gk=r([e.shirt,n.shirt]),n.gk=r([e.shirt,n.shirt,e.gk]),e.gkx="#1f1f1f",n.gkx="#1f1f1f",[e,n]}var At={uPalette:{value:Le},uLightDir:{value:new L(-.45,.8,.38).normalize()},uToon:{value:0},uShadowAmt:{value:0},uLineWidth:{value:1.2},uMinWidth:{value:1},uTaper:{value:22},uTaperMin:{value:.3},uDetailDist:{value:50},uCreaseDist:{value:20},uResolution:{value:new Zt(1280,720)},uTime:{value:0},uCrowd:{value:0},uParts:{value:null},uAtlas:{value:null},uNetA:{value:new Ae(0,0,0,0)},uNetDA:{value:new L(1,0,0)},uNetB:{value:new Ae(0,0,0,0)},uNetDB:{value:new L(-1,0,0)}},yu=`
uniform highp sampler2D uParts;
mat4 partMatrix(float idx) {
  int row = int(idx + 0.5);
  return mat4(texelFetch(uParts, ivec2(0, row), 0), texelFetch(uParts, ivec2(1, row), 0),
              texelFetch(uParts, ivec2(2, row), 0), texelFetch(uParts, ivec2(3, row), 0));
}
`,fp=`
uniform float uTime;
uniform float uCrowd;
float crowdLift(vec2 bob) {
  float rate = 2.6 + fract(bob.x * 7.31) * 2.4 + uCrowd * 4.0;
  float s = sin(uTime * rate + bob.x * 6.2831);
  return bob.y * (0.035 * s + uCrowd * (0.18 + 0.2 * fract(bob.x * 3.7)) * max(0.0, s));
}
`,K_=`
uniform vec4 uNetA; uniform vec3 uNetDA;
uniform vec4 uNetB; uniform vec3 uNetDB;
vec3 netDisp(vec3 p) {
  vec3 da = p - uNetA.xyz; vec3 db = p - uNetB.xyz;
  float fa = uNetA.w * exp(-dot(da, da) / 0.5);
  float fb = uNetB.w * exp(-dot(db, db) / 0.5);
  return uNetDA * fa + uNetDB * fb;
}
`,Z_=`
attribute float aRole;
#ifdef PARTS
attribute float aPart;
${yu}
#endif
#ifdef CROWD
attribute vec2 aBob;
${fp}
#endif
uniform vec3 uPalette[${gu}];
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
`,J_=`
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
`;function fi(s={}){let t={};s.parts&&(t.PARTS=""),s.crowd&&(t.CROWD=""),s.atlas&&(t.USE_ATLAS="");let e=xo.merge([dt.lights,dt.fog]);return Object.assign(e,{uPalette:At.uPalette,uLightDir:At.uLightDir,uToon:At.uToon,uShadowAmt:At.uShadowAmt,uParts:At.uParts,uAtlas:At.uAtlas,uTime:At.uTime,uCrowd:At.uCrowd}),new Be({uniforms:e,defines:t,vertexShader:Z_,fragmentShader:J_,lights:!0,fog:s.fog!==!1,side:s.doubleSided?Fn:ci,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})}var j_=`
attribute vec3 iA;
attribute vec3 iB;
attribute vec3 iN1;
attribute vec3 iN2;
attribute vec2 iMeta;
#ifdef PARTS
${yu}
#endif
#ifdef CROWD
attribute vec2 iBob;
${fp}
#endif
#ifdef NET
${K_}
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
`,Q_=`
uniform vec3 uColor;
uniform float uOpacity;
#include <common>
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uColor, uOpacity);
  #include <fog_fragment>
}
`;function Qn(s={}){let t={};s.parts&&(t.PARTS=""),s.crowd&&(t.CROWD=""),s.net&&(t.NET="");let e=xo.merge([dt.fog]);return Object.assign(e,{uLineWidth:At.uLineWidth,uMinWidth:At.uMinWidth,uTaper:At.uTaper,uTaperMin:At.uTaperMin,uDetailDist:At.uDetailDist,uCreaseDist:At.uCreaseDist,uResolution:At.uResolution,uParts:At.uParts,uTime:At.uTime,uCrowd:At.uCrowd,uNetA:At.uNetA,uNetDA:At.uNetDA,uNetB:At.uNetB,uNetDB:At.uNetDB,uColor:{value:Le[s.role??C.INK]},uOpacity:{value:s.opacity??1},uWidthScale:{value:s.widthScale??1}}),new Be({uniforms:e,defines:t,vertexShader:j_,fragmentShader:Q_,fog:s.fog!==!1,transparent:(s.opacity??1)<1,depthWrite:(s.opacity??1)>=1})}function pp(){return new Be({uniforms:{uParts:At.uParts},vertexShader:`${yu}
attribute float aPart;
void main(){ vec3 p = (partMatrix(aPart) * vec4(position,1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0); }`,fragmentShader:"void main(){ gl_FragColor = vec4(1.0); }"})}function mp(){return new Be({uniforms:{uTop:{value:Le[C.SKY_TOP]},uBottom:{value:Le[C.SKY_BOTTOM]}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uTop; uniform vec3 uBottom; varying vec3 vDir; void main(){ float t = smoothstep(-0.02, 0.55, vDir.y); gl_FragColor = vec4(mix(uBottom, uTop, t), 1.0); }",side:en,depthWrite:!1,fog:!1})}function gp(){return new Be({uniforms:{uInk:{value:Le[C.INK]}},vertexShader:"attribute float aAlpha; varying vec2 vP; varying float vA; void main(){ vP = position.xz * 2.0; vA = aAlpha; gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uInk; varying vec2 vP; varying float vA; void main(){ float d = length(vP); float a = (1.0 - smoothstep(0.35, 1.0, d)) * vA; if (a < 0.01) discard; gl_FragColor = vec4(uInk, a); }",transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function Cs(s,t=1){return new Be({uniforms:{uColor:{value:Le[s]},uOpacity:{value:t}},vertexShader:"void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uColor; uniform float uOpacity; void main(){ gl_FragColor = vec4(uColor, uOpacity); }",transparent:t<1,depthWrite:t>=1})}function xp(s){return new Be({uniforms:{uMap:{value:s}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(uMap, vUv).rgb, 1.0); }"})}var ze=new Map;function es(s,t,e=!0){let n=s.index?s.toNonIndexed():s,i=new Float32Array(n.attributes.position.array),r=new Float32Array(n.attributes.normal.array),o=n.attributes.uv?new Float32Array(n.attributes.uv.array):null,a=e?tb(s,t):[];return{positions:i,normals:r,uvs:o,edges:a}}function tb(s,t=32){let e=s.attributes.position,n=new Map,i=[],r=new Int32Array(e.count);for(let x=0;x<e.count;x++){let f=e.getX(x),p=e.getY(x),y=e.getZ(x),_=`${Math.round(f*1e4)},${Math.round(p*1e4)},${Math.round(y*1e4)}`,b=n.get(_);b===void 0&&(b=i.length,n.set(_,b),i.push([f,p,y])),r[x]=b}let o=s.index?s.index.array:null,a=o?o.length/3:e.count/3,l=new Map,c=i.length,h=new L,u=new L,d=new L;for(let x=0;x<a;x++){let f=r[o?o[x*3]:x*3],p=r[o?o[x*3+1]:x*3+1],y=r[o?o[x*3+2]:x*3+2];if(f===p||p===y||f===y)continue;let _=i[f],b=i[p],M=i[y];if(h.set(b[0]-_[0],b[1]-_[1],b[2]-_[2]),u.set(M[0]-_[0],M[1]-_[1],M[2]-_[2]),d.crossVectors(h,u),d.lengthSq()<1e-14)continue;d.normalize();let S=[d.x,d.y,d.z];for(let[T,v]of[[f,p],[p,y],[y,f]]){let A=Math.min(T,v),R=Math.max(T,v),P=A*c+R,N=l.get(P);N||(N={a:A,b:R,normals:[]},l.set(P,N)),N.normals.push(S)}}let m=Math.cos(t*Math.PI/180),g=[];for(let x of l.values()){let f=x.normals[0];if(x.normals.length===1){g.push({a:i[x.a],b:i[x.b],n1:f,n2:[0,0,0],crease:1});continue}let p=x.normals[1],y=f[0]*p[0]+f[1]*p[1]+f[2]*p[2];y>.9999||g.push({a:i[x.a],b:i[x.b],n1:f,n2:p,crease:y<m?1:0})}return g}function Ri(s,t,e){let n=`box:${s}:${t}:${e}`;return ze.has(n)||ze.set(n,es(new Vi(s,t,e),30)),ze.get(n)}function wr(s,t,e,n=8,i=!1){let r=`cyl:${s}:${t}:${e}:${n}:${i}`;return ze.has(r)||ze.set(r,es(new Wi(s,t,e,n,1,i),n<=4?30:60)),ze.get(r)}function mn(s,t=12,e=8,n=Math.PI*2,i=Math.PI){let r=`sph:${s}:${t}:${e}:${n}:${i}`;return ze.has(r)||ze.set(r,es(new ws(s,t,e,0,n,0,i),70)),ze.get(r)}function Mo(s,t,e=8){let n=`cone:${s}:${t}:${e}`;return ze.has(n)||ze.set(n,es(new Ei(s,t,e),e<=4?30:60)),ze.get(n)}function eb(s,t,e=!1){let n=`plane:${s}:${t}:${e}`;if(!ze.has(n)){let i=new kn(s,t);i.rotateX(-Math.PI/2),ze.set(n,es(i,30,e))}return ze.get(n)}function Ul(s,t){let e=`quad:${s}:${t}`;return ze.has(e)||ze.set(e,es(new kn(s,t),30,!1)),ze.get(e)}function Tr(s,t,e=30,n=!0){return ze.has(s)||ze.set(s,es(t(),e,n)),ze.get(s)}function nb(s,t=12,e=[!0,!0]){let n=[],i=[],r=t+1;for(let[c,h,u,d=0]of s)for(let m=0;m<=t;m++){let g=m/t*Math.PI*2;n.push(Math.sin(g)*h,c,Math.cos(g)*u+d)}for(let c=0;c<s.length-1;c++)for(let h=0;h<t;h++){let u=c*r+h,d=u+1,m=u+r,g=m+1;i.push(u,d,m,d,g,m)}let o=(c,h)=>{let[u,d,m,g=0]=s[c];if(d<1e-5&&m<1e-5)return;let x=n.length/3;n.push(0,u,g);for(let f=0;f<=t;f++){let p=f/t*Math.PI*2;n.push(Math.sin(p)*d,u,Math.cos(p)*m+g)}for(let f=0;f<t;f++)h?i.push(x,x+1+f,x+2+f):i.push(x,x+2+f,x+1+f)};e[0]&&o(0,!1),e[1]&&o(s.length-1,!0);let a=new Ye;a.setAttribute("position",new fe(n,3)),a.setIndex(i),a.computeVertexNormals();let l=a.attributes.normal;for(let c=0;c<s.length;c++){let h=c*r,u=c*r+t,d=l.getX(h)+l.getX(u),m=l.getY(h)+l.getY(u),g=l.getZ(h)+l.getZ(u),x=Math.hypot(d,m,g)||1;l.setXYZ(h,d/x,m/x,g/x),l.setXYZ(u,d/x,m/x,g/x)}return a}function gn(s,t,e=12,n={}){return Tr(`loft:${s}:${e}`,()=>{let i=nb(t,e,n.caps||[!0,!0]);return n.axis==="z"&&i.rotateX(Math.PI/2),i},n.crease??55)}function ns(s,t=1){let e=`ico:${s}:${t}`;return ze.has(e)||ze.set(e,es(new Xi(s,t),70)),ze.get(e)}var mT=new ae,Ol=new Xt,Dn=new L,yp=new Ue,vp=new _n,ib=new L,De=class s{constructor(t={}){this.opts=t,this.pos=[],this.nor=[],this.role=[],this.part=[],this.bob=[],this.uv=[],this.eA=[],this.eB=[],this.eN1=[],this.eN2=[],this.eMeta=[],this.eBob=[],this.vcount=0,this.detail=!1}add(t,e,n,i={}){Ol.getNormalMatrix(e);let r=e.elements,o=t.positions,a=t.normals,l=i.part??-1,c=i.bob||null,h=i.uvRect||null,u=i.roleFn||null;for(let g=0;g<o.length;g+=3){let x=o[g],f=o[g+1],p=o[g+2];if(this.pos.push(r[0]*x+r[4]*f+r[8]*p+r[12],r[1]*x+r[5]*f+r[9]*p+r[13],r[2]*x+r[6]*f+r[10]*p+r[14]),Dn.set(a[g],a[g+1],a[g+2]).applyMatrix3(Ol).normalize(),this.nor.push(Dn.x,Dn.y,Dn.z),this.role.push(i.roles?i.roles[g/3]:u?u(g/3,x,f,p):n),this.opts.parts&&this.part.push(l),this.opts.bob&&this.bob.push(c?c[0]:0,c?c[1]:0),this.opts.atlas)if(h&&t.uvs){let y=g/3*2;this.uv.push(h[0]+t.uvs[y]*(h[2]-h[0]),h[1]+t.uvs[y+1]*(h[3]-h[1]))}else this.uv.push(-1,-1)}if(this.vcount+=o.length/3,i.noEdges||!t.edges.length)return this;let d=!!i.creaseOnly,m=i.detail??this.detail?2:0;for(let g of t.edges){if(d&&g.crease<.5)continue;let x=g.a,f=g.b;this.eA.push(r[0]*x[0]+r[4]*x[1]+r[8]*x[2]+r[12],r[1]*x[0]+r[5]*x[1]+r[9]*x[2]+r[13],r[2]*x[0]+r[6]*x[1]+r[10]*x[2]+r[14]),this.eB.push(r[0]*f[0]+r[4]*f[1]+r[8]*f[2]+r[12],r[1]*f[0]+r[5]*f[1]+r[9]*f[2]+r[13],r[2]*f[0]+r[6]*f[1]+r[10]*f[2]+r[14]),Dn.set(g.n1[0],g.n1[1],g.n1[2]).applyMatrix3(Ol).normalize(),this.eN1.push(Dn.x,Dn.y,Dn.z),g.n2[0]===0&&g.n2[1]===0&&g.n2[2]===0?this.eN2.push(0,0,0):(Dn.set(g.n2[0],g.n2[1],g.n2[2]).applyMatrix3(Ol).normalize(),this.eN2.push(Dn.x,Dn.y,Dn.z)),this.eMeta.push(l,g.crease+m),this.opts.bob&&this.eBob.push(c?c[0]:0,c?c[1]:0)}return this}line(t,e,n,i,r,o,a=-1){return this.eA.push(t,e,n),this.eB.push(i,r,o),this.eN1.push(0,1,0),this.eN2.push(0,0,0),this.eMeta.push(a,this.detail?3:1),this.opts.bob&&this.eBob.push(0,0),this}static mat(t,e,n,i=0,r=0,o=0,a=1,l=1,c=1){return vp.set(i,r,o,"YXZ"),yp.setFromEuler(vp),new ae().compose(Dn.set(t,e,n).clone(),yp.clone(),ib.set(a,l,c).clone())}box(t,e,n,i,r,o,a,l=0,c={}){return this.add(Ri(e,n,i),s.mat(r,o,a,c.rx||0,l,c.rz||0),t,c)}cyl(t,e,n,i,r,o,a,l,c={}){return this.add(wr(e,n,i,r,c.open),s.mat(o,a,l,c.rx||0,c.ry||0,c.rz||0,c.sx||1,1,c.sz||1),t,c)}sphere(t,e,n,i,r,o={}){return this.add(mn(e,o.ws||12,o.hs||8,o.phi,o.theta),s.mat(n,i,r,o.rx||0,o.ry||0,o.rz||0,o.sx||1,o.sy||1,o.sz||1),t,o)}cone(t,e,n,i,r,o,a,l={}){return this.add(Mo(e,n,i),s.mat(r,o,a,l.rx||0,l.ry||0,l.rz||0,l.sx||1,l.sy||1,l.sz||1),t,l)}plane(t,e,n,i,r,o,a={}){return this.add(eb(e,n,!!a.edges),s.mat(i,r,o,0,a.ry||0,0),t,{noEdges:!a.edges,...a})}quad(t,e,n,i,r,o,a=0,l={}){return this.add(Ul(e,n),s.mat(i,r,o,l.rx||0,a,0),t,{noEdges:!0,...l})}between(t,e,n,i,r,o,a,l,c=6,h={}){let u=o-n,d=a-i,m=l-r,g=Math.hypot(u,d,m),x=new ae,f=new L(u,d,m).normalize(),p=new Ue().setFromUnitVectors(new L(0,1,0),f);return x.compose(new L((n+o)/2,(i+a)/2,(r+l)/2),p,new L(1,1,1)),this.add(wr(e,e,g,c),x,t,h)}buildSolid(){let t=new Ye;return t.setAttribute("position",new fe(this.pos,3)),t.setAttribute("normal",new fe(this.nor,3)),t.setAttribute("aRole",new fe(this.role,1)),this.opts.parts&&t.setAttribute("aPart",new fe(this.part,1)),this.opts.bob&&t.setAttribute("aBob",new fe(this.bob,2)),this.opts.atlas&&t.setAttribute("uv",new fe(this.uv,2)),t.computeBoundingSphere(),t}buildEdges(){let t=new oo,e=[-1,0,0,1,0,0,-1,1,0,1,1,0];t.setIndex([0,1,2,2,1,3]),t.setAttribute("position",new fe(e,3));let n=this.eA.length/3;return t.setAttribute("iA",new bn(new Float32Array(this.eA),3)),t.setAttribute("iB",new bn(new Float32Array(this.eB),3)),t.setAttribute("iN1",new bn(new Float32Array(this.eN1),3)),t.setAttribute("iN2",new bn(new Float32Array(this.eN2),3)),t.setAttribute("iMeta",new bn(new Float32Array(this.eMeta),2)),this.opts.bob&&t.setAttribute("iBob",new bn(new Float32Array(this.eBob),2)),t.instanceCount=n,t.boundingSphere=new li(new L,1e6),t}get edgeCount(){return this.eA.length/3}fine(t){let e=this.detail;this.detail=!0;try{t()}finally{this.detail=e}}};var Is=.008333333333333333,Z={L:64,W:42,HL:32,HW:21},ft={W:5,HW:2.5,H:2,DEPTH:1.6,TOP_DEPTH:1,POST_R:.06},Kt={PEN_D:9,PEN_HW:10,GOAL_D:3,GOAL_HW:4.5,SPOT:7.5,CIRCLE_R:6,ARC_R:5,CORNER_R:1},hn={HL:40,HW:29},pe=.11,zl=9.81,An={AIR_DRAG:.0125,ROLL_A0:.6,ROLL_C:.014,BOUNCE:.55,BOUNCE_FRICTION:.82,MAGNUS:.003},be={RESTART_DIST:6,THROW_DIST:3,KICK_RELEASE_LOCK:.25,CONTROL_RADIUS:1,CONTROL_HEIGHT:1,PROTECT_RADIUS:1.15,LOSE_RADIUS:4,ASSIST_WINDOW:8,TACKLE_WINDOW:2,SLIDE_COOLDOWN:1.5,TACKLE_COOLDOWN:.55,REQUEST_COOLDOWN:1.6,INPUT_BUFFER:.15,GK_MAX_HOLD:4},Fl={short:120,normal:180,long:300};var So=[{id:"ST",name:"Striker"},{id:"W",name:"Winger"},{id:"AM",name:"Attacking Midfielder"},{id:"CM",name:"Central Midfielder"},{id:"DEF",name:"Defender"}];var To={community:{name:"Community Ground",crowd:130,loud:.35},town:{name:"Town Stadium",crowd:520,loud:.55},regional:{name:"Regional Stadium",crowd:1200,loud:.75},premier:{name:"Premier Arena",crowd:2400,loud:.9},continental:{name:"Continental Stadium",crowd:3400,loud:1},training:{name:"Training Ground",crowd:0,loud:0}};function Eu(s){let t=s>>>0||1;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}var Au=s=>Eu(Math.floor(s()*4294967296)),Vl=.1,Ru=.012;function Hn(s,t,e,n,i){let r=n-t,o=i-e,a=Math.hypot(r,o),l=Math.atan2(r,o);s.plane(C.LINES,Vl,a+Vl*.5,(t+n)/2,Ru,(e+i)/2,{ry:l})}function vu(s,t,e,n,i,r,o=40){for(let a=0;a<o;a++){let l=i+(r-i)*(a/o),c=i+(r-i)*((a+1)/o);Hn(s,t+Math.cos(l)*n,e+Math.sin(l)*n,t+Math.cos(c)*n,e+Math.sin(c)*n)}}function _p(s,t,e,n=.12){for(let i=0;i<4;i++)s.plane(C.LINES,n*2,n*.9,t,Ru,e,{ry:i*Math.PI/4})}function sb(s,t={}){let e=Z.HL,n=Z.HW,i=16,r=Z.L/i;for(let c=0;c<i;c++)s.plane(c%2?C.PITCH_A:C.PITCH_B,r,Z.W,-e+r*(c+.5),0,0);let o=t.surroundX||44,a=t.surroundZ||33;s.plane(C.SURROUND,o*2,a-n,0,-.004,n+(a-n)/2),s.plane(C.SURROUND,o*2,a-n,0,-.004,-n-(a-n)/2),s.plane(C.SURROUND,o-e,Z.W,e+(o-e)/2,-.004,0),s.plane(C.SURROUND,o-e,Z.W,-e-(o-e)/2,-.004,0);let l=Vl/2;Hn(s,-e,n-l,e,n-l),Hn(s,-e,-n+l,e,-n+l),Hn(s,e-l,-n,e-l,n),Hn(s,-e+l,-n,-e+l,n),Hn(s,0,-n,0,n),vu(s,0,0,Kt.CIRCLE_R,0,Math.PI*2,56),_p(s,0,0,.15);for(let c of[1,-1]){let h=c*e,u=h-c*Kt.PEN_D;Hn(s,u,-Kt.PEN_HW,u,Kt.PEN_HW),Hn(s,h,Kt.PEN_HW,u,Kt.PEN_HW),Hn(s,h,-Kt.PEN_HW,u,-Kt.PEN_HW);let d=h-c*Kt.GOAL_D;Hn(s,d,-Kt.GOAL_HW,d,Kt.GOAL_HW),Hn(s,h,Kt.GOAL_HW,d,Kt.GOAL_HW),Hn(s,h,-Kt.GOAL_HW,d,-Kt.GOAL_HW);let m=h-c*Kt.SPOT;_p(s,m,0);let g=Math.abs(u-m),x=Math.acos(Math.min(1,g/Kt.ARC_R)),f=c>0?Math.PI:0;vu(s,m,0,Kt.ARC_R,f-x,f+x,16);for(let p of[1,-1]){let y=c>0?Math.PI:0,b=-p*Math.PI/2-y;for(;b>Math.PI;)b-=Math.PI*2;for(;b<-Math.PI;)b+=Math.PI*2;vu(s,h,p*n,Kt.CORNER_R,y,y+b,8),s.cyl(C.METAL,.02,.02,1.5,6,h,.75,p*n),s.box(C.BANNER_HOME,.02,.26,.36,h,1.36,p*n-p*.19)}}}function rb(s){let t=ft.POST_R;for(let e of[1,-1]){let n=e*(Z.HL-t);for(let o of[1,-1])s.cyl(C.GOAL_FRAME,t,t,ft.H+t,12,n,(ft.H+t)/2,o*(ft.HW+t));s.cyl(C.GOAL_FRAME,t,t,ft.W+t*4,12,n,ft.H+t,0,{rx:Math.PI/2});let i=e*(Z.HL+ft.DEPTH),r=e*(Z.HL+ft.TOP_DEPTH);for(let o of[1,-1]){let a=o*(ft.HW+t);s.between(C.METAL,.03,i,.03,a,r,ft.H,a,6),s.between(C.METAL,.03,n,ft.H+t,a,r,ft.H,a,6),s.between(C.METAL,.025,n,.03,a,i,.03,a,6)}s.between(C.METAL,.03,r,ft.H,-(ft.HW+t),r,ft.H,ft.HW+t,6),s.between(C.METAL,.025,i,.03,-(ft.HW+t),i,.03,ft.HW+t,6)}}function wp(){let s=new De,t=.2;for(let e of[1,-1]){let n=e*Z.HL,i=l=>e*(Z.HL+ft.DEPTH+(ft.TOP_DEPTH-ft.DEPTH)*(l/ft.H)),r=ft.HW;for(let l=-r;l<=r+1e-6;l+=t)for(let c=0;c<ft.H-1e-6;c+=t)s.line(i(c),c,l,i(c+t),c+t,l);for(let l=0;l<=ft.H+1e-6;l+=t)for(let c=-r;c<r-1e-6;c+=t)s.line(i(l),l,c,i(l),l,c+t);for(let l of[1,-1]){let c=l*r;for(let h=0;h<=ft.H+1e-6;h+=t){let u=i(h),d=Math.max(1,Math.round(Math.abs(u-n)/t));for(let m=0;m<d;m++)s.line(n+(u-n)*(m/d),h,c,n+(u-n)*((m+1)/d),h,c)}for(let h=0;h<=8;h++){let u=h/8;for(let d=0;d<ft.H-1e-6;d+=t){let m=n+(i(d)-n)*u,g=n+(i(d+t)-n)*u;s.line(m,d,c,g,d+t,c)}}}let o=i(ft.H),a=Math.max(1,Math.round(Math.abs(o-n)/t));for(let l=-r;l<=r+1e-6;l+=t)for(let c=0;c<a;c++)s.line(n+(o-n)*(c/a),ft.H,l,n+(o-n)*((c+1)/a),ft.H,l);for(let l=0;l<=a;l++)for(let c=-r;c<r-1e-6;c+=t)s.line(n+(o-n)*(l/a),ft.H,c,n+(o-n)*(l/a),ft.H,c+t)}return s.buildEdges()}var pi=class{constructor(t,e,n,i){this.b=t,this.cx=e,this.cz=n,this.ry=i,this.c=Math.cos(i),this.s=Math.sin(i)}w(t,e){return[this.cx+t*this.c+e*this.s,this.cz-t*this.s+e*this.c]}box(t,e,n,i,r,o,a,l={}){let[c,h]=this.w(r,a);this.b.box(t,e,n,i,c,o,h,this.ry+(l.ry||0),l)}cyl(t,e,n,i,r,o,a,l,c={}){let[h,u]=this.w(o,l);this.b.cyl(t,e,n,i,r,h,a,u,c)}sphere(t,e,n,i,r,o={}){let[a,l]=this.w(n,r);this.b.sphere(t,e,a,i,l,o)}quad(t,e,n,i,r,o,a={}){let[l,c]=this.w(i,o);this.b.quad(t,e,n,l,r,c,this.ry+Math.PI+(a.ry||0),a)}},bp=[C.CROWD_1,C.CROWD_1,C.CROWD_1,C.CROWD_2,C.CROWD_3,C.CROWD_4,C.CROWD_1,C.CROWD_3],ob=[C.SKIN_1,C.SKIN_2,C.SKIN_3];function ab(s,t,e,n,i,r=!0,o=!0){let a=bp[Math.floor(i()*bp.length)],l=[i(),1],c=r?.46:.62,h=i()<.5?C.CROWD_1:C.CROWD_2;s.box(a,.42,c,.27,t,e+c/2,n,{bob:l});let[u,d]=s.w(t,n),m=ob[Math.floor(i()*3)];if(s.b.add(ns(.135,0),De.mat(u,e+c+.16,d,0,i()*6,0),m,{bob:l}),o){let x=i()<.14;for(let f of[-1,1])x?s.box(a,.1,.42,.11,t+f*.25,e+c+.18,n,{bob:l,rz:f*.25,detail:!0}):s.box(a,.1,c*.8,.12,t+f*.26,e+c*.56,n-.02,{bob:l,detail:!0})}let g=i();if(g<.18)s.box(h,.46,.09,.3,t,e+c-.02,n,{bob:l,detail:!0});else if(g<.3){let[x,f]=s.w(t,n);s.b.add(Mo(.12,.2,6),De.mat(x,e+c+.3,f),h,{bob:l,detail:!0})}}function Gn(s,t,e,n){let i=new pi(s,t.cx,t.cz,t.ry),r=t.rows,o=t.rowDepth||.85,a=t.rowHeight||.42,l=t.base||.6,c=t.len,h=t.z0||0,u=t.roles||[C.STAND_A,C.STAND_B];i.box(t.wallRole||C.CONCRETE,c,l,.3,0,l/2,h-.15);let d=Math.max(2,Math.round(c/2.2));s.fine(()=>{for(let S=0;S<=d;S++)i.cyl(C.METAL,.03,.03,.95,5,-c/2+c*S/d,l+.47,h-.15);let[y,_]=i.w(-c/2,h-.15),[b,M]=i.w(c/2,h-.15);s.between(C.METAL,.035,y,l+.95,_,b,l+.95,M,6),s.line(y,l+.5,_,b,l+.5,M)});let m=Math.max(1,Math.round(c/13)),g=[];for(let y=1;y<m+1;y++)g.push(-c/2+c*y/(m+1));let x=1.1;for(let y=0;y<r;y++){let _=l+y*a,b=u[Math.floor(y/(t.band||2))%u.length],M=u[(Math.floor(y/(t.band||2))+1)%u.length];i.box(b,c,a,o,0,_+a/2,h+o*(y+.5));let S=[-c/2,...g.flatMap(T=>[T-x/2,T+x/2]),c/2];if(s.fine(()=>{for(let T=0;T<S.length;T+=2){let v=S[T]+.1,A=S[T+1]-.1;A-v>.4&&i.box(M,A-v,.3,.07,(v+A)/2,_+a+.15,h+o*(y+1)-.1)}for(let T of g)i.box(C.CONCRETE,x-.1,a/2,o/2,T,_+a+a/4,h+o*(y+.25))}),t.density>0){let T=Math.floor(c/.62);for(let v=0;v<T;v++){let A=-c/2+.31+v*.62+(e()-.5)*.1;g.some(R=>Math.abs(A-R)<x/2+.15)||n.seats.push({f:i,lx:A,y:_+a,lz:h+o*(y+.5)+.05,w:t.density,seated:!0,row:y+(t.z0?20:0)})}}}let f=l+r*a,p=h+o*r;i.box(t.wallRole||C.CONCRETE,c+.4,f+1.4,.35,0,(f+1.4)/2,p+.17);for(let y of[-1,1])i.box(t.wallRole||C.CONCRETE,.35,f+.6,p-h,y*(c/2+.17),(f+.6)/2,h+(p-h)/2);if(t.roof){let y=f+(t.roofClear||3.2),_=p-h+1.5,b=Math.max(2,Math.round(c/12));for(let T=0;T<=b;T++){let v=-c/2+c*T/b;i.cyl(C.METAL,.16,.16,y,8,v,y/2,p+.1)}i.box(t.roofRole||C.ROOF,c+1.2,.35,_,0,y,p-_/2+.6,{rx:-.07}),i.box(C.METAL,c+1.2,.5,.25,0,y-.3,p-_+.7),s.detail=!0;let M=p-_+.7,S=Math.tan(.07);for(let T=0;T<=b;T++){let v=-c/2+c*T/b,[A,R]=i.w(v,p+.1),[P,N]=i.w(v,M),z=y-.2,k=y-.2+(p+.1-M)*-S;s.between(C.METAL,.07,A,z,R,P,k,N,5);let F=6;for(let $=0;$<F;$++){let Y=$/F,st=($+1)/F,[K,tt]=i.w(v,p+.1+(M-p-.1)*Y),[q,mt]=i.w(v,p+.1+(M-p-.1)*st),wt=z+(k-z)*Y,at=z+(k-z)*st,nt=1.1*(1-Y)+.2,zt=1.1*(1-st)+.2;s.line(K,wt,tt,q,at-zt,mt),s.line(K,wt-nt,tt,q,at-zt,mt)}}for(let T of[.35,.7]){let v=p+.1+(M-p-.1)*T,[A,R]=i.w(-c/2,v),[P,N]=i.w(c/2,v),z=y-.25+(p+.1-v)*-S;s.between(C.METAL,.05,A,z,R,P,z,N,5)}s.detail=!1}if(t.banners){let y=Math.max(1,Math.floor(c/10));for(let _=0;_<y;_++){let b=-c/2+c*(_+.5)/y;i.box(_%2?C.BANNER_HOME:C.GOLD,5,.9,.06,b,l*.55+.3,h-.35)}}return{top:f,back:p}}function Mp(s,t,e,n){let i=Math.atan2(-t,-e),r=new pi(s,t,e,i),o=1,a=.4,l=(d,m,g)=>{let x=o+(a-o)*g;return r.w(d*x,m*x)},c=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let[d,m]of c){let[g,x]=l(d,m,0),[f,p]=l(d,m,1);s.between(C.METAL,.07,g,0,x,f,n,p,6)}s.detail=!0;let h=Math.round(n/3);for(let d=0;d<h;d++){let m=d/h,g=(d+1)/h;for(let x=0;x<4;x++){let[f,p]=c[x],[y,_]=c[(x+1)%4],[b,M]=l(f,p,m),[S,T]=l(y,_,m),[v,A]=l(f,p,g),[R,P]=l(y,_,g);d%2?s.line(b,n*m,M,R,n*g,P):s.line(S,n*m,T,v,n*g,A),d%2&&s.line(v,n*g,A,R,n*g,P)}}for(let d of[-.2,.2]){let[m,g]=r.w(d,1.05),[x,f]=r.w(d,.45);s.line(m,.2,g,x,n,f)}for(let d=1;d<n/.6;d++){let m=d*.6/n,g=1.05+(.45-1.05)*m,[x,f]=r.w(-.2,g),[p,y]=r.w(.2,g);s.line(x,d*.6,f,p,d*.6,y)}r.box(C.METAL,3.2,.15,1.6,0,n,0);for(let[d,m]of[[-1.6,-.8],[1.6,-.8],[1.6,.8],[-1.6,.8]])r.cyl(C.METAL,.03,.03,1,5,d,n+.5,m);for(let[d,m,g,x]of[[-1.6,-.8,1.6,-.8],[1.6,-.8,1.6,.8],[1.6,.8,-1.6,.8],[-1.6,.8,-1.6,-.8]]){let[f,p]=r.w(d,m),[y,_]=r.w(g,x);s.line(f,n+1,p,y,n+1,_)}s.detail=!1,r.box(C.METAL,4.2,2.8,.22,0,n+2.4,.3,{rx:.35});let u=.35;for(let d=0;d<4;d++)for(let m=0;m<3;m++){let g=-1.5+d*1,x=-.9+m*.9,f=n+2.4+x*Math.cos(u),p=.3-.2-x*Math.sin(u);r.cyl(C.METAL,.36,.36,.3,10,g,f,p,{rx:Math.PI/2+u}),r.cyl(C.LAMP,.29,.29,.32,10,g,f,p-.02,{rx:Math.PI/2+u})}}function Bl(s,t,e){let o=0,a=(l,c,h,u,d)=>{let m=Math.abs(h-c),g=Math.max(1,Math.round(m/8)),x=m/g;for(let f=0;f<g;f++){let p=Math.min(c,h)+x*(f+.5),y=u?l:p,_=u?p:l;s.box(f%2?C.BOARD_A:C.BOARD_B,x-.06,.9,.12,y,.9/2,_,u?Math.PI/2:0);let b=.075,M=y+(u?-Math.sign(l)*b:0),S=_+(u?0:-Math.sign(l)*b),T=e[o++%e.length];s.quad(f%3===0?C.BANNER_HOME:C.INK,Math.min(x-.6,6),.62,M,.9/2,S,d,{uvRect:t.word(T)})}};a(28.6,-39.6,39.6,!1,Math.PI),a(-28.6,-39.6,39.6,!1,0),a(39.6,-28.6+1,-ft.HW-4,!0,-Math.PI/2),a(39.6,ft.HW+4,28.6-1,!0,-Math.PI/2),a(-39.6,-28.6+1,-ft.HW-4,!0,Math.PI/2),a(-39.6,ft.HW+4,28.6-1,!0,Math.PI/2)}function wo(s,t=27.2){for(let[e,n]of[[-9,C.BANNER_HOME],[9,C.BANNER_AWAY]]){let i=new pi(s,e,t,0);i.box(C.STAND_C,7,2.3,.15,0,1.15,1),i.box(C.CONCRETE,7.2,.12,1.9,0,.06,.25);let r=[[1,2.3],[.55,2.42],[0,2.38],[-.5,2.2],[-.8,1.9]];for(let o=0;o<r.length-1;o++){let[a,l]=r[o],[c,h]=r[o+1],u=Math.hypot(c-a,h-l);i.box(C.GLASS,7.1,.05,u,0,(l+h)/2,(a+c)/2,{rx:Math.atan2(h-l,a-c)})}for(let o of[-1,1])i.box(C.GLASS,.06,1.9,1.6,o*3.55,1.2,.2),i.box(C.METAL,.1,2.3,.1,o*3.55,1.15,-.7);s.fine(()=>{for(let o=0;o<7;o++){let a=-2.85+o*.95;i.box(n,.5,.08,.45,a,.48,.62),i.box(n,.5,.5,.07,a,.72,.86,{rx:-.12}),i.box(C.METAL,.06,.44,.06,a,.22,.62)}})}}var Eo=!1,Ao=!1;function Hl(s,t,e,n,i,r){let o=r||(i()<.45?"pine":i()<.75?"broadleaf":"poplar"),a=Au(i),l=(a()-.5)*.06;if(o==="pine"){s.cyl(C.TRUNK,.14*n,.24*n,2.4*n,7,t,1.2*n,e);let c=Eo?3:4;for(let h=0;h<c;h++){let u=h/c,d=(1.95-u*1.25)*n,m=(2.5-u*.7)*n;s.cone(h%2?C.TREE_2:C.TREE,d,m,9,t+l*h,(1.9+u*3.6)*n+m/2,e,{ry:a()*3,rz:l})}}else if(o==="poplar")s.cyl(C.TRUNK,.12*n,.2*n,2.2*n,7,t,1.1*n,e),s.add(ns(1,1),De.mat(t,4.6*n,e,0,a()*3,l,1.25*n,3.1*n,1.25*n),C.TREE_2),s.add(ns(1,1),De.mat(t+.35*n,3.6*n,e-.3*n,0,a()*3,0,1*n,1.9*n,1*n),C.TREE);else{let c=2.6*n;s.cyl(C.TRUNK,.18*n,.3*n,c,8,t,c/2,e);let h=[],u=Eo?1:Ao?2:3;for(let d=0;d<u;d++){let m=a()*Math.PI*2+d*2.1,g=(1.3+a()*.6)*n,x=t+Math.cos(m)*g,f=e+Math.sin(m)*g,p=c+(.9+a()*.6)*n;s.between(C.TRUNK,.1*n,t,c-.4*n,e,x,p,f,6),h.push([x,p+.5*n,f,(1.3+a()*.4)*n])}h.push([t,c+2.3*n,e,1.7*n]);for(let d=0;d<u;d++){let m=a()*Math.PI*2;h.push([t+Math.cos(m)*1.1*n,c+(1.1+a()*1.2)*n,e+Math.sin(m)*1.1*n,(1.1+a()*.4)*n])}h.forEach(([d,m,g,x],f)=>s.add(ns(1,1),De.mat(d,m,g,a()*3,a()*3,0,x,x*.85,x),f%2?C.TREE_2:C.TREE))}}function bu(s,t,e,n,i,r=C.HEDGE){let o=Au(i),a=2+Math.floor(o()*2)-(Ao&&n<1?1:0);for(let l=0;l<a;l++){let c=(.45+o()*.3)*n;s.add(ns(1,1),De.mat(t+(l-(a-1)/2)*.55*n,c*.75,e+(o()-.5)*.4*n,0,o()*3,0,c,c*.8,c),l%2?r:C.TREE_2)}}var lb=()=>Tr("pyramid",()=>{let s=new Ei(Math.SQRT1_2,1,4);return s.rotateY(Math.PI/4),s},30);function cb(s,t,e,n,i,r,o,a,l=C.ROOF_TILE){s.add(lb(),De.mat(t,e+r/2,n,0,a,0,i,r,o),l)}var Mu=()=>Tr("prism",()=>{let s=[[-.5,0,-.5],[.5,0,-.5],[.5,0,.5],[-.5,0,.5],[-.5,1,0],[.5,1,0]],t=[[0,3,4],[1,5,2],[0,5,1],[0,4,5],[3,5,4],[3,2,5],[0,2,3],[0,1,2]],e=[];for(let i of t)for(let r of i)e.push(...s[r]);let n=new Ye;return n.setAttribute("position",new fe(e,3)),n.computeVertexNormals(),n},30);function Su(s,t,e,n,i,r,o){let a=s.b,[l,c]=s.w(0,0);a.add(Mu(),De.mat(l,n-.02,c,0,s.ry,0,t-.02,i-.08,e-.02),o),a.add(Mu(),De.mat(l,n,c,0,s.ry,0,t+r*2,i+.12,e+r*2),C.ROOF_TILE),s.box(C.ROOF_TILE,t+r*2+.1,.12,.2,0,n+i+.1,0);let h=Eo?0:Math.max(2,Math.round(i/.45));a.detail=!0;for(let u=1;u<h;u++){let d=u/h,m=n+(i+.12)*d+.015,g=(e/2+r)*(1-d)+.02;for(let x of[-1,1]){let[f,p]=s.w(-(t/2+r),x*g),[y,_]=s.w(t/2+r,x*g);a.line(f,m,p,y,m,_)}}a.detail=!1}function rs(s,t,e,n,i,r,o=0){let a={ry:o,detail:!0};s.box(C.LINES,i+.16,r+.16,.1,t,e,n,a),s.box(C.GLASS,i,r,.12,t,e,n,a),Ao||(s.box(C.LINES,.06,r,.14,t,e,n,a),s.box(C.LINES,i,.06,.14,t,e+r*.12,n,a)),s.box(C.CONCRETE,i+.3,.08,.26,t,e-r/2-.1,n,a)}function wu(s,t,e,n=C.DOOR){s.b.fine(()=>hb(s,t,e,n))}function hb(s,t,e,n){s.box(C.LINES,1.16,2.22,.1,t,1.11,e),s.box(n,.96,2.08,.13,t,1.04,e),s.box(C.GLASS,.5,.36,.15,t,1.72,e),Ao?s.box(C.GOLD,.07,.07,.08,t+.32,1.05,e-.08):s.sphere(C.GOLD,.045,t+.32,1.05,e-.08,{ws:6,hs:4}),s.box(C.CONCRETE,1.5,.16,.6,t,.08,e-.3),s.box(C.ROOF_TILE,1.6,.1,.7,t,2.45,e-.3,{rx:.2})}function Gl(s,t,e,n,i){s.box(C.BRICK,.7,i,.6,t,e+i/2,n),s.box(C.CONCRETE,.84,.1,.74,t,e+i+.05,n);for(let r of[-.16,.16])s.cyl(C.BRICK,.08,.09,.32,7,t+r,e+i+.26,n)}function Tu(s,t,e,n){let[i,r]=s.w(-t/2,e),[o,a]=s.w(t/2,e);s.b.fine(()=>{s.b.between(C.METAL,.06,i,n,r,o,n,a,6),s.cyl(C.METAL,.045,.045,n,6,t/2-.1,n/2,e)})}function ub(s,t,e,n,i){let r=Au(n);Eo||s.b.fine(()=>db(s,t,e,r,i))}function db(s,t,e,n,i){let r=e-3.2;if(n()<.5){let l=Math.round(t/.5);for(let c=0;c<=l;c++){let h=-t/2+t*c/l;Math.abs(h-i)<.6||s.box(C.LINES,.08,.9,.05,h,.45,r)}for(let c of[.3,.72])s.box(C.LINES,i+t/2-.6,.07,.05,(-t/2+i-.6)/2,c,r),s.box(C.LINES,t/2-i-.6,.07,.05,(t/2+i+.6)/2,c,r)}else s.box(C.HEDGE,i+t/2-.7,.95,.6,(-t/2+i-.7)/2,.47,r),s.box(C.HEDGE,t/2-i-.7,.95,.6,(t/2+i+.7)/2,.47,r);s.box(C.CONCRETE,1.1,.03,3.1,i,.015,e-1.6);let[o,a]=s.w(-t/2+1,e-1.3);if(bu(s.b,o,a,.9,n,C.HEDGE),n()<.6){let[l,c]=s.w(t/2-1.2,e-1.2);bu(s.b,l,c,.6,n,C.FLOWER)}}function _u(s,t,e,n,i,r){let o=new pi(s,t,e,n),a=r||["gable","hip","terrace","cottage","gable"][Math.floor(i()*5)],l=i()<.5?C.HOUSE_A:C.HOUSE_B;if(a==="terrace"){let f=13.799999999999999,p=7,y=5.6;for(let _=0;_<3;_++){let b=-f/2+4.6*(_+.5);o.box(_%2?C.HOUSE_A:C.HOUSE_B,4.6,y,p,b,y/2,0),rs(o,b+.9,y*.72,-p/2-.02,1.1,1.2),rs(o,b-1,y*.72,-p/2-.02,.9,1.2),rs(o,b+.9,1.5,-p/2-.02,1.3,1.3),wu(o,b-1,-p/2-.02),_>0&&Gl(o,-f/2+4.6*_,y+.6,.6,1.8),o.box(C.LINES,.1,y,.05,-f/2+4.6*_,y/2,-p/2-.03)}o.box(C.BRICK,f+.1,.5,p+.1,0,.25,0),Su(o,f,p,y,2.4,.35,l),Tu(o,f,-p/2-.4,y),o.box(C.CONCRETE,f,.03,3.4,0,.015,-p/2-1.7);return}let c=7.5+i()*2.5,h=6.5+i()*1.5,u=a==="cottage"?3.2:5.6+i()*.8;o.box(l,c,u,h,0,u/2,0),o.box(C.BRICK,c+.1,.5,h+.1,0,.25,0);let d=(i()<.5?-1:1)*c*.18;wu(o,d,-h/2-.02);let m=[-c*.33,c*.33].filter(g=>Math.abs(g-d)>1.2);for(let g of m)rs(o,g,1.5,-h/2-.02,1.4,1.3);for(let g of[-1,1])rs(o,g*(c/2+.02),a==="cottage"?1.5:u*.7,0,1.1,1.1,Math.PI/2);if(a!=="cottage")for(let g of[-c*.3,0,c*.3])rs(o,g,u*.72,-h/2-.02,1.1,1.2);if(a==="hip"){let[g,x]=o.w(0,0);cb(s,g,u,x,c+.9,2.3,h+.9,o.ry),Gl(o,c*.28,u+.5,h*.15,1.9),o.box(C.ROOF_TILE,2.6,.14,1.6,d,2.75,-h/2-.8);for(let f of[-1.15,1.15])o.cyl(C.LINES,.07,.07,2.7,8,d+f,1.35,-h/2-1.45)}else{let g=a==="cottage"?3:2.6;if(Su(o,c,h,u,g,.4,l),Gl(o,-c*.32,u+g*.45,h*.12,1.4+g*.45),a==="cottage"){let x=-h*.18,f=u+g*.3;o.box(l,1.6,1.3,1.6,0,f+.4,x);let[p,y]=o.w(0,x);s.add(Mu(),De.mat(p,f+1.05,y,0,o.ry+Math.PI/2,0,1.9,.7,1.9),C.ROOF_TILE),rs(o,0,f+.4,x-.82,.9,.8)}}Tu(o,c+.6,-h/2-.35,u),ub(o,c,-h/2,i,d)}function Sp(s,t,e,n,i,r,o,a){let l=new pi(s,t,e,n);l.box(C.HOUSE_B,i,o,r,0,o/2,0),l.box(C.BRICK,i+.1,.5,r+.1,0,.25,0),Su(l,i,r,o,2,.5,C.HOUSE_B);let c=Math.max(2,Math.floor(i/3.4));for(let u=0;u<c;u++){let d=-i/2+i*(u+.5)/c;Math.abs(d)<1.4||rs(l,d,2,-r/2-.02,1.8,1.3)}wu(l,0,-r/2-.02),l.box(C.WOOD,i,.25,2.6,0,.12,-r/2-1.3);let h=Math.max(3,Math.round(i/3));for(let u=0;u<=h;u++)l.cyl(C.WOOD,.08,.08,o-.4,7,-i/2+i*u/h,(o-.4)/2,-r/2-2.5);l.box(C.ROOF_TILE,i+.4,.14,2.9,0,o-.35,-r/2-1.35,{rx:.12});for(let u=0;u<h;u++){let d=-i/2+i*(u+.5)/h;Math.abs(d)<1||l.box(C.WOOD,i/h-.2,.08,.08,d,.95,-r/2-2.5)}l.box(C.LINES,4.2,.7,.12,0,o+.2,-r/2-.1),l.box(C.BANNER_HOME,3.9,.45,.14,0,o+.2,-r/2-.1),Gl(l,i*.3,o+.6,.5,1.8),Tu(l,i+1,-r/2-.45,o);for(let u=0;u<3;u++){let[d,m]=l.w(-i/2+2+u*(i-4)/2,r/2+1.2);bu(s,d,m,1,a)}}function is(s,t,e,n,i,r=2.2){let o=Math.hypot(n-t,i-e),a=Math.max(1,Math.round(o/3));for(let c=0;c<=a;c++){let h=t+(n-t)*(c/a),u=e+(i-e)*(c/a);s.cyl(C.FENCE,.04,.04,r,6,h,r/2,u)}s.between(C.FENCE,.03,t,r,e,n,r,i,6);let l=Math.max(1,Math.round(o/.6));for(let c=0;c<l;c++){let h=t+(n-t)*(c/l),u=e+(i-e)*(c/l),d=t+(n-t)*((c+1)/l),m=e+(i-e)*((c+1)/l);s.line(h,.05,u,d,r,m),s.line(d,.05,m,h,r,u)}}function ss(s,t,e,n,i,r,o){let a=new pi(s,t,n,i);a.box(C.METAL,r+.8,o+.8,.5,0,e,.3),a.box(C.BANNER_HOME,r+.9,.22,.56,0,e+o/2+.3,.3);let l=e-o/2;for(let h of[-1,1])a.cyl(C.METAL,.2,.2,l,8,h*r*.35,l/2,.4);let c=Math.max(1,Math.round(l/2.4));return s.fine(()=>{for(let h=0;h<c;h++){let u=l*h/c,d=l*(h+1)/c,[m,g]=a.w(-r*.35,.4),[x,f]=a.w(r*.35,.4);s.line(m,u,g,x,d,f),s.line(x,u,f,m,d,g)}}),{x:t,y:e,z:n,ry:i,w:r,h:o}}function fb(s,t,e,n,i=28){let r=-t/2,o=0;for(let a=1;a<=i;a++){let l=a/i,c=-t/2+t*l,h=e*(1-Math.pow(2*l-1,2));s.between(C.GOAL_FRAME,1.3,r,o,n,c,h,n,10),r=c,o=h}for(let a=2;a<i-1;a+=2){let l=a/i,c=-t/2+t*l,h=e*(1-Math.pow(2*l-1,2));s.line(c,h,n,c,30,40),s.line(c,h,n,c,30,-40)}}function Er(s,t,e,n){let i=n.lenX,r=n.lenZ,o=[{cx:0,cz:-n.dz,ry:Math.PI,len:i},{cx:0,cz:n.dz,ry:0,len:i},{cx:n.dx,cz:0,ry:Math.PI/2,len:r},{cx:-n.dx,cz:0,ry:-Math.PI/2,len:r}],a=[];for(let l of o)a.push(Gn(s,{...n.stand,...l},t,e));if(n.corners)for(let[l,c]of[[1,1],[1,-1],[-1,1],[-1,-1]]){let h=Math.atan2(l,c),u=l*(n.dx-3),d=c*(n.dz-3);a.push(Gn(s,{...n.stand,cx:u+l*4,cz:d+c*4,ry:h,len:14,banners:!1},t,e))}return a}function Tp(s,t){let{atlas:e,quality:n="high",homeName:i="HOME",final:r=!1,seed:o=7}=t,a=Eu(o*31+s.length),l=n==="low"?.35:n==="medium"?.65:1;Eo=n==="low",Ao=n!=="high";let c=new De({bob:!0,atlas:!0}),h=new De,u={people:0,seats:[]},d=[],m=[i.toUpperCase(),"FIRST TOUCH","PLAY FAIR","KICKWELL","GRASSROOTS FC","NORTHLINE","VOLTA SPORTS","BLUEBIRD BANK"];e.reset();let g={type:s,name:To[s].name};switch(sb(c,{surroundX:s==="training"?90:60,surroundZ:s==="training"?70:45}),rb(h),s){case"community":{is(c,-40,-29,40,-29),is(c,-40,29,40,29),is(c,-40,-29,-40,29),is(c,40,-29,40,29),Gn(c,{cx:0,cz:-31,ry:Math.PI,len:26,rows:4,rowHeight:.38,base:.4,roles:[C.WOOD,C.STAND_B],roof:!0,roofClear:2.6,density:.6*l,wallRole:C.WOOD},a,u);let f=new pi(c,0,30.2,0);for(let p=0;p<60;p++)u.seats.push({f,lx:-34+a()*68,y:0,lz:a()*.8,w:1,seated:!1});wo(c,26.5),Sp(c,-48,8,-Math.PI/2,16,8,4.2,a);for(let p=0;p<7;p++)_u(c,-48+p*16+a()*3,48+a()*4,0,a);for(let p=0;p<6;p++)_u(c,-44+p*17+a()*3,-52-a()*4,Math.PI,a);for(let p=0;p<16;p++)Hl(c,-60+a()*120,(a()<.5?1:-1)*(36+a()*6),.8+a()*.5,a);for(let p=0;p<6;p++)Hl(c,48+a()*10,-25+a()*50,.8+a()*.5,a);d.push(ss(c,46,3.2,-16,-Math.PI/2,4,1.5));break}case"town":{Bl(c,e,m),Gn(c,{cx:0,cz:-31,ry:Math.PI,len:54,rows:9,roof:!0,roofClear:3.4,density:.5*l,banners:!0,roles:[C.STAND_C,C.STAND_A]},a,u),Gn(c,{cx:0,cz:31,ry:0,len:44,rows:5,density:.45*l,roles:[C.STAND_B,C.STAND_A]},a,u),Gn(c,{cx:42,cz:0,ry:Math.PI/2,len:30,rows:4,density:.45*l},a,u),Gn(c,{cx:-42,cz:0,ry:-Math.PI/2,len:30,rows:4,density:.4*l},a,u),wo(c);for(let[f,p]of[[-44,-34],[44,-34],[-44,34],[44,34]])Mp(c,f,p,24);d.push(ss(c,-47,7,18,Math.PI/2,6,2.2));for(let f=0;f<10;f++)Hl(c,-70+a()*140,(a()<.5?1:-1)*(52+a()*12),1+a()*.5,a);for(let f=0;f<5;f++)_u(c,-60+f*28,72,0,a);break}case"regional":{Bl(c,e,m);let f={rows:12,roof:!0,roofClear:3.4,density:.72*l,banners:!0,roles:[C.STAND_A,C.STAND_B,C.STAND_C]};Gn(c,{...f,cx:0,cz:-31,ry:Math.PI,len:66},a,u),Gn(c,{...f,cx:0,cz:31,ry:0,len:66,roof:!1,rows:10},a,u),Gn(c,{...f,cx:0,cz:31,ry:0,len:60,rows:8,base:6.4,z0:9.5,roofClear:3.6,roof:!0,banners:!1},a,u),Gn(c,{...f,cx:42,cz:0,ry:Math.PI/2,len:46,rows:9,roof:!1},a,u),Gn(c,{...f,cx:-42,cz:0,ry:-Math.PI/2,len:46,rows:9,roof:!1},a,u);let p=new pi(c,0,26.2,0);p.box(C.STAND_C,3.6,2.8,5.4,0,1.4,.6),p.cyl(C.BANNER_HOME,1.8,1.8,5.4,12,0,2.8,.6,{rx:Math.PI/2,theta:Math.PI}),p.box(C.CONCRETE,2.6,2.2,.1,0,1.1,-2.15),wo(c,27.5);for(let[y,_]of[[-40,-38],[40,-38],[-40,38],[40,38]])Mp(c,y,_,30);d.push(ss(c,46,10,0,-Math.PI/2,8,3));break}case"premier":{Bl(c,e,m);let f={rows:13,roofClear:3.6,density:.85*l,banners:!0,roles:[C.STAND_A,C.STAND_B]};Er(c,a,u,{lenX:68,lenZ:48,dx:42,dz:31,corners:!0,stand:f}),Er(c,a,u,{lenX:72,lenZ:52,dx:42,dz:31,corners:!1,stand:{...f,base:7,z0:12,rows:10,roof:!0,banners:!1,roles:[C.STAND_C,C.STAND_A]}}),Er(c,a,u,{lenX:74,lenZ:54,dx:42,dz:31,corners:!1,stand:{...f,base:12.5,z0:21,rows:7,roof:!0,roofClear:4,banners:!1,density:.7*l,roles:[C.STAND_B]}}),wo(c,27.5),d.push(ss(c,60,17,0,-Math.PI/2,14,5.5)),d.push(ss(c,-60,17,0,Math.PI/2,14,5.5));break}case"continental":{Bl(c,e,r?["FINAL","CONTINENTAL CUP","FIRST TOUCH",i.toUpperCase()]:m);let f={rows:14,roofClear:3.6,density:.95*l,banners:!0,roles:r?[C.GOLD,C.STAND_A]:[C.STAND_A,C.STAND_C]};Er(c,a,u,{lenX:68,lenZ:48,dx:42,dz:31,corners:!0,stand:f}),Er(c,a,u,{lenX:74,lenZ:54,dx:42,dz:31,corners:!0,stand:{...f,base:7.4,z0:12.5,rows:12,banners:r}}),Er(c,a,u,{lenX:78,lenZ:58,dx:42,dz:31,corners:!1,stand:{...f,base:14,z0:24,rows:8,roof:!0,roofClear:5,banners:!1,density:.8*l,roles:[C.STAND_B]}}),fb(c,150,72,0);for(let p=0;p<24;p++){let y=p/24*Math.PI*2,_=Math.cos(y)*80,b=Math.sin(y)*58,M=Math.cos(y+Math.PI/12)*80,S=Math.sin(y+Math.PI/12)*58;c.between(C.METAL,.5,_,30,b,M,30,S,6)}if(r)for(let p=0;p<8;p++)c.box(p%2?C.GOLD:C.BANNER_HOME,1.2,9,.1,-35+p*10,22,-52,0);wo(c,27.5),d.push(ss(c,64,21,0,-Math.PI/2,16,6)),d.push(ss(c,-64,21,0,Math.PI/2,16,6));break}case"training":{is(c,-46,-36,46,-36),is(c,-46,36,46,36),is(c,-46,-36,-46,36),is(c,46,-36,46,36);for(let y of[1,-1]){let _=Z.HL-.05,b=y*(ft.HW-.55),M=ft.H-.5;c.box(C.TARGET,.06,.9,.08,_,M,b-.45),c.box(C.TARGET,.06,.9,.08,_,M,b+.45),c.box(C.TARGET,.06,.08,.9,_,M-.45,b),c.box(C.TARGET,.06,.08,.9,_,M+.45,b)}for(let y=0;y<8;y++)c.cone(C.CONE,.14,.32,10,-26+y*1.8,.16,-24.5);for(let y=0;y<3;y++){let _=-20+y*8;for(let b of[0,1.6])c.cone(C.CONE,.16,.4,10,_,.2,-27+b);c.box(C.TARGET,.06,.06,1.6,_,.55,-26.2)}let f=10,p=-30;for(let[y,_,b,M]of[[f,p,f+26,p],[f,p-1,f,p-5],[f+26,p,f+26,p-5]]){let S=Math.hypot(b-y,M-_);c.plane(C.LINES,S,Vl,(y+b)/2,Ru,(_+M)/2,{ry:Math.atan2(M-_,b-y)})}for(let y of[f+1,f+25])c.cyl(C.GOAL_FRAME,.04,.04,1.2,8,y,.6,p-1.8),c.cyl(C.GOAL_FRAME,.04,.04,1.2,8,y,.6,p-3.8),c.between(C.GOAL_FRAME,.04,y,1.2,p-1.8,y,1.2,p-3.8,8);Sp(c,0,49,0,26,10,4.6,a);for(let y=0;y<18;y++)Hl(c,-80+a()*160,(a()<.5?1:-1)*(44+a()*20),.9+a()*.6,a);for(let y=0;y<3;y++)c.box(C.WOOD,3,.45,.5,-10+y*10,.22,33);for(let y=0;y<6;y++)c.sphere(C.BALL_W,.11,20+y*.3,.11,33+y%2*.25,{ws:8,hs:6});d.push(ss(c,46,3,20,-Math.PI/2,4,1.5));break}}let x=Math.round(To[s].crowd*l);if(x>0&&u.seats.length){let f=u.seats,p=f.reduce((_,b)=>_+b.w,0),y=Math.min(1,x/p);for(let _ of f)a()<_.w*y&&(ab(_.f,_.lx,_.y,_.lz,a,_.seated,n==="high"&&(_.row==null||_.row<6)),u.people++)}return g.people=u.people,g.solid=c.buildSolid(),g.edges=c.buildEdges(),g.casterSolid=h.buildSolid(),g.casterEdges=h.buildEdges(),g.screens=d,g.edgeCount=c.edgeCount,g.vertCount=c.vcount,g}function Ep(s=3){let t=Eu(s),e=new De;for(let n=0;n<14;n++){let i=t()*Math.PI*2,r=260+t()*180,o=Math.cos(i)*r,a=Math.sin(i)*r,l=70+t()*70,c=3+Math.floor(t()*3);for(let h=0;h<c;h++){let u=9+t()*10;e.sphere(C.CLOUD,u,o+(h-c/2)*u*1.1,l+t()*4,a+(t()-.5)*8,{ws:10,hs:6,sy:.55})}}return{solid:e.buildSolid(),edges:e.buildEdges()}}var Ut={PELVIS:0,TORSO:1,HEAD:2,UARM_L:3,UARM_R:4,FARM_L:5,FARM_R:6,THIGH_L:7,THIGH_R:8,SHIN_L:9,SHIN_R:10,BOOT_L:11,BOOT_R:12},Rn=13,Ke={thigh:.44,shin:.43,ankle:.08,upper:.29,fore:.27,hipW:.095,shoulderW:.19,torsoH:.5,waist:.07,neck:.08},te=(s,t,e,n=0,i=0,r=0,o=1,a=1,l=1)=>De.mat(s,t,e,n,i,r,o,a,l),Ap={high:{body:16,limb:11,head:[16,12],small:[8,6],joint:[11,8],sole:11,studs:!0,laces:!0},medium:{body:10,limb:8,head:[12,9],small:[6,4],joint:[7,5],sole:7,studs:!1,laces:!0},low:{body:8,limb:6,head:[10,7],small:[5,4],joint:[6,4],sole:6,studs:!1,laces:!1}},Ar=[[0,.165,.112,0],[.1,.176,.118,.004],[.22,.2,.128,.01],[.34,.226,.134,.012],[.44,.236,.124,.002],[.5,.2,.108,-.004],[.545,.1,.07,0]],pb=[[-.13,.155,.112,0],[-.03,.171,.121,.002],[.08,.166,.114,0]],mb=[[.035,.172,.12,0],[.075,.17,.118,0]],gb=[[-.215,.079,.081,0],[-.02,.087,.089,.002],[.03,.086,.088,0]],xb=[[-.455,.044,.046,.004],[-.4,.05,.053,.004],[-.3,.056,.058,.004],[-.14,.064,.069,.008],[0,.066,.067,.004]],yb=[[-.43,.04,.041,.002],[-.3,.045,.046,0],[-.14,.055,.061,-.009],[-.06,.054,.058,-.004],[-.035,.049,.052,-.002]],vb=[[-.085,.057,.062,-.006],[-.05,.057,.061,-.005]],_b=[[-.155,.058,.058,0],[-.05,.066,.067,0],[.01,.066,.067,0]],bb=[[-.162,.06,.06,0],[-.138,.061,.061,0]],Mb=[[-.255,.029,.026,0],[-.08,.042,.041,0],[0,.04,.041,0]],Sb=[[-.058,.03,.03,.047],[-.04,.043,.048,.036],[.03,.049,.052,.034],[.1,.053,.04,.046],[.16,.049,.03,.056],[.205,.03,.019,.064]],wb=[[-.06,.036,.008,.086],[-.035,.047,.008,.087],[.1,.057,.008,.087],[.17,.052,.008,.087],[.212,.03,.008,.085]],Tb=[C.HAIR_1,C.HAIR_2,C.HAIR_1],Rp=[C.SKIN_1,C.SKIN_2,C.SKIN_3],Cp=["crop","curly","buzz","quiff","bun","beard"];function Eb(s){let t=s.team,e=s.isGK;return{shirt:e?t===0?C.GK_0:C.GK_1:t===0?C.SHIRT_0:C.SHIRT_1,shorts:e?t===0?C.GKX_0:C.GKX_1:t===0?C.SHORTS_0:C.SHORTS_1,socks:e?t===0?C.GKX_0:C.GKX_1:t===0?C.SOCKS_0:C.SOCKS_1,trim:e?t===0?C.GKX_0:C.GKX_1:t===0?C.TRIM_0:C.TRIM_1,num:t===0?C.NUM_0:C.NUM_1,skin:s.isHuman?C.SKIN_H:Rp[s.id*7%3],hair:s.isHuman?C.HAIR_H:Tb[s.id*5%3],boot:s.isHuman?C.BOOT_H:C.BOOT,hand:e?C.GLOVE:s.isHuman?C.SKIN_H:Rp[s.id*7%3]}}function Cu(s,t,e,n){let i=s.positions,r=new Array(i.length/3),o=(t-1)*e*2;for(let a=0;a<i.length/9;a++){let l=a<o?n(Math.floor(a%(2*e)/2),Math.floor(a/(2*e))):n(-1,-1);r[a*3]=r[a*3+1]=r[a*3+2]=l}return r}function Iu(s,t,e){let n=0;for(;n<Ar.length-2&&Ar[n+1][0]<s;)n++;let i=Ar[n],r=Ar[n+1],o=Math.min(1,Math.max(0,(s-i[0])/(r[0]-i[0]))),a=i[1]+(r[1]-i[1])*o,l=i[2]+(r[2]-i[2])*o,c=i[3]+(r[3]-i[3])*o,h=Math.min(.97,Math.abs(t)/a),u=l*Math.sqrt(1-h*h)*(e?-1:1);return{z:c+u,ry:Math.atan2(t/(a*a),u/(l*l))}}function Ab(s,t,e,n,i){let[r,o]=n.head,[a,l]=n.small;s.add(mn(.113,r,o),te(0,.14,-.004,0,0,0,.93,1.03,1),t.skin,e),s.add(mn(.083,Math.round(r*.75),Math.round(o*.75)),te(0,.078,.022,0,0,0,.97,.86,1),t.skin,e);for(let h of[-1,1])s.add(mn(.027,a,l),te(h*.106,.125,-.004,0,0,0,.45,1.15,.8),t.skin,e),s.add(mn(.0135,a,l),te(h*.041,.142,.101,0,0,0,1.25,1,.55),C.EYE,{...e,noEdges:!0}),s.add(Ri(.04,.01,.012),te(h*.041,.166,.1,0,0,-h*.12),t.hair,{...e,creaseOnly:!0});s.add(Mo(.019,.042,6),te(0,.118,.11,Math.PI/2+.25),t.skin,e),s.add(Ri(.036,.005,.006),te(0,.071,.103),C.EYE,{...e,noEdges:!0});let c=(h,u,d,m=.145,g=-.012)=>s.add(mn(h,r,Math.max(4,Math.round(o*.5)),Math.PI*2,Math.PI*u),te(0,m,g,d),t.hair,e);switch(i){case"buzz":c(.1165,.37,-.2);break;case"curly":{c(.118,.44,-.25);for(let h=0;h<9;h++){let u=h/9*Math.PI*2,d=h%2?.55:.95;s.add(ns(.046+h%3*.004,0),te(Math.sin(u)*.085*Math.sin(d),.15+.085*Math.cos(d),-.015+Math.cos(u)*.075*Math.sin(d)-.01,h,h*2,0),t.hair,e)}break}case"quiff":c(.119,.42,-.25),s.add(mn(.052,a,l),te(0,.232,.045,-.3,0,0,1.45,.75,1.25),t.hair,e);break;case"bun":c(.12,.45,-.3),s.add(mn(.045,a,l),te(0,.222,-.088),t.hair,e);break;case"beard":c(.1155,.33,-.15),s.add(mn(.089,r,Math.max(4,Math.round(o*.5)),Math.PI*2,Math.PI*.46),te(0,.078,.022,Math.PI-.6,0,0,.97,.86,1),t.hair,e);break;default:c(.12,.43,-.25)}}function Rb(s,t,e,n,i,r){let o=Eb(t),a=S=>({part:e+S}),l=t.isGK?"plain":r||"plain",c=l==="sleeves"?o.trim:o.shirt;s.add(gn("pelvis",pb,i.body),te(0,0,0),o.shorts,a(Ut.PELVIS)),s.add(gn("waistband",mb,i.body,{caps:[!1,!1]}),te(0,0,0),o.trim,a(Ut.PELVIS));let h=gn("torso",Ar,i.body),u=null,d=i.body,m=Ar.length,g=(S,T)=>Math.abs((S+.5)/d-.5)<.09&&T>=1&&T<=3;l==="stripes"?u=Cu(h,m,d,(S,T)=>S>=0&&S%2===1&&!g(S,T)?o.trim:o.shirt):l==="band"?u=Cu(h,m,d,(S,T)=>T===2?o.trim:o.shirt):l==="halves"&&(u=Cu(h,m,d,S=>S>=d/2?o.trim:o.shirt)),s.add(h,te(0,0,0),o.shirt,{...a(Ut.TORSO),roles:u}),s.add(gn("collar",[[.515,.084,.064,.002],[.55,.074,.056,.002]],i.body,{caps:[!1,!1]}),te(0,0,0),o.trim,a(Ut.TORSO)),s.add(wr(.047,.053,.12,i.limb),te(0,.575,0),o.skin,a(Ut.TORSO));let x=String(t.number??0),f=x.length>1?.12:.16;for(let S=0;S<x.length;S++){let T=(S-(x.length-1)/2)*f*.95,v=Iu(.3,T,!0);s.add(Ul(f,.2),te(T,.3,v.z-.005,0,v.ry,0),o.num,{...a(Ut.TORSO),uvRect:n.digit(+x[S]),noEdges:!0})}let p=Iu(.37,-.085,!1);s.add(Ul(.06,.08),te(-.085,.37,p.z+.004,0,p.ry,0),o.num,{...a(Ut.TORSO),uvRect:n.digit(+x[x.length-1]),noEdges:!0});let y=Iu(.38,.085,!1);s.add(Ri(.042,.05,.008),te(.085,.38,y.z+.002,0,y.ry,0),o.trim,a(Ut.TORSO)),s.add(Ri(.02,.02,.01),te(.085,.383,y.z+.005,0,y.ry,Math.PI/4),o.shirt,{...a(Ut.TORSO),noEdges:!0});let _=t.isHuman?"crop":Cp[(t.id*5+(t.number||0)*3)%Cp.length];Ab(s,o,a(Ut.HEAD),i,_);let[b,M]=i.small;for(let[S,T,v]of[[Ut.UARM_L,Ut.FARM_L,1],[Ut.UARM_R,Ut.FARM_R,-1]]){s.add(mn(.066,i.limb,Math.round(i.limb*.7)),te(0,-.005,0),c,a(S)),s.add(gn("sleeve",_b,i.limb,{caps:[!1,!1]}),te(0,0,0),c,a(S)),s.add(gn("cuff",bb,i.limb,{caps:[!1,!1]}),te(0,0,0),o.trim,a(S)),s.add(wr(.045,.039,.3,i.limb),te(0,-.15,0),o.skin,a(S)),s.add(mn(.04,i.joint[0],i.joint[1]),te(0,0,0),o.skin,{...a(T),noEdges:!0}),s.add(gn("fore",Mb,i.limb),te(0,0,0),o.skin,a(T));let A=t.isGK?1.32:1;s.add(mn(.046,b+2,M+1),te(0,-.29-(A-1)*.02,.004,0,0,0,.72*A,1.12*A,.5*A),o.hand,a(T)),s.add(mn(.02,b,M),te(-v*.016*A,-.272,.028*A,.3,0,0,.9*A,1.5*A,.9*A),o.hand,a(T)),t.isGK&&s.add(gn("wrist",[[-.27,.046,.042,0],[-.238,.045,.041,0]],i.limb,{caps:[!1,!1]}),te(0,0,0),o.trim,a(T))}for(let[S,T,v,A]of[[Ut.THIGH_L,Ut.SHIN_L,Ut.BOOT_L,1],[Ut.THIGH_R,Ut.SHIN_R,Ut.BOOT_R,-1]]){if(s.add(gn("shortsleg",gb,i.limb,{caps:[!1,!1]}),te(0,0,0),o.shorts,a(S)),s.add(Ri(.014,.2,.024),te(A*.084,-.1,0),o.trim,{...a(S),creaseOnly:!0}),s.add(gn("thigh",xb,i.limb),te(0,0,0),o.skin,a(S)),s.add(mn(.047,i.joint[0],i.joint[1]),te(0,-.005,.006),o.skin,{...a(T),noEdges:!0}),s.add(gn("sock",yb,i.limb),te(0,0,0),o.socks,a(T)),s.add(gn("sockband",vb,i.limb,{caps:[!1,!1]}),te(0,0,0),o.trim,a(T)),s.add(gn("boot",Sb,i.limb,{axis:"z"}),te(0,0,0),o.boot,a(v)),s.add(gn("sole",wb,i.sole,{axis:"z"}),te(0,0,0),C.INK,{...a(v),creaseOnly:!0}),i.studs)for(let[R,P]of[[-.028,-.035],[.028,-.035],[-.034,.07],[.034,.07],[-.03,.14],[.03,.14]])s.add(wr(.009,.007,.014,5),te(R,-.1,P),C.INK,{...a(v),noEdges:!0});if(i.laces){for(let R of[-1,1])s.add(Ri(.004,.012,.11),te(R*.051,-.05,.06,-.18),C.LINES,{...a(v),noEdges:!0});for(let R=0;R<3;R++)s.add(Ri(.034,.004,.008),te(0,-.004-R*.006,.02+R*.03,-.2),C.LINES,{...a(v),noEdges:!0})}}}function Cb(s,t){let e=new Xi(.11,3),n=new Xi(1,0).toNonIndexed(),i=[],r=n.attributes.position;for(let c=0;c<r.count;c++){let h=new L(r.getX(c),r.getY(c),r.getZ(c)).normalize();i.some(u=>u.distanceTo(h)<.001)||i.push(h)}let o=Tr("ball",()=>e,70),a=[],l=new L;for(let c=0;c<o.positions.length;c+=9){l.set(o.positions[c]+o.positions[c+3]+o.positions[c+6],o.positions[c+1]+o.positions[c+4]+o.positions[c+7],o.positions[c+2]+o.positions[c+5]+o.positions[c+8]).normalize();let h=-1;for(let d of i)h=Math.max(h,d.dot(l));let u=h>Math.cos(.36)?C.BALL_B:C.BALL_W;a.push(u,u,u)}s.add(o,new ae,C.BALL_W,{part:t,roles:a})}var Wl=class s{constructor(t,e,n={}){this.players=t,this.rows=t.length*Rn+1,this.ballRow=t.length*Rn;let i=Math.max(1,this.rows);this.data=new Float32Array(16*i),this.texture=new Ss(this.data,4,i,wn,Sn),this.texture.minFilter=Ge,this.texture.magFilter=Ge,this.texture.needsUpdate=!0,At.uParts.value=this.texture;let r=new De({parts:!0,atlas:!0}),o=Ap[n.quality]||Ap.high,a=n.kits||[];t.forEach((l,c)=>Rb(r,l,c*Rn,e,o,a[l.team]&&a[l.team].pattern)),Cb(r,this.ballRow),this.solidGeo=r.buildSolid(),this.edgeGeo=r.buildEdges(),this.mesh=new se(this.solidGeo,s.solidMaterial()),this.mesh.frustumCulled=!1,this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.mesh.customDepthMaterial=s.depthMaterial(),this.edges=new se(this.edgeGeo,s.edgeMaterial()),this.edges.frustumCulled=!1,this.edges.renderOrder=1;for(let l=0;l<this.rows;l++)this.setIdentity(l)}static solidMaterial(){return s._sm||(s._sm=fi({parts:!0,atlas:!0}))}static edgeMaterial(){return s._em||(s._em=Qn({parts:!0,widthScale:.75}))}static depthMaterial(){return s._dm||(s._dm=pp())}setIdentity(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=this.data[e+15]=1}setMatrix(t,e){this.data.set(e.elements,t*16)}hide(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=1e-4,this.data[e+13]=-50,this.data[e+15]=1}commit(){this.texture.needsUpdate=!0}dispose(){this.solidGeo.dispose(),this.edgeGeo.dispose(),this.texture.dispose()}};var ot=class s{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}clone(){return new s(this.x,this.y,this.z)}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}addScaled(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}scale(t){return this.x*=t,this.y*=t,this.z*=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}len(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}lenSq(){return this.x*this.x+this.y*this.y+this.z*this.z}lenXZ(){return Math.sqrt(this.x*this.x+this.z*this.z)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}dotXZ(t){return this.x*t.x+this.z*t.z}dist(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return Math.sqrt(e*e+n*n+i*i)}distXZ(t){let e=this.x-t.x,n=this.z-t.z;return Math.sqrt(e*e+n*n)}normalize(){let t=this.len();return t>1e-9&&(this.x/=t,this.y/=t,this.z/=t),this}flatNormalize(){this.y=0;let t=Math.sqrt(this.x*this.x+this.z*this.z);return t>1e-9&&(this.x/=t,this.z/=t),this}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}isFinite(){return Number.isFinite(this.x)&&Number.isFinite(this.y)&&Number.isFinite(this.z)}},ht=(s,t,e)=>s<t?t:s>e?e:s,Ro=(s,t,e)=>s+(t-s)*e;var Ip=Math.PI*2;function Pp(s){return s=(s+Math.PI)%Ip,s<0&&(s+=Ip),s-Math.PI}var os=(s,t)=>Pp(t-s),Bt=(s,t)=>Math.atan2(s,t);function Lp(s,t,e){let n=os(s,t);return Math.abs(n)<=e?t:Pp(s+Math.sign(n)*e)}function ti(s,t,e,n,i,r){let o=i-e,a=r-n,l=o*o+a*a,c=l>1e-9?((s-e)*o+(t-n)*a)/l:0;c=ht(c,0,1);let h=e+o*c,u=n+a*c,d=s-h,m=t-u;return{d:Math.sqrt(d*d+m*m),t:c}}function Rr(s){return s<1.5?1+s*.17:s<5?1.25+(s-1.5)*.4:2.65+(s-5)*.27}function Cr(s){return ht(.64/s,.18,.6)}var Ib=1;function Pb(s=50){return{pace:s,stamina:s,control:s,passing:s,finishing:s,tackling:s}}var Xl=class{constructor(t={}){this.id=Ib++,this.team=t.team??0,this.slot=t.slot??0,this.role=t.role||"CM",this.side=t.side??0,this.number=t.number??7,this.name=t.name||"Player",this.isHuman=!!t.isHuman,this.isGK=this.role==="GK",this.attrs=Object.assign(Pb(50),t.attrs||{}),this.keeping=t.keeping??50,this.foot=t.foot||"R",this.look=t.look||null,this.pos=new ot,this.prevPos=new ot,this.vel=new ot,this.yaw=0,this.prevYaw=0,this.headYaw=0,this.desired=new ot,this.sprint=!1,this.faceYaw=null,this.stamina=1,this.gait=0,this.prevGait=0,this.action=null,this.slideReadyAt=0,this.tackleReadyAt=0,this.noCaptureUntil=0,this.stumbleUntil=0,this.downUntil=0,this.touch=null,this.celebrate=0,this.hold=null,this.requestUntil=0,this.requestReadyAt=0,this.ackUntil=0,this.lastKickAt=-10,this.ai={state:"shape",target:new ot,think:0,sprint:!1,stuckT:0,lastDist:0}}get speed(){return Math.sqrt(this.vel.x*this.vel.x+this.vel.z*this.vel.z)}jogSpeed(){return 4.9+(this.attrs.pace-50)*.018}sprintSpeed(){let t=this.stamina<.35?(.35-this.stamina)/.35:0;return(7+(this.attrs.pace-50)*.03)*(1-.12*t)}maxSpeed(t,e){let n=t&&this.stamina>.02?this.sprintSpeed():this.jogSpeed();return e&&(n*=t?.9:.93),n}forwardX(){return Math.sin(this.yaw)}forwardZ(){return Math.cos(this.yaw)}};function Np(s){s.action=null,s.vel.set(0,0,0),s.desired.set(0,0,0),s.stumbleUntil=0,s.downUntil=0,s.celebrate=0,s.hold=null,s.requestUntil=0,s.prevPos.copy(s.pos),s.prevYaw=s.yaw}function Dp(s,t,e,n=1/0,i=!1){s.prevPos.copy(s.pos),s.prevYaw=s.yaw,s.prevGait=s.gait;let r=s.action;if(r&&r.type==="slide"&&r.sliding){s.pos.addScaled(s.vel,t),kp(s,t,!0);return}if(r&&r.type==="dive"){s.pos.addScaled(s.vel,t),s.pos.y=0;return}let o=n;e<s.downUntil?o=0:e<s.stumbleUntil&&(o=Math.min(o,1.6));let a=s.desired,l=Math.sqrt(a.x*a.x+a.z*a.z),c=Math.min(s.maxSpeed(s.sprint,i),o),h=a.x,u=a.z;l>c&&(h*=c/l,u*=c/l,l=c);let d=s.vel.x,m=s.vel.z,g=h-d,x=u-m,f=Math.sqrt(g*g+x*x),p=12.5+s.attrs.pace*.04,_=(h*d+u*m<d*d+m*m-.01?24:p)*t;f>_&&(g*=_/f,x*=_/f),s.vel.x+=g,s.vel.z+=x,s.vel.y=0,s.pos.x+=s.vel.x*t,s.pos.z+=s.vel.z*t,s.pos.y=0;let b=s.faceYaw,M=s.speed;b==null&&(b=M>.4?Bt(s.vel.x,s.vel.z):s.yaw);let S=(s.isHuman?14:9)*t;s.yaw=Lp(s.yaw,b,S);let T=1.35-s.attrs.stamina*.007;s.sprint&&M>s.jogSpeed()*1.03?s.stamina-=.068*T*t:M<2.2?s.stamina+=.05*t:s.stamina+=.014*t,s.stamina=ht(s.stamina,0,1),kp(s,t,!1)}function kp(s,t,e){let n=e?0:s.speed;n>.05&&(s.gait+=n*t/Rr(n))}function Op(s){let t=s.length;for(let e=0;e<t;e++){let n=s[e];for(let i=e+1;i<t;i++){let r=s[i],o=r.pos.x-n.pos.x,a=r.pos.z-n.pos.z,l=o*o+a*a,c=.62;if(l<c*c&&l>1e-8){let h=Math.sqrt(l),u=(c-h)*.5,d=o/h,m=a/h,g=n.action&&n.action.type==="slide"?.3:1,x=r.action&&r.action.type==="slide"?.3:1,f=g+x;n.pos.x-=d*u*2*(g/f),n.pos.z-=m*u*2*(g/f),r.pos.x+=d*u*2*(x/f),r.pos.z+=m*u*2*(x/f)}else l<=1e-8&&(r.pos.x+=.05)}}}var Jt=pe,as=class{constructor(){this.pos=new ot(0,Jt,0),this.prevPos=new ot(0,Jt,0),this.vel=new ot,this.spin=new ot,this.sideSpin=0,this.q=[0,0,0,1],this.prevQ=[0,0,0,1],this.state="dead",this.owner=null,this.lastTouch=null,this.lastTouchTime=-10,this.lastKick=null,this.lastValid=new ot(0,Jt,0),this.crossing=[null,null],this.net=[null,null],this.version=0,this.onGround=!0}place(t,e,n=Jt){this.net[0]=this.net[1]=null,this.pos.set(t,n,e),this.prevPos.copy(this.pos),this.vel.set(0,0,0),this.spin.set(0,0,0),this.sideSpin=0,this.crossing[0]=this.crossing[1]=null,this.version++}setVelocity(t){this.vel.copy(t),this.version++}get speed(){return this.vel.len()}get airborne(){return this.pos.y>Jt+.04||Math.abs(this.vel.y)>.3}};function ku(s,t=0){let e=An.ROLL_A0,n=An.ROLL_C,i=Math.sqrt(n/e),r=Math.sqrt(e*n);return(Math.atan(s*i)-Math.atan(t*i))/r}function Yl(s,t){let e=An.ROLL_A0,n=An.ROLL_C,i=((e+n*t*t)*Math.exp(2*n*s)-e)/n;return Math.sqrt(Math.max(0,i))}var NT=new ot;function Fp(s,t){let e=s.vel,n=s.pos,i=n.y<=Jt+.002&&Math.abs(e.y)<.05;if(s.onGround=i,i){n.y=Jt,e.y=0;let r=Math.sqrt(e.x*e.x+e.z*e.z);if(r>0){let o=(An.ROLL_A0+An.ROLL_C*r*r)*t,a=r-o;a<.035?(e.x=0,e.z=0):(e.x*=a/r,e.z*=a/r)}s.spin.x=e.z/Jt,s.spin.z=-e.x/Jt,s.spin.y*=.96,s.sideSpin*=.9}else{e.y-=zl*t;let r=e.len(),o=An.AIR_DRAG*r*t;if(e.x-=e.x*o,e.y-=e.y*o,e.z-=e.z*o,s.sideSpin!==0){let a=An.MAGNUS*s.sideSpin*t,l=e.x,c=e.z;e.x+=a*c,e.z-=a*l,s.sideSpin*=1-.3*t}s.spin.x*=1-.05*t,s.spin.y*=1-.05*t,s.spin.z*=1-.05*t}n.x+=e.x*t,n.y+=e.y*t,n.z+=e.z*t}function Bp(s,t){let e=s.pos,n=s.vel;if(e.y<Jt)if(e.y=Jt,n.y<-.9){let i=-n.y;n.y=i*An.BOUNCE*(i>7?.92:1),n.x*=An.BOUNCE_FRICTION,n.z*=An.BOUNCE_FRICTION,s.sideSpin*=.6,t&&t.onBounce&&t.onBounce(s,i)}else n.y=0}function Up(s,t,e,n,i,r,o,a,l){let c=s.pos,h=s.vel;if(c.y<n-Jt||c.y>i+Jt)return!1;let u=c.x-t,d=c.z-e,m=ht(c.y,n,i),g=c.y-m,x=u*u+d*d+g*g,f=Jt+r;if(x>=f*f||x<1e-10)return!1;let p=Math.sqrt(x),y=u/p,_=g/p,b=d/p,M=f-p;c.x+=y*M,c.y+=_*M,c.z+=b*M;let S=h.x*y+h.y*_+h.z*b;return S<0&&(h.x-=(1+o)*S*y,h.y-=(1+o)*S*_,h.z-=(1+o)*S*b,h.x*=.92,h.z*=.92,h.y*=.95,s.sideSpin*=.3,s.version++,a&&a.onFrame&&-S>1.2&&a.onFrame(s,-S,l)),!0}function Lb(s,t,e,n,i,r,o){let a=s.pos,l=s.vel,c=ht(a.z,-n,n),h=a.x-t,u=a.y-e,d=a.z-c,m=h*h+u*u+d*d,g=Jt+i;if(m>=g*g||m<1e-10)return!1;let x=Math.sqrt(m),f=h/x,p=u/x,y=d/x,_=g-x;a.x+=f*_,a.y+=p*_,a.z+=y*_;let b=l.x*f+l.y*p+l.z*y;return b<0&&(l.x-=(1+r)*b*f,l.y-=(1+r)*b*p,l.z-=(1+r)*b*y,l.x*=.93,l.z*=.93,s.version++,o&&o.onFrame&&-b>1.2&&o.onFrame(s,-b,"bar")),!0}function $l(s){let t=ht(s/ft.H,0,1);return Z.HL+ft.DEPTH+(ft.TOP_DEPTH-ft.DEPTH)*t}var Pu=.42;function Lu(s,t,e,n,i,r,o){let a=s.vel,l=a.x*t+a.y*e+a.z*n;if(l<0){let u=Math.min(1,(35+900*i)*r),d=-l*u;a.x+=t*d,a.y+=e*d,a.z+=n*d}else{let u=40*i*r;if(a.x+=t*u,a.y+=e*u,a.z+=n*u,l=a.x*t+a.y*e+a.z*n,l>1.2){let d=l-1.2;a.x-=t*d,a.y-=e*d,a.z-=n*d}}let c=1-Math.min(.5,4*r);if(a.x*=c,a.z*=c,i>Pu){let u=i-Pu;s.pos.x+=t*u,s.pos.y+=e*u,s.pos.z+=n*u}let h=s.net[o]||(s.net[o]={x:0,y:0,z:0,depth:0,nx:t,ny:e,nz:n,count:0});h.count++,i>=h.depth&&(h.x=s.pos.x,h.y=s.pos.y,h.z=s.pos.z,h.depth=Math.min(i,Pu),h.nx=t,h.ny=e,h.nz=n),s.version++}function ql(s,t,e,n,i){let r=s.pos,o=s.vel,a=Z.HL,l=ft.HW,c=ft.H,h=ft.POST_R,u=r.x*t;if(u<a-1.5||u>a+ft.DEPTH+1)return;let d=t*(a-h);if(Up(s,d,l+h,0,c+h,h,.62,i,"post"),Up(s,d,-(l+h),0,c+h,h,.62,i,"post"),Lb(s,d,c+h,l+h,h,.6,i),u<a-Jt)return;let m=$l(r.y),g=s.crossing[e];if(g&&g.inMouth&&u>a||Math.abs(r.z)<l&&r.y<c&&u<m){let f=m-u;if(f<Jt){let y=(ft.TOP_DEPTH-ft.DEPTH)/ft.H,_=-t,b=y,M=Math.hypot(1,y);_/=M,b/=M,Lu(s,_,b,0,(Jt-f)/M,n,e)}if(l-Math.abs(r.z)<Jt){let y=Math.sign(r.z)||1;Lu(s,0,0,-y,Jt-(l-Math.abs(r.z)),n,e)}c-r.y<Jt&&u>a&&Lu(s,0,-1,0,Jt-(c-r.y),n,e);let p=$l(Math.min(r.y,c))+.45;u>p&&(r.x=t*p,o.x*t>0&&(o.x*=-.1)),Math.abs(r.z)>l+.45&&(r.z=Math.sign(r.z)*(l+.45),o.z*=-.1),r.y>c+.45&&(r.y=c+.45,o.y>0&&(o.y*=-.1))}else if(u>a-Jt&&u<m+Jt&&r.y<c+Jt){let f=Math.abs(r.z)-l;if(f>-Jt&&f<Jt&&u>a){let p=Math.sign(r.z)||1,y=Jt-f;r.z+=p*y,o.z*p<0&&(o.z=-o.z*.15,o.x*=.7,o.y*=.8,s.version++)}else if(r.y>c-Jt&&Math.abs(r.z)<l&&u>a&&u<m){let p=Jt-(r.y-c);p>0&&(r.y+=p,o.y<0&&(o.y=-o.y*.2,o.x*=.8,o.z*=.8,s.version++))}else if(u>m-Jt&&u<m+Jt&&Math.abs(r.z)<l&&r.y<c){let p=m+Jt-u;p>0&&(r.x+=t*p,o.x*t<0&&(o.x=-o.x*.15,s.version++))}}}function kb(s){let t=s.pos,e=s.vel;t.x>hn.HL-Jt&&(t.x=hn.HL-Jt,e.x>0&&(e.x=-e.x*.3)),t.x<-hn.HL+Jt&&(t.x=-hn.HL+Jt,e.x<0&&(e.x=-e.x*.3)),t.z>hn.HW-Jt&&(t.z=hn.HW-Jt,e.z>0&&(e.z=-e.z*.3)),t.z<-hn.HW+Jt&&(t.z=-hn.HW+Jt,e.z<0&&(e.z=-e.z*.3)),t.y>40&&(t.y=40,e.y>0&&(e.y=0))}function Nb(s,t){for(let e=0;e<2;e++){let n=e===0?1:-1,i=t*n,r=s.pos.x*n;i<Z.HL&&r>=Z.HL?s.crossing[e]={z:s.pos.z,y:s.pos.y,inMouth:Math.abs(s.pos.z)<ft.HW&&s.pos.y<ft.H}:r<Z.HL-.5&&(s.crossing[e]=null)}}function Hp(s,t,e){if(s.prevPos.copy(s.pos),s.prevQ[0]=s.q[0],s.prevQ[1]=s.q[1],s.prevQ[2]=s.q[2],s.prevQ[3]=s.q[3],s.state==="held"||s.state==="dead"){zp(s,t);return}let n=s.vel.len(),i=Math.min(10,Math.max(1,Math.ceil(n*t/.06))),r=t/i;for(let o=0;o<i;o++){let a=s.pos.x;Fp(s,r),Bp(s,e),ql(s,1,0,r,e),ql(s,-1,1,r,e),kb(s),Nb(s,a),e&&e.bodies&&e.bodies(s,r)}!s.pos.isFinite()||!s.vel.isFinite()?(s.pos.copy(s.lastValid),s.vel.set(0,0,0),s.version++):s.lastValid.copy(s.pos),s.pos.y>Jt+.03||s.vel.y>.2?s.state==="free"&&(s.state="air"):s.state==="air"&&(s.state="free"),zp(s,t)}function zp(s,t){let e=s.spin,n=s.q,i=.5*t*e.x,r=.5*t*e.y,o=.5*t*e.z,a=n[0],l=n[1],c=n[2],h=n[3];n[0]=a+(i*h+r*c-o*l),n[1]=l+(r*h+o*a-i*c),n[2]=c+(o*h+i*l-r*a),n[3]=h-(i*a+r*l+o*c);let u=Math.hypot(n[0],n[1],n[2],n[3])||1;n[0]/=u,n[1]/=u,n[2]/=u,n[3]/=u}var Ir=class{constructor(t=200,e=1/60){this.steps=t,this.step=e,this.pts=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.count=0,this.t0=0,this.ghost=new as}compute(t,e){let n=this.ghost;n.pos.copy(t.pos),n.vel.copy(t.vel),n.sideSpin=t.sideSpin,n.state="free",n.spin.set(0,0,0),n.net[0]=n.net[1]=null,this.t0=e;let i=2,r=this.step/i,o=0;for(;o<this.steps;o++){this.pts[o*3]=n.pos.x,this.pts[o*3+1]=n.pos.y,this.pts[o*3+2]=n.pos.z,this.vel[o*3]=n.vel.x,this.vel[o*3+1]=n.vel.y,this.vel[o*3+2]=n.vel.z;for(let a=0;a<i;a++)Fp(n,r),Bp(n,null),ql(n,1,0,r,null),ql(n,-1,1,r,null);if(n.vel.x===0&&n.vel.z===0&&n.pos.y<=Jt+.001){o++;break}}return this.count=o,this}at(t,e){let n=t/this.step;n<=0&&(n=0);let i=Math.floor(n);if(i>=this.count-1){let l=(this.count-1)*3;return e.set(this.pts[l],this.pts[l+1],this.pts[l+2])}let r=n-i,o=i*3,a=o+3;return e.set(this.pts[o]+(this.pts[a]-this.pts[o])*r,this.pts[o+1]+(this.pts[a+1]-this.pts[o+1])*r,this.pts[o+2]+(this.pts[a+2]-this.pts[o+2])*r)}velAt(t,e){let n=Math.floor(Math.max(0,t)/this.step);return n>this.count-1&&(n=this.count-1),e.set(this.vel[n*3],this.vel[n*3+1],this.vel[n*3+2])}get duration(){return(this.count-1)*this.step}};var Co=new ot,VT=new ot;function Nu(s){return ht(6.2+s*.15,6.5,11.5)}function mi(s,t,e,n,i,r,o=12,a=null){let l=n-t,c=i-e,h=Math.hypot(l,c);if(h<.01)return 1;let u=l/h,d=c/h,m=0,g=s.players;for(let x=0;x<g.length;x++){let f=g[x];if(f.team===r||f===a||s.time<f.downUntil)continue;let p=f.pos.x-t,y=f.pos.z-e,_=p*u+y*d,b=Math.abs(p*d-y*u);if(_>-.4&&_<.9&&b<.9){m=Math.max(m,.9);continue}if(_<.6||_>h+1.2)continue;let M=f.isGK?1.5:.95,S=Math.min(_,h)/o,T=Math.max(0,b-M)/6.2+.22,v=ht((S-T+.3)/.55,0,1);v>m&&(m=v)}return 1-m}function Pr(s,t,e,n=.75,i=0){e.set(t.pos.x,0,t.pos.z);let r=0;for(let o=0;o<3;o++){let a=Math.hypot(e.x-s.x,e.z-s.z),l=Nu(a)+i,c=Math.min(26,Yl(a,l));r=ku(c,l),e.x=t.pos.x+t.vel.x*r*n,e.z=t.pos.z+t.vel.z*r*n}return Ii(e,.8),r}function Ii(s,t=.5){return s.x=ht(s.x,-Z.HL+t,Z.HL-t),s.z=ht(s.z,-Z.HW+t,Z.HW-t),s}function Vp(s,t,e,n,i=.72){let r=Gp(s,t,e,n,i);return!r&&i>=1&&(r=Gp(s,t,e,null,1.6)),r}function Gp(s,t,e,n,i){let r=null,o=-1/0,a=-1/0;for(let l of s.players){if(l===t||l.team!==t.team||s.time<l.downUntil)continue;Pr(t.pos,l,Co,.6);let c=Co.x-t.pos.x,h=Co.z-t.pos.z,u=Math.hypot(c,h);if(u<2.2||u>48)continue;let d=Math.abs(os(e,Math.atan2(c,h)));if(d>i)continue;let m=1-d/i,g=u<5?.55:u<26?1-Math.abs(u-14)/30:Math.max(0,.6-(u-26)/30),x=mi(s,t.pos.x,t.pos.z,Co.x,Co.z,t.team,12),f=m*m*1.8+g*.45+x*(i>.9?1.1:.8);l.isGK&&(f-=.7),l===n&&(f+=.3,a=f),f>o&&(o=f,r=l)}return n&&r!==n&&a>-1/0&&o<a+.12&&(r=n),!r||o<.35?null:r}function Lr(s,t,e,n){let i=t.x-s.x,r=t.z-s.z,o=Math.hypot(i,r),a=ht(Yl(o,e),4,27);return n.set(i/o*a,0,r/o*a),a}function Wp(s,t){let e=1.5,n=12;for(let i=0;i<24;i++){let r=(e+n)/2;ku(Yl(s,r),r)>t?e=r:n=r}return(e+n)/2}var Ci=new as;function Xp(s,t,e,n,i,r,o,a,l){Ci.pos.set(s,t,e),Ci.vel.set(n,i,r),Ci.sideSpin=o;let c=1/120,h=0;for(;h<a;){let u=Ci.vel;u.y-=zl*c;let d=u.len(),m=An.AIR_DRAG*d*c;if(u.x-=u.x*m,u.y-=u.y*m,u.z-=u.z*m,Ci.pos.addScaled(u,c),h+=c,l&&l(Ci.pos,h)||Ci.pos.y<pe)return h}return h}function Zl(s,t,e,n,i){let r=e.x-s.x,o=e.z-s.z,a=Math.hypot(r,o),l=r/a,c=o/a,h=Math.cos(n),u=Math.sin(n),d=3,m=40;for(let x=0;x<22;x++){let f=(d+m)/2;Xp(s.x,t,s.z,l*h*f,u*f,c*h*f,0,6,null),Math.hypot(Ci.pos.x-s.x,Ci.pos.z-s.z)<a?d=f:m=f}let g=(d+m)/2;return i.set(l*h*g,u*g,c*h*g),g}function $p(s,t,e,n,i,r,o){let a=n-s,l=r-e,c=Math.hypot(a,l),h=a/c,u=l/c,d=-.25,m=.75;for(let g=0;g<20;g++){let x=(d+m)/2,f=-100;Xp(s,t,e,h*Math.cos(x)*o,Math.sin(x)*o,u*Math.cos(x)*o,0,3,p=>(p.x-s)*h+(p.z-e)*u>=c?(f=p.y,!0):!1),f===-100&&(f=-1),f<i?d=x:m=x}return(d+m)/2}var Db=new Ir(240,1/60),Kl=new as;function qp(s,t,e,n){Kl.pos.copy(s),Kl.vel.copy(t),Kl.sideSpin=e||0;let i=Db.compute(Kl,0),r=i.pts;for(let o=1;o<i.count;o++){let a=r[(o-1)*3]*n,l=r[o*3]*n;if(a<Z.HL&&l>=Z.HL){let c=(Z.HL-a)/(l-a||1),h=r[(o-1)*3+2]+(r[o*3+2]-r[(o-1)*3+2])*c,u=r[(o-1)*3+1]+(r[o*3+1]-r[(o-1)*3+1])*c;return Math.abs(h)<ft.HW&&u<ft.H}}return!1}function Du(s,t,e){let n=e*Z.HL,i=Math.atan2(ft.HW-t,Math.abs(n-s)),r=Math.atan2(-ft.HW-t,Math.abs(n-s));return Math.abs(i-r)}var Ob={pass:.11,through:.12,shot:.085,cross:.17,lob:.15,clear:.13,throw:.32,gkthrow:.32,gkkick:.36,touch:.05},Ub={shot:.34,pass:.26,through:.26,cross:.3,lob:.3,clear:.3,throw:.35,gkthrow:.35,gkkick:.45},tc=new Set(["pass","through","cross","lob","throw","gkthrow","gkkick"]),Jl=new ot,KT=new ot,ZT=new ot;function Yp(s,t,e=0){let n=t.pos.x-s.pos.x,i=t.pos.z-s.pos.z,r=Math.sqrt(n*n+i*i);return!(r>1.1+e||t.pos.y>1||r>.8&&n*Math.sin(s.yaw)+i*Math.cos(s.yaw)<-.2)}function Ou(s,t,e=.7){let n=s.ball;if(Yp(t,n))return 0;if(n.state==="held"||n.state==="dead"||n.owner&&n.owner!==t)return null;let i=s.traj,r=1/60;for(let o=r;o<=e;o+=r){i.at(o+(s.time-i.t0),Jl);let a=t.pos.x+t.vel.x*o*.8,l=t.pos.z+t.vel.z*o*.8;if(Math.hypot(Jl.x-a,Jl.z-l)<.95&&Jl.y<.95)return o}return null}function zb(s,t){let e=t.pos.x-s.pos.x,n=t.pos.z-s.pos.z,i=e*Math.cos(s.yaw)-n*Math.sin(s.yaw);return i>.25?"L":i<-.25?"R":s.foot||"R"}function ls(s,t){if(s.time<t.downUntil)return!1;let e=t.action;return e?e.type==="kick"&&e.contacted?e.t>e.contactT+.1:e.type==="tackle"?e.t>.4:!1:!0}function ce(s,t,e,n={}){let i=n.minContact??Ob[e]??.12,r={type:"kick",kind:e,t:0,charging:!!n.charging,holdT:0,charge:n.charge??0,minContact:i,deadline:n.deadline??i+.75,contacted:!1,contactT:0,follow:Ub[e]??.28,target:n.target||null,point:n.point?new ot().copy(n.point):null,aimYaw:n.aimYaw??t.yaw,aimPitch:n.aimPitch??0,power:n.power??.6,elev:n.elev??null,firstTime:!!n.firstTime,restart:n.restart||null,foot:zb(t,s.ball),eta:i,fromHands:e==="throw"||e==="gkthrow"||e==="gkkick",ai:!!n.ai,owned:s.ball.owner===t};return t.action=r,r}function Ps(s){if(!s||!s.charging)return;s.charging=!1;let t=s.kind==="shot"?.085:.02;s.minContact=Math.max(s.minContact,s.t+t),s.deadline=s.minContact+.6}function Kp(s){let t=s.action;if(!t)return 1/0;let e=s.jogSpeed();return t.type==="kick"?t.fromHands?t.contacted?e*.5:1.2:t.contacted?e*.85:t.kind==="shot"&&t.charging?e*.7:t.inReach?e*.85:1/0:t.type==="tackle"?t.t<.32?t.lunge||4.2:2.2:t.type==="slide"?t.sliding?1/0:.4:(t.type==="celebrate",1/0)}function Fb(s,t,e){return e.kind==="shot"?e.aimYaw:e.target?Bt(e.target.pos.x-t.pos.x,e.target.pos.z-t.pos.z):e.point?Bt(e.point.x-t.pos.x,e.point.z-t.pos.z):e.aimYaw}function Zp(s,t,e){let n=t.action;if(n)switch(n.t+=e,n.type){case"kick":Bb(s,t,n,e);break;case"tackle":Xb(s,t,n,e);break;case"slide":$b(s,t,n,e);break;case"celebrate":n.t>n.dur&&(t.action=null);break;case"stumble":n.t>n.dur&&(t.action=null);break;case"dive":break;default:n.dur&&n.t>n.dur&&(t.action=null)}}function Bb(s,t,e,n){let i=s.ball;if(e.charging&&(e.holdT+=n,e.kind==="shot"?(e.charge=Math.min(1,e.holdT/.65),e.holdT>=.85&&Ps(e)):(e.charge=Math.min(1,Math.max(0,e.holdT-.1)/.3),e.holdT>=.4&&Ps(e))),e.contacted)e.t>e.contactT+e.follow&&(t.action=null,t.faceYaw=null);else{if(t.faceYaw=Fb(s,t,e),e.owned&&!e.restart&&i.owner!==t&&i.lastTouch!==t){t.action=null,t.faceYaw=null;return}let r=!i.owner||i.owner===t,o=e.restart?!0:e.fromHands?i.state==="held"&&i.owner===t:i.state!=="held"&&i.state!=="dead",a=e.fromHands||e.restart?!0:Yp(t,i);if(e.inReach=a,e.charging||(e.eta=Math.max(0,e.minContact-e.t)),!e.charging&&e.t>=e.minContact&&r&&o&&a){e.contacted=!0,e.contactT=e.t,Gb(s,t,e);return}if(!e.fromHands&&!e.restart&&r&&o&&!e.charging){let l=i.pos.x+i.vel.x*.15,c=i.pos.z+i.vel.z*.15,h=t.pos.x-l,u=t.pos.z-c,d=Math.hypot(h,u)||1;h=h/d*.7-Math.sin(t.faceYaw)*.3,u=u/d*.7-Math.cos(t.faceYaw)*.3;let m=Math.hypot(h,u)||1,g=l+h/m*.45,x=c+u/m*.45,f=g-t.pos.x,p=x-t.pos.z,y=Math.hypot(f,p);if(y<4){let _=Math.min(8,y*6)/(y||1);t.desired.x=f*_+i.vel.x,t.desired.z=p*_+i.vel.z}}!e.charging&&e.t>e.deadline&&(e.contacted=!0,e.missed=!0,e.contactT=e.t,s.events.emit("whiff",{player:t,kind:e.kind,t:s.time}))}}function jl(s){return s.gauss()}function Hb(s,t){let e=99;for(let n of s.players){if(n.team===t.team)continue;let i=n.pos.distXZ(t.pos);i<e&&(e=i)}return ht((2.4-e)/2.4,0,1)}function Ql(s,t){let e=Math.cos(t),n=Math.sin(t),i=s.x*e+s.z*n,r=-s.x*n+s.z*e;return s.x=i,s.z=r,s}function Gb(s,t,e){let n=s.ball,i=s.rng,r=new ot,o=0,a=e.point?e.point.clone():null,l=s.attackDir(t.team),c=t.isHuman,h=c?s.assist:null,u=!c&&s.isOpp(t)?s.aiParams[t.team]:null,d=ht(t.speed/7.5,0,1),m=Hb(s,t),g=!1,x=e.target,f=n.pos;e.kind==="throw"?n.pos.set(t.pos.x+Math.sin(t.yaw)*.25,2.05,t.pos.z+Math.cos(t.yaw)*.25):e.kind==="gkthrow"?n.pos.set(t.pos.x+Math.sin(t.yaw)*.6,.35,t.pos.z+Math.cos(t.yaw)*.6):e.kind==="gkkick"&&n.pos.set(t.pos.x+Math.sin(t.yaw)*.55,.7,t.pos.z+Math.cos(t.yaw)*.55),f=n.pos;let p=T=>{let v;return T==="shot"?v=(.011+(100-t.attrs.finishing)*45e-5)*(1+.45*d+.6*m):v=(.004+(100-t.attrs.passing)*22e-5)*(1+.35*d+.45*m),c&&h&&(v*=T==="shot"?h.shotError:h.passError),u&&(v*=T==="shot"?u.shotErr:u.passErr),e.foot!==t.foot&&(v*=1.12),v};switch(e.kind){case"pass":case"gkthrow":{if(x){a=new ot,Pr(f,x,a,x.isGK?0:.75,e.charge*3);let T=f.distXZ(a),v=x.isGK?3.5:Nu(T)+e.charge*4.5;c&&h.autoLob&&e.kind==="pass"&&!e.restart&&T>7&&!x.isGK&&mi(s,f.x,f.z,a.x,a.z,t.team,12)<.45?(Zl(f,f.y,a,ht(.42+T*.006,.42,.62),r),e.lofted=!0):Lr(f,a,v,r)}else{let T=(e.kind==="gkthrow"?18:11)+e.charge*18;a=a||new ot(f.x+Math.sin(e.aimYaw)*T,0,f.z+Math.cos(e.aimYaw)*T),Ii(a,.6),Lr(f,a,2.4,r)}Ql(r,jl(i)*p("pass")),e.kind==="gkthrow"&&(r.y=-.5);break}case"through":{if(x){a=Vb(s,x,a);let T=a.distXZ(x.pos)/x.sprintSpeed()+.28,v=f.distXZ(a);if(mi(s,f.x,f.z,a.x,a.z,t.team,11)<.4&&v>12)Zl(f,f.y,a,.62,r);else{let R=ht(Wp(v,T),2.6,10);Lr(f,a,R,r)}}else a=new ot(f.x+Math.sin(e.aimYaw)*17,0,f.z+Math.cos(e.aimYaw)*17),Ii(a,1),Lr(f,a,3.2,r);Ql(r,jl(i)*p("pass"));break}case"cross":case"lob":case"clear":case"gkkick":case"throw":{!a&&x&&(a=new ot,Pr(f,x,a,.6)),a||(a=new ot(f.x+Math.sin(e.aimYaw)*25,0,f.z+Math.cos(e.aimYaw)*25)),Ii(a,.5);let T=e.elev??(e.kind==="cross"?.4:e.kind==="clear"?.6:e.kind==="throw"?.42:e.kind==="gkkick"?.55:.5),v=Zl(f,f.y,a,T,r);e.kind==="throw"&&v>15.5&&r.scale(15.5/v),Ql(r,jl(i)*p("pass")*1.2),r.y*=1+jl(i)*.03;break}case"shot":{let T=Wb(s,t,e,r,p("shot"));o=T.spin,a=T.point;break}case"touch":{a=new ot(f.x+Math.sin(e.aimYaw)*4,0,f.z+Math.cos(e.aimYaw)*4),Lr(f,a,2,r);break}}if(u&&tc.has(e.kind)&&e.kind!=="throw"&&i.next()<u.mistake){Ql(r,(i.next()<.5?-1:1)*(.1+i.next()*.22));let T=i.next()<.6?.55+i.next()*.2:1.18+i.next()*.2;r.x*=T,r.z*=T,r.y>0&&(r.y*=Math.sqrt(T)),e.mishit=!0}e.kind==="shot"&&(g=qp(f,r,o,l));let y=r.len(),_=r.x/(y||1),b=r.z/(y||1),M=r.y>3,S=(M?-1:1)*y/pe*(M?.35:.6);n.spin.set(b*S,(o||0)*2,-_*S),n.sideSpin=o||0,s.applyKick(t,r,e,{point:a,target:x,onTarget:g})}function Vb(s,t,e){let n=s.attackDir(t.team),i=n,r=0,o=t.speed;o>1.5&&t.vel.x*n>0&&(i+=t.vel.x/o*.9,r+=t.vel.z/o*.9),Math.abs(t.pos.z)>11&&(r-=Math.sign(t.pos.z)*.35);let a=Math.hypot(i,r);i/=a,r/=a;let l=9;for(let u of s.players){if(u.team===t.team||u.isGK)continue;let d=u.pos.x-t.pos.x,m=u.pos.z-t.pos.z,g=d*i+m*r,x=Math.abs(d*r-m*i);g>0&&x<4&&(l=Math.min(l,g+1.5))}let c=ht(l,4.5,9),h=e?e.clone():new ot(t.pos.x+i*c,0,t.pos.z+r*c);return h.x=ht(h.x,-Z.HL+1.5,Z.HL-1.5),h.z=ht(h.z,-Z.HW+1.5,Z.HW-1.5),h}function Wb(s,t,e,n,i){let r=s.ball,o=s.rng,a=s.attackDir(t.team),l=a*Z.HL,c=t.isHuman?s.assist.shotAim:0,h;if(e.ai&&e.point)h=e.point.clone();else{let b=t.pos.x,M=t.pos.z,S=Math.cos(e.aimPitch),T=Math.sin(e.aimYaw)*S,v=Math.sin(e.aimPitch),A=Math.cos(e.aimYaw)*S;if(T*a>.25&&(l-b)*a>1){let P=(l-b)/T;h=new ot(l,1.65+v*P,M+A*P);let N=Math.abs(h.z),z=ft.HW-.4;if(N>z&&N<ft.HW+1.8){let k=N-z,F=c*.6*ht(1-(N-ft.HW)/1.8,0,1);h.z-=Math.sign(h.z)*k*F}h.y>ft.H-.3&&h.y<ft.H+1.3&&(h.y-=(h.y-(ft.H-.35))*c*.45),h.y=ht(h.y,pe,4.5)}else h=new ot(b+T*22,ht(1.65+v*22,pe,7),M+A*22)}let u=e.ai?e.power:e.charge,d=Ro(15.5,29,Math.pow(ht(u,0,1),.85))*(.86+t.attrs.finishing*.0028);h.y+=u*u*.3;let m=Math.atan2(h.x-r.pos.x,h.z-r.pos.z),g=$p(r.pos.x,r.pos.y,r.pos.z,h.x,h.y,h.z,d);g=ht(g,-.12,.62);let x=Math.abs(os(t.yaw,m))/Math.PI,f=i*(1+x*.8)*(.75+.45*u);m+=o.gauss()*f,g+=o.gauss()*f*.55;let p=Math.cos(g);return n.set(Math.sin(m)*p*d,Math.sin(g)*d,Math.cos(m)*p*d),{spin:o.gauss()*4,point:h}}function ec(s,t){let e=s.time;if(e<t.tackleReadyAt||!ls(s,t))return!1;let n=s.ball,i=t.yaw,r=n.pos.distXZ(t.pos),o=t.isHuman&&r<3.4&&n.state!=="held"&&n.state!=="dead";(r<2.6||o)&&(i=Bt(n.pos.x+n.vel.x*.15-t.pos.x,n.pos.z+n.vel.z*.15-t.pos.z));let a=o?ht((r-.5)/.26+1.5,4.2,7.5):4.2;return t.action={type:"tackle",t:0,dir:i,done:!1,dur:.5,victims:new Set,homing:o,lunge:a},t.tackleReadyAt=e+be.TACKLE_COOLDOWN,t.faceYaw=i,s.events.emit("tackleAttempt",{player:t,t:e}),!0}function Xb(s,t,e,n){let i=s.ball,r=s.time;e.homing&&!e.done&&e.t<.2&&(e.dir=Bt(i.pos.x+i.vel.x*.1-t.pos.x,i.pos.z+i.vel.z*.1-t.pos.z)),t.faceYaw=e.dir;let o=Math.sin(e.dir),a=Math.cos(e.dir);e.t<(e.homing?.28:.22)&&(t.desired.x=o*e.lunge,t.desired.z=a*e.lunge);let l=e.homing?.04:.07,c=e.homing?.36:.3;if(!e.done&&e.t>=l&&e.t<=c){let h=e.homing?1.2:1.05,u=e.homing?.38:.3,d=t.pos.x+o*.2,m=t.pos.z+a*.2,g=t.pos.x+o*h,x=t.pos.z+a*h,f=ti(i.pos.x,i.pos.z,d,m,g,x),p=i.owner;if(f.d<u+pe&&i.pos.y<.6&&i.state!=="held"&&i.state!=="dead"){if(e.done=!0,e.contactT=e.t,t.touch={foot:"R",time:r,x:i.pos.x,y:i.pos.y,z:i.pos.z,kind:"tackle"},p&&p.team!==t.team){let y=i.pos.x-p.pos.x,_=i.pos.z-p.pos.z,b=Math.hypot(y,_)||1,M=t.pos.x-i.pos.x,S=t.pos.z-i.pos.z,T=Math.hypot(M,S)||1,v=(y*M+_*S)/(b*T),A=.56+(t.attrs.tackling-p.attrs.control)*.007+v*.26-ht(p.speed/8,0,1)*.1;!t.isHuman&&s.aiParams[t.team]&&(A+=s.aiParams[t.team].tackleBonus),t.isHuman&&(A+=s.assist.tackle),p.isHuman&&(A-=s.assist.oppProtect),A=ht(A,p.isHuman?.1:.18,t.isHuman?.96:.93);let R=s.rng.next()<A;if(R&&t.isHuman){let P=(s.rng.next()-.5)*.6;s.dislodge(p,t,new ot(-o*1.3+a*P,0,-a*1.3-o*P)),e.dur=Math.min(e.dur,e.t+.08)}else if(R){let P=s.rng.next()<.5?-1:1,N=-o*.2+a*P*.6+y/b*.5,z=-a*.2-o*P*.6+_/b*.5,k=Math.hypot(N,z)||1,F=2.2+s.rng.next()*1.8;s.dislodge(p,t,new ot(N/k*F,0,z/k*F))}else s.events.emit("tackle",{player:t,victim:p,success:!1,t:r}),p.stumbleUntil=Math.max(p.stumbleUntil,r+.15)}else if(!p||p===t)if(t.isHuman)i.setVelocity(new ot(t.vel.x*.7,0,t.vel.z*.7)),i.state="free",i.owner=null,s.touchBall(t,"poke"),e.dur=Math.min(e.dur,e.t+.05);else{let y=Math.max(3,i.speed*.3);i.setVelocity(new ot(o*y,0,a*y)),i.state="free",i.owner=null,s.touchBall(t,"poke")}}else if(p&&p.team!==t.team&&!e.victims.has(p)&&ti(p.pos.x,p.pos.z,d,m,g,x).d<.42){e.victims.add(p);let b=Math.cos(p.yaw)*(t.pos.z-p.pos.z)+Math.sin(p.yaw)*(t.pos.x-p.pos.x)<-.2?.6:.18;s.rng.next()<b&&s.foul(t,p,!1)}}e.t>e.dur&&(t.action=null,t.faceYaw=null)}function nc(s,t,e={}){let n=s.time,i=t.action;if(e.force){if(n<t.downUntil||i&&i.type==="slide"&&i.sliding||i&&i.type==="kick"&&i.contacted&&i.t<=i.contactT+.1)return!1;s.ball.owner===t&&s.loseControl("loose")}else if(n<t.slideReadyAt||!ls(s,t)||t.stamina<.06)return!1;let r=t.yaw;t.speed>1.2?r=Bt(t.vel.x,t.vel.z):t.desired.lenXZ()>.5&&(r=Bt(t.desired.x,t.desired.z));let o=Math.max(t.speed+1.2,6.3);return t.action={type:"slide",t:0,dir:r,speed0:o,sliding:!0,ballFirst:!1,victims:new Set,dur:1.05},t.slideReadyAt=n+be.SLIDE_COOLDOWN,t.stamina=Math.max(0,t.stamina-.07),s.events.emit("slide",{player:t,t:n}),!0}function $b(s,t,e,n){let i=s.ball,r=s.time,o=Math.sin(e.dir),a=Math.cos(e.dir);if(t.faceYaw=e.dir,t.yaw=e.dir,e.sliding){let l=ht(1-e.t/.68,0,1),c=e.speed0*Math.pow(l,.8);t.vel.set(o*c,0,a*c),e.t>.62&&(e.sliding=!1,t.vel.set(o*.4,0,a*.4))}else t.desired.set(0,0,0);if(e.t>.04&&e.t<.62){let l=t.pos.x+o*.2,c=t.pos.z+a*.2,h=t.pos.x+o*1.1,u=t.pos.z+a*1.1;if(!e.ballDone&&i.state!=="held"&&i.state!=="dead"&&i.pos.y<.5&&ti(i.pos.x,i.pos.z,l,c,h,u).d<.28+pe&&i.owner!==t){e.ballDone=!0,e.ballFirst=!0;let m=i.owner,g=s.rng.next()<.5?-1:1,x=Math.max(4.5,i.speed*.35),f=new ot((o+a*g*.25)*x,.4,(a-o*g*.25)*x);t.touch={foot:"R",time:r,x:i.pos.x,y:i.pos.y,z:i.pos.z,kind:"slide"},m&&m.team!==t.team?s.dislodge(m,t,f,!0):(i.owner=null,i.state="free",i.setVelocity(f),s.touchBall(t,"slide"))}for(let d of s.players){if(d===t||d.team===t.team||e.victims.has(d))continue;ti(d.pos.x,d.pos.z,t.pos.x,t.pos.z,h,u).d<.42&&(e.victims.add(d),e.ballFirst?s.rng.next()<.5&&(d.stumbleUntil=r+.5):s.rng.next()<.85?s.foul(t,d,!0):d.downUntil=r+.7)}}e.t>e.dur&&(t.action=null,t.faceYaw=null)}var Fe=new ot;function zu(s,t,e,n,i=0){let r=s.ownGoalX(t.team);return Math.sign(e)===Math.sign(r)&&Math.abs(e-r)<Kt.PEN_D+i&&Math.abs(n)<Kt.PEN_HW+i&&Math.abs(e)<=Z.HL+.5}function jp(s,t,e){return!t.isGK||s.phase!=="playing"||e.owner||e.state==="held"||e.state==="dead"||s.time<t.downUntil||s.time<t.noCaptureUntil?!1:zu(s,t,e.pos.x,e.pos.z,.3)}function ic(s,t,e){let n=t.action;if(n&&n.type==="dive"){let o=Math.max(0,n.t-n.delay),a=ht(o/n.flight,0,1),l=Ro(1.25,n.handY,ht(o/(n.flight*.55),0,1)),c=Ro(1,ht(n.handY*.7,.25,1.5),ht(o/(n.flight*.5),0,1)),h=.45+.45*Math.min(1,a*1.6);return e.ax=t.pos.x-n.dirX*.35,e.ay=c,e.az=t.pos.z-n.dirZ*.35,e.bx=t.pos.x+n.dirX*h,e.by=l,e.bz=t.pos.z+n.dirZ*h,e.r=.2,e.diving=!0,e}let i=Math.sin(t.yaw),r=Math.cos(t.yaw);return e.ax=t.pos.x+i*.12,e.ay=.05,e.az=t.pos.z+r*.12,e.bx=e.ax,e.by=2.15,e.bz=e.az,e.r=t.ai.set?.42:.34,e.diving=!1,e}function Qp(s,t,e,n){let i=n.bx-n.ax,r=n.by-n.ay,o=n.bz-n.az,a=i*i+r*r+o*o,l=a>1e-9?((s-n.ax)*i+(t-n.ay)*r+(e-n.az)*o)/a:0;l=ht(l,0,1);let c=n.ax+i*l,h=n.ay+r*l,u=n.az+o*l;return{d:Math.hypot(s-c,t-h,e-u),t:l,cx:c,cy:h,cz:u}}var cs={};function tm(s,t,e){ic(s,t,cs);let n=Qp(e.pos.x,e.pos.y,e.pos.z,cs);if(n.d>cs.r+pe)return!1;let i=s.time,r=e.speed,o=12.5+t.keeping*.09;cs.diving&&(o-=3.5),e.pos.y>1.9&&(o-=3);let a=n.d/(cs.r+pe),l=s.attackDir(t.team),c=e.lastKick,h=c&&c.kind==="shot"&&c.team!==t.team?c:null;if(t.touch={foot:"H",time:i,x:e.pos.x,y:e.pos.y,z:e.pos.z,kind:"save"},e.lastTouch=t,e.lastTouchTime=i,r<o&&a<.92&&s.rng.next()>(r/o-.75)*1.4)return e.owner=t,e.state="held",e.vel.set(0,0,0),e.spin.set(0,0,0),e.version++,t.hold="gk",t.ai.holdStart=i,t.ai.state="hold",s.possTeam=t.team,s.passIntent=null,s.events.emit("save",{player:t,caught:!0,speed:r,shot:h,t:i}),s.events.emit("possession",{player:t,team:t.team,prev:null,cause:"catch",t:i}),!0;let u=Math.sign(e.pos.z-t.pos.z)||(s.rng.next()<.5?-1:1);if(r>o+9&&a>.8)e.vel.x*=.62,e.vel.z+=u*2.2,e.vel.y+=1;else{let d=2+r*.22;e.vel.set(l*d*(.5+s.rng.next()*.5),1.2+s.rng.next()*2.4,u*(2.5+r*.22))}return e.state="air",e.version++,t.noCaptureUntil=i+.3,s.events.emit("save",{player:t,caught:!1,speed:r,shot:h,t:i}),!0}function Uu(s,t,e,n,i,r=.07){let o=e-t.pos.z,a=n-t.pos.x,l=Math.abs(o),c=Math.sign(o)||1,h=ht(a,-.8,.8)*.3,u=Math.hypot(c,h),d=ht(l-.35,.3,1.95+t.keeping*.004);t.action={type:"dive",t:0,delay:r,flight:.56-t.keeping*8e-4,dist:d,dirX:h/u,dirZ:c/u,handY:ht(i,.15,2.3),dur:1.25},t.yaw=Bt(s.attackDir(t.team),0),s.events.emit("dive",{player:t,t:s.time})}function qb(s,t,e,n){let i=e.t-e.delay;if(i<0){t.vel.set(0,0,0);return}if(i<e.flight){let o=2*e.dist/e.flight*(1-i/e.flight);t.vel.set(e.dirX*o,0,e.dirZ*o)}else t.vel.set(0,0,0);let r=s.ball;if(r.owner&&r.owner.team!==t.team&&i>0&&i<e.flight&&!e.smotherDone&&(ic(s,t,cs),Qp(r.pos.x,r.pos.y,r.pos.z,cs).d<cs.r+pe+.1&&(e.smotherDone=!0,s.rng.next()<.5+t.keeping*.004))){let a=s.attackDir(t.team);s.dislodge(r.owner,t,new ot(a*2.5,.5,e.dirZ*3))}e.t>e.dur&&(t.action=null,t.ai.set=!1)}function Jp(s,t,e,n){let i=s.traj,r=s.time-i.t0,o=i.pts;for(let a=1;a<i.count;a++){let l=a*i.step-r;if(l<0)continue;if(l>n)break;let c=o[(a-1)*3],h=o[a*3];if((t-c)*e>0&&(t-h)*e<=0){let u=(c-t)/(c-h||1e-6);return{t:l-i.step*(1-u),y:o[(a-1)*3+1]+(o[a*3+1]-o[(a-1)*3+1])*u,z:o[(a-1)*3+2]+(o[a*3+2]-o[(a-1)*3+2])*u}}}return null}function em(s,t,e,n){let i=s.ball,r=s.time,o=t.ai,a=s.attackDir(t.team),l=-a*Z.HL;if(t.sprint=!1,t.faceYaw=null,t.action&&t.action.type==="dive"){qb(s,t,t.action,e),t.desired.set(0,0,0);return}if(r<t.downUntil){t.desired.set(0,0,0);return}if(i.state==="held"&&i.owner===t){let M=r-(o.holdStart??r),S=l+a*(Kt.PEN_D-2);Fe.set(S,0,ht(t.pos.z,-6,6)),Ls(t,Fe,1.6),t.faceYaw=Bt(a,0),!t.action&&(M>n.gkHold||M>be.GK_MAX_HOLD-.4||M>.8&&Kb(s,t))&&Zb(s,t,n);return}if(s.phase!=="playing")return;let c=i.lastKick,h=!i.owner&&i.vel.x*-a>2.5;i.version!==o.seenVersion&&(o.seenVersion=i.version,o.reactAt=r+n.gkReaction*(.9+s.rng.next()*.25),c&&c.restart==="penalty"&&c.team!==t.team&&r-c.t<.05&&(o.reactAt=r+.12,o.penalty=!0));let u=t.pos.x,d=null;if(h){let M=Jp(s,l,-a,2.4);M&&Math.abs(M.z)<ft.HW+.6&&M.y<ft.H+.4&&(d=Jp(s,u+a*.05,-a,2.4)||M,Math.abs(i.pos.x-l)<Math.abs(u-l)+.2&&(d=M))}if(d){if(o.set=!0,t.faceYaw=Bt(i.pos.x-t.pos.x,i.pos.z-t.pos.z),r<o.reactAt){t.desired.set(0,0,0);return}let M=d.z-t.pos.z,S=Math.abs(M);if(o.penalty){o.penalty=!1;let v=s.rng.next()<.55?d.z:-Math.sign(d.z||1)*2;if(Math.abs(v-t.pos.z)>.6){Uu(s,t,v,t.pos.x,d.y,.02);return}}S<.5&&d.y<2.1?(Fe.set(t.pos.x,0,d.z),Ls(t,Fe,3)):S-.5<3*Math.max(0,d.t-.12)&&d.y<1.9&&d.t>.35?(Fe.set(t.pos.x,0,d.z),t.sprint=!0,Ls(t,Fe,5)):d.t<1.4&&Uu(s,t,d.z,t.pos.x+a*.2,d.y);return}o.set=!1;let m=s.passIntent;if(m&&m.target===t&&!i.owner&&r-m.t<4){let M=s.traj;for(let S=.05;S<3&&(M.at(S+(r-M.t0),Fe),!(t.pos.distXZ(Fe)/5.5<=S));S+=.05);Ls(t,Fe,5.5),t.sprint=!0,t.faceYaw=Bt(i.pos.x-t.pos.x,i.pos.z-t.pos.z);return}if(!i.owner&&i.state!=="held"&&i.state!=="dead"){let M=s.traj,S=null;for(let T=.1;T<2.5;T+=.1){if(M.at(T+(r-M.t0),Fe),!zu(s,t,Fe.x,Fe.z,-.5))continue;if(t.pos.distXZ(Fe)/6.2+.2<=T&&Fe.y<2.2){S={t:T,x:Fe.x,z:Fe.z};break}}if(S&&Yb(s,t.team,S.x,S.z)>S.t+.05){Fe.set(S.x,0,S.z),t.sprint=!0,Ls(t,Fe,6.2),t.faceYaw=Bt(i.pos.x-t.pos.x,i.pos.z-t.pos.z);return}}let g=i.owner;if(g&&g.team!==t.team&&zu(s,t,g.pos.x,g.pos.z,1)){let M=Math.hypot(g.pos.x-l,g.pos.z),S=!1;for(let T of s.teams[t.team].players){if(T===t||T.isGK)continue;let v=ti(T.pos.x,T.pos.z,g.pos.x,g.pos.z,l,0);v.d<1.2&&v.t>.1&&(S=!0)}if(!S&&M<13){if(i.pos.distXZ(t.pos)<2&&r>(o.smotherReady||0)){o.smotherReady=r+1.5,Uu(s,t,i.pos.z,i.pos.x,.2,.05);return}let v=ht((M-2.5)/M,0,1);Fe.set(l+(g.pos.x-l)*v,0,g.pos.z*v),t.sprint=!0,Ls(t,Fe,5.5),t.faceYaw=Bt(g.pos.x-t.pos.x,g.pos.z-t.pos.z);return}}let x=i.pos.x,f=i.pos.z,p=x-l,y=f,_=Math.hypot(p,y)||1,b=ht(.7+(_-8)*.06,.6,3.2);Fe.set(l+p/_*b,0,ht(y/_*b*1.2,-2.3,2.3)),(Fe.x-l)*a<.4&&(Fe.x=l+a*.4),Ls(t,Fe,_<20?4:2.5),t.faceYaw=Bt(x-t.pos.x,f-t.pos.z)}function Ls(s,t,e){let n=t.x-s.pos.x,i=t.z-s.pos.z,r=Math.hypot(n,i);if(r<.08){s.desired.set(0,0,0);return}let o=Math.min(e,r*3.5);s.desired.set(n/r*o,0,i/r*o)}function Yb(s,t,e,n){let i=99;for(let r of s.players){if(r.team===t)continue;let o=Math.hypot(r.pos.x-e,r.pos.z-n),a=Math.max(0,o-.8)/r.sprintSpeed()+.2;a<i&&(i=a)}return i}function Kb(s,t){let e=s.human;return e&&e.team===t.team&&e.requestUntil>s.time}function Zb(s,t,e){let n=s.attackDir(t.team),i=null,r=-1e9,o="gkthrow";for(let a of s.teams[t.team].players){if(a===t)continue;let l=t.pos.distXZ(a.pos);if(l<5)continue;let c=99;for(let m of s.players)m.team!==t.team&&(c=Math.min(c,m.pos.distXZ(a.pos)));let h=mi(s,t.pos.x,t.pos.z,a.pos.x,a.pos.z,t.team,11),u=a.isHuman?e.humanBonus+(a.requestUntil>s.time?.5:0):0;if(l<30){let m=h*1.2+Math.min(c,10)*.07-l*.01+u;m>r&&h>.45&&(r=m,i=a,o="gkthrow")}let d=s.uOf(t.team,a.pos.x);if(d>-.2&&c>3.5){let m=.35+d*.4+Math.min(c,10)*.05+u*.6;m>r&&(r=m,i=a,o="gkkick")}}i?(t.yaw=Bt(i.pos.x-t.pos.x,i.pos.z-t.pos.z),ce(s,t,o,{target:i,ai:!0})):ce(s,t,"gkkick",{point:new ot(n*8,0,(s.rng.next()-.5)*20),ai:!0}),t.hold="gk",s.events.emit("distribute",{player:t,target:i,t:s.time})}var Jb=new L(0,1,0),Oe=Array.from({length:24},()=>new L),sc=new ae,oE=new Ue,gi=new _n,we=(s,t,e)=>s+(t-s)*e,xn=(s,t,e)=>s<t?t:s>e?e:s,xi=s=>(s=xn(s,0,1),s*s*(3-2*s));function jb(s,t,e){let n=t-s;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return s+n*e}function Qb(s){return s-Math.floor(s)}var ee=()=>new L,Fu={x:ee(),y:ee(),z:ee()},rc={d:ee(),bend:ee(),r:ee(),t:ee()},Re={pelvis:ee(),waist:ee(),neck:ee(),fwd:ee(),side:ee(),hip:ee(),ankT:ee(),knee:ee(),ankle:ee(),pole:ee(),back:ee(),sh:ee(),tgt:ee(),off:ee(),elbow:ee(),hand:ee(),pole2:ee()},Ve={hands:ee(),body:ee(),axis:ee(),sh:ee(),pelvis:ee(),face:ee(),z:ee(),x:ee(),p1:ee(),p2:ee(),hip:ee(),knee:ee(),ankle:ee(),shp:ee(),tgt:ee(),elbow:ee(),hand:ee()};function hs(s,t,e,n){let i=Fu.y.subVectors(t,e);i.lengthSq()<1e-8&&i.set(0,1,0),i.normalize();let r=Fu.z.copy(n).addScaledVector(i,-n.dot(i));r.lengthSq()<1e-6&&(r.set(0,0,1).addScaledVector(i,-i.z),r.lengthSq()<1e-6&&r.set(1,0,0)),r.normalize();let o=Fu.x.crossVectors(i,r);return s.makeBasis(o,i,r),s.setPosition(t),s}function Bu(s,t,e,n,i,r,o){let a=rc.r.copy(s),l=rc.t.copy(t),c=rc.d.subVectors(l,a),h=c.length();h<1e-4?(c.set(0,-1,0),h=1e-4):c.divideScalar(h),h=xn(h,Math.abs(e-n)+.02,e+n-.002),o.copy(a).addScaledVector(c,h);let u=xn((e*e+h*h-n*n)/(2*e*h),-1,1),d=Math.sqrt(1-u*u),m=rc.bend.copy(i).addScaledVector(c,-i.dot(c));m.lengthSq()<1e-6&&m.set(0,0,1),m.normalize(),r.copy(a).addScaledVector(c,e*u).addScaledVector(m,e*d)}var oc=class{constructor(){this.pos=new L,this.plant=new L,this.from=new L,this.swing=!1,this.step=null,this.out=new L}},ac=class{constructor(t){this.p=t,this.feet=[new oc,new oc],this.ready=!1,this.lastRoot=new L,this.lean=0,this.headYaw=0,this.headPitch=0,this.fall=0,this.m=Array.from({length:13},()=>new ae),this.root=new L,this.yaw=0,this.hands=[new L,new L],this.handW=0}reset(){this.ready=!1}update(t){let e=this.p,n=t.match,i=Math.min(t.dt,.05),r=t.now,o=t.alpha,a=e.action,l=this.root.set(we(e.prevPos.x,e.pos.x,o),0,we(e.prevPos.z,e.pos.z,o)),c=this.yaw=jb(e.prevYaw,e.yaw,o),h=Oe[0].set(Math.sin(c),0,Math.cos(c)),u=Oe[1].set(Math.cos(c),0,-Math.sin(c)),d=e.vel.x,m=e.vel.z,g=Math.hypot(d,m),x=xn(g/7.5,0,1);if(!this.ready||this.lastRoot.distanceTo(l)>2.5){this.ready=!0;for(let at=0;at<2;at++){let nt=this.feet[at];nt.pos.copy(l).addScaledVector(u,at===0?.11:-.11),nt.plant.copy(nt.pos),nt.swing=!1,nt.step=null}}this.lastRoot.copy(l);let f=we(e.prevGait,e.gait,o),p=g>.35&&!(a&&(a.type==="slide"||a.type==="dive")),y=Rr(Math.max(g,.6)),_=Cr(y),b=g>.01?d/g:h.x,M=g>.01?m/g:h.z;for(let at=0;at<2;at++){let nt=this.feet[at],zt=at===0?1:-1,V=u.x*.11*zt,J=u.z*.11*zt;if(p){nt.step=null;let ut=Qb(f-(at===0?0:.5));if(ut<_){nt.swing&&(nt.swing=!1,nt.plant.set(nt.pos.x,0,nt.pos.z));let Rt=l.x+V,ct=l.z+J;Math.hypot(nt.plant.x-Rt,nt.plant.z-ct)>.9&&nt.plant.set(Rt+b*.2,0,ct+M*.2),nt.pos.copy(nt.plant)}else{nt.swing||(nt.swing=!0,nt.from.set(nt.pos.x,0,nt.pos.z));let Rt=(ut-_)/(1-_),ct=(1-ut)*y/Math.max(g,.5),Ft=l.x+d*ct+b*_*y*.5+V,xe=l.z+m*ct+M*_*y*.5+J;if(n.ball.owner===e&&!a){let Yt=t.ball.x+n.ball.vel.x*ct*.5,oe=t.ball.z+n.ball.vel.z*ct*.5,kt=(Yt-l.x)*b+(oe-l.z)*M;kt>.1&&kt<1&&(Ft=we(Ft,Yt-b*.12,.35),xe=we(xe,oe-M*.12,.35))}let qt=xi(Rt);nt.pos.set(we(nt.from.x,Ft,qt),(.09+g*.035)*Math.sin(Math.PI*Math.pow(Rt,.75)),we(nt.from.z,xe,qt))}}else{let ut=l.x+V+h.x*(at===0?.03:-.03),Rt=l.z+J+h.z*(at===0?.03:-.03);nt.swing&&(nt.swing=!1,nt.step={fx:nt.pos.x,fz:nt.pos.z,t:0,dur:.14});let ct=this.feet[1-at];if(nt.step){nt.step.t+=i;let Ft=xn(nt.step.t/nt.step.dur,0,1),xe=xi(Ft);nt.pos.set(we(nt.step.fx,ut,xe),.07*Math.sin(Math.PI*Ft),we(nt.step.fz,Rt,xe)),Ft>=1&&(nt.step=null,nt.plant.set(ut,0,Rt))}else Math.hypot(nt.plant.x-ut,nt.plant.z-Rt)>.22&&!ct.step?nt.step={fx:nt.plant.x,fz:nt.plant.z,t:0,dur:.16}:nt.pos.copy(nt.plant)}nt.out.copy(nt.pos)}let S=.935-.05*x+.018*x*Math.cos(f*Math.PI*4),T=.05+.16*x+(e.sprint?.05:0),v=c,A=.16*x*Math.sin(f*Math.PI*2),R=0,P=0,N=Math.sin(f*Math.PI*2),z=.08+.3*x,k=Oe[2].set(.05,-.5+.18*x,-N*z),F=Oe[3].set(-.05,-.5+.18*x,N*z),$=!1,Y=Oe[4],st=Oe[5],K=null,tt=null,q=t.ball,mt=e.touch;if(a&&a.type==="kick"&&!a.fromHands){let at=a.foot==="L"?0:1,nt=a.contacted?a.kyaw??c:c;a.contacted&&a.kyaw==null&&(a.kyaw=c);let zt=Oe[6].set(Math.sin(nt),0,Math.cos(nt)),V=Oe[7].set(Math.cos(nt),0,-Math.sin(nt)).multiplyScalar(at===0?1:-1),J=Oe[8];a.contacted&&mt&&mt.kind!=="receive"?J.set(mt.x,0,mt.z):J.set(q.x,0,q.z);let ut=a.kind==="cross"||a.kind==="lob"||a.kind==="clear",Rt=a.kind==="shot"?a.charging?a.charge:Math.max(a.charge||0,a.ai?a.power:.35):ut?.8:.3+(a.charge||0)*.4,ct=Oe[9].copy(J).addScaledVector(zt,-.14).addScaledVector(V,-.25),Ft=this.feet[at].out,xe=this.feet[1-at].out;if(a.contacted){let kt=(a.t-a.contactT)/a.follow,he=Oe[10].copy(J).addScaledVector(zt,.45+.5*Rt);he.y=.2+.5*Rt;let Ce=Oe[11].copy(J).setY(.06);kt<.5?Ft.copy(Ce.lerp(he,xi(kt/.5))):Ft.lerp(he,1-xi((kt-.5)/.5)),kt<.65?xe.copy(ct):xe.lerp(ct,1-xi((kt-.65)/.35)),T=.1-(ut?.12:0)*(1-kt)}else{let kt=a.charging?.35+.4*a.charge:xn(a.t/Math.max(.06,a.t+a.eta),0,1),he=Oe[10].copy(J).addScaledVector(zt,-(.32+.38*Rt)).addScaledVector(V,.06);he.y=.12+.32*Rt,kt<.75?Ft.lerp(he,xi(kt/.75)):Ft.copy(he).lerp(Oe[11].copy(J).setY(.06),(kt-.75)/.25),xe.lerp(ct,xi(kt*2.2)),T=.12-(ut?.08:0)}let qt=at===0?1:-1,Yt=qt>0?k:F,oe=qt>0?F:k;Yt.set(qt*.35,-.35,-.2),oe.set(-qt*.3,-.3,.25)}else if(a&&a.type==="kick"&&a.fromHands){let at=a.contacted?xn((a.t-a.contactT)/a.follow,0,1):xn(a.t/Math.max(.1,a.t+a.eta),0,1);if(a.kind==="throw"){let nt=a.contacted?1-at:at;k.set(.12,.62-.05*nt,-.25*nt+(a.contacted?.35*at:0)),F.set(-.12,.62-.05*nt,-.25*nt+(a.contacted?.35*at:0)),T=-.12*(a.contacted?1-at:at)+(a.contacted?.15*at:0)}else if(a.kind==="gkthrow")F.set(-.12,-.45,a.contacted?.45*(1-at)+.2:-.35*at),k.set(.25,-.35,.1),T=.25;else{k.set(.1,-.2,.35),F.set(-.1,-.2,.35);let nt=this.feet[1].out,zt=Oe[6].set(Math.sin(c),0,Math.cos(c));a.contacted?(nt.copy(l).addScaledVector(zt,.3+.5*at),nt.y=.3+.6*Math.sin(Math.PI*at)):(nt.copy(l).addScaledVector(zt,-.3*at),nt.y=.15*at)}}else if(a&&a.type==="tackle"){let at=a.t,nt=at<.07?at/.07*.3:at<.3?.3+Math.min(1,(at-.07)/.1)*.7:Math.max(0,1-(at-.3)/.18),zt=Oe[6].set(Math.sin(a.dir),0,Math.cos(a.dir)),V=this.feet[1].out,J=Oe[7].copy(l).addScaledVector(zt,.3+.75*nt).addScaledVector(u,-.05);J.y=.06,V.lerp(J,xn(nt*1.4,0,1)),T=.1+.25*nt,S-=.08*nt,k.set(.35,-.3,.1),F.set(-.35,-.3,-.15)}else if(a&&a.type==="slide")tt="slide";else if(a&&a.type==="dive")tt="dive";else if(r<e.downUntil)tt="fall";else if(a&&a.type==="celebrate"||e.celebrate>r){let at=r*6+e.id;k.set(.25,.55+.08*Math.sin(at),.05),F.set(-.25,.55+.08*Math.cos(at),.05),a&&a.type==="celebrate"&&g<1&&(S+=.12*Math.max(0,Math.sin(r*9)))}else if(e.hold==="throw"||n.restart&&n.restart.handsBall&&n.restart.taker===e&&n.phase==="restart")$=!0,Y.set(q.x,q.y,q.z).addScaledVector(u,.1),st.set(q.x,q.y,q.z).addScaledVector(u,-.1);else if(e.isGK&&n.ball.state==="held"&&n.ball.owner===e)$=!0,Y.set(q.x,q.y,q.z).addScaledVector(u,.1).addScaledVector(h,-.04),st.set(q.x,q.y,q.z).addScaledVector(u,-.1).addScaledVector(h,-.04);else if(e.isGK&&e.ai.set)S=.8,T=.22,k.set(.3,-.12,.3),F.set(-.3,-.12,.3),Math.hypot(q.x-l.x,q.z-l.z)<1.4&&($=!0,Y.set(q.x,q.y,q.z).addScaledVector(u,.12),st.set(q.x,q.y,q.z).addScaledVector(u,-.12));else if(r<e.stumbleUntil){let at=Math.sin(r*20)*.15;k.set(.4,-.1+at,0),F.set(-.4,-.1-at,0),P=at*.4}if(!tt&&mt&&(mt.kind==="receive"||mt.kind==="dribble"||mt.kind==="stop"||mt.kind==="poke")&&!(a&&a.type==="kick")){let at=r-mt.time;if(at>-.05&&at<.2){let nt=1-Math.abs(at-.02)/.18,zt=mt.foot==="L"?0:1,V=Oe[12].set(mt.x,.05+(mt.kind==="receive"?Math.min(.5,mt.y)*.8:0),mt.z);V.addScaledVector(Oe[13].set(mt.x-l.x,0,mt.z-l.z).normalize(),-.1),this.feet[zt].out.lerp(V,xn(nt,0,1)*.85)}}let wt=this.m;if(tt==="slide")this.poseSlide(e,a,l,c,wt);else if(tt==="dive")this.poseDive(e,n,l,c,wt);else if(tt==="fall")this.poseFall(e,r,l,c,wt,h,u);else{let at=q.x-l.x,nt=q.z-l.z,V=Math.atan2(at,nt)-v;for(;V>Math.PI;)V-=Math.PI*2;for(;V<-Math.PI;)V+=Math.PI*2;V=xn(V,-1.1,1.1),this.headYaw=we(this.headYaw,V,1-Math.exp(-i*8));let J=Math.hypot(at,nt);this.headPitch=we(this.headPitch,xn(Math.atan2(1.55-q.y,J)*.6,-.3,.5),1-Math.exp(-i*6)),this.lean=we(this.lean,T,1-Math.exp(-i*10)),this.poseUpright(e,l,v,S,this.lean+R,A,P,k,F,$?Y:null,$?st:null,wt,t.local)}return wt}poseUpright(t,e,n,i,r,o,a,l,c,h,u,d,m){let g=Re.pelvis.set(e.x,i,e.z),x=Re.fwd.set(Math.sin(n),0,Math.cos(n)),f=Re.side.set(Math.cos(n),0,-Math.sin(n));m&&g.addScaledVector(x,-.02),gi.set(0,n-o*.4,0,"YXZ"),d[Ut.PELVIS].makeRotationFromEuler(gi).setPosition(g);let p=d[Ut.PELVIS],y=Re.waist.set(0,Ke.waist,0).applyMatrix4(p);gi.set(r,n+o,a,"YXZ"),d[Ut.TORSO].makeRotationFromEuler(gi).setPosition(y);let _=d[Ut.TORSO],b=Re.neck.set(0,.58,0).applyMatrix4(_);gi.set(this.headPitch-r*.5,n+this.headYaw,0,"YXZ"),d[Ut.HEAD].makeRotationFromEuler(gi).setPosition(b);for(let S=0;S<2;S++){let T=Re.hip.set(S===0?Ke.hipW:-Ke.hipW,-.02,0).applyMatrix4(p),v=this.feet[S].out,A=Re.ankT.set(v.x,v.y+Ke.ankle,v.z),R=Re.pole.copy(x).addScaledVector(Jb,.1);Bu(T,A,Ke.thigh,Ke.shin,R,Re.knee,Re.ankle),hs(d[S===0?Ut.THIGH_L:Ut.THIGH_R],T,Re.knee,x),hs(d[S===0?Ut.SHIN_L:Ut.SHIN_R],Re.knee,Re.ankle,x);let P=xn((Re.ankle.y-Ke.ankle)*1.2,0,.6)*(this.feet[S].swing?1:0);gi.set(P,n,0,"YXZ"),d[S===0?Ut.BOOT_L:Ut.BOOT_R].makeRotationFromEuler(gi).setPosition(Re.ankle)}let M=Re.back.set(-x.x,-.6,-x.z);for(let S=0;S<2;S++){let T=S===0?1:-1,v=Re.sh.set(T*Ke.shoulderW,.45,0).applyMatrix4(_),A;h?A=Re.tgt.copy(S===0?h:u):A=Re.tgt.copy(S===0?l:c).add(Re.off.set(T*Ke.shoulderW,.45,0)).applyMatrix4(_);let R=Re.pole2.copy(M).addScaledVector(f,T*.5);Bu(v,A,Ke.upper,Ke.fore,R,Re.elbow,Re.hand),hs(d[S===0?Ut.UARM_L:Ut.UARM_R],v,Re.elbow,x),hs(d[S===0?Ut.FARM_L:Ut.FARM_R],Re.elbow,Re.hand,x),this.hands[S].copy(Re.hand)}}poseSlide(t,e,n,i,r){let o=e.t,a=xn((o-.62)/.43,0,1),l=xn(o/.12,0,1)*(1-xi(a)),c=Oe[0].set(Math.sin(e.dir),0,Math.cos(e.dir)),h=Oe[1].set(Math.cos(e.dir),0,-Math.sin(e.dir)),u=we(.93,.2,l),d=we(.05,-1.05,l);this.feet[1].out.copy(n).addScaledVector(c,we(.1,1,l)).addScaledVector(h,-.08).setY(we(0,.05,l)),this.feet[0].out.copy(n).addScaledVector(c,we(0,.25,l)).addScaledVector(h,.22).setY(0);let m=Oe[2].set(.35,we(-.5,-.2,l),we(0,-.35,l)),g=Oe[3].set(-.4,we(-.5,-.1,l),we(0,.2,l));this.lean=d,this.headPitch=we(this.headPitch,.5*l,.2),this.poseUpright(t,n,e.dir,u,d,0,0,m,g,null,null,r,!1)}poseFall(t,e,n,i,r,o,a){let l=t.action,c=l&&l.dur?l.dur:1,h=l?l.t:c-(t.downUntil-e),u=xi(h/.35)*(1-xi((h-(c-.45))/.45)),d=we(.93,.22,u),m=we(.05,1.35,u);this.feet[0].out.copy(n).addScaledVector(o,-.5*u).addScaledVector(a,.14).setY(.02*u),this.feet[1].out.copy(n).addScaledVector(o,-.6*u).addScaledVector(a,-.14).setY(.05*u);let g=Oe[2].set(.25,we(-.5,-.05,u),we(0,.45,u)),x=Oe[3].set(-.25,we(-.5,-.05,u),we(0,.45,u));this.poseUpright(t,n,i,d,m,0,0,g,x,null,null,r,!1)}poseDive(t,e,n,i,r){let o=ic(e,t,this.vol||(this.vol={})),a=Ve.hands.set(o.bx,o.by,o.bz),l=Ve.axis.subVectors(a,Ve.body.set(o.ax,o.ay,o.az));l.divideScalar(l.length()||1);let c=Ve.sh.copy(a).addScaledVector(l,-.52),h=Ve.pelvis.copy(c).addScaledVector(l,-.5);h.y=Math.max(.18,h.y);let u=Ve.face.set(Math.sin(i),0,Math.cos(i)),d=Ve.z.copy(u).addScaledVector(l,-u.dot(l)).normalize(),m=Ve.x.crossVectors(l,d);sc.makeBasis(m,l,d),r[Ut.PELVIS].copy(sc).setPosition(h),r[Ut.TORSO].copy(sc).setPosition(Ve.p1.copy(h).addScaledVector(l,Ke.waist)),r[Ut.HEAD].copy(sc).setPosition(Ve.p2.copy(h).addScaledVector(l,Ke.waist+.58));for(let g=0;g<2;g++){let x=g===0?1:-1,f=Ve.hip.copy(h).addScaledVector(m,x*Ke.hipW),p=Ve.knee.copy(f).addScaledVector(l,-Ke.thigh).addScaledVector(d,.08);p.y=Math.max(.08,p.y);let y=Ve.ankle.copy(p).addScaledVector(l,-Ke.shin).addScaledVector(d,-.05);y.y=Math.max(.08,y.y),hs(r[g===0?Ut.THIGH_L:Ut.THIGH_R],f,p,d),hs(r[g===0?Ut.SHIN_L:Ut.SHIN_R],p,y,d),gi.set(0,i,0,"YXZ"),r[g===0?Ut.BOOT_L:Ut.BOOT_R].makeRotationFromEuler(gi).setPosition(y)}for(let g=0;g<2;g++){let x=g===0?1:-1,f=Ve.shp.copy(c).addScaledVector(m,x*Ke.shoulderW),p=Ve.tgt.copy(a).addScaledVector(m,x*.09);Bu(f,p,Ke.upper,Ke.fore,d,Ve.elbow,Ve.hand),hs(r[g===0?Ut.UARM_L:Ut.UARM_R],f,Ve.elbow,d),hs(r[g===0?Ut.FARM_L:Ut.FARM_R],Ve.elbow,Ve.hand,d),this.hands[g].copy(Ve.hand)}}};var lc=1024,cc=1024,hc=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=lc,this.canvas.height=cc,this.ctx=this.canvas.getContext("2d"),this.texture=new ur(this.canvas),this.texture.anisotropy=4,this.words=new Map,this.reset()}reset(){let t=this.ctx;t.clearRect(0,0,lc,cc),t.fillStyle="#fff",t.textAlign="center",t.textBaseline="middle",t.font='bold 88px "Arial Black", Arial, Helvetica, sans-serif';for(let e=0;e<10;e++)t.fillText(String(e),e*64+32,52);this.words.clear(),this.slot=0,this.texture.needsUpdate=!0}rect(t,e,n,i){return[t/lc,1-(e+i)/cc,(t+n)/lc,1-e/cc]}digit(t){return this.rect(t*64+6,4,52,96)}word(t){if(this.words.has(t))return this.words.get(t);let e=this.slot%2,n=Math.floor(this.slot/2);if(n>13)return this.rect(0,0,1,1);this.slot++;let i=e*512,r=112+n*64,o=this.ctx;o.save(),o.clearRect(i,r,512,64),o.fillStyle="#fff",o.textAlign="center",o.textBaseline="middle";let a=46;for(o.font=`bold ${a}px "Arial Black", Arial, Helvetica, sans-serif`;o.measureText(t).width>496&&a>14;)a-=2,o.font=`bold ${a}px "Arial Black", Arial, Helvetica, sans-serif`;o.fillText(t,i+256,r+33),o.restore();let l=this.rect(i+2,r+2,508,60);return this.words.set(t,l),this.texture.needsUpdate=!0,l}},uc=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=512,this.canvas.height=192,this.ctx=this.canvas.getContext("2d"),this.texture=new ur(this.canvas),this.key=""}update(t,e,n,i,r,o=!1){let a=`${t}|${e}|${n}|${i}|${r}|${o}`;if(a===this.key)return;this.key=a;let l=this.ctx,c=r==="neo";l.fillStyle=c?"#111":"#f6f5ef",l.fillRect(0,0,512,192),l.strokeStyle=c?"#ffd23f":"#222",l.lineWidth=c?10:4,l.strokeRect(8,8,496,176),l.fillStyle=c?"#fff":"#161616",l.textAlign="center",l.textBaseline="middle",l.font='bold 40px "Arial Black", Arial, sans-serif',l.fillText(t,128,52),l.fillText(e,384,52),l.font='bold 72px "Arial Black", Arial, sans-serif',l.fillStyle=c?"#ffd23f":"#161616",l.fillText(`${n[0]}  -  ${n[1]}`,256,112),l.font="bold 30px Arial, sans-serif",l.fillStyle=c?"#3ee0ff":"#444",l.fillText(o?"FINAL":i,256,162),this.texture.needsUpdate=!0}};var dc=new ae,nm=new Ue,t1=new L,uE=new L,im=new _n,fc=class{constructor(t=20){let e=new kn(1,1);e.rotateX(-Math.PI/2),this.alpha=new bn(new Float32Array(t),1),e.setAttribute("aAlpha",this.alpha),this.mesh=new cr(e,gp(),t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,this.max=t,this.count=0}begin(){this.count=0}add(t,e,n,i){this.count>=this.max||(dc.makeScale(n,1,n).setPosition(t,.018,e),this.mesh.setMatrixAt(this.count,dc),this.alpha.setX(this.count,i),this.count++)}end(){this.mesh.count=this.count,this.mesh.instanceMatrix.needsUpdate=!0,this.alpha.needsUpdate=!0}},pc=class{constructor(){this.group=new tn;let t=new $i(.5,.62,40);t.rotateX(-Math.PI/2),this.ring=new se(t,Cs(C.MARKER,.85)),this.ring.renderOrder=3,this.ring.visible=!1;let e=new Ei(.16,.34,4);e.rotateX(Math.PI),this.ack=new se(e,Cs(C.MARKER,1)),this.ack.visible=!1;let n=new $i(.2,.3,24);n.rotateX(-Math.PI/2),this.incoming=new se(n,Cs(C.MARKER,.6)),this.incoming.visible=!1,this.group.add(this.ring,this.ack,this.incoming),this.ringT=0}showRing(t,e,n){this.ring.visible=!0,this.ringT=n;let i=1+.06*Math.sin(n*8);this.ring.position.set(t,.03,e),this.ring.scale.set(i,1,i)}showAck(t,e,n,i){this.ack.visible=!0,this.ack.position.set(t,e+.1*Math.sin(i*10),n),this.ack.rotation.y=i*3}showIncoming(t,e){this.incoming.visible=!0,this.incoming.position.set(t,.03,e)}hideAll(){this.ring.visible=!1,this.ack.visible=!1,this.incoming.visible=!1}},mc=class{constructor(t=180){let e=new no(.16,0);this.mat=new Ms({color:16777215}),this.mesh=new cr(e,this.mat,t),this.mesh.instanceMatrix.setUsage(Bh),this.mesh.frustumCulled=!1,this.max=t,this.parts=Array.from({length:t},()=>({alive:!1,p:new L,v:new L,r:new L,w:new L,life:0,s:1})),this.col=new Qt;for(let n=0;n<t;n++)this.mesh.setColorAt(n,this.col.set(1,1,1));this.mesh.count=0,this.active=0}spawn(t,e,n,i,r,o=6,a=Math.random){let l=0;for(let c of this.parts){if(l>=i)break;if(c.alive)continue;c.alive=!0,c.p.set(t+(a()-.5)*2,e+a()*1.5,n+(a()-.5)*2);let h=a()*Math.PI*2,u=4+a()*6;c.v.set(Math.cos(h)*o*a(),u,Math.sin(h)*o*a()),c.r.set(a()*6,a()*6,a()*6),c.w.set((a()-.5)*12,(a()-.5)*12,(a()-.5)*12),c.life=1.6+a()*1.2,c.s=.6+a()*.9,c.role=r[Math.floor(a()*r.length)],l++}}update(t){let e=0;for(let n of this.parts){if(!n.alive)continue;if(n.life-=t,n.life<=0){n.alive=!1;continue}n.v.y-=9.8*t*.6,n.v.multiplyScalar(1-1.2*t),n.p.addScaledVector(n.v,t),n.p.y<.05&&(n.p.y=.05,n.v.set(0,0,0)),n.r.addScaledVector(n.w,t),im.set(n.r.x,n.r.y,n.r.z),nm.setFromEuler(im);let i=n.s*Math.min(1,n.life*2);dc.compose(n.p,nm,t1.set(i,i,i)),this.mesh.setMatrixAt(e,dc),this.mesh.setColorAt(e,Le[n.role]),e++}this.mesh.count=e,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0),this.active=e}clear(){for(let t of this.parts)t.alive=!1;this.mesh.count=0}};var sm=60,e1=12,n1=[0,1,2,4,5,6,8,9,10,12,13,14],kr=22,xc=class{constructor(t){this.n=t,this.parts=t*Rn,this.size=kr+this.parts*12,this.cap=sm*e1,this.buf=new Float32Array(this.size*this.cap),this.times=new Float64Array(this.cap),this.clear(),this.frame={ball:new L,q:new Ue,crowd:0,nets:new Float32Array(14),parts:new Float32Array(this.parts*12)},this._q2=new Ue}clear(){this.count=0,this.start=0,this.lastT=-1e9,this.cur=-1}phys(t){return(this.start+t)%this.cap}begin(t){return t<this.lastT-.5&&this.clear(),t-this.lastT<1/sm-1e-4?(this.cur=-1,!1):(this.count<this.cap?this.count++:this.start=(this.start+1)%this.cap,this.cur=this.phys(this.count-1),this.times[this.cur]=t,this.lastT=t,!0)}putPlayer(t,e){if(this.cur<0)return;let n=this.cur*this.size+kr+t*Rn*12,i=this.buf;for(let r=0;r<Rn;r++){let o=e[r].elements;for(let a=0;a<12;a++)i[n++]=o[n1[a]]}}end(t,e,n,i,r,o,a){if(this.cur<0)return;let l=this.buf,c=this.cur*this.size;l[c]=t.x,l[c+1]=t.y,l[c+2]=t.z,l[c+3]=e.x,l[c+4]=e.y,l[c+5]=e.z,l[c+6]=e.w,l[c+7]=n,l[c+8]=i.x,l[c+9]=i.y,l[c+10]=i.z,l[c+11]=i.w,l[c+12]=r.x,l[c+13]=r.y,l[c+14]=r.z,l[c+15]=o.x,l[c+16]=o.y,l[c+17]=o.z,l[c+18]=o.w,l[c+19]=a.x,l[c+20]=a.y,l[c+21]=a.z,this.cur=-1}get firstT(){return this.count?this.times[this.phys(0)]:0}indexAt(t){let e=0,n=this.count-1;if(n<0)return-1;if(t<=this.times[this.phys(0)])return 0;for(;e<n;){let i=e+n+1>>1;this.times[this.phys(i)]<=t?e=i:n=i-1}return e}rootAt(t,e,n){let i=this.phys(t)*this.size+kr+e*Rn*12+9;return n.set(this.buf[i],this.buf[i+1],this.buf[i+2])}sample(t){let e=this.frame,n=this.indexAt(t);if(n<0)return null;let i=Math.min(this.count-1,n+1),r=this.times[this.phys(n)],o=this.times[this.phys(i)],a=i===n||o<=r?0:Bn.clamp((t-r)/(o-r),0,1),l=this.phys(n)*this.size,c=this.phys(i)*this.size,h=this.buf,u=g=>h[l+g]+(h[c+g]-h[l+g])*a;e.ball.set(u(0),u(1),u(2)),e.q.set(h[l+3],h[l+4],h[l+5],h[l+6]),e.q.slerp(this._q2.set(h[c+3],h[c+4],h[c+5],h[c+6]),a),e.crowd=u(7);for(let g=0;g<14;g++)e.nets[g]=u(8+g);let d=e.parts,m=this.parts*12;for(let g=0;g<m;g++)d[g]=h[l+kr+g]+(h[c+kr+g]-h[l+kr+g])*a;return e}clip(t,e){if(this.count<10)return null;let n=this.indexAt(t+1.4),i=this.indexAt(e),r=this.indexAt(e-2.1),o=new L,a=new L;for(let h=i;h>r;h--){let u=!1;for(let d=0;d<this.n&&!u;d++)this.rootAt(h,d,o),this.rootAt(h-1,d,a),o.distanceToSquared(a)>1.2*1.2&&(u=!0);if(u||this.times[this.phys(h)]-this.times[this.phys(h-1)]>.3){r=h;break}}let l=this.times[this.phys(r)],c=this.times[this.phys(n)];return c-l<.8?null:{t0:l,t1:c}}},gc=(s,t,e)=>{let n=Bn.clamp((e-s)/(t-s),0,1);return n*n*(3-2*n)},yc=class{constructor(t,e,n){this.rec=t,this.t0=e.t0,this.t1=e.t1,this.t=e.t0,this.goalT=n.goalT,this.shotT=n.shotT!=null&&n.shotT>e.t0&&n.shotT<n.goalT?n.shotT:null,this.subject=n.subject,this.clock=0,this.done=!1,this.cues={shot:this.shotT==null,goal:!1};let i=t.sample(n.goalT);this.goal=new L(Math.sign(i?i.ball.x:1)*Z.HL,1.1,0);let r=new L;this.subjectPos(this.shotT??n.goalT-.6,r)||r.set(this.goal.x-Math.sign(this.goal.x)*16,0,0);let o=new L(r.x-this.goal.x,0,r.z-this.goal.z);o.lengthSq()<4&&o.set(-Math.sign(this.goal.x),0,.3),o.normalize(),this.dir=o;let a=new L(-o.z,0,o.x),l=Math.sign(r.z||1)*Math.sign(a.z||1);this.side=a.multiplyScalar(l),this.cam={mode:"free",pos:new L,look:new L,fov:62,roll:0},this.first=!0,this._a=new L,this._b=new L,this._c=new L,this._l=new L}subjectPos(t,e){if(this.subject<0)return null;let n=this.rec.indexAt(t);return n<0?null:this.rec.rootAt(n,this.subject,e)}speed(t){let e=.85;return this.shotT!=null&&(e-=.55*Math.exp(-(((t-this.shotT)/.35)**2)),t>this.shotT&&t<this.goalT&&(e=Math.min(e,.45))),e-=.6*Math.exp(-(((t-this.goalT)/.45)**2)),Math.max(.25,e)}advance(t){let e=[];return this.done||(this.clock+=t,this.t=Math.min(this.t1,this.t+t*this.speed(this.t)),!this.cues.shot&&this.t>=this.shotT&&(this.cues.shot=!0,e.push("shot")),!this.cues.goal&&this.t>=this.goalT&&(this.cues.goal=!0,e.push("goal")),this.t>=this.t1&&(this.done=!0)),e}frame(){return this.rec.sample(this.t)}camera(t,e){let n=this.t,i=this.cam,r=this.shotT??this.goalT-.6,o=gc(r+.05,this.goalT+.35,n),a=this.subjectPos(Math.min(n,r+.3),this._a)||this._a.copy(t.ball),l=t.ball,c=this._b.copy(a).addScaledVector(this.dir,6.5).addScaledVector(this.side,3.4);c.y=4.6;let h=this._c.copy(this.goal).addScaledVector(this.dir,7).addScaledVector(this.side,4.8);h.y=2.8;let u=c.lerp(h,o);u.x+=Math.sin(this.clock*.9)*.18,u.y+=Math.sin(this.clock*1.3+1)*.12,u.z+=Math.cos(this.clock*.7)*.18,u.y=Math.max(1.6,u.y),u.x=Bn.clamp(u.x,-Z.HL-6,Z.HL+6),u.z=Bn.clamp(u.z,-Z.HW-5,Z.HW+5);let d=this._l.copy(a).setY(1).lerp(this.goal,.12);return d.lerp(this._c.copy(a).setY(.9).lerp(l,.5),gc(r-.3,r+.15,n)),d.lerp(l,gc(r+.2,r+.2+.6*Math.max(.3,this.goalT-r),n)),d.lerp(this._a.copy(l).lerp(this.goal,.35),gc(this.goalT-.1,this.goalT+.6,n)),this.first?(i.pos.copy(u),i.look.copy(d),this.first=!1):(i.pos.lerp(u,1-Math.exp(-e*3.2)),i.look.lerp(d,1-Math.exp(-e*5))),i.fov=60-10*o,i.roll=Math.sin(this.clock*.8)*.018,i}};le.enabled=!1;var ks=120,i1=175;function rm(s){let t=Bn.clamp((s-ks)/(i1-ks),0,1),e=s*Math.PI/360;return{d:t,R:(t+1)*Math.sin(e)/(t+Math.cos(e))}}var s1="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",r1=`
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
}`,vc=class{constructor(t,e={}){this.canvas=t,this.quality=e.quality||"high";let n=new Pl({canvas:t,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!!e.preserve});n.outputColorSpace=_s,n.shadowMap.enabled=!0,n.shadowMap.type=yh,n.shadowMap.autoUpdate=!1,this.renderer=n,this.scene=new lr,this.scene.fog=new Zr(15921642,60,330),this.camera=new an(85,16/9,.07,1500),this.camera.rotation.order="YXZ";let i=new ro(16777215,1);i.position.set(-36,64,30),i.castShadow=!0;let r=i.shadow.camera;r.left=-46,r.right=46,r.top=34,r.bottom=-34,r.near=1,r.far=200,i.shadow.mapSize.set(2048,2048),i.shadow.bias=-8e-4,i.shadow.normalBias=.02,this.sun=i,this.scene.add(i,i.target),At.uLightDir.value.copy(i.position).normalize(),this.sky=new se(new ws(1200,24,12),mp()),this.sky.renderOrder=-10,this.sky.frustumCulled=!1,this.scene.add(this.sky);let o=Ep();this.clouds=new tn;let a=new se(o.solid,fi({fog:!1})),l=new se(o.edges,Qn({fog:!1}));l.frustumCulled=!1,this.clouds.add(a,l),this.scene.add(this.clouds),this.atlas=new hc,At.uAtlas.value=this.atlas.texture,this.scoreTex=new uc,this.screenMat=xp(this.scoreTex.texture),this.staticMat=fi({crowd:!0,atlas:!0}),this.staticEdgeMat=Qn({crowd:!0}),this.casterMat=fi({}),this.casterEdgeMat=Qn({}),this.netMat=Qn({net:!0,role:C.NET,widthScale:.5}),this.nets=new se(wp(),this.netMat),this.nets.frustumCulled=!1,this.scene.add(this.nets),this.netState=[{amp:0,t:9,x:0,y:0,z:0,dx:1,dy:0,dz:0,count:0},{amp:0,t:9,x:0,y:0,z:0,dx:-1,dy:0,dz:0,count:0}],this.blobs=new fc(24),this.markers=new pc,this.burst=new mc(200),this.scene.add(this.blobs.mesh,this.markers.group,this.burst.mesh),this.venue=null,this.venueObjs=[],this.batch=null,this.animators=[],this.match=null,this.style="classic",this.fov=85,this.time=0,this.shake=0,this.ballPos=new L,this.ballQ=new Ue,this.ballM=new ae,this.crowdLevel=0,this.localPlayer=null,this.firstPerson=!0,this.hideHead=!0,this.hfov=100,this.wide=null,this.resize()}setQuality(t){this.quality=t;let e=window.devicePixelRatio||1,n=t==="low"?Math.min(1,e)*.75:Math.min(t==="medium"?1.25:2,e);this.renderer.setPixelRatio(n*(this.resScale||1));let i=t==="high"?2048:1024;this.sun.shadow.mapSize.x!==i&&(this.sun.shadow.mapSize.set(i,i),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null)),this.resize()}setResolutionScale(t){Math.abs(t-(this.resScale||1))<.01||(this.resScale=t,this.setQuality(this.quality))}resize(){let t=this.canvas.clientWidth||window.innerWidth,e=this.canvas.clientHeight||window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix();let n=this.renderer.getPixelRatio();At.uResolution.value.set(t*n,e*n),this.pixelRatio=n,this.applyLineWidth()}applyLineWidth(){let t=Dl[this.style],e=this.pixelRatio||1;At.uLineWidth.value=t.lineWidth*e,At.uMinWidth.value=Math.min(t.lineWidth,1.1)*e;let n=t.name==="neo";At.uTaper.value=n?10:30,At.uTaperMin.value=n?.25:.4,At.uDetailDist.value=n?34:45,At.uCreaseDist.value=n?14:20}setStyle(t){let e=hp(t);this.style=e.name,At.uToon.value=e.toon,At.uShadowAmt.value=e.shadow,this.renderer.shadowMap.autoUpdate=e.shadow>0,this.renderer.shadowMap.needsUpdate=e.shadow>0,this.scene.fog.color.set(e.fog),this.scene.fog.near=e.fogNear,this.scene.fog.far=e.fogFar,this.clouds.visible=e.clouds,this.blobShowPlayers=e.blobs,this.applyLineWidth(),this.match&&this.updateScoreboard(!0),document.documentElement.dataset.style=e.name}setVenue(t,e={}){let n=`${t}|${e.homeName}|${e.final}|${this.quality}`;if(this.venueKey===n)return;this.venueKey=n;for(let c of this.venueObjs)this.scene.remove(c),c.geometry.dispose();this.venueObjs=[];let i=Tp(t,{atlas:this.atlas,quality:this.quality,homeName:e.homeName||"HOME",final:!!e.final,seed:e.seed||7});this.venue=i;let r=new se(i.solid,this.staticMat);r.receiveShadow=!0;let o=new se(i.edges,this.staticEdgeMat);o.frustumCulled=!1;let a=new se(i.casterSolid,this.casterMat);a.castShadow=!0,a.receiveShadow=!0;let l=new se(i.casterEdges,this.casterEdgeMat);l.frustumCulled=!1,this.venueObjs.push(r,o,a,l);for(let c of i.screens){let h=new se(new kn(c.w,c.h),this.screenMat);h.position.set(c.x,c.y,c.z),h.rotation.y=c.ry+Math.PI,h.translateZ(-.06),this.venueObjs.push(h)}for(let c of this.venueObjs)this.scene.add(c);this.renderer.shadowMap.needsUpdate=!0}setMatch(t,e){this.match=t,e&&up(e.kits,e.human),this.kits=e&&e.kits?e.kits:null,this.rebuildCharacters(),this.burst.clear(),this.netState.forEach(n=>{n.amp=0,n.t=9}),this.updateScoreboard(!0)}rebuildCharacters(){this.batch&&(this.scene.remove(this.batch.mesh,this.batch.edges),this.batch.dispose()),this.batch=new Wl(this.match.players,this.atlas,{kits:this.kits,quality:this.quality}),this.scene.add(this.batch.mesh,this.batch.edges),this.animators=this.match.players.map(t=>new ac(t)),this.recorder&&this.setRecording(!0)}setRecording(t){if(!t||!this.match){this.recorder=null;return}let e=this.match.players.length;this.recorder&&this.recorder.n===e?this.recorder.clear():this.recorder=new xc(e)}updateScoreboard(t){let e=this.match;e&&(this.scoreTex.update(e.teams[0].short||"HOM",e.teams[1].short||"AWY",e.scoreline,e.displayClock.slice(0,2)+"'",this.style,e.phase==="fulltime"),t&&(this.scoreTex.key=""))}render(t,e,n,i={}){let r=this.match;if(this.time+=e,At.uTime.value=this.time,this.crowdLevel=Math.max(i.crowd??0,this.crowdLevel-e*.35),At.uCrowd.value=this.crowdLevel,r&&this.batch&&i.replay)this.drawReplayFrame(i.replay,e);else if(r&&this.batch){let o=r.time-(1-t)*.008333333333333333,a=this.recorder&&this.recorder.begin(o)?this.recorder:null,l=r.ball;this.ballPos.set(l.prevPos.x+(l.pos.x-l.prevPos.x)*t,l.prevPos.y+(l.pos.y-l.prevPos.y)*t,l.prevPos.z+(l.pos.z-l.prevPos.z)*t);let c=this._qa||(this._qa=new Ue),h=this._qb||(this._qb=new Ue);c.set(l.prevQ[0],l.prevQ[1],l.prevQ[2],l.prevQ[3]),h.set(l.q[0],l.q[1],l.q[2],l.q[3]),this.ballQ.slerpQuaternions(c,h,t),this.ballM.compose(this.ballPos,this.ballQ,this._one||(this._one=new L(1,1,1))),this.batch.setMatrix(this.batch.ballRow,this.ballM);let u={match:r,alpha:t,dt:e,now:o,ball:this.ballPos,local:!1};this.blobs.begin();for(let m=0;m<this.animators.length;m++){let g=this.animators[m],x=g.p;u.local=x===this.localPlayer&&this.firstPerson;let f=g.update(u);a&&a.putPlayer(m,f);let p=m*Rn;for(let y=0;y<Rn;y++)this.batch.setMatrix(p+y,f[y]);if(u.local&&this.hideHead&&(this.batch.hide(p+Ut.HEAD),this.batch.hide(p+Ut.TORSO),this.isWide()))for(let y of[Ut.UARM_L,Ut.UARM_R,Ut.FARM_L,Ut.FARM_R])this.batch.hide(p+y);this.blobShowPlayers&&this.blobs.add(g.root.x,g.root.z,.95,.2)}let d=Math.max(0,this.ballPos.y-pe);this.blobs.add(this.ballPos.x,this.ballPos.z,.34+d*.12,.42/(1+d*.8)),this.blobs.end(),this.batch.commit(),this.updateNets(e),a&&a.end(this.ballPos,this.ballQ,this.crowdLevel,At.uNetA.value,At.uNetDA.value,At.uNetB.value,At.uNetDB.value),this.updateScoreboard(!1)}this.burst.update(e),this.updateCamera(n,e,t),!this.noDraw&&(this.isWide()?this.renderWide():this.renderer.render(this.scene,this.camera))}drawReplayFrame(t,e){let n=this.batch,i=n.data,r=t.parts;this.ballPos.copy(t.ball),this.ballQ.copy(t.q),this.ballM.compose(this.ballPos,this.ballQ,this._one||(this._one=new L(1,1,1))),n.setMatrix(n.ballRow,this.ballM);let o=this.animators.length*Rn;for(let c=0;c<o;c++){let h=c*16,u=c*12;i[h]=r[u],i[h+1]=r[u+1],i[h+2]=r[u+2],i[h+3]=0,i[h+4]=r[u+3],i[h+5]=r[u+4],i[h+6]=r[u+5],i[h+7]=0,i[h+8]=r[u+6],i[h+9]=r[u+7],i[h+10]=r[u+8],i[h+11]=0,i[h+12]=r[u+9],i[h+13]=r[u+10],i[h+14]=r[u+11],i[h+15]=1}if(this.blobs.begin(),this.blobShowPlayers)for(let c=0;c<this.animators.length;c++)this.blobs.add(r[c*Rn*12+9],r[c*Rn*12+11],.95,.2);let a=Math.max(0,this.ballPos.y-pe);this.blobs.add(this.ballPos.x,this.ballPos.z,.34+a*.12,.42/(1+a*.8)),this.blobs.end(),n.commit();let l=t.nets;At.uNetA.value.set(l[0],l[1],l[2],l[3]),At.uNetDA.value.set(l[4],l[5],l[6]),At.uNetB.value.set(l[7],l[8],l[9],l[10]),At.uNetDB.value.set(l[11],l[12],l[13]),this.crowdLevel=Math.max(this.crowdLevel,t.crowd),At.uCrowd.value=this.crowdLevel}isWide(){return this.hfov>ks+.01}ensureWide(t){let e=this.wide;if(!e){let n=new Be({uniforms:{tCube:{value:null},uRot:{value:new Xt},uD:{value:0},uR:{value:1},uAspect:{value:1}},vertexShader:s1,fragmentShader:r1,depthTest:!1,depthWrite:!1}),i=new se(new kn(2,2),n);i.frustumCulled=!1;let r=new lr;r.add(i),e=this.wide={mat:n,scene:r,cam:new Zi(-1,1,1,-1,0,1),rt:null,cube:null,size:0,fwd:new L,dir:new L}}return(!e.rt||Math.abs(t-e.size)/e.size>.15)&&(e.rt&&e.rt.dispose(),e.rt=new br(t,{generateMipmaps:!1,minFilter:qe,magFilter:qe}),e.cube=new dr(this.camera.near,this.camera.far,e.rt),e.size=t,e.mat.uniforms.tCube.value=e.rt.texture),e}renderWide(){let t=this.renderer,e=this.camera,{d:n,R:i}=rm(this.hfov),r=t.getDrawingBufferSize(this._buf||(this._buf=new Zt)),o=r.x/r.y,a=r.x/2/i,l=this.quality==="low"?1024:this.quality==="medium"?1536:2048,c=this.quality==="low"?1:1.35,h=Bn.clamp(Math.round(2*a*c/64)*64,512,l),u=this.ensureWide(h),d=u.cube;d.coordinateSystem!==t.coordinateSystem&&(d.coordinateSystem=t.coordinateSystem,d.updateCoordinateSystem()),e.updateMatrixWorld(),d.position.copy(e.position),d.updateMatrixWorld();let m=At.uResolution.value,g=m.x,x=m.y,f=At.uLineWidth.value,p=At.uMinWidth.value,y=u.size/2/a;m.set(u.size,u.size),At.uLineWidth.value=f*y,At.uMinWidth.value=p*y,e.getWorldDirection(u.fwd);let _=i*Math.sqrt(1+1/(o*o)),b=n+1,M=Math.atan2(_,b)+Math.asin(Math.min(1,_*n/Math.sqrt(b*b+_*_))),S=Math.cos(Math.min(Math.PI,M+.96)),T=t.shadowMap.autoUpdate;T&&(t.shadowMap.autoUpdate=!1,t.shadowMap.needsUpdate=!0);let v=t.getRenderTarget(),A=0;for(let P=0;P<6;P++){let N=d.children[P];N.getWorldDirection(u.dir),!(u.dir.dot(u.fwd)<S)&&(t.setRenderTarget(u.rt,P),t.render(this.scene,N),A+=t.info.render.calls)}t.shadowMap.autoUpdate=T,t.setRenderTarget(v),m.set(g,x),At.uLineWidth.value=f,At.uMinWidth.value=p;let R=u.mat.uniforms;R.uRot.value.setFromMatrix4(e.matrixWorld),R.uD.value=n,R.uR.value=i,R.uAspect.value=o,t.render(u.scene,u.cam),this.wideCalls=A+1}projectToScreen(t,e){let n=this.camera;if(!this.isWide()){if(e.copy(t).applyMatrix4(n.matrixWorldInverse),e.z>-.05){let m=e.x>=0?1:-1,g=Bn.clamp(e.y/(Math.hypot(e.x,e.z)+.001),-.6,.6);return e.set(m*50,g*50,0)}return e.applyMatrix4(n.projectionMatrix)}let{d:i,R:r}=rm(this.hfov);e.copy(t).applyMatrix4(n.matrixWorldInverse);let o=e.length()||1,a=-e.z/o,l=Math.hypot(e.x,e.y)||1e-6,c=e.x/l,h=e.y/l,u=i+a,d=u>1e-4?(i+1)*Math.sqrt(Math.max(0,1-a*a))/u:1e4;return e.set(c*d/r,h*d*n.aspect/r,0),e}updateNets(t){let e=this.match.ball;for(let n=0;n<2;n++){let i=this.netState[n],r=e.net[n];r&&r.count!==i.count?(i.count=r.count,i.amp=Math.max(i.amp*.9,Math.min(.6,.12+r.depth*2)),i.x=r.x,i.y=r.y,i.z=r.z,i.dx=-r.nx,i.dy=-r.ny,i.dz=-r.nz,i.t=0,i.contact=!0,r.depth=0):(i.t+=t,i.contact=!1);let o=i.amp*Math.cos(i.t*14)*Math.exp(-i.t*3.4);i.t>3&&(i.amp=0);let a=n===0?At.uNetA.value:At.uNetB.value,l=n===0?At.uNetDA.value:At.uNetDB.value;a.set(i.x,i.y,i.z,o),l.set(i.dx,i.dy,i.dz)}}updateCamera(t,e,n){let i=this.camera;if(t.fov){let r;if(i.aspect<1)this.hfov=Math.min(t.fov,ks),r=Bn.clamp(Math.min(t.fov,110),35,110);else{this.hfov=t.mode==="fp"?t.fov:Math.min(t.fov,ks);let o=Math.min(this.hfov,ks);r=Bn.clamp(2*Math.atan(Math.tan(o*Math.PI/360)/i.aspect)*180/Math.PI,35,110)}Math.abs(r-i.fov)>.01&&(i.fov=r,i.updateProjectionMatrix())}else this.hfov=Math.min(this.hfov,ks);if(t.mode==="fp"&&this.localPlayer&&this.match){let r=this.localPlayer,o=r.prevPos.x+(r.pos.x-r.prevPos.x)*n,a=r.prevPos.z+(r.pos.z-r.prevPos.z)*n,l=t.eye??1.65;if(t.bob){let c=Math.min(1,r.speed/7.5);l+=Math.sin((r.prevGait+(r.gait-r.prevGait)*n)*Math.PI*4)*.012*c*t.bob}if(i.position.set(o+Math.sin(t.yaw)*.08,l,a+Math.cos(t.yaw)*.08),t.shake&&this.shake>0){let c=this.shake*t.shake;i.position.x+=(Math.random()-.5)*.02*c,i.position.y+=(Math.random()-.5)*.02*c}this.shake=Math.max(0,this.shake-e*4),i.rotation.set(t.pitch,t.yaw+Math.PI,0,"YXZ")}else if(t.mode==="orbit"){let r=t.angle;i.position.set(Math.cos(r)*t.radius,t.height,Math.sin(r)*t.radius),i.lookAt(t.target||this._origin||(this._origin=new L))}else if(t.pos){let r=t.pos,o=t.look;i.position.set(r.x??r[0],r.y??r[1],r.z??r[2]),o?i.lookAt(o.x??o[0],o.y??o[1],o.z??o[2]):i.rotation.set(t.pitch||0,(t.yaw||0)+Math.PI,0,"YXZ"),t.roll&&i.rotateZ(t.roll)}}celebrate(t,e,n,i=1){let r=this.style==="neo"?[n===0?C.SHIRT_0:C.SHIRT_1,C.GOLD,C.MARKER,C.LINES,C.STAND_C]:[C.INK,C.LINES,n===0?C.SHIRT_0:C.SHIRT_1];this.burst.spawn(t,1.5,e,Math.round(70*i),r,7)}renderPreview(t,e,n,i){let r=this.style,o=new ln(e,n,{samples:4}),a=At.uResolution.value.clone(),l=this.camera.aspect;this.setStyle(t),At.uResolution.value.set(e,n),At.uLineWidth.value=Dl[t].lineWidth,this.camera.aspect=e/n,this.camera.updateProjectionMatrix();let c=this.camera.position.clone(),h=this.camera.quaternion.clone();i&&(this.camera.position.set(i.pos[0],i.pos[1],i.pos[2]),this.camera.lookAt(new L(i.look[0],i.look[1],i.look[2]))),this.renderer.shadowMap.needsUpdate=!0,this.renderer.setRenderTarget(o),this.renderer.render(this.scene,this.camera);let u=new Uint8Array(e*n*4);this.renderer.readRenderTargetPixels(o,0,0,e,n,u),this.renderer.setRenderTarget(null),o.dispose();let d=document.createElement("canvas");d.width=e,d.height=n;let m=d.getContext("2d"),g=m.createImageData(e,n);for(let x=0;x<n;x++)g.data.set(u.subarray((n-1-x)*e*4,(n-x)*e*4),x*e*4);return m.putImageData(g,0,0),this.setStyle(r),this.camera.position.copy(c),this.camera.quaternion.copy(h),At.uResolution.value.copy(a),this.applyLineWidth(),this.camera.aspect=l,this.camera.updateProjectionMatrix(),d.toDataURL("image/png")}stats(){let t=this.renderer.info;return{calls:this.isWide()?this.wideCalls:t.render.calls,tris:t.render.triangles,people:this.venue?this.venue.people:0,wide:this.isWide()}}};function Nr(s){let t=s>>>0;return()=>(t=t*1664525+1013904223>>>0,t/2147483648-1)}function lm(s,t){let e=Math.exp(-2*Math.PI*t/44100),n=0;for(let i=0;i<s.length;i++)n=(1-e)*s[i]+e*n,s[i]=n}function o1(s,t){let e=Math.exp(-2*Math.PI*t/44100),n=0,i=0;for(let r=0;r<s.length;r++){let o=s[r];n=e*(n+o-i),i=o,s[r]=n}}function bc(s,t,e){let n=2*Math.PI*t/44100,i=Math.sin(n)/(2*e),r=Math.cos(n),o=i,a=-i,l=1+i,c=-2*r,h=1-i,u=0,d=0,m=0,g=0;for(let x=0;x<s.length;x++){let f=s[x],p=(o*f+a*d-c*m-h*g)/l;d=u,u=f,g=m,m=p,s[x]=p}}function Pi(s,t=.9){let e=0;for(let n=0;n<s.length;n++)e=Math.max(e,Math.abs(s[n]));if(e>0)for(let n=0;n<s.length;n++)s[n]*=t/e;return s}function Io(s,t,e,n,i,r){let o=Math.floor(44100*s),a=new Float32Array(o),l=Nr(r),c=0;for(let h=0;h<o;h++){let u=h/44100,d=e+(t-e)*Math.exp(-u*38);c+=2*Math.PI*d/44100;let m=Math.exp(-u*(s>.12?26:40));a[h]=Math.sin(c)*m+l()*i*Math.exp(-u*140)+(h<44100*.004?l()*n:0)}return lm(a,5e3),Pi(a,.95)}function a1(s){let t=Math.floor(52920),e=new Float32Array(t),n=Nr(s),i=[[523,1],[1320,.6],[2130,.45],[3310,.3],[4870,.2]];for(let r=0;r<t;r++){let o=r/44100,a=0;for(let[l,c]of i)a+=Math.sin(2*Math.PI*l*o)*c*Math.exp(-o*(3+l/900));e[r]=a+n()*.3*Math.exp(-o*120)}return Pi(e,.8)}function Hu(s,t,e,n,i,r){let o=Math.floor(44100*s),a=new Float32Array(o),l=Nr(r);for(let c=0;c<o;c++){let h=c/44100;a[c]=l()*Math.min(1,h/n)*Math.exp(-h*i)}return t&&lm(a,t),e&&o1(a,e),Pi(a,.8)}function om(s){let t=Math.floor(44100*s.reduce((i,[r,o])=>i+r+o,0)),e=new Float32Array(t),n=0;for(let[i,r]of s){let o=Math.floor(44100*i),a=0;for(let l=0;l<o;l++){let c=l/44100,h=2950+90*Math.sin(2*Math.PI*28*c)+40*Math.sin(2*Math.PI*7*c);a+=2*Math.PI*h/44100;let u=Math.min(1,c/.02)*Math.min(1,(i-c)/.04);e[n+l]=(Math.sin(a)*.7+Math.sin(a*2)*.12)*u}n+=o+Math.floor(44100*r)}return Pi(e,.55)}function l1(s,t=6){let e=Math.floor(44100*t),n=new Float32Array(e),i=Nr(s);for(let a=0;a<e;a++)n[a]=i();let r=new Float32Array(e);for(let[a,l,c]of[[420,1.2,1],[900,1.5,.8],[1800,2,.4],[260,.9,.7]]){let h=n.slice();bc(h,a,l);let u=i()*6;for(let d=0;d<e;d++)r[d]+=h[d]*c*(.75+.25*Math.sin(2*Math.PI*(d/e)*3+u))}let o=Math.floor(44100*.5);for(let a=0;a<o;a++){let l=a/o;r[a]=r[a]*l+r[e-o+a]*(1-l)}return Pi(r.subarray(0,e-o),.6)}function c1(s,t=3.2){let e=Math.floor(44100*t),n=new Float32Array(e),i=Nr(s);for(let o=0;o<e;o++)n[o]=i();let r=new Float32Array(e);for(let[o,a,l]of[[700,1.4,1],[1300,1.8,.7],[2500,2.2,.35],[380,1,.6]]){let c=n.slice();bc(c,o,a);for(let h=0;h<e;h++)r[h]+=c[h]*l}for(let o=0;o<e;o++){let a=o/44100;r[o]*=Math.min(1,a/.25)*Math.exp(-Math.max(0,a-1.2)*1.3)}return Pi(r,.85)}function h1(s){let t=Math.floor(70560),e=new Float32Array(t),n=Nr(s);for(let r=0;r<t;r++)e[r]=n();let i=new Float32Array(t);for(let r=0;r<3;r++){let o=e.slice();bc(o,380+r*180,3);for(let a=0;a<t;a++)i[a]+=o[a]}for(let r=0;r<t;r++){let o=r/44100;i[r]*=Math.min(1,o/.15)*Math.exp(-o*1.6)*(1-.3*o/1.6)}return Pi(i,.7)}function am(s,t,e){let n=Math.floor(44100*t),i=new Float32Array(n);for(let r=0;r<n;r++){let o=r/44100;i[r]=Math.sin(2*Math.PI*s*o)*Math.exp(-o*30)*Math.min(1,o/.003)}return Pi(i,.5)}function u1(s){let t=Math.floor(12348.000000000002),e=new Float32Array(t),n=0;for(let r=0;r<t;r++){let a=210-60*(r/44100);n+=a/44100,e[r]=n%1*2-1}let i=new Float32Array(t);for(let[r,o,a]of[[650,5,1],[1700,7,.6],[2600,8,.3]]){let l=e.slice();bc(l,r,o);for(let c=0;c<t;c++)i[c]+=l[c]*a}for(let r=0;r<t;r++){let o=r/44100;i[r]*=Math.min(1,o/.02)*Math.exp(-o*7)}return Pi(i,.6)}var _c=class{constructor(){this.ctx=null,this.buffers={},this.vol={master:.8,sfx:.9,crowd:.6},this.ready=!1,this.crowdLevel=.3,this.muted=!1}init(){if(this.ctx)return;let t=window.AudioContext||window.webkitAudioContext;if(!t)return;try{this.ctx=new t({latencyHint:"interactive"})}catch{return}let e=this.ctx;this.master=e.createGain(),this.sfx=e.createGain(),this.crowd=e.createGain(),this.sfx.connect(this.master),this.crowd.connect(this.master),this.master.connect(e.destination);let n={touch:Io(.07,260,120,.25,.25,1),pass:Io(.1,220,90,.5,.35,2),shot:Io(.16,190,60,1,.7,3),bounce:Io(.08,140,70,.1,.1,4),post:a1(5),net:Hu(.6,3e3,400,.01,7,6),tackle:Hu(.18,1800,120,.004,22,7),slide:Hu(.55,2400,500,.03,5,8),catch:Io(.1,160,80,.6,.6,9),whistle:om([[.32,0]]),whistleLong:om([[.3,.12],[.3,.12],[.75,0]]),crowd:l1(10),cheer:c1(11),groan:h1(12),ui:am(1400,.06,13),ack:am(1900,.09,14),shout:u1(15)};for(let[i,r]of Object.entries(n)){let o=e.createBuffer(1,r.length,44100);o.copyToChannel(r,0),this.buffers[i]=o}this.applyVolumes(),this.ready=!0}resume(){this.ctx&&this.ctx.state!=="running"&&!this.muted&&this.ctx.resume().catch(()=>{})}suspend(){this.ctx&&this.ctx.state==="running"&&this.ctx.suspend().catch(()=>{})}setMuted(t){this.muted=t,t?this.suspend():this.resume()}setVolumes(t){Object.assign(this.vol,t),this.applyVolumes()}applyVolumes(){this.ctx&&(this.master.gain.value=this.vol.master,this.sfx.gain.value=this.vol.sfx,this.crowd.gain.value=this.vol.crowd)}play(t,e={}){if(!this.ready||this.ctx.state!=="running")return;let n=this.buffers[t];if(!n)return;let i=this.ctx,r=i.createBufferSource();r.buffer=n,e.rate&&(r.playbackRate.value=e.rate);let o=i.createGain();o.gain.value=e.gain??1;let a=o;if(e.pan&&i.createStereoPanner){let l=i.createStereoPanner();l.pan.value=Math.max(-1,Math.min(1,e.pan)),o.connect(l),a=l}return r.connect(o),a.connect(e.group==="crowd"?this.crowd:this.sfx),r.start(),r}startCrowd(t=.4){if(!this.ready)return;this.stopCrowd();let e=this.ctx;this.crowdSrc=e.createBufferSource(),this.crowdSrc.buffer=this.buffers.crowd,this.crowdSrc.loop=!0,this.crowdGain=e.createGain(),this.crowdGain.gain.value=0,this.crowdSrc.connect(this.crowdGain).connect(this.crowd),this.crowdSrc.start(),this.baseCrowd=t,this.setExcitement(0)}stopCrowd(){if(this.crowdSrc){try{this.crowdSrc.stop()}catch{}this.crowdSrc.disconnect(),this.crowdSrc=null}}setExcitement(t){if(!this.crowdGain)return;let e=this.baseCrowd*(.45+.9*Math.min(1,t));this.crowdGain.gain.setTargetAtTime(e,this.ctx.currentTime,.4)}};var Gu=[["W A S D","Move (relative to where you look)"],["Mouse","Look"],["Shift","Sprint"],["Left mouse","Shoot (hold to charge, release to strike)"],["Right mouse","Pass to the highlighted teammate (hold briefly for more power)"],["Space","Through pass (with the ball) / call for a pass (without it)"],["E","Standing tackle (lunges at the ball when it is close)"],["C","Slide tackle"],["Esc","Pause"]],Vu=[["Left thumb","Drag anywhere on the left side to move; push to the edge of the stick to sprint"],["Right thumb","Drag anywhere on the right side to look and aim"],["SHOOT","Hold to charge, release to strike (slide your thumb on it to fine-tune the aim)"],["PASS","Pass to the ringed teammate (hold briefly for more power)"],["THRU / CALL","Through pass with the ball; call for the ball without it"],["TACKLE / SLIDE","Replace SHOOT and PASS while an opponent has the ball"],["II","Pause"]],Mc=class{constructor(t){this.el=t,this.keys=new Set,this.lookX=0,this.lookY=0,this.buttons=0,this.locked=!1,this.lockSupported="requestPointerLock"in t,this.dragMode=!this.lockSupported,this.active=!1,this.listeners=[],this.onPause=null,this.onLockLost=null,this.onLockError=null,this.sensitivity=1,this.invertY=!1,this.lastLockExit=0,this.touchMode=!1,this.touch={active:!1,f:0,r:0,sprint:!1},this.lastTouchAt=-1e9,this.handlers={keydown:e=>this.keydown(e),keyup:e=>this.keyup(e),mousemove:e=>this.mousemove(e),mousedown:e=>this.mousedown(e),mouseup:e=>this.mouseup(e),contextmenu:e=>{this.active&&e.preventDefault()},plc:()=>this.lockChange(),ple:()=>{this.locked=!1,this.onLockError&&this.onLockError()},blur:()=>{this.keys.clear(),this.releaseAll()},touchSeen:e=>{(e.pointerType==="touch"||e.pointerType==="pen")&&(this.lastTouchAt=performance.now())}},window.addEventListener("pointerdown",this.handlers.touchSeen,!0),window.addEventListener("pointerup",this.handlers.touchSeen,!0),window.addEventListener("keydown",this.handlers.keydown),window.addEventListener("keyup",this.handlers.keyup),window.addEventListener("mousemove",this.handlers.mousemove),window.addEventListener("mousedown",this.handlers.mousedown),window.addEventListener("mouseup",this.handlers.mouseup),window.addEventListener("contextmenu",this.handlers.contextmenu),document.addEventListener("pointerlockchange",this.handlers.plc),document.addEventListener("pointerlockerror",this.handlers.ple),window.addEventListener("blur",this.handlers.blur)}on(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(e=>e!==t)}}emit(t,e){for(let n of this.listeners)n(t,e)}requestLock(){if(!this.lockSupported)return this.dragMode=!0,!1;try{let t=this.el.requestPointerLock();t&&t.catch&&t.catch(()=>{this.onLockError&&this.onLockError()})}catch{return this.dragMode=!0,!1}return!0}exitLock(){document.pointerLockElement&&document.exitPointerLock()}lockChange(){let t=this.locked;this.locked=document.pointerLockElement===this.el,this.locked&&(this.dragMode=!1,!t&&this.onLockGained&&this.onLockGained()),t&&!this.locked&&(this.lastLockExit=performance.now(),this.releaseAll(),this.active&&this.onLockLost&&this.onLockLost())}releaseAll(){this.buttons&1&&this.emit("shoot",!1),this.buttons&2&&this.emit("pass",!1),this.buttons=0,this.touch.active=!1,this.touch.f=0,this.touch.r=0,this.touch.sprint=!1,this.onReleaseAll&&this.onReleaseAll()}fromTouch(t){return t.sourceCapabilities&&t.sourceCapabilities.firesTouchEvents||performance.now()-this.lastTouchAt<900}touchAction(t,e){this.active&&(t==="shoot"&&(e?this.buttons|=1:this.buttons&=-2),t==="pass"&&(e?this.buttons|=2:this.buttons&=-3),!(!e&&(t==="tackle"||t==="slide"))&&this.emit(t,e))}touchLook(t,e){this.active&&(this.lookX+=t,this.lookY+=e)}keydown(t){let e=t.code;if(e==="Escape"){this.onPause&&this.onPause();return}this.active&&(["Space","ShiftLeft","ShiftRight","KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e)&&t.preventDefault(),!t.repeat&&(this.keys.add(e),e==="Space"?this.emit("through",!0):e==="KeyE"?this.emit("tackle",!0):e==="KeyC"?this.emit("slide",!0):e==="KeyP"&&this.onPause&&this.onPause()))}keyup(t){this.keys.delete(t.code),t.code==="Space"&&this.emit("through",!1)}mousedown(t){!this.active||this.fromTouch(t)||!this.locked&&!this.dragMode||t.target!==this.el&&!this.locked||(t.button===0&&(this.buttons|=1,this.emit("shoot",!0)),t.button===2&&(this.buttons|=2,this.emit("pass",!0),t.preventDefault()))}mouseup(t){this.fromTouch(t)||(t.button===0&&this.buttons&1&&(this.buttons&=-2,this.emit("shoot",!1)),t.button===2&&this.buttons&2&&(this.buttons&=-3,this.emit("pass",!1)))}mousemove(t){!this.active||this.fromTouch(t)||(this.locked||this.dragMode&&t.buttons&7)&&(this.lookX+=t.movementX||0,this.lookY+=t.movementY||0)}axes(){let t=this.keys,e=(t.has("KeyW")?1:0)-(t.has("KeyS")?1:0),n=(t.has("KeyD")?1:0)-(t.has("KeyA")?1:0),i=t.has("ShiftLeft")||t.has("ShiftRight"),r=this.touch;return r.active&&(e=Math.max(-1,Math.min(1,e+r.f)),n=Math.max(-1,Math.min(1,n+r.r)),i=i||r.sprint),{f:e,r:n,sprint:i}}consumeLook(t,e){let n=.0022*this.sensitivity;t.yaw-=this.lookX*n,t.pitch-=this.lookY*n*(this.invertY?-1:1);let i=this.keys,r=2.2*e*this.sensitivity;i.has("ArrowLeft")&&(t.yaw+=r),i.has("ArrowRight")&&(t.yaw-=r),i.has("ArrowUp")&&(t.pitch+=r*.6*(this.invertY?-1:1)),i.has("ArrowDown")&&(t.pitch-=r*.6*(this.invertY?-1:1)),this.lookX=0,this.lookY=0,t.pitch=Math.max(-1.35,Math.min(1,t.pitch))}get held(){return{lmb:!!(this.buttons&1),rmb:!!(this.buttons&2)}}};var ge=(s,t,e,n)=>{let i=document.createElement(s);return t&&(i.className=t),n!=null&&(i.innerHTML=n),e&&e.appendChild(i),i},Sc=class{constructor(t){this.root=ge("div","hud hidden",t),this.poss=ge("div","hud-poss",this.root),ge("div","hud-poss-label",this.poss,"YOU HAVE THE BALL"),this.hasBall=!1;let e=ge("div","hud-top",this.root);this.teamA=ge("span","hud-team",e),this.score=ge("span","hud-score",e,"0 - 0"),this.teamB=ge("span","hud-team",e),this.clock=ge("div","hud-clock",this.root,"00:00"),this.phase=ge("div","hud-phase",this.root);let n=ge("div","hud-player",this.root);this.ratingEl=ge("div","hud-rating",n,"6.0"),ge("div","hud-rating-label",n,"RATING");let i=ge("div","hud-stamina",n);this.stamFill=ge("div","hud-stamina-fill",i),this.nameEl=ge("div","hud-name",n),this.cross=ge("div","hud-cross",this.root),this.power=ge("div","hud-power hidden",this.root),this.powerFill=ge("div","hud-power-fill",this.power),this.hint=ge("div","hud-hint",this.root),this.notes=ge("div","hud-notes",this.root),this.arrow=ge("div","hud-arrow hidden",this.root),this.banner=ge("div","hud-banner hidden",this.root),this.fade=ge("div","hud-fade",this.root),this.replayEl=ge("div","hud-replay",this.root),ge("div","rp-bar rp-top",this.replayEl),ge("div","rp-bar rp-bot",this.replayEl),ge("div","rp-tag",this.replayEl,"<i></i>REPLAY"),this.replayInfo=ge("div","rp-info",this.replayEl),this.replayProg=ge("i","",ge("div","rp-prog",this.replayEl)),this.replaySkip=ge("button","rp-skip",this.replayEl,"Skip replay"),this.replaySkip.addEventListener("pointerdown",r=>r.stopPropagation()),this.replaySkip.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.onSkipReplay&&this.onSkipReplay()}),this.radar=ge("canvas","hud-radar",this.root),this.radar.width=180,this.radar.height=250,this.rctx=this.radar.getContext("2d"),this.lastNotes=[],this.v=new L,this.bannerUntil=0,this.fadeUntil=0}show(t){this.root.classList.toggle("hidden",!t)}notify(t,e=""){let n=ge("div","hud-note "+e,this.notes,t);for(this.lastNotes.push(n),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700);this.notes.children.length>3;)this.notes.firstChild.remove()}showBanner(t,e="",n=2200,i=""){this.banner.className="hud-banner "+i,this.banner.innerHTML=`<div class="b-main">${t}</div>${e?`<div class="b-sub">${e}</div>`:""}`,this.bannerUntil=performance.now()+n}flashFade(){this.fade.classList.remove("on"),this.fade.offsetWidth,this.fade.classList.add("on")}setReplay(t,e="",n=!1){this.root.classList.toggle("replaying",t),t&&(this.replayInfo.textContent=e,this.replaySkip.innerHTML=n?"Skip replay <b>Space / click</b>":"Skip replay \u25B8",this.replayProg.style.width="0%")}updateReplay(t){this.replayProg.style.width=`${Math.round((t.t-t.t0)/Math.max(.01,t.t1-t.t0)*100)}%`}update(t){let e=t.match,n=e.human;this.teamA.textContent=e.teams[0].short,this.teamB.textContent=e.teams[1].short,this.teamA.style.setProperty("--kit",t.kitA||"#c00"),this.teamB.style.setProperty("--kit",t.kitB||"#00c"),this.score.textContent=`${e.teams[0].score} - ${e.teams[1].score}`,this.clock.textContent=t.clockText??e.displayClock,this.phase.textContent=t.phaseText||"",n&&(this.ratingEl.textContent=e.stats.rating(n).toFixed(1),this.stamFill.style.width=`${Math.round(n.stamina*100)}%`,this.stamFill.classList.toggle("low",n.stamina<.3),this.nameEl.textContent=`${n.number} ${n.name}`);let i=n&&n.action,r=i&&i.type==="kick"&&(i.kind==="shot"||i.kind==="pass")&&!i.contacted&&i.charge>.01,o=t.intentCharge||0;this.power.classList.toggle("hidden",!(r||o>.01)),(r||o>.01)&&(this.powerFill.style.width=`${Math.round((r?i.charge:o)*100)}%`),this.hint.textContent=t.hint||"";let a=!!n&&e.ball.owner===n&&e.ball.state==="controlled"&&e.phase==="playing";a!==this.hasBall&&(this.hasBall=a,this.poss.classList.toggle("on",a)),this.banner.classList.toggle("hidden",performance.now()>this.bannerUntil),this.updateArrow(t),this.drawRadar(t)}updateArrow(t){let e=t.match,n=e.ball.pos,i=t.view.projectToScreen(this.v.set(n.x,n.y,n.z),this.v);if(!(Math.abs(i.x)>.98||Math.abs(i.y)>.98)||e.phase==="goal"||t.noArrow||this.hasBall){this.arrow.classList.add("hidden");return}let o=Math.atan2(i.y,i.x),a=.86,l=Math.min(a/Math.max(Math.abs(Math.cos(o)),.001),a/Math.max(Math.abs(Math.sin(o)),.001)),c=(Math.cos(o)*l*.5+.5)*100,h=(-Math.sin(o)*l*.5+.5)*100;this.arrow.classList.remove("hidden"),this.arrow.style.left=`${c}%`,this.arrow.style.top=`${h}%`,this.arrow.style.transform=`translate(-50%,-50%) rotate(${-o}rad)`}drawRadar(t){let e=t.match,n=this.rctx,i=this.radar.width,r=this.radar.height,o=e.human,a=o?o.team:0,l=e.attackDir(a),c=10,h=(i-c*2)/Z.W,u=(r-c*2)/Z.L,d=(f,p)=>[c+(Z.HW+p*l)*h,c+(Z.HL-f*l)*u],m=t.style;n.clearRect(0,0,i,r),n.fillStyle=m==="neo"?"rgba(40,180,70,0.85)":"rgba(250,250,245,0.82)",n.fillRect(0,0,i,r),n.strokeStyle=m==="neo"?"#fff":"#222",n.lineWidth=1,n.strokeRect(c,c,i-c*2,r-c*2),n.beginPath(),n.moveTo(c,r/2),n.lineTo(i-c,r/2),n.stroke(),n.beginPath(),n.arc(i/2,r/2,Kt.CIRCLE_R*h,0,Math.PI*2),n.stroke();for(let f of[Z.HL,-Z.HL]){let[p,y]=d(f,Kt.PEN_HW),[_,b]=d(f-Math.sign(f)*Kt.PEN_D,-Kt.PEN_HW);n.strokeRect(Math.min(p,_),Math.min(y,b),Math.abs(_-p),Math.abs(b-y));let[M,S]=d(f,ft.HW),[T]=d(f,-ft.HW);n.lineWidth=3,n.beginPath(),n.moveTo(M,S),n.lineTo(T,S),n.stroke(),n.lineWidth=1}for(let f of e.players){let[p,y]=d(f.pos.x,f.pos.z);n.fillStyle=f.team===0?t.kitA:t.kitB,n.strokeStyle="#111",n.beginPath(),n.arc(p,y,f===o?0:3.6,0,Math.PI*2),n.fill(),n.stroke()}if(o){let[f,p]=d(o.pos.x,o.pos.z),y=t.camYaw,_=Math.sin(y),M=Math.cos(y)*l,S=-_*l;n.fillStyle=m==="neo"?"#ffe45c":"#111",n.beginPath(),n.moveTo(f+M*9,p+S*9),n.lineTo(f-S*5-M*3,p+M*5-S*3),n.lineTo(f+S*5-M*3,p-M*5-S*3),n.closePath(),n.fill(),n.strokeStyle=m==="neo"?"#000":"#fff",n.stroke()}let[g,x]=d(e.ball.pos.x,e.ball.pos.z);n.fillStyle="#fff",n.strokeStyle="#000",n.lineWidth=1.5,n.beginPath(),n.arc(g,x,3,0,Math.PI*2),n.fill(),n.stroke()}};var Ns=(s,t,e,n)=>{let i=document.createElement(s);return t&&(i.className=t),n!=null&&(i.innerHTML=n),e&&e.appendChild(i),i};var d1={attack:{a:["shoot","SHOOT"],b:["pass","PASS"],c:["through","THRU"]},call:{a:["shoot","SHOOT"],b:["pass","PASS"],c:["through","CALL"]},defend:{a:["tackle","TACKLE"],b:["slide","SLIDE"],c:[null,""]},loose:{a:["shoot","SHOOT"],b:["pass","PASS"],c:["slide","SLIDE"]}},wc=class{constructor(t,e){this.app=t,this.input=t.input;let n=this.root=Ns("div","touch hidden",e);this.zone=Ns("div","tc-zone",n),this.stick=Ns("div","tc-stick idle",n),this.knob=Ns("div","tc-knob",this.stick),this.btn={};for(let a of["c","b","a"])this.btn[a]=Ns("button",`tc-btn tc-${a}`,n),this.btn[a].dataset.k=a;this.pauseBtn=Ns("button","tc-pause",n,"<i></i><i></i>"),this.pauseBtn.setAttribute("aria-label","Pause"),Ns("div","tc-rotate",n,"Turn your phone sideways for a wider view"),this.ptrs=new Map,this.stickId=null,this.layout="attack",this.visible=!1,this.applyLayout();let i=a=>this.onDown(a),r=a=>this.onMove(a),o=a=>this.onUp(a);n.addEventListener("pointerdown",i),n.addEventListener("pointermove",r),n.addEventListener("pointerup",o),n.addEventListener("pointercancel",o),n.addEventListener("lostpointercapture",o),n.addEventListener("contextmenu",a=>a.preventDefault()),this.input.onReleaseAll=()=>this.reset()}setVisible(t){t!==this.visible&&(this.visible=t,this.root.classList.toggle("hidden",!t),t||this.reset())}reset(){for(let[,e]of this.ptrs)e.kind==="btn"&&this.btn[e.k].classList.remove("down");for(let[,e]of this.ptrs)e.kind==="btn"&&e.type&&this.input.touchAction(e.type,!1);this.ptrs.clear(),this.stickId=null;let t=this.input.touch;t.active=!1,t.f=0,t.r=0,t.sprint=!1,this.stick.classList.add("idle"),this.stick.classList.remove("sprint"),this.stick.style.left="",this.stick.style.top="",this.knob.style.transform=""}update(t){let e=t.match,n=t.human;if(!n)return;let i=e.ball,r=i.owner,o="loose";r===n||e.phase==="restart"&&e.restart&&e.restart.taker===n?o="attack":r&&r.team!==n.team?o="defend":r&&(o="call"),o==="defend"?this.defendUntil=e.time+.8:o!=="attack"&&e.time<(this.defendUntil||0)&&(o="defend"),o!==this.layout&&(this.layout=o,this.applyLayout()),o==="defend"&&this.btn.a.classList.toggle("cool",e.time<n.tackleReadyAt)}applyLayout(){let t=d1[this.layout];for(let e of["a","b","c"]){let[n,i]=t[e],r=this.btn[e];r.textContent=i,r.dataset.type=n||"",r.classList.toggle("off",!n),r.classList.remove("cool")}}radius(){return Math.max(46,Math.min(72,Math.min(innerWidth,innerHeight)*.14))}onDown(t){if(t.pointerType==="mouse")return;t.preventDefault();let e=t.target;try{e.setPointerCapture(t.pointerId)}catch{}if(e===this.pauseBtn){this.ptrs.set(t.pointerId,{kind:"pause"});return}let n=e.classList.contains("tc-btn")?e.dataset.k:null;if(n){let i=this.btn[n].dataset.type;if(!i)return;this.ptrs.set(t.pointerId,{kind:"btn",k:n,type:i,x:t.clientX,y:t.clientY}),this.btn[n].classList.add("down"),this.input.touchAction(i,!0);return}if(t.clientX<innerWidth*.42&&this.stickId==null){this.stickId=t.pointerId;let i={kind:"stick",ox:t.clientX,oy:t.clientY};this.ptrs.set(t.pointerId,i),this.stick.classList.remove("idle"),this.placeStick(i),this.moveStick(i,t.clientX,t.clientY)}else this.ptrs.set(t.pointerId,{kind:"look",x:t.clientX,y:t.clientY})}onMove(t){let e=this.ptrs.get(t.pointerId);if(e){if(t.preventDefault(),e.kind==="stick")this.moveStick(e,t.clientX,t.clientY);else if(e.kind==="look"||e.kind==="btn"&&(e.type==="shoot"||e.type==="pass")){let n=e.kind==="look"?1.35:.9;this.input.touchLook((t.clientX-e.x)*n,(t.clientY-e.y)*n),e.x=t.clientX,e.y=t.clientY}}}onUp(t){let e=this.ptrs.get(t.pointerId);if(e){if(this.ptrs.delete(t.pointerId),e.kind==="pause"){t.type==="pointerup"&&this.app.pause();return}if(e.kind==="btn"){this.btn[e.k].classList.remove("down"),this.input.touchAction(e.type,!1);return}if(e.kind==="stick"){this.stickId=null;let n=this.input.touch;n.active=!1,n.f=0,n.r=0,n.sprint=!1,this.stick.classList.add("idle"),this.stick.classList.remove("sprint"),this.stick.style.left="",this.stick.style.top="",this.knob.style.transform=""}}}placeStick(t){this.stick.style.left=`${t.ox}px`,this.stick.style.top=`${t.oy}px`}moveStick(t,e,n){let i=this.radius(),r=e-t.ox,o=n-t.oy,a=Math.hypot(r,o),l=i*1.25;a>l&&(t.ox+=r/a*(a-l),t.oy+=o/a*(a-l),r=e-t.ox,o=n-t.oy,a=l,this.placeStick(t));let c=Math.min(1,a/i),h=.12,u=c<h?0:(c-h)/(1-h),d=this.input.touch;d.active=!0,d.f=a>0?-o/a*u:0,d.r=a>0?r/a*u:0,d.sprint=a/i>.92,this.stick.classList.toggle("sprint",d.sprint);let m=Math.min(a,i)/(a||1);this.knob.style.transform=`translate(${r*m}px, ${o*m}px)`}};var Tc=class{constructor(){this.handlers=new Map,this.log=[],this.nextId=1,this.maxLog=4e3}on(t,e){return this.handlers.has(t)||this.handlers.set(t,[]),this.handlers.get(t).push(e),()=>{let n=this.handlers.get(t),i=n.indexOf(e);i>=0&&n.splice(i,1)}}emit(t,e){let n=Object.assign({id:this.nextId++,type:t},e);this.log.push(n),this.log.length>this.maxLog&&this.log.splice(0,this.log.length-this.maxLog);let i=this.handlers.get(t);if(i)for(let o=0;o<i.length;o++)i[o](n);let r=this.handlers.get("*");if(r)for(let o=0;o<r.length;o++)r[o](n);return n}};var yi=class{constructor(t=1){this.s=t>>>0||1}next(){let t=(this.s+=1831565813)>>>0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return Math.floor(this.range(t,e+1))}chance(t){return this.next()<t}pick(t){return t[Math.floor(this.next()*t.length)%t.length]}gauss(){return(this.next()+this.next()+this.next()+this.next()-2)*1.732}};function vi(s){let t=2166136261;for(let e=0;e<s.length;e++)t^=s.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function cm(s,t,e){let n=Math.abs(s);return n>Z.HL&&Math.abs(e)<ft.HW+.05&&t<ft.H+.05&&n<$l(t)+.05}function f1(s,t,e){let n=t.pos.x,i=t.pos.z,r=e.pos.x,o=e.pos.z;if(cm(r,e.pos.y,o)!==cm(n,.5,i))return!1;for(let a of s.players){if(a===t)continue;let l=ti(a.pos.x,a.pos.z,n,i,r,o);if(l.t>.2&&l.t<.85&&l.d<.24)return!1}return!0}function p1(s,t,e){let n=s.time;if(n<t.noCaptureUntil||n<t.downUntil)return!1;let i=t.action;if(i&&(i.type==="slide"||i.type==="dive"||i.type==="tackle"||i.type==="kick"&&!i.contacted)||t.isGK&&s.keeperHandles(t,e))return!1;let r=e.pos.x-t.pos.x,o=e.pos.z-t.pos.z,a=Math.sqrt(r*r+o*o),l=be.CONTROL_RADIUS*(t.isHuman?s.assist.claim:1);if(a>l||e.pos.y>be.CONTROL_HEIGHT)return!1;let c=-(r*(e.vel.x-t.vel.x)+o*(e.vel.z-t.vel.z))/(a||1);if(a>.72&&c>.6)return!1;let h=e.vel.x-t.vel.x,u=e.vel.z-t.vel.z,d=e.vel.y,m=Math.sqrt(h*h+u*u+d*d),g=(e.pos.y>.35?10.5:14.5)+t.attrs.control*.08+(t.isHuman?(s.assist.claim-1)*16:0);if(m>g||a>l*(1-ht((m-6)/14,0,.45)))return!1;let x=e.lastKick;if(x&&x.player!==t&&x.target!==t&&m>4){let p=x.player&&x.player.isHuman&&s.isOpp(t)?s.assist.oppHumanPassReact:.16;if(s.time-x.t<p)return!1}let f=e.owner;if(f){if(f.team===t.team)return!1;let p=f.pos.distXZ(e.pos),y=be.PROTECT_RADIUS+(f.isHuman?.5*s.assist.stick:0);if(p<=y||a>=p-.05)return!1}return f1(s,t,e)}function hm(s,t){let e=s.ball;if(e.state==="held"||e.state==="dead")return;let n=s.time,i=e.owner;i&&(i.pos.distXZ(e.pos)>be.LOSE_RADIUS||e.pos.y>1.7||n<i.downUntil||i.action&&i.action.type==="slide")&&s.loseControl("loose");let r=null,o=1e9;for(let a of s.players){if(a===e.owner||!p1(s,a,e))continue;let l=a.pos.distXZ(e.pos);(l<o-1e-6||Math.abs(l-o)<=1e-6&&r&&a.id<r.id)&&(r=a,o=l)}r&&(m1(s,r),s.gainControl(r)),e.owner&&e.state==="controlled"&&g1(s,e.owner,t)}function m1(s,t){let e=s.ball,n=e.vel.x-t.vel.x,i=e.vel.z-t.vel.z,r=Math.sqrt(n*n+i*i+e.vel.y*e.vel.y),o=t.attrs.control/100,a=ht((r-4)/15,0,1)*(1.15-o*.7);if(t.isHuman)a*=s.assist.touch;else if(s.isOpp(t)){let S=s.aiParams[t.team].touch;a=Math.min(1.2,a*S+.04*(S-1))}let l=Math.hypot(t.desired.x,t.desired.z),c,h;l>1?(c=t.desired.x/l,h=t.desired.z/l):(c=Math.sin(t.yaw),h=Math.cos(t.yaw));let u=.7+a*3+(t.sprint&&l>1?1.2:0);t.isHuman&&(u*=1-.45*s.assist.stick);let d=s.rng.gauss()*a*.45,m=Math.cos(d),g=Math.sin(d),x=c*m+h*g,f=-c*g+h*m,p=l>1?.95:.6,y=t.vel.x*p+x*u,_=t.vel.z*p+f*u,b=0;e.pos.y>.2&&(b=Math.min(0,e.vel.y)*.15-.4),e.setVelocity(new ot(y,b,_)),e.sideSpin=0;let M=(e.pos.x-t.pos.x)*Math.cos(t.yaw)-(e.pos.z-t.pos.z)*Math.sin(t.yaw);t.touch={foot:M>0?"L":"R",time:s.time,x:e.pos.x,y:e.pos.y,z:e.pos.z,kind:"receive"},t.lastDribbleTouch=s.time,s.events.emit("touch",{player:t,kind:"receive",strength:r,t:s.time})}function g1(s,t,e){let n=t.action;if(n&&(n.type==="kick"&&!n.charging||n.type==="tackle"||n.type==="slide"))return;let i=!!(n&&n.type==="kick"&&n.charging);if(t.isHuman&&s.assist.stick>0){x1(s,t,e,i);return}let r=s.ball,o=s.time;if(o-(t.lastDribbleTouch||0)<.14||r.pos.y>.45)return;let a=r.pos.x-t.pos.x,l=r.pos.z-t.pos.z;if(Math.hypot(a,l)>1.12)return;let h=Math.hypot(t.desired.x,t.desired.z),u=t.speed,d=r.vel.x,m=r.vel.z,g=Math.hypot(d,m),x=h>=.5,f=x?t.desired.x/h:Math.sin(t.yaw),p=x?t.desired.z/h:Math.cos(t.yaw),y=x?Math.min(h,t.maxSpeed(t.sprint,!0)):0,_=t.sprint&&y>t.jogSpeed()*1.02,b=.45+y*.07+(_?y*.17:0);i&&(b=.4+y*.05);let M=g>1&&x?Math.abs(os(Bt(d,m),Bt(f,p))):0,S=(d-t.vel.x)*f+(m-t.vel.z)*p,T=a*f+l*p,v=x&&(M>.6&&g>1.5||T>b*1.1&&S>1.2),A=null;if(u>1.3&&!v){let Yt=Rr(u),oe=Cr(Yt),kt=oe+(1-oe)*.55;for(let[he,Ce]of[["L",0],["R",.5]]){let je=((t.prevGait-Ce)%1+1)%1,Te=((t.gait-Ce)%1+1)%1;(je<kt&&Te>=kt||Te<je&&(je<kt||Te>=kt))&&(A=he)}if(!A)return}else{if(!v&&o-(t.lastDribbleTouch||0)<.28)return;A=a*Math.cos(t.yaw)-l*Math.sin(t.yaw)>0?"L":"R"}if(!x){(Math.hypot(d-t.vel.x,m-t.vel.z)>.8||g>1.2)&&(r.setVelocity(new ot(t.vel.x*.45,0,t.vel.z*.45)),Wu(s,t,A,"stop",1));return}if(T<-.35&&u>2.5)return;let R=.26,P=a+(d-t.vel.x)*R,N=l+(m-t.vel.z)*R,z=P*f+N*p,k=Math.abs(P*p-N*f);if(!(v||z<b*.6||k>.3||M>.35||g<y*.75&&z<b))return;let $=_?1:.8,Y=a*p-l*f,st=t.vel.x*f+t.vel.z*p,K=st<y?(y-st)**2/26:0,tt=Math.max(0,b-T-K),q=y;for(let Yt=0;Yt<2;Yt++){let oe=.6+.014*q*q;q=y+Math.sqrt(2*oe*tt)}T>b&&(q=y-Math.min(1.5,(T-b)*1.5)),q=ht(q,y*.6,y+3);let mt=-Y/$,wt=f*q+p*mt,at=p*q-f*mt,nt=Math.hypot(wt,at)||.01,zt=wt/nt,V=at/nt;if(g>2.5){let Yt=_?.9:1.4,oe=Bt(d,m),kt=Bt(zt,V),he=os(oe,kt);if(Math.abs(he)>Yt){let Ce=oe+Math.sign(he)*Yt;zt=Math.sin(Ce),V=Math.cos(Ce),nt=Math.min(nt,y*.8+1)}}let J=t.attrs.control,ut=(100-J)*45e-5*(1+u/6);t.isHuman?ut*=s.assist.touch:s.isOpp(t)&&(ut*=s.aiParams[t.team].touch);let Rt=s.rng.gauss()*ut,ct=Math.cos(Rt),Ft=Math.sin(Rt),xe=zt*ct+V*Ft,qt=-zt*Ft+V*ct;nt*=1+s.rng.gauss()*(100-J)*.0012,r.setVelocity(new ot(xe*nt,0,qt*nt)),Wu(s,t,A,"dribble",nt)}function x1(s,t,e,n){let i=s.ball,r=s.time;if(i.pos.y>.9)return;let o=s.assist.stick,a=t.faceYaw!=null?t.faceYaw:t.yaw,l=Math.sin(a),c=Math.cos(a),h=Math.hypot(t.desired.x,t.desired.z),u=l,d=c;if(h>.5){let N=t.desired.x/h,z=t.desired.z/h;if(N*l+z*c>-.3){u=N*.75+l*.25,d=z*.75+c*.25;let k=Math.hypot(u,d)||1;u/=k,d/=k}}let m=Math.hypot(t.vel.x,t.vel.z),g=n?.48+m*.03:.45+m*.035+(t.sprint?m*.02:0);g*=1+(1-o)*.5;let x=t.pos.x+u*g,f=t.pos.z+d*g,p=5+6*o,y=t.vel.x+(x-i.pos.x)*p,_=t.vel.z+(f-i.pos.z)*p,b=y-t.vel.x,M=_-t.vel.z,S=Math.hypot(b,M),T=3.5+3.5*o;S>T&&(y=t.vel.x+b/S*T,_=t.vel.z+M/S*T);let v=1-Math.exp(-(8+22*o)*e);if(i.vel.x+=(y-i.vel.x)*v,i.vel.z+=(_-i.vel.z)*v,i.sideSpin=0,r-(t.lastDribbleTouch||0)<.3)return;let A=i.pos.x-t.pos.x,R=i.pos.z-t.pos.z;if(Math.hypot(A,R)>1.1)return;let P=null;if(m>1.3){let N=Rr(m),z=Cr(N)+(1-Cr(N))*.55;for(let[k,F]of[["L",0],["R",.5]]){let $=((t.prevGait-F)%1+1)%1,Y=((t.gait-F)%1+1)%1;($<z&&Y>=z||Y<$&&($<z||Y>=z))&&(P=k)}if(!P||r-(t.lastDribbleTouch||0)<.42)return}else{if(Math.hypot(i.vel.x-t.vel.x,i.vel.z-t.vel.z)<.6||r-(t.lastDribbleTouch||0)<.45)return;P=A*Math.cos(t.yaw)-R*Math.sin(t.yaw)>0?"L":"R"}Wu(s,t,P,"dribble",Math.hypot(i.vel.x,i.vel.z))}function Wu(s,t,e,n,i){let r=s.ball;t.touch={foot:e,time:s.time,x:r.pos.x,y:r.pos.y,z:r.pos.z,kind:n},t.lastDribbleTouch=s.time,r.lastTouch=t,r.lastTouchTime=s.time,s.events.emit("touch",{player:t,kind:n,strength:i,t:s.time})}function um(s,t,e){let n=s.time;for(let i of s.players){if(i===t.owner||t.lastTouch===i&&n-i.lastKickAt<be.KICK_RELEASE_LOCK)continue;if(i.isGK&&s.keeperHandles(i,t)){if(s.keeperContact(i,t))return;continue}if(t.pos.y>1.9+pe||i.action&&i.action.type==="slide"&&i.action.sliding&&t.pos.y>.55)continue;let o=t.pos.x-i.pos.x,a=t.pos.z-i.pos.z,l=(t.pos.y<.95?.24:.2)+pe,c=o*o+a*a;if(c>=l*l||c<1e-8)continue;let h=Math.sqrt(c),u=o/h,d=a/h;t.pos.x=i.pos.x+u*l,t.pos.z=i.pos.z+d*l;let m=t.vel.x-i.vel.x,g=t.vel.z-i.vel.z,x=m*u+g*d;if(x<0){t.vel.x-=u*x*1.3,t.vel.z-=d*x*1.3,t.vel.y*=.7,t.version++;let f=t.owner&&t.owner.isHuman?2.5+3*s.assist.stick:2.5;t.owner&&t.owner.team!==i.team&&-x>f&&s.loseControl("blocked"),-x>.8&&(t.lastTouch=i,t.lastTouchTime=n,s.events.emit("deflect",{player:i,speed:-x,t:n}))}}}var Po={"2-3-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.6,v:.36},{role:"DEF",u:-.6,v:-.36},{role:"W",u:.04,v:.68},{role:"CM",u:-.22,v:0},{role:"W",u:.04,v:-.68},{role:"ST",u:.36,v:0}],"2-2-1-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.6,v:.38},{role:"DEF",u:-.6,v:-.38},{role:"CM",u:-.24,v:.34},{role:"CM",u:-.24,v:-.34},{role:"AM",u:.1,v:0},{role:"ST",u:.4,v:0}],"3-2-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.58,v:.5},{role:"DEF",u:-.66,v:0},{role:"DEF",u:-.58,v:-.5},{role:"CM",u:-.14,v:.33},{role:"CM",u:-.14,v:-.33},{role:"ST",u:.38,v:0}],"2-1-2-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.6,v:.36},{role:"DEF",u:-.6,v:-.36},{role:"CM",u:-.3,v:0},{role:"AM",u:.08,v:.42},{role:"AM",u:.08,v:-.42},{role:"ST",u:.4,v:0}]},Dr={possession:{formation:"2-2-1-1",passShort:.25,cross:.05,press:0,line:0,width:1,dribble:0,tempo:.9,label:"Patient possession"},direct:{formation:"3-2-1",passShort:-.2,cross:.1,press:-.05,line:-.04,width:.95,dribble:.05,tempo:1.1,label:"Direct football"},wing:{formation:"2-3-1",passShort:0,cross:.3,press:0,line:0,width:1.15,dribble:.12,tempo:1,label:"Wing play"},pressing:{formation:"2-3-1",passShort:.1,cross:.05,press:.25,line:.08,width:1,dribble:.05,tempo:1.15,label:"High pressing"},counter:{formation:"3-2-1",passShort:-.1,cross:.05,press:-.15,line:-.1,width:.9,dribble:.15,tempo:1.05,label:"Counter attack"}};function Ec(s,t){let e=(Dr[s]||Dr.wing).formation;return!t||Po[e].some(n=>n.role===t)?e:t==="AM"?"2-2-1-1":"2-3-1"}var dm={GK:[-1,-.7],DEF:[-.9,.3],CM:[-.75,.6],AM:[-.5,.82],W:[-.6,.86],ST:[-.3,.9]};var Ht=new ot,Xu=new ot,$u=new ot;function qu(s,t){let e=s.teams[t],n=ht((e.tier||1)-1,0,4),i=s.human&&s.human.team===t,r=s.human&&!i,o=s.assist,a=e.style||{press:0};return{reaction:[.4,.34,.29,.25,.21][n]*(r?o.oppReact:1),think:[.3,.26,.22,.19,.16][n],noise:Math.max(.02,[.2,.15,.11,.08,.06][n]+(r?o.oppNoise:0)),aggro:[.34,.4,.48,.56,.64][n]*(r?o.oppAggro:1),pressRange:[11,12.5,14,16,18][n]*(1+(a.press||0))*(r?.5+.5*o.oppAggro:1),tackleBonus:[-.06,-.03,0,.02,.04][n],humanBonus:i?[.42,.36,.3,.24,.2][n]:0,holdMin:[.55,.45,.38,.3,.26][n],gkReaction:[.34,.3,.27,.24,.21][n]*(r?1+(o.oppReact-1)*.5:1),gkHold:[1.9,1.7,1.5,1.35,1.2][n],slideChance:[.04,.05,.05,.06,.06][n]*(r?o.oppAggro:1),shootBias:[0,.02,.04,.05,.06][n],passErr:r?1+(o.oppPassError-1)*(1-.1*n):1,shotErr:r?1+(o.oppShotError-1)*(1-.1*n):1,touch:r?1+(o.oppTouch-1)*(1-.1*n):1,mistake:r?o.oppMistake*(1-.1*n):0}}var Ac=class{constructor(){this.phase="loose",this.winner=null,this.chaser=null,this.chaseT=99,this.chasePoint=new ot,this.presser=null,this.cover=null,this.supporters=[],this.runner=null,this.marks=new Map,this.lastDefU=.5,this.deepestOppU=-.5}},Rc=class{constructor(t){this.m=t,this.ts=[new Ac,new Ac],this.nextTeamThink=0,this.intercepts=new Map}params(t){return this.m.aiParams[t]}update(t){let e=this.m;e.time>=this.nextTeamThink&&(this.nextTeamThink=e.time+.1,e.phase==="playing"&&(this.computeIntercepts(),this.teamThink(0),this.teamThink(1)));for(let n of e.players)if(!(n.isHuman||n.scripted)){if(n.sprint=!1,n.isGK){e.phase==="playing"||e.ball.state==="held"&&e.ball.owner===n?em(e,n,t,this.params(n.team)):this.nonPlayingMove(n);continue}e.phase==="playing"?this.playing(n,t):this.nonPlayingMove(n)}}computeIntercepts(){let t=this.m,e=t.ball,n=t.traj;if(this.intercepts.clear(),e.owner||e.state==="held"||e.state==="dead")return;let i=t.time-n.t0;for(let r of t.players){r.isGK||r.isHuman;let o=null,a=r.isHuman?.1:this.params(r.team).reaction*.5,l=r.action&&(r.action.type==="slide"||r.action.type==="dive")||t.time<r.downUntil?.6:0;for(let c=0;c<=3.2;c+=.08){if(n.at(c+i,Ht),Ht.y>1.6)continue;if(Math.max(0,Math.hypot(Ht.x-r.pos.x,Ht.z-r.pos.z)-.7)/r.sprintSpeed()+a+l<=c){o={t:c,x:Ht.x,z:Ht.z};break}}o||(n.at(3.2+i,Ht),o={t:3.2+Math.hypot(Ht.x-r.pos.x,Ht.z-r.pos.z)/r.sprintSpeed(),x:Ht.x,z:Ht.z}),this.intercepts.set(r,o)}}teamThink(t){let e=this.m,n=e.ball,i=this.ts[t],r=e.teams[t].players,o=e.teams[1-t].players,a=n.owner;if(!r.length)return;a&&n.state!=="held"||n.state==="held"&&a?i.phase=a.team===t?"attack":"defend":i.phase="loose";let l=-1,c=1;for(let h of o){if(h.isGK)continue;let u=e.uOf(t,h.pos.x);u>l&&(l=u),u<c&&(c=u)}if(i.lastDefU=l,i.deepestOppU=c,i.chaser=null,i.chaseT=99,i.phase==="loose"&&this.intercepts.size){let h=null,u=99,d=99,m=99;for(let x of e.players){let f=this.intercepts.get(x);if(!f)continue;if(x.team!==t){!x.isGK&&f.t<m&&(m=f.t);continue}if(x.isHuman){d=f.t;continue}if(x.isGK)continue;let p=f.t;e.passIntent&&e.passIntent.target===x&&(p-=.6),p<u&&(u=p,h=x)}if(h&&!(d<u-.45)){i.chaser=h,i.chaseT=u;let x=this.intercepts.get(h);i.chasePoint.set(x.x,0,x.z)}let g=Math.min(u,d);i.winner=g<m-.15?t:m<g-.15?1-t:null}if(i.presser=null,i.cover=null,i.phase==="defend"&&a){let h=this.params(t),u=e.ownGoalX(t),d=null,m=1e9,g=null,x=1e9;for(let p of r){if(p.isGK||p.isHuman)continue;let y=p.pos.distXZ(a.pos);e.toWorld(t,p.home.u,p.home.v,Ht);let _=Ht.distXZ(a.pos),b=(p.pos.x-a.pos.x)*Math.sign(u-a.pos.x)>-1?0:3,M=y+Math.max(0,_-h.pressRange)*.9+b;M<m?(g=d,x=m,d=p,m=M):M<x&&(g=p,x=M)}let f=e.human;f&&f.team===t&&f.pos.distXZ(a.pos)<3&&d?i.cover=d:(i.presser=d,i.cover=g)}if(i.supporters=[],i.phase==="attack"&&a&&a.team===t&&!a.isGK){let h=r.filter(g=>g!==a&&!g.isGK&&!g.isHuman).sort((g,x)=>g.pos.distXZ(a.pos)-x.pos.distXZ(a.pos)),u=[];for(let g of h.slice(0,2)){let x=this.supportSpot(g,a,u);x&&(u.push(x),i.supporters.push(g),g.ai.support=x)}let d=e.time;i.runner&&i.runner.ai.run&&i.runner.ai.run.until<d&&(i.runner=null);let m=e.uOf(t,a.pos.x);if(!i.runner&&m>-.45&&d>(i.nextRun||0)){let g=null,x=-2;for(let f of r){if(f===a||f.isHuman||f.isGK||!["ST","W","AM"].includes(f.role)||i.supporters.includes(f))continue;let p=e.uOf(t,f.pos.x);p>x&&(x=p,g=f)}if(g){let f=Math.min(.88,Math.max(l+.1,e.uOf(t,g.pos.x)+.2)),p=e.vOf(t,g.pos.z)*.6;e.toWorld(t,f,p,Xu);let y=99;for(let _ of o)y=Math.min(y,_.pos.distXZ(Xu));y>3.5&&(g.ai.run={until:d+2.8,target:Xu.clone()},i.runner=g,i.nextRun=d+4.5)}}}else i.runner=null;if(i.marks.clear(),i.phase==="defend"||i.phase==="loose"&&i.winner===1-t){let h=o.filter(g=>!g.isGK&&g!==a).sort((g,x)=>e.uOf(t,g.pos.x)-e.uOf(t,x.pos.x)),u=r.filter(g=>!g.isGK&&!g.isHuman&&g!==i.presser&&g!==i.cover&&g!==i.chaser),d=["DEF","CM","AM","W","ST"];u.sort((g,x)=>d.indexOf(g.role)-d.indexOf(x.role));let m=new Set;for(let g of u){this.shapeTarget(g,Ht);let x=null,f=13;for(let p of h){if(m.has(p)||e.uOf(t,p.pos.x)>.35&&g.role==="DEF")continue;let y=p.pos.distXZ(Ht);y<f&&(f=y,x=p)}x&&(m.add(x),i.marks.set(g,x))}}}supportSpot(t,e,n){let i=this.m,r=t.team,o=i.attackDir(r),a=null,l=-1e9;this.shapeTarget(t,$u);let c=t.role==="ST"||t.role==="W"||t.role==="AM";for(let h of[-140,-100,-65,-35,0,35,65,100,140]){let u=h*Math.PI/180;for(let d of[8,12,16]){let m=e.pos.x+Math.cos(u)*d*o,g=e.pos.z+Math.sin(u)*d;if(Math.abs(m)>Z.HL-2||Math.abs(g)>Z.HW-1.5)continue;let x=mi(i,e.pos.x,e.pos.z,m,g,r,12),f=99;for(let M of i.players)M.team!==r&&(f=Math.min(f,Math.hypot(M.pos.x-m,M.pos.z-g)));let p=0;for(let M of i.teams[r].players){if(M===t||M===e)continue;let S=Math.hypot(M.pos.x-m,M.pos.z-g);S<6&&(p+=(6-S)/6)}for(let M of n){let S=Math.hypot(M.x-m,M.z-g);S<7&&(p+=(7-S)/5)}let y=(m-e.pos.x)*o/d,_=Math.hypot($u.x-m,$u.z-g),b=x*1+Math.min(f,8)/8*.8+y*(c?.45:.25)-_*.035-p*.6-t.pos.distXZ(Ht.set(m,0,g))*.015;b>l&&(l=b,a={x:m,z:g})}}return a?new ot(a.x,0,a.z):null}shapeTarget(t,e){let n=this.m,i=n.teams[t.team],r=i.style,o=n.ball,a=this.ts[t.team],l=n.uOf(t.team,o.pos.x),c=n.vOf(t.team,o.pos.z),h=a.phase==="attack"||a.phase==="loose"&&a.winner===t.team,u=t.home.u+l*.42+(r.line||0),d=t.home.v;h?u+=t.role==="DEF"?.12:.2:u-=.06,d=d*(h?1.12*(r.width||1):.8)+c*(h?.2:.35);let m=dm[t.role]||[-.9,.9];return u=ht(u,m[0],m[1]),!h&&(t.role==="DEF"||t.role==="CM")&&(u=Math.min(u,l-(t.role==="DEF"?.1:.02))),t.role==="DEF"&&(u=Math.min(u,a.deepestOppU-.03,h?.3:.1)),u=ht(u,-.92,.92),d=ht(d,-.92,.92),n.toWorld(t.team,u,d,e)}playing(t,e){let n=this.m,i=n.ball,r=n.time,o=this.ts[t.team],a=this.params(t.team),l=t.ai;if(t.faceYaw=null,r<t.downUntil){t.desired.set(0,0,0);return}if(t.action&&(t.action.type==="slide"||t.action.type==="dive"))return;if(i.owner===t){this.carrier(t,e);return}let c=n.passIntent;if(c&&c.target===t&&!i.owner&&r-c.t<4){let d=this.intercepts.get(t),m=d&&d.t<3?Ht.set(d.x,0,d.z):Ht.set(c.point?c.point.x:i.pos.x,0,c.point?c.point.z:i.pos.z);this.moveTo(t,m,!0,.2),t.pos.distXZ(m)<1.2&&(t.faceYaw=Bt(i.pos.x-t.pos.x,i.pos.z-t.pos.z)),l.state="receive";return}if(o.phase==="loose"){if(o.chaser===t){l.state="chase",this.moveTo(t,o.chasePoint,!0,.05),t.faceYaw=t.pos.distXZ(o.chasePoint)<1.5?Bt(i.pos.x-t.pos.x,i.pos.z-t.pos.z):null;return}l.state="shape",this.shapeTarget(t,Ht),this.moveTo(t,Ht,!1,.6),this.faceBallIfClose(t,Ht);return}if(o.phase==="attack"){if(l.run&&l.run.until>r&&o.runner===t){l.state="run",this.moveTo(t,l.run.target,!0,.3);return}if(o.supporters.includes(t)&&l.support){l.state="support",this.moveTo(t,l.support,l.support.distXZ(t.pos)>10,.6),this.faceBallIfClose(t,l.support);return}l.state="shape",this.shapeTarget(t,Ht),this.moveTo(t,Ht,t.pos.distXZ(Ht)>14,.8),this.faceBallIfClose(t,Ht);return}let h=i.owner;if(o.presser===t&&h){this.press(t,h,e,a);return}if(o.cover===t&&h){l.state="cover";let m=n.ownGoalX(t.team)-h.pos.x,g=-h.pos.z,x=Math.hypot(m,g)||1;Ht.set(h.pos.x+m/x*5,0,h.pos.z+g/x*5),this.moveTo(t,Ht,t.pos.distXZ(Ht)>6,.5),t.faceYaw=Bt(h.pos.x-t.pos.x,h.pos.z-t.pos.z);return}let u=o.marks.get(t);if(u){l.state="mark";let m=n.ownGoalX(t.team)-u.pos.x,g=-u.pos.z,x=Math.hypot(m,g)||1,f=i.pos.x-u.pos.x,p=i.pos.z-u.pos.z,y=Math.hypot(f,p)||1;Ht.set(u.pos.x+m/x*1.6+f/y*.9,0,u.pos.z+g/x*1.6+p/y*.9),this.moveTo(t,Ht,t.pos.distXZ(Ht)>5,.35),t.faceYaw=Bt(i.pos.x-t.pos.x,i.pos.z-t.pos.z);return}l.state="shape",this.shapeTarget(t,Ht),this.moveTo(t,Ht,t.pos.distXZ(Ht)>10,.7),this.faceBallIfClose(t,Ht)}press(t,e,n,i){let r=this.m,o=r.ball,a=r.time,l=t.ai;l.state="press";let c=r.ownGoalX(t.team),h=c-e.pos.x,u=-e.pos.z,d=Math.hypot(h,u)||1,m=t.pos.distXZ(e.pos),g=1.3,x=o.pos.x+o.vel.x*.2,f=o.pos.z+o.vel.z*.2,p=c-x,y=-f,_=Math.hypot(p,y)||1;if(Ht.set(x+p/_*g,0,f+y/_*g),this.moveTo(t,Ht,m>5,0,!0),t.faceYaw=Bt(o.pos.x-t.pos.x,o.pos.z-t.pos.z),a<(l.nextChallenge||0)||!ls(r,t)||(l.nextChallenge=a+i.think*(.8+r.rng.next()*.5),r.phase!=="playing"||a-(r.lastRestartAt||-10)<.8))return;let b=o.pos.distXZ(t.pos);if(b<1.45&&o.pos.y<.5){let M=o.pos.x-e.pos.x,S=o.pos.z-e.pos.z,T=t.pos.x-o.pos.x,v=t.pos.z-o.pos.z,A=(M*T+S*v)/((Math.hypot(M,S)||1)*(Math.hypot(T,v)||1));A>-.2&&r.rng.next()<i.aggro*(.7+A*.4)&&ec(r,t)}else if(b>1.7&&b<3&&e.speed>3.5&&r.rng.next()<i.slideChance){let M=e.vel.x/e.speed,S=e.vel.z/e.speed,T=(t.pos.x-e.pos.x)/m,v=(t.pos.z-e.pos.z)/m;M*T+S*v>-.1&&(t.yaw=Bt(o.pos.x+o.vel.x*.25-t.pos.x,o.pos.z+o.vel.z*.25-t.pos.z),t.vel.set(Math.sin(t.yaw)*t.speed,0,Math.cos(t.yaw)*t.speed),nc(r,t))}}carrier(t,e){let n=this.m,i=n.ball,r=n.time,o=t.ai,a=this.params(t.team),l=n.teams[t.team];if(t.action&&t.action.type==="kick")return;(o.ownedSince==null||o.ownerEpoch!==n.possEpoch)&&(o.ownerEpoch=n.possEpoch,o.ownedSince=r,o.nextDecision=r+a.reaction*(.8+n.rng.next()*.4),o.dribbleTarget=null,this.pickDribble(t,0));let c=n.attackDir(t.team),h=99,u=null;for(let A of n.opponents(t.team)){let R=A.pos.distXZ(t.pos);R<h&&(h=R,u=A)}let d=n.human;d&&d.team===t.team&&d.requestUntil>r&&d.ackedReq!==d.requestUntil&&(t.ackUntil=r+1.2,d.ackedReq=d.requestUntil,n.events.emit("ack",{player:t,to:d,t:r}));let m=h<1.6&&r-o.ownedSince>.2;if(i.pos.distXZ(t.pos)<1.3&&(r>=o.nextDecision||m&&r>=(o.urgentAt||0))&&(o.nextDecision=r+a.think*(.8+n.rng.next()*.45)*(2-(l.style.tempo||1)),m&&(o.urgentAt=r+.25),(r-o.ownedSince>=a.holdMin||m)&&this.decide(t,h,u)))return;(!o.dribbleTarget||r>o.dribbleUntil)&&this.pickDribble(t,h);let x=o.dribbleTarget,f=x.x-t.pos.x,p=x.z-t.pos.z,y=Math.hypot(f,p)||1,_=i.pos.x+i.vel.x*.25-t.pos.x,b=i.pos.z+i.vel.z*.25-t.pos.z,M=Math.hypot(_,b),S=(_*f+b*p)/y,T=o.dribbleSprint&&t.stamina>.25;(M>1.25||S<-.1)&&(f=_,p=b,y=M||1,T=M>2.2&&t.stamina>.15);let v=t.maxSpeed(T,!0)*(y<1?.6:1);t.desired.set(f/y*v,0,p/y*v),t.sprint=T,this.addSeparation(t,.4)}pickDribble(t,e){let n=this.m,i=t.ai,r=n.time,o=n.attackDir(t.team),a=o*Z.HL,l=null,c=-1e9,h=0;for(let u of[-75,-45,-20,0,20,45,75,130,-130]){let d=u*Math.PI/180,m=Math.cos(d)*o,g=Math.sin(d),x=t.pos.x+m*6,f=t.pos.z+g*6;if(Math.abs(x)>Z.HL-1.5||Math.abs(f)>Z.HW-1.2)continue;let p=12;for(let _ of n.opponents(t.team)){let b=_.pos.x-t.pos.x,M=_.pos.z-t.pos.z,S=b*m+M*g,T=Math.abs(b*g-M*m);S>-.5&&T<2.5+S*.3&&(p=Math.min(p,Math.max(0,S)))}let y=p*.1+Math.cos(d)*.5;t.role==="W"&&Math.abs(t.pos.z)>10?y+=Math.abs(u)<25?.2:0:y+=-Math.abs(f)*.01+(Math.abs(x-a)<16?-Math.abs(f)*.03:0),y>c&&(c=y,l={x,z:f},h=p)}l||(l={x:t.pos.x-o*3,z:t.pos.z*.8}),i.dribbleTarget=new ot(l.x,0,l.z),i.dribbleUntil=r+.45,i.dribbleSprint=h>7&&n.uOf(t.team,t.pos.x)>-.3}decide(t,e,n){let i=this.m,r=i.ball,o=i.time,a=this.params(t.team),l=t.ai,c=i.teams[t.team],h=c.style,u=i.attackDir(t.team),d=u*Z.HL,m=i.uOf(t.team,t.pos.x),g=Math.abs(i.vOf(t.team,t.pos.z)),x=ht((3-e)/3,0,1),f=i.rng,p={kind:"dribble",s:.2+(h.dribble||0)+(t.role==="W"?.08:0)-x*.35},y=12;for(let M of i.opponents(t.team)){let S=(M.pos.x-t.pos.x)*u,T=M.pos.z-t.pos.z;S>0&&Math.abs(T)<S*.9+1.5&&(y=Math.min(y,Math.hypot(S,T)))}p.s+=Math.min(y,12)*.035,p.s+=f.gauss()*a.noise;let _=Math.hypot(d-t.pos.x,t.pos.z);if(_<27){let M=Du(t.pos.x,t.pos.z,u),S=0;for(let A of i.opponents(t.team)){if(A.isGK)continue;let R=ti(A.pos.x,A.pos.z,t.pos.x,t.pos.z,d,ht(t.pos.z*.2,-2,2));R.t>.05&&R.t<.95&&R.d<1+R.t*1.5&&S++}let v=ht(M/.5,0,1)*ht((28-_)/19,0,1)*Math.max(0,1-.32*S)*1.55+(_<12?.25:0)-.12+a.shootBias+f.gauss()*a.noise;v>p.s&&(p={kind:"shot",s:v})}let b=i.human;for(let M of i.teams[t.team].players){if(M===t||o<M.downUntil||M.isGK&&!(m<-.4&&x>.5))continue;Pr(t.pos,M,Ht,.75);let S=t.pos.distXZ(Ht);if(S<4||S>38)continue;let T=i.ownGoalX(t.team);if(!M.isGK&&Math.abs(Ht.x-T)<7&&Math.abs(Ht.z)<9||M.isGK&&Math.abs(t.pos.z)<6&&Math.abs(t.pos.x-T)<14)continue;let v=mi(i,t.pos.x,t.pos.z,Ht.x,Ht.z,t.team,12),A=10;for(let N of i.opponents(t.team))A=Math.min(A,N.pos.distXZ(Ht));let R=(Ht.x-t.pos.x)*u,P=.2+v*.55+A*.045+R*.028*(1-(h.passShort||0)*.6)-Math.abs(S-14)*.008*(1+(h.passShort||0));if(M.isHuman&&(P+=a.humanBonus,M.requestUntil>o&&(P+=v>.55?.7:-.2)),M===l.receivedFrom&&o-l.ownedSince<2.5&&x<.4&&(P-=.3),R<-4&&x<.3&&(P-=.12),!(v<.35)&&(P+=f.gauss()*a.noise,P>p.s&&(p={kind:"pass",s:P,target:M}),M.ai.run&&M.ai.run.until>o||M.isHuman&&M.speed>4&&M.vel.x*u>2)){let N=.45+v*.3+Math.max(0,R)*.02+(M.isHuman?a.humanBonus*.7:0)+f.gauss()*a.noise;N>p.s&&i.uOf(t.team,M.pos.x)>.1&&(p={kind:"through",s:N,target:M})}}if(m>.5&&g>.35){let M=null,S=-1;for(let T of i.teams[t.team].players){if(T===t||T.isGK||!fm(i,t.team,T.pos.x,T.pos.z))continue;let v=10;for(let A of i.opponents(t.team))v=Math.min(v,A.pos.distXZ(T.pos));v>S&&(S=v,M=T)}if(M){let T=.35+(h.cross||0)+S*.05+(m>.75?.15:0)+f.gauss()*a.noise;T>p.s&&(p={kind:"cross",s:T,target:M})}}switch(m<-.55&&x>.45&&p.s<.55&&(p={kind:"clear",s:.6}),p.kind){case"shot":{let M=i.keeper(1-t.team),S=Math.sign(t.pos.z)*-1||1;M&&(S=M.pos.z>0?-1:1),f.next()<.25&&(S=-S);let T=S*(ft.HW-.45-f.next()*.55),v=.25+f.next()*1.2;return ce(i,t,"shot",{point:new ot(d,v,T),power:.72+f.next()*.28,ai:!0}),!0}case"pass":return ce(i,t,"pass",{target:p.target,ai:!0}),p.target.ai.receivedFrom=t,!0;case"through":return ce(i,t,"through",{target:p.target,ai:!0}),!0;case"cross":{let M=p.target,S=new ot(M.pos.x+M.vel.x*.8,0,M.pos.z+M.vel.z*.8);return ce(i,t,"cross",{point:S,target:M,ai:!0}),!0}case"clear":{let M=new ot(u*10+t.pos.x*.2,0,Math.sign(t.pos.z||1)*14);return ce(i,t,"clear",{point:M,ai:!0}),!0}default:return this.pickDribble(t,e),!1}}restartTarget(t,e,n=!1,i=new ot){let r=this.m,o=t.team,a=r.attackDir(o),l=e.spot,c=e.team===o;if(t===e.taker)return i.copy(l).addScaled(new ot(-a,0,0),.7);if(t.isGK){let d=r.ownGoalX(o);return e.type==="penalty"&&!c?i.set(d+a*.1,0,0):i.set(d+a*(e.type==="kickoff"?1.2:1.5),0,0)}let h=t.home.u,u=t.home.v;switch(e.type){case"kickoff":{h=Math.min(h*.85-.05,-.05),r.toWorld(o,h,u,i),c&&t.role===(e.taker&&e.taker.role==="ST"?"AM":"CM")&&i.set(-a*3.5,0,1.8);let d=Math.hypot(i.x,i.z);if(!c&&d<Kt.CIRCLE_R+.6){let m=(Kt.CIRCLE_R+.8)/(d||1);i.x*=m,i.z*=m,Math.abs(i.x)<.5&&(i.x=-a*(Kt.CIRCLE_R+.8))}return i}case"penalty":{let d=l.x>0?1:-1,m=d*(Z.HL-Kt.PEN_D-1.8),g=r.players.indexOf(t);return i.set(m-d*(g%2)*2.5,0,(g%7-3)*3.2)}case"corner":{let d=l.x>0?1:-1;if(c){let f={ST:[2,.8],AM:[5.5,-1.5],W:[4,3.5],CM:[11,0],DEF:[22,4]}[t.role]||[8,0],p=Math.sign(l.z);return i.set(d*(Z.HL-f[0]),0,f[1]*-p+(t.side||0)*1.5),t.role==="DEF"&&t.home.v<0&&(i.z=-i.z),Ii(i,1)}let g={DEF:[1.8,1.2],CM:[4.5,-1.2],AM:[9,2],W:[6,4],ST:[14,0]}[t.role]||[5,0];return i.set(d*(Z.HL-g[0]),0,g[1]*(t.home.v>=0?1:-1)),Ii(i,1)}case"goalkick":{if(c)r.toWorld(o,Math.min(h,-.2)+.05,u*1.1,i);else{r.toWorld(o,Math.max(h,-.1)+.2,u,i);let d=l.x>0?Z.HL:-Z.HL;Math.abs(i.x-d)<Kt.PEN_D+1&&Math.abs(i.z)<Kt.PEN_HW+1&&(i.x=d-Math.sign(d)*(Kt.PEN_D+1.5))}return i}default:{if(this.shapeTarget(t,i),c)i.distXZ(l)>18&&(t.role==="CM"||t.role==="W"||t.role==="AM")&&i.lerp(l,.35);else if(e.type==="freekick"){let d=r.ownGoalX(o);if(Math.hypot(l.x-d,l.z)<26&&(t.role==="DEF"||t.role==="CM")&&t.home.v!==void 0){let g=d-l.x,x=-l.z,f=Math.hypot(g,x)||1,p=t.home.v>=0?1:-1;i.set(l.x+g/f*(be.RESTART_DIST+.3)-x/f*.38*p,0,l.z+x/f*(be.RESTART_DIST+.3)+g/f*.38*p)}}if(!c){let d=e.type==="throwin"?be.THROW_DIST:be.RESTART_DIST;if(i.distXZ(l)<d+.4){let g=i.x-l.x,x=i.z-l.z,f=Math.hypot(g,x)||1;i.set(l.x+g/f*(d+.6),0,l.z+x/f*(d+.6))}}return Ii(i,.8)}}}enforceDistances(t){let e=this.m;for(let n of e.players){if(n.team===t.team||n.isHuman)continue;let i=t.type==="throwin"?be.THROW_DIST:t.type==="kickoff"?Kt.CIRCLE_R:be.RESTART_DIST;if(n.pos.distXZ(t.spot)<i){let o=this.restartTarget(n,t);n.pos.copy(o),n.prevPos.copy(o),n.vel.set(0,0,0)}}}nonPlayingMove(t){let e=this.m,n=e.time;if(t.faceYaw=null,e.phase==="restart"&&e.restart){let i=e.restart;if(t===i.taker&&i.placed){t.desired.set(0,0,0);return}let r=this.restartTarget(t,i,!1,Ht);this.moveTo(t,r,t.pos.distXZ(r)>8,.25),t.pos.distXZ(r)<1&&(t.faceYaw=Bt(e.ball.pos.x-t.pos.x,e.ball.pos.z-t.pos.z));return}if(e.phase==="goal"){if(t.celebrate>n){let i=e.lastGoalTeam,r=e.attackDir(i)*(Z.HL-4),o=Math.sign(e.ball.pos.z||1)*(Z.HW-3);Ht.set(r,0,o),this.moveTo(t,Ht,!0,1.5);return}this.shapeTarget(t,Ht),Ht.x*=.5,this.moveTo(t,Ht,!1,1,!1,2.2);return}if(e.phase==="halftime"||e.phase==="fulltime"){t.desired.set(0,0,0);return}this.shapeTarget(t,Ht),this.moveTo(t,Ht,!1,1,!1,3)}takeRestart(t,e){let n=this.m,i=n.rng,r=n.attackDir(t.team),o=r*Z.HL;n.lastRestartAt=n.time;let a=(c,h=.45)=>{let u=null,d=-1e9;for(let m of n.teams[t.team].players){if(m===t||m.isGK)continue;let g=m.pos.distXZ(e.spot);if(g>c||g<3)continue;let x=mi(n,e.spot.x,e.spot.z,m.pos.x,m.pos.z,t.team,11);if(x<h)continue;let f=x+(m.pos.x-e.spot.x)*r*.02-g*.01+(m.isHuman?this.params(t.team).humanBonus+(m.requestUntil>n.time?.6:0):0)+i.next()*.2;f>d&&(d=f,u=m)}return u},l=(c,h)=>{t.yaw=Bt(c-t.pos.x,h-t.pos.z)};switch(e.type){case"kickoff":{let c=a(20,.2)||n.teams[t.team].players.find(h=>h!==t&&!h.isGK);l(c.pos.x,c.pos.z),ce(n,t,"pass",{target:c,restart:e,ai:!0});break}case"throwin":{let c=a(18,.35);if(c)l(c.pos.x,c.pos.z),ce(n,t,"throw",{target:c,restart:e,ai:!0});else{let h=new ot(e.spot.x+r*10,0,e.spot.z*.5);l(h.x,h.z),ce(n,t,"throw",{point:h,restart:e,ai:!0})}break}case"corner":{let c=[];for(let h of n.teams[t.team].players)h!==t&&!h.isGK&&fm(n,t.team,h.pos.x,h.pos.z)&&c.push(h);if(c.length&&i.next()<.75){let h=c[Math.floor(i.next()*c.length)],u=new ot(h.pos.x,0,h.pos.z);l(u.x,u.z),ce(n,t,"cross",{point:u,target:h,restart:e,ai:!0,elev:.45})}else{let h=a(14,.3)||c[0];if(h)l(h.pos.x,h.pos.z),ce(n,t,"pass",{target:h,restart:e,ai:!0});else{let u=new ot(o-r*7,0,0);l(u.x,u.z),ce(n,t,"cross",{point:u,restart:e,ai:!0})}}break}case"goalkick":{let c=a(22,.7);if(c&&i.next()<.6)l(c.pos.x,c.pos.z),ce(n,t,"pass",{target:c,restart:e,ai:!0});else{let h=null,u=-1;for(let m of n.teams[t.team].players){if(m===t||m.isGK)continue;let g=10;for(let f of n.opponents(t.team))g=Math.min(g,f.pos.distXZ(m.pos));let x=g+n.uOf(t.team,m.pos.x)*4+i.next();x>u&&(u=x,h=m)}let d=h?new ot(h.pos.x,0,h.pos.z):new ot(0,0,0);l(d.x,d.z),ce(n,t,"lob",{point:d,target:h,restart:e,ai:!0,elev:.5})}break}case"penalty":{let c=i.next()<.5?-1:1,h=new ot(o,.3+i.next()*.9,c*(1.2+i.next()*.9));l(h.x,h.z),ce(n,t,"shot",{point:h,power:.8+i.next()*.15,restart:e,ai:!0});break}default:{let c=Math.hypot(o-e.spot.x,e.spot.z);if(e.type==="freekick"&&c<24&&Du(e.spot.x,e.spot.z,r)>.22&&i.next()<.45){let h=i.next()<.5?-1:1,u=new ot(o,1.2+i.next()*.6,h*(1.4+i.next()*.9));l(u.x,u.z),ce(n,t,"shot",{point:u,power:.8+i.next()*.2,restart:e,ai:!0})}else{let h=a(26,.4)||a(35,.1);if(h)l(h.pos.x,h.pos.z),ce(n,t,"pass",{target:h,restart:e,ai:!0});else{let u=new ot(e.spot.x+r*20,0,e.spot.z*.5);l(u.x,u.z),ce(n,t,"lob",{point:u,restart:e,ai:!0})}}}}}moveTo(t,e,n,i=.5,r=!1,o=1/0){let a=e.x-t.pos.x,l=e.z-t.pos.z,c=Math.hypot(a,l),h=t.ai,u=this.m.time;if(u>(h.progressCheck||0)&&(c>2.5&&h.lastDist-c<.4&&t.speed<1&&(h.sidestepUntil=u+.7),h.lastDist=c,h.progressCheck=u+1.2),c<i){t.desired.set(0,0,0),r||this.addSeparation(t,1);return}let d=n&&(t.stamina>.2||this.ts[t.team].chaser===t),m=Math.min(t.maxSpeed(d,!1),o);c<3&&(m*=Math.max(.25,c/3));let g=a/c,x=l/c;if(h.sidestepUntil>u){let f=g;g=g*.5-x*.85,x=x*.5+f*.85}t.desired.set(g*m,0,x*m),t.sprint=d&&c>3,r||this.addSeparation(t,1)}addSeparation(t,e){let n=0,i=0,r=this.m.ball,o=t.pos.distXZ(r.pos)<2.5;for(let a of this.m.players){if(a===t)continue;let l=t.pos.x-a.pos.x,c=t.pos.z-a.pos.z,h=l*l+c*c;if(h>16||h<1e-6)continue;let u=Math.sqrt(h);if(u<1.4&&!o){let d=(1.4-u)/1.4*2.6;n+=l/u*d,i+=c/u*d}else if(a.team===t.team&&!o){let d=(4-u)/4*.9;n+=l/u*d,i+=c/u*d}}t.desired.x+=n*e,t.desired.z+=i*e}faceBallIfClose(t,e){if(t.pos.distXZ(e)<1.5){let n=this.m.ball.pos;t.faceYaw=Bt(n.x-t.pos.x,n.z-t.pos.z)}}};function fm(s,t,e,n){let i=s.attackDir(t)*Z.HL;return Math.sign(e)===Math.sign(i)&&Math.abs(e-i)<Kt.PEN_D&&Math.abs(n)<Kt.PEN_HW}var y1=new Set(["pass","through","cross","lob","gkthrow","gkkick"]);function pm(){return{touches:0,goals:0,ownGoals:0,assists:0,passAtt:0,passCmp:0,shots:0,shotsOn:0,tacklesWon:0,tackleAtt:0,interceptions:0,possLost:0,fouls:0,saves:0,keyPasses:0}}var Yu={ST:{goal:1.05,assist:.7,tackle:.22,intercept:.16,pass:.035,prog:.03,key:.2,shotOn:.1,shotOff:-.02,lost:-.07,foul:-.2,conceded:-.03,clean:.05},W:{goal:1,assist:.75,tackle:.24,intercept:.17,pass:.04,prog:.03,key:.22,shotOn:.09,shotOff:-.02,lost:-.08,foul:-.2,conceded:-.03,clean:.05},AM:{goal:1,assist:.8,tackle:.26,intercept:.18,pass:.045,prog:.035,key:.25,shotOn:.09,shotOff:-.02,lost:-.09,foul:-.2,conceded:-.04,clean:.08},CM:{goal:1,assist:.8,tackle:.33,intercept:.25,pass:.055,prog:.035,key:.22,shotOn:.08,shotOff:-.02,lost:-.1,foul:-.2,conceded:-.07,clean:.2},DEF:{goal:1.1,assist:.8,tackle:.4,intercept:.3,pass:.05,prog:.03,key:.2,shotOn:.08,shotOff:-.02,lost:-.14,foul:-.22,conceded:-.15,clean:.45},GK:{goal:1,assist:.6,tackle:.2,intercept:.15,pass:.02,prog:.01,key:.1,shotOn:.05,shotOff:0,lost:-.1,foul:-.3,conceded:-.3,clean:.6,save:.3}},v1={goals:"Goals",assists:"Assists",tackles:"Tackles won",interceptions:"Interceptions",passing:"Passing",keyPasses:"Chances created",shooting:"Shooting",lost:"Possession lost",fouls:"Fouls",defending:"Defending (goals conceded / clean sheet)",result:"Match result",involvement:"Involvement",positioning:"Positioning",decisions:"Poor decisions",saves:"Saves"},Cc=class{constructor(t){this.m=t,this.by=new Map,this.contrib=new Map;for(let n of t.players)this.by.set(n,pm()),this.contrib.set(n,[]);this.pendingPass=null,this.pendingTackle=null,this.pendingShot=null,this.lastCompleted=null,this.controller=null,this.looseFrom=null,this.pairCount=new Map,this.teamPossTime=[0,0],this.teamShots=[0,0],this.teamShotsOn=[0,0],this.posSamples=new Map,this.sampleT=0,this.longShots=new Map,this.finalised=!1,this.goalLog=[];let e=t.events;e.on("kick",n=>this.onKick(n)),e.on("possession",n=>this.onPossession(n)),e.on("release",n=>{(n.reason==="loose"||n.reason==="blocked")&&(this.looseFrom=n.player),this.controller=null}),e.on("tackle",n=>this.onTackle(n)),e.on("save",n=>this.onSave(n)),e.on("deflect",n=>this.onDeflect(n)),e.on("goal",n=>this.onGoal(n)),e.on("foul",n=>{this.s(n.player).fouls++,this.add(n.player,"fouls",this.w(n.player).foul),this.resolveAll("foul")}),e.on("out",n=>this.onOut(n)),e.on("restartSetup",()=>this.resolveAll("restart")),e.on("halftime",()=>this.resolveAll("half")),e.on("fulltime",()=>{this.resolveAll("full"),this.finalise()}),e.on("touch",n=>{n.kind})}s(t){let e=this.by.get(t);return e||(e=pm(),this.by.set(t,e),this.contrib.set(t,[])),e}w(t){return Yu[t.role]||Yu.CM}add(t,e,n){!t||!n||this.contrib.get(t)?.push({cat:e,v:n,t:this.m.time})}credit(t,e){t&&this.m.events.emit("credit",{player:t,kind:e,t:this.m.time})}update(t){let e=this.m;if(e.phase==="playing"&&(e.possTeam!=null&&(e.ball.owner||e.ball.state==="held")&&(this.teamPossTime[e.possTeam]+=t),this.pendingTackle&&e.time-this.pendingTackle.t>be.TACKLE_WINDOW&&(this.pendingTackle=null),this.sampleT+=t,this.sampleT>=1)){this.sampleT=0;for(let n of e.players){if(n.isGK)continue;let i=this.goodPosition(n),r=this.posSamples.get(n)||{good:0,n:0};r.n++,i&&r.good++,this.posSamples.set(n,r)}}}goodPosition(t){let e=this.m,n=e.ball,i=e.ownGoalX(t.team),r=e.uOf(t.team,t.pos.x),o=t.pos.distXZ(n.pos),a=e.possTeam===t.team;switch(t.role){case"DEF":return a?r<.35||o<14:Math.abs(t.pos.x-i)<=Math.abs(n.pos.x-i)+1||o<6;case"CM":return o<22&&r<.7;case"AM":return a?r>-.1||o<14:o<22;case"W":return a?Math.abs(t.pos.z)>7||r>.35||o<12:r>-.5;case"ST":return a?r>.15||o<12:r>-.35;default:return!0}}onKick(t){let e=t.player,n=this.s(e);n.touches++;let i=this.pendingPass;if(i&&(i.passer===e?this.pendingPass=null:t.team===i.team?this.completePass(i,e):this.failPass(i,null,t.team)),this.controller=null,this.looseFrom=null,y1.has(t.kind)&&(n.passAtt++,this.pendingPass={passer:e,team:e.team,kind:t.kind,t:t.t,fromX:t.pos.x,target:t.target,id:t.id}),t.kind==="shot"){n.shots++,this.teamShots[e.team]++,this.pendingShot={shooter:e,onTarget:t.onTarget,t:t.t,resolved:!1};let r=this.lastCompleted;r&&r.receiver===e&&t.t-r.recvT<6&&!r.keyCounted&&(r.keyCounted=!0,this.s(r.passer).keyPasses++,this.add(r.passer,"keyPasses",this.w(r.passer).key));let o=this.m.attackDir(e.team)*Z.HL;if(Math.hypot(o-t.pos.x,t.pos.z)>28&&!t.restart){let l=(this.longShots.get(e)||0)+1;this.longShots.set(e,l),l>1&&this.add(e,"decisions",-.06)}}}completePass(t,e){this.pendingPass=null;let n=t.passer,i=this.s(n),r=this.w(n);i.passCmp++;let o=this.m.attackDir(n.team),l=(e.pos.x-t.fromX)*o>=8,c=n.id+":"+e.id,h=(this.pairCount.get(c)||0)+1;this.pairCount.set(c,h);let u=Math.pow(l?.85:.65,h-1);this.add(n,"passing",(r.pass+(l?r.prog:0))*u),this.credit(n,"passCompleted"),this.lastCompleted={passer:n,receiver:e,team:n.team,t:t.t,recvT:this.m.time,keyCounted:!1}}failPass(t,e,n){this.pendingPass=null;let i=t.passer;if(e){let r=++this.s(e).interceptions;this.add(e,"interceptions",this.w(e).intercept*(r<=3?1:Math.pow(.8,r-3))),this.credit(e,"interception")}n!=null&&n!==i.team&&(this.s(i).possLost++,this.add(i,"lost",this.w(i).lost),this.credit(i,"possessionLost"))}onPossession(t){let e=t.player,n=t.team,i=this.s(e);i.touches++;let r=this.pendingPass;r&&(r.passer===e?this.pendingPass=null:r.team===n?this.completePass(r,e):this.failPass(r,this.m.time-r.t<=3?e:null,n));let o=!1,a=this.pendingTackle;if(a){if(a.team===n&&this.m.time-a.t<=be.TACKLE_WINDOW){let l=++this.s(a.tackler).tacklesWon;this.add(a.tackler,"tackles",this.w(a.tackler).tackle*(l<=4?1:Math.pow(.85,l-4))),this.credit(a.tackler,"tackleWon"),a.victim&&(this.s(a.victim).possLost++,this.add(a.victim,"lost",this.w(a.victim).lost),this.credit(a.victim,"possessionLost")),o=!0}this.pendingTackle=null}if(!o){let l=t.prev&&t.prev.team!==n?t.prev:this.looseFrom&&this.looseFrom.team!==n?this.looseFrom:null;l&&(this.s(l).possLost++,this.add(l,"lost",this.w(l).lost),this.credit(l,"possessionLost"))}this.looseFrom=null,this.lastCompleted&&this.lastCompleted.team!==n&&(this.lastCompleted=null),this.controller=e}onTackle(t){this.s(t.player).tackleAtt++,t.success&&(this.pendingTackle={tackler:t.player,victim:t.victim,team:t.player.team,t:t.t},this.looseFrom=null,this.controller=null)}onSave(t){let e=this.pendingShot;e&&!e.resolved&&(e.resolved=!0,e.onTarget?(this.s(e.shooter).shotsOn++,this.teamShotsOn[e.shooter.team]++,this.add(e.shooter,"shooting",this.w(e.shooter).shotOn),this.credit(e.shooter,"shotSaved"),this.s(t.player).saves++,this.add(t.player,"saves",Yu.GK.save)):this.add(e.shooter,"shooting",this.w(e.shooter).shotOff))}onDeflect(t){let e=this.pendingShot;e&&!e.resolved&&t.player.team!==e.shooter.team&&!t.player.isGK&&this.m.time-e.t<3&&(e.resolved=!0,e.blocked=!0)}onGoal(t){let e=t.scorer,n=this.pendingShot;if(e){let i=this.s(e);i.goals++,n&&n.shooter===e&&(!n.resolved||n.blocked)?(i.shotsOn++,this.teamShotsOn[e.team]++,n.resolved=!0):(!n||n.shooter!==e)&&(i.shots++,i.shotsOn++,this.teamShots[e.team]++,this.teamShotsOn[e.team]++),this.add(e,"goals",this.w(e).goal);let r=this.lastCompleted;r&&r.receiver===e&&r.team===t.team&&r.passer!==e&&t.t-r.t<=be.ASSIST_WINDOW&&(this.s(r.passer).assists++,this.add(r.passer,"assists",this.w(r.passer).assist),t.assist=r.passer,this.credit(r.passer,"assist"))}else t.ownGoal&&t.ownGoalBy&&(this.s(t.ownGoalBy).ownGoals++,this.add(t.ownGoalBy,"decisions",-.3));for(let i of this.m.teams[1-t.team].players)this.add(i,"defending",this.w(i).conceded);this.goalLog.push({team:t.team,scorer:e?e.name:null,scorerRef:e,assist:t.assist?t.assist.name:null,ownGoal:t.ownGoal,ownGoalBy:t.ownGoalBy?t.ownGoalBy.name:null,clock:this.m.displayClock,half:this.m.half}),this.resolveAll("goal")}onOut(t){let e=this.pendingPass;e?this.failPass(e,null,t.team):t.controller&&t.team!==t.controller.team&&(this.s(t.controller).possLost++,this.add(t.controller,"lost",this.w(t.controller).lost)),this.resolveAll("out")}resolveAll(t){this.pendingPass&&(this.pendingPass=null),this.pendingTackle=null;let e=this.pendingShot;e&&!e.resolved&&(e.resolved=!0,t!=="goal"&&this.add(e.shooter,"shooting",this.w(e.shooter).shotOff)),this.pendingShot=null,this.looseFrom=null,t!=="goal"&&(this.lastCompleted=null)}finalise(){if(this.finalised)return;this.finalised=!0;let t=this.m,[e,n]=t.scoreline;for(let i of t.players){let r=this.w(i),o=i.team===0?e:n,a=i.team===0?n:e;this.add(i,"result",o>a?.25:o<a?-.2:0),a===0&&this.add(i,"defending",r.clean);let l=this.s(i);if(!i.isGK){l.touches<4?this.add(i,"involvement",-.25):l.touches>25&&this.add(i,"involvement",.15);let c=this.posSamples.get(i);c&&c.n>20&&this.add(i,"positioning",(c.good/c.n-.55)*.5)}}}rating(t){let e=0;for(let n of this.contrib.get(t)||[])e+=n.v;return Math.round(ht(6+e,1,10)*10)/10}breakdown(t){let e={};for(let o of this.contrib.get(t)||[])e[o.cat]=(e[o.cat]||0)+o.v;let n=Object.entries(e).map(([o,a])=>({cat:o,label:v1[o]||o,v:a})),i=n.filter(o=>o.v>.005).sort((o,a)=>a.v-o.v),r=n.filter(o=>o.v<-.005).sort((o,a)=>o.v-a.v);return{pos:i,neg:r,all:n}}possessionPct(){let[t,e]=this.teamPossTime,n=t+e;return n>0?[Math.round(t/n*100),100-Math.round(t/n*100)]:[50,50]}report(t){let e=this.s(t),n=this.m,i=n.halfLength*2,r=Math.round(Math.min(1,n.clock/i)*90),o=null,a=-1;for(let l of n.players){let c=this.rating(l);c>a&&(a=c,o=l)}return{score:n.scoreline,minutes:r,rating:this.rating(t),stats:{...e,passAcc:e.passAtt?Math.round(e.passCmp/e.passAtt*100):0},breakdown:this.breakdown(t),possession:this.possessionPct(),teamShots:[...this.teamShots],teamShotsOn:[...this.teamShotsOn],motm:o?{name:o.name,team:o.team,rating:a,isHuman:o.isHuman}:null,goals:this.goalLog.map(l=>({...l,scorerRef:void 0}))}}};var Ic={assisted:{label:"Assisted",passError:.3,shotError:.65,shotAim:1,touch:.45,tackle:.24,stick:1,claim:1.25,passCone:1.1,autoLob:!0,oppReact:1.55,oppAggro:.5,oppNoise:.14,oppPassError:3,oppMistake:.16,oppTouch:2,oppShotError:1.7,oppProtect:.24,oppHumanPassReact:.34},standard:{label:"Standard",passError:.55,shotError:.85,shotAim:.7,touch:.65,tackle:.14,stick:.75,claim:1.12,passCone:.95,autoLob:!0,oppReact:1,oppAggro:1.1,oppNoise:.03,oppPassError:1.35,oppMistake:.04,oppTouch:1.15,oppShotError:1.05,oppProtect:0,oppHumanPassReact:.2},expert:{label:"Expert",passError:.85,shotError:1,shotAim:.35,touch:.9,tackle:.02,stick:.5,claim:1.05,passCone:.8,autoLob:!1,oppReact:.9,oppAggro:1.22,oppNoise:0,oppPassError:1,oppMistake:.01,oppTouch:1,oppShotError:.95,oppProtect:-.04,oppHumanPassReact:.16}},Pc=class{constructor(t){this.cfg=t,this.mode=t.mode||"match",this.events=new Tc,this.rng=new yi(t.seed||12345),this.ball=new as,this.traj=new Ir(200,1/60),this.trajVersion=-1,this.players=[],this.time=0,this.clock=0,this.half=1,this.halfLength=t.halfLength||180,this.phase="setup",this.phaseT=0,this.restart=null,this.pendingRestart=null,this.possTeam=null,this.skipRequested=!1,this.kickoffTeam=0,this.nextKickId=1,this.passIntent=null,this.lastProgress=0,this.snapCount=0,this.rules=t.rules!==!1,this.difficulty=t.difficulty||"assisted",this.assist=Ic[this.difficulty]||Ic.assisted,this.human=null,this.humanCtl=null,this.teams=[],this.ballHooks={onBounce:(e,n)=>this.events.emit("bounce",{speed:n,t:this.time}),onFrame:(e,n,i)=>this.events.emit("frame",{what:i,speed:n,t:this.time}),bodies:(e,n)=>um(this,e,n)},this.buildTeams(t),this.aiParams=[qu(this,0),qu(this,1)],this.ai=new Rc(this),this.stats=new Cc(this)}buildTeams(t){for(let e=0;e<2;e++){let n=t.teams[e];if(!n){this.teams.push({index:e,attack:e===0?1:-1,score:0,players:[],name:"None",style:Dr.wing,empty:!0});continue}let i=n.players.find(c=>c.isHuman)?.role||null,r=n.formation||Ec(n.style,i),o={index:e,attack:e===0?1:-1,score:0,players:[],name:n.name,short:n.short||n.name.slice(0,3).toUpperCase(),kit:n.kit,styleName:n.style||"wing",style:Dr[n.style]||Dr.wing,tier:n.tier||1,formationName:r,formation:Po[r],clubId:n.clubId};this.teams.push(o);let a=o.formation.map((c,h)=>({...c,i:h,used:!1})),l=[...n.players].sort((c,h)=>(h.isHuman?1:0)-(c.isHuman?1:0));for(let c of l){let h=a.find(d=>!d.used&&d.role===c.role);if(h||(h=a.find(d=>!d.used&&d.role!=="GK"&&c.role!=="GK")||a.find(d=>!d.used)),!h)continue;h.used=!0;let u=new Xl({team:e,slot:h.i,role:h.role,number:c.number,name:c.name,isHuman:c.isHuman,attrs:c.attrs,keeping:c.keeping,foot:c.foot,look:c.look});u.home={u:h.u,v:h.v},o.players.push(u),this.players.push(u),u.isHuman&&(this.human=u)}o.players.sort((c,h)=>c.slot-h.slot)}this.players.sort((e,n)=>e.id-n.id)}attackDir(t){return this.teams[t].attack}ownGoalX(t){return-this.teams[t].attack*Z.HL}teamOf(t){return this.teams[t.team]}opponents(t){return this.teams[1-t].players}isOpp(t){return!!this.human&&t.team!==this.human.team}keeper(t){return this.teams[t].players.find(e=>e.isGK)||null}get scoreline(){return[this.teams[0].score,this.teams[1].score]}toWorld(t,e,n,i){let r=this.teams[t].attack;return i.set(e*Z.HL*r,0,-n*Z.HW*r)}uOf(t,e){return e/Z.HL*this.teams[t].attack}vOf(t,e){return-e/Z.HW*this.teams[t].attack}keeperHandles(t,e){return jp(this,t,e)}keeperContact(t,e){return tm(this,t,e)}start(t=null){this.kickoffTeam=t??(this.rng.next()<.5?0:1),this.events.emit("matchStart",{t:0}),this.setupRestart({type:"kickoff",team:this.kickoffTeam,spot:new ot(0,0,0)})}step(t=Is){this.time+=t,this.phaseT+=t;let e=this.ball;this.humanCtl&&this.humanCtl.update(t),this.ai.update(t),this.preStep&&this.preStep(t);for(let n of this.players)Zp(this,n,t);for(let n of this.players){let i=Kp(n);this.phase==="restart"&&this.restart&&this.restart.taker===n&&this.restart.placed&&(i=0),n.celebrate>this.time&&(i=Math.min(i,6.5)),Dp(n,t,this.time,i,e.owner===n)}Op(this.players);for(let n of this.players)n.pos.x=ht(n.pos.x,-hn.HL+1,hn.HL-1),n.pos.z=ht(n.pos.z,-hn.HW+1,hn.HW-1);e.state==="held"&&e.owner?this.positionHeldBall(e.owner):e.state==="dead"&&this.restart&&this.restart.handsBall&&this.restart.taker&&this.positionThrowBall(this.restart.taker),Hp(e,t,this.ballHooks),(e.version!==this.trajVersion||this.time-this.traj.t0>.12)&&(this.traj.compute(e,this.time),this.trajVersion=e.version),this.phase==="playing"&&hm(this,t),this.stats.update(t),this.updatePhase(t)}positionHeldBall(t){let e=this.ball,n=t.hold==="throw"?-.05:.32,i=t.hold==="throw"?2.05:1.05;e.pos.set(t.pos.x+Math.sin(t.yaw)*n,i,t.pos.z+Math.cos(t.yaw)*n),e.vel.set(0,0,0)}positionThrowBall(t){let e=this.ball;e.pos.set(t.pos.x+Math.sin(t.yaw)*-.05,2.08,t.pos.z+Math.cos(t.yaw)*-.05),e.vel.set(0,0,0)}updatePhase(t){switch(this.phase){case"playing":{if(this.clock+=t,this.rules&&this.checkBall(),this.phase!=="playing")break;this.checkDeadlock(),this.rules&&this.clock>=this.halfLength*this.half&&!this.shotInFlight()&&this.endHalf();break}case"stoppage":this.phaseT>(this.stoppageDelay||.8)&&this.setupRestart(this.pendingRestart);break;case"restart":this.updateRestart(t);break;case"goal":if(this.phaseT>2.8||this.skipRequested&&this.phaseT>.6){this.skipRequested=!1;let e=1-this.lastGoalTeam;this.setupRestart({type:"kickoff",team:e,spot:new ot(0,0,0)})}break;case"halftime":(this.phaseT>3.2||this.skipRequested&&this.phaseT>.5)&&(this.skipRequested=!1,this.startSecondHalf());break;default:break}}shotInFlight(){let t=this.ball.lastKick;if(!t||t.kind!=="shot"||this.time-t.t>2.5)return!1;let e=this.attackDir(t.team);return this.ball.vel.x*e>3&&!this.ball.owner}checkBall(){let t=this.ball;if(t.state==="held"||t.state==="dead")return;let e=t.pos;for(let n=0;n<2;n++){let i=n===0?1:-1;if(e.x*i-pe>Z.HL){let r=t.crossing[n];if(r&&r.inMouth&&Math.abs(e.z)<ft.HW&&e.y<ft.H){let o=this.teams[0].attack===i?0:1;this.goal(o)}else this.outOverGoalLine(i);return}}if(Math.abs(e.z)-pe>Z.HW){let n=t.lastTouch,i=n?1-n.team:this.possTeam!=null?1-this.possTeam:0,r=new ot(ht(e.x,-Z.HL+1,Z.HL-1),0,Math.sign(e.z)*Z.HW);this.ballOut("throwin",i,r);return}if(Math.abs(e.x)>hn.HL-.5||Math.abs(e.z)>hn.HW-.5){let n=t.lastTouch,i=n?1-n.team:0,r=new ot(ht(e.x,-Z.HL+1,Z.HL-1),0,ht(e.z,-Z.HW,Z.HW));this.ballOut("throwin",i,r)}}outOverGoalLine(t){let e=this.ball,n=this.teams[0].attack===-t?0:1,i=1-n,r=e.lastTouch;if(r&&r.team===n){let o=new ot(t*(Z.HL-.4),0,Math.sign(e.pos.z||1)*(Z.HW-.4));this.ballOut("corner",i,o)}else{let o=new ot(t*(Z.HL-Kt.GOAL_D*.5),0,ht(e.pos.z*.3,-2.5,2.5));this.ballOut("goalkick",n,o)}}ballOut(t,e,n){let i=this.ball,r=i.lastTouch;this.events.emit("out",{restart:t,team:e,lastTouch:r,controller:i.owner,t:this.time,pos:i.pos.clone()}),i.owner&&(i.owner=null),i.state="free",this.phase="stoppage",this.phaseT=0,this.stoppageDelay=.75,this.pendingRestart={type:t,team:e,spot:n}}goal(t){if(this.phase!=="playing")return;let e=this.ball,n=e.lastTouch,i=null,r=!1,o=null,a=e.lastKick;n&&n.team===t?i=n:a&&a.team===t&&a.kind==="shot"&&a.onTarget&&this.time-a.t<4?i=a.player:n&&(r=!0,o=n),this.teams[t].score++,this.lastGoalTeam=t,e.owner&&(e.owner=null),e.state="free",this.phase="goal",this.phaseT=0,this.skipRequested=!1,i&&(i.celebrate=this.time+2.8,i.action={type:"celebrate",t:0,dur:2.8});for(let l of this.teams[t].players)l!==i&&(l.celebrate=this.time+2.8);this.events.emit("goal",{team:t,scorer:i,ownGoal:r,ownGoalBy:o,t:this.time,clock:this.clock,score:this.scoreline,pos:e.pos.clone()})}foul(t,e,n){if(this.phase!=="playing")return;let i=this.time;e.downUntil=i+1.1,e.action={type:"stumble",t:0,dur:1.1,fall:!0};let r=e.pos.clone();r.x=ht(r.x,-Z.HL+.5,Z.HL-.5),r.z=ht(r.z,-Z.HW+.5,Z.HW-.5);let o=this.ownGoalX(t.team),a=Math.abs(r.x-o)<Kt.PEN_D&&Math.abs(r.z)<Kt.PEN_HW&&Math.sign(r.x)===Math.sign(o),l=a?"penalty":"freekick";a&&r.set(Math.sign(o)*(Z.HL-Kt.SPOT),0,0),this.events.emit("foul",{player:t,victim:e,slide:n,penalty:a,t:i,pos:e.pos.clone()}),this.ball.owner&&(this.ball.owner=null),this.ball.state="free",this.phase="stoppage",this.phaseT=0,this.stoppageDelay=1.1,this.pendingRestart={type:l,team:e.team,spot:r,victim:e}}dislodge(t,e,n,i=!1){let r=this.ball;r.owner=null,r.state="free",r.setVelocity(n),r.lastTouch=e,r.lastTouchTime=this.time,t.noCaptureUntil=this.time+.45,t.stumbleUntil=Math.max(t.stumbleUntil,this.time+.3),this.events.emit("tackle",{player:e,victim:t,success:!0,slide:i,t:this.time})}touchBall(t,e){this.ball.lastTouch=t,this.ball.lastTouchTime=this.time,this.events.emit("touch",{player:t,kind:e,strength:this.ball.speed,t:this.time})}gainControl(t){let e=this.ball,n=e.owner,i=e.lastKick,r="loose";n&&n.team!==t.team?r="steal":i&&tc.has(i.kind)&&this.time-i.t<8&&i.player!==t&&(r=i.team===t.team?"receive":"interception"),e.owner=t,e.state="controlled",e.lastTouch=t,e.lastTouchTime=this.time,this.possTeam=t.team,this.possEpoch=(this.possEpoch||0)+1,this.lastProgress=this.time,n&&(n.noCaptureUntil=this.time+.35),this.passIntent&&this.passIntent.target===t&&(this.passIntent=null),this.events.emit("possession",{player:t,team:t.team,prev:n,cause:r,t:this.time})}loseControl(t){let e=this.ball,n=e.owner;n&&(e.owner=null,e.state=e.pos.y>pe+.05?"air":"free",this.events.emit("release",{player:n,reason:t,t:this.time}))}applyKick(t,e,n,i){let r=this.ball;r.owner=null,r.setVelocity(e),r.state=e.y>.8||r.pos.y>pe+.1?"air":"free",r.lastTouch=t,r.lastTouchTime=this.time,t.noCaptureUntil=this.time+be.KICK_RELEASE_LOCK,t.lastKickAt=this.time,t.hold=null,t.touch={foot:n.foot,time:this.time,x:r.pos.x,y:r.pos.y,z:r.pos.z,kind:n.kind==="shot"?"shot":"kick"};let o=n.restart?n.restart.type:null,a=this.events.emit("kick",{player:t,team:t.team,kind:n.kind,target:i.target||null,point:i.point||null,onTarget:!!i.onTarget,speed:e.len(),t:this.time,restart:o,firstTime:n.firstTime,pos:r.pos.clone(),kickId:this.nextKickId++});if(r.lastKick=a,this.lastProgress=this.time,i.target&&tc.has(n.kind)?this.passIntent={target:i.target,point:i.point,t:this.time,from:t}:this.passIntent=n.kind==="shot"?null:this.passIntent,n.restart&&this.phase==="restart"){this.phase="playing",this.phaseT=0,this.restart=null;for(let l of this.players)l.hold=null}}setupRestart(t){let e=this.ball;this.phase="restart",this.phaseT=0,this.skipRequested=!1,this.passIntent=null,this.events.emit("restartSetup",{restart:t.type,team:t.team,t:this.time});let n=t.spot.clone(),i=this.chooseTaker(t);this.restart={type:t.type,team:t.team,spot:n,taker:i,placed:!1,victim:t.victim||null,readyAt:{kickoff:1.1,throwin:.9,corner:1.3,goalkick:1.2,freekick:1.3,penalty:1.8,dropball:.6}[t.type]||1.2,handsBall:t.type==="throwin",humanTaker:i&&i.isHuman,decided:!1},e.owner=null,e.place(n.x,n.z),e.state="dead",e.lastKick=null;for(let r of this.players)r.action&&r.action.type!=="celebrate"&&(r.action=null),r.faceYaw=null,r.hold=null;t.type==="kickoff"||t.type==="penalty"?this.snapPositions():i&&(i.isHuman||i.pos.distXZ(n)>14)&&(this.placeTaker(i),this.events.emit("snap",{t:this.time,who:"taker"})),t.type==="goalkick"&&i&&i.isGK&&this.placeTaker(i)}chooseTaker(t){let e=this.teams[t.team],n=e.players.filter(o=>!o.isGK),i=this.human&&this.human.team===t.team?this.human:null,r=o=>{let a=null,l=1e9;for(let c of o){let h=c.pos.distXZ(t.spot);h<l&&(l=h,a=c)}return[a,l]};switch(t.type){case"kickoff":return i&&(i.role==="ST"||i.role==="AM")?i:n.find(o=>o.role==="ST")||n.find(o=>o.role==="AM")||n[n.length-1];case"goalkick":return e.players.find(o=>o.isGK)||n[0];case"penalty":return i&&(["ST","W","AM"].includes(i.role)||t.victim===i)?i:[...n].sort((o,a)=>a.attrs.finishing-o.attrs.finishing)[0];case"corner":{let o=n.filter(l=>l.role==="W"||l.role==="AM"||l.role==="CM"),[a]=r(o.length?o:n);return i&&i.pos.distXZ(t.spot)<14&&i.pos.distXZ(t.spot)<=a.pos.distXZ(t.spot)+3?i:a}default:{let[o,a]=r(n.filter(l=>this.time>=l.downUntil||l===t.victim));return i&&(t.victim===i||i.pos.distXZ(t.spot)<12&&i.pos.distXZ(t.spot)<=a+2)?i:o||n[0]}}}placeTaker(t){let e=this.restart,n=e.spot,i=this.attackDir(t.team),r,o;if(e.type==="throwin"){r=.3*i,o=-Math.sign(n.z);let a=Math.hypot(r,o);r/=a,o/=a,t.pos.set(n.x-r*.35,0,n.z-o*.35)}else{let a=e.type==="corner"?n.x-i*8:i*Z.HL,l=(e.type==="corner",0);r=a-n.x,o=l-n.z;let c=Math.hypot(r,o)||1;r/=c,o/=c,t.pos.set(n.x-r*.7,0,n.z-o*.7)}t.yaw=Bt(r,o),t.prevYaw=t.yaw,t.prevPos.copy(t.pos),t.vel.set(0,0,0),t.isHuman&&this.events.emit("humanYaw",{yaw:t.yaw})}snapPositions(){this.snapCount++,this.events.emit("snap",{t:this.time,who:"all"});for(let t of this.players){let e=this.ai.restartTarget(t,this.restart,!0);t.pos.copy(e),Np(t),t.celebrate=0;let n=this.attackDir(t.team),i=this.restart.spot.x-t.pos.x,r=this.restart.spot.z-t.pos.z;t.yaw=Math.hypot(i,r)>.5?Bt(i,r):Bt(n,0),t.prevYaw=t.yaw,t.prevPos.copy(t.pos)}this.restart.taker&&this.placeTaker(this.restart.taker),this.human&&this.events.emit("humanYaw",{yaw:this.human.yaw})}updateRestart(t){let e=this.restart;if(!e)return;let n=e.taker;if(!n){this.phase="playing";return}let i=n.pos.distXZ(e.spot);if(!e.placed){(i<.9||n.isHuman||this.phaseT>3.5)&&(i>=.9&&this.placeTaker(n),e.placed=!0,e.placedAt=this.phaseT,e.type==="throwin"&&(n.hold="throw"));return}if(this.phaseT>4.5&&!e.cleared&&(e.cleared=!0,this.ai.enforceDistances(e)),!(this.phaseT<e.readyAt||this.phaseT-e.placedAt<.35)){if(e.humanTaker&&!e.autoTaken){this.phaseT>12&&(e.autoTaken=!0,this.ai.takeRestart(n,e));return}n.action||this.ai.takeRestart(n,e)}}startSecondHalf(){this.half=2,this.clock=this.halfLength;for(let t of this.teams)t.attack=-t.attack;this.events.emit("secondHalf",{t:this.time}),this.setupRestart({type:"kickoff",team:1-this.kickoffTeam,spot:new ot(0,0,0)})}endHalf(){this.events.emit("whistle",{kind:this.half===1?"half":"full",t:this.time}),this.ball.owner&&(this.ball.owner=null),this.ball.state="free";for(let t of this.players)t.action&&t.action.type!=="celebrate"&&(t.action=null);this.half===1?(this.phase="halftime",this.phaseT=0,this.events.emit("halftime",{t:this.time,score:this.scoreline})):(this.phase="fulltime",this.phaseT=0,this.events.emit("fulltime",{t:this.time,score:this.scoreline}))}checkDeadlock(){let t=this.ball;if(t.owner||t.speed>.3){this.lastProgress=this.time;return}if(this.time-this.lastProgress>9){let e=t.lastTouch,n=e?1-e.team:0,i=new ot(ht(t.pos.x,-Z.HL+2,Z.HL-2),0,ht(t.pos.z,-Z.HW+2,Z.HW-2));this.events.emit("dropball",{t:this.time}),this.phase="stoppage",this.phaseT=0,this.stoppageDelay=.3,this.pendingRestart={type:"freekick",team:n,spot:i},this.lastProgress=this.time}}requestSkip(){this.skipRequested=!0}get displayClock(){let t=this.halfLength*2,e=Math.min(this.clock,t)/t*90*60,n=Math.floor(e/60),i=Math.floor(e%60);return`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}};var Lc=class{constructor(t,e){this.m=t,this.p=e,this.input={moveF:0,moveR:0,sprint:!1,yaw:0,pitch:0,lmb:!1,rmb:!1},this.buffer=[],this.intent=null,this.passTarget=null,this.targetVisible=!1,this.lastAction=null}press(t){this.buffer.push({type:t,t:this.m.time})}release(t){this.buffer.push({type:t+"Up",t:this.m.time})}update(t){let e=this.m,n=this.p,i=e.time,r=e.ball,o=this.input,a=o.yaw,l=Math.sin(a),c=Math.cos(a),h=-Math.cos(a),u=Math.sin(a),d=l*o.moveF+h*o.moveR,m=c*o.moveF+u*o.moveR,g=Math.hypot(d,m);g>1&&(d/=g,m/=g);let x=r.owner===n&&r.state==="controlled";n.sprint=o.sprint&&g>.1;let f=n.maxSpeed(n.sprint,x);n.desired.set(d*f,0,m*f),n.faceYaw=a;let p=e.phase==="restart"&&e.restart&&e.restart.taker===n&&e.restart.placed,y=!x&&!r.owner&&r.state!=="dead"&&(this.intent||e.passIntent&&e.passIntent.target===n);x||p||y?(this.passTarget=Vp(e,n,a,this.passTarget,e.assist.passCone),this.targetVisible=!!this.passTarget):(this.targetVisible=!1,(!r.owner||r.owner.team!==n.team)&&(this.passTarget=null));let _=n.action;if(_&&_.type==="kick"&&_.kind==="shot"&&!_.contacted&&!_.ai&&(_.aimYaw=a,_.aimPitch=o.pitch),e.phase==="goal"||e.phase==="halftime"){for(let M of this.buffer)M.type.endsWith("Up")||e.requestSkip();this.buffer.length=0;return}if(p){this.restartControls();return}if(e.phase!=="playing"){this.buffer=this.buffer.filter(M=>i-M.t<be.INPUT_BUFFER&&!M.type.endsWith("Up"));return}let b=[];for(let M of this.buffer){if(this.handle(M,x))continue;let S=M.type==="slide"?1.2:M.type==="tackle"?.4:be.INPUT_BUFFER;i-M.t<S&&!M.type.endsWith("Up")&&b.push(M)}this.buffer=b,this.updateIntent(x)}handle(t,e){let n=this.m,i=this.p,r=n.time,o=this.input,a=i.action;switch(t.type){case"passUp":return a&&a.type==="kick"&&a.kind==="pass"&&a.charging&&Ps(a),this.intent&&this.intent.kind==="pass"&&(this.intent.released=!0),!0;case"shootUp":return a&&a.type==="kick"&&a.kind==="shot"&&a.charging&&(a.aimYaw=o.yaw,a.aimPitch=o.pitch,Ps(a)),this.intent&&this.intent.kind==="shot"&&!this.intent.released&&(this.intent.released=!0,this.intent.charge=Math.min(1,(r-this.intent.t0)/.65)),!0;case"pass":case"shoot":case"through":{let l=t.type==="shoot"?"shot":t.type;if(e)return ls(n,i)?(l==="shot"?ce(n,i,"shot",{charging:o.lmb,aimYaw:o.yaw,aimPitch:o.pitch}):ce(n,i,l,{target:this.passTarget,charging:l==="pass"&&o.rmb,aimYaw:o.yaw}),this.lastAction={kind:l,t:r},this.intent=null,!0):!1;if(l==="through")return this.requestPass(),!0;let c=Ou(n,i,.75);return this.intent={kind:l,t0:t.t,released:l==="shot"?!o.lmb:!o.rmb,charge:0,until:r+Math.max(be.INPUT_BUFFER,c!=null?c+.12:0)},!0}case"tackle":case"slide":{if(e&&t.type==="tackle")return!1;a&&a.type==="kick"&&!a.contacted&&!a.owned&&(i.action=null,i.faceYaw=null),this.intent=null;let l=t.type==="tackle"?ec(n,i):nc(n,i,{force:!0});return l&&(this.lastAction={kind:t.type,t:r}),l}default:return!0}}updateIntent(t){let e=this.intent;if(!e)return;let n=this.m,i=this.p,r=n.time,o=this.input;if(e.kind==="shot"&&!e.released&&(e.charge=Math.min(1,(r-e.t0)/.65)),t){if(!ls(n,i))return;e.kind==="shot"?ce(n,i,"shot",{charge:e.charge,aimYaw:o.yaw,aimPitch:o.pitch,minContact:.06}):ce(n,i,"pass",{target:this.passTarget,aimYaw:o.yaw,minContact:.06}),this.intent=null;return}if(r>e.until||n.ball.owner&&n.ball.owner!==i){this.intent=null;return}if(!ls(n,i))return;let a=Ou(n,i,.5);if(a!=null&&a<=.13){let l=e.kind==="shot"?"shot":"pass";ce(n,i,l,{target:l==="pass"?this.passTarget:null,aimYaw:o.yaw,aimPitch:o.pitch,charge:l==="shot"?Math.max(.25,e.charge):0,firstTime:!0,minContact:Math.max(.04,a),deadline:a+.22}),this.lastAction={kind:l,t:r,firstTime:!0},this.intent=null}else a!=null&&(e.until=Math.max(e.until,r+a+.05))}requestPass(){let t=this.m,e=this.p,n=t.time;n<e.requestReadyAt||(e.requestUntil=n+2.4,e.requestReadyAt=n+be.REQUEST_COOLDOWN,t.events.emit("request",{player:e,t:n}))}restartControls(){let t=this.m,e=this.p,n=t.time,i=this.input,r=t.restart,o=[],a=e.action;for(let l of this.buffer){if(l.type==="shootUp"){a&&a.kind==="shot"&&a.charging&&(a.aimYaw=i.yaw,a.aimPitch=i.pitch,Ps(a));continue}if(l.type==="passUp"){a&&a.charging&&Ps(a);continue}if(!e.action){if(l.type==="pass"||l.type==="through"){r.type==="throwin"?ce(t,e,"throw",{target:this.passTarget,aimYaw:i.yaw,restart:r,point:this.passTarget?null:Ku(e,i.yaw,12)}):ce(t,e,l.type==="through"?"through":"pass",{target:this.passTarget,aimYaw:i.yaw,restart:r,charging:l.type==="pass"&&i.rmb});continue}if(l.type==="shoot"){r.type==="throwin"?ce(t,e,"throw",{point:Ku(e,i.yaw,20),restart:r}):r.type==="corner"?ce(t,e,"cross",{point:Ku(e,i.yaw,ht(18+i.pitch*30,8,30)),restart:r}):ce(t,e,"shot",{charging:i.lmb,aimYaw:i.yaw,aimPitch:i.pitch,restart:r});continue}n-l.t<be.INPUT_BUFFER&&o.push(l)}}this.buffer=o}};function Ku(s,t,e){return new ot(ht(s.pos.x+Math.sin(t)*e,-Z.HL+1,Z.HL-1),0,ht(s.pos.z+Math.cos(t)*e,-Z.HW+1,Z.HW-1))}var mm=12,Lo=class{constructor(t,e){this.app=t,this.cfg=e,this.view=t.view,this.audio=t.audio,this.hud=t.hud,this.input=t.input,this.match=e.matchObject||new Pc(e.match);let n=this.match;this.human=n.human,this.human&&(this.ctl=new Lc(n,this.human),n.humanCtl=this.ctl),this.cam={mode:this.human?"fp":"orbit",yaw:0,pitch:-.14,eye:1.65,fov:t.settings.fov,bob:t.settings.bob?1:0,shake:t.settings.shake?1:0,angle:0,radius:58,height:26},this.acc=0,this.paused=!1,this.ended=!1,this.excite=0,this.slideEye=0,this.unsubs=[],this.kitA=e.colours?e.colours.kits[0].shirt:"#c00",this.kitB=e.colours?e.colours.kits[1].shirt:"#00c",this.view.setVenue(e.venue||"community",e.venueOpts||{}),this.view.setMatch(n,e.colours),this.view.localPlayer=this.human,this.view.firstPerson=!!this.human,this.replays=(e.mode==="career"||e.mode==="quick")&&t.settings.replays!==!1&&!t.params?.has("noreplay"),this.view.setRecording(this.replays),this.replay=null,this.pendingReplay=null,this.hud.onSkipReplay=()=>this.skipReplay(),this.hookEvents(),this.human&&this.unsubs.push(this.input.on((i,r)=>{if(!(this.paused||!this.ctl)){if(this.replay){r&&this.skipReplay();return}r?this.ctl.press(i):this.ctl.release(i)}}))}startReplay(){let t=this.pendingReplay;this.pendingReplay=null;let e=this.view.recorder,n=this.match;if(!t||!e||n.time-t.goalT>8)return!1;let i=t.shotT!=null&&t.goalT-t.shotT<3.5?t.shotT:t.goalT-.6,r=e.clip(t.goalT,i);return r?(this.replay=new yc(e,r,{goalT:t.goalT,shotT:t.shotT,subject:t.subject}),this.replay.team=t.team,this.hud.setReplay(!0,t.info,!this.input.touchMode),this.hud.flashFade(),this.ctl&&(this.ctl.buffer.length=0),!0):!1}skipReplay(){this.replay&&this.endReplay()}endReplay(){this.replay=null,this.hud.setReplay(!1),this.hud.flashFade(),this.ctl&&(this.ctl.buffer.length=0),this.match.phase==="goal"&&this.match.requestSkip()}replayFrame(t){let e=this.replay,n=this.paused?0:t;for(let o of e.advance(n))if(o==="shot"&&this.audio.play("shot",{gain:.8,rate:.72}),o==="goal"){this.audio.play("net",{gain:.9,rate:.75}),this.audio.play("cheer",{group:"crowd",gain:.8});let a=e.frame();a&&this.view.celebrate(a.ball.x,a.ball.z,e.team??0,.8)}let i=e.frame();if(!i)return this.endReplay(),!1;let r=e.camera(i,n);return this.view.render(1,n,r,{crowd:.6,replay:i}),this.view.markers.hideAll(),this.hud.updateReplay(e),e.done&&this.endReplay(),!0}start(){let t=this.match;this.cfg.kickoffTeam!=null?t.start(this.cfg.kickoffTeam):this.cfg.noStart||t.start(),this.human&&(this.cam.yaw=this.human.yaw);let e=(To[this.cfg.venue]||To.community).loud;this.cfg.mode!=="menu"&&this.audio.startCrowd(.25+e*.75)}hookEvents(){let t=this.match,e=t.events,n=this.audio,i=this.view,r=(l,c)=>this.unsubs.push(e.on(l,c)),o=this.cfg.mode==="menu",a=(l,c=1)=>{if(o)return{gain:0};let h=i.camera.position,u=l.x-h.x,d=l.z-h.z,m=Math.hypot(u,d),g=this.cam.yaw,x=-Math.cos(g)*u+Math.sin(g)*d;return{gain:c/(1+m*.045),pan:x/(m+3)}};r("kick",l=>{let c=a(l.pos,1);l.kind==="shot"?(n.play("shot",{...c,gain:c.gain*Math.min(1.2,.55+l.speed/40)}),l.player===this.human&&(i.shake=1),this.excite=Math.max(this.excite,.7)):l.kind==="throw"?n.play("touch",{...c,gain:c.gain*.3}):n.play("pass",{...c,gain:c.gain*Math.min(1,.4+l.speed/30),rate:.95+Math.random()*.1}),l.restart==="kickoff"&&n.play("whistle",{gain:o?0:.8})}),r("touch",l=>n.play("touch",{...a(l.player.pos,l.kind==="receive"?.8:.55),rate:.9+Math.random()*.2})),r("deflect",l=>n.play("bounce",a(l.player.pos,Math.min(1,l.speed/10)))),r("bounce",l=>{l.speed>2&&n.play("bounce",a(t.ball.pos,Math.min(.6,l.speed/16)))}),r("frame",l=>{n.play("post",a(t.ball.pos,Math.min(1,l.speed/18))),n.play("groan",{group:"crowd",gain:o?0:.7}),this.excite=1}),r("save",l=>{n.play(l.caught?"catch":"bounce",a(l.player.pos,1)),l.shot&&l.shot.onTarget&&n.play("groan",{group:"crowd",gain:o?0:.5})}),r("tackle",l=>n.play("tackle",a(l.player.pos,.9))),r("slide",l=>n.play("slide",a(l.player.pos,.8))),r("foul",l=>{n.play("whistle",{gain:o?0:.9}),(l.victim===this.human||l.player===this.human)&&this.hud.notify(l.player===this.human?"FOUL":"FOULED","bad"),l.penalty&&!o&&this.hud.showBanner("PENALTY","",1800)}),r("halftime",()=>{n.play("whistleLong",{gain:o?0:.9}),o||this.hud.showBanner("HALF TIME",`${t.teams[0].short} ${t.scoreline[0]} - ${t.scoreline[1]} ${t.teams[1].short}`,3e3)}),r("fulltime",()=>{if(n.play("whistleLong",{gain:o?0:.9}),o)return;let[l,c]=t.scoreline,h=this.human&&(this.human.team===0?l>c:c>l);if(this.cfg.final&&h){this.hud.showBanner("CHAMPIONS",`${this.cfg.final} winners!`,6e3,"mine"),n.play("cheer",{group:"crowd",gain:1}),i.crowdLevel=1;for(let u=0;u<3;u++)setTimeout(()=>i.celebrate((Math.random()-.5)*30,(Math.random()-.5)*20,this.human.team,1.4),u*500)}else this.hud.showBanner("FULL TIME",`${t.teams[0].short} ${l} - ${c} ${t.teams[1].short}`,4e3)}),r("snap",()=>{o||this.hud.flashFade()}),r("humanYaw",l=>{this.cam.yaw=l.yaw,this.cam.pitch=-.14}),r("request",()=>n.play("shout",{gain:.5})),r("ack",l=>{n.play("ack",{gain:.6}),this.ackPlayer=l.player,this.ackUntil=t.time+1.2}),r("goal",l=>{if(n.play("net",a(l.pos,1)),o||n.play("cheer",{group:"crowd",gain:1}),this.excite=1,i.crowdLevel=1,i.celebrate(l.pos.x,l.pos.z,l.team,1),!o){let c=l.ownGoal?`Own goal (${l.ownGoalBy?l.ownGoalBy.name:""})`:l.scorer?`${l.scorer.name}${l.assist?` \xB7 assist ${l.assist.name}`:""}`:"",h=this.human&&l.scorer===this.human;this.hud.showBanner(h?"GOAL!":"GOAL",`${t.teams[0].short} ${t.scoreline[0]} - ${t.scoreline[1]} ${t.teams[1].short} \xB7 ${c}`,2600,h?"mine":"")}}),r("credit",l=>{if(l.player!==this.human||o)return;let h={passCompleted:["PASS COMPLETED",""],assist:["ASSIST","good"],tackleWon:["TACKLE WON","good"],interception:["INTERCEPTION","good"],possessionLost:["POSSESSION LOST","bad"],shotSaved:["SHOT SAVED",""]}[l.kind];h&&this.hud.notify(h[0],h[1])}),r("goal",l=>{!o&&this.human&&l.scorer===this.human&&this.hud.notify("GOAL","good")}),r("goal",l=>{if(!this.replays||this.app.settings.replays===!1)return;let c=t.ball.lastKick,h=c&&c.team===l.team&&l.t-c.t<4?c.t:null,u=l.ownGoal?c&&c.team===l.team?c.player:l.ownGoalBy:l.scorer||c&&c.player,d=Math.max(1,Math.ceil(t.clock/60)),m=l.ownGoal?`Own goal${l.ownGoalBy?` (${l.ownGoalBy.name})`:""}`:l.scorer?l.scorer.name:"";this.pendingReplay={goalT:l.t,shotT:h,subject:u?t.players.indexOf(u):-1,team:l.team,info:`${t.teams[0].short} ${t.scoreline[0]} - ${t.scoreline[1]} ${t.teams[1].short}${m?` \xB7 ${m}`:""} \xB7 ${d}'`}})}frame(t){let e=this.match;if(this.replay&&this.replayFrame(t))return;if(!this.paused&&!this.ended){if(this.human&&this.ctl){let l=this.input.axes();this.input.consumeLook(this.cam,t);let c=this.ctl.input;c.moveF=l.f,c.moveR=l.r,c.sprint=l.sprint,c.yaw=this.cam.yaw,c.pitch=this.cam.pitch;let h=this.input.held;c.lmb=h.lmb,c.rmb=h.rmb}this.acc+=Math.min(t,.1)*(this.cfg.timeScale||1);let a=0;for(;this.acc>=Is&&a<mm;)if(e.step(Is),this.acc-=Is,a++,this.cfg.onStep&&this.cfg.onStep(e),this.pendingReplay&&(e.phase!=="goal"||e.phaseT>2.3||e.skipRequested&&e.phaseT>.5)){if(e.phase==="goal"&&this.startReplay()){this.acc=0;break}this.pendingReplay=null}if(a>=mm&&(this.acc=0),this.replay&&this.replayFrame(0))return;e.phase==="fulltime"&&!this.ended&&e.phaseT>(this.cfg.mode==="menu"?0:2.5)&&(this.ended=!0,this.cfg.onEnd&&this.cfg.onEnd(this))}let n=this.paused?1:this.acc/Is,i=e.ball.pos,r=Math.max(0,1-Math.min(Math.abs(i.x-Z.HL),Math.abs(i.x+Z.HL))/24);if(this.excite=Math.max(r*.45,this.excite-t*.25),this.cfg.mode!=="menu"&&this.audio.setExcitement(this.excite),this.human){let a=this.human.action,l=a&&a.type==="slide"?a.t<.7?.72:1.65:e.time<this.human.downUntil?.6:1.65;this.cam.eye+=(l-this.cam.eye)*(1-Math.exp(-t*9))}else this.cam.angle+=t*.05;this.cam.fov=this.app.settings.fov,this.cam.bob=this.app.settings.bob?1:0,this.cam.shake=this.app.settings.shake?1:0;let o=this.app.debugCam?{mode:"free",pos:this.app.debugCam.pos,look:this.app.debugCam.look,fov:this.app.debugCam.fov||this.cam.fov}:this.cam;this.view.render(n,t,o,{crowd:this.excite*.5}),this.updateMarkers(),this.cfg.mode!=="menu"&&this.hud.update(this.hudState())}updateMarkers(){let t=this.view.markers,e=this.match;if(t.hideAll(),!this.ctl||this.cfg.mode==="menu")return;let n=this.ctl.passTarget;n&&this.ctl.targetVisible&&t.showRing(n.pos.x,n.pos.z,e.time),this.ackPlayer&&e.time<this.ackUntil&&t.showAck(this.ackPlayer.pos.x,2.25,this.ackPlayer.pos.z,e.time);let i=e.passIntent;i&&i.target===this.human&&i.point&&!e.ball.owner&&t.showIncoming(i.point.x,i.point.z)}hudState(){let t=this.match,e=this.human,n="",i=this.input.touchMode;if(e){let o=t.restart;t.phase==="restart"&&o&&o.taker===e?n=i?o.type==="throwin"?"Throw-in: PASS short throw \xB7 SHOOT long throw":o.type==="corner"?"Corner: SHOOT crosses to where you aim \xB7 PASS short":o.type==="penalty"?"Penalty: aim, hold SHOOT and release":o.type==="kickoff"?"Kick-off: PASS to a teammate":"Free kick: PASS \xB7 THRU \xB7 SHOOT":o.type==="throwin"?"Throw-in: RMB/Space short throw \xB7 LMB long throw":o.type==="corner"?"Corner: LMB cross to where you aim \xB7 RMB short pass":o.type==="penalty"?"Penalty: aim and hold LMB, release to shoot":o.type==="kickoff"?"Kick-off: RMB pass to a teammate":"Free kick: RMB pass \xB7 Space through ball \xB7 LMB shoot":t.phase==="goal"||t.phase==="halftime"?n=i?"Tap any button to skip":"Press any action to skip":i?n=t.ball.owner&&t.ball.owner.team===e.team&&t.ball.owner!==e&&e.requestUntil>t.time?"Pass requested":"":t.ball.owner===e?n="LMB shoot \xB7 RMB pass \xB7 Space through ball":t.ball.owner&&t.ball.owner.team!==e.team?n=t.ball.owner.pos.distXZ(e.pos)<3?"E tackle \xB7 C slide":"":t.ball.owner&&t.ball.owner.team===e.team&&(n=e.requestUntil>t.time?"Pass requested":"Space: call for the ball")}let r=this.ctl&&this.ctl.intent;return{match:t,camera:this.view.camera,view:this.view,camYaw:this.cam.yaw,style:this.view.style,kitA:this.kitA,kitB:this.kitB,hint:n,intentCharge:r&&r.kind==="shot"?r.charge:0,phaseText:t.phase==="halftime"?"HALF TIME":t.phase==="fulltime"?"FULL TIME":t.half===2?"2ND HALF":"1ST HALF",clockText:this.cfg.clockText?this.cfg.clockText(t):void 0,noArrow:this.cfg.noArrow}}setPaused(t){this.paused=t,this.ctl&&t&&(this.ctl.buffer.length=0)}dispose(){for(let t of this.unsubs)t();this.unsubs=[],this.replay=null,this.pendingReplay=null,this.hud.setReplay(!1),this.hud.onSkipReplay=null,this.audio.stopCrowd(),this.view.markers.hideAll()}};var Zu="firsttouch.settings.v1",gm="firsttouch.style";var kc={rev:3,sensitivity:1,invertY:!1,fov:100,master:.8,sfx:.9,crowd:.6,difficulty:"assisted",bob:!0,shake:!0,quality:"high",matchLength:"normal",touch:"auto",replays:!0};function xm(){try{return!!localStorage.getItem(Zu)}catch{return!1}}function ym(s=!1){let t=()=>({...kc,...s?{sensitivity:2.25}:{}});try{let e=localStorage.getItem(Zu);if(!e)return t();let n={...kc,...JSON.parse(e)};return(n.rev||1)<2&&n.fov===85&&(n.fov=kc.fov),(n.rev||1)<3&&s&&n.sensitivity===1&&(n.sensitivity=2.25),n.rev=3,n.fov=Math.min(200,Math.max(60,Number(n.fov)||kc.fov)),n}catch{return t()}}function vm(s){try{return localStorage.setItem(Zu,JSON.stringify(s)),!0}catch{return!1}}function _m(){try{let s=localStorage.getItem(gm);return s==="neo"||s==="classic"?s:"classic"}catch{return"classic"}}function bm(s){try{localStorage.setItem(gm,s)}catch{}}var Ju=[{tier:1,league:"League Two",venue:"community",label:"League Two"},{tier:2,league:"League One",venue:"town",label:"League One"},{tier:3,league:"Championship",venue:"regional",label:"Championship"},{tier:4,league:"Premier League",venue:"premier",label:"Premier League"},{tier:5,league:"European Elite",venue:"continental",label:"European Elite"}],yn=[{id:"swindon",name:"Swindon Town",short:"SWI",tier:1,colors:["#d1101e","#ffffff","#ffffff"],style:"wing",crest:{shape:"shield",pattern:"chevron",symbol:"S"},ground:"County Ground"},{id:"chesterfield",name:"Chesterfield",short:"CHF",tier:1,colors:["#0a3d91","#ffffff","#ffffff"],style:"direct",crest:{shape:"circle",pattern:"chevron",symbol:"C"},ground:"SMH Group Stadium"},{id:"bromley",name:"Bromley",short:"BRO",tier:1,colors:["#f5f5f5","#111111","#111111"],style:"counter",crest:{shape:"diamond",pattern:"chevron",symbol:"B"},ground:"Hayes Lane"},{id:"grimsby",name:"Grimsby Town",short:"GRI",tier:1,colors:["#151515","#f5f5f5","#151515"],style:"possession",crest:{shape:"shield",pattern:"stripes",symbol:"G"},ground:"Blundell Park"},{id:"bradford",name:"Bradford City",short:"BRA",tier:2,colors:["#7d1d3f","#f6a800","#111111"],style:"possession",crest:{shape:"shield",pattern:"stripes",symbol:"B"},ground:"Valley Parade"},{id:"barnsley",name:"Barnsley",short:"BNS",tier:2,colors:["#d71920","#ffffff","#ffffff"],style:"pressing",crest:{shape:"circle",pattern:"chevron",symbol:"B"},ground:"Oakwell"},{id:"wigan",name:"Wigan Athletic",short:"WIG",tier:2,colors:["#1d59af","#ffffff","#1d59af"],style:"direct",crest:{shape:"hex",pattern:"stripes",symbol:"W"},ground:"Brick Community Stadium"},{id:"plymouth",name:"Plymouth Argyle",short:"PLY",tier:2,colors:["#00573f","#ffffff","#111111"],style:"wing",crest:{shape:"diamond",pattern:"chevron",symbol:"P"},ground:"Home Park"},{id:"westham",name:"West Ham United",short:"WHU",tier:3,colors:["#7a263a","#1bb1e7","#ffffff"],style:"pressing",crest:{shape:"shield",pattern:"quarters",symbol:"W"},ground:"London Stadium"},{id:"wolves",name:"Wolverhampton Wanderers",short:"WOL",tier:3,colors:["#fdb913","#231f20","#231f20"],style:"counter",crest:{shape:"circle",pattern:"chevron",symbol:"W"},ground:"Molineux"},{id:"southampton",name:"Southampton",short:"SOU",tier:3,colors:["#d71920","#ffffff","#111111"],style:"wing",crest:{shape:"hex",pattern:"stripes",symbol:"S"},ground:"St Mary's Stadium"},{id:"swansea",name:"Swansea City",short:"SWA",tier:3,colors:["#f5f5f5","#121212","#f5f5f5"],style:"possession",crest:{shape:"shield",pattern:"chevron",symbol:"S"},ground:"Swansea.com Stadium"},{id:"mancity",name:"Manchester City",short:"MCI",tier:4,colors:["#6cabdd","#1c2c5b","#ffffff"],style:"possession",crest:{shape:"circle",pattern:"chevron",symbol:"M"},ground:"Etihad Stadium"},{id:"arsenal",name:"Arsenal",short:"ARS",tier:4,colors:["#ef0107","#ffffff","#ffffff"],style:"pressing",crest:{shape:"shield",pattern:"quarters",symbol:"A"},ground:"Emirates Stadium"},{id:"liverpool",name:"Liverpool",short:"LIV",tier:4,colors:["#c8102e","#f6eb61","#c8102e"],style:"direct",crest:{shape:"shield",pattern:"chevron",symbol:"L"},ground:"Anfield"},{id:"chelsea",name:"Chelsea",short:"CHE",tier:4,colors:["#034694","#ffffff","#034694"],style:"counter",crest:{shape:"circle",pattern:"chevron",symbol:"C"},ground:"Stamford Bridge"},{id:"realmadrid",name:"Real Madrid",short:"RMA",tier:5,colors:["#f5f5f5","#1c2b5a","#f5f5f5"],style:"counter",crest:{shape:"circle",pattern:"crown",symbol:"R"},ground:"Santiago Bernab\xE9u"},{id:"barcelona",name:"FC Barcelona",short:"BAR",tier:5,colors:["#a50044","#004d98","#004d98"],style:"possession",crest:{shape:"shield",pattern:"stripes",symbol:"B"},ground:"Camp Nou"},{id:"bayern",name:"Bayern M\xFCnchen",short:"BAY",tier:5,colors:["#dc052d","#ffffff","#dc052d"],style:"pressing",crest:{shape:"circle",pattern:"chevron",symbol:"B"},ground:"Allianz Arena"},{id:"psg",name:"Paris Saint-Germain",short:"PSG",tier:5,colors:["#004170","#da291c","#004170"],style:"wing",crest:{shape:"hex",pattern:"band",symbol:"P"},ground:"Parc des Princes"}],ju={millbrook:"swindon",ashford:"chesterfield",kettle:"bromley",harbour:"grimsby",oldbridge:"bradford",fenwick:"barnsley",stonegate:"wigan",crowmere:"plymouth",redcliffe:"westham",northvale:"wolves",easthaven:"southampton",marlow:"swansea",kingsport:"mancity",westmoor:"arsenal",ironside:"liverpool",solace:"chelsea",valmonte:"realmadrid",nordhavn:"barcelona",castellan:"bayern",aurelio:"psg"},ne=s=>yn.find(t=>t.id===s)||yn.find(t=>t.id===ju[s]),us=s=>yn.filter(t=>t.tier===s),Vn=s=>Ju[s-1];function ko(s){let t=yn.filter(e=>e.tier===s.tier).indexOf(s);return 38+s.tier*9+(3-t)*1.5}function ds(s,t=48){let[e,n]=s.colors,i=s.crest,r={shield:"M6 4 H42 V22 C42 34 33 42 24 46 C15 42 6 34 6 22 Z",circle:"M24 3 A21 21 0 1 1 23.99 3 Z",diamond:"M24 2 L46 24 L24 46 L2 24 Z",hex:"M14 4 H34 L45 24 L34 44 H14 L3 24 Z"}[i.shape]||"M6 4 H42 V22 C42 34 33 42 24 46 C15 42 6 34 6 22 Z",o=`c${s.id}${t}`,a="";switch(i.pattern){case"chevron":a=`<path d="M0 26 L24 12 L48 26 V34 L24 20 L0 34 Z" fill="${n}"/>`;break;case"stripes":a=[10,22,34].map(h=>`<rect x="${h}" y="0" width="6" height="48" fill="${n}"/>`).join("");break;case"half":a=`<rect x="24" y="0" width="24" height="48" fill="${n}"/>`;break;case"band":a=`<rect x="0" y="18" width="48" height="10" fill="${n}"/>`;break;case"quarters":a=`<rect x="24" y="0" width="24" height="24" fill="${n}"/><rect x="0" y="24" width="24" height="24" fill="${n}"/>`;break;case"crown":a=`<path d="M13 16 L17 8 L21 14 L24 6 L27 14 L31 8 L35 16 Z" fill="${n}"/>`;break;default:break}let c=(h=>{let u=parseInt(h.slice(1),16);return((u>>16)*.3+(u>>8&255)*.59+(u&255)*.11)/255})(e)>.6?"#111":"#fff";return`<svg class="crest" width="${t}" height="${t}" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="${o}"><path d="${r}"/></clipPath></defs><g clip-path="url(#${o})"><rect width="48" height="48" fill="${e}"/>${a}</g><path d="${r}" fill="none" stroke="#111" stroke-width="2.5"/><text x="24" y="${i.pattern==="crown"?36:31}" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="15" text-anchor="middle" fill="${c}" stroke="${c==="#fff"?"#111":"#fff"}" stroke-width="0.6">${i.symbol}</text></svg>`}var wm=["England","Scotland","Wales","Ireland","France","Spain","Portugal","Italy","Germany","Netherlands","Belgium","Denmark","Norway","Sweden","Poland","Croatia","Serbia","Greece","Turkey","Morocco","Nigeria","Ghana","Senegal","Egypt","Brazil","Argentina","Uruguay","Colombia","Mexico","USA","Canada","Japan","South Korea","Australia"],Mm=["Alex","Sam","Jordan","Luca","Mateo","Noah","Kai","Theo","Rafa","Idris","Tomas","Jonas","Emil","Kofi","Yusuf","Diego","Ben","Oscar","Leo","Marco","Hugo","Ruben","Nico","Arlo","Felix","Ade","Kenji","Milo","Sven","Ivo"],Sm=["Hart","Moreno","Okafor","Lindqvist","Bennett","Costa","Novak","Reyes","Walsh","Kowalski","Mensah","Rossi","Dubois","Larsen","Silva","Ibrahim","Clarke","Varga","Tanaka","Moss","Keane","Adeyemi","Brandt","Petrov","Ferreira","Holt","Quinn","Sato","Doyle","Marsh"];function Tm(s,t){let e=0;for(let r of s)e=e*31+r.charCodeAt(0)>>>0;let n=Mm[(e+t*7)%Mm.length],i=Sm[(e*3+t*11)%Sm.length];return`${n[0]}. ${i}`}var _1={GK:{},DEF:{tackling:7,stamina:2,pace:1},CM:{passing:5,stamina:4,control:1},AM:{passing:4,control:4,finishing:1},W:{pace:6,control:3},ST:{finishing:6,pace:3}},b1={GK:[1],DEF:[2,5,4,3],CM:[6,8,4],AM:[10,8],W:[7,11],ST:[9,10]};function M1(s,t,e){let n={};for(let i of["pace","stamina","control","passing","finishing","tackling"])n[i]=Math.round(t+e.range(-4,4)+(_1[s][i]||0)-(i==="tackling"&&(s==="ST"||s==="W")?6:0)-(i==="finishing"&&s==="DEF"?6:0));return n}function No(s,t={}){let e=t.human||null,n=new yi(vi(s.id+(t.seed||""))),i=t.strength??ko(s),r=Ec(s.style,e?e.role:null),o=Po[r],a=new Set;e&&a.add(e.number);let l=o.map((c,h)=>{let d=(b1[c.role]||[h+1]).find(m=>!a.has(m));if(d==null)for(d=12;a.has(d);)d++;return a.add(d),{role:c.role,number:d,name:Tm(s.id,h),attrs:M1(c.role,i,n),keeping:Math.round(i+4+n.range(-3,3)),foot:n.next()<.78?"R":"L"}});if(e){let c=l.findIndex(u=>u.role===e.role),h=c>=0?c:l.findIndex(u=>u.role!=="GK");l[h]={role:e.role,number:e.number,name:e.name,attrs:{...e.attrs},foot:e.foot||"R",isHuman:!0,look:e.look}}return{name:s.name,short:s.short,tier:s.tier,style:s.style,formation:r,players:l,clubId:s.id}}function Ds(){return{name:"A. Newcomer",number:9,nationality:"England",foot:"R",role:"ST",attrs:{pace:52,stamina:50,control:50,passing:48,finishing:54,tackling:42},look:{skin:"#e0b48c",hair:"#3b2a1e",boots:"#111111"}}}var Do=2,td=["pace","stamina","control","passing","finishing","tackling"],Am={pace:"Pace",stamina:"Stamina",control:"Ball control",passing:"Passing",finishing:"Finishing",tackling:"Tackling"},fs=s=>(So.find(t=>t.id===s)||{name:s}).name,S1={ST:{finishing:6,pace:3},W:{pace:6,control:3},AM:{passing:4,control:5},CM:{passing:5,stamina:4},DEF:{tackling:7,stamina:2}};function w1(s){let t={pace:47,stamina:47,control:46,passing:46,finishing:45,tackling:44};for(let[e,n]of Object.entries(S1[s]||{}))t[e]+=n;return t}var Rm={1:{avg:5.8,rep:0,apps:0},2:{avg:6.6,rep:10,apps:3},3:{avg:6.9,rep:28,apps:5},4:{avg:7.1,rep:48,apps:5},5:{avg:7.3,rep:68,apps:5}},Cm=[0,160,650,2600,11e3,42e3];function Im(){return{apps:0,minutes:0,goals:0,assists:0,ratingSum:0,passCmp:0,passAtt:0,shots:0,shotsOn:0,tackles:0,interceptions:0,possLost:0,fouls:0,motm:0,wins:0,draws:0,losses:0,trophies:0}}function T1(s){let[t,e,n,i]=s,r=[[[t,e],[n,i]],[[n,t],[i,e]],[[t,i],[e,n]]],o=r.map(a=>a.map(([l,c])=>[c,l]));return[...r,...o]}function ed(s,t,e){let n=ne(t),i=us(n.tier).map(l=>l.id),r=new yi(vi(`${s.seed}:${e}:${n.tier}`));for(let l=i.length-1;l>0;l--){let c=Math.floor(r.next()*(l+1));[i[l],i[c]]=[i[c],i[l]]}let o=T1(i),a=[];return o.forEach((l,c)=>l.forEach(([h,u])=>a.push({round:c+1,home:h,away:u,score:null}))),{no:e,tier:n.tier,league:Vn(n.tier).league,fixtures:a,round:1,table:i.map(l=>({id:l,p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0})),finished:!1,final:null,placement:null}}function nd(s){return[...s.table].sort((t,e)=>e.pts-t.pts||e.gf-e.ga-(t.gf-t.ga)||e.gf-t.gf||t.id.localeCompare(e.id))}function Pm(s,t,e,n){t.score=[e,n];let i=s.table.find(o=>o.id===t.home),r=s.table.find(o=>o.id===t.away);i.p++,r.p++,i.gf+=e,i.ga+=n,r.gf+=n,r.ga+=e,e>n?(i.w++,r.l++,i.pts+=3):e<n?(r.w++,i.l++,r.pts+=3):(i.d++,r.d++,i.pts++,r.pts++)}function Em(s,t){let e=Math.exp(-t),n=0,i=1;do n++,i*=s.next();while(i>e&&n<10);return n-1}function Lm(s,t,e){let n=new yi(vi(`${s.seed}:${t.no}:${t.tier}:${e.round}:${e.home}:${e.away}`)),i=ko(ne(e.home))+2.5,r=ko(ne(e.away)),o=Math.max(.3,1.35*Math.pow(i/r,1.6)),a=Math.max(.3,1.15*Math.pow(r/i,1.6));Pm(t,e,Em(n,o),Em(n,a))}function id(s){let t=s.season;return t.finished?t.final&&!t.final.played?{final:!0,...t.final}:null:t.fixtures.find(e=>e.round===t.round&&(e.home===s.clubId||e.away===s.clubId))||null}function km(s,t=Date.now()%1e9|0){let e=new yi(t),n=us(1),i=s.clubId?ne(s.clubId):n[Math.floor(e.next()*n.length)],r={version:Do,seed:t,createdAt:Date.now(),player:{name:s.name,number:s.number,nationality:s.nationality,foot:s.foot,role:s.role,look:{...s.look},attrs:w1(s.role),xp:0,points:0,level:1,reputation:5},clubId:i.id,contract:{clubId:i.id,wage:Cm[1],years:2,role:`Starting ${fs(s.role)}`,expectations:"Average rating 6.0+, learn the game",signedSeason:1},seasonNo:1,season:null,form:[],appsAtClub:0,totals:Im(),seasons:[],matchLog:[],timeline:[],trophies:[],window:null,trainingAvailable:!0,committed:[],nextMatchId:1,earnings:0,flags:{}};return r.season=ed(r,i.id,1),Os(r),vn(r,`Signed for ${i.name} (${Vn(1).league}) as ${fs(s.role)}`,"transfer"),r}function Os(s){let t=s.seasons.find(e=>e.season===s.seasonNo&&e.clubId===s.clubId);return t||(t={season:s.seasonNo,clubId:s.clubId,tier:ne(s.clubId).tier,...Im(),placement:null},s.seasons.push(t)),t}function vn(s,t,e="info"){s.timeline.push({season:s.seasonNo,round:s.season?s.season.round:0,text:t,kind:e})}function Nm(s){let t=id(s);return t?{id:`m${s.nextMatchId}`,fx:t,clubId:s.clubId}:null}function Dm(s,t,e,n){if(s.committed.includes(t))return{duplicate:!0};s.committed.push(t),s.committed.length>200&&s.committed.splice(0,s.committed.length-200),s.nextMatchId++;let i=s.season,r=ne(s.clubId),o=e.home===s.clubId,[a,l]=n.score,c=o?a:l,h=o?l:a,u=n.stats,d=n.rating,m={xp:0,levelUps:0,rep:0,notes:[]};if(e.final)i.final.played=!0,i.final.score=[a,l],i.final.won=c>h||c===h&&n.penaltyWin;else{let _=i.fixtures.find(b=>b.round===e.round&&b.home===e.home&&b.away===e.away);Pm(i,_,a,l);for(let b of i.fixtures)b.round===e.round&&!b.score&&Lm(s,i,b);i.round++}let g=Os(s);for(let _ of[s.totals,g])_.apps++,_.minutes+=n.minutes,_.goals+=u.goals,_.assists+=u.assists,_.ratingSum+=d,_.passCmp+=u.passCmp,_.passAtt+=u.passAtt,_.shots+=u.shots,_.shotsOn+=u.shotsOn,_.tackles+=u.tacklesWon,_.interceptions+=u.interceptions,_.possLost+=u.possLost,_.fouls+=u.fouls,n.motm&&_.motm++,c>h?_.wins++:c<h?_.losses++:_.draws++;let x=o?e.away:e.home;s.matchLog.push({season:s.seasonNo,round:e.final?"F":e.round,clubId:s.clubId,opp:x,home:o,score:[c,h],rating:d,goals:u.goals,assists:u.assists,passCmp:u.passCmp,passAtt:u.passAtt,tackles:u.tacklesWon,interceptions:u.interceptions,keyPasses:u.keyPasses,shotsOn:u.shotsOn,tier:r.tier}),s.matchLog.length>400&&s.matchLog.shift(),s.form.push(d),s.form.length>10&&s.form.shift(),s.appsAtClub++;let f=s.totals;s.appsAtClub===1&&vn(s,`Debut for ${r.name} vs ${ne(x).name} (rating ${d.toFixed(1)})`,"debut"),u.goals>0&&f.goals===u.goals&&vn(s,`First career goal, vs ${ne(x).name}`,"goal"),u.assists>0&&f.assists===u.assists&&vn(s,`First career assist, vs ${ne(x).name}`,"assist"),u.goals>=3&&vn(s,`Hat-trick vs ${ne(x).name}!`,"goal"),n.motm&&f.motm===1&&vn(s,"First Player of the Match award","award");let p=(d-6.3)*2.5+(r.tier-1)*.8+u.goals*.6+u.assists*.4;s.player.reputation=Math.max(0,Math.min(100,s.player.reputation+p)),m.rep=p;let y=Math.round(30+Math.max(0,d-5.5)*25+u.goals*12+u.assists*8+(c>h?10:0));return m.levelUps=sd(s,y),m.xp=y,s.earnings+=s.contract.wage,s.trainingAvailable=!0,!e.final&&i.round===4&&!i.finished&&ad(s,"mid"),!e.final&&i.round>6&&E1(s),e.final&&A1(s),m}function sd(s,t){let e=s.player;e.xp+=t;let n=0;for(;e.xp>=100;)e.xp-=100,e.points++,e.level++,n++;return n}function rd(s){return s<60?3:s<75?2:1}function Om(s,t){let e=s.player;return e.points<=0||!td.includes(t)||e.attrs[t]>=99?!1:(e.attrs[t]=Math.min(99,e.attrs[t]+rd(e.attrs[t])),e.points--,!0)}function E1(s){let t=s.season;t.finished=!0;let e=nd(t),n=e.findIndex(r=>r.id===s.clubId)+1;t.placement=n,Os(s).placement=n;let i=Vn(t.tier).league;if(n===1){let r=`${i} champions (Season ${s.seasonNo})`;s.trophies.push({season:s.seasonNo,name:`${i} title`,clubId:s.clubId}),s.totals.trophies++,Os(s).trophies++,vn(s,`Won the ${i} with ${ne(s.clubId).name}!`,"trophy")}else vn(s,`Finished ${Nc(n)} in the ${i}`,"season");if(t.tier===5&&n<=2){let r=e[n===1?1:0].id;t.final={home:s.clubId,away:r,played:!1,name:"Continental Cup Final",round:"F"};return}ad(s,"end")}function A1(s){s.season.final.won?(s.trophies.push({season:s.seasonNo,name:"Continental Cup",clubId:s.clubId}),s.totals.trophies++,Os(s).trophies++,vn(s,`Lifted the Continental Cup with ${ne(s.clubId).name}!`,"trophy")):vn(s,"Runner-up in the Continental Cup Final","season"),ad(s,"end")}function Nc(s){return s+(["th","st","nd","rd"][(s%100-20)%10]||["th","st","nd","rd"][s%100]||"th")}function Um(s,t=5){return s.matchLog.filter(e=>e.season>=s.seasonNo-1).slice(-t)}function R1(s,t){let e=s.player.role,n=Math.max(1,t.length),i=c=>t.reduce((h,u)=>h+(u[c]||0),0),r=i("passAtt"),o=i("passCmp"),a=r?o/r:0,l=(i("tackles")+i("interceptions"))/n;switch(e){case"ST":return{value:(i("goals")+.5*i("assists")+.15*i("shotsOn"))/n,label:"goal threat",unit:"goal involvements per match"};case"W":return{value:(i("goals")+i("assists")+.2*i("keyPasses"))/n,label:"goals and chance creation",unit:"contributions per match"};case"AM":return{value:(i("assists")+i("goals")+.3*i("keyPasses"))/n,label:"strong passing and chance creation",unit:"chances per match"};case"CM":return{value:a*.6+l*.12+.2*i("keyPasses")/n,label:"reliable passing and ball winning",unit:"index",acc:a,def:l};default:return{value:l*.22+a*.45,label:"defensive solidity and distribution",unit:"index",acc:a,def:l}}}var C1={ST:[.3,.42,.52,.6],W:[.3,.4,.5,.58],AM:[.32,.42,.52,.6],CM:[.55,.62,.68,.74],DEF:[.62,.7,.78,.86]};function I1(s,t){let e=Rm[t.tier],n=Um(s,5),i=n.length?n.reduce((f,p)=>f+p.rating,0)/n.length:0,r=s.player.reputation,o=R1(s,n),a=C1[s.player.role][Math.max(0,t.tier-2)]??.5,l=n.length<3?0:Math.max(0,Math.min(1,(i-(e.avg-1.2))/1.2)),c=e.rep?Math.min(1,r/e.rep):1,h=Math.min(1,o.value/a),u=Math.min(1,s.appsAtClub/Math.max(1,e.apps)),d=P1(s,t),m=d?.45*l+.25*h+.2*c+.1*u:.15*c,g=d&&n.length>=3&&i>=e.avg&&r>=e.rep&&h>=.85&&s.appsAtClub>=e.apps,x=d?`Average rating ${e.avg.toFixed(1)} over 5 matches (you: ${n.length?i.toFixed(2):"-"}); reputation ${e.rep}+ (you: ${Math.round(r)}); ${o.label}; ${e.apps}+ appearances for your current club (you: ${s.appsAtClub}).`:`No ${fs(s.player.role).toLowerCase()} role available at the moment.`;return{club:t,score:m,qualifies:g,avg:i,rep:r,needs:d,text:x,contrib:o,conS:h}}function P1(s,t){let e=Math.floor(s.seasonNo*2+(s.season.round>3?1:0));return vi(`${s.seed}:${t.id}:${s.player.role}:${e}`)%5!==0}function od(s){let t=ne(s.clubId).tier;return(t<5?us(t+1):[]).map(n=>I1(s,n)).sort((n,i)=>i.score-n.score)}function Qu(s,t){return Math.round(Cm[s]*(.9+Math.max(0,t-6.5)*.25)/10)*10}function ad(s,t){let e=[],n=ne(s.clubId);for(let i of od(s)){if(!i.qualifies)continue;let r=[`Recent form: average ${i.avg.toFixed(2)} over the last 5 matches`,`Reputation ${Math.round(i.rep)}`],o=i.contrib;o.acc!=null?r.push(`${o.label} (pass accuracy ${Math.round(o.acc*100)}%, ${o.def.toFixed(1)} tackles + interceptions per match)`):r.push(`${o.label}: ${o.value.toFixed(2)} ${o.unit}`),e.push({clubId:i.club.id,tier:i.club.tier,role:`Starting ${fs(s.player.role)}`,wage:Qu(i.club.tier,i.avg),years:2+vi(i.club.id+s.seasonNo)%2,expectations:`Average rating ${(Rm[i.club.tier].avg-.2).toFixed(1)}+ and ${o.label}`,reasons:r,kind:"transfer"})}if(e.sort((i,r)=>r.wage-i.wage),e.splice(3),t==="end"){let i=s.contract.years<=1,r=Um(s,5),o=r.length?r.reduce((a,l)=>a+l.rating,0)/r.length:6;if(i&&(e.push({clubId:n.id,tier:n.tier,role:`Starting ${fs(s.player.role)}`,wage:Qu(n.tier,o),years:2,expectations:"Keep your place in the side",reasons:["Contract renewal offer"],kind:"renewal"}),o<6.2&&n.tier>1)){let a=us(n.tier-1)[vi(s.seed+":"+s.seasonNo)%4];e.push({clubId:a.id,tier:a.tier,role:`Starting ${fs(s.player.role)}`,wage:Qu(a.tier,o),years:2,expectations:"Rebuild your form with regular football",reasons:["Guaranteed starting place"],kind:"transfer"})}}return s.window={type:t,offers:e,season:s.seasonNo,round:s.season.round},e.length&&vn(s,`${t==="end"?"Season-end":"Mid-season"} window: ${e.length} offer${e.length>1?"s":""}`,"window"),s.window}function zm(s,t){let e=s.window;if(!e)return!1;let n=e.offers[t];if(!n)return!1;let i=ne(n.clubId);if(n.kind==="renewal")return s.contract={clubId:i.id,wage:n.wage,years:n.years+1,role:n.role,expectations:n.expectations,signedSeason:s.seasonNo},vn(s,`Signed a new ${n.years}-season contract with ${i.name}`,"contract"),s.window=null,!0;let r=ne(s.clubId);if(s.clubId=i.id,s.contract={clubId:i.id,wage:n.wage,years:n.years+(e.type==="end"?1:0),role:n.role,expectations:n.expectations,signedSeason:s.seasonNo},s.appsAtClub=0,vn(s,`Transferred from ${r.name} to ${i.name} (${Vn(i.tier).league})`,"transfer"),s.window=null,e.type==="mid"){let o=ed(s,i.id,s.seasonNo),a=s.season.round-1;for(let l of o.fixtures)l.round<=a&&Lm(s,o,l);o.round=a+1,s.season=o,Os(s)}return!0}function Fm(s){if(!s.window)return;let e=s.window.offers.some(n=>n.kind==="renewal");s.window=null,e&&s.contract.years<=1&&(s.contract.years=2,vn(s,`Stayed at ${ne(s.clubId).name} on a rolling contract`,"contract"))}function Bm(s){let t=s.season;return t.finished&&(!t.final||t.final.played)&&!s.window}function Hm(s){s.seasonNo++,s.contract.years=Math.max(0,s.contract.years-1),s.season=ed(s,s.clubId,s.seasonNo),Os(s),s.trainingAvailable=!0,vn(s,`Season ${s.seasonNo} begins with ${ne(s.clubId).name}`,"season")}function Gm(s){return s.apps?s.ratingSum/s.apps:0}var Oo={passing:{name:"Passing Gates",time:45,desc:"Pass through the highlighted gate to the teammate behind it. Each clean pass through a gate scores."},finishing:{name:"Finishing",time:50,desc:"Balls are served into the box. Finish past the goalkeeper - first-time finishes are encouraged."},dribbling:{name:"Dribbling Course",time:60,desc:"Dribble the ball through every gate in order, as fast as you can."},practice:{name:"Free Practice",time:0,desc:"Receive, pass, move and shoot with a teammate against a defender and a goalkeeper. No timer, no XP."}};function Vm(s,t,e,n,i,r,o,a){let l=(e-s)*(r-t)-(n-t)*(i-s),c=(e-s)*(a-t)-(n-t)*(o-s),h=(o-i)*(t-r)-(a-r)*(s-i),u=(o-i)*(n-r)-(a-r)*(e-i);return l*c<0&&h*u<0}function Li(s,t,e,n,i={}){return{role:s,number:t,name:e,attrs:n||{pace:55,stamina:70,control:60,passing:60,finishing:50,tackling:50},keeping:55,foot:"R",...i}}var Dc=class{constructor(t,e){this.kind=t,this.def=Oo[t],this.human=e,this.score=0,this.t=0,this.done=!1,this.events=[],this.props=null}matchConfig(){let t={...this.human,isHuman:!0,name:this.human.name,attrs:{...this.human.attrs}},e,n;switch(this.kind){case"passing":t.role="CM",e=[t,Li("W",11,"Station A"),Li("W",7,"Station B"),Li("ST",9,"Station C"),Li("AM",10,"Station D")],n=[];break;case"finishing":t.role="ST",e=[t,Li("CM",8,"Coach")],n=[Li("GK",1,"Keeper",null)];break;case"dribbling":t.role="W",e=[t],n=[];break;default:e=[t,Li("CM",8,"Teammate")],n=[Li("DEF",4,"Defender",{pace:50,stamina:70,control:45,passing:45,finishing:40,tackling:52}),Li("GK",1,"Keeper")]}let i=(r,o)=>({name:r,short:r.slice(0,3).toUpperCase(),tier:1,style:"wing",players:o});return{seed:7+Math.floor(Math.random()*1e3),halfLength:1e6,difficulty:"assisted",rules:!1,mode:"drill",teams:[i("Training",e),n.length?i("Opposition",n):null]}}setup(t,e){this.m=t,this.view=e,t.phase="playing",t.clock=0;let n=t.human;this.h=n;for(let r of t.players)r.scripted=!r.isHuman&&!r.isGK&&this.kind!=="practice";let i=new De;if(this.kind==="passing"){this.center=new ot(-4,0,0),n.pos.copy(this.center);let r=[[10,9],[10,-9],[-12,11],[-12,-11]];this.stations=[];let o=t.teams[0].players.filter(a=>!a.isHuman);r.forEach(([a,l],c)=>{let h=o[c];h.pos.set(this.center.x+a,0,this.center.z+l),h.home={station:h.pos.clone()};let u=this.center.x+a*.5,d=this.center.z+l*.5,m=Math.hypot(a,l),g=-l/m,x=a/m,f={p:h,a:new ot(u+g*1.1,0,d+x*1.1),b:new ot(u-g*1.1,0,d-x*1.1),c:new ot(u,0,d)};this.stations.push(f),i.cone(C.CONE,.16,.42,10,f.a.x,.21,f.a.z),i.cone(C.CONE,.16,.42,10,f.b.x,.21,f.b.z)}),this.active=0,this.pickActive(),this.resetBall()}else if(this.kind==="finishing")n.pos.set(Z.HL-15,0,0),this.server=t.teams[0].players.find(r=>!r.isHuman),this.served=0,this.maxBalls=8,this.serve();else if(this.kind==="dribbling"){this.gates=[],[-20,-14,-8,-2,4,10,16,22].forEach((a,l)=>{let c=l%2?-4:4,h={a:new ot(a,0,c-1.25),b:new ot(a,0,c+1.25),c:new ot(a,0,c)};this.gates.push(h),i.cone(C.CONE,.16,.42,10,h.a.x,.21,h.a.z),i.cone(C.CONE,.16,.42,10,h.b.x,.21,h.b.z),i.box(C.TARGET,.05,.05,2.5,a,.6,c)});let o={a:new ot(27,0,-3),b:new ot(27,0,3),c:new ot(27,0,0),finish:!0};this.gates.push(o);for(let a=-3;a<=3;a+=1.5)i.cone(C.TARGET,.14,.36,10,27,.18,a);n.pos.set(-27,0,0),n.yaw=Math.PI/2,t.ball.place(-26.2,0),t.ball.state="free",this.next=0,this.started=!1}else n.pos.set(-6,0,0),n.yaw=Math.PI/2,t.teams[0].players.find(o=>!o.isHuman).pos.set(4,0,10),t.teams[1].players.find(o=>!o.isGK).pos.set(14,0,0),t.keeper(1).pos.set(Z.HL-1,0,0),this.resetBall(!0);for(let r of t.players)r.prevPos.copy(r.pos),r.isHuman||(r.yaw=Bt(n.pos.x-r.pos.x,n.pos.z-r.pos.z)),r.prevYaw=r.yaw;if(n.yaw||(n.yaw=Math.PI/2),t.events.emit("humanYaw",{yaw:this.kind==="passing"?Bt(this.stations[this.active].c.x-n.pos.x,this.stations[this.active].c.z-n.pos.z):Math.PI/2}),i.vcount){this.props=new tn,this.props.add(new se(i.buildSolid(),fi({})));let r=new se(i.buildEdges(),Qn({}));r.frustumCulled=!1,this.props.add(r),e.scene.add(this.props)}t.preStep=r=>this.preStep(r)}dispose(){this.props&&(this.view.scene.remove(this.props),this.props.traverse(t=>t.geometry&&t.geometry.dispose())),this.m&&(this.m.preStep=null)}resetBall(t=!1){let e=this.m,n=this.h,i=n.yaw;e.ball.place(n.pos.x+Math.sin(i)*.7,n.pos.z+Math.cos(i)*.7),e.ball.state="free",e.ball.owner=null,e.ball.lastKick=null,this.lastKickSeen=null,this.gateOk=!1,this.resetAt=null,t&&(e.passIntent=null)}pickActive(){let t=this.active;for(;t===this.active;)t=Math.floor(Math.random()*this.stations.length);this.active=t}serve(){let t=this.m,e=this.server,n=this.h,i=Math.random()<.5?1:-1;e.pos.set(Z.HL-9-Math.random()*6,0,i*(13+Math.random()*3)),e.prevPos.copy(e.pos),e.vel.set(0,0,0),e.yaw=Bt(n.pos.x-e.pos.x,n.pos.z-e.pos.z),t.ball.place(e.pos.x+Math.sin(e.yaw)*.6,e.pos.z+Math.cos(e.yaw)*.6),t.ball.state="free",t.ball.owner=null,t.ball.lastKick=null,this.serveAt=t.time+.9,this.shotAt=null,this.resetAt=null,this.served++,this.ballDone=!1}preStep(t){let e=this.m,n=this.h,i=e.ball,r=e.time;if(this.kind==="passing")for(let o of this.stations){let a=o.p,l=a.home.station,c=a.pos.distXZ(l);if(i.owner===a)a.desired.set(0,0,0),a.faceYaw=Bt(n.pos.x-a.pos.x,n.pos.z-a.pos.z),!a.action&&r-(a.gotAt||r)>.55&&ce(e,a,"pass",{target:n,ai:!0});else{a.gotAt=r;let h=i.pos.distXZ(a.pos);if(!i.owner&&h<4&&i.speed<12){let u=i.pos.x-a.pos.x,d=i.pos.z-a.pos.z;a.desired.set(u*2,0,d*2)}else c>.3?a.desired.set((l.x-a.pos.x)*2.5,0,(l.z-a.pos.z)*2.5):a.desired.set(0,0,0);a.faceYaw=Bt(i.pos.x-a.pos.x,i.pos.z-a.pos.z)}}else if(this.kind==="finishing"){let o=this.server;if(o.desired.set(0,0,0),o.faceYaw=Bt(n.pos.x-o.pos.x,n.pos.z-o.pos.z),this.serveAt&&r>=this.serveAt&&!o.action){this.serveAt=null;let a=Math.random()<.3,l=new ot(n.pos.x+(Math.random()-.5)*2,0,n.pos.z+(Math.random()-.5)*2);a?ce(e,o,"cross",{point:l,ai:!0,elev:.35}):ce(e,o,"pass",{target:n,ai:!0})}}}step(){let t=this.m,e=this.h,n=t.ball,i=t.time;if(this.done)return;this.t+=1/120;let r=this.def.time;if(this.kind==="passing"){let o=n.lastKick;o&&o!==this.lastKickSeen&&(this.lastKickSeen=o,o.player===e&&(this.gateOk=!1,this.passTarget=this.stations[this.active]));let a=this.stations[this.active];o&&o.player===e&&Vm(n.prevPos.x,n.prevPos.z,n.pos.x,n.pos.z,a.a.x,a.a.z,a.b.x,a.b.z)&&(this.gateOk=!0),n.owner&&n.owner!==e&&o&&o.player===e&&!this.resolved&&(this.resolved=!0,n.owner===a.p&&this.gateOk?(this.score++,this.note("GATE +1","good"),this.pickActive()):this.note(n.owner===a.p?"MISSED THE GATE":"WRONG TEAMMATE","bad")),n.owner===e&&(this.resolved=!1),!n.owner&&(n.pos.distXZ(this.center)>26||n.speed<.2&&n.pos.distXZ(e.pos)>3&&!this.stations.some(l=>l.p.pos.distXZ(n.pos)<3))&&(this.resetAt||(this.resetAt=i+.8),i>=this.resetAt&&this.resetBall()),this.view.markers.showIncoming(a.c.x,a.c.z)}else if(this.kind==="finishing"){let o=n.lastKick;o&&o.player===e&&o.kind==="shot"&&!this.shotAt&&(this.shotAt=i);let a=n.pos.x-pe>Z.HL&&n.crossing[0]&&n.crossing[0].inMouth;if(this.ballDone||(a?(this.score++,this.ballDone=!0,this.note(o&&o.firstTime?"FIRST-TIME GOAL!":"GOAL","good"),this.resetAt=i+1.4,t.events.emit("drillGoal",{pos:n.pos.clone()})):n.state==="held"?(this.ballDone=!0,this.note("SAVED","bad"),this.resetAt=i+1):n.pos.x-pe>Z.HL||Math.abs(n.pos.z)>Z.HW||this.shotAt&&i-this.shotAt>3.2?(this.ballDone=!0,this.note("MISSED","bad"),this.resetAt=i+.9):!this.shotAt&&this.serveAt==null&&n.speed<.3&&!n.owner&&i>6&&n.pos.distXZ(e.pos)>6&&(this.ballDone=!0,this.resetAt=i+.5)),this.resetAt&&i>=this.resetAt){t.keeper(1).hold&&(t.keeper(1).hold=null);let l=t.keeper(1);l.action=null,l.pos.set(Z.HL-1,0,0),this.served>=this.maxBalls?this.finish():this.serve()}}else if(this.kind==="dribbling"){!this.started&&(e.speed>.5||n.owner===e)&&(this.started=!0,this.t=0),this.started||(this.t=0);let o=this.gates[this.next];o&&Vm(n.prevPos.x,n.prevPos.z,n.pos.x,n.pos.z,o.a.x,o.a.z,o.b.x,o.b.z)&&n.lastTouch===e&&(this.next++,this.score=this.next,o.finish?(this.note(`FINISHED ${this.t.toFixed(1)} s`,"good"),this.finish()):this.note(`GATE ${this.next}/${this.gates.length-1}`,"good")),o&&this.view.markers.showIncoming(o.c.x,o.c.z),!n.owner&&n.speed<.2&&n.pos.distXZ(e.pos)>6?(this.resetAt||(this.resetAt=i+1),i>this.resetAt&&this.resetBall()):n.owner&&(this.resetAt=null)}else{let o=Math.abs(n.pos.z)-pe>Z.HW||Math.abs(n.pos.x)-pe>Z.HL,a=n.pos.x-pe>Z.HL&&n.crossing[0]&&n.crossing[0].inMouth;if((o||n.state==="held")&&!this.resetAt&&(a&&(this.score++,this.note("GOAL","good"),t.events.emit("drillGoal",{pos:n.pos.clone()})),this.resetAt=i+(n.state==="held"?1.2:1.5)),this.resetAt&&i>=this.resetAt){let l=t.keeper(1);l.hold=null,l.action=null,l.pos.set(Z.HL-1,0,0),this.resetBall(!0)}}r&&this.t>=r&&this.finish()}note(t,e){this.events.push({text:t,kind:e})}finish(){this.done||(this.done=!0,this.m.phase="fulltime",this.m.phaseT=0)}clockText(){if(!this.def.time)return`Goals ${this.score}`;let t=Math.max(0,this.def.time-this.t);return this.kind==="dribbling"?`${this.t.toFixed(1)} s \xB7 gate ${Math.min(this.next+1,this.gates.length)}/${this.gates.length}`:this.kind==="finishing"?`${Math.ceil(t)} s \xB7 goals ${this.score} \xB7 ball ${Math.min(this.served,this.maxBalls)}/${this.maxBalls}`:`${Math.ceil(t)} s \xB7 gates ${this.score}`}result(){let t=0,e="";if(this.kind==="passing")t=ht(Math.round(8+this.score*2.5),8,35),e=`${this.score} gate passes in ${this.def.time} s`;else if(this.kind==="finishing")t=ht(Math.round(8+this.score*4),8,35),e=`${this.score} goals from ${this.maxBalls} balls`;else if(this.kind==="dribbling"){let n=this.next>=this.gates.length;t=n?ht(Math.round(45-this.t),12,35):ht(4+this.next*2,4,18),e=n?`Course completed in ${this.t.toFixed(1)} s`:`${this.next} of ${this.gates.length} gates in the time limit`}return{xp:t,text:e,score:this.score}}};var Wm=120,$m="firsttouch.tutorial";function qm(){try{return!!localStorage.getItem($m)}catch{return!1}}function cd(s){try{localStorage.setItem($m,s)}catch{}}var Uo=[{id:"look",par:6,cap:12,say:"Find the golden star",hint:["Move the mouse","Drag on the right"]},{id:"move",par:7,cap:12,say:"Run to the glowing circle",hint:["W A S D","Drag with the left thumb"]},{id:"sprint",par:5,cap:10,say:"Sprint to the next circle",hint:["Hold Shift","Push the stick all the way"]},{id:"ball",par:5,cap:10,say:"Run into the ball",hint:["",""]},{id:"dribble",par:7,cap:14,say:"Dribble through the gate",hint:["",""]},{id:"pass",par:6,cap:12,say:"Pass to Jojo",hint:["Look at him, right-click","Look at him, tap PASS"]},{id:"receive",par:4,cap:8,say:"Let it come to your feet",hint:["",""]},{id:"shoot",par:8,cap:20,say:"Score past Sam!",hint:["Hold left click, release","Hold SHOOT, release"]},{id:"tackle",par:6,cap:14,say:"Win the ball back!",hint:["Get close, press E","Get close, tap TACKLE"]}],Xm=["Nice!","Lovely!","Class!","Sharp!","Easy!"],L1=[[9,"Superstar"],[7,"Starting XI"],[4,"Squad player"],[0,"Future legend"]];function k1(s,t,e,n,i,r,o,a){let l=(e-s)*(r-t)-(n-t)*(i-s),c=(e-s)*(a-t)-(n-t)*(o-s),h=(o-i)*(t-r)-(a-r)*(s-i),u=(o-i)*(n-r)-(a-r)*(e-i);return l*c<0&&h*u<0}var Or=(s,t=2)=>(s.x=ht(s.x,-Z.HL+t,Z.HL-t),s.z=ht(s.z,-Z.HW+t,Z.HW-t),s);function ld(s,t,e,n,i={}){return{role:s,number:t,name:e,attrs:n,keeping:55,foot:"R",...i}}var Oc=class{constructor(t){this.kind="tutorial",this.human=t,this.def={name:"Warm-up with Coach Ada",time:Wm},this.t=0,this.done=!1,this.timeUp=!1,this.events=[],this.idx=-1,this.stepT=0,this.stars=0,this.results=[],this.say="",this.waitUntil=null,this.endAt=null}matchConfig(){let e=[{...this.human,isHuman:!0,role:"CM",attrs:{...this.human.attrs}},ld("CM",8,"Jojo",{pace:55,stamina:80,control:70,passing:72,finishing:50,tackling:50})],n=[ld("DEF",5,"Big Barry",{pace:34,stamina:60,control:22,passing:30,finishing:20,tackling:20}),ld("GK",1,"Sleepy Sam",{pace:40,stamina:60,control:40,passing:40,finishing:20,tackling:20},{keeping:8})],i=(r,o)=>({name:r,short:r.slice(0,3).toUpperCase(),tier:1,style:"wing",players:o});return{seed:4242,halfLength:1e6,difficulty:"assisted",rules:!1,mode:"tutorial",teams:[i("Training",e),i("Coaches",n)]}}setup(t,e){this.m=t,this.view=e,t.phase="playing",t.clock=0,t.foul=()=>this.note("Careful, that's a foul!","bad"),t.checkDeadlock=()=>{};let n=this.h=t.human;this.jojo=t.teams[0].players.find(i=>!i.isHuman),this.barry=t.teams[1].players.find(i=>!i.isGK),this.sam=t.keeper(1),this.jojo.scripted=!0,this.barry.scripted=!0,t.aiParams[1]&&(t.aiParams[1].gkReaction=.8),n.pos.set(-8,0,0),n.yaw=Math.PI/2,this.jojo.pos.set(-4,0,9),this.barry.pos.set(-29,0,-18),this.sam.pos.set(Z.HL-1,0,0),this.sam.yaw=-Math.PI/2,this.parkBall();for(let i of t.players)i!==n&&i!==this.sam&&(i.yaw=Bt(n.pos.x-i.pos.x,n.pos.z-i.pos.z)),i.prevPos.copy(i.pos),i.prevYaw=i.yaw;this.buildProps(e),t.preStep=i=>this.preStep(i),t.events.emit("humanYaw",{yaw:n.yaw}),this.next()}buildProps(t){let e=c=>{let h=new tn;h.add(new se(c.buildSolid(),fi({})));let u=new se(c.buildEdges(),Qn({}));return u.frustumCulled=!1,h.add(u),h.visible=!1,h},n=new De;n.cone(C.GOLD,.42,.55,5,0,.275,0),n.cone(C.GOLD,.42,.55,5,0,-.275,0,{rx:Math.PI}),this.star=e(n);let i=new De;i.cone(C.CONE,.18,.5,10,0,.25,-1.3),i.cone(C.CONE,.18,.5,10,0,.25,1.3),i.box(C.TARGET,.06,.06,2.6,0,.75,0),this.gate=e(i);let r=new tn,o=new $i(.95,1.25,40);o.rotateX(-Math.PI/2);let a=new se(o,Cs(C.MARKER,.85));a.position.y=.04,a.renderOrder=3;let l=new se(new Wi(.1,.1,6,10,1,!0),Cs(C.GOLD,.45));l.position.y=3,r.add(a,l),r.visible=!1,this.ring=r,this.props=new tn,this.props.add(this.star,this.gate,this.ring),t.scene.add(this.props)}dispose(){this.props&&(this.view.scene.remove(this.props),this.props.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()})),this.m&&(this.m.preStep=null)}note(t,e=""){this.events.push({type:"note",text:t,kind:e})}fx(t,e={}){this.events.push({type:t,...e})}get current(){return Uo[this.idx]||null}get index(){return Math.max(0,Math.min(this.idx,Uo.length-1))}parkBall(){let t=this.m.ball;t.place(-27,17),t.state="free",t.owner=null,t.lastKick=null}ballAtFeet(){let t=this.m,e=this.h,n=t.ball;n.owner&&n.owner!==e&&t.loseControl("loose"),n.place(e.pos.x+Math.sin(e.yaw)*.55,e.pos.z+Math.cos(e.yaw)*.55),n.state="free",n.owner=null,n.lastKick=null}dirToGoal(t){let e=Z.HL-t.x,n=-t.z,i=Math.hypot(e,n)||1;return{x:e/i,z:n/i}}showRing(t){this.ring.visible=!0,this.ring.position.set(t.x,0,t.z),this.target=t}resetKeeper(){let t=this.sam;t.hold=null,t.action=null,t.vel.set(0,0,0),t.pos.set(Z.HL-1,0,0),t.prevPos.copy(t.pos),t.yaw=-Math.PI/2}next(){this.idx++,this.stepT=0,this.ring.visible=!1,this.star.visible=!1,this.gate.visible=!1;let t=this.current;if(!t){this.say="Ready for the pitch!",this.endAt=this.t+1.8,this.fx("finale");return}this.say=t.say,this.enter(t.id),this.fx("step",{index:this.idx})}enter(t){let e=this.m,n=this.h,i=e.ball;switch(this.misses=0,this.resetAt=null,t){case"look":{let r=n.yaw+1,o=Or(new ot(n.pos.x+Math.sin(r)*9,0,n.pos.z+Math.cos(r)*9));this.star.position.set(o.x,2.3,o.z),this.star.visible=!0;break}case"move":this.showRing(Or(new ot(n.pos.x+6,0,n.pos.z+4)));break;case"sprint":this.sprinted=!1,this.showRing(Or(new ot(n.pos.x+12,0,n.pos.z-6)));break;case"ball":{let r=this.dirToGoal(n.pos);i.place(n.pos.x+r.x*3.5,n.pos.z+r.z*3.5),i.state="free",i.owner=null,i.lastKick=null;break}case"dribble":{let r=this.dirToGoal(n.pos),o=Or(new ot(n.pos.x+r.x*6.5,0,n.pos.z+r.z*6.5+2.2),10),a=o.x-n.pos.x,l=o.z-n.pos.z,c=Math.hypot(a,l)||1,h=-l/c,u=a/c;this.gateLine={ax:o.x+h*1.3,az:o.z+u*1.3,bx:o.x-h*1.3,bz:o.z-u*1.3},this.gate.position.set(o.x,0,o.z),this.gate.rotation.y=Bt(a,l)+Math.PI/2,this.gate.visible=!0;let d=o.z>0?-1:1;this.jojoSpot=Or(new ot(o.x-1,0,o.z+d*11),3);break}case"pass":break;case"receive":{let r=this.jojo,o=e.passIntent&&e.passIntent.target===n&&!i.owner;i.owner!==r&&!o&&(i.owner&&e.loseControl("loose"),i.place(r.pos.x+Math.sin(r.yaw)*.6,r.pos.z+Math.cos(r.yaw)*.6),i.state="free",i.owner=null);break}case"shoot":{this.resetKeeper(),(Math.hypot(Z.HL-n.pos.x,n.pos.z)>20||Math.abs(n.pos.z)>12)&&(this.fx("fade"),n.pos.set(Z.HL-13,0,ht(n.pos.z,-5,5)),n.prevPos.copy(n.pos),n.vel.set(0,0,0),n.yaw=Bt(Z.HL-n.pos.x,-n.pos.z),e.events.emit("humanYaw",{yaw:n.yaw})),i.owner!==n&&this.ballAtFeet(),this.shotAt=null;break}case"tackle":{this.fx("fade"),this.resetKeeper(),i.owner&&e.loseControl("loose");let r=-n.pos.x,o=-n.pos.z,a=Math.hypot(r,o)||1,l=Or(new ot(n.pos.x+r/a*7,0,n.pos.z+o/a*7),4),c=this.barry;c.pos.copy(l),c.prevPos.copy(l),c.vel.set(0,0,0),c.yaw=Bt(n.pos.x-l.x,n.pos.z-l.z),c.prevYaw=c.yaw,i.place(l.x+Math.sin(c.yaw)*.55,l.z+Math.cos(c.yaw)*.55),i.state="free",i.owner=null,i.lastKick=null,n.vel.set(0,0,0),n.yaw=Bt(l.x-n.pos.x,l.z-n.pos.z),e.events.emit("humanYaw",{yaw:n.yaw}),this.tackled=!1;break}}}complete(t,e){let n=this.current,i=t&&this.stepT<=n.par;i&&this.stars++,this.results.push({id:n.id,ok:t,star:i,t:this.stepT});let r=this.target&&this.ring.visible?this.target:this.h.pos;this.fx("done",{ok:t,star:i,x:r.x,z:r.z,big:n.id==="shoot"&&t}),this.say=t?`${e||Xm[this.idx%Xm.length]}${i?" \u2605":""}`:"Keep going!",this.waitUntil=this.t+(n.id==="shoot"&&t?1.6:.9)}preStep(){let t=this.m,e=this.h,n=t.ball,i=t.time,r=this.jojo,o=this.barry;if(n.owner===r)r.desired.set(0,0,0),r.faceYaw=Bt(e.pos.x-r.pos.x,e.pos.z-r.pos.z),!r.action&&i-(r.gotAt||i)>.7&&ce(t,r,"pass",{target:e,ai:!0});else{r.gotAt=i;let a=this.jojoSpot,l=n.pos.distXZ(r.pos);if(!n.owner&&l<5&&n.speed<13&&n.lastKick&&n.lastKick.player===e)r.desired.set((n.pos.x-r.pos.x)*2.5,0,(n.pos.z-r.pos.z)*2.5);else if(a&&r.pos.distXZ(a)>.4){let c=a.x-r.pos.x,h=a.z-r.pos.z,u=Math.hypot(c,h),d=Math.min(r.jogSpeed(),u*2);r.desired.set(c/u*d,0,h/u*d)}else r.desired.set(0,0,0);r.faceYaw=Bt(e.pos.x-r.pos.x,e.pos.z-r.pos.z)}if(this.current&&this.current.id==="tackle")if(n.owner===o){let a=e.pos.x-o.pos.x,l=e.pos.z-o.pos.z,c=Math.hypot(a,l)||1,h=c>2?1.4:0;o.desired.set(a/c*h,0,l/c*h),o.faceYaw=Bt(a,l)}else!n.owner&&n.pos.distXZ(o.pos)<3&&this.stepT<1.5?o.desired.set((n.pos.x-o.pos.x)*2,0,(n.pos.z-o.pos.z)*2):o.desired.set(0,0,0);else o.desired.set(0,0,0),o.faceYaw=Bt(e.pos.x-o.pos.x,e.pos.z-o.pos.z)}step(){if(this.done)return;let t=1/120,e=this.m,n=this.h,i=e.ball,r=e.time;if(this.t+=t,this.animate(),this.t>=Wm){this.timeUp=!0,this.say="Time's up. Good effort!",this.finish();return}if(this.endAt!=null){this.t>=this.endAt&&this.finish();return}if(this.waitUntil!=null){this.t>=this.waitUntil&&(this.waitUntil=null,this.next());return}let o=this.current;switch(this.stepT+=t,o.id){case"look":{let a=e.humanCtl?e.humanCtl.input:{yaw:n.yaw,pitch:0},l=Math.cos(a.pitch),c=Math.sin(a.yaw)*l,h=Math.sin(a.pitch),u=Math.cos(a.yaw)*l,d=this.star.position.x-n.pos.x,m=this.star.position.y-1.65,g=this.star.position.z-n.pos.z,x=Math.hypot(d,m,g)||1;(c*d+h*m+u*g)/x>Math.cos(.2)&&(this.fx("star",{x:this.star.position.x,y:this.star.position.y,z:this.star.position.z}),this.complete(!0,"Found it!"));break}case"move":case"sprint":n.sprint&&(this.sprinted=!0),n.pos.distXZ(this.target)<(o.id==="move"?1.3:1.6)&&this.complete(!0,o.id==="sprint"&&this.sprinted?"Rapid!":"Made it!");break;case"ball":i.owner===n&&this.complete(!0,"Got it!");break;case"dribble":{let a=this.gateLine;if((i.owner===n||i.lastTouch===n)&&k1(i.prevPos.x,i.prevPos.z,i.pos.x,i.pos.z,a.ax,a.az,a.bx,a.bz)){this.complete(!0,"Silky!");break}this.recoverBall();break}case"pass":{let a=i.lastKick;if(i.owner===this.jojo&&a&&a.player===n){this.complete(!0,"Perfect pass!");break}i.owner===this.jojo&&(this.jojo.gotAt=r),this.recoverBall(a&&a.player===n?"Aim at Jojo":null);break}case"receive":if(i.owner===n){this.complete(!0,"Lovely first touch!");break}!i.owner&&i.speed<.3&&i.pos.distXZ(n.pos)>4&&i.pos.distXZ(this.jojo.pos)>3&&this.ballAtFeet();break;case"shoot":{let a=i.lastKick;if(a&&a.player===n&&a.kind==="shot"&&!this.shotAt&&(this.shotAt=r),i.pos.x-pe>Z.HL&&i.crossing[0]&&i.crossing[0].inMouth&&!this.resetAt){this.fx("goal",{x:i.pos.x,z:i.pos.z}),this.complete(!0,"GOAL! Top bins!");break}!this.resetAt&&this.shotAt&&(i.pos.x-pe>Z.HL||Math.abs(i.pos.z)>Z.HW||i.state==="held"||r-this.shotAt>3)&&(this.resetAt=r+1.1,this.note(i.state==="held"?"Saved! Again!":"So close! Again!","bad")),this.resetAt&&r>=this.resetAt&&(this.resetAt=null,this.shotAt=null,this.resetKeeper(),this.ballAtFeet());break}case"tackle":{n.action&&n.action.type==="tackle"&&(this.tackled=!0),i.owner===n&&this.complete(!0,this.tackled?"What a tackle!":"Got it back!");break}}this.waitUntil==null&&this.stepT>=o.cap&&this.timeout(o.id)}recoverBall(t){let e=this.m,n=this.h,i=e.ball,r=e.time;if(!(!i.owner&&i.speed<.4&&i.pos.distXZ(n.pos)>3.5&&i.pos.distXZ(this.jojo.pos)>2.5)){this.resetAt=null;return}this.resetAt==null?(this.resetAt=r+1.2,t&&this.note(t,"bad")):r>=this.resetAt&&(this.resetAt=null,this.ballAtFeet())}timeout(t){t==="ball"&&this.m.ball.owner!==this.h&&this.ballAtFeet(),this.complete(!1)}animate(){let t=this.t;if(this.star.visible&&(this.star.rotation.y=t*2.2,this.star.position.y=2.3+Math.sin(t*3)*.18),this.ring.visible){let e=1+.08*Math.sin(t*6);this.ring.children[0].scale.set(e,1,e)}}finish(){this.done||(this.done=!0,this.star.visible=!1,this.ring.visible=!1,this.gate.visible=!1,this.m.phase="fulltime",this.m.phaseT=1.5)}clockText(){return""}objective(t){let e=this.current,n=this.m.ball,i=this.h;if(!e||this.waitUntil!=null||this.endAt!=null)return null;let r=n.owner===i;switch(e.id){case"look":return t.set(this.star.position.x,this.star.position.y,this.star.position.z);case"move":case"sprint":return t.set(this.target.x,.8,this.target.z);case"dribble":return r?t.set(this.gate.position.x,.5,this.gate.position.z):t.set(n.pos.x,n.pos.y,n.pos.z);case"pass":return r?t.set(this.jojo.pos.x,1.2,this.jojo.pos.z):t.set(n.pos.x,n.pos.y,n.pos.z);case"shoot":return r?t.set(Z.HL,1,0):t.set(n.pos.x,n.pos.y,n.pos.z);default:return t.set(n.pos.x,n.pos.y,n.pos.z)}}result(){let t=L1.find(([e])=>this.stars>=e)[1];return{stars:this.stars,total:Uo.length,time:this.t,timeUp:this.timeUp,rank:t,completed:this.results.filter(e=>e.ok).length}}};var On=(s,t,e,n)=>{let i=document.createElement(s);return t&&(i.className=t),n!=null&&(i.innerHTML=n),e&&e.appendChild(i),i},Uc=class{constructor(t,e,n){this.root=On("div","coach hidden",t);let i=On("div","coach-main",this.root),r=On("div","coach-txt",i);this.sayEl=On("div","coach-say",r),this.hintEl=On("div","coach-hint",r),this.skip=On("button","coach-skip",i,"Skip tutorial"),this.skip.addEventListener("click",a=>{a.preventDefault(),n()}),this.skip.addEventListener("pointerdown",a=>a.stopPropagation());let o=On("div","coach-foot",this.root);this.dots=On("span","coach-dots",o);for(let a=0;a<e;a++)On("i","",this.dots);this.starsEl=On("span","coach-stars",o,"\u2605 0"),this.bar=On("div","coach-bar",this.root),this.barFill=On("i","",this.bar),this.arrow=On("div","tut-arrow hidden",t),this.last={}}pointAt(t){let e=t&&(Math.abs(t.x)>.92||Math.abs(t.y)>.92);if(this.arrow.classList.toggle("hidden",!e),!e)return;let n=Math.atan2(t.y,t.x),i=.8,r=Math.min(i/Math.max(Math.abs(Math.cos(n)),.001),i/Math.max(Math.abs(Math.sin(n)),.001));this.arrow.style.left=`${(Math.cos(n)*r*.5+.5)*100}%`,this.arrow.style.top=`${(-Math.sin(n)*r*.5+.5)*100}%`,this.arrow.style.setProperty("--rot",`${-n}rad`)}show(t){this.root.classList.toggle("hidden",!t)}dispose(){this.root.remove(),this.arrow.remove()}update(t){let e=this.last;t.say!==e.say&&(this.sayEl.textContent=t.say,this.sayEl.classList.remove("pop"),this.sayEl.offsetWidth,this.sayEl.classList.add("pop")),t.hint!==e.hint&&(this.hintEl.textContent=t.hint||"",this.hintEl.classList.toggle("empty",!t.hint)),(t.index!==e.index||t.doneCount!==e.doneCount)&&[...this.dots.children].forEach((n,i)=>{n.className=i<t.doneCount?"done":i===t.index?"now":""}),t.stars!==e.stars&&(this.starsEl.textContent=`\u2605 ${t.stars}`),t.keyboard!==e.keyboard&&(this.skip.textContent=t.keyboard?"Skip (Esc)":"Skip"),this.barFill.style.width=`${Math.round(Math.max(0,Math.min(1,t.frac))*100)}%`,this.last={...t}}};var Wt=s=>String(s).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Us=s=>(Math.round(s*10)/10).toFixed(1),zc=class{constructor(t){this.app=t,this.root=document.createElement("div"),this.root.className="screens",t.uiRoot.appendChild(this.root),this.current=null,this.stack=[]}show(t,e={},n="screen center dim"){return this.root.innerHTML=`<div class="${n}">${t}</div>`,this.root.querySelectorAll("[data-act]").forEach(i=>{let r=e[i.dataset.act];r&&i.addEventListener("click",o=>{o.preventDefault(),this.app.audio.play("ui",{gain:.4}),r(i,o)})}),this.root.firstChild}clear(){this.root.innerHTML="",this.current=null}back(){if(!(this.current==="menu"||this.app.session)){if(this.current==="hubSub"){this.hub();return}this.mainMenu()}}toast(t,e=!1,n=3200){let i=document.createElement("div");i.className="toast"+(e?" bad":""),i.textContent=t,this.app.uiRoot.appendChild(i),setTimeout(()=>i.remove(),n)}saveCareer(){let t=this.app.store.save();return t.ok||this.toast(`Could not save your career: ${t.error} Your progress is kept only until you close the page.`,!0,6e3),t.ok}mainMenu(){this.current="menu";let t=this.app;t.hud.show(!1);let e=t.store.career,n=e?`<button class="btn big primary" data-act="cont">Continue Career<small>${Wt(e.player.name)} \xB7 ${Wt(ne(e.clubId).name)} \xB7 Season ${e.seasonNo}</small></button>`:"";this.show(`
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
    `,{cont:()=>this.hub(),new:()=>e?this.confirm("Start a new career? Your existing career will be overwritten.",()=>this.newCareer(),()=>this.mainMenu()):this.newCareer(),quick:()=>this.quickMatch(),train:()=>this.training(),style:()=>this.styleMenu(),settings:()=>this.settings(),help:()=>this.howTo()},"screen menu"),t.store.notice&&(this.toast(t.store.notice.text,t.store.notice.bad,7e3),t.store.notice=null)}confirm(t,e,n){this.show(`<div class="panel" style="max-width:520px"><h2>Are you sure?</h2><p>${Wt(t)}</p><div class="row"><button class="btn danger" data-act="yes">Yes, overwrite</button><button class="btn" data-act="no">Cancel</button></div></div>`,{yes:e,no:n})}newCareer(){this.current="new";let t=Ds(),e=So.map(o=>`<button class="btn ${o.id==="ST"?"on":""}" data-pos="${o.id}">${o.name}</button>`).join(""),n=us(1).map((o,a)=>`<button class="btn ${a===0?"on":""}" data-club="${o.id}">${ds(o,22)} ${Wt(o.name)}</button>`).join(""),i={ST:"Starts high up the pitch. Judged on goals, shots on target and movement. Training favours finishing.",W:"Starts wide. Judged on goals, assists and chances created. Training favours pace and dribbling.",AM:"Plays behind the striker. Judged on chance creation, assists and goals. Training favours passing.",CM:"The link of the team. Judged on passing accuracy, ball winning and chances created.",DEF:"Protects the goal. Judged on tackles, interceptions, clean sheets and distribution."},r=this.show(`
      <div class="panel" style="width:min(820px,94vw)">
        <h2>Create your footballer</h2>
        <div class="grid2">
          <label class="f">Name<input id="nc-name" maxlength="22" value="${Wt(t.name)}"></label>
          <label class="f">Shirt number<input id="nc-num" type="number" min="1" max="99" value="9"></label>
          <label class="f">Nationality<select id="nc-nat">${wm.map(o=>`<option>${o}</option>`).join("")}</select></label>
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
      </div>`,{back:()=>this.mainMenu(),go:()=>{let o=r.querySelector("#nc-name").value.trim()||"A. Newcomer",a=Math.max(1,Math.min(99,parseInt(r.querySelector("#nc-num").value,10)||9)),l=r.querySelector("#nc-pos .on").dataset.pos,c=r.querySelector("#nc-club .on").dataset.club,h=km({name:o,number:a,nationality:r.querySelector("#nc-nat").value,foot:r.querySelector("#nc-foot").value,role:l,clubId:c,look:{skin:r.querySelector("#nc-skin").value,hair:r.querySelector("#nc-hair").value,boots:r.querySelector("#nc-boots").value}});this.app.store.career=h,this.saveCareer(),this.hub()}});r.querySelectorAll("#nc-pos .btn").forEach(o=>o.addEventListener("click",()=>{r.querySelectorAll("#nc-pos .btn").forEach(l=>l.classList.remove("on")),o.classList.add("on"),r.querySelector("#nc-posdesc").textContent=i[o.dataset.pos];let a={ST:9,W:11,AM:10,CM:8,DEF:4};r.querySelector("#nc-num").value=a[o.dataset.pos]})),r.querySelectorAll("#nc-club .btn").forEach(o=>o.addEventListener("click",()=>{r.querySelectorAll("#nc-club .btn").forEach(a=>a.classList.remove("on")),o.classList.add("on")}))}hub(){this.current="hub";let e=this.app.store.career;if(!e){this.mainMenu();return}let n=ne(e.clubId),i=e.season,r=e.player,o=id(e),a="";if(e.window)a='<div class="next-fixture">Transfer window open</div><p class="muted">Review the offers before continuing.</p>';else if(o){let _=ne(o.home),b=ne(o.away),M=o.final?"Continental Stadium (neutral)":`${Wt(_.ground)} \xB7 ${Vn(_.tier).venue==="community"?"Community Ground":Vn(_.tier).label+" stadium"}`;a=`<div class="muted small">${o.final?Wt(o.name):`${Wt(i.league)} \xB7 Round ${o.round} of 6`}</div>
        <div class="next-fixture">${ds(_,36)} ${Wt(_.name)} <span class="muted">v</span> ${Wt(b.name)} ${ds(b,36)}</div>
        <div class="muted small">${M}</div>
        <div class="row" style="margin-top:12px"><button class="btn huge primary" data-act="play">Play Match</button></div>`}else if(Bm(e)){let _=i.final&&i.final.played?`<p>${i.final.won?"\u{1F3C6} <b>Continental Cup winners!</b>":`Continental Cup Final: lost ${i.final.score?i.final.score.join("-"):""}.`}</p>`:"";a=`<div class="next-fixture">Season ${e.seasonNo} complete</div>
        <p>${Wt(n.name)} finished <b>${Nc(i.placement)}</b> in the ${Wt(i.league)}.${i.placement===1?" \u{1F3C6} <b>Champions!</b>":""}</p>${_}
        <button class="btn huge primary" data-act="season">Start Season ${e.seasonNo+1}</button>`}let l=nd(i).map((_,b)=>`<tr class="${_.id===e.clubId?"me":""}"><td>${b+1}</td><td>${ds(ne(_.id),18)} ${Wt(ne(_.id).name)}</td><td class="n">${_.p}</td><td class="n">${_.w}</td><td class="n">${_.d}</td><td class="n">${_.l}</td><td class="n">${_.gf-_.ga}</td><td class="n"><b>${_.pts}</b></td></tr>`).join(""),c=i.fixtures.filter(_=>_.score&&(_.home===e.clubId||_.away===e.clubId)).map(_=>`<div>R${_.round}: ${Wt(ne(_.home).short)} ${_.score[0]}-${_.score[1]} ${Wt(ne(_.away).short)}</div>`).join(""),h=td.map(_=>`<div class="attr"><span>${Am[_]}</span><div class="bar"><i style="width:${r.attrs[_]}%"></i></div><b>${r.attrs[_]}</b><button class="btn" data-act="up" data-k="${_}" ${r.points>0&&r.attrs[_]<99?"":"disabled"} title="+${rd(r.attrs[_])}">+</button></div>`).join(""),u=e.form.slice(-5).map(_=>`<span class="${_>=7?"hi":_<6?"lo":""}">${Us(_)}</span>`).join("")||'<span class="muted small">no matches yet</span>',d=e.totals,m=e.seasons.find(_=>_.season===e.seasonNo&&_.clubId===e.clubId)||{apps:0,goals:0,assists:0,ratingSum:0},g=od(e).map(_=>`<div style="margin:8px 0"><div class="row">${ds(_.club,20)} <b>${Wt(_.club.name)}</b><span class="spacer"></span><span class="small">${Math.round(_.score*100)}%</span></div><div class="bar ${_.qualifies?"good":""}"><i style="width:${Math.round(_.score*100)}%"></i></div><div class="small muted">${Wt(_.text)}</div></div>`).join("")||'<p class="muted">You are at the top level. Keep performing to win the league and the Continental Cup.</p>',x="";e.window&&(x=`<h3>${e.window.type==="end"?"Season-end":"Mid-season"} transfer window</h3>`+(e.window.offers.length?e.window.offers.map((_,b)=>{let M=ne(_.clubId);return`<div class="offer"><div class="row">${ds(M,30)}<div><b>${Wt(M.name)}</b> <span class="pill">Tier ${_.tier}</span><div class="small">${Wt(_.role)} \xB7 ${_.wage.toLocaleString()} cr/week \xB7 ${_.years} season${_.years>1?"s":""}</div></div></div>
          <div class="small" style="margin-top:6px"><b>Expectations:</b> ${Wt(_.expectations)}</div>
          <div class="small"><b>Why:</b> ${_.reasons.map(Wt).join("; ")}</div>
          <div class="row" style="margin-top:8px"><button class="btn primary" data-act="accept" data-i="${b}">${_.kind==="renewal"?"Sign renewal":"Accept transfer"}</button></div></div>`}).join(""):'<p class="muted">No clubs made an offer this window. Build your form and reputation.</p>')+`<button class="btn" data-act="decline">${e.window.offers.length?`Stay at ${Wt(n.name)}`:"Continue"}</button>`);let f=e.seasons.map(_=>`<tr><td>S${_.season}</td><td>${Wt(ne(_.clubId).short)}</td><td class="n">${_.apps}</td><td class="n">${_.goals}</td><td class="n">${_.assists}</td><td class="n">${_.apps?Us(_.ratingSum/_.apps):"-"}</td><td class="n">${_.passAtt?Math.round(_.passCmp/_.passAtt*100)+"%":"-"}</td><td class="n">${_.tackles}</td><td class="n">${_.placement?Nc(_.placement):"-"}</td></tr>`).join(""),p=[...e.timeline].reverse().map(_=>`<div><span class="muted small">S${_.season}${_.round?" R"+Math.min(6,_.round):""}</span> ${Wt(_.text)}</div>`).join(""),y=e.trophies.map(_=>`<span class="pill">\u{1F3C6} ${Wt(_.name)} S${_.season}</span>`).join(" ")||'<span class="muted small">none yet</span>';this.show(`
      <div class="hub-head">${ds(n,64)}<div><h1>${Wt(n.name)}</h1><div class="muted">${Wt(i.league)} \xB7 Season ${e.seasonNo} \xB7 ${Wt(r.name)} #${r.number} \xB7 ${fs(r.role)} \xB7 ${Wt(r.nationality)}</div></div>
        <span class="spacer"></span>
        <div class="col" style="text-align:right"><div><b>Level ${r.level}</b> \xB7 XP ${r.xp}/100 \xB7 Reputation ${Math.round(r.reputation)}</div><div class="small muted">Contract: ${e.contract.wage.toLocaleString()} cr/week \xB7 ${e.contract.years} season(s) left \xB7 ${Wt(e.contract.role)}</div></div>
        <button class="btn" data-act="menu">Main Menu</button></div>
      <div class="hub-grid">
        <div class="col">
          <div class="panel">${a}${o&&!e.window?`<div class="row" style="margin-top:10px"><button class="btn" data-act="train">Training ${e.trainingAvailable?"(XP available)":"(no XP until next match)"}</button></div>`:""}</div>
          <div class="panel"><h3>${Wt(i.league)}</h3><table class="t"><tr><th>#</th><th>Club</th><th class="n">P</th><th class="n">W</th><th class="n">D</th><th class="n">L</th><th class="n">GD</th><th class="n">Pts</th></tr>${l}</table><div class="small muted" style="margin-top:6px">${c}</div></div>
        </div>
        <div class="col">
          <div class="panel"><h3>Attributes</h3>${h}<div class="small muted">Upgrade points: <b>${r.points}</b>. Earn XP by playing (and a little from training).</div></div>
          <div class="panel"><h3>Recent form</h3><div class="form-dots">${u}</div>
            <h3>This season</h3><div class="small">${m.apps} apps \xB7 ${m.goals} goals \xB7 ${m.assists} assists \xB7 avg ${m.apps?Us(m.ratingSum/m.apps):"-"}</div>
            <h3>Career</h3><div class="small">${d.apps} apps \xB7 ${d.goals} goals \xB7 ${d.assists} assists \xB7 avg rating ${d.apps?Us(Gm(d)):"-"} \xB7 pass accuracy ${d.passAtt?Math.round(d.passCmp/d.passAtt*100)+"%":"-"} \xB7 ${d.tackles} tackles \xB7 earnings ${e.earnings.toLocaleString()} cr</div>
            <div style="margin-top:6px">${y}</div></div>
        </div>
        <div class="col">
          ${x?`<div class="panel">${x}</div>`:""}
          <div class="panel"><h3>Club interest</h3>${g}<div class="small muted">Offers only arrive at transfer windows (after fixture 3 and at season end). Training does not count.</div></div>
          <div class="panel"><h3>Career history</h3><table class="t"><tr><th>S</th><th>Club</th><th class="n">Apps</th><th class="n">G</th><th class="n">A</th><th class="n">Avg</th><th class="n">Pass</th><th class="n">Tkl</th><th class="n">Pos</th></tr>${f}</table>
            <h3>Timeline</h3><div class="timeline">${p}</div></div>
        </div>
      </div>`,{menu:()=>this.mainMenu(),play:()=>this.app.playCareerMatch(),train:()=>this.training(!0),season:()=>{Hm(e),this.saveCareer(),this.hub()},up:_=>{Om(e,_.dataset.k)&&(this.saveCareer(),this.hub())},accept:_=>{zm(e,+_.dataset.i),this.saveCareer(),this.hub()},decline:()=>{Fm(e),this.saveCareer(),this.hub()}},"screen hub")}report(t,e={}){let n=this.app;n.input.active=!1,n.input.exitLock(),n.hud.show(!1),this.current="report";let i=t.match,r=i.human,o=i.stats.report(r),a=o.stats,l=null;if(e.career&&!t.committed){t.committed=!0;let x=n.store.career;l=Dm(x,e.matchId,e.fx,{score:o.score,rating:o.rating,minutes:o.minutes,stats:a,motm:o.motm&&o.motm.isHuman}),t.summary=l,this.saveCareer()}else e.career&&(l=t.summary);let c=o.breakdown,h=[...c.pos.slice(0,3).map(x=>`<div class="plus">+${x.v.toFixed(2)} ${Wt(x.label)}</div>`),...c.neg.slice(0,3).map(x=>`<div class="minus">${x.v.toFixed(2)} ${Wt(x.label)}</div>`)].join("")||'<div class="muted">A quiet game.</div>',u=o.goals.map(x=>`<div class="small">${x.clock} ${Wt(i.teams[x.team].short)} - ${x.ownGoal?`own goal (${Wt(x.ownGoalBy||"")})`:Wt(x.scorer||"?")}${x.assist?` (assist ${Wt(x.assist)})`:""}</div>`).join(""),d=(x,f)=>`<div class="stat"><b>${x}</b><span>${f}</span></div>`,m=(()=>{let x=o.score[r.team],f=o.score[1-r.team];return x>f?"Win":x<f?"Defeat":"Draw"})(),g=l&&!l.duplicate?`<div class="small">+${l.xp} XP${l.levelUps?` \xB7 <b>${l.levelUps} upgrade point${l.levelUps>1?"s":""} earned</b>`:""} \xB7 reputation ${l.rep>=0?"+":""}${l.rep.toFixed(1)}</div>`:e.quick?'<div class="small muted">Quick match: no effect on your career.</div>':"";this.show(`
      <div class="panel report">
        <div class="row"><h2>${e.title||"Match Report"}</h2><span class="spacer"></span><span class="pill">${m}</span></div>
        <div class="big-score">${Wt(i.teams[0].name)} ${o.score[0]} - ${o.score[1]} ${Wt(i.teams[1].name)}</div>
        ${u}
        <div class="row" style="margin:12px 0;gap:24px">
          <div><div class="small">MATCH RATING</div><div class="rating-big">${Us(o.rating)}</div></div>
          <div class="why small"><b>Biggest rating changes</b>${h}</div>
          <span class="spacer"></span>
          <div class="small">Minutes played: <b>${o.minutes}</b><br>Possession ${o.possession[0]}% - ${o.possession[1]}%<br>Shots ${o.teamShots[0]} (${o.teamShotsOn[0]}) - ${o.teamShots[1]} (${o.teamShotsOn[1]})<br>Player of the match: <b>${o.motm?Wt(o.motm.name)+" "+Us(o.motm.rating):"-"}</b></div>
        </div>
        <div class="statgrid">
          ${d(a.goals,"Goals")}${d(a.assists,"Assists")}${d(`${a.passCmp}/${a.passAtt}`,"Passes completed")}${d(a.passAtt?a.passAcc+"%":"-","Pass accuracy")}
          ${d(a.shots,"Shots")}${d(a.shotsOn,"On target")}${d(a.tacklesWon,"Tackles won")}${d(a.interceptions,"Interceptions")}
          ${d(a.possLost,"Possession lost")}${d(a.fouls,"Fouls")}${d(a.keyPasses,"Chances created")}${d(a.touches,"Touches")}
        </div>
        ${g}
        <div class="row" style="margin-top:14px"><button class="btn primary big" data-act="cont">${e.career?"Continue to Career Hub":"Continue"}</button>${e.quick?'<button class="btn" data-act="again">Play again</button>':""}</div>
      </div>`,{cont:()=>{n.endSession(),e.career?this.hub():e.quick?this.quickMatch():this.mainMenu()},again:()=>{n.endSession(),n.startQuickMatch(this.lastQuick||{})}})}quickMatch(){this.current="quick";let t=this.app,e=this.lastQuick||{home:"swindon",away:"chesterfield",side:0,role:t.store.career?t.store.career.player.role:"ST",len:t.settings.matchLength},n=r=>Ju.map(o=>`<optgroup label="Tier ${o.tier} \xB7 ${o.league}">${us(o.tier).map(a=>`<option value="${a.id}" ${a.id===r?"selected":""}>${Wt(a.name)}</option>`).join("")}</optgroup>`).join(""),i=this.show(`
      <div class="panel" style="width:min(640px,94vw)">
        <h2>Quick Match</h2>
        <div class="grid2">
          <label class="f">Home club<select id="q-home">${n(e.home)}</select></label>
          <label class="f">Away club<select id="q-away">${n(e.away)}</select></label>
          <label class="f">You play for<select id="q-side"><option value="0" ${e.side===0?"selected":""}>Home</option><option value="1" ${e.side===1?"selected":""}>Away</option></select></label>
          <label class="f">Position<select id="q-role">${So.map(r=>`<option value="${r.id}" ${r.id===e.role?"selected":""}>${r.name}</option>`).join("")}</select></label>
          <label class="f">Match length<select id="q-len"><option value="short">2 min halves</option><option value="normal">3 min halves</option><option value="long">5 min halves</option></select></label>
        </div>
        <p class="small muted">Uses ${t.store.career?"your career player":"a default player"} and the home club's stadium. Quick matches never change career progress.</p>
        <div class="row"><button class="btn primary big" data-act="go">Kick Off</button><button class="btn" data-act="back">Back</button></div>
      </div>`,{back:()=>this.mainMenu(),go:()=>{let r={home:i.querySelector("#q-home").value,away:i.querySelector("#q-away").value,side:+i.querySelector("#q-side").value,role:i.querySelector("#q-role").value,len:i.querySelector("#q-len").value};if(r.home===r.away){this.toast("Pick two different clubs.",!0);return}this.lastQuick={...r,halfLength:Fl[r.len]},t.startQuickMatch(this.lastQuick)}});i.querySelector("#q-len").value=e.len||"normal"}training(t=!1){this.current=t?"hubSub":"training";let e=this.app.store.career,n=e?e.trainingAvailable?"Your next completed drill earns development XP (once between matches).":"You have already trained since your last match: drills give no XP until you play again.":"Without a career, drills are just for practice.",i=Object.entries(Oo).map(([o,a])=>`<div class="panel"><h3>${Wt(a.name)}</h3><p class="small">${Wt(a.desc)}</p><div class="small muted">${a.time?`${a.time} seconds`:"Untimed"}</div><button class="btn primary" data-act="go" data-k="${o}" style="margin-top:8px">Start</button></div>`).join("");this.show(`<div class="panel" style="width:min(1000px,96vw)"><h2>Training Ground</h2><p class="small">${n} Training never counts towards club interest.</p><div class="grid2"><div class="panel"><h3>Tutorial with Coach Ada</h3><p class="small">The basics in under two minutes: look, move, dribble, pass, shoot and tackle. Earn a star for each quick drill.</p><div class="small muted">About 2 minutes \xB7 no XP</div><button class="btn primary" data-act="tut" style="margin-top:8px">Start</button></div>${i}</div><div class="row" style="margin-top:12px"><button class="btn" data-act="back">Back</button></div></div>`,{tut:()=>this.startTutorial(),go:o=>this.startDrill(o.dataset.k,t),back:()=>t?this.hub():this.mainMenu()})}startDrill(t,e=!1){let n=this.app,i=n.store.career,r={...i?i.player:Ds()},o=new Dc(t,r),a=i?ne(i.clubId):yn[0],l=Sr(a,yn.find(d=>d.id!==a.id&&d.tier===a.tier)||yn[1]),c=n.startSession({mode:"drill",venue:"training",venueOpts:{homeName:"Training"},colours:{kits:l,human:r.look},match:o.matchConfig(),noStart:!0,clockText:()=>o.clockText(),onStep:()=>o.step(),onEnd:()=>this.drillResult(o,e)});o.setup(c.match,n.view),c.drill=o,c.cam.yaw=c.human.yaw;let h=c.dispose.bind(c);c.dispose=()=>{o.dispose(),h()};let u=()=>{if(n.session===c){for(;o.events.length;){let d=o.events.shift();n.hud.notify(d.text,d.kind)}requestAnimationFrame(u)}};u(),c.match.events.on("drillGoal",d=>{n.view.celebrate(d.pos.x,d.pos.z,0,.5),n.audio.play("net"),n.audio.play("cheer",{gain:.3})}),n.hud.showBanner(Oo[t].name,Oo[t].desc,3500)}startTutorial(t={}){let e=this.app,n=e.store.career,i={...n?n.player:Ds()},r=new Oc(i),o=n?ne(n.clubId):yn[0],a=Sr(o,yn.find(m=>m.id!==o.id&&m.tier===o.tier)||yn[1]);this.tutorialFirst=!!t.first;let l=e.startSession({mode:"tutorial",venue:"training",venueOpts:{homeName:"Training"},colours:{kits:a,human:i.look},match:r.matchConfig(),noStart:!0,clockText:()=>"",onStep:()=>r.step(),onEnd:()=>this.tutorialResult(r)});r.setup(l.match,e.view),l.tutorial=r,l.cam.yaw=l.human.yaw,e.hud.root.classList.add("tut");let c=new Uc(e.uiRoot,Uo.length,()=>this.skipTutorial()),h=l.dispose.bind(l);l.dispose=()=>{r.dispose(),c.dispose(),e.hud.root.classList.remove("tut"),h()};let u=new L,d=()=>{if(e.session!==l)return;for(;r.events.length;)this.tutorialFx(r.events.shift(),l);let m=r.current,g=e.input.touchMode,x=m&&r.waitUntil==null&&r.endAt==null;c.show(!e.paused&&!l.ended);let f=!e.paused&&!l.ended?r.objective(u):null;c.pointAt(f?e.view.projectToScreen(f,f):null),c.update({index:r.idx,doneCount:r.results.length,say:r.say,stars:r.stars,keyboard:!g,hint:x?m.hint[g?1:0]:"",frac:x?1-r.stepT/m.cap:0}),requestAnimationFrame(d)};return d(),l}tutorialFx(t,e){let n=this.app,i=n.view,r=e.human;switch(t.type){case"note":n.hud.notify(t.text,t.kind);break;case"step":n.audio.play("ui",{gain:.35});break;case"star":i.celebrate(t.x,t.z,0,.45);break;case"done":t.ok&&(i.celebrate(t.x,t.z,0,t.big?1.2:.3),n.audio.play(t.star?"ack":"ui",{gain:.55}));break;case"goal":n.audio.play("net"),n.audio.play("cheer",{gain:.55}),n.hud.showBanner("GOAL!","Sleepy Sam never saw it coming",1400,"mine");break;case"fade":n.hud.flashFade();break;case"finale":n.audio.play("whistle",{gain:.5}),n.audio.play("cheer",{gain:.35}),i.celebrate(r.pos.x+Math.sin(r.yaw)*4,r.pos.z+Math.cos(r.yaw)*4,0,1.2);break}}skipTutorial(){cd("skipped");let t=this.app;t.session&&t.endSession(),this.mainMenu(),this.toast("Tutorial skipped. You can replay it any time from Training.")}tutorialResult(t){let e=this.app;e.input.active=!1,e.input.exitLock(),cd("done");let n=t.result(),i="\u2605".repeat(n.stars)+"\u2606".repeat(n.total-n.stars),r=`${Math.floor(n.time/60)}:${String(Math.floor(n.time%60)).padStart(2,"0")}`,o=e.store.career,a={Superstar:"Nine out of nine. Are you sure you haven't done this before?","Starting XI":"Starting XI material. The scouts will be watching.","Squad player":"Solid work. A few matches and you'll fly.","Future legend":"Every legend starts somewhere. Yours starts now."};this.current="tutorialResult",this.show(`<div class="panel tut-card" style="text-align:center;max-width:540px">
      <div class="tut-badge">${n.timeUp?"TIME'S UP":"WARM-UP COMPLETE"}</div>
      <div class="tut-stars" aria-label="${n.stars} of ${n.total} stars">${i}</div>
      <h2>${Wt(n.rank)}</h2>
      <p>${n.stars} of ${n.total} stars \xB7 ${r}</p>
      <p class="small">Coach Ada: "${Wt(a[n.rank])}"</p>
      <div class="row" style="justify-content:center;margin-top:10px">
        <button class="btn primary big" data-act="career">${o?"Continue your career":"Start your career"}</button>
        <button class="btn" data-act="menu">Main menu</button>
      </div></div>`,{career:()=>{e.endSession(),o?this.hub():this.newCareer()},menu:()=>{e.endSession(),this.mainMenu()}})}drillResult(t,e){let n=this.app;n.input.active=!1,n.input.exitLock();let i=t.result(),r=n.store.career,o="";if(t.kind==="practice")o='<p class="muted">Free practice gives no XP.</p>';else if(r&&r.trainingAvailable){let a=sd(r,i.xp);r.trainingAvailable=!1,this.saveCareer(),o=`<p><b>+${i.xp} XP</b>${a?` \xB7 ${a} upgrade point${a>1?"s":""} earned`:""}</p>`}else r&&(o='<p class="muted">No XP: you have already trained since your last match.</p>');this.show(`<div class="panel" style="max-width:520px"><h2>${Wt(t.def.name)}</h2><p style="font-size:20px"><b>${Wt(i.text)}</b></p>${o}
      <div class="row"><button class="btn primary" data-act="again">Try again</button><button class="btn" data-act="back">Back to Training</button></div></div>`,{again:()=>{n.endSession(),this.startDrill(t.kind,e)},back:()=>{n.endSession(),this.training(e)}})}styleMenu(t=!1){this.current=t?"pauseSub":"style";let e=this.app,n={};try{let r=e.session?null:{pos:[-14,8,27],look:[6,.8,-2]};for(let o of["classic","neo"])n[o]=e.view.renderPreview(o,480,270,r)}catch{n={}}let i=(r,o,a)=>`<div class="preview ${e.style===r?"on":""}" data-act="pick" data-s="${r}">${n[r]?`<img src="${n[r]}" alt="${o}">`:""}<h3>${o}</h3><div class="small">${a}</div></div>`;this.show(`<div class="panel" style="width:min(820px,96vw)"><h2>Visual Style</h2><p class="small muted">Previews are rendered live from the game. Switching is instant and never interrupts play.</p>
      <div class="previews">${i("classic","Classic","Pale unlit surfaces, thin black ink edges, restrained kits, paper interface.")}${i("neo","Neobrutalist","Saturated colours, 3 px outlines, toon shading with hard sun shadows, bold interface.")}</div>
      <div class="row" style="margin-top:14px"><button class="btn" data-act="back">Back</button></div></div>`,{pick:r=>{e.setStyle(r.dataset.s),this.styleMenu(t)},back:()=>t?this.pauseMenu():this.mainMenu()})}settings(t=!1){this.current=t?"pauseSub":"settings";let e=this.app,n=e.settings,i=(a,l)=>`<div class="seg" data-key="${a}">${l.map(([c,h])=>`<button class="btn ${String(n[a])===String(c)?"on":""}" data-v="${c}">${h}</button>`).join("")}</div>`,r=this.show(`<div class="panel" style="width:min(640px,96vw)"><h2>Settings</h2>
      <div class="grid2">
        <label class="f">Look sensitivity <span id="v-sens">${n.sensitivity.toFixed(2)}</span><input type="range" min="0.2" max="3" step="0.05" id="s-sens" value="${n.sensitivity}"></label>
        <label class="f">Field of view <span id="v-fov">${Ym(n.fov)}</span><input type="range" min="${60}" max="${200}" step="1" id="s-fov" value="${n.fov}"></label>
        <label class="f">Master volume<input type="range" min="0" max="1" step="0.05" id="s-master" value="${n.master}"></label>
        <label class="f">Effects volume<input type="range" min="0" max="1" step="0.05" id="s-sfx" value="${n.sfx}"></label>
        <label class="f">Crowd volume<input type="range" min="0" max="1" step="0.05" id="s-crowd" value="${n.crowd}"></label>
      </div>
      <h3>Controls</h3>${i("invertY",[[!1,"Normal Y"],[!0,"Invert Y"]])}
      <div style="height:6px"></div>${i("touch",[["auto","Touch controls: auto"],["on","Touch controls on"],["off","Touch controls off"]])}
      <h3>Difficulty</h3>${i("difficulty",Object.entries(Ic).map(([a,l])=>[a,l.label]))}
      <div class="small muted">Assisted (default): the ball sticks to your feet, passes find teammates and are chipped over blocked lanes, and opponents are slower and make more mistakes. Expert keeps only light assistance.</div>
      <h3>Camera</h3>${i("bob",[[!0,"View bob on"],[!1,"View bob off"]])} <div style="height:6px"></div>${i("shake",[[!0,"Camera shake on"],[!1,"Camera shake off"]])}
      <div style="height:6px"></div>${i("replays",[[!0,"Goal replays on"],[!1,"Goal replays off"]])}
      <h3>Quality</h3>${i("quality",[["low","Low"],["medium","Medium"],["high","High"]])}
      <h3>Match length</h3>${i("matchLength",[["short","2 min halves"],["normal","3 min halves"],["long","5 min halves"]])}
      <div class="row" style="margin-top:14px"><button class="btn primary" data-act="back">Done</button></div></div>`,{back:()=>{e.applySettings(),t?this.pauseMenu():this.mainMenu()}}),o=(a,l,c)=>r.querySelector(a).addEventListener("input",h=>{n[l]=parseFloat(h.target.value),c&&(r.querySelector(c).textContent=l==="fov"?Ym(n[l]):n[l].toFixed(2)),e.applySettings()});o("#s-sens","sensitivity","#v-sens"),o("#s-fov","fov","#v-fov"),o("#s-master","master"),o("#s-sfx","sfx"),o("#s-crowd","crowd"),r.querySelectorAll(".seg").forEach(a=>a.querySelectorAll(".btn").forEach(l=>l.addEventListener("click",()=>{let c=a.dataset.key,h=l.dataset.v;h==="true"?h=!0:h==="false"&&(h=!1),n[c]=h,a.querySelectorAll(".btn").forEach(u=>u.classList.remove("on")),l.classList.add("on"),e.applySettings(),c==="difficulty"&&e.session&&this.toast("Difficulty applies from the next match.")})))}howTo(t=!1){this.current=t?"pauseSub":"help";let e=Gu.map(([a,l])=>`<tr><td><b>${a}</b></td><td>${l}</td></tr>`).join(""),n=Vu.map(([a,l])=>`<tr><td><b>${a}</b></td><td>${l}</td></tr>`).join(""),i=this.app.input.touchMode,r=`<h3>Keyboard and mouse</h3><table class="t">${e}</table>`,o=`<h3>Touch screen</h3><table class="t">${n}</table>`;this.show(`<div class="panel" style="width:min(860px,96vw)"><h2>How to Play</h2>
      ${i?o+r:r+o}
      <h3>Playing</h3>
      <p class="small">You control one footballer and see the match through their eyes. Your teammates and opponents are AI. Receive the ball with a soft first touch by simply letting it reach your feet (move to push the touch into space). Press pass just before the ball arrives for a first-time pass; hold shoot while the ball arrives for a first-time finish. The ring shows who your pass will go to - look towards a teammate to choose them. While you have the ball the screen edge glows green; your close control keeps it at your feet, so opponents have to tackle you for it. Press E near a dribbler to lunge in with a tackle. Press Space without the ball to call for it: a teammate acknowledges and passes when you are open. Settings has the difficulty (how much help you get and how sharp the opponents are) and a field of view from 60 to 200 degrees.</p>
      <h3>Rules</h3>
      <p class="small">7-a-side on a 64 x 42 m pitch with 5 x 2 m goals. Two halves (3 minutes each by default; the clock is shown as a 90-minute match and stops during stoppages). Kick-offs, throw-ins, corners, goal kicks, free kicks and penalties are used. <b>There is no offside</b> in this small-sided format. Keepers may handle anywhere in their own area (no back-pass rule). A goal counts only when the whole ball crosses the line between the posts and under the bar.</p>
      <h3>Career</h3>
      <p class="small">Start at a community club. Each season has 6 league fixtures. Matches give development XP (100 XP = 1 upgrade point); drills give a little XP once between matches. Club interest comes from your last 5 ratings, your reputation, contributions in your position and appearances - never from training or time passing. Offers arrive at transfer windows after fixture 3 and at season end, normally from one tier higher.</p>
      <h3>Credits</h3>
      <p class="small">First Touch - design, code, geometry and synthesised audio made for this game. Rendering with three.js (MIT licence, vendored). Clubs (names, kit colours and grounds) come from the openfootball/football.json data (public domain, seasons 2026/27 and 2025/26); club crests are simple generated badges, squad players are fictional.</p>
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
      <div class="big-score">${Wt(t.teams[0].short)} ${n.score[0]} - ${n.score[1]} ${Wt(t.teams[1].short)}</div>
      <table class="t">
        <tr><td>Current rating</td><td class="n"><b>${Us(n.rating)}</b></td></tr>
        <tr><td>Goals / assists</td><td class="n">${i.goals} / ${i.assists}</td></tr>
        <tr><td>Passes completed</td><td class="n">${i.passCmp}/${i.passAtt} (${i.passAcc}%)</td></tr>
        <tr><td>Shots (on target)</td><td class="n">${i.shots} (${i.shotsOn})</td></tr>
        <tr><td>Tackles won / interceptions</td><td class="n">${i.tacklesWon} / ${i.interceptions}</td></tr>
        <tr><td>Possession lost / fouls</td><td class="n">${i.possLost} / ${i.fouls}</td></tr>
        <tr><td>Team possession</td><td class="n">${n.possession[0]}% - ${n.possession[1]}%</td></tr>
      </table>
      <div class="row" style="margin-top:12px"><button class="btn" data-act="back">Back</button></div></div>`,{back:()=>this.pauseMenu()})}clickToPlay(){this.current="click";let t=this.app.session,e=!this.seenControls;this.seenControls=!0;let n=t&&t.cfg.title?`<h2>${Wt(t.cfg.title)}</h2>`:"";if(t&&t.cfg.mode==="tutorial"){let a=this.app.input.touchMode;this.show(`<div class="panel tut-card" style="text-align:center;max-width:560px">
        <div class="tut-badge">2-MINUTE WARM-UP</div>
        <h2>Welcome to First Touch!</h2>
        <p>Coach Ada will show you the basics: look around, run, dribble, pass, shoot and tackle. Be quick on each drill to earn a star.</p>
        <div class="row" style="justify-content:center;margin-top:6px"><button class="btn primary big" data-act="start">Start tutorial</button><button class="btn" data-act="skip">Skip tutorial</button></div>
        <div class="small muted" style="margin-top:10px">${a?"Best played with the phone sideways.":"Starting captures your mouse. Press Esc at any time to pause or skip."}</div></div>`,{start:()=>this.app.resume(),skip:()=>this.skipTutorial()});return}if(this.app.input.touchMode){let a=Vu.map(([l,c])=>`<tr><td><b>${l}</b></td><td>${c}</td></tr>`).join("");this.show(`<div class="panel tap-panel" style="text-align:center;max-width:620px">${n}<div class="lockmsg">Tap to play</div>
        ${e?`<table class="t small" style="margin-top:10px;text-align:left">${a}</table><div class="small muted" style="margin-top:8px">Best played with the phone sideways.</div>`:'<div class="small muted">Left thumb move \xB7 right thumb look \xB7 SHOOT / PASS / THRU \xB7 TACKLE / SLIDE \xB7 II pause</div>'}</div>`,{},"screen center dim"),this.root.firstChild.addEventListener("click",()=>{this.app.resume()},{once:!0});return}let i=Gu.map(([a,l])=>`<tr><td><b>${a}</b></td><td>${l}</td></tr>`).join("");this.show(`<div class="panel" style="text-align:center;max-width:620px">${n}<div class="lockmsg">Click to play</div>
      ${e?`<table class="t small" style="margin-top:10px;text-align:left">${i}</table><div class="small" style="margin-top:8px;text-align:left">Let passes reach your feet for a soft first touch. Look at a teammate to select them (ring), then right-click. Press pass or hold shoot just before the ball arrives to play it first time.</div>`:'<div class="small muted">Mouse look \xB7 WASD move \xB7 Shift sprint \xB7 LMB shoot \xB7 RMB pass \xB7 Space through / call \xB7 E tackle \xB7 C slide \xB7 Esc pause</div>'}</div>`,{},"screen center dim"),this.root.firstChild.addEventListener("click",()=>{this.app.resume()},{once:!0})}lockRefused(){this.show(`<div class="panel" style="text-align:center"><div class="lockmsg">Click to resume</div><p class="small">The browser did not capture the mouse. Click again (browsers refuse for about a second after Esc).<br>Or play without capture: hold a mouse button and drag to look, or use the arrow keys.</p>
      <div class="row" style="justify-content:center"><button class="btn primary" data-act="r">Resume</button><button class="btn" data-act="d">Play with drag-look</button></div></div>`,{r:()=>this.app.resume(),d:()=>{this.app.input.dragMode=!0,this.app.resume()}})}};function Ym(s){return s>120?`${s}\xB0 (wide view)`:`${s}\xB0`}var Fc="firsttouch.career",Km="firsttouch.career.backup";function Zm(s){let t=2166136261;for(let e=0;e<s.length;e++)t^=s.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0).toString(16)}function O1(s){return!(!s||typeof s!="object"||!s.player||typeof s.player.name!="string"||!s.player.attrs||!ne(s.clubId)||!s.season||!Array.isArray(s.season.fixtures)||!Array.isArray(s.season.table)||!s.totals||!Array.isArray(s.timeline)||!Array.isArray(s.committed))}function U1(s,t){return t<2&&(s.flags=s.flags||{},s.earnings=s.earnings||0,s.trophies=s.trophies||[]),s.version=Do,s}function hd(s){let t=JSON.parse(s);if(!t||typeof t.data!="string"||Zm(t.data)!==t.sum)throw new Error("checksum mismatch");let e=t.data;for(let[o,a]of Object.entries(ju))e=e.split(`"${o}"`).join(`"${a}"`);let n=JSON.parse(e),i=t.version||1;if(i>Do)throw new Error("save from a newer version");let r=U1(n,i);if(!O1(r))throw new Error("invalid career data");return r}var Bc=class{constructor(){this.career=null,this.notice=null,this.load()}load(){let t=null;try{t=localStorage.getItem(Fc)}catch{this.notice={bad:!0,text:"Saving is unavailable in this browser (storage blocked). Progress will not persist."};return}if(t)try{this.career=hd(t)}catch{let n=null;try{n=localStorage.getItem(Km)}catch{}try{if(!n)throw new Error("no backup");this.career=hd(n),this.notice={bad:!0,text:"Your career save was damaged, so the backup copy was restored."},this.save()}catch{this.career=null,this.corrupt=t,this.notice={bad:!0,text:"Your career save was damaged and no usable backup exists. Start a new career to continue."}}}}save(){if(!this.career)return{ok:!1,error:"no career"};try{let t=JSON.stringify(this.career),e=JSON.stringify({version:Do,savedAt:Date.now(),sum:Zm(t),data:t}),n=localStorage.getItem(Fc);if(n)try{hd(n),localStorage.setItem(Km,n)}catch{}return localStorage.setItem(Fc,e),{ok:!0}}catch(t){return{ok:!1,error:t&&t.name==="QuotaExceededError"?"Browser storage is full.":"Browser storage is unavailable."}}}set(t){return this.career=t,this.save()}erase(){this.career=null;try{localStorage.removeItem(Fc)}catch{}}};var ud=class{constructor(){let t=document.createElement("style");t.textContent=Md,document.head.appendChild(t),this.params=new URLSearchParams(location.search),this.coarse=!!(window.matchMedia&&matchMedia("(pointer: coarse)").matches),this.settings=ym(this.coarse),this.coarse&&!xm()&&(this.settings.quality="medium"),this.canvas=document.getElementById("game"),this.uiRoot=document.getElementById("ui"),this.view=new vc(this.canvas,{quality:this.settings.quality,preserve:this.params.has("preserve")}),this.view.setQuality(this.settings.quality),this.style=this.params.get("style")||_m(),this.view.setStyle(this.style),this.audio=new _c,this.audio.setVolumes({master:this.settings.master,sfx:this.settings.sfx,crowd:this.settings.crowd}),this.input=new Mc(this.canvas),this.input.sensitivity=this.settings.sensitivity,this.input.invertY=this.settings.invertY,this.hud=new Sc(this.uiRoot),this.touch=new wc(this,this.uiRoot),this.setTouchMode(this.settings.touch==="on"||this.settings.touch!=="off"&&this.coarse),window.addEventListener("pointerdown",r=>{this.settings.touch==="auto"&&(r.pointerType==="touch"&&!this.input.touchMode?this.setTouchMode(!0):r.pointerType==="mouse"&&this.input.touchMode&&!this.input.fromTouch(r)&&this.setTouchMode(!1))},!0),this.store=new Bc,this.screens=new zc(this),this.session=null,this.menuSession=null,this.paused=!1,this.last=performance.now(),this.fpsCap=Number(this.params.get("fps")||0),this.frameAcc=0,this.adapt={on:this.params.has("adapt")||!navigator.webdriver&&!this.fpsCap,ema:1/60,scale:1,floor:.5,low:0,high:0,check:null},this.input.onPause=()=>this.togglePause(),this.input.onLockLost=()=>{this.session&&!this.paused&&this.pause()},this.input.onLockGained=()=>{this.session&&this.awaitingLock&&this.unpause()},this.input.onLockError=()=>{this.session&&this.awaitingLock&&(this.awaitingLock=!1,this.screens.lockRefused())},document.addEventListener("visibilitychange",()=>{document.hidden?this.onBlur():this.onFocus()}),window.addEventListener("blur",()=>this.onBlur()),window.addEventListener("focus",()=>this.onFocus()),window.addEventListener("resize",()=>this.view.resize());let e=()=>{this.audio.init(),(!this.paused||!this.session)&&this.audio.resume()};for(let r of["pointerdown","pointerup","touchend","click","keydown"])window.addEventListener(r,e,{capture:!0});document.addEventListener("gesturestart",r=>r.preventDefault()),document.getElementById("boot")?.remove();let n=this.params.get("auto");!n&&!qm()&&(!navigator.webdriver||this.params.has("tutorial"))?this.screens.startTutorial({first:!0}):(this.startMenuBackground(),this.screens.mainMenu()),requestAnimationFrame(r=>this.loop(r)),window.__ft=this,this.debugStep=r=>{let o=(this.session||this.menuSession).match;for(let a=0;a<r;a++)o.step(1/120)},n&&setTimeout(()=>this.autostart(n),50)}autostart(t){let e=this.params.get("half")?Number(this.params.get("half")):void 0;e&&(this.testHalf=e),t==="quick"?this.startQuickMatch({home:this.params.get("home")||"swindon",away:this.params.get("away")||"chesterfield",role:this.params.get("role")||"ST",venue:this.params.get("venue"),halfLength:e}):t==="practice"?this.startTraining("practice"):t==="tutorial"?this.screens.startTutorial():t.startsWith("drill:")?this.startTraining(t.slice(6)):t==="hub"&&this.screens.hub()}loop(t){requestAnimationFrame(r=>this.loop(r));let e=(t-this.last)/1e3;if(this.adaptResolution(e),this.fpsCap){if(this.frameAcc+=e,this.last=t,this.frameAcc<1/this.fpsCap)return;e=this.frameAcc,this.frameAcc=0}else this.last=t;e=Math.min(e,.1);let n=this.session||this.menuSession;n&&n.frame(this.paused&&this.session?0:e);let i=!!(this.session&&this.session.human&&!this.paused&&!this.session.ended&&!this.session.replay);this.touch.setVisible(this.input.touchMode&&i),this.touch.visible&&this.touch.update(this.session),this.onFrame&&this.onFrame(e)}adaptResolution(t){let e=this.adapt;if(!e.on||t<=0||t>.5)return;if(!!!(this.session&&!this.paused&&!document.hidden)){e.low=0,e.high=0,e.check=null;return}if(e.ema+=(t-e.ema)*.06,e.floorT=(e.floorT||0)+t,e.floor>.5&&e.floorT>30&&(e.floor=.5),e.check){e.check.t+=t,e.check.t>2&&(e.ema>e.check.before*.92&&(e.floor=e.check.prev,e.floorT=0,e.scale=e.check.prev,this.view.setResolutionScale(e.scale)),e.check=null);return}if(e.ema>1/42?(e.low+=t,e.high=0):e.ema<1/56?(e.high+=t,e.low=0):(e.low=0,e.high=0),e.low>1.5&&e.scale>e.floor+.01){let i=e.scale;e.scale=Math.max(e.floor,e.scale*.85),this.view.setResolutionScale(e.scale),e.check={before:e.ema,prev:i,t:0},e.low=0}else e.high>6&&e.scale<1&&(e.scale=Math.min(1,e.scale*1.12),this.view.setResolutionScale(e.scale),e.high=0)}setTouchMode(t){this.input.touchMode=t,document.documentElement.dataset.touch=t?"1":"0",t||this.touch.setVisible(!1)}tryFullscreen(){if(!this.input.touchMode||document.fullscreenElement||this.params.has("nofs"))return;let t=document.documentElement;try{let e=t.requestFullscreen&&t.requestFullscreen({navigationUI:"hide"});e&&e.then&&e.then(()=>{try{let n=screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape");n&&n.catch&&n.catch(()=>{})}catch{}}).catch(()=>{})}catch{}}startMenuBackground(t="town"){if(this.menuSession)return;let e=ne("bradford"),n=ne("barnsley"),i=Sr(e,n),r={mode:"menu",venue:t,venueOpts:{homeName:e.name},colours:{kits:i,human:Ds().look},match:{seed:99,halfLength:1e5,difficulty:"standard",teams:[No(e),No(n)]}};this.menuSession=new Lo(this,r),this.menuSession.cam.radius=60,this.menuSession.cam.height=24,this.menuSession.start()}stopMenuBackground(){this.menuSession&&(this.menuSession.dispose(),this.menuSession=null)}matchConfig({homeClub:t,awayClub:e,human:n,humanSide:i=0,seed:r=1,halfLength:o,difficulty:a,strengths:l}){let c=Sr(t,e),h=No(t,{human:i===0?n:null,strength:l&&l[0]}),u=No(e,{human:i===1?n:null,strength:l&&l[1]});return{kits:c,match:{seed:r,halfLength:o||Fl[this.settings.matchLength]||180,difficulty:a||this.settings.difficulty,teams:[h,u]}}}startSession(t){return this.stopMenuBackground(),this.session&&this.session.dispose(),this.screens.clear(),this.session=new Lo(this,t),this.hud.show(!0),this.session.start(),this.paused=!0,this.session.setPaused(!0),this.input.active=!0,this.screens.clickToPlay(),this.session}endSession(){this.session&&this.session.dispose(),this.session=null,this.paused=!1,this.input.active=!1,this.input.exitLock(),this.hud.show(!1),this.startMenuBackground()}startQuickMatch(t){let e=ne(t.home)||yn[0],n=ne(t.away)||yn[1],i=this.store.career,r={...i?i.player:Ds()};t.role&&(r.role=t.role);let o=t.side||0,a=this.params.get("seed")?Number(this.params.get("seed")):(Date.now()&65535)+1,l=this.matchConfig({homeClub:e,awayClub:n,human:r,humanSide:o,seed:a,halfLength:t.halfLength}),c=t.venue||Vn(e.tier).venue;return this.startSession({mode:"quick",venue:c,venueOpts:{homeName:e.name},colours:{kits:l.kits,human:r.look},match:l.match,onEnd:h=>this.screens.report(h,{quick:!0})})}startTraining(t){return this.screens.startDrill(t)}playCareerMatch(){let t=this.store.career,e=Nm(t);if(!e)return;let n=e.fx,i=ne(n.home),r=ne(n.away),o=n.home===t.clubId?0:1,a={...t.player},l=this.matchConfig({homeClub:i,awayClub:r,human:a,humanSide:o,seed:vi(`${t.seed}:${t.seasonNo}:${n.round}:${e.id}`),halfLength:this.testHalf}),c=n.final?"continental":Vn(i.tier).venue,h=e.id;return this.startSession({mode:"career",venue:c,venueOpts:{homeName:i.name,final:!!n.final},final:n.final?n.name:null,title:n.final?`${n.name}: ${i.name} v ${r.name}`:`${Vn(i.tier).league} \xB7 Round ${n.round}: ${i.name} v ${r.name}`,colours:{kits:l.kits,human:a.look},match:l.match,onEnd:u=>this.screens.report(u,{career:!0,matchId:h,fx:n,title:n.final?"Continental Cup Final":`Round ${n.round} report`})})}togglePause(){if(!this.session){this.screens.back();return}this.paused?this.resume():this.pause()}pause(){!this.session||this.session.ended||(this.paused=!0,this.session.setPaused(!0),this.input.releaseAll(),this.touch.setVisible(!1),this.input.exitLock(),this.audio.suspend(),this.screens.pauseMenu())}resume(){if(!this.session)return;if(this.input.active=!0,this.input.touchMode){this.tryFullscreen(),this.unpause();return}if(this.input.dragMode||this.input.locked){this.unpause();return}if(this.screens.clear(),this.awaitingLock=!0,!this.input.requestLock()){this.awaitingLock=!1,this.unpause();return}clearTimeout(this.lockTimer),this.lockTimer=setTimeout(()=>{this.awaitingLock&&!this.input.locked&&(this.awaitingLock=!1,this.screens.lockRefused())},1500)}unpause(){this.awaitingLock=!1,this.screens.clear(),this.paused=!1,this.session&&this.session.setPaused(!1),this.audio.resume()}onBlur(){this.audio.setMuted(!0),this.session&&!this.paused&&!this.session.ended&&this.pause()}onFocus(){this.audio.setMuted(!1),this.paused&&this.audio.suspend()}applySettings(){let t=this.settings,e=t.touch==="on"||t.touch!=="off"&&(this.coarse||this.input.touchMode);if(e!==this.input.touchMode&&this.setTouchMode(e),this.input.sensitivity=t.sensitivity,this.input.invertY=t.invertY,this.audio.setVolumes({master:t.master,sfx:t.sfx,crowd:t.crowd}),this.view.quality!==t.quality){this.view.setQuality(t.quality),this.view.venueKey=null;let n=this.session||this.menuSession;n&&this.view.setVenue(n.cfg.venue,n.cfg.venueOpts||{}),this.view.match&&this.view.rebuildCharacters()}vm(t)||this.screens.toast("Settings could not be saved (storage unavailable).",!0)}setStyle(t){this.style=t,this.view.setStyle(t),bm(t)}};function Jm(){try{new ud}catch(s){console.error(s);let t=document.getElementById("boot");t&&(t.textContent="First Touch could not start: "+s.message+" (a browser with WebGL2 is required).")}}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",Jm):Jm();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
