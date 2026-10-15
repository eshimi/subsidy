import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseFrontmatter, inline, renderPost } from '../scripts/lib/markdown.mjs';
import { loadPosts, build } from '../scripts/build-blog.mjs';

test('parseFrontmatter: 先頭の設定と本文を分ける', () => {
  const { data, body } = parseFrontmatter('---\ntitle: "テスト記事"\ndate: 2026-10-11\ndraft: false\n---\n本文です\n');
  assert.equal(data.title, 'テスト記事');
  assert.equal(data.date, '2026-10-11');
  assert.equal(data.draft, false);
  assert.equal(body, '本文です\n');
});

test('inline: HTML は文字として逃がし、太字・コード・リンクを変換する', () => {
  assert.equal(inline('<b>x</b>'), '&lt;b&gt;x&lt;/b&gt;');
  assert.equal(inline('**強調** と `code`'), '<strong>強調</strong> と <code>code</code>');
  assert.equal(inline('[公式](https://www.jgrants-portal.go.jp/)'), '<a href="https://www.jgrants-portal.go.jp/" target="_blank" rel="noopener">公式</a>');
  assert.equal(inline('[内側](../hantei.html)'), '<a href="../hantei.html">内側</a>');
  assert.equal(inline('[危険](javascript:void0)'), '危険');
});

test('renderPost: 最初の ## より前は「はじめに」、各 ## が節になる', () => {
  const sections = renderPost('導入の文章\n\n## 一つ目\n- 項目A\n- 項目B\n\n### 小見出し\n1. 手順\n> 注意\n\n## 二つ目\n段落1\n段落2');
  assert.deepEqual(sections.map(([h]) => h), ['はじめに', '一つ目', '二つ目']);
  assert.match(sections[1][1], /<ul>[\s\S]*<li>項目A<\/li>[\s\S]*<\/ul>/);
  assert.match(sections[1][1], /<h3>小見出し<\/h3>/);
  assert.match(sections[1][1], /<ol>[\s\S]*<li>手順<\/li>/);
  assert.match(sections[1][1], /<blockquote><p>注意<\/p><\/blockquote>/);
  assert.match(sections[2][1], /<p>段落1<br>段落2<\/p>/);
});

test('build: 下書きは載せず、日付の新しい順に一覧へ出す', () => {
  const dir = mkdtempSync(join(tmpdir(), 'blog-'));
  const src = join(dir, 'content');
  const out = join(dir, 'public', 'blog');
  mkdirSync(src);
  writeFileSync(join(src, '2026-01-01-old.md'), '---\ntitle: 古い記事\ndate: 2026-01-01\n---\n## 節\n本文');
  writeFileSync(join(src, '2026-03-01-new.md'), '---\ntitle: 新しい記事\ndate: 2026-03-01\n---\n## 節\n本文');
  writeFileSync(join(src, '2026-04-01-draft.md'), '---\ntitle: 公開前の記事\ndate: 2026-04-01\ndraft: true\n---\n本文');
  assert.equal(build({ src, out }), 2);
  const index = readFileSync(join(out, 'index.html'), 'utf-8');
  assert.ok(index.indexOf('新しい記事') < index.indexOf('古い記事'));
  assert.ok(!index.includes('公開前の記事'));
  assert.ok(readFileSync(join(out, '2026-03-01-new.html'), 'utf-8').includes('<link rel="canonical" href="https://hojyokin.net/blog/2026-03-01-new.html">'));
});

test('loadPosts: 日付やファイル名が決まりに合わないと止まる', () => {
  const dir = mkdtempSync(join(tmpdir(), 'blog-'));
  writeFileSync(join(dir, 'bad-name.md'), '---\ntitle: x\ndate: 2026-01-01\n---\n本文');
  assert.throws(() => loadPosts(dir), /ファイル名は/);
});

test('loadPosts: 題材リスト（TOPICS.md）は記事として読まない', async () => {
  const { mkdtempSync, writeFileSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { loadPosts } = await import('../scripts/build-blog.mjs');
  const dir = mkdtempSync(join(tmpdir(), 'blog-'));
  writeFileSync(join(dir, 'TOPICS.md'), '# 題材\n- [ ] x\n');
  writeFileSync(join(dir, '2026-10-13-sample-post.md'), '---\ntitle: テスト\ndate: 2026-10-13\n---\n\n本文です。\n');
  assert.deepEqual(loadPosts(dir).map((p) => p.slug), ['2026-10-13-sample-post']);
});

test('ブログ：表（| で区切る書き方）を、表として出す', async () => {
  const { blocksToHtml } = await import('../scripts/lib/markdown.mjs');
  const html = blocksToHtml('| 項目 | 内容 |\n| --- | --- |\n| 補助率 | 2/3 |\n| 締切 | **12月15日** |\n\n本文');
  assert.match(html, /<table class="feature-table">/);
  assert.match(html, /<th scope="row">補助率<\/th><td>2\/3<\/td>/);
  assert.match(html, /<strong>12月15日<\/strong>/);
  assert.match(html, /<p>本文<\/p>/);
});

test('ブログ一覧：カテゴリのボタンと件数、記事の行（カテゴリ・読了時間）、人気のタグ。JS なしでも全記事が出る', async () => {
  const { build, readMinutes, popularTags, CATEGORIES } = await import('../scripts/build-blog.mjs');
  const src = mkdtempSync(join(tmpdir(), 'blog-src-'));
  const out = mkdtempSync(join(tmpdir(), 'blog-out-'));
  const post = (slug, date, category, tags, chars) => writeFileSync(join(src, `${slug}.md`), `---\ntitle: ${slug}\ndate: ${date}\ncategory: ${category}\ntags: [${tags}]\n---\n\n${'あ'.repeat(chars)}\n`);
  post('2026-03-01-a', '2026-03-01', '申請のしかた', 'タグ1, タグ2', 1200);
  post('2026-03-02-b', '2026-03-02', '申請のしかた', 'タグ1', 100);
  post('2026-03-03-c', '2026-03-03', '未登録のカテゴリ', 'タグ3', 100);
  assert.equal(build({ src, out }), 3);
  const html = readFileSync(join(out, 'index.html'), 'utf-8');
  assert.match(html, /data-cat="すべて" aria-pressed="true">すべて<sup>3<\/sup>/);
  assert.match(html, /data-cat="申請のしかた" aria-pressed="false">申請のしかた<sup>2<\/sup>/);
  assert.match(html, /data-cat="未登録のカテゴリ"[^>]*>未登録のカテゴリ<sup>1<\/sup>/);
  assert.equal((html.match(/class="bl-row"/g) || []).length, 3);
  assert.ok(!/class="bl-row"[^>]*hidden/.test(html));
  assert.match(html, /bl-cat-apply">申請のしかた/);
  assert.match(html, /bl-cat-etc">未登録のカテゴリ/);
  assert.match(html, /読了 約2分/);
  assert.match(html, /<a href="\.\.\/search\.html\?q=%E3%82%BF%E3%82%B01">タグ1<\/a>/);
  assert.equal(readMinutes('あ'.repeat(1250)), 3);
  assert.equal(readMinutes('短い'), 1);
  assert.deepEqual(popularTags([{ tags: ['x', 'y'] }, { tags: ['y'] }, { tags: ['z', 'z'] }]), ['y', 'x', 'z']);
  assert.deepEqual(CATEGORIES.map(([n]) => n), ['申請のしかた', '制度の選び方', 'サイトの使い方', 'データ・考察', 'お知らせ']);
});

test('ブログの記事ページ：ポイント・目次・前後の記事・同じカテゴリ。右の列の先頭に、目次とAI判定が入る（ポイントは本文の前だけ）', async () => {
  const { build } = await import('../scripts/build-blog.mjs');
  const src = mkdtempSync(join(tmpdir(), 'blog-src-'));
  const out = mkdtempSync(join(tmpdir(), 'blog-out-'));
  const post = (slug, date, category, points) => writeFileSync(join(src, `${slug}.md`), `---\ntitle: ${slug}\ndate: ${date}\ncategory: ${category}\n${points ? `points: [${points}]\n` : ''}---\n\n本文です。\n\n## 見出し1\n\n中身1\n\n## 見出し2\n\n中身2\n`);
  post('2026-03-01-a', '2026-03-01', '申請のしかた', '要点A1, 要点A2, 要点A3');
  post('2026-03-02-b', '2026-03-02', '申請のしかた', '');
  post('2026-03-03-c', '2026-03-03', '制度の選び方', '');
  build({ src, out });
  const a = readFileSync(join(out, '2026-03-01-a.html'), 'utf-8');
  // ポイント：スマホ用（本文の前）の1つだけ（右の列には出さない）。<section> にはしない（右の列の分割が、最初の <section> を本文の始まりと見るため）
  assert.equal((a.match(/この記事のポイント/g) || []).length, 1);
  assert.match(a, /role="region" class="bl-points bl-points--m"/);
  assert.ok(!/<section class="bl-points/.test(a));
  assert.match(a, /<li>要点A2<\/li>/);
  // ポイントのない記事には、出さない
  assert.ok(!readFileSync(join(out, '2026-03-02-b.html'), 'utf-8').includes('この記事のポイント'));
  // 目次（節の見出しへのリンク）とAI判定への案内
  assert.match(a, /aria-label="このページの内容"[\s\S]*<a href="#s0">はじめに<\/a>[\s\S]*<a href="#s1">見出し1<\/a>[\s\S]*<a href="#s2">見出し2<\/a>/);
  assert.match(a, /class="bl-btn" href="\.\.\/hantei\.html"/);
  // 前後の記事：いちばん古い記事は、「前の記事」の代わりに一覧へ。次の記事は新しい方
  assert.match(a, /class="bl-pn-card" href="2026-03-02-b\.html"><small>次の記事/);
  assert.match(a, /bl-pn-list/);
  // 同じカテゴリの記事（自分を除く）
  assert.match(a, /同じカテゴリ「申請のしかた」の記事/);
  assert.match(a, /<a class="bl-rel-card" href="2026-03-02-b\.html">/);
  assert.ok(!/class="bl-rel-card" href="2026-03-01-a\.html"/.test(a));
  assert.ok(!readFileSync(join(out, '2026-03-03-c.html'), 'utf-8').includes('bl-rel-card'));
  // 右の列（ビルドで分割済み）：先頭に目次・AI判定、そのあとに関連ページが並ぶ。ポイントは右の列に出さない
  const side = a.match(/<aside class="page-side"[\s\S]*<\/aside>/)[0];
  assert.ok(!side.includes('この記事のポイント'));
  assert.ok(side.indexOf('このページの内容') >= 0 && side.indexOf('このページの内容') < side.indexOf('bl-side-cta'));
  assert.ok(side.indexOf('bl-side-cta') < side.indexOf('関連ページ</h2>'));
});
