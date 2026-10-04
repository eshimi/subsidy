// 検索のオーケストレーション: 住所解決 → 事業内容の解析 → 制度マッチング → jGrants 検索
import { lookupPostalCode } from './postal.js';
import { classifyBusiness } from './classifier.js';
import { analyzeWithClaude } from './ai.js';
import { matchPrograms } from './matcher.js';
import { searchJGrants } from './jgrants.js';
import { INDUSTRIES, TAGS, STAGES } from './data/taxonomy.js';

const ATTRIBUTE_TAGS = ['woman', 'young', 'senior', 'hiring', 'relocation', 'store'];

export async function runSearch(input, deps = {}) {
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

  const [address, ai] = await Promise.all([
    lookupPostalCode(String(input.zip ?? ''), deps),
    (deps.analyze ?? analyzeWithClaude)(description),
  ]);
  if (input.city && typeof input.city === 'string' && !address.city) {
    address.city = input.city.trim().slice(0, 40) || null;
  }

  const rule = classifyBusiness(description);
  const industries = [...new Set([...rule.industries, ...(ai?.industries ?? [])])];
  const tags = [...new Set([...rule.tags, ...(ai?.tags ?? []), ...attributes])];
  const profile = { industries, tags, stage };

  const programs = matchPrograms(profile, address);

  const keywords = [
    '創業',
    ...(ai?.searchKeywords ?? []),
    ...industries.slice(0, 2).map((k) => INDUSTRIES[k].label.split('・')[0]),
  ];
  const live = await searchJGrants(keywords, address.prefecture, deps);

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
    generatedAt: new Date().toISOString(),
  };
}
