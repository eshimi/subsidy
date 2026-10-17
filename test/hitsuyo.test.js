import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORIES, ARTICLES } from '../scripts/data/hitsuyo-articles.mjs';

const PUB = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const read = (p) => readFileSync(join(PUB, p), 'utf-8');

test('やりたいことから探す：解説のあるカテゴリと個別の解説のページが、生成されている', () => {
  for (const c of CATEGORIES.filter((x) => x.ready)) {
    assert.ok(existsSync(join(PUB, 'hitsuyo', `${c.id}.html`)), `${c.id}.html`);
    for (const a of ARTICLES.filter((x) => x.cat === c.id)) assert.ok(existsSync(join(PUB, 'hitsuyo', `${c.id}-${a.slug}.html`)));
  }
});

test('入口（hitsuyo.html）：解説のあるカテゴリはリンク、準備中のカテゴリはリンクにしない', () => {
  const html = read('hitsuyo.html');
  for (const c of CATEGORIES) {
    if (c.ready) assert.ok(html.includes(`href="hitsuyo/${c.id}.html"`), c.id);
    else assert.ok(!html.includes(`hitsuyo/${c.id}.html`), c.id);
  }
});

test('個別の解説：契約・発注の注意、確認先（公式）、最終更新日、募集中の補助金の枠、断定的な表現がない', () => {
  for (const a of ARTICLES) {
    const html = read(`hitsuyo/${a.cat}-${a.slug}.html`);
    assert.match(html, /契約・発注の注意/, a.slug);
    assert.match(html, /最終更新日：/, a.slug);
    assert.match(html, /data-open data-purposes="/, a.slug);
    assert.match(html, /<link rel="canonical" href="https:\/\/hojyokin\.net\/hitsuyo\/[a-z-]+\.html"/, a.slug);
    assert.ok(!/必ず(採択|受給|もらえ)/.test(html.replace('採択や受給を保証するものではありません', '')), a.slug);
  }
});

test('サイトマップに、新しいページが載っている', () => {
  const xml = read('sitemap.xml');
  assert.ok(xml.includes('/hitsuyo/store.html'));
  assert.ok(xml.includes('/hitsuyo/store-kitchen.html'));
});
