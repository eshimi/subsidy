// AI補助金判定（/api/judge）と無料相談（/api/consult）の入力検証と、メールの本文づくり。
// 判定の回答には個人を特定できる情報を含めない（AIに送るのは選択式の回答だけ）。
export const OPTIONS = {
  kind: ['法人（株式会社・合同会社など）', '個人事業主（フリーランスを含む）', 'これから創業予定'],
  industry: ['飲食業', '小売業', '美容・サロン', '建設業', '製造業', 'IT・情報通信', '宿泊・観光', '農林水産業', '医療・介護・保育', 'その他'],
  employees: ['0人（自分だけ）', '1〜5人', '6〜20人', '21〜50人', '51〜100人', '101〜300人', '301人以上'],
  koyou: ['加入している', '加入していない', 'わからない'],
  shakai: ['加入している', '加入していない', 'わからない'],
  topic: ['設備投資・機械の導入', 'IT・デジタル化', '販路開拓・集客', '人材の採用・育成・賃上げ', '正社員化・待遇の改善', '省力化・人手不足', '事業承継・M&A', '創業・新規事業', '海外展開・輸出', 'その他'],
  timing: ['すぐに', '3か月以内', '半年以内', 'まだ決めていない'],
};

const bad = (message) => Object.assign(new Error(message), { status: 400, expose: true });
const str = (v) => (typeof v === 'string' ? v.trim() : '');

export function parseAnswers(body) {
  if (!body || typeof body !== 'object') throw bad('入力が正しくありません');
  const out = {};
  for (const [key, list] of Object.entries(OPTIONS)) {
    const v = str(body[key]);
    if (!list.includes(v)) throw bad('回答が正しくありません。もう一度やり直してください');
    out[key] = v;
  }
  return out;
}

const PHONE_RE = /^[0-9０-９\-－ー()（）+＋ ]{10,20}$/;
const EMAIL_RE = /^[^\s@<>"',;:]+@[^\s@<>"',;:]+\.[^\s@<>"',;:]+$/;

export function parseConsult(body) {
  if (!body || typeof body !== 'object') throw bad('入力が正しくありません');
  if (typeof body.website === 'string' && body.website.trim()) return { spam: true };
  const answers = parseAnswers(body);
  const company = str(body.company);
  const name = str(body.name);
  const phone = str(body.phone);
  const email = str(body.email);
  const note = str(body.note);
  const candidates = Array.isArray(body.candidates) ? body.candidates.filter((c) => typeof c === 'string').map((c) => c.trim()).filter(Boolean).slice(0, 8) : [];
  if (!company || company.length > 100) throw bad('会社名（屋号）を入力してください');
  if (!name || name.length > 60) throw bad('お名前を入力してください');
  if (!PHONE_RE.test(phone)) throw bad('電話番号を正しく入力してください');
  if (email && (email.length > 200 || !EMAIL_RE.test(email))) throw bad('メールアドレスを正しく入力してください');
  if (note.length > 2000) throw bad('その他ご記入事項は2000字以内で入力してください');
  if (body.consent !== true) throw bad('個人情報の取り扱いへの同意が必要です');
  return { ...answers, company, name, phone, email, note, candidates: candidates.map((c) => c.slice(0, 60)) };
}

export function consultText(c) {
  return [
    '補助金ネットの「AI補助金判定」から、無料相談のお申し込みがありました。',
    '',
    `会社名：${c.company}`,
    `お名前：${c.name}`,
    `電話番号：${c.phone}`,
    `メールアドレス：${c.email || '（未入力）'}`,
    '',
    `事業の形態：${c.kind}`,
    `業種：${c.industry}`,
    `従業員数：${c.employees}`,
    `雇用保険の加入：${c.koyou}`,
    `社会保険の加入：${c.shakai}`,
    `ご相談内容：${c.topic}`,
    `時期：${c.timing}`,
    `判定で表示した候補：${c.candidates.length ? c.candidates.join('、') : '（なし）'}`,
    '',
    'その他ご記入事項：',
    c.note || '（なし）',
    '',
    '※ 申込者は、個人情報の取り扱い（業務提携先への提供を含む）に同意しています。',
  ].join('\n');
}
