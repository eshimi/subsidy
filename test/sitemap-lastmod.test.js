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
