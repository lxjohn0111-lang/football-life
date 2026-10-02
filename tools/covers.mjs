// Renders the three CrazyGames cover images from the game's own 3D scene, with only the
// game's title on them (as the cover rules ask): landscape 1920x1080, portrait 800x1200,
// square 800x800, into crazygames/covers/. Needs Playwright with Chromium (dev only).
// Usage: node tools/covers.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'crazygames/covers');
fs.mkdirSync(outDir, { recursive: true });
const url = pathToFileURL(path.join(root, 'index.html')).href;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--allow-file-access-from-files'] });

// [name, width, height, camera (behind / beside / height relative to you, look distance and height, lens), title placement]
const SHOTS = [
  ['landscape-1920x1080', 1920, 1080, { back: 4.2, side: 2.3, up: 1.25, look: 7, fov: 64 }, 'land'],
  ['portrait-800x1200', 800, 1200, { back: 2.3, side: 0.9, up: 0.95, look: 7, lookY: 2.2, fov: 74 }, 'port'],
  ['square-800x800', 800, 800, { back: 3.9, side: 1.9, up: 1.15, look: 7, fov: 70 }, 'square'],
];

for (const [name, w, h, cam, layout] of SHOTS) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  page.setDefaultTimeout(300000);
  await page.addInitScript(() => { localStorage.setItem('firsttouch.tutorial', 'done'); localStorage.setItem('firsttouch.settings.v1', JSON.stringify({ rev: 3, quality: 'high' })); });
  await page.goto(`${url}?auto=quick&home=liverpool&away=chelsea&venue=premier&style=neo&seed=21`);
  await page.waitForFunction(() => window.__ft && window.__ft.session, null, { timeout: 60000 });
  // you, sprinting at goal with the ball at your feet, a defender closing in, the keeper set
  await page.evaluate((cam) => {
    const a = window.__ft;
    a.loop = () => {};
    a.view.noDraw = true;
    a.screens.clear(); a.hud.show(false); a.unpause();
    const v = a.view, s = a.session, m = s.match, h = s.human;
    v.firstPerson = false; v.hideHead = false;
    let n = 0; while (m.phase !== 'playing' && n++ < 4000) m.step(1 / 120);
    const dir = m.attackDir(h.team), gx = dir * 32;
    const place = (p, x, z, yaw) => { p.pos.set(x, 0, z); p.prevPos.copy(p.pos); p.vel.set(0, 0, 0); p.action = null; p.yaw = yaw; p.prevYaw = yaw; };
    // everyone else well out of the picture and still
    m.players.forEach((p, i) => { p.scripted = true; place(p, -dir * 22 + (i % 4) * 3, -14 + i * 2, 0); });
    const start = [gx - dir * 21, 2.5], run = Math.atan2(gx - start[0], 0.6 - start[1]);
    place(h, start[0], start[1], run);
    const def = m.teams[1 - h.team].players.find((p) => !p.isGK);
    place(def, gx - dir * 11, -2.2, run + Math.PI * 0.8); def.scripted = false;
    const gk = m.teams[1 - h.team].players.find((p) => p.isGK);
    place(gk, gx - dir * 1.2, 0.3, run + Math.PI); gk.scripted = false;
    const mate = m.teams[h.team].players.find((p) => !p.isGK && p !== h);
    place(mate, start[0] - dir * 1, 10, run - 0.2); mate.scripted = false;
    if (m.ball.owner) m.loseControl('loose');
    m.ball.place(h.pos.x + Math.sin(run) * 0.5, h.pos.z + Math.cos(run) * 0.5); m.ball.state = 'free';
    s.cam.yaw = run; s.cam.pitch = -0.1;
    a.input.keys.add('KeyW'); a.input.keys.add('ShiftLeft');
    for (let i = 0; i < 34; i++) s.frame(1 / 30);
    a.input.keys.clear();
    const fx = Math.sin(h.yaw), fz = Math.cos(h.yaw);
    const sx = Math.cos(h.yaw), sz = -Math.sin(h.yaw);
    a.debugCam = {
      pos: [h.pos.x - fx * cam.back + sx * cam.side, cam.up, h.pos.z - fz * cam.back + sz * cam.side],
      look: [h.pos.x + fx * cam.look, cam.lookY ?? 1.0, h.pos.z + fz * cam.look],
      fov: cam.fov,
    };
    // no words on a cover but the title: blank the advertising boards and the scoreboard
    v.atlas.ctx.clearRect(0, 108, 1024, 916); v.atlas.texture.needsUpdate = true;
    for (const o of v.venueObjs) if (o.material === v.screenMat) o.visible = false;
    v.crowdLevel = 1;
    v.noDraw = false;
    s.paused = true; // freeze the moment
    s.frame(0);
  }, cam);
  // the title, the only text on a cover
  await page.evaluate((layout) => {
    const d = document.createElement('div');
    const pos = { land: 'left:6%;bottom:9%;text-align:left', port: 'left:0;right:0;top:7%;text-align:center', square: 'left:0;right:0;top:7%;text-align:center' }[layout];
    const size = { land: 190, port: 150, square: 138 }[layout];
    d.style.cssText = `position:fixed;${pos};z-index:99;font:900 ${size}px/0.86 "Arial Rounded MT Bold","Arial Black","DejaVu Sans",sans-serif;letter-spacing:-2px;text-transform:uppercase;color:#fff;-webkit-text-stroke:${Math.round(size / 22)}px #070b1d;paint-order:stroke fill;text-shadow:0 ${Math.round(size / 14)}px 0 #070b1d,0 0 60px rgba(0,0,0,0.45)`;
    d.innerHTML = 'First<br><span style="color:#ffc61a">Touch</span>';
    document.body.appendChild(d);
    // a soft darkening behind the title so it reads on any background
    const g = document.createElement('div');
    g.style.cssText = `position:fixed;inset:0;z-index:98;pointer-events:none;background:${layout === 'land' ? 'linear-gradient(20deg,rgba(7,11,29,0.55),rgba(7,11,29,0) 55%)' : 'linear-gradient(180deg,rgba(7,11,29,0.55),rgba(7,11,29,0) 45%)'}`;
    document.body.appendChild(g);
  }, layout);
  await page.waitForTimeout(500);
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, timeout: 300000 });
  console.log(`crazygames/covers/${name}.png`);
  await page.close();
}
await browser.close();
