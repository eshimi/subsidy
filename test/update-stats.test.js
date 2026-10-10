import { test } from 'node:test';
import assert from 'node:assert/strict';
import { withArticleCount } from '../scripts/update-stats.mjs';

test('withArticleCount: 記事の数を10本単位で切り捨てて表示する', () => {
  const html = '<dd id="r-articles">30<small>本以上</small></dd>';
  assert.equal(withArticleCount(html, 47), '<dd id="r-articles">40<small>本以上</small></dd>');
  assert.equal(withArticleCount(html, 5), '<dd id="r-articles">10<small>本以上</small></dd>');
});
