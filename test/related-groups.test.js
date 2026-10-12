import { test } from 'node:test';
import assert from 'node:assert/strict';
import { groupRelated, relatedKind } from '../scripts/lib/side-layout.mjs';

test('relatedKind: 行き先の種類を判定する', () => {
  assert.equal(relatedKind('barber.html', 'cases/ichimaru.html'), 'cases');
  assert.equal(relatedKind('../feature/jizokuka.html', 'cases/ichimaru.html'), 'feature');
  assert.equal(relatedKind('../basics/flow.html', 'cases/x.html'), 'know');
  assert.equal(relatedKind('../hantei.html?for=personal', 'cases/x.html'), 'who');
  assert.equal(relatedKind('../search.html', 'cases/x.html'), 'find');
  assert.equal(relatedKind('../area/index.html', 'feature/x.html'), 'find');
});

const nav = (items) => `<nav class="related-links" aria-label="関連ページ">\n      <h2>関連ページ</h2>\n      <ul>\n${items.map(([h, l]) => `        <li><a href="${h}">${l}</a></li>`).join('\n')}\n      </ul>\n    </nav>`;

test('groupRelated: 種類ごとに見出しをつけて分ける。1種類だけならそのまま。何度かけても同じ', () => {
  const html = nav([['index.html', '事例の一覧'], ['../feature/jizokuka.html', '持続化補助金とは'], ['../search.html', '探す']]);
  const out = groupRelated(html, 'cases/a.html');
  assert.match(out, /<h3 class="rl-group">活用事例<\/h3>/);
  assert.match(out, /<h3 class="rl-group">制度の解説・比較<\/h3>/);
  assert.match(out, /<h3 class="rl-group">補助金を探す・調べる<\/h3>/);
  assert.equal(groupRelated(out, 'cases/a.html'), out);
  const one = nav([['a.html', 'A'], ['b.html', 'B']]);
  assert.equal(groupRelated(one, 'cases/a.html'), one);
});
