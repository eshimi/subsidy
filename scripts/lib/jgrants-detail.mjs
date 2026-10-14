// jGrants の制度ごとの詳細（説明文・補助率・利用目的など）を、差分で取り込む。
//  ・保存先：data/jgrants-details.json（リポジトリに置く。毎朝の GitHub Actions が更新し、ビルドはそれを読むだけ）
//  ・取るのは「まだ持っていない制度」と「一覧の内容（締切・上限額など）が変わった制度」だけ。募集が終わった制度は消す。
//  ・1回に取る件数に上限を設ける（初回は、締切の近い順に数日かけて埋まる）。取れなかった制度は、一覧の5項目の表示のまま。
//  ・API の項目名は変わりうるので、どの項目が欠けても動くようにしてある。添付資料（本体は巨大）は、ファイル名だけ残す。
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const CACHE_FILE = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data', 'jgrants-details.json');
export function loadCache(file = CACHE_FILE) {
  try { return existsSync(file) ? JSON.parse(readFileSync(file, 'utf-8')) : { version: 1, items: {} }; } catch { return { version: 1, items: {} }; }
}

export const DETAIL_API = 'https://api.jgrants-portal.go.jp/exp/v1/public/subsidies/id/';
export const DETAIL_TEXT_MAX = 2500;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const str = (v) => (v == null ? '' : String(v).trim());
const first = (raw, ...keys) => { for (const k of keys) { const v = str(raw?.[k]); if (v) return v; } return ''; };

const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&apos;': "'" };
// HTML の説明文を、段落つきの文章（プレーンテキスト）にする。タグは残さない
export function htmlToText(html) {
  const s = str(html)
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|tr|h[1-6]|ul|ol|table)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '・')
    .replace(/<[^>]+>/g, '')
    .replace(/&(?:amp|lt|gt|quot|#39|nbsp|apos);/g, (m) => ENT[m])
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
  return s.split('\n').map((l) => l.replace(/[ \t　]+/g, ' ').trim()).filter(Boolean).join('\n');
}

export function clip(text, max = DETAIL_TEXT_MAX) {
  if (text.length <= max) return { text, clipped: false };
  const cut = text.slice(0, max);
  const at = Math.max(cut.lastIndexOf('\n'), cut.lastIndexOf('。'));
  return { text: (at > max * 0.6 ? cut.slice(0, at + (cut[at] === '。' ? 1 : 0)) : cut).trim(), clipped: true };
}

// API の詳細1件を、保存する形にする（欠けている項目は入れない）
export function normalizeDetail(input) {
  const raw = Array.isArray(input) ? input[0] : input;
  if (!raw || typeof raw !== 'object') return null;
  const files = [];
  for (const key of ['application_guidelines', 'outline_of_grant', 'application_form', 'outline_of_application']) {
    for (const f of Array.isArray(raw[key]) ? raw[key] : []) {
      const name = str(f?.name);
      if (name && !files.includes(name)) files.push(name);
    }
  }
  const body = clip(htmlToText(raw.detail));
  const out = {
    catch: first(raw, 'subsidy_catch_phrase', 'catch_phrase'),
    purpose: first(raw, 'use_purpose'),
    industry: first(raw, 'industry'),
    areaDetail: htmlToText(first(raw, 'target_area_detail')),
    rate: first(raw, 'subsidy_rate'),
    projectEnd: first(raw, 'project_end_deadline'),
    text: body.text,
    clipped: body.clipped,
    files: files.slice(0, 12),
  };
  for (const k of Object.keys(out)) if (out[k] === '' || (Array.isArray(out[k]) && !out[k].length) || out[k] === false) delete out[k];
  return Object.keys(out).length ? out : null;
}

// 一覧の内容が変わったか調べるための印
export const sigOf = (g) => createHash('sha1').update([g.title, g.start, g.end, g.max, g.area, g.employees].map((v) => str(v)).join('|')).digest('hex').slice(0, 12);

async function fetchOne(id, { fetchImpl, retries = 2 }) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetchImpl(`${DETAIL_API}${encodeURIComponent(id)}`, { signal: AbortSignal.timeout(30_000), headers: { accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json();
      return normalizeDetail(body.result ?? body);
    } catch (e) {
      if (attempt > retries) throw e;
      await sleep(1000 * 2 ** attempt);
    }
  }
}

// 差分の取り込み。grants は今の一覧（募集中）、cache は前回の保存（{ items: { id: { sig, ...詳細 } } }）
export async function syncDetails({ grants, cache, fetchImpl = fetch, budget = 400, delayMs = 300, now = Date.now(), log = () => {} }) {
  const prev = cache?.items || {};
  const next = {};
  const todo = [];
  for (const g of grants) {
    const sig = sigOf(g);
    const old = prev[g.id];
    if (old && old.sig === sig) next[g.id] = old;
    else todo.push({ g, sig, old });
  }
  // 締切の近い制度を先に取る。前回の保存がある制度（内容が変わった分）も、取れなければ古いまま残す
  todo.sort((a, b) => String(a.g.end).localeCompare(String(b.g.end)));
  let fetched = 0;
  let failed = 0;
  let streak = 0;
  for (const { g, sig, old } of todo) {
    if (fetched >= budget || streak >= 5) { if (old) next[g.id] = old; continue; }
    try {
      const d = await fetchOne(g.id, { fetchImpl });
      fetched++;
      streak = 0;
      next[g.id] = { sig, fetchedAt: new Date(now).toISOString().slice(0, 10), ...(d || { empty: true }) };
    } catch (e) {
      failed++;
      streak++;
      if (old) next[g.id] = old;
      log(`  詳細の取得に失敗 ${g.id}: ${e.message}`);
    }
    await sleep(delayMs);
  }
  const pending = todo.length - fetched - failed;
  const live = new Set(grants.map((g) => g.id));
  const removed = Object.keys(prev).filter((id) => !live.has(id)).length;
  return { cache: { version: 1, items: next }, stats: { total: grants.length, kept: grants.length - todo.length, fetched, failed, pending: Math.max(0, pending), removed } };
}

// 保存したものを、キー順に並べて書き出す（差分を小さく保つ）
export function serialize(cache) {
  const items = Object.fromEntries(Object.keys(cache.items).sort().map((id) => [id, cache.items[id]]));
  return `${JSON.stringify({ version: 1, items }, null, 0).replace(/},"/g, '},\n"')}\n`;
}
