import test from 'node:test';
import assert from 'node:assert/strict';
import { htmlToText, clip, normalizeDetail, sigOf, syncDetails, serialize } from '../scripts/lib/jgrants-detail.mjs';
import { grantPage } from '../scripts/build-grant-pages.mjs';

const NOW = Date.parse('2026-10-14T00:00:00+09:00');
const DAY = 86400000;
const g = (id, endDays, extra = {}) => ({ id, title: `制度${id}`, area: '全国', max: 1000000, start: new Date(NOW - DAY).toISOString(), end: new Date(NOW + endDays * DAY).toISOString(), employees: '', ...extra });
const api = (id, extra = {}) => ({ result: [{ id, subsidy_catch_phrase: `キャッチ${id}`, use_purpose: '設備整備・IT導入をしたい', industry: '製造業 / 小売業', subsidy_rate: '2/3以内', detail: '<p>対象は<b>中小企業</b>です。</p><ul><li>要件A</li><li>要件B</li></ul>', application_guidelines: [{ name: '公募要領.pdf', data: 'AAAA' }], ...extra }] });
const mock = () => { const calls = []; const f = async (url) => { const id = decodeURIComponent(url.split('/').pop()); calls.push(id); return { ok: true, json: async () => api(id) }; }; f.calls = calls; return f; };

test('説明文：HTMLのタグを取り除き、段落と箇条書きを残す。長い文は文の切れ目で切る', () => {
  assert.equal(htmlToText('<p>A&amp;B</p><ul><li>x</li><li>y</li></ul><script>bad()</script>'), 'A&B\n・x\n・y');
  const long = `${'あ'.repeat(1900)}。${'い'.repeat(1200)}`;
  const c = clip(long, 2500);
  assert.equal(c.clipped, true);
  assert.ok(c.text.endsWith('。'));
  assert.equal(clip('短い').clipped, false);
});

test('詳細の整形：添付資料の本体は捨ててファイル名だけ残し、欠けた項目は入れない', () => {
  const d = normalizeDetail(api('a').result);
  assert.equal(d.catch, 'キャッチa');
  assert.equal(d.rate, '2/3以内');
  assert.deepEqual(d.files, ['公募要領.pdf']);
  assert.ok(!JSON.stringify(d).includes('AAAA'));
  assert.equal(d.areaDetail, undefined);
  assert.equal(normalizeDetail({}), null);
});

test('差分の取り込み：新しい制度だけ取り、変更のない制度は取らない。変わった制度は取り直し、終わった制度は消す', async () => {
  const f1 = mock();
  const grants = [g('A', 10), g('B', 5), g('C', 20)];
  const r1 = await syncDetails({ grants, cache: null, fetchImpl: f1, delayMs: 0, now: NOW });
  assert.deepEqual(f1.calls, ['B', 'A', 'C'], '締切の近い順に取る');
  assert.equal(r1.stats.fetched, 3);
  const f2 = mock();
  const r2 = await syncDetails({ grants: [g('A', 10), g('B', 5, { max: 2000000 }), g('D', 7)], cache: r1.cache, fetchImpl: f2, delayMs: 0, now: NOW });
  assert.deepEqual(f2.calls.sort(), ['B', 'D'], '変更のないAは取らない');
  assert.equal(r2.stats.removed, 1);
  assert.ok(!('C' in r2.cache.items));
  assert.notEqual(sigOf(g('B', 5)), sigOf(g('B', 5, { max: 2000000 })));
});

test('差分の取り込み：1回の上限を守り、残りは次回に回す。失敗しても、前回の保存を残す', async () => {
  const grants = [g('A', 1), g('B', 2), g('C', 3)];
  const f = mock();
  const r = await syncDetails({ grants, cache: null, fetchImpl: f, budget: 2, delayMs: 0, now: NOW });
  assert.equal(r.stats.fetched, 2);
  assert.equal(r.stats.pending, 1);
  assert.ok(!('C' in r.cache.items));
  const old = { version: 1, items: { A: { sig: 'old', catch: '古い' } } };
  const bad = async () => ({ ok: false, status: 500 });
  const r2 = await syncDetails({ grants: [g('A', 1)], cache: old, fetchImpl: bad, delayMs: 0, now: NOW });
  assert.equal(r2.stats.failed, 1);
  assert.equal(r2.cache.items.A.catch, '古い');
  assert.match(serialize(r.cache), /^\{"version":1,"items":\{"A":/);
});

test('制度ページ：詳細があれば項目と説明を出す（HTMLは入れない）。なければ、これまでの表示のまま', () => {
  const grant = g('X', 20);
  const plain = grantPage(grant, NOW);
  assert.doesNotMatch(plain, /id="detail"/);
  const d = { ...normalizeDetail(api('X', { detail: '<p>説明<script>alert(1)</script>です</p>' }).result), projectEnd: '2027-03-31T00:00:00Z' };
  const html = grantPage(grant, NOW, d);
  assert.match(html, /id="detail"/);
  assert.match(html, /<dt>補助率<\/dt><dd>2\/3以内<\/dd>/);
  assert.match(html, /<dt>利用目的<\/dt>/);
  assert.match(html, /事業の終了期限/);
  assert.match(html, /公募要領\.pdf/);
  assert.match(html, /class="fx-catch">キャッチX/);
  assert.doesNotMatch(html, /<script>alert/);
  assert.match(html, /href="#detail"/);
});
