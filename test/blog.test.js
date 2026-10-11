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
  writeFileSync(join(src, '2026-04-01-draft.md'), '---\ntitle: 下書き\ndate: 2026-04-01\ndraft: true\n---\n本文');
  assert.equal(build({ src, out }), 2);
  const index = readFileSync(join(out, 'index.html'), 'utf-8');
  assert.ok(index.indexOf('新しい記事') < index.indexOf('古い記事'));
  assert.ok(!index.includes('下書き'));
  assert.ok(readFileSync(join(out, '2026-03-01-new.html'), 'utf-8').includes('<link rel="canonical" href="https://hojyokin.net/blog/2026-03-01-new.html">'));
});

test('loadPosts: 日付やファイル名が決まりに合わないと止まる', () => {
  const dir = mkdtempSync(join(tmpdir(), 'blog-'));
  writeFileSync(join(dir, 'bad-name.md'), '---\ntitle: x\ndate: 2026-01-01\n---\n本文');
  assert.throws(() => loadPosts(dir), /ファイル名は/);
});
