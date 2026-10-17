// 地域ページ（area/）の制度カードに、制度の詳しいページ（programs/）への「くわしい解説」のリンクを入れる（何度実行しても同じ結果になる）。
// 対象：data/program-details.json で、ページにできる中身がそろっている制度のカードだけ。公式の案内へのリンクは、そのまま残す。
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pageable } from './lib/program-detail.mjs';
import { loadState, liveIds } from './lib/program-source.mjs';

const ROOT = join(import.meta.dirname, '..');
const AREA = join(ROOT, 'public', 'area');
const MARK = '<!-- program-link -->';

export function applyLinks(html, ids) {
  let out = html.replace(/\n?\s*<!-- program-link -->[^\n]*<!-- \/program-link -->/g, '');
  return out.replace(/(<div class="area-program" id="([^"]+)">[\s\S]*?)(\n\s*<\/div>)/g, (m, inner, id, close) => {
    if (!ids.has(id)) return m;
    return `${inner}\n          ${MARK}<p class="area-more"><a href="../programs/${id}.html">この制度のくわしい解説（対象・申請の流れ・注意点） →</a></p><!-- /program-link -->${close}`;
  });
}

if (process.argv[1] === import.meta.filename) {
  const file = join(ROOT, 'data', 'program-details.json');
  const items = existsSync(file) ? JSON.parse(readFileSync(file, 'utf-8')).items : {};
  const ids = liveIds(items, loadState(), pageable, new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10));
  let changed = 0, linked = 0;
  for (const f of readdirSync(AREA).filter((x) => x.endsWith('.html'))) {
    const p = join(AREA, f);
    const before = readFileSync(p, 'utf-8');
    const after = applyLinks(before, ids);
    if (after !== before) { writeFileSync(p, after); changed++; }
    linked += (after.match(/program-link -->/g) || []).length / 2;
  }
  console.log(`地域ページ：${changed} ページを更新、制度ページへのリンク ${linked} 件`);
}
