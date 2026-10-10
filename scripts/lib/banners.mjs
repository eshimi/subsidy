// 記事のタイトル用のバナー（public/images/banner/b01〜b18.webp、1200×160）。
// 文字は入っていないので、どの記事にも使える。記事ごとに番号を指定する。
export const BANNER_COUNT = 18;
export const bannerUrl = (prefix, file) => `${prefix}images/banner/${file}.webp`;
export const BANNER_FILES = Array.from({ length: BANNER_COUNT }, (_, i) => `b${String(i + 1).padStart(2, '0')}`);

// ページごとに、18種類のうちどれを使うかを決める（同じページは毎回同じ番号になる）
export function bannerFor(path) {
  let h = 0;
  for (const ch of path) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return BANNER_FILES[h % BANNER_COUNT];
}

// 対象外のページ：トップ・AI検索（独自のヒーローがある）、サイトマップ。特集は記事ごとに番号を指定済み
const SKIP = ['index.html', 'sitemap.html', 'ai.html'];
export function bannerEligible(path) {
  return !SKIP.includes(path) && !path.startsWith('feature/');
}

// 見出し（h1）を、バナーの中の見出しに置き換える。prefix は public/ までの相対パス（'' or '../'）
export function applyBanner(html, path) {
  if (!bannerEligible(path) || html.includes('pb-banner')) return html;
  const prefix = '../'.repeat(path.split('/').length - 1);
  const banner = (title) => `<div class="pb-banner" style="background-image: url('${prefix}images/banner/${bannerFor(path)}.webp')"><h1 class="pb-title">${title}</h1></div>`;
  return html.replace(/(<div style="margin-bottom: [\d.]+rem;">)\s*<h1 class="display"[^>]*>([\s\S]*?)<\/h1>/, (_, open, title) => `${banner(title)}\n    ${open}`);
}
