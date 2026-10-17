// 「やりたいことから探す」の入口（public/hitsuyo.html）を生成する: node scripts/build-hitsuyo-page.mjs
// 構成：低めのヒーロー（イラスト）→ まず読みたい特集 → 分野ごとの棚（解説26本）→ 購入するものから調べる → 読み方の流れ → 次の一歩
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
};
const chips = PURCHASES.map((p) => `        <a class="hp-chip" href="${esc(HREF[p.id])}">${esc(p.label)}</a>`).join('\n');

const style = `
    .hp-hero { position: relative; background: #f5f1e9; overflow: hidden; width: 100vw; margin-left: calc(50% - 50vw); margin-top: 8px; }
    .hp-hero-in { position: relative; max-width: var(--max, 1100px); margin: 0 auto; padding: 22px var(--gutter, 24px) 0; display: grid; grid-template-columns: minmax(0, 1fr) 470px; gap: 28px; align-items: end; }
    .hp-hero-txt { padding-bottom: 26px; }
    .hp-script { margin: 0; font-size: 15px; line-height: 1.5; font-weight: 700; letter-spacing: 0.04em; color: #c9411a; }
    .hp-h1 { margin: 2px 0 8px; font-family: var(--font-display); font-size: 40px; line-height: 1.35; color: #0a2352; }
    .hp-h1 em { font-style: normal; color: #f8602f; }
    .hp-lead { margin: 0 0 14px; font-size: 14px; line-height: 1.8; max-width: 470px; }
    .hp-seg { display: inline-flex; background: #fff; border-radius: 999px; box-shadow: 0 2px 12px rgba(10, 35, 82, 0.06); padding: 4px; gap: 2px; }
    .hp-seg button { border: 0; background: transparent; border-radius: 999px; min-height: 40px; padding: 0 20px; font: inherit; font-size: 14px; font-weight: 500; color: #56667f; cursor: pointer; }
    .hp-seg button[aria-pressed="true"] { background: #073461; color: #fff; font-weight: 700; }
    .hp-hero svg { display: block; width: 100%; height: auto; }
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
      .hp-hero-in { grid-template-columns: minmax(0, 1fr); }
      .hp-hero svg { max-width: 520px; margin: 0 auto; }
      .hp-feats { grid-template-columns: minmax(0, 1fr); grid-template-rows: none; }
      .hp-feat, .hp-feat.big { grid-row: auto; min-height: 118px; }
      .hp-shelf { grid-template-columns: minmax(0, 1fr); }
      .hp-flow { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 22px; }
    }
    @media (max-width: 560px) { .hp-flow { grid-template-columns: minmax(0, 1fr); } .hp-h1 { font-size: 32px; } .hp-flow-card, .hp-cta { padding: 22px 18px; } }
`;

const svg = `<svg viewBox="0 0 520 220" role="img" aria-label="お店、パソコン、植物、歯車のイラスト">
          <polygon points="380,10 430,95 330,95" fill="#fce9dd"/>
          <polygon points="470,60 505,125 435,125" fill="#e4edf8"/>
          <polygon points="20,40 60,105 -20,105" fill="#e8f2ec"/>
          <path d="M0 205H520" stroke="#0a2352" stroke-width="2"/>
          <rect x="40" y="92" width="170" height="113" fill="#fff" stroke="#0a2352" stroke-width="2.5"/>
          <path d="M28 92 40 54H210L222 92Z" fill="#fff" stroke="#0a2352" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M40 54h28l-6 38H28ZM96 54h28l-2 38H90ZM152 54h28l2 38h-34Z" fill="#f8602f"/>
          <path d="M28 92 40 54H210L222 92Z" fill="none" stroke="#0a2352" stroke-width="2.5" stroke-linejoin="round"/>
          <rect x="60" y="116" width="52" height="89" fill="#fce9dd" stroke="#0a2352" stroke-width="2.5"/>
          <circle cx="102" cy="162" r="3" fill="#0a2352"/>
          <rect x="128" y="120" width="62" height="46" rx="3" fill="#e4edf8" stroke="#0a2352" stroke-width="2.5"/>
          <path d="M128 143h62M159 120v46" stroke="#0a2352" stroke-width="2"/>
          <rect x="132" y="176" width="54" height="20" rx="3" fill="#0a2352"/>
          <text x="159" y="191" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="Noto Sans JP,sans-serif">OPEN</text>
          <path d="M246 205v-70" stroke="#0a2352" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M246 160c-26-2-38-16-40-34 24 2 38 14 40 34ZM246 138c26-2 40-16 42-36-26 2-40 14-42 36ZM246 118c-16-6-24-18-22-34 16 6 24 18 22 34Z" fill="#2e7e4b" stroke="#0a2352" stroke-width="2.2" stroke-linejoin="round"/>
          <path d="M232 205l4-22h20l4 22Z" fill="#f8602f" stroke="#0a2352" stroke-width="2.5" stroke-linejoin="round"/>
          <rect x="318" y="120" width="120" height="76" rx="5" fill="#fff" stroke="#0a2352" stroke-width="2.5"/>
          <rect x="328" y="130" width="100" height="56" fill="#e4edf8"/>
          <path d="M338 172l16-18 14 12 18-26 22 32" fill="none" stroke="#2b65b1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M304 196h148l-8 9H312Z" fill="#fff" stroke="#0a2352" stroke-width="2.5" stroke-linejoin="round"/>
          <g transform="translate(476 150)">
            <circle r="22" fill="#fff" stroke="#0a2352" stroke-width="2.5"/>
            <circle r="8" fill="#fce9dd" stroke="#0a2352" stroke-width="2.5"/>
            <g stroke="#0a2352" stroke-width="6" stroke-linecap="round"><path d="M0-28v-6M0 28v6M-28 0h-6M28 0h6M-20-20l-4-4M20 20l4 4M-20 20l-4 4M20-20l4-4"/></g>
          </g>
        </svg>`;

const body = `    <nav class="area-crumb" aria-label="パンくず"><a href="./">補助金ネット</a> ＞ やりたいことから探す</nav>

    <section class="hp-hero" aria-labelledby="hp-h1">
      <div class="hp-hero-in">
        <div class="hp-hero-txt">
          <p class="hp-script">やりたいことから、見つかる。</p>
          <h1 class="hp-h1" id="hp-h1">${total}の「やりたいこと」を、<br><em>一冊の本のように。</em></h1>
          <p class="hp-lead">特集から読んでも、分野の棚から探してもOK。どの解説にも、検討したい制度・始める前の確認・契約の注意がそろっています。</p>
          <div class="hp-seg" role="group" aria-label="対象">
            <button type="button" data-aud="all" aria-pressed="true">すべて</button>
            <button type="button" data-aud="biz" aria-pressed="false">お店・会社</button>
            <button type="button" data-aud="per" aria-pressed="false">個人の住まい</button>
          </div>
        </div>
        ${svg}
      </div>
    </section>

    <section class="hp-block" aria-labelledby="hp-feat">
      <h2 class="hp-sec" id="hp-feat">まず読みたい、3つの特集</h2>
      <div class="hp-feats">
${features}
      </div>
    </section>

    <section class="hp-block" aria-labelledby="hp-shelf">
      <h2 class="hp-sec g" id="hp-shelf">分野の棚から、探す</h2>
      <div class="hp-shelves" id="hp-shelves">
${shelves}
      </div>
    </section>

    <section class="hp-block" aria-labelledby="hp-buy">
      <h2 class="hp-sec" id="hp-buy">購入するものから、かんたんに調べる</h2>
      <div class="hp-chips" role="group" aria-label="購入するもの">
${chips}
      </div>
    </section>

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
  title: 'やりたいことから探す｜設備・IT・住まい・人材・創業の補助金｜補助金ネット',
  description: '厨房機器、エアコン、ホームページ、AI、太陽光、採用、開業など、やりたいことから、関係しそうな補助金・助成金を探せます。検討したい制度、始める前の確認、契約・発注の注意を解説。',
  canonicalPath: '/hitsuyo.html',
  body,
}).replace('</style>', `${style}\n  </style>`);

// このページは public/ 直下にあるので、サブフォルダ用の共通部品の「../」を外す
writeFileSync(join(ROOT, 'hitsuyo.html'), html.replaceAll('"../', '"'));
console.log(`やりたいことから探す（入口）を生成：分野 ${CATEGORIES.filter((c) => c.ready).length}、解説 ${total} 本、購入するもの ${PURCHASES.length} 件`);
