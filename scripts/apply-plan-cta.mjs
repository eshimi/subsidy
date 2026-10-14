// 事業計画書AI下書き（plan.html）への案内を、関係する記事に入れる（何度実行しても同じ結果になる）。
// 「この記事のまとめ」（なければ「最新情報の確認先」）の節の直後に置く
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', 'public');
const TARGETS = ['feature/jizokuka.html', 'feature/digital-subsidy.html', 'basics/business-plan.html'];
const START = '<!-- plan-cta -->';
const END = '<!-- /plan-cta -->';

export function ctaHtml(prefix = '../') {
  return `${START}
    <aside class="plan-cta" aria-label="事業計画書AI下書きのご案内">
      <p class="plan-cta-kicker">無料お試し・1日1回</p>
      <p class="plan-cta-title">事業計画書、何から書けばいいか迷ったら</p>
      <p>事業の内容と、やりたいことを入力すると、AIが<strong>下書きのたたき台</strong>と<strong>自分で確かめて書き足すべき点</strong>をまとめます（持続化補助金・デジタル化・AI導入補助金に対応）。考えの整理にお使いください。</p>
      <a class="plan-cta-btn" href="${prefix}plan.html">事業計画書AI下書きを試す <span aria-hidden="true">→</span></a>
    </aside>
${END}
`;
}

export function withPlanCta(html, prefix = '../') {
  const clean = html.replace(new RegExp(`${START}[\\s\\S]*?${END}\\n?`), '');
  const at = clean.search(/<h2 id="[^"]*">(?:<img[^>]*>)?この記事のまとめ/) >= 0
    ? clean.search(/<h2 id="[^"]*">(?:<img[^>]*>)?この記事のまとめ/)
    : clean.search(/<h2 id="[^"]*">(?:<img[^>]*>)?最新情報の確認先/);
  if (at < 0) return clean;
  // その節の終わりの直後に置く（節の前に置くと、apply-fit などが入れる解説と順番が入れ替わるため）
  const close = clean.indexOf('</section>', at);
  if (close < 0) return clean;
  const lineEnd = clean.indexOf('\n', close) + 1;
  return clean.slice(0, lineEnd) + ctaHtml(prefix) + clean.slice(lineEnd);
}

if (process.argv[1] === import.meta.filename) {
  for (const file of TARGETS) {
    const path = join(ROOT, file);
    const before = readFileSync(path, 'utf8');
    const after = withPlanCta(before);
    if (after !== before) writeFileSync(path, after);
    console.log(`${after.includes(START) ? '案内を入れました' : '入れる場所がありません'}: ${file}`);
  }
}
