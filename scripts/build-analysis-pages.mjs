// 「補助金データ」コーナーの、分析ページを作る（public/research/）。
//  ・analysis.html：分析レポート（種類・目的・対象・金額・地域・締切・国の制度・データの質）
//  ・gaps.html：地域×目的の空白マップ（市区町村ごとに、どの目的の制度が掲載されていないか）
//  ・monthly.html：月次レポート（国の制度の募集中の件数、新規掲載・募集終了の数。毎日の記録から）
// 数字は、data/analysis-latest.json（scripts/update-analysis.mjs が作る）と、data/research-history.json から読む。
// 使い方：node scripts/build-analysis-pages.mjs（デプロイの build:grants で実行）。何度実行しても同じ結果（同じ日なら）。
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PREF_SLUGS } from '../src/data/prefectures.js';
import { INDUSTRIES } from '../src/data/taxonomy.js';
import { TABLE, articleBody, writeArticle } from './lib/article.mjs';
import { esc } from './lib/site-shell.mjs';
import { bars, P, n, dateJa, dataBox, CAUTION_COVERAGE, LOCAL_SOURCE, CTA, SECTION, BANNER } from './build-research-pages.mjs';
import { loadAnalysis, computeAnalysis } from './update-analysis.mjs';
import { loadHistory } from './update-research-history.mjs';
import { STAGE_LABEL, STAGE_KEYS, CATS, monthlyReport, monthSum } from './lib/analysis.mjs';

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const man = (v) => (v >= 1e8 ? `${(v / 1e8).toLocaleString('ja-JP')}億円` : v >= 1e4 ? `${(v / 1e4).toLocaleString('ja-JP', { maximumFractionDigits: 1 })}万円` : `${n(v)}円`);
const monthJa = (k) => `${Number(k.slice(5))}月（${k.slice(0, 4)}年）`;
const UL = (items) => `        <ul>\n${items.map((i) => `          <li>${i}</li>`).join('\n')}\n        </ul>`;
const KEY = (items) => `        <ul class="rs-key">\n${items.map(([b, u, e]) => `          <li><b>${b}</b><span>${u}</span><em>${e}</em></li>`).join('\n')}\n        </ul>`;
const GRANTISH = ['補助金', '助成金', '給付金'];
// 年度末（これから来る12月〜翌年3月）に締切がある制度の割合。asOf（YYYY-MM-DD）が4月〜12月なら今年の12月〜来年の3月、1〜3月なら去年の12月〜今年の3月
const winterShare = (months, asOf) => {
  const [y, m] = asOf.split('-').map(Number);
  const start = m >= 4 ? y : y - 1;
  const total = months.reduce((t, [, v]) => t + v, 0);
  const w = monthSum(months, `${start}-12`, `${start + 1}-03`);
  return { total, w, share: pct(w, total) };
};
const SRC_JG = 'デジタル庁「Jグランツ」の公開データ';

function pageAnalysis(a, asOf) {
  const { local: L, resident: R, details: D, jgrants: J } = a;
  const typeCount = (t) => (L.type.find(([k]) => k === t) || [, 0])[1];
  const grantish = GRANTISH.reduce((t, k) => t + typeCount(k), 0);
  const loan = typeCount('融資');
  const prefLevels = L.pref.map((r) => r.prefLevel);
  const lw = winterShare(L.months, a.asOf);
  const rw = winterShare(R.months, a.asOf);
  const [q1, q2, q3] = L.quartiles;
  const topCat = L.cat[0];
  const stageRow = (name) => L.stageCat.find((r) => r[0] === name);
  const equip = stageRow('設備投資・省エネ');
  const indLabel = (k) => INDUSTRIES[k]?.label || k;

  const findings = [
    `事業者向けの自治体制度${n(L.n)}件のうち、返済不要の補助金・助成金・給付金は<strong>${n(grantish)}件（${pct(grantish, L.n)}%）</strong>、融資は<strong>${n(loan)}件（${pct(loan, L.n)}%）</strong>です。`,
    `目的別では、<strong>${esc(topCat[0])}が${n(topCat[1])}件（${pct(topCat[1], L.n)}%）</strong>で最多です。${equip ? `設備投資・省エネ（${n(equip[4])}件）のうち、開業準備中から使える制度は${n(equip[1])}件で、おもに既存の事業者向けです。` : ''}`,
    q2 !== null ? `融資を除き、金額が読み取れた${n(L.withAmountN)}件の中央値は<strong>約${man(q2)}</strong>です（4分の1は${man(q1)}以下、4分の3は${man(q3)}以下）。100万円以上は${pct(L.over100, L.withAmountN)}%です。` : '',
    lw.total ? `締切が書かれた事業者向けの制度${n(lw.total)}件のうち、<strong>${n(lw.w)}件（${lw.share}%）が12月〜3月</strong>に集まります。住民向けは${n(rw.total)}件のうち${rw.share}%です。年度末に集中します。` : '',
    `都道府県単位の制度は、どの県も<strong>${Math.min(...prefLevels)}〜${Math.max(...prefLevels)}件</strong>でほぼ同数です。地域による差は、おもに市区町村の制度の掲載量で生まれます。`,
    L.near.withDeadline ? `締切が書かれた事業者向けの制度のうち、<strong>${n(L.near.expired)}件（${pct(L.near.expired, L.near.withDeadline)}%）は、すでに締切を過ぎています</strong>。検索では「受付終了」として扱います。` : '',
    J ? `国の制度（jGrants）の募集中は<strong>${n(J.total)}件</strong>（${dateJa(J.asOf)}時点）で、うち全国向けが${n(J.national)}件です。` : '',
  ].filter(Boolean);

  const stageTable = TABLE(['目的', ...STAGE_KEYS.map((s) => STAGE_LABEL[s]), '制度数'], L.stageCat.slice(0, 9).map((r) => [esc(r[0]), n(r[1]), n(r[2]), n(r[3]), `<strong>${n(r[4])}</strong>`]));
  const topInd = L.industries.slice(0, 4).map(([k, v]) => `${esc(indLabel(k))}${n(v)}件`).join('、');
  const prefTop = [...L.pref].sort((x, y) => y.total - x.total).slice(0, 10).map((r) => [`<a href="../area/pref-${PREF_SLUGS[r.pref]}.html">${esc(r.pref)}</a>`, r.total]);
  const muniSorted = [...L.pref].sort((x, y) => y.muni - x.muni);
  const grantSharePrefs = L.pref.filter((r) => r.total >= 15 && r.grantShare !== null).sort((x, y) => y.grantShare - x.grantShare);
  const rn = (rows) => rows.map(([k, v]) => [esc(k), v]);

  const sections = [
    ['このレポートについて', [
      P(`当サイトが掲載している補助金・助成金のデータを、種類・目的・対象・金額・締切・地域の切り口で集計した、毎日更新のレポートです。自治体の事業者向け制度${n(L.n)}件、住民向け制度${n(R.n)}件${J ? `、国の制度（jGrants）の募集中${n(J.total)}件` : ''}を対象にしています。`),
      P('地域ごとの空白は<a href="gaps.html">地域×目的の空白マップ</a>、国の制度の月ごとの動きは<a href="monthly.html">月次レポート</a>で確認できます。'),
    ].join('\n')],
    ['要点', UL(findings)],
    ['事業者向け：制度の種類と目的', [
      P(`自治体・公的機関の事業者向け制度${n(L.n)}件を、種類と目的で数えました。`),
      '        <h3>制度の種類</h3>', bars(rn(L.type)),
      '        <h3>目的別</h3>', bars(rn(L.cat)),
      P(`目的が付いていない制度が${n(L.unclassified)}件（${pct(L.unclassified, L.n)}%）あり、目的別の集計には含めていません。`),
      P(`県単位の制度で融資が占める割合は${pct(L.typeByLevel[0][2], L.typeByLevel[0][1])}%、市区町村の制度では${pct(L.typeByLevel[1][2], L.typeByLevel[1][1])}%です。`),
    ].join('\n')],
    ['事業者向け：誰が対象か', [
      P('制度ごとに、開業準備中・開業後1年未満・開業後1年以上のどれが対象かを数えました。1つの制度が複数にまたがるため、行の合計は制度数と一致しません。'),
      stageTable,
      P(`業種を限らない制度は${n(L.allIndustries)}件（${pct(L.allIndustries, L.n)}%）です。業種を限定した制度では、${topInd}などが多くなっています。`),
    ].join('\n')],
    ['事業者向け：金額', [
      P(`融資を除く${n(L.nonLoanN)}件を、金額帯で数えました。金額は、制度の説明文にある円の表記から機械的に取り出し、文中の最大値を使っています。`),
      bars(rn(L.amountBand)),
      q2 !== null ? P(`金額が読み取れた${n(L.withAmountN)}件の中央値は<strong>約${man(q2)}</strong>です。4分の1は${man(q1)}以下、4分の3は${man(q3)}以下で、${n(L.noAmount)}件（${pct(L.noAmount, L.nonLoanN)}%）は金額の記載がなく、比べられません。`) : '',
      L.loanMedian ? P(`融資の金額の中央値は${man(L.loanMedian)}です。`) : '',
    ].filter(Boolean).join('\n')],
    ['事業者向け：地域', [
      P('事業者向けの制度の掲載数が多い10都道府県です（県の制度と、市区町村の制度の合計）。'),
      bars(prefTop),
      P(`<strong>この差は、制度の数の差とは限りません。</strong>県単位の制度は、どの県も${Math.min(...prefLevels)}〜${Math.max(...prefLevels)}件でほぼ同数です。差は、市区町村の制度をどこまで掲載したかで生まれます（市区町村の制度は、${esc(muniSorted[0].pref)}が${n(muniSorted[0].muni)}件、${esc(muniSorted[muniSorted.length - 1].pref)}が${n(muniSorted[muniSorted.length - 1].muni)}件）。順位として読まないでください。`),
      grantSharePrefs.length ? P(`掲載が15件以上の県で見ると、返済不要の制度の割合は${grantSharePrefs[grantSharePrefs.length - 1].grantShare}%（${esc(grantSharePrefs[grantSharePrefs.length - 1].pref)}）から${grantSharePrefs[0].grantShare}%（${esc(grantSharePrefs[0].pref)}）まで幅があります。`) : '',
    ].filter(Boolean).join('\n')],
    ['住民向け：分野と金額', [
      P(`耐震・空き家・太陽光・移住など、住民向けの制度${n(R.n)}件を、分野で数えました。`),
      '        <h3>分野別の制度数</h3>', bars(rn(R.category)),
      '        <h3>分野別の金額の中央値</h3>', bars(R.median.map(([k, v]) => [esc(k), v]), '', man),
      P(`種類は${esc(R.type[0][0])}が${pct(R.type[0][1], R.n)}%、実施主体は市区町村が${pct((R.level.find(([k]) => k === 'municipality') || [, 0])[1], R.n)}%です。金額は、説明文から読み取れた最大値の中央値で、${n(R.noAmount)}件（${pct(R.noAmount, R.n)}%）は金額の記載がありません。`),
    ].join('\n')],
    ['締切', [
      P(`締切が書かれた制度だけを、月ごとに数えました（事業者向けは${n(L.near.withDeadline)}件、住民向けは${n(R.near.withDeadline)}件）。残りは、通年受付などで締切が決まっていない、または公式の案内で確認が必要な制度です。`),
      '        <h3>事業者向け</h3>', bars(L.months.map(([k, v]) => [monthJa(k), v])),
      '        <h3>住民向け</h3>', bars(R.months.map(([k, v]) => [monthJa(k), v])),
      P(`これからの12月〜3月に締切がある制度は、事業者向けで${lw.share}%、住民向けで${rw.share}%です。年度末に向けて積み上がります。年度の予算で動く制度が多いためです。`),
      '        <h3>締切まであと何日か（作成日時点）</h3>',
      bars([['締切を過ぎた', L.near.expired], ['30日以内', L.near.d30], ['31〜60日', L.near.d60], ['61〜90日', L.near.d90], ['91〜180日', L.near.d180], ['181日以上', L.near.later]].filter(([k, v]) => v || k !== '181日以上')),
      P(`上は事業者向けです。住民向けは、締切を過ぎたもの${n(R.near.expired)}件、30日以内${n(R.near.d30)}件、31〜60日${n(R.near.d60)}件、61〜90日${n(R.near.d90)}件、91日以上${n(R.near.d180 + R.near.later)}件です。`),
    ].join('\n')],
    ...(J ? [['国の制度（jGrants）：募集中の全件', [
      P(`${esc(dateJa(J.asOf))}時点で、jGrantsの募集中は<strong>${n(J.total)}件</strong>です。うち全国向けが${n(J.national)}件、都道府県を限定した制度が${n(J.total - J.national)}件です。`),
      '        <h3>上限額</h3>', bars(rn(J.maxBand)),
      J.maxMedian !== null ? P(`上限額が書かれた${n(J.maxN)}件の中央値は約${man(J.maxMedian)}です。`) : '',
      '        <h3>受付期間の長さ</h3>', bars(rn(J.spanDays)),
      J.spanMedian !== null ? P(`受付期間の中央値は${n(J.spanMedian)}日です。`) : '',
      '        <h3>締切まであと何日か</h3>', bars(rn(J.leftDays)),
      '        <h3>対象の従業員規模（記載の多い順）</h3>', bars(rn(J.employees)),
    ].filter(Boolean).join('\n')]] : [['国の制度（jGrants）：募集中の全件', P('国の制度の全件の集計は、jGrantsのデータを取り込んだ日から表示します。毎日の自動更新で、上限額・受付期間・締切までの日数・従業員規模を集計します。')]]),
    ...(D.n ? [['国の制度（jGrants）：詳細を保存した制度', [
      P(`詳細情報（目的・業種・補助率・事業の完了期限）を保存している${n(D.n)}件の集計です。募集中の全件ではありません。`),
      '        <h3>目的（複数選択、1件が複数に数えられます）</h3>', bars(rn(D.purpose.slice(0, 8))),
      '        <h3>補助率の表記</h3>', bars(rn(D.rateClass)),
      P(`補助率が数字で書かれた制度では、1/2・2/3・3/4以上がそれぞれ多くを占めます。「記載なし」「公募要領を参照」は、比べられません。`),
      P(`対象業種は、多くの業種（15以上）にわたる制度が${n(D.industryBreadth.wide)}件（${pct(D.industryBreadth.wide, D.n)}%）、一部の業種が${n(D.industryBreadth.mid)}件、1〜3業種に限った制度が${n(D.industryBreadth.narrow)}件（${pct(D.industryBreadth.narrow, D.n)}%）です。`),
      D.projectEndN ? P(`事業の完了期限が分かる${n(D.projectEndN)}件では、${esc(D.projectEnd.reduce((b, r) => (r[1] > b[1] ? r : b))[0].replace(/^(\d{4})-0?(\d+)$/, '$1年$2'))}月が最多（${n(D.projectEnd.reduce((b, r) => (r[1] > b[1] ? r : b))[1])}件）です。`) : '',
    ].filter(Boolean).join('\n')]] : []),
    ['データの質', [
      TABLE(['項目', '事業者向け', '住民向け'], [
        ['金額の記載なし（事業者向けは融資を除く）', `${n(L.noAmount)}件（${pct(L.noAmount, L.nonLoanN)}%）`, `${n(R.noAmount)}件（${pct(R.noAmount, R.n)}%）`],
        ['締切の記載なし', `${n(L.noDeadline)}件（${pct(L.noDeadline, L.n)}%）`, `${n(R.noDeadline)}件（${pct(R.noDeadline, R.n)}%）`],
        ['締切を過ぎた制度（締切のある制度に対する割合）', `${n(L.near.expired)}件（${pct(L.near.expired, L.near.withDeadline)}%）`, `${n(R.near.expired)}件（${pct(R.near.expired, R.near.withDeadline)}%）`],
        ['目的が未分類', `${n(L.unclassified)}件（${pct(L.unclassified, L.n)}%）`, '—'],
      ]),
      P('金額・締切が書かれていない制度は、比較や絞り込みに使えません。掲載のたびに、公式の案内で確認して補っています。'),
    ].join('\n')],
    ['このデータについて', dataBox({
      source: `${LOCAL_SOURCE}。国の制度は${SRC_JG}`,
      scope: `自治体の事業者向け制度${n(L.n)}件、住民向け制度${n(R.n)}件${J ? `、国の制度（jGrants）の募集中${n(J.total)}件` : ''}`,
      asOf,
      method: '制度の種類・目的・対象・締切の月を、データの項目ごとに数えています。金額は、説明文の円の表記から取り出した最大値です。目的・対象は、当サイトの分類で、公式の分類ではありません。',
      caution: `${CAUTION_COVERAGE} 金額・締切は、必ず公式の案内で最新の内容を確認してください。`,
    })],
  ];
  return {
    file: 'analysis.html',
    title: '補助金データ分析レポート｜種類・目的・金額・締切・地域の傾向（毎日更新）',
    description: `当サイトの補助金・助成金のデータ（自治体の事業者向け${n(L.n)}件・住民向け${n(R.n)}件${J ? `・国の制度${n(J.total)}件` : ''}）を、種類・目的・対象・金額・締切・地域で集計した、毎日更新のレポートです。出典と調査時点つき。`,
    lead: '掲載している補助金・助成金のデータを、種類・目的・対象・金額・締切・地域の切り口で集計した、毎日更新のレポートです。',
    sections, kicker: '分析レポート',
    related: [['gaps.html', '地域×目的の空白マップ'], ['monthly.html', '月次レポート'], ...CTA],
  };
}

function pageGaps(a, asOf) {
  const G = a.gaps;
  const sorted = [...G.cats].sort((x, y) => y.none - x.none);
  const table = TABLE(['目的', '市区町村の独自制度が掲載されている', '県の制度まで含めて掲載されている', 'どちらも掲載されていない'], G.cats.map((c) => [esc(c.cat), `${n(c.cityLevel)}（${pct(c.cityLevel, G.cityN)}%）`, `${n(c.withPref)}（${pct(c.withPref, G.cityN)}%）`, `<strong>${n(c.none)}（${pct(c.none, G.cityN)}%）</strong>`]));
  const ABBR = { '創業・起業': '創業', '空き店舗・商店街': '商店街', '設備投資・省エネ': '設備', '人材・雇用': '人材', 'IT・デジタル': 'IT', '販路開拓・PR': '販路', '事業承継': '承継', '研究開発・新事業': '研究開発', '融資・利子補給': '融資' };
  const nw = 'style="white-space:nowrap"';
  const matrix = `        <div class="table-wrap"><table class="feature-table" style="min-width:760px">
          <thead><tr><th scope="col" ${nw}>都道府県</th><th scope="col" ${nw}>市区町村</th>${CATS.map((c) => `<th scope="col" ${nw} title="${esc(c)}">${esc(ABBR[c])}</th>`).join('')}</tr></thead>
          <tbody>
${G.byPref.map((r) => `            <tr><th scope="row" ${nw}><a href="../area/pref-${PREF_SLUGS[r.pref]}.html">${esc(r.pref)}</a></th><td ${nw}>${n(r.cities)}</td>${CATS.map((c) => `<td ${nw}>${r.cat[c]}／${r.cities}</td>`).join('')}</tr>`).join('\n')}
          </tbody>
        </table></div>`;
  const lists = CATS.map((cat) => {
    const groups = G.missing[cat];
    const total = groups.reduce((t, [, names]) => t + names.length, 0);
    return `        <details><summary><strong>${esc(cat)}</strong>：${n(total)}市区町村</summary>\n${groups.map(([pref, names]) => `          <p class="area-meta"><strong>${esc(pref)}</strong>　${names.map(esc).join('、')}</p>`).join('\n')}\n        </details>`;
  }).join('\n');
  const sections = [
    ['このページの見方', [
      P(`ページのある${n(G.cityN)}市区町村について、事業者向けの制度が<strong>どの目的で掲載されているか</strong>を一覧にしました。「掲載されていない」は、<strong>制度がない</strong>という意味ではありません。当サイトが調べて掲載した範囲の空白です。掲載を増やす先を決める材料として、また、制度を探すときの手がかりとして使えます。`),
      P('目的は、創業・起業、空き店舗・商店街、設備投資・省エネ、人材・雇用、IT・デジタル、販路開拓・PR、事業承継、研究開発・新事業、融資・利子補給の9つです。目的が付いていない制度は、名前と説明から推定しています。'),
    ].join('\n')],
    ['目的別：どこまで掲載されているか', [
      table,
      P(`空白が大きい目的は、<strong>${esc(sorted[0].cat)}</strong>（${n(sorted[0].none)}市区町村）、<strong>${esc(sorted[1].cat)}</strong>（${n(sorted[1].none)}）、<strong>${esc(sorted[2].cat)}</strong>（${n(sorted[2].none)}）です。市区町村の独自制度が少ない目的ほど、県や国の制度を探すことが大切になります。`),
    ].join('\n')],
    ['都道府県別：市区町村の独自制度が掲載されている数', [
      P('各セルは、「その目的で、市区町村の独自制度が掲載されている市区町村の数／その県のページのある市区町村の数」です。見出しは、創業・起業、空き店舗・商店街、設備投資・省エネ、人材・雇用、IT・デジタル、販路開拓・PR、事業承継、研究開発・新事業、融資・利子補給の略称です（スマホでは、横にスクロールできます）。'),
      matrix,
    ].join('\n')],
    ['目的別：市区町村の独自制度が掲載されていない市区町村', [
      P('県の制度が掲載されている場合も、市区町村の独自制度の掲載がなければ、ここに含まれます。目的名を開くと、都道府県ごとの一覧が出ます。'),
      lists,
    ].join('\n')],
    ['空白の使い方', UL([
      '<strong>制度を探す方</strong>：お住まいの市区町村に、その目的の独自制度が掲載されていなくても、県の制度や国の制度があります。<a href="../search.html">AI・キーワードで探す</a>で、国の制度とあわせて確認してください。',
      '<strong>掲載を増やすとき</strong>：空白が大きい目的と、掲載が少ない地域から、公式の案内を確認して追加します。',
      '市区町村の公式サイトに、制度が載っている場合があります。公式の案内で、最新の内容を確認してください。',
    ])],
    ['このデータについて', dataBox({
      source: LOCAL_SOURCE,
      scope: `当サイトにページのある${n(G.cityN)}市区町村と、自治体の事業者向け制度`,
      asOf,
      method: '制度の対象の市区町村・都道府県と、目的の分類から、市区町村ごとに目的別の掲載の有無を数えています。県の制度は、その県のすべての市区町村に当てはまるものとして数えています。',
      caution: `${CAUTION_COVERAGE} 掲載がないことは、制度がないことを意味しません。`,
    })],
  ];
  return {
    file: 'gaps.html',
    title: '地域×目的の空白マップ｜市区町村ごとに、掲載されていない補助金の目的',
    description: `ページのある${n(G.cityN)}市区町村について、創業・設備投資・人材・IT・販路・事業承継などの目的別に、市区町村の独自制度が掲載されているかを一覧にしました。掲載の空白と、探し方の手がかりを、出典と調査時点つきで公開しています。`,
    lead: '市区町村ごとに、どの目的の補助金・助成金が掲載されていないかを、一覧にしました。',
    sections, kicker: '地域×目的の空白', related: [['analysis.html', '補助金データ分析レポート'], ['../area/index.html', '地域から探す'], ...CTA],
  };
}

function pageMonthly(history, asOf) {
  const months = monthlyReport(history.days);
  const days = (history.days || []).length;
  const ready = days >= 2;
  const md = (iso) => { const [, m, d] = iso.split('-').map(Number); return `${m}/${d}`; };
  const monthSection = (m) => {
    const partial = m.days < 28;
    const diff = m.added === null ? '' : `新規掲載は合計${n(m.added)}件、募集終了は合計${n(m.removed)}件（${n(m.diffDays)}日分の差）。`;
    return [`${monthJa(m.month)}${partial ? '（記録中）' : ''}`, [
      KEY([
        [n(m.last.total), '件', `月末（${md(m.last.date)}）の募集中`],
        [n(m.avgTotal), '件', '月の平均'],
        [m.added === null ? '—' : n(m.added), m.added === null ? '' : '件', '新規掲載（合計）'],
        [m.removed === null ? '—' : n(m.removed), m.removed === null ? '' : '件', '募集終了（合計）'],
      ]),
      P(`${m.days}日分の記録です（${md(m.first.date)}〜${md(m.last.date)}）。募集中の件数は、最少${n(m.minTotal)}件から最多${n(m.maxTotal)}件の間で動きました。月の始め（${md(m.first.date)}）は${n(m.first.total)}件、終わり（${md(m.last.date)}）は${n(m.last.total)}件でした。全国向けは平均${n(m.avgNational)}件、30日以内に締切を迎える制度は平均${n(m.avgSoon30)}件です。${diff}`),
      bars(m.daily.map((d) => [md(d.date), d.total])),
    ].join('\n')];
  };
  const sections = ready ? [
    ['このレポートについて', P(`国の制度（jGrants）の募集中の件数を、毎朝記録しています。ここでは、月ごとにまとめています。<strong>新規掲載</strong>は前日の記録になかった制度、<strong>募集終了</strong>は前日の記録にあって、いまはなくなった制度の数です（記録の開始日は${esc(dateJa(history.days[0].date))}）。`)],
    ...months.map(monthSection),
    ['このデータについて', dataBox({ source: SRC_JG, scope: 'jGrantsに掲載されている、募集中の補助金・助成金（自治体の独自制度などjGrantsにないものは含みません）', asOf, method: '毎朝、募集中の制度の件数と制度のIDの一覧を記録し、前回のIDの一覧との差から、新規掲載と募集終了を数えています。', caution: '記録のない日がある月は、日数が少なくなります。月の途中は「記録中」と表示します。募集終了には、締切を迎えた制度と、取り下げられた制度が含まれます。' })],
  ] : [
    ['準備中', P('このページは、毎朝の記録が2日分以上たまったあとに表示します。現在は、記録を始めたところです。')],
    ['このデータについて', dataBox({ source: SRC_JG, scope: 'jGrantsに掲載されている、募集中の補助金・助成金', asOf, method: '毎朝、募集中の件数と制度のIDの一覧を記録し、月ごとにまとめます。', caution: '記録がたまるまでは、数字を表示しません。' })],
  ];
  return {
    file: 'monthly.html',
    title: '補助金データ月次レポート｜募集中の件数・新規掲載・募集終了（国の制度）',
    description: '国の補助金・助成金（jGrants）の募集中の件数、新規掲載・募集終了の数を、毎日の記録から月ごとにまとめた月次レポートです。出典と調査時点つき。',
    lead: '国の補助金・助成金の、募集中の件数と、新規掲載・募集終了の数を、月ごとにまとめています。',
    sections, kicker: '月次レポート', related: [['analysis.html', '補助金データ分析レポート'], ['digest.html', '今週の公募ダイジェスト'], ...CTA], noindex: !ready,
  };
}

export function buildAnalysisPages({ out = join(PUBLIC, 'research'), now = Date.now(), analysis, history = loadHistory() } = {}) {
  const a = analysis || loadAnalysis() || computeAnalysis({ now });
  const asOf = dateJa(a.asOf);
  const pages = [pageAnalysis(a, asOf), pageGaps(a, asOf), pageMonthly(history, asOf)];
  mkdirSync(out, { recursive: true });
  for (const p of pages) {
    const body = articleBody({ section: SECTION, kicker: p.kicker, title: p.title.split('｜')[0], lead: p.lead, sections: p.sections, related: p.related, banner: BANNER, updated: asOf });
    writeArticle(out, 'research', p.file, { title: p.title.replace(/｜補助金ネット$/, ''), description: p.description, body });
    if (p.noindex) {
      const f = join(out, p.file);
      writeFileSync(f, readFileSync(f, 'utf-8').replace('<meta name="robots" content="index, follow">', '<meta name="robots" content="noindex, follow">'));
    }
  }
  return pages.map((p) => p.file);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(`分析ページを生成：${buildAnalysisPages().length} ページ`);
