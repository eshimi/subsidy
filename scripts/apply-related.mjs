// 静的ページの「関連ページ」を、行き先の種類（活用事例・制度の解説・基礎知識…）で分けて表示する形にそろえる。何度実行しても同じ結果になる。
// 使い方：node scripts/apply-related.mjs（public/grants/ は build-grant-pages.mjs が生成するので対象外）
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { groupRelated } from './lib/side-layout.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (p !== join(ROOT, 'grants')) walk(p, out);
    } else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).split('\\').join('/');
  const before = readFileSync(file, 'utf-8');
  const after = before.replace(/<nav class="related-links" aria-label="関連ページ">[\s\S]*?<\/nav>/g, (nav) => groupRelated(nav, rel));
  if (after !== before) { writeFileSync(file, after); changed++; }
}
console.log(`関連ページを分類: ${changed} ファイル`);
