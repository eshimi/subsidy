// 記事ページのSEO：タグ（キーワード）の自動作成、説明文の補い、構造化データ（Article・パンくず）。
// scripts/apply-seo.mjs が使う。何度実行しても同じ結果になる。
export const SITE = 'https://hojyokin.net';

// タグの候補（このサイトで扱う言葉）。記事の本文に出てくる数で、上位を選ぶ
export const VOCAB = [
  '補助金', '助成金', '融資', '給付金', '申請', '採択', '不採択', '交付決定', '実績報告', '事業計画書', '公募要領', 'gBizID', 'jGrants',
  '見積書', '相見積もり', '自己資金', '後払い', 'つなぎ融資', '加点', '賃上げ', 'インボイス', '小規模事業者', '中小企業', '個人事業主', '法人',
  '創業', '起業', '副業', 'フリーランス', '商工会', '商工会議所', 'よろず支援拠点', '持続化補助金', 'ものづくり補助金', 'IT導入補助金',
  'デジタル化・AI導入補助金', '省力化投資補助金', '事業承継', 'M&A', '新事業進出', '成長加速化補助金', 'キャリアアップ助成金', '業務改善助成金',
  '人材開発支援助成金', '雇用関係助成金', '太陽光発電', '蓄電池', '電気自動車', 'EV', 'V2H', '省エネ', 'リフォーム', '断熱', '給湯器', '耐震',
  'バリアフリー', '介護', '子育て', '児童手当', '移住', '空き家', 'ブロック塀', '学び直し', '教育訓練給付', 'リスキリング', '飲食店', '美容室',
  'サロン', '小売業', '製造業', '建設業', '農業', '漁業', '観光', '宿泊', 'DX', 'ホームページ', 'ECサイト', '販路開拓', '展示会', '広告', 'チラシ',
  '海外展開', '輸出', '研究開発', '設備投資', '店舗改装', '空き店舗', 'POSレジ', 'AI', 'クラウド', 'テレワーク', '脱炭素', 'GX', '防災',
  '事業継続力強化計画', '女性活躍', '若者', '高齢者', '市区町村', '都道府県', '地域別', '郵便番号', '締切', '公募', '無料相談', '要確認',
];

// フォルダごとの標準のタグ（必ず入れる）
export const FOLDER_TAGS = {
  feature: ['補助金の解説', '制度の特集'],
  basics: ['補助金の基礎知識', '補助金の初心者向け'],
  who: ['対象者別', '補助金の探し方'],
  personal: ['個人向け補助金', '暮らしの補助金'],
  cases: ['補助金の活用事例', '採択事例'],
  columns: ['補助金コラム'],
  guides: ['副業ガイド', '創業の準備'],
  compare: ['補助金の比較'],
  news: ['補助金ニュース', '公募情報'],
  blog: ['補助金ブログ'],
  research: ['補助金データ', '補助金の統計'],
  background: ['補助金の背景', '制度の目的'],
};

const stripTags = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const count = (text, term) => (text.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;

// 本文のHTMLから、タグを最大 max 個つくる（フォルダの標準のタグ＋本文に多く出る言葉）
export function autoTags({ folder, title, headings, text, extra = [], max = 10 }) {
  const out = [];
  const add = (t) => { if (t && !out.includes(t) && out.length < max) out.push(t); };
  for (const t of extra) add(t);
  for (const t of FOLDER_TAGS[folder] || []) add(t);
  const scored = VOCAB.map((t) => ({ t, n: count(title, t) * 5 + count(headings.join(' '), t) * 3 + Math.min(count(text, t), 6) })).filter((x) => x.n > 0).sort((a, b) => b.n - a.n);
  for (const { t } of scored) {
    // 同じ意味の言葉（「EV」と「電気自動車」など）や、他のタグに含まれる言葉は、重ねない
    if (out.some((o) => o.includes(t) && o !== t)) continue;
    add(t);
  }
  if (!out.includes('補助金')) add('補助金');
  if (/令和8年度|2026年度/.test(text)) add('令和8年度');
  return out.slice(0, max);
}

// 説明文が短いとき、リード文から補う（50〜120字に収める）
export function descriptionFor(desc, lead) {
  const d = String(desc || '').trim();
  if (d.length >= 60 || !lead) return d;
  const l = String(lead).trim();
  if (l.startsWith(d.replace(/。$/, ''))) return d;
  let merged = `${d.replace(/。$/, '')}。${l}`;
  if (merged.length > 120) {
    const cut = merged.slice(0, 120);
    const i = cut.lastIndexOf('。');
    merged = i >= 60 ? cut.slice(0, i + 1) : `${cut.slice(0, 117)}…`;
  }
  return merged;
}

// 説明文が60字に満たないページ（一覧・案内など）は、サイトの説明を添えて補う
export const SITE_BLURB = '補助金ネットは、補助金・助成金をキーワード・地域・目的・締切から探せる無料のサイトです。';
export function padDescription(desc) {
  const d = String(desc || '').trim();
  if (!d || d.length >= 60 || d.includes(SITE_BLURB)) return d;
  return `${d.replace(/。$/, '')}。${SITE_BLURB}`;
}

export function jsonLdArticle({ type, headline, description, url, image, datePublished, dateModified, keywords, section }) {
  const o = {
    '@context': 'https://schema.org', '@type': type, headline, description, url, mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'ja', image: [image], keywords: keywords.join(', '), articleSection: section,
    author: { '@type': 'Organization', name: '補助金ネット', url: `${SITE}/` },
    publisher: { '@type': 'Organization', name: '補助金ネット', url: `${SITE}/`, logo: { '@type': 'ImageObject', url: `${SITE}/images/og-image.png` } },
  };
  if (datePublished) o.datePublished = datePublished;
  if (dateModified) o.dateModified = dateModified;
  return o;
}

export function jsonLdBreadcrumb(items) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: url })),
  };
}

export { stripTags };
