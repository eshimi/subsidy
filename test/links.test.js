import { test } from 'node:test';
import assert from 'node:assert/strict';
import { audit, resolveHref } from '../scripts/check-links.mjs';

test('resolveHref: 相対リンクを public/ からのパスにする', () => {
  assert.equal(resolveHref('../feature/jizokuka.html', 'cases/a.html'), 'feature/jizokuka.html');
  assert.equal(resolveHref('../', 'area/x.html'), 'index.html');
  assert.equal(resolveHref('search.html?pref=%E6%9D%B1', 'hitsuyo.html'), 'search.html');
  assert.equal(resolveHref('https://example.com/', 'a.html'), null);
  assert.equal(resolveHref('#top', 'a.html'), null);
});

test('サイト内リンク：リンク切れがなく、サイトマップのURLのファイルがある', () => {
  const r = audit();
  assert.deepEqual(r.broken, [], `リンク切れ：${r.broken.slice(0, 5).map((b) => b.join(' → ')).join(' / ')}`);
  assert.deepEqual(r.smMissingFile, []);
  assert.deepEqual(r.notInSitemap, [], `サイトマップにない：${r.notInSitemap.slice(0, 5).join(', ')}`);
});
