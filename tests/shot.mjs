// Screenshot helper: node tests/shot.mjs <url-query> <out.png> [waitMs] [actions...]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const [q = '', out = 'tests/out/shot.png', wait = '4000', ...acts] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}\n${e.stack}`));
await page.goto(`http://localhost:8080/index.html?${q}`);
await page.waitForTimeout(1500);
for (const a of acts) {
  if (a === 'click') await page.mouse.click(640, 360);
  else if (a.startsWith('wait:')) await page.waitForTimeout(+a.slice(5));
  else if (a.startsWith('eval:')) logs.push('eval: ' + JSON.stringify(await page.evaluate(a.slice(5))));
  else if (a.startsWith('key:')) await page.keyboard.press(a.slice(4));
  else if (a.startsWith('shot:')) await page.screenshot({ path: a.slice(5) });
}
await page.waitForTimeout(+wait);
await page.screenshot({ path: out });
console.log(logs.slice(0, 40).join('\n'));
await browser.close();
