import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { redirectRules, redirectsText } from '../scripts/build-redirects.mjs';

test('一覧ページは検索結果ページ（search.html）に301で転送する', () => {
  const rules = Object.fromEntries(redirectRules());
  assert.equal(rules['/grants/pref-hokkaido.html'], `/search.html?pref=${encodeURIComponent('北海道')}`);
  assert.equal(rules['/grants/purpose-equipment.html'], '/search.html?purpose=equipment');
  assert.equal(rules['/grants/industry-food.html'], '/search.html?industry=food');
  assert.equal(rules['/grants/deadlines.html'], '/search.html?within=90&sort=end');
  assert.equal(redirectRules().filter(([f]) => f.includes('/pref-')).length, 47);
});

test('public/_redirects は scripts/build-redirects.mjs の出力と一致する', () => {
  assert.equal(readFileSync(new URL('../public/_redirects', import.meta.url), 'utf-8'), redirectsText());
});

test('転送先の条件（都道府県・目的・業種）が検索ページの選択肢にある', () => {
  const html = readFileSync(new URL('../public/search.html', import.meta.url), 'utf-8');
  for (const [, to] of redirectRules()) {
    const m = /\?(pref|purpose|industry)=([^&]+)/.exec(to);
    if (m) assert.ok(html.includes(`value="${decodeURIComponent(m[2])}"`), to);
  }
});

test('個人向けの入口（personal/index.html）は、AI補助金判定の個人向けタブに転送する', () => {
  const rules = Object.fromEntries(redirectRules());
  assert.equal(rules['/personal/index.html'], '/hantei.html?for=personal');
  const html = readFileSync(new URL('../public/hantei.html', import.meta.url), 'utf-8');
  assert.ok(html.includes('id="hj-personal"') && html.includes('data-aud="p"'));
});
