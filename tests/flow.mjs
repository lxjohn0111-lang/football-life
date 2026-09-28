// End-to-end UI flow: new career -> hub -> play (short) match -> report -> hub; pause/resume; styles.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const OUT = 'tests/out';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await ctx.newPage();
page.setDefaultTimeout(120000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message + '\n' + e.stack));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await page.mouse.move(640, 360);
await page.goto('http://localhost:8080/index.html?half=6');
await page.waitForTimeout(1500);
const clickText = async (t) => { await page.getByText(t, { exact: false }).first().click(); await page.waitForTimeout(400); };
await clickText('New Career');
await page.fill('#nc-name', 'Robin Tester');
await page.click('#nc-pos [data-pos="CM"]');
await page.screenshot({ path: `${OUT}/flow_create.png` });
await clickText('Sign your first contract');
await page.screenshot({ path: `${OUT}/flow_hub.png` });
await clickText('Play Match');
await page.waitForTimeout(500);
await page.mouse.click(640, 360); // click to play
await page.waitForTimeout(500);
// pause with Escape, check menu, resume
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/flow_pause.png` });
const pausedMenu = await page.getByText('Match Statistics').count();
await clickText('Resume');
await page.waitForTimeout(300);
// fast-forward the match deterministically
await page.evaluate(() => { const a = window.__ft; let n = 0; while (a.session && a.session.match.phase !== 'fulltime' && n < 120 * 200) { a.session.match.step(1 / 120); n++; } });
await page.waitForTimeout(4000);
await page.screenshot({ path: `${OUT}/flow_report.png` });
const hasReport = await page.getByText('MATCH RATING').count();
// open the report twice must not double commit
const before = await page.evaluate(() => window.__ft.store.career.totals.apps);
await page.evaluate(() => { const a = window.__ft; if (a.session) a.screens.report(a.session, { career: true, matchId: 'x', fx: a.store.career.season.fixtures[0] }); });
const after = await page.evaluate(() => window.__ft.store.career.totals.apps);
await clickText('Continue to Career Hub');
await page.screenshot({ path: `${OUT}/flow_hub2.png` });
const round = await page.evaluate(() => window.__ft.store.career.season.round);
console.log({ pausedMenu, hasReport, appsBefore: before, appsAfterReopen: after, round });
// style menu previews
await page.evaluate(() => window.__ft.screens.styleMenu());
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/flow_style.png` });
// reload: career persists
await page.reload();
await page.waitForTimeout(1500);
const cont = await page.getByText('Continue Career').count();
console.log({ continueAfterReload: cont });
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no errors');
await browser.close();
