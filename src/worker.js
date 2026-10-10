// Cloudflare Workers のエントリーポイント。Express（server.js）と同じ API を fetch ハンドラで提供する。
// 静的ファイル（public/）は Workers Assets が配信し、/api/* だけがこの Worker に届く（wrangler.jsonc の run_worker_first）。
// レート制限は Cloudflare ダッシュボード側のルールで行う（README を参照）。
import { runSearch } from './search.js';
import { lookupPostalCode } from './postal.js';
import { aiEnabled, chatWithClaude } from './ai.js';
import { TtlCache, SECURITY_HEADERS } from './middleware.js';
import { createAssetsGrantsLoader } from './grants-assets.js';
import { parseChatMessages, aiUnavailable } from './chat-input.js';
import { errorPayload } from './http-error.js';
import { parseContact, buildRawMessage } from './contact.js';

const MAX_BODY_BYTES = 32 * 1024;
const cache = new TtlCache();
let grantsLoader;

// Secret / 環境変数を process.env に写す（ai.js が process.env を参照するため）
function applyEnv(env) {
  for (const [key, value] of Object.entries(env)) {
    if (typeof value === 'string') process.env[key] = value;
  }
}

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...SECURITY_HEADERS, ...extraHeaders },
  });
}

function httpError(status, message) {
  return Object.assign(new Error(message), { status, expose: true });
}

async function readJsonBody(request) {
  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) throw httpError(413, 'リクエストが大きすぎます');
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw httpError(400, 'リクエストが不正です');
  }
}

function allow(request, method) {
  if (request.method !== method) {
    throw Object.assign(httpError(405, '許可されていないメソッドです'), { allow: method });
  }
}

async function route(request, env, url) {
  const { pathname } = url;

  if (pathname === '/api/health') {
    allow(request, 'GET');
    return { ok: true, ai: aiEnabled() };
  }

  if (pathname === '/api/config') {
    allow(request, 'GET');
    return { googleClientId: env.GOOGLE_CLIENT_ID || null };
  }

  if (pathname.startsWith('/api/postal/')) {
    allow(request, 'GET');
    let zip;
    try {
      zip = decodeURIComponent(pathname.slice('/api/postal/'.length));
    } catch {
      throw httpError(400, '郵便番号は7桁の数字で入力してください');
    }
    return lookupPostalCode(zip, { cache });
  }

  if (pathname === '/api/search') {
    allow(request, 'POST');
    const body = await readJsonBody(request);
    grantsLoader ??= createAssetsGrantsLoader(env.ASSETS);
    return runSearch(body ?? {}, { cache, loadGrants: grantsLoader });
  }

  if (pathname === '/api/chat') {
    allow(request, 'POST');
    const body = await readJsonBody(request);
    const result = await chatWithClaude(parseChatMessages(body?.messages));
    if (result === null) throw aiUnavailable();
    return result;
  }

  if (pathname === '/api/contact') {
    allow(request, 'POST');
    const input = parseContact(await readJsonBody(request));
    if (input.spam) return { ok: true };
    // 送信には、wrangler.jsonc の send_email バインディング（CONTACT_EMAIL）と、送信先の Secret（CONTACT_TO）が必要
    if (!env.CONTACT_EMAIL || !env.CONTACT_TO) throw httpError(503, 'フォームは現在ご利用いただけません。メールでご連絡ください。');
    const { EmailMessage } = await import('cloudflare:email');
    const from = env.CONTACT_FROM || 'noreply@hojyokin.net';
    const raw = buildRawMessage({ from, to: env.CONTACT_TO, ...input });
    try {
      await env.CONTACT_EMAIL.send(new EmailMessage(from, env.CONTACT_TO, raw));
    } catch (e) {
      console.error(e);
      throw httpError(503, '送信できませんでした。お手数ですが、メールでご連絡ください。');
    }
    return { ok: true };
  }

  throw httpError(404, '見つかりません');
}

export default {
  async fetch(request, env) {
    applyEnv(env);
    const url = new URL(request.url);
    // html_handling が "none" のため、トップページ（/）だけ index.html を返す。他のファイルは URL のまま配信される
    if (url.pathname === '/') return env.ASSETS.fetch(new Request(new URL('/index.html', url), request));
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    try {
      return json(await route(request, env, url));
    } catch (e) {
      const { status, error } = errorPayload(e);
      if (status >= 500) console.error(e);
      return json({ error }, status, e.allow ? { allow: e.allow } : {});
    }
  },
};
