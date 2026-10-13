// 記事ページのSEOを整える（何度実行しても同じ結果）：
//  ・キーワード（タグ約10個）、og:type=article、公開日・更新日
//  ・構造化データ（Article/BlogPosting/NewsArticle、パンくず）
//  ・短い説明文をリード文から補う
//  ・記事の末尾に、タグの一覧（検索ページへのリンク）
// 使い方：node scripts/apply-seo.mjs（ブログ・ニュースを作り直したあと、apply-related の後に実行する）
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from './lib/markdown.mjs';
import { SITE, FOLDER_TAGS, padDescription, autoTags, descriptionFor, jsonLdArticle, jsonLdBreadcrumb, stripTags } from './lib/seo.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = join(REPO, 'public');
export const FOLDERS = ['feature', 'basics', 'who', 'personal', 'cases', 'columns', 'guides', 'compare', 'news', 'blog'];
const SECTION = { feature: '特集', basics: '基礎知識', who: '対象者別', personal: '個人向け', cases: '活用事例', columns: 'コラム', guides: '副業ガイド', compare: '比較', news: 'ニュース', blog: 'ブログ' };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const iso = (y, m, d) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

export function seoFor(folder, file, html) {
  const slug = file.replace(/\.html$/, '');
  const h1 = stripTags((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => stripTags(m[1])).filter((t) => t && t !== '関連ページ');
  const lead = stripTags((html.match(/<p class="lead"[^>]*>([\s\S]*?)<\/p>/) || [])[1] || '');
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [''])[0].replace(/<nav class="art-tags"[\s\S]*?<\/nav>/, '').replace(/<aside[\s\S]*?<\/aside>/, '');
  const text = stripTags(main);
  const crumbHtml = (html.match(/<nav class="area-crumb"[^>]*>([\s\S]*?)<\/nav>/) || [])[1] || '';
  const image = (html.match(/pb-banner" style="background-image: url\('([^']+)'\)/) || [])[1];
  let published = '';
  let modified = '';
  const fm = folder === 'blog' ? slug.match(/^(\d{4})-(\d{2})-(\d{2})-/) : folder === 'news' ? slug.match(/^(\d{4})-(\d{2})-(\d{2})-/) : null;
  if (fm) published = `${fm[1]}-${fm[2]}-${fm[3]}`;
  const upd = html.match(/最終更新日：(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (upd) modified = iso(upd[1], upd[2], upd[3]);
  let extra = [];
  if (folder === 'blog') {
    const md = join(REPO, 'content', 'blog', `${slug}.md`);
    if (existsSync(md)) {
      const { data } = parseFrontmatter(readFileSync(md, 'utf-8'));
      if (Array.isArray(data.tags)) extra = data.tags.map(String);
      if (data.updated) modified = data.updated;
    }
  }
  if (!published) published = modified;
  if (!modified) modified = published;
  const tags = autoTags({ folder, title: h1, headings: h2s, text, extra });
  const desc0 = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const description = padDescription(descriptionFor(desc0.replace(/&quot;/g, '"').replace(/&amp;/g, '&'), lead));
  const url = `${SITE}/${folder}/${file}`;
  const crumbLinks = [...crumbHtml.matchAll(/<a href="([^"]+)">([^<]+)<\/a>/g)].map((m) => [m[2], new URL(m[1], url).href]);
  const crumbLast = stripTags(crumbHtml.replace(/<a[\s\S]*?<\/a>/g, '')).replace(/^[\s＞]+/, '').replace(/[\s＞]+$/g, '').split(/\s*＞\s*/).filter(Boolean).pop() || h1;
  const crumbs = [...crumbLinks.map(([n, u]) => [n, u]), [crumbLast, url]];
  const type = folder === 'blog' ? 'BlogPosting' : folder === 'news' ? 'NewsArticle' : 'Article';
  const imageUrl = image ? new URL(image, url).href : `${SITE}/images/og-image.png`;
  return { h1, tags, description, desc0, url, published, modified, type, crumbs, imageUrl };
}

const SEO_RE = /\n?[ \t]*<!-- seo:start -->[\s\S]*?<!-- seo:end -->/g;
const TAGS_RE = /\n?[ \t]*<!-- tags:start -->[\s\S]*?<!-- tags:end -->/g;

export function applySeo(folder, file, html) {
  const s = seoFor(folder, file, html);
  let out = html.replace(SEO_RE, '').replace(TAGS_RE, '');
  const dEsc = esc(s.description);
  if (s.description !== s.desc0 && s.desc0) {
    const old = esc(s.desc0);
    out = out.split(`content="${old}"`).join(`content="${dEsc}"`);
  }
  out = out.replace('<meta property="og:type" content="website">', '<meta property="og:type" content="article">');
  const lines = [
    '<!-- seo:start -->',
    `<meta name="keywords" content="${esc(s.tags.join(','))}">`,
  ];
  if (s.published) lines.push(`<meta property="article:published_time" content="${s.published}">`);
  if (s.modified) lines.push(`<meta property="article:modified_time" content="${s.modified}">`);
  for (const t of s.tags) lines.push(`<meta property="article:tag" content="${esc(t)}">`);
  const article = jsonLdArticle({ type: s.type, headline: s.h1, description: s.description, url: s.url, image: s.imageUrl, datePublished: s.published, dateModified: s.modified, keywords: s.tags, section: SECTION[folder] });
  lines.push(`<script type="application/ld+json">${JSON.stringify(article).replace(/</g, '\\u003c')}</script>`);
  lines.push(`<script type="application/ld+json">${JSON.stringify(jsonLdBreadcrumb(s.crumbs)).replace(/</g, '\\u003c')}</script>`);
  lines.push('<!-- seo:end -->');
  out = out.replace('</head>', `  ${lines.join('\n  ')}\n</head>`);
  const nav = `<!-- tags:start -->\n<nav class="art-tags" aria-label="タグ"><span class="art-tags-label">タグ</span><ul>${s.tags.map((t) => `<li><a href="${(FOLDER_TAGS[folder] || []).includes(t) && existsSync(join(PUB, folder, 'index.html')) ? 'index.html' : `../search.html?q=${encodeURIComponent(t)}`}" rel="tag">#${esc(t)}</a></li>`).join('')}</ul></nav>\n<!-- tags:end -->`;
  if (out.includes('</div><aside class="page-side"')) out = out.replace('</div><aside class="page-side"', `${nav}\n</div><aside class="page-side"`);
  else out = out.replace('  </main>', `${nav}\n  </main>`);
  return out;
}

// 記事以外のページ（public/ 直下、area/、policy/ など）：短い説明文だけを補う
export function padPageDescription(html) {
  const d = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!d) return html;
  const plain = d.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  const next = padDescription(plain);
  if (next === plain) return html;
  return html.split(`content="${d}"`).join(`content="${esc(next)}"`);
}

export function run() {
  let n = 0;
  const others = [''].concat(readdirSync(PUB, { withFileTypes: true }).filter((e) => e.isDirectory() && !FOLDERS.includes(e.name) && !['grants', 'images', 'icons', 'media', 'data'].includes(e.name)).map((e) => e.name));
  for (const folder of others) {
    const dir = join(PUB, folder);
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.html'))) {
      const p = join(dir, file);
      const before = readFileSync(p, 'utf-8');
      const after = padPageDescription(before);
      if (after !== before) { writeFileSync(p, after); n++; }
    }
  }
  for (const folder of FOLDERS) {
    const dir = join(PUB, folder);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.html'))) {
      const p = join(dir, file);
      const before = readFileSync(p, 'utf-8');
      const after = file === 'index.html' ? padPageDescription(before) : applySeo(folder, file, before);
      if (after !== before) { writeFileSync(p, after); n++; }
    }
  }
  return n;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(`SEOを更新：${run()}ページ`);
