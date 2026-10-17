// 補助金データの集計（純粋な関数）。「補助金データ」コーナーの分析レポート・月次レポート・地域×目的の空白で使う。
// 入力は、当サイトの掲載データ（自治体の制度）と、jGrants の取り込みデータ。外部のデータは読まない。
const DAY = 86400000;

export const count = (list, f) => {
  const m = new Map();
  for (const x of list) for (const k of [].concat(f(x))) if (k != null && k !== '') m.set(k, (m.get(k) || 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]), 'ja'));
};

// ── 金額 ──
// 説明文の「○円」「○万円」「○億円」から、文中の最大値を取り出す（円）。なければ null
export function yen(s) {
  let best = null;
  for (const m of String(s ?? '').matchAll(/(\d[\d,]*(?:\.\d+)?)\s*(億|万)?円/g)) {
    let v = Number(m[1].replace(/,/g, ''));
    if (m[2] === '万') v *= 1e4;
    if (m[2] === '億') v *= 1e8;
    if (best === null || v > best) best = v;
  }
  return best;
}

export const AMOUNT_BANDS = ['10万円未満', '10〜50万円', '50〜100万円', '100〜500万円', '500万円以上'];
export const NO_AMOUNT = '金額の記載なし／率のみ';
export function amountBand(v) {
  if (v === null || v === undefined) return NO_AMOUNT;
  return v < 1e5 ? AMOUNT_BANDS[0] : v < 5e5 ? AMOUNT_BANDS[1] : v < 1e6 ? AMOUNT_BANDS[2] : v < 5e6 ? AMOUNT_BANDS[3] : AMOUNT_BANDS[4];
}
export const bandCounts = (list, valueOf = (x) => yen(x.amount)) => [...AMOUNT_BANDS, NO_AMOUNT].map((b) => [b, list.filter((x) => amountBand(valueOf(x)) === b).length]);

export function quantile(values, p) {
  const a = values.filter((v) => v !== null && v !== undefined && Number.isFinite(v)).sort((x, y) => x - y);
  return a.length ? a[Math.floor((a.length - 1) * p)] : null;
}

// ── 締切 ──
const dayDiff = (iso, now) => Math.round((Date.parse(`${iso}T00:00:00+09:00`) - now) / DAY);
export function deadlineBuckets(list, now) {
  const ds = list.filter((x) => x.deadline && /^\d{4}-\d{2}-\d{2}/.test(x.deadline)).map((x) => dayDiff(x.deadline.slice(0, 10), now));
  return {
    withDeadline: ds.length,
    expired: ds.filter((d) => d < 0).length,
    d30: ds.filter((d) => d >= 0 && d <= 30).length,
    d60: ds.filter((d) => d > 30 && d <= 60).length,
    d90: ds.filter((d) => d > 60 && d <= 90).length,
    d180: ds.filter((d) => d > 90 && d <= 180).length,
    later: ds.filter((d) => d > 180).length,
  };
}
export const deadlineMonths = (list) => count(list.filter((x) => x.deadline && /^\d{4}-\d{2}/.test(x.deadline)), (x) => x.deadline.slice(0, 7)).sort((a, b) => a[0].localeCompare(b[0]));

// 年度末（12〜3月）に締切がある制度の数
export const monthSum = (months, from, to) => months.filter(([m]) => m >= from && m <= to).reduce((t, [, v]) => t + v, 0);

// ── 目的（分類のない制度は、名前と説明から推定する） ──
export const CATS = ['創業・起業', '空き店舗・商店街', '設備投資・省エネ', '人材・雇用', 'IT・デジタル', '販路開拓・PR', '事業承継', '研究開発・新事業', '融資・利子補給'];
const CAT_RULES = [
  ['創業・起業', /創業|起業|開業/],
  ['空き店舗・商店街', /空き店舗|商店街|出店/],
  ['設備投資・省エネ', /設備|機械|機器|省エネ|脱炭素|再エネ|太陽光/],
  ['人材・雇用', /雇用|人材|採用|就労|賃上げ|従業員/],
  ['IT・デジタル', /DX|デジタル|IT|ＩＴ|システム|ホームページ|EC/],
  ['販路開拓・PR', /販路|展示会|見本市|PR|プロモーション|輸出|海外/],
  ['事業承継', /承継|後継/],
  ['研究開発・新事業', /研究|開発|新製品|新技術|新事業/],
];
export function catOf(p) {
  if (p.cat && p.cat !== 'その他' && CATS.includes(p.cat)) return p.cat;
  if (p.type === '融資') return '融資・利子補給';
  const text = `${p.name ?? ''}${p.summary ?? ''}`;
  for (const [c, re] of CAT_RULES) if (re.test(text)) return c;
  return 'その他';
}

export const STAGE_KEYS = ['planning', 'early', 'established'];
export const STAGE_LABEL = { planning: '開業準備中', early: '開業後1年未満', established: '開業後1年以上' };

// ── 事業者向け（自治体） ──
export function analyzeLocal(L, now) {
  const nonLoan = L.filter((x) => x.type !== '融資');
  const amounts = nonLoan.map((x) => yen(x.amount));
  const withAmount = amounts.filter((v) => v !== null);
  const months = deadlineMonths(L);
  const cats = count(L, (x) => x.cat || '（未分類）');
  const stageCat = count(L, (x) => x.cat).map(([c]) => [c, ...STAGE_KEYS.map((s) => L.filter((x) => x.cat === c && (x.stages || []).includes(s)).length), L.filter((x) => x.cat === c).length]).filter((r) => r[0] !== 'その他');
  const levelOf = (x) => (x.level === 'prefecture' ? 'prefecture' : 'municipality');
  return {
    n: L.length,
    type: count(L, (x) => x.type),
    level: count(L, levelOf),
    typeByLevel: ['prefecture', 'municipality'].map((lv) => [lv, L.filter((x) => levelOf(x) === lv).length, L.filter((x) => levelOf(x) === lv && x.type === '融資').length]),
    cat: cats.filter(([k]) => k !== '（未分類）'),
    unclassified: (cats.find(([k]) => k === '（未分類）') || [, 0])[1],
    stageCat,
    stageTotals: STAGE_KEYS.map((s) => [s, L.filter((x) => (x.stages || []).includes(s)).length]),
    allIndustries: L.filter((x) => x.industries === 'all').length,
    industries: count(L.filter((x) => x.industries !== 'all'), (x) => x.industries),
    nonLoanN: nonLoan.length,
    amountBand: bandCounts(nonLoan),
    withAmountN: withAmount.length,
    quartiles: [0.25, 0.5, 0.75].map((p) => quantile(amounts, p)),
    over100: withAmount.filter((v) => v >= 1e6).length,
    under50: withAmount.filter((v) => v < 5e5).length,
    loanMedian: quantile(L.filter((x) => x.type === '融資').map((x) => yen(x.amount)), 0.5),
    pref: null, // 都道府県別は prefectureCounts で付ける
    months,
    near: deadlineBuckets(L, now),
    noDeadline: L.length - deadlineBuckets(L, now).withDeadline,
    noAmount: nonLoan.length - withAmount.length,
  };
}

// 都道府県別の件数（県の制度・市区町村の制度）
export function prefectureCounts(L, prefectures) {
  return prefectures.map((p) => {
    const l = L.filter((x) => x.prefectures?.includes(p));
    const pref = l.filter((x) => x.level === 'prefecture').length;
    const grantish = l.filter((x) => ['補助金', '助成金', '給付金', '給付'].includes(x.type)).length;
    return { pref: p, total: l.length, prefLevel: pref, muni: l.length - pref, grantShare: l.length ? Math.round((grantish / l.length) * 100) : null };
  });
}

// ── 住民向け ──
export function analyzeResident(R, now) {
  const amounts = (list) => list.map((x) => yen(x.amount));
  const cats = count(R, (x) => x.category);
  const months = deadlineMonths(R);
  const near = deadlineBuckets(R, now);
  return {
    n: R.length,
    category: cats,
    type: count(R, (x) => x.type),
    level: count(R, (x) => (x.level === 'prefecture' ? 'prefecture' : 'municipality')),
    median: cats.map(([c]) => [c, quantile(amounts(R.filter((x) => x.category === c)), 0.5)]).filter(([, v]) => v !== null).sort((a, b) => b[1] - a[1]),
    amountBand: bandCounts(R),
    months,
    near,
    noDeadline: R.length - near.withDeadline,
    noAmount: R.filter((x) => yen(x.amount) === null).length,
  };
}

// ── jGrants の詳細（data/jgrants-details.json の items） ──
const z2h = (s) => String(s).replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 65248)).replace(/／/g, '/');
export function rateClass(r) {
  if (!r) return '記載なし';
  const s = z2h(r);
  const hasFrac = /\d\/\d/.test(s);
  if (!hasFrac && /定額/.test(s)) return '定額・上限額方式';
  if (!hasFrac && /公募要領|参照|ご確認|別途|上限/.test(s)) return '公募要領を参照';
  if (/10\/10|全額|100%/.test(s)) return '10/10（全額）';
  if (/3\/4|4\/5|75%|80%|5\/6/.test(s)) return '3/4以上';
  if (/2\/3|66%/.test(s)) return '2/3';
  if (/1\/2|50%/.test(s)) return '1/2';
  if (/1\/3|1\/4/.test(s)) return '1/3以下';
  return 'その他';
}

export function analyzeDetails(items) {
  const D = Object.values(items || {});
  const split = (s, re) => String(s || '').split(re).map((x) => x.trim()).filter(Boolean);
  const indN = D.map((x) => split(x.industry, /[、,/]/).length);
  const pn = D.map((x) => split(x.purpose, / \/ /).length);
  const ends = count(D.filter((x) => x.projectEnd), (x) => String(x.projectEnd).slice(0, 7)).sort((a, b) => a[0].localeCompare(b[0]));
  return {
    n: D.length,
    purpose: count(D, (x) => split(x.purpose, / \/ /)),
    singlePurpose: count(D.filter((x) => x.purpose && !x.purpose.includes(' / ')), (x) => x.purpose),
    purposeBreadth: { one: pn.filter((k) => k === 1).length, few: pn.filter((k) => k >= 2 && k <= 3).length, many: pn.filter((k) => k >= 4).length },
    rateClass: count(D, (x) => rateClass(x.rate)),
    industryBreadth: { wide: indN.filter((k) => k >= 15).length, mid: indN.filter((k) => k >= 4 && k < 15).length, narrow: indN.filter((k) => k >= 1 && k < 4).length },
    projectEnd: ends,
    projectEndN: ends.reduce((t, [, v]) => t + v, 0),
  };
}

// ── jGrants の募集中の全件（fetch-jgrants の正規化済みデータ：{id,title,area,max,start,end,employees}） ──
export function analyzeJgrants(grants, now) {
  const open = grants.filter((g) => g.end && Date.parse(g.end) >= now);
  const national = (g) => !g.area || String(g.area).includes('全国');
  const maxes = open.map((g) => g.max);
  const bandOf = (v) => (v === null || v === undefined ? '上限額の記載なし' : v < 1e6 ? '100万円未満' : v < 5e6 ? '100〜500万円' : v < 1e7 ? '500〜1,000万円' : v < 1e8 ? '1,000万円〜1億円' : '1億円以上');
  const bandOrder = ['100万円未満', '100〜500万円', '500〜1,000万円', '1,000万円〜1億円', '1億円以上', '上限額の記載なし'];
  const span = open.filter((g) => g.start).map((g) => Math.round((Date.parse(g.end) - Date.parse(g.start)) / DAY));
  const left = open.map((g) => Math.ceil((Date.parse(g.end) - now) / DAY));
  const bucket = (arr, edges, labels) => labels.map((l, i) => [l, arr.filter((d) => d >= (edges[i - 1] ?? -Infinity) + (i ? 1 : 0) && d <= (edges[i] ?? Infinity)).length]);
  return {
    total: open.length,
    national: open.filter(national).length,
    maxBand: bandOrder.map((b) => [b, open.filter((g) => bandOf(g.max) === b).length]),
    maxMedian: quantile(maxes, 0.5),
    maxN: maxes.filter((v) => v !== null && v !== undefined).length,
    spanDays: bucket(span, [30, 60, 90, 180], ['30日以内', '31〜60日', '61〜90日', '91〜180日', '181日以上']),
    spanMedian: quantile(span, 0.5),
    leftDays: bucket(left, [14, 30, 60, 90], ['14日以内', '15〜30日', '31〜60日', '61〜90日', '91日以上']),
    employees: count(open, (g) => g.employees || '記載なし').slice(0, 6),
  };
}

// ── 地域×目的の空白 ──
// 各市区町村について、目的ごとに「その市区町村の独自制度」「その県の制度」が収録されているかを数える。
export function gapAnalysis(L, cities, prefectures) {
  const biz = L.map((p) => ({ p, cat: catOf(p) }));
  const by = (city, cat) => ({
    city: biz.filter((x) => x.cat === cat && x.p.level !== 'prefecture' && x.p.cities?.includes(city.name)).length,
    pref: biz.filter((x) => x.cat === cat && x.p.level === 'prefecture' && x.p.prefectures?.includes(city.pref)).length,
  });
  const cells = cities.map((c) => ({ c, v: Object.fromEntries(CATS.map((cat) => [cat, by(c, cat)])) }));
  const cats = CATS.map((cat) => ({
    cat,
    cityLevel: cells.filter((x) => x.v[cat].city > 0).length,
    withPref: cells.filter((x) => x.v[cat].city > 0 || x.v[cat].pref > 0).length,
    none: cells.filter((x) => x.v[cat].city === 0 && x.v[cat].pref === 0).length,
  }));
  const byPref = prefectures.map((pref) => {
    const cs = cells.filter((x) => x.c.pref === pref);
    return { pref, cities: cs.length, cat: Object.fromEntries(CATS.map((cat) => [cat, cs.filter((x) => x.v[cat].city > 0).length])) };
  }).filter((r) => r.cities);
  // 目的ごとに、市区町村の独自制度が収録されていない市区町村（県ごと）
  const missing = Object.fromEntries(CATS.map((cat) => [cat, prefectures.map((pref) => [pref, cells.filter((x) => x.c.pref === pref && x.v[cat].city === 0).map((x) => x.c.name)]).filter(([, names]) => names.length)]));
  const noCityProgram = cells.filter((x) => CATS.every((cat) => x.v[cat].city === 0)).map((x) => x.c.name);
  return { cityN: cities.length, cats, byPref, missing, noCityProgram };
}

// ── 月次（data/research-history.json の days） ──
export function monthlyReport(days) {
  const byMonth = new Map();
  for (const d of days || []) {
    const m = d.date.slice(0, 7);
    if (!byMonth.has(m)) byMonth.set(m, []);
    byMonth.get(m).push(d);
  }
  const avg = (a) => (a.length ? Math.round(a.reduce((t, v) => t + v, 0) / a.length) : null);
  const sum = (a) => a.filter((v) => typeof v === 'number').reduce((t, v) => t + v, 0);
  return [...byMonth.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([month, ds]) => {
    ds = [...ds].sort((a, b) => a.date.localeCompare(b.date));
    const totals = ds.map((d) => d.total);
    const diffDays = ds.filter((d) => typeof d.added === 'number');
    return {
      month,
      days: ds.length,
      first: ds[0], last: ds[ds.length - 1],
      avgTotal: avg(totals), minTotal: Math.min(...totals), maxTotal: Math.max(...totals),
      avgSoon30: avg(ds.map((d) => d.soon30)), avgNational: avg(ds.map((d) => d.national)),
      added: diffDays.length ? sum(diffDays.map((d) => d.added)) : null,
      removed: diffDays.length ? sum(diffDays.map((d) => d.removed)) : null,
      diffDays: diffDays.length,
      daily: ds.map((d) => ({ date: d.date, total: d.total })),
    };
  });
}

// ID の一覧の差：前回あった ID が今回なければ「募集終了」、前回なくて今回あれば「新規掲載」
export function diffIds(prevIds, ids) {
  const prev = new Set(prevIds);
  const cur = new Set(ids);
  return { added: ids.filter((id) => !prev.has(id)).length, removed: prevIds.filter((id) => !cur.has(id)).length };
}

// ── データの品質（国の制度 jGrants） ──
// grants：取得した制度、details：data/jgrants-details.json の items（制度ごとの詳細）。公式の公募要領での確認とは別に、取得した項目がそろっているかを数える。
export function qualityOf(grants, details, now) {
  const listed = grants.length;
  const open = grants.filter((g) => g.end && Date.parse(g.end) >= now);
  const expired = grants.filter((g) => g.end && Date.parse(g.end) < now).length;
  const det = (g) => (details || {})[g.id];
  const rate = (k, pred) => { const c = open.filter(pred).length; return { key: k, n: c, rate: open.length ? Math.round((c / open.length) * 1000) / 10 : 0 }; };
  const fresh = (g) => { const f = det(g)?.fetchedAt; return !!f && now - Date.parse(f) <= 30 * DAY; };
  const norm = (t) => String(t || '').replace(/[\s　【】「」『』（）()]/g, '').toLowerCase();
  const groups = new Map();
  for (const g of open) { const k = norm(g.title); if (k) groups.set(k, [...(groups.get(k) || []), g.id]); }
  const dup = [...groups.values()].filter((v) => v.length > 1);
  const metrics = [
    rate('end', (g) => !!g.end),
    rate('start', (g) => !!g.start),
    rate('max', (g) => typeof g.max === 'number'),
    rate('detail', (g) => !!det(g)),
    rate('rate', (g) => !!det(g)?.rate),
    rate('purpose', (g) => !!det(g)?.purpose),
    rate('fresh', fresh),
  ];
  return { listed, open: open.length, expired, expiredRate: listed ? Math.round((expired / listed) * 1000) / 10 : 0, dupGroups: dup.length, dupItems: dup.reduce((t, v) => t + v.length, 0), metrics };
}
