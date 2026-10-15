// ブログ（public/blog/）を生成する：記事ごとのページ、一覧、RSS（feed.xml）。
// 使い方：content/blog/ に記事（YYYY-MM-DD-slug.md）を書いてから node scripts/build-blog.mjs を実行する。
// 投稿の書き方は content/blog/README.md を参照。
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter, renderPost } from './lib/markdown.mjs';
import { articleBody, crumb, writeArticle } from './lib/article.mjs';
import { bannerFor } from './lib/banners.mjs';
import { SITE, esc } from './lib/site-shell.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(REPO, 'content', 'blog');
const OUT = join(REPO, 'public', 'blog');
const FOLDER = 'blog';

// カテゴリ（記事の先頭の設定 category: に書く）。表示の順に並べる。色は style.css の .bl-cat-○○
export const CATEGORIES = [
  ['申請のしかた', 'apply'],
  ['制度の選び方', 'choose'],
  ['サイトの使い方', 'howto'],
  ['データ・考察', 'data'],
  ['お知らせ', 'notice'],
];
const categoryClass = (name) => (CATEGORIES.find(([n]) => n === name) || [, 'etc'])[1];
// 読了時間（分）：本文の文字数（空白を除く）÷ 500字／分。1分未満は1分
export const readMinutes = (body) => Math.max(1, Math.round(String(body).replace(/\s+/g, '').length / 500));

const dateJa = (d) => { const [y, m, day] = d.split('-').map(Number); return `${y}年${m}月${day}日`; };
const RELATED = [
  ['index.html', 'ブログの一覧'],
  ['../hantei.html', 'AI補助金判定（質問に答えて探す）'],
  ['../hitsuyo.html', '必要なものから探す'],
  ['../consult.html', '無料相談のお申し込み'],
];

// 記事を読み込む。下書き（draft: true）は載せず、日付の新しい順に並べる
export function loadPosts(dir = SRC) {
  if (!existsSync(dir)) return [];
  const posts = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md') && !['README.md', 'TOPICS.md'].includes(f)).sort()) {
    const slug = file.replace(/\.md$/, '');
    const { data, body } = parseFrontmatter(readFileSync(join(dir, file), 'utf-8'));
    if (data.draft === true) continue;
    if (!data.title) throw new Error(`${file}: title がありません`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date ?? '')) throw new Error(`${file}: date は YYYY-MM-DD で書いてください`);
    if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(slug)) throw new Error(`${file}: ファイル名は YYYY-MM-DD-英小文字とハイフン.md にしてください`);
    const description = data.description || data.title;
    const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
    posts.push({ slug, file: `${slug}.html`, title: data.title, date: data.date, updated: data.updated || '', description, category: String(data.category || 'その他'), tags, points: Array.isArray(data.points) ? data.points.map(String).filter(Boolean) : [], minutes: readMinutes(body), sections: renderPost(body) });
  }
  return posts.sort((a, b) => (a.date === b.date ? b.slug.localeCompare(a.slug) : b.date.localeCompare(a.date)));
}


// 記事ページの、リード文の下の行：カテゴリ・公開日（更新日）・読了時間・同じカテゴリの記事への案内
export function postMeta(p) {
  const upd = p.updated && p.updated !== p.date ? `<span>更新 <time datetime="${p.updated}">${dateJa(p.updated)}</time></span>` : '';
  return `      <p class="bl-meta"><span class="bl-cat bl-cat-${categoryClass(p.category)}">${esc(p.category)}</span><span>公開 <time datetime="${p.date}">${dateJa(p.date)}</time></span>${upd}<span>読了 約${p.minutes}分</span><a href="index.html#cat=${encodeURIComponent(p.category)}">同じカテゴリの記事を見る <span aria-hidden="true">→</span></a></p>
`;
}

// 「この記事のポイント」（記事の先頭の設定 points: に書く）。パソコンでは右の列、スマホでは本文の前に出す（どちらかだけが表示される）
// （<section> にしないこと：右の列の分割（scripts/lib/side-layout.mjs）が、最初の <section> を本文の始まりと見るため）
function pointsBlock(p, mobile) {
  if (!p.points.length) return '';
  const id = mobile ? 'bl-pt-m' : 'bl-pt';
  return `      <div role="region" class="bl-points${mobile ? ' bl-points--m' : ''}" aria-labelledby="${id}">
        <h2 id="${id}">この記事のポイント</h2>
        <ol>
${p.points.map((t) => `          <li>${esc(t)}</li>`).join('\n')}
        </ol>
      </div>
`;
}

// 右の列の先頭：目次（サイトの他のページと同じ部品。いま読んでいる節の強調は site.js）、ポイント、AI判定への案内
export function postSideTop(p) {
  const toc = `    <nav class="related-links" aria-label="このページの内容">
      <h2>このページの内容</h2>
      <ul>
${p.sections.map(([h], i) => `        <li><a href="#s${i}">${esc(h)}</a></li>`).join('\n')}
      </ul>
    </nav>`;
  const cta = `      <div class="bl-side-cta">
        <h2>自分に使える補助金は？</h2>
        <p>質問に答えるだけで、AIが使えそうな補助金を判定します。</p>
        <a class="bl-btn" href="../hantei.html">AI補助金判定を試す <span aria-hidden="true">→</span></a>
      </div>`;
  return [toc, pointsBlock(p, false).trimEnd(), cta].filter(Boolean).join('\n');
}

// 記事の下：前の記事・次の記事（または一覧へ）、同じカテゴリの記事（新しい順に3本まで）
export function postAfterBody(p, posts) {
  const i = posts.findIndex((x) => x.slug === p.slug);
  const older = posts[i + 1];
  const newer = posts[i - 1];
  const card = (q, label) => `<a class="bl-pn-card" href="${q.file}"><small>${label}</small><b>${esc(q.title)}</b></a>`;
  const toList = '<a class="bl-pn-card bl-pn-list" href="index.html"><small>ブログの一覧へ</small><b>記事の一覧に戻る <span aria-hidden="true">→</span></b></a>';
  const nav = `    <nav class="bl-pn" aria-label="前後の記事">
      ${older ? card(older, '← 前の記事') : toList}
      ${newer ? card(newer, '次の記事 →') : (older ? toList : '')}
    </nav>`;
  const same = posts.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const rel = same.length ? `
    <section class="bl-rel" aria-labelledby="bl-rel">
      <h2 id="bl-rel">同じカテゴリ「${esc(p.category)}」の記事</h2>
      <div class="bl-rel-grid">
${same.map((x) => `        <a class="bl-rel-card" href="${x.file}"><span class="bl-cat bl-cat-${categoryClass(x.category)}">${esc(x.category)}</span><b>${esc(x.title)}</b><span class="bl-rel-m">${dateJa(x.date)}　約${x.minutes}分</span></a>`).join('\n')}
      </div>
    </section>` : '';
  return nav + rel;
}

const RECOMMEND = [
  ['../basics/what-is.html', '補助金とは'],
  ['../basics/flow.html', '申請の流れ'],
  ['../columns/subsidy-vs-grant-vs-loan.html', '補助金・助成金・融資の違い'],
  ['../basics/business-plan.html', '事業計画書の書き方'],
  ['../cases/index.html', '活用事例'],
];

// 人気のタグ：記事の先頭の設定 tags: で、使われている数の多い順（同数は新しい記事のもの）。検索ページのキーワード検索へつなぐ
export function popularTags(posts, limit = 8) {
  const count = new Map();
  for (const p of posts) for (const t of new Set(p.tags)) count.set(t, (count.get(t) || 0) + 1);
  return [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([t]) => t);
}

const INDEX_SCRIPT = `<script>
(function () {
  var chips = [].slice.call(document.querySelectorAll('.bl-chip'));
  var rows = [].slice.call(document.querySelectorAll('.bl-row'));
  if (!chips.length) return;
  function show(cat) {
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-cat') === cat)); });
    rows.forEach(function (r) { r.hidden = cat !== 'すべて' && r.getAttribute('data-cat') !== cat; });
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var cat = c.getAttribute('data-cat');
      show(cat);
      try { history.replaceState(null, '', cat === 'すべて' ? location.pathname : '#cat=' + encodeURIComponent(cat)); } catch (e) {}
    });
  });
  function fromHash() {
    var m = location.hash.match(/^#cat=(.+)$/);
    var cat = m ? decodeURIComponent(m[1]) : 'すべて';
    if (cat === 'すべて' || chips.some(function (c) { return c.getAttribute('data-cat') === cat; })) show(cat);
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
</script>`;

// 一覧ページ：カテゴリのボタン＋記事の一覧（左）、案内（右）。JS がなくても、すべての記事が表示される
export function blogIndexBody(posts, { banner, note }) {
  const used = [...CATEGORIES.map(([n]) => n), ...new Set(posts.map((p) => p.category))].filter((n, i, a) => a.indexOf(n) === i && posts.some((p) => p.category === n));
  const chip = (name, n, on) => `<button type="button" class="bl-chip" data-cat="${esc(name)}" aria-pressed="${on}">${esc(name)}<sup>${n}</sup></button>`;
  const rows = posts.map((p) => `        <a class="bl-row" data-cat="${esc(p.category)}" href="${p.file}">
          <span class="bl-d"><time datetime="${p.date}">${dateJa(p.date)}</time><br>読了 約${p.minutes}分</span>
          <span class="bl-b"><span class="bl-cat bl-cat-${categoryClass(p.category)}">${esc(p.category)}</span><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p></span>
        </a>`).join('\n');
  const tags = popularTags(posts).map((t) => `<a href="../search.html?q=${encodeURIComponent(t)}">${esc(t)}</a>`).join('');
  return `${crumb([[null, 'ブログ']])}

    <div class="pb-banner" style="background-image: url('../images/banner/${banner}.webp')"><h1 class="pb-title">ブログ</h1></div>
    <div style="margin-bottom: 1.5rem;">
      <p class="lead" style="margin-bottom: 0;">補助金の基礎知識、サイトの使い方、運営からのお知らせを載せています。</p>
    </div>

    <nav class="bl-chips" aria-label="カテゴリで絞り込む">
      ${chip('すべて', posts.length, true)}
${used.map((n) => `      ${chip(n, posts.filter((p) => p.category === n).length, false)}`).join('\n')}
    </nav>

    <div class="bl-layout">
      <section class="bl-list" aria-labelledby="list">
        <h2 id="list" class="visually-hidden">記事の一覧</h2>
${rows}
      </section>
      <aside class="bl-side" aria-label="関連の案内">
        <div class="bl-card bl-cta">
          <h2>自分に使える補助金は？</h2>
          <p>質問に答えるだけで、AIが使えそうな補助金を判定します。</p>
          <a class="bl-btn" href="../hantei.html">AI補助金判定を試す <span aria-hidden="true">→</span></a>
        </div>
        <div class="bl-card">
          <h2>はじめての方へ</h2>
          <ul class="bl-links">
${RECOMMEND.map(([h, t]) => `            <li><a href="${h}">${esc(t)}<span aria-hidden="true">→</span></a></li>`).join('\n')}
          </ul>
        </div>
${tags ? `        <div class="bl-card">
          <h2>人気のタグ</h2>
          <div class="bl-tags">${tags}</div>
        </div>
` : ''}        <p class="bl-rss"><a href="feed.xml">RSSで購読する <span aria-hidden="true">→</span></a></p>
      </aside>
    </div>

    <p class="area-note">${note}</p>
    ${INDEX_SCRIPT}`;
}

function feedXml(posts) {
  const items = posts.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/blog/${p.file}</link>
      <guid>${SITE}/blog/${p.file}</guid>
      <pubDate>${new Date(`${p.date}T08:00:00+09:00`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>補助金ネット｜ブログ</title>
    <link>${SITE}/blog/index.html</link>
    <description>補助金の基礎知識と、サイトの使い方・お知らせ</description>
    <language>ja</language>
${items}
  </channel>
</rss>
`;
}

export function build({ src = SRC, out = OUT } = {}) {
  const posts = loadPosts(src);
  // 生成し直すので、いったん記事のページを消す（下書きにした記事が残らないように）
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });

  for (const p of posts) {
    const body = articleBody({
      section: ['index.html', 'ブログ'],
      kicker: p.title,
      title: p.title,
      lead: p.description,
      sections: p.sections,
      related: RELATED,
      banner: bannerFor(`${FOLDER}/${p.file}`),
      updated: dateJa(p.updated || p.date),
      afterLead: postMeta(p) + pointsBlock(p, true),
      sideTop: postSideTop(p),
      afterBody: postAfterBody(p, posts),
    });
    writeArticle(out, FOLDER, p.file, { title: p.title, description: p.description, body });
  }

  const indexHtml = blogIndexBody(posts, {
    banner: bannerFor(`${FOLDER}/index.html`),
    note: `記事の内容は公開時点の情報です。制度の金額や締切は変わることがあるため、申し込みの前に公式の情報で確認してください。<a href="feed.xml">RSSで購読する</a>`,
  });
  writeArticle(out, FOLDER, 'index.html', { title: 'ブログ', description: '補助金の基礎知識、サイトの使い方、運営からのお知らせを載せたブログです。', body: indexHtml });
  writeFileSync(join(out, 'feed.xml'), feedXml(posts));
  return posts.length;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(`ブログを生成：${build()} 本`);
}
