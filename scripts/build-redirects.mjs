// 都道府県別・目的別・業種別などの一覧ページを検索結果ページ（search.html）に、個人向けの入口をAI補助金判定（hantei.html）に転送する設定（public/_redirects）を作る。
// Cloudflare の静的アセットの転送（301）として動く。使い方：node scripts/build-redirects.mjs
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PREFECTURES, PREF_SLUGS } from '../src/data/prefectures.js';

export const PURPOSE_SLUGS = ['equipment', 'digital', 'sales', 'hiring', 'green', 'research', 'succession', 'startup', 'region'];
export const INDUSTRY_SLUGS = ['food', 'retail', 'beauty', 'construction', 'manufacturing', 'it', 'tourism', 'agriculture', 'care'];

export const AMAZON_TAG = 'eshimi-22';

export function redirectRules() {
  const rules = [
    ['/grants/index.html', '/search.html'],
    ['/grants/deadlines.html', '/search.html?within=90&sort=end'],
    ['/personal/index.html', '/hantei.html?for=personal'],
    ['/personal/', '/hantei.html?for=personal'],
    ['/personal', '/hantei.html?for=personal'],
    // 分析レポートは、事業向け・個人向けの2ページに分けた
    ['/research/analysis.html', '/research/business.html'],
  ];
  for (const pref of PREFECTURES) rules.push([`/grants/pref-${PREF_SLUGS[pref]}.html`, `/search.html?pref=${encodeURIComponent(pref)}`]);
  for (const s of PURPOSE_SLUGS) rules.push([`/grants/purpose-${s}.html`, `/search.html?purpose=${s}`]);
  for (const s of INDUSTRY_SLUGS) rules.push([`/grants/industry-${s}.html`, `/search.html?industry=${s}`]);
  // 書籍ページのAmazonへのリンク：サイト内のアドレス（/go/book/ASIN）から、アフィリエイトのタグ付きで転送する（302）
  rules.push(['/go/book/:asin', `https://www.amazon.co.jp/dp/:asin?tag=${AMAZON_TAG}`, 302]);
  return rules;
}

export function redirectsText() {
  return [
    '# 一覧ページを検索結果ページに転送する（scripts/build-redirects.mjs が作る。手で編集しない）',
    ...redirectRules().map(([from, to, code = 301]) => `${from} ${to} ${code}`),
    '',
  ].join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', '_redirects');
  writeFileSync(out, redirectsText());
  console.log(`転送設定を作成: ${redirectRules().length} 件`);
}
