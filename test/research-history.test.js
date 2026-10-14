import test from 'node:test';
import assert from 'node:assert/strict';
import { recordFor, addRecord } from '../scripts/update-research-history.mjs';

const NOW = Date.parse('2026-10-14T06:00:00+09:00');
const DAY = 86400000;
const iso = (d) => new Date(NOW + d * DAY).toISOString();

test('補助金データの履歴：募集中・全国向け・30日以内に締切・7日以内に受付開始を数え、同じ日は上書きする', () => {
  const grants = [
    { id: 'a', area: '全国', start: iso(-2), end: iso(10) },
    { id: 'b', area: '東京都', start: iso(-20), end: iso(60) },
    { id: 'c', area: '', start: iso(-1), end: iso(-1) }, // 受付終了：数えない
  ];
  const rec = recordFor(grants, NOW);
  assert.deepEqual(rec, { date: '2026-10-14', total: 2, national: 1, soon30: 1, fresh7: 1 });
  let h = addRecord({ days: [{ date: '2026-10-13', total: 5 }] }, rec);
  h = addRecord(h, { ...rec, total: 3 });
  assert.equal(h.days.length, 2);
  assert.equal(h.days[1].total, 3);
  assert.equal(addRecord({ days: Array.from({ length: 5 }, (_, i) => ({ date: `2026-01-0${i + 1}` })) }, rec, 3).days.length, 3);
});
