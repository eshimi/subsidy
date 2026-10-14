import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.js';
import { parsePlanInput, createDailyLimiter, memoryStore, jstDate, planText } from '../src/plan.js';
import { planSystem } from '../src/ai.js';

const valid = {
  subsidy: 'jizokuka',
  industry: '飲食業',
  employees: '1〜5人',
  business: '住宅街で夫婦2人で洋菓子店を営んでいる。誕生日ケーキの予約が売上の柱。',
  issue: '新しいお客様がなかなか増えない。',
  idea: 'ホームページとネット予約の仕組みを作り、焼き菓子のギフトをネットでも売りたい。',
  goal: '',
};

test('plan: 正しい入力をそのまま返し、補助金・選択肢・字数を検証する', () => {
  assert.deepEqual(parsePlanInput(valid), valid);
  assert.throws(() => parsePlanInput({ ...valid, subsidy: 'other' }), { status: 400 });
  assert.throws(() => parsePlanInput({ ...valid, industry: '宇宙' }), { status: 400 });
  assert.throws(() => parsePlanInput({ ...valid, business: '' }), /事業の内容を入力/);
  assert.throws(() => parsePlanInput({ ...valid, idea: '短い' }), /20字以上/);
  assert.throws(() => parsePlanInput({ ...valid, goal: 'あ'.repeat(301) }), /300字以内/);
  assert.deepEqual(parsePlanInput({ ...valid, website: 'http://spam' }), { spam: true });
});

test('plan: 1日1回の制限。失敗時に戻せて、日本時間の翌日には使える', async () => {
  let now = Date.parse('2026-10-14T05:00:00Z');
  const limiter = createDailyLimiter({ store: memoryStore(), now: () => now });
  const key = await limiter.take('203.0.113.1');
  await assert.rejects(limiter.take('203.0.113.1'), { status: 429 });
  await limiter.take('203.0.113.2');
  await limiter.release(key);
  await limiter.take('203.0.113.1');
  now = Date.parse('2026-10-14T15:00:00Z'); // 日本時間 10/15 0:00
  assert.equal(jstDate(now), '2026-10-15');
  await limiter.take('203.0.113.1');
});

test('plan: 指示文に補助金ごとの見出しが入り、入力文に選んだ補助金名が入る', () => {
  assert.match(planSystem('jizokuka'), /販路開拓等（補助事業）の取組内容/);
  assert.match(planSystem('digital'), /現在の業務の流れと課題/);
  assert.match(planText(valid), /小規模事業者持続化補助金/);
});

test('worker: /api/plan は入力の誤りを 400、AI 未設定を 503 にし、GET は 405', async () => {
  const env = { SUBSIDY_AI: 'off', ASSETS: { fetch: async () => new Response('') } };
  const post = (body) => worker.fetch(new Request('https://example.test/api/plan', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }), env);
  assert.equal((await post({ ...valid, business: '' })).status, 400);
  const res = await post(valid);
  assert.equal(res.status, 503);
  assert.match((await res.json()).error, /AI機能/);
  assert.equal((await worker.fetch(new Request('https://example.test/api/plan'), env)).status, 405);
});
