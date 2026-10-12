// 調べて取り込んだ、事業者向け（創業・中小企業・個人事業主向け）の自治体の制度。
// scripts/import-local-batches.mjs で更新する（手で直してもよいが、並びと形式は取り込みのときに整えられる）。
// 形式は local-programs.js と同じ。cat は事業向けの分類（BUSINESS_CATEGORIES）、cities は area-cities.js にある市区町村名。
export const BUSINESS_CATEGORIES = ['創業・起業', '設備投資・省エネ', '販路開拓・PR', '人材・雇用', 'IT・デジタル', '融資・利子補給', '事業承継', '空き店舗・商店街', '研究開発・新事業', 'その他'];

export const LOCAL_PROGRAMS_EXTRA = [
  {
    "id": "hokkaido-chiiki-kadai-kigyo",
    "name": "地域課題解決型起業支援事業（起業支援金）",
    "provider": "北海道 経済部地域経済局中小企業課／北海道中小企業総合支援センター",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内・上限200万円",
    "summary": "デジタル技術を活用して地域課題を解決する道内での新規起業に対し、経費の一部を補助し伴走支援を行う。",
    "eligibility": [
      "道内で新たに起業する者",
      "デジタル技術を活用し地域課題の解決を目的とする事業"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は2次募集（2026/7/14〜8/19）を含め募集終了。来年度は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.hokkaido.lg.jp/kz/csk/sougyou/149177.html"
  },
  {
    "id": "hokkaido-chusho-kyosoryoku-marketing",
    "name": "中小企業競争力強化促進事業（マーケティング支援）",
    "provider": "北海道 経済部産業振興局産業振興課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "市場調査や展示会出展などマーケティング活動の経費を補助する。",
    "eligibility": [
      "道内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度2次募集 2026/8/19〜9/16（終了の可能性大・最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.hokkaido.lg.jp/kz/ssg/kyosoryoku.html"
  },
  {
    "id": "hokkaido-sogyo-kasitsuke",
    "name": "中小企業総合振興資金 創業貸付",
    "provider": "北海道 経済部地域経済局中小企業課",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額3,500万円以内・期間1年超10年以内・固定金利 3年以内1.8%/10年以内2.4%（公式ページ記載、最新は要確認）",
    "summary": "創業後5年を経過していない個人・法人向けの道の制度融資。設備資金は見積書等が必要。",
    "eligibility": [
      "創業後5年を経過していない個人または会社",
      "北海道中小企業総合支援センターのあっせん等が必要な場合あり"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.hokkaido.lg.jp/kz/csk/kny/yuushi/01sogyo.html"
  },
  {
    "id": "hokkaido-sogyo-sokushin",
    "name": "創業促進支援事業（北海道中小企業総合支援センター）",
    "provider": "北海道中小企業総合支援センター",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率対象経費の1/2以内（上限額は要確認）",
    "summary": "新たに事業を始める個人や中小企業者の創業経費の一部を助成する。",
    "eligibility": [
      "新たに事業を始める個人または中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.hsc.or.jp/consul/foundation/"
  },
  {
    "id": "hokkaido-step-up-koyo",
    "name": "中小企業総合振興資金 ステップアップ貸付（事業活性化・雇用）",
    "provider": "北海道 経済部地域経済局中小企業課",
    "level": "prefecture",
    "type": "融資",
    "cat": "人材・雇用",
    "amount": "融資限度額1億円以内（運転・設備資金）",
    "summary": "新たな雇用を創出する事業を行う中小企業者向けの道の制度融資。",
    "eligibility": [
      "新たな雇用を創出する事業を行う中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.hokkaido.lg.jp/kz/csk/kny/yuushi/180084.html"
  },
  {
    "id": "asahikawa-city-chushin-shuten",
    "name": "旭川市中心市街地出店促進補助金",
    "provider": "旭川市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "家賃の一部（詳細は要確認）",
    "summary": "中心市街地の空き店舗を賃借して出店する人に家賃の一部を補助。",
    "eligibility": [
      "中心市街地の空き店舗を賃借して出店する人"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "旭川市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認（令和8年度の要件は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.asahikawa.hokkaido.jp/500/542/54501/545/p003799.html"
  },
  {
    "id": "asahikawa-city-monozukuri",
    "name": "旭川ものづくり支援補助金",
    "provider": "旭川市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2以内（販路拡大連携枠は上限100万円）",
    "summary": "展示会出展、ホームページ・カタログ制作などの販路開拓費を補助。",
    "eligibility": [
      "市内で1年以上操業する中小企業者（製造業中心）"
    ],
    "industries": [
      "manufacturing",
      "food"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "旭川市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.asahikawa.hokkaido.jp/500/501/502/d075399.html"
  },
  {
    "id": "asahikawa-city-shinki-kaigyo-riko",
    "name": "旭川市新規開業支援利子補給制度",
    "provider": "旭川市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "支払済み利子の2/3相当額（融資後1年間、原則）",
    "summary": "日本政策金融公庫の新規開業者向け融資を利用した人に利子を補給。",
    "eligibility": [
      "日本政策金融公庫の新規開業者向け融資を利用した創業者"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "旭川市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.asahikawa.hokkaido.jp/500/542/547/p003873.html"
  },
  {
    "id": "asahikawa-city-shinki-sogyo-shikin-hojo",
    "name": "旭川市中小企業振興資金（新規創業支援資金）の保証料・利子補給",
    "provider": "旭川市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "保証料の50%相当額（上限100万円）、利子は支払済み利子の全額（融資後2年間）",
    "summary": "市の中小企業振興資金（新規創業支援資金）利用者に保証料補助と利子補給。",
    "eligibility": [
      "市の中小企業振興資金（新規創業支援資金）を利用する創業者"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "旭川市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.asahikawa.hokkaido.jp/500/542/54501/54502/p003878.html"
  },
  {
    "id": "asahikawa-city-startup-hojo",
    "name": "旭川市スタートアップ支援補助金",
    "provider": "旭川市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内・上限50万円",
    "summary": "市内で起業・創業する事業者の商品・サービス開発や販路開拓費用を補助。第2創業も対象。",
    "eligibility": [
      "市内で起業・創業する事業者",
      "市内で1年以上操業する事業を承継した第2創業者"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "旭川市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度募集は5月1日〜6月30日（受付終了。来年度は要確認）",
    "deadline": "2026-06-30",
    "priority": 8,
    "url": "https://www.city.asahikawa.hokkaido.jp/kurashi/364/11218/11219/d077387.html"
  },
  {
    "id": "chitose-city-akitenpo-riyo-sokushin",
    "name": "中心商店街等空き店舗利用促進事業",
    "provider": "千歳市 産業振興部 商業労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助対象経費の1/2以内・上限170万円（市公式ページ記載。最新年度は要確認）",
    "summary": "中心市街地の空き店舗で開業する事業者に、店舗賃借料・広告宣伝費・改装費などの一部を補助する。",
    "eligibility": [
      "中心商店街等の空き店舗に出店する個人事業主・法人・団体",
      "交付決定前に着手した経費は対象外"
    ],
    "industries": [
      "retail"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "千歳市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（交付決定まで約2か月）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.chitose.lg.jp/docs/96-31282-172-919.html"
  },
  {
    "id": "chitose-city-chusho-shinko-yushi",
    "name": "千歳市中小企業振興融資制度",
    "provider": "千歳市 産業振興部 商業労働課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "市内の中小企業者の事業資金調達を支援する市の融資制度。",
    "eligibility": [
      "千歳市内の中小企業者",
      "詳細要件は市公式ページで要確認"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "千歳市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.chitose.lg.jp/c60/1002733/1002737/1002738/1005255.html"
  },
  {
    "id": "chitose-city-shogyo-kasseika-hojo",
    "name": "商業等活性化事業補助金（起業支援事業等）",
    "provider": "千歳市 産業振興部 商業労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "市内の商業活性化の取組を支援する補助金。起業前または起業後180日以内の事業者の店舗賃借料・改装費等を補助するメニューや、市民ふれあいプラザでの試験事業の使用料補助がある。",
    "eligibility": [
      "千歳市で起業する方または起業後180日以内（試験事業は起業後3年以内）の事業者",
      "商店街・市内事業者の団体による商業活性化の取組"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "千歳市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.chitose.lg.jp/c60/1002733/1002737/1002739/1003701.html"
  },
  {
    "id": "ebetsu-city-kigyo-ricchi-koyo-hojokin",
    "name": "江別市企業立地補助金（雇用補助金）",
    "provider": "江別市 企業立地推進室 企業立地課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "市内居住者の雇用増1人あたり20万円、市外居住者10万円。年間上限1,000万円",
    "summary": "企業立地条例に基づき、新設・増設で雇用を増やした事業者に雇用補助金を交付する。立地補助金等も用意されている。",
    "eligibility": [
      "新設：固定資産評価額2,000万円以上（食関連施設は1,500万円以上）かつ雇用5人以上増",
      "増設：増設部分の評価額2,000万円以上かつ雇用3人以上増",
      "新設・増設の認定申請は工事着手日の90日前から30日前まで"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "江別市"
    ],
    "stages": [
      "established"
    ],
    "period": "随時（工事着手前に認定申請）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ebetsu.hokkaido.jp/soshiki/kigyouricchi/16305.html"
  },
  {
    "id": "ebetsu-city-shokogyo-kasseika-hojo",
    "name": "江別市商工業活性化事業補助金",
    "provider": "江別市 経済部 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "その他",
    "amount": "要確認",
    "summary": "市内の経済活性化を図るため、中小企業や商店街などが行う事業の経費の一部を補助する。",
    "eligibility": [
      "市内の中小企業者・商店街等",
      "事業実施前に申請すること"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "江別市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ebetsu.hokkaido.jp/soshiki/shoko/2244.html"
  },
  {
    "id": "ebetsu-city-tokusanhin-kaihatsu-hojo",
    "name": "江別市特産品開発事業補助金",
    "provider": "江別市 経済部 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率1/2、上限50万円",
    "summary": "地域資源を活用した特産品の開発等に要する経費の一部を補助する。",
    "eligibility": [
      "市内で特産品の開発等を行う事業者",
      "詳細要件は要確認"
    ],
    "industries": [
      "food",
      "agriculture"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "江別市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ebetsu.hokkaido.jp/soshiki/shoko/150095.html"
  },
  {
    "id": "hakodate-city-chusho-yushi",
    "name": "函館市中小企業融資制度",
    "provider": "函館市 経済部",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "資金種別ごとに異なる（要確認）",
    "summary": "北海道信用保証協会と金融機関の協力による市の制度融資。運転資金・設備資金などの各資金が用意されている。",
    "eligibility": [
      "函館市内の中小企業者",
      "金融機関・信用保証協会の審査を通ること"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "函館市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "現行の一覧は2026年10月1日〜2027年3月31日の期間で案内",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.hakodate.hokkaido.jp/docs/2014021300412/"
  },
  {
    "id": "hakodate-city-kaigai-tenji",
    "name": "函館市海外向け展示商談会等出展補助金",
    "provider": "函館市 経済部 食産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率2分の1以内、上限は海外開催40万円・国内開催20万円",
    "summary": "海外向けの展示商談会等への出展経費の一部を補助する。",
    "eligibility": [
      "函館市内の事業者（食関連事業者など、募集要項で要確認）",
      "同一年度1回限り"
    ],
    "industries": [
      "food"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "函館市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "2026年4月1日〜2027年2月28日（予算上限に達し次第終了）",
    "deadline": "2027-02-28",
    "priority": 8,
    "url": "https://www.city.hakodate.hokkaido.jp/docs/2026020500052/"
  },
  {
    "id": "hakodate-city-sogyo-backup",
    "name": "創業バックアップ助成金（一般枠・若者枠）",
    "provider": "函館市 経済部（函館地域産業振興財団）",
    "level": "municipality",
    "type": "助成金",
    "cat": "創業・起業",
    "amount": "一般枠は上限300万円、若者枠（35歳未満）は上限100万円（資料により額が異なるため最新は要確認）",
    "summary": "函館地域に拠点を置いて創業する優れた事業計画に、費用の一部を助成する。",
    "eligibility": [
      "函館地域で年度内に創業予定、または創業から5年以内の個人・中小企業者",
      "市内に事業拠点を設けること"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "函館市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は2026年4月1日〜5月15日（受付終了。来年度は要確認）",
    "deadline": "2026-05-15",
    "priority": 8,
    "url": "https://www.city.hakodate.hokkaido.jp/docs/2018030700027/"
  },
  {
    "id": "hakodate-city-tokusanhin-kaihatsu",
    "name": "函館市特産品開発支援事業補助金",
    "provider": "函館市 経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "要確認",
    "summary": "新たな商品開発に係る機械等の導入経費、パッケージデザイン費、商標登録等の経費の一部を支援する（令和8年度募集の案内あり）。",
    "eligibility": [
      "函館市内で特産品の開発を行う事業者（詳細は要確認）"
    ],
    "industries": [
      "food",
      "manufacturing"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "函館市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hakodate.hokkaido.jp/docs/2026012600012/"
  },
  {
    "id": "kitami-city-hanro-kakudai-hojo",
    "name": "北見市 中小企業等販路拡大補助金",
    "provider": "北見市 工業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "対象経費の1/2以内、上限20万円",
    "summary": "自社開発の製品・技術・サービスの販路拡大に要する商談会出展費、Web作成費、販促物作成費、広告費などを補助する。",
    "eligibility": [
      "市内に本社のある中小企業、連携体、市内で事業を営む個人事業主",
      "自社開発の製品等の販路拡大を目的とする事業"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "北見市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "掲載は令和7年度分。令和8年度の募集は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kitami.lg.jp/administration/work/detail.php?content=10390"
  },
  {
    "id": "kitami-city-sogyo-sokushin-joseikin",
    "name": "北見市創業促進助成金（旧 創業促進補助金）",
    "provider": "北見市 商工観光部",
    "level": "municipality",
    "type": "助成金",
    "cat": "創業・起業",
    "amount": "要確認（融資額の一部を助成）",
    "summary": "市内で指定の融資を受けて創業する方に、融資額の一部を助成する。",
    "eligibility": [
      "北見市内で指定の融資を受けて創業する方",
      "事前相談が必要（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "北見市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kitami.lg.jp/administration/work/detail.php?content=7149"
  },
  {
    "id": "kushiro-city-akitenpo-katsuyo",
    "name": "釧路市 空き店舗等活用促進事業補助金",
    "provider": "釧路市 産業振興部商業労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/2、上限20万円（北大通を中心とした一部地域は上限50万円）",
    "summary": "市指定地区の空き店舗に出店する事業者の店舗改装費・広告宣伝費の一部を補助する。申請は発注前に行う。",
    "eligibility": [
      "市が指定する地区の空き店舗に出店する事業者",
      "改装・広告の発注前に申請すること"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "釧路市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "掲載の申請期間は2025年12月26日まで。令和8年度は最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kushiro.lg.jp/sangyou/b_shien/1006429/1006457/1006476.html"
  },
  {
    "id": "kushiro-city-kojo-shinzosetsu",
    "name": "釧路市 中小企業振興条例に基づく工場新増設助成",
    "provider": "釧路市 産業振興部",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "助成対象額の3/100、限度額200万円",
    "summary": "小規模企業者が工場を新設・増設して操業を開始した場合の助成。高度化事業助成（限度額2,000万円）もある。",
    "eligibility": [
      "市内の小規模企業者",
      "工場を新設・増設して操業を開始すること"
    ],
    "industries": [
      "manufacturing",
      "food"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "釧路市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kushiro.lg.jp/sangyou/sanshien/1006381/1006389.html"
  },
  {
    "id": "kushiro-city-notsuke-tokusanhin",
    "name": "釧路市 音別地域特産品開発支援事業補助金",
    "provider": "釧路市 産業振興部",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "対象経費の1/2以内、上限20万円",
    "summary": "音別地域の特産品の新規開発や改良に対する補助。予算がなくなり次第終了。",
    "eligibility": [
      "音別地域で特産品の開発・改良に取り組む事業者"
    ],
    "industries": [
      "food",
      "agriculture",
      "manufacturing"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "釧路市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度分を募集（予算がなくなり次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kushiro.lg.jp/sangyou/sanshien/1006404/1006416/1019103.html"
  },
  {
    "id": "kushiro-city-sogyo-shikin",
    "name": "釧路市中小企業融資制度 創業支援資金",
    "provider": "釧路市 産業振興部商業労政課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "貸付限度額1,500万円、借入から3年間の利子補給、信用保証料補助は上限20万円",
    "summary": "創業に必要な運転・設備資金の融資あっせん。利子補給と信用保証料補助で創業期の負担を軽減する。",
    "eligibility": [
      "市内で創業する、または創業して間もない事業者",
      "要確認"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "釧路市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（利率等は掲載ページ間で差異あり、最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kushiro.lg.jp/sangyou/b_shien/1006429/1006450/1006452.html"
  },
  {
    "id": "obihiro-city-chusho-yushi",
    "name": "帯広市中小企業振興融資制度（信用保証料補給）",
    "provider": "帯広市 経済部商業労働課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "小企業資金（小口）は上限1,000万円、運転7年以内・設備10年以内。保証料補給は融資額1,000万円相当の保証料まで",
    "summary": "市が金融機関に資金を預託して融資枠を確保する制度融資。対象融資の信用保証料を予算の範囲内で補給する。新規開業支援資金もある。",
    "eligibility": [
      "市内の中小企業者で市税を滞納していないこと",
      "要確認"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "帯広市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年（令和8年度の条件は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.obihiro.hokkaido.jp/sangyo/kigyoshien/sangyo/1005534.html"
  },
  {
    "id": "obihiro-city-tokutei-sogyo-shien",
    "name": "帯広市 特定創業支援等事業（証明書発行）",
    "provider": "帯広市 経済部商業労働課",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "金銭給付なし（登録免許税の軽減、創業関連保証の特例などの優遇）",
    "summary": "市の創業支援を受けた創業者に証明書を発行し、会社設立時の登録免許税軽減や信用保証協会の創業関連保証特例が受けられる。",
    "eligibility": [
      "市が連携する支援機関の創業支援（特定創業支援等事業）を受けた創業者"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "帯広市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.obihiro.hokkaido.jp/sangyo/kigyoshien/sangyo/1005554.html"
  },
  {
    "id": "otaru-city-chusho-shoene-suishin-hojo",
    "name": "小樽市中小企業等省エネ推進補助金",
    "provider": "小樽市 産業港湾部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/2以内、上限100万円",
    "summary": "省エネ診断を受けた市内中小企業等が、エネルギー消費量を年10%以上削減する設備更新を行う費用を補助する。",
    "eligibility": [
      "市内に事務所・事業所を持つ中小企業者（個人事業者を含む）や商店街振興組合等",
      "省エネ診断で削減率10%以上の提案を受けた対策であること",
      "市税を滞納していないこと"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "小樽市"
    ],
    "stages": [
      "established"
    ],
    "period": "2026年5月7日〜11月30日（電子メールで申請）",
    "deadline": "2026-11-30",
    "priority": 8,
    "url": "https://www.city.otaru.lg.jp/docs/2025030300065/"
  },
  {
    "id": "otaru-city-sogyo-shien-hojokin",
    "name": "小樽市創業支援補助金",
    "provider": "小樽市 産業港湾部",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "事務所等家賃：1/2、月額上限5万円（6か月、商店街等は12か月）。内外装工事費：上限50万円（条件により最大100万円）。最新額は要確認",
    "summary": "市内で新規創業する方に、事務所等の家賃と内外装工事費の一部を補助する。",
    "eligibility": [
      "市内で新たに創業する方",
      "詳細要件・令和8年度の実施状況は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "小樽市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.otaru.lg.jp/docs/2020110500069/"
  },
  {
    "id": "tomakomai-city-chusho-jinzai-ikusei",
    "name": "苫小牧市中小企業人材育成補助金",
    "provider": "苫小牧市 工業雇用政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "1名あたり市外研修20,000円、市内研修・Web研修15,000円",
    "summary": "中小企業大学校旭川校など中小機構が主催する研修の受講料の一部を補助する。",
    "eligibility": [
      "市内の中小企業者",
      "対象研修を受講する従業員がいること"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "苫小牧市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tomakomai.hokkaido.jp/kanko/shinkoshien/jinzaihojo.html"
  },
  {
    "id": "tomakomai-city-jigyo-hanro-kakudai",
    "name": "苫小牧市 事業拡大・販路拡大支援補助金",
    "provider": "苫小牧市 工業雇用政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "上限20万円（1事業者につき同一年度1回）",
    "summary": "展示会・商談会などへの出展費用を補助する立地企業サポート事業の一メニュー。",
    "eligibility": [
      "市内の対象事業者",
      "要確認"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "苫小牧市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は予算額に達し受付終了（次年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tomakomai.hokkaido.jp/kanko/kosho/rodokoyo/hojoseido/support_kakudai.html"
  },
  {
    "id": "tomakomai-city-sogyo-support",
    "name": "苫小牧市中小企業創業サポート事業",
    "provider": "苫小牧市 商業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "最大30万円（応募多数の場合は減額あり）",
    "summary": "市・苫小牧商工会議所等の創業セミナーを受講し創業計画を立てて市内で創業した人への補助。",
    "eligibility": [
      "創業セミナーを受講し創業計画を立てて令和8年4月1日〜令和9年3月31日に市内で創業すること",
      "苫小牧商工会議所の会員であること",
      "副業での創業や過去5年以内に事業経験のある人は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "苫小牧市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度。創業計画あっせん申込11月30日、補助金交付申請12月25日まで",
    "deadline": "2026-12-25",
    "priority": 8,
    "url": "https://www.city.tomakomai.hokkaido.jp/kanko/shinkoshien/sogyoshien/2020nenndo.html"
  },
  {
    "id": "aomori-kakehashi-shikin",
    "name": "「青森新時代」への架け橋資金（創業する事業ほか）",
    "provider": "青森県 経済産業部",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業者向け限度額1,000万円・7年以内程度、金融機関提案枠は限度額1億円。利率1.5〜1.7%（令和8年度の県資料記載、最新は要確認）",
    "summary": "創業や新商品開発など前向きな取組みを行う中小企業者向けの県制度融資。保証料補給あり。",
    "eligibility": [
      "県内で創業予定または創業後5年未満の者",
      "県内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "青森県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度（2027/3/31まで・最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.aomori.lg.jp/soshiki/sangyo/sangyo/maruka.html"
  },
  {
    "id": "aomori-kigyo-shien-hojokin",
    "name": "あおもり起業支援事業費補助金",
    "provider": "青森県 経済産業部 企業立地・創出課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2・上限200万円（前年度までの内容。令和8年度の詳細は要確認）",
    "summary": "県外からの移住者や県内の若者・女性などの起業に要する経費を補助する。",
    "eligibility": [
      "県内で起業する者（移住者・若者・女性など枠による）"
    ],
    "industries": "all",
    "prefectures": [
      "青森県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は5/11〜6/30で募集終了",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.aomori.lg.jp/soshiki/sangyo/richi/support_for_entrepreneurs.html"
  },
  {
    "id": "aomori-sangyo-dx-hojokin",
    "name": "青森県産業DXモデル創出支援事業費補助金",
    "provider": "青森県 政策企画部（DX推進）",
    "level": "prefecture",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助額 経費の2/3または400万円のいずれか低い額",
    "summary": "中小企業等のデジタル活用・DX推進の取組を補助する。",
    "eligibility": [
      "県内の中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "青森県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は6/19締切で募集終了。最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.aomori.lg.jp/soshiki/seisaku/dxsuishin/r8_degi_hojo.html"
  },
  {
    "id": "aomori-startup-hojokin",
    "name": "青森県スタートアップ補助金",
    "provider": "青森県 経済産業部 企業立地・創出課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率2/3・上限 創業枠300万円／事業拡大枠500万円",
    "summary": "革新的なビジネスモデルでの創業や、創業後の事業拡大に要する経費を補助する。",
    "eligibility": [
      "革新的なビジネスモデルで創業する者",
      "創業後の事業拡大に取り組む者"
    ],
    "industries": "all",
    "prefectures": [
      "青森県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は6/1〜7/17の募集（終了。来年度は最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.aomori.lg.jp/soshiki/sangyo/richi/support_for_entrepreneurs.html"
  },
  {
    "id": "aomori-city-akitenpo-renovation",
    "name": "青森市 商店街空き店舗等リノベーション支援事業",
    "provider": "青森市 経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "令和8年度予算11,800万円。補助率・上限額は要確認",
    "summary": "商店街の空き店舗・空き家に出店する中小事業者等の内外装・給排水・空調等の工事費を補助。",
    "eligibility": [
      "市内に主たる事業所があること",
      "商店街から必要業種として承認され、商店街に加盟",
      "事前にAOMORI STARTUP CENTERへ相談"
    ],
    "industries": [
      "food",
      "retail",
      "beauty",
      "creative"
    ],
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "青森市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度（募集時期は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.aomori.aomori.jp/sangyo_koyou/shoutengai/1004404.html"
  },
  {
    "id": "aomori-city-furusato-monozukuri",
    "name": "青森市 ふるさとものづくり支援事業（令和8年度）",
    "provider": "青森市 経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率・上限は要確認",
    "summary": "新商品開発等に取り組む事業者を支援。補助対象期間は令和8年4月1日〜令和9年2月19日。",
    "eligibility": [
      "青森市内の事業者（詳細要件は要確認）"
    ],
    "industries": [
      "food",
      "manufacturing",
      "creative"
    ],
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "青森市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": "2027-02-19",
    "priority": 8,
    "url": "https://www.city.aomori.aomori.jp/sangyo_koyou/shoukougyou/1004133/1009585.html"
  },
  {
    "id": "aomori-city-jiba-sangyo-shikin",
    "name": "青森市 地場産業振興資金（保証料補給）",
    "provider": "青森市 経済部",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額2,000万円、期間15年以内、利率年1.8%以内。保証料の半額を市が補給",
    "summary": "設備投資資金の融資制度。信用保証料の半額を市が補給。予算の範囲内で年度途中終了あり。",
    "eligibility": [
      "市内に住所または本店があり、1年以上同一事業を営む個人・法人"
    ],
    "industries": "all",
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "青森市"
    ],
    "stages": [
      "established"
    ],
    "period": "通年（予算の範囲内・最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.aomori.aomori.jp/sangyo_koyou/shoukougyou/1004169/1004177/1004179.html"
  },
  {
    "id": "aomori-city-shinseihin-kaihatsu",
    "name": "青森市 新製品開発助成金",
    "provider": "青森市 経済部",
    "level": "municipality",
    "type": "助成金",
    "cat": "研究開発・新事業",
    "amount": "研究開発費の30%以内、上限1,500万円",
    "summary": "特許・実用新案等に至る新製品の開発を行う中小企業者等への助成。事業着手の6か月前までに申請。",
    "eligibility": [
      "中小企業者または中小企業団体",
      "新製品開発を行うこと"
    ],
    "industries": [
      "manufacturing",
      "food",
      "it"
    ],
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "青森市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.aomori.aomori.jp/sangyo_koyou/shoukougyou/1004169/1004170/1004171.html"
  },
  {
    "id": "hachinohe-city-akitenpo-kaishou",
    "name": "中心商店街空き店舗・空き床解消事業補助金",
    "provider": "八戸市 まちづくり文化推進室",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費の3分の1以内、上限100万円",
    "summary": "中心商店街の特定区域の空き店舗・空き床に新規出店する事業者の店舗改装費（内装・空調・電気・給排水等）を補助する。",
    "eligibility": [
      "中心商店街の特定区域に新規出店する事業者",
      "消耗品・備品購入費は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "八戸市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度追加募集（期限は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hachinohe.aomori.jp/soshikikarasagasu/machizukuribunkasuishinshitsu/chuushinshigaichikasseika/02/1993.html"
  },
  {
    "id": "hachinohe-city-kaisha-setsuritsu",
    "name": "八戸市新規会社設立登録免許税等補助金",
    "provider": "八戸市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "株式会社は登録免許税上限75,000円・定款認証手数料上限30,000円、合同会社等は登録免許税上限30,000円",
    "summary": "市内で新たに会社を設立した創業者に、登録免許税と定款認証手数料の一部を補助する。先着順。",
    "eligibility": [
      "令和8年4月1日以後に市内で新たに会社を設立した者",
      "八戸市から特定創業支援等事業の証明を受けていること"
    ],
    "industries": "all",
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "八戸市"
    ],
    "stages": [
      "early"
    ],
    "period": "会社設立日から60日以内、または2027年3月31日のいずれか早い日まで（予算に達し次第終了）",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.hachinohe.aomori.jp/soshikikarasagasu/shokoka/hojo/sogyo/21613.html"
  },
  {
    "id": "hachinohe-city-keikaku-keiei",
    "name": "八戸市計画経営導入促進補助金",
    "provider": "八戸市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "その他",
    "amount": "補助率2分の1、上限15万円",
    "summary": "中小機構の専門家派遣（ハンズオン支援）に要した費用の一部を補助する。",
    "eligibility": [
      "市内の中小企業者",
      "令和7年10月1日〜令和9年3月31日に中小機構の支援実施完了通知を受けていること",
      "市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "八戸市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度の申請受付中（期限は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hachinohe.aomori.jp/soshikikarasagasu/shokoka/hojo/chusho/22631.html"
  },
  {
    "id": "hachinohe-city-kogichi-hosho",
    "name": "八戸市中小企業小口特別保証制度（保証料全額補助）",
    "provider": "八戸市 商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資額1,250万円まで、信用保証料は全額市が補助",
    "summary": "運転資金と市内での設備投資資金に使える制度融資で、信用保証料を市が全額補助する。",
    "eligibility": [
      "市内に主たる事業所がある中小企業者",
      "市税の滞納がないこと",
      "既存借入金の返済には原則使えない"
    ],
    "industries": "all",
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "八戸市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hachinohe.aomori.jp/soshikikarasagasu/shokoka/yushi/21618.html"
  },
  {
    "id": "hachinohe-city-sogyo-risihokyu",
    "name": "八戸市創業融資利子補給事業",
    "provider": "八戸市 商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "補給対象融資額は上限500万円、借入利率の1％相当額を36回分補給",
    "summary": "八戸商工会議所の指導を受けて日本政策金融公庫から創業融資を受けた事業者に、利子の一部を補給する。",
    "eligibility": [
      "八戸商工会議所の指導を受けた創業者",
      "日本政策金融公庫の創業融資を受けていること"
    ],
    "industries": "all",
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "八戸市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hachinohe.aomori.jp/soshikikarasagasu/shokoka/hojo/sogyo/21612.html"
  },
  {
    "id": "hirosaki-city-akitenpo-taisaku",
    "name": "弘前市空き店舗対策事業費補助金",
    "provider": "弘前市 商工部 商工政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改修は補助率2/3または1/2、賃借は賃料の10か月分（上限額は要綱で要確認）",
    "summary": "中心市街地の空き店舗に新規出店・移転する際の改修費と賃借料を補助する。",
    "eligibility": [
      "中心市街地の対象区域内の空き店舗に出店・移転する事業者"
    ],
    "industries": [
      "retail",
      "food",
      "beauty",
      "creative"
    ],
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "弘前市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和7年度募集を確認。令和8年度は最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hirosaki.aomori.jp/sangyo/syogyo/akitennpohojokinn.html"
  },
  {
    "id": "hirosaki-city-kakehashi-shikin-riko",
    "name": "弘前市「青森新時代」への架け橋資金利用者への利子補助",
    "provider": "弘前市 商工政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "創業者は当初1年間の利子を全額補助、空き店舗開業は5年間",
    "summary": "県制度融資「架け橋資金」の利用者に対する市の利子補助。",
    "eligibility": [
      "架け橋資金を利用する市内事業者・創業者"
    ],
    "industries": "all",
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "弘前市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hirosaki.aomori.jp/sangyo/syogyo/yuushi/miraiwokaeru.html"
  },
  {
    "id": "hirosaki-city-shinki-sogyo-dx",
    "name": "弘前市新規創業者DX促進支援事業費補助金",
    "provider": "弘前市 商工部 産業育成課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "対象経費の2/3、上限20万円（令和7年度）",
    "summary": "特定創業支援等事業を受けた新規創業者のDX導入経費を補助する。",
    "eligibility": [
      "特定創業支援等事業による支援を受けた創業者",
      "市内で創業した（する）者"
    ],
    "industries": "all",
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "弘前市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和7年度の情報のみ確認。最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hirosaki.aomori.jp/sangyo/sangyo/2025-0523-1937-40.html"
  },
  {
    "id": "hirosaki-city-startup-sosyutsu",
    "name": "弘前市スタートアップ創出事業費補助金",
    "provider": "弘前市 商工部 産業育成課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の2/3、上限100万円",
    "summary": "スタートアップの革新的な技術・ビジネスモデルによる事業の専門家謝金、設備導入、広告宣伝費等を補助する。",
    "eligibility": [
      "創業5年未満または令和8年度中に創業予定",
      "市内に本社・主たる事業所を開設（予定）",
      "実績報告は令和9年3月31日まで"
    ],
    "industries": "all",
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "弘前市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hirosaki.aomori.jp/sangyo/sangyo/startup_hojyokinn.html"
  },
  {
    "id": "iwate-chiiki-sosei-kigyo-shienkin",
    "name": "岩手県地方創生起業支援金",
    "provider": "岩手県 商工労働観光部／岩手県中小企業団体中央会",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2（上限額は要確認）",
    "summary": "デジタル技術を活用して地域課題解決に取り組む起業、およびデジタル活用の事業承継・第二創業を支援する。",
    "eligibility": [
      "デジタル技術を活用し地域課題解決を目的に新たに起業する者",
      "付加価値の高い分野で事業承継・第二創業を行う者"
    ],
    "industries": "all",
    "prefectures": [
      "岩手県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は2次公募あり（2026/4/1公表）。事業期間は令和9年3/15まで。現在の受付は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.iwate.jp/sangyoukoyou/sangyoushinkou/shinjigyou/1045518/1081324.html"
  },
  {
    "id": "iwate-kibo-ouen-fund",
    "name": "いわて希望応援ファンド地域活性化支援事業",
    "provider": "公益財団法人いわて産業振興センター",
    "level": "prefecture",
    "type": "助成金",
    "cat": "研究開発・新事業",
    "amount": "要確認",
    "summary": "起業・経営革新・地域資源活用・農商工連携・商店街活性化などの新たな取組を助成する。",
    "eligibility": [
      "三陸沿岸地域の中小企業者等（農商工連携型を除く）"
    ],
    "industries": "all",
    "prefectures": [
      "岩手県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度2次公募は2026/5/15〜6/5で終了。最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.joho-iwate.or.jp/fund"
  },
  {
    "id": "iwate-seido-yushi",
    "name": "岩手県制度融資（中小企業向け融資制度）",
    "provider": "岩手県 商工労働観光部",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資制度一覧表を参照（要確認）",
    "summary": "県の中小企業向け制度融資（一般対策・経営力強化・小口など。事業承継促進資金を含む）。",
    "eligibility": [
      "県内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "岩手県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年（令和8年8/1付一覧表あり）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.iwate.jp/sangyoukoyou/sangyoushinkou/kinyuu/1009133.html"
  },
  {
    "id": "iwate-wakamono-joshi-sogyo-shikin",
    "name": "岩手県 若者・女性創業支援資金",
    "provider": "岩手県 商工労働観光部",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額1,000万円以内・保証料率0%",
    "summary": "県内で新たに創業する、または創業して間もない39歳以下または女性向けの制度融資。",
    "eligibility": [
      "県内で新たに創業する／創業間もない者",
      "39歳以下または女性"
    ],
    "industries": "all",
    "prefectures": [
      "岩手県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認。利子補給は令和8年3月末融資実行分まで）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.iwate.jp/sangyoukoyou/sangyoushinkou/kinyuu/1063636.html"
  },
  {
    "id": "hanamaki-city-kigyo-kyosoryoku-kyoka",
    "name": "企業競争力強化支援事業補助金",
    "provider": "花巻市 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率は原則1/2以内（上限額はメニューにより異なる。要確認）",
    "summary": "市内中小企業者の付加価値創造・販路開拓として、共同研究開発、展示会出展、人材確保、リスキリング、ブランド化、省力化投資などの取組を支援する。",
    "eligibility": [
      "花巻市内の中小企業者等",
      "事業開始の10日前までに申請すること"
    ],
    "industries": "all",
    "prefectures": [
      "岩手県"
    ],
    "cities": [
      "花巻市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（予算がなくなり次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hanamaki.iwate.jp/business/sangyoshien/keieihojo/1017682.html"
  },
  {
    "id": "hanamaki-city-machinaka-sogyo-shien",
    "name": "まちなか創業支援補助金",
    "provider": "花巻市 商工労政課 商業係",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "上限50万円（補助率は要確認）",
    "summary": "中心市街地の空き店舗で新たに創業する中小企業者の改装費・広告宣伝費の一部を補助する。",
    "eligibility": [
      "中心市街地の空き店舗で新たに創業する中小企業者",
      "事業着手日の2週間前までに交付申請すること"
    ],
    "industries": "all",
    "prefectures": [
      "岩手県"
    ],
    "cities": [
      "花巻市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hanamaki.iwate.jp/business/sangyoshien/keieihojo/1002207.html"
  },
  {
    "id": "ichinoseki-city-chusho-shinko-shikin",
    "name": "一関市中小企業振興資金（開業資金等）",
    "provider": "一関市 商工観光部 商政・労政課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "開業資金は上限1,250万円・返済7年以内、市が利子1.5%と保証料1/2を補給（市公式ページ記載。最新は要確認）",
    "summary": "市内の中小企業者の事業資金を対象とする制度融資で、市が利子と保証料の一部を補給する。",
    "eligibility": [
      "一関市内の中小企業者・開業者",
      "金融機関・信用保証協会の審査あり"
    ],
    "industries": "all",
    "prefectures": [
      "岩手県"
    ],
    "cities": [
      "一関市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ichinoseki.iwate.jp/archive/contents-157875"
  },
  {
    "id": "ichinoseki-city-gaikokujin-shokuba-kankyo-hojo",
    "name": "外国人就労者にやさしい職場環境整備事業費補助金",
    "provider": "一関市 商工振興課（人材育成支援係）",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率1/2、上限5万円",
    "summary": "市内事業所で働く外国人就労者の定着を支援するため、職場環境整備の経費の一部を補助する（令和8年度）。",
    "eligibility": [
      "一関市内に事業所を有する事業者",
      "事業着手前に交付申請書を提出すること"
    ],
    "industries": "all",
    "prefectures": [
      "岩手県"
    ],
    "cities": [
      "一関市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（令和8年度）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ichinoseki.iwate.jp/archive/contents-172675"
  },
  {
    "id": "morioka-city-chusho-yushi",
    "name": "盛岡市中小企業融資制度（開業資金ほか・保証料補給）",
    "provider": "盛岡市 商工労働部ものづくり推進課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "制度ごとに異なる（要確認）。保証料の補給あり",
    "summary": "市の中小企業融資制度。開業資金は新たに事業を営む個人や開業1年以内の中小企業者が対象で、制度ごとに保証料を補給。令和8年度版パンフレット掲載。",
    "eligibility": [
      "盛岡市内の中小企業者・開業予定者（制度ごとに要件あり）"
    ],
    "industries": "all",
    "prefectures": [
      "岩手県"
    ],
    "cities": [
      "盛岡市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年（令和8年度版・最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.morioka.iwate.jp/jigyousha/shien/chusho/1007983.html"
  },
  {
    "id": "morioka-city-seicho-ouen-hosho",
    "name": "岩手県中小企業成長応援資金 保証料補給（盛岡市）",
    "provider": "盛岡市 商工労働部ものづくり推進課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "保証料を全額補給。3年以内の利率は年2.65%以内",
    "summary": "雇用増や事業拡大に取り組む中小企業者の保証料を市が全額補給（令和8年4月更新）。",
    "eligibility": [
      "雇用増や事業拡大に取り組む市内の中小企業者",
      "一定の要件を満たすこと"
    ],
    "industries": "all",
    "prefectures": [
      "岩手県"
    ],
    "cities": [
      "盛岡市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.morioka.iwate.jp/jigyousha/shien/chusho/1007993.html"
  },
  {
    "id": "miyagi-bcp-jissen-hojokin",
    "name": "宮城県中小企業等BCP・事業継続力強化計画実践支援補助金",
    "provider": "宮城県 中小企業支援室",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/2以内・備蓄品等枠25〜50万円／設備枠100〜500万円",
    "summary": "BCP・事業継続力強化計画の実践に必要な備蓄品や設備の導入を補助する。",
    "eligibility": [
      "県内の中小企業等",
      "計画の認定（申請中も可）"
    ],
    "industries": "all",
    "prefectures": [
      "宮城県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度追加募集あり（開始日・期限は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.miyagi.jp/soshiki/chukisi/bcp-hojokin2026.html"
  },
  {
    "id": "miyagi-chusho-digital-shien",
    "name": "宮城県中小企業等デジタル化支援事業",
    "provider": "宮城県 中小企業支援室／みやぎ産業振興機構",
    "level": "prefecture",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認（アドバイザー派遣・導入経費補助）",
    "summary": "デジタル化相談、アドバイザー派遣、導入経費の補助により生産性向上を支援する。",
    "eligibility": [
      "県内の中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "宮城県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "相談エントリー 2026/5/18〜2027/2/12。補助金申請は7月締切のメニューは終了（要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.miyagi.jp/soshiki/chukisi/r8digital-shien.html"
  },
  {
    "id": "miyagi-startup-kasokuka",
    "name": "宮城県スタートアップ加速化支援事業",
    "provider": "宮城県 経済商工観光部／みやぎ産業振興機構",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "DX推進枠:補助率2/3以内・単年度250万円以内／一般枠:補助率1/2以内・単年度100万円以内",
    "summary": "商工会・商工会議所と連携し、創業する中小企業者のスタートアップ資金を補助する。",
    "eligibility": [
      "県内で創業する者",
      "募集開始日以降6か月以内に創業等した者を含む"
    ],
    "industries": "all",
    "prefectures": [
      "宮城県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は2026/4/13〜5/12で募集終了。来年度は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.joho-miyagi.or.jp/business-menu/startup"
  },
  {
    "id": "ishinomaki-city-pro-jinzai-koyo",
    "name": "石巻市プロフェッショナル人材雇用助成金",
    "provider": "石巻市 産業部",
    "level": "municipality",
    "type": "助成金",
    "cat": "人材・雇用",
    "amount": "助成率1/3、上限75万円（市外から移住を伴う場合は1/2、上限100万円）",
    "summary": "宮城県プロフェッショナル人材戦略拠点を通じて紹介された人材を雇用する事業者への助成。",
    "eligibility": [
      "県プロフェッショナル人材戦略拠点を通じ民間人材ビジネス事業者から紹介された人材を雇用すること",
      "副業・兼業での雇用は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "宮城県"
    ],
    "cities": [
      "石巻市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ishinomaki.lg.jp/cont/10452000a/0003/555/20240326170501.html"
  },
  {
    "id": "ishinomaki-city-sogyo-shien",
    "name": "石巻市創業支援補助金",
    "provider": "石巻市 産業部産業推進課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、上限100万円",
    "summary": "市内で創業・第二創業を行う方の経費の一部を補助する。新規創業は市主催の創業開成塾の受講が必要。",
    "eligibility": [
      "市内で創業または第二創業を行うこと",
      "新規創業の場合は創業開成塾を受講すること"
    ],
    "industries": "all",
    "prefectures": [
      "宮城県"
    ],
    "cities": [
      "石巻市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度。前期は7月23日締切で終了、後期は12月11日まで",
    "deadline": "2026-12-11",
    "priority": 8,
    "url": "https://www.city.ishinomaki.lg.jp/cont/10451000/8300/20141008185052.html"
  },
  {
    "id": "ishinomaki-city-sogyosha-jizokuka",
    "name": "石巻市創業者持続化事業費補助制度",
    "provider": "石巻市 産業部産業推進課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/2以内、上限100万円",
    "summary": "創業から3年を経過した小規模事業者のIT導入、省力化・省人化、販路開拓などの費用を補助する。",
    "eligibility": [
      "創業から3年を経過した小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "宮城県"
    ],
    "cities": [
      "石巻市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度は4月22日〜5月29日の募集で終了（次年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ishinomaki.lg.jp/cont/10451000/8300/20250624180551.html"
  },
  {
    "id": "ishinomaki-city-yushi-ippan",
    "name": "石巻市中小企業融資制度（一般資金）",
    "provider": "石巻市 産業部商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額2,000万円以内、年1.5%（1年以内）／1.9%（1年超）、保証料の50%を市が補給",
    "summary": "運転・設備資金の融資あっせん。宮城県信用保証協会の保証が必要で、保証料の半分を市が補給する。",
    "eligibility": [
      "市内の中小企業者",
      "宮城県信用保証協会の保証を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "宮城県"
    ],
    "cities": [
      "石巻市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ishinomaki.lg.jp/cont/10452000a/381/381-3.html"
  },
  {
    "id": "ishinomaki-city-yushi-koguchi",
    "name": "石巻市小企業小口融資制度",
    "provider": "石巻市 産業部商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額350万円以内、年1.45%（1年以内）／1.85%（1年超）、保証料の100%を市が補給、連帯保証人不要",
    "summary": "従業員20人以下などの小企業向けの小口融資あっせん。保証料を全額市が補給する。",
    "eligibility": [
      "従業員20人以下などの小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "宮城県"
    ],
    "cities": [
      "石巻市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ishinomaki.lg.jp/cont/10452000a/381/381-2.html"
  },
  {
    "id": "akita-digital-donyu-hojokin",
    "name": "秋田県 中小企業デジタル化導入支援事業費補助金",
    "provider": "秋田県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認",
    "summary": "中小企業のデジタル化導入を補助する。賃上げ緊急支援事業の申請者は審査加点あり。",
    "eligibility": [
      "県内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "秋田県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "第4次募集 2026/9/4〜10/23（17時必着）",
    "deadline": "2026-10-23",
    "priority": 6,
    "url": "https://www.pref.akita.lg.jp/pages/archive/94185"
  },
  {
    "id": "akita-kigyo-shien-hojokin",
    "name": "秋田県 起業支援事業費補助金（若者起業家応援枠・地域課題解決枠）",
    "provider": "秋田県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内・上限は要確認（若者枠は最大150万円との記載あり）",
    "summary": "県内で新たに起業する若者や地域課題解決型の起業を支援する。",
    "eligibility": [
      "県内で新規起業する者（枠により若者等）"
    ],
    "industries": "all",
    "prefectures": [
      "秋田県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は2枠とも募集終了。来年度は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.akita.lg.jp/pages/genre/71284"
  },
  {
    "id": "akita-ma-shien",
    "name": "秋田県 M&A支援事業",
    "provider": "秋田県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "最大200万円",
    "summary": "後継者不在等の中小企業の事業引継ぎ（売り手・買い手・PMI）を補助する。",
    "eligibility": [
      "県内の中小企業者（売り手・買い手）"
    ],
    "industries": "all",
    "prefectures": [
      "秋田県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度（募集期間は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.akita.lg.jp/pages/archive/95760"
  },
  {
    "id": "akita-monozukuri-keiei-senryaku",
    "name": "秋田県 ものづくり経営戦略強化支援事業",
    "provider": "秋田県 産業労働部 商工業振興課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "小規模投資型:補助率2/3以内・20〜200万円／高額投資型:補助率1/3以内・30〜300万円",
    "summary": "販路開拓を含む競争力強化の取組を支援する。",
    "eligibility": [
      "県内に主たる事業拠点があり1年以上の事業実績がある事業者"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "秋田県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度は募集終了（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.akita.lg.jp/uploads/public/archive_0000063563_00/R8%E3%82%82%E3%81%AE%E7%B5%8C/02%E3%80%80%EF%BC%88%E6%96%BD%E8%A1%8C%EF%BC%89%E3%82%82%E3%81%AE%E3%81%A5%E3%81%8F%E3%82%8A%E7%B5%8C%E5%96%B6%E6%88%A6%E7%95%A5%E5%BC%B7%E5%8C%96%E6%94%AF%E6%8F%B4%E4%BA%8B%E6%A5%AD%E5%8B%9F%E9%9B%86%E8%A6%81%E9%A0%85%20(1).pdf"
  },
  {
    "id": "akita-sogyo-shien-shikin",
    "name": "秋田県 新事業展開資金（創業支援資金・女性若者支援枠）",
    "provider": "秋田県 産業労働部",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業支援資金:限度額3,500万円・年1.45%／女性・若者枠:限度額2,500万円・年1.25%（県ページ記載、最新は要確認）",
    "summary": "新規開業や創業後5年以内の者向け、女性・35歳未満向けの優遇枠もある県制度融資。",
    "eligibility": [
      "新規開業予定または創業後5年以内の者",
      "女性または35歳未満（支援枠）"
    ],
    "industries": "all",
    "prefectures": [
      "秋田県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（令和8年8/27現在の制度一覧あり）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.akita.lg.jp/pages/archive/575"
  },
  {
    "id": "akita-city-chingin-kiban",
    "name": "秋田市 中小企業賃上げ基盤強化支援事業",
    "provider": "秋田市 産業振興部",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率・上限は要確認",
    "summary": "物価高騰対応の交付金を活用し、賃上げの基盤強化に取り組む中小企業を支援。予算上限に達し次第終了。",
    "eligibility": [
      "秋田市内の中小企業（詳細要件は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "秋田県"
    ],
    "cities": [
      "秋田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "2026-04-01〜2026-11-30（予算上限で終了）",
    "deadline": "2026-11-30",
    "priority": 8,
    "url": "https://www.city.akita.lg.jp/jigyosha/keieisogyo-support/1034826.html"
  },
  {
    "id": "akita-city-saiyo-jinzai-ikusei",
    "name": "秋田市中小企業採用・人材育成支援事業補助金",
    "provider": "秋田市 産業振興部",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助対象経費の1/2以内、上限30万円",
    "summary": "中小企業の採用・人材育成に要する経費を補助。",
    "eligibility": [
      "秋田市内の中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "秋田県"
    ],
    "cities": [
      "秋田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "掲載ページの申請期限は2026-02-27。最新は要確認",
    "deadline": "2026-02-27",
    "priority": 8,
    "url": "https://www.city.akita.lg.jp/jigyosha/koyo-rodo-support/1028987.html"
  },
  {
    "id": "akita-city-sogyo-shien-hojokin",
    "name": "秋田市創業支援補助金",
    "provider": "秋田市 産業振興部商工貿易振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率50%、補助額50万円",
    "summary": "市内で法人を設立して事業を始める方の費用の一部を補助。一般・Aターン・若者・学生創業の区分あり。",
    "eligibility": [
      "秋田市内で法人設立して事業を開始",
      "創業計画書・納税証明等が必要"
    ],
    "industries": "all",
    "prefectures": [
      "秋田県"
    ],
    "cities": [
      "秋田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "2026-04-01〜2026-12-18",
    "deadline": "2026-12-18",
    "priority": 8,
    "url": "https://www.city.akita.lg.jp/jigyosha/keieisogyo-support/1007122.html"
  },
  {
    "id": "yokote-city-chusho-setsubi-donyu-hojo",
    "name": "中小企業活性化支援事業（中小企業設備導入支援補助金）",
    "provider": "横手市 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助対象経費の1/2以内・上限200万円",
    "summary": "先端設備等導入計画の認定を受けた市内中小企業の設備導入経費を補助する。",
    "eligibility": [
      "市内に本社があり操業1年以上で従業員50人未満の製造業など",
      "令和8年4月1日以降に先端設備等導入計画の認定を受けていること"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "秋田県"
    ],
    "cities": [
      "横手市"
    ],
    "stages": [
      "established"
    ],
    "period": "予算の範囲内で随時募集",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yokote.lg.jp/syoukougyo/1004371/1004474.html"
  },
  {
    "id": "yokote-city-kigyo-sogyo-shien-hojo",
    "name": "起業・創業支援事業補助金",
    "provider": "横手市 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "一般枠は対象経費の1/3以内・上限50万円、県外移住枠は1/2以内・上限80万円、ICT枠は1/2以内・上限100万円（令和7年度概要PDFに基づく。最新は要確認）",
    "summary": "市内で新たに起業し地域商業の活性化につながる事業を営む中小企業者の初期投資経費の一部を補助する。",
    "eligibility": [
      "市内に住所のある個人または市内に主たる事業所を置く法人",
      "起業後に市内に店舗・事務所を持ち市内商工団体に加入すること",
      "交付決定前の着手は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "秋田県"
    ],
    "cities": [
      "横手市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年1月29日（予算上限に達し次第終了）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.yokote.lg.jp/syoukougyo/1001359/1009098.html"
  },
  {
    "id": "yamagata-challenge-sogyo-ouen",
    "name": "やまがたチャレンジ創業応援事業",
    "provider": "山形県 商業振興・経営支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "要確認（優れたビジネスプランに創業経費の一部を助成）",
    "summary": "創業塾・セミナーの開催と、ビジネスプラン公募による創業経費の一部助成を行う。",
    "eligibility": [
      "県内で創業を目指す者"
    ],
    "industries": "all",
    "prefectures": [
      "山形県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度（募集期間は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.yamagata.jp/110013/sangyo/shokogyo/kigyoshien/sougyo-ouen.html"
  },
  {
    "id": "yamagata-marusapo-hojokin",
    "name": "山形県中小企業まるっとサポート補助金",
    "provider": "山形県 商業振興・経営支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "小規模事業者枠 10万〜50万円（補助率は要確認）",
    "summary": "収益力向上のための設備投資等の取組を支援する。",
    "eligibility": [
      "県内の中小企業・小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "山形県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "第2次公募 2026/8/3〜9/4（終了の可能性大・最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.yamagata.jp/110013/sangyo/shokogyo/shinko/marusapo.html"
  },
  {
    "id": "yamagata-monozukuri-startup-hojokin",
    "name": "山形県ものづくりスタートアップ支援事業費補助金",
    "provider": "山形県 産業技術イノベーション課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2・上限 事業立上げ型150万円／一般型100万円／大規模事業型200万円",
    "summary": "ものづくり分野のスタートアップの事業立上げ等に要する経費を補助する。",
    "eligibility": [
      "令和6年3/1〜令和9年2/28に創業した、または創業するスタートアップ"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "山形県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "2026/6/24〜8/7（終了。最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.yamagata.jp/110002/sangyo/shokogyo/shien/startup_hojo_r8.html"
  },
  {
    "id": "yamagata-shokogyo-shinko-shikin",
    "name": "山形県商工業振興資金（開業支援資金ほか）",
    "provider": "山形県 商業振興・経営支援課",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "資金ごとに異なる（全資金合計で1企業3億円まで。開業支援資金の限度額は要確認）",
    "summary": "県の制度融資。令和8年4月から開業支援資金の借換要件が緩和された。",
    "eligibility": [
      "県内で開業する／事業を営む中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "山形県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.yamagata.jp/110013/sangyo/shokogyo/shien/17shikin.html"
  },
  {
    "id": "sakata-city-hanro-kakudai-koryu-hojo",
    "name": "販路拡大・交流支援補助金",
    "provider": "酒田市 産業振興部（酒田市産業振興まちづくりセンター）",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2（小規模事業者等は2/3）、年間上限20万〜30万円（対象者により異なる。要確認）",
    "summary": "市外で開催される商談会・見本市への出展経費の一部を補助する。",
    "eligibility": [
      "酒田市内の事業者",
      "市外開催の商談会・見本市等に出展すること"
    ],
    "industries": "all",
    "prefectures": [
      "山形県"
    ],
    "cities": [
      "酒田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.sakata.lg.jp/sangyo/kigyo/shienseido/hanrokakudaisien.html"
  },
  {
    "id": "sakata-city-kaigyo-shien-hojo",
    "name": "酒田市開業支援補助金",
    "provider": "酒田市 産業振興部（酒田市産業振興まちづくりセンター）",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "創業融資の完済までの利子相当額、上限30万円（都市機能誘導区域内で開業の場合は50万円）",
    "summary": "市内で新たに開業する方の負担軽減のため、創業融資の利子相当額を補助する。",
    "eligibility": [
      "酒田市内で新たに開業する方",
      "創業融資実行の1か月前までに酒田市産業振興まちづくりセンター（サンロク）へ創業相談を行うこと"
    ],
    "industries": "all",
    "prefectures": [
      "山形県"
    ],
    "cities": [
      "酒田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年2月末日（予算上限に達し次第終了）",
    "deadline": "2027-02-28",
    "priority": 8,
    "url": "https://www.city.sakata.lg.jp/sangyo/sogyo/startup-follow_up.html"
  },
  {
    "id": "sakata-city-shin-business-shohin-kaihatsu",
    "name": "新ビジネス・商品開発・実証プロジェクト応援補助金",
    "provider": "酒田市 産業振興部（酒田市産業振興まちづくりセンター）",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率1/2以内（小規模事業者は2/3の情報あり）、上限50万円",
    "summary": "新商品・新サービスの開発やビジネスモデルの実証にかかる経費の一部を補助する。",
    "eligibility": [
      "市内で事業を営む法人・個人事業主等",
      "酒田市産業振興まちづくりセンター（サンロク）の支援を受けていること"
    ],
    "industries": "all",
    "prefectures": [
      "山形県"
    ],
    "cities": [
      "酒田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "随時受付（予算がなくなり次第終了。最新年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.sakata.lg.jp/sangyo/kigyo/shienseido/shoko06_newpro.html"
  },
  {
    "id": "tsuruoka-city-ganbaru-chusho-oen",
    "name": "鶴岡市がんばる中小企業応援事業補助金",
    "provider": "鶴岡市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "その他",
    "amount": "要確認",
    "summary": "市内中小企業の前向きな取り組みを支援する補助金。令和8年度は2次募集も終了し、採択者が公表されている。",
    "eligibility": [
      "市内の中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "山形県"
    ],
    "cities": [
      "鶴岡市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は2次募集まで受付終了（来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsuruoka.yamagata.jp/sangyo/index.html"
  },
  {
    "id": "tsuruoka-city-shinki-sogyo-shien",
    "name": "鶴岡市新規創業等支援補助金（新規創業・移住開業型／事業構想等事業化型）",
    "provider": "鶴岡市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "市内で新規創業・移住開業する人や事業構想の事業化に取り組む人を支援する補助金。令和8年度の案内が市ページに2区分で掲載されている。",
    "eligibility": [
      "市内で創業・開業する個人または法人（区分ごとの詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "山形県"
    ],
    "cities": [
      "鶴岡市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsuruoka.yamagata.jp/sangyo/index.html"
  },
  {
    "id": "tsuruoka-city-shokogyo-shinko-yushi",
    "name": "鶴岡市商工業振興資金融資あっせん制度",
    "provider": "鶴岡市 商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "市が金融機関への融資をあっせんする制度。市の産業・経済ページに項目が掲載されている。",
    "eligibility": [
      "市内で事業を営む中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "山形県"
    ],
    "cities": [
      "鶴岡市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsuruoka.yamagata.jp/sangyo/index.html"
  },
  {
    "id": "yamagata-city-chushin-shutten",
    "name": "山形市中心市街地新規出店者サポート事業費補助金",
    "provider": "山形市 商工観光部ブランド戦略課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/2。上限は計画区域内200万円、商店街法人区域100万円、その他50万円",
    "summary": "中心市街地の空き店舗に飲食店等を新規出店する際の内装・設備工事費等を補助。",
    "eligibility": [
      "中心市街地で新規開業する個人・法人",
      "創業者は特定創業支援事業の受講証明が必要"
    ],
    "industries": [
      "food",
      "retail",
      "beauty"
    ],
    "prefectures": [
      "山形県"
    ],
    "cities": [
      "山形市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "2026-04-01〜2027-03-31（予算に達し次第終了）",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.yamagata-yamagata.lg.jp/jigyosya/shogyo/1006753/1004019.html"
  },
  {
    "id": "yamagata-city-chusho-yushi",
    "name": "山形市中小企業融資制度（特定創業支援資金ほか）",
    "provider": "山形市 商工観光部",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "特定創業支援資金は限度額100万〜2,000万円、保証料を市が9割補給",
    "summary": "令和8年4月1日からの市融資制度。特定創業支援資金は市長証明を得た創業者向けで、保証料を市が補給。",
    "eligibility": [
      "山形市内の中小企業者・創業者",
      "事業着工前に申請・事前審査"
    ],
    "industries": "all",
    "prefectures": [
      "山形県"
    ],
    "cities": [
      "山形市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年（令和8年4月1日〜・最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yamagata-yamagata.lg.jp/jigyosya/kighoshien/1006774/1003663.html"
  },
  {
    "id": "yamagata-city-dx-suishin",
    "name": "令和8年度山形市企業DX推進事業費補助金",
    "provider": "山形市 商工観光部",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助対象経費の2/3以内、各事業上限10万円",
    "summary": "企業のDX推進に取り組む経費（必須事業・任意事業）を補助。",
    "eligibility": [
      "山形市内に事業所がある従業員50人以下の中小企業・個人事業主"
    ],
    "industries": "all",
    "prefectures": [
      "山形県"
    ],
    "cities": [
      "山形市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和9年1月29日まで",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.yamagata-yamagata.lg.jp/jigyosya/kighoshien/1006774/1014100.html"
  },
  {
    "id": "yonezawa-city-shokogyo-chiiki-kasseika-hojo",
    "name": "商工業地域活性化支援事業費補助金",
    "provider": "米沢市 産業部 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2、上限30万円（令和7年度情報。最新年度は要確認）",
    "summary": "まちづくり、新商品開発、商談会出展などに係る費用を補助する。",
    "eligibility": [
      "中小企業者、中小企業者で組織された団体、産業振興を目的とする団体、まちづくり活動団体",
      "1事業者につき年度内1回まで"
    ],
    "industries": "all",
    "prefectures": [
      "山形県"
    ],
    "cities": [
      "米沢市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "毎月15日締切（翌月中に可否通知）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yonezawa.yamagata.jp/soshiki/5/1019/5/hozyokin/7823.html"
  },
  {
    "id": "yonezawa-city-sogyo-shien-hojo",
    "name": "創業支援事業費補助金",
    "provider": "米沢市 産業部 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2以内、上限15万円（40歳以下25万円）。移住創業+30万円、特定創業支援+10万円の加算で最大65万円（令和7年度版の記載。最新年度は要確認）",
    "summary": "市内で新たに事業を始める創業者の店舗内外装費・備品購入費などを補助する。",
    "eligibility": [
      "米沢市内で新たに創業する方",
      "家賃・光熱水費は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "山形県"
    ],
    "cities": [
      "米沢市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（予算がなくなり次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yonezawa.yamagata.jp/soshiki/5/1019/5/2/1167.html"
  },
  {
    "id": "fukushima-chiiki-kadai-kigyo",
    "name": "地域課題解決型起業支援事業補助金",
    "provider": "福島県 産業振興課／公益財団法人福島県産業振興センター",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "社会的課題の解決につながる創業を支援する補助金。",
    "eligibility": [
      "地域課題の解決に資する起業を行う方"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度第2回は6月29日〜7月29日で終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.fukushima.lg.jp/sec/32021b/sougyohozyokinn2026.html"
  },
  {
    "id": "fukushima-ikiiki-shokibo",
    "name": "ふくしま小規模企業者等いきいき支援事業",
    "provider": "福島県 経営金融課（申請窓口は管轄の商工団体）",
    "level": "prefecture",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助上限50万円（創業後の経営安定化タイプ。他は要確認）",
    "summary": "小規模企業者や商店街等の取組に対し、商工団体が計画づくりから実施後のフォローまで支援し、経費の一部を補助する。",
    "eligibility": [
      "福島県内の小規模企業者・商店街等",
      "創業後3年以内の経営安定化も対象"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.fukushima.lg.jp/sec/32011b/r8-ikiikihojokinn.html"
  },
  {
    "id": "fukushima-kigyoka-shien-yushi",
    "name": "福島県中小企業制度資金「起業家支援保証制度資金」",
    "provider": "福島県 経営金融課",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業関連保証枠は運転・設備資金で上限3,500万円（旧情報のため要確認）",
    "summary": "県内で新たに事業を始める方・独立開業する方向けの制度融資。一般枠、創業関連保証枠、スタートアップ創出促進保証枠がある。",
    "eligibility": [
      "県内で新たに事業を始める方、独立開業する方"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（県内金融機関で申込）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.fukushima.lg.jp/sec/32011b/kigyoukashien.html"
  },
  {
    "id": "fukushima-sogyo-setsubi-hojo",
    "name": "福島県創業促進・企業誘致に向けた設備投資等支援補助金（第14次公募）",
    "provider": "福島県 産業振興課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "要確認（補助限度額は引き上げられたとの記載あり）",
    "summary": "原子力災害で被害を受けた12市町村内での創業や事業展開に要する経費の一部を補助する。",
    "eligibility": [
      "福島県の被災12市町村内で創業・事業展開を行う事業者"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜10月19日（2回目締切10月19日・当日消印有効）",
    "deadline": "2026-10-19",
    "priority": 6,
    "url": "https://www.pref.fukushima.lg.jp/sec/32021b/14sougyou.html"
  },
  {
    "id": "aizuwakamatsu-city-hoshoryo-hojo",
    "name": "会津若松市 制度融資に係る信用保証料補助",
    "provider": "会津若松市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "福島県信用保証協会に納付した信用保証料の3/4を補助",
    "summary": "市の制度融資を利用した事業者が支払った信用保証料の一部を市が補助する。",
    "eligibility": [
      "市の制度融資を利用した市内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "会津若松市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.aizuwakamatsu.fukushima.jp/docs/2007080801204/"
  },
  {
    "id": "aizuwakamatsu-city-jisedai-tenjikai",
    "name": "会津若松市次世代産業関連展示会出展補助金",
    "provider": "会津若松市 企業立地課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "出展小間料の1/2以内、上限10万円（1企業年1回）",
    "summary": "次世代産業分野への新規参入・新事業展開を目指す中小企業者の展示会出展費用を補助する。ウェブ展示会も対象。",
    "eligibility": [
      "次世代産業分野への新規参入や新事業展開を目指す中小企業者",
      "国・県などの補助金との重複は不可"
    ],
    "industries": [
      "it",
      "manufacturing",
      "creative"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "会津若松市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度公募（令和9年3月末までに開催される展示会が対象）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.aizuwakamatsu.fukushima.jp/docs/2022090600012/"
  },
  {
    "id": "aizuwakamatsu-city-stepup-oen",
    "name": "会津若松市ステップアップ応援補助金",
    "provider": "会津若松市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "新規出店は中心市街地200万円・それ以外100万円が上限、チャレンジ事業の創業者は上限50万円",
    "summary": "令和8年度から旧まちなか出店応援補助金等を引き継ぐ制度。新規出店事業とチャレンジ事業の2区分がある。",
    "eligibility": [
      "新規創業者は特定創業支援事業の受講または支援団体の支援による証明書が必要",
      "市内で新規出店または新事業に取り組む事業者"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "会津若松市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度。第2回公募の認定審査会は9月17日（以降の公募は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.aizuwakamatsu.fukushima.jp/docs/2026031800011/"
  },
  {
    "id": "fukushima-city-chingin-hojokin",
    "name": "福島市中小企業等賃上げ支援補助金",
    "provider": "福島市 商工労働担当課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "対象労働者1人につき1万円（県の3万円に上乗せ）",
    "summary": "県の賃上げ緊急一時支援金の交付決定を受けた中小企業等に、市独自で上乗せ支給。先に県申請が必要。",
    "eligibility": [
      "福島市内の事業所で県の支援金の交付決定を受けた中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "福島市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（受付中表示・期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fukushima.fukushima.jp/f-work/companies/support/16938.html"
  },
  {
    "id": "fukushima-city-shutten-shien",
    "name": "福島市 出店支援事業（家賃支援・内外装工事補助）",
    "provider": "福島市 商業・中小企業担当課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "内外装工事: 1階路面店1/2・その他1/3、上限100万円。家賃: 月額上限20万円（1階路面店）/15万円、最長2年",
    "summary": "対象地域の空き店舗に出店する際の家賃と内外装工事費を補助。賃貸借契約前の相談が必須。",
    "eligibility": [
      "小売・飲食・サービス業で対面販売・サービスを行う",
      "対象地域の空き店舗へ出店"
    ],
    "industries": [
      "food",
      "retail",
      "beauty"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "福島市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fukushima.fukushima.jp/soshiki/5/1021/1/1142.html"
  },
  {
    "id": "fukushima-city-sogyo-riishikyu",
    "name": "福島市 創業応援利子補給事業",
    "provider": "福島市 産業雇用政策課 創業推進係",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "創業融資（上限2,000万円）の利子を全額、一定期間補給",
    "summary": "創業にかかる融資の利子を一定期間全額支援。令和8年度の公募情報は要確認。",
    "eligibility": [
      "融資実行時に新たに創業する方、または創業後1年以内の方"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "福島市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fukushima.fukushima.jp/soshiki/5/1020/1072/2/1/1121.html"
  },
  {
    "id": "iwaki-city-chusho-yushi",
    "name": "いわき市中小企業融資制度（創業者支援融資ほか）",
    "provider": "いわき市 産業振興部",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業者支援融資は限度額2,000万円、保証料を市が全額補助とされる（古い資料のため最新は要確認）",
    "summary": "市の中小企業融資制度。創業者向けの融資では信用保証料の補助がある。",
    "eligibility": [
      "市内で事業を営む、または新たに始める中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "いわき市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iwaki.lg.jp/www/contents/1001000002889/index.html"
  },
  {
    "id": "iwaki-city-ec-sokushin",
    "name": "令和8年度 EC促進支援（いわき市商工業活性化事業補助金〔EC事業〕）",
    "provider": "いわき市 産業振興部",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助対象経費の3分の2以内、上限30万円",
    "summary": "モール型ECサイトへの出店・出品や自社ECサイト構築など、販路開拓のための取組を補助する。",
    "eligibility": [
      "市内に本社または事業所がある中小企業等（卸売業は資本金1億円以下かつ従業員100人以下、小売業は資本金5千万円以下かつ従業員50人以下）",
      "市内で事業を継続すること"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "いわき市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "2026年5月14日〜2027年1月29日（予算額に達し次第終了）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.iwaki.lg.jp/www/contents/1776662673835/index.html"
  },
  {
    "id": "iwaki-city-keiei-hattatsu",
    "name": "いわき市経営発達補助金",
    "provider": "いわき市 産業振興部（商工会議所・商工会経由）",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率2/3以内、上限50万円",
    "summary": "商工会議所・商工会の伴走支援を受けて行う販路開拓や生産性向上の取組を補助する。創業予定者も対象。",
    "eligibility": [
      "市内の中小企業等（補助申請時点で未開業の市内創業予定者を含む）",
      "商工会議所または商工会の伴走支援を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "いわき市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度は2026年5月1日〜29日（受付終了。来年度は要確認）",
    "deadline": "2026-05-29",
    "priority": 8,
    "url": "https://www.city.iwaki.lg.jp/www/contents/1775553478746/index.html"
  },
  {
    "id": "iwaki-city-sangyo-dx",
    "name": "いわき市産業DX推進事業補助金",
    "provider": "いわき市 産業振興部",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助対象経費の2分の1以内、上限150万円",
    "summary": "地域ITベンダーによるコンサルティングやデジタル技術導入など、中小企業のDXと人手不足解消を支援する。",
    "eligibility": [
      "市内の中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "いわき市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は2026年5月1日〜6月30日（受付終了。来年度は要確認）",
    "deadline": "2026-06-30",
    "priority": 8,
    "url": "https://www.city.iwaki.lg.jp/www/contents/1773293003218/index.html"
  },
  {
    "id": "koriyama-city-furusato-kigyoka",
    "name": "郡山市ふるさと起業家支援事業費補助金",
    "provider": "郡山市 産業雇用政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限100万円",
    "summary": "社会起業家加速化支援プログラム採択者を対象に、クラウドファンディング型ふるさと納税を活用して補助する。",
    "eligibility": [
      "社会起業家加速化支援プログラムの採択者"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "郡山市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度（補助対象期間は令和8年7月1日予定〜令和9年3月31日）。受付状況は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.koriyama.lg.jp/soshiki/119/181596.html"
  },
  {
    "id": "koriyama-city-jigyo-shokei",
    "name": "郡山市事業承継支援補助金",
    "provider": "郡山市 産業雇用政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "要確認",
    "summary": "市内の事業承継に取り組む中小企業者等への補助制度。",
    "eligibility": [
      "市内で事業承継を行う中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "郡山市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.koriyama.lg.jp/soshiki/119/4851.html"
  },
  {
    "id": "koriyama-city-nofuku-shoko-innovation",
    "name": "郡山市農福商工連携イノベーション推進補助金",
    "provider": "郡山市 産業雇用政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率1/2以内、上限200万円（販路拡大に取り組む場合は50万円上乗せ）",
    "summary": "農福商工連携による新商品・新サービス開発と、展示会出展等の販路開拓経費を補助する。",
    "eligibility": [
      "事前に登録した市内企業等",
      "農福商工連携で新商品・新サービスを開発する事業者"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "郡山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（提出期限は令和8年7月17日まで延長・受付終了の可能性あり）。最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.koriyama.lg.jp/soshiki/119/145790.html"
  },
  {
    "id": "koriyama-city-sogyo-startup",
    "name": "郡山市スタートアップ支援補助金",
    "provider": "郡山市 産業雇用政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2、上限10万円（特定創業支援等事業の証明）／社会起業家加速化支援プログラム採択者は上限50万円",
    "summary": "市内で創業した中小企業者等に創業費用の一部を補助する。予算上限に達すると年度内でも受付終了する。",
    "eligibility": [
      "市内で創業した中小企業者等",
      "特定創業支援等事業を受けた者など"
    ],
    "industries": "all",
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "郡山市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和7年度の情報を確認。最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.koriyama.lg.jp/soshiki/119/91135.html"
  },
  {
    "id": "ibaraki-challenge-fund",
    "name": "いばらきチャレンジ基金事業",
    "provider": "茨城県 産業戦略部 中小企業課 経営支援室",
    "level": "prefecture",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "海外販路開拓などに取り組む県内中小企業を支援する基金事業。",
    "eligibility": [
      "県内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は第1次(4/10〜5/28)・第2次(〜10/2)とも終了。次回は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.ibaraki.jp/shokorodo/chusho/keiei/challengefund/top.html"
  },
  {
    "id": "ibaraki-digital-skill-hojo",
    "name": "デジタルスキル習得支援事業補助金",
    "provider": "茨城県 産業戦略部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "1事業者あたり最大10万円（補助率1/2）",
    "summary": "従業員のデジタルスキル習得に要する経費を補助する。先着順。",
    "eligibility": [
      "茨城県内の中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "〜令和9年1月29日（先着順）",
    "deadline": "2027-01-29",
    "priority": 6,
    "url": "https://www.pref.ibaraki.jp/shokorodo/sansei/kikaku/documents/sangyo_260916.pdf"
  },
  {
    "id": "ibaraki-josei-wakamono-sogyo-yushi",
    "name": "茨城県 女性・若者・障害者創業支援融資",
    "provider": "茨城県 産業戦略部 中小企業課",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業支援融資と合算で3,500万円まで／保証料は原則年0.9%",
    "summary": "女性・若者（35歳未満）・障害者の創業者向けの制度融資。",
    "eligibility": [
      "女性、35歳未満の若者、障害者の創業者"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.ibaraki.jp/shokorodo/sansei/kinyu/shosei/yushi/jyosei.html"
  },
  {
    "id": "ibaraki-shoene-setsubi-hojo",
    "name": "中小規模事業所省エネ対策設備導入補助金",
    "provider": "茨城県 生活環境部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "中小規模事業所の省エネ設備導入を支援する補助金。",
    "eligibility": [
      "県内の中小規模事業所"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "申請期限 令和8年12月18日17時",
    "deadline": "2026-12-18",
    "priority": 6,
    "url": "https://www.pref.ibaraki.jp/seikatsukankyo/kansei/chikyu/hojokin.html"
  },
  {
    "id": "ibaraki-shokibo-shien-yushi",
    "name": "茨城県 小規模企業支援融資",
    "provider": "茨城県 産業戦略部 中小企業課",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "設備・運転・併用それぞれ2,000万円まで",
    "summary": "小規模企業者向けの長期事業資金。経営合理化、新分野進出、雇用促進など区分がある。申込窓口は商工会議所・商工会・中央会。",
    "eligibility": [
      "県内の小規模企業者"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.ibaraki.jp/shokorodo/sansei/kinyu/shosei/yushi/shokibo.html"
  },
  {
    "id": "ibaraki-sogyo-shien-yushi",
    "name": "茨城県 創業支援融資",
    "provider": "茨城県 産業戦略部 中小企業課",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "設備・運転各3,500万円まで（設備10年以内・運転7年以内、利率は要確認）",
    "summary": "創業者向けの県制度融資。2号はスタートアップ創出促進保証制度の要件を満たす者が対象。",
    "eligibility": [
      "創業予定または創業間もない方"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.ibaraki.jp/shokorodo/sansei/kinyu/shosei/yushi/sogyo.html"
  },
  {
    "id": "hitachi-city-datsutanso-setsubi-hojo",
    "name": "日立市脱炭素設備導入促進事業補助金（令和8年度）",
    "provider": "日立市 産業経済部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/3以内、上限100万円",
    "summary": "省エネ診断等で助言を受けた設備の導入・更新や運用改善の経費を補助する。",
    "eligibility": [
      "日立市内に事業所を持つ中小企業者等",
      "申請時点で省エネ診断等を受けていること",
      "日立市脱炭素経営支援システムに登録していること"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "日立市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度（詳細は公式ページ参照）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hitachi.lg.jp/sangyo_business/shien_hojo_josei/1003000/1019299.html"
  },
  {
    "id": "hitachi-city-jinteki-shihon-keiei-hojo",
    "name": "日立市中小企業人的資本経営支援事業補助金（令和8年度）",
    "provider": "日立市 産業経済部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "上限30万円（補助率は要確認）",
    "summary": "人的資本経営に取り組む市内中小企業を支援する補助金。競争力強化・課題解決支援補助金とはいずれか1つのみ申請可。",
    "eligibility": [
      "日立市内の中小企業者",
      "人的資本経営に取り組むこと"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "日立市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度（詳細は公式ページ参照）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hitachi.lg.jp/sangyo_business/shien_hojo_josei/1003000/1019265.html"
  },
  {
    "id": "hitachi-city-kyosoryoku-kyoka-hojo",
    "name": "日立市中小企業競争力強化支援事業補助金（令和8年度）",
    "provider": "日立市 産業経済部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/3以内、上限80万円",
    "summary": "収益力向上のため競争力強化に取り組む中小企業を支援する。先端設備等の導入も対象。",
    "eligibility": [
      "日立市内の中小企業者",
      "収益力向上・競争力強化のための事業を行うこと",
      "先端設備等を導入する場合は事前に導入計画の認定を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "日立市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度（詳細は公式ページ参照）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hitachi.lg.jp/sangyo_business/shien_hojo_josei/1003000/1019263.html"
  },
  {
    "id": "hitachi-city-tenpo-office-kaisetsu-shien",
    "name": "日立市店舗・オフィス開設支援事業",
    "provider": "日立市 産業経済部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "開設時の限度額50万円、2年目20万円、3年目10万円（補助率は要確認）",
    "summary": "市内で新規開店した店舗・オフィスの開設費用等を支援する。令和8年1月1日〜12月31日に新規開店したものが対象とされる。",
    "eligibility": [
      "日立市内で新規開店した店舗・オフィスであること",
      "令和8年1月1日〜12月31日の開店であること"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "日立市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hitachi.lg.jp/sangyo_business/shien_hojo_josei/1003000/1003016.html"
  },
  {
    "id": "koga-city-chushokigyo-jigyo-shikin-yushi",
    "name": "古河市中小企業事業資金融資",
    "provider": "古河市 産業戦略課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額 設備・運転とも1,000万円、返済10年以内。利子補給は年0.5%上限で1年間、保証料補給は年1%上限",
    "summary": "中小企業者に事業資金の融資をあっ旋し、保証料および利子の一部を補助する。",
    "eligibility": [
      "古河市内の中小企業者",
      "市税を滞納していないこと等、制度の要件を満たすこと"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "古河市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ibaraki-koga.lg.jp/soshiki/syoko/3/1150.html"
  },
  {
    "id": "koga-city-shoene-shindan-hojo",
    "name": "古河市中小企業向け省エネ診断等促進補助金",
    "provider": "古河市 企画課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "事業所ごとに1年度あたり各上限3万円",
    "summary": "国の省エネ診断・省エネ支援等を活用した市内中小企業・個人事業主に補助金を交付する。",
    "eligibility": [
      "古河市内に事業所を持つ中小企業者・小規模企業者",
      "省エネ診断、省エネ支援、カーボンニュートラル・アクションプラン等を実施すること"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "古河市"
    ],
    "stages": [
      "established"
    ],
    "period": "事業の実施前後・実施中のいつでも申請可（予算の範囲内）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ibaraki-koga.lg.jp/soshiki/kikaku/kabon/18666.html"
  },
  {
    "id": "koga-city-shotengai-akitenpo-hojo",
    "name": "古河市商店街空き店舗等対策事業補助金",
    "provider": "古河市 産業戦略課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改造費・賃借料の一部（補助率・上限額は要確認）",
    "summary": "商店街区域内の空き店舗を活用して新規出店する場合の改造費・賃借料に補助金を交付する。",
    "eligibility": [
      "商店街の区域内の空き店舗を活用して新規出店する方",
      "事業開始の30日前までに申請すること"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "古河市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "予算額に達するまで",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ibaraki-koga.lg.jp/soshiki/syoko/3/10950.html"
  },
  {
    "id": "mito-city-chusho-shinko-shien",
    "name": "水戸市中小企業振興支援補助金",
    "provider": "水戸市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "デジタルツール導入は1/2以内・上限100万円、人材確保・育成と販路拡大は1/2以内・上限20万円",
    "summary": "物価高騰・人材不足・DX等に対応する5種の補助事業（デジタルツール導入、人材確保・育成、販路拡大など）。事前申請制。",
    "eligibility": [
      "市内の中小企業者等",
      "申請前に事業に着手していないこと"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "水戸市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "掲載の販路拡大は令和8年3月13日まで。最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.mito.lg.jp/page/75067.html"
  },
  {
    "id": "mito-city-machinaka-akitenpo",
    "name": "水戸市まちなか空き店舗対策補助制度",
    "provider": "水戸市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費の補助率1/2以内",
    "summary": "まちなかの空き店舗を借りて営業を始める創業者等に店舗改装費の一部を補助する。",
    "eligibility": [
      "空き店舗を借りて出店する創業者等"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "水戸市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和7年度は受付期限あり。最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.mito.lg.jp/site/mito-sougyou/1934.html"
  },
  {
    "id": "mito-city-maruke-risihokyu",
    "name": "水戸市マル経融資利子補給制度",
    "provider": "水戸市 商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "利率1%分以内を3年間補給（融資限度額1,000万円）",
    "summary": "小規模事業者経営改善資金（マル経融資）の利子の一部を補給する。",
    "eligibility": [
      "マル経融資を利用した小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "水戸市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.mito.lg.jp/page/3636.html"
  },
  {
    "id": "mito-city-sogyo-risihokyu",
    "name": "水戸市創業支援利子補給制度",
    "provider": "水戸市 商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "利率1%分を融資実行から3年間補給",
    "summary": "創業のための融資を受けた事業者に利子の一部を補給する。",
    "eligibility": [
      "創業のための融資を受けた創業者"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "水戸市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.mito.lg.jp/page/4738.html"
  },
  {
    "id": "mito-city-sogyoki-shien",
    "name": "水戸市創業期支援補助金",
    "provider": "水戸市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2、上限20万円",
    "summary": "創業予定者・創業後3年未満の事業者のHP作成、広告掲載、展示会参加等の費用を補助する。事前申請制。",
    "eligibility": [
      "認定特定創業支援等事業による支援を受けた創業予定者",
      "創業後3年未満の事業者"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "水戸市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度以降の申請が対象。予算がなくなり次第終了。最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.mito.lg.jp/page/4270.html"
  },
  {
    "id": "toride-city-akitenpo-katsuyo-hojo",
    "name": "取手市空き店舗活用補助金",
    "provider": "取手市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "店舗家賃の1/2、上限月額5万円、1年間",
    "summary": "市内の空き店舗に出店する人の家賃を補助する制度（令和6年4月の要綱改正で家賃補助のみ）。",
    "eligibility": [
      "取手市商工会の会員（入会予定含む）であること",
      "週40時間以上営業し1年以上継続見込みであること",
      "3か月以上営業のない店舗に出店すること"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "取手市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（令和8年度の公募状況は未確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toride.ibaraki.jp/hojokinjoseikin-index.html"
  },
  {
    "id": "toride-city-challenge-shien-hojo",
    "name": "取手市産業振興チャレンジ支援事業補助金（起業初期費用補助）",
    "provider": "取手市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限1万円",
    "summary": "市内で起業する際の初期費用を補助する制度。",
    "eligibility": [
      "市内で起業する人",
      "一般社団法人とりで起業家支援ネットワーク（Matchとりで）に起業家登録していること"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "取手市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toride.ibaraki.jp/sanshin/jigyosha/shokogyo/sougyousienn/challenge.html"
  },
  {
    "id": "toride-city-incubation-office-hojo",
    "name": "取手市市民事業活動促進補助金（インキュベーションオフィス等利用料補助）",
    "provider": "取手市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "予算の範囲内（補助率・上限は要確認）",
    "summary": "事業活動支援を主目的に設置されたインキュベーションオフィス等の利用料金を補助する制度。",
    "eligibility": [
      "市内に本店または主たる事業所がある法人・個人事業主",
      "インキュベーションオフィス等を利用していること"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "取手市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toride.ibaraki.jp/sanshin/jigyosha/shokogyo/yuchi/jigyoukatudou.html"
  },
  {
    "id": "tsuchiura-city-chushin-kaigyo-shien",
    "name": "土浦市中心市街地開業支援事業",
    "provider": "土浦市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費は対象経費の1/2以内・上限50万円、家賃は1/2以内・上限120万円（10万円×12か月）",
    "summary": "中心市街地区域内の空き店舗に新規開業する方に、改装費または家賃の一部を補助する。",
    "eligibility": [
      "中心市街地区域内の空き店舗に新規開業する方",
      "小売業・サービス業等、または常勤雇用者2人以上のオフィス等",
      "道路に面した1階・2階の店舗等"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "土浦市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsuchiura.lg.jp/kigyoyuchi/hojoseido/page017989.html"
  },
  {
    "id": "tsuchiura-city-chushokigyo-shinko-shikin-yushi",
    "name": "土浦市中小企業振興資金融資制度（保証料補給・利子補給）",
    "provider": "土浦市 商工観光課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "信用保証料を市が負担、利子補給は年1.0%相当分を融資日から3年間（融資限度額は要確認）",
    "summary": "市の融資あっ旋を受けた中小企業者に対し、信用保証料の負担と利子補給を行う。",
    "eligibility": [
      "市内に店舗・工場・事業所を有し1年以上の営業実績があること",
      "市税を完納または完納見込みであること"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "土浦市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsuchiura.lg.jp/shigoto-sangyo/sangyo/chusyokigyoshien/jigyosha-shien/page000264.html"
  },
  {
    "id": "tsukuba-city-business-kakudai",
    "name": "つくば市ビジネス拡大支援補助金",
    "provider": "つくば市 経済部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率8/10（経営革新計画認定等）または5/10（専門家意見書）、上限30万円",
    "summary": "市内中小企業の新製品・新サービス開発や新分野への転換経費を補助する。",
    "eligibility": [
      "市内の中小企業等",
      "経営革新計画等の認定または専門家の意見書"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "つくば市"
    ],
    "stages": [
      "established"
    ],
    "period": "前回（令和7年度分）は令和8年2月末まで。最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsukuba.lg.jp/soshikikarasagasu/keizaibusangyoshinkoka/gyomuannai/3/2/2/1018201.html"
  },
  {
    "id": "tsukuba-city-sansan-sangaku-kenkyu",
    "name": "つくば市産産・産学連携研究開発支援補助金",
    "provider": "つくば市 経済部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "要確認",
    "summary": "市内ものづくり中小企業等が大学・公的研究機関の成果を活用して行う共同研究等の経費を補助する。",
    "eligibility": [
      "市内のものづくり中小企業等",
      "大学・公的研究機関等との連携"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "つくば市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度は申請期限6/26で受付終了。次回は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsukuba.lg.jp/soshikikarasagasu/keizaibusangyoshinkoka/gyomuannai/3/2/2/20121.html"
  },
  {
    "id": "tsukuba-city-shinki-sogyo-sokushin",
    "name": "つくば市新規創業促進補助金",
    "provider": "つくば市 経済部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率10/10、上限12万5千円（登録免許税・定款認証手数料）",
    "summary": "市内で会社を設立する人の登録免許税等を補助する。予算がなくなり次第終了、事後申請不可。",
    "eligibility": [
      "つくば市の特定創業支援事業の証明を受けている",
      "令和9年3月31日までに証明書記載の会社を設立し代表となる"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "つくば市"
    ],
    "stages": [
      "planning"
    ],
    "period": "令和8年度（予算がなくなり次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsukuba.lg.jp/soshikikarasagasu/keizaibusangyoshinkoka/gyomuannai/3/2/2/1011812.html"
  },
  {
    "id": "tsukuba-city-sogyo-hosyoryo-hojo",
    "name": "つくば市創業支援融資信用保証料補助金",
    "provider": "つくば市 経済部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "信用保証料の1/2相当額",
    "summary": "茨城県の創業支援融資等を受ける市内の法人・個人に信用保証料の半額を補助する。",
    "eligibility": [
      "茨城県中小企業資金融資の創業支援融資または女性・若者・障害者創業支援融資を利用",
      "商工会等の認定を受けている"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "つくば市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsukuba.lg.jp/soshikikarasagasu/keizaibusangyoshinkoka/gyomuannai/3/2/2/1017343.html"
  },
  {
    "id": "tsukuba-city-startup-ricchi-shorei",
    "name": "つくば市スタートアップ立地推進奨励補助金",
    "provider": "つくば市 スタートアップ推進室",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "事業所の月額賃料の1/2、月額上限7.5万円（1年目）・3万円（2年目）、最大2年",
    "summary": "市内に事業所を開設したスタートアップの賃料を補助する。",
    "eligibility": [
      "令和8年2月1日以降に市内に事業所を開設したスタートアップ",
      "つくば市スタートアップ登録制度への登録"
    ],
    "industries": "all",
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "つくば市"
    ],
    "stages": [
      "early"
    ],
    "period": "令和8年度要項あり（受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsukuba.lg.jp/soshikikarasagasu/seisakuinnovationbustartupsuishinshitsu/gyomuannai/2/1/1005142.html"
  },
  {
    "id": "tochigi-chiiki-kadai-sogyo",
    "name": "地域課題解決型創業支援補助金",
    "provider": "栃木県 産業労働観光部／栃木県産業振興センター",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、上限200万円",
    "summary": "地域課題の解決に取り組む創業者の人件費・店舗等借入費・設備費などを補助する。",
    "eligibility": [
      "栃木県内で創業する方（要件は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "栃木県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は1次(4/2〜4/30)・2次(6/16〜7/8)とも終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.tochigi.lg.jp/f03/chiikikadai_hojo.html"
  },
  {
    "id": "tochigi-shokibo-kigyo-shikin",
    "name": "栃木県制度融資 小規模企業資金",
    "provider": "栃木県 産業労働観光部",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "一般貸付3,000万円、小口零細貸付2,000万円まで",
    "summary": "小規模企業者が一般的な事業資金を借り入れる県制度融資。",
    "eligibility": [
      "栃木県内の小規模企業者"
    ],
    "industries": "all",
    "prefectures": [
      "栃木県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.tochigi.lg.jp/f03/work/shoukougyou/yuushi/"
  },
  {
    "id": "tochigi-shuekiryoku-program",
    "name": "とちぎ中小企業 収益力向上プログラム",
    "provider": "栃木県 産業労働観光部",
    "level": "prefecture",
    "type": "専門家支援",
    "cat": "その他",
    "amount": "要確認",
    "summary": "令和8年度の参加企業を募集する中小企業の収益力向上支援プログラム。",
    "eligibility": [
      "栃木県内の中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "栃木県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.tochigi.lg.jp/f03/service/r8henkaku_bosyu.html"
  },
  {
    "id": "tochigi-sogyo-shien-shikin",
    "name": "栃木県制度融資 創業支援資金",
    "provider": "栃木県 産業労働観光部",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "別表1は運転2,000万円・設備3,000万円、別表2・4は3,500万円、別表3(女性・若者・シニア)は2,000万円。利率は令和8年4月改定で要確認",
    "summary": "創業前または創業後5年未満の方向け制度融資。信用保証協会の保証付き。",
    "eligibility": [
      "創業前、または創業後5年未満の方"
    ],
    "industries": "all",
    "prefectures": [
      "栃木県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.tochigi.lg.jp/f03/work/shoukougyou/yuushi/1179725123542.html"
  },
  {
    "id": "ashikaga-city-akitenpo-shuten-ouen-hojo",
    "name": "足利市空き店舗等出店応援事業費補助金",
    "provider": "足利市 産業観光部 商業にぎわい課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "要確認（出店にかかる費用の一部）",
    "summary": "空き家・空き店舗・空き倉庫を活用して新たに店舗を出店する個人・法人に、出店費用の一部を補助する。審査あり。",
    "eligibility": [
      "空き家・空き店舗・空き倉庫を活用して新規出店する個人または法人",
      "遊休資産の現状写真等の提出",
      "過去の補助金の返還請求を受けていないこと"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "栃木県"
    ],
    "cities": [
      "足利市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（公式ページ参照）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ashikaga.tochigi.jp/industory/000058/000304/p002605.html"
  },
  {
    "id": "ashikaga-city-sogyosha-stepup-hojo",
    "name": "令和8年度創業者ステップアップ補助金",
    "provider": "足利市 産業観光部 商業にぎわい課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2、上限10万円",
    "summary": "市内で新たに創業した方の専門家相談・広告宣伝・人材育成（スキルアップ）費用の一部を補助する。",
    "eligibility": [
      "足利市内で新たに創業した方",
      "特定創業支援等事業の支援を受けていること",
      "創業後5年未満"
    ],
    "industries": "all",
    "prefectures": [
      "栃木県"
    ],
    "cities": [
      "足利市"
    ],
    "stages": [
      "early"
    ],
    "period": "令和8年4月1日〜令和9年3月31日",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.ashikaga.tochigi.jp/living/000914/000917/p002670.html"
  },
  {
    "id": "oyama-city-chushin-shigaichi-shuten-hojo",
    "name": "小山市中心市街地出店補助金（空き店舗内装改造費補助）",
    "provider": "小山市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "内装改造費の一部（補助率・上限額は要確認）",
    "summary": "中心市街地で3か月以上空き店舗となっている店舗へ新たに出店する方に、内装改造費を補助する。",
    "eligibility": [
      "中心市街地の空き店舗（3か月以上空き）へ新規出店する方",
      "要綱の定める要件を満たすこと"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "栃木県"
    ],
    "cities": [
      "小山市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.oyama.tochigi.jp/sangyou-sigoto/shokogyo/shogyo/page003523.html"
  },
  {
    "id": "oyama-city-chushokigyo-yushi",
    "name": "小山市中小企業向け融資制度（保証料補助あり）",
    "provider": "小山市 商工観光課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額・利率は要確認（信用保証料補助あり）",
    "summary": "市内中小企業者が利用できる市の融資制度。営業・設備・創業などの資金が対象で、保証料補助もある。",
    "eligibility": [
      "小山市内の中小企業者",
      "市の融資制度の要件を満たすこと"
    ],
    "industries": "all",
    "prefectures": [
      "栃木県"
    ],
    "cities": [
      "小山市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.oyama.tochigi.jp/sangyou-sigoto/shokogyo/shogyo/page006302.html"
  },
  {
    "id": "oyama-city-hanro-kaitaku-joseikin",
    "name": "小山市中小企業販路開拓事業助成金",
    "provider": "小山市 商工観光課",
    "level": "municipality",
    "type": "助成金",
    "cat": "販路開拓・PR",
    "amount": "対象経費の1/3以内、上限30万円（国内・オンライン開催）／50万円（国外開催）",
    "summary": "市内中小企業が展示会等へ出展する費用の一部を助成する制度。",
    "eligibility": [
      "小山市内の中小企業者",
      "展示会・商談会等へ出展すること",
      "市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "栃木県"
    ],
    "cities": [
      "小山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（年度ごとに公式ページで確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.oyama.tochigi.jp/sangyou-sigoto/shokogyo/kogyo/page001486.html"
  },
  {
    "id": "oyama-city-sbt-ninsho-hojo",
    "name": "小山市中小企業SBT認定取得支援事業補助金",
    "provider": "小山市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "対象経費の1/2、上限100万円",
    "summary": "中小企業向けSBT認定の取得に要する経費の一部を補助し、脱炭素化を促進する。認定取得後に交付。",
    "eligibility": [
      "小山市内の中小企業者等",
      "中小企業向けSBT認定を取得すること"
    ],
    "industries": "all",
    "prefectures": [
      "栃木県"
    ],
    "cities": [
      "小山市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.oyama.tochigi.jp/sangyou-sigoto/shokogyo/kogyo/page006182.html"
  },
  {
    "id": "utsunomiya-city-hanro-kaitaku",
    "name": "宇都宮市販路開拓支援事業補助制度",
    "provider": "宇都宮市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "一定規模以上の展示会等へ自社製品を出展する経費の一部を補助する。リーディング企業認定で要件緩和あり。",
    "eligibility": [
      "市内の事業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "栃木県"
    ],
    "cities": [
      "宇都宮市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.utsunomiya.tochigi.jp/sangyo/1031142/1031594/1031610.html"
  },
  {
    "id": "utsunomiya-city-shinsangyo-sosyutsu",
    "name": "宇都宮市新産業創出支援補助制度",
    "provider": "宇都宮市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率1/2以内、フェーズごと上限200万円",
    "summary": "次世代モビリティ、環境・エネルギー、医療・健康福祉、農業、ICT分野の革新的な研究開発経費を補助する。",
    "eligibility": [
      "市内に本社または主たる事業所を持つ中小企業者等",
      "補助事業完了後も3年以上市内で事業継続"
    ],
    "industries": [
      "manufacturing",
      "it"
    ],
    "prefectures": [
      "栃木県"
    ],
    "cities": [
      "宇都宮市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "掲載の募集は令和4年のもの。最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.utsunomiya.tochigi.jp/sangyo/kigyo/venture/1006894.html"
  },
  {
    "id": "utsunomiya-city-shogakukin-henkan",
    "name": "宇都宮市奨学金返還支援補助金（協力企業制度）",
    "provider": "宇都宮市",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "従業員への補助：年度上限10万円・最大36か月で1人30万円",
    "summary": "従業員の奨学金返還を支援する企業を協力企業に登録し、企業支給額と同額等を従業員に補助して人材確保を後押しする。",
    "eligibility": [
      "市内に本社または市内勤務の事業所を持つ企業",
      "正社員向け奨学金返還支援制度があり雇用保険適用"
    ],
    "industries": "all",
    "prefectures": [
      "栃木県"
    ],
    "cities": [
      "宇都宮市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "協力企業を募集（受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.utsunomiya.tochigi.jp/sangyo/sangyo/1031666.html"
  },
  {
    "id": "utsunomiya-city-taishokukin-kyosai",
    "name": "宇都宮市中小企業退職金共済制度加入促進補助",
    "provider": "宇都宮市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "月額掛金（1人1万円まで）の20%、1事業主あたり上限12万円",
    "summary": "中小企業退職金共済制度に新規加入した事業主に、掛金の一部を1年間補助する。",
    "eligibility": [
      "市内で事業を営み市税の滞納がない事業主",
      "中退共と新たに共済契約を結んだこと"
    ],
    "industries": "all",
    "prefectures": [
      "栃木県"
    ],
    "cities": [
      "宇都宮市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "毎年1月に前年分を申請",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.utsunomiya.tochigi.jp/sangyo/sangyo/chushokigyo/1006823.html"
  },
  {
    "id": "gunma-cross-start",
    "name": "ぐんまクロススタート補助金（起業支援金）",
    "provider": "群馬県 未来投資・デジタル産業課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、上限200万円（想定5〜10名程度）",
    "summary": "地域課題解決に取り組みながら県経済を牽引する企業を目指し、起業または事業承継・第二創業する個人・事業者を支援する。",
    "eligibility": [
      "群馬県内で新たに起業、または事業承継・第二創業する方"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は4/15〜5/22で終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.gunma.jp/site/houdou/752268.html"
  },
  {
    "id": "gunma-dx-gijutsu-kakushin",
    "name": "ぐんまDX技術革新補助金",
    "provider": "群馬県 地域企業支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認",
    "summary": "パートナーシップ構築宣言を行っている中小企業者のDX・技術革新の取組を支援する。",
    "eligibility": [
      "パートナーシップ構築宣言を行っている中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度は4月〜5/15で終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.gunma.jp/site/hojokin/10641.html"
  },
  {
    "id": "gunma-jigyo-shokei-yushi",
    "name": "群馬県制度融資 事業承継支援資金",
    "provider": "群馬県 地域企業支援課",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額8,000万円",
    "summary": "事業承継を行う中小企業者を資金面から支援する県制度融資。",
    "eligibility": [
      "事業承継を行う県内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "通年（取扱金融機関で申込）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.gunma.jp/site/seidoyuushi/9992.html"
  },
  {
    "id": "gunma-power-up-shikin",
    "name": "群馬県制度融資 中小企業パワーアップ資金",
    "provider": "群馬県 地域企業支援課",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "中小企業の事業活動を支える県制度融資。",
    "eligibility": [
      "群馬県内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.gunma.jp/site/seidoyuushi/10025.html"
  },
  {
    "id": "gunma-seicho-ma-hojo",
    "name": "群馬県成長実現型M&A補助金",
    "provider": "群馬県 地域企業支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "補助率1/2以内、上限200万円",
    "summary": "後継者不在の中小企業の事業承継・M&A・PMIを支援する。",
    "eligibility": [
      "群馬県内の中小企業者（売り手・買い手）"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "譲渡型・承継後支援型は令和8年12月18日まで（譲受型は9月30日終了）",
    "deadline": "2026-12-18",
    "priority": 6,
    "url": "https://www.pref.gunma.jp/site/houdou/756646.html"
  },
  {
    "id": "isesaki-city-chusho-gx-suishin",
    "name": "伊勢崎市中小企業GX推進事業費補助金",
    "provider": "伊勢崎市 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/3または2/3（賃上げ表明等による）、上限100万〜400万円",
    "summary": "省エネ設備等の導入に対し賃上げ率に応じて補助する。",
    "eligibility": [
      "市内の中小企業者",
      "省エネ設備等の導入"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "伊勢崎市"
    ],
    "stages": [
      "established"
    ],
    "period": "本文は令和8年7/27〜10/30、ページ題は申請期間終了表記（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.isesaki.lg.jp/sangyo_nyusatsu_kaihatsu/sangyoshinko/kigyoshien_hojokin_yushi_menjonado/18685.html"
  },
  {
    "id": "isesaki-city-chusho-yushi",
    "name": "伊勢崎市中小企業者・創業者への融資",
    "provider": "伊勢崎市 商工労働課 融資労政係",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "市内の中小企業者および創業者に必要な資金を融資する市の制度。",
    "eligibility": [
      "市内に事業所を登記する法人、または市内に1年以上居住する個人の中小企業者・創業者"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "伊勢崎市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.isesaki.lg.jp/shinseisho_download/jigyoshamukenoshinseisho/shoukogyo/17790.html"
  },
  {
    "id": "isesaki-city-shokibo-support",
    "name": "伊勢崎市小規模事業者サポート補助金",
    "provider": "伊勢崎市 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "対象経費の1/2以内、上限50万円",
    "summary": "設備導入・販路拡大・人材開発など業務改善や生産性向上の取組を支援する。",
    "eligibility": [
      "市内で事業を営む小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "伊勢崎市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度は申請期間終了（7/10）。次回は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.isesaki.lg.jp/soshiki/keizai/shoko/syoukousinkou/12899.html"
  },
  {
    "id": "isesaki-city-sogyo-jigyoshokei-support",
    "name": "伊勢崎市創業促進・事業承継サポート補助金",
    "provider": "伊勢崎市 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限100万円（中心市街地区域は150万円）",
    "summary": "市内での創業または事業承継に伴う改装費・備品購入費・販売促進費を補助する。予算に達し次第終了。",
    "eligibility": [
      "市内で令和9年2月26日までに創業または事業承継",
      "特定創業支援等事業の支援を受けている（創業の場合）",
      "創業後3年以上継続する計画"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "伊勢崎市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年1月29日（予算に達し次第終了）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.isesaki.lg.jp/soshiki/keizai/shoko/syoukousinkou/6469.html"
  },
  {
    "id": "kiryu-city-akitenpo-shintenpo-sogyo-hojo",
    "name": "桐生市空き店舗活用型新店舗開設・創業促進事業補助金",
    "provider": "桐生市 産業経済部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改修工事費の1/2、上限100万円（中心市街地内）／50万円（中心市街地外）。市の空き店舗登録物件は10万円加算",
    "summary": "一定期間使われていない店舗等を改修して新店舗を開く方に、改修工事費の一部を補助する。令和8年度の受付状況は要確認。",
    "eligibility": [
      "空き店舗等を改修して新店舗を開設する方",
      "年度末までに開業できること",
      "市指定専門家の事業計画診断で「可」を得ること"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "桐生市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（予算上限に達し次第終了の可能性）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kiryu.lg.jp/sangyou/1018120/hojo/1008687.html"
  },
  {
    "id": "kiryu-city-chushin-akitenpo-yushi",
    "name": "桐生市中心市街地空き店舗等活用支援資金融資制度",
    "provider": "桐生市 産業経済部 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "必要経費の90%以内、1,000万円以内",
    "summary": "中心市街地の空き店舗等を活用して事業を行う方向けの制度融資。",
    "eligibility": [
      "中心市街地の空き店舗等を活用する方",
      "制度融資の要件を満たすこと"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "桐生市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kiryu.lg.jp/sangyou/kinyu/yuushi/1004378.html"
  },
  {
    "id": "kiryu-city-tenjikai-shuppin-hojo",
    "name": "桐生市販路拡大支援事業（展示会出展補助金）",
    "provider": "桐生市 産業経済部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "市内事業者の展示会出展を支援する販路拡大支援事業。",
    "eligibility": [
      "桐生市内の事業者",
      "展示会等に出展すること"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "桐生市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kiryu.lg.jp/sangyou/1018120/hojo/1002467.html"
  },
  {
    "id": "maebashi-city-dx-suishin",
    "name": "前橋市DX推進補助金",
    "provider": "前橋市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/3（小規模事業者1/2）、上限150万円",
    "summary": "業務効率化のためのソフトウェア・ハードウェア導入費を補助する。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "前橋市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度分は受付終了（審査中）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.maebashi.gunma.jp/soshiki/sangyokeizai/sangyoseisaku/shinseisho/7311.html"
  },
  {
    "id": "maebashi-city-jinzai-skillup",
    "name": "前橋市人財スキルアップ補助金",
    "provider": "前橋市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率1/2（小規模事業者2/3）、上限7万円（DX人材育成等で12万円）",
    "summary": "従業員の研修・資格試験受講料等を補助する。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "前橋市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度の案内あり。受付状況は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.maebashi.gunma.jp/soshiki/sangyokeizai/sangyoseisaku/shinseisho/7296.html"
  },
  {
    "id": "maebashi-city-keiei-keikaku-jikko",
    "name": "前橋市経営計画実行補助金",
    "provider": "前橋市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率2/3以内、上限20万円",
    "summary": "商工会議所・商工会の支援で経営計画を作成・見直した事業者の計画実行費用を補助する。省エネのみが目的の事業は対象外。",
    "eligibility": [
      "経営計画を作成・見直した市内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "前橋市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度、随時受付（予算上限まで）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.maebashi.gunma.jp/soshiki/sangyokeizai/sangyoseisaku/gyomu/4/2/6/30411.html"
  },
  {
    "id": "maebashi-city-machinaka-kaigyo",
    "name": "前橋市まちなか開業支援補助金",
    "provider": "前橋市 にぎわい商業課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/2（上限は立地・業態により異なる）",
    "summary": "中心市街地で店舗・オフィスを開業する事業者の改修工事費・備品購入費を補助する。",
    "eligibility": [
      "中心市街地で新規開業する事業者"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "前橋市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年2月28日",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.maebashi.gunma.jp/soshiki/sangyokeizai/nigiwaishogyo/shinseisho/7284.html"
  },
  {
    "id": "maebashi-city-sogyo-support",
    "name": "前橋市創業サポート総合制度",
    "provider": "前橋市 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "制度融資の利子・保証料の一部補助、診断士による無料コンサル最大8回",
    "summary": "創業者向けに中小企業診断士の伴走支援と、前橋市起業家独立開業支援資金の利子・保証料補助を行う。",
    "eligibility": [
      "市内で創業する者・創業間もない事業者"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "前橋市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "利子補給等の申請は毎年1月受付。最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.maebashi.gunma.jp/soshiki/sangyokeizai/sangyoseisaku/gyomu/4/2/4/3302.html"
  },
  {
    "id": "maebashi-city-startup-office",
    "name": "前橋市スタートアップオフィス支援補助金",
    "provider": "前橋市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "賃借料の1/3、月額上限3万円",
    "summary": "市内で事業所を新たに借りる創業者の家賃を補助する。特定創業支援等事業の証明書が条件。",
    "eligibility": [
      "市内で事業所を賃借して創業する者",
      "特定創業支援等事業の証明書を取得"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "前橋市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和7年度分は令和7年9月30日で締切。令和8年度は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.maebashi.gunma.jp/soshiki/sangyokeizai/sangyoseisaku/gyomu/4/2/4/25333.html"
  },
  {
    "id": "ota-gunma-city-akiten-reform",
    "name": "空き店舗対策リフォーム支援事業補助金",
    "provider": "太田市 産業ミライ推進課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "要確認",
    "summary": "空き店舗を活用して出店する際のリフォーム費用を補助する制度。令和8年度の受付は終了。",
    "eligibility": [
      "要確認（太田市内の空き店舗への出店）"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "太田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度の受付は終了（来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ota.gunma.jp/page/2612.html"
  },
  {
    "id": "ota-gunma-city-chusho-yushi",
    "name": "太田市中小企業者向け融資制度",
    "provider": "太田市 産業ミライ推進課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認（限度額・利率は資金の種類ごとに異なる）",
    "summary": "市が金融機関に融資原資の一部を預託し、低利の固定金利で融資する制度融資。小口資金・設備資金・経営安定資金などがある。",
    "eligibility": [
      "太田市内の中小企業者",
      "資金の種類ごとの要件は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "太田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ota.gunma.jp/page/2646.html"
  },
  {
    "id": "ota-gunma-city-dx-suishin",
    "name": "太田市DX推進補助金",
    "provider": "太田市 産業ミライ推進課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "システム導入費用（税抜）の2分の1以内、上限100万円",
    "summary": "省力化機器や勤怠管理システム等の導入費用を補助する。令和8年度は募集期間が延長され、予算に達し次第終了。",
    "eligibility": [
      "太田市内の中小企業者（製造業・建設業・運輸業など）",
      "個人事業主は対象外"
    ],
    "industries": [
      "manufacturing",
      "construction",
      "logistics"
    ],
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "太田市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度（募集延長、令和8年12月28日まで。予算に達し次第終了）",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.ota.gunma.jp/page/1051763.html"
  },
  {
    "id": "ota-gunma-city-jisha-seihin-hanro",
    "name": "自社製品販路開拓事業助成金",
    "provider": "太田市 産業ミライ推進課",
    "level": "municipality",
    "type": "助成金",
    "cat": "販路開拓・PR",
    "amount": "出展料の3分の2以内、上限30万円",
    "summary": "中小企業者が販路開拓のため見本市・展示会に出展する際の出展料の一部を助成する。令和8年度分は随時受付で、予算額に達し次第終了。",
    "eligibility": [
      "太田市内の中小企業者",
      "自社製品の販路開拓を目的とした見本市・展示会への出展"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "太田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は随時受付（予算額に達し次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ota.gunma.jp/site/monodukuri/2625.html"
  },
  {
    "id": "ota-gunma-city-shoten-reform",
    "name": "商店リフォーム支援事業補助金",
    "provider": "太田市 産業ミライ推進課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "対象工事費の2分の1以内、上限100万円",
    "summary": "市内商店の店舗改修工事費を補助する。令和8年度の申請期間は6月1日から9月30日。",
    "eligibility": [
      "太田市内で商店を営む事業者",
      "店舗のリフォーム工事を行うこと"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "太田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は6月1日〜9月30日（受付終了。来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ota.gunma.jp/page/2628.html"
  },
  {
    "id": "takasaki-city-kikai-setsubi",
    "name": "高崎市中小企業等機械設備導入支援助成金",
    "provider": "高崎市 商工振興課",
    "level": "municipality",
    "type": "助成金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "リースで導入した機械設備費の一部を助成する。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "高崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takasaki.gunma.jp/page/3420.html"
  },
  {
    "id": "takasaki-city-machinaka-renewal",
    "name": "高崎市まちなか商店リニューアル助成事業補助金",
    "provider": "高崎市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装・備品購入費の1/2、上限100万円",
    "summary": "まちなかの店舗の改装や備品購入費用を助成する。",
    "eligibility": [
      "店舗を借りて営業する者",
      "営業開始前で賃貸契約を結んだ者"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "高崎市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度の交付申請は受付終了。来年度は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takasaki.gunma.jp/site/notice/3250.html"
  },
  {
    "id": "takasaki-city-sogyosha-yushi-hosho",
    "name": "高崎市創業者融資保証料補助金及び利子補給金",
    "provider": "高崎市 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "保証料の全額補助、融資日から5年間の利子全額補給",
    "summary": "創業時の借入に対する信用保証料と利子を市が補助する。創業支援資金（限度額5,000万円）などが対象。",
    "eligibility": [
      "市内で創業する法人・個人",
      "過去に事業歴がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "高崎市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "交付申請は年2回（7月・1月）。融資から1か月以内に申請",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takasaki.gunma.jp/page/4941.html"
  },
  {
    "id": "takasaki-city-tenjikai-shien",
    "name": "高崎市技術振興展示会等支援事業",
    "provider": "高崎市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2以内、国内展示会は上限20万円",
    "summary": "展示会出展費用の一部を助成する。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "高崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "前期（4〜9月）・後期（10〜3月）。令和8年度前期は終了、後期は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takasaki.gunma.jp/page/3279.html"
  },
  {
    "id": "saitama-dx-donyu-hojo",
    "name": "埼玉県中小企業DX導入支援補助金（追加募集）",
    "provider": "埼玉県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認",
    "summary": "DXツールの導入による労働生産性向上に取り組む県内中小企業を支援する。",
    "eligibility": [
      "埼玉県内の中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "追加募集 令和8年10月1日〜10月30日16時",
    "deadline": "2026-10-30",
    "priority": 6,
    "url": "https://dxdounyushienhozyo.pref.saitama.lg.jp/"
  },
  {
    "id": "saitama-jinzai-katsuyo-hojo",
    "name": "埼玉県人材活用促進事業補助金",
    "provider": "埼玉県／公益財団法人埼玉県産業振興公社",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "令和8年度の人材活用促進に関する補助事業。",
    "eligibility": [
      "埼玉県内の中小企業等（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "募集中表示（期間は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://saitama-j.or.jp/pages/376?b_id=2497&detail=1&r_id=680"
  },
  {
    "id": "saitama-kigyoka-ikusei-shikin",
    "name": "埼玉県制度融資 起業家育成資金",
    "provider": "埼玉県 経営・金融支援課",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額3,500万円（無担保）",
    "summary": "創業前または創業後5年未満の方が利用できる固定金利の県制度融資。",
    "eligibility": [
      "創業前、または創業後5年未満の方"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年",
    "deadline": null,
    "priority": 6,
    "url": "https://www.cgc-saitama.or.jp/system/system02.html"
  },
  {
    "id": "saitama-shokibo-jigyo-shikin",
    "name": "埼玉県制度融資 小規模事業資金",
    "provider": "埼玉県 経営・金融支援課",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "上限2,000万円（原則無担保・第三者保証人なし）",
    "summary": "従業員20人以下（商業・サービス業は原則5人以下）の小規模企業者向け県制度融資。経営革新企業特例あり。",
    "eligibility": [
      "小規模企業者"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.saitama.lg.jp/a0805/seidoyushi/07j-gaiyou.html"
  },
  {
    "id": "saitama-shoryokuka-hojo",
    "name": "埼玉県中小企業省力化支援事業補助金【新規導入】",
    "provider": "埼玉県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "機器導入による省力化に取り組む県内中小企業の設備投資費用の一部を補助する。",
    "eligibility": [
      "埼玉県内の中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度分は受付終了。次回は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.saitama.lg.jp/a0805/shoryokuka/sinnkidounyu_20260525.html"
  },
  {
    "id": "ageo-city-chusho-shikin-riko",
    "name": "上尾市中小企業資金融資等利子補給補助金",
    "provider": "上尾市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "年間支払利子の20%（融資を受けた月から3年間）",
    "summary": "市の中小企業資金融資（特別小口・小口・近代化・不況対策）で支払った利子の一部を補助する。",
    "eligibility": [
      "市内で事業を営む中小企業",
      "対象となる市の融資の利用者"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "上尾市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "毎年申請（対象年の翌年2月末日まで。最新年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ageo.lg.jp/page/041116042501.html"
  },
  {
    "id": "ageo-city-hanro-kaitaku",
    "name": "上尾市販路開拓支援補助金",
    "provider": "上尾市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "対象経費の1/2（上限25万円）、事業費総額10万円以上",
    "summary": "新たな販売先確保に向けた展示会出展・販促ツール作成・専門家指導等の経費を補助する。",
    "eligibility": [
      "市内の中小企業等",
      "上尾中小企業サポートセンターの専門家支援を受けて策定した事業計画があること"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "上尾市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年6月1日～令和9年1月29日",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.ageo.lg.jp/page/420800.html"
  },
  {
    "id": "ageo-city-shokibo-setsubi-ouen",
    "name": "上尾市小規模事業者等設備導入応援補助金",
    "provider": "上尾市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "対象経費の2/3以内（上限1,000万円、対象経費400万円超の事業）",
    "summary": "小規模事業者の省人化・省力化・業務効率化に役立つ設備取得費を補助する。",
    "eligibility": [
      "市内の小規模事業者等",
      "国・県の補助金とは併用不可"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "上尾市"
    ],
    "stages": [
      "established"
    ],
    "period": "受付終了（2026年5月1日更新で表示。再募集は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ageo.lg.jp/page/412445.html"
  },
  {
    "id": "ageo-city-sogyo-ouen",
    "name": "上尾市創業応援補助金",
    "provider": "上尾市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2（上限20万円）",
    "summary": "市内で創業する人や第二創業・事業承継を行う人の内装工事・備品購入・広告宣伝・ホームページ制作費等を補助する。",
    "eligibility": [
      "令和8年4月1日～令和9年3月31日に市内で創業（第二創業・事業承継を含む）",
      "特定創業支援等事業の証明書を持つこと",
      "上尾商工会議所の会員（事業完了までに加入予定を含む）"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "上尾市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年6月1日～令和9年1月29日（予算額に達し次第終了）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.ageo.lg.jp/page/337035.html"
  },
  {
    "id": "ageo-city-sogyo-shikin-riko",
    "name": "上尾市創業資金融資利子補給補助金",
    "provider": "上尾市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "年間支払利子の20%（融資を受けた月から36か月間）",
    "summary": "市内で創業する人が県制度融資や日本政策金融公庫の創業融資で支払った利子の一部を補助する。",
    "eligibility": [
      "市内で創業する人",
      "埼玉県制度融資または日本政策金融公庫の創業向け融資の利用者"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "上尾市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "毎年申請（対象年の翌年2月末日まで。最新年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ageo.lg.jp/page/041116042502.html"
  },
  {
    "id": "asaka-city-chusho-yushi-riko-hokyu",
    "name": "朝霞市中小企業者向け融資制度（利子補給）",
    "provider": "朝霞市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "利子補給は支払利子額の7分の4程度（最新は要確認）",
    "summary": "市・金融機関・埼玉県信用保証協会が連携する事業資金融資。遅滞なく返済している事業者に利子補給がある。",
    "eligibility": [
      "市内で事業を営む中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "朝霞市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.asaka.lg.jp/soshiki/13/finance.html"
  },
  {
    "id": "asaka-city-kigyoka-ikusei-yushi",
    "name": "朝霞市起業家育成資金融資制度",
    "provider": "朝霞市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "貸付限度額1,000万円、貸付利率年1.5％、保証料率0.80％、利子補給あり（ページ上は支払利子額の100％）",
    "summary": "市内で新たに事業を始める人向けの無担保・代表者保証のみの融資。利子補給の申請は例年2月末まで。",
    "eligibility": [
      "市内で新たに事業を始める人、または開業後間もない人"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "朝霞市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（利子補給の申請締切は例年2月末）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.asaka.lg.jp/soshiki/13/asaka-new-startup-loan-program.html"
  },
  {
    "id": "asaka-city-tenpo-reform-hojo",
    "name": "朝霞市店舗等リフォーム資金補助金",
    "provider": "朝霞市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "空き店舗等で起業・出店は工事費の30％（上限30万円）、既存店舗は10％（上限10万円）",
    "summary": "市内の空き店舗での起業・出店や既存店舗のリフォーム工事費を補助する。市内施工業者による工事が条件。",
    "eligibility": [
      "市内の空き店舗等で起業・出店する人、または市内で営業中の事業者",
      "対象工事費が税込10万円以上",
      "市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "朝霞市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "着工予定日の1か月前〜1週間前までに申請（令和8年度の受付状況は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.asaka.lg.jp/soshiki/13/shop-renovation.html"
  },
  {
    "id": "iruma-city-akiten-sogyo-hojo",
    "name": "入間市空き店舗活用創業等支援補助金",
    "provider": "入間市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改修費は1/2または25万円の低い額（対象4商店街は上限50万円）、家賃は月額1/2または4万5千円の低い額（営業開始12か月以内）",
    "summary": "空き店舗で創業・出店する際の店舗改修費と家賃を補助する。市外在住者も利用可。",
    "eligibility": [
      "市内の空き店舗を活用して創業・出店すること",
      "商業の活性化に資する事業であること"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "入間市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度の受付は終了（来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iruma.saitama.jp/soshiki/shokokankoka/shokogyo/1150.html"
  },
  {
    "id": "iruma-city-chusho-seido-yushi",
    "name": "入間市中小企業制度融資",
    "provider": "入間市 商工観光課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認（創業支援資金融資を含む。令和8年度から信用保証料補助は廃止）",
    "summary": "市の中小企業向け制度融資。令和8年度から保証料補助事業が廃止され貸出利率も変更されている。",
    "eligibility": [
      "入間市内の中小企業者",
      "金融機関・信用保証協会の審査を経ること"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "入間市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度の受付は終了",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iruma.saitama.jp/soshiki/shokokankoka/shokogyo/1148.html"
  },
  {
    "id": "iruma-city-sogyo-shorei",
    "name": "入間市創業支援奨励金",
    "provider": "入間市 商工観光課",
    "level": "municipality",
    "type": "給付金",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "市内に住み市内で創業する人に奨励金を支給するとFAQに記載。令和8年度の実施状況は要確認。",
    "eligibility": [
      "市内在住で市内で創業する人",
      "詳細要件は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "入間市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iruma.saitama.jp/soshiki/shokokankoka/shokogyo/1274.html"
  },
  {
    "id": "kasukabe-city-hojin-setsuritsu",
    "name": "春日部市法人設立応援補助金",
    "provider": "春日部市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "登録免許税相当：37,000円または対象経費の1/4（軽減措置適用時は軽減後の1/2）のいずれか低い額",
    "summary": "市の特定創業支援等事業を受けて初めて法人を設立する人の登録免許税を補助。設立後1年以内に申請。",
    "eligibility": [
      "市の特定創業支援等事業を受けた人",
      "初めて法人（株式会社等）を設立する人"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "春日部市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（法人設立後1年以内に申請）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kasukabe.lg.jp/jigyoshamuke/keieishien/kasukabeshisogyoshienjigyo/8399.html"
  },
  {
    "id": "kasukabe-city-kasukabe-venture",
    "name": "かすかベンチャー応援補助金",
    "provider": "春日部市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助限度額100万円（ビジネスプランコンテスト受賞者の出店は150万円）。補助率は要確認",
    "summary": "指定区域（春日部駅・武里駅・南桜井駅周辺）の空き店舗で創業する人、創業5年未満の人の費用を補助。",
    "eligibility": [
      "指定区域内の空き店舗で創業する人、または創業5年未満の人",
      "交付決定年度内に開業・設立を完了すること"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "春日部市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜10月20日",
    "deadline": "2026-10-20",
    "priority": 8,
    "url": "https://www.city.kasukabe.lg.jp/jigyoshamuke/keieishien/kasukabeshisogyoshienjigyo/15152.html"
  },
  {
    "id": "kasukabe-city-kigyo-taiyoko-chikuden",
    "name": "春日部市企業等における太陽光発電設備・蓄電池設置補助金",
    "provider": "春日部市 環境政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "太陽光発電5万円/kW、蓄電池5万円/kWh（上限は要確認）",
    "summary": "企業等の太陽光発電設備・蓄電池の設置を補助。交付決定後に契約・着工が要件。第5回受付は9月24日〜10月9日予定で終了の可能性。",
    "eligibility": [
      "市内の事業所等に設備を設置する企業等",
      "交付決定後に契約・工事着工すること"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "春日部市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度（第5回受付：9月24日〜10月9日予定。以降は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kasukabe.lg.jp/soshikikarasagasu/kankyoseisakuka/gyomuannai/2/2/28003.html"
  },
  {
    "id": "kasukabe-city-seidoyushi",
    "name": "春日部市中小企業制度融資（小口資金融資あっ旋・保証料補助）",
    "provider": "春日部市 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "特別小口は保証料相当額を市が補助、一般小口は利息の20%相当額を利子補助（利率等は要確認）",
    "summary": "市内中小企業向けの事業資金融資あっ旋。約定どおり返済した場合に保証料補助・利子補助がある。",
    "eligibility": [
      "市内の中小企業者",
      "約定どおり返済すること"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "春日部市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kasukabe.lg.jp/jigyoshamuke/keieishien/8391.html"
  },
  {
    "id": "kawagoe-city-bukka-keiei-kaizen",
    "name": "川越市中小企業者等物価高騰対策経営改善支援金",
    "provider": "川越市 産業振興課",
    "level": "municipality",
    "type": "給付金",
    "cat": "設備投資・省エネ",
    "amount": "新規認定10万円、変更認定5万円",
    "summary": "経営革新計画または先端設備等導入計画の承認を受けた市内中小企業への支援金。",
    "eligibility": [
      "計画の承認・認定を受けた市内中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川越市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "申請期間は令和8年3月16日で終了。受付終了",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kawagoe.saitama.jp/sangyo/sangyo/1012082/1014755/1018018.html"
  },
  {
    "id": "kawagoe-city-jigyoshokei-tenpo",
    "name": "川越市事業承継店舗改修等補助金",
    "provider": "川越市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "補助率1/3、上限40万円（市外業者施工は30万円）",
    "summary": "事業承継に伴う店舗改修や設備整備費用の一部を補助する。",
    "eligibility": [
      "事業承継を行う市内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川越市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kawagoe.saitama.jp/sangyo/sangyo/1012133/1012148.html"
  },
  {
    "id": "kawagoe-city-shinki-sogyo-yushi",
    "name": "川越市新規創業者支援資金融資",
    "provider": "川越市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額3,500万円、期間10年以内、利率は利子補給後年1.3%以内、保証料補助40%（上限10万円）",
    "summary": "創業予定者・開業後5年以内の事業者向けの制度融資。信用保証料の補助あり。",
    "eligibility": [
      "創業予定者",
      "開業後5年以内の事業者"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川越市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kawagoe.saitama.jp/sangyo/shushoku/chushokigyo/1012044/1012048/1012050.html"
  },
  {
    "id": "kawaguchi-city-akitenpo-katsuyo",
    "name": "川口市空き店舗活用事業補助金",
    "provider": "川口市 商業観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/2以内、上限200万円",
    "summary": "商店街区域の空き店舗を改修して新たに事業を始める際の改修工事費を補助する。予算上限まで。",
    "eligibility": [
      "商店街区域の空き店舗で開業する事業者",
      "商店街・商工会議所に加入"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川口市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kawaguchi.lg.jp/soshiki/01110/030/2/2075.html"
  },
  {
    "id": "kawaguchi-city-dx-suishin",
    "name": "川口市DX推進補助金",
    "provider": "川口市 経営支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認（国補助金への上乗せ、採択予定25件程度）",
    "summary": "国の補助金を受けてDX・デジタル化に取り組む事業者に市が上乗せ補助する。",
    "eligibility": [
      "国の補助金の交付を受けた市内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川口市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年5月1日から申請受付開始。最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kawaguchi.lg.jp/soshiki/01110/021/12/38430.html"
  },
  {
    "id": "kawaguchi-city-sogyo-shikin",
    "name": "川口市中小企業創業支援資金融資",
    "provider": "川口市 経営支援課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額3,500万円（自己資金の10倍まで）、固定金利年1.0%",
    "summary": "許認可を受けて事業を始める方、開始後5年以内の方向けの制度融資。",
    "eligibility": [
      "創業予定者",
      "事業開始後5年以内の事業者"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川口市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kawaguchi.lg.jp/soshiki/01110/021/11/11_2/11_2_1/7628.html"
  },
  {
    "id": "kawaguchi-city-tenjikai-shuppin",
    "name": "川口市展示会等出展事業補助金",
    "provider": "川口市 工業施策担当",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "展示会等に出展する市内事業者の出展費用を補助する。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川口市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度の実績報告案内あり。募集状況は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kawaguchi.lg.jp/soshiki/01110/030/kougyousisaku/50873.html"
  },
  {
    "id": "kawaguchi-city-tenpo-kaishu",
    "name": "川口市商店改修事業補助金",
    "provider": "川口市 商業観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率30%以内、上限50万円/店舗",
    "summary": "集客力や買い物環境を高める店舗改修工事費を補助する。",
    "eligibility": [
      "市内の店舗事業者"
    ],
    "industries": [
      "retail"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川口市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kawaguchi.lg.jp/soshiki/01110/030/2/2055.html"
  },
  {
    "id": "koshigaya-city-bukka-setsubi",
    "name": "物価高騰対策中小企業設備導入等支援補助金",
    "provider": "越谷市 経済振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "市内事業者調達・施工は2/3以内、市外事業者は1/2以内、上限200万円",
    "summary": "物価高騰対策として中小企業の設備導入等の経費を補助する。予算超過の場合は抽選。",
    "eligibility": [
      "市内の中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "越谷市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度は2026年4月13日〜24日（受付終了。次回は要確認）",
    "deadline": "2026-04-24",
    "priority": 8,
    "url": "https://www.city.koshigaya.saitama.jp/kurashi_shisei/jigyosha/shienyushi/hojokin/koshigaya_contents_buxtukakoutou.html"
  },
  {
    "id": "koshigaya-city-business-powerup",
    "name": "越谷市ビジネスパワーアップ補助金",
    "provider": "越谷市 経済振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "令和7年度は補助率2分の1以内・上限100万円（令和8年度は要確認）",
    "summary": "新商品・新サービス開発、販路開拓、人材育成、多様な働き方推進、DX推進、事業承継推進の取組を補助する。",
    "eligibility": [
      "市内に事業所を有し、1年以上事業を営んでいる中小企業者",
      "交付決定後に着手し2027年2月28日までに完了する事業"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "越谷市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度の申請期間は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.koshigaya.saitama.jp/kurashi_shisei/jigyosha/shienyushi/hojokin/koshigaya_contents_bp.html"
  },
  {
    "id": "koshigaya-city-chusho-yushi-risi",
    "name": "越谷市中小企業資金融資（利子助成）",
    "provider": "越谷市 経済振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "金融機関に支払った普通利子の一部を助成（助成率は小口・中口資金40％、起業家育成資金35％、年度ごとに見直し）",
    "summary": "市の制度融資で、支払利子の一部を助成する。起業家育成資金は商工会議所会員などで保証料率が0.1％割引。",
    "eligibility": [
      "市内で事業を営む中小企業者",
      "借入前に事前相談が必要"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "越谷市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.koshigaya.saitama.jp/kurashi_shisei/jigyosha/shienyushi/yuushiseido/yuusi.html"
  },
  {
    "id": "koshigaya-city-sogyosha-shien",
    "name": "越谷市創業者支援補助金",
    "provider": "越谷市 経済振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率2分の1以内、上限100万円",
    "summary": "市内で創業・第二創業する中小企業者の初期費用（機械器具、外注、広告宣伝、商品開発、家賃等）を補助する。",
    "eligibility": [
      "創業から1年を経過していない、または年度内に開始予定の中小企業者",
      "市内で新たに事業所の開設を伴う事業",
      "交付決定前の発注・契約は原則対象外"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "越谷市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は2026年6月29日〜7月10日（受付終了。来年度は要確認）",
    "deadline": "2026-07-10",
    "priority": 8,
    "url": "https://www.city.koshigaya.saitama.jp/kurashi_shisei/jigyosha/shienyushi/hojokin/sogyouhojokinn.html"
  },
  {
    "id": "kumagaya-city-chushokigyo-yushi",
    "name": "熊谷市中小企業融資制度（利子補給・保証料補助）",
    "provider": "熊谷市 企業活動支援課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "一般事業資金：上限3,000万円・償還10年以内（貸付日から5年間、支払利子の25%以内を補助）。小口事業資金：上限1,250万円（完済時に信用保証料を全額補助）",
    "summary": "市内中小企業向けの制度融資。完済後に利子補給や信用保証料補助がある。",
    "eligibility": [
      "市内に1年以上事業所のある中小企業者",
      "市税を完納していること"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "熊谷市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "一般事業資金の補助は令和7年4月1日〜令和12年3月31日の申込分",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kumagaya.lg.jp/about/soshiki/sangyo/kigyokatsudo/yuushi/chushoseidoyuushi.html"
  },
  {
    "id": "kumagaya-city-haremachi-kaihatsu",
    "name": "熊谷ブランド「晴れまち」認定品開発促進補助金",
    "provider": "熊谷市 商業観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "対象経費の1/2以内（上限30万円。共同開発等で基準額に20万円加算）",
    "summary": "新製品の開発や既存商品の改良を補助。令和8年度のお知らせが掲載（2026年7月24日更新）。",
    "eligibility": [
      "市内の事業者（詳細は要確認）"
    ],
    "industries": [
      "food",
      "retail",
      "manufacturing"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "熊谷市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kumagaya.lg.jp/about/soshiki/sangyo/shogyokanko/s-oshirase/haremachikaihatsu.html"
  },
  {
    "id": "kumagaya-city-okugai-genba-keigen",
    "name": "熊谷市屋外現場作業負荷軽減支援事業補助金",
    "provider": "熊谷市 企業活動支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "建設業者の暑さ対策ウエア・冷却ベスト等の購入費を補助。令和8年度は購入期間が4月1日〜9月30日で終了の可能性。",
    "eligibility": [
      "市内に事業所を持つ建設業者"
    ],
    "industries": [
      "construction"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "熊谷市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度の購入期間：4月1日〜9月30日（終了の可能性。最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kumagaya.lg.jp/about/soshiki/sangyo/kigyokatsudo/hojyokin/okugaihutankeigen.html"
  },
  {
    "id": "kumagaya-city-sogyosha-ouen",
    "name": "熊谷市創業者応援補助金",
    "provider": "熊谷市 企業活動支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助対象経費の1/2（上限20万円）",
    "summary": "市内で新たに創業した人の店舗の内外装工事、広告宣伝費などを補助。創業日の翌日から1年以内に申請。",
    "eligibility": [
      "熊谷市内で創業した人",
      "創業日の翌日から1年以内の申請"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "熊谷市"
    ],
    "stages": [
      "early"
    ],
    "period": "最新は要確認（令和8年度の募集か未確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kumagaya.lg.jp/about/jigyousya/sogyosyashien.html"
  },
  {
    "id": "kumagaya-city-startup-shien",
    "name": "熊谷発スタートアップ支援補助金",
    "provider": "熊谷市 企業活動支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率1/2（40歳未満・創業5年未満は2/3）、1年度上限500万円・3年度で最大1,000万円（令和7年度募集概要の記載）",
    "summary": "デジタル先端技術などを活用した起業や新事業の立上げを支援。令和8年度の交付要領は5月1日決裁。",
    "eligibility": [
      "熊谷スマートシティの趣旨に賛同する市内中小企業者",
      "市の補助対象事業の認定が必要"
    ],
    "industries": [
      "it",
      "creative"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "熊谷市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kumagaya.lg.jp/about/soshiki/sangyo/kigyokatsudo/hojyokin/startup-kumagaya.html"
  },
  {
    "id": "niiza-city-it-dx-hojo",
    "name": "新座市中小企業者IT・DX導入費補助金",
    "provider": "新座市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "対象経費の1/2（上限7万円。ページにより10万円の記載もあり要確認）",
    "summary": "中小企業者のIT・DX導入に係る経費の一部を助成する。予算上限に達すると受付終了。",
    "eligibility": [
      "新座市内の中小企業者",
      "IT・DX導入に係る経費があること"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "新座市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "交付申請は令和9年2月26日まで（予算上限に達し次第終了）",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.niiza.lg.jp/site/business-support/itdx.html"
  },
  {
    "id": "niiza-city-jigyoshokei-ma",
    "name": "新座市事業承継・M&A支援事業補助金",
    "provider": "新座市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "対象経費の1/2（上限20万円。一覧ページの記載）",
    "summary": "事業承継やM&Aに取り組む市内事業者の経費の一部を補助する。詳細は個別ページで要確認。",
    "eligibility": [
      "新座市内の事業者",
      "事業承継・M&Aに取り組むこと（詳細要件は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "新座市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.niiza.lg.jp/site/business-support/syokei.html"
  },
  {
    "id": "niiza-city-keiei-kakushin-hojo",
    "name": "新座市経営革新計画支援事業補助金",
    "provider": "新座市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "要確認",
    "summary": "経営革新計画に取り組む市内中小企業を支援する補助金。",
    "eligibility": [
      "新座市内の中小企業者",
      "経営革新計画の承認を受けること（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "新座市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.niiza.lg.jp/site/business-support/keieikakusin.html"
  },
  {
    "id": "niiza-city-sogyo-shien-hojo",
    "name": "新座市創業支援補助金",
    "provider": "新座市 産業振興課（にいざビジネスサポート）",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2（個人事業主 上限5万円、法人・設立予定者 上限8万円）",
    "summary": "特定創業支援の証明書を受け創業計画書を策定した創業者の、備品購入費・内装費・販促費・広報費・外注費・法人設立費用などを補助する。",
    "eligibility": [
      "創業日が令和7年4月1日以後で創業から1年以内、または年度内に創業予定",
      "特定創業支援の証明書（商工会の継続相談）を受けていること",
      "にいざビジネスサポートの経営相談を複数回利用し創業計画書を策定していること"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "新座市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "予算上限に達し次第終了（期限は令和9年3月31日）",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.niiza.lg.jp/site/business-support/sougyoushienhozyo.html"
  },
  {
    "id": "niiza-city-sogyo-yushi-risihokyu",
    "name": "新座市新規創業融資利子補給金",
    "provider": "新座市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "創業時の融資に対する利子の一部を市が補給する制度。補給率などは要確認。",
    "eligibility": [
      "新座市内で新規創業する事業者",
      "対象となる創業融資を利用していること（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "新座市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.niiza.lg.jp/site/business-support/sinkisougyouyuusirisihokyu.html"
  },
  {
    "id": "soka-city-chiiki-keizai-setsubi",
    "name": "草加地域経済活性化事業補助金（市内事業所等設備投資支援事業）",
    "provider": "草加地域経済活性化事業実行委員会（事務局：草加商工会議所）",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "対象経費の20%（上限100万円）",
    "summary": "市内に設置する設備の新設・更新費用の一部を補助する。",
    "eligibility": [
      "市内の中小企業等",
      "市内事業所に設置する設備の新設・更新"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "草加市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（補助事業ごとに申請期間が異なる）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.soka.saitama.jp/cont/s1403/020/010/030/PAGE000000000000080375.html"
  },
  {
    "id": "soka-city-keiei-kakushin-sogyo",
    "name": "経営革新チャレンジ支援事業補助金（創業関連枠）",
    "provider": "草加市 自治文化部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "創業関連枠：1事業者5万円（事業継続力強化計画の認定ありで10万円）。経営革新計画の取組は1事業者20万円",
    "summary": "草加商工会議所の助言を受けて創業計画を策定・見直した創業者や、経営革新計画に取り組む市内中小企業を支援する。",
    "eligibility": [
      "令和8年4月1日以降に創業し草加商工会議所の助言を受けた事業者（創業関連枠）",
      "経営革新計画に取り組む市内中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "草加市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度（創業日の期限は2027年3月、日付は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.soka.saitama.jp/cont/s1403/020/010/030/PAGE000000000000067646.html"
  },
  {
    "id": "soka-city-sangyo-seicho-yushi-hojo",
    "name": "草加市産業新成長戦略支援融資制度補助金",
    "provider": "草加市 自治文化部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "支払った約定利子の1/2以内（最長60か月）",
    "summary": "市内で新たに創業する人が創業時に借りた融資の利子の一部を補助する。",
    "eligibility": [
      "市内で新たに創業する人",
      "市長の推薦書が必要（創業塾・ワンストップ相談窓口等の受講者が対象）"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "草加市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（詳細は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.soka.saitama.jp/cont/s1403/020/030/010/040/PAGE000000000000058942.html"
  },
  {
    "id": "soka-city-seido-yushi-riko",
    "name": "草加市 制度融資（商工業経営合理化資金融資）と利子補給",
    "provider": "草加市 自治文化部 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額5,000万円、保証料0.50～1.76%、年間支払利子の20%を市が補助",
    "summary": "市の制度融資を利用する中小企業者に、年間の支払利子の20%を市が補助する。",
    "eligibility": [
      "市内の中小企業者",
      "制度融資の利用者"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "草加市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（詳細は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.soka.saitama.jp/cont/s1403/020/010/030/05.html"
  },
  {
    "id": "toda-city-chusho-kigyo-yushi",
    "name": "戸田市中小企業融資制度（利子補給）",
    "provider": "戸田市 経済戦略室",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "利子補給率は小口資金（運転）で支払利子の21％、商工業近代化資金は32〜35％など（現行かは要確認）",
    "summary": "小口資金・商工業近代化資金・特定中小企業者資金の市のあっせん融資。貸付から1年経過後の1年間に利子補給を申請できる。",
    "eligibility": [
      "市内で事業を営む中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "戸田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（予算残りわずかの表示あり、最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toda.saitama.jp/soshiki/214/keizai-yuushi-seido.html"
  },
  {
    "id": "toda-city-dx-suishin",
    "name": "戸田市DX推進補助金",
    "provider": "戸田市 経済戦略室",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "対象経費（税抜）の1/2、上限50万円",
    "summary": "自社の課題解決のためDXに取り組む事業のシステム使用料等（導入から12か月分）を補助する。予算は500万円で、9月9日時点の残額は約230万円、なくなり次第終了。",
    "eligibility": [
      "市内に本店（個人は主たる事業所）を有する中小企業者・小規模事業者",
      "市内で1年以上継続して事業を営んでいること",
      "市税等の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "戸田市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年4月1日〜予算がなくなり次第終了",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toda.saitama.jp/soshiki/214/keizai-dxhojyo.html"
  },
  {
    "id": "toda-city-shingijutsu-kenkyu-kaihatsu",
    "name": "戸田市新技術研究開発支援事業（商工業支援事業補助金）",
    "provider": "戸田市 経済戦略室",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "経費（税抜）の1/3、上限200万円",
    "summary": "新技術の研究開発に要した費用を支援する。同補助金には展示会出展支援（上限20万円）やISO等取得支援（1/3、上限50万円）もある。",
    "eligibility": [
      "製造業・情報通信業・事業所向けサービス業・建設業・運輸業の中小企業者",
      "申請年度中に技術確立や市場化を行うこと"
    ],
    "industries": [
      "manufacturing",
      "it",
      "construction",
      "logistics"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "戸田市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toda.saitama.jp/soshiki/214/keizai-shoukougyoushien-hojyo.html"
  },
  {
    "id": "toda-city-shoten-shingyoshu-tenkan",
    "name": "戸田市商店等新業種等転換支援事業",
    "provider": "戸田市 経済戦略室",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/2、上限50万円",
    "summary": "新業種・新業態への転換に伴い、エネルギー高度化、子育て支援、高齢者支援などの社会的課題に対応する改修工事費を補助する。",
    "eligibility": [
      "小売業・飲食業・サービス業を営む（営もうとする）人",
      "個人は市内在住",
      "市税等の未納がないこと"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "戸田市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜予算の範囲内で申請順（実績報告は令和9年3月末まで）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toda.saitama.jp/soshiki/214/keizai-hojyo-shouten.html"
  },
  {
    "id": "tokorozawa-city-akitenpo-shuten",
    "name": "所沢市空き店舗活用・新規創業支援出店補助金",
    "provider": "所沢市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率3分の1、上限120万円",
    "summary": "市内商店街の空き店舗で新規開業する事業の開業費用を補助する。予算がなくなり次第終了。",
    "eligibility": [
      "商店街の空き店舗で新規開業する事業者",
      "空き店舗が所在する商店街の活動に参加すること"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "所沢市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度の募集は最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tokorozawa.saitama.jp/kurashi/shigotojyoho/syogyo/akitennpo.html"
  },
  {
    "id": "tokorozawa-city-chiiki-monodukuri",
    "name": "所沢市地域資源活用・ものづくり総合支援補助金",
    "provider": "所沢市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "設備改修等は上限100万円、展示商談会出展は上限10万円など（詳細は要確認）",
    "summary": "地域資源の活用やものづくり事業者の販路開拓・設備改修等を補助する。",
    "eligibility": [
      "市内に本店登記のある法人または住民登録のある個人で、事業を1年以上営んでいる者",
      "連携事業でない場合は製造業または農業を営む者"
    ],
    "industries": [
      "manufacturing",
      "agriculture",
      "food"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "所沢市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度3次募集は2026年10月1日〜2027年2月26日",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.tokorozawa.saitama.jp/kurashi/shigotojyoho/sangyo/kogyo/chiikishigen-monodukuri.html"
  },
  {
    "id": "tokorozawa-city-setsubi-risihokyu",
    "name": "所沢市中小企業設備投資融資利子補給事業",
    "provider": "所沢市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "設備投資・省エネ",
    "amount": "支払利子の30％を5年間補助（環境配慮設備は40％）",
    "summary": "埼玉県や日本政策金融公庫の設備資金融資に対する支払利子を補助する。",
    "eligibility": [
      "市内の中小企業者で、対象の設備資金融資を受けた者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "所沢市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tokorozawa.saitama.jp/kurashi/shigotojyoho/sangyo/keieisien/yushi/setsubitoushirishihokyu.html"
  },
  {
    "id": "tokorozawa-city-shinki-sogyo-yushi",
    "name": "所沢市新規創業支援資金融資制度",
    "provider": "所沢市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "限度額1,000万円、利率1.0％（市が利子補給）、保証料0.8％以内",
    "summary": "創業前後の事業者向け制度融資。特定創業支援等事業を受けた方や商工会議所会員は保証料が0.1％割引。",
    "eligibility": [
      "開業前から開業後3年までの方（案内により5年未満の記載もあり要確認）",
      "取扱金融機関への事前相談と信用保証協会の審査"
    ],
    "industries": "all",
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "所沢市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tokorozawa.saitama.jp/kurashi/shigotojyoho/sangyo/keieisien/yushi/syoko_20100329114042776.html"
  },
  {
    "id": "tokorozawa-city-toshigata-chinshaku",
    "name": "所沢市都市型産業等育成補助金（事務所等賃借料補助）",
    "provider": "所沢市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "賃借料を月額上限10万円、最長24か月補助",
    "summary": "製造業や情報通信業などで事務所等を新たに借りる事業者に賃料等を補助する。",
    "eligibility": [
      "製造業・情報通信業等で市内に事務所等を新たに賃借する事業者"
    ],
    "industries": [
      "manufacturing",
      "it"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "所沢市"
    ],
    "stages": [
      "early"
    ],
    "period": "令和8年度の募集は終了（来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tokorozawa.saitama.jp/kurashi/shigotojyoho/sangyo/kogyo/toshigatasangyo.html"
  },
  {
    "id": "chiba-chusho-shinko-shikin",
    "name": "千葉県 中小企業振興資金",
    "provider": "千葉県 産業振興課",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "千葉県の中小企業向け制度融資。創業等のメニューは公式ページで要確認。",
    "eligibility": [
      "千葉県内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.chiba.lg.jp/keishi/sougyou/shikin2.html"
  },
  {
    "id": "chiba-reskilling-banso",
    "name": "中小企業向け伴走型リスキリング支援",
    "provider": "千葉県 産業人材課",
    "level": "prefecture",
    "type": "専門家支援",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "令和8年度の参加企業を募集する、中小企業向けの伴走型リスキリング支援。",
    "eligibility": [
      "千葉県内の中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.chiba.lg.jp/sanjin/press/2026/reskilling-2026.html"
  },
  {
    "id": "chiba-seicho-sokushin-hojo",
    "name": "中小企業成長促進補助金（第4弾）",
    "provider": "千葉県 経済政策課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "中小企業者枠 上限3,000万円（補助率は要確認）",
    "summary": "積極的な賃上げや設備投資に取り組む意欲ある中小企業を支援する。",
    "eligibility": [
      "千葉県内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年8月21日で受付終了。次回は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.chiba.lg.jp/keisei/zaisei/chiba-seichohojyo4.html"
  },
  {
    "id": "chiba-shijo-kaitaku-josei",
    "name": "市場開拓助成（展示会出展）",
    "provider": "千葉県 産業振興課／千葉県産業振興センター",
    "level": "prefecture",
    "type": "助成金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2以内（小規模事業者2/3以内）、上限100万円",
    "summary": "販路開拓のための国内外の展示会出展経費を助成する。",
    "eligibility": [
      "千葉県内の中小企業者・小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "年2回（4/2〜4/28、10/1〜10/30）",
    "deadline": "2026-10-30",
    "priority": 6,
    "url": "https://www.pref.chiba.lg.jp/sanshin/hanro/chuusyou/hanrokaitaku.html"
  },
  {
    "id": "funabashi-city-akitenpo-taisaku",
    "name": "空き店舗対策事業補助金",
    "provider": "船橋市 経済部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "施設整備費は補助率1/2・上限100万円。賃借料は1年目1/2(月3.6万円)、2年目1/3(月2.4万円)、3年目1/4(月1.8万円)",
    "summary": "市内の空き店舗に出店する事業者の改装費・賃借料の一部を補助する。事前相談が必要で予算に限りがある。",
    "eligibility": [
      "市街化区域内で6か月以上空き店舗の物件に出店する個人客向け事業者",
      "事前相談が必要"
    ],
    "industries": [
      "food",
      "retail",
      "beauty"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "船橋市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認(予算の範囲内)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.funabashi.lg.jp/jigyou/shoukou/002/p048619.html"
  },
  {
    "id": "funabashi-city-chingin-ouen",
    "name": "国の補助金等を活用した賃上げ取組み支援",
    "provider": "船橋市 経済部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助対象経費の3/4・上限15万円",
    "summary": "賃上げ要件のある国の補助金・助成金に申請した市内中小企業者等を市が上乗せで支援する。",
    "eligibility": [
      "令和8年4月1日以降に賃上げを要件とする国の補助金・助成金へ申請している市内中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "船橋市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.funabashi.lg.jp/jigyou/shoukou/002/p145307.html"
  },
  {
    "id": "funabashi-city-chusho-yushi",
    "name": "船橋市中小企業融資制度(創業支援資金ほか)",
    "provider": "船橋市 経済部 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業支援資金は融資限度額2,000万円以内(その他は要確認)",
    "summary": "市内中小企業者向けの制度融資。創業支援資金は創業者も利用でき、特定創業支援を受けた場合の保証料補給等の優遇がある。",
    "eligibility": [
      "市内で事業を営む(創業予定含む)中小企業者",
      "創業支援資金以外は市内で1年以上の事業継続が必要"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "船橋市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年(詳細は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.funabashi.lg.jp/jigyou/shoukou/003/p017711.html"
  },
  {
    "id": "funabashi-city-sogyo-shien",
    "name": "創業支援等事業計画認定による各種支援(ふなばし起業スクール)",
    "provider": "船橋市 経済部 商工振興課・船橋商工会議所",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "要確認(受講で登録免許税軽減・保証料補給等)",
    "summary": "船橋商工会議所の起業スクールで特定創業支援等事業を受け市の証明を得ると、登録免許税の軽減や信用保証料の補給などを受けられる。",
    "eligibility": [
      "創業予定者・創業後間もない事業者",
      "4テーマ受講・8割以上出席"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "船橋市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は上期(7/25,8/29)開催を確認、下期は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.funabashi.lg.jp/jigyou/shoukou/001/p032771.html"
  },
  {
    "id": "ichihara-city-chusho-shikin-riko",
    "name": "市原市 中小企業資金融資の利子補給",
    "provider": "市原市（産業振興担当課）／市原商工会議所",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "信用保証協会関連の事業資金は年3.0%以内、設備近代化資金・経営安定化資金は年4.0%以内の利子補給（規則上）",
    "summary": "市の中小企業資金融資を利用した人に、予算の範囲内で償還利子の一部を補給する。",
    "eligibility": [
      "市内に事業所等を持つ中小企業者",
      "市税を完納していること"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "市原市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（規則の条文のみ確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ichihara.chiba.jp/reiki_int/reiki_honbun/g020RG00000742.html"
  },
  {
    "id": "ichihara-city-koko-sogyo-riko",
    "name": "市原市 日本政策金融公庫の創業融資に対する利子補給",
    "provider": "市原市（産業振興担当課）／市原商工会議所",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "年0.5%または約定利率の1/2のいずれか低い率（最長5年、融資額2,000万円以下）",
    "summary": "日本政策金融公庫の新規開業資金等を利用した創業者に、償還利子の一部を補給する。",
    "eligibility": [
      "商工会議所のあっせんを受けていること",
      "固定金利・元金均等返済で融資期間10年以内",
      "融資を受けた翌日から10日以内に商工会議所経由で申請"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "市原市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認（規則の条文のみ確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ichihara.chiba.jp/reiki_int/reiki_honbun/g020RG00000742.html"
  },
  {
    "id": "ichikawa-city-shoene-soene",
    "name": "市川市省エネ・創エネ設備設置費等補助金（中小企業者等）",
    "provider": "市川市 カーボンニュートラル推進局",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "太陽光発電は1kWあたり5万円（上限50万円）。その他設備は要確認",
    "summary": "事業所への太陽光発電、蓄電システム、HEMS、断熱改修等の設置費用を補助する。市内事業者による施工が条件。",
    "eligibility": [
      "市内の中小企業者等",
      "令和8年4月1日〜令和9年3月31日に設置・工事が完了したもの",
      "過去に市の同補助金を受けていないこと"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "市川市"
    ],
    "stages": [
      "established"
    ],
    "period": "2026年5月7日〜2027年3月31日（予算に達し次第終了）",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.ichikawa.lg.jp/page/5020.html"
  },
  {
    "id": "ichikawa-city-tenjikai-shuppin",
    "name": "市川市中小企業展示会等出展支援事業補助金",
    "provider": "市川市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率2分の1以内、上限30万円",
    "summary": "国内で開催される展示会等への出展費用（会場使用料、設営・装飾費、電気・水道・通信費等）を補助する。",
    "eligibility": [
      "販路開拓や受注拡大を目指す市内の中小企業者",
      "国・他自治体・千葉県産業振興センター等から同目的の補助を受けていないこと"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "市川市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "2026年4月1日〜2027年2月26日（先着順。新規申請枠は2026年10月30日まで、継続申請枠は一時停止中）",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.ichikawa.lg.jp/page/4783.html"
  },
  {
    "id": "ichikawa-city-venture-hoshoryo",
    "name": "市川市ベンチャービジネス等支援資金 信用保証料補助",
    "provider": "市川市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "信用保証料の半額補助、上限12万8千円",
    "summary": "市の中小企業融資制度のベンチャービジネス等支援資金を利用する際の信用保証料を補助する。",
    "eligibility": [
      "ベンチャービジネス等支援資金の利用者",
      "令和8年4月1日以降に融資申請し、令和9年3月31日までに融資実行されること"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "市川市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日以降の融資申請分、融資実行は2027年3月31日まで",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.ichikawa.lg.jp/page/4784.html"
  },
  {
    "id": "kashiwa-city-chusho-shikin-yushi",
    "name": "柏市中小企業資金融資制度(利子補給)",
    "provider": "柏市 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "挑戦資金: 運転1,000万円・設備2,000万円まで、創業支援資金: 上限3,500万円。利子補給は5年以内",
    "summary": "千葉県信用保証協会と市内金融機関が連携する制度融資で、支払利息の一部を市が負担する。",
    "eligibility": [
      "市内中小企業者・創業者"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "柏市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年(最新は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kashiwa.lg.jp/sangyoseisaku/jigyosha/finance/shikinyushi.html"
  },
  {
    "id": "kashiwa-city-shinyohoshoryo-hojo",
    "name": "柏市中小企業融資制度における信用保証料補助",
    "provider": "柏市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "創業支援資金の信用保証料を全額補助",
    "summary": "市の中小企業融資制度(創業支援資金)を利用した際の信用保証料を市が補助する。",
    "eligibility": [
      "柏市中小企業資金融資制度の創業支援資金の融資を受けた者"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "柏市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年(最新は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kashiwa.lg.jp/sangyoseisaku/jigyosha/finance/shinyohoshoryo.html"
  },
  {
    "id": "kashiwa-city-sogyosha-ouen-hojokin",
    "name": "柏市創業者応援事業補助金",
    "provider": "柏市 産業政策課(柏商工会議所・柏市沼南商工会経由)",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内・上限50万円(経費の1/3以上は広報費)",
    "summary": "市内で初めて創業する人の広報費・店舗借入費・内装工事費・法人登記費用等を補助する。",
    "eligibility": [
      "令和8年4月1日以降に市内で創業し、市の創業支援セミナー等を修了した者",
      "市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "柏市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年8月17日〜10月30日(予算上限で終了)",
    "deadline": "2026-10-30",
    "priority": 8,
    "url": "https://www.city.kashiwa.lg.jp/shoko/sougyou/sougyou-hojokin.html"
  },
  {
    "id": "kashiwa-city-startup-jigyoka-ouen",
    "name": "柏市スタートアップ事業化応援補助金",
    "provider": "柏市 産業政策・スタートアップ推進課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "上限100万円",
    "summary": "スタートアップの事業化を応援する補助金。2026年6月20日時点で予算上限に達し受付終了。来年度は要確認。",
    "eligibility": [
      "市内でスタートアップの事業化に取り組む事業者"
    ],
    "industries": [
      "it",
      "creative",
      "professional"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "柏市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "受付終了(2026年6月20日)。次年度は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kashiwa.lg.jp/sangyoseisaku/startup/jigyouka-ouen.html"
  },
  {
    "id": "kisarazu-city-akiten-katsuyo-hojo",
    "name": "木更津市空き店舗活用支援事業補助金",
    "provider": "木更津市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費の1/2（みなと口地区は最大100万円、太田山口地区は最大50万円）",
    "summary": "中心市街地の登録済み空き店舗を借りる・買うなどして改装し開業する際の改装費を補助する。後払いで事前相談が必要。",
    "eligibility": [
      "木更津駅周辺の登録空き店舗で小売・飲食等を開業する個人または中小企業者",
      "事前相談を行い、工事着手前であること"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "木更津市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kisarazu.lg.jp/soshiki/keizai/sangyoshinko/1/3635.html"
  },
  {
    "id": "kisarazu-city-chusho-shikin-yushi",
    "name": "木更津市中小企業資金融資",
    "provider": "木更津市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "一般事業資金は運転資金2,500万円以内（5年以内）、設備資金5,000万円以内（10年以内）",
    "summary": "市が金融機関に資金を預託して行う制度融資。令和8年度の制度が案内されている。保証料は別途必要で金融機関に相談。",
    "eligibility": [
      "木更津市内の中小企業者",
      "開業6か月以上1年未満の者も対象になる場合あり"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "木更津市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度制度",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kisarazu.lg.jp/soshiki/keizai/sangyoshinko/1/3640.html"
  },
  {
    "id": "kisarazu-city-keiei-kakushin-shorei",
    "name": "木更津市 経営革新計画承認企業への奨励金",
    "provider": "木更津市 産業振興課",
    "level": "municipality",
    "type": "給付金",
    "cat": "研究開発・新事業",
    "amount": "5万円",
    "summary": "経営革新計画の承認を受けた中小企業者に市が奨励金を交付する。",
    "eligibility": [
      "経営革新計画の承認を受けた木更津市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "木更津市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kisarazu.lg.jp/soshiki/keizai/sangyoshinko/1/4021.html"
  },
  {
    "id": "kisarazu-city-sogyo-juku",
    "name": "木更津創業塾（令和8年度）",
    "provider": "木更津市 産業・創業支援センター らづ-Biz",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "創業希望者向けの講座で、上半期・下半期に各1期開催。修了により登録免許税の軽減など創業支援を受けられる。",
    "eligibility": [
      "木更津市内で創業を考えている人、創業間もない人"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "木更津市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は上半期・下半期に各1期（日程は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kisarazu.lg.jp/soshiki/keizai/sangyoshinko/1/3636.html"
  },
  {
    "id": "matsudo-city-akitenpo",
    "name": "松戸市商店街商業事業者誘致促進事業補助金（空き店舗出店）",
    "provider": "松戸市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改修費：1/2以内・上限50万円、賃借料補助あり（詳細は要確認）",
    "summary": "商店会エリアの空き店舗に出店する商業事業者の店舗改修費と賃借料の一部を補助する。",
    "eligibility": [
      "商店会エリア内の3か月以上貸し出されていない空き店舗に入居",
      "営業開始後3年間の事業継続"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "松戸市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsudo.chiba.jp/jigyosya/syoukougyou/syotenkai-hojyo/syoutenngaiakitenpo.html"
  },
  {
    "id": "matsudo-city-chusho-risihokyu",
    "name": "松戸市中小企業振興資金利子補給制度",
    "provider": "松戸市 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "年1.0％以内等の利子補給（創業後5年未満の融資や事業承継資金など。率は融資種別により要確認）",
    "summary": "千葉県制度融資の利用者に対し市が利子の一部を補給する。毎年度の予算措置で、3年間の補給を約束するものではない。",
    "eligibility": [
      "市内の中小企業者",
      "対象の制度融資を利用（創業後5年未満・事業承継資金など）"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "松戸市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度の実施有無は令和8年4月に公表とされる。最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsudo.chiba.jp/jigyosya/syoukougyou/risihokyu.html"
  },
  {
    "id": "matsudo-city-digital-challenge",
    "name": "松戸市中小企業デジタル化チャレンジ補助金",
    "provider": "松戸市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "上限50万円（補助率は要確認）",
    "summary": "業務改善により売上・生産性向上につながるソフトウェアの利用料・購入費・開発費、保守委託費などを補助する。",
    "eligibility": [
      "市内の中小企業者等",
      "ソフトウェアの導入が必須"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "松戸市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜令和9年2月27日",
    "deadline": "2027-02-27",
    "priority": 8,
    "url": "https://www.city.matsudo.chiba.jp/jigyosya/syoukougyou/dx-charenji.html"
  },
  {
    "id": "matsudo-city-kaisha-setsuritsu-hojo",
    "name": "松戸市新規会社設立登録免許税補助金",
    "provider": "松戸市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "登録免許税（株式会社75,000円・合同会社30,000円まで）＋定款認証手数料（5万円まで）、合算上限125,000円",
    "summary": "株式会社・合同会社の設立にかかる登録免許税等の一部を補助する。",
    "eligibility": [
      "市内で会社を設立する創業者",
      "会社設立前（支払前）に申請すること"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "松戸市"
    ],
    "stages": [
      "planning"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsudo.chiba.jp/jigyosya/syoukougyou/tourokumenkyozei.html"
  },
  {
    "id": "matsudo-city-setsubi-toushi",
    "name": "松戸市中小企業設備投資補助金",
    "provider": "松戸市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "一般型：1/10以内・上限50万円、生産性向上型：1/3以内・上限250万円（賃上げありの場合）",
    "summary": "製造業者が税抜300万円以上の生産機械等を購入した費用の一部を補助する。",
    "eligibility": [
      "市内の中小企業者（製造業者）",
      "取得価額合計が税抜300万円以上の機械・装置",
      "製造小売業は対象外"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "松戸市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsudo.chiba.jp/jigyosya/syoukougyou/setubitousi.html"
  },
  {
    "id": "matsudo-city-sogyosha-hoshoryo",
    "name": "松戸市創業者保証料補助金",
    "provider": "松戸市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "千葉県制度融資「創業資金 一般枠」で支払った保証料を補助（上限額は要確認）",
    "summary": "市内で創業し千葉県制度融資の創業資金を借りた際の信用保証料を補助する。",
    "eligibility": [
      "市内で創業する方",
      "千葉県制度融資 創業資金 一般枠を利用",
      "特定創業支援等事業の証明書が必要な場合あり（要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "松戸市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度の申請受付は令和8年11月中下旬にページで案内予定",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsudo.chiba.jp/jigyosya/syoukougyou/sougyoushahoshou.html"
  },
  {
    "id": "matsudo-city-tenjikai-hojo",
    "name": "松戸市展示会・見本市等出展補助",
    "provider": "松戸市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "国内展示会：経費の1/2以内・上限10万円（海外は要確認）",
    "summary": "自社製品を国内外の展示会・見本市に出展する際の出展費用の一部を補助する。",
    "eligibility": [
      "市内の中小企業者等",
      "自社製品の受注拡大・販路開拓が目的"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "松戸市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsudo.chiba.jp/jigyosya/syoukougyou/tenjikaihojo.html"
  },
  {
    "id": "nagareyama-city-akitenpo-yuko-katsuyo",
    "name": "流山市空き店舗有効活用事業補助金",
    "provider": "流山市 経済振興部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費は対象経費の1/2（上限100万円）、賃借料は1/3（上限月7万円・12か月分）",
    "summary": "市内の空き店舗に出店する事業者に改装費と賃借料を補助する。令和8年4月1日に改正され、賃借料補助は1/3・12か月となった。",
    "eligibility": [
      "6か月以上営業実績のない市内の賃貸店舗に出店する事業者",
      "事前協議書を営業開始日の2か月前までに提出",
      "改装工事は市内に本店等を持つ施工業者と契約"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "流山市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認（事前協議は営業開始2か月前まで）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nagareyama.chiba.jp/business/1006712/1052961/1052963/1031759.html"
  },
  {
    "id": "nagareyama-city-group-uriage-up",
    "name": "流山市グループ提案型売上アップ・プロジェクト応援補助金",
    "provider": "流山市 経済振興部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "対象経費の1/2（上限100万円）",
    "summary": "市内事業者3者以上のグループが提案する売上アップの取り組みを補助する。1事業者のみの申請は不可。",
    "eligibility": [
      "流山市内で事業を営む3者以上のグループ",
      "1事業者単独での申請は不可"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "流山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（令和7年度の第1期締切は令和7年5月16日）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nagareyama.chiba.jp/business/1006692/1036324.html"
  },
  {
    "id": "nagareyama-city-sogyo-school",
    "name": "流山市 創業スクール（特定創業支援等事業）",
    "provider": "流山市 商工振興課・流山商工会議所",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "中小企業診断士による全4日間の創業スクール。修了すると証明書が発行され、登録免許税の軽減や創業関連保証の限度額拡充（1,000万円から1,500万円）などの優遇が受けられる。",
    "eligibility": [
      "創業予定の方または創業して間もない方",
      "証明書の発行を受けるには所定の支援を受講"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "流山市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認（確認できたのは令和7年度下期の募集）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nagareyama.chiba.jp/business/1006712/1047853.html"
  },
  {
    "id": "narashino-city-chusho-shikin-yushi",
    "name": "習志野市中小企業資金融資制度（利子補給）",
    "provider": "習志野市 産業振興課・習志野商工会議所",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認（返済期間中の利子の一部を年2回補給）",
    "summary": "市内中小企業者の資金調達を支える市の融資制度。返済期間中の利子の一部を市が補給する。",
    "eligibility": [
      "市内で事業を営む中小企業者",
      "申込窓口は習志野商工会議所",
      "利子補給の率・要件は年度ごとに見直されるため要確認"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "習志野市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（利子補給の申請は例年8月と2月）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.narashino.lg.jp/soshiki/sangyoshinko/gyomu/sangyo/business_loan/system.html"
  },
  {
    "id": "narashino-city-chutaikyo-kakekin-hojo",
    "name": "習志野市 中小企業退職金共済掛金補助",
    "provider": "習志野市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "掛金の20%（被共済者1人あたり上限72,000円）",
    "summary": "中退共に加入した市内中小企業の事業主に対し、連続12か月分の掛金の一部を補助する。",
    "eligibility": [
      "市内に住所を持つ事業主で、市内で1年以上同一事業を営んでいる",
      "12か月以上継続して掛金を納付している",
      "市税を滞納していない"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "習志野市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（直近の受付は令和8年1月5日〜2月27日で終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.narashino.lg.jp/soshiki/sangyoshinko/gyomu/koyou_roudou_syurou/working_conditions/kyosai.html"
  },
  {
    "id": "narashino-city-shinyo-hosyoryo-hojo",
    "name": "習志野市 信用保証料補助制度",
    "provider": "習志野市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "中小企業・個人事業主が融資を受ける際に支払う信用保証料を補助する制度。令和8年度の案内ページが公開されている。",
    "eligibility": [
      "市内の中小企業者・個人事業主",
      "市の融資制度等を利用して信用保証を受けた方",
      "詳細要件は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "習志野市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.narashino.lg.jp/soshiki/sangyoshinko/shinyouhosyouryouhojyo.html"
  },
  {
    "id": "narashino-city-sogyo-yushi",
    "name": "習志野市 創業支援資金融資",
    "provider": "習志野市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "市内で創業・独立開業する際に必要な資金について融資を行う制度。創業計画書（千葉県信用保証協会所定様式）などが必要。",
    "eligibility": [
      "市内で創業・独立開業する方",
      "創業計画書などの提出が必要"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "習志野市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.narashino.lg.jp/soshiki/sangyoshinko/gyomu/sangyo/Start_Your_Own_Business/founding_support.html"
  },
  {
    "id": "narita-city-chushokigyo-kinyu",
    "name": "成田市中小企業金融支援（創業支援資金・一般事業資金ほか）",
    "provider": "成田市 商工振興企業立地課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業支援資金：設備1,500万円・運転750万円まで。一般事業資金：設備3,000万円・10年以内など",
    "summary": "市内中小企業向けの制度融資。創業支援資金、事業転換資金、環境経営支援資金などがあり、令和8年度版の案内が公開。",
    "eligibility": [
      "市内の中小企業者",
      "千葉県信用保証協会の保証を利用"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "成田市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度版の案内あり（通年。詳細は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.narita.chiba.jp/business/page152800.html"
  },
  {
    "id": "narita-city-sogyo-shien",
    "name": "成田市創業支援補助金",
    "provider": "成田市 商工振興企業立地課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "創業経費の1/2（上限50万円。うち広報費は上限25万円）",
    "summary": "創業前から創業後6か月以内の人の店舗等借入費・広報費等を補助。事前申請が必要で、交付決定前の経費は対象外。",
    "eligibility": [
      "創業前〜創業後6か月以内の人",
      "成田商工会議所または成田市東商工会の創業相談を受け推薦を得ていること",
      "事業承継・フランチャイズは対象外"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "成田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認（ページ更新日が古く令和8年度の募集は未確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.narita.chiba.jp/business/page154900.html"
  },
  {
    "id": "noda-city-akiten-katsuyo-hojo",
    "name": "野田市空き店舗等活用補助金",
    "provider": "野田市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "賃借料 1年目1/3以内（月4万円まで）・2年目1/4以内（月3万円まで）・3年目1/6以内（月2万円まで）、改修費は1/3以内で40万円まで（1店舗1回）",
    "summary": "3か月以上空いている空き店舗等を借りて出店する人に、家賃（開業翌月から3年間）と改修費を補助する。",
    "eligibility": [
      "空き店舗（3か月以上）や空き住宅・事務所・倉庫（6か月以上）を借りて出店",
      "2年以上の事業継続見込み",
      "野田商工会議所または関宿商工会への加入、市税の未納がないこと"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "野田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "賃貸借契約後6か月間（令和8年度の募集状況は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.noda.chiba.jp/jigyousha/1007430/1035477.html"
  },
  {
    "id": "noda-city-kaigyo-ikusei-hojo",
    "name": "野田市開業育成資金補助金",
    "provider": "野田市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "利子補給と信用保証料の補助（率・上限は要確認）",
    "summary": "千葉県「開業・育成資金」や日本政策金融公庫国民生活事業の一部融資を無担保で借りた事業者に、利子補給と信用保証料の補助を行う。",
    "eligibility": [
      "県の開業・育成資金または公庫の対象融資を無担保で受けている事業者"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "野田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.noda.chiba.jp/jigyousha/yuushi/1000159.html"
  },
  {
    "id": "sakura-city-akiten-shuten-hojo",
    "name": "佐倉市商店街空き店舗等出店促進補助金",
    "provider": "佐倉市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/2、上限は創業特例型で最大80万円（主要道路に面さない場合40万円）、通常型60万円または30万円",
    "summary": "市内で5か月以上空いている空き店舗・空き家で事業を始める人に、改装費や賃借料の一部を補助する。令和8年度は先着順で予算がなくなり次第終了。",
    "eligibility": [
      "空き店舗等で飲食・物販など来客が見込める事業を始めること",
      "週30時間以上の通年営業",
      "個人は市内在住、法人は市内に店舗登記"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "佐倉市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は先着順で受付中（予算上限に達し次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.sakura.lg.jp/soshiki/shokoshinko/4/3771.html"
  },
  {
    "id": "sakura-city-chusho-shikin-yushi",
    "name": "佐倉市中小企業資金融資制度",
    "provider": "佐倉市 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "市の中小企業向け制度融資。新規申込は事前予約制で、取扱金融機関を通じて申し込む。",
    "eligibility": [
      "佐倉市内の中小企業者",
      "事前予約（商工振興課 制度融資担当）が必要"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "佐倉市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度制度（事前予約制）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.sakura.lg.jp/soshiki/shokoshinko/4/sakurashiyuushi.html"
  },
  {
    "id": "sakura-city-sogyo-school",
    "name": "佐倉市 創業スクール（特定創業支援等事業）",
    "provider": "佐倉市 商工振興課（千葉県信用保証協会主催）",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "受講無料",
    "summary": "全4日間の創業スクール。修了で特定創業支援の証明書が得られ、登録免許税の軽減や融資優遇などを受けられる。",
    "eligibility": [
      "これから創業する人、または創業後5年未満の人"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "佐倉市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度上期の募集（5/29〜6/12）は終了。次回は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.sakura.lg.jp/soshiki/shokoshinko/sougyoushien/sougyouseminor/20386.html"
  },
  {
    "id": "yachiyo-city-chusho-shikin-yuushi",
    "name": "八千代市中小企業資金融資制度",
    "provider": "八千代市 商工観光課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認（融資利率は融資期間により年1.8〜2.35%、令和2年度決定分の掲載。最新は要確認）",
    "summary": "市内中小企業者の運転・設備資金を、千葉県信用保証協会の保証付きで金融機関から融資する市の制度融資。",
    "eligibility": [
      "市内で事業を営む中小企業者",
      "千葉県信用保証協会の保証を受けられること"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "八千代市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yachiyo.chiba.jp/162500/page000010.html"
  },
  {
    "id": "yachiyo-city-koreisha-koyo-shoreikin",
    "name": "八千代市高年齢者等雇用促進奨励金",
    "provider": "八千代市 商工観光課",
    "level": "municipality",
    "type": "給付金",
    "cat": "人材・雇用",
    "amount": "高年齢者は月額1万円、心身障害者は月額1.5万円（最長12か月）",
    "summary": "ハローワークの紹介で市内在住の高年齢者または心身障害者を常用労働者として雇用した市内事業主に奨励金を交付する。",
    "eligibility": [
      "市内に事業所を有する事業主",
      "ハローワーク紹介で市内在住の60歳以上（または対象の障害者）を常用雇用",
      "掲載内容は古い可能性があり最新要件は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "八千代市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yachiyo.chiba.jp/162500/page000013.html"
  },
  {
    "id": "yachiyo-city-sogyo-shien-risihokyu",
    "name": "八千代市 創業支援資金の利子補給・特定創業支援等事業修了者の特例",
    "provider": "八千代市 商工観光課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "要確認（創業関連保証の枠が1,000万円から1,500万円に拡充と記載）",
    "summary": "日本政策金融公庫船橋支店の創業融資に対する利子補給金の制度と、特定創業支援等事業（実践創業塾）の修了者向けの特典を案内している。",
    "eligibility": [
      "市内で創業予定または創業した方",
      "特定創業支援等事業を修了し市の証明を受けた方（特例利用の場合）"
    ],
    "industries": "all",
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "八千代市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yachiyo.chiba.jp/162500/page100072.html"
  },
  {
    "id": "tokyo-jigyoshokei-josei",
    "name": "事業承継支援助成金（第3回）",
    "provider": "東京都中小企業振興公社",
    "level": "prefecture",
    "type": "助成金",
    "cat": "事業承継",
    "amount": "上限200万円（助成率は要確認）",
    "summary": "都内中小企業の事業承継に伴う取組経費を助成する。",
    "eligibility": [
      "都内の中小企業者等",
      "詳細要件は募集要項で要確認"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "第3回 2026年10月13日〜12月15日17時（予定）",
    "deadline": "2026-12-15",
    "priority": 6,
    "url": "https://www.tokyo-kosha.or.jp/support/josei/jigyo/shoukei.html"
  },
  {
    "id": "tokyo-kadai-kaiketsu-gijutsu",
    "name": "課題解決型技術開発促進事業",
    "provider": "東京都 産業労働局・東京都中小企業振興公社",
    "level": "prefecture",
    "type": "助成金",
    "cat": "研究開発・新事業",
    "amount": "助成率2/3以内・上限2,000万円",
    "summary": "都市課題の解決に資する製品・サービスの開発・改良を支援する。",
    "eligibility": [
      "都内中小企業者等",
      "都市課題の解決に資する開発であること"
    ],
    "industries": [
      "manufacturing",
      "it"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "第2回 2026年9月14日〜10月30日17時",
    "deadline": "2026-10-30",
    "priority": 6,
    "url": "https://www.tokyo-kosha.or.jp/support/josei/jigyo/kadai-kaihatsu/index.html"
  },
  {
    "id": "tokyo-seidoyushi-sogyo",
    "name": "東京都中小企業制度融資「創業」",
    "provider": "東京都 産業労働局・東京信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額3,500万円・固定利率は年度により異なる（令和7年度要項は1.9〜2.4%以内）・信用保証料は都が2/3補助（令和8年度要項）",
    "summary": "創業前の個人や創業後5年未満の事業者向けの制度融資。創業支援を受けると利率が優遇される。",
    "eligibility": [
      "創業前の個人または創業後5年未満の中小企業者等",
      "東京信用保証協会の保証審査が必要"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（令和8年度要項）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.tokyo-sogyo-net.metro.tokyo.lg.jp/finance/seido_yuushi.html"
  },
  {
    "id": "tokyo-seihin-chakushu",
    "name": "製品開発着手支援助成事業",
    "provider": "東京都 産業労働局・東京都中小企業振興公社",
    "level": "prefecture",
    "type": "助成金",
    "cat": "研究開発・新事業",
    "amount": "助成率1/2以内・上限100万円",
    "summary": "製品・技術開発の前段階の技術的検討に要する経費を助成する。",
    "eligibility": [
      "都内中小企業者等",
      "製品・技術開発の前段階の技術検討を行うこと"
    ],
    "industries": [
      "manufacturing",
      "it"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度 2026年10月28日〜11月18日17時",
    "deadline": "2026-11-18",
    "priority": 6,
    "url": "https://www.metro.tokyo.lg.jp/information/press/2026/10/2026100105"
  },
  {
    "id": "tokyo-sogyo-josei",
    "name": "創業助成事業（東京都）",
    "provider": "東京都 産業労働局・東京都中小企業振興公社",
    "level": "prefecture",
    "type": "助成金",
    "cat": "創業・起業",
    "amount": "助成率2/3以内・上限400万円（最長2年間）",
    "summary": "都内創業予定者や創業5年未満の中小企業者等の創業初期の経費を助成する。",
    "eligibility": [
      "都内創業予定者または創業5年未満の中小企業者等",
      "TOKYO創業ステーションの事業計画書策定支援修了などの要件あり"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は第1回(4/7〜4/16)・第2回(9/29〜10/8)とも受付終了。次回は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.metro.tokyo.lg.jp/information/press/2026/02/2026021609"
  },
  {
    "id": "tokyo-souikufuu-challenge",
    "name": "経営力強化に向けた創意工夫チャレンジ促進事業",
    "provider": "東京都中小企業振興公社",
    "level": "prefecture",
    "type": "助成金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "業務改善や賃上げに取り組む中小企業を支援する。",
    "eligibility": [
      "都内中小企業者等",
      "コースごとの要件は募集要項で要確認"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "第3回 業務改善コース11/2〜11/13、賃上げ重点コース12/1〜12/14（予定）",
    "deadline": "2026-12-14",
    "priority": 6,
    "url": "https://www.tokyo-kosha.or.jp/support/josei/index.html"
  },
  {
    "id": "chofu-city-jigyo-shikin-assen",
    "name": "調布市中小企業 事業資金融資あっせん制度",
    "provider": "調布市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "利子補給・信用保証料全額補助(物価高騰対策の運転資金は当初3年間利子全額補助、4年目以降1/2)",
    "summary": "市内中小企業者の事業資金の融資をあっせんし、利子と信用保証料を市が補助する。",
    "eligibility": [
      "市内で事業を営む中小企業者",
      "物価高騰対策分はセーフティネット保証5号の基準を満たすこと"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "調布市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年(最新は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.chofu.tokyo.jp/www/contents/1176118978600/"
  },
  {
    "id": "chofu-city-kaigyo-shikin-assen",
    "name": "調布市中小企業 開業資金融資あっせん制度",
    "provider": "調布市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "限度額1,000万円・償還84か月以内・利率2.20%(市が利率の1/2を補助、信用保証料は全額補助)",
    "summary": "市内で開業する中小企業者向けの融資あっせん。利子の1/2と信用保証料を市が補助する。",
    "eligibility": [
      "市内で開業する(開業1年未満含む)中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "調布市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年(最新は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.chofu.tokyo.jp/www/contents/1315357463913/index.html"
  },
  {
    "id": "chofu-city-marukei-rishi",
    "name": "マル経融資(経営改善貸付)利子補給",
    "provider": "調布市 産業振興課・調布市商工会",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認(無担保・無保証人融資への利子補給)",
    "summary": "調布市商工会の経営指導を受ける小規模事業者向けのマル経融資に対し、市と商工会が利子補給を行う。",
    "eligibility": [
      "調布市商工会の経営指導を原則6か月以上受けた小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "調布市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年(最新は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://city.chofu.tokyo.jp/www/contents/1392361371164/index.html"
  },
  {
    "id": "chofu-city-zerocarbon-chusho",
    "name": "中小企業等ゼロカーボン推進補助事業",
    "provider": "調布市",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認(LED照明・断熱改修・高効率給湯器が対象)",
    "summary": "市内中小企業等のLED照明、断熱化改修、高効率給湯器の導入費用を補助する(令和8年度の補助制度一覧に掲載)。",
    "eligibility": [
      "市内の中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "調布市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度(募集状況は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.chofu.tokyo.jp/www/genre/1391389837286/index.html"
  },
  {
    "id": "fuchu-city-akitenpo-yachin",
    "name": "空き店舗等対策家賃補助事業",
    "provider": "府中市 産業観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "事業者負担の月額賃料の2/3以内・6か月間(月額25万円まで)",
    "summary": "空き店舗・空き事務所を借りて市内で新たに開業・営業する事業者に家賃の一部を補助する。",
    "eligibility": [
      "空き店舗等を借りて新規開業・営業する事業者",
      "新規開業は1か月以内に営業開始"
    ],
    "industries": [
      "food",
      "retail",
      "beauty"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "府中市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fuchu.tokyo.jp/jigyosha/keesha/kigyo/tyushokigyoshienn/akitenpohojo.html"
  },
  {
    "id": "fuchu-city-hanro-kaitaku",
    "name": "小規模事業者販路開拓等補助金",
    "provider": "府中市 産業観光課・むさし府中商工会議所",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率2/3・上限30万円",
    "summary": "経営計画に基づく小規模事業者の販路開拓や業務効率化の取組費用を補助する。",
    "eligibility": [
      "市内の小規模事業者",
      "経営計画の策定"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "府中市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fuchu.tokyo.jp/jigyosha/keesha/kigyo/tyushokigyoshienn/hanrokaitaku.html"
  },
  {
    "id": "fuchu-city-shoene-setsubi",
    "name": "省エネ設備更新支援事業補助金",
    "provider": "府中市 産業観光課・むさし府中商工会議所",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率2/3・上限50万円",
    "summary": "市内店舗・事務所の既存設備を省エネ設備に更新する費用を補助する。事前相談が必要。",
    "eligibility": [
      "市内の店舗・事務所を持つ事業者",
      "事前相談を受けていること"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "府中市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fuchu.tokyo.jp/jigyosha/keesha/kigyo/tyushokigyoshienn/shoene.html"
  },
  {
    "id": "fuchu-city-yushi-assen-rishi",
    "name": "府中市融資あっ旋制度(創業資金・小口事業資金)利子補助",
    "provider": "府中市 産業観光課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業資金は1,000万円、利用者負担利率0.5〜0.7%(版により差異あり、要確認)",
    "summary": "市内中小企業者や創業予定者への融資をあっ旋し、利子の一部を市が補助する。創業資金は創業支援機関への相談が必要。",
    "eligibility": [
      "市内中小企業者(個人事業主含む)",
      "市内で創業しようとする者"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "府中市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年(令和8年度版パンフレットあり)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fuchu.tokyo.jp/jigyosha/keesha/kigyo/tyushokigyoshienn/chusho.html"
  },
  {
    "id": "hachioji-city-akiten-kaishu",
    "name": "空き店舗等活用補助金(中心市街地以外)",
    "provider": "八王子市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/2・上限50万円",
    "summary": "中心市街地以外の地域で空き店舗等を活用して新たに事業を営む個人・法人の改修費の一部を補助する。",
    "eligibility": [
      "空き店舗等で新たに事業を営もうとする個人または法人"
    ],
    "industries": [
      "food",
      "retail",
      "beauty"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "八王子市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜12月25日",
    "deadline": "2026-12-25",
    "priority": 8,
    "url": "https://www.city.hachioji.tokyo.jp/kurashi/sangyo/003/003/p006356.html"
  },
  {
    "id": "hachioji-city-jigyo-shikin-assen",
    "name": "八王子市事業資金融資あっ旋制度(創業支援資金含む)",
    "provider": "八王子市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認(予算の範囲で利子補給)",
    "summary": "信用保証協会の保証を前提に市が融資をあっ旋し、予算の範囲内で利子補給を行う。創業支援資金もある。",
    "eligibility": [
      "市内中小企業者・創業者",
      "審査あり"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "八王子市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "2026年度(通年)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hachioji.tokyo.jp/jigyosha/014/005/001/p006509.html"
  },
  {
    "id": "hachioji-city-keiei-kyoka-hanro",
    "name": "経営力強化補助金(販路拡大事業)",
    "provider": "八王子市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "令和8年度の公募ページが公開されている販路拡大向けの補助金。補助率・上限は要確認。",
    "eligibility": [
      "市内事業者(詳細は要確認)"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "八王子市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度公募(期間は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hachioji.tokyo.jp/kurashi/sangyo/001/p035389.html"
  },
  {
    "id": "hachioji-city-sogyosha-hanro",
    "name": "創業者販路拡大支援補助金",
    "provider": "八王子市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率3/4以内・上限10万円",
    "summary": "創業者の販路拡大の取組費用を補助する。予算終了次第受付終了。",
    "eligibility": [
      "創業予定の方",
      "創業後5年未満の方"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "八王子市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年1月31日(予算終了まで)",
    "deadline": "2027-01-31",
    "priority": 8,
    "url": "https://www.city.hachioji.tokyo.jp/kurashi/sangyo/001/p035372.html"
  },
  {
    "id": "hachioji-city-yushi-shienkin",
    "name": "八王子市事業資金融資支援金(保証料自己負担分)",
    "provider": "八王子市 産業振興課",
    "level": "municipality",
    "type": "給付金",
    "cat": "融資・利子補給",
    "amount": "信用保証料の自己負担分を交付",
    "summary": "中東情勢の影響を受ける中小企業等で、市融資(創業支援資金を含む)の融資実行を受けた者に保証料自己負担分を交付する。",
    "eligibility": [
      "2026年7月1日〜2027年2月28日に対象の市融資が実行された中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "八王子市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "8月3日から申請受付(融資実行は2027年2月28日まで)",
    "deadline": "2027-02-28",
    "priority": 8,
    "url": "https://www.city.hachioji.tokyo.jp/kurashi/sangyo/001/p037700.html"
  },
  {
    "id": "higashimurayama-city-shinhanro-kaitaku-hojo",
    "name": "新販路開拓等応援プロジェクト補助金",
    "provider": "東村山市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率2分の1以内・上限50万円(市外から市内で新規事業を開始する場合は上限100万円)",
    "summary": "新たに店舗・事務所を構える、展示会に出展する、ECサイトに出店するなど新たな販路開拓に挑戦する中小企業者等(市内創業者含む)の費用の一部を補助する。",
    "eligibility": [
      "中小企業者等(市内で創業する人を含む)",
      "事業計画書を作成し東村山市商工会や経営相談窓口Bisport東村山で助言を受けること",
      "開業届を提出済みで1年以上事業継続の見込みがあること"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "東村山市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年5月26日から令和9年1月29日(予算に達し次第終了)",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.higashimurayama.tokyo.jp/kurashi/jigyo/chusyo/josei_hojo_kyuuhu/sangyou202104271.html"
  },
  {
    "id": "higashimurayama-city-tokutei-sogyo-shien",
    "name": "特定創業支援事業",
    "provider": "東村山市 産業振興課",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "市が創業支援機関と連携して行う創業支援を受け、証明書の交付を受けると登録免許税の軽減や融資面の優遇などが利用できる。",
    "eligibility": [
      "市内で創業予定または創業して間もない人",
      "市の認定する創業支援を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "東村山市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.higashimurayama.tokyo.jp/kurashi/shigoto/shoko/kigyo-sogyo/sougyousien.html"
  },
  {
    "id": "hino-city-hanro-kaitaku-shien",
    "name": "日野市販路開拓支援事業補助金",
    "provider": "日野市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "対象経費の1/2以内（上限30万円）",
    "summary": "展示品の運搬委託費、オンライン展示会用のデジタル営業資料の外注制作費など、販路開拓の経費を補助する。",
    "eligibility": [
      "市内に事業所等を持つ中小企業者（ものづくり基盤産業など）",
      "市内に本部・支部がある産業団体",
      "市税を滞納していない"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "日野市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜令和9年1月29日17時（予算枠に達し次第終了）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.hino.lg.jp/sangyo/1020464/1003536.html"
  },
  {
    "id": "hino-city-jigyo-kakudai-shien",
    "name": "日野市事業拡大支援事業補助金",
    "provider": "日野市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "対象経費の1/2以内（一般型100万円、成長促進型400万円まで）",
    "summary": "新製品・新技術の開発、人材育成、特許取得、研究機関との共同開発などの経費を補助する。審査会（書類とプレゼン）で決定。",
    "eligibility": [
      "市内に事業所を持つものづくり基盤産業の中小企業者",
      "市内に本部・支部を持つ産業団体",
      "市税を滞納していない"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "日野市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hino.lg.jp/sangyo/1020464/1008374.html"
  },
  {
    "id": "hino-city-jigyo-shikin-assen",
    "name": "日野市中小企業・小規模企業事業資金融資あっせん制度",
    "provider": "日野市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額は多くの資金で2,000万円。利子補給率は一部1.0%、SDGs推進資金等は1.2%（令和7年度の条件）。保証料は市が1/2補助する区分あり",
    "summary": "東京信用保証協会の保証を受けて利用する市の制度融資。利子補給と信用保証料補助がある。",
    "eligibility": [
      "市内の中小企業者・小規模事業者",
      "東京信用保証協会の保証を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "日野市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（確認できた条件は令和7年4月〜令和8年3月申込分）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hino.lg.jp/sangyo/1020464/1003541.html"
  },
  {
    "id": "hino-city-miryoku-ten-zukuri",
    "name": "日野市魅力ある個店創り支援事業補助金",
    "provider": "日野市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "対象経費の2/3以内（上限100万円）",
    "summary": "店舗の魅力や集客力・販売力を高める新たな取り組みを補助する。維持管理や老朽化のみを理由とする工事は対象外。",
    "eligibility": [
      "市内に店舗を持つ中小企業者",
      "申請年度に新たに取り組む事業で、交付決定後に完了するもの",
      "地域商業に好影響を与える事業"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "日野市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度の受付は終了（令和8年4月1日〜5月29日）",
    "deadline": "2026-05-29",
    "priority": 8,
    "url": "https://www.city.hino.lg.jp/sangyo/1020464/1013987.html"
  },
  {
    "id": "hino-city-monozukuri-sangyo-kaihatsu",
    "name": "日野市ものづくり産業開発支援事業補助金",
    "provider": "日野市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "対象経費の1/2（1事業者年間上限6万円）",
    "summary": "東京都立産業技術研究センターなど大学等の施設での依頼試験・機器利用・技術相談の費用を補助する。",
    "eligibility": [
      "市内のものづくり企業",
      "大学等の試験研究機関を利用した新製品・新技術の開発"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "日野市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認（確認できた募集要項は令和7年4月1日〜令和8年2月27日）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hino.lg.jp/sangyo/1020464/1003515.html"
  },
  {
    "id": "hino-city-tokutei-sogyo-shikin",
    "name": "日野市 特定創業資金（融資あっせん）",
    "provider": "日野市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "融資限度額1,000万円",
    "summary": "市の特定創業支援等事業を受けて証明書を得た創業者が利用できる融資あっせん。",
    "eligibility": [
      "日野市の特定創業支援等事業を受け、証明書を持つ方"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "日野市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hino.lg.jp/sangyo/sougyo/1027261.html"
  },
  {
    "id": "kodaira-city-kinkyu-keizai-taisaku-shikin",
    "name": "小平市 緊急経済対策資金の融資あっせん（令和8年度）",
    "provider": "小平市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額1,000万円",
    "summary": "原材料価格の高騰などで経営状況が悪化した市内事業者の資金繰りを支える運転資金の融資あっせん。",
    "eligibility": [
      "物価高騰等の影響で経営状況が悪化している市内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "小平市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年9月1日〜12月28日",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.kodaira.tokyo.jp/kurashi/129/129341.html"
  },
  {
    "id": "kodaira-city-koshasha-ikusei-shikin",
    "name": "小平市 商工業後継者育成資金あっせん事業",
    "provider": "小平市 産業振興課・小平商工会",
    "level": "municipality",
    "type": "融資",
    "cat": "事業承継",
    "amount": "借入期間全体の利子の80%を補助（融資限度額2,000万円）",
    "summary": "事業承継した方や承継予定の方が小平商工会のマル経融資を利用する場合に、利子の一部を補助する。",
    "eligibility": [
      "代表者が50歳以下で、概ね5年以内に承継した方または1年以内に承継予定",
      "従業員20人以下（商業・サービス業は5人以下）",
      "小平商工会の経営・金融指導を原則6か月以上受けている"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "小平市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kodaira.tokyo.jp/kurashi/038/038834.html"
  },
  {
    "id": "kodaira-city-shinki-kaisha-setsuritsu-oenkin",
    "name": "小平市新規会社設立応援金",
    "provider": "小平市 産業振興課",
    "level": "municipality",
    "type": "給付金",
    "cat": "創業・起業",
    "amount": "株式会社10万円、合同会社など持分会社5万円",
    "summary": "特定創業支援等事業を受けて市の証明を受けた方が市内に会社を設立した場合に応援金を支給する。設立から90日以内に申請。",
    "eligibility": [
      "特定創業支援等事業を受け、市の証明を受けた方",
      "市内に会社を設立",
      "設立から90日以内に申請"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "小平市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認（ページ更新は令和6年度）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kodaira.tokyo.jp/kurashi/104/104491.html"
  },
  {
    "id": "kodaira-city-sogyo-shikin-assen",
    "name": "小平市 小口事業資金・小口零細企業資金融資あっせん（創業資金）",
    "provider": "小平市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "融資限度額1,000万円（利子と信用保証料の一部を市が補助）",
    "summary": "市内で創業予定の方や創業したばかりの方に、市が指定金融機関の融資をあっせんし、利子と保証料の一部を補助する。",
    "eligibility": [
      "市内で創業予定、または創業したばかり（開業1年未満）",
      "信用保証協会の保証対象業種"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "小平市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kodaira.tokyo.jp/kurashi/091/091633.html"
  },
  {
    "id": "machida-city-jigyo-shokei-hojokin",
    "name": "町田市事業承継事業補助金",
    "provider": "町田市 経済観光部 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "補助率1/2・上限50万円",
    "summary": "事業承継推進ネットワークによる実施計画確認を受けた市内中小企業の、診断・承継計画作成・M&A仲介登録等の費用を補助する。",
    "eligibility": [
      "市内に本社がある中小企業者(個人事業者を除く)",
      "1年以上の営業実績・市税完納"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "町田市"
    ],
    "stages": [
      "established"
    ],
    "period": "申請4月〜12月(予算上限で終了)。実施期限は2027年3月12日",
    "deadline": "2026-12-31",
    "priority": 8,
    "url": "https://www.city.machida.tokyo.jp/jigyousha/shien/syoukeisien/hojokin.html"
  },
  {
    "id": "machida-city-marukei-rishi-josei",
    "name": "小規模事業者経営改善資金(マル経融資)利子助成制度",
    "provider": "町田市 産業政策課・町田商工会議所",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資実行後2年間の利子を助成(率は要確認)",
    "summary": "町田商工会議所の経営指導を受けて日本政策金融公庫のマル経融資を利用する小規模事業者に利子助成を行う。",
    "eligibility": [
      "町田商工会議所の経営指導を受ける小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "町田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年(最新は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.machida.tokyo.jp/jigyousha/shien/yushiseido/shokibo_rishi.html"
  },
  {
    "id": "machida-city-sogyo-project",
    "name": "町田創業プロジェクト(特定創業支援)",
    "provider": "町田市 産業政策課・町田商工会議所・町田新産業創造センター",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "要確認(登録免許税軽減・融資優遇など)",
    "summary": "特定創業支援を1か月以上受けて証明を得ると、登録免許税の軽減や制度融資の優遇利率を受けられる。",
    "eligibility": [
      "創業予定者・創業後間もない事業者"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "町田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年(最新は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.machida.tokyo.jp/jigyousha/shien/yushiseido/seidoyushi/shurui/sougyousikin.html"
  },
  {
    "id": "machida-city-sogyo-shikin",
    "name": "町田市中小企業融資制度 創業資金(利子補助)",
    "provider": "町田市 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "限度額1,500万円・期間7年以内。町田創業プロジェクト証明で3年以内利率1.10%など優遇",
    "summary": "創業5年未満の中小企業者向け制度融資。市が利子を補助し、東京都の要件で保証料補助(2/3)もある。",
    "eligibility": [
      "創業5年未満の中小企業者・創業予定者",
      "市内に本店登記、市税完納"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "町田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "2026年度(通年)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.machida.tokyo.jp/jigyousha/shien/yushiseido/seidoyushi/shurui/sougyousikin.html"
  },
  {
    "id": "mitaka-city-shinki-shutten-shienkin",
    "name": "三鷹市新規出店者支援金（令和8年度）",
    "provider": "三鷹市 生活環境部 生活経済課",
    "level": "municipality",
    "type": "給付金",
    "cat": "空き店舗・商店街",
    "amount": "出店時30万円＋6カ月経過時30万円（創業者・事業承継者は各回20万円加算）",
    "summary": "商店街の活性化を目的に、市内賃貸物件で小売業・飲食業の店舗を開く事業者に支援金を支給。先着順。",
    "eligibility": [
      "市内の賃貸物件で小売業または飲食業の店舗を開く",
      "商店会に加入する"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "三鷹市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年6月1日〜令和9年3月31日（先着順）",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.mitaka.lg.jp/c_service/109/109361.html"
  },
  {
    "id": "mitaka-city-shokokai-sangyo-kasseika-hojo",
    "name": "三鷹商工会中小企業等産業活性化補助金（令和8年度）",
    "provider": "三鷹市／三鷹商工会",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "販路拡大・研修等はそれぞれ上限30万円（創業初期等は補助率10分の10に引上げ）",
    "summary": "デジタル枠・グリーン枠・一般枠で、展示会出展、広告宣伝、DX、脱炭素等の取組費用を補助。デジタル・グリーン枠を優先採択。",
    "eligibility": [
      "市内の中小事業者"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "三鷹市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年6月1日〜10月30日（必着、延長後）",
    "deadline": "2026-10-30",
    "priority": 8,
    "url": "https://www.city.mitaka.lg.jp/c_service/118/118760.html"
  },
  {
    "id": "mitaka-city-sogyo-shien-hojokin",
    "name": "三鷹市創業等支援補助金",
    "provider": "三鷹市 生活環境部 生活経済課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "市の創業支援を受けて市内で創業した方の創業経費の一部を補助。令和6年度は6者を採択。",
    "eligibility": [
      "三鷹市の創業支援を受けて市内で創業した方"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "三鷹市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認（令和6年度採択結果のみ確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.mitaka.lg.jp/c_service/111/111083.html"
  },
  {
    "id": "mitaka-city-sogyo-yushi-assen",
    "name": "三鷹市 創業資金融資あっせん制度",
    "provider": "三鷹市 生活環境部 生活経済課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "運転資金・設備資金とも各1,000万円まで。利率年0.5%（市が1.875%を利子補給）",
    "summary": "市内で創業しようとする方・創業1年未満の方向けの融資あっせん。利子の一部を市が補給する。",
    "eligibility": [
      "市内で創業しようとする方",
      "創業後1年未満の方"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "三鷹市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.mitaka.lg.jp/c_service/032/032117.html"
  },
  {
    "id": "musashino-city-shotenkai-shutten-shienkin",
    "name": "令和8年度商店会活性出店支援金",
    "provider": "武蔵野市 市民部 産業振興課",
    "level": "municipality",
    "type": "給付金",
    "cat": "空き店舗・商店街",
    "amount": "出店時と6カ月経過時に各20万円（創業者は各30万円）",
    "summary": "市内の空き店舗・空き事務所を借りて開業し商店会に加入する事業者に支援金を支給。",
    "eligibility": [
      "市内の空き店舗・空き事務所を賃借して開業",
      "対象地域の商店会等に加入",
      "1年以上の事業継続見込み"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "武蔵野市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "事業開始時は令和8年4月1日〜令和9年3月31日／6カ月経過時は〜令和9年10月4日",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.musashino.lg.jp/kurashi_tetsuzuki/shigoto_sangyo/shoko/1053478.html"
  },
  {
    "id": "musashino-city-yushi-assen",
    "name": "武蔵野市融資あっせん制度（創業資金ほか・利子補給・保証料補助）",
    "provider": "武蔵野市 市民部 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業資金は運転500万円・設備800万円まで。利率1.9%のうち市が1.6%を利子補給（本人負担0.3%）。信用保証料も補助",
    "summary": "市の融資あっせんで利子の一部と信用保証料の半額または全額を市が補助する。",
    "eligibility": [
      "東京都内で創業しようとする方",
      "創業後1年未満の方（創業資金）"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "武蔵野市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.musashino.lg.jp/kurashi_tetsuzuki/shigoto_sangyo/shoko/1005798.html"
  },
  {
    "id": "nakano-city-keieiryoku-kyoka",
    "name": "令和8年度中野区経営力強化支援事業補助金",
    "provider": "中野区 区民部産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "上限20万円（販路開拓・創業期広報・IT/DX・多様性対応・子育て環境整備の合算）。補助率は要確認",
    "summary": "ビジネスフェア出展費、創業5年未満の広報（HP・チラシ等）、IT・DX対応などの経費を補助。",
    "eligibility": [
      "中野区内の中小企業者・個人事業主",
      "交付決定前の支払経費は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中野区"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "2026-04-01〜2027-01-31（予算上限に達し次第終了）",
    "deadline": "2027-01-31",
    "priority": 8,
    "url": "https://www.city.tokyo-nakano.lg.jp/jigyosha/sangyoshinko/josei/chusho_r8keieiryoku.html"
  },
  {
    "id": "nakano-city-sangyo-keizai-yushi",
    "name": "中野区産業経済融資（利子補給）",
    "provider": "中野区 区民部産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "金利の一部を区が利子補給（年4回金融機関へ）。限度額・利率は資金ごとに要確認",
    "summary": "区内中小企業者が区のあっせんで金融機関から低利で借りられ、金利の一部を区が補給。IT・DX導入資金など資金メニュー多数。",
    "eligibility": [
      "区内に本店または主たる事業所がある中小企業者",
      "金融機関・信用保証協会の審査あり"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中野区"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tokyo-nakano.lg.jp/jigyosha/sangyoshinko/yushi/sangyou-yushi.html"
  },
  {
    "id": "nakano-city-sogyo-shienshikin",
    "name": "中野区産業経済融資 創業支援資金（保証料補助あり）",
    "provider": "中野区 区民部産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "貸付限度額2,000万円、償還7年以内。信用保証料の1/3を区が補助（都の2/3補助と併せ実質0）",
    "summary": "創業前または創業5年未満の方向けの融資あっせん。創業計画書が必要で、区が保証料の一部を補助。",
    "eligibility": [
      "区内で創業予定または創業5年未満",
      "創業計画書を作成"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中野区"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tokyo-nakano.lg.jp/jigyosha/sangyoshinko/yushi/yushiichiran/sougyou-shienkin.html"
  },
  {
    "id": "nishitokyo-city-chusho-jigyo-shikin-assen",
    "name": "西東京市 中小企業事業資金融資あっせん制度",
    "provider": "西東京市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "市内中小企業の事業資金について融資をあっせんする市の制度融資。利子・保証料の補助内容は公式ページで確認する。",
    "eligibility": [
      "市内で事業を営む中小企業者",
      "申込は産業振興課窓口"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "西東京市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nishitokyo.lg.jp/kurasi/sangyou/yushi_houkaisei/assen/cyuusyoukigyouyuusi.html"
  },
  {
    "id": "nishitokyo-city-dx-kasuishin-hojo",
    "name": "西東京市DX化推進事業補助金",
    "provider": "西東京市 産業振興課・西東京商工会",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "税抜経費の2/3（上限は法人20万円、個人10万円）",
    "summary": "デジタル技術を活用した経営課題の解決に取り組む市内事業者の経費を補助する。西東京商工会の事前審査が必須。",
    "eligibility": [
      "市内に事業所を有する法人・個人事業主",
      "納期到来済みの市税等を完納",
      "西東京商工会の事前審査を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "西東京市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年6月1日〜令和9年1月31日（1事業者年度内1回）",
    "deadline": "2027-01-31",
    "priority": 8,
    "url": "https://www.city.nishitokyo.lg.jp/kurasi/sangyou/kakushujigyou/dxkasuishin.html"
  },
  {
    "id": "nishitokyo-city-jigyo-shokei-soudankai",
    "name": "西東京市 事業承継個別相談会",
    "provider": "西東京市 産業振興課",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "事業承継",
    "amount": "無料",
    "summary": "毎月第4水曜日に開催される完全予約制の無料個別相談会。事業承継や承継による創業の相談ができる。",
    "eligibility": [
      "市内に事業所を持つ中小企業者・個人事業主",
      "市内で事業を引き継いで創業を考えている方"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "西東京市"
    ],
    "stages": [
      "planning",
      "established"
    ],
    "period": "毎月第4水曜日（予約制）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nishitokyo.lg.jp/kurasi/sangyou/oshirase/jigyousyoukeisoudankai.html"
  },
  {
    "id": "nishitokyo-city-led-jigyosho-josei",
    "name": "西東京市 事業所向けLED照明器具買い換え助成金",
    "provider": "西東京市 環境保全課",
    "level": "municipality",
    "type": "助成金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "市内事業所の蛍光灯器具をLED照明に交換する費用を助成する。1事業者1回まで。リースは対象外。",
    "eligibility": [
      "市内の中小企業者等",
      "市内の事業所に新品のLED器具を設置（令和8年7月1日以降の購入・設置が対象と記載）",
      "1事業者につき1回"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "西東京市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nishitokyo.lg.jp/kurasi/kankyo/ondanka/josei/hozyo/R8LEDjigyosya.html"
  },
  {
    "id": "nishitokyo-city-sogyo-shikin-assen",
    "name": "西東京市 創業資金融資あっせん制度",
    "provider": "西東京市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "要確認（利息の一部を市が補助。特定創業の場合は保証料も助成）",
    "summary": "市内で新たに創業する方や創業後1年未満の中小企業者向けの低利融資。事前に西東京創業支援・経営革新相談センターでの経営診断が必要。",
    "eligibility": [
      "市内で新たに創業する方または創業後1年未満の中小企業者",
      "事前に経営診断を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "西東京市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年3月31日",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.nishitokyo.lg.jp/kurasi/sangyou/yushi_houkaisei/assen/sougyouyushiassen.html"
  },
  {
    "id": "ome-city-akiten-katsuyo-hojo",
    "name": "青梅市空き店舗活用事業補助金",
    "provider": "青梅市 商工業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "店舗改修費の2分の1以内・上限100万円",
    "summary": "空き店舗(空き工場・空き倉庫も対象)を活用して市内で新たに事業を始める創業者の店舗改修費を補助する。",
    "eligibility": [
      "空き店舗等を使って市内で新たに事業を始める創業者",
      "特定創業支援等事業を受け証明書の交付を受けていること",
      "大規模小売店舗・店舗内テナント・可動式店舗は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "青梅市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和9年2月26日まで(予算がなくなり次第終了)",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.ome.tokyo.jp/soshiki/35/59261.html"
  },
  {
    "id": "ome-city-sogyosha-oen-hojo",
    "name": "青梅市創業者応援事業補助金",
    "provider": "青梅市 商工業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "市内で新たに事業開始:20万円／創業を機に市内へ移住して事業開始:30万円",
    "summary": "市内で新たに事業を開始した人に交付する補助金。認定特定創業支援等事業の証明書の交付を受けていることが条件。",
    "eligibility": [
      "令和5年4月1日以降に市内で事業を開始した人",
      "認定特定創業支援等事業を受け証明書の交付を受けていること",
      "過去にこの補助金を受けていないこと"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "青梅市"
    ],
    "stages": [
      "early"
    ],
    "period": "令和9年2月26日まで(予算がなくなり次第終了)",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.ome.tokyo.jp/soshiki/35/37443.html"
  },
  {
    "id": "tachikawa-city-digital-gijutsu-katsuyo",
    "name": "デジタル技術活用支援事業補助金",
    "provider": "立川市 産業観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率4分の3、上限50万円（下限5万円）",
    "summary": "デジタル技術による業務効率化・生産性向上に取り組む市内中小事業者を補助。モバイルオーダーやキャッシュレス決済導入も例示。",
    "eligibility": [
      "市内の中小事業者"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "立川市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tachikawa.lg.jp/sangyo/shokogyo/1020506/1027390.html"
  },
  {
    "id": "tachikawa-city-jigyo-shokei-shikin",
    "name": "立川市 事業承継支援資金（利子補給）",
    "provider": "立川市 産業観光課",
    "level": "municipality",
    "type": "融資",
    "cat": "事業承継",
    "amount": "限度額2,000万円・7年以内。表面金利2.250%のうち1.825%を市が負担（実質0.425%）",
    "summary": "事業承継を予定し事業計画に取り組む方向けの融資あっせんで、利子の一部を市が補助。",
    "eligibility": [
      "5年以内に事業承継を行う見込みで事業計画を策定・実行する方"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "立川市"
    ],
    "stages": [
      "established"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tachikawa.lg.jp/sangyo/shokogyo/1003811/1003848/1003857.html"
  },
  {
    "id": "tachikawa-city-sanpin-hanro-kakudai",
    "name": "立川産品販路拡大等支援事業補助金",
    "provider": "立川市 産業文化スポーツ部 産業観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率2分の1、上限30万円",
    "summary": "立川産品の販路拡大に取り組む市内中小企業の展示会出展や知的財産権取得等の経費を補助。先着順。",
    "eligibility": [
      "立川産品の販路拡大に取り組む市内中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "立川市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "申請受付中（予算の範囲内・先着順、令和8年度分の期限は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tachikawa.lg.jp/sangyo/shokogyo/1003807/1003823.html"
  },
  {
    "id": "tachikawa-city-shoene-kaishu-hojo",
    "name": "中小企業二酸化炭素排出量削減事業施設改修費補助金（令和8年度）",
    "provider": "立川市 環境政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "改修費の3分の1以内、上限50万円（令和8年度予算300万円）",
    "summary": "省エネ診断を受けた中小企業の設備改修費を補助。予算に達し次第終了。",
    "eligibility": [
      "市の省エネルギー診断を受診した中小企業",
      "環境政策課との事前協議"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "立川市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度（予算300万円に達し次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tachikawa.lg.jp/kurashi/seikatsu/1001871/1021661.html"
  },
  {
    "id": "tachikawa-city-sogyo-shikin-yushi",
    "name": "立川市 創業資金融資あっせん（創業資金A・B・S）",
    "provider": "立川市 産業観光課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "要確認（市が利子の一部を補助。2026年6月1日申請分から一部利率変更）",
    "summary": "創業資金A・B・Sの3種。Bは女性・若年者・シニア、Sは特定創業支援等事業の認定創業者向けで優遇。",
    "eligibility": [
      "創業予定または創業間もない方"
    ],
    "industries": "all",
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "立川市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tachikawa.lg.jp/sangyo/shokogyo/1003810/1003840.html"
  },
  {
    "id": "kanagawa-fukugyo-jinzai",
    "name": "神奈川県副業・兼業人材活用補助金",
    "provider": "神奈川県・神奈川産業振興センター",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "上限50万円（補助率は要確認）",
    "summary": "副業・兼業人材を活用する中小企業の費用を補助する。",
    "eligibility": [
      "県内中小企業者",
      "詳細は公募ページで要確認"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.kipc.or.jp/business-support/productivity/prohojyo/"
  },
  {
    "id": "kanagawa-jigyoshokei",
    "name": "神奈川県事業承継補助金（令和8年度）",
    "provider": "神奈川県 産業労働局",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "親族承継は株価算定支援20万円、第三者承継は上限100万円。補助率は原則1/2以内（小規模事業者は2/3以内）",
    "summary": "事業承継に伴う株価算定、企業価値算定、デューデリジェンス等の費用を補助する。",
    "eligibility": [
      "県内中小企業者等",
      "親族承継枠または第三者承継枠に該当すること"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年4月1日〜令和9年1月29日（予算上限に達し次第終了）",
    "deadline": "2027-01-29",
    "priority": 6,
    "url": "https://www.pref.kanagawa.jp/docs/jf2/r8_shoukei.html"
  },
  {
    "id": "kanagawa-shokibo-digital",
    "name": "小規模事業者デジタル化支援推進事業費補助金（令和8年度）",
    "provider": "神奈川県 産業労働局",
    "level": "prefecture",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認",
    "summary": "小規模事業者のデジタル化の取組を支援する。",
    "eligibility": [
      "県内の小規模事業者",
      "詳細要件は県ページで要確認"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月15日〜9月30日（先着順。受付終了の可能性あり、最新は要確認）",
    "deadline": "2026-09-30",
    "priority": 6,
    "url": "https://www.pref.kanagawa.jp/docs/m2w/shokibo_digital/r8.html"
  },
  {
    "id": "kanagawa-sogyo-shien-yushi",
    "name": "創業支援融資（神奈川県中小企業制度融資）",
    "provider": "神奈川県 産業労働局・神奈川県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額3,500万円・年2.0%以内（創業特例は年1.8%以内）・創業特例は信用保証料0%",
    "summary": "創業予定者や創業間もない事業者向けの制度融資。創業特例では経営指導を受けると優遇される。",
    "eligibility": [
      "これから創業する個人または創業間もない事業者",
      "創業特例は創業支援機関の経営指導を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新条件は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kanagawa.jp/docs/m6c/cnt/f5782/p848390.html"
  },
  {
    "id": "kanagawa-sogyosha-seicho",
    "name": "生産性向上促進事業費補助金（創業者成長支援枠）",
    "provider": "神奈川県 産業労働局・神奈川産業振興センター",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率2/3以内・上限300万円（下限25万円）",
    "summary": "令和5年4月以降に創業した県内中小企業者等の生産性向上の取組を、伴走支援を受けながら支援する。",
    "eligibility": [
      "令和5年4月1日以降に創業した県内中小企業者等",
      "交付まで地域の支援機関の伴走支援を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年5月1日〜8月31日（受付終了）。次回は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://r8seisansei.pref.kanagawa.jp/about/founder.php"
  },
  {
    "id": "atsugi-city-akitenpo-shuten-shien",
    "name": "厚木市 中心市街地の空き店舗出店支援",
    "provider": "厚木市 商業観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "家賃1/2以内（月額5万円限度、12か月以内）、改装費1/2以内（50万円限度）",
    "summary": "本厚木駅周辺・愛甲石田駅周辺の空き店舗に出店する事業者の家賃と改装費を補助する。審査会は年4回開催予定。",
    "eligibility": [
      "対象エリアの空き店舗（空き3か月以上）を賃借して出店する中小企業者",
      "3年以上同一場所で継続し商店会に加入すること"
    ],
    "industries": [
      "food",
      "retail",
      "beauty",
      "creative"
    ],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "厚木市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "年4回の審査会（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.atsugi.kanagawa.jp/soshiki/shogyonigiwaika/8/1/404.html"
  },
  {
    "id": "atsugi-city-chusho-yushi-seido",
    "name": "厚木市中小企業融資制度",
    "provider": "厚木市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額5,000万円、利率は年1.70%以内など（令和8年4月1日現在、資金区分により異なる）",
    "summary": "市と特定金融機関が協調して行う融資制度。利用者は利子補給や信用保証料補助を受けられる。",
    "eligibility": [
      "市内で1年以上継続して事業を営む中小企業者",
      "個人は市内に1年以上住所を有すること"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "厚木市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.atsugi.kanagawa.jp/soshiki/sangyoshinkoka/9/10/171.html"
  },
  {
    "id": "atsugi-city-sdgs-suishin-hojokin",
    "name": "厚木市中小企業等SDGs推進事業補助金",
    "provider": "厚木市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助対象経費の2/3以内、上限200万円（産学共同は250万円）。掲載は令和7年度の内容",
    "summary": "SDGsに資する事業や設備投資を支援する補助金。",
    "eligibility": [
      "市内の中小企業等",
      "事業費100万円以上または設備投資50万円以上（税抜）"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "厚木市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（ページ記載は令和7年度）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.atsugi.kanagawa.jp/soshiki/sangyoshinkoka/9/2/37030.html"
  },
  {
    "id": "atsugi-city-seisansei-chinage-oen",
    "name": "厚木市生産性向上・賃上げ応援補助金",
    "provider": "厚木市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "国の業務改善助成金の補助対象経費の1/10以内、上限60万円",
    "summary": "国の業務改善助成金の交付決定を受けた市内事業者に、市が上乗せで補助する。",
    "eligibility": [
      "国の業務改善助成金の交付額決定を受けた事業者",
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "厚木市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.atsugi.kanagawa.jp/soshiki/sangyoshinkoka/8/2/41392.html"
  },
  {
    "id": "atsugi-city-setsubi-toshi-sokushin",
    "name": "厚木市中小企業設備投資促進事業補助金",
    "provider": "厚木市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "中小企業者1/2以内、小規模企業者2/3以内。上限は製造業200万円、製造業以外100万円",
    "summary": "市内事業者の設備投資を支援する補助金。令和8年度の要領（5月1日第2版）が公開されている。",
    "eligibility": [
      "市内で5年以上継続して事業を営む中小企業者",
      "設備投資を行う事業"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "厚木市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度要領あり（受付状況は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.atsugi.kanagawa.jp/soshiki/sangyoshinkoka/9/2/2146.html"
  },
  {
    "id": "atsugi-city-shinyo-hoshoryo-hojo",
    "name": "厚木市中小企業信用保証料補助制度",
    "provider": "厚木市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "支払った保証料の50%、上限20万円（同一年度1回まで）",
    "summary": "市の融資制度や県の創業支援融資を利用した際の信用保証料を補助する。利子補給制度もある。",
    "eligibility": [
      "市融資制度または県の創業支援融資の利用者",
      "信用保証協会の保証を受けた事業者"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "厚木市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.atsugi.kanagawa.jp/soshiki/sangyoshinkoka/9/10/372.html"
  },
  {
    "id": "chigasaki-city-chusho-yushi-seido",
    "name": "茅ヶ崎市中小企業融資制度",
    "provider": "茅ヶ崎市 産業観光課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "市が市内金融機関と協調して実施する中小企業向けの制度融資（振興資金、経営安定特別資金、小口資金など）。",
    "eligibility": [
      "市内で事業を営む中小企業者",
      "金融機関・信用保証協会の審査を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "茅ヶ崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.chigasaki.kanagawa.jp/sangyo/1043263/1007069.html"
  },
  {
    "id": "chigasaki-city-hanro-kaitaku-hojokin",
    "name": "茅ヶ崎市販路開拓等事業補助金",
    "provider": "茅ヶ崎市 産業観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "出展小間料等の1/3、上限は国内5万円・国外10万円",
    "summary": "市内中小企業者が国内外の展示会に出展する経費の一部を補助する。年度1回まで、先着順。",
    "eligibility": [
      "市内の中小企業者",
      "展示会に出展する事業"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "茅ヶ崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度分は予算到達により受付終了（来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.chigasaki.kanagawa.jp/sangyo/1043316/1023378.html"
  },
  {
    "id": "chigasaki-city-tokutei-sogyo-shien",
    "name": "茅ヶ崎市 特定創業支援等事業（創業相談・証明書発行）",
    "provider": "茅ヶ崎市 産業観光課",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "無料の相談・支援（証明書で登録免許税軽減や県創業融資の優遇が受けられる）",
    "summary": "市が連携機関と実施する創業支援を受けると証明書が発行され、県の創業支援融資の利率優遇などを受けられる。令和8年度はワンストップ相談窓口あり。",
    "eligibility": [
      "市内で創業予定または創業後5年以内の方",
      "特定創業支援等事業の所定の支援を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "茅ヶ崎市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.chigasaki.kanagawa.jp/sangyo/1043323/1010274.html"
  },
  {
    "id": "chigasaki-city-yushi-shikin-hojo",
    "name": "茅ヶ崎市中小企業融資資金補助制度（利子補給・信用保証料補助）",
    "provider": "茅ヶ崎市 産業観光課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "信用保証料の補助は上限25万円。利子補給は市融資の振興資金（設備）等が対象（率は要確認）",
    "summary": "市の中小企業融資制度や県の創業支援融資などを利用した場合に、利子や信用保証料の一部を補助する。",
    "eligibility": [
      "市の中小企業融資制度または県制度融資（小規模クイック融資・創業支援融資等）の利用者",
      "神奈川県信用保証協会の保証を受けた方"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "茅ヶ崎市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.chigasaki.kanagawa.jp/sangyo/1043263/1007072.html"
  },
  {
    "id": "ebina-city-chusho-shinko-shien",
    "name": "海老名市中小企業振興支援事業",
    "provider": "海老名市 経済環境部 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "展示会出展1/2（上限30万円）、HP制作1/2（上限15万円）、BCP策定1/2（上限10万円）、研修受講1/2（上限5万円）、求人広告1/2（上限10万円）、設備導入10〜50万円など",
    "summary": "中小企業者の展示会出展・ホームページ制作・BCP策定・人材育成・設備導入などの費用の一部を補助する10メニューの制度。令和8年度は4月1日から先着順。",
    "eligibility": [
      "海老名市内の中小企業者",
      "メニューごとの要件を満たすこと"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "海老名市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日から先着順（予算上限に達し次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ebina.kanagawa.jp/guide/shoko/chusho/1003742.html"
  },
  {
    "id": "ebina-city-chusho-yushi-sogyo",
    "name": "海老名市中小企業事業資金融資（創業等資金）",
    "provider": "海老名市 商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "貸付限度額1,000万円以内、利率1.0%、期間60月以内（据置6月以内含む）",
    "summary": "営業実績1年未満の中小企業者・小規模企業者や市内での創業予定者向けの市の制度融資。",
    "eligibility": [
      "市内で営業実績1年未満、または市内で創業予定の中小企業者・小規模企業者"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "海老名市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度制度",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ebina.kanagawa.jp/guide/shoko/chusho/1003740.html"
  },
  {
    "id": "ebina-city-office-kyoten-shien",
    "name": "海老名市オフィス拠点形成支援事業",
    "provider": "海老名市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "費用の1/2（限度額200万円。見出しは最大300万円の記載で要確認）",
    "summary": "市内に新たにオフィスを構える法人の費用を補助する。従業員増加や5年間の継続入居などが要件。",
    "eligibility": [
      "市内に新たにオフィスを構える法人",
      "従業員数の増加、5年間の継続入居など"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "海老名市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ebina.kanagawa.jp/guide/shoko/sougyo/1013652.html"
  },
  {
    "id": "ebina-city-shinyo-hoshoryo-hojo",
    "name": "海老名市信用保証料補助制度",
    "provider": "海老名市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "保証料の全額（限度額10万円）",
    "summary": "市の融資制度を利用した際に神奈川県信用保証協会へ支払った保証料を補助する。",
    "eligibility": [
      "海老名市中小企業事業資金融資を利用した事業者"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "海老名市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度制度",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ebina.kanagawa.jp/guide/shoko/chusho/1003740.html"
  },
  {
    "id": "ebina-city-sogyo-shien-joseikin",
    "name": "海老名商工会議所 創業支援助成金（海老名市の創業支援）",
    "provider": "海老名商工会議所（海老名市 商工課案内）",
    "level": "municipality",
    "type": "助成金",
    "cat": "創業・起業",
    "amount": "創業時の内外装工事費等に最大50万円（対象経費20万円以上の部分の1/2）",
    "summary": "市内で創業する人の内外装工事費等を助成する。市内の会社設立では登録免許税の軽減も受けられる。",
    "eligibility": [
      "海老名市内で創業する人",
      "対象経費が20万円以上であること"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "海老名市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ebina.kanagawa.jp/guide/shoko/sougyo/1003750.html"
  },
  {
    "id": "fujisawa-city-community-business",
    "name": "藤沢市コミュニティビジネス支援補助金",
    "provider": "藤沢市 産業労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "対象事業費の40％以内（女性・シニア世代は45％以内）、予算の範囲内",
    "summary": "空き店舗などの賃借料と改装工事費の一部を補助する。",
    "eligibility": [
      "市内でコミュニティビジネスを行う（行う予定の）事業者",
      "要件の詳細は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "藤沢市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fujisawa.kanagawa.jp/indus1/shigoto/shokogyo/sogyo/communitybusiness.html"
  },
  {
    "id": "fujisawa-city-tokutei-sogyo",
    "name": "藤沢市 特定創業支援等事業（創業スタートアップ支援）",
    "provider": "藤沢市 産業労働課",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "要確認（支援は無料または要確認）",
    "summary": "創業セミナー・相談など1か月以上・4回以上の継続支援を受け、証明書で登録免許税軽減や融資の金利優遇等を受けられる。",
    "eligibility": [
      "市内で創業予定または創業後間もない方"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "藤沢市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fujisawa.kanagawa.jp/indus1/shigoto/shokogyo/sogyo/tokuteisogyo.html"
  },
  {
    "id": "fujisawa-city-yushi-hoshoryo-riko",
    "name": "藤沢市制度融資 信用保証料補助・利子補給",
    "provider": "藤沢市 産業労働課（融資窓口：湘南産業振興財団）",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "保証料の90％（上限20万円）補助。利子補給は年2.2％以内（2年間、女性・若者・シニア起業家は3年間）",
    "summary": "創業支援融資・キュンとするスタートアップ等の市制度融資の利用者へ、保証料補助と利子補給を行う。",
    "eligibility": [
      "市制度融資（創業支援資金等）の利用者",
      "対象要件の確認が必要（要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "藤沢市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度分は藤沢市公式ページで確認（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fujisawa.kanagawa.jp/indus1/shigoto/shokogyo/yushi/chusho.html"
  },
  {
    "id": "hadano-city-akiten-katsuyo-hojo",
    "name": "空き店舗活用事業補助金制度",
    "provider": "秦野市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費:補助率30%・上限50万円／賃借料(2年間):補助率30%・上限72万円／広告宣伝費:補助率50%・上限15万円",
    "summary": "市内の商店街区域内の空き店舗を活用して開業した人に、改装費・賃借料・広告宣伝費の一部を補助する制度。審査会の審査を経て決定される。",
    "eligibility": [
      "商店街区域内の空き店舗で開業した人",
      "開業後1か月以上4か月以内に申請すること",
      "市税等を完納していること"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "秦野市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は審査会が年3回。第3回(令和9年2月審査会)の申込締切は令和9年1月8日",
    "deadline": "2027-01-08",
    "priority": 8,
    "url": "https://www.city.hadano.kanagawa.jp/soshiki/7/1049/4/2/2/2367.html"
  },
  {
    "id": "hadano-city-sogyo-shien",
    "name": "市内で創業を目指す方等への支援(特定創業支援等事業)",
    "provider": "秦野市 産業振興課・秦野商工会議所",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "創業セミナー等を4回以上受講して特定創業支援等事業の証明書を得ると、県制度融資の創業特例や市の利子・保証料補助などが利用できる。",
    "eligibility": [
      "市内での創業を目指す人または創業間もない人",
      "特定創業支援等事業(4回以上・1か月以上)を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "秦野市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認(令和8年度の創業支援セミナーは受付終了と案内あり)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hadano.kanagawa.jp/soshiki/7/1049/4/1/2/2496.html"
  },
  {
    "id": "hadano-city-yushi-joseisei-do",
    "name": "秦野市 各種融資・助成制度(創業支援資金・利子補給等)",
    "provider": "秦野市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業支援資金は限度額1,000万円(設備・運転資金)。利子補給等の補給率は要確認",
    "summary": "中小企業向けの市融資あっせんと利子補給・信用保証料補助の制度。創業支援資金や脱炭素設備等導入促進資金などがある。",
    "eligibility": [
      "市内で事業を営む中小企業者または創業予定・開業後5年未満の人",
      "金融機関・信用保証協会の審査を経ること"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "秦野市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年(利子補給の申請時期は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hadano.kanagawa.jp/www/contents/1001000001176/index.html"
  },
  {
    "id": "hiratsuka-city-akitenpo-kaisou",
    "name": "平塚市中心市街地活性化事業（空き店舗対策・改装費補助）",
    "provider": "平塚市 産業振興課（事務局：平塚商工会議所）",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費の2/3以内、原則上限50万円（重点エリア100万円）、賃借料補助あり",
    "summary": "中心市街地の1階空き店舗への出店に伴う賃借料と改装費を補助する。",
    "eligibility": [
      "対象エリアの1階空き店舗に出店する事業者"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "平塚市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "予算の範囲内で受付（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hiratsuka.kanagawa.jp/sangyo/page-c_01110.html"
  },
  {
    "id": "hiratsuka-city-chinage-shoreikin",
    "name": "平塚市中小企業等賃上げ応援奨励金",
    "provider": "平塚市 産業振興課",
    "level": "municipality",
    "type": "給付金",
    "cat": "人材・雇用",
    "amount": "奨励金10万円〜30万円",
    "summary": "賃上げに取り組む中小企業等に奨励金を交付する。",
    "eligibility": [
      "市内の中小企業者等",
      "賃上げの実施（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "平塚市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和9年1月31日まで（予算に達し次第終了）",
    "deadline": "2027-01-31",
    "priority": 8,
    "url": "https://www.city.hiratsuka.kanagawa.jp/sangyo/page33_00136.html"
  },
  {
    "id": "hiratsuka-city-datsutanso-setsubi",
    "name": "平塚市脱炭素設備投資促進補助金",
    "provider": "平塚市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "省エネ設備：30万円以上300万円未満の経費の1/5、上限50万円",
    "summary": "CO2排出量を年間2％以上削減する設備等の導入費を補助する。",
    "eligibility": [
      "市内の事業者",
      "本体価格30万円（税抜）以上の設備"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "平塚市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hiratsuka.kanagawa.jp/sangyo/page33_00104.html"
  },
  {
    "id": "hiratsuka-city-dx-hojo",
    "name": "平塚市中小企業等DX支援補助金",
    "provider": "平塚市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認",
    "summary": "中小企業等のDX（デジタル化）に取り組む費用を補助する。",
    "eligibility": [
      "市内の中小企業者等（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "平塚市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜令和9年2月28日",
    "deadline": "2027-02-28",
    "priority": 8,
    "url": "https://www.city.hiratsuka.kanagawa.jp/sangyo/page33_00096.html"
  },
  {
    "id": "hiratsuka-city-shin-sogyo-shien",
    "name": "平塚市 新創業支援資金（利子・保証料全額補助）",
    "provider": "平塚市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "融資時の信用保証料と利子を全額市が補助（限度額・利率は制度表で要確認）",
    "summary": "創業予定者と創業後5年未満の方向けの市制度融資で、保証料と利子を市が全額補助する。",
    "eligibility": [
      "創業予定者または創業後5年未満",
      "特定創業支援等事業の証明が条件となる場合あり"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "平塚市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hiratsuka.kanagawa.jp/kigyo/page-c_01622.html"
  },
  {
    "id": "kamakura-city-chusho-yushi-sogyo",
    "name": "鎌倉市中小企業融資制度（創業資金）",
    "provider": "鎌倉市 経済部 産業課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業資金は限度額1,000万円・返済10年以内・利率2.0%以内",
    "summary": "市と取扱金融機関が連携する低利融資制度。創業資金は創業計画のある方や開業1年未満の事業者が対象で、神奈川県信用保証協会の保証が必要。",
    "eligibility": [
      "具体的な創業計画がある、または開業1年未満",
      "神奈川県信用保証協会の保証を受けられる",
      "市内で事業を営む（予定を含む）"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "鎌倉市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kamakura.kanagawa.jp/shoukou/sien/yuusi.html"
  },
  {
    "id": "kamakura-city-genki-up-sogyo",
    "name": "鎌倉市商工業元気アップ事業（創業部門・事業定着部門）",
    "provider": "鎌倉市 経済部 産業課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象事業費の80%（各部門上限100万円）",
    "summary": "創業予定者や開業1年未満の中小企業者の事業をプレゼン審査で選考し補助する。専門家による支援も付く。",
    "eligibility": [
      "市内で新たに創業する方または開業日から1年未満の中小企業者",
      "プレゼンテーション審査を受けること",
      "人件費・飲食費・不動産取得費などは対象外"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "鎌倉市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度の募集は終了（提出期限は令和8年6月12日）。次回は要確認",
    "deadline": "2026-06-12",
    "priority": 8,
    "url": "https://www.city.kamakura.kanagawa.jp/shoukou/sien/genkiup26.html"
  },
  {
    "id": "kamakura-city-keiei-kiban-kyoka",
    "name": "鎌倉市中小企業経営基盤強化事業費補助金",
    "provider": "鎌倉市 経済部 産業課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "事業により1/2以内（上限30万円）または1/3以内（上限15万円）",
    "summary": "産業財産権取得、展示会等出展、BCP策定、キャッシュレス・POS導入、HP更新やWEB広告などの広報事業に要する経費を補助する。",
    "eligibility": [
      "鎌倉市内の中小企業者",
      "補助対象は市内事業所にかかる経費のみ",
      "事業の種類ごとに補助率・上限が異なる"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "鎌倉市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜令和9年2月26日",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.kamakura.kanagawa.jp/shoukou/keieikiban.html"
  },
  {
    "id": "kamakura-city-kigyo-ritchi-seibihi",
    "name": "鎌倉市企業立地整備費等補助金",
    "provider": "鎌倉市 経済部 産業課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "リフォーム費は50%以内（上限300万円、100㎡未満は150万円）、賃料は50%以内（月25万円上限・最大6か月）。どちらか一方を選択",
    "summary": "市内に事業所・サテライトオフィス・シェアオフィスを新規開設する際の改装費または賃料を補助する。",
    "eligibility": [
      "市内に事業所がない事業者、または市内事業者で従業員を3名以上増員して新拠点を整備する場合",
      "事業計画で3年以上の事業継続を示せること",
      "企業立地等促進条例の税軽減措置を受けない事業者"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "鎌倉市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜令和9年2月26日（予算がなくなり次第終了）",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.kamakura.kanagawa.jp/shoukou/sien/office.html"
  },
  {
    "id": "kamakura-city-sogyo-seminar",
    "name": "鎌倉市 創業応援特別セミナー（特定創業支援事業）",
    "provider": "鎌倉市 産業課・鎌倉商工会議所",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "無料",
    "summary": "鎌倉商工会議所と湘南信用金庫が行う全4回の創業セミナー。所定の回数を受講すると、小規模事業者持続化補助金の創業枠の上限引き上げなどの優遇を受けられる。",
    "eligibility": [
      "創業予定の方または創業間もない方",
      "所定の回数の受講が必要"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "鎌倉市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年10月8日〜10月29日（18時〜20時、全4回）",
    "deadline": "2026-10-29",
    "priority": 8,
    "url": "https://www.city.kamakura.kanagawa.jp/shoukou/sien/sougyou-shien2020.html"
  },
  {
    "id": "odawara-city-akitenpo-riyo",
    "name": "小田原市空き店舗等利活用促進事業費補助金（出店者向け）",
    "provider": "小田原市 商業振興担当",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "出店者：開業時の広告宣伝費の1/2・上限10万円（物件所有者は改修費2/3・上限100万円）",
    "summary": "空き店舗への出店者の広告宣伝費等を補助する。",
    "eligibility": [
      "空き店舗に出店する事業者"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "小田原市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度分は受付終了。次年度は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.odawara.kanagawa.jp/field/industry/commerce/p27668.html"
  },
  {
    "id": "odawara-city-hanro-kaitaku",
    "name": "小田原市中小企業等販路開拓事業補助金",
    "provider": "小田原市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2、上限：海外30万円・県外20万円・県内およびオンライン10万円",
    "summary": "展示会・商談会・見本市への出展経費の一部を助成する。",
    "eligibility": [
      "市内に事業所を持つ中小企業・個人事業者",
      "市税を滞納していないこと"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "小田原市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.odawara.kanagawa.jp/field/industry/jibasan/hanrokaitakujigyohojokin.html"
  },
  {
    "id": "odawara-city-sogyo-risihokyu",
    "name": "小田原市創業融資利子補給金",
    "provider": "小田原市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "年間10万円上限、利子支払の3年以内",
    "summary": "神奈川県創業支援融資（創業特例）を利用する創業者の利子負担を補助する。",
    "eligibility": [
      "市内で創業する（した）方",
      "神奈川県創業支援融資（創業特例）を利用"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "小田原市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.odawara.kanagawa.jp/field/industry/industrial_promotion/sougyou.html"
  },
  {
    "id": "yamato-city-chusho-yushi-kigyo-shikin",
    "name": "大和市中小企業融資制度（起業支援資金・小規模企業事業資金ほか）",
    "provider": "大和市 産業活性課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "起業支援資金は上限2,000万円・10年・年2.0%以内、小規模企業事業資金は上限3,000万円・年2.2%以内（令和8年4月1日現在）",
    "summary": "市が金融機関に資金を預託して行う間接融資。起業前や創業5年以内の事業者向けの起業支援資金がある。信用保証の利用が必須。",
    "eligibility": [
      "起業前の個人、または市内で事業開始から5年以内の事業者（起業支援資金）",
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "大和市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yamato.lg.jp/gyosei/soshik/40/sangyo/kigyoushien/hojokintou/4242.html"
  },
  {
    "id": "yamato-city-miryoku-ten-shien",
    "name": "大和市魅力ある個店支援事業",
    "provider": "大和市 産業活性課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2、上限50万円",
    "summary": "個店の魅力向上に向けた取組を支援する補助金。",
    "eligibility": [
      "市内で店舗を営む事業者"
    ],
    "industries": [
      "food",
      "retail",
      "beauty"
    ],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "大和市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度の募集は終了（来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yamato.lg.jp/gyosei/soshik/40/sangyo/shogyo/shien_seibi_todokede/23892.html"
  },
  {
    "id": "yamato-city-risihokyu-hoshoryo-hojo",
    "name": "大和市 融資の利子補給・信用保証料補助",
    "provider": "大和市 産業活性課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "保証料は50%以内（小規模企業事業資金は上限10万円）、利子補給は年間約定利子の30%以内・上限30万円・36か月（資金により異なる。要確認）",
    "summary": "市の融資制度を利用した事業者に、信用保証料補助と利子補給を行う。",
    "eligibility": [
      "大和市中小企業融資制度の利用者"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "大和市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yamato.lg.jp/gyosei/soshik/40/sangyo/kigyoushien/hojokintou/4242.html"
  },
  {
    "id": "yamato-city-shinki-shuten-shien",
    "name": "大和市新規出店支援事業",
    "provider": "大和市 産業活性課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "対象経費の1/2または100万円の少ない方",
    "summary": "商店街などの空き店舗を活用して出店する事業者の出店経費の一部を助成する。",
    "eligibility": [
      "市内商店街などの空き店舗で新たに出店する事業者"
    ],
    "industries": [
      "food",
      "retail",
      "beauty"
    ],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "大和市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は募集終了（来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yamato.lg.jp/gyosei/soshik/40/sangyo/shogyo/shien_seibi_todokede/23950.html"
  },
  {
    "id": "yokosuka-city-chusho-hosyoryo-hojo",
    "name": "横須賀市中小企業制度融資（信用保証料補助）",
    "provider": "横須賀市 経済部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "保証料の50%、上限20万円",
    "summary": "市の制度融資で信用保証を受けた事業者の信用保証料の一部を補助。",
    "eligibility": [
      "市の中小企業制度融資で信用保証を受けた事業者"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "横須賀市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yokosuka.kanagawa.jp/4402/yuushi.html"
  },
  {
    "id": "yokosuka-city-jigyo-shokei-hiyo-hojo",
    "name": "横須賀市 事業承継費用補助金",
    "provider": "横須賀市 経済部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "補助率2分の1、上限50万円",
    "summary": "事業承継の初期診断、計画作成、M&A仲介委託契約等の費用を補助（売却側のみ）。",
    "eligibility": [
      "市内に本社を置く中小企業",
      "自社の事業承継・M&A（売却側）を実施予定"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "横須賀市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yokosuka.kanagawa.jp/4402/shoukou/cyusyo/jigyou_shoukei.html"
  },
  {
    "id": "yokosuka-city-saiyoryoku-koujo-hojo",
    "name": "横須賀市 中小企業等採用力向上補助金",
    "provider": "横須賀市 経済部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率2分の1、上限10万円",
    "summary": "採用用ホームページの作成・改修や採用促進動画の作成費用を補助。",
    "eligibility": [
      "過去3年以内に市主催の合同面接会等に参加、または市の求人サイトに登録",
      "市税の滞納がない"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "横須賀市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度（実績報告期限は令和9年3月1日）",
    "deadline": "2027-03-01",
    "priority": 8,
    "url": "https://www.city.yokosuka.kanagawa.jp/4402/sangyoshinko/saiyouryokukouzyou.html"
  },
  {
    "id": "yokosuka-city-shinai-sogyosha-rishi-hokyu",
    "name": "横須賀市 市内創業者支援利子補給金",
    "provider": "横須賀市 経済部 創業・新産業支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "利子1年分、上限15万円",
    "summary": "創業資金の融資を受けて市内で開業した方の利子を補助。",
    "eligibility": [
      "創業資金の融資を受けて市内で開業した方",
      "開業日が令和6年4月1日〜令和8年3月31日"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "横須賀市"
    ],
    "stages": [
      "early"
    ],
    "period": "対象開業日は令和8年3月31日まで（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yokosuka.kanagawa.jp/4430/sougyou/0001.html"
  },
  {
    "id": "yokosuka-city-shoene-seisansei-hojo",
    "name": "令和8年度中小企業等省エネ化・生産性向上補助金",
    "provider": "横須賀市 経済部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率2分の1（小規模事業者は3分の2）",
    "summary": "省エネ・生産性向上のための設備導入費用を補助。設備の購入前に申請が必要。",
    "eligibility": [
      "市内の中小企業等",
      "購入前に申請すること"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "横須賀市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年6月8日〜令和9年2月1日",
    "deadline": "2027-02-01",
    "priority": 8,
    "url": "https://www.city.yokosuka.kanagawa.jp/4402/hojokin/syoene-seisan.html"
  },
  {
    "id": "yokosuka-city-shokibo-ict-shien",
    "name": "横須賀市 小規模事業者ICT支援補助金",
    "provider": "横須賀市 経済部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率4分の3、上限30万円",
    "summary": "業務効率化のためのICT導入費用を補助。",
    "eligibility": [
      "市内の小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "横須賀市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yokosuka.kanagawa.jp/4402/sangyoshinko/shokibojigyosha_ict_shien.html"
  },
  {
    "id": "niigata-kaseguchikara",
    "name": "にいがた稼ぐ力強化支援事業補助金",
    "provider": "新潟県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率2/3・上限2,500万円（100億宣言枠）／1,500万円（一般枠）",
    "summary": "持続的な賃上げに向けた設備投資や商品開発等の取組を支援する。",
    "eligibility": [
      "売上高100億円未満の県内中小企業者",
      "パートナーシップ構築宣言の登録など"
    ],
    "industries": "all",
    "prefectures": [
      "新潟県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "第2回 令和8年8月19日〜9月25日（受付終了）。次回は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.niigata.lg.jp/site/sangyorodo/kaseguchikara-bosyu.html"
  },
  {
    "id": "niigata-kigyo-renkei",
    "name": "企業連携プロジェクト創出事業",
    "provider": "新潟県 地域振興局",
    "level": "prefecture",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2以内・上限100万円/件",
    "summary": "地場産業の企業グループによる販路開拓等の連携プロジェクトを支援する。",
    "eligibility": [
      "中小企業者4者以上のグループ"
    ],
    "industries": [
      "manufacturing",
      "food",
      "retail"
    ],
    "prefectures": [
      "新潟県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度事業提案募集（期間は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.niigata.lg.jp/site/chiikishinko/r8-kigyorenkeiproject.html"
  },
  {
    "id": "niigata-shoene-setsubi",
    "name": "県内中小企業等省エネルギー設備導入支援",
    "provider": "新潟県",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "省エネルギー設備の導入を支援する。",
    "eligibility": [
      "県内中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "新潟県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年4月14日〜6月26日（受付終了）。次回は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.niigata.lg.jp/site/chiikishinko/e-support.html"
  },
  {
    "id": "niigata-sogyo-shien-shikin",
    "name": "中小企業創業等支援資金（制度融資）",
    "provider": "新潟県 産業労働部・新潟県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業枠は限度額3,500万円（2,000万円超は自己資金と同額が上限）。第二創業枠1億円、再チャレンジ枠2,000万円",
    "summary": "創業者や第二創業、再チャレンジ向けの県制度融資。",
    "eligibility": [
      "創業予定者または創業後5年未満の方",
      "第二創業・再チャレンジ枠あり"
    ],
    "industries": "all",
    "prefectures": [
      "新潟県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（利率等は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.niigata.lg.jp/sec/chiikishinko/1196093793010.html"
  },
  {
    "id": "joetsu-city-bukka-rishihokyu",
    "name": "上越市物価高騰等対策特別融資 利子補給",
    "provider": "上越市 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "補助率1.0%（2年分）、補助対象額は1事業者1,000万円まで",
    "summary": "新潟県セーフティネット資金（経営支援枠）物価高騰等対策特別融資を利用した市内中小企業者に、借入利子の一部を融資実行後に一括で補助する。",
    "eligibility": [
      "市内に事業所を有する中小企業者等",
      "令和8年4月1日〜令和9年3月31日に対象融資を実行したこと",
      "市税の滞納がなく事業を継続していること"
    ],
    "industries": "all",
    "prefectures": [
      "新潟県"
    ],
    "cities": [
      "上越市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度融資実行分（申請期限は令和9年3月31日）",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.joetsu.niigata.jp/soshiki/sangyou/kinyuushien.html"
  },
  {
    "id": "joetsu-city-shuekiryoku-seisansei",
    "name": "上越市収益力・生産性向上推進補助金",
    "provider": "上越市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "通常枠 補助率1/2・上限50万円、特別枠 補助率2/3・上限75万円",
    "summary": "収益力・生産性向上に向けた取組み（設備導入、広告宣伝、展示会出展など）の経費の一部を補助する。国の重点支援地方交付金を活用。",
    "eligibility": [
      "市内の中小企業者等",
      "持続的な賃上げに向けた環境整備に努める意向があること",
      "1事業者につき当年度1回限り"
    ],
    "industries": "all",
    "prefectures": [
      "新潟県"
    ],
    "cities": [
      "上越市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（市ページで募集状況を確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.joetsu.niigata.jp/soshiki/sangyou/syuekiryoku-seisansei.html"
  },
  {
    "id": "joetsu-city-sogyo-rishihokyu",
    "name": "上越市創業支援利子補給補助金",
    "provider": "上越市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "最大7年分の利子相当額を前渡し（一般枠は借入500万円まで、特定創業支援等事業修了者枠は1,000万円まで）",
    "summary": "創業・第二創業に必要な資金を借り入れた中小企業者に、利子相当額を補助する。融資実行前の申請が必要。",
    "eligibility": [
      "市内で創業または第二創業する中小企業者",
      "金融機関から創業資金を借り入れること",
      "融資実行前に申請すること"
    ],
    "industries": "all",
    "prefectures": [
      "新潟県"
    ],
    "cities": [
      "上越市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日から予算額に達するまで",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.joetsu.niigata.jp/soshiki/sangyou/sougyoushien.html"
  },
  {
    "id": "joetsu-city-startup-shien-hojo",
    "name": "上越市創業スタートアップ支援補助金",
    "provider": "上越市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "市内での創業を支援する補助金。詳細は市の公式ページで案内されている。",
    "eligibility": [
      "市内で創業する者（詳細要件は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "新潟県"
    ],
    "cities": [
      "上越市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.joetsu.niigata.jp/soshiki/sangyou/startup-support.html"
  },
  {
    "id": "nagaoka-city-gakusei-kigyoka",
    "name": "長岡市学生起業家育成補助金",
    "provider": "長岡市 産業イノベーション課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "経費の4/5以内（上限：法人30万円、個人事業主20万円）",
    "summary": "長岡で起業を考える学生等の創業を支援する補助金。令和8年度は4月1日から12月25日まで募集（予算に達し次第終了）。",
    "eligibility": [
      "長岡で起業を考える学生等",
      "法人または個人事業主として創業すること",
      "詳細な要件は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "新潟県"
    ],
    "cities": [
      "長岡市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜12月25日（予算に達し次第終了）",
    "deadline": "2026-12-25",
    "priority": 8,
    "url": "https://www.city.nagaoka.niigata.jp/sangyou/cate12/start-up.html"
  },
  {
    "id": "nagaoka-city-hanro-expert",
    "name": "長岡市販路開拓エキスパート活用促進補助金",
    "provider": "長岡市 産業イノベーション課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助対象経費の1/2以内（上限25万円）",
    "summary": "コンサルティング、市場調査、ネット広告、パッケージデザイン開発や国内展示会・見本市への出展費用を補助。",
    "eligibility": [
      "市内に事業所を有する中小企業者等",
      "備品購入費やガソリン代・駐車場代は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "新潟県"
    ],
    "cities": [
      "長岡市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nagaoka.niigata.jp/sangyou/cate01/subsidy/market.html"
  },
  {
    "id": "nagaoka-city-innovation-digital",
    "name": "長岡市イノベーション加速化補助金（デジタル技術活用事業）",
    "provider": "長岡市 産業イノベーション課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/2（上限200万円）",
    "summary": "事業者のデジタル技術活用による生産性向上・新事業の取組を支援。令和8年度は事前相談5月22日、交付申請5月29日まで。",
    "eligibility": [
      "市内の中小企業者等（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "新潟県"
    ],
    "cities": [
      "長岡市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度分は受付終了の見込み（事前相談5/22・申請5/29まで）。来年度は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nagaoka.niigata.jp/sangyou/cate01/subsidy/digital.html"
  },
  {
    "id": "nagaoka-city-seidoyushi-hoshoryo",
    "name": "長岡市制度融資活用サポート補助金（信用保証料補助）",
    "provider": "長岡市 産業イノベーション課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "令和8年度に限り信用保証料の全額相当分を補助（要確認）",
    "summary": "長岡市の制度融資（地方創生特別融資起業創業貸付など）の信用保証料を補助する制度。令和8年4月1日以降の新規融資分から保証料補助率が50%に変更。",
    "eligibility": [
      "長岡市制度融資を利用する中小企業者",
      "対象融資の詳細は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "新潟県"
    ],
    "cities": [
      "長岡市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "申請期間：令和8年4月1日〜令和9年2月26日",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.nagaoka.niigata.jp/sangyou/cate05/yushi-annai.html"
  },
  {
    "id": "toyama-datsutanso-model",
    "name": "富山県脱炭素化モデル中小企業育成事業費補助金",
    "provider": "富山県",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "中小企業の脱炭素化の取組をモデルとして育成する。",
    "eligibility": [
      "県内中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "富山県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.toyama.jp/130131/20260501.html"
  },
  {
    "id": "toyama-jigyo-keizoku",
    "name": "富山県小規模事業者事業継続力強化補助金",
    "provider": "富山県 商工労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "その他",
    "amount": "要確認",
    "summary": "災害への事前対策など事業継続力強化に取り組む小規模事業者を支援する。",
    "eligibility": [
      "県内の小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "富山県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年5月20日〜（計画策定枠は12月4日まで）",
    "deadline": "2026-12-04",
    "priority": 6,
    "url": "https://www.pref.toyama.jp/1300/sangyou/shoukoukensetsu/shoukougyou/2026jigyoukeizokuryoku.html"
  },
  {
    "id": "toyama-kigyo-toyama",
    "name": "起業なら富山！創業・移住支援事業（起業支援金）",
    "provider": "富山県 商工労働部・富山県新世紀産業機構",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "経費の1/2・上限80万円（県内在住者）／180万円（移住者）。中山間地域は100万円／200万円",
    "summary": "県内で創業する人や移住して起業する人の経費を支援する。",
    "eligibility": [
      "令和8年4月〜令和9年2月末に県内で創業すること"
    ],
    "industries": "all",
    "prefectures": [
      "富山県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は募集終了（申込締切2026年6月17日）。次回は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.tonio.or.jp/search/r8kigyotoyama/"
  },
  {
    "id": "toyama-sogyo-yushi",
    "name": "富山県の創業者向け融資",
    "provider": "富山県",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額3,500万円・年1.55%以内（検索結果記載、要確認）",
    "summary": "創業者向けの県融資制度。",
    "eligibility": [
      "創業者"
    ],
    "industries": "all",
    "prefectures": [
      "富山県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.toyama.jp/100222/sougyo/kigyohojokin.html"
  },
  {
    "id": "nanto-city-akiya-akitenpo-riyo-hojo",
    "name": "南砺市空き家・空き店舗利用促進事業補助金",
    "provider": "南砺市 商工企業立地課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/2以内、上限100万円〜200万円（ページにより記載差異あり、要確認）、賃借料補助は最長3年",
    "summary": "市内の空き家・空き店舗を活用して事業所等を開設する際の改修費・設備費・賃借料を補助する制度。",
    "eligibility": [
      "市内の空き家・空き店舗を利用して事業を行う事業者",
      "交付決定後に着手した経費であること",
      "交付決定後5年以上事業を継続すること"
    ],
    "industries": "all",
    "prefectures": [
      "富山県"
    ],
    "cities": [
      "南砺市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年1月30日",
    "deadline": "2027-01-30",
    "priority": 8,
    "url": "https://www.city.nanto.toyama.jp/soshiki/shokokigyoritchi/2/4/421.html"
  },
  {
    "id": "nanto-city-kigyoka-ikusei-hojo",
    "name": "南砺市起業家育成支援事業補助金",
    "provider": "南砺市 商工企業立地課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2、事業所開設費上限200万円（若者U35活躍枠は300万円）、賃借料月2.5万円・最長3年、利子補給3年間累計30万円",
    "summary": "市内で新たに事業を始める起業家の開設費・賃借料・利子を補助する制度。申請前の事前相談が必須。",
    "eligibility": [
      "創業前または創業2年未満の事業者",
      "市内で新たに事業を開始すること",
      "申請前に事前相談を行うこと"
    ],
    "industries": "all",
    "prefectures": [
      "富山県"
    ],
    "cities": [
      "南砺市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年1月29日",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.nanto.toyama.jp/soshiki/shokokigyoritchi/2/2/970.html"
  },
  {
    "id": "takaoka-city-jinzai-ikusei",
    "name": "高岡市人材育成事業支援補助金",
    "provider": "高岡市 産業企画課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "従業員の研修など人材育成の取組を支援する補助金。令和8年度の補助事業として案内されている。",
    "eligibility": [
      "高岡市内の中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "富山県"
    ],
    "cities": [
      "高岡市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takaoka.toyama.jp/soshiki/sangyokikakuka/2/1/1/2483.html"
  },
  {
    "id": "takaoka-city-sangyo-smart",
    "name": "高岡市産業スマート化事業支援補助金",
    "provider": "高岡市 産業企画課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/2以内。デジタイゼーション75万円、デジタライゼーション・DX事業150万円（機械装置等費はそれぞれ30万円・60万円以内）",
    "summary": "業務のデジタル化・DX推進に取り組む中小企業を支援する補助金。",
    "eligibility": [
      "高岡市内の中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "富山県"
    ],
    "cities": [
      "高岡市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（令和8年6月26日受付分から拡充。受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takaoka.toyama.jp/soshiki/sangyokikakuka/2/1/1/2229.html"
  },
  {
    "id": "takaoka-city-shinjidai-hanro",
    "name": "高岡市新時代販路開拓事業支援補助金",
    "provider": "高岡市 産業企画課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2以内（米国市主催事業・台北市は3/4以内）。見本市等展示は国内45万円・国外75万円（米国市主催・台北は150万円）、産業観光整備・ビジネスモデルチェンジは各75万円",
    "summary": "見本市等への出展、産業観光に係る整備、ビジネスモデルチェンジ等の販路開拓の取組を補助。",
    "eligibility": [
      "高岡市内の中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "富山県"
    ],
    "cities": [
      "高岡市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（令和8年6月26日受付分から拡充。受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takaoka.toyama.jp/soshiki/sangyokikakuka/2/1/1/2227.html"
  },
  {
    "id": "takaoka-city-sogyo-jigyoshokei",
    "name": "高岡市創業・事業承継支援補助金",
    "provider": "高岡市 産業企画課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助対象経費の1/2以内（移住者・女性・40歳未満は2/3以内）、上限50万円（令和7年度記載。令和8年6月26日受付分から限度額引上げの案内あり）",
    "summary": "ものづくりを中心とした創業、第二創業、事業承継による新たな取組の費用を補助。商工会議所等の事業計画確認が必要。",
    "eligibility": [
      "ものづくり関連の中小企業者",
      "高岡商工会議所または高岡市商工会の事業計画確認",
      "創業の場合は創業講座受講・創業相談と計画策定"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "富山県"
    ],
    "cities": [
      "高岡市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takaoka.toyama.jp/soshiki/sangyokikakuka/2/1/1/2671.html"
  },
  {
    "id": "toyama-city-kigyoshien-yushi-assen",
    "name": "富山市 中小企業制度融資（第二創業支援資金・商店街空き店舗活用促進資金）",
    "provider": "富山市 商工労働部 商工労政課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "第二創業支援資金は上限5,000万円・10年以内、空き店舗資金は上限2,000万円・7年以内（令和8年10月1日から利率0.55%引上げ）",
    "summary": "市の制度融資。第二創業や商店街空き店舗活用向けの資金がある。事業承継では利子助成の補助制度もある。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "富山県"
    ],
    "cities": [
      "富山市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toyama.lg.jp/business/kigyoshien/1010593/1005575.html"
  },
  {
    "id": "toyama-city-shinki-shutten-support-hojo",
    "name": "富山市新規出店サポート事業補助金",
    "provider": "富山市 活力都市創造部",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費の2分の1（1階部分は上限500万円）、店舗賃借料の3分の1など",
    "summary": "中心商店街の空き店舗への出店者に改装費・賃借料を補助。",
    "eligibility": [
      "中心商店街の空き店舗に出店する事業者"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "富山県"
    ],
    "cities": [
      "富山市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "実施期間は令和9年3月31日まで",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.toyama.lg.jp/shisei/machizukuri/shigaichi/1006520.html"
  },
  {
    "id": "toyama-city-venture-shinshohin-joseikin",
    "name": "富山市ベンチャー企業等新商品市場創出促進助成金",
    "provider": "富山市 商工労働部 商工労政課",
    "level": "municipality",
    "type": "助成金",
    "cat": "販路開拓・PR",
    "amount": "対象経費の50%以内、1回あたり上限30万円、最長2年間",
    "summary": "新商品の国内見本市出品費用や広告宣伝費を助成。",
    "eligibility": [
      "富山市に本社または市内工場で新商品を製造する中小企業者",
      "対象見本市は原則令和8年4月1日以降開始"
    ],
    "industries": "all",
    "prefectures": [
      "富山県"
    ],
    "cities": [
      "富山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toyama.lg.jp/business/kigyoshien/1010594/1005678.html"
  },
  {
    "id": "ishikawa-challenge-shien",
    "name": "令和8年度 チャレンジ支援補助金（能登半島地震・奥能登豪雨）",
    "provider": "石川県・ISICO",
    "level": "prefecture",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "上限300万円",
    "summary": "能登3市3町に事業所がある中小企業の新たな挑戦を支援する。",
    "eligibility": [
      "能登3市3町に事業所を持つ中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "石川県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "締切 2026年11月30日",
    "deadline": "2026-11-30",
    "priority": 6,
    "url": "https://www.isico.or.jp/support/dgnet/d41193698.html"
  },
  {
    "id": "ishikawa-iju-kigyo-shienkin",
    "name": "移住・起業支援金",
    "provider": "石川県 商工労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限200万円（補助率1/2以内）",
    "summary": "東京23区から県内に移住して起業する人を支援する。",
    "eligibility": [
      "東京23区からの移住者",
      "令和8年4月1日〜12月31日に県内で開業・設立"
    ],
    "industries": "all",
    "prefectures": [
      "石川県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "募集期間は6月15日に終了。最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.ishikawa.lg.jp/kinyuu/keieishien/kigyoushienkin.html"
  },
  {
    "id": "ishikawa-jigyoshokei-enkatsu",
    "name": "令和8年度事業承継円滑化補助金",
    "provider": "石川県・ISICO",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "上限50万円（補助率は要確認）",
    "summary": "事業承継に伴う費用を補助する。創業予定者への承継も対象。",
    "eligibility": [
      "県内中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "石川県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "締切 2027年2月1日（予算上限に達し次第終了）",
    "deadline": "2027-02-01",
    "priority": 6,
    "url": "https://www.isico.or.jp/support/dgnet/d41187154.html"
  },
  {
    "id": "ishikawa-noto-kigyo-sokushin",
    "name": "令和6年能登半島地震等 起業促進補助金",
    "provider": "石川県",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限300万円（新規起業は補助率2/3、第二創業等は1/2）",
    "summary": "能登地域での新たな起業や第二創業を支援する。",
    "eligibility": [
      "能登6市町での新たな起業等"
    ],
    "industries": "all",
    "prefectures": [
      "石川県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "第8次 締切10月30日、第9次 締切12月4日",
    "deadline": "2026-10-30",
    "priority": 6,
    "url": "https://www.pref.ishikawa.lg.jp/kinyuu/jishin/kigyou.html"
  },
  {
    "id": "kanazawa-city-ai-dx-suishin-hojo",
    "name": "金沢市AI・DX推進支援事業補助金",
    "provider": "金沢市 経済局",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "1年目（計画策定）3分の2・上限150万円／2年目（導入、令和9年度予定）2分の1（小規模3分の2）・上限200万円",
    "summary": "システム導入計画の策定と導入を2年間で支援する。",
    "eligibility": [
      "金沢市の中小企業等",
      "2年間の取組みが必須"
    ],
    "industries": "all",
    "prefectures": [
      "石川県"
    ],
    "cities": [
      "金沢市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度の1年目募集は3月16日〜5月22日で終了。次回は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www4.city.kanazawa.lg.jp/soshikikarasagasu/sangyoseisakuka/gyomuannai/3/4/30689.html"
  },
  {
    "id": "kanazawa-city-chusho-yushi-sogyosha-shikin",
    "name": "金沢市 中小企業創業者支援資金（制度融資）",
    "provider": "金沢市 経済局 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "創業しようとする方や創業1年未満の方向けの市の制度融資。40歳未満・女性は重点支援分あり。",
    "eligibility": [
      "創業を図る、または創業1年未満の中小企業創業者",
      "若者・女性は重点支援分"
    ],
    "industries": "all",
    "prefectures": [
      "石川県"
    ],
    "cities": [
      "金沢市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www4.city.kanazawa.lg.jp/soshikikarasagasu/sangyoseisakuka/gyomuannai/3/4/6569.html"
  },
  {
    "id": "kanazawa-city-wakamono-kigyoka-shien",
    "name": "金沢市 地域連携若者起業家支援事業",
    "provider": "金沢市 経済局 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "開業奨励金は上限100万円、継続奨励金は1年目・2年目各上限50万円",
    "summary": "市内で起業を志す若者の開業前後の運転資金を助成し、アドバイザー派遣も行う。",
    "eligibility": [
      "令和8年4月1日時点で40歳未満",
      "金沢市内の店舗で事業を行う"
    ],
    "industries": "all",
    "prefectures": [
      "石川県"
    ],
    "cities": [
      "金沢市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度上期は4月1日受付開始（下期は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www4.city.kanazawa.lg.jp/soshikikarasagasu/sangyoseisakuka/gyomuannai/3/1/6560.html"
  },
  {
    "id": "komatsu-city-akiten-sogyo-hojo",
    "name": "小松市空き店舗活用型飲食店等創業支援補助金",
    "provider": "小松市 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "上限100万円（補助率は要確認）",
    "summary": "市内の空き店舗で飲食店等を開業する際の土地・建物取得費、建物改修費、機器・設備のリース料等の一部を補助する。",
    "eligibility": [
      "市内の空き店舗で新たに開業する者",
      "交付決定から6カ月以内に営業を開始できること"
    ],
    "industries": [
      "food",
      "retail"
    ],
    "prefectures": [
      "石川県"
    ],
    "cities": [
      "小松市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年3月12日（市ページの記載。最新は要確認）",
    "deadline": "2027-03-12",
    "priority": 8,
    "url": "https://www.city.komatsu.lg.jp/soshiki/1018/shoukoushinkou_monodukuri/3/13126.html"
  },
  {
    "id": "komatsu-city-keiei-model-change",
    "name": "小松市経営モデルチェンジ支援事業（新事業チャレンジ）",
    "provider": "小松市 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率1/2、上限200万円",
    "summary": "業態転換や新たな取組みを計画する市内事業者、革新的サービス・新商品開発により創業する事業者を支援する市独自の補助制度。",
    "eligibility": [
      "市内事業者で業態転換や新たな取組みを計画していること",
      "または革新的サービス・新商品開発により創業する事業者"
    ],
    "industries": "all",
    "prefectures": [
      "石川県"
    ],
    "cities": [
      "小松市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "要確認（市ページで現行の募集期間を確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.komatsu.lg.jp/soshiki/1018/shoukoushinkou_monodukuri/3/2134.html"
  },
  {
    "id": "komatsu-city-kigyoka-rishihokyu",
    "name": "小松市起業家支援利子補給事業",
    "provider": "小松市 商工労働課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資後1年間の利子支払額を補給、上限10万円/事業者",
    "summary": "市内で新規開業する起業家が創業資金の融資を受けた場合、利子の一部を補給する。制度融資（限度額700万円、6年以内）と併用できる。",
    "eligibility": [
      "市内で新たに事業を始める計画があるか開業後1年未満であること",
      "指定金融機関から創業資金の融資を受けていること",
      "主たる事業所が市内、市税を完納していること"
    ],
    "industries": "all",
    "prefectures": [
      "石川県"
    ],
    "cities": [
      "小松市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "貸付から1年経過後の3か月以内に申請",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.komatsu.lg.jp/soshiki/1018/shoukoushinkou_monodukuri/8/1301.html"
  },
  {
    "id": "fukui-dx-kasoku",
    "name": "ふくいDX加速化補助金",
    "provider": "福井県・福井県産業支援センター",
    "level": "prefecture",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認",
    "summary": "中小企業のDX推進を支援する。",
    "eligibility": [
      "県内中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "福井県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.fisc.jp/subsidy/dxkasoku/"
  },
  {
    "id": "fukui-hito-toushi",
    "name": "「人への投資」支援事業補助金（令和8年度）",
    "provider": "福井県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "従業員の短期教育訓練にかかる企業負担を補助する。",
    "eligibility": [
      "県内企業"
    ],
    "industries": "all",
    "prefectures": [
      "福井県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "対象期間は交付決定日〜令和9年3月31日。募集状況は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.fukui.lg.jp/doc/rousei/kigyoushien/hito_toushi.html"
  },
  {
    "id": "fukui-ippin-fund",
    "name": "ふくいの逸品創造ファンド事業（令和8年度）",
    "provider": "福井県・福井県産業支援センター",
    "level": "prefecture",
    "type": "助成金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "地場産業の技術等を生かした商品開発や販路開拓の費用の一部を助成する。",
    "eligibility": [
      "創業者・中小企業"
    ],
    "industries": [
      "manufacturing",
      "food",
      "retail"
    ],
    "prefectures": [
      "福井県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年8月10日〜9月30日（受付終了）。次回は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.fisc.jp/subsidy/ippin/"
  },
  {
    "id": "fukui-kaigyo-shien-shikin",
    "name": "福井県開業支援資金（制度融資）",
    "provider": "福井県 産業労働部",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "無担保3,500万円・有担保1億円（1年度あたり）。自己資金は事業資金総額の1/3が必要",
    "summary": "創業に必要な資金の融資を円滑にする県制度融資。",
    "eligibility": [
      "新たに創業する中小企業者・個人"
    ],
    "industries": "all",
    "prefectures": [
      "福井県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.fukui.lg.jp/doc/sinsan/yushiyoushiki_d/fil/800.pdf"
  },
  {
    "id": "fukui-sogyo-katsuseika",
    "name": "ふくい創業活性化事業（成長支援）助成金",
    "provider": "福井県・福井県産業支援センター",
    "level": "prefecture",
    "type": "助成金",
    "cat": "創業・起業",
    "amount": "助成限度額500万円以上1,000万円以下",
    "summary": "全国・海外展開を目指す新事業の経費を助成する。",
    "eligibility": [
      "県内で法人設立後3年以上15年以内の企業等"
    ],
    "industries": "all",
    "prefectures": [
      "福井県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年8月6日〜9月7日（受付終了）。次回は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.fisc.jp/subsidy/fukui_sougyo1/"
  },
  {
    "id": "fukui-city-chusho-yushi",
    "name": "福井市中小企業者等融資制度（創業支援資金ほか）",
    "provider": "福井市 商工労政課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認（令和8年度手引き参照）",
    "summary": "若者・女性等向け創業支援資金を含む市の制度融資。",
    "eligibility": [
      "市内で事業を営む、または創業する中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "福井県"
    ],
    "cities": [
      "福井市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度（随時、詳細は手引き参照）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fukui.lg.jp/sigoto/syoukou/yusi/p002408_d/fil/tebiki.pdf"
  },
  {
    "id": "fukui-city-jigyoshokei-hojo",
    "name": "福井市事業承継促進事業補助金",
    "provider": "福井市 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "限度額15万円、補助率1/2以内",
    "summary": "事業承継に係る経費の一部を補助する。",
    "eligibility": [
      "市内中小企業者等（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "福井県"
    ],
    "cities": [
      "福井市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年4月1日～令和9年1月29日",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.fukui.lg.jp/sigoto/syoukou/hojo/p071260.html"
  },
  {
    "id": "fukui-city-ma-kasokuka",
    "name": "福井市M&A加速化支援補助金",
    "provider": "福井市 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "限度額5万円",
    "summary": "M&Aの活用に係る経費の一部を補助する。",
    "eligibility": [
      "市内中小企業者等（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "福井県"
    ],
    "cities": [
      "福井市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fukui.lg.jp/sigoto/syoukou/hojo/p072771.html"
  },
  {
    "id": "fukui-city-shinseihin-kaihatsu",
    "name": "福井市新製品・新技術開発支援補助金",
    "provider": "福井市 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "限度額 産学連携枠400万円・単独企業枠200万円、補助率2/3以内",
    "summary": "実用化の見込みがある新製品・新技術・新サービスの開発費（広告宣伝・展示会出展費含む）を補助する。",
    "eligibility": [
      "市内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "福井県"
    ],
    "cities": [
      "福井市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度分は募集終了（来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fukui.lg.jp/sigoto/syoukou/hojo/p072760.html"
  },
  {
    "id": "fukui-city-startup-sosyutsu",
    "name": "福井市スタートアップ創出補助金",
    "provider": "福井市 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限20万円、補助率1/2以内（在学中は2/3以内）",
    "summary": "市内での創業初期費用（改装・設備・広告宣伝・会社設立等）を補助する。",
    "eligibility": [
      "申請時35歳未満で令和9年3月31日までに市内で開業し代表者になる人",
      "特定創業支援等事業を受けていること",
      "市内に住民票と主たる事業所を置くこと"
    ],
    "industries": "all",
    "prefectures": [
      "福井県"
    ],
    "cities": [
      "福井市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日～（予算額に達し次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fukui.lg.jp/sisei/hojyo/sigoto/p070264.html"
  },
  {
    "id": "sabae-city-seisansei-setsubi-hojo",
    "name": "鯖江市生産性向上設備等導入支援補助金",
    "provider": "鯖江市 商工政策課（産業環境部）",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率2/3以内、上限100万円（期間中1回限り）",
    "summary": "先端設備等導入計画の認定を受けた市内事業者の生産性向上設備の導入費用を補助する。国の重点支援地方交付金が財源。",
    "eligibility": [
      "令和8年2月2日以降に先端設備等導入計画の認定を受けていること",
      "雇用者給与等支給額の増加率1.5%以上の賃上げ表明",
      "市税を滞納していないこと"
    ],
    "industries": "all",
    "prefectures": [
      "福井県"
    ],
    "cities": [
      "鯖江市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年2月2日から予算額に達し次第終了",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.sabae.fukui.jp/kanko_sangyo/kigyoshien/kigyoshien/shien_boshu/sentansetsubi.html"
  },
  {
    "id": "sabae-city-startup-shien-hojo",
    "name": "鯖江市創業スタートアップ支援事業補助金",
    "provider": "鯖江市 商工政策課（産業環境部）",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、上限30万円",
    "summary": "市内で創業・第二創業する中小企業の初期投資（設備購入費・工事費など）の一部を補助する。",
    "eligibility": [
      "市内で創業または第二創業する者",
      "特定創業支援事業の受講認定者など",
      "創業前または創業後1年未満"
    ],
    "industries": "all",
    "prefectures": [
      "福井県"
    ],
    "cities": [
      "鯖江市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度（募集期間は市ページで要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.sabae.fukui.jp/kanko_sangyo/kigyoshien/kigyoshien/shien_boshu/founded2021.html"
  },
  {
    "id": "sabae-city-tenjikai-shuttenshien",
    "name": "鯖江市展示会等出展支援補助金",
    "provider": "鯖江市 商工政策課（産業環境部）",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2以内、個社は初回出展上限50万円・2回目以降上限40万円",
    "summary": "市内中小企業が展示会等へ出展する経費（出展料、通信運搬費、委託料、賃借料等）の一部を補助する。事業開始前の申請が必要。",
    "eligibility": [
      "市内に主たる事業所がある製造業または卸売業の中小企業（グループも可）",
      "事業開始前に申請すること",
      "同一展示会への出展は5回まで"
    ],
    "industries": [
      "manufacturing",
      "retail"
    ],
    "prefectures": [
      "福井県"
    ],
    "cities": [
      "鯖江市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜令和9年2月26日",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.sabae.fukui.jp/kanko_sangyo/kigyoshien/kigyoshien/shien_boshu/SangyoShinkotenzikai.html"
  },
  {
    "id": "tsuruga-city-chusho-keiei-anteishikin",
    "name": "敦賀市中小企業経営安定資金",
    "provider": "敦賀市 商工貿易振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "市内中小企業の経営安定のための市の制度融資。条件・限度額は市ページで案内されている。",
    "eligibility": [
      "市内の中小企業者（詳細要件は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "福井県"
    ],
    "cities": [
      "敦賀市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsuruga.lg.jp/page/3572.html"
  },
  {
    "id": "tsuruga-city-machinaka-sogyo-sokushin",
    "name": "敦賀市まちなか創業等促進支援事業",
    "provider": "敦賀市 商工貿易振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/3、上限50万円（令和6年4月更新ページの記載。最新は要確認）",
    "summary": "中心市街地で新規創業・第二創業を目指す人に、建築・設備工事費と備品購入費の一部を補助する。",
    "eligibility": [
      "中心市街地で新規創業または第二創業を行う者",
      "対象は建築・設備工事費、備品購入費（店舗外で使う備品は原則対象外）"
    ],
    "industries": "all",
    "prefectures": [
      "福井県"
    ],
    "cities": [
      "敦賀市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（市ページで現行の受付状況を確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsuruga.lg.jp/about_city/business/kigyo/machisougyou.html"
  },
  {
    "id": "yamanashi-chingin-up",
    "name": "山梨県賃金アップ事業費補助金",
    "provider": "山梨県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "予算の範囲内（詳細は要確認）",
    "summary": "賃上げに取り組み労働環境改善の設備等を導入する県内中小企業を支援。スキルアップ研修推進事業費補助金も別途あり。",
    "eligibility": [
      "賃上げに取り組む県内中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "山梨県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "環境改善コースは令和8年5/11〜8/31（受付終了）。スキルアップ研修は11/30まで",
    "deadline": "2026-11-30",
    "priority": 6,
    "url": "https://www.pref.yamanashi.jp/hataraku/chinginhikiage_hojokinkaisei_r8.html"
  },
  {
    "id": "yamanashi-innovation-sogyo",
    "name": "やまなしイノベーション創出事業費補助金（経営計画等）",
    "provider": "山梨県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "経営計画：上限50万円・補助率1/2／経営革新計画：上限100万円・補助率2/3",
    "summary": "小規模事業者の経営計画に基づく販路開拓等や経営革新計画に基づく取組を支援。",
    "eligibility": [
      "小規模事業者",
      "経営計画または経営革新計画を策定"
    ],
    "industries": "all",
    "prefectures": [
      "山梨県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.yamanashi.jp/startup/innovation_hojyo/2025.html"
  },
  {
    "id": "yamanashi-kigyoka-yushi",
    "name": "山梨県 起業家支援融資（商工業振興資金）",
    "provider": "山梨県 産業労働部／山梨県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "設備・運転各3,500万円（一企業3,500万円）／年1.8%（女性・若者・シニア枠1.6%、移住者枠1.5%）",
    "summary": "新規開業予定または開業5年未満の方向け県制度融資。県の保証料補助あり。",
    "eligibility": [
      "新たに事業を始める方、開業後5年未満の方"
    ],
    "industries": "all",
    "prefectures": [
      "山梨県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（条件改定の可能性あり・要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.yamanashi.jp/sangyo-sin/sinkousikin/goannai_kigyouka.html"
  },
  {
    "id": "yamanashi-shijo-kaitaku",
    "name": "山梨県賃上げ環境整備中小企業経営革新サポート事業（市場開拓支援補助金）",
    "provider": "山梨県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率2/3以内・上限150万円",
    "summary": "市場開拓に取り組む県内中小企業を支援。申請前に県担当者への事前相談が必要。",
    "eligibility": [
      "県内中小企業",
      "事前相談が必要"
    ],
    "industries": "all",
    "prefectures": [
      "山梨県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日から受付開始（予算に達し次第終了）。最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.yamanashi.jp/startup/chinage-support/r8-hojokin.html"
  },
  {
    "id": "yamanashi-shokei-yushi",
    "name": "山梨県 事業承継支援融資（商工業振興資金）",
    "provider": "山梨県 産業労働部／山梨県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "事業承継",
    "amount": "設備1億円・運転5,000万円／年1.7%（責任共有）",
    "summary": "事業承継に取り組む方向けの県制度融資。県が信用保証料の1/2を補助。",
    "eligibility": [
      "県の認定または承継支援センター等の支援で計画を立て実行する方、M&Aで承継する方"
    ],
    "industries": "all",
    "prefectures": [
      "山梨県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "随時（条件は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.yamanashi.jp/sangyo-sin/sinkousikin/goannai_jigyousyoukei.html"
  },
  {
    "id": "fujiyoshida-city-akitenpo-hojo",
    "name": "富士吉田市空き店舗補助金（店舗改装・家賃補助）",
    "provider": "富士吉田商工会議所（富士吉田市 商工振興課）",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "令和6年度実績：店舗改装 1/2・上限100万円、家賃 1/2・上限月3万円（2年間）",
    "summary": "市内の商業地域・近隣商業地域の空き店舗を活用して開業する事業者の改装費・家賃を補助する制度。",
    "eligibility": [
      "富士吉田市民（法人は市内登記）であること",
      "商工会議所経営指導員の指導・推薦を受けること（改装事業）",
      "週3日以上、日中に営業すること"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "山梨県"
    ],
    "cities": [
      "富士吉田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（掲載の数字は令和6年度）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.fyoshidacci.or.jp/keiei/akitenpo.php"
  },
  {
    "id": "fujiyoshida-city-shokogyo-kasseika-hojo",
    "name": "富士吉田市商工業活性化支援事業補助金",
    "provider": "富士吉田市 商工振興課／富士吉田商工会議所",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "製品開発や販路開拓、インターネットを使った販売促進などのメニューを持つ市の商工業支援補助金。",
    "eligibility": [
      "富士吉田市内の事業者",
      "製品開発・販路開拓等の取り組みであること"
    ],
    "industries": "all",
    "prefectures": [
      "山梨県"
    ],
    "cities": [
      "富士吉田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.fyoshidacci.or.jp/keiei/hojokin.php"
  },
  {
    "id": "kofu-city-akitenpo",
    "name": "甲府市中心市街地空き店舗活用事業補助金",
    "provider": "甲府市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "経費の1/3以内、上限30万円（商店街加入で50万円）",
    "summary": "中心市街地の空き店舗に出店する事業者の改装工事等を補助する。",
    "eligibility": [
      "中心市街地の空き店舗で出店する事業者",
      "工事着手前の申請が必要"
    ],
    "industries": "all",
    "prefectures": [
      "山梨県"
    ],
    "cities": [
      "甲府市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日～令和9年2月末（予算額に達し次第終了）",
    "deadline": "2027-02-28",
    "priority": 8,
    "url": "https://www.city.kofu.yamanashi.jp/shoko/akitenpo.html"
  },
  {
    "id": "kofu-city-jigyoshokei-hojo",
    "name": "甲府市中小企業者等事業承継補助金",
    "provider": "甲府市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "要確認",
    "summary": "事業承継に必要な資産査定・企業価値の簡易算定などの費用を補助する。",
    "eligibility": [
      "本社が山梨県内で市内に主たる事業所を持つ中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "山梨県"
    ],
    "cities": [
      "甲府市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kofu.yamanashi.jp/shoko/business/jigyoukeisyouhojo.html"
  },
  {
    "id": "kofu-city-sogyo-shikin",
    "name": "甲府市創業支援資金（利子補給）",
    "provider": "甲府市 商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "運転資金1,000万円・設備資金1,500万円まで、市が1.0%分を利子補給",
    "summary": "創業者向け制度融資で、認定特定創業支援事業の証明を受けた人に利子補給を行う。",
    "eligibility": [
      "市内で創業する人・創業間もない人",
      "特定創業支援の証明書の交付を受けた人（利子補給）"
    ],
    "industries": "all",
    "prefectures": [
      "山梨県"
    ],
    "cities": [
      "甲府市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kofu.yamanashi.jp/shoko/business/jigyo/kee/dokuritsu.html"
  },
  {
    "id": "kofu-city-tokubetsu-keiei-shikin",
    "name": "甲府市特別経営安定資金（令和8年7月拡充）",
    "provider": "甲府市 商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "経営安定のための市の制度融資で、令和8年7月1日から一部が拡充された。",
    "eligibility": [
      "市内中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "山梨県"
    ],
    "cities": [
      "甲府市"
    ],
    "stages": [
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kofu.yamanashi.jp/shoko/business/jigyo/kee/ante.html"
  },
  {
    "id": "nagano-gyomu-kyodoka",
    "name": "長野県業務共同化モデル実証補助金",
    "provider": "長野県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "その他",
    "amount": "要確認",
    "summary": "令和8年度の業務共同化モデル実証補助金の補助対象者の募集（詳細は公式ページで確認）。",
    "eligibility": [
      "要確認"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度募集あり（期間は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.nagano.lg.jp/keieishien/gyoumhojyo.html"
  },
  {
    "id": "nagano-shinshu-shokei-yushi",
    "name": "長野県中小企業融資制度 信州創生推進資金（事業承継向け）",
    "provider": "長野県 産業労働部／長野県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "事業承継",
    "amount": "設備1億5,000万円・運転3,000万円／年1.1%",
    "summary": "事業承継により既存事業を譲り受ける方などが対象の県制度融資。",
    "eligibility": [
      "事業承継・引継ぎ支援センターの支援を受け承継計画を策定した方等",
      "金融機関に申込み、信用保証協会の保証付き"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "随時（最新の条件は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.nagano.lg.jp/keieishien/sangyo/shokogyo/kinyu/chusyo-yushi/ichiran/index.html"
  },
  {
    "id": "nagano-shinshu-sogyo-yushi",
    "name": "長野県中小企業融資制度 信州創生推進資金（創業支援向け）",
    "provider": "長野県 産業労働部／長野県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "設備3,500万円・運転2,000万円（中小企業振興資金創業枠と合計5,500万円）／年1.2%（県の創業支援施策利用で年1.1%）",
    "summary": "創業5年未満の方などが利用できる県制度融資。創業関連保証等の利用で信用保証料の自己負担なし。",
    "eligibility": [
      "創業5年未満の方等",
      "金融機関に申込み、長野県信用保証協会の保証付き融資"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（最新の金利・条件は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.nagano.lg.jp/keieishien/sangyo/shokogyo/kinyu/chusyo-yushi/ichiran/sogyo.html"
  },
  {
    "id": "nagano-social-business-sogyo",
    "name": "長野県ソーシャル・ビジネス創業支援金",
    "provider": "長野県 産業労働部／長野県産業振興機構",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限200万円・補助率1/2以内",
    "summary": "地域課題をビジネス手法で解決する創業等の経費を補助する。令和8年度は1次・2次公募が締切済み。",
    "eligibility": [
      "県内で地域課題解決型の創業等を行う者",
      "令和8年4月7日〜令和9年1月31日に県内で創業等を行うこと"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度の1次(5/18)・2次(7/24)は受付終了。来年度は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.nagano.lg.jp/keieishien/sangyo/shokogyo/sogyo/sogyouhojokin.html"
  },
  {
    "id": "nagano-startup-yuchi-sosyutsu",
    "name": "長野県スタートアップ誘致・創出強化事業補助金",
    "provider": "長野県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "最大1,000万円・補助対象経費の1/2以内",
    "summary": "パートナーVCから投資を受けたスタートアップの県内での事業を支援する補助金。",
    "eligibility": [
      "パートナーVCから投資を受けたスタートアップ",
      "県内で事業を行うこと"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度分の提出期限 令和8年11月17日",
    "deadline": "2026-11-17",
    "priority": 6,
    "url": "https://www.pref.nagano.lg.jp/keieishien/sangyo/shokogyo/sogyo/suyuchi_r8.html"
  },
  {
    "id": "iida-city-akiten-sogyo-shien",
    "name": "飯田市空き店舗活用創業支援事業補助金（まちなか創業）",
    "provider": "飯田市 商業観光課 商業流通係",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "要確認",
    "summary": "商店街等の空き店舗を活用して創業する新規出店者の経費の一部を助成する。",
    "eligibility": [
      "商店街等の空き店舗を活用して創業する新規出店者",
      "詳細要件は市ページで要確認"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "飯田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（市ページで現行の受付状況を確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iida.lg.jp/soshiki/25/akitenpokatuyou.html"
  },
  {
    "id": "iida-city-fukugyo-kengyo-jinzai",
    "name": "飯田市副業・兼業人材活用促進補助金",
    "provider": "飯田市 産業経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "市内事業者が副業・兼業人材を活用する際の費用の一部を補助する制度（飯田市事業者等支援補助金一覧に掲載）。",
    "eligibility": [
      "市内事業者で副業・兼業人材を活用すること",
      "詳細要件は市ページで要確認"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "飯田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iida.lg.jp/soshiki/21/projinzai.html"
  },
  {
    "id": "matsumoto-city-akitenpo-kaiso",
    "name": "松本市商店街空き店舗改装支援事業補助金",
    "provider": "松本市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/3以内・限度額20万〜100万円",
    "summary": "空き店舗の改装費を補助（新規出店や賃貸目的の改装が対象）。",
    "eligibility": [
      "商店街の空き店舗で新規出店する事業者等"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "松本市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日以降受付開始（終期は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsumoto.nagano.jp/soshiki/75/196825.html"
  },
  {
    "id": "matsumoto-city-akitenpo-katsuyo",
    "name": "松本市空き店舗活用事業補助金",
    "provider": "松本市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "家賃の1/10以内（月額上限4万円。中心市街地は2/10・月額上限8万円）、補助期間1年上限",
    "summary": "商店街の空き店舗を活用して事業を営む場合の家賃を補助。",
    "eligibility": [
      "松本商工会議所または波田商工会の指導を受けていること"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "松本市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認（ページにより受付状況の記載が異なる）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsumoto.nagano.jp/soshiki/75/3202.html"
  },
  {
    "id": "matsumoto-city-seizogyo-jinzai",
    "name": "松本市製造業等人材育成事業補助金",
    "provider": "松本市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "製造業等の人材育成に係る費用を補助。",
    "eligibility": [
      "市内の製造業等の事業者"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "松本市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsumoto.nagano.jp/soshiki/75/3022.html"
  },
  {
    "id": "matsumoto-city-seizogyo-katsseika",
    "name": "松本市製造業等活性化支援事業助成金",
    "provider": "松本市 商工課",
    "level": "municipality",
    "type": "助成金",
    "cat": "研究開発・新事業",
    "amount": "要確認",
    "summary": "令和8年度から新しい支援メニューが追加された製造業等向け助成金。",
    "eligibility": [
      "市内の製造業等の事業者"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "松本市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsumoto.nagano.jp/soshiki/75/3023.html"
  },
  {
    "id": "matsumoto-city-shinki-kaigyo-yachin",
    "name": "松本市新規開業家賃補助事業",
    "provider": "松本市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "1年目 対象経費の3/10以内（月額上限8万円）、2年目 2/10以内（月額上限6万円）",
    "summary": "市内で店舗を借りて開業する人の家賃を補助。",
    "eligibility": [
      "市内で店舗を借りて新規開業する人",
      "中小企業信用保険法の要件に該当"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "松本市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsumoto.nagano.jp/soshiki/75/3205.html"
  },
  {
    "id": "nagano-city-dx-model",
    "name": "長野市中小企業DXモデル支援事業補助金",
    "provider": "長野市 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認",
    "summary": "中小企業のDX推進の取組を支援する補助金。",
    "eligibility": [
      "市内中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "長野市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nagano.nagano.jp/n140300/contents/p006049.html"
  },
  {
    "id": "nagano-city-iju-kigyo-shienkin",
    "name": "長野市移住者起業支援金",
    "provider": "長野市 移住担当課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "各経費上限100万円、交付率10/10以内",
    "summary": "移住者が市内で新たに事業を始める際の拠点整備・人材育成・広告宣伝費等を支援する。",
    "eligibility": [
      "市内で起業する移住者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "長野市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nagano.nagano.jp/n041600/iju/p004278.html"
  },
  {
    "id": "nagano-city-jinzai-ikusei",
    "name": "長野市中小企業者人材育成事業補助金",
    "provider": "長野市 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率1/2以内、上限30万円（1人10万円）",
    "summary": "従業員の人材育成講習の受講費用を補助する。",
    "eligibility": [
      "市内中小企業者",
      "創業1年未満は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "長野市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度募集中（年2回まで）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nagano.nagano.jp/n140300/contents/p003893.html"
  },
  {
    "id": "nagano-city-shinseihin-hanro",
    "name": "長野市新製品開発・販路開拓補助",
    "provider": "長野市 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2以内、新製品開発30万円・販路開拓50万円まで",
    "summary": "新製品開発や販路開拓の経費を補助する。",
    "eligibility": [
      "市内中小企業者",
      "年度1回まで"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "長野市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度分受付中（期限は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nagano.nagano.jp/n140300/contents/p003894.html"
  },
  {
    "id": "nagano-city-startup-shien",
    "name": "長野市スタートアップ支援補助金",
    "provider": "長野市 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "設備費1/2以内上限500万円、事業費上限150万円（合計上限1,000万円）",
    "summary": "創業10年未満のスタートアップの設備・事業費を補助する。",
    "eligibility": [
      "創業10年未満",
      "原則3年以上長野市で事業継続予定"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "長野市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は5/18～6/30で受付終了（来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nagano.nagano.jp/n140600/contents/p003911.html"
  },
  {
    "id": "saku-city-akiten-taisaku-hojo",
    "name": "佐久市空き店舗対策事業補助金",
    "provider": "佐久市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改修費は対象経費の1/3以内（市内在住者は上限70万円、市外在住者は上限30万円）、賃借料は月額上限3万円（市外在住者2万円）で最長3年",
    "summary": "市の空き店舗情報に登録された物件を借りて新たに事業を始める人に、改修費と賃借料の一部を補助する。",
    "eligibility": [
      "市が管理する空き店舗情報に登録された物件を借りて事業を始めること",
      "賃貸借契約・工事請負契約の締結前に申請すること"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "佐久市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "事業実施期間は交付決定日から令和9年3月31日まで",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.saku.nagano.jp/machizukuri/shokogyo/josei_seido/akitenposeidoosirase.html"
  },
  {
    "id": "saku-city-hanro-kakudai-shien",
    "name": "佐久市販路拡大支援事業",
    "provider": "佐久市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "市内事業者の販路拡大の取組を支援する制度。",
    "eligibility": [
      "佐久市内の事業者",
      "詳細は市の案内ページで要確認"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "佐久市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.saku.nagano.jp/machizukuri/shokogyo/josei_seido/hanrokakudai.html"
  },
  {
    "id": "saku-city-shokogyo-shinko-hojo",
    "name": "佐久市商工業振興事業補助金",
    "provider": "佐久市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "その他",
    "amount": "区分により異なる（商工業活性化事業は対象経費の30%以内など）",
    "summary": "商工業の活性化、商店街活性化、工業環境整備など複数の区分で事業費の一部を補助する。",
    "eligibility": [
      "佐久市内で商工業を営む事業者・団体",
      "区分ごとの要件を満たす事業であること",
      "令和9年3月31日までに完了する事業（区分による）"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "佐久市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.saku.nagano.jp/machizukuri/shokogyo/josei_seido/shinkohojokin.html"
  },
  {
    "id": "suwa-city-akitenpo-katsuyo-hojo",
    "name": "諏訪市空店舗等活用補助金",
    "provider": "諏訪市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費から100万円を除いた額の1/2、上限50万円",
    "summary": "空き店舗等を活用して新たに事業を開始する市内事業者に対し、改修に要する経費の一部を補助する。",
    "eligibility": [
      "空き店舗等を活用して新たに事業を開始する市内事業者",
      "交付決定前に着工していないこと",
      "改修費用が100万円を超えること"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "諏訪市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（年度ごとに募集）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.suwa.lg.jp/site/kougyou/4743.html"
  },
  {
    "id": "suwa-city-shokuba-kankyo-seibi-hojo",
    "name": "諏訪市職場環境整備促進事業補助金",
    "provider": "諏訪市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "市内工業者が行う事業所の職場環境整備（更衣室・託児所等の整備、テレワーク・Web会議システム導入、省エネルギー機器への買替え）の経費の一部を補助する。",
    "eligibility": [
      "諏訪市内の工業者",
      "事業所の職場環境整備に要した経費であること"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "諏訪市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認（年度ごとに募集）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.suwa.lg.jp/site/kougyou/4727.html"
  },
  {
    "id": "suwa-city-tenpo-reform-hojo",
    "name": "諏訪市店舗リフォーム補助金",
    "provider": "諏訪市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "小規模工事（30万円以上120万円未満）は工事費の1/10（3万〜10万円）、大規模工事は改装費から100万円を引いた額の1/2（上限50万円）",
    "summary": "登録建設事業者を利用して既存店舗をリフォームする市内事業者に、改装費の一部を補助する。",
    "eligibility": [
      "既存店舗をリフォームする市内事業者",
      "市の登録建設事業者を利用すること",
      "交付決定前に着工していないこと"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "諏訪市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.suwa.lg.jp/site/kougyou/4745.html"
  },
  {
    "id": "ueda-city-chiiki-keizai-katsuseika",
    "name": "上田市地域経済活性化事業補助金",
    "provider": "上田市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "その他",
    "amount": "予算の範囲内（補助率・上限は要確認）",
    "summary": "商工業を営む団体が行う地域経済活性化事業を補助。団体向け中心のため対象は要確認。",
    "eligibility": [
      "商工業を営む団体（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "上田市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ueda.nagano.jp/soshiki/shoko/4606.html"
  },
  {
    "id": "ueda-city-jinzai-fusoku-toshi",
    "name": "上田市人材不足対策投資促進事業補助金",
    "provider": "上田市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率1/2以内。省力化・効率化投資は上限350万円（省エネ更新は400万円）、職場環境整備は上限100万円",
    "summary": "人手不足対策として、機械装置・ICTシステム等の省力化投資や休憩室等の職場環境整備を補助。予算に達し次第終了で、一部事業は受付終了表示。",
    "eligibility": [
      "市内に事業所を持つ中堅・中小企業者",
      "リース導入は対象外",
      "職場環境整備は事業費50万円以上"
    ],
    "industries": "all",
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "上田市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年4月1日〜（予算に達し次第終了・一部終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ueda.nagano.jp/soshiki/shoko/115375.html"
  },
  {
    "id": "ueda-city-shingijutsu-kaihatsu",
    "name": "上田市新技術等開発事業助成金",
    "provider": "上田市 商工課",
    "level": "municipality",
    "type": "助成金",
    "cat": "研究開発・新事業",
    "amount": "助成率：対象経費の1/2以内（上限250万円）",
    "summary": "新技術・新製品の開発に取り組む市内事業者への助成。令和8年度の募集は終了。",
    "eligibility": [
      "対象者・対象経費の詳細は要確認"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "長野県"
    ],
    "cities": [
      "上田市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度は募集終了。次年度は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ueda.nagano.jp/soshiki/shoko/78807.html"
  },
  {
    "id": "gifu-hanro-kaitaku",
    "name": "岐阜県 中小企業販路開拓等支援事業費補助金",
    "provider": "岐阜県 地域産業課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "地場産業の製造業者などの販路開拓を支援する補助金。",
    "eligibility": [
      "県内の地場産業の製造業者等"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "岐阜県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度は5/26に締切済み。来年度は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.gifu.lg.jp/site/pressrelease/494031.html"
  },
  {
    "id": "gifu-power-up",
    "name": "岐阜県 中小・小規模事業者パワーアップ応援補助金",
    "provider": "岐阜県 商工労働政策課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "区分により異なる（働いてもらい方改革枠は上限500万円、小規模一般枠は補助率1/2以内・上限150万円）",
    "summary": "規模拡大や業態転換など「稼ぐ力」の強化に取り組む事業者を商工会・商工会議所と連携して支援。",
    "eligibility": [
      "県内の中小・小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "岐阜県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は4/7〜5/15で受付終了。来年度は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.gifu.lg.jp/page/146196.html"
  },
  {
    "id": "gifu-seido-yushi",
    "name": "岐阜県中小企業資金融資制度",
    "provider": "岐阜県 商業・金融課／岐阜県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "県制度融資。令和8年度は小規模企業資金に商工会等窓口で保証料補給率年0.2%追加、企業活力支援資金が創設。事業承継時の金融支援の案内もある。",
    "eligibility": [
      "県内の中小企業者・小規模企業者"
    ],
    "industries": "all",
    "prefectures": [
      "岐阜県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "随時（令和8年度改正あり・要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.gifu.lg.jp/page/2522.html"
  },
  {
    "id": "gifu-startup-shien",
    "name": "岐阜県 スタートアップ支援補助金（岐阜県産業経済振興センター）",
    "provider": "岐阜県 産業イノベーション推進課／岐阜県産業経済振興センター",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "創業：補助率1/2（女性・障がい者は2/3）・上限200万円／創業5年未満の加速化補助金は上限300万円",
    "summary": "新規創業・第二創業者等の経費を補助。令和7年度の募集内容を確認（令和8年度は要確認）。",
    "eligibility": [
      "新規創業者・第二創業者",
      "創業5年未満の事業者（加速化補助金）"
    ],
    "industries": "all",
    "prefectures": [
      "岐阜県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は最新は要確認（令和7年度は4/28〜5/30）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.gifu.lg.jp/page/61575.html"
  },
  {
    "id": "gifu-city-dx-shikin",
    "name": "ぎふしDX促進資金",
    "provider": "岐阜市 商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "IT・デジタル",
    "amount": "要確認",
    "summary": "DX推進に取り組む事業者向けの市の制度融資。",
    "eligibility": [
      "市内中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "岐阜県"
    ],
    "cities": [
      "岐阜市"
    ],
    "stages": [
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.gifu.lg.jp/business/sangyoushinkou/1005687/1016313.html"
  },
  {
    "id": "gifu-city-dx-suishin",
    "name": "岐阜市中小企業等DX推進補助金",
    "provider": "岐阜市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "専門家派遣:1/2以内・年5万円上限、システム・機器導入:75万円超部分の1/2以内・上限20万円",
    "summary": "専門家派遣やシステム・機器導入などDX推進を補助する。",
    "eligibility": [
      "市内中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "岐阜県"
    ],
    "cities": [
      "岐阜市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.gifu.lg.jp/business/sangyoushinkou/1005687/1025648.html"
  },
  {
    "id": "gifu-city-jigyo-sozo",
    "name": "岐阜市事業創造支援補助金",
    "provider": "岐阜市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "要確認",
    "summary": "新たな事業に挑戦する市内事業者への補助金（令和8年度案内あり）。",
    "eligibility": [
      "市内事業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "岐阜県"
    ],
    "cities": [
      "岐阜市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.gifu.lg.jp/business/sangyoushinkou/1005760/1005777/index.html"
  },
  {
    "id": "gifu-city-mihonichi",
    "name": "岐阜市見本市等出展補助金",
    "provider": "岐阜市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2以内、上限10万円",
    "summary": "見本市等の出展料を補助する（今年度10件程度）。",
    "eligibility": [
      "市内中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "岐阜県"
    ],
    "cities": [
      "岐阜市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日～令和9年2月26日（予算枠到達で終了）",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.gifu.lg.jp/business/sangyoushinkou/1005760/1005777/1005779.html"
  },
  {
    "id": "gifu-city-shinsotsu-brand",
    "name": "岐阜市新卒人材採用ブランディング補助金",
    "provider": "岐阜市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "新卒人材採用のためのブランディング経費を補助する。",
    "eligibility": [
      "市内中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "岐阜県"
    ],
    "cities": [
      "岐阜市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.gifu.lg.jp/business/roudou/1023136.html"
  },
  {
    "id": "kakamigahara-city-josei-katsuyaku-hojo",
    "name": "各務原市女性活躍推進・職場環境整備補助金",
    "provider": "各務原市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "女性が働きやすい環境を整備する市内中小企業等の、専用設備の改修・設置やコンサルティング等の費用の一部を補助する。",
    "eligibility": [
      "各務原市内の中小企業者等",
      "女性の就労促進・活躍推進のための環境整備であること"
    ],
    "industries": "all",
    "prefectures": [
      "岐阜県"
    ],
    "cities": [
      "各務原市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度公募（詳細は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kakamigahara.lg.jp/shisei/zaisei/1022117.html"
  },
  {
    "id": "kakamigahara-city-monozukuri-datsutanso-hojo",
    "name": "各務原市ものづくり脱炭素推進事業補助金",
    "provider": "各務原市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "市内ものづくり企業の脱炭素化に向けた取組を支援する補助金。交付要綱が商工振興課のページに掲載されている。",
    "eligibility": [
      "各務原市内のものづくり中小企業",
      "脱炭素化に資する取組であること（詳細は要確認）"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "岐阜県"
    ],
    "cities": [
      "各務原市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kakamigahara.lg.jp/shisei/jorei/1008815/1008844/1008847.html"
  },
  {
    "id": "kakamigahara-city-monozukuri-matching-hojo",
    "name": "各務原市ものづくりビジネスマッチング支援事業補助金",
    "provider": "各務原市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "市内ものづくり企業のビジネスマッチングの取組を支援する補助金。",
    "eligibility": [
      "各務原市内のものづくり中小企業",
      "詳細は市の案内ページで要確認"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "岐阜県"
    ],
    "cities": [
      "各務原市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kakamigahara.lg.jp/shisei/shisaku/sangyo/1008446/1022027/1017705.html"
  },
  {
    "id": "ogaki-city-startup-shien-hojo",
    "name": "大垣市スタートアップ支援事業補助金",
    "provider": "大垣市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、上限15万円（1回限り）",
    "summary": "市内での新規創業または第二創業に係る経費の一部を補助する。交付決定後に発注・購入する経費が対象。",
    "eligibility": [
      "市内で令和9年2月26日までに新規創業または第二創業をする者",
      "市税等の滞納がないこと",
      "過去に本補助金を受給していないこと"
    ],
    "industries": "all",
    "prefectures": [
      "岐阜県"
    ],
    "cities": [
      "大垣市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜12月28日（当日消印有効）",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.ogaki.lg.jp/0000052972.html"
  },
  {
    "id": "tajimi-city-kigyo-shien-center",
    "name": "多治見市起業支援センター入居",
    "provider": "多治見市 商工観光課",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "創業を目指す人が入居できる市の起業支援センターで、事業立ち上げの支援を受けられる。",
    "eligibility": [
      "起業を目指す人または創業間もない事業者",
      "入居審査等の要件は市の案内で要確認"
    ],
    "industries": "all",
    "prefectures": [
      "岐阜県"
    ],
    "cities": [
      "多治見市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tajimi.lg.jp/kurashi/sangyo/shokogyo/kigyo/shiencenter/nyukyosha.html"
  },
  {
    "id": "tajimi-city-tajicon-followup-hojo",
    "name": "タジコン創業者フォローアップ補助金",
    "provider": "多治見市 産業観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2、上限100万円（市内の創業支援施設入居者・過去の利用者は上限50万円）",
    "summary": "たじみビジネスプランコンテスト応募プランで市内に創業・出店し、創業後1年以上の事業者の事業拡大を支援する。",
    "eligibility": [
      "タジコン応募プランに基づき市内で創業または出店していること",
      "創業後1年以上であること",
      "人件費・家賃など固定費は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "岐阜県"
    ],
    "cities": [
      "多治見市"
    ],
    "stages": [
      "early"
    ],
    "period": "要確認（年度ごとに募集）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tajimi.lg.jp/gyose/kakuka/sangyo-pub/tajicon-followup.html"
  },
  {
    "id": "shizuoka-chiiki-sosei-kigyo",
    "name": "静岡県 地域創生起業支援金",
    "provider": "静岡県／静岡県産業振興財団",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限200万円・補助率1/2以内",
    "summary": "地域課題解決を目的に県内で起業する方等を支援。",
    "eligibility": [
      "地域課題の解決を目指して県内で起業する方",
      "令和8年4月1日以降に起業"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は5/1〜6/10で募集終了。来年度は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.ric-shizuoka.or.jp/sougyou/shienkin/copy_shienkin.html"
  },
  {
    "id": "shizuoka-jigyo-shokei-shikin",
    "name": "静岡県 事業承継資金",
    "provider": "静岡県 商工金融課／静岡県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "事業承継",
    "amount": "限度額2.8億円／年1.6%以内（固定）",
    "summary": "後継者の株式取得や事業資産取得、M&A費用などの事業承継に必要な費用向け県制度融資。",
    "eligibility": [
      "経営承継円滑化法の認定、または支援機関の支援を受けた事業承継計画のある方"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "随時（要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.shizuoka.jp/sangyoshigoto/kigyoshien/seidoyushi/1003428/1028465.html"
  },
  {
    "id": "shizuoka-kaigyo-power-up",
    "name": "静岡県 開業パワーアップ支援資金",
    "provider": "静岡県 商工金融課／静岡県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額3,500万円／年1.5%以内",
    "summary": "県内で開業予定または開業5年未満の方向け県制度融資。新規創業者の保証料負担軽減あり（年度による）。",
    "eligibility": [
      "県内で事業を開始する予定の方、開業5年未満の事業者"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（保証料優遇の適用は令和8年度分を要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.shizuoka.jp/sangyoshigoto/kigyoshien/seidoyushi/1003428/1028455.html"
  },
  {
    "id": "shizuoka-shokibo-keieiryoku",
    "name": "静岡県 小規模企業経営力向上事業費補助金",
    "provider": "静岡県 経営革新・産業振興担当",
    "level": "prefecture",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "小規模企業の「新たな需要の開拓」「生産性の向上」に向けた工夫・改善の取組を支援。",
    "eligibility": [
      "県内の小規模企業"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度2次募集は5/11〜6/22で終了。来年度は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.shizuoka.jp/sangyoshigoto/kigyoshien/1047031/1028489.html"
  },
  {
    "id": "shizuoka-shuekiryoku",
    "name": "静岡県 中小企業等収益力向上（賃上げ環境整備）事業費補助金",
    "provider": "静岡県産業振興財団",
    "level": "prefecture",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "通常枠上限500万円・DX枠上限700万円（賃上げ要件で引上げあり）",
    "summary": "独自の技術やサービス展開を目指す中小企業等の取組を支援。",
    "eligibility": [
      "県内の中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は第1次(4/1〜5/15)・第2次(6/1〜6/30)で受付終了。来年度は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.ric-shizuoka.or.jp/keiei/shuekiryoku-chinage.html"
  },
  {
    "id": "fuji-city-anata-mo-tenshu",
    "name": "富士市 あなたも商店主事業（新規出店者募集）",
    "provider": "富士市 商業労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "開業がっちり応援コース最大150万円、開業プチサポートコース最大20万円",
    "summary": "中心市街地への新規出店者を支援する。令和8年度のがっちり応援コースの締切は7月31日。",
    "eligibility": [
      "中心市街地に新規出店する方"
    ],
    "industries": [
      "food",
      "retail",
      "beauty",
      "creative"
    ],
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "富士市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度のがっちり応援コース締切は7/31（プチサポートコースの受付と来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fuji.shizuoka.jp/1035100000/p004656.html"
  },
  {
    "id": "fuji-city-chusho-dx-suishin",
    "name": "富士市中小企業等DX推進事業支援補助金",
    "provider": "富士市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/2以内（他事業と併用時は50万円が限度。単独時の上限は要確認）",
    "summary": "中小企業等のDX推進の取組を支援する補助金。予算上限で一度受付終了し、再開と案内されている。",
    "eligibility": [
      "市内の中小企業等",
      "DX推進に取り組む事業"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "富士市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "受付再開（締切は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fuji.shizuoka.jp/1035070000/p007731.html"
  },
  {
    "id": "fuji-city-kaigyo-powerup-shikin",
    "name": "富士市 開業パワーアップ支援資金（利子補給）",
    "provider": "富士市 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "貸付限度額3,500万円、返済期間10年以内（利子補給率は要確認）",
    "summary": "静岡県の創業向け制度融資に市が上乗せで利子補給を行う。",
    "eligibility": [
      "創業および創業により行う事業に資金が必要な方"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "富士市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fuji.shizuoka.jp/1035070000/p004472.html"
  },
  {
    "id": "fuji-city-kasegu-chikara-kigyo",
    "name": "富士市稼ぐ力起業支援金",
    "provider": "富士市 産業政策課（Beパレットふじ）",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、限度額200万円",
    "summary": "社会的事業でデジタル技術を使い、市内で起業・事業承継・第二創業を行う人を支援する。事前にBeパレットふじへの相談が必須。",
    "eligibility": [
      "市内で起業・事業承継・第二創業を行う方",
      "デジタル技術を活用する社会的事業"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "富士市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度の公募は6/1〜6/30で終了（来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fuji.shizuoka.jp/1035070000/ka_ki.html"
  },
  {
    "id": "fuji-city-maruke-risihokyu",
    "name": "富士市 小規模事業者経営改善資金（マル経融資）利子補給",
    "provider": "富士市 産業政策課（富士商工会議所・富士市商工会）",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "貸付限度額2,000万円（利子補給率は要確認）",
    "summary": "日本政策金融公庫のマル経融資に対し、商工会議所・商工会を通じて市が利子補給を行う。",
    "eligibility": [
      "富士商工会議所または富士市商工会の経営指導を受けた小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "富士市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fuji.shizuoka.jp/1035070000/p004473.html"
  },
  {
    "id": "fujieda-city-chushokigyo-yushi-hokyukin",
    "name": "中小企業融資補給金(創業支援資金保証料補給・設備投資資金利子補給等)",
    "provider": "藤枝市 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業支援資金の保証料補給:一括払い時は保証料総額の45%。設備投資資金利子補給等の率は要確認",
    "summary": "県の創業支援資金融資を利用した創業者への信用保証料補給や、設備投資資金・小口資金の利子補給を行う。",
    "eligibility": [
      "市内の中小企業者(創業支援資金は県の創業支援資金融資を利用した市内の創業者)",
      "設備投資資金利子補給は市内で1年以上同一事業を営む中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "藤枝市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fujieda.shizuoka.jp/soshiki/sangyoshinko/sangyoseisaku/gyomu/10/yuusiseido/1445921595934.html"
  },
  {
    "id": "fujieda-city-office-ritchi-hojo",
    "name": "藤枝市オフィス等立地推進事業費補助金",
    "provider": "藤枝市 産業振興課(企業立地)",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "上限1,500万円(補助率等は要確認)",
    "summary": "本社機能や情報通信業などが市内に新たにオフィス等を設ける際の改修費・賃借料・設備費などを補助する。",
    "eligibility": [
      "市内に新たにオフィス等を設ける企業",
      "新設オフィス等に従業員を2人以上配置すること",
      "事前相談が必要"
    ],
    "industries": [
      "it",
      "professional",
      "creative"
    ],
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "藤枝市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fujieda.shizuoka.jp/soshiki/sangyoshinko/kigyo/gyomu/office_ritti/office_hojyo.html"
  },
  {
    "id": "fujieda-city-shoene-setsubi-shien-hojo",
    "name": "中小企業等省エネ設備導入支援補助金",
    "provider": "藤枝市 環境政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率4分の1・上限50万円(省エネ枠)／GX補助金関連は上限100万円。J-クレジット登録で最大25万円上乗せ",
    "summary": "静岡県の省エネ設備導入支援補助金等を利用して事業所の設備を省エネ設備へ更新する市内事業者に補助金を交付する。",
    "eligibility": [
      "市内事業所を持つ中小企業・個人事業主",
      "対象となる県補助金などを併用して省エネ設備へ更新すること"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "藤枝市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年7月1日から令和9年3月5日(予算650万円、なくなり次第終了)",
    "deadline": "2027-03-05",
    "priority": 8,
    "url": "https://www.city.fujieda.shizuoka.jp/soshiki/kankyosuido/kankyoseisaku/gyomu/2/kankyojigyousya/19691.html"
  },
  {
    "id": "iwata-city-fukugyo-kengyo-jinzai",
    "name": "磐田市副業・兼業人材活用促進事業費補助金",
    "provider": "磐田市 経済産業部 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "対象経費の2分の1以内、1人あたり上限24万円（年度内2人まで）",
    "summary": "副業・兼業の専門人材を活用する市内中小企業の経費を補助する。静岡県プロフェッショナル人材戦略拠点の利用等が必要。",
    "eligibility": [
      "磐田市内の中小企業",
      "副業・兼業人材または登録人材紹介会社との契約"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "磐田市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認（確認できたページの対象期間は令和7年度）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iwata.shizuoka.jp/sangyou_business/kigyou_shien/1011014/1010648.html"
  },
  {
    "id": "iwata-city-hanro-kaitaku-shien",
    "name": "販路開拓支援補助金",
    "provider": "磐田市 経済産業部 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "販路開拓事業は3分の1以内・上限30万円、展示会等出展は国内10万円・国外30万円",
    "summary": "市内中小企業者の新たな販売先確保の取組経費の一部を補助する。補助対象経費10万円以上が条件。",
    "eligibility": [
      "磐田市内に本社・工場・支店がある中小企業者等",
      "補助対象経費の総額10万円以上",
      "1年度1回かつ3年度で2回まで"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "磐田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（確認できた交付要領は令和7年度版）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iwata.shizuoka.jp/sangyou_business/kigyou_shien/1011014/1012218.html"
  },
  {
    "id": "iwata-city-kaigyo-power-up-riko",
    "name": "開業パワーアップ支援資金利子補給金",
    "provider": "磐田市 経済産業部 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "利子補給率 年1.5%、補給期間1年以内",
    "summary": "創業者や市内で創業しようとする人が制度融資を利用した際の利子の一部を市が補給する。",
    "eligibility": [
      "磐田市内で創業した人または創業しようとする人",
      "制度融資の利用"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "磐田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iwata.shizuoka.jp/sangyou_business/kigyou_shien/1002218/1002220.html"
  },
  {
    "id": "iwata-city-keizai-hendo-riko",
    "name": "経済変動対策貸付資金利子補給金制度",
    "provider": "磐田市 経済産業部 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "補給率0.45%（特別措置期間中は1.4%以内）、補給期間2年以内（特別措置中は3年以内）",
    "summary": "静岡県の制度融資を借りた市内事業者に、市が利子の一部を補給する。設備資金・運転資金が対象。特別措置は経済情勢により終了する場合がある。",
    "eligibility": [
      "磐田市内の中小企業者",
      "静岡県の経済変動対策貸付を利用していること"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "磐田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iwata.shizuoka.jp/sangyou_business/kigyou_shien/1002218/1002219.html"
  },
  {
    "id": "iwata-city-startup-kyososhi",
    "name": "磐田市スタートアップ共創型事業補助金",
    "provider": "磐田市 経済産業部 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率2分の1以内、上限100万円",
    "summary": "市内中小企業がスタートアップと協業して新事業に取り組む経費を補助する。令和8年度は5月12日募集開始、6月19日提出期限。",
    "eligibility": [
      "磐田市内の中小企業",
      "スタートアップとの協業による新事業"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "磐田市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度公募は終了（5/12〜6/19）。次回公募は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iwata.shizuoka.jp/sangyou_business/kigyou_shien/1011014/1016413.html"
  },
  {
    "id": "kakegawa-city-koguchi-shikin-yushi",
    "name": "中小企業支援策(小口資金)",
    "provider": "掛川市 産業労働政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額1企業700万円以内(掲載時点。利率等は要確認)",
    "summary": "小規模事業者向けの市の融資制度。運転・設備資金に利用できる。",
    "eligibility": [
      "市内の中小企業者・小規模事業者",
      "金融機関・保証協会の審査を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "掛川市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年(要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kakegawa.shizuoka.jp/gyosei/docs/9899.html"
  },
  {
    "id": "kakegawa-city-shoene-setsubi-hojo",
    "name": "中小企業等省エネ設備導入事業費補助金",
    "provider": "掛川市 環境政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率3分の1以内・上限50万円(令和7年度の公表内容。令和8年度は要確認)",
    "summary": "市内事業者が空調・給湯・換気・照明などを省エネ設備へ更新する費用を補助する。温室効果ガス排出量を5%以上削減できる設備が対象。",
    "eligibility": [
      "市内の中小企業者・個人事業主",
      "既存設備より温室効果ガス排出量を5%以上削減できること",
      "省エネ診断に基づく事業などの要件を満たすこと"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "掛川市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度の受付期間は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kakegawa.shizuoka.jp/gyosei/docs/421671.html"
  },
  {
    "id": "mishima-city-akitenpo-katsuyo-hojo",
    "name": "三島市空き店舗活用事業費補助金",
    "provider": "三島市 商工観光まちづくり課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "要確認",
    "summary": "市内の空き店舗を活用して出店する事業者を支援する補助制度。",
    "eligibility": [
      "三島市内の空き店舗を活用して出店すること",
      "詳細要件は市公式ページで要確認"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "三島市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（市公式ページ参照）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.mishima.shizuoka.jp/ipn059636.html"
  },
  {
    "id": "mishima-city-chiiki-jinzai-shien-hojo",
    "name": "三島市地域人材支援事業費補助金",
    "provider": "三島市 商工観光まちづくり課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "市内事業者の人材育成・人材確保の取組に対する補助制度。補助率・上限額は市公式ページで要確認。",
    "eligibility": [
      "三島市内の事業者",
      "人材の育成・確保の取組を行うこと"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "三島市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（市公式ページ参照）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.mishima.shizuoka.jp/page/31365.html"
  },
  {
    "id": "numazu-city-hanro-kaitaku-shien",
    "name": "沼津市中小企業販路開拓支援事業補助金",
    "provider": "沼津市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "新製品・新技術の展示会等への出展を支援する補助金。補助率・上限は要確認。",
    "eligibility": [
      "市内の中小企業者",
      "展示会等へ出展する事業"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "沼津市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.numazu.shizuoka.jp/business/yuchi/shoko/index.htm"
  },
  {
    "id": "numazu-city-it-office-shinshutsu",
    "name": "沼津市ITオフィス等進出事業費補助金",
    "provider": "沼津市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "建物賃借料1/2、通信回線使用料10/10（上限額は要確認）",
    "summary": "市内に新たにITオフィス等を賃借で開設する企業の費用を補助する。",
    "eligibility": [
      "市内に新たにITオフィス等を賃借して開設する企業"
    ],
    "industries": [
      "it",
      "creative"
    ],
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "沼津市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜12月28日",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.numazu.shizuoka.jp/business/yuchi/shoko/itoffice/index.htm"
  },
  {
    "id": "numazu-city-kaigyo-powerup-risihokyu",
    "name": "沼津市 開業パワーアップ支援資金等利子補給",
    "provider": "沼津市 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "市内で創業する方が創業資金を借りた場合に、利子の一部を補給する制度。",
    "eligibility": [
      "市内で創業する方",
      "対象の制度融資を利用した方"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "沼津市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://city.numazu.shizuoka.jp/business/yuchi/kigyousougyou/index.htm"
  },
  {
    "id": "numazu-city-maruke-risihokyu",
    "name": "沼津市 小規模事業者経営改善資金（マル経融資）利子補給",
    "provider": "沼津市 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "利子補給率年1.00%、補給期間12か月以内（貸付限度額2,000万円）",
    "summary": "商工会議所・商工会の推薦で日本政策金融公庫のマル経融資を受けた小規模事業者に利子補給を行う。",
    "eligibility": [
      "沼津商工会議所または沼津市商工会の推薦を受けた小規模事業者",
      "経営指導を6か月以上受けていること"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "沼津市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.numazu.shizuoka.jp/business/yuchi/shoko/syoukibo.htm"
  },
  {
    "id": "numazu-city-newbusiness-sosyutsu",
    "name": "沼津市ニュービジネス創出事業補助金",
    "provider": "沼津市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助対象経費の1/2以内、上限100万円",
    "summary": "経営革新計画に沿って新商品・新技術などを開発する事業を支援する。",
    "eligibility": [
      "経営革新計画に沿った新商品・新技術開発を行う市内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "沼津市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は二次募集（6/15〜7/17）まで終了。来年度は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.numazu.shizuoka.jp/business/yuchi/shoko/newbusiness/index.htm"
  },
  {
    "id": "shimada-city-chiiki-sangyo-shinko-hojo",
    "name": "島田市地域産業振興事業費補助金",
    "provider": "島田市 商工課・産業支援センター「おびサポ」",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "生産設備は補助率1/10以内・上限100万円、熱中症対策物品は1/2以内・上限5万円（費目により異なる）",
    "summary": "事業活動の近代化・合理化に取り組む中小企業者等の機械設備更新、労働環境改善、熱中症対策などの経費を補助する。",
    "eligibility": [
      "市内の中小企業者等",
      "工業系用途地域等で操業する製造業・建設業・運輸業等（要件あり）"
    ],
    "industries": [
      "manufacturing",
      "construction",
      "logistics"
    ],
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "島田市"
    ],
    "stages": [
      "established"
    ],
    "period": "年度ごとに募集（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.shimada.shizuoka.jp/gyosei-docs/tiikisangyouhojo.html"
  },
  {
    "id": "shimada-city-sogyo-hojo",
    "name": "島田市創業補助金",
    "provider": "島田市 商工課・産業支援センター「おびサポ」",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率2/3以内、上限50万円（中心市街地区域内での創業は60万円）",
    "summary": "市内で新たに創業する個人に、創業事務費・人材育成費・設備費・広報費などの一部を補助する。",
    "eligibility": [
      "令和8年4月1日以降、令和9年2月末日までに市内で創業する個人",
      "詳細は市公式ページで要確認"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "島田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度（創業期限は令和9年2月末日）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.shimada.shizuoka.jp/gyosei-docs/sougyouhojyokin.html"
  },
  {
    "id": "yaizu-city-akiten-kaishu-hojo",
    "name": "焼津駅周辺まちなか空き店舗等改修事業費補助金(改修費補助)",
    "provider": "焼津市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "対象経費の2分の1以内・上限50万円",
    "summary": "焼津駅周辺まちなか区域の空き店舗等へ出店する際の内外装改修費の一部を補助する。",
    "eligibility": [
      "焼津駅周辺まちなか区域の空き店舗等に出店する人(創業前も可)",
      "事前相談が必要"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "焼津市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "工事着工日・契約締結日から6か月以内か令和9年3月10日のいずれか早い日まで",
    "deadline": "2027-03-10",
    "priority": 8,
    "url": "https://www.city.yaizu.lg.jp/business/sangyo-shogyo/shien-hojo/kaisyu.html"
  },
  {
    "id": "yaizu-city-tayou-jinzai-kakuho-hojo",
    "name": "焼津市多様な人財確保事業費補助金",
    "provider": "焼津市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率2分の1以内・上限20万円",
    "summary": "外国人・高齢者・障害者・女性などを新たに雇用するための取組(採用サイト開設、求人サイト掲載、就業規則見直し、社内研修等)の経費を助成する。",
    "eligibility": [
      "市内の中小企業",
      "令和8年度に初めて実施する取組であること",
      "焼津公共職業安定所に事業所登録していること"
    ],
    "industries": "all",
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "焼津市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和9年2月26日まで(予算に達し次第終了)",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.yaizu.lg.jp/business/kigyo-shien/shien-hojo/tayou-koyosokusin.html"
  },
  {
    "id": "aichi-digital-dx",
    "name": "愛知県 中小企業デジタル化・DX促進補助金",
    "provider": "愛知県 デジタル技術活用担当",
    "level": "prefecture",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率：中小1/2以内、小規模2/3以内／上限200万円",
    "summary": "デジタルツール導入やコンサル・システム構築・改修費を補助。あいち産業DX推進コンソーシアム会員が対象。",
    "eligibility": [
      "あいち産業DX推進コンソーシアムに加入している県内企業"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度公募あり（期間は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.aichi.jp/press-release/aichi-pref-iot/digitalhojyokin-koubo2026.html"
  },
  {
    "id": "aichi-kakushin-jigyo",
    "name": "愛知県 革新事業創造事業費補助金",
    "provider": "愛知県 イノベーション企画担当",
    "level": "prefecture",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率1/2以内（中小企業2/3以内）・上限1,000万円",
    "summary": "DX等の重点分野での革新事業を支援。補助対象期間は2026年4月1日〜2027年3月20日。",
    "eligibility": [
      "県内で革新事業に取り組む事業者"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度分は採択・交付先決定済み。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.aichi.jp/press-release/kakushinsaitaku2026.html"
  },
  {
    "id": "aichi-shogyo-shinko",
    "name": "愛知県 商業振興事業費補助金（地域商業活動活性化事業）",
    "provider": "愛知県 商業担当",
    "level": "prefecture",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "上限90万円（対象経費の下限20万円）",
    "summary": "商店街等の団体が行う商業活動（創業支援・人材育成など）を支援。団体向け。",
    "eligibility": [
      "商店街振興組合・団体等"
    ],
    "industries": [
      "retail"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度概要あり（募集期間は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.aichi.jp/soshiki/shogyo/0000070144.html"
  },
  {
    "id": "aichi-sogyo-shikin",
    "name": "愛知県中小企業融資制度 創業等支援資金",
    "provider": "愛知県 金融担当／愛知県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認（資金メニューのリーフレットで確認）",
    "summary": "「創業」「再挑戦」区分のある県制度融資。スタートアップ向けの制度融資もある。",
    "eligibility": [
      "創業予定または創業間もない中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.aichi.jp/soshiki/kinyu/yuusi-menu.html"
  },
  {
    "id": "aichi-startup-sogyo",
    "name": "あいちスタートアップ創業支援事業費補助金（起業支援金）",
    "provider": "愛知県 スタートアップ推進課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限200万円・補助率1/2以内",
    "summary": "県内で開業届を出す個人事業主や会社設立する方の創業経費を補助する。",
    "eligibility": [
      "県内で開業届を提出する個人事業主、または県内で会社を設立する方"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は募集済の見込み（受付期間は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.aichi.jp/soshiki/startup/8-hojo0401.html"
  },
  {
    "id": "anjo-city-ganbaru-chusho-ouen",
    "name": "がんばる中小企業応援事業補助金",
    "provider": "安城市 商工課（安城ビジネスコンシェルジュ）",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2（創業支援事業は2/3）、区分ごとに上限あり（人材育成15万円、展示会出展・特許・販売促進等20万円、現場改善相談・BCP策定40万円、創業支援50万円）",
    "summary": "中小企業者の人材育成、人材確保、展示会出展、特許申請、販売促進、新規事業展開などの経費の一部を補助する。創業2年以内で特定創業支援等事業の証明を受けた新規開業者向けの区分もある。",
    "eligibility": [
      "安城市内の中小企業者",
      "創業支援区分は創業2年以内で特定創業支援等事業の証明書を受けた人",
      "市税の滞納がないこと（要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "安城市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（年度ごとに公式ページで確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.anjo.aichi.jp/zigyo/syoko/ganbaru.html"
  },
  {
    "id": "anjo-city-monodukuri-digital",
    "name": "安城市ものづくりデジタル化推進事業補助金",
    "provider": "安城市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/2、上限100万円",
    "summary": "製造業者の機器購入、システム構築、付属品購入、設置・改修などデジタル化の経費の一部を補助する。",
    "eligibility": [
      "日本標準産業分類の製造業を営み、市内に本店・住所地等がある事業者",
      "がんばる中小企業応援事業補助金の現場改善相談事業の交付決定を受けていること"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "安城市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認（令和8年度の募集期間は確認できず）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.anjo.aichi.jp/zigyo/syoko/digital/annjousidigitalkasuisinnjigyo.html"
  },
  {
    "id": "anjo-city-shinyohosho-hojo",
    "name": "信用保証料補助制度",
    "provider": "安城市 商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認（融資種別ごとに年度上限あり）",
    "summary": "愛知県信用保証協会の保証で融資を受けた中小企業者が支払った信用保証料の一部を補助する。創業等支援資金なども対象に含まれる。",
    "eligibility": [
      "市内の中小企業者",
      "愛知県信用保証協会の保証付き融資を利用した人",
      "対象融資の詳細は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "安城市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.anjo.aichi.jp/zigyo/syoko/chusho/shinyohosho.html"
  },
  {
    "id": "ichinomiya-city-akitenpo",
    "name": "一宮市空き店舗利活用支援補助金",
    "provider": "一宮市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/2（特定創業支援を受けた事業者は2/3）、初期費用等と賃借料合わせて上限80万円",
    "summary": "商店街の空き店舗で開業する事業者の初期費用等と賃借料を補助する。",
    "eligibility": [
      "商店街の空き店舗で開業する事業者",
      "申請年度末までに事業開始"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "一宮市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ichinomiya.aichi.jp/katsuryokusouzou/sangyoushinkou/1044297/1044298/1055136.html"
  },
  {
    "id": "ichinomiya-city-boeki-shinko",
    "name": "一宮市貿易振興事業等補助金",
    "provider": "一宮市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "国内見本市：定額5万円、海外見本市：1/4以内（1回上限30万円）",
    "summary": "見本市・展示会の出展料を補助する。",
    "eligibility": [
      "市内に主たる事務所がある中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "一宮市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ichinomiya.aichi.jp/katsuryokusouzou/sangyoushinkou/1044297/1044298/1016015.html"
  },
  {
    "id": "ichinomiya-city-sdgs-shien",
    "name": "一宮市SDGs推進支援補助金",
    "provider": "一宮市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/2、上限100万円",
    "summary": "生産・受注管理システム導入や繊維産業の生産設備移設等の費用を補助する。",
    "eligibility": [
      "製造業の小規模企業者等"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "一宮市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ichinomiya.aichi.jp/katsuryokusouzou/sangyoushinkou/1044297/1044298/1065777.html"
  },
  {
    "id": "ichinomiya-city-shouene-setsubi",
    "name": "一宮市中小企業省エネ設備導入補助金",
    "provider": "一宮市 環境政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/2、上限100万円",
    "summary": "省エネ診断で提案された対策に係る設備更新・改良費の一部を補助する。",
    "eligibility": [
      "市内の中小企業",
      "省エネ診断を受けていること"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "一宮市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "事業完了は2027年1月31日まで（予算に達し次第締切）",
    "deadline": "2027-01-31",
    "priority": 8,
    "url": "https://www.city.ichinomiya.aichi.jp/kankyou/kankyouseisaku/1043982/1043983/1043984/1066100.html"
  },
  {
    "id": "ichinomiya-city-sogyo-shikin-joseikin",
    "name": "一宮市 創業資金助成（融資に伴う助成）",
    "provider": "一宮市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "融資金額の2％（認定特定創業支援を受けた場合2.2％）",
    "summary": "経済環境適応資金の創業等支援資金の利用者に、融資額の一部を助成する。",
    "eligibility": [
      "創業等支援資金の利用者",
      "融資実行日から60日以内に申請"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "一宮市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（掲載が古いため最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ichinomiya.aichi.jp/katsuryokusouzou/sangyoushinkou/1044297/1044298/1010591/1020487.html"
  },
  {
    "id": "inuyama-city-jigyo-keizoku-shien-hojo",
    "name": "犬山市事業継続支援補助金",
    "provider": "犬山市 経済環境部 産業課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率2分の1、専門家支援は上限50万円、設備投資は上限100万円（両方申請の場合の合計上限100万円）",
    "summary": "経営計画書に基づく専門家による支援や設備投資の費用の一部を補助する。市の無料経営相談（中小企業診断士）の利用が必要。",
    "eligibility": [
      "市内の中小企業者・小規模企業者・個人事業者",
      "市が定める経営計画書を作成すること",
      "市の無料経営相談を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "犬山市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度分。ページ上は専門家支援が令和9年2月1日まで、設備投資が令和8年11月30日までとの記載だが、予算上限到達で受付終了の記載もあり要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.inuyama.aichi.jp/jigyo/kougyou/1007848.html"
  },
  {
    "id": "inuyama-city-sangyo-shinko-hojo",
    "name": "犬山市産業振興補助金",
    "provider": "犬山市 経済環境部 産業課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率2分の1以内（小規模企業者の設備投資等は3分の2以内の年度あり・要確認）、同一事業者1年度あたり上限40万円",
    "summary": "人材育成、展示会出展、対面式雇用支援、就職情報サイト等活用、雇用促進の5事業を対象に、市内中小企業の取組費用の一部を補助する。令和8年度は予算残りが少なく、上限到達で受付終了。",
    "eligibility": [
      "市内の中小企業者",
      "市税の滞納がないこと",
      "事業ごとの要件（雇用促進事業は小規模企業者限定など）を満たすこと"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "犬山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度分。予算上限に達し次第受付終了",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.inuyama.aichi.jp/jigyo/kougyou/1005386.html"
  },
  {
    "id": "inuyama-city-sogyo-shien-hojo",
    "name": "犬山市創業支援補助金",
    "provider": "犬山市 経済環境部 産業課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率2分の1以内、上限100万円（移住者加算：引越費用上限50万円、家賃または不動産購入費上限60万円）",
    "summary": "市内で創業予定の方に、店舗・事業所の内外装工事費、設備費、官公庁への申請費用、広報費の一部を補助する。",
    "eligibility": [
      "市内で創業予定であること",
      "3年以上事業を継続する予定であること",
      "補助対象経費の合計が100万円を超えること"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "犬山市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（公式ページ参照）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.inuyama.aichi.jp/jigyo/kougyou/1010682.html"
  },
  {
    "id": "kariya-city-kyujin-joho-hasshin",
    "name": "刈谷市中小企業求人情報発信支援事業補助金",
    "provider": "刈谷市 商工業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "対象経費の2分の1、1年度につき上限40万円",
    "summary": "就職情報サイトへの掲載費や成功報酬型人材紹介サービスの利用費を補助する。同一年度内の併用も可能。",
    "eligibility": [
      "刈谷市内の中小企業者",
      "就職情報サイト掲載または成功報酬型人材紹介の利用"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "刈谷市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kariya.lg.jp/sangyo/yushi/1011847/1006260.html"
  },
  {
    "id": "kariya-city-mihonichi-shuttenshien",
    "name": "刈谷市中小企業見本市等出展支援事業補助金",
    "provider": "刈谷市 商工業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "出展料の2分の1、同一事業者1年度上限20万円",
    "summary": "販路拡大や事業提携先の開拓を目的とした見本市・展示会への出展費用の一部を補助する。",
    "eligibility": [
      "刈谷市内の中小企業者",
      "見本市・展示会への出展"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "刈谷市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kariya.lg.jp/sangyo/yushi/1011846/1006270.html"
  },
  {
    "id": "kariya-city-shinyo-hosyoryo-hojo",
    "name": "刈谷市信用保証料補助制度",
    "provider": "刈谷市 商工業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "保証料の50%・80%・100%（制度により異なる）、同一年度の限度額20万円または40万円",
    "summary": "愛知県信用保証協会の保証付き融資を受けた市内中小企業者に、必要となった信用保証料を補助する。",
    "eligibility": [
      "刈谷市内の中小企業者",
      "愛知県信用保証協会の保証による融資を受けたこと"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "刈谷市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kariya.lg.jp/sangyo/yushi/1011851/1006261.html"
  },
  {
    "id": "kariya-city-shokibo-setsubi-toshi",
    "name": "刈谷市小規模企業者設備投資促進補助金",
    "provider": "刈谷市 商工業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率5%（経営革新計画に基づく更新は10%）、上限500万円",
    "summary": "小規模企業者の設備更新費用の一部を補助する。申請受付は令和8年4月1日から令和11年3月31日で、予算がなくなり次第終了。",
    "eligibility": [
      "刈谷市内の小規模企業者",
      "設備の更新時期が令和7年1月2日〜令和10年1月1日"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "刈谷市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年4月1日〜令和11年3月31日（予算がなくなり次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kariya.lg.jp/sangyo/yushi/1011845/1006271.html"
  },
  {
    "id": "kariya-city-sogyosha-shien",
    "name": "刈谷市創業者支援事業補助金",
    "provider": "刈谷市 商工業振興課（刈谷商工会議所と連携）",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "総額上限100万円（特定創業支援等事業の認定を受けた場合120万円）。市外在住者は限度額が半額",
    "summary": "創業時の事業所賃借料、法人登記等経費、販売促進費、店舗改装費などの初期費用を補助する。創業から3年以内に廃業した場合は返還を求められることがある。",
    "eligibility": [
      "市内に主たる事業所を置く予定の個人、または市内に本店を置く会社を設立する予定の人",
      "刈谷商工会議所の創業支援を受けていること",
      "事業計画書は着手日または法人設立日の14日前までに提出"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "刈谷市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kariya.lg.jp/sangyo/yushi/1022171/1006265.html"
  },
  {
    "id": "kasugai-city-crowdfunding-joseikin",
    "name": "春日井市クラウドファンディング事業助成金",
    "provider": "春日井市 産業振興課",
    "level": "municipality",
    "type": "助成金",
    "cat": "販路開拓・PR",
    "amount": "対象経費の20％以内、年50万円限度",
    "summary": "購入型クラウドファンディング等を行う中小企業者の経費を助成する。",
    "eligibility": [
      "市内の中小企業者",
      "春日井商工会議所の専門家派遣による診断を受けて実施"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "春日井市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kasugai.lg.jp/business/kigyo/hanro/1034125.html"
  },
  {
    "id": "kasugai-city-kenshu-joseikin",
    "name": "春日井市研修事業助成金",
    "provider": "春日井市 産業振興課",
    "level": "municipality",
    "type": "助成金",
    "cat": "人材・雇用",
    "amount": "受講料の20％以内、年30万円限度（1事業5万円）",
    "summary": "公的・民間研修の受講料を助成する。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "春日井市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kasugai.lg.jp/business/kigyo/jinzaiikusei/kenshu.html"
  },
  {
    "id": "kasugai-city-shokibo-yushi-joseisei",
    "name": "春日井市小規模企業等振興資金融資助成制度",
    "provider": "春日井市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "信用保証料の助成：通常資金90％、小口資金100％、上限50万円",
    "summary": "市の融資制度利用時の信用保証料を助成する。",
    "eligibility": [
      "市内の小規模企業等",
      "対象融資の利用者"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "春日井市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kasugai.lg.jp/business/kigyo/yuusi/syokogyoyusi.html"
  },
  {
    "id": "kasugai-city-shushoku-site-joseikin",
    "name": "春日井市就職支援サイト掲載助成事業補助金",
    "provider": "春日井市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "就職情報サイトに求人情報を掲載する（掲載期間1年以内）市内事業者に補助する。",
    "eligibility": [
      "市内の事業者"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "春日井市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kasugai.lg.jp/business/kigyo/jinzaikakuho/1016952.html"
  },
  {
    "id": "kasugai-city-sogyo-jigyo-hojo",
    "name": "春日井市創業事業補助金",
    "provider": "春日井市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助対象経費の1/2、上限30万円",
    "summary": "登記等の書類作成費、創業時の事業所工事費、1年間の広報費などを補助する。",
    "eligibility": [
      "市内に住所・事業所を持つ個人または市内に本店を置く会社",
      "認定特定創業支援等事業の支援を受けていること",
      "創業から5年以内に申請"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "春日井市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日以後の申請に改正要綱を適用（受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kasugai.lg.jp/business/kigyo/1009878/1019695.html"
  },
  {
    "id": "komaki-city-digital-shien",
    "name": "小牧市中小企業デジタル化支援補助金",
    "provider": "小牧市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/2、上限100万円",
    "summary": "生産性向上や企業秘密の保護のため、デジタル技術やサイバーセキュリティ対策を導入する経費の一部を補助する。ウェブサイト・ECサイト導入費は対象外。",
    "eligibility": [
      "市内の中小企業者",
      "デジタル技術またはサイバーセキュリティ対策を導入すること",
      "予算執行状況の確認が必要"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "小牧市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（予算がなくなり次第終了の可能性あり）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.komaki.aichi.jp/admin/soshiki/chiikikassei/syoukou/1/6/2/40561.html"
  },
  {
    "id": "komaki-city-ec-site-donyu",
    "name": "小牧市中小企業ECサイト導入支援補助金",
    "provider": "小牧市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "上限20万円（補助率は要確認）",
    "summary": "自社ECサイトの開設や改修に係る外部委託費の一部を補助する。モール型ECサイトへの登録は対象外。",
    "eligibility": [
      "市内の中小企業者",
      "自社ECサイトを新規開設または改修すること"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "小牧市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.komaki.aichi.jp/admin/soshiki/chiikikassei/syoukou/1/6/2/40668.html"
  },
  {
    "id": "komaki-city-hanro-kaitaku",
    "name": "小牧市中小企業販路開拓支援補助金",
    "provider": "小牧市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "小間料の1/2、上限50万円",
    "summary": "技術・製品の販路拡大と新規需要開拓のため、展示会等に出展する事業者の経費の一部を補助する。",
    "eligibility": [
      "市内の中小企業者・小規模事業者",
      "展示会等へ出展すること"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "小牧市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.komaki.aichi.jp/admin/soshiki/chiikikassei/syoukou/1/6/2/9060.html"
  },
  {
    "id": "komaki-city-jiba-sanpin-sosyutsu",
    "name": "小牧市中小企業地場産品創出支援補助金",
    "provider": "小牧市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率1/2、上限100万円",
    "summary": "市内での新たな商品開発・製造と、EC市場・ふるさと納税市場への進出に向けた設備導入経費の一部を補助する。認定申請後に設備を導入する流れ。",
    "eligibility": [
      "市内で地場産品を開発・製造する中小企業者",
      "認定を受けた後に設備を導入すること",
      "予算執行状況により受付できない場合あり"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "小牧市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（予算がなくなり次第終了の可能性あり）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.komaki.aichi.jp/admin/soshiki/chiikikassei/syoukou/1/6/2/44651.html"
  },
  {
    "id": "nishio-city-akitenpo-katsuyo-hojo",
    "name": "西尾市空き店舗等活用事業補助金",
    "provider": "西尾市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率2/3、上限200万円",
    "summary": "西尾駅周辺の商店街などの空き店舗を活用して出店する事業者の店舗改装費の一部を補助する。",
    "eligibility": [
      "中心市街地の空き店舗等を活用して出店すること",
      "交付申請前に着手していない事業であること"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "西尾市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度分（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nishio.aichi.jp/shisei/machi/1008986/1009540.html"
  },
  {
    "id": "nishio-city-shinki-kaigyo-ouen-hojo",
    "name": "西尾市新規開業者応援補助金",
    "provider": "西尾市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "日本政策金融公庫の新規開業関連融資額の1%、年度内上限5万円",
    "summary": "日本政策金融公庫の新規開業関連融資を受けた新規開業者に、融資額の一部を補助する。",
    "eligibility": [
      "新たに事業を始める方または開業後1年以内の方",
      "市内に本社・住所地等があること",
      "日本政策金融公庫の新規開業関連融資を受けていること"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "西尾市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nishio.aichi.jp/sangyo/shinko/1004949/1003048.html"
  },
  {
    "id": "okazaki-city-chusho-hosyoryo",
    "name": "岡崎市中小企業事業資金保証料補助金",
    "provider": "岡崎市 産業労働部 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "マル岡・振・振小などの市融資あっせん制度を利用した場合の信用保証料を補助する。",
    "eligibility": [
      "市の融資あっせん制度（マル岡、振、振小）の利用者"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "岡崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.okazaki.lg.jp/1400/1404/1415/p034319.html"
  },
  {
    "id": "okazaki-city-monozukuri-shien",
    "name": "岡崎ものづくり支援補助金（見本市出展・共同研究・知財取得等）",
    "provider": "岡崎市 商工労政課ものづくり支援係／岡崎ものづくり推進協議会",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "共同研究・依頼試験、見本市出展、専門家派遣、知的財産権取得などの費用を補助する。",
    "eligibility": [
      "市内のものづくり企業"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "岡崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.okazaki.lg.jp/1550/1565/1627/p027948.html"
  },
  {
    "id": "okazaki-city-sogyo-hosyoryo",
    "name": "岡崎市創業資金保証料補助金",
    "provider": "岡崎市 産業労働部 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "保証料の45%（上限20万円）",
    "summary": "愛知県経済環境適応資金（創業等支援資金）で創業した方の信用保証料を補助する。",
    "eligibility": [
      "愛知県経済環境適応資金（創業等支援資金）を利用して創業した方",
      "市内で創業"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "岡崎市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "融資実行日から60日以内に申請（令和8年度要綱あり）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.okazaki.lg.jp/1400/1404/1415/p034319.html"
  },
  {
    "id": "okazaki-city-sogyo-risokyu",
    "name": "岡崎市創業資金利子補給補助金",
    "provider": "岡崎市 産業労働部 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "返済2〜7回目の利子の45%（上限20万円）、ウィズ認証取得で60%",
    "summary": "日本政策金融公庫の創業融資を受けた方に利子の一部を補助する。",
    "eligibility": [
      "新たに事業を始める方または開業5年未満",
      "市内に住所（本店）と主たる事業所がある"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "岡崎市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "2回目の利子支払日までに申請",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.okazaki.lg.jp/1400/1404/1415/p034319.html"
  },
  {
    "id": "toyohashi-city-kigyo-shien-hojo",
    "name": "豊橋市 起業支援事業費補助金",
    "provider": "豊橋市 産業部 商工業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2（上限30万円。資料により異なるため要確認）",
    "summary": "市内で起業して1年以内の商工業者が、とよはし創業プラットホーム参画機関の指導・助言を受けて行う創業経費を補助する。",
    "eligibility": [
      "市内で起業して1年以内の商工業者",
      "とよはし創業プラットホーム参画機関から事業計画の指導・助言を受けていること"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊橋市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toyohashi.lg.jp/15738.htm"
  },
  {
    "id": "toyohashi-city-machinaka-incubation",
    "name": "豊橋市 まちなかインキュベーション補助金",
    "provider": "豊橋市 まちなか活性課・(株)豊橋まちなか活性化センター",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "賃借料・改装費の一部（業種により補助率・上限が異なる。要確認）",
    "summary": "中心市街地の空き店舗に出店する新規創業者等の賃借料や改装費を補助する。",
    "eligibility": [
      "中心市街地エリア内の空き店舗に新規出店する創業者等",
      "補助対象期間は1店舗あたり2年以内"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊橋市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toyohashi.lg.jp/53752.htm"
  },
  {
    "id": "toyohashi-city-new-business-crowdfunding",
    "name": "豊橋市新ビジネスチャレンジ応援補助金（クラウドファンディング）",
    "provider": "豊橋市 産業部 商工業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "クラウドファンディングの手数料などを補助し、新たな事業展開を支援する。",
    "eligibility": [
      "継続して1年以上事業を営んでいる市内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊橋市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toyohashi.lg.jp/50215.htm"
  },
  {
    "id": "toyohashi-city-new-business-digital",
    "name": "豊橋市新ビジネスチャレンジ応援補助金（デジタル化）",
    "provider": "豊橋市 産業部 商工業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認",
    "summary": "市内事業者のデジタル化に要する費用の一部を補助する。",
    "eligibility": [
      "継続して1年以上事業を営んでいる市内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊橋市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toyohashi.lg.jp/54315.htm"
  },
  {
    "id": "toyokawa-city-challenge-hanro-kaitaku-hojo",
    "name": "チャレンジとよかわ活性化事業（販路開拓支援事業）",
    "provider": "豊川市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2、上限10万円（1事業所年1回）",
    "summary": "名古屋市・県外・海外などで開かれる展示会への出展費用の一部を補助する。",
    "eligibility": [
      "市内の事業者",
      "展示会開催前に交付決定を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊川市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（出展前の申請が必要）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toyokawa.lg.jp/soshiki/sangyokankyo/shokokanko/2/6/5/3/3750.html"
  },
  {
    "id": "toyokawa-city-challenge-keiei-kakushin-hojo",
    "name": "チャレンジとよかわ活性化事業（経営革新支援事業）",
    "provider": "豊川市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率1/2、上限50万円（1事業所1回限り）",
    "summary": "経営革新計画の承認を受けた市内事業者が行う事業の経費の一部を補助する。",
    "eligibility": [
      "経営革新計画の承認を受けた市内の中小企業・個人事業主",
      "市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊川市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（事前相談が必要）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toyokawa.lg.jp/soshiki/sangyokankyo/shokokanko/2/6/5/3/3748.html"
  },
  {
    "id": "toyokawa-city-challenge-sogyo-hojo",
    "name": "チャレンジとよかわ活性化事業費補助金（創業支援事業）",
    "provider": "豊川市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率2/3、上限100万円（中心市街地などでは拡充あり）",
    "summary": "創業にかかる店舗・事務所の内外装工事費や機械装置・備品の調達費の一部を補助する。",
    "eligibility": [
      "市内に住民票があり創業計画を作成していること",
      "特定創業支援事業の指導を1か月以上かつ4回以上受け市の証明を得ること",
      "フランチャイズ方式でなく市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊川市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（事前相談が必要）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toyokawa.lg.jp/soshiki/sangyokankyo/shokokanko/2/6/3/3747.html"
  },
  {
    "id": "toyota-city-jinzai-katsuyaku",
    "name": "豊田市人材活躍支援補助金",
    "provider": "豊田市 産業部",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認（事業ごとに異なる）",
    "summary": "人材育成・人材確保・副業人材活用・事業承継/M&Aの4事業を支援する。",
    "eligibility": [
      "市内の中小企業者（全業種）"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度：4〜9月開始分は4/1〜8/31受付。以降分は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toyota.aichi.jp/sangyo/sogyokeiei/1073280/1074810/index.html"
  },
  {
    "id": "toyota-city-keieiryoku-kyoka",
    "name": "豊田市経営力強化支援補助金",
    "provider": "豊田市 産業部",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "販路拡大、BCP策定、サイバーセキュリティ診断の費用を補助する。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜令和9年2月28日",
    "deadline": "2027-02-28",
    "priority": 8,
    "url": "https://www.city.toyota.aichi.jp/sangyo/sogyokeiei/1073279/1074798/index.html"
  },
  {
    "id": "toyota-city-monozukuri-innovation",
    "name": "豊田市ものづくりイノベーション創出補助金（オープンイノベーション実証枠）",
    "provider": "豊田市 産業部",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率4/5（上限200万円）",
    "summary": "市内企業がスタートアップ等と連携して行う新規事業・実証を支援する。",
    "eligibility": [
      "市内の事業者",
      "スタートアップ等と連携する事業"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年7月1日〜12月25日",
    "deadline": "2026-12-25",
    "priority": 8,
    "url": "https://www.city.toyota.aichi.jp/pressrelease/1074699/1075948.html"
  },
  {
    "id": "toyota-city-sangyo-powerup",
    "name": "豊田市産業パワーアップ支援補助金",
    "provider": "豊田市 産業部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "売上向上につながる事業転換・事業拡大・業務効率化の取組を支援する。",
    "eligibility": [
      "採択申請時点で1年以上市内で事業を営む中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊田市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度：一次公募4月、二次公募8月（受付終了の可能性、最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toyota.aichi.jp/jigyousha/shogyoshinko/1064321.html"
  },
  {
    "id": "toyota-city-sogyo-hosyoryo",
    "name": "豊田市 市内創業者資金繰り支援制度（環創 信用保証料補助）",
    "provider": "豊田市 産業部",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "保証料の75%以内（上限50万円）",
    "summary": "愛知県経済環境適応資金（創業等支援資金）の信用保証料を補助する。",
    "eligibility": [
      "市内創業者",
      "愛知県経済環境適応資金（創業等支援資金）の利用者"
    ],
    "industries": "all",
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.toyota.aichi.jp/sangyo/sogyokeiei/1076532/1073358/1024089.html"
  },
  {
    "id": "mie-incubation-shisetsu",
    "name": "三重県 みえインキュベーション施設整備補助金",
    "provider": "三重県 雇用経済部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限1,000万円・補助率1/2",
    "summary": "起業・創業の拠点となるインキュベーション施設の整備費を補助。",
    "eligibility": [
      "インキュベーション施設を整備する事業者"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度は4/24〜5/22で受付終了。来年度は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.mie.lg.jp/TOPICS/m0360800132.htm"
  },
  {
    "id": "mie-kaigai-business",
    "name": "三重県 海外ビジネス展開支援補助金",
    "provider": "三重県 雇用経済部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "海外ビジネス展開を行う県内事業者を支援する令和8年度の補助金。",
    "eligibility": [
      "県内の中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度公募あり（期間は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.mie.lg.jp/TOPICS/m0031900115.htm"
  },
  {
    "id": "mie-kigyo-shienkin",
    "name": "三重県起業支援金",
    "provider": "三重県 雇用経済部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限100万円・補助率1/2以内",
    "summary": "県外から移住してデジタル技術を活用し起業する方等への支援金。",
    "eligibility": [
      "県外から移住して起業する方等",
      "デジタル技術を活用した起業"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は7/24〜9/8で受付終了。来年度は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.mie.lg.jp/TOPICS/m0360800141.htm"
  },
  {
    "id": "mie-sogyo-saichosen-shikin",
    "name": "三重県 創業・再挑戦アシスト資金",
    "provider": "三重県 雇用経済部／三重県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額3,500万円・期間10年以内",
    "summary": "創業者・再挑戦者向けの県制度融資。",
    "eligibility": [
      "県内に主たる事業所を有する、または設置しようとする創業者等"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.mie.lg.jp/SHINSAN/HP/77437022725.htm"
  },
  {
    "id": "mie-startup-shien",
    "name": "三重県スタートアップ支援補助金",
    "provider": "三重県 雇用経済部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限300万円・補助率2/3以内",
    "summary": "スタートアップの事業立ち上げ・成長を支援する補助金。",
    "eligibility": [
      "県内のスタートアップ"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [],
    "stages": [
      "early"
    ],
    "period": "令和8年度は6/2〜7/22で受付終了。来年度は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.mie.lg.jp/TOPICS/m0360800137.htm"
  },
  {
    "id": "ise-city-sogyo-iten-sokushin",
    "name": "伊勢市創業・移転促進補助金",
    "provider": "伊勢市 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "要確認（募集要領に記載。民間情報では補助率1/2・上限100万円程度）",
    "summary": "市内での創業や市外からの本店移転、事業承継にかかる経費の一部を補助する。申請前に商工労政課への事前連絡が必要。",
    "eligibility": [
      "市内で創業する個人・中小企業者・NPO法人",
      "市外から本店等を市内に移す個人・法人",
      "事前連絡・事前相談を行うこと"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "伊勢市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時受付（予算額に達し次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ise.mie.jp/sangyo/syoukou/sangyoshien/1002972.html"
  },
  {
    "id": "ise-city-sogyo-saichosen-risoku",
    "name": "創業・再挑戦アシスト資金利子補給補助金",
    "provider": "伊勢市 商工労政課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "創業や再挑戦のための資金を借り入れた事業者に対し、利子の一部を補給する制度。",
    "eligibility": [
      "市内で創業または再挑戦する事業者",
      "対象の融資を利用していること（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "伊勢市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ise.mie.jp/sangyo/syoukou/sangyoshien/1009569/1009573.html"
  },
  {
    "id": "kuwana-city-kigyo-ricchi-shorei",
    "name": "桑名市企業立地奨励制度（立地奨励金・定住促進奨励金）",
    "provider": "桑名市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "立地奨励金：固定資産税相当額の1年目100%・2年目75%・3年目50%（年間限度1億円）。定住促進奨励金：新規雇用の市内在住従業員1人あたり30万円（要確認）",
    "summary": "市内に製造業の工場等を新設・増設・移転する事業者に奨励金を交付する。指定企業は新規雇用者に対する定住促進奨励金も受けられる。",
    "eligibility": [
      "製造業の新設・増設・移転であること",
      "投下固定資産額が中小企業で1億円以上など条例の要件を満たすこと",
      "市の指定を受けること"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "桑名市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kuwana.lg.jp/shoko/shigoto/kigyoushien/27-24205-243.html"
  },
  {
    "id": "kuwana-city-risihokyu-seido",
    "name": "桑名市利子補給制度",
    "provider": "桑名市 商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "利子補給率：償還利子の約定年率の2分の1または年1.0%のいずれか低い率",
    "summary": "小規模事業資金、創業・再挑戦アシスト資金、マル経、衛経などの融資を受けた市内事業者に、融資利子の一部を補給する。",
    "eligibility": [
      "対象融資を利用していること",
      "市内に主たる事業所があるか設置予定であること",
      "市税を滞納していないこと"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "桑名市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "毎年1月から2月に申請受付予定（年度ごとに要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kuwana.lg.jp/shoko/shigoto/kigyoushien/27-78224-280.html"
  },
  {
    "id": "kuwana-city-sogyo-shien-jigyo-keikaku",
    "name": "桑名市創業支援事業計画（くわな創業支援ゆめはまねっと）",
    "provider": "桑名市 商工課・桑名商工会議所",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "要確認（特定創業支援等事業を受けた方は会社設立時の登録免許税が50%軽減、創業関連保証の枠拡充）",
    "summary": "市・商工会議所・金融機関等が連携し、創業相談や創業塾などを提供する。特定創業支援等事業の証明で登録免許税の軽減等を受けられる。",
    "eligibility": [
      "市内で創業予定または創業して間もない方",
      "特定創業支援等事業による支援を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "桑名市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kuwana.lg.jp/shoko/shigoto/kigyoushien/26-37392-281-621.html"
  },
  {
    "id": "matsusaka-city-shougakukin-henkan-shien",
    "name": "松阪市中小企業奨学金返還支援補助金",
    "provider": "松阪市 商工政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "企業負担額の1/2、従業員1人あたり年20万円上限（3年間）",
    "summary": "従業員の奨学金返還を支援する市内中小企業に対し、企業が負担した支援額の一部を補助する。",
    "eligibility": [
      "市内の中小企業（従業員300人以下）",
      "奨学金返還支援の社内規則を整備し企業登録すること",
      "支援対象者は令和7年4月以降に雇用され雇用保険被保険者、申請年度末に30歳以下"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "松阪市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（事前に商工政策課へ相談）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsusaka.mie.jp/soshiki/35/henkansien.html"
  },
  {
    "id": "matsusaka-city-shuekiryoku-chinage",
    "name": "松阪市中小企業収益力向上・賃上げ環境整備補助金",
    "provider": "松阪市 商工政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/2以内、上限300万円（下限10万円）",
    "summary": "設備導入やDXによる生産性向上、新商品開発、販路開拓など収益力向上の取組を支援し、賃上げにつなげる。",
    "eligibility": [
      "市内の中小企業者・小規模事業者等",
      "中小企業者は賃上げが要件、小規模事業者等は収益力向上の確認",
      "交付決定前に着手した事業は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "松阪市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度は先着順（4月開始、二次募集の掲載あり）。現在の受付状況は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsusaka.mie.jp/soshiki/35/tinagehojo.html"
  },
  {
    "id": "suzuka-city-monozukuri-genki-hojo",
    "name": "鈴鹿市モノづくり元気企業支援事業補助金",
    "provider": "鈴鹿市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "通常枠の上限190万円（補助率は要確認）",
    "summary": "市内中小製造業者等が大学・研究機関などと連携して行う新製品・新技術の研究開発や既存製品の改良経費を補助する。",
    "eligibility": [
      "市内の中小製造業者等",
      "大学や研究機関などと連携した研究開発等"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "鈴鹿市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.suzuka.lg.jp/sangyo/shien/1003403.html"
  },
  {
    "id": "suzuka-city-sogyo-sokushin-hojo",
    "name": "鈴鹿市 創業促進補助金",
    "provider": "鈴鹿市 商業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2（上限30万円）",
    "summary": "市内で創業した人の設備工事、機械・備品購入、研修費、広告費など初期経費の一部を補助する。",
    "eligibility": [
      "特定創業支援等事業による支援を受けた証明を持つこと",
      "令和7年4月1日以降に市内で新たに創業した人",
      "創業日から1年以内に申請"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "鈴鹿市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.suzuka.lg.jp/sangyo/shien/1014188.html"
  },
  {
    "id": "tsu-city-jinzai-ikusei",
    "name": "津市中小企業振興事業補助金（人材育成支援事業）",
    "provider": "津市 商業振興労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率1/2以内、同一事業者10万円上限",
    "summary": "従業員の人材育成にかかる費用の一部を補助する。",
    "eligibility": [
      "市内で1年以上事業を営む中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "津市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.info.city.tsu.mie.jp/sangyou_shigoto/shoukougyou/1004195/1009870/1004207.html"
  },
  {
    "id": "tsu-city-seisansei-setsubi",
    "name": "津市中小企業振興事業補助金（生産性向上設備支援事業）",
    "provider": "津市 商業振興労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "生産性向上のための設備導入費の一部を補助する。",
    "eligibility": [
      "市内で1年以上事業を営む中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "津市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年4月2日～6月12日（受付終了、来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.info.city.tsu.mie.jp/sangyou_shigoto/shoukougyou/1004195/1009870/1004206.html"
  },
  {
    "id": "tsu-city-shinshohin-kaihatsu",
    "name": "津市中小企業振興事業補助金（新商品等開発支援事業）",
    "provider": "津市 商業振興労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "製造業100万円以内、その他50万円以内",
    "summary": "新商品等の開発費の一部を補助する。",
    "eligibility": [
      "市内で1年以上事業を営む中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "津市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年4月2日～6月12日（受付終了、来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.info.city.tsu.mie.jp/sangyou_shigoto/shoukougyou/1004195/1009870/1004208.html"
  },
  {
    "id": "tsu-city-sogyo-hokyukin",
    "name": "津市創業資金融資に係る補給金",
    "provider": "津市 商業振興労政課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "保証料補給金:上限10万円、利子補給金あり",
    "summary": "創業融資の信用保証料または日本公庫融資の利子を補給する。",
    "eligibility": [
      "創業後5年未満等",
      "保証協会保証または日本公庫の融資を受けた人"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "津市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "常設（保証料は融資実行から3か月以内、利子補給は毎年2月末）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.info.city.tsu.mie.jp/sangyou_shigoto/shoukougyou/1004195/1004201.html"
  },
  {
    "id": "tsu-city-tenjikai-shuttenn",
    "name": "津市中小企業振興事業補助金（展示会等出展支援事業）",
    "provider": "津市 商業振興労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "20万円以内",
    "summary": "展示会等への出展費用の一部を補助する。",
    "eligibility": [
      "市内で1年以上事業を営む中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "津市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度（ページにより予算到達で終了とも10/30までとも記載、要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.info.city.tsu.mie.jp/sangyou_shigoto/shoukougyou/1004195/1009870/1004205.html"
  },
  {
    "id": "yokkaichi-city-akitenpo-katsuyo",
    "name": "四日市市空き店舗等活用支援事業補助金",
    "provider": "四日市市 商工農水部",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "1年度目 補助対象経費の1/2以内（上限50万円）。商店街区域内の小売業は3/4以内（上限150万円）",
    "summary": "商店街や郊外住宅団地の空き店舗に新たに出店する事業者の改装等の経費を補助する。2026年度分の要綱・チラシが公開されている。",
    "eligibility": [
      "商店街・郊外住宅団地の空き店舗に新規出店する事業者",
      "改装等の事業開始前に申請すること"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "四日市市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yokkaichi.lg.jp/www/contents/1001000001356/index.html"
  },
  {
    "id": "yokkaichi-city-dokuritsu-kaigyo-yushi",
    "name": "四日市市独立開業資金融資制度",
    "provider": "四日市市 商工農水部",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "限度額3,500万円、利率1.3%（検索結果での記載。最新は要確認）",
    "summary": "市内で新たに開業する方や開業後5年未満の中小企業者向けの市の制度融資。",
    "eligibility": [
      "市内で新たに事業を開業する方",
      "開業後5年未満の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "四日市市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yokkaichi.mie.jp/reiki/reiki_honbun/i603RG00000702.html"
  },
  {
    "id": "yokkaichi-city-kaigai-hanro",
    "name": "四日市市中小企業海外販路開拓支援事業補助金",
    "provider": "四日市市 商工農水部",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助対象経費の1/2以内（1事業者あたり年度50万円上限）",
    "summary": "中小企業の海外展示会出展など海外販路開拓の経費を補助する。",
    "eligibility": [
      "市内の中小企業者",
      "海外での販路開拓に取り組むこと（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "四日市市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yokkaichi.lg.jp/www/contents/1001000001363/index.html"
  },
  {
    "id": "yokkaichi-city-skillup-hojo",
    "name": "四日市市中小企業人材スキルアップ支援事業費補助金",
    "provider": "四日市市 商工農水部",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "市内の中小企業等が従業員の能力向上のために必要な資格取得（講習・試験）に要する経費の一部を助成する。",
    "eligibility": [
      "市内の中小企業等",
      "従業員の資格取得に要する経費であること"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "四日市市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yokkaichi.lg.jp/www/contents/1001000001364/index.html"
  },
  {
    "id": "yokkaichi-city-tokutei-sogyo-hanro",
    "name": "四日市市特定創業者販路拡大事業費補助金",
    "provider": "四日市市 商工農水部",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助対象経費の1/2以内（上限15万円）",
    "summary": "市の創業支援等事業計画に基づく支援を受けた創業間もない事業者の、チラシ作成・Web広告・ネット販売システム構築などの経費を補助する。",
    "eligibility": [
      "市内の創業間もない事業者",
      "四日市市創業支援等事業計画に基づく支援を受けていること"
    ],
    "industries": "all",
    "prefectures": [
      "三重県"
    ],
    "cities": [
      "四日市市"
    ],
    "stages": [
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yokkaichi.lg.jp/www/contents/1616904675200/index.html"
  },
  {
    "id": "shiga-jigyo-shokei-seicho",
    "name": "滋賀県 事業承継・成長促進補助金",
    "provider": "滋賀県 商工観光労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "補助率2/3・上限50万円",
    "summary": "事業承継を契機とした経営革新や人材育成につながる取組の経費の一部を補助する。",
    "eligibility": [
      "事業承継を行う滋賀県内の中小企業者",
      "事業承継ネットワーク構成機関の意見書が必要"
    ],
    "industries": "all",
    "prefectures": [
      "滋賀県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度第3回は8月10日〜9月14日で終了。以降は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.shiga.lg.jp/ippan/shigotosangyou/kigyou/349513.html"
  },
  {
    "id": "shiga-keiei-kakushin",
    "name": "中小企業経営革新等応援事業補助金",
    "provider": "滋賀県 商工観光労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率1/2以内・50万円〜300万円",
    "summary": "県内中小企業の経営革新等の取組経費の一部を補助する。",
    "eligibility": [
      "滋賀県内の中小企業者",
      "詳細は募集要領で要確認"
    ],
    "industries": "all",
    "prefectures": [
      "滋賀県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度二次募集は2026年6月26日〜7月31日で終了。最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.shiga.lg.jp/ippan/shigotosangyou/kigyou/300713.html"
  },
  {
    "id": "shiga-local-venture",
    "name": "滋賀県ローカルベンチャー創出支援金",
    "provider": "滋賀県 商工観光労働部／滋賀県産業支援プラザ",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助上限200万円・補助率1/2（掲載情報）",
    "summary": "デジタル技術を活用した起業や、事業承継・第二創業に取り組むローカルベンチャーの経費の一部を補助する。",
    "eligibility": [
      "滋賀県内で起業・第二創業等を行う方",
      "デジタル技術を活用した事業"
    ],
    "industries": "all",
    "prefectures": [
      "滋賀県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度三次募集は2026年9月4日で締切済み。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.shigaplaza.or.jp/news/hojyokin_sogyo_260807/"
  },
  {
    "id": "shiga-seidoyuushi-kaigyo",
    "name": "滋賀県制度融資「開業資金」（創業枠・創業サポート枠ほか）",
    "provider": "滋賀県 商工観光労働部／滋賀県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "開業前および開業後5年未満の方向けの制度融資。創業枠・創業サポート枠、女性創業枠、北部振興枠がある。小規模企業者向けの経営支援資金（小規模企業者特別枠）も案内されている。",
    "eligibility": [
      "開業前または開業後5年未満の方",
      "詳細は県の制度融資ページで要確認"
    ],
    "industries": "all",
    "prefectures": [
      "滋賀県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.shiga.lg.jp/ippan/shigotosangyou/kigyou/300703.html"
  },
  {
    "id": "hikone-city-seido-yushi",
    "name": "彦根市の金融施策（制度融資）",
    "provider": "彦根市 地域経済振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "市が実施する中小企業向けの制度融資。創業支援等事業計画でも創業者向けの制度融資が位置付けられている。詳細な条件は要確認。",
    "eligibility": [
      "彦根市内の中小企業者・創業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "滋賀県"
    ],
    "cities": [
      "彦根市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hikone.lg.jp/jigyosha/shokogyo/3/3/7130.html"
  },
  {
    "id": "kusatsu-city-chusho-dx-hojo",
    "name": "草津市中小企業等DX推進補助金",
    "provider": "草津市 総合政策部 経営戦略課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "令和7年度は上限30万円・補助率1/2（プロ人材活用で10万円上乗せ）。令和8年度は要確認",
    "summary": "中小企業等のDX推進（DX人材育成等）の経費を補助する。令和8年度は市の一覧で募集終了間近と表示されていた。",
    "eligibility": [
      "市内の中小企業等",
      "詳細は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "滋賀県"
    ],
    "cities": [
      "草津市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（令和8年度は募集終了間近と掲載）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kusatsu.shiga.jp/kurashi/sangyobusiness/sangyo/hojyo/index.html"
  },
  {
    "id": "kusatsu-city-shoene-saiene-setsubi",
    "name": "草津市省エネ・再エネ等設備導入加速化補助金",
    "provider": "草津市 環境部",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "市内事業者の省エネルギー設備・再生可能エネルギー設備の導入費用の一部を補助する。",
    "eligibility": [
      "市内の事業者",
      "省エネ・再エネ設備を導入すること"
    ],
    "industries": "all",
    "prefectures": [
      "滋賀県"
    ],
    "cities": [
      "草津市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年9月3日〜令和9年3月31日",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.kusatsu.shiga.jp/kurashi/kankyo/ondanka/hojokin-syoenesaiene.html"
  },
  {
    "id": "kusatsu-city-sogyo-shien-hojo",
    "name": "草津市創業支援補助金",
    "provider": "草津市 産業関係部署",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "創業に要する謝金・設備費・店舗等借入費・販路開拓費・委託費・広告費などを補助する。令和8年度分は募集終了と掲載されている。",
    "eligibility": [
      "前年度中に事業を開始していない創業者",
      "申請時に支援機関による支援を受け、実施期間中も継続して受けること"
    ],
    "industries": "all",
    "prefectures": [
      "滋賀県"
    ],
    "cities": [
      "草津市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は募集終了。来年度は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kusatsu.shiga.jp/kurashi/sangyobusiness/sangyo/hojyo/sougyousienhozyo.html"
  },
  {
    "id": "nagahama-city-machinaka-shuten-shien",
    "name": "長浜市まちなか出店支援事業補助金（令和8年度）",
    "provider": "長浜市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "審査会の採点により上限100万円（60点以上）または150万円（80点以上）。町家改修は加算あり",
    "summary": "まちなかの遊休不動産を活用して新たに出店する事業者を支援する。審査会でのプレゼンテーションがある。",
    "eligibility": [
      "まちなかの遊休不動産を活用して新規出店する事業者",
      "審査会でプレゼンテーションを行うこと"
    ],
    "industries": [
      "retail",
      "food",
      "tourism"
    ],
    "prefectures": [
      "滋賀県"
    ],
    "cities": [
      "長浜市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は募集済み（2次募集の案内あり）。次回募集は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nagahama.lg.jp/0000016552.html"
  },
  {
    "id": "omihachiman-city-shokibo-kokuchi-yushi",
    "name": "小規模企業者小口簡易資金融資制度",
    "provider": "近江八幡市 産業経済部 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資上限2,000万円、貸付利率年1.5%、保証料率年0.5〜1.2%（掲載時期が古い可能性あり・要確認）",
    "summary": "小規模企業者の経営安定のため、無担保・無保証人で融資を受けられる制度。",
    "eligibility": [
      "市内の小規模企業者",
      "制度の融資条件を満たすこと"
    ],
    "industries": "all",
    "prefectures": [
      "滋賀県"
    ],
    "cities": [
      "近江八幡市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.omihachiman.lg.jp/soshiki/shoko/2/3/1293.html"
  },
  {
    "id": "omihachiman-city-sogyo-shien-keikaku",
    "name": "近江八幡市創業支援等事業計画（創業サポート窓口・創業塾）",
    "provider": "近江八幡市 産業経済部 商工振興課・近江八幡商工会議所",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "市、商工会議所、安土町商工会、金融機関が連携し、創業相談窓口や創業塾・セミナー等で創業希望者を支援する。",
    "eligibility": [
      "市内で創業を希望する方、または創業して間もない方",
      "特定創業支援等事業を受ける場合は市の証明を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "滋賀県"
    ],
    "cities": [
      "近江八幡市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.omihachiman.lg.jp/soshiki/shoko/sangyou/kigyou_sougyou/1254.html"
  },
  {
    "id": "otsu-city-hanro-kaitaku",
    "name": "大津市小規模企業販路開拓事業費補助金",
    "provider": "大津市 商工労働政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2、上限50万円",
    "summary": "小規模企業の販路開拓の経費を補助する。",
    "eligibility": [
      "事業開始から3年を経過した小規模企業者"
    ],
    "industries": "all",
    "prefectures": [
      "滋賀県"
    ],
    "cities": [
      "大津市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年5月18日～12月28日",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.otsu.lg.jp/soshiki/025/1601/g/hojo/56655.html"
  },
  {
    "id": "otsu-city-seisansei-suishin",
    "name": "大津市生産性向上推進事業費補助金",
    "provider": "大津市 商工労働政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "通常枠上限300万円",
    "summary": "生産性向上のための取組・設備投資を補助する。",
    "eligibility": [
      "市内中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "滋賀県"
    ],
    "cities": [
      "大津市"
    ],
    "stages": [
      "established"
    ],
    "period": "第2次募集 令和8年9月1日～12月28日（予算上限で終了）",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.otsu.lg.jp/soshiki/025/1601/g/hojo/48570.html"
  },
  {
    "id": "otsu-city-sogyo-sokushin",
    "name": "大津市創業促進事業費補助金",
    "provider": "大津市 商工労働政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2、上限50万円（35歳以下は100万円）",
    "summary": "創業に要する経費を補助する。",
    "eligibility": [
      "創業から3年以内、または令和9年2月28日までに創業する人"
    ],
    "industries": "all",
    "prefectures": [
      "滋賀県"
    ],
    "cities": [
      "大津市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度2次募集は8/3～8/31で終了（来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.otsu.lg.jp/soshiki/025/1601/g/hojo/48891.html"
  },
  {
    "id": "kyoto-keiei-kaikaku",
    "name": "京都府 中小企業経営改革支援事業",
    "provider": "京都府／京都産業21",
    "level": "prefecture",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率1/2以内・100万円〜3,000万円（令和5年度公募要領）",
    "summary": "創業10年以内の未上場企業の経営改革・成長投資を支援する補助事業。",
    "eligibility": [
      "創業10年以内で府内に拠点を持つ未上場企業"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.ki21.jp/subsidy/kobo-r5-kaikaku/"
  },
  {
    "id": "kyoto-seisansei-hitode",
    "name": "京都府生産性向上・人手不足対策事業費補助事業",
    "provider": "京都府／京都産業21",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "令和8年度の生産性向上・人手不足対策の補助事業。府内に拠点を有する中小企業者の企業グループが対象。",
    "eligibility": [
      "府内に拠点を有する4者以上の中小企業者で構成される企業グループ"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.ki21.jp/subsidy/kobo-r8-koujou/"
  },
  {
    "id": "kyoto-shokibo-ouen-shikin",
    "name": "京都府・京都市 小規模企業おうえん資金",
    "provider": "京都府 商工労働観光部／取扱金融機関",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額2,000万円・年1.2%固定・期間10年以内（令和7年度版資料）",
    "summary": "従業員20人以下（商業・サービス業は5人以下）の小規模企業者向けの制度融資。",
    "eligibility": [
      "小規模企業者",
      "府内で1年以上継続して事業を行っていること（原則）"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "随時（令和8年度の条件は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kyoto.jp/kinyu/documents/27kokiboouen.pdf"
  },
  {
    "id": "kyoto-sogyo-shien-shikin",
    "name": "京都府・京都市 創業支援資金（創業・事業転換等）",
    "provider": "京都府 商工労働観光部／京都府・京都市制度融資取扱金融機関",
    "level": "prefecture",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "創業型は限度額1,500万円（追加要件で3,500万円）・年1.2%固定・期間10年以内",
    "summary": "新たに事業を始める方を支援する制度融資。創業型・無保証人型・事業転換・多角化型がある。",
    "eligibility": [
      "新たに事業を開始しようとする方等",
      "追加要件に創業セミナー受講等"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（令和8年4月1日版）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kyoto.jp/kinyu/documents/29-1sougyou.pdf"
  },
  {
    "id": "fukuchiyama-city-kigyoka-shien-hojo",
    "name": "福知山市起業家支援事業補助金",
    "provider": "福知山市 産業部 産業課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "令和7年度実績：ソフト事業は補助率1/2以内・上限20万円、ハード事業は補助率1/4以内・上限50万円（令和8年度は要確認）",
    "summary": "市内で新たに起業・創業する方、または創業後1年未満の方の経費の一部を補助する。令和8年度分は4月13日に受付開始。予算がなくなり次第終了。",
    "eligibility": [
      "市内で新たに起業・創業する方、または創業後1年未満の方",
      "ハード事業は認定特定創業支援事業を受けた証明書が必要（令和7年度実績）"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [
      "福知山市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は4月13日受付開始、予算がなくなり次第終了",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fukuchiyama.lg.jp/soshiki/78/54942.html"
  },
  {
    "id": "fukuchiyama-city-sentan-setsubi-shienkin",
    "name": "福知山市先端設備等導入支援金",
    "provider": "福知山市 産業部 産業課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "通常枠：補助率1/10・上限150万円、伴走型・経営力強化枠：補助率2/10・上限300万円",
    "summary": "物価高騰の影響を受ける市内中小企業の先端設備等導入計画に基づく設備・ソフトウェア導入費用を支援する。令和8年度新規。",
    "eligibility": [
      "令和8年4月1日以前から事業を行う市内中小企業等",
      "市内に主たる事業所があること",
      "中小企業等経営強化法の先端設備等導入計画の認定を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [
      "福知山市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年5月11日〜令和9年1月31日（予算がなくなり次第終了）",
    "deadline": "2027-01-31",
    "priority": 8,
    "url": "https://www.city.fukuchiyama.lg.jp/soshiki/78/85000.html"
  },
  {
    "id": "kameoka-city-sogyo-shien-joseikin",
    "name": "亀岡市創業支援助成金",
    "provider": "亀岡市 商工観光課",
    "level": "municipality",
    "type": "助成金",
    "cat": "創業・起業",
    "amount": "融資額の3/100と創業時広告宣伝費の1/2の合算額。上限30万円（亀岡商工会議所会員は50万円）",
    "summary": "市内で新たに創業した方に、融資利用額と広告宣伝費に応じた助成金を交付する。予算がなくなり次第終了。",
    "eligibility": [
      "市内に住所があり市内で創業して事業を継続していること",
      "京都府中小企業融資制度または日本政策金融公庫の創業支援融資を利用していること",
      "過去に同助成金を受けていないこと・市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [
      "亀岡市"
    ],
    "stages": [
      "early"
    ],
    "period": "創業日から3か月を経過した日から6か月以内に申請（予算がなくなり次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kameoka.kyoto.jp/soshiki/29/3591.html"
  },
  {
    "id": "maizuru-city-digital-tool-hojo",
    "name": "舞鶴市中小企業デジタルツール導入支援事業補助金",
    "provider": "舞鶴市 商工・観光振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/2以内、上限50万円",
    "summary": "AI・IoT・RPA・クラウドサービス等のデジタルツール導入費用を補助し、業務効率化・生産性向上を支援する。",
    "eligibility": [
      "市内に事業所を有する中小企業者",
      "業務効率化・生産性向上を目的としたデジタルツール導入であること"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [
      "舞鶴市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（産業支援プラットフォームでは令和9年1月29日まで）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.maizuru.kyoto.jp/shigoto/0000013222.html"
  },
  {
    "id": "maizuru-city-machinaka-area-hojo",
    "name": "舞鶴市まちなかエリア活性化補助金",
    "provider": "舞鶴市 商工・観光振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助対象経費の2/3、上限30万円（商店街振興組合等と協議の上出店する場合は35万円）",
    "summary": "まちなかエリアへの出店など、まちの魅力向上に寄与する事業を支援する補助金。",
    "eligibility": [
      "まちなかエリアに店舗を出店する事業者",
      "まちの魅力向上に寄与する事業であること"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [
      "舞鶴市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（市ページと産業支援プラットフォームで期限の記載が異なる）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.maizuru.kyoto.jp/shigoto/0000012436.html"
  },
  {
    "id": "maizuru-city-mirai-toshi-hojo",
    "name": "舞鶴市みらい投資支援補助金",
    "provider": "舞鶴市 商工・観光振興課（申請窓口：舞鶴商工会議所）",
    "level": "municipality",
    "type": "補助金",
    "cat": "その他",
    "amount": "補助率2/3以内、上限 一般枠30万円・賃上げ実施枠50万円",
    "summary": "物価高騰の影響を受ける市内中小企業者等の経営基盤強化や事業継続につながる取り組みを支援する補助金。",
    "eligibility": [
      "市内に事業所を有する中小企業者・個人事業主",
      "物価高騰の影響を受けていること",
      "経営基盤強化・事業継続につながる取り組みであること"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [
      "舞鶴市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年5月18日〜12月25日",
    "deadline": "2026-12-25",
    "priority": 8,
    "url": "https://www.city.maizuru.kyoto.jp/jigyosya/0000014933.html"
  },
  {
    "id": "uji-city-jinzai-ikusei-shien",
    "name": "宇治市中小企業人材育成支援事業（令和8年度）",
    "provider": "宇治市 産業振興課（宇治NEXT）",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "市内中小企業の人材育成に関する取り組みを支援する事業。",
    "eligibility": [
      "市内の中小企業（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [
      "宇治市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度事業（受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.uji.kyoto.jp/site/ujinext/6527.html"
  },
  {
    "id": "uji-city-jinzai-teichaku-hojo",
    "name": "宇治市 中小企業人材定着支援事業補助金",
    "provider": "宇治市 産業振興課（宇治NEXT）",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "中小企業の人材定着の取り組みに要する経費を補助する。",
    "eligibility": [
      "市内の中小企業（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [
      "宇治市"
    ],
    "stages": [
      "established"
    ],
    "period": "宇治NEXTの一覧では令和9年1月29日まで受付と掲載（要確認）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.uji.kyoto.jp/site/ujinext/100181.html"
  },
  {
    "id": "uji-city-sentan-setsubi-hojo",
    "name": "宇治市先端設備等導入支援補助金",
    "provider": "宇治市 産業振興課（宇治NEXT）",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "先端設備等導入計画の認定を受けて設備を導入する事業者に補助金を交付する。",
    "eligibility": [
      "先端設備等導入計画の認定を受けた市内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [
      "宇治市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認（詳細ページは令和8年1月30日で公募終了、一覧では令和9年1月29日受付と掲載）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.uji.kyoto.jp/site/ujinext/54306.html"
  },
  {
    "id": "uji-city-sogyo-shien-hojo",
    "name": "宇治市創業支援補助金（令和8年度）",
    "provider": "宇治市 産業観光部 産業振興課（宇治NEXT）",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "過去年度は最大180万円（基礎分100万円＋加算分80万円）。令和8年度は要確認",
    "summary": "市内で新規創業または第二創業を行う方に創業経費を補助する。審査は書類とプレゼンテーション。",
    "eligibility": [
      "市内で新規創業または第二創業を行う方",
      "過去の募集では特定創業支援等事業の受講や融資利用などが要件"
    ],
    "industries": "all",
    "prefectures": [
      "京都府"
    ],
    "cities": [
      "宇治市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度の募集は令和8年9月30日必着で受付終了（来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.uji.kyoto.jp/site/ujinext/102325.html"
  },
  {
    "id": "osaka-datsutanso-jishu",
    "name": "大阪府 中小事業者の脱炭素化に係る自主的取組支援補助金",
    "provider": "大阪府 環境農林水産部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/3・1法人上限200万円",
    "summary": "中小事業者の脱炭素化に向けた設備導入等の取組を補助する。",
    "eligibility": [
      "大阪府内の中小事業者"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度2次公募は2026年10月5日で終了。以降は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.osaka.lg.jp/o120020/eneseisaku/sec/plan2_subsidy.html"
  },
  {
    "id": "osaka-gyomukaizen-chinage",
    "name": "大阪府 業務改善・賃上げ促進補助金",
    "provider": "大阪府 商工労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率1/4・上限200万円",
    "summary": "国の業務改善助成金を活用する事業者への府の上乗せ補助。",
    "eligibility": [
      "国の業務改善助成金を活用する府内中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "事前登録は2026年9月30日まで（終了。以降は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.osaka.lg.jp/o110050/keieishien/chinagepackage.html"
  },
  {
    "id": "osaka-kaigyo-startup-shikin",
    "name": "大阪府制度融資「開業・スタートアップ応援資金」",
    "provider": "大阪府 商工労働部／大阪信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "限度額3,500万円・返済期間10年以内",
    "summary": "開業前および開業後5年未満の方向けの制度融資。",
    "eligibility": [
      "開業前または開業後5年未満の方"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.osaka.lg.jp/o110080/kinyushien/kaigyo-sien/index.html"
  },
  {
    "id": "osaka-tenjikai-shuttenshien",
    "name": "大阪府 中小企業展示商談会出展支援事業補助金",
    "provider": "大阪府 商工労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率2/3・10万円〜200万円",
    "summary": "BtoB向け展示商談会の出展小間料を補助する（賃上げ促進支援パッケージ）。",
    "eligibility": [
      "大阪府内に主たる事務所または事業所を有する中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年12月18日まで（予算上限に達し次第終了。受付終了表示もあり要確認）",
    "deadline": "2026-12-18",
    "priority": 6,
    "url": "https://www.pref.osaka.lg.jp/o110070/mono/r8syuttenshien.html"
  },
  {
    "id": "daito-city-bukka-kotou-yushi-katsuyo-hojo",
    "name": "大東市物価高騰対策融資活用補助金",
    "provider": "大東市 産業経済室",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "融資額の100分の2または10万円のいずれか低い額",
    "summary": "物価高騰対策として融資を受けた市内事業者に、融資額に応じた補助金を交付する。",
    "eligibility": [
      "令和8年10月1日から令和9年2月26日までに融資を受けた市内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "大東市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "融資実行 令和8年10月1日〜令和9年2月26日",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.daito.lg.jp/soshiki/5/73362.html"
  },
  {
    "id": "daito-city-chusho-jinzai-gijutsu-hojo",
    "name": "大東市 中小企業人材スキルアップ支援補助金・技術開発支援補助金",
    "provider": "大東市 産業経済室",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "人材スキルアップ：受講料の1/2、1受講者あたり6万円上限。技術開発：経費の1/2（上限は要確認）",
    "summary": "従業員の研修受講料の一部や、大学・公的機関と共同で行う技術開発経費の一部を補助する。",
    "eligibility": [
      "大東市内の中小企業者",
      "研修受講または技術開発事業を実施すること"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "大東市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認（市の補助制度案内ページを参照）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.daito.lg.jp/soshiki/5/1779.html"
  },
  {
    "id": "daito-city-yume-kigyo-ouen-hojo",
    "name": "夢をかなえる起業応援補助金",
    "provider": "大東市 産業経済室（産業振興課）",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "10万円（1事業者1回限り）",
    "summary": "市内で起業する個人事業主・法人に起業応援の補助金を交付する。大東ビジネス創造センターD-Bizでの創業相談等が要件。",
    "eligibility": [
      "市内に住所（個人）または本店（法人）を有し市内で事業を行うこと",
      "D-Bizで1か月以上にわたり4回以上の創業相談を受けること",
      "市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "大東市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "創業日が属する月の翌月から12か月以内に交付申込み",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.daito.lg.jp/site/iju/1794.html"
  },
  {
    "id": "higashiosaka-city-akiten-katsuyo",
    "name": "東大阪市空き店舗活用促進事業補助金",
    "provider": "東大阪市",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "要確認",
    "summary": "市内商店街の空き店舗で新規開業する方の改装・備品等の経費を補助する（令和8年度に対象経費を見直し）。",
    "eligibility": [
      "市内商店街の空き店舗で新たに開業する方",
      "個人創業者も対象"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "東大阪市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.higashiosaka.lg.jp/0000002679.html"
  },
  {
    "id": "higashiosaka-city-kaigai-tenjikai",
    "name": "東大阪市海外展示会出展支援助成金",
    "provider": "東大阪市 モノづくり支援室",
    "level": "municipality",
    "type": "助成金",
    "cat": "販路開拓・PR",
    "amount": "単独出展 上限100万円、共同出展 上限30万円（助成率10/10）",
    "summary": "海外展示会への出展費用を助成する。",
    "eligibility": [
      "市内のモノづくり企業"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "東大阪市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.higashiosaka.lg.jp/0000044213.html"
  },
  {
    "id": "higashiosaka-city-kokunai-tenjikai",
    "name": "東大阪市国内展示会出展支援助成金",
    "provider": "東大阪市 モノづくり支援室",
    "level": "municipality",
    "type": "助成金",
    "cat": "販路開拓・PR",
    "amount": "助成率1/2（上限10万円）",
    "summary": "商談型展示会の出展小間料を助成する。",
    "eligibility": [
      "市内のモノづくり企業"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "東大阪市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "当該年度の4月〜2月末開催の展示会が対象（令和8年度）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.higashiosaka.lg.jp/0000043092.html"
  },
  {
    "id": "higashiosaka-city-shoene-setsubi",
    "name": "東大阪市中小企業省エネルギー設備導入支援補助金",
    "provider": "東大阪市",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "最大500万円",
    "summary": "省エネ設備の導入によるコスト削減と賃上げを後押しする。",
    "eligibility": [
      "市内に事業所を持つ中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "東大阪市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年8月17日〜12月28日",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.higashiosaka.lg.jp/0000044708.html"
  },
  {
    "id": "higashiosaka-city-shokibo-yushi",
    "name": "東大阪市小規模企業融資制度",
    "provider": "東大阪市",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額2,000万円、年0.8%固定（令和8年4月現在）",
    "summary": "市内小規模企業向けの制度融資。",
    "eligibility": [
      "同一事業を6か月以上営む小規模企業"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "東大阪市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.higashiosaka.lg.jp/0000002859.html"
  },
  {
    "id": "hirakata-city-takeoff-hojo",
    "name": "令和8年度枚方市テイクオフ補助金",
    "provider": "枚方市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "賃借料の1/2。対象者1は月額5万円上限・最大12か月、対象者2は月額1万円上限・最大6か月",
    "summary": "創業初期の中小企業者が事務所等として借りる建物の賃借料を補助する。敷金・礼金・共益費は対象外。",
    "eligibility": [
      "ひらっくのインキュベートルーム使用者等、または特定創業支援等事業の証明を受けた人",
      "市内居住または本店が市内にあること"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "枚方市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "交付開始月の前月10日までに申請（令和8年度）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hirakata.osaka.jp/0000003470.html"
  },
  {
    "id": "hirakata-city-tenji-shodankai-shuttenn",
    "name": "枚方市 中小企業向け展示商談会等への出展支援制度",
    "provider": "枚方市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "支援対象費用の2/3または5万円のいずれか低い額",
    "summary": "中小企業が展示商談会等へ出展する際の費用を支援する。",
    "eligibility": [
      "市内の中小企業",
      "展示商談会等に出展すること（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "枚方市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hirakata.osaka.jp/0000048228.html"
  },
  {
    "id": "hirakata-city-zerocarbon-jigyosho",
    "name": "令和8年度ひらかたゼロカーボン推進補助金（事業所向け）",
    "provider": "枚方市 環境政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "太陽光10.5万円/kW（上限63万円）、蓄電池は経費の1/3（上限47万円）、エコキュートは1/2（上限15万円）など",
    "summary": "事業所への太陽光発電・蓄電池・エコキュート・EV・充放電設備などの導入費用を補助する。",
    "eligibility": [
      "市内に事業所を所有して営む法人または個人事業主",
      "令和8年4月2日以降に着工・契約した工事であること"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "枚方市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（受付状況は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hirakata.osaka.jp/0000053655.html"
  },
  {
    "id": "ibaraki-city-chusho-hoshoryo-hojo",
    "name": "茨木市中小企業融資信用保証料補助",
    "provider": "茨木市 産業環境部 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "中小企業者が大阪信用保証協会に支払った信用保証料に対し市が補助する制度（茨木市中小企業融資信用保証料補助要綱）。",
    "eligibility": [
      "市内の中小企業者",
      "市の融資制度で大阪信用保証協会の保証を利用した者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "茨木市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ibaraki.osaka.jp/kikou/sangyo/shoukou/gyomu/yoko.html"
  },
  {
    "id": "ibaraki-city-sogyo-risihokyu",
    "name": "茨木市創業支援利子補給制度",
    "provider": "茨木市 産業環境部 商工労政課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "支払利子の1%相当分（各年度上限10万円、1融資あたり合計30万円）",
    "summary": "特定創業支援事業の市の証明を受けた創業者が対象融資を利用した場合に、支払った利子の一部を補給する。",
    "eligibility": [
      "特定創業支援事業に係る市の証明書の交付を受けた創業者",
      "対象融資の実行期限は令和8年3月31日（現在の新規受付は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "茨木市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "対象融資の実行期限は令和8年3月31日。最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ibaraki.osaka.jp/kikou/sangyo/shoukou/menu/yushiassen/42221.html"
  },
  {
    "id": "ibaraki-city-sogyo-sokushin-hojo",
    "name": "茨木市創業促進事業補助",
    "provider": "茨木市 産業環境部 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "改築・改装費は工事費の50%（上限50万円）、テナント賃借料は月額5万円上限、法人設立費用（登録免許税等）",
    "summary": "初めて事業を始める人・事業を拡大する人の改築改装工事費、テナント賃借料、法人設立費用を補助する。事前に市の経営アドバイザーとの面談と創業計画書の作成が必要。",
    "eligibility": [
      "初めて事業を始める人または始めた事業を拡大する人",
      "改築・改装費と賃借料は事前に経営アドバイザーとの面談が必要",
      "法人設立費用は登記後3か月以内に申請"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "茨木市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認（年度末3月31日までに実績報告まで完了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ibaraki.osaka.jp/kikou/sangyo/shoukou/menu/shokoshinko/shokogyo/kigyo/sogyosokushin.html"
  },
  {
    "id": "izumi-city-chusho-shinko-taisaku-hojo",
    "name": "和泉市中小企業振興対策事業補助金",
    "provider": "和泉市 産業振興プラザ（産業振興室）",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "対象経費の1/2以内、同一年度あたり上限20万円（研究・開発支援、人材育成支援、工業所有権取得促進の各事業）",
    "summary": "市内中小企業の研究・開発、人材育成（研修受講料等）、特許等の工業所有権取得費用の一部を補助する制度。",
    "eligibility": [
      "和泉市内の中小企業者または交流団体",
      "研究・開発、人材育成、工業所有権取得のいずれかの事業を行うこと",
      "事業着手前に相談・申請すること"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "和泉市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（予算に限りあり）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.osaka-izumi.lg.jp/kakukano/sangyoubu/sangyosinkositu/syoukoukanko/gyoumu/tyuushoukigyou/chusho_shien.html"
  },
  {
    "id": "izumi-city-chusho-yushi",
    "name": "和泉市中小企業融資制度",
    "provider": "和泉市 産業振興室（商工観光担当）",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "市内中小企業の資金調達を支援する市の融資制度。融資限度額・利率・保証料補助等の詳細は市の公式ページで確認が必要。",
    "eligibility": [
      "和泉市内で事業を営む中小企業者",
      "要件の詳細は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "和泉市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.osaka-izumi.lg.jp/kakukano/sangyoubu/sangyosinkositu/syoukoukanko/gyoumu/kinnyuusienn/1325724445036.html"
  },
  {
    "id": "izumi-city-sogyo-shien-hojo",
    "name": "和泉市創業等支援補助金",
    "provider": "和泉市 産業振興室（商工観光担当）",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2以内、家賃・広告宣伝費は月5万円上限、1者あたり合計30万円上限",
    "summary": "市内で創業する人の家賃・改装費・広告宣伝費の一部を補助する制度。申請前に特定創業支援等事業の支援を受けた証明が必要。",
    "eligibility": [
      "和泉市内で創業する（予定の）者",
      "特定創業支援等事業による支援を受けた証明があること",
      "過去に同補助金を受けていないこと"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "和泉市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度の募集期間は要確認（予算に限りあり）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.osaka-izumi.lg.jp/kakukano/sangyoubu/sangyosinkositu/syoukoukanko/gyoumu/sougyousienn/1560920544696.html"
  },
  {
    "id": "izumisano-city-chusho-sogo-shien-hosho",
    "name": "泉佐野市中小企業総合支援制度（信用保証料補助）",
    "provider": "泉佐野市 生活産業部 まちの活性課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "支払った信用保証料の1/2、上限10万円（1事業者年度内1回限り）",
    "summary": "融資時に支払った信用保証料の半分を補助する制度。1事業所につき利用できる支援メニューは1種類のみ。",
    "eligibility": [
      "市内に居住し市内で事業を営む中小企業者（法人は市内に本社）",
      "市税を滞納していないこと",
      "申請前に経営相談を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "泉佐野市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は令和9年2月1日〜2月末日",
    "deadline": "2027-02-28",
    "priority": 8,
    "url": "https://www.city.izumisano.lg.jp/kakuka/seikatsu/shoko/menu/jigyosyo/1372218703361.html"
  },
  {
    "id": "izumisano-city-chusho-sogo-shien-riko",
    "name": "泉佐野市中小企業総合支援制度（利子補給）",
    "provider": "泉佐野市 生活産業部 まちの活性課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資利率の1/2を補給、上限5万円（対象は当初借入額1,000万円まで、補給期間は融資実行日から5年以内）",
    "summary": "日本政策金融公庫のマル経融資等を利用した市内中小企業者に、利子の一部を補給する制度。申請前に経営相談を受ける必要がある。",
    "eligibility": [
      "市内に居住し市内で事業を営む中小企業者（法人は市内に本社）",
      "対象融資（マル経融資、生活衛生改善貸付、新企業育成貸付）で資金使途に設備を含むこと",
      "市税を滞納していないこと"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "泉佐野市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は令和9年2月1日〜2月末日",
    "deadline": "2027-02-28",
    "priority": 8,
    "url": "https://www.city.izumisano.lg.jp/kakuka/seikatsu/shoko/menu/jigyosyo/1372218703361.html"
  },
  {
    "id": "kadoma-city-kigyo-miryoku-up-hojo",
    "name": "職住近接のまち実現のための企業魅力アップ事業補助金",
    "provider": "門真市 市民文化部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率1/2〜2/3（カドマイスター認定企業は2/3〜3/4）、魅力向上・発信（一般）の限度額20万円、インターンシップ受入れは1人1日8,000円",
    "summary": "市内の中小ものづくり企業が人材の確保・定着のため、労働環境整備や職場の魅力向上・発信、カーボンニュートラル等に取り組む費用を補助する。",
    "eligibility": [
      "市内に事業所を有する中小ものづくり企業",
      "市税の滞納がないこと",
      "交付決定日以降に事業に着手すること"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "門真市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度の申請受付中（詳細は市ページで要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kadoma.osaka.jp/soshiki/shiminbunkabu/6/3/24276.html"
  },
  {
    "id": "kadoma-city-sogyo-shien",
    "name": "門真市 創業支援（特定創業支援等事業・創業塾）",
    "provider": "門真市 市民文化部 産業振興課／門真市中小企業サポートセンター",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "要確認（創業塾受講料2,000円／5日分。特定創業支援の証明で創業関連保証や小規模事業者持続化補助金＜創業型＞の申請が可能）",
    "summary": "創業相談や守口門真商工会議所の創業塾など特定創業支援等事業を行い、修了者に市が証明書を発行する。",
    "eligibility": [
      "門真市内で創業を予定または創業間もない方",
      "特定創業支援等事業による支援を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "門真市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "創業塾2026は定員60名の先着順（詳細は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kadoma.osaka.jp/soshiki/shiminbunkabu/6/3/5/2522.html"
  },
  {
    "id": "kishiwada-city-chusho-yushi",
    "name": "岸和田市中小企業向け融資制度",
    "provider": "岸和田市 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "市内中小企業向けの融資制度（中小企業サポート融資など）を案内している。",
    "eligibility": [
      "市内の中小企業者（条件は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "岸和田市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kishiwada.osaka.jp/soshiki/43/yuusi.html"
  },
  {
    "id": "kishiwada-city-digital-hozyokin",
    "name": "岸和田市 事業所デジタル化支援補助金",
    "provider": "岸和田市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "対象経費の1/2・上限30万円（令和7年1月31日期限の回）",
    "summary": "市内事業所のデジタル化に要する経費の一部を補助する。",
    "eligibility": [
      "市内の事業所"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "岸和田市"
    ],
    "stages": [
      "established"
    ],
    "period": "掲載の回は令和7年1月31日で受付終了。令和8年度は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kishiwada.osaka.jp/soshiki/43/digital-hozyokinn.html"
  },
  {
    "id": "kishiwada-city-ganbaru-kigyo-keiei-sogyo",
    "name": "「がんばる岸和田」企業経営支援補助金（創業・起業区分）",
    "provider": "岸和田市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2以内・上限10万円",
    "summary": "創業予定者や創業後5年未満の事業者の、創業費用や展示会出展・動画制作などの販路開拓費用を補助する。",
    "eligibility": [
      "市内で創業予定の方、または創業後5年未満の事業者",
      "同一事業者は1回のみ申請可"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "岸和田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kishiwada.osaka.jp/soshiki/43/hanrokaitaku.html"
  },
  {
    "id": "minoh-city-chusho-jigyo-shikin",
    "name": "箕面市中小企業事業資金融資",
    "provider": "箕面市 商工労働担当",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "貸付利率年0.8%（固定）、限度額600万円、信用保証料を1万円を限度に市が補給",
    "summary": "大阪信用保証協会の保証付き融資で、運転資金と市内設置設備の資金に利用できる。掲載情報は約2年前のため最新条件は要確認。",
    "eligibility": [
      "箕面市内の中小企業者",
      "大阪信用保証協会の保証が受けられること"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "箕面市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.minoh.lg.jp/syoukou/yuushi.html"
  },
  {
    "id": "minoh-city-zeroichi-ouen",
    "name": "みのおゼロイチ応援プロジェクト",
    "provider": "箕面市 / 箕面商工会議所",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率3分の2以内、上限30万円（2年間の伴走支援付き）",
    "summary": "補助金の交付と経営の伴走支援を組み合わせた創業者支援。機械装置費や広報費などが対象。令和8年度の申請は6月16日〜7月15日で終了。",
    "eligibility": [
      "令和8年12月末までに箕面市内で創業する人",
      "または創業後5年未満で新規事業に取り組む小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "箕面市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度の申請受付は終了（6/16〜7/15）。来年度は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.minoh.lg.jp/eigyou/zeroichoouen.html"
  },
  {
    "id": "moriguchi-city-kogyo-kasseika-shien",
    "name": "守口市工業活性化支援補助金",
    "provider": "守口市 地域振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率原則50%以内、限度額15万円〜100万円（事業により異なる）",
    "summary": "市内の中小工業者・団体が行う販路開拓、人材確保、生産性向上、住工共生、拠点強化などの事業経費の一部を補助する。",
    "eligibility": [
      "市内に事業所を有し1年以上事業を継続している製造業・建設業等の中小工業者",
      "市税の滞納がないこと"
    ],
    "industries": [
      "manufacturing",
      "construction"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "守口市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.moriguchi.osaka.jp/kakukanoannai/shiminseikatsubu/chiikishinkoka/sangyoshinkokigyoshien/jigyousyasien/3429.html"
  },
  {
    "id": "moriguchi-city-shogyo-shinko-shien",
    "name": "守口市商業振興事業支援補助金",
    "provider": "守口市 地域振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率50%以内、事業ごとの限度額15万円〜100万円",
    "summary": "市内の中小商業者やその団体が、消費者の利便性向上や集客拡大のために行うイベント、人材育成、情報発信、ECサイト新規開設などの経費の一部を補助する。",
    "eligibility": [
      "市内の中小商業者（卸売業・小売業）またはその団体",
      "集客力拡大等の事業を実施すること",
      "市税の滞納がないこと（要確認）"
    ],
    "industries": [
      "retail"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "守口市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.moriguchi.osaka.jp/kakukanoannai/shiminseikatsubu/chiikishinkoka/sangyoshinkokigyoshien/jigyousyasien/1022.html"
  },
  {
    "id": "moriguchi-city-yushi-hoshoryo-hokyu",
    "name": "守口市中小企業融資信用保証料補給",
    "provider": "守口市 地域振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "支払った信用保証料と5万円のいずれか少ない額（1事業者につき1年度1回）",
    "summary": "大阪府制度融資の小規模企業サポート資金・開業（スタートアップ応援）資金を利用した市内事業者に、大阪信用保証協会へ払い込んだ信用保証料の一部を補給する。",
    "eligibility": [
      "市内の中小企業者",
      "対象の大阪府制度融資を利用していること",
      "保証料を支払った日から1年以内に申請すること"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "守口市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "随時（保証料支払日から1年以内）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.moriguchi.osaka.jp/kakukanoannai/shiminseikatsubu/chiikishinkoka/sangyoshinkokigyoshien/yuushiseido/3334.html"
  },
  {
    "id": "neyagawa-city-keiei-gijutsu-shien-hojo",
    "name": "寝屋川市中小企業経営・技術支援補助金",
    "provider": "寝屋川市 産業振興センター",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "経費の1/2（展示会出展 年度上限20万円、申請サポート 年度上限30万円）",
    "summary": "展示会等への製品出展費用や、国・府の設備投資補助金申請を外部専門家に依頼する費用を補助する。",
    "eligibility": [
      "市内の中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "寝屋川市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.neyagawa.osaka.jp/organization_list/toshidesign/toshiikka/syoukougyou/notice/kougyou-hojyokin.html"
  },
  {
    "id": "neyagawa-city-shokibo-kigyo-yushi",
    "name": "寝屋川市小規模企業事業資金融資あっせん（市町村連携型）",
    "provider": "寝屋川市 産業振興センター",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額500万円、年1.4%固定、5年以内。信用保証料は市が全額補給と記載（最新条件は要確認）",
    "summary": "大阪信用保証協会の保証付きで小規模企業者の借入をあっせんし、保証料を市が補給する制度融資。",
    "eligibility": [
      "市内で1年以上同一場所で事業を営む小規模企業者"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "寝屋川市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.neyagawa.osaka.jp/organization_list/machizukurisuishin/sangyoshinkoshitsu/syoukougyou/yushiseidonoannai/1378274957431.html"
  },
  {
    "id": "neyagawa-city-sogyo-shotengai-shutten",
    "name": "寝屋川市創業・商店街等出店応援事業補助金",
    "provider": "寝屋川市 産業振興センター",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "通常枠 経費の1/2・上限20万円（空き物件活用・移住・若者枠は上限50万円）",
    "summary": "創業や商店街等への出店にかかる内外装工事、設備・備品購入、販路開拓費などを補助する。",
    "eligibility": [
      "市の特定創業支援等事業を受けた創業希望者・新規創業者",
      "商店街等への出店希望者",
      "法人設立・開業届の前に申請して交付決定を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "寝屋川市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和7年度分は終了。令和8年度は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.neyagawa.osaka.jp/organization_list/toshidesign/toshiikka/syoukougyou/establishment/20704.html"
  },
  {
    "id": "settsu-city-chusho-ikusei-hojo",
    "name": "摂津市中小企業育成事業補助金",
    "provider": "摂津市 生活環境部 産業振興課 商工労政係",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "受講料・出展料の1/2、年度合計5万円上限（大規模な展示会への出展は上限30万円）",
    "summary": "研修の受講や展示会への出展にかかる費用の一部を補助する制度。",
    "eligibility": [
      "摂津市内の中小企業者",
      "市内で1年以上事業を営むこと（特定創業支援事業を受けた人は1年未満でも可）",
      "研修受講または展示会出展を行うこと"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "摂津市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度の募集期間は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.settsu.osaka.jp/soshiki/seikatukannkyou/sangyoushinkouka/shoukougyou/kigyoujigyoushoshien/hojokinjoseiseido/23221.html"
  },
  {
    "id": "settsu-city-kigyosha-yushi-hojo",
    "name": "摂津市起業者融資補助金",
    "provider": "摂津市 生活環境部 産業振興課 商工労政係",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "一律5万円",
    "summary": "創業者が指定金融機関の融資を受けた場合に、一定額を補助する制度。",
    "eligibility": [
      "摂津市内で起業する者",
      "指定金融機関の融資を受けていること",
      "詳細要件は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "摂津市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.settsu.osaka.jp/soshiki/seikatukannkyou/sangyoushinkouka/shoukougyou/kigyoujigyoushoshien/hojokinjoseiseido/23254.html"
  },
  {
    "id": "settsu-city-shinshohin-kaihatsu-hojo",
    "name": "摂津市中小企業等新商品開発支援補助金",
    "provider": "摂津市 生活環境部 産業振興課 商工労政係",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助対象経費の1/2、上限10万円",
    "summary": "市内の中小企業者が新商品を開発する際の費用の一部を補助する制度。",
    "eligibility": [
      "摂津市内の中小企業者",
      "新商品の開発を行うこと",
      "事業着手前に産業振興課へ相談・申請すること"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "摂津市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度の募集期間は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.settsu.osaka.jp/soshiki/seikatukannkyou/sangyoushinkouka/shoukougyou/kigyoujigyoushoshien/hojokinjoseiseido/25890.html"
  },
  {
    "id": "suita-city-boostup",
    "name": "吹田市中小企業ブーストアップ補助金",
    "provider": "吹田市 地域経済振興室",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率2/3（上限200万円）",
    "summary": "設備投資の経費を補助する。",
    "eligibility": [
      "創業後1年以上の事業実績がある中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "吹田市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度エントリーは8/31まで（受付終了の可能性、最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.suita.osaka.jp/sangyo/1018028/1018029/1018030/1041621.html"
  },
  {
    "id": "suita-city-chizai",
    "name": "吹田市知的財産権取得事業補助金",
    "provider": "吹田市 地域経済振興室",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率1/2（特許20万円、実用新案10万円まで）",
    "summary": "特許権・実用新案権の取得費用を補助する。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "吹田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "取得日の翌日から1年以内に申請",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.suita.osaka.jp/home/soshiki/div-toshimiryoku/chiikikeizai/shoukougyou/kigyouhojyo/chizaihojyo.html"
  },
  {
    "id": "suita-city-jinzai-ikusei",
    "name": "吹田市中小企業人材育成支援補助金",
    "provider": "吹田市 地域経済振興室",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率1/2（上限5万円）",
    "summary": "従業員の研修受講費等を補助する。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "吹田市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月20日〜令和9年3月19日",
    "deadline": "2027-03-19",
    "priority": 8,
    "url": "https://www.city.suita.osaka.jp/sangyo/1018028/1018029/1018030/1034178.html"
  },
  {
    "id": "suita-city-kaigyo-risokyu",
    "name": "吹田市開業資金融資に係る利子補給金",
    "provider": "吹田市 地域経済振興室",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "利子の10/10（利率1%で計算した額が上限）",
    "summary": "大阪府または日本政策金融公庫の開業融資の支払利子を補給する。",
    "eligibility": [
      "上記の開業融資を受けた中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "吹田市"
    ],
    "stages": [
      "early"
    ],
    "period": "融資を受けた日から2年以内に申請",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.suita.osaka.jp/sangyo/1018028/1018029/1018030/1011732.html"
  },
  {
    "id": "suita-city-sogyo-chinshaku",
    "name": "吹田市創業支援型事業所賃借料補助金",
    "provider": "吹田市 地域経済振興室",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "月額5万円×最長12か月",
    "summary": "市内で新たに事業所を借りて創業する方の賃借料を補助する。",
    "eligibility": [
      "市内で新規に事業所を借りて創業する方"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "吹田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度第1回(7/1〜7/27)は終了。第2回は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.suita.osaka.jp/sangyo/1018028/1018029/1018030/1023431.html"
  },
  {
    "id": "takatsuki-city-kigyo-teicyaku-hojo",
    "name": "高槻市企業定着促進補助金",
    "provider": "高槻市 産業環境部 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助対象経費の50%以内（最大500万円）",
    "summary": "市内に製造拠点を持つ中小製造業者の、防音・防振・防臭対策の設備導入や改修費を補助する。",
    "eligibility": [
      "市内に製造拠点のある中小企業者（製造業）",
      "防音・防振・防臭対策の設備導入または改修"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "高槻市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takatsuki.osaka.jp/soshiki/58/4323.html"
  },
  {
    "id": "takatsuki-city-miryoku-omise-ouen",
    "name": "高槻“魅力あるお店”応援プロジェクト（新規出店改装費補助）",
    "provider": "高槻市 産業環境部 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費の1/2。上限は都市拠点（高槻駅・富田駅周辺）100万円、関西将棋会館周辺150万円、その他50万円",
    "summary": "市内に新規出店する店舗の改装費を補助する。事前に事業計画書の審査があり、採択者のみ対象。令和8年度は第1次募集が終了し、第2次募集の掲載あり。",
    "eligibility": [
      "市内に新規出店する事業者",
      "事業計画書の審査で採択されること",
      "交付決定前に着工した工事は対象外"
    ],
    "industries": [
      "retail",
      "food",
      "beauty",
      "creative"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "高槻市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度 第1次は4/30締切で終了。第2次の期間は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takatsuki.osaka.jp/site/miryokuaruomise/"
  },
  {
    "id": "takatsuki-city-shoene-setsubi-jigyosha",
    "name": "令和8年度高槻市民間事業者省エネルギー設備等導入事業費補助金",
    "provider": "高槻市 環境部",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "設置費等の1/3（上限100万円）",
    "summary": "中小事業者の省エネルギー設備導入費を補助する。令和8年6月30日で受付終了、再募集の記載もあり。",
    "eligibility": [
      "市内の中小事業者",
      "省エネルギー設備等を導入すること"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "高槻市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年6月30日で受付終了（再募集は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takatsuki.osaka.jp/soshiki/25/1910.html"
  },
  {
    "id": "tondabayashi-city-akiten-katsuyo-shien-hojo",
    "name": "富田林市空き店舗活用支援事業補助金",
    "provider": "富田林市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費の1/2、上限20万円（特別枠50万円）",
    "summary": "市内の空き店舗を活用して市内で初めて店舗等を開設する方に、改装費の一部を補助する。事業開始前の申請が必要。",
    "eligibility": [
      "市内の空き店舗（事業休止から6か月以上）で市内初の店舗等を開設すること",
      "事業開始前に申請すること",
      "大型商業施設内テナントや自己所有物件は対象外"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "富田林市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（今年度の募集状況は市ページで確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tondabayashi.lg.jp/soshiki/36/105334.html"
  },
  {
    "id": "tondabayashi-city-shokogyo-shinko-hojo",
    "name": "富田林市商工業振興補助制度（BCP策定・人材育成）",
    "provider": "富田林市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "BCP策定：経費の1/2以内、上限10万円。研修派遣：受講料の1/2以内、1人3万円上限（1社年度内3人まで）。団体研修：1/2以内、1団体5万円上限",
    "summary": "中小企業者のBCP（事業継続計画）策定費や、従業員の外部研修派遣・団体研修の経費の一部を補助する。",
    "eligibility": [
      "市内の中小企業者（本店が市内、BCPは同一事業を1年以上営むこと）",
      "BCPは過去に同補助を受けていないこと"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "富田林市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認（年度ごとに受付、市ページで確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tondabayashi.lg.jp/soshiki/36/1498.html"
  },
  {
    "id": "toyonaka-city-it-kasokushin",
    "name": "豊中市IT化促進補助金",
    "provider": "豊中市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/2（上限10万円）",
    "summary": "ITコンシェルジュ派遣を利用した事業者のIT・WEB活用やIT人材育成を補助する。",
    "eligibility": [
      "ITコンシェルジュ派遣事業を利用した市内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "豊中市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜令和9年1月29日（予算上限で終了）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.toyonaka.osaka.jp/machi/sangyoushinkou/hojokin/R8itkasokushin.html"
  },
  {
    "id": "toyonaka-city-jinzai-kakuho",
    "name": "豊中市人材確保促進補助金",
    "provider": "豊中市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "上限10万円（高度副業人材は15万円、合計上限15万円）",
    "summary": "職場環境の整備や副業人材の活用経費を補助する。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "豊中市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜令和9年3月31日（予算上限で終了）",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.toyonaka.osaka.jp/machi/sangyoushinkou/hojokin/R8jinzaikakuho.html"
  },
  {
    "id": "toyonaka-city-startup-shien",
    "name": "豊中市スタートアップ支援補助金",
    "provider": "豊中市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率2/3（上限200万円）",
    "summary": "創業後間もない市内事業者の事業を補助する。",
    "eligibility": [
      "創業後間もない市内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "豊中市"
    ],
    "stages": [
      "early"
    ],
    "period": "令和8年度分は申込受付終了。次年度は要確認",
    "deadline": "2026-03-27",
    "priority": 8,
    "url": "https://www.city.toyonaka.osaka.jp/machi/sangyoushinkou/hojokin/r8startuphojokin.html"
  },
  {
    "id": "toyonaka-city-touroku-menkyozei",
    "name": "豊中市法人設立登録免許税助成金",
    "provider": "豊中市 産業振興課",
    "level": "municipality",
    "type": "助成金",
    "cat": "創業・起業",
    "amount": "株式会社7.5万円、合同会社3万円",
    "summary": "特定創業支援等事業を受けて設立した法人の登録免許税を助成する。",
    "eligibility": [
      "特定創業支援等事業を受け令和8年度に株式会社・合同会社を設立した方"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "豊中市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和9年3月31日まで（予算上限に達し次第終了）",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.toyonaka.osaka.jp/machi/sangyoushinkou/hojokin/R8tourokumenkyozei.html"
  },
  {
    "id": "yao-city-ishoku-jigyosha-keiei-gijutsu",
    "name": "八尾市意欲ある事業者経営・技術支援補助金（区分1）",
    "provider": "八尾市 魅力創造部 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "各区分とも補助上限10万円（補助率は要確認）",
    "summary": "製品開発、販路開拓、人材育成、ISO規格、環境貢献、BCP策定など7区分の経費を補助する。",
    "eligibility": [
      "市内の中小企業者",
      "同年度に他の公的機関から交付を受けた経費は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "八尾市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年4月15日から令和9年3月31日（郵送・当日消印有効）",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.yao.osaka.jp/sangyou_business/yuushi_hojokin/1012107/1017443.html"
  },
  {
    "id": "yao-city-ishoku-jigyosha-kubun2",
    "name": "八尾市意欲ある事業者経営・技術支援補助金（新事業展開、生産性向上）（区分2）",
    "provider": "八尾市 魅力創造部 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助上限200万円、補助率1/2（小規模事業者は2/3）",
    "summary": "重点支援地方交付金を活用し、新事業展開や生産性向上に取り組む中小企業に補助金を交付する。",
    "eligibility": [
      "市内の中小企業事業者"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "八尾市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yao.osaka.jp/sangyou_business/yuushi_hojokin/1012107/1022766.html"
  },
  {
    "id": "yao-city-shokibo-kigyo-yushi",
    "name": "八尾市小規模企業融資（府市町村連携型）と信用保証料助成",
    "provider": "八尾市 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額700万円、年1.1%、48か月以内。信用保証料は申請により全額助成",
    "summary": "小規模企業者向けの制度融資で、融資実行時に支払った信用保証料を市が助成する。",
    "eligibility": [
      "市内で6か月以上同じ事業を続けている小規模企業者"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "八尾市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年4月版の案内あり（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yao.osaka.jp/_res/projects/default_project/_page_/001/012/115/syoukibo8.4.pdf"
  },
  {
    "id": "yao-city-tokutei-sogyo-shien",
    "name": "八尾市 創業支援（特定創業支援証明書・創業相談）",
    "provider": "八尾市 中小企業サポートセンター・産業政策課",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "相談・支援は無料（詳細は要確認）",
    "summary": "八尾市の支援メニューを1か月以上継続して計4回以上受けると特定創業支援証明書が発行され、融資条件の改善などに使える。",
    "eligibility": [
      "八尾市内で創業を志す方・創業間もない方"
    ],
    "industries": "all",
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "八尾市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yao.osaka.jp/0000022617.html"
  },
  {
    "id": "hyogo-gxdx-setsubi-taiyo",
    "name": "兵庫県 GX・DX促進設備導入推進事業",
    "provider": "兵庫県 産業労働部／ひょうご産業活性化センター",
    "level": "prefecture",
    "type": "融資",
    "cat": "IT・デジタル",
    "amount": "要確認（設備の割賦・リース貸与）",
    "summary": "省エネ等のGXや人手不足対策のDXなどの設備を貸与する、令和8年度開始の事業。補助金ではなく貸与。",
    "eligibility": [
      "兵庫県内の中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://web.pref.hyogo.lg.jp/sr07/gxdxsokushinsetubidounyusuishin.html"
  },
  {
    "id": "hyogo-kasegu-chikara-setsubi",
    "name": "兵庫県 稼ぐ力の強化に向けた設備投資支援事業",
    "provider": "兵庫県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "持続的な賃上げ環境の整備を目的に、中小企業者等の収益力向上に資する設備投資を補助する。",
    "eligibility": [
      "兵庫県内の中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "事業実施期間は第1期2026年11月30日まで・第2期2027年1月31日まで。募集状況は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://web.pref.hyogo.lg.jp/sr07/kaseguchikara.html"
  },
  {
    "id": "hyogo-kigyoka-shien",
    "name": "兵庫県 起業家支援事業（一般事業枠・ふるさと・事業承継枠・若者枠・社会的事業枠）",
    "provider": "兵庫県 産業労働部／ひょうご産業活性化センター",
    "level": "prefecture",
    "type": "助成金",
    "cat": "創業・起業",
    "amount": "助成率は対象経費の1/2以内（上限額は要確認）",
    "summary": "県内での起業・創業を支援する助成金。ふるさと・事業承継枠、若者枠(30歳以下)、社会的事業枠などがある。",
    "eligibility": [
      "兵庫県内で起業する方",
      "枠ごとの要件は募集要領で要確認"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は2026年4月17日〜6月22日で受付終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://web.pref.hyogo.lg.jp/sr10/press/20260417.html"
  },
  {
    "id": "hyogo-seidoyuushi",
    "name": "兵庫県中小企業融資制度（制度融資）",
    "provider": "兵庫県 産業労働部／兵庫県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "創業・小規模事業者向けメニューを含む県の制度融資。",
    "eligibility": [
      "兵庫県内の中小企業者・創業者",
      "メニューごとの条件は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "随時（令和8年度版）",
    "deadline": null,
    "priority": 6,
    "url": "https://web.pref.hyogo.lg.jp/sr08/ie05_000000031.html"
  },
  {
    "id": "akashi-city-challenge-startup-hojo",
    "name": "明石市チャレンジ・スタートアップ事業者支援補助金",
    "provider": "明石市 産業振興部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "対象経費の2/3以内（上限50万円）",
    "summary": "新商品・新サービスの開発や販路開拓の経費を補助する。年度内に市内で創業予定の方も対象。令和8年度の募集は終了。",
    "eligibility": [
      "市内に本社がある中小企業者・小規模事業者",
      "年度内に市内で創業予定の方"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "明石市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年5月1日〜6月30日（終了。来年度は要確認）",
    "deadline": "2026-06-30",
    "priority": 8,
    "url": "https://www.city.akashi.lg.jp/sangyou/sangyou_ka/shokhogyo/shoukougyou/sinsyouhin.html"
  },
  {
    "id": "akashi-city-chusho-yushi-sogyo",
    "name": "明石市中小企業融資制度（創業支援資金ほか）",
    "provider": "明石市 産業振興部 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業支援資金は限度額1,000万円以内、返済7年以内、利率0.5%（40歳未満0.4%）。2025年4月1日時点の掲載",
    "summary": "市内の中小企業者向けの制度融資で、創業支援資金のほか設備資金・運転資金などがある。",
    "eligibility": [
      "市内の中小企業者・創業者",
      "詳細な条件は一覧で要確認"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "明石市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.akashi.lg.jp/sangyou/sangyou_ka/machizukuri/shokogyo/kee/taisakujigyo/hojokin/yushisedo.html"
  },
  {
    "id": "akashi-city-jigyosha-datsutanso-setsubi",
    "name": "明石市事業者用脱炭素化設備等導入支援事業",
    "provider": "明石市 環境部",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "事業者の脱炭素化設備等の導入を支援する。市の一覧では令和8年度は募集中と表示されている。",
    "eligibility": [
      "市内の事業者",
      "脱炭素化設備を導入すること（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "明石市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（令和8年度募集中と掲載）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.akashi.lg.jp/kankyou/kankyou_soumu_ka/top/taiyoukou_jigyousyayou.html"
  },
  {
    "id": "akashi-city-shotengai-shuttenn-challenge",
    "name": "商店街若者・女性新規出店チャレンジ応援事業補助金",
    "provider": "明石市 産業振興部 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "要確認",
    "summary": "商店街の空き店舗への新規出店・開業を支援する。令和8年11月末日を目途に、募集件数に達するまで募集期間を延長するとされている。",
    "eligibility": [
      "50歳未満の若者または女性",
      "商店街の空き店舗に新規出店・開業すること"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "明石市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年11月末日を目途に募集（件数に達するまで延長）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.akashi.lg.jp/sangyou/sangyou_ka/shuttennhojo.html"
  },
  {
    "id": "amagasaki-city-akitenpo-katsuyo",
    "name": "尼崎市空店舗活用支援事業（創業者向け）",
    "provider": "尼崎市 商業観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率2/3以内（限度額 1年目75万円・2年目50万円・3年目25万円）",
    "summary": "市場・商店街の空き店舗で新たに開業する創業者を支援。",
    "eligibility": [
      "創業塾などの講座を修了し創業支援を受けている人",
      "市場・商店街の空き店舗で開業"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "尼崎市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.amagasaki.hyogo.jp/sangyo/yusi_josei/keiei_sien/co_hojo/068syougyo.html"
  },
  {
    "id": "amagasaki-city-gijutsu-support-yushi",
    "name": "あまがさき技術サポート融資（利子補給）",
    "provider": "尼崎市／尼崎商工会議所",
    "level": "municipality",
    "type": "融資",
    "cat": "研究開発・新事業",
    "amount": "利息の1/2以内（借入日から2年以内）",
    "summary": "新技術・新製品の事業化を目指す中小企業向けの無担保融資に対し利子を補助。",
    "eligibility": [
      "新技術・新製品の事業化を目指す中小企業"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "尼崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.amagasaki.hyogo.jp/sangyo/yusi_josei/monodukuri/re_yusi/068asisuto.html"
  },
  {
    "id": "amagasaki-city-hoshoryo-hojo",
    "name": "令和8年度尼崎市信用保証料補助金",
    "provider": "尼崎市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "保証料の1/4以内（協調支援型長期資金）、1/2以内（経営円滑化貸付）",
    "summary": "兵庫県の融資制度を利用する中小企業の信用保証料の一部を補助。",
    "eligibility": [
      "市内に主たる事業所を有する中小企業者",
      "市税の未納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "尼崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（対象者確認後に保証申込み）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.amagasaki.hyogo.jp/sangyo/yusi_josei/yusi_sonota/1043484/1043103.html"
  },
  {
    "id": "amagasaki-city-shoryokuka-setsubi",
    "name": "尼崎市省力化・生産性向上設備導入支援補助金2026",
    "provider": "公益財団法人尼崎地域産業活性化機構",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "通常枠上限 製造業200万円・その他100万円、拡充枠最大500万円",
    "summary": "設備導入費用の一部を補助。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "尼崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.amagasaki.hyogo.jp/sangyo/yusi_josei/1011977/1042556.html"
  },
  {
    "id": "amagasaki-city-sogyo-anteika",
    "name": "尼崎市創業安定化支援（インキュベーション施設の賃料補助）",
    "provider": "尼崎市／株式会社エーリック",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "月額賃料の1/2以内（上限月額48,000円）",
    "summary": "尼崎リサーチ・インキュベーションセンター入居の創業者に賃料を補助。経営相談員の派遣もあり。",
    "eligibility": [
      "創業5年未満の中小企業者等",
      "同センターに入居"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "尼崎市"
    ],
    "stages": [
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.amagasaki.hyogo.jp/sangyo/yusi_josei/keiei_sien/1006270.html"
  },
  {
    "id": "ashiya-city-chusho-kigyo-yushi-seido",
    "name": "芦屋市中小企業融資制度（信用保証料補助）",
    "provider": "芦屋市 地域経済振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "小規模事業少額資金は貸付限度額300万円、信用保証料を市が負担（金利・条件は市ページで要確認）",
    "summary": "市内中小企業者向けの融資あっせん制度。300万円以下の少額資金は信用保証料を市が負担する。",
    "eligibility": [
      "市内で6か月以上同一事業を営む中小企業者（近代化資金は1年以上）",
      "市税を完納していること",
      "兵庫県信用保証協会の保証が受けられること"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "芦屋市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（取扱金融機関を通じて申込み）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ashiya.lg.jp/keizai/yuushi.html"
  },
  {
    "id": "ashiya-city-shoene-setsubi-daikibo-kaishu-hojo",
    "name": "芦屋市省エネ設備導入のための大規模改修促進事業補助金",
    "provider": "芦屋市 環境課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "対象経費の1/3以内、上限100万円",
    "summary": "市内事業所を持つ中小企業等が省エネ設備を導入する大規模改修を行う際の経費の一部を補助する。",
    "eligibility": [
      "市内に事業所を有する中小企業・社会福祉法人等",
      "設備購入前に申請すること",
      "年間温室効果ガス削減量の要件を満たすこと"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "芦屋市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年6月1日〜令和9年2月26日",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.ashiya.lg.jp/kankyou/energy-saving-hojo.html"
  },
  {
    "id": "ashiya-city-wakamono-josei-shuten-challenge-hojo",
    "name": "芦屋市商店街若者・女性新規出店チャレンジ応援事業補助金",
    "provider": "芦屋市 地域経済振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "市分の上限75万円（県分と合わせ150万円）",
    "summary": "商店街の空き店舗に新規出店する若者・女性の店舗賃借料や内装工事費等を補助する。着手前の相談が必要。",
    "eligibility": [
      "補助年度の4月1日時点で50歳未満の方または女性",
      "商店街の空き店舗での新規出店（フランチャイズ等は対象外）",
      "交付決定前に工事請負契約を結ばないこと"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "芦屋市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（今年度の募集状況は市ページで確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ashiya.lg.jp/keizai/wakamonojosei.html"
  },
  {
    "id": "himeji-city-digital-katsuyo",
    "name": "姫路市産業デジタル化活用促進補助金",
    "provider": "姫路商工会議所（姫路市事業）",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率3/4（税抜対象経費）",
    "summary": "AIツールを活用したデジタル機器等の導入を支援する。",
    "eligibility": [
      "市内の中小事業者"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "姫路市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は6/11〜8/31で受付終了。次年度は要確認",
    "deadline": "2026-08-31",
    "priority": 8,
    "url": "https://www.city.himeji.lg.jp/shisei/0000033003.html"
  },
  {
    "id": "himeji-city-green-family",
    "name": "姫路市郊外部創業者 信用保証料助成（グリーンファミリー制度）",
    "provider": "姫路市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "自己負担保証料の1/4（上限10万円）",
    "summary": "郊外部で創業し兵庫県融資を利用する事業者の保証料を助成する。",
    "eligibility": [
      "郊外部で創業する事業者",
      "県の信用保証料助成制度の利用者"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "姫路市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.himeji.lg.jp/sangyo/0000028506.html"
  },
  {
    "id": "himeji-city-hosyoryo-josei",
    "name": "姫路市 兵庫県中小企業融資制度に係る信用保証料助成",
    "provider": "姫路市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "新規開業貸付は保証料の50%、経営円滑化貸付は5%",
    "summary": "兵庫県の融資制度を利用する市内中小企業者の信用保証料の一部を助成する。",
    "eligibility": [
      "市内に主たる事業所がある中小企業者",
      "市税の滞納がない"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "姫路市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.himeji.lg.jp/sangyo/0000005776.html"
  },
  {
    "id": "himeji-city-monozukuri-kaihatsu",
    "name": "姫路市ものづくり開発奨励補助金",
    "provider": "姫路市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "最高100万円",
    "summary": "選考会議で優秀と認められた製品開発を補助する。",
    "eligibility": [
      "市内のものづくり企業"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "姫路市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年10月13日〜12月11日",
    "deadline": "2026-12-11",
    "priority": 8,
    "url": "https://www.city.himeji.lg.jp/sangyo/0000025483.html"
  },
  {
    "id": "himeji-city-sogyosha-oen",
    "name": "姫路市創業者応援補助金",
    "provider": "姫路市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内（内装工事費上限30万円、広告宣伝費上限15万円）",
    "summary": "創業時の店舗内装工事費と広告宣伝費を補助する。",
    "eligibility": [
      "令和8年度中に市内で創業する方",
      "商工会議所・商工会の推薦または特定創業支援事業の証明書"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "姫路市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年3月31日に創業（事業着手前に申請）",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.himeji.lg.jp/sangyo/0000030459.html"
  },
  {
    "id": "itami-city-chusho-shinko-yushi",
    "name": "伊丹市中小企業振興融資制度（創業資金ほか）",
    "provider": "伊丹市 商工労働課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業資金は限度額1,000万円（自己資金の2倍以内）。その他の条件は要確認",
    "summary": "市内中小企業者向けの制度融資。創業資金のほか運転・設備資金があり、兵庫県信用保証協会の保証が必要。",
    "eligibility": [
      "市内で事業を営む（または創業する）中小企業者",
      "兵庫県信用保証協会の保証が受けられること"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "伊丹市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.itami.lg.jp/SOSIKI/TOSHIKATSURYOKU/SYOKORODO/chuushoukigyouyuushi/1390885788253.html"
  },
  {
    "id": "itami-city-kigyo-ricchi-shien",
    "name": "伊丹市企業立地支援制度",
    "provider": "伊丹市 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "市内への企業立地や設備投資（設備購入を含む）を促進するための支援制度。",
    "eligibility": [
      "市内で立地・設備投資を行う事業者（詳細要件は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "伊丹市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.itami.lg.jp/SOSIKI/TOSHIKATSURYOKU/SYOKORODO/kigyourixtuchishienn/1390887277919.html"
  },
  {
    "id": "itami-city-sogyo-shien-hojokin",
    "name": "伊丹市創業支援補助金",
    "provider": "伊丹市 都市活力部 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2、上限50万円（市内転入・市民雇用で最大10万円加算）",
    "summary": "市の特定創業支援等事業を受けて市内で創業した中小企業者の創業経費の一部を補助する。予算がなくなり次第終了。",
    "eligibility": [
      "特定創業支援等事業の証明書を受けている",
      "令和8年4月1日以降に伊丹市内で創業",
      "創業後3年以上事業継続の意思がある"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "伊丹市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度分の交付申請受付中（予算がなくなり次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.itami.lg.jp/SOSIKI/TOSHIKATSURYOKU/SYOKORODO/sougyoushien/hojokin.html"
  },
  {
    "id": "kakogawa-city-akitenpo-katsuyo",
    "name": "令和8年度 空き店舗等活用支援事業補助金",
    "provider": "加古川市 地域振興部 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "店舗賃借料1/2（月額上限5万円・最大24か月）、店舗改装費2/3（上限25万円）、広告宣伝費2/3（上限10万円）",
    "summary": "中心市街地・東加古川・別府エリアの空き店舗に出店する事業者の賃借料・改装費・広告宣伝費を補助する。",
    "eligibility": [
      "令和8年4月1日以降に対象エリアの空き店舗等で開業した事業者",
      "令和7年度開業者は店舗賃借料のみ申請可",
      "敷金・礼金・共益費・備品購入費等は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "加古川市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認（令和8年度分として公開、期限は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kakogawa.lg.jp/jigyoshanokatae/shoko_norinsuisangyo_rodo/shogyo/43717.html"
  },
  {
    "id": "kakogawa-city-miryoku-hasshin",
    "name": "加古川市中小企業魅力発信支援補助金",
    "provider": "加古川市 地域振興部 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "展示会出展費用の1/2以内（上限15万円）、年度内1回限り",
    "summary": "市内中小企業の展示会出展費用の一部を助成し、販路開拓・新規市場開拓を支援する。",
    "eligibility": [
      "市内の中小企業者（建設業・製造業・情報通信サービス業等が中心）",
      "展示会等への出展費用"
    ],
    "industries": [
      "manufacturing",
      "construction",
      "it"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "加古川市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kakogawa.lg.jp/soshikikarasagasu/chiikishinkobu/shokorosei/syogyo_kogyo/monodukurishien/50383.html"
  },
  {
    "id": "kakogawa-city-yushi-assen",
    "name": "加古川市 中小企業者への融資あっせん制度（創業支援融資ほか）",
    "provider": "加古川市 地域振興部 商工労政課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "創業支援融資：年0.7%、限度額1,000万円（特定創業支援等事業を受けた場合1,500万円）、保証料の1/2を市が負担。小規模企業支援融資は限度額1,250万円・保証料1/2負担、一般融資は限度額3,000万円・年1.5%",
    "summary": "市内中小企業者向けの制度融資。創業支援融資・小規模企業支援融資は信用保証料の1/2を市が負担する。",
    "eligibility": [
      "市内に住所または事業所がある中小企業者",
      "市税を滞納していないこと"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "加古川市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年（令和8年4月1日現在の条件）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kakogawa.lg.jp/jigyoshanokatae/shoko_norinsuisangyo_rodo/shogyo/1415854272500.html"
  },
  {
    "id": "kawanishi-city-chusho-shinko-jigyo",
    "name": "川西市中小企業振興事業補助制度",
    "provider": "川西市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "市内中小企業者の技術開発、産業財産権取得、見本市出展、防火・防災設備などの費用の一部を補助する。前年度に市が指定する期日までの計画書提出が原則必要。",
    "eligibility": [
      "川西市内の中小企業者",
      "前年度の指定期日までに計画書を提出していること"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "川西市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度分の計画書提出は終了。令和9年度分は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kawanishi.hyogo.jp/business/syokogyo/1019925/syokogyo2.html"
  },
  {
    "id": "kawanishi-city-keiei-kakushin-shien",
    "name": "川西市経営革新事業支援補助金",
    "provider": "川西市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "対象経費の3分の1以内（上限額は要確認）",
    "summary": "兵庫県の経営革新計画の承認を受けた中小企業者の、謝金・委託費・設備費・広報費などを補助する。",
    "eligibility": [
      "兵庫県の経営革新計画の承認を受けた中小企業者",
      "市内で事業を営み市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "川西市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kawanishi.hyogo.jp/business/syokogyo/1019925/1012440.html"
  },
  {
    "id": "kawanishi-city-shinki-shutten-shien",
    "name": "川西市新規出店事業支援補助金",
    "provider": "川西市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "内装・外装工事費は2分の1以内で上限50万円。中心市街地では賃借料を月5万円上限・5分の1以内で補助",
    "summary": "小売業・飲食店の新規出店に伴う店舗工事費と、中心市街地への出店時の賃借料を補助する。賃借料は開店6か月後から12か月間が対象で年度ごとに申請。",
    "eligibility": [
      "市内で小売業または飲食店等を新規出店する人",
      "店舗を賃借または取得して出店すること",
      "既存店を閉店しての出店は対象外"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "川西市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kawanishi.hyogo.jp/business/syokogyo/1019925/1012629.html"
  },
  {
    "id": "nishinomiya-city-shoryokuka-ai-setsubi",
    "name": "西宮市 設備・AI導入支援補助金",
    "provider": "西宮市 産業文化局 商工課（西宮商工会議所）",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "設備:補助率2/3(上限 製造業200万円・その他100万円)、AI導入:補助率1/2(上限20万円)",
    "summary": "省力化・生産性向上設備やAIを導入する市内事業者の経費の一部を補助する。",
    "eligibility": [
      "市内の中小企業・個人事業主",
      "設備は対象経費30万円以上、AIは6万円以上"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "西宮市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "2026年5月1日〜12月15日(予算に達し次第終了)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.nishi.or.jp/jigyoshajoho/sangyoshinko/keieiryoku/setubiaihojo.html"
  },
  {
    "id": "nishinomiya-city-shotengai-shuten",
    "name": "西宮市 商店街新規出店応援事業",
    "provider": "西宮市 産業文化局 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "最大100万円(市単独・市県併用の2種類)",
    "summary": "商店街の空き店舗に新たに出店する際の内装工事費などを補助する。",
    "eligibility": [
      "商店街の空き店舗に新規出店する事業者"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "西宮市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度募集中(予算上限に達し次第終了)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.nishi.or.jp/jigyoshajoho/sangyoshinko/shotengai/shogyoakinmise.html"
  },
  {
    "id": "nishinomiya-city-sogyo-shien-menu",
    "name": "西宮市 特定創業支援等事業(創業支援メニュー)",
    "provider": "西宮市 産業文化局 商工課",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "要確認(受講修了で登録免許税軽減・小規模事業者持続化補助金創業型の要件など)",
    "summary": "市と西宮商工会議所等が連携する創業セミナー・相談を受け、修了証明で各種優遇を受けられる。",
    "eligibility": [
      "市内で創業予定または創業後間もない方"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "西宮市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時(最新は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.nishi.or.jp/jigyoshajoho/sangyoshinko/shinkisogyo/sougyou.html"
  },
  {
    "id": "takarazuka-city-hosyoryo-hojo",
    "name": "宝塚市中小企業振興資金融資補助金（保証料補助）",
    "provider": "宝塚市 商工勤労課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "貸付額500万円以下の信用保証料の一部、上限10万円",
    "summary": "小規模企業振興資金を利用した場合の信用保証料を一部補助する。",
    "eligibility": [
      "市の小規模企業振興資金の融資を利用した市内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "宝塚市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（ページ更新が古い可能性）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takarazuka.hyogo.jp/kanko/1009616/sangyo/1042194/1042196/1020180.html"
  },
  {
    "id": "takarazuka-city-kigyo-yushi-riko-hokyu",
    "name": "宝塚市起業融資活用者利子補給金",
    "provider": "宝塚市 商工勤労課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "当初借入額1,000万円以下に係る利子を最大3年間補給",
    "summary": "起業融資を利用した人の利子を補給する。令和8年度分は予算上限により受付終了。",
    "eligibility": [
      "対象の起業融資を利用した人",
      "融資実行日等の最も早い日が令和8年4月1日以降なら来年度申請可"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "宝塚市"
    ],
    "stages": [
      "early"
    ],
    "period": "令和8年度分は受付終了（来年度申請の案内あり）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takarazuka.hyogo.jp/1060684/1060712/1061604/1042197/1020179.html"
  },
  {
    "id": "takarazuka-city-kigyoka-shien-shikin",
    "name": "宝塚市中小企業振興資金（起業家等支援資金）融資あっせん",
    "provider": "宝塚市 商工勤労課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "限度額500万円、年0.6%、返済5年以内",
    "summary": "市内で起業する人などへの融資あっせん制度。運転資金・設備資金に利用できる。",
    "eligibility": [
      "市内で起業する（した）中小企業者",
      "市税の滞納がない",
      "宝塚商工会議所の創業支援セミナー受講またはそれに相当する支援を受けている"
    ],
    "industries": "all",
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "宝塚市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takarazuka.hyogo.jp/kanko/1009616/sangyo/1042196/1002725.html"
  },
  {
    "id": "takarazuka-city-shinki-shutten-challenge",
    "name": "宝塚市新規出店改装チャレンジ応援補助金（出店促進型）",
    "provider": "宝塚市 商工勤労課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費等の1/2以内、上限120万円（一部エリアは135万円）",
    "summary": "市内に新規出店する事業者の改装工事費の一部を補助する。",
    "eligibility": [
      "市内に新規出店しようとする事業者",
      "改装工事を伴う出店"
    ],
    "industries": [
      "retail",
      "food",
      "beauty",
      "care",
      "education"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "宝塚市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は事業計画書提出期間 8/20〜9/30、2次募集の案内あり（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takarazuka.hyogo.jp/kanko/1009616/sangyo/1042197/1042203.html"
  },
  {
    "id": "takarazuka-city-store-renovation",
    "name": "宝塚市新規出店改装チャレンジ応援補助金（店舗等リノベーション型）",
    "provider": "宝塚市 商工勤労課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "改装費等の1/2以内、上限20万円",
    "summary": "店舗の改装（照明・給湯設備の設置取替など）にかかる費用の一部を補助する。",
    "eligibility": [
      "市内で店舗を営む（営もうとする）事業者"
    ],
    "industries": [
      "retail",
      "food",
      "beauty",
      "care",
      "education"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "宝塚市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.takarazuka.hyogo.jp/kanko/1009616/sangyo/1042197/1045184.html"
  },
  {
    "id": "nara-jigyo-shokei-enkatsu",
    "name": "奈良県事業承継円滑化支援補助金",
    "provider": "奈良県 経営支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "要確認",
    "summary": "後継者不在の事業者の第三者承継（M&A）マッチング費用等を補助する。",
    "eligibility": [
      "後継者不在等の県内中小事業者",
      "事業承継・引継ぎ支援センターの確認が必要"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和7年度は2025年12月26日で終了。令和8年度は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.nara.jp/31935.htm"
  },
  {
    "id": "nara-kigyoka-shien",
    "name": "奈良県 起業家支援事業",
    "provider": "奈良県 産業・観光・雇用振興部 経営支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限200万円・補助率1/2以内（令和7年度情報）",
    "summary": "県内で起業する方の人件費・店舗賃料・設備費・原材料費等を補助する。",
    "eligibility": [
      "奈良県内で起業する方"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認（令和7年度情報）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.nara.jp/68792.htm"
  },
  {
    "id": "nara-senior-kigyo",
    "name": "奈良県 シニア起業支援事業",
    "provider": "奈良県 産業・観光・雇用振興部 経営支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "最大200万円・補助率1/2以内",
    "summary": "県内で新たに起業するシニア世代を支援する補助金。",
    "eligibility": [
      "奈良県内で起業するシニア世代の方"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は6月8日〜7月17日で終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.nara.jp/68894.htm"
  },
  {
    "id": "nara-shoryokuka-setsubi",
    "name": "奈良県 中小企業省力化・生産性向上設備投資支援補助金",
    "provider": "奈良県 産業・観光・雇用振興部 経営支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "上限500万円・補助率1/2（令和7年度）",
    "summary": "賃上げを条件に、省力化・生産性向上設備の投資を補助する。",
    "eligibility": [
      "奈良県内の中小企業",
      "賃上げが条件"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和7年度は2026年1月16日で終了。令和8年度は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.nara.jp/69203.htm"
  },
  {
    "id": "nara-sogyo-shikin",
    "name": "奈良県 創業資金（女性・若者・シニア・UIJターン枠）",
    "provider": "奈良県 経営支援課／奈良県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "限度額1,500万円・知事認定で利率・保証料率0%",
    "summary": "創業する女性・若者・シニア・UIJターンの方向けの制度融資。",
    "eligibility": [
      "創業する方",
      "知事認定が必要"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（令和8年4月1日現在）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.nara.jp/27444.htm"
  },
  {
    "id": "ikoma-city-hanro-kaitaku-shuten-hojo",
    "name": "生駒市中小企業販路開拓出展事業費補助金",
    "provider": "生駒市 地域活力創生部 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "展示会への出展経費の一部を補助する。一般事務機器・ソフトや社内従業員の旅費などは対象外。",
    "eligibility": [
      "市内の中小企業者",
      "展示会等へ出展すること"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [
      "生駒市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認（今年度の募集状況は市ページで確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ikoma.lg.jp/0000027932.html"
  },
  {
    "id": "ikoma-city-jinzai-kakuho-sogo-shien-hojo",
    "name": "生駒市人材確保等総合支援事業補助金",
    "provider": "生駒市 地域活力創生部 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "市内事業者の採用活動や業務委託などによる人材確保の取組を支援する補助金（イコフォス）。",
    "eligibility": [
      "中小企業基本法上の中小企業・小規模企業者、公益法人、医療法人、組合等",
      "事業期間が令和8年4月1日〜令和9年1月31日であること"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [
      "生駒市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年6月22日〜12月25日（予算がなくなり次第終了）",
    "deadline": "2026-12-25",
    "priority": 8,
    "url": "https://www.city.ikoma.lg.jp/0000041653.html"
  },
  {
    "id": "kashihara-city-package-shinshohin",
    "name": "橿原市 パッケージ改良・新商品開発補助金",
    "provider": "橿原市",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "パッケージ改良・新商品開発に対する補助金。令和8年4月23日に募集開始が発表された。",
    "eligibility": [
      "要確認"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [
      "橿原市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月23日募集開始（締切・現在の受付状況は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kashihara.nara.jp/soshiki/1003/gyomu/7/5/20309.html"
  },
  {
    "id": "kashihara-city-sogyo-yushi",
    "name": "橿原市創業支援融資制度",
    "provider": "橿原市 地域振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額1,000万円以内、期間7年以内、年1.10%、信用保証料は市が全額負担",
    "summary": "創業者向けの市の制度融資。信用保証料を市が負担する。取扱は南都銀行、大和信用金庫、奈良中央信用金庫、京都銀行。",
    "eligibility": [
      "市内で創業する、または創業して間もない事業者",
      "要確認"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [
      "橿原市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）。なお関連の創業支援融資利子補給金は令和7年3月31日までの申込分で終了",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kashihara.nara.jp/soshiki/1027/gyomu/3/2/2566.html"
  },
  {
    "id": "kashihara-city-startup-hojo",
    "name": "橿原市起業等スタートアップ補助金",
    "provider": "橿原市 地域振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2、上限50万円（空き店舗を使わない場合は上限20万円）",
    "summary": "市内の空き店舗を活用して起業・新分野に事業拡大する方の改修費・広告宣伝費・備品購入費などを補助する。令和8年4月に情報通信業を対象に追加するなど拡充。",
    "eligibility": [
      "かしはら創業塾または奈良県よろず支援拠点の土曜塾を受講していること",
      "市内で新たに起業または新分野へ事業拡大すること"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [
      "橿原市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度分は令和8年7月13日に予算上限に達し受付終了。次年度は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kashihara.nara.jp/shigoto_sangyo/kigyoshien/2/13453.html"
  },
  {
    "id": "nara-city-chusho-yushi",
    "name": "奈良市中小企業融資制度（令和6年度新制度）",
    "provider": "奈良市 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "市内中小企業の資金繰りを支える市の融資制度。令和6年度から新制度に移行。",
    "eligibility": [
      "市内で事業を営む中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [
      "奈良市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nara.lg.jp/soshiki/109/9010.html"
  },
  {
    "id": "nara-city-datsutanso-hojo",
    "name": "奈良市地域脱炭素移行・再エネ推進事業補助金（事業所向け）",
    "provider": "奈良市 環境都市推進課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "事業所への省エネ・再エネ設備の導入費用を補助。",
    "eligibility": [
      "市内の事業所（事業者）"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [
      "奈良市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月16日〜12月25日",
    "deadline": "2026-12-25",
    "priority": 8,
    "url": "https://www.city.nara.lg.jp/site/zerocarbon/263838.html"
  },
  {
    "id": "nara-city-nigiwai-hojo",
    "name": "奈良市中小商業者等にぎわい創出事業補助金",
    "provider": "奈良市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "市内の中小商業者等による販路拡大・にぎわい創出のイベント等を支援する補助金。",
    "eligibility": [
      "市内の中小商業者等（対象団体・要件は要確認）"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "奈良県"
    ],
    "cities": [
      "奈良市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認（令和8年度ページは6月30日更新）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nara.lg.jp/site/jigyosyashien/list932.html"
  },
  {
    "id": "nara-city-shintaisen-hojo",
    "name": "奈良市中小企業等新たな挑戦支援補助金",
    "provider": "奈良市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率2/3・上限30万円（過去公募の情報。令和8年度は要確認）",
    "summary": "新商品開発・新サービス提供など新たな挑戦に取り組む市内事業者を支援する補助金。",
    "eligibility": [
      "市内の中小企業者等",
      "新たな挑戦・取組（新商品開発・新サービス等）を行うこと"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [
      "奈良市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（令和8年度ページは6月30日更新）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nara.lg.jp/soshiki/109/180941.html"
  },
  {
    "id": "nara-city-sogyo-shien-shikin",
    "name": "奈良市創業支援資金",
    "provider": "奈良市 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "融資限度額1,000万円・利率年1.00%以内（固定）・期間5年以内（据置6月以内）",
    "summary": "新しく事業を始める事業者向けの市の制度融資。奈良県信用保証協会の創業関連保証を利用。",
    "eligibility": [
      "創業関連保証を受けられる創業者・創業間もない事業者"
    ],
    "industries": "all",
    "prefectures": [
      "奈良県"
    ],
    "cities": [
      "奈良市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nara.lg.jp/soshiki/109/8684.html"
  },
  {
    "id": "wakayama-chiiki-kadai-kigyo",
    "name": "わかやま地域課題解決型起業支援補助金",
    "provider": "和歌山県 商工観光労働部 商工振興課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "要確認",
    "summary": "地域課題の解決に取り組む起業を支援する県の創業補助金。",
    "eligibility": [
      "和歌山県内で地域課題解決型の起業を行う方"
    ],
    "industries": "all",
    "prefectures": [
      "和歌山県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は4月1日〜5月8日で終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.wakayama.lg.jp/prefg/061000/d00201895.html"
  },
  {
    "id": "wakayama-chusho-seicho-sokushin",
    "name": "和歌山県中小企業成長促進事業（補助金）",
    "provider": "和歌山県 商工観光労働部 商工企画課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率2/3以内・100万円〜1,000万円",
    "summary": "生産性向上や賃上げに向けた設備投資を補助する。",
    "eligibility": [
      "県内中小企業",
      "創業から1年以上経過していること"
    ],
    "industries": "all",
    "prefectures": [
      "和歌山県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度は5月18日〜7月31日で終了（受付終了表示あり）。以降は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.wakayama.lg.jp/prefg/060100/d00221813.html"
  },
  {
    "id": "wakayama-genki-fund",
    "name": "わかやま中小企業元気ファンド",
    "provider": "わかやま産業振興財団",
    "level": "prefecture",
    "type": "助成金",
    "cat": "販路開拓・PR",
    "amount": "助成率2/3以内・分野A 50万〜99.9万円、分野B 100万〜600万円",
    "summary": "地域産業資源を活用した新商品・新サービスの開発や販路開拓を支援する。",
    "eligibility": [
      "県内の中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "和歌山県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は2026年1月16日で終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.wakayama.lg.jp/prefg/061000/fund/fund.html"
  },
  {
    "id": "wakayama-seidoyuushi",
    "name": "和歌山県中小企業融資制度（新規開業資金・事業承継支援資金ほか）",
    "provider": "和歌山県 商工観光労働部 商工振興課／和歌山県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "新規開業資金（創業枠・創業サポート枠）や事業承継支援資金などを含む制度融資。",
    "eligibility": [
      "県内で新規に事業を開始する創業者、中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "和歌山県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "随時（令和8年度版）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.wakayama.lg.jp/prefg/060300/gyoumu/kinyuu/sangyoushien.html"
  },
  {
    "id": "tanabe-city-chusho-hosho-ryo-hojo",
    "name": "田辺市中小企業信用保証料補助金",
    "provider": "田辺市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "信用保証料の1年分相当額、上限30万円",
    "summary": "和歌山県の中小企業融資制度（経営支援資金・小企業応援資金の一般・小口枠）を利用した際の信用保証料を市が一部補助する制度。",
    "eligibility": [
      "田辺市内に住所または事業所を有する中小企業者",
      "対象の県融資制度を利用していること",
      "市税を完納していること"
    ],
    "industries": "all",
    "prefectures": [
      "和歌山県"
    ],
    "cities": [
      "田辺市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "融資実行日から60日以内",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tanabe.lg.jp/soshiki/shokokanko/1/5/1385.html"
  },
  {
    "id": "tanabe-city-shinki-kaigyo-rishi-hokyu",
    "name": "田辺市新規開業資金利子補給金",
    "provider": "田辺市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "利子補給利率1.5%以内、補助期間5年（開業後7年まで）",
    "summary": "新規開業者が融資を受けた際の利子の一部を市が補給する制度。",
    "eligibility": [
      "田辺市内に住所または事業所を有する新規開業者",
      "対象の開業資金融資を利用していること",
      "市税を完納していること"
    ],
    "industries": "all",
    "prefectures": [
      "和歌山県"
    ],
    "cities": [
      "田辺市"
    ],
    "stages": [
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tanabe.lg.jp/shoukou/"
  },
  {
    "id": "tanabe-city-shokibo-shikin-rishi-hokyu",
    "name": "田辺市小企業資金利子補給金",
    "provider": "田辺市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "利子補給利率1.0%以内、補助期間3年",
    "summary": "日本政策金融公庫の小規模事業者経営改善資金などを利用した小規模事業者に、利子の一部を補給する制度。",
    "eligibility": [
      "田辺市内に住所または事業所を有する個人事業主・法人",
      "対象の融資（小規模事業者経営改善資金等）を利用していること",
      "市税を完納していること"
    ],
    "industries": "all",
    "prefectures": [
      "和歌山県"
    ],
    "cities": [
      "田辺市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tanabe.lg.jp/shoukou/"
  },
  {
    "id": "wakayama-city-business-chance",
    "name": "和歌山市ビジネスチャンス創出支援補助金",
    "provider": "和歌山市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認（見本市出展・自社ECサイト構築・パンフレット作成等が対象）",
    "summary": "市内中小企業者の販路開拓や新製品の改良を支援する補助金。予算枠に達し次第終了。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "和歌山県"
    ],
    "cities": [
      "和歌山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜令和9年1月29日（予算枠に達し次第終了）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.wakayama.wakayama.jp/1016047/sangyoukigyousien/1017324.html"
  },
  {
    "id": "wakayama-city-datsutanso-keiei",
    "name": "和歌山市中小企業脱炭素経営促進補助金",
    "provider": "和歌山市 環境部局",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "中小企業の脱炭素経営の取組を促進する令和8年度の補助金。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "和歌山県"
    ],
    "cities": [
      "和歌山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（詳細は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.wakayama.wakayama.jp/kurashi/gomi_kankyo/1001115/1065401/index.html"
  },
  {
    "id": "wakayama-city-joshi-wakamono-riko",
    "name": "和歌山市 女性・若者・シニア新規開業資金等利子補給金",
    "provider": "和歌山市 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "支払利子の1/2相当額（年利率1.0%上限、当初3年間）",
    "summary": "日本政策金融公庫の新規開業資金等を利用した創業者に利子の一部を補給。",
    "eligibility": [
      "日本政策金融公庫の対象融資を利用した市内の創業者"
    ],
    "industries": "all",
    "prefectures": [
      "和歌山県"
    ],
    "cities": [
      "和歌山市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "交付申請は令和8年12月28日まで",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.wakayama.wakayama.jp/1016047/sangyoukigyousien/1007360/1009974.html"
  },
  {
    "id": "wakayama-city-machinaka-hosho",
    "name": "和歌山市まちなか新規出店促進保証料補給金",
    "provider": "和歌山市 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "空き店舗・商店街",
    "amount": "信用保証料の1/2・上限30万円",
    "summary": "市融資制度の「まちなか枠」を利用してまちなかに事業所を新設する際の信用保証料を補助。",
    "eligibility": [
      "まちなかに事業所を新設する中小企業者等",
      "市中小企業融資制度（まちなか枠）を利用"
    ],
    "industries": "all",
    "prefectures": [
      "和歌山県"
    ],
    "cities": [
      "和歌山市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.wakayama.wakayama.jp/1016047/sangyoukigyousien/1007360/1009293.html"
  },
  {
    "id": "wakayama-city-shotoku-koujo",
    "name": "和歌山市所得向上補助金",
    "provider": "和歌山市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "設備投資費の一部（令和8年度から補助率最大10%）",
    "summary": "設備投資の一部を補助し、所得向上につなげる制度。",
    "eligibility": [
      "市内で事業を営む事業者（要件は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "和歌山県"
    ],
    "cities": [
      "和歌山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年12月28日必着",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.wakayama.wakayama.jp/1016047/sangyoukigyousien/1001189/1049442.html"
  },
  {
    "id": "tottori-chiiki-kadai-kigyo",
    "name": "鳥取県地域課題解決型起業支援補助金",
    "provider": "鳥取県 商工労働部 企業支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2、上限200万円",
    "summary": "県内で地域課題の解決に取り組む起業・創業に要する経費を補助する。令和8年度は2次募集が行われた。",
    "eligibility": [
      "県内で開業届の提出や法人設立を行う人など",
      "地域課題の解決を目的とした事業"
    ],
    "industries": "all",
    "prefectures": [
      "鳥取県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度2次募集 2026-06-19〜2026-07-31（受付終了。次回は要確認）",
    "deadline": "2026-07-31",
    "priority": 6,
    "url": "https://www.pref.tottori.lg.jp/269488.htm"
  },
  {
    "id": "tottori-chinage-oen-shikin",
    "name": "中小事業者賃上げ応援資金",
    "provider": "鳥取県 商工労働部（制度融資）",
    "level": "prefecture",
    "type": "融資",
    "cat": "人材・雇用",
    "amount": "融資限度額3,000万円",
    "summary": "賃上げに取り組む中小事業者向けの県制度融資。",
    "eligibility": [
      "賃上げに取り組む県内中小事業者"
    ],
    "industries": "all",
    "prefectures": [
      "鳥取県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.tottori.lg.jp/322253.htm"
  },
  {
    "id": "tottori-ichinengo-shienkin",
    "name": "設立・開業一年後支援金",
    "provider": "鳥取県 商工労働部 企業支援課",
    "level": "prefecture",
    "type": "給付金",
    "cat": "創業・起業",
    "amount": "法人25万円、個人15万円（定額）",
    "summary": "創業支援資金などの融資を受けた事業者に、融資開始から1年後に定額の支援金を支給する。",
    "eligibility": [
      "創業支援資金等の融資を受けた事業者"
    ],
    "industries": "all",
    "prefectures": [
      "鳥取県"
    ],
    "cities": [],
    "stages": [
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.tottori.lg.jp/99747.htm"
  },
  {
    "id": "tottori-jigyoshokei-sokushin",
    "name": "産業未来共創事業〈事業承継促進型〉",
    "provider": "鳥取県 商工労働部 企業支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "補助率1/2、上限200万円",
    "summary": "事業承継に伴う取組に要する経費を補助する。",
    "eligibility": [
      "事業承継に取り組む県内中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "鳥取県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.tottori.lg.jp/312267.htm"
  },
  {
    "id": "tottori-sogyo-shien-shikin",
    "name": "鳥取県創業支援資金",
    "provider": "鳥取県 商工労働部（制度融資）",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "新たに事業に取り組もうとする個人や中小企業者等に必要な資金を融資する県の制度融資。",
    "eligibility": [
      "創業しようとする個人・中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "鳥取県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.tottori.lg.jp/244761.htm"
  },
  {
    "id": "tottori-startup-kakusoku",
    "name": "鳥取県スタートアップ創出加速化補助金（事業拡大型）",
    "provider": "鳥取県 商工労働部 企業支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率2/3、上限1,000万円",
    "summary": "スタートアップの事業拡大に要する経費を補助する。補助対象期間は交付決定日から36か月以内。",
    "eligibility": [
      "県内のスタートアップ事業者",
      "詳細は募集要領で要確認"
    ],
    "industries": "all",
    "prefectures": [
      "鳥取県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.tottori.lg.jp/312270.htm"
  },
  {
    "id": "tottori-city-chusho-jinzai-ikusei",
    "name": "鳥取市 中小企業人材育成補助金",
    "provider": "鳥取市 経済・雇用戦略課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "中小企業の人材育成に係る経費を補助する(令和8年度支援制度一覧に掲載)。",
    "eligibility": [
      "市内の中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "鳥取県"
    ],
    "cities": [
      "鳥取市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tottori.lg.jp/page/5160.html"
  },
  {
    "id": "tottori-city-jimoto-jinzai-kakuho",
    "name": "鳥取市 地元企業人材確保助成金",
    "provider": "鳥取市 経済・雇用戦略課",
    "level": "municipality",
    "type": "助成金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "地元企業の人材確保の取組を支援する助成金(令和8年度支援制度一覧に掲載)。",
    "eligibility": [
      "市内の中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "鳥取県"
    ],
    "cities": [
      "鳥取市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tottori.lg.jp/page/5160.html"
  },
  {
    "id": "tottori-city-keiei-kaizen-rishi",
    "name": "鳥取市 小規模事業者経営改善資金利子補助金",
    "provider": "鳥取市 企業立地・支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "マル経融資など小規模事業者経営改善資金の利子の一部を補助する。",
    "eligibility": [
      "市内の小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "鳥取県"
    ],
    "cities": [
      "鳥取市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tottori.lg.jp/page/5160.html"
  },
  {
    "id": "tottori-city-saiene-shoene-r8",
    "name": "鳥取市 再エネ・省エネ設備導入補助金(令和8年度)",
    "provider": "鳥取市 企業立地・支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/3・上限合計500万円",
    "summary": "事業者の再エネ・省エネ設備導入費用を補助する。",
    "eligibility": [
      "市内の事業者"
    ],
    "industries": "all",
    "prefectures": [
      "鳥取県"
    ],
    "cities": [
      "鳥取市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度分は予算上限に達し受付終了",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tottori.lg.jp/page/30970.html"
  },
  {
    "id": "shimane-chiiki-kadai-kigyo",
    "name": "地域課題解決型しまね起業支援事業費補助金",
    "provider": "島根県 商工労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、上限200万円",
    "summary": "地域課題の解決を目指す起業に要する経費を補助する。",
    "eligibility": [
      "島根県内で地域課題解決型の起業を行う人"
    ],
    "industries": "all",
    "prefectures": [
      "島根県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度 第2回 2026-06-22〜2026-07-28（受付終了。次回は要確認）",
    "deadline": "2026-07-28",
    "priority": 6,
    "url": "https://www.pref.shimane.lg.jp/industry/syoko/sangyo/kigyo/kigyo_sien/wakuwaushimane.html"
  },
  {
    "id": "shimane-jigyoshokei-shinjigyo",
    "name": "島根県事業承継新事業活動等支援補助金",
    "provider": "島根県 商工労働部 中小企業課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "補助率1/2、上限100万円（条件により200万円）",
    "summary": "事業承継を契機とした新商品開発・販路開拓などの新たな取組を補助する。",
    "eligibility": [
      "事業承継を行った（行う）県内中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "島根県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度 2026-09-01〜2026-09-30（受付終了。次回は要確認）",
    "deadline": "2026-09-30",
    "priority": 6,
    "url": "https://www.pref.shimane.lg.jp/industry/syoko/sangyo/chusho/syoukei.html"
  },
  {
    "id": "shimane-saiyo-branding",
    "name": "新卒採用ブランディング支援補助金",
    "provider": "島根県 商工労働部 雇用政策課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率1/2、上限75万円",
    "summary": "中小企業の採用力向上のためのブランディング取組を補助する。",
    "eligibility": [
      "県内の中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "島根県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.shimane.lg.jp/industry/employ/koyo_syugyo/shien/saiyobranding.html"
  },
  {
    "id": "shimane-small-business",
    "name": "スモール・ビジネス育成支援事業補助金（直接補助型）",
    "provider": "島根県 地域政策局 中山間地域・離島振興課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率2/3以内、上限250万円",
    "summary": "中山間地域での起業・創業や雇用創出につながる取組を補助する。",
    "eligibility": [
      "中山間地域で起業・創業等を行う事業者"
    ],
    "industries": "all",
    "prefectures": [
      "島根県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度 2026-04-01〜2026-05-29（受付終了。次回は要確認）",
    "deadline": "2026-05-29",
    "priority": 6,
    "url": "https://www.pref.shimane.lg.jp/life/region/chiiki/chusankan/small-business/"
  },
  {
    "id": "shimane-sogyo-seido-yushi",
    "name": "島根県中小企業制度融資（創業者向け）",
    "provider": "島根県 商工労働部 中小企業課",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "創業計画段階から開業後5年未満の中小企業者等向けの県制度融資。",
    "eligibility": [
      "創業予定者から開業後5年未満の中小企業者・組合"
    ],
    "industries": "all",
    "prefectures": [
      "島根県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.shimane.lg.jp/industry/syoko/sangyo/yuushi/sogyo_saisei.data/sougyou_tirasi.pdf"
  },
  {
    "id": "matsue-city-challenge-shop",
    "name": "松江市 チャレンジショップ事業費補助金(島根県・松江市補助)",
    "provider": "松江市 産業経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "要確認(家賃・広告費・改修費の一部)",
    "summary": "中心市街地や商工会管内の一部地域の空き店舗等に出店する商業者の出店経費の一部を助成する。",
    "eligibility": [
      "空き店舗・空き家へ出店する商業者",
      "市内に本店または主たる事業所があること"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "島根県"
    ],
    "cities": [
      "松江市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www1.city.matsue.shimane.jp/jigyousha/sangyou/shoukou/challenge.html"
  },
  {
    "id": "matsue-city-hanro-kaitaku",
    "name": "松江市 販路開拓支援事業補助金",
    "provider": "松江市 産業経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "市内事業者の販路開拓の取組に要する経費の一部を補助する。",
    "eligibility": [
      "市内の事業者"
    ],
    "industries": "all",
    "prefectures": [
      "島根県"
    ],
    "cities": [
      "松江市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www1.city.matsue.shimane.jp/jigyousha/sangyou/kigyou/index/hanrokaitaku.html"
  },
  {
    "id": "matsue-city-hoshoryo-josei",
    "name": "松江市 信用保証料の助成",
    "provider": "松江市 産業経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "保証料の1/3補給(上限 設備資金30万円・運転資金10万円)",
    "summary": "市指定の制度融資(島根県中小企業制度融資の創業者支援資金を含む)利用時の信用保証料の一部を補給する。",
    "eligibility": [
      "市指定の制度融資を利用する中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "島根県"
    ],
    "cities": [
      "松江市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www1.city.matsue.shimane.jp/jigyousha/sangyou/shoukou/hoshoryo.html"
  },
  {
    "id": "matsue-city-setsubi-shien",
    "name": "松江市 設備導入支援事業補助金",
    "provider": "松江市 産業経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "取得価額の1/10以内・上限200万円",
    "summary": "製造業の中小企業者が受注拡大・生産効率化・新製品開発のため工作機械等を市内事業所に導入する費用の一部を補助する。",
    "eligibility": [
      "市内の製造業中小企業者"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "島根県"
    ],
    "cities": [
      "松江市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www1.city.matsue.shimane.jp/jigyousha/sangyou/kigyou/index/setsubi.html"
  },
  {
    "id": "matsue-city-shokibo-kigyosha",
    "name": "松江市 小規模企業者支援事業補助金",
    "provider": "松江市 産業経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率2/3以内・上限30万円",
    "summary": "小規模企業者の人材育成、比較的低額な工作機械等の導入、IT化に必要な費用の一部を補助する。",
    "eligibility": [
      "市内の製造業の小規模企業者"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "島根県"
    ],
    "cities": [
      "松江市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www1.city.matsue.shimane.jp/jigyousha/sangyou/kigyou/index/syokibo.html"
  },
  {
    "id": "okayama-chiiki-kadai-kigyo",
    "name": "岡山県地域課題解決型起業支援金",
    "provider": "岡山県 産業労働部 経営支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、上限200万円",
    "summary": "地域課題解決を目的とする起業・事業承継・第二創業の経費を補助し、伴走支援も行う。デジタル技術の活用が要件。",
    "eligibility": [
      "地域課題の解決を目的に起業・事業承継・第二創業する人"
    ],
    "industries": "all",
    "prefectures": [
      "岡山県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度 2026-04-17〜2026-06-30（受付終了。次回は要確認）",
    "deadline": "2026-06-30",
    "priority": 6,
    "url": "https://www.pref.okayama.jp/page/969485.html"
  },
  {
    "id": "okayama-shinki-sogyo-shikin",
    "name": "岡山県 新規創業資金",
    "provider": "岡山県 産業労働部（制度融資）",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資枠3,500万円、利率1.75%以内",
    "summary": "創業者向けの県制度融資。",
    "eligibility": [
      "創業しようとする方・創業後間もない中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "岡山県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.okayama.jp/soshiki/45/"
  },
  {
    "id": "okayama-shoene-setsubi-koshin",
    "name": "岡山県中小企業省エネ設備更新支援補助金",
    "provider": "岡山県 産業労働部 経営支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "中小企業の省エネ設備の更新を支援する県の補助金。",
    "eligibility": [
      "県内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "岡山県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.okayama.jp/page/1030479.html"
  },
  {
    "id": "kurashiki-city-jinzai-ikusei",
    "name": "倉敷市 人「財」育成支援補助金",
    "provider": "倉敷市 商工労働部 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認(研修受講費の一部)",
    "summary": "DX・事業継続力強化・海外展開・脱炭素・デザイン経営の5分野の研修受講費を補助する。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "岡山県"
    ],
    "cities": [
      "倉敷市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "2026年4月1日〜2027年2月26日",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kurashiki.okayama.jp/business/industry/1012617/1005462.html"
  },
  {
    "id": "kurashiki-city-jissho-jikken",
    "name": "倉敷市 実証実験サポート事業",
    "provider": "倉敷市 商工労働部 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助対象経費の2/3・上限50万円",
    "summary": "AIやIoTなど先端技術を用いた市内での実証実験を支援する。",
    "eligibility": [
      "先端技術を活用した実証実験を市内で行う事業者"
    ],
    "industries": [
      "it",
      "manufacturing"
    ],
    "prefectures": [
      "岡山県"
    ],
    "cities": [
      "倉敷市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年12月28日まで受付",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kurashiki.okayama.jp/business/industry/1012617/1005464/1011436.html"
  },
  {
    "id": "kurashiki-city-keiei-kakushin",
    "name": "倉敷市 経営革新支援事業費補助金",
    "provider": "倉敷市 商工労働部 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助対象経費の2/3(新事業活動200万円・経営革新計画実施100万円が上限)",
    "summary": "新事業活動や経営革新計画の実施に要する経費を補助する。",
    "eligibility": [
      "市内の中小企業者",
      "経営革新計画の承認を受けた事業者(計画実施コース)"
    ],
    "industries": "all",
    "prefectures": [
      "岡山県"
    ],
    "cities": [
      "倉敷市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度2次募集:7/17〜9/16(終了)。次回は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kurashiki.okayama.jp/business/industry/1012617/1017151.html"
  },
  {
    "id": "kurashiki-city-sogyo-yushi",
    "name": "倉敷市 創業等支援資金融資",
    "provider": "倉敷市 商工労働部 商工課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額1,000万円(認定特定創業支援事業の証明があれば1,500万円)",
    "summary": "岡山県信用保証協会の保証を条件とする創業者向けの市融資制度。",
    "eligibility": [
      "市内で創業予定または創業後間もない方"
    ],
    "industries": "all",
    "prefectures": [
      "岡山県"
    ],
    "cities": [
      "倉敷市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時(最新は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kurashiki.okayama.jp/business/industry/1012619/1005492/1005497.html"
  },
  {
    "id": "kurashiki-city-sogyosha-event-shutten",
    "name": "高梁川流域圏創業者販売イベント出店支援補助金(倉敷市)",
    "provider": "倉敷市 商工労働部 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2以内・上限5万円",
    "summary": "創業後の中小企業者がマルシェ等の販売イベントに出店する経費を補助する。",
    "eligibility": [
      "創業後5年以内の中小企業者",
      "特定創業支援等事業の証明書が必要"
    ],
    "industries": "all",
    "prefectures": [
      "岡山県"
    ],
    "cities": [
      "倉敷市"
    ],
    "stages": [
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kurashiki.okayama.jp/business/industry/1005503/1005506.html"
  },
  {
    "id": "tsuyama-city-chusho-kigyo-yushi",
    "name": "津山市中小企業融資制度",
    "provider": "津山市 産業経済部 みらい産業課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "津山市の商業・工業ページで案内されている市の中小企業向け融資制度。融資条件の詳細は市の公式ページで確認が必要。",
    "eligibility": [
      "津山市内で事業を営む中小企業者",
      "要件の詳細は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "岡山県"
    ],
    "cities": [
      "津山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsuyama.lg.jp/business/index2.php?id=2983"
  },
  {
    "id": "tsuyama-city-shokibo-keiei-kaizen-rishi-hokyu",
    "name": "津山市小規模事業者経営改善資金利子補給金",
    "provider": "津山市 産業経済部 みらい産業課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "要確認（支払った約定利息のうち3年分が対象）",
    "summary": "日本政策金融公庫のマル経融資（新型コロナ対策分）を利用した事業者の利息負担を補助する制度。商工会議所等の取りまとめにより申請。",
    "eligibility": [
      "津山市内で1年以上同一事業を営む小規模事業者",
      "対象のマル経融資を利用していること",
      "商工会議所または商工会の推薦・取りまとめを受けること"
    ],
    "industries": "all",
    "prefectures": [
      "岡山県"
    ],
    "cities": [
      "津山市"
    ],
    "stages": [
      "established"
    ],
    "period": "2025年4月1日〜2027年3月31日の制度（詳細は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tsuyama.lg.jp/business/index2.php?id=2983"
  },
  {
    "id": "hiroshima-chinage-kankyo",
    "name": "広島県賃上げ環境整備支援事業補助金",
    "provider": "広島県 商工労働局",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "国の業務改善助成金を活用する事業者に上乗せ補助を行う。",
    "eligibility": [
      "業務改善助成金を活用する県内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年9月1日受付開始予定（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.hiroshima.lg.jp/soshiki/68/r8chinage-hojokin.html"
  },
  {
    "id": "hiroshima-chusankan-kigyo",
    "name": "広島県中山間地域課題解決型起業支援金",
    "provider": "広島県 地域政策局",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、上限200万円",
    "summary": "中山間地域の社会的事業の起業・事業承継・第二創業の経費を補助し、伴走支援も行う。",
    "eligibility": [
      "中山間地域で社会的事業を行う起業・事業承継・第二創業"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度 第2回締切 2026-07-29（受付終了。次回は要確認）",
    "deadline": "2026-07-29",
    "priority": 6,
    "url": "https://www.pref.hiroshima.lg.jp/soshiki/35/r8-kigyousienjijyo-bosyu.html"
  },
  {
    "id": "hiroshima-pro-jinzai",
    "name": "中小企業等プロフェッショナル人材確保支援事業補助金",
    "provider": "広島県 商工労働局 プロフェッショナル人材戦略拠点",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "新規事業展開のため、人材紹介会社経由でプロ人材の採用や副業・兼業人材の活用を行う費用の一部を補助する。",
    "eligibility": [
      "県内の中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和9年3月24日まで（予算がなくなり次第終了）",
    "deadline": "2027-03-24",
    "priority": 6,
    "url": "https://www.pref.hiroshima.lg.jp/site/pro-kyoten/probosyu08.html"
  },
  {
    "id": "hiroshima-shoene-setsubi",
    "name": "広島県中小企業省エネ設備等導入支援補助金",
    "provider": "広島県 環境県民局",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/2、上限500万円",
    "summary": "エネルギー価格高騰の影響を受ける中小企業の省エネ設備等導入費を補助する。",
    "eligibility": [
      "県内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "2期募集 9月4日〜9月25日の予定（受付終了の可能性。最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.hiroshima.lg.jp/site/eco/shoenehojokin-r8.html"
  },
  {
    "id": "hiroshima-shogakukin-hensai",
    "name": "Go！ひろしま奨学金返済支援制度導入企業応援補助金",
    "provider": "広島県 商工労働局",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "従業員の奨学金返済支援制度を導入する企業を応援する補助金。",
    "eligibility": [
      "奨学金返済支援制度を導入する県内企業"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和9年2月26日まで",
    "deadline": "2027-02-26",
    "priority": 6,
    "url": "https://www.pref.hiroshima.lg.jp/soshiki/68/shogakukin-hensai-shien-hojokin.html"
  },
  {
    "id": "hiroshima-sogyo-shien-shikin",
    "name": "広島県 創業支援資金",
    "provider": "広島県 商工労働局 経営革新課（制度融資）",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額3,500万円",
    "summary": "新規創業や新規事業展開を行う事業者向けの県制度融資。",
    "eligibility": [
      "創業・新規事業展開を行う事業者"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.hiroshima.lg.jp/soshiki/75/1168822517324.html"
  },
  {
    "id": "fukuyama-city-chushokigyo-yushi",
    "name": "福山市 中小企業融資制度・マル経融資利子補給",
    "provider": "福山市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認(金融のしおり参照)",
    "summary": "市の中小企業融資制度。小規模事業者経営改善資金(マル経融資)への利子補給もある。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "福山市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "随時(最新は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fukuyama.hiroshima.jp/soshiki/sangyou/41752.html"
  },
  {
    "id": "fukuyama-city-green-chingin",
    "name": "福山市 グリーンな企業賃上げ環境整備支援事業補助金",
    "provider": "福山市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "賃上げに向けた環境整備(設備投資等)を行う市内中小事業者を支援する。",
    "eligibility": [
      "市内に本社または事業所がある中小事業者"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "福山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "〜2026年12月11日(申請額が予算の8割超・9/17時点)",
    "deadline": "2026-12-11",
    "priority": 8,
    "url": "https://www.city.fukuyama.hiroshima.jp/soshiki/sangyou/391140.html"
  },
  {
    "id": "fukuyama-city-hanro-kaitaku",
    "name": "福山市 販路開拓支援事業補助金(国内販路開拓)",
    "provider": "福山市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2・上限20万円(国内・オンライン)",
    "summary": "首都圏等の全国規模の展示会出展費用(小間料・装飾料・搬送費)を補助する。",
    "eligibility": [
      "市内の中小企業者",
      "過去2か年度に同補助金を受けていないこと"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "福山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は二次募集が8月3日開始(最新は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fukuyama.hiroshima.jp/soshiki/sangyou/42038.html"
  },
  {
    "id": "fukuyama-city-josei-hatarakukankyo",
    "name": "福山市 女性の働く環境改善補助金",
    "provider": "福山市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率1/2以内・上限35万円",
    "summary": "女性専用トイレ・更衣室・休憩室等の改修費や備品購入費を補助する(2026年度から賃借建物も対象)。",
    "eligibility": [
      "市内の中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "福山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.fukuyama.hiroshima.jp/soshiki/sangyou/68920.html"
  },
  {
    "id": "fukuyama-city-saiene-shoene",
    "name": "福山市 事業者向け創エネ・蓄エネ・省エネ設備導入等補助金(令和8年度)",
    "provider": "福山市 環境部局",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "事業者向けの創エネ・蓄エネ・省エネ設備の導入費用を補助する。",
    "eligibility": [
      "市内で事業を行う法人・個人事業者"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "福山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "〜2027年1月8日(先着順・省エネは予算上限に近い)",
    "deadline": "2027-01-08",
    "priority": 8,
    "url": "https://www.city.fukuyama.hiroshima.jp/site/kankyo/394078.html"
  },
  {
    "id": "hatsukaichi-city-chushokigyo-yushi",
    "name": "廿日市市中小企業融資制度",
    "provider": "廿日市市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "一般融資の限度額2,000万円（利率・その他区分は要確認）",
    "summary": "市内の中小企業者の事業資金調達を支援する市の融資制度。",
    "eligibility": [
      "市内に事務所・店舗または工場があること",
      "引き続き1年以上同一事業を営んでいること"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "廿日市市"
    ],
    "stages": [
      "established"
    ],
    "period": "随時（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hatsukaichi.hiroshima.jp/soshiki/25/12086.html"
  },
  {
    "id": "hatsukaichi-city-sogyo-shien-hojo",
    "name": "廿日市市創業支援補助金",
    "provider": "廿日市市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率2/3・上限50万円（広報2025年5月号の記載。最新年度の内容は要確認）",
    "summary": "市内で創業予定の人や創業間もない人の初期費用や家賃などの一部を補助する制度。申請前に商工会議所・商工会の経営指導員への事業相談が必要。",
    "eligibility": [
      "市内で創業を予定している、または開業届提出から3年未満であること",
      "申請前に廿日市商工会議所または市内商工会の経営指導員に事業相談をしていること"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "廿日市市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（年度ごとに募集。産業振興課へ確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hatsukaichi.hiroshima.jp/life/2/18/90/"
  },
  {
    "id": "higashihiroshima-city-iju-sogyo-shokei",
    "name": "東広島市移住者等創業及び事業承継支援事業補助金",
    "provider": "東広島市 地域振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助対象経費の1/2（上限300万円）",
    "summary": "人口減少地域（周辺地域）で創業または事業承継する人の店舗改修費・設備備品購入費などを補助する。",
    "eligibility": [
      "周辺地域で創業または事業承継する人",
      "周辺地域を管轄する商工会議所・商工会の経営指導を受け意見書を提出"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "東広島市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年1月29日",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.higashihiroshima.lg.jp/soshiki/chiikishinko/1/teiju/20859.html"
  },
  {
    "id": "higashihiroshima-city-jinzai-ikusei-shien",
    "name": "東広島市人材育成等支援事業補助金",
    "provider": "東広島市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "産業振興課の令和8年度制度一覧に掲載されている人材育成等の支援補助金。詳細は検索結果では確認できていない。",
    "eligibility": [
      "市内の事業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "東広島市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.higashihiroshima.lg.jp/soshiki/sangyo/5/index.html"
  },
  {
    "id": "higashihiroshima-city-sogyo-shien-shikin",
    "name": "東広島市中小企業融資制度（創業支援資金）",
    "provider": "東広島市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "融資限度額500万円以内（利率は掲載時点で年1.3％、最新は要確認）",
    "summary": "創業者向けの市の制度融資。",
    "eligibility": [
      "市内で創業する、または創業後間もない事業者"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "東広島市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.higashihiroshima.lg.jp/soshiki/sangyo/5/2_1/hgh_yuusiseido/3303.html"
  },
  {
    "id": "kure-city-chiiki-sanpin-kaihatsu",
    "name": "令和8年度 呉市地域産品開発支援事業",
    "provider": "呉市 産業部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "対象経費の2/3以内（1事業者上限50万円）",
    "summary": "特産品・土産品の新商品開発と販路開拓にかかる経費を補助する。",
    "eligibility": [
      "令和8年4月1日以前から市内で事業を行う中小企業・小規模事業者",
      "新商品の開発・販路開拓を行うこと"
    ],
    "industries": [
      "food",
      "retail",
      "manufacturing"
    ],
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "呉市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度募集は2026年5月7日～6月5日で受付終了（来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kure.lg.jp/soshiki/40/r8chiikisampin-kaihatsu.html"
  },
  {
    "id": "kure-city-chusho-jinzai-ikusei",
    "name": "呉市 中小企業人材育成事業",
    "provider": "呉市 産業部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認（研修受講料の補助）",
    "summary": "中小企業の従業員の研修受講料を補助する制度。",
    "eligibility": [
      "市内の中小企業",
      "従業員を研修に参加させること"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "呉市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（掲載の申請期限は令和8年2月27日で終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kure.lg.jp/soshiki/40/tilyuusilyoukigilyouzinnzaiikusei.html"
  },
  {
    "id": "kure-city-chusho-yushi",
    "name": "呉市 中小企業融資制度（創業支援資金ほか）",
    "provider": "呉市 産業部 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認（令和8年度の制度概要PDFを公開）",
    "summary": "経営安定資金・小規模事業資金・創業支援資金・借換支援資金など、市内中小企業者向けの融資制度。",
    "eligibility": [
      "呉市内の中小企業者",
      "限度額・期間は商工振興課または取扱金融機関に要確認"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "呉市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度の制度（通年、詳細は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kure.lg.jp/soshiki/40/-.html"
  },
  {
    "id": "kure-city-datsutanso-setsubi",
    "name": "呉市脱炭素化設備等導入補助金",
    "provider": "呉市 産業部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "対象経費の2/3（計画策定は上限200万円、設備導入は上限500万円）",
    "summary": "市内中小企業・小規模事業者の脱炭素経営に資する設備導入計画の策定と設備導入にかかる経費を補助する。",
    "eligibility": [
      "市内の中小企業・小規模事業者",
      "脱炭素経営に資する設備導入または計画策定"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "呉市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "設備導入補助の申請期限は令和8年12月24日（予算に達し次第終了の可能性あり、要確認）",
    "deadline": "2026-12-24",
    "priority": 8,
    "url": "https://www.city.kure.lg.jp/soshiki/40/cn-shien004.html"
  },
  {
    "id": "onomichi-city-hanro-kaitaku-shien-hojo",
    "name": "尾道市中小企業者等販路開拓支援事業補助金",
    "provider": "尾道市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "対象経費の1/2以内、上限は国内・オンライン25万円、海外30万円",
    "summary": "国内外・オンラインの展示会等への出展費用の一部を助成する制度。同一年度1回限り。令和9年1月31日開催分までが対象。",
    "eligibility": [
      "尾道市内の中小企業者等",
      "展示会等（国内・海外・オンライン）に出展すること",
      "同一年度に1回のみ申請可"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "尾道市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜12月28日（予算がなくなり次第終了）",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.onomichi.hiroshima.jp/soshiki/26/12383.html"
  },
  {
    "id": "onomichi-city-kaigyo-shien-hojo",
    "name": "尾道市開業支援補助金（移住開業者向け）",
    "provider": "尾道市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2以内、上限50万円（39歳以下は一律20万円加算）",
    "summary": "尾道市に移住して開業する事業者の、事業所開設に伴う建物改修・修繕費の一部を助成する制度。先着順。",
    "eligibility": [
      "尾道市に移住して開業する個人事業主または法人",
      "建物の改修・修繕を伴う事業所開設であること",
      "令和9年2月26日までに開業し実績報告を行うこと"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "尾道市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年1月29日（予算がなくなり次第終了）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.onomichi.hiroshima.jp/soshiki/26/37641.html"
  },
  {
    "id": "onomichi-city-sogyo-shien-hojo",
    "name": "尾道市創業支援補助金（令和8年度創業支援事業）",
    "provider": "尾道市 商工課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2以内、上限50万円（39歳以下で県外から移住後1年以内に創業する場合は20万円加算）",
    "summary": "市内で新たに創業する人の事業所開設に伴う建物の改修・修繕費の一部を助成する制度。先着順で予算がなくなり次第終了。",
    "eligibility": [
      "尾道市内で新たに創業する者",
      "特定創業支援等事業（4回以上の継続支援）の証明を受けていること",
      "創業資金融資（事業所の設備資金）を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "尾道市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年1月29日（予算がなくなり次第終了）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.onomichi.hiroshima.jp/soshiki/26/11925.html"
  },
  {
    "id": "yamaguchi-dx-tool",
    "name": "山口県中小企業DX推進補助金（DXツール導入型）",
    "provider": "山口県 商工労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/2、上限75万円",
    "summary": "中小企業のDXツール導入費を補助する。予算上限に達し次第終了。",
    "eligibility": [
      "県内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "2026-12-25まで随時募集（予算上限に達し次第終了）",
    "deadline": "2026-12-25",
    "priority": 6,
    "url": "https://www.pref.yamaguchi.lg.jp/press/343044.html"
  },
  {
    "id": "yamaguchi-gaikokujin-zairyu",
    "name": "山口県外国人材確保定着支援補助金",
    "provider": "山口県 商工労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "外国人材の確保・定着に取り組む県内中小企業等への補助金。",
    "eligibility": [
      "外国人材を確保・定着させる県内中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "2026-04-28〜2027-01-29",
    "deadline": "2027-01-29",
    "priority": 6,
    "url": "https://www.pref.yamaguchi.lg.jp/press/345829.html"
  },
  {
    "id": "yamaguchi-seido-yuushi",
    "name": "山口県中小企業制度融資",
    "provider": "山口県 商工労働部 経営金融課",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "創業や事業承継支援資金などの目的別メニューを備えた県の制度融資。令和8年度は2026-03-31運用開始。",
    "eligibility": [
      "県内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度運用中（10月1日から利率0.1%引上げ）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.yamaguchi.lg.jp/soshiki/85/21831.html"
  },
  {
    "id": "yamaguchi-shoene-setsubi",
    "name": "山口県中小企業者等向け省・創・蓄エネ設備設置補助金",
    "provider": "山口県 商工労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "中小企業者等の省エネ・創エネ・蓄エネ設備の設置を補助する。",
    "eligibility": [
      "県内の中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度 2次募集まで実施し受付終了（次回は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.yamaguchi.lg.jp/soshiki/38/209060.html"
  },
  {
    "id": "yamaguchi-sogyo-hojokin",
    "name": "やまぐち創業補助金",
    "provider": "山口県 商工労働部 経営金融課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2、上限200万円",
    "summary": "社会的事業の創業を支援する補助金。令和8年度は採択11件程度の予定だった。",
    "eligibility": [
      "山口県内で社会的事業の創業を行う人"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度 2026-04-30〜2026-06-18（公募終了。次回は要確認）",
    "deadline": "2026-06-18",
    "priority": 6,
    "url": "https://www.pref.yamaguchi.lg.jp/soshiki/85/208170.html"
  },
  {
    "id": "hofu-city-chushokigyo-jinzai-ikusei-hojo",
    "name": "防府市中小企業人材育成応援補助金",
    "provider": "防府市 産業振興部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "中小企業が従業員のリスキリング・人材育成に取り組む際の経費を支援する制度。",
    "eligibility": [
      "市内の中小企業者であること",
      "対象となる人材育成の取組を行うこと（詳細は公式ページで要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "防府市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認（公式ページ参照）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hofu.yamaguchi.jp/soshiki/24/riskilling.html"
  },
  {
    "id": "hofu-city-hanro-kaitaku-shien-hojo",
    "name": "防府市販路開拓支援補助金",
    "provider": "防府市 産業振興部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "市内事業者が県外で開催される展示会・商談会へ出展する際の経費を補助する制度。",
    "eligibility": [
      "市内事業者であること",
      "県外で開催される展示会・商談会への出展であること（販売活動は対象外）"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "防府市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（公式ページ参照）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hofu.yamaguchi.jp/soshiki/24/hanrokaitaku.html"
  },
  {
    "id": "hofu-city-sogyo-challenge-shien-hojo",
    "name": "防府市創業チャレンジ支援事業補助金",
    "provider": "防府市 産業振興部 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "チャレンジ店舗出店事業：補助率1/2以内・月額上限5万円（最大12か月）／イベント出展事業：補助率1/2以内・上限30万円",
    "summary": "創業後間もない事業者のまちなかでの店舗出店やイベント出展にかかる経費の一部を補助する。",
    "eligibility": [
      "創業後間もない事業者であること（詳細要件は公式ページで要確認）",
      "市の要綱に定める対象経費であること"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "防府市"
    ],
    "stages": [
      "early"
    ],
    "period": "令和8年度（出展事業は交付決定日から令和9年3月31日まで。詳細要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.hofu.yamaguchi.jp/soshiki/24/challengeshophozyo.html"
  },
  {
    "id": "shimonoseki-city-akibukken-business",
    "name": "下関市 空き物件活用ビジネス支援事業費補助金",
    "provider": "下関市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費・設備費の1/2(最大100万円、特定創業支援等事業修了者は最大120万円)+店舗賃借料補助",
    "summary": "空き物件で小売・飲食・サービス業を開業する際の店舗賃貸料・改装費・設備費を補助する。",
    "eligibility": [
      "市内の空き物件で小売・飲食・サービス業を始める方"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "下関市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.shimonoseki.lg.jp/soshiki/57/58845.html"
  },
  {
    "id": "shimonoseki-city-dx-banso",
    "name": "下関市 中小企業DX伴走支援事業",
    "provider": "下関市 産業振興課",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "IT・デジタル",
    "amount": "要確認(4か月程度の伴走支援)",
    "summary": "DXセミナーや訪問調査を行い、選ばれた事業者に集中的な伴走支援を行う。",
    "eligibility": [
      "市内の中小企業・小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "下関市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.shimonoseki.lg.jp/soshiki/57/159556.html"
  },
  {
    "id": "shimonoseki-city-seido-yushi",
    "name": "下関市 中小企業制度融資・保証料補給",
    "provider": "下関市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認(起業資金融資は創業支援認定者に金利0.2%優遇、保証料は全額または一部補助)",
    "summary": "一般貸付・小規模企業サポート貸付・起業資金融資などの市制度融資と、信用保証料の補給。",
    "eligibility": [
      "市内の中小企業者・創業者"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "下関市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "随時(最新は要確認)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.shimonoseki.lg.jp/soshiki/57/158370.html"
  },
  {
    "id": "shimonoseki-city-shinshohin-kaihatsu",
    "name": "下関市 国内販路開拓事業新商品開発補助金",
    "provider": "下関市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助対象経費の1/2・上限100万円",
    "summary": "食料品・飲料を製造する中小企業の新商品開発経費を補助する。",
    "eligibility": [
      "市内に本社または主たる事業所がある食品・飲料製造の中小企業者"
    ],
    "industries": [
      "food"
    ],
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "下関市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度:6/1〜7/6(受付終了)",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.shimonoseki.lg.jp/soshiki/57/132185.html"
  },
  {
    "id": "shimonoseki-city-sogyosha-hanro",
    "name": "下関市 創業者販路開拓等補助金",
    "provider": "下関市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助対象経費の1/2・上限10万円",
    "summary": "創業者の経営相談費用・PR経費・研修経費などを補助する。",
    "eligibility": [
      "下関市創業支援事業の支援を受けた創業者"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "下関市"
    ],
    "stages": [
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.shimonoseki.lg.jp/soshiki/57/2281.html"
  },
  {
    "id": "shunan-city-chushokigyo-shinko-yushi",
    "name": "周南市中小企業振興融資制度",
    "provider": "周南市 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認（資金種別ごとに限度額・利率が異なる）",
    "summary": "市内中小企業者等の事業資金の融通を円滑にするための保証付制度融資・プロパー制度融資。小規模企業特別資金、経営改善資金、設備投資促進資金などがある。",
    "eligibility": [
      "住所（法人は事業所の所在地）が周南市内であること",
      "市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "周南市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "随時（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.shunan.lg.jp/soshiki/32/69785.html"
  },
  {
    "id": "shunan-city-sogyo-shien-shikin",
    "name": "周南市 創業支援資金（創業支援）",
    "provider": "周南市 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "融資額は要確認。一定要件を満たす場合、融資利率を0.2%引き下げ",
    "summary": "市内で新たに事業を始める人や開業5年未満の事業者向けの制度融資。特定創業支援等事業の証明を受けると登録免許税の軽減も受けられる。",
    "eligibility": [
      "市内で新たに事業を開始する個人、または事業開始5年未満の事業者",
      "実行可能な創業計画を持ち、商工会議所等または取扱金融機関の推薦を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "周南市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.shunan.lg.jp/soshiki/32/91578.html"
  },
  {
    "id": "ube-city-chushin-renovation",
    "name": "宇部市中心市街地建物リノベーション事業補助金",
    "provider": "宇部市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改修費は1/2（上限100万円）、賃借料は1/2（月3万円・合計30万円まで、最長12か月）",
    "summary": "中心市街地の建物を改修して出店する事業者の改修費と賃借料を補助する。",
    "eligibility": [
      "中心市街地で出店する事業者",
      "市内業者による改修、3年以上の事業継続",
      "宇部商工会議所の経営相談を受けること"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "宇部市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ube.yamaguchi.jp/shisei/hojyojyosei/1010994/1010990.html"
  },
  {
    "id": "ube-city-chusho-kyoso-kyoka",
    "name": "宇部市中小企業競争力強化支援事業費補助金",
    "provider": "宇部市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2以内、上限50万円",
    "summary": "市内中小企業者や市内で起業を計画する人の競争力強化の取り組みを支援する。令和8年度の募集は終了。",
    "eligibility": [
      "市内の中小企業者",
      "市内での起業を計画する人"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "宇部市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年5月15日〜7月10日（受付終了）",
    "deadline": "2026-07-10",
    "priority": 8,
    "url": "https://www.city.ube.yamaguchi.jp/machizukuri/sangyou/shougyou/1005907/1029216.html"
  },
  {
    "id": "ube-city-dx-suishin-ippan",
    "name": "宇部市中小企業等DX推進事業費補助金（一般枠）",
    "provider": "宇部市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率2/3以内、上限100万円（申請下限30万円）",
    "summary": "中小企業等のDX推進の取り組みを支援する。令和8年度一般枠は8月31日で受付終了。",
    "eligibility": [
      "市内の中小企業者等",
      "1事業者につき年度内1回の申請"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "宇部市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月13日〜8月31日（受付終了）",
    "deadline": "2026-08-31",
    "priority": 8,
    "url": "https://www.city.ube.yamaguchi.jp/shisei/hojyojyosei/1010994/1028886.html"
  },
  {
    "id": "ube-city-jinzai-kakuho-shien",
    "name": "宇部市人材確保支援事業費補助金",
    "provider": "宇部市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "上限10万円（補助率は要確認）",
    "summary": "求人サイト掲載、県外合同説明会参加、採用ホームページ作成、採用PR動画制作などの経費を支援する。",
    "eligibility": [
      "市内の事業者"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "宇部市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和7年度は6月20日〜10月31日。令和8年度は最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ube.yamaguchi.jp/shisei/hojyojyosei/1010994/1009201.html"
  },
  {
    "id": "ube-city-wakamono-kigyoka-challenge",
    "name": "宇部市若者起業家チャレンジ補助金",
    "provider": "宇部市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助対象経費の9/10以内、上限150万円",
    "summary": "若い起業家の創業経費を支援する補助金。令和8年度は月ごと締切制で、第5回（9月）は9月30日に締切済み。",
    "eligibility": [
      "18歳以上40歳未満",
      "起業時に市内に事業所等を置く意思があること"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "宇部市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は月ごと締切（第5回は令和8年9月30日で終了、以降の回は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.ube.yamaguchi.jp/shisei/hojyojyosei/1010994/1028888.html"
  },
  {
    "id": "yamaguchi-city-akinai-machi",
    "name": "あきないのまち支援事業補助制度",
    "provider": "山口市 ／ 山口商工会議所",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "要確認",
    "summary": "山口商工会議所が窓口の商業振興向け補助制度。募集期間は別途定められる。",
    "eligibility": [
      "市内の商業者（詳細は要確認）"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "山口市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（募集期間は別途設定）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yamaguchi.lg.jp/soshiki/76/3873.html"
  },
  {
    "id": "yamaguchi-city-jinzai-ikusei",
    "name": "山口市中小企業人材育成応援補助金",
    "provider": "山口市 ふるさと産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率1/2以内・1人1回5万円、1企業年度20万円まで",
    "summary": "従業員の人材育成（研修等）に取り組む市内中小企業者の経費を補助する。",
    "eligibility": [
      "山口市内に主たる事業所を有する中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "山口市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yamaguchi.lg.jp/soshiki/63/101175.html"
  },
  {
    "id": "yamaguchi-city-saiyo-katsudo",
    "name": "山口市中小企業等採用活動支援補助金",
    "provider": "山口市 ふるさと産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "中小企業等の採用活動にかかる費用を支援する制度（詳細は市ページで要確認）。",
    "eligibility": [
      "山口市内の中小企業者等（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "山口市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yamaguchi.lg.jp/soshiki/63/146844.html"
  },
  {
    "id": "yamaguchi-city-shinyamaguchi-shutten",
    "name": "新山口駅周辺出店支援事業補助金",
    "provider": "山口市 ふるさと産業振興課（山口商工会議所広域ビジネスサポートセンター）",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/2以内・上限100万円",
    "summary": "新山口駅周辺の空店舗・空家で昼営業を行う飲食店等を新規開業する事業者の店舗改装費を補助する。",
    "eligibility": [
      "新山口駅周辺の空店舗・空家で新規開業する事業者",
      "昼営業を行う飲食店等"
    ],
    "industries": [
      "food",
      "retail"
    ],
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "山口市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yamaguchi.lg.jp/soshiki/63/171777.html"
  },
  {
    "id": "tokushima-chusho-yushi-r8",
    "name": "徳島県 令和8年度中小企業向け融資制度（創業者無担保資金等）",
    "provider": "徳島県 商工労働観光部（制度融資）",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "協調支援型経営課題対応資金は限度額1億円、事業承継枠8,000万円 ほか",
    "summary": "23の資金メニューがある県の融資制度。創業者無担保資金は保証料率が軽減されている。",
    "eligibility": [
      "県内の中小企業者（創業者含む）"
    ],
    "industries": "all",
    "prefectures": [
      "徳島県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年度運用中",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.tokushima.lg.jp/jigyoshanokata/sangyo/shokogyo/5015570/"
  },
  {
    "id": "tokushima-furusato-kigyoka",
    "name": "徳島県ふるさと起業家支援プロジェクト",
    "provider": "徳島県 商工労働観光部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率2/3以内、上限1,000万円",
    "summary": "地域資源を活用して地域課題解決を図る起業を補助する。あったかビジネス事業計画の認定（見込み含む）が必要。",
    "eligibility": [
      "あったかビジネス事業計画の認定を受けた者または見込者"
    ],
    "industries": "all",
    "prefectures": [
      "徳島県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度 締切2026-05-29（受付終了。次回は要確認）",
    "deadline": "2026-05-29",
    "priority": 6,
    "url": "https://www.pref.tokushima.lg.jp/ippannokata/nyusatsu/itaku/7302698/"
  },
  {
    "id": "tokushima-seicho-ma",
    "name": "徳島県成長型M＆A促進応援金",
    "provider": "徳島県 商工労働観光部",
    "level": "prefecture",
    "type": "給付金",
    "cat": "事業承継",
    "amount": "要確認",
    "summary": "M&Aを実施した中小・小規模企業者を支援する応援金。2026-02-13から対象が中小企業者まで拡大され年齢要件が撤廃された。",
    "eligibility": [
      "M&Aを実施した県内中小・小規模企業者"
    ],
    "industries": "all",
    "prefectures": [
      "徳島県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.tokushima.lg.jp/jigyoshanokata/sangyo/shokogyo/7302058/"
  },
  {
    "id": "tokushima-seisansei-seicho",
    "name": "徳島県 生産性向上・成長力強化支援事業費補助金",
    "provider": "徳島県 商工労働観光部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/2以内、10万〜500万円",
    "summary": "3年の経営計画に基づく設備投資などを補助する。",
    "eligibility": [
      "県内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "徳島県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "募集は2026-03-31に締切（次回は要確認）",
    "deadline": "2026-03-31",
    "priority": 6,
    "url": "https://www.pref.tokushima.lg.jp/jigyoshanokata/sangyo/shokogyo/7309846/"
  },
  {
    "id": "naruto-city-hanro-kaitaku-shien-hojo",
    "name": "鳴門市販路開拓支援事業補助金（国内外販路開拓支援事業）",
    "provider": "鳴門市 商工政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2：国内・オンライン展示会は上限20万円、海外展示会・海外展開は上限40万円、クラウドファンディングは上限20万円",
    "summary": "国内外の展示会出展、海外展開、クラウドファンディングを活用した販路開拓の経費の一部を補助する。",
    "eligibility": [
      "市内の中小企業者、個人事業者、団体・組合であること",
      "事業実施日の7日前までに交付申請すること"
    ],
    "industries": "all",
    "prefectures": [
      "徳島県"
    ],
    "cities": [
      "鳴門市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（予算の範囲内。事業実施日の7日前まで申請）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.naruto.tokushima.jp/jigyosha/chushoshien/shienseido/hanro.html"
  },
  {
    "id": "tokushima-city-digital-sokushin",
    "name": "徳島市中小企業デジタル化促進事業補助金",
    "provider": "徳島市 経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/2以内・下限5万円〜上限25万円",
    "summary": "中小企業のデジタル化に要する経費を補助する。",
    "eligibility": [
      "市内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "徳島県"
    ],
    "cities": [
      "徳島市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年7月1日〜令和9年1月8日",
    "deadline": "2027-01-08",
    "priority": 8,
    "url": "https://www.city.tokushima.tokushima.jp/shisei/keizai/jigyosha/tyusyokigyo/hanrokakudai/chuushoudejitaru.html"
  },
  {
    "id": "tokushima-city-ec-sannyu",
    "name": "徳島市EC（電子商取引）参入支援事業補助金",
    "provider": "徳島市 経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "上限10万円",
    "summary": "新たなECモールへの出店などの費用を補助する。",
    "eligibility": [
      "市内中小企業者等（詳細は要確認）"
    ],
    "industries": [
      "retail",
      "food",
      "manufacturing"
    ],
    "prefectures": [
      "徳島県"
    ],
    "cities": [
      "徳島市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年4月14日〜令和9年1月29日",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.tokushima.tokushima.jp/shisei/keizai/jigyosha/tyusyokigyo/hanrokakudai/ecsannyuhojyokin.html"
  },
  {
    "id": "tokushima-city-hanro-kakudai",
    "name": "徳島市中小企業販路拡大支援事業補助金",
    "provider": "徳島市 経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認",
    "summary": "海外販路拡大、展示会出展、製品開発・改良にかかる経費を補助する。",
    "eligibility": [
      "市内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "徳島県"
    ],
    "cities": [
      "徳島市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年4月14日〜令和9年1月29日",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.tokushima.tokushima.jp/shisei/keizai/jigyosha/tyusyokigyo/hanrokakudai/hanro_shien.html"
  },
  {
    "id": "tokushima-city-jinzai-kakuho",
    "name": "徳島市中小企業等人材確保・育成支援事業補助金",
    "provider": "徳島市 経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認（経費の一部補助、予算額に達し次第終了）",
    "summary": "人材確保・育成に取り組む中小企業者の経費の一部を補助する。令和8年度募集。",
    "eligibility": [
      "人材確保・育成に取り組む市内中小企業者",
      "交付決定前の着手は不可"
    ],
    "industries": "all",
    "prefectures": [
      "徳島県"
    ],
    "cities": [
      "徳島市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月14日〜令和9年2月5日（予算額到達で終了）",
    "deadline": "2027-02-05",
    "priority": 8,
    "url": "https://www.city.tokushima.tokushima.jp/shisei/keizai/jigyosha/tyusyokigyo/jinzai_shien/chushou_ikusei.html"
  },
  {
    "id": "tokushima-city-tenant-mokushitsu",
    "name": "徳島市テナント店舗等木質化モデル創出事業補助金",
    "provider": "徳島市 農林水産部",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/3以内・上限100万円",
    "summary": "県産材を使ったテナント店舗等の内装・外装工事を補助する。",
    "eligibility": [
      "市内のテナント店舗等を改装する事業者（詳細は要確認）"
    ],
    "industries": [
      "food",
      "retail",
      "beauty"
    ],
    "prefectures": [
      "徳島県"
    ],
    "cities": [
      "徳島市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年5月15日〜12月25日",
    "deadline": "2026-12-25",
    "priority": 8,
    "url": "https://www.city.tokushima.tokushima.jp/smph/shisei/keizai/nousui/shinrin_gyou/250400a202303071518.html"
  },
  {
    "id": "kagawa-business-challenge-compe",
    "name": "香川県ビジネスチャレンジコンペ2026",
    "provider": "香川県 商工労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "最優秀賞500万円以内・優秀賞300万円以内・奨励賞200万円以内（補助率10/10以内）",
    "summary": "独創的なビジネスプランを募集し、入賞者の事業化経費を補助する。補助対象は交付決定日から令和9年2月28日までに完了する事業。",
    "eligibility": [
      "創業予定者または県内に本店等を有する中小企業者等（詳細は要項要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "香川県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "2026年度募集（募集期間・最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kagawa.lg.jp/sangyo/shinki/bijikon_r8.html"
  },
  {
    "id": "kagawa-shin-ouen-fund",
    "name": "新かがわ中小企業応援ファンド等事業（新分野等チャレンジ支援・海外見本市出展支援）",
    "provider": "香川県／かがわ産業支援財団",
    "level": "prefecture",
    "type": "助成金",
    "cat": "研究開発・新事業",
    "amount": "要確認",
    "summary": "県内中小企業の新分野への挑戦や海外見本市出展などの経費を助成する。令和8年度後期助成の募集が案内されている。",
    "eligibility": [
      "県内の中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "香川県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度後期助成の募集（期間は最新要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kagawa.lg.jp/sangyo/shinki/r7fund.html"
  },
  {
    "id": "kagawa-sogyo-yushi",
    "name": "新規創業融資（香川県中小企業者融資制度）",
    "provider": "香川県 商工労働部／香川県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資上限2,000万円、年1.75%（7年以内固定）・年1.85%（7年超固定）",
    "summary": "独立・開業・起業を行う方向けの県制度融資。保証料の一部を県が補給する制度もある。",
    "eligibility": [
      "独立・開業・起業を予定または開業間もない中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "香川県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（令和8年6月時点案内。最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kagawa.lg.jp/documents/12009/panflet0806_2.pdf"
  },
  {
    "id": "kagawa-startup-shien",
    "name": "起業等スタートアップ支援補助金（地域課題解決型）",
    "provider": "香川県 商工労働部／かがわ産業支援財団",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限200万円・補助率1/2",
    "summary": "デジタル技術を活用して県内で起業・事業承継・第二創業を行う人の経費の一部を補助する。申請前に伴走支援員の指導を2回以上受ける必要がある。",
    "eligibility": [
      "デジタル技術を活用して県内で起業・事業承継・第二創業する人",
      "伴走支援員の指導を申請前に2回以上受けること"
    ],
    "industries": "all",
    "prefectures": [
      "香川県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は4/10〜6/3で受付終了（来年度は要確認）",
    "deadline": "2026-06-03",
    "priority": 6,
    "url": "https://www.pref.kagawa.lg.jp/sangyo/shinki/02.html"
  },
  {
    "id": "marugame-city-sangyo-shinko-shien-hojo",
    "name": "丸亀市産業振興支援補助事業",
    "provider": "丸亀市 産業観光課 商工労政担当",
    "level": "municipality",
    "type": "補助金",
    "cat": "その他",
    "amount": "メニューごとに異なる（ポータル情報では上限20万円。詳細は要確認）",
    "summary": "市内の中小企業者が積極的に取り組む事業（人材確保・育成、新規事業分野進出、PRツール作成、デジタル化、事業連携、カーボンニュートラルなど）の経費の一部を補助する。",
    "eligibility": [
      "市内に住所（法人は本店・主たる事業所）がある中小企業者であること",
      "事業実施前に交付申請すること",
      "1事業者が利用できるメニューは原則1つ"
    ],
    "industries": "all",
    "prefectures": [
      "香川県"
    ],
    "cities": [
      "丸亀市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.marugame.lg.jp/page/3112.html"
  },
  {
    "id": "marugame-city-sogyo-shien-jigyo-hojo",
    "name": "丸亀市創業支援事業補助金",
    "provider": "丸亀市 産業観光課 商工労政担当",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率2/3・上限30万円（広告宣伝費・印刷製本費など）",
    "summary": "創業後の販路開拓にかかる費用の一部を補助する。予算がなくなり次第受付終了。事前申請が必要。",
    "eligibility": [
      "交付申請時点で創業から1年以内であること",
      "特定創業支援等事業の支援を受けていること",
      "3年以上の営業見込みと週5日以上の営業があること"
    ],
    "industries": "all",
    "prefectures": [
      "香川県"
    ],
    "cities": [
      "丸亀市"
    ],
    "stages": [
      "early"
    ],
    "period": "令和8年度、予算がなくなり次第終了",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.marugame.lg.jp/page/11945.html"
  },
  {
    "id": "takamatsu-city-chuo-shotengai-sogyo",
    "name": "高松市高松中央商店街創業新規出店補助金",
    "provider": "高松市 創造都市推進局",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/4・上限50万円（特定創業支援等事業の支援を受けた場合は補助率1/2・上限100万円）",
    "summary": "高松中央商店街の空き店舗に新規出店する創業者の出店経費を補助する。",
    "eligibility": [
      "高松中央商店街の空き店舗に出店する創業者"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "香川県"
    ],
    "cities": [
      "高松市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年1月29日（窓口持参のみ）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.takamatsu.kagawa.jp/jigyosha/sangyou/shoukougyou/syoutenngai/syoutenngaisien/sougyousinnkisyutten.html"
  },
  {
    "id": "takamatsu-city-datsutanso-finance",
    "name": "高松市中小企業向け脱炭素ファイナンス利用補助金",
    "provider": "高松市 ゼロカーボンシティ推進課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/2・上限25万円",
    "summary": "脱炭素関連のサステナブルファイナンス利用時の手数料を補助する。",
    "eligibility": [
      "市内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "香川県"
    ],
    "cities": [
      "高松市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年7月15日〜令和9年2月26日",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.takamatsu.kagawa.jp/kurashi/kurashi/kankyo/zerocarboncity_tkmt/decarbonized-leader/datutansofinance.html"
  },
  {
    "id": "takamatsu-city-jigyo-koudoka",
    "name": "高松市事業高度化等支援補助金",
    "provider": "高松市 創造都市推進局",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認",
    "summary": "Webマーケティングの高度化など事業の高度化を支援する。",
    "eligibility": [
      "市内中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "香川県"
    ],
    "cities": [
      "高松市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "事前申請 令和8年4月10日〜12月25日",
    "deadline": "2026-12-25",
    "priority": 8,
    "url": "https://www.city.takamatsu.kagawa.jp/jigyosha/sangyou/shoukougyou/seityousokushin/koudoka.html"
  },
  {
    "id": "takamatsu-city-jigyo-yushi",
    "name": "高松市事業資金融資（保証料補給）",
    "provider": "高松市 創造都市推進局",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資700万円以内・利率2.1%・保証料補給は500万円まで",
    "summary": "運転・設備資金の市融資。完済翌年度に保証料を補給する。",
    "eligibility": [
      "市内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "香川県"
    ],
    "cities": [
      "高松市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜令和9年3月31日申込分",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.takamatsu.kagawa.jp/smph/jigyosha/shien_josei/yushi/jigyoyushi/index.html"
  },
  {
    "id": "takamatsu-city-shinshijo-hanro",
    "name": "高松市新市場販路開拓事業補助金（たかまつ販路開拓チャレンジ補助金）",
    "provider": "高松市 創造都市推進局",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率2/3・上限 国内35万円／国外55万円／オンライン35万円",
    "summary": "見本市や越境ECモールへの出展費用を補助する。事前相談が必要。",
    "eligibility": [
      "市内中小企業者",
      "国内は香川県外での出展に限る"
    ],
    "industries": "all",
    "prefectures": [
      "香川県"
    ],
    "cities": [
      "高松市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "事前相談受付 令和8年4月23日〜令和9年1月29日",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.takamatsu.kagawa.jp/jigyosha/sangyou/shoukougyou/seityousokushin/hannrokaitaku.html"
  },
  {
    "id": "takamatsu-city-tokusanhin-hanbai",
    "name": "高松市特産品・伝統的ものづくり販売促進事業補助金",
    "provider": "高松市 創造都市推進局",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "上限15万円（特産品1/2、伝統的ものづくり3/4）",
    "summary": "特産品や伝統的ものづくり製品の販路開拓・広告宣伝等の経費を補助する。",
    "eligibility": [
      "特産品・伝統的ものづくり製品の事業者"
    ],
    "industries": [
      "food",
      "manufacturing",
      "creative"
    ],
    "prefectures": [
      "香川県"
    ],
    "cities": [
      "高松市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年4月17日〜令和9年1月29日（窓口受付のみ）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.takamatsu.kagawa.jp/jigyosha/sangyou/shoukougyou/tokusan/tenjikaihojyo.html"
  },
  {
    "id": "ehime-chinage-shokibo",
    "name": "賃上げ対応型小規模事業者経営力強化支援事業費補助金",
    "provider": "愛媛県 経営支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "通常枠で上限100万円",
    "summary": "支援機関の伴走支援を受けて経営力強化に取り組む県内小規模事業者の経費の一部を補助する。",
    "eligibility": [
      "県内の小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年6/1〜7/31で受付終了（来年度は要確認）",
    "deadline": "2026-07-31",
    "priority": 6,
    "url": "https://www.pref.ehime.jp/site/madoguchi/148380.html"
  },
  {
    "id": "ehime-dx-hajime",
    "name": "愛媛県DXはじめの一歩補助金",
    "provider": "愛媛県 産業創出課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認",
    "summary": "DX推進の第一歩を踏み出す事業者を支援する補助金。追加公募が実施されている。",
    "eligibility": [
      "DX認定を取得済みまたは申請済みの県内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "追加公募 2026年10月2日〜10月30日",
    "deadline": "2026-10-30",
    "priority": 6,
    "url": "https://www.pref.ehime.jp/site/madoguchi/160117.html"
  },
  {
    "id": "ehime-koukeisha-shinjigyo",
    "name": "愛媛県後継者新事業展開支援事業費補助金",
    "provider": "愛媛県 経営支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "補助対象経費の2/3以内、1件100万円上限",
    "summary": "事業承継を契機とした後継者・後継予定者の第二創業や新規事業展開の経費を補助する。",
    "eligibility": [
      "県内中小企業の後継者（承継後10年未満）または後継予定者"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年8月19日〜12月25日17:15（追加募集の案内あり）",
    "deadline": "2026-12-25",
    "priority": 6,
    "url": "https://www.pref.ehime.jp/page/148144.html"
  },
  {
    "id": "ehime-shinjigyo-sozo-shikin",
    "name": "新事業創出支援資金（創業向け県制度融資・保証料全額補助）",
    "provider": "愛媛県 経営支援課／愛媛県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "融資限度額3,500万円（運転7年以内・設備10年以内）、保証料全額補助（保証協会案内では2027年3月31日まで）",
    "summary": "創業者や創業後間もない事業者向けの県制度融資。県が信用保証料を全額補助する。",
    "eligibility": [
      "創業を行う個人・法人、創業後間もない事業者",
      "保証料補助は申込時に保証協会の保証債務残高がない方"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（保証料補助は2027年3月31日まで）",
    "deadline": "2027-03-31",
    "priority": 6,
    "url": "https://www.pref.ehime.jp/site/madoguchi/59788.html"
  },
  {
    "id": "imabari-city-chusho-shikin-yushi",
    "name": "今治市中小企業資金融資制度（保証料補給）",
    "provider": "今治市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "緊急経営資金は貸付限度1,000万円。振興資金は信用保証料を市が補給（令和5年12月受付分から市が保証協会へ直接補給）",
    "summary": "運転・設備資金の振興資金、緊急経営資金、設備近代化資金などの市融資制度。信用保証料を市が補給する。",
    "eligibility": [
      "市内で事業を営む中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "今治市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.imabari.ehime.jp/sangyou/yusi-kigyo/001.html"
  },
  {
    "id": "imabari-city-dx-suishin",
    "name": "今治市DX推進事業費補助金",
    "provider": "今治市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "研究開発枠：補助率2/3（上限50万円）、イノベーション推進枠：補助率1/2（上限300万円）。ページとPDFで上限表記に差があり要確認",
    "summary": "市内事業者のDXによる新製品・新サービス開発等の取り組みを支援する補助金。",
    "eligibility": [
      "市内の中小企業者等",
      "他の補助金と同一事業で併用しないこと"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "今治市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "研究開発枠は令和8年10月30日まで、イノベーション推進枠は令和8年7月31日まで",
    "deadline": "2026-10-30",
    "priority": 8,
    "url": "https://www.city.imabari.ehime.jp/sangyou/hojo/002/"
  },
  {
    "id": "imabari-city-gijutsu-hanro-kaitaku",
    "name": "今治市技術開発・販路開拓事業費補助金",
    "provider": "今治市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "研究開発枠：補助率2/3・上限100万円、イノベーション推進枠：補助率1/2・上限500万円",
    "summary": "デジタル技術と自社の経営資源を組み合わせた新製品・新サービスの技術開発や販路開拓に要する費用を支援する。",
    "eligibility": [
      "市内の中小企業者等",
      "他の補助金と同一事業で併用しないこと"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "今治市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "研究開発枠は令和8年10月30日まで、イノベーション推進枠は延長（2026年10月5日更新）",
    "deadline": "2026-10-30",
    "priority": 8,
    "url": "https://www.city.imabari.ehime.jp/sangyou/hojo/003/"
  },
  {
    "id": "imabari-city-startup-sogyo-shien",
    "name": "今治市スタートアップ創業支援補助金",
    "provider": "今治市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2。起業チャレンジ支援事業は上限20万円、ビジネスプランコンテスト実現支援事業は上限200万円",
    "summary": "事務所家賃・施設改修費・備品購入費・広告宣伝費などを補助する創業支援。令和8年度は当初9月30日締切だったが募集期間が延長されている。",
    "eligibility": [
      "市内に住所があり市内に事業所を設ける（設けた）創業者",
      "特定創業支援等事業の証明書を有すること（起業チャレンジ）"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "今治市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜9月30日、その後延長（延長後の締切は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.imabari.ehime.jp/sangyou/startup/"
  },
  {
    "id": "matsuyama-city-dx-suishin",
    "name": "松山市DX推進補助金",
    "provider": "松山市 産業経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認",
    "summary": "中小企業のDX推進に要する経費を補助する。令和8年度の受付は終了見込み。",
    "eligibility": [
      "市内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "松山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年5月25日〜7月31日（受付終了の可能性が高い）",
    "deadline": "2026-07-31",
    "priority": 8,
    "url": "https://www.city.matsuyama.ehime.jp/kurashi/sangyo/chusyoukigyou/DXsuishin.html"
  },
  {
    "id": "matsuyama-city-jigyo-shokei-risi",
    "name": "松山市事業承継利子補助金（日本政策金融公庫分）",
    "provider": "松山市 産業経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "要確認",
    "summary": "日本政策金融公庫の事業承継関連融資の利子の一部を補助する。",
    "eligibility": [
      "事業承継を行う市内事業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "松山市"
    ],
    "stages": [
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsuyama.ehime.jp/kurashi/sangyo/chusyoukigyou/shoukeirisi.html"
  },
  {
    "id": "matsuyama-city-setsubi-risi",
    "name": "松山市設備投資利子補助金",
    "provider": "松山市 産業経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "設備投資に係る融資の利子を補助する制度。",
    "eligibility": [
      "市内中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "松山市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsuyama.ehime.jp/kurashi/sangyo/chusyoukigyou/setsubitoushi.html"
  },
  {
    "id": "matsuyama-city-shikin-yushi",
    "name": "松山市中小企業資金融資制度",
    "provider": "松山市 産業経済部",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認（令和8年度から限度額・期間・利率変更、信用保証料は市が1/2負担、利子補助あり）",
    "summary": "市の預託と信用保証協会の保証による制度融資。令和8年度から経営安定化資金にも利子補助を開始。",
    "eligibility": [
      "市内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "松山市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsuyama.ehime.jp/kurashi/sangyo/chusyoukigyou/shikinyuushiseido.html"
  },
  {
    "id": "matsuyama-city-sogyo-risi",
    "name": "松山市創業資金利子補助金（日本政策金融公庫分）",
    "provider": "松山市 産業経済部",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "利子補助 年1.0%以内・利払開始月から2年間",
    "summary": "日本政策金融公庫の創業融資を受け市内で開業した事業者の利子の一部を補助する。",
    "eligibility": [
      "日本政策金融公庫の新規開業・スタートアップ支援資金等の利用者",
      "事業開始後6か月以内に融資を受けていること",
      "市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "松山市"
    ],
    "stages": [
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.matsuyama.ehime.jp/kurashi/sangyo/chusyoukigyou/sougyo.html"
  },
  {
    "id": "niihama-city-akitenpo-katsuyo-shien-hojo",
    "name": "新居浜市空き店舗活用支援事業補助金",
    "provider": "新居浜市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "要確認",
    "summary": "市内の空き店舗を活用して出店する事業者を支援する補助制度（令和8年度）。",
    "eligibility": [
      "市内の空き店舗を活用して出店すること",
      "詳細な対象要件は公式ページで要確認"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "新居浜市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.niihama.lg.jp/soshiki/sanshin/akitenpokatsuyou.html"
  },
  {
    "id": "niihama-city-chushokigyo-shinko-hojo",
    "name": "新居浜市中小企業振興補助金",
    "provider": "新居浜市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "その他",
    "amount": "メニューごとに異なる（例：デジタル技術導入10万円定額、企業価値向上は補助率50%・上限30万円、生産性向上機器導入は上限100万円、事業所設置は上限1,000万円）",
    "summary": "事業所設置、産業財産権取得、人材養成、市場開拓、生産性向上機器導入、デジタル技術導入、人材確保、企業価値向上、住宅環境整備の9メニューで中小企業の取組を支援する。",
    "eligibility": [
      "市内に本店や事業所を持つ中小企業者等であること",
      "市税の滞納がないこと",
      "メニューごとの申請期限内に申請すること（2026年8月31日、2027年3月1日など）"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "新居浜市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度、事業完了日の区分ごとに申請期限あり（2027年3月1日までなど）",
    "deadline": "2027-03-01",
    "priority": 8,
    "url": "https://www.city.niihama.lg.jp/soshiki/sanshin/shinkoujyosei.html"
  },
  {
    "id": "niihama-city-sogyo-sokushin-hojo",
    "name": "新居浜市創業促進補助金",
    "provider": "新居浜市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限30万円。補助率は特定創業支援等事業の支援を受けた人2/3、それ以外1/2",
    "summary": "創業にかかる事業拠点費（家賃・不動産購入費）、改装費、機械器具費、広告宣伝費などの一部を補助する。",
    "eligibility": [
      "市内で創業した（する）人",
      "申請は創業の日から180日以内",
      "業種によっては対象外となる場合あり"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "新居浜市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度（創業の日から180日以内に申請。予算の範囲内）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.niihama.lg.jp/soshiki/sanshin/sougyoushien.html"
  },
  {
    "id": "saijo-city-akitenpo-hojo",
    "name": "西条市地域産業競争力強化事業 商店街空き店舗活用事業費補助金",
    "provider": "西条市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "要確認（公募要領参照）",
    "summary": "商店街の空き店舗を活用して出店する事業者の経費の一部を補助する制度。令和8年4月版の公募要領で随時募集とされている。",
    "eligibility": [
      "商店街の空き店舗を活用して事業を行う事業者",
      "公募要領に定める要件を満たすこと"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "西条市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時募集（令和8年4月公募要領）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.saijo.ehime.jp/uploaded/attachment/83942.pdf"
  },
  {
    "id": "saijo-city-chushokigyo-shikin-yushi",
    "name": "西条市中小企業資金融資制度",
    "provider": "西条市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "市内中小企業の事業資金調達を支援する市の融資制度。",
    "eligibility": [
      "西条市内の中小企業者",
      "融資条件は市の案内ページ参照"
    ],
    "industries": "all",
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "西条市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.saijo.ehime.jp/soshiki/sangyoshinko/shikinyushi.html"
  },
  {
    "id": "kochi-chiiki-kadai-kigyo",
    "name": "高知県地域課題解決起業支援事業費補助金",
    "provider": "高知県 産業イノベーション課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "通常枠 上限200万円（下限60万円）、中山間地域枠 上限100万円（下限30万円）",
    "summary": "社会的事業分野で県内に起業する人の経費を補助する。県指定の起業支援プログラム修了などが条件。",
    "eligibility": [
      "社会的課題の解決につながる事業で県内に起業する人",
      "こうち起業・創業支援プラットフォーム会員で指定プログラムを修了すること"
    ],
    "industries": "all",
    "prefectures": [
      "高知県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度第3回公募は9/30締切、県ページでは受付終了表記あり（最新は要確認）",
    "deadline": "2026-09-30",
    "priority": 6,
    "url": "https://www.pref.kochi.lg.jp/doc/2026022400299/"
  },
  {
    "id": "kochi-kigyoka-ikusei",
    "name": "高知県起業家育成事業費補助金",
    "provider": "高知県 産業イノベーション課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "上限700万円（令和7年度版ページの記載）",
    "summary": "学生向け起業家教育や起業家向けアクセラレータープログラムなど、次世代の起業家育成の取組を補助する。",
    "eligibility": [
      "起業家育成の取組を行う事業者（詳細は要項要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "高知県"
    ],
    "cities": [],
    "stages": [
      "planning"
    ],
    "period": "令和8年度の詳細は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kochi.lg.jp/doc/2024040100061/"
  },
  {
    "id": "kochi-shinjigyo-sozo",
    "name": "高知県新事業創出支援事業費補助金（実証等支援・製品開発支援）",
    "provider": "高知県 産業イノベーション課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "要確認",
    "summary": "新事業の実証や製品開発に取り組む事業者を支援する補助金。令和8年度は5月21日に公募を開始した。",
    "eligibility": [
      "県内で新事業・製品開発に取り組む事業者"
    ],
    "industries": "all",
    "prefectures": [
      "高知県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年5月21日公募開始、現在は受付終了（来年度は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kochi.lg.jp/doc/2025042800126/"
  },
  {
    "id": "kochi-shotoku-koujou",
    "name": "所得向上推進企業等総合支援事業費補助金",
    "provider": "高知県 産業振興部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "要確認",
    "summary": "付加価値向上や賃金向上を目指す企業の商品高度化・生産能力拡大・販路拡大・人材育成などを補助する。賃金・付加価値の3年計画が必要。",
    "eligibility": [
      "3年間の賃金・付加価値向上計画を策定する県内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "高知県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度1次公募は5/20に終了（以降は要確認）",
    "deadline": "2026-05-20",
    "priority": 6,
    "url": "https://www.pref.kochi.lg.jp/doc/2026021300101/"
  },
  {
    "id": "kochi-city-akitenpo-sogyo",
    "name": "高知市空き店舗活用創業支援事業",
    "provider": "高知市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "店舗賃借料の一部補助（出店地・区分・34歳以下の若年層枠で補助率が異なる）",
    "summary": "商店街・中心市街地の空き店舗で開業する事業者の賃借料を補助する。",
    "eligibility": [
      "空き店舗で事業を営む方",
      "事前に高知商工会議所の指導を受けること"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "高知県"
    ],
    "cities": [
      "高知市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認（来年度分は予算措置次第）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kochi.kochi.jp/soshiki/128/akitenpo.html"
  },
  {
    "id": "kochi-city-hanro-support",
    "name": "高知市販路拡大サポート事業費",
    "provider": "高知市 外商支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率原則1/2（3年度助成後は1/4）",
    "summary": "中小企業者の自社開発商品の販路拡大を支援する。",
    "eligibility": [
      "市内中小企業者"
    ],
    "industries": [
      "food",
      "manufacturing",
      "retail"
    ],
    "prefectures": [
      "高知県"
    ],
    "cities": [
      "高知市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "補助対象期間 令和8年4月1日〜令和9年3月31日",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kochi.kochi.jp/soshiki/204/support.html"
  },
  {
    "id": "nankoku-city-chushokigyo-shinko-hojo",
    "name": "南国市中小企業振興事業費補助金",
    "provider": "南国市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助対象経費の1/2以内、上限60万円",
    "summary": "市内中小企業者の創業支援（指定区域内）、特産品・新製品の開発、販路拡大などを支援する補助金。審査会で適正と認められた事業が対象。",
    "eligibility": [
      "南国市内の中小企業者",
      "創業・新製品開発・販路拡大などの事業",
      "審査会で適正と認められること"
    ],
    "industries": "all",
    "prefectures": [
      "高知県"
    ],
    "cities": [
      "南国市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "要確認（交付要綱は令和8年4月1日施行、単年度事業）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nankoku.lg.jp/life/life_dtl.php?hdnKey=6720"
  },
  {
    "id": "nankoku-city-sentan-setsubi-hojo",
    "name": "令和8年度南国市先端設備等導入支援事業費補助金",
    "provider": "南国市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率2/3、上限200万円（従業員なしの場合は1/2、上限100万円）",
    "summary": "賃上げにつながる設備投資を支援する補助金。交付決定前の契約・発注や中古・リース設備は対象外。",
    "eligibility": [
      "南国市内の事業者",
      "賃上げにつながる設備投資を行うこと",
      "交付決定前に契約・発注しないこと"
    ],
    "industries": "all",
    "prefectures": [
      "高知県"
    ],
    "cities": [
      "南国市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認（令和8年度）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nankoku.lg.jp/life/life_dtl.php?hdnKey=9878"
  },
  {
    "id": "fukuoka-keiei-kakushin-chinage",
    "name": "福岡県中小企業経営革新・賃上げ緊急支援補助金",
    "provider": "福岡県 商工部／福岡県中小企業振興センター",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "賃上げを行いながら経営革新に取り組む県内中小企業を支援する補助金。第5次募集は6/22〜7/15。",
    "eligibility": [
      "賃上げに取り組む県内中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "第5次募集 令和8年6/22〜7/15（以降は要確認）",
    "deadline": "2026-07-15",
    "priority": 6,
    "url": "https://www.joho-fukuoka.or.jp/chinage/index.html"
  },
  {
    "id": "fukuoka-shinki-sogyo-shikin",
    "name": "新規創業資金（福岡県中小企業融資制度）",
    "provider": "福岡県 商工部／福岡県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "限度額3,500万円（成長支援資金と合算）、年1.60%、保証料0.00%、運転7年・設備10年以内",
    "summary": "創業する個人または会社の事業資金を融資する県制度融資。担保は原則不要。",
    "eligibility": [
      "創業する個人または会社"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "随時（令和8年度融資制度。最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.fukuoka.lg.jp/contents/r8yuushiseidoannai.html"
  },
  {
    "id": "fukuoka-shoene-shinseihin",
    "name": "福岡県省エネ新製品開発支援補助金",
    "provider": "福岡県 商工部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/2以内、上限500万円",
    "summary": "省エネに資する新製品開発に取り組む中小企業の経費を補助する。",
    "eligibility": [
      "省エネ新製品開発に取り組む県内中小企業（製造業等）"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年7/6〜8/21で受付終了（3次募集の案内ページあり、最新は要確認）",
    "deadline": "2026-08-21",
    "priority": 6,
    "url": "https://www.pref.fukuoka.lg.jp/contents/shoenehojokin2026.html"
  },
  {
    "id": "fukuoka-yokatoko-kigyo",
    "name": "福岡よかとこ起業支援金",
    "provider": "福岡県 商工部／福岡県中小企業振興センター",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、上限200万円",
    "summary": "地域課題解決を目的に県内で起業・事業承継・第二創業する人に、立ち上げ経費の一部を補助する。",
    "eligibility": [
      "福岡県内で起業、事業承継または第二創業する人"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は5/15〜7/21で受付終了（来年度は要確認）",
    "deadline": "2026-07-21",
    "priority": 6,
    "url": "https://www.joho-fukuoka.or.jp/yokatoko/index.html"
  },
  {
    "id": "iizuka-city-kaigai-tenkai-hojo",
    "name": "飯塚市海外展開支援事業費補助金",
    "provider": "飯塚市 国際政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2以内、上限10万円（自社独自の活動の場合）",
    "summary": "市内中小企業者の海外展開に向けた取組を支援する補助金。",
    "eligibility": [
      "飯塚市内に主たる事務所を置く中小企業者",
      "海外展開に取り組むこと"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "飯塚市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iizuka.lg.jp/kokusai/kaigaibusiness.html"
  },
  {
    "id": "iizuka-city-shinki-sogyo-yushi",
    "name": "飯塚市新規創業支援資金融資制度",
    "provider": "飯塚市 商工観光課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "融資上限1,000万円、利率1.2%",
    "summary": "創業者および創業後5年未満の事業者向けの融資制度。申請窓口は指定金融機関。",
    "eligibility": [
      "創業者または創業後5年未満の事業者",
      "飯塚市内で事業を営む（営もうとする）こと"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "飯塚市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iizuka.lg.jp/soshiki/18/2408.html"
  },
  {
    "id": "iizuka-city-sogyo-rishi-hokyu",
    "name": "飯塚市新規創業支援資金利子補給及び信用保証料補助",
    "provider": "飯塚市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "利子の50%以内、信用保証料の100%以内",
    "summary": "新規創業支援資金を利用した事業者に、支払った利子と信用保証料の一部を補助する。利子等を支払った後に申請する。",
    "eligibility": [
      "飯塚市新規創業支援資金融資を利用していること",
      "利子・保証料を支払済みであること"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "飯塚市"
    ],
    "stages": [
      "early"
    ],
    "period": "要確認（支払後に申請、年度ごとに受付）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.iizuka.lg.jp/shoko/yuusirisi.html"
  },
  {
    "id": "itoshima-city-ganbaru-chusho-ouen-hojo",
    "name": "令和8年度糸島市がんばる中小企業者応援補助金",
    "provider": "糸島市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "経営革新計画に沿う事業は補助率2/3以内・上限40万円、計画を作らない事業は市長が認めた場合に1/3以内・上限10万円（市内農林水産物を50％以上使用する場合は上限加算あり）",
    "summary": "市内の中小企業者が経営革新を行う新商品・新サービス開発や新たな生産・販売方式の導入などの新規事業にかかる経費の一部を補助する。",
    "eligibility": [
      "市内で商工業を営む中小企業者",
      "創業から1年以上経過している",
      "市税の滞納がない"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "糸島市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年4月1日から令和9年1月29日まで（事業期間は交付決定日から令和9年2月28日まで）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.itoshima.lg.jp/s047/020/010/160/400/20260302130641.html"
  },
  {
    "id": "itoshima-city-keiei-kyoka-jigyo-seicho-hojo",
    "name": "令和8年度糸島市経営強化・事業成長支援補助金",
    "provider": "糸島市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認（補助金情報サイトでは補助率2/3・上限10万円と掲載。市公式ページで要確認）",
    "summary": "経営強化や経営革新、事業成長に挑戦する市内商工業者の取組みにかかる経費の一部を補助する。",
    "eligibility": [
      "市内で事業を営む商工業者",
      "市税の滞納がない",
      "交付決定前に着手した事業は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "糸島市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和9年1月29日まで（詳細は市公式ページ参照）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.itoshima.lg.jp/s047/020/010/160/100/20260302130809.html"
  },
  {
    "id": "kasuga-city-chushokigyo-jigyo-shikin-yushi",
    "name": "春日市中小企業事業資金融資",
    "provider": "春日市 地域づくり課（商工農政担当）",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "1事業所あたり1,000万円以下、期間原則5年以内（500万円以上は7年以内）",
    "summary": "設備資金・運転資金を対象とした市の制度融資。保証人・担保は原則不要で、受付は春日市商工会。",
    "eligibility": [
      "春日市内の中小企業者",
      "資金使途は設備資金または運転資金"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "春日市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kasuga.fukuoka.jp/shisei/nyuusatsu/shoukoushien/1003974/1003975.html"
  },
  {
    "id": "kasuga-city-chushokigyo-sogyo-yushi",
    "name": "春日市中小企業創業融資",
    "provider": "春日市 地域づくり課（商工農政担当）",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "1対象者あたり1,500万円以下、期間7年以内（1,000万円以上は10年以内）",
    "summary": "市の認定を受けた特定創業支援等事業を受けた創業者などを対象とする創業向け制度融資。",
    "eligibility": [
      "市の認定を受けた特定創業支援等を受けた方など",
      "春日市内で創業する（した）こと"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "春日市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kasuga.fukuoka.jp/shisei/nyuusatsu/shoukoushien/1003974/1003985.html"
  },
  {
    "id": "kasuga-city-hoshoryo-hojo",
    "name": "春日市保証料補助制度",
    "provider": "春日市 地域づくり課（商工農政担当）",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "支払った保証料の一部（割合は要確認）",
    "summary": "市制度融資を完済した中小企業者に、支払った信用保証料の一部を補助する。",
    "eligibility": [
      "春日市の制度融資を完済した中小企業者",
      "全額返済日の翌日から1年以内に申請すること"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "春日市"
    ],
    "stages": [
      "established"
    ],
    "period": "完済日の翌日から1年以内",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kasuga.fukuoka.jp/shisei/nyuusatsu/shoukoushien/1003974/1003976.html"
  },
  {
    "id": "kurume-city-digital-shokibo",
    "name": "久留米市小規模事業者デジタル化支援補助金",
    "provider": "久留米市 商工政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/2・上限20万円",
    "summary": "デジタル技術の導入・活用による生産性向上の取り組みを支援する。",
    "eligibility": [
      "市内小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "久留米市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年12月28日まで（予算上限到達で終了）",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.kurume.fukuoka.jp/1090sangyou/2020shoukougyou/3020joseiseido/2021-0423-1221-74.html"
  },
  {
    "id": "kurume-city-jinzai-kakuho",
    "name": "久留米市人材確保支援事業費補助金",
    "provider": "久留米市 雇用労働担当",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "正規職員の確保に取り組む中小企業者等を支援する。令和8年度募集。",
    "eligibility": [
      "正規職員の確保に取り組む市内中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "久留米市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認（令和8年度募集あり）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kurume.fukuoka.jp/1090sangyou/2060koyouroudou/3050jyosei/2024-0423-1402-80.html"
  },
  {
    "id": "kurume-city-sentan-setsubi",
    "name": "久留米市中小企業先端設備等導入支援補助金",
    "provider": "久留米市 商工政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/2・上限500万円",
    "summary": "設備投資により生産性向上・賃上げに取り組む事業者を支援する。",
    "eligibility": [
      "先端設備等導入計画の認定を受けた中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "久留米市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年7月1日〜12月28日",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.kurume.fukuoka.jp/1090sangyou/2020shoukougyou/3020joseiseido/2026-0617-1553-74.html"
  },
  {
    "id": "kurume-city-shinki-kaigyo-shikin",
    "name": "久留米市新規開業資金（創業融資）",
    "provider": "久留米市 商工政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "融資2,000万円以内・利率1.26%（特定創業支援で1.16%）・保証料市負担・借入後1年間の利子全額補給",
    "summary": "創業者向けの市制度融資。保証料は市が負担し、利子補給もある。",
    "eligibility": [
      "市内で開業する具体的計画のある個人等"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "久留米市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kurume.fukuoka.jp/1090sangyou/2020shoukougyou/3010shienseido/sinki01.html"
  },
  {
    "id": "kurume-city-shutten-sokushin",
    "name": "久留米市地域商業等活性化出店促進事業費補助金",
    "provider": "久留米市 商工政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率50%以内・上限50万円（一部業種100万円）",
    "summary": "空き店舗・空き家へ入居する際の店舗改装・新設費用を補助する。",
    "eligibility": [
      "空き店舗・空き家に出店する事業者"
    ],
    "industries": [
      "retail",
      "food",
      "beauty"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "久留米市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "事業計画認定申請 令和8年4月1日〜12月28日",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.kurume.fukuoka.jp/1090sangyou/2020shoukougyou/3020joseiseido/2020-1201-1241-74.html"
  },
  {
    "id": "omuta-city-kigyo-kyosoryoku-hojo",
    "name": "大牟田市企業競争力強化促進補助金",
    "provider": "大牟田市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "その他",
    "amount": "要確認",
    "summary": "市内企業の競争力強化を促進するための補助制度。詳細は市の案内ページで確認が必要。",
    "eligibility": [
      "大牟田市内の企業",
      "詳細は市の案内ページ参照"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "大牟田市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.omuta.lg.jp/kiji00320273/index.html"
  },
  {
    "id": "omuta-city-kigyoka-shien-hojo",
    "name": "大牟田市起業家支援事業費補助金",
    "provider": "大牟田市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "創業費1/2・上限50万円、家賃1/2・月額上限5万円（最長12か月、商店街創業のみ）",
    "summary": "市内での創業にかかる事業所改修等の創業費と、商店街での創業時の家賃を補助する。補助後は市と大牟田商工会議所のフォローアップ指導がある。",
    "eligibility": [
      "大牟田市内で創業する方",
      "認定特定創業支援等事業の修了など",
      "家賃補助は商店街での創業に限る"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "大牟田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（創業費は着手前に申請、家賃は創業後1年以内に申請）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.omuta.lg.jp/kiji003211/index.html"
  },
  {
    "id": "omuta-city-shinki-sogyo-yushi",
    "name": "大牟田市新規創業融資資金",
    "provider": "大牟田市 産業振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額1,000万円、年利1.3%",
    "summary": "創業に必要な設備資金・運転資金を、担保・保証人なしで低利に融資する制度。",
    "eligibility": [
      "大牟田市内で創業する方または創業後間もない事業者",
      "融資条件は市の案内ページ参照"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "大牟田市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.omuta.lg.jp/kiji003162/index.html"
  },
  {
    "id": "onojo-city-chushokigyo-yushi",
    "name": "大野城市中小企業融資制度",
    "provider": "大野城市 産業振興課（受付は大野城市商工会）",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "貸付限度1,000万円、返済10年以内（据置6か月以内）、年1.60%",
    "summary": "市内で事業を営む中小企業者向けの制度融資。完済後は保証料の一部補助を受けられる場合がある（完済日から1年以内に申請）。",
    "eligibility": [
      "市内で1年以上事業を続けている中小企業者",
      "市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "大野城市"
    ],
    "stages": [
      "established"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.onojo.fukuoka.jp/kiji0037053/index.html"
  },
  {
    "id": "onojo-city-keiei-sodan-sogyo-shien",
    "name": "大野城市 中小企業対象の経営相談・診断・創業支援",
    "provider": "大野城市 産業振興課・大野城市商工会",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "創業・起業",
    "amount": "要確認（相談は無料の案内あり）",
    "summary": "創業希望者や中小企業者向けの経営相談・診断・創業支援の案内。ワン・ストップ無料相談では社会保険労務士や中小企業診断士などが対応する。",
    "eligibility": [
      "大野城市内の中小企業者または創業希望者"
    ],
    "industries": "all",
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "大野城市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.onojo.fukuoka.jp/s104/050/010/020/7509.html"
  },
  {
    "id": "saga-akiten-model",
    "name": "佐賀県空き店舗対策モデル創出事業費補助金",
    "provider": "佐賀県 産業政策課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "改装費の1/2以内、1事業者あたり上限500万円",
    "summary": "市町が計画的に商業振興を図るエリア内の空き店舗の活用・流通を促進するモデルを創出する事業を補助する。",
    "eligibility": [
      "商業エリア内の空き店舗を活用する事業者"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "佐賀県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和7年度募集（締切2025/7/9）。令和8年度は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.saga.lg.jp/kiji003113963/index.html"
  },
  {
    "id": "saga-jigyo-hikitsugi",
    "name": "佐賀県事業引継ぎ奨励金",
    "provider": "佐賀県 産業政策課",
    "level": "prefecture",
    "type": "給付金",
    "cat": "事業承継",
    "amount": "第三者承継で譲渡側・譲受側それぞれ30万円",
    "summary": "県内中小企業・小規模事業者の第三者への円滑な事業引継ぎを後押しする奨励金。",
    "eligibility": [
      "県内の中小企業・小規模事業者の事業引継ぎ（譲渡側・譲受側）"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和9年3月1日まで受付",
    "deadline": "2027-03-01",
    "priority": 6,
    "url": "https://www.pref.saga.lg.jp/kiji003112764/index.html"
  },
  {
    "id": "saga-jigyo-shokei-enkatsuka",
    "name": "佐賀県中小企業事業承継円滑化支援事業費補助金",
    "provider": "佐賀県 産業政策課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "補助率1/2以内、上限100万円",
    "summary": "事業承継を円滑に進める県内中小企業の経費を補助する。",
    "eligibility": [
      "県内の中小企業者（事業承継に取り組む者）"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度2次公募は8/14〜9/25で受付終了",
    "deadline": "2026-09-25",
    "priority": 6,
    "url": "https://www.pref.saga.lg.jp/kiji003112937/index.html"
  },
  {
    "id": "saga-seisansei-koujou",
    "name": "佐賀県中小企業生産性向上支援補助金（第7弾）",
    "provider": "佐賀県 産業政策課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率原則2/3以内",
    "summary": "原材料・エネルギー価格高騰や人材不足の中、県内中小企業の生産性向上を支援する補助金。",
    "eligibility": [
      "県内中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "第7弾は令和8年7/1〜7/31で受付終了（次弾は要確認）",
    "deadline": "2026-07-31",
    "priority": 6,
    "url": "https://www.pref.saga.lg.jp/kiji003119835/index.html"
  },
  {
    "id": "saga-sousei-kashitsuke",
    "name": "さが創生貸付（創業資金）",
    "provider": "佐賀県 産業政策課／佐賀県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額3,500万円（設備・運転合計）、年1.3%（ページ記載）",
    "summary": "創業者向けの県制度融資。ページ更新日が古く、現行条件は要確認。",
    "eligibility": [
      "独立・創業する者（設立された会社に限る等の要件あり）"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.saga.lg.jp/kiji00327241/index.html"
  },
  {
    "id": "karatsu-city-chushokigyo-kasseika-sogyo-hojo",
    "name": "唐津市中小企業等活性化支援事業補助金（創業支援分）",
    "provider": "唐津市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "通常枠は補助率1/3、移住創業枠は補助率1/2。上限は空き店舗等の活用で100万円、それ以外は50万円（移住創業枠の上限額は市ページ間で記載が異なるため要確認）。補助対象経費30万円未満は対象外",
    "summary": "唐津市内で新規創業・新規出店・空き店舗等の活用を行う方の、店舗改装費・賃料（3か月相当分まで）・創立費・広告宣伝費などを補助する。",
    "eligibility": [
      "唐津市内に住所があり市内で新規創業または新規出店を行う",
      "補助対象経費が30万円以上",
      "移住創業枠は市外からの移住者が対象"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [
      "唐津市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年12月28日（月）まで",
    "deadline": "2026-12-28",
    "priority": 8,
    "url": "https://www.city.karatsu.lg.jp/site/navi/2102.html"
  },
  {
    "id": "saga-city-digital-gijutsu",
    "name": "佐賀市デジタル技術導入支援事業補助金（令和8年度）",
    "provider": "佐賀市 経済政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/2以内・上限50万円",
    "summary": "デジタル技術の導入に要する経費を補助する（企業改革支援事業のメニュー）。",
    "eligibility": [
      "市内の中小企業者",
      "創業または設立後1年以上",
      "令和5〜7年度に同補助金を受けていないこと"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [
      "佐賀市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度の新規受付は終了（予算額到達）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.saga.lg.jp/main/116036.html"
  },
  {
    "id": "saga-city-hanro-kaitaku",
    "name": "佐賀市販路開拓支援事業費補助金（展示会・物産展出展）",
    "provider": "佐賀市 経済政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2以内（展示会等出展は上限15万円、物産展等催事出店は上限10万円）",
    "summary": "県外・オンライン開催の展示会・見本市や物産展等への出展費用（出展料、装飾費、運搬費、旅費など）を補助する。",
    "eligibility": [
      "市内に本社または主たる事業所がある中小企業者・個人事業者"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [
      "佐賀市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "予定申請件数に達したため一旦受付停止（令和8年7月28日時点）。再開は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.saga.lg.jp/main/98146.html"
  },
  {
    "id": "saga-city-hatarakigai-kigyoryoku",
    "name": "佐賀市 働きがい×企業力アップ支援事業補助金（令和8年度）",
    "provider": "佐賀市 経済政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "1年目 上限160万円（補助率2/3以内）、2年目 上限150万円（1/2以内。DX認定取得で2/3以内）",
    "summary": "2年間の伴走で働きがいのある職場づくりと企業力強化に取り組む費用（専門家謝金、機器・ソフト、研修等）を補助する。",
    "eligibility": [
      "市内に本店がある中小企業者",
      "創業または設立後1年以上",
      "市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [
      "佐賀市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度募集（受付状況は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.saga.lg.jp/main/116385.html"
  },
  {
    "id": "saga-city-hatarakiyasusa-up",
    "name": "佐賀市働きやすさアップ支援補助金",
    "provider": "佐賀市 経済政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "従業員の意識調査や人事評価制度・就業規則の見直しなど、働きやすい職場づくりの取組を支援する（企業改革支援事業のメニュー）。",
    "eligibility": [
      "市内の中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [
      "佐賀市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.saga.lg.jp/main/116194.html"
  },
  {
    "id": "saga-city-jiba-sanpin",
    "name": "佐賀市地場産品支援事業費補助金（需要開拓・新商品開発・知的財産権取得）",
    "provider": "佐賀市 経済政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "需要開拓事業は補助率1/2以内・上限15万円（他事業は要確認）",
    "summary": "地場産品の需要開拓（ホームページ作成・ECサイト構築等）、新商品等開発、知的財産権取得の費用を補助する。",
    "eligibility": [
      "市内の事業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [
      "佐賀市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.saga.lg.jp/main/80040.html"
  },
  {
    "id": "saga-city-sogyo-shikin-risoku",
    "name": "佐賀市創業資金利子助成補助金",
    "provider": "佐賀市 経済政策課（産業支援）",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "利子の2年分（上限50万円、遅延利息は除く）",
    "summary": "無担保・無保証の創業融資を受けた創業者に、支払利子の2年分を助成する。",
    "eligibility": [
      "特定創業支援等事業の支援を受けていること",
      "市内で開業していること",
      "市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [
      "佐賀市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（令和8年度の最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.saga.lg.jp/main/48227.html"
  },
  {
    "id": "tosu-city-akimise-katsuyo-hojo",
    "name": "鳥栖市空き店舗等活用支援事業補助金",
    "provider": "鳥栖市 商工観光課（鳥栖商工会議所を通じて実施）",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "移住起業者は補助率3/4以内・上限150万円、それ以外は補助率1/2以内・上限100万円",
    "summary": "市が指定する中心市街地（鳥栖駅西側創業地域）の空き店舗等を改装して独立・開業または新事業展開を行う方に、改装費の一部を補助する。",
    "eligibility": [
      "1年以上営業されていない空き店舗・店舗兼住宅、または1年以上無人の空き家を活用する",
      "改装工事の前に商工会議所へ申請し交付決定を受ける",
      "市税の滞納がない"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [
      "鳥栖市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年11月30日（月）まで（予算の範囲内で先着順）",
    "deadline": "2026-11-30",
    "priority": 8,
    "url": "https://www.city.tosu.lg.jp/soshiki/18/64026.html"
  },
  {
    "id": "tosu-city-chusho-koguchi-shikin-yushi",
    "name": "鳥栖市中小企業小口資金融資制度",
    "provider": "鳥栖市 商工観光課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認（信用保証料は、経営者保証非提供制度による上乗せ分を除き市が全額負担）",
    "summary": "市内の中小企業者向けの小口融資制度で、信用保証料を市が負担する。",
    "eligibility": [
      "鳥栖市内の中小企業者",
      "詳細な要件は市公式ページで要確認"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [
      "鳥栖市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tosu.lg.jp/soshiki/18/2425.html"
  },
  {
    "id": "tosu-city-sogyo-shien-hojo",
    "name": "鳥栖市創業支援事業補助金（信用保証料補助）",
    "provider": "鳥栖市 商工観光課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "信用保証料の一括払いは支払額の1/2、分割払いは初回支払額の1/2",
    "summary": "市内で新規創業した方が佐賀県の「さが創生貸付【独立・創業資金】」を利用した際の信用保証料の一部を補助する。",
    "eligibility": [
      "鳥栖市内で新規に創業し事務所等を開設する",
      "令和8年4月1日から令和9年3月31日に独立・創業資金の融資を受けた",
      "信用保証料を納入している"
    ],
    "industries": "all",
    "prefectures": [
      "佐賀県"
    ],
    "cities": [
      "鳥栖市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "融資実行日から60日以内に申請（対象融資は令和8年4月1日〜令和9年3月31日実行分）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.tosu.lg.jp/soshiki/18/2428.html"
  },
  {
    "id": "nagasaki-chinage-kinkyu-shienkin",
    "name": "中小・小規模事業者賃上げ緊急支援金",
    "provider": "長崎県 産業労働部",
    "level": "prefecture",
    "type": "給付金",
    "cat": "人材・雇用",
    "amount": "1事業者15万円",
    "summary": "最低賃金の大幅引上げの影響を受ける県内中小・小規模事業者への直接支援金。",
    "eligibility": [
      "従業員を1名以上雇用する県内中小・小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年6/1〜12/28（予定）",
    "deadline": "2026-12-28",
    "priority": 6,
    "url": "https://www.pref.nagasaki.jp/bunrui/shigoto-sangyo/chushokigyoshien-kinyu/jigyoshashien/chinage-shien/"
  },
  {
    "id": "nagasaki-digital-koujou",
    "name": "長崎県デジタル力向上支援事業費補助金",
    "provider": "長崎県 経営支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率2/3以内、10万〜100万円",
    "summary": "社内人材のデジタル能力向上や機器・ツール導入を支援する。",
    "eligibility": [
      "創業後1年を経過した県内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度（受付状況は最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.nagasaki.jp/doc/page-721123.html"
  },
  {
    "id": "nagasaki-jigyo-shokei-sokushin",
    "name": "事業承継促進・後継者事業展開支援補助金",
    "provider": "長崎県 経営支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "補助率1/2以内（小規模企業者2/3以内）、経費区分ごと上限50万円",
    "summary": "事業承継や後継者による事業展開に伴う経費を補助する。予算上限に達し次第締切。",
    "eligibility": [
      "県内の中小企業者・小規模企業者（事業承継・後継者の事業展開）"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年3/30〜9/30（当日消印有効）で受付終了",
    "deadline": "2026-09-30",
    "priority": 6,
    "url": "https://www.pref.nagasaki.jp/doc/page-651166.html"
  },
  {
    "id": "nagasaki-kokkyoritou-sogyo",
    "name": "長崎県国境離島創業・事業拡大等支援事業（雇用機会拡充事業）",
    "provider": "長崎県 地域振興部（対馬・壱岐・五島）",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "創業の補助上限450万円（年間上限600万円）",
    "summary": "国境離島で新たな雇用を生む創業・事業拡大を支援する。",
    "eligibility": [
      "対馬・壱岐・五島列島で雇用を生む創業・事業拡大を行う事業者"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "第1回交付決定分は終了。市町ごとに募集（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.nagasaki.jp/bunrui/kurashi-kankyo/chiikidukuri/rito-hanto-kaso/kokkyoritou/koyoukikaikakujyu/body.html"
  },
  {
    "id": "nagasaki-sogyo-shienkin",
    "name": "長崎県創業支援金（創業支援事業）",
    "provider": "長崎県 産業労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、上限200万円",
    "summary": "県内で地域課題の解決に資する社会的事業を始める創業予定者の創業経費の一部を補助し、伴走支援も行う。",
    "eligibility": [
      "県内で社会的事業を創業する予定の者"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [],
    "stages": [
      "planning"
    ],
    "period": "令和8年度は4/10〜5/29で受付終了（来年度は要確認）",
    "deadline": "2026-05-29",
    "priority": 6,
    "url": "https://www.pref.nagasaki.jp/doc/page-391611.html"
  },
  {
    "id": "isahaya-city-chusho-sogyo-shien-shikin-yushi",
    "name": "諫早市中小企業創業支援資金（中小企業融資制度）",
    "provider": "諫早市 商工観光課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資後3年間、利子の半分を市が補給し、長崎県信用保証協会の保証料は市が全額補給（限度額・利率は年度により変動するため要確認）",
    "summary": "市内の創業者向けに、市が金融機関へ原資を預託して低利融資を行い、利子と保証料を補給する制度。",
    "eligibility": [
      "市内に住所があり市税等の滞納がない創業者",
      "信用保証協会の保証対象業種を営む",
      "申込書は諫早商工会議所または諫早市商工会が指導機関"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "諫早市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.isahaya.nagasaki.jp/soshiki/49/1594.html"
  },
  {
    "id": "isahaya-city-chuto-shikingurishien-kyufukin",
    "name": "諫早市中小企業緊急資金繰り支援給付金",
    "provider": "諫早市 商工観光課 給付金係",
    "level": "municipality",
    "type": "給付金",
    "cat": "融資・利子補給",
    "amount": "長崎県の緊急資金繰り支援資金（環境変化対策）の融資額に1.6％を乗じた額（上限160万円）",
    "summary": "中東情勢による原油・原材料価格高騰の影響を受けた市内事業者が県の制度融資を利用した際に支給される給付金。",
    "eligibility": [
      "中東情勢の影響を受けた市内事業者",
      "長崎県の緊急資金繰り支援資金（環境変化対策）を利用",
      "セーフティネット保証5号の認定を受けている"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "諫早市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認（市公式ページ参照）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.isahaya.nagasaki.jp/soshiki/49/47211.html"
  },
  {
    "id": "nagasaki-city-bansogata-dx",
    "name": "令和8年度長崎市伴走型DX化支援補助金",
    "provider": "長崎市 新産業推進課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "要確認（前年度は補助率1/2・上限50万円）",
    "summary": "DXに知見を持つ外部専門家による相談・助言など伴走型支援の費用を補助する（システム・機器導入費は対象外）。",
    "eligibility": [
      "市内の中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "長崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nagasaki.lg.jp/page/83459.html"
  },
  {
    "id": "nagasaki-city-challenge-kigyo",
    "name": "長崎市チャレンジ企業応援事業費補助金（令和8年物価高騰対策関連）",
    "provider": "長崎市 新産業推進課",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "要確認",
    "summary": "賃上げ環境の整備に向け、新製品・新サービス開発、事業拡大、DX推進による生産性向上、機械設備導入等の経費を補助する。",
    "eligibility": [
      "市内の中小企業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "長崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "申請期限は令和8年9月30日とされ、受付終了の可能性あり。最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nagasaki.lg.jp/page/76401.html"
  },
  {
    "id": "nagasaki-city-jinzai-kakuho",
    "name": "長崎市人材確保支援費補助金",
    "provider": "長崎市 新産業推進課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "市内中小企業者の人材確保の取組費用を支援する補助金。",
    "eligibility": [
      "市内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "長崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "予算上限に達し募集終了（令和8年度か要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://city.nagasaki.lg.jp/jigyo/340000/341000/p031467.html"
  },
  {
    "id": "nagasaki-city-sogyosha-seicho",
    "name": "長崎市創業者成長支援補助金",
    "provider": "長崎市 新産業推進課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2、上限25万円（訪問客還元事業は上限50万円）",
    "summary": "創業サポート長崎の特定創業支援を受けて事業計画を作成した創業者の、広報費・外部委託費・備品購入費・展示会出展費等を補助する。",
    "eligibility": [
      "創業サポート長崎による特定創業支援等事業を受けた創業者",
      "交付決定前の契約・購入は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "長崎市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年11月30日まで（予算がなくなり次第終了）",
    "deadline": "2026-11-30",
    "priority": 8,
    "url": "https://www.city.nagasaki.lg.jp/page/55890.html"
  },
  {
    "id": "omura-city-chushin-shotengai-tenant-mix-hojo",
    "name": "大村市中心商店街テナントミックス事業費補助金（空き店舗対策補助）",
    "provider": "大村市 商工振興課（申請窓口は大村商工会議所）",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "家賃の1/2以内・月額5万円限度、補助期間12か月",
    "summary": "中心商店街の空き店舗に出店する方の家賃の一部を補助する。",
    "eligibility": [
      "中心商店街の空き店舗に新たに出店する",
      "申請は大村商工会議所を通じて行う"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "大村市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認（市の補助金一覧は令和8年4月1日現在で掲載）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.omura.nagasaki.jp/syoukou/machi/shokogyo/hojo/akimise.html"
  },
  {
    "id": "omura-city-chusho-sogyo-shikin-yushi",
    "name": "大村市中小企業創業資金融資制度",
    "provider": "大村市 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "融資限度額1,000万円・年1.50％（掲載時点。保証料は市が全額補給。最新条件は要確認）",
    "summary": "これから創業する方や設立1年以内の事業者向けに、創業資金を低金利で融資し保証料を市が補給する制度。",
    "eligibility": [
      "市内に住所がある未開業者で事業開始の具体的計画がある",
      "または会社設立から1年を経過していない"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "大村市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.omura.nagasaki.jp/sangyou/machi/sangyoshinko/chushokigyo/yushi/omura/chushokigyoyushi/sougiyousikin.html"
  },
  {
    "id": "sasebo-city-hanro-kaitaku",
    "name": "佐世保市中小企業販路開拓支援事業",
    "provider": "佐世保市 経済部 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "展示会出展と広告宣伝を併せて行う場合の補助限度額100万円（補助率は要確認）",
    "summary": "新製品の展示会出展や広告宣伝にかかる経費を補助する。",
    "eligibility": [
      "市内の中小企業者",
      "新製品等の展示会出展・広告宣伝"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "佐世保市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和7年度分は令和8年2月13日で受付終了（令和8年度は最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.sasebo.lg.jp/keizai/syouko/hanrokaitaku.html"
  },
  {
    "id": "sasebo-city-jinzai-ikusei",
    "name": "佐世保市中小企業等人材育成支援事業補助金",
    "provider": "佐世保市 経済部 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "従業員の研修派遣：対象経費の1/2以内（年間1企業上限10万円）",
    "summary": "中小企業大学校等への従業員研修派遣や研修会開催にかかる経費を補助する。",
    "eligibility": [
      "市内の中小企業者",
      "従業員の研修派遣または研修会開催"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "佐世保市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "市の一覧で受付終了と表示（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.sasebo.lg.jp/keizai/syouko/jinzaikuse.html"
  },
  {
    "id": "sasebo-city-keiei-kiban-kyoka",
    "name": "佐世保市 経営基盤強化資金（令和8年4月創設）",
    "provider": "佐世保市 経済部 商工労働課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資上限3,000万円、返済期間 設備10年・運転7年、保証料率1.45%",
    "summary": "物価高などで利益率が低下している市内中小企業者向けの制度融資。",
    "eligibility": [
      "物価高等で利益率が低下している市内中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "佐世保市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年4月1日創設（通年、詳細は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.sasebo.lg.jp/keizai/syouko/yushi.html"
  },
  {
    "id": "sasebo-city-sentan-setsubi",
    "name": "令和8年度 佐世保市先端設備等導入促進事業補助金",
    "provider": "佐世保市 経済部 商工労働課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "対象経費の1/2以内（上限500万円）",
    "summary": "先端設備等導入計画の認定を受けた市内中小企業者の設備投資を補助する。賃上げ方針の計画への位置付けが要件。",
    "eligibility": [
      "先端設備等導入計画の認定を受けた市内中小企業者",
      "賃上げ方針を計画に位置付けること"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "佐世保市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "新規申請は受付終了（計画認定は随時受付。来年度は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.sasebo.lg.jp/keizai/syouko/505senntan.html"
  },
  {
    "id": "sasebo-city-sogyo-shikin",
    "name": "佐世保市中小企業創業資金融資",
    "provider": "佐世保市 経済部 商工労働課",
    "level": "municipality",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "融資限度額2,000万円（特定創業支援を受けた方は優遇利率0.65%と資料に記載）",
    "summary": "市内で創業する方向けの制度融資。特定創業支援を受けると借入対象期間の拡大や利率優遇がある。",
    "eligibility": [
      "市内で創業する方または創業間もない方",
      "申込窓口は佐世保商工会議所・佐世保市北部商工会・宇久町商工会"
    ],
    "industries": "all",
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "佐世保市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度の融資制度（通年、詳細は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.sasebo.lg.jp/keizai/syouko/yushi.html"
  },
  {
    "id": "kumamoto-chiiki-kadai-kigyo",
    "name": "熊本県地域課題解決型起業支援補助金",
    "provider": "熊本県",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、上限200万円",
    "summary": "デジタル技術を活用して地域課題の解決を目的に起業する人を支援する補助金。",
    "eligibility": [
      "地域課題解決を目的に県内で起業する者",
      "デジタル技術を活用する事業"
    ],
    "industries": "all",
    "prefectures": [
      "熊本県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度の申請は2026年8月24日で受付終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kumamoto.jp/soshiki/21/276337.html"
  },
  {
    "id": "kumamoto-fukugyo-kengyo-jinzai",
    "name": "熊本県副業・兼業人材活用促進事業費補助金",
    "provider": "熊本県 産業支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率10分の8以内、上限50万円（1事業者あたり）",
    "summary": "副業・兼業人材を活用する県内事業者の紹介手数料・報酬・交通費・宿泊費を補助。",
    "eligibility": [
      "県内に本社または主たる事業所を持つ事業者",
      "副業・兼業人材を活用する事業"
    ],
    "industries": "all",
    "prefectures": [
      "熊本県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は第1期〜第3期（4/15〜7/10）、7月に2次募集の案内あり。最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kumamoto.jp/soshiki/65/263597.html"
  },
  {
    "id": "kumamoto-jigyo-shokei-atotsugi",
    "name": "熊本県事業承継・後継ぎ支援事業補助金",
    "provider": "熊本県 商工振興金融課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "要確認",
    "summary": "県内中小企業の事業承継・後継ぎを支援する補助金（令和8年度2次公募）。",
    "eligibility": [
      "県内の中小企業者等",
      "事業承継に取り組む事業者"
    ],
    "industries": "all",
    "prefectures": [
      "熊本県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度2次公募。事業承継準備枠は11月30日締切（詳細は要確認）",
    "deadline": "2026-11-30",
    "priority": 6,
    "url": "https://www.pref.kumamoto.jp/soshiki/61/231111.html"
  },
  {
    "id": "kumamoto-shokibo-ouen-shikin",
    "name": "熊本県融資制度 小規模事業者おうえん資金",
    "provider": "熊本県 商工振興金融課／熊本県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "保証限度額・利率は資料により異なるため要確認",
    "summary": "従業員20人以内などの小規模事業者向けの県制度融資。",
    "eligibility": [
      "小規模事業者（従業員20人以内など）",
      "取扱金融機関等で申込"
    ],
    "industries": "all",
    "prefectures": [
      "熊本県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kumamoto.jp/soshiki/61/50733.html"
  },
  {
    "id": "kumamoto-sogyosha-shien-shikin",
    "name": "熊本県融資制度 創業者支援資金",
    "provider": "熊本県 商工振興金融課／熊本県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額3,500万円（金利・保証料は要確認）",
    "summary": "新たに事業を始める人、開業後5年未満の人向けの県制度融資。",
    "eligibility": [
      "個人事業の開始前または開業後5年未満の方など（一般枠）",
      "取扱金融機関・商工会議所・商工会が窓口"
    ],
    "industries": "all",
    "prefectures": [
      "熊本県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（令和8年度融資制度案内R8.8.10改正。最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kumamoto.jp/soshiki/61/50733.html"
  },
  {
    "id": "koshi-city-chusho-kigyo-shisaku",
    "name": "市が実施する中小企業等支援施策（合志市）",
    "provider": "合志市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "その他",
    "amount": "要確認",
    "summary": "合志市が実施する中小企業等向けの支援施策をまとめた市の案内ページ。個別制度の内容・金額は同ページで確認が必要。",
    "eligibility": [
      "市内に事業所を有する中小企業者等（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "熊本県"
    ],
    "cities": [
      "合志市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.koshi.lg.jp/kiji00322529/index.html"
  },
  {
    "id": "koshi-city-sogyo-shien-hojo",
    "name": "合志市創業支援事業補助金",
    "provider": "合志市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "対象経費の1/2以内、上限 個人事業主20万円・法人30万円",
    "summary": "市内で創業する人の設備購入費・広報費・事業所借入費などの一部を補助する制度。",
    "eligibility": [
      "合志市の特定創業支援証明書を受けていること",
      "個人は市内居住、法人は市内に本店登記",
      "過去にこの補助金を受けていないこと"
    ],
    "industries": "all",
    "prefectures": [
      "熊本県"
    ],
    "cities": [
      "合志市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年4月1日〜令和9年2月28日（予算がなくなり次第終了）",
    "deadline": "2027-02-28",
    "priority": 8,
    "url": "https://www.city.koshi.lg.jp/kiji00319582/index.html"
  },
  {
    "id": "yatsushiro-city-sangyo-kasseika-jinzai-kigyo-ikusei-hojo",
    "name": "令和8年度八代市産業活性化人材・企業育成支援事業補助金",
    "provider": "八代市 商工政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "補助率は製造業・運輸業・卸売業・研究開発等が1/2、未来チャレンジ企業が2/3、建設業・サービス業・小売業等が1/3（令和8年度新規雇用者の研修等は1/2）。1人当たり上限は5万円/7万円/3万円。1企業当たり上限は要確認",
    "summary": "市内企業が経営者・従業員に研修受講や資格・免許取得をさせる費用、副業人材募集の情報掲載費用の一部を補助する。",
    "eligibility": [
      "八代市内に事業所を有する企業",
      "市税を完納している",
      "研修受講・資格取得・副業人材募集のための経費であること"
    ],
    "industries": "all",
    "prefectures": [
      "熊本県"
    ],
    "cities": [
      "八代市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（受付状況・予算上限は市公式ページで要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.yatsushiro.lg.jp/kiji00321796/index.html"
  },
  {
    "id": "oita-shin-kachi-sozo-shien",
    "name": "大分県新価値創出支援補助金",
    "provider": "大分県 経営創造・金融課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "要確認",
    "summary": "令和8年度の募集が県サイトで案内されている補助金（詳細は募集ページで確認）。",
    "eligibility": [
      "要確認"
    ],
    "industries": "all",
    "prefectures": [
      "大分県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度募集（2026年6月8日更新）。最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.oita.jp/life/sub/6/22/72/"
  },
  {
    "id": "oita-shoryokuka-seisansei",
    "name": "大分県省力化・生産性向上支援補助金",
    "provider": "大分県 商工観光労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "国補助金への上乗せ（率・上限は要確認）",
    "summary": "国の省力化投資補助金（カタログ注文型）やIT導入補助金（インボイス枠）に県が上乗せ支給。大幅な賃上げで上乗せ率が引き上げ。",
    "eligibility": [
      "国の省力化投資補助金またはIT導入補助金を活用する県内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "大分県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.oita.jp/site/tyusyodx/dxhojyo.html"
  },
  {
    "id": "oita-sogyo-shien-shikin",
    "name": "大分県創業支援資金特別融資",
    "provider": "大分県 経営創造・金融課／大分県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "保証限度額3,500万円、利率7年以内1.6%・10年以内1.8%（協会案内。最新は要確認）",
    "summary": "これから創業する人、創業後5年未満の人向けの県制度融資。保証料を県と協会が一部補助。",
    "eligibility": [
      "創業予定または創業後5年未満の方"
    ],
    "industries": "all",
    "prefectures": [
      "大分県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新条件は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.oita.jp/soshiki/14040/seidosikin-gaiyo.html"
  },
  {
    "id": "oita-sogyo-shinjigyo-hojo",
    "name": "大分県創業・新事業創出事業補助金（創業支援施設指定事業）",
    "provider": "大分県 経営創造・金融課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、上限40万円（令和7年度回の記載）",
    "summary": "県指定の創業支援施設に入居する創業者等の賃料等を補助。",
    "eligibility": [
      "県の指定創業支援施設の入居者"
    ],
    "industries": "all",
    "prefectures": [
      "大分県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和7年度回は2025年8月15日締切。令和8年度は最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.oita.jp/life/sub/6/22/72/"
  },
  {
    "id": "beppu-city-kaisha-setsuritsu-shien-hojo",
    "name": "別府市会社設立支援補助金",
    "provider": "別府市 産業政策課（産業振興）",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "登録免許税の一部（詳細な率・上限は要確認）",
    "summary": "特定創業支援等事業の証明を受けて市内で会社を設立した人に、登録免許税の一部を補助する制度。",
    "eligibility": [
      "特定創業支援等事業の証明を受けていること",
      "別府市内で会社を設立すること"
    ],
    "industries": "all",
    "prefectures": [
      "大分県"
    ],
    "cities": [
      "別府市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.beppu.oita.jp/sangyou/sangyousinkou/sougyou/sokusin.html"
  },
  {
    "id": "beppu-city-social-startup-seicho-shien",
    "name": "別府市ソーシャルスタートアップ成長支援事業",
    "provider": "別府市 産業政策課（産業振興）",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "要確認",
    "summary": "ふるさと納税を財源に、地域課題の解決に取り組むソーシャルスタートアップへ補助を行う制度。",
    "eligibility": [
      "地域課題の解決に取り組むスタートアップ（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "大分県"
    ],
    "cities": [
      "別府市"
    ],
    "stages": [
      "early"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.beppu.oita.jp/sangyou/sangyousinkou/sougyou/seichousien.html"
  },
  {
    "id": "oita-city-chinage-shoreikin",
    "name": "大分市中小企業等賃上げ奨励金",
    "provider": "大分市 商工労政課",
    "level": "municipality",
    "type": "給付金",
    "cat": "人材・雇用",
    "amount": "上限50万円/者",
    "summary": "令和8年1〜12月に賃金を引き上げた市内中小企業等に奨励金を交付する。",
    "eligibility": [
      "賃上げを行った市内の中小企業等"
    ],
    "industries": "all",
    "prefectures": [
      "大分県"
    ],
    "cities": [
      "大分市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "前期は9月30日で終了。後期は12月上旬〜令和9年1月29日の予定（先着順）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.oita.oita.jp/o154/baseup/shoreikin.html"
  },
  {
    "id": "oita-city-hanro-challenge",
    "name": "令和8年度大分市販路拡大チャレンジ補助金",
    "provider": "大分市 創業経営支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率1/2以内・上限50万円",
    "summary": "国内外への販路拡大に向けた新たな挑戦の経費を補助する。初回交付決定年度を含む3年度間利用可。",
    "eligibility": [
      "市内に事業所を持つ中小企業者（個人事業主含む）",
      "事業開始日の14日前までに申請"
    ],
    "industries": "all",
    "prefectures": [
      "大分県"
    ],
    "cities": [
      "大分市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月1日〜令和9年3月17日（予算がなくなり次第終了）",
    "deadline": "2027-03-17",
    "priority": 8,
    "url": "https://www.city.oita.oita.jp/o155/shigotosangyo/kigyoshien/challenge.html"
  },
  {
    "id": "oita-city-jigyo-shokei",
    "name": "令和8年度大分市中小企業者経営力強化促進補助金（事業承継等支援事業）",
    "provider": "大分市 創業経営支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "補助率2/3・上限50万円",
    "summary": "事業承継に向けた取組の費用を補助する。",
    "eligibility": [
      "市内の中小企業者",
      "事業開始日の14日前までに事前申請"
    ],
    "industries": "all",
    "prefectures": [
      "大分県"
    ],
    "cities": [
      "大分市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年4月1日〜令和9年3月17日（予算額に達するまで。期日は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.oita.oita.jp/o155/shigotosangyo/kigyoshien/jigyoshokei2025.html"
  },
  {
    "id": "oita-city-setsubi-toshi",
    "name": "令和8年度大分市中小企業者設備投資補助金",
    "provider": "大分市 創業経営支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/2。通常枠 上限150万円、脱炭素化促進枠 上限300万円",
    "summary": "生産事業の工程上必要な設備や省エネ設備の導入費用を補助する。",
    "eligibility": [
      "市内に事業所があり創業12か月以上の中小企業者",
      "市税を完納していること"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "大分県"
    ],
    "cities": [
      "大分市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年5月1日から予算上限に達するまで",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.oita.oita.jp/o155/shigotosangyo/shokogyo/setsubi2020_2nd.html"
  },
  {
    "id": "oita-city-shokibo-kyosoryoku",
    "name": "大分市小規模事業者競争力強化支援事業補助金（令和8年度）",
    "provider": "大分市 商工労政課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "DX推進枠 補助率2/3・上限40万円、一般枠 補助率1/2・上限30万円",
    "summary": "小規模事業者のDX対応など販路開拓・業務効率化の取組費用を補助する。事前エントリーが必要。",
    "eligibility": [
      "市内の小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "大分県"
    ],
    "cities": [
      "大分市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度前期・後期に募集（後期は抽選実施済み。次回は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.oita.oita.jp/o154/shigotosangyo/shokogyo/r8syokibo.html"
  },
  {
    "id": "oita-city-sogyosha-ouen",
    "name": "大分市創業者応援事業補助金（令和8年度）",
    "provider": "大分市 創業経営支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内（女性・若者・シニアは2/3以内）。上限額は要確認",
    "summary": "創業時の初期費用を補助する。事業所賃借料（月額賃料）などが対象経費に含まれる。",
    "eligibility": [
      "創業前または創業後5年未満の方"
    ],
    "industries": "all",
    "prefectures": [
      "大分県"
    ],
    "cities": [
      "大分市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度募集（受付期間は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.oita.oita.jp/o155/shigotosangyo/kigyoshien/sogyo5.html"
  },
  {
    "id": "miyazaki-fukugyo-jinzai",
    "name": "宮崎県副業・兼業人材活用促進事業補助金",
    "provider": "宮崎県 経営金融支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "プロフェッショナル人材を副業・兼業で活用する県内事業者を支援。",
    "eligibility": [
      "副業・兼業人材を活用する県内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.miyazaki.lg.jp/keieikinyushien/shigoto/chushokigyo/20200618170145.html"
  },
  {
    "id": "miyazaki-jigyo-shokei-hikitsugi",
    "name": "宮崎県事業承継・引継ぎ応援事業補助金",
    "provider": "宮崎県 経営金融支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "要確認",
    "summary": "事業承継・引継ぎに取り組む県内事業者を支援（事業期間2026年4月1日〜2027年3月31日）。",
    "eligibility": [
      "事業承継・引継ぎに取り組む県内事業者"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度。募集期間は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.miyazaki.lg.jp/keieikinyushien/shigoto/chushokigyo/20230703153447.html"
  },
  {
    "id": "miyazaki-kasegu-chikara",
    "name": "県内事業者の「稼ぐ力」強化支援事業費補助金",
    "provider": "宮崎県 商工政策課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率2/3以内、上限50万円または100万円",
    "summary": "県内の中小企業・小規模事業者の稼ぐ力強化の取組を支援。",
    "eligibility": [
      "県内の中小企業・小規模事業者"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は2026年5月7日〜5月29日で受付終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.miyazaki.lg.jp/shokoseisaku/press/2026/05/20260427095937.html"
  },
  {
    "id": "miyazaki-kigyo-challenge",
    "name": "女性・若者応援！起業チャレンジ支援事業費補助金",
    "provider": "宮崎県 商工政策課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率1/2以内、上限300万円（コンテスト枠）／100万円（地域魅力度アップ枠）",
    "summary": "女性・若者の起業を支援。ビジネスプランコンテストで採択者を決定。",
    "eligibility": [
      "県内で起業する女性・若者等"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度はコンテスト枠5/1〜6/15、地域枠6/1〜6/29で受付終了",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.miyazaki.lg.jp/shokoseisaku/shigoto/chushokigyo/20250422114116.html"
  },
  {
    "id": "miyazaki-sogyo-shinbunya-loan",
    "name": "宮崎県 創業・新分野進出支援貸付（創業）",
    "provider": "宮崎県 経営金融支援課／宮崎県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "設備・運転合計3,500万円まで、利率年1.1〜1.6%以内。女性・若者・シニア等は保証料0%",
    "summary": "創業者向けの県制度融資。担保不要、個人は原則保証人不要。",
    "eligibility": [
      "創業予定または創業間もない中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.miyazaki.lg.jp/keieikinyushien/shigoto/chushokigyo/3_1shinbunyashinsyutsu.html"
  },
  {
    "id": "miyakonojo-city-chusankan-shuten-shien-hojo",
    "name": "都城市中山間地域等出店支援事業費補助金",
    "provider": "都城市 商工政策課ほか",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/2以内など、上限額は費目により異なる（詳細は要確認）",
    "summary": "中山間地域等の空店舗のリノベーションや解体などの経費の一部を補助し、新規出店を支援する。市ページは令和7年度版、令和8年度の公募状況は要確認。",
    "eligibility": [
      "中山間地域等の空店舗等を活用して出店する事業者",
      "詳細要件は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [
      "都城市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "年度ごとに設定（最新の公募は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.miyakonojo.miyazaki.jp/soshiki/20/62225.html"
  },
  {
    "id": "miyakonojo-city-chusho-tokubetsu-yushi",
    "name": "都城市中小企業特別融資制度",
    "provider": "都城市 商工政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額1,000万円（利率等は要確認）",
    "summary": "市内の中小企業者・小規模企業者向けの市の融資制度。",
    "eligibility": [
      "市内の中小企業者・小規模企業者"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [
      "都城市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.miyakonojo.miyazaki.jp/soshiki/77/3647.html"
  },
  {
    "id": "miyakonojo-city-jigyo-shokei-ma-hojo",
    "name": "都城市事業承継及びM&A支援事業補助金",
    "provider": "都城市 商工政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "補助率2/3以内、上限60万円（1回限り）",
    "summary": "M&Aや役員・従業員承継を予定する市内中小企業者の着手段階の費用の一部を補助する。",
    "eligibility": [
      "市内の中小企業者",
      "M&Aまたは役員・従業員承継を予定していること"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [
      "都城市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.miyakonojo.miyazaki.jp/soshiki/77/48656.html"
  },
  {
    "id": "miyakonojo-city-shoko-shoene-setsubi-hojo",
    "name": "都城市商工業者等省エネルギー設備導入支援事業費補助金",
    "provider": "都城市 商工政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "対象経費の1/2以内、上限100万円（対象経費合計は税抜10万円以上）",
    "summary": "省エネルギー設備の導入でコスト削減に取り組む市内の商工業者へ設備費の一部を補助する。",
    "eligibility": [
      "市内に法人登記と事業所がある法人、または市内に住所・事業所がある個人事業者",
      "農林漁業の個人事業者・資本金10億円以上の大企業は対象外",
      "交付決定前に事業着手しないこと"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [
      "都城市"
    ],
    "stages": [
      "established"
    ],
    "period": "年度ごとに設定（令和8年10月1日から複数回申請可能となったとの掲載あり、最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.miyakonojo.miyazaki.jp/soshiki/77/62621.html"
  },
  {
    "id": "miyazaki-city-chusho-yushi",
    "name": "宮崎市中小企業融資制度（保証料補助）",
    "provider": "宮崎市 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "信用保証料のうち上限1.25%を市が補助。小規模企業者特別融資は限度額1,000万円・7年以内",
    "summary": "市の制度融資。保証協会に支払う保証料を市が補助する。",
    "eligibility": [
      "市内で事業を営む中小企業者",
      "市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [
      "宮崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（令和8年度版）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.miyazaki.miyazaki.jp/business/loan/53763.html"
  },
  {
    "id": "miyazaki-city-jigyo-baton",
    "name": "宮崎市事業バトンタッチ支援（引継ぎ準備支援補助金）",
    "provider": "宮崎市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "補助率2/3以内・上限60万円",
    "summary": "事業承継やM&Aを予定する譲渡側の市内中小企業が、専門事業者に依頼する費用を補助する。",
    "eligibility": [
      "事業承継・M&Aを予定する市内中小企業の譲渡側",
      "支援機関の支援を受けていること"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [
      "宮崎市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年4月1日〜10月30日（予算がなくなり次第終了）",
    "deadline": "2026-10-30",
    "priority": 8,
    "url": "https://www.city.miyazaki.miyazaki.jp/business/business_succession/411522.html"
  },
  {
    "id": "miyazaki-city-setsubi-support",
    "name": "成長応援！設備投資サポート事業（宮崎市）",
    "provider": "宮崎市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/2。小規模枠5万〜30万円、一般枠30万〜250万円、DX枠30万〜300万円",
    "summary": "労働生産性向上に資する設備投資（1単価10万円以上）を支援し、賃上げ環境づくりを進める。",
    "eligibility": [
      "市内に主たる事業所を持つ中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [
      "宮崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年6月1日開始。事業実施は令和8年12月15日まで（受付終了の可能性あり、要確認）",
    "deadline": "2026-12-15",
    "priority": 8,
    "url": "https://www.city.miyazaki.miyazaki.jp/business/loan/409734.html"
  },
  {
    "id": "miyazaki-city-sogyo-shikin",
    "name": "宮崎市創業支援資金融資制度",
    "provider": "宮崎市 産業政策課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資限度額1,500万円・10年以内。信用保証料を市が上限1.25%まで補助",
    "summary": "創業者向け低利融資で、必要な信用保証料の一部または全部を市が補助する。",
    "eligibility": [
      "市内で新たに事業を開始する方、または創業1年未満の中小企業者",
      "市税の滞納がないこと"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [
      "宮崎市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.miyazaki.miyazaki.jp/business/loan/53755.html"
  },
  {
    "id": "miyazaki-city-tokutei-ginou",
    "name": "宮崎市特定技能人材雇用促進事業補助金",
    "provider": "宮崎市",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "特定技能人材1名につき上限15万円（1事業者2名まで）",
    "summary": "特定技能人材を初めて雇用する事業者を補助する。",
    "eligibility": [
      "過去3年以内に特定技能人材の就労実績がない事業者"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [
      "宮崎市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "最新は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.miyazaki.miyazaki.jp/city/international_policy/398162.html"
  },
  {
    "id": "nobeoka-city-machinaka-akiten-taisaku-hojo",
    "name": "まちなか空き店舗対策補助金",
    "provider": "延岡市 産業政策課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "令和7年度第2回実績：家賃は月額の2/3以内（上限2万円）、改装費は2/3以内（上限70万円、重点地域は上限300万円）。令和8年度は要確認",
    "summary": "指定エリアの空き店舗を借りて新たに事業を始める人に家賃・改装費の一部を補助する。",
    "eligibility": [
      "指定する場所で新たに空き店舗等を賃借して事業を行う者",
      "自己所有の店舗で行う事業は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "宮崎県"
    ],
    "cities": [
      "延岡市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "年度内に複数回募集（令和8年度の募集時期は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.nobeoka.miyazaki.jp/soshiki/40/35191.html"
  },
  {
    "id": "kagoshima-chiiki-kadai-kigyo",
    "name": "かごしま地域課題解決型起業支援金",
    "provider": "鹿児島県 地域政策課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "起業経費の1/2以内、最大200万円",
    "summary": "デジタル技術を使い地域課題を解決する起業者に支援金と伴走支援。",
    "eligibility": [
      "令和8年4月1日以降に開業・法人設立する代表者",
      "デジタル技術で地域課題解決に取り組む"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度は5/25〜7/3で受付終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kagoshima.jp/af23/jinzai/kigyousien2026.html"
  },
  {
    "id": "kagoshima-chusho-dx",
    "name": "かごしま中小企業DX推進事業費補助金",
    "provider": "鹿児島県 産業立地・企業支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "上限400万円（補助率は要確認）",
    "summary": "県内中小企業のデジタル技術導入を支援。",
    "eligibility": [
      "県内中小企業"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は募集終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kagoshima.jp/af22/sangyo-rodo/2026_dx_hojokin.html"
  },
  {
    "id": "kagoshima-jigyo-shokei-kasokuka",
    "name": "鹿児島県中小企業事業承継加速化事業費補助金",
    "provider": "鹿児島県 商工政策課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "事業承継",
    "amount": "要確認",
    "summary": "第三者承継（M&A）による後継者確保や承継後の新規事業の取組を支援。",
    "eligibility": [
      "原則として事業承継後5年未満の県内中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [],
    "stages": [
      "established"
    ],
    "period": "令和8年度。補助対象期間は令和9年2月28日まで。募集期間は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kagoshima.jp/af02/jigyousyoukeikasokukar6.html"
  },
  {
    "id": "kagoshima-kasegu-chikara",
    "name": "かごしまの「稼ぐ力」加速化総合補助金",
    "provider": "鹿児島県 商工政策課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "補助率2/3以内（重点支援枠3/4以内）、上限100万円（重点支援枠300万円）",
    "summary": "展示会出展、販促、EC開設や認証取得、人材スキル習得を支援。個人事業主も対象。",
    "eligibility": [
      "県内に本店・主たる事務所を置く中小企業者（個人事業主含む）"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度2次募集は2026年10月5日で終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.kagoshima.jp/af02/r8kasegupower-total.html"
  },
  {
    "id": "kagoshima-sogyo-shien-shikin",
    "name": "鹿児島県 創業支援資金（県制度融資）",
    "provider": "鹿児島県 商工政策課／鹿児島県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "要確認（運転7年以内・設備10年以内の保証期間）",
    "summary": "商工団体の推薦または特定創業支援事業の支援を受けて創業する人向け県制度融資。",
    "eligibility": [
      "商工団体の推薦または特定創業支援事業の支援を受けて創業する方"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.kagoshima-cgc.or.jp/case/7178/"
  },
  {
    "id": "kagoshima-city-chiiki-kadai-business",
    "name": "令和8年度地域課題解決ビジネス支援事業補助金（鹿児島市）",
    "provider": "鹿児島市",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "補助率10/10。上限300万円（クラウドファンディング型）または750万円（企業版ふるさと納税）",
    "summary": "ふるさと納税の寄附を原資に、地域課題解決に取り組む事業者等を補助する。展示会出展、新規開発、システム導入等が対象。",
    "eligibility": [
      "地域課題解決を目指す中小企業者（市内に本店または住民登録のある個人事業主）",
      "起業家の成長を支援する団体"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "鹿児島市"
    ],
    "stages": [
      "planning",
      "early",
      "established"
    ],
    "period": "令和8年6月15日から受付（交付決定は9〜12月頃予定）。補助対象期間は令和9年3月31日まで",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kagoshima.lg.jp/san-sousyutu/sougyou-startupshien/chiikikadaikaiketubusinesshojyokinr8-2.html"
  },
  {
    "id": "kagoshima-city-ict-seisansei",
    "name": "令和8年度中小企業等生産性向上支援事業（ICT化）",
    "provider": "鹿児島市 産業支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "IT・デジタル",
    "amount": "補助率1/2以内・上限50万円（ハードウェアは上限10万円）",
    "summary": "専門家派遣で作成した導入計画に基づくICTツール導入費を補助する。国・県の補助を受ける事業は対象外。",
    "eligibility": [
      "市内の中小企業者・小規模事業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "鹿児島市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和9年2月26日まで",
    "deadline": "2027-02-26",
    "priority": 8,
    "url": "https://www.city.kagoshima.lg.jp/san-shien/syoukibo_ict.html"
  },
  {
    "id": "kagoshima-city-made-in-kagoshima",
    "name": "「メイドインかごしま」支援事業",
    "provider": "鹿児島市 産業支援課（ものづくり係）",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "補助率1/2以内（上限は支援内容により異なる、要確認）",
    "summary": "製造業者等の設備導入、経営力強化、新製品開発、販路開拓の経費を補助する。",
    "eligibility": [
      "市内の中小企業者（製造業者）等",
      "市税を滞納していないこと"
    ],
    "industries": [
      "manufacturing"
    ],
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "鹿児島市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度の募集期間は要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kagoshima.lg.jp/san-shien/sangyo/shokogyo/sezogyonado/meidoin2019.html"
  },
  {
    "id": "kagoshima-city-shinki-kaigyo-risoku",
    "name": "鹿児島市 新規開業支援利子補給制度",
    "provider": "鹿児島市 産業支援課（金融係）",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "融資実行後12か月以内の支払利子相当額を補助（上限30万円）。創業支援資金は限度額2,000万円",
    "summary": "市の創業支援資金を利用した事業者に、支払利子を補助する。令和8年度から申請時点で同一業種を市内で1年継続していることが条件。",
    "eligibility": [
      "市融資制度の創業支援資金を利用した事業者"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "鹿児島市"
    ],
    "stages": [
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kagoshima.lg.jp/san-shien/sangyo/shokogyo/yushi/shien.html"
  },
  {
    "id": "kagoshima-city-tenant-matching",
    "name": "創業者テナントマッチング事業（鹿児島市）",
    "provider": "鹿児島市 産業支援課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "補助率1/2以内。上限100万円（中心市街地の商店街区域内）、それ以外は50万円",
    "summary": "創業セミナー等修了者が中心市街地等の空き店舗で開業する際の内外装・空調・水回り等の整備費を補助する。",
    "eligibility": [
      "鹿児島市主催の創業セミナー等の修了者",
      "中心市街地または都市機能誘導区域の団地核の空き店舗へ新規出店"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "鹿児島市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "第3次募集 令和8年10月1日〜11月30日（予算に達し次第終了）",
    "deadline": "2026-11-30",
    "priority": 8,
    "url": "https://www.city.kagoshima.lg.jp/san-shien/sougyousyatenanto.html"
  },
  {
    "id": "kanoya-city-chusho-bukka-kotou-setsubi",
    "name": "鹿屋市中小企業等物価高騰対策支援事業（設備導入支援）",
    "provider": "鹿屋市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "設備投資・省エネ",
    "amount": "小規模事業者：2/3、上限50万円／中小企業者：1/2、上限100万円",
    "summary": "エネルギー・資材価格高騰の影響を受けた商工業者の生産性向上・省力化のための設備導入費を補助する。",
    "eligibility": [
      "市内に本社があること",
      "市税の滞納がないこと",
      "価格高騰の影響を受けた商工業者"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "鹿屋市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度に実施（受付期限は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kanoya.lg.jp/syoukoushinkou/bukkakoutoushienjigyou.html"
  },
  {
    "id": "kanoya-city-chusho-shikin-hoshoryo-hojo",
    "name": "鹿屋市中小企業資金保証料補助金",
    "provider": "鹿屋市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "信用保証料の1/2、上限年度30万円",
    "summary": "融資を受ける際に支払う信用保証料の一部を補助する制度。",
    "eligibility": [
      "鹿屋商工会議所またはかのや市商工会に加入している中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "鹿屋市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kanoya.lg.jp/syoukoushinkou/sangyo/shokogyo/hojokin/shikinhoshoryo.html"
  },
  {
    "id": "kanoya-city-shogakukin-henkan-shien-hojo",
    "name": "鹿屋市奨学金返還支援補助金",
    "provider": "鹿屋市 雇用関連担当",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "要確認",
    "summary": "従業員の奨学金を代理返還している市内事業所を支援し、人材確保と若年者の地元就職を促進する。",
    "eligibility": [
      "従業員の奨学金を代理返還している市内事業所"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "鹿屋市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kanoya.lg.jp/koyou/hozyokin/shougakukinhenkan.html"
  },
  {
    "id": "kanoya-city-shohin-kaihatsu-shien-hojo",
    "name": "鹿屋市商品開発支援事業補助金",
    "provider": "鹿屋市 商工振興課（市ページは産業系部署）",
    "level": "municipality",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "対象経費の1/2以内、上限30万円",
    "summary": "市内産の農林水産物を使った商品開発の経費を補助する。",
    "eligibility": [
      "市内で生産された農林水産物を使用した商品開発であること",
      "市内事業者（詳細は要確認）"
    ],
    "industries": [
      "food",
      "agriculture"
    ],
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "鹿屋市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.kanoya.lg.jp/syokunou/sangyo/shokogyo/6jisangyo/urerusyouhindukuri.html"
  },
  {
    "id": "kirishima-city-chusho-reisai-business-tenkai",
    "name": "霧島市中小零細企業ビジネス展開支援事業",
    "provider": "霧島市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "一般枠：1/2以内・上限20万円、創業枠：2/3以内または1/2以内・上限30万円（広報費は10万円まで）",
    "summary": "物価高騰対策として、市内中小零細企業の新規顧客開拓やデジタル化など生産性向上の取組経費を補助する。",
    "eligibility": [
      "市内の中小企業者・個人事業主",
      "創業枠は法人登記または開業届から4年未満",
      "霧島商工会議所または霧島市商工会の事前確認が必要"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "霧島市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は複数回募集（三次は8月下旬〜9月下旬頃の案内。現在の受付状況は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city-kirishima.jp/shoukoushinkou/machizukuri/shokogyo/hanrokaitaku/documents/r7tyuusyoureisaikigyobijines.html"
  },
  {
    "id": "kirishima-city-shokogyo-shikin-risihokyu",
    "name": "霧島市商工業資金利子補給補助金",
    "provider": "霧島市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "商工業者が融資を受けた際の利子の一部を市が補給する制度。",
    "eligibility": [
      "市内の商工業者（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "霧島市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city-kirishima.jp/shoukoushinkou/machizukuri/shokogyo/kigyousien/shoukougyou.html"
  },
  {
    "id": "kirishima-city-shotengai-kasseika-hojo",
    "name": "霧島市商店街活性化事業補助金",
    "provider": "霧島市 商工振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "要確認",
    "summary": "商店街の活性化に取り組む団体等の事業を支援する補助金。",
    "eligibility": [
      "商店街組織等（詳細は要確認）"
    ],
    "industries": [
      "retail"
    ],
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "霧島市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city-kirishima.jp/shoukoushinkou/machizukuri/shokogyo/shotengai/hojokin.html"
  },
  {
    "id": "okinawa-keiei-kakushin-hojo",
    "name": "沖縄県中小企業等経営革新強化支援事業費補助金",
    "provider": "沖縄県 中小企業支援課",
    "level": "prefecture",
    "type": "補助金",
    "cat": "研究開発・新事業",
    "amount": "要確認",
    "summary": "経営革新計画の承認を受けた事業者の販路開拓・新商品開発・新システム導入等を補助。",
    "eligibility": [
      "経営革新計画の承認を受けた中小企業者等"
    ],
    "industries": "all",
    "prefectures": [
      "沖縄県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度は2026年5月11日〜6月12日で受付終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.okinawa.lg.jp/shigoto/shien/1010056/1022723/1010107.html"
  },
  {
    "id": "okinawa-shokibo-taisaku-shikin",
    "name": "沖縄県 小規模企業対策資金（一般貸付）",
    "provider": "沖縄県 商工労働部",
    "level": "prefecture",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "設備・運転合計2,000万円以内",
    "summary": "小規模企業者向けの県制度融資（特別小口貸付もあり）。",
    "eligibility": [
      "従業員20名以下（商業・サービス業は5名以下）の小規模企業者"
    ],
    "industries": "all",
    "prefectures": [
      "沖縄県"
    ],
    "cities": [],
    "stages": [
      "early",
      "established"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.okinawa.jp/site/shoko/keiei/kinyu/syoukiboippann.html"
  },
  {
    "id": "okinawa-sogyosha-shien-kashitsuke",
    "name": "沖縄県 創業者・事業承継支援資金（創業者支援貸付）",
    "provider": "沖縄県 商工労働部／沖縄県信用保証協会",
    "level": "prefecture",
    "type": "融資",
    "cat": "創業・起業",
    "amount": "設備・運転合計2,000万円以内、返済10年以内、利率年2.10%（R8.4.1現在）",
    "summary": "独立・開業する人、創業後5年未満の人向けの県制度融資。経営者保証非提供の枠もあり。",
    "eligibility": [
      "創業前または創業後5年未満の方",
      "商工会・商工会議所で創業計画書の指導を受ける"
    ],
    "industries": "all",
    "prefectures": [
      "沖縄県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "通年（最新は要確認）",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.okinawa.jp/shigoto/shien/1010056/1022724/1010093.html"
  },
  {
    "id": "okinawa-startup-kigyo-shienkin",
    "name": "沖縄県スタートアップ起業支援金",
    "provider": "沖縄県 商工労働部",
    "level": "prefecture",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "人件費・事業費とも補助率1/2以内、上限200万円",
    "summary": "デジタル技術を活用して起業する人への支援金（第二期）。",
    "eligibility": [
      "令和8年4月1日以降に株式会社・合同会社を設立しその代表者となる者",
      "個人事業からの同一事業の法人化は対象外"
    ],
    "industries": "all",
    "prefectures": [
      "沖縄県"
    ],
    "cities": [],
    "stages": [
      "planning",
      "early"
    ],
    "period": "第二期は2026年7月24日〜8月19日で受付終了。次回は要確認",
    "deadline": null,
    "priority": 6,
    "url": "https://www.pref.okinawa.jp/shigoto/keizai/1009879/1010143/1021963.html"
  },
  {
    "id": "ginowan-city-tokusanhin-hanro-kakudai",
    "name": "宜野湾市特産品等販路拡大支援事業補助金",
    "provider": "宜野湾市 経済課",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "展示会参加費用の2/3。県内5万円以内・県外10万円以内（市長賞認定品の販路開拓費は上限20万円）",
    "summary": "市内の中小企業者が県内外の展示会等に特産品を出品する費用の一部を補助する。",
    "eligibility": [
      "市内で事業を営む中小企業者",
      "展示会等へ特産品を出品する事業",
      "市区町村税を完納していること"
    ],
    "industries": "all",
    "prefectures": [
      "沖縄県"
    ],
    "cities": [
      "宜野湾市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月15日〜令和9年3月31日（予算額に達し次第終了）",
    "deadline": "2027-03-31",
    "priority": 8,
    "url": "https://www.city.ginowan.lg.jp/soshiki/keizai/3/3/2/sienjouhou_1/5765.html"
  },
  {
    "id": "naha-city-ganbaru-machigwa",
    "name": "那覇市頑張るマチグヮー支援事業",
    "provider": "那覇市 商工振興グループ",
    "level": "municipality",
    "type": "補助金",
    "cat": "空き店舗・商店街",
    "amount": "要確認",
    "summary": "市内のマチグヮー（市場・商店街）の事業者を支援する令和8年度事業。",
    "eligibility": [
      "対象者・要件は要確認"
    ],
    "industries": [
      "retail",
      "food"
    ],
    "prefectures": [
      "沖縄県"
    ],
    "cities": [
      "那覇市"
    ],
    "stages": [
      "established"
    ],
    "period": "令和8年度（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.naha.okinawa.jp/business/sangyou/1003586/1003610.html"
  },
  {
    "id": "naha-city-hanro-kakudai",
    "name": "那覇市中小企業者販路拡大支援事業",
    "provider": "那覇市 商工振興グループ",
    "level": "municipality",
    "type": "補助金",
    "cat": "販路開拓・PR",
    "amount": "要確認（県外・海外の展示会等の参加費を助成）",
    "summary": "県外・海外の展示会、見本市、商談会、物産展などへの出展参加費を助成。",
    "eligibility": [
      "市内の中小企業者"
    ],
    "industries": "all",
    "prefectures": [
      "沖縄県"
    ],
    "cities": [
      "那覇市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年4月15日〜令和9年1月29日（予算に達し次第終了）",
    "deadline": "2027-01-29",
    "priority": 8,
    "url": "https://www.city.naha.okinawa.jp/business/kigyouricchi/1003642/1011678.html"
  },
  {
    "id": "naha-city-keiei-kiban",
    "name": "那覇市 市内企業経営基盤強化事業",
    "provider": "那覇市 商工振興グループ",
    "level": "municipality",
    "type": "専門家支援",
    "cat": "その他",
    "amount": "要確認（セミナーと専門家派遣）",
    "summary": "市内企業の経営課題に専門家を派遣し伴走支援する事業。",
    "eligibility": [
      "市内企業（詳細は要確認）"
    ],
    "industries": "all",
    "prefectures": [
      "沖縄県"
    ],
    "cities": [
      "那覇市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度（詳細は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.naha.okinawa.jp/business/kigyouricchi/kigyoushien/index.html"
  },
  {
    "id": "naha-city-koguchi-yushi",
    "name": "那覇市小口資金融資",
    "provider": "那覇市 商工振興グループ",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "限度額1,000万円・保証料率0.40〜0.80%（一般小口）",
    "summary": "市・金融機関・沖縄県信用保証協会が協力する小規模企業者向け事業資金融資。",
    "eligibility": [
      "市内の小規模企業者"
    ],
    "industries": "all",
    "prefectures": [
      "沖縄県"
    ],
    "cities": [
      "那覇市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "随時（最新は要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://city.naha.okinawa.jp/business/syoukougyou/yuusi/20191003091222209.html"
  },
  {
    "id": "naha-city-shakaikadai-kigyo",
    "name": "なはし社会地域課題解決型起業支援補助金",
    "provider": "那覇市 商工振興グループ",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "補助率2/3以内・上限100万円",
    "summary": "社会・地域課題の解決を目指す起業者等を支援する補助金。",
    "eligibility": [
      "社会課題・地域課題の解決を目指す起業者",
      "創業5年未満の事業者"
    ],
    "industries": "all",
    "prefectures": [
      "沖縄県"
    ],
    "cities": [
      "那覇市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "令和8年度公募は4月28日〜6月10日（受付終了。来年度は要確認）",
    "deadline": "2026-06-10",
    "priority": 8,
    "url": "https://www.city.naha.okinawa.jp/business/kigyoaogyo/socialbusiness_naha.html"
  },
  {
    "id": "okinawa-city-koguchi-yuushi",
    "name": "沖縄市小口資金融資制度",
    "provider": "沖縄市 商工振興課",
    "level": "municipality",
    "type": "融資",
    "cat": "融資・利子補給",
    "amount": "要確認",
    "summary": "市内の中小企業者・小規模企業者向けの市の融資制度。詳細条件は市へ照会が必要。",
    "eligibility": [
      "市内で継続して1年以上同一事業を営む中小企業者・小規模企業者",
      "詳細要件は要確認"
    ],
    "industries": "all",
    "prefectures": [
      "沖縄県"
    ],
    "cities": [
      "沖縄市"
    ],
    "stages": [
      "established"
    ],
    "period": "要確認",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.okinawa.okinawa.jp/k031/sangyou/kigyoushien/yuushi/590.html"
  },
  {
    "id": "okinawa-city-shimin-koyo-shoreikin",
    "name": "沖縄市民雇用奨励金（一般枠）",
    "provider": "沖縄市 企業誘致課",
    "level": "municipality",
    "type": "給付金",
    "cat": "人材・雇用",
    "amount": "沖縄市民1人の新規雇用につき10万円、1企業あたり上限1,000万円",
    "summary": "沖縄市民を新規雇用した事業者に奨励金を交付し、市内の雇用機会の拡大を促進する制度。",
    "eligibility": [
      "沖縄市民を新規雇用した事業者",
      "詳細要件は市の要項で要確認"
    ],
    "industries": "all",
    "prefectures": [
      "沖縄県"
    ],
    "cities": [
      "沖縄市"
    ],
    "stages": [
      "early",
      "established"
    ],
    "period": "令和8年度分の受付は終了。再募集時にページ更新予定（要確認）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.okinawa.okinawa.jp/k032-001/sangyou/shigoto/koyoutaisaku/3604236043.html"
  },
  {
    "id": "urasoe-city-sangyo-shinko-koyo-shien",
    "name": "浦添市産業振興補助金（雇用支援補助）",
    "provider": "浦添市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "人材・雇用",
    "amount": "1人あたり2万円、1事業所につき上限48万円",
    "summary": "浦添市民を新たに無期雇用し社会保険に加入させた事業者の、事業主負担の社会保険料等を補助する。",
    "eligibility": [
      "市内で事業所を新設した事業者",
      "浦添市民を新規に無期雇用し、雇用保険・健康保険・厚生年金に加入させた事業者"
    ],
    "industries": "all",
    "prefectures": [
      "沖縄県"
    ],
    "cities": [
      "浦添市"
    ],
    "stages": [
      "early"
    ],
    "period": "例年4月1日〜2月末頃（予算上限に達し次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.urasoe.lg.jp/doc/2026032700082"
  },
  {
    "id": "urasoe-city-sangyo-shinko-yachin-reform",
    "name": "浦添市産業振興補助金（家賃補助・空き店舗リフォーム補助）",
    "provider": "浦添市 産業振興課",
    "level": "municipality",
    "type": "補助金",
    "cat": "創業・起業",
    "amount": "家賃：補助率1/2以内、月額上限5万円〜10万円（雇用人数等による）。リフォーム補助は要確認",
    "summary": "市内で事業所を新設した（設置後3年以内の）事業者の賃借料やリフォーム費用の一部を補助する。",
    "eligibility": [
      "市内で事業所を新設または新設後3年以内の事業者",
      "詳細要件は令和8年度の交付規程で要確認"
    ],
    "industries": "all",
    "prefectures": [
      "沖縄県"
    ],
    "cities": [
      "浦添市"
    ],
    "stages": [
      "planning",
      "early"
    ],
    "period": "例年4月1日〜2月末頃（予算上限に達し次第終了）",
    "deadline": null,
    "priority": 8,
    "url": "https://www.city.urasoe.lg.jp/doc/2026032700082"
  },
];
