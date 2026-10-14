// トップページの「新着・更新情報」を更新する：補助金ニュースとブログの最新、サイトからのお知らせ（data/notices.json）、最終更新日（日本時間）。
// お知らせは、新しい機能やコーナーを公開したときに data/notices.json の先頭に1件足す。
// トップには新しい順に3件、すべてのお知らせは notices.html（アーカイブ）に出す。
// 何度実行しても同じ結果。build:grants / build:news / ブログ投稿のあとに実行する。
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const dateJa = (d) => { const [y, m, day] = d.split('-').map(Number); return `${y}年${m}月${day}日`; };

export function latestOf(folder, n) {
  const dir = join(ROOT, folder);
  return readdirSync(dir).filter((f) => /^\d{4}-\d{2}-\d{2}-.+\.html$/.test(f)).sort().reverse().slice(0, n).map((f) => {
    const h = readFileSync(join(dir, f), 'utf-8');
    const title = ((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || f).replace(/<[^>]+>/g, '').trim();
    return `<li><a href="${folder}/${f}">${esc(title)}</a><span class="m">${dateJa(f.slice(0, 10))}</span></li>`;
  }).join('');
}

export function noticesHtml(list, n = 3) {
  return [...list].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n).map((x) => {
    const text = x.href ? `<a href="${x.href}">${esc(x.text)}</a>` : esc(x.text);
    return `<li><time datetime="${x.date}">${x.date.replace(/-/g, '.')}</time><span>${text}</span></li>`;
  }).join('');
}

// アーカイブのページ用（すべて、新しい順）
export function noticesArchiveHtml(list) {
  const items = [...list].sort((a, b) => b.date.localeCompare(a.date)).map((x) => {
    const [y, m, d] = x.date.split('-').map(Number);
    const text = x.href ? `<a href="${x.href}">${esc(x.text)}</a>` : esc(x.text);
    return `<li><time datetime="${x.date}">${y}年${m}月${d}日</time><span>${text}</span></li>`;
  }).join('');
  return `<ul class="nt-list">${items}</ul>`;
}

export function jstToday(now = new Date()) {
  return new Date(now.getTime() + 9 * 3600e3).toISOString().slice(0, 10);
}

export function applyLatest(html, { news, blog, today, notices }) {
  const out = notices == null ? html : html.replace(/<!-- notice:start -->[\s\S]*?<!-- notice:end -->/, `<!-- notice:start -->${notices}<!-- notice:end -->`);
  return out
    .replace(/<!-- news-latest:start -->[\s\S]*?<!-- news-latest:end -->/, `<!-- news-latest:start --><ul class="r-list">${news}</ul><!-- news-latest:end -->`)
    .replace(/<!-- blog-latest:start -->[\s\S]*?<!-- blog-latest:end -->/, `<!-- blog-latest:start --><ul class="r-list">${blog}</ul><!-- blog-latest:end -->`)
    .replace(/<time id="r-updated" datetime="[^"]*">[^<]*<\/time>/, `<time id="r-updated" datetime="${today}">${dateJa(today)}</time>`);
}

export function run() {
  const file = join(ROOT, 'index.html');
  const before = readFileSync(file, 'utf-8');
  const list = JSON.parse(readFileSync(join(ROOT, '..', 'data', 'notices.json'), 'utf-8'));
  const notices = noticesHtml(list);
  const after = applyLatest(before, { news: latestOf('news', 3), blog: latestOf('blog', 3), today: jstToday(), notices });
  if (after !== before) writeFileSync(file, after);
  const archive = join(ROOT, 'notices.html');
  const a0 = readFileSync(archive, 'utf-8');
  const a1 = a0.replace(/<!-- notices-all:start -->[\s\S]*?<!-- notices-all:end -->/, `<!-- notices-all:start -->${noticesArchiveHtml(list)}<!-- notices-all:end -->`);
  if (a1 !== a0) writeFileSync(archive, a1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) { run(); console.log('トップの新着・更新情報を更新'); }
