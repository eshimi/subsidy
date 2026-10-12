// トップページの数字（掲載している補助金・支援制度、自治体の独自制度、市区町村、解説記事・ガイド）を、実際のデータから更新する。
// 補助金・支援制度の数は、検索ページが使う grants/search.json の件数と同じ（検索ページの「○件」と合わせる）。
// 使い方：node scripts/update-stats.mjs（記事を追加したとき、またはデプロイ時に実行）
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MUNICIPALITY_COUNT } from '../src/data/prefectures.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const FOLDERS = ['feature', 'basics', 'who', 'personal', 'cases', 'columns', 'guides', 'compare'];
const SINGLES = ['roadmap.html', 'beginner-guide.html', 'real-life.html'];

export function countArticles(root = ROOT) {
  let n = SINGLES.filter((f) => existsSync(join(root, f))).length;
  for (const d of FOLDERS) {
    const dir = join(root, d);
    if (!existsSync(dir)) continue;
    n += readdirSync(dir).filter((f) => f.endsWith('.html') && f !== 'index.html').length;
  }
  return n;
}

export function withArticleCount(html, n) {
  const shown = Math.max(10, Math.floor(n / 10) * 10);
  return html.replace(/(<dd id="r-articles">)\d+(<small>本以上<\/small><\/dd>)/, `$1${shown}$2`);
}

// 掲載数の数え方（検索ページ・トップページ・home.js と同じ）：募集中（締切が今日以降）の制度と、解説（guide）
export const isListed = (g, now = Date.now()) => Boolean(g.guide || (g.e && Date.parse(g.e) >= now));

// grants/search.json の件数。検索ページの件数と同じ数え方
export function countPrograms(root = ROOT, now = Date.now()) {
  const file = join(root, 'grants', 'search.json');
  if (!existsSync(file)) return null;
  const items = (JSON.parse(readFileSync(file, 'utf-8')).items || []).filter((g) => isListed(g, now));
  return { total: items.length, local: items.filter((i) => i.local).length };
}

const ja = (n) => Number(n).toLocaleString('ja-JP');
const floorTo = (n, unit) => Math.max(unit, Math.floor(n / unit) * unit);

// トップページの数字を差し替える。件数は、検索ページの表示と食い違わないよう、正確な数を載せる（「○件以上」は使わない）
export function withProgramStats(html, stats, municipalities = MUNICIPALITY_COUNT) {
  let out = html.replace(/(<dd id="r-cities">)[\d,]+(<small>市区町村<\/small><\/dd>)/, `$1${ja(municipalities)}$2`);
  if (stats) {
    out = out
      .replace(/(<dd id="r-live">)[\d,]+<small>件(?:以上)?<\/small>(<\/dd>)/, `$1${ja(stats.total)}<small>件</small>$2`)
      .replace(/(<dd id="r-local">)[\d,]+<small>件(?:以上)?<\/small>(<\/dd>)/, `$1${ja(stats.local)}<small>件</small>$2`)
      .replace(/(<span id="r-total">)[^<]*(<\/span>)/, `$1${ja(stats.total)}件を掲載。毎日更新。$2`);
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const file = join(ROOT, 'index.html');
  const n = countArticles();
  const stats = countPrograms();
  writeFileSync(file, withProgramStats(withArticleCount(readFileSync(file, 'utf-8'), n), stats));
  console.log(`解説記事・ガイド：${n} 本／補助金・支援制度：${stats ? `${stats.total} 件（自治体の独自制度 ${stats.local} 件）` : '（search.json なし）'}`);
}
