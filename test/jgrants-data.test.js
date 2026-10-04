import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalize, areasOf, groupByArea, collect, prefFile } from '../scripts/fetch-jgrants.mjs';
import { rankGrants, cityCore, leadingMunicipality } from '../src/jgrants-rank.js';
import { runSearchCore } from '../src/search-core.js';

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const offline = async () => { throw new Error('network down'); };

test('normalize: API の1件をサイト用の形にする', () => {
  const item = normalize({ id: 'a0W1', title: ' 創業補助金 ', target_area_search: '東京都', subsidy_max_limit: '1000000', acceptance_end_datetime: '2026-12-01T15:00:00Z', target_number_of_employees: '従業員の制約なし' });
  assert.deepEqual(item, { id: 'a0W1', title: '創業補助金', area: '東京都', max: 1000000, start: null, end: '2026-12-01T15:00:00Z', employees: '従業員の制約なし' });
  assert.equal(normalize({ id: 1, name: 'B', subsidy_max_limit: 0 }).max, null);
});

test('areasOf / groupByArea: 全国と都道府県に振り分ける', () => {
  assert.deepEqual(areasOf('全国'), { national: true, prefectures: [] });
  assert.deepEqual(areasOf(''), { national: true, prefectures: [] });
  assert.deepEqual(areasOf('東京都 / 神奈川県'), { national: false, prefectures: ['東京都', '神奈川県'] });
  const { national, byPref } = groupByArea([{ id: '1', area: '全国' }, { id: '2', area: '東京都' }, { id: '3', area: '東京都、神奈川県' }]);
  assert.deepEqual(national.map((i) => i.id), ['1']);
  assert.deepEqual(byPref['東京都'].map((i) => i.id), ['2', '3']);
  assert.deepEqual(byPref['神奈川県'].map((i) => i.id), ['3']);
  assert.equal(prefFile('北海道'), 'pref-01.json');
  assert.equal(prefFile('東京都'), 'pref-13.json');
});

test('collect: キーワードごとの結果を ID で重複排除し、失敗したキーワードを記録する', async () => {
  const fetchImpl = async (url) => {
    const kw = new URL(url).searchParams.get('keyword');
    if (kw === '失敗') throw new Error('boom');
    return json({ result: kw === '創業' ? [{ id: '1', title: 'A', target_area_search: '全国' }, { id: '2', title: 'B', target_area_search: '東京都' }] : [{ id: '2', title: 'B', target_area_search: '東京都' }] });
  };
  const { items, failures } = await collect({ fetchImpl, keywords: ['創業', '店舗', '失敗'], delayMs: 0, log: () => {} });
  assert.deepEqual(items.map((i) => i.id).sort(), ['1', '2']);
  assert.deepEqual(failures, ['失敗']);
});

test('cityCore / leadingMunicipality: 市区町村名を取り出す', () => {
  assert.equal(cityCore('札幌市中央区'), '札幌市');
  assert.equal(cityCore('渋谷区'), '渋谷区');
  assert.equal(cityCore(null), null);
  assert.equal(leadingMunicipality('【八王子市】創業支援補助金'), '八王子市');
  assert.equal(leadingMunicipality('福岡市新規創業促進補助金'), '福岡市');
  assert.equal(leadingMunicipality('都市農業振興補助金'), null);
  assert.equal(leadingMunicipality('小規模事業者持続化補助金'), null);
});

const SAMPLE = [
  { id: '1', title: '【渋谷区】創業支援事業補助金', area: '東京都', max: 1000000, end: '2026-12-01T00:00:00Z', employees: '' },
  { id: '2', title: '【八王子市】創業支援補助金', area: '東京都', max: 500000, end: null, employees: '' },
  { id: '3', title: '小規模事業者持続化補助金（創業型）', area: '全国', max: 2000000, end: null, employees: '' },
  { id: '4', title: '東京都 飲食店の省エネ設備導入支援', area: '東京都', max: 30000000, end: null, employees: '' },
  { id: '5', title: '宇宙開発関連の研究補助', area: '全国', max: null, end: null, employees: '' },
];

test('rankGrants: 自分の市区町村・創業・業種で順位を付け、他の市区町村や無関係な制度を除く', () => {
  const r = rankGrants(SAMPLE, { industries: ['food'], tags: ['green'], address: { prefecture: '東京都', city: '渋谷区' } });
  const ids = r.items.map((i) => i.id);
  assert.equal(ids[0], 'jgrants-1');
  assert.ok(!ids.includes('jgrants-2'), '八王子市の制度は出さない');
  assert.ok(!ids.includes('jgrants-5'), '関連のない制度は出さない');
  assert.equal(r.matched, 3);
  const food = r.items.find((i) => i.id === 'jgrants-4');
  assert.equal(food.amount, '上限 3,000万円');
  assert.match(food.reasons.join(), /飲食/);
  assert.equal(r.items[0].url, 'https://www.jgrants-portal.go.jp/subsidy/1');
});

test('rankGrants: 市区町村がわからないときは、市区町村の制度に注意書きを付けて残す', () => {
  const r = rankGrants(SAMPLE, { industries: [], tags: [], address: { prefecture: '東京都', city: null } });
  const hachioji = r.items.find((i) => i.id === 'jgrants-2');
  assert.ok(hachioji);
  assert.match(hachioji.reasons.join(), /八王子市の制度です/);
});

test('runSearchCore: 取り込んだデータがあれば、それを関連度順に使う', async () => {
  const result = await runSearchCore(
    { description: '渋谷でカフェを開きたい', zip: '1500001', city: '渋谷区' },
    { fetchImpl: offline, loadGrants: async (pref) => ({ available: true, generatedAt: '2026-10-04T00:00:00Z', items: pref === '東京都' ? SAMPLE : [] }) },
  );
  assert.equal(result.live.source, 'dataset');
  assert.equal(result.live.total, 5);
  assert.equal(result.live.items[0].id, 'jgrants-1');

  const none = await runSearchCore({ description: 'カフェを開きたい', zip: '1500001' }, { fetchImpl: offline, loadGrants: async () => null, liveApi: false });
  assert.equal(none.live.available, false);
});
