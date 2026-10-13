// 特集ページ（public/feature/）に、独自の解説「向いている人・向かない人」「近い制度との違い」を入れる。
// 内容は scripts/data/feature-fit.mjs。何度実行しても同じ結果。
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FIT } from './data/feature-fit.mjs';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'feature');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const RE = /[ \t]*<!-- fit:start -->[\s\S]*?<!-- fit:end -->\n\n/;

export function fitHtml(f) {
  const ul = (a) => `        <ul>\n${a.map((x) => `          <li>${esc(x)}</li>`).join('\n')}\n        </ul>`;
  return `    <!-- fit:start -->
    <section class="art-sec" aria-labelledby="fit"><h2 id="fit">向いている人・向かない人／近い制度との違い</h2>
      <div class="area-body">
        <h3>向いている人</h3>
${ul(f.fit)}
        <h3>向かない人（別の制度を検討）</h3>
${ul(f.notFit)}
${f.diff.map(([h, t]) => `        <h3>${esc(h)}</h3>\n        <p>${esc(t)}</p>`).join('\n')}
        <p class="area-note">どの制度が合うかは、事業の内容と、公募回ごとの要件で決まります。迷うときは、<a href="../hantei.html">AI補助金判定</a>や、<a href="../consult.html">無料相談</a>もご利用ください。</p>
      </div>
    </section>

    <div class="sec-divider" aria-hidden="true"><img src="../images/dividers/div-03.webp" alt="" loading="lazy"></div>
    <!-- fit:end -->
`;
}

export function applyFit(html, slug) {
  const f = FIT[slug];
  if (!f) return html;
  const clean = html.replace(RE, '');
  const m = /    <section class="art-sec" aria-labelledby="[^"]*"><h2 id="[^"]*">(?:<img[^>]*>)?最新情報の確認先/.exec(clean);
  if (!m) return html;
  return `${clean.slice(0, m.index)}${fitHtml(f)}\n${clean.slice(m.index)}`;
}

export function run() {
  let n = 0;
  for (const slug of Object.keys(FIT)) {
    const p = join(DIR, `${slug}.html`);
    if (!existsSync(p)) continue;
    const before = readFileSync(p, 'utf-8');
    const after = applyFit(before, slug);
    if (after !== before) { writeFileSync(p, after); n++; }
  }
  return n;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(`特集の独自解説を更新：${run()}ページ`);
