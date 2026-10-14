// 公開済みのページの「申請の流れ（一般的な例）」を、短い表示（scripts/lib/flow-compact.mjs）にそろえる。使い方：node scripts/apply-flow-compact.mjs
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compactFlow } from './lib/flow-compact.mjs';

const PUB = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
let n = 0;
for (const folder of ['feature', 'personal', 'basics', 'who', 'columns', 'guides']) {
  const dir = join(PUB, folder);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.html'))) {
    const p = join(dir, f);
    const before = readFileSync(p, 'utf-8');
    const after = compactFlow(before);
    if (after !== before) { writeFileSync(p, after); n++; }
  }
}
console.log(`申請の流れを短い表示に：${n}ページ`);
