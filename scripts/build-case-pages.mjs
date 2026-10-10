// 補助金の活用事例（public/cases/）のページを生成する: node scripts/build-case-pages.mjs
// 事例は、ミラサポplus・中小企業庁・経済産業省・厚生労働省のウェブサイト（公共データ利用規約 第1.0版）の公開情報を
// 出典として、当サイトで要約したもの。事例を足すときは scripts/data/cases.mjs に追加して、このスクリプトを実行する。
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CASES, SUBSIDIES, LICENSES } from './data/cases.mjs';
import { P, UL, articleBody, writeArticle } from './lib/article.mjs';
import { bannerFor } from './lib/banners.mjs';
import { esc } from './lib/site-shell.mjs';
import { withCases } from './lib/cases.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'cases');
const UPDATED = '2026年10月10日';

// 記事ごとのイラスト（public/images/cases/illust-01〜10.webp）。事例の並びをもとに固定の順で混ぜ、毎回の生成で変わらないようにする
const ILLUSTS = Array.from({ length: 10 }, (_, i) => `illust-${String(i + 1).padStart(2, '0')}.webp`);
function illustFor(i) {
  const order = [...ILLUSTS];
  let seed = 20261010;
  for (let k = order.length - 1; k > 0; k--) { seed = (seed * 1103515245 + 12345) % 2147483648; const j = seed % (k + 1); [order[k], order[j]] = [order[j], order[k]]; }
  return order[i % order.length];
}

const CASE_STYLE = `
    <style>
      .cs-top { display: grid; grid-template-columns: 1fr 134px; gap: 16px; align-items: center; margin-top: 1rem; padding: 14px 18px; background: #f4f7fa; border-left: 3px solid #1565d8; border-radius: 0 12px 12px 0; }
      .cs-facts { display: grid; grid-template-columns: max-content 1fr; align-content: center; gap: 6px 16px; margin: 0; font-size: 0.92rem; }
      .cs-facts dt { font-weight: 700; }
      .cs-facts dd { margin: 0; }
      .cs-illust { margin: 0; }
      .cs-illust img { display: block; width: 100%; height: auto; max-height: 174px; object-fit: cover; border-radius: 10px; box-shadow: 0 4px 12px rgba(29, 42, 58, 0.1); }
      .cs-illust p { margin: 3px 0 0; font-size: 0.68rem; color: var(--mute); text-align: right; }
      .cs-card { display: grid; grid-template-columns: 96px 1fr; gap: 16px; align-items: center; }
      .cs-card img { width: 96px; height: 120px; object-fit: cover; border-radius: 10px; }
      @media (max-width: 640px) { .cs-top { grid-template-columns: 1fr 96px; gap: 12px; padding: 12px 14px; } .cs-facts { grid-template-columns: 1fr; gap: 2px; } .cs-facts dd { margin-bottom: 6px; } .cs-illust img { max-height: 130px; } .cs-card { grid-template-columns: 72px 1fr; } .cs-card img { width: 72px; height: 90px; } }
    </style>
`;

const factBox = (c, i) => `${CASE_STYLE}      <div class="cs-top">
        <dl class="cs-facts">
${[['使った制度', SUBSIDIES[c.subsidy].name], ['業種', c.industry], ['地域', c.region], ['事業者', c.business], ['規模', c.size]].filter(([, v]) => v).map(([k, v]) => `          <dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('\n')}
        </dl>
        <div class="cs-illust"><img src="../images/cases/${illustFor(i)}" alt="" width="300" height="411" loading="lazy"><p>※イラストはイメージです</p></div>
      </div>
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
        afterLead: factBox(c, i),
        sources: [[c.source.title, c.source.url, c.source.publisher]],
        sourcesHeading: '出典',
        sourcesIntro: `このページは、次の公開情報を加工して作成しました（${esc(LICENSES[c.source.license])}に基づく利用）。要約・再構成は当サイトによるもので、国や出典の発行元が作成したものではありません。数字や内容は出典の記載にもとづく当時の情報です。くわしくは出典をご覧ください。`,
      }),
    });
  });

  // 一覧ページ：制度ごとにまとめる
  const groups = Object.entries(SUBSIDIES).map(([key, s]) => [s, CASES.filter((c) => c.subsidy === key)]).filter(([, list]) => list.length);
  const card = (c) => `        <a class="feature-card cs-card" href="${c.slug}.html">
          <img src="../images/cases/${illustFor(CASES.indexOf(c))}" alt="" width="300" height="411" loading="lazy">
          <span>
            <h3 style="font-size: 1.1rem; margin: 0 0 6px;">${esc(c.title)}</h3>
            <p style="margin: 0 0 4px; font-size: 0.85rem; font-weight: 700; color: #1565d8;">${esc([c.industry, c.region].filter(Boolean).join('｜'))}</p>
            <p>${esc(c.summary)}</p>
          </span>
        </a>`;
  const body = `${CASE_STYLE}    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ 補助金の活用事例</nav>

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
    'ミラサポplus・中小企業庁・経済産業省・厚生労働省のウェブサイトのコンテンツを、「公共データ利用規約（第1.0版）」に基づき、加工して利用しています。要約は当サイトによるもので、国や各発行元が作成したものではありません。写真やロゴは使っていません。',
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
  // 関連ページに「この補助金の活用事例」を入れる（生成スクリプトのないページにも反映するため、ここでも入れ直す）
  const PUBLIC = join(OUT, '..');
  for (const path of new Set(CASES.flatMap((c) => c.links || []))) {
    const file = join(PUBLIC, path);
    if (!existsSync(file)) continue;
    const prefix = path.includes('/') ? '../' : '';
    writeFileSync(file, withCases(readFileSync(file, 'utf-8'), path, prefix));
  }
  return CASES.length;
}

console.log(`補助金の活用事例を生成：${build()} 本`);
