// data/program-details.json（または指定のファイル）を、公式ページの本文（既定は /tmp/prog/<id>.txt）に対して検証する。
// 使い方：node scripts/verify-program-details.mjs [材料のJSON] [本文のフォルダ]
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { validate, pageable } from './lib/program-detail.mjs';

const file = process.argv[2] || join(import.meta.dirname, '..', 'data', 'program-details.json');
const dir = process.argv[3] || '/tmp/prog';
const data = JSON.parse(readFileSync(file, 'utf-8'));
let ok = 0, ng = 0, skip = 0, pages = 0;
for (const [id, d] of Object.entries(data.items || {})) {
  const p = join(dir, `${id}.txt`);
  if (!existsSync(p)) { console.log(`${id}：本文がない（検証できない）`); ng++; continue; }
  const problems = validate(d, readFileSync(p, 'utf-8'));
  if (d.status === 'skip') skip++;
  if (problems.length) { ng++; console.log(`✗ ${id}\n   ${problems.join('\n   ')}`); } else { ok++; if (pageable(d)) pages++; }
}
console.log(`合格 ${ok}（うちページにできる ${pages}）／不合格 ${ng}／skip ${skip}`);
process.exitCode = ng ? 1 : 0;
