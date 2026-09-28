// Browser scenarios with screenshots: node tests/browser.mjs [scenario...]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const OUT = 'tests/out';
const which = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errors = [];
async function open(q, w = 1280, h = 720) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  page.setDefaultTimeout(120000);
  page.on('pageerror', (e) => errors.push(`${q}: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`${q}: console ${m.text()}`); });
  await page.mouse.move(640, 360);
  await page.goto(`http://localhost:8080/index.html?${q}`);
  await page.waitForTimeout(1200);
  return page;
}
const ev = (page, fn, arg) => page.evaluate(fn, arg);
async function startPlay(page) {
  await page.mouse.click(640, 360);
  await page.waitForTimeout(300);
  await ev(page, () => { const s = window.__ft.session; s.cam.yaw = s.human ? s.human.yaw : 0; s.cam.pitch = -0.14; });
}
const S = {
  async venues() {
    const page = await open('');
    for (const v of ['community', 'town', 'regional', 'premier', 'continental', 'training']) {
      await ev(page, (v) => { const a = window.__ft; a.view.setVenue(v, { homeName: 'Millbrook Rovers', final: v === 'continental' }); a.debugCam = { pos: [-52, 20, 44], look: [0, 0, 0] }; a.screens.clear(); }, v);
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${OUT}/venue_${v}.png` });
      const st = await ev(page, () => window.__ft.view.stats());
      console.log(v, JSON.stringify(st));
    }
    await ev(page, () => { window.__ft.setStyle('neo'); });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/venue_training_neo.png` });
    await ev(page, () => { const a = window.__ft; a.view.setVenue('premier', { homeName: 'Kingsport Royals' }); a.debugCam = { pos: [-20, 6, 30], look: [8, 0, 0] }; });
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/venue_premier_neo.png` });
    await page.close();
  },
  async menus() {
    const page = await open('');
    await page.screenshot({ path: `${OUT}/menu_classic.png` });
    await ev(page, () => { window.__ft.setStyle('neo'); window.__ft.screens.mainMenu(); });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/menu_neo.png` });
    await ev(page, () => window.__ft.screens.styleMenu());
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/style_menu.png` });
    await ev(page, () => window.__ft.screens.settings());
    await page.screenshot({ path: `${OUT}/settings.png` });
    await ev(page, () => window.__ft.screens.newCareer());
    await page.screenshot({ path: `${OUT}/newcareer.png` });
    await ev(page, () => window.__ft.screens.howTo());
    await page.screenshot({ path: `${OUT}/howto.png` });
    await page.close();
  },
  async play() {
    const page = await open('auto=quick&home=millbrook&away=ashford&role=ST');
    await startPlay(page);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${OUT}/play_kickoff.png` });
    // wait until the human gets the ball, then look down at it
    for (let i = 0; i < 40; i++) {
      const own = await ev(page, () => { const s = window.__ft.session; const m = s.match; if (m.ball.owner === m.human) { s.cam.pitch = -0.55; return true; } s.ctl.press('through'); return false; });
      if (own) break;
      await page.waitForTimeout(500);
    }
    await page.waitForTimeout(150);
    await page.screenshot({ path: `${OUT}/play_ball.png` });
    await ev(page, () => { window.__ft.setStyle('neo'); window.__ft.session.cam.pitch = -0.2; });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${OUT}/play_neo.png` });
    console.log(JSON.stringify(await ev(page, () => ({ calls: window.__ft.view.stats(), t: window.__ft.session.match.displayClock }))));
    await page.close();
  },
  async goal() {
    const page = await open('auto=quick&home=kingsport&away=westmoor&role=ST');
    await startPlay(page);
    // a camera behind the goal, fire a shot into the top corner
    await ev(page, () => {
      const a = window.__ft, m = a.session.match;
      m.phase = 'playing'; m.restart = null;
      a.debugCam = { pos: [22, 2.2, 6], look: [32, 1, 0] };
      m.ball.owner = null; m.ball.state = 'air'; m.ball.place(24, 0); m.ball.state = 'air';
      m.ball.setVelocity({ x: 22, y: 3.2, z: -1.8 }); m.ball.lastTouch = m.human;
      const gk = m.keeper(1); gk.pos.set(31, 0, 2.2);
    });
    await page.waitForTimeout(430);
    await page.screenshot({ path: `${OUT}/goal_net.png` });
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/goal_celebrate.png` });
    await page.close();
  },
};
for (const k of (which.length ? which : Object.keys(S))) { console.log('==', k); await S[k](); }
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no page errors');
await browser.close();
