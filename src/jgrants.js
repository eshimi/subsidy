// デジタル庁「jGrants」の公開APIから、現在募集中の補助金を検索する。
// https://developers.digital.go.jp/documents/jgrants/api/

import { cached } from './middleware.js';

const API_URL = 'https://api.jgrants-portal.go.jp/exp/v1/public/subsidies';
const DETAIL_URL = 'https://www.jgrants-portal.go.jp/subsidy/';

const CACHE_TTL_MS = 10 * 60 * 1000;

function searchOnce(keyword, prefecture, { fetchImpl, timeoutMs, cache }) {
  return cached(cache, `jgrants:${prefecture}:${keyword}`, CACHE_TTL_MS, () => fetchOnce(keyword, prefecture, { fetchImpl, timeoutMs }));
}

async function fetchOnce(keyword, prefecture, { fetchImpl, timeoutMs }) {
  const params = new URLSearchParams({
    keyword,
    sort: 'acceptance_end_datetime',
    order: 'ASC',
    acceptance: '1',
  });
  if (prefecture) params.set('target_area_search', prefecture);
  const res = await fetchImpl(`${API_URL}?${params}`, { signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`jGrants HTTP ${res.status}`);
  const body = await res.json();
  return body.result ?? [];
}

// 地域名が対象エリアに含まれるか（「全国」も対象とする）
function coversArea(item, prefecture) {
  const area = item.target_area_search || '';
  return !area || area.includes('全国') || area.includes(prefecture);
}

export async function searchJGrants(keywords, prefecture, { fetchImpl = fetch, timeoutMs = 6000, limit = 20, cache } = {}) {
  const unique = [...new Set(keywords.filter((k) => k && k.length >= 2))].slice(0, 4);
  const settled = await Promise.allSettled(
    unique.map((k) => searchOnce(k, prefecture, { fetchImpl, timeoutMs, cache })),
  );

  const failed = settled.filter((s) => s.status === 'rejected');
  if (unique.length && failed.length === unique.length) {
    return { available: false, items: [], error: failed[0].reason?.message };
  }

  const byId = new Map();
  settled.forEach((s, i) => {
    if (s.status !== 'fulfilled') return;
    for (const item of s.value) {
      if (!coversArea(item, prefecture)) continue;
      const entry = byId.get(item.id) ?? { item, matchedKeywords: [] };
      entry.matchedKeywords.push(unique[i]);
      byId.set(item.id, entry);
    }
  });

  const items = [...byId.values()]
    .sort((a, b) => b.matchedKeywords.length - a.matchedKeywords.length)
    .slice(0, limit)
    .map(({ item, matchedKeywords }) => ({
      id: `jgrants-${item.id}`,
      name: item.title || item.name,
      provider: 'jGrants 掲載（募集中）',
      level: 'live',
      type: '補助金',
      amount: item.subsidy_max_limit ? `上限 ${Number(item.subsidy_max_limit).toLocaleString('ja-JP')}円` : '公式ページで確認',
      area: item.target_area_search || '',
      deadline: item.acceptance_end_datetime || null,
      employees: item.target_number_of_employees || '',
      url: DETAIL_URL + item.id,
      reasons: [`jGrants で「${matchedKeywords.join('」「')}」に一致し、現在募集中`],
    }));

  return { available: true, items };
}
