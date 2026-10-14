// jGrants の取得データ（public/data/jgrants/）から、制度ごとのページ・一覧・締切一覧を生成する。
// GitHub Actions のデプロイ前（Fetch jGrants data の後）に実行する。生成物は public/grants/ で、コミットしない。
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, esc, shell } from './lib/site-shell.mjs';
import { grantBody, grantTocSide, genericFaq } from './lib/grant-modules.mjs';
import { bannerFor } from './lib/banners.mjs';
import { loadCache } from './lib/jgrants-detail.mjs';
import { PREFECTURES, PREF_SLUGS } from '../src/data/prefectures.js';
import { NATIONAL_EXTRA, PERSONAL_GUIDES } from './data/national-extra.mjs';
import { LOCAL_PROGRAMS } from '../src/data/local-programs.js';
import { RESIDENT_PROGRAMS } from '../src/data/resident-programs.js';
import { AREA_CITIES } from '../src/data/area-cities.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'public', 'data', 'jgrants');
const OUT = join(ROOT, 'public', 'grants');
const SITEMAP = join(ROOT, 'public', 'sitemap.xml');
const SOON_DAYS = 30;
const JGRANTS = 'https://www.jgrants-portal.go.jp/';

const DAY = 24 * 60 * 60 * 1000;
const dateJa = (iso) => (iso ? new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(iso)) : '記載なし');
const amountJa = (max) => (max ? `${Number(max).toLocaleString('ja-JP')}円まで` : '公募要領で確認');

// 締切までの状態。now は比較の基準時刻（テストで差し替えできるように引数にする）
export function statusOf(end, now) {
  if (!end) return { key: 'unknown', label: '締切不明', daysLeft: null };
  const days = Math.ceil((new Date(end).getTime() - now) / DAY);
  if (days < 0) return { key: 'closed', label: '受付終了', daysLeft: days };
  if (days <= SOON_DAYS) return { key: 'soon', label: `締切まで${days}日`, daysLeft: days };
  return { key: 'open', label: '受付中', daysLeft: days };
}

// 全国版と都道府県版の両方から読み、ID で重複を除く
export function loadGrants(dir = DATA) {
  const index = join(dir, 'index.json');
  if (!existsSync(index) || !JSON.parse(readFileSync(index, 'utf-8')).available) return null;
  const byId = new Map();
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json') && f !== 'index.json')) {
    for (const g of JSON.parse(readFileSync(join(dir, file), 'utf-8'))) {
      if (g.id && /^[A-Za-z0-9_-]+$/.test(g.id)) byId.set(g.id, g);
    }
  }
  return [...byId.values()].sort((a, b) => String(a.end).localeCompare(String(b.end)));
}


// カレンダー（ICS）用の日付。締切日（日本時間）の終日予定にする
const icsDate = (iso) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(iso)).replace(/-/g, '');
const xmlEsc = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);

// 締切が残っている制度を、締切日の終日予定として並べたカレンダー（ICS）
export function icsFor(grants, now) {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//補助金ネット//JA', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:補助金の締切（補助金ネット）'];
  const stamp = new Date(now).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  for (const g of grants) {
    if (!g.end || statusOf(g.end, now).key === 'closed') continue;
    lines.push('BEGIN:VEVENT', `UID:${g.id}@hojyokin.net`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDate(g.end)}`, `SUMMARY:締切：${g.title.replace(/[,;\\\n]/g, ' ')}`,
      `URL:${SITE}/grants/${g.id}.html`, 'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}

// 新しく募集が始まった制度の RSS（開始日の新しい順）
export function rssFor(grants, now) {
  const open = grants.filter((g) => statusOf(g.end, now).key !== 'closed')
    .sort((a, b) => String(b.start).localeCompare(String(a.start))).slice(0, 50);
  const items = open.map((g) => `    <item>
      <title>${xmlEsc(g.title)}</title>
      <link>${SITE}/grants/${g.id}.html</link>
      <guid isPermaLink="true">${SITE}/grants/${g.id}.html</guid>
      <description>${xmlEsc(`${g.area || '地域の記載なし'}｜締切 ${dateJa(g.end)}`)}</description>
      ${g.start ? `<pubDate>${new Date(g.start).toUTCString()}</pubDate>` : ''}
    </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>補助金ネット｜募集中の補助金</title>
    <link>${SITE}/search.html</link>
    <description>jGrants で募集中の補助金を、新しい順にお知らせします。</description>
    <language>ja</language>
${items}
  </channel>
</rss>
`;
}

const tile = (href, title, count, icon) => `        <li><a href="${href}"><img src="../images/prefectures/pref-${icon}.webp" alt="" width="44" height="36" loading="lazy"><span class="pref-name">${esc(title)}</span><span class="pref-count">${count}件</span></a></li>`;

// 都道府県別の一覧（タイル）と、都道府県ごとの制度ページ
export function prefectureCounts(dir = DATA) {
  return Object.fromEntries(PREFECTURES.map((pref) => {
    const file = join(dir, `pref-${String(PREFECTURES.indexOf(pref) + 1).padStart(2, '0')}.json`);
    const list = existsSync(file) ? JSON.parse(readFileSync(file, 'utf-8')) : [];
    return [pref, list];
  }));
}

// 並べ替え・絞り込みができる制度の一覧（操作は public/grant-list.js）
const yenJa = (max) => (max ? (max >= 100000000 ? `${(max / 100000000).toLocaleString('ja-JP', { maximumFractionDigits: 1 })}億円` : max >= 10000 ? `${Math.round(max / 10000).toLocaleString('ja-JP')}万円` : `${max.toLocaleString('ja-JP')}円`) : '');
export function grantListHtml(items, now, { showArea = true, empty = '現在、募集中の制度はありません。' } = {}) {
  if (!items.length) return `      <ul class="grant-list">\n        <li>${esc(empty)}</li>\n      </ul>`;
  const opt = (list) => list.map((x) => `<option value="${x.slug}">${esc(x.label)}</option>`).join('');
  const used = (list, key) => list.filter((x) => items.some((g) => tagsOf(g)[key].includes(x.slug)));
  const lis = items.map((g) => {
    const st = statusOf(g.end, now);
    const t = tagsOf(g);
    const labels = PURPOSES.filter((x) => t.p.includes(x.slug)).map((x) => `<span class="gl-tag">${esc(x.label)}</span>`).join('');
    const meta = [`<span class="gl-st gl-${st.key}">${esc(st.label)}</span>`, `締切 ${esc(dateJa(g.end))}`, g.max ? `上限 ${esc(yenJa(g.max))}` : '上限は公募要領で確認', g.start ? `受付開始 ${esc(dateJa(g.start))}` : '', showArea ? esc(g.area || '記載なし') : ''].filter(Boolean).join('｜');
    return `        <li data-end="${esc(g.end || '')}" data-start="${esc(g.start || '')}" data-max="${g.max || 0}" data-p="${t.p.join(' ')}" data-i="${t.i.join(' ')}" data-t="${esc(g.title)}"><a href="${g.id}.html">${esc(g.title)}</a><p class="grant-meta">${meta}</p>${labels ? `<p class="gl-tags">${labels}</p>` : ''}</li>`;
  }).join('\n');
  return `      <form class="gl-tools" data-grant-list aria-label="一覧の並べ替えと絞り込み" onsubmit="return false">
        <label class="gl-q">キーワード<input type="search" name="q" placeholder="制度名で絞り込み"></label>
        <label>種類（目的）<select name="p"><option value="">すべて</option>${opt(used(PURPOSES, 'p'))}</select></label>
        <label>業種<select name="i"><option value="">すべて</option>${opt(used(INDUSTRIES, 'i'))}</select></label>
        <label>上限額<select name="m"><option value="">指定しない</option><option value="1000000">100万円以上</option><option value="5000000">500万円以上</option><option value="10000000">1,000万円以上</option></select></label>
        <label>締切<select name="d"><option value="">指定しない</option><option value="30">30日以内</option><option value="90">90日以内</option></select></label>
        <label>並び順<select name="s"><option value="end">締切が近い順</option><option value="end-desc">締切が遠い順</option><option value="new">受付開始が新しい順</option><option value="max">上限額の大きい順</option><option value="name">名前順</option></select></label>
      </form>
      <p class="gl-count" aria-live="polite">${items.length} 件</p>
      <ul class="grant-list" data-grant-items>
${lis}
      </ul>
      <script src="../grant-list.js" defer></script>`;
}

function prefPage(pref, list, now) {
  const slug = PREF_SLUGS[pref];
  const open = list.filter((g) => statusOf(g.end, now).key !== 'closed');
  const body = `${crumb([['prefectures.html', '都道府県別'], [null, pref]])}

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">${esc(pref)}の補助金<img class="area-title-img" src="../images/prefectures/pref-${slug}.webp" alt="" height="72"></h1>
      <p class="lead" style="margin-bottom: 0;">${esc(pref)}を対象にした、募集中の補助金 ${open.length} 件です。種類・業種・上限額・締切で絞り込み、並び順を変えられます。</p>
    </div>

    <section class="area-section" aria-label="${esc(pref)}の補助金の一覧">
${grantListHtml(open, now, { showArea: false })}
    </section>

    <nav class="related-links" aria-label="関連ページ">
      <h2>関連ページ</h2>
      <ul>
        <li><a href="prefectures.html">都道府県別の補助金</a></li>
        <li><a href="deadlines.html">締切が近い補助金</a></li>
        <li><a href="../area/index.html">地域別の補助金（市区町村）</a></li>
      </ul>
    </nav>

    <p class="area-note">情報は jGrants（デジタル庁）の公開データをもとに、毎日自動で更新しています。全国向けの制度は含まれていない場合があります。最新の要件は公式サイトで確認してください。</p>`;
  return shell({ title: `${pref}の補助金・募集中の制度｜補助金ネット`, description: `${pref}で募集中の補助金 ${open.length} 件を、締切の早い順に一覧できます。`, canonicalPath: `/grants/pref-${slug}.html`, body }).replace('</style>', `${STYLE_EXTRA}\n  </style>`);
}

function prefectureIndex(counts, now) {
  const tiles = PREFECTURES.map((pref) => {
    const n = counts[pref].filter((g) => statusOf(g.end, now).key !== 'closed').length;
    return tile(`../search.html?pref=${encodeURIComponent(pref)}`, pref, n, PREF_SLUGS[pref]);
  }).join('\n');
  const body = `${crumb([[null, '都道府県別の補助金']])}

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">都道府県別の補助金</h1>
      <p class="lead" style="margin-bottom: 0;">都道府県を選ぶと、その地域で募集中の補助金を締切の早い順に確認できます。</p>
    </div>

    <section class="area-section" aria-labelledby="prefs">
      <ul class="pref-grid">
${tiles}
      </ul>
    </section>

    <p class="area-note">件数は、都道府県を対象にした募集中の制度の数です。全国向けの制度は各都道府県の一覧には含まれません。</p>`;
  return shell({ title: '都道府県別の補助金一覧｜補助金ネット', description: '47都道府県ごとに、募集中の補助金の件数と一覧を確認できます。', canonicalPath: '/grants/prefectures.html', body }).replace('</style>', `${STYLE_EXTRA}\n  </style>`);
}

const STYLE_EXTRA = `
    .grant-tag { display: inline-block; margin: 0 6px 6px 0; padding: 2px 10px; border: 1px solid #c9d4dd; border-radius: 999px; font-size: 0.82rem; text-decoration: none; color: #1f3353; background: #fff; }
    .grant-guide { font-size: 0.85rem; }
    .grant-facts { display: grid; grid-template-columns: max-content 1fr; gap: 10px 20px; margin: 0; }
    .grant-facts dt { color: var(--mute); }
    .grant-facts dd { margin: 0; }
    .grant-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
    .grant-list li { border-top: 1px solid #e6e8ec; padding-top: 12px; }
    .grant-list a { color: #2b65b1; font-weight: 500; text-decoration: none; }
    .grant-list a:hover { text-decoration: underline; }
    .grant-meta { font-size: 0.85rem; color: var(--mute); margin: 4px 0 0; }
    .gl-tools { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; margin: 0 0 12px; padding: 14px; background: #fff; border: 1px solid #e6e8ec; border-radius: 12px; }
    .gl-tools label { display: grid; gap: 4px; font-size: 0.78rem; color: var(--mute); font-weight: 600; }
    .gl-tools input, .gl-tools select { width: 100%; padding: 8px 10px; border: 1px solid #e6e8ec; border-radius: 8px; background: #fff; font: inherit; font-size: 0.9rem; color: #1f3353; }
    .gl-count { margin: 0 0 10px; font-weight: 700; }
    .gl-tags { margin: 6px 0 0; display: flex; flex-wrap: wrap; gap: 4px; }
    .gl-tag { padding: 1px 8px; border-radius: 999px; background: #eaf3fd; color: #073461; font-size: 0.75rem; font-weight: 600; }
    .gl-st { font-weight: 700; }
    .gl-soon, .gl-today { color: #c9411a; }
    .gl-tools .gl-q { grid-column: 1 / -1; }
    @media (max-width: 640px) { .gl-tools { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    .pref-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
    .pref-grid a { display: flex; align-items: center; gap: 14px; border: 1px solid #e6e8ec; border-radius: 10px; padding: 14px 18px; text-decoration: none; color: var(--ink); background: #fff; transition: border-color 0.2s, box-shadow 0.2s; }
    .pref-grid a:hover { border-color: var(--accent); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); }
    .pref-grid img { width: 60px; height: auto; flex-shrink: 0; }
    .pref-grid .pref-name { flex: 1; font-weight: 500; white-space: nowrap; }
    .pref-count { font-family: var(--font-mono); font-size: 0.8rem; color: var(--mute); white-space: nowrap; }
    @media (max-width: 960px) { .pref-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    @media (max-width: 640px) { .pref-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; } .pref-grid a { flex-direction: column; align-items: flex-start; gap: 6px; padding: 12px; } .pref-grid img { width: 52px; } .pref-grid .pref-name { flex: none; } }`;

const crumb = (items) => `    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ ${items.map(([h, t]) => (h ? `<a href="${h}">${esc(t)}</a>` : esc(t))).join(' ＞ ')}</nav>`;

// 制度ごとのよくある質問。データにある項目だけで答える（ページの表示と構造化データを同じ内容にする）
export function faqFor(g, now) {
  const st = statusOf(g.end, now);
  return [
    [`${g.title}の締切はいつですか？`, g.end ? `受付締切は${dateJa(g.end)}です（${st.label}）。` : '締切の情報が公開データにありません。公式サイトで確認してください。'],
    [`${g.title}の対象地域はどこですか？`, g.area ? `対象地域は「${g.area}」です。` : '対象地域の記載がありません。公式サイトで確認してください。'],
    [`${g.title}の上限額はいくらですか？`, g.max ? `公開データでは、上限額は${amountJa(g.max)}です。` : '上限額は公開データにありません。公募要領で確認してください。'],
    [`${g.title}の対象になる従業員数の条件はありますか？`, g.employees ? `公開データでは「${g.employees}」と記載されています。` : '従業員数の条件は公開データにありません。公募要領で確認してください。'],
  ];
}


// 制度ページの「分類」：目的・業種のタグと、関連する解説記事
const GUIDE_FOR = { digital: ['../feature/digital-subsidy.html', 'デジタル補助金とは？'], sales: ['../feature/jizokuka.html', '持続化補助金とは？'], equipment: ['../feature/monodukuri.html', '新事業進出・ものづくり補助金とは？'], research: ['../feature/monodukuri.html', '新事業進出・ものづくり補助金とは？'], succession: ['../feature/succession.html', '事業承継・M&A補助金とは？'], startup: ['../who/startup.html', '創業・副業を始める方へ'] };
// 対象地域に都道府県が1つだけ書かれている制度は、その都道府県を検索結果ページに引き継ぐ（複数・全国向けは引き継がない）
export function prefOfArea(area) {
  const found = PREFECTURES.filter((p) => String(area || '').includes(p));
  return found.length === 1 ? found[0] : '';
}

function tagHtml(g) {
  const t = tagsOf(g);
  const pref = prefOfArea(g.area);
  const prefQ = pref ? `&pref=${encodeURIComponent(pref)}` : '';
  const p = PURPOSES.filter((x) => t.p.includes(x.slug)).map((x) => `<a class="grant-tag" href="../search.html?purpose=${x.slug}${prefQ}">${esc(x.label)}</a>`);
  const i = INDUSTRIES.filter((x) => t.i.includes(x.slug)).map((x) => `<a class="grant-tag" href="../search.html?industry=${x.slug}${prefQ}">${esc(x.label)}</a>`);
  const guides = [...new Set(t.p.filter((k) => GUIDE_FOR[k]).map((k) => GUIDE_FOR[k].join('|')))].map((v) => { const [h, l] = v.split('|'); return `<a href="${h}">${esc(l)}</a>`; });
  if (!p.length && !i.length) return '';
  return `        <dt>分類（参考）</dt><dd>${[...p, ...i].join(' ')}${guides.length ? `<br><span class="grant-guide">関連する解説：${guides.join('、')}</span>` : ''}</dd>`;
}

// 制度の目的のタグに合う、特集の解説へのリンク（[href, ラベル, 補足, 外部リンクか]）
function guidesOf(g) {
  const t = tagsOf(g);
  return [...new Set(t.p.filter((k) => GUIDE_FOR[k]).map((k) => GUIDE_FOR[k].join('|')))].map((v) => { const [h, l] = v.split('|'); return [h, l, '', false]; });
}

export function grantPage(g, now, detail = null) {
  const st = statusOf(g.end, now);
  const title = `${g.title}｜補助金ネット`;
  const description = `${g.title}の対象地域（${g.area || '記載なし'}）、上限額、申請期間を一覧で確認できます。申請要件は公式サイトで確認してください。`.slice(0, 160);
  const url = `${SITE}/grants/${g.id}.html`;
  const faq = [...faqFor(g, now), ...genericFaq()];
  const guides = guidesOf(g);
  const body = `${crumb([['../search.html', '制度一覧'], [null, g.title]])}

    <div class="fx-hero"><div class="pb-banner" style="background-image: url('../images/banner/${bannerFor(`grants/${g.id}.html`)}.webp')"><h1 class="pb-title">${esc(g.title)}</h1></div></div>
    <div class="fx-lead">
      <p class="fx-meta"><span class="fx-chip fx-chip--${st.key}">${esc(st.label)}</span></p>
      <p class="lead">${esc(st.label)}｜締切：${esc(dateJa(g.end))}</p>${detail?.catch ? `\n      <p class="fx-catch">${esc(detail.catch)}</p>` : ''}
    </div>

    <article class="fx" data-layout="feature-v2">
${grantBody({ g, st, detail, projectEndJa: detail?.projectEnd && /^\d{4}-\d{2}-\d{2}/.test(detail.projectEnd) ? dateJa(detail.projectEnd) : (detail?.projectEnd || ''), startJa: dateJa(g.start), endJa: dateJa(g.end), amount: amountJa(g.max), faq, tagRows: tagHtml(g), guides, jgrantsDetail: `${JGRANTS}subsidy/${encodeURIComponent(g.id)}`, jgrantsPortal: JGRANTS })}
    </article>

${grantTocSide(g, detail)}

    <nav class="related-links" aria-label="関連ページ">
      <h2>関連ページ</h2>
      <ul>
        <li><a href="../search.html?within=90&amp;sort=end">締切が近い補助金</a></li>
        <li><a href="../search.html">募集中の補助金を探す</a></li>
        <li><a href="../area/index.html">地域別の補助金</a></li>
        <li><a href="../columns.html">コラム</a></li>
        <li><a href="../">補助金を探す</a></li>
      </ul>
    </nav>`;
  const jsonLd = `  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  })}</script>\n`;
  return shell({ title, description, canonicalPath: `/grants/${g.id}.html`, body, jsonLd, robots: 'noindex, follow' }).replace('</style>', `${STYLE_EXTRA}\n  </style>`);
}

function listPage({ title, heading, lead, items, now, canonicalPath, extra = '', robots = 'index, follow' }) {
  const body = `${crumb([[null, heading]])}

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">${esc(heading)}</h1>
      <p class="lead" style="margin-bottom: 0;">${esc(lead)}</p>
    </div>

    <section class="area-section" aria-label="制度の一覧">
${grantListHtml(items, now, { empty: '現在、表示できる制度がありません。' })}
    </section>

${extra}
    <p class="area-note">情報は jGrants（デジタル庁）の公開データをもとに、毎日自動で更新しています。最新の要件は公式サイトで確認してください。</p>`;
  return shell({ title, description: lead, canonicalPath, body, robots }).replace('</style>', `${STYLE_EXTRA}\n  </style>`);
}

const MIN_HUB = 3; // 該当が少ない一覧は作らない（内容が薄いページを増やさない）
const monthKey = (iso) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit' }).format(new Date(iso)).slice(0, 7);
const AMOUNT_TIERS = [[100, 1000000], [500, 5000000], [1000, 10000000]];

// 締切の月ごと・上限額ごとの一覧の定義（制度が MIN_HUB 件以上あるものだけ）
export function hubsFor(grants, now) {
  const open = grants.filter((g) => g.end && statusOf(g.end, now).key !== 'closed');
  const hubs = [];
  const byMonth = new Map();
  for (const g of open) {
    const k = monthKey(g.end);
    byMonth.set(k, [...(byMonth.get(k) || []), g]);
  }
  for (const [k, list] of [...byMonth].sort()) {
    if (list.length < MIN_HUB) continue;
    const [y, m] = k.split('-').map(Number);
    hubs.push({ file: `deadline-${k}.html`, title: `${y}年${m}月が締切の補助金一覧`, heading: `${y}年${m}月が締切の補助金`, lead: `${y}年${m}月に受付が締め切られる補助金 ${list.length} 件を、締切の早い順に並べています。`, items: list });
  }
  for (const [man, yen] of AMOUNT_TIERS) {
    const list = open.filter((g) => g.max && g.max >= yen);
    if (list.length < MIN_HUB) continue;
    hubs.push({ file: `amount-${man}.html`, title: `上限額が${man}万円以上の補助金一覧`, heading: `上限額が${man}万円以上の補助金`, lead: `募集中の補助金のうち、上限額が${man}万円以上の ${list.length} 件を、締切の早い順に並べています。`, items: list });
  }
  return hubs;
}

// 目的別の一覧。jGrants の制度名のキーワードで分ける（参考の分類であり、対象や要件を判定するものではない）
export const PURPOSES = [
  { slug: 'equipment', label: '設備投資', match: /設備|機械|機器|ものづくり|工場|車両|施設整備|店舗改装/, lead: '機械・設備・店舗などの導入や改修に使える補助金です。' },
  { slug: 'digital', label: 'IT・デジタル導入', match: /(^|[^A-Za-z])(IT|DX)([^A-Za-z]|$)|デジタル|ＩＴ|ＤＸ|システム|ソフトウェア/, lead: '会計・受発注・業務システムなど、IT ツールの導入や DX に使える補助金です。' },
  { slug: 'sales', label: '販路開拓・販売促進', match: /販路|販売|販促|展示会|(^|[^A-Za-z])EC([^A-Za-z]|$)|ＥＣ|ホームページ|広告|海外展開|輸出/, lead: '新しい顧客や取引先を探す、販売を広げるための取り組みに使える補助金です。' },
  { slug: 'hiring', label: '人材・雇用', match: /雇用|人材|人手|従業員|採用|育成|働き方|賃上げ|リスキリング|研修/, lead: '人を雇う、育てる、待遇を改善するための取り組みに使える制度です。' },
  { slug: 'green', label: '省エネ・脱炭素', match: /省エネ|脱炭素|(^|[^A-Za-z])GX([^A-Za-z]|$)|ＧＸ|再エネ|再生可能|カーボン|温室効果/, lead: '省エネ設備の導入や、脱炭素に向けた取り組みに使える補助金です。' },
  { slug: 'research', label: '研究開発・技術', match: /研究|開発|技術|イノベーション|新製品|新サービス/, lead: '新しい製品・サービスや技術の開発に使える補助金です。' },
  { slug: 'succession', label: '事業承継・事業再構築', match: /承継|事業再構築|再生|転換|引継/, lead: '事業の引き継ぎや、事業の作り直し・転換に使える制度です。' },
  { slug: 'startup', label: '創業・起業', match: /創業|起業|開業|新規事業|スタートアップ/, lead: '創業者や、これから事業を始める人に向けた制度です。' },
  { slug: 'region', label: '地域・観光・農林水産', match: /観光|農林|農業|漁業|林業|地域|商店街|まちづくり|特産/, lead: '地域の産業や観光、農林水産業の取り組みに使える補助金です。' },
];

// 業種別の一覧。目的別と同じく、制度名のキーワードで分ける参考の分類
// 業種ごとに、よく検討される制度（解説記事へのリンク）
const INDUSTRY_GUIDES = {
  food: [['jizokuka', 'チラシ・ホームページ・店舗の改装など、集客の取り組み'], ['shoryokuka', '配膳・券売・調理などの省力化の機械'], ['digital', '予約・POSレジ・会計のデジタル化'], ['employment', 'パート・アルバイトの正社員化や賃上げ']],
  retail: [['jizokuka', 'チラシ・ホームページ・店舗の改装など、集客の取り組み'], ['digital', 'POSレジ・ECサイト・在庫管理のデジタル化'], ['shoryokuka', 'セルフレジ・自動精算などの省力化'], ['succession', 'お店の引き継ぎ']],
  beauty: [['jizokuka', 'ホームページ・予約サイトの掲載・店舗の改装'], ['digital', '予約・顧客管理・会計のデジタル化'], ['employment', 'スタッフの育成や賃上げ']],
  construction: [['monodukuri', '新しい工法・サービスのための設備投資'], ['shoryokuka', '人手不足を補う機械の導入'], ['digital', '施工管理・見積もり・会計のデジタル化'], ['employment', '職人の育成や正社員化']],
  manufacturing: [['monodukuri', '新製品の開発や生産性を上げる設備投資'], ['shoryokuka', '検品・搬送・梱包などの自動化'], ['growth', '工場の新設など大きな成長投資'], ['digital', '生産管理・受発注のデジタル化']],
  it: [['digital', '自社の業務のデジタル化'], ['monodukuri', '新しいサービス・製品の開発'], ['employment', 'エンジニアの育成（人材開発支援助成金など）']],
  tourism: [['jizokuka', '集客・多言語対応・ホームページ'], ['shoryokuka', '清掃・受付などの省力化'], ['monodukuri', '新しい観光サービスの開発'], ['succession', '旅館・宿の引き継ぎ']],
  agriculture: [['monodukuri', '加工品の開発や販路の拡大のための設備'], ['shoryokuka', '人手不足を補う機械の導入'], ['jizokuka', '直売・ネット販売などの販路開拓']],
  care: [['shoryokuka', '見守り・記録などの省力化'], ['digital', '記録・請求・シフト管理のデジタル化'], ['employment', '職員の育成・処遇の改善']],
};
const GUIDE_PAGES = {
  jizokuka: ['../feature/jizokuka.html', '小規模事業者持続化補助金'],
  digital: ['../feature/digital-subsidy.html', 'デジタル化・AI導入補助金'],
  monodukuri: ['../feature/monodukuri.html', '新事業進出・ものづくり商業サービス補助金'],
  shoryokuka: ['../feature/shoryokuka.html', '中小企業省力化投資補助金'],
  succession: ['../feature/succession.html', '事業承継・M&A補助金'],
  growth: ['../feature/growth.html', '中小企業成長加速化補助金'],
  employment: ['../feature/employment.html', '雇用関係の助成金'],
};
function industryGuideHtml(slug) {
  const list = INDUSTRY_GUIDES[slug] || [];
  if (!list.length) return '';
  return `    <section class="area-section" aria-labelledby="guides">
      <h2 id="guides">この業種でよく検討される制度</h2>
      <div class="area-body">
        <ul>
${list.map(([k, why]) => `          <li><a href="${GUIDE_PAGES[k][0]}">${esc(GUIDE_PAGES[k][1])}</a>：${esc(why)}</li>`).join('\n')}
        </ul>
        <p>このほか、都道府県・市区町村の制度もあります（<a href="prefectures.html">都道府県別の補助金</a>、<a href="../area/index.html">市区町村別の補助金</a>）。</p>
      </div>
    </section>
`;
}

export const INDUSTRIES = [
  { slug: 'food', label: '飲食業', match: /飲食|食堂|レストラン|カフェ|居酒屋|食品/, lead: '飲食店や食品を扱う事業者に関係しそうな補助金です。' },
  { slug: 'retail', label: '小売業・商店街', match: /小売|商店|商店街|販売店|店舗/, lead: 'お店や商店街の事業者に関係しそうな補助金です。' },
  { slug: 'beauty', label: '美容・理容・サロン', match: /美容|理容|サロン|エステ/, lead: '美容室やサロンなどに関係しそうな補助金です。' },
  { slug: 'construction', label: '建設業・住宅', match: /建設|建築|工事|住宅|リフォーム|改修/, lead: '建設業や住宅の工事に関係しそうな補助金です。' },
  { slug: 'manufacturing', label: '製造業', match: /製造|ものづくり|工場|加工/, lead: 'ものづくりや製造業に関係しそうな補助金です。' },
  { slug: 'it', label: 'IT・情報通信', match: /(^|[^A-Za-z])(IT|DX)([^A-Za-z]|$)|ＩＴ|ＤＸ|情報|ソフトウェア|デジタル/, lead: 'IT・情報通信やデジタル化に関係しそうな補助金です。' },
  { slug: 'tourism', label: '宿泊・観光', match: /観光|宿泊|旅館|ホテル|インバウンド/, lead: '宿泊業や観光の事業者に関係しそうな補助金です。' },
  { slug: 'agriculture', label: '農林水産業', match: /農業|農林|漁業|林業|畜産|水産/, lead: '農業・林業・漁業に関係しそうな補助金です。' },
  { slug: 'care', label: '医療・介護・保育', match: /医療|介護|福祉|保育/, lead: '医療・介護・保育などに関係しそうな補助金です。' },
];

// 市区町村の制度（地域別のページに載せているもの）を、検索データの形にする。リンクは地域のページへ
// 検索結果のカードに出す、制度の中身（種類・金額・期間・要約・条件・公式ページ・どの段階の自治体か）
const detailOf = (p) => ({ au: 'b', ty: p.type, am: p.amount, pd: p.period, pv: p.provider, sm: p.summary, el: (p.eligibility || []).slice(0, 3), o: p.url, lv: p.level, dl: p.deadline || null });
const localItems = () => LOCAL_PROGRAMS.map((p) => {
  const area = [...(p.prefectures || []), ...(p.cities || [])].join('・') || '全国';
  const city = AREA_CITIES.find((c) => (p.cities || []).includes(c.name));
  return { id: 'local-' + p.id, t: p.name, a: area, m: null, s: null, e: null, ...detailOf(p), ...(p.cat ? { cat: p.cat } : {}), url: city ? `area/${city.slug}.html` : 'area/index.html', local: true, guide: true, p: [], i: [], k: [...new Set([...(p.industries || []), p.type].filter(Boolean))] };
});
// 個人向けの制度の分野ごとの、ふだんの言葉（検索用）
const RESIDENT_WORDS = {
  '耐震': ['耐震', '地震', '耐震改修', '耐震診断', '古い家', '木造', 'ブロック塀', '防災', 'リフォーム'],
  '太陽光・蓄電池': ['太陽光', '蓄電池', '発電', '電気代', 'V2H', 'ソーラー', '再エネ'],
  'EV・充電': ['EV', '電気自動車', '充電', '充電設備', 'PHV', '車', '自動車', 'V2H'],
  '省エネ住宅': ['省エネ', '断熱', '窓', '給湯器', 'エコキュート', '光熱費', '電気代', 'リフォーム', '住宅'],
  '空き家・ブロック塀': ['空き家', '空家', 'ブロック塀', '解体', '除却', '実家', 'リフォーム'],
  'バリアフリー・介護': ['バリアフリー', '手すり', '段差', '介護', '高齢', '住宅改修', 'リフォーム'],
  '子育て': ['子育て', '子ども', '出産', '育児', '保育', '給付', '子育て世帯'],
  '移住': ['移住', '引っ越し', '住み替え', '地方', '移住支援金', '田舎'],
};
// 個人向けの制度（自治体）を、検索データの形にする。リンクは地域のページへ
const residentItems = () => RESIDENT_PROGRAMS.map((p) => {
  // 市区町村の制度はその市のページへ。県の制度は、その県の最初の市のページ（県の制度も載っている）へ。どちらもなければ公式のページへ
  const city = AREA_CITIES.find((c) => (p.cities || []).includes(c.name)) || AREA_CITIES.find((c) => c.pref === p.prefectures[0]);
  const area = [...(p.prefectures || []), ...(p.cities || [])].join('・');
  return { id: 'res-' + p.id, t: p.name, a: area, m: null, s: null, e: null, ...detailOf(p), au: 'p', url: city ? `area/${city.slug}.html#resident-programs` : p.url, local: true, resident: true, cat: p.category, guide: true, p: [], i: [], k: RESIDENT_WORDS[p.category] || [] };
});
// jGrants 以外の国の制度を、検索データの形にする（url は公式の申し込み先）
const extraItem = (x) => ({ au: 'p', id: x.id, t: x.title, a: x.area, m: x.max, s: x.start, e: x.end, url: x.url, est: Boolean(x.est), guide: Boolean(x.guide), p: x.p, i: x.i, k: x.k });

// 検索用の、ふだん使う言葉（制度名が硬くても、暮らしや仕事の言葉で見つけられるように）
// 目的・業種のタグごとの言葉。タイトルに入っている言葉（省力化・持続化など）からも、言葉を足す
const EVERYDAY_BY_TAG = {
  equipment: ['機械', '設備', '店舗', '工場', '買い替え', '修理', '導入', '機材', '内装', '厨房', '客席', '加工機', 'ロボット', '搬送機', '検査装置', '製造ライン', '自動釣銭機'],
  digital: ['パソコン', 'ソフト', '会計', '予約', '業務効率化', 'デジタル化', '人手不足', 'システム', 'レジ', 'POSレジ', '会計機', '券売機', 'キャッシュレス', '注文端末', 'タブレット', '在庫管理', '業務用パソコン', '受発注', '生成AI', 'AI', 'サーバー', '周辺機器'],
  sales: ['集客', '宣伝', 'チラシ', 'ホームページ', '広告', '売上', '新規のお客さん', 'ネット販売', 'お店', 'パンフレット', '看板', '展示会', 'ネット広告', 'ホームページ制作', '出展'],
  hiring: ['採用', '人材', '研修', '社員', '給料', '賃上げ', '資格', '働く人', '講座', 'リスキリング', '正社員', '社内研修', '資格取得'],
  green: ['省エネ', '電気代', '節約', 'エアコン', 'LED', '太陽光', '環境', '節電', '空調', '冷蔵庫', '冷蔵設備', '蓄電池', '照明', '太陽光発電'],
  research: ['新商品', '試作', '開発', '新技術', '新しいサービス', '研究'],
  succession: ['後継者', '引き継ぎ', '事業を譲る', '家業', '親の店', 'M&A', '仲介', '会社を譲る', '会社を買う'],
  startup: ['起業', '開業', '独立', '副業', 'はじめて', '創業', '自分のお店'],
  region: ['地域', '観光', '農業', '地元', '移住', '特産品', 'まちおこし'],
  food: ['飲食', 'お店', 'カフェ', 'レストラン', '食べ物', '料理', '弁当'],
  retail: ['お店', '商店街', '物販', '小売', '雑貨', '地元のお店'],
  beauty: ['美容院', 'サロン', '理容', 'エステ', '髪'],
  construction: ['リフォーム', '住宅', '工務店', '建築', '家'],
  manufacturing: ['ものづくり', '製造', '工場', '職人', '製品'],
  it: ['ソフト', 'パソコン', 'アプリ', 'ウェブ', 'システム'],
  tourism: ['旅館', 'ホテル', '観光', '宿', 'お客さま'],
  agriculture: ['農家', '農業', '漁業', '畑', '水産'],
  care: ['介護', '保育', '医療', '福祉', '施設'],
};
// 制度名に入っている言葉から足す言葉（硬い言い方を、ふだんの言葉に言い換える）
const EVERYDAY_BY_TITLE = [
  [/省力化/, ['人手不足', '作業の効率化', '機械']],
  [/持続化/, ['販路', '集客', 'チラシ', 'ホームページ', '看板', '広告', 'ネット広告', 'パンフレット', '展示会', '内装', '店舗改装']],
  [/ものづくり/, ['新商品', '試作', '機械']],
  [/事業承継|引継|M&A/, ['後継者', '事業を譲る', '引き継ぎ']],
  [/デジタル|IT|ＩＴ|DX/, ['パソコン', 'ソフト', '業務効率化']],
  [/雇用|人材|キャリア|助成金/, ['採用', '社員', '研修', '給料']],
  [/創業|起業/, ['起業', '開業', 'はじめて']],
  [/省エネ|脱炭素|再エネ|GX/, ['電気代', '節約', '省エネ']],
  [/再構築|新事業/, ['新しい事業', '業種転換', '新商品']],
  [/観光|地域|地方|農林/, ['地域', '地元', '観光']],
  [/住宅|子育て/, ['家', '住まい', '子育て']],
];
export function everydayOf(g) {
  const t = { p: tagsOf(g).p, i: tagsOf(g).i };
  const words = new Set();
  for (const slug of t.p) (EVERYDAY_BY_TAG[slug] || []).forEach((w) => words.add(w));
  for (const slug of t.i) (EVERYDAY_BY_TAG[slug] || []).forEach((w) => words.add(w));
  for (const [re, list] of EVERYDAY_BY_TITLE) if (re.test(g.title)) list.forEach((w) => words.add(w));
  return [...words];
}

// 制度ごとの目的・業種のタグ
export function tagsOf(g) {
  return {
    p: PURPOSES.filter((x) => x.match.test(g.title)).map((x) => x.slug),
    i: INDUSTRIES.filter((x) => x.match.test(g.title)).map((x) => x.slug),
  };
}

export function industryHubsFor(grants, now) {
  const open = grants.filter((g) => g.end && statusOf(g.end, now).key !== 'closed');
  const hubs = [];
  for (const ind of INDUSTRIES) {
    const items = open.filter((g) => ind.match.test(g.title)).sort((a, b) => String(a.end).localeCompare(String(b.end)));
    if (items.length < MIN_HUB) continue;
    hubs.push({ file: `industry-${ind.slug}.html`, title: `${ind.label}の補助金一覧｜補助金ネット`, heading: `${ind.label}の補助金`, lead: `${ind.lead}募集中の補助金 ${items.length} 件を、締切の早い順に並べています。`, items, count: items.length, extra: industryGuideHtml(ind.slug) });
  }
  return hubs;
}

// 目的別・業種別の一覧（purpose-xxx.html / industry-xxx.html）は、検索結果ページの条件つきURLに置き換える
const searchHref = (file) => {
  const m = /^(purpose|industry)-(.+)\.html$/.exec(file);
  return m ? `../search.html?${m[1]}=${m[2]}` : file;
};

function topicIndex({ hubs, heading, lead, canonicalPath, description, file }) {
  const lis = hubs.map((h) => `        <li><a href="${searchHref(h.file)}">${esc(h.heading)}</a><p class="grant-meta">募集中 ${h.count} 件｜${esc(h.lead)}</p></li>`).join('\n');
  const body = `${crumb([[null, heading]])}

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">${esc(heading)}</h1>
      <p class="lead" style="margin-bottom: 0;">${esc(lead)}</p>
    </div>

    <section class="area-section" aria-labelledby="topics">
      <ul class="grant-list">
${lis || '        <li>現在、表示できる一覧がありません。<a href="../search.html">キーワード検索</a>もお試しください。</li>'}
      </ul>
    </section>

    <p class="area-note">制度名のキーワードで分けた参考の一覧です。対象や要件は、各制度の公式情報で確認してください。情報は jGrants（デジタル庁）の公開データをもとに、毎日自動で更新しています。</p>`;
  return shell({ title: `${heading}｜補助金ネット`, description, canonicalPath, body }).replace('</style>', `${STYLE_EXTRA}\n  </style>`);
}

export function purposeHubsFor(grants, now) {
  const open = grants.filter((g) => g.end && statusOf(g.end, now).key !== 'closed');
  const hubs = [];
  for (const purpose of PURPOSES) {
    const items = open.filter((g) => purpose.match.test(g.title)).sort((a, b) => String(a.end).localeCompare(String(b.end)));
    if (items.length < MIN_HUB) continue; // 該当が少ない目的は一覧を作らない
    hubs.push({
      file: `purpose-${purpose.slug}.html`,
      title: `${purpose.label}の補助金一覧｜補助金ネット`,
      heading: `${purpose.label}の補助金`,
      lead: `${purpose.lead}募集中の補助金 ${items.length} 件を、締切の早い順に並べています。`,
      items,
      count: items.length,
    });
  }
  return hubs;
}

function purposeIndex(hubs, now) {
  const lis = hubs.map((h) => `        <li><a href="${searchHref(h.file)}">${esc(h.heading)}</a><p class="grant-meta">募集中 ${h.count} 件｜${esc(h.lead)}</p></li>`).join('\n');
  const body = `${crumb([[null, '目的別の補助金']])}

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">目的別の補助金</h1>
      <p class="lead" style="margin-bottom: 0;">やりたいことから補助金を探せます。制度名のキーワードで分けた一覧なので、対象や要件は、各制度の公式情報で確認してください。</p>
    </div>

    <section class="area-section" aria-labelledby="purposes">
      <ul class="grant-list">
${lis || '        <li>現在、表示できる目的別の一覧がありません。</li>'}
      </ul>
    </section>

    <p class="area-note">情報は jGrants（デジタル庁）の公開データをもとに、毎日自動で更新しています。</p>`;
  return shell({ title: '目的別の補助金｜補助金ネット', description: '設備投資、IT導入、販路開拓、人材、省エネなど、目的から募集中の補助金を探せます。', canonicalPath: '/grants/purposes.html', body }).replace('</style>', `${STYLE_EXTRA}\n  </style>`);
}

// sitemap.xml に制度ページを追加する（前回の追加分は取り除いてから入れ直す）
export function sitemapWith(xml, urls, lastmod) {
  const cleaned = xml.replace(/\s*<!-- grants:start -->[\s\S]*?<!-- grants:end -->/, '');
  const entries = urls.map((u) => `  <url><loc>${SITE}/${u}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n');
  return cleaned.replace('</urlset>', `  <!-- grants:start -->\n${entries}\n  <!-- grants:end -->\n</urlset>`);
}

export function buildAll({ dir = DATA, out = OUT, sitemap = SITEMAP, now = Date.now(), lastmod = new Date(now).toISOString().slice(0, 10) } = {}) {
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  const grants = loadGrants(dir);
  if (!grants) {
    // データが取れなかった日は、案内だけを出して、古い制度ページは作らない
    const msg = '制度データを取得できなかったため、一覧は準備中です。';
    writeFileSync(join(out, 'index.html'), listPage({ title: '制度一覧', heading: '制度一覧', lead: msg, items: [], now, canonicalPath: '/grants/index.html' }));
    writeFileSync(join(out, 'deadlines.html'), listPage({ title: '締切が近い補助金', heading: '締切が近い補助金', lead: msg, items: [], now, canonicalPath: '/grants/deadlines.html' }));
    writeFileSync(join(out, 'prefectures.html'), prefectureIndex(Object.fromEntries(PREFECTURES.map((p) => [p, []])), now));
    writeFileSync(join(out, 'deadlines.ics'), icsFor([], now));
    writeFileSync(join(out, 'search.json'), JSON.stringify({ generatedAt: new Date(now).toISOString(), items: [...NATIONAL_EXTRA, ...PERSONAL_GUIDES].map(extraItem).concat(localItems(), residentItems()) }));
    writeFileSync(join(out, 'purposes.html'), purposeIndex([], now));
    writeFileSync(join(out, 'industries.html'), topicIndex({ hubs: [], heading: '業種別の補助金', lead: msg, description: msg, canonicalPath: '/grants/industries.html' }));
    writeFileSync(join(out, 'feed.xml'), rssFor([], now));
    return { pages: 0 };
  }
  const soon = grants.filter((g) => statusOf(g.end, now).key !== 'closed');
  const hubs = hubsFor(grants, now);
  const details = loadCache().items || {};
  for (const g of grants) writeFileSync(join(out, `${g.id}.html`), grantPage(g, now, details[g.id] && !details[g.id].empty ? details[g.id] : null));
  writeFileSync(join(out, 'index.html'), listPage({ title: '制度一覧｜補助金ネット', heading: '制度一覧', lead: `jGrants で募集中の補助金 ${grants.length} 件を、締切の早い順に並べています。`, items: grants, now, canonicalPath: '/grants/index.html' }));
  writeFileSync(join(out, 'deadlines.html'), listPage({ title: '締切が近い補助金｜補助金ネット', heading: '締切が近い補助金', lead: `受付中の補助金 ${soon.length} 件を、締切の早い順に並べています。`, items: soon, now, canonicalPath: '/grants/deadlines.html', extra: `
    <nav class="related-links" aria-label="カレンダーと RSS">
      <h2>登録・購読</h2>
      <ul>
        <li><a href="deadlines.ics">締切をカレンダーに追加（ICS）</a></li>
        <li><a href="feed.xml">新着の補助金を RSS で受け取る</a></li>
        <li><a href="prefectures.html">都道府県別に見る</a></li>
${hubs.map((h) => `        <li><a href="${h.file}">${h.heading}</a></li>`).join('\n')}
      </ul>
    </nav>` }));
  for (const h of hubs) {
    writeFileSync(join(out, h.file), listPage({ title: `${h.title}｜補助金ネット`, heading: h.heading, lead: h.lead, items: h.items, now, canonicalPath: `/grants/${h.file}`, robots: 'noindex, follow' }));
  }
  const purposes = purposeHubsFor(grants, now);
  const industries = industryHubsFor(grants, now);
  writeFileSync(join(out, 'industries.html'), topicIndex({ hubs: industries, heading: '業種別の補助金', lead: '業種に関係しそうな、募集中の補助金を一覧にしました。', description: '飲食、小売、美容、建設、製造、IT、観光、農業、医療・介護など、業種から募集中の補助金を探せます。', canonicalPath: '/grants/industries.html' }));
  for (const h of industries) writeFileSync(join(out, h.file), listPage({ title: h.title, heading: h.heading, lead: h.lead, items: h.items, now, canonicalPath: `/grants/${h.file}`, extra: h.extra }));
  // 検索画面・トップページ用の軽いデータ（ブラウザで絞り込む）
  writeFileSync(join(out, 'search.json'), JSON.stringify({ generatedAt: new Date(now).toISOString(), items: [...grants.map((g) => ({ au: 'b', id: g.id, t: g.title, a: g.area, m: g.max, s: g.start, e: g.end, ...tagsOf(g), k: everydayOf(g) })), ...NATIONAL_EXTRA.map(extraItem), ...PERSONAL_GUIDES.map(extraItem), ...localItems(), ...residentItems()] }));
  writeFileSync(join(out, 'purposes.html'), purposeIndex(purposes, now));
  for (const h of purposes) writeFileSync(join(out, h.file), listPage({ title: h.title, heading: h.heading, lead: h.lead, items: h.items, now, canonicalPath: `/grants/${h.file}` }));
  writeFileSync(join(out, 'deadlines.ics'), icsFor(grants, now));
  writeFileSync(join(out, 'feed.xml'), rssFor(grants, now));
  const counts = prefectureCounts(dir);
  writeFileSync(join(out, 'prefectures.html'), prefectureIndex(counts, now));
  for (const pref of PREFECTURES) writeFileSync(join(out, `pref-${PREF_SLUGS[pref]}.html`), prefPage(pref, counts[pref], now));
  if (existsSync(sitemap)) {
    // 検索結果ページに転送する一覧（都道府県別・目的別・業種別・制度一覧・締切が近い）は、サイトマップに載せない
    // 制度ごとのページと、締切・上限額の一覧は、公開データの自動生成で独自の内容が薄いため、検索に出さない（noindex）。サイトマップにも載せない
    const urls = ['grants/prefectures.html', 'grants/purposes.html', 'grants/industries.html'];
    writeFileSync(sitemap, sitemapWith(readFileSync(sitemap, 'utf-8'), urls, lastmod));
  }
  return { pages: grants.length };
}

// 直接実行されたときだけ生成する（テストから import しても副作用が出ないようにする）
if (import.meta.url === `file://${process.argv[1]}`) {
  const { pages } = buildAll();
  console.log(`制度ページを生成: ${pages} 件`);
}
