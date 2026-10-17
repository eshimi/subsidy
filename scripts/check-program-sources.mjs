// 制度ガイド（自治体）の公式ページを取り直して、変化を検出する（data/program-source-state.json を更新）。
// 使い方：node scripts/check-program-sources.mjs [--limit N]（毎週月曜の自動更新と、手動実行のときに動く）。結果は標準出力と GITHUB_STEP_SUMMARY に出す。
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';
import { LOCAL_PROGRAMS } from '../src/data/local-programs.js';
import { pageable } from './lib/program-detail.mjs';
import { inspect, nextState, loadState, STATE_FILE, isHidden, needsReview, textOf } from './lib/program-source.mjs';

const ROOT = join(import.meta.dirname, '..');
const limit = Number(process.argv[process.argv.indexOf('--limit') + 1]) || Infinity;
const UA = 'Mozilla/5.0 (compatible; hojyokin-net-source-check; +https://hojyokin.net/policy/sources.html)';
const today = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);

async function get(url) {
  for (let i = 0; i < 2; i++) {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 45000);
    try {
      const res = await fetch(url, { redirect: 'follow', signal: ac.signal, headers: { 'user-agent': UA, accept: 'text/html,*/*' } });
      const buf = await res.arrayBuffer();
      clearTimeout(t);
      if (res.status >= 500 && i === 0) continue;
      return { status: res.status, text: res.status === 200 ? textOf(buf, res.headers.get('content-type') || '') : '' };
    } catch { clearTimeout(t); }
  }
  return { status: 0, text: '' };
}

const details = JSON.parse(readFileSync(join(ROOT, 'data', 'program-details.json'), 'utf-8')).items;
const byId = new Map(LOCAL_PROGRAMS.map((p) => [p.id, p]));
const ids = Object.keys(details).filter((id) => pageable(details[id]) && byId.has(id)).slice(0, limit);
const state = loadState();
state.items = state.items || {};

let next = 0;
async function worker() {
  while (next < ids.length) {
    const id = ids[next++];
    const r = await get(byId.get(id).url);
    state.items[id] = nextState(state.items[id], inspect(details[id], r.status, r.text), today);
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
state.checkedAt = today;
writeFileSync(STATE_FILE, `${JSON.stringify(state, null, 1)}\n`);

const rows = ids.map((id) => [id, state.items[id]]);
const hidden = rows.filter(([id, s]) => isHidden(s, details[id], today)), review = rows.filter(([, s]) => needsReview(s)), failing = rows.filter(([, s]) => !isHidden(s) && (s.fail || 0) > 0);
const lines = [
  `## 制度ガイド（自治体）の公式ページの確認（${today}）`,
  `確認 ${ids.length} 件／公開を止めた ${hidden.length} 件／内容が変わった可能性（要再確認） ${review.length} 件／一時的に取得できない ${failing.length} 件`,
  ...hidden.map(([id, s]) => `- 公開を止めた：${id}（${(s.fail || 0) >= 2 ? `取得できない状態が続く（HTTP ${s.lastStatus}）` : '申請期間が終わった'}）`),
  ...review.map(([id, s]) => `- 要再確認：${id}（${s.problems[0] || '公式ページに、終了を示す表現が増えた'}）`),
  ...failing.map(([id, s]) => `- 取得できない：${id}（HTTP ${s.lastStatus}、連続 ${s.fail}）`),
];
console.log(lines.join('\n'));
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${lines.join('\n')}\n`);
