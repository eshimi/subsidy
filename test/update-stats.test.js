import { test } from 'node:test';
import assert from 'node:assert/strict';
import { withArticleCount } from '../scripts/update-stats.mjs';

test('withArticleCount: 記事の数を10本単位で切り捨てて表示する', () => {
  const html = '<dd id="r-articles">30<small>本以上</small></dd>';
  assert.equal(withArticleCount(html, 47), '<dd id="r-articles">40<small>本以上</small></dd>');
  assert.equal(withArticleCount(html, 5), '<dd id="r-articles">10<small>本以上</small></dd>');
});

test('withProgramStats / countPrograms: トップの件数を、検索ページと同じ search.json の件数に合わせる', async () => {
  const { withProgramStats, countPrograms } = await import('../scripts/update-stats.mjs');
  const { mkdtempSync, mkdirSync, writeFileSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const root = mkdtempSync(join(tmpdir(), 'stats-'));
  mkdirSync(join(root, 'grants'));
  writeFileSync(join(root, 'grants', 'search.json'), JSON.stringify({ items: [{ id: 1 }, { id: 2, local: true }, { id: 3, local: true }, { id: 4 }] }));
  const stats = countPrograms(root);
  assert.deepEqual(stats, { total: 4, local: 2 });
  assert.equal(countPrograms(join(root, 'none')), null);
  const html = '<span id="r-total">毎日更新。</span><dd id="r-live">3,000<small>件以上</small></dd><dd id="r-cities">1<small>市区町村</small></dd><dd id="r-local">2,800<small>件以上</small></dd>';
  const out = withProgramStats(html, { total: 3195, local: 2874 }, 1741);
  assert.match(out, /<dd id="r-live">3,195<small>件<\/small><\/dd>/);
  assert.match(out, /<dd id="r-local">2,874<small>件<\/small><\/dd>/);
  assert.match(out, /<dd id="r-cities">1,741<small>市区町村<\/small><\/dd>/);
  assert.match(out, /3,195件を掲載。毎日更新。/);
  // search.json がないときは、件数は変えない
  assert.match(withProgramStats(html, null, 1741), /<dd id="r-live">3,000/);
});

test('デプロイ時のビルド（build:grants）で、トップの数字も毎回更新する', async () => {
  const { readFileSync } = await import('node:fs');
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
  assert.match(pkg.scripts['build:grants'], /update-stats\.mjs/);
});
