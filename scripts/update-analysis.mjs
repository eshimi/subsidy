// 補助金データの分析結果を、data/analysis-latest.json に保存する（分析レポート・地域×目的の空白のページは、これを読んで作る）。
//  ・自治体の制度（事業者向け・個人向け）、jGrants の詳細（data/jgrants-details.json）、地域×目的の空白：リポジトリのデータから毎回計算する
//  ・国の制度の全件（jGrants）：public/data/jgrants/ が取れているときだけ計算する。取れていないときは、前回の結果を引き継ぐ
// 使い方：node scripts/update-analysis.mjs（デプロイの build:grants と、毎朝の GitHub Actions で実行）。何度実行しても同じ結果（同じ日なら）。
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCAL_PROGRAMS } from '../src/data/local-programs.js';
import { RESIDENT_PROGRAMS } from '../src/data/resident-programs.js';
import { AREA_CITIES } from '../src/data/area-cities.js';
import { PREFECTURES } from '../src/data/prefectures.js';
import { loadGrants } from './build-grant-pages.mjs';
import { analyzeLocal, analyzeResident, analyzeDetails, analyzeJgrants, gapAnalysis, prefectureCounts, qualityOf } from './lib/analysis.mjs';
import { recentChanges } from './lib/program-history.mjs';
import { loadProgramHistory } from './update-research-history.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const ANALYSIS_FILE = join(ROOT, 'data', 'analysis-latest.json');
const DETAILS_FILE = join(ROOT, 'data', 'jgrants-details.json');
const jst = (t) => new Date(t + 9 * 3600e3).toISOString().slice(0, 10);

export function loadAnalysis(file = ANALYSIS_FILE) {
  try { return existsSync(file) ? JSON.parse(readFileSync(file, 'utf-8')) : null; } catch { return null; }
}

export function computeAnalysis({ now = Date.now(), grants = null, details = {}, previous = null, programHistory = null } = {}) {
  const local = analyzeLocal(LOCAL_PROGRAMS, now);
  local.pref = prefectureCounts(LOCAL_PROGRAMS, PREFECTURES);
  const resident = analyzeResident(RESIDENT_PROGRAMS, now);
  resident.pref = prefectureCounts(RESIDENT_PROGRAMS, PREFECTURES);
  const jgrants = grants ? { ...analyzeJgrants(grants, now), asOf: jst(now) } : (previous?.jgrants ?? null);
  return {
    version: 1,
    asOf: jst(now),
    local,
    resident,
    details: analyzeDetails(details),
    jgrants,
    quality: grants ? { ...qualityOf(grants, details, now), asOf: jst(now) } : (previous?.quality ?? null),
    changes: programHistory ? { ...recentChanges(programHistory, now), asOf: jst(now) } : (previous?.changes ?? null),
    gaps: gapAnalysis(LOCAL_PROGRAMS, AREA_CITIES, PREFECTURES),
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const details = existsSync(DETAILS_FILE) ? JSON.parse(readFileSync(DETAILS_FILE, 'utf-8')).items : {};
  const grants = loadGrants();
  const snapshot = computeAnalysis({ grants, details, previous: loadAnalysis(), programHistory: loadProgramHistory() });
  mkdirSync(dirname(ANALYSIS_FILE), { recursive: true });
  writeFileSync(ANALYSIS_FILE, `${JSON.stringify(snapshot)}\n`);
  console.log(`分析結果を保存：事業者向け${snapshot.local.n}件、住民向け${snapshot.resident.n}件、詳細${snapshot.details.n}件、国の制度の全件${snapshot.jgrants ? `${snapshot.jgrants.total}件（${snapshot.jgrants.asOf}）` : '（未取得）'}`);
}
