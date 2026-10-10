// サイト全体のメニュー構成（上部ナビ・フッター）の単一の定義。
// 構成を変えるときは、ここを直してから `node scripts/apply-nav.mjs` を実行する（生成ページは build-*.mjs で反映）。
// パスは public/ からの相対パス。prefix は、そのページから public/ までの相対パス（'' または '../'）。

// 上部ナビ：ボタン（直接リンク）と、開閉するメニュー
export const TOP_LINKS = [];
export const TOP_GROUPS = [
  {
    label: '補助金を探す',
    items: [
      { label: 'AI・キーワードで探す', href: 'search.html' },
      { label: 'AI補助金判定（質問に答えて探す）', href: 'hantei.html' },
      { label: '買いたいものから探す', href: 'kaimono.html' },
      { label: '目的別の補助金', href: 'grants/purposes.html' },
      { label: '業種別の補助金', href: 'grants/industries.html' },
      { label: '締切が近い補助金', href: 'grants/deadlines.html' },
      { label: '都道府県別の補助金', href: 'grants/prefectures.html' },
      { label: '市区町村別の補助金', href: 'area/index.html' },
      { label: '募集中の制度一覧', href: 'grants/index.html' },
    ],
  },
  {
    label: 'ニュース・特集',
    items: [
      { label: '補助金ニュース', href: 'news/index.html' },
      { label: '特に人気の5つの補助金', href: 'feature/popular.html' },
      { label: '主な補助金の特集', href: 'feature/index.html' },
      { label: '補助金の活用事例', href: 'cases/index.html' },
      { label: '比較記事', href: 'compare/index.html' },
    ],
  },
  {
    label: '基礎知識',
    items: [
      { label: '基礎知識のトップ', href: 'basics/index.html' },
      { label: '申請の流れ', href: 'basics/flow.html' },
      { label: '事業計画書の書き方', href: 'basics/business-plan.html' },
      { label: '用語集', href: 'basics/glossary.html' },
      { label: 'コラム', href: 'columns.html' },
      { label: '補助金のリアル', href: 'real-life.html' },
    ],
  },
  {
    label: '対象者別',
    items: [
      { label: '個人事業主の方', href: 'who/sole-proprietor.html' },
      { label: '中小企業の方', href: 'who/sme.html' },
      { label: '創業・副業を始める方', href: 'who/startup.html' },
      { label: '個人の方（住まい・車・子育て）', href: 'personal/index.html' },
    ],
  },
];
export const TOP_END_LINKS = [{ label: '使い方', href: 'guide.html' }, { label: '無料相談', href: 'consult.html', cls: 'nav-cta' }];

// フッターの4グループ。同じページを二重に載せない（右側の列の「関連ページ」もここから作る）
export const FOOTER_GROUPS = [
  {
    label: '補助金を探す',
    items: [
      { label: 'トップ', href: '' },
      { label: 'AI・キーワードで探す', href: 'search.html' },
      { label: 'AI補助金判定', href: 'hantei.html' },
      { label: '買いたいものから探す', href: 'kaimono.html' },
      { label: '目的別の補助金', href: 'grants/purposes.html' },
      { label: '業種別の補助金', href: 'grants/industries.html' },
      { label: '締切が近い補助金', href: 'grants/deadlines.html' },
      { label: '都道府県別の補助金', href: 'grants/prefectures.html' },
      { label: '市区町村別の補助金', href: 'area/index.html' },
      { label: '募集中の制度一覧', href: 'grants/index.html' },
    ],
  },
  {
    label: 'ニュース・特集・基礎知識',
    items: [
      { label: '補助金ニュース', href: 'news/index.html' },
      { label: '特に人気の5つの補助金', href: 'feature/popular.html' },
      { label: '主な補助金の特集', href: 'feature/index.html' },
      { label: '補助金の活用事例', href: 'cases/index.html' },
      { label: '比較記事', href: 'compare/index.html' },
      { label: '基礎知識', href: 'basics/index.html' },
      { label: '申請の流れ', href: 'basics/flow.html' },
      { label: '事業計画書の書き方', href: 'basics/business-plan.html' },
      { label: '用語集', href: 'basics/glossary.html' },
      { label: 'コラム', href: 'columns.html' },
      { label: '補助金のリアル', href: 'real-life.html' },
    ],
  },
  {
    label: '対象者別・創業',
    items: [
      { label: '対象者別のトップ', href: 'who/index.html' },
      { label: '個人事業主の方', href: 'who/sole-proprietor.html' },
      { label: '中小企業の方', href: 'who/sme.html' },
      { label: '創業・副業を始める方', href: 'who/startup.html' },
      { label: '個人の方（住まい・車・子育て）', href: 'personal/index.html' },
      { label: '創業のステップ', href: 'roadmap.html' },
      { label: '副業の始め方ガイド', href: 'beginner-guide.html' },
      { label: '副業おすすめ診断', href: 'diagnosis.html' },
      { label: '副業壁打ちAI', href: 'chat.html' },
    ],
  },
  {
    label: 'サイトについて',
    items: [
      { label: '使い方', href: 'guide.html' },
      { label: '無料相談のお申し込み', href: 'consult.html' },
      { label: '運営者情報', href: 'policy/about.html' },
      { label: '出典・更新方針', href: 'policy/sources.html' },
      { label: 'ニュースの情報の取得元', href: 'news/sources.html' },
      { label: '参考リンク', href: 'resources.html' },
      { label: '参考図書', href: 'books.html' },
      { label: 'お問い合わせ', href: 'policy/contact.html' },
      { label: 'サイトマップ', href: 'sitemap.html' },
    ],
  },
];

// フッター最下部の補助リンク
export const BOTTOM_LINKS = [
  { label: 'プライバシーポリシー', href: 'policy/privacy.html' },
  { label: 'フィードバック・バグ報告', href: 'policy/contact.html' },
  { label: 'サイトマップ', href: 'sitemap.html' },
];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const url = (prefix, href) => (href === '' ? (prefix || './') : prefix + href);
const isCurrent = (current, href) => current !== undefined && href !== '' && current === href;

// current は、public/ からの現在のページのパス（例：'guides/secret-side-job.html'）
export function topnavHtml(prefix, current) {
  const direct = (l) => `        <a href="${url(prefix, l.href)}"${l.cls ? ` class="${l.cls}"` : ''}${isCurrent(current, l.href) ? ' aria-current="page"' : ''}>${esc(l.label)}</a>`;
  const groups = TOP_GROUPS.map((g) => {
    const hasCurrent = g.items.some((i) => isCurrent(current, i.href));
    const links = g.items.map((i) => `            <a href="${url(prefix, i.href)}"${isCurrent(current, i.href) ? ' aria-current="page"' : ''}>${esc(i.label)}</a>`).join('\n');
    return `        <details class="navdrop"${hasCurrent ? ' data-current' : ''}>
          <summary>${esc(g.label)}</summary>
          <div class="navdrop-panel">
${links}
          </div>
        </details>`;
  });
  return [...TOP_LINKS.map(direct), ...groups, ...TOP_END_LINKS.map(direct)].join('\n');
}

export function footerNavHtml(prefix, current) {
  const groups = FOOTER_GROUPS.map((g) => {
    const items = g.items.map((i) => `            <li><a href="${url(prefix, i.href)}"${isCurrent(current, i.href) ? ' aria-current="page"' : ''}>${esc(i.label)}</a></li>`).join('\n');
    return `          <details class="footer-group">
            <summary>${esc(g.label)}</summary>
            <ul>
${items}
            </ul>
          </details>`;
  });
  return groups.join('\n');
}

export function footerBottomHtml(prefix) {
  const items = BOTTOM_LINKS.map((l) => `          <li><a href="${url(prefix, l.href)}">${esc(l.label)}</a></li>`).join('\n');
  return `      <nav aria-label="補助リンク">
        <ul>
${items}
        </ul>
      </nav>`;
}
