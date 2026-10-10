import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import worker from '../src/worker.js';
import { createAssetsGrantsLoader } from '../src/grants-assets.js';
import { errorPayload } from '../src/http-error.js';
import { SECURITY_HEADERS } from '../src/middleware.js';
import { prefFile } from '../src/data/prefectures.js';

const jsonRes = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

function makeEnv(extra = {}) {
  const requested = [];
  return {
    requested,
    env: {
      SUBSIDY_AI: 'off',
      ASSETS: { fetch: async (req) => { requested.push(new URL(req.url).pathname); return new Response('asset', { status: 200 }); } },
      ...extra,
    },
  };
}

const call = (env, path, init) => worker.fetch(new Request(`https://example.test${path}`, init), env);
const post = (env, path, body) => call(env, path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: typeof body === 'string' ? body : JSON.stringify(body) });

test('worker: /api/health は AI の有効状態を返す', async () => {
  const { env } = makeEnv();
  const res = await call(env, '/api/health');
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, ai: false });
  assert.equal(res.headers.get('cache-control'), 'no-store');
  assert.equal(res.headers.get('x-frame-options'), 'DENY');
});

test('worker: /api/config は GOOGLE_CLIENT_ID を返し、未設定なら null', async () => {
  assert.deepEqual(await (await call(makeEnv().env, '/api/config')).json(), { googleClientId: null });
  const { env } = makeEnv({ GOOGLE_CLIENT_ID: 'abc.apps.googleusercontent.com' });
  assert.deepEqual(await (await call(env, '/api/config')).json(), { googleClientId: 'abc.apps.googleusercontent.com' });
});

test('worker: /api/postal は不正な郵便番号を 400 にする', async () => {
  const res = await call(makeEnv().env, '/api/postal/abc');
  assert.equal(res.status, 400);
  assert.match((await res.json()).error, /7桁/);
});

test('worker: /api/search は短すぎる事業内容・不正な JSON を 400 にする', async () => {
  const { env } = makeEnv();
  assert.equal((await post(env, '/api/search', { description: 'a', zip: '1000001' })).status, 400);
  const bad = await post(env, '/api/search', '{bad');
  assert.equal(bad.status, 400);
  assert.equal((await bad.json()).error, 'リクエストが不正です');
});

test('worker: /api/search は 32KB を超えるリクエストを 413 にする', async () => {
  const res = await post(makeEnv().env, '/api/search', { description: 'あ'.repeat(12000), zip: '1000001' });
  assert.equal(res.status, 413);
});

test('worker: /api/chat は入力を検証し、AI 無効なら 503 とメッセージを返す', async () => {
  const { env } = makeEnv();
  assert.equal((await post(env, '/api/chat', { messages: [{ role: 'assistant', content: 'x' }] })).status, 400);
  assert.equal((await post(env, '/api/chat', { messages: [{ role: 'user', content: 'あ'.repeat(1001) }] })).status, 400);
  const off = await post(env, '/api/chat', { messages: [{ role: 'user', content: '副業を考えたい' }] });
  assert.equal(off.status, 503);
  assert.equal((await off.json()).error, 'AI機能は現在利用できません');
});

test('worker: メソッド違反は 405（Allow 付き）、未定義の API は 404', async () => {
  const { env } = makeEnv();
  const wrong = await call(env, '/api/chat');
  assert.equal(wrong.status, 405);
  assert.equal(wrong.headers.get('allow'), 'POST');
  assert.equal((await post(env, '/api/health', {})).status, 405);
  assert.equal((await call(env, '/api/nope')).status, 404);
});

test('worker: / は index.html を、その他は URL のまま ASSETS に渡す', async () => {
  const { env, requested } = makeEnv();
  await call(env, '/?q=test');
  await call(env, '/diagnosis.html');
  await call(env, '/images/logo-header-v5.webp');
  assert.deepEqual(requested, ['/index.html', '/diagnosis.html', '/images/logo-header-v5.webp']);
});

test('assets loader: 地域別データと全国データを結合し、同じファイルは1回だけ読む', async () => {
  const counts = new Map();
  const files = {
    'index.json': { available: true, generatedAt: '2026-10-08T00:00:00Z' },
    'national.json': [{ id: 'N1' }],
    [prefFile('東京都')]: [{ id: 'T1' }],
  };
  const assets = {
    fetch: async (req) => {
      const name = new URL(req.url).pathname.replace('/data/jgrants/', '');
      counts.set(name, (counts.get(name) ?? 0) + 1);
      return name in files ? jsonRes(files[name]) : new Response('', { status: 404 });
    },
  };
  const load = createAssetsGrantsLoader(assets);
  const r1 = await load('東京都');
  assert.equal(r1.available, true);
  assert.deepEqual(r1.items.map((i) => i.id), ['T1', 'N1']);
  await load('東京都');
  assert.equal(counts.get('index.json'), 1);
  const r2 = await load('北海道'); // 都道府県ファイルが無くても全国分は返す
  assert.deepEqual(r2.items.map((i) => i.id), ['N1']);
});

test('assets loader: データが無い・取り込み失敗のときは null / available:false', async () => {
  const missing = createAssetsGrantsLoader({ fetch: async () => new Response('', { status: 404 }) });
  assert.equal(await missing('東京都'), null);
  const unavailable = createAssetsGrantsLoader({ fetch: async () => jsonRes({ available: false }) });
  assert.deepEqual(await unavailable('東京都'), { available: false });
});

test('errorPayload: 5xx は expose しない限り汎用文言、4xx はメッセージをそのまま返す', () => {
  assert.deepEqual(errorPayload(new Error('boom')), { status: 500, error: 'サーバーでエラーが発生しました' });
  assert.deepEqual(errorPayload(Object.assign(new Error('停止中'), { status: 503, expose: true })), { status: 503, error: '停止中' });
  assert.deepEqual(errorPayload(Object.assign(new Error('x'), { status: 400 })), { status: 400, error: 'x' });
  assert.deepEqual(errorPayload(Object.assign(new Error('x'), { status: 400, expose: false })), { status: 400, error: 'リクエストが不正です' });
});

test('public/_headers は SECURITY_HEADERS と一致する', async () => {
  const text = await readFile(new URL('../public/_headers', import.meta.url), 'utf8');
  const parsed = Object.fromEntries(
    text.split('\n').filter((l) => /^\s+\S+:\s/.test(l)).map((l) => {
      const i = l.indexOf(':');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
  );
  assert.deepEqual(parsed, SECURITY_HEADERS);
});

test('worker: /api/contact は入力を検証し、送信設定が無ければ 503、バインディングがあれば送信する', async () => {
  const { env } = makeEnv();
  const ok = { name: '', email: 'a@example.com', category: 'ご意見・ご要望', message: 'こんにちは' };
  assert.equal((await post(env, '/api/contact', { ...ok, email: 'bad' })).status, 400);
  assert.equal((await post(env, '/api/contact', { ...ok, category: 'x' })).status, 400);
  assert.equal((await post(env, '/api/contact', { ...ok, message: '' })).status, 400);
  assert.equal((await post(env, '/api/contact', ok)).status, 503);
  assert.equal((await call(env, '/api/contact')).status, 405);
  // おとり欄が入っていれば、送らずに成功を返す
  const spam = await post(env, '/api/contact', { ...ok, website: 'http://spam' });
  assert.equal(spam.status, 200);
});
