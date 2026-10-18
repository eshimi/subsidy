// 「やりたいことから探す」の入口（public/hitsuyo.html）を生成する: node scripts/build-hitsuyo-page.mjs
// 構成：低めのヒーロー（イラスト）→ まず読みたい特集 → 分野ごとの棚（解説の本数は自動）→ 購入するものから調べる → 読み方の流れ → 次の一歩
// データは scripts/data/hitsuyo-articles.mjs（分野・解説）と scripts/data/purchases.mjs（購入するもの）。解説のページは build-hitsuyo-articles.mjs が生成する。
// 「お店・会社／個人の住まい」の切り替えは public/hitsuyo-index.js。
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PURCHASES } from './data/purchases.mjs';
import { esc, shell } from './lib/site-shell.mjs';
import { CATEGORIES, ARTICLES, BLURBS } from './data/hitsuyo-articles.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const TINT = { store: '#fce9dd', it: '#e4edf8', home: '#e8f2ec', people: '#eef1f5', startup: '#fdf3d8' };
const ICON = { store: '🏪', it: '💻', home: '🏠', people: '👥', startup: '🌱' };
// 個人の住まいに向く分野（切り替えで「個人の住まい」を選んだときに出す）
const AUD = { store: 'biz', it: 'biz', home: 'per', people: 'biz', startup: 'biz' };

const total = ARTICLES.length;

// 特集（バナーの画像を背景に。高さは低め）
const FEATURES = [
  { href: 'hitsuyo/startup-opening.html', k: '特集 1', t: '開業前に調べたい、補助金・融資・創業支援', d: '違いを知って、組み合わせる。開業前の支出は対象外になることが多い、その理由も。', img: 'b02', big: true },
  { href: 'hitsuyo/it-website.html', k: '特集 2', t: 'ホームページ制作に使える補助金', d: '頼む前に確認したいこと', img: 'b07' },
  { href: 'hitsuyo/people-training.html', k: '特集 3', t: '研修・リスキリングの助成金', d: '事業主向けと個人向けの違い', img: 'b16' },
];
const features = FEATURES.map((f) => `        <a class="hp-feat${f.big ? ' big' : ''}" href="${f.href}" style="background-image: url('images/banner/${f.img}.webp')"><span class="k">${f.k}</span><span class="t">${esc(f.t)}</span><span class="d">${esc(f.d)}</span>${f.big ? '<span class="go">読む <i aria-hidden="true">→</i></span>' : ''}</a>`).join('\n');

// 棚
const shelves = CATEGORIES.filter((c) => c.ready).map((c) => {
  const items = ARTICLES.filter((a) => a.cat === c.id);
  return `        <div class="hp-shelf" data-aud="${AUD[c.id]}" style="--tint: ${TINT[c.id]}">
          <div class="hp-shl"><span class="hp-ic" aria-hidden="true">${ICON[c.id]}</span><h3><a href="hitsuyo/${c.id}.html">${esc(c.label)}</a></h3><span class="n">${items.length}本の解説</span></div>
          <div class="hp-shr">
${items.map((a) => `            <a class="hp-mi" href="hitsuyo/${c.id}-${a.slug}.html"><b>${esc(a.label)}</b><small>${esc(BLURBS[`${c.id}-${a.slug}`] || '')}</small></a>`).join('\n')}
          </div>
        </div>`;
}).join('\n');

// 購入するもの → 解説のページ
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
  'online-shop': 'hitsuyo/it-ec.html',
  'security': 'hitsuyo/it-security.html',
  'signage': 'hitsuyo/store-signage.html',
};
const chips = PURCHASES.map((p) => `        <a class="hp-want" href="${esc(HREF[p.id])}"><span class="ic" aria-hidden="true">${p.icon}</span><span class="tx"><b>${esc(p.label)}</b><small>${esc(p.examples)}</small></span><span class="go" aria-hidden="true">→</span></a>`).join('\n');

const style = `
    .hp-seg { display: inline-flex; background: #fff; border-radius: 999px; box-shadow: 0 2px 12px rgba(10, 35, 82, 0.06); padding: 4px; gap: 2px; }
    .hp-seg button { border: 0; background: transparent; border-radius: 999px; min-height: 40px; padding: 0 20px; font: inherit; font-size: 14px; font-weight: 500; color: #56667f; cursor: pointer; }
    .hp-seg button[aria-pressed="true"] { background: #073461; color: #fff; font-weight: 700; }
    .hp-block .hp-seg { margin-top: 12px; }
    .page-split { margin-top: 12px; }
    .page-side .hp-side-h { margin: 0 0 12px; font-family: var(--font-display); font-size: 17px; line-height: 1.5; color: #0a2352; }
    .page-side .hp-feats { margin-top: 0; grid-template-columns: minmax(0, 1fr); grid-template-rows: none; gap: 12px; }
    .page-side .hp-feat, .page-side .hp-feat.big { grid-row: auto; min-height: 118px; padding: 12px 14px; }
    .page-side .hp-feat.big .t { font-size: 17px; }
    .page-side a.hp-feat { border-bottom: 0; color: #fff; font-size: inherit; }
    .hp-sec { margin: 0; font-family: var(--font-display); font-size: 24px; line-height: 34px; font-weight: 700; color: #0a2352; display: flex; align-items: center; gap: 12px; }
    .hp-sec::before { content: ""; width: 5px; height: 1.2em; border-radius: 3px; background: #f8602f; }
    .hp-sec.g::before { background: #2e7e4b; }
    .hp-block { margin-top: 36px; }
    .hp-feats { margin-top: 18px; display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); grid-template-rows: 118px 118px; gap: 16px; }
    .hp-feat { position: relative; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; border-radius: 12px; padding: 14px 18px; color: #fff; text-decoration: none; background-size: cover; background-position: center; box-shadow: 0 2px 12px rgba(10, 35, 82, 0.12); }
    .hp-feat::before { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10, 35, 82, 0.05) 10%, rgba(10, 35, 82, 0.86) 100%); }
    .hp-feat > * { position: relative; }
    .hp-feat.big { grid-row: 1 / 3; padding: 20px 24px; }
    .hp-feat:hover { box-shadow: 0 8px 28px rgba(10, 35, 82, 0.28); }
    .hp-feat .k { align-self: flex-start; background: #f8602f; color: #fff; font-size: 12px; line-height: 16px; font-weight: 700; padding: 2px 8px; border-radius: 4px; margin-bottom: 6px; }
    .hp-feat .t { font-family: var(--font-display); font-size: 17px; line-height: 1.45; font-weight: 700; }
    .hp-feat.big .t { font-size: 24px; }
    .hp-feat .d { font-size: 12px; opacity: 0.95; line-height: 1.6; }
    .hp-feat.big .d { font-size: 13px; margin-top: 4px; }
    .hp-feat .go { margin-top: 6px; font-weight: 700; font-size: 14px; }
    .hp-feat .go i { font-style: normal; display: inline-block; transition: transform 0.15s; }
    .hp-feat:hover .go i { transform: translateX(3px); }
    .hp-shelves { margin-top: 18px; display: flex; flex-direction: column; gap: 18px; }
    .hp-shelf { display: grid; grid-template-columns: 190px minmax(0, 1fr); overflow: hidden; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(10, 35, 82, 0.06); }
    .hp-shelf[hidden] { display: none; }
    .hp-shl { padding: 20px 18px; display: flex; flex-direction: column; gap: 6px; justify-content: center; background: var(--tint); }
    .hp-ic { font-size: 1.8rem; line-height: 1; }
    .hp-shl h3 { margin: 0; font-family: var(--font-display); font-size: 19px; line-height: 1.4; color: #0a2352; }
    .hp-shl h3 a { color: inherit; text-decoration: none; }
    .hp-shl h3 a:hover { color: #c9411a; }
    .hp-shl .n { font-size: 12px; color: #56667f; }
    .hp-shr { padding: 16px; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
    .hp-mi { display: flex; flex-direction: column; gap: 4px; padding: 12px 14px; border-radius: 8px; background: #f7f6f3; text-decoration: none; color: inherit; min-height: 78px; box-sizing: border-box; }
    .hp-mi:hover { background: #fff; box-shadow: 0 2px 12px rgba(10, 35, 82, 0.12); }
    .hp-mi b { font-size: 14px; line-height: 21px; color: #0a2352; }
    .hp-mi:hover b { color: #c9411a; }
    .hp-mi small { font-size: 12px; color: #56667f; line-height: 1.6; }
    .hp-two { margin-top: 8px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    .hp-door { display: flex; align-items: center; gap: 16px; padding: 18px 22px; border-radius: 12px; background: #fff; box-shadow: 0 2px 12px rgba(10, 35, 82, 0.08); text-decoration: none; color: inherit; border-top: 5px solid #f8602f; }
    .hp-door.w { border-top-color: #2b65b1; }
    .hp-door:hover { box-shadow: 0 8px 24px rgba(10, 35, 82, 0.16); }
    .hp-door .ic { flex: none; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; background: #fce9dd; }
    .hp-door.w .ic { background: #e4edf8; }
    .hp-door b { display: block; font-family: var(--font-display); font-size: 20px; line-height: 1.4; color: #0a2352; }
    .hp-door small { display: block; font-size: 13px; line-height: 1.6; color: #56667f; }
    .hp-door .go { margin-left: auto; flex: none; font-weight: 700; color: #c9411a; white-space: nowrap; }
    .hp-sec.w::before { background: #2b65b1; }
    .hp-sub { margin: 4px 0 0; color: #56667f; font-size: 14px; }
    .hp-buyband { position: relative; width: 100vw; margin: 40px 0 0 calc(50% - 50vw); background: #e4edf8; padding: 34px 0 38px; }
    .hp-buyband-in { max-width: var(--max, 1100px); margin: 0 auto; padding: 0 var(--gutter, 24px); }
    .hp-buyband .hp-sec { font-size: 28px; line-height: 40px; }
    .hp-buyband .hp-sub { font-size: 15px; }
    .hp-wants { margin-top: 20px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
    .hp-want { position: relative; display: flex; align-items: center; gap: 14px; min-height: 96px; box-sizing: border-box; padding: 14px 44px 14px 16px; border-radius: 12px; background: #fff; box-shadow: 0 2px 10px rgba(10, 35, 82, 0.1); text-decoration: none; color: inherit; border-bottom: 3px solid #2b65b1; transition: transform 0.15s, box-shadow 0.15s; }
    .hp-want:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(10, 35, 82, 0.2); }
    .hp-want .ic { flex: none; width: 56px; height: 56px; border-radius: 12px; background: #e4edf8; display: flex; align-items: center; justify-content: center; font-size: 1.9rem; line-height: 1; }
    .hp-want .tx { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
    .hp-want b { font-size: 15px; line-height: 22px; color: #0a2352; }
    .hp-want:hover b { color: #c9411a; }
    .hp-want small { font-size: 12px; line-height: 1.6; color: #56667f; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .hp-want .go { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); width: 26px; height: 26px; border-radius: 50%; background: #073461; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }
    .hp-chips { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 10px; }
    .hp-chip { display: inline-flex; align-items: center; min-height: 44px; box-sizing: border-box; padding: 6px 18px; border-radius: 999px; background: #fff; box-shadow: 0 2px 12px rgba(10, 35, 82, 0.08); font-weight: 500; color: #0a2352; text-decoration: none; }
    .hp-chip:hover { color: #c9411a; }
    .hp-flow-card { margin-top: 36px; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(10, 35, 82, 0.06); padding: 30px 36px; }
    .hp-flow-card h2 { margin: 0 0 4px; font-family: var(--font-display); font-size: 22px; line-height: 32px; color: #0a2352; }
    .hp-flow-card > p { margin: 0 0 24px; color: #56667f; }
    .hp-flow { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .hp-fs { position: relative; padding-right: 18px; }
    .hp-fn { width: 42px; height: 42px; border-radius: 50%; background: #073461; color: #fff; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 19px; font-weight: 700; position: relative; z-index: 1; }
    .hp-fs::before { content: ""; position: absolute; left: 42px; right: 0; top: 20px; height: 2px; background: repeating-linear-gradient(90deg, #9cb2d0 0 6px, transparent 6px 12px); }
    .hp-fs:last-child::before { display: none; }
    .hp-fs h3 { margin: 10px 0 2px; font-size: 16px; color: #0a2352; }
    .hp-fs p { margin: 0; font-size: 13px; }
    .hp-cta { margin-top: 36px; background: #073461; border-radius: 12px; padding: 28px 36px; display: flex; gap: 24px; align-items: center; justify-content: space-between; flex-wrap: wrap; color: #fff; }
    .hp-cta h2 { margin: 0 0 4px; font-family: var(--font-display); font-size: 22px; line-height: 32px; }
    .hp-cta p { margin: 0; font-size: 14px; opacity: 0.92; max-width: 620px; }
    .hp-cta .btns { display: flex; gap: 12px; flex-wrap: wrap; }
    .hp-cta a { min-height: 46px; display: inline-flex; align-items: center; padding: 0 22px; border-radius: 8px; font-size: 15px; font-weight: 700; text-decoration: none; }
    .hp-cta a.solid { background: #fff; color: #073461; }
    .hp-cta a.line { color: #fff; box-shadow: inset 0 0 0 1.5px #fff; }
    @media (max-width: 980px) {
      .hp-feats { grid-template-columns: minmax(0, 1fr); grid-template-rows: none; }
      .hp-feat, .hp-feat.big { grid-row: auto; min-height: 118px; }
      .hp-shelf { grid-template-columns: minmax(0, 1fr); }
      .hp-two { grid-template-columns: minmax(0, 1fr); }
      .hp-wants { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .hp-flow { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 22px; }
    }
    @media (max-width: 560px) { .hp-wants { grid-template-columns: minmax(0, 1fr); } .hp-flow { grid-template-columns: minmax(0, 1fr); } .hp-h1 { font-size: 32px; } .hp-flow-card, .hp-cta { padding: 22px 18px; } }
`;


const body = `    <nav class="area-crumb" aria-label="パンくず"><a href="./">補助金ネット</a> ＞ やりたいことから探す</nav>

    <section class="lp-hero" aria-labelledby="hp-h1" style="background-color: #faf7f1">
      <img class="lp-pic" src="images/lp/lp-growth.webp" alt="" width="500" height="190" loading="lazy">
      <div class="lp-in">
        <p class="lp-k">やりたいこと・ほしいもの</p>
        <div class="pb-banner" style="background-image: url('images/banner/b02.webp')"><h1 class="pb-title" id="hp-h1">補助金は、やりたいこと・ほしいものから探す</h1></div>
        <p class="lp-s">制度の名前は知らなくて大丈夫。やりたいことからも、買いたいものからも探せます。どの解説にも、検討したい制度・始める前の確認・契約の注意がそろっています。</p>
        <div class="lp-btns"><a class="lp-btn p" href="#hp-want">やりたいことから探す <span aria-hidden="true">→</span></a><a class="lp-btn s" href="#hp-buy">ほしいものから探す</a></div>
      </div>
    </section>

    <div class="page-split"><div class="page-main">
    <section class="hp-block" aria-labelledby="hp-want">
      <h2 class="hp-sec" id="hp-want">やりたいことから探す</h2>
      <p class="hp-sub">分野の棚から探せます。右の特集から読んでもOK。</p>
      <div class="hp-seg" role="group" aria-label="対象">
        <button type="button" data-aud="all" aria-pressed="true">すべて</button>
        <button type="button" data-aud="biz" aria-pressed="false">お店・会社</button>
        <button type="button" data-aud="per" aria-pressed="false">個人の住まい</button>
      </div>
    </section>

    <section class="hp-block" aria-labelledby="hp-shelf">
      <h2 class="hp-sec g" id="hp-shelf">分野の棚から、探す</h2>
      <div class="hp-shelves" id="hp-shelves">
${shelves}
      </div>
    </section>

    </div><aside class="page-side" aria-label="まず読みたい特集">
      <h2 class="hp-side-h" id="hp-feat">まず読みたい、3つの特集</h2>
      <div class="hp-feats">
${features}
      </div>
    </aside></div>

    <section class="hp-buyband" aria-labelledby="hp-buy"><div class="hp-buyband-in">
      <h2 class="hp-sec w" id="hp-buy">ほしいものから探す</h2>
      <p class="hp-sub">買うものを選ぶと、使えそうな制度・購入前の確認・契約の注意がわかります。</p>
      <div class="hp-wants" role="group" aria-label="ほしいもの">
${chips}
      </div>
    </div></section>

    <section class="hp-flow-card" aria-labelledby="hp-flow">
      <h2 id="hp-flow">どの解説も、同じ順番で読めます。</h2>
      <p>読み終わったら、あとは公式の募集要領で確認して、準備するだけ。</p>
      <div class="hp-flow">
        <div class="hp-fs"><div class="hp-fn">1</div><h3>結論</h3><p>何の取り組みなら、補助の対象になりやすいか。</p></div>
        <div class="hp-fs"><div class="hp-fn">2</div><h3>検討したい制度</h3><p>国と自治体の制度を、向く場面つきの表で。</p></div>
        <div class="hp-fs"><div class="hp-fn">3</div><h3>始める前の確認</h3><p>見積書、対象経費、申請の準備など。</p></div>
        <div class="hp-fs"><div class="hp-fn" style="background: #c9411a">!</div><h3 style="color: #9a3412">契約・発注の注意</h3><p>交付決定の前に、発注・契約をしない。</p></div>
      </div>
    </section>

    <section class="hp-cta" aria-labelledby="hp-cta">
      <div>
        <h2 id="hp-cta">迷ったら、条件から調べましょう。</h2>
        <p>いくつかの質問に答えると、使えそうな補助金の候補が出ます。専門家への無料相談もあります。</p>
      </div>
      <div class="btns">
        <a class="solid" href="hantei.html">AI補助金判定へ</a>
        <a class="line" href="consult.html">無料で相談する</a>
      </div>
    </section>

    <p class="area-note">掲載の金額・補助率・対象は目安です。制度は年度や公募回で変わるため、申請や契約の前に必ず公式の公募要領で確認してください。募集中の補助金は jGrants（デジタル庁）の公開データをもとに毎日更新しています。</p>
    <script src="hitsuyo-index.js" defer></script>`;

const html = shell({
  title: 'やりたいこと・ほしいものから探す｜設備・IT・住まい・人材・創業の補助金｜補助金ネット',
  description: '厨房機器、エアコン、ホームページ、AI、太陽光、採用、開業など、やりたいことからも、ほしいもの（購入するもの）からも、関係しそうな補助金・助成金を探せます。検討したい制度、始める前の確認、契約・発注の注意を解説。',
  canonicalPath: '/hitsuyo.html',
  body,
}).replace('</style>', `${style}\n  </style>`);

// このページは public/ 直下にあるので、サブフォルダ用の共通部品の「../」を外す
writeFileSync(join(ROOT, 'hitsuyo.html'), html.replaceAll('"../', '"'));
console.log(`やりたいことから探す（入口）を生成：分野 ${CATEGORIES.filter((c) => c.ready).length}、解説 ${total} 本、購入するもの ${PURCHASES.length} 件`);
