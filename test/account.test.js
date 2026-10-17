import { test } from 'node:test';
import assert from 'node:assert/strict';
import { serverStorage } from '../public/account.js';
import { createStore, KEYS } from '../public/mypage-store.js';

const setup = (initial = {}) => {
  const sent = [];
  const st = serverStorage(initial, async (ops) => { sent.push(...ops); });
  return { st, sent, store: createStore(st) };
};

test('serverStorage: 保存・状態の変更・削除が、変更の一覧（ops）になる', async () => {
  const { st, sent, store } = setup({ saved: { a: { id: 'a', name: 'A', savedAt: 1 } } });
  st.setItem(KEYS.saved, JSON.stringify({ a: { id: 'a', name: 'A', savedAt: 1 }, b: { id: 'b', name: 'B', savedAt: 2 } }));
  store.setMeta('b', { status: 'prep', memo: 'm' });
  await st.flush();
  assert.deepEqual(sent.map((o) => [o.op, o.item?.id ?? o.id]), [['save', 'b'], ['meta', 'b']]);
  assert.deepEqual(sent[1].meta, { status: 'prep', memo: 'm' });
  sent.length = 0;
  store.remove('b');
  await st.flush();
  // 状態（meta）を先に初期値へ戻し、そのあと保存から削除する。サーバー側では、削除で行ごと消える
  assert.deepEqual(sent.map((o) => [o.op, o.id]), [['meta', 'b'], ['remove', 'b']]);
});

test('serverStorage: 同じ内容の書き込みは送らない。履歴と条件は kv で送る', async () => {
  const { st, sent, store } = setup({ prefs: { pref: '東京都', purposes: [], industry: '', first: null } });
  st.setItem(KEYS.prefs, JSON.stringify({ pref: '東京都', purposes: [], industry: '', first: null }));
  await st.flush();
  assert.equal(sent.length, 0);
  store.addHistory({ u: '/feature/popular.html', t: '人気', k: '特集' });
  store.setPrefs({ pref: '大阪府', purposes: ['equipment'], industry: '' });
  await st.flush();
  assert.deepEqual(sent.map((o) => [o.op, o.k]), [['kv', 'history'], ['kv', 'prefs']]);
});

test('serverStorage: 送信に失敗した変更は残り、次の送信で再送する', async () => {
  let fail = true;
  const sent = [];
  const st = serverStorage({}, async (ops) => { if (fail) throw Object.assign(new Error('x'), { status: 503 }); sent.push(...ops); });
  const store = createStore(st);
  st.setItem(KEYS.saved, JSON.stringify({ a: { id: 'a', name: 'A', savedAt: 1 } }));
  await st.flush();
  assert.equal(st.pending(), 1);
  fail = false;
  await st.flush();
  assert.equal(st.pending(), 0);
  assert.equal(sent.length, 1);
  assert.equal(store.list().length, 1);
});
