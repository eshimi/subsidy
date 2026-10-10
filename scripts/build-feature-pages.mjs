// 特集コーナー（public/feature/）のページを生成する: node scripts/build-feature-pages.mjs
// 内容を変えたらこのファイルを直して実行し、生成されたファイルをコミットする。
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, shell } from './lib/site-shell.mjs';
import { TABLE } from './lib/article.mjs';
import { withCases } from './lib/cases.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'feature');
const UPDATED = '2026年10月10日';

const crumb = (items) => `    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ ${items.map(([h, t]) => (h ? `<a href="${h}">${esc(t)}</a>` : esc(t))).join(' ＞ ')}</nav>`;




// 記事の共通の組み立て。sections は [見出し, HTML] の並び
const SECTION_ICON = (i) => String(i).padStart(2, '0');
function articleOf({ kicker, title, lead, sections, related, sources, updated = UPDATED, image }) {
  const body = sections.map(([h, html], i) => `    <article class="area-section" aria-labelledby="s${i}">
      <span class="area-num">${SECTION_ICON(i)}</span>
      <h2 id="s${i}">${esc(h)}</h2>
      <div class="area-body">
${html}
      </div>
    </article>`).join('\n\n');
  const src = `        <ul>\n${sources.map(([label, href]) => `          <li><a href="${href}" target="_blank" rel="noopener">${esc(label)}</a></li>`).join('\n')}\n        </ul>`;
  return `${crumb([['index.html', '特集'], [null, kicker]])}

    ${image ? `<div class="pb-banner" style="background-image: url('../images/banner/${image.file}.webp')"><h1 class="pb-title">${esc(title)}</h1></div>` : `<h1 class="display" style="margin-bottom: 0.5rem;">${esc(title)}</h1>`}
    <div style="margin-bottom: 2rem;">
      <p class="label" style="margin-bottom: 0.5rem;">特集</p>
      <p class="lead" style="margin-bottom: 0;">${esc(lead)}</p>
    </div>

${body}

    <article class="area-section" aria-labelledby="sources">
      <span class="area-num">確認</span>
      <h2 id="sources">最新情報の確認先</h2>
      <div class="area-body">
        <p>制度の内容は、年度や公募回ごとに変わります。申請の前に、次の公式情報で確認してください。</p>
${src}
        <p class="area-note" style="margin-top: 16px;">最終更新日：${updated}</p>
      </div>
    </article>

    <nav class="related-links" aria-label="関連ページ">
      <h2>関連ページ</h2>
      <ul>
${related.map(([href, label]) => `        <li><a href="${href}">${esc(label)}</a></li>`).join('\n')}
      </ul>
    </nav>

    <nav class="related-links" aria-label="特集の一覧">
      <h2>特集の一覧</h2>
      <ul>
        <li><a href="index.html">特集トップに戻る</a></li>
      </ul>
    </nav>`;
}

const P = (t) => `        <p>${t}</p>`;
const UL = (items) => `        <ul>\n${items.map((i) => `          <li>${i}</li>`).join('\n')}\n        </ul>`;
const OL = (items) => `        <ol>\n${items.map((i) => `          <li>${i}</li>`).join('\n')}\n        </ol>`;
const QA = (pairs) => pairs.map(([q, a]) => `        <h3>Q. ${q}</h3>\n        <p>A. ${a}</p>`).join('\n');
const NOTE_ALL = '制度の金額・補助率・対象経費は、公募回ごとに決まります。ここでは制度の全体像を説明し、数字は書いていません。最新の数字は公式の公募要領で確認してください。';

// 「特に人気の5つの補助金」：特集の1本目。各制度の詳しい記事への入口を兼ねる
const POPULAR = {
  file: 'popular.html',
  kicker: '特に人気の5つの補助金',
  title: '特に人気の5つの補助金｜どんな事業に、どの補助金が合うか',
  summary: '利用の多い5つの補助金について、人気の理由、主な使い道、注意点を整理しました。旧ものづくり補助金・旧事業再構築補助金の今の扱いも説明します。',
  lead: '事業の目的に合わせて、どの補助金から調べればよいかを一覧で確認できます。',
  image: { file: 'b01', alt: '' },
  related: [['../columns/how-to-find-subsidy.html', '補助金の探し方'], ['../columns/free-consultation.html', '補助金の無料相談窓口'], ['../grants/deadlines.html', '締切が近い補助金']],
  sources: [
    ['ミラサポplus（補助金の情報と公募要領）', 'https://mirasapo-plus.go.jp/'],
    ['jGrants（デジタル庁の電子申請・公募情報）', 'https://www.jgrants-portal.go.jp/'],
  ],
  sections: [
    ['1. 小規模事業者持続化補助金', [
      P('<strong>人気の理由</strong>：小規模な事業者や個人事業主を主な対象にした制度で、利用の多い補助金の一つです。経費の使い道の自由度が高いのが特徴です。'),
      P('<strong>主な使い道</strong>：ホームページの作成や改修、チラシ・パンフレットの作成、店舗の改装、新メニューの開発、SNS広告などの販路開拓の費用。'),
      P('<strong>注意点</strong>：商工会・商工会議所が作る事業支援計画書が必要です。公募回ごとに締切があるため、早めに窓口に相談してください。'),
      P('<a href="jizokuka.html">小規模事業者持続化補助金とは？</a>（詳しい解説）'),
    ].join('\n')],
    ['2. IT導入補助金（デジタル化・AI導入補助金）', [
      P('<strong>人気の理由</strong>：会計ソフトや予約システム、POSレジなど、日々の業務のデジタル化に直結するため、取り組みやすい制度です。'),
      P('<strong>主な使い道</strong>：クラウド会計ソフト、ECサイトの構築、POSレジや決済端末、業務システムの導入。'),
      P('<strong>注意点</strong>：対象は、事務局に登録されたITツールだけです。交付決定の前に契約・支払いをした分は、対象外になります。'),
      P('<a href="digital-subsidy.html">デジタル補助金とは？</a>（詳しい解説）'),
    ].join('\n')],
    ['3. 新事業進出・ものづくり商業サービス補助金', [
      P('<strong>人気の理由</strong>：旧ものづくり補助金と旧新事業進出補助金（事業再構築補助金の後継）が統合された、設備投資系の代表的な大型補助金です。'),
      P('<strong>主な使い道</strong>：新しい製品・サービスの開発、新しい市場や事業への進出、海外展開に必要な機械・システムの導入や建物の改修など。'),
      P('<strong>注意点</strong>：事業計画の審査が厳しく、賃上げなどの要件もあります。古い制度名の記事に注意し、最新の公募要領で確認してください。'),
      P('<a href="monodukuri.html">新事業進出・ものづくり商業サービス補助金とは？</a>（詳しい解説）'),
    ].join('\n')],
    ['4. 中小企業省力化投資補助金', [
      P('<strong>人気の理由</strong>：人手不足に悩む事業者が、機械やロボットなどの省力化製品を導入する費用を支える制度です。カタログから製品を選ぶ仕組みがあり、取り組みやすい点が特徴です。'),
      P('<strong>主な使い道</strong>：配膳ロボット、券売機、自動倉庫、検品・梱包の機械など、カタログに載った省力化製品の導入。'),
      P('<strong>注意点</strong>：制度の改定で、補助上限や賃上げの要件が変わっています。カタログの製品か、交付決定の前に契約していないかを確認してください。'),
      P('<a href="shoryokuka.html">中小企業省力化投資補助金とは？</a>（詳しい解説）'),
    ].join('\n')],
    ['5. 事業承継・M&A補助金', [
      P('<strong>人気の理由</strong>：後継者がいない店舗や事業を、別の人へ引き継ぐ際の費用を支える制度です。近年、相談が増えています。'),
      P('<strong>主な使い道</strong>：引き継ぎや譲渡の際の専門家（税理士、弁護士など）への費用、引き継いだ後の設備導入や店舗のリニューアル（枠による）。'),
      P('<strong>注意点</strong>：現在の名称は「事業承継・M&A補助金」です。古い「引継ぎ補助金」の資料も残っているため、確認してください。'),
      P('<a href="succession.html">事業承継・M&A補助金とは？</a>（詳しい解説）'),
    ].join('\n')],
  ].map(([h, html]) => [h, html]),
};

const ARTICLES = [
  {
    file: 'jizokuka.html',
    image: { file: 'b02', h: 160, alt: '小規模事業者持続化補助金のタイトル画像' },
    kicker: '小規模事業者持続化補助金',
    title: '小規模事業者持続化補助金とは？販路開拓に使える補助金の全体像',
    summary: '小規模な事業者の販路開拓（チラシ、ホームページ、展示会など）を支援する、利用の多い補助金を解説します。',
    lead: '店の集客や販路づくりに使える補助金です。商工会・商工会議所の支援を受けて申請する仕組みが特徴です。',
    related: [['../columns/free-consultation.html', '補助金の無料相談窓口'], ['../compare/index.html', '比較記事'], ['digital-subsidy.html', 'デジタル補助金とは？']],
    sources: [
      ['小規模事業者持続化補助金 公式サイト（全国商工会連合会・日本商工会議所）', 'https://www.shokokai.or.jp/'],
      ['ミラサポplus（補助金の情報と公募要領）', 'https://mirasapo-plus.go.jp/'],
      ['jGrants（デジタル庁の電子申請・公募情報）', 'https://www.jgrants-portal.go.jp/'],
    ],
    sections: [
      ['この記事の結論', [
        UL([
          '小規模事業者持続化補助金は、販路開拓や業務の効率化に取り組む小規模な事業者の経費の一部を支援する補助金です。',
          '申請には、地元の商工会・商工会議所が作る「事業支援計画書」が必要です。まず窓口に相談するのが近道です。',
          '創業者向けの枠もあり、これから事業を始める人も対象になることがあります。',
        ]),
        P(NOTE_ALL),
      ].join('\n')],
      ['制度の概要', [
        P('目的は、小規模な事業者が、地域の顧客を増やしたり、売上を伸ばしたりする取り組みを支えることです。経費を先に払い、後から補助金を受け取る仕組みが一般的です。'),
        P('申請の類型には、一般型（通常枠）のほか、創業型、共同・協業型などがあります。どの枠を使うかは、事業の状況と公募要領で決まります。'),
      ].join('\n')],
      ['対象になる人', [
        P('対象は、商業・サービス業などの小規模な事業者です。小規模事業者の基準は、業種によって従業員数で決まります（商業・サービス業は5人以下、製造業などは20人以下が目安）。個人事業主も対象になります。'),
        P('基準の詳しい考え方は、<a href="digital-subsidy.html">デジタル補助金とは？</a>の対象者の項目も参考にしてください。'),
      ].join('\n')],
      ['補助の対象になりやすい経費（例）', [
        UL([
          'チラシ・パンフレットの作成、ホームページの作成や改修',
          '販路開拓のための展示会への出展費用',
          '店舗の改装や、機械・設備の導入（事業計画に沿うもの）',
          '外部の専門家に依頼する費用（公募要領で認められるもの）',
        ]),
        P('対象になるかは、経費の内容と事業計画の結びつきで判断されます。購入前に、必ず商工会などに相談してください。'),
      ].join('\n')],
      ['申請の流れ（一般的な例）', [
        OL([
          '地元の商工会・商工会議所に相談する',
          '事業計画書を作り、事業支援計画書の発行を受ける',
          '公募期間中に、電子申請などで申請する',
          '採択された場合、交付決定の後に、事業を進める',
          '事業の実施後に、実績報告を提出する',
          '審査を経て、補助金が支払われる',
        ]),
        P('公募の時期や受付方法は、回ごとに変わります。期間を過ぎると申請できないため、公式の案内を確認してください。'),
      ].join('\n')],
      ['よくある失敗', [
        UL([
          '交付決定より前に、発注や契約をしてしまう',
          '事業計画書が、取り組みの中身と合わない',
          '支援計画書の発行が、締切に間に合わない',
          '領収書や見積書などの証拠書類を保存していない',
        ]),
      ].join('\n')],
      ['よくある質問', [
        QA([
          ['個人事業主でも申請できますか？', '対象の要件を満たせば、申請できます。詳しくは、窓口で確認してください。'],
          ['創業したばかりでも使えますか？', '創業者向けの枠があります。ただし、枠ごとに要件が決まっているため、公募要領で確認してください。'],
          ['必ず採択されますか？', 'いいえ。審査があり、採択されなかった場合は補助金を受け取れません。'],
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'monodukuri.html',
    image: { file: 'b03', h: 160, alt: '' },
    kicker: '新事業進出・ものづくり商業サービス補助金',
    title: '新事業進出・ものづくり商業サービス補助金とは？旧ものづくり補助金の後継制度',
    summary: 'ものづくり補助金と新事業進出補助金が統合された制度について、枠の考え方、対象、申請の流れ、注意点を解説します。',
    lead: '2026年度から、ものづくり補助金と新事業進出補助金は「新事業進出・ものづくり商業サービス補助金」として実施されていると報じられています。新しい製品・サービスや新しい事業への挑戦を支える、設備投資系の大型の補助金です。',
    related: [['popular.html', '特に人気の5つの補助金'], ['digital-subsidy.html', 'デジタル補助金とは？'], ['shoryokuka.html', '中小企業省力化投資補助金とは？'], ['../columns/gbizid-early.html', 'gBizIDプライムは早めに取得']],
    sources: [
      ['ミラサポplus（新事業進出補助金の案内と公式ページへのリンク）', 'https://mirasapo-plus.go.jp/subsidy/shinjigyou/'],
      ['ものづくり補助金 総合サイト（事務局）', 'https://portal.monodukuri-hojo.jp/'],
      ['jGrants（デジタル庁の電子申請・公募情報）', 'https://www.jgrants-portal.go.jp/'],
    ],
    sections: [
      ['この記事の結論', [
        UL([
          '「ものづくり補助金」と「新事業進出補助金」は、2026年度から「新事業進出・ものづくり商業サービス補助金」に統合されたと報じられています。',
          '新しい製品・サービスの開発、新しい市場や事業への進出、海外展開などに必要な設備投資を支える大型の補助金です。',
          '「事業再構築補助金」の流れをくむ新事業進出補助金も、この制度に含まれます。',
          '事業計画の審査が厳しく、電子申請のためgBizIDプライムが必要です。',
        ]),
        P(NOTE_ALL),
      ].join('\n')],
      ['制度の名称の移り変わり', [
        UL([
          '<strong>ものづくり補助金</strong>（ものづくり・商業・サービス生産性向上促進補助金）：新製品・新サービスの開発や生産性向上の設備投資を支援してきた制度です。',
          '<strong>事業再構築補助金</strong>：新分野への展開や事業転換を支えた大型の制度です。その後継として、新事業進出補助金が始まりました。',
          '<strong>新事業進出・ものづくり商業サービス補助金</strong>：上の2つの流れを一つにまとめた、2026年度からの制度として案内されています。',
        ]),
        P('過去の名称で書かれた記事や資料も多く残っています。申請するときは、必ず最新の公募要領で名称と要件を確認してください。'),
      ].join('\n')],
      ['枠の考え方', [
        P('民間の解説では、次のような枠に分かれていると紹介されています。枠の名前や内容は、公募回ごとに変わることがあります。'),
        UL([
          '<strong>革新的新製品・サービス枠</strong>：新しい製品やサービスの開発に使う枠です（旧ものづくり補助金に近い内容）。',
          '<strong>新事業進出枠</strong>：今の事業とは違う、新しい市場や事業への進出に使う枠です（旧新事業進出補助金に近い内容）。',
          '<strong>グローバル枠</strong>：海外の需要を開拓する取り組みに使う枠です。',
        ]),
      ].join('\n')],
      ['対象になる人', [
        P('中小企業者や小規模事業者、個人事業主などが対象です。賃上げなどの要件が設けられることが多く、計画どおりに達成できない場合に補助金の返還を求められる場合もあります。'),
      ].join('\n')],
      ['補助の対象になりやすい経費（例）', [
        UL([
          '機械装置・システムの購入、設置',
          '建物の建設や改修（新事業進出の取り組みで、要件を満たす場合）',
          '技術の導入、専門家への依頼、外注',
          '広告宣伝・販売促進（枠によって対象になる）',
        ]),
        P('経費の区分と上限は、枠ごとに細かく決まっています。見積書や発注の時期にも決まりがあるため、公募要領の経費の項目を必ず確認してください。'),
      ].join('\n')],
      ['申請の流れ（一般的な例）', [
        OL([
          'gBizIDプライムを取得する（電子申請に必要）',
          '公募要領を読み、枠と要件を確かめる',
          '事業計画書と見積書などを作る',
          '電子申請で提出する',
          '審査を経て、採択されたら交付決定を待つ',
          '交付決定の後に、契約・発注・導入をする',
          '事業が終わったら、実績報告をする',
          '確定の審査の後に、補助金が支払われる',
        ]),
      ].join('\n')],
      ['よくある失敗', [
        UL([
          '古い制度名の記事を見て、要件を誤解してしまう',
          '交付決定の前に発注・契約をしてしまう',
          '計画と実際の導入内容がずれてしまう',
          '賃上げなどの要件を満たせず、補助金の返還を求められる',
        ]),
      ].join('\n')],
      ['よくある質問', [
        QA([
          ['ものづくり補助金は、もう申請できないのですか？', '2026年度からは、統合後の制度として公募されていると報じられています。最新の公募の状況は、公式サイトで確認してください。'],
          ['事業再構築補助金はどうなりましたか？', 'その流れをくむ新事業進出補助金が、この統合後の制度に含まれています。'],
          ['補助上限はいくらですか？', '枠や賃上げの特例によって違い、公募回ごとに変わります。必ず公式の公募要領で確認してください。'],
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'shoryokuka.html',
    image: { file: 'b04', h: 160, alt: '中小企業省力化投資補助金のタイトル画像' },
    kicker: '中小企業省力化投資補助金',
    title: '中小企業省力化投資補助金とは？人手不足を機械で補う補助金',
    summary: '人手不足の解消に役立つ省力化製品を、カタログから選んで導入する補助金の仕組みを解説します。',
    lead: '人手が足りない作業を、機械やロボットなどで減らすための補助金です。製品をカタログから選ぶ仕組みが特徴です。',
    related: [['monodukuri.html', 'ものづくり補助金とは？'], ['digital-subsidy.html', 'デジタル補助金とは？'], ['../columns/how-to-find-subsidy.html', '補助金の探し方']],
    sources: [
      ['中小企業省力化投資補助金 公式サイト（中小企業基盤整備機構）', 'https://shoryokuka.smrj.go.jp/'],
      ['経済産業省（中小企業向けの支援の情報）', 'https://www.meti.go.jp/'],
      ['ミラサポplus（補助金の情報と公募要領）', 'https://mirasapo-plus.go.jp/'],
    ],
    sections: [
      ['この記事の結論', [
        UL([
          '中小企業省力化投資補助金は、人手不足の解消に効果がある省力化製品を導入する費用を支援する補助金です。',
          '導入する製品は、事務局がまとめた「カタログ」から選びます。カタログにない製品は対象になりません。',
          '制度は改定されることがあり、補助上限や賃上げの要件も変わります。必ず最新の公式情報を確認してください。',
        ]),
        P(NOTE_ALL),
      ].join('\n')],
      ['制度の概要', [
        P('目的は、人手不足に悩む中小企業や小規模事業者が、機械やロボットなどを導入して、少ない人数で仕事を回せるようにすることです。'),
        P('カタログ注文型のほか、公募の回ごとに募集する枠もあります。どの仕組みを使うかは、公式の案内で確認してください。'),
      ].join('\n')],
      ['対象になる人', [
        P('中小企業や小規模事業者が対象です。個人事業主も対象になる場合があります。従業員数などの要件は、制度の改定で変わることがあります。'),
      ].join('\n')],
      ['補助の対象になりやすいもの（例）', [
        UL([
          'カタログに掲載された省力化製品の導入費用',
          '製品の設置や、初期の設定にかかる費用（対象の範囲は要領で確認）',
        ]),
        P('カタログに載っていない製品や、通常の買い替えは対象外になることがあります。導入前に、対象かどうかを確認してください。'),
      ].join('\n')],
      ['申請の流れ（一般的な例）', [
        OL([
          'カタログから、事業に合う製品を探す',
          '導入する事業者（販売・施工の会社）と相談し、見積りをもらう',
          '補助金の申請を行う（電子申請が中心）',
          '交付決定の後に、契約・導入をする',
          '導入の実績を報告し、補助金の支払いを受ける',
        ]),
      ].join('\n')],
      ['よくある失敗', [
        UL([
          '交付決定より前に契約・導入してしまう',
          'カタログの製品かどうかを確認しないまま見積りを取る',
          '賃上げなどの要件を満たせず、補助上限が下がる',
          '導入後の報告に必要な書類を保存していない',
        ]),
      ].join('\n')],
      ['よくある質問', [
        QA([
          ['個人事業主でも使えますか？', '要件を満たせば対象になる場合があります。詳しくは公式の案内を確認してください。'],
          ['どんな製品が対象ですか？', '人手不足の解消に効果があるとして、カタログに登録された製品です。'],
          ['補助上限はいくらですか？', '制度の改定で変わっています。金額は、必ず公式の最新情報で確認してください。'],
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'growth.html',
    image: { file: 'b09', h: 160, alt: '' },
    kicker: '中小企業成長加速化補助金',
    title: '中小企業成長加速化補助金とは？大きな成長を目指す企業の設備投資を支える補助金',
    summary: '売上の大きな成長を目指す中小企業の、大規模な設備投資を支える補助金の考え方と注意点を解説します。',
    lead: '大きく成長しようとする中小企業の、工場や設備などへの大型の投資を支える補助金です。対象や要件は、ほかの補助金よりも高い水準が求められます。',
    related: [['monodukuri.html', '新事業進出・ものづくり商業サービス補助金とは？'], ['shoryokuka.html', '中小企業省力化投資補助金とは？'], ['../who/sme.html', '中小企業が使える補助金・助成金']],
    sources: [
      ['中小企業庁', 'https://www.chusho.meti.go.jp/'],
      ['ミラサポplus（補助金の情報と公募要領）', 'https://mirasapo-plus.go.jp/'],
      ['jGrants（デジタル庁の電子申請・公募情報）', 'https://www.jgrants-portal.go.jp/'],
    ],
    sections: [
      ['この記事の結論', [
        UL([
          '中小企業成長加速化補助金は、売上の大きな成長を目指す中小企業の、大規模な設備投資を支える補助金です。',
          '民間の解説では、売上高100億円を目指す企業を対象にした制度として紹介されています。',
          '補助の規模が大きい分、投資の額や賃上げなどの要件も高く、審査も厳しくなります。',
        ]),
        P(NOTE_ALL),
      ].join('\n')],
      ['どんな企業向けか', [
        P('すでに一定の規模があり、さらに大きく成長する計画を持つ中小企業向けです。創業間もない事業者や、小さな設備の導入には、ほかの制度（持続化補助金、デジタル化・AI導入補助金、省力化投資補助金など）の方が合う場合が多いです。'),
      ].join('\n')],
      ['対象になりやすい投資（例）', [
        UL([
          '工場や物流拠点などの建物の新設・増築',
          '生産能力を大きく高める機械装置の導入',
          '成長のためのソフトウェア・システムの導入',
        ]),
      ].join('\n')],
      ['申請の前に確認すること', [
        UL([
          '投資の額の下限や、賃上げの要件',
          '経営者による発表（審査の一部として行われる場合がある）',
          '金融機関の確認書など、必要な書類',
          '交付決定の前に発注していないか',
        ]),
      ].join('\n')],
      ['よくある質問', [
        QA([
          ['小規模な事業者でも申請できますか？', '制度の目的が大きな成長投資のため、要件を満たすのは難しい場合が多いです。ほかの制度も検討してください。'],
          ['補助上限はいくらですか？', '公募回ごとに決まります。必ず公式の公募要領で確認してください。'],
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'employment.html',
    image: { file: 'b14', h: 160, alt: '' },
    kicker: '雇用関係の助成金',
    title: '雇用関係の助成金とは？キャリアアップ・人材開発・業務改善',
    summary: '人を雇う、育てる、賃金を上げるときに使える厚生労働省の助成金（キャリアアップ助成金、人材開発支援助成金、業務改善助成金など）を解説します。',
    lead: '人を雇う、育てる、待遇を良くする取り組みには、厚生労働省の助成金があります。補助金と違い、要件を満たせば受け取れるものが多いのが特徴です。',
    related: [['../columns/subsidy-vs-grant-vs-loan.html', '補助金・助成金・融資の違い'], ['../who/sme.html', '中小企業が使える補助金・助成金'], ['../personal/learning.html', '学び直しに使える教育訓練給付（個人向け）']],
    sources: [
      ['厚生労働省（事業主の方のための雇用関係助成金）', 'https://www.mhlw.go.jp/'],
      ['ハローワークインターネットサービス', 'https://www.hellowork.mhlw.go.jp/'],
    ],
    sections: [
      ['この記事の結論', [
        UL([
          '雇用関係の助成金は、厚生労働省が行う、雇用・人材育成・賃上げの取り組みを支える制度です。',
          '多くは、要件を満たせば受け取れる仕組みです（審査で採択を競う補助金とは違います）。',
          '取り組みを始める前に、計画の届け出などが必要なものが多いので、順番に注意してください。',
        ]),
        P(NOTE_ALL),
      ].join('\n')],
      ['主な助成金', [
        TABLE(['助成金', 'どんなときに', '主な対象'], [
          ['キャリアアップ助成金', '有期雇用やパートなどの人を正社員にする、待遇を改善する', '非正規雇用の従業員がいる事業主'],
          ['人材開発支援助成金', '従業員に職業訓練を受けさせる', '訓練を計画的に行う事業主'],
          ['業務改善助成金', '事業場内の最低賃金を引き上げ、生産性を上げる設備などを導入する', '中小企業・小規模事業者'],
          ['雇用調整助成金', '景気の変動などで、休業などにより雇用を維持する', '雇用の維持が必要な事業主'],
          ['特定求職者雇用開発助成金', '高齢者や障害者など、就職が難しい人を雇う', 'ハローワークなどの紹介で雇い入れる事業主'],
        ]),
      ].join('\n')],
      ['受け取るための基本的な条件', [
        UL([
          '雇用保険の適用事業所であること',
          '労働関係の法令を守っていること（未払いの賃金がないなど）',
          '取り組みの前に、計画の届け出が必要なものが多いこと',
          '出勤簿、賃金台帳、雇用契約書などの書類を整えていること',
        ]),
      ].join('\n')],
      ['申請の流れ（一般的な例）', [
        OL([
          '使えそうな助成金と、要件を確認する',
          '計画を作り、必要な場合は労働局などに届け出る',
          '計画どおりに取り組む（正社員化、訓練、賃金の引き上げなど）',
          '期限までに支給を申請する',
          '審査を経て、助成金が支給される',
        ]),
      ].join('\n')],
      ['よくある質問', [
        QA([
          ['個人事業主でも使えますか？', '従業員を雇い、雇用保険の適用事業所であれば、対象になる助成金があります。'],
          ['社会保険労務士に頼む必要はありますか？', '自分で申請できますが、書類が多いため、社会保険労務士に相談する事業者も多いです。'],
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'succession.html',
    image: { file: 'b05', h: 160, alt: '事業承継・M&A補助金のタイトル画像' },
    kicker: '事業承継・M&A補助金',
    title: '事業承継・M&A補助金とは？引き継ぎや統合に使える補助金',
    summary: '事業の引き継ぎ（事業承継）やM&Aに伴う費用を支援する補助金の、枠の考え方と注意点を解説します。',
    lead: '事業を次の代に引き継ぐときや、ほかの会社と一緒になるときに使える補助金です。名称は「事業承継・M&A補助金」が現在の案内です。',
    related: [['../columns/subsidy-vs-grant-vs-loan.html', '補助金・助成金・融資の違い'], ['../roadmap.html', '創業のステップ'], ['../columns/free-consultation.html', '補助金の無料相談窓口']],
    sources: [
      ['事業承継・M&A補助金 公式サイト（事務局）', 'https://jigyou-shokei-hojyokin.go.jp/'],
      ['ミラサポplus（補助金の情報と公募要領）', 'https://mirasapo-plus.go.jp/'],
      ['中小企業庁（事業承継の支援）', 'https://www.chusho.meti.go.jp/'],
    ],
    sections: [
      ['この記事の結論', [
        UL([
          '事業承継・M&A補助金は、事業承継やM&Aに伴う設備投資や、経営の統合などにかかる費用の一部を支援する補助金です。',
          '「引継ぎ補助金」という名称の古い資料が、今も残っています。今の正式な名称と要件は、公式サイトで確認してください。',
          '枠によって、対象になる費用と上限が違います。どの枠が合うかを、専門家と一緒に考えるのが安全です。',
        ]),
        P(NOTE_ALL),
      ].join('\n')],
      ['制度の概要', [
        P('目的は、後継者がいない中小企業の事業を引き継いだり、M&Aで事業を統合したりして、経営を続けられるようにすることです。'),
        P('枠は、専門家の活用、統合後の経営の立て直し（PMI）、事業承継の促進、廃業と新たな挑戦などに分かれています。公募の回によって、枠の名前や内容が変わることがあります。'),
      ].join('\n')],
      ['対象になる人', [
        P('中小企業や小規模事業者が対象になります。事業の引き継ぎや、M&Aの当事者であることが前提です。個人事業主の扱いは枠によって違うため、公募要領で確認してください。'),
      ].join('\n')],
      ['補助の対象になりやすい費用（例）', [
        UL([
          '専門家（弁護士、税理士、公認会計士など）に依頼する費用',
          '引き継いだ後の設備投資や、経営統合に必要な費用',
          '廃業の手続きや、新たな事業への挑戦にかかる費用（枠による）',
        ]),
        P('事業承継そのものの費用や、対象外の費用もあります。経費の区分は、公募要領で必ず確認してください。'),
      ].join('\n')],
      ['申請の流れ（一般的な例）', [
        OL([
          '自社の状況を整理し、どの枠が合うかを専門家と考える',
          '公募要領を読み、事業計画を作る',
          '電子申請で提出する（gBizIDプライムが必要）',
          '採択後、交付決定を受けてから、契約や支出をする',
          '事業を終えたら、実績報告をする',
        ]),
      ].join('\n')],
      ['よくある失敗', [
        UL([
          '交付決定より前に、専門家との契約や支払いをしてしまう',
          '古い名称や古い要件の資料を見て、申請してしまう',
          '対象外の費用を計画に入れてしまう',
          '事業の引き継ぎの時期が、公募の期間とずれる',
        ]),
      ].join('\n')],
      ['よくある質問', [
        QA([
          ['個人事業主でも申請できますか？', '枠によって扱いが違います。公募要領で確認してください。'],
          ['専門家に頼む費用は対象になりますか？', '枠によって対象になる場合があります。見積りの段階で、事務局か支援機関に確認してください。'],
          ['補助上限はいくらですか？', '枠と回によって違います。金額は公式の最新情報で確認してください。'],
        ]),
      ].join('\n')],
    ],
  },
];

const SOURCES = [
  ['IT導入補助金の公式サイト（IT導入支援事業者・登録ツールの確認）', 'https://it-shien.smrj.go.jp/'],
  ['ミラサポplus（補助金の情報と公募要領）', 'https://mirasapo-plus.go.jp/'],
  ['gBizID（電子申請に使うID）', 'https://gbiz-id.go.jp/'],
  ['jGrants（デジタル庁の補助金の電子申請・公募情報）', 'https://www.jgrants-portal.go.jp/'],
  ['中小企業庁（中小企業・小規模事業者の定義）', 'https://www.chusho.meti.go.jp/'],
];

const article = `${crumb([['index.html', '特集'], [null, 'デジタル補助金とは？']])}

    <div class="pb-banner" style="background-image: url('../images/banner/b08.webp')"><h1 class="pb-title">デジタル補助金とは？対象ツール・申請の流れ・失敗しない準備まで</h1></div>
    <div style="margin-bottom: 2rem;">
      <p class="label" style="margin-bottom: 0.5rem;">特集</p>
      <p class="lead" style="margin-bottom: 0;">ITツールやAIの導入に使える補助金の全体像を、対象・申請の流れ・よくある失敗の順に整理しました。</p>
    </div>

    <article class="area-section" aria-labelledby="s0">
      <span class="area-num">00</span>
      <h2 id="s0">この記事の結論</h2>
      <div class="area-body">
        <ul>
          <li>「デジタル補助金」は、このサイトで使う呼び名です。ITツールやAIの導入を支援する補助金の総称として使っています。代表例は、IT導入補助金です。</li>
          <li>ツールを買えば対象になるわけではありません。<strong>事務局に登録されたツールを、事業のために、交付決定の後で導入した場合</strong>に限られます。</li>
          <li>申請は、IT導入支援事業者と一緒に進めるのが一般的です。gBizIDプライムなど、事前に用意するものがあります。</li>
        </ul>
        <p>2026年度から、IT導入補助金は「デジタル化・AI導入補助金」の名称で案内されていると報じられています。名称・補助率・上限額・対象期間は年度や公募ごとに変わるため、最後は必ず公式の公募要領で確認してください。</p>
      </div>
    </article>

    <article class="area-section" aria-labelledby="s1">
      <span class="area-num">01</span>
      <h2 id="s1">デジタル補助金の主な種類</h2>
      <div class="area-body">
        <p>ITやデジタル化に関わる補助金は、いくつかの制度に分かれています。主な例は次のとおりです。</p>
        <div class="table-wrap"><table class="feature-table">
          <thead><tr><th scope="col">制度</th><th scope="col">主な対象</th><th scope="col">特徴</th></tr></thead>
          <tbody>
            <tr><th scope="row">IT導入補助金（デジタル化・AI導入補助金）</th><td>中小企業・小規模事業者など</td><td>登録されたITツールの導入費用を支援します。会計・受発注・業務管理などのツールが中心です。</td></tr>
            <tr><th scope="row">ものづくり補助金</th><td>中小企業・小規模事業者など</td><td>新しい製品・サービスや、生産の仕組みの革新に取り組む費用を支援します。デジタル化を含む取り組みが対象になる場合があります。</td></tr>
            <tr><th scope="row">自治体のデジタル化支援</th><td>市区町村・都道府県の事業者</td><td>地域ごとに、ITツールの導入やデジタル化を支援する制度があります。お住まいの地域の制度も確認してください。</td></tr>
          </tbody>
        </table></div>
        <p>制度の名称や「枠」の内容は、公募ごとに変わります。上の表は、制度を選ぶときの入口として使ってください。</p>
      </div>
    </article>

    <article class="area-section" aria-labelledby="s2">
      <span class="area-num">02</span>
      <h2 id="s2">対象になるもの・ならないもの</h2>
      <div class="area-body">
        <h3>対象になりやすいもの</h3>
        <ul>
          <li>事務局に登録された、IT導入支援事業者のITツールの導入費用</li>
          <li>登録ツールのクラウド利用料（利用できる期間には上限があります）</li>
          <li>導入に関わる費用（設定、保守など。対象の範囲は公募要領で確認）</li>
        </ul>
        <h3>対象にならないもの</h3>
        <ul>
          <li>個人で契約した、一般の有料プラン（登録されたツールでない場合）</li>
          <li>私用（プライベート）だけで使う費用</li>
          <li>交付決定より前に契約・支払いをした費用</li>
          <li>登録されていないツールや、事業に関係のないソフトの費用</li>
        </ul>
        <p>生成AIの利用料も、同じ考え方です。個人で契約したプランは対象になりません。「個人事業主でも補助金の対象になるって、ほんと？」の記事も、あわせてご覧ください。</p>
      </div>
    </article>

    <article class="area-section" aria-labelledby="s3">
      <span class="area-num">03</span>
      <h2 id="s3">対象者：個人事業主と法人</h2>
      <div class="area-body">
        <p>個人事業主も、対象になり得ます。ただし、制度ごとに「中小企業」「小規模事業者」の要件が決まっています。目安は次のとおりです（中小企業基本法の定義をもとにした一般的な基準）。</p>
        <div class="table-wrap"><table class="feature-table">
          <thead><tr><th scope="col">業種</th><th scope="col">資本金（以下）</th><th scope="col">従業員数（以下）</th></tr></thead>
          <tbody>
            <tr><th scope="row">製造業・建設業・運輸業など</th><td>3億円</td><td>300人</td></tr>
            <tr><th scope="row">卸売業</th><td>1億円</td><td>100人</td></tr>
            <tr><th scope="row">サービス業</th><td>5,000万円</td><td>100人</td></tr>
            <tr><th scope="row">小売業</th><td>5,000万円</td><td>50人</td></tr>
          </tbody>
        </table></div>
        <p>個人事業主は、資本金がないため、従業員数で判断されます。小規模事業者の基準（商業・サービス業は5人以下、製造業などは20人以下など）も、制度によって使われます。判断に迷うときは、商工会議所や商工会に相談してください。</p>
      </div>
    </article>

    <article class="area-section" aria-labelledby="s4">
      <span class="area-num">04</span>
      <h2 id="s4">申請の流れ</h2>
      <div class="area-body">
        <p>IT導入補助金の場合の、一般的な流れです。細かな手続きは、公募ごとに異なります。</p>
        <ol>
          <li><strong>IT導入支援事業者を選ぶ</strong>：申請は、支援事業者と一緒に進めます。事業者が登録しているツールを確認します。</li>
          <li><strong>導入するツールを決める</strong>：登録されたツールの中から、事業に合うものを選びます。</li>
          <li><strong>gBizIDプライムを取得する</strong>：電子申請に必要です。取得に時間がかかるため、早めに始めてください（<a href="../columns/gbizid-early.html">gBizIDプライムは早めに取得</a>）。</li>
          <li><strong>申請する</strong>：必要書類をそろえて、電子申請で提出します。</li>
          <li><strong>交付決定を受ける</strong>：決定の後に、契約・導入を始めます。<strong>決定の前の契約・支払いは対象外です。</strong></li>
          <li><strong>導入・支払い</strong>：ツールを導入し、代金を支払います。</li>
          <li><strong>実績報告</strong>：導入した証拠を添えて報告します。</li>
          <li><strong>補助金の受け取り</strong>：報告の確認の後に、補助金が支払われます。</li>
        </ol>
      </div>
    </article>

    <article class="area-section" aria-labelledby="s5">
      <span class="area-num">05</span>
      <h2 id="s5">よくある失敗</h2>
      <div class="area-body">
        <ul>
          <li><strong>交付決定の前に発注した</strong>：決定の前の契約・支払いは、補助の対象になりません。</li>
          <li><strong>登録されていないツールを選んだ</strong>：対象のツールかどうかを、必ず登録一覧で確認します。</li>
          <li><strong>gBizIDの取得が間に合わなかった</strong>：締切の直前に始めると、取得が間に合わないことがあります。</li>
          <li><strong>私用と兼用のアカウントを、そのまま申請した</strong>：事業で使う分だけが対象になります。按分の考え方は、公募要領で確認してください。</li>
          <li><strong>実績報告の準備が遅れた</strong>：導入の証拠（契約書、請求書、支払いの記録、利用の画面など）は、導入の時点で保存しておきます。</li>
        </ul>
      </div>
    </article>

    <article class="area-section" aria-labelledby="s6">
      <span class="area-num">06</span>
      <h2 id="s6">よくある質問</h2>
      <div class="area-body">
        <h3>Q. 生成AIの利用料も対象になりますか？</h3>
        <p>A. 登録されたツールで、事業のために使う場合に限り、対象になり得ます。個人で契約した一般の有料プランは、対象になりません。</p>
        <h3>Q. 補助率はどのくらいですか？</h3>
        <p>A. 補助率は、制度・枠・事業者の規模によって変わります。最新の補助率は、公式の公募要領で確認してください。</p>
        <h3>Q. 申請しても採択されないことはありますか？</h3>
        <p>A. あります。補助金は、審査に通った場合にのみ受け取れます。採択されなかった場合の準備（自己資金や、別の資金の計画）も考えておいてください。</p>
        <h3>Q. 補助金は、税金の対象になりますか？</h3>
        <p>A. 受け取った補助金は、原則として収入として扱われ、経費と相殺して税金が計算されます。確定申告の方法は、税理士などに相談してください。</p>
        <h3>Q. 個人事業主でも申請できますか？</h3>
        <p>A. 対象の要件を満たせば、申請できます。事業を行っていることを示す書類（確定申告の控えなど）を用意しておくと安心です。</p>
      </div>
    </article>

    <article class="area-section" aria-labelledby="s7">
      <span class="area-num">07</span>
      <h2 id="s7">用語集</h2>
      <div class="area-body">
        <dl class="glossary">
          <dt>IT導入支援事業者</dt><dd>補助金の申請を支援し、登録されたITツールを販売・導入する事業者です。</dd>
          <dt>登録ツール</dt><dd>事務局に登録され、補助の対象として認められたITツールです。</dd>
          <dt>交付決定</dt><dd>補助金の交付が決まったことを示す通知です。決定の後に、契約・導入を始めます。</dd>
          <dt>実績報告</dt><dd>導入が終わったことを証明して、補助金の支払いを求める手続きです。</dd>
          <dt>gBizID</dt><dd>行政の電子申請などに使う共通のIDです。補助金では、プライムの取得が必要です。</dd>
          <dt>補助率</dt><dd>補助対象の経費のうち、補助金で支払われる割合です。</dd>
        </dl>
      </div>
    </article>

    <article class="area-section" aria-labelledby="s8">
      <span class="area-num">08</span>
      <h2 id="s8">最新情報の確認先</h2>
      <div class="area-body">
        <p>制度の内容は変わります。申請の前に、次の公式情報で確認してください。</p>
        <ul>
${SOURCES.map(([label, href]) => `          <li><a href="${href}" target="_blank" rel="noopener">${esc(label)}</a></li>`).join('\n')}
        </ul>
        <p class="area-note" style="margin-top: 16px;">最終更新日：${UPDATED}</p>
      </div>
    </article>

    <nav class="related-links" aria-label="関連ページ">
      <h2>関連ページ</h2>
      <ul>
        <li><a href="../columns/gbizid-early.html">gBizIDプライムは早めに取得</a></li>
        <li><a href="../columns/how-to-find-subsidy.html">補助金の探し方</a></li>
        <li><a href="../columns/free-consultation.html">補助金の無料相談窓口</a></li>
        <li><a href="../compare/index.html">比較記事</a></li>
      </ul>
    </nav>

    <nav class="related-links" aria-label="特集の一覧">
      <h2>特集の一覧</h2>
      <ul>
        <li><a href="index.html">特集トップに戻る</a></li>
      </ul>
    </nav>`;

const featureStyle = `
    .feature-table { width: 100%; border-collapse: collapse; margin: 8px 0 16px; font-size: 0.92rem; }
    .feature-table th, .feature-table td { border: 1px solid #e0e0e0; padding: 10px 12px; text-align: left; vertical-align: top; }
    .feature-table thead th { background: #f4f6f8; }
    .table-wrap { overflow-x: auto; }
    .glossary dt { font-weight: 700; margin-top: 12px; }
    .glossary dd { margin: 4px 0 0; }
    .feature-card { display: block; padding: 20px 0; border-top: 1px solid #e0e0e0; text-decoration: none; }
    .feature-card h2 { font-size: 1.2rem; margin: 0 0 6px; }
    .feature-card p { margin: 0; color: var(--mute); }
`;

function page({ file, title, description, canonicalPath, body }) {
  writeFileSync(join(OUT, file), withCases(shell({ title, description, canonicalPath, body }).replace('</style>', `${featureStyle}\n  </style>`), `feature/${file}`));
}

mkdirSync(OUT, { recursive: true });

const FEATURES = [
  { file: POPULAR.file, title: POPULAR.title, summary: POPULAR.summary },
  { file: 'digital-subsidy.html', title: 'デジタル補助金とは？対象ツール・申請の流れ・失敗しない準備まで', summary: 'ITツールやAIの導入に使える補助金の種類、対象になるもの・ならないもの、申請の流れ、よくある失敗を解説します。' },
  ...ARTICLES.map((a) => ({ file: a.file, title: a.title, summary: a.summary })),
];

const cards = FEATURES.map((f) => `      <a class="feature-card" href="${f.file}">
        <h2>${esc(f.title)}</h2>
        <p>${esc(f.summary)}</p>
      </a>`).join('\n');

page({
  file: 'index.html',
  title: '特集｜補助金ネット',
  description: '補助金の制度を、テーマごとに詳しく解説する特集コーナーです。',
  canonicalPath: '/feature/index.html',
  body: `${crumb([[null, '特集']])}

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">特集</h1>
      <p class="lead" style="margin-bottom: 0;">補助金の制度を、テーマごとに詳しく解説します。</p>
    </div>

    <section class="area-section" aria-labelledby="list">
      <div class="area-body">
${cards}
      </div>
    </section>

    <p class="area-note">特集の内容は、公開情報をもとに作成しています。制度の最新の要件は、公式サイトで確認してください。</p>`,
});

page({
  file: 'digital-subsidy.html',
  title: 'デジタル補助金とは？対象ツール・申請の流れ・失敗しない準備まで｜補助金ネット',
  description: 'ITツールやAIの導入に使える補助金の種類、対象になるもの・ならないもの、申請の流れ、よくある失敗を解説します。',
  canonicalPath: '/feature/digital-subsidy.html',
  body: article,
});

page({ file: POPULAR.file, title: `${POPULAR.title}`, description: POPULAR.summary, canonicalPath: `/feature/${POPULAR.file}`, body: articleOf({ ...POPULAR, kicker: POPULAR.kicker }) });

for (const a of ARTICLES) {
  page({ file: a.file, title: `${a.title}｜補助金ネット`, description: a.summary, canonicalPath: `/feature/${a.file}`, body: articleOf(a) });
}

console.log('特集ページを生成しました');
