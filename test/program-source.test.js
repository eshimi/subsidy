import test from 'node:test';
import assert from 'node:assert/strict';
import { ENDED_RE, inspect, nextState, periodExpired, isHidden, needsReview, textOf } from '../scripts/lib/program-source.mjs';

const TODAY = '2026-10-17';
const detail = (period) => ({ status: 'ok', lead: 'x', facts: [['申請期間', period]], evidence: [] });

test('申請期間の終わりが過去のときだけ、期間終了とみなす', () => {
  assert.equal(periodExpired(detail('令和8年4月1日～令和8年6月5日'), TODAY), true);
  assert.equal(periodExpired(detail('令和8年4月1日から12月25日'), TODAY), false); // 年のない日付は直前の年とみなす
  assert.equal(periodExpired(detail('令和8年4月1日〜令和9年1月15日'), TODAY), false);
  assert.equal(periodExpired(detail('令和8年4月1日〜予算上限に達するまで'), TODAY), false); // 「予算」の語があれば、公開を続ける
  assert.equal(periodExpired(detail('随時'), TODAY), false);
  assert.equal(periodExpired(detail('令和8年11月から令和9年1月'), TODAY), false); // 日付が読めないときは、公開を続ける
  assert.equal(periodExpired({ facts: [] }, TODAY), false);
});

test('終了を示す表現：一般的な注意は数えず、「募集は終了しました」などを数える', () => {
  const n = (t) => (t.match(ENDED_RE) || []).length;
  assert.equal(n('予算上限に達した場合は、その時点で受付を終了する'), 0);
  assert.equal(n('令和8年度の募集は終了しました。'), 1);
  assert.equal(n('【受付終了】A事業 ／ 【募集終了】B事業'), 2);
});

test('検査と状態：取得できない状態が続くと公開を止め、内容の変化や終了表現の増加は要再確認にする', () => {
  const d = { status: 'ok', lead: '制度です', facts: [['補助額・補助率', '上限100万円']], evidence: ['上限100万円', '上限100万円です', '上限100万円とする'] };
  const text = '上限100万円です。上限100万円とする。';
  let s = nextState({}, inspect(d, 200, text), TODAY);
  assert.deepEqual([s.fail, s.endedSuspect, needsReview(s)], [0, false, false]);
  s = nextState(s, inspect(d, 200, `${text} 令和8年度の募集は終了しました。`), '2026-10-24');
  assert.equal(s.endedSuspect, true);
  assert.ok(needsReview(s));
  s = nextState(s, inspect(d, 200, '上限200万円です'), '2026-10-31'); // 数字・引用が本文になくなった
  assert.ok(needsReview(s));
  assert.ok(s.problems.length > 0);
  let g = nextState({}, inspect(d, 404, ''), TODAY);
  assert.ok(isHidden(g, d, TODAY)); // 404 は連続2回分として数え、すぐ止める
  g = nextState({}, inspect(d, 0, ''), TODAY);
  assert.ok(!isHidden(g, d, TODAY));
  g = nextState(g, inspect(d, 0, ''), '2026-10-24');
  assert.ok(isHidden(g, d, TODAY)); // 取得できない状態が続くと止める
  g = nextState(g, inspect(d, 200, text), '2026-10-31');
  assert.ok(!isHidden(g, d, TODAY)); // 取得できれば回復
});

test('本文の取り出し：文字コードの指定と、×・→などの文字参照を読む', () => {
  const html = '<html><head><meta charset="utf-8"></head><body><p>補助対象経費&times;1/2 &rarr; 上限20万円</p></body></html>';
  assert.match(textOf(Buffer.from(html), 'text/html'), /補助対象経費×1\/2 → 上限20万円/);
});
