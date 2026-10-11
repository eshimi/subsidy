// 記事の見出し（h2）の横に入れる、小さなアイコン。public/images/icons/icon-NN.png（イラストから切り出したもの）。
// 見出しの言葉に合うものだけ入れる。上から順に当てはめ、最初に合ったものを使う。合わないものは何も入れない。
const RULES = [
  [/申請書|書類|提出|様式/, 4],
  [/締切|期限|期間|スケジュール/, 56],
  [/流れ|手順|ステップ|進め方/, 58],
  [/お金|支払|受け取|入金|振り込/, 54],
  [/電子申請|オンライン|ネット/, 9],
  [/相談|面談|窓口|支援機関/, 31],
  [/注意|リスク|NG|失敗|落と|対象外|ご注意/, 33],
  [/チェック|確認|要件|条件|対象/, 32],
  [/地域|自治体|市区町村|都道府県|地元/, 12],
  [/車|EV|電動|自動車/, 23],
  [/住宅|住まい|リフォーム|省エネ住宅|引っ越し/, 25],
  [/子育て|子ども|育児|家族/, 28],
  [/海外|輸出|国際/, 11],
  [/省エネ|太陽光|再エネ|再生可能/, 42],
  [/販路|販売|集客|広告|ホームページ|EC|通販/, 52],
  [/IT|デジタル|AI|システム|ソフト/, 8],
  [/設備|工場|製造|機械|ものづくり/, 47],
  [/飲食|店舗|料理|食/, 50],
  [/創業|起業|開業|副業|はじめる|はじめて|始め方/, 1],
  [/成長|売上|伸び|拡大|事業計画/, 2],
  [/目的|狙い|ねらい|テーマ/, 3],
  [/統計|割合|データ|推移|件数/, 35],
  [/基礎|基本|用語|解説|とは/, 69],
  [/学ぶ|研修|人材|採用|教育|資格/, 27],
];

// 見出しの文字に合うアイコンの番号を返す（合うものがなければ null）
export function iconFor(text) {
  for (const [re, n] of RULES) if (re.test(text)) return n;
  return null;
}

const plain = (s) => s.replace(/<[^>]+>/g, '');

// <div class="art-box"> の中の見出し（h2）に、アイコンを足す。prefix は public/ までの相対パス（'' か '../'）
export function addSectionIcons(html, prefix = '') {
  return html.replace(/(<section class="art-sec"[^>]*>\s*)<h2([^>]*)>((?:(?!<\/h2>)[\s\S])*)<\/h2>/g, (m, open, attrs, inner) => {
    if (inner.includes('sec-icon')) return m;
    const n = iconFor(plain(inner));
    if (!n) return m;
    const src = `${prefix}images/icons/icon-${String(n).padStart(2, '0')}.png`;
    return `${open}<h2${attrs}><img class="sec-icon" src="${src}" alt="" width="30" height="30" loading="lazy">${inner}</h2>`;
  });
}
