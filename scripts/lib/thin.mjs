// 薄いページ（独自の本文が少ないページ）の判定。AdSense の「有用性の低いコンテンツ」対策として、薄いページは
// <meta name="robots" content="noindex, follow"> にし、sitemap.xml から外す（リンクは辿れる状態のまま）。
// 判定に使うのは「本文の文字数」。右の列（関連ページ）・script・style・タグ・空白は数えない。
// 閾値は、実際のページの分布を見て決めている（2026-10-21）。ページの作りを変えたときは、分布を見直す。

export const AREA_MIN_CHARS = 3800; // area/ の市区町村ページ：本文がこの文字数未満なら noindex
export const PREF_MIN_CHARS = 3000; // area/pref-*.html の都道府県ページ：同じ
export const PROGRAM_MIN_CHARS = 1200; // programs/ の制度ページ：独自の本文（比較表・共通文を除く）がこの文字数未満なら noindex

// ページの本文（HTML の断片）の、見える文字数
export function visibleLength(html) {
  return String(html)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<aside\b[\s\S]*?<\/aside>/gi, '')
    .replace(/<nav class="related-links"[\s\S]*?<\/nav>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&(amp|lt|gt|quot|#39);/g, 'x')
    .replace(/\s+/g, '').length;
}

export const robotsFor = (thin) => (thin ? 'noindex, follow' : 'index, follow');
