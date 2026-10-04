// 郵便番号 → 住所の解決。zipcloud API を使い、通信できない場合は
// 郵便番号の上3桁から都道府県だけを推定する。
import { cached } from './middleware.js';

const ZIPCLOUD_URL = 'https://zipcloud.ibsnet.co.jp/api/search';

// 郵便番号上3桁の範囲 → 都道府県（[開始, 終了, 都道府県]）
const PREFIX_RANGES = [
  [1, 9, '北海道'], [10, 19, '秋田県'], [20, 29, '岩手県'], [30, 39, '青森県'],
  [40, 99, '北海道'], [100, 209, '東京都'], [210, 259, '神奈川県'], [260, 299, '千葉県'],
  [300, 319, '茨城県'], [320, 329, '栃木県'], [330, 369, '埼玉県'], [370, 379, '群馬県'],
  [380, 399, '長野県'], [400, 409, '山梨県'], [410, 439, '静岡県'], [440, 499, '愛知県'],
  [500, 509, '岐阜県'], [510, 519, '三重県'], [520, 529, '滋賀県'], [530, 599, '大阪府'],
  [600, 629, '京都府'], [630, 639, '奈良県'], [640, 649, '和歌山県'], [650, 679, '兵庫県'],
  [680, 689, '鳥取県'], [690, 699, '島根県'], [700, 719, '岡山県'], [720, 739, '広島県'],
  [740, 759, '山口県'], [760, 769, '香川県'], [770, 779, '徳島県'], [780, 789, '高知県'],
  [790, 799, '愛媛県'], [800, 839, '福岡県'], [840, 849, '佐賀県'], [850, 859, '長崎県'],
  [860, 869, '熊本県'], [870, 879, '大分県'], [880, 889, '宮崎県'], [890, 899, '鹿児島県'],
  [900, 909, '沖縄県'], [910, 919, '福井県'], [920, 929, '石川県'], [930, 939, '富山県'],
  [940, 959, '新潟県'], [960, 979, '福島県'], [980, 989, '宮城県'], [990, 999, '山形県'],
];

export function normalizeZip(input) {
  if (typeof input !== 'string') return null;
  const digits = input
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[^0-9]/g, '');
  return digits.length === 7 ? digits : null;
}

export function guessPrefecture(zip) {
  const head = Number(zip.slice(0, 3));
  const hit = PREFIX_RANGES.find(([from, to]) => head >= from && head <= to);
  return hit ? hit[2] : null;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export async function lookupPostalCode(rawZip, { fetchImpl = fetch, timeoutMs = 5000, cache } = {}) {
  const zip = normalizeZip(rawZip);
  if (!zip) {
    const err = new Error('郵便番号は7桁の数字で入力してください');
    err.status = 400;
    throw err;
  }

  // 実際に取得できた住所のみ1日キャッシュする（推定結果はキャッシュしない）
  return cached(cache, `zip:${zip}`, DAY_MS, () => fetchAddress(zip, fetchImpl, timeoutMs), (r) => r.source === 'zipcloud');
}

async function fetchAddress(zip, fetchImpl, timeoutMs) {
  try {
    const res = await fetchImpl(`${ZIPCLOUD_URL}?zipcode=${zip}`, { signal: AbortSignal.timeout(timeoutMs) });
    if (!res.ok) throw new Error(`zipcloud HTTP ${res.status}`);
    const body = await res.json();
    const r = body.results?.[0];
    if (r) {
      return {
        zip,
        prefecture: r.address1,
        city: r.address2,
        town: r.address3,
        source: 'zipcloud',
      };
    }
    if (body.status === 200) {
      const err = new Error('該当する住所が見つかりませんでした');
      err.status = 404;
      throw err;
    }
    throw new Error(body.message || 'zipcloud error');
  } catch (e) {
    if (e.status === 404) throw e;
    const prefecture = guessPrefecture(zip);
    if (!prefecture) {
      const err = new Error('住所を特定できませんでした');
      err.status = 404;
      throw err;
    }
    return { zip, prefecture, city: null, town: null, source: 'estimated' };
  }
}
