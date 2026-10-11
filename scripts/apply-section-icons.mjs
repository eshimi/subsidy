// 静的な記事ページ（public/*.html など）の見出しに、アイコンを入れる。使い方：node scripts/apply-section-icons.mjs
// 生成ページは build-*.mjs（shell）が同じ処理をするので、ここは手で作られたページの分。何度実行しても同じ結果になる。
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { addSectionIcons } from './lib/section-icons.mjs';

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
  const rel = relative(ROOT, file);
  const prefix = '../'.repeat(rel.split('/').length - 1);
  const src = readFileSync(file, 'utf-8');
  const next = addSectionIcons(src, prefix);
  if (next !== src) { writeFileSync(file, next); changed++; }
}
console.log(`見出しにアイコンを入れたページ：${changed} 件`);
