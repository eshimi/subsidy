// サーバー版: ビルド時に取り込んだ jGrants データ（public/data/jgrants/）を読み込む
import { readFile, stat } from 'node:fs/promises';
import { prefFile } from './data/prefectures.js';

const DIR = new URL('../public/data/jgrants/', import.meta.url);
let cache = { mtime: 0, index: null, files: new Map() };

async function readJson(name) {
  return JSON.parse(await readFile(new URL(name, DIR), 'utf8'));
}

// データが無ければ null（その場合は jGrants API の直接検索に切り替わる）
export async function loadGrants(prefecture) {
  let info;
  try {
    info = await stat(new URL('index.json', DIR));
  } catch {
    return null;
  }
  if (info.mtimeMs !== cache.mtime) cache = { mtime: info.mtimeMs, index: await readJson('index.json'), files: new Map() };
  const { index } = cache;
  if (!index.available) return { available: false };
  const load = async (name) => {
    if (!cache.files.has(name)) cache.files.set(name, await readJson(name).catch(() => []));
    return cache.files.get(name);
  };
  const [national, local] = await Promise.all([load('national.json'), load(prefFile(prefecture))]);
  return { available: true, generatedAt: index.generatedAt, items: [...local, ...national] };
}
