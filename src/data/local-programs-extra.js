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
];
