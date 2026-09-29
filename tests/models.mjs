// Close-up screenshots of the 3D models: a line-up of players (two kit designs and
// a keeper) front and back, and the scenery around the community and town grounds.
// Usage: node tests/models.mjs [classic|neo] [home club] [away club] [high|medium|low]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const OUT = 'tests/out';
const style = process.argv[2] || 'classic';
const home = process.argv[3] || 'ashford', away = process.argv[4] || 'harbour';
const quality = process.argv[5] || 'high';
const tag = quality === 'high' ? style : `${style}_${quality}`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.setDefaultTimeout(240000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const ev = (fn, a) => page.evaluate(fn, a);
// any menu the headless browser triggered (e.g. losing mouse capture) is cleared before each shot
const snap = async (name) => { await ev(() => { const a = window.__ft; a.screens.clear(); a.hud.show(false); a.session.frame(0); }); await page.waitForTimeout(300); await page.screenshot({ path: `${OUT}/model_${name}_${tag}.png` }); };

await page.goto(`http://localhost:8080/index.html?auto=quick&home=${home}&away=${away}&style=${style}&seed=5`);
await page.waitForTimeout(3000);
await page.mouse.click(480, 270);
await page.waitForTimeout(600);
// line up three home players, three away players and a keeper, facing the camera
const info = await ev((quality) => {
  const a = window.__ft, s = a.session, m = s.match;
  if (a.settings.quality !== quality) { a.settings.quality = quality; a.applySettings(); }
  s.paused = true;
  a.hud.show(false);
  const pick = [...m.teams[0].players.filter((p) => !p.isGK && !p.isHuman).slice(0, 3), m.teams[1].players.find((p) => p.isGK), ...m.teams[1].players.filter((p) => !p.isGK).slice(0, 3)];
  pick.forEach((p, i) => { p.pos.set(0, 0, (i - 3) * 1.1); p.prevPos.copy(p.pos); p.vel.set(0, 0, 0); p.yaw = Math.PI / 2; p.prevYaw = p.yaw; p.action = null; });
  // everyone else out of shot
  for (const p of m.players) if (!pick.includes(p)) { p.pos.set(-25, 0, 18); p.prevPos.copy(p.pos); }
  m.ball.place(1.2, -0.6); m.ball.state = 'free';
  window.__lineup = pick.map((p) => p.id);
  const st = a.view.stats();
  return { quality: a.view.quality, calls: st.calls, tris: st.tris, charVerts: a.view.batch.solidGeo.attributes.position.count, charEdges: a.view.batch.edgeGeo.instanceCount };
}, quality);
console.log('characters:', JSON.stringify(info));
await ev(() => { window.__ft.debugCam = { pos: [4.2, 1.35, 0], look: [0, 1.0, 0] }; });
await snap('lineup_front');
await ev(() => { window.__ft.debugCam = { pos: [1.35, 1.62, -1.1], look: [0, 1.45, -1.1] }; });
await snap('face');
await ev(() => { window.__ft.debugCam = { pos: [-3.6, 1.3, 0.4], look: [0, 1.1, 0.4] }; });
await snap('lineup_back');
await ev(() => { window.__ft.debugCam = { pos: [1.2, 0.35, -2.4], look: [0, 0.12, -3.3] }; });
await snap('boots');
// scenery: community ground and town stadium surroundings
for (const [venue, cam, name] of [
  ['community', { pos: [-20, 7, 36], look: [-10, 3, 50] }, 'houses'],
  ['community', { pos: [30, 3, 24], look: [52, 4, 38] }, 'trees'],
  ['community', { pos: [-60, 26, -64], look: [0, 0, 0] }, 'ground'],
  ['town', { pos: [30, 8, 20], look: [44, 12, -34] }, 'floodlight'],
  ['town', { pos: [0, 4, 18], look: [0, 3, -32] }, 'stand'],
]) {
  await ev(({ venue, cam }) => { const a = window.__ft; a.view.setVenue(venue, { homeName: 'Millbrook Rovers' }); a.debugCam = cam; }, { venue, cam });
  await page.waitForTimeout(600);
  await snap(name);
}
const vs = await ev(() => { const v = window.__ft.view.venue; return { people: v.people, verts: v.vertCount, edges: v.edgeCount }; });
console.log('town venue:', JSON.stringify(vs));
console.log(errors.length ? errors.join('\n') : 'no errors');
await browser.close();
