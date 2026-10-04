// 締切リマインド用のカレンダーデータ生成（ブラウザと Node のテストの両方で使う）。

// ISO 日時または YYYY-MM-DD を、日本時間の日付 YYYYMMDD に変換する
export function toJstDate(value) {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value.replaceAll('-', '');
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10).replaceAll('-', '');
}

function nextDay(yyyymmdd) {
  const d = new Date(Date.UTC(+yyyymmdd.slice(0, 4), +yyyymmdd.slice(4, 6) - 1, +yyyymmdd.slice(6, 8) + 1));
  return d.toISOString().slice(0, 10).replaceAll('-', '');
}

// RFC 5545 のテキストエスケープ
function icsText(s) {
  return String(s ?? '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

// 75オクテットを超える行を折り返す（UTF-8 のマルチバイト文字を分割しない）
function fold(line) {
  const out = [];
  let cur = '';
  let bytes = 0;
  for (const ch of line) {
    const len = new TextEncoder().encode(ch).length;
    if (bytes + len > (out.length ? 74 : 75)) {
      out.push(cur);
      cur = '';
      bytes = 0;
    }
    cur += ch;
    bytes += len;
  }
  out.push(cur);
  return out.join('\r\n ');
}

function stamp(now) {
  return now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * 締切を終日予定にした .ics を作る。7日前と前日に通知する。
 * @param {Array<{id:string,name:string,deadline:string,url?:string,provider?:string}>} items
 */
export function buildIcs(items, now = new Date()) {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//subsidy-finder//JA', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
  for (const item of items) {
    const date = toJstDate(item.deadline);
    if (!date) continue;
    lines.push(
      'BEGIN:VEVENT',
      `UID:${item.id}-${date}@subsidy-finder`,
      `DTSTAMP:${stamp(now)}`,
      `DTSTART;VALUE=DATE:${date}`,
      `DTEND;VALUE=DATE:${nextDay(date)}`,
      `SUMMARY:${icsText(`【締切】${item.name}`)}`,
      `DESCRIPTION:${icsText([item.provider, item.url, '※締切時刻・最新の要件は公式情報で確認してください'].filter(Boolean).join('\n'))}`,
      ...(item.url ? [`URL:${item.url}`] : []),
      'BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:-P7D', `DESCRIPTION:${icsText(`締切まであと7日：${item.name}`)}`, 'END:VALARM',
      'BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:-P1D', `DESCRIPTION:${icsText(`締切は明日：${item.name}`)}`, 'END:VALARM',
      'END:VEVENT',
    );
  }
  lines.push('END:VCALENDAR');
  return lines.map(fold).join('\r\n') + '\r\n';
}

export function googleCalendarUrl(item) {
  const date = toJstDate(item.deadline);
  if (!date) return null;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `【締切】${item.name}`,
    dates: `${date}/${nextDay(date)}`,
    details: [item.provider, item.url, '※締切時刻・最新の要件は公式情報で確認してください'].filter(Boolean).join('\n'),
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
