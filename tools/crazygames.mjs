// Builds the CrazyGames upload folder:
//   crazygames/upload/index.html   the game page with the CrazyGames SDK v3 script
//   crazygames/upload/game.js      the bundled, minified game (same as dist/game.js)
//   crazygames/first-touch-crazygames.zip   both files at the zip's root, ready to upload
// Usage: npm run crazygames   (rebuilds dist/game.js first)
// The cover images in crazygames/covers are made separately: node tools/covers.mjs
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'crazygames');
const up = path.join(out, 'upload');

execFileSync(process.execPath, [path.join(root, 'tools/build.mjs')], { stdio: 'inherit' });
fs.mkdirSync(up, { recursive: true });

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>First Touch</title>
<style>
  html, body { margin: 0; height: 100%; background: #0e1430; overflow: hidden; overscroll-behavior: none; -webkit-user-select: none; user-select: none; }
  #game { position: fixed; inset: 0; width: 100%; height: 100%; display: block; }
  #boot { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; font: 900 26px/1.3 "Arial Rounded MT Bold", "Arial Black", system-ui, sans-serif; letter-spacing: 1px; text-transform: uppercase; color: #ffc61a; text-shadow: 0 4px 0 #070b1d; }
</style>
<!-- CrazyGames HTML5 SDK v3: initialised by the game before it loads anything -->
<script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>
</head>
<body>
<canvas id="game"></canvas>
<div id="ui"></div>
<div id="boot">Loading&hellip;</div>
<script src="game.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(up, 'index.html'), html);
fs.copyFileSync(path.join(root, 'dist/game.js'), path.join(up, 'game.js'));

// a plain zip (deflate) with the files at its root, no folder around them
const crcTable = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = (buf) => { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function zip(files) {
  const parts = [], central = [];
  let offset = 0;
  const d = new Date(), time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  for (const [name, data] of files) {
    const nameBuf = Buffer.from(name), comp = zlib.deflateRawSync(data, { level: 9 }), crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0, 6); local.writeUInt16LE(8, 8);
    local.writeUInt16LE(time, 10); local.writeUInt16LE(date, 12); local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(comp.length, 18); local.writeUInt32LE(data.length, 22); local.writeUInt16LE(nameBuf.length, 26); local.writeUInt16LE(0, 28);
    parts.push(local, nameBuf, comp);
    const cen = Buffer.alloc(46);
    cen.writeUInt32LE(0x02014b50, 0); cen.writeUInt16LE(20, 4); cen.writeUInt16LE(20, 6); cen.writeUInt16LE(0, 8); cen.writeUInt16LE(8, 10);
    cen.writeUInt16LE(time, 12); cen.writeUInt16LE(date, 14); cen.writeUInt32LE(crc, 16); cen.writeUInt32LE(comp.length, 20); cen.writeUInt32LE(data.length, 24);
    cen.writeUInt16LE(nameBuf.length, 28); cen.writeUInt32LE(0, 30); cen.writeUInt16LE(0, 34); cen.writeUInt16LE(0, 36); cen.writeUInt32LE(0, 38); cen.writeUInt32LE(offset, 42);
    central.push(cen, nameBuf);
    offset += 30 + nameBuf.length + comp.length;
  }
  const cenSize = central.reduce((n, b) => n + b.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(cenSize, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...parts, ...central, end]);
}
const files = ['index.html', 'game.js'].map((f) => [f, fs.readFileSync(path.join(up, f))]);
const zipPath = path.join(out, 'first-touch-crazygames.zip');
fs.writeFileSync(zipPath, zip(files));
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
console.log(`crazygames/upload: ${files.map(([f, b]) => `${f} ${kb(b.length)}`).join(', ')}`);
console.log(`crazygames/first-touch-crazygames.zip: ${kb(fs.statSync(zipPath).size)}`);
