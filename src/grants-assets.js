// Cloudflare Workers 版: デプロイ時に public/data/jgrants/ へ同梱した jGrants データを、
// Workers Assets（env.ASSETS）経由で読み込む。fs は使えないため grants-store.js の代わりに使う。
// アセットはデプロイごとに固定されるので、Worker のインスタンス内ではそのままメモリに保持してよい。
import { prefFile } from './data/prefectures.js';

const BASE = 'https://assets.invalid/data/jgrants/';

export function createAssetsGrantsLoader(assets) {
  const cache = new Map();

  const readJson = (name) => {
    if (!cache.has(name)) {
      const promise = assets
        .fetch(new Request(BASE + name))
        .then((res) => {
          if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
          return res.json();
        })
        .catch((e) => {
          cache.delete(name); // 失敗はキャッシュせず、次のリクエストで再試行する
          throw e;
        });
      cache.set(name, promise);
    }
    return cache.get(name);
  };

  // データが無ければ null（その場合は jGrants API の直接検索に切り替わる）
  return async function loadGrants(prefecture) {
    let index;
    try {
      index = await readJson('index.json');
    } catch {
      return null;
    }
    if (!index.available) return { available: false };
    const [national, local] = await Promise.all([
      readJson('national.json').catch(() => []),
      readJson(prefFile(prefecture)).catch(() => []),
    ]);
    return { available: true, generatedAt: index.generatedAt, items: [...local, ...national] };
  };
}
