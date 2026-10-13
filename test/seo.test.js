import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { autoTags, descriptionFor } from '../scripts/lib/seo.mjs';
import { applySeo, FOLDERS } from '../scripts/apply-seo.mjs';

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
    assert.equal(applyFit(html, slug), html, slug);
  }
});

test('基礎知識・対象者別の独自解説は、何度入れても同じ結果で、FAQの構造化データが付く', async () => {
  const { applyExtra } = await import('../scripts/apply-extra.mjs');
  const { EXTRA } = await import('../scripts/data/extra-sections.mjs');
  for (const key of Object.keys(EXTRA)) {
    const html = readFileSync(join(process.cwd(), 'public', key), 'utf-8');
    assert.match(html, /<!-- extra:start -->/, key);
    assert.equal(applyExtra(html, key), html, key);
    if (EXTRA[key].sections.some((s) => s.faq)) assert.match(html, /"@type":"FAQPage"/, key);
  }
});

test('AdSense：ads.txt と、サイト確認用のメタタグがある', () => {
  assert.equal(readFileSync(join(process.cwd(), 'public/ads.txt'), 'utf-8').trim(), 'google.com, pub-7811993263471350, DIRECT, f08c47fec0942fa0');
  assert.match(readFileSync(join(process.cwd(), 'public/index.html'), 'utf-8'), /<meta name="google-adsense-account" content="ca-pub-7811993263471350">/);
});
