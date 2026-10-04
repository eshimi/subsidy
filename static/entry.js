// GitHub Pages 用の静的版。サーバーの代わりにブラウザ内で検索する。
// - 住所: zipcloud を JSONP で取得（CORS 不要）。失敗時は郵便番号から都道府県を推定
// - 募集中の補助金: ビルド時（毎日）に取り込んだ jGrants データを関連度順に並べる
// - Claude による解析は APIキーを公開できないため使わない
import { runSearchCore } from '../src/search-core.js';
import { lookupPostalCode } from '../src/postal.js';
import { TtlCache } from '../src/middleware.js';
import { prefFile } from '../src/data/prefectures.js';

const nativeFetch = window.fetch.bind(window);
const cache = new TtlCache();
let jsonpSeq = 0;

function jsonp(url, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const name = `__zipcloud${++jsonpSeq}`;
    const script = document.createElement('script');
    const cleanup = () => {
      delete window[name];
      script.remove();
      clearTimeout(timer);
    };
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('timeout'));
    }, timeoutMs);
    window[name] = (data) => {
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error('jsonp error'));
    };
    script.src = `${url}${url.includes('?') ? '&' : '?'}callback=${name}`;
    document.head.append(script);
  });
}

// サーバー版と同じモジュールに渡す fetch。zipcloud だけ JSONP に置き換える
async function browserFetch(url, init) {
  if (String(url).startsWith('https://zipcloud.ibsnet.co.jp/')) {
    return new Response(JSON.stringify(await jsonp(String(url))), { headers: { 'content-type': 'application/json' } });
  }
  return nativeFetch(url, init);
}

// ビルド時に取り込んだ jGrants データ（data/jgrants/）を読み込む。ブラウザから API は直接呼ばない
let grantsIndex;
async function getJson(path) {
  const res = await nativeFetch(path);
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return res.json();
}
async function loadGrants(prefecture) {
  grantsIndex ??= getJson('data/jgrants/index.json').catch(() => null);
  const index = await grantsIndex;
  if (!index?.available) return { available: false };
  const [national, local] = await Promise.all([
    getJson('data/jgrants/national.json').catch(() => []),
    getJson(`data/jgrants/${prefFile(prefecture)}`).catch(() => []),
  ]);
  return { available: true, generatedAt: index.generatedAt, items: [...local, ...national] };
}

const deps = { fetchImpl: browserFetch, cache, loadGrants, liveApi: false };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

async function handle(fn) {
  try {
    return json(await fn());
  } catch (e) {
    const status = e.status ?? 500;
    return json({ error: status >= 500 ? 'エラーが発生しました' : e.message }, status);
  }
}

// app.js が呼ぶ /api/* をブラウザ内の処理に振り替える
window.fetch = (url, init = {}) => {
  const path = String(url);
  if (path.startsWith('/api/postal/')) return handle(() => lookupPostalCode(decodeURIComponent(path.slice(12)), deps));
  if (path === '/api/search') return handle(() => runSearchCore(JSON.parse(init.body || '{}'), deps));
  return nativeFetch(url, init);
};

await import('../public/app.js');
