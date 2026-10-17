// 締切のメール通知。会員が「通知を受け取る」を選んだとき、保存した制度の締切の7日前と前日に、1通のメールにまとめて送る。
// 毎朝（wrangler.jsonc の cron）、worker.js の scheduled から runReminders を呼ぶ。送信は Cloudflare のメール送信（Email Service）。
import { newToken } from './auth.js';

export const KINDS = { 7: 'd7', 1: 'd1' };
const ACTIVE = "('want','check','prep')"; // 申請済み・結果の制度には、送らない
const SITE = 'https://hojyokin.net';
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// ISO 日時・日付文字列を、日本時間の日付 YYYY-MM-DD にする
export function jstDate(value) {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const t = Date.parse(value);
  return Number.isNaN(t) ? null : new Date(t + 9 * 3600e3).toISOString().slice(0, 10);
}
export const daysBetween = (from, to) => Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000);
const dateJa = (d) => `${+d.slice(5, 7)}月${+d.slice(8, 10)}日`;

export async function getNotify(db, userId) {
  const r = await db.prepare('SELECT notify FROM users WHERE id = ?1').bind(userId).first();
  return Boolean(r?.notify);
}
export async function setNotify(db, userId, on) {
  if (on) {
    await db.prepare('UPDATE users SET notify = 1, notify_token = COALESCE(notify_token, ?2) WHERE id = ?1').bind(userId, newToken()).run();
  } else {
    await db.prepare('UPDATE users SET notify = 0 WHERE id = ?1').bind(userId).run();
  }
  return on;
}
export async function unsubscribe(db, userId, token) {
  const u = Number(userId);
  if (!Number.isInteger(u) || !token) return false;
  const r = await db.prepare('SELECT notify_token AS t FROM users WHERE id = ?1').bind(u).first();
  if (!r?.t || r.t.length !== String(token).length) return false;
  let diff = 0;
  for (let i = 0; i < r.t.length; i++) diff |= r.t.charCodeAt(i) ^ String(token).charCodeAt(i);
  if (diff !== 0) return false;
  await db.prepare('UPDATE users SET notify = 0 WHERE id = ?1').bind(u).run();
  return true;
}

// 今日送る通知を、会員ごとにまとめる
export async function dueReminders(db, today) {
  const rows = (await db.prepare(`SELECT u.id AS uid, u.email, u.name, u.notify_token AS token, s.id, s.name AS title, s.url, s.deadline
    FROM users u JOIN saved s ON s.user_id = u.id
    WHERE u.notify = 1 AND s.deadline IS NOT NULL AND s.status IN ${ACTIVE}`).all()).results || [];
  const sent = new Set((await db.prepare('SELECT user_id, saved_id, kind, deadline FROM notify_log').all()).results.map((r) => `${r.user_id}|${r.saved_id}|${r.kind}|${r.deadline}`));
  const groups = new Map();
  for (const r of rows) {
    const deadline = jstDate(r.deadline);
    if (!deadline) continue;
    const days = daysBetween(today, deadline);
    const kind = KINDS[days];
    if (!kind || sent.has(`${r.uid}|${r.id}|${kind}|${deadline}`)) continue;
    if (!groups.has(r.uid)) groups.set(r.uid, { user: { id: r.uid, email: r.email, name: r.name, token: r.token }, items: [] });
    groups.get(r.uid).items.push({ id: r.id, title: r.title, url: r.url, deadline, days, kind });
  }
  for (const g of groups.values()) g.items.sort((a, b) => a.days - b.days);
  return [...groups.values()];
}

export function buildMail(group, origin = SITE) {
  const { user, items } = group;
  const unsub = `${origin}/api/notify/unsubscribe?u=${user.id}&t=${encodeURIComponent(user.token || '')}`;
  const abs = (u) => (/^https?:\/\//i.test(u || '') ? u : u ? `${origin}${u.startsWith('/') ? '' : '/'}${u}` : `${origin}/mypage.html`);
  const when = (i) => (i.days === 1 ? '明日が締切' : `あと${i.days}日（${dateJa(i.deadline)}）`);
  const text = [
    `${user.name || 'ご利用者'}さん`, '', '保存した補助金の締切が近づいています。', '',
    ...items.flatMap((i) => [`・${i.title}`, `  ${when(i)}`, `  ${abs(i.url)}`]), '',
    `マイページ：${origin}/mypage.html`, '', '※ 締切や条件は、必ず公式の公募要領で確認してください。', '',
    `このメールの配信をやめる：${unsub}`, '補助金ネット',
  ].join('\n');
  const html = `<p>${esc(user.name || 'ご利用者')}さん</p><p>保存した補助金の締切が近づいています。</p><ul>${items.map((i) => `<li><a href="${esc(abs(i.url))}">${esc(i.title)}</a><br>${esc(when(i))}</li>`).join('')}</ul><p><a href="${origin}/mypage.html">マイページで確認する</a></p><p style="color:#666;font-size:12px">締切や条件は、必ず公式の公募要領で確認してください。<br><a href="${esc(unsub)}">このメールの配信をやめる</a>｜補助金ネット</p>`;
  return { subject: `【補助金ネット】保存した補助金の締切が近づいています（${items.length}件）`, text, html, unsub };
}

export async function runReminders(env, now = Date.now()) {
  const today = new Date(now + 9 * 3600e3).toISOString().slice(0, 10);
  const mailer = env.MAIL || env.CONTACT_EMAIL;
  if (!env.DB || !mailer || env.NOTIFY_ENABLED !== 'true') return { skipped: true, users: 0, sent: 0, failed: 0 };
  const origin = env.SITE_ORIGIN || SITE;
  const from = { email: env.NOTIFY_FROM || 'noreply@hojyokin.net', name: '補助金ネット' };
  let sent = 0, failed = 0;
  const groups = await dueReminders(env.DB, today);
  for (const g of groups) {
    const m = buildMail(g, origin);
    const base = { to: g.user.email, from, subject: m.subject, text: m.text, html: m.html };
    try {
      try {
        await mailer.send({ ...base, headers: { 'List-Unsubscribe': `<${m.unsub}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' } });
      } catch {
        await mailer.send(base); // ヘッダーが受け付けられなかったときは、ヘッダーなしで1度だけ送り直す
      }
    } catch (e) {
      console.error('reminder failed', g.user.id, e?.code || e?.message);
      failed += 1;
      continue;
    }
    sent += 1;
    await env.DB.batch(g.items.map((i) => env.DB.prepare('INSERT OR IGNORE INTO notify_log (user_id, saved_id, kind, deadline, sent_at) VALUES (?1, ?2, ?3, ?4, ?5)').bind(g.user.id, i.id, i.kind, i.deadline, now)));
  }
  return { users: groups.length, sent, failed };
}
