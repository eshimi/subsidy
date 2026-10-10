// 静的ページの見出しを、タイトル用のバナーに変える（scripts/lib/banners.mjs の定義どおり）。
// 使い方：node scripts/apply-banner.mjs（public/grants/ と特集・生成ページは対象外。生成ページは build-*.mjs で反映）
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyBanner } from './lib/banners.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}
let changed = 0;
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).split('\\').join('/');
  const before = readFileSync(file, 'utf-8');
  const after = applyBanner(before, rel);
  if (after !== before) { writeFileSync(file, after); changed++; }
}
console.log(`バナーを適用: ${changed} ファイル`);
