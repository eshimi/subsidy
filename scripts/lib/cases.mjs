// 補助金の活用事例（public/cases/）への、関連ページからのリンク。
// 事例のデータ（scripts/data/cases.mjs）の links に書いたページに、「この補助金の活用事例」の一覧を入れる。
import { CASES, SUBSIDIES } from '../data/cases.mjs';

// 記事ごとのイラスト（public/images/cases/illust-01〜10.webp）。事例の並びをもとに固定の順で混ぜ、毎回の生成で変わらないようにする
const ILLUSTS = Array.from({ length: 10 }, (_, i) => `illust-${String(i + 1).padStart(2, '0')}.webp`);
export function illustFor(i) {
  const order = [...ILLUSTS];
  let seed = 20261010;
  for (let k = order.length - 1; k > 0; k--) { seed = (seed * 1103515245 + 12345) % 2147483648; const j = seed % (k + 1); [order[k], order[j]] = [order[j], order[k]]; }
  return order[i % order.length];
}

// 制度ページ（grants/）：制度名から、同じ補助金の活用事例を探す。見つからなければ、目的のタグが近い事例を出す
const BY_TITLE = [
  [/IT導入|デジタル化・AI導入/, ['digital']],
  [/持続化/, ['jizokuka']],
  [/ものづくり|新事業進出/, ['monodukuri', 'saikouchiku']],
  [/事業再構築/, ['saikouchiku']],
  [/省力化/, ['shoryokuka']],
  [/事業承継|引継ぎ|M&A/, ['shokei']],
  [/キャリアアップ/, ['career']],
  [/業務改善/, ['employment']],
];
const BY_PURPOSE = { digital: ['digital'], sales: ['jizokuka'], equipment: ['monodukuri', 'shoryokuka'], succession: ['shokei'], hiring: ['career', 'employment'] };

export function casesForGrant(title, purposes = [], limit = 3) {
  const exact = BY_TITLE.filter(([re]) => re.test(title)).flatMap(([, keys]) => keys);
  const keys = exact.length ? exact : [...new Set(purposes.flatMap((p) => BY_PURPOSE[p] || []))];
  if (!keys.length) return { list: [], exact: false };
  const list = CASES.filter((c) => keys.includes(c.subsidy)).slice(0, limit);
  return { list, exact: exact.length > 0 };
}

// 右の列に置く、活用事例のカード（イメージのイラスト＋短い要約）
export function caseCards(title, purposes, prefix = '../') {
  const { list, exact } = casesForGrant(title, purposes);
  if (!list.length) return '';
  const clip = (s, n) => (s.length > n ? `${s.slice(0, n)}…` : s);
  return `    <nav class="related-links" aria-label="関連する活用事例" data-cases>
      <h2>${exact ? 'この補助金の活用事例' : '似た目的の活用事例'}</h2>
      <ul>
${list.map((c) => `        <li><a class="case-card" href="${prefix}cases/${c.slug}.html"><img src="${prefix}images/cases/${illustFor(CASES.indexOf(c))}" alt="" width="64" height="88" loading="lazy"><span class="case-card-b"><b>${esc(c.title)}</b><span>${esc(clip(c.summary, 60))}</span><em>${esc(SUBSIDIES[c.subsidy]?.short || '')}</em></span></a></li>`).join('\n')}
      </ul>
      <p class="case-card-note">※イラストはイメージです。<a href="${prefix}cases/index.html">活用事例の一覧へ</a></p>
    </nav>`;
}

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
  const at = cleaned.indexOf('<nav class="related-links" aria-label="関連ページ">');
  if (at < 0) return cleaned;
  const i = cleaned.lastIndexOf('\n', at) + 1;
  return `${cleaned.slice(0, i)}<!-- cases:start -->${block}<!-- cases:end -->\n${cleaned.slice(i)}`;
}
