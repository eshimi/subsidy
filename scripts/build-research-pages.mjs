// 「補助金データ」のコーナー（public/research/）を生成する：当サイトの掲載データを集計した、独自の統計ページ。
//  ・都道府県別の掲載状況、制度の種類・対象・分野の内訳、市区町村の創業支援マップ（リポジトリのデータから）
//  ・今週の公募ダイジェスト（デプロイ時の jGrants データ public/grants/search.json から。データがないときは noindex）
// 使い方：node scripts/build-research-pages.mjs（デプロイの build:grants でも実行する）。何度実行しても同じ結果（同じ日なら）。
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCAL_PROGRAMS } from '../src/data/local-programs.js';
import { RESIDENT_PROGRAMS, RESIDENT_CATEGORIES } from '../src/data/resident-programs.js';
import { AREA_CITIES } from '../src/data/area-cities.js';
import { PREFECTURES, PREF_SLUGS } from '../src/data/prefectures.js';
import { articleBody, writeArticle, TABLE } from './lib/article.mjs';
import { esc } from './lib/site-shell.mjs';
import { loadHistory } from './update-research-history.mjs';

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const DAY = 24 * 60 * 60 * 1000;
export const jst = (now) => new Date(now + 9 * 3600e3).toISOString().slice(0, 10);
export const dateJa = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${y}年${m}月${d}日`; };
export const n = (x) => x.toLocaleString('ja-JP');
export const SECTION = ['index.html', '補助金データ'];
export const BANNER = 'b13';

const count = (list, f) => { const m = new Map(); for (const x of list) for (const k of [].concat(f(x))) m.set(k, (m.get(k) || 0) + 1); return m; };
const sorted = (m) => [...m.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]), 'ja'));
// fmt を渡すと、値の表示を変えられる（金額など）。棒の長さは値に比例する
export const bars = (rows, unit = '件', fmt = null) => {
  const max = Math.max(1, ...rows.map(([, v]) => v));
  return `        <ul class="rs-list">\n${rows.map(([l, v]) => `          <li><span class="rs-l">${l}</span><span class="rs-b"><i style="width:${Math.max(2, Math.round((v / max) * 100))}%"></i></span><span class="rs-n">${fmt ? fmt(v) : `${n(v)}${unit}`}</span></li>`).join('\n')}\n        </ul>`;
};
export const P = (t) => `        <p>${t}</p>`;

// どのページにも共通で付ける「このデータについて」
export function dataBox({ source, scope, asOf, method, caution }) {
  return `        <dl class="rs-box">
          <dt>出典</dt><dd>${source}</dd>
          <dt>集計の対象</dt><dd>${scope}</dd>
          <dt>調査時点</dt><dd>${esc(asOf)}</dd>
          <dt>算出の方法</dt><dd>${method}</dd>
          <dt>注意</dt><dd>${caution}</dd>
        </dl>`;
}
export const CAUTION_COVERAGE = '数字は、<strong>当サイトが掲載している制度の集計</strong>で、全国の制度の全数ではありません。地域による差は、制度の数の違いだけでなく、当サイトの調べた範囲の違いも含みます。順位や優劣を示すものではありません。';
export const LOCAL_SOURCE = '各自治体・実施機関の公開情報（公式の案内ページ）をもとに、当サイトが整理したデータ';
export const CTA = [
  ['../search.html', '条件に合う補助金を探す'],
  ['../hantei.html', 'AI補助金判定で、使えそうな制度を調べる'],
  ['../consult.html', '申請の準備・相談先を確認する（無料相談）'],
  ['methods.html', 'このデータの作り方（出典・更新方針）'],
];

// 都道府県ごとの集計
export function prefRows() {
  return PREFECTURES.map((pref) => {
    const biz = LOCAL_PROGRAMS.filter((p) => p.prefectures?.includes(pref));
    const res = RESIDENT_PROGRAMS.filter((p) => p.prefectures?.includes(pref));
    const row = {
      pref,
      bizPref: biz.filter((p) => p.level === 'prefecture').length,
      bizMuni: biz.filter((p) => p.level !== 'prefecture').length,
      resPref: res.filter((p) => p.level === 'prefecture').length,
      resMuni: res.filter((p) => p.level !== 'prefecture').length,
      cities: AREA_CITIES.filter((c) => c.pref === pref).length,
    };
    row.total = row.bizPref + row.bizMuni + row.resPref + row.resMuni;
    return row;
  });
}

// 市区町村ごとの創業支援（創業前・創業直後の人が対象になる事業者向けの制度）
export function cityRows() {
  return AREA_CITIES.map((c) => {
    const list = LOCAL_PROGRAMS.filter((p) => p.cities?.includes(c.name));
    const startup = list.filter((p) => (p.stages || []).some((s) => s === 'planning' || s === 'early'));
    return { ...c, total: list.length, startup: startup.length, resident: RESIDENT_PROGRAMS.filter((p) => p.cities?.includes(c.name)).length };
  });
}

function pageIndex(asOf, ctx) {
  const { rows, bizTotal, resTotal } = ctx;
  const top = [...rows].sort((a, b) => b.total - a.total)[0];
  const sections = [
    ['このコーナーについて', [
      P('「補助金データ」は、当サイトが集めた補助金・助成金の情報を集計して、地域や分野ごとの様子を見やすくするコーナーです。制度を一つずつ調べるだけでは分かりにくい、<strong>全体の傾向</strong>を確認できます。'),
      P('集計は、当サイトの掲載データにもとづきます。全国の全数ではないため、各ページに、出典・集計の対象・調査時点・算出の方法・注意を表示しています。'),
    ].join('\n')],
    ['いまの掲載状況', [
      `        <ul class="rs-key">
          <li><b>${n(bizTotal)}</b><span>件</span><em>事業者・創業者向けの制度（自治体）</em></li>
          <li><b>${n(resTotal)}</b><span>件</span><em>個人向けの制度（自治体）</em></li>
          <li><b>${n(AREA_CITIES.length)}</b><span>市区町村</span><em>ページのある市区町村</em></li>
          <li><b>47</b><span>都道府県</span><em>すべての都道府県を掲載</em></li>
        </ul>`,
      P(`自治体の制度の掲載数が最も多いのは、${esc(top.pref)}（${n(top.total)}件）です。ただし、人口や市区町村の数、当サイトの調べた範囲によって変わるため、地域間の優劣を示す数字ではありません。`),
    ].join('\n')],
    ['データの一覧', `        <ul>
          <li><a href="prefectures.html"><strong>都道府県別の掲載状況</strong></a>：47都道府県の、県の制度・市区町村の制度・個人向けの制度の件数を比べます。</li>
          <li><a href="programs.html"><strong>制度の種類・対象・分野の内訳</strong></a>：補助金・助成金・融資の別、創業前から事業が安定した方までの対象、個人向けの分野を集計します。</li>
          <li><a href="startup-map.html"><strong>市区町村の創業支援マップ</strong></a>：創業を考える方が使える制度の多い市区町村を、一覧で確認できます。</li>
          <li><a href="business.html"><strong>事業向けリサーチデータ</strong></a>：事業者・創業者向けの補助金・助成金・融資を、種類・目的・対象・金額・締切・地域で集計した、毎日更新のデータです。</li>
          <li><a href="personal.html"><strong>個人向けリサーチデータ</strong></a>：耐震・空き家・太陽光・移住など、住まい・暮らしの制度を、分野・金額・締切・地域で集計した、毎日更新のデータです。</li>
          <li><a href="gaps.html"><strong>地域×目的の空白マップ</strong></a>：市区町村ごとに、どの目的の制度が掲載されていないかを一覧にします。</li>
          <li><a href="monthly.html"><strong>月次レポート</strong></a>：国の制度の募集中の件数、新規掲載・募集終了の数を、月ごとにまとめます。</li>
          <li><a href="digest.html"><strong>今週の公募ダイジェスト</strong></a>：国の制度（jGrants）の、新しく始まった公募と、締切が近い公募を、毎日更新します。</li>
          <li><a href="methods.html"><strong>データの作り方・出典・更新方針</strong></a>：集計のルールと、数字の見方。</li>
        </ul>`],
    ['このデータについて', dataBox({
      source: LOCAL_SOURCE,
      scope: `自治体の事業者向けの制度${n(bizTotal)}件、個人向けの制度${n(resTotal)}件（当サイトの掲載分）`,
      asOf, method: '件数は、制度の対象地域（都道府県・市区町村）ごとに数えています。複数の地域にまたがる制度は、それぞれの地域で数えます。',
      caution: CAUTION_COVERAGE,
    })],
  ];
  return { file: 'index.html', title: '補助金データ｜地域・分野で見る、補助金・助成金の掲載状況', description: '当サイトの掲載データを集計した、補助金・助成金の独自統計。都道府県別の掲載状況、制度の種類・対象・分野の内訳、市区町村の創業支援マップ、今週の公募ダイジェストを、出典と調査時点つきで公開しています。', lead: '地域や分野ごとの、補助金・助成金の掲載状況を集計しました。出典・調査時点・集計の方法を、すべてのページに表示しています。', sections, kicker: null, related: CTA };
}

function pagePrefectures(asOf, ctx) {
  const { rows } = ctx;
  const byTotal = [...rows].sort((a, b) => b.total - a.total || a.pref.localeCompare(b.pref, 'ja'));
  const top10 = byTotal.slice(0, 10).map((r) => [`<a href="../area/pref-${PREF_SLUGS[r.pref]}.html">${esc(r.pref)}</a>`, r.total]);
  const sumMuni = rows.reduce((s, r) => s + r.bizMuni + r.resMuni, 0);
  const sumPref = rows.reduce((s, r) => s + r.bizPref + r.resPref, 0);
  const table = TABLE(['都道府県', '県の制度（事業者向け）', '市区町村の制度（事業者向け）', '個人向け（県）', '個人向け（市区町村）', '合計'], byTotal.map((r) => [`<a href="../area/pref-${PREF_SLUGS[r.pref]}.html">${esc(r.pref)}</a>`, n(r.bizPref), n(r.bizMuni), n(r.resPref), n(r.resMuni), `<strong>${n(r.total)}</strong>`]));
  const sections = [
    ['掲載件数が多い10都道府県', [P('当サイトの掲載データで、自治体の制度（県・市区町村・事業者向け・個人向けの合計）が多い順です。'), bars(top10)].join('\n')],
    ['この集計から分かること', [
      P(`全国の合計は、県の制度が${n(sumPref)}件、市区町村の制度が${n(sumMuni)}件で、<strong>市区町村の制度が、県の制度の約${(sumMuni / Math.max(1, sumPref)).toFixed(0)}倍</strong>です。創業・設備・暮らしの制度は、国や県だけでなく、市区町村の独自制度を探すことが大切です。`),
      P('県の制度の件数は、どの都道府県でも、おおむね数件〜十数件で、大きな差はありません。一方、市区町村の制度は、都市部（東京都・大阪府・神奈川県など）で多くなっています。市区町村の数や、制度の公開のされ方の違いが、背景にあると考えられます。'),
    ].join('\n')],
    ['47都道府県の一覧', `        <p>件数の多い順です。都道府県名から、その県の制度の一覧ページへ進めます。</p>\n${table}`],
    ['このデータについて', dataBox({ source: LOCAL_SOURCE, scope: '自治体（都道府県・市区町村）の、事業者・創業者向けの制度と、個人向け（住まい・暮らし）の制度', asOf, method: '制度の対象地域（都道府県）ごとに、県の制度と市区町村の制度に分けて数えています。複数の都道府県にまたがる制度は、それぞれで数えます。', caution: CAUTION_COVERAGE })],
  ];
  return { file: 'prefectures.html', title: '都道府県別の補助金・助成金の掲載状況（47都道府県の比較）', description: `47都道府県の、県の制度・市区町村の制度・個人向けの制度の掲載件数を比較。掲載件数の多い都道府県、県と市区町村の制度の割合を、出典と調査時点つきで集計しました。`, lead: '47都道府県の、自治体の補助金・助成金の掲載状況を、件数で比べました。', sections, kicker: '都道府県別の掲載状況', related: [['../area/index.html', '地域から探す'], ...CTA] };
}

function pagePrograms(asOf, now) {
  const biz = LOCAL_PROGRAMS;
  const res = RESIDENT_PROGRAMS;
  const typeBiz = sorted(count(biz, (p) => p.type));
  const typeRes = sorted(count(res, (p) => p.type));
  const stageLabel = { planning: '創業前（準備中）', early: '創業直後〜創業して数年', established: '事業が安定した事業者' };
  const stages = sorted(count(biz, (p) => p.stages || [])).map(([k, v]) => [stageLabel[k] || k, v]);
  const catRows = RESIDENT_CATEGORIES.map((c) => [c, res.filter((p) => p.category === c).length]).sort((a, b) => b[1] - a[1]);
  const allInd = biz.filter((p) => p.industries === 'all').length;
  const thisMonth = jst(now).slice(0, 7);
  const dl = (list) => sorted(count(list.filter((p) => p.deadline && /^\d{4}-\d{2}/.test(p.deadline) && p.deadline.slice(0, 7) >= thisMonth), (p) => p.deadline.slice(0, 7))).sort((a, b) => a[0].localeCompare(b[0]));
  const dlBiz = dl(biz);
  const dlRes = dl(res);
  const withDl = (list) => list.filter((p) => p.deadline && /^\d{4}-\d{2}/.test(p.deadline)).length;
  const monthJa = (k) => `${Number(k.slice(5))}月（${k.slice(0, 4)}年）`;
  const sections = [
    ['制度の種類：補助金・助成金・融資・給付', [
      P('自治体の制度を、種類ごとに数えました。'),
      '        <h3>事業者・創業者向け</h3>', bars(typeBiz),
      '        <h3>個人向け（住まい・暮らし）</h3>', bars(typeRes),
      P(`事業者向けでは、<strong>補助金が最も多く、次に融資</strong>です。創業時の資金は、補助金だけでなく、融資（利子補給や信用保証料の補助を含む）も、あわせて検討できます。個人向けでは、補助金が大半です。`),
    ].join('\n')],
    ['対象になる人：創業前から、事業が安定した方まで', [
      P('事業者向けの制度が、どの段階の事業者を対象にしているかを数えました（1つの制度が、複数の段階を対象にする場合があります）。'),
      bars(stages),
      P(`業種を限らない制度は${n(allInd)}件（事業者向けの${Math.round((allInd / biz.length) * 100)}%）です。業種を限る制度は、飲食、小売、製造、美容などに分かれます。`),
    ].join('\n')],
    ['個人向けの分野：何の制度が多いか', [
      P('個人向け（住まい・暮らし）の制度を、分野ごとに数えました。'),
      bars(catRows),
      P(`<strong>${esc(catRows[0][0])}</strong>と<strong>${esc(catRows[1][0])}</strong>の制度が多くなっています。お住まいの市区町村に、どの制度があるかは、<a href="../area/index.html">地域から探す</a>で確認できます。`),
    ].join('\n')],
    ['締切が決まっている制度の、月ごとの件数', [
      P(`締切の日付を公表している制度だけを、月ごとに数えました（事業者向けは掲載の${n(biz.length)}件のうち${n(withDl(biz))}件、個人向けは${n(res.length)}件のうち${n(withDl(res))}件。<strong>残りは、締切が決まっていない、または、公式の案内で確認が必要</strong>です）。${esc(thisMonth.replace('-', '年'))}月以降を表示しています。`),
      '        <h3>事業者・創業者向け</h3>', bars(dlBiz.map(([k, v]) => [monthJa(k), v])),
      '        <h3>個人向け</h3>', bars(dlRes.map(([k, v]) => [monthJa(k), v])),
      P('年度末（2027年1月〜3月）と、年末（12月）に、締切が集まっています。年度の予算で動く制度が多いためです。気になる制度は、早めに公式の案内を確認してください。'),
    ].join('\n')],
    ['このデータについて', dataBox({ source: LOCAL_SOURCE, scope: `自治体の事業者向けの制度${n(biz.length)}件、個人向けの制度${n(res.length)}件`, asOf, method: '制度の種類・対象段階・分野・締切の月を、データの項目ごとに数えています。締切が空のものは、月の集計から除いています。', caution: `${CAUTION_COVERAGE} 締切は、公式の案内で、必ず最新の日付を確認してください。` })],
  ];
  return { file: 'programs.html', title: '補助金の種類・対象・分野の内訳（自治体の制度の集計）', description: '自治体の補助金・助成金・融資を、種類・対象（創業前〜事業が安定した方）・個人向けの分野・締切の月ごとに集計。どの制度が多いか、締切はいつ集まるかを、出典と調査時点つきで整理しました。', lead: '自治体の制度を、種類・対象・分野・締切の月で集計しました。', sections, kicker: '制度の内訳', related: CTA };
}

function pageStartup(asOf) {
  const rows = cityRows();
  const withStartup = rows.filter((r) => r.startup > 0);
  const top = [...rows].sort((a, b) => b.startup - a.startup || b.total - a.total).slice(0, 15);
  const table = TABLE(['市区町村', '都道府県', '創業前・創業直後に使える制度', '事業者向けの制度（全体）', '個人向けの制度'], [...rows].sort((a, b) => b.startup - a.startup || b.total - a.total || a.name.localeCompare(b.name, 'ja')).filter((r) => r.total || r.resident).map((r) => [`<a href="../area/${r.slug}.html">${esc(r.name)}</a>`, esc(r.pref), n(r.startup), n(r.total), n(r.resident)]));
  const sections = [
    ['創業向けの制度が多い市区町村（上位15）', [P('創業前〜創業直後の方が対象になる、事業者向けの制度の件数です。'), bars(top.map((r) => [`<a href="../area/${r.slug}.html">${esc(r.name)}</a>（${esc(r.pref)}）`, r.startup]))].join('\n')],
    ['この集計から分かること', [
      P(`ページのある${n(rows.length)}市区町村のうち、創業前・創業直後の方が使える制度を掲載しているのは、<strong>${n(withStartup.length)}市区町村</strong>です。創業の支援は、家賃・設備・広告費の補助、融資の利子補給、創業塾などの相談の支援まで、市区町村ごとに内容が違います。`),
      P('創業を考えるときは、<strong>住む市区町村、事業を行う市区町村の、両方</strong>の制度を確認しましょう。多くの制度は、事業の所在地が対象の条件になっています。'),
    ].join('\n')],
    ['市区町村の一覧', `        <p>創業向けの制度の件数が多い順です。市区町村名から、制度の一覧ページへ進めます。掲載のない市区町村は、除いています。</p>\n${table}`],
    ['このデータについて', dataBox({ source: LOCAL_SOURCE, scope: `当サイトにページのある${n(rows.length)}市区町村の、事業者向け・個人向けの制度`, asOf, method: '事業者向けの制度のうち、対象の段階が「創業前」または「創業直後」を含むものを、「創業前・創業直後に使える制度」として数えています。', caution: `${CAUTION_COVERAGE} 掲載のない市区町村にも、制度がある場合があります。市区町村の公式サイトで確認してください。` })],
  ];
  return { file: 'startup-map.html', title: '市区町村の創業支援マップ｜創業前・創業直後に使える制度の掲載状況', description: `創業前・創業直後の方が使える補助金・助成金・融資の、市区町村ごとの掲載件数を一覧にしました。制度の多い市区町村、都道府県、事業者向け・個人向けの件数を、出典と調査時点つきで集計しています。`, lead: '創業・開業を考える方が使える自治体の制度を、市区町村ごとに集計しました。', sections, kicker: '創業支援マップ', related: [['../who/startup.html', '創業・副業を始める方へ'], ['../area/index.html', '地域から探す'], ...CTA] };
}

// 今週の公募ダイジェスト（jGrants のデータ）
export function digestFor(items, now) {
  // jGrants の制度だけ（独自に補った制度＝ est や、解説＝ guide、自治体の制度＝ local は除く）
  const open = (items || []).filter((g) => g.id && g.t && g.e && !g.est && !g.guide && !g.local && g.au !== 'p' && Date.parse(g.e) >= now);
  const isNew = (g) => g.s && Date.parse(g.s) <= now && now - Date.parse(g.s) <= 7 * DAY;
  const closing = (g) => Date.parse(g.e) - now <= 14 * DAY;
  return {
    total: open.length,
    fresh: open.filter(isNew).sort((a, b) => Date.parse(b.s) - Date.parse(a.s)),
    closing: open.filter(closing).sort((a, b) => Date.parse(a.e) - Date.parse(b.e)),
    big: [...open].filter((g) => g.m).sort((a, b) => b.m - a.m).slice(0, 5),
  };
}

// 募集中の件数の推移（data/research-history.json。毎朝の記録）。記録が2日分以上あるときだけ出す
function historySection(history = loadHistory()) {
  const days = (history.days || []).slice(-30);
  if (days.length < 2) return [];
  const md = (iso) => { const [, m, d] = iso.split('-').map(Number); return `${m}/${d}`; };
  const first = days[0];
  const last = days[days.length - 1];
  const diff = last.total - first.total;
  return [['募集中の件数の推移（毎日の記録）', [
    P(`国の制度（jGrants）の募集中の件数を、毎朝記録しています。直近${days.length}日間（${esc(md(first.date))}〜${esc(md(last.date))}）で、${n(first.total)}件から${n(last.total)}件へ、${diff === 0 ? '同じ件数でした' : `${n(Math.abs(diff))}件${diff > 0 ? '増えました' : '減りました'}`}。`),
    bars(days.map((x) => [esc(md(x.date)), x.total])),
    P(`いちばん新しい記録（${esc(md(last.date))}）：全国向け${n(last.national)}件／30日以内に締切${n(last.soon30)}件／直近7日間に受付開始${n(last.fresh7)}件。記録は、${esc(dateJa(history.days[0].date))}から始めています。`),
  ].join('\n')]];
}

function pageDigest(asOf, now, items) {
  const d = digestFor(items, now);
  const has = d.total > 0;
  const li = (g, meta) => `          <li><a href="../grants/${encodeURIComponent(g.id)}.html">${esc(g.t)}</a>　<span class="area-meta">${meta}｜${esc(String(g.a || '全国'))}</span></li>`;
  const list = (arr, meta, limit = 15) => arr.length ? `        <ul>\n${arr.slice(0, limit).map((g) => li(g, meta(g))).join('\n')}\n        </ul>${arr.length > limit ? `\n        <p class="area-meta">ほか${n(arr.length - limit)}件。<a href="../search.html?sort=end">検索ページ</a>で、すべて確認できます。</p>` : ''}` : P('該当する制度は、ありません。');
  const left = (g) => `締切：${esc(dateJa(String(g.e).slice(0, 10)))}（あと${Math.max(0, Math.ceil((Date.parse(g.e) - now) / DAY))}日）`;
  const started = (g) => `受付開始：${esc(dateJa(String(g.s).slice(0, 10)))}`;
  const sections = has ? [
    ['今週の動き', P(`${esc(dateJa(jst(now)))}時点で、国の制度（jGrants）の募集中は<strong>${n(d.total)}件</strong>です。直近7日間に受付が始まった制度は<strong>${n(d.fresh.length)}件</strong>、14日以内に締切を迎える制度は<strong>${n(d.closing.length)}件</strong>です。`)],
    ...historySection(),
    ['直近7日間に受付が始まった制度', list(d.fresh, started)],
    ['14日以内に締切を迎える制度（締切の近い順）', list(d.closing, left)],
    ['このデータについて', dataBox({ source: 'デジタル庁「Jグランツ」の公開データ（補助金の公募情報）', scope: 'jGrantsに掲載されている、募集中の補助金・助成金（自治体の独自制度などjGrantsにないものは含みません）', asOf, method: '受付開始日が直近7日以内のものを「新着」、締切が14日以内のものを「締切が近い」として、毎日自動で集計しています。', caution: '国の電子申請（jGrants）に掲載された制度だけの集計です。金額・条件は、必ず公式の案内で確認してください。' })],
  ] : [
    ['準備中', P('このページは、国の制度（jGrants）のデータを取り込んだあとに、毎日自動で更新します。現在は、データを準備しています。')],
    ['このデータについて', dataBox({ source: 'デジタル庁「Jグランツ」の公開データ', scope: 'jGrantsに掲載されている、募集中の補助金・助成金', asOf, method: '受付開始日・締切日から、毎日自動で集計します。', caution: '集計の準備ができるまでは、数字を表示しません。' })],
  ];
  return { file: 'digest.html', title: '今週の補助金公募ダイジェスト｜新着・締切が近い公募（毎日更新）', description: '国の補助金・助成金（jGrants）の、直近7日間に始まった公募と、14日以内に締切を迎える公募を、毎日自動で集計。募集中の件数と合わせて、今週の動きを確認できます。', lead: '国の補助金・助成金の、新しく始まった公募と、締切が近い公募を、毎日更新でまとめています。', sections, kicker: '今週の公募ダイジェスト', related: [['../news/index.html', '補助金ニュース'], ['../search.html?within=90&sort=end', '締切が近い補助金'], ...CTA], noindex: !has };
}

function pageMethods(asOf) {
  const sections = [
    ['データの集め方', [
      P('国の制度は、デジタル庁「Jグランツ」の公開データを毎日取り込んでいます。自治体の制度は、各自治体・実施機関の公式の案内（公開情報）を確認し、当サイトで整理して、データにしています。'),
      P('自治体の制度は、数が多く、更新も頻繁なため、<strong>掲載は、順次の追加・確認</strong>です。すべての制度を網羅しているわけではありません。'),
    ].join('\n')],
    ['集計のルール', `        <ul>
          <li><strong>数字には、出典と調査時点を付けます。</strong>各ページの「このデータについて」で確認できます。</li>
          <li><strong>確認できない数字は、推測で埋めません。</strong>金額・締切が未確認の制度は、「要確認」と表示し、ゼロや平均では扱いません。</li>
          <li><strong>制度と、公募の回を分けて考えます。</strong>同じ制度でも、年度や公募回で、条件が変わるためです。</li>
          <li><strong>地域の優劣や、順位は、示しません。</strong>掲載数は、当サイトの調べた範囲の違いを含むためです。</li>
          <li><strong>採択率などの実績の数字は、公式の公表値で、申請数と採択数が同じ公募回で確認できるものだけ</strong>を、扱う予定です。</li>
        </ul>`],
    ['更新の方針', `        <ul>
          <li>国の制度のデータ（今週の公募ダイジェスト、募集中の件数）：毎日、自動で更新します。</li>
          <li>自治体の制度の統計（都道府県別、制度の内訳、創業支援マップ）：制度のデータを追加・確認したときに、更新します。調査時点は、各ページに表示しています。</li>
        </ul>`],
    ['ご指摘について', P('数字や制度の内容に、誤りや古い情報があれば、<a href="../consult.html">お問い合わせ</a>からお知らせください。確認のうえ、修正します。')],
  ];
  return { file: 'methods.html', title: 'データの作り方・出典・更新方針｜補助金データ', description: '補助金データの集め方、集計のルール（出典と調査時点の表示、推測しない、順位を示さない）、更新の方針をまとめました。数字の見方と、注意点も説明しています。', lead: '補助金データの、集め方と、集計のルール、更新の方針です。', sections, kicker: 'データの作り方', related: [['index.html', '補助金データのトップ'], ['../policy/sources.html', '出典・更新方針（サイト全体）'], ...CTA] };
}

function pageBody(page, asOf) {
  return articleBody({ section: SECTION, kicker: page.kicker, title: page.title.split('｜')[0], lead: page.lead, sections: page.sections, related: page.related, banner: BANNER, updated: asOf });
}

export function buildAll({ out = join(PUBLIC, 'research'), now = Date.now(), items } = {}) {
  const asOf = dateJa(jst(now));
  const rows = prefRows();
  const bizTotal = LOCAL_PROGRAMS.length;
  const resTotal = RESIDENT_PROGRAMS.length;
  if (!items) {
    const f = join(PUBLIC, 'grants', 'search.json');
    items = existsSync(f) ? JSON.parse(readFileSync(f, 'utf-8')).items : [];
  }
  const pages = [
    pageIndex(asOf, { rows, bizTotal, resTotal }),
    pagePrefectures(asOf, { rows }),
    pagePrograms(asOf, now),
    pageStartup(asOf),
    pageDigest(asOf, now, items),
    pageMethods(asOf),
  ];
  mkdirSync(out, { recursive: true });
  for (const p of pages) {
    writeArticle(out, 'research', p.file, { title: p.title.replace(/｜補助金ネット$/, ''), description: p.description, body: pageBody(p, asOf) });
    if (p.noindex) {
      const f = join(out, p.file);
      writeFileSync(f, readFileSync(f, 'utf-8').replace('<meta name="robots" content="index, follow">', '<meta name="robots" content="noindex, follow">'));
    }
  }
  return pages.map((p) => p.file);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(`補助金データを生成：${buildAll().length} ページ`);
