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
];
