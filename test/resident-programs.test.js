import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RESIDENT_PROGRAMS } from '../src/data/resident-programs.js';
import { problemsOf } from '../scripts/import-resident-batches.mjs';

test('個人向けの制度のデータ：形式が正しく、id が重複しない', () => {
  const seen = new Set();
  for (const p of RESIDENT_PROGRAMS) {
    assert.deepEqual(problemsOf(p), [], `${p.id} の形式`);
    assert.ok(!seen.has(p.id), `id が重複：${p.id}`);
    seen.add(p.id);
  }
});

test('problemsOf：形式の誤りを見つける', () => {
  const ok = { id: 'tokyo-taishin', name: 'a', provider: 'b', level: 'prefecture', category: '耐震', type: '補助金', amount: '要確認', summary: 's', eligibility: [], prefectures: ['東京都'], cities: [], period: '要確認', deadline: null, url: 'https://example.jp/' };
  assert.deepEqual(problemsOf(ok), []);
  assert.ok(problemsOf({ ...ok, category: 'その他' }).length > 0);
  assert.ok(problemsOf({ ...ok, url: 'http://example.jp/' }).length > 0);
  assert.ok(problemsOf({ ...ok, level: 'municipality' }).length > 0);
  assert.ok(problemsOf({ ...ok, prefectures: ['東京'] }).length > 0);
});
