// 補助金の活用事例（public/cases/）への、関連ページからのリンク。
// 事例のデータ（scripts/data/cases.mjs）の links に書いたページに、「この補助金の活用事例」の一覧を入れる。
import { CASES } from '../data/cases.mjs';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// path は public/ からのパス（例：'feature/jizokuka.html'）。prefix はそのページから public/ までの相対パス
export function casesFor(path) {
  return CASES.filter((c) => (c.links || []).includes(path));
}

export function casesBlock(path, prefix = '../') {
  const list = casesFor(path).slice(0, 5);
  if (!list.length) return '';
  return `
    <nav class="related-links" aria-label="この補助金の活用事例">
      <h2>この補助金の活用事例</h2>
      <ul>
${list.map((c) => `        <li><a href="${prefix}cases/${c.slug}.html">${esc(c.title)}</a></li>`).join('\n')}
        <li><a href="${prefix}cases/index.html">補助金の活用事例の一覧</a></li>
      </ul>
    </nav>
`;
}

// 生成済みの HTML の「関連ページ」の前に、活用事例の一覧を入れる（前回入れた分は入れ直す）
export function withCases(html, path, prefix = '../') {
  const cleaned = html.replace(/\n?<!-- cases:start -->[\s\S]*?<!-- cases:end -->\n?/, '\n');
  const block = casesBlock(path, prefix);
  if (!block) return cleaned;
  const anchor = '    <nav class="related-links" aria-label="関連ページ">';
  const i = cleaned.indexOf(anchor);
  if (i < 0) return cleaned;
  return `${cleaned.slice(0, i)}<!-- cases:start -->${block}<!-- cases:end -->\n${cleaned.slice(i)}`;
}
