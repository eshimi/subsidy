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
  writeFileSync(join(root, 'grants', 'search.json'), JSON.stringify({ items: [{ id: 1, guide: true }, { id: 2, local: true, guide: true }, { id: 3, local: true, guide: true }, { id: 4, guide: true }] }));
  const stats = countPrograms(root);
  assert.deepEqual(stats, { total: 4, local: 2 });
  assert.equal(countPrograms(join(root, 'none')), null);
  const html = '<span id="r-total">毎日更新。</span><dd id="r-live">3,000<small>件以上</small></dd><dd id="r-cities">1<small>市区町村</small></dd><dd id="r-local">2,800<small>件以上</small></dd>';
  const out = withProgramStats(html, { total: 3195, local: 2874 }, 1741);
  assert.match(out, /<dd id="r-live">3,195<small>件<\/small><span class="r-daily">毎日更新<\/span><\/dd>/);
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

test('countPrograms: 検索ページと同じ数え方（締切が過ぎた制度は数えず、解説は数える）', async () => {
  const { countPrograms } = await import('../scripts/update-stats.mjs');
  const { mkdtempSync, mkdirSync, writeFileSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const root = mkdtempSync(join(tmpdir(), 'stats2-'));
  mkdirSync(join(root, 'grants'));
  const now = Date.parse('2026-10-12T00:00:00Z');
  const day = 86400000;
  writeFileSync(join(root, 'grants', 'search.json'), JSON.stringify({ items: [
    { id: 'a', e: new Date(now + day).toISOString() },
    { id: 'b', e: new Date(now - day).toISOString() },
    { id: 'c', local: true, e: new Date(now + day).toISOString() },
    { id: 'd', guide: true },
  ] }));
  assert.deepEqual(countPrograms(root, now), { total: 3, local: 1 });
});

test('municipalityCount: 都道府県＋名前で重複を除いた市区町村の数。トップと地域別の入口に同じ数を入れる', async () => {
  const { municipalityCount, withProgramStats } = await import('../scripts/update-stats.mjs');
  const { AREA_CITIES } = await import('../src/data/area-cities.js');
  assert.equal(municipalityCount([{ pref: '東京都', name: '府中市' }, { pref: '広島県', name: '府中市' }, { pref: '東京都', name: '府中市' }]), 2);
  assert.equal(municipalityCount(), AREA_CITIES.length);
  const html = '<dd id="r-cities">1<small>市区町村</small></dd><span id="area-total">1</span>';
  const out = withProgramStats(html, null, 267);
  assert.match(out, /<dd id="r-cities">267</);
  assert.match(out, /<span id="area-total">267<\/span>/);
});

test('お知らせ：data/notices.json を日付の新しい順に3件まで出し、リンクと記号を正しく扱う', async () => {
  const { noticesHtml, applyLatest } = await import('../scripts/update-latest.mjs');
  const html = noticesHtml([
    { date: '2026-10-01', text: '古い' },
    { date: '2026-10-14', text: '新しい <機能>', href: 'plan.html' },
    { date: '2026-10-06', text: 'c' }, { date: '2026-10-07', text: 'd' },
  ]);
  assert.match(html, /^<li><time datetime="2026-10-14">2026\.10\.14<\/time><span><a href="plan.html">新しい &lt;機能&gt;<\/a>/);
  assert.ok(!html.includes('古い'));
  const page = applyLatest('<!-- notice:start -->x<!-- notice:end -->', { news: '', blog: '', today: '2026-10-14', notices: html });
  assert.ok(page.startsWith(`<!-- notice:start -->${html}`));
  const { noticesArchiveHtml } = await import('../scripts/update-latest.mjs');
  assert.match(noticesArchiveHtml([{ date: '2026-10-01', text: '古い' }, { date: '2026-10-14', text: '新しい' }]), /2026年10月14日[^]*2026年10月1日/);
});

test('withGuideCount: くわしい解説つきの制度の数を差し替える（0件のときは変えない）', async () => {
  const { withGuideCount } = await import('../scripts/update-stats.mjs');
  const html = '<dd id="r-guides">100<small>件</small></dd>';
  assert.equal(withGuideCount(html, 1234), '<dd id="r-guides">1,234<small>件</small></dd>');
  assert.equal(withGuideCount(html, 0), html);
});

test('withProgramStats: トップの大きな数字（<b id="r-live">）も差し替える', async () => {
  const { withProgramStats } = await import('../scripts/update-stats.mjs');
  const html = '<b id="r-live">1<small>件</small><span class="r-daily">毎日更新</span></b>';
  assert.equal(withProgramStats(html, { total: 3195, local: 1 }, 1), '<b id="r-live">3,195<small>件</small><span class="r-daily">毎日更新</span></b>');
});
