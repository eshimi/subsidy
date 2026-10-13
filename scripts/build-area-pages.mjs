// 地域別ページ（public/area/）を生成する。src/data/area-cities.js と local-programs.js から作るので、
// 都市を追加したら `node scripts/build-area-pages.mjs` を実行し、生成されたファイルをコミットする。
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AREA_CITIES } from '../src/data/area-cities.js';
import { LOCAL_PROGRAMS } from '../src/data/local-programs.js';
import { RESIDENT_PROGRAMS, RESIDENT_CATEGORIES } from '../src/data/resident-programs.js';
import { PREFECTURES, PREF_SLUGS } from '../src/data/prefectures.js';
import { SITE, esc, shell } from './lib/site-shell.mjs';
import { sitemapPaths, writeSitemapHtml } from './lib/sitemap.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'area');
const LASTMOD = '2026-10-08';


// 市区町村の制度（cities に含まれるもの）と、都道府県の制度（level: prefecture）を分けて取り出す
function programsFor(city) {
  const municipal = LOCAL_PROGRAMS.filter((p) => p.cities?.includes(city.name));
  const prefectural = LOCAL_PROGRAMS.filter((p) => p.level === 'prefecture' && p.prefectures?.includes(city.pref));
  return { municipal, prefectural };
}

// 個人（住民）向けの制度：市区町村のものと、都道府県のもの
function residentFor(city) {
  const municipal = RESIDENT_PROGRAMS.filter((p) => p.cities?.includes(city.name));
  const prefectural = RESIDENT_PROGRAMS.filter((p) => p.level === 'prefecture' && p.prefectures?.includes(city.pref));
  return { municipal, prefectural };
}

// 分野ごとに見出しをつけて、制度のカードを並べる
function residentGroups(list, residentCard) {
  return RESIDENT_CATEGORIES.map((cat) => {
    const items = list.filter((p) => p.category === cat);
    return items.length ? `          <h3 class="area-cat">${esc(cat)}</h3>\n${items.map(residentCard).join('\n')}` : '';
  }).filter(Boolean).join('\n');
}

function programCard(p) {
  const deadline = p.deadline ? `締切：${esc(p.deadline)}` : '締切：公募要領で確認';
  const link = p.url
    ? `<p><a href="${esc(p.url)}" target="_blank" rel="noopener">公式の案内を見る →</a></p>`
    : '';
  const period = p.period ? `<p class="area-meta">期間：${esc(p.period)}</p>` : '';
  const eligibility = p.eligibility?.length ? `<p><strong>主な条件</strong></p>\n            <ul>${p.eligibility.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>` : '';
  return `          <div class="area-program">
            <h3>${esc(p.name)}</h3>
            <p class="area-meta">${esc(p.provider)}｜${esc(p.type)}｜${esc(p.amount)}｜${deadline}</p>
            ${period}
            <p>${esc(p.summary)}</p>
            ${eligibility}
            ${link}
          </div>`;
}

// 関連ページ：同じ都道府県の他の市区と、一覧・コラムへの導線
function sameArea(city) {
  const others = AREA_CITIES.filter((c) => c.pref === city.pref && c.slug !== city.slug);
  const items = [[`pref-${PREF_SLUGS[city.pref]}.html`, `${city.pref}の補助金・助成金一覧`], ['index.html', '地域別の補助金 一覧'], ['../columns.html', 'コラム'], ['../real-life.html', '補助金のリアル']]
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
  const resident = residentFor(city);
  // 個人向けの制度が下の欄に載っているときは、そこへ案内する（上の欄が空に見えないように）
  const toResident = (n) => (RESIDENT_PROGRAMS.length && n ? `個人の方向けの制度は、<a href="#resident-programs">下の「住まい・暮らしの制度」</a>に載せています。` : '');
  const municipalHtml = municipal.length
    ? municipal.map(programCard).join('\n')
    : `          <p>${esc(city.name)}の事業・創業の方向けの制度は、まだ掲載していません。市の公式サイトの「創業・産業振興」などのページで、最新の公募を確認してください。${toResident(resident.municipal.length)}</p>`;
  const prefHtml = prefectural.length
    ? prefectural.map(programCard).join('\n')
    : `          <p>${esc(city.pref)}全体の事業・創業の方向けの制度は、県の公式サイトで確認できます。${toResident(resident.prefectural.length)}</p>`;
  const residentCard = (p) => programCard({ ...p, provider: `${p.provider}` });
  const residentHtml = [
    resident.municipal.length ? `          <p><strong>${esc(city.name)}の制度</strong></p>\n${residentGroups(resident.municipal, residentCard)}` : '',
    resident.prefectural.length ? `          <p><strong>${esc(city.pref)}の制度</strong></p>\n${residentGroups(resident.prefectural, residentCard)}` : '',
  ].filter(Boolean).join('\n') || `          <p>${esc(city.name)}・${esc(city.pref)}の、個人の方向けの制度（耐震・太陽光・EV・子育てなど）は、まだ掲載していません。市の公式サイトの「くらし・住まい」のページで確認してください。</p>`;
  // 個人向けのデータが1件もないあいだは、欄を出さない（空の案内だけが並ばないように）
  const residentSection = RESIDENT_PROGRAMS.length ? `    <section class="area-section" aria-labelledby="resident-programs">
      <span class="area-num">03</span>
      <h2 id="resident-programs">住まい・暮らしの制度（個人の方向け）</h2>
      <div class="area-body">
        <p>耐震・太陽光・EV・省エネ住宅・子育てなど、お住まいの方向けの制度です。国の制度（<a href="../hantei.html?for=personal">個人向けの補助金・支援</a>）とあわせて確認してください。</p>
${residentHtml}
      </div>
    </section>

` : '';
  const nMuni = municipal.length + resident.municipal.length;
  const title = nMuni ? `${city.name}（${city.pref}）の補助金・助成金｜市の制度${nMuni}件・創業支援｜補助金ネット` : `${city.name}の補助金・創業支援｜補助金ネット`;
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
      <h2 id="city-programs">${esc(city.name)}の制度（事業・創業の方向け）</h2>
      <div class="area-body">
${municipalHtml}
      </div>
    </section>

    <section class="area-section" aria-labelledby="pref-programs">
      <span class="area-num">02</span>
      <h2 id="pref-programs">${esc(city.pref)}の制度（事業・創業の方向け）</h2>
      <div class="area-body">
${prefHtml}
      </div>
    </section>

${residentSection}    <section class="area-section" aria-labelledby="national">
      <span class="area-num">${residentSection ? '04' : '03'}</span>
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

// ---- 都道府県ページ（/area/pref-<slug>.html）：県の制度、市区町村の制度、個人向けの制度を、県ごとにまとめる ----
const byPriority = (a, b) => (a.priority ?? 99) - (b.priority ?? 99) || a.name.localeCompare(b.name, 'ja');

export function prefData(pref) {
  const biz = LOCAL_PROGRAMS.filter((p) => p.prefectures?.includes(pref));
  const res = RESIDENT_PROGRAMS.filter((p) => p.prefectures?.includes(pref));
  return {
    bizPref: biz.filter((p) => p.level === 'prefecture').sort(byPriority),
    bizMuni: biz.filter((p) => p.level !== 'prefecture'),
    resPref: res.filter((p) => p.level === 'prefecture'),
    resMuni: res.filter((p) => p.level !== 'prefecture'),
    cities: AREA_CITIES.filter((c) => c.pref === pref),
  };
}

const cityLabel = (p) => (p.cities?.[0] ?? p.provider ?? 'その他');

function compactList(list, cityLink) {
  const groups = new Map();
  for (const p of list) { const k = cityLabel(p); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(p); }
  return [...groups.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], 'ja')).map(([city, items]) => {
    const link = cityLink.get(city);
    const head = link ? `<a href="${link}">${esc(city)}</a>` : esc(city);
    return `          <h3 class="area-cat">${head}（${items.length}件）</h3>
          <ul>
${items.sort(byPriority).map((p) => `            <li><strong>${esc(p.name)}</strong>　<span class="area-meta">${esc(p.type)}｜${esc(p.amount)}${p.deadline ? `｜締切：${esc(p.deadline)}` : ''}</span></li>`).join('\n')}
          </ul>`;
  }).join('\n');
}

function prefPage(pref) {
  const d = prefData(pref);
  const slug = PREF_SLUGS[pref];
  const total = d.bizPref.length + d.bizMuni.length + d.resPref.length + d.resMuni.length;
  const path = `/area/pref-${slug}.html`;
  const cityLink = new Map(d.cities.map((c) => [c.name, `${c.slug}.html`]));
  const top = [...d.cities].sort((a, b) => programsFor(b).municipal.length - programsFor(a).municipal.length).slice(0, 3).map((c) => c.name);
  const types = [...new Set(d.bizPref.map((p) => p.type))].join('・');
  const title = `${pref}の補助金・助成金一覧｜県・市区町村の制度${total}件（令和8年度）｜補助金ネット`;
  const description = `${pref}で使える補助金・助成金を、県の制度${d.bizPref.length + d.resPref.length}件、市区町村の制度${d.bizMuni.length + d.resMuni.length}件に分けてまとめました。${top.length ? `${top.join('・')}などの制度、` : ''}事業者向け・個人向けの探し方、申請前の注意を掲載しています。`;
  const resCard = (p) => programCard(p);
  const resPrefHtml = d.resPref.length ? residentGroups(d.resPref, resCard) : `          <p>${esc(pref)}全体の個人向けの制度は、掲載していません。</p>`;
  const faq = [
    [`${pref}で、事業者が使える補助金は、どのくらいありますか？`, `当サイトでは、${pref}の制度を${d.bizPref.length}件、市区町村の制度を${d.bizMuni.length}件掲載しています（令和8年度）。県の制度は、${types || '補助金・助成金など'}に分かれます。件数は、公開情報をもとに集めたもので、すべてではありません。公式のサイトで、最新の公募を確認してください。`],
    [`${pref}の個人向けの補助金は、どこで探せますか？`, `当ページの「個人の方向けの制度」と、市区町村のページに載せています。県の制度は${d.resPref.length}件、市区町村の制度は${d.resMuni.length}件です。国の制度は、<a href="../hantei.html?for=personal">個人向けの補助金・支援</a>で探せます。`],
    [`県の制度と市区町村の制度は、同時に使えますか？`, '制度によります。別の経費に使うなら、両方使える場合があります。同じ費用に、重ねて補助を受けることは、できないのが一般的です。併用の可否は、各制度の公式の案内で、確認してください。'],
  ];
  const faqLd = faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } }));
  const jsonLd = `  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: '補助金ネット', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: '地域別の補助金', item: `${SITE}/area/index.html` },
        { '@type': 'ListItem', position: 3, name: pref, item: `${SITE}${path}` },
      ] },
      { '@type': 'FAQPage', mainEntity: faqLd },
    ],
  })}</script>
`;
  const body = `    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ <a href="index.html">地域別の補助金</a> ＞ ${esc(pref)}</nav>

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">${esc(pref)}の補助金・助成金一覧<img class="area-title-img" src="../images/prefectures/pref-${slug}.webp" alt="" height="72"></h1>
      <p class="lead" style="margin-bottom: 0;">${esc(pref)}の県の制度と、県内の市区町村の制度を、事業者向け・個人向けに分けてまとめました。掲載は、県の制度${d.bizPref.length + d.resPref.length}件、市区町村の制度${d.bizMuni.length + d.resMuni.length}件です（令和8年度）。</p>
      <p style="margin: 12px 0 0;"><a href="../search.html?pref=${encodeURIComponent(pref)}" style="color: #2b65b1; font-weight: 500;">${esc(pref)}で募集中の補助金を、条件を指定して探す →</a></p>
    </div>

    <section class="area-section" aria-labelledby="pref-business">
      <span class="area-num">01</span>
      <h2 id="pref-business">${esc(pref)}の制度（事業・創業の方向け）</h2>
      <div class="area-body">
${d.bizPref.length ? d.bizPref.map(programCard).join('\n') : `          <p>${esc(pref)}全体の事業向けの制度は、県の公式サイトで確認できます。</p>`}
      </div>
    </section>

    <section class="area-section" aria-labelledby="muni-business">
      <span class="area-num">02</span>
      <h2 id="muni-business">県内の市区町村の制度（事業・創業の方向け）</h2>
      <div class="area-body">
        <p>${esc(pref)}内の市区町村が実施する制度を、市区町村ごとにまとめています。制度の詳しい内容は、市区町村のページ（リンクのあるもの）か、公式の案内で確認してください。</p>
${d.bizMuni.length ? compactList(d.bizMuni, cityLink) : '          <p>市区町村の制度は、まだ掲載していません。</p>'}
      </div>
    </section>

    <section class="area-section" aria-labelledby="pref-resident">
      <span class="area-num">03</span>
      <h2 id="pref-resident">個人の方向けの制度（住まい・暮らし）</h2>
      <div class="area-body">
        <p>耐震・太陽光・EV・省エネ住宅・子育てなど、お住まいの方向けの制度です。市区町村の個人向けの制度（${d.resMuni.length}件）は、${d.cities.length ? '下の「県内の市区町村のページ」から' : '各市区町村の公式サイトで'}確認できます。</p>
${resPrefHtml}
      </div>
    </section>

${d.cities.length ? `    <section class="area-section" aria-labelledby="pref-cities">
      <span class="area-num">04</span>
      <h2 id="pref-cities">県内の市区町村のページ</h2>
      <div class="area-body">
        <ul class="area-city-list">
${d.cities.map((c) => `          <li><a href="${c.slug}.html">${esc(c.name)}</a></li>`).join('\n')}
        </ul>
      </div>
    </section>

` : ''}    <section class="area-section" aria-labelledby="pref-faq">
      <span class="area-num">${d.cities.length ? '05' : '04'}</span>
      <h2 id="pref-faq">${esc(pref)}の補助金のよくある質問</h2>
      <div class="area-body">
${faq.map(([q, a]) => `        <h3>Q. ${q}</h3>\n        <p>A. ${a}</p>`).join('\n')}
      </div>
    </section>

    <section class="area-section" aria-labelledby="pref-others">
      <span class="area-num">他</span>
      <h2 id="pref-others">ほかの都道府県の補助金</h2>
      <div class="area-body">
        <ul class="area-city-list">
${PREFECTURES.filter((x) => x !== pref).map((x) => `          <li><a href="pref-${PREF_SLUGS[x]}.html">${esc(x)}</a></li>`).join('\n')}
        </ul>
      </div>
      <div class="area-links">
        <a href="../hantei.html">AI補助金判定で探す</a>
        <a href="../basics/flow.html">申請の流れを読む</a>
        <a href="../consult.html">無料相談</a>
      </div>
    </section>

    <p class="area-note">この情報は公開情報をもとにした参考情報です。制度の対象・金額・公募時期は年度や公募回によって変わるため、申請前に必ず各制度の公式情報を確認してください。</p>`;
  return shell({ title, description, canonicalPath: path, body, jsonLd, robots: 'index, follow' });
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
          <p class="area-pref-link"><a href="pref-${PREF_SLUGS[g.pref]}.html">${esc(g.pref)}の補助金・助成金一覧 →</a>　<a href="../search.html?pref=${encodeURIComponent(g.pref)}">条件を指定して探す →</a></p>
          <ul>
${g.cities.map((c) => `            <li><a href="${c.slug}.html">${esc(c.name)}</a></li>`).join('\n')}
          </ul>
        </section>`).join('\n');
  const body = `    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ 地域別の補助金</nav>

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">地域別の補助金・創業支援</h1>
      <p class="lead" style="margin-bottom: 0;">お住まいの市区町村から、市・県・国の制度を確認できます。現在 <span id="area-total">${AREA_CITIES.length}</span> 市区町村に対応し、順次追加しています。</p>
      <p style="margin: 12px 0 0;"><a href="../grants/prefectures.html" style="color: #2b65b1; font-weight: 500;">47都道府県から、募集中の補助金を探す →</a></p>
    </div>

    <section class="area-section" aria-labelledby="prefs">
      <h2 id="prefs">都道府県から探す</h2>
      <ul class="area-city-list">
${PREFECTURES.map((x) => `        <li><a href="pref-${PREF_SLUGS[x]}.html">${esc(x)}</a></li>`).join('\n')}
      </ul>
    </section>

    <section class="area-section" aria-labelledby="cities">
      <h2 id="cities">市区町村から探す</h2>
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
  // ページの一覧は public/ の実際のファイルから作る（転送用・noindex のページは除く）。市区町村は制度があるページだけ
  const thinArea = new Set(AREA_CITIES.filter((c) => !programsFor(c).municipal.length && !residentFor(c).municipal.length).map((c) => `area/${c.slug}.html`));
  const urls = sitemapPaths(join(ROOT, 'public')).filter((u) => !thinArea.has(u));
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
for (const pref of PREFECTURES) writeFileSync(join(OUT, `pref-${PREF_SLUGS[pref]}.html`), prefPage(pref));
writeFileSync(join(OUT, 'index.html'), indexPage());
writeFileSync(join(ROOT, 'public', 'sitemap.xml'), sitemap());
// サイトマップ（人間向け）を、実際のページと都市リストから作り直す
const areaGroups = PREFECTURES
  .map((pref) => ({ pref, cities: AREA_CITIES.filter((c) => c.pref === pref) }))
  .filter((g) => g.cities.length);
writeSitemapHtml(join(ROOT, 'public'), { areaGroups });
console.log(`生成: ${AREA_CITIES.length} 都市ページ + ${PREFECTURES.length} 都道府県ページ + 一覧 1 + sitemap.xml`);
