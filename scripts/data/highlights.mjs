// 「太字＋蛍光ペン」を当てる語句。ページ（public/ からの相対パス）ごとに、本文の文字列そのままで書く。
// scripts/apply-highlight.mjs が、ビルドのたびに当てる。語句は、本文の中で1か所だけに現れるものにする（scripts/highlight-check.mjs で確認できる）。
export const HIGHLIGHTS = {};
