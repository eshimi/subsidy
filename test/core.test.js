import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classifyBusiness } from '../src/classifier.js';
import { normalizeZip, guessPrefecture, lookupPostalCode } from '../src/postal.js';
import { matchPrograms } from '../src/matcher.js';
import { searchJGrants } from '../src/jgrants.js';
import { createApp } from '../src/server.js';

const json = (body, status = 200) => async () => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const offline = async () => { throw new Error('network down'); };

test('classifier: 業種と属性タグを判定する', () => {
  const r = classifyBusiness('商店街の空き店舗でカフェを開き、ネットショップでも販売。アルバイトを雇う予定');
  assert.ok(r.industries.includes('food'));
  assert.ok(r.tags.includes('store'));
  assert.ok(r.tags.includes('ec'));
  assert.ok(r.tags.includes('hiring'));
});

test('classifier: 英字キーワードは単語境界で判定する', () => {
  assert.ok(classifyBusiness('AIを使った SaaS を作る').industries.includes('it'));
  assert.ok(!classifyBusiness('suite ホテル').industries.includes('it'));
});

test('postal: 全角・ハイフンを正規化し、都道府県を推定できる', () => {
  assert.equal(normalizeZip('１５０-０００１'), '1500001');
  assert.equal(normalizeZip('123'), null);
  assert.equal(guessPrefecture('1500001'), '東京都');
  assert.equal(guessPrefecture('5300001'), '大阪府');
  assert.equal(guessPrefecture('0600001'), '北海道');
  assert.equal(guessPrefecture('9800001'), '宮城県');
});

test('postal: zipcloud の結果を使い、失敗時は推定にフォールバック', async () => {
  const ok = await lookupPostalCode('1500001', {
    fetchImpl: json({ status: 200, results: [{ address1: '東京都', address2: '渋谷区', address3: '神宮前' }] }),
  });
  assert.deepEqual([ok.prefecture, ok.city, ok.source], ['東京都', '渋谷区', 'zipcloud']);

  const est = await lookupPostalCode('2310001', { fetchImpl: offline });
  assert.deepEqual([est.prefecture, est.city, est.source], ['神奈川県', null, 'estimated']);

  await assert.rejects(lookupPostalCode('12', { fetchImpl: offline }), { status: 400 });
  await assert.rejects(lookupPostalCode('1500000', { fetchImpl: json({ status: 200, results: null }) }), { status: 404 });
});

test('matcher: 地域・業種・必須条件・ステージで絞り込む', () => {
  const tokyo = { prefecture: '東京都', city: '渋谷区' };
  const nagano = { prefecture: '長野県', city: '松本市' };
  const cafe = { industries: ['food'], tags: ['store'], stage: 'planning' };

  const t = matchPrograms(cafe, tokyo).map((p) => p.id);
  assert.ok(t.includes('tokyo-sogyo-josei'));
  assert.ok(t.includes('city-akitenpo'));
  assert.ok(!t.includes('chiho-kigyo'), '東京都は地方創生起業支援金の対象外');
  assert.ok(!t.includes('career-up'), '雇用予定がなければ雇用系助成金は出さない');
  assert.ok(!t.includes('it-donyu'), '開業準備中は開業済み向け制度を出さない');
  assert.ok(!t.includes('shuno-kaishi'), '農業以外に就農支援は出さない');

  const n = matchPrograms(cafe, nagano);
  assert.ok(!n.some((p) => p.id.startsWith('tokyo-')));
  const city = n.find((p) => p.id === 'city-sogyo-hojo');
  assert.equal(city.name, '長野県松本市の創業支援補助金（独自制度）');
  assert.match(city.url, /google\.com\/search/);

  const farm = matchPrograms({ industries: ['agriculture'], tags: ['relocation', 'young'] }, nagano);
  assert.equal(farm[0].id, 'shuno-kaishi');
  assert.ok(farm.some((p) => p.id === 'iju-shienkin'));
});

test('jgrants: 結果を整形し、対象外地域を除外する', async () => {
  const fetchImpl = json({
    result: [
      { id: 'a1', title: '飲食店支援補助金', target_area_search: '長野県', subsidy_max_limit: 1000000, acceptance_end_datetime: '2026-12-01T00:00:00Z' },
      { id: 'b2', title: '全国向け補助金', target_area_search: '全国' },
      { id: 'c3', title: '他県の補助金', target_area_search: '大阪府' },
    ],
  });
  const r = await searchJGrants(['創業', '飲食'], '長野県', { fetchImpl });
  assert.equal(r.available, true);
  assert.deepEqual(r.items.map((i) => i.id).sort(), ['jgrants-a1', 'jgrants-b2']);
  assert.equal(r.items.find((i) => i.id === 'jgrants-a1').amount, '上限 1,000,000円');

  const down = await searchJGrants(['創業'], '長野県', { fetchImpl: offline });
  assert.equal(down.available, false);
});

test('API: /api/search がオフラインでも結果を返す', async () => {
  const app = createApp({ fetchImpl: offline, analyze: async () => null });
  const server = app.listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const res = await fetch(`${base}/api/search`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ description: 'アプリ開発の会社を作りたい', zip: '530-0001', stage: 'planning', city: '大阪市北区' }),
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.address.prefecture, '大阪府');
    assert.equal(body.address.city, '大阪市北区');
    assert.equal(body.analysis.mode, 'keyword');
    assert.ok(body.analysis.industries.some((i) => i.key === 'it'));
    assert.ok(body.programs.length > 5);
    assert.equal(body.live.available, false);

    const bad = await fetch(`${base}/api/search`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ description: 'x', zip: '1500001' }),
    });
    assert.equal(bad.status, 400);
  } finally {
    server.close();
  }
});

test('classifier: 食材や商店街の言及で農業・小売と誤判定しない', () => {
  const r = classifyBusiness('地元の野菜を使ったカフェを商店街の空き店舗で開きたい');
  assert.deepEqual(r.industries, ['food']);
  assert.ok(classifyBusiness('脱サラして就農し、有機栽培の野菜を育てたい').industries.includes('agriculture'));
});
