import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.ANTHROPIC_API_KEY = 'sk-ant-test-not-real';
delete process.env.SUBSIDY_AI;
const upstream = { status: 401, calls: 0 };
// Anthropic SDK が使う fetch を差し替え、上流のエラー応答を再現する
globalThis.fetch = async () => {
  upstream.calls++;
  return new Response(JSON.stringify({ type: 'error', error: { type: 'authentication_error', message: 'API key is invalid. key=sk-ant-test-not-real' } }), {
    status: upstream.status,
    headers: { 'content-type': 'application/json' },
  });
};

const { chatError } = await import('../src/ai.js');
const { default: worker } = await import('../src/worker.js');

test('chatError: 混雑（429/503/529）は 503、それ以外は 502 で、詳細は伏せる', () => {
  for (const status of [429, 503, 529]) {
    const e = chatError({ status, message: 'secret detail' });
    assert.equal(e.status, 503);
    assert.match(e.message, /混み合って/);
  }
  for (const status of [400, 401, 500, undefined]) {
    const e = chatError({ status, message: 'secret detail' });
    assert.equal(e.status, 502);
    assert.ok(!e.message.includes('secret'));
  }
});

test('/api/chat: 上流の認証エラーは 502 の汎用メッセージにし、キーや詳細を返さない', async () => {
  const res = await worker.fetch(
    new Request('https://example.test/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: '副業を考えたい' }] }),
    }),
    { ANTHROPIC_API_KEY: 'sk-ant-test-not-real', ASSETS: { fetch: async () => new Response('') } },
  );
  const text = await res.text();
  assert.equal(res.status, 502);
  assert.equal(JSON.parse(text).error, 'AIの応答を取得できませんでした');
  assert.ok(!text.includes('sk-ant'));
  assert.ok(upstream.calls >= 1, 'Anthropic SDK が fetch を呼んでいること');
});
