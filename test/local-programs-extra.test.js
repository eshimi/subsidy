import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LOCAL_PROGRAMS_EXTRA } from '../src/data/local-programs-extra.js';
import { LOCAL_PROGRAMS } from '../src/data/local-programs.js';
import { problemsOf } from '../scripts/import-local-batches.mjs';

test('事業者向けの制度のデータ：形式が正しく、id が重複しない', () => {
  const seen = new Set();
  for (const p of LOCAL_PROGRAMS_EXTRA) {
    assert.deepEqual(problemsOf(p), [], `${p.id} の形式`);
    assert.ok(!seen.has(p.id), `id が重複：${p.id}`);
    seen.add(p.id);
  }
});

test('LOCAL_PROGRAMS：手で整えた制度と取り込んだ制度を合わせても、id は重複しない', () => {
  const ids = LOCAL_PROGRAMS.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('problemsOf：形式の誤りを見つける', () => {
  const ok = { id: 'sapporo-kigyo', name: 'a', provider: 'b', level: 'municipality', type: '補助金', cat: '創業・起業', amount: '要確認', summary: 's', eligibility: [], industries: 'all', prefectures: ['北海道'], cities: ['札幌市'], stages: ['early'], period: '要確認', deadline: null, url: 'https://example.jp/' };
  assert.deepEqual(problemsOf(ok), []);
  assert.ok(problemsOf({ ...ok, cat: '分類なし' }).length > 0);
  assert.ok(problemsOf({ ...ok, url: 'http://example.jp/' }).length > 0);
  assert.ok(problemsOf({ ...ok, cities: ['存在しない市'] }).length > 0);
  assert.ok(problemsOf({ ...ok, level: 'prefecture' }).length > 0);
  assert.ok(problemsOf({ ...ok, industries: ['unknown'] }).length > 0);
  assert.ok(problemsOf({ ...ok, stages: [] }).length > 0);
});
