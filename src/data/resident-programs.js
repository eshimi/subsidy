// 個人（住民）向けの、自治体の補助・助成。住まい・暮らしの制度を、都道府県・市区町村ごとに掲載する。
// 事業者向けの local-programs.js とは分けている（AIマッチなど、事業者向けの判定に混ざらないようにするため）。
// 公式の情報で確認できた内容だけを書く。金額・期限などが確認できないものは「要確認」とする。
// データは scripts/import-resident-batches.mjs で、調べた結果の JSON から取り込む（形式の検証つき）。

export const RESIDENT_CATEGORIES = ['耐震', '太陽光・蓄電池', 'EV・充電', '省エネ住宅', '空き家・ブロック塀', 'バリアフリー・介護', '子育て', '移住'];

export const RESIDENT_PROGRAMS = [
  {
    "id": "hokkaido-iju-shienkin",
    "name": "北海道 移住支援金（UIJターン新規就業支援事業）",
    "provider": "北海道 経済部労働政策局産業人材課",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "世帯100万円、単身60万円（18歳未満の世帯員を帯同する場合は1人につき最大100万円加算）",
    "summary": "東京23区在住者または通勤者が道内に移住し、マッチングサイトに掲載された対象法人に就業する場合に、道・国・市町村が共同で支給する。",
    "eligibility": [
      "東京23区に在住または通勤していたこと",
      "マッチングサイト掲載の対象法人に就業すること"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [],
    "period": "令和8年度（市町村への申請締切は令和9年1月20日、予算の範囲内）",
    "deadline": "2027-01-20",
    "url": "https://www.pref.hokkaido.lg.jp/kz/jzi/ui-turn/H31wakuwaku-iju-page.html"
  },
  {
    "id": "hokkaido-zerocarbon-sumai",
    "name": "住まいのゼロカーボン化推進事業",
    "provider": "北海道 建設部住宅局建築指導課",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認（道が補助する市町村を支援する仕組みで、実際の補助額は各市町村が定める）",
    "summary": "北方型住宅ZEROの新築取得、省エネ改修、太陽光パネル・蓄電池の導入に補助を出す市町村を、道が支援する事業。個人が受けるには実施市町村の制度を確認する必要がある。",
    "eligibility": [
      "実施している市町村の住民であること（詳細は要確認）"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [],
    "period": "令和8年度（実施市町村は要確認）",
    "deadline": null,
    "url": "https://www.pref.hokkaido.lg.jp/kn/ksd/159060.html"
  },
  {
    "id": "sapporo-eco-reform",
    "name": "札幌市 住宅エコリフォーム補助",
    "provider": "札幌市 都市局",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "省エネ改修やバリアフリー改修などを行う住宅リフォームへの補助。令和8年4月1日以降に工事契約したものが対象。",
    "eligibility": [
      "総工事費30万円以上などの条件あり",
      "昭和56年5月31日以前に建てられた住宅などに限られる（要確認）"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "札幌市"
    ],
    "period": "令和8年度：第1回5月22日〜6月4日、第2回は9月（詳細は要確認）",
    "deadline": null,
    "url": "https://www.city.sapporo.jp/toshi/jutaku/03reform/eco/documents/r8pannhuretto.pdf"
  },
  {
    "id": "sapporo-jutaku-pv-lease-ppa",
    "name": "住宅用太陽光発電設備導入（リース・PPA）補助金制度",
    "provider": "札幌市 環境局環境都市推進部環境エネルギー課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "要確認（補助分は事業者が契約料金から差し引く仕組み）",
    "summary": "初期費用がかからないリースやPPA契約で住宅に太陽光発電や蓄電池を導入する場合の補助。事業者が申請する。",
    "eligibility": [
      "リースまたはPPA契約で導入すること",
      "先着順（予算に達すると終了）"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "札幌市"
    ],
    "period": "2026年4月16日〜2027年1月29日",
    "deadline": "2027-01-29",
    "url": "https://www.city.sapporo.jp/kankyo/energy/zerohojo/zerohojo.html"
  },
  {
    "id": "sapporo-saiene-kiki",
    "name": "再エネ省エネ機器導入補助金制度",
    "provider": "札幌市 環境局環境都市推進部環境エネルギー課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光発電：1kWあたり2万円（上限13万9千円）／定置用蓄電池：1kWhあたり1万6千円（上限6万4千円、Q&Aページに異なる記載があり要確認）／エネファーム8万円／地中熱ヒートポンプ20万円／ペレットストーブ1台5万円",
    "summary": "住宅への太陽光発電、蓄電池、エネファーム、地中熱ヒートポンプ、ペレットストーブなどの導入費用を補助する。",
    "eligibility": [
      "2026年2月7日以降に設置が完了したもの",
      "太陽光・エネファームの申込には「札幌市エコエネクラブ」への入会が必要"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "札幌市"
    ],
    "period": "令和8年度（詳細な受付期間は要確認）",
    "deadline": null,
    "url": "https://www.city.sapporo.jp/kankyo/energy/hojo/kiki.html"
  },
  {
    "id": "sapporo-taishin-mokuzou-jokyaku",
    "name": "木造住宅の除却工事（解体工事）の費用補助",
    "provider": "札幌市 都市局",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "補助率23%以内（上限30万円）",
    "summary": "耐震診断で評点1.0未満と判定された旧耐震の木造住宅の解体費用を補助する。",
    "eligibility": [
      "耐震診断で評点1.0未満と判定された旧耐震の木造住宅"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "札幌市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.sapporo.jp/toshi/k-shido/taishin/mokuzoujokyaku.html"
  },
  {
    "id": "sapporo-taishin-mokuzou-kaishu",
    "name": "木造住宅耐震設計・耐震改修工事の費用補助",
    "provider": "札幌市 都市局",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修は上限140万円（段階改修は1段階目80万円、2段階目60万円）",
    "summary": "昭和56年5月31日以前に建築された在来軸組構法の住宅で、耐震診断の結果、上部構造評点が1.0未満のものの耐震設計・改修工事費を補助する。",
    "eligibility": [
      "昭和56年5月31日以前に建築された在来軸組構法の住宅など",
      "上部構造評点1.0未満と判定されたもの",
      "札幌市木造住宅耐震診断員が行う設計・工事"
    ],
    "prefectures": [
      "北海道"
    ],
    "cities": [
      "札幌市"
    ],
    "period": "令和8年度申込期間：2026年4月1日〜9月11日（受付終了）",
    "deadline": "2026-09-11",
    "url": "https://www.city.sapporo.jp/toshi/k-shido/taishin/mokuzou.html"
  },
  {
    "id": "aomori-iju-shien",
    "name": "あおもり移住支援事業",
    "provider": "青森県 こどもみらい部",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "単身60万円、世帯100万円",
    "summary": "東京圏から県内に移住して就業するなどの人に支給する移住支援金。",
    "eligibility": [
      "東京23区などに一定期間居住していたこと",
      "申請から3年未満に県外転出した場合は全額返還"
    ],
    "prefectures": [
      "青森県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.aomori.lg.jp/soshiki/kodomo/wakamono/ijyuusiennkinn.html"
  },
  {
    "id": "aomori-iryo-fukushi-kosodate-iju",
    "name": "青森県医療・福祉職子育て世帯移住支援金",
    "provider": "青森県 健康医療福祉部",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "基本額1世帯100万円（子育て加算などあり、詳細は要確認）",
    "summary": "医療・福祉職の資格を持つ子育て世帯が県内に移住する場合の支援金。",
    "eligibility": [
      "医療・福祉職の資格を持つ子育て世帯（詳細要件は要確認）"
    ],
    "prefectures": [
      "青森県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.aomori.lg.jp/soshiki/kenko/kkenkofu/aomori_iryohukusi_sienkin.html"
  },
  {
    "id": "aomori-taishin-hojoseido",
    "name": "住宅・建築物の耐震化（補助制度）",
    "provider": "青森県 県土整備部建築住宅課",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認（市町村ごとに異なる）",
    "summary": "国の住宅・建築物安全ストック形成事業を活用し、県内の一部市町村で木造住宅の耐震診断・耐震改修を補助する。",
    "eligibility": [
      "平成12年以前の旧耐震基準で建てられた住宅など",
      "実施市町村の住民"
    ],
    "prefectures": [
      "青森県"
    ],
    "cities": [],
    "period": "要確認（募集時期は市町村ごと）",
    "deadline": null,
    "url": "https://www.pref.aomori.lg.jp/soshiki/kendo/kenju/taisixn_hojoseido.html"
  },
  {
    "id": "aomori-city-atarashii-hatarakikata-iju",
    "name": "新しい働き方移住支援金",
    "provider": "青森市",
    "level": "municipality",
    "category": "移住",
    "type": "給付",
    "amount": "2人以上の世帯25万円、単身世帯15万円",
    "summary": "青森県外（東京23区外）に居住していた人が青森市へ移住する場合の支援金。",
    "eligibility": [
      "青森県外（東京23区外）に居住していたこと"
    ],
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "青森市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.aomori.aomori.jp/kurashi_kankyo/sumai/1002204/1002219/1002222.html"
  },
  {
    "id": "aomori-city-jikashohi-pv",
    "name": "青森市住宅用自家消費型太陽光発電設備等導入支援事業費補助金",
    "provider": "青森市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：1kWあたり5万円（上限25万円）／蓄電池：対象価格の3分の1（上限は1kWhあたり14.1万円）",
    "summary": "県が国の交付金に採択されたことを受け、住宅用の自家消費型太陽光発電設備と蓄電池の設置費用を補助する。",
    "eligibility": [
      "蓄電池は太陽光と併せての申請が必要",
      "市内の店舗・事業所での購入（ネット販売は対象外）",
      "PPA・リースは対象外"
    ],
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "青森市"
    ],
    "period": "2026年6月1日〜12月28日（予算に達し次第終了）、設置・支払いは2027年1月29日まで",
    "deadline": "2026-12-28",
    "url": "https://www.city.aomori.aomori.jp/kurashi_kankyo/kankyo/1002031/1010801.html"
  },
  {
    "id": "aomori-city-taishin-kaishu",
    "name": "木造住宅耐震改修補助事業",
    "provider": "青森市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "補助対象経費の23.0%以内かつ117万2千円以内",
    "summary": "旧耐震の木造住宅の耐震改修工事費を補助する。",
    "eligibility": [
      "平成12年5月31日以前に建築された住宅など"
    ],
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "青森市"
    ],
    "period": "募集期間：7月1日〜11月30日（確認できた年度は要確認、最新は要確認）",
    "deadline": null,
    "url": "https://www.city.aomori.aomori.jp/kurashi_kankyo/sumai/1002171/1002172/1002177.html"
  },
  {
    "id": "aomori-city-taishin-shindan",
    "name": "木造住宅耐震診断支援事業",
    "provider": "青森市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "旧耐震の木造住宅の耐震診断を支援する事業。",
    "eligibility": [
      "要確認"
    ],
    "prefectures": [
      "青森県"
    ],
    "cities": [
      "青森市"
    ],
    "period": "募集は7月1日から開始（年度は要確認）",
    "deadline": null,
    "url": "https://www.city.aomori.aomori.jp/kurashi_kankyo/sumai/1002171/1002172/1002176.html"
  },
  {
    "id": "iwate-otameshi-kyoju",
    "name": "いわてお試し居住体験事業",
    "provider": "岩手県 県土整備部",
    "level": "prefecture",
    "category": "移住",
    "type": "助成金",
    "amount": "要確認（家電付き県営住宅を低廉な家賃で貸し出し）",
    "summary": "県外からの移住定住希望者に、家電付きの県営住宅を低廉な家賃で貸し出す。",
    "eligibility": [
      "県外からの移住定住希望者"
    ],
    "prefectures": [
      "岩手県"
    ],
    "cities": [],
    "period": "令和8年度募集（詳細は要確認）",
    "deadline": null,
    "url": "https://www.pref.iwate.jp/kurashikankyou/kenchiku/kenei/1065217.html"
  },
  {
    "id": "iwate-shoene-kaishu",
    "name": "住まいの省エネルギー改修推進事業費補助金",
    "provider": "岩手県 県土整備部",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "省エネ基準：補助率4割（上限30万円/戸）／ZEH水準：補助率8割（上限70万円/戸）",
    "summary": "既存住宅の省エネ改修費を補助する、いわてZEH+住宅等普及促進事業のうち改修向け。",
    "eligibility": [
      "要確認"
    ],
    "prefectures": [
      "岩手県"
    ],
    "cities": [],
    "period": "確認できた年度は要確認（最新は要確認）",
    "deadline": null,
    "url": "https://www.pref.iwate.jp/kurashikankyou/kenchiku/kojin/hojo/1058930.html"
  },
  {
    "id": "iwate-shoene-shinchiku",
    "name": "いわて省エネルギー住宅建設推進事業費補助金（新築向け）",
    "provider": "岩手県 県土整備部",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "太陽光発電設備は定額で上限35万円（1kWあたり7万円、5kWまで）。HEMS・蓄電池も対象（金額は要確認）",
    "summary": "県内で省エネ性能の高い住宅を建設する人を支援する、いわてZEH+住宅等普及促進事業のうち新築向け。",
    "eligibility": [
      "県産木材の使用など複数の要件あり"
    ],
    "prefectures": [
      "岩手県"
    ],
    "cities": [],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "url": "https://www.pref.iwate.jp/kurashikankyou/kenchiku/kojin/hojo/1073811.html"
  },
  {
    "id": "morioka-akiya-kaishu",
    "name": "盛岡市空き家等改修事業補助金",
    "provider": "盛岡市 都市整備部都市計画課",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "基本額20万円＋加算（39歳以下または県外からの移住者30万円、子育て世帯10万円）、補助対象経費の2分の1が上限",
    "summary": "空き家等バンク登録物件を購入して改修する費用を補助する。",
    "eligibility": [
      "空き家等バンク登録物件の購入・改修"
    ],
    "prefectures": [
      "岩手県"
    ],
    "cities": [
      "盛岡市"
    ],
    "period": "令和8年度は受付を一時停止",
    "deadline": null,
    "url": "https://www.city.morioka.iwate.jp/kurashi/sumai/1042308.html"
  },
  {
    "id": "morioka-akiya-konyu",
    "name": "盛岡市空き家等購入費補助金",
    "provider": "盛岡市",
    "level": "municipality",
    "category": "移住",
    "type": "補助金",
    "amount": "要確認",
    "summary": "空き家等バンク登録物件の購入費を補助する。",
    "eligibility": [
      "空き家等バンク登録物件の購入"
    ],
    "prefectures": [
      "岩手県"
    ],
    "cities": [
      "盛岡市"
    ],
    "period": "令和8年度は受付を一時停止",
    "deadline": null,
    "url": "https://www.city.morioka.iwate.jp/kurashi/sumai/1019574.html"
  },
  {
    "id": "morioka-iju-shienkin",
    "name": "盛岡市移住支援金",
    "provider": "盛岡市",
    "level": "municipality",
    "category": "移住",
    "type": "給付",
    "amount": "単身60万円、世帯100万円（予算の範囲内）",
    "summary": "東京23区に在住または通勤していた人が盛岡市へ移住して就業・起業する場合の支援金。",
    "eligibility": [
      "東京23区での在住・通勤期間などの要件",
      "申請前の事前相談が必要"
    ],
    "prefectures": [
      "岩手県"
    ],
    "cities": [
      "盛岡市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.morioka.iwate.jp/jigyousha/koyo/1019954/1027067.html"
  },
  {
    "id": "morioka-jutaku-pv",
    "name": "盛岡市住宅用太陽光発電システム等設置費補助金",
    "provider": "盛岡市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光発電システム：1kWあたり1万4千円（上限5万6千円）",
    "summary": "住宅用太陽光発電システム等の設置費用を補助する。令和8年度は新築区分とHEMSの受付が終了、既築区分は先着順で受付。",
    "eligibility": [
      "要確認"
    ],
    "prefectures": [
      "岩手県"
    ],
    "cities": [
      "盛岡市"
    ],
    "period": "令和8年度（既築区分は先着順で受付）",
    "deadline": null,
    "url": "https://www.city.morioka.iwate.jp/kurashi/kankyo/kankyokatsudo/1034275.html"
  },
  {
    "id": "morioka-shoene-kaishu",
    "name": "盛岡市 住宅の省エネルギー改修等に関する補助金",
    "provider": "盛岡市",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "住宅の省エネ改修等への補助。",
    "eligibility": [
      "改修後の住宅が耐震基準を満たすこと",
      "昭和56年5月31日以前に建築した住宅は対象外となる場合あり"
    ],
    "prefectures": [
      "岩手県"
    ],
    "cities": [
      "盛岡市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.morioka.iwate.jp/kurashi/sumai/kenchikubutsu/1048026.html"
  },
  {
    "id": "miyagi-smart-energy-jutaku",
    "name": "スマートエネルギー住宅普及促進事業補助金",
    "provider": "宮城県 環境生活部（実施：宮城県建築住宅センター）",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "蓄電池4万円/件、V2H（住宅用外部給電機器）4万円/件、太陽光発電（蓄エネ設備併設）3万円/件",
    "summary": "住宅への蓄電池、V2H、太陽光発電システム（蓄エネ設備併設タイプ）の導入を補助する。",
    "eligibility": [
      "要確認（一次〜三次の募集ごとに設置時期が異なる）"
    ],
    "prefectures": [
      "宮城県"
    ],
    "cities": [],
    "period": "令和8年度（募集中と掲載、期限は要確認）",
    "deadline": null,
    "url": "https://www.pref.miyagi.jp/soshiki/kankyo-s/smart-energy.html"
  },
  {
    "id": "sendai-block-jokyaku",
    "name": "仙台市ブロック塀等除却工事補助金",
    "provider": "仙台市 都市整備局",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "除却工事費（税抜）と塀の長さ1mあたり8万円の額を比べて決まる（詳細は要確認）",
    "summary": "公道沿いの危険なブロック塀の除却工事費を補助する。",
    "eligibility": [
      "国道・県道・市道、小学校の指定通学路沿いのブロック塀",
      "市が危険と判定したもの"
    ],
    "prefectures": [
      "宮城県"
    ],
    "cities": [
      "仙台市"
    ],
    "period": "令和8年度",
    "deadline": null,
    "url": "https://www.city.sendai.jp/kenchikubosai/kurashi/anzen/saigaitaisaku/jishintsunami/taisaku/kofu.html"
  },
  {
    "id": "sendai-pv-kizon-kodate",
    "name": "太陽光発電等導入補助金（既存戸建住宅向け）",
    "provider": "仙台市 環境局",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光発電と蓄電池を同時導入する場合、定額30万円",
    "summary": "既存の戸建住宅に太陽光発電と蓄電池を同時に導入する費用を補助する。宮城県の補助金との併用可。",
    "eligibility": [
      "現行耐震基準（2000年基準）の住宅、または構造安全性があるもの",
      "国費を財源とする同種補助との併用不可"
    ],
    "prefectures": [
      "宮城県"
    ],
    "cities": [
      "仙台市"
    ],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.sendai.jp/ondanka/kodannetsu/kizonkodate.html"
  },
  {
    "id": "sendai-pv-shinchiku-kodate",
    "name": "太陽光発電等導入補助金（新築戸建住宅向け）",
    "provider": "仙台市 環境局",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "要確認（ZEH水準などを満たす住宅への太陽光・蓄電池の定額補助）",
    "summary": "新築戸建住宅に太陽光発電や蓄電池を導入する場合の補助。",
    "eligibility": [
      "ZEH水準などを満たす住宅（詳細は要確認）"
    ],
    "prefectures": [
      "宮城県"
    ],
    "cities": [
      "仙台市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.sendai.jp/ondanka/kodannetsu/sintikukodate.html"
  },
  {
    "id": "sendai-taishin-kaishu",
    "name": "戸建木造住宅耐震改修工事補助",
    "provider": "仙台市 都市整備局",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "対象工事費の5分の4（限度額115万円）",
    "summary": "昭和56年5月31日以前に建てられた2階建て以下の木造個人住宅の耐震改修費を補助する。",
    "eligibility": [
      "昭和56年5月31日以前に建てられた2階建て以下の木造個人住宅",
      "耐震診断で上部構造評点1.0未満など",
      "市税の滞納がないこと、契約・着手前の事前相談"
    ],
    "prefectures": [
      "宮城県"
    ],
    "cities": [
      "仙台市"
    ],
    "period": "確認できた年度：令和7年度（最新は要確認）",
    "deadline": null,
    "url": "https://www.city.sendai.jp/kenchikubosai/kurashi/anzen/saigaitaisaku/jishintsunami/taisaku/kodate/koji/"
  },
  {
    "id": "sendai-tokutei-akiya-jokyaku",
    "name": "仙台市特定空家等除却促進補助事業",
    "provider": "仙台市 市民局",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "対象経費の3分の1（上限50万円）",
    "summary": "倒壊のおそれがある特定空家等を解体して更地にする費用を補助する。",
    "eligibility": [
      "事前に市の判定を受けること",
      "交付決定前に着手しないこと"
    ],
    "prefectures": [
      "宮城県"
    ],
    "cities": [
      "仙台市"
    ],
    "period": "2026年5月11日〜12月28日（予算に達し次第終了）",
    "deadline": "2026-12-28",
    "url": "https://www.city.sendai.jp/shiminsekatsu/kurashi/anzen/anzen/akiya/jokyaku.html"
  },
  {
    "id": "sendai-v2h",
    "name": "家庭向けV2H充放電設備設置費補助金",
    "provider": "仙台市 環境局",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "補助対象経費の3分の1と上限20万円のいずれか低い方",
    "summary": "家庭向けV2H充放電設備の設置費用を補助する。",
    "eligibility": [
      "太陽光発電設備との連携が条件"
    ],
    "prefectures": [
      "宮城県"
    ],
    "cities": [
      "仙台市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.sendai.jp/kankyo/energyjiritsu/v2h.html"
  },
  {
    "id": "akita-iju-shienkin",
    "name": "秋田県 移住支援金",
    "provider": "秋田県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "最大100万円＋子育て世帯加算（詳細は要確認）",
    "summary": "東京圏から県内へ移住し、一定の要件を満たした人に支給する。",
    "eligibility": [
      "東京圏からの移住と就業などの要件"
    ],
    "prefectures": [
      "秋田県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.akita.lg.jp/pages/archive/56289"
  },
  {
    "id": "akita-reform-suishin",
    "name": "住宅リフォーム推進事業",
    "provider": "秋田県 建設部",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "防災減災改修：補助率2分の1（上限8万円）。他区分（子育て、移住・定住、断熱・省エネ）の金額は要確認",
    "summary": "子育て世帯、移住・定住世帯、断熱・省エネ改修、防災減災改修の区分でリフォーム費用を補助する。",
    "eligibility": [
      "区分ごとに要件あり（防災減災改修は工事費10万円以上）"
    ],
    "prefectures": [
      "秋田県"
    ],
    "cities": [],
    "period": "2026年4月1日〜2027年3月12日（予算がなくなり次第終了）",
    "deadline": "2027-03-12",
    "url": "https://www.pref.akita.lg.jp/pages/archive/94314"
  },
  {
    "id": "akita-city-akiya-teijuu",
    "name": "秋田市 空き家定住推進事業",
    "provider": "秋田市",
    "level": "municipality",
    "category": "移住",
    "type": "補助金",
    "amount": "移住者が購入する場合は上限100万円、賃借の場合は上限30万円",
    "summary": "移住者が空き家を購入または賃借する費用を補助する。",
    "eligibility": [
      "移住者であること",
      "国費や県の国費充当補助事業との併用不可",
      "門・塀などの外構工事は対象外"
    ],
    "prefectures": [
      "秋田県"
    ],
    "cities": [
      "秋田市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.akita.lg.jp/kurashi/sumai/1007487/1007789.html"
  },
  {
    "id": "akita-city-block-jokyaku",
    "name": "秋田市危険ブロック塀等除却支援事業",
    "provider": "秋田市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "除却工事費の3分の2（上限20万円）",
    "summary": "危険なブロック塀等の除却費用を補助する。",
    "eligibility": [
      "要確認"
    ],
    "prefectures": [
      "秋田県"
    ],
    "cities": [
      "秋田市"
    ],
    "period": "令和8年度の申請受付に関するページあり（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.akita.lg.jp/shisei/machizukuri/1011485/1007501/1019572.html"
  },
  {
    "id": "akita-city-rokyu-akiya-kaitai",
    "name": "老朽危険空き家解体撤去補助金",
    "provider": "秋田市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "費用の2分の1（上限50万円）",
    "summary": "特定空家等などに該当する老朽危険空き家の解体撤去費用を補助する。",
    "eligibility": [
      "特定空家等などに該当する空き家"
    ],
    "prefectures": [
      "秋田県"
    ],
    "cities": [
      "秋田市"
    ],
    "period": "補助対象空き家認定申請は受付終了（認定済みの交付申請は受付中）",
    "deadline": null,
    "url": "https://www.city.akita.lg.jp/kurashi/sumai/1007487/1041984.html"
  },
  {
    "id": "akita-city-taishin",
    "name": "秋田市木造住宅耐震改修等補助事業",
    "provider": "秋田市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "改修の補助上限：全体改修100万円、部分改修50万円",
    "summary": "木造住宅の耐震診断・耐震改修を支援する。",
    "eligibility": [
      "要確認"
    ],
    "prefectures": [
      "秋田県"
    ],
    "cities": [
      "秋田市"
    ],
    "period": "令和8年度の受付は終了",
    "deadline": null,
    "url": "https://www.city.akita.lg.jp/shisei/machizukuri/1011485/1007501/1007903.html"
  },
  {
    "id": "akita-city-tokyo-iju",
    "name": "東京圏移住支援事業補助金（社会人等向け支援事業）",
    "provider": "秋田市",
    "level": "municipality",
    "category": "移住",
    "type": "給付",
    "amount": "単身世帯60万円、2人以上の世帯100万円、18歳未満の子ども1人につき100万円を加算",
    "summary": "東京圏から秋田市へ移住した人への支援金。",
    "eligibility": [
      "東京圏からの移住と就業などの要件"
    ],
    "prefectures": [
      "秋田県"
    ],
    "cities": [
      "秋田市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.akita.lg.jp/iju-teiju/1012760/1020273.html"
  },
  {
    "id": "yamagata-shoene-kenko-shinchiku",
    "name": "やまがた省エネ健康住宅新築支援事業費補助金",
    "provider": "山形県 県土整備部建築住宅課",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "50万円（定額）",
    "summary": "県産木材を一定量使った省エネ住宅の新築・購入に補助する。募集戸数280戸。",
    "eligibility": [
      "所得1,200万円以下",
      "県産木材を一定量使用した省エネ健康住宅"
    ],
    "prefectures": [
      "山形県"
    ],
    "cities": [],
    "period": "令和8年度",
    "deadline": null,
    "url": "https://www.pref.yamagata.jp/180025/kurashi/sumai/jutakushien/r4rishihokyu_shinchiku.html"
  },
  {
    "id": "yamagata-shoene-saiene-package",
    "name": "やまがた省エネ健康住宅・再エネ設備パッケージ補助金",
    "provider": "山形県 県土整備部建築住宅課",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "最大約200万円（詳細は要確認）",
    "summary": "太陽光発電や蓄電池などを組み合わせ、年間の一次エネルギー収支がゼロになる住宅の新築を補助する。",
    "eligibility": [
      "年間の一次エネルギー収支がゼロになる住宅",
      "国の補助との併用不可の場合あり"
    ],
    "prefectures": [
      "山形県"
    ],
    "cities": [],
    "period": "令和8年度",
    "deadline": null,
    "url": "https://www.pref.yamagata.jp/180025/kurashi/sumai/paltuke-zihozyo/20220720.html"
  },
  {
    "id": "yamagata-city-hifit-pv",
    "name": "非FIT型太陽光発電設備導入事業費補助金",
    "provider": "山形市 環境課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：1kWあたり7万円（住宅向けは9kWで63万円が上限）／蓄電池：費用の3分の1（家庭用は上限5万円）",
    "summary": "自家消費型の太陽光発電設備、蓄電池、エネルギーマネジメントシステムの設置費用を補助する。",
    "eligibility": [
      "山形市内に住所を有し、市内の住宅等に新規設置する人",
      "蓄電池は太陽光発電と同時導入"
    ],
    "prefectures": [
      "山形県"
    ],
    "cities": [
      "山形市"
    ],
    "period": "確認できた年度は要確認（最新は要確認）。予算がなくなり次第終了",
    "deadline": null,
    "url": "https://www.city.yamagata-yamagata.lg.jp/kurashi/kankyohozen/1006528/1013800/1014661.html"
  },
  {
    "id": "yamagata-city-reform-sogo",
    "name": "山形市住宅リフォーム総合支援事業",
    "provider": "山形市",
    "level": "municipality",
    "category": "移住",
    "type": "補助金",
    "amount": "移住世帯・新婚世帯・子育て世帯向け区分：消費税抜き工事費の33%（上限30万円）",
    "summary": "住宅リフォーム費用の補助。移住世帯、新婚世帯、子育て世帯向けの区分がある。",
    "eligibility": [
      "移住世帯・新婚世帯・子育て世帯のいずれか（区分ごとに要件）"
    ],
    "prefectures": [
      "山形県"
    ],
    "cities": [
      "山形市"
    ],
    "period": "令和8年度",
    "deadline": null,
    "url": "https://www.city.yamagata-yamagata.lg.jp/kurashi/tochi/1007258/1003551.html"
  },
  {
    "id": "fukushima-12shichoson-iju",
    "name": "福島県12市町村移住支援金",
    "provider": "福島県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "世帯200万円、単身120万円",
    "summary": "避難指示の対象だった12市町村へ県外から移住する人への支援金。",
    "eligibility": [
      "県外から12市町村へ移住すること"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.fukushima.lg.jp/sec/11050a/fuku12-ijushienkin.html"
  },
  {
    "id": "fukushima-kite-fukushima",
    "name": "来て ふくしま 住宅取得支援事業",
    "provider": "福島県 土木部建築指導課",
    "level": "prefecture",
    "category": "移住",
    "type": "補助金",
    "amount": "取得費の2分の1、または市町村と県の合算額のいずれか低い方（県の加算額は最大30万円）",
    "summary": "県外から県内へ移住・定住するために住宅を取得する人に、県と市町村が補助する。",
    "eligibility": [
      "県外からの移住・定住",
      "昭和56年5月以前の戸建てを取得する場合は耐震診断を受けること"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.fukushima.lg.jp/sec/41065b/kitefukushima.html"
  },
  {
    "id": "fukushima-mokuzou-taishin",
    "name": "福島県木造住宅等耐震化支援事業",
    "provider": "福島県 土木部建築指導課",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "一般改修：工事費の5分の4（最大115万円）",
    "summary": "県が市町村と連携し、昭和56年以前の木造住宅の耐震診断・改修・ブロック塀の耐震化などを補助する。",
    "eligibility": [
      "昭和56年5月31日以前に着工した3階建て以下の木造住宅",
      "実施市町村の住民"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [],
    "period": "要確認（令和7年度の実施市町村ページあり）",
    "deadline": null,
    "url": "https://www.pref.fukushima.lg.jp/sec/41065b/mokuzoutaisinkasiennjigyou.html"
  },
  {
    "id": "fukushima-tasedai-doukyo",
    "name": "多世代同居・近居推進事業",
    "provider": "福島県 土木部建築指導課",
    "level": "prefecture",
    "category": "子育て",
    "type": "補助金",
    "amount": "要確認（県外からの移住世帯には加算あり）",
    "summary": "子育て世帯が新たに同居・近居を始めるための住宅取得に補助する。",
    "eligibility": [
      "子育て世帯の同居・近居"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [],
    "period": "確認できた年度：令和7年度（募集終了、最新は要確認）",
    "deadline": null,
    "url": "https://www.pref.fukushima.lg.jp/sec/41065b/tasedaidoukyokinnkyo.html"
  },
  {
    "id": "fukushima-city-akiya-kaitai",
    "name": "空き家解体補助",
    "provider": "福島市 住宅政策課",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "費用の5分の4（上限150万円との記載。古いページでは170万円の記載もあり要確認）",
    "summary": "特定空家等などの解体費用を補助する。",
    "eligibility": [
      "特定空家等など（詳細は要確認）"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "福島市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.fukushima.fukushima.jp/soshiki/12/1059/4/2/4749.html"
  },
  {
    "id": "fukushima-city-akiya-reform",
    "name": "空き家リフォーム補助",
    "provider": "福島市 住宅政策課",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "2分の1以内（最大150万円）",
    "summary": "市内の空き家を購入した個人が行う改修を補助する。",
    "eligibility": [
      "市内の空き家を購入した個人"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "福島市"
    ],
    "period": "2026年5月1日〜2027年1月29日（予算上限到達で終了）",
    "deadline": "2027-01-29",
    "url": "https://www.city.fukushima.fukushima.jp/soshiki/12/1059/4/2/4750.html"
  },
  {
    "id": "fukushima-city-datsutanso-jutaku",
    "name": "脱炭素住宅整備助成事業",
    "provider": "福島市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：5万円（定額）／蓄電池：1kWhあたり1万円（上限10万円）。ふくしまZEH等の新築助成は金額要確認",
    "summary": "住宅への太陽光発電や蓄電池などの導入を助成する。",
    "eligibility": [
      "要確認"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "福島市"
    ],
    "period": "令和8年度：2026年4月6日から申請受付",
    "deadline": null,
    "url": "https://www.city.fukushima.fukushima.jp/soshiki/8/1034/1/12521.html"
  },
  {
    "id": "fukushima-city-taishin-hojo",
    "name": "福島市 木造住宅耐震改修・耐震シェルター補助（住まいに関する補助制度）",
    "provider": "福島市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修：工事費の5分の4以内（最大69万円〜115万円）／耐震シェルター：設置費の5分の4以内（最大30万円）",
    "summary": "木造住宅の耐震改修や耐震シェルター設置を補助する。耐震診断は受付終了と表示。",
    "eligibility": [
      "旧耐震の木造住宅（詳細は要確認）"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "福島市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.fukushima.fukushima.jp/soshiki/12/1064/1/4736.html"
  },
  {
    "id": "koriyama-koreisha-sumai",
    "name": "高齢者にやさしい住まいづくり助成事業",
    "provider": "郡山市",
    "level": "municipality",
    "category": "バリアフリー・介護",
    "type": "助成金",
    "amount": "要確認",
    "summary": "高齢者に配慮した住まいづくり（住宅改修）の助成。",
    "eligibility": [
      "要確認"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "郡山市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.koriyama.lg.jp/soshiki/66/2994.html"
  },
  {
    "id": "koriyama-mokuzou-taishin-kaishu",
    "name": "郡山市木造住宅耐震改修助成制度",
    "provider": "郡山市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "工事費の5分の4（一般改修上限115万円、簡易改修上限69万円）",
    "summary": "昭和56年5月31日以前に着工された木造住宅で、耐震診断で基準不適合とされたものの耐震改修を助成する。",
    "eligibility": [
      "昭和56年5月31日以前に着工した木造住宅",
      "耐震診断で基準不適合"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "郡山市"
    ],
    "period": "令和8年度受付：5月11日〜5月29日（終了、募集5件程度・抽選）",
    "deadline": "2026-05-29",
    "url": "https://www.city.koriyama.lg.jp/soshiki/133/178732.html"
  },
  {
    "id": "koriyama-zerocarbon-suishin",
    "name": "郡山市ゼロカーボン推進事業補助金",
    "provider": "郡山市 環境政策課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "蓄電池（太陽光とセット）上限13万円、蓄電池のみ上限10万円、エネファーム上限5万円、V2H上限5万円、エコキュート上限3万円",
    "summary": "家庭用定置型蓄電池、家庭用燃料電池、V2H、ヒートポンプ給湯機などの設置費用を補助する。設置後の申請。",
    "eligibility": [
      "市内に住民登録があること",
      "賃貸住宅への設置、市税滞納者は対象外",
      "太陽光とセットの場合、パネル出力2kW以上"
    ],
    "prefectures": [
      "福島県"
    ],
    "cities": [
      "郡山市"
    ],
    "period": "補助対象期間：2026年1月1日〜2027年2月28日",
    "deadline": "2027-02-28",
    "url": "https://www.city.koriyama.lg.jp/soshiki/54/2443.html"
  },
  {
    "id": "mito-jutaku-taiyoko",
    "name": "令和8年度住宅用太陽光発電システム設置補助制度",
    "provider": "水戸市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "最大5万円",
    "summary": "住宅への太陽光発電システム設置の補助。",
    "eligibility": [
      "パワーコンディショナー出力が10kW未満"
    ],
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "水戸市"
    ],
    "period": "令和8年度",
    "deadline": null,
    "url": "https://www.city.mito.lg.jp/site/ondanka/69504.html"
  },
  {
    "id": "mito-mokuzo-taishin-kaishu",
    "name": "水戸市木造住宅耐震改修費補助",
    "provider": "水戸市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "設計費の1/2（上限10万円）、工事費の23%（上限50万円）、設計と工事を一体で行う場合は工事費の4/5（上限115万円）",
    "summary": "木造住宅の耐震改修費用の補助。",
    "eligibility": [],
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "水戸市"
    ],
    "period": "令和8年4月1日～11月30日（予算なくなり次第終了）",
    "deadline": "2026-11-30",
    "url": "https://www.city.mito.lg.jp/page/47264.html"
  },
  {
    "id": "mito-v2h",
    "name": "令和8年度水戸市電気自動車等充給電設備（V2Hシステム）設置補助制度",
    "provider": "水戸市",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "要確認",
    "summary": "V2Hシステム設置の補助。予算上限に達し受付終了。",
    "eligibility": [],
    "prefectures": [
      "茨城県"
    ],
    "cities": [
      "水戸市"
    ],
    "period": "受付終了（令和8年度）",
    "deadline": null,
    "url": "https://www.city.mito.lg.jp/site/ondanka/96177.html"
  },
  {
    "id": "tochigi-kojin-taiyoko-chikudenchi",
    "name": "個人住宅用太陽光発電設備等導入支援事業",
    "provider": "栃木県",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：7万円/kW（上限28万円）、蓄電池：補助対象経費の1/3（上限25万8千円）",
    "summary": "太陽光発電と蓄電池を新たに一体で導入する個人への補助。",
    "eligibility": [
      "太陽光と蓄電池を新たに一体で導入する個人",
      "蓄電池のみの導入は対象外"
    ],
    "prefectures": [
      "栃木県"
    ],
    "cities": [],
    "period": "令和8年5月11日～10月30日（先着順・予算2億6900万円）",
    "deadline": "2026-10-30",
    "url": "https://www.pref.tochigi.lg.jp/d02/kouhou/kozinzyutakutaiyoukouhozyo.html"
  },
  {
    "id": "tochigi-zero-energy-house",
    "name": "ゼロエネルギー住宅導入支援事業",
    "provider": "栃木県",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "ゼロエネルギー住宅（ZEH）の導入を支援する県の事業。",
    "eligibility": [],
    "prefectures": [
      "栃木県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.tochigi.lg.jp/d02/kouhou/zero-energy-house-subsidy.html"
  },
  {
    "id": "gunma-jutaku-solar-yushi",
    "name": "住宅用太陽光発電設備等導入資金融資",
    "provider": "群馬県 グリーンイノベーション推進課",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "融資",
    "amount": "年1.2%（県内金融機関経由）、融資枠6億円（令和8年度案）",
    "summary": "住宅用太陽光発電設備・蓄電池等の導入資金の低利融資。",
    "eligibility": [],
    "prefectures": [
      "群馬県"
    ],
    "cities": [],
    "period": "令和8年度（詳細は要確認）",
    "deadline": null,
    "url": "https://www.pref.gunma.jp/page/5739.html"
  },
  {
    "id": "gunma-r8-saien-taiyoko-chikudenchi",
    "name": "令和8年度 個人住宅向け再エネ導入支援補助制度（太陽光・蓄電池）",
    "provider": "群馬県 グリーンイノベーション推進課",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：1世帯あたり7万円、蓄電池：費用の1/3（上限4.7万円/kWh、令和8年2月時点の案）",
    "summary": "個人住宅への太陽光発電設備・蓄電池の導入費用の一部を補助。交付申請の受付は終了。",
    "eligibility": [
      "同年度の国の補助対象設備との併用は不可"
    ],
    "prefectures": [
      "群馬県"
    ],
    "cities": [],
    "period": "受付終了（交付申請締切：令和8年7月20日）",
    "deadline": "2026-07-20",
    "url": "https://www.pref.gunma.jp/page/753198.html"
  },
  {
    "id": "maebashi-akiya-taisaku",
    "name": "令和8年度前橋市空き家対策補助金",
    "provider": "前橋市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "要確認",
    "summary": "空き家活用リフォーム補助と老朽空き家解体補助。いずれも予算上限に達し新規受付終了。",
    "eligibility": [],
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "前橋市"
    ],
    "period": "受付終了（令和8年度）",
    "deadline": null,
    "url": "https://www.city.maebashi.gunma.jp/soshiki/toshikeikakubu/kenchikujutaku/gyomu/2/1/48337.html"
  },
  {
    "id": "maebashi-mokuzo-taishin",
    "name": "令和8年度木造住宅耐震改修費等補助事業",
    "provider": "前橋市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "耐震診断の結果、現行基準に適合しない自己所有住宅の耐震改修等を行う個人への補助。",
    "eligibility": [
      "耐震診断者派遣による診断で基準に不適合"
    ],
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "前橋市"
    ],
    "period": "令和8年度",
    "deadline": null,
    "url": "https://www.city.maebashi.gunma.jp/6/49119.html"
  },
  {
    "id": "maebashi-zerocarbon-katei",
    "name": "令和8年度前橋市家庭用ゼロカーボン推進補助事業",
    "provider": "前橋市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：3万円、定置用蓄電池：1kWhあたり1万円（上限5万円）",
    "summary": "家庭への太陽光発電設備・蓄電池設置の補助。",
    "eligibility": [
      "自宅に設置する1kW以上10kW未満の設備"
    ],
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "前橋市"
    ],
    "period": "令和8年度（ページ表示は受付中、現在の状況は要確認）",
    "deadline": null,
    "url": "https://www.city.maebashi.gunma.jp/soshiki/kankyo/kankyoseisaku/gyomu/1_2/23240.html"
  },
  {
    "id": "takasaki-akiya-kinkyu-taisaku",
    "name": "高崎市空き家緊急総合対策",
    "provider": "高崎市 建築住宅課",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "管理助成：費用の1/2。他は要確認",
    "summary": "空き家の管理・解体・活用の助成。解体助成は予算到達と案内。",
    "eligibility": [],
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "高崎市"
    ],
    "period": "申請受付：4月15日から（令和8年度）",
    "deadline": null,
    "url": "https://www.city.takasaki.gunma.jp/page/3293.html"
  },
  {
    "id": "takasaki-hei-jokyaku-kaishu",
    "name": "高崎市塀除却・改修工事補助",
    "provider": "高崎市 建築指導課",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "塀の除却：一律2万円、築造工事：費用の1/2（上限あり）",
    "summary": "道路沿いの劣化した塀の除却・改修工事の補助。",
    "eligibility": [
      "道路沿いで高さ0.8m以上かつ延長5m以上の劣化した塀"
    ],
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "高崎市"
    ],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.takasaki.gunma.jp/page/6033.html"
  },
  {
    "id": "takasaki-jutaku-taiyoko",
    "name": "令和8年度住宅用太陽光発電システム導入補助制度",
    "provider": "高崎市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "1kWあたり8千円、上限4万円（蓄電池・V2Hの補助はなし）",
    "summary": "住宅への太陽光発電システム導入の補助。",
    "eligibility": [],
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "高崎市"
    ],
    "period": "令和8年7月1日～令和9年3月31日（予算額に達し次第終了）",
    "deadline": "2027-03-31",
    "url": "https://www.city.takasaki.gunma.jp/page/6849.html"
  },
  {
    "id": "takasaki-kinkyu-taishin",
    "name": "高崎市緊急耐震対策事業（耐震補助金）",
    "provider": "高崎市 建築指導課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "耐震診断・補強設計・耐震改修工事・耐震除却工事の補助。",
    "eligibility": [],
    "prefectures": [
      "群馬県"
    ],
    "cities": [
      "高崎市"
    ],
    "period": "令和8年5月11日～11月30日",
    "deadline": "2026-11-30",
    "url": "https://www.city.takasaki.gunma.jp/page/3291.html"
  },
  {
    "id": "saitama-katei-shoene-saiene",
    "name": "家庭における省エネ・再エネ活用設備導入補助金",
    "provider": "埼玉県 環境部温暖化対策課",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光7万円/kW（上限35万円）、太陽熱利用は経費の2/3（上限20万円）、蓄電池10万円/件、エネファーム5万円/件",
    "summary": "既存住宅への太陽光・太陽熱・蓄電池・エネファーム導入費用の補助。太陽光・太陽熱は受付終了、蓄電池・エネファームは受付中（8月5日掲載時点）。",
    "eligibility": [
      "蓄電池は太陽光発電設備の設置が必要（同時設置可）",
      "県の認定事業者との契約"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [],
    "period": "令和8年5月18日～令和9年1月29日（先着順）",
    "deadline": "2027-01-29",
    "url": "https://www.pref.saitama.lg.jp/a0503/hojyokin2.html"
  },
  {
    "id": "kawagoe-block-hei",
    "name": "川越市ブロック塀等撤去費補助",
    "provider": "川越市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "撤去費用又は1㎡あたり1万3千円で算出した額のいずれか少ない額の1/2、上限10万円",
    "summary": "ブロック塀等の撤去費用の補助。",
    "eligibility": [
      "契約前の申請が必要"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川越市"
    ],
    "period": "令和8年4月1日～12月下旬（先着順）",
    "deadline": null,
    "url": "https://www.city.kawagoe.saitama.jp/shisei/toshikei/1010554/1010750/1010774/1010782/1010784.html"
  },
  {
    "id": "kawagoe-jutaku-datsutanso",
    "name": "令和8年度川越市住宅用脱炭素化設備等導入奨励金",
    "provider": "川越市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光（既存住宅・3kW以上）：定額3万円（蓄電池又はV2Hの同時設置が条件）",
    "summary": "住宅への太陽光発電と蓄電池・V2H導入の奨励金。",
    "eligibility": [
      "蓄電池・V2H単独は不可",
      "全量売電の太陽光は対象外"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川越市"
    ],
    "period": "令和8年度前期（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.kawagoe.saitama.jp/kurashi/kankyo/1002642/1002702/1020760.html"
  },
  {
    "id": "kawagoe-jutaku-kaishu",
    "name": "令和8年度川越市住宅改修補助金制度",
    "provider": "川越市",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "改修工事費（税抜）の5%、上限5万円",
    "summary": "住宅改修工事費の補助。",
    "eligibility": [
      "市内に本店があり要件を満たす事業者の施工"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川越市"
    ],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.kawagoe.saitama.jp/kurashi/jyutaku/1003030.html"
  },
  {
    "id": "kawaguchi-block-hei",
    "name": "川口市既存ブロック塀等安全対策補助事業",
    "provider": "川口市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "要確認",
    "summary": "通学路に面した危険なブロック塀等の撤去・改修費の補助。",
    "eligibility": [],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川口市"
    ],
    "period": "令和8年度受付開始済み（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.kawaguchi.lg.jp/soshiki/01130/060/2/25716.html"
  },
  {
    "id": "kawaguchi-jutaku-reform",
    "name": "令和8年度川口市住宅リフォーム補助金",
    "provider": "川口市",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "住宅リフォームの補助（蓄電池の購入・附帯工事も対象）。",
    "eligibility": [
      "昭和56年6月1日以降の建築、又はそれ以前で耐震基準への適合が確認できる住宅"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川口市"
    ],
    "period": "令和8年度",
    "deadline": null,
    "url": "https://www.city.kawaguchi.lg.jp/soshiki/01130/040/2_2/48993.html"
  },
  {
    "id": "kawaguchi-ondanka-shienkin",
    "name": "令和8年度 川口市地球温暖化対策活動支援金",
    "provider": "川口市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "蓄電池：設置費の1/2、上限16万円（市内業者）又は8万円（それ以外）。太陽光は要確認",
    "summary": "太陽光発電システム・定置用リチウムイオン蓄電池等の設置の支援金。",
    "eligibility": [
      "ZEH支援事業の補助対象機器であること",
      "引渡日が令和8年3月1日以降"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川口市"
    ],
    "period": "令和8年度（予算6,118万円）",
    "deadline": null,
    "url": "https://www.city.kawaguchi.lg.jp/soshiki/01100/010/2/1/34382.html"
  },
  {
    "id": "kawaguchi-taishin-kaishu",
    "name": "川口市住宅の耐震改修補助金",
    "provider": "川口市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "戸建て：改修費の23%相当額、上限60万円",
    "summary": "住宅の耐震改修費の補助。",
    "eligibility": [
      "改修後の上部構造評点が基準を満たすこと"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川口市"
    ],
    "period": "令和8年度新規受付中",
    "deadline": null,
    "url": "https://www.city.kawaguchi.lg.jp/soshiki/01130/060/2/5446.html"
  },
  {
    "id": "kawaguchi-taishin-shindan",
    "name": "川口市住宅の耐震診断補助金",
    "provider": "川口市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "戸建て：診断費用の2/3、上限6万5千円",
    "summary": "住宅の耐震診断費の補助。",
    "eligibility": [
      "原則として平成12年5月31日以前に建築された住宅"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "川口市"
    ],
    "period": "令和8年度新規受付中",
    "deadline": null,
    "url": "https://www.city.kawaguchi.lg.jp/soshiki/01130/060/2/2236.html"
  },
  {
    "id": "saitama-city-block-hei",
    "name": "さいたま市既存ブロック塀等改善事業助成",
    "provider": "さいたま市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "助成金",
    "amount": "費用の合計と単価表による額のいずれか低い方の2/3、上限30万円",
    "summary": "道路に面したブロック塀等の除却・建替え工事費の助成。",
    "eligibility": [
      "高さ80cm超で、道路側から見て境界までの距離より高いブロック塀等"
    ],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "さいたま市"
    ],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.saitama.lg.jp/001/154/007/002/p063311.html"
  },
  {
    "id": "saitama-city-ev-v2h",
    "name": "令和8年度さいたま市電気自動車等普及促進対策補助金",
    "provider": "さいたま市",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "EV（普通車）上限5万円、EV（軽・小型）3万円、燃料電池自動車50万円、V2H充放電機器10万円（PHEVは対象外）",
    "summary": "電気自動車・燃料電池自動車・V2H充放電機器の導入費用の補助。",
    "eligibility": [],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "さいたま市"
    ],
    "period": "交付決定日～令和9年3月26日（予算到達で終了。10月5日時点で執行率70%）",
    "deadline": "2027-03-26",
    "url": "https://www.city.saitama.lg.jp/001/009/015/e-kizuna/juyou/p065260.html"
  },
  {
    "id": "saitama-city-shoene-dannetsu",
    "name": "令和8年度 省エネ・断熱住宅普及促進補助金",
    "provider": "さいたま市",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "省エネ・断熱住宅の普及を促進する補助。交付申請の受付は終了。",
    "eligibility": [],
    "prefectures": [
      "埼玉県"
    ],
    "cities": [
      "さいたま市"
    ],
    "period": "受付終了（令和8年度）",
    "deadline": null,
    "url": "https://www.city.saitama.lg.jp/001/009/015/010/002/p119491.html"
  },
  {
    "id": "chiba-pref-jutaku-lease-ppa",
    "name": "千葉県住宅用太陽光発電設備等に係るリース等導入促進事業補助金",
    "provider": "千葉県",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：出力1kWあたり7万円（10kW未満）、蓄電池：一律12万円",
    "summary": "住宅に初期費用なしで太陽光・蓄電池をリース又はPPAで導入するプランの費用を引き下げる補助。事業者向けの交付申請。",
    "eligibility": [
      "居住用家屋への設置",
      "太陽光は10kW未満"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [],
    "period": "令和8年6月26日～12月18日（予算なくなり次第終了）",
    "deadline": "2026-12-18",
    "url": "https://www.pref.chiba.lg.jp/ontai/hojo/solarpowerhojo.html"
  },
  {
    "id": "chiba-pref-zeh",
    "name": "令和8年度千葉県ネット・ゼロ・エネルギー・ハウス導入促進事業補助金",
    "provider": "千葉県",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "ZEH：50万円、ZEH+：100万円",
    "summary": "県内の中小工務店が施工したZEH認定の県内住宅を取得する県民への補助。",
    "eligibility": [
      "県内中小工務店が施工したZEH認定の県内住宅の取得"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [],
    "period": "令和8年度（申請額が予算の50%に到達：8月31日時点）",
    "deadline": null,
    "url": "https://www.pref.chiba.lg.jp/ontai/hojo/zehpromotion.html"
  },
  {
    "id": "chiba-city-ev-v2h",
    "name": "千葉市電気自動車・プラグインハイブリッド自動車・V2H導入補助金",
    "provider": "千葉市",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "EV・PHV：太陽光併設10万円、太陽光とV2H併設15万円。V2H単体は経費の1/10（最大25万円）",
    "summary": "電気自動車等・V2H充放電設備の購入費用の補助。",
    "eligibility": [
      "住宅用太陽光発電設備の併設"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "千葉市"
    ],
    "period": "令和8年5月1日～令和9年1月29日（先着順）",
    "deadline": "2027-01-29",
    "url": "https://www.city.chiba.jp/kankyo/kankyohozen/datsutanso/ev_hojo.html"
  },
  {
    "id": "chiba-city-jutaku-datsutanso",
    "name": "千葉市住宅用設備等脱炭素化促進事業補助金（住宅向け）",
    "provider": "千葉市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "定置用リチウムイオン蓄電システム：7万円（他の設備は要確認）",
    "summary": "住宅用の再エネ・省エネ設備導入費用の補助。",
    "eligibility": [],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "千葉市"
    ],
    "period": "令和8年度受付期間は要確認",
    "deadline": null,
    "url": "https://www.city.chiba.jp/kankyo/kankyohozen/datsutanso/renewable-energy-hojo.html"
  },
  {
    "id": "chiba-city-jutaku-jokyaku",
    "name": "千葉市住宅の除却費補助制度",
    "provider": "千葉市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "耐震性の低い住宅の除却費の補助。",
    "eligibility": [
      "昭和56年5月31日以前の建物で上部構造評点等の基準を満たすもの"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "千葉市"
    ],
    "period": "令和8年5月1日～8月31日（予算の限り）",
    "deadline": "2026-08-31",
    "url": "https://www.city.chiba.jp/toshi/kenchiku/shido/jutaku_jokyaku.html"
  },
  {
    "id": "chiba-city-jutaku-taishin",
    "name": "千葉市住宅の耐震診断・耐震改修補助制度",
    "provider": "千葉市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "木造住宅の耐震診断・耐震改修費の補助。令和8年度の募集予定は診断7戸、工事27戸。",
    "eligibility": [],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "千葉市"
    ],
    "period": "令和8年5月1日～5月29日",
    "deadline": null,
    "url": "https://www.city.chiba.jp/toshi/kenchiku/shido/news_juukankyou.html"
  },
  {
    "id": "funabashi-jutaku-kankyo-setsubi",
    "name": "船橋市住宅向け補助金（太陽光・蓄電・EV・V2H）令和8年度",
    "provider": "船橋市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：1kWあたり1.5万円（上限6万円）、蓄電システム7万円、EV・PHEV：太陽光併設10万円／太陽光とV2H併設15万円、V2H：購入費の1/10（上限25万円）",
    "summary": "住宅用太陽光発電、蓄電システム、EV・PHEV、V2H充放電設備等の導入費の補助。",
    "eligibility": [
      "太陽光は蓄電システム又はHEMSの併設が必要",
      "EV等は令和8年4月1日以降登録の新車で使用の本拠が市内"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "船橋市"
    ],
    "period": "令和8年5月1日～令和9年2月26日（先着順）",
    "deadline": "2027-02-26",
    "url": "https://www.city.funabashi.lg.jp/machi/kankyou/004/p035670.html"
  },
  {
    "id": "funabashi-mokuzo-taishin-kaishu",
    "name": "船橋市木造住宅耐震改修助成事業",
    "provider": "船橋市",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "耐震改修工事費と工事監理費の4/5、上限115万円",
    "summary": "木造住宅の耐震改修の助成。",
    "eligibility": [
      "平成12年5月以前に建てられた平屋又は2階建ての在来軸組工法の木造住宅",
      "契約・着手前の交付申請"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "船橋市"
    ],
    "period": "令和8年度交付申請受付中（締切：令和8年11月30日）",
    "deadline": "2026-11-30",
    "url": "https://www.city.funabashi.lg.jp/machi/juutaku/006/p010088.html"
  },
  {
    "id": "kashiwa-block-jokyaku",
    "name": "危険コンクリートブロック塀等除却工事費補助金",
    "provider": "柏市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "上限：道路等に面する場合10万円、通学路に面する場合20万円",
    "summary": "危険なコンクリートブロック塀等の除却工事費の補助。",
    "eligibility": [
      "除却工事の契約前の申請"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "柏市"
    ],
    "period": "令和8年5月7日～11月30日（受付20件）",
    "deadline": "2026-11-30",
    "url": "https://www.city.kashiwa.lg.jp/kenchikushido/anshinanzen/disaster/taishin/35.html"
  },
  {
    "id": "kashiwa-taiyoko-kasokuka",
    "name": "令和8年度柏市太陽光発電設備設置加速化補助金",
    "provider": "柏市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "1kWあたり上限7万円、最大5kW相当（35万円）まで",
    "summary": "住宅への太陽光発電設備設置の補助。予算額に達し受付終了。",
    "eligibility": [
      "実績報告時までに蓄電容量4kWh以上の蓄電池又はV2Hを設置"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "柏市"
    ],
    "period": "受付終了（報告期限：令和9年2月26日）",
    "deadline": null,
    "url": "https://www.city.kashiwa.lg.jp/zerocarbon/taiyoko_hojyo.html"
  },
  {
    "id": "kashiwa-zerocarbon-katei",
    "name": "令和8年度柏市ゼロカーボンシティ促進総合補助制度（家庭向け）",
    "provider": "柏市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "定置用蓄電池：上限7万円",
    "summary": "家庭向けの脱炭素設備導入の補助。",
    "eligibility": [
      "蓄電池は太陽光発電設備の併設が必須"
    ],
    "prefectures": [
      "千葉県"
    ],
    "cities": [
      "柏市"
    ],
    "period": "令和8年5月1日受付開始（締切は要確認）",
    "deadline": null,
    "url": "https://www.city.kashiwa.lg.jp/zerocarbon/ecosite/ondanka/shimin/r5ecohouse.html"
  },
  {
    "id": "tokyo-akachan-first",
    "name": "東京都出産・子育て応援事業（赤ちゃんファースト）",
    "provider": "東京都福祉局",
    "level": "prefecture",
    "category": "子育て",
    "type": "給付",
    "amount": "10万円相当のギフトカード（育児用品や子育て支援サービスから選択）",
    "summary": "都内で出生した子の養育者に、育児用品や子育て支援サービスを選べるギフトを提供する。",
    "eligibility": [
      "令和8年4月1日以降に生まれた子の養育者（令和8年度出生分）"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "period": "令和8年度出生分の申請期限：令和9年9月15日",
    "deadline": "2027-09-15",
    "url": "https://www.fukushi.metro.tokyo.lg.jp/kodomo/shussan/tokyo_shussankosodateouen"
  },
  {
    "id": "tokyo-akiya-kazai-kaitai",
    "name": "東京都空き家家財整理・解体促進事業",
    "provider": "東京都住宅政策本部",
    "level": "prefecture",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "要確認",
    "summary": "空き家所有者が行う家財整理や解体の費用の一部を補助する。",
    "eligibility": [
      "都内の空き家の所有者"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.juutakuseisaku.metro.tokyo.lg.jp/akiya/hojo"
  },
  {
    "id": "tokyo-dannetsu-solar-jutaku",
    "name": "災害にも強く健康にも資する断熱・太陽光住宅普及拡大事業",
    "provider": "東京都環境局",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "窓・ドアの断熱改修は費用の1/3相当額（上限130万円/戸）（令和7年度案で確認。令和8年度の単価は要確認）",
    "summary": "既存住宅の高断熱窓・ドアへの改修、蓄電池・太陽光発電設備の設置、高効率給湯器への交換などを補助する。",
    "eligibility": [
      "都内の既存住宅（詳細な条件は要確認）"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "url": "https://www.kankyo.metro.tokyo.lg.jp/climate/home/dannetsu-solar"
  },
  {
    "id": "tokyo-home-evcharge",
    "name": "戸建住宅向け充電設備普及促進事業（令和8年度）",
    "provider": "東京都環境局",
    "level": "prefecture",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "通信機能付き充電設備は機器費の10/10（上限30万円/基）、それ以外は導入費として2万5千円/基",
    "summary": "都内の戸建住宅に充電設備を設置した所有者（個人）に、設置費用を助成する。",
    "eligibility": [
      "都内の戸建住宅の所有者",
      "事後申請（設置前の申請は不可）",
      "新築は対象外"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "period": "令和9年3月31日17時必着（予算に達し次第終了）",
    "deadline": "2027-03-31",
    "url": "https://www.tokyo-co2down.jp/subsidy/home-evcharge-support/"
  },
  {
    "id": "tokyo-kodomo-mamoru-jutaku",
    "name": "子育て世帯向け補助事業（「子供を守る」住宅確保促進事業）",
    "provider": "東京都住宅政策本部",
    "level": "prefecture",
    "category": "子育て",
    "type": "補助金",
    "amount": "補助対象経費の3分の2（上限額は要確認）",
    "summary": "住宅購入に合わせ、子どもの安全確保のための改修工事を行う子育て世帯に補助する。集合住宅に加え戸建住宅も対象。",
    "eligibility": [
      "小学生以下の子どもがいる世帯など"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "period": "実績報告書の提出期限：令和9年3月末（受付期間は要確認）",
    "deadline": null,
    "url": "https://www.juutakuseisaku.metro.tokyo.lg.jp/kosodate/child-protect-jigyo"
  },
  {
    "id": "tokyo-sukusuku-flat35",
    "name": "東京こどもすくすく住宅供給促進事業（フラット35 金利引下げ）",
    "provider": "東京都住宅政策本部",
    "level": "prefecture",
    "category": "子育て",
    "type": "融資",
    "amount": "フラット35の当初5年間の借入金利を年0.5％引下げ",
    "summary": "都が認定した東京こどもすくすく住宅を購入し、フラット35を利用する子育て世帯・若年夫婦世帯の金利を引き下げる。",
    "eligibility": [
      "都が認定した住戸・住宅を初めて取得して居住すること",
      "都発行の「フラット35地域連携型利用対象証明書」が必要"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.juutakuseisaku.metro.tokyo.lg.jp/kosodate/child-care/child-care-jigyo"
  },
  {
    "id": "tokyo-zeroemi-house-shinchiku",
    "name": "東京ゼロエミ住宅の新築に対する助成事業（令和8年度）",
    "provider": "東京都環境局",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "戸建住宅：水準C 40万円/戸、水準B 160万円/戸、水準A 240万円/戸。蓄電池は10万円/kWh（上限120万円/戸）、太陽光は3.6kW以下でオール電化13万円/kW（上限39万円）等",
    "summary": "東京ゼロエミ住宅の水準を満たす新築住宅について、断熱・省エネ性能等に応じて助成する。太陽光発電・蓄電池への加算もある。",
    "eligibility": [
      "東京ゼロエミ住宅の水準を満たす新築住宅",
      "2026年10月1日以降、蓄電池はSII登録製品のみ対象"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "period": "令和8年度",
    "deadline": null,
    "url": "https://www.kankyo.metro.tokyo.lg.jp/climate/home/tokyo_zeroemission_house/jyoseiseido"
  },
  {
    "id": "tokyo-zeroemi-point",
    "name": "東京ゼロエミポイント（家庭のゼロエミッション行動推進事業）",
    "provider": "東京都環境局",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "給湯器の通常買替えは12,000ポイント（1ポイント＝1円）。他の機器は要確認",
    "summary": "省エネ性能の高いエアコン、冷蔵庫、給湯器、LED照明器具への買い替え等に対し、都民にポイントを付与する。",
    "eligibility": [
      "都民"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "period": "対象期間：令和6年10月1日から令和9年3月31日まで",
    "deadline": null,
    "url": "https://www.tokyo-co2down.jp/subsidy/katei-zeroemi/"
  },
  {
    "id": "tokyo-zev-kounyu",
    "name": "ZEV車両購入補助金（令和8年度）",
    "provider": "東京都環境局",
    "level": "prefecture",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "EVは上乗せを含め最大100万円（車種別の金額は要確認）",
    "summary": "電気自動車（EV）・プラグインハイブリッド車・燃料電池車等のZEVの購入費を補助する。充放電設備（V2H等）を導入する場合は上乗せがある。",
    "eligibility": [
      "都内在住の個人などが対象（詳細は要確認）"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [],
    "period": "令和8年4月30日から申請受付開始（終了時期は要確認）",
    "deadline": null,
    "url": "https://www.metro.tokyo.lg.jp/information/press/2026/03/2026033008"
  },
  {
    "id": "adachi-enefarm",
    "name": "家庭用燃料電池システム（エネファーム）設置費補助金（設置後申請）",
    "provider": "足立区 環境部",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "5万円",
    "summary": "家庭用燃料電池システムの設置費用を補助。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "足立区"
    ],
    "period": "令和9年2月26日まで受付",
    "deadline": "2027-02-26",
    "url": "https://www.city.adachi.tokyo.jp/kankyo/kurashi/kankyo/ondanka-j-h24-denchi.html"
  },
  {
    "id": "adachi-ev-charger",
    "name": "戸建住宅向け電気自動車等用充電設備設置費補助金（設置後申請）",
    "provider": "足立区 環境部",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "2万5千円",
    "summary": "戸建住宅へのEV等用充電設備の設置費用を補助。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "足立区"
    ],
    "period": "令和8年4月13日〜令和9年2月26日（残りわずかと表示）",
    "deadline": "2027-02-26",
    "url": "https://www.city.adachi.tokyo.jp/kankyo/kurashi/kankyo/kodatemukejyudensetubi.html"
  },
  {
    "id": "adachi-ev-purchase",
    "name": "電気自動車等購入費補助金（購入後申請）",
    "provider": "足立区 環境部",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "EV・PHEV・FCVは10万円、ミニカー・電動バイクは2万円",
    "summary": "電気自動車等の購入費を補助。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "足立区"
    ],
    "period": "令和8年度（区の一覧では8月31日提出分で受付終了と記載。ページ間で表記が異なるため要確認）",
    "deadline": null,
    "url": "https://www.city.adachi.tokyo.jp/kankyo/kurashi/kankyo/denkijidousya.html"
  },
  {
    "id": "adachi-solar-battery",
    "name": "太陽光発電システム及び蓄電池設置費補助金（設置後申請）",
    "provider": "足立区 環境部",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光は上限24万円（区内事業者利用で28.8万円）、蓄電池は上限5万円（同6万円）",
    "summary": "太陽光発電システムと蓄電池の設置費用を補助（個別申請も可）。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "足立区"
    ],
    "period": "令和8年度第3期：10月1日〜12月28日（予算到達次第終了）",
    "deadline": "2026-12-28",
    "url": "https://www.city.adachi.tokyo.jp/kankyo/kurashi/kankyo/taiyoukouhatuden.html"
  },
  {
    "id": "adachi-taishin-mokuzo",
    "name": "木造住宅耐震診断・耐震改修助成（旧耐震）",
    "provider": "足立区 建築室 建築防災課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震診断は戸建て上限30万円。耐震改修は戸建てで工事費の9割、上限150万円",
    "summary": "昭和56年5月以前の木造住宅の耐震診断・改修費用を助成。",
    "eligibility": [
      "事前申請が必要"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "足立区"
    ],
    "period": "令和8年度（令和9年3月まで期間延長と案内）",
    "deadline": "2027-03-31",
    "url": "https://www.city.adachi.tokyo.jp/k-bousai/machi/taishinka/sokushin-taishin.html"
  },
  {
    "id": "adachi-taishin-shelter",
    "name": "耐震シェルター・ベッドの設置支援助成",
    "provider": "足立区 建築室 建築防災課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "1世帯上限30万円",
    "summary": "旧耐震の木造戸建て住宅への耐震シェルター・防災ベッド設置費用を助成。",
    "eligibility": [
      "旧耐震の木造戸建て"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "足立区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.adachi.tokyo.jp/k-bousai/machi/taishinka/sokushin-bed.html"
  },
  {
    "id": "adachi-taishin-shinkijun",
    "name": "新耐震基準の木造住宅の耐震助成",
    "provider": "足立区 建築室 建築防災課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "特定地域では改修の上限200万円（その他は要確認）",
    "summary": "昭和56年6月〜平成12年5月に木造軸組工法で建築された2階建て以下の住宅の耐震診断・改修を助成。",
    "eligibility": [
      "事前申請が必要"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "足立区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.adachi.tokyo.jp/k-bousai/machi/taishinka/sintaisin.html"
  },
  {
    "id": "arakawa-eco-battery",
    "name": "令和8年度荒川区エコ助成事業（蓄電システム・V2H）",
    "provider": "荒川区 環境部",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "蓄電容量1kWhあたり5千円。上限は区内業者15万円、区外業者10万円",
    "summary": "蓄電システム・V2Hの本体費用（消費税除く）を助成。",
    "eligibility": [
      "自分が住民票を置いて居住する住宅",
      "設置完了から1年以内に申請"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "荒川区"
    ],
    "period": "令和8年度（受付期間は令和9年2月26日までと確認できた項目あり）",
    "deadline": "2027-02-26",
    "url": "https://www.city.arakawa.tokyo.jp/a024/kankyou/ekojyosei.html"
  },
  {
    "id": "arakawa-eco-insulation",
    "name": "令和8年度荒川区エコ助成事業（断熱材の設置・ZEH等）",
    "provider": "荒川区 環境部",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "断熱材は上限20万円（区内業者）・15万円（区外業者）。ZEH、東京ゼロエミ住宅、LCCM住宅は一律25万円",
    "summary": "既存住宅への断熱材設置や、ZEH等の住宅に対する助成。",
    "eligibility": [
      "断熱材は既存住宅のみ対象"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "荒川区"
    ],
    "period": "令和8年度",
    "deadline": null,
    "url": "https://www.city.arakawa.tokyo.jp/a024/kankyou/ekojyosei.html"
  },
  {
    "id": "arakawa-eco-solar",
    "name": "令和8年度荒川区エコ助成事業（太陽光発電システム）",
    "provider": "荒川区 環境部",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "出力1kWあたり2万円。上限は区内業者30万円、区外業者25万円",
    "summary": "自宅に太陽光発電システムを設置する費用（本体費用のみ、消費税除く）を助成。",
    "eligibility": [
      "自分が住民票を置いて居住する住宅",
      "令和7年度に補助を受けた同一機器は対象外",
      "設置完了から1年以内に申請"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "荒川区"
    ],
    "period": "令和8年度（受付期間は令和9年2月26日までと確認できた項目あり）",
    "deadline": "2027-02-26",
    "url": "https://www.city.arakawa.tokyo.jp/a024/kankyou/ekojyosei.html"
  },
  {
    "id": "arakawa-eco-window",
    "name": "令和8年度荒川区エコ助成事業（高断熱窓・高断熱ドア）",
    "provider": "荒川区 環境部",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "本体費用の2分の1。上限は区内業者15万円、区外業者10万円（個人）",
    "summary": "既存住宅の改修で高断熱窓・高断熱ドアを設置する本体費用を助成。",
    "eligibility": [
      "改修のみ対象",
      "施工・支払完了後に申請"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "荒川区"
    ],
    "period": "令和8年度",
    "deadline": null,
    "url": "https://www.city.arakawa.tokyo.jp/a024/kankyou/ekojyosei.html"
  },
  {
    "id": "arakawa-jutaku-kaishu",
    "name": "荒川区 住宅改修給付（転倒防止給付など）",
    "provider": "荒川区",
    "level": "municipality",
    "category": "バリアフリー・介護",
    "type": "給付",
    "amount": "要確認",
    "summary": "高齢者等の住宅改修に対する給付（転倒防止給付などの区分あり。詳細は要確認）。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "荒川区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.arakawa.tokyo.jp/documents/883/jyutaku7.pdf"
  },
  {
    "id": "chiyoda-block-kaizen",
    "name": "千代田区要除却ブロック塀等の改善工事助成",
    "provider": "千代田区 建築指導課",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "助成金",
    "amount": "撤去工事は10分の10（上限40万円）、撤去後の設置工事は2分の1（上限30万円）",
    "summary": "道路等に面する要除却ブロック塀等の撤去と、撤去後の塀の設置費用を助成する。",
    "eligibility": [
      "工事契約前に事前相談・申請が必要",
      "二者以上の見積りが必要"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "千代田区"
    ],
    "period": "令和8年4月時点の案内（予算額に達し次第終了）",
    "deadline": null,
    "url": "https://www.city.chiyoda.lg.jp/koho/machizukuri/kenchiku/taishin/block-josei.html"
  },
  {
    "id": "chiyoda-ev-judensetsubi",
    "name": "千代田区クリーンエネルギー自動車充電設備等導入費助成制度",
    "provider": "千代田区 環境政策課",
    "level": "municipality",
    "category": "EV・充電",
    "type": "助成金",
    "amount": "急速充電設備：最大50万円/台、普通充電設備（充電用コンセント等）：最大30万円、V2H：最大50万円",
    "summary": "充電設備、V2Hの導入費用を助成する。国・都の助成と併用できる。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "千代田区"
    ],
    "period": "令和8年度（先着順、予算がなくなり次第終了）",
    "deadline": null,
    "url": "https://www.city.chiyoda.lg.jp/koho/machizukuri/kankyo/hojo/clean-ene-judensetsubijosei.html"
  },
  {
    "id": "chiyoda-jisedai-ikusei",
    "name": "千代田区 次世代育成住宅助成",
    "provider": "千代田区 住宅課",
    "level": "municipality",
    "category": "子育て",
    "type": "助成金",
    "amount": "家賃助成は年々減額。例：親元近居の3人世帯は1年目に月5万円",
    "summary": "区内の民間賃貸に住む子育て世帯や、マイホームへ住み替える子育て世帯に家賃等を助成する。",
    "eligibility": [
      "区内の民間賃貸住宅に住む世帯、またはマイホームへ住み替える世帯",
      "3人世帯は専有面積40平方メートル以上など"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "千代田区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.chiyoda.lg.jp/koho/machizukuri/sumai/jose/jisedai.html"
  },
  {
    "id": "chiyoda-jutakutsuki-taishin",
    "name": "千代田区 住宅付建築物の耐震化促進助成",
    "provider": "千代田区 建築指導課",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "要確認",
    "summary": "住宅部分のある建築物で、所有者が居住している場合の耐震改修費等を助成する。",
    "eligibility": [
      "昭和56年5月31日以前に建築確認を得た建築物など"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "千代田区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.chiyoda.lg.jp/koho/machizukuri/kenchiku/taishin/jutakutsukikenchikubutsu-josei.html"
  },
  {
    "id": "chiyoda-kaigoyobo-jutaku-kaishu",
    "name": "千代田区 （介護予防）住宅改修費の支給",
    "provider": "千代田区 高齢介護課",
    "level": "municipality",
    "category": "バリアフリー・介護",
    "type": "給付",
    "amount": "同じ住宅で合計20万円までの工事費が対象。利用者負担は1割",
    "summary": "手すり設置や段差解消などの住宅改修の費用を支給する。要介護・要支援の方は介護保険で上限20万円。",
    "eligibility": [
      "介護認定を受けていない65歳以上の方（介護予防）",
      "事前申請が必要（工事後の申請は不可）"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "千代田区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.chiyoda.lg.jp/koho/kurashi/hoken/riyosha/kyufu/kaishuhi.html"
  },
  {
    "id": "chiyoda-koreisha-fukushi-jutaku",
    "name": "千代田区 高齢者福祉住環境整備",
    "provider": "千代田区 高齢介護課",
    "level": "municipality",
    "category": "バリアフリー・介護",
    "type": "助成金",
    "amount": "要確認",
    "summary": "高齢者の住環境整備（バリアフリー工事等）に関する区の制度。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "千代田区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.chiyoda.lg.jp/koho/kenko/koresha/dokuji-kaigo/sebi.html"
  },
  {
    "id": "chiyoda-mansion-taishin",
    "name": "千代田区 マンションの耐震化促進助成",
    "provider": "千代田区 建築指導課",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "要確認",
    "summary": "マンションの耐震化に要する費用を助成する。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "千代田区"
    ],
    "period": "令和7年度実施分は終了。令和8年度実施分の相談を受付中",
    "deadline": null,
    "url": "https://www.city.chiyoda.lg.jp/koho/machizukuri/kenchiku/taishin/mansion-josei.html"
  },
  {
    "id": "chiyoda-mokuzo-taishin",
    "name": "千代田区 木造住宅の耐震化促進助成",
    "provider": "千代田区 建築指導課",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "要確認",
    "summary": "高齢者等が居住する木造住宅の耐震診断・耐震改修等に要する費用を助成する。",
    "eligibility": [
      "高齢者等が居住する木造住宅"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "千代田区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.chiyoda.lg.jp/koho/machizukuri/kenchiku/taishin/mokuzojutaku-josei.html"
  },
  {
    "id": "chiyoda-shoene-mado",
    "name": "千代田区省エネルギー改修等助成制度（窓断熱・高効率給湯器）",
    "provider": "千代田区 環境政策課",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "助成金",
    "amount": "住宅の窓断熱は窓の大きさ・性能に応じた単価で上限100万円。高効率ガス給湯器（潜熱回収型）は1台あたり3万円",
    "summary": "住宅の窓断熱（二重窓・複層ガラス）や高効率ガス給湯器の設置費用を助成する。",
    "eligibility": [
      "申請者は大企業者でないこと",
      "施工業者による改修であること"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "千代田区"
    ],
    "period": "令和8年度。予算額に達したため今年度分の受付は一旦終了。工事完了報告の期限：令和9年3月15日",
    "deadline": "2027-03-15",
    "url": "https://www.city.chiyoda.lg.jp/koho/machizukuri/kankyo/hojo/sho-ene.html"
  },
  {
    "id": "chiyoda-shoene-solar",
    "name": "千代田区省エネルギー改修等助成制度（太陽光・蓄電池・エネファーム）",
    "provider": "千代田区 環境政策課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "助成金",
    "amount": "対象経費の20％",
    "summary": "太陽光発電システム、蓄電システム、燃料電池システム（エネファーム）の設置費用を助成する。同制度の窓断熱・給湯器は別項目。",
    "eligibility": [
      "申請者は大企業者でないこと",
      "施工業者による改修であること"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "千代田区"
    ],
    "period": "令和8年度。予算額に達したため今年度分の受付は一旦終了。工事完了報告の期限：令和9年3月15日",
    "deadline": null,
    "url": "https://www.city.chiyoda.lg.jp/koho/machizukuri/kankyo/hojo/sho-ene.html"
  },
  {
    "id": "chiyoda-shogaisha-jutaku-setsubi",
    "name": "千代田区 日常生活用具費および住宅設備改善費の支給",
    "provider": "千代田区 障害者福祉課",
    "level": "municipality",
    "category": "バリアフリー・介護",
    "type": "給付",
    "amount": "要確認",
    "summary": "障害のある人の日常生活用具や住宅設備の改善費用を支給する。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "千代田区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.chiyoda.lg.jp/koho/kenko/shogaisha/techo/zaitaku-nichijo-shien/shikyu.html"
  },
  {
    "id": "chofu-barrierfree",
    "name": "バリアフリー適応住宅改修補助（よりよい住まいづくり応援制度）",
    "provider": "調布市",
    "level": "municipality",
    "category": "バリアフリー・介護",
    "type": "補助金",
    "amount": "要確認",
    "summary": "住宅のバリアフリー適応改修の費用を補助（詳細は要確認）。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "調布市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.chofu.tokyo.jp/www/contents/1465193999978/index.html"
  },
  {
    "id": "chofu-taishin-mokuzo",
    "name": "木造住宅の耐震化助成（耐震診断・耐震改修・建替え）",
    "provider": "調布市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震診断は費用の3分の2（上限15万円）。耐震改修は費用の2分の1（上限80万円）。建替えは解体費用の23%（上限80万円）",
    "summary": "木造住宅の耐震診断・耐震改修・建替えの費用を助成。",
    "eligibility": [
      "建替えは昭和56年5月31日以前に着手し耐震性不足と診断された住宅",
      "同じ工事で他の市の補助を受けていないこと"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "調布市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.chofu.tokyo.jp/www/contents/1176118949288/index.html"
  },
  {
    "id": "chuo-eco-jutaku",
    "name": "中央区 住宅・共同住宅用自然エネルギー・省エネルギー機器導入助成（令和8年度）",
    "provider": "中央区 環境政策課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "助成金",
    "amount": "要確認",
    "summary": "区民等が導入する太陽光発電システム、蓄電システム、エネファーム、高反射率塗料等の費用を助成する。",
    "eligibility": [
      "区民、区内の賃貸共同住宅のオーナー、分譲共同住宅の管理組合など",
      "事前申請制"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中央区"
    ],
    "period": "令和8年度。導入完了期限：令和9年3月15日、完了報告：令和9年3月31日",
    "deadline": null,
    "url": "https://www.city.chuo.lg.jp/a0036/machizukuri/bika/taisaku/kikijosei/ecojosei_jutaku.html"
  },
  {
    "id": "chuo-jutaku-setsubi-kaizen",
    "name": "中央区 住宅設備改善給付（高齢者）",
    "provider": "中央区 高齢者施策課",
    "level": "municipality",
    "category": "バリアフリー・介護",
    "type": "給付",
    "amount": "要確認",
    "summary": "高齢者の住宅設備の改善費用を給付する。",
    "eligibility": [
      "工事前に高齢者住宅設備改善アドバイザーの派遣を受けること"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中央区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.chuo.lg.jp/a0029/kenkouiryou/koureikaigo/koureisha-shien/teate/zyutakukaizenkyuhu.html"
  },
  {
    "id": "chuo-jutaku-shuzen-yushi",
    "name": "中央区 住宅修繕等資金の融資あっせん",
    "provider": "中央区 住宅課",
    "level": "municipality",
    "category": "耐震",
    "type": "融資",
    "amount": "融資額は700万円まで",
    "summary": "住宅の修繕や木造住宅の耐震補強等の資金を、低利で借りられるよう金融機関にあっせんする。",
    "eligibility": [
      "資金の調達が困難な方"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中央区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.chuo.lg.jp/a0042/kurashi/sumai/kyojuushien/jutakusyuzen.html"
  },
  {
    "id": "chuo-shogaisha-jutaku-kaizen",
    "name": "中央区 住宅設備改善費の給付（障害のある方）",
    "provider": "中央区 障害者福祉課",
    "level": "municipality",
    "category": "バリアフリー・介護",
    "type": "給付",
    "amount": "原則1割負担（上限額は要確認）",
    "summary": "日常生活を円滑にするための住宅設備の改善費用を給付する。",
    "eligibility": [
      "介護保険の対象の方は介護保険が優先"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中央区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.chuo.lg.jp/a0023/kenkouiryou/shougaishafukushi/shienservice/hosougu/kaizen.html"
  },
  {
    "id": "chuo-sumikae-shien",
    "name": "中央区 住み替え支援（高齢者世帯）",
    "provider": "中央区 高齢者施策課",
    "level": "municipality",
    "category": "移住",
    "type": "助成金",
    "amount": "要確認",
    "summary": "高齢者世帯の民間賃貸住宅への転居を支援する。",
    "eligibility": [
      "65歳以上のひとり暮らし世帯、または65歳以上を含む60歳以上のみの世帯",
      "中央区に1年以上居住"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中央区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.chuo.lg.jp/a0028/kenkouiryou/koureikaigo/zaitakuiryou/zaitakushienservice/koreisyasetai/sumikae.html"
  },
  {
    "id": "chuo-taishin-josei",
    "name": "中央区 建築物の耐震助成制度",
    "provider": "中央区 建築課 耐震化推進係",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "木造：診断・補強計画は全額（限度額なし）、補強工事は2分の1（上限330万円）。65歳以上または障害者手帳をお持ちの方がいる世帯は全額（上限330万円）。木造以外：診断・補強設計は各全額（上限50万円）、補強工事は2分の1（上限330万円）",
    "summary": "昭和56年5月31日以前に工事着手した建築物の耐震診断、補強設計、補強工事の費用を助成する。無料の簡易耐震診断やアドバイザー派遣もある。",
    "eligibility": [
      "昭和56年5月31日以前に工事着手した建築物",
      "契約前に交付申請し、交付決定を受けること"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中央区"
    ],
    "period": "令和8年度。令和8年度中に着手する場合は令和8年10月までに相談",
    "deadline": null,
    "url": "https://www.city.chuo.lg.jp/a0043/machizukuri/kenchiku/taishin/taisintaisaku.html"
  },
  {
    "id": "edogawa-portable-battery",
    "name": "気候変動に備え、脱炭素を目指す補助金（ポータブル蓄電池購入費補助）",
    "provider": "江戸川区 都市計画部",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "一律1万円",
    "summary": "太陽光パネルで充電できるなどの要件を満たすポータブル蓄電池の購入費を補助。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "江戸川区"
    ],
    "period": "令和8年4月6日から受付（終了日は要確認）",
    "deadline": null,
    "url": "https://www.city.edogawa.tokyo.jp/e086/toshikeikaku/kankyo/inochi/hojokin/portable.html"
  },
  {
    "id": "edogawa-rokyu-jokyaku",
    "name": "老朽住宅除却工事助成制度",
    "provider": "江戸川区 建築指導課",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "助成金",
    "amount": "上限50万円（令和8年度から一部対象地域と空き家は100万円に拡充）",
    "summary": "地震で倒壊の危険が高い老朽住宅の除却工事費を助成。",
    "eligibility": [
      "除却助成の申請前に耐震コンサルタント派遣の申込みが必要"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "江戸川区"
    ],
    "period": "令和8年度：申請期限は令和8年12月25日（予算到達で終了）",
    "deadline": "2026-12-25",
    "url": "https://www.city.edogawa.tokyo.jp/e021/kurashi/sumai/taishin/mokuzojose.html"
  },
  {
    "id": "edogawa-taishin-josei",
    "name": "住宅・建築物の耐震化助成制度",
    "provider": "江戸川区 建築指導課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "旧耐震・新耐震（昭和56年6月〜平成12年5月の木造）住宅の耐震改修設計・工事費などを助成。無料の耐震コンサルタント派遣もあり。",
    "eligibility": [
      "区の耐震コンサルタント派遣（簡易診断）の申込みが前提となる手続きあり"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "江戸川区"
    ],
    "period": "令和8年度：診断・設計・工事の申請期限は令和8年12月25日（予算到達で終了）",
    "deadline": "2026-12-25",
    "url": "https://www.city.edogawa.tokyo.jp/e021/kurashi/sumai/taishin/taishin_josei.html"
  },
  {
    "id": "fuchu-eco-battery",
    "name": "エコハウス設備設置費助成金（家庭用蓄電池システム）",
    "provider": "府中市 環境政策課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "助成金",
    "amount": "1kWhあたり2万円、上限10万円",
    "summary": "家庭用蓄電池システムの設置費用を助成。",
    "eligibility": [
      "住宅用太陽光発電システムとの併用が要件"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "府中市"
    ],
    "period": "令和8年4月6日受付開始（終了日は要確認）",
    "deadline": null,
    "url": "https://www.city.fuchu.tokyo.jp/kurashi/sekatu/datsutanso_ondanka/ekohausu.html"
  },
  {
    "id": "fuchu-eco-solar",
    "name": "エコハウス設備設置費助成金（太陽光発電システム）",
    "provider": "府中市 環境政策課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "助成金",
    "amount": "1kWあたり2万円、上限10万円",
    "summary": "住宅用太陽光発電システムの設置費用を助成（設置後申請）。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "府中市"
    ],
    "period": "令和8年4月6日受付開始（終了日は要確認）",
    "deadline": null,
    "url": "https://www.city.fuchu.tokyo.jp/kurashi/sekatu/datsutanso_ondanka/ekohausu.html"
  },
  {
    "id": "fuchu-taishin",
    "name": "木造住宅耐震診断・耐震改修等助成事業",
    "provider": "府中市 住宅課",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "耐震診断は費用の3分の2（上限12万円）。耐震改修は費用の2分の1（限度170万円、資料により異なり要確認）",
    "summary": "古い木造住宅の耐震診断・耐震改修等の費用を助成。",
    "eligibility": [
      "事業者との契約前に市へ相談が必要"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "府中市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.fuchu.tokyo.jp/kurashi/machi/jutaku/mokuzotaishin.html"
  },
  {
    "id": "hachioji-saiene",
    "name": "再生可能エネルギー利用機器等設置費補助制度（太陽光発電・蓄電池）",
    "provider": "八王子市 環境部",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光は1kWあたり1万円（上限10万円）、蓄電池は太陽光と同時導入の場合3万円",
    "summary": "太陽光発電システムと蓄電池の設置費用を補助。",
    "eligibility": [
      "蓄電池は太陽光と同時導入で3kWh以上など",
      "東京都のグループ購入促進事業で導入した場合は対象外"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "八王子市"
    ],
    "period": "令和8年度（先着順。受付状況は要確認）",
    "deadline": null,
    "url": "https://www.city.hachioji.tokyo.jp/kurashi/life/004/a546973/a871645/p007132.html"
  },
  {
    "id": "hachioji-taishin-kaishu",
    "name": "八王子市居住環境整備補助金（木造住宅耐震改修工事）",
    "provider": "八王子市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "対象工事費の2/3以内、上限100万円",
    "summary": "木造住宅の耐震改修工事費を補助。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "八王子市"
    ],
    "period": "令和8年度（予算上限に達し今年度の受付は終了と案内）",
    "deadline": null,
    "url": "https://www.city.hachioji.tokyo.jp/kurashi/life/003/001/004/p006694.html"
  },
  {
    "id": "hachioji-taishin-shindan",
    "name": "八王子市木造住宅耐震診断補助制度",
    "provider": "八王子市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震診断費用の4分の3以内、上限15万円",
    "summary": "旧耐震基準（平成12年5月以前の一部を含む）の木造住宅の耐震診断費用を補助。",
    "eligibility": [
      "無料の耐震アドバイザー派遣を受けていること"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "八王子市"
    ],
    "period": "令和8年度（交付申請は令和9年1月末日まで）",
    "deadline": "2027-01-31",
    "url": "https://www.city.hachioji.tokyo.jp/kurashi/life/003/002/002/p006919.html"
  },
  {
    "id": "itabashi-ev-bike",
    "name": "板橋区EVバイク車両購入補助事業",
    "provider": "板橋区",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "当初予算額60万円（1台あたりの額は要確認）",
    "summary": "EVバイクの購入費用を補助。",
    "eligibility": [
      "区内在住の個人または区内事業者"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "板橋区"
    ],
    "period": "令和8年7月1日から令和9年3月31日まで（交付申請）",
    "deadline": "2027-03-31",
    "url": "https://www.city.itabashi.tokyo.jp/bousai/smart/1058241.html"
  },
  {
    "id": "itabashi-kosodate-reform",
    "name": "板橋区子育て世帯住宅リフォーム支援事業",
    "provider": "板橋区",
    "level": "municipality",
    "category": "子育て",
    "type": "補助金",
    "amount": "要確認",
    "summary": "子育て世帯の住宅リフォームを支援する事業（詳細は要確認）。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "板橋区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.itabashi.tokyo.jp/tetsuduki/sumai/soudan/1062055.html"
  },
  {
    "id": "itabashi-taishin-hi-mokuzo",
    "name": "建築物の耐震化に対する助成（木造以外の建築物）",
    "provider": "板橋区",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "要確認",
    "summary": "昭和56年5月31日以前に建築確認を受けた鉄骨造・鉄筋コンクリート造などの建築物の耐震診断・補強設計・改修工事費を助成。",
    "eligibility": [
      "契約前に申請が必要"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "板橋区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.itabashi.tokyo.jp/bousai/tochi/josei/1006175.html"
  },
  {
    "id": "itabashi-taishin-mokuzo",
    "name": "木造住宅の耐震化促進事業",
    "provider": "板橋区",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "平成12年5月以前に建てられた木造住宅の耐震化費用の一部を助成。",
    "eligibility": [
      "区の指定業者による診断・施工であること",
      "契約前の申請が必要"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "板橋区"
    ],
    "period": "令和8年度（承認申請の受付締切は令和8年12月4日。建替え助成は令和8年度で終了）",
    "deadline": "2026-12-04",
    "url": "https://www.city.itabashi.tokyo.jp/bousai/tochi/josei/1006168.html"
  },
  {
    "id": "katsushika-eco-battery",
    "name": "かつしかエコ助成金（個人住宅用・蓄電池）",
    "provider": "葛飾区 環境課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "助成金",
    "amount": "対象経費の4分の1、限度額20万円。太陽光との併設で5万円加算",
    "summary": "個人住宅への蓄電池導入費用を助成。",
    "eligibility": [
      "工事着工前の事前協議が必要"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "葛飾区"
    ],
    "period": "令和8年4月1日〜令和9年3月31日（必着）。事前協議は着工の4週間前まで",
    "deadline": "2027-03-31",
    "url": "https://www.city.katsushika.lg.jp/kurashi/1000062/1023018/1035385/1036257/1036354.html"
  },
  {
    "id": "katsushika-eco-hems",
    "name": "かつしかエコ助成金（個人住宅用・HEMS）",
    "provider": "葛飾区 環境課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "助成金",
    "amount": "1台まで2万円",
    "summary": "個人住宅へのHEMS導入費用を助成。",
    "eligibility": [
      "工事着工前の事前協議が必要"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "葛飾区"
    ],
    "period": "令和8年4月1日〜令和9年3月31日（必着）。事前協議は着工の4週間前まで",
    "deadline": "2027-03-31",
    "url": "https://www.city.katsushika.lg.jp/kurashi/1000062/1023018/1035385/1036257/1036372.html?hl=en"
  },
  {
    "id": "katsushika-eco-solar",
    "name": "かつしかエコ助成金（個人住宅用・太陽光発電システム）",
    "provider": "葛飾区 環境課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "助成金",
    "amount": "1kWあたり6万円、限度額30万円",
    "summary": "個人住宅への太陽光発電システム導入費用を助成。",
    "eligibility": [
      "工事着工前の事前協議が必要"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "葛飾区"
    ],
    "period": "令和8年4月1日〜令和9年3月31日（必着）。事前協議は着工の4週間前まで",
    "deadline": "2027-03-31",
    "url": "https://www.city.katsushika.lg.jp/kurashi/1000062/1023018/1035385/1036257/1036259.html"
  },
  {
    "id": "katsushika-eco-v2h",
    "name": "かつしかエコ助成金（個人住宅用・V2H）",
    "provider": "葛飾区 環境課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "助成金",
    "amount": "本体価格の3分の1（限度額は要確認）",
    "summary": "個人住宅へのV2H設備導入費用を助成。",
    "eligibility": [
      "工事着工前の事前協議が必要"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "葛飾区"
    ],
    "period": "令和8年4月1日〜令和9年3月31日（必着）。事前協議は着工の4週間前まで",
    "deadline": "2027-03-31",
    "url": "https://www.city.katsushika.lg.jp/kurashi/1000062/1023018/1035385/1030818.html"
  },
  {
    "id": "katsushika-taishin-hi-mokuzo",
    "name": "非木造の住宅、分譲マンション等の耐震助成",
    "provider": "葛飾区 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "昭和56年5月31日以前の非木造住宅・分譲マンション等の耐震診断・改修設計・改修工事費を助成。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "葛飾区"
    ],
    "period": "令和8年度の非木造建築物の申請締切は12月11日と案内",
    "deadline": null,
    "url": "https://www.city.katsushika.lg.jp/kurashi/1003399/1030171/1028662/1012264.html"
  },
  {
    "id": "katsushika-taishin-mokuzo",
    "name": "木造住宅の耐震化促進事業",
    "provider": "葛飾区 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "費用の2/3。補強設計・耐震改修は最大200万円（旧耐震）。除却の上限は資料により記載が異なり要確認",
    "summary": "木造住宅の耐震診断士無料派遣と、補強設計・耐震改修・建替え・除却の費用を助成。",
    "eligibility": [
      "昭和56年5月31日以前に着工（新耐震〜平成12年5月着工も別枠あり）"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "葛飾区"
    ],
    "period": "要確認（予算に達し次第終了）",
    "deadline": null,
    "url": "https://www.city.katsushika.lg.jp/kurashi/1003399/1030171/1028654/index.html"
  },
  {
    "id": "kita-battery",
    "name": "再生可能エネルギー及び省エネルギー機器等導入助成（蓄電システム）",
    "provider": "北区 環境部",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "蓄電容量1kWhあたり1万円（上限10万円）、区内業者は1kWhあたり1.2万円（上限12万円）",
    "summary": "個人等が住宅用蓄電システムを導入する費用の一部を助成。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "北区"
    ],
    "period": "確認できた年度：令和6年度（最新は要確認）",
    "deadline": null,
    "url": "https://www.city.kita.tokyo.jp/kankyo/jutaku/kankyo/hojo/energy/jose-info.html"
  },
  {
    "id": "kita-jutaku-kaizo",
    "name": "住宅改造費助成",
    "provider": "北区",
    "level": "municipality",
    "category": "バリアフリー・介護",
    "type": "助成金",
    "amount": "要確認",
    "summary": "高齢者等の住宅改造費の助成（詳細は要確認）。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "北区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.kita.tokyo.jp/korefukushi/kenko/koresha/shien/jutaku.html"
  },
  {
    "id": "kita-solar",
    "name": "再生可能エネルギー及び省エネルギー機器等導入助成（太陽光発電システム）",
    "provider": "北区 環境部",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "1kWあたり8万円（上限20万円）、区内業者による設置は1kWあたり9.6万円（上限24万円）",
    "summary": "個人等が太陽光発電システムを導入する費用の一部を助成。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "北区"
    ],
    "period": "確認できた年度：令和6年度（最新は要確認）",
    "deadline": null,
    "url": "https://www.city.kita.tokyo.jp/kankyo/jutaku/kankyo/hojo/energy/jose-info.html"
  },
  {
    "id": "kita-taishin-kaishu",
    "name": "木造民間住宅・耐震改修工事事業",
    "provider": "北区 都市整備部 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "北区内の木造民間住宅の耐震改修工事費用を助成する事業（金額・要件は要確認）。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "北区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.kita.tokyo.jp/jutaku/jutaku/kenchiku/jyosei/index.html"
  },
  {
    "id": "kita-taishin-shindan",
    "name": "木造民間住宅・耐震診断事業",
    "provider": "北区 都市整備部 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "北区内の木造民間住宅の耐震診断費用を助成する事業（金額・要件は要確認）。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "北区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.kita.tokyo.jp/jutaku/jutaku/kenchiku/jyosei/index.html"
  },
  {
    "id": "machida-barrierfree",
    "name": "住宅バリアフリー化改修工事助成金",
    "provider": "町田市",
    "level": "municipality",
    "category": "バリアフリー・介護",
    "type": "助成金",
    "amount": "要確認",
    "summary": "住宅のバリアフリー化改修工事費を助成（詳細は要確認）。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "町田市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.machida.tokyo.jp/kurashi/sumai/house/josei.html"
  },
  {
    "id": "machida-enefarm",
    "name": "家庭用燃料電池システム（エネファーム）奨励金",
    "provider": "町田市",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "給付",
    "amount": "35,000円（定員170名、超過時は抽選）",
    "summary": "家庭用燃料電池システムを導入した方への奨励金。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "町田市"
    ],
    "period": "2026年4月〜2027年3月に設置・支払を終えたもの",
    "deadline": "2027-03-31",
    "url": "https://www.city.machida.tokyo.jp/kurashi/kankyo/kankyo/setudenshoene/kateidenotorikumi/riyoukiki/taiyoukououen.html"
  },
  {
    "id": "machida-taishin-kaishu",
    "name": "木造住宅耐震化助成制度（耐震改修工事）",
    "provider": "町田市",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "一般世帯は耐震改修工事費の1/2、上限120万円",
    "summary": "1981年以前の旧耐震住宅と1981年6月〜2000年5月着工の在来軸組工法の木造住宅の耐震改修を助成。",
    "eligibility": [
      "他の町田市耐震助成を利用したことがないこと"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "町田市"
    ],
    "period": "令和8年度（2026年4月から助成対象を81-00住宅に拡大）",
    "deadline": null,
    "url": "https://www.city.machida.tokyo.jp/kurashi/sumai/house/earthquake-resistant/wooden/outline.html"
  },
  {
    "id": "machida-taishin-shelter",
    "name": "耐震シェルター等設置助成",
    "provider": "町田市",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "一般世帯は費用の2分の1（上限20万円）、高齢者・障がい者世帯は10分の9（上限50万円）",
    "summary": "木造住宅への耐震シェルター等の設置費用を助成。",
    "eligibility": [
      "町田市の他の耐震助成を利用したことがないこと"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "町田市"
    ],
    "period": "申請は2026年12月11日まで",
    "deadline": "2026-12-11",
    "url": "https://www.city.machida.tokyo.jp/kurashi/sumai/house/earthquake-resistant/wooden/shelter.html"
  },
  {
    "id": "meguro-block-jokyaku",
    "name": "ブロック塀等除却工事等に係る助成制度",
    "provider": "目黒区 都市整備部 建築課",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "要確認",
    "summary": "ブロック塀等の除却工事等の費用を助成する制度（内容は区ページで要確認）。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "目黒区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.meguro.tokyo.jp/kenchiku/shigoto/kenchiku/burokku.html"
  },
  {
    "id": "meguro-mokuzo-jokyaku",
    "name": "木造住宅等除却工事助成制度",
    "provider": "目黒区 都市整備部 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "除却費用の50%以内、上限50万円",
    "summary": "倒壊のおそれがある木造住宅の、建替えを前提とした除却工事費を助成する。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "目黒区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.meguro.tokyo.jp/kenchiku/shigoto/kenchiku/jokyaku.html"
  },
  {
    "id": "meguro-taishin-kaishu",
    "name": "耐震改修助成制度（木造住宅）",
    "provider": "目黒区 都市整備部 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "工事費の80%以内、上限150万円（住民税非課税世帯は上限180万円）",
    "summary": "旧耐震の木造住宅の耐震改修工事費を助成する。",
    "eligibility": [
      "昭和56年（1981年）5月31日以前に建てられた在来軸組工法の住宅",
      "区に登録された施工業者による工事が原則",
      "工事契約前の仮受付が必要"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "目黒区"
    ],
    "period": "令和8年度（受付は令和8年11月30日まで）",
    "deadline": "2026-11-30",
    "url": "https://www.city.meguro.tokyo.jp/kenchiku/shigoto/kenchiku/kaishuu.html"
  },
  {
    "id": "meguro-taishin-sekkei",
    "name": "耐震改修設計助成制度",
    "provider": "目黒区 都市整備部 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "設計費用の50%以内、上限20万円（木造）",
    "summary": "木造住宅の耐震改修設計費用を助成する。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "目黒区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.meguro.tokyo.jp/kenchiku/shigoto/kenchiku/sekkei.html"
  },
  {
    "id": "meguro-taishin-shindan",
    "name": "耐震診断助成制度（木造）",
    "provider": "目黒区 都市整備部 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "診断費用の60%を助成（上限額は要確認）",
    "summary": "木造住宅の耐震診断費用を助成する。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "目黒区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.meguro.tokyo.jp/kenchiku/shigoto/kenchiku/shindan.html"
  },
  {
    "id": "meguro-taiyoko-chikuden",
    "name": "住宅用再生可能エネルギー設備設置費の助成（太陽光・蓄電システム）",
    "provider": "目黒区 環境保全課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光発電：1kWあたり3万円（上限15万円）。家庭用蓄電システム：設備本体価格の3分の1以下（上限7万円）",
    "summary": "個人や管理組合法人等が設置する太陽光発電システム・家庭用蓄電システムの費用を助成する。先着順で予算がなくなり次第終了。",
    "eligibility": [
      "令和8年1月1日〜12月31日に設置・引渡しが完了した設備",
      "蓄電池は蓄電システム登録済製品一覧に登録された製品",
      "申請時にすべての必要書類を提出（オンラインまたは郵送）"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "目黒区"
    ],
    "period": "受付：令和8年6月1日〜令和9年1月29日（先着順）",
    "deadline": "2027-01-29",
    "url": "https://www.city.meguro.tokyo.jp/kankyouhozen/kurashi/kankyou/taiyoukou.html"
  },
  {
    "id": "mitaka-shinene",
    "name": "新エネルギー・省エネルギー設備設置助成金（太陽光・蓄電池）",
    "provider": "三鷹市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "助成金",
    "amount": "太陽光は1kWあたり1万円（上限10万円）、蓄電池は5万円",
    "summary": "太陽光発電設備、蓄電池の設置費用を助成。",
    "eligibility": [
      "蓄電池は太陽光発電設備があり、環境共創イニシアチブ登録機種であること",
      "設置から12か月未満に申請"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "三鷹市"
    ],
    "period": "令和8年度（予算上限に達し受付終了。来年度は要確認）",
    "deadline": null,
    "url": "https://www.city.mitaka.lg.jp/c_service/118/118378.html"
  },
  {
    "id": "mitaka-taishin-kaishu",
    "name": "木造住宅耐震改修工事等助成制度",
    "provider": "三鷹市",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "費用の3分の1（障がい者世帯・高齢者世帯は2分の1）、耐震改修工事は上限50万円",
    "summary": "耐震診断で「倒壊する可能性がある」以上と判定された木造住宅の耐震改修工事等を助成。",
    "eligibility": [
      "診断結果が倒壊する可能性ありと判定"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "三鷹市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.mitaka.lg.jp/c_service/001/001355.html"
  },
  {
    "id": "mitaka-taishin-shindan",
    "name": "木造住宅耐震診断等助成制度",
    "provider": "三鷹市",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "診断費用の3分の2、上限10万円",
    "summary": "木造住宅の耐震診断費用を助成。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "三鷹市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.mitaka.lg.jp/c_service/001/001354.html"
  },
  {
    "id": "musashino-shoene",
    "name": "効率的なエネルギー活用推進助成制度（エネファーム・高断熱窓）",
    "provider": "武蔵野市 環境部",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "助成金",
    "amount": "エネファーム6万円。既設窓の断熱改修は10万円か費用の1/5相当額のうち低い額",
    "summary": "住宅の省エネ設備（燃料電池・窓の断熱改修）の費用を助成。",
    "eligibility": [
      "設置・改修完了から6か月以内に申請",
      "1世帯につき設備ごとに1回"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "武蔵野市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.musashino.lg.jp/gomi_kankyo/shoene_eco/joseiseido/1005095.html"
  },
  {
    "id": "musashino-solar",
    "name": "効率的なエネルギー活用推進助成制度（太陽光発電システム）",
    "provider": "武蔵野市 環境部",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "助成金",
    "amount": "15万円と「3万円×最大出力kW（上限5kW）」のうち低い額",
    "summary": "住宅への太陽光発電システム設置費用を助成。",
    "eligibility": [
      "設置完了から6か月以内に申請",
      "中古品・転売目的の設備は対象外"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "武蔵野市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.musashino.lg.jp/gomi_kankyo/shoene_eco/joseiseido/1005095.html"
  },
  {
    "id": "musashino-taishin",
    "name": "武蔵野市 住宅・建築物の耐震化助成",
    "provider": "武蔵野市 都市整備部 住宅対策課",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "要確認",
    "summary": "戸建住宅・共同住宅・マンションなど建物種類ごとの耐震化助成制度（金額・要件は要確認）。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "武蔵野市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.musashino.lg.jp/kurashi_guide/sumai_doro_suido/sumai/taishin_josei/index.html"
  },
  {
    "id": "nakano-hi-mokuzo-taishin",
    "name": "非木造住宅の耐震改修等助成",
    "provider": "中野区 都市基盤部 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "補助率3分の1、限度額7,500万円",
    "summary": "非木造住宅の補強設計・耐震補強・建替え/除却を助成する。",
    "eligibility": [
      "1981年5月31日以前に着工",
      "耐火・準耐火建築物であること"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中野区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.tokyo-nakano.lg.jp/machizukuri/kenchiku/taishin/0686114820240116114027656.html"
  },
  {
    "id": "nakano-mokuzo-shindan",
    "name": "木造住宅の耐震診断支援",
    "provider": "中野区 都市基盤部 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "区が派遣する耐震診断士による無料診断",
    "summary": "木造住宅の耐震診断を支援する（無料診断）。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中野区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.tokyo-nakano.lg.jp/machizukuri/kenchiku/taishin/taishinshindan.html"
  },
  {
    "id": "nakano-mokuzo-taishin-hokyo",
    "name": "木造住宅耐震補強工事助成",
    "provider": "中野区 都市基盤部 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "対象経費の2分の1、上限250万円",
    "summary": "木造住宅の耐震補強工事費を助成する。令和7年4月1日から新耐震木造住宅も助成開始。",
    "eligibility": [
      "2000年5月31日以前に建てられた木造在来工法の2階建て以下",
      "区の診断助成を事前に受けていること",
      "工事契約前に事前相談"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中野区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.tokyo-nakano.lg.jp/machizukuri/kenchiku/taishin/mokuzojyutaku-hokyo.html"
  },
  {
    "id": "nakano-shoene-setsubi",
    "name": "省エネルギー設備等の設置に係る費用の補助（断熱窓・給湯器等）",
    "provider": "中野区 環境課",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "令和8年度の額は要確認（令和5年度要綱：高断熱窓は対象経費の2分の1または15万円の少ない額、家庭用燃料電池は経費または10万円の少ない額）",
    "summary": "省エネ設備の設置費の一部を補助する。令和8年度からハイブリッド給湯器が新たに対象、高断熱ドアは対象外。",
    "eligibility": [
      "過去に補助を受けた設備は申請不可",
      "ハイブリッド給湯器は設置完了日が令和8年4月1日〜令和9年1月31日"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中野区"
    ],
    "period": "前期：令和8年5月15日〜／後期：令和8年11月30日〜令和9年2月28日（予算91,450,000円）",
    "deadline": "2027-02-28",
    "url": "https://www.city.tokyo-nakano.lg.jp/kurashi/kankyo/ondankataisaku/0686241120240301112636655.html"
  },
  {
    "id": "nakano-taiyoko-chikuden",
    "name": "省エネルギー設備等の設置に係る費用の補助（太陽光発電・蓄電システム）",
    "provider": "中野区 環境課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "令和8年度の額は要確認（令和5年度要綱：太陽光1戸あたり上限15万円、蓄電池上限10万円）",
    "summary": "太陽光発電システムと蓄電システムの設置費の一部を補助する。",
    "eligibility": [
      "蓄電池は蓄電容量4kWh以上で太陽光発電と連携（令和5年度要件）",
      "過去に補助を受けた設備は申請不可"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "中野区"
    ],
    "period": "前期：令和8年5月15日〜／後期：令和8年11月30日〜令和9年2月28日（太陽光・蓄電池の個別の期間は要確認）",
    "deadline": "2027-02-28",
    "url": "https://www.city.tokyo-nakano.lg.jp/kurashi/kankyo/ondankataisaku/0686241120240301112636655.html"
  },
  {
    "id": "nerima-carbon-neutral",
    "name": "令和8年度練馬区カーボンニュートラル化設備設置補助金",
    "provider": "練馬区 環境課",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "太陽光、エネファーム、エコキュート、高断熱窓・ドア、LED照明の設置費用を補助。",
    "eligibility": [
      "令和8年4月1日〜令和9年3月31日に設置完了した設備"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "練馬区"
    ],
    "period": "申請受付：令和8年4月15日〜令和9年3月31日",
    "deadline": "2027-03-31",
    "url": "https://www.city.nerima.tokyo.jp/kurashi/shigoto/kankyo/hojo.html"
  },
  {
    "id": "nerima-taishin-kaishu",
    "name": "住宅の耐震改修工事等の助成",
    "provider": "練馬区 防災まちづくり課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "助成率4分の3。上限は耐震改修工事130万円（総合支援170万円）、障害者手帳等のある方がいる住宅は200万円（総合支援240万円）",
    "summary": "昭和56年5月31日以前の建築物と、昭和56年6月〜平成12年5月31日の木造住宅の耐震改修工事等を助成。",
    "eligibility": [
      "木造は耐震診断の評点（Iw値）が1.0相当未満",
      "業者契約・診断等は交付決定後"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "練馬区"
    ],
    "period": "令和7年度に拡充と案内（令和8年度の期間は要確認）",
    "deadline": null,
    "url": "https://www.city.nerima.tokyo.jp/kurashi/sumai/takuchi/taishin/kodate.html"
  },
  {
    "id": "ota-enefarm",
    "name": "家庭用燃料電池（エネファーム）の設置助成",
    "provider": "大田区 環境対策課",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "新規設置20万円、更新設置10万円",
    "summary": "区内住宅へのエネファーム設置に対する助成（定額）。年間予算2,250万円に達し次第終了。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "大田区"
    ],
    "period": "令和8年4月1日〜令和9年3月31日",
    "deadline": "2027-03-31",
    "url": "https://www.city.ota.tokyo.jp/seikatsu/sumaimachinami/kankyou/josei/enefa-mujosei.html"
  },
  {
    "id": "ota-hi-mokuzo-taishin",
    "name": "非木造住宅の耐震診断・改修の費用の助成",
    "provider": "大田区 防災まちづくり課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "改修工事：費用の3分の2、限度額200万円（住宅の場合）",
    "summary": "非木造住宅の耐震診断・改修の費用を助成する。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "大田区"
    ],
    "period": "要確認（検索結果の記載年度は不明）",
    "deadline": null,
    "url": "https://www.city.ota.tokyo.jp/seikatsu/sumaimachinami/bousai_machidukuri/himoku_house.html"
  },
  {
    "id": "ota-manshon-taishin",
    "name": "マンションの耐震診断・改修の費用の助成",
    "provider": "大田区 防災まちづくり課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "改修工事：費用の2分の1、限度額4,000万円。設計：費用の3分の2、上限300万円",
    "summary": "分譲マンションの耐震診断・設計・改修の費用を助成する。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "大田区"
    ],
    "period": "要確認（検索結果の記載年度は不明）",
    "deadline": null,
    "url": "https://www.city.ota.tokyo.jp/seikatsu/sumaimachinami/bousai_machidukuri/manshon.html"
  },
  {
    "id": "ota-mokuzo-taishin",
    "name": "木造住宅の耐震診断・改修・除却の費用助成",
    "provider": "大田区 防災まちづくり課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "改修工事の助成限度額150万円（旧耐震の建物には75万円の枠もあるが令和7年度までの制度）。診断・除却の額は要確認",
    "summary": "木造住宅の耐震診断・改修・除却の費用を段階ごとに助成する。",
    "eligibility": [
      "契約は区の交付決定通知の後に行うこと"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "大田区"
    ],
    "period": "確認できた年度：令和7年度までの記載あり（令和8年度の期間は要確認）",
    "deadline": null,
    "url": "https://www.city.ota.tokyo.jp/seikatsu/sumaimachinami/bousai_machidukuri/mokudou.html"
  },
  {
    "id": "ota-reform-josei",
    "name": "住宅リフォーム助成事業",
    "provider": "大田区 住宅担当",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認（令和5年度資料では工事区分ごとに助成対象額の10%、上限20万円などの記載。最新は要確認）",
    "summary": "区内中小事業者が施工するリフォームの費用の一部を助成する。窓や壁の断熱改修、太陽光発電設備、蓄電池など環境配慮のリフォームも対象。",
    "eligibility": [
      "区内中小事業者の施工であること"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "大田区"
    ],
    "period": "確認できた年度：令和5年度（最新は要確認）",
    "deadline": null,
    "url": "https://www.city.ota.tokyo.jp/seikatsu/sumaimachinami/sumai/r_josei/index.html"
  },
  {
    "id": "setagaya-eco-jutaku",
    "name": "世田谷区エコ住宅補助金（断熱改修等）",
    "provider": "世田谷区 気候危機対策課",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "窓の断熱改修15,000円/1窓、高断熱ドア15,000円/1ドア、高断熱浴槽70,000円/1台、屋根の高反射改修（後期分から10万円）。最大20万円",
    "summary": "区内住民が区内事業者の施工で行う窓・ドア・浴槽・屋根の省エネ改修を助成する。太陽光・蓄電池・断熱材・断熱フィルムは令和8年度は対象外。",
    "eligibility": [
      "区内住民が区内の建物に対して区内事業者の施工で行う工事",
      "工事前の事前登録が必須"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "世田谷区"
    ],
    "period": "後期：令和8年10月1日〜令和9年1月31日（対象工事は令和8年9月1日〜完了分）",
    "deadline": "2027-01-31",
    "url": "https://www.city.setagaya.lg.jp/02240/31250.html"
  },
  {
    "id": "setagaya-mokuzo-taishin-56to12",
    "name": "木造住宅の耐震化支援（昭和56年6月〜平成12年5月に着工）",
    "provider": "世田谷区 防災街づくり課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "昭和56年6月〜平成12年5月に着工した木造住宅の耐震化を助成する。",
    "eligibility": [
      "昭和56年6月〜平成12年5月に着工した木造住宅",
      "個人所有であること",
      "助成金交付決定前の契約は対象外"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "世田谷区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.setagaya.lg.jp/02067/10906.html"
  },
  {
    "id": "setagaya-mokuzo-taishin-shinki56",
    "name": "木造住宅の耐震化支援（昭和56年5月31日までに着工）",
    "provider": "世田谷区 防災街づくり課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "旧耐震の木造住宅の補強設計・耐震改修工事・簡易改修工事などを助成する。",
    "eligibility": [
      "昭和56年5月31日以前に着工した木造住宅（地上2階以下）",
      "個人所有で住宅のまま改修すること",
      "助成金交付決定前の契約は対象外"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "世田谷区"
    ],
    "period": "令和8年度（木造住宅耐震改修助成の受付は令和8年12月28日まで）",
    "deadline": "2026-12-28",
    "url": "https://www.city.setagaya.lg.jp/02067/3893.html"
  },
  {
    "id": "shibuya-enefarm",
    "name": "家庭用燃料電池システム（エネファーム）設置助成金",
    "provider": "渋谷区 環境政策課",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "30万円",
    "summary": "家庭用燃料電池システムの設置を助成する。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "渋谷区"
    ],
    "period": "令和8年5月1日〜令和9年3月15日（予算に達し次第終了）",
    "deadline": "2027-03-15",
    "url": "https://www.city.shibuya.tokyo.jp/kankyo/kankyo/eco-kurashi/ene-farm.html"
  },
  {
    "id": "shibuya-ev-juden",
    "name": "電気自動車等用充電設備導入助成",
    "provider": "渋谷区 環境政策課",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "通常の充電設備は1基10万円。急速充電設備は機器本体価格等に基づく額（上限10万円と案内。詳細は要確認）",
    "summary": "EV・PHV用充電設備の設置費用の一部を助成する。新設のみ対象で、既存設備の交換は対象外。",
    "eligibility": [
      "区民、区内の中小企業者・個人事業者、区内の管理組合",
      "事前申請が必要（交付決定後に工事）",
      "区民は1基まで、事業者・管理組合は5基まで"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "渋谷区"
    ],
    "period": "令和8年5月1日〜令和9年3月15日（予算に達し次第終了）",
    "deadline": "2027-03-15",
    "url": "https://www.city.shibuya.tokyo.jp/kankyo/kankyo/eco-kurashi/evjuden_josei.html"
  },
  {
    "id": "shibuya-manshon-taishin",
    "name": "一般分譲マンションの耐震化支援事業",
    "provider": "渋谷区 木密・耐震整備課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "分譲マンションの耐震診断・補強設計・耐震改修工事の費用の一部を助成する。予算額に達すると終了。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "渋谷区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.shibuya.tokyo.jp/bosai/josei/taishinjosei/manshon.html"
  },
  {
    "id": "shibuya-mokuzo-shindan-consultant",
    "name": "木造住宅耐震診断コンサルタント派遣（無料）",
    "provider": "渋谷区 木密・耐震整備課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "無料（建築士を派遣して耐震診断）",
    "summary": "区内の木造住宅に建築士を無料で派遣し、耐震診断を行う。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "渋谷区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.shibuya.tokyo.jp/bosai/josei/taishinjosei/consultant.html"
  },
  {
    "id": "shibuya-mokuzo-taishin-kaishu",
    "name": "木造住宅耐震改修費用及び除却費用助成",
    "provider": "渋谷区 木密・耐震整備課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "区の耐震診断の結果が基準以下だった木造住宅の耐震改修費用・除却費用の一部を助成する。",
    "eligibility": [
      "昭和56年5月31日以前に着工された住宅",
      "個人の所有者で渋谷区に住民登録があること"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "渋谷区"
    ],
    "period": "原則 令和8年12月25日まで",
    "deadline": "2026-12-25",
    "url": "https://www.city.shibuya.tokyo.jp/kankyo/kenchiku/kenchiku-yushi/mokuzo.html"
  },
  {
    "id": "shibuya-saiene-denryoku",
    "name": "再生可能エネルギー電力利用促進助成【家庭向け】",
    "provider": "渋谷区 環境政策課",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "給付",
    "amount": "30,000ハチペイ",
    "summary": "家庭の電力を再生可能エネルギー100%由来の電力に切り替えた世帯に交付する。",
    "eligibility": [
      "今年度に切り替えた電力であること"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "渋谷区"
    ],
    "period": "令和8年度（詳細な期間は要確認）",
    "deadline": null,
    "url": "https://www.city.shibuya.tokyo.jp/kankyo/kankyo/eco-kurashi/RenewableEnergy.html"
  },
  {
    "id": "shinagawa-taishin-shien",
    "name": "耐震化支援事業（木造住宅の耐震改修助成）",
    "provider": "品川区 都市環境部",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修工事：戸建て等300万円まで、共同住宅450万円まで（区パンフレットの記載。令和9年度までの期間限定）。設計と工事を同時申請する総合支援メニューは戸建て等最大400万円。高齢者・障害者・要介護者等の世帯は助成率10分の10（要確認）",
    "summary": "平成12年5月31日以前に建築された木造2階以下の住宅の耐震改修を助成する。区の耐震診断は専門家派遣で自己負担なしとされている。",
    "eligibility": [
      "平成12年5月31日以前に建築された木造2階建て以下の住宅",
      "昭和56年6月1日〜平成12年5月31日の着工分は在来軸組工法に限る",
      "建物全体の補強が前提（部分的な工事は対象外）"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "品川区"
    ],
    "period": "令和8年4月1日〜令和8年12月4日",
    "deadline": "2026-12-04",
    "url": "https://www.city.shinagawa.tokyo.jp/PC/bosai/bosai2/jishin/hpg000012434.html"
  },
  {
    "id": "shinagawa-zerocarbon-chikudenchi",
    "name": "しながわゼロカーボンアクション助成（蓄電池システム）",
    "provider": "品川区 環境課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "1kWhあたり3万円、上限30万円（区民・中小企業者等向け予定100件、管理組合等向け予定10件）",
    "summary": "住宅等に蓄電池システムを設置する費用を助成する。",
    "eligibility": [
      "設置完了日が令和8年4月1日〜令和9年3月15日であること"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "品川区"
    ],
    "period": "令和8年5月25日〜令和9年3月15日",
    "deadline": "2027-03-15",
    "url": "https://www.city.shinagawa.tokyo.jp/PC/kankyo/kankyo-kankyo/kankyo-kankyo-zyosei/20250310125732.html"
  },
  {
    "id": "shinagawa-zerocarbon-taiyoko",
    "name": "しながわゼロカーボンアクション助成（太陽光発電システム）",
    "provider": "品川区 環境課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "区民・中小企業者等向け：1kWあたり5万円、上限20万円（予定100件）。管理組合等向け：1kWあたり5万円、上限50万円（予定10件）",
    "summary": "住宅等に太陽光発電システムを設置する費用を助成する。設置工事完了後に申請する。",
    "eligibility": [
      "設置完了日が令和8年4月1日〜令和9年3月15日であること"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "品川区"
    ],
    "period": "令和8年5月25日〜令和9年3月15日",
    "deadline": "2027-03-15",
    "url": "https://www.city.shinagawa.tokyo.jp/PC/kankyo/kankyo-kankyo/kankyo-kankyo-zyosei/20250310125732.html"
  },
  {
    "id": "shinagawa-zerocarbon-zev",
    "name": "しながわゼロカーボンアクション助成（ZEV購入）",
    "provider": "品川区 環境課",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "上限10万円（予定155件）",
    "summary": "電気自動車・プラグインハイブリッド車・燃料電池車・超小型モビリティの車両本体費またはリース料を助成する。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "品川区"
    ],
    "period": "令和8年度（ZEVの個別の申請期間は要確認。同助成全体は令和8年5月25日〜令和9年3月15日）",
    "deadline": null,
    "url": "https://www.city.shinagawa.tokyo.jp/PC/kankyo/kankyo-kankyo/kankyo-kankyo-zyosei/20250310125732.html"
  },
  {
    "id": "suginami-eco-dannetsu",
    "name": "エコ住宅促進助成（断熱材・断熱フィルム・雨水タンク）",
    "provider": "杉並区 環境課",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "断熱材：税抜経費の20%（上限15万円）、断熱フィルム：税抜経費の50%（上限4万円）（既存住宅のみ。雨水タンクは要確認）",
    "summary": "断熱材・断熱フィルム等の設置費を助成する。",
    "eligibility": [
      "既存住宅に限る"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "杉並区"
    ],
    "period": "令和8年4月10日〜令和9年2月26日（予算枠に達し次第終了）",
    "deadline": "2027-02-26",
    "url": "https://www.city.suginami.tokyo.jp/s103/24183.html"
  },
  {
    "id": "suginami-eco-ecocute",
    "name": "エコ住宅促進助成（エコキュート等・エネファーム）",
    "provider": "杉並区 環境課",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "エコキュート等の高効率給湯器やエネファームの設置費を助成する。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "杉並区"
    ],
    "period": "令和8年度（期間は手続き案内ページで要確認）",
    "deadline": null,
    "url": "https://www.city.suginami.tokyo.jp/s103/24172.html"
  },
  {
    "id": "suginami-eco-mado",
    "name": "エコ住宅促進助成（窓等断熱改修）",
    "provider": "杉並区 環境課",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "窓・ドア合計上限15万円（ガラス交換1枚2,000〜4,000円、内窓・外窓1か所4,000〜10,000円、ドア・引戸1か所10,000〜13,000円）",
    "summary": "窓・ドアの断熱改修費用を助成する。",
    "eligibility": [
      "工事完了日が令和8年2月1日〜令和9年1月31日",
      "同一世帯で耐用期間（10年）内は同種の申請不可"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "杉並区"
    ],
    "period": "令和8年4月10日〜令和9年2月26日（予算枠に達し次第終了）",
    "deadline": "2027-02-26",
    "url": "https://www.city.suginami.tokyo.jp/s103/24181.html"
  },
  {
    "id": "suginami-eco-taiyoko-chikuden",
    "name": "エコ住宅促進助成（太陽光発電システム・定置用リチウムイオン蓄電池）",
    "provider": "杉並区 環境課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：公称最大出力1kWあたり4万円、上限12万円。蓄電池：定額5万円",
    "summary": "太陽光発電システムと定置用リチウムイオン蓄電池の設置費を助成する。",
    "eligibility": [
      "蓄電池はSII登録機器で蓄電容量3kWh以上",
      "申請者・契約者・支払者が同一人",
      "未使用品であること"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "杉並区"
    ],
    "period": "令和8年4月10日〜令和9年2月26日（予算枠に達し次第終了）",
    "deadline": "2027-02-26",
    "url": "https://www.city.suginami.tokyo.jp/s103/24168.html"
  },
  {
    "id": "suginami-ev-juden",
    "name": "杉並区電気自動車用充電設備導入助成",
    "provider": "杉並区 環境課",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "機器本体価格の4分の1と国の補助上限額の低い方に工事費（上限1万円）を加えた額。上限：普通充電10万円、急速充電50万円",
    "summary": "EV用充電設備（V2H含む）の導入費を助成する。",
    "eligibility": [
      "区内の住民、建物所有者、中小企業者、分譲マンション管理組合等",
      "国の補助対象として指定された未使用の機器（リース除く）",
      "都の戸建住宅向け充電設備事業とは併用不可"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "杉並区"
    ],
    "period": "令和8年4月10日〜令和9年2月26日（予算枠に達し次第終了）",
    "deadline": "2027-02-26",
    "url": "https://www.city.suginami.tokyo.jp/s103/823.html"
  },
  {
    "id": "suginami-koreisha-jutaku-kaishu",
    "name": "高齢者住宅改修給付",
    "provider": "杉並区 高齢者担当",
    "level": "municipality",
    "category": "バリアフリー・介護",
    "type": "給付",
    "amount": "要確認",
    "summary": "高齢者の住宅改修に対する給付（内容は区ページで要確認）。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "杉並区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.suginami.tokyo.jp/s039/1153.html"
  },
  {
    "id": "suginami-mokuzo-jokyaku",
    "name": "【旧耐震基準】木造住宅等の除却に関する助成制度",
    "provider": "杉並区 市街地整備課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "旧耐震の木造住宅等の除却費用を助成する。一部の対象地域に限られる。",
    "eligibility": [
      "一部対象地域に限る"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "杉並区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.suginami.tokyo.jp/guide/sumai/taishin/1027987.html"
  },
  {
    "id": "suginami-mokuzo-taishin-kyu",
    "name": "【旧耐震基準】木造住宅等の耐震化に関する助成制度",
    "provider": "杉並区 市街地整備課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認（区パンフレット令和8年4月改訂版で確認）",
    "summary": "木造住宅の耐震診断・耐震改修費用の一部を助成する。簡易診断、精密診断、耐震改修の順に進める。",
    "eligibility": [
      "年度内に助成金振込まで完了するものが対象",
      "住宅修築資金融資あっせんとは併用不可"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "杉並区"
    ],
    "period": "令和8年度（耐震改修の申請受付は令和8年12月18日まで）",
    "deadline": "2026-12-18",
    "url": "https://www.city.suginami.tokyo.jp/s095/1922.html"
  },
  {
    "id": "suginami-mokuzo-taishin-shin",
    "name": "【新耐震基準】木造住宅の耐震化に関する助成制度",
    "provider": "杉並区 市街地整備課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認（区パンフレット令和8年4月改訂版で確認）",
    "summary": "木造住宅の耐震診断・耐震改修費用の一部を助成する。簡易診断、精密診断、耐震改修の順に進める。",
    "eligibility": [
      "年度内に助成金振込まで完了するものが対象",
      "住宅修築資金融資あっせんとは併用不可"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "杉並区"
    ],
    "period": "令和8年度（耐震改修の申請受付は令和8年12月18日まで）",
    "deadline": "2026-12-18",
    "url": "https://www.city.suginami.tokyo.jp/s095/1923.html"
  },
  {
    "id": "suginami-shelter",
    "name": "【旧耐震基準】木造住宅等の耐震シェルター等に関する助成制度",
    "provider": "杉並区 市街地整備課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "旧耐震の木造住宅の耐震シェルター等の設置費用を助成する。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "杉並区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.suginami.tokyo.jp/guide/sumai/taishin/1004991.html"
  },
  {
    "id": "tachikawa-taishin-mokuzo",
    "name": "木造住宅の耐震化助成制度",
    "provider": "立川市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震診断は費用の2分の1（限度10万円）、耐震改修は工事費の2分の1（限度100万円）",
    "summary": "旧耐震基準の木造住宅の耐震診断・耐震改修費用を助成。簡易耐震診断は無料。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "立川市"
    ],
    "period": "年度ごとの予算の範囲内（予算額に達した時点で終了）。最新年度は要確認",
    "deadline": null,
    "url": "https://www.city.tachikawa.lg.jp/kurashi/sumai/1002092/1002114.html"
  },
  {
    "id": "toshima-airconditioner-teishotoku",
    "name": "低所得世帯向けエアコン設置助成",
    "provider": "豊島区",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "低所得世帯のエアコン設置費用を助成する（内容は区ページで要確認）。",
    "eligibility": [
      "住民税非課税世帯、住民税均等割のみ世帯、または児童扶養手当受給世帯（区の案内PDFの記載）"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "豊島区"
    ],
    "period": "令和8年度",
    "deadline": null,
    "url": "https://www.city.toshima.lg.jp/164/kenko/sekatsu/2605191116.html"
  },
  {
    "id": "toshima-eco-mado-enefarm",
    "name": "豊島区エコ住宅普及促進費用助成金（断熱改修窓・エネファーム）",
    "provider": "豊島区 環境政策課",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "断熱改修窓：設置費用の4分の1（上限10万円）。エネファーム：一律8万円",
    "summary": "既存の単板ガラス窓を複層ガラスや二重窓に改修する費用、エネファームの設置費を助成する。",
    "eligibility": [
      "令和8年2月1日〜令和9年1月31日に施工完了"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "豊島区"
    ],
    "period": "令和8年5月25日〜令和9年3月1日必着",
    "deadline": "2027-03-01",
    "url": "https://www.city.toshima.lg.jp/149/machizukuri/shizen/ecojutaku/003402.html"
  },
  {
    "id": "toshima-eco-taiyoko-chikuden",
    "name": "豊島区エコ住宅普及促進費用助成金（太陽光発電・蓄電システム）",
    "provider": "豊島区 環境政策課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：出力1kWあたり2万円（上限8万円）。蓄電システム：1kWhあたり1万円（上限5万円）",
    "summary": "個人住宅の太陽光発電システム・蓄電システムの設置費を助成する。施工完了後に申請。",
    "eligibility": [
      "太陽光は出力1kW以上10kW未満で認証品",
      "蓄電は環境共創イニシアチブ登録機器で太陽光またはエネファームと常時接続",
      "同一世帯で同一年度内に機器ごと1回限り"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "豊島区"
    ],
    "period": "令和8年5月25日〜令和9年3月1日必着",
    "deadline": "2027-03-01",
    "url": "https://www.city.toshima.lg.jp/149/machizukuri/shizen/ecojutaku/003402.html"
  },
  {
    "id": "toshima-manshon-taishin",
    "name": "分譲マンションの耐震改修助成事業",
    "provider": "豊島区 住宅課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "分譲マンション管理組合の耐震改修費用を助成する。",
    "eligibility": [
      "管理組合"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "豊島区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.toshima.lg.jp/322/machizukuri/sumai/kekaku/mansion/020246.html"
  },
  {
    "id": "toshima-mokuzo-taishin-kaishu",
    "name": "木造住宅の耐震改修助成事業",
    "provider": "豊島区 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "工事費の3分の2、上限100万円（区内事業者施工の上乗せあり）。災害時要援護者が居住する場合は上限250万円（令和8年4月1日拡充）",
    "summary": "木造住宅の耐震改修工事費を助成する。",
    "eligibility": [
      "平成12年5月31日以前に建築された2階以下の木造住宅",
      "上部構造評点1.0以上となること",
      "東京都登録事務所の診断に基づく設計の工事"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "豊島区"
    ],
    "period": "令和8年度（工事は2月末まで）",
    "deadline": null,
    "url": "https://www.city.toshima.lg.jp/315/bosai/taisaku/kunotaisaku/bosai/002160.html"
  },
  {
    "id": "toshima-mokuzo-taishin-shindan",
    "name": "木造住宅の耐震診断助成事業",
    "provider": "豊島区 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "木造住宅の耐震診断費用を助成する。",
    "eligibility": [],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "豊島区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.toshima.lg.jp/315/bosai/taisaku/kunotaisaku/bosai/002186.html"
  },
  {
    "id": "toshima-shelter",
    "name": "耐震シェルター等設置助成事業",
    "provider": "豊島区 建築課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "上限60万円",
    "summary": "耐震シェルター、耐震ベッドの設置費用を助成する。",
    "eligibility": [
      "65歳以上または身体障害者手帳1級・2級の方のみの世帯"
    ],
    "prefectures": [
      "東京都"
    ],
    "cities": [
      "豊島区"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.toshima.lg.jp/315/bosai/taisaku/kunotaisaku/bosai/013316.html"
  },
  {
    "id": "kanagawa-jutaku-taiyoko-chikuden",
    "name": "令和8年度神奈川県住宅用太陽光発電・蓄電池導入費補助金",
    "provider": "神奈川県",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：出力1kWあたり7万円、蓄電システム：1台あたり15万円",
    "summary": "県内の戸建住宅（賃貸を除く）又は共同住宅への太陽光発電・蓄電システム導入費用の補助。",
    "eligibility": [
      "耐震性能を確保した住宅",
      "蓄電システムはSII登録製品",
      "本人申請（業者代行は不可）"
    ],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [],
    "period": "第1期受付終了、第2期は9月7日～9月30日（予算到達により締切の記載あり）",
    "deadline": "2026-09-30",
    "url": "https://www.pref.kanagawa.jp/docs/ap4/solar_home/taiyoukouchikudenchi.html"
  },
  {
    "id": "kawasaki-mokuzo-taishin-kaishu",
    "name": "川崎市木造住宅耐震改修助成制度",
    "provider": "川崎市",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "一般世帯は補助率4/5、建物全体の改修で上限130万円",
    "summary": "木造住宅の耐震改修費の助成。令和8年4月から平成12年5月以前に建築の木造住宅も対象に拡充。",
    "eligibility": [],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "川崎市"
    ],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "url": "https://www.city.kawasaki.jp/500/page/0000032250.html"
  },
  {
    "id": "kawasaki-taiyoko-chikudenchi",
    "name": "令和8年度 川崎市太陽光発電設備等設置費補助金",
    "provider": "川崎市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光（FIT非適用）：1kWあたり7万円（設置費用の1/2、上限28万円）、蓄電池：1kWhあたり10万円（上限70万円）",
    "summary": "個人住宅への太陽光発電設備・蓄電池の設置費の補助。",
    "eligibility": [
      "蓄電池は太陽光発電設備（2kW以上）との連系が必要"
    ],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "川崎市"
    ],
    "period": "令和8年4月24日～12月28日（予算状況により早期終了の可能性）",
    "deadline": "2026-12-28",
    "url": "https://www.city.kawasaki.jp/300/page/0000185300.html"
  },
  {
    "id": "sagamihara-kodate-jishin-taisaku",
    "name": "戸建住宅の地震対策支援（耐震診断・耐震改修）",
    "provider": "相模原市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修：工事費の1/2、上限115万円（高齢者世帯等は加算あり）",
    "summary": "旧耐震の戸建住宅の耐震診断・耐震改修、耐震シェルター・防災ベッドの設置の補助。",
    "eligibility": [
      "旧耐震基準の住宅"
    ],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "相模原市"
    ],
    "period": "確認できた年度：令和7年度は募集終了。令和8年度の募集は要確認",
    "deadline": null,
    "url": "https://www.city.sagamihara.kanagawa.jp/kurashi/1026529/bousai/1008801/1008815.html"
  },
  {
    "id": "sagamihara-shokihiyo-zero-solar",
    "name": "住宅用初期費用ゼロ太陽光発電設備等導入補助金",
    "provider": "相模原市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "蓄電池：補助対象経費の1/3（上限51万円）。太陽光分は要確認",
    "summary": "初期費用ゼロ型（事業者が設備を設置）の住宅用太陽光発電設備・蓄電池導入の補助。",
    "eligibility": [],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "相模原市"
    ],
    "period": "令和8年5月1日～令和9年1月29日（必着）",
    "deadline": "2027-01-29",
    "url": "https://www.city.sagamihara.kanagawa.jp/kurashi/1026489/kankyo/hojyo/1020272.html"
  },
  {
    "id": "sagamihara-smart-energy-shoreikin",
    "name": "住宅用スマートエネルギー設備等導入奨励金",
    "provider": "相模原市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光単体コース8万円、自家消費コース（蓄電池又はV2H）各20万円、ZEHコース30万円",
    "summary": "住宅への太陽光発電設備・蓄電池・V2H・ZEH導入の奨励金。",
    "eligibility": [
      "自家消費コースは太陽光との連系が必須"
    ],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "相模原市"
    ],
    "period": "令和8年度第1期は受付終了。第2期の奨励対象期間：令和8年10月1日～令和9年2月26日（申請期間は要確認）",
    "deadline": null,
    "url": "https://www.city.sagamihara.kanagawa.jp/kurashi/1026489/kankyo/hojyo/1008083.html"
  },
  {
    "id": "yokohama-kizon-dannetsu-kaishu",
    "name": "令和8年度 既存住宅断熱改修補助制度",
    "provider": "横浜市",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "既存住宅の断熱改修費用の補助制度。",
    "eligibility": [],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "横浜市"
    ],
    "period": "令和8年度（詳細は要確認）",
    "deadline": null,
    "url": "https://www.city.yokohama.lg.jp/kurashi/sumai-kurashi/jutaku/sien/shoene/event/r8kizondannetuhojo.html"
  },
  {
    "id": "yokohama-mokuzo-taishin-kaishu",
    "name": "横浜市木造住宅耐震改修促進事業",
    "provider": "横浜市 建築局",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "上限：一般世帯115万円、非課税世帯155万円（省エネ改修を併せて行う場合、別途最大100万円の加算）",
    "summary": "旧耐震等の木造個人住宅の耐震改修工事費の補助。",
    "eligibility": [
      "2000年5月末以前に着工した2階建以下の在来軸組構法の木造個人住宅",
      "耐震診断で上部構造評点が1.0未満",
      "所有者又は一親等以内の親族が改修後に居住"
    ],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "横浜市"
    ],
    "period": "令和8年4月1日から申請受付（完了実績報告の締切：令和9年2月26日）",
    "deadline": null,
    "url": "https://www.city.yokohama.lg.jp/business/bunyabetsu/kenchiku/bosai/taishin/hojokinshienseido/mokutai/mokukaishu/mokukaishu.html"
  },
  {
    "id": "yokosuka-jutaku-taishin",
    "name": "住宅の耐震診断補強工事補助事業",
    "provider": "横須賀市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認（令和8年度から自己負担額等が変更）",
    "summary": "木造住宅の耐震診断・耐震補強工事の補助。",
    "eligibility": [
      "平成12年5月末日以前に建築確認を得て着工した木造（軸組）戸建住宅",
      "市登録事業者による工事"
    ],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "横須賀市"
    ],
    "period": "診断：4月1日から電話受付、補強工事：5月11日から窓口受付（締切12月28日、定員に達し次第終了）",
    "deadline": "2026-12-28",
    "url": "https://www.city.yokosuka.kanagawa.jp/4840/sidouka/taisin.html"
  },
  {
    "id": "yokosuka-jutentaisaku-solar",
    "name": "令和8年度横須賀市重点対策加速化事業費補助金（個人 太陽光・蓄電池）",
    "provider": "横須賀市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：1kWあたり7万円。併用蓄電池：蓄電システム・工事費（税抜）の1/3",
    "summary": "個人住宅の太陽光発電設備と併用蓄電池の補助。家庭用蓄電池は予算到達により9月16日で受付停止。",
    "eligibility": [
      "蓄電池は太陽光と同時設置の場合のみ"
    ],
    "prefectures": [
      "神奈川県"
    ],
    "cities": [
      "横須賀市"
    ],
    "period": "太陽光：令和8年5月1日～令和9年1月15日",
    "deadline": "2027-01-15",
    "url": "https://www.city.yokosuka.kanagawa.jp/0870/kankyou_solar/jutentaisaku.html"
  },
  {
    "id": "niigata-iju-shienkin",
    "name": "移住支援金（東京圏からの移住）",
    "provider": "新潟県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "最大100万円＋α（単身は最大60万円）",
    "summary": "東京圏（条件不利地域を除く）から県内へ移住し、就業等した人に支給する。",
    "eligibility": [
      "東京圏から新潟県へ移住",
      "就業等をした人"
    ],
    "prefectures": [
      "新潟県"
    ],
    "cities": [],
    "period": "確認できた年度：不明（最新は要確認）",
    "deadline": null,
    "url": "https://www.pref.niigata.lg.jp/sec/shigototeijyu/1356915648577.html"
  },
  {
    "id": "niigata-kosodate-iju-shienkin",
    "name": "子育て世帯移住支援金",
    "provider": "新潟県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "最大50万円",
    "summary": "東京圏（条件不利地域を除く）から県内へ移住し、就業等した子育て世帯に支給する。",
    "eligibility": [
      "東京圏から新潟県へ移住する子育て世帯"
    ],
    "prefectures": [
      "新潟県"
    ],
    "cities": [],
    "period": "確認できた年度：令和6年度（最新は要確認）",
    "deadline": null,
    "url": "https://www.pref.niigata.lg.jp/sec/shigototeijyu/r6kosodateijyusiennkinn060401.html"
  },
  {
    "id": "niigata-taishin-sumaizukuri",
    "name": "耐震すまいづくり支援事業",
    "provider": "新潟県",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "補助額は各市町村の要綱による（要確認）",
    "summary": "市町村と協調して、木造住宅の耐震診断・耐震改修、高齢者等のいる世帯の部分耐震改修・シェルター設置等を補助する。",
    "eligibility": [
      "昭和56年5月31日以前に建築された木造住宅",
      "申請は市町村を通じて行う"
    ],
    "prefectures": [
      "新潟県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.niigata.lg.jp/sec/jutaku/1356787010851.html"
  },
  {
    "id": "niigata-yukiguni-zeh",
    "name": "新潟県雪国型ZEH等導入促進補助金",
    "provider": "新潟県",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "雪国型ZEH等の導入を促進する補助金。",
    "eligibility": [],
    "prefectures": [
      "新潟県"
    ],
    "cities": [],
    "period": "確認できた年度：令和7年度（申請受付終了。最新は要確認）",
    "deadline": null,
    "url": "https://www.pref.niigata.lg.jp/sec/kankyoseisaku/0583945.html"
  },
  {
    "id": "niigata-city-saiene",
    "name": "住宅用再生可能エネルギー等導入促進事業補助金",
    "provider": "新潟市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光2万円/kW（上限10万円）、定置用蓄電池1万円/kWh（上限10万円）、燃料電池定額5万円",
    "summary": "市内住宅への太陽光発電設備、定置用蓄電池、燃料電池の導入費を補助する。予算上限に達した場合は抽選。",
    "eligibility": [
      "太陽光は主に自家消費し余剰のみ売電するもの"
    ],
    "prefectures": [
      "新潟県"
    ],
    "cities": [
      "新潟市"
    ],
    "period": "令和8年度（令和8年4月16日から予算上限まで）",
    "deadline": null,
    "url": "https://www.city.niigata.lg.jp/kurashi/kankyo/datutanso/shien/saiene2026.html"
  },
  {
    "id": "toyama-iju-shienkin",
    "name": "移住支援金",
    "provider": "富山県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "単身60万円・世帯100万円（年度不明の県資料。要確認）",
    "summary": "東京圏から県内へ移住し就業等した人への移住支援金。",
    "eligibility": [],
    "prefectures": [
      "富山県"
    ],
    "cities": [],
    "period": "確認できた年度：不明（最新は要確認）",
    "deadline": null,
    "url": "https://www.pref.toyama.jp/documents/4163/01349908.pdf"
  },
  {
    "id": "toyama-koseino-jutaku",
    "name": "富山型高性能住宅推進事業費補助金",
    "provider": "富山県",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "高性能住宅の新築等への補助。",
    "eligibility": [
      "新築は令和7年4月15日以降の着手が対象"
    ],
    "prefectures": [
      "富山県"
    ],
    "cities": [],
    "period": "確認できた年度：令和7年度（最新は要確認）",
    "deadline": null,
    "url": "https://www.pref.toyama.jp/1507/kurashi/seikatsu/sumai/shoene/kouseinou.html"
  },
  {
    "id": "toyama-city-solar-battery",
    "name": "富山市太陽光発電設備及び蓄電池導入促進補助金",
    "provider": "富山市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "蓄電池は補助対象経費の3分の1が基本。子育て・若年夫婦世帯は最大8万円上乗せ（市内事業者の場合）。太陽光の単価は要確認",
    "summary": "住宅への太陽光発電設備と蓄電池の導入費用を補助する。",
    "eligibility": [
      "自己所有は太陽光と蓄電池の同時設置が要件",
      "現地調査後・契約前に申請"
    ],
    "prefectures": [
      "富山県"
    ],
    "cities": [
      "富山市"
    ],
    "period": "令和8年度（令和8年5月1日〜11月27日、先着順）",
    "deadline": "2026-11-27",
    "url": "https://www.city.toyama.lg.jp/kurashi/gomi/1010252/1013030.html"
  },
  {
    "id": "ishikawa-iju-shien",
    "name": "いしかわ移住支援事業",
    "provider": "石川県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "世帯100万円、単身60万円",
    "summary": "東京23区に5年以上在住または通勤した人が県内に移住し、対象法人に就業した場合などに支給する。",
    "eligibility": [
      "東京23区に5年以上在住または通勤",
      "移住支援金対象法人に就業"
    ],
    "prefectures": [
      "石川県"
    ],
    "cities": [],
    "period": "令和8年度（予算上限に達すると期限前に終了）",
    "deadline": null,
    "url": "https://www.pref.ishikawa.lg.jp/roudou/ilac/izyushienkin.html"
  },
  {
    "id": "ishikawa-jutaku-taishinka",
    "name": "石川県住宅耐震化促進事業",
    "provider": "石川県",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修補助費（補強計画を含む）定額210万円（令和7年7月から）",
    "summary": "昭和56年以前の住宅の耐震改修を県と市町で補助する。能登半島地震の被災住宅も対象。",
    "eligibility": [
      "1981（昭和56）年以前に建てられた住宅"
    ],
    "prefectures": [
      "石川県"
    ],
    "cities": [],
    "period": "確認できた年度：令和7年度〜（令和8年度の要件は要確認）",
    "deadline": null,
    "url": "https://www.pref.ishikawa.lg.jp/kenju/taishinportal/taishin_hojo.html"
  },
  {
    "id": "ishikawa-sumai-shoene",
    "name": "住まいの省エネ促進事業費補助金",
    "provider": "石川県",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "省エネ住宅の新築に対する補助。子育て・若年夫婦世帯への加算がある。",
    "eligibility": [
      "子育て・若年夫婦世帯は加算"
    ],
    "prefectures": [
      "石川県"
    ],
    "cities": [],
    "period": "令和8年度",
    "deadline": null,
    "url": "https://www.pref.ishikawa.lg.jp/ontai/pp/zehhojyo8.html"
  },
  {
    "id": "kanazawa-soene-shoene-setsubi",
    "name": "創エネ・省エネ・蓄エネ設備設置費補助",
    "provider": "金沢市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光5万円（HEMS設置が条件）、蓄電システム10万円（太陽光と同時で合計15万円）、エネファーム5万円、ハイブリッド給湯器4万円",
    "summary": "住宅への太陽光、蓄電システム、エネファーム、ハイブリッド給湯器等の設置費を補助する。",
    "eligibility": [
      "蓄電システムは蓄電容量2kWh以上"
    ],
    "prefectures": [
      "石川県"
    ],
    "cities": [
      "金沢市"
    ],
    "period": "令和8年度（保証開始日から30日以内または3月31日のいずれか早い日）",
    "deadline": null,
    "url": "https://www4.city.kanazawa.lg.jp/soshikikarasagasu/zeroc/ondankataisaku/ippankateimukehojokin/7434.html"
  },
  {
    "id": "kanazawa-taishin-mokuzo",
    "name": "既存建築物耐震改修工事費等補助制度（木造住宅）",
    "provider": "金沢市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "一戸建て木造の改修補助限度額280万円（令和7年7月に増額）",
    "summary": "昭和56年5月31日以前の木造住宅の耐震診断・設計・改修工事費の一部を補助する。",
    "eligibility": [
      "昭和56年5月31日以前に建築された木造住宅（地上3階以下）",
      "工事前に交付申請"
    ],
    "prefectures": [
      "石川県"
    ],
    "cities": [
      "金沢市"
    ],
    "period": "令和8年度（数値は案内ページで表記差あり、要確認）",
    "deadline": null,
    "url": "https://www4.city.kanazawa.lg.jp/soshikikarasagasu/kenchikushidoka/yokuarushitsumon/3107.html"
  },
  {
    "id": "fukui-eco-happiness",
    "name": "ふくいエコはぴねす住宅推進事業補助金",
    "provider": "福井県",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "新築10万円（枠により20万円）、既存住宅の省エネ改修は全体改修50万円・ゾーン改修20万円・部分改修5万円",
    "summary": "県独自基準の省エネ住宅の新築・省エネ改修費を定額補助する。",
    "eligibility": [
      "ふくいエコはぴねす住宅の認証を受けること",
      "令和8年3月19日以降に契約した住宅"
    ],
    "prefectures": [
      "福井県"
    ],
    "cities": [],
    "period": "令和8年度（令和9年2月28日まで予定、予算上限で終了）",
    "deadline": "2027-02-28",
    "url": "https://www.pref.fukui.lg.jp/doc/kenchikujyuutakuka/ecohaphojo.html"
  },
  {
    "id": "fukui-mokuzo-taishin",
    "name": "木造住宅の耐震化に関する補助制度",
    "provider": "福井県",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "一般住宅の耐震改修は最大175万円（市町により上限が異なる）、一般診断は自己負担最大5千円",
    "summary": "昭和56年5月31日以前に着工された戸建て木造住宅の耐震診断・耐震改修を補助する。窓口は市町。",
    "eligibility": [
      "昭和56年5月31日以前に着工された戸建て木造住宅"
    ],
    "prefectures": [
      "福井県"
    ],
    "cities": [],
    "period": "確認できた年度：令和7年度以前（最新は要確認）",
    "deadline": null,
    "url": "https://www.pref.fukui.lg.jp/doc/kenchikujyuutakuka/mokuzoutaishinkaisyuu.html"
  },
  {
    "id": "fukui-sumitsuzukeru",
    "name": "住み続ける福井支援事業",
    "provider": "福井県",
    "level": "prefecture",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "空き家の購入とリフォームで最大150万円（合計）、旧耐震住宅の建替えは最大30万円",
    "summary": "子育て世帯や移住者などが空き家を購入・改修する費用等を補助する。市町が窓口で内容は市町で異なる。",
    "eligibility": [
      "市町が定める区域内"
    ],
    "prefectures": [
      "福井県"
    ],
    "cities": [],
    "period": "確認できた年度：令和7年度（最新は要確認）",
    "deadline": null,
    "url": "https://www.pref.fukui.lg.jp/doc/kenchikujyuutakuka/sumaishien.html"
  },
  {
    "id": "shizuoka-taishin-hokyo-keikaku",
    "name": "木造住宅耐震補強助成事業（補強計画一体型）",
    "provider": "静岡県",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "補助額は市町により異なる（要確認）",
    "summary": "昭和56年5月以前に建てられた木造住宅の耐震補強計画の策定と耐震改修に対し、実施する市町を通じて助成する。令和8年度から事業名を「TOUKAI－0＋（プラス）」とし、減災化対策も対象に加えた。",
    "eligibility": [
      "昭和56年5月以前に建てられた木造住宅"
    ],
    "prefectures": [
      "静岡県"
    ],
    "cities": [],
    "period": "令和8年度（受付は市町ごとに要確認）",
    "deadline": null,
    "url": "https://www.pref.shizuoka.jp/kurashikankyo/kenchiku/taishinka/1041569/1041773/1041775/1049098/1041788.html"
  },
  {
    "id": "shizuoka-taishin-senmonka-shindan",
    "name": "わが家の専門家診断事業（専門家による無料耐震診断）",
    "provider": "静岡県",
    "level": "prefecture",
    "category": "耐震",
    "type": "助成金",
    "amount": "無料診断（市町が実施。詳細は要確認）",
    "summary": "木造の既存住宅に耐震診断補強相談士を派遣して耐震診断を行う。実施する市町に県が助成し、申込みは市町の窓口で受け付ける。",
    "eligibility": [
      "木造の既存住宅"
    ],
    "prefectures": [
      "静岡県"
    ],
    "cities": [],
    "period": "要確認（浜松市では令和8年度で無料診断は終了予定との案内あり）",
    "deadline": null,
    "url": "https://www.pref.shizuoka.jp/kurashikankyo/kenchiku/taishinka/1041569/1041773/1041775/1049098/1041785.html"
  },
  {
    "id": "hamamatsu-taishin-hokyo",
    "name": "木造住宅耐震補強助成事業",
    "provider": "浜松市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "上限115万円（掲載時期が古く令和8年度の金額は要確認）",
    "summary": "昭和56年5月31日以前の木造住宅の耐震補強計画の策定と耐震改修工事を助成する。",
    "eligibility": [
      "昭和56年5月31日以前に建てられた木造住宅",
      "1敷地につき1棟",
      "市の施工事業者名簿登録業者に依頼"
    ],
    "prefectures": [
      "静岡県"
    ],
    "cities": [
      "浜松市"
    ],
    "period": "確認できた年度：不明（最新は要確認）",
    "deadline": null,
    "url": "https://www.city.hamamatsu.shizuoka.jp/kensido/home_tochi/home/kensido/taisin/jigyou_03.html"
  },
  {
    "id": "aichi-jutaku-ondanka-setsubi",
    "name": "愛知県住宅用地球温暖化対策設備導入促進費補助金（市町村との協調補助）",
    "provider": "愛知県",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "要確認（県の補助額は国の補助額とは異なる）",
    "summary": "蓄電池、電気自動車等充給電設備（V2H）、太陽熱利用システム、断熱窓改修などを導入する個人に、市町村を通じて経費の一部を補助する。普通充電設備・急速充電設備は対象外。",
    "eligibility": [
      "協調補助を実施している市町村の住民",
      "対象設備は一覧のもの（令和8年7月21日時点）"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [],
    "period": "令和8年度（市町村ごとに要確認）",
    "deadline": null,
    "url": "https://www.pref.aichi.jp/soshiki/ondanka/0000004471.html"
  },
  {
    "id": "aichi-jutaku-taishin",
    "name": "住宅・建築物の耐震診断・耐震改修の補助制度（市町村実施）",
    "provider": "愛知県",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "市町村ごとに異なる（要確認）",
    "summary": "木造住宅の無料耐震診断や耐震補強設計・改修への補助。実施主体は市町村で、県が案内している。",
    "eligibility": [
      "市町村の要件による"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.aichi.jp/soshiki/jutakukeikaku/0000025466.html"
  },
  {
    "id": "nagoya-jutaku-datsutanso",
    "name": "住宅等の脱炭素化促進補助",
    "provider": "名古屋市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光（一体的導入）築10年以内2万円/kW・築10年超3万円/kW（上限9.99kW）、蓄電システム1万5千円/kWh（上限10kWh）",
    "summary": "住宅への太陽光発電設備、蓄電システム、ZEH等の導入費用を補助する。令和8年10月5日に蓄電システムの受付は予算到達で終了。",
    "eligibility": [
      "市内の住宅に居住する個人など",
      "戸建は「なごや太陽光倶楽部」への入会申請が必要"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "名古屋市"
    ],
    "period": "令和8年度（対象は令和8年4月1日〜令和9年2月12日に設置・引渡し完了したもの。蓄電システムは受付終了）",
    "deadline": null,
    "url": "https://www.city.nagoya.jp/kurashi/kankyou/1012424/1012443/1012445.html"
  },
  {
    "id": "nagoya-taishin-kaishu",
    "name": "木造住宅耐震改修助成",
    "provider": "名古屋市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "工事費の5分の4以内。一般改修は一般世帯115万円・非課税世帯165万円が上限（段階的改修は別額）",
    "summary": "無料耐震診断で判定値1.0未満（段階的改修は0.7未満）の木造住宅の耐震改修工事費を助成する。",
    "eligibility": [
      "昭和56年5月31日以前に着工された2階建て以下の住宅",
      "無料耐震診断で判定値1.0未満",
      "交付決定後に契約・着手"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "名古屋市"
    ],
    "period": "受付は4月から翌年1月末まで（確認できた年度は不明、最新は要確認）",
    "deadline": null,
    "url": "https://www.city.nagoya.jp/kurashi/juutaku/1014710/1014649/1034739/1014652/1034014.html"
  },
  {
    "id": "nagoya-taishin-shelter",
    "name": "耐震シェルター・防災ベッドの設置助成",
    "provider": "名古屋市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "補助対象経費の2分の1以内で30万円以内（非課税世帯は4分の3、45万円以内）",
    "summary": "耐震シェルターや防災ベッドの設置費用を助成する。",
    "eligibility": [],
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "名古屋市"
    ],
    "period": "確認できた年度：不明（最新は要確認）",
    "deadline": null,
    "url": "https://www.city.nagoya.jp/kurashi/category/15-14-9-7-0-0-0-0-0-0.html"
  },
  {
    "id": "nagoya-zev-kounyu",
    "name": "ゼロエミッション車の購入補助金",
    "provider": "名古屋市",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "電気自動車10万円（外部給電機能が必要）",
    "summary": "電気自動車・PHV・燃料電池自動車の購入補助。個人向けで事業者は対象外。令和8年度分は受付終了と案内されている。",
    "eligibility": [
      "外部給電機能を備えた車両",
      "個人（事業者は対象外）"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "名古屋市"
    ],
    "period": "令和8年度（受付終了）",
    "deadline": null,
    "url": "https://www.city.nagoya.jp/shisei/keikaku/1008387/1008424/1008431/1046948.html"
  },
  {
    "id": "okazaki-jisedai-jidosha",
    "name": "次世代自動車の購入費補助",
    "provider": "岡崎市",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "BEVまたはPHEV 35万円",
    "summary": "電気自動車・プラグインハイブリッド車の購入費を補助する。",
    "eligibility": [
      "個人は市内に180日以上居住などの要件あり"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "岡崎市"
    ],
    "period": "令和8年度（詳細は要確認）",
    "deadline": null,
    "url": "https://www.city.okazaki.lg.jp/kurashi/gomi/1002338/1002481/1011421.html"
  },
  {
    "id": "okazaki-ondanka-setsubi",
    "name": "岡崎市地球温暖化対策設備設置費補助金",
    "provider": "岡崎市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "住宅用太陽光は上限63万円、蓄電システムは上限35万円（重点対策加速化事業活用型）・15万円（岡崎産再エネ電気活用型）・2万円（一般型）",
    "summary": "住宅への太陽光発電や蓄電システムなど地球温暖化対策設備の設置費用を補助する。",
    "eligibility": [
      "太陽光は発電量の30％以上を自家消費",
      "発電量の記録を3年間提出"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "岡崎市"
    ],
    "period": "令和8年度（予算残額は要確認）",
    "deadline": null,
    "url": "https://www.city.okazaki.lg.jp/1100/1108/1156/p043395.html"
  },
  {
    "id": "toyota-eco-family",
    "name": "豊田市エコファミリー支援補助金",
    "provider": "豊田市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "要確認",
    "summary": "太陽光、蓄電池またはV2H、HEMSの一体導入のほか、蓄電池・燃料電池の単独導入、外部給電対応の次世代自動車購入に補助する。",
    "eligibility": [
      "太陽光とHEMSだけの単独申請は不可",
      "燃料電池は「とよたゼロカーボンバンク」等への入会が必要"
    ],
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊田市"
    ],
    "period": "令和8年度（住宅編：2026年4月1日〜2027年3月1日）",
    "deadline": "2027-03-01",
    "url": "https://www.city.toyota.aichi.jp/kurashi/kankyou/hojokin/1023875.html"
  },
  {
    "id": "toyota-jutaku-shoene-kaishu",
    "name": "住宅省エネ改修補助制度",
    "provider": "豊田市",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "既存住宅の断熱改修への補助。予算上限に達して受付終了と案内されている。",
    "eligibility": [],
    "prefectures": [
      "愛知県"
    ],
    "cities": [
      "豊田市"
    ],
    "period": "確認できた年度：不明（受付終了）",
    "deadline": null,
    "url": "https://www.city.toyota.aichi.jp/kurashi/kankyou/hojokin/1058157.html"
  },
  {
    "id": "mie-ev-donyu-r8",
    "name": "令和8年度電気自動車等導入費補助金",
    "provider": "三重県",
    "level": "prefecture",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "要確認（市町ごとに異なる）",
    "summary": "電気自動車・プラグインハイブリッド車・燃料電池自動車を購入した人に対し、市町の補助に県が上乗せして支援する。",
    "eligibility": [
      "補助対象車両・要件は市町ごとに異なる"
    ],
    "prefectures": [
      "三重県"
    ],
    "cities": [],
    "period": "令和8年度（市町ごとのため要確認）",
    "deadline": null,
    "url": "https://www.pref.mie.lg.jp/EARTH/HP/m0056200251.htm"
  },
  {
    "id": "mie-taishin-hokyo-kouji",
    "name": "木造住宅の耐震補強工事補助",
    "provider": "三重県 住宅課（市町が窓口）",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "国の補助は耐震補強工事費の40%（上限57.5万円）。県は、市町の補助額から国の補助を除いた額の半分かつ50万円以内を負担。市町ごとに上限額が異なる",
    "summary": "診断で倒壊可能性が高いとされた木造住宅の耐震補強工事費を、国・県・市町が補助する。県の補助は市町の事業に対する支援で、市町が事業を実施している場合に利用できる。",
    "eligibility": [
      "昭和56年5月31日以前に建築（着工を含む）された木造住宅で、階数が3階以下",
      "耐震診断で倒壊の可能性が高いと判定された住宅",
      "お住まいの市町が補助事業を実施していること"
    ],
    "prefectures": [
      "三重県"
    ],
    "cities": [],
    "period": "令和8年度から地区要件が廃止された（受付期間は市町ごとのため要確認）",
    "deadline": null,
    "url": "https://www.pref.mie.lg.jp/JUTAKU/HP/35936031381.htm"
  },
  {
    "id": "mie-taishin-reform",
    "name": "耐震：木造住宅のリフォーム工事補助",
    "provider": "三重県 住宅課（市町が窓口）",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "リフォーム工事費の1/3、上限20万円",
    "summary": "木造住宅の耐震補強工事と同時に行うリフォーム工事の費用を補助する。",
    "eligibility": [
      "耐震補強工事と同時に行うリフォーム工事",
      "お住まいの市町が補助事業を実施していること"
    ],
    "prefectures": [
      "三重県"
    ],
    "cities": [],
    "period": "要確認（市町ごと）",
    "deadline": null,
    "url": "https://www.pref.mie.lg.jp/JUTAKU/HP/65471031383.htm"
  },
  {
    "id": "mie-taishin-sekkei",
    "name": "木造住宅の耐震補強設計補助",
    "provider": "三重県 住宅課（市町が窓口）",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "県の負担は上限9万円（精密診断法による設計は上乗せあり）。市町ごとに異なるため要確認",
    "summary": "木造住宅の耐震補強設計にかかる費用を、国・県・市町が補助する。市町の事業に県が支援する形で実施される。",
    "eligibility": [
      "昭和56年5月31日以前に建築された木造住宅",
      "お住まいの市町が補助事業を実施していること"
    ],
    "prefectures": [
      "三重県"
    ],
    "cities": [],
    "period": "要確認（市町ごと）",
    "deadline": null,
    "url": "https://www.pref.mie.lg.jp/JUTAKU/HP/45084031384.htm"
  },
  {
    "id": "mie-taishin-shindan",
    "name": "木造住宅の耐震診断支援制度",
    "provider": "三重県 住宅課（市町が窓口）",
    "level": "prefecture",
    "category": "耐震",
    "type": "助成金",
    "amount": "耐震診断の費用は無料（国・県・市町が費用を分担）",
    "summary": "昭和56年5月31日以前に建築された木造住宅の耐震診断を、無料で受けられる制度。市町が受付窓口になる。",
    "eligibility": [
      "昭和56年5月31日以前に建築（着工を含む）された木造住宅",
      "階数が3階以下"
    ],
    "prefectures": [
      "三重県"
    ],
    "cities": [],
    "period": "要確認（市町ごと）",
    "deadline": null,
    "url": "https://www.pref.mie.lg.jp/JUTAKU/HP/35935031380.htm"
  },
  {
    "id": "mie-taiyoko-kojin",
    "name": "令和8年度三重県太陽光発電設備等設置費（個人向け）補助金",
    "provider": "三重県 地球温暖化対策課（市町が実施）",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "要確認（市町ごとに異なる）",
    "summary": "個人が住宅に設置する太陽光発電設備と、これに付帯する蓄電池の費用を補助する。県は市町の補助に加わる形で支援し、令和8年度は27市町が実施予定。",
    "eligibility": [
      "FIT制度・FIP制度の認定を取得しないこと",
      "発電量の30%以上を自家消費すること",
      "細かな条件は市町ごとに異なる"
    ],
    "prefectures": [
      "三重県"
    ],
    "cities": [],
    "period": "令和8年度（受付期間は市町ごとのため要確認）",
    "deadline": null,
    "url": "https://www.pref.mie.lg.jp/EARTH/HP/m0056200187.htm"
  },
  {
    "id": "shiga-ev-phv-fcv-r7",
    "name": "次世代自動車（EV・PHV・FCV）の購入および電気自動車等用の充電設備の設置への補助",
    "provider": "滋賀県",
    "level": "prefecture",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "個人向け：EV 10万円、PHV 10万円、FCV 20万円（令和7年度）",
    "summary": "EV・PHV・FCVの購入と、電気自動車等用の充電設備の設置に対する補助。",
    "eligibility": [
      "予算額を超える申請があった時点で受付終了"
    ],
    "prefectures": [
      "滋賀県"
    ],
    "cities": [],
    "period": "確認できた年度：令和7年度（申請受付は令和8年2月13日まで）。令和8年度は要確認",
    "deadline": null,
    "url": "https://www.pref.shiga.lg.jp/kensei/koho/e-shinbun/bosyuu/331830.html"
  },
  {
    "id": "shiga-smart-lifestyle-r8",
    "name": "令和8年度スマート・ライフスタイル普及促進事業補助金",
    "provider": "滋賀県 CO2ネットゼロ推進課",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光発電：7万円/kW・上限30万円、蓄電池：上限30万円、V2H：4万円、断熱改修：補助率1/3・上限120万円（専用住宅のみ）",
    "summary": "既存住宅への太陽光発電、蓄電池、V2H、断熱改修、高効率給湯器など再エネ・省エネ設備の導入費用を補助する。申請受付は淡海環境保全財団。",
    "eligibility": [
      "太陽光はFIT・FIPの事業計画認定を受けない場合などの条件あり",
      "蓄電池は太陽光発電システムと同時設置する場合などが条件",
      "断熱改修は専用住宅のみ"
    ],
    "prefectures": [
      "滋賀県"
    ],
    "cities": [],
    "period": "令和8年度（予算に達し次第終了のおそれ。受付期限は要確認）",
    "deadline": null,
    "url": "https://www.pref.shiga.lg.jp/ippan/kankyoshizen/ondanka/349713.html"
  },
  {
    "id": "shiga-taishin-mokuzo",
    "name": "木造住宅の耐震診断（無料）および耐震改修の補助制度",
    "provider": "滋賀県 住宅課（市町が窓口）",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "市町が適用する国の制度メニューにより異なる（例：補助対象経費の80%・上限115万円、または23%・上限97.86万円）。市町ごとに要確認",
    "summary": "昭和56年6月以前に着工した木造住宅の耐震診断（無料）と、耐震性が不足する住宅の改修への補助。主要道路沿い、高齢者世帯、子育て世帯などには割増補助がある場合がある。",
    "eligibility": [
      "昭和56年6月以前に建築に着工した木造住宅",
      "申込みは市町の窓口",
      "市町の補助を使うには県の名簿に登録された事業者が施工すること"
    ],
    "prefectures": [
      "滋賀県"
    ],
    "cities": [],
    "period": "要確認（市町ごと）",
    "deadline": null,
    "url": "https://www.pref.shiga.lg.jp/ippan/kendoseibi/zyuutaku/317612.html"
  },
  {
    "id": "shiga-zeh-shinchiku-r8",
    "name": "令和8年度「しがZEH新築支援事業費補助金」",
    "provider": "滋賀県 住宅課",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "基礎額20万円。加算メニューの組み合わせで最大120万円（県外在住の子育て世帯・若者夫婦世帯が北部地域へ移住する場合は30万円加算）",
    "summary": "ZEH（ネット・ゼロ・エネルギー・ハウス）の新築に対して補助する。住宅を新築する人や滋賀への移住を検討する人も対象になりうる。",
    "eligibility": [
      "ZEHの新築",
      "移住加算は県外在住の子育て世帯・若者夫婦世帯が北部地域へ移住する場合"
    ],
    "prefectures": [
      "滋賀県"
    ],
    "cities": [],
    "period": "交付申請の予約期限：令和8年11月30日",
    "deadline": "2026-11-30",
    "url": "https://www.pref.shiga.lg.jp/ippan/kendoseibi/zyuutaku/348818.html"
  },
  {
    "id": "kyoto-kateimuke-taiyoko-r8",
    "name": "家庭向け太陽光発電・蓄電設備補助金（令和8年度）",
    "provider": "京都府（市町村と連携して実施）",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "FIT売電可のコース：太陽光1万円/kW（上限4万円）、蓄電池1万円/kWh（上限5万円）。FIT売電不可のコース：太陽光4万円/kW（上限16万円）、蓄電池4万円/kWh（上限24万円）。太陽光と蓄電池を同時に導入する場合のみ対象",
    "summary": "自家消費型の太陽光発電と蓄電池を同時に導入する家庭に対し、市町村と連携して補助する。申請窓口は京都市や府内の各市町村。",
    "eligibility": [
      "太陽光発電設備と蓄電池を同時に導入すること",
      "申請は各市町村の窓口"
    ],
    "prefectures": [
      "京都府"
    ],
    "cities": [],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "url": "https://www.pref.kyoto.jp/energy/kateimukehojo.html"
  },
  {
    "id": "kyoto-taishin-mokuzo-kaishu",
    "name": "京都府木造住宅耐震改修等事業費補助",
    "provider": "京都府 建築指導課（市町村が窓口）",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "簡易耐震改修：費用の4/5・最高40万円、耐震シェルター設置：費用の3/4・最高30万円。耐震改修は評点や地域により区分があり、費用の4/5以上が補助される区分がある。市町村ごとに要確認",
    "summary": "木造住宅の耐震改修、簡易耐震改修、耐震シェルター設置などの費用の一部を、市町村が補助する（府が支援）。令和8年度より、住宅密集地域等（耐震化重点エリア）の補助制度が拡充された。",
    "eligibility": [
      "昭和56年5月31日以前に着工した木造住宅など",
      "お住まいの市町村が補助事業を実施していること"
    ],
    "prefectures": [
      "京都府"
    ],
    "cities": [],
    "period": "令和8年度（受付期間は市町村ごとのため要確認）",
    "deadline": null,
    "url": "https://www.pref.kyoto.jp/taishin/wkaisyu.html"
  },
  {
    "id": "kyoto-taishin-shindanshi",
    "name": "京都府木造住宅耐震診断士派遣事業",
    "provider": "京都府 建築指導課（市町村が窓口）",
    "level": "prefecture",
    "category": "耐震",
    "type": "助成金",
    "amount": "自己負担は交通費相当分の3千円",
    "summary": "市町村が耐震診断士を派遣し、木造住宅の耐震診断を行う事業。",
    "eligibility": [
      "お住まいの市町村が事業を実施していること"
    ],
    "prefectures": [
      "京都府"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.kyoto.jp/taishin/wshindan.html"
  },
  {
    "id": "kyoto-city-jikasyohi-taiyoko-r8",
    "name": "令和8年度京都市住宅の自家消費型太陽光発電設備等設置補助金",
    "provider": "京都市 環境政策局",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：1kWあたり7万円、蓄電池：1kWhあたり5万円（経費の1/3が上限）、V2H充放電設備：1件10万円",
    "summary": "京都市内の戸建て住宅に、太陽光発電設備（2kW以上）と蓄電池またはV2Hを同時設置する経費の一部を補助する。高効率給湯機器やコージェネの同時設置も対象になる。",
    "eligibility": [
      "京都市内の戸建て住宅",
      "太陽光（2kW以上）と蓄電池またはV2Hの同時設置"
    ],
    "prefectures": [
      "京都府"
    ],
    "cities": [
      "京都市"
    ],
    "period": "令和8年度（募集期間は要確認）",
    "deadline": null,
    "url": "https://www.city.kyoto.lg.jp/kankyo/page/0000353430.html"
  },
  {
    "id": "kyoto-city-machinotakumi-taishin",
    "name": "令和8年度すまいの耐震・防火補助制度（まちの匠・ぷらす）",
    "provider": "京都市 都市計画局",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "木造住宅の本格耐震改修：最大200万円、簡易な改修（屋根の軽量化など）：最大40万円。感震ブレーカー設置にも補助あり",
    "summary": "昭和56年5月31日以前に着工された京都市内の木造住宅・京町家の耐震改修等を補助する。",
    "eligibility": [
      "昭和56年5月31日以前に着工された木造住宅または京町家",
      "京都市内の住宅",
      "予算がなくなり次第終了"
    ],
    "prefectures": [
      "京都府"
    ],
    "cities": [
      "京都市"
    ],
    "period": "2026年4月13日から12月25日まで",
    "deadline": "2026-12-25",
    "url": "https://www.city.kyoto.lg.jp/tokei/page/0000351188.html"
  },
  {
    "id": "kyoto-city-taishin-shindanshi",
    "name": "木造住宅及び京町家の耐震診断士派遣事業",
    "provider": "京都市 都市計画局",
    "level": "municipality",
    "category": "耐震",
    "type": "助成金",
    "amount": "木造住宅の耐震診断は無料（京町家の基本計画作成のみ自己負担2万円）",
    "summary": "耐震診断士を派遣し、木造住宅や京町家の耐震診断を行う。",
    "eligibility": [],
    "prefectures": [
      "京都府"
    ],
    "cities": [
      "京都市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.kyoto.lg.jp/tokei/page/0000119039.html"
  },
  {
    "id": "osaka-kouiki-cb-hojo",
    "name": "大阪府広域緊急交通路沿道ブロック塀補助制度（耐震診断義務付けブロック塀等）",
    "provider": "大阪府",
    "level": "prefecture",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "要確認",
    "summary": "広域緊急交通路沿道の、耐震診断が義務付けられたブロック塀等に関する補助制度。",
    "eligibility": [
      "広域緊急交通路沿道の耐震診断義務付けブロック塀等"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.osaka.lg.jp/o130040/kenchikubosai/cb/kouikicb_hojo.html"
  },
  {
    "id": "osaka-taishin-mokuzo-hojo",
    "name": "木造住宅の耐震化（耐震診断・設計・改修・除却の補助）",
    "provider": "大阪府 住宅建築局（市町村が窓口）",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "府の基準で上限：診断5万円、設計10万円、改修50万円（所得により75万円）、除却20万円。市町村ごとに補助の有無・上限額・補助率が異なる",
    "summary": "昭和56年5月31日以前に建築された木造住宅の耐震診断・設計・改修・除却を、市町村を通じて補助する。",
    "eligibility": [
      "昭和56年5月31日以前に建築された木造住宅（市町村により範囲拡大あり）",
      "居住中であること",
      "課税所得金額が507万円未満など"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [],
    "period": "要確認（市町村ごと）",
    "deadline": null,
    "url": "https://www.pref.osaka.lg.jp/o130040/kenshi_kikaku/kikaku_bousai/mokuzou.html"
  },
  {
    "id": "higashiosaka-kateiyo-taiyoko-r8",
    "name": "【令和8年度】【家庭用】太陽光発電・エネファーム・蓄電池・ZEHの費用補助",
    "provider": "東大阪市 環境企画課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光発電：上限8万円、エネファーム：上限4万円、蓄電池：上限5万円、ZEH：上限25万円",
    "summary": "家庭用の太陽光発電、エネファーム、蓄電池、ZEHの設置・購入費用の一部を補助する。申請は電子申請のみ。",
    "eligibility": [
      "申請は電子申請システムで行う（郵送・メール不可）"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "東大阪市"
    ],
    "period": "令和8年度（2026年8月21日時点で太陽光・蓄電池の残件数あり。終了日は要確認）",
    "deadline": null,
    "url": "https://www.city.higashiosaka.lg.jp/0000015249.html"
  },
  {
    "id": "higashiosaka-taishin-hojo",
    "name": "東大阪市 耐震診断・耐震改修設計・耐震改修工事・除却工事の補助",
    "provider": "東大阪市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "耐震診断、耐震改修設計、耐震改修工事、除却工事、分譲マンションの耐震化に対する補助（耐震・省エネ・バリアフリーなどの補助制度一覧のページ）。",
    "eligibility": [
      "主に昭和56年5月31日以前に建築された建物"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "東大阪市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.higashiosaka.lg.jp/0000043138.html"
  },
  {
    "id": "osaka-city-block-tekkyo",
    "name": "ブロック塀等の撤去を促進する補助制度",
    "provider": "大阪市 都市整備局",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "補助率1/2。撤去の上限15万円、軽量フェンス等の新設の上限25万円",
    "summary": "道路等に面した一定の高さ（80cm以上）で安全性が確認できないブロック塀等の撤去と、軽量フェンス等の新設費用を補助する。",
    "eligibility": [
      "道路等に面した高さ80cm以上のブロック塀等",
      "安全性が確認できないもの"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "大阪市"
    ],
    "period": "申請書の提出期限は令和8年12月28日",
    "deadline": "2026-12-28",
    "url": "https://www.city.osaka.lg.jp/toshiseibi/page/0000440127.html"
  },
  {
    "id": "osaka-city-jutaku-shoene-kaishu",
    "name": "大阪市住宅省エネ改修促進事業",
    "provider": "大阪市 都市整備局",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "大阪市内の住宅の省エネ改修（蓄電池や太陽熱利用システムなどの設備を含む）に対する補助。",
    "eligibility": [
      "昭和56年6月1日以降に着工した建物など",
      "他の補助との重複不可"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "大阪市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.osaka.lg.jp/toshiseibi/page/0000675872.html"
  },
  {
    "id": "osaka-city-taishin-kaishu-jokyaku",
    "name": "民間戸建住宅等の耐震診断・改修等補助制度",
    "provider": "大阪市 都市整備局",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "除却（解体）工事：補助率1/3、1戸あたり70万円・1棟あたり140万円が上限。耐震改修工事の上限も令和8年度に拡充（金額は要確認）",
    "summary": "耐震診断で耐震性が不足すると判断された旧耐震基準の民間戸建住宅等の、耐震改修・除却に対する補助。",
    "eligibility": [
      "旧耐震基準（昭和56年5月31日以前）の住宅",
      "耐震診断で耐震性不足と判断されたこと",
      "交付申請前の工事契約は原則対象外"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "大阪市"
    ],
    "period": "令和8年度。申請締切は12月28日",
    "deadline": "2026-12-28",
    "url": "https://www.city.osaka.lg.jp/toshiseibi/page/0000370839.html"
  },
  {
    "id": "sakai-smarthouse-shien",
    "name": "堺市スマートハウス化等支援事業",
    "provider": "堺市 環境局",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光は戸建ての一例で4万円（詳細は要確認）。住宅用定置式蓄電システムは一律10万円（太陽光などとの組み合わせが条件）。令和8年度事業予算額2500万円",
    "summary": "太陽光発電システム、蓄電システム、燃料電池自動車、既存集合住宅の充電設備などの導入を補助する。先着順。",
    "eligibility": [
      "先着順",
      "蓄電システムは太陽光などとの組み合わせが条件"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "堺市"
    ],
    "period": "令和8年度（申請受付中、2026年7月1日時点の予算残額2476万円）。終了日は要確認",
    "deadline": null,
    "url": "https://www.city.sakai.lg.jp/kurashi/gomi/ondanka/smarthouse/sumarthouse/index.html"
  },
  {
    "id": "sakai-taishin-kaishu-hojo",
    "name": "堺市住宅・建築物耐震改修補助",
    "provider": "堺市 建築都市局",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "住宅・建築物の耐震改修に対する補助制度。申請時点で空家である住宅は、空家住宅である旨の申立書が必要。",
    "eligibility": [],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "堺市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.sakai.lg.jp/kurashi/jutaku/kenchiku/anzen/taishinkaishu/tetsuduki_flow.html"
  },
  {
    "id": "suita-taishin-kaishu",
    "name": "吹田市 耐震改修の補助制度",
    "provider": "吹田市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "工事費の4/5、または80万円（特定世帯は105万円）×住居戸数のいずれか少ない額（令和8年度から限度額を増額）",
    "summary": "昭和56年5月31日以前に建築された木造住宅の耐震改修工事費を補助する。",
    "eligibility": [
      "昭和56年5月31日以前に建築された木造住宅",
      "課税所得金額が507万円未満など"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "吹田市"
    ],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "url": "https://www.city.suita.osaka.jp/kurashi/1018501/1018468/1018482/1018483/1010119.html"
  },
  {
    "id": "suita-taishin-sekkei",
    "name": "吹田市 耐震設計の補助制度",
    "provider": "吹田市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "工事費の7/10、または10万円×住居戸数のいずれか少ない額",
    "summary": "木造住宅の耐震設計にかかった費用を補助する。",
    "eligibility": [
      "昭和56年5月31日以前に建築された木造住宅"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "吹田市"
    ],
    "period": "令和8年度の耐震設計補助金は予算額に達した（確認時点）",
    "deadline": null,
    "url": "https://www.city.suita.osaka.jp/kurashi/1018501/1018468/1018482/1018483/1010120.html"
  },
  {
    "id": "suita-taishin-shindan",
    "name": "吹田市 耐震診断の補助制度",
    "provider": "吹田市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震診断に要した費用の10/11と、5万円×住居戸数のいずれか少ない額",
    "summary": "木造住宅の耐震診断にかかった費用を補助する。",
    "eligibility": [
      "昭和56年5月31日以前に建築された木造住宅"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "吹田市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.suita.osaka.jp/kurashi/1018501/1018468/1018482/1018483/1010122.html"
  },
  {
    "id": "toyonaka-denki-jidosha-kounyu",
    "name": "豊中市電気自動車等購入支援補助金",
    "provider": "豊中市",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "個人：新車1台につき10万円",
    "summary": "電気自動車、プラグインハイブリッド自動車、燃料電池自動車の購入を補助する。",
    "eligibility": [],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "豊中市"
    ],
    "period": "令和8年度。個人分・事業者分とも予算に達し終了（確認時点）",
    "deadline": null,
    "url": "https://www.city.toyonaka.osaka.jp/machi/hojo_joseikin/kankyo_hojyo_jyosei/ev_car.html"
  },
  {
    "id": "toyonaka-smarthouse-tikuden",
    "name": "【蓄電システム】スマートハウス支援補助金",
    "provider": "豊中市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "初期実効容量1kWhあたり1万円（上限6万円）",
    "summary": "環境共創イニシアチブに登録された家庭用蓄電システムの設置費用を補助する。",
    "eligibility": [
      "環境共創イニシアチブ登録機器"
    ],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "豊中市"
    ],
    "period": "受付期間：2026年5月7日から2027年3月1日まで。ただし9月25日に予算額に達し受付終了",
    "deadline": null,
    "url": "https://www.city.toyonaka.osaka.jp/machi/hojo_joseikin/kankyo_hojyo_jyosei/tikuden.html"
  },
  {
    "id": "toyonaka-smarthouse-zeh",
    "name": "【ZEH】スマートハウス支援補助金",
    "provider": "豊中市",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "20万円",
    "summary": "ZEH（ネット・ゼロ・エネルギー・ハウス）の住宅に対する補助。",
    "eligibility": [],
    "prefectures": [
      "大阪府"
    ],
    "cities": [
      "豊中市"
    ],
    "period": "令和8年度。5月14日に予算額に達し受付終了（確認時点）",
    "deadline": null,
    "url": "https://www.city.toyonaka.osaka.jp/machi/hojo_joseikin/kankyo_hojyo_jyosei/zeh.html"
  },
  {
    "id": "hyogo-awaji-chikudenchi-r8",
    "name": "（淡路地域）令和8年度「家庭用蓄電池導入支援補助金」",
    "provider": "兵庫県 淡路県民局",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "蓄電容量1kWhあたり1.5万円（上限15万円）",
    "summary": "淡路島内で蓄電システムを導入する島民に対し、設置費用の一部を補助する。",
    "eligibility": [
      "淡路島内の住宅に導入する島民",
      "予算上限に達し次第終了"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [],
    "period": "令和8年4月1日から令和9年2月26日まで",
    "deadline": "2027-02-26",
    "url": "https://web.pref.hyogo.lg.jp/awk12/miraizima/chikudenchi/r8chikudenchi.html"
  },
  {
    "id": "hyogo-awaji-ev-r8",
    "name": "（淡路地域）令和8年度電気自動車、燃料電池バス・トラック導入補助制度",
    "provider": "兵庫県 淡路県民局",
    "level": "prefecture",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "EV 1台あたり10万円（定額）",
    "summary": "淡路地域での電気自動車の導入に対する補助。",
    "eligibility": [
      "淡路地域での導入"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [],
    "period": "令和8年度。電気自動車枠は予算上限に達したため受付終了（確認時点）",
    "deadline": null,
    "url": "https://web.pref.hyogo.lg.jp/awk12/miraizima/ev/r8ev-fcv.html"
  },
  {
    "id": "hyogo-jikashohi-taiyoko-r8",
    "name": "令和8年度自家消費型住宅用太陽光発電設備等導入補助事業",
    "provider": "兵庫県 ゼロカーボン推進課（市町が実施）",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：1kWあたり7万円（上限5kW）、蓄電池：工事費込み・税抜きの1/3（上限5kWh分）",
    "summary": "自ら所有し居住する戸建て住宅に、自家消費型の太陽光発電設備と蓄電池を設置する費用を補助する。一部の県内市町が実施している。",
    "eligibility": [
      "自ら所有し居住する戸建て住宅",
      "発電量の30%以上を自家消費すること",
      "同一設備について他の国庫補助との併用不可"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [],
    "period": "令和8年度（市町ごとのため要確認）",
    "deadline": null,
    "url": "https://web.pref.hyogo.lg.jp/nk19/juutakuyouhojo.html"
  },
  {
    "id": "hyogo-jinsei-ikiiki-jutaku",
    "name": "人生いきいき住宅助成事業",
    "provider": "兵庫県 まちづくり部",
    "level": "prefecture",
    "category": "バリアフリー・介護",
    "type": "助成金",
    "amount": "要確認",
    "summary": "高齢者・障害のある人などの住宅改造（バリアフリー化）を助成する事業（市町を通じた助成）。詳細は要確認。",
    "eligibility": [],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://web.pref.hyogo.lg.jp/ks18/wd20_000000115.html"
  },
  {
    "id": "hyogo-jutaku-souene-yuushi-r8",
    "name": "住宅用創エネルギー・省エネルギー設備設置特別融資（個人向け）",
    "provider": "兵庫県",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "融資",
    "amount": "要確認",
    "summary": "住宅用太陽光発電設備や家庭用蓄電池（V2H含む）などの設置に対する融資制度。",
    "eligibility": [],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [],
    "period": "令和8年度の募集は終了（確認時点）",
    "deadline": null,
    "url": "https://web.pref.hyogo.lg.jp/nk24/yuushi2017.html"
  },
  {
    "id": "hyogo-taishin-sumai-sokushin",
    "name": "ひょうご住まいの耐震化促進事業",
    "provider": "兵庫県 まちづくり部 建築指導課（市町が窓口）",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "補助額・要件は市町ごとに異なるため要確認",
    "summary": "民間住宅の耐震診断、改修計画の策定、耐震改修工事等に対する市町の補助に、県が助成する。補助を使う改修工事は県の住宅改修業者登録制度に登録された業者との契約が必要。",
    "eligibility": [
      "工事契約の前に市町へ交付申請を出すこと",
      "県の住宅改修業者登録制度に登録された業者と契約すること"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [],
    "period": "令和8年度（市町ごとのため要確認）",
    "deadline": null,
    "url": "https://web.pref.hyogo.lg.jp/ks29/wd30_000000017.html"
  },
  {
    "id": "himeji-jikasyohi-taiyoko-r8",
    "name": "【令和8年度】姫路市自家消費型住宅用太陽光発電設備等導入補助金",
    "provider": "姫路市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：1kWあたり7万円（上限5kW・35万円）、蓄電池：補助対象価格の1/3（上限5kWh・23.5万円）",
    "summary": "自ら居住する戸建住宅に、自家消費型の太陽光発電設備と蓄電池を同時設置する費用を補助する。先着順。",
    "eligibility": [
      "自ら居住する戸建住宅",
      "太陽光と蓄電池を同時設置",
      "住宅用蓄電システム導入促進事業との併用不可"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "姫路市"
    ],
    "period": "令和8年度。受付再開後、予算残額942,000円の範囲内で先着順（確認時点）",
    "deadline": null,
    "url": "https://www.city.himeji.lg.jp/kurashi/0000032975.html"
  },
  {
    "id": "himeji-jutaku-chikuden-r8",
    "name": "【令和8年度】姫路市住宅用蓄電システム導入促進事業",
    "provider": "姫路市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "播磨圏域連携中枢都市圏域内の連携市町内の事業者と契約：1kWhあたり2万円（上限10万円）。それ以外の事業者：1kWhあたり1万円（上限5万円）",
    "summary": "住宅用蓄電システムの導入費用を補助する。",
    "eligibility": [
      "自家消費型住宅用太陽光発電設備等導入補助金との併用申請不可"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "姫路市"
    ],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "url": "https://www.city.himeji.lg.jp/kurashi/0000011573.html"
  },
  {
    "id": "himeji-kojin-jisedai-car-r8",
    "name": "【令和8年度】姫路市個人向け次世代自動車導入促進補助金",
    "provider": "姫路市",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "国の補助額の1/4（上限10万円）",
    "summary": "個人向けの電気自動車等の導入を補助する。",
    "eligibility": [],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "姫路市"
    ],
    "period": "令和8年度。電気自動車は予算上限に達し5月29日に受付終了。燃料電池車・電動バイクは別扱いで受付中の記載あり（確認時点）",
    "deadline": null,
    "url": "https://www.city.himeji.lg.jp/kurashi/0000021695.html"
  },
  {
    "id": "himeji-shoene-kaden-kaikae",
    "name": "姫路市省エネ家電買換え促進事業（補助金）",
    "provider": "姫路市",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "省エネ家電への買い替えを促進するための補助。",
    "eligibility": [],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "姫路市"
    ],
    "period": "2026年9月3日に受付終了",
    "deadline": "2026-09-03",
    "url": "https://www.city.himeji.lg.jp/kurashi/0000032527.html"
  },
  {
    "id": "kobe-akiya-kaitai-hojo",
    "name": "神戸市 老朽空家等解体補助制度",
    "provider": "神戸市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "要確認",
    "summary": "老朽空き家の解体に対する補助。神戸市の「住宅支援や補助金など」のページに掲載されている（このページには耐震診断・耐震改修補助、空き家活用応援制度なども掲載）。",
    "eligibility": [],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "神戸市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.kobe.lg.jp/a01110/hojokin.html"
  },
  {
    "id": "kobe-fcv-fukyu",
    "name": "燃料電池自動車（FCV）普及促進補助金",
    "provider": "神戸市 環境局",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "要確認",
    "summary": "燃料電池自動車の購入を補助する。2026年度は電気自動車が対象から外れ、燃料電池自動車のみが対象。",
    "eligibility": [],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "神戸市"
    ],
    "period": "2026年度（受付期間は要確認）",
    "deadline": null,
    "url": "https://www.city.kobe.lg.jp/a73498/business/kankyotaisaku/kotuukougai/jisedaicar.html"
  },
  {
    "id": "nishinomiya-jikasyohi-taiyoko-r8",
    "name": "令和8年度自家消費型住宅用太陽光発電設備等導入補助事業",
    "provider": "西宮市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：1kWあたり7万円（上限5kWで35万円）、蓄電池：対象価格の1/3（上限5kWhで23.5万円）",
    "summary": "市内で自ら所有し居住する戸建て住宅に、太陽光と蓄電池を同時に設置する費用を補助する。",
    "eligibility": [
      "自ら所有し居住する戸建て住宅（賃貸は対象外）",
      "太陽光と蓄電池の同時設置"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "西宮市"
    ],
    "period": "令和8年度（予算残額は2026年7月31日時点で1,207万5千円。終了日は要確認）",
    "deadline": null,
    "url": "https://www.nishi.or.jp/kurashi/sumai/josei/taiyoukoutikudennti.html"
  },
  {
    "id": "nishinomiya-jinsei-ikiiki-jutaku",
    "name": "西宮市人生いきいき住宅改造助成事業",
    "provider": "西宮市",
    "level": "municipality",
    "category": "バリアフリー・介護",
    "type": "助成金",
    "amount": "要確認",
    "summary": "高齢者の福祉として、住宅の改造（バリアフリー改修）に対して助成する事業。",
    "eligibility": [],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "西宮市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.nishi.or.jp/kenko/koreishafukushi/barrier_free/koreshafukushi.html"
  },
  {
    "id": "nishinomiya-taishin-kaishu",
    "name": "住宅の耐震化への補助",
    "provider": "西宮市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "昭和56年5月以前に建築された住宅の耐震改修費用への補助。交付決定前に契約・支払いをすると対象外で、国の補助金との併用もできない。",
    "eligibility": [
      "昭和56年5月以前に建築された住宅",
      "交付決定前の契約・支払いは対象外"
    ],
    "prefectures": [
      "兵庫県"
    ],
    "cities": [
      "西宮市"
    ],
    "period": "確認できた年度：令和7年度（令和7年11月28日に終了予定、最新は要確認）",
    "deadline": null,
    "url": "https://www.nishi.or.jp/kurashi/sumai/josei/taishinka.html"
  },
  {
    "id": "nara-smarthouse-fukyu",
    "name": "スマートハウス普及促進事業",
    "provider": "奈良県",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "定置用リチウムイオン蓄電池：補助率1/3・上限20万円。燃料電池（エネファーム）：地域により8万円または11万円",
    "summary": "県内在住者が設置する蓄電池や燃料電池の費用を補助する。蓄電池は太陽光発電設備の設置完了が条件。",
    "eligibility": [
      "県内在住者",
      "蓄電池は太陽光発電設備の設置完了が条件"
    ],
    "prefectures": [
      "奈良県"
    ],
    "cities": [],
    "period": "確認できた年度：令和7年度（最新は要確認。別ページでは今年度分の受付終了との案内あり）",
    "deadline": null,
    "url": "https://www.pref.nara.jp/43555.htm"
  },
  {
    "id": "nara-taishin-shindan-shien",
    "name": "耐震診断支援事業",
    "provider": "奈良県 まちづくり推進局",
    "level": "prefecture",
    "category": "耐震",
    "type": "助成金",
    "amount": "要確認",
    "summary": "市町村が住宅所有者等の申込みを受けて耐震診断員（奈良県木造住宅耐震診断員）を派遣する仕組みに対し、県が診断員登録や市町村への補助金交付を行う。",
    "eligibility": [
      "お住まいの市町村が事業を実施していること"
    ],
    "prefectures": [
      "奈良県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.nara.jp/3788.htm"
  },
  {
    "id": "wakayama-kojin-taiyoko-r8",
    "name": "【令和8年度】和歌山県個人向け太陽光発電設備・蓄電池等導入支援",
    "provider": "和歌山県（市町村が実施）",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光：1kWあたり7万円、蓄電池：価格の1/3（上限47万円）",
    "summary": "市町村が実施する、個人の住宅への太陽光発電設備と蓄電池の設置費用補助に、県が関わる事業。補助対象は市町村の区域内の設置に限られる。",
    "eligibility": [
      "市町村の区域内の設置",
      "蓄電池と同時に、一定の要件を満たす太陽光発電設備を設置すること"
    ],
    "prefectures": [
      "和歌山県"
    ],
    "cities": [],
    "period": "令和8年度（受付期間は要確認）",
    "deadline": null,
    "url": "https://www.pref.wakayama.lg.jp/prefg/032000/taiyoukouhojyo_kojin.html"
  },
  {
    "id": "wakayama-taishin-sokushin",
    "name": "住宅耐震化促進事業（住宅の耐震診断・耐震改修に関する補助制度）",
    "provider": "和歌山県 建築住宅課（市町村が窓口）",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "木造の耐震診断：無料。補強設計：費用の2/3・限度額13.2万円。耐震改修：費用の2/3に加算分、上限67.03万円＋α。診断・設計・改修一体実施：改修費の40%（最大57.5万円）に定額74.1万円を加算。耐震ベッド・シェルター：設置工事費の2/3・上限26.6万円",
    "summary": "住宅の耐震診断、補強設計、耐震改修などの費用を、国・県・市町村が補助する。市町村に申請し、市町村からまとめて支払われる。",
    "eligibility": [
      "市町村によって制度の詳細が異なる"
    ],
    "prefectures": [
      "和歌山県"
    ],
    "cities": [],
    "period": "令和8年度パンフレット掲載分（受付期間は市町村ごとのため要確認）",
    "deadline": null,
    "url": "https://www.pref.wakayama.lg.jp/prefg/080800/taishin/top.html"
  },
  {
    "id": "tottori-ijyu-shienkin",
    "name": "鳥取県 移住支援金",
    "provider": "鳥取県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "2人以上の世帯100万円、単身60万円。18歳未満の世帯員を帯同する場合は1人につき最大100万円加算",
    "summary": "東京圏から鳥取県へ移住し、就業または起業した人に支給する。申請は移住先の市町村。",
    "eligibility": [
      "東京圏から移住し就業または起業した人",
      "転入後1年以内に申請"
    ],
    "prefectures": [
      "鳥取県"
    ],
    "cities": [],
    "period": "要確認（令和8年度の受付状況は要確認）",
    "deadline": null,
    "url": "https://www.pref.tottori.lg.jp/286713.htm"
  },
  {
    "id": "tottori-taishin-machizukuri",
    "name": "鳥取県震災に強いまちづくり促進事業（住宅耐震化）",
    "provider": "鳥取県 住宅政策課",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修・耐震ベッド・シェルター等に10割定額補助（令和8年度から3年間の期間限定）。耐震シェルター設置費の23%（上限83.7万円）、高齢者等の住宅は100%（シェルター上限100万円、ベッド上限62.5万円）、居室単位の改修は100%（上限125万円）。上限・内容は市町村ごとに異なるため要確認",
    "summary": "旧耐震の住宅の耐震改修、耐震ベッド、耐震シェルター設置などを支援する。市町村を通じて補助される。",
    "eligibility": [
      "昭和56年5月31日以前の建物（木造住宅は平成12年5月31日以前）",
      "耐震診断で耐震性不足と判定されていること（高齢者等の住宅は診断不要の場合あり）"
    ],
    "prefectures": [
      "鳥取県"
    ],
    "cities": [],
    "period": "令和8年度から3年間の期間限定措置（受付期間は要確認）",
    "deadline": null,
    "url": "https://www.pref.tottori.lg.jp/47491.htm"
  },
  {
    "id": "tottori-tottori-smile",
    "name": "とっとり住まいる支援事業",
    "provider": "鳥取県 住宅政策課",
    "level": "prefecture",
    "category": "子育て",
    "type": "補助金",
    "amount": "子育て世帯等は定額10万円の加算（その他の金額は要確認）",
    "summary": "県産材を使った木造住宅の新築・改修を支援する。子育て世帯等には加算がある。",
    "eligibility": [
      "県産材を使った木造住宅",
      "子育て世帯の加算は18歳到達後最初の3月31日までの子を養育する世帯など"
    ],
    "prefectures": [
      "鳥取県"
    ],
    "cities": [],
    "period": "確認できた年度：令和7年度（4月1日〜令和8年3月19日、最新は要確認）",
    "deadline": null,
    "url": "https://www.pref.tottori.lg.jp/322359.htm"
  },
  {
    "id": "tottori-shi-dannetsu-kaishu",
    "name": "鳥取市脱炭素先行地域づくり既存住宅断熱改修促進事業費補助金",
    "provider": "鳥取市",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "補助率2/3、戸建ては1戸あたり上限120万円",
    "summary": "既存住宅の断熱改修を補助する。",
    "eligibility": [],
    "prefectures": [
      "鳥取県"
    ],
    "cities": [
      "鳥取市"
    ],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.tottori.lg.jp/page/5238.html"
  },
  {
    "id": "shimane-chojyu-kosodate-reform",
    "name": "しまね長寿・子育て安心住宅リフォーム助成事業",
    "provider": "島根県 建築住宅課",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "部分的耐震改修は対象工事費の1/4（子育て世帯の同居・近居などで加算あり。上限額は要確認）",
    "summary": "寝室や居間など住宅の一部を耐震補強する工事などを助成する。",
    "eligibility": [
      "昭和56年5月31日以前に着手された階数2以下の一戸建て木造住宅",
      "改修前の上部構造評点が1.0未満など"
    ],
    "prefectures": [
      "島根県"
    ],
    "cities": [],
    "period": "受付は令和9年2月15日まで（予算がなくなり次第終了）",
    "deadline": "2027-02-15",
    "url": "https://www.pref.shimane.lg.jp/infra/build/jutaku/shien/shimane_tyojunosumai_reform_jyosei.html"
  },
  {
    "id": "shimane-shoene-saine-package",
    "name": "しまね省エネ住宅・再エネ設備パッケージ補助金",
    "provider": "島根県",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光発電設備は最大63万円、蓄電池は最大47万円（FIT認定不可など条件あり）",
    "summary": "県産木材を使った省エネ住宅の建設と、太陽光・蓄電池の導入を支援する。",
    "eligibility": [
      "県産木材を使った省エネ住宅の建設"
    ],
    "prefectures": [
      "島根県"
    ],
    "cities": [],
    "period": "令和8年度の受付が開始（期間は要確認）",
    "deadline": null,
    "url": "https://www.pref.shimane.lg.jp/infra/kankyo/kankyo/datsutanso/zeh_hojyo_r8.html"
  },
  {
    "id": "shimane-wakuwaku-seikatsu",
    "name": "わくわく島根生活実現支援事業（移住支援金）",
    "provider": "島根県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "単身60万円、世帯100万円",
    "summary": "東京圏から島根へ移住し、県内の対象法人に就業した人に支給する。",
    "eligibility": [
      "東京圏からの移住",
      "県内の対象法人に就業"
    ],
    "prefectures": [
      "島根県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.shimane.lg.jp/life/region/chiiki/UI_turn/"
  },
  {
    "id": "matsue-shi-mokuzo-taishin",
    "name": "松江市 木造住宅耐震改修補助事業",
    "provider": "松江市 建築指導課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "上限75万円（中心市街地の細街路沿線は上限100万円）",
    "summary": "木造住宅の耐震改修工事費の一部を補助する。",
    "eligibility": [
      "昭和56年5月31日以前に工事着手された一戸建てなど"
    ],
    "prefectures": [
      "島根県"
    ],
    "cities": [
      "松江市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.matsue.lg.jp/soshikikarasagasu/toshiseibibu_kenchikusinsaka/kenchiku/8/2/1/676.html"
  },
  {
    "id": "matsue-shi-solar-chikuden",
    "name": "松江市 住宅用太陽光発電・蓄電池補助（令和8年度）",
    "provider": "松江市 環境エネルギー課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光は1kWあたり25,000円（4kW以上は上限10万円）、蓄電池は上限5万円",
    "summary": "住宅の太陽光発電、蓄電池などの設置を補助する。県の補助もあわせて交付される。",
    "eligibility": [
      "「まつエコくらぶ」への入会",
      "設置工事の着手前に申請"
    ],
    "prefectures": [
      "島根県"
    ],
    "cities": [
      "松江市"
    ],
    "period": "令和8年度（先着順、期間は要確認）",
    "deadline": null,
    "url": "https://www.city.matsue.lg.jp/soshikikarasagasu/kankyoenergybu_kankyoenergyka/gomi_kankyo_pet/1/8/993.html"
  },
  {
    "id": "okayama-mokuzo-taishin",
    "name": "岡山県木造住宅耐震改修事業",
    "provider": "岡山県 建築指導課",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認（市町村ごとに異なる。令和8年度パンフレット参照）",
    "summary": "木造住宅の全体耐震改修・部分耐震改修などを行う市町村に県が助成する。申込は市町村窓口。",
    "eligibility": [
      "1981年5月31日以前に着工",
      "2階建て以下の木造住宅"
    ],
    "prefectures": [
      "岡山県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.okayama.jp/page/detail-100997.html"
  },
  {
    "id": "okayama-shoene-kaden-dannetsu",
    "name": "おかやま省エネ家電購入・住宅断熱リフォーム応援キャンペーン事業",
    "provider": "岡山県 脱炭素社会推進課",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "県内の個人の省エネ家電購入、住宅断熱リフォームを応援するキャンペーン事業。",
    "eligibility": [
      "県内の個人"
    ],
    "prefectures": [
      "岡山県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.okayama.jp/page/1034422.html"
  },
  {
    "id": "kurashiki-chikudenchi",
    "name": "倉敷市 定置型リチウムイオン蓄電池補助",
    "provider": "倉敷市 地球温暖化対策室",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "1kWhあたり1万円（上限6万円）",
    "summary": "定置型蓄電池の設置を補助する。予定500件、先着順。",
    "eligibility": [],
    "prefectures": [
      "岡山県"
    ],
    "cities": [
      "倉敷市"
    ],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.kurashiki.okayama.jp/kurashi/kankyo/1011736/1003554/1024166/1024171.html"
  },
  {
    "id": "kurashiki-taiyoko",
    "name": "倉敷市 太陽光発電システム補助（既築戸建て）",
    "provider": "倉敷市 地球温暖化対策室",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "1kWあたり2万円（上限4kW）",
    "summary": "既築戸建て住宅への太陽光発電システム設置を補助する。予定200件。",
    "eligibility": [
      "既築戸建て住宅"
    ],
    "prefectures": [
      "岡山県"
    ],
    "cities": [
      "倉敷市"
    ],
    "period": "令和8年4月1日〜令和9年3月31日",
    "deadline": "2027-03-31",
    "url": "https://www.city.kurashiki.okayama.jp/kurashi/kankyo/1011736/1003554/1024166/1024168.html"
  },
  {
    "id": "okayama-shi-block-tekkyo",
    "name": "岡山市 ブロック塀等の撤去補助",
    "provider": "岡山市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "工事費と塀の長さ1mあたり9,000円のうち少ない方の2/3（上限15万円）",
    "summary": "避難道路に面した危険なブロック塀等の撤去を補助する。",
    "eligibility": [
      "避難道路に面している",
      "危険なブロック塀等"
    ],
    "prefectures": [
      "岡山県"
    ],
    "cities": [
      "岡山市"
    ],
    "period": "令和8年4月13日〜11月30日",
    "deadline": "2026-11-30",
    "url": "https://www.city.okayama.jp/jigyosha/0000005983.html"
  },
  {
    "id": "okayama-shi-jutaku-smart-energy",
    "name": "岡山市住宅用スマートエネルギー導入促進補助事業",
    "provider": "岡山市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "要確認（太陽光・蓄電池は今年度補助率・上限額を引き上げ）",
    "summary": "太陽光発電、蓄電池、V2H、HEMS、燃料電池、窓断熱などの導入を補助する。",
    "eligibility": [
      "太陽光・蓄電池は「あっ晴れ岡山エコクラブ」への入会が条件"
    ],
    "prefectures": [
      "岡山県"
    ],
    "cities": [
      "岡山市"
    ],
    "period": "導入日が令和8年3月1日〜令和9年2月28日のもの",
    "deadline": "2027-02-28",
    "url": "https://www.city.okayama.jp/ondankataisaku/0000042045.html"
  },
  {
    "id": "okayama-shi-mokuzo-taishin",
    "name": "岡山市 木造住宅の耐震診断・耐震改修補助",
    "provider": "岡山市 建築指導課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "診断費9万円のうち8万円を補助。全体改修は補助率4/5（上限115万円）、部分改修・シェルター・防災ベッドは1/2（上限80万円、65歳以上世帯等は4/5）",
    "summary": "旧耐震の木造住宅の診断・改修を補助する。",
    "eligibility": [
      "昭和56年5月31日以前に着工",
      "地上階数2以下"
    ],
    "prefectures": [
      "岡山県"
    ],
    "cities": [
      "岡山市"
    ],
    "period": "令和8年4月13日〜11月30日（診断と補強計画の同時申請は9月30日まで）",
    "deadline": "2026-11-30",
    "url": "https://www.city.okayama.jp/jigyosha/0000006054.html"
  },
  {
    "id": "hiroshima-ijyu-shienkin",
    "name": "広島県 移住支援金",
    "provider": "広島県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "単身60万円、2人以上の世帯100万円（前年度の案内に基づく。令和8年度は要確認）",
    "summary": "東京圏から移住し対象企業に就職した人などに支給する。",
    "eligibility": [
      "東京圏からの移住",
      "対象企業への就職"
    ],
    "prefectures": [
      "広島県"
    ],
    "cities": [],
    "period": "令和8年度は国の交付決定前で受付開始前と案内（要確認）",
    "deadline": null,
    "url": "https://www.pref.hiroshima.lg.jp/soshiki/246/202304ijyushiennkinn.html"
  },
  {
    "id": "hiroshima-madoreno-uwanose",
    "name": "広島県 先進的窓リノベ上乗せ補助（断熱窓）",
    "provider": "広島県",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "国の交付額の3分の1か9万円のいずれか低い方",
    "summary": "国の「先進的窓リノベ2026事業」を活用した県内住宅の窓断熱改修に、県が上乗せ補助する。",
    "eligibility": [
      "国の先進的窓リノベ2026事業を活用した窓断熱改修"
    ],
    "prefectures": [
      "広島県"
    ],
    "cities": [],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "url": "https://www.pref.hiroshima.lg.jp/site/eco/shouenehojyokin.html"
  },
  {
    "id": "hiroshima-taishin-sokushin",
    "name": "広島県住宅耐震化促進支援制度",
    "provider": "広島県",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認（市町が窓口。県は市町の費用の一部を支援）",
    "summary": "市町の住宅耐震化補助に対し県が費用の一部を支援する仕組み。申請は住宅所在の市町。",
    "eligibility": [
      "旧耐震基準の木造住宅（詳細は市町ごと）"
    ],
    "prefectures": [
      "広島県"
    ],
    "cities": [],
    "period": "令和8年度（詳細は要確認）",
    "deadline": null,
    "url": "https://www.pref.hiroshima.lg.jp/site/taishin-madoguchi/taishinhojo-jyutaku.html"
  },
  {
    "id": "fukuyama-kateimuke-souene",
    "name": "福山市 家庭向け創エネ・蓄エネ設備導入補助金（令和8年度）",
    "provider": "福山市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光は1kWあたり10.5万円（上限5kW）、蓄電池は費用の1/3（15.5万円/kWhが上限）",
    "summary": "太陽光と蓄電池の同時設置を補助する。蓄電池のみは対象外。",
    "eligibility": [
      "太陽光と蓄電池を同時設置",
      "FIT・FIP認定設備は対象外"
    ],
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "福山市"
    ],
    "period": "令和8年6月1日〜令和9年1月8日（予算残りわずか：8月20日時点）",
    "deadline": "2027-01-08",
    "url": "https://www.city.fukuyama.hiroshima.jp/site/kankyo/394079.html"
  },
  {
    "id": "hiroshima-shi-block-tekkyo",
    "name": "広島市民間ブロック塀等撤去工事補助事業",
    "provider": "広島市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "撤去費用の2/3（上限15万円）",
    "summary": "道路に面した高さ1m以上のブロック塀等の撤去を補助する。",
    "eligibility": [
      "道路に面し高さ1m以上",
      "交付決定前の契約は対象外"
    ],
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "広島市"
    ],
    "period": "確認できた年度：令和7年度（5月15日〜令和8年1月30日、最新は要確認）",
    "deadline": null,
    "url": "https://www.city.hiroshima.lg.jp/shisei/kouhou/1004010/1033044/1038097/1039977.html"
  },
  {
    "id": "hiroshima-shi-kateiyo-smart-energy",
    "name": "広島市家庭用スマートエネルギー設備等設置補助金",
    "provider": "広島市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "1台3万円（家庭用燃料電池・蓄電池・V2Hの合計490台）",
    "summary": "家庭用蓄電池、家庭用燃料電池、V2H充放電設備の設置を補助する。",
    "eligibility": [
      "蓄電池は機器費と工事費の合計20万円以上、容量1kWh以上など"
    ],
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "広島市"
    ],
    "period": "令和8年度（先着順。7月31日時点で161/490台）",
    "deadline": null,
    "url": "https://www.city.hiroshima.lg.jp/living/gomi-kankyo/1021289/1049641/index.html"
  },
  {
    "id": "hiroshima-shi-taishin",
    "name": "広島市 住宅の耐震改修補助",
    "provider": "広島市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修工事費の80%（上限115万円/戸）",
    "summary": "住宅の耐震改修を補助する。",
    "eligibility": [
      "前年の所得が1,200万円以下の世帯など"
    ],
    "prefectures": [
      "広島県"
    ],
    "cities": [
      "広島市"
    ],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.hiroshima.lg.jp/living/sumai/1021346/1026338/1018628.html"
  },
  {
    "id": "yamaguchi-ijyu-shienkin",
    "name": "山口県 移住支援金",
    "provider": "山口県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "世帯100万円、単身60万円（東京23区からの場合。他地域は金額が異なる場合あり。要確認）",
    "summary": "大都市圏から山口県へ移住就業した人に移住先の市町を通じて支給する。",
    "eligibility": [
      "対象地域からの移住",
      "県の求人サイトの対象求人に就業するなど",
      "転入後1年以内に申請"
    ],
    "prefectures": [
      "山口県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.yamaguchi.lg.jp/soshiki/86/21177.html"
  },
  {
    "id": "yamaguchi-taishin-hojo",
    "name": "山口県 木造住宅耐震診断・耐震改修補助",
    "provider": "山口県 建築指導課",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修は補助率4/5、限度額は市町により100万円台〜115万円程度",
    "summary": "市町と協力して耐震診断・耐震改修を補助する。",
    "eligibility": [
      "昭和56年5月以前に着工された一戸建て木造住宅・共同住宅"
    ],
    "prefectures": [
      "山口県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.yamaguchi.lg.jp/soshiki/135/24284.html"
  },
  {
    "id": "yamaguchi-zeh-hojo",
    "name": "山口県 ZEH補助（令和8年度）",
    "provider": "山口県",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "定額20万円",
    "summary": "ZEH基準を満たす新築住宅を購入する人に補助する。",
    "eligibility": [
      "ZEH基準を満たす",
      "県の登録済み省・創・蓄エネ関連設備を1つ以上導入",
      "内覧会を開催"
    ],
    "prefectures": [
      "山口県"
    ],
    "cities": [],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "url": "https://www.pref.yamaguchi.lg.jp/site/zeh/"
  },
  {
    "id": "shimonoseki-smarthouse",
    "name": "下関市スマートハウス普及促進補助金（令和8年度）",
    "provider": "下関市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "蓄電システムは対象経費の1/5か1kWhあたり2万円のいずれか少ない方（上限20万円）",
    "summary": "定置用リチウムイオン蓄電システムの設置を補助する。V2Hは今年度対象外。",
    "eligibility": [],
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "下関市"
    ],
    "period": "令和8年度前期申請（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.shimonoseki.lg.jp/soshiki/53/87039.html"
  },
  {
    "id": "yamaguchi-shi-anshin-smile",
    "name": "山口市安心快適住まいる助成事業（令和8年度）",
    "provider": "山口市",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "助成金",
    "amount": "要確認",
    "summary": "市内施工業者によるリフォーム工事費の一部を助成する。",
    "eligibility": [
      "新築後1年以上の住宅",
      "工事金額10万円以上（税抜）",
      "市内の施工業者と契約"
    ],
    "prefectures": [
      "山口県"
    ],
    "cities": [
      "山口市"
    ],
    "period": "工事完了届の提出期限は令和8年12月16日",
    "deadline": "2026-12-16",
    "url": "https://www.city.yamaguchi.lg.jp/soshiki/63/187527.html"
  },
  {
    "id": "tokushima-kojin-solar-chikuden",
    "name": "徳島県地域脱炭素移行・再エネ推進事業補助金（個人向け太陽光・蓄電池）",
    "provider": "徳島県",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光1kWあたり7万円（上限35万円）、蓄電池は価格の1/3（上限25.8万円）。ZEH+補助は1戸100万円以内",
    "summary": "県内の個人の既存住宅の太陽光発電設備・蓄電池導入を補助する。蓄電池は太陽光と同時導入が条件。",
    "eligibility": [
      "県内に住所がある個人",
      "既存住宅"
    ],
    "prefectures": [
      "徳島県"
    ],
    "cities": [],
    "period": "令和8年5月25日〜令和8年12月15日",
    "deadline": "2026-12-15",
    "url": "https://www.pref.tokushima.lg.jp/ippannokata/kurashi/shizen/7241363/"
  },
  {
    "id": "tokushima-mokuzo-taishin",
    "name": "徳島県 木造住宅耐震化促進事業",
    "provider": "徳島県",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修は補助率4/5、120万円〜最大200万円（市町村により上限が異なる）＋感震ブレーカー10万円。耐震診断の自己負担は4,000円",
    "summary": "南海トラフ地震に備え、木造住宅の耐震診断・耐震改修を市町村経由で補助する。",
    "eligibility": [
      "平成12年5月31日以前に着工された木造住宅（診断）"
    ],
    "prefectures": [
      "徳島県"
    ],
    "cities": [],
    "period": "令和8年度までの時限措置",
    "deadline": null,
    "url": "https://www.pref.tokushima.lg.jp/taishinka/mokuzou-taishin/index12/"
  },
  {
    "id": "tokushima-shi-ijyu-shienkin",
    "name": "徳島市移住支援金（東京圏）",
    "provider": "徳島市",
    "level": "municipality",
    "category": "移住",
    "type": "給付",
    "amount": "要確認",
    "summary": "東京圏からの移住者への移住支援金。",
    "eligibility": [],
    "prefectures": [
      "徳島県"
    ],
    "cities": [
      "徳島市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.tokushima.tokushima.jp/shisei/machi_keikaku/townplanning/ijyu_sokushin/ijyu_sienkin.html"
  },
  {
    "id": "tokushima-shi-mokuzo-taishin",
    "name": "徳島市既存木造住宅耐震化促進事業",
    "provider": "徳島市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修は補助対象工事費の4/5（最大120万円）、感震ブレーカー設置に10万円上乗せ。耐震シェルター最大80万円、耐震ベッド最大40万円",
    "summary": "耐震診断の結果に基づく耐震改修、シェルター設置などを補助する。",
    "eligibility": [],
    "prefectures": [
      "徳島県"
    ],
    "cities": [
      "徳島市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.tokushima.tokushima.jp/smph/kurashi/house/house_keikaku/taishin_house.html"
  },
  {
    "id": "tokushima-shi-solar-chikuden-v2h",
    "name": "徳島市住宅用太陽光発電システム・蓄エネルギー機器等導入支援事業",
    "provider": "徳島市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光・蓄電システム・V2Hそれぞれ5万円",
    "summary": "住宅用太陽光発電、家庭用蓄電システム、V2H等の導入を補助する。",
    "eligibility": [
      "太陽光は出力2kW以上10kW未満",
      "申請前に設置工事に着手しないこと"
    ],
    "prefectures": [
      "徳島県"
    ],
    "cities": [
      "徳島市"
    ],
    "period": "令和8年度（4月1日〜令和9年2月26日と記載。別ページに予算額到達で受付終了の告知あり、要確認）",
    "deadline": null,
    "url": "https://www.city.tokushima.tokushima.jp/kurashi/kankyou_eisei/solar_power/shien/shien_about.html"
  },
  {
    "id": "kagawa-ijyu-shienkin",
    "name": "東京圏からの移住支援金（香川県）",
    "provider": "香川県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "世帯100万円、単身60万円が基本（高松市は80万円・50万円など市町により異なる）",
    "summary": "東京23区から香川県へ移住し、要件を満たした人に移住先市町から支給する。",
    "eligibility": [
      "東京圏からの移住",
      "移住先市町に5年以上居住する意思"
    ],
    "prefectures": [
      "香川県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.kagawa.lg.jp/chiiki/iju/izyusienkin.html"
  },
  {
    "id": "kagawa-smarthouse-r8",
    "name": "かがわスマートハウス促進事業補助金",
    "provider": "香川県 環境政策課",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "蓄電池は既存住宅で補助対象経費の1/10（上限10万円）、新築ZEHは上限15万円、V2Hは10万円",
    "summary": "自家消費型太陽光発電と連系する蓄電池・V2H、断熱改修などを補助する。",
    "eligibility": [
      "太陽光発電と連系すること"
    ],
    "prefectures": [
      "香川県"
    ],
    "cities": [],
    "period": "令和8年度（ZEHは受付終了、蓄電池・V2Hは予算残あり：2026年10月2日時点。期限は要確認）",
    "deadline": null,
    "url": "https://www.pref.kagawa.lg.jp/kankyoseisaku/chikyu/saiene/r8kagawasmarthouse.html"
  },
  {
    "id": "takamatsu-shi-akiya-kaishu",
    "name": "高松市空き家改修補助事業",
    "provider": "高松市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "補助対象事業費の1/2（限度額50万円、居住誘導区域内は60万円の場合あり）",
    "summary": "空き家バンクに登録された市内の一戸建て空き家の改修費を補助する。",
    "eligibility": [
      "空き家バンク登録物件"
    ],
    "prefectures": [
      "香川県"
    ],
    "cities": [
      "高松市"
    ],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.takamatsu.kagawa.jp/smph/kurashi/kurashi/sumai/akiya/kaishu_hojyo.html"
  },
  {
    "id": "takamatsu-shi-jikashohi-solar",
    "name": "高松市自家消費型家庭用太陽光発電設備等設置費補助事業（令和8年度）",
    "provider": "高松市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光8万円/kW（上限45万円）、蓄電システムは補助対象経費の1/3か20万円のいずれか低い額",
    "summary": "既存住宅への太陽光発電と蓄電システムの新設を補助する。太陽光単独枠は受付終了。",
    "eligibility": [
      "FIT等の認定を取得しない設備",
      "国・県・市の他補助との併用不可"
    ],
    "prefectures": [
      "香川県"
    ],
    "cities": [
      "高松市"
    ],
    "period": "予約申請：令和8年5月25日〜11月30日",
    "deadline": "2026-11-30",
    "url": "https://www.city.takamatsu.kagawa.jp/smph/kurashi/kurashi/kankyo/ondanka/scPVR7.html"
  },
  {
    "id": "takamatsu-shi-jutaku-taishin",
    "name": "高松市住宅耐震改修等事業",
    "provider": "高松市 建築指導課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "民間住宅の耐震診断・耐震改修工事等の費用を補助する。",
    "eligibility": [],
    "prefectures": [
      "香川県"
    ],
    "cities": [
      "高松市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.takamatsu.kagawa.jp/smph/kurashi/kurashi/shobo/sonae/taisin.html"
  },
  {
    "id": "ehime-ev-kounyu",
    "name": "愛媛県 電気自動車（EV）購入支援補助金",
    "provider": "愛媛県 環境・ゼロカーボン推進課",
    "level": "prefecture",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "市町が実施するEV購入補助に対し、県が1/2（上限10万円）を補助（県から個人への直接補助ではない）",
    "summary": "市町のEV購入補助を県が支援する。窓口は市町。",
    "eligibility": [
      "実施市町に住所がある人"
    ],
    "prefectures": [
      "愛媛県"
    ],
    "cities": [],
    "period": "令和8年7月2日時点の実施状況掲載（期間は要確認）",
    "deadline": null,
    "url": "https://www.pref.ehime.jp/page/142962.html"
  },
  {
    "id": "ehime-ijyusha-jutaku-kaishu",
    "name": "愛媛県移住者住宅改修支援事業",
    "provider": "愛媛県",
    "level": "prefecture",
    "category": "移住",
    "type": "補助金",
    "amount": "県・市町が各1/3負担。上限は子育て世帯の住宅改修400万円、働き手世帯200万円、家財道具の搬出20万円",
    "summary": "移住者の住宅改修や家財道具の搬出費用を支援する。",
    "eligibility": [
      "平成28年4月1日以後の移住者",
      "5年以上居住の意思"
    ],
    "prefectures": [
      "愛媛県"
    ],
    "cities": [],
    "period": "確認できた年度は不明（最新は要確認）",
    "deadline": null,
    "url": "https://www.pref.ehime.jp/page/3664.html"
  },
  {
    "id": "ehime-mokuzo-taishin",
    "name": "愛媛県 木造住宅耐震化補助制度",
    "provider": "愛媛県 建築住宅課",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認（市町ごとに異なる。耐震シェルターは一部市町で40万円定額）",
    "summary": "県内市町が耐震診断派遣、改修設計、耐震改修、シェルター設置を補助する。",
    "eligibility": [
      "昭和56年5月以前に建築された木造住宅"
    ],
    "prefectures": [
      "愛媛県"
    ],
    "cities": [],
    "period": "2025年4月1日時点の情報（最新は要確認）",
    "deadline": null,
    "url": "https://www.pref.ehime.jp/site/mokutaishin/2030.html"
  },
  {
    "id": "matsuyama-shi-zerocarbon",
    "name": "松山市ゼロカーボンシティ推進補助金（令和8年度）",
    "provider": "松山市 環境・ゼロカーボンシティ推進課",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "EV・FCVは車両単独で10万円（太陽光設備あり加算10万円、V2H導入でさらに10万円）。住宅用蓄電池上限10万円、家庭用燃料電池上限6万円",
    "summary": "EV・FCV、住宅用蓄電池、家庭用燃料電池の導入を補助する。",
    "eligibility": [
      "交付決定前の契約・着工は対象外",
      "過去に同種で補助を受けていないこと"
    ],
    "prefectures": [
      "愛媛県"
    ],
    "cities": [
      "松山市"
    ],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.matsuyama.ehime.jp/kurashi/kurashi/hojokin/zero-carbon.html"
  },
  {
    "id": "kochi-ev-kounyu",
    "name": "高知県電気自動車等導入促進事業費補助金",
    "provider": "高知県",
    "level": "prefecture",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "EV（普通車）20万円、EV（軽自動車）30万円など",
    "summary": "県内在住の個人、個人事業主、県内事業所のある法人のEV等の導入を補助する。",
    "eligibility": [
      "県内在住の個人等"
    ],
    "prefectures": [
      "高知県"
    ],
    "cities": [],
    "period": "令和8年7月21日〜令和9年1月31日（予算上限で早期終了あり）",
    "deadline": "2027-01-31",
    "url": "https://www.pref.kochi.lg.jp/doc/2026033000518/"
  },
  {
    "id": "kochi-ijyu-shienkin",
    "name": "高知県 移住支援金",
    "provider": "高知県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "2人以上の世帯で最大100万円、単身で最大60万円（子育て世帯は市町村ごとの加算あり）",
    "summary": "東京23区在住者などが県内市町村へ移住し、要件を満たした場合に支給する。",
    "eligibility": [
      "東京圏からの移住"
    ],
    "prefectures": [
      "高知県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.kochi.lg.jp/doc/2025031300026/"
  },
  {
    "id": "kochi-jutaku-dannetsu",
    "name": "高知県 住宅断熱改修費補助金",
    "provider": "高知県",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "補助対象経費の1/3（上限1戸120万円）",
    "summary": "既存戸建て住宅の断熱改修を補助する。耐震改修補助との併用が可能。窓口は市町村。",
    "eligibility": [
      "既存の戸建て住宅の所有者等"
    ],
    "prefectures": [
      "高知県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.kochi.lg.jp/doc/2023082700024/"
  },
  {
    "id": "kochi-jutaku-solar-chikuden",
    "name": "高知県住宅用太陽光発電設備等導入推進事業費補助金",
    "provider": "高知県",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "要確認（市町村が補助する場合に県が一部を補助）",
    "summary": "住宅に太陽光発電と蓄電池（またはV2H）を設置する人への市町村補助を県が支援する。申込窓口は市町村。",
    "eligibility": [
      "太陽光と蓄電池（またはV2H）の両方を導入"
    ],
    "prefectures": [
      "高知県"
    ],
    "cities": [],
    "period": "令和8年度実施分（期間は要確認）",
    "deadline": null,
    "url": "https://www.pref.kochi.lg.jp/doc/2025033100099/"
  },
  {
    "id": "kochi-jutaku-taishin",
    "name": "高知県住宅耐震化促進事業",
    "provider": "高知県 住宅課",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震診断は自己負担3,000円以内、耐震改修設計は最大44.2万円、耐震改修工事は最大165万円（市町村により異なる）",
    "summary": "昭和56年5月31日以前の住宅の耐震診断・設計・改修を市町村と協力して補助する。",
    "eligibility": [
      "改修前の上部構造評点が1.0未満で改修後1.0以上",
      "県登録の設計事務所・工務店が施工"
    ],
    "prefectures": [
      "高知県"
    ],
    "cities": [],
    "period": "要確認（交付要綱は2025年3月改正）",
    "deadline": null,
    "url": "https://www.pref.kochi.lg.jp/doc/naiyou/"
  },
  {
    "id": "kochi-shi-block-tekkyo",
    "name": "高知市 ブロック塀等の耐震対策補助",
    "provider": "高知市 建築指導課",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "補助対象工事費の2/3（上限205,000円）",
    "summary": "避難路等に面した危険なブロック塀の撤去・フェンス等への改修を補助する。",
    "eligibility": [
      "避難路や緊急輸送路に面したもの",
      "交付決定前の契約は対象外"
    ],
    "prefectures": [
      "高知県"
    ],
    "cities": [
      "高知市"
    ],
    "period": "令和8年度も申請受付中（期限は要確認）",
    "deadline": null,
    "url": "https://www.city.kochi.kochi.jp/soshiki/58/burokku.html"
  },
  {
    "id": "kochi-shi-jikashohi-solar",
    "name": "高知市住宅用自家消費型太陽光発電設備導入促進事業費補助金（令和8年度）",
    "provider": "高知市 新エネルギー・環境政策課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光は出力1kWあたり7万円、蓄電池は上限25万円",
    "summary": "住宅への自家消費型太陽光発電設備の導入を補助する。蓄電池同時設置も対象になり得る。",
    "eligibility": [],
    "prefectures": [
      "高知県"
    ],
    "cities": [
      "高知市"
    ],
    "period": "令和8年度（期間は要確認）",
    "deadline": null,
    "url": "https://www.city.kochi.kochi.jp/soshiki/186/r8taiyoukouhojyo.html"
  },
  {
    "id": "kochi-shi-mokuzo-jokyaku",
    "name": "高知市 木造住宅の除却工事補助",
    "provider": "高知市 建築指導課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "耐震性のない木造住宅の解体（除却）費用の一部を補助する。",
    "eligibility": [
      "耐震性がない住宅",
      "過去に耐震改修補助を受けていないこと"
    ],
    "prefectures": [
      "高知県"
    ],
    "cities": [
      "高知市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.kochi.kochi.jp/soshiki/58/mokuzouzyokyaku0504.html"
  },
  {
    "id": "fukuoka-pref-iju-shienkin",
    "name": "福岡県 移住支援金",
    "provider": "福岡県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "単身60万円、世帯100万円（子ども1人につき最大100万円を加算）",
    "summary": "県外から対象市町村へ移住し、要件を満たす人に移住支援金を給付する。",
    "eligibility": [
      "福岡県内の対象市町村へ転入",
      "週20時間以上の無期雇用契約で就業（申請日から5年以上継続勤務の意思）"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [],
    "period": "令和8年度（予算の執行状況により支給できない場合あり）",
    "deadline": null,
    "url": "https://www.pref.fukuoka.lg.jp/contents/ijushienkin.html"
  },
  {
    "id": "fukuoka-pref-kodomo-renove",
    "name": "福岡県こどもリノベ補助金",
    "provider": "福岡県 建築都市部 住宅計画課",
    "level": "prefecture",
    "category": "子育て",
    "type": "補助金",
    "amount": "補助率3分の1、上限50万円（県外からの移住リノベは補助率2分の1、上限75万円）",
    "summary": "若年世帯・子育て世帯が購入した中古住宅、または同居する親世帯の持家のリノベーション費用を補助する。",
    "eligibility": [
      "夫婦の年齢合計が80歳以下の若年世帯、または18歳未満の同居者・妊娠中の人がいる子育て世帯"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [],
    "period": "令和8年度（予算がなくなり次第終了。令和8年7月10日時点でまもなく上限に達する見込みと案内。現在の受付状況は要確認）",
    "deadline": null,
    "url": "https://www.pref.fukuoka.lg.jp/contents/kodomo-renove-hojo.html"
  },
  {
    "id": "fukuoka-pref-mokuzo-taishin",
    "name": "福岡県 木造戸建て住宅の耐震化促進（市町村を通じた耐震改修等の補助）",
    "provider": "福岡県 建築都市部",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "補助額は市町村ごとに異なる（要確認）",
    "summary": "県が市町村を通じて、木造戸建て住宅の耐震改修工事・省エネ改修工事や建替え等に伴う除却費の一部を補助する。県の診断アドバイザー派遣では、一般診断の利用者負担が6,000円、簡易診断が3,000円。",
    "eligibility": [
      "昭和56年5月以前に建築された木造戸建て住宅",
      "耐震診断で上部構造評点が1.0未満"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [],
    "period": "要確認（市町村ごとの実施状況による）",
    "deadline": null,
    "url": "https://www.pref.fukuoka.lg.jp/contents/sumai-taisin.html"
  },
  {
    "id": "fukuoka-city-block-jokyo",
    "name": "福岡市 ブロック塀等除却費補助事業",
    "provider": "福岡市 住宅都市みどり局",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "塀の長さに基づく額と見積額の3分の2のうち低い方、1件上限30万円（令和8年度は補助率・上限額を引き上げ）",
    "summary": "道路に面した、ひび割れ等の劣化がある高さ1m以上の危険なブロック塀などの撤去費を補助する。",
    "eligibility": [
      "道路に面した高さ1m以上で劣化のあるブロック塀等"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "福岡市"
    ],
    "period": "令和8年度（受付は4月13日開始）",
    "deadline": null,
    "url": "https://www.city.fukuoka.lg.jp/jutaku-toshi/bid_safe/life/3609.html"
  },
  {
    "id": "fukuoka-city-chiiki-akiya-kosodate",
    "name": "福岡市地域貢献等空き家活用補助金（子育て居住型）",
    "provider": "福岡市 住宅都市みどり局",
    "level": "municipality",
    "category": "移住",
    "type": "補助金",
    "amount": "対象経費の2分の1、上限100万円",
    "summary": "子育て世帯が市街化調整区域内の空き家に移住する際の改修費を補助する。",
    "eligibility": [
      "子育て世帯",
      "改修後10年以上その空き家を活用する"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "福岡市"
    ],
    "period": "令和8年度（詳細な受付期間は要確認）",
    "deadline": null,
    "url": "https://www.city.fukuoka.lg.jp/jutaku-toshi/jigyochosei/life/soudan/top_2_4_2.html"
  },
  {
    "id": "fukuoka-city-energy-system",
    "name": "福岡市住宅用エネルギーシステム導入支援事業",
    "provider": "福岡市 環境局",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "蓄電システムは機器費の2分の1、上限15万円・30万円・45万円（蓄電容量による）",
    "summary": "住宅に蓄電システムや高効率給湯器（エコキュート）などを導入する費用を補助する。",
    "eligibility": [
      "太陽光発電システムとHEMSを設置している（既設でも可）",
      "SIIに登録された蓄電システムが対象",
      "設置工事の着手前に申請"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "福岡市"
    ],
    "period": "令和8年度（予算枠に達し次第終了。現在の受付状況は要確認）",
    "deadline": null,
    "url": "https://www.city.fukuoka.lg.jp/kankyo/j-suishin/hp/energy-system_reiwa.html"
  },
  {
    "id": "fukuoka-city-mokuzo-taishin",
    "name": "福岡市木造戸建住宅耐震改修工事費補助事業",
    "provider": "福岡市 住宅都市みどり局 建築物安全推進課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "改修費の80%以内、上限150万円（耐震シェルター等は40%、上限25万円。建替えは1戸20万円）",
    "summary": "旧耐震基準の木造戸建住宅の耐震改修工事費を補助する。建替え・除却の補助もある。",
    "eligibility": [
      "昭和56年5月31日以前に建築確認を得た2階建て以下の住宅",
      "耐震診断で上部構造評点が1.0未満",
      "交付決定前の契約・着工は対象外"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "福岡市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.fukuoka.lg.jp/jutaku-toshi/bid_safe/life/1656.html"
  },
  {
    "id": "kitakyushu-chintai-ouen",
    "name": "住むなら北九州 移住推進事業（新婚・子育て賃貸応援メニュー）",
    "provider": "北九州市 都市戦略局",
    "level": "municipality",
    "category": "移住",
    "type": "補助金",
    "amount": "最大20万円（家賃2か月相当分）",
    "summary": "新婚世帯・子育て世帯が、要件を満たす民間賃貸住宅や空き家バンク登録住宅へ転入する場合に家賃の一部を補助する。",
    "eligibility": [
      "新婚世帯または子育て世帯",
      "市外からの転入"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "北九州市"
    ],
    "period": "確認できた年度：令和7年度（最新は要確認）",
    "deadline": null,
    "url": "https://www.city.kitakyushu.lg.jp/contents/07400241_00001.html"
  },
  {
    "id": "kitakyushu-mochiie-ouen",
    "name": "住むなら北九州 移住推進事業（若者・子育て持ち家応援メニュー）",
    "provider": "北九州市 都市戦略局",
    "level": "municipality",
    "category": "移住",
    "type": "補助金",
    "amount": "最大50万円（世帯人員1人あたり15万円）",
    "summary": "市外から転入する世帯が、街なかの区域内の良質な住宅を購入・建設する費用の一部を補助する。",
    "eligibility": [
      "市外からの転入世帯",
      "「北九州市すまいるクラブ」に登録後3か月以上経過",
      "過去に同事業の補助を受けていない"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "北九州市"
    ],
    "period": "確認できた年度：令和7年度（最新は要確認）",
    "deadline": null,
    "url": "https://www.city.kitakyushu.lg.jp/contents/07400243_00001.html"
  },
  {
    "id": "kitakyushu-mokuzo-josyaku",
    "name": "北九州市 木造住宅の除却工事補助（住替え・建替えを前提）",
    "provider": "北九州市 建築都市局 建築指導課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "住宅所有者の年齢により最大50万円または30万円",
    "summary": "住替え・建替えを前提とした木造住宅の除却工事を補助する。",
    "eligibility": [],
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "北九州市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.kitakyushu.lg.jp/contents/06700119.html"
  },
  {
    "id": "kitakyushu-mokuzo-taishin",
    "name": "北九州市 木造住宅の耐震補強工事補助",
    "provider": "北九州市 建築都市局 建築指導課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修工事監理・工事費の5分の4、1戸上限115万円（令和7年10月7日以降の初回申請は診断費上限6千円を加え最大115万6千円）",
    "summary": "木造住宅の耐震改修工事費を補助する。",
    "eligibility": [
      "昭和56年5月31日以前に建築または着工された木造住宅",
      "原則として市内事業者に依頼",
      "着工前に市との事前協議が必要"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "北九州市"
    ],
    "period": "令和8年度（予算の都合で年度途中に終了する場合あり）",
    "deadline": null,
    "url": "https://www.city.kitakyushu.lg.jp/contents/06700103.html"
  },
  {
    "id": "kitakyushu-mokuzo-taishin-shoene",
    "name": "北九州市 木造住宅の耐震補強工事と省エネ改修工事の補助",
    "provider": "北九州市 建築都市局 建築指導課",
    "level": "municipality",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "省エネ改修は上限25万円、耐震補強と合わせて1戸最大140万6千円",
    "summary": "耐震改修と同時に行う省エネ改修工事の費用を補助する。",
    "eligibility": [
      "耐震改修と同時に行う省エネ改修"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "北九州市"
    ],
    "period": "令和8年度（詳細は要確認）",
    "deadline": null,
    "url": "https://www.city.kitakyushu.lg.jp/contents/06700117.html"
  },
  {
    "id": "kurume-akiya-kaitai",
    "name": "久留米市 老朽危険空家等除却促進事業（危険な空き家の解体補助金）",
    "provider": "久留米市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "除却工事費の2分の1、上限65万円",
    "summary": "老朽化した危険な空き家（木造）の解体費用を補助する。",
    "eligibility": [
      "市内の木造建物",
      "市内業者への発注"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "久留米市"
    ],
    "period": "令和8年4月21日から令和9年1月29日（予算がなくなり次第終了）",
    "deadline": "2027-01-29",
    "url": "https://www.city.kurume.fukuoka.jp/1050kurashi/2080juutaku/3100akiya/2023-0619-0950-96.html"
  },
  {
    "id": "kurume-mokuzo-taishin",
    "name": "久留米市木造住宅耐震改修等事業費補助金",
    "provider": "久留米市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修は、工事見積額の50%、国の単価×延べ面積の50%、上限50万円のうち最も低い額",
    "summary": "木造住宅の耐震改修等の費用を補助する。",
    "eligibility": [
      "昭和56年5月31日以前に建築された木造住宅"
    ],
    "prefectures": [
      "福岡県"
    ],
    "cities": [
      "久留米市"
    ],
    "period": "令和7年度の耐震改修工事等の受付は終了。令和8年度の状況は要確認",
    "deadline": null,
    "url": "https://www.city.kurume.fukuoka.jp/1050kurashi/2080juutaku/3140taishinkaisyuu/2021-1229-0920-94.html"
  },
  {
    "id": "saga-pref-iju-sagakurashi",
    "name": "さが暮らしスタート支援事業（移住支援金）",
    "provider": "佐賀県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "単身60万円、世帯100万円",
    "summary": "全国から佐賀県へ移住する人に、移住先の市町が移住支援金を支給する。",
    "eligibility": [
      "移住時の年齢が59歳以下など"
    ],
    "prefectures": [
      "佐賀県"
    ],
    "cities": [],
    "period": "確認できた年度：令和7年度（2025年4月時点。最新は要確認。令和7年4月以降の転入者向けに「未来につなぐさが移住支援事業」の案内あり）",
    "deadline": null,
    "url": "https://www.pref.saga.lg.jp/kiji00385867/index.html"
  },
  {
    "id": "saga-pref-taishin-shindan",
    "name": "佐賀県 住宅の耐震診断補助",
    "provider": "佐賀県",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "補助内容・限度額は市町ごとに異なる（要確認）",
    "summary": "県と市町が協力して、住宅の耐震診断費用と耐震改修費用を支援する。",
    "eligibility": [
      "昭和56年5月31日以前に着工された住宅",
      "佐賀県木造住宅耐震診断登録建築士に依頼"
    ],
    "prefectures": [
      "佐賀県"
    ],
    "cities": [],
    "period": "要確認（2025年7月3日更新の案内）",
    "deadline": null,
    "url": "https://www.pref.saga.lg.jp/kiji00348104/index.html"
  },
  {
    "id": "saga-pref-zero-carbon",
    "name": "SAGAゼロカーボン加速化事業（住民向け太陽光・蓄電池補助）",
    "provider": "佐賀県",
    "level": "prefecture",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "住民向け太陽光発電設備は7万円/kW（上限35万円）",
    "summary": "住民の太陽光発電等の導入費用の一部を市町を通じて支援する。蓄電池は太陽光とセットでの導入が条件。",
    "eligibility": [
      "FIT認定を受けない",
      "自家消費比率30%以上"
    ],
    "prefectures": [
      "佐賀県"
    ],
    "cities": [],
    "period": "令和8年度（実施する市町は一部に限られる。要確認）",
    "deadline": null,
    "url": "https://www.pref.saga.lg.jp/kiji003118485/index.html"
  },
  {
    "id": "saga-city-akiya-kaitai",
    "name": "佐賀市 危険な空き家等の解体費助成",
    "provider": "佐賀市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "解体費の2分の1、上限60万円",
    "summary": "倒壊などの危険がある空き家の解体費を助成する。",
    "eligibility": [
      "1年以上無人で倒壊等の危険がある建物",
      "市内業者による工事"
    ],
    "prefectures": [
      "佐賀県"
    ],
    "cities": [
      "佐賀市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.saga.lg.jp/main/39544.html"
  },
  {
    "id": "saga-city-taishin-kaishu",
    "name": "佐賀市 住宅の耐震改修工事費補助",
    "provider": "佐賀市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修部分の工事費の80%以内、上限115万円（木造戸建ての段階的改修は1段階目70万円、2段階目45万円）",
    "summary": "耐震性能が不足する旧耐震基準の住宅の耐震改修工事費を補助する。",
    "eligibility": [
      "昭和56年5月31日以前に建築された住宅",
      "耐震診断で耐震性能不足と判定",
      "交付決定前の契約・着手は対象外"
    ],
    "prefectures": [
      "佐賀県"
    ],
    "cities": [
      "佐賀市"
    ],
    "period": "令和8年6月1日から11月30日（随時受付）",
    "deadline": "2026-11-30",
    "url": "https://www.city.saga.lg.jp/sangyo-machizukuri/toshi-kotsu/3/4/4161.html"
  },
  {
    "id": "saga-city-zerocarbon-jutaku",
    "name": "令和8年度佐賀市ゼロカーボン推進事業費補助金（住宅用太陽光発電設備・住宅用蓄電池）",
    "provider": "佐賀市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "住宅用太陽光発電設備は1住宅5万円、住宅用蓄電池は1住宅10万円",
    "summary": "住宅への太陽光発電設備・蓄電池の設置費用を補助する。",
    "eligibility": [
      "蓄電池は太陽光発電設備を設置済み、または同時に設置する場合に限る"
    ],
    "prefectures": [
      "佐賀県"
    ],
    "cities": [
      "佐賀市"
    ],
    "period": "令和8年度（受付件数に上限あり。要確認）",
    "deadline": null,
    "url": "https://www.city.saga.lg.jp/sangyo-machizukuri/kankyokyosei/2/1/4445.html"
  },
  {
    "id": "nagasaki-pref-taishin-anshin",
    "name": "長崎県耐震・安心住まいづくり支援事業",
    "provider": "長崎県",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "補助額は市町ごとに異なる（耐震診断は自己負担23,000円）",
    "summary": "県が市町と協力して、戸建て木造住宅の耐震化を支援する。",
    "eligibility": [
      "平成12年5月31日以前に建てられた戸建て木造住宅（一部市町は昭和56年5月31日以前）"
    ],
    "prefectures": [
      "長崎県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.nagasaki.jp/bunrui/machidukuri/kenchiku-jutaku/jutaku/houritu-kuninozyosei/tamatebako-zyoseiseido/"
  },
  {
    "id": "nagasaki-city-taishin-mokuzo",
    "name": "長崎市 耐震改修の助成制度（木造戸建住宅）",
    "provider": "長崎市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修は費用の80%、上限100万円。耐震診断は費用136,000円のうち113,000円を助成",
    "summary": "木造戸建住宅の耐震診断・耐震改修の費用を助成する。",
    "eligibility": [
      "過去に耐震化の補助を受けていない",
      "交付決定前の契約・着手は対象外"
    ],
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "長崎市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.nagasaki.lg.jp/sumai/620000/625000/p004252.html"
  },
  {
    "id": "nagasaki-city-taiyoko-chikudenchi",
    "name": "長崎市 太陽光発電設備等導入補助金（ゼロカーボンシティ推進事業費補助金）",
    "provider": "長崎市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "個人の場合、太陽光は7万円/kW（上限35万円）、蓄電池は5万円/kWh（上限25万円）",
    "summary": "住宅の太陽光発電設備と蓄電池の導入費用を補助する。",
    "eligibility": [
      "蓄電池は1kWh以上の定置式で太陽光と同時設置（単独は対象外）",
      "交付決定日以降に契約"
    ],
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "長崎市"
    ],
    "period": "令和8年度（受付状況は要確認）",
    "deadline": null,
    "url": "https://www.city.nagasaki.lg.jp/page/52113.html"
  },
  {
    "id": "nagasaki-city-tokutei-akiya",
    "name": "長崎市特定空家等除却費補助金",
    "provider": "長崎市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "最大50万円",
    "summary": "老朽化した危険な空き家の除却費の一部を補助する。",
    "eligibility": [],
    "prefectures": [
      "長崎県"
    ],
    "cities": [
      "長崎市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.nagasaki.lg.jp/page/1921.html"
  },
  {
    "id": "kumamoto-pref-iju-shien",
    "name": "熊本県移住支援事業（移住支援金）",
    "provider": "熊本県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "2人以上の世帯100万円、単身60万円（一部市町村で18歳未満の家族1人につき最大100万円を加算）",
    "summary": "熊本県内の市町村に移住し要件に該当する人に、市町村が移住支援金を支給する。",
    "eligibility": [
      "東京圏からの移住が前提",
      "週20時間以上の無期雇用契約など就業要件"
    ],
    "prefectures": [
      "熊本県"
    ],
    "cities": [],
    "period": "令和8年度（加算の有無は移住先市町村と転入日による）",
    "deadline": null,
    "url": "https://www.pref.kumamoto.jp/soshiki/21/264806.html"
  },
  {
    "id": "kumamoto-pref-taishin",
    "name": "熊本県 住宅耐震化支援事業",
    "provider": "熊本県 土木部 建築課",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認（令和6年度から補助限度額が引き上げられたと県計画に記載。金額は市町村ごとに異なる）",
    "summary": "県が市町村と連携して、戸建て木造住宅の耐震診断・耐震改修設計・工事・建替え等を支援する。",
    "eligibility": [
      "平成12年までに建築された木造戸建て住宅も補助対象に追加（県計画の記載）"
    ],
    "prefectures": [
      "熊本県"
    ],
    "cities": [],
    "period": "要確認（補助条件・受付期間は市町村ごと）",
    "deadline": null,
    "url": "https://www.pref.kumamoto.jp/soshiki/115/51288.html"
  },
  {
    "id": "kumamoto-city-akiya-josyaku",
    "name": "熊本市老朽危険空家等除却促進事業補助金",
    "provider": "熊本市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "要確認",
    "summary": "老朽危険空家の除却（ブロック塀の撤去を含む敷地全体の更地化）の費用を補助する。",
    "eligibility": [],
    "prefectures": [
      "熊本県"
    ],
    "cities": [
      "熊本市"
    ],
    "period": "令和9年1月29日まで（予算がなくなり次第終了）",
    "deadline": "2027-01-29",
    "url": "https://www.city.kumamoto.jp/kiji00324944/index.html"
  },
  {
    "id": "kumamoto-city-block",
    "name": "熊本市 公道等に面するブロック塀等の撤去に関する補助制度",
    "provider": "熊本市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "1敷地あたり最大20万円",
    "summary": "避難路などに面した危険なブロック塀の撤去費用を補助する。",
    "eligibility": [
      "契約・事業実施前の申込みと交付決定が必要"
    ],
    "prefectures": [
      "熊本県"
    ],
    "cities": [
      "熊本市"
    ],
    "period": "令和8年4月1日から12月28日（10件程度の先着順）",
    "deadline": "2026-12-28",
    "url": "https://www.city.kumamoto.jp/dynamic/hpkiji/pub/Detail.aspx?c_id=3&id=22684"
  },
  {
    "id": "kumamoto-city-ev",
    "name": "熊本市省エネルギー機器等導入推進事業補助金（電気自動車等）",
    "provider": "熊本市 脱炭素戦略課",
    "level": "municipality",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "1件10万円",
    "summary": "電気自動車等の購入費を補助する。",
    "eligibility": [
      "国のクリーンエネルギー自動車導入促進補助金の対象車両で給電機能を持つもの"
    ],
    "prefectures": [
      "熊本県"
    ],
    "cities": [
      "熊本市"
    ],
    "period": "令和8年度は前期・後期の2期制。後期は10月19日から受付",
    "deadline": null,
    "url": "https://www.city.kumamoto.jp/kiji00369554/index.html"
  },
  {
    "id": "kumamoto-city-taishin-kaishu",
    "name": "熊本市 戸建木造住宅の耐震改修等事業（改修一括メニュー）",
    "provider": "熊本市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "要確認",
    "summary": "戸建木造住宅の耐震改修等の費用を補助する。",
    "eligibility": [],
    "prefectures": [
      "熊本県"
    ],
    "cities": [
      "熊本市"
    ],
    "period": "令和8年度（2026年8月20日付で、予算調整のため今後の相談案件を一旦預かりとする案内あり。要確認）",
    "deadline": null,
    "url": "https://www.city.kumamoto.jp/kiji0031284/index.html"
  },
  {
    "id": "kumamoto-city-taiyoko-chikudenchi",
    "name": "熊本市省エネルギー機器等導入推進事業補助金（太陽光発電設備・蓄電池）",
    "provider": "熊本市 脱炭素戦略課",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "太陽光発電設備（蓄電池併設型）1件8万円、蓄電池（FIT満了世帯対象）1件8万円",
    "summary": "住宅の太陽光発電設備と蓄電池の導入費用を補助する。",
    "eligibility": [
      "太陽光併設型の蓄電池は環境省の蓄電池補助金の対象製品"
    ],
    "prefectures": [
      "熊本県"
    ],
    "cities": [
      "熊本市"
    ],
    "period": "令和8年度は2期制。後期は11月2日から受付",
    "deadline": null,
    "url": "https://www.city.kumamoto.jp/kiji00369554/index.html"
  },
  {
    "id": "oita-pref-fcv-konyu",
    "name": "大分県燃料電池自動車購入支援事業費補助金",
    "provider": "大分県",
    "level": "prefecture",
    "category": "EV・充電",
    "type": "補助金",
    "amount": "要確認",
    "summary": "燃料電池自動車（FCV）の購入を支援する。",
    "eligibility": [],
    "prefectures": [
      "大分県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.oita.jp/soshiki/14340/fcv-konyushien.html"
  },
  {
    "id": "oita-pref-iju-shienkin",
    "name": "大分県 移住支援金",
    "provider": "大分県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "2人以上世帯100万円、単身60万円（市町村により子育て世帯加算あり）",
    "summary": "県外から大分県へ移住する人に移住支援金を支給する。",
    "eligibility": [
      "県外からの移住者"
    ],
    "prefectures": [
      "大分県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.oita.jp/soshiki/10112/ijyushienjigyo.html"
  },
  {
    "id": "oita-pref-mokuzo-taishin",
    "name": "大分県 「木造住宅の耐震化」補助制度",
    "provider": "大分県 土木建築部",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "全体改修は最高150万円（定額）、段階的改修は最高60万円（補助率3分の2）",
    "summary": "木造住宅の耐震化の費用を補助する。",
    "eligibility": [
      "昭和56年5月以前に着工された木造住宅等"
    ],
    "prefectures": [
      "大分県"
    ],
    "cities": [],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.pref.oita.jp/soshiki/18500/zyuutakuhojo-taishin.html"
  },
  {
    "id": "oita-city-akiya-riyo",
    "name": "大分市空き家等利活用事業（転用促進・移住者購入補助）",
    "provider": "大分市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "要確認",
    "summary": "空き家の改修や購入に対して補助する。転用促進事業と移住者購入補助事業は受付中、流通促進事業と家財整理促進事業は予算上限に達し停止中。",
    "eligibility": [],
    "prefectures": [
      "大分県"
    ],
    "cities": [
      "大分市"
    ],
    "period": "令和8年度（要確認）",
    "deadline": null,
    "url": "https://www.city.oita.oita.jp/o168/kurashi/sumaijoho/1490688834071.html"
  },
  {
    "id": "oita-city-chikudenchi-v2h",
    "name": "大分市 住宅用再エネ・省エネ設備（定置用リチウムイオン蓄電池・V2H）設置補助",
    "provider": "大分市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "補助対象設備1件につき一律5万円",
    "summary": "住宅に定置用リチウムイオン蓄電池・V2Hを設置した人に費用の一部を補助する（太陽光発電設備への補助は平成30年度で終了）。",
    "eligibility": [
      "契約日が令和7年10月1日以降",
      "設置工事完了後に窓口へ直接持参（郵送不可）"
    ],
    "prefectures": [
      "大分県"
    ],
    "cities": [
      "大分市"
    ],
    "period": "令和8年5月1日から令和9年3月31日",
    "deadline": "2027-03-31",
    "url": "https://www.city.oita.oita.jp/o258/machizukuri/kankyo/r4saienesyouenehojyokin.html"
  },
  {
    "id": "miyazaki-pref-hinata-zero-carbon",
    "name": "ひなたゼロカーボン加速化事業補助金（住宅・事業所の脱炭素化支援）",
    "provider": "宮崎県 環境森林部",
    "level": "prefecture",
    "category": "省エネ住宅",
    "type": "補助金",
    "amount": "要確認",
    "summary": "県内で再エネ・省エネ設備を導入する個人や法人を対象とする補助。住宅向けの対象設備は要確認。",
    "eligibility": [],
    "prefectures": [
      "宮崎県"
    ],
    "cities": [],
    "period": "令和8年度（詳細は要確認）",
    "deadline": null,
    "url": "https://www.pref.miyazaki.lg.jp/kankyoshinrin/kurashi/shizen/20260611164947.html"
  },
  {
    "id": "miyazaki-pref-iju-shienkin",
    "name": "宮崎県 移住支援金事業",
    "provider": "宮崎県",
    "level": "prefecture",
    "category": "移住",
    "type": "給付",
    "amount": "2人以上の世帯100万円、単身60万円または30万円",
    "summary": "都市部から県内へ移住し、中小企業への就職等をする人に市町村が支援金を支給する。",
    "eligibility": [
      "都市部からの移住",
      "中小企業への就職等"
    ],
    "prefectures": [
      "宮崎県"
    ],
    "cities": [],
    "period": "確認できた年度：令和6年度（最新は要確認）",
    "deadline": null,
    "url": "https://www.pref.miyazaki.lg.jp/chusankan-chiiki/kurashi/chiiki/20190717104401.html"
  },
  {
    "id": "miyazaki-pref-mokuzo-taishin",
    "name": "宮崎県 木造住宅耐震化の支援制度",
    "provider": "宮崎県 建築住宅課",
    "level": "prefecture",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震診断は最大136,000円、耐震改修は工事費の8割（最大115万円）が補助対象",
    "summary": "県が市町村と連携して、木造住宅の耐震診断・耐震改修を支援する。",
    "eligibility": [
      "昭和56年5月31日以前に着工した木造住宅"
    ],
    "prefectures": [
      "宮崎県"
    ],
    "cities": [],
    "period": "要確認（実施は市町村）",
    "deadline": null,
    "url": "https://www.pref.miyazaki.lg.jp/kenchikujutaku/kurashi/shakaikiban/joseiseido.html"
  },
  {
    "id": "miyazaki-city-akiya-kaitai",
    "name": "宮崎市 危険な空き家の解体費補助（令和8年度二次募集）",
    "provider": "宮崎市",
    "level": "municipality",
    "category": "空き家・ブロック塀",
    "type": "補助金",
    "amount": "補助対象経費の2分の1以内、上限40万円",
    "summary": "危険な空き家等と判定された建物の解体費を補助する。",
    "eligibility": [
      "危険な空き家等と判定されたもの"
    ],
    "prefectures": [
      "宮崎県"
    ],
    "cities": [
      "宮崎市"
    ],
    "period": "二次募集は令和8年8月17日受付開始、令和8年10月30日までに交付申請",
    "deadline": "2026-10-30",
    "url": "https://www.city.miyazaki.miyazaki.jp/life/house/dwelling/405978.html"
  },
  {
    "id": "miyazaki-city-mokuzo-taishin",
    "name": "宮崎市 木造住宅の耐震化支援",
    "provider": "宮崎市",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震改修は費用の80%、限度額115万円",
    "summary": "木造住宅の耐震診断・耐震改修・除却・建替えを支援する。",
    "eligibility": [
      "耐震診断の評点が低い住宅",
      "昭和56年5月31日以前の木造住宅（県制度の記載。市の条件は要確認）"
    ],
    "prefectures": [
      "宮崎県"
    ],
    "cities": [
      "宮崎市"
    ],
    "period": "令和8年度の申込受付は終了（令和8年度より先着順から抽選に変更）",
    "deadline": null,
    "url": "https://www.city.miyazaki.miyazaki.jp/business/architecture/earthquake_resistant/148080.html"
  },
  {
    "id": "kagoshima-city-kosodate-sumikae",
    "name": "鹿児島市 子育て世帯の住替えに関する補助",
    "provider": "鹿児島市 建築部",
    "level": "municipality",
    "category": "子育て",
    "type": "補助金",
    "amount": "要確認",
    "summary": "子育て世帯の住替えに関する補助。",
    "eligibility": [],
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "鹿児島市"
    ],
    "period": "要確認",
    "deadline": null,
    "url": "https://www.city.kagoshima.lg.jp/kensetu/kenchiku/jutaku/kosodatesumikaeshien/kosodatesumikaehojyo.html"
  },
  {
    "id": "kagoshima-city-stock-taishin",
    "name": "鹿児島市 安全安心住宅ストック支援事業（住宅の耐震化）",
    "provider": "鹿児島市 建築指導課",
    "level": "municipality",
    "category": "耐震",
    "type": "補助金",
    "amount": "耐震診断は3分の2・上限10万円、耐震改修工事は2分の1・上限115万円、耐震シェルター・防災ベッドは上限25万円",
    "summary": "戸建住宅の耐震診断・耐震改修、耐震シェルター等の設置費を補助する。空家活用者・移住者向けリフォーム補助も同事業にある。",
    "eligibility": [
      "昭和56年5月31日以前に着工された戸建住宅",
      "所定の講習会を受講した建築士が診断・設計・監理を行う"
    ],
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "鹿児島市"
    ],
    "period": "令和8年度。受付は令和8年12月9日まで（予算に達した時点で終了）。工事完了期限は令和9年2月5日",
    "deadline": "2026-12-09",
    "url": "https://www.city.kagoshima.lg.jp/kensetu/kenchiku/kenshido/stock.html"
  },
  {
    "id": "kagoshima-city-zerocarbon-taiyoko",
    "name": "鹿児島市 ゼロカーボン推進支援事業（太陽光）補助金",
    "provider": "鹿児島市",
    "level": "municipality",
    "category": "太陽光・蓄電池",
    "type": "補助金",
    "amount": "個人住宅の太陽光発電システムは1kWあたり1万5千円、上限15万円（10kW未満）",
    "summary": "個人住宅の太陽光発電システム等の設置費を補助する。蓄電池・燃料電池は太陽光と同時設置の場合のみ対象。",
    "eligibility": [
      "個人住宅区分はHEMSの同時設置が必要"
    ],
    "prefectures": [
      "鹿児島県"
    ],
    "cities": [
      "鹿児島市"
    ],
    "period": "令和8年度（ページに「一部受付終了」と表示。受付状況は要確認）",
    "deadline": null,
    "url": "https://www.city.kagoshima.lg.jp/kankyo/kankyo/saiene/taiyokohojor8.html"
  },
];
