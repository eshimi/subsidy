// 制度ガイド（自治体）の材料づくりのための、公式ページの取得。対象の一覧（JSON：[{id, url, ...}]）を読み、
// 各ページを curl で取得して、本文（テキスト）を <出力先>/<id>.txt に、HTTP の状態を <id>.code に書く。
// 使い方：node scripts/fetch-program-pages.mjs <一覧.json> <出力先> [並列数]
// （curl を使うのは、この作業環境では、curl だけがプロキシ経由で外に出られるため。本番の GitHub Actions では、通常の fetch でも動く）
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { join } from 'node:path';
import { textOf } from './lib/program-source.mjs';

const run = promisify(execFile);
const [listFile, outDir, par = '8'] = process.argv.slice(2);
if (!listFile || !outDir) { console.error('使い方：node scripts/fetch-program-pages.mjs <一覧.json> <出力先> [並列数]'); process.exit(2); }
mkdirSync(outDir, { recursive: true });
const items = JSON.parse(readFileSync(listFile, 'utf-8'));
const UA = 'Mozilla/5.0 (compatible; hojyokin-net-source-check; +https://hojyokin.net/policy/sources.html)';

async function get(it) {
  const html = join(outDir, `${it.id}.html`);
  let code = '0', type = '';
  for (let i = 0; i < 2 && code === '0'; i++) {
    try {
      const { stdout } = await run('curl', ['-sL', '-m', '45', '--max-filesize', '5000000', '-A', UA, '-o', html, '-w', '%{http_code} %{content_type}', it.url], { maxBuffer: 1 << 20 });
      [code, type = ''] = stdout.trim().split(/ (.*)/s);
    } catch { code = '0'; }
  }
  writeFileSync(join(outDir, `${it.id}.code`), code);
  if (code === '200' && existsSync(html)) writeFileSync(join(outDir, `${it.id}.txt`), textOf(readFileSync(html), type));
  return { id: it.id, code, chars: code === '200' ? readFileSync(join(outDir, `${it.id}.txt`), 'utf-8').length : 0 };
}

let n = 0;
const res = [];
await Promise.all(Array.from({ length: Number(par) }, async () => { while (n < items.length) res.push(await get(items[n++])); }));
const by = {};
for (const r of res) by[r.code] = (by[r.code] || 0) + 1;
console.log(`取得 ${res.length} 件：`, by, `／本文が1000字未満：${res.filter((r) => r.code === '200' && r.chars < 1000).length}件`);
