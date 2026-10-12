// 調べて取り込んだ、事業者向け（創業・中小企業・個人事業主向け）の自治体の制度。
// scripts/import-local-batches.mjs で更新する（手で直してもよいが、並びと形式は取り込みのときに整えられる）。
// 形式は local-programs.js と同じ。cat は事業向けの分類（BUSINESS_CATEGORIES）、cities は area-cities.js にある市区町村名。
export const BUSINESS_CATEGORIES = ['創業・起業', '設備投資・省エネ', '販路開拓・PR', '人材・雇用', 'IT・デジタル', '融資・利子補給', '事業承継', '空き店舗・商店街', '研究開発・新事業', 'その他'];

export const LOCAL_PROGRAMS_EXTRA = [
];
