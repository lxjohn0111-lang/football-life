/* First Touch - bundled game. three.js is MIT licensed (see vendor/three/LICENSE). */
(()=>{var Vu=`/* First Touch UI. Two themes selected by html[data-style]:
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
.hidden { display: none !important; }
.screen { position: absolute; inset: 0; pointer-events: auto; display: flex; overflow: auto; }
.screen.center { align-items: center; justify-content: center; }
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
`;var fd=0,Jc=1,pd=2;var jc=0,Yr=1,md=2,nr=3,si=0,je=1,Nn=2,ri=0,ir=1,Qc=2,th=3,eh=4,gd=5;var xs=100,xd=101,yd=102,vd=103,_d=104,bd=200,Md=201,Sd=202,wd=203,nh=204,ih=205,Td=206,Ed=207,Ad=208,Rd=209,Cd=210,Pd=211,Id=212,Ld=213,Nd=214,Ko=0,Zo=1,Jo=2,Ws=3,jo=4,Qo=5,ta=6,ea=7,sh=0,Dd=1,Ud=2,Gn=0,rh=1,oh=2,ah=3,lh=4,ch=5,hh=6,uh=7;var dh=300,Wi=301,ys=302,Aa=303,Ra=304,Kr=306,na=1e3,Qn=1001,ia=1002,ze=1003,Od=1004;var Zr=1005;var Xe=1006,Ca=1007;var Xi=1008;var xn=1009,fh=1010,ph=1011,sr=1012,Pa=1013,Wn=1014,yn=1015,Xn=1016,Ia=1017,La=1018,rr=1020,mh=35902,gh=35899,xh=1021,yh=1022,vn=1023,ti=1026,$i=1027,Na=1028,Da=1029,qi=1030,Ua=1031;var Oa=1033,Jr=33776,jr=33777,Qr=33778,to=33779,Fa=35840,ka=35841,za=35842,Ba=35843,Ha=36196,Va=37492,Ga=37496,Wa=37488,Xa=37489,eo=37490,$a=37491,qa=37808,Ya=37809,Ka=37810,Za=37811,Ja=37812,ja=37813,Qa=37814,tl=37815,el=37816,nl=37817,il=37818,sl=37819,rl=37820,ol=37821,al=36492,ll=36494,cl=36495,hl=36283,ul=36284,no=36285,dl=36286;var Lr=2300,sa=2301,qo=2302,Wc=2303,Xc=2400,$c=2401,qc=2402;var Fd=3200;var vh=0,kd=1,bi="",wn="srgb",ds="srgb-linear",Nr="linear",xe="srgb";var Yo=7680;var zd=519,Bd=512,Hd=513,Vd=514,fl=515,Gd=516,Wd=517,pl=518,Xd=519,$d=35044,_h=35048;var bh="300 es",Vn=2e3,Xs=2001;function bm(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Mm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Dr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qd(){let i=Dr("canvas");return i.style.display="block",i}var Gu={},$s=null;function Mh(...i){let t="THREE."+i.shift();$s?$s("log",t,...i):console.log(t,...i)}function Yd(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ht(...i){i=Yd(i);let t="THREE."+i.shift();if($s)$s("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Gt(...i){i=Yd(i);let t="THREE."+i.shift();if($s)$s("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function us(...i){let t=i.join(" ");t in Gu||(Gu[t]=!0,Ht(...i))}function Kd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Zd={[Ko]:Zo,[Jo]:ta,[jo]:ea,[Ws]:Qo,[Zo]:Ko,[ta]:Jo,[ea]:jo,[Qo]:Ws},ei=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wu=1234567,Pr=Math.PI/180,qs=180/Math.PI;function or(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]+"-"+nn[t&255]+nn[t>>8&255]+"-"+nn[t>>16&15|64]+nn[t>>24&255]+"-"+nn[e&63|128]+nn[e>>8&255]+"-"+nn[e>>16&255]+nn[e>>24&255]+nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]).toLowerCase()}function ce(i,t,e){return Math.max(t,Math.min(e,i))}function Sh(i,t){return(i%t+t)%t}function Sm(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function wm(i,t,e){return i!==t?(e-i)/(t-i):0}function Ir(i,t,e){return(1-e)*i+e*t}function Tm(i,t,e,n){return Ir(i,t,1-Math.exp(-e*n))}function Em(i,t=1){return t-Math.abs(Sh(i,t*2)-t)}function Am(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Rm(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Cm(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Pm(i,t){return i+Math.random()*(t-i)}function Im(i){return i*(.5-Math.random())}function Lm(i){i!==void 0&&(Wu=i);let t=Wu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Nm(i){return i*Pr}function Dm(i){return i*qs}function Um(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Om(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Fm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function km(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),p=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*d,l*u,a*c);break;case"YZY":i.set(l*u,a*h,l*d,a*c);break;case"ZXZ":i.set(l*d,l*u,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*p,a*c);break;case"YXY":i.set(l*p,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*p,a*h,a*c);break;default:Ht("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Vs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function hn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var io={DEG2RAD:Pr,RAD2DEG:qs,generateUUID:or,clamp:ce,euclideanModulo:Sh,mapLinear:Sm,inverseLerp:wm,lerp:Ir,damp:Tm,pingpong:Em,smoothstep:Am,smootherstep:Rm,randInt:Cm,randFloat:Pm,randFloatSpread:Im,seededRandom:Lm,degToRad:Nm,radToDeg:Dm,isPowerOfTwo:Um,ceilPowerOfTwo:Om,floorPowerOfTwo:Fm,setQuaternionFromProperEuler:km,normalize:hn,denormalize:Vs},Rh=class Rh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Rh.prototype.isVector2=!0;var Zt=Rh,Be=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],p=r[o+1],g=r[o+2],x=r[o+3];if(d!==x||l!==u||c!==p||h!==g){let m=l*u+c*p+h*g+d*x;m<0&&(u=-u,p=-p,g=-g,x=-x,m=-m);let f=1-a;if(m<.9995){let M=Math.acos(m),y=Math.sin(M);f=Math.sin(f*M)/y,a=Math.sin(a*M)/y,l=l*f+u*a,c=c*f+p*a,h=h*f+g*a,d=d*f+x*a}else{l=l*f+u*a,c=c*f+p*a,h=h*f+g*a,d=d*f+x*a;let M=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=M,c*=M,h*=M,d*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[o],u=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*p-c*u,t[e+1]=l*g+h*u+c*d-a*p,t[e+2]=c*g+h*p+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),d=a(r/2),u=l(n/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:Ht("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>a&&n>d){let p=2*Math.sqrt(1+n-a-d);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>d){let p=2*Math.sqrt(1+a-n-d);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+d-n-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ce(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ch=class Ch{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xu.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Sc.copy(this).projectOnVector(t),this.sub(Sc)}reflect(t){return this.sub(Sc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ch.prototype.isVector3=!0;var L=Ch,Sc=new L,Xu=new Be,Ph=class Ph{constructor(t,e,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],x=s[0],m=s[3],f=s[6],M=s[1],y=s[4],v=s[7],b=s[2],S=s[5],E=s[8];return r[0]=o*x+a*M+l*b,r[3]=o*m+a*y+l*S,r[6]=o*f+a*v+l*E,r[1]=c*x+h*M+d*b,r[4]=c*m+h*y+d*S,r[7]=c*f+h*v+d*E,r[2]=u*x+p*M+g*b,r[5]=u*m+p*y+g*S,r[8]=u*f+p*v+g*E,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,p=c*r-o*l,g=e*d+n*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(s*c-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=u*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=p*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return us("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(wc.makeScale(t,e)),this}rotate(t){return us("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(wc.makeRotation(-t)),this}translate(t,e){return us("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(wc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Ph.prototype.isMatrix3=!0;var Vt=Ph,wc=new Vt,$u=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qu=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zm(){let i={enabled:!0,workingColorSpace:ds,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===xe&&(s.r=vi(s.r),s.g=vi(s.g),s.b=vi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===xe&&(s.r=Gs(s.r),s.g=Gs(s.g),s.b=Gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bi?Nr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return us("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return us("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ds]:{primaries:t,whitePoint:n,transfer:Nr,toXYZ:$u,fromXYZ:qu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:wn},outputColorSpaceConfig:{drawingBufferColorSpace:wn}},[wn]:{primaries:t,whitePoint:n,transfer:xe,toXYZ:$u,fromXYZ:qu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:wn}}}),i}var oe=zm();function vi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Rs,ra=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Rs===void 0&&(Rs=Dr("canvas")),Rs.width=t.width,Rs.height=t.height;let s=Rs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Rs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Dr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=vi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(vi(e[n]/255)*255):e[n]=vi(e[n]);return{data:e,width:t.width,height:t.height}}else return Ht("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Bm=0,Ys=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Bm++}),this.uuid=or(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Tc(s[o].image)):r.push(Tc(s[o]))}else r=Tc(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Tc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ra.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ht("Texture: Unable to serialize Texture."),{})}var Hm=0,Ec=new L,un=class i extends ei{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Qn,s=Qn,r=Xe,o=Xi,a=vn,l=xn,c=i.DEFAULT_ANISOTROPY,h=bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hm++}),this.uuid=or(),this.name="",this.source=new Ys(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Zt(0,0),this.repeat=new Zt(1,1),this.center=new Zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ec).x}get height(){return this.source.getSize(Ec).y}get depth(){return this.source.getSize(Ec).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Ht(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ht(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case na:t.x=t.x-Math.floor(t.x);break;case Qn:t.x=t.x<0?0:1;break;case ia:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case na:t.y=t.y-Math.floor(t.y);break;case Qn:t.y=t.y<0?0:1;break;case ia:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=dh;un.DEFAULT_ANISOTROPY=1;var Ih=class Ih{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(c+1)/2,v=(p+1)/2,b=(f+1)/2,S=(h+u)/4,E=(d+x)/4,_=(g+m)/4;return y>v&&y>b?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=S/n,r=E/n):v>b?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=S/s,r=_/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=E/r,s=_/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-x)/M,this.z=(u-h)/M,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this.w=ce(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this.w=ce(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ih.prototype.isVector4=!0;var Te=Ih,oa=class extends ei{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Te(0,0,t,e),this.scissorTest=!1,this.viewport=new Te(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new un(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Xe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ys(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},on=class extends oa{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ur=class extends un{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var aa=class extends un{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Ea=class Ea{constructor(t,e,n,s,r,o,a,l,c,h,d,u,p,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,d,u,p,g,x,m)}set(t,e,n,s,r,o,a,l,c,h,d,u,p,g,x,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ea().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Cs.setFromMatrixColumn(t,0).length(),r=1/Cs.setFromMatrixColumn(t,1).length(),o=1/Cs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,p=o*d,g=a*h,x=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=p+g*c,e[5]=u-x*c,e[9]=-a*l,e[2]=x-u*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,p=l*d,g=c*h,x=c*d;e[0]=u+x*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=x+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,p=l*d,g=c*h,x=c*d;e[0]=u-x*a,e[4]=-o*d,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=x-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,p=o*d,g=a*h,x=a*d;e[0]=l*h,e[4]=g*c-p,e[8]=u*c+x,e[1]=l*d,e[5]=x*c+u,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,p=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-u*d,e[8]=g*d+p,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*d+g,e[10]=u-x*d}else if(t.order==="XZY"){let u=o*l,p=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+x,e[5]=o*h,e[9]=p*d-g,e[2]=g*d-p,e[6]=a*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Vm,t,Gm)}lookAt(t,e,n){let s=this.elements;return Mn.subVectors(t,e),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),Pi.crossVectors(n,Mn),Pi.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),Pi.crossVectors(n,Mn)),Pi.normalize(),Ao.crossVectors(Mn,Pi),s[0]=Pi.x,s[4]=Ao.x,s[8]=Mn.x,s[1]=Pi.y,s[5]=Ao.y,s[9]=Mn.y,s[2]=Pi.z,s[6]=Ao.z,s[10]=Mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],x=n[6],m=n[10],f=n[14],M=n[3],y=n[7],v=n[11],b=n[15],S=s[0],E=s[4],_=s[8],A=s[12],C=s[1],P=s[5],N=s[9],k=s[13],I=s[2],z=s[6],q=s[10],Y=s[14],st=s[3],Z=s[7],Q=s[11],$=s[15];return r[0]=o*S+a*C+l*I+c*st,r[4]=o*E+a*P+l*z+c*Z,r[8]=o*_+a*N+l*q+c*Q,r[12]=o*A+a*k+l*Y+c*$,r[1]=h*S+d*C+u*I+p*st,r[5]=h*E+d*P+u*z+p*Z,r[9]=h*_+d*N+u*q+p*Q,r[13]=h*A+d*k+u*Y+p*$,r[2]=g*S+x*C+m*I+f*st,r[6]=g*E+x*P+m*z+f*Z,r[10]=g*_+x*N+m*q+f*Q,r[14]=g*A+x*k+m*Y+f*$,r[3]=M*S+y*C+v*I+b*st,r[7]=M*E+y*P+v*z+b*Z,r[11]=M*_+y*N+v*q+b*Q,r[15]=M*A+y*k+v*Y+b*$,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],p=t[14],g=t[3],x=t[7],m=t[11],f=t[15],M=l*p-c*u,y=a*p-c*d,v=a*u-l*d,b=o*p-c*h,S=o*u-l*h,E=o*d-a*h;return e*(x*M-m*y+f*v)-n*(g*M-m*b+f*S)+s*(g*y-x*b+f*E)-r*(g*v-x*S+m*E)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],p=t[11],g=t[12],x=t[13],m=t[14],f=t[15],M=e*a-n*o,y=e*l-s*o,v=e*c-r*o,b=n*l-s*a,S=n*c-r*a,E=s*c-r*l,_=h*x-d*g,A=h*m-u*g,C=h*f-p*g,P=d*m-u*x,N=d*f-p*x,k=u*f-p*m,I=M*k-y*N+v*P+b*C-S*A+E*_;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/I;return t[0]=(a*k-l*N+c*P)*z,t[1]=(s*N-n*k-r*P)*z,t[2]=(x*E-m*S+f*b)*z,t[3]=(u*S-d*E-p*b)*z,t[4]=(l*C-o*k-c*A)*z,t[5]=(e*k-s*C+r*A)*z,t[6]=(m*v-g*E-f*y)*z,t[7]=(h*E-u*v+p*y)*z,t[8]=(o*N-a*C+c*_)*z,t[9]=(n*C-e*N-r*_)*z,t[10]=(g*S-x*v+f*M)*z,t[11]=(d*v-h*S-p*M)*z,t[12]=(a*A-o*P-l*_)*z,t[13]=(e*P-n*A+s*_)*z,t[14]=(x*y-g*b-m*M)*z,t[15]=(h*b-d*y+u*M)*z,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,p=r*h,g=r*d,x=o*h,m=o*d,f=a*d,M=l*c,y=l*h,v=l*d,b=n.x,S=n.y,E=n.z;return s[0]=(1-(x+f))*b,s[1]=(p+v)*b,s[2]=(g-y)*b,s[3]=0,s[4]=(p-v)*S,s[5]=(1-(u+f))*S,s[6]=(m+M)*S,s[7]=0,s[8]=(g+y)*E,s[9]=(m-M)*E,s[10]=(1-(u+x))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Cs.set(s[0],s[1],s[2]).length(),a=Cs.set(s[4],s[5],s[6]).length(),l=Cs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),kn.copy(this);let c=1/o,h=1/a,d=1/l;return kn.elements[0]*=c,kn.elements[1]*=c,kn.elements[2]*=c,kn.elements[4]*=h,kn.elements[5]*=h,kn.elements[6]*=h,kn.elements[8]*=d,kn.elements[9]*=d,kn.elements[10]*=d,e.setFromRotationMatrix(kn),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=Vn,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),p=(n+s)/(n-s),g,x;if(l)g=r/(o-r),x=o*r/(o-r);else if(a===Vn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Xs)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Vn,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),p=-(n+s)/(n-s),g,x;if(l)g=1/(o-r),x=o/(o-r);else if(a===Vn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===Xs)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Ea.prototype.isMatrix4=!0;var re=Ea,Cs=new L,kn=new re,Vm=new L(0,0,0),Gm=new L(1,1,1),Pi=new L,Ao=new L,Mn=new L,Yu=new re,Ku=new Be,mn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(ce(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ce(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ce(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ce(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ce(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-ce(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ht("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Yu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ku.setFromEuler(this),this.setFromQuaternion(Ku,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};mn.DEFAULT_ORDER="XYZ";var Or=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Wm=0,Zu=new L,Ps=new Be,pi=new re,Ro=new L,wr=new L,Xm=new L,$m=new Be,Ju=new L(1,0,0),ju=new L(0,1,0),Qu=new L(0,0,1),td={type:"added"},qm={type:"removed"},Is={type:"childadded",child:null},Ac={type:"childremoved",child:null},dn=class i extends ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wm++}),this.uuid=or(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new mn,n=new Be,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new re},normalMatrix:{value:new Vt}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Or,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ps.setFromAxisAngle(t,e),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(t,e){return Ps.setFromAxisAngle(t,e),this.quaternion.premultiply(Ps),this}rotateX(t){return this.rotateOnAxis(Ju,t)}rotateY(t){return this.rotateOnAxis(ju,t)}rotateZ(t){return this.rotateOnAxis(Qu,t)}translateOnAxis(t,e){return Zu.copy(t).applyQuaternion(this.quaternion),this.position.add(Zu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ju,t)}translateY(t){return this.translateOnAxis(ju,t)}translateZ(t){return this.translateOnAxis(Qu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ro.copy(t):Ro.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),wr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(wr,Ro,this.up):pi.lookAt(Ro,wr,this.up),this.quaternion.setFromRotationMatrix(pi),s&&(pi.extractRotation(s.matrixWorld),Ps.setFromRotationMatrix(pi),this.quaternion.premultiply(Ps.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Gt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(td),Is.child=t,this.dispatchEvent(Is),Is.child=null):Gt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qm),Ac.child=t,this.dispatchEvent(Ac),Ac.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pi.multiply(t.parent.matrixWorld)),t.applyMatrix4(pi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(td),Is.child=t,this.dispatchEvent(Is),Is.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wr,t,Xm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wr,$m,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};dn.DEFAULT_UP=new L(0,1,0);dn.DEFAULT_MATRIX_AUTO_UPDATE=!0;dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Tn=class extends dn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ym={type:"move"},Ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ym)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Tn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Jd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},Co={h:0,s:0,l:0};function Rc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Qt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=wn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=n,oe.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=oe.workingColorSpace){if(t=Sh(t,1),e=ce(e,0,1),n=ce(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Rc(o,r,t+1/3),this.g=Rc(o,r,t),this.b=Rc(o,r,t-1/3)}return oe.colorSpaceToWorking(this,s),this}setStyle(t,e=wn){function n(r){r!==void 0&&parseFloat(r)<1&&Ht("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ht("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Ht("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=wn){let n=Jd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ht("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vi(t.r),this.g=vi(t.g),this.b=vi(t.b),this}copyLinearToSRGB(t){return this.r=Gs(t.r),this.g=Gs(t.g),this.b=Gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=wn){return oe.workingToColorSpace(sn.copy(this),t),Math.round(ce(sn.r*255,0,255))*65536+Math.round(ce(sn.g*255,0,255))*256+Math.round(ce(sn.b*255,0,255))}getHexString(t=wn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace(sn.copy(this),e);let n=sn.r,s=sn.g,r=sn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace(sn.copy(this),e),t.r=sn.r,t.g=sn.g,t.b=sn.b,t}getStyle(t=wn){oe.workingToColorSpace(sn.copy(this),t);let e=sn.r,n=sn.g,s=sn.b;return t!==wn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ii),this.setHSL(Ii.h+t,Ii.s+e,Ii.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ii),t.getHSL(Co);let n=Ir(Ii.h,Co.h,e),s=Ir(Ii.s,Co.s,e),r=Ir(Ii.l,Co.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},sn=new Qt;Qt.NAMES=Jd;var Fr=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Qt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Zs=class extends dn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mn,this.environmentIntensity=1,this.environmentRotation=new mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},zn=new L,mi=new L,Cc=new L,gi=new L,Ls=new L,Ns=new L,ed=new L,Pc=new L,Ic=new L,Lc=new L,Nc=new Te,Dc=new Te,Uc=new Te,Ui=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),zn.subVectors(t,e),s.cross(zn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){zn.subVectors(s,e),mi.subVectors(n,e),Cc.subVectors(t,e);let o=zn.dot(zn),a=zn.dot(mi),l=zn.dot(Cc),c=mi.dot(mi),h=mi.dot(Cc),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,p=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,gi)===null?!1:gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,gi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,gi.x),l.addScaledVector(o,gi.y),l.addScaledVector(a,gi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Nc.setScalar(0),Dc.setScalar(0),Uc.setScalar(0),Nc.fromBufferAttribute(t,e),Dc.fromBufferAttribute(t,n),Uc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Nc,r.x),o.addScaledVector(Dc,r.y),o.addScaledVector(Uc,r.z),o}static isFrontFacing(t,e,n,s){return zn.subVectors(n,e),mi.subVectors(t,e),zn.cross(mi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return zn.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),zn.cross(mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Ls.subVectors(s,n),Ns.subVectors(r,n),Pc.subVectors(t,n);let l=Ls.dot(Pc),c=Ns.dot(Pc);if(l<=0&&c<=0)return e.copy(n);Ic.subVectors(t,s);let h=Ls.dot(Ic),d=Ns.dot(Ic);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ls,o);Lc.subVectors(t,r);let p=Ls.dot(Lc),g=Ns.dot(Lc);if(g>=0&&p<=g)return e.copy(r);let x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Ns,a);let m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return ed.subVectors(r,s),a=(d-h)/(d-h+(p-g)),e.copy(s).addScaledVector(ed,a);let f=1/(m+x+u);return o=x*f,a=u*f,e.copy(n).addScaledVector(Ls,o).addScaledVector(Ns,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ni=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Bn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Bn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Bn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Bn):Bn.fromBufferAttribute(r,o),Bn.applyMatrix4(t.matrixWorld),this.expandByPoint(Bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Po.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Po.copy(n.boundingBox)),Po.applyMatrix4(t.matrixWorld),this.union(Po)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bn),Bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Tr),Io.subVectors(this.max,Tr),Ds.subVectors(t.a,Tr),Us.subVectors(t.b,Tr),Os.subVectors(t.c,Tr),Li.subVectors(Us,Ds),Ni.subVectors(Os,Us),as.subVectors(Ds,Os);let e=[0,-Li.z,Li.y,0,-Ni.z,Ni.y,0,-as.z,as.y,Li.z,0,-Li.x,Ni.z,0,-Ni.x,as.z,0,-as.x,-Li.y,Li.x,0,-Ni.y,Ni.x,0,-as.y,as.x,0];return!Oc(e,Ds,Us,Os,Io)||(e=[1,0,0,0,1,0,0,0,1],!Oc(e,Ds,Us,Os,Io))?!1:(Lo.crossVectors(Li,Ni),e=[Lo.x,Lo.y,Lo.z],Oc(e,Ds,Us,Os,Io))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},xi=[new L,new L,new L,new L,new L,new L,new L,new L],Bn=new L,Po=new ni,Ds=new L,Us=new L,Os=new L,Li=new L,Ni=new L,as=new L,Tr=new L,Io=new L,Lo=new L,ls=new L;function Oc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ls.fromArray(i,r);let a=s.x*Math.abs(ls.x)+s.y*Math.abs(ls.y)+s.z*Math.abs(ls.z),l=t.dot(ls),c=e.dot(ls),h=n.dot(ls);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var We=new L,No=new Zt,Km=0,En=class extends ei{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Km++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=$d,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)No.fromBufferAttribute(this,e),No.applyMatrix3(t),this.setXY(e,No.x,No.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix3(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix4(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyNormalMatrix(t),this.setXYZ(e,We.x,We.y,We.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.transformDirection(t),this.setXYZ(e,We.x,We.y,We.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Vs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=hn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Vs(e,this.array)),e}setX(t,e){return this.normalized&&(e=hn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Vs(e,this.array)),e}setY(t,e){return this.normalized&&(e=hn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Vs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=hn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Vs(e,this.array)),e}setW(t,e){return this.normalized&&(e=hn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=hn(e,this.array),n=hn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=hn(e,this.array),n=hn(n,this.array),s=hn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=hn(e,this.array),n=hn(n,this.array),s=hn(s,this.array),r=hn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var kr=class extends En{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var zr=class extends En{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var pe=class extends En{constructor(t,e,n){super(new Float32Array(t),e,n)}},Zm=new ni,Er=new L,Fc=new L,ii=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Zm.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Er.subVectors(t,this.center);let e=Er.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Er,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Fc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Er.copy(t.center).add(Fc)),this.expandByPoint(Er.copy(t.center).sub(Fc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Jm=0,Ln=new re,kc=new dn,Fs=new L,Sn=new ni,Ar=new ni,Ze=new L,Je=class i extends ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jm++}),this.uuid=or(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(bm(t)?zr:kr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ln.makeRotationFromQuaternion(t),this.applyMatrix4(Ln),this}rotateX(t){return Ln.makeRotationX(t),this.applyMatrix4(Ln),this}rotateY(t){return Ln.makeRotationY(t),this.applyMatrix4(Ln),this}rotateZ(t){return Ln.makeRotationZ(t),this.applyMatrix4(Ln),this}translate(t,e,n){return Ln.makeTranslation(t,e,n),this.applyMatrix4(Ln),this}scale(t,e,n){return Ln.makeScale(t,e,n),this.applyMatrix4(Ln),this}lookAt(t){return kc.lookAt(t),kc.updateMatrix(),this.applyMatrix4(kc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fs).negate(),this.translate(Fs.x,Fs.y,Fs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pe(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ht("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ni);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Gt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Sn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ze.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(Ze),Ze.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(Ze)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Gt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ii);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Gt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(Sn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Ar.setFromBufferAttribute(a),this.morphTargetsRelative?(Ze.addVectors(Sn.min,Ar.min),Sn.expandByPoint(Ze),Ze.addVectors(Sn.max,Ar.max),Sn.expandByPoint(Ze)):(Sn.expandByPoint(Ar.min),Sn.expandByPoint(Ar.max))}Sn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ze.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ze));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ze.fromBufferAttribute(a,c),l&&(Fs.fromBufferAttribute(t,c),Ze.add(Fs)),s=Math.max(s,n.distanceToSquared(Ze))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Gt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Gt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new En(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let _=0;_<n.count;_++)a[_]=new L,l[_]=new L;let c=new L,h=new L,d=new L,u=new Zt,p=new Zt,g=new Zt,x=new L,m=new L;function f(_,A,C){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,A),d.fromBufferAttribute(n,C),u.fromBufferAttribute(r,_),p.fromBufferAttribute(r,A),g.fromBufferAttribute(r,C),h.sub(c),d.sub(c),p.sub(u),g.sub(u);let P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(P),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(P),a[_].add(x),a[A].add(x),a[C].add(x),l[_].add(m),l[A].add(m),l[C].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let _=0,A=M.length;_<A;++_){let C=M[_],P=C.start,N=C.count;for(let k=P,I=P+N;k<I;k+=3)f(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let y=new L,v=new L,b=new L,S=new L;function E(_){b.fromBufferAttribute(s,_),S.copy(b);let A=a[_];y.copy(A),y.sub(b.multiplyScalar(b.dot(A))).normalize(),v.crossVectors(S,A);let P=v.dot(l[_])<0?-1:1;o.setXYZW(_,y.x,y.y,y.z,P)}for(let _=0,A=M.length;_<A;++_){let C=M[_],P=C.start,N=C.count;for(let k=P,I=P+N;k<I;k+=3)E(t.getX(k+0)),E(t.getX(k+1)),E(t.getX(k+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new En(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,d=new L;if(t)for(let u=0,p=t.count;u<p;u+=3){let g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=e.count;u<p;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ze.fromBufferAttribute(t,e),Ze.normalize(),t.setXYZ(e,Ze.x,Ze.y,Ze.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),p=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new En(u,h,d)}if(this.index===null)return Ht("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],p=t(u,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let p=c[d];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var zc=new L,jm=new L,Qm=new Vt,Hn=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=zc.subVectors(n,e).cross(jm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(zc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Qm.getNormalMatrix(t),s=this.coplanarPoint(zc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},t0=0,fs=class extends ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:t0++}),this.uuid=or(),this.name="",this.type="Material",this.blending=ir,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nh,this.blendDst=ih,this.blendEquation=xs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yo,this.stencilZFail=Yo,this.stencilZPass=Yo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Ht(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ht(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Qt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Hn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Zt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Zt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var yi=new L,Bc=new L,Do=new L,Uo=new L,la=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=yi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yi.copy(this.origin).addScaledVector(this.direction,e),yi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Bc.copy(t).add(e).multiplyScalar(.5),Do.copy(e).sub(t).normalize(),Uo.copy(this.origin).sub(Bc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Do),a=Uo.dot(this.direction),l=-Uo.dot(Do),c=Uo.lengthSq(),h=Math.abs(1-o*o),d,u,p,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let x=1/h;d*=x,u*=x,p=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Bc).addScaledVector(Do,u),p}intersectSphere(t,e){if(t.radius<0)return null;yi.subVectors(t.center,this.origin);let n=yi.dot(this.direction),s=yi.dot(yi)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,yi)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,d=t.x-o.x,u=t.y-o.y,p=t.z-o.z,g=e.x-o.x,x=e.y-o.y,m=e.z-o.z,f=n.x-o.x,M=n.y-o.y,y=n.z-o.z,v=Math.abs(l),b=Math.abs(c),S=Math.abs(h),E,_,A,C,P,N,k,I,z,q,Y,st;if(v>=b&&v>=S?(A=l,N=d,z=g,st=f,l>=0?(E=c,_=h,C=u,P=p,k=x,I=m,q=M,Y=y):(E=h,_=c,C=p,P=u,k=m,I=x,q=y,Y=M)):b>=S?(A=c,N=u,z=x,st=M,c>=0?(E=h,_=l,C=p,P=d,k=m,I=g,q=y,Y=f):(E=l,_=h,C=d,P=p,k=g,I=m,q=f,Y=y)):(A=h,N=p,z=m,st=y,h>=0?(E=l,_=c,C=d,P=u,k=g,I=x,q=f,Y=M):(E=c,_=l,C=u,P=d,k=x,I=g,q=M,Y=f)),A===0)return null;let Z=E/A,Q=_/A,$=1/A,_t=C-Z*N,Et=P-Q*N,lt=k-Z*z,et=I-Q*z,zt=q-Z*st,G=Y-Q*st,K=zt*et-G*lt,ht=_t*G-Et*zt,At=lt*Et-et*_t;if(s){if(K<0||ht<0||At<0)return null}else if((K<0||ht<0||At<0)&&(K>0||ht>0||At>0))return null;let ct=K+ht+At;if(ct===0)return null;let Ot=$*(K*N+ht*z+At*st);return(ct>0?Ot<0:Ot>0)?null:this.at(Ot/ct,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ps=class extends fs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.combine=sh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},nd=new re,cs=new la,Oo=new ii,id=new L,Fo=new L,ko=new L,zo=new L,Hc=new L,Bo=new L,sd=new L,Ho=new L,ue=class extends dn{constructor(t=new Je,e=new ps){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Bo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(Hc.fromBufferAttribute(d,t),o?Bo.addScaledVector(Hc,h):Bo.addScaledVector(Hc.sub(e),h))}e.add(Bo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Oo.copy(n.boundingSphere),Oo.applyMatrix4(r),cs.copy(t.ray).recast(t.near),!(Oo.containsPoint(cs.origin)===!1&&(cs.intersectSphere(Oo,id)===null||cs.origin.distanceToSquared(id)>(t.far-t.near)**2))&&(nd.copy(r).invert(),cs.copy(t.ray).applyMatrix4(nd),!(n.boundingBox!==null&&cs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,cs)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let m=u[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),y=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=M,b=y;v<b;v+=3){let S=a.getX(v),E=a.getX(v+1),_=a.getX(v+2);s=Vo(this,f,t,n,c,h,d,S,E,_),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let M=a.getX(m),y=a.getX(m+1),v=a.getX(m+2);s=Vo(this,o,t,n,c,h,d,M,y,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let m=u[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),y=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=M,b=y;v<b;v+=3){let S=v,E=v+1,_=v+2;s=Vo(this,f,t,n,c,h,d,S,E,_),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let M=m,y=m+1,v=m+2;s=Vo(this,o,t,n,c,h,d,M,y,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function e0(i,t,e,n,s,r,o,a){let l;if(t.side===je?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===si,a),l===null)return null;Ho.copy(a),Ho.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Ho);return c<e.near||c>e.far?null:{distance:c,point:Ho.clone(),object:i}}function Vo(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Fo),i.getVertexPosition(l,ko),i.getVertexPosition(c,zo);let h=e0(i,t,e,n,Fo,ko,zo,sd);if(h){let d=new L;Ui.getBarycoord(sd,Fo,ko,zo,d),s&&(h.uv=Ui.getInterpolatedAttribute(s,a,l,c,d,new Zt)),r&&(h.uv1=Ui.getInterpolatedAttribute(r,a,l,c,d,new Zt)),o&&(h.normal=Ui.getInterpolatedAttribute(o,a,l,c,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new L,materialIndex:0};Ui.getNormal(Fo,ko,zo,u.normal),h.face=u,h.barycoord=d}return h}var ms=class extends un{constructor(t=null,e=1,n=1,s,r,o,a,l,c=ze,h=ze,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var gn=class extends En{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ks=new re,rd=new re,Go=[],od=new ni,n0=new re,Rr=new ue,Cr=new ii,Js=class extends ue{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new gn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,n0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ni),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ks),od.copy(t.boundingBox).applyMatrix4(ks),this.boundingBox.union(od)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ii),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ks),Cr.copy(t.boundingSphere).applyMatrix4(ks),this.boundingSphere.union(Cr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Rr.geometry=this.geometry,Rr.material=this.material,Rr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cr.copy(this.boundingSphere),Cr.applyMatrix4(n),t.ray.intersectsSphere(Cr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ks),rd.multiplyMatrices(n,ks),Rr.matrixWorld=rd,Rr.raycast(t,Go);for(let o=0,a=Go.length;o<a;o++){let l=Go[o];l.instanceId=r,l.object=this,e.push(l)}Go.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new gn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ms(new Float32Array(s*this.count),s,this.count,Na,yn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},hs=new ii,i0=new Zt(.5,.5),Wo=new L,js=class{constructor(t=new Hn,e=new Hn,n=new Hn,s=new Hn,r=new Hn,o=new Hn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Vn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],p=r[7],g=r[8],x=r[9],m=r[10],f=r[11],M=r[12],y=r[13],v=r[14],b=r[15];if(s[0].setComponents(c-o,p-h,f-g,b-M).normalize(),s[1].setComponents(c+o,p+h,f+g,b+M).normalize(),s[2].setComponents(c+a,p+d,f+x,b+y).normalize(),s[3].setComponents(c-a,p-d,f-x,b-y).normalize(),n)s[4].setComponents(l,u,m,v).normalize(),s[5].setComponents(c-l,p-u,f-m,b-v).normalize();else if(s[4].setComponents(c-l,p-u,f-m,b-v).normalize(),e===Vn)s[5].setComponents(c+l,p+u,f+m,b+v).normalize();else if(e===Xs)s[5].setComponents(l,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hs)}intersectsSprite(t){hs.center.set(0,0,0);let e=i0.distanceTo(t.center);return hs.radius=.7071067811865476+e,hs.applyMatrix4(t.matrixWorld),this.intersectsSphere(hs)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Wo.x=s.normal.x>0?t.max.x:t.min.x,Wo.y=s.normal.y>0?t.max.y:t.min.y,Wo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Wo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Br=class extends un{constructor(t=[],e=Wi,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Qs=class extends un{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Oi=class extends un{constructor(t,e,n=Wn,s,r,o,a=ze,l=ze,c,h=ti,d=1){if(h!==ti&&h!==$i)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ys(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},ca=class extends Oi{constructor(t,e=Wn,n=Wi,s,r,o=ze,a=ze,l,c=ti){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Hr=class extends un{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Fi=class i extends Je{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new pe(c,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(d,2));function g(x,m,f,M,y,v,b,S,E,_,A){let C=v/E,P=b/_,N=v/2,k=b/2,I=S/2,z=E+1,q=_+1,Y=0,st=0,Z=new L;for(let Q=0;Q<q;Q++){let $=Q*P-k;for(let _t=0;_t<z;_t++){let Et=_t*C-N;Z[x]=Et*M,Z[m]=$*y,Z[f]=I,c.push(Z.x,Z.y,Z.z),Z[x]=0,Z[m]=0,Z[f]=S>0?1:-1,h.push(Z.x,Z.y,Z.z),d.push(_t/E),d.push(1-Q/_),Y+=1}}for(let Q=0;Q<_;Q++)for(let $=0;$<E;$++){let _t=u+$+z*Q,Et=u+$+z*(Q+1),lt=u+($+1)+z*(Q+1),et=u+($+1)+z*Q;l.push(_t,Et,et),l.push(Et,lt,et),st+=6}a.addGroup(p,st,A),p+=st,u+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var ki=class i extends Je{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],p=[],g=0,x=[],m=n/2,f=0;M(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new pe(d,3)),this.setAttribute("normal",new pe(u,3)),this.setAttribute("uv",new pe(p,2));function M(){let v=new L,b=new L,S=0,E=(e-t)/n;for(let _=0;_<=r;_++){let A=[],C=_/r,P=C*(e-t)+t;for(let N=0;N<=s;N++){let k=N/s,I=k*l+a,z=Math.sin(I),q=Math.cos(I);b.x=P*z,b.y=-C*n+m,b.z=P*q,d.push(b.x,b.y,b.z),v.set(z,E,q).normalize(),u.push(v.x,v.y,v.z),p.push(k,1-C),A.push(g++)}x.push(A)}for(let _=0;_<s;_++)for(let A=0;A<r;A++){let C=x[A][_],P=x[A+1][_],N=x[A+1][_+1],k=x[A][_+1];(t>0||A!==0)&&(h.push(C,P,k),S+=3),(e>0||A!==r-1)&&(h.push(P,N,k),S+=3)}c.addGroup(f,S,0),f+=S}function y(v){let b=g,S=new Zt,E=new L,_=0,A=v===!0?t:e,C=v===!0?1:-1;for(let N=1;N<=s;N++)d.push(0,m*C,0),u.push(0,C,0),p.push(.5,.5),g++;let P=g;for(let N=0;N<=s;N++){let I=N/s*l+a,z=Math.cos(I),q=Math.sin(I);E.x=A*q,E.y=m*C,E.z=A*z,d.push(E.x,E.y,E.z),u.push(0,C,0),S.x=z*.5+.5,S.y=q*.5*C+.5,p.push(S.x,S.y),g++}for(let N=0;N<s;N++){let k=b+N,I=P+N;v===!0?h.push(I,I+1,k):h.push(I+1,I,k),_+=3}c.addGroup(f,_,v===!0?1:2),f+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},_i=class i extends ki{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Vr=class i extends Je{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new pe(r,3)),this.setAttribute("normal",new pe(r.slice(),3)),this.setAttribute("uv",new pe(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){let y=new L,v=new L,b=new L;for(let S=0;S<e.length;S+=3)p(e[S+0],y),p(e[S+1],v),p(e[S+2],b),l(y,v,b,M)}function l(M,y,v,b){let S=b+1,E=[];for(let _=0;_<=S;_++){E[_]=[];let A=M.clone().lerp(v,_/S),C=y.clone().lerp(v,_/S),P=S-_;for(let N=0;N<=P;N++)N===0&&_===S?E[_][N]=A:E[_][N]=A.clone().lerp(C,N/P)}for(let _=0;_<S;_++)for(let A=0;A<2*(S-_)-1;A++){let C=Math.floor(A/2);A%2===0?(u(E[_][C+1]),u(E[_+1][C]),u(E[_][C])):(u(E[_][C+1]),u(E[_+1][C+1]),u(E[_+1][C]))}}function c(M){let y=new L;for(let v=0;v<r.length;v+=3)y.x=r[v+0],y.y=r[v+1],y.z=r[v+2],y.normalize().multiplyScalar(M),r[v+0]=y.x,r[v+1]=y.y,r[v+2]=y.z}function h(){let M=new L;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];let v=m(M)/2/Math.PI+.5,b=f(M)/Math.PI+.5;o.push(v,1-b)}g(),d()}function d(){for(let M=0;M<o.length;M+=6){let y=o[M+0],v=o[M+2],b=o[M+4],S=Math.max(y,v,b),E=Math.min(y,v,b);S>.9&&E<.1&&(y<.2&&(o[M+0]+=1),v<.2&&(o[M+2]+=1),b<.2&&(o[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function p(M,y){let v=M*3;y.x=t[v+0],y.y=t[v+1],y.z=t[v+2]}function g(){let M=new L,y=new L,v=new L,b=new L,S=new Zt,E=new Zt,_=new Zt;for(let A=0,C=0;A<r.length;A+=9,C+=6){M.set(r[A+0],r[A+1],r[A+2]),y.set(r[A+3],r[A+4],r[A+5]),v.set(r[A+6],r[A+7],r[A+8]),S.set(o[C+0],o[C+1]),E.set(o[C+2],o[C+3]),_.set(o[C+4],o[C+5]),b.copy(M).add(y).add(v).divideScalar(3);let P=m(b);x(S,C+0,M,P),x(E,C+2,y,P),x(_,C+4,v,P)}}function x(M,y,v,b){b<0&&M.x===1&&(o[y]=M.x-1),v.x===0&&v.z===0&&(o[y]=b/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function f(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}};var zi=class i extends Vr{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var An=class i extends Je{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,d=t/a,u=e/l,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){let M=f*u-o;for(let y=0;y<c;y++){let v=y*d-r;g.push(v,-M,0),x.push(0,0,1),m.push(y/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<a;M++){let y=M+c*f,v=M+c*(f+1),b=M+1+c*(f+1),S=M+1+c*f;p.push(y,v,S),p.push(v,b,S)}this.setIndex(p),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(x,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},tr=class i extends Je{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],l=[],c=[],h=[],d=t,u=(e-t)/s,p=new L,g=new Zt;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){let f=r+m/n*o;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let x=0;x<s;x++){let m=x*(n+1);for(let f=0;f<n;f++){let M=f+m,y=M,v=M+n+1,b=M+n+2,S=M+1;a.push(y,v,S),a.push(v,b,S)}}this.setIndex(a),this.setAttribute("position",new pe(l,3)),this.setAttribute("normal",new pe(c,3)),this.setAttribute("uv",new pe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var gs=class i extends Je{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new L,u=new L,p=[],g=[],x=[],m=[];for(let f=0;f<=n;f++){let M=[],y=f/n,v=o+y*a,b=t*Math.cos(v),S=Math.sqrt(t*t-b*b),E=0;f===0&&o===0?E=.5/e:f===n&&l===Math.PI&&(E=-.5/e);for(let _=0;_<=e;_++){let A=_/e,C=s+A*r;d.x=-S*Math.cos(C),d.y=b,d.z=S*Math.sin(C),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(A+E,1-y),M.push(c++)}h.push(M)}for(let f=0;f<n;f++)for(let M=0;M<e;M++){let y=h[f][M+1],v=h[f][M],b=h[f+1][M],S=h[f+1][M+1];(f!==0||o>0)&&p.push(y,v,S),(f!==n-1||l<Math.PI)&&p.push(v,b,S)}this.setIndex(p),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(x,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Gr=class i extends Vr{constructor(t=1,e=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};function vs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(ad(s))s.isRenderTargetTexture?(Ht("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(ad(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function an(i){let t={};for(let e=0;e<i.length;e++){let n=vs(i[e]);for(let s in n)t[s]=n[s]}return t}function ad(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function s0(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function wh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}var so={clone:vs,merge:an},r0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,o0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Fe=class extends fs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=r0,this.fragmentShader=o0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=vs(t.uniforms),this.uniformsGroups=s0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Qt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Zt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Te().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Vt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new re().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ha=class extends Fe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ua=class extends fs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},da=class extends fs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function zs(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Vc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Bi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},fa=class extends Bi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xc,endingEnd:Xc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case $c:r=t,a=2*e-n;break;case qc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case $c:o=t,l=2*n-e;break;case qc:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,f=-u*m+2*u*x-u*g,M=(1+u)*m+(-1.5-2*u)*x+(-.5+u)*g+1,y=(-1-p)*m+(1.5+p)*x+.5*g,v=p*m-p*x;for(let b=0;b!==a;++b)r[b]=f*o[h+b]+M*o[c+b]+y*o[l+b]+v*o[d+b];return r}},pa=class extends Bi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},ma=class extends Bi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ga=class extends Bi{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-e)/(s-e),x=1-g;for(let m=0;m!==a;++m)r[m]=o[c+m]*x+o[l+m]*g;return r}let u=a*2,p=t-1;for(let g=0;g!==a;++g){let x=o[c+g],m=o[l+g],f=p*u+g*2,M=d[f],y=d[f+1],v=t*u+g*2,b=h[v],S=h[v+1],E=l0(n,e,M,b,s);r[g]=jd(E,x,y,S,m)}return r}};function jd(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function a0(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function l0(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=jd(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let l=a0(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var Rn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=zs(e,this.TimeBufferType),this.values=zs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:zs(t.times,Array),values:zs(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Vc(t.settings)&&(n.settings={inTangents:zs(t.settings.inTangents,Array),outTangents:zs(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ma(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new pa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new fa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new ga(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Lr:e=this.InterpolantFactoryMethodDiscrete;break;case sa:e=this.InterpolantFactoryMethodLinear;break;case qo:e=this.InterpolantFactoryMethodSmooth;break;case Wc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ht("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Lr;case this.InterpolantFactoryMethodLinear:return sa;case this.InterpolantFactoryMethodSmooth:return qo;case this.InterpolantFactoryMethodBezier:return Wc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Vc(this.settings)&&(ld(this.settings.inTangents,t),ld(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Gt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Gt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Gt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Gt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Mm(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Gt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===qo,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let d=a*n,u=d-n,p=d+n;for(let g=0;g!==n;++g){let x=e[d+g];if(x!==e[u+g]||x!==e[p+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let p=0;p!==n;++p)e[u+p]=e[d+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Vc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function ld(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Rn.prototype.ValueTypeName="";Rn.prototype.TimeBufferType=Float32Array;Rn.prototype.ValueBufferType=Float32Array;Rn.prototype.DefaultInterpolation=sa;var Hi=class extends Rn{constructor(t,e,n){super(t,e,n)}};Hi.prototype.ValueTypeName="bool";Hi.prototype.ValueBufferType=Array;Hi.prototype.DefaultInterpolation=Lr;Hi.prototype.InterpolantFactoryMethodLinear=void 0;Hi.prototype.InterpolantFactoryMethodSmooth=void 0;var xa=class extends Rn{constructor(t,e,n,s){super(t,e,n,s)}};xa.prototype.ValueTypeName="color";var ya=class extends Rn{constructor(t,e,n,s){super(t,e,n,s)}};ya.prototype.ValueTypeName="number";var va=class extends Bi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)Be.slerpFlat(r,0,o,c-a,o,c,l);return r}},Wr=class extends Rn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new va(this.times,this.values,this.getValueSize(),t)}};Wr.prototype.ValueTypeName="quaternion";Wr.prototype.InterpolantFactoryMethodSmooth=void 0;var Vi=class extends Rn{constructor(t,e,n){super(t,e,n)}};Vi.prototype.ValueTypeName="string";Vi.prototype.ValueBufferType=Array;Vi.prototype.DefaultInterpolation=Lr;Vi.prototype.InterpolantFactoryMethodLinear=void 0;Vi.prototype.InterpolantFactoryMethodSmooth=void 0;var _a=class extends Rn{constructor(t,e,n,s){super(t,e,n,s)}};_a.prototype.ValueTypeName="vector";var ba=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Qd=new ba,Ma=class{constructor(t){this.manager=t!==void 0?t:Qd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ma.DEFAULT_MATERIAL_NAME="__DEFAULT";var Sa=class extends dn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var Gc=new re,cd=new L,hd=new L,wa=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Zt(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new js,this._frameExtents=new Zt(1,1),this._viewportCount=1,this._viewports=[new Te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;cd.setFromMatrixPosition(t.matrixWorld),e.position.copy(cd),hd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(hd),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Gc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Gc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Xs||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(Gc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Xo=new L,$o=new Be,jn=new L,Xr=class extends dn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=Vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Xo,$o,jn),jn.x===1&&jn.y===1&&jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xo,$o,jn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Xo,$o,jn),jn.x===1&&jn.y===1&&jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xo,$o,jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Di=new L,ud=new Zt,dd=new Zt,rn=class extends Xr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=qs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Pr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return qs*2*Math.atan(Math.tan(Pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Di.x,Di.y).multiplyScalar(-t/Di.z),Di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Di.x,Di.y).multiplyScalar(-t/Di.z)}getViewSize(t,e){return this.getViewBounds(t,ud,dd),e.subVectors(dd,ud)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Pr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Gi=class extends Xr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Yc=class extends wa{constructor(){super(new Gi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},$r=class extends Sa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dn.DEFAULT_UP),this.updateMatrix(),this.target=new dn,this.shadow=new Yc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var qr=class extends Je{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var Bs=-90,Hs=1,er=class extends dn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new rn(Bs,Hs,t,e);s.layers=this.layers,this.add(s);let r=new rn(Bs,Hs,t,e);r.layers=this.layers,this.add(r);let o=new rn(Bs,Hs,t,e);o.layers=this.layers,this.add(o);let a=new rn(Bs,Hs,t,e);a.layers=this.layers,this.add(a);let l=new rn(Bs,Hs,t,e);l.layers=this.layers,this.add(l);let c=new rn(Bs,Hs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Vn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ta=class extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Th="\\[\\]\\.:\\/",c0=new RegExp("["+Th+"]","g"),Eh="[^"+Th+"]",h0="[^"+Th.replace("\\.","")+"]",u0=/((?:WC+[\/:])*)/.source.replace("WC",Eh),d0=/(WCOD+)?/.source.replace("WCOD",h0),f0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Eh),p0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Eh),m0=new RegExp("^"+u0+d0+f0+p0+"$"),g0=["material","materials","bones","map"],Kc=class{constructor(t,e,n){let s=n||Ie.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ie=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(c0,"")}static parseTrackName(t){let e=m0.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);g0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ht("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Gt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Gt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Gt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Gt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Gt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Gt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Gt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;Gt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Gt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Gt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ie.Composite=Kc;Ie.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ie.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ie.prototype.GetterByBindingType=[Ie.prototype._getValue_direct,Ie.prototype._getValue_array,Ie.prototype._getValue_arrayElement,Ie.prototype._getValue_toArray];Ie.prototype.SetterByBindingTypeAndVersioning=[[Ie.prototype._setValue_direct,Ie.prototype._setValue_direct_setNeedsUpdate,Ie.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_array,Ie.prototype._setValue_array_setNeedsUpdate,Ie.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_arrayElement,Ie.prototype._setValue_arrayElement_setNeedsUpdate,Ie.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_fromArray,Ie.prototype._setValue_fromArray_setNeedsUpdate,Ie.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Nb=new Float32Array(1);var Lh=class Lh{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Lh.prototype.isMatrix2=!0;var Zc=Lh;function Ah(i,t,e,n){let s=x0(n);switch(e){case xh:return i*t;case Na:return i*t/s.components*s.byteLength;case Da:return i*t/s.components*s.byteLength;case qi:return i*t*2/s.components*s.byteLength;case Ua:return i*t*2/s.components*s.byteLength;case yh:return i*t*3/s.components*s.byteLength;case vn:return i*t*4/s.components*s.byteLength;case Oa:return i*t*4/s.components*s.byteLength;case Jr:case jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Qr:case to:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ka:case Ba:return Math.max(i,16)*Math.max(t,8)/4;case Fa:case za:return Math.max(i,8)*Math.max(t,8)/2;case Ha:case Va:case Wa:case Xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ga:case eo:case $a:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case qa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ya:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ka:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Za:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ja:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Qa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case tl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case el:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case nl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case il:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case sl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case rl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ol:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case al:case ll:case cl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case hl:case ul:return Math.ceil(i/4)*Math.ceil(t/4)*8;case no:case dl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function x0(i){switch(i){case xn:case fh:return{byteLength:1,components:1};case sr:case ph:case Xn:return{byteLength:2,components:1};case Ia:case La:return{byteLength:2,components:4};case Wn:case Pa:case yn:return{byteLength:4,components:1};case mh:case gh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ht("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Mf(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function v0(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){let g=d[u],x=d[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){let x=d[p];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var _0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,b0=`#ifdef USE_ALPHAHASH
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
#endif`,M0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,S0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,w0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,T0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,E0=`#ifdef USE_AOMAP
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
#endif`,A0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,R0=`#ifdef USE_BATCHING
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
#endif`,C0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,P0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,I0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,L0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,N0=`#ifdef USE_IRIDESCENCE
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
#endif`,D0=`#ifdef USE_BUMPMAP
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
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,O0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,F0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,k0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,B0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,H0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,V0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,G0=`#define PI 3.141592653589793
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
} // validated`,W0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,X0=`vec3 transformedNormal = objectNormal;
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
#endif`,$0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,q0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Y0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,K0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Z0="gl_FragColor = linearToOutputTexel( gl_FragColor );",J0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,j0=`#ifdef USE_ENVMAP
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
#endif`,Q0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,tg=`#ifdef USE_ENVMAP
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
#endif`,eg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ng=`#ifdef USE_ENVMAP
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
#endif`,ig=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,og=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ag=`#ifdef USE_GRADIENTMAP
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
}`,lg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ug=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,dg=`#ifdef USE_ENVMAP
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
#endif`,fg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xg=`PhysicalMaterial material;
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
#endif`,yg=`uniform sampler2D dfgLUT;
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
}`,vg=`
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
#endif`,_g=`#if defined( RE_IndirectDiffuse )
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
#endif`,bg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Sg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Eg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ag=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pg=`#if defined( USE_POINTS_UV )
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
#endif`,Ig=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ng=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ug=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Og=`#ifdef USE_MORPHTARGETS
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
#endif`,Fg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Gg=`#ifdef USE_NORMALMAP
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
#endif`,Wg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$g=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ex=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ix=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rx=`float getShadowMask() {
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
}`,ox=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ax=`#ifdef USE_SKINNING
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
#endif`,lx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cx=`#ifdef USE_SKINNING
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
#endif`,hx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ux=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,px=`#ifdef USE_TRANSMISSION
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
#endif`,mx=`#ifdef USE_TRANSMISSION
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
#endif`,gx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,_x=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bx=`uniform sampler2D t2D;
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
}`,Mx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,wx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ex=`#include <common>
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
}`,Ax=`#if DEPTH_PACKING == 3200
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
}`,Rx=`#define DISTANCE
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
}`,Cx=`#define DISTANCE
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
}`,Px=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ix=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lx=`uniform float scale;
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
}`,Nx=`uniform vec3 diffuse;
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
}`,Dx=`#include <common>
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
}`,Ux=`uniform vec3 diffuse;
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
}`,Ox=`#define LAMBERT
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
}`,Fx=`#define LAMBERT
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
}`,kx=`#define MATCAP
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
}`,zx=`#define MATCAP
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
}`,Bx=`#define NORMAL
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
}`,Hx=`#define NORMAL
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
}`,Vx=`#define PHONG
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
}`,Gx=`#define PHONG
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
}`,Wx=`#define STANDARD
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
}`,Xx=`#define STANDARD
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
}`,$x=`#define TOON
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
}`,qx=`#define TOON
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
}`,Yx=`uniform float size;
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
}`,Kx=`uniform vec3 diffuse;
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
}`,Zx=`#include <common>
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
}`,Jx=`uniform vec3 color;
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
}`,jx=`uniform float rotation;
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
}`,Qx=`uniform vec3 diffuse;
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
}`,ne={alphahash_fragment:_0,alphahash_pars_fragment:b0,alphamap_fragment:M0,alphamap_pars_fragment:S0,alphatest_fragment:w0,alphatest_pars_fragment:T0,aomap_fragment:E0,aomap_pars_fragment:A0,batching_pars_vertex:R0,batching_vertex:C0,begin_vertex:P0,beginnormal_vertex:I0,bsdfs:L0,iridescence_fragment:N0,bumpmap_pars_fragment:D0,clipping_planes_fragment:U0,clipping_planes_pars_fragment:O0,clipping_planes_pars_vertex:F0,clipping_planes_vertex:k0,color_fragment:z0,color_pars_fragment:B0,color_pars_vertex:H0,color_vertex:V0,common:G0,cube_uv_reflection_fragment:W0,defaultnormal_vertex:X0,displacementmap_pars_vertex:$0,displacementmap_vertex:q0,emissivemap_fragment:Y0,emissivemap_pars_fragment:K0,colorspace_fragment:Z0,colorspace_pars_fragment:J0,envmap_fragment:j0,envmap_common_pars_fragment:Q0,envmap_pars_fragment:tg,envmap_pars_vertex:eg,envmap_physical_pars_fragment:dg,envmap_vertex:ng,fog_vertex:ig,fog_pars_vertex:sg,fog_fragment:rg,fog_pars_fragment:og,gradientmap_pars_fragment:ag,lightmap_pars_fragment:lg,lights_lambert_fragment:cg,lights_lambert_pars_fragment:hg,lights_pars_begin:ug,lights_toon_fragment:fg,lights_toon_pars_fragment:pg,lights_phong_fragment:mg,lights_phong_pars_fragment:gg,lights_physical_fragment:xg,lights_physical_pars_fragment:yg,lights_fragment_begin:vg,lights_fragment_maps:_g,lights_fragment_end:bg,lightprobes_pars_fragment:Mg,logdepthbuf_fragment:Sg,logdepthbuf_pars_fragment:wg,logdepthbuf_pars_vertex:Tg,logdepthbuf_vertex:Eg,map_fragment:Ag,map_pars_fragment:Rg,map_particle_fragment:Cg,map_particle_pars_fragment:Pg,metalnessmap_fragment:Ig,metalnessmap_pars_fragment:Lg,morphinstance_vertex:Ng,morphcolor_vertex:Dg,morphnormal_vertex:Ug,morphtarget_pars_vertex:Og,morphtarget_vertex:Fg,normal_fragment_begin:kg,normal_fragment_maps:zg,normal_pars_fragment:Bg,normal_pars_vertex:Hg,normal_vertex:Vg,normalmap_pars_fragment:Gg,clearcoat_normal_fragment_begin:Wg,clearcoat_normal_fragment_maps:Xg,clearcoat_pars_fragment:$g,iridescence_pars_fragment:qg,opaque_fragment:Yg,packing:Kg,premultiplied_alpha_fragment:Zg,project_vertex:Jg,dithering_fragment:jg,dithering_pars_fragment:Qg,roughnessmap_fragment:tx,roughnessmap_pars_fragment:ex,shadowmap_pars_fragment:nx,shadowmap_pars_vertex:ix,shadowmap_vertex:sx,shadowmask_pars_fragment:rx,skinbase_vertex:ox,skinning_pars_vertex:ax,skinning_vertex:lx,skinnormal_vertex:cx,specularmap_fragment:hx,specularmap_pars_fragment:ux,tonemapping_fragment:dx,tonemapping_pars_fragment:fx,transmission_fragment:px,transmission_pars_fragment:mx,uv_pars_fragment:gx,uv_pars_vertex:xx,uv_vertex:yx,worldpos_vertex:vx,background_vert:_x,background_frag:bx,backgroundCube_vert:Mx,backgroundCube_frag:Sx,cube_vert:wx,cube_frag:Tx,depth_vert:Ex,depth_frag:Ax,distance_vert:Rx,distance_frag:Cx,equirect_vert:Px,equirect_frag:Ix,linedashed_vert:Lx,linedashed_frag:Nx,meshbasic_vert:Dx,meshbasic_frag:Ux,meshlambert_vert:Ox,meshlambert_frag:Fx,meshmatcap_vert:kx,meshmatcap_frag:zx,meshnormal_vert:Bx,meshnormal_frag:Hx,meshphong_vert:Vx,meshphong_frag:Gx,meshphysical_vert:Wx,meshphysical_frag:Xx,meshtoon_vert:$x,meshtoon_frag:qx,points_vert:Yx,points_frag:Kx,shadow_vert:Zx,shadow_frag:Jx,sprite_vert:jx,sprite_frag:Qx},ut={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new Zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new Zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},ai={basic:{uniforms:an([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:an([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Qt(0)},envMapIntensity:{value:1}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:an([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:an([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:an([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new Qt(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:an([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:an([ut.points,ut.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:an([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:an([ut.common,ut.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:an([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:an([ut.sprite,ut.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distance:{uniforms:an([ut.common,ut.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distance_vert,fragmentShader:ne.distance_frag},shadow:{uniforms:an([ut.lights,ut.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};ai.physical={uniforms:an([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new Zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new Zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new Zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};var ml={r:0,b:0,g:0},ty=new re,Sf=new Vt;Sf.set(-1,0,0,0,1,0,0,0,1);function ey(i,t,e,n,s,r){let o=new Qt(0),a=s===!0?0:1,l,c,h=null,d=0,u=null;function p(M){let y=M.isScene===!0?M.background:null;if(y&&y.isTexture){let v=M.backgroundBlurriness>0;y=t.get(y,v)}return y}function g(M){let y=!1,v=p(M);v===null?m(o,a):v&&v.isColor&&(m(v,1),y=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||y)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(M,y){let v=p(y);v&&(v.isCubeTexture||v.mapping===Kr)?(c===void 0&&(c=new ue(new Fi(1,1,1),new Fe({name:"BackgroundCubeMaterial",uniforms:vs(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,S,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(ty.makeRotationFromEuler(y.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Sf),c.material.toneMapped=oe.getTransfer(v.colorSpace)!==xe,(h!==v||d!==v.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ue(new An(2,2),new Fe({name:"BackgroundMaterial",uniforms:vs(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=oe.getTransfer(v.colorSpace)!==xe,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function m(M,y){M.getRGB(ml,wh(i)),e.buffers.color.setClear(ml.r,ml.g,ml.b,y,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,y=1){o.set(M),a=y,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,m(o,a)},render:g,addToRenderList:x,dispose:f}}function ny(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(P,N,k,I,z){let q=!1,Y=d(P,I,k,N);r!==Y&&(r=Y,c(r.object)),q=p(P,I,k,z),q&&g(P,I,k,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,v(P,N,k,I),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function d(P,N,k,I){let z=I.wireframe===!0,q=n[N.id];q===void 0&&(q={},n[N.id]=q);let Y=P.isInstancedMesh===!0?P.id:0,st=q[Y];st===void 0&&(st={},q[Y]=st);let Z=st[k.id];Z===void 0&&(Z={},st[k.id]=Z);let Q=Z[z];return Q===void 0&&(Q=u(l()),Z[z]=Q),Q}function u(P){let N=[],k=[],I=[];for(let z=0;z<e;z++)N[z]=0,k[z]=0,I[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:k,attributeDivisors:I,object:P,attributes:{},index:null}}function p(P,N,k,I){let z=r.attributes,q=N.attributes,Y=0,st=k.getAttributes();for(let Z in st)if(st[Z].location>=0){let $=z[Z],_t=q[Z];if(_t===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(_t=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(_t=P.instanceColor)),$===void 0||$.attribute!==_t||_t&&$.data!==_t.data)return!0;Y++}return r.attributesNum!==Y||r.index!==I}function g(P,N,k,I){let z={},q=N.attributes,Y=0,st=k.getAttributes();for(let Z in st)if(st[Z].location>=0){let $=q[Z];$===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&($=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&($=P.instanceColor));let _t={};_t.attribute=$,$&&$.data&&(_t.data=$.data),z[Z]=_t,Y++}r.attributes=z,r.attributesNum=Y,r.index=I}function x(){let P=r.newAttributes;for(let N=0,k=P.length;N<k;N++)P[N]=0}function m(P){f(P,0)}function f(P,N){let k=r.newAttributes,I=r.enabledAttributes,z=r.attributeDivisors;k[P]=1,I[P]===0&&(i.enableVertexAttribArray(P),I[P]=1),z[P]!==N&&(i.vertexAttribDivisor(P,N),z[P]=N)}function M(){let P=r.newAttributes,N=r.enabledAttributes;for(let k=0,I=N.length;k<I;k++)N[k]!==P[k]&&(i.disableVertexAttribArray(k),N[k]=0)}function y(P,N,k,I,z,q,Y){Y===!0?i.vertexAttribIPointer(P,N,k,z,q):i.vertexAttribPointer(P,N,k,I,z,q)}function v(P,N,k,I){x();let z=I.attributes,q=k.getAttributes(),Y=N.defaultAttributeValues;for(let st in q){let Z=q[st];if(Z.location>=0){let Q=z[st];if(Q===void 0&&(st==="instanceMatrix"&&P.instanceMatrix&&(Q=P.instanceMatrix),st==="instanceColor"&&P.instanceColor&&(Q=P.instanceColor)),Q!==void 0){let $=Q.normalized,_t=Q.itemSize,Et=t.get(Q);if(Et===void 0)continue;let lt=Et.buffer,et=Et.type,zt=Et.bytesPerElement,G=et===i.INT||et===i.UNSIGNED_INT||Q.gpuType===Pa;if(Q.isInterleavedBufferAttribute){let K=Q.data,ht=K.stride,At=Q.offset;if(K.isInstancedInterleavedBuffer){for(let ct=0;ct<Z.locationSize;ct++)f(Z.location+ct,K.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ct=0;ct<Z.locationSize;ct++)m(Z.location+ct);i.bindBuffer(i.ARRAY_BUFFER,lt);for(let ct=0;ct<Z.locationSize;ct++)y(Z.location+ct,_t/Z.locationSize,et,$,ht*zt,(At+_t/Z.locationSize*ct)*zt,G)}else{if(Q.isInstancedBufferAttribute){for(let K=0;K<Z.locationSize;K++)f(Z.location+K,Q.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let K=0;K<Z.locationSize;K++)m(Z.location+K);i.bindBuffer(i.ARRAY_BUFFER,lt);for(let K=0;K<Z.locationSize;K++)y(Z.location+K,_t/Z.locationSize,et,$,_t*zt,_t/Z.locationSize*K*zt,G)}}else if(Y!==void 0){let $=Y[st];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(Z.location,$);break;case 3:i.vertexAttrib3fv(Z.location,$);break;case 4:i.vertexAttrib4fv(Z.location,$);break;default:i.vertexAttrib1fv(Z.location,$)}}}}M()}function b(){A();for(let P in n){let N=n[P];for(let k in N){let I=N[k];for(let z in I){let q=I[z];for(let Y in q)h(q[Y].object),delete q[Y];delete I[z]}}delete n[P]}}function S(P){if(n[P.id]===void 0)return;let N=n[P.id];for(let k in N){let I=N[k];for(let z in I){let q=I[z];for(let Y in q)h(q[Y].object),delete q[Y];delete I[z]}}delete n[P.id]}function E(P){for(let N in n){let k=n[N];for(let I in k){let z=k[I];if(z[P.id]===void 0)continue;let q=z[P.id];for(let Y in q)h(q[Y].object),delete q[Y];delete z[P.id]}}}function _(P){for(let N in n){let k=n[N],I=P.isInstancedMesh===!0?P.id:0,z=k[I];if(z!==void 0){for(let q in z){let Y=z[q];for(let st in Y)h(Y[st].object),delete Y[st];delete z[q]}delete k[I],Object.keys(k).length===0&&delete n[N]}}}function A(){C(),o=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:C,dispose:b,releaseStatesOfGeometry:S,releaseStatesOfObject:_,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function iy(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let p=0;p<h;p++)u+=c[p];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function sy(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==vn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){let _=E===Xn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==xn&&E!==yn&&!_&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Ht("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Ht("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:v,maxSamples:b,samples:S}}function ry(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Hn,a=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let p=d.length!==0||u||n!==0||s;return s=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,p){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:n,y=M*4,v=f.clippingState||null;l.value=v,v=h(g,u,y,p);for(let b=0;b!==y;++b)v[b]=e[b];f.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,p,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let f=p+x*4,M=u.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let y=0,v=p;y!==x;++y,v+=4)o.copy(d[y]).applyMatrix4(M,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}var lr=4,oy=6,ay=20,ly=256,ro=new Gi,tf=new Qt,Nh=null,Dh=0,Uh=0,Oh=!1,cy=new L,_s=new L,xl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=cy}=r;Nh=this._renderer.getRenderTarget(),Dh=this._renderer.getActiveCubeFace(),Uh=this._renderer.getActiveMipmapLevel(),Oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Nh,Dh,Uh),this._renderer.xr.enabled=Oh,t.scissorTest=!1,ar(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wi||t.mapping===ys?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Nh=this._renderer.getRenderTarget(),Dh=this._renderer.getActiveCubeFace(),Uh=this._renderer.getActiveMipmapLevel(),Oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Xe,minFilter:Xe,generateMipmaps:!1,type:Xn,format:vn,colorSpace:ds,depthBuffer:!1},s=ef(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ef(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=hy(r)),this._blurMaterial=dy(r,t,e),this._ggxMaterial=uy(r,t,e)}return s}_compileMaterial(t){let e=new ue(new Je,t);this._renderer.compile(e,ro)}_sceneToCubeUV(t,e,n,s,r){let l=new rn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(tf),d.toneMapping=Gn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ue(new Fi,new ps({name:"PMREM.Background",side:je,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,f=!1,M=t.background;M?M.isColor&&(m.color.copy(M),t.background=null,f=!0):(m.color.copy(tf),f=!0);for(let y=0;y<6;y++){let v=y%3;v===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):v===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));let b=this._cubeSize;ar(s,v*b,y>2?b:0,b,b),d.setRenderTarget(s),f&&d.render(x,l),d.render(t,l)}d.toneMapping=p,d.autoClear=u,t.background=M}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Wi||t.mapping===ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=sf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nf());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;ar(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ro)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,p=d*u,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-lr?n-g+lr:0),f=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=g-e,ar(r,m,f,3*x,2*x),s.setRenderTarget(r),s.render(a,ro),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,ar(t,m,f,3*x,2*x),s.setRenderTarget(t),s.render(a,ro)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-lr?s-this._lodMax+lr:0),u=4*(this._cubeSize-h);ar(e,d,u,3*h,2*h),o.setRenderTarget(e),o.render(l,ro)}};function hy(i){let t=[],e=[],n=i,s=i-lr+1+oy;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,p=3,g=new Float32Array(p*u*d),x=new Float32Array(p*u*d);for(let f=0;f<d;f++){let M=f%3*2/3-1,y=f>2?0:-1,v=[M,y,0,M+2/3,y,0,M+2/3,y+1,0,M,y,0,M+2/3,y+1,0,M,y+1,0];g.set(v,p*u*f);for(let b=0;b<u;b++){let S=h[b*2]*2-1,E=h[b*2+1]*2-1;f===0?_s.set(1,E,S):f===1?_s.set(-S,1,-E):f===2?_s.set(-S,E,1):f===3?_s.set(-1,E,-S):f===4?_s.set(-S,-1,E):_s.set(S,E,-1),_s.toArray(x,(f*u+b)*p)}}let m=new Je;m.setAttribute("position",new En(g,p)),m.setAttribute("outputDirection",new En(x,p)),e.push(new ue(m,null)),n>lr&&n--}return{lodMeshes:e,sizeLods:t}}function ef(i,t,e){let n=new on(i,t,e);return n.texture.mapping=Kr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ar(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function uy(i,t,e){return new Fe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ly,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:vl(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function dy(i,t,e){return new Fe({name:"SphericalGaussianBlur",defines:{SAMPLES:ay,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:vl(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function nf(){return new Fe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vl(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function sf(){return new Fe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function vl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var hr=class extends on{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Br(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Fi(5,5,5),r=new Fe({name:"CubemapFromEquirect",uniforms:vs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:je,blending:ri});r.uniforms.tEquirect.value=e;let o=new ue(s,r),a=e.minFilter;return e.minFilter===Xi&&(e.minFilter=Xe),new er(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function fy(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,p=!1){return u==null?null:p?o(u):r(u)}function r(u){if(u&&u.isTexture){let p=u.mapping;if(p===Aa||p===Ra)if(t.has(u)){let g=t.get(u).texture;return a(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let x=new hr(g.height);return x.fromEquirectangularTexture(i,u),t.set(u,x),u.addEventListener("dispose",c),a(x.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let p=u.mapping,g=p===Aa||p===Ra,x=p===Wi||p===ys;if(g||x){let m=e.get(u),f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new xl(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let M=u.image;return g&&M&&M.height>0||x&&M&&l(M)?(n===null&&(n=new xl(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function a(u,p){return p===Aa?u.mapping=Wi:p===Ra&&(u.mapping=ys),u}function l(u){let p=0,g=6;for(let x=0;x<g;x++)u[x]!==void 0&&p++;return p===g}function c(u){let p=u.target;p.removeEventListener("dispose",c);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function h(u){let p=u.target;p.removeEventListener("dispose",h);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function py(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&us("WebGLRenderer: "+n+" extension not supported."),s}}}function my(i,t,e,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];let p=r.get(u);p&&(t.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let p in u)t.update(u[p],i.ARRAY_BUFFER)}function c(d){let u=[],p=d.index,g=d.attributes.position,x=0;if(g===void 0)return;if(p!==null){let M=p.array;x=p.version;for(let y=0,v=M.length;y<v;y+=3){let b=M[y+0],S=M[y+1],E=M[y+2];u.push(b,S,S,E,E,b)}}else{let M=g.array;x=g.version;for(let y=0,v=M.length/3-1;y<v;y+=3){let b=y+0,S=y+1,E=y+2;u.push(b,S,S,E,E,b)}}let m=new(g.count>=65535?zr:kr)(u,1);m.version=x;let f=r.get(d);f&&t.remove(f),r.set(d,m)}function h(d){let u=r.get(d);if(u){let p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function gy(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*o),e.update(u,n,1)}function c(d,u,p){p!==0&&(i.drawElementsInstanced(n,u,r,d*o,p),e.update(u,n,p))}function h(d,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,p);let x=0;for(let m=0;m<p;m++)x+=u[m];e.update(x,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function xy(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Gt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function yy(i,t,e){let n=new WeakMap,s=new Te;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let A=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],y=0;p===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let v=a.attributes.position.count*y,b=1;v>t.maxTextureSize&&(b=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let S=new Float32Array(v*b*4*d),E=new Ur(S,v,b,d);E.type=yn,E.needsUpdate=!0;let _=y*4;for(let C=0;C<d;C++){let P=m[C],N=f[C],k=M[C],I=v*b*4*C;for(let z=0;z<P.count;z++){let q=z*_;p===!0&&(s.fromBufferAttribute(P,z),S[I+q+0]=s.x,S[I+q+1]=s.y,S[I+q+2]=s.z,S[I+q+3]=0),g===!0&&(s.fromBufferAttribute(N,z),S[I+q+4]=s.x,S[I+q+5]=s.y,S[I+q+6]=s.z,S[I+q+7]=0),x===!0&&(s.fromBufferAttribute(k,z),S[I+q+8]=s.x,S[I+q+9]=s.y,S[I+q+10]=s.z,S[I+q+11]=k.itemSize===4?s.w:1)}}u={count:d,texture:E,size:new Zt(v,b)},n.set(a,u),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function vy(i,t,e,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var _y={[rh]:"LINEAR_TONE_MAPPING",[oh]:"REINHARD_TONE_MAPPING",[ah]:"CINEON_TONE_MAPPING",[lh]:"ACES_FILMIC_TONE_MAPPING",[hh]:"AGX_TONE_MAPPING",[uh]:"NEUTRAL_TONE_MAPPING",[ch]:"CUSTOM_TONE_MAPPING"};function by(i,t,e,n,s,r){let o=new on(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new Je;c.setAttribute("position",new pe([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new pe([0,2,0,0,2,0],2));let h=new ha({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new ue(c,h),u=new Gi(-1,1,1,-1,0,1),p=null,g=null,x=!1,m,f=null,M=[],y=!1;this.setSize=function(v,b){o.setSize(v,b),a!==null&&a.setSize(v,b),l!==null&&l.setSize(v,b);for(let S=0;S<M.length;S++){let E=M[S];E.setSize&&E.setSize(v,b)}},this.setEffects=function(v){M=v,y=M.length>0&&M[0].isRenderPass===!0;let b=o.width,S=o.height;M.length>0&&a===null&&(a=new on(b,S,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),l=new on(b,S,{type:Xn,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<M.length;E++){let _=M[E];_.setSize&&_.setSize(b,S)}},this.begin=function(v,b){if(x||v.toneMapping===Gn&&M.length===0)return!1;if(f=b,b!==null){let S=b.width,E=b.height;(o.width!==S||o.height!==E)&&this.setSize(S,E)}return y===!1&&v.setRenderTarget(o),m=v.toneMapping,v.toneMapping=Gn,!0},this.hasRenderPass=function(){return y},this.end=function(v,b){v.toneMapping=m,x=!0;let S=o,E=a;for(let _=0;_<M.length;_++){let A=M[_];A.enabled!==!1&&(A.render(v,E,S,b),A.needsSwap!==!1&&(S=E,E=E===a?l:a))}if(p!==v.outputColorSpace||g!==v.toneMapping){p=v.outputColorSpace,g=v.toneMapping,h.defines={},oe.getTransfer(p)===xe&&(h.defines.SRGB_TRANSFER="");let _=_y[g];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,v.setRenderTarget(f),v.render(d,u),f=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var wf=new un,zh=new Oi(1,1),Tf=new Ur,Ef=new aa,Af=new Br,rf=[],of=[],af=new Float32Array(16),lf=new Float32Array(9),cf=new Float32Array(4);function ur(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=rf[s];if(r===void 0&&(r=new Float32Array(s),rf[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function qe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ye(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function _l(i,t){let e=of[t];e===void 0&&(e=new Int32Array(t),of[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function My(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Sy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;i.uniform2fv(this.addr,t),Ye(e,t)}}function wy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(qe(e,t))return;i.uniform3fv(this.addr,t),Ye(e,t)}}function Ty(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;i.uniform4fv(this.addr,t),Ye(e,t)}}function Ey(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(qe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ye(e,t)}else{if(qe(e,n))return;cf.set(n),i.uniformMatrix2fv(this.addr,!1,cf),Ye(e,n)}}function Ay(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(qe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ye(e,t)}else{if(qe(e,n))return;lf.set(n),i.uniformMatrix3fv(this.addr,!1,lf),Ye(e,n)}}function Ry(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(qe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ye(e,t)}else{if(qe(e,n))return;af.set(n),i.uniformMatrix4fv(this.addr,!1,af),Ye(e,n)}}function Cy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Py(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;i.uniform2iv(this.addr,t),Ye(e,t)}}function Iy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(qe(e,t))return;i.uniform3iv(this.addr,t),Ye(e,t)}}function Ly(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;i.uniform4iv(this.addr,t),Ye(e,t)}}function Ny(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Dy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;i.uniform2uiv(this.addr,t),Ye(e,t)}}function Uy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(qe(e,t))return;i.uniform3uiv(this.addr,t),Ye(e,t)}}function Oy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;i.uniform4uiv(this.addr,t),Ye(e,t)}}function Fy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(zh.compareFunction=e.isReversedDepthBuffer()?pl:fl,r=zh):r=wf,e.setTexture2D(t||r,s)}function ky(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Ef,s)}function zy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Af,s)}function By(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Tf,s)}function Hy(i){switch(i){case 5126:return My;case 35664:return Sy;case 35665:return wy;case 35666:return Ty;case 35674:return Ey;case 35675:return Ay;case 35676:return Ry;case 5124:case 35670:return Cy;case 35667:case 35671:return Py;case 35668:case 35672:return Iy;case 35669:case 35673:return Ly;case 5125:return Ny;case 36294:return Dy;case 36295:return Uy;case 36296:return Oy;case 35678:case 36198:case 36298:case 36306:case 35682:return Fy;case 35679:case 36299:case 36307:return ky;case 35680:case 36300:case 36308:case 36293:return zy;case 36289:case 36303:case 36311:case 36292:return By}}function Vy(i,t){i.uniform1fv(this.addr,t)}function Gy(i,t){let e=ur(t,this.size,2);i.uniform2fv(this.addr,e)}function Wy(i,t){let e=ur(t,this.size,3);i.uniform3fv(this.addr,e)}function Xy(i,t){let e=ur(t,this.size,4);i.uniform4fv(this.addr,e)}function $y(i,t){let e=ur(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function qy(i,t){let e=ur(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Yy(i,t){let e=ur(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ky(i,t){i.uniform1iv(this.addr,t)}function Zy(i,t){i.uniform2iv(this.addr,t)}function Jy(i,t){i.uniform3iv(this.addr,t)}function jy(i,t){i.uniform4iv(this.addr,t)}function Qy(i,t){i.uniform1uiv(this.addr,t)}function tv(i,t){i.uniform2uiv(this.addr,t)}function ev(i,t){i.uniform3uiv(this.addr,t)}function nv(i,t){i.uniform4uiv(this.addr,t)}function iv(i,t,e){let n=this.cache,s=t.length,r=_l(e,s);qe(n,r)||(i.uniform1iv(this.addr,r),Ye(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=zh:o=wf;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function sv(i,t,e){let n=this.cache,s=t.length,r=_l(e,s);qe(n,r)||(i.uniform1iv(this.addr,r),Ye(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Ef,r[o])}function rv(i,t,e){let n=this.cache,s=t.length,r=_l(e,s);qe(n,r)||(i.uniform1iv(this.addr,r),Ye(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Af,r[o])}function ov(i,t,e){let n=this.cache,s=t.length,r=_l(e,s);qe(n,r)||(i.uniform1iv(this.addr,r),Ye(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Tf,r[o])}function av(i){switch(i){case 5126:return Vy;case 35664:return Gy;case 35665:return Wy;case 35666:return Xy;case 35674:return $y;case 35675:return qy;case 35676:return Yy;case 5124:case 35670:return Ky;case 35667:case 35671:return Zy;case 35668:case 35672:return Jy;case 35669:case 35673:return jy;case 5125:return Qy;case 36294:return tv;case 36295:return ev;case 36296:return nv;case 35678:case 36198:case 36298:case 36306:case 35682:return iv;case 35679:case 36299:case 36307:return sv;case 35680:case 36300:case 36308:case 36293:return rv;case 36289:case 36303:case 36311:case 36292:return ov}}var Bh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Hy(e.type)}},Hh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=av(e.type)}},Vh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Fh=/(\w+)(\])?(\[|\.)?/g;function hf(i,t){i.seq.push(t),i.map[t.id]=t}function lv(i,t,e){let n=i.name,s=n.length;for(Fh.lastIndex=0;;){let r=Fh.exec(n),o=Fh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){hf(e,c===void 0?new Bh(a,i,t):new Hh(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new Vh(a),hf(e,d)),e=d}}}var cr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);lv(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function uf(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var cv=37297,hv=0;function uv(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var df=new Vt;function dv(i){oe._getMatrix(df,oe.workingColorSpace,i);let t=`mat3( ${df.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(i)){case Nr:return[t,"LinearTransferOETF"];case xe:return[t,"sRGBTransferOETF"];default:return Ht("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ff(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+uv(i.getShaderSource(t),a)}else return r}function fv(i,t){let e=dv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var pv={[rh]:"Linear",[oh]:"Reinhard",[ah]:"Cineon",[lh]:"ACESFilmic",[hh]:"AgX",[uh]:"Neutral",[ch]:"Custom"};function mv(i,t){let e=pv[t];return e===void 0?(Ht("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var gl=new L;function gv(){oe.getLuminanceCoefficients(gl);let i=gl.x.toFixed(4),t=gl.y.toFixed(4),e=gl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ao).join(`
`)}function yv(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function vv(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ao(i){return i!==""}function pf(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function mf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var _v=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gh(i){return i.replace(_v,Mv)}var bv=new Map;function Mv(i,t){let e=ne[t];if(e===void 0){let n=bv.get(t);if(n!==void 0)e=ne[n],Ht('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Gh(e)}var Sv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gf(i){return i.replace(Sv,wv)}function wv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xf(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Tv={[Yr]:"SHADOWMAP_TYPE_PCF",[nr]:"SHADOWMAP_TYPE_VSM"};function Ev(i){return Tv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Av={[Wi]:"ENVMAP_TYPE_CUBE",[ys]:"ENVMAP_TYPE_CUBE",[Kr]:"ENVMAP_TYPE_CUBE_UV"};function Rv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Av[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Cv={[ys]:"ENVMAP_MODE_REFRACTION"};function Pv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Cv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Iv={[sh]:"ENVMAP_BLENDING_MULTIPLY",[Dd]:"ENVMAP_BLENDING_MIX",[Ud]:"ENVMAP_BLENDING_ADD"};function Lv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Iv[i.combine]||"ENVMAP_BLENDING_NONE"}function Nv(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Dv(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Ev(e),c=Rv(e),h=Pv(e),d=Lv(e),u=Nv(e),p=xv(e),g=yv(r),x=s.createProgram(),m,f,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ao).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ao).join(`
`),f.length>0&&(f+=`
`)):(m=[xf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ao).join(`
`),f=[xf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Gn?"#define TONE_MAPPING":"",e.toneMapping!==Gn?ne.tonemapping_pars_fragment:"",e.toneMapping!==Gn?mv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,fv("linearToOutputTexel",e.outputColorSpace),gv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ao).join(`
`)),o=Gh(o),o=pf(o,e),o=mf(o,e),a=Gh(a),a=pf(a,e),a=mf(a,e),o=gf(o),a=gf(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===bh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===bh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let y=M+m+o,v=M+f+a,b=uf(s,s.VERTEX_SHADER,y),S=uf(s,s.FRAGMENT_SHADER,v);s.attachShader(x,b),s.attachShader(x,S),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function E(P){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(x)||"",k=s.getShaderInfoLog(b)||"",I=s.getShaderInfoLog(S)||"",z=N.trim(),q=k.trim(),Y=I.trim(),st=!0,Z=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(st=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,b,S);else{let Q=ff(s,b,"vertex"),$=ff(s,S,"fragment");Gt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+Q+`
`+$)}else z!==""?Ht("WebGLProgram: Program Info Log:",z):(q===""||Y==="")&&(Z=!1);Z&&(P.diagnostics={runnable:st,programLog:z,vertexShader:{log:q,prefix:m},fragmentShader:{log:Y,prefix:f}})}s.deleteShader(b),s.deleteShader(S),_=new cr(s,x),A=vv(s,x)}let _;this.getUniforms=function(){return _===void 0&&E(this),_};let A;this.getAttributes=function(){return A===void 0&&E(this),A};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(x,cv)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=hv++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=b,this.fragmentShader=S,this}var Uv=0,Wh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Xh(t),e.set(t,n)),n}},Xh=class{constructor(t){this.id=Uv++,this.code=t,this.usedTimes=0}};function Ov(i){return i===qi||i===eo||i===no}function Fv(i,t,e,n,s,r){let o=new Or,a=new Wh,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function x(_,A,C,P,N,k){let I=P.fog,z=N.geometry,q=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,Y=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,st=t.get(_.envMap||q,Y),Z=st&&st.mapping===Kr?st.image.height:null,Q=p[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Ht("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let $=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,_t=$!==void 0?$.length:0,Et=0;z.morphAttributes.position!==void 0&&(Et=1),z.morphAttributes.normal!==void 0&&(Et=2),z.morphAttributes.color!==void 0&&(Et=3);let lt,et,zt,G;if(Q){let Re=ai[Q];lt=Re.vertexShader,et=Re.fragmentShader}else{lt=_.vertexShader,et=_.fragmentShader;let Re=a.getVertexShaderStage(_),me=a.getFragmentShaderStage(_);a.update(_,Re,me),zt=Re.id,G=me.id}let K=i.getRenderTarget(),ht=i.state.buffers.depth.getReversed(),At=N.isInstancedMesh===!0,ct=N.isBatchedMesh===!0,Ot=!!_.map,fe=!!_.matcap,$t=!!st,qt=!!_.aoMap,se=!!_.lightMap,Lt=!!_.bumpMap&&_.wireframe===!1,ae=!!_.normalMap,Ae=!!_.displacementMap,Ke=!!_.emissiveMap,Se=!!_.metalnessMap,Ve=!!_.roughnessMap,F=_.anisotropy>0,tn=_.clearcoat>0,_e=_.dispersion>0,R=_.retroreflectivity>0,w=_.iridescence>0,B=_.sheen>0,W=_.transmission>0,J=F&&!!_.anisotropyMap,at=tn&&!!_.clearcoatMap,pt=tn&&!!_.clearcoatNormalMap,j=tn&&!!_.clearcoatRoughnessMap,nt=w&&!!_.iridescenceMap,mt=w&&!!_.iridescenceThicknessMap,Nt=B&&!!_.sheenColorMap,vt=B&&!!_.sheenRoughnessMap,gt=!!_.specularMap,Dt=!!_.specularColorMap,Bt=!!_.specularIntensityMap,jt=W&&!!_.transmissionMap,U=W&&!!_.thicknessMap,xt=!!_.gradientMap,tt=!!_.alphaMap,yt=_.alphaTest>0,St=!!_.alphaHash,rt=!!_.extensions,Ut=Gn;_.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Ut=i.toneMapping);let Pt={shaderID:Q,shaderType:_.type,shaderName:_.name,vertexShader:lt,fragmentShader:et,defines:_.defines,customVertexShaderID:zt,customFragmentShaderID:G,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:ct,batchingColor:ct&&N._colorsTexture!==null,instancing:At,instancingColor:At&&N.instanceColor!==null,instancingMorph:At&&N.morphTexture!==null,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Ot,matcap:fe,envMap:$t,envMapMode:$t&&st.mapping,envMapCubeUVHeight:Z,aoMap:qt,lightMap:se,bumpMap:Lt,normalMap:ae,displacementMap:Ae,emissiveMap:Ke,normalMapObjectSpace:ae&&_.normalMapType===kd,normalMapTangentSpace:ae&&_.normalMapType===vh,packedNormalMap:ae&&_.normalMapType===vh&&Ov(_.normalMap.format),metalnessMap:Se,roughnessMap:Ve,anisotropy:F,anisotropyMap:J,clearcoat:tn,clearcoatMap:at,clearcoatNormalMap:pt,clearcoatRoughnessMap:j,dispersion:_e,retroreflection:R,iridescence:w,iridescenceMap:nt,iridescenceThicknessMap:mt,sheen:B,sheenColorMap:Nt,sheenRoughnessMap:vt,specularMap:gt,specularColorMap:Dt,specularIntensityMap:Bt,transmission:W,transmissionMap:jt,thicknessMap:U,gradientMap:xt,opaque:_.transparent===!1&&_.blending===ir&&_.alphaToCoverage===!1,alphaMap:tt,alphaTest:yt,alphaHash:St,combine:_.combine,mapUv:Ot&&g(_.map.channel),aoMapUv:qt&&g(_.aoMap.channel),lightMapUv:se&&g(_.lightMap.channel),bumpMapUv:Lt&&g(_.bumpMap.channel),normalMapUv:ae&&g(_.normalMap.channel),displacementMapUv:Ae&&g(_.displacementMap.channel),emissiveMapUv:Ke&&g(_.emissiveMap.channel),metalnessMapUv:Se&&g(_.metalnessMap.channel),roughnessMapUv:Ve&&g(_.roughnessMap.channel),anisotropyMapUv:J&&g(_.anisotropyMap.channel),clearcoatMapUv:at&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:pt&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:vt&&g(_.sheenRoughnessMap.channel),specularMapUv:gt&&g(_.specularMap.channel),specularColorMapUv:Dt&&g(_.specularColorMap.channel),specularIntensityMapUv:Bt&&g(_.specularIntensityMap.channel),transmissionMapUv:jt&&g(_.transmissionMap.channel),thicknessMapUv:U&&g(_.thicknessMap.channel),alphaMapUv:tt&&g(_.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(ae||F),vertexNormals:!!z.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!z.attributes.uv&&(Ot||tt),fog:!!I,useFog:_.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||z.attributes.normal===void 0&&ae===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ht,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:Et,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ut,decodeVideoTexture:Ot&&_.map.isVideoTexture===!0&&oe.getTransfer(_.map.colorSpace)===xe,decodeVideoTextureEmissive:Ke&&_.emissiveMap.isVideoTexture===!0&&oe.getTransfer(_.emissiveMap.colorSpace)===xe,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Nn,flipSided:_.side===je,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:rt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&_.extensions.multiDraw===!0||ct)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Pt.vertexUv1s=l.has(1),Pt.vertexUv2s=l.has(2),Pt.vertexUv3s=l.has(3),l.clear(),Pt}function m(_){let A=[];if(_.shaderID?A.push(_.shaderID):(A.push(_.customVertexShaderID),A.push(_.customFragmentShaderID)),_.defines!==void 0)for(let C in _.defines)A.push(C),A.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(f(A,_),M(A,_),A.push(i.outputColorSpace)),A.push(_.customProgramCacheKey),A.join()}function f(_,A){_.push(A.precision),_.push(A.outputColorSpace),_.push(A.envMapMode),_.push(A.envMapCubeUVHeight),_.push(A.mapUv),_.push(A.alphaMapUv),_.push(A.lightMapUv),_.push(A.aoMapUv),_.push(A.bumpMapUv),_.push(A.normalMapUv),_.push(A.displacementMapUv),_.push(A.emissiveMapUv),_.push(A.metalnessMapUv),_.push(A.roughnessMapUv),_.push(A.anisotropyMapUv),_.push(A.clearcoatMapUv),_.push(A.clearcoatNormalMapUv),_.push(A.clearcoatRoughnessMapUv),_.push(A.iridescenceMapUv),_.push(A.iridescenceThicknessMapUv),_.push(A.sheenColorMapUv),_.push(A.sheenRoughnessMapUv),_.push(A.specularMapUv),_.push(A.specularColorMapUv),_.push(A.specularIntensityMapUv),_.push(A.transmissionMapUv),_.push(A.thicknessMapUv),_.push(A.combine),_.push(A.fogExp2),_.push(A.sizeAttenuation),_.push(A.morphTargetsCount),_.push(A.morphAttributeCount),_.push(A.numSunLights),_.push(A.numDirLights),_.push(A.numPointLights),_.push(A.numSpotLights),_.push(A.numSpotLightMaps),_.push(A.numHemiLights),_.push(A.numRectAreaLights),_.push(A.numSunLightShadows),_.push(A.numDirLightShadows),_.push(A.numPointLightShadows),_.push(A.numSpotLightShadows),_.push(A.numSpotLightShadowsWithMaps),_.push(A.numLightProbes),_.push(A.shadowMapType),_.push(A.toneMapping),_.push(A.numClippingPlanes),_.push(A.numClipIntersection),_.push(A.depthPacking)}function M(_,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.retroreflection&&o.enable(24),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),A.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function y(_){let A=p[_.type],C;if(A){let P=ai[A];C=so.clone(P.uniforms)}else C=_.uniforms;return C}function v(_,A){let C=h.get(A);return C!==void 0?++C.usedTimes:(C=new Dv(i,A,_,s),c.push(C),h.set(A,C)),C}function b(_){if(--_.usedTimes===0){let A=c.indexOf(_);c[A]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function S(_){a.remove(_)}function E(){a.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:y,acquireProgram:v,releaseProgram:b,releaseShaderCache:S,programs:c,dispose:E}}function kv(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function zv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function yf(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function vf(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function a(u,p,g,x,m,f){let M=i[t];return M===void 0?(M={id:u.id,object:u,geometry:p,material:g,materialVariant:o(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:f},i[t]=M):(M.id=u.id,M.object=u,M.geometry=p,M.material=g,M.materialVariant=o(u),M.groupOrder=x,M.renderOrder=u.renderOrder,M.z=m,M.group=f),t++,M}function l(u,p,g,x,m,f,M){M.reversedDepth===!0&&(m=-m);let y=a(u,p,g,x,m,f);g.transmission>0?n.push(y):g.transparent===!0?s.push(y):e.push(y)}function c(u,p,g,x,m,f){let M=a(u,p,g,x,m,f);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):e.unshift(M)}function h(u,p){e.length>1&&e.sort(u||zv),n.length>1&&n.sort(p||yf),s.length>1&&s.sort(p||yf)}function d(){for(let u=t,p=i.length;u<p;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function Bv(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new vf,i.set(n,[o])):s>=r.length?(o=new vf,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Hv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new L,color:new Qt};break;case"SpotLight":e={position:new L,direction:new L,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function Vv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Gv=0;function Wv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Xv(i){let t=new Hv,e=Vv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let s=new L,r=new re,o=new re;function a(c){let h=0,d=0,u=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,M=0,y=0,v=0,b=0,S=0,E=0,_=0,A=0,C=0;c.sort(Wv);for(let N=0,k=c.length;N<k;N++){let I=c[N],z=I.color,q=I.intensity,Y=I.distance,st=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===qi?st=I.shadow.map.texture:st=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=z.r*q,d+=z.g*q,u+=z.b*q;else if(I.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(I.sh.coefficients[Z],q);C++}else if(I.isSunLight){let Z=t.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let Q=I.shadow,$=e.get(I);$.shadowIntensity=Q.intensity,$.shadowBias=Q.bias,$.shadowNormalBias=Q.normalBias,$.shadowRadius=Q.radius,$.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[g]=$,n.sunShadowMap[g]=st;let _t=Q.getViewportCount();for(let Et=0;Et<_t;Et++)n.sunShadowMatrix[x+Et]=Q.getMatrix(Et),n.sunShadowCascade[x+Et]=Q._cascadeData[Et];x+=_t,g++}n.sun[p]=Z,p++}else if(I.isDirectionalLight){let Z=t.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let Q=I.shadow,$=e.get(I);$.shadowIntensity=Q.intensity,$.shadowBias=Q.bias,$.shadowNormalBias=Q.normalBias,$.shadowRadius=Q.radius,$.shadowMapSize=Q.mapSize,n.directionalShadow[m]=$,n.directionalShadowMap[m]=st,n.directionalShadowMatrix[m]=I.shadow.matrix,b++}n.directional[m]=Z,m++}else if(I.isSpotLight){let Z=t.get(I);Z.position.setFromMatrixPosition(I.matrixWorld),Z.color.copy(z).multiplyScalar(q),Z.distance=Y,Z.coneCos=Math.cos(I.angle),Z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Z.decay=I.decay,n.spot[M]=Z;let Q=I.shadow;if(I.map&&(n.spotLightMap[_]=I.map,_++,Q.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[M]=Q.matrix,I.castShadow){let $=e.get(I);$.shadowIntensity=Q.intensity,$.shadowBias=Q.bias,$.shadowNormalBias=Q.normalBias,$.shadowRadius=Q.radius,$.shadowMapSize=Q.mapSize,n.spotShadow[M]=$,n.spotShadowMap[M]=st,E++}M++}else if(I.isRectAreaLight){let Z=t.get(I);Z.color.copy(z).multiplyScalar(q),Z.halfWidth.set(I.width*.5,0,0),Z.halfHeight.set(0,I.height*.5,0),n.rectArea[y]=Z,y++}else if(I.isPointLight){let Z=t.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity),Z.distance=I.distance,Z.decay=I.decay,I.castShadow){let Q=I.shadow,$=e.get(I);$.shadowIntensity=Q.intensity,$.shadowBias=Q.bias,$.shadowNormalBias=Q.normalBias,$.shadowRadius=Q.radius,$.shadowMapSize=Q.mapSize,$.shadowCameraNear=Q.camera.near,$.shadowCameraFar=Q.camera.far,n.pointShadow[f]=$,n.pointShadowMap[f]=st,n.pointShadowMatrix[f]=I.shadow.matrix,S++}n.point[f]=Z,f++}else if(I.isHemisphereLight){let Z=t.get(I);Z.skyColor.copy(I.color).multiplyScalar(q),Z.groundColor.copy(I.groundColor).multiplyScalar(q),n.hemi[v]=Z,v++}}y>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let P=n.hash;(P.sunLength!==p||P.directionalLength!==m||P.pointLength!==f||P.spotLength!==M||P.rectAreaLength!==y||P.hemiLength!==v||P.numSunShadows!==g||P.numDirectionalShadows!==b||P.numPointShadows!==S||P.numSpotShadows!==E||P.numSpotMaps!==_||P.numLightProbes!==C)&&(n.sun.length=p,n.directional.length=m,n.spot.length=M,n.rectArea.length=y,n.point.length=f,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=E,n.spotShadowMap.length=E,n.spotLightMatrix.length=E+_-A,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,P.sunLength=p,P.directionalLength=m,P.pointLength=f,P.spotLength=M,P.rectAreaLength=y,P.hemiLength=v,P.numSunShadows=g,P.numDirectionalShadows=b,P.numPointShadows=S,P.numSpotShadows=E,P.numSpotMaps=_,P.numLightProbes=C,n.version=Gv++)}function l(c,h){let d=0,u=0,p=0,g=0,x=0,m=0,f=h.matrixWorldInverse;for(let M=0,y=c.length;M<y;M++){let v=c[M];if(v.isSunLight){let b=n.sun[d];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(f),d++}else if(v.isDirectionalLight){let b=n.directional[u];b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(f),u++}else if(v.isSpotLight){let b=n.spot[g];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(f),b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(f),g++}else if(v.isRectAreaLight){let b=n.rectArea[x];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(f),o.identity(),r.copy(v.matrixWorld),r.premultiply(f),o.extractRotation(r),b.halfWidth.set(v.width*.5,0,0),b.halfHeight.set(0,v.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),x++}else if(v.isPointLight){let b=n.point[p];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(f),p++}else if(v.isHemisphereLight){let b=n.hemi[m];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(f),m++}}}return{setup:a,setupView:l,state:n}}function _f(i){let t=new Xv(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function o(u){e.push(u)}function a(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function $v(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new _f(i),t.set(s,[a])):r>=o.length?(a=new _f(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var qv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yv=`uniform sampler2D shadow_pass;
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
}`,Kv=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],Zv=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],bf=new re,oo=new L,kh=new L;function Jv(i,t,e){let n=new js,s=new Zt,r=new Zt,o=new Te,a=new ua,l=new da,c={},h=e.maxTextureSize,d={[si]:je,[je]:si,[Nn]:Nn},u=new Fe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Zt},radius:{value:4}},vertexShader:qv,fragmentShader:Yv}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let g=new Je;g.setAttribute("position",new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ue(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yr;let f=this.type;this.render=function(S,E,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===md&&(Ht("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Yr);let A=i.getRenderTarget(),C=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),N=i.state;N.setBlending(ri),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let k=f!==this.type;k&&E.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(z=>z.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,z=S.length;I<z;I++){let q=S[I],Y=q.shadow;if(Y===void 0){Ht("WebGLShadowMap:",q,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);let st=Y.getFrameExtents();s.multiply(st),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,Y.mapSize.y=r.y));let Z=i.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=Z,Y.map===null||k===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===nr){if(q.isPointLight){Ht("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new on(s.x,s.y,{format:qi,type:Xn,minFilter:Xe,magFilter:Xe,generateMipmaps:!1}),Y.map.texture.name=q.name+".shadowMap",Y.map.depthTexture=new Oi(s.x,s.y,yn),Y.map.depthTexture.name=q.name+".shadowMapDepth",Y.map.depthTexture.format=ti,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=ze,Y.map.depthTexture.magFilter=ze}else q.isPointLight?(Y.map=new hr(s.x),Y.map.depthTexture=new ca(s.x,Wn)):(Y.map=new on(s.x,s.y),Y.map.depthTexture=new Oi(s.x,s.y,Wn)),Y.map.depthTexture.name=q.name+".shadowMap",Y.map.depthTexture.format=ti,this.type===Yr?(Y.map.depthTexture.compareFunction=Z?pl:fl,Y.map.depthTexture.minFilter=Xe,Y.map.depthTexture.magFilter=Xe):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=ze,Y.map.depthTexture.magFilter=ze);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==s.x||Y.map.height!==s.y)&&Y.map.setSize(s.x,s.y);let Q=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();q.isPointLight!==!0&&Y.updateMatrices(q,_);for(let $=0;$<Q;$++){let _t=Y.getCamera($);if(q.isPointLight){let Et=Y.camera,lt=Y.matrix,et=q.distance||Et.far;et!==Et.far&&(Et.far=et,Et.updateProjectionMatrix()),oo.setFromMatrixPosition(q.matrixWorld),Et.position.copy(oo),kh.copy(Et.position),kh.add(Kv[$]),Et.up.copy(Zv[$]),Et.lookAt(kh),Et.updateMatrixWorld(),lt.makeTranslation(-oo.x,-oo.y,-oo.z),bf.multiplyMatrices(Et.projectionMatrix,Et.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(bf,Et.coordinateSystem,Et.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)i.setRenderTarget(Y.map,$),i.clear();else{$===0&&(i.setRenderTarget(Y.map),i.clear());let Et=Y.getViewport($);o.set(r.x*Et.x,r.y*Et.y,r.x*Et.z,r.y*Et.w),N.viewport(o)}n=Y.getFrustum($),v(E,_,_t,q,this.type)}Y.isPointLightShadow!==!0&&this.type===nr&&M(Y,_),Y.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(A,C,P)};function M(S,E){let _=t.update(x);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null?S.mapPass=new on(s.x,s.y,{format:qi,type:Xn}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(E,null,_,u,x,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value.set(S.map.width,S.map.height),p.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(E,null,_,p,x,null)}function y(S,E,_,A){let C=null,P=_.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)C=P;else if(C=_.isPointLight===!0?l:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let N=C.uuid,k=E.uuid,I=c[N];I===void 0&&(I={},c[N]=I);let z=I[k];z===void 0&&(z=C.clone(),I[k]=z,E.addEventListener("dispose",b)),C=z}if(C.visible=E.visible,C.wireframe=E.wireframe,A===nr?C.side=E.shadowSide!==null?E.shadowSide:E.side:C.side=E.shadowSide!==null?E.shadowSide:d[E.side],C.alphaMap=E.alphaMap,C.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,C.map=E.map,C.clipShadows=E.clipShadows,C.clippingPlanes=E.clippingPlanes,C.clipIntersection=E.clipIntersection,C.displacementMap=E.displacementMap,C.displacementScale=E.displacementScale,C.displacementBias=E.displacementBias,C.wireframeLinewidth=E.wireframeLinewidth,C.linewidth=E.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let N=i.properties.get(C);N.light=_}return C}function v(S,E,_,A,C){if(S.visible===!1)return;if(S.layers.test(E.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&C===nr)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,S.matrixWorld);let k=t.update(S),I=S.material;if(Array.isArray(I)){let z=k.groups;for(let q=0,Y=z.length;q<Y;q++){let st=z[q],Z=I[st.materialIndex];if(Z&&Z.visible){let Q=y(S,Z,A,C);S.onBeforeShadow(i,S,E,_,k,Q,st),i.renderBufferDirect(_,null,k,Q,S,st),S.onAfterShadow(i,S,E,_,k,Q,st)}}}else if(I.visible){let z=y(S,I,A,C);S.onBeforeShadow(i,S,E,_,k,z,null),i.renderBufferDirect(_,null,k,z,S,null),S.onAfterShadow(i,S,E,_,k,z,null)}}let N=S.children;for(let k=0,I=N.length;k<I;k++)v(N[k],E,_,A,C)}function b(S){S.target.removeEventListener("dispose",b);for(let _ in c){let A=c[_],C=S.target.uuid;C in A&&(A[C].dispose(),delete A[C])}}}function jv(i,t){function e(){let U=!1,xt=new Te,tt=null,yt=new Te(0,0,0,0);return{setMask:function(St){tt!==St&&!U&&(i.colorMask(St,St,St,St),tt=St)},setLocked:function(St){U=St},setClear:function(St,rt,Ut,Pt,Re){Re===!0&&(St*=Pt,rt*=Pt,Ut*=Pt),xt.set(St,rt,Ut,Pt),yt.equals(xt)===!1&&(i.clearColor(St,rt,Ut,Pt),yt.copy(xt))},reset:function(){U=!1,tt=null,yt.set(-1,0,0,0)}}}function n(){let U=!1,xt=!1,tt=null,yt=null,St=null;return{setReversed:function(rt){if(xt!==rt){let Ut=t.get("EXT_clip_control");rt?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),xt=rt;let Pt=St;St=null,this.setClear(Pt)}},getReversed:function(){return xt},setTest:function(rt){rt?K(i.DEPTH_TEST):ht(i.DEPTH_TEST)},setMask:function(rt){tt!==rt&&!U&&(i.depthMask(rt),tt=rt)},setFunc:function(rt){if(xt&&(rt=Zd[rt]),yt!==rt){switch(rt){case Ko:i.depthFunc(i.NEVER);break;case Zo:i.depthFunc(i.ALWAYS);break;case Jo:i.depthFunc(i.LESS);break;case Ws:i.depthFunc(i.LEQUAL);break;case jo:i.depthFunc(i.EQUAL);break;case Qo:i.depthFunc(i.GEQUAL);break;case ta:i.depthFunc(i.GREATER);break;case ea:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}yt=rt}},setLocked:function(rt){U=rt},setClear:function(rt){St!==rt&&(St=rt,xt&&(rt=1-rt),i.clearDepth(rt))},reset:function(){U=!1,tt=null,yt=null,St=null,xt=!1}}}function s(){let U=!1,xt=null,tt=null,yt=null,St=null,rt=null,Ut=null,Pt=null,Re=null;return{setTest:function(me){U||(me?K(i.STENCIL_TEST):ht(i.STENCIL_TEST))},setMask:function(me){xt!==me&&!U&&(i.stencilMask(me),xt=me)},setFunc:function(me,Fn,Zn){(tt!==me||yt!==Fn||St!==Zn)&&(i.stencilFunc(me,Fn,Zn),tt=me,yt=Fn,St=Zn)},setOp:function(me,Fn,Zn){(rt!==me||Ut!==Fn||Pt!==Zn)&&(i.stencilOp(me,Fn,Zn),rt=me,Ut=Fn,Pt=Zn)},setLocked:function(me){U=me},setClear:function(me){Re!==me&&(i.clearStencil(me),Re=me)},reset:function(){U=!1,xt=null,tt=null,yt=null,St=null,rt=null,Ut=null,Pt=null,Re=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},p=new WeakMap,g=[],x=null,m=!1,f=null,M=null,y=null,v=null,b=null,S=null,E=null,_=new Qt(0,0,0),A=0,C=!1,P=null,N=null,k=null,I=null,z=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,st=0,Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(Z)[1]),Y=st>=1):Z.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),Y=st>=2);let Q=null,$={},_t=i.getParameter(i.SCISSOR_BOX),Et=i.getParameter(i.VIEWPORT),lt=new Te().fromArray(_t),et=new Te().fromArray(Et);function zt(U,xt,tt,yt){let St=new Uint8Array(4),rt=i.createTexture();i.bindTexture(U,rt),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<tt;Ut++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(xt,0,i.RGBA,1,1,yt,0,i.RGBA,i.UNSIGNED_BYTE,St):i.texImage2D(xt+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,St);return rt}let G={};G[i.TEXTURE_2D]=zt(i.TEXTURE_2D,i.TEXTURE_2D,1),G[i.TEXTURE_CUBE_MAP]=zt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[i.TEXTURE_2D_ARRAY]=zt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),G[i.TEXTURE_3D]=zt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(i.DEPTH_TEST),o.setFunc(Ws),Lt(!1),ae(Jc),K(i.CULL_FACE),qt(ri);function K(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function ht(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function At(U,xt){return u[U]!==xt?(i.bindFramebuffer(U,xt),u[U]=xt,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=xt),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=xt),!0):!1}function ct(U,xt){let tt=g,yt=!1;if(U){tt=p.get(xt),tt===void 0&&(tt=[],p.set(xt,tt));let St=U.textures;if(tt.length!==St.length||tt[0]!==i.COLOR_ATTACHMENT0){for(let rt=0,Ut=St.length;rt<Ut;rt++)tt[rt]=i.COLOR_ATTACHMENT0+rt;tt.length=St.length,yt=!0}}else tt[0]!==i.BACK&&(tt[0]=i.BACK,yt=!0);yt&&i.drawBuffers(tt)}function Ot(U){return x!==U?(i.useProgram(U),x=U,!0):!1}let fe={[xs]:i.FUNC_ADD,[xd]:i.FUNC_SUBTRACT,[yd]:i.FUNC_REVERSE_SUBTRACT};fe[vd]=i.MIN,fe[_d]=i.MAX;let $t={[bd]:i.ZERO,[Md]:i.ONE,[Sd]:i.SRC_COLOR,[nh]:i.SRC_ALPHA,[Cd]:i.SRC_ALPHA_SATURATE,[Ad]:i.DST_COLOR,[Td]:i.DST_ALPHA,[wd]:i.ONE_MINUS_SRC_COLOR,[ih]:i.ONE_MINUS_SRC_ALPHA,[Rd]:i.ONE_MINUS_DST_COLOR,[Ed]:i.ONE_MINUS_DST_ALPHA,[Pd]:i.CONSTANT_COLOR,[Id]:i.ONE_MINUS_CONSTANT_COLOR,[Ld]:i.CONSTANT_ALPHA,[Nd]:i.ONE_MINUS_CONSTANT_ALPHA};function qt(U,xt,tt,yt,St,rt,Ut,Pt,Re,me){if(U===ri){m===!0&&(ht(i.BLEND),m=!1);return}if(m===!1&&(K(i.BLEND),m=!0),U!==gd){if(U!==f||me!==C){if((M!==xs||b!==xs)&&(i.blendEquation(i.FUNC_ADD),M=xs,b=xs),me)switch(U){case ir:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qc:i.blendFunc(i.ONE,i.ONE);break;case th:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case eh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Gt("WebGLState: Invalid blending: ",U);break}else switch(U){case ir:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case th:Gt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case eh:Gt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Gt("WebGLState: Invalid blending: ",U);break}y=null,v=null,S=null,E=null,_.set(0,0,0),A=0,f=U,C=me}return}St=St||xt,rt=rt||tt,Ut=Ut||yt,(xt!==M||St!==b)&&(i.blendEquationSeparate(fe[xt],fe[St]),M=xt,b=St),(tt!==y||yt!==v||rt!==S||Ut!==E)&&(i.blendFuncSeparate($t[tt],$t[yt],$t[rt],$t[Ut]),y=tt,v=yt,S=rt,E=Ut),(Pt.equals(_)===!1||Re!==A)&&(i.blendColor(Pt.r,Pt.g,Pt.b,Re),_.copy(Pt),A=Re),f=U,C=!1}function se(U,xt){U.side===Nn?ht(i.CULL_FACE):K(i.CULL_FACE);let tt=U.side===je;xt&&(tt=!tt),Lt(tt),U.blending===ir&&U.transparent===!1?qt(ri):qt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);let yt=U.stencilWrite;a.setTest(yt),yt&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ke(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):ht(i.SAMPLE_ALPHA_TO_COVERAGE)}function Lt(U){P!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),P=U)}function ae(U){U!==fd?(K(i.CULL_FACE),U!==N&&(U===Jc?i.cullFace(i.BACK):U===pd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ht(i.CULL_FACE),N=U}function Ae(U){U!==k&&(Y&&i.lineWidth(U),k=U)}function Ke(U,xt,tt){U?(K(i.POLYGON_OFFSET_FILL),(I!==xt||z!==tt)&&(I=xt,z=tt,o.getReversed()&&(xt=-xt),i.polygonOffset(xt,tt))):ht(i.POLYGON_OFFSET_FILL)}function Se(U){U?K(i.SCISSOR_TEST):ht(i.SCISSOR_TEST)}function Ve(U){U===void 0&&(U=i.TEXTURE0+q-1),Q!==U&&(i.activeTexture(U),Q=U)}function F(U,xt,tt){tt===void 0&&(Q===null?tt=i.TEXTURE0+q-1:tt=Q);let yt=$[tt];yt===void 0&&(yt={type:void 0,texture:void 0},$[tt]=yt),(yt.type!==U||yt.texture!==xt)&&(Q!==tt&&(i.activeTexture(tt),Q=tt),i.bindTexture(U,xt||G[U]),yt.type=U,yt.texture=xt)}function tn(){let U=$[Q];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function _e(){try{i.compressedTexImage2D(...arguments)}catch(U){Gt("WebGLState:",U)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(U){Gt("WebGLState:",U)}}function w(){try{i.texSubImage2D(...arguments)}catch(U){Gt("WebGLState:",U)}}function B(){try{i.texSubImage3D(...arguments)}catch(U){Gt("WebGLState:",U)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(U){Gt("WebGLState:",U)}}function J(){try{i.compressedTexSubImage3D(...arguments)}catch(U){Gt("WebGLState:",U)}}function at(){try{i.texStorage2D(...arguments)}catch(U){Gt("WebGLState:",U)}}function pt(){try{i.texStorage3D(...arguments)}catch(U){Gt("WebGLState:",U)}}function j(){try{i.texImage2D(...arguments)}catch(U){Gt("WebGLState:",U)}}function nt(){try{i.texImage3D(...arguments)}catch(U){Gt("WebGLState:",U)}}function mt(U){return d[U]!==void 0?d[U]:i.getParameter(U)}function Nt(U,xt){d[U]!==xt&&(i.pixelStorei(U,xt),d[U]=xt)}function vt(U){lt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),lt.copy(U))}function gt(U){et.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),et.copy(U))}function Dt(U,xt){let tt=c.get(xt);tt===void 0&&(tt=new WeakMap,c.set(xt,tt));let yt=tt.get(U);yt===void 0&&(yt=i.getUniformBlockIndex(xt,U.name),tt.set(U,yt))}function Bt(U,xt){let yt=c.get(xt).get(U);l.get(xt)!==yt&&(i.uniformBlockBinding(xt,yt,U.__bindingPointIndex),l.set(xt,yt))}function jt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},Q=null,$={},u={},p=new WeakMap,g=[],x=null,m=!1,f=null,M=null,y=null,v=null,b=null,S=null,E=null,_=new Qt(0,0,0),A=0,C=!1,P=null,N=null,k=null,I=null,z=null,lt.set(0,0,i.canvas.width,i.canvas.height),et.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:K,disable:ht,bindFramebuffer:At,drawBuffers:ct,useProgram:Ot,setBlending:qt,setMaterial:se,setFlipSided:Lt,setCullFace:ae,setLineWidth:Ae,setPolygonOffset:Ke,setScissorTest:Se,activeTexture:Ve,bindTexture:F,unbindTexture:tn,compressedTexImage2D:_e,compressedTexImage3D:R,texImage2D:j,texImage3D:nt,pixelStorei:Nt,getParameter:mt,updateUBOMapping:Dt,uniformBlockBinding:Bt,texStorage2D:at,texStorage3D:pt,texSubImage2D:w,texSubImage3D:B,compressedTexSubImage2D:W,compressedTexSubImage3D:J,scissor:vt,viewport:gt,reset:jt}}function Qv(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Zt,h=new WeakMap,d=new Set,u,p=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,w){return g?new OffscreenCanvas(R,w):Dr("canvas")}function m(R,w,B){let W=1,J=_e(R);if((J.width>B||J.height>B)&&(W=B/Math.max(J.width,J.height)),W<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let at=Math.floor(W*J.width),pt=Math.floor(W*J.height);u===void 0&&(u=x(at,pt));let j=w?x(at,pt):u;return j.width=at,j.height=pt,j.getContext("2d").drawImage(R,0,0,at,pt),Ht("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+at+"x"+pt+")."),j}else return"data"in R&&Ht("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),R;return R}function f(R){return R.generateMipmaps}function M(R){i.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(R,w,B,W,J,at=!1){if(R!==null){if(i[R]!==void 0)return i[R];Ht("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let pt;W&&(pt=t.get("EXT_texture_norm16"),pt||Ht("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=w;if(w===i.RED&&(B===i.FLOAT&&(j=i.R32F),B===i.HALF_FLOAT&&(j=i.R16F),B===i.UNSIGNED_BYTE&&(j=i.R8),B===i.UNSIGNED_SHORT&&pt&&(j=pt.R16_EXT),B===i.SHORT&&pt&&(j=pt.R16_SNORM_EXT)),w===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.R8UI),B===i.UNSIGNED_SHORT&&(j=i.R16UI),B===i.UNSIGNED_INT&&(j=i.R32UI),B===i.BYTE&&(j=i.R8I),B===i.SHORT&&(j=i.R16I),B===i.INT&&(j=i.R32I)),w===i.RG&&(B===i.FLOAT&&(j=i.RG32F),B===i.HALF_FLOAT&&(j=i.RG16F),B===i.UNSIGNED_BYTE&&(j=i.RG8),B===i.UNSIGNED_SHORT&&pt&&(j=pt.RG16_EXT),B===i.SHORT&&pt&&(j=pt.RG16_SNORM_EXT)),w===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RG8UI),B===i.UNSIGNED_SHORT&&(j=i.RG16UI),B===i.UNSIGNED_INT&&(j=i.RG32UI),B===i.BYTE&&(j=i.RG8I),B===i.SHORT&&(j=i.RG16I),B===i.INT&&(j=i.RG32I)),w===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RGB8UI),B===i.UNSIGNED_SHORT&&(j=i.RGB16UI),B===i.UNSIGNED_INT&&(j=i.RGB32UI),B===i.BYTE&&(j=i.RGB8I),B===i.SHORT&&(j=i.RGB16I),B===i.INT&&(j=i.RGB32I)),w===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),B===i.UNSIGNED_INT&&(j=i.RGBA32UI),B===i.BYTE&&(j=i.RGBA8I),B===i.SHORT&&(j=i.RGBA16I),B===i.INT&&(j=i.RGBA32I)),w===i.RGB&&(B===i.UNSIGNED_SHORT&&pt&&(j=pt.RGB16_EXT),B===i.SHORT&&pt&&(j=pt.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),w===i.RGBA){let nt=at?Nr:oe.getTransfer(J);B===i.FLOAT&&(j=i.RGBA32F),B===i.HALF_FLOAT&&(j=i.RGBA16F),B===i.UNSIGNED_BYTE&&(j=nt===xe?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&pt&&(j=pt.RGBA16_EXT),B===i.SHORT&&pt&&(j=pt.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function b(R,w){let B;return R?w===null||w===Wn||w===rr?B=i.DEPTH24_STENCIL8:w===yn?B=i.DEPTH32F_STENCIL8:w===sr&&(B=i.DEPTH24_STENCIL8,Ht("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Wn||w===rr?B=i.DEPTH_COMPONENT24:w===yn?B=i.DEPTH_COMPONENT32F:w===sr&&(B=i.DEPTH_COMPONENT16),B}function S(R,w){return f(R)===!0||R.isFramebufferTexture&&R.minFilter!==ze&&R.minFilter!==Xe?Math.log2(Math.max(w.width,w.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?w.mipmaps.length:1}function E(R){let w=R.target;w.removeEventListener("dispose",E),A(w),w.isVideoTexture&&h.delete(w),w.isHTMLTexture&&d.delete(w)}function _(R){let w=R.target;w.removeEventListener("dispose",_),P(w)}function A(R){let w=n.get(R);if(w.__webglInit===void 0)return;let B=R.source,W=p.get(B);if(W){let J=W[w.__cacheKey];J.usedTimes--,J.usedTimes===0&&C(R),Object.keys(W).length===0&&p.delete(B)}n.remove(R)}function C(R){let w=n.get(R);i.deleteTexture(w.__webglTexture);let B=R.source,W=p.get(B);delete W[w.__cacheKey],o.memory.textures--}function P(R){let w=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(w.__webglFramebuffer[W]))for(let J=0;J<w.__webglFramebuffer[W].length;J++)i.deleteFramebuffer(w.__webglFramebuffer[W][J]);else i.deleteFramebuffer(w.__webglFramebuffer[W]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[W])}else{if(Array.isArray(w.__webglFramebuffer))for(let W=0;W<w.__webglFramebuffer.length;W++)i.deleteFramebuffer(w.__webglFramebuffer[W]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let W=0;W<w.__webglColorRenderbuffer.length;W++)w.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[W]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let B=R.textures;for(let W=0,J=B.length;W<J;W++){let at=n.get(B[W]);at.__webglTexture&&(i.deleteTexture(at.__webglTexture),o.memory.textures--),n.remove(B[W])}n.remove(R)}let N=0;function k(){N=0}function I(){return N}function z(R){N=R}function q(){let R=N;return R>=s.maxTextures&&Ht("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),N+=1,R}function Y(R){let w=[];return w.push(R.wrapS),w.push(R.wrapT),w.push(R.wrapR||0),w.push(R.magFilter),w.push(R.minFilter),w.push(R.anisotropy),w.push(R.internalFormat),w.push(R.format),w.push(R.type),w.push(R.generateMipmaps),w.push(R.premultiplyAlpha),w.push(R.flipY),w.push(R.unpackAlignment),w.push(R.colorSpace),w.join()}function st(R,w){let B=n.get(R);if(R.isVideoTexture&&F(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&B.__version!==R.version){let W=R.image;if(W===null)Ht("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Ht("WebGLRenderer: Texture marked for update but image is incomplete");else{ht(B,R,w);return}}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+w)}function Z(R,w){let B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){ht(B,R,w);return}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+w)}function Q(R,w){let B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){ht(B,R,w);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+w)}function $(R,w){let B=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&B.__version!==R.version){At(B,R,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+w)}let _t={[na]:i.REPEAT,[Qn]:i.CLAMP_TO_EDGE,[ia]:i.MIRRORED_REPEAT},Et={[ze]:i.NEAREST,[Od]:i.NEAREST_MIPMAP_NEAREST,[Zr]:i.NEAREST_MIPMAP_LINEAR,[Xe]:i.LINEAR,[Ca]:i.LINEAR_MIPMAP_NEAREST,[Xi]:i.LINEAR_MIPMAP_LINEAR},lt={[Bd]:i.NEVER,[Xd]:i.ALWAYS,[Hd]:i.LESS,[fl]:i.LEQUAL,[Vd]:i.EQUAL,[pl]:i.GEQUAL,[Gd]:i.GREATER,[Wd]:i.NOTEQUAL};function et(R,w){if(w.type===yn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Xe||w.magFilter===Ca||w.magFilter===Zr||w.magFilter===Xi||w.minFilter===Xe||w.minFilter===Ca||w.minFilter===Zr||w.minFilter===Xi)&&Ht("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,_t[w.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,_t[w.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,_t[w.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Et[w.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Et[w.minFilter]),w.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,lt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===ze||w.minFilter!==Zr&&w.minFilter!==Xi||w.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function zt(R,w){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,w.addEventListener("dispose",E));let W=w.source,J=p.get(W);J===void 0&&(J={},p.set(W,J));let at=Y(w);if(at!==R.__cacheKey){J[at]===void 0&&(J[at]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),J[at].usedTimes++;let pt=J[R.__cacheKey];pt!==void 0&&(J[R.__cacheKey].usedTimes--,pt.usedTimes===0&&C(w)),R.__cacheKey=at,R.__webglTexture=J[at].texture}return B}function G(R,w,B){return Math.floor(Math.floor(R/B)/w)}function K(R,w,B,W){let at=R.updateRanges;if(at.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,B,W,w.data);else{at.sort((Nt,vt)=>Nt.start-vt.start);let pt=0;for(let Nt=1;Nt<at.length;Nt++){let vt=at[pt],gt=at[Nt],Dt=vt.start+vt.count,Bt=G(gt.start,w.width,4),jt=G(vt.start,w.width,4);gt.start<=Dt+1&&Bt===jt&&G(gt.start+gt.count-1,w.width,4)===Bt?vt.count=Math.max(vt.count,gt.start+gt.count-vt.start):(++pt,at[pt]=gt)}at.length=pt+1;let j=e.getParameter(i.UNPACK_ROW_LENGTH),nt=e.getParameter(i.UNPACK_SKIP_PIXELS),mt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let Nt=0,vt=at.length;Nt<vt;Nt++){let gt=at[Nt],Dt=Math.floor(gt.start/4),Bt=Math.ceil(gt.count/4),jt=Dt%w.width,U=Math.floor(Dt/w.width),xt=Bt,tt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,jt),e.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,jt,U,xt,tt,B,W,w.data)}R.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,j),e.pixelStorei(i.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,mt)}}function ht(R,w,B){let W=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(W=i.TEXTURE_3D);let J=zt(R,w),at=w.source;e.bindTexture(W,R.__webglTexture,i.TEXTURE0+B);let pt=n.get(at);if(at.version!==pt.__version||J===!0){if(e.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){let tt=oe.getPrimaries(oe.workingColorSpace),yt=w.colorSpace===bi?null:oe.getPrimaries(w.colorSpace),St=w.colorSpace===bi||tt===yt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,St)}e.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment);let nt=m(w.image,!1,s.maxTextureSize);nt=tn(w,nt);let mt=r.convert(w.format,w.colorSpace),Nt=r.convert(w.type),vt=v(w.internalFormat,mt,Nt,w.normalized,w.colorSpace,w.isVideoTexture);et(W,w);let gt,Dt=w.mipmaps,Bt=w.isVideoTexture!==!0,jt=pt.__version===void 0||J===!0,U=at.dataReady,xt=S(w,nt);if(w.isDepthTexture)vt=b(w.format===$i,w.type),jt&&(Bt?e.texStorage2D(i.TEXTURE_2D,1,vt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,vt,nt.width,nt.height,0,mt,Nt,null));else if(w.isDataTexture)if(Dt.length>0){Bt&&jt&&e.texStorage2D(i.TEXTURE_2D,xt,vt,Dt[0].width,Dt[0].height);for(let tt=0,yt=Dt.length;tt<yt;tt++)gt=Dt[tt],Bt?U&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,gt.width,gt.height,mt,Nt,gt.data):e.texImage2D(i.TEXTURE_2D,tt,vt,gt.width,gt.height,0,mt,Nt,gt.data);w.generateMipmaps=!1}else Bt?(jt&&e.texStorage2D(i.TEXTURE_2D,xt,vt,nt.width,nt.height),U&&K(w,nt,mt,Nt)):e.texImage2D(i.TEXTURE_2D,0,vt,nt.width,nt.height,0,mt,Nt,nt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Bt&&jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,vt,Dt[0].width,Dt[0].height,nt.depth);for(let tt=0,yt=Dt.length;tt<yt;tt++)if(gt=Dt[tt],w.format!==vn)if(mt!==null)if(Bt){if(U)if(w.layerUpdates.size>0){let St=Ah(gt.width,gt.height,w.format,w.type);for(let rt of w.layerUpdates){let Ut=gt.data.subarray(rt*St/gt.data.BYTES_PER_ELEMENT,(rt+1)*St/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,rt,gt.width,gt.height,1,mt,Ut)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,gt.width,gt.height,nt.depth,mt,gt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,vt,gt.width,gt.height,nt.depth,0,gt.data,0,0);else Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,gt.width,gt.height,nt.depth,mt,Nt,gt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,vt,gt.width,gt.height,nt.depth,0,mt,Nt,gt.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{Bt&&jt&&e.texStorage2D(i.TEXTURE_2D,xt,vt,Dt[0].width,Dt[0].height);for(let tt=0,yt=Dt.length;tt<yt;tt++)gt=Dt[tt],w.format!==vn?mt!==null?Bt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,gt.width,gt.height,mt,gt.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,vt,gt.width,gt.height,0,gt.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?U&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,gt.width,gt.height,mt,Nt,gt.data):e.texImage2D(i.TEXTURE_2D,tt,vt,gt.width,gt.height,0,mt,Nt,gt.data)}else if(w.isDataArrayTexture)if(Bt){if(jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,vt,nt.width,nt.height,nt.depth),U)if(w.layerUpdates.size>0){let tt=Ah(nt.width,nt.height,w.format,w.type);for(let yt of w.layerUpdates){let St=nt.data.subarray(yt*tt/nt.data.BYTES_PER_ELEMENT,(yt+1)*tt/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,yt,nt.width,nt.height,1,mt,Nt,St)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,mt,Nt,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,vt,nt.width,nt.height,nt.depth,0,mt,Nt,nt.data);else if(w.isData3DTexture)Bt?(jt&&e.texStorage3D(i.TEXTURE_3D,xt,vt,nt.width,nt.height,nt.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,mt,Nt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,vt,nt.width,nt.height,nt.depth,0,mt,Nt,nt.data);else if(w.isFramebufferTexture){if(jt)if(Bt)e.texStorage2D(i.TEXTURE_2D,xt,vt,nt.width,nt.height);else{let tt=nt.width,yt=nt.height;for(let St=0;St<xt;St++)e.texImage2D(i.TEXTURE_2D,St,vt,tt,yt,0,mt,Nt,null),tt>>=1,yt>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in i){let tt=i.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),nt.parentNode!==tt){tt.appendChild(nt),d.add(w),tt.onpaint=yt=>{let St=yt.changedElements;for(let rt of d)St.includes(rt.image)&&(rt.needsUpdate=!0)},tt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,nt);else{let St=i.RGBA,rt=i.RGBA,Ut=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,St,rt,Ut,nt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Dt.length>0){if(Bt&&jt){let tt=_e(Dt[0]);e.texStorage2D(i.TEXTURE_2D,xt,vt,tt.width,tt.height)}for(let tt=0,yt=Dt.length;tt<yt;tt++)gt=Dt[tt],Bt?U&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,mt,Nt,gt):e.texImage2D(i.TEXTURE_2D,tt,vt,mt,Nt,gt);w.generateMipmaps=!1}else if(Bt){if(jt){let tt=_e(nt);e.texStorage2D(i.TEXTURE_2D,xt,vt,tt.width,tt.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,mt,Nt,nt)}else e.texImage2D(i.TEXTURE_2D,0,vt,mt,Nt,nt);f(w)&&M(W),pt.__version=at.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function At(R,w,B){if(w.image.length!==6)return;let W=zt(R,w),J=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+B);let at=n.get(J);if(J.version!==at.__version||W===!0){e.activeTexture(i.TEXTURE0+B);let pt=oe.getPrimaries(oe.workingColorSpace),j=w.colorSpace===bi?null:oe.getPrimaries(w.colorSpace),nt=w.colorSpace===bi||pt===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let mt=w.isCompressedTexture||w.image[0].isCompressedTexture,Nt=w.image[0]&&w.image[0].isDataTexture,vt=[];for(let rt=0;rt<6;rt++)!mt&&!Nt?vt[rt]=m(w.image[rt],!0,s.maxCubemapSize):vt[rt]=Nt?w.image[rt].image:w.image[rt],vt[rt]=tn(w,vt[rt]);let gt=vt[0],Dt=r.convert(w.format,w.colorSpace),Bt=r.convert(w.type),jt=v(w.internalFormat,Dt,Bt,w.normalized,w.colorSpace),U=w.isVideoTexture!==!0,xt=at.__version===void 0||W===!0,tt=J.dataReady,yt=S(w,gt);et(i.TEXTURE_CUBE_MAP,w);let St;if(mt){U&&xt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,yt,jt,gt.width,gt.height);for(let rt=0;rt<6;rt++){St=vt[rt].mipmaps;for(let Ut=0;Ut<St.length;Ut++){let Pt=St[Ut];w.format!==vn?Dt!==null?U?tt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut,0,0,Pt.width,Pt.height,Dt,Pt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut,jt,Pt.width,Pt.height,0,Pt.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut,0,0,Pt.width,Pt.height,Dt,Bt,Pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut,jt,Pt.width,Pt.height,0,Dt,Bt,Pt.data)}}}else{if(St=w.mipmaps,U&&xt){St.length>0&&yt++;let rt=_e(vt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,yt,jt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(Nt){U?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,vt[rt].width,vt[rt].height,Dt,Bt,vt[rt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,jt,vt[rt].width,vt[rt].height,0,Dt,Bt,vt[rt].data);for(let Ut=0;Ut<St.length;Ut++){let Re=St[Ut].image[rt].image;U?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut+1,0,0,Re.width,Re.height,Dt,Bt,Re.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut+1,jt,Re.width,Re.height,0,Dt,Bt,Re.data)}}else{U?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Dt,Bt,vt[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,jt,Dt,Bt,vt[rt]);for(let Ut=0;Ut<St.length;Ut++){let Pt=St[Ut];U?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut+1,0,0,Dt,Bt,Pt.image[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Ut+1,jt,Dt,Bt,Pt.image[rt])}}}f(w)&&M(i.TEXTURE_CUBE_MAP),at.__version=J.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function ct(R,w,B,W,J,at){let pt=r.convert(B.format,B.colorSpace),j=r.convert(B.type),nt=v(B.internalFormat,pt,j,B.normalized,B.colorSpace),mt=n.get(w),Nt=n.get(B);if(Nt.__renderTarget=w,!mt.__hasExternalTextures){let vt=Math.max(1,w.width>>at),gt=Math.max(1,w.height>>at);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,at,nt,vt,gt,w.depth,0,pt,j,null):e.texImage2D(J,at,nt,vt,gt,0,pt,j,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),Ve(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,J,Nt.__webglTexture,0,Se(w)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,J,Nt.__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ot(R,w,B){if(i.bindRenderbuffer(i.RENDERBUFFER,R),w.depthBuffer){let W=w.depthTexture,J=W&&W.isDepthTexture?W.type:null,at=b(w.stencilBuffer,J),pt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ve(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Se(w),at,w.width,w.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Se(w),at,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,at,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,pt,i.RENDERBUFFER,R)}else{let W=w.textures;for(let J=0;J<W.length;J++){let at=W[J],pt=r.convert(at.format,at.colorSpace),j=r.convert(at.type),nt=v(at.internalFormat,pt,j,at.normalized,at.colorSpace);Ve(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Se(w),nt,w.width,w.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Se(w),nt,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,nt,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function fe(R,w,B){let W=w.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let J=n.get(w.depthTexture);if(J.__renderTarget=w,(!J.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),W){if(J.__webglInit===void 0&&(J.__webglInit=!0,w.depthTexture.addEventListener("dispose",E)),J.__webglTexture===void 0){J.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),et(i.TEXTURE_CUBE_MAP,w.depthTexture);let mt=r.convert(w.depthTexture.format),Nt=r.convert(w.depthTexture.type),vt;w.depthTexture.format===ti?vt=i.DEPTH_COMPONENT24:w.depthTexture.format===$i&&(vt=i.DEPTH24_STENCIL8);for(let gt=0;gt<6;gt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,vt,w.width,w.height,0,mt,Nt,null)}}else st(w.depthTexture,0);let at=J.__webglTexture,pt=Se(w),j=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,nt=w.depthTexture.format===$i?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(w.depthTexture.format===ti)Ve(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,j,at,0,pt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,j,at,0);else if(w.depthTexture.format===$i)Ve(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,j,at,0,pt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,j,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function $t(R){let w=n.get(R),B=R.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==R.depthTexture){let W=R.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),W){let J=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,W.removeEventListener("dispose",J)};W.addEventListener("dispose",J),w.__depthDisposeCallback=J}w.__boundDepthTexture=W}if(R.depthTexture&&!w.__autoAllocateDepthBuffer)if(B)for(let W=0;W<6;W++)fe(w.__webglFramebuffer[W],R,W);else{let W=R.texture.mipmaps;W&&W.length>0?fe(w.__webglFramebuffer[0],R,0):fe(w.__webglFramebuffer,R,0)}else if(B){w.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[W]),w.__webglDepthbuffer[W]===void 0)w.__webglDepthbuffer[W]=i.createRenderbuffer(),Ot(w.__webglDepthbuffer[W],R,!1);else{let J=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=w.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,at)}}else{let W=R.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),Ot(w.__webglDepthbuffer,R,!1);else{let J=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,at)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function qt(R,w,B){let W=n.get(R);w!==void 0&&ct(W.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&$t(R)}function se(R){let w=R.texture,B=n.get(R),W=n.get(w);R.addEventListener("dispose",_);let J=R.textures,at=R.isWebGLCubeRenderTarget===!0,pt=J.length>1;if(pt||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=w.version,o.memory.textures++),at){B.__webglFramebuffer=[];for(let j=0;j<6;j++)if(w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer[j]=[];for(let nt=0;nt<w.mipmaps.length;nt++)B.__webglFramebuffer[j][nt]=i.createFramebuffer()}else B.__webglFramebuffer[j]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer=[];for(let j=0;j<w.mipmaps.length;j++)B.__webglFramebuffer[j]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(pt)for(let j=0,nt=J.length;j<nt;j++){let mt=n.get(J[j]);mt.__webglTexture===void 0&&(mt.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&Ve(R)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let j=0;j<J.length;j++){let nt=J[j];B.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[j]);let mt=r.convert(nt.format,nt.colorSpace),Nt=r.convert(nt.type),vt=v(nt.internalFormat,mt,Nt,nt.normalized,nt.colorSpace,R.isXRRenderTarget===!0),gt=Se(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,gt,vt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,B.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Ot(B.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(at){e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),et(i.TEXTURE_CUBE_MAP,w);for(let j=0;j<6;j++)if(w.mipmaps&&w.mipmaps.length>0)for(let nt=0;nt<w.mipmaps.length;nt++)ct(B.__webglFramebuffer[j][nt],R,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,nt);else ct(B.__webglFramebuffer[j],R,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);f(w)&&M(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let j=0,nt=J.length;j<nt;j++){let mt=J[j],Nt=n.get(mt),vt=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(vt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(vt,Nt.__webglTexture),et(vt,mt),ct(B.__webglFramebuffer,R,mt,i.COLOR_ATTACHMENT0+j,vt,0),f(mt)&&M(vt)}e.unbindTexture()}else{let j=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(j=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(j,W.__webglTexture),et(j,w),w.mipmaps&&w.mipmaps.length>0)for(let nt=0;nt<w.mipmaps.length;nt++)ct(B.__webglFramebuffer[nt],R,w,i.COLOR_ATTACHMENT0,j,nt);else ct(B.__webglFramebuffer,R,w,i.COLOR_ATTACHMENT0,j,0);f(w)&&M(j),e.unbindTexture()}R.depthBuffer&&$t(R)}function Lt(R){let w=R.textures;for(let B=0,W=w.length;B<W;B++){let J=w[B];if(f(J)){let at=y(R),pt=n.get(J).__webglTexture;e.bindTexture(at,pt),M(at),e.unbindTexture()}}}let ae=[],Ae=[];function Ke(R){if(R.samples>0){if(Ve(R)===!1){let w=R.textures,B=R.width,W=R.height,J=i.COLOR_BUFFER_BIT,at=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=n.get(R),j=w.length>1;if(j)for(let mt=0;mt<w.length;mt++)e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer);let nt=R.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let mt=0;mt<w.length;mt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);let Nt=n.get(w[mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Nt,0)}i.blitFramebuffer(0,0,B,W,0,0,B,W,J,i.NEAREST),l===!0&&(ae.length=0,Ae.length=0,ae.push(i.COLOR_ATTACHMENT0+mt),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(ae.push(at),Ae.push(at),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ae)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ae))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let mt=0;mt<w.length;mt++){e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);let Nt=n.get(w[mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,Nt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let w=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function Se(R){return Math.min(s.maxSamples,R.samples)}function Ve(R){let w=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function F(R){let w=o.render.frame;h.get(R)!==w&&(h.set(R,w),R.update())}function tn(R,w){let B=R.colorSpace,W=R.format,J=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==ds&&B!==bi&&(oe.getTransfer(B)===xe?(W!==vn||J!==xn)&&Ht("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Gt("WebGLTextures: Unsupported texture color space:",B)),w}function _e(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=k,this.getTextureUnits=I,this.setTextureUnits=z,this.setTexture2D=st,this.setTexture2DArray=Z,this.setTexture3D=Q,this.setTextureCube=$,this.rebindTextures=qt,this.setupRenderTarget=se,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=Ke,this.setupDepthRenderbuffer=$t,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=Ve,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function t_(i,t){function e(n,s=bi){let r,o=oe.getTransfer(s);if(n===xn)return i.UNSIGNED_BYTE;if(n===Ia)return i.UNSIGNED_SHORT_4_4_4_4;if(n===La)return i.UNSIGNED_SHORT_5_5_5_1;if(n===mh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===fh)return i.BYTE;if(n===ph)return i.SHORT;if(n===sr)return i.UNSIGNED_SHORT;if(n===Pa)return i.INT;if(n===Wn)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===Xn)return i.HALF_FLOAT;if(n===xh)return i.ALPHA;if(n===yh)return i.RGB;if(n===vn)return i.RGBA;if(n===ti)return i.DEPTH_COMPONENT;if(n===$i)return i.DEPTH_STENCIL;if(n===Na)return i.RED;if(n===Da)return i.RED_INTEGER;if(n===qi)return i.RG;if(n===Ua)return i.RG_INTEGER;if(n===Oa)return i.RGBA_INTEGER;if(n===Jr||n===jr||n===Qr||n===to)if(o===xe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Jr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===to)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Jr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===to)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Fa||n===ka||n===za||n===Ba)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Fa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ka)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===za)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ba)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ha||n===Va||n===Ga||n===Wa||n===Xa||n===eo||n===$a)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ha||n===Va)return o===xe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ga)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Wa)return r.COMPRESSED_R11_EAC;if(n===Xa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===eo)return r.COMPRESSED_RG11_EAC;if(n===$a)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===qa||n===Ya||n===Ka||n===Za||n===Ja||n===ja||n===Qa||n===tl||n===el||n===nl||n===il||n===sl||n===rl||n===ol)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===qa)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ya)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ka)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Za)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ja)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ja)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Qa)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===tl)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===el)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===nl)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===il)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===sl)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===rl)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ol)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===al||n===ll||n===cl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===al)return o===xe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ll)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===cl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hl||n===ul||n===no||n===dl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===hl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ul)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===no)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===dl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var e_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,n_=`
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

}`,$h=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Hr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Fe({vertexShader:e_,fragmentShader:n_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ue(new An(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},qh=class extends ei{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null,x=typeof XRWebGLBinding<"u",m=new $h,f={},M=e.getContextAttributes(),y=null,v=null,b=[],S=[],E=new Zt,_=null,A=null,C=new rn;C.viewport=new Te;let P=new rn;P.viewport=new Te;let N=[C,P],k=new Ta,I=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let K=b[G];return K===void 0&&(K=new Ks,b[G]=K),K.getTargetRaySpace()},this.getControllerGrip=function(G){let K=b[G];return K===void 0&&(K=new Ks,b[G]=K),K.getGripSpace()},this.getHand=function(G){let K=b[G];return K===void 0&&(K=new Ks,b[G]=K),K.getHandSpace()};function q(G){let K=S.indexOf(G.inputSource);if(K===-1)return;let ht=b[K];ht!==void 0&&(ht.update(G.inputSource,G.frame,c||o),ht.dispatchEvent({type:G.type,data:G.inputSource}))}function Y(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",st);for(let G=0;G<b.length;G++){let K=S[G];K!==null&&(S[G]=null,b[G].disconnect(K))}I=null,z=null,m.reset();for(let G in f)delete f[G];if(t.setRenderTarget(y),p=null,u=null,d=null,s=null,v=null,zt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(E.width,E.height,!1),A!==null){let G=A.camera;G.fov=A.fov,G.zoom=A.zoom,G.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&Ht("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,n.isPresenting===!0&&Ht("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",st),M.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(E),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ht=null,At=null,ct=null;M.depth&&(ct=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=M.stencil?$i:ti,At=M.stencil?rr:Wn);let Ot={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ot),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new on(u.textureWidth,u.textureHeight,{format:vn,type:xn,depthTexture:new Oi(u.textureWidth,u.textureHeight,At,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let ht={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,ht),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new on(p.framebufferWidth,p.framebufferHeight,{format:vn,type:xn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),zt.setContext(s),zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function st(G){for(let K=0;K<G.removed.length;K++){let ht=G.removed[K],At=S.indexOf(ht);At>=0&&(S[At]=null,b[At].disconnect(ht))}for(let K=0;K<G.added.length;K++){let ht=G.added[K],At=S.indexOf(ht);if(At===-1){for(let Ot=0;Ot<b.length;Ot++)if(Ot>=S.length){S.push(ht),At=Ot;break}else if(S[Ot]===null){S[Ot]=ht,At=Ot;break}if(At===-1)break}let ct=b[At];ct&&ct.connect(ht)}}let Z=new L,Q=new L;function $(G,K,ht){Z.setFromMatrixPosition(K.matrixWorld),Q.setFromMatrixPosition(ht.matrixWorld);let At=Z.distanceTo(Q),ct=K.projectionMatrix.elements,Ot=ht.projectionMatrix.elements,fe=ct[14]/(ct[10]-1),$t=ct[14]/(ct[10]+1),qt=(ct[9]+1)/ct[5],se=(ct[9]-1)/ct[5],Lt=(ct[8]-1)/ct[0],ae=(Ot[8]+1)/Ot[0],Ae=fe*Lt,Ke=fe*ae,Se=At/(-Lt+ae),Ve=Se*-Lt;if(K.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Ve),G.translateZ(Se),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),ct[10]===-1)G.projectionMatrix.copy(K.projectionMatrix),G.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{let F=fe+Se,tn=$t+Se,_e=Ae-Ve,R=Ke+(At-Ve),w=qt*$t/tn*F,B=se*$t/tn*F;G.projectionMatrix.makePerspective(_e,R,w,B,F,tn),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function _t(G,K){K===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(K.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;let K=G.near,ht=G.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(ht=m.depthFar)),k.near=P.near=C.near=K,k.far=P.far=C.far=ht,(I!==k.near||z!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),I=k.near,z=k.far),k.layers.mask=G.layers.mask|6,C.layers.mask=k.layers.mask&-5,P.layers.mask=k.layers.mask&-3;let At=G.parent,ct=k.cameras;_t(k,At);for(let Ot=0;Ot<ct.length;Ot++)_t(ct[Ot],At);ct.length===2?$(k,C,P):k.projectionMatrix.copy(C.projectionMatrix),A===null&&G.isPerspectiveCamera&&(A={camera:G,fov:G.fov,zoom:G.zoom}),Et(G,k,At)};function Et(G,K,ht){ht===null?G.matrix.copy(K.matrixWorld):(G.matrix.copy(ht.matrixWorld),G.matrix.invert(),G.matrix.multiply(K.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(K.projectionMatrix),G.projectionMatrixInverse.copy(K.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=qs*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(G){l=G,u!==null&&(u.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(G){return f[G]};let lt=null;function et(G,K){if(h=K.getViewerPose(c||o),g=K,h!==null){let ht=h.views;p!==null&&(t.setRenderTargetFramebuffer(v,p.framebuffer),t.setRenderTarget(v));let At=!1;ht.length!==k.cameras.length&&(k.cameras.length=0,At=!0);for(let $t=0;$t<ht.length;$t++){let qt=ht[$t],se=null;if(p!==null)se=p.getViewport(qt);else{let ae=d.getViewSubImage(u,qt);se=ae.viewport,$t===0&&(t.setRenderTargetTextures(v,ae.colorTexture,ae.depthStencilTexture),t.setRenderTarget(v))}let Lt=N[$t];Lt===void 0&&(Lt=new rn,Lt.layers.enable($t),Lt.viewport=new Te,N[$t]=Lt),Lt.matrix.fromArray(qt.transform.matrix),Lt.matrix.decompose(Lt.position,Lt.quaternion,Lt.scale),Lt.projectionMatrix.fromArray(qt.projectionMatrix),Lt.projectionMatrixInverse.copy(Lt.projectionMatrix).invert(),Lt.viewport.set(se.x,se.y,se.width,se.height),$t===0&&(k.matrix.copy(Lt.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),At===!0&&k.cameras.push(Lt)}let ct=s.enabledFeatures;if(ct&&ct.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let $t=d.getDepthInformation(ht[0]);$t&&$t.isValid&&$t.texture&&m.init($t,s.renderState)}if(ct&&ct.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let $t=0;$t<ht.length;$t++){let qt=ht[$t].camera;if(qt){let se=f[qt];se||(se=new Hr,f[qt]=se);let Lt=d.getCameraImage(qt);se.sourceTexture=Lt}}}}for(let ht=0;ht<b.length;ht++){let At=S[ht],ct=b[ht];At!==null&&ct!==void 0&&ct.update(At,K,c||o)}lt&&lt(G,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}let zt=new Mf;zt.setAnimationLoop(et),this.setAnimationLoop=function(G){lt=G},this.dispose=function(){}}},i_=new re,Rf=new Vt;Rf.set(-1,0,0,0,1,0,0,0,1);function s_(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,wh(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,y,v){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,M,y):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===je&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===je&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let M=t.get(f),y=M.envMap,v=M.envMapRotation;y&&(m.envMap.value=y,m.envMapRotation.value.setFromMatrix4(i_.makeRotationFromEuler(v)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Rf),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,y){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=y*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===je&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){let M=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function r_(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,b){let S=b.program;n.uniformBlockBinding(v,S)}function c(v,b){let S=s[v.id];S===void 0&&(m(v),S=h(v),s[v.id]=S,v.addEventListener("dispose",M));let E=b.program;n.updateUBOMapping(v,E);let _=t.render.frame;r[v.id]!==_&&(u(v),r[v.id]=_)}function h(v){let b=d();v.__bindingPointIndex=b;let S=i.createBuffer(),E=v.__size,_=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,E,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,S),S}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Gt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let b=s[v.id],S=v.uniforms,E=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let _=0,A=S.length;_<A;_++){let C=S[_];if(Array.isArray(C))for(let P=0,N=C.length;P<N;P++)p(C[P],_,P,E);else p(C,_,0,E)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,b,S,E){if(x(v,b,S,E)===!0){let _=v.__offset,A=v.value;if(Array.isArray(A)){let C=0;for(let P=0;P<A.length;P++){let N=A[P],k=f(N);g(N,v.__data,C),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(C+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,v.__data)}}function g(v,b,S){typeof v=="number"||typeof v=="boolean"?b[0]=v:v.isMatrix3?(b[0]=v.elements[0],b[1]=v.elements[1],b[2]=v.elements[2],b[3]=0,b[4]=v.elements[3],b[5]=v.elements[4],b[6]=v.elements[5],b[7]=0,b[8]=v.elements[6],b[9]=v.elements[7],b[10]=v.elements[8],b[11]=0):ArrayBuffer.isView(v)?b.set(new v.constructor(v.buffer,v.byteOffset,b.length)):v.toArray(b,S)}function x(v,b,S,E){let _=v.value,A=b+"_"+S;if(E[A]===void 0)return typeof _=="number"||typeof _=="boolean"?E[A]=_:ArrayBuffer.isView(_)?E[A]=_.slice():E[A]=_.clone(),!0;{let C=E[A];if(typeof _=="number"||typeof _=="boolean"){if(C!==_)return E[A]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(C.equals(_)===!1)return C.copy(_),!0}}return!1}function m(v){let b=v.uniforms,S=0,E=16;for(let A=0,C=b.length;A<C;A++){let P=Array.isArray(b[A])?b[A]:[b[A]];for(let N=0,k=P.length;N<k;N++){let I=P[N],z=Array.isArray(I.value)?I.value:[I.value];for(let q=0,Y=z.length;q<Y;q++){let st=z[q],Z=f(st),Q=S%E,$=Q%Z.boundary,_t=Q+$;S+=$,_t!==0&&E-_t<Z.storage&&(S+=E-_t),I.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=S,S+=Z.storage}}}let _=S%E;return _>0&&(S+=E-_),v.__size=S,v.__cache={},this}function f(v){let b={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(b.boundary=4,b.storage=4):v.isVector2?(b.boundary=8,b.storage=8):v.isVector3||v.isColor?(b.boundary=16,b.storage=12):v.isVector4?(b.boundary=16,b.storage=16):v.isMatrix3?(b.boundary=48,b.storage=48):v.isMatrix4?(b.boundary=64,b.storage=64):v.isTexture?Ht("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(b.boundary=16,b.storage=v.byteLength):Ht("WebGLRenderer: Unsupported uniform value type.",v),b}function M(v){let b=v.target;b.removeEventListener("dispose",M);let S=o.indexOf(b.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function y(){for(let v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:y}}var o_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),oi=null;function a_(){return oi===null&&(oi=new ms(o_,16,16,qi,Xn),oi.name="DFG_LUT",oi.minFilter=Xe,oi.magFilter=Xe,oi.wrapS=Qn,oi.wrapT=Qn,oi.generateMipmaps=!1,oi.needsUpdate=!0),oi}var yl=class{constructor(t={}){let{canvas:e=qd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=xn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let x=p,m=new Set([Oa,Ua,Da]),f=new Set([xn,Wn,sr,rr,Ia,La]),M=new Uint32Array(4),y=new Int32Array(4),v=new L,b=null,S=null,E=[],_=[],A=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,P=!1,N=null,k=null,I=null,z=null;this._outputColorSpace=wn;let q=0,Y=0,st=null,Z=-1,Q=null,$=new Te,_t=new Te,Et=null,lt=new Qt(0),et=0,zt=e.width,G=e.height,K=1,ht=null,At=null,ct=new Te(0,0,zt,G),Ot=new Te(0,0,zt,G),fe=!1,$t=new js,qt=!1,se=!1,Lt=new re,ae=new L,Ae=new Te,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Se=!1;function Ve(){return st===null?K:1}let F=n;function tn(T,D){return e.getContext(T,D)}let _e,R,w,B,W,J,at,pt,j,nt,mt,Nt,vt,gt,Dt,Bt,jt,U,xt,tt,yt,St,rt;try{let T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Re,!1),e.addEventListener("webglcontextrestored",me,!1),e.addEventListener("webglcontextcreationerror",Fn,!1),F===null){let D="webgl2";if(F=tn(D,T),F===null)throw tn(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ut()}catch(T){throw e.removeEventListener("webglcontextlost",Re,!1),e.removeEventListener("webglcontextrestored",me,!1),e.removeEventListener("webglcontextcreationerror",Fn,!1),Gt("WebGLRenderer: "+T.message),T}function Ut(){_e=new py(F),_e.init(),yt=new t_(F,_e),R=new sy(F,_e,t,yt),w=new jv(F,_e),R.reversedDepthBuffer&&u&&w.buffers.depth.setReversed(!0),k=F.createFramebuffer(),I=F.createFramebuffer(),z=F.createFramebuffer(),B=new xy(F),W=new kv,J=new Qv(F,_e,w,W,R,yt,B),at=new fy(C),pt=new v0(F),St=new ny(F,pt),j=new my(F,pt,B,St),nt=new vy(F,j,pt,St,B),U=new yy(F,R,J),Dt=new ry(W),mt=new Fv(C,at,_e,R,St,Dt),Nt=new s_(C,W),vt=new Bv,gt=new $v(_e),jt=new ey(C,at,w,nt,g,l),Bt=new Jv(C,nt,R),rt=new r_(F,B,R,w),xt=new iy(F,_e,B),tt=new gy(F,_e,B),B.programs=mt.programs,C.capabilities=R,C.extensions=_e,C.properties=W,C.renderLists=vt,C.shadowMap=Bt,C.state=w,C.info=B}x!==xn&&(A=new by(x,e.width,e.height,a,s,r));let Pt=new qh(C,F);this.xr=Pt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let T=_e.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=_e.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(T){T!==void 0&&(K=T,this.setSize(zt,G,!1))},this.getSize=function(T){return T.set(zt,G)},this.setSize=function(T,D,X=!0){if(Pt.isPresenting){Ht("WebGLRenderer: Can't change size while VR device is presenting.");return}zt=T,G=D,e.width=Math.floor(T*K),e.height=Math.floor(D*K),X===!0&&(e.style.width=T+"px",e.style.height=D+"px"),A!==null&&A.setSize(e.width,e.height),this.setViewport(0,0,T,D)},this.getDrawingBufferSize=function(T){return T.set(zt*K,G*K).floor()},this.setDrawingBufferSize=function(T,D,X){zt=T,G=D,K=X,e.width=Math.floor(T*X),e.height=Math.floor(D*X),this.setViewport(0,0,T,D)},this.setEffects=function(T){if(x===xn){Gt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let D=0;D<T.length;D++)if(T[D].isOutputPass===!0){Ht("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy($)},this.getViewport=function(T){return T.copy(ct)},this.setViewport=function(T,D,X,H){T.isVector4?ct.set(T.x,T.y,T.z,T.w):ct.set(T,D,X,H),w.viewport($.copy(ct).multiplyScalar(K).round())},this.getScissor=function(T){return T.copy(Ot)},this.setScissor=function(T,D,X,H){T.isVector4?Ot.set(T.x,T.y,T.z,T.w):Ot.set(T,D,X,H),w.scissor(_t.copy(Ot).multiplyScalar(K).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(T){w.setScissorTest(fe=T)},this.setOpaqueSort=function(T){ht=T},this.setTransparentSort=function(T){At=T},this.getClearColor=function(T){return T.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor(...arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha(...arguments)},this.clear=function(T=!0,D=!0,X=!0){let H=0;if(T){let V=!1;if(st!==null){let Mt=st.texture.format;V=m.has(Mt)}if(V){let Mt=st.texture.type,Tt=f.has(Mt),bt=jt.getClearColor(),Rt=jt.getClearAlpha(),It=bt.r,ee=bt.g,le=bt.b;Tt?(M[0]=It,M[1]=ee,M[2]=le,M[3]=Rt,F.clearBufferuiv(F.COLOR,0,M)):(y[0]=It,y[1]=ee,y[2]=le,y[3]=Rt,F.clearBufferiv(F.COLOR,0,y))}else H|=F.COLOR_BUFFER_BIT}D&&(H|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&F.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),N=T},this.dispose=function(){e.removeEventListener("webglcontextlost",Re,!1),e.removeEventListener("webglcontextrestored",me,!1),e.removeEventListener("webglcontextcreationerror",Fn,!1),jt.dispose(),vt.dispose(),gt.dispose(),W.dispose(),at.dispose(),nt.dispose(),St.dispose(),rt.dispose(),mt.dispose(),Pt.dispose(),Pt.removeEventListener("sessionstart",Nu),Pt.removeEventListener("sessionend",Du),os.stop()};function Re(T){T.preventDefault(),Mh("WebGLRenderer: Context Lost."),P=!0}function me(){Mh("WebGLRenderer: Context Restored."),P=!1;let T=B.autoReset,D=Bt.enabled,X=Bt.autoUpdate,H=Bt.needsUpdate,V=Bt.type;Ut(),B.autoReset=T,Bt.enabled=D,Bt.autoUpdate=X,Bt.needsUpdate=H,Bt.type=V}function Fn(T){Gt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Zn(T){let D=T.target;D.removeEventListener("dispose",Zn),fm(D)}function fm(T){pm(T),W.remove(T)}function pm(T){let D=W.get(T).programs;D!==void 0&&(D.forEach(function(X){mt.releaseProgram(X)}),T.isShaderMaterial&&mt.releaseShaderCache(T))}this.renderBufferDirect=function(T,D,X,H,V,Mt){D===null&&(D=Ke);let Tt=V.isMesh&&V.matrixWorld.determinantAffine()<0,bt=xm(T,D,X,H,V);w.setMaterial(H,Tt);let Rt=X.index,It=1;if(H.wireframe===!0){if(Rt=j.getWireframeAttribute(X),Rt===void 0)return;It=2}let ee=X.drawRange,le=X.attributes.position,Ct=ee.start*It,ge=(ee.start+ee.count)*It;Mt!==null&&(Ct=Math.max(Ct,Mt.start*It),ge=Math.min(ge,(Mt.start+Mt.count)*It)),Rt!==null?(Ct=Math.max(Ct,0),ge=Math.min(ge,Rt.count)):le!=null&&(Ct=Math.max(Ct,0),ge=Math.min(ge,le.count));let Ge=ge-Ct;if(Ge<0||Ge===1/0)return;St.setup(V,H,bt,X,Rt);let Pe,we=xt;if(Rt!==null&&(Pe=pt.get(Rt),we=tt,we.setIndex(Pe)),V.isMesh)H.wireframe===!0?(w.setLineWidth(H.wireframeLinewidth*Ve()),we.setMode(F.LINES)):we.setMode(F.TRIANGLES);else if(V.isLine){let en=H.linewidth;en===void 0&&(en=1),w.setLineWidth(en*Ve()),V.isLineSegments?we.setMode(F.LINES):V.isLineLoop?we.setMode(F.LINE_LOOP):we.setMode(F.LINE_STRIP)}else V.isPoints?we.setMode(F.POINTS):V.isSprite&&we.setMode(F.TRIANGLES);if(V.isBatchedMesh)if(_e.get("WEBGL_multi_draw"))we.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let en=V._multiDrawStarts,wt=V._multiDrawCounts,cn=V._multiDrawCount,de=Rt?pt.get(Rt).bytesPerElement:1,In=W.get(H).currentProgram.getUniforms();for(let Jn=0;Jn<cn;Jn++)In.setValue(F,"_gl_DrawID",Jn),we.render(en[Jn]/de,wt[Jn])}else if(V.isInstancedMesh)we.renderInstances(Ct,Ge,V.count);else if(X.isInstancedBufferGeometry){let en=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,wt=Math.min(X.instanceCount,en);we.renderInstances(Ct,Ge,wt)}else we.render(Ct,Ge)};function Lu(T,D,X,H){N!==null&&T.isNodeMaterial&&N.setObject(H,T),qt===!0&&Dt.setState(T,X,!1),T.transparent===!0&&T.side===Nn&&T.forceSinglePass===!1?(T.side=je,T.needsUpdate=!0,Eo(T,D,H),T.side=si,T.needsUpdate=!0,Eo(T,D,H),T.side=Nn):Eo(T,D,H)}this.compile=function(T,D,X=null){X===null&&(X=T),N!==null&&N.renderStart(T,D,X),S=gt.get(X),S.init(D),_.push(S),X.traverseVisible(function(V){V.isLight&&V.layers.test(D.layers)&&(S.pushLight(V),V.castShadow&&S.pushShadow(V))}),T!==X&&T.traverseVisible(function(V){V.isLight&&V.layers.test(D.layers)&&(S.pushLight(V),V.castShadow&&S.pushShadow(V))}),S.setupLights(),N!==null&&N.updateLights(S.state.lightsArray),se=this.localClippingEnabled,qt=Dt.init(this.clippingPlanes,se),qt===!0&&Dt.setGlobalState(this.clippingPlanes,D),N!==null&&Bt.render(S.state.shadowsArray,X,D);let H=new Set;return T.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let Mt=V.material;if(Mt)if(Array.isArray(Mt))for(let Tt=0;Tt<Mt.length;Tt++){let bt=Mt[Tt];Lu(bt,X,D,V),H.add(bt)}else Lu(Mt,X,D,V),H.add(Mt)}),S=_.pop(),N!==null&&N.renderEnd(),H},this.compileAsync=function(T,D,X=null){let H=this.compile(T,D,X);return new Promise(V=>{function Mt(){if(H.forEach(function(Tt){let Rt=W.get(Tt).currentProgram;(Rt===void 0||Rt.isReady())&&H.delete(Tt)}),H.size===0){V(T);return}setTimeout(Mt,10)}_e.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let bc=null;function mm(T){bc&&bc(T)}function Nu(){os.stop()}function Du(){os.start()}let os=new Mf;os.setAnimationLoop(mm),typeof self<"u"&&os.setContext(self),this.setAnimationLoop=function(T){bc=T,Pt.setAnimationLoop(T),T===null?os.stop():os.start()},Pt.addEventListener("sessionstart",Nu),Pt.addEventListener("sessionend",Du),this.render=function(T,D){if(D!==void 0&&D.isCamera!==!0){Gt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;N!==null&&N.renderStart(T,D);let X=Pt.enabled===!0&&Pt.isPresenting===!0,H=A!==null&&(st===null||X)&&A.begin(C,st);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Pt.enabled===!0&&Pt.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Pt.cameraAutoUpdate===!0&&Pt.updateCamera(D),D=Pt.getCamera()),T.isScene===!0&&T.onBeforeRender(C,T,D,st),S=gt.get(T,_.length),S.init(D),S.state.textureUnits=J.getTextureUnits(),_.push(S),Lt.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),$t.setFromProjectionMatrix(Lt,Vn,D.reversedDepth),se=this.localClippingEnabled,qt=Dt.init(this.clippingPlanes,se),b=vt.get(T,E.length),b.init(),E.push(b),Pt.enabled===!0&&Pt.isPresenting===!0){let Tt=C.xr.getDepthSensingMesh();Tt!==null&&Mc(Tt,D,-1/0,C.sortObjects)}Mc(T,D,0,C.sortObjects),b.finish(),N!==null&&N.updateLights(S.state.lightsArray),C.sortObjects===!0&&b.sort(ht,At),Se=Pt.enabled===!1||Pt.isPresenting===!1||Pt.hasDepthSensing()===!1,Se&&jt.addToRenderList(b,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),qt===!0&&Dt.beginShadows();let V=S.state.shadowsArray;if(Bt.render(V,T,D),qt===!0&&Dt.endShadows(),(H&&A.hasRenderPass())===!1){let Tt=b.opaque,bt=b.transmissive;if(S.setupLights(),D.isArrayCamera){let Rt=D.cameras;if(bt.length>0)for(let It=0,ee=Rt.length;It<ee;It++){let le=Rt[It];Ou(Tt,bt,T,le)}Se&&jt.render(T);for(let It=0,ee=Rt.length;It<ee;It++){let le=Rt[It];Uu(b,T,le,le.viewport)}}else bt.length>0&&Ou(Tt,bt,T,D),Se&&jt.render(T),Uu(b,T,D)}st!==null&&Y===0&&(J.updateMultisampleRenderTarget(st),J.updateRenderTargetMipmap(st)),H&&A.end(C),T.isScene===!0&&T.onAfterRender(C,T,D),St.resetDefaultState(),Z=-1,Q=null,_.pop(),_.length>0?(S=_[_.length-1],J.setTextureUnits(S.state.textureUnits),qt===!0&&Dt.setGlobalState(C.clippingPlanes,S.state.camera)):S=null,E.pop(),E.length>0?b=E[E.length-1]:b=null,N!==null&&N.renderEnd()};function Mc(T,D,X,H){if(T.visible===!1)return;if(T.layers.test(D.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(D);else if(T.isLightProbeGrid)S.pushLightProbeGrid(T);else if(T.isLight)S.pushLight(T),T.castShadow&&S.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum($t)){H&&Ae.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Lt);let Tt=nt.update(T),bt=T.material;bt.visible&&b.push(T,Tt,bt,X,Ae.z,null,D)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum($t))){let Tt=nt.update(T),bt=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ae.copy(T.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),Ae.copy(Tt.boundingSphere.center)),Ae.applyMatrix4(T.matrixWorld).applyMatrix4(Lt)),Array.isArray(bt)){let Rt=Tt.groups;for(let It=0,ee=Rt.length;It<ee;It++){let le=Rt[It],Ct=bt[le.materialIndex];Ct&&Ct.visible&&b.push(T,Tt,Ct,X,Ae.z,le,D)}}else bt.visible&&b.push(T,Tt,bt,X,Ae.z,null,D)}}let Mt=T.children;for(let Tt=0,bt=Mt.length;Tt<bt;Tt++)Mc(Mt[Tt],D,X,H)}function Uu(T,D,X,H){let{opaque:V,transmissive:Mt,transparent:Tt}=T;S.setupLightsView(X),qt===!0&&Dt.setGlobalState(C.clippingPlanes,X),H&&w.viewport($.copy(H)),V.length>0&&To(V,D,X),Mt.length>0&&To(Mt,D,X),Tt.length>0&&To(Tt,D,X),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function Ou(T,D,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[H.id]===void 0){let Ct=_e.has("EXT_color_buffer_half_float")||_e.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[H.id]=new on(1,1,{generateMipmaps:!0,type:Ct?Xn:xn,minFilter:Xi,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:oe.workingColorSpace})}let Mt=S.state.transmissionRenderTarget[H.id],Tt=H.viewport||$;Mt.setSize(Tt.z*C.transmissionResolutionScale,Tt.w*C.transmissionResolutionScale);let bt=C.getRenderTarget(),Rt=C.getActiveCubeFace(),It=C.getActiveMipmapLevel();C.setRenderTarget(Mt),C.getClearColor(lt),et=C.getClearAlpha(),et<1&&C.setClearColor(16777215,.5),C.clear(),Se&&jt.render(X);let ee=C.toneMapping;C.toneMapping=Gn;let le=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),S.setupLightsView(H),qt===!0&&Dt.setGlobalState(C.clippingPlanes,H),To(T,X,H),J.updateMultisampleRenderTarget(Mt),J.updateRenderTargetMipmap(Mt),_e.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let ge=0,Ge=D.length;ge<Ge;ge++){let Pe=D[ge],{object:we,geometry:en,material:wt,group:cn}=Pe;if(wt.side===Nn&&we.layers.test(H.layers)){let de=wt.side;wt.side=je,wt.needsUpdate=!0,Fu(we,X,H,en,wt,cn),wt.side=de,wt.needsUpdate=!0,Ct=!0}}Ct===!0&&(J.updateMultisampleRenderTarget(Mt),J.updateRenderTargetMipmap(Mt))}C.setRenderTarget(bt,Rt,It),C.setClearColor(lt,et),le!==void 0&&(H.viewport=le),C.toneMapping=ee}function To(T,D,X){let H=D.isScene===!0?D.overrideMaterial:null;for(let V=0,Mt=T.length;V<Mt;V++){let Tt=T[V],{object:bt,geometry:Rt,group:It}=Tt,ee=Tt.material;ee.allowOverride===!0&&H!==null&&(ee=H),bt.layers.test(X.layers)&&Fu(bt,D,X,Rt,ee,It)}}function Fu(T,D,X,H,V,Mt){N!==null&&V.isNodeMaterial&&N.setObject(T,V),T.onBeforeRender(C,D,X,H,V,Mt),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),V.onBeforeRender(C,D,X,H,T,Mt),V.transparent===!0&&V.side===Nn&&V.forceSinglePass===!1?(V.side=je,V.needsUpdate=!0,C.renderBufferDirect(X,D,H,V,T,Mt),V.side=si,V.needsUpdate=!0,C.renderBufferDirect(X,D,H,V,T,Mt),V.side=Nn):C.renderBufferDirect(X,D,H,V,T,Mt),T.onAfterRender(C,D,X,H,V,Mt)}function Eo(T,D,X){D.isScene!==!0&&(D=Ke);let H=W.get(T),V=S.state.lights,Mt=S.state.shadowsArray,Tt=V.state.version,bt=mt.getParameters(T,V.state,Mt,D,X,S.state.lightProbeGridArray),Rt=mt.getProgramCacheKey(bt),It=H.programs;H.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?D.environment:null,H.fog=D.fog;let ee=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;H.envMap=at.get(T.envMap||H.environment,ee),H.envMapRotation=H.environment!==null&&T.envMap===null?D.environmentRotation:T.envMapRotation,It===void 0&&(T.addEventListener("dispose",Zn),It=new Map,H.programs=It);let le=It.get(Rt);if(le!==void 0){if(H.currentProgram===le&&H.lightsStateVersion===Tt)return zu(T,bt),le}else bt.uniforms=mt.getUniforms(T),N!==null&&T.isNodeMaterial&&N.build(T,X,bt),T.onBeforeCompile(bt,C),le=mt.acquireProgram(bt,Rt),It.set(Rt,le),H.uniforms=bt.uniforms;let Ct=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ct.clippingPlanes=Dt.uniform),zu(T,bt),H.needsLights=vm(T),H.lightsStateVersion=Tt,H.needsLights&&(Ct.ambientLightColor.value=V.state.ambient,Ct.lightProbe.value=V.state.probe,Ct.sunLights.value=V.state.sun,Ct.sunLightShadows.value=V.state.sunShadow,Ct.directionalLights.value=V.state.directional,Ct.directionalLightShadows.value=V.state.directionalShadow,Ct.spotLights.value=V.state.spot,Ct.spotLightShadows.value=V.state.spotShadow,Ct.rectAreaLights.value=V.state.rectArea,Ct.ltc_1.value=V.state.rectAreaLTC1,Ct.ltc_2.value=V.state.rectAreaLTC2,Ct.pointLights.value=V.state.point,Ct.pointLightShadows.value=V.state.pointShadow,Ct.hemisphereLights.value=V.state.hemi,Ct.sunShadowMatrix.value=V.state.sunShadowMatrix,Ct.sunShadowCascade.value=V.state.sunShadowCascade,Ct.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ct.spotLightMatrix.value=V.state.spotLightMatrix,Ct.spotLightMap.value=V.state.spotLightMap,Ct.pointShadowMatrix.value=V.state.pointShadowMatrix),H.lightProbeGrid=S.state.lightProbeGridArray.length>0,H.currentProgram=le,H.uniformsList=null,le}function ku(T){if(T.uniformsList===null){let D=T.currentProgram.getUniforms();T.uniformsList=cr.seqWithValue(D.seq,T.uniforms)}return T.uniformsList}function zu(T,D){let X=W.get(T);X.outputColorSpace=D.outputColorSpace,X.batching=D.batching,X.batchingColor=D.batchingColor,X.instancing=D.instancing,X.instancingColor=D.instancingColor,X.instancingMorph=D.instancingMorph,X.skinning=D.skinning,X.morphTargets=D.morphTargets,X.morphNormals=D.morphNormals,X.morphColors=D.morphColors,X.morphTargetsCount=D.morphTargetsCount,X.numClippingPlanes=D.numClippingPlanes,X.numIntersection=D.numClipIntersection,X.vertexAlphas=D.vertexAlphas,X.vertexTangents=D.vertexTangents,X.toneMapping=D.toneMapping}function gm(T,D){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;v.setFromMatrixPosition(D.matrixWorld);for(let X=0,H=T.length;X<H;X++){let V=T[X];if(V.texture!==null&&V.boundingBox.containsPoint(v))return V}return null}function xm(T,D,X,H,V){D.isScene!==!0&&(D=Ke),J.resetTextureUnits();let Mt=D.fog,Tt=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?D.environment:null,bt=st===null?C.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:oe.workingColorSpace,Rt=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,It=at.get(H.envMap||Tt,Rt),ee=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,le=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ct=!!X.morphAttributes.position,ge=!!X.morphAttributes.normal,Ge=!!X.morphAttributes.color,Pe=Gn;H.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Pe=C.toneMapping);let we=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,en=we!==void 0?we.length:0,wt=W.get(H),cn=S.state.lights;if(qt===!0&&(se===!0||T!==Q)){let Ce=T===Q&&H.id===Z;Dt.setState(H,T,Ce)}let de=!1;H.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==cn.state.version||wt.outputColorSpace!==bt||V.isBatchedMesh&&wt.batching===!1||!V.isBatchedMesh&&wt.batching===!0||V.isBatchedMesh&&wt.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&wt.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&wt.instancing===!1||!V.isInstancedMesh&&wt.instancing===!0||V.isSkinnedMesh&&wt.skinning===!1||!V.isSkinnedMesh&&wt.skinning===!0||V.isInstancedMesh&&wt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&wt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&wt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&wt.instancingMorph===!1&&V.morphTexture!==null||wt.envMap!==It||H.fog===!0&&wt.fog!==Mt||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==Dt.numPlanes||wt.numIntersection!==Dt.numIntersection)||wt.vertexAlphas!==ee||wt.vertexTangents!==le||wt.morphTargets!==Ct||wt.morphNormals!==ge||wt.morphColors!==Ge||wt.toneMapping!==Pe||wt.morphTargetsCount!==en||!!wt.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(de=!0):(de=!0,wt.__version=H.version);let In=wt.currentProgram;de===!0&&(In=Eo(H,D,V),N&&H.isNodeMaterial&&N.onUpdateProgram(H,In,wt));let Jn=!1,Ai=!1,Es=!1,be=In.getUniforms(),ke=wt.uniforms;if(w.useProgram(In.program)&&(Jn=!0,Ai=!0,Es=!0),H.id!==Z&&(Z=H.id,Ai=!0),wt.needsLights){let Ce=gm(S.state.lightProbeGridArray,V);wt.lightProbeGrid!==Ce&&(wt.lightProbeGrid=Ce,Ai=!0)}if(Jn||Q!==T){w.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),be.setValue(F,"projectionMatrix",T.projectionMatrix),be.setValue(F,"viewMatrix",T.matrixWorldInverse);let Ci=be.map.cameraPosition;Ci!==void 0&&Ci.setValue(F,ae.setFromMatrixPosition(T.matrixWorld)),R.logarithmicDepthBuffer&&be.setValue(F,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&be.setValue(F,"isOrthographic",T.isOrthographicCamera===!0),Q!==T&&(Q=T,Ai=!0,Es=!0)}if(wt.needsLights&&(cn.state.sunShadowMap.length>0&&be.setValue(F,"sunShadowMap",cn.state.sunShadowMap,J),cn.state.directionalShadowMap.length>0&&be.setValue(F,"directionalShadowMap",cn.state.directionalShadowMap,J),cn.state.spotShadowMap.length>0&&be.setValue(F,"spotShadowMap",cn.state.spotShadowMap,J),cn.state.pointShadowMap.length>0&&be.setValue(F,"pointShadowMap",cn.state.pointShadowMap,J)),V.isSkinnedMesh){be.setOptional(F,V,"bindMatrix"),be.setOptional(F,V,"bindMatrixInverse");let Ce=V.skeleton;Ce&&(Ce.boneTexture===null&&Ce.computeBoneTexture(),be.setValue(F,"boneTexture",Ce.boneTexture,J))}V.isBatchedMesh&&(be.setOptional(F,V,"batchingTexture"),be.setValue(F,"batchingTexture",V._matricesTexture,J),be.setOptional(F,V,"batchingIdTexture"),be.setValue(F,"batchingIdTexture",V._indirectTexture,J),be.setOptional(F,V,"batchingColorTexture"),V._colorsTexture!==null&&be.setValue(F,"batchingColorTexture",V._colorsTexture,J));let Ri=X.morphAttributes;if((Ri.position!==void 0||Ri.normal!==void 0||Ri.color!==void 0)&&U.update(V,X,In),(Ai||wt.receiveShadow!==V.receiveShadow)&&(wt.receiveShadow=V.receiveShadow,be.setValue(F,"receiveShadow",V.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&D.environment!==null&&(ke.envMapIntensity.value=D.environmentIntensity),ke.dfgLUT!==void 0&&(ke.dfgLUT.value=a_()),Ai){if(be.setValue(F,"toneMappingExposure",C.toneMappingExposure),wt.needsLights&&ym(ke,Es),Mt&&H.fog===!0&&Nt.refreshFogUniforms(ke,Mt),Nt.refreshMaterialUniforms(ke,H,K,G,S.state.transmissionRenderTarget[T.id]),wt.needsLights&&wt.lightProbeGrid){let Ce=wt.lightProbeGrid;ke.probesSH.value=Ce.texture,ke.probesMin.value.copy(Ce.boundingBox.min),ke.probesMax.value.copy(Ce.boundingBox.max),ke.probesResolution.value.copy(Ce.resolution)}cr.upload(F,ku(wt),ke,J)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(cr.upload(F,ku(wt),ke,J),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&be.setValue(F,"center",V.center),be.setValue(F,"modelViewMatrix",V.modelViewMatrix),be.setValue(F,"normalMatrix",V.normalMatrix),be.setValue(F,"modelMatrix",V.matrixWorld),H.uniformsGroups!==void 0){let Ce=H.uniformsGroups;for(let Ci=0,As=Ce.length;Ci<As;Ci++){let Hu=Ce[Ci];rt.update(Hu,In),rt.bind(Hu,In)}}return In}function ym(T,D){T.ambientLightColor.needsUpdate=D,T.lightProbe.needsUpdate=D,T.sunLights.needsUpdate=D,T.sunLightShadows.needsUpdate=D,T.directionalLights.needsUpdate=D,T.directionalLightShadows.needsUpdate=D,T.pointLights.needsUpdate=D,T.pointLightShadows.needsUpdate=D,T.spotLights.needsUpdate=D,T.spotLightShadows.needsUpdate=D,T.rectAreaLights.needsUpdate=D,T.hemisphereLights.needsUpdate=D}function vm(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return st},this.setRenderTargetTextures=function(T,D,X){let H=W.get(T);H.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),W.get(T.texture).__webglTexture=D,W.get(T.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,D){let X=W.get(T);X.__webglFramebuffer=D,X.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(T,D=0,X=0){st=T,q=D,Y=X;let H=null,V=!1,Mt=!1;if(T){let bt=W.get(T);if(bt.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(F.FRAMEBUFFER,bt.__webglFramebuffer),$.copy(T.viewport),_t.copy(T.scissor),Et=T.scissorTest,w.viewport($),w.scissor(_t),w.setScissorTest(Et),Z=-1;return}else if(bt.__webglFramebuffer===void 0)J.setupRenderTarget(T);else if(bt.__hasExternalTextures)J.rebindTextures(T,W.get(T.texture).__webglTexture,W.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let ee=T.depthTexture;if(bt.__boundDepthTexture!==ee){if(ee!==null&&W.has(ee)&&(T.width!==ee.image.width||T.height!==ee.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(T)}}let Rt=T.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(Mt=!0);let It=W.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(It[D])?H=It[D][X]:H=It[D],V=!0):T.samples>0&&J.useMultisampledRTT(T)===!1?H=W.get(T).__webglMultisampledFramebuffer:Array.isArray(It)?H=It[X]:H=It,$.copy(T.viewport),_t.copy(T.scissor),Et=T.scissorTest}else $.copy(ct).multiplyScalar(K).floor(),_t.copy(Ot).multiplyScalar(K).floor(),Et=fe;if(X!==0&&(H=k),w.bindFramebuffer(F.FRAMEBUFFER,H)&&w.drawBuffers(T,H),w.viewport($),w.scissor(_t),w.setScissorTest(Et),V){let bt=W.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+D,bt.__webglTexture,X)}else if(Mt){let bt=D;for(let Rt=0;Rt<T.textures.length;Rt++){let It=W.get(T.textures[Rt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Rt,It.__webglTexture,X,bt)}}else if(T!==null&&X!==0){let bt=W.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,bt.__webglTexture,X)}Z=-1};function Bu(T){let D=W.get(T);return(D.__readFormat!==T.format||D.__readType!==T.type)&&(D.__readFormat=T.format,D.__readType=T.type,D.__formatReadable=R.textureFormatReadable(T.format),D.__typeReadable=R.textureTypeReadable(T.type)),D}this.readRenderTargetPixels=function(T,D,X,H,V,Mt,Tt,bt=0){if(!(T&&T.isWebGLRenderTarget)){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=W.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt){w.bindFramebuffer(F.FRAMEBUFFER,Rt);try{let It=T.textures[bt],ee=It.format,le=It.type;T.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+bt);let Ct=Bu(It);if(Ct.__formatReadable===!1){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ct.__typeReadable===!1){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=T.width-H&&X>=0&&X<=T.height-V&&F.readPixels(D,X,H,V,yt.convert(ee),yt.convert(le),Mt)}finally{let It=st!==null?W.get(st).__webglFramebuffer:null;w.bindFramebuffer(F.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(T,D,X,H,V,Mt,Tt,bt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=W.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt)if(D>=0&&D<=T.width-H&&X>=0&&X<=T.height-V){w.bindFramebuffer(F.FRAMEBUFFER,Rt);let It=T.textures[bt],ee=It.format,le=It.type;T.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+bt);let Ct=Bu(It);if(Ct.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ct.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ge=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,ge),F.bufferData(F.PIXEL_PACK_BUFFER,Mt.byteLength,F.STREAM_READ),F.readPixels(D,X,H,V,yt.convert(ee),yt.convert(le),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Ge=st!==null?W.get(st).__webglFramebuffer:null;w.bindFramebuffer(F.FRAMEBUFFER,Ge);let Pe=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Kd(F,Pe,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,ge),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Mt),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(ge),F.deleteSync(Pe),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,D=null,X=0){let H=Math.pow(2,-X),V=Math.floor(T.image.width*H),Mt=Math.floor(T.image.height*H),Tt=D!==null?D.x:0,bt=D!==null?D.y:0;J.setTexture2D(T,0),F.copyTexSubImage2D(F.TEXTURE_2D,X,0,0,Tt,bt,V,Mt),w.unbindTexture()},this.copyTextureToTexture=function(T,D,X=null,H=null,V=0,Mt=0){let Tt,bt,Rt,It,ee,le,Ct,ge,Ge,Pe=T.isCompressedTexture?T.mipmaps[Mt]:T.image;if(X!==null)Tt=X.max.x-X.min.x,bt=X.max.y-X.min.y,Rt=X.isBox3?X.max.z-X.min.z:1,It=X.min.x,ee=X.min.y,le=X.isBox3?X.min.z:0;else{let ke=Math.pow(2,-V);Tt=Math.floor(Pe.width*ke),bt=Math.floor(Pe.height*ke),T.isDataArrayTexture?Rt=Pe.depth:T.isData3DTexture?Rt=Math.floor(Pe.depth*ke):Rt=1,It=0,ee=0,le=0}H!==null?(Ct=H.x,ge=H.y,Ge=H.z):(Ct=0,ge=0,Ge=0);let we=yt.convert(D.format),en=yt.convert(D.type),wt;D.isData3DTexture?(J.setTexture3D(D,0),wt=F.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(J.setTexture2DArray(D,0),wt=F.TEXTURE_2D_ARRAY):(J.setTexture2D(D,0),wt=F.TEXTURE_2D),w.activeTexture(F.TEXTURE0),w.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,D.flipY),w.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),w.pixelStorei(F.UNPACK_ALIGNMENT,D.unpackAlignment);let cn=w.getParameter(F.UNPACK_ROW_LENGTH),de=w.getParameter(F.UNPACK_IMAGE_HEIGHT),In=w.getParameter(F.UNPACK_SKIP_PIXELS),Jn=w.getParameter(F.UNPACK_SKIP_ROWS),Ai=w.getParameter(F.UNPACK_SKIP_IMAGES);w.pixelStorei(F.UNPACK_ROW_LENGTH,Pe.width),w.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Pe.height),w.pixelStorei(F.UNPACK_SKIP_PIXELS,It),w.pixelStorei(F.UNPACK_SKIP_ROWS,ee),w.pixelStorei(F.UNPACK_SKIP_IMAGES,le);let Es=T.isDataArrayTexture||T.isData3DTexture,be=D.isDataArrayTexture||D.isData3DTexture;if(T.isDepthTexture){let ke=W.get(T),Ri=W.get(D),Ce=W.get(ke.__renderTarget),Ci=W.get(Ri.__renderTarget);w.bindFramebuffer(F.READ_FRAMEBUFFER,Ce.__webglFramebuffer),w.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ci.__webglFramebuffer);for(let As=0;As<Rt;As++)Es&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,W.get(T).__webglTexture,V,le+As),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,W.get(D).__webglTexture,Mt,Ge+As)),F.blitFramebuffer(It,ee,Tt,bt,Ct,ge,Tt,bt,F.DEPTH_BUFFER_BIT,F.NEAREST);w.bindFramebuffer(F.READ_FRAMEBUFFER,null),w.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(V!==0||T.isRenderTargetTexture||W.has(T)){let ke=W.get(T),Ri=W.get(D);w.bindFramebuffer(F.READ_FRAMEBUFFER,I),w.bindFramebuffer(F.DRAW_FRAMEBUFFER,z);for(let Ce=0;Ce<Rt;Ce++)Es?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ke.__webglTexture,V,le+Ce):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ke.__webglTexture,V),be?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ri.__webglTexture,Mt,Ge+Ce):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ri.__webglTexture,Mt),V!==0?F.blitFramebuffer(It,ee,Tt,bt,Ct,ge,Tt,bt,F.COLOR_BUFFER_BIT,F.NEAREST):be?F.copyTexSubImage3D(wt,Mt,Ct,ge,Ge+Ce,It,ee,Tt,bt):F.copyTexSubImage2D(wt,Mt,Ct,ge,It,ee,Tt,bt);w.bindFramebuffer(F.READ_FRAMEBUFFER,null),w.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else be?T.isDataTexture||T.isData3DTexture?F.texSubImage3D(wt,Mt,Ct,ge,Ge,Tt,bt,Rt,we,en,Pe.data):D.isCompressedArrayTexture?F.compressedTexSubImage3D(wt,Mt,Ct,ge,Ge,Tt,bt,Rt,we,Pe.data):F.texSubImage3D(wt,Mt,Ct,ge,Ge,Tt,bt,Rt,we,en,Pe):T.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Mt,Ct,ge,Tt,bt,we,en,Pe.data):T.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Mt,Ct,ge,Pe.width,Pe.height,we,Pe.data):F.texSubImage2D(F.TEXTURE_2D,Mt,Ct,ge,Tt,bt,we,en,Pe);w.pixelStorei(F.UNPACK_ROW_LENGTH,cn),w.pixelStorei(F.UNPACK_IMAGE_HEIGHT,de),w.pixelStorei(F.UNPACK_SKIP_PIXELS,In),w.pixelStorei(F.UNPACK_SKIP_ROWS,Jn),w.pixelStorei(F.UNPACK_SKIP_IMAGES,Ai),Mt===0&&D.generateMipmaps&&F.generateMipmap(wt),w.unbindTexture()},this.initRenderTarget=function(T){W.get(T).__webglFramebuffer===void 0&&J.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?J.setTextureCube(T,0):T.isData3DTexture?J.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?J.setTexture2DArray(T,0):J.setTexture2D(T,0),w.unbindTexture()},this.resetState=function(){q=0,Y=0,st=null,w.reset(),St.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}};var O={PITCH_A:1,PITCH_B:2,LINES:3,SURROUND:4,TRACK:5,GOAL_FRAME:6,NET:7,STAND_A:8,STAND_B:9,STAND_C:10,ROOF:11,CONCRETE:12,METAL:13,WOOD:14,FENCE:15,HOUSE_A:16,HOUSE_B:17,ROOF_TILE:18,TREE:19,TRUNK:20,BANNER_HOME:21,BANNER_AWAY:22,BOARD_A:23,BOARD_B:24,SCREEN:25,LAMP:26,CROWD_1:27,CROWD_2:28,CROWD_3:29,CROWD_4:30,SKIN_1:31,SKIN_2:32,SKIN_3:33,SKIN_H:34,HAIR_1:35,HAIR_2:36,HAIR_H:37,BOOT:38,BOOT_H:39,SHIRT_0:40,SHORTS_0:41,SOCKS_0:42,GK_0:43,NUM_0:44,SHIRT_1:45,SHORTS_1:46,SOCKS_1:47,GK_1:48,NUM_1:49,BALL_W:50,BALL_B:51,GLOVE:52,CONE:53,TARGET:54,CLOUD:55,SKY_TOP:56,SKY_BOTTOM:57,GOLD:58,EYE:59,GKX_0:60,GKX_1:61,INK:62,MARKER:63},Zh=64,Le=Array.from({length:Zh},()=>new Qt(1,1,1));function Kh(i){return new Qt(i)}var Jh={name:"classic",label:"Classic",bg:"#f2f1ea",fog:"#f2f1ea",fogNear:60,fogFar:330,ink:"#161616",lineWidth:1.2,toon:0,shadow:0,clouds:!1,blobs:!0,roles:{PITCH_A:"#d3e6c3",PITCH_B:"#c6ddb4",LINES:"#ffffff",SURROUND:"#dde9d0",TRACK:"#ebe6dc",GOAL_FRAME:"#ffffff",NET:"#8a8a8a",STAND_A:"#f6f6f2",STAND_B:"#ecebe5",STAND_C:"#e2e0d8",ROOF:"#fafaf7",CONCRETE:"#efeee8",METAL:"#e8e8e6",WOOD:"#f1ebe0",FENCE:"#dcdcdc",HOUSE_A:"#f8f6f0",HOUSE_B:"#efece4",ROOF_TILE:"#e7e2d8",TREE:"#e4ecdc",TRUNK:"#ece6dc",BOARD_A:"#fbfbf8",BOARD_B:"#efefea",SCREEN:"#f7f7f4",LAMP:"#ffffff",CROWD_3:"#efefeb",CROWD_4:"#e3e2dc",SKIN_1:"#fbf6f0",SKIN_2:"#f3eadf",SKIN_3:"#e8dccd",HAIR_1:"#d9d4cc",HAIR_2:"#bdb7ae",BOOT:"#3a3a3a",BALL_W:"#ffffff",BALL_B:"#1b1b1b",GLOVE:"#f5f5f0",CONE:"#f2c9a0",TARGET:"#f0b8b0",CLOUD:"#ffffff",SKY_TOP:"#f4f3ee",SKY_BOTTOM:"#f2f1ea",GOLD:"#eadcaa",EYE:"#1b1b1b",INK:"#161616",MARKER:"#222222"},kitMix:.42,kitSat:.75,skinMix:.55},l_={name:"neo",label:"Neobrutalist",bg:"#8fe3ff",fog:"#b6efff",fogNear:110,fogFar:520,ink:"#000000",lineWidth:3,toon:1,shadow:1,clouds:!0,blobs:!1,roles:{PITCH_A:"#39c24a",PITCH_B:"#2fb041",LINES:"#ffffff",SURROUND:"#27a03a",TRACK:"#ff8a4c",GOAL_FRAME:"#ffffff",NET:"#1a1a1a",STAND_A:"#ff5c8a",STAND_B:"#ffd23f",STAND_C:"#3d9bff",ROOF:"#ffffff",CONCRETE:"#d9d2ff",METAL:"#b5b5c8",WOOD:"#ffb347",FENCE:"#7b7bff",HOUSE_A:"#ff9ecb",HOUSE_B:"#8ff0c4",ROOF_TILE:"#ff5a36",TREE:"#1fd06b",TRUNK:"#a9632e",BOARD_A:"#ffffff",BOARD_B:"#ffe45c",SCREEN:"#141414",LAMP:"#fffbe0",CROWD_3:"#ffe45c",CROWD_4:"#b48cff",SKIN_1:"#ffd8b8",SKIN_2:"#d9a27a",SKIN_3:"#9a6440",HAIR_1:"#2b1d14",HAIR_2:"#f2c14e",BOOT:"#101010",BALL_W:"#ffffff",BALL_B:"#101010",GLOVE:"#fff45c",CONE:"#ff7a1a",TARGET:"#ff3d6e",CLOUD:"#ffffff",SKY_TOP:"#1fb8ff",SKY_BOTTOM:"#c4f4ff",GOLD:"#ffc81a",EYE:"#000000",INK:"#000000",MARKER:"#ff3dcf"},kitMix:0,kitSat:1.15,skinMix:0},Ml={classic:Jh,neo:l_},bl={kits:[{shirt:"#c8102e",shorts:"#ffffff",socks:"#c8102e",gk:"#f2c500",gkx:"#222222",number:"#ffffff"},{shirt:"#1d4ed8",shorts:"#1d4ed8",socks:"#ffffff",gk:"#22c55e",gkx:"#111111",number:"#ffffff"}],human:{skin:"#e0b48c",hair:"#3b2a1e",boots:"#111111"}},Cf=Jh;function Cn(i,t,e,n){let s=Kh(i),r={};return s.getHSL(r),s.setHSL(r.h,Math.min(1,r.s*n),r.l),e>0&&s.lerp(new Qt(1,1,1),e),s}function Pf(i){let t=Ml[i]||Jh;Cf=t;for(let[e,n]of Object.entries(t.roles))Le[O[e]].set(n);return Lf(),t}function If(i,t){i&&(bl.kits=i),t&&(bl.human=t),Lf()}function Lf(){let i=Cf,t=bl.kits,e=i.kitMix,n=i.kitSat;for(let r=0;r<2;r++){let o=t[r],a=r===0?0:5;Le[O.SHIRT_0+a].copy(Cn(o.shirt,i,e,n)),Le[O.SHORTS_0+a].copy(Cn(o.shorts,i,e,n)),Le[O.SOCKS_0+a].copy(Cn(o.socks,i,e,n)),Le[O.GK_0+a].copy(Cn(o.gk,i,e,n)),Le[O.NUM_0+a].copy(Cn(o.number,i,(i.name==="classic",0),1)),Le[r===0?O.GKX_0:O.GKX_1].copy(Cn(o.gkx,i,e*.6,n))}for(let r=0;r<2;r++){let o=Le[r===0?O.SHIRT_0:O.SHIRT_1],a=o.r*.3+o.g*.59+o.b*.11;Le[r===0?O.NUM_0:O.NUM_1].set(a>.6?"#141414":"#ffffff")}Le[O.BANNER_HOME].copy(Cn(t[0].shirt,i,e*.7,n)),Le[O.BANNER_AWAY].copy(Cn(t[1].shirt,i,e*.7,n)),Le[O.CROWD_1].copy(Cn(t[0].shirt,i,i.name==="classic"?.62:0,n)),Le[O.CROWD_2].copy(Cn(t[1].shirt,i,i.name==="classic"?.62:0,n));let s=bl.human;Le[O.SKIN_H].copy(Cn(s.skin,i,i.skinMix,1)),Le[O.HAIR_H].copy(Cn(s.hair,i,i.skinMix*.8,1)),Le[O.BOOT_H].copy(Cn(s.boots,i,i.name==="classic"?.15:0,1))}function Yh(i,t){let e=Kh(i),n=Kh(t);return Math.hypot(e.r-n.r,e.g-n.g,e.b-n.b)}function lo(i,t){let e={shirt:i.colors[0],shorts:i.colors[2]||i.colors[1],socks:i.colors[0],number:i.colors[1]},n={shirt:t.colors[0],shorts:t.colors[2]||t.colors[1],socks:t.colors[0],number:t.colors[1]};Yh(e.shirt,n.shirt)<.55&&(n={shirt:t.colors[1],shorts:t.colors[0],socks:t.colors[1],number:t.colors[0]},Yh(e.shirt,n.shirt)<.55&&(n={shirt:"#f4f4f4",shorts:"#222222",socks:"#f4f4f4",number:"#111111"}));let s=["#f2c500","#22c55e","#9333ea","#f97316","#0ea5e9","#ec4899","#111827"],r=o=>{let a=s[0],l=-1;for(let c of s){let h=Math.min(...o.map(d=>Yh(c,d)));h>l&&(l=h,a=c)}return a};return e.gk=r([e.shirt,n.shirt]),n.gk=r([e.shirt,n.shirt,e.gk]),e.gkx="#1f1f1f",n.gkx="#1f1f1f",[e,n]}var Wt={uPalette:{value:Le},uLightDir:{value:new L(-.45,.8,.38).normalize()},uToon:{value:0},uShadowAmt:{value:0},uLineWidth:{value:1.2},uMinWidth:{value:1},uTaper:{value:22},uResolution:{value:new Zt(1280,720)},uTime:{value:0},uCrowd:{value:0},uParts:{value:null},uAtlas:{value:null},uNetA:{value:new Te(0,0,0,0)},uNetDA:{value:new L(1,0,0)},uNetB:{value:new Te(0,0,0,0)},uNetDB:{value:new L(-1,0,0)}},jh=`
uniform highp sampler2D uParts;
mat4 partMatrix(float idx) {
  int row = int(idx + 0.5);
  return mat4(texelFetch(uParts, ivec2(0, row), 0), texelFetch(uParts, ivec2(1, row), 0),
              texelFetch(uParts, ivec2(2, row), 0), texelFetch(uParts, ivec2(3, row), 0));
}
`,Nf=`
uniform float uTime;
uniform float uCrowd;
float crowdLift(vec2 bob) {
  float rate = 2.6 + fract(bob.x * 7.31) * 2.4 + uCrowd * 4.0;
  float s = sin(uTime * rate + bob.x * 6.2831);
  return bob.y * (0.035 * s + uCrowd * (0.18 + 0.2 * fract(bob.x * 3.7)) * max(0.0, s));
}
`,c_=`
uniform vec4 uNetA; uniform vec3 uNetDA;
uniform vec4 uNetB; uniform vec3 uNetDB;
vec3 netDisp(vec3 p) {
  vec3 da = p - uNetA.xyz; vec3 db = p - uNetB.xyz;
  float fa = uNetA.w * exp(-dot(da, da) / 0.5);
  float fb = uNetB.w * exp(-dot(db, db) / 0.5);
  return uNetDA * fa + uNetDB * fb;
}
`,h_=`
attribute float aRole;
#ifdef PARTS
attribute float aPart;
${jh}
#endif
#ifdef CROWD
attribute vec2 aBob;
${Nf}
#endif
uniform vec3 uPalette[${Zh}];
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
`,u_=`
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
`;function Yi(i={}){let t={};i.parts&&(t.PARTS=""),i.crowd&&(t.CROWD=""),i.atlas&&(t.USE_ATLAS="");let e=so.merge([ut.lights,ut.fog]);return Object.assign(e,{uPalette:Wt.uPalette,uLightDir:Wt.uLightDir,uToon:Wt.uToon,uShadowAmt:Wt.uShadowAmt,uParts:Wt.uParts,uAtlas:Wt.uAtlas,uTime:Wt.uTime,uCrowd:Wt.uCrowd}),new Fe({uniforms:e,defines:t,vertexShader:h_,fragmentShader:u_,lights:!0,fog:i.fog!==!1,side:i.doubleSided?Nn:si,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})}var d_=`
attribute vec3 iA;
attribute vec3 iB;
attribute vec3 iN1;
attribute vec3 iN2;
attribute vec2 iMeta;
#ifdef PARTS
${jh}
#endif
#ifdef CROWD
attribute vec2 iBob;
${Nf}
#endif
#ifdef NET
${c_}
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
`,f_=`
uniform vec3 uColor;
uniform float uOpacity;
#include <common>
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uColor, uOpacity);
  #include <fog_fragment>
}
`;function Mi(i={}){let t={};i.parts&&(t.PARTS=""),i.crowd&&(t.CROWD=""),i.net&&(t.NET="");let e=so.merge([ut.fog]);return Object.assign(e,{uLineWidth:Wt.uLineWidth,uMinWidth:Wt.uMinWidth,uTaper:Wt.uTaper,uResolution:Wt.uResolution,uParts:Wt.uParts,uTime:Wt.uTime,uCrowd:Wt.uCrowd,uNetA:Wt.uNetA,uNetDA:Wt.uNetDA,uNetB:Wt.uNetB,uNetDB:Wt.uNetDB,uColor:{value:Le[i.role??O.INK]},uOpacity:{value:i.opacity??1},uWidthScale:{value:i.widthScale??1}}),new Fe({uniforms:e,defines:t,vertexShader:d_,fragmentShader:f_,fog:i.fog!==!1,transparent:(i.opacity??1)<1,depthWrite:(i.opacity??1)>=1})}function Df(){return new Fe({uniforms:{uParts:Wt.uParts},vertexShader:`${jh}
attribute float aPart;
void main(){ vec3 p = (partMatrix(aPart) * vec4(position,1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0); }`,fragmentShader:"void main(){ gl_FragColor = vec4(1.0); }"})}function Uf(){return new Fe({uniforms:{uTop:{value:Le[O.SKY_TOP]},uBottom:{value:Le[O.SKY_BOTTOM]}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uTop; uniform vec3 uBottom; varying vec3 vDir; void main(){ float t = smoothstep(-0.02, 0.55, vDir.y); gl_FragColor = vec4(mix(uBottom, uTop, t), 1.0); }",side:je,depthWrite:!1,fog:!1})}function Of(){return new Fe({uniforms:{uInk:{value:Le[O.INK]}},vertexShader:"attribute float aAlpha; varying vec2 vP; varying float vA; void main(){ vP = position.xz * 2.0; vA = aAlpha; gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uInk; varying vec2 vP; varying float vA; void main(){ float d = length(vP); float a = (1.0 - smoothstep(0.35, 1.0, d)) * vA; if (a < 0.01) discard; gl_FragColor = vec4(uInk, a); }",transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function Sl(i,t=1){return new Fe({uniforms:{uColor:{value:Le[i]},uOpacity:{value:t}},vertexShader:"void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uColor; uniform float uOpacity; void main(){ gl_FragColor = vec4(uColor, uOpacity); }",transparent:t<1,depthWrite:t>=1})}function Ff(i){return new Fe({uniforms:{uMap:{value:i}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform sampler2D uMap; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(uMap, vUv).rgb, 1.0); }"})}var Ue=new Map;function Ki(i,t,e=!0){let n=i.index?i.toNonIndexed():i,s=new Float32Array(n.attributes.position.array),r=new Float32Array(n.attributes.normal.array),o=n.attributes.uv?new Float32Array(n.attributes.uv.array):null,a=e?p_(i,t):[];return{positions:s,normals:r,uvs:o,edges:a}}function p_(i,t=32){let e=i.attributes.position,n=new Map,s=[],r=new Int32Array(e.count);for(let x=0;x<e.count;x++){let m=e.getX(x),f=e.getY(x),M=e.getZ(x),y=`${Math.round(m*1e4)},${Math.round(f*1e4)},${Math.round(M*1e4)}`,v=n.get(y);v===void 0&&(v=s.length,n.set(y,v),s.push([m,f,M])),r[x]=v}let o=i.index?i.index.array:null,a=o?o.length/3:e.count/3,l=new Map,c=s.length,h=new L,d=new L,u=new L;for(let x=0;x<a;x++){let m=r[o?o[x*3]:x*3],f=r[o?o[x*3+1]:x*3+1],M=r[o?o[x*3+2]:x*3+2];if(m===f||f===M||m===M)continue;let y=s[m],v=s[f],b=s[M];if(h.set(v[0]-y[0],v[1]-y[1],v[2]-y[2]),d.set(b[0]-y[0],b[1]-y[1],b[2]-y[2]),u.crossVectors(h,d),u.lengthSq()<1e-14)continue;u.normalize();let S=[u.x,u.y,u.z];for(let[E,_]of[[m,f],[f,M],[M,m]]){let A=Math.min(E,_),C=Math.max(E,_),P=A*c+C,N=l.get(P);N||(N={a:A,b:C,normals:[]},l.set(P,N)),N.normals.push(S)}}let p=Math.cos(t*Math.PI/180),g=[];for(let x of l.values()){let m=x.normals[0];if(x.normals.length===1){g.push({a:s[x.a],b:s[x.b],n1:m,n2:[0,0,0],crease:1});continue}let f=x.normals[1],M=m[0]*f[0]+m[1]*f[1]+m[2]*f[2];M>.9999||g.push({a:s[x.a],b:s[x.b],n1:m,n2:f,crease:M<p?1:0})}return g}function dr(i,t,e){let n=`box:${i}:${t}:${e}`;return Ue.has(n)||Ue.set(n,Ki(new Fi(i,t,e),30)),Ue.get(n)}function li(i,t,e,n=8,s=!1){let r=`cyl:${i}:${t}:${e}:${n}:${s}`;return Ue.has(r)||Ue.set(r,Ki(new ki(i,t,e,n,1,s),n<=4?30:60)),Ue.get(r)}function co(i,t=12,e=8,n=Math.PI*2,s=Math.PI){let r=`sph:${i}:${t}:${e}:${n}:${s}`;return Ue.has(r)||Ue.set(r,Ki(new gs(i,t,e,0,n,0,s),70)),Ue.get(r)}function m_(i,t,e=8){let n=`cone:${i}:${t}:${e}`;return Ue.has(n)||Ue.set(n,Ki(new _i(i,t,e),e<=4?30:60)),Ue.get(n)}function g_(i,t,e=!1){let n=`plane:${i}:${t}:${e}`;if(!Ue.has(n)){let s=new An(i,t);s.rotateX(-Math.PI/2),Ue.set(n,Ki(s,30,e))}return Ue.get(n)}function Tl(i,t){let e=`quad:${i}:${t}`;return Ue.has(e)||Ue.set(e,Ki(new An(i,t),30,!1)),Ue.get(e)}function ho(i,t,e=30,n=!0){return Ue.has(i)||Ue.set(i,Ki(t(),e,n)),Ue.get(i)}function Bf(i,t=1){let e=`ico:${i}:${t}`;return Ue.has(e)||Ue.set(e,Ki(new zi(i,t),70)),Ue.get(e)}var cw=new re,wl=new Vt,Pn=new L,kf=new Be,zf=new mn,x_=new L,_n=class i{constructor(t={}){this.opts=t,this.pos=[],this.nor=[],this.role=[],this.part=[],this.bob=[],this.uv=[],this.eA=[],this.eB=[],this.eN1=[],this.eN2=[],this.eMeta=[],this.eBob=[],this.vcount=0}add(t,e,n,s={}){wl.getNormalMatrix(e);let r=e.elements,o=t.positions,a=t.normals,l=s.part??-1,c=s.bob||null,h=s.uvRect||null,d=s.roleFn||null;for(let p=0;p<o.length;p+=3){let g=o[p],x=o[p+1],m=o[p+2];if(this.pos.push(r[0]*g+r[4]*x+r[8]*m+r[12],r[1]*g+r[5]*x+r[9]*m+r[13],r[2]*g+r[6]*x+r[10]*m+r[14]),Pn.set(a[p],a[p+1],a[p+2]).applyMatrix3(wl).normalize(),this.nor.push(Pn.x,Pn.y,Pn.z),this.role.push(s.roles?s.roles[p/3]:d?d(p/3,g,x,m):n),this.opts.parts&&this.part.push(l),this.opts.bob&&this.bob.push(c?c[0]:0,c?c[1]:0),this.opts.atlas)if(h&&t.uvs){let f=p/3*2;this.uv.push(h[0]+t.uvs[f]*(h[2]-h[0]),h[1]+t.uvs[f+1]*(h[3]-h[1]))}else this.uv.push(-1,-1)}if(this.vcount+=o.length/3,s.noEdges||!t.edges.length)return this;let u=!!s.creaseOnly;for(let p of t.edges){if(u&&p.crease<.5)continue;let g=p.a,x=p.b;this.eA.push(r[0]*g[0]+r[4]*g[1]+r[8]*g[2]+r[12],r[1]*g[0]+r[5]*g[1]+r[9]*g[2]+r[13],r[2]*g[0]+r[6]*g[1]+r[10]*g[2]+r[14]),this.eB.push(r[0]*x[0]+r[4]*x[1]+r[8]*x[2]+r[12],r[1]*x[0]+r[5]*x[1]+r[9]*x[2]+r[13],r[2]*x[0]+r[6]*x[1]+r[10]*x[2]+r[14]),Pn.set(p.n1[0],p.n1[1],p.n1[2]).applyMatrix3(wl).normalize(),this.eN1.push(Pn.x,Pn.y,Pn.z),p.n2[0]===0&&p.n2[1]===0&&p.n2[2]===0?this.eN2.push(0,0,0):(Pn.set(p.n2[0],p.n2[1],p.n2[2]).applyMatrix3(wl).normalize(),this.eN2.push(Pn.x,Pn.y,Pn.z)),this.eMeta.push(l,p.crease),this.opts.bob&&this.eBob.push(c?c[0]:0,c?c[1]:0)}return this}line(t,e,n,s,r,o,a=-1){return this.eA.push(t,e,n),this.eB.push(s,r,o),this.eN1.push(0,1,0),this.eN2.push(0,0,0),this.eMeta.push(a,1),this.opts.bob&&this.eBob.push(0,0),this}static mat(t,e,n,s=0,r=0,o=0,a=1,l=1,c=1){return zf.set(s,r,o,"YXZ"),kf.setFromEuler(zf),new re().compose(Pn.set(t,e,n).clone(),kf.clone(),x_.set(a,l,c).clone())}box(t,e,n,s,r,o,a,l=0,c={}){return this.add(dr(e,n,s),i.mat(r,o,a,c.rx||0,l,c.rz||0),t,c)}cyl(t,e,n,s,r,o,a,l,c={}){return this.add(li(e,n,s,r,c.open),i.mat(o,a,l,c.rx||0,c.ry||0,c.rz||0,c.sx||1,1,c.sz||1),t,c)}sphere(t,e,n,s,r,o={}){return this.add(co(e,o.ws||12,o.hs||8,o.phi,o.theta),i.mat(n,s,r,o.rx||0,o.ry||0,o.rz||0,o.sx||1,o.sy||1,o.sz||1),t,o)}cone(t,e,n,s,r,o,a,l={}){return this.add(m_(e,n,s),i.mat(r,o,a,l.rx||0,l.ry||0,l.rz||0,l.sx||1,l.sy||1,l.sz||1),t,l)}plane(t,e,n,s,r,o,a={}){return this.add(g_(e,n,!!a.edges),i.mat(s,r,o,0,a.ry||0,0),t,{noEdges:!a.edges,...a})}quad(t,e,n,s,r,o,a=0,l={}){return this.add(Tl(e,n),i.mat(s,r,o,l.rx||0,a,0),t,{noEdges:!0,...l})}between(t,e,n,s,r,o,a,l,c=6,h={}){let d=o-n,u=a-s,p=l-r,g=Math.hypot(d,u,p),x=new re,m=new L(d,u,p).normalize(),f=new Be().setFromUnitVectors(new L(0,1,0),m);return x.compose(new L((n+o)/2,(s+a)/2,(r+l)/2),f,new L(1,1,1)),this.add(li(e,e,g,c),x,t,h)}buildSolid(){let t=new Je;return t.setAttribute("position",new pe(this.pos,3)),t.setAttribute("normal",new pe(this.nor,3)),t.setAttribute("aRole",new pe(this.role,1)),this.opts.parts&&t.setAttribute("aPart",new pe(this.part,1)),this.opts.bob&&t.setAttribute("aBob",new pe(this.bob,2)),this.opts.atlas&&t.setAttribute("uv",new pe(this.uv,2)),t.computeBoundingSphere(),t}buildEdges(){let t=new qr,e=[-1,0,0,1,0,0,-1,1,0,1,1,0];t.setIndex([0,1,2,2,1,3]),t.setAttribute("position",new pe(e,3));let n=this.eA.length/3;return t.setAttribute("iA",new gn(new Float32Array(this.eA),3)),t.setAttribute("iB",new gn(new Float32Array(this.eB),3)),t.setAttribute("iN1",new gn(new Float32Array(this.eN1),3)),t.setAttribute("iN2",new gn(new Float32Array(this.eN2),3)),t.setAttribute("iMeta",new gn(new Float32Array(this.eMeta),2)),this.opts.bob&&t.setAttribute("iBob",new gn(new Float32Array(this.eBob),2)),t.instanceCount=n,t.boundingSphere=new ii(new L,1e6),t}get edgeCount(){return this.eA.length/3}};var bs=.008333333333333333,it={L:64,W:42,HL:32,HW:21},dt={W:5,HW:2.5,H:2,DEPTH:1.6,TOP_DEPTH:1,POST_R:.06},Yt={PEN_D:9,PEN_HW:10,GOAL_D:3,GOAL_HW:4.5,SPOT:7.5,CIRCLE_R:6,ARC_R:5,CORNER_R:1},ln={HL:40,HW:29},ye=.11,El=9.81,bn={AIR_DRAG:.0125,ROLL_A0:.6,ROLL_C:.014,BOUNCE:.55,BOUNCE_FRICTION:.82,MAGNUS:.003},ve={RESTART_DIST:6,THROW_DIST:3,KICK_RELEASE_LOCK:.25,CONTROL_RADIUS:1,CONTROL_HEIGHT:1,PROTECT_RADIUS:1.15,LOSE_RADIUS:4,ASSIST_WINDOW:8,TACKLE_WINDOW:2,SLIDE_COOLDOWN:1.5,TACKLE_COOLDOWN:.55,REQUEST_COOLDOWN:1.6,INPUT_BUFFER:.15,GK_MAX_HOLD:4},Al={short:120,normal:180,long:300};var uo=[{id:"ST",name:"Striker"},{id:"W",name:"Winger"},{id:"AM",name:"Attacking Midfielder"},{id:"CM",name:"Central Midfielder"},{id:"DEF",name:"Defender"}];var po={community:{name:"Community Ground",crowd:130,loud:.35},town:{name:"Town Stadium",crowd:520,loud:.55},regional:{name:"Regional Stadium",crowd:1200,loud:.75},premier:{name:"Premier Arena",crowd:2400,loud:.9},continental:{name:"Continental Stadium",crowd:3400,loud:1},training:{name:"Training Ground",crowd:0,loud:0}};function Wf(i){let t=i>>>0||1;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}var Pl=.1,eu=.012;function Dn(i,t,e,n,s){let r=n-t,o=s-e,a=Math.hypot(r,o),l=Math.atan2(r,o);i.plane(O.LINES,Pl,a+Pl*.5,(t+n)/2,eu,(e+s)/2,{ry:l})}function Qh(i,t,e,n,s,r,o=40){for(let a=0;a<o;a++){let l=s+(r-s)*(a/o),c=s+(r-s)*((a+1)/o);Dn(i,t+Math.cos(l)*n,e+Math.sin(l)*n,t+Math.cos(c)*n,e+Math.sin(c)*n)}}function Hf(i,t,e,n=.12){for(let s=0;s<4;s++)i.plane(O.LINES,n*2,n*.9,t,eu,e,{ry:s*Math.PI/4})}function y_(i,t={}){let e=it.HL,n=it.HW,s=16,r=it.L/s;for(let c=0;c<s;c++)i.plane(c%2?O.PITCH_A:O.PITCH_B,r,it.W,-e+r*(c+.5),0,0);let o=t.surroundX||44,a=t.surroundZ||33;i.plane(O.SURROUND,o*2,a-n,0,-.004,n+(a-n)/2),i.plane(O.SURROUND,o*2,a-n,0,-.004,-n-(a-n)/2),i.plane(O.SURROUND,o-e,it.W,e+(o-e)/2,-.004,0),i.plane(O.SURROUND,o-e,it.W,-e-(o-e)/2,-.004,0);let l=Pl/2;Dn(i,-e,n-l,e,n-l),Dn(i,-e,-n+l,e,-n+l),Dn(i,e-l,-n,e-l,n),Dn(i,-e+l,-n,-e+l,n),Dn(i,0,-n,0,n),Qh(i,0,0,Yt.CIRCLE_R,0,Math.PI*2,56),Hf(i,0,0,.15);for(let c of[1,-1]){let h=c*e,d=h-c*Yt.PEN_D;Dn(i,d,-Yt.PEN_HW,d,Yt.PEN_HW),Dn(i,h,Yt.PEN_HW,d,Yt.PEN_HW),Dn(i,h,-Yt.PEN_HW,d,-Yt.PEN_HW);let u=h-c*Yt.GOAL_D;Dn(i,u,-Yt.GOAL_HW,u,Yt.GOAL_HW),Dn(i,h,Yt.GOAL_HW,u,Yt.GOAL_HW),Dn(i,h,-Yt.GOAL_HW,u,-Yt.GOAL_HW);let p=h-c*Yt.SPOT;Hf(i,p,0);let g=Math.abs(d-p),x=Math.acos(Math.min(1,g/Yt.ARC_R)),m=c>0?Math.PI:0;Qh(i,p,0,Yt.ARC_R,m-x,m+x,16);for(let f of[1,-1]){let M=c>0?Math.PI:0,v=-f*Math.PI/2-M;for(;v>Math.PI;)v-=Math.PI*2;for(;v<-Math.PI;)v+=Math.PI*2;Qh(i,h,f*n,Yt.CORNER_R,M,M+v,8),i.cyl(O.METAL,.02,.02,1.5,6,h,.75,f*n),i.box(O.BANNER_HOME,.02,.26,.36,h,1.36,f*n-f*.19)}}}function v_(i){let t=dt.POST_R;for(let e of[1,-1]){let n=e*(it.HL-t);for(let o of[1,-1])i.cyl(O.GOAL_FRAME,t,t,dt.H+t,12,n,(dt.H+t)/2,o*(dt.HW+t));i.cyl(O.GOAL_FRAME,t,t,dt.W+t*4,12,n,dt.H+t,0,{rx:Math.PI/2});let s=e*(it.HL+dt.DEPTH),r=e*(it.HL+dt.TOP_DEPTH);for(let o of[1,-1]){let a=o*(dt.HW+t);i.between(O.METAL,.03,s,.03,a,r,dt.H,a,6),i.between(O.METAL,.03,n,dt.H+t,a,r,dt.H,a,6),i.between(O.METAL,.025,n,.03,a,s,.03,a,6)}i.between(O.METAL,.03,r,dt.H,-(dt.HW+t),r,dt.H,dt.HW+t,6),i.between(O.METAL,.025,s,.03,-(dt.HW+t),s,.03,dt.HW+t,6)}}function Xf(){let i=new _n,t=.2;for(let e of[1,-1]){let n=e*it.HL,s=l=>e*(it.HL+dt.DEPTH+(dt.TOP_DEPTH-dt.DEPTH)*(l/dt.H)),r=dt.HW;for(let l=-r;l<=r+1e-6;l+=t)for(let c=0;c<dt.H-1e-6;c+=t)i.line(s(c),c,l,s(c+t),c+t,l);for(let l=0;l<=dt.H+1e-6;l+=t)for(let c=-r;c<r-1e-6;c+=t)i.line(s(l),l,c,s(l),l,c+t);for(let l of[1,-1]){let c=l*r;for(let h=0;h<=dt.H+1e-6;h+=t){let d=s(h),u=Math.max(1,Math.round(Math.abs(d-n)/t));for(let p=0;p<u;p++)i.line(n+(d-n)*(p/u),h,c,n+(d-n)*((p+1)/u),h,c)}for(let h=0;h<=8;h++){let d=h/8;for(let u=0;u<dt.H-1e-6;u+=t){let p=n+(s(u)-n)*d,g=n+(s(u+t)-n)*d;i.line(p,u,c,g,u+t,c)}}}let o=s(dt.H),a=Math.max(1,Math.round(Math.abs(o-n)/t));for(let l=-r;l<=r+1e-6;l+=t)for(let c=0;c<a;c++)i.line(n+(o-n)*(c/a),dt.H,l,n+(o-n)*((c+1)/a),dt.H,l);for(let l=0;l<=a;l++)for(let c=-r;c<r-1e-6;c+=t)i.line(n+(o-n)*(l/a),dt.H,c,n+(o-n)*(l/a),dt.H,c+t)}return i.buildEdges()}var qn=class{constructor(t,e,n,s){this.b=t,this.cx=e,this.cz=n,this.ry=s,this.c=Math.cos(s),this.s=Math.sin(s)}w(t,e){return[this.cx+t*this.c+e*this.s,this.cz-t*this.s+e*this.c]}box(t,e,n,s,r,o,a,l={}){let[c,h]=this.w(r,a);this.b.box(t,e,n,s,c,o,h,this.ry+(l.ry||0),l)}cyl(t,e,n,s,r,o,a,l,c={}){let[h,d]=this.w(o,l);this.b.cyl(t,e,n,s,r,h,a,d,c)}sphere(t,e,n,s,r,o={}){let[a,l]=this.w(n,r);this.b.sphere(t,e,a,s,l,o)}quad(t,e,n,s,r,o,a={}){let[l,c]=this.w(s,o);this.b.quad(t,e,n,l,r,c,this.ry+Math.PI+(a.ry||0),a)}},Vf=[O.CROWD_1,O.CROWD_1,O.CROWD_1,O.CROWD_2,O.CROWD_3,O.CROWD_4,O.CROWD_1,O.CROWD_3],__=[O.SKIN_1,O.SKIN_2,O.SKIN_3];function b_(i,t,e,n,s,r=!0){let o=Vf[Math.floor(s()*Vf.length)],a=[s(),1],l=r?.46:.62;i.box(o,.44,l,.28,t,e+l/2,n,{bob:a});let[c,h]=i.w(t,n);i.b.add(Bf(.14,0),_n.mat(c,e+l+.16,h,0,s()*6,0),__[Math.floor(s()*3)],{bob:a})}function Un(i,t,e,n){let s=new qn(i,t.cx,t.cz,t.ry),r=t.rows,o=t.rowDepth||.85,a=t.rowHeight||.42,l=t.base||.6,c=t.len,h=t.z0||0,d=t.roles||[O.STAND_A,O.STAND_B];s.box(t.wallRole||O.CONCRETE,c,l,.3,0,l/2,h-.15);for(let g=0;g<r;g++){let x=l+g*a;if(s.box(d[Math.floor(g/(t.band||2))%d.length],c,a,o,0,x+a/2,h+o*(g+.5)),t.density>0){let m=Math.floor(c/.62);for(let f=0;f<m;f++){let M=-c/2+.31+f*.62+(e()-.5)*.1;n.seats.push({f:s,lx:M,y:x+a,lz:h+o*(g+.5)+.05,w:t.density,seated:!0})}}}let u=l+r*a,p=h+o*r;s.box(t.wallRole||O.CONCRETE,c+.4,u+1.4,.35,0,(u+1.4)/2,p+.17);for(let g of[-1,1])s.box(t.wallRole||O.CONCRETE,.35,u+.6,p-h,g*(c/2+.17),(u+.6)/2,h+(p-h)/2);if(t.roof){let g=u+(t.roofClear||3.2),x=p-h+1.5,m=Math.max(2,Math.round(c/12));for(let f=0;f<=m;f++){let M=-c/2+c*f/m;s.cyl(O.METAL,.16,.16,g,8,M,g/2,p+.1)}s.box(t.roofRole||O.ROOF,c+1.2,.35,x,0,g,p-x/2+.6,{rx:-.07}),s.box(O.METAL,c+1.2,.5,.25,0,g-.3,p-x+.7)}if(t.banners){let g=Math.max(1,Math.floor(c/10));for(let x=0;x<g;x++){let m=-c/2+c*(x+.5)/g;s.box(x%2?O.BANNER_HOME:O.GOLD,5,.9,.06,m,l*.55+.3,h-.35)}}return{top:u,back:p}}function Gf(i,t,e,n,s){i.cyl(O.METAL,.22,.32,n,8,t,n/2,e);let r=Math.atan2(-t,-e),o=new qn(i,t,e,r);o.box(O.METAL,3.6,2.4,.3,0,n+1.2,.2,{rx:.35});for(let a=0;a<3;a++)for(let l=0;l<2;l++)o.box(O.LAMP,.9,.7,.2,-1.15+a*1.15,n+.65+l*1.1,-.05,{rx:.35})}function Rl(i,t,e){let o=0,a=(l,c,h,d,u)=>{let p=Math.abs(h-c),g=Math.max(1,Math.round(p/8)),x=p/g;for(let m=0;m<g;m++){let f=Math.min(c,h)+x*(m+.5),M=d?l:f,y=d?f:l;i.box(m%2?O.BOARD_A:O.BOARD_B,x-.06,.9,.12,M,.9/2,y,d?Math.PI/2:0);let v=.075,b=M+(d?-Math.sign(l)*v:0),S=y+(d?0:-Math.sign(l)*v),E=e[o++%e.length];i.quad(m%3===0?O.BANNER_HOME:O.INK,Math.min(x-.6,6),.62,b,.9/2,S,u,{uvRect:t.word(E)})}};a(28.6,-39.6,39.6,!1,Math.PI),a(-28.6,-39.6,39.6,!1,0),a(39.6,-28.6+1,-dt.HW-4,!0,-Math.PI/2),a(39.6,dt.HW+4,28.6-1,!0,-Math.PI/2),a(-39.6,-28.6+1,-dt.HW-4,!0,Math.PI/2),a(-39.6,dt.HW+4,28.6-1,!0,Math.PI/2)}function fo(i,t=27.2){for(let e of[-9,9]){let n=new qn(i,e,t,0);n.box(O.STAND_C,7,2.2,.15,0,1.1,1),n.box(O.ROOF,7.2,.12,1.8,0,2.25,.2,{rx:-.08});for(let s of[-1,1])n.box(O.STAND_C,.12,2.1,1.7,s*3.5,1.05,.2);n.box(O.WOOD,6.4,.45,.5,0,.22,.6)}}function Cl(i,t,e,n,s){i.cyl(O.TRUNK,.18*n,.25*n,2.2*n,6,t,1.1*n,e),i.cone(O.TREE,1.8*n,4.5*n,8,t,2.2*n+2.25*n,e,{ry:s()*3}),i.cone(O.TREE,1.3*n,3.2*n,8,t,2.2*n+3.6*n,e,{ry:s()*3})}var M_=()=>ho("pyramid",()=>{let i=new _i(Math.SQRT1_2,1,4);return i.rotateY(Math.PI/4),i},30);function $f(i,t,e,n,s,r,o,a){i.add(M_(),_n.mat(t,e+r/2,n,0,a,0,s,r,o),O.ROOF_TILE)}function tu(i,t,e,n,s){let r=new qn(i,t,e,n),o=7+s()*3,a=6+s()*2,l=5+s()*2.5,c=s()<.5?O.HOUSE_A:O.HOUSE_B;r.box(c,o,l,a,0,l/2,0);let[h,d]=r.w(0,0);$f(i,h,l,d,o+.4,2.6,a+.4,n);for(let u=-1;u<=1;u+=2)r.box(O.STAND_C,1.3,1.2,.08,u*o*.25,l*.62,-a/2-.04);r.box(O.WOOD,1.1,2.1,.08,0,1.05,-a/2-.04),r.cyl(O.CONCRETE,.35,.35,1.4,6,o*.3,l+1,a*.15)}function Zi(i,t,e,n,s,r=2.2){let o=Math.hypot(n-t,s-e),a=Math.max(1,Math.round(o/3));for(let c=0;c<=a;c++){let h=t+(n-t)*(c/a),d=e+(s-e)*(c/a);i.cyl(O.FENCE,.04,.04,r,6,h,r/2,d)}i.between(O.FENCE,.03,t,r,e,n,r,s,6);let l=Math.max(1,Math.round(o/.6));for(let c=0;c<l;c++){let h=t+(n-t)*(c/l),d=e+(s-e)*(c/l),u=t+(n-t)*((c+1)/l),p=e+(s-e)*((c+1)/l);i.line(h,.05,d,u,r,p),i.line(u,.05,p,h,r,d)}}function Ji(i,t,e,n,s,r,o){let a=new qn(i,t,n,s);a.box(O.METAL,r+.8,o+.8,.5,0,e,.3);for(let l of[-1,1])a.cyl(O.METAL,.2,.2,e-o/2,8,l*r*.35,(e-o/2)/2,.4);return{x:t,y:e,z:n,ry:s,w:r,h:o}}function S_(i,t,e,n,s=28){let r=-t/2,o=0;for(let a=1;a<=s;a++){let l=a/s,c=-t/2+t*l,h=e*(1-Math.pow(2*l-1,2));i.between(O.GOAL_FRAME,1.3,r,o,n,c,h,n,10),r=c,o=h}for(let a=2;a<s-1;a+=2){let l=a/s,c=-t/2+t*l,h=e*(1-Math.pow(2*l-1,2));i.line(c,h,n,c,30,40),i.line(c,h,n,c,30,-40)}}function fr(i,t,e,n){let s=n.lenX,r=n.lenZ,o=[{cx:0,cz:-n.dz,ry:Math.PI,len:s},{cx:0,cz:n.dz,ry:0,len:s},{cx:n.dx,cz:0,ry:Math.PI/2,len:r},{cx:-n.dx,cz:0,ry:-Math.PI/2,len:r}],a=[];for(let l of o)a.push(Un(i,{...n.stand,...l},t,e));if(n.corners)for(let[l,c]of[[1,1],[1,-1],[-1,1],[-1,-1]]){let h=Math.atan2(l,c),d=l*(n.dx-3),u=c*(n.dz-3);a.push(Un(i,{...n.stand,cx:d+l*4,cz:u+c*4,ry:h,len:14,banners:!1},t,e))}return a}function qf(i,t){let{atlas:e,quality:n="high",homeName:s="HOME",final:r=!1,seed:o=7}=t,a=Wf(o*31+i.length),l=n==="low"?.35:n==="medium"?.65:1,c=new _n({bob:!0,atlas:!0}),h=new _n,d={people:0,seats:[]},u=[],p=[s.toUpperCase(),"FIRST TOUCH","PLAY FAIR","KICKWELL","GRASSROOTS FC","NORTHLINE","VOLTA SPORTS","BLUEBIRD BANK"];e.reset();let g={type:i,name:po[i].name};switch(y_(c,{surroundX:i==="training"?90:60,surroundZ:i==="training"?70:45}),v_(h),i){case"community":{Zi(c,-40,-29,40,-29),Zi(c,-40,29,40,29),Zi(c,-40,-29,-40,29),Zi(c,40,-29,40,29),Un(c,{cx:0,cz:-31,ry:Math.PI,len:26,rows:4,rowHeight:.38,base:.4,roles:[O.WOOD,O.STAND_B],roof:!0,roofClear:2.6,density:.6*l,wallRole:O.WOOD},a,d);let m=new qn(c,0,30.2,0);for(let v=0;v<60;v++)d.seats.push({f:m,lx:-34+a()*68,y:0,lz:a()*.8,w:1,seated:!1});fo(c,26.5);let f=new qn(c,-47,8,Math.PI/2);f.box(O.HOUSE_B,16,4.5,8,0,2.25,0);let[M,y]=f.w(0,0);$f(c,M,4.5,y,16.4,2.4,8.4,Math.PI/2),f.box(O.WOOD,2,2.2,.1,0,1.1,-4.05),f.box(O.STAND_C,3,1.2,.1,-5,2.6,-4.05),f.box(O.STAND_C,3,1.2,.1,5,2.6,-4.05);for(let v=0;v<7;v++)tu(c,-48+v*16+a()*3,46+a()*4,Math.PI,a);for(let v=0;v<6;v++)tu(c,-44+v*17+a()*3,-50-a()*4,0,a);for(let v=0;v<16;v++)Cl(c,-60+a()*120,(a()<.5?1:-1)*(36+a()*6),.8+a()*.5,a);for(let v=0;v<6;v++)Cl(c,48+a()*10,-25+a()*50,.8+a()*.5,a);u.push(Ji(c,46,3.2,-16,-Math.PI/2,4,1.5));break}case"town":{Rl(c,e,p),Un(c,{cx:0,cz:-31,ry:Math.PI,len:54,rows:9,roof:!0,roofClear:3.4,density:.5*l,banners:!0,roles:[O.STAND_C,O.STAND_A]},a,d),Un(c,{cx:0,cz:31,ry:0,len:44,rows:5,density:.45*l,roles:[O.STAND_B,O.STAND_A]},a,d),Un(c,{cx:42,cz:0,ry:Math.PI/2,len:30,rows:4,density:.45*l},a,d),Un(c,{cx:-42,cz:0,ry:-Math.PI/2,len:30,rows:4,density:.4*l},a,d),fo(c);for(let[m,f]of[[-44,-34],[44,-34],[-44,34],[44,34]])Gf(c,m,f,24);u.push(Ji(c,-47,7,18,Math.PI/2,6,2.2));for(let m=0;m<10;m++)Cl(c,-70+a()*140,(a()<.5?1:-1)*(52+a()*12),1+a()*.5,a);for(let m=0;m<5;m++)tu(c,-60+m*28,70,Math.PI,a);break}case"regional":{Rl(c,e,p);let m={rows:12,roof:!0,roofClear:3.4,density:.72*l,banners:!0,roles:[O.STAND_A,O.STAND_B,O.STAND_C]};Un(c,{...m,cx:0,cz:-31,ry:Math.PI,len:66},a,d),Un(c,{...m,cx:0,cz:31,ry:0,len:66,roof:!1,rows:10},a,d),Un(c,{...m,cx:0,cz:31,ry:0,len:60,rows:8,base:6.4,z0:9.5,roofClear:3.6,roof:!0,banners:!1},a,d),Un(c,{...m,cx:42,cz:0,ry:Math.PI/2,len:46,rows:9,roof:!1},a,d),Un(c,{...m,cx:-42,cz:0,ry:-Math.PI/2,len:46,rows:9,roof:!1},a,d);let f=new qn(c,0,26.2,0);f.box(O.STAND_C,3.6,2.8,5.4,0,1.4,.6),f.cyl(O.BANNER_HOME,1.8,1.8,5.4,12,0,2.8,.6,{rx:Math.PI/2,theta:Math.PI}),f.box(O.CONCRETE,2.6,2.2,.1,0,1.1,-2.15),fo(c,27.5);for(let[M,y]of[[-40,-38],[40,-38],[-40,38],[40,38]])Gf(c,M,y,30);u.push(Ji(c,46,10,0,-Math.PI/2,8,3));break}case"premier":{Rl(c,e,p);let m={rows:13,roofClear:3.6,density:.85*l,banners:!0,roles:[O.STAND_A,O.STAND_B]};fr(c,a,d,{lenX:68,lenZ:48,dx:42,dz:31,corners:!0,stand:m}),fr(c,a,d,{lenX:72,lenZ:52,dx:42,dz:31,corners:!1,stand:{...m,base:7,z0:12,rows:10,roof:!0,banners:!1,roles:[O.STAND_C,O.STAND_A]}}),fr(c,a,d,{lenX:74,lenZ:54,dx:42,dz:31,corners:!1,stand:{...m,base:12.5,z0:21,rows:7,roof:!0,roofClear:4,banners:!1,density:.7*l,roles:[O.STAND_B]}}),fo(c,27.5),u.push(Ji(c,60,17,0,-Math.PI/2,14,5.5)),u.push(Ji(c,-60,17,0,Math.PI/2,14,5.5));break}case"continental":{Rl(c,e,r?["FINAL","CONTINENTAL CUP","FIRST TOUCH",s.toUpperCase()]:p);let m={rows:14,roofClear:3.6,density:.95*l,banners:!0,roles:r?[O.GOLD,O.STAND_A]:[O.STAND_A,O.STAND_C]};fr(c,a,d,{lenX:68,lenZ:48,dx:42,dz:31,corners:!0,stand:m}),fr(c,a,d,{lenX:74,lenZ:54,dx:42,dz:31,corners:!0,stand:{...m,base:7.4,z0:12.5,rows:12,banners:r}}),fr(c,a,d,{lenX:78,lenZ:58,dx:42,dz:31,corners:!1,stand:{...m,base:14,z0:24,rows:8,roof:!0,roofClear:5,banners:!1,density:.8*l,roles:[O.STAND_B]}}),S_(c,150,72,0);for(let f=0;f<24;f++){let M=f/24*Math.PI*2,y=Math.cos(M)*80,v=Math.sin(M)*58,b=Math.cos(M+Math.PI/12)*80,S=Math.sin(M+Math.PI/12)*58;c.between(O.METAL,.5,y,30,v,b,30,S,6)}if(r)for(let f=0;f<8;f++)c.box(f%2?O.GOLD:O.BANNER_HOME,1.2,9,.1,-35+f*10,22,-52,0);fo(c,27.5),u.push(Ji(c,64,21,0,-Math.PI/2,16,6)),u.push(Ji(c,-64,21,0,Math.PI/2,16,6));break}case"training":{Zi(c,-46,-36,46,-36),Zi(c,-46,36,46,36),Zi(c,-46,-36,-46,36),Zi(c,46,-36,46,36);for(let y of[1,-1]){let v=it.HL-.05,b=y*(dt.HW-.55),S=dt.H-.5;c.box(O.TARGET,.06,.9,.08,v,S,b-.45),c.box(O.TARGET,.06,.9,.08,v,S,b+.45),c.box(O.TARGET,.06,.08,.9,v,S-.45,b),c.box(O.TARGET,.06,.08,.9,v,S+.45,b)}for(let y=0;y<8;y++)c.cone(O.CONE,.14,.32,10,-26+y*1.8,.16,-24.5);for(let y=0;y<3;y++){let v=-20+y*8;for(let b of[0,1.6])c.cone(O.CONE,.16,.4,10,v,.2,-27+b);c.box(O.TARGET,.06,.06,1.6,v,.55,-26.2)}let m=10,f=-30;for(let[y,v,b,S]of[[m,f,m+26,f],[m,f-1,m,f-5],[m+26,f,m+26,f-5]]){let E=Math.hypot(b-y,S-v);c.plane(O.LINES,E,Pl,(y+b)/2,eu,(v+S)/2,{ry:Math.atan2(S-v,b-y)})}for(let y of[m+1,m+25])c.cyl(O.GOAL_FRAME,.04,.04,1.2,8,y,.6,f-1.8),c.cyl(O.GOAL_FRAME,.04,.04,1.2,8,y,.6,f-3.8),c.between(O.GOAL_FRAME,.04,y,1.2,f-1.8,y,1.2,f-3.8,8);let M=new qn(c,0,48,0);M.box(O.HOUSE_A,26,6,10,0,3,0),M.box(O.ROOF,27,.4,11,0,6.2,0);for(let y=-3;y<=3;y++)M.box(O.STAND_C,2.2,1.6,.1,y*3.4,3.4,-5.05);M.box(O.WOOD,2.4,2.6,.1,0,1.3,-5.05);for(let y=0;y<18;y++)Cl(c,-80+a()*160,(a()<.5?1:-1)*(44+a()*20),.9+a()*.6,a);for(let y=0;y<3;y++)c.box(O.WOOD,3,.45,.5,-10+y*10,.22,33);for(let y=0;y<6;y++)c.sphere(O.BALL_W,.11,20+y*.3,.11,33+y%2*.25,{ws:8,hs:6});u.push(Ji(c,46,3,20,-Math.PI/2,4,1.5));break}}let x=Math.round(po[i].crowd*l);if(x>0&&d.seats.length){let m=d.seats,f=m.reduce((y,v)=>y+v.w,0),M=Math.min(1,x/f);for(let y of m)a()<y.w*M&&(b_(y.f,y.lx,y.y,y.lz,a,y.seated),d.people++)}return g.people=d.people,g.solid=c.buildSolid(),g.edges=c.buildEdges(),g.casterSolid=h.buildSolid(),g.casterEdges=h.buildEdges(),g.screens=u,g.edgeCount=c.edgeCount,g.vertCount=c.vcount,g}function Yf(i=3){let t=Wf(i),e=new _n;for(let n=0;n<14;n++){let s=t()*Math.PI*2,r=260+t()*180,o=Math.cos(s)*r,a=Math.sin(s)*r,l=70+t()*70,c=3+Math.floor(t()*3);for(let h=0;h<c;h++){let d=9+t()*10;e.sphere(O.CLOUD,d,o+(h-c/2)*d*1.1,l+t()*4,a+(t()-.5)*8,{ws:10,hs:6,sy:.55})}}return{solid:e.buildSolid(),edges:e.buildEdges()}}var Ft={PELVIS:0,TORSO:1,HEAD:2,UARM_L:3,UARM_R:4,FARM_L:5,FARM_R:6,THIGH_L:7,THIGH_R:8,SHIN_L:9,SHIN_R:10,BOOT_L:11,BOOT_R:12},pr=13,$e={thigh:.44,shin:.43,ankle:.08,upper:.29,fore:.27,hipW:.095,shoulderW:.19,torsoH:.5,waist:.07,neck:.08},Qe=(i,t,e,n=0,s=0,r=0)=>_n.mat(i,t,e,n,s,r),w_=()=>ho("torso",()=>{let i=new ki(.265,.205,.5,4,1);return i.rotateY(Math.PI/4),i.scale(1,1,.58),i.translate(0,.25,0),i},30),T_=[O.HAIR_1,O.HAIR_2,O.HAIR_1],Kf=[O.SKIN_1,O.SKIN_2,O.SKIN_3];function E_(i){let t=i.team,e=i.isGK;return{shirt:e?t===0?O.GK_0:O.GK_1:t===0?O.SHIRT_0:O.SHIRT_1,shorts:e?t===0?O.GKX_0:O.GKX_1:t===0?O.SHORTS_0:O.SHORTS_1,socks:e?t===0?O.GKX_0:O.GKX_1:t===0?O.SOCKS_0:O.SOCKS_1,num:t===0?O.NUM_0:O.NUM_1,skin:i.isHuman?O.SKIN_H:Kf[i.id*7%3],hair:i.isHuman?O.HAIR_H:T_[i.id*5%3],boot:i.isHuman?O.BOOT_H:O.BOOT,hand:e?O.GLOVE:i.isHuman?O.SKIN_H:Kf[i.id*7%3]}}function A_(i,t,e,n){let s=E_(t),r=l=>({part:e+l});i.add(dr(.3,.2,.19),Qe(0,-.01,0),s.shorts,r(Ft.PELVIS)),i.add(w_(),Qe(0,0,0),s.shirt,r(Ft.TORSO)),i.add(li(.045,.05,.1,8),Qe(0,.53,0),s.skin,r(Ft.TORSO));let o=String(t.number??0),a=o.length>1?.12:.16;for(let l=0;l<o.length;l++){let c=(l-(o.length-1)/2)*a*.95;i.add(Tl(a,.2),Qe(c,.3,-.113,0,Math.PI,0),s.num,{...r(Ft.TORSO),uvRect:n.digit(+o[l]),noEdges:!0})}i.add(Tl(.07,.09),Qe(.09,.36,.113,0,0,0),s.num,{...r(Ft.TORSO),uvRect:n.digit(+o[o.length-1]),noEdges:!0}),i.add(co(.12,14,10),Qe(0,.13,0),s.skin,r(Ft.HEAD)),i.add(co(.126,14,6,Math.PI*2,Math.PI*.42),Qe(0,.14,-.012,-.25,0,0),s.hair,{...r(Ft.HEAD),creaseOnly:!1});for(let l of[-1,1])i.add(dr(.026,.038,.012),Qe(l*.045,.145,.114),O.EYE,{...r(Ft.HEAD),noEdges:!0});for(let[l,c,h]of[[Ft.UARM_L,Ft.FARM_L,1],[Ft.UARM_R,Ft.FARM_R,-1]])i.add(li(.064,.058,.13,8),Qe(0,-.055,0),s.shirt,r(l)),i.add(li(.043,.04,.29,7),Qe(0,-.145,0),s.skin,{...r(l),noEdges:!1}),i.add(li(.039,.034,.26,7),Qe(0,-.13,0),s.skin,r(c)),i.add(co(t.isGK?.062:.05,8,6),Qe(0,-.285,.005),s.hand,r(c));for(let[l,c,h]of[[Ft.THIGH_L,Ft.SHIN_L,Ft.BOOT_L],[Ft.THIGH_R,Ft.SHIN_R,Ft.BOOT_R]])i.add(li(.078,.07,.2,8),Qe(0,-.08,0),s.shorts,r(l)),i.add(li(.062,.052,.44,8),Qe(0,-.22,0),s.skin,r(l)),i.add(li(.054,.045,.42,8),Qe(0,-.21,0),s.socks,r(c)),i.add(dr(.1,.075,.26),Qe(0,-.045,.06),s.boot,r(h)),i.add(dr(.104,.02,.27),Qe(0,-.08,.06),O.INK,{...r(h),noEdges:!0})}function R_(i,t){let e=new zi(.11,3),n=new zi(1,0).toNonIndexed(),s=[],r=n.attributes.position;for(let c=0;c<r.count;c++){let h=new L(r.getX(c),r.getY(c),r.getZ(c)).normalize();s.some(d=>d.distanceTo(h)<.001)||s.push(h)}let o=ho("ball",()=>e,70),a=[],l=new L;for(let c=0;c<o.positions.length;c+=9){l.set(o.positions[c]+o.positions[c+3]+o.positions[c+6],o.positions[c+1]+o.positions[c+4]+o.positions[c+7],o.positions[c+2]+o.positions[c+5]+o.positions[c+8]).normalize();let h=-1;for(let u of s)h=Math.max(h,u.dot(l));let d=h>Math.cos(.36)?O.BALL_B:O.BALL_W;a.push(d,d,d)}i.add(o,new re,O.BALL_W,{part:t,roles:a})}var Il=class i{constructor(t,e){this.players=t,this.rows=t.length*pr+1,this.ballRow=t.length*pr;let n=Math.max(1,this.rows);this.data=new Float32Array(16*n),this.texture=new ms(this.data,4,n,vn,yn),this.texture.minFilter=ze,this.texture.magFilter=ze,this.texture.needsUpdate=!0,Wt.uParts.value=this.texture;let s=new _n({parts:!0,atlas:!0});t.forEach((r,o)=>A_(s,r,o*pr,e)),R_(s,this.ballRow),this.solidGeo=s.buildSolid(),this.edgeGeo=s.buildEdges(),this.mesh=new ue(this.solidGeo,i.solidMaterial()),this.mesh.frustumCulled=!1,this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.mesh.customDepthMaterial=i.depthMaterial(),this.edges=new ue(this.edgeGeo,i.edgeMaterial()),this.edges.frustumCulled=!1,this.edges.renderOrder=1;for(let r=0;r<this.rows;r++)this.setIdentity(r)}static solidMaterial(){return i._sm||(i._sm=Yi({parts:!0,atlas:!0}))}static edgeMaterial(){return i._em||(i._em=Mi({parts:!0}))}static depthMaterial(){return i._dm||(i._dm=Df())}setIdentity(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=this.data[e+15]=1}setMatrix(t,e){this.data.set(e.elements,t*16)}hide(t){let e=t*16;this.data.fill(0,e,e+16),this.data[e]=this.data[e+5]=this.data[e+10]=1e-4,this.data[e+13]=-50,this.data[e+15]=1}commit(){this.texture.needsUpdate=!0}dispose(){this.solidGeo.dispose(),this.edgeGeo.dispose(),this.texture.dispose()}};var ot=class i{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}clone(){return new i(this.x,this.y,this.z)}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}addScaled(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}scale(t){return this.x*=t,this.y*=t,this.z*=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}len(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}lenSq(){return this.x*this.x+this.y*this.y+this.z*this.z}lenXZ(){return Math.sqrt(this.x*this.x+this.z*this.z)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}dotXZ(t){return this.x*t.x+this.z*t.z}dist(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return Math.sqrt(e*e+n*n+s*s)}distXZ(t){let e=this.x-t.x,n=this.z-t.z;return Math.sqrt(e*e+n*n)}normalize(){let t=this.len();return t>1e-9&&(this.x/=t,this.y/=t,this.z/=t),this}flatNormalize(){this.y=0;let t=Math.sqrt(this.x*this.x+this.z*this.z);return t>1e-9&&(this.x/=t,this.z/=t),this}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}isFinite(){return Number.isFinite(this.x)&&Number.isFinite(this.y)&&Number.isFinite(this.z)}},ft=(i,t,e)=>i<t?t:i>e?e:i,mo=(i,t,e)=>i+(t-i)*e;var Zf=Math.PI*2;function Jf(i){return i=(i+Math.PI)%Zf,i<0&&(i+=Zf),i-Math.PI}var ji=(i,t)=>Jf(t-i),Kt=(i,t)=>Math.atan2(i,t);function jf(i,t,e){let n=ji(i,t);return Math.abs(n)<=e?t:Jf(i+Math.sign(n)*e)}function Yn(i,t,e,n,s,r){let o=s-e,a=r-n,l=o*o+a*a,c=l>1e-9?((i-e)*o+(t-n)*a)/l:0;c=ft(c,0,1);let h=e+o*c,d=n+a*c,u=i-h,p=t-d;return{d:Math.sqrt(u*u+p*p),t:c}}function mr(i){return i<1.5?1+i*.17:i<5?1.25+(i-1.5)*.4:2.65+(i-5)*.27}function gr(i){return ft(.64/i,.18,.6)}var C_=1;function P_(i=50){return{pace:i,stamina:i,control:i,passing:i,finishing:i,tackling:i}}var Ll=class{constructor(t={}){this.id=C_++,this.team=t.team??0,this.slot=t.slot??0,this.role=t.role||"CM",this.side=t.side??0,this.number=t.number??7,this.name=t.name||"Player",this.isHuman=!!t.isHuman,this.isGK=this.role==="GK",this.attrs=Object.assign(P_(50),t.attrs||{}),this.keeping=t.keeping??50,this.foot=t.foot||"R",this.look=t.look||null,this.pos=new ot,this.prevPos=new ot,this.vel=new ot,this.yaw=0,this.prevYaw=0,this.headYaw=0,this.desired=new ot,this.sprint=!1,this.faceYaw=null,this.stamina=1,this.gait=0,this.prevGait=0,this.action=null,this.slideReadyAt=0,this.tackleReadyAt=0,this.noCaptureUntil=0,this.stumbleUntil=0,this.downUntil=0,this.touch=null,this.celebrate=0,this.hold=null,this.requestUntil=0,this.requestReadyAt=0,this.ackUntil=0,this.lastKickAt=-10,this.ai={state:"shape",target:new ot,think:0,sprint:!1,stuckT:0,lastDist:0}}get speed(){return Math.sqrt(this.vel.x*this.vel.x+this.vel.z*this.vel.z)}jogSpeed(){return 4.9+(this.attrs.pace-50)*.018}sprintSpeed(){let t=this.stamina<.35?(.35-this.stamina)/.35:0;return(7+(this.attrs.pace-50)*.03)*(1-.12*t)}maxSpeed(t,e){let n=t&&this.stamina>.02?this.sprintSpeed():this.jogSpeed();return e&&(n*=t?.9:.93),n}forwardX(){return Math.sin(this.yaw)}forwardZ(){return Math.cos(this.yaw)}};function tp(i){i.action=null,i.vel.set(0,0,0),i.desired.set(0,0,0),i.stumbleUntil=0,i.downUntil=0,i.celebrate=0,i.hold=null,i.requestUntil=0,i.prevPos.copy(i.pos),i.prevYaw=i.yaw}function ep(i,t,e,n=1/0,s=!1){i.prevPos.copy(i.pos),i.prevYaw=i.yaw,i.prevGait=i.gait;let r=i.action;if(r&&r.type==="slide"&&r.sliding){i.pos.addScaled(i.vel,t),Qf(i,t,!0);return}if(r&&r.type==="dive"){i.pos.addScaled(i.vel,t),i.pos.y=0;return}let o=n;e<i.downUntil?o=0:e<i.stumbleUntil&&(o=Math.min(o,1.6));let a=i.desired,l=Math.sqrt(a.x*a.x+a.z*a.z),c=Math.min(i.maxSpeed(i.sprint,s),o),h=a.x,d=a.z;l>c&&(h*=c/l,d*=c/l,l=c);let u=i.vel.x,p=i.vel.z,g=h-u,x=d-p,m=Math.sqrt(g*g+x*x),f=12.5+i.attrs.pace*.04,y=(h*u+d*p<u*u+p*p-.01?24:f)*t;m>y&&(g*=y/m,x*=y/m),i.vel.x+=g,i.vel.z+=x,i.vel.y=0,i.pos.x+=i.vel.x*t,i.pos.z+=i.vel.z*t,i.pos.y=0;let v=i.faceYaw,b=i.speed;v==null&&(v=b>.4?Kt(i.vel.x,i.vel.z):i.yaw);let S=(i.isHuman?14:9)*t;i.yaw=jf(i.yaw,v,S);let E=1.35-i.attrs.stamina*.007;i.sprint&&b>i.jogSpeed()*1.03?i.stamina-=.068*E*t:b<2.2?i.stamina+=.05*t:i.stamina+=.014*t,i.stamina=ft(i.stamina,0,1),Qf(i,t,!1)}function Qf(i,t,e){let n=e?0:i.speed;n>.05&&(i.gait+=n*t/mr(n))}function np(i){let t=i.length;for(let e=0;e<t;e++){let n=i[e];for(let s=e+1;s<t;s++){let r=i[s],o=r.pos.x-n.pos.x,a=r.pos.z-n.pos.z,l=o*o+a*a,c=.62;if(l<c*c&&l>1e-8){let h=Math.sqrt(l),d=(c-h)*.5,u=o/h,p=a/h,g=n.action&&n.action.type==="slide"?.3:1,x=r.action&&r.action.type==="slide"?.3:1,m=g+x;n.pos.x-=u*d*2*(g/m),n.pos.z-=p*d*2*(g/m),r.pos.x+=u*d*2*(x/m),r.pos.z+=p*d*2*(x/m)}else l<=1e-8&&(r.pos.x+=.05)}}}var Jt=ye,Qi=class{constructor(){this.pos=new ot(0,Jt,0),this.prevPos=new ot(0,Jt,0),this.vel=new ot,this.spin=new ot,this.sideSpin=0,this.q=[0,0,0,1],this.prevQ=[0,0,0,1],this.state="dead",this.owner=null,this.lastTouch=null,this.lastTouchTime=-10,this.lastKick=null,this.lastValid=new ot(0,Jt,0),this.crossing=[null,null],this.net=[null,null],this.version=0,this.onGround=!0}place(t,e,n=Jt){this.net[0]=this.net[1]=null,this.pos.set(t,n,e),this.prevPos.copy(this.pos),this.vel.set(0,0,0),this.spin.set(0,0,0),this.sideSpin=0,this.crossing[0]=this.crossing[1]=null,this.version++}setVelocity(t){this.vel.copy(t),this.version++}get speed(){return this.vel.len()}get airborne(){return this.pos.y>Jt+.04||Math.abs(this.vel.y)>.3}};function su(i,t=0){let e=bn.ROLL_A0,n=bn.ROLL_C,s=Math.sqrt(n/e),r=Math.sqrt(e*n);return(Math.atan(i*s)-Math.atan(t*s))/r}function Ul(i,t){let e=bn.ROLL_A0,n=bn.ROLL_C,s=((e+n*t*t)*Math.exp(2*n*i)-e)/n;return Math.sqrt(Math.max(0,s))}var Rw=new ot;function rp(i,t){let e=i.vel,n=i.pos,s=n.y<=Jt+.002&&Math.abs(e.y)<.05;if(i.onGround=s,s){n.y=Jt,e.y=0;let r=Math.sqrt(e.x*e.x+e.z*e.z);if(r>0){let o=(bn.ROLL_A0+bn.ROLL_C*r*r)*t,a=r-o;a<.035?(e.x=0,e.z=0):(e.x*=a/r,e.z*=a/r)}i.spin.x=e.z/Jt,i.spin.z=-e.x/Jt,i.spin.y*=.96,i.sideSpin*=.9}else{e.y-=El*t;let r=e.len(),o=bn.AIR_DRAG*r*t;if(e.x-=e.x*o,e.y-=e.y*o,e.z-=e.z*o,i.sideSpin!==0){let a=bn.MAGNUS*i.sideSpin*t,l=e.x,c=e.z;e.x+=a*c,e.z-=a*l,i.sideSpin*=1-.3*t}i.spin.x*=1-.05*t,i.spin.y*=1-.05*t,i.spin.z*=1-.05*t}n.x+=e.x*t,n.y+=e.y*t,n.z+=e.z*t}function op(i,t){let e=i.pos,n=i.vel;if(e.y<Jt)if(e.y=Jt,n.y<-.9){let s=-n.y;n.y=s*bn.BOUNCE*(s>7?.92:1),n.x*=bn.BOUNCE_FRICTION,n.z*=bn.BOUNCE_FRICTION,i.sideSpin*=.6,t&&t.onBounce&&t.onBounce(i,s)}else n.y=0}function ip(i,t,e,n,s,r,o,a,l){let c=i.pos,h=i.vel;if(c.y<n-Jt||c.y>s+Jt)return!1;let d=c.x-t,u=c.z-e,p=ft(c.y,n,s),g=c.y-p,x=d*d+u*u+g*g,m=Jt+r;if(x>=m*m||x<1e-10)return!1;let f=Math.sqrt(x),M=d/f,y=g/f,v=u/f,b=m-f;c.x+=M*b,c.y+=y*b,c.z+=v*b;let S=h.x*M+h.y*y+h.z*v;return S<0&&(h.x-=(1+o)*S*M,h.y-=(1+o)*S*y,h.z-=(1+o)*S*v,h.x*=.92,h.z*=.92,h.y*=.95,i.sideSpin*=.3,i.version++,a&&a.onFrame&&-S>1.2&&a.onFrame(i,-S,l)),!0}function I_(i,t,e,n,s,r,o){let a=i.pos,l=i.vel,c=ft(a.z,-n,n),h=a.x-t,d=a.y-e,u=a.z-c,p=h*h+d*d+u*u,g=Jt+s;if(p>=g*g||p<1e-10)return!1;let x=Math.sqrt(p),m=h/x,f=d/x,M=u/x,y=g-x;a.x+=m*y,a.y+=f*y,a.z+=M*y;let v=l.x*m+l.y*f+l.z*M;return v<0&&(l.x-=(1+r)*v*m,l.y-=(1+r)*v*f,l.z-=(1+r)*v*M,l.x*=.93,l.z*=.93,i.version++,o&&o.onFrame&&-v>1.2&&o.onFrame(i,-v,"bar")),!0}function Nl(i){let t=ft(i/dt.H,0,1);return it.HL+dt.DEPTH+(dt.TOP_DEPTH-dt.DEPTH)*t}var nu=.42;function iu(i,t,e,n,s,r,o){let a=i.vel,l=a.x*t+a.y*e+a.z*n;if(l<0){let d=Math.min(1,(35+900*s)*r),u=-l*d;a.x+=t*u,a.y+=e*u,a.z+=n*u}else{let d=40*s*r;if(a.x+=t*d,a.y+=e*d,a.z+=n*d,l=a.x*t+a.y*e+a.z*n,l>1.2){let u=l-1.2;a.x-=t*u,a.y-=e*u,a.z-=n*u}}let c=1-Math.min(.5,4*r);if(a.x*=c,a.z*=c,s>nu){let d=s-nu;i.pos.x+=t*d,i.pos.y+=e*d,i.pos.z+=n*d}let h=i.net[o]||(i.net[o]={x:0,y:0,z:0,depth:0,nx:t,ny:e,nz:n,count:0});h.count++,s>=h.depth&&(h.x=i.pos.x,h.y=i.pos.y,h.z=i.pos.z,h.depth=Math.min(s,nu),h.nx=t,h.ny=e,h.nz=n),i.version++}function Dl(i,t,e,n,s){let r=i.pos,o=i.vel,a=it.HL,l=dt.HW,c=dt.H,h=dt.POST_R,d=r.x*t;if(d<a-1.5||d>a+dt.DEPTH+1)return;let u=t*(a-h);if(ip(i,u,l+h,0,c+h,h,.62,s,"post"),ip(i,u,-(l+h),0,c+h,h,.62,s,"post"),I_(i,u,c+h,l+h,h,.6,s),d<a-Jt)return;let p=Nl(r.y),g=i.crossing[e];if(g&&g.inMouth&&d>a||Math.abs(r.z)<l&&r.y<c&&d<p){let m=p-d;if(m<Jt){let M=(dt.TOP_DEPTH-dt.DEPTH)/dt.H,y=-t,v=M,b=Math.hypot(1,M);y/=b,v/=b,iu(i,y,v,0,(Jt-m)/b,n,e)}if(l-Math.abs(r.z)<Jt){let M=Math.sign(r.z)||1;iu(i,0,0,-M,Jt-(l-Math.abs(r.z)),n,e)}c-r.y<Jt&&d>a&&iu(i,0,-1,0,Jt-(c-r.y),n,e);let f=Nl(Math.min(r.y,c))+.45;d>f&&(r.x=t*f,o.x*t>0&&(o.x*=-.1)),Math.abs(r.z)>l+.45&&(r.z=Math.sign(r.z)*(l+.45),o.z*=-.1),r.y>c+.45&&(r.y=c+.45,o.y>0&&(o.y*=-.1))}else if(d>a-Jt&&d<p+Jt&&r.y<c+Jt){let m=Math.abs(r.z)-l;if(m>-Jt&&m<Jt&&d>a){let f=Math.sign(r.z)||1,M=Jt-m;r.z+=f*M,o.z*f<0&&(o.z=-o.z*.15,o.x*=.7,o.y*=.8,i.version++)}else if(r.y>c-Jt&&Math.abs(r.z)<l&&d>a&&d<p){let f=Jt-(r.y-c);f>0&&(r.y+=f,o.y<0&&(o.y=-o.y*.2,o.x*=.8,o.z*=.8,i.version++))}else if(d>p-Jt&&d<p+Jt&&Math.abs(r.z)<l&&r.y<c){let f=p+Jt-d;f>0&&(r.x+=t*f,o.x*t<0&&(o.x=-o.x*.15,i.version++))}}}function L_(i){let t=i.pos,e=i.vel;t.x>ln.HL-Jt&&(t.x=ln.HL-Jt,e.x>0&&(e.x=-e.x*.3)),t.x<-ln.HL+Jt&&(t.x=-ln.HL+Jt,e.x<0&&(e.x=-e.x*.3)),t.z>ln.HW-Jt&&(t.z=ln.HW-Jt,e.z>0&&(e.z=-e.z*.3)),t.z<-ln.HW+Jt&&(t.z=-ln.HW+Jt,e.z<0&&(e.z=-e.z*.3)),t.y>40&&(t.y=40,e.y>0&&(e.y=0))}function N_(i,t){for(let e=0;e<2;e++){let n=e===0?1:-1,s=t*n,r=i.pos.x*n;s<it.HL&&r>=it.HL?i.crossing[e]={z:i.pos.z,y:i.pos.y,inMouth:Math.abs(i.pos.z)<dt.HW&&i.pos.y<dt.H}:r<it.HL-.5&&(i.crossing[e]=null)}}function ap(i,t,e){if(i.prevPos.copy(i.pos),i.prevQ[0]=i.q[0],i.prevQ[1]=i.q[1],i.prevQ[2]=i.q[2],i.prevQ[3]=i.q[3],i.state==="held"||i.state==="dead"){sp(i,t);return}let n=i.vel.len(),s=Math.min(10,Math.max(1,Math.ceil(n*t/.06))),r=t/s;for(let o=0;o<s;o++){let a=i.pos.x;rp(i,r),op(i,e),Dl(i,1,0,r,e),Dl(i,-1,1,r,e),L_(i),N_(i,a),e&&e.bodies&&e.bodies(i,r)}!i.pos.isFinite()||!i.vel.isFinite()?(i.pos.copy(i.lastValid),i.vel.set(0,0,0),i.version++):i.lastValid.copy(i.pos),i.pos.y>Jt+.03||i.vel.y>.2?i.state==="free"&&(i.state="air"):i.state==="air"&&(i.state="free"),sp(i,t)}function sp(i,t){let e=i.spin,n=i.q,s=.5*t*e.x,r=.5*t*e.y,o=.5*t*e.z,a=n[0],l=n[1],c=n[2],h=n[3];n[0]=a+(s*h+r*c-o*l),n[1]=l+(r*h+o*a-s*c),n[2]=c+(o*h+s*l-r*a),n[3]=h-(s*a+r*l+o*c);let d=Math.hypot(n[0],n[1],n[2],n[3])||1;n[0]/=d,n[1]/=d,n[2]/=d,n[3]/=d}var xr=class{constructor(t=200,e=1/60){this.steps=t,this.step=e,this.pts=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.count=0,this.t0=0,this.ghost=new Qi}compute(t,e){let n=this.ghost;n.pos.copy(t.pos),n.vel.copy(t.vel),n.sideSpin=t.sideSpin,n.state="free",n.spin.set(0,0,0),n.net[0]=n.net[1]=null,this.t0=e;let s=2,r=this.step/s,o=0;for(;o<this.steps;o++){this.pts[o*3]=n.pos.x,this.pts[o*3+1]=n.pos.y,this.pts[o*3+2]=n.pos.z,this.vel[o*3]=n.vel.x,this.vel[o*3+1]=n.vel.y,this.vel[o*3+2]=n.vel.z;for(let a=0;a<s;a++)rp(n,r),op(n,null),Dl(n,1,0,r,null),Dl(n,-1,1,r,null);if(n.vel.x===0&&n.vel.z===0&&n.pos.y<=Jt+.001){o++;break}}return this.count=o,this}at(t,e){let n=t/this.step;n<=0&&(n=0);let s=Math.floor(n);if(s>=this.count-1){let l=(this.count-1)*3;return e.set(this.pts[l],this.pts[l+1],this.pts[l+2])}let r=n-s,o=s*3,a=o+3;return e.set(this.pts[o]+(this.pts[a]-this.pts[o])*r,this.pts[o+1]+(this.pts[a+1]-this.pts[o+1])*r,this.pts[o+2]+(this.pts[a+2]-this.pts[o+2])*r)}velAt(t,e){let n=Math.floor(Math.max(0,t)/this.step);return n>this.count-1&&(n=this.count-1),e.set(this.vel[n*3],this.vel[n*3+1],this.vel[n*3+2])}get duration(){return(this.count-1)*this.step}};var go=new ot,Fw=new ot;function ru(i){return ft(6.2+i*.15,6.5,11.5)}function ci(i,t,e,n,s,r,o=12,a=null){let l=n-t,c=s-e,h=Math.hypot(l,c);if(h<.01)return 1;let d=l/h,u=c/h,p=0,g=i.players;for(let x=0;x<g.length;x++){let m=g[x];if(m.team===r||m===a||i.time<m.downUntil)continue;let f=m.pos.x-t,M=m.pos.z-e,y=f*d+M*u,v=Math.abs(f*u-M*d);if(y>-.4&&y<.9&&v<.9){p=Math.max(p,.9);continue}if(y<.6||y>h+1.2)continue;let b=m.isGK?1.5:.95,S=Math.min(y,h)/o,E=Math.max(0,v-b)/6.2+.22,_=ft((S-E+.3)/.55,0,1);_>p&&(p=_)}return 1-p}function yr(i,t,e,n=.75,s=0){e.set(t.pos.x,0,t.pos.z);let r=0;for(let o=0;o<3;o++){let a=Math.hypot(e.x-i.x,e.z-i.z),l=ru(a)+s,c=Math.min(26,Ul(a,l));r=su(c,l),e.x=t.pos.x+t.vel.x*r*n,e.z=t.pos.z+t.vel.z*r*n}return wi(e,.8),r}function wi(i,t=.5){return i.x=ft(i.x,-it.HL+t,it.HL-t),i.z=ft(i.z,-it.HW+t,it.HW-t),i}function cp(i,t,e,n,s=.72){let r=lp(i,t,e,n,s);return!r&&s>=1&&(r=lp(i,t,e,null,1.6)),r}function lp(i,t,e,n,s){let r=null,o=-1/0,a=-1/0;for(let l of i.players){if(l===t||l.team!==t.team||i.time<l.downUntil)continue;yr(t.pos,l,go,.6);let c=go.x-t.pos.x,h=go.z-t.pos.z,d=Math.hypot(c,h);if(d<2.2||d>48)continue;let u=Math.abs(ji(e,Math.atan2(c,h)));if(u>s)continue;let p=1-u/s,g=d<5?.55:d<26?1-Math.abs(d-14)/30:Math.max(0,.6-(d-26)/30),x=ci(i,t.pos.x,t.pos.z,go.x,go.z,t.team,12),m=p*p*1.8+g*.45+x*(s>.9?1.1:.8);l.isGK&&(m-=.7),l===n&&(m+=.3,a=m),m>o&&(o=m,r=l)}return n&&r!==n&&a>-1/0&&o<a+.12&&(r=n),!r||o<.35?null:r}function vr(i,t,e,n){let s=t.x-i.x,r=t.z-i.z,o=Math.hypot(s,r),a=ft(Ul(o,e),4,27);return n.set(s/o*a,0,r/o*a),a}function hp(i,t){let e=1.5,n=12;for(let s=0;s<24;s++){let r=(e+n)/2;su(Ul(i,r),r)>t?e=r:n=r}return(e+n)/2}var Si=new Qi;function up(i,t,e,n,s,r,o,a,l){Si.pos.set(i,t,e),Si.vel.set(n,s,r),Si.sideSpin=o;let c=1/120,h=0;for(;h<a;){let d=Si.vel;d.y-=El*c;let u=d.len(),p=bn.AIR_DRAG*u*c;if(d.x-=d.x*p,d.y-=d.y*p,d.z-=d.z*p,Si.pos.addScaled(d,c),h+=c,l&&l(Si.pos,h)||Si.pos.y<ye)return h}return h}function Fl(i,t,e,n,s){let r=e.x-i.x,o=e.z-i.z,a=Math.hypot(r,o),l=r/a,c=o/a,h=Math.cos(n),d=Math.sin(n),u=3,p=40;for(let x=0;x<22;x++){let m=(u+p)/2;up(i.x,t,i.z,l*h*m,d*m,c*h*m,0,6,null),Math.hypot(Si.pos.x-i.x,Si.pos.z-i.z)<a?u=m:p=m}let g=(u+p)/2;return s.set(l*h*g,d*g,c*h*g),g}function dp(i,t,e,n,s,r,o){let a=n-i,l=r-e,c=Math.hypot(a,l),h=a/c,d=l/c,u=-.25,p=.75;for(let g=0;g<20;g++){let x=(u+p)/2,m=-100;up(i,t,e,h*Math.cos(x)*o,Math.sin(x)*o,d*Math.cos(x)*o,0,3,f=>(f.x-i)*h+(f.z-e)*d>=c?(m=f.y,!0):!1),m===-100&&(m=-1),m<s?u=x:p=x}return(u+p)/2}var D_=new xr(240,1/60),Ol=new Qi;function fp(i,t,e,n){Ol.pos.copy(i),Ol.vel.copy(t),Ol.sideSpin=e||0;let s=D_.compute(Ol,0),r=s.pts;for(let o=1;o<s.count;o++){let a=r[(o-1)*3]*n,l=r[o*3]*n;if(a<it.HL&&l>=it.HL){let c=(it.HL-a)/(l-a||1),h=r[(o-1)*3+2]+(r[o*3+2]-r[(o-1)*3+2])*c,d=r[(o-1)*3+1]+(r[o*3+1]-r[(o-1)*3+1])*c;return Math.abs(h)<dt.HW&&d<dt.H}}return!1}function ou(i,t,e){let n=e*it.HL,s=Math.atan2(dt.HW-t,Math.abs(n-i)),r=Math.atan2(-dt.HW-t,Math.abs(n-i));return Math.abs(s-r)}var U_={pass:.11,through:.12,shot:.085,cross:.17,lob:.15,clear:.13,throw:.32,gkthrow:.32,gkkick:.36,touch:.05},O_={shot:.34,pass:.26,through:.26,cross:.3,lob:.3,clear:.3,throw:.35,gkthrow:.35,gkkick:.45},Hl=new Set(["pass","through","cross","lob","throw","gkthrow","gkkick"]),kl=new ot,Gw=new ot,Ww=new ot;function pp(i,t,e=0){let n=t.pos.x-i.pos.x,s=t.pos.z-i.pos.z,r=Math.sqrt(n*n+s*s);return!(r>1.1+e||t.pos.y>1||r>.8&&n*Math.sin(i.yaw)+s*Math.cos(i.yaw)<-.2)}function au(i,t,e=.7){let n=i.ball;if(pp(t,n))return 0;if(n.state==="held"||n.state==="dead"||n.owner&&n.owner!==t)return null;let s=i.traj,r=1/60;for(let o=r;o<=e;o+=r){s.at(o+(i.time-s.t0),kl);let a=t.pos.x+t.vel.x*o*.8,l=t.pos.z+t.vel.z*o*.8;if(Math.hypot(kl.x-a,kl.z-l)<.95&&kl.y<.95)return o}return null}function F_(i,t){let e=t.pos.x-i.pos.x,n=t.pos.z-i.pos.z,s=e*Math.cos(i.yaw)-n*Math.sin(i.yaw);return s>.25?"L":s<-.25?"R":i.foot||"R"}function ts(i,t){if(i.time<t.downUntil)return!1;let e=t.action;return e?e.type==="kick"&&e.contacted?e.t>e.contactT+.1:e.type==="tackle"?e.t>.4:!1:!0}function he(i,t,e,n={}){let s=n.minContact??U_[e]??.12,r={type:"kick",kind:e,t:0,charging:!!n.charging,holdT:0,charge:n.charge??0,minContact:s,deadline:n.deadline??s+.75,contacted:!1,contactT:0,follow:O_[e]??.28,target:n.target||null,point:n.point?new ot().copy(n.point):null,aimYaw:n.aimYaw??t.yaw,aimPitch:n.aimPitch??0,power:n.power??.6,elev:n.elev??null,firstTime:!!n.firstTime,restart:n.restart||null,foot:F_(t,i.ball),eta:s,fromHands:e==="throw"||e==="gkthrow"||e==="gkkick",ai:!!n.ai,owned:i.ball.owner===t};return t.action=r,r}function Ms(i){if(!i||!i.charging)return;i.charging=!1;let t=i.kind==="shot"?.085:.02;i.minContact=Math.max(i.minContact,i.t+t),i.deadline=i.minContact+.6}function mp(i){let t=i.action;if(!t)return 1/0;let e=i.jogSpeed();return t.type==="kick"?t.fromHands?t.contacted?e*.5:1.2:t.contacted?e*.85:t.kind==="shot"&&t.charging?e*.7:t.inReach?e*.85:1/0:t.type==="tackle"?t.t<.32?t.lunge||4.2:2.2:t.type==="slide"?t.sliding?1/0:.4:(t.type==="celebrate",1/0)}function k_(i,t,e){return e.kind==="shot"?e.aimYaw:e.target?Kt(e.target.pos.x-t.pos.x,e.target.pos.z-t.pos.z):e.point?Kt(e.point.x-t.pos.x,e.point.z-t.pos.z):e.aimYaw}function gp(i,t,e){let n=t.action;if(n)switch(n.t+=e,n.type){case"kick":z_(i,t,n,e);break;case"tackle":W_(i,t,n,e);break;case"slide":X_(i,t,n,e);break;case"celebrate":n.t>n.dur&&(t.action=null);break;case"stumble":n.t>n.dur&&(t.action=null);break;case"dive":break;default:n.dur&&n.t>n.dur&&(t.action=null)}}function z_(i,t,e,n){let s=i.ball;if(e.charging&&(e.holdT+=n,e.kind==="shot"?(e.charge=Math.min(1,e.holdT/.65),e.holdT>=.85&&Ms(e)):(e.charge=Math.min(1,Math.max(0,e.holdT-.1)/.3),e.holdT>=.4&&Ms(e))),e.contacted)e.t>e.contactT+e.follow&&(t.action=null,t.faceYaw=null);else{if(t.faceYaw=k_(i,t,e),e.owned&&!e.restart&&s.owner!==t&&s.lastTouch!==t){t.action=null,t.faceYaw=null;return}let r=!s.owner||s.owner===t,o=e.restart?!0:e.fromHands?s.state==="held"&&s.owner===t:s.state!=="held"&&s.state!=="dead",a=e.fromHands||e.restart?!0:pp(t,s);if(e.inReach=a,e.charging||(e.eta=Math.max(0,e.minContact-e.t)),!e.charging&&e.t>=e.minContact&&r&&o&&a){e.contacted=!0,e.contactT=e.t,H_(i,t,e);return}if(!e.fromHands&&!e.restart&&r&&o&&!e.charging){let l=s.pos.x+s.vel.x*.15,c=s.pos.z+s.vel.z*.15,h=t.pos.x-l,d=t.pos.z-c,u=Math.hypot(h,d)||1;h=h/u*.7-Math.sin(t.faceYaw)*.3,d=d/u*.7-Math.cos(t.faceYaw)*.3;let p=Math.hypot(h,d)||1,g=l+h/p*.45,x=c+d/p*.45,m=g-t.pos.x,f=x-t.pos.z,M=Math.hypot(m,f);if(M<4){let y=Math.min(8,M*6)/(M||1);t.desired.x=m*y+s.vel.x,t.desired.z=f*y+s.vel.z}}!e.charging&&e.t>e.deadline&&(e.contacted=!0,e.missed=!0,e.contactT=e.t,i.events.emit("whiff",{player:t,kind:e.kind,t:i.time}))}}function zl(i){return i.gauss()}function B_(i,t){let e=99;for(let n of i.players){if(n.team===t.team)continue;let s=n.pos.distXZ(t.pos);s<e&&(e=s)}return ft((2.4-e)/2.4,0,1)}function Bl(i,t){let e=Math.cos(t),n=Math.sin(t),s=i.x*e+i.z*n,r=-i.x*n+i.z*e;return i.x=s,i.z=r,i}function H_(i,t,e){let n=i.ball,s=i.rng,r=new ot,o=0,a=e.point?e.point.clone():null,l=i.attackDir(t.team),c=t.isHuman,h=c?i.assist:null,d=!c&&i.isOpp(t)?i.aiParams[t.team]:null,u=ft(t.speed/7.5,0,1),p=B_(i,t),g=!1,x=e.target,m=n.pos;e.kind==="throw"?n.pos.set(t.pos.x+Math.sin(t.yaw)*.25,2.05,t.pos.z+Math.cos(t.yaw)*.25):e.kind==="gkthrow"?n.pos.set(t.pos.x+Math.sin(t.yaw)*.6,.35,t.pos.z+Math.cos(t.yaw)*.6):e.kind==="gkkick"&&n.pos.set(t.pos.x+Math.sin(t.yaw)*.55,.7,t.pos.z+Math.cos(t.yaw)*.55),m=n.pos;let f=E=>{let _;return E==="shot"?_=(.011+(100-t.attrs.finishing)*45e-5)*(1+.45*u+.6*p):_=(.004+(100-t.attrs.passing)*22e-5)*(1+.35*u+.45*p),c&&h&&(_*=E==="shot"?h.shotError:h.passError),d&&(_*=E==="shot"?d.shotErr:d.passErr),e.foot!==t.foot&&(_*=1.12),_};switch(e.kind){case"pass":case"gkthrow":{if(x){a=new ot,yr(m,x,a,x.isGK?0:.75,e.charge*3);let E=m.distXZ(a),_=x.isGK?3.5:ru(E)+e.charge*4.5;c&&h.autoLob&&e.kind==="pass"&&!e.restart&&E>7&&!x.isGK&&ci(i,m.x,m.z,a.x,a.z,t.team,12)<.45?(Fl(m,m.y,a,ft(.42+E*.006,.42,.62),r),e.lofted=!0):vr(m,a,_,r)}else{let E=(e.kind==="gkthrow"?18:11)+e.charge*18;a=a||new ot(m.x+Math.sin(e.aimYaw)*E,0,m.z+Math.cos(e.aimYaw)*E),wi(a,.6),vr(m,a,2.4,r)}Bl(r,zl(s)*f("pass")),e.kind==="gkthrow"&&(r.y=-.5);break}case"through":{if(x){a=V_(i,x,a);let E=a.distXZ(x.pos)/x.sprintSpeed()+.28,_=m.distXZ(a);if(ci(i,m.x,m.z,a.x,a.z,t.team,11)<.4&&_>12)Fl(m,m.y,a,.62,r);else{let C=ft(hp(_,E),2.6,10);vr(m,a,C,r)}}else a=new ot(m.x+Math.sin(e.aimYaw)*17,0,m.z+Math.cos(e.aimYaw)*17),wi(a,1),vr(m,a,3.2,r);Bl(r,zl(s)*f("pass"));break}case"cross":case"lob":case"clear":case"gkkick":case"throw":{!a&&x&&(a=new ot,yr(m,x,a,.6)),a||(a=new ot(m.x+Math.sin(e.aimYaw)*25,0,m.z+Math.cos(e.aimYaw)*25)),wi(a,.5);let E=e.elev??(e.kind==="cross"?.4:e.kind==="clear"?.6:e.kind==="throw"?.42:e.kind==="gkkick"?.55:.5),_=Fl(m,m.y,a,E,r);e.kind==="throw"&&_>15.5&&r.scale(15.5/_),Bl(r,zl(s)*f("pass")*1.2),r.y*=1+zl(s)*.03;break}case"shot":{let E=G_(i,t,e,r,f("shot"));o=E.spin,a=E.point;break}case"touch":{a=new ot(m.x+Math.sin(e.aimYaw)*4,0,m.z+Math.cos(e.aimYaw)*4),vr(m,a,2,r);break}}if(d&&Hl.has(e.kind)&&e.kind!=="throw"&&s.next()<d.mistake){Bl(r,(s.next()<.5?-1:1)*(.1+s.next()*.22));let E=s.next()<.6?.55+s.next()*.2:1.18+s.next()*.2;r.x*=E,r.z*=E,r.y>0&&(r.y*=Math.sqrt(E)),e.mishit=!0}e.kind==="shot"&&(g=fp(m,r,o,l));let M=r.len(),y=r.x/(M||1),v=r.z/(M||1),b=r.y>3,S=(b?-1:1)*M/ye*(b?.35:.6);n.spin.set(v*S,(o||0)*2,-y*S),n.sideSpin=o||0,i.applyKick(t,r,e,{point:a,target:x,onTarget:g})}function V_(i,t,e){let n=i.attackDir(t.team),s=n,r=0,o=t.speed;o>1.5&&t.vel.x*n>0&&(s+=t.vel.x/o*.9,r+=t.vel.z/o*.9),Math.abs(t.pos.z)>11&&(r-=Math.sign(t.pos.z)*.35);let a=Math.hypot(s,r);s/=a,r/=a;let l=9;for(let d of i.players){if(d.team===t.team||d.isGK)continue;let u=d.pos.x-t.pos.x,p=d.pos.z-t.pos.z,g=u*s+p*r,x=Math.abs(u*r-p*s);g>0&&x<4&&(l=Math.min(l,g+1.5))}let c=ft(l,4.5,9),h=e?e.clone():new ot(t.pos.x+s*c,0,t.pos.z+r*c);return h.x=ft(h.x,-it.HL+1.5,it.HL-1.5),h.z=ft(h.z,-it.HW+1.5,it.HW-1.5),h}function G_(i,t,e,n,s){let r=i.ball,o=i.rng,a=i.attackDir(t.team),l=a*it.HL,c=t.isHuman?i.assist.shotAim:0,h;if(e.ai&&e.point)h=e.point.clone();else{let v=t.pos.x,b=t.pos.z,S=Math.cos(e.aimPitch),E=Math.sin(e.aimYaw)*S,_=Math.sin(e.aimPitch),A=Math.cos(e.aimYaw)*S;if(E*a>.25&&(l-v)*a>1){let P=(l-v)/E;h=new ot(l,1.65+_*P,b+A*P);let N=Math.abs(h.z),k=dt.HW-.4;if(N>k&&N<dt.HW+1.8){let I=N-k,z=c*.6*ft(1-(N-dt.HW)/1.8,0,1);h.z-=Math.sign(h.z)*I*z}h.y>dt.H-.3&&h.y<dt.H+1.3&&(h.y-=(h.y-(dt.H-.35))*c*.45),h.y=ft(h.y,ye,4.5)}else h=new ot(v+E*22,ft(1.65+_*22,ye,7),b+A*22)}let d=e.ai?e.power:e.charge,u=mo(15.5,29,Math.pow(ft(d,0,1),.85))*(.86+t.attrs.finishing*.0028);h.y+=d*d*.3;let p=Math.atan2(h.x-r.pos.x,h.z-r.pos.z),g=dp(r.pos.x,r.pos.y,r.pos.z,h.x,h.y,h.z,u);g=ft(g,-.12,.62);let x=Math.abs(ji(t.yaw,p))/Math.PI,m=s*(1+x*.8)*(.75+.45*d);p+=o.gauss()*m,g+=o.gauss()*m*.55;let f=Math.cos(g);return n.set(Math.sin(p)*f*u,Math.sin(g)*u,Math.cos(p)*f*u),{spin:o.gauss()*4,point:h}}function Vl(i,t){let e=i.time;if(e<t.tackleReadyAt||!ts(i,t))return!1;let n=i.ball,s=t.yaw,r=n.pos.distXZ(t.pos),o=t.isHuman&&r<3.4&&n.state!=="held"&&n.state!=="dead";(r<2.6||o)&&(s=Kt(n.pos.x+n.vel.x*.15-t.pos.x,n.pos.z+n.vel.z*.15-t.pos.z));let a=o?ft((r-.5)/.26+1.5,4.2,7.5):4.2;return t.action={type:"tackle",t:0,dir:s,done:!1,dur:.5,victims:new Set,homing:o,lunge:a},t.tackleReadyAt=e+ve.TACKLE_COOLDOWN,t.faceYaw=s,i.events.emit("tackleAttempt",{player:t,t:e}),!0}function W_(i,t,e,n){let s=i.ball,r=i.time;e.homing&&!e.done&&e.t<.2&&(e.dir=Kt(s.pos.x+s.vel.x*.1-t.pos.x,s.pos.z+s.vel.z*.1-t.pos.z)),t.faceYaw=e.dir;let o=Math.sin(e.dir),a=Math.cos(e.dir);e.t<(e.homing?.28:.22)&&(t.desired.x=o*e.lunge,t.desired.z=a*e.lunge);let l=e.homing?.04:.07,c=e.homing?.36:.3;if(!e.done&&e.t>=l&&e.t<=c){let h=e.homing?1.2:1.05,d=e.homing?.38:.3,u=t.pos.x+o*.2,p=t.pos.z+a*.2,g=t.pos.x+o*h,x=t.pos.z+a*h,m=Yn(s.pos.x,s.pos.z,u,p,g,x),f=s.owner;if(m.d<d+ye&&s.pos.y<.6&&s.state!=="held"&&s.state!=="dead"){if(e.done=!0,e.contactT=e.t,t.touch={foot:"R",time:r,x:s.pos.x,y:s.pos.y,z:s.pos.z,kind:"tackle"},f&&f.team!==t.team){let M=s.pos.x-f.pos.x,y=s.pos.z-f.pos.z,v=Math.hypot(M,y)||1,b=t.pos.x-s.pos.x,S=t.pos.z-s.pos.z,E=Math.hypot(b,S)||1,_=(M*b+y*S)/(v*E),A=.56+(t.attrs.tackling-f.attrs.control)*.007+_*.26-ft(f.speed/8,0,1)*.1;!t.isHuman&&i.aiParams[t.team]&&(A+=i.aiParams[t.team].tackleBonus),t.isHuman&&(A+=i.assist.tackle),f.isHuman&&(A-=i.assist.oppProtect),A=ft(A,f.isHuman?.1:.18,t.isHuman?.96:.93);let C=i.rng.next()<A;if(C&&t.isHuman){let P=(i.rng.next()-.5)*.6;i.dislodge(f,t,new ot(-o*1.3+a*P,0,-a*1.3-o*P)),e.dur=Math.min(e.dur,e.t+.08)}else if(C){let P=i.rng.next()<.5?-1:1,N=-o*.2+a*P*.6+M/v*.5,k=-a*.2-o*P*.6+y/v*.5,I=Math.hypot(N,k)||1,z=2.2+i.rng.next()*1.8;i.dislodge(f,t,new ot(N/I*z,0,k/I*z))}else i.events.emit("tackle",{player:t,victim:f,success:!1,t:r}),f.stumbleUntil=Math.max(f.stumbleUntil,r+.15)}else if(!f||f===t)if(t.isHuman)s.setVelocity(new ot(t.vel.x*.7,0,t.vel.z*.7)),s.state="free",s.owner=null,i.touchBall(t,"poke"),e.dur=Math.min(e.dur,e.t+.05);else{let M=Math.max(3,s.speed*.3);s.setVelocity(new ot(o*M,0,a*M)),s.state="free",s.owner=null,i.touchBall(t,"poke")}}else if(f&&f.team!==t.team&&!e.victims.has(f)&&Yn(f.pos.x,f.pos.z,u,p,g,x).d<.42){e.victims.add(f);let v=Math.cos(f.yaw)*(t.pos.z-f.pos.z)+Math.sin(f.yaw)*(t.pos.x-f.pos.x)<-.2?.6:.18;i.rng.next()<v&&i.foul(t,f,!1)}}e.t>e.dur&&(t.action=null,t.faceYaw=null)}function Gl(i,t){let e=i.time;if(e<t.slideReadyAt||!ts(i,t)||t.stamina<.06)return!1;let n=t.yaw;t.speed>1.2?n=Kt(t.vel.x,t.vel.z):t.desired.lenXZ()>.5&&(n=Kt(t.desired.x,t.desired.z));let s=Math.max(t.speed+1.2,6.3);return t.action={type:"slide",t:0,dir:n,speed0:s,sliding:!0,ballFirst:!1,victims:new Set,dur:1.05},t.slideReadyAt=e+ve.SLIDE_COOLDOWN,t.stamina=Math.max(0,t.stamina-.07),i.events.emit("slide",{player:t,t:e}),!0}function X_(i,t,e,n){let s=i.ball,r=i.time,o=Math.sin(e.dir),a=Math.cos(e.dir);if(t.faceYaw=e.dir,t.yaw=e.dir,e.sliding){let l=ft(1-e.t/.68,0,1),c=e.speed0*Math.pow(l,.8);t.vel.set(o*c,0,a*c),e.t>.62&&(e.sliding=!1,t.vel.set(o*.4,0,a*.4))}else t.desired.set(0,0,0);if(e.t>.04&&e.t<.62){let l=t.pos.x+o*.2,c=t.pos.z+a*.2,h=t.pos.x+o*1.1,d=t.pos.z+a*1.1;if(!e.ballDone&&s.state!=="held"&&s.state!=="dead"&&s.pos.y<.5&&Yn(s.pos.x,s.pos.z,l,c,h,d).d<.28+ye&&s.owner!==t){e.ballDone=!0,e.ballFirst=!0;let p=s.owner,g=i.rng.next()<.5?-1:1,x=Math.max(4.5,s.speed*.35),m=new ot((o+a*g*.25)*x,.4,(a-o*g*.25)*x);t.touch={foot:"R",time:r,x:s.pos.x,y:s.pos.y,z:s.pos.z,kind:"slide"},p&&p.team!==t.team?i.dislodge(p,t,m,!0):(s.owner=null,s.state="free",s.setVelocity(m),i.touchBall(t,"slide"))}for(let u of i.players){if(u===t||u.team===t.team||e.victims.has(u))continue;Yn(u.pos.x,u.pos.z,t.pos.x,t.pos.z,h,d).d<.42&&(e.victims.add(u),e.ballFirst?i.rng.next()<.5&&(u.stumbleUntil=r+.5):i.rng.next()<.85?i.foul(t,u,!0):u.downUntil=r+.7)}}e.t>e.dur&&(t.action=null,t.faceYaw=null)}var Oe=new ot;function cu(i,t,e,n,s=0){let r=i.ownGoalX(t.team);return Math.sign(e)===Math.sign(r)&&Math.abs(e-r)<Yt.PEN_D+s&&Math.abs(n)<Yt.PEN_HW+s&&Math.abs(e)<=it.HL+.5}function yp(i,t,e){return!t.isGK||i.phase!=="playing"||e.owner||e.state==="held"||e.state==="dead"||i.time<t.downUntil||i.time<t.noCaptureUntil?!1:cu(i,t,e.pos.x,e.pos.z,.3)}function Wl(i,t,e){let n=t.action;if(n&&n.type==="dive"){let o=Math.max(0,n.t-n.delay),a=ft(o/n.flight,0,1),l=mo(1.25,n.handY,ft(o/(n.flight*.55),0,1)),c=mo(1,ft(n.handY*.7,.25,1.5),ft(o/(n.flight*.5),0,1)),h=.45+.45*Math.min(1,a*1.6);return e.ax=t.pos.x-n.dirX*.35,e.ay=c,e.az=t.pos.z-n.dirZ*.35,e.bx=t.pos.x+n.dirX*h,e.by=l,e.bz=t.pos.z+n.dirZ*h,e.r=.2,e.diving=!0,e}let s=Math.sin(t.yaw),r=Math.cos(t.yaw);return e.ax=t.pos.x+s*.12,e.ay=.05,e.az=t.pos.z+r*.12,e.bx=e.ax,e.by=2.15,e.bz=e.az,e.r=t.ai.set?.42:.34,e.diving=!1,e}function vp(i,t,e,n){let s=n.bx-n.ax,r=n.by-n.ay,o=n.bz-n.az,a=s*s+r*r+o*o,l=a>1e-9?((i-n.ax)*s+(t-n.ay)*r+(e-n.az)*o)/a:0;l=ft(l,0,1);let c=n.ax+s*l,h=n.ay+r*l,d=n.az+o*l;return{d:Math.hypot(i-c,t-h,e-d),t:l,cx:c,cy:h,cz:d}}var es={};function _p(i,t,e){Wl(i,t,es);let n=vp(e.pos.x,e.pos.y,e.pos.z,es);if(n.d>es.r+ye)return!1;let s=i.time,r=e.speed,o=12.5+t.keeping*.09;es.diving&&(o-=3.5),e.pos.y>1.9&&(o-=3);let a=n.d/(es.r+ye),l=i.attackDir(t.team),c=e.lastKick,h=c&&c.kind==="shot"&&c.team!==t.team?c:null;if(t.touch={foot:"H",time:s,x:e.pos.x,y:e.pos.y,z:e.pos.z,kind:"save"},e.lastTouch=t,e.lastTouchTime=s,r<o&&a<.92&&i.rng.next()>(r/o-.75)*1.4)return e.owner=t,e.state="held",e.vel.set(0,0,0),e.spin.set(0,0,0),e.version++,t.hold="gk",t.ai.holdStart=s,t.ai.state="hold",i.possTeam=t.team,i.passIntent=null,i.events.emit("save",{player:t,caught:!0,speed:r,shot:h,t:s}),i.events.emit("possession",{player:t,team:t.team,prev:null,cause:"catch",t:s}),!0;let d=Math.sign(e.pos.z-t.pos.z)||(i.rng.next()<.5?-1:1);if(r>o+9&&a>.8)e.vel.x*=.62,e.vel.z+=d*2.2,e.vel.y+=1;else{let u=2+r*.22;e.vel.set(l*u*(.5+i.rng.next()*.5),1.2+i.rng.next()*2.4,d*(2.5+r*.22))}return e.state="air",e.version++,t.noCaptureUntil=s+.3,i.events.emit("save",{player:t,caught:!1,speed:r,shot:h,t:s}),!0}function lu(i,t,e,n,s,r=.07){let o=e-t.pos.z,a=n-t.pos.x,l=Math.abs(o),c=Math.sign(o)||1,h=ft(a,-.8,.8)*.3,d=Math.hypot(c,h),u=ft(l-.35,.3,1.95+t.keeping*.004);t.action={type:"dive",t:0,delay:r,flight:.56-t.keeping*8e-4,dist:u,dirX:h/d,dirZ:c/d,handY:ft(s,.15,2.3),dur:1.25},t.yaw=Kt(i.attackDir(t.team),0),i.events.emit("dive",{player:t,t:i.time})}function $_(i,t,e,n){let s=e.t-e.delay;if(s<0){t.vel.set(0,0,0);return}if(s<e.flight){let o=2*e.dist/e.flight*(1-s/e.flight);t.vel.set(e.dirX*o,0,e.dirZ*o)}else t.vel.set(0,0,0);let r=i.ball;if(r.owner&&r.owner.team!==t.team&&s>0&&s<e.flight&&!e.smotherDone&&(Wl(i,t,es),vp(r.pos.x,r.pos.y,r.pos.z,es).d<es.r+ye+.1&&(e.smotherDone=!0,i.rng.next()<.5+t.keeping*.004))){let a=i.attackDir(t.team);i.dislodge(r.owner,t,new ot(a*2.5,.5,e.dirZ*3))}e.t>e.dur&&(t.action=null,t.ai.set=!1)}function xp(i,t,e,n){let s=i.traj,r=i.time-s.t0,o=s.pts;for(let a=1;a<s.count;a++){let l=a*s.step-r;if(l<0)continue;if(l>n)break;let c=o[(a-1)*3],h=o[a*3];if((t-c)*e>0&&(t-h)*e<=0){let d=(c-t)/(c-h||1e-6);return{t:l-s.step*(1-d),y:o[(a-1)*3+1]+(o[a*3+1]-o[(a-1)*3+1])*d,z:o[(a-1)*3+2]+(o[a*3+2]-o[(a-1)*3+2])*d}}}return null}function bp(i,t,e,n){let s=i.ball,r=i.time,o=t.ai,a=i.attackDir(t.team),l=-a*it.HL;if(t.sprint=!1,t.faceYaw=null,t.action&&t.action.type==="dive"){$_(i,t,t.action,e),t.desired.set(0,0,0);return}if(r<t.downUntil){t.desired.set(0,0,0);return}if(s.state==="held"&&s.owner===t){let b=r-(o.holdStart??r),S=l+a*(Yt.PEN_D-2);Oe.set(S,0,ft(t.pos.z,-6,6)),Ss(t,Oe,1.6),t.faceYaw=Kt(a,0),!t.action&&(b>n.gkHold||b>ve.GK_MAX_HOLD-.4||b>.8&&Y_(i,t))&&K_(i,t,n);return}if(i.phase!=="playing")return;let c=s.lastKick,h=!s.owner&&s.vel.x*-a>2.5;s.version!==o.seenVersion&&(o.seenVersion=s.version,o.reactAt=r+n.gkReaction*(.9+i.rng.next()*.25),c&&c.restart==="penalty"&&c.team!==t.team&&r-c.t<.05&&(o.reactAt=r+.12,o.penalty=!0));let d=t.pos.x,u=null;if(h){let b=xp(i,l,-a,2.4);b&&Math.abs(b.z)<dt.HW+.6&&b.y<dt.H+.4&&(u=xp(i,d+a*.05,-a,2.4)||b,Math.abs(s.pos.x-l)<Math.abs(d-l)+.2&&(u=b))}if(u){if(o.set=!0,t.faceYaw=Kt(s.pos.x-t.pos.x,s.pos.z-t.pos.z),r<o.reactAt){t.desired.set(0,0,0);return}let b=u.z-t.pos.z,S=Math.abs(b);if(o.penalty){o.penalty=!1;let _=i.rng.next()<.55?u.z:-Math.sign(u.z||1)*2;if(Math.abs(_-t.pos.z)>.6){lu(i,t,_,t.pos.x,u.y,.02);return}}S<.5&&u.y<2.1?(Oe.set(t.pos.x,0,u.z),Ss(t,Oe,3)):S-.5<3*Math.max(0,u.t-.12)&&u.y<1.9&&u.t>.35?(Oe.set(t.pos.x,0,u.z),t.sprint=!0,Ss(t,Oe,5)):u.t<1.4&&lu(i,t,u.z,t.pos.x+a*.2,u.y);return}o.set=!1;let p=i.passIntent;if(p&&p.target===t&&!s.owner&&r-p.t<4){let b=i.traj;for(let S=.05;S<3&&(b.at(S+(r-b.t0),Oe),!(t.pos.distXZ(Oe)/5.5<=S));S+=.05);Ss(t,Oe,5.5),t.sprint=!0,t.faceYaw=Kt(s.pos.x-t.pos.x,s.pos.z-t.pos.z);return}if(!s.owner&&s.state!=="held"&&s.state!=="dead"){let b=i.traj,S=null;for(let E=.1;E<2.5;E+=.1){if(b.at(E+(r-b.t0),Oe),!cu(i,t,Oe.x,Oe.z,-.5))continue;if(t.pos.distXZ(Oe)/6.2+.2<=E&&Oe.y<2.2){S={t:E,x:Oe.x,z:Oe.z};break}}if(S&&q_(i,t.team,S.x,S.z)>S.t+.05){Oe.set(S.x,0,S.z),t.sprint=!0,Ss(t,Oe,6.2),t.faceYaw=Kt(s.pos.x-t.pos.x,s.pos.z-t.pos.z);return}}let g=s.owner;if(g&&g.team!==t.team&&cu(i,t,g.pos.x,g.pos.z,1)){let b=Math.hypot(g.pos.x-l,g.pos.z),S=!1;for(let E of i.teams[t.team].players){if(E===t||E.isGK)continue;let _=Yn(E.pos.x,E.pos.z,g.pos.x,g.pos.z,l,0);_.d<1.2&&_.t>.1&&(S=!0)}if(!S&&b<13){if(s.pos.distXZ(t.pos)<2&&r>(o.smotherReady||0)){o.smotherReady=r+1.5,lu(i,t,s.pos.z,s.pos.x,.2,.05);return}let _=ft((b-2.5)/b,0,1);Oe.set(l+(g.pos.x-l)*_,0,g.pos.z*_),t.sprint=!0,Ss(t,Oe,5.5),t.faceYaw=Kt(g.pos.x-t.pos.x,g.pos.z-t.pos.z);return}}let x=s.pos.x,m=s.pos.z,f=x-l,M=m,y=Math.hypot(f,M)||1,v=ft(.7+(y-8)*.06,.6,3.2);Oe.set(l+f/y*v,0,ft(M/y*v*1.2,-2.3,2.3)),(Oe.x-l)*a<.4&&(Oe.x=l+a*.4),Ss(t,Oe,y<20?4:2.5),t.faceYaw=Kt(x-t.pos.x,m-t.pos.z)}function Ss(i,t,e){let n=t.x-i.pos.x,s=t.z-i.pos.z,r=Math.hypot(n,s);if(r<.08){i.desired.set(0,0,0);return}let o=Math.min(e,r*3.5);i.desired.set(n/r*o,0,s/r*o)}function q_(i,t,e,n){let s=99;for(let r of i.players){if(r.team===t)continue;let o=Math.hypot(r.pos.x-e,r.pos.z-n),a=Math.max(0,o-.8)/r.sprintSpeed()+.2;a<s&&(s=a)}return s}function Y_(i,t){let e=i.human;return e&&e.team===t.team&&e.requestUntil>i.time}function K_(i,t,e){let n=i.attackDir(t.team),s=null,r=-1e9,o="gkthrow";for(let a of i.teams[t.team].players){if(a===t)continue;let l=t.pos.distXZ(a.pos);if(l<5)continue;let c=99;for(let p of i.players)p.team!==t.team&&(c=Math.min(c,p.pos.distXZ(a.pos)));let h=ci(i,t.pos.x,t.pos.z,a.pos.x,a.pos.z,t.team,11),d=a.isHuman?e.humanBonus+(a.requestUntil>i.time?.5:0):0;if(l<30){let p=h*1.2+Math.min(c,10)*.07-l*.01+d;p>r&&h>.45&&(r=p,s=a,o="gkthrow")}let u=i.uOf(t.team,a.pos.x);if(u>-.2&&c>3.5){let p=.35+u*.4+Math.min(c,10)*.05+d*.6;p>r&&(r=p,s=a,o="gkkick")}}s?(t.yaw=Kt(s.pos.x-t.pos.x,s.pos.z-t.pos.z),he(i,t,o,{target:s,ai:!0})):he(i,t,"gkkick",{point:new ot(n*8,0,(i.rng.next()-.5)*20),ai:!0}),t.hold="gk",i.events.emit("distribute",{player:t,target:s,t:i.time})}var Z_=new L(0,1,0),Ne=Array.from({length:24},()=>new L),Xl=new re,tT=new Be,hi=new mn,Me=(i,t,e)=>i+(t-i)*e,fn=(i,t,e)=>i<t?t:i>e?e:i,ui=i=>(i=fn(i,0,1),i*i*(3-2*i));function J_(i,t,e){let n=t-i;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return i+n*e}function j_(i){return i-Math.floor(i)}var te=()=>new L,hu={x:te(),y:te(),z:te()},$l={d:te(),bend:te(),r:te(),t:te()},Ee={pelvis:te(),waist:te(),neck:te(),fwd:te(),side:te(),hip:te(),ankT:te(),knee:te(),ankle:te(),pole:te(),back:te(),sh:te(),tgt:te(),off:te(),elbow:te(),hand:te(),pole2:te()},He={hands:te(),body:te(),axis:te(),sh:te(),pelvis:te(),face:te(),z:te(),x:te(),p1:te(),p2:te(),hip:te(),knee:te(),ankle:te(),shp:te(),tgt:te(),elbow:te(),hand:te()};function ns(i,t,e,n){let s=hu.y.subVectors(t,e);s.lengthSq()<1e-8&&s.set(0,1,0),s.normalize();let r=hu.z.copy(n).addScaledVector(s,-n.dot(s));r.lengthSq()<1e-6&&(r.set(0,0,1).addScaledVector(s,-s.z),r.lengthSq()<1e-6&&r.set(1,0,0)),r.normalize();let o=hu.x.crossVectors(s,r);return i.makeBasis(o,s,r),i.setPosition(t),i}function uu(i,t,e,n,s,r,o){let a=$l.r.copy(i),l=$l.t.copy(t),c=$l.d.subVectors(l,a),h=c.length();h<1e-4?(c.set(0,-1,0),h=1e-4):c.divideScalar(h),h=fn(h,Math.abs(e-n)+.02,e+n-.002),o.copy(a).addScaledVector(c,h);let d=fn((e*e+h*h-n*n)/(2*e*h),-1,1),u=Math.sqrt(1-d*d),p=$l.bend.copy(s).addScaledVector(c,-s.dot(c));p.lengthSq()<1e-6&&p.set(0,0,1),p.normalize(),r.copy(a).addScaledVector(c,e*d).addScaledVector(p,e*u)}var ql=class{constructor(){this.pos=new L,this.plant=new L,this.from=new L,this.swing=!1,this.step=null,this.out=new L}},Yl=class{constructor(t){this.p=t,this.feet=[new ql,new ql],this.ready=!1,this.lastRoot=new L,this.lean=0,this.headYaw=0,this.headPitch=0,this.fall=0,this.m=Array.from({length:13},()=>new re),this.root=new L,this.yaw=0,this.hands=[new L,new L],this.handW=0}reset(){this.ready=!1}update(t){let e=this.p,n=t.match,s=Math.min(t.dt,.05),r=t.now,o=t.alpha,a=e.action,l=this.root.set(Me(e.prevPos.x,e.pos.x,o),0,Me(e.prevPos.z,e.pos.z,o)),c=this.yaw=J_(e.prevYaw,e.yaw,o),h=Ne[0].set(Math.sin(c),0,Math.cos(c)),d=Ne[1].set(Math.cos(c),0,-Math.sin(c)),u=e.vel.x,p=e.vel.z,g=Math.hypot(u,p),x=fn(g/7.5,0,1);if(!this.ready||this.lastRoot.distanceTo(l)>2.5){this.ready=!0;for(let lt=0;lt<2;lt++){let et=this.feet[lt];et.pos.copy(l).addScaledVector(d,lt===0?.11:-.11),et.plant.copy(et.pos),et.swing=!1,et.step=null}}this.lastRoot.copy(l);let m=Me(e.prevGait,e.gait,o),f=g>.35&&!(a&&(a.type==="slide"||a.type==="dive")),M=mr(Math.max(g,.6)),y=gr(M),v=g>.01?u/g:h.x,b=g>.01?p/g:h.z;for(let lt=0;lt<2;lt++){let et=this.feet[lt],zt=lt===0?1:-1,G=d.x*.11*zt,K=d.z*.11*zt;if(f){et.step=null;let ht=j_(m-(lt===0?0:.5));if(ht<y){et.swing&&(et.swing=!1,et.plant.set(et.pos.x,0,et.pos.z));let At=l.x+G,ct=l.z+K;Math.hypot(et.plant.x-At,et.plant.z-ct)>.9&&et.plant.set(At+v*.2,0,ct+b*.2),et.pos.copy(et.plant)}else{et.swing||(et.swing=!0,et.from.set(et.pos.x,0,et.pos.z));let At=(ht-y)/(1-y),ct=(1-ht)*M/Math.max(g,.5),Ot=l.x+u*ct+v*y*M*.5+G,fe=l.z+p*ct+b*y*M*.5+K;if(n.ball.owner===e&&!a){let qt=t.ball.x+n.ball.vel.x*ct*.5,se=t.ball.z+n.ball.vel.z*ct*.5,Lt=(qt-l.x)*v+(se-l.z)*b;Lt>.1&&Lt<1&&(Ot=Me(Ot,qt-v*.12,.35),fe=Me(fe,se-b*.12,.35))}let $t=ui(At);et.pos.set(Me(et.from.x,Ot,$t),(.09+g*.035)*Math.sin(Math.PI*Math.pow(At,.75)),Me(et.from.z,fe,$t))}}else{let ht=l.x+G+h.x*(lt===0?.03:-.03),At=l.z+K+h.z*(lt===0?.03:-.03);et.swing&&(et.swing=!1,et.step={fx:et.pos.x,fz:et.pos.z,t:0,dur:.14});let ct=this.feet[1-lt];if(et.step){et.step.t+=s;let Ot=fn(et.step.t/et.step.dur,0,1),fe=ui(Ot);et.pos.set(Me(et.step.fx,ht,fe),.07*Math.sin(Math.PI*Ot),Me(et.step.fz,At,fe)),Ot>=1&&(et.step=null,et.plant.set(ht,0,At))}else Math.hypot(et.plant.x-ht,et.plant.z-At)>.22&&!ct.step?et.step={fx:et.plant.x,fz:et.plant.z,t:0,dur:.16}:et.pos.copy(et.plant)}et.out.copy(et.pos)}let S=.935-.05*x+.018*x*Math.cos(m*Math.PI*4),E=.05+.16*x+(e.sprint?.05:0),_=c,A=.16*x*Math.sin(m*Math.PI*2),C=0,P=0,N=Math.sin(m*Math.PI*2),k=.08+.3*x,I=Ne[2].set(.05,-.5+.18*x,-N*k),z=Ne[3].set(-.05,-.5+.18*x,N*k),q=!1,Y=Ne[4],st=Ne[5],Z=null,Q=null,$=t.ball,_t=e.touch;if(a&&a.type==="kick"&&!a.fromHands){let lt=a.foot==="L"?0:1,et=a.contacted?a.kyaw??c:c;a.contacted&&a.kyaw==null&&(a.kyaw=c);let zt=Ne[6].set(Math.sin(et),0,Math.cos(et)),G=Ne[7].set(Math.cos(et),0,-Math.sin(et)).multiplyScalar(lt===0?1:-1),K=Ne[8];a.contacted&&_t&&_t.kind!=="receive"?K.set(_t.x,0,_t.z):K.set($.x,0,$.z);let ht=a.kind==="cross"||a.kind==="lob"||a.kind==="clear",At=a.kind==="shot"?a.charging?a.charge:Math.max(a.charge||0,a.ai?a.power:.35):ht?.8:.3+(a.charge||0)*.4,ct=Ne[9].copy(K).addScaledVector(zt,-.14).addScaledVector(G,-.25),Ot=this.feet[lt].out,fe=this.feet[1-lt].out;if(a.contacted){let Lt=(a.t-a.contactT)/a.follow,ae=Ne[10].copy(K).addScaledVector(zt,.45+.5*At);ae.y=.2+.5*At;let Ae=Ne[11].copy(K).setY(.06);Lt<.5?Ot.copy(Ae.lerp(ae,ui(Lt/.5))):Ot.lerp(ae,1-ui((Lt-.5)/.5)),Lt<.65?fe.copy(ct):fe.lerp(ct,1-ui((Lt-.65)/.35)),E=.1-(ht?.12:0)*(1-Lt)}else{let Lt=a.charging?.35+.4*a.charge:fn(a.t/Math.max(.06,a.t+a.eta),0,1),ae=Ne[10].copy(K).addScaledVector(zt,-(.32+.38*At)).addScaledVector(G,.06);ae.y=.12+.32*At,Lt<.75?Ot.lerp(ae,ui(Lt/.75)):Ot.copy(ae).lerp(Ne[11].copy(K).setY(.06),(Lt-.75)/.25),fe.lerp(ct,ui(Lt*2.2)),E=.12-(ht?.08:0)}let $t=lt===0?1:-1,qt=$t>0?I:z,se=$t>0?z:I;qt.set($t*.35,-.35,-.2),se.set(-$t*.3,-.3,.25)}else if(a&&a.type==="kick"&&a.fromHands){let lt=a.contacted?fn((a.t-a.contactT)/a.follow,0,1):fn(a.t/Math.max(.1,a.t+a.eta),0,1);if(a.kind==="throw"){let et=a.contacted?1-lt:lt;I.set(.12,.62-.05*et,-.25*et+(a.contacted?.35*lt:0)),z.set(-.12,.62-.05*et,-.25*et+(a.contacted?.35*lt:0)),E=-.12*(a.contacted?1-lt:lt)+(a.contacted?.15*lt:0)}else if(a.kind==="gkthrow")z.set(-.12,-.45,a.contacted?.45*(1-lt)+.2:-.35*lt),I.set(.25,-.35,.1),E=.25;else{I.set(.1,-.2,.35),z.set(-.1,-.2,.35);let et=this.feet[1].out,zt=Ne[6].set(Math.sin(c),0,Math.cos(c));a.contacted?(et.copy(l).addScaledVector(zt,.3+.5*lt),et.y=.3+.6*Math.sin(Math.PI*lt)):(et.copy(l).addScaledVector(zt,-.3*lt),et.y=.15*lt)}}else if(a&&a.type==="tackle"){let lt=a.t,et=lt<.07?lt/.07*.3:lt<.3?.3+Math.min(1,(lt-.07)/.1)*.7:Math.max(0,1-(lt-.3)/.18),zt=Ne[6].set(Math.sin(a.dir),0,Math.cos(a.dir)),G=this.feet[1].out,K=Ne[7].copy(l).addScaledVector(zt,.3+.75*et).addScaledVector(d,-.05);K.y=.06,G.lerp(K,fn(et*1.4,0,1)),E=.1+.25*et,S-=.08*et,I.set(.35,-.3,.1),z.set(-.35,-.3,-.15)}else if(a&&a.type==="slide")Q="slide";else if(a&&a.type==="dive")Q="dive";else if(r<e.downUntil)Q="fall";else if(a&&a.type==="celebrate"||e.celebrate>r){let lt=r*6+e.id;I.set(.25,.55+.08*Math.sin(lt),.05),z.set(-.25,.55+.08*Math.cos(lt),.05),a&&a.type==="celebrate"&&g<1&&(S+=.12*Math.max(0,Math.sin(r*9)))}else if(e.hold==="throw"||n.restart&&n.restart.handsBall&&n.restart.taker===e&&n.phase==="restart")q=!0,Y.set($.x,$.y,$.z).addScaledVector(d,.1),st.set($.x,$.y,$.z).addScaledVector(d,-.1);else if(e.isGK&&n.ball.state==="held"&&n.ball.owner===e)q=!0,Y.set($.x,$.y,$.z).addScaledVector(d,.1).addScaledVector(h,-.04),st.set($.x,$.y,$.z).addScaledVector(d,-.1).addScaledVector(h,-.04);else if(e.isGK&&e.ai.set)S=.8,E=.22,I.set(.3,-.12,.3),z.set(-.3,-.12,.3),Math.hypot($.x-l.x,$.z-l.z)<1.4&&(q=!0,Y.set($.x,$.y,$.z).addScaledVector(d,.12),st.set($.x,$.y,$.z).addScaledVector(d,-.12));else if(r<e.stumbleUntil){let lt=Math.sin(r*20)*.15;I.set(.4,-.1+lt,0),z.set(-.4,-.1-lt,0),P=lt*.4}if(!Q&&_t&&(_t.kind==="receive"||_t.kind==="dribble"||_t.kind==="stop"||_t.kind==="poke")&&!(a&&a.type==="kick")){let lt=r-_t.time;if(lt>-.05&&lt<.2){let et=1-Math.abs(lt-.02)/.18,zt=_t.foot==="L"?0:1,G=Ne[12].set(_t.x,.05+(_t.kind==="receive"?Math.min(.5,_t.y)*.8:0),_t.z);G.addScaledVector(Ne[13].set(_t.x-l.x,0,_t.z-l.z).normalize(),-.1),this.feet[zt].out.lerp(G,fn(et,0,1)*.85)}}let Et=this.m;if(Q==="slide")this.poseSlide(e,a,l,c,Et);else if(Q==="dive")this.poseDive(e,n,l,c,Et);else if(Q==="fall")this.poseFall(e,r,l,c,Et,h,d);else{let lt=$.x-l.x,et=$.z-l.z,G=Math.atan2(lt,et)-_;for(;G>Math.PI;)G-=Math.PI*2;for(;G<-Math.PI;)G+=Math.PI*2;G=fn(G,-1.1,1.1),this.headYaw=Me(this.headYaw,G,1-Math.exp(-s*8));let K=Math.hypot(lt,et);this.headPitch=Me(this.headPitch,fn(Math.atan2(1.55-$.y,K)*.6,-.3,.5),1-Math.exp(-s*6)),this.lean=Me(this.lean,E,1-Math.exp(-s*10)),this.poseUpright(e,l,_,S,this.lean+C,A,P,I,z,q?Y:null,q?st:null,Et,t.local)}return Et}poseUpright(t,e,n,s,r,o,a,l,c,h,d,u,p){let g=Ee.pelvis.set(e.x,s,e.z),x=Ee.fwd.set(Math.sin(n),0,Math.cos(n)),m=Ee.side.set(Math.cos(n),0,-Math.sin(n));p&&g.addScaledVector(x,-.02),hi.set(0,n-o*.4,0,"YXZ"),u[Ft.PELVIS].makeRotationFromEuler(hi).setPosition(g);let f=u[Ft.PELVIS],M=Ee.waist.set(0,$e.waist,0).applyMatrix4(f);hi.set(r,n+o,a,"YXZ"),u[Ft.TORSO].makeRotationFromEuler(hi).setPosition(M);let y=u[Ft.TORSO],v=Ee.neck.set(0,.58,0).applyMatrix4(y);hi.set(this.headPitch-r*.5,n+this.headYaw,0,"YXZ"),u[Ft.HEAD].makeRotationFromEuler(hi).setPosition(v);for(let S=0;S<2;S++){let E=Ee.hip.set(S===0?$e.hipW:-$e.hipW,-.02,0).applyMatrix4(f),_=this.feet[S].out,A=Ee.ankT.set(_.x,_.y+$e.ankle,_.z),C=Ee.pole.copy(x).addScaledVector(Z_,.1);uu(E,A,$e.thigh,$e.shin,C,Ee.knee,Ee.ankle),ns(u[S===0?Ft.THIGH_L:Ft.THIGH_R],E,Ee.knee,x),ns(u[S===0?Ft.SHIN_L:Ft.SHIN_R],Ee.knee,Ee.ankle,x);let P=fn((Ee.ankle.y-$e.ankle)*1.2,0,.6)*(this.feet[S].swing?1:0);hi.set(P,n,0,"YXZ"),u[S===0?Ft.BOOT_L:Ft.BOOT_R].makeRotationFromEuler(hi).setPosition(Ee.ankle)}let b=Ee.back.set(-x.x,-.6,-x.z);for(let S=0;S<2;S++){let E=S===0?1:-1,_=Ee.sh.set(E*$e.shoulderW,.45,0).applyMatrix4(y),A;h?A=Ee.tgt.copy(S===0?h:d):A=Ee.tgt.copy(S===0?l:c).add(Ee.off.set(E*$e.shoulderW,.45,0)).applyMatrix4(y);let C=Ee.pole2.copy(b).addScaledVector(m,E*.5);uu(_,A,$e.upper,$e.fore,C,Ee.elbow,Ee.hand),ns(u[S===0?Ft.UARM_L:Ft.UARM_R],_,Ee.elbow,x),ns(u[S===0?Ft.FARM_L:Ft.FARM_R],Ee.elbow,Ee.hand,x),this.hands[S].copy(Ee.hand)}}poseSlide(t,e,n,s,r){let o=e.t,a=fn((o-.62)/.43,0,1),l=fn(o/.12,0,1)*(1-ui(a)),c=Ne[0].set(Math.sin(e.dir),0,Math.cos(e.dir)),h=Ne[1].set(Math.cos(e.dir),0,-Math.sin(e.dir)),d=Me(.93,.2,l),u=Me(.05,-1.05,l);this.feet[1].out.copy(n).addScaledVector(c,Me(.1,1,l)).addScaledVector(h,-.08).setY(Me(0,.05,l)),this.feet[0].out.copy(n).addScaledVector(c,Me(0,.25,l)).addScaledVector(h,.22).setY(0);let p=Ne[2].set(.35,Me(-.5,-.2,l),Me(0,-.35,l)),g=Ne[3].set(-.4,Me(-.5,-.1,l),Me(0,.2,l));this.lean=u,this.headPitch=Me(this.headPitch,.5*l,.2),this.poseUpright(t,n,e.dir,d,u,0,0,p,g,null,null,r,!1)}poseFall(t,e,n,s,r,o,a){let l=t.action,c=l&&l.dur?l.dur:1,h=l?l.t:c-(t.downUntil-e),d=ui(h/.35)*(1-ui((h-(c-.45))/.45)),u=Me(.93,.22,d),p=Me(.05,1.35,d);this.feet[0].out.copy(n).addScaledVector(o,-.5*d).addScaledVector(a,.14).setY(.02*d),this.feet[1].out.copy(n).addScaledVector(o,-.6*d).addScaledVector(a,-.14).setY(.05*d);let g=Ne[2].set(.25,Me(-.5,-.05,d),Me(0,.45,d)),x=Ne[3].set(-.25,Me(-.5,-.05,d),Me(0,.45,d));this.poseUpright(t,n,s,u,p,0,0,g,x,null,null,r,!1)}poseDive(t,e,n,s,r){let o=Wl(e,t,this.vol||(this.vol={})),a=He.hands.set(o.bx,o.by,o.bz),l=He.axis.subVectors(a,He.body.set(o.ax,o.ay,o.az));l.divideScalar(l.length()||1);let c=He.sh.copy(a).addScaledVector(l,-.52),h=He.pelvis.copy(c).addScaledVector(l,-.5);h.y=Math.max(.18,h.y);let d=He.face.set(Math.sin(s),0,Math.cos(s)),u=He.z.copy(d).addScaledVector(l,-d.dot(l)).normalize(),p=He.x.crossVectors(l,u);Xl.makeBasis(p,l,u),r[Ft.PELVIS].copy(Xl).setPosition(h),r[Ft.TORSO].copy(Xl).setPosition(He.p1.copy(h).addScaledVector(l,$e.waist)),r[Ft.HEAD].copy(Xl).setPosition(He.p2.copy(h).addScaledVector(l,$e.waist+.58));for(let g=0;g<2;g++){let x=g===0?1:-1,m=He.hip.copy(h).addScaledVector(p,x*$e.hipW),f=He.knee.copy(m).addScaledVector(l,-$e.thigh).addScaledVector(u,.08);f.y=Math.max(.08,f.y);let M=He.ankle.copy(f).addScaledVector(l,-$e.shin).addScaledVector(u,-.05);M.y=Math.max(.08,M.y),ns(r[g===0?Ft.THIGH_L:Ft.THIGH_R],m,f,u),ns(r[g===0?Ft.SHIN_L:Ft.SHIN_R],f,M,u),hi.set(0,s,0,"YXZ"),r[g===0?Ft.BOOT_L:Ft.BOOT_R].makeRotationFromEuler(hi).setPosition(M)}for(let g=0;g<2;g++){let x=g===0?1:-1,m=He.shp.copy(c).addScaledVector(p,x*$e.shoulderW),f=He.tgt.copy(a).addScaledVector(p,x*.09);uu(m,f,$e.upper,$e.fore,u,He.elbow,He.hand),ns(r[g===0?Ft.UARM_L:Ft.UARM_R],m,He.elbow,u),ns(r[g===0?Ft.FARM_L:Ft.FARM_R],He.elbow,He.hand,u),this.hands[g].copy(He.hand)}}};var Kl=1024,Zl=1024,Jl=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=Kl,this.canvas.height=Zl,this.ctx=this.canvas.getContext("2d"),this.texture=new Qs(this.canvas),this.texture.anisotropy=4,this.words=new Map,this.reset()}reset(){let t=this.ctx;t.clearRect(0,0,Kl,Zl),t.fillStyle="#fff",t.textAlign="center",t.textBaseline="middle",t.font='bold 88px "Arial Black", Arial, Helvetica, sans-serif';for(let e=0;e<10;e++)t.fillText(String(e),e*64+32,52);this.words.clear(),this.slot=0,this.texture.needsUpdate=!0}rect(t,e,n,s){return[t/Kl,1-(e+s)/Zl,(t+n)/Kl,1-e/Zl]}digit(t){return this.rect(t*64+6,4,52,96)}word(t){if(this.words.has(t))return this.words.get(t);let e=this.slot%2,n=Math.floor(this.slot/2);if(n>13)return this.rect(0,0,1,1);this.slot++;let s=e*512,r=112+n*64,o=this.ctx;o.save(),o.clearRect(s,r,512,64),o.fillStyle="#fff",o.textAlign="center",o.textBaseline="middle";let a=46;for(o.font=`bold ${a}px "Arial Black", Arial, Helvetica, sans-serif`;o.measureText(t).width>496&&a>14;)a-=2,o.font=`bold ${a}px "Arial Black", Arial, Helvetica, sans-serif`;o.fillText(t,s+256,r+33),o.restore();let l=this.rect(s+2,r+2,508,60);return this.words.set(t,l),this.texture.needsUpdate=!0,l}},jl=class{constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=512,this.canvas.height=192,this.ctx=this.canvas.getContext("2d"),this.texture=new Qs(this.canvas),this.key=""}update(t,e,n,s,r,o=!1){let a=`${t}|${e}|${n}|${s}|${r}|${o}`;if(a===this.key)return;this.key=a;let l=this.ctx,c=r==="neo";l.fillStyle=c?"#111":"#f6f5ef",l.fillRect(0,0,512,192),l.strokeStyle=c?"#ffd23f":"#222",l.lineWidth=c?10:4,l.strokeRect(8,8,496,176),l.fillStyle=c?"#fff":"#161616",l.textAlign="center",l.textBaseline="middle",l.font='bold 40px "Arial Black", Arial, sans-serif',l.fillText(t,128,52),l.fillText(e,384,52),l.font='bold 72px "Arial Black", Arial, sans-serif',l.fillStyle=c?"#ffd23f":"#161616",l.fillText(`${n[0]}  -  ${n[1]}`,256,112),l.font="bold 30px Arial, sans-serif",l.fillStyle=c?"#3ee0ff":"#444",l.fillText(o?"FINAL":s,256,162),this.texture.needsUpdate=!0}};var Ql=new re,Mp=new Be,Q_=new L,rT=new L,Sp=new mn,tc=class{constructor(t=20){let e=new An(1,1);e.rotateX(-Math.PI/2),this.alpha=new gn(new Float32Array(t),1),e.setAttribute("aAlpha",this.alpha),this.mesh=new Js(e,Of(),t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,this.max=t,this.count=0}begin(){this.count=0}add(t,e,n,s){this.count>=this.max||(Ql.makeScale(n,1,n).setPosition(t,.018,e),this.mesh.setMatrixAt(this.count,Ql),this.alpha.setX(this.count,s),this.count++)}end(){this.mesh.count=this.count,this.mesh.instanceMatrix.needsUpdate=!0,this.alpha.needsUpdate=!0}},ec=class{constructor(){this.group=new Tn;let t=new tr(.5,.62,40);t.rotateX(-Math.PI/2),this.ring=new ue(t,Sl(O.MARKER,.85)),this.ring.renderOrder=3,this.ring.visible=!1;let e=new _i(.16,.34,4);e.rotateX(Math.PI),this.ack=new ue(e,Sl(O.MARKER,1)),this.ack.visible=!1;let n=new tr(.2,.3,24);n.rotateX(-Math.PI/2),this.incoming=new ue(n,Sl(O.MARKER,.6)),this.incoming.visible=!1,this.group.add(this.ring,this.ack,this.incoming),this.ringT=0}showRing(t,e,n){this.ring.visible=!0,this.ringT=n;let s=1+.06*Math.sin(n*8);this.ring.position.set(t,.03,e),this.ring.scale.set(s,1,s)}showAck(t,e,n,s){this.ack.visible=!0,this.ack.position.set(t,e+.1*Math.sin(s*10),n),this.ack.rotation.y=s*3}showIncoming(t,e){this.incoming.visible=!0,this.incoming.position.set(t,.03,e)}hideAll(){this.ring.visible=!1,this.ack.visible=!1,this.incoming.visible=!1}},nc=class{constructor(t=180){let e=new Gr(.16,0);this.mat=new ps({color:16777215}),this.mesh=new Js(e,this.mat,t),this.mesh.instanceMatrix.setUsage(_h),this.mesh.frustumCulled=!1,this.max=t,this.parts=Array.from({length:t},()=>({alive:!1,p:new L,v:new L,r:new L,w:new L,life:0,s:1})),this.col=new Qt;for(let n=0;n<t;n++)this.mesh.setColorAt(n,this.col.set(1,1,1));this.mesh.count=0,this.active=0}spawn(t,e,n,s,r,o=6,a=Math.random){let l=0;for(let c of this.parts){if(l>=s)break;if(c.alive)continue;c.alive=!0,c.p.set(t+(a()-.5)*2,e+a()*1.5,n+(a()-.5)*2);let h=a()*Math.PI*2,d=4+a()*6;c.v.set(Math.cos(h)*o*a(),d,Math.sin(h)*o*a()),c.r.set(a()*6,a()*6,a()*6),c.w.set((a()-.5)*12,(a()-.5)*12,(a()-.5)*12),c.life=1.6+a()*1.2,c.s=.6+a()*.9,c.role=r[Math.floor(a()*r.length)],l++}}update(t){let e=0;for(let n of this.parts){if(!n.alive)continue;if(n.life-=t,n.life<=0){n.alive=!1;continue}n.v.y-=9.8*t*.6,n.v.multiplyScalar(1-1.2*t),n.p.addScaledVector(n.v,t),n.p.y<.05&&(n.p.y=.05,n.v.set(0,0,0)),n.r.addScaledVector(n.w,t),Sp.set(n.r.x,n.r.y,n.r.z),Mp.setFromEuler(Sp);let s=n.s*Math.min(1,n.life*2);Ql.compose(n.p,Mp,Q_.set(s,s,s)),this.mesh.setMatrixAt(e,Ql),this.mesh.setColorAt(e,Le[n.role]),e++}this.mesh.count=e,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0),this.active=e}clear(){for(let t of this.parts)t.alive=!1;this.mesh.count=0}};oe.enabled=!1;var _r=120,tb=175;function wp(i){let t=io.clamp((i-_r)/(tb-_r),0,1),e=i*Math.PI/360;return{d:t,R:(t+1)*Math.sin(e)/(t+Math.cos(e))}}var eb="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",nb=`
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
}`,ic=class{constructor(t,e={}){this.canvas=t,this.quality=e.quality||"high";let n=new yl({canvas:t,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!!e.preserve});n.outputColorSpace=ds,n.shadowMap.enabled=!0,n.shadowMap.type=jc,n.shadowMap.autoUpdate=!1,this.renderer=n,this.scene=new Zs,this.scene.fog=new Fr(15921642,60,330),this.camera=new rn(85,16/9,.07,1500),this.camera.rotation.order="YXZ";let s=new $r(16777215,1);s.position.set(-36,64,30),s.castShadow=!0;let r=s.shadow.camera;r.left=-46,r.right=46,r.top=34,r.bottom=-34,r.near=1,r.far=200,s.shadow.mapSize.set(2048,2048),s.shadow.bias=-8e-4,s.shadow.normalBias=.02,this.sun=s,this.scene.add(s,s.target),Wt.uLightDir.value.copy(s.position).normalize(),this.sky=new ue(new gs(1200,24,12),Uf()),this.sky.renderOrder=-10,this.sky.frustumCulled=!1,this.scene.add(this.sky);let o=Yf();this.clouds=new Tn;let a=new ue(o.solid,Yi({fog:!1})),l=new ue(o.edges,Mi({fog:!1}));l.frustumCulled=!1,this.clouds.add(a,l),this.scene.add(this.clouds),this.atlas=new Jl,Wt.uAtlas.value=this.atlas.texture,this.scoreTex=new jl,this.screenMat=Ff(this.scoreTex.texture),this.staticMat=Yi({crowd:!0,atlas:!0}),this.staticEdgeMat=Mi({crowd:!0}),this.casterMat=Yi({}),this.casterEdgeMat=Mi({}),this.netMat=Mi({net:!0,role:O.NET,widthScale:.5}),this.nets=new ue(Xf(),this.netMat),this.nets.frustumCulled=!1,this.scene.add(this.nets),this.netState=[{amp:0,t:9,x:0,y:0,z:0,dx:1,dy:0,dz:0,count:0},{amp:0,t:9,x:0,y:0,z:0,dx:-1,dy:0,dz:0,count:0}],this.blobs=new tc(24),this.markers=new ec,this.burst=new nc(200),this.scene.add(this.blobs.mesh,this.markers.group,this.burst.mesh),this.venue=null,this.venueObjs=[],this.batch=null,this.animators=[],this.match=null,this.style="classic",this.fov=85,this.time=0,this.shake=0,this.ballPos=new L,this.ballQ=new Be,this.ballM=new re,this.crowdLevel=0,this.localPlayer=null,this.firstPerson=!0,this.hideHead=!0,this.hfov=100,this.wide=null,this.resize()}setQuality(t){this.quality=t;let e=window.devicePixelRatio||1;this.renderer.setPixelRatio(t==="low"?Math.min(1,e)*.75:Math.min(t==="medium"?1.25:2,e));let n=t==="low"?1024:2048;this.sun.shadow.mapSize.x!==n&&(this.sun.shadow.mapSize.set(n,n),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null)),this.resize()}resize(){let t=this.canvas.clientWidth||window.innerWidth,e=this.canvas.clientHeight||window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix();let n=this.renderer.getPixelRatio();Wt.uResolution.value.set(t*n,e*n),this.pixelRatio=n,this.applyLineWidth()}applyLineWidth(){let t=Ml[this.style],e=this.pixelRatio||1;Wt.uLineWidth.value=t.lineWidth*e,Wt.uMinWidth.value=Math.min(t.lineWidth,1.1)*e,Wt.uTaper.value=t.name==="neo"?16:40}setStyle(t){let e=Pf(t);this.style=e.name,Wt.uToon.value=e.toon,Wt.uShadowAmt.value=e.shadow,this.renderer.shadowMap.autoUpdate=e.shadow>0,this.renderer.shadowMap.needsUpdate=e.shadow>0,this.scene.fog.color.set(e.fog),this.scene.fog.near=e.fogNear,this.scene.fog.far=e.fogFar,this.clouds.visible=e.clouds,this.blobShowPlayers=e.blobs,this.applyLineWidth(),this.match&&this.updateScoreboard(!0),document.documentElement.dataset.style=e.name}setVenue(t,e={}){let n=`${t}|${e.homeName}|${e.final}|${this.quality}`;if(this.venueKey===n)return;this.venueKey=n;for(let c of this.venueObjs)this.scene.remove(c),c.geometry.dispose();this.venueObjs=[];let s=qf(t,{atlas:this.atlas,quality:this.quality,homeName:e.homeName||"HOME",final:!!e.final,seed:e.seed||7});this.venue=s;let r=new ue(s.solid,this.staticMat);r.receiveShadow=!0;let o=new ue(s.edges,this.staticEdgeMat);o.frustumCulled=!1;let a=new ue(s.casterSolid,this.casterMat);a.castShadow=!0,a.receiveShadow=!0;let l=new ue(s.casterEdges,this.casterEdgeMat);l.frustumCulled=!1,this.venueObjs.push(r,o,a,l);for(let c of s.screens){let h=new ue(new An(c.w,c.h),this.screenMat);h.position.set(c.x,c.y,c.z),h.rotation.y=c.ry+Math.PI,h.translateZ(-.06),this.venueObjs.push(h)}for(let c of this.venueObjs)this.scene.add(c);this.renderer.shadowMap.needsUpdate=!0}setMatch(t,e){this.match=t,e&&If(e.kits,e.human),this.rebuildCharacters(),this.burst.clear(),this.netState.forEach(n=>{n.amp=0,n.t=9}),this.updateScoreboard(!0)}rebuildCharacters(){this.batch&&(this.scene.remove(this.batch.mesh,this.batch.edges),this.batch.dispose()),this.batch=new Il(this.match.players,this.atlas),this.scene.add(this.batch.mesh,this.batch.edges),this.animators=this.match.players.map(t=>new Yl(t))}updateScoreboard(t){let e=this.match;e&&(this.scoreTex.update(e.teams[0].short||"HOM",e.teams[1].short||"AWY",e.scoreline,e.displayClock.slice(0,2)+"'",this.style,e.phase==="fulltime"),t&&(this.scoreTex.key=""))}render(t,e,n,s={}){let r=this.match;if(this.time+=e,Wt.uTime.value=this.time,this.crowdLevel=Math.max(s.crowd??0,this.crowdLevel-e*.35),Wt.uCrowd.value=this.crowdLevel,r&&this.batch){let o=r.time-(1-t)*.008333333333333333,a=r.ball;this.ballPos.set(a.prevPos.x+(a.pos.x-a.prevPos.x)*t,a.prevPos.y+(a.pos.y-a.prevPos.y)*t,a.prevPos.z+(a.pos.z-a.prevPos.z)*t);let l=this._qa||(this._qa=new Be),c=this._qb||(this._qb=new Be);l.set(a.prevQ[0],a.prevQ[1],a.prevQ[2],a.prevQ[3]),c.set(a.q[0],a.q[1],a.q[2],a.q[3]),this.ballQ.slerpQuaternions(l,c,t),this.ballM.compose(this.ballPos,this.ballQ,this._one||(this._one=new L(1,1,1))),this.batch.setMatrix(this.batch.ballRow,this.ballM);let h={match:r,alpha:t,dt:e,now:o,ball:this.ballPos,local:!1};this.blobs.begin();for(let u=0;u<this.animators.length;u++){let p=this.animators[u],g=p.p;h.local=g===this.localPlayer&&this.firstPerson;let x=p.update(h),m=u*pr;for(let f=0;f<pr;f++)this.batch.setMatrix(m+f,x[f]);if(h.local&&this.hideHead&&(this.batch.hide(m+Ft.HEAD),this.batch.hide(m+Ft.TORSO),this.isWide()))for(let f of[Ft.UARM_L,Ft.UARM_R,Ft.FARM_L,Ft.FARM_R])this.batch.hide(m+f);this.blobShowPlayers&&this.blobs.add(p.root.x,p.root.z,.95,.2)}let d=Math.max(0,this.ballPos.y-ye);this.blobs.add(this.ballPos.x,this.ballPos.z,.34+d*.12,.42/(1+d*.8)),this.blobs.end(),this.batch.commit(),this.updateNets(e),this.updateScoreboard(!1)}this.burst.update(e),this.updateCamera(n,e,t),this.isWide()?this.renderWide():this.renderer.render(this.scene,this.camera)}isWide(){return this.hfov>_r+.01}ensureWide(t){let e=this.wide;if(!e){let n=new Fe({uniforms:{tCube:{value:null},uRot:{value:new Vt},uD:{value:0},uR:{value:1},uAspect:{value:1}},vertexShader:eb,fragmentShader:nb,depthTest:!1,depthWrite:!1}),s=new ue(new An(2,2),n);s.frustumCulled=!1;let r=new Zs;r.add(s),e=this.wide={mat:n,scene:r,cam:new Gi(-1,1,1,-1,0,1),rt:null,cube:null,size:0,fwd:new L,dir:new L}}return(!e.rt||Math.abs(t-e.size)/e.size>.15)&&(e.rt&&e.rt.dispose(),e.rt=new hr(t,{generateMipmaps:!1,minFilter:Xe,magFilter:Xe}),e.cube=new er(this.camera.near,this.camera.far,e.rt),e.size=t,e.mat.uniforms.tCube.value=e.rt.texture),e}renderWide(){let t=this.renderer,e=this.camera,{d:n,R:s}=wp(this.hfov),r=t.getDrawingBufferSize(this._buf||(this._buf=new Zt)),o=r.x/r.y,a=r.x/2/s,l=this.quality==="low"?1024:this.quality==="medium"?1536:2048,c=this.quality==="low"?1:1.35,h=io.clamp(Math.round(2*a*c/64)*64,512,l),d=this.ensureWide(h),u=d.cube;u.coordinateSystem!==t.coordinateSystem&&(u.coordinateSystem=t.coordinateSystem,u.updateCoordinateSystem()),e.updateMatrixWorld(),u.position.copy(e.position),u.updateMatrixWorld();let p=Wt.uResolution.value,g=p.x,x=p.y,m=Wt.uLineWidth.value,f=Wt.uMinWidth.value,M=d.size/2/a;p.set(d.size,d.size),Wt.uLineWidth.value=m*M,Wt.uMinWidth.value=f*M,e.getWorldDirection(d.fwd);let y=s*Math.sqrt(1+1/(o*o)),v=n+1,b=Math.atan2(y,v)+Math.asin(Math.min(1,y*n/Math.sqrt(v*v+y*y))),S=Math.cos(Math.min(Math.PI,b+.96)),E=t.shadowMap.autoUpdate;E&&(t.shadowMap.autoUpdate=!1,t.shadowMap.needsUpdate=!0);let _=t.getRenderTarget(),A=0;for(let P=0;P<6;P++){let N=u.children[P];N.getWorldDirection(d.dir),!(d.dir.dot(d.fwd)<S)&&(t.setRenderTarget(d.rt,P),t.render(this.scene,N),A+=t.info.render.calls)}t.shadowMap.autoUpdate=E,t.setRenderTarget(_),p.set(g,x),Wt.uLineWidth.value=m,Wt.uMinWidth.value=f;let C=d.mat.uniforms;C.uRot.value.setFromMatrix4(e.matrixWorld),C.uD.value=n,C.uR.value=s,C.uAspect.value=o,t.render(d.scene,d.cam),this.wideCalls=A+1}projectToScreen(t,e){let n=this.camera;if(!this.isWide())return e.copy(t).project(n),e.z>1&&(e.x=-e.x*50,e.y=-e.y*50),e;let{d:s,R:r}=wp(this.hfov);e.copy(t).applyMatrix4(n.matrixWorldInverse);let o=e.length()||1,a=-e.z/o,l=Math.hypot(e.x,e.y)||1e-6,c=e.x/l,h=e.y/l,d=s+a,u=d>1e-4?(s+1)*Math.sqrt(Math.max(0,1-a*a))/d:1e4;return e.set(c*u/r,h*u*n.aspect/r,0),e}updateNets(t){let e=this.match.ball;for(let n=0;n<2;n++){let s=this.netState[n],r=e.net[n];r&&r.count!==s.count?(s.count=r.count,s.amp=Math.max(s.amp*.9,Math.min(.6,.12+r.depth*2)),s.x=r.x,s.y=r.y,s.z=r.z,s.dx=-r.nx,s.dy=-r.ny,s.dz=-r.nz,s.t=0,s.contact=!0,r.depth=0):(s.t+=t,s.contact=!1);let o=s.amp*Math.cos(s.t*14)*Math.exp(-s.t*3.4);s.t>3&&(s.amp=0);let a=n===0?Wt.uNetA.value:Wt.uNetB.value,l=n===0?Wt.uNetDA.value:Wt.uNetDB.value;a.set(s.x,s.y,s.z,o),l.set(s.dx,s.dy,s.dz)}}updateCamera(t,e,n){let s=this.camera;if(t.fov){this.hfov=t.mode==="fp"?t.fov:Math.min(t.fov,_r);let r=Math.min(this.hfov,_r),o=io.clamp(2*Math.atan(Math.tan(r*Math.PI/360)/s.aspect)*180/Math.PI,35,110);Math.abs(o-s.fov)>.01&&(s.fov=o,s.updateProjectionMatrix())}else this.hfov=Math.min(this.hfov,_r);if(t.mode==="fp"&&this.localPlayer&&this.match){let r=this.localPlayer,o=r.prevPos.x+(r.pos.x-r.prevPos.x)*n,a=r.prevPos.z+(r.pos.z-r.prevPos.z)*n,l=t.eye??1.65;if(t.bob){let c=Math.min(1,r.speed/7.5);l+=Math.sin((r.prevGait+(r.gait-r.prevGait)*n)*Math.PI*4)*.012*c*t.bob}if(s.position.set(o+Math.sin(t.yaw)*.08,l,a+Math.cos(t.yaw)*.08),t.shake&&this.shake>0){let c=this.shake*t.shake;s.position.x+=(Math.random()-.5)*.02*c,s.position.y+=(Math.random()-.5)*.02*c}this.shake=Math.max(0,this.shake-e*4),s.rotation.set(t.pitch,t.yaw+Math.PI,0,"YXZ")}else if(t.mode==="orbit"){let r=t.angle;s.position.set(Math.cos(r)*t.radius,t.height,Math.sin(r)*t.radius),s.lookAt(t.target||this._origin||(this._origin=new L))}else if(t.pos){let r=t.pos,o=t.look;s.position.set(r.x??r[0],r.y??r[1],r.z??r[2]),o?s.lookAt(o.x??o[0],o.y??o[1],o.z??o[2]):s.rotation.set(t.pitch||0,(t.yaw||0)+Math.PI,0,"YXZ")}}celebrate(t,e,n,s=1){let r=this.style==="neo"?[n===0?O.SHIRT_0:O.SHIRT_1,O.GOLD,O.MARKER,O.LINES,O.STAND_C]:[O.INK,O.LINES,n===0?O.SHIRT_0:O.SHIRT_1];this.burst.spawn(t,1.5,e,Math.round(70*s),r,7)}renderPreview(t,e,n,s){let r=this.style,o=new on(e,n,{samples:4}),a=Wt.uResolution.value.clone(),l=this.camera.aspect;this.setStyle(t),Wt.uResolution.value.set(e,n),Wt.uLineWidth.value=Ml[t].lineWidth,this.camera.aspect=e/n,this.camera.updateProjectionMatrix();let c=this.camera.position.clone(),h=this.camera.quaternion.clone();s&&(this.camera.position.set(s.pos[0],s.pos[1],s.pos[2]),this.camera.lookAt(new L(s.look[0],s.look[1],s.look[2]))),this.renderer.shadowMap.needsUpdate=!0,this.renderer.setRenderTarget(o),this.renderer.render(this.scene,this.camera);let d=new Uint8Array(e*n*4);this.renderer.readRenderTargetPixels(o,0,0,e,n,d),this.renderer.setRenderTarget(null),o.dispose();let u=document.createElement("canvas");u.width=e,u.height=n;let p=u.getContext("2d"),g=p.createImageData(e,n);for(let x=0;x<n;x++)g.data.set(d.subarray((n-1-x)*e*4,(n-x)*e*4),x*e*4);return p.putImageData(g,0,0),this.setStyle(r),this.camera.position.copy(c),this.camera.quaternion.copy(h),Wt.uResolution.value.copy(a),this.applyLineWidth(),this.camera.aspect=l,this.camera.updateProjectionMatrix(),u.toDataURL("image/png")}stats(){let t=this.renderer.info;return{calls:this.isWide()?this.wideCalls:t.render.calls,tris:t.render.triangles,people:this.venue?this.venue.people:0,wide:this.isWide()}}};function br(i){let t=i>>>0;return()=>(t=t*1664525+1013904223>>>0,t/2147483648-1)}function Ap(i,t){let e=Math.exp(-2*Math.PI*t/44100),n=0;for(let s=0;s<i.length;s++)n=(1-e)*i[s]+e*n,i[s]=n}function ib(i,t){let e=Math.exp(-2*Math.PI*t/44100),n=0,s=0;for(let r=0;r<i.length;r++){let o=i[r];n=e*(n+o-s),s=o,i[r]=n}}function rc(i,t,e){let n=2*Math.PI*t/44100,s=Math.sin(n)/(2*e),r=Math.cos(n),o=s,a=-s,l=1+s,c=-2*r,h=1-s,d=0,u=0,p=0,g=0;for(let x=0;x<i.length;x++){let m=i[x],f=(o*m+a*u-c*p-h*g)/l;u=d,d=m,g=p,p=f,i[x]=f}}function Ti(i,t=.9){let e=0;for(let n=0;n<i.length;n++)e=Math.max(e,Math.abs(i[n]));if(e>0)for(let n=0;n<i.length;n++)i[n]*=t/e;return i}function xo(i,t,e,n,s,r){let o=Math.floor(44100*i),a=new Float32Array(o),l=br(r),c=0;for(let h=0;h<o;h++){let d=h/44100,u=e+(t-e)*Math.exp(-d*38);c+=2*Math.PI*u/44100;let p=Math.exp(-d*(i>.12?26:40));a[h]=Math.sin(c)*p+l()*s*Math.exp(-d*140)+(h<44100*.004?l()*n:0)}return Ap(a,5e3),Ti(a,.95)}function sb(i){let t=Math.floor(52920),e=new Float32Array(t),n=br(i),s=[[523,1],[1320,.6],[2130,.45],[3310,.3],[4870,.2]];for(let r=0;r<t;r++){let o=r/44100,a=0;for(let[l,c]of s)a+=Math.sin(2*Math.PI*l*o)*c*Math.exp(-o*(3+l/900));e[r]=a+n()*.3*Math.exp(-o*120)}return Ti(e,.8)}function du(i,t,e,n,s,r){let o=Math.floor(44100*i),a=new Float32Array(o),l=br(r);for(let c=0;c<o;c++){let h=c/44100;a[c]=l()*Math.min(1,h/n)*Math.exp(-h*s)}return t&&Ap(a,t),e&&ib(a,e),Ti(a,.8)}function Tp(i){let t=Math.floor(44100*i.reduce((s,[r,o])=>s+r+o,0)),e=new Float32Array(t),n=0;for(let[s,r]of i){let o=Math.floor(44100*s),a=0;for(let l=0;l<o;l++){let c=l/44100,h=2950+90*Math.sin(2*Math.PI*28*c)+40*Math.sin(2*Math.PI*7*c);a+=2*Math.PI*h/44100;let d=Math.min(1,c/.02)*Math.min(1,(s-c)/.04);e[n+l]=(Math.sin(a)*.7+Math.sin(a*2)*.12)*d}n+=o+Math.floor(44100*r)}return Ti(e,.55)}function rb(i,t=6){let e=Math.floor(44100*t),n=new Float32Array(e),s=br(i);for(let a=0;a<e;a++)n[a]=s();let r=new Float32Array(e);for(let[a,l,c]of[[420,1.2,1],[900,1.5,.8],[1800,2,.4],[260,.9,.7]]){let h=n.slice();rc(h,a,l);let d=s()*6;for(let u=0;u<e;u++)r[u]+=h[u]*c*(.75+.25*Math.sin(2*Math.PI*(u/e)*3+d))}let o=Math.floor(44100*.5);for(let a=0;a<o;a++){let l=a/o;r[a]=r[a]*l+r[e-o+a]*(1-l)}return Ti(r.subarray(0,e-o),.6)}function ob(i,t=3.2){let e=Math.floor(44100*t),n=new Float32Array(e),s=br(i);for(let o=0;o<e;o++)n[o]=s();let r=new Float32Array(e);for(let[o,a,l]of[[700,1.4,1],[1300,1.8,.7],[2500,2.2,.35],[380,1,.6]]){let c=n.slice();rc(c,o,a);for(let h=0;h<e;h++)r[h]+=c[h]*l}for(let o=0;o<e;o++){let a=o/44100;r[o]*=Math.min(1,a/.25)*Math.exp(-Math.max(0,a-1.2)*1.3)}return Ti(r,.85)}function ab(i){let t=Math.floor(70560),e=new Float32Array(t),n=br(i);for(let r=0;r<t;r++)e[r]=n();let s=new Float32Array(t);for(let r=0;r<3;r++){let o=e.slice();rc(o,380+r*180,3);for(let a=0;a<t;a++)s[a]+=o[a]}for(let r=0;r<t;r++){let o=r/44100;s[r]*=Math.min(1,o/.15)*Math.exp(-o*1.6)*(1-.3*o/1.6)}return Ti(s,.7)}function Ep(i,t,e){let n=Math.floor(44100*t),s=new Float32Array(n);for(let r=0;r<n;r++){let o=r/44100;s[r]=Math.sin(2*Math.PI*i*o)*Math.exp(-o*30)*Math.min(1,o/.003)}return Ti(s,.5)}function lb(i){let t=Math.floor(12348.000000000002),e=new Float32Array(t),n=0;for(let r=0;r<t;r++){let a=210-60*(r/44100);n+=a/44100,e[r]=n%1*2-1}let s=new Float32Array(t);for(let[r,o,a]of[[650,5,1],[1700,7,.6],[2600,8,.3]]){let l=e.slice();rc(l,r,o);for(let c=0;c<t;c++)s[c]+=l[c]*a}for(let r=0;r<t;r++){let o=r/44100;s[r]*=Math.min(1,o/.02)*Math.exp(-o*7)}return Ti(s,.6)}var sc=class{constructor(){this.ctx=null,this.buffers={},this.vol={master:.8,sfx:.9,crowd:.6},this.ready=!1,this.crowdLevel=.3,this.muted=!1}init(){if(this.ctx)return;let t=window.AudioContext||window.webkitAudioContext;if(!t)return;try{this.ctx=new t({latencyHint:"interactive"})}catch{return}let e=this.ctx;this.master=e.createGain(),this.sfx=e.createGain(),this.crowd=e.createGain(),this.sfx.connect(this.master),this.crowd.connect(this.master),this.master.connect(e.destination);let n={touch:xo(.07,260,120,.25,.25,1),pass:xo(.1,220,90,.5,.35,2),shot:xo(.16,190,60,1,.7,3),bounce:xo(.08,140,70,.1,.1,4),post:sb(5),net:du(.6,3e3,400,.01,7,6),tackle:du(.18,1800,120,.004,22,7),slide:du(.55,2400,500,.03,5,8),catch:xo(.1,160,80,.6,.6,9),whistle:Tp([[.32,0]]),whistleLong:Tp([[.3,.12],[.3,.12],[.75,0]]),crowd:rb(10),cheer:ob(11),groan:ab(12),ui:Ep(1400,.06,13),ack:Ep(1900,.09,14),shout:lb(15)};for(let[s,r]of Object.entries(n)){let o=e.createBuffer(1,r.length,44100);o.copyToChannel(r,0),this.buffers[s]=o}this.applyVolumes(),this.ready=!0}resume(){this.ctx&&this.ctx.state!=="running"&&!this.muted&&this.ctx.resume().catch(()=>{})}suspend(){this.ctx&&this.ctx.state==="running"&&this.ctx.suspend().catch(()=>{})}setMuted(t){this.muted=t,t?this.suspend():this.resume()}setVolumes(t){Object.assign(this.vol,t),this.applyVolumes()}applyVolumes(){this.ctx&&(this.master.gain.value=this.vol.master,this.sfx.gain.value=this.vol.sfx,this.crowd.gain.value=this.vol.crowd)}play(t,e={}){if(!this.ready||this.ctx.state!=="running")return;let n=this.buffers[t];if(!n)return;let s=this.ctx,r=s.createBufferSource();r.buffer=n,e.rate&&(r.playbackRate.value=e.rate);let o=s.createGain();o.gain.value=e.gain??1;let a=o;if(e.pan&&s.createStereoPanner){let l=s.createStereoPanner();l.pan.value=Math.max(-1,Math.min(1,e.pan)),o.connect(l),a=l}return r.connect(o),a.connect(e.group==="crowd"?this.crowd:this.sfx),r.start(),r}startCrowd(t=.4){if(!this.ready)return;this.stopCrowd();let e=this.ctx;this.crowdSrc=e.createBufferSource(),this.crowdSrc.buffer=this.buffers.crowd,this.crowdSrc.loop=!0,this.crowdGain=e.createGain(),this.crowdGain.gain.value=0,this.crowdSrc.connect(this.crowdGain).connect(this.crowd),this.crowdSrc.start(),this.baseCrowd=t,this.setExcitement(0)}stopCrowd(){if(this.crowdSrc){try{this.crowdSrc.stop()}catch{}this.crowdSrc.disconnect(),this.crowdSrc=null}}setExcitement(t){if(!this.crowdGain)return;let e=this.baseCrowd*(.45+.9*Math.min(1,t));this.crowdGain.gain.setTargetAtTime(e,this.ctx.currentTime,.4)}};var fu=[["W A S D","Move (relative to where you look)"],["Mouse","Look"],["Shift","Sprint"],["Left mouse","Shoot (hold to charge, release to strike)"],["Right mouse","Pass to the highlighted teammate (hold briefly for more power)"],["Space","Through pass (with the ball) / call for a pass (without it)"],["E","Standing tackle (lunges at the ball when it is close)"],["C","Slide tackle"],["Esc","Pause"]],oc=class{constructor(t){this.el=t,this.keys=new Set,this.lookX=0,this.lookY=0,this.buttons=0,this.locked=!1,this.lockSupported="requestPointerLock"in t,this.dragMode=!this.lockSupported,this.active=!1,this.listeners=[],this.onPause=null,this.onLockLost=null,this.onLockError=null,this.sensitivity=1,this.invertY=!1,this.lastLockExit=0,this.handlers={keydown:e=>this.keydown(e),keyup:e=>this.keyup(e),mousemove:e=>this.mousemove(e),mousedown:e=>this.mousedown(e),mouseup:e=>this.mouseup(e),contextmenu:e=>{this.active&&e.preventDefault()},plc:()=>this.lockChange(),ple:()=>{this.locked=!1,this.onLockError&&this.onLockError()},blur:()=>{this.keys.clear(),this.releaseAll()}},window.addEventListener("keydown",this.handlers.keydown),window.addEventListener("keyup",this.handlers.keyup),window.addEventListener("mousemove",this.handlers.mousemove),window.addEventListener("mousedown",this.handlers.mousedown),window.addEventListener("mouseup",this.handlers.mouseup),window.addEventListener("contextmenu",this.handlers.contextmenu),document.addEventListener("pointerlockchange",this.handlers.plc),document.addEventListener("pointerlockerror",this.handlers.ple),window.addEventListener("blur",this.handlers.blur)}on(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(e=>e!==t)}}emit(t,e){for(let n of this.listeners)n(t,e)}requestLock(){if(!this.lockSupported)return this.dragMode=!0,!1;try{let t=this.el.requestPointerLock();t&&t.catch&&t.catch(()=>{this.onLockError&&this.onLockError()})}catch{return this.dragMode=!0,!1}return!0}exitLock(){document.pointerLockElement&&document.exitPointerLock()}lockChange(){let t=this.locked;this.locked=document.pointerLockElement===this.el,this.locked&&(this.dragMode=!1,!t&&this.onLockGained&&this.onLockGained()),t&&!this.locked&&(this.lastLockExit=performance.now(),this.releaseAll(),this.active&&this.onLockLost&&this.onLockLost())}releaseAll(){this.buttons&1&&this.emit("shoot",!1),this.buttons&2&&this.emit("pass",!1),this.buttons=0}keydown(t){let e=t.code;if(e==="Escape"){this.onPause&&this.onPause();return}this.active&&(["Space","ShiftLeft","ShiftRight","KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e)&&t.preventDefault(),!t.repeat&&(this.keys.add(e),e==="Space"?this.emit("through",!0):e==="KeyE"?this.emit("tackle",!0):e==="KeyC"?this.emit("slide",!0):e==="KeyP"&&this.onPause&&this.onPause()))}keyup(t){this.keys.delete(t.code),t.code==="Space"&&this.emit("through",!1)}mousedown(t){this.active&&(!this.locked&&!this.dragMode||t.target!==this.el&&!this.locked||(t.button===0&&(this.buttons|=1,this.emit("shoot",!0)),t.button===2&&(this.buttons|=2,this.emit("pass",!0),t.preventDefault())))}mouseup(t){t.button===0&&this.buttons&1&&(this.buttons&=-2,this.emit("shoot",!1)),t.button===2&&this.buttons&2&&(this.buttons&=-3,this.emit("pass",!1))}mousemove(t){this.active&&(this.locked||this.dragMode&&t.buttons&7)&&(this.lookX+=t.movementX||0,this.lookY+=t.movementY||0)}axes(){let t=this.keys,e=(t.has("KeyW")?1:0)-(t.has("KeyS")?1:0),n=(t.has("KeyD")?1:0)-(t.has("KeyA")?1:0);return{f:e,r:n,sprint:t.has("ShiftLeft")||t.has("ShiftRight")}}consumeLook(t,e){let n=.0022*this.sensitivity;t.yaw-=this.lookX*n,t.pitch-=this.lookY*n*(this.invertY?-1:1);let s=this.keys,r=2.2*e*this.sensitivity;s.has("ArrowLeft")&&(t.yaw+=r),s.has("ArrowRight")&&(t.yaw-=r),s.has("ArrowUp")&&(t.pitch+=r*.6*(this.invertY?-1:1)),s.has("ArrowDown")&&(t.pitch-=r*.6*(this.invertY?-1:1)),this.lookX=0,this.lookY=0,t.pitch=Math.max(-1.35,Math.min(1,t.pitch))}get held(){return{lmb:!!(this.buttons&1),rmb:!!(this.buttons&2)}}};var De=(i,t,e,n)=>{let s=document.createElement(i);return t&&(s.className=t),n!=null&&(s.innerHTML=n),e&&e.appendChild(s),s},ac=class{constructor(t){this.root=De("div","hud hidden",t),this.poss=De("div","hud-poss",this.root),De("div","hud-poss-label",this.poss,"YOU HAVE THE BALL"),this.hasBall=!1;let e=De("div","hud-top",this.root);this.teamA=De("span","hud-team",e),this.score=De("span","hud-score",e,"0 - 0"),this.teamB=De("span","hud-team",e),this.clock=De("div","hud-clock",this.root,"00:00"),this.phase=De("div","hud-phase",this.root);let n=De("div","hud-player",this.root);this.ratingEl=De("div","hud-rating",n,"6.0"),De("div","hud-rating-label",n,"RATING");let s=De("div","hud-stamina",n);this.stamFill=De("div","hud-stamina-fill",s),this.nameEl=De("div","hud-name",n),this.cross=De("div","hud-cross",this.root),this.power=De("div","hud-power hidden",this.root),this.powerFill=De("div","hud-power-fill",this.power),this.hint=De("div","hud-hint",this.root),this.notes=De("div","hud-notes",this.root),this.arrow=De("div","hud-arrow hidden",this.root),this.banner=De("div","hud-banner hidden",this.root),this.fade=De("div","hud-fade",this.root),this.radar=De("canvas","hud-radar",this.root),this.radar.width=180,this.radar.height=250,this.rctx=this.radar.getContext("2d"),this.lastNotes=[],this.v=new L,this.bannerUntil=0,this.fadeUntil=0}show(t){this.root.classList.toggle("hidden",!t)}notify(t,e=""){let n=De("div","hud-note "+e,this.notes,t);for(this.lastNotes.push(n),setTimeout(()=>n.classList.add("out"),1300),setTimeout(()=>n.remove(),1700);this.notes.children.length>3;)this.notes.firstChild.remove()}showBanner(t,e="",n=2200,s=""){this.banner.className="hud-banner "+s,this.banner.innerHTML=`<div class="b-main">${t}</div>${e?`<div class="b-sub">${e}</div>`:""}`,this.bannerUntil=performance.now()+n}flashFade(){this.fade.classList.remove("on"),this.fade.offsetWidth,this.fade.classList.add("on")}update(t){let e=t.match,n=e.human;this.teamA.textContent=e.teams[0].short,this.teamB.textContent=e.teams[1].short,this.teamA.style.setProperty("--kit",t.kitA||"#c00"),this.teamB.style.setProperty("--kit",t.kitB||"#00c"),this.score.textContent=`${e.teams[0].score} - ${e.teams[1].score}`,this.clock.textContent=t.clockText??e.displayClock,this.phase.textContent=t.phaseText||"",n&&(this.ratingEl.textContent=e.stats.rating(n).toFixed(1),this.stamFill.style.width=`${Math.round(n.stamina*100)}%`,this.stamFill.classList.toggle("low",n.stamina<.3),this.nameEl.textContent=`${n.number} ${n.name}`);let s=n&&n.action,r=s&&s.type==="kick"&&(s.kind==="shot"||s.kind==="pass")&&!s.contacted&&s.charge>.01,o=t.intentCharge||0;this.power.classList.toggle("hidden",!(r||o>.01)),(r||o>.01)&&(this.powerFill.style.width=`${Math.round((r?s.charge:o)*100)}%`),this.hint.textContent=t.hint||"";let a=!!n&&e.ball.owner===n&&e.ball.state==="controlled"&&e.phase==="playing";a!==this.hasBall&&(this.hasBall=a,this.poss.classList.toggle("on",a)),this.banner.classList.toggle("hidden",performance.now()>this.bannerUntil),this.updateArrow(t),this.drawRadar(t)}updateArrow(t){let e=t.match,n=e.ball.pos,s=t.view.projectToScreen(this.v.set(n.x,n.y,n.z),this.v);if(!(Math.abs(s.x)>.98||Math.abs(s.y)>.98)||e.phase==="goal"||t.noArrow||this.hasBall){this.arrow.classList.add("hidden");return}let o=Math.atan2(s.y,s.x),a=.86,l=Math.min(a/Math.max(Math.abs(Math.cos(o)),.001),a/Math.max(Math.abs(Math.sin(o)),.001)),c=(Math.cos(o)*l*.5+.5)*100,h=(-Math.sin(o)*l*.5+.5)*100;this.arrow.classList.remove("hidden"),this.arrow.style.left=`${c}%`,this.arrow.style.top=`${h}%`,this.arrow.style.transform=`translate(-50%,-50%) rotate(${-o}rad)`}drawRadar(t){let e=t.match,n=this.rctx,s=this.radar.width,r=this.radar.height,o=e.human,a=o?o.team:0,l=e.attackDir(a),c=10,h=(s-c*2)/it.W,d=(r-c*2)/it.L,u=(m,f)=>[c+(it.HW+f*l)*h,c+(it.HL-m*l)*d],p=t.style;n.clearRect(0,0,s,r),n.fillStyle=p==="neo"?"rgba(40,180,70,0.85)":"rgba(250,250,245,0.82)",n.fillRect(0,0,s,r),n.strokeStyle=p==="neo"?"#fff":"#222",n.lineWidth=1,n.strokeRect(c,c,s-c*2,r-c*2),n.beginPath(),n.moveTo(c,r/2),n.lineTo(s-c,r/2),n.stroke(),n.beginPath(),n.arc(s/2,r/2,Yt.CIRCLE_R*h,0,Math.PI*2),n.stroke();for(let m of[it.HL,-it.HL]){let[f,M]=u(m,Yt.PEN_HW),[y,v]=u(m-Math.sign(m)*Yt.PEN_D,-Yt.PEN_HW);n.strokeRect(Math.min(f,y),Math.min(M,v),Math.abs(y-f),Math.abs(v-M));let[b,S]=u(m,dt.HW),[E]=u(m,-dt.HW);n.lineWidth=3,n.beginPath(),n.moveTo(b,S),n.lineTo(E,S),n.stroke(),n.lineWidth=1}for(let m of e.players){let[f,M]=u(m.pos.x,m.pos.z);n.fillStyle=m.team===0?t.kitA:t.kitB,n.strokeStyle="#111",n.beginPath(),n.arc(f,M,m===o?0:3.6,0,Math.PI*2),n.fill(),n.stroke()}if(o){let[m,f]=u(o.pos.x,o.pos.z),M=t.camYaw,y=Math.sin(M),b=Math.cos(M)*l,S=-y*l;n.fillStyle=p==="neo"?"#ffe45c":"#111",n.beginPath(),n.moveTo(m+b*9,f+S*9),n.lineTo(m-S*5-b*3,f+b*5-S*3),n.lineTo(m+S*5-b*3,f-b*5-S*3),n.closePath(),n.fill(),n.strokeStyle=p==="neo"?"#000":"#fff",n.stroke()}let[g,x]=u(e.ball.pos.x,e.ball.pos.z);n.fillStyle="#fff",n.strokeStyle="#000",n.lineWidth=1.5,n.beginPath(),n.arc(g,x,3,0,Math.PI*2),n.fill(),n.stroke()}};var lc=class{constructor(){this.handlers=new Map,this.log=[],this.nextId=1,this.maxLog=4e3}on(t,e){return this.handlers.has(t)||this.handlers.set(t,[]),this.handlers.get(t).push(e),()=>{let n=this.handlers.get(t),s=n.indexOf(e);s>=0&&n.splice(s,1)}}emit(t,e){let n=Object.assign({id:this.nextId++,type:t},e);this.log.push(n),this.log.length>this.maxLog&&this.log.splice(0,this.log.length-this.maxLog);let s=this.handlers.get(t);if(s)for(let o=0;o<s.length;o++)s[o](n);let r=this.handlers.get("*");if(r)for(let o=0;o<r.length;o++)r[o](n);return n}};var di=class{constructor(t=1){this.s=t>>>0||1}next(){let t=(this.s+=1831565813)>>>0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return Math.floor(this.range(t,e+1))}chance(t){return this.next()<t}pick(t){return t[Math.floor(this.next()*t.length)%t.length]}gauss(){return(this.next()+this.next()+this.next()+this.next()-2)*1.732}};function fi(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function Rp(i,t,e){let n=Math.abs(i);return n>it.HL&&Math.abs(e)<dt.HW+.05&&t<dt.H+.05&&n<Nl(t)+.05}function cb(i,t,e){let n=t.pos.x,s=t.pos.z,r=e.pos.x,o=e.pos.z;if(Rp(r,e.pos.y,o)!==Rp(n,.5,s))return!1;for(let a of i.players){if(a===t)continue;let l=Yn(a.pos.x,a.pos.z,n,s,r,o);if(l.t>.2&&l.t<.85&&l.d<.24)return!1}return!0}function hb(i,t,e){let n=i.time;if(n<t.noCaptureUntil||n<t.downUntil)return!1;let s=t.action;if(s&&(s.type==="slide"||s.type==="dive"||s.type==="tackle"||s.type==="kick"&&!s.contacted)||t.isGK&&i.keeperHandles(t,e))return!1;let r=e.pos.x-t.pos.x,o=e.pos.z-t.pos.z,a=Math.sqrt(r*r+o*o),l=ve.CONTROL_RADIUS*(t.isHuman?i.assist.claim:1);if(a>l||e.pos.y>ve.CONTROL_HEIGHT)return!1;let c=-(r*(e.vel.x-t.vel.x)+o*(e.vel.z-t.vel.z))/(a||1);if(a>.72&&c>.6)return!1;let h=e.vel.x-t.vel.x,d=e.vel.z-t.vel.z,u=e.vel.y,p=Math.sqrt(h*h+d*d+u*u),g=(e.pos.y>.35?10.5:14.5)+t.attrs.control*.08+(t.isHuman?(i.assist.claim-1)*16:0);if(p>g||a>l*(1-ft((p-6)/14,0,.45)))return!1;let x=e.lastKick;if(x&&x.player!==t&&x.target!==t&&p>4){let f=x.player&&x.player.isHuman&&i.isOpp(t)?i.assist.oppHumanPassReact:.16;if(i.time-x.t<f)return!1}let m=e.owner;if(m){if(m.team===t.team)return!1;let f=m.pos.distXZ(e.pos),M=ve.PROTECT_RADIUS+(m.isHuman?.5*i.assist.stick:0);if(f<=M||a>=f-.05)return!1}return cb(i,t,e)}function Cp(i,t){let e=i.ball;if(e.state==="held"||e.state==="dead")return;let n=i.time,s=e.owner;s&&(s.pos.distXZ(e.pos)>ve.LOSE_RADIUS||e.pos.y>1.7||n<s.downUntil||s.action&&s.action.type==="slide")&&i.loseControl("loose");let r=null,o=1e9;for(let a of i.players){if(a===e.owner||!hb(i,a,e))continue;let l=a.pos.distXZ(e.pos);(l<o-1e-6||Math.abs(l-o)<=1e-6&&r&&a.id<r.id)&&(r=a,o=l)}r&&(ub(i,r),i.gainControl(r)),e.owner&&e.state==="controlled"&&db(i,e.owner,t)}function ub(i,t){let e=i.ball,n=e.vel.x-t.vel.x,s=e.vel.z-t.vel.z,r=Math.sqrt(n*n+s*s+e.vel.y*e.vel.y),o=t.attrs.control/100,a=ft((r-4)/15,0,1)*(1.15-o*.7);if(t.isHuman)a*=i.assist.touch;else if(i.isOpp(t)){let S=i.aiParams[t.team].touch;a=Math.min(1.2,a*S+.04*(S-1))}let l=Math.hypot(t.desired.x,t.desired.z),c,h;l>1?(c=t.desired.x/l,h=t.desired.z/l):(c=Math.sin(t.yaw),h=Math.cos(t.yaw));let d=.7+a*3+(t.sprint&&l>1?1.2:0);t.isHuman&&(d*=1-.45*i.assist.stick);let u=i.rng.gauss()*a*.45,p=Math.cos(u),g=Math.sin(u),x=c*p+h*g,m=-c*g+h*p,f=l>1?.95:.6,M=t.vel.x*f+x*d,y=t.vel.z*f+m*d,v=0;e.pos.y>.2&&(v=Math.min(0,e.vel.y)*.15-.4),e.setVelocity(new ot(M,v,y)),e.sideSpin=0;let b=(e.pos.x-t.pos.x)*Math.cos(t.yaw)-(e.pos.z-t.pos.z)*Math.sin(t.yaw);t.touch={foot:b>0?"L":"R",time:i.time,x:e.pos.x,y:e.pos.y,z:e.pos.z,kind:"receive"},t.lastDribbleTouch=i.time,i.events.emit("touch",{player:t,kind:"receive",strength:r,t:i.time})}function db(i,t,e){let n=t.action;if(n&&(n.type==="kick"&&!n.charging||n.type==="tackle"||n.type==="slide"))return;let s=!!(n&&n.type==="kick"&&n.charging);if(t.isHuman&&i.assist.stick>0){fb(i,t,e,s);return}let r=i.ball,o=i.time;if(o-(t.lastDribbleTouch||0)<.14||r.pos.y>.45)return;let a=r.pos.x-t.pos.x,l=r.pos.z-t.pos.z;if(Math.hypot(a,l)>1.12)return;let h=Math.hypot(t.desired.x,t.desired.z),d=t.speed,u=r.vel.x,p=r.vel.z,g=Math.hypot(u,p),x=h>=.5,m=x?t.desired.x/h:Math.sin(t.yaw),f=x?t.desired.z/h:Math.cos(t.yaw),M=x?Math.min(h,t.maxSpeed(t.sprint,!0)):0,y=t.sprint&&M>t.jogSpeed()*1.02,v=.45+M*.07+(y?M*.17:0);s&&(v=.4+M*.05);let b=g>1&&x?Math.abs(ji(Kt(u,p),Kt(m,f))):0,S=(u-t.vel.x)*m+(p-t.vel.z)*f,E=a*m+l*f,_=x&&(b>.6&&g>1.5||E>v*1.1&&S>1.2),A=null;if(d>1.3&&!_){let qt=mr(d),se=gr(qt),Lt=se+(1-se)*.55;for(let[ae,Ae]of[["L",0],["R",.5]]){let Ke=((t.prevGait-Ae)%1+1)%1,Se=((t.gait-Ae)%1+1)%1;(Ke<Lt&&Se>=Lt||Se<Ke&&(Ke<Lt||Se>=Lt))&&(A=ae)}if(!A)return}else{if(!_&&o-(t.lastDribbleTouch||0)<.28)return;A=a*Math.cos(t.yaw)-l*Math.sin(t.yaw)>0?"L":"R"}if(!x){(Math.hypot(u-t.vel.x,p-t.vel.z)>.8||g>1.2)&&(r.setVelocity(new ot(t.vel.x*.45,0,t.vel.z*.45)),pu(i,t,A,"stop",1));return}if(E<-.35&&d>2.5)return;let C=.26,P=a+(u-t.vel.x)*C,N=l+(p-t.vel.z)*C,k=P*m+N*f,I=Math.abs(P*f-N*m);if(!(_||k<v*.6||I>.3||b>.35||g<M*.75&&k<v))return;let q=y?1:.8,Y=a*f-l*m,st=t.vel.x*m+t.vel.z*f,Z=st<M?(M-st)**2/26:0,Q=Math.max(0,v-E-Z),$=M;for(let qt=0;qt<2;qt++){let se=.6+.014*$*$;$=M+Math.sqrt(2*se*Q)}E>v&&($=M-Math.min(1.5,(E-v)*1.5)),$=ft($,M*.6,M+3);let _t=-Y/q,Et=m*$+f*_t,lt=f*$-m*_t,et=Math.hypot(Et,lt)||.01,zt=Et/et,G=lt/et;if(g>2.5){let qt=y?.9:1.4,se=Kt(u,p),Lt=Kt(zt,G),ae=ji(se,Lt);if(Math.abs(ae)>qt){let Ae=se+Math.sign(ae)*qt;zt=Math.sin(Ae),G=Math.cos(Ae),et=Math.min(et,M*.8+1)}}let K=t.attrs.control,ht=(100-K)*45e-5*(1+d/6);t.isHuman?ht*=i.assist.touch:i.isOpp(t)&&(ht*=i.aiParams[t.team].touch);let At=i.rng.gauss()*ht,ct=Math.cos(At),Ot=Math.sin(At),fe=zt*ct+G*Ot,$t=-zt*Ot+G*ct;et*=1+i.rng.gauss()*(100-K)*.0012,r.setVelocity(new ot(fe*et,0,$t*et)),pu(i,t,A,"dribble",et)}function fb(i,t,e,n){let s=i.ball,r=i.time;if(s.pos.y>.9)return;let o=i.assist.stick,a=t.faceYaw!=null?t.faceYaw:t.yaw,l=Math.sin(a),c=Math.cos(a),h=Math.hypot(t.desired.x,t.desired.z),d=l,u=c;if(h>.5){let N=t.desired.x/h,k=t.desired.z/h;if(N*l+k*c>-.3){d=N*.75+l*.25,u=k*.75+c*.25;let I=Math.hypot(d,u)||1;d/=I,u/=I}}let p=Math.hypot(t.vel.x,t.vel.z),g=n?.48+p*.03:.45+p*.035+(t.sprint?p*.02:0);g*=1+(1-o)*.5;let x=t.pos.x+d*g,m=t.pos.z+u*g,f=5+6*o,M=t.vel.x+(x-s.pos.x)*f,y=t.vel.z+(m-s.pos.z)*f,v=M-t.vel.x,b=y-t.vel.z,S=Math.hypot(v,b),E=3.5+3.5*o;S>E&&(M=t.vel.x+v/S*E,y=t.vel.z+b/S*E);let _=1-Math.exp(-(8+22*o)*e);if(s.vel.x+=(M-s.vel.x)*_,s.vel.z+=(y-s.vel.z)*_,s.sideSpin=0,r-(t.lastDribbleTouch||0)<.3)return;let A=s.pos.x-t.pos.x,C=s.pos.z-t.pos.z;if(Math.hypot(A,C)>1.1)return;let P=null;if(p>1.3){let N=mr(p),k=gr(N)+(1-gr(N))*.55;for(let[I,z]of[["L",0],["R",.5]]){let q=((t.prevGait-z)%1+1)%1,Y=((t.gait-z)%1+1)%1;(q<k&&Y>=k||Y<q&&(q<k||Y>=k))&&(P=I)}if(!P||r-(t.lastDribbleTouch||0)<.42)return}else{if(Math.hypot(s.vel.x-t.vel.x,s.vel.z-t.vel.z)<.6||r-(t.lastDribbleTouch||0)<.45)return;P=A*Math.cos(t.yaw)-C*Math.sin(t.yaw)>0?"L":"R"}pu(i,t,P,"dribble",Math.hypot(s.vel.x,s.vel.z))}function pu(i,t,e,n,s){let r=i.ball;t.touch={foot:e,time:i.time,x:r.pos.x,y:r.pos.y,z:r.pos.z,kind:n},t.lastDribbleTouch=i.time,r.lastTouch=t,r.lastTouchTime=i.time,i.events.emit("touch",{player:t,kind:n,strength:s,t:i.time})}function Pp(i,t,e){let n=i.time;for(let s of i.players){if(s===t.owner||t.lastTouch===s&&n-s.lastKickAt<ve.KICK_RELEASE_LOCK)continue;if(s.isGK&&i.keeperHandles(s,t)){if(i.keeperContact(s,t))return;continue}if(t.pos.y>1.9+ye||s.action&&s.action.type==="slide"&&s.action.sliding&&t.pos.y>.55)continue;let o=t.pos.x-s.pos.x,a=t.pos.z-s.pos.z,l=(t.pos.y<.95?.24:.2)+ye,c=o*o+a*a;if(c>=l*l||c<1e-8)continue;let h=Math.sqrt(c),d=o/h,u=a/h;t.pos.x=s.pos.x+d*l,t.pos.z=s.pos.z+u*l;let p=t.vel.x-s.vel.x,g=t.vel.z-s.vel.z,x=p*d+g*u;if(x<0){t.vel.x-=d*x*1.3,t.vel.z-=u*x*1.3,t.vel.y*=.7,t.version++;let m=t.owner&&t.owner.isHuman?2.5+3*i.assist.stick:2.5;t.owner&&t.owner.team!==s.team&&-x>m&&i.loseControl("blocked"),-x>.8&&(t.lastTouch=s,t.lastTouchTime=n,i.events.emit("deflect",{player:s,speed:-x,t:n}))}}}var yo={"2-3-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.6,v:.36},{role:"DEF",u:-.6,v:-.36},{role:"W",u:.04,v:.68},{role:"CM",u:-.22,v:0},{role:"W",u:.04,v:-.68},{role:"ST",u:.36,v:0}],"2-2-1-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.6,v:.38},{role:"DEF",u:-.6,v:-.38},{role:"CM",u:-.24,v:.34},{role:"CM",u:-.24,v:-.34},{role:"AM",u:.1,v:0},{role:"ST",u:.4,v:0}],"3-2-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.58,v:.5},{role:"DEF",u:-.66,v:0},{role:"DEF",u:-.58,v:-.5},{role:"CM",u:-.14,v:.33},{role:"CM",u:-.14,v:-.33},{role:"ST",u:.38,v:0}],"2-1-2-1":[{role:"GK",u:-.95,v:0},{role:"DEF",u:-.6,v:.36},{role:"DEF",u:-.6,v:-.36},{role:"CM",u:-.3,v:0},{role:"AM",u:.08,v:.42},{role:"AM",u:.08,v:-.42},{role:"ST",u:.4,v:0}]},Mr={possession:{formation:"2-2-1-1",passShort:.25,cross:.05,press:0,line:0,width:1,dribble:0,tempo:.9,label:"Patient possession"},direct:{formation:"3-2-1",passShort:-.2,cross:.1,press:-.05,line:-.04,width:.95,dribble:.05,tempo:1.1,label:"Direct football"},wing:{formation:"2-3-1",passShort:0,cross:.3,press:0,line:0,width:1.15,dribble:.12,tempo:1,label:"Wing play"},pressing:{formation:"2-3-1",passShort:.1,cross:.05,press:.25,line:.08,width:1,dribble:.05,tempo:1.15,label:"High pressing"},counter:{formation:"3-2-1",passShort:-.1,cross:.05,press:-.15,line:-.1,width:.9,dribble:.15,tempo:1.05,label:"Counter attack"}};function cc(i,t){let e=(Mr[i]||Mr.wing).formation;return!t||yo[e].some(n=>n.role===t)?e:t==="AM"?"2-2-1-1":"2-3-1"}var Ip={GK:[-1,-.7],DEF:[-.9,.3],CM:[-.75,.6],AM:[-.5,.82],W:[-.6,.86],ST:[-.3,.9]};var kt=new ot,mu=new ot,gu=new ot;function xu(i,t){let e=i.teams[t],n=ft((e.tier||1)-1,0,4),s=i.human&&i.human.team===t,r=i.human&&!s,o=i.assist,a=e.style||{press:0};return{reaction:[.4,.34,.29,.25,.21][n]*(r?o.oppReact:1),think:[.3,.26,.22,.19,.16][n],noise:Math.max(.02,[.2,.15,.11,.08,.06][n]+(r?o.oppNoise:0)),aggro:[.34,.4,.48,.56,.64][n]*(r?o.oppAggro:1),pressRange:[11,12.5,14,16,18][n]*(1+(a.press||0))*(r?.5+.5*o.oppAggro:1),tackleBonus:[-.06,-.03,0,.02,.04][n],humanBonus:s?[.42,.36,.3,.24,.2][n]:0,holdMin:[.55,.45,.38,.3,.26][n],gkReaction:[.34,.3,.27,.24,.21][n]*(r?1+(o.oppReact-1)*.5:1),gkHold:[1.9,1.7,1.5,1.35,1.2][n],slideChance:[.04,.05,.05,.06,.06][n]*(r?o.oppAggro:1),shootBias:[0,.02,.04,.05,.06][n],passErr:r?1+(o.oppPassError-1)*(1-.1*n):1,shotErr:r?1+(o.oppShotError-1)*(1-.1*n):1,touch:r?1+(o.oppTouch-1)*(1-.1*n):1,mistake:r?o.oppMistake*(1-.1*n):0}}var hc=class{constructor(){this.phase="loose",this.winner=null,this.chaser=null,this.chaseT=99,this.chasePoint=new ot,this.presser=null,this.cover=null,this.supporters=[],this.runner=null,this.marks=new Map,this.lastDefU=.5,this.deepestOppU=-.5}},uc=class{constructor(t){this.m=t,this.ts=[new hc,new hc],this.nextTeamThink=0,this.intercepts=new Map}params(t){return this.m.aiParams[t]}update(t){let e=this.m;e.time>=this.nextTeamThink&&(this.nextTeamThink=e.time+.1,e.phase==="playing"&&(this.computeIntercepts(),this.teamThink(0),this.teamThink(1)));for(let n of e.players)if(!(n.isHuman||n.scripted)){if(n.sprint=!1,n.isGK){e.phase==="playing"||e.ball.state==="held"&&e.ball.owner===n?bp(e,n,t,this.params(n.team)):this.nonPlayingMove(n);continue}e.phase==="playing"?this.playing(n,t):this.nonPlayingMove(n)}}computeIntercepts(){let t=this.m,e=t.ball,n=t.traj;if(this.intercepts.clear(),e.owner||e.state==="held"||e.state==="dead")return;let s=t.time-n.t0;for(let r of t.players){r.isGK||r.isHuman;let o=null,a=r.isHuman?.1:this.params(r.team).reaction*.5,l=r.action&&(r.action.type==="slide"||r.action.type==="dive")||t.time<r.downUntil?.6:0;for(let c=0;c<=3.2;c+=.08){if(n.at(c+s,kt),kt.y>1.6)continue;if(Math.max(0,Math.hypot(kt.x-r.pos.x,kt.z-r.pos.z)-.7)/r.sprintSpeed()+a+l<=c){o={t:c,x:kt.x,z:kt.z};break}}o||(n.at(3.2+s,kt),o={t:3.2+Math.hypot(kt.x-r.pos.x,kt.z-r.pos.z)/r.sprintSpeed(),x:kt.x,z:kt.z}),this.intercepts.set(r,o)}}teamThink(t){let e=this.m,n=e.ball,s=this.ts[t],r=e.teams[t].players,o=e.teams[1-t].players,a=n.owner;if(!r.length)return;a&&n.state!=="held"||n.state==="held"&&a?s.phase=a.team===t?"attack":"defend":s.phase="loose";let l=-1,c=1;for(let h of o){if(h.isGK)continue;let d=e.uOf(t,h.pos.x);d>l&&(l=d),d<c&&(c=d)}if(s.lastDefU=l,s.deepestOppU=c,s.chaser=null,s.chaseT=99,s.phase==="loose"&&this.intercepts.size){let h=null,d=99,u=99,p=99;for(let x of e.players){let m=this.intercepts.get(x);if(!m)continue;if(x.team!==t){!x.isGK&&m.t<p&&(p=m.t);continue}if(x.isHuman){u=m.t;continue}if(x.isGK)continue;let f=m.t;e.passIntent&&e.passIntent.target===x&&(f-=.6),f<d&&(d=f,h=x)}if(h&&!(u<d-.45)){s.chaser=h,s.chaseT=d;let x=this.intercepts.get(h);s.chasePoint.set(x.x,0,x.z)}let g=Math.min(d,u);s.winner=g<p-.15?t:p<g-.15?1-t:null}if(s.presser=null,s.cover=null,s.phase==="defend"&&a){let h=this.params(t),d=e.ownGoalX(t),u=null,p=1e9,g=null,x=1e9;for(let f of r){if(f.isGK||f.isHuman)continue;let M=f.pos.distXZ(a.pos);e.toWorld(t,f.home.u,f.home.v,kt);let y=kt.distXZ(a.pos),v=(f.pos.x-a.pos.x)*Math.sign(d-a.pos.x)>-1?0:3,b=M+Math.max(0,y-h.pressRange)*.9+v;b<p?(g=u,x=p,u=f,p=b):b<x&&(g=f,x=b)}let m=e.human;m&&m.team===t&&m.pos.distXZ(a.pos)<3&&u?s.cover=u:(s.presser=u,s.cover=g)}if(s.supporters=[],s.phase==="attack"&&a&&a.team===t&&!a.isGK){let h=r.filter(g=>g!==a&&!g.isGK&&!g.isHuman).sort((g,x)=>g.pos.distXZ(a.pos)-x.pos.distXZ(a.pos)),d=[];for(let g of h.slice(0,2)){let x=this.supportSpot(g,a,d);x&&(d.push(x),s.supporters.push(g),g.ai.support=x)}let u=e.time;s.runner&&s.runner.ai.run&&s.runner.ai.run.until<u&&(s.runner=null);let p=e.uOf(t,a.pos.x);if(!s.runner&&p>-.45&&u>(s.nextRun||0)){let g=null,x=-2;for(let m of r){if(m===a||m.isHuman||m.isGK||!["ST","W","AM"].includes(m.role)||s.supporters.includes(m))continue;let f=e.uOf(t,m.pos.x);f>x&&(x=f,g=m)}if(g){let m=Math.min(.88,Math.max(l+.1,e.uOf(t,g.pos.x)+.2)),f=e.vOf(t,g.pos.z)*.6;e.toWorld(t,m,f,mu);let M=99;for(let y of o)M=Math.min(M,y.pos.distXZ(mu));M>3.5&&(g.ai.run={until:u+2.8,target:mu.clone()},s.runner=g,s.nextRun=u+4.5)}}}else s.runner=null;if(s.marks.clear(),s.phase==="defend"||s.phase==="loose"&&s.winner===1-t){let h=o.filter(g=>!g.isGK&&g!==a).sort((g,x)=>e.uOf(t,g.pos.x)-e.uOf(t,x.pos.x)),d=r.filter(g=>!g.isGK&&!g.isHuman&&g!==s.presser&&g!==s.cover&&g!==s.chaser),u=["DEF","CM","AM","W","ST"];d.sort((g,x)=>u.indexOf(g.role)-u.indexOf(x.role));let p=new Set;for(let g of d){this.shapeTarget(g,kt);let x=null,m=13;for(let f of h){if(p.has(f)||e.uOf(t,f.pos.x)>.35&&g.role==="DEF")continue;let M=f.pos.distXZ(kt);M<m&&(m=M,x=f)}x&&(p.add(x),s.marks.set(g,x))}}}supportSpot(t,e,n){let s=this.m,r=t.team,o=s.attackDir(r),a=null,l=-1e9;this.shapeTarget(t,gu);let c=t.role==="ST"||t.role==="W"||t.role==="AM";for(let h of[-140,-100,-65,-35,0,35,65,100,140]){let d=h*Math.PI/180;for(let u of[8,12,16]){let p=e.pos.x+Math.cos(d)*u*o,g=e.pos.z+Math.sin(d)*u;if(Math.abs(p)>it.HL-2||Math.abs(g)>it.HW-1.5)continue;let x=ci(s,e.pos.x,e.pos.z,p,g,r,12),m=99;for(let b of s.players)b.team!==r&&(m=Math.min(m,Math.hypot(b.pos.x-p,b.pos.z-g)));let f=0;for(let b of s.teams[r].players){if(b===t||b===e)continue;let S=Math.hypot(b.pos.x-p,b.pos.z-g);S<6&&(f+=(6-S)/6)}for(let b of n){let S=Math.hypot(b.x-p,b.z-g);S<7&&(f+=(7-S)/5)}let M=(p-e.pos.x)*o/u,y=Math.hypot(gu.x-p,gu.z-g),v=x*1+Math.min(m,8)/8*.8+M*(c?.45:.25)-y*.035-f*.6-t.pos.distXZ(kt.set(p,0,g))*.015;v>l&&(l=v,a={x:p,z:g})}}return a?new ot(a.x,0,a.z):null}shapeTarget(t,e){let n=this.m,s=n.teams[t.team],r=s.style,o=n.ball,a=this.ts[t.team],l=n.uOf(t.team,o.pos.x),c=n.vOf(t.team,o.pos.z),h=a.phase==="attack"||a.phase==="loose"&&a.winner===t.team,d=t.home.u+l*.42+(r.line||0),u=t.home.v;h?d+=t.role==="DEF"?.12:.2:d-=.06,u=u*(h?1.12*(r.width||1):.8)+c*(h?.2:.35);let p=Ip[t.role]||[-.9,.9];return d=ft(d,p[0],p[1]),!h&&(t.role==="DEF"||t.role==="CM")&&(d=Math.min(d,l-(t.role==="DEF"?.1:.02))),t.role==="DEF"&&(d=Math.min(d,a.deepestOppU-.03,h?.3:.1)),d=ft(d,-.92,.92),u=ft(u,-.92,.92),n.toWorld(t.team,d,u,e)}playing(t,e){let n=this.m,s=n.ball,r=n.time,o=this.ts[t.team],a=this.params(t.team),l=t.ai;if(t.faceYaw=null,r<t.downUntil){t.desired.set(0,0,0);return}if(t.action&&(t.action.type==="slide"||t.action.type==="dive"))return;if(s.owner===t){this.carrier(t,e);return}let c=n.passIntent;if(c&&c.target===t&&!s.owner&&r-c.t<4){let u=this.intercepts.get(t),p=u&&u.t<3?kt.set(u.x,0,u.z):kt.set(c.point?c.point.x:s.pos.x,0,c.point?c.point.z:s.pos.z);this.moveTo(t,p,!0,.2),t.pos.distXZ(p)<1.2&&(t.faceYaw=Kt(s.pos.x-t.pos.x,s.pos.z-t.pos.z)),l.state="receive";return}if(o.phase==="loose"){if(o.chaser===t){l.state="chase",this.moveTo(t,o.chasePoint,!0,.05),t.faceYaw=t.pos.distXZ(o.chasePoint)<1.5?Kt(s.pos.x-t.pos.x,s.pos.z-t.pos.z):null;return}l.state="shape",this.shapeTarget(t,kt),this.moveTo(t,kt,!1,.6),this.faceBallIfClose(t,kt);return}if(o.phase==="attack"){if(l.run&&l.run.until>r&&o.runner===t){l.state="run",this.moveTo(t,l.run.target,!0,.3);return}if(o.supporters.includes(t)&&l.support){l.state="support",this.moveTo(t,l.support,l.support.distXZ(t.pos)>10,.6),this.faceBallIfClose(t,l.support);return}l.state="shape",this.shapeTarget(t,kt),this.moveTo(t,kt,t.pos.distXZ(kt)>14,.8),this.faceBallIfClose(t,kt);return}let h=s.owner;if(o.presser===t&&h){this.press(t,h,e,a);return}if(o.cover===t&&h){l.state="cover";let p=n.ownGoalX(t.team)-h.pos.x,g=-h.pos.z,x=Math.hypot(p,g)||1;kt.set(h.pos.x+p/x*5,0,h.pos.z+g/x*5),this.moveTo(t,kt,t.pos.distXZ(kt)>6,.5),t.faceYaw=Kt(h.pos.x-t.pos.x,h.pos.z-t.pos.z);return}let d=o.marks.get(t);if(d){l.state="mark";let p=n.ownGoalX(t.team)-d.pos.x,g=-d.pos.z,x=Math.hypot(p,g)||1,m=s.pos.x-d.pos.x,f=s.pos.z-d.pos.z,M=Math.hypot(m,f)||1;kt.set(d.pos.x+p/x*1.6+m/M*.9,0,d.pos.z+g/x*1.6+f/M*.9),this.moveTo(t,kt,t.pos.distXZ(kt)>5,.35),t.faceYaw=Kt(s.pos.x-t.pos.x,s.pos.z-t.pos.z);return}l.state="shape",this.shapeTarget(t,kt),this.moveTo(t,kt,t.pos.distXZ(kt)>10,.7),this.faceBallIfClose(t,kt)}press(t,e,n,s){let r=this.m,o=r.ball,a=r.time,l=t.ai;l.state="press";let c=r.ownGoalX(t.team),h=c-e.pos.x,d=-e.pos.z,u=Math.hypot(h,d)||1,p=t.pos.distXZ(e.pos),g=1.3,x=o.pos.x+o.vel.x*.2,m=o.pos.z+o.vel.z*.2,f=c-x,M=-m,y=Math.hypot(f,M)||1;if(kt.set(x+f/y*g,0,m+M/y*g),this.moveTo(t,kt,p>5,0,!0),t.faceYaw=Kt(o.pos.x-t.pos.x,o.pos.z-t.pos.z),a<(l.nextChallenge||0)||!ts(r,t)||(l.nextChallenge=a+s.think*(.8+r.rng.next()*.5),r.phase!=="playing"||a-(r.lastRestartAt||-10)<.8))return;let v=o.pos.distXZ(t.pos);if(v<1.45&&o.pos.y<.5){let b=o.pos.x-e.pos.x,S=o.pos.z-e.pos.z,E=t.pos.x-o.pos.x,_=t.pos.z-o.pos.z,A=(b*E+S*_)/((Math.hypot(b,S)||1)*(Math.hypot(E,_)||1));A>-.2&&r.rng.next()<s.aggro*(.7+A*.4)&&Vl(r,t)}else if(v>1.7&&v<3&&e.speed>3.5&&r.rng.next()<s.slideChance){let b=e.vel.x/e.speed,S=e.vel.z/e.speed,E=(t.pos.x-e.pos.x)/p,_=(t.pos.z-e.pos.z)/p;b*E+S*_>-.1&&(t.yaw=Kt(o.pos.x+o.vel.x*.25-t.pos.x,o.pos.z+o.vel.z*.25-t.pos.z),t.vel.set(Math.sin(t.yaw)*t.speed,0,Math.cos(t.yaw)*t.speed),Gl(r,t))}}carrier(t,e){let n=this.m,s=n.ball,r=n.time,o=t.ai,a=this.params(t.team),l=n.teams[t.team];if(t.action&&t.action.type==="kick")return;(o.ownedSince==null||o.ownerEpoch!==n.possEpoch)&&(o.ownerEpoch=n.possEpoch,o.ownedSince=r,o.nextDecision=r+a.reaction*(.8+n.rng.next()*.4),o.dribbleTarget=null,this.pickDribble(t,0));let c=n.attackDir(t.team),h=99,d=null;for(let A of n.opponents(t.team)){let C=A.pos.distXZ(t.pos);C<h&&(h=C,d=A)}let u=n.human;u&&u.team===t.team&&u.requestUntil>r&&u.ackedReq!==u.requestUntil&&(t.ackUntil=r+1.2,u.ackedReq=u.requestUntil,n.events.emit("ack",{player:t,to:u,t:r}));let p=h<1.6&&r-o.ownedSince>.2;if(s.pos.distXZ(t.pos)<1.3&&(r>=o.nextDecision||p&&r>=(o.urgentAt||0))&&(o.nextDecision=r+a.think*(.8+n.rng.next()*.45)*(2-(l.style.tempo||1)),p&&(o.urgentAt=r+.25),(r-o.ownedSince>=a.holdMin||p)&&this.decide(t,h,d)))return;(!o.dribbleTarget||r>o.dribbleUntil)&&this.pickDribble(t,h);let x=o.dribbleTarget,m=x.x-t.pos.x,f=x.z-t.pos.z,M=Math.hypot(m,f)||1,y=s.pos.x+s.vel.x*.25-t.pos.x,v=s.pos.z+s.vel.z*.25-t.pos.z,b=Math.hypot(y,v),S=(y*m+v*f)/M,E=o.dribbleSprint&&t.stamina>.25;(b>1.25||S<-.1)&&(m=y,f=v,M=b||1,E=b>2.2&&t.stamina>.15);let _=t.maxSpeed(E,!0)*(M<1?.6:1);t.desired.set(m/M*_,0,f/M*_),t.sprint=E,this.addSeparation(t,.4)}pickDribble(t,e){let n=this.m,s=t.ai,r=n.time,o=n.attackDir(t.team),a=o*it.HL,l=null,c=-1e9,h=0;for(let d of[-75,-45,-20,0,20,45,75,130,-130]){let u=d*Math.PI/180,p=Math.cos(u)*o,g=Math.sin(u),x=t.pos.x+p*6,m=t.pos.z+g*6;if(Math.abs(x)>it.HL-1.5||Math.abs(m)>it.HW-1.2)continue;let f=12;for(let y of n.opponents(t.team)){let v=y.pos.x-t.pos.x,b=y.pos.z-t.pos.z,S=v*p+b*g,E=Math.abs(v*g-b*p);S>-.5&&E<2.5+S*.3&&(f=Math.min(f,Math.max(0,S)))}let M=f*.1+Math.cos(u)*.5;t.role==="W"&&Math.abs(t.pos.z)>10?M+=Math.abs(d)<25?.2:0:M+=-Math.abs(m)*.01+(Math.abs(x-a)<16?-Math.abs(m)*.03:0),M>c&&(c=M,l={x,z:m},h=f)}l||(l={x:t.pos.x-o*3,z:t.pos.z*.8}),s.dribbleTarget=new ot(l.x,0,l.z),s.dribbleUntil=r+.45,s.dribbleSprint=h>7&&n.uOf(t.team,t.pos.x)>-.3}decide(t,e,n){let s=this.m,r=s.ball,o=s.time,a=this.params(t.team),l=t.ai,c=s.teams[t.team],h=c.style,d=s.attackDir(t.team),u=d*it.HL,p=s.uOf(t.team,t.pos.x),g=Math.abs(s.vOf(t.team,t.pos.z)),x=ft((3-e)/3,0,1),m=s.rng,f={kind:"dribble",s:.2+(h.dribble||0)+(t.role==="W"?.08:0)-x*.35},M=12;for(let b of s.opponents(t.team)){let S=(b.pos.x-t.pos.x)*d,E=b.pos.z-t.pos.z;S>0&&Math.abs(E)<S*.9+1.5&&(M=Math.min(M,Math.hypot(S,E)))}f.s+=Math.min(M,12)*.035,f.s+=m.gauss()*a.noise;let y=Math.hypot(u-t.pos.x,t.pos.z);if(y<27){let b=ou(t.pos.x,t.pos.z,d),S=0;for(let A of s.opponents(t.team)){if(A.isGK)continue;let C=Yn(A.pos.x,A.pos.z,t.pos.x,t.pos.z,u,ft(t.pos.z*.2,-2,2));C.t>.05&&C.t<.95&&C.d<1+C.t*1.5&&S++}let _=ft(b/.5,0,1)*ft((28-y)/19,0,1)*Math.max(0,1-.32*S)*1.55+(y<12?.25:0)-.12+a.shootBias+m.gauss()*a.noise;_>f.s&&(f={kind:"shot",s:_})}let v=s.human;for(let b of s.teams[t.team].players){if(b===t||o<b.downUntil||b.isGK&&!(p<-.4&&x>.5))continue;yr(t.pos,b,kt,.75);let S=t.pos.distXZ(kt);if(S<4||S>38)continue;let E=s.ownGoalX(t.team);if(!b.isGK&&Math.abs(kt.x-E)<7&&Math.abs(kt.z)<9||b.isGK&&Math.abs(t.pos.z)<6&&Math.abs(t.pos.x-E)<14)continue;let _=ci(s,t.pos.x,t.pos.z,kt.x,kt.z,t.team,12),A=10;for(let N of s.opponents(t.team))A=Math.min(A,N.pos.distXZ(kt));let C=(kt.x-t.pos.x)*d,P=.2+_*.55+A*.045+C*.028*(1-(h.passShort||0)*.6)-Math.abs(S-14)*.008*(1+(h.passShort||0));if(b.isHuman&&(P+=a.humanBonus,b.requestUntil>o&&(P+=_>.55?.7:-.2)),b===l.receivedFrom&&o-l.ownedSince<2.5&&x<.4&&(P-=.3),C<-4&&x<.3&&(P-=.12),!(_<.35)&&(P+=m.gauss()*a.noise,P>f.s&&(f={kind:"pass",s:P,target:b}),b.ai.run&&b.ai.run.until>o||b.isHuman&&b.speed>4&&b.vel.x*d>2)){let N=.45+_*.3+Math.max(0,C)*.02+(b.isHuman?a.humanBonus*.7:0)+m.gauss()*a.noise;N>f.s&&s.uOf(t.team,b.pos.x)>.1&&(f={kind:"through",s:N,target:b})}}if(p>.5&&g>.35){let b=null,S=-1;for(let E of s.teams[t.team].players){if(E===t||E.isGK||!Lp(s,t.team,E.pos.x,E.pos.z))continue;let _=10;for(let A of s.opponents(t.team))_=Math.min(_,A.pos.distXZ(E.pos));_>S&&(S=_,b=E)}if(b){let E=.35+(h.cross||0)+S*.05+(p>.75?.15:0)+m.gauss()*a.noise;E>f.s&&(f={kind:"cross",s:E,target:b})}}switch(p<-.55&&x>.45&&f.s<.55&&(f={kind:"clear",s:.6}),f.kind){case"shot":{let b=s.keeper(1-t.team),S=Math.sign(t.pos.z)*-1||1;b&&(S=b.pos.z>0?-1:1),m.next()<.25&&(S=-S);let E=S*(dt.HW-.45-m.next()*.55),_=.25+m.next()*1.2;return he(s,t,"shot",{point:new ot(u,_,E),power:.72+m.next()*.28,ai:!0}),!0}case"pass":return he(s,t,"pass",{target:f.target,ai:!0}),f.target.ai.receivedFrom=t,!0;case"through":return he(s,t,"through",{target:f.target,ai:!0}),!0;case"cross":{let b=f.target,S=new ot(b.pos.x+b.vel.x*.8,0,b.pos.z+b.vel.z*.8);return he(s,t,"cross",{point:S,target:b,ai:!0}),!0}case"clear":{let b=new ot(d*10+t.pos.x*.2,0,Math.sign(t.pos.z||1)*14);return he(s,t,"clear",{point:b,ai:!0}),!0}default:return this.pickDribble(t,e),!1}}restartTarget(t,e,n=!1,s=new ot){let r=this.m,o=t.team,a=r.attackDir(o),l=e.spot,c=e.team===o;if(t===e.taker)return s.copy(l).addScaled(new ot(-a,0,0),.7);if(t.isGK){let u=r.ownGoalX(o);return e.type==="penalty"&&!c?s.set(u+a*.1,0,0):s.set(u+a*(e.type==="kickoff"?1.2:1.5),0,0)}let h=t.home.u,d=t.home.v;switch(e.type){case"kickoff":{h=Math.min(h*.85-.05,-.05),r.toWorld(o,h,d,s),c&&t.role===(e.taker&&e.taker.role==="ST"?"AM":"CM")&&s.set(-a*3.5,0,1.8);let u=Math.hypot(s.x,s.z);if(!c&&u<Yt.CIRCLE_R+.6){let p=(Yt.CIRCLE_R+.8)/(u||1);s.x*=p,s.z*=p,Math.abs(s.x)<.5&&(s.x=-a*(Yt.CIRCLE_R+.8))}return s}case"penalty":{let u=l.x>0?1:-1,p=u*(it.HL-Yt.PEN_D-1.8),g=r.players.indexOf(t);return s.set(p-u*(g%2)*2.5,0,(g%7-3)*3.2)}case"corner":{let u=l.x>0?1:-1;if(c){let m={ST:[2,.8],AM:[5.5,-1.5],W:[4,3.5],CM:[11,0],DEF:[22,4]}[t.role]||[8,0],f=Math.sign(l.z);return s.set(u*(it.HL-m[0]),0,m[1]*-f+(t.side||0)*1.5),t.role==="DEF"&&t.home.v<0&&(s.z=-s.z),wi(s,1)}let g={DEF:[1.8,1.2],CM:[4.5,-1.2],AM:[9,2],W:[6,4],ST:[14,0]}[t.role]||[5,0];return s.set(u*(it.HL-g[0]),0,g[1]*(t.home.v>=0?1:-1)),wi(s,1)}case"goalkick":{if(c)r.toWorld(o,Math.min(h,-.2)+.05,d*1.1,s);else{r.toWorld(o,Math.max(h,-.1)+.2,d,s);let u=l.x>0?it.HL:-it.HL;Math.abs(s.x-u)<Yt.PEN_D+1&&Math.abs(s.z)<Yt.PEN_HW+1&&(s.x=u-Math.sign(u)*(Yt.PEN_D+1.5))}return s}default:{if(this.shapeTarget(t,s),c)s.distXZ(l)>18&&(t.role==="CM"||t.role==="W"||t.role==="AM")&&s.lerp(l,.35);else if(e.type==="freekick"){let u=r.ownGoalX(o);if(Math.hypot(l.x-u,l.z)<26&&(t.role==="DEF"||t.role==="CM")&&t.home.v!==void 0){let g=u-l.x,x=-l.z,m=Math.hypot(g,x)||1,f=t.home.v>=0?1:-1;s.set(l.x+g/m*(ve.RESTART_DIST+.3)-x/m*.38*f,0,l.z+x/m*(ve.RESTART_DIST+.3)+g/m*.38*f)}}if(!c){let u=e.type==="throwin"?ve.THROW_DIST:ve.RESTART_DIST;if(s.distXZ(l)<u+.4){let g=s.x-l.x,x=s.z-l.z,m=Math.hypot(g,x)||1;s.set(l.x+g/m*(u+.6),0,l.z+x/m*(u+.6))}}return wi(s,.8)}}}enforceDistances(t){let e=this.m;for(let n of e.players){if(n.team===t.team||n.isHuman)continue;let s=t.type==="throwin"?ve.THROW_DIST:t.type==="kickoff"?Yt.CIRCLE_R:ve.RESTART_DIST;if(n.pos.distXZ(t.spot)<s){let o=this.restartTarget(n,t);n.pos.copy(o),n.prevPos.copy(o),n.vel.set(0,0,0)}}}nonPlayingMove(t){let e=this.m,n=e.time;if(t.faceYaw=null,e.phase==="restart"&&e.restart){let s=e.restart;if(t===s.taker&&s.placed){t.desired.set(0,0,0);return}let r=this.restartTarget(t,s,!1,kt);this.moveTo(t,r,t.pos.distXZ(r)>8,.25),t.pos.distXZ(r)<1&&(t.faceYaw=Kt(e.ball.pos.x-t.pos.x,e.ball.pos.z-t.pos.z));return}if(e.phase==="goal"){if(t.celebrate>n){let s=e.lastGoalTeam,r=e.attackDir(s)*(it.HL-4),o=Math.sign(e.ball.pos.z||1)*(it.HW-3);kt.set(r,0,o),this.moveTo(t,kt,!0,1.5);return}this.shapeTarget(t,kt),kt.x*=.5,this.moveTo(t,kt,!1,1,!1,2.2);return}if(e.phase==="halftime"||e.phase==="fulltime"){t.desired.set(0,0,0);return}this.shapeTarget(t,kt),this.moveTo(t,kt,!1,1,!1,3)}takeRestart(t,e){let n=this.m,s=n.rng,r=n.attackDir(t.team),o=r*it.HL;n.lastRestartAt=n.time;let a=(c,h=.45)=>{let d=null,u=-1e9;for(let p of n.teams[t.team].players){if(p===t||p.isGK)continue;let g=p.pos.distXZ(e.spot);if(g>c||g<3)continue;let x=ci(n,e.spot.x,e.spot.z,p.pos.x,p.pos.z,t.team,11);if(x<h)continue;let m=x+(p.pos.x-e.spot.x)*r*.02-g*.01+(p.isHuman?this.params(t.team).humanBonus+(p.requestUntil>n.time?.6:0):0)+s.next()*.2;m>u&&(u=m,d=p)}return d},l=(c,h)=>{t.yaw=Kt(c-t.pos.x,h-t.pos.z)};switch(e.type){case"kickoff":{let c=a(20,.2)||n.teams[t.team].players.find(h=>h!==t&&!h.isGK);l(c.pos.x,c.pos.z),he(n,t,"pass",{target:c,restart:e,ai:!0});break}case"throwin":{let c=a(18,.35);if(c)l(c.pos.x,c.pos.z),he(n,t,"throw",{target:c,restart:e,ai:!0});else{let h=new ot(e.spot.x+r*10,0,e.spot.z*.5);l(h.x,h.z),he(n,t,"throw",{point:h,restart:e,ai:!0})}break}case"corner":{let c=[];for(let h of n.teams[t.team].players)h!==t&&!h.isGK&&Lp(n,t.team,h.pos.x,h.pos.z)&&c.push(h);if(c.length&&s.next()<.75){let h=c[Math.floor(s.next()*c.length)],d=new ot(h.pos.x,0,h.pos.z);l(d.x,d.z),he(n,t,"cross",{point:d,target:h,restart:e,ai:!0,elev:.45})}else{let h=a(14,.3)||c[0];if(h)l(h.pos.x,h.pos.z),he(n,t,"pass",{target:h,restart:e,ai:!0});else{let d=new ot(o-r*7,0,0);l(d.x,d.z),he(n,t,"cross",{point:d,restart:e,ai:!0})}}break}case"goalkick":{let c=a(22,.7);if(c&&s.next()<.6)l(c.pos.x,c.pos.z),he(n,t,"pass",{target:c,restart:e,ai:!0});else{let h=null,d=-1;for(let p of n.teams[t.team].players){if(p===t||p.isGK)continue;let g=10;for(let m of n.opponents(t.team))g=Math.min(g,m.pos.distXZ(p.pos));let x=g+n.uOf(t.team,p.pos.x)*4+s.next();x>d&&(d=x,h=p)}let u=h?new ot(h.pos.x,0,h.pos.z):new ot(0,0,0);l(u.x,u.z),he(n,t,"lob",{point:u,target:h,restart:e,ai:!0,elev:.5})}break}case"penalty":{let c=s.next()<.5?-1:1,h=new ot(o,.3+s.next()*.9,c*(1.2+s.next()*.9));l(h.x,h.z),he(n,t,"shot",{point:h,power:.8+s.next()*.15,restart:e,ai:!0});break}default:{let c=Math.hypot(o-e.spot.x,e.spot.z);if(e.type==="freekick"&&c<24&&ou(e.spot.x,e.spot.z,r)>.22&&s.next()<.45){let h=s.next()<.5?-1:1,d=new ot(o,1.2+s.next()*.6,h*(1.4+s.next()*.9));l(d.x,d.z),he(n,t,"shot",{point:d,power:.8+s.next()*.2,restart:e,ai:!0})}else{let h=a(26,.4)||a(35,.1);if(h)l(h.pos.x,h.pos.z),he(n,t,"pass",{target:h,restart:e,ai:!0});else{let d=new ot(e.spot.x+r*20,0,e.spot.z*.5);l(d.x,d.z),he(n,t,"lob",{point:d,restart:e,ai:!0})}}}}}moveTo(t,e,n,s=.5,r=!1,o=1/0){let a=e.x-t.pos.x,l=e.z-t.pos.z,c=Math.hypot(a,l),h=t.ai,d=this.m.time;if(d>(h.progressCheck||0)&&(c>2.5&&h.lastDist-c<.4&&t.speed<1&&(h.sidestepUntil=d+.7),h.lastDist=c,h.progressCheck=d+1.2),c<s){t.desired.set(0,0,0),r||this.addSeparation(t,1);return}let u=n&&(t.stamina>.2||this.ts[t.team].chaser===t),p=Math.min(t.maxSpeed(u,!1),o);c<3&&(p*=Math.max(.25,c/3));let g=a/c,x=l/c;if(h.sidestepUntil>d){let m=g;g=g*.5-x*.85,x=x*.5+m*.85}t.desired.set(g*p,0,x*p),t.sprint=u&&c>3,r||this.addSeparation(t,1)}addSeparation(t,e){let n=0,s=0,r=this.m.ball,o=t.pos.distXZ(r.pos)<2.5;for(let a of this.m.players){if(a===t)continue;let l=t.pos.x-a.pos.x,c=t.pos.z-a.pos.z,h=l*l+c*c;if(h>16||h<1e-6)continue;let d=Math.sqrt(h);if(d<1.4&&!o){let u=(1.4-d)/1.4*2.6;n+=l/d*u,s+=c/d*u}else if(a.team===t.team&&!o){let u=(4-d)/4*.9;n+=l/d*u,s+=c/d*u}}t.desired.x+=n*e,t.desired.z+=s*e}faceBallIfClose(t,e){if(t.pos.distXZ(e)<1.5){let n=this.m.ball.pos;t.faceYaw=Kt(n.x-t.pos.x,n.z-t.pos.z)}}};function Lp(i,t,e,n){let s=i.attackDir(t)*it.HL;return Math.sign(e)===Math.sign(s)&&Math.abs(e-s)<Yt.PEN_D&&Math.abs(n)<Yt.PEN_HW}var pb=new Set(["pass","through","cross","lob","gkthrow","gkkick"]);function Np(){return{touches:0,goals:0,ownGoals:0,assists:0,passAtt:0,passCmp:0,shots:0,shotsOn:0,tacklesWon:0,tackleAtt:0,interceptions:0,possLost:0,fouls:0,saves:0,keyPasses:0}}var yu={ST:{goal:1.05,assist:.7,tackle:.22,intercept:.16,pass:.035,prog:.03,key:.2,shotOn:.1,shotOff:-.02,lost:-.07,foul:-.2,conceded:-.03,clean:.05},W:{goal:1,assist:.75,tackle:.24,intercept:.17,pass:.04,prog:.03,key:.22,shotOn:.09,shotOff:-.02,lost:-.08,foul:-.2,conceded:-.03,clean:.05},AM:{goal:1,assist:.8,tackle:.26,intercept:.18,pass:.045,prog:.035,key:.25,shotOn:.09,shotOff:-.02,lost:-.09,foul:-.2,conceded:-.04,clean:.08},CM:{goal:1,assist:.8,tackle:.33,intercept:.25,pass:.055,prog:.035,key:.22,shotOn:.08,shotOff:-.02,lost:-.1,foul:-.2,conceded:-.07,clean:.2},DEF:{goal:1.1,assist:.8,tackle:.4,intercept:.3,pass:.05,prog:.03,key:.2,shotOn:.08,shotOff:-.02,lost:-.14,foul:-.22,conceded:-.15,clean:.45},GK:{goal:1,assist:.6,tackle:.2,intercept:.15,pass:.02,prog:.01,key:.1,shotOn:.05,shotOff:0,lost:-.1,foul:-.3,conceded:-.3,clean:.6,save:.3}},mb={goals:"Goals",assists:"Assists",tackles:"Tackles won",interceptions:"Interceptions",passing:"Passing",keyPasses:"Chances created",shooting:"Shooting",lost:"Possession lost",fouls:"Fouls",defending:"Defending (goals conceded / clean sheet)",result:"Match result",involvement:"Involvement",positioning:"Positioning",decisions:"Poor decisions",saves:"Saves"},dc=class{constructor(t){this.m=t,this.by=new Map,this.contrib=new Map;for(let n of t.players)this.by.set(n,Np()),this.contrib.set(n,[]);this.pendingPass=null,this.pendingTackle=null,this.pendingShot=null,this.lastCompleted=null,this.controller=null,this.looseFrom=null,this.pairCount=new Map,this.teamPossTime=[0,0],this.teamShots=[0,0],this.teamShotsOn=[0,0],this.posSamples=new Map,this.sampleT=0,this.longShots=new Map,this.finalised=!1,this.goalLog=[];let e=t.events;e.on("kick",n=>this.onKick(n)),e.on("possession",n=>this.onPossession(n)),e.on("release",n=>{(n.reason==="loose"||n.reason==="blocked")&&(this.looseFrom=n.player),this.controller=null}),e.on("tackle",n=>this.onTackle(n)),e.on("save",n=>this.onSave(n)),e.on("deflect",n=>this.onDeflect(n)),e.on("goal",n=>this.onGoal(n)),e.on("foul",n=>{this.s(n.player).fouls++,this.add(n.player,"fouls",this.w(n.player).foul),this.resolveAll("foul")}),e.on("out",n=>this.onOut(n)),e.on("restartSetup",()=>this.resolveAll("restart")),e.on("halftime",()=>this.resolveAll("half")),e.on("fulltime",()=>{this.resolveAll("full"),this.finalise()}),e.on("touch",n=>{n.kind})}s(t){let e=this.by.get(t);return e||(e=Np(),this.by.set(t,e),this.contrib.set(t,[])),e}w(t){return yu[t.role]||yu.CM}add(t,e,n){!t||!n||this.contrib.get(t)?.push({cat:e,v:n,t:this.m.time})}credit(t,e){t&&this.m.events.emit("credit",{player:t,kind:e,t:this.m.time})}update(t){let e=this.m;if(e.phase==="playing"&&(e.possTeam!=null&&(e.ball.owner||e.ball.state==="held")&&(this.teamPossTime[e.possTeam]+=t),this.pendingTackle&&e.time-this.pendingTackle.t>ve.TACKLE_WINDOW&&(this.pendingTackle=null),this.sampleT+=t,this.sampleT>=1)){this.sampleT=0;for(let n of e.players){if(n.isGK)continue;let s=this.goodPosition(n),r=this.posSamples.get(n)||{good:0,n:0};r.n++,s&&r.good++,this.posSamples.set(n,r)}}}goodPosition(t){let e=this.m,n=e.ball,s=e.ownGoalX(t.team),r=e.uOf(t.team,t.pos.x),o=t.pos.distXZ(n.pos),a=e.possTeam===t.team;switch(t.role){case"DEF":return a?r<.35||o<14:Math.abs(t.pos.x-s)<=Math.abs(n.pos.x-s)+1||o<6;case"CM":return o<22&&r<.7;case"AM":return a?r>-.1||o<14:o<22;case"W":return a?Math.abs(t.pos.z)>7||r>.35||o<12:r>-.5;case"ST":return a?r>.15||o<12:r>-.35;default:return!0}}onKick(t){let e=t.player,n=this.s(e);n.touches++;let s=this.pendingPass;if(s&&(s.passer===e?this.pendingPass=null:t.team===s.team?this.completePass(s,e):this.failPass(s,null,t.team)),this.controller=null,this.looseFrom=null,pb.has(t.kind)&&(n.passAtt++,this.pendingPass={passer:e,team:e.team,kind:t.kind,t:t.t,fromX:t.pos.x,target:t.target,id:t.id}),t.kind==="shot"){n.shots++,this.teamShots[e.team]++,this.pendingShot={shooter:e,onTarget:t.onTarget,t:t.t,resolved:!1};let r=this.lastCompleted;r&&r.receiver===e&&t.t-r.recvT<6&&!r.keyCounted&&(r.keyCounted=!0,this.s(r.passer).keyPasses++,this.add(r.passer,"keyPasses",this.w(r.passer).key));let o=this.m.attackDir(e.team)*it.HL;if(Math.hypot(o-t.pos.x,t.pos.z)>28&&!t.restart){let l=(this.longShots.get(e)||0)+1;this.longShots.set(e,l),l>1&&this.add(e,"decisions",-.06)}}}completePass(t,e){this.pendingPass=null;let n=t.passer,s=this.s(n),r=this.w(n);s.passCmp++;let o=this.m.attackDir(n.team),l=(e.pos.x-t.fromX)*o>=8,c=n.id+":"+e.id,h=(this.pairCount.get(c)||0)+1;this.pairCount.set(c,h);let d=Math.pow(l?.85:.65,h-1);this.add(n,"passing",(r.pass+(l?r.prog:0))*d),this.credit(n,"passCompleted"),this.lastCompleted={passer:n,receiver:e,team:n.team,t:t.t,recvT:this.m.time,keyCounted:!1}}failPass(t,e,n){this.pendingPass=null;let s=t.passer;if(e){let r=++this.s(e).interceptions;this.add(e,"interceptions",this.w(e).intercept*(r<=3?1:Math.pow(.8,r-3))),this.credit(e,"interception")}n!=null&&n!==s.team&&(this.s(s).possLost++,this.add(s,"lost",this.w(s).lost),this.credit(s,"possessionLost"))}onPossession(t){let e=t.player,n=t.team,s=this.s(e);s.touches++;let r=this.pendingPass;r&&(r.passer===e?this.pendingPass=null:r.team===n?this.completePass(r,e):this.failPass(r,this.m.time-r.t<=3?e:null,n));let o=!1,a=this.pendingTackle;if(a){if(a.team===n&&this.m.time-a.t<=ve.TACKLE_WINDOW){let l=++this.s(a.tackler).tacklesWon;this.add(a.tackler,"tackles",this.w(a.tackler).tackle*(l<=4?1:Math.pow(.85,l-4))),this.credit(a.tackler,"tackleWon"),a.victim&&(this.s(a.victim).possLost++,this.add(a.victim,"lost",this.w(a.victim).lost),this.credit(a.victim,"possessionLost")),o=!0}this.pendingTackle=null}if(!o){let l=t.prev&&t.prev.team!==n?t.prev:this.looseFrom&&this.looseFrom.team!==n?this.looseFrom:null;l&&(this.s(l).possLost++,this.add(l,"lost",this.w(l).lost),this.credit(l,"possessionLost"))}this.looseFrom=null,this.lastCompleted&&this.lastCompleted.team!==n&&(this.lastCompleted=null),this.controller=e}onTackle(t){this.s(t.player).tackleAtt++,t.success&&(this.pendingTackle={tackler:t.player,victim:t.victim,team:t.player.team,t:t.t},this.looseFrom=null,this.controller=null)}onSave(t){let e=this.pendingShot;e&&!e.resolved&&(e.resolved=!0,e.onTarget?(this.s(e.shooter).shotsOn++,this.teamShotsOn[e.shooter.team]++,this.add(e.shooter,"shooting",this.w(e.shooter).shotOn),this.credit(e.shooter,"shotSaved"),this.s(t.player).saves++,this.add(t.player,"saves",yu.GK.save)):this.add(e.shooter,"shooting",this.w(e.shooter).shotOff))}onDeflect(t){let e=this.pendingShot;e&&!e.resolved&&t.player.team!==e.shooter.team&&!t.player.isGK&&this.m.time-e.t<3&&(e.resolved=!0,e.blocked=!0)}onGoal(t){let e=t.scorer,n=this.pendingShot;if(e){let s=this.s(e);s.goals++,n&&n.shooter===e&&(!n.resolved||n.blocked)?(s.shotsOn++,this.teamShotsOn[e.team]++,n.resolved=!0):(!n||n.shooter!==e)&&(s.shots++,s.shotsOn++,this.teamShots[e.team]++,this.teamShotsOn[e.team]++),this.add(e,"goals",this.w(e).goal);let r=this.lastCompleted;r&&r.receiver===e&&r.team===t.team&&r.passer!==e&&t.t-r.t<=ve.ASSIST_WINDOW&&(this.s(r.passer).assists++,this.add(r.passer,"assists",this.w(r.passer).assist),t.assist=r.passer,this.credit(r.passer,"assist"))}else t.ownGoal&&t.ownGoalBy&&(this.s(t.ownGoalBy).ownGoals++,this.add(t.ownGoalBy,"decisions",-.3));for(let s of this.m.teams[1-t.team].players)this.add(s,"defending",this.w(s).conceded);this.goalLog.push({team:t.team,scorer:e?e.name:null,scorerRef:e,assist:t.assist?t.assist.name:null,ownGoal:t.ownGoal,ownGoalBy:t.ownGoalBy?t.ownGoalBy.name:null,clock:this.m.displayClock,half:this.m.half}),this.resolveAll("goal")}onOut(t){let e=this.pendingPass;e?this.failPass(e,null,t.team):t.controller&&t.team!==t.controller.team&&(this.s(t.controller).possLost++,this.add(t.controller,"lost",this.w(t.controller).lost)),this.resolveAll("out")}resolveAll(t){this.pendingPass&&(this.pendingPass=null),this.pendingTackle=null;let e=this.pendingShot;e&&!e.resolved&&(e.resolved=!0,t!=="goal"&&this.add(e.shooter,"shooting",this.w(e.shooter).shotOff)),this.pendingShot=null,this.looseFrom=null,t!=="goal"&&(this.lastCompleted=null)}finalise(){if(this.finalised)return;this.finalised=!0;let t=this.m,[e,n]=t.scoreline;for(let s of t.players){let r=this.w(s),o=s.team===0?e:n,a=s.team===0?n:e;this.add(s,"result",o>a?.25:o<a?-.2:0),a===0&&this.add(s,"defending",r.clean);let l=this.s(s);if(!s.isGK){l.touches<4?this.add(s,"involvement",-.25):l.touches>25&&this.add(s,"involvement",.15);let c=this.posSamples.get(s);c&&c.n>20&&this.add(s,"positioning",(c.good/c.n-.55)*.5)}}}rating(t){let e=0;for(let n of this.contrib.get(t)||[])e+=n.v;return Math.round(ft(6+e,1,10)*10)/10}breakdown(t){let e={};for(let o of this.contrib.get(t)||[])e[o.cat]=(e[o.cat]||0)+o.v;let n=Object.entries(e).map(([o,a])=>({cat:o,label:mb[o]||o,v:a})),s=n.filter(o=>o.v>.005).sort((o,a)=>a.v-o.v),r=n.filter(o=>o.v<-.005).sort((o,a)=>o.v-a.v);return{pos:s,neg:r,all:n}}possessionPct(){let[t,e]=this.teamPossTime,n=t+e;return n>0?[Math.round(t/n*100),100-Math.round(t/n*100)]:[50,50]}report(t){let e=this.s(t),n=this.m,s=n.halfLength*2,r=Math.round(Math.min(1,n.clock/s)*90),o=null,a=-1;for(let l of n.players){let c=this.rating(l);c>a&&(a=c,o=l)}return{score:n.scoreline,minutes:r,rating:this.rating(t),stats:{...e,passAcc:e.passAtt?Math.round(e.passCmp/e.passAtt*100):0},breakdown:this.breakdown(t),possession:this.possessionPct(),teamShots:[...this.teamShots],teamShotsOn:[...this.teamShotsOn],motm:o?{name:o.name,team:o.team,rating:a,isHuman:o.isHuman}:null,goals:this.goalLog.map(l=>({...l,scorerRef:void 0}))}}};var fc={assisted:{label:"Assisted",passError:.3,shotError:.65,shotAim:1,touch:.45,tackle:.24,stick:1,claim:1.25,passCone:1.1,autoLob:!0,oppReact:1.55,oppAggro:.5,oppNoise:.14,oppPassError:3,oppMistake:.16,oppTouch:2,oppShotError:1.7,oppProtect:.24,oppHumanPassReact:.34},standard:{label:"Standard",passError:.55,shotError:.85,shotAim:.7,touch:.65,tackle:.14,stick:.75,claim:1.12,passCone:.95,autoLob:!0,oppReact:1,oppAggro:1.1,oppNoise:.03,oppPassError:1.35,oppMistake:.04,oppTouch:1.15,oppShotError:1.05,oppProtect:0,oppHumanPassReact:.2},expert:{label:"Expert",passError:.85,shotError:1,shotAim:.35,touch:.9,tackle:.02,stick:.5,claim:1.05,passCone:.8,autoLob:!1,oppReact:.9,oppAggro:1.22,oppNoise:0,oppPassError:1,oppMistake:.01,oppTouch:1,oppShotError:.95,oppProtect:-.04,oppHumanPassReact:.16}},pc=class{constructor(t){this.cfg=t,this.mode=t.mode||"match",this.events=new lc,this.rng=new di(t.seed||12345),this.ball=new Qi,this.traj=new xr(200,1/60),this.trajVersion=-1,this.players=[],this.time=0,this.clock=0,this.half=1,this.halfLength=t.halfLength||180,this.phase="setup",this.phaseT=0,this.restart=null,this.pendingRestart=null,this.possTeam=null,this.skipRequested=!1,this.kickoffTeam=0,this.nextKickId=1,this.passIntent=null,this.lastProgress=0,this.snapCount=0,this.rules=t.rules!==!1,this.difficulty=t.difficulty||"assisted",this.assist=fc[this.difficulty]||fc.assisted,this.human=null,this.humanCtl=null,this.teams=[],this.ballHooks={onBounce:(e,n)=>this.events.emit("bounce",{speed:n,t:this.time}),onFrame:(e,n,s)=>this.events.emit("frame",{what:s,speed:n,t:this.time}),bodies:(e,n)=>Pp(this,e,n)},this.buildTeams(t),this.aiParams=[xu(this,0),xu(this,1)],this.ai=new uc(this),this.stats=new dc(this)}buildTeams(t){for(let e=0;e<2;e++){let n=t.teams[e];if(!n){this.teams.push({index:e,attack:e===0?1:-1,score:0,players:[],name:"None",style:Mr.wing,empty:!0});continue}let s=n.players.find(c=>c.isHuman)?.role||null,r=n.formation||cc(n.style,s),o={index:e,attack:e===0?1:-1,score:0,players:[],name:n.name,short:n.short||n.name.slice(0,3).toUpperCase(),kit:n.kit,styleName:n.style||"wing",style:Mr[n.style]||Mr.wing,tier:n.tier||1,formationName:r,formation:yo[r],clubId:n.clubId};this.teams.push(o);let a=o.formation.map((c,h)=>({...c,i:h,used:!1})),l=[...n.players].sort((c,h)=>(h.isHuman?1:0)-(c.isHuman?1:0));for(let c of l){let h=a.find(u=>!u.used&&u.role===c.role);if(h||(h=a.find(u=>!u.used&&u.role!=="GK"&&c.role!=="GK")||a.find(u=>!u.used)),!h)continue;h.used=!0;let d=new Ll({team:e,slot:h.i,role:h.role,number:c.number,name:c.name,isHuman:c.isHuman,attrs:c.attrs,keeping:c.keeping,foot:c.foot,look:c.look});d.home={u:h.u,v:h.v},o.players.push(d),this.players.push(d),d.isHuman&&(this.human=d)}o.players.sort((c,h)=>c.slot-h.slot)}this.players.sort((e,n)=>e.id-n.id)}attackDir(t){return this.teams[t].attack}ownGoalX(t){return-this.teams[t].attack*it.HL}teamOf(t){return this.teams[t.team]}opponents(t){return this.teams[1-t].players}isOpp(t){return!!this.human&&t.team!==this.human.team}keeper(t){return this.teams[t].players.find(e=>e.isGK)||null}get scoreline(){return[this.teams[0].score,this.teams[1].score]}toWorld(t,e,n,s){let r=this.teams[t].attack;return s.set(e*it.HL*r,0,-n*it.HW*r)}uOf(t,e){return e/it.HL*this.teams[t].attack}vOf(t,e){return-e/it.HW*this.teams[t].attack}keeperHandles(t,e){return yp(this,t,e)}keeperContact(t,e){return _p(this,t,e)}start(t=null){this.kickoffTeam=t??(this.rng.next()<.5?0:1),this.events.emit("matchStart",{t:0}),this.setupRestart({type:"kickoff",team:this.kickoffTeam,spot:new ot(0,0,0)})}step(t=bs){this.time+=t,this.phaseT+=t;let e=this.ball;this.humanCtl&&this.humanCtl.update(t),this.ai.update(t),this.preStep&&this.preStep(t);for(let n of this.players)gp(this,n,t);for(let n of this.players){let s=mp(n);this.phase==="restart"&&this.restart&&this.restart.taker===n&&this.restart.placed&&(s=0),n.celebrate>this.time&&(s=Math.min(s,6.5)),ep(n,t,this.time,s,e.owner===n)}np(this.players);for(let n of this.players)n.pos.x=ft(n.pos.x,-ln.HL+1,ln.HL-1),n.pos.z=ft(n.pos.z,-ln.HW+1,ln.HW-1);e.state==="held"&&e.owner?this.positionHeldBall(e.owner):e.state==="dead"&&this.restart&&this.restart.handsBall&&this.restart.taker&&this.positionThrowBall(this.restart.taker),ap(e,t,this.ballHooks),(e.version!==this.trajVersion||this.time-this.traj.t0>.12)&&(this.traj.compute(e,this.time),this.trajVersion=e.version),this.phase==="playing"&&Cp(this,t),this.stats.update(t),this.updatePhase(t)}positionHeldBall(t){let e=this.ball,n=t.hold==="throw"?-.05:.32,s=t.hold==="throw"?2.05:1.05;e.pos.set(t.pos.x+Math.sin(t.yaw)*n,s,t.pos.z+Math.cos(t.yaw)*n),e.vel.set(0,0,0)}positionThrowBall(t){let e=this.ball;e.pos.set(t.pos.x+Math.sin(t.yaw)*-.05,2.08,t.pos.z+Math.cos(t.yaw)*-.05),e.vel.set(0,0,0)}updatePhase(t){switch(this.phase){case"playing":{if(this.clock+=t,this.rules&&this.checkBall(),this.phase!=="playing")break;this.checkDeadlock(),this.rules&&this.clock>=this.halfLength*this.half&&!this.shotInFlight()&&this.endHalf();break}case"stoppage":this.phaseT>(this.stoppageDelay||.8)&&this.setupRestart(this.pendingRestart);break;case"restart":this.updateRestart(t);break;case"goal":if(this.phaseT>2.8||this.skipRequested&&this.phaseT>.6){this.skipRequested=!1;let e=1-this.lastGoalTeam;this.setupRestart({type:"kickoff",team:e,spot:new ot(0,0,0)})}break;case"halftime":(this.phaseT>3.2||this.skipRequested&&this.phaseT>.5)&&(this.skipRequested=!1,this.startSecondHalf());break;default:break}}shotInFlight(){let t=this.ball.lastKick;if(!t||t.kind!=="shot"||this.time-t.t>2.5)return!1;let e=this.attackDir(t.team);return this.ball.vel.x*e>3&&!this.ball.owner}checkBall(){let t=this.ball;if(t.state==="held"||t.state==="dead")return;let e=t.pos;for(let n=0;n<2;n++){let s=n===0?1:-1;if(e.x*s-ye>it.HL){let r=t.crossing[n];if(r&&r.inMouth&&Math.abs(e.z)<dt.HW&&e.y<dt.H){let o=this.teams[0].attack===s?0:1;this.goal(o)}else this.outOverGoalLine(s);return}}if(Math.abs(e.z)-ye>it.HW){let n=t.lastTouch,s=n?1-n.team:this.possTeam!=null?1-this.possTeam:0,r=new ot(ft(e.x,-it.HL+1,it.HL-1),0,Math.sign(e.z)*it.HW);this.ballOut("throwin",s,r);return}if(Math.abs(e.x)>ln.HL-.5||Math.abs(e.z)>ln.HW-.5){let n=t.lastTouch,s=n?1-n.team:0,r=new ot(ft(e.x,-it.HL+1,it.HL-1),0,ft(e.z,-it.HW,it.HW));this.ballOut("throwin",s,r)}}outOverGoalLine(t){let e=this.ball,n=this.teams[0].attack===-t?0:1,s=1-n,r=e.lastTouch;if(r&&r.team===n){let o=new ot(t*(it.HL-.4),0,Math.sign(e.pos.z||1)*(it.HW-.4));this.ballOut("corner",s,o)}else{let o=new ot(t*(it.HL-Yt.GOAL_D*.5),0,ft(e.pos.z*.3,-2.5,2.5));this.ballOut("goalkick",n,o)}}ballOut(t,e,n){let s=this.ball,r=s.lastTouch;this.events.emit("out",{restart:t,team:e,lastTouch:r,controller:s.owner,t:this.time,pos:s.pos.clone()}),s.owner&&(s.owner=null),s.state="free",this.phase="stoppage",this.phaseT=0,this.stoppageDelay=.75,this.pendingRestart={type:t,team:e,spot:n}}goal(t){if(this.phase!=="playing")return;let e=this.ball,n=e.lastTouch,s=null,r=!1,o=null,a=e.lastKick;n&&n.team===t?s=n:a&&a.team===t&&a.kind==="shot"&&a.onTarget&&this.time-a.t<4?s=a.player:n&&(r=!0,o=n),this.teams[t].score++,this.lastGoalTeam=t,e.owner&&(e.owner=null),e.state="free",this.phase="goal",this.phaseT=0,this.skipRequested=!1,s&&(s.celebrate=this.time+2.8,s.action={type:"celebrate",t:0,dur:2.8});for(let l of this.teams[t].players)l!==s&&(l.celebrate=this.time+2.8);this.events.emit("goal",{team:t,scorer:s,ownGoal:r,ownGoalBy:o,t:this.time,clock:this.clock,score:this.scoreline,pos:e.pos.clone()})}foul(t,e,n){if(this.phase!=="playing")return;let s=this.time;e.downUntil=s+1.1,e.action={type:"stumble",t:0,dur:1.1,fall:!0};let r=e.pos.clone();r.x=ft(r.x,-it.HL+.5,it.HL-.5),r.z=ft(r.z,-it.HW+.5,it.HW-.5);let o=this.ownGoalX(t.team),a=Math.abs(r.x-o)<Yt.PEN_D&&Math.abs(r.z)<Yt.PEN_HW&&Math.sign(r.x)===Math.sign(o),l=a?"penalty":"freekick";a&&r.set(Math.sign(o)*(it.HL-Yt.SPOT),0,0),this.events.emit("foul",{player:t,victim:e,slide:n,penalty:a,t:s,pos:e.pos.clone()}),this.ball.owner&&(this.ball.owner=null),this.ball.state="free",this.phase="stoppage",this.phaseT=0,this.stoppageDelay=1.1,this.pendingRestart={type:l,team:e.team,spot:r,victim:e}}dislodge(t,e,n,s=!1){let r=this.ball;r.owner=null,r.state="free",r.setVelocity(n),r.lastTouch=e,r.lastTouchTime=this.time,t.noCaptureUntil=this.time+.45,t.stumbleUntil=Math.max(t.stumbleUntil,this.time+.3),this.events.emit("tackle",{player:e,victim:t,success:!0,slide:s,t:this.time})}touchBall(t,e){this.ball.lastTouch=t,this.ball.lastTouchTime=this.time,this.events.emit("touch",{player:t,kind:e,strength:this.ball.speed,t:this.time})}gainControl(t){let e=this.ball,n=e.owner,s=e.lastKick,r="loose";n&&n.team!==t.team?r="steal":s&&Hl.has(s.kind)&&this.time-s.t<8&&s.player!==t&&(r=s.team===t.team?"receive":"interception"),e.owner=t,e.state="controlled",e.lastTouch=t,e.lastTouchTime=this.time,this.possTeam=t.team,this.possEpoch=(this.possEpoch||0)+1,this.lastProgress=this.time,n&&(n.noCaptureUntil=this.time+.35),this.passIntent&&this.passIntent.target===t&&(this.passIntent=null),this.events.emit("possession",{player:t,team:t.team,prev:n,cause:r,t:this.time})}loseControl(t){let e=this.ball,n=e.owner;n&&(e.owner=null,e.state=e.pos.y>ye+.05?"air":"free",this.events.emit("release",{player:n,reason:t,t:this.time}))}applyKick(t,e,n,s){let r=this.ball;r.owner=null,r.setVelocity(e),r.state=e.y>.8||r.pos.y>ye+.1?"air":"free",r.lastTouch=t,r.lastTouchTime=this.time,t.noCaptureUntil=this.time+ve.KICK_RELEASE_LOCK,t.lastKickAt=this.time,t.hold=null,t.touch={foot:n.foot,time:this.time,x:r.pos.x,y:r.pos.y,z:r.pos.z,kind:n.kind==="shot"?"shot":"kick"};let o=n.restart?n.restart.type:null,a=this.events.emit("kick",{player:t,team:t.team,kind:n.kind,target:s.target||null,point:s.point||null,onTarget:!!s.onTarget,speed:e.len(),t:this.time,restart:o,firstTime:n.firstTime,pos:r.pos.clone(),kickId:this.nextKickId++});if(r.lastKick=a,this.lastProgress=this.time,s.target&&Hl.has(n.kind)?this.passIntent={target:s.target,point:s.point,t:this.time,from:t}:this.passIntent=n.kind==="shot"?null:this.passIntent,n.restart&&this.phase==="restart"){this.phase="playing",this.phaseT=0,this.restart=null;for(let l of this.players)l.hold=null}}setupRestart(t){let e=this.ball;this.phase="restart",this.phaseT=0,this.skipRequested=!1,this.passIntent=null,this.events.emit("restartSetup",{restart:t.type,team:t.team,t:this.time});let n=t.spot.clone(),s=this.chooseTaker(t);this.restart={type:t.type,team:t.team,spot:n,taker:s,placed:!1,victim:t.victim||null,readyAt:{kickoff:1.1,throwin:.9,corner:1.3,goalkick:1.2,freekick:1.3,penalty:1.8,dropball:.6}[t.type]||1.2,handsBall:t.type==="throwin",humanTaker:s&&s.isHuman,decided:!1},e.owner=null,e.place(n.x,n.z),e.state="dead",e.lastKick=null;for(let r of this.players)r.action&&r.action.type!=="celebrate"&&(r.action=null),r.faceYaw=null,r.hold=null;t.type==="kickoff"||t.type==="penalty"?this.snapPositions():s&&(s.isHuman||s.pos.distXZ(n)>14)&&(this.placeTaker(s),this.events.emit("snap",{t:this.time,who:"taker"})),t.type==="goalkick"&&s&&s.isGK&&this.placeTaker(s)}chooseTaker(t){let e=this.teams[t.team],n=e.players.filter(o=>!o.isGK),s=this.human&&this.human.team===t.team?this.human:null,r=o=>{let a=null,l=1e9;for(let c of o){let h=c.pos.distXZ(t.spot);h<l&&(l=h,a=c)}return[a,l]};switch(t.type){case"kickoff":return s&&(s.role==="ST"||s.role==="AM")?s:n.find(o=>o.role==="ST")||n.find(o=>o.role==="AM")||n[n.length-1];case"goalkick":return e.players.find(o=>o.isGK)||n[0];case"penalty":return s&&(["ST","W","AM"].includes(s.role)||t.victim===s)?s:[...n].sort((o,a)=>a.attrs.finishing-o.attrs.finishing)[0];case"corner":{let o=n.filter(l=>l.role==="W"||l.role==="AM"||l.role==="CM"),[a]=r(o.length?o:n);return s&&s.pos.distXZ(t.spot)<14&&s.pos.distXZ(t.spot)<=a.pos.distXZ(t.spot)+3?s:a}default:{let[o,a]=r(n.filter(l=>this.time>=l.downUntil||l===t.victim));return s&&(t.victim===s||s.pos.distXZ(t.spot)<12&&s.pos.distXZ(t.spot)<=a+2)?s:o||n[0]}}}placeTaker(t){let e=this.restart,n=e.spot,s=this.attackDir(t.team),r,o;if(e.type==="throwin"){r=.3*s,o=-Math.sign(n.z);let a=Math.hypot(r,o);r/=a,o/=a,t.pos.set(n.x-r*.35,0,n.z-o*.35)}else{let a=e.type==="corner"?n.x-s*8:s*it.HL,l=(e.type==="corner",0);r=a-n.x,o=l-n.z;let c=Math.hypot(r,o)||1;r/=c,o/=c,t.pos.set(n.x-r*.7,0,n.z-o*.7)}t.yaw=Kt(r,o),t.prevYaw=t.yaw,t.prevPos.copy(t.pos),t.vel.set(0,0,0),t.isHuman&&this.events.emit("humanYaw",{yaw:t.yaw})}snapPositions(){this.snapCount++,this.events.emit("snap",{t:this.time,who:"all"});for(let t of this.players){let e=this.ai.restartTarget(t,this.restart,!0);t.pos.copy(e),tp(t),t.celebrate=0;let n=this.attackDir(t.team),s=this.restart.spot.x-t.pos.x,r=this.restart.spot.z-t.pos.z;t.yaw=Math.hypot(s,r)>.5?Kt(s,r):Kt(n,0),t.prevYaw=t.yaw,t.prevPos.copy(t.pos)}this.restart.taker&&this.placeTaker(this.restart.taker),this.human&&this.events.emit("humanYaw",{yaw:this.human.yaw})}updateRestart(t){let e=this.restart;if(!e)return;let n=e.taker;if(!n){this.phase="playing";return}let s=n.pos.distXZ(e.spot);if(!e.placed){(s<.9||n.isHuman||this.phaseT>3.5)&&(s>=.9&&this.placeTaker(n),e.placed=!0,e.placedAt=this.phaseT,e.type==="throwin"&&(n.hold="throw"));return}if(this.phaseT>4.5&&!e.cleared&&(e.cleared=!0,this.ai.enforceDistances(e)),!(this.phaseT<e.readyAt||this.phaseT-e.placedAt<.35)){if(e.humanTaker&&!e.autoTaken){this.phaseT>12&&(e.autoTaken=!0,this.ai.takeRestart(n,e));return}n.action||this.ai.takeRestart(n,e)}}startSecondHalf(){this.half=2,this.clock=this.halfLength;for(let t of this.teams)t.attack=-t.attack;this.events.emit("secondHalf",{t:this.time}),this.setupRestart({type:"kickoff",team:1-this.kickoffTeam,spot:new ot(0,0,0)})}endHalf(){this.events.emit("whistle",{kind:this.half===1?"half":"full",t:this.time}),this.ball.owner&&(this.ball.owner=null),this.ball.state="free";for(let t of this.players)t.action&&t.action.type!=="celebrate"&&(t.action=null);this.half===1?(this.phase="halftime",this.phaseT=0,this.events.emit("halftime",{t:this.time,score:this.scoreline})):(this.phase="fulltime",this.phaseT=0,this.events.emit("fulltime",{t:this.time,score:this.scoreline}))}checkDeadlock(){let t=this.ball;if(t.owner||t.speed>.3){this.lastProgress=this.time;return}if(this.time-this.lastProgress>9){let e=t.lastTouch,n=e?1-e.team:0,s=new ot(ft(t.pos.x,-it.HL+2,it.HL-2),0,ft(t.pos.z,-it.HW+2,it.HW-2));this.events.emit("dropball",{t:this.time}),this.phase="stoppage",this.phaseT=0,this.stoppageDelay=.3,this.pendingRestart={type:"freekick",team:n,spot:s},this.lastProgress=this.time}}requestSkip(){this.skipRequested=!0}get displayClock(){let t=this.halfLength*2,e=Math.min(this.clock,t)/t*90*60,n=Math.floor(e/60),s=Math.floor(e%60);return`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}`}};var mc=class{constructor(t,e){this.m=t,this.p=e,this.input={moveF:0,moveR:0,sprint:!1,yaw:0,pitch:0,lmb:!1,rmb:!1},this.buffer=[],this.intent=null,this.passTarget=null,this.targetVisible=!1,this.lastAction=null}press(t){this.buffer.push({type:t,t:this.m.time})}release(t){this.buffer.push({type:t+"Up",t:this.m.time})}update(t){let e=this.m,n=this.p,s=e.time,r=e.ball,o=this.input,a=o.yaw,l=Math.sin(a),c=Math.cos(a),h=-Math.cos(a),d=Math.sin(a),u=l*o.moveF+h*o.moveR,p=c*o.moveF+d*o.moveR,g=Math.hypot(u,p);g>1&&(u/=g,p/=g);let x=r.owner===n&&r.state==="controlled";n.sprint=o.sprint&&g>.1;let m=n.maxSpeed(n.sprint,x);n.desired.set(u*m,0,p*m),n.faceYaw=a;let f=e.phase==="restart"&&e.restart&&e.restart.taker===n&&e.restart.placed,M=!x&&!r.owner&&r.state!=="dead"&&(this.intent||e.passIntent&&e.passIntent.target===n);x||f||M?(this.passTarget=cp(e,n,a,this.passTarget,e.assist.passCone),this.targetVisible=!!this.passTarget):(this.targetVisible=!1,(!r.owner||r.owner.team!==n.team)&&(this.passTarget=null));let y=n.action;if(y&&y.type==="kick"&&y.kind==="shot"&&!y.contacted&&!y.ai&&(y.aimYaw=a,y.aimPitch=o.pitch),e.phase==="goal"||e.phase==="halftime"){for(let b of this.buffer)b.type.endsWith("Up")||e.requestSkip();this.buffer.length=0;return}if(f){this.restartControls();return}if(e.phase!=="playing"){this.buffer=this.buffer.filter(b=>s-b.t<ve.INPUT_BUFFER&&!b.type.endsWith("Up"));return}let v=[];for(let b of this.buffer){if(this.handle(b,x))continue;let S=b.type==="tackle"||b.type==="slide"?.4:ve.INPUT_BUFFER;s-b.t<S&&!b.type.endsWith("Up")&&v.push(b)}this.buffer=v,this.updateIntent(x)}handle(t,e){let n=this.m,s=this.p,r=n.time,o=this.input,a=s.action;switch(t.type){case"passUp":return a&&a.type==="kick"&&a.kind==="pass"&&a.charging&&Ms(a),this.intent&&this.intent.kind==="pass"&&(this.intent.released=!0),!0;case"shootUp":return a&&a.type==="kick"&&a.kind==="shot"&&a.charging&&(a.aimYaw=o.yaw,a.aimPitch=o.pitch,Ms(a)),this.intent&&this.intent.kind==="shot"&&!this.intent.released&&(this.intent.released=!0,this.intent.charge=Math.min(1,(r-this.intent.t0)/.65)),!0;case"pass":case"shoot":case"through":{let l=t.type==="shoot"?"shot":t.type;if(e)return ts(n,s)?(l==="shot"?he(n,s,"shot",{charging:o.lmb,aimYaw:o.yaw,aimPitch:o.pitch}):he(n,s,l,{target:this.passTarget,charging:l==="pass"&&o.rmb,aimYaw:o.yaw}),this.lastAction={kind:l,t:r},this.intent=null,!0):!1;if(l==="through")return this.requestPass(),!0;let c=au(n,s,.75);return this.intent={kind:l,t0:t.t,released:l==="shot"?!o.lmb:!o.rmb,charge:0,until:r+Math.max(ve.INPUT_BUFFER,c!=null?c+.12:0)},!0}case"tackle":case"slide":{if(e)return!1;a&&a.type==="kick"&&!a.contacted&&!a.owned&&(s.action=null,s.faceYaw=null),this.intent=null;let l=t.type==="tackle"?Vl(n,s):Gl(n,s);return l&&(this.lastAction={kind:t.type,t:r}),l}default:return!0}}updateIntent(t){let e=this.intent;if(!e)return;let n=this.m,s=this.p,r=n.time,o=this.input;if(e.kind==="shot"&&!e.released&&(e.charge=Math.min(1,(r-e.t0)/.65)),t){if(!ts(n,s))return;e.kind==="shot"?he(n,s,"shot",{charge:e.charge,aimYaw:o.yaw,aimPitch:o.pitch,minContact:.06}):he(n,s,"pass",{target:this.passTarget,aimYaw:o.yaw,minContact:.06}),this.intent=null;return}if(r>e.until||n.ball.owner&&n.ball.owner!==s){this.intent=null;return}if(!ts(n,s))return;let a=au(n,s,.5);if(a!=null&&a<=.13){let l=e.kind==="shot"?"shot":"pass";he(n,s,l,{target:l==="pass"?this.passTarget:null,aimYaw:o.yaw,aimPitch:o.pitch,charge:l==="shot"?Math.max(.25,e.charge):0,firstTime:!0,minContact:Math.max(.04,a),deadline:a+.22}),this.lastAction={kind:l,t:r,firstTime:!0},this.intent=null}else a!=null&&(e.until=Math.max(e.until,r+a+.05))}requestPass(){let t=this.m,e=this.p,n=t.time;n<e.requestReadyAt||(e.requestUntil=n+2.4,e.requestReadyAt=n+ve.REQUEST_COOLDOWN,t.events.emit("request",{player:e,t:n}))}restartControls(){let t=this.m,e=this.p,n=t.time,s=this.input,r=t.restart,o=[],a=e.action;for(let l of this.buffer){if(l.type==="shootUp"){a&&a.kind==="shot"&&a.charging&&(a.aimYaw=s.yaw,a.aimPitch=s.pitch,Ms(a));continue}if(l.type==="passUp"){a&&a.charging&&Ms(a);continue}if(!e.action){if(l.type==="pass"||l.type==="through"){r.type==="throwin"?he(t,e,"throw",{target:this.passTarget,aimYaw:s.yaw,restart:r,point:this.passTarget?null:vu(e,s.yaw,12)}):he(t,e,l.type==="through"?"through":"pass",{target:this.passTarget,aimYaw:s.yaw,restart:r,charging:l.type==="pass"&&s.rmb});continue}if(l.type==="shoot"){r.type==="throwin"?he(t,e,"throw",{point:vu(e,s.yaw,20),restart:r}):r.type==="corner"?he(t,e,"cross",{point:vu(e,s.yaw,ft(18+s.pitch*30,8,30)),restart:r}):he(t,e,"shot",{charging:s.lmb,aimYaw:s.yaw,aimPitch:s.pitch,restart:r});continue}n-l.t<ve.INPUT_BUFFER&&o.push(l)}}this.buffer=o}};function vu(i,t,e){return new ot(ft(i.pos.x+Math.sin(t)*e,-it.HL+1,it.HL-1),0,ft(i.pos.z+Math.cos(t)*e,-it.HW+1,it.HW-1))}var Dp=12,vo=class{constructor(t,e){this.app=t,this.cfg=e,this.view=t.view,this.audio=t.audio,this.hud=t.hud,this.input=t.input,this.match=e.matchObject||new pc(e.match);let n=this.match;this.human=n.human,this.human&&(this.ctl=new mc(n,this.human),n.humanCtl=this.ctl),this.cam={mode:this.human?"fp":"orbit",yaw:0,pitch:-.14,eye:1.65,fov:t.settings.fov,bob:t.settings.bob?1:0,shake:t.settings.shake?1:0,angle:0,radius:58,height:26},this.acc=0,this.paused=!1,this.ended=!1,this.excite=0,this.slideEye=0,this.unsubs=[],this.kitA=e.colours?e.colours.kits[0].shirt:"#c00",this.kitB=e.colours?e.colours.kits[1].shirt:"#00c",this.view.setVenue(e.venue||"community",e.venueOpts||{}),this.view.setMatch(n,e.colours),this.view.localPlayer=this.human,this.view.firstPerson=!!this.human,this.hookEvents(),this.human&&this.unsubs.push(this.input.on((s,r)=>{this.paused||!this.ctl||(r?this.ctl.press(s):this.ctl.release(s))}))}start(){let t=this.match;this.cfg.kickoffTeam!=null?t.start(this.cfg.kickoffTeam):this.cfg.noStart||t.start(),this.human&&(this.cam.yaw=this.human.yaw);let e=(po[this.cfg.venue]||po.community).loud;this.cfg.mode!=="menu"&&this.audio.startCrowd(.25+e*.75)}hookEvents(){let t=this.match,e=t.events,n=this.audio,s=this.view,r=(l,c)=>this.unsubs.push(e.on(l,c)),o=this.cfg.mode==="menu",a=(l,c=1)=>{if(o)return{gain:0};let h=s.camera.position,d=l.x-h.x,u=l.z-h.z,p=Math.hypot(d,u),g=this.cam.yaw,x=-Math.cos(g)*d+Math.sin(g)*u;return{gain:c/(1+p*.045),pan:x/(p+3)}};r("kick",l=>{let c=a(l.pos,1);l.kind==="shot"?(n.play("shot",{...c,gain:c.gain*Math.min(1.2,.55+l.speed/40)}),l.player===this.human&&(s.shake=1),this.excite=Math.max(this.excite,.7)):l.kind==="throw"?n.play("touch",{...c,gain:c.gain*.3}):n.play("pass",{...c,gain:c.gain*Math.min(1,.4+l.speed/30),rate:.95+Math.random()*.1}),l.restart==="kickoff"&&n.play("whistle",{gain:o?0:.8})}),r("touch",l=>n.play("touch",{...a(l.player.pos,l.kind==="receive"?.8:.55),rate:.9+Math.random()*.2})),r("deflect",l=>n.play("bounce",a(l.player.pos,Math.min(1,l.speed/10)))),r("bounce",l=>{l.speed>2&&n.play("bounce",a(t.ball.pos,Math.min(.6,l.speed/16)))}),r("frame",l=>{n.play("post",a(t.ball.pos,Math.min(1,l.speed/18))),n.play("groan",{group:"crowd",gain:o?0:.7}),this.excite=1}),r("save",l=>{n.play(l.caught?"catch":"bounce",a(l.player.pos,1)),l.shot&&l.shot.onTarget&&n.play("groan",{group:"crowd",gain:o?0:.5})}),r("tackle",l=>n.play("tackle",a(l.player.pos,.9))),r("slide",l=>n.play("slide",a(l.player.pos,.8))),r("foul",l=>{n.play("whistle",{gain:o?0:.9}),(l.victim===this.human||l.player===this.human)&&this.hud.notify(l.player===this.human?"FOUL":"FOULED","bad"),l.penalty&&!o&&this.hud.showBanner("PENALTY","",1800)}),r("halftime",()=>{n.play("whistleLong",{gain:o?0:.9}),o||this.hud.showBanner("HALF TIME",`${t.teams[0].short} ${t.scoreline[0]} - ${t.scoreline[1]} ${t.teams[1].short}`,3e3)}),r("fulltime",()=>{if(n.play("whistleLong",{gain:o?0:.9}),o)return;let[l,c]=t.scoreline,h=this.human&&(this.human.team===0?l>c:c>l);if(this.cfg.final&&h){this.hud.showBanner("CHAMPIONS",`${this.cfg.final} winners!`,6e3,"mine"),n.play("cheer",{group:"crowd",gain:1}),s.crowdLevel=1;for(let d=0;d<3;d++)setTimeout(()=>s.celebrate((Math.random()-.5)*30,(Math.random()-.5)*20,this.human.team,1.4),d*500)}else this.hud.showBanner("FULL TIME",`${t.teams[0].short} ${l} - ${c} ${t.teams[1].short}`,4e3)}),r("snap",()=>{o||this.hud.flashFade()}),r("humanYaw",l=>{this.cam.yaw=l.yaw,this.cam.pitch=-.14}),r("request",()=>n.play("shout",{gain:.5})),r("ack",l=>{n.play("ack",{gain:.6}),this.ackPlayer=l.player,this.ackUntil=t.time+1.2}),r("goal",l=>{if(n.play("net",a(l.pos,1)),o||n.play("cheer",{group:"crowd",gain:1}),this.excite=1,s.crowdLevel=1,s.celebrate(l.pos.x,l.pos.z,l.team,1),!o){let c=l.ownGoal?`Own goal (${l.ownGoalBy?l.ownGoalBy.name:""})`:l.scorer?`${l.scorer.name}${l.assist?` \xB7 assist ${l.assist.name}`:""}`:"",h=this.human&&l.scorer===this.human;this.hud.showBanner(h?"GOAL!":"GOAL",`${t.teams[0].short} ${t.scoreline[0]} - ${t.scoreline[1]} ${t.teams[1].short} \xB7 ${c}`,2600,h?"mine":"")}}),r("credit",l=>{if(l.player!==this.human||o)return;let h={passCompleted:["PASS COMPLETED",""],assist:["ASSIST","good"],tackleWon:["TACKLE WON","good"],interception:["INTERCEPTION","good"],possessionLost:["POSSESSION LOST","bad"],shotSaved:["SHOT SAVED",""]}[l.kind];h&&this.hud.notify(h[0],h[1])}),r("goal",l=>{!o&&this.human&&l.scorer===this.human&&this.hud.notify("GOAL","good")})}frame(t){let e=this.match;if(!this.paused&&!this.ended){if(this.human&&this.ctl){let l=this.input.axes();this.input.consumeLook(this.cam,t);let c=this.ctl.input;c.moveF=l.f,c.moveR=l.r,c.sprint=l.sprint,c.yaw=this.cam.yaw,c.pitch=this.cam.pitch;let h=this.input.held;c.lmb=h.lmb,c.rmb=h.rmb}this.acc+=Math.min(t,.1)*(this.cfg.timeScale||1);let a=0;for(;this.acc>=bs&&a<Dp;)e.step(bs),this.acc-=bs,a++,this.cfg.onStep&&this.cfg.onStep(e);a>=Dp&&(this.acc=0),e.phase==="fulltime"&&!this.ended&&e.phaseT>(this.cfg.mode==="menu"?0:2.5)&&(this.ended=!0,this.cfg.onEnd&&this.cfg.onEnd(this))}let n=this.paused?1:this.acc/bs,s=e.ball.pos,r=Math.max(0,1-Math.min(Math.abs(s.x-it.HL),Math.abs(s.x+it.HL))/24);if(this.excite=Math.max(r*.45,this.excite-t*.25),this.cfg.mode!=="menu"&&this.audio.setExcitement(this.excite),this.human){let a=this.human.action,l=a&&a.type==="slide"?a.t<.7?.72:1.65:e.time<this.human.downUntil?.6:1.65;this.cam.eye+=(l-this.cam.eye)*(1-Math.exp(-t*9))}else this.cam.angle+=t*.05;this.cam.fov=this.app.settings.fov,this.cam.bob=this.app.settings.bob?1:0,this.cam.shake=this.app.settings.shake?1:0;let o=this.app.debugCam?{mode:"free",pos:this.app.debugCam.pos,look:this.app.debugCam.look,fov:this.cam.fov}:this.cam;this.view.render(n,t,o,{crowd:this.excite*.5}),this.updateMarkers(),this.cfg.mode!=="menu"&&this.hud.update(this.hudState())}updateMarkers(){let t=this.view.markers,e=this.match;if(t.hideAll(),!this.ctl||this.cfg.mode==="menu")return;let n=this.ctl.passTarget;n&&this.ctl.targetVisible&&t.showRing(n.pos.x,n.pos.z,e.time),this.ackPlayer&&e.time<this.ackUntil&&t.showAck(this.ackPlayer.pos.x,2.25,this.ackPlayer.pos.z,e.time);let s=e.passIntent;s&&s.target===this.human&&s.point&&!e.ball.owner&&t.showIncoming(s.point.x,s.point.z)}hudState(){let t=this.match,e=this.human,n="";if(e){let r=t.restart;t.phase==="restart"&&r&&r.taker===e?n=r.type==="throwin"?"Throw-in: RMB/Space short throw \xB7 LMB long throw":r.type==="corner"?"Corner: LMB cross to where you aim \xB7 RMB short pass":r.type==="penalty"?"Penalty: aim and hold LMB, release to shoot":r.type==="kickoff"?"Kick-off: RMB pass to a teammate":"Free kick: RMB pass \xB7 Space through ball \xB7 LMB shoot":t.phase==="goal"||t.phase==="halftime"?n="Press any action to skip":t.ball.owner===e?n="LMB shoot \xB7 RMB pass \xB7 Space through ball":t.ball.owner&&t.ball.owner.team!==e.team?n=t.ball.owner.pos.distXZ(e.pos)<3?"E tackle \xB7 C slide":"":t.ball.owner&&t.ball.owner.team===e.team&&(n=e.requestUntil>t.time?"Pass requested":"Space: call for the ball")}let s=this.ctl&&this.ctl.intent;return{match:t,camera:this.view.camera,view:this.view,camYaw:this.cam.yaw,style:this.view.style,kitA:this.kitA,kitB:this.kitB,hint:n,intentCharge:s&&s.kind==="shot"?s.charge:0,phaseText:t.phase==="halftime"?"HALF TIME":t.phase==="fulltime"?"FULL TIME":t.half===2?"2ND HALF":"1ST HALF",clockText:this.cfg.clockText?this.cfg.clockText(t):void 0,noArrow:this.cfg.noArrow}}setPaused(t){this.paused=t,this.ctl&&t&&(this.ctl.buffer.length=0)}dispose(){for(let t of this.unsubs)t();this.unsubs=[],this.audio.stopCrowd(),this.view.markers.hideAll()}};var Up="firsttouch.settings.v1",Op="firsttouch.style";var _o={rev:2,sensitivity:1,invertY:!1,fov:100,master:.8,sfx:.9,crowd:.6,difficulty:"assisted",bob:!0,shake:!0,quality:"high",matchLength:"normal"};function Fp(){try{let i=localStorage.getItem(Up);if(!i)return{..._o};let t={..._o,...JSON.parse(i)};return(t.rev||1)<2&&t.fov===85&&(t.fov=_o.fov),t.rev=2,t.fov=Math.min(200,Math.max(60,Number(t.fov)||_o.fov)),t}catch{return{..._o}}}function kp(i){try{return localStorage.setItem(Up,JSON.stringify(i)),!0}catch{return!1}}function zp(){try{let i=localStorage.getItem(Op);return i==="neo"||i==="classic"?i:"classic"}catch{return"classic"}}function Bp(i){try{localStorage.setItem(Op,i)}catch{}}var _u=[{tier:1,league:"Parkside League",venue:"community",label:"Community"},{tier:2,league:"County Division",venue:"town",label:"Town"},{tier:3,league:"Regional Championship",venue:"regional",label:"Regional"},{tier:4,league:"Premier Circuit",venue:"premier",label:"Premier"},{tier:5,league:"Continental Elite",venue:"continental",label:"Continental"}],Kn=[{id:"millbrook",name:"Millbrook Rovers",short:"MIL",tier:1,colors:["#1f8a4c","#f5f5f0","#f5f5f0"],style:"wing",crest:{shape:"shield",pattern:"chevron",symbol:"M"},ground:"Millbrook Rec"},{id:"ashford",name:"Ashford Athletic",short:"ASH",tier:1,colors:["#c8102e","#111111","#111111"],style:"direct",crest:{shape:"circle",pattern:"stripes",symbol:"A"},ground:"Station Lane"},{id:"kettle",name:"Kettle Lane FC",short:"KET",tier:1,colors:["#f07c1b","#1c2a4a","#1c2a4a"],style:"counter",crest:{shape:"diamond",pattern:"half",symbol:"K"},ground:"Kettle Lane"},{id:"harbour",name:"Harbour Park Wanderers",short:"HPW",tier:1,colors:["#5fb7e8","#ffffff","#ffffff"],style:"possession",crest:{shape:"shield",pattern:"band",symbol:"H"},ground:"Harbour Park"},{id:"oldbridge",name:"Oldbridge Town",short:"OLD",tier:2,colors:["#7a1f3d","#8ccdf0","#ffffff"],style:"possession",crest:{shape:"shield",pattern:"quarters",symbol:"O"},ground:"Bridge Road"},{id:"fenwick",name:"Fenwick United",short:"FEN",tier:2,colors:["#f2c500","#111111","#111111"],style:"pressing",crest:{shape:"circle",pattern:"band",symbol:"F"},ground:"Fenwick Meadow"},{id:"stonegate",name:"Stonegate Albion",short:"STA",tier:2,colors:["#1d2f6f","#ffffff","#ffffff"],style:"direct",crest:{shape:"hex",pattern:"chevron",symbol:"S"},ground:"The Gatehouse"},{id:"crowmere",name:"Crowmere City",short:"CRO",tier:2,colors:["#6b3fa0","#e8c547","#ffffff"],style:"wing",crest:{shape:"diamond",pattern:"stripes",symbol:"C"},ground:"Crowmere Park"},{id:"redcliffe",name:"Redcliffe County",short:"RED",tier:3,colors:["#d62828","#ffffff","#ffffff"],style:"pressing",crest:{shape:"shield",pattern:"stripes",symbol:"R"},ground:"Cliffside Stadium"},{id:"northvale",name:"Northvale Forest",short:"NVF",tier:3,colors:["#1b5e3a","#f2f2f2","#f2f2f2"],style:"counter",crest:{shape:"circle",pattern:"chevron",symbol:"N"},ground:"Vale Ground"},{id:"easthaven",name:"Easthaven Rangers",short:"EHR",tier:3,colors:["#1565c0","#ffffff","#ffffff"],style:"wing",crest:{shape:"hex",pattern:"half",symbol:"E"},ground:"Haven Road"},{id:"marlow",name:"Marlow Heath",short:"MAR",tier:3,colors:["#1a1a1a","#f4f4f4","#1a1a1a"],style:"possession",crest:{shape:"shield",pattern:"quarters",symbol:"M"},ground:"Heath Lane"},{id:"kingsport",name:"Kingsport Royals",short:"KIN",tier:4,colors:["#2446c7","#f2c14e","#ffffff"],style:"possession",crest:{shape:"circle",pattern:"crown",symbol:"K"},ground:"Royal Park"},{id:"westmoor",name:"Westmoor Athletic",short:"WES",tier:4,colors:["#f4f4f4","#111111","#111111"],style:"pressing",crest:{shape:"shield",pattern:"band",symbol:"W"},ground:"Moorside Arena"},{id:"ironside",name:"Ironside FC",short:"IRO",tier:4,colors:["#5d6470","#e0352b","#e0352b"],style:"direct",crest:{shape:"hex",pattern:"stripes",symbol:"I"},ground:"The Foundry"},{id:"solace",name:"Solace Bay",short:"SOL",tier:4,colors:["#0f8b8d","#f58a07","#ffffff"],style:"wing",crest:{shape:"diamond",pattern:"chevron",symbol:"S"},ground:"Bayfront Arena"},{id:"valmonte",name:"Valmonte Sporting",short:"VAL",tier:5,colors:["#f5f5f5","#6a2c91","#6a2c91"],style:"possession",crest:{shape:"shield",pattern:"crown",symbol:"V"},ground:"Estadio Valmonte"},{id:"nordhavn",name:"Nordhavn Kickers",short:"NOR",tier:5,colors:["#d7263d","#ffffff","#ffffff"],style:"pressing",crest:{shape:"circle",pattern:"half",symbol:"N"},ground:"Nordhavn Arena"},{id:"castellan",name:"Castellan Imperial",short:"CAS",tier:5,colors:["#141414","#d4af37","#141414"],style:"counter",crest:{shape:"hex",pattern:"crown",symbol:"C"},ground:"Imperial Bowl"},{id:"aurelio",name:"Aurelio Club",short:"AUR",tier:5,colors:["#7cc6f2","#10265c","#10265c"],style:"wing",crest:{shape:"shield",pattern:"stripes",symbol:"A"},ground:"Porto Aurelio"}],ie=i=>Kn.find(t=>t.id===i),is=i=>Kn.filter(t=>t.tier===i),On=i=>_u[i-1];function bo(i){let t=Kn.filter(e=>e.tier===i.tier).indexOf(i);return 38+i.tier*9+(3-t)*1.5}function ss(i,t=48){let[e,n]=i.colors,s=i.crest,r={shield:"M6 4 H42 V22 C42 34 33 42 24 46 C15 42 6 34 6 22 Z",circle:"M24 3 A21 21 0 1 1 23.99 3 Z",diamond:"M24 2 L46 24 L24 46 L2 24 Z",hex:"M14 4 H34 L45 24 L34 44 H14 L3 24 Z"}[s.shape]||"M6 4 H42 V22 C42 34 33 42 24 46 C15 42 6 34 6 22 Z",o=`c${i.id}${t}`,a="";switch(s.pattern){case"chevron":a=`<path d="M0 26 L24 12 L48 26 V34 L24 20 L0 34 Z" fill="${n}"/>`;break;case"stripes":a=[10,22,34].map(h=>`<rect x="${h}" y="0" width="6" height="48" fill="${n}"/>`).join("");break;case"half":a=`<rect x="24" y="0" width="24" height="48" fill="${n}"/>`;break;case"band":a=`<rect x="0" y="18" width="48" height="10" fill="${n}"/>`;break;case"quarters":a=`<rect x="24" y="0" width="24" height="24" fill="${n}"/><rect x="0" y="24" width="24" height="24" fill="${n}"/>`;break;case"crown":a=`<path d="M13 16 L17 8 L21 14 L24 6 L27 14 L31 8 L35 16 Z" fill="${n}"/>`;break;default:break}let c=(h=>{let d=parseInt(h.slice(1),16);return((d>>16)*.3+(d>>8&255)*.59+(d&255)*.11)/255})(e)>.6?"#111":"#fff";return`<svg class="crest" width="${t}" height="${t}" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="${o}"><path d="${r}"/></clipPath></defs><g clip-path="url(#${o})"><rect width="48" height="48" fill="${e}"/>${a}</g><path d="${r}" fill="none" stroke="#111" stroke-width="2.5"/><text x="24" y="${s.pattern==="crown"?36:31}" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="15" text-anchor="middle" fill="${c}" stroke="${c==="#fff"?"#111":"#fff"}" stroke-width="0.6">${s.symbol}</text></svg>`}var Gp=["England","Scotland","Wales","Ireland","France","Spain","Portugal","Italy","Germany","Netherlands","Belgium","Denmark","Norway","Sweden","Poland","Croatia","Serbia","Greece","Turkey","Morocco","Nigeria","Ghana","Senegal","Egypt","Brazil","Argentina","Uruguay","Colombia","Mexico","USA","Canada","Japan","South Korea","Australia"],Hp=["Alex","Sam","Jordan","Luca","Mateo","Noah","Kai","Theo","Rafa","Idris","Tomas","Jonas","Emil","Kofi","Yusuf","Diego","Ben","Oscar","Leo","Marco","Hugo","Ruben","Nico","Arlo","Felix","Ade","Kenji","Milo","Sven","Ivo"],Vp=["Hart","Moreno","Okafor","Lindqvist","Bennett","Costa","Novak","Reyes","Walsh","Kowalski","Mensah","Rossi","Dubois","Larsen","Silva","Ibrahim","Clarke","Varga","Tanaka","Moss","Keane","Adeyemi","Brandt","Petrov","Ferreira","Holt","Quinn","Sato","Doyle","Marsh"];function Wp(i,t){let e=0;for(let r of i)e=e*31+r.charCodeAt(0)>>>0;let n=Hp[(e+t*7)%Hp.length],s=Vp[(e*3+t*11)%Vp.length];return`${n[0]}. ${s}`}var gb={GK:{},DEF:{tackling:7,stamina:2,pace:1},CM:{passing:5,stamina:4,control:1},AM:{passing:4,control:4,finishing:1},W:{pace:6,control:3},ST:{finishing:6,pace:3}},xb={GK:[1],DEF:[2,5,4,3],CM:[6,8,4],AM:[10,8],W:[7,11],ST:[9,10]};function yb(i,t,e){let n={};for(let s of["pace","stamina","control","passing","finishing","tackling"])n[s]=Math.round(t+e.range(-4,4)+(gb[i][s]||0)-(s==="tackling"&&(i==="ST"||i==="W")?6:0)-(s==="finishing"&&i==="DEF"?6:0));return n}function Mo(i,t={}){let e=t.human||null,n=new di(fi(i.id+(t.seed||""))),s=t.strength??bo(i),r=cc(i.style,e?e.role:null),o=yo[r],a=new Set;e&&a.add(e.number);let l=o.map((c,h)=>{let u=(xb[c.role]||[h+1]).find(p=>!a.has(p));if(u==null)for(u=12;a.has(u);)u++;return a.add(u),{role:c.role,number:u,name:Wp(i.id,h),attrs:yb(c.role,s,n),keeping:Math.round(s+4+n.range(-3,3)),foot:n.next()<.78?"R":"L"}});if(e){let c=l.findIndex(d=>d.role===e.role),h=c>=0?c:l.findIndex(d=>d.role!=="GK");l[h]={role:e.role,number:e.number,name:e.name,attrs:{...e.attrs},foot:e.foot||"R",isHuman:!0,look:e.look}}return{name:i.name,short:i.short,tier:i.tier,style:i.style,formation:r,players:l,clubId:i.id}}function Sr(){return{name:"A. Newcomer",number:9,nationality:"England",foot:"R",role:"ST",attrs:{pace:52,stamina:50,control:50,passing:48,finishing:54,tackling:42},look:{skin:"#e0b48c",hair:"#3b2a1e",boots:"#111111"}}}var So=2,Mu=["pace","stamina","control","passing","finishing","tackling"],$p={pace:"Pace",stamina:"Stamina",control:"Ball control",passing:"Passing",finishing:"Finishing",tackling:"Tackling"},rs=i=>(uo.find(t=>t.id===i)||{name:i}).name,vb={ST:{finishing:6,pace:3},W:{pace:6,control:3},AM:{passing:4,control:5},CM:{passing:5,stamina:4},DEF:{tackling:7,stamina:2}};function _b(i){let t={pace:47,stamina:47,control:46,passing:46,finishing:45,tackling:44};for(let[e,n]of Object.entries(vb[i]||{}))t[e]+=n;return t}var qp={1:{avg:5.8,rep:0,apps:0},2:{avg:6.6,rep:10,apps:3},3:{avg:6.9,rep:28,apps:5},4:{avg:7.1,rep:48,apps:5},5:{avg:7.3,rep:68,apps:5}},Yp=[0,160,650,2600,11e3,42e3];function Kp(){return{apps:0,minutes:0,goals:0,assists:0,ratingSum:0,passCmp:0,passAtt:0,shots:0,shotsOn:0,tackles:0,interceptions:0,possLost:0,fouls:0,motm:0,wins:0,draws:0,losses:0,trophies:0}}function bb(i){let[t,e,n,s]=i,r=[[[t,e],[n,s]],[[n,t],[s,e]],[[t,s],[e,n]]],o=r.map(a=>a.map(([l,c])=>[c,l]));return[...r,...o]}function Su(i,t,e){let n=ie(t),s=is(n.tier).map(l=>l.id),r=new di(fi(`${i.seed}:${e}:${n.tier}`));for(let l=s.length-1;l>0;l--){let c=Math.floor(r.next()*(l+1));[s[l],s[c]]=[s[c],s[l]]}let o=bb(s),a=[];return o.forEach((l,c)=>l.forEach(([h,d])=>a.push({round:c+1,home:h,away:d,score:null}))),{no:e,tier:n.tier,league:On(n.tier).league,fixtures:a,round:1,table:s.map(l=>({id:l,p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0})),finished:!1,final:null,placement:null}}function wu(i){return[...i.table].sort((t,e)=>e.pts-t.pts||e.gf-e.ga-(t.gf-t.ga)||e.gf-t.gf||t.id.localeCompare(e.id))}function Zp(i,t,e,n){t.score=[e,n];let s=i.table.find(o=>o.id===t.home),r=i.table.find(o=>o.id===t.away);s.p++,r.p++,s.gf+=e,s.ga+=n,r.gf+=n,r.ga+=e,e>n?(s.w++,r.l++,s.pts+=3):e<n?(r.w++,s.l++,r.pts+=3):(s.d++,r.d++,s.pts++,r.pts++)}function Xp(i,t){let e=Math.exp(-t),n=0,s=1;do n++,s*=i.next();while(s>e&&n<10);return n-1}function Jp(i,t,e){let n=new di(fi(`${i.seed}:${t.no}:${t.tier}:${e.round}:${e.home}:${e.away}`)),s=bo(ie(e.home))+2.5,r=bo(ie(e.away)),o=Math.max(.3,1.35*Math.pow(s/r,1.6)),a=Math.max(.3,1.15*Math.pow(r/s,1.6));Zp(t,e,Xp(n,o),Xp(n,a))}function Tu(i){let t=i.season;return t.finished?t.final&&!t.final.played?{final:!0,...t.final}:null:t.fixtures.find(e=>e.round===t.round&&(e.home===i.clubId||e.away===i.clubId))||null}function jp(i,t=Date.now()%1e9|0){let e=new di(t),n=is(1),s=i.clubId?ie(i.clubId):n[Math.floor(e.next()*n.length)],r={version:So,seed:t,createdAt:Date.now(),player:{name:i.name,number:i.number,nationality:i.nationality,foot:i.foot,role:i.role,look:{...i.look},attrs:_b(i.role),xp:0,points:0,level:1,reputation:5},clubId:s.id,contract:{clubId:s.id,wage:Yp[1],years:2,role:`Starting ${rs(i.role)}`,expectations:"Average rating 6.0+, learn the game",signedSeason:1},seasonNo:1,season:null,form:[],appsAtClub:0,totals:Kp(),seasons:[],matchLog:[],timeline:[],trophies:[],window:null,trainingAvailable:!0,committed:[],nextMatchId:1,earnings:0,flags:{}};return r.season=Su(r,s.id,1),ws(r),pn(r,`Signed for ${s.name} (${On(1).league}) as ${rs(i.role)}`,"transfer"),r}function ws(i){let t=i.seasons.find(e=>e.season===i.seasonNo&&e.clubId===i.clubId);return t||(t={season:i.seasonNo,clubId:i.clubId,tier:ie(i.clubId).tier,...Kp(),placement:null},i.seasons.push(t)),t}function pn(i,t,e="info"){i.timeline.push({season:i.seasonNo,round:i.season?i.season.round:0,text:t,kind:e})}function Qp(i){let t=Tu(i);return t?{id:`m${i.nextMatchId}`,fx:t,clubId:i.clubId}:null}function tm(i,t,e,n){if(i.committed.includes(t))return{duplicate:!0};i.committed.push(t),i.committed.length>200&&i.committed.splice(0,i.committed.length-200),i.nextMatchId++;let s=i.season,r=ie(i.clubId),o=e.home===i.clubId,[a,l]=n.score,c=o?a:l,h=o?l:a,d=n.stats,u=n.rating,p={xp:0,levelUps:0,rep:0,notes:[]};if(e.final)s.final.played=!0,s.final.score=[a,l],s.final.won=c>h||c===h&&n.penaltyWin;else{let y=s.fixtures.find(v=>v.round===e.round&&v.home===e.home&&v.away===e.away);Zp(s,y,a,l);for(let v of s.fixtures)v.round===e.round&&!v.score&&Jp(i,s,v);s.round++}let g=ws(i);for(let y of[i.totals,g])y.apps++,y.minutes+=n.minutes,y.goals+=d.goals,y.assists+=d.assists,y.ratingSum+=u,y.passCmp+=d.passCmp,y.passAtt+=d.passAtt,y.shots+=d.shots,y.shotsOn+=d.shotsOn,y.tackles+=d.tacklesWon,y.interceptions+=d.interceptions,y.possLost+=d.possLost,y.fouls+=d.fouls,n.motm&&y.motm++,c>h?y.wins++:c<h?y.losses++:y.draws++;let x=o?e.away:e.home;i.matchLog.push({season:i.seasonNo,round:e.final?"F":e.round,clubId:i.clubId,opp:x,home:o,score:[c,h],rating:u,goals:d.goals,assists:d.assists,passCmp:d.passCmp,passAtt:d.passAtt,tackles:d.tacklesWon,interceptions:d.interceptions,keyPasses:d.keyPasses,shotsOn:d.shotsOn,tier:r.tier}),i.matchLog.length>400&&i.matchLog.shift(),i.form.push(u),i.form.length>10&&i.form.shift(),i.appsAtClub++;let m=i.totals;i.appsAtClub===1&&pn(i,`Debut for ${r.name} vs ${ie(x).name} (rating ${u.toFixed(1)})`,"debut"),d.goals>0&&m.goals===d.goals&&pn(i,`First career goal, vs ${ie(x).name}`,"goal"),d.assists>0&&m.assists===d.assists&&pn(i,`First career assist, vs ${ie(x).name}`,"assist"),d.goals>=3&&pn(i,`Hat-trick vs ${ie(x).name}!`,"goal"),n.motm&&m.motm===1&&pn(i,"First Player of the Match award","award");let f=(u-6.3)*2.5+(r.tier-1)*.8+d.goals*.6+d.assists*.4;i.player.reputation=Math.max(0,Math.min(100,i.player.reputation+f)),p.rep=f;let M=Math.round(30+Math.max(0,u-5.5)*25+d.goals*12+d.assists*8+(c>h?10:0));return p.levelUps=Eu(i,M),p.xp=M,i.earnings+=i.contract.wage,i.trainingAvailable=!0,!e.final&&s.round===4&&!s.finished&&Cu(i,"mid"),!e.final&&s.round>6&&Mb(i),e.final&&Sb(i),p}function Eu(i,t){let e=i.player;e.xp+=t;let n=0;for(;e.xp>=100;)e.xp-=100,e.points++,e.level++,n++;return n}function Au(i){return i<60?3:i<75?2:1}function em(i,t){let e=i.player;return e.points<=0||!Mu.includes(t)||e.attrs[t]>=99?!1:(e.attrs[t]=Math.min(99,e.attrs[t]+Au(e.attrs[t])),e.points--,!0)}function Mb(i){let t=i.season;t.finished=!0;let e=wu(t),n=e.findIndex(r=>r.id===i.clubId)+1;t.placement=n,ws(i).placement=n;let s=On(t.tier).league;if(n===1){let r=`${s} champions (Season ${i.seasonNo})`;i.trophies.push({season:i.seasonNo,name:`${s} title`,clubId:i.clubId}),i.totals.trophies++,ws(i).trophies++,pn(i,`Won the ${s} with ${ie(i.clubId).name}!`,"trophy")}else pn(i,`Finished ${gc(n)} in the ${s}`,"season");if(t.tier===5&&n<=2){let r=e[n===1?1:0].id;t.final={home:i.clubId,away:r,played:!1,name:"Continental Cup Final",round:"F"};return}Cu(i,"end")}function Sb(i){i.season.final.won?(i.trophies.push({season:i.seasonNo,name:"Continental Cup",clubId:i.clubId}),i.totals.trophies++,ws(i).trophies++,pn(i,`Lifted the Continental Cup with ${ie(i.clubId).name}!`,"trophy")):pn(i,"Runner-up in the Continental Cup Final","season"),Cu(i,"end")}function gc(i){return i+(["th","st","nd","rd"][(i%100-20)%10]||["th","st","nd","rd"][i%100]||"th")}function nm(i,t=5){return i.matchLog.filter(e=>e.season>=i.seasonNo-1).slice(-t)}function wb(i,t){let e=i.player.role,n=Math.max(1,t.length),s=c=>t.reduce((h,d)=>h+(d[c]||0),0),r=s("passAtt"),o=s("passCmp"),a=r?o/r:0,l=(s("tackles")+s("interceptions"))/n;switch(e){case"ST":return{value:(s("goals")+.5*s("assists")+.15*s("shotsOn"))/n,label:"goal threat",unit:"goal involvements per match"};case"W":return{value:(s("goals")+s("assists")+.2*s("keyPasses"))/n,label:"goals and chance creation",unit:"contributions per match"};case"AM":return{value:(s("assists")+s("goals")+.3*s("keyPasses"))/n,label:"strong passing and chance creation",unit:"chances per match"};case"CM":return{value:a*.6+l*.12+.2*s("keyPasses")/n,label:"reliable passing and ball winning",unit:"index",acc:a,def:l};default:return{value:l*.22+a*.45,label:"defensive solidity and distribution",unit:"index",acc:a,def:l}}}var Tb={ST:[.3,.42,.52,.6],W:[.3,.4,.5,.58],AM:[.32,.42,.52,.6],CM:[.55,.62,.68,.74],DEF:[.62,.7,.78,.86]};function Eb(i,t){let e=qp[t.tier],n=nm(i,5),s=n.length?n.reduce((m,f)=>m+f.rating,0)/n.length:0,r=i.player.reputation,o=wb(i,n),a=Tb[i.player.role][Math.max(0,t.tier-2)]??.5,l=n.length<3?0:Math.max(0,Math.min(1,(s-(e.avg-1.2))/1.2)),c=e.rep?Math.min(1,r/e.rep):1,h=Math.min(1,o.value/a),d=Math.min(1,i.appsAtClub/Math.max(1,e.apps)),u=Ab(i,t),p=u?.45*l+.25*h+.2*c+.1*d:.15*c,g=u&&n.length>=3&&s>=e.avg&&r>=e.rep&&h>=.85&&i.appsAtClub>=e.apps,x=u?`Average rating ${e.avg.toFixed(1)} over 5 matches (you: ${n.length?s.toFixed(2):"-"}); reputation ${e.rep}+ (you: ${Math.round(r)}); ${o.label}; ${e.apps}+ appearances for your current club (you: ${i.appsAtClub}).`:`No ${rs(i.player.role).toLowerCase()} role available at the moment.`;return{club:t,score:p,qualifies:g,avg:s,rep:r,needs:u,text:x,contrib:o,conS:h}}function Ab(i,t){let e=Math.floor(i.seasonNo*2+(i.season.round>3?1:0));return fi(`${i.seed}:${t.id}:${i.player.role}:${e}`)%5!==0}function Ru(i){let t=ie(i.clubId).tier;return(t<5?is(t+1):[]).map(n=>Eb(i,n)).sort((n,s)=>s.score-n.score)}function bu(i,t){return Math.round(Yp[i]*(.9+Math.max(0,t-6.5)*.25)/10)*10}function Cu(i,t){let e=[],n=ie(i.clubId);for(let s of Ru(i)){if(!s.qualifies)continue;let r=[`Recent form: average ${s.avg.toFixed(2)} over the last 5 matches`,`Reputation ${Math.round(s.rep)}`],o=s.contrib;o.acc!=null?r.push(`${o.label} (pass accuracy ${Math.round(o.acc*100)}%, ${o.def.toFixed(1)} tackles + interceptions per match)`):r.push(`${o.label}: ${o.value.toFixed(2)} ${o.unit}`),e.push({clubId:s.club.id,tier:s.club.tier,role:`Starting ${rs(i.player.role)}`,wage:bu(s.club.tier,s.avg),years:2+fi(s.club.id+i.seasonNo)%2,expectations:`Average rating ${(qp[s.club.tier].avg-.2).toFixed(1)}+ and ${o.label}`,reasons:r,kind:"transfer"})}if(e.sort((s,r)=>r.wage-s.wage),e.splice(3),t==="end"){let s=i.contract.years<=1,r=nm(i,5),o=r.length?r.reduce((a,l)=>a+l.rating,0)/r.length:6;if(s&&(e.push({clubId:n.id,tier:n.tier,role:`Starting ${rs(i.player.role)}`,wage:bu(n.tier,o),years:2,expectations:"Keep your place in the side",reasons:["Contract renewal offer"],kind:"renewal"}),o<6.2&&n.tier>1)){let a=is(n.tier-1)[fi(i.seed+":"+i.seasonNo)%4];e.push({clubId:a.id,tier:a.tier,role:`Starting ${rs(i.player.role)}`,wage:bu(a.tier,o),years:2,expectations:"Rebuild your form with regular football",reasons:["Guaranteed starting place"],kind:"transfer"})}}return i.window={type:t,offers:e,season:i.seasonNo,round:i.season.round},e.length&&pn(i,`${t==="end"?"Season-end":"Mid-season"} window: ${e.length} offer${e.length>1?"s":""}`,"window"),i.window}function im(i,t){let e=i.window;if(!e)return!1;let n=e.offers[t];if(!n)return!1;let s=ie(n.clubId);if(n.kind==="renewal")return i.contract={clubId:s.id,wage:n.wage,years:n.years+1,role:n.role,expectations:n.expectations,signedSeason:i.seasonNo},pn(i,`Signed a new ${n.years}-season contract with ${s.name}`,"contract"),i.window=null,!0;let r=ie(i.clubId);if(i.clubId=s.id,i.contract={clubId:s.id,wage:n.wage,years:n.years+(e.type==="end"?1:0),role:n.role,expectations:n.expectations,signedSeason:i.seasonNo},i.appsAtClub=0,pn(i,`Transferred from ${r.name} to ${s.name} (${On(s.tier).league})`,"transfer"),i.window=null,e.type==="mid"){let o=Su(i,s.id,i.seasonNo),a=i.season.round-1;for(let l of o.fixtures)l.round<=a&&Jp(i,o,l);o.round=a+1,i.season=o,ws(i)}return!0}function sm(i){if(!i.window)return;let e=i.window.offers.some(n=>n.kind==="renewal");i.window=null,e&&i.contract.years<=1&&(i.contract.years=2,pn(i,`Stayed at ${ie(i.clubId).name} on a rolling contract`,"contract"))}function rm(i){let t=i.season;return t.finished&&(!t.final||t.final.played)&&!i.window}function om(i){i.seasonNo++,i.contract.years=Math.max(0,i.contract.years-1),i.season=Su(i,i.clubId,i.seasonNo),ws(i),i.trainingAvailable=!0,pn(i,`Season ${i.seasonNo} begins with ${ie(i.clubId).name}`,"season")}function am(i){return i.apps?i.ratingSum/i.apps:0}var wo={passing:{name:"Passing Gates",time:45,desc:"Pass through the highlighted gate to the teammate behind it. Each clean pass through a gate scores."},finishing:{name:"Finishing",time:50,desc:"Balls are served into the box. Finish past the goalkeeper - first-time finishes are encouraged."},dribbling:{name:"Dribbling Course",time:60,desc:"Dribble the ball through every gate in order, as fast as you can."},practice:{name:"Free Practice",time:0,desc:"Receive, pass, move and shoot with a teammate against a defender and a goalkeeper. No timer, no XP."}};function lm(i,t,e,n,s,r,o,a){let l=(e-i)*(r-t)-(n-t)*(s-i),c=(e-i)*(a-t)-(n-t)*(o-i),h=(o-s)*(t-r)-(a-r)*(i-s),d=(o-s)*(n-r)-(a-r)*(e-s);return l*c<0&&h*d<0}function Ei(i,t,e,n,s={}){return{role:i,number:t,name:e,attrs:n||{pace:55,stamina:70,control:60,passing:60,finishing:50,tackling:50},keeping:55,foot:"R",...s}}var xc=class{constructor(t,e){this.kind=t,this.def=wo[t],this.human=e,this.score=0,this.t=0,this.done=!1,this.events=[],this.props=null}matchConfig(){let t={...this.human,isHuman:!0,name:this.human.name,attrs:{...this.human.attrs}},e,n;switch(this.kind){case"passing":t.role="CM",e=[t,Ei("W",11,"Station A"),Ei("W",7,"Station B"),Ei("ST",9,"Station C"),Ei("AM",10,"Station D")],n=[];break;case"finishing":t.role="ST",e=[t,Ei("CM",8,"Coach")],n=[Ei("GK",1,"Keeper",null)];break;case"dribbling":t.role="W",e=[t],n=[];break;default:e=[t,Ei("CM",8,"Teammate")],n=[Ei("DEF",4,"Defender",{pace:50,stamina:70,control:45,passing:45,finishing:40,tackling:52}),Ei("GK",1,"Keeper")]}let s=(r,o)=>({name:r,short:r.slice(0,3).toUpperCase(),tier:1,style:"wing",players:o});return{seed:7+Math.floor(Math.random()*1e3),halfLength:1e6,difficulty:"assisted",rules:!1,mode:"drill",teams:[s("Training",e),n.length?s("Opposition",n):null]}}setup(t,e){this.m=t,this.view=e,t.phase="playing",t.clock=0;let n=t.human;this.h=n;for(let r of t.players)r.scripted=!r.isHuman&&!r.isGK&&this.kind!=="practice";let s=new _n;if(this.kind==="passing"){this.center=new ot(-4,0,0),n.pos.copy(this.center);let r=[[10,9],[10,-9],[-12,11],[-12,-11]];this.stations=[];let o=t.teams[0].players.filter(a=>!a.isHuman);r.forEach(([a,l],c)=>{let h=o[c];h.pos.set(this.center.x+a,0,this.center.z+l),h.home={station:h.pos.clone()};let d=this.center.x+a*.5,u=this.center.z+l*.5,p=Math.hypot(a,l),g=-l/p,x=a/p,m={p:h,a:new ot(d+g*1.1,0,u+x*1.1),b:new ot(d-g*1.1,0,u-x*1.1),c:new ot(d,0,u)};this.stations.push(m),s.cone(O.CONE,.16,.42,10,m.a.x,.21,m.a.z),s.cone(O.CONE,.16,.42,10,m.b.x,.21,m.b.z)}),this.active=0,this.pickActive(),this.resetBall()}else if(this.kind==="finishing")n.pos.set(it.HL-15,0,0),this.server=t.teams[0].players.find(r=>!r.isHuman),this.served=0,this.maxBalls=8,this.serve();else if(this.kind==="dribbling"){this.gates=[],[-20,-14,-8,-2,4,10,16,22].forEach((a,l)=>{let c=l%2?-4:4,h={a:new ot(a,0,c-1.25),b:new ot(a,0,c+1.25),c:new ot(a,0,c)};this.gates.push(h),s.cone(O.CONE,.16,.42,10,h.a.x,.21,h.a.z),s.cone(O.CONE,.16,.42,10,h.b.x,.21,h.b.z),s.box(O.TARGET,.05,.05,2.5,a,.6,c)});let o={a:new ot(27,0,-3),b:new ot(27,0,3),c:new ot(27,0,0),finish:!0};this.gates.push(o);for(let a=-3;a<=3;a+=1.5)s.cone(O.TARGET,.14,.36,10,27,.18,a);n.pos.set(-27,0,0),n.yaw=Math.PI/2,t.ball.place(-26.2,0),t.ball.state="free",this.next=0,this.started=!1}else n.pos.set(-6,0,0),n.yaw=Math.PI/2,t.teams[0].players.find(o=>!o.isHuman).pos.set(4,0,10),t.teams[1].players.find(o=>!o.isGK).pos.set(14,0,0),t.keeper(1).pos.set(it.HL-1,0,0),this.resetBall(!0);for(let r of t.players)r.prevPos.copy(r.pos),r.isHuman||(r.yaw=Kt(n.pos.x-r.pos.x,n.pos.z-r.pos.z)),r.prevYaw=r.yaw;if(n.yaw||(n.yaw=Math.PI/2),t.events.emit("humanYaw",{yaw:this.kind==="passing"?Kt(this.stations[this.active].c.x-n.pos.x,this.stations[this.active].c.z-n.pos.z):Math.PI/2}),s.vcount){this.props=new Tn,this.props.add(new ue(s.buildSolid(),Yi({})));let r=new ue(s.buildEdges(),Mi({}));r.frustumCulled=!1,this.props.add(r),e.scene.add(this.props)}t.preStep=r=>this.preStep(r)}dispose(){this.props&&(this.view.scene.remove(this.props),this.props.traverse(t=>t.geometry&&t.geometry.dispose())),this.m&&(this.m.preStep=null)}resetBall(t=!1){let e=this.m,n=this.h,s=n.yaw;e.ball.place(n.pos.x+Math.sin(s)*.7,n.pos.z+Math.cos(s)*.7),e.ball.state="free",e.ball.owner=null,e.ball.lastKick=null,this.lastKickSeen=null,this.gateOk=!1,this.resetAt=null,t&&(e.passIntent=null)}pickActive(){let t=this.active;for(;t===this.active;)t=Math.floor(Math.random()*this.stations.length);this.active=t}serve(){let t=this.m,e=this.server,n=this.h,s=Math.random()<.5?1:-1;e.pos.set(it.HL-9-Math.random()*6,0,s*(13+Math.random()*3)),e.prevPos.copy(e.pos),e.vel.set(0,0,0),e.yaw=Kt(n.pos.x-e.pos.x,n.pos.z-e.pos.z),t.ball.place(e.pos.x+Math.sin(e.yaw)*.6,e.pos.z+Math.cos(e.yaw)*.6),t.ball.state="free",t.ball.owner=null,t.ball.lastKick=null,this.serveAt=t.time+.9,this.shotAt=null,this.resetAt=null,this.served++,this.ballDone=!1}preStep(t){let e=this.m,n=this.h,s=e.ball,r=e.time;if(this.kind==="passing")for(let o of this.stations){let a=o.p,l=a.home.station,c=a.pos.distXZ(l);if(s.owner===a)a.desired.set(0,0,0),a.faceYaw=Kt(n.pos.x-a.pos.x,n.pos.z-a.pos.z),!a.action&&r-(a.gotAt||r)>.55&&he(e,a,"pass",{target:n,ai:!0});else{a.gotAt=r;let h=s.pos.distXZ(a.pos);if(!s.owner&&h<4&&s.speed<12){let d=s.pos.x-a.pos.x,u=s.pos.z-a.pos.z;a.desired.set(d*2,0,u*2)}else c>.3?a.desired.set((l.x-a.pos.x)*2.5,0,(l.z-a.pos.z)*2.5):a.desired.set(0,0,0);a.faceYaw=Kt(s.pos.x-a.pos.x,s.pos.z-a.pos.z)}}else if(this.kind==="finishing"){let o=this.server;if(o.desired.set(0,0,0),o.faceYaw=Kt(n.pos.x-o.pos.x,n.pos.z-o.pos.z),this.serveAt&&r>=this.serveAt&&!o.action){this.serveAt=null;let a=Math.random()<.3,l=new ot(n.pos.x+(Math.random()-.5)*2,0,n.pos.z+(Math.random()-.5)*2);a?he(e,o,"cross",{point:l,ai:!0,elev:.35}):he(e,o,"pass",{target:n,ai:!0})}}}step(){let t=this.m,e=this.h,n=t.ball,s=t.time;if(this.done)return;this.t+=1/120;let r=this.def.time;if(this.kind==="passing"){let o=n.lastKick;o&&o!==this.lastKickSeen&&(this.lastKickSeen=o,o.player===e&&(this.gateOk=!1,this.passTarget=this.stations[this.active]));let a=this.stations[this.active];o&&o.player===e&&lm(n.prevPos.x,n.prevPos.z,n.pos.x,n.pos.z,a.a.x,a.a.z,a.b.x,a.b.z)&&(this.gateOk=!0),n.owner&&n.owner!==e&&o&&o.player===e&&!this.resolved&&(this.resolved=!0,n.owner===a.p&&this.gateOk?(this.score++,this.note("GATE +1","good"),this.pickActive()):this.note(n.owner===a.p?"MISSED THE GATE":"WRONG TEAMMATE","bad")),n.owner===e&&(this.resolved=!1),!n.owner&&(n.pos.distXZ(this.center)>26||n.speed<.2&&n.pos.distXZ(e.pos)>3&&!this.stations.some(l=>l.p.pos.distXZ(n.pos)<3))&&(this.resetAt||(this.resetAt=s+.8),s>=this.resetAt&&this.resetBall()),this.view.markers.showIncoming(a.c.x,a.c.z)}else if(this.kind==="finishing"){let o=n.lastKick;o&&o.player===e&&o.kind==="shot"&&!this.shotAt&&(this.shotAt=s);let a=n.pos.x-ye>it.HL&&n.crossing[0]&&n.crossing[0].inMouth;if(this.ballDone||(a?(this.score++,this.ballDone=!0,this.note(o&&o.firstTime?"FIRST-TIME GOAL!":"GOAL","good"),this.resetAt=s+1.4,t.events.emit("drillGoal",{pos:n.pos.clone()})):n.state==="held"?(this.ballDone=!0,this.note("SAVED","bad"),this.resetAt=s+1):n.pos.x-ye>it.HL||Math.abs(n.pos.z)>it.HW||this.shotAt&&s-this.shotAt>3.2?(this.ballDone=!0,this.note("MISSED","bad"),this.resetAt=s+.9):!this.shotAt&&this.serveAt==null&&n.speed<.3&&!n.owner&&s>6&&n.pos.distXZ(e.pos)>6&&(this.ballDone=!0,this.resetAt=s+.5)),this.resetAt&&s>=this.resetAt){t.keeper(1).hold&&(t.keeper(1).hold=null);let l=t.keeper(1);l.action=null,l.pos.set(it.HL-1,0,0),this.served>=this.maxBalls?this.finish():this.serve()}}else if(this.kind==="dribbling"){!this.started&&(e.speed>.5||n.owner===e)&&(this.started=!0,this.t=0),this.started||(this.t=0);let o=this.gates[this.next];o&&lm(n.prevPos.x,n.prevPos.z,n.pos.x,n.pos.z,o.a.x,o.a.z,o.b.x,o.b.z)&&n.lastTouch===e&&(this.next++,this.score=this.next,o.finish?(this.note(`FINISHED ${this.t.toFixed(1)} s`,"good"),this.finish()):this.note(`GATE ${this.next}/${this.gates.length-1}`,"good")),o&&this.view.markers.showIncoming(o.c.x,o.c.z),!n.owner&&n.speed<.2&&n.pos.distXZ(e.pos)>6?(this.resetAt||(this.resetAt=s+1),s>this.resetAt&&this.resetBall()):n.owner&&(this.resetAt=null)}else{let o=Math.abs(n.pos.z)-ye>it.HW||Math.abs(n.pos.x)-ye>it.HL,a=n.pos.x-ye>it.HL&&n.crossing[0]&&n.crossing[0].inMouth;if((o||n.state==="held")&&!this.resetAt&&(a&&(this.score++,this.note("GOAL","good"),t.events.emit("drillGoal",{pos:n.pos.clone()})),this.resetAt=s+(n.state==="held"?1.2:1.5)),this.resetAt&&s>=this.resetAt){let l=t.keeper(1);l.hold=null,l.action=null,l.pos.set(it.HL-1,0,0),this.resetBall(!0)}}r&&this.t>=r&&this.finish()}note(t,e){this.events.push({text:t,kind:e})}finish(){this.done||(this.done=!0,this.m.phase="fulltime",this.m.phaseT=0)}clockText(){if(!this.def.time)return`Goals ${this.score}`;let t=Math.max(0,this.def.time-this.t);return this.kind==="dribbling"?`${this.t.toFixed(1)} s \xB7 gate ${Math.min(this.next+1,this.gates.length)}/${this.gates.length}`:this.kind==="finishing"?`${Math.ceil(t)} s \xB7 goals ${this.score} \xB7 ball ${Math.min(this.served,this.maxBalls)}/${this.maxBalls}`:`${Math.ceil(t)} s \xB7 gates ${this.score}`}result(){let t=0,e="";if(this.kind==="passing")t=ft(Math.round(8+this.score*2.5),8,35),e=`${this.score} gate passes in ${this.def.time} s`;else if(this.kind==="finishing")t=ft(Math.round(8+this.score*4),8,35),e=`${this.score} goals from ${this.maxBalls} balls`;else if(this.kind==="dribbling"){let n=this.next>=this.gates.length;t=n?ft(Math.round(45-this.t),12,35):ft(4+this.next*2,4,18),e=n?`Course completed in ${this.t.toFixed(1)} s`:`${this.next} of ${this.gates.length} gates in the time limit`}return{xp:t,text:e,score:this.score}}};var Xt=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Ts=i=>(Math.round(i*10)/10).toFixed(1),yc=class{constructor(t){this.app=t,this.root=document.createElement("div"),this.root.className="screens",t.uiRoot.appendChild(this.root),this.current=null,this.stack=[]}show(t,e={},n="screen center dim"){return this.root.innerHTML=`<div class="${n}">${t}</div>`,this.root.querySelectorAll("[data-act]").forEach(s=>{let r=e[s.dataset.act];r&&s.addEventListener("click",o=>{o.preventDefault(),this.app.audio.play("ui",{gain:.4}),r(s,o)})}),this.root.firstChild}clear(){this.root.innerHTML="",this.current=null}back(){if(!(this.current==="menu"||this.app.session)){if(this.current==="hubSub"){this.hub();return}this.mainMenu()}}toast(t,e=!1,n=3200){let s=document.createElement("div");s.className="toast"+(e?" bad":""),s.textContent=t,this.app.uiRoot.appendChild(s),setTimeout(()=>s.remove(),n)}saveCareer(){let t=this.app.store.save();return t.ok||this.toast(`Could not save your career: ${t.error} Your progress is kept only until you close the page.`,!0,6e3),t.ok}mainMenu(){this.current="menu";let t=this.app;t.hud.show(!1);let e=t.store.career,n=e?`<button class="btn big primary" data-act="cont">Continue Career<small>${Xt(e.player.name)} \xB7 ${Xt(ie(e.clubId).name)} \xB7 Season ${e.seasonNo}</small></button>`:"";this.show(`
      <div class="title">First<br>Touch</div>
      <div class="subtitle">A first-person football career. You are one player on the pitch.</div>
      ${n}
      <button class="btn big ${e?"":"primary"}" data-act="new">New Career<small>Create a footballer and start at a community club</small></button>
      <button class="btn big" data-act="quick">Quick Match<small>Any two clubs, no effect on your career</small></button>
      <button class="btn big" data-act="train">Training<small>Passing, finishing and dribbling drills, free practice</small></button>
      <button class="btn big" data-act="style">Visual Style<small>Classic ink or Neobrutalist</small></button>
      <button class="btn big" data-act="settings">Settings</button>
      <button class="btn big" data-act="help">How to Play / Credits</button>
    `,{cont:()=>this.hub(),new:()=>e?this.confirm("Start a new career? Your existing career will be overwritten.",()=>this.newCareer(),()=>this.mainMenu()):this.newCareer(),quick:()=>this.quickMatch(),train:()=>this.training(),style:()=>this.styleMenu(),settings:()=>this.settings(),help:()=>this.howTo()},"screen menu"),t.store.notice&&(this.toast(t.store.notice.text,t.store.notice.bad,7e3),t.store.notice=null)}confirm(t,e,n){this.show(`<div class="panel" style="max-width:520px"><h2>Are you sure?</h2><p>${Xt(t)}</p><div class="row"><button class="btn danger" data-act="yes">Yes, overwrite</button><button class="btn" data-act="no">Cancel</button></div></div>`,{yes:e,no:n})}newCareer(){this.current="new";let t=Sr(),e=uo.map(o=>`<button class="btn ${o.id==="ST"?"on":""}" data-pos="${o.id}">${o.name}</button>`).join(""),n=is(1).map((o,a)=>`<button class="btn ${a===0?"on":""}" data-club="${o.id}">${ss(o,22)} ${Xt(o.name)}</button>`).join(""),s={ST:"Starts high up the pitch. Judged on goals, shots on target and movement. Training favours finishing.",W:"Starts wide. Judged on goals, assists and chances created. Training favours pace and dribbling.",AM:"Plays behind the striker. Judged on chance creation, assists and goals. Training favours passing.",CM:"The link of the team. Judged on passing accuracy, ball winning and chances created.",DEF:"Protects the goal. Judged on tackles, interceptions, clean sheets and distribution."},r=this.show(`
      <div class="panel" style="width:min(820px,94vw)">
        <h2>Create your footballer</h2>
        <div class="grid2">
          <label class="f">Name<input id="nc-name" maxlength="22" value="${Xt(t.name)}"></label>
          <label class="f">Shirt number<input id="nc-num" type="number" min="1" max="99" value="9"></label>
          <label class="f">Nationality<select id="nc-nat">${Gp.map(o=>`<option>${o}</option>`).join("")}</select></label>
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
        <p class="muted small" id="nc-posdesc">${s.ST}</p>
        <h3>Starting club</h3>
        <div class="seg" id="nc-club">${n}</div>
        <p class="muted small">You start at a community club with a guaranteed place in the team. Goalkeepers are AI-controlled.</p>
        <div class="row" style="margin-top:14px"><button class="btn primary big" data-act="go">Sign your first contract</button><button class="btn" data-act="back">Back</button></div>
      </div>`,{back:()=>this.mainMenu(),go:()=>{let o=r.querySelector("#nc-name").value.trim()||"A. Newcomer",a=Math.max(1,Math.min(99,parseInt(r.querySelector("#nc-num").value,10)||9)),l=r.querySelector("#nc-pos .on").dataset.pos,c=r.querySelector("#nc-club .on").dataset.club,h=jp({name:o,number:a,nationality:r.querySelector("#nc-nat").value,foot:r.querySelector("#nc-foot").value,role:l,clubId:c,look:{skin:r.querySelector("#nc-skin").value,hair:r.querySelector("#nc-hair").value,boots:r.querySelector("#nc-boots").value}});this.app.store.career=h,this.saveCareer(),this.hub()}});r.querySelectorAll("#nc-pos .btn").forEach(o=>o.addEventListener("click",()=>{r.querySelectorAll("#nc-pos .btn").forEach(l=>l.classList.remove("on")),o.classList.add("on"),r.querySelector("#nc-posdesc").textContent=s[o.dataset.pos];let a={ST:9,W:11,AM:10,CM:8,DEF:4};r.querySelector("#nc-num").value=a[o.dataset.pos]})),r.querySelectorAll("#nc-club .btn").forEach(o=>o.addEventListener("click",()=>{r.querySelectorAll("#nc-club .btn").forEach(a=>a.classList.remove("on")),o.classList.add("on")}))}hub(){this.current="hub";let e=this.app.store.career;if(!e){this.mainMenu();return}let n=ie(e.clubId),s=e.season,r=e.player,o=Tu(e),a="";if(e.window)a='<div class="next-fixture">Transfer window open</div><p class="muted">Review the offers before continuing.</p>';else if(o){let y=ie(o.home),v=ie(o.away),b=o.final?"Continental Stadium (neutral)":`${Xt(y.ground)} \xB7 ${On(y.tier).venue==="community"?"Community Ground":On(y.tier).label+" stadium"}`;a=`<div class="muted small">${o.final?Xt(o.name):`${Xt(s.league)} \xB7 Round ${o.round} of 6`}</div>
        <div class="next-fixture">${ss(y,36)} ${Xt(y.name)} <span class="muted">v</span> ${Xt(v.name)} ${ss(v,36)}</div>
        <div class="muted small">${b}</div>
        <div class="row" style="margin-top:12px"><button class="btn huge primary" data-act="play">Play Match</button></div>`}else if(rm(e)){let y=s.final&&s.final.played?`<p>${s.final.won?"\u{1F3C6} <b>Continental Cup winners!</b>":`Continental Cup Final: lost ${s.final.score?s.final.score.join("-"):""}.`}</p>`:"";a=`<div class="next-fixture">Season ${e.seasonNo} complete</div>
        <p>${Xt(n.name)} finished <b>${gc(s.placement)}</b> in the ${Xt(s.league)}.${s.placement===1?" \u{1F3C6} <b>Champions!</b>":""}</p>${y}
        <button class="btn huge primary" data-act="season">Start Season ${e.seasonNo+1}</button>`}let l=wu(s).map((y,v)=>`<tr class="${y.id===e.clubId?"me":""}"><td>${v+1}</td><td>${ss(ie(y.id),18)} ${Xt(ie(y.id).name)}</td><td class="n">${y.p}</td><td class="n">${y.w}</td><td class="n">${y.d}</td><td class="n">${y.l}</td><td class="n">${y.gf-y.ga}</td><td class="n"><b>${y.pts}</b></td></tr>`).join(""),c=s.fixtures.filter(y=>y.score&&(y.home===e.clubId||y.away===e.clubId)).map(y=>`<div>R${y.round}: ${Xt(ie(y.home).short)} ${y.score[0]}-${y.score[1]} ${Xt(ie(y.away).short)}</div>`).join(""),h=Mu.map(y=>`<div class="attr"><span>${$p[y]}</span><div class="bar"><i style="width:${r.attrs[y]}%"></i></div><b>${r.attrs[y]}</b><button class="btn" data-act="up" data-k="${y}" ${r.points>0&&r.attrs[y]<99?"":"disabled"} title="+${Au(r.attrs[y])}">+</button></div>`).join(""),d=e.form.slice(-5).map(y=>`<span class="${y>=7?"hi":y<6?"lo":""}">${Ts(y)}</span>`).join("")||'<span class="muted small">no matches yet</span>',u=e.totals,p=e.seasons.find(y=>y.season===e.seasonNo&&y.clubId===e.clubId)||{apps:0,goals:0,assists:0,ratingSum:0},g=Ru(e).map(y=>`<div style="margin:8px 0"><div class="row">${ss(y.club,20)} <b>${Xt(y.club.name)}</b><span class="spacer"></span><span class="small">${Math.round(y.score*100)}%</span></div><div class="bar ${y.qualifies?"good":""}"><i style="width:${Math.round(y.score*100)}%"></i></div><div class="small muted">${Xt(y.text)}</div></div>`).join("")||'<p class="muted">You are at the top level. Keep performing to win the league and the Continental Cup.</p>',x="";e.window&&(x=`<h3>${e.window.type==="end"?"Season-end":"Mid-season"} transfer window</h3>`+(e.window.offers.length?e.window.offers.map((y,v)=>{let b=ie(y.clubId);return`<div class="offer"><div class="row">${ss(b,30)}<div><b>${Xt(b.name)}</b> <span class="pill">Tier ${y.tier}</span><div class="small">${Xt(y.role)} \xB7 ${y.wage.toLocaleString()} cr/week \xB7 ${y.years} season${y.years>1?"s":""}</div></div></div>
          <div class="small" style="margin-top:6px"><b>Expectations:</b> ${Xt(y.expectations)}</div>
          <div class="small"><b>Why:</b> ${y.reasons.map(Xt).join("; ")}</div>
          <div class="row" style="margin-top:8px"><button class="btn primary" data-act="accept" data-i="${v}">${y.kind==="renewal"?"Sign renewal":"Accept transfer"}</button></div></div>`}).join(""):'<p class="muted">No clubs made an offer this window. Build your form and reputation.</p>')+`<button class="btn" data-act="decline">${e.window.offers.length?`Stay at ${Xt(n.name)}`:"Continue"}</button>`);let m=e.seasons.map(y=>`<tr><td>S${y.season}</td><td>${Xt(ie(y.clubId).short)}</td><td class="n">${y.apps}</td><td class="n">${y.goals}</td><td class="n">${y.assists}</td><td class="n">${y.apps?Ts(y.ratingSum/y.apps):"-"}</td><td class="n">${y.passAtt?Math.round(y.passCmp/y.passAtt*100)+"%":"-"}</td><td class="n">${y.tackles}</td><td class="n">${y.placement?gc(y.placement):"-"}</td></tr>`).join(""),f=[...e.timeline].reverse().map(y=>`<div><span class="muted small">S${y.season}${y.round?" R"+Math.min(6,y.round):""}</span> ${Xt(y.text)}</div>`).join(""),M=e.trophies.map(y=>`<span class="pill">\u{1F3C6} ${Xt(y.name)} S${y.season}</span>`).join(" ")||'<span class="muted small">none yet</span>';this.show(`
      <div class="hub-head">${ss(n,64)}<div><h1>${Xt(n.name)}</h1><div class="muted">${Xt(s.league)} \xB7 Season ${e.seasonNo} \xB7 ${Xt(r.name)} #${r.number} \xB7 ${rs(r.role)} \xB7 ${Xt(r.nationality)}</div></div>
        <span class="spacer"></span>
        <div class="col" style="text-align:right"><div><b>Level ${r.level}</b> \xB7 XP ${r.xp}/100 \xB7 Reputation ${Math.round(r.reputation)}</div><div class="small muted">Contract: ${e.contract.wage.toLocaleString()} cr/week \xB7 ${e.contract.years} season(s) left \xB7 ${Xt(e.contract.role)}</div></div>
        <button class="btn" data-act="menu">Main Menu</button></div>
      <div class="hub-grid">
        <div class="col">
          <div class="panel">${a}${o&&!e.window?`<div class="row" style="margin-top:10px"><button class="btn" data-act="train">Training ${e.trainingAvailable?"(XP available)":"(no XP until next match)"}</button></div>`:""}</div>
          <div class="panel"><h3>${Xt(s.league)}</h3><table class="t"><tr><th>#</th><th>Club</th><th class="n">P</th><th class="n">W</th><th class="n">D</th><th class="n">L</th><th class="n">GD</th><th class="n">Pts</th></tr>${l}</table><div class="small muted" style="margin-top:6px">${c}</div></div>
        </div>
        <div class="col">
          <div class="panel"><h3>Attributes</h3>${h}<div class="small muted">Upgrade points: <b>${r.points}</b>. Earn XP by playing (and a little from training).</div></div>
          <div class="panel"><h3>Recent form</h3><div class="form-dots">${d}</div>
            <h3>This season</h3><div class="small">${p.apps} apps \xB7 ${p.goals} goals \xB7 ${p.assists} assists \xB7 avg ${p.apps?Ts(p.ratingSum/p.apps):"-"}</div>
            <h3>Career</h3><div class="small">${u.apps} apps \xB7 ${u.goals} goals \xB7 ${u.assists} assists \xB7 avg rating ${u.apps?Ts(am(u)):"-"} \xB7 pass accuracy ${u.passAtt?Math.round(u.passCmp/u.passAtt*100)+"%":"-"} \xB7 ${u.tackles} tackles \xB7 earnings ${e.earnings.toLocaleString()} cr</div>
            <div style="margin-top:6px">${M}</div></div>
        </div>
        <div class="col">
          ${x?`<div class="panel">${x}</div>`:""}
          <div class="panel"><h3>Club interest</h3>${g}<div class="small muted">Offers only arrive at transfer windows (after fixture 3 and at season end). Training does not count.</div></div>
          <div class="panel"><h3>Career history</h3><table class="t"><tr><th>S</th><th>Club</th><th class="n">Apps</th><th class="n">G</th><th class="n">A</th><th class="n">Avg</th><th class="n">Pass</th><th class="n">Tkl</th><th class="n">Pos</th></tr>${m}</table>
            <h3>Timeline</h3><div class="timeline">${f}</div></div>
        </div>
      </div>`,{menu:()=>this.mainMenu(),play:()=>this.app.playCareerMatch(),train:()=>this.training(!0),season:()=>{om(e),this.saveCareer(),this.hub()},up:y=>{em(e,y.dataset.k)&&(this.saveCareer(),this.hub())},accept:y=>{im(e,+y.dataset.i),this.saveCareer(),this.hub()},decline:()=>{sm(e),this.saveCareer(),this.hub()}},"screen hub")}report(t,e={}){let n=this.app;n.input.active=!1,n.input.exitLock(),n.hud.show(!1),this.current="report";let s=t.match,r=s.human,o=s.stats.report(r),a=o.stats,l=null;if(e.career&&!t.committed){t.committed=!0;let x=n.store.career;l=tm(x,e.matchId,e.fx,{score:o.score,rating:o.rating,minutes:o.minutes,stats:a,motm:o.motm&&o.motm.isHuman}),t.summary=l,this.saveCareer()}else e.career&&(l=t.summary);let c=o.breakdown,h=[...c.pos.slice(0,3).map(x=>`<div class="plus">+${x.v.toFixed(2)} ${Xt(x.label)}</div>`),...c.neg.slice(0,3).map(x=>`<div class="minus">${x.v.toFixed(2)} ${Xt(x.label)}</div>`)].join("")||'<div class="muted">A quiet game.</div>',d=o.goals.map(x=>`<div class="small">${x.clock} ${Xt(s.teams[x.team].short)} - ${x.ownGoal?`own goal (${Xt(x.ownGoalBy||"")})`:Xt(x.scorer||"?")}${x.assist?` (assist ${Xt(x.assist)})`:""}</div>`).join(""),u=(x,m)=>`<div class="stat"><b>${x}</b><span>${m}</span></div>`,p=(()=>{let x=o.score[r.team],m=o.score[1-r.team];return x>m?"Win":x<m?"Defeat":"Draw"})(),g=l&&!l.duplicate?`<div class="small">+${l.xp} XP${l.levelUps?` \xB7 <b>${l.levelUps} upgrade point${l.levelUps>1?"s":""} earned</b>`:""} \xB7 reputation ${l.rep>=0?"+":""}${l.rep.toFixed(1)}</div>`:e.quick?'<div class="small muted">Quick match: no effect on your career.</div>':"";this.show(`
      <div class="panel report">
        <div class="row"><h2>${e.title||"Match Report"}</h2><span class="spacer"></span><span class="pill">${p}</span></div>
        <div class="big-score">${Xt(s.teams[0].name)} ${o.score[0]} - ${o.score[1]} ${Xt(s.teams[1].name)}</div>
        ${d}
        <div class="row" style="margin:12px 0;gap:24px">
          <div><div class="small">MATCH RATING</div><div class="rating-big">${Ts(o.rating)}</div></div>
          <div class="why small"><b>Biggest rating changes</b>${h}</div>
          <span class="spacer"></span>
          <div class="small">Minutes played: <b>${o.minutes}</b><br>Possession ${o.possession[0]}% - ${o.possession[1]}%<br>Shots ${o.teamShots[0]} (${o.teamShotsOn[0]}) - ${o.teamShots[1]} (${o.teamShotsOn[1]})<br>Player of the match: <b>${o.motm?Xt(o.motm.name)+" "+Ts(o.motm.rating):"-"}</b></div>
        </div>
        <div class="statgrid">
          ${u(a.goals,"Goals")}${u(a.assists,"Assists")}${u(`${a.passCmp}/${a.passAtt}`,"Passes completed")}${u(a.passAtt?a.passAcc+"%":"-","Pass accuracy")}
          ${u(a.shots,"Shots")}${u(a.shotsOn,"On target")}${u(a.tacklesWon,"Tackles won")}${u(a.interceptions,"Interceptions")}
          ${u(a.possLost,"Possession lost")}${u(a.fouls,"Fouls")}${u(a.keyPasses,"Chances created")}${u(a.touches,"Touches")}
        </div>
        ${g}
        <div class="row" style="margin-top:14px"><button class="btn primary big" data-act="cont">${e.career?"Continue to Career Hub":"Continue"}</button>${e.quick?'<button class="btn" data-act="again">Play again</button>':""}</div>
      </div>`,{cont:()=>{n.endSession(),e.career?this.hub():e.quick?this.quickMatch():this.mainMenu()},again:()=>{n.endSession(),n.startQuickMatch(this.lastQuick||{})}})}quickMatch(){this.current="quick";let t=this.app,e=this.lastQuick||{home:"millbrook",away:"ashford",side:0,role:t.store.career?t.store.career.player.role:"ST",len:t.settings.matchLength},n=r=>_u.map(o=>`<optgroup label="Tier ${o.tier} \xB7 ${o.league}">${is(o.tier).map(a=>`<option value="${a.id}" ${a.id===r?"selected":""}>${Xt(a.name)}</option>`).join("")}</optgroup>`).join(""),s=this.show(`
      <div class="panel" style="width:min(640px,94vw)">
        <h2>Quick Match</h2>
        <div class="grid2">
          <label class="f">Home club<select id="q-home">${n(e.home)}</select></label>
          <label class="f">Away club<select id="q-away">${n(e.away)}</select></label>
          <label class="f">You play for<select id="q-side"><option value="0" ${e.side===0?"selected":""}>Home</option><option value="1" ${e.side===1?"selected":""}>Away</option></select></label>
          <label class="f">Position<select id="q-role">${uo.map(r=>`<option value="${r.id}" ${r.id===e.role?"selected":""}>${r.name}</option>`).join("")}</select></label>
          <label class="f">Match length<select id="q-len"><option value="short">2 min halves</option><option value="normal">3 min halves</option><option value="long">5 min halves</option></select></label>
        </div>
        <p class="small muted">Uses ${t.store.career?"your career player":"a default player"} and the home club's stadium. Quick matches never change career progress.</p>
        <div class="row"><button class="btn primary big" data-act="go">Kick Off</button><button class="btn" data-act="back">Back</button></div>
      </div>`,{back:()=>this.mainMenu(),go:()=>{let r={home:s.querySelector("#q-home").value,away:s.querySelector("#q-away").value,side:+s.querySelector("#q-side").value,role:s.querySelector("#q-role").value,len:s.querySelector("#q-len").value};if(r.home===r.away){this.toast("Pick two different clubs.",!0);return}this.lastQuick={...r,halfLength:Al[r.len]},t.startQuickMatch(this.lastQuick)}});s.querySelector("#q-len").value=e.len||"normal"}training(t=!1){this.current=t?"hubSub":"training";let e=this.app.store.career,n=e?e.trainingAvailable?"Your next completed drill earns development XP (once between matches).":"You have already trained since your last match: drills give no XP until you play again.":"Without a career, drills are just for practice.",s=Object.entries(wo).map(([r,o])=>`<div class="panel"><h3>${Xt(o.name)}</h3><p class="small">${Xt(o.desc)}</p><div class="small muted">${o.time?`${o.time} seconds`:"Untimed"}</div><button class="btn primary" data-act="go" data-k="${r}" style="margin-top:8px">Start</button></div>`).join("");this.show(`<div class="panel" style="width:min(1000px,96vw)"><h2>Training Ground</h2><p class="small">${n} Training never counts towards club interest.</p><div class="grid2">${s}</div><div class="row" style="margin-top:12px"><button class="btn" data-act="back">Back</button></div></div>`,{go:r=>this.startDrill(r.dataset.k,t),back:()=>t?this.hub():this.mainMenu()})}startDrill(t,e=!1){let n=this.app,s=n.store.career,r={...s?s.player:Sr()},o=new xc(t,r),a=s?ie(s.clubId):Kn[0],l=lo(a,Kn.find(u=>u.id!==a.id&&u.tier===a.tier)||Kn[1]),c=n.startSession({mode:"drill",venue:"training",venueOpts:{homeName:"Training"},colours:{kits:l,human:r.look},match:o.matchConfig(),noStart:!0,clockText:()=>o.clockText(),onStep:()=>o.step(),onEnd:()=>this.drillResult(o,e)});o.setup(c.match,n.view),c.drill=o,c.cam.yaw=c.human.yaw;let h=c.dispose.bind(c);c.dispose=()=>{o.dispose(),h()};let d=()=>{if(n.session===c){for(;o.events.length;){let u=o.events.shift();n.hud.notify(u.text,u.kind)}requestAnimationFrame(d)}};d(),c.match.events.on("drillGoal",u=>{n.view.celebrate(u.pos.x,u.pos.z,0,.5),n.audio.play("net"),n.audio.play("cheer",{gain:.3})}),n.hud.showBanner(wo[t].name,wo[t].desc,3500)}drillResult(t,e){let n=this.app;n.input.active=!1,n.input.exitLock();let s=t.result(),r=n.store.career,o="";if(t.kind==="practice")o='<p class="muted">Free practice gives no XP.</p>';else if(r&&r.trainingAvailable){let a=Eu(r,s.xp);r.trainingAvailable=!1,this.saveCareer(),o=`<p><b>+${s.xp} XP</b>${a?` \xB7 ${a} upgrade point${a>1?"s":""} earned`:""}</p>`}else r&&(o='<p class="muted">No XP: you have already trained since your last match.</p>');this.show(`<div class="panel" style="max-width:520px"><h2>${Xt(t.def.name)}</h2><p style="font-size:20px"><b>${Xt(s.text)}</b></p>${o}
      <div class="row"><button class="btn primary" data-act="again">Try again</button><button class="btn" data-act="back">Back to Training</button></div></div>`,{again:()=>{n.endSession(),this.startDrill(t.kind,e)},back:()=>{n.endSession(),this.training(e)}})}styleMenu(t=!1){this.current=t?"pauseSub":"style";let e=this.app,n={};try{let r=e.session?null:{pos:[-14,8,27],look:[6,.8,-2]};for(let o of["classic","neo"])n[o]=e.view.renderPreview(o,480,270,r)}catch{n={}}let s=(r,o,a)=>`<div class="preview ${e.style===r?"on":""}" data-act="pick" data-s="${r}">${n[r]?`<img src="${n[r]}" alt="${o}">`:""}<h3>${o}</h3><div class="small">${a}</div></div>`;this.show(`<div class="panel" style="width:min(820px,96vw)"><h2>Visual Style</h2><p class="small muted">Previews are rendered live from the game. Switching is instant and never interrupts play.</p>
      <div class="previews">${s("classic","Classic","Pale unlit surfaces, thin black ink edges, restrained kits, paper interface.")}${s("neo","Neobrutalist","Saturated colours, 3 px outlines, toon shading with hard sun shadows, bold interface.")}</div>
      <div class="row" style="margin-top:14px"><button class="btn" data-act="back">Back</button></div></div>`,{pick:r=>{e.setStyle(r.dataset.s),this.styleMenu(t)},back:()=>t?this.pauseMenu():this.mainMenu()})}settings(t=!1){this.current=t?"pauseSub":"settings";let e=this.app,n=e.settings,s=(a,l)=>`<div class="seg" data-key="${a}">${l.map(([c,h])=>`<button class="btn ${String(n[a])===String(c)?"on":""}" data-v="${c}">${h}</button>`).join("")}</div>`,r=this.show(`<div class="panel" style="width:min(640px,96vw)"><h2>Settings</h2>
      <div class="grid2">
        <label class="f">Mouse sensitivity <span id="v-sens">${n.sensitivity.toFixed(2)}</span><input type="range" min="0.2" max="3" step="0.05" id="s-sens" value="${n.sensitivity}"></label>
        <label class="f">Field of view <span id="v-fov">${cm(n.fov)}</span><input type="range" min="${60}" max="${200}" step="1" id="s-fov" value="${n.fov}"></label>
        <label class="f">Master volume<input type="range" min="0" max="1" step="0.05" id="s-master" value="${n.master}"></label>
        <label class="f">Effects volume<input type="range" min="0" max="1" step="0.05" id="s-sfx" value="${n.sfx}"></label>
        <label class="f">Crowd volume<input type="range" min="0" max="1" step="0.05" id="s-crowd" value="${n.crowd}"></label>
      </div>
      <h3>Controls</h3>${s("invertY",[[!1,"Normal Y"],[!0,"Invert Y"]])}
      <h3>Difficulty</h3>${s("difficulty",Object.entries(fc).map(([a,l])=>[a,l.label]))}
      <div class="small muted">Assisted (default): the ball sticks to your feet, passes find teammates and are chipped over blocked lanes, and opponents are slower and make more mistakes. Expert keeps only light assistance.</div>
      <h3>Camera</h3>${s("bob",[[!0,"View bob on"],[!1,"View bob off"]])} <div style="height:6px"></div>${s("shake",[[!0,"Camera shake on"],[!1,"Camera shake off"]])}
      <h3>Quality</h3>${s("quality",[["low","Low"],["medium","Medium"],["high","High"]])}
      <h3>Match length</h3>${s("matchLength",[["short","2 min halves"],["normal","3 min halves"],["long","5 min halves"]])}
      <div class="row" style="margin-top:14px"><button class="btn primary" data-act="back">Done</button></div></div>`,{back:()=>{e.applySettings(),t?this.pauseMenu():this.mainMenu()}}),o=(a,l,c)=>r.querySelector(a).addEventListener("input",h=>{n[l]=parseFloat(h.target.value),c&&(r.querySelector(c).textContent=l==="fov"?cm(n[l]):n[l].toFixed(2)),e.applySettings()});o("#s-sens","sensitivity","#v-sens"),o("#s-fov","fov","#v-fov"),o("#s-master","master"),o("#s-sfx","sfx"),o("#s-crowd","crowd"),r.querySelectorAll(".seg").forEach(a=>a.querySelectorAll(".btn").forEach(l=>l.addEventListener("click",()=>{let c=a.dataset.key,h=l.dataset.v;h==="true"?h=!0:h==="false"&&(h=!1),n[c]=h,a.querySelectorAll(".btn").forEach(d=>d.classList.remove("on")),l.classList.add("on"),e.applySettings(),c==="difficulty"&&e.session&&this.toast("Difficulty applies from the next match.")})))}howTo(t=!1){this.current=t?"pauseSub":"help";let e=fu.map(([n,s])=>`<tr><td><b>${n}</b></td><td>${s}</td></tr>`).join("");this.show(`<div class="panel" style="width:min(860px,96vw);max-height:92vh;overflow:auto"><h2>How to Play</h2>
      <table class="t">${e}</table>
      <h3>Playing</h3>
      <p class="small">You control one footballer and see the match through their eyes. Your teammates and opponents are AI. Receive the ball with a soft first touch by simply letting it reach your feet (move to push the touch into space). Press pass just before the ball arrives for a first-time pass; hold shoot while the ball arrives for a first-time finish. The ring shows who your pass will go to - look towards a teammate to choose them. While you have the ball the screen edge glows green; your close control keeps it at your feet, so opponents have to tackle you for it. Press E near a dribbler to lunge in with a tackle. Press Space without the ball to call for it: a teammate acknowledges and passes when you are open. Settings has the difficulty (how much help you get and how sharp the opponents are) and a field of view from 60 to 200 degrees.</p>
      <h3>Rules</h3>
      <p class="small">7-a-side on a 64 x 42 m pitch with 5 x 2 m goals. Two halves (3 minutes each by default; the clock is shown as a 90-minute match and stops during stoppages). Kick-offs, throw-ins, corners, goal kicks, free kicks and penalties are used. <b>There is no offside</b> in this small-sided format. Keepers may handle anywhere in their own area (no back-pass rule). A goal counts only when the whole ball crosses the line between the posts and under the bar.</p>
      <h3>Career</h3>
      <p class="small">Start at a community club. Each season has 6 league fixtures. Matches give development XP (100 XP = 1 upgrade point); drills give a little XP once between matches. Club interest comes from your last 5 ratings, your reputation, contributions in your position and appearances - never from training or time passing. Offers arrive at transfer windows after fixture 3 and at season end, normally from one tier higher.</p>
      <h3>Credits</h3>
      <p class="small">First Touch - design, code, geometry and synthesised audio made for this game. Rendering with three.js (MIT licence, vendored). All clubs, players and competitions are fictional.</p>
      <div class="row"><button class="btn primary" data-act="back">Back</button></div></div>`,{back:()=>t?this.pauseMenu():this.mainMenu()})}pauseMenu(){this.current="pause";let t=this.app,e=t.session,n=e&&e.cfg.mode==="career"?"Exit to Career Hub":e&&e.cfg.mode==="drill"?"Exit to Training":"Exit to Main Menu";this.show(`<div class="panel" style="width:min(420px,92vw)"><h2>Paused</h2>
      <div class="col">
        <button class="btn primary big" data-act="resume">Resume</button>
        <button class="btn" data-act="controls">Controls</button>
        <button class="btn" data-act="settings">Settings</button>
        <button class="btn" data-act="style">Visual Style</button>
        ${e&&e.cfg.mode!=="drill"?'<button class="btn" data-act="stats">Match Statistics</button>':""}
        <button class="btn danger" data-act="exit">${n}</button>
      </div>
      ${e&&e.cfg.mode==="career"?'<p class="small muted">Leaving now abandons the match: it will not count and the fixture stays unplayed.</p>':""}</div>`,{resume:()=>t.resume(),controls:()=>this.howTo(!0),settings:()=>this.settings(!0),style:()=>this.styleMenu(!0),stats:()=>this.liveStats(),exit:()=>{let s=e?e.cfg.mode:null;t.endSession(),s==="career"?this.hub():s==="drill"?this.training(!!t.store.career):this.mainMenu()}})}liveStats(){let t=this.app.session.match,e=t.human,n=t.stats.report(e),s=n.stats;this.show(`<div class="panel" style="width:min(560px,94vw)"><h2>Match Statistics</h2>
      <div class="big-score">${Xt(t.teams[0].short)} ${n.score[0]} - ${n.score[1]} ${Xt(t.teams[1].short)}</div>
      <table class="t">
        <tr><td>Current rating</td><td class="n"><b>${Ts(n.rating)}</b></td></tr>
        <tr><td>Goals / assists</td><td class="n">${s.goals} / ${s.assists}</td></tr>
        <tr><td>Passes completed</td><td class="n">${s.passCmp}/${s.passAtt} (${s.passAcc}%)</td></tr>
        <tr><td>Shots (on target)</td><td class="n">${s.shots} (${s.shotsOn})</td></tr>
        <tr><td>Tackles won / interceptions</td><td class="n">${s.tacklesWon} / ${s.interceptions}</td></tr>
        <tr><td>Possession lost / fouls</td><td class="n">${s.possLost} / ${s.fouls}</td></tr>
        <tr><td>Team possession</td><td class="n">${n.possession[0]}% - ${n.possession[1]}%</td></tr>
      </table>
      <div class="row" style="margin-top:12px"><button class="btn" data-act="back">Back</button></div></div>`,{back:()=>this.pauseMenu()})}clickToPlay(){this.current="click";let t=this.app.session,e=!this.seenControls;this.seenControls=!0;let n=t&&t.cfg.title?`<h2>${Xt(t.cfg.title)}</h2>`:"",s=fu.map(([a,l])=>`<tr><td><b>${a}</b></td><td>${l}</td></tr>`).join("");this.show(`<div class="panel" style="text-align:center;max-width:620px">${n}<div class="lockmsg">Click to play</div>
      ${e?`<table class="t small" style="margin-top:10px;text-align:left">${s}</table><div class="small" style="margin-top:8px;text-align:left">Let passes reach your feet for a soft first touch. Look at a teammate to select them (ring), then right-click. Press pass or hold shoot just before the ball arrives to play it first time.</div>`:'<div class="small muted">Mouse look \xB7 WASD move \xB7 Shift sprint \xB7 LMB shoot \xB7 RMB pass \xB7 Space through / call \xB7 E tackle \xB7 C slide \xB7 Esc pause</div>'}</div>`,{},"screen center dim"),this.root.firstChild.addEventListener("click",()=>{this.app.resume()},{once:!0})}lockRefused(){this.show(`<div class="panel" style="text-align:center"><div class="lockmsg">Click to resume</div><p class="small">The browser did not capture the mouse. Click again (browsers refuse for about a second after Esc).<br>Or play without capture: hold a mouse button and drag to look, or use the arrow keys.</p>
      <div class="row" style="justify-content:center"><button class="btn primary" data-act="r">Resume</button><button class="btn" data-act="d">Play with drag-look</button></div></div>`,{r:()=>this.app.resume(),d:()=>{this.app.input.dragMode=!0,this.app.resume()}})}};function cm(i){return i>120?`${i}\xB0 (wide view)`:`${i}\xB0`}var vc="firsttouch.career",hm="firsttouch.career.backup";function um(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0).toString(16)}function Pb(i){return!(!i||typeof i!="object"||!i.player||typeof i.player.name!="string"||!i.player.attrs||!ie(i.clubId)||!i.season||!Array.isArray(i.season.fixtures)||!Array.isArray(i.season.table)||!i.totals||!Array.isArray(i.timeline)||!Array.isArray(i.committed))}function Ib(i,t){return t<2&&(i.flags=i.flags||{},i.earnings=i.earnings||0,i.trophies=i.trophies||[]),i.version=So,i}function Pu(i){let t=JSON.parse(i);if(!t||typeof t.data!="string"||um(t.data)!==t.sum)throw new Error("checksum mismatch");let e=JSON.parse(t.data),n=t.version||1;if(n>So)throw new Error("save from a newer version");let s=Ib(e,n);if(!Pb(s))throw new Error("invalid career data");return s}var _c=class{constructor(){this.career=null,this.notice=null,this.load()}load(){let t=null;try{t=localStorage.getItem(vc)}catch{this.notice={bad:!0,text:"Saving is unavailable in this browser (storage blocked). Progress will not persist."};return}if(t)try{this.career=Pu(t)}catch{let n=null;try{n=localStorage.getItem(hm)}catch{}try{if(!n)throw new Error("no backup");this.career=Pu(n),this.notice={bad:!0,text:"Your career save was damaged, so the backup copy was restored."},this.save()}catch{this.career=null,this.corrupt=t,this.notice={bad:!0,text:"Your career save was damaged and no usable backup exists. Start a new career to continue."}}}}save(){if(!this.career)return{ok:!1,error:"no career"};try{let t=JSON.stringify(this.career),e=JSON.stringify({version:So,savedAt:Date.now(),sum:um(t),data:t}),n=localStorage.getItem(vc);if(n)try{Pu(n),localStorage.setItem(hm,n)}catch{}return localStorage.setItem(vc,e),{ok:!0}}catch(t){return{ok:!1,error:t&&t.name==="QuotaExceededError"?"Browser storage is full.":"Browser storage is unavailable."}}}set(t){return this.career=t,this.save()}erase(){this.career=null;try{localStorage.removeItem(vc)}catch{}}};var Iu=class{constructor(){let t=document.createElement("style");t.textContent=Vu,document.head.appendChild(t),this.params=new URLSearchParams(location.search),this.settings=Fp(),this.canvas=document.getElementById("game"),this.uiRoot=document.getElementById("ui"),this.view=new ic(this.canvas,{quality:this.settings.quality,preserve:this.params.has("preserve")}),this.view.setQuality(this.settings.quality),this.style=this.params.get("style")||zp(),this.view.setStyle(this.style),this.audio=new sc,this.audio.setVolumes({master:this.settings.master,sfx:this.settings.sfx,crowd:this.settings.crowd}),this.input=new oc(this.canvas),this.input.sensitivity=this.settings.sensitivity,this.input.invertY=this.settings.invertY,this.hud=new ac(this.uiRoot),this.store=new _c,this.screens=new yc(this),this.session=null,this.menuSession=null,this.paused=!1,this.last=performance.now(),this.fpsCap=Number(this.params.get("fps")||0),this.frameAcc=0,this.input.onPause=()=>this.togglePause(),this.input.onLockLost=()=>{this.session&&!this.paused&&this.pause()},this.input.onLockGained=()=>{this.session&&this.awaitingLock&&this.unpause()},this.input.onLockError=()=>{this.session&&this.awaitingLock&&(this.awaitingLock=!1,this.screens.lockRefused())},document.addEventListener("visibilitychange",()=>{document.hidden?this.onBlur():this.onFocus()}),window.addEventListener("blur",()=>this.onBlur()),window.addEventListener("focus",()=>this.onFocus()),window.addEventListener("resize",()=>this.view.resize());let e=()=>{this.audio.init(),this.audio.resume()};window.addEventListener("pointerdown",e,{capture:!0}),window.addEventListener("keydown",e,{capture:!0}),document.getElementById("boot")?.remove(),this.startMenuBackground(),this.screens.mainMenu(),requestAnimationFrame(s=>this.loop(s)),window.__ft=this,this.debugStep=s=>{let r=(this.session||this.menuSession).match;for(let o=0;o<s;o++)r.step(1/120)};let n=this.params.get("auto");n&&setTimeout(()=>this.autostart(n),50)}autostart(t){let e=this.params.get("half")?Number(this.params.get("half")):void 0;e&&(this.testHalf=e),t==="quick"?this.startQuickMatch({home:this.params.get("home")||"millbrook",away:this.params.get("away")||"ashford",role:this.params.get("role")||"ST",venue:this.params.get("venue"),halfLength:e}):t==="practice"?this.startTraining("practice"):t.startsWith("drill:")?this.startTraining(t.slice(6)):t==="hub"&&this.screens.hub()}loop(t){requestAnimationFrame(s=>this.loop(s));let e=(t-this.last)/1e3;if(this.fpsCap){if(this.frameAcc+=e,this.last=t,this.frameAcc<1/this.fpsCap)return;e=this.frameAcc,this.frameAcc=0}else this.last=t;e=Math.min(e,.1);let n=this.session||this.menuSession;n&&n.frame(this.paused&&this.session?0:e),this.onFrame&&this.onFrame(e)}startMenuBackground(t="town"){if(this.menuSession)return;let e=ie("oldbridge"),n=ie("fenwick"),s=lo(e,n),r={mode:"menu",venue:t,venueOpts:{homeName:e.name},colours:{kits:s,human:Sr().look},match:{seed:99,halfLength:1e5,difficulty:"standard",teams:[Mo(e),Mo(n)]}};this.menuSession=new vo(this,r),this.menuSession.cam.radius=60,this.menuSession.cam.height=24,this.menuSession.start()}stopMenuBackground(){this.menuSession&&(this.menuSession.dispose(),this.menuSession=null)}matchConfig({homeClub:t,awayClub:e,human:n,humanSide:s=0,seed:r=1,halfLength:o,difficulty:a,strengths:l}){let c=lo(t,e),h=Mo(t,{human:s===0?n:null,strength:l&&l[0]}),d=Mo(e,{human:s===1?n:null,strength:l&&l[1]});return{kits:c,match:{seed:r,halfLength:o||Al[this.settings.matchLength]||180,difficulty:a||this.settings.difficulty,teams:[h,d]}}}startSession(t){return this.stopMenuBackground(),this.session&&this.session.dispose(),this.screens.clear(),this.session=new vo(this,t),this.hud.show(!0),this.session.start(),this.paused=!0,this.session.setPaused(!0),this.input.active=!0,this.screens.clickToPlay(),this.session}endSession(){this.session&&this.session.dispose(),this.session=null,this.paused=!1,this.input.active=!1,this.input.exitLock(),this.hud.show(!1),this.startMenuBackground()}startQuickMatch(t){let e=ie(t.home)||Kn[0],n=ie(t.away)||Kn[1],s=this.store.career,r={...s?s.player:Sr()};t.role&&(r.role=t.role);let o=t.side||0,a=this.params.get("seed")?Number(this.params.get("seed")):(Date.now()&65535)+1,l=this.matchConfig({homeClub:e,awayClub:n,human:r,humanSide:o,seed:a,halfLength:t.halfLength}),c=t.venue||On(e.tier).venue;return this.startSession({mode:"quick",venue:c,venueOpts:{homeName:e.name},colours:{kits:l.kits,human:r.look},match:l.match,onEnd:h=>this.screens.report(h,{quick:!0})})}startTraining(t){return this.screens.startDrill(t)}playCareerMatch(){let t=this.store.career,e=Qp(t);if(!e)return;let n=e.fx,s=ie(n.home),r=ie(n.away),o=n.home===t.clubId?0:1,a={...t.player},l=this.matchConfig({homeClub:s,awayClub:r,human:a,humanSide:o,seed:fi(`${t.seed}:${t.seasonNo}:${n.round}:${e.id}`),halfLength:this.testHalf}),c=n.final?"continental":On(s.tier).venue,h=e.id;return this.startSession({mode:"career",venue:c,venueOpts:{homeName:s.name,final:!!n.final},final:n.final?n.name:null,title:n.final?`${n.name}: ${s.name} v ${r.name}`:`${On(s.tier).league} \xB7 Round ${n.round}: ${s.name} v ${r.name}`,colours:{kits:l.kits,human:a.look},match:l.match,onEnd:d=>this.screens.report(d,{career:!0,matchId:h,fx:n,title:n.final?"Continental Cup Final":`Round ${n.round} report`})})}togglePause(){if(!this.session){this.screens.back();return}this.paused?this.resume():this.pause()}pause(){!this.session||this.session.ended||(this.paused=!0,this.session.setPaused(!0),this.input.releaseAll(),this.input.exitLock(),this.audio.suspend(),this.screens.pauseMenu())}resume(){if(!this.session)return;if(this.input.active=!0,this.input.dragMode||this.input.locked){this.unpause();return}if(this.screens.clear(),this.awaitingLock=!0,!this.input.requestLock()){this.awaitingLock=!1,this.unpause();return}clearTimeout(this.lockTimer),this.lockTimer=setTimeout(()=>{this.awaitingLock&&!this.input.locked&&(this.awaitingLock=!1,this.screens.lockRefused())},1500)}unpause(){this.awaitingLock=!1,this.screens.clear(),this.paused=!1,this.session&&this.session.setPaused(!1),this.audio.resume()}onBlur(){this.audio.setMuted(!0),this.session&&!this.paused&&!this.session.ended&&this.pause()}onFocus(){this.audio.setMuted(!1),this.paused&&this.audio.suspend()}applySettings(){let t=this.settings;if(this.input.sensitivity=t.sensitivity,this.input.invertY=t.invertY,this.audio.setVolumes({master:t.master,sfx:t.sfx,crowd:t.crowd}),this.view.quality!==t.quality){this.view.setQuality(t.quality),this.view.venueKey=null;let e=this.session||this.menuSession;e&&this.view.setVenue(e.cfg.venue,e.cfg.venueOpts||{})}kp(t)||this.screens.toast("Settings could not be saved (storage unavailable).",!0)}setStyle(t){this.style=t,this.view.setStyle(t),Bp(t)}};function dm(){try{new Iu}catch(i){console.error(i);let t=document.getElementById("boot");t&&(t.textContent="First Touch could not start: "+i.message+" (a browser with WebGL2 is required).")}}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",dm):dm();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
