// 「必要なものから探す」（public/hitsuyo.html）を生成する: node scripts/build-hitsuyo-page.mjs
// データは scripts/data/purchases.mjs。各購入物は、解説のページ（public/hitsuyo/、build-hitsuyo-articles.mjs が生成）へのリンク。
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PURCHASES } from './data/purchases.mjs';
import { esc, shell } from './lib/site-shell.mjs';
import { bannerFor } from './lib/banners.mjs';
import { CATEGORIES } from './data/hitsuyo-articles.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

// カテゴリ（やりたいことから探す）。解説のあるカテゴリはリンク、準備中のものは名前だけ
const cats = CATEGORIES.map((c) => c.ready
  ? `        <li><a href="hitsuyo/${esc(c.id)}.html"><span class="hp-ic" aria-hidden="true">${c.icon}</span><b>${esc(c.label)}</b><small>${esc(c.examples)}</small><em>解説を見る →</em></a></li>`
  : `        <li><span><span class="hp-ic" aria-hidden="true">${c.icon}</span><b>${esc(c.label)}</b><small>${esc(c.examples)}</small><em>準備中</em></span></li>`).join('\n');

// 購入するもの → 解説のページ（hitsuyo/）。ボタンではなく、リンクにする
const HREF = {
  'ai-software': 'hitsuyo/it-ai.html',
  'pos-register': 'hitsuyo/store-pos.html',
  'store-renovation': 'hitsuyo/store-renovation.html',
  'pc-equipment': 'hitsuyo/it-pc.html',
  'machine-equipment': 'hitsuyo/store-machine.html',
  'energy-saving': 'hitsuyo/store-energy.html',
  'website-ads': 'hitsuyo/it-website.html',
  'training-hiring': 'hitsuyo/people-training.html',
  'succession-buyout': 'hitsuyo/startup-succession.html',
};
const chips = PURCHASES.map((p) => `        <a class="kp-chip" href="${esc(HREF[p.id])}"><span aria-hidden="true">${p.icon}</span>${esc(p.label)}</a>`).join('\n');

const style = `
    .kp-chips { display: flex; flex-wrap: wrap; gap: 10px; margin: 0 0 18px; }
    .kp-chip { text-decoration: none; display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1.5px solid #e6e8ec; border-radius: 999px; background: #fff; font: inherit; font-weight: 600; color: #1f3353; cursor: pointer; }
    .kp-chip:hover { border-color: #073461; }
    .kp-chip[aria-pressed="true"] { border-color: #073461; background: #eef5ff; box-shadow: 0 0 0 3px rgba(21, 101, 216, 0.12); }
    .kp-h3 { font-size: 1.02rem; margin: 22px 0 10px; padding-left: 10px; border-left: 4px solid #073461; }
    .kp-next { margin-top: 18px; display: flex; flex-wrap: wrap; gap: 10px; }
    .kp-next a { padding: 10px 18px; border-radius: 999px; background: #073461; color: #fff; font-weight: 700; text-decoration: none; }
    .kp-next a.ghost { background: #fff; color: #073461; border: 1px solid #9cc0ee; }
    .kp-hint { margin: 0 0 18px; color: var(--mute); font-size: 0.92rem; }

`;

const body = `    <nav class="area-crumb" aria-label="パンくず"><a href="./">補助金ネット</a> ＞ 必要なものから探す</nav>
    <div class="pb-banner" style="background-image: url('images/banner/${bannerFor('hitsuyo.html')}.webp')"><h1 class="pb-title">必要なもの、補助金で変わるかも。</h1></div>
    <div style="margin-bottom: 1.5rem;">
      <p class="lead" style="margin-bottom: 0;">「POSレジが必要」「店舗を改装したい」など、必要な買い物や投資の内容から、関係しそうな補助金を探せます。制度名がわからなくても使えます。</p>
    </div>

    <section aria-labelledby="kp-cats">
      <h2 id="kp-cats" class="kp-h3" style="margin-top: 0;">やりたいことのカテゴリから探す</h2>
      <ul class="hp-cats">
${cats}
      </ul>
    </section>

    <section aria-labelledby="kp-pick">
      <h2 id="kp-pick" class="kp-h3" style="margin-top: 0;">購入するものから、かんたんに調べる</h2>
      <p class="kp-hint">買うものを選ぶと、検討したい制度・始める前の確認・契約の注意をまとめた解説に進めます。</p>
      <div class="kp-chips" role="group" aria-label="購入するもの">
${chips}
      </div>
      <div class="kp-next">
        <a href="hantei.html">AI補助金判定で、条件から調べる</a>
        <a class="ghost" href="consult.html">専門家に無料で相談する</a>
        <a class="ghost" href="search.html">募集中の補助金をすべて探す</a>
      </div>
    </section>

    <p class="area-note">掲載の金額・補助率・対象は目安です。制度は年度や公募回で変わるため、申請や契約の前に必ず公式の公募要領で確認してください。募集中の補助金は jGrants（デジタル庁）の公開データをもとに毎日更新しています。</p>`;

const html = shell({
  title: '補助金で買えるもの｜ホームページ・店舗改装・POS・PCから補助金を探す｜補助金ネット',
  description: 'POSレジ、店舗の改装、業務用PC、AIツールなど、買い物や投資の内容から関係しそうな補助金を探せます。購入前の確認事項や、契約・発注の注意も表示します。',
  canonicalPath: '/hitsuyo.html',
  body: body,
}).replace('</style>', `${style}\n  </style>`);

// このページは public/ 直下にあるので、サブフォルダ用の共通部品の「../」を外す
writeFileSync(join(ROOT, 'hitsuyo.html'), html.replaceAll('"../', '"'));
console.log(`必要なものから探すページを生成：${PURCHASES.length} 件`);
