// サイトマップ（sitemap.xml と、人間向けの sitemap.html）を、public/ の実際のページから作る。
// ページを追加・削除しても、このファイルを直さずに反映される（グループ分けは GROUPS の folder / pages で決まる）。
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// 転送用のページ（noindex・自動で移動するもの）はサイトマップに載せない
function isRedirect(html) {
  return /<meta\s+name="robots"\s+content="noindex[^"]*"/i.test(html) || /http-equiv="refresh"/i.test(html);
}

const unesc = (s) => s.replace(/&(amp|lt|gt|quot|#39);/g, (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" })[e]);

function titleOf(html) {
  const m = html.match(/<title>([^<]*)<\/title>/);
  return unesc(m ? m[1] : '').replace(/\s*[｜|-]\s*補助金ネット\s*$/, '').replace(/^補助金ネット\s*[｜|-]\s*/, '').trim();
}

// public/ 直下と、記事のフォルダのページ（grants/ はデプロイ時に作られるため別扱い）
const FOLDERS = ['', 'basics', 'who', 'personal', 'feature', 'cases', 'compare', 'columns', 'guides', 'news', 'blog', 'policy', 'area', 'research', 'background', 'hitsuyo', 'programs'];

export function listPages(publicDir) {
  const pages = [];
  for (const folder of FOLDERS) {
    const dir = join(publicDir, folder);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.html')).sort()) {
      const path = folder ? `${folder}/${f}` : f;
      const html = readFileSync(join(dir, f), 'utf-8');
      if (isRedirect(html)) continue;
      pages.push({ path: path === 'index.html' ? '' : path, title: titleOf(html) || path });
    }
  }
  return pages;
}

// sitemap.xml に載せるパス（grants/ のページは、デプロイ時に build-grant-pages.mjs が追記する）
export function sitemapPaths(publicDir) {
  const paths = listPages(publicDir).map((p) => p.path);
  return ['', ...paths.filter((p) => p !== '')];
}

// 人間向けサイトマップのグループ。pages は個別に並べるもの、folder はそのフォルダの全ページ
const GROUPS = [
  { title: '補助金を探す', pages: [['', 'トップ'], ['search.html', 'キーワードで探す'], ['hantei.html', 'AI補助金判定（質問に答えて探す）'], ['consult.html', '無料相談のお申し込み'], ['plan.html', '事業計画書AI下書き（無料お試し）'], ['plan-sample-free.html', '事業計画書AI 無料版のサンプル'], ['plan-sample.html', '事業計画書AI 詳しい版のサンプル'], ['grants/purposes.html', '目的別の補助金'], ['grants/industries.html', '業種別の補助金'], ['search.html?within=90&sort=end', '締切が近い補助金'], ['grants/prefectures.html', '都道府県別の補助金'], ['area/index.html', '市区町村別の補助金']] },
  { title: '補助金ニュース', pages: [['news/index.html', 'ニュースの一覧'], ['news/sources.html', '情報の取得元一覧']], folder: 'news', newestFirst: true },
  { title: 'ブログ', pages: [['blog/index.html', 'ブログの一覧']], folder: 'blog', newestFirst: true },
  { title: '補助金の活用事例', pages: [['cases/index.html', '活用事例の一覧']], folder: 'cases' },
  { title: '制度ガイド（自治体）', pages: [['programs/index.html', '制度ガイドの一覧']] },
  { title: '補助金データ', pages: [['research/index.html', '補助金データのトップ'], ['research/business.html', '事業向けリサーチデータ'], ['research/personal.html', '個人向けリサーチデータ'], ['research/gaps.html', '地域×目的の空白マップ'], ['research/monthly.html', '月次レポート'], ['research/changes.html', '制度の変更履歴'], ['research/quality.html', '品質レポート'], ['research/digest.html', '今週の公募ダイジェスト'], ['research/prefectures.html', '都道府県別の掲載状況'], ['research/programs.html', '制度の種類・対象・分野の内訳'], ['research/startup-map.html', '市区町村の創業支援マップ'], ['research/methods.html', 'データの作り方・出典・更新方針']] },
  { title: '特集・比較', pages: [['feature/index.html', '主な補助金の特集'], ['feature/popular.html', '特に人気の5つの補助金']], folder: 'feature', more: [['compare/index.html', '比較記事の一覧']], folder2: 'compare' },
  { title: '基礎知識・コラム', pages: [['basics/index.html', '基礎知識のトップ']], folder: 'basics', more: [['columns.html', 'コラムの一覧']], folder2: 'columns', tail: [['real-life.html', '補助金のリアル']] },
  { title: '対象者別', pages: [['who/index.html', '対象者別のトップ']], folder: 'who', more: [['hantei.html?for=personal', '個人が使える補助金・支援']], folder2: 'personal' },
  { title: '創業・副業のガイド', pages: [['roadmap.html', '創業のステップ'], ['beginner-guide.html', '副業の始め方ガイド'], ['diagnosis.html', '副業おすすめ診断'], ['chat.html', '副業壁打ちAI']], folder: 'guides' },
  { title: 'サイトについて', pages: [['notices.html', 'サイトからのお知らせ'], ['guide.html', '使い方'], ['policy/about.html', '運営者情報'], ['policy/sources.html', '出典・更新方針'], ['policy/privacy.html', 'プライバシーポリシー'], ['policy/contact.html', 'お問い合わせ'], ['resources.html', '参考リンク'], ['books.html', '参考図書']] },
];

const STYLE = `
  <style>
    .sm-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
    .sm-card { background: #fff; border: 1px solid #e6e8ec; border-radius: 16px; padding: 22px 24px; }
    .sm-card.wide { grid-column: 1 / -1; }
    .sm-card h2 { display: flex; align-items: center; gap: 10px; margin: 0 0 12px; font-size: 1.15rem; }
    .sm-card h2::before { content: ""; width: 5px; height: 1.2em; border-radius: 3px; background: #073461; }
    .sm-card ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
    .sm-card li { line-height: 1.6; }
    .sm-card li.sub { padding-left: 1.1em; font-size: 0.92rem; }
    .sm-card li.sub::before { content: "└ "; color: #6b778c; }
    .sm-card a { text-decoration: none; }
    .sm-card a:hover { text-decoration: underline; }
    .sm-area { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px 24px; }
    .sm-area b { display: block; font-size: 0.9rem; color: #56667f; margin-bottom: 2px; }
    .sm-area span a { margin-right: 10px; display: inline-block; }
    @media (max-width: 720px) { .sm-grid { grid-template-columns: 1fr; } .sm-card { padding: 18px 16px; } }
  </style>`;

// sitemap.html の main と style を作り直す（ヘッダー・フッターは既存のファイルのものを使い、apply-nav.mjs で更新する）
export function writeSitemapHtml(publicDir, { areaGroups = [] } = {}) {
  const file = join(publicDir, 'sitemap.html');
  const html = readFileSync(file, 'utf-8');
  const pages = listPages(publicDir);
  const byPath = new Map(pages.map((p) => [p.path, p.title]));
  const link = (path, label) => `<a href="${path || './'}">${esc(label || byPath.get(path) || path)}</a>`;
  const used = new Set();
  const folderItems = (folder, newestFirst) => {
    const list = pages.filter((p) => p.path.startsWith(`${folder}/`) && !used.has(p.path));
    if (newestFirst) list.reverse();
    return list.map((p) => { used.add(p.path); return `        <li class="sub">${link(p.path)}</li>`; });
  };
  const cards = GROUPS.map((g) => {
    const head = g.pages.map(([path, label]) => { used.add(path); return `        <li>${link(path, label)}</li>`; });
    const rows = [...head];
    if (g.folder) rows.push(...folderItems(g.folder, g.newestFirst));
    if (g.more) {
      rows.push(...g.more.map(([path, label]) => { used.add(path); return `        <li>${link(path, label)}</li>`; }));
      if (g.folder2) rows.push(...folderItems(g.folder2));
    }
    if (g.tail) rows.push(...g.tail.map(([path, label]) => { used.add(path); return `        <li>${link(path, label)}</li>`; }));
    return `    <section class="sm-card${g.folder === 'news' ? '' : ''}">
      <h2>${esc(g.title)}</h2>
      <ul>
${rows.join('\n')}
      </ul>
    </section>`;
  });
  const area = areaGroups.length ? `    <section class="sm-card wide">
      <h2>市区町村別の補助金</h2>
      <div class="sm-area">
${areaGroups.map((g) => `        <div><b>${esc(g.pref)}</b><span>${g.cities.map((c) => `<a href="area/${c.slug}.html">${esc(c.name)}</a>`).join('')}</span></div>`).join('\n')}
      </div>
    </section>` : '';
  const main = `  <main class="wrap">
    <nav class="area-crumb" aria-label="パンくず"><a href="./">補助金ネット</a> ＞ サイトマップ</nav>
    <div style="margin-bottom: 1.5rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">サイトマップ</h1>
      <p class="lead" style="margin-bottom: 0;">補助金ネットのページを、内容ごとにまとめました。</p>
    </div>
    <div class="sm-grid">
${cards.join('\n')}
${area}
    </div>
`;
  let next = html.replace(/  <main class="wrap">[\s\S]*?(?=  <\/main>)/, main);
  next = next.replace(/\n  <style>\s*\.sitemap-group[\s\S]*?<\/style>|\n  <style>\s*\.sm-grid[\s\S]*?<\/style>/, STYLE);
  writeFileSync(file, next);
}

// ---- sitemap.xml の更新日（lastmod） ----
// ページの「本文」のハッシュを data/sitemap-lastmod.json に覚えておき、本文が変わったページだけ更新日を今日（日本時間）にする。
// ハッシュに入れないもの：ヘッダー・フッター・右の列（関連ページ・目次）・<head>・script/style・空白の違い。
// → ナビや関連リンクの一括変更、空白だけの整形、ビルドのたびの再生成では、更新日は進まない。
// （デプロイ先の git が浅い履歴でも、同じ結果になる。毎日の更新で data/ に保存される）
import { createHash } from 'node:crypto';

export const jstDate = (now = new Date()) => new Date(now.getTime() + 9 * 3600e3).toISOString().slice(0, 10);

const HASH_VERSION = 'v2:';

// 更新日の判断に使う、ページの本文（<main> の中から、右の列・script・style・コメントを除き、空白を詰めたもの）
export function mainContent(html) {
  const m = String(html).match(/<main[\s\S]*<\/main>/i);
  return (m ? m[0] : String(html))
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<aside\b[\s\S]*?<\/aside>/gi, '')
    .replace(/<nav class="related-links"[\s\S]*?<\/nav>/gi, '')
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')
    .trim();
}

export const contentHash = (html) => HASH_VERSION + createHash('sha1').update(mainContent(html)).digest('hex').slice(0, 12);

export function lastmodMap(publicDir, paths, prev = {}, today = jstDate()) {
  const next = {};
  for (const p of paths) {
    const file = join(publicDir, p === '' ? 'index.html' : p);
    if (!existsSync(file)) continue;
    const h = contentHash(readFileSync(file, 'utf-8'));
    const old = prev[p];
    if (!old) next[p] = { h, d: today };
    // 以前の数え方（ページ全体のハッシュ）の記録は、更新日をそのまま引き継いで、新しいハッシュに置き換える（一括で更新日が進まないように）
    else if (!String(old.h).startsWith(HASH_VERSION)) next[p] = { h, d: old.d };
    else next[p] = old.h === h ? old : { h, d: today };
  }
  return next;
}

// 既存の sitemap.xml の中身を、ページの実ファイルに合わせて作り直す（制度ページの追記分はそのまま残す）
export function refreshSitemap(xml, publicDir, prev = {}, today) {
  const locRe = /<url>\s*<loc>https:\/\/hojyokin\.net\/([^<]*)<\/loc>\s*<lastmod>[^<]*<\/lastmod>\s*<\/url>/g;
  const block = xml.match(/\s*<!-- grants:start -->[\s\S]*?<!-- grants:end -->/);
  const body = block ? xml.replace(block[0], '') : xml;
  const known = [...body.matchAll(locRe)].map((m) => m[1]);
  const present = known.filter((p) => existsSync(join(publicDir, p === '' ? 'index.html' : p)));
  // 新しく増えたページ（area/ は、制度のない市区町村を外す判断があるので、build-area-pages.mjs に任せる）
  const added = sitemapPaths(publicDir).filter((p) => !known.includes(p) && !p.startsWith('area/'));
  const paths = [...present, ...added];
  const map = lastmodMap(publicDir, paths, prev, today);
  const entries = paths.filter((p) => map[p]).map((p) => `  <url>
    <loc>https://hojyokin.net/${p}</loc>
    <lastmod>${map[p].d}</lastmod>
  </url>`).join('\n');
  const out = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}${block ? block[0] : ''}
</urlset>
`;
  return { xml: out, map };
}
