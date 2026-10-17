import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import worker from '../src/worker.js';
import { verifyGoogleIdToken, resetCertCache } from '../src/auth.js';
import { MAX_SAVED } from '../src/members.js';

// D1 と同じ使い方（prepare / bind / run / first / all / batch）を、node:sqlite で再現する
function d1() {
  const db = new DatabaseSync(':memory:');
  for (const f of ['0001_init.sql', '0002_notify.sql']) db.exec(readFileSync(new URL(`../migrations/${f}`, import.meta.url), 'utf8'));
  const stmt = (sql, args = []) => ({
    bind: (...a) => stmt(sql, a),
    run: async () => { db.prepare(sql).run(...args); return {}; },
    first: async () => db.prepare(sql).get(...args) ?? null,
    all: async () => ({ results: db.prepare(sql).all(...args) }),
    _run: () => db.prepare(sql).run(...args),
  });
  return { prepare: (sql) => stmt(sql), batch: async (list) => { for (const s of list) s._run(); }, raw: db };
}

const CLIENT = 'test-client.apps.googleusercontent.com';
const b64 = (o) => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o)).toString('base64url');

async function makeToken(claims = {}, { kid = 'k1', alg = 'RS256', keyPair } = {}) {
  const kp = keyPair || await crypto.subtle.generateKey({ name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign', 'verify']);
  const head = b64({ alg, kid, typ: 'JWT' });
  const body = b64({ iss: 'https://accounts.google.com', aud: CLIENT, sub: 'g-1', email: 'a@example.com', email_verified: true, name: 'テスト', exp: Math.floor(Date.now() / 1000) + 3600, ...claims });
  const sig = Buffer.from(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', kp.privateKey, new TextEncoder().encode(`${head}.${body}`))).toString('base64url');
  const jwk = await crypto.subtle.exportKey('jwk', kp.publicKey);
  return { token: `${head}.${body}.${sig}`, keyPair: kp, certs: { keys: [{ ...jwk, kid }] } };
}
const certsFetch = (certs) => async () => new Response(JSON.stringify(certs), { status: 200 });

test('auth: 正しい ID トークンは通り、署名・宛先・期限・発行元が違うものは拒否する', async () => {
  resetCertCache();
  const good = await makeToken();
  const f = certsFetch(good.certs);
  assert.deepEqual(await verifyGoogleIdToken(good.token, CLIENT, { fetchImpl: f }), { sub: 'g-1', email: 'a@example.com', name: 'テスト' });
  for (const [claims, why] of [[{ aud: 'other' }, 'aud'], [{ exp: 1 }, 'exp'], [{ iss: 'https://evil.test' }, 'iss'], [{ email_verified: false }, 'verified']]) {
    resetCertCache();
    const t = await makeToken(claims, { keyPair: good.keyPair });
    await assert.rejects(verifyGoogleIdToken(t.token, CLIENT, { fetchImpl: f }), undefined, why);
  }
  resetCertCache();
  const other = await makeToken(); // 別の鍵で署名
  await assert.rejects(verifyGoogleIdToken(other.token, CLIENT, { fetchImpl: certsFetch(good.certs) }));
  await assert.rejects(verifyGoogleIdToken('a.b', CLIENT, { fetchImpl: f }));
});

function setup() {
  const db = d1();
  const env = { DB: db, GOOGLE_CLIENT_ID: CLIENT, SUBSIDY_AI: 'off', ASSETS: { fetch: async () => new Response('asset') } };
  const call = (path, init = {}) => worker.fetch(new Request(`https://example.test${path}`, init), env);
  const post = (path, body, cookie = '', origin = 'https://example.test') => call(path, { method: 'POST', headers: { 'content-type': 'application/json', ...(origin ? { origin } : {}), ...(cookie ? { cookie } : {}) }, body: JSON.stringify(body) });
  return { db, env, call, post };
}
async function login(ctx) {
  resetCertCache();
  const t = await makeToken();
  const realFetch = globalThis.fetch;
  globalThis.fetch = certsFetch(t.certs);
  try {
    const res = await ctx.post('/api/auth/google', { credential: t.token });
    assert.equal(res.status, 200);
    const cookie = res.headers.get('set-cookie');
    assert.match(cookie, /^__Host-sid=[0-9a-f]{64}; Path=\/; HttpOnly; SameSite=Lax; Max-Age=\d+; Secure$/);
    return cookie.split(';')[0];
  } finally { globalThis.fetch = realFetch; }
}

test('worker: 会員機能が未設定のときは /api/me が enabled:false を返し、他は 503', async () => {
  const ctx = setup();
  const env = { ...ctx.env, DB: undefined };
  const res = await worker.fetch(new Request('https://example.test/api/me'), env);
  assert.deepEqual(await res.json(), { enabled: false, user: null });
  const r2 = await worker.fetch(new Request('https://example.test/api/mypage'), env);
  assert.equal(r2.status, 503);
});

test('worker: ログイン → 保存・状態の変更 → 読み出し → ログアウト', async () => {
  const ctx = setup();
  assert.deepEqual(await (await ctx.call('/api/me')).json(), { enabled: true, user: null });
  assert.equal((await ctx.call('/api/mypage')).status, 401);
  const cookie = await login(ctx);
  const me = await (await ctx.call('/api/me', { headers: { cookie } })).json();
  assert.deepEqual(me.user, { email: 'a@example.com', name: 'テスト' });

  const ops = [
    { op: 'save', item: { id: 'a', name: 'A制度', url: 'https://x.test/a', deadline: '2026-12-01', savedAt: 5 } },
    { op: 'save', item: { id: 'b', name: 'B制度', url: 'javascript:alert(1)', savedAt: 4 } },
    { op: 'meta', id: 'a', meta: { status: 'applied', result: 'adopted', memo: 'メモ' } },
    { op: 'kv', k: 'prefs', v: { pref: '東京都', purposes: ['equipment'], industry: '', first: null } },
    { op: 'kv', k: 'history', v: [{ u: '/feature/popular.html', t: '人気', k: '特集', at: 1 }] },
    { op: 'kv', k: 'unknown', v: 1 },
  ];
  const r = await (await ctx.post('/api/mypage/ops', { ops }, cookie)).json();
  assert.equal(r.applied, 5);
  const data = await (await ctx.call('/api/mypage', { headers: { cookie } })).json();
  assert.deepEqual(Object.keys(data.saved).sort(), ['a', 'b']);
  assert.equal(data.saved.b.url, '');
  assert.deepEqual(data.meta.a, { status: 'applied', result: 'adopted', memo: 'メモ' });
  assert.equal(data.prefs.pref, '東京都');
  assert.equal(data.history[0].t, '人気');

  await ctx.post('/api/mypage/ops', { ops: [{ op: 'remove', id: 'a' }] }, cookie);
  assert.deepEqual(Object.keys((await (await ctx.call('/api/mypage', { headers: { cookie } })).json()).saved), ['b']);

  const out = await ctx.post('/api/auth/logout', {}, cookie);
  assert.match(out.headers.get('set-cookie'), /Max-Age=0/);
  assert.equal((await ctx.call('/api/mypage', { headers: { cookie } })).status, 401);
});

test('worker: 書き込みは Origin が違うと 403、他人のデータには触れない', async () => {
  const ctx = setup();
  const cookie = await login(ctx);
  assert.equal((await ctx.post('/api/mypage/ops', { ops: [] }, cookie, 'https://evil.test')).status, 403);
  assert.equal((await ctx.post('/api/mypage/ops', { ops: [] }, cookie, '')).status, 403);
  // 別の会員
  resetCertCache();
  const t = await makeToken({ sub: 'g-2', email: 'b@example.com' });
  const realFetch = globalThis.fetch; globalThis.fetch = certsFetch(t.certs);
  const c2 = (await ctx.post('/api/auth/google', { credential: t.token })).headers.get('set-cookie').split(';')[0];
  globalThis.fetch = realFetch;
  await ctx.post('/api/mypage/ops', { ops: [{ op: 'save', item: { id: 'a', name: '自分の', savedAt: 1 } }] }, cookie);
  await ctx.post('/api/mypage/ops', { ops: [{ op: 'remove', id: 'a' }] }, c2);
  assert.deepEqual(Object.keys((await (await ctx.call('/api/mypage', { headers: { cookie } })).json()).saved), ['a']);
});

test('worker: 保存は上限までで、不正なトークンではログインできない', async () => {
  const ctx = setup();
  const cookie = await login(ctx);
  for (let start = 0; start < MAX_SAVED + 20; start += 150) {
    const ops = Array.from({ length: Math.min(150, MAX_SAVED + 20 - start) }, (_, i) => ({ op: 'save', item: { id: `s${start + i}`, name: 'n', savedAt: 1 } }));
    await ctx.post('/api/mypage/ops', { ops }, cookie);
  }
  assert.equal(Object.keys((await (await ctx.call('/api/mypage', { headers: { cookie } })).json()).saved).length, MAX_SAVED);
  assert.equal((await ctx.post('/api/auth/google', { credential: 'x.y.z' })).status, 401);
  assert.equal((await ctx.post('/api/mypage/ops', { ops: new Array(201).fill({}) }, cookie)).status, 400);
});

test('worker: アカウントを削除すると、データとセッションが消える', async () => {
  const ctx = setup();
  const cookie = await login(ctx);
  await ctx.post('/api/mypage/ops', { ops: [{ op: 'save', item: { id: 'a', name: 'A', savedAt: 1 } }, { op: 'kv', k: 'prefs', v: {} }] }, cookie);
  assert.equal((await ctx.post('/api/account/delete', {}, cookie)).status, 200);
  for (const t of ['users', 'sessions', 'saved', 'kv']) assert.equal(ctx.db.raw.prepare(`SELECT COUNT(*) AS n FROM ${t}`).get().n, 0, t);
  assert.equal((await ctx.call('/api/me', { headers: { cookie } })).status, 200);
  assert.deepEqual((await (await ctx.call('/api/me', { headers: { cookie } })).json()).user, null);
});
