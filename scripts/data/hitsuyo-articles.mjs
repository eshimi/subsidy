// 「やりたいことから探す」の、カテゴリと個別の解説（public/hitsuyo/）のデータ。
// 構成：hitsuyo.html（入口）→ hitsuyo/<カテゴリ>.html（カテゴリのページ）→ hitsuyo/<カテゴリ>-<購入物>.html（個別の解説）
// 書き方の決まり：金額・補助率・締切は、公式の公募要領などで確認できたものだけを、確認した時期とあわせて書く。確認できないものは、考え方・手順の説明にする。
// 「必ず採択される」などの断定はしない。制度は公募回ごとに変わるため、末尾に確認先（公式）を入れる。

export const UPDATED = '2026年10月17日';

// 5つのカテゴリ。ready: true のものは、カテゴリのページがある。articles は、そのカテゴリの個別の解説（準備中のものは soon に名前だけ）
export const CATEGORIES = [
  { id: 'store', label: '店舗・設備投資', icon: '🏪', ready: true, banner: 'b03',
    examples: '業務用エアコン、厨房設備、POSレジ、券売機、冷蔵庫、工作機械、ロボット、自動化装置',
    lead: '店舗や工場の設備を買う・入れ替えるときに、関係しそうな補助金の探し方をまとめました。購入するものから、調べ方・確認すること・契約の注意を解説します。',
    purposes: ['equipment', 'green', 'digital'],
    soon: ['冷蔵・冷凍設備', '工作機械の更新', 'ロボット・自動化装置', '店舗の内装・改装'] },
  { id: 'it', label: 'IT・デジタル化', icon: '💻', ready: false,
    examples: 'ホームページ、ECサイト、会計ソフト、予約管理、顧客管理、AI導入、クラウドサービス' },
  { id: 'home', label: '住まい・エネルギー', icon: '🏠', ready: false,
    examples: '太陽光発電、蓄電池、EV・充電設備、断熱リフォーム、耐震改修、バリアフリー' },
  { id: 'people', label: '人材・組織づくり', icon: '👥', ready: false,
    examples: '正社員化、賃上げ、採用、研修、リスキリング、育児・介護との両立、職場環境改善' },
  { id: 'startup', label: '創業・新事業', icon: '🌱', ready: false,
    examples: '店舗開業、空き店舗活用、新商品開発、新市場参入、事業承継、海外展開' },
];

const L = {
  jgrants: ['jGrants（デジタル庁の補助金の電子申請・公募情報）', 'https://www.jgrants-portal.go.jp/'],
  mirasapo: ['ミラサポplus（中小企業向けの補助金・支援の情報）', 'https://mirasapo-plus.go.jp/'],
  chusho: ['中小企業庁', 'https://www.chusho.meti.go.jp/'],
  jnet: ['J-Net21（中小企業基盤整備機構の支援情報）', 'https://j-net21.smrj.go.jp/'],
  sii: ['環境共創イニシアチブ（SII：省エネ関連の補助金の実施団体）', 'https://sii.or.jp/'],
};

// 個別の解説。sections は [見出し, HTML] の並び。HTML は article.mjs の P / UL / TABLE などで組み立てる（build-hitsuyo-articles.mjs 側で渡す）
export const ARTICLES = [
  {
    cat: 'store', slug: 'kitchen', banner: 'b07', icon: '🍳', purposes: ['equipment', 'sales'],
    label: '厨房機器', kicker: '厨房機器',
    title: '飲食店の厨房機器を購入するときに調べたい補助金',
    lead: 'オーブン、冷蔵庫、フライヤー、食洗機などの厨房機器を買う前に、補助金が使えるかを調べる手順をまとめました。厨房機器だけを対象にする制度は多くないため、「何の取り組みの一部として申請するか」を考えるのがコツです。',
    summary: '飲食店が厨房機器を購入するときに、検討したい補助金（持続化補助金・省力化投資補助金・新事業進出補助金・自治体の制度）と、購入前の確認事項、契約・発注の注意を解説します。',
    sources: [L.chusho, L.jgrants, L.mirasapo, L.jnet],
    related: [['../hitsuyo.html', '必要なものから探す'], ['store.html', '店舗・設備投資の補助金'], ['store-pos.html', 'POSレジ・券売機・注文端末に使える補助金'], ['../feature/jizokuka.html', '小規模事業者持続化補助金とは'], ['../feature/shoryokuka.html', '省力化投資補助金とは'], ['../feature/monodukuri.html', '新事業進出・ものづくり商業サービス補助金とは'], ['../basics/documents.html', '補助金の申請に必要な書類'], ['../columns/subsidy-paid-after.html', '補助金は後払いの仕組み'], ['../cases/shoryokuka-restaurant-ticket.html', '活用事例：飲食店が券売機を入れた例'], ['../hantei.html', 'AI補助金判定'], ['../area/index.html', '地域別の補助金']],
  },
  {
    cat: 'store', slug: 'aircon', banner: 'b12', icon: '❄️', purposes: ['green', 'equipment'],
    label: '業務用エアコン', kicker: '業務用エアコン',
    title: '業務用エアコンを入れ替えるときに調べたい補助金｜国の省エネ補助と自治体の助成',
    lead: '店舗・事務所・工場の業務用エアコンを入れ替えるときに、検討したい補助金の種類と、調べる順番をまとめました。国の省エネ補助は公募回ごとに変わり、自治体の助成は地域で大きく違います。',
    summary: '業務用エアコン（高効率空調）の入れ替えで検討したい、国の省エネ補助金と自治体の助成の探し方、購入前の確認事項、着工・契約の前に申請が必要なことを解説します。',
    sources: [L.sii, L.jgrants, L.chusho, L.jnet],
    related: [['../hitsuyo.html', '必要なものから探す'], ['store.html', '店舗・設備投資の補助金'], ['store-kitchen.html', '厨房機器を購入するときに調べたい補助金'], ['../grants/purposes.html', '目的別の補助金（省エネ）'], ['../basics/documents.html', '補助金の申請に必要な書類'], ['../columns/subsidy-paid-after.html', '補助金は後払いの仕組み'], ['../hantei.html', 'AI補助金判定'], ['../area/index.html', '地域別の補助金'], ['../area/minato.html', '東京都港区の補助金（高効率空調の助成の例）']],
  },
  {
    cat: 'store', slug: 'pos', banner: 'b05', icon: '🧾', purposes: ['digital', 'equipment'],
    label: 'POSレジ・券売機・注文端末', kicker: 'POSレジ・券売機',
    title: 'POSレジ・券売機・タブレット注文端末に使える補助金',
    lead: 'POSレジ、券売機、タブレット注文端末、自動釣銭機を入れるときに検討したい補助金を、購入前の確認事項とあわせてまとめました。ソフトとハードで、使える制度が分かれる点に注意が必要です。',
    summary: 'POSレジ・券売機・タブレット注文端末・自動釣銭機の導入で検討したい、デジタル化・AI導入補助金、省力化投資補助金（カタログ注文型）などと、購入前の確認事項、契約・発注の注意を解説します。',
    sources: [L.jgrants, L.chusho, L.mirasapo, L.jnet],
    related: [['../hitsuyo.html', '必要なものから探す'], ['store.html', '店舗・設備投資の補助金'], ['store-kitchen.html', '厨房機器を購入するときに調べたい補助金'], ['../feature/digital-subsidy.html', 'デジタル化・AI導入補助金とは'], ['../feature/shoryokuka.html', '省力化投資補助金とは'], ['../cases/shoryokuka-restaurant-ticket.html', '活用事例：飲食店が券売機を入れた例'], ['../basics/documents.html', '補助金の申請に必要な書類'], ['../columns/subsidy-paid-after.html', '補助金は後払いの仕組み'], ['../hantei.html', 'AI補助金判定'], ['../area/index.html', '地域別の補助金']],
  },
];
