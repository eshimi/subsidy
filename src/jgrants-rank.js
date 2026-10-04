// jGrants から取り込んだ募集中の補助金を、事業内容・住所との関連度で並べ替える。
// サーバー版と静的版の両方で使う（ブラウザでも動くこと）。
import { INDUSTRIES, TAGS } from './data/taxonomy.js';
import { matches, normalize } from './classifier.js';

const DETAIL_URL = 'https://www.jgrants-portal.go.jp/subsidy/';
const STARTUP_WORDS = ['創業', '起業', '開業', 'スタートアップ', '新規事業', '第二創業', '新事業'];
const SMALL_BIZ_WORDS = ['小規模', '中小企業', '個人事業'];

// 「札幌市中央区」→「札幌市」、「渋谷区」→「渋谷区」のように、市区町村名の主要部分を取り出す
export function cityCore(city) {
  if (!city) return null;
  const m = city.match(/^(.+?[市区町村])/);
  return m ? m[1] : city;
}

// タイトルの先頭にある自治体名（例:「【八王子市】」「福岡市〇〇補助金」）を取り出す
const NOT_MUNICIPALITY = ['都市', '市場', '市民', '地区', '区分', '町内', '村落'];
export function leadingMunicipality(title) {
  const m = title.match(/^[【［\[（(「]?\s*([^\s【】［\]\[（）()「」・、]{1,7}?[市区町村])/);
  if (!m || NOT_MUNICIPALITY.some((w) => m[1].endsWith(w))) return null;
  return m[1];
}

function formatAmount(max) {
  if (!max) return '公式ページで確認';
  if (max >= 1e8) return `上限 ${(max / 1e8).toLocaleString('ja-JP', { maximumFractionDigits: 2 })}億円`;
  if (max >= 1e4) return `上限 ${Math.round(max / 1e4).toLocaleString('ja-JP')}万円`;
  return `上限 ${max.toLocaleString('ja-JP')}円`;
}

const hits = (title, words) => {
  const t = normalize(title);
  return words.filter((w) => matches(t, w.toLowerCase()));
};

/**
 * @param {Array} items  normalize 済みの jGrants データ
 * @param {object} ctx   { industries, tags, address: { prefecture, city } }
 */
export function rankGrants(items, { industries = [], tags = [], address }, { limit = 20 } = {}) {
  const core = cityCore(address.city);
  const ward = address.city && core !== address.city ? address.city.slice(core.length) : null;
  const scored = [];

  for (const item of items) {
    const title = item.title;
    const reasons = [];
    let score = 0;

    // 別の市区町村の制度は除外する（市区町村がわからない場合は注意書きを付けて残す）
    const muni = leadingMunicipality(title);
    const ownCity = core && (muni === core || muni === ward);
    if (muni && core && !ownCity) continue;
    if (muni && !core) {
      score -= 5;
      reasons.push(`※${muni}の制度です。対象地域を確認してください`);
    }
    if (core && (title.includes(core) || (ward && title.includes(ward)))) {
      score += 40;
      reasons.push(`${core}の制度`);
    } else if (item.area && !item.area.includes('全国') && item.area.includes(address.prefecture)) {
      score += 10;
      reasons.push(`${address.prefecture}が対象地域`);
    }

    const startup = hits(title, STARTUP_WORDS);
    if (startup.length) {
      score += 25;
      reasons.push('創業・新規事業向け');
    }
    for (const key of industries) {
      const h = hits(title, INDUSTRIES[key]?.keywords ?? []);
      if (h.length) {
        score += 20;
        reasons.push(`業種「${INDUSTRIES[key].label}」に関連`);
      }
    }
    for (const key of tags) {
      const h = hits(title, TAGS[key]?.keywords ?? []);
      if (h.length) {
        score += 12;
        reasons.push(`「${TAGS[key].label}」に関連`);
      }
    }
    if (hits(title, SMALL_BIZ_WORDS).length) score += 3;
    if (score <= 0) continue;

    scored.push({ item, score, reasons });
  }

  scored.sort((a, b) => b.score - a.score || String(a.item.end ?? '').localeCompare(String(b.item.end ?? '')));
  return {
    matched: scored.length,
    items: scored.slice(0, limit).map(({ item, reasons }) => ({
      id: `jgrants-${item.id}`,
      name: item.title,
      provider: 'jGrants 掲載（募集中）',
      level: 'live',
      type: '補助金',
      amount: formatAmount(item.max),
      area: item.area,
      deadline: item.end,
      employees: item.employees,
      url: DETAIL_URL + item.id,
      reasons,
    })),
  };
}
