import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { eligibleTexts, applyHighlights, appliedPhrases, rehighlight } from '../scripts/lib/highlight.mjs';
import { applyHighlight } from '../scripts/apply-highlight.mjs';
import { HIGHLIGHTS } from '../scripts/data/highlights.mjs';

const PAGE = `<h1>見出しの語句</h1><nav><a href="/">ナビの語句</a></nav>
<p>本文の<a href="/x">リンクの語句</a>と、<strong>すでに強調の語句</strong>と、<em>斜体</em>と、これが重要な一文です。</p>
<ul><li><strong>ラベル</strong>：リストの中の重要な点です。</li><li>同じ語句が二つ。</li><li>同じ語句が二つ。</li></ul>
<table><thead><tr><th>表の見出し語句</th></tr></thead><tbody><tr><td>表のセルの語句です</td></tr></tbody></table>
<script>var s = "スクリプトの語句";</script>`;

test('highlight: 強調を当ててよいのは、本文の文字だけ（見出し・リンク・ナビ・既存の強調・表の見出し・スクリプトは除く）', () => {
  const text = eligibleTexts(PAGE).map((t) => t.text).join('|');
  assert.match(text, /これが重要な一文です/);
  assert.match(text, /リストの中の重要な点です/);
  assert.match(text, /表のセルの語句です/);
  for (const ng of ['見出しの語句', 'ナビの語句', 'リンクの語句', 'すでに強調の語句', '表の見出し語句', 'スクリプトの語句', 'ラベル']) assert.ok(!text.includes(ng), ng);
});

test('highlight: 1か所だけに現れる語句に当て、複数・なしは当てない。何度当てても同じ', () => {
  const r = applyHighlights(PAGE, ['これが重要な一文です', 'リストの中の重要な点です', '同じ語句が二つ。', '存在しない語句', 'リンクの語句']);
  assert.deepEqual(r.applied, ['これが重要な一文です', 'リストの中の重要な点です']);
  assert.deepEqual(r.skipped.map((s) => s.phrase), ['同じ語句が二つ。', '存在しない語句', 'リンクの語句']);
  assert.match(r.html, /<strong class="hl">これが重要な一文です<\/strong>/);
  assert.deepEqual(appliedPhrases(r.html), ['これが重要な一文です', 'リストの中の重要な点です']);
  // 同じデータで当て直しても、同じ結果（すでに当てた語句は、そのまま）
  const again = applyHighlight(r.html, ['これが重要な一文です', 'リストの中の重要な点です']);
  assert.equal(again.html, r.html);
  assert.deepEqual(again.missing, []);
  assert.equal(rehighlight(r.html, ['これが重要な一文です']).html.includes('リストの中の重要な点です</strong>'), false);
});

test('highlight: コミットしているページに、データの語句がすべて当たっている', () => {
  for (const [rel, phrases] of Object.entries(HIGHLIGHTS)) {
    const html = readFileSync(join(process.cwd(), 'public', rel), 'utf-8');
    const done = new Set(appliedPhrases(html));
    for (const p of phrases) assert.ok(done.has(p), `${rel}：「${p.slice(0, 24)}」が当たっていません（node scripts/apply-highlight.mjs を実行）`);
    assert.ok(phrases.length <= 10, `${rel}：多すぎます`);
  }
});
