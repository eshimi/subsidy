import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { statusOf, loadGrants, buildAll, sitemapWith } from '../scripts/build-grant-pages.mjs';

const NOW = Date.parse('2026-10-10T00:00:00Z');
const DAY = 86400000;

test('statusOf: 締切までの状態を判定する', () => {
  assert.equal(statusOf(new Date(NOW - DAY).toISOString(), NOW).key, 'closed');
  assert.equal(statusOf(new Date(NOW + 10 * DAY).toISOString(), NOW).key, 'soon');
  assert.equal(statusOf(new Date(NOW + 90 * DAY).toISOString(), NOW).key, 'open');
  assert.equal(statusOf(null, NOW).key, 'unknown');
});

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'grants-'));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.json'), JSON.stringify({ available: true }));
  const soonEnd = new Date(NOW + 5 * DAY).toISOString();
  const laterEnd = new Date(NOW + 120 * DAY).toISOString();
  writeFileSync(join(dir, 'national.json'), JSON.stringify([
    { id: 'a1', title: '全国の制度A', area: '全国', max: 500000, start: null, end: laterEnd, employees: '' },
    { id: '../evil', title: '不正なID', area: '', max: null, start: null, end: laterEnd, employees: '' },
  ]));
  writeFileSync(join(dir, 'pref-13.json'), JSON.stringify([
    { id: 'a1', title: '全国の制度A', area: '全国', max: 500000, start: null, end: laterEnd, employees: '' },
    { id: 'b2', title: '東京都の制度B', area: '東京都', max: null, start: null, end: soonEnd, employees: '従業員数の制約なし' },
  ]));
  return dir;
}

test('loadGrants: 重複を除き、不正なIDを除外し、締切順に並べる', () => {
  const grants = loadGrants(fixture());
  assert.deepEqual(grants.map((g) => g.id), ['b2', 'a1']);
});

test('buildAll: 制度ページ・一覧・締切一覧を作り、sitemapに追加する', () => {
  const dir = fixture();
  const out = join(dir, 'out');
  const sitemap = join(dir, 'sitemap.xml');
  writeFileSync(sitemap, '<?xml version="1.0"?>\n<urlset>\n</urlset>\n');
  const { pages } = buildAll({ dir, out, sitemap, now: NOW });
  assert.equal(pages, 2);
  assert.ok(existsSync(join(out, 'b2.html')));
  assert.ok(existsSync(join(out, 'a1.html')));
  assert.ok(!existsSync(join(out, '../evil.html')));
  const page = readFileSync(join(out, 'b2.html'), 'utf-8');
  assert.match(page, /東京都の制度B/);
  assert.match(page, /rel="canonical" href="https:\/\/hojyokin\.net\/grants\/b2\.html"/);
  // jGrants のトップではなく、この補助金の詳細ページにリンクする
  assert.match(page, /href="https:\/\/www\.jgrants-portal\.go\.jp\/subsidy\/b2"/);
  // 都道府県のページは、並べ替え・絞り込みの操作と、項目ごとのデータを持つ
  const pref = readFileSync(join(out, 'pref-tokyo.html'), 'utf-8');
  assert.match(pref, /data-grant-list/);
  assert.match(pref, /<select name="s">/);
  assert.match(pref, /data-end="[^"]+" data-start="" data-max="0"/);
  const deadlines = readFileSync(join(out, 'deadlines.html'), 'utf-8');
  assert.ok(deadlines.indexOf('b2.html') < deadlines.indexOf('a1.html'));
  assert.match(readFileSync(sitemap, 'utf-8'), /grants\/b2\.html/);
});

test('buildAll: データがないときは準備中の案内だけを出す', () => {
  const dir = mkdtempSync(join(tmpdir(), 'grants-empty-'));
  writeFileSync(join(dir, 'index.json'), JSON.stringify({ available: false }));
  const out = join(dir, 'out');
  const { pages } = buildAll({ dir, out, sitemap: join(dir, 'none.xml'), now: NOW });
  assert.equal(pages, 0);
  assert.match(readFileSync(join(out, 'index.html'), 'utf-8'), /準備中/);
});

test('sitemapWith: 追加分を入れ直しても重複しない', () => {
  const base = '<urlset>\n</urlset>\n';
  const once = sitemapWith(base, ['grants/a.html'], '2026-10-10');
  const twice = sitemapWith(once, ['grants/a.html'], '2026-10-10');
  assert.equal(twice.match(/grants\/a\.html/g).length, 1);
});

import { icsFor, rssFor, prefectureCounts } from '../scripts/build-grant-pages.mjs';

test('icsFor: 締切が残っている制度だけを終日予定にする', () => {
  const grants = loadGrants(fixture());
  const ics = icsFor(grants, NOW);
  assert.match(ics, /BEGIN:VCALENDAR/);
  assert.match(ics, /SUMMARY:締切：東京都の制度B/);
  assert.match(ics, /DTSTART;VALUE=DATE:\d{8}/);
  assert.equal((ics.match(/BEGIN:VEVENT/g) || []).length, 2);
});

test('rssFor: 新しい順の項目を持つ妥当な RSS を作る', () => {
  const rss = rssFor(loadGrants(fixture()), NOW);
  assert.match(rss, /<rss version="2\.0">/);
  assert.equal((rss.match(/<item>/g) || []).length, 2);
  assert.match(rss, /<link>https:\/\/hojyokin\.net\/grants\/b2\.html<\/link>/);
});

test('prefectureCounts: 都道府県ごとの制度を読み込む', () => {
  const counts = prefectureCounts(fixture());
  assert.equal(counts['東京都'].length, 2);
  assert.equal(counts['大阪府'].length, 0);
});

import { hubsFor, faqFor } from '../scripts/build-grant-pages.mjs';

test('hubsFor: 該当が3件以上の月・上限額だけ一覧を作る', () => {
  const mk = (i, days, max) => ({ id: `g${i}`, title: `制度${i}`, area: '全国', max, start: null, end: new Date(NOW + days * DAY).toISOString(), employees: '' });
  const grants = [mk(1, 5, 2000000), mk(2, 6, 2000000), mk(3, 7, 2000000), mk(4, 200, null)];
  const hubs = hubsFor(grants, NOW);
  assert.ok(hubs.some((h) => h.file.startsWith('deadline-')));
  assert.ok(hubs.some((h) => h.file === 'amount-100.html'));
  assert.ok(!hubs.some((h) => h.file === 'amount-500.html'));
});

test('faqFor: データがある項目はその値で、無い項目は公式確認を案内する', () => {
  const faq = faqFor({ id: 'x', title: 'テスト制度', area: '東京都', max: null, start: null, end: new Date(NOW + 3 * DAY).toISOString(), employees: '' }, NOW);
  assert.equal(faq.length, 4);
  assert.match(faq[0][1], /受付締切は/);
  assert.match(faq[2][1], /公募要領で確認/);
});
