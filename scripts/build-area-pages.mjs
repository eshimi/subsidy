// 地域別ページ（public/area/）を生成する。src/data/area-cities.js と local-programs.js から作るので、
// 都市を追加したら `node scripts/build-area-pages.mjs` を実行し、生成されたファイルをコミットする。
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AREA_CITIES } from '../src/data/area-cities.js';
import { LOCAL_PROGRAMS } from '../src/data/local-programs.js';
import { PREFECTURES, PREF_SLUGS } from '../src/data/prefectures.js';
import { SITE, esc, shell } from './lib/site-shell.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'area');
const LASTMOD = '2026-10-08';


// 市区町村の制度（cities に含まれるもの）と、都道府県の制度（level: prefecture）を分けて取り出す
function programsFor(city) {
  const municipal = LOCAL_PROGRAMS.filter((p) => p.cities?.includes(city.name));
  const prefectural = LOCAL_PROGRAMS.filter((p) => p.level === 'prefecture' && p.prefectures?.includes(city.pref));
  return { municipal, prefectural };
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

// 関連ページ：同じ都道府県の他の市区と、一覧・コラムへの導線
function sameArea(city) {
  const others = AREA_CITIES.filter((c) => c.pref === city.pref && c.slug !== city.slug);
  const items = [['index.html', '地域別の補助金 一覧'], ['../columns.html', 'コラム'], ['../real-life.html', '補助金のリアル']]
    .concat(others.map((c) => [`${c.slug}.html`, `${c.name}`]));
  const lis = items.map(([h, t]) => `          <li><a href="${h}">${esc(t)}</a></li>`).join('\n');
  return `    <nav class="related-links" aria-label="関連ページ">
      <h2>関連ページ</h2>
      <ul>
${lis}
      </ul>
    </nav>`;
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
      <h1 class="display" style="margin-bottom: 0.5rem;">${esc(city.name)}の補助金・創業支援<img class="area-title-img" src="../images/prefectures/pref-${PREF_SLUGS[city.pref]}.webp" alt="" height="72"></h1>
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
        <a href="../columns/subsidy-paid-after.html">後払いの仕組みを読む →</a>
        <a href="../columns/gbizid-early.html">gBizID の取得を読む →</a>
        <a href="../columns/free-consultation.html">無料の相談窓口を読む →</a>
      </div>
    </section>

${sameArea(city)}
    <p class="area-note">この記事は公開情報をもとにした参考情報です。制度の対象・金額・公募時期は年度や公募回によって変わるため、申請前に必ず各制度の公式情報を確認してください。</p>`;
  // 市の制度が載っていないページは、内容が薄いため、検索の対象から外す（制度を足したら自動で対象になる）
  const robots = municipal.length ? 'index, follow' : 'noindex, follow';
  return shell({ title, description, canonicalPath: path, body, jsonLd, robots });
}

function indexPage() {
  const groups = PREFECTURES
    .map((pref) => ({ pref, cities: AREA_CITIES.filter((c) => c.pref === pref) }))
    .filter((g) => g.cities.length);
  const list = groups.map((g) => `        <section>
          <div class="area-pref-head">
            <img src="../images/prefectures/pref-${PREF_SLUGS[g.pref]}.webp" alt="" width="96" height="auto" loading="lazy">
            <h2>${esc(g.pref)}</h2>
          </div>
          <p class="area-pref-link"><a href="../grants/pref-${PREF_SLUGS[g.pref]}.html">${esc(g.pref)}で募集中の補助金を見る →</a></p>
          <ul>
${g.cities.map((c) => `            <li><a href="${c.slug}.html">${esc(c.name)}</a></li>`).join('\n')}
          </ul>
        </section>`).join('\n');
  const body = `    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ 地域別の補助金</nav>

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">地域別の補助金・創業支援</h1>
      <p class="lead" style="margin-bottom: 0;">お住まいの市区町村から、市・県・国の制度を確認できます。順次、対象の市区町村を追加しています。</p>
      <p style="margin: 12px 0 0;"><a href="../grants/prefectures.html" style="color: #1f3bff; font-weight: 500;">47都道府県から、募集中の補助金を探す →</a></p>
    </div>

    <section class="area-section" aria-labelledby="cities">
      <div class="area-groups">
${list}
      </div>
    </section>
    <nav class="related-links" aria-label="関連ページ">
      <h2>関連ページ</h2>
      <ul>
        <li><a href="../columns.html">コラム</a></li>
        <li><a href="../real-life.html">補助金のリアル</a></li>
        <li><a href="../beginner-guide.html">初心者向けガイド</a></li>
      </ul>
    </nav>`;
  return shell({
    title: '地域別の補助金・創業支援一覧｜補助金ネット',
    description: '市区町村ごとに、市・県・国の補助金や創業支援の探し方をまとめた一覧です。お住まいの地域から制度を確認できます。',
    canonicalPath: '/area/index.html',
    body,
  });
}

function sitemap() {
  const core = ['', 'search.html', 'shindan.html', 'ai.html', 'basics/index.html', 'basics/flow.html', 'basics/business-plan.html', 'basics/after-adoption.html', 'basics/tax.html', 'basics/not-adopted.html', 'basics/glossary.html', 'who/index.html', 'who/sole-proprietor.html', 'who/sme.html', 'who/startup.html', 'personal/index.html', 'personal/housing.html', 'personal/ev.html', 'personal/solar.html', 'personal/seismic.html', 'personal/kids.html', 'personal/learning.html', 'personal/relocation.html', 'feature/popular.html', 'feature/growth.html', 'feature/employment.html', 'guide.html', 'diagnosis.html', 'chat.html', 'beginner-guide.html', 'roadmap.html', 'columns.html', 'real-life.html', 'feature/index.html', 'feature/digital-subsidy.html', 'feature/jizokuka.html', 'feature/monodukuri.html', 'feature/shoryokuka.html', 'feature/succession.html', 'compare/index.html', 'compare/virtual-office.html', 'columns/subsidy-vs-grant-vs-loan.html', 'columns/subsidy-paid-after.html', 'columns/how-to-find-subsidy.html', 'columns/gbizid-early.html', 'columns/free-consultation.html', 'guides/secret-side-job.html', 'guides/tax-filing-basics.html', 'guides/first-day-checklist.html', 'guides/work-life-balance.html', 'guides/time-to-first-income.html', 'books.html', 'resources.html', 'policy/about.html', 'policy/sources.html', 'policy/privacy.html', 'policy/contact.html', 'sitemap.html', 'area/index.html'];
  const newsDir = join(ROOT, 'public', 'news');
  const news = existsSync(newsDir) ? readdirSync(newsDir).filter((f) => f.endsWith('.html')).sort().reverse().map((f) => `news/${f}`) : [];
  const urls = [...core, ...news, ...AREA_CITIES.filter((c) => programsFor(c).municipal.length).map((c) => `area/${c.slug}.html`)];
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
// サイトマップ（人間向け）の地域別セクションを、都市リストから書き換える
const SITEMAP_HTML = join(ROOT, 'public', 'sitemap.html');
const html = readFileSync(SITEMAP_HTML, 'utf-8');
const groups = PREFECTURES
  .map((pref) => ({ pref, cities: AREA_CITIES.filter((c) => c.pref === pref) }))
  .filter((g) => g.cities.length);
const areaList = groups.map((g) => `        <li>
          <span class="area-pref">${esc(g.pref)}</span>
          <ul>
${g.cities.map((c) => `            <li><a href="area/${c.slug}.html">${esc(c.name)}</a></li>`).join('\n')}
          </ul>
        </li>`).join('\n');
const replaced = html.replace(/<!-- area-sitemap:start -->[\s\S]*?<!-- area-sitemap:end -->/, `<!-- area-sitemap:start -->
      <ul class="sitemap-list">
${areaList}
      </ul>
      <!-- area-sitemap:end -->`);
writeFileSync(SITEMAP_HTML, replaced);
console.log(`生成: ${AREA_CITIES.length} 都市ページ + 一覧 1 + sitemap.xml`);
