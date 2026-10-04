// 事業プロフィールと住所から、支援制度の該当可否と関連度スコアを計算する。
import { PROGRAMS } from './data/programs.js';
import { INDUSTRIES, TAGS, STAGES } from './data/taxonomy.js';

const LEVEL_BONUS = { municipality: 6, prefecture: 4, national: 0 };

function labelOf(key) {
  return INDUSTRIES[key]?.label ?? TAGS[key]?.label ?? key;
}

function fill(template, address) {
  if (typeof template !== 'string') return template;
  const city = address.city ? `${address.prefecture}${address.city}` : `${address.prefecture}内の市区町村`;
  return template.replaceAll('{pref}', address.prefecture).replaceAll('{city}', city);
}

function searchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

/**
 * @param {object} profile  { industries: string[], tags: string[], stage?: string }
 * @param {object} address  { prefecture: string, city?: string|null }
 */
export function matchPrograms(profile, address, programs = PROGRAMS) {
  const industries = new Set(profile.industries);
  const tags = new Set(profile.tags);
  const has = (key) => industries.has(key) || tags.has(key);
  const results = [];

  for (const p of programs) {
    if (p.prefectures && !p.prefectures.includes(address.prefecture)) continue;
    if (p.excludePrefectures?.includes(address.prefecture)) continue;
    if (profile.stage && p.stages && !p.stages.includes(profile.stage)) continue;
    if (p.industries !== 'all' && !p.industries.some((i) => industries.has(i))) continue;
    if (p.require && !p.require.every(has)) continue;

    const reasons = [];
    let score = p.priority ?? 0;

    if (p.prefectures) reasons.push(`${address.prefecture}の事業者向けの制度`);
    else if (p.level === 'municipality' || p.level === 'prefecture') reasons.push('お住まいの地域で実施されている可能性が高い制度');
    score += LEVEL_BONUS[p.level] ?? 0;

    if (p.industries !== 'all') {
      const hit = p.industries.filter((i) => industries.has(i));
      reasons.push(`業種「${hit.map(labelOf).join('・')}」が対象`);
      score += 20;
    } else {
      reasons.push('業種を問わず利用できる');
    }

    if (p.require) {
      reasons.push(`「${p.require.map(labelOf).join('・')}」に該当`);
      score += 10;
    }

    const boosts = (p.boost ?? []).filter(has);
    if (boosts.length) {
      reasons.push(`「${boosts.map(labelOf).join('・')}」と相性が良い`);
      score += boosts.length * 6;
    }

    if (profile.stage && p.stages) reasons.push(`事業ステージ「${STAGES[profile.stage]}」が対象`);

    results.push({
      id: p.id,
      name: fill(p.name, address),
      provider: fill(p.provider, address),
      level: p.level,
      type: p.type,
      amount: p.amount,
      summary: fill(p.summary, address),
      eligibility: (p.eligibility ?? []).map((e) => fill(e, address)),
      url: p.url ?? searchUrl(fill(p.searchQuery, address)),
      urlIsSearch: !p.url,
      score,
      reasons,
    });
  }

  return results.sort((a, b) => b.score - a.score);
}
