// 記事のタイトル用のバナー（public/images/banner/b01〜b18.webp、1200×160）。
// 文字は入っていないので、どの記事にも使える。記事ごとに番号を指定する。
export const BANNER_COUNT = 18;
export const bannerUrl = (prefix, file) => `${prefix}images/banner/${file}.webp`;
export const BANNER_FILES = Array.from({ length: BANNER_COUNT }, (_, i) => `b${String(i + 1).padStart(2, '0')}`);
