// 特集コーナー（public/feature/）のページを生成する: node scripts/build-feature-pages.mjs
// 内容を変えたらこのファイルを直して実行し、生成されたファイルをコミットする。
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, shell } from './lib/site-shell.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'feature');
const UPDATED = '2026年10月10日';

const crumb = (items) => `    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ ${items.map(([h, t]) => (h ? `<a href="${h}">${esc(t)}</a>` : esc(t))).join(' ＞ ')}</nav>`;

const FEATURES = [
  { file: 'digital-subsidy.html', title: 'デジタル補助金とは？対象ツール・申請の流れ・失敗しない準備まで', summary: 'ITツールやAIの導入に使える補助金の種類、対象になるもの・ならないもの、申請の流れ、よくある失敗を解説します。' },
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
  writeFileSync(join(OUT, file), shell({ title, description, canonicalPath, body }).replace('</style>', `${featureStyle}\n  </style>`));
}

mkdirSync(OUT, { recursive: true });

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

console.log('特集ページを生成しました');
