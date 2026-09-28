// Deterministic first-person action screenshots (sim advanced by fixed steps).
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const OUT = 'tests/out';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.setDefaultTimeout(120000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.mouse.move(480, 270);
await page.goto(`http://localhost:8080/index.html?auto=practice&style=${process.argv[2] || 'classic'}`);
await page.waitForTimeout(1500);
await page.mouse.click(480, 270);
await page.waitForTimeout(400);
const ev = (fn, a) => page.evaluate(fn, a);
const snap = async (name) => { await page.waitForTimeout(250); await page.screenshot({ path: `${OUT}/${name}.png` }); };
// freeze real-time stepping; drive the sim manually
await ev(() => { const s = window.__ft.session; s.paused = true; const h = s.human; h.yaw = Math.PI / 2; h.prevYaw = h.yaw; s.cam.yaw = h.yaw; s.cam.pitch = -0.62; s.ctl.input.yaw = h.yaw; s.ctl.input.pitch = -0.62; window.__ft.debugStep(30); });
await snap('fp_ball');
const pressStep = (btn, steps, release = true) => ev(({ btn, steps, release }) => { const s = window.__ft.session; s.ctl.press(btn); if (btn === 'shoot') s.ctl.input.lmb = true; if (release) { window.__ft.debugStep(2); s.ctl.release(btn); s.ctl.input.lmb = false; } window.__ft.debugStep(steps); return { a: s.human.action && { t: s.human.action.type, k: s.human.action.kind, c: s.human.action.contacted, t2: +s.human.action.t.toFixed(3) }, ball: s.match.ball.speed.toFixed(1) }; }, { btn, steps, release });
// look at teammate and pass: windup, contact, follow-through
await ev(() => { const s = window.__ft.session; const mate = s.match.teams[0].players.find((p) => !p.isHuman); const h = s.human; const y = Math.atan2(mate.pos.x - h.pos.x, mate.pos.z - h.pos.z); s.cam.yaw = y; s.ctl.input.yaw = y; window.__ft.debugStep(40); s.cam.pitch = -0.55; s.ctl.input.pitch = -0.55; });
console.log('pass windup', JSON.stringify(await pressStep('pass', 6)));
await snap('fp_pass_windup');
console.log('pass contact', JSON.stringify(await pressStep('none', 5, false)));
await snap('fp_pass_contact');
console.log('pass follow', JSON.stringify(await pressStep('none', 14, false)));
await snap('fp_pass_follow');
// slide
await ev(() => { const s = window.__ft.session; s.cam.pitch = -0.2; s.ctl.input.pitch = -0.2; window.__ft.debugStep(120); });
console.log('slide', JSON.stringify(await pressStep('slide', 30, false)));
for (let i = 0; i < 12; i++) await ev(() => { window.__ft.session.frame(1 / 60); });
await snap('fp_slide');
console.log(errors.length ? errors.join('\n') : 'no errors');
await browser.close();
