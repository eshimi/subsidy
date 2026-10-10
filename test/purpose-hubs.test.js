import { test } from 'node:test';
import assert from 'node:assert/strict';
import { purposeHubsFor } from '../scripts/build-grant-pages.mjs';

const now = Date.parse('2026-10-10T00:00:00+09:00');
const g = (id, title, end = '2026-12-31T23:59:00+09:00') => ({ id, title, end, max: null, area: '全国' });

test('purposeHubsFor: 該当が3件以上の目的だけ一覧にする', () => {
  const grants = [
    g('1', '中小企業の設備投資補助事業'),
    g('2', '機械導入を支援する制度'),
    g('3', '工場の設備更新に使える補助金'),
    g('4', 'IT導入補助金'),
    g('5', 'デジタル化を進める制度'),
  ];
  const hubs = purposeHubsFor(grants, now);
  const files = hubs.map((h) => h.file);
  assert.deepEqual(files, ['purpose-equipment.html']); // 設備投資は3件。IT は2件なので作らない
  assert.equal(hubs[0].count, 3);
});

test('purposeHubsFor: 締切を過ぎた制度は含めない', () => {
  const grants = [
    g('1', '設備投資A', '2025-01-01T00:00:00+09:00'),
    g('2', '設備投資B', '2025-02-01T00:00:00+09:00'),
    g('3', '設備投資C', '2025-03-01T00:00:00+09:00'),
  ];
  assert.deepEqual(purposeHubsFor(grants, now), []);
});

test('purposeHubsFor: 英字の一部（ITS など）では IT に誤って入らない', () => {
  const grants = [g('1', 'ITSの研究'), g('2', 'ITSの開発'), g('3', 'ITSの実証')];
  assert.deepEqual(purposeHubsFor(grants, now).map((h) => h.file), []);
});

test('purposeHubsFor: 締切の早い順に並べる', () => {
  const grants = [
    g('late', '設備投資C', '2027-01-01T00:00:00+09:00'),
    g('early', '設備投資A', '2026-11-01T00:00:00+09:00'),
    g('mid', '設備投資B', '2026-12-01T00:00:00+09:00'),
  ];
  assert.deepEqual(purposeHubsFor(grants, now)[0].items.map((x) => x.id), ['early', 'mid', 'late']);
});
