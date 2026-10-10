// 補助金の活用事例（public/cases/）のページを生成する: node scripts/build-case-pages.mjs
// 事例は、ミラサポplus（公共データ利用規約 第1.0版）と、中小企業庁・経済産業省の公開資料（政府標準利用規約 第2.0版）を
// 出典として、当サイトで要約したもの。事例を足すときは scripts/data/cases.mjs に追加して、このスクリプトを実行する。
import { mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CASES, SUBSIDIES, LICENSES } from './data/cases.mjs';
import { P, UL, articleBody, writeArticle } from './lib/article.mjs';
import { bannerFor } from './lib/banners.mjs';
import { esc } from './lib/site-shell.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'cases');
const UPDATED = '2026年10月11日';

const factBox = (c) => `      <dl style="display: grid; grid-template-columns: max-content 1fr; gap: 6px 16px; margin: 1rem 0 0; padding: 14px 18px; background: #f4f7fa; border-left: 3px solid #1565d8; font-size: 0.92rem;">
${[['使った制度', SUBSIDIES[c.subsidy].name], ['業種', c.industry], ['地域', c.region], ['事業者', c.business], ['規模', c.size]].filter(([, v]) => v).map(([k, v]) => `        <dt style="font-weight: 700;">${esc(k)}</dt><dd style="margin: 0;">${esc(v)}</dd>`).join('\n')}
      </dl>
`;

function sectionsOf(c) {
  const out = [];
  out.push(['取り組む前の課題', P(esc(c.challenge))]);
  out.push(['補助金を使った取り組み', c.actions.length > 1 ? UL(c.actions.map(esc)) : P(esc(c.actions[0]))]);
  out.push(['取り組みの成果', c.results.length > 1 ? UL(c.results.map(esc)) : P(esc(c.results[0]))]);
  if (c.quote) out.push(['事業者の言葉（出典より）', `        <blockquote style="margin: 0; padding: 12px 16px; border-left: 3px solid #c9d4dd; background: #fafbfc;">${esc(c.quote)}</blockquote>\n${P(`出典：<a href="${c.source.url}" target="_blank" rel="noopener">${esc(c.source.title)}</a>（${esc(c.source.publisher)}）`)}`]);
  const s = SUBSIDIES[c.subsidy];
  out.push(['この事例から学べること', [
    UL(c.points.map(esc)),
    P(`使った制度の全体像は<a href="../${s.guide}">${esc(s.guideTitle)}</a>で解説しています。今の制度の名前や金額は、事例の当時と変わっていることがあります。申請の前に、必ず最新の公募要領で確認してください。`),
  ].join('\n')]);
  return out;
}

function build() {
  mkdirSync(OUT, { recursive: true });
  for (const f of readdirSync(OUT)) if (f.endsWith('.html')) rmSync(join(OUT, f));

  CASES.forEach((c, i) => {
    const others = CASES.filter((x) => x !== c && x.subsidy === c.subsidy).slice(0, 2);
    const next = CASES[(i + 1) % CASES.length];
    const s = SUBSIDIES[c.subsidy];
    const related = [
      ['index.html', '補助金の活用事例の一覧'],
      ...others.map((x) => [`${x.slug}.html`, x.title]),
      ...(others.includes(next) || next === c ? [] : [[`${next.slug}.html`, `次の事例：${next.title}`]]),
      [`../${s.guide}`, s.guideTitle],
      ['../hantei.html', 'AI補助金判定で、使えそうな補助金を調べる'],
      ['../search.html', '募集中の補助金を探す'],
    ];
    writeArticle(OUT, 'cases', `${c.slug}.html`, {
      title: c.title,
      description: c.summary,
      body: articleBody({
        section: ['index.html', '補助金の活用事例'], kicker: s.short, title: c.title, lead: c.summary,
        sections: sectionsOf(c), related, banner: bannerFor(`cases/${c.slug}.html`), updated: UPDATED,
        afterLead: factBox(c),
        sources: [[c.source.title, c.source.url, c.source.publisher]],
        sourcesHeading: '出典',
        sourcesIntro: `この事例は、次の公開情報をもとに、当サイトで要約・再構成したものです（${esc(LICENSES[c.source.license])}に基づき利用）。事業者の言葉以外は当サイトの文章です。数字や内容は出典の記載のとおりで、当時の情報です。`,
      }),
    });
  });

  // 一覧ページ：制度ごとにまとめる
  const groups = Object.entries(SUBSIDIES).map(([key, s]) => [s, CASES.filter((c) => c.subsidy === key)]).filter(([, list]) => list.length);
  const card = (c) => `        <a class="feature-card" href="${c.slug}.html">
          <h3 style="font-size: 1.1rem; margin: 0 0 6px;">${esc(c.title)}</h3>
          <p style="margin: 0 0 4px; font-size: 0.85rem; font-weight: 700; color: #1565d8;">${esc([c.industry, c.region].filter(Boolean).join('｜'))}</p>
          <p>${esc(c.summary)}</p>
        </a>`;
  const body = `    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ 補助金の活用事例</nav>

    <div class="pb-banner" style="background-image: url('../images/banner/b14.webp')"><h1 class="pb-title">補助金の活用事例</h1></div>
    <div style="margin-bottom: 2rem;">
      <p class="label" style="margin-bottom: 0.5rem;">活用事例</p>
      <p class="lead" style="margin-bottom: 0;">補助金を使って、課題を乗り越えた事業者の事例を紹介します。中小企業庁（ミラサポplus）などが公開している事例を、当サイトで読みやすく要約しました。</p>
    </div>

${groups.map(([s, list], i) => `    <article class="area-section" aria-labelledby="g${i}">
      <span class="area-num">${String(i + 1).padStart(2, '0')}</span>
      <h2 id="g${i}">${esc(s.name)}の事例</h2>
      <div class="area-body">
${list.map(card).join('\n')}
        <p style="margin-top: 12px;"><a href="../${s.guide}">${esc(s.guideTitle)} →</a></p>
      </div>
    </article>`).join('\n\n')}

    <article class="area-section" aria-labelledby="about">
      <span class="area-num">注記</span>
      <h2 id="about">この事例集について</h2>
      <div class="area-body">
${UL([
    '各事例は、ミラサポplus（中小企業庁）や、中小企業庁・経済産業省が公開している資料をもとに、当サイトで要約・再構成したものです。それぞれのページの末尾に出典を載せています。',
    'ミラサポplus のコンテンツは「公共データ利用規約（第1.0版）」、府省の資料は「政府標準利用規約（第2.0版）」に基づいて利用しています。写真やロゴは使っていません。',
    '事例は当時の制度・公募回のものです。制度の名前・金額・要件は変わっていることがあります。',
    '補助金の採択や効果を保証するものではありません。',
  ])}
      </div>
    </article>

    <nav class="related-links" aria-label="関連ページ">
      <h2>関連ページ</h2>
      <ul>
        <li><a href="../hantei.html">AI補助金判定で、使えそうな補助金を調べる</a></li>
        <li><a href="../feature/popular.html">特に人気の5つの補助金</a></li>
        <li><a href="../real-life.html">補助金のリアル</a></li>
        <li><a href="../basics/business-plan.html">補助金の事業計画書の書き方</a></li>
        <li><a href="../consult.html">専門家に無料で相談する</a></li>
      </ul>
    </nav>`;
  writeArticle(OUT, 'cases', 'index.html', {
    title: '補助金の活用事例',
    description: '持続化補助金・デジタル化・AI導入補助金・ものづくり補助金・省力化投資補助金・事業承継など、補助金を活用した事業者の事例を、公的機関の公開情報をもとに紹介します。',
    body,
  });
  return CASES.length;
}

console.log(`補助金の活用事例を生成：${build()} 本`);
