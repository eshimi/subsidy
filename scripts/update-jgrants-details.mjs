// jGrants の制度の詳細を、差分で取り込んで data/jgrants-details.json を更新する（毎朝の GitHub Actions が実行する）。
// 前提：先に scripts/fetch-jgrants.mjs で、今の募集中の一覧（public/data/jgrants/）を取っておく。
// 使い方：node scripts/update-jgrants-details.mjs   （1回に取る件数の上限：環境変数 JGRANTS_DETAIL_BUDGET、既定 400）
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGrants } from './build-grant-pages.mjs';
import { syncDetails, serialize, loadCache, CACHE_FILE } from './lib/jgrants-detail.mjs';

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const grants = loadGrants();
  if (!grants) { console.log('今日の一覧が取れていないため、詳細の更新はスキップします（保存済みのデータはそのまま残します）'); process.exit(0); }
  const budget = Number(process.env.JGRANTS_DETAIL_BUDGET) || 400;
  const { cache, stats } = await syncDetails({ grants, cache: loadCache(), budget, log: console.log });
  mkdirSync(dirname(CACHE_FILE), { recursive: true });
  writeFileSync(CACHE_FILE, serialize(cache));
  console.log(`詳細の更新：一覧 ${stats.total}件／保存済みで変更なし ${stats.kept}件／今回取得 ${stats.fetched}件／失敗 ${stats.failed}件／次回以降に回す ${stats.pending}件／削除 ${stats.removed}件`);
}
