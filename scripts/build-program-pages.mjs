// 自治体の制度の「詳しいページ」（public/programs/）を作る。材料は data/program-details.json（公式ページの本文から読み取った事実）。
// ページにするのは、中身がそろった制度（pageable）だけ。一覧（programs/index.html）は、都道府県ごとにまとめる。
// 使い方：node scripts/build-program-pages.mjs（生成物はコミットする）
import { readFileSync, existsSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { P, UL, OL, TABLE, articleBody, writeArticle } from './lib/article.mjs';
import { bannerFor } from './lib/banners.mjs';
import { esc } from './lib/site-shell.mjs';
import { LOCAL_PROGRAMS } from '../src/data/local-programs.js';
import { AREA_CITIES } from '../src/data/area-cities.js';
import { PREF_SLUGS } from '../src/data/prefectures.js';
import { pageable } from './lib/program-detail.mjs';
import { loadState, isHidden, needsReview } from './lib/program-source.mjs';
import { PROGRAM_MIN_CHARS, visibleLength, robotsFor } from './lib/thin.mjs';

const ROOT = join(import.meta.dirname, '..');
const OUT = join(ROOT, 'public', 'programs');
const SECTION = ['index.html', '制度ガイド（自治体）'];
const ja = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${y}年${m}月${d}日`; };

export const detailsOf = () => JSON.parse(readFileSync(join(ROOT, 'data', 'program-details.json'), 'utf-8'));

// 制度ごとの、地域ページ内の位置（県の制度は県のページ、市区町村の制度は市区町村のページ）
function areaOf(p) {
  if (p.level === 'prefecture') {
    const pref = (p.prefectures || [])[0];
    return pref && PREF_SLUGS[pref] ? { href: `../area/pref-${PREF_SLUGS[pref]}.html#${p.id}`, label: `${pref}の補助金・助成金一覧`, place: pref } : null;
  }
  const city = AREA_CITIES.find((c) => (p.cities || []).includes(c.name));
  return city ? { href: `../area/${city.slug}.html#${p.id}`, label: `${city.name}の補助金・助成金一覧`, place: `${city.pref}${city.name}`, pref: city.pref } : null;
}

// 同じ地域（市区町村の制度は同じ市区町村、県の制度は同じ県）の、ほかの制度との比べ方。材料の事実（補助額・申請期間・対象者）だけを並べる
const clip = (v = '', n = 70) => { const t = String(v).split(/[。]/)[0]; return t.length > n ? `${t.slice(0, n)}…` : t; };
const factOf = (d, k) => ((d.facts || []).find((f) => f[0] === k) || [])[1] || '';
export function peersOf(p, all) {
  const city = (p.cities || [])[0];
  const pref = (p.prefectures || [])[0];
  const same = all.filter((x) => x.p.id !== p.id && (p.level === 'prefecture' ? x.p.level === 'prefecture' && (x.p.prefectures || [])[0] === pref : city && (x.p.cities || []).includes(city)));
  const near = same.length ? same : all.filter((x) => x.p.id !== p.id && p.level !== 'prefecture' && x.p.level === 'prefecture' && (x.p.prefectures || [])[0] === pref);
  return near.sort((a, b) => (b.p.type === p.type) - (a.p.type === p.type)).slice(0, 4);
}
function peersSection(p, d, peers) {
  if (!peers.length) return null;
  const place = p.level === 'prefecture' ? (p.prefectures || [])[0] : (p.cities || [])[0];
  const same = peers.every((x) => (p.level === 'prefecture' ? x.p.level === 'prefecture' : (x.p.cities || []).includes((p.cities || [])[0])));
  const rows = peers.map(({ p: q, d: e }) => [`<a href="${q.id}.html">${esc(q.name)}</a>`, esc(clip(factOf(e, '補助額・補助率'))), esc(clip(factOf(e, '申請期間'), 50)), esc(clip(factOf(e, '対象者')))]);
  const mine = `この制度（${esc(p.name)}）は、補助額・補助率が「${esc(clip(factOf(d, '補助額・補助率')) || '公式で確認')}」、申請期間が「${esc(clip(factOf(d, '申請期間'), 50) || '公式で確認')}」です。`;
  return ['同じ地域の、ほかの制度との比べ方', [P(`${mine}${same ? `${esc(place)}の` : `${esc(place)}（県）の`}ほかの制度と、補助額・申請期間・対象者を並べました。目的に近いものを選ぶときの目安にしてください。`), TABLE(['制度', '補助額・補助率', '申請期間', '対象者'], rows)].join('\n')];
}

export function programPage(p, d, checkedAt, review = false, peers = []) {
  const area = areaOf(p);
  const rows = (d.facts || []).map(([k, v]) => [esc(k), esc(v)]);
  const sections = [
    ['制度の概要', [P(esc(d.lead)), TABLE(['項目', '内容'], rows), p.type ? P(`種類：${esc(p.type)}${p.provider ? `／実施：${esc(p.provider)}` : ''}`) : ''].filter(Boolean).join('\n')],
  ];
  if ((d.eligible || []).length) sections.push(['対象になる人・要件', UL(d.eligible.map(esc))]);
  if ((d.expenses || []).length || (d.excluded || []).length) {
    sections.push(['対象になる経費・ならない経費', [
      (d.expenses || []).length ? `        <h3>対象になる経費</h3>\n${UL(d.expenses.map(esc))}` : '',
      (d.excluded || []).length ? `        <h3>対象外のもの</h3>\n${UL(d.excluded.map(esc))}` : '',
    ].filter(Boolean).join('\n')]);
  }
  if ((d.flow || []).length || (d.docs || []).length) {
    sections.push(['申請の流れと、主な書類', [
      (d.flow || []).length ? OL(d.flow.map(esc)) : '',
      (d.docs || []).length ? `        <h3>主な提出書類</h3>\n${UL(d.docs.map(esc))}` : '',
    ].filter(Boolean).join('\n')]);
  }
  if ((d.cautions || []).length) sections.push(['申請の前に確認したいこと', [UL(d.cautions.map(esc)), P('申請の一般的な流れは、<a href="../basics/flow.html">申請の流れ</a>で解説しています。')].join('\n')]);
  const peersSec = peersSection(p, d, peers);
  if (d.contact) sections.push(['問い合わせ先', P(esc(d.contact))]);
  if (peersSec) sections.push(peersSec);
  const related = [...(area ? [[area.href, area.label]] : []), ['index.html', '制度ガイド（自治体）の一覧'], ['../search.html', '募集中の補助金を探す'], ['../hantei.html', 'AI補助金判定（質問に答えて探す）'], ['../hitsuyo.html', 'やりたいこと・ほしいものから探す']];
  const uniqueLen = visibleLength(sections.filter((x) => x !== peersSec).map(([h, html]) => h + html).join('')) + visibleLength(d.lead || '');
  return {
    uniqueLen,
    title: `${p.name}｜${area?.place || ''}の補助金（対象・申請の流れ・注意点）`,
    description: `${p.name}（${p.provider || area?.place || ''}）の対象・補助額・申請の流れ・主な書類・注意点を、公式ページの内容から整理しました。確認日：${ja(checkedAt)}。`,
    body: articleBody({
      section: SECTION, kicker: p.name, title: p.name, lead: d.lead, sections, related,
      banner: bannerFor(`programs/${p.id}.html`), updated: ja(checkedAt),
      afterLead: review ? `\n    <p class="area-note" role="note"><strong>ご注意：</strong>公式ページの内容が、この解説の確認時（${ja(checkedAt)}）から変わっている可能性があります。最新の条件は、必ず公式ページでご確認ください。</p>` : '',
      sources: [[`公式の案内ページ（${p.provider || area?.place || '実施団体'}）`, p.url]], sourcesHeading: '最新情報の確認先（公式）', sourcesIntro: '金額・期間・対象は、年度や公募回で変わります。最新の条件は、次の公式の案内で確認してください。',
    }),
  };
}

export let thinCount = 0;
export function build() {
  const details = detailsOf();
  const byId = new Map(LOCAL_PROGRAMS.map((p) => [p.id, p]));
  mkdirSync(OUT, { recursive: true });
  for (const f of readdirSync(OUT)) if (f.endsWith('.html')) rmSync(join(OUT, f));
  const state = loadState();
  const today = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
  const made = [];
  for (const [id, d] of Object.entries(details.items)) {
    const p = byId.get(id);
    if (!p || !pageable(d) || isHidden(state.items?.[id], d, today)) continue;
    made.push({ p, d });
  }
  // 2周目：同じ地域のほかの制度との比べ方（peers）を入れて書き出す。独自の本文が少ないページは noindex（sitemap からも外れる）
  thinCount = 0;
  for (const { p, d } of made) {
    const { title, description, body, uniqueLen } = programPage(p, d, d.checkedAt || details.checkedAt, needsReview(state.items?.[p.id]), peersOf(p, made));
    const thin = uniqueLen < PROGRAM_MIN_CHARS;
    if (thin) thinCount++;
    writeArticle(OUT, 'programs', `${p.id}.html`, { title, description, body, robots: robotsFor(thin) });
  }
  // 一覧：都道府県ごと
  const groups = new Map();
  for (const { p, d } of made) {
    const a = areaOf(p);
    const key = (p.level === 'prefecture' ? (p.prefectures || [])[0] : a?.pref) || 'その他';
    groups.set(key, [...(groups.get(key) || []), { p, d }]);
  }
  const sections = [...groups.entries()].sort((x, y) => x[0].localeCompare(y[0], 'ja')).map(([k, list]) => [`${k}`, `        <ul>\n${list.map(({ p, d }) => `          <li><a href="${p.id}.html">${esc(p.name)}</a>（${esc(p.provider || '')}）：${esc(d.lead)}</li>`).join('\n')}\n        </ul>`]);
  const intro = `自治体（都道府県・市区町村）の補助金・助成金のうち、公式ページの内容を確認して、対象・申請の流れ・書類・注意点を整理した制度を並べています（${made.length}件）。内容の確認日は、各ページに表示しています。`;
  writeArticle(OUT, 'programs', 'index.html', {
    title: '制度ガイド（自治体の補助金・助成金）｜対象・申請の流れ・注意点',
    description: `自治体の補助金・助成金${made.length}件について、対象・申請の流れ・主な書類・注意点を、公式ページの内容から整理しました。`,
    body: articleBody({ section: ['index.html', '制度ガイド（自治体）'], kicker: '', title: '制度ガイド（自治体の補助金・助成金）', lead: intro, sections: sections.length ? sections : [['準備中', P('まだ公開している制度はありません。')]], related: [['../area/index.html', '地域から探す'], ['../search.html', '募集中の補助金を探す']], banner: 'b14', updated: ja(details.checkedAt || new Date().toISOString().slice(0, 10)) }),
  });
  return made.length;
}

if (process.argv[1] === import.meta.filename) { const n = build(); console.log(`制度ガイド（自治体）：${n} 件のページを生成（うち薄いページで noindex：${thinCount} 件）`); }
