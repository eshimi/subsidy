import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseChoices } from '../src/ai.js';

test('parseChoices: 末尾の候補を取り出し、本文からは外す', () => {
  const r = parseChoices('どれに近いですか？\n<choices>["平日夜","週末"]</choices>');
  assert.equal(r.reply, 'どれに近いですか？');
  assert.deepEqual(r.choices, ['平日夜', '週末']);
});

test('parseChoices: 候補タグが無ければ本文そのままで候補は空', () => {
  assert.deepEqual(parseChoices('本文だけ'), { reply: '本文だけ', choices: [] });
});

test('parseChoices: JSON が壊れていれば本文だけ残し、候補は空', () => {
  const r = parseChoices('説明です。<choices>[壊れ</choices>');
  assert.equal(r.reply, '説明です。');
  assert.deepEqual(r.choices, []);
});

test('parseChoices: 候補は文字列のみ・重複なし・4個まで・30字以内', () => {
  const long = 'あ'.repeat(31);
  const r = parseChoices(`x\n<choices>["A","A",3,"${long}","B","C","D","E"]</choices>`);
  assert.deepEqual(r.choices, ['A', 'B', 'C', 'D']);
});
