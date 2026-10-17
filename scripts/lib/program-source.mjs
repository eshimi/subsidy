// 制度ガイド（自治体）の「公式ページの変化の検出」。公式ページを取り直し、材料（data/program-details.json）がまだ本文と合っているかを確かめる。
//  ・数字（金額・日付・電話番号など）と、材料の根拠にした引用（evidence）が、取り直した本文にまだあるか → なければ「要再確認」
//  ・「募集は終了しました」など、終了を示す表現が出ていないか → 出ていれば、ページを公開しない
//  ・取得できない（404 など）状態が続くとき → ページを公開しない
// 状態は data/program-source-state.json に残す。ページの生成（build-program-pages.mjs）と、地域ページのリンク（apply-program-links.mjs）が読む。
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { validate } from './program-detail.mjs';

const ENT = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', times: '×', rarr: '→', larr: '←', hellip: '…', ndash: '–', mdash: '—', yen: '¥', middot: '・', sim: '~', divide: '÷' };
export const STATE_FILE = join(import.meta.dirname, '..', '..', 'data', 'program-source-state.json');

// 取り直した本文から、材料との突き合わせに使うテキストを作る（ページ全体。ナビなども含めて、見つかりやすい側に倒す）
export function textOf(buf, contentType = '') {
  const bytes = Buffer.from(buf);
  let enc = (/charset=([\w-]+)/i.exec(contentType) || [])[1] || '';
  const head = bytes.subarray(0, 3000).toString('latin1');
  if (!enc) enc = (/<meta[^>]+charset=["']?([\w-]+)/i.exec(head) || [])[1] || 'utf-8';
  let raw;
  try { raw = new TextDecoder(enc.toLowerCase().replace('shift_jis', 'shift_jis')).decode(bytes); } catch { raw = bytes.toString('utf-8'); }
  return raw
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<\/(p|li|h\d|tr|div|dt|dd|section)>|<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&(nbsp|amp|lt|gt|quot|times|rarr|larr|hellip|ndash|mdash|yen|middot|sim|divide|#\d+|#x[0-9a-f]+);/gi, (m, e) => ENT[e.toLowerCase()] ?? (e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : m))
    .replace(/[ \t　]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
}

// 「予算に達した場合は終了する」のような一般的な注意ではなく、すでに終了したことを示す表現（ページ全体の数を数える）
export const ENDED_RE = /(募集|受付|申請)(期間)?(は|を)?[、,]?(すべて|全て)?(終了しました|終了いたしました|締め切りました|締切りました|終了となりました)|【(募集|受付|公募)?終了】|\[(募集|受付)?終了\]|受付終了のお知らせ/g;
const endedCount = (text) => (String(text).match(ENDED_RE) || []).length;

// 1件の検査。status は取得の結果（HTTP ステータス。取得できなければ 0）、text は取り直した本文
export function inspect(detail, status, text) {
  if (status !== 200) return { fetched: false, status };
  return { fetched: true, status, problems: validate(detail, text), endedCount: endedCount(text) };
}

// 前回の状態に、今回の検査の結果を重ねる。
// 終了を示す表現は、同じページにある別の制度や回ごとの記載でも出るため、「最初に確認したときより増えたか」で見る（増えたら要再確認）
export function nextState(prev = {}, r, date) {
  if (!r.fetched) {
    const gone = r.status === 404 || r.status === 410;
    return { ...prev, checkedAt: date, fail: (prev.fail || 0) + (gone ? 2 : 1), lastStatus: r.status };
  }
  const base = prev.endedBase === undefined ? r.endedCount : Math.min(prev.endedBase, r.endedCount);
  return { checkedAt: date, lastOk: date, fail: 0, lastStatus: 200, endedBase: base, endedSuspect: r.endedCount > base, problems: r.problems.slice(0, 5) };
}

export const loadState = (file = STATE_FILE) => {
  try { return existsSync(file) ? JSON.parse(readFileSync(file, 'utf-8')) : { version: 1, items: {} }; } catch { return { version: 1, items: {} }; }
};

// 申請期間の終わりが、今日より前か。申請期間（facts の「申請期間」）に書かれた日付を読み、いちばん遅い日が過去のときだけ true。
// 「随時」「予算」「予定」などの語があるとき、日付が読めないときは false（公開を続ける）。年のない日付（12月25日）は、直前の日付の年とみなす
export function periodExpired(detail, today) {
  const text = ((detail.facts || []).find((f) => f[0] === '申請期間') || [])[1] || '';
  if (!text || /随時|予算|なくなり次第|通年|予定|以降|から$/.test(text)) return false;
  const t = text.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
  const dates = [];
  let year = null, lastMonth = 0;
  for (const m of t.matchAll(/(?:令和\s*(\d+|元)\s*年|(20\d\d)\s*年)?\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/g)) {
    if (m[1]) year = 2018 + (m[1] === '元' ? 1 : Number(m[1]));
    else if (m[2]) year = Number(m[2]);
    else if (year !== null && Number(m[3]) < lastMonth) year += 1;
    if (year === null) continue;
    lastMonth = Number(m[3]);
    dates.push(`${year}-${String(m[3]).padStart(2, '0')}-${String(m[4]).padStart(2, '0')}`);
  }
  return dates.length > 0 && dates.sort().at(-1) < today;
}

// ページを公開しない状態か（取得できない状態が続いている／申請期間が終わっている）
export const isHidden = (s, detail, today) => (!!s && (s.fail || 0) >= 2) || (!!detail && !!today && periodExpired(detail, today));
// 公式ページの内容が、材料と合わなくなっている（または終了を示す表現が増えた）か。ページには注意書きを出す
export const needsReview = (s) => !!s && ((s.problems || []).length > 0 || s.endedSuspect === true);

// 公開するページの id（中身がそろっていて、公開を止めていないもの）
export function liveIds(details, state, pageable, today) {
  return new Set(Object.entries(details).filter(([id, d]) => pageable(d) && !isHidden((state.items || {})[id], d, today)).map(([id]) => id));
}
