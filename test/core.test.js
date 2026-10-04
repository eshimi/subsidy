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
  const app = createApp({ fetchImpl: offline, analyze: async () => null, loadGrants: async () => null });
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

test('matcher: 市区町村の独自制度は該当する市だけに表示する', () => {
  const now = new Date('2026-10-04T00:00:00+09:00');
  const store = { industries: ['food'], tags: ['store'], stage: 'planning' };
  const shibuya = matchPrograms(store, { prefecture: '東京都', city: '渋谷区' }, { now });
  const meguro = matchPrograms(store, { prefecture: '東京都', city: '目黒区' }, { now });
  assert.ok(shibuya.some((p) => p.id === 'shibuya-tenpo-kaigyo'));
  assert.ok(!meguro.some((p) => p.id === 'shibuya-tenpo-kaigyo'));

  // 政令市の区（札幌市中央区）にも一致し、締切前は open
  const sapporo = matchPrograms({ industries: [], tags: [], stage: 'planning' }, { prefecture: '北海道', city: '札幌市中央区' }, { now });
  const s = sapporo.find((p) => p.id === 'sapporo-shinki-sogyo');
  assert.equal(s.status, 'open');
  assert.match(s.reasons.join(), /札幌市中央区の独自制度/);

  // 市区町村が不明なら市の制度は出さない
  assert.ok(!matchPrograms(store, { prefecture: '北海道', city: null }, { now }).some((p) => p.id === 'sapporo-shinki-sogyo'));
});

test('matcher: 締切後は受付終了として順位を下げる', async () => {
  const { deadlineStatus } = await import('../src/matcher.js');
  const now = new Date('2026-10-04T12:00:00+09:00');
  assert.equal(deadlineStatus('2026-10-03', now).status, 'closed');
  assert.equal(deadlineStatus('2026-10-04', now).status, 'closing');
  assert.equal(deadlineStatus('2026-10-30', now).daysLeft, 26);
  assert.equal(deadlineStatus('2027-03-31', now).status, 'open');
  assert.equal(deadlineStatus(undefined, now), null);

  const rnd = matchPrograms({ industries: ['it'], tags: ['rnd'], stage: 'early' }, { prefecture: '福岡県', city: '福岡市中央区' }, { now });
  const closed = rnd.find((p) => p.id === 'fukuoka-rnd-startup');
  assert.equal(closed.status, 'closed');
  assert.match(closed.reasons.join(), /受付は終了/);
});

test('matcher: 対象者が限られる制度は、該当しなければ順位を下げる', () => {
  const tokyo = { prefecture: '東京都', city: '新宿区' };
  const base = { industries: ['food'], tags: ['store'], stage: 'planning' };
  const rank = (tags) => matchPrograms({ ...base, tags: [...base.tags, ...tags] }, tokyo).findIndex((p) => p.id === 'tokyo-wakate-josei');
  const without = rank([]);
  const withYoung = rank(['young']);
  assert.ok(without > withYoung, `${without} > ${withYoung}`);
  const p = matchPrograms(base, tokyo).find((x) => x.id === 'tokyo-wakate-josei');
  assert.match(p.reasons.join(), /39歳以下/);
});

test('API: セキュリティヘッダー・不正なJSON・レート制限', async () => {
  process.env.RATE_LIMIT_PER_MIN = '2';
  const app = createApp({ fetchImpl: offline, analyze: async () => null, loadGrants: async () => null });
  delete process.env.RATE_LIMIT_PER_MIN;
  const server = app.listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const health = await fetch(`${base}/api/health`);
    assert.match(health.headers.get('content-security-policy'), /default-src 'self'/);
    assert.equal(health.headers.get('x-powered-by'), null);

    const post = (body) => fetch(`${base}/api/search`, { method: 'POST', headers: { 'content-type': 'application/json' }, body });
    const broken = await post('{not json');
    assert.equal(broken.status, 400);
    const ok = await post(JSON.stringify({ description: 'カフェを開きたい', zip: '1500001' }));
    assert.equal(ok.status, 200);
    const limited = await post(JSON.stringify({ description: 'カフェを開きたい', zip: '1500001' }));
    assert.equal(limited.status, 429, "broken + ok で上限2に達する");
    assert.ok(limited.headers.get('retry-after'));
  } finally {
    server.close();
  }
});

test('cache: 実際に取得できた住所はキャッシュし、推定結果はキャッシュしない', async () => {
  const { TtlCache } = await import('../src/middleware.js');
  const cache = new TtlCache();
  let calls = 0;
  const fetchImpl = async () => {
    calls++;
    return new Response(JSON.stringify({ status: 200, results: [{ address1: '東京都', address2: '渋谷区', address3: '' }] }));
  };
  await lookupPostalCode('1500001', { fetchImpl, cache });
  await lookupPostalCode('150-0001', { fetchImpl, cache });
  assert.equal(calls, 1);

  await lookupPostalCode('5300001', { fetchImpl: offline, cache });
  const again = await lookupPostalCode('5300001', { fetchImpl, cache });
  assert.equal(again.source, 'zipcloud');
});
