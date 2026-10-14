// 強調の語句の案（JSON：{ "basics/flow.html": ["語句", …] }）が、当てられるかを確かめる。使い方：node scripts/highlight-check.mjs 案.json
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyHighlights } from './lib/highlight.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const plan = JSON.parse(readFileSync(process.argv[2], 'utf-8'));
let ok = 0;
let ng = 0;
for (const [rel, phrases] of Object.entries(plan)) {
  const html = readFileSync(join(ROOT, rel), 'utf-8');
  const r = applyHighlights(html, phrases);
  ok += r.applied.length;
  for (const s of r.skipped) { ng++; console.log(`NG ${rel}：「${s.phrase}」${s.reason}`); }
  for (const p of phrases) if (p.length < 8 || p.length > 60) console.log(`長さ ${rel}：「${p}」（${p.length}字。8〜60字にする）`);
}
console.log(`当てられる：${ok}か所、当てられない：${ng}か所`);
