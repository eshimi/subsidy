// 特集コーナー（public/feature/）のページを生成する: node scripts/build-feature-pages.mjs
// 内容を変えたらこのファイルを直して実行し、生成されたファイルをコミットする。
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, shell } from './lib/site-shell.mjs';

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

    <div style="margin-bottom: 2rem;">
      <p class="label" style="margin-bottom: 0.5rem;">特集</p>
      <h1 class="display" style="margin-bottom: 0.5rem;">${esc(title)}</h1>
      <p class="lead" style="margin-bottom: 0;">${esc(lead)}</p>
    </div>

${image ? `    <figure class="feature-hero"><img src="../images/feature/${image.file}.webp" alt="${esc(image.alt)}" width="1200" height="${image.h}"></figure>\n` : ''}${body}

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

const ARTICLES = [
  {
    file: 'jizokuka.html',
    image: { file: 'jizokuka', h: 132, alt: '小規模事業者持続化補助金のタイトル画像' },
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
    image: { file: 'monodukuri', h: 132, alt: 'ものづくり補助金のタイトル画像' },
    kicker: 'ものづくり補助金',
    title: 'ものづくり補助金とは？新製品・新サービスの開発を支える補助金',
    summary: '新しい製品・サービスの開発や、生産プロセスの改善に使える補助金を、対象・申請の流れ・注意点とともに解説します。',
    lead: '製品やサービスを新しくする、大きめの設備投資に使われる補助金です。正式名称は「ものづくり・商業・サービス生産性向上促進補助金」です。',
    related: [['digital-subsidy.html', 'デジタル補助金とは？'], ['../columns/gbizid-early.html', 'gBizIDプライムは早めに取得'], ['shoryokuka.html', '中小企業省力化投資補助金とは？']],
    sources: [
      ['ものづくり補助金 公式サイト（事務局）', 'https://portal.monodukuri-hojo.jp/'],
      ['ミラサポplus（補助金の情報と公募要領）', 'https://mirasapo-plus.go.jp/'],
      ['jGrants（デジタル庁の電子申請・公募情報）', 'https://www.jgrants-portal.go.jp/'],
    ],
    sections: [
      ['この記事の結論', [
        UL([
          'ものづくり補助金は、革新的な新製品・新サービスの開発や、生産性を大きく上げる設備投資を支援する補助金です。',
          '補助金額が大きい分、事業計画の審査が厳しく、計画の中身が問われます。',
          '申請は電子申請が中心のため、gBizIDプライムが必要です。取得に時間がかかるので、早めに始めてください。',
        ]),
        P(NOTE_ALL),
      ].join('\n')],
      ['制度の概要', [
        P('目的は、中小企業や小規模事業者が、新しい製品・サービスを生み出し、生産性を上げ、賃金を引き上げることです。公募ごとに、対象の枠（製品・サービスの高付加価値化、生産プロセスの効率化など）が決められます。'),
        P('公募は回ごとに行われ、締切も回ごとに違います。過去の回の情報は、今の要件と違うことがあります。'),
      ].join('\n')],
      ['対象になる人', [
        P('中小企業者や小規模事業者、個人事業主、特定の非営利法人などが対象です。対象の範囲と要件は、公募要領で確認してください。'),
        P('事業計画で、「何を新しくするか」「どのように売上や生産性を上げるか」を示す必要があります。'),
      ].join('\n')],
      ['補助の対象になりやすい経費（例）', [
        UL([
          '機械装置・システムの購入、設置費用',
          '専門家への謝金、外注費',
          '広告宣伝・販売促進の費用（枠によって対象になる）',
          '技術導入やデータ収集の費用（枠によって対象になる）',
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
          '交付決定の前に発注・契約をしてしまう',
          '計画と実際の導入内容がずれてしまう',
          'gBizIDの取得が締切に間に合わない',
          '見積書の内容が、公募要領の条件を満たしていない',
        ]),
      ].join('\n')],
      ['よくある質問', [
        QA([
          ['小さな設備でも申請できますか？', '金額の要件があるので、公募要領で確認してください。また、枠によって対象が変わります。'],
          ['計画書は自分で作れますか？', '作れます。ただし、審査の観点が決まっているため、支援機関や専門家に相談するのも一つの方法です。'],
          ['採択されると、すぐ入金されますか？', 'いいえ。交付決定、事業の実施、実績報告、確定の審査を経てから支払われます。'],
        ]),
      ].join('\n')],
    ],
  },
  {
    file: 'shoryokuka.html',
    image: { file: 'shoryokuka', h: 126, alt: '中小企業省力化投資補助金のタイトル画像' },
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
    file: 'succession.html',
    image: { file: 'succession', h: 131, alt: '事業承継・M&A補助金のタイトル画像' },
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

    <div style="margin-bottom: 2rem;">
      <p class="label" style="margin-bottom: 0.5rem;">特集</p>
      <h1 class="display" style="margin-bottom: 0.5rem;">デジタル補助金とは？対象ツール・申請の流れ・失敗しない準備まで</h1>
      <p class="lead" style="margin-bottom: 0;">ITツールやAIの導入に使える補助金の全体像を、対象・申請の流れ・よくある失敗の順に整理しました。</p>
    </div>

    <figure class="feature-hero"><img src="../images/feature/digital.webp" alt="デジタル補助金のタイトル画像" width="1200" height="132"></figure>

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
    .feature-hero { margin: 0 0 32px; }
    .feature-hero img { display: block; width: 100%; height: auto; }
    .feature-card { display: block; padding: 20px 0; border-top: 1px solid #e0e0e0; text-decoration: none; }
    .feature-card h2 { font-size: 1.2rem; margin: 0 0 6px; }
    .feature-card p { margin: 0; color: var(--mute); }
`;

function page({ file, title, description, canonicalPath, body }) {
  writeFileSync(join(OUT, file), shell({ title, description, canonicalPath, body }).replace('</style>', `${featureStyle}\n  </style>`));
}

mkdirSync(OUT, { recursive: true });

const FEATURES = [
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

for (const a of ARTICLES) {
  page({ file: a.file, title: `${a.title}｜補助金ネット`, description: a.summary, canonicalPath: `/feature/${a.file}`, body: articleOf(a) });
}

console.log('特集ページを生成しました');
