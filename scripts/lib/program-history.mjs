// 国の制度（jGrants）ごとの履歴：毎日の取得結果を前回と比べ、上限額・受付期間・名称・対象地域の変更を記録する（data/program-history.json）。
// 制度を「上書き」せず、いつ初めて見えたか・いつ何が変わったかを残す。変更は jGrants の掲載値の変化で、公式の公募要領での確認とは別。
const jst = (t) => new Date(t + 9 * 3600e3).toISOString().slice(0, 10);
export const FIELDS = { title: '制度名', start: '受付開始日', end: '締切日', max: '上限額', area: '対象地域' };
const ymd = (iso) => (iso && Number.isFinite(Date.parse(iso)) ? jst(Date.parse(iso)) : null);

// 履歴に残す、制度の状態
export const stateOf = (g) => ({
  title: g.title || null,
  start: ymd(g.start),
  end: ymd(g.end),
  max: typeof g.max === 'number' ? g.max : null,
  area: g.area || null,
});

export const emptyProgramHistory = () => ({ version: 1, programs: {} });

// grants を取り込んだ、新しい履歴を返す（同じ日に何度実行しても、同じ結果）。最初に見えた制度には変更を付けない
export function updateProgramHistory(hist, grants, now, { keepDays = 400, maxLog = 20 } = {}) {
  const date = jst(now);
  const programs = { ...(hist?.programs || {}) };
  const firstRun = Object.keys(programs).length === 0;
  for (const g of grants) {
    if (!g.id) continue;
    const s = stateOf(g);
    const prev = programs[g.id];
    if (!prev) { programs[g.id] = { first: date, last: date, s, log: [] }; continue; }
    const log = [...prev.log];
    for (const f of Object.keys(FIELDS)) {
      if (prev.s[f] !== s[f] && !log.some((l) => l.d === date && l.f === f && l.to === s[f])) log.push({ d: date, f, from: prev.s[f], to: s[f] });
    }
    programs[g.id] = { first: prev.first, last: date, s, log: log.slice(-maxLog) };
  }
  const cutoff = jst(now - keepDays * 86400000);
  for (const id of Object.keys(programs)) if (programs[id].last < cutoff) delete programs[id];
  return { version: 1, since: hist?.since || (firstRun ? date : hist?.since || date), programs };
}

// 直近 days 日の変更と、集計
export function recentChanges(hist, now, days = 30) {
  if (!hist || !hist.programs) return null;
  const from = jst(now - days * 86400000);
  const items = [];
  for (const [id, p] of Object.entries(hist.programs)) {
    for (const l of p.log) if (l.d >= from) items.push({ id, title: p.s.title, ...l });
  }
  items.sort((a, b) => b.d.localeCompare(a.d) || a.title?.localeCompare(b.title || '') || 0);
  const byField = Object.fromEntries(Object.keys(FIELDS).map((f) => [f, items.filter((i) => i.f === f).length]));
  const extended = items.filter((i) => i.f === 'end' && i.from && i.to && i.to > i.from).length;
  const maxUp = items.filter((i) => i.f === 'max' && typeof i.from === 'number' && typeof i.to === 'number' && i.to > i.from).length;
  const maxDown = items.filter((i) => i.f === 'max' && typeof i.from === 'number' && typeof i.to === 'number' && i.to < i.from).length;
  return {
    since: hist.since || null,
    tracked: Object.keys(hist.programs).length,
    days,
    n: items.length,
    programsChanged: new Set(items.map((i) => i.id)).size,
    byField, extended, maxUp, maxDown,
    items: items.slice(0, 60),
  };
}
