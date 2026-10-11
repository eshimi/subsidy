// IndexNow：更新したページを、検索エンジン（Bing など）に知らせる。
// 前回知らせた内容（ページごとのハッシュ）と比べて、新しい・変わった・なくなったページだけを送る。
// 使い方: node scripts/indexnow.mjs [--all] [--dry-run] [--state .indexnow-state.json]
//   --all      前回の記録を使わず、サイトマップのすべてのページを送る
//   --dry-run  送らずに、送る予定のページを表示する
// キーのファイルは public/<キー>.txt（中身はキーだけ）。サイトの https://hojyokin.net/<キー>.txt で読めること。
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ORIGIN = 'https://hojyokin.net';
export const ENDPOINT = 'https://api.indexnow.org/IndexNow';
export const MAX_URLS = 10000; // 1回の送信で送れる上限

// sitemap.xml の <loc> を取り出す
export function urlsFromSitemap(xml) {
  return [...String(xml).matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
}

// URL に対応する public/ のファイルの場所（トップは index.html）
export function fileOf(publicDir, url) {
  const path = decodeURIComponent(new URL(url).pathname).replace(/^\/+/, '');
  return join(publicDir, path === '' || path.endsWith('/') ? `${path}index.html` : path);
}

const sha = (buf) => createHash('sha256').update(buf).digest('hex');

// ページごとのハッシュ（ファイルがないページは載せない）
export function hashPages(publicDir, urls) {
  const out = {};
  for (const u of urls) {
    const f = fileOf(publicDir, u);
    if (existsSync(f)) out[u] = sha(readFileSync(f));
  }
  return out;
}

// 前回との差：新しい・変わったページと、なくなったページ
export function diffPages(prev, next) {
  const changed = Object.keys(next).filter((u) => prev[u] !== next[u]);
  const removed = Object.keys(prev).filter((u) => !(u in next));
  return { changed, removed };
}

export function chunk(list, size = MAX_URLS) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

// public/ の中の、キーのファイル（<英数字・ハイフン 8〜128字>.txt で、中身がファイル名と同じもの）を探す
export function findKey(publicDir) {
  for (const f of readdirSync(publicDir)) {
    const m = f.match(/^([A-Za-z0-9-]{8,128})\.txt$/);
    if (m && readFileSync(join(publicDir, f), 'utf-8').trim() === m[1]) return m[1];
  }
  return '';
}

export async function submit(urlList, key, fetchImpl = fetch) {
  const host = new URL(ORIGIN).host;
  for (const part of chunk(urlList)) {
    const res = await fetchImpl(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList: part }),
    });
    // 200（受け付けた）・202（キーの確認待ちで受け付けた）が成功
    if (res.status !== 200 && res.status !== 202) throw new Error(`IndexNow が ${res.status} を返しました：${(await res.text()).slice(0, 200)}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const all = args.includes('--all');
  const dry = args.includes('--dry-run');
  const stateFile = args.includes('--state') ? args[args.indexOf('--state') + 1] : '.indexnow-state.json';
  const publicDir = resolve(fileURLToPath(new URL('../public', import.meta.url)));
  const key = findKey(publicDir);
  if (!key) throw new Error('public/ にキーのファイル（<キー>.txt）が見つかりません');
  const sitemap = join(publicDir, 'sitemap.xml');
  if (!existsSync(sitemap)) throw new Error('public/sitemap.xml がありません');
  const next = hashPages(publicDir, urlsFromSitemap(readFileSync(sitemap, 'utf-8')));
  const prev = !all && existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, 'utf-8')) : {};
  const { changed, removed } = diffPages(prev, next);
  const list = [...changed, ...removed];
  console.log(`IndexNow：新規・更新 ${changed.length} 件、削除 ${removed.length} 件（サイトマップ ${Object.keys(next).length} 件）`);
  if (!list.length) return;
  if (dry) { console.log(list.slice(0, 20).join('\n') + (list.length > 20 ? `\n…ほか ${list.length - 20} 件` : '')); return; }
  await submit(list, key);
  writeFileSync(stateFile, JSON.stringify(next));
  console.log(`IndexNow：${list.length} 件を送りました`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => { console.error(e.message); process.exit(1); });
}
