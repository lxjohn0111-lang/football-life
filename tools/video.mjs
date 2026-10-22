// Records a portrait gameplay video (native portrait, not cropped from landscape): a
// quick match seen through the player's eyes, played by the scripted test bot
// (tests/bot.mjs) through the real controls, with no interface at all. The game itself is
// untouched: the recorder only hides the HTML overlay and the in-world helper rings in
// its own browser page, drives the match frame by frame and screenshots every frame,
// then encodes them with ffmpeg (H.264, no audio track).
//
// It first plays matches without drawing to find a stretch where the player scores, then
// replays that same (deterministic) match and records the chosen seconds.
//
// Usage: node tools/video.mjs [--seconds 20] [--fps 30] [--width 1080] [--height 1920]
//          [--venue premier] [--home liverpool] [--away chelsea] [--style neo]
//          [--seed 1] [--tries 12] [--out crazygames/video/first-touch-portrait.mp4]
// Needs Playwright with Chromium and an ffmpeg with libx264 (FFMPEG=/path/to/ffmpeg).
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as esbuild from 'esbuild';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const SECONDS = Number(arg('seconds', 20)), FPS = Number(arg('fps', 30));
const W = Number(arg('width', 1080)), H = Number(arg('height', 1920));
const VENUE = arg('venue', 'premier'), HOME = arg('home', 'liverpool'), AWAY = arg('away', 'chelsea'), STYLE = arg('style', 'neo');
const SEED0 = Number(arg('seed', 1)), TRIES = Number(arg('tries', 12));
const OUT = path.resolve(root, arg('out', 'crazygames/video/first-touch-portrait.mp4'));
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const FRAMES = SECONDS * FPS;
const STEPS = Math.round(120 / FPS); // fixed 120 Hz simulation steps per video frame

// the scripted player, bundled for the page
const botJs = (await esbuild.build({ entryPoints: [path.join(root, 'tests/bot.mjs')], bundle: true, format: 'iife', globalName: 'BotLib', write: false })).outputFiles[0].text;

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--allow-file-access-from-files'] });

async function openMatch(seed) {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.setDefaultTimeout(600000);
  await page.addInitScript(() => {
    localStorage.setItem('firsttouch.tutorial', 'done');
    localStorage.setItem('firsttouch.settings.v1', JSON.stringify({ rev: 3, quality: 'high', touch: 'off', replays: false }));
  });
  const url = `${pathToFileURL(path.join(root, 'index.html')).href}?auto=quick&home=${HOME}&away=${AWAY}&venue=${VENUE}&style=${STYLE}&role=ST&seed=${seed}&half=300&noreplay&nofs`;
  await page.goto(url);
  await page.waitForFunction(() => window.__ft && window.__ft.session, null, { timeout: 120000 });
  await page.addScriptTag({ content: botJs });
  // recorder-only setup: no HTML overlay, no helper rings, the match driven by hand
  await page.addStyleTag({ content: '#ui { display: none !important; }' });
  await page.evaluate(({ STEPS, FPS }) => {
    const a = window.__ft, s = a.session, m = s.match, v = a.view;
    a.loop = () => {};
    a.screens.clear();
    v.markers.group.visible = false;
    s.paused = true; // the session only draws; the recorder steps the simulation itself
    const bot = new window.BotLib.Bot(m, s.ctl);
    const wrap = (x) => { while (x > Math.PI) x -= Math.PI * 2; while (x < -Math.PI) x += Math.PI * 2; return x; };
    const rec = { frame: 0, kicks: [], goals: [] };
    m.events.on('kick', (e) => { if (e.player === m.human) rec.kicks.push({ f: rec.frame, kind: e.kind }); });
    m.events.on('goal', (e) => rec.goals.push({ f: rec.frame, team: e.team, mine: e.team === m.human.team, scorer: e.scorer === m.human }));
    window.__rec = rec;
    // one video frame: the bot plays through the real controls, the camera follows its
    // look like a hand on a mouse would (smoothly)
    window.__advance = (draw) => {
      for (let i = 0; i < STEPS; i++) { bot.update(); m.step(1 / 120); }
      const ci = s.ctl.input, k = 1 - Math.exp(-12 / FPS);
      s.cam.yaw += wrap(ci.yaw - s.cam.yaw) * k;
      s.cam.pitch += (ci.pitch - s.cam.pitch) * k;
      v.noDraw = !draw;
      s.frame(1 / FPS);
      rec.frame++;
    };
    s.cam.yaw = s.ctl.input.yaw = m.human.yaw;
  }, { STEPS, FPS });
  return page;
}

// 1) find a stretch with a goal by the player (no drawing: fast)
let pick = null;
for (let t = 0; t < TRIES && !pick; t++) {
  const seed = SEED0 + t;
  const page = await openMatch(seed);
  const total = 60 * FPS * 3; // the first three minutes of play
  const r = await page.evaluate((total) => { for (let i = 0; i < total; i++) window.__advance(false); return window.__rec; }, total);
  await page.close();
  console.log(`seed ${seed}: ${r.kicks.length} kicks by the player, goals ${r.goals.map((g) => `${g.scorer ? 'player' : g.mine ? 'team' : 'opp'}@${(g.f / FPS).toFixed(1)}s`).join(' ') || 'none'}`);
  // a goal by the player near the end of the clip (3.5 s of celebration after it), no
  // other goal before it in the clip, and as much of the player's own play as possible
  for (const g of r.goals) {
    if (!g.scorer) continue;
    const end = Math.min(total, g.f + Math.round(3.5 * FPS)), start = end - FRAMES;
    if (start < FPS || r.goals.some((o) => o !== g && o.f >= start && o.f < g.f)) continue;
    const kicks = r.kicks.filter((k) => k.f >= start && k.f < end).length;
    if (!pick || kicks > pick.kicks) pick = { seed, start, end, goal: g.f, kicks };
  }
}
if (!pick) { console.error('no goal by the player found; try more --tries or another --seed'); process.exit(1); }
console.log(`recording seed ${pick.seed}, ${(pick.start / FPS).toFixed(1)}s to ${(pick.end / FPS).toFixed(1)}s (goal at ${(pick.goal / FPS).toFixed(1)}s, ${pick.kicks} of the player's kicks in shot)`);

// 2) replay the same match and record the stretch
fs.mkdirSync(path.dirname(OUT), { recursive: true });
const tmp = fs.mkdtempSync(path.join(path.dirname(OUT), '.frames-'));
const page = await openMatch(pick.seed);
const warm = Math.max(0, pick.start - 20);
await page.evaluate((n) => { for (let i = 0; i < n; i++) window.__advance(false); }, warm);
for (let f = warm; f < pick.start; f++) await page.evaluate(() => window.__advance(true)); // camera settles
const t0 = Date.now();
for (let f = 0; f < FRAMES; f++) {
  await page.evaluate(() => window.__advance(true));
  await page.screenshot({ path: path.join(tmp, `f_${String(f).padStart(4, '0')}.png`) });
  if (f % 30 === 29) console.log(`frame ${f + 1}/${FRAMES} (${((Date.now() - t0) / (f + 1) / 1000).toFixed(2)} s per frame)`);
}
await browser.close();

// 3) encode: H.264, yuv420p for every player, no audio track
fs.mkdirSync(path.dirname(OUT), { recursive: true });
execFileSync(FFMPEG, ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(tmp, 'f_%04d.png'),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', OUT], { stdio: 'inherit' });
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`${path.relative(root, OUT)}: ${W}x${H}, ${SECONDS} s at ${FPS} fps, no audio, ${(fs.statSync(OUT).size / 1048576).toFixed(1)} MB`);
