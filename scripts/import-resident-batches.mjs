// 調べた個人向けの制度（JSON の配列ファイル）を検証して、src/data/resident-programs.js に取り込む。
// 使い方：node scripts/import-resident-batches.mjs <JSONのあるフォルダ>   （r-*.json を読む）
// 既に入っている制度は残し、id が同じものは新しいほうで置き換える。検証に通らないものは、理由を表示して取り込まない。
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RESIDENT_CATEGORIES, RESIDENT_PROGRAMS } from '../src/data/resident-programs.js';
import { PREFECTURES } from '../src/data/prefectures.js';

const FILE = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'resident-programs.js');
const TYPES = ['補助金', '助成金', '給付', '融資'];

// 1件の検証。問題の説明を配列で返す（空なら問題なし）
export function problemsOf(p) {
  const out = [];
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id || '')) out.push('id は小文字・数字・ハイフンのローマ字にする');
  for (const k of ['name', 'provider', 'amount', 'summary', 'period']) if (!String(p[k] || '').trim()) out.push(`${k} がありません`);
  if (!['prefecture', 'municipality'].includes(p.level)) out.push('level は prefecture か municipality');
  if (!RESIDENT_CATEGORIES.includes(p.category)) out.push(`category が不正：${p.category}`);
  if (!TYPES.includes(p.type)) out.push(`type が不正：${p.type}`);
  if (!Array.isArray(p.prefectures) || p.prefectures.length !== 1 || !PREFECTURES.includes(p.prefectures[0])) out.push('prefectures は都道府県名を1つ');
  if (!Array.isArray(p.cities)) out.push('cities は配列');
  else if (p.level === 'municipality' && p.cities.length < 1) out.push('municipality は cities が必要');
  else if (p.level === 'prefecture' && p.cities.length > 0) out.push('prefecture は cities を空にする');
  if (!Array.isArray(p.eligibility)) out.push('eligibility は配列');
  if (p.deadline != null && !/^\d{4}-\d{2}-\d{2}$/.test(p.deadline)) out.push('deadline は YYYY-MM-DD か null');
  if (!/^https:\/\/[^\s]+$/.test(p.url || '')) out.push('url は https の公式ページ');
  return out;
}

const cleaned = (p) => ({
  id: p.id, name: p.name.trim(), provider: p.provider.trim(), level: p.level, category: p.category, type: p.type,
  amount: p.amount.trim(), summary: p.summary.trim(), eligibility: p.eligibility.map((e) => String(e).trim()).filter(Boolean).slice(0, 3),
  prefectures: p.prefectures, cities: p.cities, period: p.period.trim(), deadline: p.deadline || null, url: p.url,
});

export function render(programs) {
  const order = (p) => PREFECTURES.indexOf(p.prefectures[0]);
  const sorted = [...programs].sort((a, b) => order(a) - order(b) || (a.level === b.level ? 0 : a.level === 'prefecture' ? -1 : 1) || a.id.localeCompare(b.id));
  const items = sorted.map((p) => `  ${JSON.stringify(p, null, 2).replace(/\n/g, '\n  ')},`).join('\n');
  const head = readFileSync(FILE, 'utf-8').split('export const RESIDENT_PROGRAMS = [')[0];
  return `${head}export const RESIDENT_PROGRAMS = [\n${items}\n];\n`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = process.argv[2];
  if (!dir) { console.error('使い方：node scripts/import-resident-batches.mjs <フォルダ>'); process.exit(1); }
  const byId = new Map(RESIDENT_PROGRAMS.map((p) => [p.id, p]));
  let added = 0, replaced = 0, rejected = 0;
  for (const f of readdirSync(dir).filter((x) => /^r-.*\.json$/.test(x)).sort()) {
    let list;
    try { list = JSON.parse(readFileSync(join(dir, f), 'utf-8')); } catch (e) { console.error(`${f}: JSON が読めません（${e.message}）`); continue; }
    for (const p of list) {
      const problems = problemsOf(p);
      if (problems.length) { rejected++; console.error(`× ${f} ${p.id || '(idなし)'}：${problems.join('／')}`); continue; }
      if (byId.has(p.id)) replaced++; else added++;
      byId.set(p.id, cleaned(p));
    }
  }
  writeFileSync(FILE, render([...byId.values()]));
  console.log(`取り込み：追加 ${added}、置き換え ${replaced}、除外 ${rejected}、合計 ${byId.size}`);
}
