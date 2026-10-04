// jGrants（デジタル庁）の公開APIから「現在募集中」の補助金をまとめて取得し、
// 都道府県ごとの JSON に分けて public/data/jgrants/ に書き出す。
//   node scripts/fetch-jgrants.mjs
// GitHub Pages のビルド（毎日の定期実行）と Render のビルドで使う。依存パッケージなし。
import { mkdir, rm, stat, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { PREFECTURES, prefFile } from '../src/data/prefectures.js';

export { PREFECTURES, prefFile };

export const API_URL = 'https://api.jgrants-portal.go.jp/exp/v1/public/subsidies';

// 幅広く拾うためのキーワード（結果は ID で重複を除く）
export const KEYWORDS = ['事業', '補助', '助成', '支援', '創業', '起業', '開業', '店舗', '設備', '販路', '雇用', '人材', 'デジタル', '省エネ', '観光', '農業', '承継', '商店街'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchKeyword(keyword, { fetchImpl, retries = 3 }) {
  const params = new URLSearchParams({ keyword, sort: 'acceptance_end_datetime', order: 'ASC', acceptance: '1' });
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetchImpl(`${API_URL}?${params}`, { signal: AbortSignal.timeout(30_000), headers: { accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json();
      return Array.isArray(body.result) ? body.result : [];
    } catch (e) {
      if (attempt >= retries) throw e;
      await sleep(1000 * 2 ** attempt);
    }
  }
}

// API の1件を、サイトで使う最小限の形にする
export function normalize(item) {
  const limit = Number(item.subsidy_max_limit);
  return {
    id: String(item.id),
    title: String(item.title || item.name || '').trim(),
    area: String(item.target_area_search || '').trim(),
    max: Number.isFinite(limit) && limit > 0 ? limit : null,
    start: item.acceptance_start_datetime || null,
    end: item.acceptance_end_datetime || null,
    employees: String(item.target_number_of_employees || '').trim(),
  };
}

// 対象地域の文字列から、全国向けか・どの都道府県向けかを判定する
export function areasOf(area) {
  if (!area || area.includes('全国')) return { national: true, prefectures: [] };
  return { national: false, prefectures: PREFECTURES.filter((p) => area.includes(p)) };
}

export function groupByArea(items) {
  const national = [];
  const byPref = Object.fromEntries(PREFECTURES.map((p) => [p, []]));
  for (const item of items) {
    const a = areasOf(item.area);
    if (a.national) national.push(item);
    for (const p of a.prefectures) byPref[p].push(item);
  }
  return { national, byPref };
}

export async function collect({ fetchImpl = fetch, keywords = KEYWORDS, delayMs = 400, log = console.log } = {}) {
  const byId = new Map();
  const failures = [];
  for (const keyword of keywords) {
    try {
      const results = await fetchKeyword(keyword, { fetchImpl });
      let added = 0;
      for (const raw of results) {
        const item = normalize(raw);
        if (!item.id || !item.title) continue;
        if (!byId.has(item.id)) added++;
        byId.set(item.id, item);
      }
      log(`  「${keyword}」 ${results.length}件（新規 ${added}件）`);
    } catch (e) {
      failures.push(keyword);
      log(`  「${keyword}」 取得失敗: ${e.message}`);
    }
    await sleep(delayMs);
  }
  return { items: [...byId.values()], failures };
}

export async function fetchAndWrite({ log = console.log } = {}) {
  const outDir = new URL('../public/data/jgrants/', import.meta.url);
  log('jGrants から募集中の補助金を取得します');
  const { items, failures } = await collect({ log });
  const generatedAt = new Date().toISOString();

  if (items.length === 0) {
    // 取得できなくてもサイトのビルドは止めない。前回のデータがあればそのまま残す
    console.warn('::warning::jGrants から1件も取得できませんでした');
    const hasPrevious = await stat(new URL('index.json', outDir)).then(() => true, () => false);
    if (!hasPrevious) {
      await mkdir(outDir, { recursive: true });
      await writeFile(new URL('index.json', outDir), JSON.stringify({ available: false, generatedAt, total: 0, failures }));
    }
    return { total: 0 };
  }

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const { national, byPref } = groupByArea(items);
  await writeFile(new URL('national.json', outDir), JSON.stringify(national));
  const prefectures = {};
  for (const [pref, list] of Object.entries(byPref)) {
    prefectures[pref] = list.length;
    await writeFile(new URL(prefFile(pref), outDir), JSON.stringify(list));
  }
  const index = { available: true, generatedAt, total: items.length, national: national.length, prefectures, failures };
  await writeFile(new URL('index.json', outDir), JSON.stringify(index));
  log(`合計 ${items.length}件（全国 ${national.length}件）を書き出しました`);
  log(`例: ${JSON.stringify(items.slice(0, 2))}`);
  return { total: items.length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchAndWrite().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
