// GitHub Pages 用の静的サイトを dist/ に書き出す: node scripts/build-static.mjs
import { build } from 'esbuild';
import { mkdir, readFile, rm, writeFile, copyFile, cp } from 'node:fs/promises';
import { createHash } from 'node:crypto';

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
// jGrants データ（scripts/fetch-jgrants.mjs で取得済みのとき）
await cp(new URL('public/data/', root), new URL('data/', out), { recursive: true }).catch(() => console.warn('jGrants データがありません（npm run fetch:jgrants で取得できます）'));
// 更新がすぐ反映されるよう、CSS と JS の参照に内容のハッシュを付ける（キャッシュ対策）
const hashOf = async (name) => createHash('sha256').update(await readFile(new URL(name, out))).digest('hex').slice(0, 10);
const html = (await readFile(new URL('public/index.html', root), 'utf8'))
  .replace('href="style.css"', `href="style.css?v=${await hashOf('style.css')}"`)
  .replace('src="app.js"', `src="app.js?v=${await hashOf('app.js')}"`);
await writeFile(new URL('index.html', out), html);
// GitHub Pages の Jekyll 処理を無効化
await writeFile(new URL('.nojekyll', out), '');

console.log('dist/ に静的サイトを書き出しました');
