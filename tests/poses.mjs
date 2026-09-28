// Third-person pose screenshots driven by deterministic simulation steps.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const OUT = 'tests/out';
const style = process.argv[2] || 'classic';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.setDefaultTimeout(120000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.mouse.move(480, 270);
await page.goto(`http://localhost:8080/index.html?auto=practice&style=${style}`);
await page.waitForTimeout(1500);
await page.mouse.click(480, 270);
await page.waitForTimeout(400);
const ev = (fn, a) => page.evaluate(fn, a);
const snap = async (name) => { await ev(() => window.__ft.session.frame(0)); await page.waitForTimeout(200); await page.screenshot({ path: `${OUT}/${name}_${style}.png` }); };
await ev(() => { const s = window.__ft.session; s.paused = true; const h = s.human; h.pos.set(18, 0, 1); h.prevPos.copy(h.pos); h.yaw = Math.PI / 2; h.prevYaw = h.yaw; s.cam.yaw = h.yaw; s.ctl.input.yaw = h.yaw; const m = s.match; m.ball.place(18.6, 1); m.ball.state = 'free'; window.__ft.debugStep(20); window.__ft.debugCam = { pos: [23, 1.6, 7], look: [19, 0.9, 1] }; });
await snap('pose_stand');
// shot to the far low corner: follow the keeper's dive
await ev(() => { const s = window.__ft.session; s.ctl.input.pitch = Math.atan2(0.4 - 1.65, 14); s.ctl.input.yaw = Math.atan2(14, -1.9 - 1); s.ctl.press('shoot'); s.ctl.input.lmb = true; window.__ft.debugStep(36); s.ctl.release('shoot'); s.ctl.input.lmb = false; window.__ft.debugStep(12); window.__ft.debugCam = { pos: [22, 1.2, 1], look: [19, 0.8, 1] }; });
await snap('pose_shot_follow');
await ev(() => { window.__ft.debugStep(40); window.__ft.debugCam = { pos: [27, 1.6, 9], look: [31.5, 0.8, 0] }; });
await snap('pose_dive');
// net bulge: fire the ball into the top corner of the empty half of the net
await ev(() => { const m = window.__ft.session.match; const gk = m.keeper(1); gk.action = null; gk.pos.set(31, 0, 2.2); m.ball.owner = null; m.ball.place(27, -1); m.ball.state = 'air'; m.ball.pos.y = 1.2; m.ball.setVelocity({ x: 26, y: 1.2, z: -2 }); window.__ft.debugCam = { pos: [36.5, 2.4, -4.5], look: [32.5, 1, -1.2] }; window.__ft.debugStep(24); });
await snap('pose_net');
await ev(() => { window.__ft.debugStep(30); });
await snap('pose_net_settle');
// running gait side view of the teammate
await ev(() => { const s = window.__ft.session; const mate = s.match.teams[0].players.find((p) => !p.isHuman); mate.scripted = true; mate.pos.set(0, 0, 0); mate.prevPos.copy(mate.pos); mate.yaw = Math.PI / 2; for (let i = 0; i < 90; i++) { mate.desired.set(7.5, 0, 0); mate.sprint = true; s.match.step(1 / 120); } window.__ft.debugCam = { pos: [mate.pos.x, 1.1, 6], look: [mate.pos.x, 0.9, 0] }; });
await snap('pose_run');
console.log(errors.length ? errors.join('\n') : 'no errors');
await browser.close();
