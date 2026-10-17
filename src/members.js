// 会員のデータ（D1）。保存した制度は表に、閲覧履歴・条件は kv にまるごと入れる。
// 返すデータの形は、ブラウザの localStorage（public/mypage-store.js の KEYS）と同じにしてある。
import { hashToken, newToken, sessionExpiry } from './auth.js';

export const MAX_SAVED = 500;
export const MAX_OPS = 200;
const STATUSES = new Set(['want', 'check', 'prep', 'applied', 'result']);
const RESULTS = new Set(['', 'adopted', 'rejected']);
const KV_KEYS = new Set(['history', 'prefs']);
const KV_MAX_BYTES = 16 * 1024;

const str = (v, max) => (v === null || v === undefined ? null : String(v).slice(0, max));
const num = (v, fallback) => (Number.isFinite(Number(v)) && Number(v) > 0 ? Math.floor(Number(v)) : fallback);
const safeUrl = (u) => {
  const s = String(u ?? '').trim().slice(0, 1000);
  return /^https?:\/\//i.test(s) || (s && !/^[A-Za-z][A-Za-z0-9+.-]*:/.test(s) && !s.startsWith('//')) ? s : '';
};

export async function upsertUser(db, { sub, email, name }, now = Date.now()) {
  await db.prepare('INSERT INTO users (google_sub, email, name, created_at, last_login) VALUES (?1, ?2, ?3, ?4, ?4) ON CONFLICT(google_sub) DO UPDATE SET email = ?2, name = ?3, last_login = ?4').bind(sub, email, name || '', now).run();
  return db.prepare('SELECT id, email, name FROM users WHERE google_sub = ?1').bind(sub).first();
}

export async function createSession(db, userId, now = Date.now()) {
  const token = newToken();
  await db.prepare('DELETE FROM sessions WHERE expires_at < ?1').bind(now).run();
  await db.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?1, ?2, ?3)').bind(await hashToken(token), userId, sessionExpiry(now)).run();
  return token;
}

export async function userBySession(db, token, now = Date.now()) {
  if (!token) return null;
  return db.prepare('SELECT u.id, u.email, u.name FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ?1 AND s.expires_at > ?2').bind(await hashToken(token), now).first();
}

export async function deleteSession(db, token) {
  if (token) await db.prepare('DELETE FROM sessions WHERE token_hash = ?1').bind(await hashToken(token)).run();
}

export async function loadData(db, userId) {
  const rows = (await db.prepare('SELECT * FROM saved WHERE user_id = ?1 ORDER BY saved_at DESC').bind(userId).all()).results || [];
  const saved = {};
  const meta = {};
  for (const r of rows) {
    saved[r.id] = { id: r.id, name: r.name, url: r.url || '', provider: r.provider, amount: r.amount, deadline: r.deadline, period: r.period, savedAt: r.saved_at };
    if (r.status !== 'want' || r.result || r.memo) meta[r.id] = { status: r.status, result: r.result, memo: r.memo };
  }
  const kv = (await db.prepare('SELECT k, v FROM kv WHERE user_id = ?1').bind(userId).all()).results || [];
  const out = { saved, meta, history: [], prefs: {} };
  for (const { k, v } of kv) {
    try { out[k] = JSON.parse(v); } catch { /* 壊れた値は無視する */ }
  }
  return out;
}

// ブラウザから届いた変更を、検証して反映する。不正なものは捨てる
export async function applyOps(db, userId, ops, now = Date.now()) {
  if (!Array.isArray(ops) || ops.length > MAX_OPS) throw Object.assign(new Error('変更が多すぎます'), { status: 400, expose: true });
  const count = (await db.prepare('SELECT COUNT(*) AS n FROM saved WHERE user_id = ?1').bind(userId).first())?.n ?? 0;
  let room = MAX_SAVED - count;
  const stmts = [];
  for (const op of ops) {
    if (!op || typeof op !== 'object') continue;
    if (op.op === 'save' && op.item && typeof op.item === 'object' && op.item.id && op.item.name) {
      const it = op.item;
      if (room <= 0) continue; // 上限は、保存前の件数＋この要求で足す件数で見る（同じ制度の更新も数える安全側）
      room -= 1;
      stmts.push(db.prepare('INSERT INTO saved (user_id, id, name, url, provider, amount, deadline, period, saved_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9) ON CONFLICT(user_id, id) DO UPDATE SET name=?3, url=?4, provider=?5, amount=?6, deadline=?7, period=?8')
        .bind(userId, str(it.id, 200), str(it.name, 300), safeUrl(it.url), str(it.provider, 200), str(it.amount, 200), str(it.deadline, 40), str(it.period, 200), num(it.savedAt, now)));
    } else if (op.op === 'remove' && op.id) {
      stmts.push(db.prepare('DELETE FROM saved WHERE user_id = ?1 AND id = ?2').bind(userId, str(op.id, 200)));
    } else if (op.op === 'meta' && op.id && op.meta && typeof op.meta === 'object') {
      const m = op.meta;
      stmts.push(db.prepare('UPDATE saved SET status = ?3, result = ?4, memo = ?5 WHERE user_id = ?1 AND id = ?2')
        .bind(userId, str(op.id, 200), STATUSES.has(m.status) ? m.status : 'want', RESULTS.has(m.result) ? m.result : '', String(m.memo ?? '').slice(0, 500)));
    } else if (op.op === 'kv' && KV_KEYS.has(op.k)) {
      const v = JSON.stringify(op.v ?? null);
      if (new TextEncoder().encode(v).length > KV_MAX_BYTES) continue;
      stmts.push(db.prepare('INSERT INTO kv (user_id, k, v) VALUES (?1, ?2, ?3) ON CONFLICT(user_id, k) DO UPDATE SET v = ?3').bind(userId, op.k, v));
    }
  }
  if (stmts.length) await db.batch(stmts);
  return stmts.length;
}

export async function deleteUser(db, userId) {
  await db.batch([
    db.prepare('DELETE FROM sessions WHERE user_id = ?1').bind(userId),
    db.prepare('DELETE FROM saved WHERE user_id = ?1').bind(userId),
    db.prepare('DELETE FROM kv WHERE user_id = ?1').bind(userId),
    db.prepare('DELETE FROM users WHERE id = ?1').bind(userId),
  ]);
}
