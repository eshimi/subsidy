// 主要都市・都道府県の独自制度（2026年10月時点で確認できた令和8年度の公募情報をもとにした概要）。
// cities は住所の市区町村名の先頭一致で判定する（例: '札幌市' は '札幌市中央区' にも一致）。
// deadline（YYYY-MM-DD）がある制度は、締切後に「今年度の受付終了」として扱い、次年度の公募確認を促す。

export const LOCAL_PROGRAMS = [
  // ───── 北海道 ─────
  {
    id: 'sapporo-shinki-sogyo',
    name: 'さっぽろ新規創業促進補助金',
    provider: '札幌市 経済観光局',
    level: 'municipality',
    type: '補助金',
    amount: '株式会社 75,000円／合同会社 30,000円',
    summary: '札幌市の特定創業支援等事業を修了して登録免許税の半額軽減を受け、法人を設立した方に、残りの半額相当を市が補助します。',
    eligibility: ['札幌市の特定創業支援等事業の証明を受けた後に法人登記', '市内で創業'],
    industries: 'all',
    prefectures: ['北海道'],
    cities: ['札幌市'],
    stages: ['planning', 'early'],
    period: '令和8年度：2026年4月1日〜2027年3月31日',
    deadline: '2027-03-31',
    priority: 12,
    url: 'https://www.city.sapporo.jp/keizai/center/sinkisougyouhojyo.html',
  },

  // ───── 宮城県 ─────
  {
    id: 'sendai-shinseihin',
    name: '仙台市中小企業新製品等開発支援補助金',
    provider: '仙台市',
    level: 'municipality',
    type: '補助金',
    amount: '上限200万円／補助率 2/3',
    summary: 'IoT・AI・ロボットなどの先端技術を使い、防災・減災、農林水産業、スポーツなどの分野で新製品・新サービスを開発する取り組みを支援します。',
    eligibility: ['市内に事業所・工場を持つ中小企業者（個人事業主は対象外）'],
    industries: ['it', 'manufacturing', 'agriculture'],
    require: ['rnd'],
    prefectures: ['宮城県'],
    cities: ['仙台市'],
    stages: ['early', 'established'],
    period: '令和8年度公募',
    priority: 10,
    url: 'https://www.city.sendai.jp/renkesuishin/jigyosha/kezai/sangaku/minkan/shinseihinkaihatsu2026.html',
  },
  {
    id: 'sendai-kaigai',
    name: '仙台市海外販路開拓チャレンジ支援助成金',
    provider: '仙台市',
    level: 'municipality',
    type: '助成金',
    amount: '上限100万円／補助率 1/2・2/3',
    summary: '市内企業が海外市場の開拓に挑戦する際の経費（展示会出展、プロモーションなど）を助成します。',
    eligibility: ['市内の中小企業者'],
    industries: 'all',
    require: ['export'],
    prefectures: ['宮城県'],
    cities: ['仙台市'],
    stages: ['early', 'established'],
    period: '令和8年度公募',
    priority: 9,
    searchQuery: '仙台市 海外販路開拓チャレンジ支援助成金',
  },

  // ───── 千葉県 ─────
  {
    id: 'chiba-pref-sogyo-ouen',
    name: 'ちば創業応援助成金',
    provider: '千葉県・千葉県産業振興センター',
    level: 'prefecture',
    type: '助成金',
    amount: '上限100万円／助成率 1/2',
    summary: '県内で創業予定、または創業間もない方のうち、先進的なアイデアや研究成果に基づく事業、地域課題の解決など社会的インパクトのある事業を支援します。',
    eligibility: ['千葉県内で創業予定、または創業初期の事業者'],
    industries: 'all',
    boost: ['rnd', 'social'],
    prefectures: ['千葉県'],
    stages: ['planning', 'early'],
    period: '例年4月頃に公募（令和8年度は4月2日〜4月30日）',
    deadline: '2026-04-30',
    priority: 15,
    searchQuery: 'ちば創業応援助成金',
  },
  {
    id: 'chiba-city-setsuritsu',
    name: '千葉市創業支援補助金（会社設立型）',
    provider: '千葉市',
    level: 'municipality',
    type: '補助金',
    amount: '上限7万5,000円',
    summary: '認定特定創業支援等事業で経営の基礎知識を身につけた創業者に、会社設立に必要な経費の一部を補助します。',
    eligibility: ['千葉市の特定創業支援等事業による支援を受けた創業者', '市内で会社を設立'],
    industries: 'all',
    prefectures: ['千葉県'],
    cities: ['千葉市'],
    stages: ['planning', 'early'],
    period: '令和8年度：2026年5月29日〜2027年2月26日',
    deadline: '2027-02-26',
    priority: 11,
    searchQuery: '千葉市創業支援補助金 会社設立型',
  },
  {
    id: 'chiba-city-shokei',
    name: '千葉市創業支援補助金（第三者承継型）',
    provider: '千葉市',
    level: 'municipality',
    type: '補助金',
    amount: '上限30万円／補助率 1/2',
    summary: '後継者のいない事業を第三者として引き継いで創業する場合に、承継に必要な経費の一部を補助します。',
    eligibility: ['千葉市の特定創業支援等事業による支援を受けた創業者', '第三者承継による創業'],
    industries: 'all',
    require: ['succession'],
    prefectures: ['千葉県'],
    cities: ['千葉市'],
    stages: ['planning', 'early'],
    period: '令和8年度：2026年5月29日〜2027年1月29日',
    deadline: '2027-01-29',
    priority: 12,
    searchQuery: '千葉市創業支援補助金 第三者承継型',
  },

  // ───── 東京都（区） ─────
  {
    id: 'shibuya-tenpo-kaigyo',
    name: '渋谷区店舗開業支援補助金',
    provider: '渋谷区',
    level: 'municipality',
    type: '補助金',
    amount: '上限250万円／補助率 4/5',
    summary: '区内で新たに店舗を開業し、商店街や地域と積極的に関わる個人・事業者に、広告費・設備購入費・建物費などの開業経費を補助します。',
    eligibility: ['創業前、または創業10年未満の個人・法人', '区内での店舗開業と、商店街・地域との連携'],
    industries: 'all',
    require: ['store'],
    prefectures: ['東京都'],
    cities: ['渋谷区'],
    stages: ['planning', 'early', 'established'],
    period: '令和8年度は年2回公募（第1回 4月15日〜6月1日、第2回 7月15日〜8月31日）',
    deadline: '2026-08-31',
    priority: 16,
    searchQuery: '渋谷区 店舗開業支援補助金',
  },
  {
    id: 'setagaya-keiei-shien',
    name: '世田谷区中小事業者経営支援補助金',
    provider: '世田谷区',
    level: 'municipality',
    type: '補助金',
    amount: '上限40万円／補助率 1/2',
    summary: '区内の中小事業者が経営改善や販路拡大に取り組む経費の一部を補助します。予算上限に達し次第、受付終了となります。',
    eligibility: ['区内の中小事業者（開業済み）'],
    industries: 'all',
    boost: ['ec', 'digital', 'equipment'],
    prefectures: ['東京都'],
    cities: ['世田谷区'],
    stages: ['early', 'established'],
    period: '令和8年度：2026年6月1日〜（予算上限に達し次第終了）',
    priority: 9,
    searchQuery: '世田谷区中小事業者経営支援補助金',
  },

  // ───── 神奈川県 ─────
  {
    id: 'yokohama-startup-port',
    name: 'スタートアップポートヨコハマ／よこはま地域創業スクール',
    provider: '横浜市・横浜中小企業診断士会・かながわ信用金庫ほか',
    level: 'municipality',
    type: '専門家支援',
    amount: '創業スクール・相談・イベント情報',
    summary: '横浜市の創業・スタートアップ支援の窓口。市内で創業予定、または創業5年未満の方向けの創業スクールなど、公的機関の支援やイベントをまとめて案内しています。',
    eligibility: ['横浜市内で創業予定、または創業5年未満'],
    industries: 'all',
    prefectures: ['神奈川県'],
    cities: ['横浜市'],
    stages: ['planning', 'early'],
    priority: 11,
    url: 'https://www.city.yokohama.lg.jp/business/keizai/sougyo/sogyoshien/startup.html',
  },
  {
    id: 'kawasaki-seicho-kankyo',
    name: '川崎市中小企業成長環境支援補助金',
    provider: '川崎市',
    level: 'municipality',
    type: '補助金',
    amount: '上限200万円',
    summary: '市内の中小企業が経営基盤や競争力を強化するための取り組みを支援します。',
    eligibility: ['市内の中小企業（開業済み）'],
    industries: 'all',
    boost: ['equipment', 'digital'],
    prefectures: ['神奈川県'],
    cities: ['川崎市'],
    stages: ['early', 'established'],
    period: '令和8年度公募',
    priority: 8,
    searchQuery: '川崎市 中小企業成長環境支援補助金',
  },

  // ───── 新潟県・静岡県・愛知県 ─────
  {
    id: 'niigata-shoku-kaihatsu',
    name: '新潟市 食の商品開発補助金',
    provider: '新潟市',
    level: 'municipality',
    type: '補助金',
    amount: '上限100万円／補助率 2/3',
    summary: '自社の強みや地域の特色を活かした食品の商品開発・改良の取り組みを支援します。',
    eligibility: ['市内の食品関連事業者'],
    industries: ['food', 'manufacturing', 'agriculture'],
    prefectures: ['新潟県'],
    cities: ['新潟市'],
    stages: ['early', 'established'],
    period: '例年春に公募（令和8年度は4月1日〜5月22日）',
    deadline: '2026-05-22',
    priority: 10,
    searchQuery: '新潟市 食の商品開発補助金',
  },
  {
    id: 'hamamatsu-shinjigyo-chosen',
    name: '浜松市新事業挑戦事業費補助金',
    provider: '浜松市',
    level: 'municipality',
    type: '補助金',
    amount: '上限100万円／補助率 1/2',
    summary: '製品開発の一次試作にかかる費用の一部を補助し、新たな事業化への挑戦を後押しします。年度内に複数回公募されます。',
    eligibility: ['市内の中小企業者等'],
    industries: ['manufacturing', 'it', 'agriculture', 'care'],
    require: ['rnd'],
    prefectures: ['静岡県'],
    cities: ['浜松市'],
    stages: ['early', 'established'],
    period: '令和8年度は複数回公募（3次募集 7月7日〜8月7日）',
    priority: 10,
    searchQuery: '浜松市 新事業挑戦事業費補助金',
  },
  {
    id: 'nagoya-startup',
    name: '名古屋市スタートアップ企業支援補助金',
    provider: '名古屋市',
    level: 'municipality',
    type: '補助金',
    amount: '上限100万円／補助率 1/3（要件により1/2）',
    summary: '成長が見込まれるスタートアップの創業を促進するため、創業時などの経費の一部を補助します。',
    eligibility: ['市内で創業する成長志向の企業 など'],
    industries: 'all',
    boost: ['it', 'rnd'],
    prefectures: ['愛知県'],
    cities: ['名古屋市'],
    stages: ['planning', 'early'],
    period: '例年5月頃に公募（令和8年度は5月1日〜6月1日）',
    deadline: '2026-06-01',
    priority: 14,
    searchQuery: '名古屋市スタートアップ企業支援補助金',
  },

  // ───── 近畿 ─────
  {
    id: 'kyoto-impact-flow',
    name: '京都市創業支援補助金（IMPACT FLOW KYOTO）',
    provider: '京都市・京都高度技術研究所（ASTEM）',
    level: 'municipality',
    type: '補助金',
    amount: '創業支援部門 上限50万円／STEP-UP部門 上限200万円',
    summary: '環境・教育・医療・文化など社会課題の解決に挑む創業予定者・スタートアップを支援。補助金に加え、伴走支援や法人登記可能なコワーキングスペースの利用料免除（1年間）なども受けられます。',
    eligibility: ['京都市内で創業予定、またはスタートアップ', '社会課題の解決を目指す事業'],
    industries: 'all',
    boost: ['social', 'rnd', 'export'],
    prefectures: ['京都府'],
    cities: ['京都市'],
    stages: ['planning', 'early'],
    period: '例年6〜8月に公募（令和8年度は6月1日〜8月7日）',
    deadline: '2026-08-07',
    priority: 14,
    searchQuery: 'IMPACT FLOW KYOTO 京都市 創業支援補助金',
  },
  {
    id: 'kobe-jutakuchi-tenpo',
    name: '神戸市 住宅地における店舗等立地支援事業',
    provider: '神戸市',
    level: 'municipality',
    type: '補助金',
    amount: '上限100万円／補助率 1/2',
    summary: 'ニュータウンなどの住宅地で新たに店舗等を出店する方に、店舗の新築・リフォーム費用を補助します。',
    eligibility: ['市内の対象住宅地で店舗等を新規出店'],
    industries: 'all',
    require: ['store'],
    prefectures: ['兵庫県'],
    cities: ['神戸市'],
    stages: ['planning', 'early', 'established'],
    period: '令和8年度：2026年4月1日〜',
    priority: 13,
    searchQuery: '神戸市 住宅地における店舗等立地支援事業',
  },

  // ───── 中国 ─────
  {
    id: 'hiroshima-shinki-business',
    name: '広島市 新規ビジネス事業化支援事業',
    provider: '広島市',
    level: 'municipality',
    type: '補助金',
    amount: '上限300万円／補助率 1/2',
    summary: '試作の段階に達した新技術・新製品の早期事業化を支援します。',
    eligibility: ['市内の中小企業者等', '新技術・新製品が試作段階に達していること'],
    industries: ['manufacturing', 'it', 'care', 'agriculture'],
    require: ['rnd'],
    prefectures: ['広島県'],
    cities: ['広島市'],
    stages: ['early', 'established'],
    period: '令和8年度公募',
    priority: 10,
    searchQuery: '広島市 新規ビジネス事業化支援事業',
  },

  // ───── 九州 ─────
  {
    id: 'fukuoka-shinki-sogyo',
    name: '福岡市新規創業促進補助金',
    provider: '福岡市',
    level: 'municipality',
    type: '補助金',
    amount: '登録免許税の残り半額相当',
    summary: '国の特定創業支援等事業を活用して登録免許税の半額軽減を受けた方に、残りの半額相当額を市が補助します。',
    eligibility: ['福岡市の特定創業支援等事業の証明を受けて法人を設立'],
    industries: 'all',
    prefectures: ['福岡県'],
    cities: ['福岡市'],
    stages: ['planning', 'early'],
    period: '令和8年度：4月1日から受付',
    priority: 12,
    url: 'https://www.city.fukuoka.lg.jp/keizai/r-support/business/tokutei-sougyou-sientoujigyou_08.html',
  },
  {
    id: 'fukuoka-rnd-startup',
    name: '福岡市研究開発型スタートアップ成長支援事業補助金',
    provider: '福岡市',
    level: 'municipality',
    type: '補助金',
    amount: '上限800万円',
    summary: '独自技術を持つ研究開発型スタートアップに、事業推進のための経費を助成します。',
    eligibility: ['独自技術を持つ研究開発型スタートアップ等'],
    industries: 'all',
    require: ['rnd'],
    prefectures: ['福岡県'],
    cities: ['福岡市'],
    stages: ['planning', 'early', 'established'],
    period: '令和8年度：〜2026年9月30日',
    deadline: '2026-09-30',
    priority: 13,
    searchQuery: '福岡市研究開発型スタートアップ成長支援事業補助金',
  },
  {
    id: 'fukuoka-social-startup',
    name: '福岡市ソーシャルスタートアップ成長支援事業',
    provider: '福岡市',
    level: 'municipality',
    type: '専門家支援',
    amount: '専門家による伴走支援プログラム',
    summary: '社会や地域の課題解決に取り組むソーシャルスタートアップを、専門家が伴走して支援します。',
    eligibility: ['創業からおおむね10年以内', '社会・地域課題の解決に取り組む事業'],
    industries: 'all',
    require: ['social'],
    prefectures: ['福岡県'],
    cities: ['福岡市'],
    stages: ['planning', 'early', 'established'],
    period: '令和8年度実施',
    priority: 11,
    searchQuery: '福岡市 ソーシャルスタートアップ成長支援事業',
  },
  {
    id: 'kitakyushu-shokei',
    name: '北九州市事業承継・M&A促進化助成金',
    provider: '北九州市',
    level: 'municipality',
    type: '助成金',
    amount: '上限50万円／補助率 1/2',
    summary: '事業承継に向けた企業価値の算定やM&Aの仲介委託などに必要な経費の一部を助成します。',
    eligibility: ['市内の中小企業者等'],
    industries: 'all',
    require: ['succession'],
    prefectures: ['福岡県'],
    cities: ['北九州市'],
    stages: ['planning', 'early', 'established'],
    period: '令和8年度公募',
    priority: 10,
    searchQuery: '北九州市 事業承継 M&A促進化助成金',
  },

  // ───── 全国（市区町村が実施主体） ─────
  {
    id: 'local10000',
    name: 'ローカル10,000プロジェクト（地域経済循環創造事業交付金）',
    provider: '総務省／{city}',
    level: 'municipality',
    type: '補助金',
    amount: '上限5,500万円程度／補助率 1/2（要件により2/3・3/4）',
    summary: '地域の人材・資源・資金を活かした新しいビジネスの初期投資を、市区町村を通じて支援します。地域金融機関の融資を組み合わせることが前提で、市区町村が国へ申請します。',
    eligibility: ['地域資源を活用した事業を立ち上げる民間事業者', '地域金融機関からの融資', '市区町村による事業計画の申請'],
    industries: 'all',
    boost: ['social', 'agriculture', 'tourism', 'food', 'equipment', 'relocation'],
    stages: ['planning', 'early'],
    period: '例年夏〜秋に市区町村経由で申請（令和8年度は7月1日〜10月30日）',
    deadline: '2026-10-30',
    priority: 9,
    searchQuery: 'ローカル10,000プロジェクト {city}',
  },
  // ───── 東京都 豊島区（区の公式ページ「中小企業支援事業補助金」「制度融資」などをもとに、2026年10月時点で確認） ─────
  {
    id: 'toshima-kaigyo',
    name: '中小企業支援事業補助金 開業支援コース',
    provider: '豊島区 産業観光部 産業振興課',
    level: 'municipality',
    type: '補助金',
    amount: '上限20万円（千円未満切り捨て）／補助率 税抜経費の2/3以内',
    summary: '区内で創業後3か月以上5年未満の中小企業者（個人事業主を含む）が、事業PR（看板・チラシ・広告・ホームページ制作など）、デジタル環境整備（パソコン・タブレット）、専門家活用の経費を補助します。',
    eligibility: ['区内中小企業者（個人事業主を含む）で、創業後3か月以上5年未満', '交付申請の前に、特定創業支援等の受講と証明書の取得が必要', 'としまビジネスサポートセンターの「補助金相談」を受けることが必須'],
    industries: 'all',
    prefectures: ['東京都'],
    cities: ['豊島区'],
    stages: ['planning', 'early'],
    period: '令和8年度：補助金相談 2026年5月11日〜11月27日17時（予算状況により短縮の場合あり）／交付申請 〜2027年1月22日17時',
    deadline: '2026-11-27',
    priority: 12,
    url: 'https://www.city.toshima.lg.jp/584/machizukuri/sangyo/kigyo/019176.html',
  },
  {
    id: 'toshima-keiei',
    name: '中小企業支援事業補助金 経営安定コース',
    provider: '豊島区 産業観光部 産業振興課',
    level: 'municipality',
    type: '補助金',
    amount: '上限15万円（千円未満切り捨て）／補助率 税抜経費の1/2以内',
    summary: '区内中小企業者が事業活動を続け、発展させるために必要な経費（研修・資格取得などの人材育成・リスキリング、販路開拓、デジタル化、専門家活用など）の一部を補助します。',
    eligibility: ['区内中小企業者（個人事業主を含む）で、区内で3か月以上事業を営んでいること', '法人は区内に本店登記地と主たる事業所があること', '医療法人・NPO法人・社会福祉法人など、個別の法律に規定された法人は対象外'],
    industries: 'all',
    prefectures: ['東京都'],
    cities: ['豊島区'],
    stages: ['early', 'established'],
    period: '令和8年度：補助金相談 2026年5月11日〜11月27日17時（予算状況により短縮の場合あり）／交付申請 〜2027年1月22日17時',
    deadline: '2026-11-27',
    priority: 11,
    url: 'https://www.city.toshima.lg.jp/584/machizukuri/sangyo/kigyo/019174.html',
  },
  {
    id: 'toshima-tenji',
    name: '中小企業支援事業補助金 展示会等出展コース',
    provider: '豊島区 産業観光部 産業振興課',
    level: 'municipality',
    type: '補助金',
    amount: '上限20万円（千円未満切り捨て）／補助率 税抜経費の1/2以内',
    summary: '展示会などへの出展にかかる小間料、出展ブースの装飾・電飾の外注費、ディスプレイなどのレンタル費用の一部を補助します。',
    eligibility: ['区内中小企業者（個人事業主を含む）で、創業後3か月以上', '交付申請は展示会の会期の前に行う必要がある', '医療法人・NPO法人・一般社団法人など、個別の法律に規定された法人は対象外'],
    industries: 'all',
    prefectures: ['東京都'],
    cities: ['豊島区'],
    stages: ['early', 'established'],
    period: '令和8年度：交付申請 2026年5月11日〜11月27日17時（受付は予定件数に達し次第終了することあり）／実績報告 〜2027年3月31日17時',
    deadline: '2026-11-27',
    priority: 10,
    url: 'https://www.city.toshima.lg.jp/584/machizukuri/sangyo/kigyo/2504031539.html',
  },
  {
    id: 'toshima-collab',
    name: '中小企業支援事業補助金 コラボチャレンジコース',
    provider: '豊島区 産業観光部 産業振興課',
    level: 'municipality',
    type: '補助金',
    amount: '上限20万円／補助率 対象経費の1/2以内',
    summary: '区内の事業者が複数で団体をつくり、各自の知識・技術・経験を生かして新しい商品やサービスを共同で開発する際の、企画・開発・販売の経費を補助します。令和8年度は先着3件です。',
    eligibility: ['団体の半数以上が区内中小企業者であること', '団体の代表者を決め、としまビジネスサポートセンターで事前相談を受けて事業計画書を作成すること', '過去に同じ補助金の交付を受けた方は利用できない'],
    industries: 'all',
    prefectures: ['東京都'],
    cities: ['豊島区'],
    stages: ['early', 'established'],
    period: '令和8年度：交付申請 〜2026年11月27日17時（事業着手前に申請）',
    deadline: '2026-11-27',
    priority: 8,
    url: 'https://www.city.toshima.lg.jp/584/machizukuri/sangyo/kigyo/019175.html',
  },
  {
    id: 'toshima-chingin',
    name: 'としま賃上げ促進支援金',
    provider: '豊島区 産業観光部 産業振興課',
    level: 'municipality',
    type: '給付金',
    amount: '従業員1人あたり5万円（1社あたり最大50万円）',
    summary: '区内の中小企業と個人事業主が、賃金を前月より3%以上引き上げて支給した場合に、対象の従業員の人数に応じて支援金を給付します。',
    eligibility: ['区内に本店登記地がある中小企業、または区内に主たる事業所がある個人事業主', '対象従業員は、週20時間以上勤務し雇用保険の被保険者で、役員ではなく、2025年11月21日以前から雇用されていること', '対象の時給が東京都の最低賃金を超えていること'],
    industries: 'all',
    prefectures: ['東京都'],
    cities: ['豊島区'],
    stages: ['early', 'established'],
    period: '令和8年4月20日〜12月22日（予算の上限に達すると期間内でも終了）',
    deadline: '2026-12-22',
    priority: 13,
    url: 'https://www.city.toshima.lg.jp/584/machizukuri/sangyo/kigyo/2602241505.html',
  },
  {
    id: 'toshima-yushi',
    name: '豊島区の制度融資（中小商工業融資など）',
    provider: '豊島区 ・ 取扱金融機関',
    level: 'municipality',
    type: '融資',
    amount: '区が金融機関へ融資をあっせん（融資限度額は資料により異なるため、申請前に要確認）',
    summary: '区内の中小企業者や、これから起業する方が必要な資金を低利で借りられるよう、区が取扱金融機関へ融資をあっせんします。融資の利子の一部を区が補助する仕組みです。起業向けには「第２創業資金」などのメニューがあります。',
    eligibility: ['区内で事業を営む中小企業者（起業を希望する方も対象のメニューあり）', '起業向けの融資は、区指定の相談員と3回程度面接して創業計画書を作成する', 'としまビジネスサポートセンターに書類を提出し、審査後に紹介状を受けて取扱金融機関へ申し込む'],
    industries: 'all',
    prefectures: ['東京都'],
    cities: ['豊島区'],
    stages: ['planning', 'early', 'established'],
    period: '通年（メニューにより異なる）',
    priority: 9,
    url: 'https://www.city.toshima.lg.jp/584/machizukuri/sangyo/kigyo/019169.html',
  },
  {
    id: 'toshima-rishi',
    name: '日本政策金融公庫の融資に対する利子補給',
    provider: '豊島区 産業観光部 産業振興課',
    level: 'municipality',
    type: '融資',
    amount: '補給率1.2％まで（元本限度額1,000万円）※令和6年4月1日以降に融資実行された場合',
    summary: '区内の中小企業者が、日本政策金融公庫（国民生活事業）の融資を受けた場合に、利子の一部を区が補給します。',
    eligibility: ['区内の中小企業者', '対象は、無担保で、税務申告を2期終えていない方向けの利率が適用されている方などに限られる（詳細は区の案内で確認）'],
    industries: 'all',
    prefectures: ['東京都'],
    cities: ['豊島区'],
    stages: ['planning', 'early'],
    period: '融資実行日による',
    priority: 7,
    url: 'https://www.city.toshima.lg.jp/584/machizukuri/sangyo/kigyo/003919.html',
  },
  {
    id: 'toshima-akitenpo',
    name: '空き店舗活性支援事業（令和8年度は募集終了）',
    provider: '豊島区 産業観光部 産業振興課',
    level: 'municipality',
    type: '補助金',
    amount: '店舗整備費（改修工事費など）と賃借料を補助（上限額は資料により差があるため要確認）',
    summary: '区内の空き店舗で開業する人に、店舗の改修費と賃借料を補助します。区が指定したコーディネーターによる伴走支援も受けられます。令和8年度の募集は終了しています。次年度の公募を確認してください。',
    eligibility: ['区内の空き店舗で開業する中小企業者（個人事業主を含む）', '大企業が実質的に経営に参画していないこと', '事前相談が必須'],
    industries: 'all',
    prefectures: ['東京都'],
    cities: ['豊島区'],
    stages: ['planning', 'early'],
    period: '令和8年度：2026年6月1日〜6月19日（終了）',
    deadline: '2026-06-19',
    priority: 6,
    url: 'https://www.city.toshima.lg.jp/584/machizukuri/sangyo/kigyo/2404021116.html',
  },
  // ───── 区市町村の独自制度（各公式サイトの検索結果をもとに2026年10月時点で確認。金額・期間が「要確認」のものは公式ページで必ず確認） ─────
  {
      "id": "sapporo-startup-location-hojo",
      "name": "スタートアップ立地促進補助金",
      "provider": "札幌市 経済観光局",
      "level": "municipality",
      "type": "補助金",
      "amount": "準備費 上限150万円、開設費 上限100万円（補助率・詳細は要確認）",
      "summary": "札幌で起業・移転・拠点開設を行うスタートアップの準備費と開設費を市が補助します。",
      "eligibility": [
          "札幌市内で起業・移転・拠点開設を行うスタートアップ",
          "要件の詳細は公募要領で要確認"
      ],
      "industries": "all",
      "prefectures": [
          "北海道"
      ],
      "cities": [
          "札幌市"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度の受付期間は要確認",
      "priority": 7,
      "url": "https://www2.city.sapporo.jp/invest/subsidy/startup.php"
  },
  {
      "id": "sendai-accelup-seicho-r8",
      "name": "令和8年度アクセル・アップ支援（成長促進補助金）",
      "provider": "仙台市",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助上限400万円（下限300万円）、補助率1/2（要確認）",
      "summary": "市内中小企業の成長に向けた事業（設備投資や販路拡大等）の経費の一部を市が補助します。対象事業は令和9年2月28日までの完了が必要です。",
      "eligibility": [
          "仙台市内の中小企業",
          "申請前に仙台市中小企業応援窓口（オーエン）への相談が必要"
      ],
      "industries": "all",
      "prefectures": [
          "宮城県"
      ],
      "cities": [
          "仙台市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（募集期間は公式ページで要確認）",
      "priority": 8,
      "url": "https://www.city.sendai.jp/kikakushien/r8accelup.html"
  },
  {
      "id": "sendai-clean-energy-vehicle-r8",
      "name": "仙台市事業所用クリーンエネルギー自動車等導入支援補助金",
      "provider": "仙台市",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認",
      "summary": "事業所で使用するクリーンエネルギー自動車等の導入費用を市が補助します。",
      "eligibility": [
          "仙台市内の事業所を有する事業者",
          "対象車種・補助額は公募要領で要確認"
      ],
      "industries": "all",
      "prefectures": [
          "宮城県"
      ],
      "cities": [
          "仙台市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年4月1日〜令和8年12月24日（申請受付期間）",
      "deadline": "2026-12-24",
      "priority": 6,
      "url": "https://www.city.sendai.jp/ondanka/jigyosha/actionprogram/hojokin/cevjidousya.html"
  },
  {
      "id": "chiba-chushokigyo-shikin-yushi",
      "name": "千葉市中小企業資金融資制度",
      "provider": "千葉市 経済農政局 経済部 産業支援課",
      "level": "municipality",
      "type": "融資",
      "amount": "要確認（資金ごとの限度額は令和8年4月版リーフレットで確認）。振興資金・小規模事業資金・経営安定資金は利子補給あり",
      "summary": "市内中小企業の運転・設備資金等を融資する制度です。令和8年度はモニタリング強化資金が創設されました。",
      "eligibility": [
          "千葉市内で事業を営む中小企業者",
          "資金ごとの要件は要確認"
      ],
      "industries": "all",
      "prefectures": [
          "千葉県"
      ],
      "cities": [
          "千葉市"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（通年）",
      "priority": 9,
      "url": "https://www.city.chiba.jp/keizainosei/keizai/sangyo/shikinyuushi.html"
  },
  {
      "id": "chiba-jinzai-ikusei-hojo",
      "name": "千葉市中小企業人材育成・能力開発推進支援補助金",
      "provider": "千葉市 経済農政局 経済部 産業支援課",
      "level": "municipality",
      "type": "補助金",
      "amount": "上限10万円（研修計画策定済）／上限5万円（未策定）（令和8年度の詳細は要確認）",
      "summary": "中小企業者が行う従業員の研修・能力開発の経費の一部を市が補助します。",
      "eligibility": [
          "千葉市内の中小企業者",
          "研修計画の策定有無で上限額が変わる"
      ],
      "industries": "all",
      "prefectures": [
          "千葉県"
      ],
      "cities": [
          "千葉市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（募集期間は要確認）",
      "priority": 6,
      "url": "https://www.city.chiba.jp/keizainosei/keizai/koyosuishin/chushokigyo-jinzaiikusei-hojokin.html"
  },
  {
      "id": "yokohama-shingijutsu-shinseihin-r8",
      "name": "中小企業新技術・新製品開発促進助成金（令和8年度）",
      "provider": "横浜市 経済局",
      "level": "municipality",
      "type": "助成金",
      "amount": "助成限度額1,000万円、助成率は算定基礎額の1/2または2/3",
      "summary": "市内中小企業の新技術・新製品の研究開発経費を助成します。事前相談が必須です。",
      "eligibility": [
          "横浜市内の中小企業",
          "事前相談が必須",
          "対象期間は令和8年4月1日〜令和9年1月31日"
      ],
      "industries": "all",
      "prefectures": [
          "神奈川県"
      ],
      "cities": [
          "横浜市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（申請期限 2026年6月4日。受付は終了の見込み）",
      "deadline": "2026-06-04",
      "priority": 7,
      "url": "https://www.city.yokohama.lg.jp/business/kigyoshien/keieishien/kaihatsu/gijutsu/kaihatsu.html"
  },
  {
      "id": "yokohama-sogyo-ouen-shikin",
      "name": "創業おうえん資金",
      "provider": "横浜市 経済局 金融課",
      "level": "municipality",
      "type": "融資",
      "amount": "融資限度額3,500万円以内、融資利率年2.3%以内、保証料0.1%助成（要確認）",
      "summary": "市内での創業時の初期資金を、原則無担保で融資する制度です。再挑戦の区分もあります。",
      "eligibility": [
          "横浜市内での創業予定者または創業間もない方",
          "詳細要件は要綱で要確認"
      ],
      "industries": "all",
      "prefectures": [
          "神奈川県"
      ],
      "cities": [
          "横浜市"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度（令和8年4月1日版要綱）",
      "priority": 8,
      "url": "https://www.city.yokohama.lg.jp/business/kigyoshien/yushiseido/yushiseido/yushi.html"
  },
  {
      "id": "kawasaki-shingijutsu-shinseihin-r8",
      "name": "川崎市新技術・新製品開発等支援事業補助金",
      "provider": "川崎市 経済労働局 経営支援課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助限度額（単年度）50万円以上200万円以内、補助率2分の1以内",
      "summary": "市内中小企業が行う新技術・新製品の事業化に向けた研究開発経費を補助します。",
      "eligibility": [
          "川崎市内の中小企業者等",
          "新技術・新製品の事業化に向けた研究開発であること"
      ],
      "industries": "all",
      "prefectures": [
          "神奈川県"
      ],
      "cities": [
          "川崎市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（募集期間4月1日〜4月20日。募集終了）",
      "deadline": "2026-04-20",
      "priority": 6,
      "url": "https://www.city.kawasaki.jp/280/page/0000184258.html"
  },
  {
      "id": "kawasaki-ganbaru-hanro-r8",
      "name": "がんばる中小企業応援補助金（販路開拓）",
      "provider": "川崎市 経済労働局 経営支援課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率2分の1以内（上限額は要確認）",
      "summary": "市内中小企業者等の販路開拓の取組に要する経費を補助します。",
      "eligibility": [
          "川崎市内の中小企業者等",
          "販路開拓の取組が対象"
      ],
      "industries": "all",
      "prefectures": [
          "神奈川県"
      ],
      "cities": [
          "川崎市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（募集期間4月1日〜4月30日。募集終了）",
      "deadline": "2026-04-30",
      "priority": 6,
      "url": "https://www.city.kawasaki.jp/280/page/0000113751.html"
  },
  {
      "id": "sagamihara-seisansei-kojo",
      "name": "中小企業生産性向上支援補助金",
      "provider": "相模原市 産業振興関係課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率：補助対象経費の3分の2以内、上限1,000万円（要確認）",
      "summary": "労働生産性の向上につながる設備投資を補助します。予算上限に達し次第終了です。",
      "eligibility": [
          "市内の中小企業者",
          "労働生産性向上につながる設備投資であること"
      ],
      "industries": "all",
      "prefectures": [
          "神奈川県"
      ],
      "cities": [
          "相模原市"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度の受付期間は要確認",
      "priority": 9,
      "url": "https://www.city.sagamihara.kanagawa.jp/sangyo/sangyo/1026664/1003291/josei/1035055.html"
  },
  {
      "id": "sagamihara-shoene-setsubi",
      "name": "中小規模事業者省エネルギー設備等導入支援補助",
      "provider": "相模原市 環境関係課",
      "level": "municipality",
      "type": "補助金",
      "amount": "上限100万円、補助率3分の1以内（要確認）",
      "summary": "省エネ設備や再エネ設備の導入費用の一部を補助します。",
      "eligibility": [
          "市内の中小規模事業者",
          "省エネアドバイザー等の派遣を受けたうえで地球温暖化対策計画書を提出すること（提出期限の要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "神奈川県"
      ],
      "cities": [
          "相模原市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年5月15日〜令和8年10月30日",
      "deadline": "2026-10-30",
      "priority": 7,
      "url": "https://www.city.sagamihara.kanagawa.jp/kurashi/1026489/kankyo/hojyo/1008084.html"
  },
  {
      "id": "sagamihara-chuso-yushi",
      "name": "相模原市 中小企業融資制度（令和8年度）",
      "provider": "相模原市 産業振興関係課",
      "level": "municipality",
      "type": "融資",
      "amount": "要確認（限度額・利率は案内PDFで未確認）",
      "summary": "市と金融機関、神奈川県信用保証協会が連携し、市内で事業を営む、または営む予定の中小企業者に低利の融資を行います。",
      "eligibility": [
          "市内で事業を営む、または営む予定の中小企業者",
          "金融機関・神奈川県信用保証協会の審査を経ること"
      ],
      "industries": "all",
      "prefectures": [
          "神奈川県"
      ],
      "cities": [
          "相模原市"
      ],
      "stages": [
          "planning",
          "early",
          "established"
      ],
      "period": "令和8年度（通年または要確認）",
      "priority": 7,
      "url": "https://www.city.sagamihara.kanagawa.jp/_res/projects/default_project/_project_/00_common/yuusiseido_annai.pdf"
  },
  {
      "id": "saitama-chuso-yushi",
      "name": "さいたま市中小企業融資制度",
      "provider": "さいたま市 産業支援担当課",
      "level": "municipality",
      "type": "融資",
      "amount": "要確認（融資限度額は未確認。令和8年10月1日受付分から利率改定：中口資金 1.70%→1.90%、小口資金 1.0%→1.20%）",
      "summary": "市が金融機関と連携し、市内で事業を営む中小企業者及び創業者に経営の安定・向上に必要な資金を低利で融資します。",
      "eligibility": [
          "市内で事業を営む中小企業者",
          "市内で事業を始めようとする創業者"
      ],
      "industries": "all",
      "prefectures": [
          "埼玉県"
      ],
      "cities": [
          "さいたま市"
      ],
      "stages": [
          "planning",
          "early",
          "established"
      ],
      "period": "令和8年度（令和8年10月1日受付分から利率改定）",
      "priority": 8,
      "url": "https://www.city.saitama.lg.jp/005/002/010/001/p056580.html"
  },
  {
      "id": "niigata-keieishien-tokubetsu",
      "name": "新潟市 経営支援特別融資（物価高騰・能登半島地震対応枠）",
      "provider": "新潟市 商工関係課",
      "level": "municipality",
      "type": "融資",
      "amount": "要確認（融資限度額は未確認。保証料補助：融資額300万円以内は100%、300万円超1,000万円以内は50%）",
      "summary": "物価高騰・能登半島地震の影響で売上等が減少した市内中小企業の資金調達を支援します。対応枠は令和9年3月31日実行分まで延長されています。",
      "eligibility": [
          "市税を完納していること",
          "直近3か月の売上等が一定割合以上減少していること",
          "信用保証協会の保証を受けること"
      ],
      "industries": "all",
      "prefectures": [
          "新潟県"
      ],
      "cities": [
          "新潟市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（令和9年3月31日実行分まで）",
      "deadline": "2027-03-31",
      "priority": 8,
      "url": "https://www.city.niigata.lg.jp/business/shoko/jorei/yushi/kashituske/seidoyushi/tokubetu.html"
  },
  {
      "id": "niigata-kaigyo-shikin",
      "name": "新潟市 中小企業開業資金",
      "provider": "新潟市 商工関係課",
      "level": "municipality",
      "type": "融資",
      "amount": "要確認（保証料補助の対象借入限度額は2,000万円まで拡大との案内。特定創業支援等事業を受けた方は3年間の利子を市が全額負担との案内）",
      "summary": "創業する方や創業間もない方の開業資金を支援します。特定創業支援等事業を受けた方は利子負担の優遇があります。",
      "eligibility": [
          "新潟市内で創業する方、または創業間もない方",
          "特定創業支援等事業を受けた方は利子負担の優遇あり（要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "新潟県"
      ],
      "cities": [
          "新潟市"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度（通年または要確認）",
      "priority": 7,
      "url": "https://www.city.niigata.lg.jp/business/shoko/jorei/yushi/kashituske/seidoyushi/shogyo20230401.html"
  },
  {
      "id": "shizuoka-kikai-setsubi",
      "name": "中小企業事業高度化機械設備設置事業補助金",
      "provider": "静岡市 経済局商工部産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率5〜15%（要件による）、上限500万円〜750万円（要確認）",
      "summary": "市内に製造拠点を持つ中小製造事業者が機械設備を設置する費用を補助します。他の補助金との併用はできません。",
      "eligibility": [
          "市内に製造拠点を持つ中小製造事業者",
          "令和8年4月1日から令和9年3月末までに支払いを終えるものに限る",
          "他の補助金との併用不可"
      ],
      "industries": "all",
      "prefectures": [
          "静岡県"
      ],
      "cities": [
          "静岡市"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度 申請受付は5月12日から（終了日は要確認）",
      "priority": 9,
      "url": "https://www.city.shizuoka.lg.jp/s2746/s003785.html"
  },
  {
      "id": "shizuoka-dx-jinzai",
      "name": "中小企業DX人材等育成支援事業補助金",
      "provider": "静岡市 経済局商工部産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "上限10万円（補助率は要確認）",
      "summary": "社員に研修を受けさせる経費を補助します。対象研修は県立の工科短期大学校、ポリテクセンター、県産業振興財団などの研修です。",
      "eligibility": [
          "市内の中小企業（要確認）",
          "対象研修を受講させる事業者"
      ],
      "industries": "all",
      "prefectures": [
          "静岡県"
      ],
      "cities": [
          "静岡市"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度 交付申請受付中（終了日は要確認）",
      "priority": 7,
      "url": "https://www.city.shizuoka.lg.jp/s2746/s013081.html"
  },
  {
      "id": "shizuoka-keizai-henka-rishi",
      "name": "静岡市経済変動対策資金特別利子助成金",
      "provider": "静岡市 経済局商工部産業振興課",
      "level": "municipality",
      "type": "助成金",
      "amount": "要確認（助成率・上限は未確認）",
      "summary": "経済変動対策資金の利子負担を助成します。令和8年10月1日から受付が始まっています。",
      "eligibility": [
          "静岡市経済変動対策資金の利用者（要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "静岡県"
      ],
      "cities": [
          "静岡市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年10月1日より受付開始（終了日は要確認）",
      "priority": 8,
      "url": "https://www.city.shizuoka.lg.jp/s2746/s003782.html"
  },
  {
      "id": "hamamatsu-kokunai-tokkyo",
      "name": "浜松市国内特許等出願費補助金",
      "provider": "浜松市 産業振興関係課",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認（補助率・上限は未確認）",
      "summary": "市内に事業所を持つ中小企業者などが行う国内特許等の出願費用を補助します。事前ヒアリングがあります。",
      "eligibility": [
          "市内に事業所を持つ中小企業者など",
          "事前ヒアリングを受けること"
      ],
      "industries": "all",
      "prefectures": [
          "静岡県"
      ],
      "cities": [
          "浜松市"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年8月3日〜令和8年11月13日 午後5時必着",
      "deadline": "2026-11-13",
      "priority": 10,
      "url": "https://www.city.hamamatsu.shizuoka.jp/sangyoshinko/kaigai/hojyokin.html"
  },
  {
      "id": "nagoya-customer-harassment-support",
      "name": "中小企業カスタマーハラスメント対策支援補助金",
      "provider": "名古屋市 経済局 産業労働部 労働企画課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率：補助対象経費の1/2以内。補助限度額：5万円から30万円以内",
      "summary": "カスタマーハラスメント対策に取り組む市内中小企業者が、管理用カメラや通話録音装置の導入費、対応マニュアル作成の謝金などを補助します。",
      "eligibility": [
          "名古屋市内の中小企業者（令和8年度からは従業員を雇用していない事業者も対象）",
          "申請前にセミナーの受講と個別相談を受けていること",
          "予算上限に達し次第受付終了"
      ],
      "industries": "all",
      "prefectures": [
          "愛知県"
      ],
      "cities": [
          "名古屋市"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年6月22日（月）〜令和8年10月30日（金）17時",
      "deadline": "2026-10-30",
      "priority": 9,
      "url": "https://www.city.nagoya.jp/jigyou/sangyou/1026356/1026425/1040789/1035725.html"
  },
  {
      "id": "sakai-dx-reskilling",
      "name": "堺市中小企業DXリスキリング補助金（令和8年度）",
      "provider": "堺市 産業振興局 産業戦略部 地域産業創造課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率1/2以内。補助額：下限2万円、上限20万円（予算の範囲内で交付）",
      "summary": "市内の中小企業者が、社員のDX関連リスキリングのために受講する研修費用を補助します。",
      "eligibility": [
          "堺市内に事業所があり、引き続き1年以上事業を行っている中小企業者等",
          "受講予定講座の開始予定日の1か月前までに申請すること",
          "交付決定日より前に受講したものは対象外"
      ],
      "industries": "all",
      "prefectures": [
          "大阪府"
      ],
      "cities": [
          "堺市"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年5月1日〜令和9年1月29日（予算がなくなり次第終了）",
      "deadline": "2027-01-29",
      "priority": 10,
      "url": "https://www.city.sakai.lg.jp/sangyo/shienyuushi/dx_shien/reskilling.html"
  },
  {
      "id": "osaka-innovation-subsidy",
      "name": "大阪市イノベーション創出支援補助金（令和8年度）",
      "provider": "大阪市 経済戦略局 産業振興部 企業支援課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率：補助対象経費の1/2。補助金上限額：200万円（要確認）",
      "summary": "大学等と連携した産学連携の研究開発を行う市内企業を支援します。",
      "eligibility": [
          "大阪市内の事業者",
          "大学等と連携した研究開発であること",
          "詳細な対象要件は公式要綱で要確認"
      ],
      "industries": "all",
      "prefectures": [
          "大阪府"
      ],
      "cities": [
          "大阪市"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "要確認（令和8年度の募集期間は公式ページで要確認）",
      "priority": 8,
      "url": "https://www.city.osaka.lg.jp/keizaisenryaku/page/0000668847.html"
  },
  {
      "id": "osaka-setsubi-oen-loan",
      "name": "大阪市設備投資応援融資",
      "provider": "大阪市 経済戦略局 産業振興部 企業支援課資金支援担当",
      "level": "municipality",
      "type": "融資",
      "amount": "融資利率：要確認（案内は年1.25%以下、要綱は年1.0%以下と記載が不一致）。信用保証料：年0.7%（大阪信用保証協会所定）。融資限度額は要確認",
      "summary": "経営基盤の強化に必要な設備を導入する市内中小企業者に対し、大阪信用保証協会の保証付きで設備資金を融資します。",
      "eligibility": [
          "大阪市内の中小企業者",
          "経営基盤の強化に必要な設備導入であること",
          "希望する金融機関を通じて申込む"
      ],
      "industries": "all",
      "prefectures": [
          "大阪府"
      ],
      "cities": [
          "大阪市"
      ],
      "stages": [
          "established"
      ],
      "period": "要確認（随時受付か期間指定かは公式ページで要確認）",
      "priority": 8,
      "url": "https://www.city.osaka.lg.jp/keizaisenryaku/page/0000445555.html"
  },
  {
      "id": "kyoto-energy-renovation",
      "name": "京都市中小事業者の省エネリノベーション支援事業補助金（令和8年度7月補正予算事業）",
      "provider": "京都市 環境政策局",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率：3分の1（要確認）。上限200万円（要確認）。下限20万円（前回募集の数値）",
      "summary": "物価高騰対策として、空調・照明・給湯・冷凍冷蔵設備の省エネ改修を行う京都市内の中小事業者を支援します。",
      "eligibility": [
          "中小企業者、社会福祉法人、医療法人、学校法人等",
          "予算の範囲内で先着順"
      ],
      "industries": "all",
      "prefectures": [
          "京都府"
      ],
      "cities": [
          "京都市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年8月12日付の公式お知らせによる受付。受付期間は先着順（開始日は要確認）",
      "priority": 9,
      "url": "https://www.city.kyoto.lg.jp/kankyo/page/0000356906.html"
  },
  {
      "id": "kyoto-chuto-oen-loan",
      "name": "京都市 小規模企業おうえん資金（中東情勢対応枠）",
      "provider": "京都市 産業観光局 中小企業支援課",
      "level": "municipality",
      "type": "融資",
      "amount": "無担保2,000万円、金利1.2%（要確認）",
      "summary": "中東情勢の影響で売上高等の減少が見込まれる京都市内の小規模事業者が、資金繰りのために借入れできます。",
      "eligibility": [
          "京都市内の小規模事業者",
          "中東情勢の影響で売上高等の減少が見込まれること（詳細要件は要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "京都府"
      ],
      "cities": [
          "京都市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（受付期間は公式ページで要確認）",
      "priority": 7,
      "url": "https://www.city.kyoto.lg.jp/sankan/page/0000356045.html"
  },
  {
      "id": "kobe-investment-promotion",
      "name": "神戸市中小企業投資促進等助成制度（令和8年度版）",
      "provider": "神戸市 産業振興関係局",
      "level": "municipality",
      "type": "助成金",
      "amount": "2025年度版の数値（令和8年度版の条件は要確認）：一般の設備投資は対象事業費1,000万円以上で助成率10%以内、限度額500万円。IoT・AI・ロボット導入は助成率3分の1以内、限度額1,000万円",
      "summary": "技術力や生産性の向上、受注拡大、研究開発機能の強化に向けて設備投資等を行う神戸市内事業者を支援します。",
      "eligibility": [
          "神戸市内で設備投資等を行う事業者",
          "令和8年度の詳細要件は公式ページで要確認"
      ],
      "industries": "all",
      "prefectures": [
          "兵庫県"
      ],
      "cities": [
          "神戸市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度版ページあり。受付期間は要確認",
      "priority": 7,
      "url": "https://www.city.kobe.lg.jp/a93457/business/sangyoshinko/shokogyo/venture/monodukuri/toshisokushin/index.html"
  },
  {
      "id": "kobe-energy-equipment-upgrade",
      "name": "神戸市省エネ設備更新補助金（国の交付金を活用した物価高対策）",
      "provider": "神戸市",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認",
      "summary": "国の交付金を活用した物価高対策として、市内事業者の省エネ設備更新費用を補助します。",
      "eligibility": [
          "神戸市内の事業者（詳細要件は要確認）",
          "第1期は予算上限に達して締切、第2期の受付あり"
      ],
      "industries": "all",
      "prefectures": [
          "兵庫県"
      ],
      "cities": [
          "神戸市"
      ],
      "stages": [
          "established"
      ],
      "period": "第2期：令和8年8月3日から受付開始（終了日は要確認）",
      "priority": 7,
      "url": "https://www.city.kobe.lg.jp/a57337/bukkadaka.html"
  },
  {
      "id": "okayama-dx-suishin",
      "name": "岡山市DX推進事業補助金（令和8年度）",
      "provider": "岡山市 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認（令和7年度の導入事業は上限750万円・補助率1/3。令和8年度の補助率・上限は未確認）",
      "summary": "企業変革に資するデジタルサービスの実装など、市内中小企業のDX取組を補助します。",
      "eligibility": [
          "市内中小企業者（詳細は募集要領で要確認）",
          "企業変革に資するデジタルサービスの実装を行うこと"
      ],
      "industries": "all",
      "prefectures": [
          "岡山県"
      ],
      "cities": [
          "岡山市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（申請者募集中。締切は10月15日とされている）",
      "deadline": "2026-10-15",
      "priority": 10,
      "url": "https://www.city.okayama.jp/jigyosha/category/5-7-15-6-23-0-0-0-0-0.html"
  },
  {
      "id": "okayama-jigyo-shokei-shien",
      "name": "岡山市事業承継支援補助金",
      "provider": "岡山市 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率3分の2以内、補助限度額100万円",
      "summary": "事業承継に取り組む市内中小企業者の経費の一部を補助します。",
      "eligibility": [
          "事業承継に取り組む中小企業者（詳細は要綱で要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "岡山県"
      ],
      "cities": [
          "岡山市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（受付中との記載あり。受付期限は未確認）",
      "priority": 8,
      "url": "https://www.city.okayama.jp/jigyosha/0000071629.html"
  },
  {
      "id": "kumamoto-shotengai-shutsuten",
      "name": "熊本市商店街出店支援事業（令和8年度）",
      "provider": "熊本市 所管課（要確認）",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率1/2以内、補助上限50万円（各支援区分とも）",
      "summary": "商店街の空き店舗等への出店に伴う改装費等を補助します。",
      "eligibility": [
          "商店街の空き店舗等への出店を行う事業者（詳細は要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "熊本県"
      ],
      "cities": [
          "熊本市"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度 二次募集 2026年10月2日〜10月23日（17時必着）",
      "deadline": "2026-10-23",
      "priority": 9,
      "url": "https://www.city.kumamoto.jp/kiji00338591/index.html"
  },
  {
      "id": "kumamoto-hojokin-katsuyo-yushi",
      "name": "熊本市中小企業補助金活用支援資金（制度融資）",
      "provider": "熊本市 商業金融課（要確認）",
      "level": "municipality",
      "type": "融資",
      "amount": "要確認（融資限度額・利率は未確認。信用保証料率の3/4を市が助成）",
      "summary": "生産性向上や賃上げに取り組む事業者が補助金を活用する際の資金調達を支援し、信用保証料を助成します。",
      "eligibility": [
          "生産性向上や賃上げに取り組む中小企業者（詳細は要確認）",
          "熊本市中小企業融資制度の要件を満たすこと（要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "熊本県"
      ],
      "cities": [
          "熊本市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度 取扱継続（予算に達し次第終了の場合あり）",
      "priority": 8,
      "url": "https://www.city.kumamoto.jp/kiji003485/index.html"
  },
  {
      "id": "kumamoto-kenshu-haken",
      "name": "熊本市 中小企業研修派遣助成制度（令和8年度）",
      "provider": "熊本市 所管課（要確認）",
      "level": "municipality",
      "type": "助成金",
      "amount": "受講料（税抜）の1/2以内、上限3万円（1事業者につき年度内1回）",
      "summary": "中小企業大学校やポリテクセンター熊本の研修受講料を助成します。",
      "eligibility": [
          "中小企業者（詳細は要確認）",
          "1事業者につき年度内1回限り"
      ],
      "industries": "all",
      "prefectures": [
          "熊本県"
      ],
      "cities": [
          "熊本市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年4月6日〜令和9年3月24日（予算に達し次第終了）",
      "deadline": "2027-03-24",
      "priority": 6,
      "url": "https://www.city.kumamoto.jp/kiji003757/index.html"
  },
  {
      "id": "kitakyushu-seisansei-chingin-hojo",
      "name": "北九州市生産性向上・賃金引上げ応援補助金（令和8年度）",
      "provider": "北九州市 産業経済局 雇用・産業人材政策課",
      "level": "municipality",
      "type": "補助金",
      "amount": "業務改善に要する設備投資等の補助対象経費の最大2/10（国・市合計で対象経費の95%が上限）",
      "summary": "生産性の向上と従業員の賃金引上げに取り組む市内中小企業の業務改善設備投資等を補助します。",
      "eligibility": [
          "市内中小企業",
          "令和7年4月1日以降に福岡労働局から交付決定通知を受けていること等（要綱で要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "福岡県"
      ],
      "cities": [
          "北九州市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年5月1日〜令和9年3月5日（必着。予算の範囲内で受付終了の場合あり）",
      "deadline": "2027-03-05",
      "priority": 10,
      "url": "https://www.city.kitakyushu.lg.jp/contents/09801348.html"
  },
  {
      "id": "kitakyushu-seisansei-chingin-shorei",
      "name": "北九州市生産性向上・賃金引上げ奨励金（令和8年度）",
      "provider": "北九州市 産業経済局 雇用・産業人材政策課",
      "level": "municipality",
      "type": "助成金",
      "amount": "10万円×引き上げる労働者数（1事業者あたり上限50万円）",
      "summary": "事業場内最低賃金を70円以上引き上げた事業者に、引き上げる労働者数に応じて奨励金を支給します。",
      "eligibility": [
          "事業場内最低賃金を70円以上引き上げた事業者"
      ],
      "industries": "all",
      "prefectures": [
          "福岡県"
      ],
      "cities": [
          "北九州市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（期間の詳細は要確認）",
      "priority": 9,
      "url": "https://www.city.kitakyushu.lg.jp/contents/09801348.html"
  },
  {
      "id": "hiroshima-chinzan-jinzai",
      "name": "令和8年度 広島市中山間地域における中小企業の人材確保支援事業",
      "provider": "広島市 経済観光局 中小企業支援課（要確認）",
      "level": "municipality",
      "type": "助成金",
      "amount": "要確認（上限額・補助率は未確認）",
      "summary": "中山間地域に立地する中小企業の人材確保（採用や職場環境改善）を支援します。",
      "eligibility": [
          "中山間地域に立地する中小企業（詳細は要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "広島県"
      ],
      "cities": [
          "広島市"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年4月1日〜令和9年1月29日（職場環境改善分は予算終了により受付終了）",
      "deadline": "2027-01-29",
      "priority": 6,
      "url": "https://www.city.hiroshima.lg.jp/business/sangyo/1021490/1024252/1017530.html"
  },
  {
      "id": "hiroshima-seisansei-challenge",
      "name": "2026広島市生産性向上等チャレンジ応援金",
      "provider": "広島市 経済観光局 中小企業支援課（要確認）",
      "level": "municipality",
      "type": "補助金",
      "amount": "上限200万円、対象経費の4分の3（事業完了後の支払い、審査あり）",
      "summary": "賃上げに取り組む地域の中小企業による生産性向上の取組費用を支援します。",
      "eligibility": [
          "広島市内の中小企業（賃上げ・生産性向上の取組を行うこと）"
      ],
      "industries": "all",
      "prefectures": [
          "広島県"
      ],
      "cities": [
          "広島市"
      ],
      "stages": [
          "established"
      ],
      "period": "申請期間 令和8年5月11日〜6月19日（受付終了）",
      "deadline": "2026-06-19",
      "priority": 6,
      "url": "https://www.city.hiroshima.lg.jp/business/sangyo/1021490/1024252/1017503.html"
  },
  {
      "id": "fukuoka-sougyou-shikin",
      "name": "福岡市 創業支援資金（中小企業サポートセンター）",
      "provider": "福岡市 経済観光文化局 中小企業サポートセンター（要確認）",
      "level": "municipality",
      "type": "融資",
      "amount": "要確認（旧掲載情報では融資限度額3,500万円、融資期間10年以内。掲載が古く最新条件は要確認）",
      "summary": "創業者向けの市の制度融資。創業に必要な資金の融資を行います。",
      "eligibility": [
          "創業者（詳細条件は要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "福岡県"
      ],
      "cities": [
          "福岡市"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度（通年の取扱とみられるが要確認）",
      "priority": 7,
      "url": "https://www.city.fukuoka.lg.jp/keizai/keieishien/business/syohizei_2_2_4.html"
  },
  {
      "id": "chiyoda-hanrokakudai",
      "name": "中小企業販路拡大事業支援補助（展示会出展に対する補助金）",
      "provider": "千代田区 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率：補助対象経費の3分の2（千円未満切捨て）。補助限度額：10万円（条件を満たす場合は20万円）",
      "summary": "区内中小企業者が販路拡大のために展示会等へ出展する際の出展経費の一部を補助します。申請は事業者ポータルサイトからのオンライン申請です。",
      "eligibility": [
          "区内に事業所を有する中小企業者",
          "展示会等への出展による販路拡大を目的とすること"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "千代田区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（オンライン申請。受付期間は要確認）",
      "priority": 8,
      "url": "https://www.city.chiyoda.lg.jp/koho/shigoto/jigyosho/josei/hanrokakudai.html"
  },
  {
      "id": "chiyoda-zaisanshutoku",
      "name": "産業財産権取得支援事業",
      "provider": "千代田区 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助対象経費の2分の1、または補助限度額20万円のいずれか低い額（令和8年度の適用条件は要確認）",
      "summary": "区内中小企業者が特許・商標・意匠などの産業財産権を取得する際の費用の一部を補助します。",
      "eligibility": [
          "区内に事業所を有する中小企業者",
          "産業財産権の取得費用が対象"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "千代田区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（要確認）",
      "priority": 7,
      "url": "https://www.city.chiyoda.lg.jp/koho/shigoto/jigyosho/josei/zaisanshutoku.html"
  },
  {
      "id": "chiyoda-shotengai-sogyo",
      "name": "商店街区域での創業者向け補助金（千代田区創業支援事業）",
      "provider": "千代田区 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認（資料により記載が異なる。2024年版ガイドブックでは50万円の記載あり。最新の額は窓口で要確認）",
      "summary": "区内の商店街区域で創業し、商店街で活動する事業者の創業経費（商店街会費、人件費、備品・消耗品費、内装工事費など）の一部を補助します。",
      "eligibility": [
          "区内の商店街区域で創業する者",
          "特定創業支援事業の証明書の有無により限度額区分あり"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "千代田区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度（要確認）",
      "priority": 6,
      "url": "https://www.city.chiyoda.lg.jp/documents/18295/2024guidebook7.pdf"
  },
  {
      "id": "chiyoda-shoken-yushi",
      "name": "千代田区商工融資あっせん制度（含 特別資金）",
      "provider": "千代田区 産業振興課",
      "level": "municipality",
      "type": "融資",
      "amount": "区・信用保証協会・指定金融機関の協調による融資あっせん。利子補給と信用保証料の補助あり。上限額・利率は資金ごとに要確認",
      "summary": "区内中小企業者の経営安定化のため、営業資金・設備資金・小規模企業特別資金・起業資金などを区が融資あっせんし、利子と信用保証料の一部を補助します。",
      "eligibility": [
          "区内に本店または事務所を有する中小企業者",
          "資金ごとに利用条件が異なる"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "千代田区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "通年（令和8年度の受付条件は要確認）",
      "priority": 7,
      "url": "https://www.city.chiyoda.lg.jp/koho/shigoto/jigyosho/yushi/assen/joken.html"
  },
  {
      "id": "chuo-tenjikai-shimo",
      "name": "展示会出展費用の補助（令和8年度下半期分）",
      "provider": "中央区 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率：対象経費の3分の2。上限：30万円",
      "summary": "区内中小企業者等が販路拡大のために展示会等へ出展する際の出展経費の一部を補助します。先着順で、予算がなくなり次第終了します。",
      "eligibility": [
          "区内の中小企業者等",
          "展示会等への出展による販路拡大を目的とすること",
          "先着順・予算上限あり"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "中央区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年9月1日〜令和9年2月26日（下半期）",
      "deadline": "2027-02-26",
      "priority": 9,
      "url": "https://www.city.chuo.lg.jp/a0016/shigoto/kigyoushien/hojokin/tenjikaihojo.html"
  },
  {
      "id": "chuo-gijutsusha-kenshu",
      "name": "中小企業技術者の高度研修受講助成",
      "provider": "中央区 産業振興課",
      "level": "municipality",
      "type": "助成金",
      "amount": "助成率：研修受講料の2分の1（千円未満切捨て）。限度額：10万円",
      "summary": "区内中小企業の技術者が高度な研修を受講する際の受講料の一部を助成します。",
      "eligibility": [
          "区内の中小企業者",
          "技術者が高度な研修を受講すること"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "中央区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（申請期間は令和9年1月29日まで）",
      "deadline": "2027-01-29",
      "priority": 7,
      "url": "https://www.city.chuo.lg.jp/a0016/shigoto/kigyoushien/hojokin/chuushoukigyou_koudokenshujosei.html"
  },
  {
      "id": "chuo-homepage-hojo",
      "name": "中小企業のホームページ作成費用補助（下半期分）",
      "provider": "中央区 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認（補助率・上限額は公式ページで確認が必要）",
      "summary": "区内中小企業者がホームページを作成する費用の一部を補助します。上半期分は受付終了。下半期分は令和8年10月1日から受付の案内があります。",
      "eligibility": [
          "区内の中小企業者",
          "ホームページ作成費用が対象"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "中央区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年10月1日より受付（下半期分）",
      "priority": 6,
      "url": "https://www.city.chuo.lg.jp/a0016/shigoto/kigyoushien/hojokin/shoukan.html"
  },
  {
      "id": "chuo-shogyo-yushi",
      "name": "中央区商工業融資（制度融資・あっせん融資）令和8年度",
      "provider": "中央区 産業振興課",
      "level": "municipality",
      "type": "融資",
      "amount": "利子補給により低利で借りられるあっせん融資。融資利率は年2.0%との案内あり（要確認）。経営改善支援資金は令和8年8月3日から限度額が拡充",
      "summary": "区が金融機関に融資をあっせんし、利子補給で低利化した事業資金を区内中小企業者に提供します。",
      "eligibility": [
          "区内で事業を営む中小企業者",
          "資金メニューごとに条件あり"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "中央区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度",
      "priority": 8,
      "url": "https://www.city.chuo.lg.jp/documents/4383/r8yuushipanhu.pdf"
  },
  {
      "id": "minato-ondanka-josei",
      "name": "地球温暖化対策助成制度（令和8年度・中小企業者向け）",
      "provider": "港区 環境課",
      "level": "municipality",
      "type": "助成金",
      "amount": "事業所用高効率空調機器：上限50万円。省エネ診断に基づく設備改修（LED照明など）：上限100万円",
      "summary": "区内中小企業者が高効率空調機器の導入や省エネ診断に基づく設備改修を行う際の経費を助成します。工事着工前の申請が必要です。",
      "eligibility": [
          "区内の中小企業者",
          "工事着工前に申請すること",
          "省エネ診断に基づく改修は診断結果が要件"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "港区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年4月1日〜令和9年1月29日",
      "deadline": "2027-01-29",
      "priority": 8,
      "url": "https://www.city.minato.tokyo.jp/chikyukankyou/kankyo-machi/kankyo/hojo/index.html"
  },
  {
      "id": "minato-kosodate-shorei",
      "name": "港区中小企業子育て支援奨励金",
      "provider": "港区 産業・雇用担当",
      "level": "municipality",
      "type": "助成金",
      "amount": "1事業主あたり、対象従業員1人を限度として15万円を交付",
      "summary": "従業員が6か月以上育児休業を取得した区内中小企業に対し奨励金を交付します。",
      "eligibility": [
          "区内の中小企業",
          "従業員が6か月以上の育児休業を取得したこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "港区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（受付期間は要確認）",
      "priority": 6,
      "url": "https://www.city.minato.tokyo.jp/jinken/kosodateshoureikin.html"
  },
  {
      "id": "minato-sogyo-yushi",
      "name": "港区中小企業融資あっせん制度（創業支援融資）",
      "provider": "港区 産業振興課 経営支援係",
      "level": "municipality",
      "type": "融資",
      "amount": "融資限度額1,500万円（初売上前の場合は1,000万円以内）。本人利子負担率0.2%。再エネ100%電力への切替えで利子補給の上乗せあり",
      "summary": "区内で創業する前、または創業後最初の売上発生日から1年未満の事業者に、運転・設備資金を融資します。",
      "eligibility": [
          "区内で創業しようとする者、または創業後1年未満の者",
          "再エネ電力切替えの利子補給上乗せは別途条件あり"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "港区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度（要確認）",
      "priority": 8,
      "url": "https://www.city.minato.tokyo.jp/sangyousinkou/sangyo/chushokigyo/sogyo/"
  },
  {
      "id": "shinjuku-energy-jigyosho",
      "name": "新宿区省エネルギー及び創エネルギー機器等補助制度（事業所向け）",
      "provider": "新宿区 文化観光産業部 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "太陽光発電：1kWあたり10万円、上限80万円。LED照明・高効率空調：施工経費（税抜）の50%、上限25万円。再エネ電力導入の場合はLED・空調を補助率70%、上限50万円",
      "summary": "事業所に省エネ・創エネ機器を設置する費用の一部を補助します。施工と支払いが完了した後に申請し、先着順で各期の予算上限に達した時点で終了します。",
      "eligibility": [
          "区内の事業所",
          "施工・支払い完了後に申請",
          "再エネ引き上げは再エネ比率50%以上などの要件あり"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "新宿区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年4月1日〜令和9年3月12日（補助対象期間）。令和8年度は4期に分けて受付",
      "deadline": "2027-03-12",
      "priority": 9,
      "url": "https://www.city.shinjuku.lg.jp/seikatsu/shoenergy_R80401.html"
  },
  {
      "id": "shinjuku-sogyo-yushi",
      "name": "新宿区創業資金融資（創業等支援融資制度）",
      "provider": "新宿区 文化観光産業部 産業振興課",
      "level": "municipality",
      "type": "融資",
      "amount": "貸付限度額：原則2,000万円。貸付期間：7年以内。利子と信用保証料の一部を区が補助",
      "summary": "区内で創業する人、または創業5年未満の人に創業資金を融資し、利子・信用保証料の一部を補助します。",
      "eligibility": [
          "区内で創業する者、または創業5年未満の者"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "新宿区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度（要確認）",
      "priority": 9,
      "url": "https://www.city.shinjuku.lg.jp/jigyo/sangyo01_000110.html"
  },
  {
      "id": "shinjuku-akiten-yushi",
      "name": "商店街空き店舗活用支援資金（区制度融資）",
      "provider": "新宿区 文化観光産業部 産業振興課",
      "level": "municipality",
      "type": "融資",
      "amount": "利子と信用保証料を全額区が補助。融資限度額は要確認",
      "summary": "空き店舗で創業する事業者を対象に、資金調達を支援する区の融資制度です。",
      "eligibility": [
          "区内の空き店舗で創業する事業者"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "新宿区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度（要確認）",
      "priority": 6,
      "url": "https://www.city.shinjuku.lg.jp/jigyo/sangyo01_002197.html"
  },
  {
      "id": "shinjuku-shotengai-ecoshien",
      "name": "にぎわいにあふれ環境にもやさしい商店街支援事業補助金",
      "provider": "新宿区 文化観光産業部 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認（イベント・地域力向上・活性化・環境の各事業ごとに補助率と上限額が定められている）",
      "summary": "商店街振興組合や任意商店会が行うイベント、地域力向上、活性化、環境に関する事業の経費を補助します。",
      "eligibility": [
          "商店街振興組合または任意商店会",
          "事業区分ごとの要件あり"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "新宿区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（要確認）",
      "priority": 6,
      "url": "https://www.city.shinjuku.lg.jp/jigyo/file07_00001.html"
  },
  {
      "id": "bunkyo-startup-hojo",
      "name": "文京区スタートアップ支援事業補助金",
      "provider": "文京区 経済課",
      "level": "municipality",
      "type": "補助金",
      "amount": "事務所等の家賃の一部を補助（月額上限5万円、最長12か月）。あわせて専門家による無料経営相談あり",
      "summary": "区内に事務所等を置くスタートアップ事業者の家賃負担を軽減し、専門家による経営相談を提供します。",
      "eligibility": [
          "区内に事務所等を置く事業者（スタートアップ）",
          "申請期間内の申請が必要"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "文京区"
      ],
      "stages": [
          "early"
      ],
      "period": "令和8年9月1日〜令和8年10月16日",
      "deadline": "2026-10-16",
      "priority": 10,
      "url": "https://www.city.bunkyo.lg.jp/b012/p007765.html"
  },
  {
      "id": "bunkyo-reskilling-hojo",
      "name": "文京区中小企業人材強化支援事業補助金（リスキリング）",
      "provider": "文京区 経済課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率：2分の1。上限：1社あたり10万円",
      "summary": "従業員の講座受講や資格取得費用を補助します。令和8年度から代表者・役員も対象になりました。",
      "eligibility": [
          "区内の中小企業者",
          "従業員に加え代表者・役員の講座受講・資格取得も対象（令和8年度から）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "文京区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（申請件数が予算額に達するまで随時受付）",
      "priority": 7,
      "url": "https://www.city.bunkyo.lg.jp/b012/p005129.html"
  },
  {
      "id": "bunkyo-jigyo-shokei",
      "name": "文京区事業承継総合支援事業",
      "provider": "文京区 経済課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率：対象経費の3分の2。上限：100万円（設備投資補助）",
      "summary": "事業承継に伴う設備投資等の経費の一部を補助します。M&Aによる承継は対象外です。",
      "eligibility": [
          "区内の中小企業者（事業承継を行う者）",
          "区の中小企業診断士による支援の受け入れなどが要件",
          "M&Aによる承継は対象外"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "文京区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年4月1日〜令和9年3月31日",
      "deadline": "2027-03-31",
      "priority": 7,
      "url": "https://www.city.bunkyo.lg.jp/b012/p007798.html"
  },
  {
      "id": "bunkyo-yushi-assen",
      "name": "文京区中小企業向け融資あっせん制度（令和8年度）",
      "provider": "文京区 経済課",
      "level": "municipality",
      "type": "融資",
      "amount": "一般運転資金：融資限度額1,500万円以内、利率1.9%（区の案内パンフレットによる）",
      "summary": "区が金融機関に融資をあっせんし、利子補給により低利で事業資金を提供します。窓口相談は事前予約制です。",
      "eligibility": [
          "区内で事業を営む中小企業者",
          "資金メニューごとに条件あり",
          "窓口相談は事前予約制（東京商工会議所文京支部）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "文京区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度",
      "priority": 7,
      "url": "https://www.city.bunkyo.lg.jp/b012/p005172.html"
  },
  {
      "id": "bunkyo-ninshou-hojo",
      "name": "文京区各種認証取得費等補助金",
      "provider": "文京区 経済課",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認（ISO・Pマーク等の認証取得・更新費用の一部を補助。補助率・上限額は公式ページで確認が必要）",
      "summary": "ISOやPマークなどの認証取得・更新にかかる費用の一部を補助します。",
      "eligibility": [
          "区内に登記上の本店または主たる事業所があること",
          "引き続き1年以上区内で事業を営んでいること"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "文京区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（要確認）",
      "priority": 6,
      "url": "https://www.city.bunkyo.lg.jp/b012/p005133.html"
  },
  {
      "id": "taito-kaigyo-shien",
      "name": "開業支援資金（台開）",
      "provider": "台東区 産業振興課 融資担当",
      "level": "municipality",
      "type": "融資",
      "amount": "あっせん限度額1,000万円（自己資金額3倍程度の範囲内）。貸付利率1.8%以内、区補助1.8%以内、本人負担0%（掲載ページは2015年付の旧ページのため要確認）",
      "summary": "区内で開業予定の方や開業後1年未満の方を対象に、開業資金を低利で借りられるよう区が金融機関へあっせんし、利子の一部を補助します。",
      "eligibility": [
          "区内で開業予定の方、または開業後1年未満の方",
          "区の融資あっせん制度の審査に適合すること"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "台東区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度の受付期間は要確認（大規模改修のため事前予約制との記載あり）",
      "priority": 10,
      "url": "https://www.city.taito.lg.jp/bunka_kanko/jigyoukeiei/yusijoseikin/yushiseido/tokushuseido/201510_kai.html"
  },
  {
      "id": "taito-chusho-yushi",
      "name": "台東区中小企業融資制度",
      "provider": "台東区 産業振興課 融資担当",
      "level": "municipality",
      "type": "融資",
      "amount": "要確認（区が金利と信用保証料の一部を補助。補助率・上限は未確認）",
      "summary": "区内中小企業が金融機関から事業資金を借り入れる際、区が金利と信用保証料の一部を補助します。",
      "eligibility": [
          "区内で事業を営む中小企業者（詳細は要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "台東区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度の受付期間は要確認",
      "priority": 8,
      "url": "https://www.city.taito.lg.jp/bunka_kanko/jigyoukeiei/yusijoseikin/yushiseido/top.html"
  },
  {
      "id": "sumida-hanrokakudai",
      "name": "区内生産品等販路拡張事業補助金",
      "provider": "墨田区（担当課は要確認）",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認",
      "summary": "区内中小企業が国内外で販路拡張を行う際の経費の一部を補助します。予算に達し次第終了。",
      "eligibility": [
          "区内に事業所を有する中小企業",
          "国内販路拡張事業を行うこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "墨田区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年4月1日〜令和9年3月10日（予算に達し次第終了）",
      "deadline": "2027-03-10",
      "priority": 9,
      "url": "https://www.city.sumida.lg.jp/sangyo_jigyosya/sangyo/hojokin_joseikin/hannkaku.html"
  },
  {
      "id": "sumida-digital",
      "name": "デジタル技術活用支援補助金",
      "provider": "墨田区（担当課は要確認）",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率：対象経費の3/4、上限50万円",
      "summary": "区内中小企業が業務効率化や生産性向上のために業務のデジタル化に取り組む経費の一部を補助します。",
      "eligibility": [
          "区内中小企業",
          "業務のデジタル化（業務効率化・生産性向上）に取り組むこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "墨田区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "申請受付は令和8年11月30日まで",
      "deadline": "2026-11-30",
      "priority": 10,
      "url": "https://www.city.sumida.lg.jp/sangyo_jigyosya/sangyo/hojokin_joseikin/smddigital.html"
  },
  {
      "id": "sumida-led",
      "name": "LED照明器具導入支援",
      "provider": "墨田区（担当課は要確認）",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認",
      "summary": "区内中小企業がLED照明器具を導入する費用の一部を補助します。令和8年度で終了予定との案内あり。",
      "eligibility": [
          "区内中小企業（詳細要件は要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "墨田区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度申請受付中（予算到達で終了）",
      "deadline": "2026-12-28",
      "priority": 7,
      "url": "https://www.city.sumida.lg.jp/sangyo_jigyosya/sangyo/hojokin_joseikin/led.html"
  },
  {
      "id": "sumida-ondanka-setsubi",
      "name": "地球温暖化防止設備導入助成制度（令和8年度）",
      "provider": "墨田区（担当課は要確認）",
      "level": "municipality",
      "type": "助成金",
      "amount": "要確認（工事費用の一部を助成）",
      "summary": "区内建築物への遮熱塗装・断熱改修、蓄電システム、太陽光発電などの省エネ設備導入費用の一部を助成します。建物所有者の中小企業者も申請可。",
      "eligibility": [
          "区内の建築物を所有する方（中小企業者を含む）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "墨田区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年4月1日〜令和9年2月26日",
      "deadline": "2027-02-26",
      "priority": 6,
      "url": "https://www.city.sumida.lg.jp/kurashi/kankyou_hozen/jyoseikin/ecojyoseiseido.html"
  },
  {
      "id": "koto-energy-2026",
      "name": "令和8年度江東区エネルギー価格高騰対策補助金",
      "provider": "江東区（担当課は要確認）",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認（水道光熱費・燃料費の一部を補助）",
      "summary": "エネルギー価格高騰により負担が増大した区内中小企業者に対し、水道光熱費・燃料費の一部を補助します。",
      "eligibility": [
          "中小企業者であること",
          "エネルギー価格高騰により負担が増大していること"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "江東区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度。申請期限：令和8年10月30日（金）23時",
      "deadline": "2026-10-30",
      "priority": 11,
      "url": "https://www.city.koto.lg.jp/102020/sangyoshigoto/chusho/hojokin/energy.html"
  },
  {
      "id": "koto-sogyo-jimusho-chinryo",
      "name": "創業支援事務所等賃料補助金",
      "provider": "江東区（担当課は要確認）",
      "level": "municipality",
      "type": "補助金",
      "amount": "事務所等の月額賃料を補助。上限：1〜12か月目 5万円、13〜24か月目 3万円",
      "summary": "江東区の創業支援を受けて入居する創業支援事務所等の賃料の一部を補助します。",
      "eligibility": [
          "江東区の創業支援事務所等に入居する創業者（詳細は公式ページ参照）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "江東区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度の申請受付：令和8年9月1日〜令和8年11月30日",
      "deadline": "2026-11-30",
      "priority": 10,
      "url": "https://www.city.koto.lg.jp/102020/sangyoshigoto/chusho/hojokin/80920.html"
  },
  {
      "id": "koto-kankyo-ninshoshutoku",
      "name": "環境認証等取得費補助",
      "provider": "江東区（担当課は要確認）",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率：経費の1/2以内。上限：ISO9001・ISO14001・ISO27001は50万円、エコアクション21・プライバシーマークは20万円（新規取得のみ）",
      "summary": "ISO14001などの環境認証等を新たに取得する区内中小企業に対し、取得経費の一部を補助します。",
      "eligibility": [
          "区内中小企業",
          "環境認証等を新規取得すること（既取得は対象外）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "江東区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度の受付期間は要確認",
      "priority": 7,
      "url": "https://www.city.koto.lg.jp/102020/sangyoshigoto/chusho/hojokin/25384.html"
  },
  {
      "id": "shinagawa-yushi-assen",
      "name": "中小企業（法人・個人）事業資金 融資あっせん（令和8年度）",
      "provider": "品川区 地域産業振興課 中小企業支援担当",
      "level": "municipality",
      "type": "融資",
      "amount": "要確認（区が取扱金融機関に融資をあっせんし、低利で借りられる制度。限度額・利率は未確認）",
      "summary": "区が取扱金融機関をあっせんし、区内中小企業が低利で事業資金を借りられる制度です。事前予約の上、面談後に要件適合すれば紹介状を発行。",
      "eligibility": [
          "区内で事業を営む中小企業（法人・個人）",
          "信用保証対象外業種は利用不可（一覧で確認）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "品川区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（予約制）",
      "priority": 9,
      "url": "https://www.city.shinagawa.tokyo.jp/PC/sangyo/sangyo-keieishien/hpg000033289.html"
  },
  {
      "id": "shinagawa-jinzai-shokuba",
      "name": "魅力ある職場づくり支援事業助成金",
      "provider": "品川区 地域産業振興課 中小企業支援担当",
      "level": "municipality",
      "type": "助成金",
      "amount": "最大30万円（対象経費の2/3）",
      "summary": "区内中小企業が魅力ある職場づくりに取り組む際の経費の一部を助成します。",
      "eligibility": [
          "区内中小企業（詳細要件は公式ページ参照）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "品川区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度分を受付中（終了日は要確認）",
      "priority": 8,
      "url": "https://www.mics.city.shinagawa.tokyo.jp/joseikin/jinnzai/2272.html"
  },
  {
      "id": "shinagawa-sangaku-kaihatsu",
      "name": "産学連携開発支援（助成金）",
      "provider": "品川区 地域産業振興課 中小企業支援担当",
      "level": "municipality",
      "type": "助成金",
      "amount": "助成限度額 最大100万円（助成対象経費の2/3）",
      "summary": "区内中小企業が大学等と行う共同研究・開発の費用の一部を助成します。",
      "eligibility": [
          "区内中小企業",
          "大学等との共同研究・開発を行うこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "品川区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年5月7日〜令和9年2月26日",
      "deadline": "2027-02-26",
      "priority": 9,
      "url": "https://www.mics.city.shinagawa.tokyo.jp/soshikikarasagasu/chushokigyoshiengakari/joseikin/2284.html"
  },
  {
      "id": "shinagawa-jinzai-skillup",
      "name": "人材スキルアップ支援事業助成",
      "provider": "品川区 地域産業振興課 中小企業支援担当",
      "level": "municipality",
      "type": "助成金",
      "amount": "要確認",
      "summary": "区内中小企業が従業員の人材スキルアップに取り組む経費の一部を助成します。予算に達した時点で締切。",
      "eligibility": [
          "区内中小企業（詳細要件は公式ページ参照）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "品川区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年5月7日〜令和9年2月26日（予算到達で締切）",
      "deadline": "2027-02-26",
      "priority": 7,
      "url": "https://www.mics.city.shinagawa.tokyo.jp/joseikin/jinnzai/2417.html"
  },
  {
      "id": "shinagawa-keiei-kaizen",
      "name": "品川区経営改善支援事業助成金",
      "provider": "品川区 地域産業振興課 中小企業支援担当",
      "level": "municipality",
      "type": "助成金",
      "amount": "要確認（国の補助事業に上乗せして助成。区分ごとの詳細は要確認）",
      "summary": "国の経営改善関連補助事業に区が上乗せして助成する制度です。",
      "eligibility": [
          "区内中小企業（詳細要件は公式ページ参照）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "品川区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年4月20日〜令和9年2月26日",
      "deadline": "2027-02-26",
      "priority": 7,
      "url": "https://www.mics.city.shinagawa.tokyo.jp/soshikikarasagasu/chushokigyoshiengakari/joseikin/2264.html"
  },
  {
      "id": "meguro-shoryokuka",
      "name": "めぐろ中小企業省力化投資補助金",
      "provider": "目黒区 産業経済・消費生活課 中小企業振興係",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率：経費の2/5、1事業者上限40万円",
      "summary": "国のカタログ注文型省力化投資補助事業のカタログ製品の購入費を補助します。先着順（約50社程度）。",
      "eligibility": [
          "区内中小企業",
          "国のカタログ注文型省力化投資補助事業のカタログ製品を購入すること"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "目黒区"
      ],
      "stages": [
          "established"
      ],
      "period": "予算上限に達し次第終了（先着順）",
      "priority": 9,
      "url": "https://www.city.meguro.tokyo.jp/sangyoukeizai/shigoto/kigyoushien/syouryokuka.html"
  },
  {
      "id": "meguro-hanrokakudai-tenjikai",
      "name": "目黒区中小企業向け販路拡大支援事業（展示会出展）",
      "provider": "目黒区 産業経済・消費生活課 中小企業振興係",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率：展示料の2/3、1企業上限15万円",
      "summary": "展示会出展にかかる展示料の一部を補助します。年度内1回、先着順。",
      "eligibility": [
          "区内に主たる事業所を有する中小企業者・異業種交流グループ等（詳細はPDF参照）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "目黒区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（年度内1回・先着順）",
      "priority": 8,
      "url": "https://www.city.meguro.tokyo.jp/documents/4066/r8hanrokakudai.pdf"
  },
  {
      "id": "meguro-senmon-katsuyo",
      "name": "目黒区中小企業者向け専門家活用支援事業",
      "provider": "目黒区 産業経済・消費生活課 中小企業振興係",
      "level": "municipality",
      "type": "専門家支援",
      "amount": "専門家費用の一部を助成。1事業者上限10万円（補助率は要確認）",
      "summary": "中小企業者が専門家を活用する際の費用の一部を助成します。",
      "eligibility": [
          "区内中小企業者（詳細は公式ページ参照）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "目黒区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年4月1日〜令和9年1月29日",
      "deadline": "2027-01-29",
      "priority": 7,
      "url": "https://www.city.meguro.tokyo.jp/sangyoukeizai/shigoto/kigyoushien/senmonkakatuyou.html"
  },
  {
      "id": "meguro-incubation-riyo",
      "name": "令和8年度目黒区インキュベーションオフィス等利用促進補助金",
      "provider": "目黒区 産業経済・消費生活課 中小企業振興係",
      "level": "municipality",
      "type": "補助金",
      "amount": "年間上限24万円（補助率は要確認）",
      "summary": "インキュベーションオフィス等を利用する創業者・中小企業の利用料の一部を補助します。",
      "eligibility": [
          "インキュベーションオフィス等の利用者（詳細は公式ページ参照）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "目黒区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年6月1日〜令和9年2月26日",
      "deadline": "2027-02-26",
      "priority": 8,
      "url": "https://www.city.meguro.tokyo.jp/sangyoukeizai/shigoto/sangyou/08innkyube-shonn.html"
  },
  {
      "id": "meguro-sogyo-yushi-assen",
      "name": "中小企業創業支援資金融資（融資あっせん制度）",
      "provider": "目黒区 産業経済・消費生活課 中小企業振興係",
      "level": "municipality",
      "type": "融資",
      "amount": "要確認（融資あっせん制度一覧で確認。利子の一部を区が補助）",
      "summary": "区内で創業する方などを対象に、取扱金融機関への融資あっせんと利子補助を行います。",
      "eligibility": [
          "区内で創業する方など（詳細は融資あっせん制度一覧で確認）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "目黒区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度（予約制）",
      "priority": 7,
      "url": "https://www.city.meguro.tokyo.jp/kurashi/shigoto/enjo/yushiassen/ichiran.html"
  },
  {
      "id": "ota-monozukuri-ritchi-keizoku",
      "name": "ものづくり企業立地継続補助事業",
      "provider": "大田区 産業経済部 産業経済課（工業振興担当）",
      "level": "municipality",
      "type": "補助金",
      "amount": "上限375万円（補助率は要確認）",
      "summary": "区内の中小ものづくり企業が、防音・防臭・防振など操業環境改善に要する経費の一部を補助します。",
      "eligibility": [
          "区内で操業する中小ものづくり企業",
          "防音・防臭・防振など操業環境改善の経費が対象",
          "支払いは令和9年3月15日までに完了するものに限る"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "大田区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年4月1日〜令和8年12月末日（申請受付）",
      "deadline": "2026-12-31",
      "priority": 9,
      "url": "https://www.city.ota.tokyo.jp/sangyo/kogyo/joseikin/keizokuhojo.html"
  },
  {
      "id": "ota-chusho-yushi-assen",
      "name": "大田区中小企業融資あっせん制度",
      "provider": "大田区 産業経済部 産業経済課 融資係",
      "level": "municipality",
      "type": "融資",
      "amount": "区が支払利子の一部又は全部を補給（利率・限度額は資金ごとに要確認）",
      "summary": "区が低利の融資を取扱金融機関にあっせんし、融資実行後の支払利子の一部または全部を区が補給します。",
      "eligibility": [
          "区内中小企業者",
          "申込前に取扱金融機関へ事前相談が必要",
          "開業資金・チャレンジ企業応援資金は予約制"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "大田区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（令和8年4月1日時点の内容）",
      "priority": 7,
      "url": "https://www.city.ota.tokyo.jp/sangyo/yushi/madoguchi.html"
  },
  {
      "id": "setagaya-chuto-emergency-yushi",
      "name": "世田谷区中東情勢対応緊急資金（融資あっせん）",
      "provider": "世田谷区（受付：公益財団法人世田谷区産業振興公社）",
      "level": "municipality",
      "type": "融資",
      "amount": "限度額1,000万円、利用者負担利率0.0%、信用保証料の2分の1補助",
      "summary": "中東情勢の緊迫化による原油・原材料価格高騰で売上が減少した区内中小企業者の運転資金などを融資あっせんします。",
      "eligibility": [
          "申込月の前々月から申込月までの3か月間の売上高が前年同期比で20%以上減少",
          "区内で1年以上営業していること",
          "住民税・事業税の滞納がないこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "世田谷区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年8月3日〜令和9年3月31日（申込期間）",
      "deadline": "2027-03-31",
      "priority": 9,
      "url": "https://www.city.setagaya.lg.jp/01004/33825.html"
  },
  {
      "id": "shibuya-jinkenhi-bukka-yushi",
      "name": "緊急中小企業支援資金（人件費・物価高騰対策）",
      "provider": "渋谷区 商工・労働・相談担当",
      "level": "municipality",
      "type": "融資",
      "amount": "融資限度額2,000万円。区が利子を全額負担し利用者は無利子（貸付期間7年以内）",
      "summary": "人件費や物価高騰の影響を受けている区内中小企業者を対象に、運転資金を無利子で融資あっせんします。",
      "eligibility": [
          "人件費および物価高騰により事業活動に影響を受けている区内中小企業者",
          "区の事前予約と金融機関への申込が必要"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "渋谷区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（受付期限：令和9年3月31日）",
      "deadline": "2027-03-31",
      "priority": 9,
      "url": "https://www.city.shibuya.tokyo.jp/jigyosha/shoko-rodo-sodan/chusho-yushi/chusho_shien.html"
  },
  {
      "id": "shibuya-chusho-jigyo-yushi",
      "name": "渋谷区中小企業事業資金融資あっせん制度",
      "provider": "渋谷区 商工・労働・相談担当",
      "level": "municipality",
      "type": "融資",
      "amount": "運転資金1,500万円・設備資金2,000万円まで。利用者負担年1.2%以内（区が0.5%負担）。資金ごとに条件が異なる",
      "summary": "区内中小企業者が事業資金を必要とする場合に、低利の融資を金融機関にあっせんし、区が利率の一部を負担します。創業支援資金や事業承継支援資金も含まれます。",
      "eligibility": [
          "区内中小企業者",
          "区の事前予約が必要",
          "資金ごとに必要書類が異なる"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "渋谷区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（「令和8年度 渋谷区中小企業事業資金融資あっせんのご案内」）",
      "priority": 7,
      "url": "https://www.city.shibuya.tokyo.jp/jigyosha/shoko-rodo-sodan/chusho-yushi/sb_yushi1.html"
  },
  {
      "id": "suginami-sogyo-startup-joseikin",
      "name": "創業スタートアップ助成事業",
      "provider": "杉並区 産業振興センター",
      "level": "municipality",
      "type": "助成金",
      "amount": "助成率3分の2。事業所家賃は月額上限5万円×6か月（上限30万円）、ホームページ等作成費は上限20万円",
      "summary": "創業後6か月以内の中小企業者を対象に、事業所家賃とホームページ等の作成費用を助成します。",
      "eligibility": [
          "創業後6か月以内の中小企業者",
          "杉並区内で事業を行うこと",
          "予算に達し次第終了"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "杉並区"
      ],
      "stages": [
          "early"
      ],
      "period": "令和8年度 第2回：令和8年10月1日〜令和8年11月30日",
      "deadline": "2026-11-30",
      "priority": 10,
      "url": "https://www.city.suginami.tokyo.jp/s121/1793.html"
  },
  {
      "id": "suginami-chusho-shikin-yushi",
      "name": "杉並区中小企業資金融資（創業支援資金・新事業展開資金）",
      "provider": "杉並区 産業振興センター",
      "level": "municipality",
      "type": "融資",
      "amount": "限度額：創業支援資金2,000万円、新事業展開資金1,500万円（利率は要確認）",
      "summary": "区内で創業を予定する方や新事業に取り組む事業者向けの区の融資制度です。",
      "eligibility": [
          "創業支援資金：事業を営んでいない個人で、区内での創業を予定し、融資申込額以上の自己資金があること",
          "新事業展開資金：区内中小事業者で新事業に取り組むこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "杉並区"
      ],
      "stages": [
          "planning",
          "early",
          "established"
      ],
      "period": "令和8年度（利率は令和8年4月1日現在）",
      "priority": 8,
      "url": "https://www.city.suginami.tokyo.jp/guide/shigoto/chusho/1005236.html"
  },
  {
      "id": "suginami-marukei-rishi-hokyu",
      "name": "小規模事業者経営改善資金（マル経融資）に係る利子補助",
      "provider": "杉並区 産業振興センター",
      "level": "municipality",
      "type": "融資",
      "amount": "支払った利子の30%を補助（令和8年1月1日〜12月31日に公庫へ支払った利子が対象）",
      "summary": "日本政策金融公庫のマル経融資を借りた区内小規模事業者に対し、支払利子の一部を区が補助します。",
      "eligibility": [
          "日本政策金融公庫の小規模事業者経営改善資金を利用している区内小規模事業者"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "杉並区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（申請期間：毎年度4月1日〜12月31日）",
      "deadline": "2026-12-31",
      "priority": 7,
      "url": "https://www.city.suginami.tokyo.jp/s121/19276.html"
  },
  {
      "id": "kita-kigyoka-shien",
      "name": "北区 起業家支援資金（中小企業融資あっせん制度）",
      "provider": "北区 産業振興部 産業振興課 経営支援係",
      "level": "municipality",
      "type": "融資",
      "amount": "限度額 通常1,500万円／特例2,000万円（特定創業支援等事業の受講証明を受けた場合）。利子・信用保証料の補給率は未確認（金額は古い可能性があり要確認）",
      "summary": "区内で創業する事業者等を対象に、区の融資あっせんで事業資金を借り入れられる制度です。金融機関経由で区が利子等の一部を補給します。",
      "eligibility": [
          "区内に住所又は主たる事業所があること",
          "原則として1年以上同一場所で同一事業を営む中小企業者（創業者向け区分を含む）",
          "起業家支援資金は経営相談が必須"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "北区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度（受付期間は要確認）",
      "priority": 9,
      "url": "https://www.city.kita.tokyo.jp/sangyoshinko/sangyo/chushokigyo/yushi/annai.html"
  },
  {
      "id": "kita-marukei-rishi",
      "name": "マル経融資利子補助",
      "provider": "北区 産業振興部 産業振興課 経営支援係",
      "level": "municipality",
      "type": "融資",
      "amount": "支払利息の3割を補助（期間3年間）（要確認）",
      "summary": "東京商工会議所北支部経由で日本政策金融公庫のマル経融資を利用した区内小規模事業者の支払利息の一部を区が補助します。",
      "eligibility": [
          "区内の小規模事業者",
          "東京商工会議所北支部経由でマル経融資を申し込んだ者"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "北区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（受付期間は要確認）",
      "priority": 8,
      "url": "https://www.city.kita.tokyo.jp/sangyoshinko/yushi_josei/marukei.html"
  },
  {
      "id": "kita-shinseihin-kaihatsu",
      "name": "新製品・新技術開発支援事業",
      "provider": "北区 産業振興部 産業振興課 ものづくり担当",
      "level": "municipality",
      "type": "助成金",
      "amount": "助成率4分の3、上限300万円（掲載は2024年度の募集情報のため要確認）",
      "summary": "区内中小企業の新製品・新技術の研究開発に要する経費の一部を助成します。",
      "eligibility": [
          "区内の中小企業者",
          "新製品・新技術の研究開発に取り組むこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "北区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（募集状況は要確認）",
      "priority": 7,
      "url": "https://www.city.kita.tokyo.jp/sangyoshinko/sangyo/chushokigyo/monozukuri/josekin/kaihatsu/shinseihin.html"
  },
  {
      "id": "arakawa-seisan-kachi-kojo",
      "name": "製造業等企業価値向上支援事業補助金",
      "provider": "荒川区 産業観光部 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率2分の1、上限100万円。賃上げ要件を満たす場合は補助率3分の2、上限200万円（要綱で要確認）",
      "summary": "生産性・DX・BCP・職場安全などに資する設備投資費用の一部を補助します。",
      "eligibility": [
          "中小企業基本法に規定する製造業等の中小企業者",
          "荒川区内に本社を有し1年以上区内で継続して事業を営むこと",
          "大企業が経営に実質的に参画していないこと",
          "令和9年3月末までに設置と支払を完了すること"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "荒川区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（受付期間は要確認）",
      "priority": 8,
      "url": "https://www.city.arakawa.tokyo.jp/a021/jigyousha/jigyouunei/syoukibohojyo.html"
  },
  {
      "id": "arakawa-shinseihin-shingijutsu",
      "name": "新製品・新技術開発補助",
      "provider": "荒川区 産業観光部 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率2分の1、上限200万円（要確認）",
      "summary": "区内中小企業が行う新製品・新技術の開発に要する経費の一部を補助します。",
      "eligibility": [
          "区内に本社を有し1年以上区内で継続して事業を営む中小企業者",
          "大企業が経営に実質的に参画していないこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "荒川区"
      ],
      "stages": [
          "established"
      ],
      "period": "申請受付は4月1日から9月30日（年度は要確認）",
      "priority": 7,
      "url": "https://www.city.arakawa.tokyo.jp/jigyousha/jigyouunei/joseikin/index.html"
  },
  {
      "id": "arakawa-sogyo-yushi",
      "name": "荒川区中小企業融資制度（創業支援融資）",
      "provider": "荒川区 産業観光部 産業振興課",
      "level": "municipality",
      "type": "融資",
      "amount": "融資限度額・信用保証料補助の内容は要確認（区が利子の一部と信用保証料を補助）",
      "summary": "区が取扱金融機関へ融資をあっせんし、創業者の事業資金を低利で調達できるようにする制度です。",
      "eligibility": [
          "区内で創業する中小企業者",
          "区の要綱に定める要件を満たすこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "荒川区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度（受付期間は要確認）",
      "priority": 7,
      "url": "https://www.city.arakawa.tokyo.jp/a021/jigyousha/jigyouunei/r2yushi.html"
  },
  {
      "id": "itabashi-chintai-hojo",
      "name": "ベンチャー企業・起業家支援賃料補助金",
      "provider": "板橋区 産業経済部",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率2分の1以内。区分アは月額上限20万円（最長36か月）、区分イ・ウは月額上限10万円（最長24か月）",
      "summary": "創業者・起業家の事務所や工場の賃料の一部を補助します。住居兼用、シェアオフィス、バーチャルオフィス、倉庫、駐車場は対象外。",
      "eligibility": [
          "区分アは創業15年以内で技術や高度な知識を活かす事業者",
          "区分イ・ウは産業競争力強化法の創業等支援事業の認定を受けた創業5年以内の事業者など",
          "板橋区内で事業を行うこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "板橋区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度（第1回の受付期間は要確認）",
      "priority": 9,
      "url": "https://www.city.itabashi.tokyo.jp/bunka/1061832/1062047/1064535/index.html"
  },
  {
      "id": "itabashi-monozukuri-chiiki-kyosei",
      "name": "板橋区ものづくり企業地域共生推進助成金（令和8年度）",
      "provider": "板橋区 産業経済部",
      "level": "municipality",
      "type": "助成金",
      "amount": "助成率4分の3以内または3分の2以内（上限額は要綱で要確認）",
      "summary": "区内ものづくり企業が工場の騒音・振動対策、設備更新、耐震補強などを行う経費を助成し、地域と共生する工場づくりを支援します。",
      "eligibility": [
          "区内でものづくりを行う中小企業者",
          "事前相談を経て申請すること"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "板橋区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年4月20日〜令和8年11月30日（事前相談・申請書の受付）",
      "deadline": "2026-11-30",
      "priority": 8,
      "url": "https://www.city.itabashi.tokyo.jp/bunka/chusho/yuushi/1062762/index.html"
  },
  {
      "id": "itabashi-seisan-setsubi-joseikin",
      "name": "製造業設備投資助成金",
      "provider": "板橋区 産業経済部",
      "level": "municipality",
      "type": "助成金",
      "amount": "対象経費の3分の2以内（上限666万円）または2分の1以内（上限500万円）のいずれか低い額（令和8年度の内容は要確認）",
      "summary": "区内製造業者が先端設備を導入する際の経費を助成します。",
      "eligibility": [
          "区内の製造業者",
          "中小企業等経営強化法に基づく先端設備導入計画の認定を受けていること（申請の前提）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "板橋区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（受付期間は要確認）",
      "priority": 7,
      "url": "https://www.city.itabashi.tokyo.jp/bunka/1061832/1062046/1064579/index.html"
  },
  {
      "id": "itabashi-sangyo-yushi-seicho",
      "name": "板橋区産業融資制度（持続成長支援融資）",
      "provider": "板橋区 産業経済部",
      "level": "municipality",
      "type": "融資",
      "amount": "融資限度額5,000万円（持続成長支援融資）",
      "summary": "区の産業融資制度のひとつで、中小企業診断士との面談と経営診断を前提に事業資金を融資します。",
      "eligibility": [
          "板橋区内の中小企業者",
          "中小企業診断士との面談と経営診断を受けること"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "板橋区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（夏季・年末資金は受付期間が2回に分かれるため案内PDFで要確認）",
      "priority": 6,
      "url": "https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/005/543/6167.pdf"
  },
  {
      "id": "nerima-sangyo-yushi-assen",
      "name": "産業融資あっせん（練馬区産業融資制度）",
      "provider": "練馬区 産業経済部 経済課 融資係",
      "level": "municipality",
      "type": "融資",
      "amount": "利用者負担金利0.9%以下（区が利子の一部を負担）。融資限度額は貸付種類ごとに要確認",
      "summary": "区が金融機関に融資をあっせんし、区内中小企業の事業資金を低利で借りられるようにする制度です。普通貸付、創業支援貸付、景気対策特別貸付、災害貸付などがあります。",
      "eligibility": [
          "区内中小企業者",
          "小口貸付は東京信用保証協会の保証付きが条件"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "練馬区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（通年の申込受付。詳細は要確認）",
      "priority": 9,
      "url": "https://www.city.nerima.tokyo.jp/kusei/sangyo/jigyosha/yushi/"
  },
  {
      "id": "nerima-sogyo-tokubetsu-yushi",
      "name": "創業支援特別貸付",
      "provider": "練馬区 産業経済部 経済課 融資係",
      "level": "municipality",
      "type": "融資",
      "amount": "要確認（限度額は公式ページで確認が必要）",
      "summary": "区の産業融資あっせんの一種で、創業する事業者の事業資金を低利で融資します。",
      "eligibility": [
          "練馬区内で創業する事業者（詳細要件は公式ページで要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "練馬区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度（受付期間は要確認）",
      "priority": 7,
      "url": "https://www.city.nerima.tokyo.jp/kusei/sangyo/jigyosha/yushi/sogyo-tokubetu.html"
  },
  {
      "id": "nerima-marukei-rishi-hojo",
      "name": "小規模事業者経営改善資金（マル経融資）利子補助金",
      "provider": "練馬区 産業経済部 経済課",
      "level": "municipality",
      "type": "融資",
      "amount": "支払利子の40％を補助（要確認）",
      "summary": "東京商工会議所練馬支部の推薦を受けて日本政策金融公庫のマル経融資を利用した小規模事業者の支払利子の一部を区が補助します。",
      "eligibility": [
          "区内の小規模事業者",
          "東京商工会議所練馬支部の推薦を受けてマル経融資を利用していること"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "練馬区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（受付期間は要確認）",
      "priority": 7,
      "url": "https://www.city.nerima.tokyo.jp/jigyoshamuke/jigyosha/yushi/2403marukeiyuusi.html"
  },
  {
      "id": "nerima-bizi-challe",
      "name": "新規ビジネスチャレンジ補助金",
      "provider": "練馬区 産業経済部 経済課",
      "level": "municipality",
      "type": "補助金",
      "amount": "補助率・上限額は公式ページで確認できず（要確認）",
      "summary": "新市場への参入や新商品・新サービスの開発に取り組む区内中小企業者等の経費の一部を補助し、事業計画の作成と実行を伴走支援します。",
      "eligibility": [
          "区内の中小企業者等",
          "新市場参入または新商品・新サービス開発に取り組むこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "練馬区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（受付期間は要確認）",
      "priority": 7,
      "url": "https://www.city.nerima.tokyo.jp/kusei/sangyo/jigyosha/bizichalle.html"
  },
  {
      "id": "nerima-homepage-hojo",
      "name": "ホームページ作成補助金",
      "provider": "練馬区 産業経済部 経済課",
      "level": "municipality",
      "type": "補助金",
      "amount": "委託費の2分の1以内、上限5万円",
      "summary": "区内中小企業者が専門業者へホームページ作成を委託する費用の一部を補助します。",
      "eligibility": [
          "区内の中小企業者",
          "専門業者への委託による作成であること"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "練馬区"
      ],
      "stages": [
          "planning",
          "early",
          "established"
      ],
      "period": "令和8年度（受付期間は要確認）",
      "priority": 6,
      "url": "https://www.city.nerima.tokyo.jp/jigyoshamuke/jigyosha/shoko/index.html"
  },
  {
      "id": "adachi-keiei-kaizen-hojo",
      "name": "小規模事業者等経営改善補助金（令和8年度）",
      "provider": "足立区 産業経済部 中小企業支援担当課（要確認）",
      "level": "municipality",
      "type": "補助金",
      "amount": "上限250万円（補助率は要確認）",
      "summary": "小規模事業者等が設備購入、店舗改修、操業環境改善などを行う経費の一部を補助します。",
      "eligibility": [
          "足立区内の小規模事業者等",
          "申請前に区の中小企業相談員による事前相談を受けること"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "足立区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（受付期間は要確認）",
      "priority": 9,
      "url": "https://www.city.adachi.tokyo.jp/s-shinko/shigoto/chushokigyo/yushi-monozukuri.html"
  },
  {
      "id": "adachi-jinzai-saiyo-joseikin",
      "name": "区内中小企業人材採用支援助成金",
      "provider": "足立区 産業経済部 中小企業支援担当課（要確認）",
      "level": "municipality",
      "type": "助成金",
      "amount": "採用活動経費の2分の1（上限60万円）が目安",
      "summary": "区内中小企業が人材を採用する際の採用活動経費の一部を助成します（予算に達し次第終了）。",
      "eligibility": [
          "区内の中小企業者",
          "人材採用活動を行うこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "足立区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年4月1日〜令和9年1月29日",
      "deadline": "2027-01-29",
      "priority": 8,
      "url": "https://www.city.adachi.tokyo.jp/chusho/jinzaisaiyoshien.html"
  },
  {
      "id": "adachi-jinzai-teichaku-sapoto",
      "name": "区内中小企業人材定着サポート助成金",
      "provider": "足立区 産業経済部 中小企業支援担当課（要確認）",
      "level": "municipality",
      "type": "助成金",
      "amount": "要確認（金額・補助率は公式ページで確認が必要）",
      "summary": "区内中小企業が職場環境整備、熱中症対策、就業規則の作成などを行い人材の定着を図る取組を支援します。",
      "eligibility": [
          "区内の中小企業者",
          "人材定着に資する取組を行うこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "足立区"
      ],
      "stages": [
          "established"
      ],
      "period": "令和8年度（受付期間は要確認）",
      "priority": 6,
      "url": "https://www.city.adachi.tokyo.jp/chusho/jinzaiteicyakusapoto.html"
  },
  {
      "id": "adachi-chusho-yushi-kinkyu",
      "name": "区の中小企業融資（緊急経営資金・信用保証料補助）",
      "provider": "足立区 産業経済部 中小企業支援担当課（要確認）",
      "level": "municipality",
      "type": "融資",
      "amount": "信用保証料の補助：運転資金は2分の1、設備・併用資金は3分の2が目安（融資限度額は要確認）",
      "summary": "区と契約した区内金融機関が東京信用保証協会の保証を得て貸し付ける区の融資制度。令和8年度は緊急経営資金および借換融資を実施しています。",
      "eligibility": [
          "区内で事業を行う中小企業者",
          "区の定める条件を満たすこと"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "足立区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度（通年。特別借換の限度額引上げは令和8年8月1日から予定）",
      "priority": 7,
      "url": "https://www.city.adachi.tokyo.jp/chusho/shigoto/chushokigyo/htmlonly.html"
  },
  {
      "id": "katsushika-digital-shien",
      "name": "葛飾区デジタル化支援事業費補助金",
      "provider": "葛飾区 産業経済部 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認（上限額・補助率は未確認）",
      "summary": "区内の中小企業者がデジタル技術を導入する経費の一部を補助します。",
      "eligibility": [
          "中小企業基本法第2条第1項の中小企業者",
          "区内に主たる事業所を有すること"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "葛飾区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度：令和8年4月1日〜令和9年2月26日（必着）",
      "deadline": "2027-02-26",
      "priority": 10,
      "url": "https://www.city.katsushika.lg.jp/business/1000011/1034399/1032622/index.html"
  },
  {
      "id": "katsushika-hp-sakusei",
      "name": "ホームページ作成費補助",
      "provider": "葛飾区 産業経済部 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認（上限額・補助率は未確認）",
      "summary": "製品や技術をPRするホームページの新規作成や改修にかかる経費を助成します。",
      "eligibility": [
          "区内の中小企業者"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "葛飾区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度：令和8年4月1日〜令和9年2月26日（必着）",
      "deadline": "2027-02-26",
      "priority": 9,
      "url": "https://www.city.katsushika.lg.jp/business/1000011/1034399/1004957.html"
  },
  {
      "id": "katsushika-mihonichi",
      "name": "見本市出展費補助事業",
      "provider": "葛飾区 産業経済部 産業振興課",
      "level": "municipality",
      "type": "補助金",
      "amount": "要確認（上限額は未確認）",
      "summary": "製造業の区内中小企業が見本市に出展する経費を助成します。",
      "eligibility": [
          "区内の製造業の中小企業者"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "葛飾区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度：申請期限 令和9年2月26日まで",
      "deadline": "2027-02-26",
      "priority": 9,
      "url": "https://www.city.katsushika.lg.jp/business/1000011/1034399/1004958.html"
  },
  {
      "id": "katsushika-jinzai-kakuho",
      "name": "人材確保・人材定着支援事業費助成",
      "provider": "葛飾区 産業経済部 産業振興課",
      "level": "municipality",
      "type": "助成金",
      "amount": "要確認（上限額は未確認）",
      "summary": "女性、高齢者、障害者などが働きやすい職場環境を整える区内中小企業の取り組みを助成します。",
      "eligibility": [
          "区内の中小企業者"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "葛飾区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度：申請期限 令和9年2月26日まで",
      "deadline": "2027-02-26",
      "priority": 9,
      "url": "https://www.city.katsushika.lg.jp/business/1000011/1034399/1036547.html"
  },
  {
      "id": "edogawa-sougyo-josei",
      "name": "創業促進助成事業",
      "provider": "江戸川区 産業経済部 経営支援課",
      "level": "municipality",
      "type": "助成金",
      "amount": "助成率1/2以内、6か月ごとに30万円まで（※別の資料では上限120万円とあり、要確認）",
      "summary": "区内で創業する方、または創業後間もない中小企業者の事業所の賃料の一部を助成します。",
      "eligibility": [
          "区内で創業を目指す方、または創業後間もない中小企業者（対象期間の年数は資料により差があり要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "江戸川区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "令和8年度：募集期間 令和8年6月15日〜7月13日（終了。次回募集を要確認）",
      "priority": 10,
      "url": "https://www.city.edogawa.tokyo.jp/e093/shigotosangyo/jigyosha_oen/sangyo_jigyosya/sougyo_shien/josei.html"
  },
  {
      "id": "edogawa-sougyo-yushi",
      "name": "創業支援資金融資（区創業）",
      "provider": "江戸川区 産業経済部 経営支援課 融資係",
      "level": "municipality",
      "type": "融資",
      "amount": "融資限度額2,000万円（創業予定の個人は必要資金の3分の2以内）／償還7年以内・利率年2.0%以内／利子補給1.5%以内／信用保証料全額補助",
      "summary": "区と契約した金融機関が信用保証協会の保証を得て行う、創業者向けのあっせん融資です。区が利子と信用保証料の一部を補助します。",
      "eligibility": [
          "区内で創業する方、または創業間もない中小企業者",
          "融資実行後6か月経過後から1年以内に区の経営指導を受けること（未実施の場合は利子補給が停止）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "江戸川区"
      ],
      "stages": [
          "planning",
          "early"
      ],
      "period": "通年または年2回（申請時期は要確認）。申込みから融資実行まで約3か月",
      "priority": 11,
      "url": "https://www.city.edogawa.tokyo.jp/e093/shigotosangyo/jigyosha_oen/sangyo_jigyosya/yushi_nintei/yushiseido/sougyoushien.html"
  },
  {
      "id": "edogawa-dx-donyu",
      "name": "デジタル技術活用促進助成事業（DX導入）",
      "provider": "江戸川区 産業経済部 経営支援課",
      "level": "municipality",
      "type": "助成金",
      "amount": "上限200万円／助成率3分の2以内（要確認）",
      "summary": "DXに資するデジタル技術の導入経費を助成します。",
      "eligibility": [
          "区内の中小企業者",
          "前年度の住民税・事業税を滞納していないこと など（要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "江戸川区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年度：第3回募集の申請書受付 令和8年10月中旬〜11月中旬（正確な日付は要確認）",
      "priority": 11,
      "url": "https://www.city.edogawa.tokyo.jp/e093/shigotosangyo/jigyosha_oen/sangyo_jigyosya/jyosei/seisanseikojo/dounyu.html"
  },
  {
      "id": "edogawa-jinzai-kakuho",
      "name": "人材確保支援助成金",
      "provider": "江戸川区 産業経済部 経営支援課",
      "level": "municipality",
      "type": "助成金",
      "amount": "上限20万円／助成率2分の1以内",
      "summary": "採用活動などにかかる経費の一部を助成します。",
      "eligibility": [
          "区内の中小企業者（詳細は要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "江戸川区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "随時（要確認）",
      "priority": 9,
      "url": "https://www.city.edogawa.tokyo.jp/e093/shigotosangyo/jigyosha_oen/sangyo_jigyosya/jyosei/jinzai/sienjigyou.html"
  },
  {
      "id": "edogawa-hanrokakudai",
      "name": "販路拡大支援事業助成金",
      "provider": "江戸川区 産業経済部 経営支援課",
      "level": "municipality",
      "type": "助成金",
      "amount": "展示会出展：国内上限20万円、国外上限30万円（要確認）",
      "summary": "ホームページ作成や展示会出展など、販路拡大に要する経費の一部を助成します。",
      "eligibility": [
          "区内の中小企業者（詳細は要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "江戸川区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "随時（要確認）",
      "priority": 9,
      "url": "https://www.city.edogawa.tokyo.jp/e093/shigotosangyo/jigyosha_oen/sangyo_jigyosya/jyosei/hanrokakudai/hanrokakudai.html"
  },
  {
      "id": "edogawa-rodo-kankyo",
      "name": "江戸川区労働環境整備助成金",
      "provider": "江戸川区 産業経済部 経営支援課",
      "level": "municipality",
      "type": "助成金",
      "amount": "職場環境の整備：上限50万円／就業規則の作成・変更：上限10万円（いずれも助成率2分の1）",
      "summary": "区内中小企業が職場環境の整備や就業規則の作成・変更を行う経費の一部を助成します。",
      "eligibility": [
          "区内の中小企業者（詳細は要確認）"
      ],
      "industries": "all",
      "prefectures": [
          "東京都"
      ],
      "cities": [
          "江戸川区"
      ],
      "stages": [
          "early",
          "established"
      ],
      "period": "令和8年4月1日〜令和9年3月5日（予算に達し次第終了）",
      "deadline": "2027-03-05",
      "priority": 8,
      "url": "https://www.city.edogawa.tokyo.jp/e093/shigotosangyo/jigyosha_oen/sangyo_jigyosya/jyosei/jinzai/roudoukankyou.html"
  },
];
