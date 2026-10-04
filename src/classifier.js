// 事業内容テキストから業種・属性タグをキーワードで判定する（AIなしでも動く基本ロジック）。
import { INDUSTRIES, TAGS } from './data/taxonomy.js';

function normalize(text) {
  return text
    .normalize('NFKC')
    .toLowerCase();
}

function matches(text, keyword) {
  // 英字だけのキーワード（it, ai, ec など）は単語境界で判定して誤検出を防ぐ
  if (/^[a-z0-9&]+$/.test(keyword)) {
    return new RegExp(`(^|[^a-z0-9])${keyword.replace('&', '\\&')}([^a-z0-9]|$)`).test(text);
  }
  return text.includes(keyword);
}

function scan(text, dict) {
  const hits = {};
  for (const [key, { keywords }] of Object.entries(dict)) {
    const found = keywords.filter((k) => matches(text, k));
    if (found.length) hits[key] = found;
  }
  return hits;
}

export function classifyBusiness(description) {
  const text = normalize(description || '');
  const industryHits = scan(text, INDUSTRIES);
  const tagHits = scan(text, TAGS);
  return {
    industries: Object.keys(industryHits),
    tags: Object.keys(tagHits),
    evidence: { ...industryHits, ...tagHits },
  };
}
