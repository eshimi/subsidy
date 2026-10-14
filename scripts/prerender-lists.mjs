// トップページと検索ページの一覧を、HTMLに先に書き出す（JSを待たずに、募集中の補助金が見えるようにする）。
// 元のデータは public/grants/search.json（デプロイの build:grants で作られる）。JS（home.js・search.js）は、読み込み後に、同じ場所を置き換える。
// 何度実行しても同じ結果。データがないときは、何も変えない。使い方：node scripts/prerender-lists.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const DAY = 24 * 60 * 60 * 1000;
// トップページに載せる件数。多くは一覧ページ（search.html）へ案内する（public/home.js の HOME_ITEMS と同じ値にする）
export const HOME_ITEMS = 3;
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const area = (a) => {
  const parts = String(a || '全国').split(/\s*[\/／、,]\s*/).filter(Boolean);
  return parts.length > 2 ? `${parts.slice(0, 2).join('・')} ほか${parts.length - 2}地域` : parts.join('・');
};
const item = (g, meta) => `<li><a href="grants/${encodeURIComponent(g.id)}.html">${esc(g.t)}</a><span class="m">${meta}｜${esc(area(g.a))}</span></li>`;

export function openItems(items, now) {
  return (items || []).filter((g) => g.id && g.t && (g.e && Date.parse(g.e) >= now));
}

export function listsFor(items, now = Date.now()) {
  const open = openItems(items, now);
  const soon = [...open].sort((a, b) => Date.parse(a.e) - Date.parse(b.e));
  const fresh = [...open].filter((g) => g.s).sort((a, b) => Date.parse(b.s) - Date.parse(a.s));
  const days = (g) => Math.max(0, Math.ceil((Date.parse(g.e) - now) / DAY));
  return {
    home: {
      soon: soon.slice(0, HOME_ITEMS).map((g) => item(g, `<span class="soon">締切まで${days(g)}日</span>`)).join(''),
      fresh: fresh.slice(0, HOME_ITEMS).map((g) => item(g, '受付中')).join(''),
    },
    search: soon.slice(0, 20).map((g) => item(g, `<span class="soon">締切まで${days(g)}日</span>`)).join(''),
  };
}

const swap = (html, name, inner) => html.replace(new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`), `<!-- ${name}:start -->${inner}<!-- ${name}:end -->`);

export function applyHome(html, lists) {
  let out = html;
  if (lists.home.soon) out = swap(out, 'prerender-soon', lists.home.soon);
  if (lists.home.fresh) out = swap(out, 'prerender-new', lists.home.fresh);
  return out;
}

export function applySearch(html, lists) {
  return lists.search ? swap(html, 'prerender', `<ul class="r-list">${lists.search}</ul>`) : html;
}

export function run(now = Date.now()) {
  const file = join(ROOT, 'grants', 'search.json');
  if (!existsSync(file)) return false;
  const lists = listsFor(JSON.parse(readFileSync(file, 'utf-8')).items, now);
  for (const [name, fn] of [['index.html', applyHome], ['search.html', applySearch]]) {
    const p = join(ROOT, name);
    const before = readFileSync(p, 'utf-8');
    const after = fn(before, lists);
    if (after !== before) writeFileSync(p, after);
  }
  return true;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(run() ? 'トップ・検索ページの一覧を書き出し' : '制度のデータがないため、何もしない');
