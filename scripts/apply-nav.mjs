// 静的ページ（public/*.html など）の、上部ナビ・フッターを scripts/lib/nav.mjs の定義に合わせて書き換える。
// 使い方：node scripts/apply-nav.mjs（public/grants/ は build-grant-pages.mjs が生成するので対象外）
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { topnavHtml, footerNavHtml, footerBottomHtml } from './lib/nav.mjs';

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

const replaceOnce = (s, re, fn) => {
  if (!re.test(s)) return s;
  return s.replace(re, fn);
};

let changed = 0;
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).split('\\').join('/');
  const depth = rel.split('/').length - 1;
  const prefix = '../'.repeat(depth);
  const current = rel;
  const before = readFileSync(file, 'utf-8');
  let s = before;
  s = replaceOnce(s, /<nav class="topnav" id="topnav" aria-label="サイト内">[\s\S]*?<\/nav>/, () =>
    `<nav class="topnav" id="topnav" aria-label="サイト内">\n${topnavHtml(prefix, current)}\n      </nav>`);
  s = replaceOnce(s, /<nav class="footer-nav" aria-label="フッター">[\s\S]*?<\/nav>/, () =>
    `<nav class="footer-nav" aria-label="フッター">\n${footerNavHtml(prefix, current)}\n        </nav>`);
  s = replaceOnce(s, /<nav aria-label="補助リンク">[\s\S]*?<\/nav>/, () => footerBottomHtml(prefix));
  if (s !== before) {
    writeFileSync(file, s);
    changed++;
  }
}
console.log(`ナビを更新: ${changed} ファイル`);
