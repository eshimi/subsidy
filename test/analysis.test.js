import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { yen, amountBand, quantile, deadlineBuckets, catOf, analyzeLocal, analyzeDetails, analyzeJgrants, rateClass, gapAnalysis, monthlyReport, diffIds, monthSum } from '../scripts/lib/analysis.mjs';
import { withDiff } from '../scripts/update-research-history.mjs';
import { computeAnalysis } from '../scripts/update-analysis.mjs';
import { buildAnalysisPages } from '../scripts/build-analysis-pages.mjs';

const NOW = Date.parse('2026-10-14T00:00:00+09:00');

test('analysis: 金額は文中の最大値を取り出し、帯に分ける', () => {
  assert.equal(yen('上限50万円（補助率1/2）'), 500000);
  assert.equal(yen('最大1,200万円、または2億円'), 2e8);
  assert.equal(yen('補助率2/3'), null);
  assert.equal(amountBand(99999), '10万円未満');
  assert.equal(amountBand(1e6), '100〜500万円');
  assert.equal(amountBand(null), '金額の記載なし／率のみ');
  assert.equal(quantile([5, 1, 3, null, 2, 4], 0.5), 3);
  assert.equal(quantile([], 0.5), null);
});

test('analysis: 締切を日数の帯に分け、締切のない制度は数えない', () => {
  const b = deadlineBuckets([{ deadline: '2026-10-10' }, { deadline: '2026-10-14' }, { deadline: '2026-11-20' }, { deadline: '2027-02-10' }, { deadline: '2027-06-30' }, { deadline: null }, {}], NOW);
  assert.deepEqual(b, { withDeadline: 5, expired: 1, d30: 1, d60: 1, d90: 0, d180: 1, later: 1 });
  assert.equal(monthSum([['2026-11', 3], ['2026-12', 5], ['2027-03', 2], ['2027-04', 9]], '2026-12', '2027-03'), 7);
});

test('analysis: 目的が付いていない制度は、融資なら融資、それ以外は名前と説明から推定する', () => {
  assert.equal(catOf({ cat: '創業・起業' }), '創業・起業');
  assert.equal(catOf({ type: '融資', name: 'A資金' }), '融資・利子補給');
  assert.equal(catOf({ type: '補助金', name: '店舗改装', summary: '空き店舗の活用' }), '空き店舗・商店街');
  assert.equal(catOf({ type: '補助金', name: 'ホームページ制作の補助' }), 'IT・デジタル');
  assert.equal(catOf({ type: '補助金', name: '表彰', summary: '' }), 'その他');
});

test('analysis: 事業者向けの集計（種類・金額・ステージ）', () => {
  const L = [
    { type: '補助金', level: 'municipality', cat: '創業・起業', stages: ['planning', 'early'], industries: 'all', amount: '上限30万円', deadline: '2026-12-31' },
    { type: '融資', level: 'prefecture', cat: '融資・利子補給', stages: ['established'], industries: ['food'], amount: '2,000万円' },
    { type: '補助金', level: 'municipality', stages: ['early'], industries: 'all', amount: '補助率1/2' },
  ];
  const a = analyzeLocal(L, NOW);
  assert.equal(a.n, 3);
  assert.deepEqual(a.type, [['補助金', 2], ['融資', 1]]);
  assert.equal(a.nonLoanN, 2);
  assert.equal(a.withAmountN, 1);
  assert.equal(a.noAmount, 1);
  assert.equal(a.unclassified, 1);
  assert.deepEqual(a.stageCat.find((r) => r[0] === '創業・起業'), ['創業・起業', 1, 1, 0, 1]);
  assert.equal(a.allIndustries, 2);
  assert.equal(a.loanMedian, 2e7);
  assert.equal(a.noDeadline, 2);
});

test('analysis: 補助率の表記を分類する', () => {
  assert.equal(rateClass('補助対象経費の３／４'), '3/4以上');
  assert.equal(rateClass('1/2以内'), '1/2');
  assert.equal(rateClass('2/3'), '2/3');
  assert.equal(rateClass('10/10'), '10/10（全額）');
  assert.equal(rateClass('公募要領をご確認ください。'), '公募要領を参照');
  assert.equal(rateClass('定額'), '定額・上限額方式');
  assert.equal(rateClass(''), '記載なし');
});

test('analysis: jGrants の詳細と、募集中の全件の集計', () => {
  const d = analyzeDetails({ a: { purpose: '設備整備・IT導入をしたい', industry: '製造業、小売業', rate: '1/2', projectEnd: '2027-03-31' }, b: { purpose: 'A / B / C / D', industry: '', rate: '' } });
  assert.equal(d.n, 2);
  assert.deepEqual(d.purposeBreadth, { one: 1, few: 0, many: 1 });
  assert.equal(d.industryBreadth.narrow, 1);
  assert.deepEqual(d.projectEnd, [['2027-03', 1]]);
  const grants = [
    { id: '1', area: '全国', max: 5e5, start: '2026-10-01', end: '2026-10-31', employees: '制約なし' },
    { id: '2', area: '東京都', max: null, start: '2026-09-01', end: '2027-03-31', employees: '制約なし' },
    { id: '3', area: '全国', max: 3e7, start: '2026-01-01', end: '2026-01-31' },
  ];
  const j = analyzeJgrants(grants, NOW);
  assert.equal(j.total, 2);
  assert.equal(j.national, 1);
  assert.deepEqual(j.maxBand.find(([k]) => k === '100万円未満'), ['100万円未満', 1]);
  assert.deepEqual(j.maxBand.find(([k]) => k === '上限額の記載なし'), ['上限額の記載なし', 1]);
  assert.deepEqual(j.employees, [['制約なし', 2]]);
  assert.equal(j.leftDays.reduce((t, [, v]) => t + v, 0), 2);
});

test('analysis: 地域×目的の空白（市区町村の独自制度と県の制度を分けて数える）', () => {
  const L = [
    { name: 'A市の創業補助', level: 'municipality', cat: '創業・起業', cities: ['A市'], prefectures: ['甲県'] },
    { name: '甲県の販路', level: 'prefecture', cat: '販路開拓・PR', cities: [], prefectures: ['甲県'] },
  ];
  const cities = [{ name: 'A市', pref: '甲県' }, { name: 'B市', pref: '甲県' }];
  const g = gapAnalysis(L, cities, ['甲県', '乙県']);
  const biz = g.cats.find((c) => c.cat === '創業・起業');
  assert.deepEqual([biz.cityLevel, biz.withPref, biz.none], [1, 1, 1]);
  const sales = g.cats.find((c) => c.cat === '販路開拓・PR');
  assert.deepEqual([sales.cityLevel, sales.withPref, sales.none], [0, 2, 0]);
  assert.deepEqual(g.byPref, [{ pref: '甲県', cities: 2, cat: Object.fromEntries(g.cats.map((c) => [c.cat, c.cat === '創業・起業' ? 1 : 0])) }]);
  assert.deepEqual(g.missing['創業・起業'], [['甲県', ['B市']]]);
});

test('analysis: 月次は月ごとに集め、新規掲載・募集終了の合計を出す', () => {
  const days = [
    { date: '2026-10-01', total: 100, national: 40, soon30: 10, fresh7: 5 },
    { date: '2026-10-02', total: 104, national: 41, soon30: 12, fresh7: 6, added: 6, removed: 2 },
    { date: '2026-10-03', total: 101, national: 40, soon30: 11, fresh7: 4, added: 1, removed: 4 },
    { date: '2026-11-01', total: 90, national: 30, soon30: 8, fresh7: 3, added: 0, removed: 11 },
  ];
  const m = monthlyReport(days);
  assert.deepEqual(m.map((x) => x.month), ['2026-11', '2026-10']);
  const oct = m[1];
  assert.equal(oct.days, 3);
  assert.equal(oct.avgTotal, 102);
  assert.deepEqual([oct.minTotal, oct.maxTotal], [100, 104]);
  assert.deepEqual([oct.added, oct.removed, oct.diffDays], [7, 6, 2]);
  assert.equal(monthlyReport([{ date: '2026-10-01', total: 1, national: 1, soon30: 0, fresh7: 0 }])[0].added, null);
});

test('history: ID の差で新規掲載・募集終了を数え、同じ日の再実行では最初の結果を引き継ぐ', () => {
  assert.deepEqual(diffIds(['a', 'b', 'c'], ['b', 'c', 'd', 'e']), { added: 2, removed: 1 });
  const rec = { date: '2026-10-15', total: 4 };
  // 最初の1日：前回の一覧がないので、差は付けない
  assert.deepEqual(withDiff(rec, ['a'], null, null), { rec, snapshot: { date: '2026-10-15', ids: ['a'] } });
  // 翌日：前回の一覧との差
  const next = withDiff(rec, ['b', 'c', 'd', 'e'], { date: '2026-10-14', ids: ['a', 'b', 'c'] }, null);
  assert.deepEqual([next.rec.added, next.rec.removed], [2, 1]);
  assert.equal(next.snapshot.date, '2026-10-15');
  // 同じ日の再実行：一覧は上書きせず、その日の最初の差を残す
  const again = withDiff(rec, ['b', 'c', 'd', 'e', 'f'], next.snapshot, next.rec);
  assert.deepEqual([again.rec.added, again.rec.removed], [2, 1]);
  assert.equal(again.snapshot, next.snapshot);
});

test('analysis: 分析結果から事業向け・個人向けを含む6ページを作る（jGrants が取れない日は、前回の国の制度の結果を引き継ぐ）', () => {
  const prev = { jgrants: { total: 77, national: 50, asOf: '2026-10-13', maxBand: [['100万円未満', 7]], maxMedian: 1e6, maxN: 10, spanDays: [['30日以内', 3]], spanMedian: 45, leftDays: [['14日以内', 2]], employees: [['制約なし', 5]] } };
  const a = computeAnalysis({ now: NOW, grants: null, details: {}, previous: prev });
  assert.equal(a.jgrants.total, 77);
  assert.equal(computeAnalysis({ now: NOW, grants: null, details: {}, previous: null }).jgrants, null);
  const out = mkdtempSync(join(tmpdir(), 'analysis-'));
  const files = buildAnalysisPages({ out, now: NOW, analysis: a, history: { days: [] } });
  assert.deepEqual(files, ['business.html', 'personal.html', 'gaps.html', 'monthly.html', 'quality.html', 'changes.html']);
  const html = readFileSync(join(out, 'business.html'), 'utf-8');
  assert.match(html, /事業向けリサーチデータ/);
  assert.ok(!html.includes('住民向け'));
  assert.match(html, /国の制度（jGrants）：募集中の全件/);
  assert.match(html, /77件/);
  const personal = readFileSync(join(out, 'personal.html'), 'utf-8');
  assert.match(personal, /個人向けリサーチデータ/);
  assert.match(personal, /耐震/);
  assert.ok(!personal.includes('国の制度（jGrants）'));
  assert.match(readFileSync(join(out, 'monthly.html'), 'utf-8'), /<meta name="robots" content="noindex, follow">/);
  assert.match(readFileSync(join(out, 'gaps.html'), 'utf-8'), /掲載されていない/);
  // 毎日の記録が2日分以上あれば、月次レポートを公開する
  buildAnalysisPages({ out, now: NOW, analysis: a, history: { days: [{ date: '2026-10-13', total: 10, national: 5, soon30: 1, fresh7: 1 }, { date: '2026-10-14', total: 12, national: 6, soon30: 2, fresh7: 2, added: 3, removed: 1 }] } });
  const monthly = readFileSync(join(out, 'monthly.html'), 'utf-8');
  assert.match(monthly, /<meta name="robots" content="index, follow">/);
  assert.match(monthly, /新規掲載/);
});
