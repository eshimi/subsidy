// 「要確認」を調べ直した結果（fx-*.json）を、事業者向けの制度（src/data/local-programs-extra.js）に反映する。
// 使い方：node scripts/apply-fixes.mjs <フォルダ>   （fx-*.json を読む）
// 各要素：{ id, amount?, period?, deadline?, url?, ended?, src }。src は確認に使った公式ページのURL（https）。
//   amount / period / deadline / url：確認できたものだけを書く（書かれたものだけ置き換える）。
//   ended: true：募集が終了・廃止されたと確認できた制度（取り込みから外す）。
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { LOCAL_PROGRAMS_EXTRA } from '../src/data/local-programs-extra.js';
import { render } from './import-local-batches.mjs';

const FILE = new URL('../src/data/local-programs-extra.js', import.meta.url).pathname;
const isHttps = (u) => /^https:\/\/[^\s]+$/.test(u || '');

export function applyFixes(programs, fixes) {
  const byId = new Map(programs.map((p) => [p.id, { ...p }]));
  const stats = { amount: 0, period: 0, deadline: 0, url: 0, ended: 0, rejected: [] };
  for (const f of fixes) {
    const p = byId.get(f.id);
    if (!p) { stats.rejected.push(`${f.id}：該当する制度がありません`); continue; }
    if (!isHttps(f.src)) { stats.rejected.push(`${f.id}：src（確認に使った https のページ）がありません`); continue; }
    if (f.ended === true) { byId.delete(f.id); stats.ended++; continue; }
    if (typeof f.amount === 'string' && f.amount.trim() && !/^要確認$/.test(f.amount.trim())) { p.amount = f.amount.trim(); stats.amount++; }
    if (typeof f.period === 'string' && f.period.trim()) { p.period = f.period.trim(); stats.period++; }
    if (f.deadline && /^\d{4}-\d{2}-\d{2}$/.test(f.deadline)) { p.deadline = f.deadline; stats.deadline++; }
    if (isHttps(f.url) && f.url !== p.url) { p.url = f.url; stats.url++; }
  }
  return { programs: [...byId.values()], stats };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = process.argv[2];
  if (!dir) { console.error('使い方：node scripts/apply-fixes.mjs <フォルダ>'); process.exit(1); }
  const fixes = [];
  for (const f of readdirSync(dir).filter((x) => /^fx-.*\.json$/.test(x)).sort()) {
    try { fixes.push(...JSON.parse(readFileSync(join(dir, f), 'utf-8'))); } catch (e) { console.error(`${f}: JSON が読めません（${e.message}）`); }
  }
  const { programs, stats } = applyFixes(LOCAL_PROGRAMS_EXTRA, fixes);
  writeFileSync(FILE, render(programs));
  console.log(`反映：金額 ${stats.amount}、期間 ${stats.period}、締切 ${stats.deadline}、URL ${stats.url}、終了で除外 ${stats.ended}、却下 ${stats.rejected.length}（入力 ${fixes.length} 件）`);
  for (const r of stats.rejected.slice(0, 10)) console.error('×', r);
}
