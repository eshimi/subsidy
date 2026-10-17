// 担当ごとの材料（out-N.json）を、data/program-details.json に統合する。すでにある制度は上書きしない。
// 使い方：node scripts/merge-program-details.mjs <out-1.json> [<out-2.json> ...]（統合の前に、verify-program-details.mjs で検証しておく）
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const FILE = join(import.meta.dirname, '..', 'data', 'program-details.json');
const data = JSON.parse(readFileSync(FILE, 'utf-8'));
let added = 0, dup = 0;
for (const f of process.argv.slice(2)) {
  for (const [id, d] of Object.entries(JSON.parse(readFileSync(f, 'utf-8')).items || {})) {
    if (data.items[id]) { dup++; continue; }
    data.items[id] = d;
    added++;
  }
}
data.checkedAt = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
writeFileSync(FILE, `${JSON.stringify(data, null, 1)}\n`);
console.log(`追加 ${added} 件／すでにあるため除外 ${dup} 件／合計 ${Object.keys(data.items).length} 件`);
