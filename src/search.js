// サーバー用の検索: 共通ロジックに Claude による解析（任意）を組み合わせる
import { runSearchCore } from './search-core.js';
import { analyzeWithClaude } from './ai.js';

export function runSearch(input, deps = {}) {
  return runSearchCore(input, { analyze: analyzeWithClaude, ...deps });
}
