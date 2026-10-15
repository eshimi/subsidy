import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { autoTags, descriptionFor } from '../scripts/lib/seo.mjs';
import { applySeo, FOLDERS } from '../scripts/apply-seo.mjs';

// 蛍光ペン（<strong class="hl">）は、別の手順（scripts/apply-highlight.mjs）で当てるので、比べるときは外す
const unhl = (html) => html.replace(/<strong class="hl">([^<]*)<\/strong>/g, '$1');

test('autoTags: 最大10個、重複なし、フォルダの標準のタグを含む', () => {
  const t = autoTags({ folder: 'basics', title: '事業計画書の書き方', headings: ['申請の前に'], text: '事業計画書 申請 採択 補助金 '.repeat(5) });
  assert.ok(t.length <= 10);
  assert.equal(new Set(t).size, t.length);
  assert.ok(t.includes('補助金の基礎知識'));
  assert.ok(t.includes('事業計画書'));
});

test('descriptionFor: 短い説明だけ、リード文で補う', () => {
  assert.equal(descriptionFor('十分に長い説明文'.repeat(10), 'リード'), '十分に長い説明文'.repeat(10));
  const d = descriptionFor('短い説明。', 'リード文です。'.repeat(30));
  assert.ok(d.length >= 20 && d.length <= 120);
});

test('applySeo: 何度実行しても同じ結果', () => {
  const html = readFileSync(join(process.cwd(), 'public/basics/flow.html'), 'utf-8');
  const once = applySeo('basics', 'flow.html', html);
  assert.equal(applySeo('basics', 'flow.html', once), once);
});

test('すべての記事ページに、キーワード・構造化データ・タグがある', () => {
  for (const folder of FOLDERS) {
    const dir = join(process.cwd(), 'public', folder);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.html') && x !== 'index.html')) {
      const h = readFileSync(join(dir, f), 'utf-8');
      const kw = (h.match(/<meta name="keywords" content="([^"]+)"/) || [])[1];
      assert.ok(kw && kw.split(',').length >= 5 && kw.split(',').length <= 10, `${folder}/${f}: keywords`);
      assert.match(h, /"@type":"(Article|BlogPosting|NewsArticle)"/, `${folder}/${f}: Article`);
      assert.match(h, /"@type":"BreadcrumbList"/, `${folder}/${f}: Breadcrumb`);
      assert.match(h, /<meta property="og:type" content="article">/, `${folder}/${f}: og:type`);
      assert.match(h, /<nav class="art-tags"/, `${folder}/${f}: tags`);
      assert.equal((h.match(/<h1[ >]/g) || []).length, 1, `${folder}/${f}: h1`);
    }
  }
});

test('説明文が短いページは、サイトの説明を添えて長くする', async () => {
  const { padDescription } = await import('../scripts/lib/seo.mjs');
  const d = padDescription('ブログの一覧');
  assert.ok(d.length >= 45 && d.startsWith('ブログの一覧。'));
  assert.equal(padDescription(d), d);
  assert.equal(padDescription('あ'.repeat(70)), 'あ'.repeat(70));
});

test('特集ページの独自解説（向き・不向き、近い制度との違い）は、何度入れても同じ結果', async () => {
  const { applyFit } = await import('../scripts/apply-fit.mjs');
  const { FIT } = await import('../scripts/data/feature-fit.mjs');
  for (const slug of Object.keys(FIT)) {
    const html = readFileSync(join(process.cwd(), 'public/feature', `${slug}.html`), 'utf-8');
    assert.match(html, /id="fit"/, slug);
    assert.equal(unhl(applyFit(html, slug)), unhl(html), slug);
  }
});

test('基礎知識・対象者別の独自解説は、何度入れても同じ結果で、FAQの構造化データが付く', async () => {
  const { applyExtra } = await import('../scripts/apply-extra.mjs');
  const { EXTRA } = await import('../scripts/data/extra-sections.mjs');
  for (const key of Object.keys(EXTRA)) {
    const html = readFileSync(join(process.cwd(), 'public', key), 'utf-8');
    assert.match(html, /<!-- extra:start -->/, key);
    assert.equal(unhl(applyExtra(html, key)), unhl(html), key);
    if (EXTRA[key].sections.some((s) => s.faq)) assert.match(html, /"@type":"FAQPage"/, key);
  }
});

test('AdSense：ads.txt と、サイト確認用のメタタグがある', () => {
  assert.equal(readFileSync(join(process.cwd(), 'public/ads.txt'), 'utf-8').trim(), 'google.com, pub-7811993263471350, DIRECT, f08c47fec0942fa0');
  assert.match(readFileSync(join(process.cwd(), 'public/index.html'), 'utf-8'), /<meta name="google-adsense-account" content="ca-pub-7811993263471350">/);
});

test('A8の300x250のバナーは、右側の列に出す（site.js）', () => {
  const js = readFileSync(join(process.cwd(), 'public/site.js'), 'utf-8');
  assert.match(js, /a8mat=4BED92\+98TBXU\+5UY6\+5ZMCH/);
  assert.match(js, /page-side/);
  assert.match(readFileSync(join(process.cwd(), 'public/style.css'), 'utf-8'), /\.pr-side/);
});

test('トップ・検索ページの一覧を、先にHTMLへ書き出す（締切の近い順、何度でも同じ結果）', async () => {
  const { listsFor, applyHome, applySearch } = await import('../scripts/prerender-lists.mjs');
  const now = Date.parse('2026-10-13T00:00:00Z');
  const items = [
    { id: 'a', t: '制度A', a: '東京都', s: '2026-10-01', e: '2026-12-01' },
    { id: 'b', t: '制度B', a: '全国', s: '2026-10-10', e: '2026-10-20' },
    { id: 'c', t: '終了した制度', a: '全国', s: '2026-01-01', e: '2026-02-01' },
  ];
  const lists = listsFor(items, now);
  assert.match(lists.home.soon, /制度B.*締切まで7日.*制度A/);
  assert.ok(!lists.search.includes('終了した制度'));
  const home = '<ul id="r-soon"><!-- prerender-soon:start --><li>読み込み中…</li><!-- prerender-soon:end --></ul><ul id="r-new"><!-- prerender-new:start --><!-- prerender-new:end --></ul>';
  const once = applyHome(home, lists);
  assert.equal(applyHome(once, lists), once);
  assert.ok(!once.includes('読み込み中'));
  const s = '<div id="s-results"><!-- prerender:start --><!-- prerender:end --></div>';
  assert.match(applySearch(s, lists), /<ul class="r-list">.*制度B/);
  assert.equal(applySearch(s, { search: '' }), s);
});

test('特集の「背景と目的」：何度入れても同じ結果。出典・確認日・関連記事が付く', async () => {
  const { applyBackground, articles, relatedFor } = await import('../scripts/apply-background.mjs');
  const { BACKGROUND } = await import('../scripts/data/feature-background.mjs');
  const list = articles();
  for (const slug of Object.keys(BACKGROUND)) {
    const html = readFileSync(join(process.cwd(), 'public/feature', `${slug}.html`), 'utf-8');
    assert.match(html, /id="bg"/, slug);
    assert.equal(unhl(applyBackground(html, slug, list)), unhl(html), slug);
    // 新レイアウト（build-feature-v2.mjs）のページは、出典の見出しの形が違う
    assert.match(html, html.includes('data-layout="feature-v2"') ? /出典（\d+件・確認日 \d{4}\/\d{2}\/\d{2}）/ : /出典（確認した日：/, slug);
    assert.ok(BACKGROUND[slug].sources.length >= 3, slug);
  }
  assert.ok(relatedFor(['省力化'], list).every((a) => a.title.includes('省力化')));
});

test('個人向けページの「背景と目的」：7ページすべてに入り、何度入れても同じ結果', async () => {
  const { applyBackground, articles } = await import('../scripts/apply-background.mjs');
  const { PERSONAL_BACKGROUND } = await import('../scripts/data/personal-background.mjs');
  const list = articles();
  assert.equal(Object.keys(PERSONAL_BACKGROUND).length, 7);
  for (const slug of Object.keys(PERSONAL_BACKGROUND)) {
    const html = readFileSync(join(process.cwd(), 'public/personal', `${slug}.html`), 'utf-8');
    assert.match(html, /id="bg"/, slug);
    assert.equal(unhl(applyBackground(html, slug, list, PERSONAL_BACKGROUND)), unhl(html), slug);
    assert.ok(PERSONAL_BACKGROUND[slug].sources.length >= 3, slug);
  }
});

test('title：長い題名は「｜補助金ネット」を外し、指定のあるページは短い題名にする。何度かけても同じ', async () => {
  const { titleFor, applyTitle } = await import('../scripts/apply-seo.mjs');
  const { SEO_TITLES } = await import('../scripts/data/seo-titles.mjs');
  assert.equal(titleFor('news/x.html', '短い題名｜補助金ネット'), '短い題名｜補助金ネット');
  const long = 'あ'.repeat(40);
  assert.equal(titleFor('news/x.html', `${long}｜補助金ネット`), long);
  assert.equal(titleFor('news/x.html', long), long);
  for (const [key, base] of Object.entries(SEO_TITLES)) {
    const t = titleFor(key, `${'長'.repeat(60)}｜補助金ネット`);
    assert.ok(t.startsWith(base), key);
    assert.ok(t.length <= 50, key);
  }
  const html = `<title>${long}｜補助金ネット</title><meta property="og:title" content="${long}｜補助金ネット">`;
  const once = applyTitle('news/x.html', html);
  assert.equal(once, `<title>${long}</title><meta property="og:title" content="${long}">`);
  assert.equal(applyTitle('news/x.html', once), once);
});
