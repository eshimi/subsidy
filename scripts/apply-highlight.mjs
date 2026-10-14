// コンテンツ系のページの、特に重要な部分に「太字＋蛍光ペン」（<strong class="hl">）を当てる。何度実行しても同じ結果。
// 当てる語句は scripts/data/highlights.mjs。使い方：node scripts/apply-highlight.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HIGHLIGHTS } from './data/highlights.mjs';
import { applyHighlights, appliedPhrases } from './lib/highlight.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

export function applyHighlight(html, phrases) {
  const done = new Set(appliedPhrases(html));
  const result = applyHighlights(html, (phrases || []).filter((p) => !done.has(p)));
  return { html: result.html, missing: result.skipped.map((s) => ({ ...s })) };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  let pages = 0;
  let count = 0;
  const problems = [];
  for (const [rel, phrases] of Object.entries(HIGHLIGHTS)) {
    const file = join(ROOT, rel);
    if (!existsSync(file)) { problems.push(`${rel}：ページがありません`); continue; }
    const before = readFileSync(file, 'utf-8');
    const { html, missing } = applyHighlight(before, phrases);
    if (html !== before) { writeFileSync(file, html); pages++; }
    count += appliedPhrases(html).length;
    for (const m of missing) problems.push(`${rel}：「${m.phrase.slice(0, 30)}」${m.reason}`);
  }
  console.log(`蛍光ペンを当てたページ：${pages} ページ（合計 ${count} か所）`);
  for (const p of problems) console.warn(`  ※ ${p}`);
}
