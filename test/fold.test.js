import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const ctx = { self: {} };
vm.runInNewContext(readFileSync(new URL('../public/fold.js', import.meta.url), 'utf-8'), ctx);
const { fold, expand } = ctx.self.HJFold;

test('ひらがなの読みを、漢字の言葉に直す', () => {
  assert.equal(expand('こそだて'), '子育て');
  assert.equal(expand('たいしん 補助'), '耐震 補助');
  assert.equal(expand('たいようこうはつでん'), '太陽光はつでん');
  assert.equal(expand('東京 こそだて'), '東京 子育て');
});

test('カタカナ・全角・半角のゆれ', () => {
  assert.equal(expand('コソダテ'), '子育て');
  assert.equal(expand('ＩＴ導入'), 'IT導入');
  assert.equal(expand('ホームページ'), 'ホームページ');
  assert.equal(fold('ホームページ'), fold('ほーむぺーじ'));
  assert.equal(fold('ＤＸ'), fold('dx'));
});

test('漢字の入力は、そのまま', () => {
  assert.equal(expand('子育て'), '子育て');
  assert.equal(expand(''), '');
});
