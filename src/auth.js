// 会員のログイン（Google ログイン）。Google が発行した ID トークン（JWT）をサーバーで検証し、自前のセッション Cookie を発行する。
// 検証は Web Crypto だけで行う（Workers でそのまま動く）。
const GOOGLE_CERTS = 'https://www.googleapis.com/oauth2/v3/certs';
const ISSUERS = new Set(['https://accounts.google.com', 'accounts.google.com']);
export const SESSION_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

const b64urlToBytes = (s) => {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(s.length / 4) * 4, '='));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};
const decodeJson = (s) => JSON.parse(new TextDecoder().decode(b64urlToBytes(s)));
const toHex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

let certCache = { keys: null, at: 0 };
async function googleKeys(fetchImpl, now) {
  if (certCache.keys && now - certCache.at < 60 * 60 * 1000) return certCache.keys;
  const res = await fetchImpl(GOOGLE_CERTS);
  if (!res.ok) throw new Error(`certs ${res.status}`);
  certCache = { keys: (await res.json()).keys || [], at: now };
  return certCache.keys;
}
export const resetCertCache = () => { certCache = { keys: null, at: 0 }; };

// ID トークンを検証して、{ sub, email, name } を返す。失敗したら例外
export async function verifyGoogleIdToken(token, clientId, { fetchImpl = fetch, now = Date.now() } = {}) {
  const parts = String(token || '').split('.');
  if (parts.length !== 3 || !clientId) throw new Error('bad token');
  const header = decodeJson(parts[0]);
  const payload = decodeJson(parts[1]);
  if (header.alg !== 'RS256') throw new Error('bad alg');
  let keys = await googleKeys(fetchImpl, now);
  let jwk = keys.find((k) => k.kid === header.kid);
  if (!jwk) { certCache = { keys: null, at: 0 }; keys = await googleKeys(fetchImpl, now); jwk = keys.find((k) => k.kid === header.kid); }
  if (!jwk) throw new Error('unknown key');
  const key = await crypto.subtle.importKey('jwk', { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: 'RS256', ext: true }, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64urlToBytes(parts[2]), new TextEncoder().encode(`${parts[0]}.${parts[1]}`));
  if (!ok) throw new Error('bad signature');
  if (!ISSUERS.has(payload.iss)) throw new Error('bad iss');
  const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!aud.includes(clientId)) throw new Error('bad aud');
  if (!(payload.exp * 1000 > now)) throw new Error('expired');
  if (!payload.sub || !payload.email || payload.email_verified === false || payload.email_verified === 'false') throw new Error('unverified');
  return { sub: String(payload.sub), email: String(payload.email), name: payload.name ? String(payload.name) : '' };
}

export async function hashToken(token) {
  return toHex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token)));
}
export function newToken() {
  return toHex(crypto.getRandomValues(new Uint8Array(32)));
}

export const cookieName = (secure) => (secure ? '__Host-sid' : 'sid');
export function readCookie(request, name) {
  const raw = request.headers.get('cookie') || '';
  for (const part of raw.split(/;\s*/)) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i) === name) return decodeURIComponent(part.slice(i + 1));
  }
  return '';
}
export function sessionCookie(token, secure, maxAgeSeconds = SESSION_DAYS * 24 * 60 * 60) {
  return `${cookieName(secure)}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure ? '; Secure' : ''}`;
}

// 書き込みの API は、同じサイトからの要求だけを受け付ける（Origin が合わないものは拒否）
export function sameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  return origin === new URL(request.url).origin;
}

export const sessionExpiry = (now = Date.now()) => now + SESSION_DAYS * DAY_MS;
