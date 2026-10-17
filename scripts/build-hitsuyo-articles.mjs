// 「やりたいことから探す」のカテゴリのページと、個別の解説（public/hitsuyo/）を生成する: node scripts/build-hitsuyo-articles.mjs
// データは scripts/data/hitsuyo-articles.mjs。入口（public/hitsuyo.html）は build-hitsuyo-page.mjs。
// 募集中の補助金の一覧は、ブラウザで grants/search.json から目的（purposes）で絞り込む（public/hitsuyo-open.js）。
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { P, UL, OL, TABLE, articleBody, writeArticle } from './lib/article.mjs';
import { kit, openBlock } from './lib/hitsuyo-kit.mjs';
import { SECTIONS as STORE } from './data/hitsuyo/store.mjs';
import { SECTIONS as IT } from './data/hitsuyo/it.mjs';
import { SECTIONS as HOME } from './data/hitsuyo/home.mjs';
import { SECTIONS as PEOPLE } from './data/hitsuyo/people.mjs';
import { SECTIONS as STARTUP } from './data/hitsuyo/startup.mjs';
import { SECTIONS as EXTRA } from './data/hitsuyo/extra.mjs';
import { esc } from './lib/site-shell.mjs';
import { CATEGORIES, ARTICLES, UPDATED } from './data/hitsuyo-articles.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const OUT = join(ROOT, 'hitsuyo');
const SECTION = ['../hitsuyo.html', 'やりたいことから探す'];
const NOTE = '金額・補助率・対象経費は、制度・枠・公募回ごとに決まり、変わります。ここでは考え方と調べ方を説明します。申請や契約の前に、必ず公式の公募要領で確認してください。補助金の採択や受給を保証するものではありません。';

const EX = EXTRA(kit);
const SECTIONS_BY_CAT = { store: { ...STORE(kit), ...EX.store }, it: { ...IT(kit), ...EX.it }, home: HOME(kit), people: { ...PEOPLE(kit), ...EX.people }, startup: STARTUP(kit) };

// カテゴリのページ
function categoryPage(cat) {
  const items = ARTICLES.filter((a) => a.cat === cat.id);
  const cards = items.map((a) => `          <li><a href="${cat.id}-${a.slug}.html"><span class="hp-ic" aria-hidden="true">${a.icon}</span><b>${esc(a.label)}</b><small>${esc(a.title)}</small></a></li>`).join('\n');
  const soon = cat.soon?.length ? P(`これから追加する予定の解説：${cat.soon.map(esc).join('、')}。`) : '';
  return articleBody({
    section: SECTION, kicker: cat.label, banner: cat.banner, title: `${cat.label}の補助金｜やりたいことから探す`, lead: cat.lead, updated: UPDATED,
    sections: [
      ['取り組みの内容から調べる', [
        P(`${esc(cat.examples)}。取り組む内容を選ぶと、検討したい制度、購入前の確認事項、契約・発注の注意をまとめた解説に進めます。`),
        `        <ul class="hp-cards">\n${cards}\n        </ul>`,
        soon,
      ].join('\n')],
      ['この分野でよく使われる制度', [
        TABLE(['制度', '向く場面', 'くわしい解説'], cat.national.map(([name, use, href, label]) => [name, use, `<a href="${href}">${label}</a>`])),
        P(NOTE),
      ].join('\n')],
      [cat.basicsHeading, [
        OL(cat.basics),
        P('くわしくは、<a href="../basics/documents.html">補助金の申請に必要な書類</a>、<a href="../columns/subsidy-paid-after.html">補助金は後払いの仕組み</a>をご覧ください。'),
      ].join('\n')],
      ['いま募集中の補助金（この分野に関係しそうなもの）', [
        P('jGrants（デジタル庁）の公開データから、この分野に関係しそうな、募集中の補助金を表示します（締切が近い順）。'),
        openBlock(cat.purposes),
      ].join('\n')],
      ['自治体の制度も確認する', [
        P('<strong>市区町村・都道府県の独自の補助</strong>がある場合があります。国の制度と併用できるものもあります。<a href="../area/index.html">地図から都道府県を選んで</a>、制度を確認してください。'),
      ].join('\n')],
    ],
    sources: [['中小企業庁', 'https://www.chusho.meti.go.jp/'], ['jGrants（デジタル庁）', 'https://www.jgrants-portal.go.jp/'], ['ミラサポplus（中小企業向けの補助金・支援の情報）', 'https://mirasapo-plus.go.jp/']],
    related: [['../hitsuyo.html', '必要なものから探す'], ...items.map((a) => [`${cat.id}-${a.slug}.html`, a.label + 'の補助金']), ['../feature/index.html', '主な補助金の特集'], ['../hantei.html', 'AI補助金判定'], ['../area/index.html', '地域別の補助金'], ['../consult.html', '無料相談']],
  });
}

const withScript = (body) => `${body}\n    <script src="../hitsuyo-open.js" defer></script>`;

for (const cat of CATEGORIES.filter((c) => c.ready)) {
  const items = ARTICLES.filter((a) => a.cat === cat.id);
  writeArticle(OUT, 'hitsuyo', `${cat.id}.html`, {
    title: `${cat.label}の補助金｜やりたいことから探す`,
    description: `${cat.examples}など、${cat.label}の取り組みから、関係しそうな補助金・助成金、始める前の確認事項、契約・申請の注意を調べられます。`,
    body: withScript(categoryPage(cat)),
  });
  for (const a of items) {
    writeArticle(OUT, 'hitsuyo', `${cat.id}-${a.slug}.html`, {
      title: a.title, description: a.summary,
      body: withScript(articleBody({ ...a, section: SECTION, kicker: a.kicker, sections: SECTIONS_BY_CAT[cat.id][a.slug](), updated: UPDATED, sourcesHeading: '最新情報の確認先（公式）',
        related: [['../hitsuyo.html', '必要なものから探す'], [`${cat.id}.html`, `${cat.label}の補助金`], ...a.related.filter(([h]) => !['../hitsuyo.html', `${cat.id}.html`].includes(h))] })),
    });
  }
}
console.log(`やりたいことから探す：カテゴリ ${CATEGORIES.filter((c) => c.ready).length}、個別の解説 ${ARTICLES.length} 本を生成`);
