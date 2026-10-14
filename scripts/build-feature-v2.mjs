// 特集「デジタル補助金とは？」（public/feature/digital-subsidy.html）を、新レイアウト（特集記事の共通スタイル fx-）で作る。
//  ・本文の文言は、これまでのページのものをそのまま使う。「背景と目的」と「向き・不向き」は、これまでと同じデータ
//    （scripts/data/feature-background.mjs / feature-fit.mjs）から作るので、データを直せばこのページにも反映される。
//  ・PART1 まず知る／PART2 申請する／PART3 もっと知る。区切りのイラストはPARTの切れ目の3か所だけ。
// 使い方：node scripts/build-feature-v2.mjs（build-feature-pages.mjs からも呼ばれる）。何度実行しても同じ結果。
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { shell } from './lib/site-shell.mjs';
import { withCases } from './lib/cases.mjs';
import * as fx from './lib/feature-v2.mjs';
import { BACKGROUND } from './data/feature-background.mjs';
import { FIT } from './data/feature-fit.mjs';
import { articles, relatedFor } from './apply-background.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'feature');
const SLUG = 'digital-subsidy';
const PUBLISHED = '2026-10-10';
const UPDATED = '2026-10-14'; // 最終更新日＝出典の確認日（BACKGROUND の asOf と同じ日）
const ja = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${y}年${m}月${d}日`; };
const slash = (iso) => iso.replace(/-/g, '/');
const TITLE = 'デジタル補助金とは？対象ツール・申請の流れ・失敗しない準備まで';
const LEAD = 'ITツールやAIの導入に使える補助金の全体像を、対象・申請の流れ・よくある失敗の順に整理しました。';

const crumb = `    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ <a href="index.html">特集</a> ＞ デジタル補助金とは？</nav>`;

function body() {
  const bg = BACKGROUND[SLUG];
  const fit = FIT[SLUG];
  const related = relatedFor(bg.keywords, articles(), 6, bg.caseKeywords);
  const enSplit = (s) => { const i = s.search(/\s?→\s?/); return i < 0 ? [s, ''] : [s.slice(0, i), s.slice(i).replace(/^\s?→\s?/, '')]; };
  const plain = (s) => s.replace(/<[^>]+>/g, '');
  if (!bg.asOf.includes(ja(UPDATED))) throw new Error(`出典の確認日（${bg.asOf}）と最終更新日（${ja(UPDATED)}）がそろっていません`);

  // 背景：3つの要点（見出しの語は、データの文から作る）
  const heads = ['労働生産性を高める', '2017年1月', 'デジタル化・AI導入補助金'];
  const cards = bg.summary.map((t, i) => {
    const label = (t.match(/<strong>(.*?)<\/strong>/) || [])[1];
    return [label, heads[i], t.replace(/<strong>.*?<\/strong>\s*/, '')];
  });
  const flowLabel = bg.flow.map(([k, v]) => `${k}：${v.replace(/\n/g, '、')}`).join(' → ');
  const tlMeta = [
    ['2017', '1月', '前身事業がスタート'],
    ['2018', '', '小さな企業ほどIT活用が低い'],
    ['2019–22', '年度', '「IT導入補助金」として継続'],
    ['2023', '3月', '「複数社連携IT導入類型」を新設'],
    ['2025', '年度', '支援の中身を拡充'],
  ];
  const dot = (s) => (/[。）]$/.test(s) ? s : `${s}。`);
  const tl = tlMeta.map(([year, sub, head], i) => ({ year, sub, head, body: dot(bg.timeline[i][1]) }));
  const lastBody = bg.timeline[5][1];
  const frames = lastBody.replace(/^名称を「[^」]*」に変更。/, '').replace(/の構成$/, '').split('、');
  tl.push({ year: '2026', sub: '年度', head: '名称を「デジタル化・AI導入補助金」に変更', badge: '最新', body: 'この名称のもと、次の4つの枠で構成されています。', chips: frames, last: true });

  // 当サイトの見方：現行の2つの段落を、1文ずつに分けて並べる（文言はそのまま）
  const sentences = bg.view.flatMap((p) => p.split('。').filter(Boolean).map((s) => `${s}。`));
  const [viewLead, ...viewItems] = sentences;

  const parts = [];
  parts.push(fx.toc([
    ['PART 1　まず知る', 'orange', [['#types', '主な種類'], ['#scope', '対象になるもの・ならないもの'], ['#who', '対象者']]],
    ['PART 2　申請する', 'orange', [['#flow', '申請の流れ（8ステップ）'], ['#mistakes', 'よくある失敗'], ['#faq', 'よくある質問']]],
    ['PART 3　もっと知る', 'ok', [['#s7', '用語集'], ['#bg', '制度の背景と目的'], ['#view', '当サイトの見方'], ['#fit', '向き・不向き／近い制度との違い'], ['#summary', 'この記事のまとめ'], ['#s8', '最新情報の確認先']]],
  ]));

  parts.push(fx.divider(1));
  parts.push(fx.partHead(1, 'まず知る：どんな補助金で、何が対象？'));

  parts.push(fx.section('types', 's1', 'デジタル補助金の主な種類', `      <p>ITやデジタル化に関わる補助金は、いくつかの制度に分かれています。主な例は次のとおりです。</p>
${fx.typeList([
    ['IT導入補助金', '（デジタル化・AI導入補助金）', '中小企業・小規模事業者など', '登録されたITツールの導入費用を支援します。会計・受発注・業務管理などのツールが中心です。'],
    ['ものづくり補助金', '', '中小企業・小規模事業者など', '新しい製品・サービスや、生産の仕組みの革新に取り組む費用を支援します。デジタル化を含む取り組みが対象になる場合があります。'],
    ['自治体のデジタル化支援', '', '市区町村・都道府県の事業者', '地域ごとに、ITツールの導入やデジタル化を支援する制度があります。お住まいの地域の制度も確認してください。'],
  ])}
      <p>制度の名称や「枠」の内容は、公募ごとに変わります。上の表は、制度を選ぶときの入口として使ってください。</p>`));

  parts.push(fx.section('scope', 's2', '対象になるもの・ならないもの', `      <div class="fx-grid fx-grid--2">
${fx.markBox('ok', '対象になりやすいもの', [
    ['事務局に登録された、IT導入支援事業者のITツールの導入費用'],
    ['登録ツールのクラウド利用料', '利用できる期間には上限があります'],
    ['導入に関わる費用（設定、保守など）', '対象の範囲は公募要領で確認'],
  ])}
${fx.markBox('ng', '対象にならないもの', [
    ['個人で契約した、一般の有料プラン（登録されたツールでない場合）'],
    ['私用（プライベート）だけで使う費用'],
    ['<strong>交付決定より前</strong>に契約・支払いをした費用'],
    ['登録されていないツールや、事業に関係のないソフトの費用'],
  ])}
      </div>
      <p>生成AIの利用料も、同じ考え方です。個人で契約したプランは対象になりません。「個人事業主でも補助金の対象になるって、ほんと？」の記事も、あわせてご覧ください。</p>`));

  parts.push(fx.section('who', 's3', '対象者：個人事業主と法人', `      <p>個人事業主も、対象になり得ます。ただし、制度ごとに「中小企業」「小規模事業者」の要件が決まっています。目安は次のとおりです（中小企業基本法の定義をもとにした一般的な基準）。</p>
${fx.table(['業種', '資本金（以下）', '従業員数（以下）'], [
    ['製造業・建設業・運輸業など', '3億円', '300人'],
    ['卸売業', '1億円', '100人'],
    ['サービス業', '5,000万円', '100人'],
    ['小売業', '5,000万円', '50人'],
  ], { align: ['l', 'r', 'r'] })}
      <div class="fx-card fx-callout">${fx.ICON.person}<p><strong>個人事業主は、資本金がないため、従業員数で判断されます。</strong>小規模事業者の基準（商業・サービス業は5人以下、製造業などは20人以下など）も、制度によって使われます。判断に迷うときは、商工会議所や商工会に相談してください。</p></div>`));

  parts.push(fx.divider(2));
  parts.push(fx.partHead(2, '申請する：流れと、つまずきやすい所'));

  parts.push(fx.section('flow', 's4', '申請の流れ（8ステップ）', `      <p>IT導入補助金の場合の、一般的な流れです。細かな手続きは、公募ごとに異なります。<strong class="fx-em">契約・支払いは、交付決定の後から。</strong></p>
${fx.stepsCompact([
    { label: '準備', start: 1, steps: [
      { title: 'IT導入支援事業者を選ぶ', html: '申請は、支援事業者と一緒に進めます。事業者が登録しているツールを確認します。' },
      { title: '導入するツールを決める', html: '登録されたツールの中から、事業に合うものを選びます。' },
      { title: 'gBizIDプライムを取得する', badge: '早めに着手', html: '電子申請に必要です。取得に時間がかかるため、早めに始めてください（<a href="../columns/gbizid-early.html">gBizIDプライムは早めに取得</a>）。' },
    ] },
    { label: '申請', start: 4, gate: 'ここから契約・支払いOK', steps: [
      { title: '申請する', html: '必要書類をそろえて、電子申請で提出します。' },
      { title: '交付決定を受ける', tone: 'accent', html: '決定の後に、契約・導入を始めます。<strong class="fx-em">決定の前の契約・支払いは対象外です。</strong>' },
    ] },
    { label: '導入・報告', start: 6, steps: [
      { title: '導入・支払い', html: 'ツールを導入し、代金を支払います。' },
      { title: '実績報告', html: '導入した証拠を添えて報告します。' },
      { title: '補助金の受け取り', tone: 'ok', html: '報告の確認の後に、補助金が支払われます。' },
    ] },
  ])}`));

  parts.push(fx.section('mistakes', 's5', 'よくある失敗', fx.mistakes([
    ['交付決定の前に発注した', '決定の前の契約・支払いは、補助の対象になりません。'],
    ['登録されていないツールを選んだ', '対象のツールかどうかを、必ず登録一覧で確認します。'],
    ['gBizIDの取得が間に合わなかった', '締切の直前に始めると、取得が間に合わないことがあります。'],
    ['私用と兼用のアカウントを、そのまま申請した', '事業で使う分だけが対象になります。按分の考え方は、公募要領で確認してください。'],
    ['実績報告の準備が遅れた', '導入の証拠（契約書、請求書、支払いの記録、利用の画面など）は、導入の時点で保存しておきます。'],
  ], ['使いたいツールが対象か、まず確かめたい方へ', '../consult.html', '無料で相談する →'])));

  parts.push(fx.section('faq', 's6', 'よくある質問', fx.faq([
    ['生成AIの利用料も対象になりますか？', '登録されたツールで、事業のために使う場合に限り、対象になり得ます。個人で契約した一般の有料プランは、対象になりません。'],
    ['補助率はどのくらいですか？', '補助率は、制度・枠・事業者の規模によって変わります。最新の補助率は、公式の公募要領で確認してください。'],
    ['申請しても採択されないことはありますか？', 'あります。補助金は、審査に通った場合にのみ受け取れます。採択されなかった場合の準備（自己資金や、別の資金の計画）も考えておいてください。'],
    ['補助金は、税金の対象になりますか？', '受け取った補助金は、原則として収入として扱われ、経費と相殺して税金が計算されます。確定申告の方法は、税理士などに相談してください。'],
    ['個人事業主でも申請できますか？', '対象の要件を満たせば、申請できます。事業を行っていることを示す書類（確定申告の控えなど）を用意しておくと安心です。'],
  ])));

  parts.push(fx.divider(3));
  parts.push(fx.partHead(3, 'もっと知る：言葉・成り立ち・選び方', 'ok'));

  parts.push(fx.section('glossary', 's7', '用語集', fx.glossary([
    ['IT導入支援事業者', '補助金の申請を支援し、登録されたITツールを販売・導入する事業者です。'],
    ['登録ツール', '事務局に登録され、補助の対象として認められたITツールです。'],
    ['交付決定', '補助金の交付が決まったことを示す通知です。決定の後に、契約・導入を始めます。'],
    ['実績報告', '導入が終わったことを証明して、補助金の支払いを求める手続きです。'],
    ['gBizID', '行政の電子申請などに使う共通のIDです。補助金では、プライムの取得が必要です。'],
    ['補助率', '補助対象の経費のうち、補助金で支払われる割合です。'],
  ]), { tone: 'ok' }));

  parts.push(fx.section('bg', 's-bg', 'この制度ができた背景と目的', `${fx.bgCards(cards)}
${fx.flow3(bg.flow, flowLabel)}
${fx.timeline(tl)}
      <h3 class="fx-h3">くわしく知る</h3>
${fx.accordion(bg.topics)}`, { tone: 'ok' }));

  parts.push(fx.section('view', 's-view', '当サイトの見方（解釈）', fx.viewBox(viewLead, viewItems), { tone: 'ok' }));

  parts.push(fx.section('fit', 's-fit', '向いている人・向かない人／近い制度との違い', `      <div class="fx-grid fx-grid--2">
${fx.markBox('ok', '向いている人', fit.fit.map((t) => [t]), { icon: '' })}
${fx.markBox('muted', '向かない人（別の制度を検討）', fit.notFit.map((t) => { const [a, b] = enSplit(t); return [a, b ? `→ ${b}` : '']; }), { icon: '' })}
      </div>
      <div class="fx-grid fx-grid--2 fx-diff">
${fit.diff.map(([h, t]) => `        <div class="fx-card fx-pad-m"><h3 class="fx-h3 fx-h3--in">${h}</h3><p>${t}</p></div>`).join('\n')}
      </div>
      <p class="fx-note-plain">どの制度が合うかは、事業の内容と、公募回ごとの要件で決まります。迷うときは、<a href="../hantei.html">AI補助金判定</a>や、<a href="../consult.html">無料相談</a>もご利用ください。</p>`, { tone: 'ok' }));

  // この記事のまとめ（もとは冒頭の「この記事の結論」）：本文の最後、最新情報の確認先の前に置く
  parts.push(fx.conclusion([
    ['「デジタル補助金」は、ITツール・AI導入を支援する補助金の総称です。', 'このサイトで使う呼び名です。代表例は、IT導入補助金です。'],
    ['ツールを買えば対象になるわけではありません。', '対象は、<strong>事務局に登録されたツール</strong>を、<strong>事業のために</strong>、<strong class="fx-em">交付決定の後で</strong>導入した場合に限られます。'],
    ['申請は、IT導入支援事業者と一緒に進めるのが一般的です。', 'gBizIDプライムなど、事前に用意するものがあります。'],
  ], '2026年度から、IT導入補助金は「デジタル化・AI導入補助金」の名称で案内されていると報じられています。名称・補助率・上限額・対象期間は年度や公募ごとに変わるため、最後は必ず公式の公募要領で確認してください。', 'この記事のまとめ', { first: false }));


  const link = (label) => { const m = label.match(/^(.*?)（(.*)）$/); return m ? [m[1], m[2]] : [label, '']; };
  const links = [
    ['https://it-shien.smrj.go.jp/', 'IT導入補助金の公式サイト（IT導入支援事業者・登録ツールの確認）'],
    ['https://mirasapo-plus.go.jp/', 'ミラサポplus（補助金の情報と公募要領）'],
    ['https://gbiz-id.go.jp/', 'gBizID（電子申請に使うID）'],
    ['https://www.jgrants-portal.go.jp/', 'jGrants（デジタル庁の補助金の電子申請・公募情報）'],
    ['https://www.chusho.meti.go.jp/', '中小企業庁（中小企業・小規模事業者の定義）'],
  ].map(([href, l]) => { const [a, b] = link(l); return [href, a, b, true]; });
  parts.push(fx.section('links', 's8', '最新情報の確認先', `      <p>制度の内容は変わります。申請の前に、次の公式情報で確認してください。</p>
${fx.linkList(links)}`, { tone: 'ok' }));

  parts.push(fx.relatedArticles(related));

  parts.push(`    <div class="fx-foot">
      <details class="fx-card fx-acc fx-acc--src">
        <summary><span class="fx-acc-t">出典（${bg.sources.length}件・確認日 ${slash(UPDATED)}）</span>${fx.ICON.chev}</summary>
        <div class="fx-acc-body">
          <ul>
${bg.sources.map(([label, url, pub]) => `            <li><a href="${url}" target="_blank" rel="noopener">${fx.esc(label)}</a>（${fx.esc(pub)}）</li>`).join('\n')}
          </ul>
        </div>
      </details>
      <p class="fx-disc">上の内容は、出典に書かれた公開情報の要約です。制度の最新の内容は、必ず公式の公募要領で確認してください。</p>
      <p class="fx-disc">最終更新日：${ja(UPDATED)}</p>
    </div>`);
  return parts.join('\n\n');
}

export function buildDigitalV2() {
  const inner = body();
  const page = `${crumb}

    <div class="fx-hero"><div class="pb-banner" style="background-image: url('../images/banner/b08.webp')"><h1 class="pb-title">${fx.esc(TITLE)}</h1></div></div>
    <div class="fx-lead">
      <p class="fx-meta"><span class="fx-chip">特集</span><span>公開 <time class="fx-pub" datetime="${PUBLISHED}">${slash(PUBLISHED)}</time> ・ 最終更新 <time datetime="${UPDATED}">${slash(UPDATED)}</time></span></p>
      <p class="lead">${fx.esc(LEAD)}</p>
    </div>

    <article class="fx" ${fx.LAYOUT_MARK}>
${inner}
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
  const html = withCases(shell({
    title: `${TITLE}｜補助金ネット`,
    description: 'ITツールやAIの導入に使える補助金の種類、対象になるもの・ならないもの、申請の流れ、よくある失敗を解説します。',
    canonicalPath: '/feature/digital-subsidy.html',
    body: page,
  }), 'feature/digital-subsidy.html');
  writeFileSync(join(OUT, 'digital-subsidy.html'), html);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) { buildDigitalV2(); console.log('特集「デジタル補助金とは？」を生成しました'); }
