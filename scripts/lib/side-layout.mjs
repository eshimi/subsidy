// 本文の右側に「関連ページ」（なければ、そのページのカテゴリのリンク）を置く共通レイアウト。
// 見出し・パンくず・タイトルは全幅、その下で本文と右側の列に分ける。
import { FOOTER_GROUPS } from './nav.mjs';

// フォルダ（columns/ など）から、ナビのどのグループに入れるかを決める
const FOLDER_HINT = {
  columns: 'columns.html',
  guides: 'beginner-guide.html',
  feature: 'feature/index.html',
  compare: 'compare/index.html',
  area: 'area/index.html',
  grants: 'grants/index.html',
  policy: 'policy/about.html',
  basics: 'basics/index.html',
  who: 'who/sme.html',
  personal: 'personal/index.html',
};
const EXCLUDE = ['index.html', 'sitemap.html', 'search.html', 'shindan.html', 'ai.html'];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function groupFor(current) {
  const folder = current.includes('/') ? current.split('/')[0] : null;
  const target = folder ? FOLDER_HINT[folder] : current;
  return FOOTER_GROUPS.find((g) => g.items.some((i) => i.href === target)) || null;
}

// 関連ページがないページの右側：そのページのカテゴリ（フッターのグループ）のリンク
export function groupNav(current) {
  const g = groupFor(current);
  if (!g) return null;
  const prefix = '../'.repeat(current.split('/').length - 1);
  const items = g.items.map((i) => {
    const href = i.href === '' ? (prefix || './') : prefix + i.href;
    const cur = i.href === current ? ' aria-current="page"' : '';
    return `        <li><a href="${href}"${cur}>${esc(i.label)}</a></li>`;
  }).join('\n');
  return `    <nav class="related-links" aria-label="${esc(g.label)}" data-group>
      <h2>${esc(g.label)}</h2>
      <ul>
${items}
      </ul>
    </nav>`;
}

// main の中身（HTML 文字列）を、タイトル部分と本文・右側に分けて返す。変えないときは null
export function splitLayout(inner, current) {
  if (inner.includes('page-split') || EXCLUDE.includes(current) || /pref-grid|sitemap-group/.test(inner)) return null;
  const cut = inner.search(/<(section|article|form|figure)\b/);
  if (cut < 0) return null;
  const head = inner.slice(0, cut);
  let rest = inner.slice(cut);
  const related = [...rest.matchAll(/ *<nav class="related-links"[\s\S]*?<\/nav>\n?/g)].map((m) => m[0]);
  rest = rest.replace(/ *<nav class="related-links"[\s\S]*?<\/nav>\n?/g, '');
  let side = related.join('\n');
  if (!related.length) {
    side = groupNav(current);
    if (!side) return null;
  }
  return `${head}<div class="page-split"><div class="page-main">
${rest.trimEnd()}
</div><aside class="page-side" aria-label="関連ページ">
${side}
</aside></div>
  `;
}
