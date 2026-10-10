// /api/contact（お問い合わせフォーム）の入力検証と、送信するメールの組み立て。Workers 以外でも試せるよう、送信処理とは分けている。
const MAX_MESSAGE = 2000;
const MAX_NAME = 100;
const CATEGORIES = ['ご意見・ご要望', '情報の誤りのご指摘', '不具合のご報告', '広告・提携について', 'その他'];
const EMAIL_RE = /^[^\s@<>"',;:]+@[^\s@<>"',;:]+\.[^\s@<>"',;:]+$/;

const bad = (message) => Object.assign(new Error(message), { status: 400, expose: true });

export function parseContact(body) {
  if (!body || typeof body !== 'object') throw bad('入力が正しくありません');
  // ボット対策のおとり欄。入っていれば、成功したように見せて送らない
  if (typeof body.website === 'string' && body.website.trim()) return { spam: true };
  const str = (v) => (typeof v === 'string' ? v.trim() : '');
  const name = str(body.name);
  const email = str(body.email);
  const category = str(body.category);
  const message = str(body.message);
  if (name.length > MAX_NAME) throw bad(`お名前は${MAX_NAME}字以内で入力してください`);
  if (!email || email.length > 200 || !EMAIL_RE.test(email)) throw bad('返信先のメールアドレスを正しく入力してください');
  if (!CATEGORIES.includes(category)) throw bad('お問い合わせの種類を選んでください');
  if (!message) throw bad('お問い合わせの内容を入力してください');
  if (message.length > MAX_MESSAGE) throw bad(`お問い合わせの内容は${MAX_MESSAGE}字以内で入力してください`);
  return { name, email, category, message };
}

const b64 = (text) => {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
};
const wrap = (s) => s.replace(/(.{76})/g, '$1\r\n');

// 送信用の MIME メッセージ（件名・本文は UTF-8 の Base64）
export function buildRawMessage({ from, to, name, email, category, message }) {
  const subject = `=?UTF-8?B?${b64(`【補助金ネット】${category}`)}?=`;
  const bodyText = `お名前：${name || '（未入力）'}\r\n返信先：${email}\r\n種類：${category}\r\n\r\n${message}\r\n`;
  return [
    `From: 補助金ネット <${from}>`.replace('補助金ネット', `=?UTF-8?B?${b64('補助金ネット')}?=`),
    `To: ${to}`,
    `Reply-To: ${email}`,
    `Subject: ${subject}`,
    `Message-ID: <${crypto.randomUUID()}@hojyokin.net>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrap(b64(bodyText)),
    '',
  ].join('\r\n');
}

// 任意の件名・本文でメールを組み立てる（無料相談などで使う）
export function buildMail({ from, to, replyTo, subject, text }) {
  return [
    `From: =?UTF-8?B?${b64('補助金ネット')}?= <${from}>`,
    `To: ${to}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Subject: =?UTF-8?B?${b64(subject)}?=`,
    `Message-ID: <${crypto.randomUUID()}@hojyokin.net>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrap(b64(`${text}\r\n`)),
    '',
  ].join('\r\n');
}

export { CATEGORIES };
