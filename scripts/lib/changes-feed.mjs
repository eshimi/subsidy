// マイページの「制度の変更の印」用のデータ。保存した制度に、公式の情報の更新があったかを知らせるために、
// 国の制度（jGrants の掲載値の変更、program-history.json）と、自治体の制度（公式ページの確認の結果、program-source-state.json）から作る。
import { FIELDS } from './program-history.mjs';
import { needsReview } from './program-source.mjs';

const yenJa = (n) => (typeof n === 'number' ? `${n.toLocaleString('ja-JP')}円` : '記載なし');
const show = (f, v) => (v === null || v === undefined || v === '' ? '記載なし' : f === 'max' ? yenJa(v) : String(v));

export const DAYS = 60;

// 戻り値：{ id: { d: 'YYYY-MM-DD', notes: ['締切日が変わりました：○ → ○', ...] } }。新しい変更の日付が d
export function buildChangesFeed({ history, sourceState }, today) {
  const from = new Date(Date.parse(`${today}T00:00:00Z`) - DAYS * 86400000).toISOString().slice(0, 10);
  const items = {};
  for (const [id, p] of Object.entries(history?.programs || {})) {
    const log = (p.log || []).filter((l) => l.d >= from && FIELDS[l.f]);
    if (!log.length) continue;
    items[id] = {
      d: log.map((l) => l.d).sort().at(-1),
      notes: log.map((l) => `${FIELDS[l.f]}が変わりました：${show(l.f, l.from)} → ${show(l.f, l.to)}`).slice(-4),
    };
  }
  // 自治体の制度：公式ページの内容が、確認した内容と合わなくなった・終了を示す表現が増えたもの
  for (const [pid, s] of Object.entries(sourceState?.items || {})) {
    if (!needsReview(s)) continue;
    items[`local-${pid}`] = { d: s.checkedAt || today, notes: ['公式ページの内容が、確認した内容と変わっている可能性があります。申請の前に、公式ページで確かめてください。'] };
  }
  return items;
}
