// Bundles src/main.js (with the vendored three.js) into one classic script:
// dist/game.js. index.html loads it with a plain <script> tag so the game runs
// by double-clicking index.html (file://), no server needed.
import * as esbuild from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const watch = process.argv.includes('--watch');
const dev = process.argv.includes('--dev');

const opts = {
  entryPoints: [path.join(root, 'src/main.js')],
  bundle: true,
  format: 'iife',
  target: ['es2020'],
  outfile: path.join(root, 'dist/game.js'),
  alias: { three: path.join(root, 'vendor/three/three.module.js') },
  loader: { '.css': 'text' },
  minify: !dev,
  sourcemap: dev ? 'inline' : false,
  legalComments: 'eof',
  logLevel: 'info',
  banner: { js: '/* First Touch - bundled game. three.js is MIT licensed (see vendor/three/LICENSE). */' },
};

if (watch) {
  const ctx = await esbuild.context({ ...opts, minify: false });
  await ctx.watch();
  console.log('watching...');
} else {
  await esbuild.build(opts);
}
