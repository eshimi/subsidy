// 検索結果で省略されにくい、短い <title>。ページ内の見出し（h1）は変えない。
// キーは「フォルダ/ファイル名」。値は「｜補助金ネット」を付ける前の題名。
// ここにないページは、「｜補助金ネット」を付けると42字を超えるとき、サフィックスを外す（scripts/apply-seo.mjs の titleFor）。
export const SEO_TITLES = {
  'cases/aigran-cloud-payroll.html': 'パン屋がIT導入補助金でクラウド給与・勤怠管理を導入した事例',
  'cases/fukuda-bakery-oven.html': '給食パンの製造所がものづくり補助金でオーブンを導入した事例',
  'cases/gyomu-kaizen-seikotsuin.html': '接骨院が業務改善助成金でPOSを導入し賃金を上げた事例',
  'cases/ichimaru-photo-pharmacy.html': '町の写真店が持続化補助金をきっかけに事業を立て直した事例',
  'cases/iie-capsule-ec.html': 'カプセルマシンで店とネットへ誘導、HPの閲覧が前年比150％以上に',
  'cases/kaya-cellophane-ishikawa.html': '賀谷セロファンがキャリアアップ助成金で正社員転換をした事例',
  'cases/kikuhiro-chokin.html': '作業を約45％省力化し、新しい取引先を獲得した事例',
  'cases/saiko-cnf-machine.html': '技術ベンチャーがものづくり補助金で量産用の装置を開発した事例',
  'cases/shonai-edamame.html': 'だだちゃ豆の袋詰めを機械化し、売上が前年比440%以上になった事例',
  'cases/soba-tanemura-matsumoto.html': 'そば処種村が持続化補助金で製粉設備を更新した事例',
  'cases/tensense-ecopresso-osaka.html': 'テンセンスがものづくり補助金で食べられるカップの量産設備を導入した事例',
  'cases/yamachiku-nankan-kumamoto.html': 'ヤマチクが事業再構築補助金でカフェ併設のショップを新設した事例',
};
