// 個人（住民）向けの、自治体の補助・助成。住まい・暮らしの制度を、都道府県・市区町村ごとに掲載する。
// 事業者向けの local-programs.js とは分けている（AIマッチなど、事業者向けの判定に混ざらないようにするため）。
// 公式の情報で確認できた内容だけを書く。金額・期限などが確認できないものは「要確認」とする。
// データは scripts/import-resident-batches.mjs で、調べた結果の JSON から取り込む（形式の検証つき）。

export const RESIDENT_CATEGORIES = ['耐震', '太陽光・蓄電池', 'EV・充電', '省エネ住宅', '空き家・ブロック塀', 'バリアフリー・介護', '子育て', '移住'];

export const RESIDENT_PROGRAMS = [
];
