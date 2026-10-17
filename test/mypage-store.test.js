import test from 'node:test';
import assert from 'node:assert/strict';
import { createStore, safeUrl, KEYS } from '../public/mypage-store.js';

const mem = () => {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) };
};
const seed = (st) => st.setItem(KEYS.saved, JSON.stringify({ a: { id: 'a', name: 'A制度', url: 'https://x.test/a', deadline: '2026-12-01', savedAt: 2 }, b: { id: 'b', name: 'B制度', url: 'javascript:alert(1)', savedAt: 1 } }));

test('一覧は状態の初期値が「気になる」で、危険なURLは空になる', () => {
  const st = mem(); seed(st);
  const items = createStore(st).list();
  assert.deepEqual(items.map((x) => x.id), ['a', 'b']);
  assert.equal(items[0].status, 'want');
  assert.equal(items[1].url, '');
});

test('状態・結果・メモを更新し、削除でメモも消える', () => {
  const st = mem(); seed(st);
  const s = createStore(st);
  s.setMeta('a', { status: 'applied', result: 'adopted', memo: 'メモ' });
  s.setMeta('a', { status: 'でたらめ' });
  const a = s.list().find((x) => x.id === 'a');
  assert.deepEqual([a.status, a.result, a.memo], ['applied', 'adopted', 'メモ']);
  s.remove('a');
  assert.deepEqual(s.list().map((x) => x.id), ['b']);
  assert.equal(JSON.parse(st.getItem(KEYS.meta)).a, undefined);
});

test('閲覧履歴は新しい順・同じURLは1件・30件まで', () => {
  const st = mem(); let t = 0;
  const s = createStore(st, () => ++t);
  for (let i = 0; i < 35; i++) s.addHistory({ u: `/p/${i}.html`, t: `p${i}` });
  s.addHistory({ u: '/p/10.html', t: 'again' });
  const h = s.history();
  assert.equal(h.length, 30);
  assert.equal(h[0].u, '/p/10.html');
  assert.equal(h.filter((x) => x.u === '/p/10.html').length, 1);
});

test('新着の判定：初回はなし、増えた分だけ14日間「新着」', () => {
  const st = mem(); let t = 1_000_000;
  const s = createStore(st, () => t);
  assert.equal(s.trackCandidates(['x', 'y']).size, 0);
  t += 1000;
  assert.deepEqual([...s.trackCandidates(['x', 'y', 'z'])], ['z']);
  t += 15 * 24 * 60 * 60 * 1000;
  assert.equal(s.trackCandidates(['x', 'y', 'z']).size, 0);
  s.setPrefs({ pref: '東京都', purposes: [], industry: '' });
  assert.equal(s.trackCandidates(['x']).size, 0);
});

test('バックアップを書き出して、別の保存先に読み込める', () => {
  const a = mem(); seed(a);
  const sa = createStore(a); sa.setMeta('a', { status: 'prep', memo: 'm' });
  const b = mem();
  const sb = createStore(b);
  assert.equal(sb.importAll(JSON.parse(JSON.stringify(sa.exportAll()))), 2);
  assert.equal(sb.list().find((x) => x.id === 'a').status, 'prep');
  assert.throws(() => sb.importAll({ foo: 1 }));
});

test('safeUrl', () => {
  assert.equal(safeUrl('https://a.test/'), 'https://a.test/');
  assert.equal(safeUrl('area/nakano.html'), 'area/nakano.html');
  assert.equal(safeUrl('javascript:alert(1)'), '');
  assert.equal(safeUrl('//evil.test'), '');
});
