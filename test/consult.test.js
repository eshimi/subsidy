import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.js';
import { parseAnswers, parseConsult, consultText } from '../src/consult.js';

const answers = { kind: '個人事業主（フリーランスを含む）', industry: '飲食業', employees: '1〜5人', koyou: '加入している', shakai: 'わからない', topic: '販路開拓・集客', timing: '3か月以内' };
const consult = { ...answers, company: '株式会社テスト', name: '山田 太郎', phone: '03-1234-5678', email: '', note: '', consent: true, candidates: ['小規模事業者持続化補助金'] };
const env = { SUBSIDY_AI: 'off', ASSETS: { fetch: async () => new Response('asset') } };
const post = (path, body) => worker.fetch(new Request(`https://example.test${path}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }), env);

test('parseAnswers: 選択肢にない回答は拒否する', () => {
  assert.deepEqual(parseAnswers(answers), answers);
  assert.throws(() => parseAnswers({ ...answers, topic: '何でも' }));
});

test('parseConsult: 必須項目・電話番号・同意を確認する', () => {
  assert.equal(parseConsult(consult).company, '株式会社テスト');
  assert.throws(() => parseConsult({ ...consult, company: '' }));
  assert.throws(() => parseConsult({ ...consult, phone: 'abc' }));
  assert.throws(() => parseConsult({ ...consult, consent: false }));
  assert.throws(() => parseConsult({ ...consult, email: 'bad' }));
  assert.deepEqual(parseConsult({ ...consult, website: 'spam' }), { spam: true });
});

test('consultText: 回答と連絡先を本文に含める', () => {
  const t = consultText(parseConsult(consult));
  assert.match(t, /株式会社テスト/);
  assert.match(t, /販路開拓・集客/);
  assert.match(t, /小規模事業者持続化補助金/);
});

test('worker: /api/judge は AI が無効でも 200 で ai:false を返す', async () => {
  const res = await post('/api/judge', { ...answers, candidates: ['小規模事業者持続化補助金'] });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ai: false, comment: null });
  assert.equal((await post('/api/judge', { ...answers, koyou: 'x' })).status, 400);
});

test('worker: /api/consult は送信設定が無ければ 503、入力不備は 400', async () => {
  assert.equal((await post('/api/consult', consult)).status, 503);
  assert.equal((await post('/api/consult', { ...consult, consent: false })).status, 400);
});
