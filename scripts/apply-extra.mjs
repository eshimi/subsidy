// 基礎知識（basics/）・対象者別（who/）のページに、独自の解説を入れる。内容は scripts/data/extra-sections.mjs。
// チェックリスト・手順・よくある質問（FAQPageの構造化データ付き）。何度実行しても同じ結果。使い方：node scripts/apply-extra.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXTRA } from './data/extra-sections.mjs';

const PUB = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const RE = /[ \t]*<!-- extra:start -->[\s\S]*?<!-- extra:end -->\n\n/;
const stripTags = (h) => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function sectionHtml(s, i) {
  const out = [];
  if (s.p) out.push(`        <p>${s.p}</p>`);
  if (s.steps) out.push(`        <ol>\n${s.steps.map((x) => `          <li>${x}</li>`).join('\n')}\n        </ol>`);
  if (s.ul) out.push(`        <ul>\n${s.ul.map((x) => `          <li>${x}</li>`).join('\n')}\n        </ul>`);
  if (s.faq) out.push(s.faq.map(([q, a]) => `        <h3>Q. ${q}</h3>\n        <p>A. ${a}</p>`).join('\n'));
  return `    <section class="art-sec" aria-labelledby="ex${i}"><h2 id="ex${i}">${esc(s.h)}</h2>\n      <div class="area-body">\n${out.join('\n')}\n      </div>\n    </section>`;
}

export function extraHtml(def) {
  const faq = def.sections.flatMap((s) => s.faq || []);
  const ld = faq.length ? `\n    <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: stripTags(a) } })) }).replace(/</g, '\\u003c')}</script>` : '';
  const body = def.sections.map((s, i) => sectionHtml(s, i)).join('\n\n    <div class="sec-divider" aria-hidden="true"><img src="../images/dividers/div-03.webp" alt="" loading="lazy"></div>\n\n');
  return `    <!-- extra:start -->\n${body}${ld}\n\n    <div class="sec-divider" aria-hidden="true"><img src="../images/dividers/div-03.webp" alt="" loading="lazy"></div>\n    <!-- extra:end -->\n\n`;
}

export function applyExtra(html, key) {
  const def = EXTRA[key];
  if (!def) return html;
  if (html.includes('data-layout="feature-v2"')) return html; // 新レイアウト（build-feature-v2.mjs）のページは、そちらで作る
  const clean = html.replace(RE, '');
  const m = def.at === 'first'
    ? /^[ \t]*<section class="art-sec" aria-labelledby="[^"]*">/m.exec(clean)
    : /^[ \t]*<section class="art-sec" aria-labelledby="[^"]*"><h2 id="[^"]*">(?:<img[^>]*>)?(?:この記事のまとめ|最新情報の確認先)/m.exec(clean);
  if (!m) return html;
  return `${clean.slice(0, m.index)}${extraHtml(def)}${clean.slice(m.index)}`;
}

export function run() {
  let n = 0;
  for (const key of Object.keys(EXTRA)) {
    const p = join(PUB, key);
    if (!existsSync(p)) continue;
    const before = readFileSync(p, 'utf-8');
    const after = applyExtra(before, key);
    if (after !== before) { writeFileSync(p, after); n++; }
  }
  return n;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(`基礎知識・対象者別の独自解説を更新：${run()}ページ`);
