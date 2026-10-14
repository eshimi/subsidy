// 「補助金データ」の履歴：国の制度（jGrants）の募集中の件数を、毎日1行ずつ data/research-history.json に記録する。
// 毎朝の GitHub Actions が、jGrants の一覧を取ったあとに実行し、リポジトリに保存する（同じ日に何度実行しても、その日の1行を上書きする）。
// 使い方：node scripts/update-research-history.mjs（前提：scripts/fetch-jgrants.mjs で public/data/jgrants/ を取得済み）
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGrants, statusOf } from './build-grant-pages.mjs';

export const HISTORY_FILE = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'research-history.json');
const DAY = 86400000;
const jst = (t) => new Date(t + 9 * 3600e3).toISOString().slice(0, 10);

export function loadHistory(file = HISTORY_FILE) {
  try { return existsSync(file) ? JSON.parse(readFileSync(file, 'utf-8')) : { version: 1, days: [] }; } catch { return { version: 1, days: [] }; }
}

// その日の1行：募集中の件数、うち全国向け、30日以内に締切、直近7日間に受付開始
export function recordFor(grants, now) {
  const open = grants.filter((g) => statusOf(g.end, now).key !== 'closed');
  return {
    date: jst(now),
    total: open.length,
    national: open.filter((g) => !g.area || String(g.area).includes('全国')).length,
    soon30: open.filter((g) => g.end && Date.parse(g.end) - now <= 30 * DAY).length,
    fresh7: open.filter((g) => g.start && now - Date.parse(g.start) <= 7 * DAY && Date.parse(g.start) <= now).length,
  };
}

export function addRecord(history, rec, keep = 400) {
  const days = (history.days || []).filter((d) => d.date !== rec.date).concat(rec).sort((a, b) => a.date.localeCompare(b.date));
  return { version: 1, days: days.slice(-keep) };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const grants = loadGrants();
  if (!grants) { console.log('今日の一覧が取れていないため、履歴の記録はスキップします'); process.exit(0); }
  const rec = recordFor(grants, Date.now());
  const next = addRecord(loadHistory(), rec);
  mkdirSync(dirname(HISTORY_FILE), { recursive: true });
  writeFileSync(HISTORY_FILE, `${JSON.stringify(next, null, 0).replace(/},\{/g, '},\n{')}\n`);
  console.log(`履歴を記録：${JSON.stringify(rec)}（${next.days.length}日分）`);
}
