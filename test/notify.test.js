import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import worker from '../src/worker.js';
import { runReminders, dueReminders, jstDate, daysBetween } from '../src/notify.js';
import { upsertUser, createSession, applyOps } from '../src/members.js';

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
  return { prepare: (sql) => stmt(sql), batch: async (l) => { for (const s of l) s._run(); }, raw: db };
}

const NOW = Date.parse('2026-10-18T22:00:00Z'); // 日本時間 2026-10-19 7:00
const plus = (days) => new Date(Date.parse('2026-10-19T00:00:00Z') + days * 86400000).toISOString().slice(0, 10);

async function seed(db) {
  const u = await upsertUser(db, { sub: 'g1', email: 'a@example.com', name: '山田' }, NOW);
  await applyOps(db, u.id, [
    { op: 'save', item: { id: 'in7', name: '7日後の制度', url: '/grants/in7.html', deadline: plus(7), savedAt: 1 } },
    { op: 'save', item: { id: 'in1', name: '前日の制度', url: 'https://example.com/x', deadline: `${plus(1)}T00:00:00Z`, savedAt: 1 } },
    { op: 'save', item: { id: 'in3', name: '3日後の制度', deadline: plus(3), savedAt: 1 } },
    { op: 'save', item: { id: 'done', name: '申請済みの制度', deadline: plus(7), savedAt: 1 } },
    { op: 'save', item: { id: 'none', name: '締切なし', savedAt: 1 } },
    { op: 'meta', id: 'done', meta: { status: 'applied' } },
  ], NOW);
  return u;
}
const mailer = () => { const sent = []; return { sent, send: async (m) => { sent.push(m); return { messageId: 'x' }; } }; };

test('日付の計算（日本時間）', () => {
  assert.equal(jstDate('2026-12-20T16:00:00Z'), '2026-12-21');
  assert.equal(jstDate('2026-12-20'), '2026-12-20');
  assert.equal(daysBetween('2026-10-19', '2026-10-26'), 7);
});

test('通知：オンの会員にだけ、7日前と前日の制度を1通にまとめて送り、二重には送らない', async () => {
  const db = d1();
  const u = await seed(db);
  const m = mailer();
  const env = { DB: db, MAIL: m, NOTIFY_ENABLED: 'true' };
  assert.equal((await runReminders(env, NOW)).users, 0); // 通知がオフ
  db.raw.prepare('UPDATE users SET notify = 1, notify_token = ? WHERE id = ?').run('tok123', u.id);
  const r = await runReminders(env, NOW);
  assert.deepEqual([r.users, r.sent, r.failed], [1, 1, 0]);
  assert.equal(m.sent.length, 1);
  const msg = m.sent[0];
  assert.equal(msg.to, 'a@example.com');
  assert.match(msg.text, /前日の制度/);
  assert.match(msg.text, /7日後の制度/);
  assert.doesNotMatch(msg.text, /3日後の制度|申請済み|締切なし/);
  assert.match(msg.text, /\/api\/notify\/unsubscribe\?u=\d+&t=tok123/);
  assert.match(msg.text, /https:\/\/hojyokin\.net\/grants\/in7\.html/);
  assert.ok(msg.headers['List-Unsubscribe']);
  const again = await runReminders(env, NOW);
  assert.equal(again.users, 0);
  assert.equal(m.sent.length, 1);
});

test('通知：送信に失敗したら記録せず、機能がオフなら何もしない', async () => {
  const db = d1();
  const u = await seed(db);
  db.raw.prepare('UPDATE users SET notify = 1, notify_token = ? WHERE id = ?').run('t', u.id);
  const bad = { send: async () => { throw Object.assign(new Error('x'), { code: 'E_FAIL' }); } };
  const r = await runReminders({ DB: db, MAIL: bad, NOTIFY_ENABLED: 'true' }, NOW);
  assert.deepEqual([r.sent, r.failed], [0, 1]);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS n FROM notify_log').get().n, 0);
  assert.equal((await dueReminders(db, '2026-10-19')).length, 1); // 次の実行でも対象のまま
  assert.equal((await runReminders({ DB: db, MAIL: mailer(), NOTIFY_ENABLED: 'false' }, NOW)).skipped, true);
});

function app() {
  const db = d1();
  const env = { DB: db, GOOGLE_CLIENT_ID: 'c', NOTIFY_ENABLED: 'true', MAIL: mailer(), SUBSIDY_AI: 'off', ASSETS: { fetch: async () => new Response('a') } };
  const call = (path, init = {}) => worker.fetch(new Request(`https://example.test${path}`, init), env);
  return { db, env, call };
}
async function loginCookie({ db }) {
  const u = await upsertUser(db, { sub: 'g9', email: 'z@example.com', name: 'Z' }, Date.now());
  return { u, cookie: `__Host-sid=${await createSession(db, u.id)}` };
}

test('API：通知の設定の読み出し・オン・オフ、メールのリンクでの停止', async () => {
  const a = app();
  const { u, cookie } = await loginCookie(a);
  const get = async () => (await a.call('/api/notify', { headers: { cookie } })).json();
  assert.deepEqual(await get(), { available: true, notify: false, email: 'z@example.com' });
  const post = (on, origin = 'https://example.test') => a.call('/api/notify', { method: 'POST', headers: { cookie, 'content-type': 'application/json', origin }, body: JSON.stringify({ on }) });
  assert.equal((await post(true, 'https://evil.test')).status, 403);
  assert.equal((await post(true)).status, 200);
  assert.equal((await get()).notify, true);
  const token = a.db.raw.prepare('SELECT notify_token AS t FROM users WHERE id = ?').get(u.id).t;
  assert.equal(token.length, 64);
  assert.equal((await a.call(`/api/notify/unsubscribe?u=${u.id}&t=wrong`)).status, 400);
  assert.equal((await get()).notify, true);
  const ok = await a.call(`/api/notify/unsubscribe?u=${u.id}&t=${token}`, { method: 'POST' }); // メールソフトのワンクリック解除
  assert.equal(ok.status, 200);
  assert.equal((await get()).notify, false);
  assert.equal((await a.call('/api/notify')).status, 401);
});

test('API：メール通知の機能がオフのとき、設定はできない', async () => {
  const a = app();
  a.env.NOTIFY_ENABLED = 'false';
  const { cookie } = await loginCookie(a);
  assert.equal((await (await a.call('/api/notify', { headers: { cookie } })).json()).available, false);
  const r = await a.call('/api/notify', { method: 'POST', headers: { cookie, 'content-type': 'application/json', origin: 'https://example.test' }, body: '{"on":true}' });
  assert.equal(r.status, 503);
});
