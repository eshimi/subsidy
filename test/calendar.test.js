import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildIcs, googleCalendarUrl, toJstDate } from '../public/calendar.js';

test('toJstDate: 日付文字列と UTC 日時を日本時間の日付にする', () => {
  assert.equal(toJstDate('2027-03-31'), '20270331');
  assert.equal(toJstDate('2026-11-30T15:30:00Z'), '20261201');
  assert.equal(toJstDate('invalid'), null);
  assert.equal(toJstDate(null), null);
});

test('buildIcs: 終日予定と7日前・前日の通知を含む', () => {
  const ics = buildIcs([{ id: 'x', name: '補助金A, 第1回; 特別枠', deadline: '2027-03-31', url: 'https://example.jp/a', provider: '札幌市' }], new Date('2026-10-04T00:00:00Z'));
  assert.match(ics, /^BEGIN:VCALENDAR\r\n/);
  assert.match(ics, /DTSTART;VALUE=DATE:20270331\r\n/);
  assert.match(ics, /DTEND;VALUE=DATE:20270401\r\n/);
  assert.match(ics, /SUMMARY:【締切】補助金A\\, 第1回\\\; 特別枠/);
  assert.equal((ics.match(/BEGIN:VALARM/g) || []).length, 2);
  assert.match(ics, /TRIGGER:-P7D/);
  for (const line of ics.split('\r\n')) assert.ok(new TextEncoder().encode(line).length <= 75, line);
});

test('buildIcs: 締切のない項目は含めない', () => {
  const ics = buildIcs([{ id: 'y', name: 'B' }]);
  assert.ok(!ics.includes('BEGIN:VEVENT'));
});

test('googleCalendarUrl: 終日予定のURLを作る', () => {
  const url = new URL(googleCalendarUrl({ id: 'x', name: '補助金A', deadline: '2026-12-25' }));
  assert.equal(url.searchParams.get('dates'), '20261225/20261226');
  assert.equal(url.searchParams.get('text'), '【締切】補助金A');
  assert.equal(googleCalendarUrl({ id: 'z', name: 'C' }), null);
});
