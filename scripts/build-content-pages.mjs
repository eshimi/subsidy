// 基礎知識（basics/）・対象者別（who/）・個人向け（personal/）の解説ページを生成する。
// 使い方：node scripts/build-content-pages.mjs（内容を変えたら実行し、生成されたファイルをコミットする）
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { P, UL, OL, QA, DL, TABLE, NOTE_ALL, articleBody, indexBody, writeArticle } from './lib/article.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const UPDATED = '2026年10月10日';

const OFFICIAL = {
  mirasapo: ['ミラサポplus（中小企業向けの補助金・支援の情報）', 'https://mirasapo-plus.go.jp/'],
  jgrants: ['jGrants（デジタル庁の補助金の電子申請・公募情報）', 'https://www.jgrants-portal.go.jp/'],
  jnet: ['J-Net21（中小企業基盤整備機構の支援情報）', 'https://j-net21.smrj.go.jp/'],
  chusho: ['中小企業庁', 'https://www.chusho.meti.go.jp/'],
  nta: ['国税庁（税の取り扱い）', 'https://www.nta.go.jp/'],
  mhlw: ['厚生労働省（雇用関係の助成金・教育訓練給付）', 'https://www.mhlw.go.jp/'],
  mlit: ['国土交通省（住宅の省エネ・リフォームの支援）', 'https://www.mlit.go.jp/'],
  env: ['環境省（住宅・省エネの支援）', 'https://www.env.go.jp/'],
  meti: ['経済産業省（クリーンエネルギー自動車などの支援）', 'https://www.meti.go.jp/'],
  cfa: ['こども家庭庁（子育ての支援）', 'https://www.cfa.go.jp/'],
  hellowork: ['ハローワークインターネットサービス', 'https://www.hellowork.mhlw.go.jp/'],
  chisou: ['内閣府 地方創生（移住支援金）', 'https://www.chisou.go.jp/'],
  jfc: ['日本政策金融公庫（創業融資）', 'https://www.jfc.go.jp/'],
};

// ── 基礎知識 ──────────────────────────────────────────
const BASICS = [
  {
    file: 'flow.html', banner: 'b13', kicker: '申請の流れ',
    title: '補助金の申請の流れ｜探してから入金まで',
    lead: '補助金は、申請してすぐにもらえるものではありません。探す、申請する、交付決定を受ける、事業を行う、報告する、入金される、という流れを順に説明します。',
    summary: '補助金を探してから入金されるまでの全体の流れと、各段階で気をつけることを解説します。',
    related: [['business-plan.html', '事業計画書の書き方'], ['after-adoption.html', '交付決定から入金まで'], ['../columns/gbizid-early.html', 'gBizIDプライムは早めに取得'], ['../columns/subsidy-paid-after.html', '補助金は「後払い」']],
    sources: [OFFICIAL.mirasapo, OFFICIAL.jgrants],
    sections: [
      ['全体の流れ', [
        OL([
          '<strong>探す</strong>：目的・地域・締切から、使えそうな制度を探します（<a href="../search.html">キーワード・地域で探す</a>）。',
          '<strong>要件を確認する</strong>：公募要領で、対象者・対象経費・締切・必要書類を確認します。',
          '<strong>準備する</strong>：gBizIDプライムの取得、見積書、決算書や確定申告書の控えなどを用意します。',
          '<strong>事業計画書を作る</strong>：何に取り組み、どんな効果が出るかを書きます。',
          '<strong>申請する</strong>：多くの制度は jGrants などの電子申請です。',
          '<strong>審査・採択</strong>：審査を経て、採択か不採択かが通知されます。',
          '<strong>交付申請・交付決定</strong>：採択後に交付申請を行い、交付決定を受けます。',
          '<strong>事業を行う</strong>：交付決定の後に、発注・契約・支払いをします。',
          '<strong>実績報告</strong>：事業が終わったら、証拠書類をそろえて報告します。',
          '<strong>確定・入金</strong>：報告の確認を経て、補助金の額が確定し、入金されます。',
          '<strong>事後の報告</strong>：制度によっては、数年間、事業の状況を報告します。',
        ]),
      ].join('\n')],
      ['かかる期間の目安', [
        P('申請から入金までは、半年から1年以上かかることも珍しくありません。その間は自己資金や融資で支払う必要があります。期間は制度と公募回によって大きく違うため、公募要領のスケジュールで確認してください。'),
      ].join('\n')],
      ['各段階で気をつけること', [
        UL([
          '<strong>締切は「申請の締切」だけではない</strong>：支援機関の書類の発行締切など、申請より前の締切がある制度もあります。',
          '<strong>交付決定の前に発注しない</strong>：多くの制度で、決定前の契約・支払いは対象外です。',
          '<strong>証拠書類を保存する</strong>：見積書、契約書、請求書、支払いの記録、写真などを、事業の途中から残しておきます。',
          '<strong>計画を変えるときは相談する</strong>：内容や金額を変える場合、事前の申請が必要なことがあります。',
        ]),
      ].join('\n')],
      ['よくある質問', [
        QA([
          ['採択されたら、すぐに使い始めてよいですか？', 'いいえ。採択の後に交付申請・交付決定の手続きがある制度が多く、決定の前の発注は対象外になることがあります。'],
          ['申請は自分でできますか？', 'できます。商工会議所・商工会、よろず支援拠点などの無料の相談窓口も使えます。'],
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'business-plan.html', banner: 'b18', kicker: '事業計画書の書き方',
    title: '補助金の事業計画書の書き方｜審査で見られる点と書き方の型',
    lead: '多くの補助金では、事業計画書の内容で採択が決まります。審査で一般的に見られる点と、書き方の型、よくある失敗をまとめました。',
    summary: '補助金の審査で一般的に見られる点と、事業計画書の書き方の型、よくある失敗を解説します。',
    related: [['flow.html', '補助金の申請の流れ'], ['not-adopted.html', '不採択だったときの対処'], ['../columns/free-consultation.html', '補助金の無料相談窓口']],
    sources: [OFFICIAL.mirasapo, OFFICIAL.jnet],
    sections: [
      ['審査で一般的に見られる点', [
        P('審査の項目は制度ごとに公募要領で示されます。多くの制度で共通するのは、次のような点です。'),
        UL([
          '<strong>目的と課題</strong>：今どんな課題があり、なぜこの取り組みが必要か。',
          '<strong>取り組みの内容</strong>：何を、いつ、どのように行うか。補助の対象経費と結びついているか。',
          '<strong>実現の見込み</strong>：体制、スケジュール、資金の手当てが現実的か。',
          '<strong>効果</strong>：売上・利益・生産性・賃金などが、どのくらい良くなるか。できるだけ数字で示す。',
          '<strong>政策との合致</strong>：制度の目的（販路開拓、省力化、賃上げなど）に合っているか。',
        ]),
      ].join('\n')],
      ['書き方の型', [
        OL([
          '<strong>現状</strong>：事業の概要、顧客、強み、数字（売上や客数など）。',
          '<strong>課題</strong>：解決したい問題を、具体的に一つか二つに絞る。',
          '<strong>取り組み</strong>：課題に対して何をするか。導入する設備やサービスと、その理由。',
          '<strong>スケジュールと体制</strong>：いつ、誰が行うか。',
          '<strong>効果と数値目標</strong>：取り組みの後、何がどれだけ変わるか。根拠も添える。',
          '<strong>資金計画</strong>：総額、補助金、自己資金・融資の内訳。',
        ]),
      ].join('\n')],
      ['よくある失敗', [
        UL([
          '制度の目的と、取り組みの内容がずれている',
          '「売上が上がる」とだけ書き、根拠や数字がない',
          '見積書の内容と、計画書の経費が合っていない',
          '公募要領の様式や、文字数・ページ数の決まりを守っていない',
          '他の会社の文章をそのまま使っている',
        ]),
      ].join('\n')],
      ['相談できる先', [
        P('商工会議所・商工会、よろず支援拠点、認定経営革新等支援機関などで、計画書の相談ができます。制度によっては、支援機関の確認や書類が必要です。'),
      ].join('\n')],
    ],
  },
  {
    file: 'after-adoption.html', banner: 'b07', kicker: '交付決定から入金まで',
    title: '採択の後にやること｜交付決定・実績報告・入金まで',
    lead: '採択はゴールではありません。交付決定、事業の実施、実績報告、額の確定を経て、ようやく入金されます。採択の後の手続きを説明します。',
    summary: '採択後の交付申請、交付決定、事業の実施、実績報告、入金、事後の報告までの手続きを解説します。',
    related: [['flow.html', '補助金の申請の流れ'], ['tax.html', '補助金の税金と会計'], ['../columns/subsidy-paid-after.html', '補助金は「後払い」']],
    sources: [OFFICIAL.mirasapo, OFFICIAL.jgrants],
    sections: [
      ['採択と交付決定の違い', [
        P('「採択」は審査に通ったことを示します。その後、交付申請を行い、「交付決定」を受けて初めて、補助の対象として事業を始められる制度が多くあります。交付決定の前に発注・契約した経費は、対象外になることがあります。'),
      ].join('\n')],
      ['事業の実施中に気をつけること', [
        UL([
          '発注・契約・納品・支払いを、交付決定の後に、事業の期間内に行う',
          '見積書、発注書、契約書、納品書、請求書、振込の記録を、すべて保存する',
          '計画を変えるときは、事前に事務局へ相談・申請する',
          '支払いは、現金より振込など記録が残る方法にする',
        ]),
      ].join('\n')],
      ['実績報告から入金まで', [
        OL([
          '事業が終わったら、期限までに実績報告を提出する',
          '事務局が書類を確認し、必要に応じて追加の説明を求められる',
          '補助金の額が確定する（計画より少なくなることもある）',
          '請求の手続きを行い、補助金が入金される',
        ]),
      ].join('\n')],
      ['入金の後も続くこと', [
        UL([
          '<strong>事業化状況の報告</strong>：制度によっては、数年間、売上などの状況を報告します。',
          '<strong>財産の処分の制限</strong>：補助金で取得した設備を、一定の期間、勝手に売ったり捨てたりできない決まりがあります。',
          '<strong>書類の保存</strong>：証拠書類は、決められた期間保存します。',
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'tax.html', banner: 'b13', kicker: '補助金の税金と会計',
    title: '補助金の税金と会計｜受け取った補助金はどう扱う？',
    lead: '受け取った補助金には、原則として税金がかかります。一般的な扱いと、知っておきたい特例をまとめました。個別の判断は税理士や税務署に確認してください。',
    summary: '補助金の収入としての扱い、計上の時期、消費税、設備を買った場合の特例など、税金と会計の基本を解説します。',
    related: [['after-adoption.html', '交付決定から入金まで'], ['../guides/tax-filing-basics.html', '副業の確定申告の基礎知識'], ['flow.html', '補助金の申請の流れ']],
    sources: [OFFICIAL.nta],
    sections: [
      ['一般的な扱い', [
        UL([
          '<strong>収入（益金）になる</strong>：補助金は、原則として法人の益金、個人事業主の事業の収入として扱われ、所得税・法人税の対象になります。',
          '<strong>消費税はかからない</strong>：補助金は、消費税の対象外（不課税）として扱われるのが一般的です。',
          '<strong>計上の時期</strong>：一般に、交付の額が確定した時点で収入に計上するとされます。入金の時期と年度がずれることがあるため注意してください。',
        ]),
      ].join('\n')],
      ['設備を買った場合の特例', [
        P('補助金で機械などの固定資産を取得した場合、一定の要件のもとで、法人は「圧縮記帳」、個人事業主は「総収入金額に算入しない」特例を使える場合があります。補助金を受け取った年に税金が大きくなるのを避け、減価償却を通じて税負担をならす仕組みです。適用の要件や手続きは、税理士に確認してください。'),
      ].join('\n')],
      ['注意したいこと', [
        UL([
          '補助金で支払った経費も、経費として計上します（補助金を差し引くのではありません）。',
          '設備の補助金では、減価償却の計算に特例の影響が出ることがあります。',
          '助成金（雇用関係）も、原則として収入として扱われます。',
        ]),
        P('この記事は一般的な説明です。実際の処理は、事業の状況によって変わります。'),
      ].join('\n')],
    ],
  },
  {
    file: 'not-adopted.html', banner: 'b09', kicker: '不採択だったときの対処',
    title: '補助金が不採択だったら｜次にやること',
    lead: '補助金は、申請すれば必ず採択されるわけではありません。不採択だった場合に、次に取れる行動をまとめました。',
    summary: '不採択だったときに確認すること、次の公募への準備、ほかの制度や融資の検討を解説します。',
    related: [['business-plan.html', '事業計画書の書き方'], ['../columns/subsidy-vs-grant-vs-loan.html', '補助金・助成金・融資の違い'], ['../search.html', '補助金を探す']],
    sources: [OFFICIAL.mirasapo, OFFICIAL.jfc],
    sections: [
      ['まず確認すること', [
        UL([
          '制度によっては、不採択の理由や審査の講評を確認できる場合があります。',
          '公募要領の審査項目と、自分の計画書を見比べ、弱かった点を探します。',
          '書類の不備や、要件の誤解がなかったかを確認します。',
        ]),
      ].join('\n')],
      ['次にできること', [
        OL([
          '<strong>次の公募に再挑戦する</strong>：計画を見直して、次の回に申請します。',
          '<strong>ほかの制度を探す</strong>：都道府県・市区町村の制度など、条件の合う別の制度を探します（<a href="../search.html">補助金を探す</a>）。',
          '<strong>融資を使う</strong>：日本政策金融公庫などの融資で、先に取り組みを進める方法もあります。',
          '<strong>相談する</strong>：商工会議所・商工会、よろず支援拠点で、計画を一緒に見直します。',
        ]),
      ].join('\n')],
      ['気をつけたいこと', [
        P('不採択の後に、採択を約束するような高額の代行サービスには注意してください。補助金の採択を保証できる人はいません。'),
      ].join('\n')],
    ],
  },
];

const GLOSSARY = [
  ['補助金', '国や自治体が、政策の目的に合う取り組みの経費の一部を支援するお金。審査があり、原則として返済は不要。'],
  ['助成金', '主に雇用や人材育成に関する支援。要件を満たせば受給できるものが多い（厚生労働省の雇用関係の助成金など）。'],
  ['給付金', '個人や事業者に一定の条件で給付されるお金。審査型の補助金とは仕組みが違う。'],
  ['公募要領', '補助金の目的、対象者、対象経費、締切、審査項目などを定めた資料。申請の前に必ず読む。'],
  ['公募回（次）', '同じ補助金を、時期を分けて何回か募集すること。回ごとに要件が変わることがある。'],
  ['補助率', '補助対象の経費のうち、補助金で支払われる割合。'],
  ['補助上限額', '一つの申請で受け取れる補助金の上限。'],
  ['補助対象経費', '補助金の計算の対象になる経費。対象外の経費は自己負担になる。'],
  ['採択', '審査に通ったこと。採択の後に交付決定の手続きがある制度が多い。'],
  ['交付申請・交付決定', '採択の後に補助金の交付を申請し、決定を受けること。原則として決定の後に発注する。'],
  ['実績報告', '事業が終わった後に、行った内容と支払った経費を報告する手続き。'],
  ['額の確定', '実績報告の確認を経て、実際に支払われる補助金の額が決まること。'],
  ['精算払い・概算払い', '事業の後にまとめて支払うのが精算払い。一部を先に支払う概算払いがある制度もある。'],
  ['事業化状況報告', '補助事業の後、数年間にわたって事業の状況を報告する手続き。'],
  ['財産処分の制限', '補助金で取得した設備などを、一定の期間、承認なく売ったり捨てたりできない決まり。'],
  ['gBizID（プライム）', '行政の電子申請に使う共通のID。補助金の申請では、プライムの取得が必要なことが多い。'],
  ['jGrants', 'デジタル庁が運営する、補助金の電子申請システム。'],
  ['認定経営革新等支援機関', '国が認定した、中小企業の経営を支援する専門家や機関。制度によって確認書などが必要。'],
  ['事業支援計画書', '小規模事業者持続化補助金などで、商工会・商工会議所が発行する書類。'],
  ['加点', '審査で有利になる要素。賃上げの計画や、特定の認定を受けていることなど。'],
  ['賃上げ要件', '従業員の賃金を一定以上引き上げることを求める要件。未達成のとき返還を求められる制度もある。'],
  ['圧縮記帳', '補助金で固定資産を取得したとき、法人が使える税の特例。税負担の時期をならす仕組み。'],
];

// ── 対象者別 ──────────────────────────────────────────
const WHO = [
  {
    file: 'sole-proprietor.html', banner: 'b02', kicker: '個人事業主の方',
    title: '個人事業主でも補助金の対象になるって、ほんと？',
    lead: 'はい、個人事業主も多くの補助金の対象になります。どんな場合に、どの補助金を検討できるかを整理しました。',
    summary: '個人事業主が使える主な補助金と、申請の前に用意しておくもの、注意点を解説します。',
    related: [['../feature/jizokuka.html', '小規模事業者持続化補助金とは？'], ['../feature/digital-subsidy.html', 'デジタル補助金とは？'], ['../basics/flow.html', '補助金の申請の流れ'], ['../basics/tax.html', '補助金の税金と会計']],
    sources: [OFFICIAL.mirasapo, OFFICIAL.jgrants],
    sections: [
      ['結論', [
        UL([
          '個人事業主も、多くの補助金の対象です。法人でないと申請できない、ということはありません。',
          'ただし、事業を行っていること（開業届、確定申告など）を示す必要があります。',
          '補助金は事業のための経費が対象です。私用の費用や、私用と兼用の費用は、そのままでは対象になりません。',
        ]),
      ].join('\n')],
      ['どんな場合に、どの補助金か', [
        TABLE(['やりたいこと', '検討できる主な補助金', '解説'], [
          ['チラシ、ホームページ、店舗の改装など、お客さんを増やしたい', '小規模事業者持続化補助金', '<a href="../feature/jizokuka.html">解説を読む</a>'],
          ['会計ソフト、予約システム、POSレジなどを入れたい', 'デジタル化・AI導入補助金（IT導入補助金）', '<a href="../feature/digital-subsidy.html">解説を読む</a>'],
          ['新しい商品・サービスを作るために設備を入れたい', '新事業進出・ものづくり商業サービス補助金', '<a href="../feature/monodukuri.html">解説を読む</a>'],
          ['人手が足りない作業を機械で減らしたい', '中小企業省力化投資補助金', '<a href="../feature/shoryokuka.html">解説を読む</a>'],
          ['人を雇う、育てる、賃金を上げる', '雇用関係の助成金（キャリアアップ助成金など）', '<a href="../feature/employment.html">解説を読む</a>'],
          ['お店を引き継ぐ、引き継いでもらう', '事業承継・M&A補助金', '<a href="../feature/succession.html">解説を読む</a>'],
          ['地域で開業する', '都道府県・市区町村の創業補助金', '<a href="../area/index.html">地域のページ</a>'],
        ]),
      ].join('\n')],
      ['申請の前に用意しておくもの', [
        UL([
          '開業届の控え、直近の確定申告書の控え（事業を行っていることの確認）',
          'gBizIDプライム（電子申請に必要なことが多い）',
          '見積書（導入したい設備やサービス）',
          '事業計画のメモ（課題、取り組み、効果）',
        ]),
      ].join('\n')],
      ['よくある勘違い', [
        UL([
          '<strong>私用のパソコンやスマホ、個人契約のサブスク</strong>：事業専用でなければ、そのままでは対象になりません。生成AIの利用料も、登録されたツールを事業のために使う場合に限られます。',
          '<strong>開業前の支出</strong>：申請や交付決定の前の支出は、対象外になることが多いです。',
          '<strong>副業の場合</strong>：事業として行っていることが前提です。会社の就業規則も確認してください。',
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'sme.html', banner: 'b10', kicker: '中小企業の方',
    title: '中小企業が使える補助金・助成金の全体像',
    lead: '中小企業が使える主な補助金と助成金を、目的ごとに整理しました。中小企業の定義と、制度の選び方も説明します。',
    summary: '設備投資、IT、販路開拓、省力化、事業承継、雇用、成長投資など、中小企業向けの主な制度を目的別に整理します。',
    related: [['../feature/popular.html', '特に人気の5つの補助金'], ['../grants/purposes.html', '目的別の補助金'], ['../basics/business-plan.html', '事業計画書の書き方']],
    sources: [OFFICIAL.chusho, OFFICIAL.mirasapo, OFFICIAL.mhlw],
    sections: [
      ['目的別の主な制度', [
        TABLE(['目的', '主な制度', '解説'], [
          ['新製品・新事業・設備投資', '新事業進出・ものづくり商業サービス補助金', '<a href="../feature/monodukuri.html">解説</a>'],
          ['人手不足の解消・自動化', '中小企業省力化投資補助金', '<a href="../feature/shoryokuka.html">解説</a>'],
          ['業務のデジタル化', 'デジタル化・AI導入補助金', '<a href="../feature/digital-subsidy.html">解説</a>'],
          ['販路開拓（小規模事業者）', '小規模事業者持続化補助金', '<a href="../feature/jizokuka.html">解説</a>'],
          ['大きな成長投資', '中小企業成長加速化補助金', '<a href="../feature/growth.html">解説</a>'],
          ['事業の引き継ぎ・M&A', '事業承継・M&A補助金', '<a href="../feature/succession.html">解説</a>'],
          ['雇用・人材育成・賃上げ', 'キャリアアップ助成金、人材開発支援助成金、業務改善助成金など', '<a href="../feature/employment.html">解説</a>'],
          ['地域の課題・省エネなど', '都道府県・市区町村の制度', '<a href="../grants/prefectures.html">都道府県別</a>'],
        ]),
      ].join('\n')],
      ['中小企業の定義（目安）', [
        P('多くの制度は、中小企業基本法の定義をもとに対象を決めています。資本金か従業員数のどちらかを満たせば、中小企業にあたります。'),
        TABLE(['業種', '資本金（以下）', '従業員数（以下）'], [
          ['製造業・建設業・運輸業など', '3億円', '300人'],
          ['卸売業', '1億円', '100人'],
          ['サービス業', '5,000万円', '100人'],
          ['小売業', '5,000万円', '50人'],
        ]),
        P('制度によっては、独自の定義や、大企業の子会社を除くなどの条件があります。公募要領で確認してください。'),
      ].join('\n')],
      ['制度の選び方', [
        OL([
          '何に取り組みたいか（目的）を一つに絞る',
          '目的に合う制度を、国・都道府県・市区町村の順に探す',
          '締切と、交付決定までの期間が、取り組みの時期に合うか確かめる',
          '賃上げなどの要件を、確実に守れるか確かめる',
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'startup.html', banner: 'b06', kicker: '創業・副業を始める方',
    title: '創業・副業を始める方の補助金と支援',
    lead: 'これから事業を始める人が使える支援を、補助金・融資・相談窓口・手続きの面から整理しました。副業のガイドや、AIへの相談もここから使えます。',
    summary: '創業者向けの補助金、創業融資、相談窓口、副業のガイドなど、事業を始める人のための入口です。',
    related: [['../roadmap.html', '創業のステップ'], ['../beginner-guide.html', '初心者向けガイド（副業）'], ['../search.html', 'AI・キーワードで探す'], ['../chat.html', '副業壁打ちAI']],
    sources: [OFFICIAL.jfc, OFFICIAL.mirasapo, OFFICIAL.chusho],
    sections: [
      ['創業者が検討できる主な支援', [
        UL([
          '<strong>小規模事業者持続化補助金（創業型）</strong>：創業して間もない事業者向けの枠があります（<a href="../feature/jizokuka.html">解説</a>）。',
          '<strong>都道府県・市区町村の創業補助金</strong>：地域ごとに、開業の費用を支援する制度があります（<a href="../area/index.html">地域のページ</a>）。',
          '<strong>創業融資</strong>：日本政策金融公庫などの創業向けの融資です。補助金は後払いのため、融資と組み合わせることが多いです。',
          '<strong>特定創業支援等事業</strong>：市区町村が行う創業の支援を受けると、会社設立の登録免許税の軽減などを受けられる場合があります。',
        ]),
      ].join('\n')],
      ['このサイトの創業・副業のページ', [
        UL([
          '<a href="../roadmap.html">創業のステップ</a>：計画から開業届、青色申告までの流れ',
          '<a href="../beginner-guide.html">初心者向けガイド</a>：副業を始めるときの基礎知識（5本）',
          '<a href="../diagnosis.html">今日からできること診断</a>：始めやすい副業の提案',
          '<a href="../chat.html">副業壁打ちAI</a>：アイデアを一緒に考える',
          '<a href="../search.html">AI・キーワードで探す</a>：やりたい事業を文章で入れて補助金を探す',
          '<a href="../compare/virtual-office.html">バーチャルオフィスの選び方</a>：自宅の住所を出さずに始める',
        ]),
      ].join('\n')],
      ['始める前に知っておきたいこと', [
        UL([
          '補助金は後払いで、開業前の支出は対象外になることが多い',
          '開業届や、事業の実態を示す書類が必要になる',
          '無料の相談窓口（商工会議所・商工会、よろず支援拠点）を早めに使う',
        ]),
      ].join('\n')],
    ],
  },
];

// ── 個人向け ──────────────────────────────────────────
const PERSONAL = [
  {
    file: 'housing.html', banner: 'b17', kicker: '住まいの省エネ・リフォーム',
    title: '住まいの省エネ・リフォームの補助金',
    lead: '断熱窓、高効率の給湯器、省エネ住宅の新築やリフォームには、国や自治体の補助金があります。仕組みと、申請の注意点を説明します。',
    summary: '住宅の省エネリフォーム、断熱窓、給湯器、省エネ住宅の新築などに使える補助金の仕組みと注意点を解説します。',
    related: [['index.html', '個人向けの補助金・支援'], ['ev.html', '電気自動車（EV）と充電設備の補助金'], ['../area/index.html', '市区町村別の補助金']],
    sources: [OFFICIAL.mlit, OFFICIAL.env, OFFICIAL.meti],
    sections: [
      ['国の主な支援', [
        P('2026年度は、国土交通省・経済産業省・環境省が連携した「住宅省エネ2026キャンペーン」として、省エネ住宅の取得や省エネリフォーム、断熱窓、高効率給湯器などを支援する事業が実施されていると報じられています。'),
        UL([
          '断熱性の高い窓への交換',
          '高効率の給湯器（エコキュートなど）への交換',
          '省エネ住宅の新築や、省エネ改修',
        ]),
        P(NOTE_ALL),
      ].join('\n')],
      ['申請の仕組み', [
        P('この種の住宅の補助金は、施主が自分で申請するのではなく、登録された工事事業者が手続きを行う仕組みのものが多くあります。工事を依頼する前に、事業者が登録しているか、補助金の申請に対応しているかを確認してください。'),
      ].join('\n')],
      ['自治体の支援もあわせて確認', [
        UL([
          '市区町村の、リフォーム・耐震改修・バリアフリー改修の補助',
          '太陽光発電や蓄電池の導入補助',
          '国の制度と併用できるかどうかは、制度ごとに決まっています',
        ]),
      ].join('\n')],
      ['注意点', [
        UL([
          '予算に達すると、締切の前に受付が終わることがあります',
          '契約や着工の時期に条件があることがあります',
          '税の優遇（固定資産税の減額など）を受けられる場合もあります',
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'ev.html', banner: 'b12', kicker: '電気自動車（EV）と充電設備',
    title: '電気自動車（EV）と充電設備の補助金',
    lead: '電気自動車などのクリーンエネルギー自動車や、自宅の充電設備には、国と自治体の補助金があります。',
    summary: '電気自動車・プラグインハイブリッド車などの購入や、充電設備・V2Hの導入に使える補助金の仕組みを解説します。',
    related: [['index.html', '個人向けの補助金・支援'], ['housing.html', '住まいの省エネ・リフォームの補助金']],
    sources: [OFFICIAL.meti],
    sections: [
      ['国の支援', [
        P('経済産業省の「クリーンエネルギー自動車導入促進補助金（CEV補助金）」で、電気自動車、プラグインハイブリッド車、燃料電池自動車などの購入費の一部が補助されます。対象の車種と金額は、車種ごと・年度ごとに決まっています。'),
        P(NOTE_ALL),
      ].join('\n')],
      ['充電設備・V2H', [
        P('自宅に充電設備や、車の電気を家で使うV2H（ビークル・トゥ・ホーム）を設置する費用への補助もあります。国の制度のほか、自治体の補助がある地域もあります。'),
      ].join('\n')],
      ['自治体の上乗せ', [
        P('都道府県や市区町村が、国の補助に上乗せして支援している場合があります。お住まいの自治体の制度を確認してください（<a href="../area/index.html">市区町村別の補助金</a>）。'),
      ].join('\n')],
      ['注意点', [
        UL([
          '一定の期間、車を保有し続けることが条件になることがあります',
          '申請の期限が、登録日などから決まっていることがあります',
          '予算に達すると、受付が早めに終わることがあります',
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'solar.html', banner: 'b10', kicker: '太陽光発電・蓄電池',
    title: '太陽光発電・蓄電池の補助金',
    lead: '家庭の太陽光発電や蓄電池の導入には、主に都道府県や市区町村の補助金があります。国の事業と組み合わせられる場合もあります。',
    summary: '家庭用の太陽光発電、蓄電池、V2Hなどの導入に使える補助金の仕組みと、申請の注意点を解説します。',
    related: [['index.html', '個人向けの補助金・支援'], ['housing.html', '住まいの省エネ・リフォームの補助金'], ['ev.html', '電気自動車（EV）と充電設備の補助金']],
    sources: [OFFICIAL.env, OFFICIAL.meti],
    sections: [
      ['どこが補助しているか', [
        P('家庭の太陽光発電や蓄電池の補助金は、都道府県や市区町村が独自に行っているものが中心です。国の事業として、省エネ住宅の支援や、電力の需給の調整に役立つ蓄電池の導入支援などが行われることもあります。'),
        P(NOTE_ALL),
      ].join('\n')],
      ['対象になりやすいもの', [
        UL([
          '家庭用の太陽光発電設備',
          '家庭用の蓄電池',
          'V2H（電気自動車の電気を家で使う設備）',
          '省エネ住宅（ZEHなど）の新築・改修とあわせた導入',
        ]),
      ].join('\n')],
      ['申請の注意点', [
        UL([
          '<strong>契約・工事の前に申請が必要なことが多い</strong>：工事の後では申請できない制度があります。',
          '<strong>予算に達すると受付が終わる</strong>：年度の途中で受付が終わることがあります。',
          '<strong>国と自治体の併用</strong>：併用できるかどうかは制度ごとに決まっています。',
          '<strong>訪問販売に注意</strong>：「補助金で実質無料」などの勧誘には、制度の内容を自分で確認してから判断してください。',
        ]),
      ].join('\n')],
      ['探し方', [
        P('お住まいの都道府県・市区町村のウェブサイトで、「太陽光」「蓄電池」「再生可能エネルギー」などの言葉で探すのが確実です（<a href="../area/index.html">市区町村別の補助金</a>）。'),
      ].join('\n')],
    ],
  },
  {
    file: 'seismic.html', banner: 'b05', kicker: '耐震・バリアフリー改修',
    title: '耐震改修・バリアフリー改修の補助金',
    lead: '古い住宅の耐震診断や耐震改修、高齢の家族のためのバリアフリー改修には、主に市区町村の補助があります。介護保険の住宅改修の制度もあります。',
    summary: '住宅の耐震診断・耐震改修、バリアフリー改修に使える補助の仕組みと、介護保険の住宅改修、申請の注意点を解説します。',
    related: [['index.html', '個人向けの補助金・支援'], ['housing.html', '住まいの省エネ・リフォームの補助金'], ['../area/index.html', '市区町村別の補助金']],
    sources: [OFFICIAL.mlit, OFFICIAL.mhlw],
    sections: [
      ['耐震の補助', [
        P('多くの市区町村が、古い基準で建てられた木造住宅などを対象に、耐震診断や耐震改修の費用の一部を補助しています。対象になる建物の建築時期や、補助の内容は、市区町村ごとに違います。'),
        P(NOTE_ALL),
      ].join('\n')],
      ['バリアフリーの補助', [
        UL([
          '<strong>介護保険の住宅改修</strong>：要支援・要介護の認定を受けた人の住まいで、手すりの取り付けや段差の解消などを行う場合に、費用の一部が支給される仕組みがあります。工事の前に、ケアマネジャーや市区町村への相談・申請が必要です。',
          '<strong>市区町村の独自の補助</strong>：高齢者や障害のある人の住まいの改修を支える補助があります。',
        ]),
      ].join('\n')],
      ['税の優遇', [
        P('耐震・バリアフリー・省エネの改修を行った場合、所得税の控除や、固定資産税の減額を受けられる場合があります。要件は国税庁や市区町村で確認してください。'),
      ].join('\n')],
      ['申請の注意点', [
        UL([
          '工事の契約・着工の前に申請が必要な制度が多い',
          '市区町村に登録された事業者の施工が条件になることがある',
          '耐震改修では、事前の耐震診断が必要なことが多い',
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'kids.html', banner: 'b15', kicker: '子育ての支援',
    title: '子育て世帯が使える支援・給付',
    lead: '子育て世帯向けには、手当や給付のほか、住宅や自治体独自の支援があります。主な種類と、確認の仕方を説明します。',
    summary: '児童手当、妊娠・出産の支援、自治体独自の支援、子育て世帯の住宅支援など、子育ての支援の種類を解説します。',
    related: [['index.html', '個人向けの補助金・支援'], ['housing.html', '住まいの省エネ・リフォームの補助金']],
    sources: [OFFICIAL.cfa],
    sections: [
      ['主な支援の種類', [
        UL([
          '<strong>児童手当</strong>：子どもを養育している人に支給される手当です。対象年齢や所得制限の扱いは、制度の改正で変わってきました。',
          '<strong>妊娠・出産の支援</strong>：妊婦健診の助成や、出産・子育ての支援の給付があります。',
          '<strong>物価高への対応の給付</strong>：時期によって、子育て世帯向けの臨時の給付が行われることがあります。',
          '<strong>自治体独自の支援</strong>：医療費の助成、保育料の軽減、出産祝い金など、市区町村ごとに違います。',
          '<strong>住まいの支援</strong>：子育て世帯の省エネ住宅の取得などを支える補助があります（<a href="housing.html">住まいの補助金</a>）。',
        ]),
        P(NOTE_ALL),
      ].join('\n')],
      ['確認の仕方', [
        OL([
          'お住まいの市区町村のウェブサイトで、「子育て支援」のページを確認する',
          '申請が必要な給付かどうかを確認する（自動で支給されないものもある）',
          '申請の期限を確認する',
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'learning.html', banner: 'b16', kicker: '学び直し（教育訓練給付）',
    title: '学び直しに使える教育訓練給付',
    lead: '働く人が資格や技能を学ぶとき、条件を満たせば、受講費用の一部が雇用保険から支給されます。仕組みと、申請の流れを説明します。',
    summary: '雇用保険の教育訓練給付の種類、対象になる人、申請の流れを解説します。',
    related: [['index.html', '個人向けの補助金・支援'], ['../feature/employment.html', '雇用関係の助成金（事業者向け）']],
    sources: [OFFICIAL.mhlw, OFFICIAL.hellowork],
    sections: [
      ['教育訓練給付の種類', [
        UL([
          '<strong>一般教育訓練給付金</strong>：仕事に役立つ幅広い講座が対象です。',
          '<strong>特定一般教育訓練給付金</strong>：早期の再就職やキャリア形成に役立つ講座が対象です。',
          '<strong>専門実践教育訓練給付金</strong>：中長期的なキャリア形成に役立つ、専門的な講座が対象です。',
        ]),
        P('対象になる講座は、厚生労働大臣の指定を受けたものに限られます。給付の割合や上限は、種類と制度の改正によって違います。'),
      ].join('\n')],
      ['対象になる人', [
        P('雇用保険に一定の期間加入している人（または、離職して一定の期間内の人）が対象です。加入の期間の条件は、給付の種類によって違います。'),
      ].join('\n')],
      ['申請の流れ（一般的な例）', [
        OL([
          '対象の講座を探す（厚生労働省の検索システムなど）',
          '種類によっては、受講の前にハローワークでの手続きが必要',
          '講座を受講し、修了する',
          '期限までにハローワークに支給を申請する',
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'relocation.html', banner: 'b06', kicker: '移住の支援',
    title: '地方への移住で使える支援金',
    lead: '東京圏から地方へ移住して、就職や起業をする人を支える「移住支援金」などの制度があります。',
    summary: '地方への移住で使える移住支援金の仕組みと、起業の支援、自治体独自の制度を解説します。',
    related: [['index.html', '個人向けの補助金・支援'], ['../who/startup.html', '創業・副業を始める方'], ['../area/index.html', '市区町村別の補助金']],
    sources: [OFFICIAL.chisou],
    sections: [
      ['移住支援金の仕組み', [
        P('国と自治体が連携して、東京圏から地方へ移住し、対象の企業への就職や起業などをした人に、支援金を支給する制度があります。実施しているかどうか、条件、金額は、移住先の自治体によって違います。'),
        P(NOTE_ALL),
      ].join('\n')],
      ['起業する場合', [
        P('移住先で起業する場合は、起業の支援金や、都道府県の創業補助金を組み合わせられることがあります（<a href="../who/startup.html">創業・副業を始める方</a>）。'),
      ].join('\n')],
      ['確認すること', [
        UL([
          '移住の前の居住地や、居住の期間の条件',
          '移住の後、一定の期間住み続ける条件（早く転出すると返還を求められることがある）',
          '申請の期限',
        ]),
      ].join('\n')],
    ],
  },
];

// ── 書き出し ──────────────────────────────────────────
function writeSet(folder, section, items) {
  const out = join(ROOT, folder);
  for (const a of items) {
    writeArticle(out, folder, a.file, { title: a.title, description: a.summary, body: articleBody({ ...a, section, updated: UPDATED }) });
  }
}

writeSet('basics', ['index.html', '基礎知識'], BASICS);
writeArticle(join(ROOT, 'basics'), 'basics', 'glossary.html', {
  title: '補助金の用語集', description: '公募要領、補助率、採択、交付決定、実績報告、gBizIDなど、補助金でよく使う言葉をやさしく説明します。',
  body: articleBody({ section: ['index.html', '基礎知識'], kicker: '用語集', banner: 'b16', title: '補助金の用語集', lead: '補助金の公募要領や手続きで、よく出てくる言葉をまとめました。', updated: UPDATED,
    sections: [['用語の一覧', DL(GLOSSARY)]], related: [['flow.html', '補助金の申請の流れ'], ['after-adoption.html', '交付決定から入金まで']] }),
});
writeArticle(join(ROOT, 'basics'), 'basics', 'index.html', {
  title: '補助金の基礎知識', description: '補助金の申請の流れ、事業計画書、採択後の手続き、税金、不採択のとき、用語集など、補助金の基本をまとめました。',
  body: indexBody({ section: '基礎知識', title: '補助金の基礎知識', banner: 'b13', lead: '初めて補助金を調べる人のために、申請の流れから税金まで、基本をまとめました。',
    cards: [
      ...BASICS.map((a) => [a.file, a.title, a.summary]),
      ['glossary.html', '補助金の用語集', '公募要領や手続きでよく使う言葉を、やさしく説明します。'],
      ['../columns/subsidy-vs-grant-vs-loan.html', '補助金・助成金・融資の違い', '返済の有無、審査、受け取りの時期の違いを比べます。'],
      ['../columns/how-to-find-subsidy.html', '補助金の探し方', '公式サイトと、探す先の使い分けを説明します。'],
      ['../columns/subsidy-paid-after.html', '補助金は「後払い」', '採択されてもすぐ入金されない理由と、資金繰りの対策。'],
      ['../columns/gbizid-early.html', 'gBizIDプライムは早めに取得', '電子申請に必要なIDの取り方と注意点。'],
      ['../columns/free-consultation.html', '補助金の無料相談窓口', 'よろず支援拠点・商工会議所の使い方。'],
      ['../real-life.html', '補助金のリアル', '申請の現実と、つまずきやすい壁。'],
    ] }),
});

writeSet('who', ['index.html', '対象者別'], WHO);
writeArticle(join(ROOT, 'who'), 'who', 'index.html', {
  title: '対象者別の補助金ガイド', description: '個人事業主、中小企業、創業・副業を始める方、個人の方（住まい・車・子育て）など、立場ごとに使える補助金の入口です。',
  body: indexBody({ section: '対象者別', title: '対象者別の補助金ガイド', banner: 'b11', lead: 'あなたの立場に合わせて、使えそうな補助金と支援を整理しました。',
    cards: [...WHO.map((a) => [a.file, a.title, a.summary]), ['../personal/index.html', '個人が使える補助金・支援', '住まい・車・子育て・学び・移住など、個人の方向けの支援。']] }),
});

writeSet('personal', ['index.html', '個人向け'], PERSONAL);
// 個人向けの入口：AI補助金判定と同じ、キャラクターと大きなアイコンのカードのやさしい画面
const PERSONAL_MENU = [
  ['housing.html', '🏠', '家の省エネ・リフォーム', '断熱窓・給湯器・省エネ住宅の新築など'],
  ['ev.html', '🚗', '電気自動車（EV）', 'EV・PHVの購入、充電設備・V2Hの導入'],
  ['solar.html', '☀️', '太陽光発電・蓄電池', '家庭用の太陽光発電・蓄電池の導入'],
  ['seismic.html', '🛠️', '耐震・バリアフリー', '耐震診断・耐震改修、手すり・段差の解消'],
  ['kids.html', '👶', '子育て', '児童手当、妊娠・出産・子育ての支援'],
  ['learning.html', '📚', '学び直し', '教育訓練給付で、講座の費用の一部を支給'],
  ['relocation.html', '🏡', '地方への移住', '移住支援金、移住して起業するときの支援'],
];
const PERSONAL_STYLE = `
  <style>
    .pv { --pv-blue: #1565d8; --pv-line: #dbe6f2; --pv-mute: #5b6878; color: #1d2a3a; }
    .pv-card { background: #fff; border: 1px solid var(--pv-line); border-radius: 18px; box-shadow: 0 6px 24px rgba(21, 101, 216, 0.08); padding: 28px; margin-bottom: 24px; }
    .pv-hero { display: grid; grid-template-columns: 220px 1fr; gap: 24px; align-items: center; background: linear-gradient(160deg, #e8f3ff 0%, #f5fbff 55%, #eef8f0 100%); }
    .pv img.pv-robot { width: 100%; height: auto; -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, #000 60%, transparent 100%); mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, #000 60%, transparent 100%); }
    .pv-bubble { background: #fff; border-radius: 18px; padding: 16px 20px; line-height: 1.8; box-shadow: 0 4px 16px rgba(29, 42, 58, 0.08); }
    .pv-hero h1 { margin: 0; font-size: 1.35rem; line-height: 1.6; }
    .pv-checks { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 8px; }
    .pv-checks li { display: flex; align-items: center; gap: 10px; background: rgba(255, 255, 255, 0.85); border-radius: 10px; padding: 9px 14px; font-weight: 600; }
    .pv-checks li::before { content: "✓"; display: inline-grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; background: #22a06b; color: #fff; font-size: 0.8rem; flex-shrink: 0; }
    .pv-ask { display: grid; grid-template-columns: 120px 1fr; gap: 16px; align-items: center; margin-bottom: 20px; }
    .pv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px; }
    .pv-item { display: grid; grid-template-rows: auto auto 1fr auto; justify-items: center; gap: 6px; padding: 22px 16px 16px; border: 1.5px solid var(--pv-line); border-radius: 14px; background: #fff; text-align: center; text-decoration: none; color: inherit; transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s; }
    .pv-item:hover { border-color: var(--pv-blue); box-shadow: 0 6px 18px rgba(21, 101, 216, 0.12); transform: translateY(-2px); color: inherit; }
    .pv-item i { display: grid; place-items: center; width: 68px; height: 68px; border-radius: 50%; background: #eaf3fd; font-style: normal; font-size: 2rem; }
    .pv-item b { font-size: 1.05rem; }
    .pv-item span { font-size: 0.85rem; color: var(--pv-mute); line-height: 1.6; }
    .pv-item em { font-style: normal; margin-top: 6px; padding: 5px 14px; border: 1px solid #9cc0ee; border-radius: 999px; font-size: 0.82rem; font-weight: 600; color: var(--pv-blue); }
    .pv-h { display: flex; align-items: center; gap: 10px; margin: 0 0 16px; font-size: 1.25rem; }
    .pv-h::before { content: ""; width: 5px; height: 1.3em; border-radius: 3px; background: var(--pv-blue); }
    .pv-steps { list-style: none; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 0; padding: 0; counter-reset: pv; }
    .pv-steps li { counter-increment: pv; padding: 16px; border-radius: 12px; background: #f5f9fe; line-height: 1.7; font-size: 0.92rem; }
    .pv-steps li::before { content: counter(pv); display: grid; place-items: center; width: 30px; height: 30px; margin-bottom: 8px; border-radius: 50%; background: var(--pv-blue); color: #fff; font-weight: 700; }
    .pv-steps b { display: block; font-size: 1rem; margin-bottom: 4px; }
    .pv-end { display: grid; grid-template-columns: 1fr 170px; gap: 18px; align-items: center; background: linear-gradient(160deg, #e8f3ff 0%, #f5fbff 60%, #eef8f0 100%); }
    .pv-btns { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
    .pv-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; border-radius: 999px; background: var(--pv-blue); color: #fff; font-weight: 700; text-decoration: none; }
    .pv-btn:hover { background: #0f4fae; color: #fff; }
    .pv-btn.ghost { background: #fff; color: var(--pv-blue); border: 1px solid #9cc0ee; }
    @media (max-width: 720px) {
      .pv-card { padding: 20px 16px; }
      .pv-hero { grid-template-columns: 1fr; text-align: center; }
      .pv-hero img.pv-robot { width: 170px; margin: 0 auto; }
      .pv-checks { text-align: left; }
      .pv-ask { grid-template-columns: 80px 1fr; gap: 10px; }
      .pv-grid { grid-template-columns: 1fr; }
      .pv-item { grid-template-columns: 56px 1fr; grid-template-rows: auto auto; justify-items: start; text-align: left; column-gap: 14px; row-gap: 2px; padding: 14px; }
      .pv-item i { grid-row: 1 / 3; width: 56px; height: 56px; font-size: 1.6rem; }
      .pv-item em { display: none; }
      .pv-steps { grid-template-columns: 1fr; }
      .pv-end { grid-template-columns: 1fr 100px; }
    }
  </style>`;
writeArticle(join(ROOT, 'personal'), 'personal', 'index.html', {
  title: '個人が使える補助金・支援（住まい・車・子育て・学び・移住）', description: '住まいの省エネ・リフォーム、電気自動車、子育て、学び直し、移住など、個人の方が使える主な補助金・支援の入口です。',
  body: `${PERSONAL_STYLE}
    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ 個人向け</nav>
    <div class="pv">
      <section class="pv-card pv-hero">
        <img class="pv-robot" src="../images/hantei/robot-wave.webp" alt="" width="250" height="300">
        <div>
          <div class="pv-bubble"><h1>個人が使える補助金・支援</h1>暮らしに使える補助金や支援を、いっしょに探しましょう！</div>
          <ul class="pv-checks">
            <li>住まい・車・子育て・学び・移住の支援をまとめて紹介</li>
            <li>国の制度と、自治体の制度の探し方がわかります</li>
            <li>登録不要・無料で読めます</li>
          </ul>
        </div>
      </section>

      <section class="pv-card" aria-labelledby="pv-ask">
        <div class="pv-ask"><img class="pv-robot" src="../images/hantei/robot-ask.webp" alt="" width="163" height="142"><div class="pv-bubble" id="pv-ask">どんなことに使いたいですか？<br>当てはまるものを選んでください。</div></div>
        <div class="pv-grid">
${PERSONAL_MENU.map(([href, icon, label, text]) => `          <a class="pv-item" href="${href}"><i aria-hidden="true">${icon}</i><b>${label}</b><span>${text}</span><em>詳しく見る ›</em></a>`).join('\n')}
        </div>
      </section>

      <section class="pv-card" aria-labelledby="pv-how">
        <h2 class="pv-h" id="pv-how">支援を受けるまでの3ステップ</h2>
        <ol class="pv-steps">
          <li><b>どんな支援があるか知る</b>上のカードから、気になる支援の解説を読みます。</li>
          <li><b>お住まいの自治体を確認</b>個人向けの制度は、都道府県・市区町村の独自のものが多くあります。<a href="../area/index.html">市区町村別の補助金</a>も見てください。</li>
          <li><b>申請の前に公式サイトで確認</b>多くの制度は、契約・工事・購入の前に申請が必要です。対象や期限は、必ず公式の情報で確認してください。</li>
        </ol>
      </section>

      <section class="pv-card pv-end">
        <div>
          <div class="pv-bubble">お住まいの地域だけの補助金もあります。市区町村の制度もチェックしてみてくださいね。</div>
          <div class="pv-btns"><a class="pv-btn" href="../area/index.html">市区町村別の補助金を見る →</a><a class="pv-btn ghost" href="../grants/prefectures.html">都道府県別の補助金</a></div>
        </div>
        <img class="pv-robot" src="../images/hantei/robot-done.webp" alt="" width="195" height="183">
      </section>

      <p class="area-note">このページの制度は、jGrants の自動の一覧には多く含まれていないため、主なものを解説記事で紹介しています。金額や期間は年度ごとに変わります。事業をしている方は、<a href="../search.html">事業者向けの補助金を探す</a>もご利用ください。</p>
    </div>`,
});

console.log('基礎知識・対象者別・個人向けのページを生成しました');
