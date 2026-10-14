// 強調を選ぶための下調べ：ページの、強調を当ててよい本文を、番号つきで表示する。使い方：node scripts/highlight-candidates.mjs public/basics/flow.html
import { readFileSync } from 'node:fs';
import { eligibleTexts } from './lib/highlight.mjs';

for (const file of process.argv.slice(2)) {
  const html = readFileSync(file, 'utf-8');
  const texts = eligibleTexts(html).map((t) => t.text.replace(/\s+/g, ' ').trim()).filter((t) => t.length >= 12);
  console.log(`# ${file}（${texts.length}か所）`);
  texts.forEach((t, i) => console.log(`${i + 1}. ${t}`));
}
