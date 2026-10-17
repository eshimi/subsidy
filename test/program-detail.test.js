import test from 'node:test';
import assert from 'node:assert/strict';
import { validate, pageable, numbersIn, norm } from '../scripts/lib/program-detail.mjs';

const SRC = '補助率は中小企業1／2、小規模企業2／3。補助上限：100万円。募集期間 令和8年4月1日 ～令和9年1月15日。電話 0123-45-6789';
const ok = () => ({
  status: 'ok', lead: '県内の中小企業を支援する制度です。',
  facts: [['補助額・補助率', '補助上限は100万円'], ['対象者', '県内の中小企業'], ['申請期間', '令和8年4月1日〜令和9年1月15日']],
  eligible: ['県内の中小企業'], flow: ['申請書を提出する'], contact: '電話 0123-45-6789',
  evidence: ['補助上限：100万円', '補助率は中小企業1／2', '令和8年4月1日 ～令和9年1月15日'],
});

test('制度の材料：数字と引用が本文にあれば合格し、ページにできる', () => {
  assert.deepEqual(validate(ok(), SRC), []);
  assert.ok(pageable(ok()));
});

test('制度の材料：本文にない数字・引用は不合格にする', () => {
  const d = ok(); d.facts[0][1] = '補助上限は200万円';
  assert.ok(validate(d, SRC).some((p) => p.includes('200')));
  const e = ok(); e.evidence[0] = '補助上限：300万円';
  assert.ok(validate(e, SRC).some((p) => p.includes('evidence')));
});

test('制度の材料：全角・カンマ・空白の違いは同じ数字として扱う。skip は reason が必要', () => {
  assert.equal(norm('１２，３４５円'), '12345円');
  assert.deepEqual(numbersIn('上限100万円・令和8年'), ['100']);
  assert.deepEqual(validate({ status: 'skip', reason: 'ended' }, ''), []);
  assert.ok(validate({ status: 'skip' }, '').length);
  assert.ok(!pageable({ ...ok(), evidence: ['a'] }));
});
