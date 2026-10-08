// 地域別ページ（public/area/）を生成する。src/data/area-cities.js と local-programs.js から作るので、
// 都市を追加したら `node scripts/build-area-pages.mjs` を実行し、生成されたファイルをコミットする。
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AREA_CITIES } from '../src/data/area-cities.js';
import { LOCAL_PROGRAMS } from '../src/data/local-programs.js';
import { PREFECTURES } from '../src/data/prefectures.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'area');
const SITE = 'https://hojyokin.net';
const LASTMOD = '2026-10-08';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// 市区町村の制度（cities に含まれるもの）と、都道府県の制度（level: prefecture）を分けて取り出す
function programsFor(city) {
  const municipal = LOCAL_PROGRAMS.filter((p) => p.cities?.includes(city.name));
  const prefectural = LOCAL_PROGRAMS.filter((p) => p.level === 'prefecture' && p.prefectures?.includes(city.pref));
  return { municipal, prefectural };
}

const STYLE = `
    .area-section { background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 32px; margin-bottom: 24px; scroll-margin-top: 72px; }
    .area-num { display: block; font-family: var(--font-mono); font-size: 0.75rem; color: var(--mute); text-transform: uppercase; margin-bottom: 8px; }
    .area-section h2 { font-size: 1.4rem; line-height: 1.5; letter-spacing: -0.02em; margin: 0 0 16px; color: #111; }
    .area-body { max-width: 48em; line-height: 1.85; color: var(--ink); }
    .area-body p, .area-body li { margin-bottom: 0.7rem; }
    .area-body ul { margin: 0 0 1rem 1.5rem; padding: 0; }
    .area-program { border-top: 1px solid #e0e0e0; padding: 18px 0; }
    .area-program:first-child { border-top: 0; padding-top: 0; }
    .area-program h3 { font-size: 1.05rem; margin: 0 0 6px; color: #111; }
    .area-meta { font-size: 0.88rem; color: var(--mute); margin: 0 0 8px; }
    .area-links { display: flex; flex-wrap: wrap; gap: 12px 24px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #e0e0e0; }
    .area-links a { color: #1f3bff; font-weight: 500; text-decoration: none; }
    .area-links a:hover { text-decoration: underline; }
    .area-crumb { font-size: 0.85rem; color: var(--mute); margin-bottom: 1.5rem; }
    .area-crumb a { color: var(--mute); }
    .area-note { font-size: 0.9rem; color: var(--mute); line-height: 1.8; border-left: 3px solid #e0e0e0; padding-left: 16px; margin: 2rem 0 0; max-width: 48em; }
    .area-groups { display: grid; gap: 28px; }
    .area-groups h2 { font-size: 1.2rem; margin: 0 0 12px; }
    .area-groups ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px 16px; }
    .area-groups a { color: #1f3bff; text-decoration: none; }
    .area-groups a:hover { text-decoration: underline; }
    @media (max-width: 760px) { .area-section { padding: 22px; } .area-section h2 { font-size: 1.2rem; } }`;

// 共通ヘッダー・フッター（columns.html と同じ構成）。「地域別」は お役立ち情報 の中の項目
function shell({ title, description, canonicalPath, body, jsonLd = '' }) {
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${SITE}${canonicalPath}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700;900&family=IBM+Plex+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="../style.css">
  <style>${STYLE}
  </style>
${jsonLd}</head>
<body>
  <header class="topbar">
    <div class="wrap topbar-inner">
      <a class="wordmark" href="../" aria-label="補助金ネット トップ"><img src="../images/logo-header-v5.webp" alt="補助金ネット"></a>
      <nav class="topnav" id="topnav" aria-label="サイト内">
        <a href="../">補助金を探す</a>
        <a href="../guide.html">使い方</a>
        <details class="navdrop">
          <summary>はじめの一歩</summary>
          <div class="navdrop-panel">
            <a href="../diagnosis.html">今日からできること診断</a>
            <a href="../chat.html">副業壁打ちAI</a>
            <a href="../beginner-guide.html">初心者向けガイド</a>
            <a href="../roadmap.html">創業のステップ</a>
          </div>
        </details>
        <details class="navdrop" data-current>
          <summary>お役立ち情報</summary>
          <div class="navdrop-panel">
            <a href="../columns.html">コラム</a>
            <a href="../real-life.html">補助金のリアル</a>
            <a href="index.html" aria-current="page">地域別の補助金</a>
            <a href="../books.html">参考図書</a>
            <a href="../resources.html">参考リンク</a>
          </div>
        </details>
      </nav>
      <button type="button" class="nav-toggle" aria-controls="topnav" aria-expanded="false">メニュー</button>
      <span class="edition">JP — FY2026</span>
    </div>
  </header>

  <main class="wrap">
${body}
  </main>

  <footer class="footer">
    <div class="wrap">
      <p class="footer-mark" aria-hidden="true">Subsidy Finder</p>
      <nav class="footer-nav" aria-label="フッター">
        <ul>
          <li><a href="../">補助金を探す</a></li>
          <li><a href="../guide.html">使い方</a></li>
          <li><a href="../diagnosis.html">今日からできること診断</a></li>
          <li><a href="../chat.html">副業壁打ちAI</a></li>
          <li><a href="../beginner-guide.html">初心者向けガイド</a></li>
          <li><a href="../roadmap.html">創業のステップ</a></li>
          <li><a href="../columns.html">コラム</a></li>
          <li><a href="../real-life.html">補助金のリアル</a></li>
          <li><a href="index.html">地域別の補助金</a></li>
          <li><a href="../books.html">参考図書</a></li>
          <li><a href="../resources.html">参考リンク</a></li>
          <li><a href="../sitemap.html">サイトマップ</a></li>
        </ul>
      </nav>
      <div class="footer-meta">
        <p>募集中の補助金データ：<a href="https://www.jgrants-portal.go.jp/" target="_blank" rel="noopener">jGrants（デジタル庁）</a></p>
        <p>住所検索：<a href="https://zipcloud.ibsnet.co.jp/" target="_blank" rel="noopener">zipcloud</a></p>
      </div>
    </div>
  </footer>
  <script src="../site.js"></script>
</body>
</html>
`;
}

function programCard(p) {
  const deadline = p.deadline ? `締切：${esc(p.deadline)}` : '締切：公募要領で確認';
  const link = p.url
    ? `<p><a href="${esc(p.url)}" target="_blank" rel="noopener">公式の案内を見る →</a></p>`
    : '';
  return `          <div class="area-program">
            <h3>${esc(p.name)}</h3>
            <p class="area-meta">${esc(p.provider)}｜${esc(p.type)}｜${esc(p.amount)}｜${deadline}</p>
            <p>${esc(p.summary)}</p>
            ${link}
          </div>`;
}

function cityPage(city) {
  const { municipal, prefectural } = programsFor(city);
  const municipalHtml = municipal.length
    ? municipal.map(programCard).join('\n')
    : `          <p>${esc(city.name)}の制度は、まだ掲載していません。市の公式サイトの「創業・産業振興」などのページで、最新の公募を確認してください。</p>`;
  const prefHtml = prefectural.length
    ? prefectural.map(programCard).join('\n')
    : `          <p>${esc(city.pref)}全体の制度は、県の公式サイトで確認できます。</p>`;
  const title = `${city.name}の補助金・創業支援｜補助金ネット`;
  const description = `${city.name}（${city.pref}）で創業・副業を考える方向けの補助金の探し方と、掲載中の市・県の制度をまとめたページです。申請前の確認ポイントも載せています。`;
  const path = `/area/${city.slug}.html`;
  const jsonLd = `  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '補助金ネット', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: '地域別の補助金', item: `${SITE}/area/index.html` },
      { '@type': 'ListItem', position: 3, name: city.name, item: `${SITE}${path}` },
    ],
  })}</script>
`;
  const body = `    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ <a href="index.html">地域別の補助金</a> ＞ ${esc(city.name)}</nav>

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">${esc(city.name)}の補助金・創業支援</h1>
      <p class="lead" style="margin-bottom: 0;">${esc(city.pref)}・${esc(city.level)}。市の制度と県の制度、国の制度をあわせて確認するための入口です。</p>
    </div>

    <section class="area-section" aria-labelledby="city-programs">
      <span class="area-num">01</span>
      <h2 id="city-programs">${esc(city.name)}の制度</h2>
      <div class="area-body">
${municipalHtml}
      </div>
    </section>

    <section class="area-section" aria-labelledby="pref-programs">
      <span class="area-num">02</span>
      <h2 id="pref-programs">${esc(city.pref)}の制度</h2>
      <div class="area-body">
${prefHtml}
      </div>
    </section>

    <section class="area-section" aria-labelledby="national">
      <span class="area-num">03</span>
      <h2 id="national">国の制度・全国から探す</h2>
      <div class="area-body">
        <p>国の制度は、市や県の制度と並行して使えるものがあります。まずは、サイトのトップで事業の内容と郵便番号を入れると、対象になりそうな制度をまとめて確認できます。</p>
      </div>
      <div class="area-links">
        <a href="../">補助金を探す</a>
        <a href="https://www.jgrants-portal.go.jp/" target="_blank" rel="noopener">jGrants で募集中の制度を見る →</a>
      </div>
    </section>

    <section class="area-section" aria-labelledby="checklist">
      <span class="area-num">04</span>
      <h2 id="checklist">申請前に確認したいこと</h2>
      <div class="area-body">
        <ul>
          <li>対象になる事業者か（個人事業主か法人か、創業後の年数、従業員数など）</li>
          <li>対象になる経費は何か（設備、広告、外注など）</li>
          <li>多くの補助金は後払いのため、先に自己資金で支払う必要がある</li>
          <li>電子申請が必要な場合は、gBizID などのアカウントを早めに取得する</li>
        </ul>
      </div>
      <div class="area-links">
        <a href="../columns.html#column2">後払いの仕組みを読む →</a>
        <a href="../columns.html#column4">gBizID の取得を読む →</a>
        <a href="../columns.html#column5">無料の相談窓口を読む →</a>
      </div>
    </section>

    <p class="area-note">この記事は公開情報をもとにした参考情報です。制度の対象・金額・公募時期は年度や公募回によって変わるため、申請前に必ず各制度の公式情報を確認してください。</p>`;
  return shell({ title, description, canonicalPath: path, body, jsonLd });
}

function indexPage() {
  const groups = PREFECTURES
    .map((pref) => ({ pref, cities: AREA_CITIES.filter((c) => c.pref === pref) }))
    .filter((g) => g.cities.length);
  const list = groups.map((g) => `        <section>
          <h2>${esc(g.pref)}</h2>
          <ul>
${g.cities.map((c) => `            <li><a href="${c.slug}.html">${esc(c.name)}</a></li>`).join('\n')}
          </ul>
        </section>`).join('\n');
  const body = `    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ 地域別の補助金</nav>

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">地域別の補助金・創業支援</h1>
      <p class="lead" style="margin-bottom: 0;">お住まいの市区町村から、市・県・国の制度を確認できます。順次、対象の市区町村を追加しています。</p>
    </div>

    <section class="area-section" aria-labelledby="cities">
      <div class="area-groups">
${list}
      </div>
    </section>`;
  return shell({
    title: '地域別の補助金・創業支援一覧｜補助金ネット',
    description: '市区町村ごとに、市・県・国の補助金や創業支援の探し方をまとめた一覧です。お住まいの地域から制度を確認できます。',
    canonicalPath: '/area/index.html',
    body,
  });
}

function sitemap() {
  const core = ['', 'guide.html', 'diagnosis.html', 'chat.html', 'beginner-guide.html', 'roadmap.html', 'columns.html', 'real-life.html', 'books.html', 'resources.html', 'sitemap.html', 'area/index.html'];
  const urls = [...core, ...AREA_CITIES.map((c) => `area/${c.slug}.html`)];
  const entries = urls.map((u) => `  <url>
    <loc>${SITE}/${u}</loc>
    <lastmod>${LASTMOD}</lastmod>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

mkdirSync(OUT, { recursive: true });
for (const city of AREA_CITIES) writeFileSync(join(OUT, `${city.slug}.html`), cityPage(city));
writeFileSync(join(OUT, 'index.html'), indexPage());
writeFileSync(join(ROOT, 'public', 'sitemap.xml'), sitemap());
console.log(`生成: ${AREA_CITIES.length} 都市ページ + 一覧 1 + sitemap.xml`);
