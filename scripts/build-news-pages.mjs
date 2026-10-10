// 補助金ニュース（public/news/）のページと、トップページの「最新ニュース」、RSS を生成する。
// 使い方：scripts/data/news.mjs に記事を追加してから node scripts/build-news-pages.mjs を実行する。
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { NEWS } from './data/news.mjs';
import { P, articleBody, indexBody, writeArticle } from './lib/article.mjs';
import { bannerFor } from './lib/banners.mjs';
import { SITE, esc } from './lib/site-shell.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const OUT = join(ROOT, 'news');
const dateJa = (d) => { const [y, m, day] = d.split('-').map(Number); return `${y}年${m}月${day}日`; };
const fileOf = (n) => `${n.date}-${n.slug}.html`;

export function sortedNews(list = NEWS) {
  return [...list].sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? 1 : -1));
}

function build() {
  const news = sortedNews();
  mkdirSync(OUT, { recursive: true });
  // 削除された記事のファイルを残さない
  for (const f of readdirSync(OUT)) if (f.endsWith('.html')) rmSync(join(OUT, f));

  news.forEach((n, i) => {
    const file = fileOf(n);
    const newer = news[i - 1];
    const older = news[i + 1];
    const sections = [...n.sections];
    if (n.note) sections.push(['この記事について', P(esc(n.note))]);
    const related = [
      ['index.html', '補助金ニュースの一覧'],
      ...(newer ? [[fileOf(newer), `次の記事：${newer.title}`]] : []),
      ...(older ? [[fileOf(older), `前の記事：${older.title}`]] : []),
      ['../search.html', '募集中の補助金を探す'],
      ['../grants/deadlines.html', '締切が近い補助金'],
    ];
    writeArticle(OUT, 'news', file, {
      title: n.title,
      description: n.summary,
      body: articleBody({ section: ['index.html', '補助金ニュース'], kicker: dateJa(n.date), title: n.title, lead: `${dateJa(n.date)}｜${n.summary}`, sections, related, sources: n.sources, banner: bannerFor(`news/${file}`), updated: dateJa(n.date) }),
    });
  });

  writeArticle(OUT, 'news', 'index.html', {
    title: '補助金ニュース',
    description: '各補助金の公募・締切・採択、経済産業省・中小企業庁・中小企業基盤整備機構の発表、海外展開の支援などを、毎日整理してお届けします。',
    body: indexBody({
      section: '補助金ニュース', title: '補助金ニュース', banner: 'b13',
      lead: '各補助金の公募・締切・採択や、国の発表を、毎日整理してお届けします（発表がない日は更新しません）。',
      cards: news.map((n) => [fileOf(n), `${dateJa(n.date)}　${n.title}`, n.summary]),
      note: 'ニュースは公式の発表を基に整理していますが、最新の内容は必ず各事務局・省庁の公式サイトで確認してください。<a href="feed.xml">RSSで購読する</a>',
    }),
  });

  // RSS
  const items = news.slice(0, 30).map((n) => `    <item>
      <title>${esc(n.title)}</title>
      <link>${SITE}/news/${fileOf(n)}</link>
      <guid>${SITE}/news/${fileOf(n)}</guid>
      <pubDate>${new Date(`${n.date}T08:00:00+09:00`).toUTCString()}</pubDate>
      <description>${esc(n.summary)}</description>
    </item>`).join('\n');
  writeFileSync(join(OUT, 'feed.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>補助金ネット｜補助金ニュース</title>
    <link>${SITE}/news/index.html</link>
    <description>補助金の公募・締切・採択と、国の発表のニュース</description>
    <language>ja</language>
${items}
  </channel>
</rss>
`);

  // トップページの「補助金ニュース」（最新5本）
  const top = join(ROOT, 'index.html');
  const html = readFileSync(top, 'utf-8');
  const list = news.slice(0, 5).map((n) => `<li><a href="news/${fileOf(n)}">${esc(n.title)}</a><span class="m">${dateJa(n.date)}</span></li>`).join('');
  const next = html.replace(/<!-- news-latest:start -->[\s\S]*?<!-- news-latest:end -->/, `<!-- news-latest:start --><ul class="r-list">${list}</ul><!-- news-latest:end -->`);
  writeFileSync(top, next);
  return news.length;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(`補助金ニュースを生成：${build()} 本`);
}
