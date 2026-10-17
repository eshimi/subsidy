import test from 'node:test';
import assert from 'node:assert/strict';
import { updateProgramHistory, recentChanges, emptyProgramHistory } from '../scripts/lib/program-history.mjs';
import { qualityOf } from '../scripts/lib/analysis.mjs';

const D1 = Date.parse('2026-10-14T06:00:00+09:00');
const DAY = 86400000;
const g = (o) => ({ id: 'a', title: '設備補助', area: '全国', max: 1e6, start: '2026-10-01T00:00:00+09:00', end: '2026-12-15T17:00:00+09:00', ...o });

test('制度ごとの履歴：最初は変更なし、2日目に変わった項目だけ変更前後つきで記録し、同じ日の再実行は増えない', () => {
  let h = updateProgramHistory(emptyProgramHistory(), [g()], D1);
  assert.equal(h.since, '2026-10-14');
  assert.deepEqual(h.programs.a.log, []);
  h = updateProgramHistory(h, [g({ end: '2027-01-15T17:00:00+09:00', max: 1.5e6 })], D1 + DAY);
  assert.deepEqual(h.programs.a.log.map((l) => [l.f, l.from, l.to]), [['end', '2026-12-15', '2027-01-15'], ['max', 1e6, 1.5e6]]);
  const again = updateProgramHistory(h, [g({ end: '2027-01-15T17:00:00+09:00', max: 1.5e6 })], D1 + DAY);
  assert.equal(again.programs.a.log.length, 2);
  assert.equal(again.since, '2026-10-14');
});

test('制度ごとの履歴：直近の変更を集計し、締切の延長・上限額の増減を数える。古い制度は消える', () => {
  let h = updateProgramHistory(emptyProgramHistory(), [g(), g({ id: 'b', title: '別の補助' })], D1);
  h = updateProgramHistory(h, [g({ end: '2027-01-15T17:00:00+09:00' }), g({ id: 'b', title: '別の補助', max: 5e5 })], D1 + DAY);
  const c = recentChanges(h, D1 + 2 * DAY, 30);
  assert.equal(c.n, 2);
  assert.equal(c.programsChanged, 2);
  assert.equal(c.extended, 1);
  assert.equal(c.maxDown, 1);
  assert.equal(c.tracked, 2);
  const old = updateProgramHistory(h, [], D1 + 500 * DAY);
  assert.equal(Object.keys(old.programs).length, 0);
});

test('品質指標：項目のそろい具合・終了後の残り・重複を数える', () => {
  const grants = [
    g({ id: '1', title: '設備補助A' }),
    g({ id: '2', title: '設備補助A', max: null, start: null }),
    g({ id: '3', title: '終了した補助', end: '2026-09-01T00:00:00+09:00' }),
    g({ id: '4', title: '締切なし', end: null }),
  ];
  const q = qualityOf(grants, { 1: { fetchedAt: '2026-10-10', rate: '1/2', purpose: 'x' } }, D1);
  assert.equal(q.listed, 4);
  assert.equal(q.open, 2);
  assert.equal(q.expired, 1);
  assert.equal(q.dupGroups, 1);
  const m = Object.fromEntries(q.metrics.map((x) => [x.key, x.rate]));
  assert.equal(m.max, 50);
  assert.equal(m.detail, 50);
  assert.equal(m.fresh, 50);
});
