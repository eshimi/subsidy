// 「関連ページ」のリンクを、行き先の種類で分けて見出しをつける
const RELATED_GROUPS = [
  ['cases', '活用事例'],
  ['feature', '制度の解説・比較'],
  ['know', '基礎知識・コラム・ニュース'],
  ['who', '対象者別のガイド'],
  ['find', '補助金を探す・調べる'],
  ['other', 'その他'],
];

// href（current からの相対）から、行き先のグループを決める
export function relatedKind(href, current) {
  if (/^https?:/.test(href)) return 'other';
  if (/[?&]for=personal/.test(href)) return 'who';
  const clean = href.split(/[?#]/)[0];
  const parts = (current.includes('/') ? current.split('/').slice(0, -1) : []).concat(clean.split('/'));
  const stack = [];
  for (const seg of parts) { if (seg === '..') stack.pop(); else if (seg && seg !== '.') stack.push(seg); }
  const path = stack.join('/');
  const top = stack[0] || '';
  if (top === 'cases') return 'cases';
  if (top === 'feature' || top === 'compare') return 'feature';
  if (top === 'research' || top === 'hitsuyo') return 'find';
  if (['basics', 'columns', 'blog', 'news', 'guides', 'background'].includes(top) || ['columns.html', 'real-life.html', 'beginner-guide.html', 'roadmap.html', 'plan.html', 'books.html', 'resources.html'].includes(path)) return 'know';
  if (top === 'who' || top === 'personal') return 'who';
  if (['grants', 'area'].includes(top) || ['search.html', 'hantei.html', 'hitsuyo.html', 'diagnosis.html', 'chat.html', ''].includes(path) || path === 'index.html') return 'find';
  return 'other';
}

// <nav class="related-links" aria-label="関連ページ"> の中のリンクを、種類ごとに分ける。1種類だけなら、そのまま返す
export function groupRelated(nav, current) {
  if (!/aria-label="関連ページ"/.test(nav) || nav.includes('rl-group')) return nav;
  const m = nav.match(/^([\s\S]*?<ul>)([\s\S]*?)(<\/ul>[\s\S]*)$/);
  if (!m) return nav;
  const items = [...m[2].matchAll(/<li>(<a href="([^"]*)"[^>]*>[\s\S]*?<\/a>)<\/li>/g)].map((x) => ({ html: x[0], kind: relatedKind(x[2], current) }));
  if (!items.length) return nav;
  const groups = RELATED_GROUPS.map(([k, label]) => [label, items.filter((i) => i.kind === k)]).filter(([, l]) => l.length);
  if (groups.length < 2) return nav;
  const head = m[1].replace(/\s*<ul>$/, '\n');
  const body = groups.map(([label, list]) => `      <h3 class="rl-group">${label}</h3>\n      <ul>\n${list.map((i) => `        ${i.html}`).join('\n')}\n      </ul>`).join('\n');
  return `${head}${body}${m[3].replace(/^<\/ul>/, '')}`;
}

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
  grants: 'search.html',
  policy: 'policy/about.html',
  basics: 'basics/index.html',
  hitsuyo: 'hitsuyo.html',
  news: 'news/index.html',
  who: 'who/sme.html',
  personal: 'personal/summary.html',
  research: 'research/index.html',
  background: 'background/index.html',
  programs: 'programs/index.html',
};
const EXCLUDE = ['index.html', 'sitemap.html', 'search.html', 'shindan.html', 'ai.html', 'hantei.html', 'consult.html', 'hitsuyo.html', 'mypage.html'];

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
  // 右の列の先頭に置く部品（目次・ポイントなど）：<!-- side-top:start --> … <!-- side-top:end --> で囲んで渡す
  const tops = [...rest.matchAll(/ *<!-- side-top:start -->[\s\S]*?<!-- side-top:end -->\n?/g)].map((m) => m[0]);
  rest = rest.replace(/ *<!-- side-top:start -->[\s\S]*?<!-- side-top:end -->\n?/g, '');
  const related = [...rest.matchAll(/ *<nav class="related-links"[\s\S]*?<\/nav>\n?/g)].map((m) => m[0]);
  rest = rest.replace(/ *<nav class="related-links"[\s\S]*?<\/nav>\n?/g, '');
  let side = related.map((r) => groupRelated(r, current)).join('\n');
  if (tops.length && side) side = `${tops.join('\n')}\n${side}`;
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
