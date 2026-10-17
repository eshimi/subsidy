// 「補助金データ」コーナーの、分析ページを作る（public/research/）。
//  ・business.html：事業向けリサーチデータ（自治体の事業者向け制度と国の制度：種類・目的・対象・金額・地域・締切・データの質）
//  ・personal.html：個人向けリサーチデータ（住まい・暮らしの制度：分野・種類・金額・地域・締切・データの質）
//  ・gaps.html：地域×目的の空白マップ（市区町村ごとに、どの目的の制度が掲載されていないか）
//  ・quality.html：品質レポート（取得できた項目のそろい具合・終了後の残り方・重複）
//  ・changes.html：制度変更履歴（上限額・締切などの変更前後。毎日の記録から）
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
import { FIELDS } from './lib/program-history.mjs';
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

// ページ冒頭の説明枠は本文を押し下げるので、末尾の「このデータについて」の直前へ回す
const INTRO_TITLES = ['このレポートについて', 'このリサーチの範囲', 'このページの見方'];
function introLast(sections) {
  const i = sections.findIndex(([t]) => INTRO_TITLES.includes(t));
  const j = sections.findIndex(([t]) => t === 'このデータについて');
  if (i !== 0 || j < 0) return sections;
  const rest = sections.slice(1);
  rest.splice(j - 1, 0, sections[0]);
  return rest;
}

function pageBusiness(a, asOf) {
  const { local: L, details: D, jgrants: J } = a;
  const typeCount = (t) => (L.type.find(([k]) => k === t) || [, 0])[1];
  const grantish = GRANTISH.reduce((t, k) => t + typeCount(k), 0);
  const loan = typeCount('融資');
  const prefLevels = L.pref.map((r) => r.prefLevel);
  const lw = winterShare(L.months, a.asOf);
  const [q1, q2, q3] = L.quartiles;
  const topCat = L.cat[0];
  const stageRow = (name) => L.stageCat.find((r) => r[0] === name);
  const equip = stageRow('設備投資・省エネ');
  const indLabel = (k) => INDUSTRIES[k]?.label || k;

  const findings = [
    `事業者向けの自治体制度${n(L.n)}件のうち、返済不要の補助金・助成金・給付金は<strong>${n(grantish)}件（${pct(grantish, L.n)}%）</strong>、融資は<strong>${n(loan)}件（${pct(loan, L.n)}%）</strong>です。`,
    `目的別では、<strong>${esc(topCat[0])}が${n(topCat[1])}件（${pct(topCat[1], L.n)}%）</strong>で最多です。${equip ? `設備投資・省エネ（${n(equip[4])}件）のうち、開業準備中から使える制度は${n(equip[1])}件で、おもに既存の事業者向けです。` : ''}`,
    q2 !== null ? `融資を除き、金額が読み取れた${n(L.withAmountN)}件の中央値は<strong>約${man(q2)}</strong>です（4分の1は${man(q1)}以下、4分の3は${man(q3)}以下）。100万円以上は${pct(L.over100, L.withAmountN)}%です。` : '',
    lw.total ? `締切が書かれた事業者向けの制度${n(lw.total)}件のうち、<strong>${n(lw.w)}件（${lw.share}%）が12月〜3月</strong>に集まります。年度末に集中します。` : '',
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
      P(`事業者・創業者向けの補助金・助成金・融資のデータを、種類・目的・対象・金額・締切・地域の切り口で集計した、毎日更新のレポートです。自治体の事業者向け制度${n(L.n)}件${J ? `、国の制度（jGrants）の募集中${n(J.total)}件` : ''}を対象にしています。`),
      P('地域ごとの空白は<a href="gaps.html">地域×目的の空白マップ</a>、国の制度の月ごとの動きは<a href="monthly.html">月次レポート</a>で確認できます。住まい・暮らしの制度（耐震・空き家・太陽光・移住など）は<a href="personal.html">個人向けリサーチデータ</a>をご覧ください。'),
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
    ['締切', [
      P(`締切が書かれた制度${n(L.near.withDeadline)}件だけを、月ごとに数えました。残りは、通年受付などで締切が決まっていない、または公式の案内で確認が必要な制度です。`),
      bars(L.months.map(([k, v]) => [monthJa(k), v])),
      P(`これからの12月〜3月に締切がある制度は${lw.share}%です。年度末に向けて積み上がります。年度の予算で動く制度が多いためです。`),
      '        <h3>締切まであと何日か（作成日時点）</h3>',
      bars([['締切を過ぎた', L.near.expired], ['30日以内', L.near.d30], ['31〜60日', L.near.d60], ['61〜90日', L.near.d90], ['91〜180日', L.near.d180], ['181日以上', L.near.later]].filter(([k, v]) => v || k !== '181日以上')),
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
      TABLE(['項目', '件数（割合）'], [
        ['金額の記載なし（融資を除く）', `${n(L.noAmount)}件（${pct(L.noAmount, L.nonLoanN)}%）`],
        ['締切の記載なし', `${n(L.noDeadline)}件（${pct(L.noDeadline, L.n)}%）`],
        ['締切を過ぎた制度（締切のある制度に対する割合）', `${n(L.near.expired)}件（${pct(L.near.expired, L.near.withDeadline)}%）`],
        ['目的が未分類', `${n(L.unclassified)}件（${pct(L.unclassified, L.n)}%）`],
      ]),
      P('金額・締切が書かれていない制度は、比較や絞り込みに使えません。掲載のたびに、公式の案内で確認して補っています。'),
    ].join('\n')],
    ['このデータについて', dataBox({
      source: `${LOCAL_SOURCE}。国の制度は${SRC_JG}`,
      scope: `自治体の事業者向け制度${n(L.n)}件${J ? `、国の制度（jGrants）の募集中${n(J.total)}件` : ''}`,
      asOf,
      method: '制度の種類・目的・対象・締切の月を、データの項目ごとに数えています。金額は、説明文の円の表記から取り出した最大値です。目的・対象は、当サイトの分類で、公式の分類ではありません。',
      caution: `${CAUTION_COVERAGE} 金額・締切は、必ず公式の案内で最新の内容を確認してください。`,
    })],
  ];
  return {
    file: 'business.html',
    title: '事業向けリサーチデータ｜補助金・助成金・融資の種類・目的・金額・締切・地域（毎日更新）',
    description: `事業者・創業者向けの補助金・助成金・融資のデータ（自治体の制度${n(L.n)}件${J ? `・国の制度${n(J.total)}件` : ''}）を、種類・目的・対象・金額・締切・地域で集計した、毎日更新のリサーチデータです。出典と調査時点つき。`,
    lead: '事業者・創業者向けの補助金・助成金・融資のデータを、種類・目的・対象・金額・締切・地域の切り口で集計した、毎日更新のリサーチデータです。',
    sections: introLast(sections), kicker: '事業向けリサーチデータ',
    related: [['personal.html', '個人向けリサーチデータ'], ['gaps.html', '地域×目的の空白マップ'], ['monthly.html', '月次レポート'], ...CTA],
  };
}

function pagePersonal(a, asOf) {
  const { resident: R } = a;
  const rn = (rows) => rows.map(([k, v]) => [esc(k), v]);
  const typeOf = (k) => (R.type.find(([t]) => t === k) || [, 0])[1];
  const muni = (R.level.find(([k]) => k === 'municipality') || [, 0])[1];
  const rw = winterShare(R.months, a.asOf);
  const top = R.category[0];
  const second = R.category[1];
  const med = R.median;
  const medTop = med[0];
  const medLow = med[med.length - 1];
  const prefLevels = R.pref.map((r) => r.prefLevel);
  const prefTop = [...R.pref].sort((x, y) => y.total - x.total).slice(0, 10).map((r) => [`<a href="../area/pref-${PREF_SLUGS[r.pref]}.html">${esc(r.pref)}</a>`, r.total]);
  const muniSorted = [...R.pref].sort((x, y) => y.muni - x.muni);
  const findings = [
    `個人向け（住まい・暮らし）の自治体制度は<strong>${n(R.n)}件</strong>で、${R.category.length}分野あります。実施主体は市区町村が<strong>${pct(muni, R.n)}%</strong>で、ほとんどが市区町村の制度です。`,
    `分野別では、<strong>${esc(top[0])}（${n(top[1])}件）と${esc(second[0])}（${n(second[1])}件）</strong>で、全体の${pct(top[1] + second[1], R.n)}%を占めます。`,
    medTop ? `金額の中央値は、<strong>${esc(medTop[0])}が${man(medTop[1])}</strong>と大きく、${esc(medLow[0])}は${man(medLow[1])}と小口です。件数が多い分野ほど金額が大きいわけではありません。` : '',
    `種類は、補助金が<strong>${pct(typeOf('補助金'), R.n)}%</strong>、助成金が${pct(typeOf('助成金'), R.n)}%、給付が${pct(typeOf('給付'), R.n)}%です。`,
    rw.total ? `締切が書かれた${n(rw.total)}件のうち、これからの12月〜3月に締切があるのは<strong>${n(rw.w)}件（${rw.share}%）</strong>です。年度末に集まります。` : '',
    R.near.withDeadline ? `締切が書かれた制度のうち、すでに締切を過ぎたものは${n(R.near.expired)}件（${pct(R.near.expired, R.near.withDeadline)}%）、30日以内に締切を迎えるものは${n(R.near.d30)}件です。` : '',
  ].filter(Boolean);
  const sections = [
    ['このリサーチの範囲', [
      P(`住まいや暮らしの補助金・助成金・給付（耐震・空き家・太陽光・蓄電池・移住・バリアフリー・子育て・EV充電など）のデータを、分野・金額・締切・地域の切り口で集計した、毎日更新のリサーチデータです。自治体の個人向け制度${n(R.n)}件を対象にしています。`),
      P('事業者・創業者向けの制度は<a href="business.html">事業向けリサーチデータ</a>をご覧ください。お住まいの地域の制度は、<a href="../hantei.html?for=personal">AI補助金判定（個人向け）</a>や<a href="../area/index.html">地域から探す</a>で確認できます。'),
    ].join('\n')],
    ['要点', UL(findings)],
    ['分野と種類', [
      P(`個人向けの制度${n(R.n)}件を、分野と種類で数えました。`),
      '        <h3>分野別の制度数</h3>', bars(rn(R.category)),
      '        <h3>制度の種類</h3>', bars(rn(R.type)),
      P(`実施主体は、市区町村が${n(muni)}件（${pct(muni, R.n)}%）、都道府県が${n(R.n - muni)}件（${pct(R.n - muni, R.n)}%）です。住まいや暮らしの制度は、お住まいの市区町村の窓口で受け付けるものが大半です。`),
    ].join('\n')],
    ['金額', [
      P('説明文にある円の表記から機械的に取り出した金額（文中の最大値）で集計しました。1件あたりの上限額や、定額の給付額が混ざります。'),
      '        <h3>分野別の金額の中央値</h3>', bars(R.median.map(([k, v]) => [esc(k), v]), '', man),
      '        <h3>金額帯別の制度数</h3>', bars(rn(R.amountBand)),
      P(`${n(R.noAmount)}件（${pct(R.noAmount, R.n)}%）は、率だけ、または金額の記載がなく、比べられません。金額は分野によって大きく違い、耐震や移住のように1件あたりの金額が大きい分野と、太陽光・蓄電池や省エネ住宅のように小口の分野に分かれます。`),
    ].join('\n')],
    ['地域', [
      P('個人向けの制度の掲載数が多い10都道府県です（県の制度と、市区町村の制度の合計）。'),
      bars(prefTop),
      P(`<strong>この差は、制度の数の差とは限りません。</strong>県単位の制度は、どの県も${Math.min(...prefLevels)}〜${Math.max(...prefLevels)}件ほどで、差は、市区町村の制度をどこまで掲載したかで生まれます（市区町村の制度は、${esc(muniSorted[0].pref)}が${n(muniSorted[0].muni)}件、${esc(muniSorted[muniSorted.length - 1].pref)}が${n(muniSorted[muniSorted.length - 1].muni)}件）。順位として読まないでください。`),
      P('お住まいの市区町村の制度は、<a href="../area/index.html">地域から探す</a>で確認できます。'),
    ].join('\n')],
    ['締切', [
      P(`締切が書かれた制度${n(R.near.withDeadline)}件だけを、月ごとに数えました。残りは、通年受付や予算がなくなり次第の制度などで、公式の案内で確認が必要です。`),
      bars(R.months.map(([k, v]) => [monthJa(k), v])),
      P(`これからの12月〜3月に締切がある制度は${rw.share}%です。年度の予算で動く制度が多く、年度末に向けて積み上がります。`),
      '        <h3>締切まであと何日か（作成日時点）</h3>',
      bars([['締切を過ぎた', R.near.expired], ['30日以内', R.near.d30], ['31〜60日', R.near.d60], ['61〜90日', R.near.d90], ['91〜180日', R.near.d180], ['181日以上', R.near.later]].filter(([k, v]) => v || k !== '181日以上')),
    ].join('\n')],
    ['データの質', [
      TABLE(['項目', '件数（割合）'], [
        ['金額の記載なし', `${n(R.noAmount)}件（${pct(R.noAmount, R.n)}%）`],
        ['締切の記載なし', `${n(R.noDeadline)}件（${pct(R.noDeadline, R.n)}%）`],
        ['締切を過ぎた制度（締切のある制度に対する割合）', `${n(R.near.expired)}件（${pct(R.near.expired, R.near.withDeadline)}%）`],
      ]),
      P('金額・締切が書かれていない制度は、比較や絞り込みに使えません。公式の案内で、最新の内容を確認してください。'),
    ].join('\n')],
    ['このデータについて', dataBox({
      source: LOCAL_SOURCE,
      scope: `自治体の個人向け（住まい・暮らし）の制度${n(R.n)}件`,
      asOf,
      method: '制度の分野・種類・締切の月を、データの項目ごとに数えています。金額は、説明文の円の表記から取り出した最大値です。',
      caution: `${CAUTION_COVERAGE} 金額・締切は、必ず公式の案内で最新の内容を確認してください。`,
    })],
  ];
  return {
    file: 'personal.html',
    title: '個人向けリサーチデータ｜住まい・暮らしの補助金の分野・金額・締切・地域（毎日更新）',
    description: `耐震・空き家・太陽光・移住など、個人向け（住まい・暮らし）の自治体の補助金・助成金（${n(R.n)}件）を、分野・金額・締切・地域で集計した、毎日更新のリサーチデータです。出典と調査時点つき。`,
    lead: '住まい・暮らしの補助金・助成金・給付のデータを、分野・金額・締切・地域の切り口で集計した、毎日更新のリサーチデータです。',
    sections: introLast(sections), kicker: '個人向けリサーチデータ',
    related: [['business.html', '事業向けリサーチデータ'], ['../hantei.html?for=personal', '個人の方（住まい・車・子育て）の補助金判定'], ['../area/index.html', '地域から探す'], ...CTA],
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
      '<strong>制度を探す方</strong>：お住まいの市区町村に、その目的の独自制度が掲載されていなくても、県の制度や国の制度があります。<a href="../search.html">キーワードで探す</a>で、国の制度とあわせて確認してください。',
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
    sections: introLast(sections), kicker: '地域×目的の空白', related: [['business.html', '事業向けリサーチデータ'], ['../area/index.html', '地域から探す'], ...CTA],
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
    sections: introLast(sections), kicker: '月次レポート', related: [['business.html', '事業向けリサーチデータ'], ['digest.html', '今週の公募ダイジェスト'], ...CTA], noindex: !ready,
  };
}


const Q_LABEL = {
  end: ['締切日がある', '募集中の制度のうち、締切日が登録されている割合'],
  start: ['受付開始日がある', '受付開始日が登録されている割合'],
  max: ['上限額がある', '上限額が数字で登録されている割合（定額・率のみの制度は含まれません）'],
  detail: ['詳細を取得できた', '制度ごとの詳細（概要・目的・補助率など）を取得できた割合'],
  rate: ['補助率がある', '詳細に、補助率の記載がある割合'],
  purpose: ['目的の分類がある', '詳細に、目的の区分がある割合'],
  fresh: ['30日以内に確認した', '詳細を、直近30日以内に取得した割合'],
};
const fmtVal = (f, v) => (v === null || v === undefined ? '（なし）' : f === 'max' ? man(v) : esc(String(v)));

function pageQuality(a, asOf) {
  const Q = a.quality;
  const ready = !!Q && Q.open > 0;
  const sections = ready ? [
    ['このレポートについて', P('国の制度（jGrants）について、<strong>取得できた項目がどこまでそろっているか</strong>を毎日数えています。数字の信頼性を、読む人が判断できるようにするためのレポートです。公式の公募要領での確認とは別の、項目の「そろい具合」の指標です。')],
    ['項目のそろい具合（募集中の制度）', [
      KEY([[n(Q.open), '件', '募集中の制度'], [`${Q.metrics.find((m) => m.key === 'end').rate}`, '%', '締切日がある'], [`${Q.metrics.find((m) => m.key === 'max').rate}`, '%', '上限額がある'], [`${Q.metrics.find((m) => m.key === 'detail').rate}`, '%', '詳細を取得できた']]),
      TABLE(['指標', '件数', '割合', '意味'], Q.metrics.map((m) => [esc(Q_LABEL[m.key][0]), n(m.n), `${m.rate}%`, esc(Q_LABEL[m.key][1])])),
      bars(Q.metrics.map((m) => [Q_LABEL[m.key][0], m.rate])),
    ].join('\n')],
    ['終了後の残り方・重複', [
      UL([
        `取得した${n(Q.listed)}件のうち、締切を過ぎているものは<strong>${n(Q.expired)}件（${Q.expiredRate}%）</strong>です。集計では、これらを「募集中」に含めていません。`,
        Q.dupGroups ? `募集中の制度に、<strong>制度名がほぼ同じものが${n(Q.dupGroups)}組（${n(Q.dupItems)}件）</strong>あります。募集回が違う別の公募のことも、同じ制度の二重登録のこともあります。` : '募集中の制度に、制度名がほぼ同じものはありません。',
      ]),
    ].join('\n')],
    ['このレポートの見方', UL([
      '割合が低い項目は、その項目を使った集計（たとえば金額の中央値）が、一部の制度だけの数字になることを意味します。',
      '「上限額がある」の低さは、定額や補助率だけで示される制度が多いことも反映しています。データの欠陥とは限りません。',
      '「30日以内に確認した」は、当サイトが取得し直した時期の指標で、制度の内容が最新であることの保証ではありません。',
    ])],
    ['このデータについて', dataBox({ source: SRC_JG, scope: 'jGrantsに掲載されている制度のうち、募集中のもの（自治体の独自制度などjGrantsにないものは含みません）', asOf: dateJa(Q.asOf || a.asOf), method: '取得した各制度の項目の有無を数え、募集中の制度に対する割合を出しています。制度名の重複は、記号・空白を除いた文字列の一致で判定しています。', caution: '項目の「そろい具合」の指標で、情報の正確さを保証するものではありません。申請の前に、必ず公式の公募要領をご確認ください。' })],
  ] : [
    ['準備中', P('このページは、国の制度（jGrants）のデータを取得できたあとに表示します。毎朝の自動更新で作られます。')],
    ['このデータについて', dataBox({ source: SRC_JG, scope: 'jGrantsに掲載されている、募集中の補助金・助成金', asOf, method: '取得した各制度の項目の有無を数えます。', caution: '準備中です。' })],
  ];
  return {
    file: 'quality.html',
    title: '補助金データの品質レポート｜項目のそろい具合・終了後の残り方・重複（国の制度）',
    description: '国の補助金・助成金（jGrants）について、締切日・上限額・補助率・詳細などの項目がどこまでそろっているか、終了後の残り方や重複を毎日集計して公開する品質レポートです。',
    lead: '数字をどこまで信頼して使えるかを判断できるよう、取得できた項目のそろい具合を公開します。',
    sections: introLast(sections), kicker: 'データ品質', related: [['methods.html', 'データの作り方・出典・更新方針'], ['business.html', '事業向けリサーチデータ'], ['changes.html', '制度の変更履歴'], ...CTA], noindex: !ready,
  };
}

function pageChanges(a, asOf) {
  const C = a.changes;
  const ready = !!C && C.tracked > 0;
  const g = (id) => `<a href="../grants/${esc(id)}.html">`;
  const rows = (C?.items || []).map((i) => [esc(i.d.slice(5).replace('-', '/')), `${g(i.id)}${esc(i.title || i.id)}</a>`, esc(FIELDS[i.f]), `${fmtVal(i.f, i.from)} → ${fmtVal(i.f, i.to)}`]);
  const since = C?.since ? dateJa(C.since) : '';
  const sections = ready ? [
    ['このページについて', P(`国の制度（jGrants）の掲載内容を毎日記録し、<strong>上限額・締切日・受付開始日・対象地域・制度名が変わったとき</strong>に、変更前後を残しています。記録は${esc(since)}から始まりました。制度の内容を上書きしないので、あとから「いつ、何が変わったか」を確認できます。`)],
    [`直近${C.days}日の変更`, [
      KEY([[n(C.tracked), '件', '記録している制度'], [n(C.programsChanged), '件', `変更があった制度（直近${C.days}日）`], [n(C.byField.end), '件', '締切日の変更'], [n(C.byField.max), '件', '上限額の変更']]),
      C.n ? [
        P(`直近${C.days}日に、<strong>${n(C.programsChanged)}件の制度で、合計${n(C.n)}件の変更</strong>がありました。締切日の変更のうち<strong>${n(C.extended)}件は延長</strong>です。上限額は、引き上げが${n(C.maxUp)}件、引き下げが${n(C.maxDown)}件でした。`),
        TABLE(['日付', '制度', '項目', '変更前 → 変更後'], rows),
        C.n > rows.length ? P(`新しい順に、${n(rows.length)}件を表示しています。`) : '',
      ].filter(Boolean).join('\n') : P('直近の期間に、変更は記録されていません。'),
    ].join('\n')],
    ['このページの見方', UL([
      'ここに出る変更は、jGrantsの掲載値が変わったことを示します。公式の公募要領の改定と、必ず一致するとは限りません。',
      '同じ制度が、募集回ごとに別のIDで登録されることがあります。その場合は、変更ではなく新規掲載として扱われます。',
      '申請の前に、必ず公式の公募要領で最新の条件をご確認ください。',
    ])],
    ['このデータについて', dataBox({ source: SRC_JG, scope: 'jGrantsに掲載されている制度（自治体の独自制度などjGrantsにないものは含みません）', asOf: dateJa(C.asOf || a.asOf), method: '毎朝の取得結果を前日の記録と比べ、制度名・受付開始日・締切日・上限額・対象地域が変わった制度に、変更前後と日付を記録しています。最初に見えた制度は、変更として扱いません。', caution: '掲載値の変化の記録で、公式の変更の確認ではありません。記録を始めた日より前の変更は含みません。' })],
  ] : [
    ['準備中', P('このページは、国の制度（jGrants）の毎日の記録が始まったあとに表示します。毎朝の自動更新で作られます。')],
    ['このデータについて', dataBox({ source: SRC_JG, scope: 'jGrantsに掲載されている、補助金・助成金', asOf, method: '毎朝の取得結果を前日と比べ、変更前後を記録します。', caution: '準備中です。' })],
  ];
  return {
    file: 'changes.html',
    title: '補助金の制度変更履歴｜上限額・締切日・受付期間の変更を記録（国の制度）',
    description: '国の補助金・助成金（jGrants）の、上限額・締切日・受付開始日・対象地域・制度名の変更を、毎日の記録から変更前後つきで公開します。締切の延長や上限額の変更を確認できます。',
    lead: '制度の上限額や締切が、いつ、どう変わったかを、毎日の記録から公開します。',
    sections: introLast(sections), kicker: '制度変更履歴', related: [['monthly.html', '月次レポート'], ['quality.html', '品質レポート'], ['digest.html', '今週の公募ダイジェスト'], ...CTA], noindex: !ready,
  };
}

export function buildAnalysisPages({ out = join(PUBLIC, 'research'), now = Date.now(), analysis, history = loadHistory() } = {}) {
  const a = analysis || loadAnalysis() || computeAnalysis({ now });
  const asOf = dateJa(a.asOf);
  const pages = [pageBusiness(a, asOf), pagePersonal(a, asOf), pageGaps(a, asOf), pageMonthly(history, asOf), pageQuality(a, asOf), pageChanges(a, asOf)];
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
