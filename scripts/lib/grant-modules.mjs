// 制度ごとのページ（public/grants/<ID>.html）の本文を、特集記事の共通スタイル（fx-）の部品で組み立てる。
// 公開データ（制度名・対象地域・上限額・受付期間・従業員数）にある事実はそのまま使い、
// 「申請の流れ」「よくある失敗」「用語集」などの一般的な説明には、「多くの補助金では」「一般的な」と添える（この制度の個別の条件は、公募要領で確認するよう案内する）。
import * as fx from './feature-v2.mjs';

const { esc } = fx;

// 多くの補助金に共通する、一般的な流れ
const FLOW = [
  { label: '準備', start: 1, steps: [
    { title: '公募要領を読む', html: '対象になる人・経費・申請の方法・締切は、公募要領に書かれています。最初に確認します。' },
    { title: '申請の準備をする', html: '事業の計画、見積書、決算書などの書類を用意します。電子申請の場合は、gBizIDプライムも必要です（<a href="../columns/gbizid-early.html">gBizIDプライムは早めに取得</a>）。', badge: '早めに着手' },
  ] },
  { label: '申請・審査', start: 3, gate: 'ここから契約・支払いOK（多くの補助金の場合）', steps: [
    { title: '申請する', html: '必要書類をそろえて、締切までに提出します。' },
    { title: '審査・採択', html: '審査の結果、採択（または不採択）の通知が届きます。' },
    { title: '交付決定を受ける', tone: 'accent', html: '多くの補助金では、交付決定の後に、契約・発注を始めます。<strong class="fx-em">決定の前の契約・支払いは、対象外になることがあります。</strong>' },
  ] },
  { label: '実施・報告', start: 6, steps: [
    { title: '事業を実施し、支払う', html: '計画に沿って事業を進め、代金を支払います。' },
    { title: '実績報告', html: '契約書・請求書・支払いの記録など、実施した証拠を添えて報告します。' },
    { title: '補助金の受け取り', tone: 'ok', html: '多くの補助金は後払いです。報告の確認の後に支払われるため、先に自己資金で支払う必要があります。' },
  ] },
];

const MISTAKES = [
  ['交付決定の前に発注した', '多くの補助金では、決定の前の契約・支払いは対象になりません。'],
  ['対象外の経費を入れてしまった', '対象になる経費は、公募要領で決まっています。見積の段階で確認します。'],
  ['締切の直前に始めた', '書類の準備や、gBizIDプライムの取得に時間がかかり、間に合わないことがあります。'],
  ['実績報告の準備が遅れた', '契約書、請求書、支払いの記録などの証拠は、支払いの時点で保存しておきます。'],
  ['後払いの資金を考えていなかった', '多くの補助金は後払いです。つなぎの資金の計画も、先に立てておきます。'],
];

const GENERIC_FAQ = [
  ['補助率はどのくらいですか？', '補助率は、制度・枠・事業者の規模によって変わります。この制度の補助率は、公式の公募要領で確認してください。'],
  ['申請しても採択されないことはありますか？', 'あります。補助金は、審査に通った場合にのみ受け取れます。採択されなかった場合の準備（自己資金や、別の資金の計画）も考えておいてください。'],
  ['補助金は、税金の対象になりますか？', '受け取った補助金は、原則として収入として扱われ、経費と相殺して税金が計算されます。確定申告の方法は、税理士などに相談してください。'],
];
export const genericFaq = () => GENERIC_FAQ;

const GLOSSARY = [
  ['公募要領', '補助金の募集の条件（対象・経費・申請の方法・審査の基準など）を定めた文書です。'],
  ['交付決定', '補助金の交付が決まったことを示す通知です。多くの補助金では、決定の後に、契約・発注を始めます。'],
  ['実績報告', '事業が終わったことを証明して、補助金の支払いを求める手続きです。'],
  ['gBizID', '行政の電子申請などに使う共通のIDです。電子申請では、プライムの取得が必要になることが多くあります。'],
  ['補助率', '補助対象の経費のうち、補助金で支払われる割合です。'],
];

const SIZE_TABLE = [
  ['製造業・建設業・運輸業など', '3億円', '300人'],
  ['卸売業', '1億円', '100人'],
  ['サービス業', '5,000万円', '100人'],
  ['小売業', '5,000万円', '50人'],
];

// 説明文（プレーンテキスト）を、段落と箇条書きにする。HTML は入れず、すべてエスケープする
function prose(text) {
  const out = [];
  let list = [];
  const flush = () => { if (list.length) { out.push(`      <ul class="fx-prose-list">\n${list.map((l) => `        <li>${esc(l)}</li>`).join('\n')}\n      </ul>`); list = []; } };
  for (const line of text.split('\n')) {
    if (line.startsWith('・')) list.push(line.slice(1).trim());
    else { flush(); out.push(`      <p class="fx-prose">${esc(line)}</p>`); }
  }
  flush();
  return `      <div class="fx-card fx-pad-l fx-prose-box">\n${out.join('\n')}\n      </div>`;
}

// 概要の項目表（fx-facts）。tagRows は「分類（参考）」の <dt><dd> の HTML（なければ空）
// jGrants の「利用目的」「業種」は「 / 」区切りの一覧。2つ以上なら、1つずつのタグにして並べる
function tagsOrText(v) {
  const parts = String(v).split(/\s+\/\s+/).map((x) => x.trim()).filter(Boolean);
  if (parts.length < 2) return v;
  return { html: `<span class="fx-vtags">${parts.map((p) => `<span class="fx-vtag">${esc(p)}</span>`).join('')}</span>` };
}

function facts(rows, tagRows) {
  return `      <dl class="fx-card fx-facts">
${rows.map(([t, d]) => `        <dt>${esc(t)}</dt><dd>${typeof d === 'object' ? d.html : esc(d)}</dd>`).join('\n')}
${tagRows}
      </dl>`;
}

// 目次のリンク（本文の目次と、右の列の目次で同じ内容を使う）
const tocLinks = (g, detail) => [
  ['#facts', '制度の概要'], ...(detail?.text ? [['#detail', '制度の説明（jGrants掲載）']] : []), ['#flow', '申請の流れ'], ['#mistakes', 'よくある失敗'], ['#check', '申請前に確認したいこと'],
  ...(g.employees ? [['#size', '中小企業の目安']] : []),
  ['#faq', 'よくある質問'], ['#glossary', '用語集'], ['#sources', '最新情報の確認先'],
];

export function grantBody({ g, st, detail = null, projectEndJa = '', startJa, endJa, amount, faq, tagRows, guides, jgrantsDetail, jgrantsPortal }) {
  const links = tocLinks(g, detail);
  const parts = [];
  // 目次：制度の概要の上に、1枚のカードでコンパクトに並べる（右の列には置かない）
  parts.push(`    <nav class="fx-card fx-toc-mini" aria-labelledby="toc">
      <h2 id="toc">目次</h2>
      <ol>
${links.map(([h, t]) => `        <li><a href="${h}">${esc(t)}</a></li>`).join('\n')}
      </ol>
    </nav>`);

  parts.push(fx.section('sec-facts', 'facts', '制度の概要', `${facts([
    ['対象地域', g.area || '記載なし'],
    ['上限額', amount],
    ['対象の従業員数', g.employees || '記載なし'],
    ...(detail?.rate ? [['補助率', detail.rate]] : []),
    ...(detail?.purpose ? [['利用目的', tagsOrText(detail.purpose)]] : []),
    ...(detail?.industry ? [['対象の業種', tagsOrText(detail.industry)]] : []),
    ...(detail?.areaDetail ? [['対象地域の詳細', detail.areaDetail]] : []),
    ['受付開始', startJa],
    ['受付締切', endJa],
    ...(projectEndJa ? [['事業の終了期限', projectEndJa]] : []),
  ], tagRows)}
      <p class="fx-links-row"><a class="fx-btn" href="${jgrantsDetail}" target="_blank" rel="noopener">jGrants でこの補助金の詳細を見る →</a></p>`));

  if (detail?.text) {
    parts.push(fx.section('detail', 's-detail', '制度の説明（jGrants掲載の内容）', `      <p>次の説明は、jGrants（デジタル庁）に掲載されている内容を、そのまま表示しています。</p>
${prose(detail.text)}${detail.clipped ? `
      <p class="fx-note-plain">長い説明のため、途中までを表示しています。続きは、<a href="${jgrantsDetail}" target="_blank" rel="noopener">jGrants のこの補助金のページ</a>でご覧ください。</p>` : ''}${detail.files?.length ? `
      <h3 class="fx-h3">jGrants に掲載されている資料</h3>
      <ul class="fx-card fx-pad-m fx-files">
${detail.files.map((f) => `        <li>${esc(f)}</li>`).join('\n')}
      </ul>
      <p class="fx-note-plain">資料の本文は、<a href="${jgrantsDetail}" target="_blank" rel="noopener">jGrants のページ</a>から確認できます。</p>` : ''}`));
  }

  parts.push(fx.section('flow', 's-flow', '申請の流れ（一般的な8ステップ）', `      <p>多くの補助金に共通する、一般的な流れです。この制度の手続きは、公募要領で確認してください。<strong class="fx-em">契約・支払いは、交付決定の後から（多くの補助金の場合）。</strong></p>
${fx.steps(FLOW)}`));

  parts.push(fx.section('mistakes', 's-mistakes', '多くの補助金で、つまずきやすい所', fx.mistakes(MISTAKES, ['この制度が自分に合うか、まず確かめたい方へ', '../consult.html', '無料で相談する →'])));

  parts.push(fx.section('check', 's-check', '申請前に確認したいこと', `      <div class="fx-card fx-pad-m">
        <ul class="fx-mlist fx-mlist--plain">
          <li>自分が対象になるか（事業者の種類、創業後の年数、従業員数など）</li>
          <li>対象になる経費は何か。交付決定の前に発注すると対象外になることがあります。</li>
          <li>多くの補助金は後払いのため、先に自己資金で支払う必要があります。</li>
        </ul>
      </div>
      <p class="fx-links-row"><a href="../columns/subsidy-paid-after.html">後払いの仕組みを読む →</a> <a href="../columns/how-to-find-subsidy.html">補助金の探し方を読む →</a></p>`));

  if (g.employees) {
    parts.push(fx.section('size', 's-size', '中小企業の目安', `      <p>この制度は、対象の従業員数に条件があります（公開データでは「${esc(g.employees)}」）。参考として、中小企業の一般的な基準（中小企業基本法の定義をもとにしたもの）を示します。制度ごとの正式な要件は、公募要領で確認してください。</p>
${fx.table(['業種', '資本金（以下）', '従業員数（以下）'], SIZE_TABLE, { align: ['l', 'r', 'r'] })}`));
  }

  parts.push(fx.section('faq', 's-faq', 'よくある質問', fx.faq(faq)));
  parts.push(fx.section('glossary', 's-glossary', '用語集', fx.glossary(GLOSSARY)));

  parts.push(fx.section('sources', 's-sources', '最新情報の確認先', `      <p>制度の内容は変わります。申請の前に、次の公式情報で確認してください。</p>
${fx.linkList([
    [jgrantsDetail, 'jGrants のこの補助金のページ', '公募情報・申請の方法の確認', true],
    [jgrantsPortal, 'jGrants', 'デジタル庁の補助金の電子申請・公募情報', true],
    ['https://gbiz-id.go.jp/', 'gBizID', '電子申請に使うID', true],
    ['https://mirasapo-plus.go.jp/', 'ミラサポplus', '補助金の情報と公募要領', true],
  ])}`));

  const related = [
    ...guides,
    ['../basics/flow.html', '補助金の申請の流れ（基礎知識）', '', false],
    ['../basics/business-plan.html', '事業計画書の書き方（基礎知識）', '', false],
    ['../columns/free-consultation.html', '補助金の無料相談窓口', '', false],
  ];
  parts.push(`    <section class="fx-sec" aria-labelledby="fx-related"><h2 class="fx-h2-plain" id="fx-related">関連する、当サイトの解説</h2>
${fx.linkList(related)}
    </section>`);

  parts.push(`    <div class="fx-foot">
      <p class="fx-disc">この情報は jGrants（デジタル庁）の公開データをもとに自動で作成しています。対象・金額・締切は変わることがあるため、申請前に必ず公式サイトで確認してください。「申請の流れ」「よくある失敗」「用語集」は、多くの補助金に共通する一般的な説明です。</p>
    </div>`);
  return parts.join('\n\n');
}
