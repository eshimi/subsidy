// 調べた個人向けの制度（JSON の配列）を、公式ページの本文に対して検証する。取り込み（import-resident-batches.mjs）の前に実行する。
// 使い方：node scripts/verify-resident-batch.mjs <r-○.json> <本文のフォルダ>   （本文は <フォルダ>/<id>.txt）
// 各制度に evidence（本文からの引用、3つ以上）が要る。検査：取り込みの形式／引用が本文にそのままあること／金額・期間などの数字が本文にあること
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { norm, numbersIn } from './lib/program-detail.mjs';
import { problemsOf } from './import-resident-batches.mjs';

const [file, dir] = process.argv.slice(2);
if (!file || !dir) { console.error('使い方：node scripts/verify-resident-batch.mjs <r-○.json> <本文のフォルダ>'); process.exit(2); }
const list = JSON.parse(readFileSync(file, 'utf-8'));
let ok = 0, ng = 0;
for (const p of list) {
  const problems = problemsOf(p);
  const txt = join(dir, `${p.id}.txt`);
  if (!existsSync(txt)) problems.push('本文のファイルがない（検証できない）');
  else {
    const src = norm(readFileSync(txt, 'utf-8'));
    const ev = p.evidence || [];
    if (ev.length < 3) problems.push('evidence（本文からの引用）が3つ未満');
    for (const e of ev) if (!src.includes(norm(e))) problems.push(`evidence が本文にない：${String(e).slice(0, 30)}…`);
    for (const s of [p.amount, p.summary, p.period, ...(p.eligibility || [])]) for (const n of numbersIn(s)) if (!src.includes(n)) problems.push(`数字が本文にない：${n}（${String(s).slice(0, 24)}…）`);
  }
  if (problems.length) { ng++; console.log(`✗ ${p.id}\n   ${problems.join('\n   ')}`); } else ok++;
}
console.log(`合格 ${ok}／不合格 ${ng}`);
process.exitCode = ng ? 1 : 0;
