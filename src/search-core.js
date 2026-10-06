// 検索のオーケストレーション: 住所解決 → 事業内容の解析 → 制度マッチング → jGrants 検索
// サーバー（search.js）と GitHub Pages 用の静的版（static/entry.js）で共有する。Node 専用の依存を持たないこと。
import { lookupPostalCode } from './postal.js';
import { classifyBusiness } from './classifier.js';
import { matchPrograms } from './matcher.js';
import { searchJGrants } from './jgrants.js';
import { rankGrants } from './jgrants-rank.js';
import { INDUSTRIES, TAGS, STAGES } from './data/taxonomy.js';

const ATTRIBUTE_TAGS = ['woman', 'young', 'senior', 'hiring', 'relocation', 'store'];

// 該当の強さ判定のしきい値
export const WEAK_MATCH_THRESHOLDS = {
  minPrograms: 3,      // この件数以下なら該当が弱い
  minAverageScore: 0.3, // 平均スコアがこの値以下なら弱い
};

export async function runSearchCore(input, deps = {}) {
  const description = String(input.description ?? '').trim();
  if (description.length < 5) {
    const err = new Error('事業内容をもう少し詳しく入力してください（5文字以上）');
    err.status = 400;
    throw err;
  }
  if (description.length > 2000) {
    const err = new Error('事業内容は2000文字以内で入力してください');
    err.status = 400;
    throw err;
  }
  const stage = Object.hasOwn(STAGES, input.stage) ? input.stage : undefined;
  const attributes = (Array.isArray(input.attributes) ? input.attributes : []).filter((a) => ATTRIBUTE_TAGS.includes(a));

  const [resolved, ai] = await Promise.all([
    lookupPostalCode(String(input.zip ?? ''), deps),
    deps.analyze ? deps.analyze(description) : null,
  ]);
  const address = { ...resolved }; // キャッシュされた住所オブジェクトを書き換えない
  if (input.city && typeof input.city === 'string' && !address.city) {
    address.city = input.city.trim().slice(0, 40) || null;
  }

  const rule = classifyBusiness(description);
  const industries = [...new Set([...rule.industries, ...(ai?.industries ?? [])])];
  const tags = [...new Set([...rule.tags, ...(ai?.tags ?? []), ...attributes])];
  const profile = { industries, tags, stage };

  const programs = matchPrograms(profile, address);

  const live = await findLiveGrants({ industries, tags, address, ai }, deps);

  // 該当の強さを判定
  const avgScore = programs.length > 0 ? programs.reduce((sum, p) => sum + (p.score ?? 0), 0) / programs.length : 0;
  const weakMatch = programs.length <= WEAK_MATCH_THRESHOLDS.minPrograms || avgScore <= WEAK_MATCH_THRESHOLDS.minAverageScore;

  return {
    address,
    analysis: {
      mode: ai ? 'ai' : 'keyword',
      summary: ai?.summary ?? null,
      industries: industries.map((k) => ({ key: k, label: INDUSTRIES[k].label })),
      tags: tags.map((k) => ({ key: k, label: TAGS[k].label })),
      stage: stage ? { key: stage, label: STAGES[stage] } : null,
    },
    programs,
    live,
    weakMatch,
    generatedAt: new Date().toISOString(),
  };
}

// 募集中の補助金: 毎日取り込んだ jGrants データがあれば関連度順に並べ、なければ jGrants API を直接検索する
async function findLiveGrants({ industries, tags, address, ai }, deps) {
  const dataset = deps.loadGrants ? await deps.loadGrants(address.prefecture).catch(() => null) : null;
  if (dataset?.available) {
    const ranked = rankGrants(dataset.items, { industries, tags, address });
    return { available: true, source: 'dataset', generatedAt: dataset.generatedAt, total: dataset.items.length, matched: ranked.matched, items: ranked.items };
  }
  if (deps.liveApi === false) return { available: false, items: [] };
  const keywords = ['創業', ...(ai?.searchKeywords ?? []), ...industries.slice(0, 2).map((k) => INDUSTRIES[k].label.split('・')[0])];
  return { ...(await searchJGrants(keywords, address.prefecture, deps)), source: 'api' };
}
