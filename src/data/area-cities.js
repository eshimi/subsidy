// 地域別ページの対象都市（バッチ単位で追加する）。
// slug は URL（/area/<slug>.html）になるローマ字。pref は PREFECTURES と同じ表記にすること。
export const AREA_CITIES = [
  // バッチ1：政令指定都市（20）
  { batch: 1, name: '札幌市', slug: 'sapporo', pref: '北海道', level: '政令指定都市' },
  { batch: 1, name: '仙台市', slug: 'sendai', pref: '宮城県', level: '政令指定都市' },
  { batch: 1, name: 'さいたま市', slug: 'saitama', pref: '埼玉県', level: '政令指定都市' },
  { batch: 1, name: '千葉市', slug: 'chiba', pref: '千葉県', level: '政令指定都市' },
  { batch: 1, name: '横浜市', slug: 'yokohama', pref: '神奈川県', level: '政令指定都市' },
  { batch: 1, name: '川崎市', slug: 'kawasaki', pref: '神奈川県', level: '政令指定都市' },
  { batch: 1, name: '相模原市', slug: 'sagamihara', pref: '神奈川県', level: '政令指定都市' },
  { batch: 1, name: '新潟市', slug: 'niigata', pref: '新潟県', level: '政令指定都市' },
  { batch: 1, name: '静岡市', slug: 'shizuoka', pref: '静岡県', level: '政令指定都市' },
  { batch: 1, name: '浜松市', slug: 'hamamatsu', pref: '静岡県', level: '政令指定都市' },
  { batch: 1, name: '名古屋市', slug: 'nagoya', pref: '愛知県', level: '政令指定都市' },
  { batch: 1, name: '京都市', slug: 'kyoto', pref: '京都府', level: '政令指定都市' },
  { batch: 1, name: '大阪市', slug: 'osaka', pref: '大阪府', level: '政令指定都市' },
  { batch: 1, name: '堺市', slug: 'sakai', pref: '大阪府', level: '政令指定都市' },
  { batch: 1, name: '神戸市', slug: 'kobe', pref: '兵庫県', level: '政令指定都市' },
  { batch: 1, name: '岡山市', slug: 'okayama', pref: '岡山県', level: '政令指定都市' },
  { batch: 1, name: '広島市', slug: 'hiroshima', pref: '広島県', level: '政令指定都市' },
  { batch: 1, name: '北九州市', slug: 'kitakyushu', pref: '福岡県', level: '政令指定都市' },
  { batch: 1, name: '福岡市', slug: 'fukuoka', pref: '福岡県', level: '政令指定都市' },
  { batch: 1, name: '熊本市', slug: 'kumamoto', pref: '熊本県', level: '政令指定都市' },
];
