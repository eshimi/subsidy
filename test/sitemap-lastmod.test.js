import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { lastmodMap, refreshSitemap } from '../scripts/lib/sitemap.mjs';

const page = (t) => `<!doctype html><html><head><title>${t}</title></head><body>${t}</body></html>`;

test('lastmodMap: 中身が変わったページだけ更新日が進む', () => {
  const dir = mkdtempSync(join(tmpdir(), 'sm-'));
  writeFileSync(join(dir, 'index.html'), page('top'));
  writeFileSync(join(dir, 'a.html'), page('a'));
  const m1 = lastmodMap(dir, ['', 'a.html'], {}, '2026-10-01');
  assert.equal(m1['a.html'].d, '2026-10-01');
  writeFileSync(join(dir, 'a.html'), page('a2'));
  const m2 = lastmodMap(dir, ['', 'a.html'], m1, '2026-10-05');
  assert.equal(m2[''].d, '2026-10-01');
  assert.equal(m2['a.html'].d, '2026-10-05');
});

test('refreshSitemap: 新しいページを足し、消えたページを外し、制度ページの追記分は残す', () => {
  const dir = mkdtempSync(join(tmpdir(), 'sm-'));
  mkdirSync(join(dir, 'basics'));
  writeFileSync(join(dir, 'index.html'), page('top'));
  writeFileSync(join(dir, 'new.html'), page('new'));
  const url = (p) => `  <url>\n    <loc>https://hojyokin.net/${p}</loc>\n    <lastmod>2026-10-08</lastmod>\n  </url>`;
  const xml = `<?xml version="1.0"?>\n<urlset>\n${url('')}\n${url('gone.html')}\n  <!-- grants:start -->\n  <url><loc>https://hojyokin.net/grants/x.html</loc><lastmod>2026-10-08</lastmod></url>\n  <!-- grants:end -->\n</urlset>\n`;
  const { xml: out, map } = refreshSitemap(xml, dir, {}, '2026-10-10');
  assert.ok(out.includes('/new.html'));
  assert.ok(!out.includes('gone.html'));
  assert.ok(out.includes('grants/x.html'));
  assert.equal(map['new.html'].d, '2026-10-10');
});

const withMain = (main, nav = 'nav', aside = 'aside') => `<!doctype html><html><head><title>t</title></head><body><header>${nav}</header><main><h1>t</h1>${main}</main><aside class="page-side">${aside}</aside><footer>${nav}</footer></body></html>`;

test('lastmodMap: ナビ・右の列・空白・headだけの変更では、更新日が進まない。本文が変わると進む', () => {
  const dir = mkdtempSync(join(tmpdir(), 'sm-'));
  writeFileSync(join(dir, 'index.html'), withMain('<p>top</p>'));
  const m1 = lastmodMap(dir, [''], {}, '2026-10-01');
  // ナビ・右の列の変更（サイト全体の一括変更）
  writeFileSync(join(dir, 'index.html'), withMain('<p>top</p>', 'nav2', 'aside2'));
  assert.equal(lastmodMap(dir, [''], m1, '2026-10-02')[''].d, '2026-10-01');
  // 空白だけの違い
  writeFileSync(join(dir, 'index.html'), withMain('<p>top</p>\n\n  ', 'nav2', 'aside2').replace('<h1>', '\n  <h1>'));
  assert.equal(lastmodMap(dir, [''], m1, '2026-10-03')[''].d, '2026-10-01');
  // 本文の変更
  writeFileSync(join(dir, 'index.html'), withMain('<p>top2</p>'));
  assert.equal(lastmodMap(dir, [''], m1, '2026-10-04')[''].d, '2026-10-04');
});

test('lastmodMap: 以前の数え方のハッシュの記録は、更新日をそのまま引き継ぐ。新しいページだけ今日になる', () => {
  const dir = mkdtempSync(join(tmpdir(), 'sm-'));
  writeFileSync(join(dir, 'index.html'), withMain('<p>top</p>'));
  writeFileSync(join(dir, 'b.html'), withMain('<p>b</p>'));
  const m = lastmodMap(dir, ['', 'b.html'], { '': { h: 'abcdef012345', d: '2026-09-20' } }, '2026-10-10');
  assert.equal(m[''].d, '2026-09-20');
  assert.ok(m[''].h.startsWith('v2:'));
  assert.equal(m['b.html'].d, '2026-10-10');
});
