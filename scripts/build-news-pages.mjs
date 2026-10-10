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

// 取得元のドメイン → 発行元。より長い（詳しい）ドメインを先に書く。
const ORGS = [
  ['mirasapo-plus.go.jp', '中小企業庁（ミラサポplus）'],
  ['chusho.meti.go.jp', '中小企業庁'],
  ['meti.go.jp', '経済産業省'],
  ['it-shien.smrj.go.jp', '中小企業基盤整備機構（デジタル化・AI導入補助金 事務局）'],
  ['shoryokuka.smrj.go.jp', '中小企業基盤整備機構（省力化投資補助金 事務局）'],
  ['growth-100-oku.smrj.go.jp', '中小企業基盤整備機構（100億企業成長ポータル）'],
  ['seisansei.smrj.go.jp', '中小企業基盤整備機構（補助金活用ナビ）'],
  ['smrj.go.jp', '中小企業基盤整備機構'],
  ['jetro.go.jp', '日本貿易振興機構（JETRO）'],
  ['mhlw.go.jp', '厚生労働省'],
  ['jgrants-portal.go.jp', 'デジタル庁（jGrants）'],
  ['shoukei-mahojokin.go.jp', '事業承継・M&A補助金 事務局'],
  ['jizokukahojokin.info', '小規模事業者持続化補助金 事務局'],
  ['shokokai.or.jp', '全国商工会連合会'],
  ['jcci.or.jp', '日本商工会議所'],
];
export function orgOf(href) {
  const host = new URL(href).hostname;
  const hit = ORGS.find(([d]) => host === d || host.endsWith(`.${d}`));
  return hit ? hit[1] : host;
}
// 記事の取得元：[名前, URL, 発行元]（発行元は省略するとドメインから決める）
const sourcesOf = (n) => n.sources.map(([label, href, org]) => [label, href, org || orgOf(href)]);

// 毎日の更新で確認している主な公式サイト
const MONITORED = [
  ['中小企業庁 補助金公募情報', 'https://www.chusho.meti.go.jp/koukai/hojyokin/kobo.html', '各補助金の公募・採択のお知らせ'],
  ['中小企業庁 中小企業対策関連予算', 'https://www.chusho.meti.go.jp/koukai/yosan/index.html', '予算・概算要求'],
  ['ミラサポplus', 'https://mirasapo-plus.go.jp/', '国の補助金の概要と公募要領'],
  ['補助金活用ナビ（スケジュール）', 'https://seisansei.smrj.go.jp/subsidy_info/schedule.html', '主な補助金の公募スケジュール'],
  ['デジタル化・AI導入補助金', 'https://it-shien.smrj.go.jp/', '締切・交付決定の日程'],
  ['中小企業省力化投資補助金', 'https://shoryokuka.smrj.go.jp/', '一般型・カタログ注文型の公募'],
  ['100億企業成長ポータル', 'https://growth-100-oku.smrj.go.jp/', '中小企業成長加速化補助金'],
  ['jGrants（補助金の電子申請システム）', 'https://www.jgrants-portal.go.jp/', '国・自治体の補助金の公募'],
  ['厚生労働省 雇用関係助成金', 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/kyufukin/index.html', '業務改善助成金・キャリアアップ助成金など'],
  ['JETRO（日本貿易振興機構）', 'https://www.jetro.go.jp/', '海外展開・輸出の支援'],
];

export function sortedNews(list = NEWS) {
  return [...list].sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? 1 : -1));
}

const sourceBox = (srcs) => `      <p style="margin: 1rem 0 0; padding: 0.75rem 1rem; background: #f4f7fa; border-left: 3px solid #1f6feb; font-size: 0.9rem; line-height: 1.7;"><strong>情報の取得元：</strong>${srcs.map(([label, href, org]) => `<a href="${href}" target="_blank" rel="noopener">${esc(label)}</a>（${esc(org)}）`).join('、')}</p>
`;

// 情報の取得元の一覧（news/sources.html）
function sourcesPage(news) {
  const byUrl = new Map();
  for (const n of news) for (const [label, href, org] of sourcesOf(n)) {
    if (!byUrl.has(href)) byUrl.set(href, { label, href, org, posts: [] });
    byUrl.get(href).posts.push(n);
  }
  const byOrg = new Map();
  for (const s of byUrl.values()) {
    if (!byOrg.has(s.org)) byOrg.set(s.org, []);
    byOrg.get(s.org).push(s);
  }
  const orgs = [...byOrg.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], 'ja'));
  const cited = orgs.map(([org, list]) => [org, `        <ul>
${list.map((s) => `          <li><a href="${s.href}" target="_blank" rel="noopener">${esc(s.label)}</a><br><span style="font-size: 0.85rem; color: var(--mute); word-break: break-all;">${esc(s.href)}</span><br><span style="font-size: 0.85rem;">この取得元を使った記事：${s.posts.map((n) => `<a href="${fileOf(n)}">${esc(n.title)}</a>（${dateJa(n.date)}）`).join('、')}</span></li>`).join('\n')}
        </ul>`]);
  const monitored = `        <p>毎日のニュースの作成では、主に次の公式サイトの発表を確認しています。</p>
        <ul>
${MONITORED.map(([label, href, what]) => `          <li><a href="${href}" target="_blank" rel="noopener">${esc(label)}</a>（${esc(orgOf(href))}）：${esc(what)}</li>`).join('\n')}
        </ul>`;
  const policy = P('ニュースは、省庁・独立行政法人・各補助金の事務局などの公式の発表（一次情報）を基に作成しています。民間の解説記事だけが根拠の内容は「〜と報じられています」などと書き分け、確認できる公式のページへのリンクを付けています。サイト全体の出典は<a href="../policy/sources.html">出典・更新方針</a>をご覧ください。');
  writeArticle(OUT, 'news', 'sources.html', {
    title: '補助金ニュースの情報の取得元一覧',
    description: '補助金ニュースの記事で参照した、省庁・中小企業基盤整備機構・各補助金の事務局などの公式ページの一覧です。',
    body: articleBody({
      section: ['index.html', '補助金ニュース'], kicker: '情報の取得元一覧', title: '情報の取得元一覧',
      lead: '補助金ニュースの記事で参照した公式ページを、発行元ごとにまとめています。',
      sections: [['取得元の考え方', policy], ['毎日確認している公式サイト', monitored], ...cited.map(([org, html]) => [`${org}`, html])],
      related: [['index.html', '補助金ニュースの一覧'], ['../policy/sources.html', '出典・更新方針'], ['../search.html', '募集中の補助金を探す']],
      banner: 'b13', updated: dateJa(news[0].date),
    }),
  });
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
      body: articleBody({
        section: ['index.html', '補助金ニュース'], kicker: dateJa(n.date), title: n.title, lead: `${dateJa(n.date)}｜${n.summary}`, sections, related,
        sources: sourcesOf(n), banner: bannerFor(`news/${file}`), updated: dateJa(n.date),
        afterLead: sourceBox(sourcesOf(n)),
        sourcesHeading: '情報の取得元',
        sourcesIntro: 'この記事は、次の情報を基に作成しました。内容は変わることがあるため、申請の前に必ずリンク先の最新情報を確認してください。<a href="sources.html">情報の取得元の一覧</a>',
      }),
    });
  });

  sourcesPage(news);

  writeArticle(OUT, 'news', 'index.html', {
    title: '補助金ニュース',
    description: '各補助金の公募・締切・採択、経済産業省・中小企業庁・中小企業基盤整備機構の発表、海外展開の支援などを、毎日整理してお届けします。',
    body: indexBody({
      section: '補助金ニュース', title: '補助金ニュース', banner: 'b13',
      lead: '各補助金の公募・締切・採択や、国の発表を、毎日整理してお届けします（発表がない日は更新しません）。',
      cards: news.map((n) => [fileOf(n), `${dateJa(n.date)}　${n.title}`, n.summary]),
      note: 'ニュースは公式の発表を基に整理していますが、最新の内容は必ず各事務局・省庁の公式サイトで確認してください。各記事に情報の取得元を載せています（<a href="sources.html">情報の取得元の一覧</a>）。<a href="feed.xml">RSSで購読する</a>',
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
