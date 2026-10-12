// 調べた事業者向けの制度（JSON の配列ファイル）を検証して、src/data/local-programs-extra.js に取り込む。
// 使い方：node scripts/import-local-batches.mjs <JSONのあるフォルダ>   （b-*.json を読む）
// 既に入っている制度は残し、id が同じものは新しいほうで置き換える。検証に通らないものは、理由を表示して取り込まない。
// 手で整えた制度（local-programs.js）と id が同じものは、取り込まない。
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BUSINESS_CATEGORIES, LOCAL_PROGRAMS_EXTRA } from '../src/data/local-programs-extra.js';
import { LOCAL_PROGRAMS } from '../src/data/local-programs.js';
import { PREFECTURES } from '../src/data/prefectures.js';
import { INDUSTRIES, STAGES } from '../src/data/taxonomy.js';
import { AREA_CITIES } from '../src/data/area-cities.js';

const FILE = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'local-programs-extra.js');
const TYPES = ['補助金', '助成金', '融資', '給付金', '専門家支援'];
const CITY_NAMES = new Set(AREA_CITIES.map((c) => c.name));

// 1件の検証。問題の説明を配列で返す（空なら問題なし）
export function problemsOf(p) {
  const out = [];
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id || '')) out.push('id は小文字・数字・ハイフンのローマ字にする');
  for (const k of ['name', 'provider', 'amount', 'summary', 'period']) if (!String(p[k] || '').trim()) out.push(`${k} がありません`);
  if (!['prefecture', 'municipality'].includes(p.level)) out.push('level は prefecture か municipality');
  if (!BUSINESS_CATEGORIES.includes(p.cat)) out.push(`cat が不正：${p.cat}`);
  if (!TYPES.includes(p.type)) out.push(`type が不正：${p.type}`);
  if (!Array.isArray(p.prefectures) || p.prefectures.length !== 1 || !PREFECTURES.includes(p.prefectures[0])) out.push('prefectures は都道府県名を1つ');
  if (!Array.isArray(p.cities)) out.push('cities は配列');
  else if (p.level === 'municipality' && p.cities.length < 1) out.push('municipality は cities が必要');
  else if (p.level === 'prefecture' && p.cities.length > 0) out.push('prefecture は cities を空にする');
  else if (p.cities.some((c) => !CITY_NAMES.has(c))) out.push('cities は area-cities.js にある市区町村名');
  if (!Array.isArray(p.eligibility)) out.push('eligibility は配列');
  if (!(p.industries === 'all' || (Array.isArray(p.industries) && p.industries.length && p.industries.every((i) => INDUSTRIES[i])))) out.push('industries は "all" か業種キーの配列');
  if (!Array.isArray(p.stages) || !p.stages.length || !p.stages.every((s) => STAGES[s])) out.push('stages は planning/early/established の配列');
  if (p.deadline != null && !/^\d{4}-\d{2}-\d{2}$/.test(p.deadline)) out.push('deadline は YYYY-MM-DD か null');
  if (!/^https:\/\/[^\s]+$/.test(p.url || '')) out.push('url は https の公式ページ');
  return out;
}

const cleaned = (p) => ({
  id: p.id, name: p.name.trim(), provider: p.provider.trim(), level: p.level, type: p.type, cat: p.cat,
  amount: p.amount.trim(), summary: p.summary.trim(), eligibility: p.eligibility.map((e) => String(e).trim()).filter(Boolean).slice(0, 3),
  industries: p.industries, prefectures: p.prefectures, cities: p.cities, stages: p.stages,
  period: p.period.trim(), deadline: p.deadline || null, priority: Number.isFinite(p.priority) ? p.priority : p.level === 'municipality' ? 8 : 6, url: p.url,
});

export function render(programs) {
  const order = (p) => PREFECTURES.indexOf(p.prefectures[0]);
  const sorted = [...programs].sort((a, b) => order(a) - order(b) || (a.level === b.level ? 0 : a.level === 'prefecture' ? -1 : 1) || a.id.localeCompare(b.id));
  const items = sorted.map((p) => `  ${JSON.stringify(p, null, 2).replace(/\n/g, '\n  ')},`).join('\n');
  const head = readFileSync(FILE, 'utf-8').split('export const LOCAL_PROGRAMS_EXTRA = [')[0];
  return `${head}export const LOCAL_PROGRAMS_EXTRA = [\n${items}\n];\n`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = process.argv[2];
  if (!dir) { console.error('使い方：node scripts/import-local-batches.mjs <フォルダ>'); process.exit(1); }
  const extraIds = new Set(LOCAL_PROGRAMS_EXTRA.map((p) => p.id));
  const curatedIds = new Set(LOCAL_PROGRAMS.filter((p) => !extraIds.has(p.id)).map((p) => p.id));
  const byId = new Map(LOCAL_PROGRAMS_EXTRA.map((p) => [p.id, p]));
  let added = 0, replaced = 0, rejected = 0, skipped = 0;
  for (const f of readdirSync(dir).filter((x) => /^b-.*\.json$/.test(x)).sort()) {
    let list;
    try { list = JSON.parse(readFileSync(join(dir, f), 'utf-8')); } catch (e) { console.error(`${f}: JSON が読めません（${e.message}）`); continue; }
    for (const p of list) {
      // 業種が1つだけのとき、文字列で書かれていても配列にする
      if (typeof p.industries === 'string' && p.industries !== 'all') p.industries = [p.industries];
      if (Array.isArray(p.industries) && p.industries.includes('all')) p.industries = 'all';
      if (curatedIds.has(p.id)) { skipped++; continue; }
      const problems = problemsOf(p);
      if (problems.length) { rejected++; console.error(`× ${f} ${p.id || '(idなし)'}：${problems.join('／')}`); continue; }
      if (byId.has(p.id)) replaced++; else added++;
      byId.set(p.id, cleaned(p));
    }
  }
  writeFileSync(FILE, render([...byId.values()]));
  console.log(`取り込み：追加 ${added}、置き換え ${replaced}、既存の手整備と同じ id のため省略 ${skipped}、除外 ${rejected}、合計 ${byId.size}`);
}
