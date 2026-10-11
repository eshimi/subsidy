// ブログ（public/blog/）を生成する：記事ごとのページ、一覧、RSS（feed.xml）。
// 使い方：content/blog/ に記事（YYYY-MM-DD-slug.md）を書いてから node scripts/build-blog.mjs を実行する。
// 投稿の書き方は content/blog/README.md を参照。
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter, renderPost } from './lib/markdown.mjs';
import { articleBody, indexBody, writeArticle } from './lib/article.mjs';
import { bannerFor } from './lib/banners.mjs';
import { SITE, esc } from './lib/site-shell.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(REPO, 'content', 'blog');
const OUT = join(REPO, 'public', 'blog');
const FOLDER = 'blog';

const dateJa = (d) => { const [y, m, day] = d.split('-').map(Number); return `${y}年${m}月${day}日`; };
const RELATED = [
  ['index.html', 'ブログの一覧'],
  ['../hantei.html', 'AI補助金判定（質問に答えて探す）'],
  ['../hitsuyo.html', '必要なものから探す'],
  ['../consult.html', '無料相談のお申し込み'],
];

// 記事を読み込む。下書き（draft: true）は載せず、日付の新しい順に並べる
export function loadPosts(dir = SRC) {
  if (!existsSync(dir)) return [];
  const posts = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'README.md').sort()) {
    const slug = file.replace(/\.md$/, '');
    const { data, body } = parseFrontmatter(readFileSync(join(dir, file), 'utf-8'));
    if (data.draft === true) continue;
    if (!data.title) throw new Error(`${file}: title がありません`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date ?? '')) throw new Error(`${file}: date は YYYY-MM-DD で書いてください`);
    if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(slug)) throw new Error(`${file}: ファイル名は YYYY-MM-DD-英小文字とハイフン.md にしてください`);
    const description = data.description || data.title;
    posts.push({ slug, file: `${slug}.html`, title: data.title, date: data.date, updated: data.updated || '', description, sections: renderPost(body) });
  }
  return posts.sort((a, b) => (a.date === b.date ? b.slug.localeCompare(a.slug) : b.date.localeCompare(a.date)));
}

function feedXml(posts) {
  const items = posts.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/blog/${p.file}</link>
      <guid>${SITE}/blog/${p.file}</guid>
      <pubDate>${new Date(`${p.date}T08:00:00+09:00`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>補助金ネット｜ブログ</title>
    <link>${SITE}/blog/index.html</link>
    <description>補助金の基礎知識と、サイトの使い方・お知らせ</description>
    <language>ja</language>
${items}
  </channel>
</rss>
`;
}

export function build({ src = SRC, out = OUT } = {}) {
  const posts = loadPosts(src);
  // 生成し直すので、いったん記事のページを消す（下書きにした記事が残らないように）
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });

  for (const p of posts) {
    const body = articleBody({
      section: ['index.html', 'ブログ'],
      kicker: p.title,
      title: p.title,
      lead: p.description,
      sections: p.sections,
      related: RELATED,
      banner: bannerFor(`${FOLDER}/${p.file}`),
      updated: dateJa(p.updated || p.date),
    });
    writeArticle(out, FOLDER, p.file, { title: p.title, description: p.description, body });
  }

  const cards = posts.map((p) => [p.file, p.title, p.description]);
  const indexHtml = indexBody({
    section: 'ブログ',
    title: 'ブログ',
    lead: '補助金の基礎知識、サイトの使い方、運営からのお知らせを載せています。',
    cards,
    banner: bannerFor(`${FOLDER}/index.html`),
    note: `記事の内容は公開時点の情報です。制度の金額や締切は変わることがあるため、申し込みの前に公式の情報で確認してください。<a href="feed.xml">RSSで購読する</a>`,
  });
  writeArticle(out, FOLDER, 'index.html', { title: 'ブログ', description: '補助金の基礎知識、サイトの使い方、運営からのお知らせを載せたブログです。', body: indexHtml });
  writeFileSync(join(out, 'feed.xml'), feedXml(posts));
  return posts.length;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(`ブログを生成：${build()} 本`);
}
