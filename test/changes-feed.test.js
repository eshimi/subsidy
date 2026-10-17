import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildChangesFeed } from '../scripts/lib/changes-feed.mjs';

const history = { programs: {
  a: { s: {}, log: [{ d: '2026-10-10', f: 'end', from: '2026-11-30', to: '2026-12-20' }, { d: '2026-10-12', f: 'max', from: 1000000, to: 2000000 }] },
  b: { s: {}, log: [{ d: '2026-06-01', f: 'end', from: null, to: '2026-07-01' }] }, // 古い変更は含めない
  c: { s: {}, log: [] },
} };
const sourceState = { items: { ok: { problems: [], endedSuspect: false, checkedAt: '2026-10-17' }, ng: { problems: ['数字が合わない'], checkedAt: '2026-10-17' }, ended: { problems: [], endedSuspect: true } } };

test('国の制度は直近60日の変更だけ、自治体の制度は要確認のものだけが入る', () => {
  const f = buildChangesFeed({ history, sourceState }, '2026-10-17');
  assert.deepEqual(Object.keys(f).sort(), ['a', 'local-ended', 'local-ng']);
  assert.equal(f.a.d, '2026-10-12');
  assert.deepEqual(f.a.notes, ['締切日が変わりました：2026-11-30 → 2026-12-20', '上限額が変わりました：1,000,000円 → 2,000,000円']);
  assert.equal(f['local-ng'].d, '2026-10-17');
  assert.equal(f['local-ended'].d, '2026-10-17');
});

test('データがなくても空で返す', () => {
  assert.deepEqual(buildChangesFeed({ history: null, sourceState: null }, '2026-10-17'), {});
});
