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

export function programPage(p, d, checkedAt) {
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
  if ((d.cautions || []).length) sections.push(['申請の前に確認したいこと', [UL(d.cautions.map(esc)), P('金額・期間・対象は、年度や公募回で変わります。申請の前に、必ず公式の最新の案内（下の「確認先」）で確認してください。')].join('\n')]);
  if (d.contact) sections.push(['問い合わせ先', P(esc(d.contact))]);
  const related = [...(area ? [[area.href, area.label]] : []), ['index.html', '制度ガイド（自治体）の一覧'], ['../search.html', '募集中の補助金を探す'], ['../hantei.html', 'AI補助金判定（質問に答えて探す）'], ['../hitsuyo.html', 'やりたいこと・ほしいものから探す']];
  return {
    title: `${p.name}｜${area?.place || ''}の補助金（対象・申請の流れ・注意点）`,
    description: `${p.name}（${p.provider || area?.place || ''}）の対象・補助額・申請の流れ・主な書類・注意点を、公式ページの内容から整理しました。確認日：${ja(checkedAt)}。`,
    body: articleBody({
      section: SECTION, kicker: p.name, title: p.name, lead: d.lead, sections, related,
      banner: bannerFor(`programs/${p.id}.html`), updated: ja(checkedAt),
      sources: [[`公式の案内ページ（${p.provider || area?.place || '実施団体'}）`, p.url]], sourcesHeading: '最新情報の確認先（公式）',
    }),
  };
}

export function build() {
  const details = detailsOf();
  const byId = new Map(LOCAL_PROGRAMS.map((p) => [p.id, p]));
  mkdirSync(OUT, { recursive: true });
  for (const f of readdirSync(OUT)) if (f.endsWith('.html')) rmSync(join(OUT, f));
  const made = [];
  for (const [id, d] of Object.entries(details.items)) {
    const p = byId.get(id);
    if (!p || !pageable(d)) continue;
    const { title, description, body } = programPage(p, d, d.checkedAt || details.checkedAt);
    writeArticle(OUT, 'programs', `${id}.html`, { title, description, body });
    made.push({ p, d });
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

if (process.argv[1] === import.meta.filename) console.log(`制度ガイド（自治体）：${build()} 件のページを生成`);
