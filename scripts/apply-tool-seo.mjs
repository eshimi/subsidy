// 検索（search.html）とAI補助金判定（hantei.html）に、よくある質問（画面に見える形）と、構造化データ（FAQPage、Dataset）を入れる。
// 何度実行しても同じ結果。使い方：node scripts/apply-tool-seo.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const SITE = 'https://hojyokin.net';
const stripTags = (h) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export const PAGES = {
  'search.html': {
    heading: '補助金の検索のよくある質問',
    faq: [
      ['どんな補助金を検索できますか？', '国（jGrants）で募集中の補助金・助成金と、都道府県・市区町村の独自制度、個人向けの制度、解説ページを、まとめて検索できます。事業者向け・個人向けは、切り替えて絞り込めます。'],
      ['地域や締切で、絞り込めますか？', 'はい。キーワードに「東京」などの地域名を入れるか、都道府県を選ぶと、その地域の制度を優先して表示します。「条件を追加」から郵便番号を入れると、お住まいの地域に合わせます。締切は、30日以内・90日以内で絞り込めます。'],
      ['「ひらがな」で検索しても、見つかりますか？', 'はい。「こそだて」のようなひらがなの読みや、全角・半角のちがいは、同じ言葉として検索します。'],
      ['掲載している情報は、どのくらいの頻度で更新されますか？', '国の募集中の制度は、デジタル庁のjGrantsのデータをもとに、毎日自動で更新しています。自治体の制度は、公開情報をもとに、順次追加・確認しています。金額や締切は、必ず公式の案内で確認してください。'],
    ],
    dataset: {
      name: '補助金・助成金の募集情報（補助金ネット）',
      description: '国の補助金・助成金の募集情報（jGrants）に、都道府県・市区町村の独自制度、個人向けの制度、解説ページを加えて、検索用に整理したデータ。毎日更新。',
      url: `${SITE}/search.html`,
      distribution: `${SITE}/grants/search.json`,
    },
  },
  'hantei.html': {
    heading: 'AI補助金判定のよくある質問',
    faq: [
      ['AI補助金判定とは、何ですか？', 'いくつかの質問（地域、業種、やりたいこと、規模など）に答えると、使えそうな補助金・助成金の候補を表示するサービスです。事業者向けと、個人向けがあります。'],
      ['料金は、かかりますか？', '判定は、無料で利用できます。結果を見て、専門家に相談したい場合は、無料相談のお申し込みもできます。'],
      ['判定の結果は、必ず受給できるという意味ですか？', 'いいえ。判定は参考情報で、採択や受給を保証するものではありません。対象になるかは、各制度の公募要領で、必ず確認してください。'],
      ['入力した内容は、どう扱われますか？', '入力した内容は、判定のために使います。扱いの詳細は、プライバシーポリシーをご覧ください。'],
    ],
  },
};

const RE_HEAD = /\n?[ \t]*<!-- toolseo:start -->[\s\S]*?<!-- toolseo:end -->/;
const RE_BODY = /[ \t]*<!-- toolfaq:start -->[\s\S]*?<!-- toolfaq:end -->\n/;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function applyToolSeo(html, name) {
  const def = PAGES[name];
  if (!def) return html;
  let out = html.replace(RE_HEAD, '').replace(RE_BODY, '');
  const graph = [{ '@type': 'FAQPage', mainEntity: def.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: stripTags(a) } })) }];
  if (def.dataset) {
    graph.push({
      '@type': 'Dataset', name: def.dataset.name, description: def.dataset.description, url: def.dataset.url, inLanguage: 'ja',
      creator: { '@type': 'Organization', name: '補助金ネット', url: `${SITE}/` },
      isBasedOn: 'https://www.jgrants-portal.go.jp/',
      distribution: [{ '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: def.dataset.distribution }],
    });
  }
  const ld = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`;
  out = out.replace('</head>', `  <!-- toolseo:start -->\n  ${ld}\n  <!-- toolseo:end -->\n</head>`);
  const faqHtml = `    <!-- toolfaq:start -->
    <section class="tool-faq" aria-labelledby="tool-faq-title">
      <h2 id="tool-faq-title">${esc(def.heading)}</h2>
${def.faq.map(([q, a]) => `      <h3>Q. ${q}</h3>\n      <p>A. ${a}</p>`).join('\n')}
    </section>
    <!-- toolfaq:end -->
`;
  // 画面の最後の注意書き（area-note）の前に置く
  const m = /^[ \t]*<p class="area-note"/m.exec(out);
  return m ? `${out.slice(0, m.index)}${faqHtml}${out.slice(m.index)}` : out.replace('  </main>', `${faqHtml}  </main>`);
}

export function run() {
  let n = 0;
  for (const name of Object.keys(PAGES)) {
    const p = join(ROOT, name);
    const before = readFileSync(p, 'utf-8');
    const after = applyToolSeo(before, name);
    if (after !== before) { writeFileSync(p, after); n++; }
  }
  return n;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(`検索・判定ページのFAQと構造化データを更新：${run()}ページ`);
