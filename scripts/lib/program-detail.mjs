// 自治体の制度の「詳しいページ」の材料（data/program-details.json）の形と、検証。
// 材料は、公式ページの本文から読み取った事実だけを書く。数字（金額・割合・日付・電話番号など）は、必ず公式ページの本文にあるものだけを許す。
// 検証は、公式ページの本文（取得したテキスト）に対して行う：数字の突き合わせ、evidence（本文からの引用）が本文にあること。

export const FACT_LABELS = ['補助額・補助率', '対象者', '対象事業・経費', '申請期間', '窓口'];
export const LIMITS = { eligible: 8, expenses: 10, excluded: 8, flow: 8, docs: 10, cautions: 8, evidence: 8 };
export const LISTS = ['eligible', 'expenses', 'excluded', 'flow', 'docs', 'cautions'];

// 全角の数字・記号を半角にし、空白・カンマ・改行を除いた形（突き合わせ用）
export function norm(s) {
  return String(s || '')
    .replace(/[０-９Ａ-Ｚａ-ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[－―ー−‐‑–—]/g, '-').replace(/[〜～]/g, '~')
    .replace(/[\s　,，、。・･]/g, '');
}

// 文字列の中の数字（2桁以上、または 万・億・％ などの単位つき）を取り出す
export function numbersIn(text) {
  const t = norm(text);
  const out = new Set();
  for (const m of t.matchAll(/\d[\d.]*/g)) {
    const n = m[0].replace(/\.$/, '');
    const rest = t.slice(m.index + m[0].length, m.index + m[0].length + 1);
    if (n.replace('.', '').length >= 2 || /[万億千%％割]/.test(rest)) out.add(n);
  }
  return [...out];
}

const strs = (d) => [d.lead, d.contact, ...(d.facts || []).flatMap((f) => [f[1]]), ...LISTS.flatMap((k) => d[k] || [])].filter(Boolean);

// 1件の材料を検証する。source は公式ページの本文。戻り値は問題の一覧（空なら合格）
export function validate(d, source) {
  const problems = [];
  const src = norm(source);
  if (d.status === 'skip') return d.reason ? [] : ['skip には reason が必要'];
  if (d.status !== 'ok') return ['status が ok / skip ではない'];
  if (!d.lead || d.lead.length > 140) problems.push('lead がない、または長すぎる');
  for (const f of d.facts || []) if (!FACT_LABELS.includes(f[0])) problems.push(`facts のラベルが不正：${f[0]}`);
  for (const k of LISTS) {
    if ((d[k] || []).length > LIMITS[k]) problems.push(`${k} が多すぎる`);
    for (const s of d[k] || []) if (s.length > 140) problems.push(`${k} の1行が長い：${s.slice(0, 20)}…`);
  }
  const ev = d.evidence || [];
  if (ev.length < 3) problems.push('evidence（本文からの引用）が3つ未満');
  for (const e of ev) if (!src.includes(norm(e))) problems.push(`evidence が本文にない：${String(e).slice(0, 30)}…`);
  for (const s of strs(d)) for (const n of numbersIn(s)) if (!src.includes(n)) problems.push(`数字が本文にない：${n}（${s.slice(0, 24)}…）`);
  return problems;
}

// ページにするための最低限の中身
export function pageable(d) {
  return d && d.status === 'ok' && d.lead && (d.facts || []).length >= 3 && (d.eligible || []).length >= 1
    && ((d.flow || []).length >= 1 || (d.docs || []).length >= 1) && (d.evidence || []).length >= 3;
}
