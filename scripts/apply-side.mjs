// 静的ページの右側の列（関連ページ）を、scripts/lib/side-layout.mjs の形に合わせる。
// 使い方：node scripts/apply-side.mjs（public/grants/ は build-grant-pages.mjs が生成するので対象外）
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { splitLayout, groupNav } from './lib/side-layout.mjs';

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
  const s = readFileSync(file, 'utf-8');
  const m = s.match(/(<main class="wrap">)([\s\S]*?)(<\/main>)/);
  if (!m) continue;
  // すでに右側の列があり、カテゴリのリンク（関連ページでないもの）なら、今のメニューの内容に入れ替える
  if (m[2].includes('page-split')) {
    const aside = m[2].match(/<aside class="page-side"[^>]*>([\s\S]*?)<\/aside>/);
    const OLD = /aria-label="(はじめの一歩|お役立ち情報|補助金を探す|制度を見る|サイトについて|制度ガイド・基礎知識|対象者別・ツール)"/;
    if (aside && OLD.test(aside[1]) && !/関連ページ|他の記事/.test(aside[1])) {
      const nav = groupNav(rel);
      if (nav) {
        const replaced = s.replace(aside[1], `\n${nav}\n`);
        if (replaced !== s) { writeFileSync(file, replaced); changed++; }
      }
    }
    continue;
  }
  const next = splitLayout(m[2], rel);
  if (next === null) continue;
  writeFileSync(file, s.replace(m[0], `${m[1]}${next}${m[3]}`));
  changed++;
}
console.log(`右側の列を追加: ${changed} ファイル`);
