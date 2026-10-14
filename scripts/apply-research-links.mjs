// 「補助金データ」のリサーチデータへの案内を、関係するページの「関連ページ」に入れる（何度実行しても同じ結果）。
//  ・個人向けの解説（personal/*.html）→ 個人向けリサーチデータ
//  ・事業者向けの対象者別ガイド（who/sme・sole-proprietor・startup）→ 事業向けリサーチデータ
// 「補助金を探す・調べる」の組に入れる（組がなければ作る）。使い方：node scripts/apply-research-links.mjs
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const GROUP = '補助金を探す・調べる';
const PERSONAL = ['../research/personal.html', '個人向けリサーチデータ（件数・金額・締切）'];
const BUSINESS = ['../research/business.html', '事業向けリサーチデータ（種類・金額・締切・地域）'];

export const TARGETS = () => [
  ...readdirSync(join(ROOT, 'personal')).filter((f) => f.endsWith('.html') && f !== 'index.html').map((f) => [`personal/${f}`, PERSONAL]),
  ...['sme', 'sole-proprietor', 'startup'].map((f) => [`who/${f}.html`, BUSINESS]),
];

export function addLink(html, [href, label]) {
  if (html.includes(`href="${href}"`)) return html;
  const li = `<li><a href="${href}">${label}</a></li>`;
  return html.replace(/(<nav class="related-links" aria-label="関連ページ">[\s\S]*?)(<\/nav>)/, (m, head, close) => {
    const g = head.indexOf(`<h3 class="rl-group">${GROUP}</h3>`);
    if (g >= 0) {
      const end = head.indexOf('</ul>', g);
      return `${head.slice(0, end)}  ${li}\n      ${head.slice(end)}${close}`;
    }
    if (head.includes('rl-group')) return `${head}      <h3 class="rl-group">${GROUP}</h3>\n      <ul>\n        ${li}\n      </ul>\n    ${close}`;
    // 組に分かれていない一覧：リストの最後に足す
    const end = head.lastIndexOf('</ul>');
    return end < 0 ? m : `${head.slice(0, end)}  ${li}\n      ${head.slice(end)}${close}`;
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  let changed = 0;
  for (const [rel, link] of TARGETS()) {
    const file = join(ROOT, rel);
    if (!existsSync(file)) continue;
    const before = readFileSync(file, 'utf-8');
    const after = addLink(before, link);
    if (after !== before) { writeFileSync(file, after); changed++; }
  }
  console.log(`リサーチデータへの案内を入れたページ：${changed} ページ`);
}
