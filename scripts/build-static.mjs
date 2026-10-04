// GitHub Pages 用の静的サイトを dist/ に書き出す: node scripts/build-static.mjs
import { build } from 'esbuild';
import { mkdir, readFile, rm, writeFile, copyFile, cp } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const out = new URL('dist/', root);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

await build({
  entryPoints: [new URL('static/entry.js', root).pathname],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  minify: true,
  outfile: new URL('app.js', out).pathname,
  logLevel: 'warning',
});

await copyFile(new URL('public/style.css', root), new URL('style.css', out));
await cp(new URL('public/media/', root), new URL('media/', out), { recursive: true });
const html = await readFile(new URL('public/index.html', root), 'utf8');
await writeFile(new URL('index.html', out), html);
// GitHub Pages の Jekyll 処理を無効化
await writeFile(new URL('.nojekyll', out), '');

console.log('dist/ に静的サイトを書き出しました');
