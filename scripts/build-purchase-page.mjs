// 「買いたいものから探す」（public/kaimono.html）を生成する: node scripts/build-purchase-page.mjs
// データは scripts/data/purchases.mjs。募集中の補助金は、実行時に grants/search.json から目的（purposes）で絞り込む（public/kaimono.js）。
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PURCHASES } from './data/purchases.mjs';
import { esc, shell } from './lib/site-shell.mjs';
import { bannerFor } from './lib/banners.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const chips = PURCHASES.map((p) => `        <button type="button" class="kp-chip" data-id="${esc(p.id)}" data-purposes="${esc(p.purposes.join(' '))}" aria-pressed="false"><span aria-hidden="true">${p.icon}</span>${esc(p.label)}</button>`).join('\n');

const panels = PURCHASES.map((p) => `      <div class="kp-panel" id="kp-${esc(p.id)}" data-id="${esc(p.id)}" hidden>
        <h2 class="kp-h">${esc(p.label)}</h2>
        <p class="kp-ex">対象になりそうなもの：${esc(p.examples)}</p>
        <h3 class="kp-h3">関係しそうな国の制度</h3>
        <ul class="kp-cards">
${p.national.map((n) => `          <li><a href="${esc(n.href)}"><b>${esc(n.name)}</b><span class="kp-max">上限の目安：${esc(n.max)}</span><span class="kp-note">${esc(n.note)}</span></a></li>`).join('\n')}
        </ul>
        <div class="kp-open" data-open>
          <h3 class="kp-h3">募集中の補助金（この買い物に関係しそうなもの）</h3>
          <p class="kp-loading">読み込み中…</p>
        </div>
        <h3 class="kp-h3">購入の前に確認すること</h3>
        <ul class="kp-checks">
${p.checks.map((c) => `          <li>${esc(c)}</li>`).join('\n')}
        </ul>
        <div class="kp-warn" role="note"><b>⚠ 契約・発注の注意</b><p>${esc(p.warning)}</p></div>
      </div>`).join('\n');

const style = `
    .kp-chips { display: flex; flex-wrap: wrap; gap: 10px; margin: 0 0 18px; }
    .kp-chip { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1.5px solid #cfdcea; border-radius: 999px; background: #fff; font: inherit; font-weight: 600; color: #1d2a3a; cursor: pointer; }
    .kp-chip:hover { border-color: #1565d8; }
    .kp-chip[aria-pressed="true"] { border-color: #1565d8; background: #eef5ff; box-shadow: 0 0 0 3px rgba(21, 101, 216, 0.12); }
    .kp-amount { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin: 0 0 22px; }
    .kp-amount input { width: 180px; padding: 10px 12px; border: 1.5px solid #cfdcea; border-radius: 10px; font: inherit; }
    .kp-panel { background: #fff; border: 1px solid #dbe6f2; border-radius: 16px; padding: 26px 30px; box-shadow: 0 4px 18px rgba(29, 42, 58, 0.05); }
    .kp-h { font-size: 1.3rem; margin: 0 0 6px; }
    .kp-h3 { font-size: 1.02rem; margin: 22px 0 10px; padding-left: 10px; border-left: 4px solid #1565d8; }
    .kp-ex { margin: 0 0 4px; color: var(--mute); font-size: 0.92rem; }
    .kp-cards { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
    .kp-cards a { display: grid; gap: 4px; padding: 14px 16px; border: 1px solid #dbe6f2; border-radius: 12px; text-decoration: none; color: inherit; }
    .kp-cards a:hover { border-color: #1565d8; }
    .kp-cards b { color: #1565d8; }
    .kp-max { font-weight: 600; font-size: 0.9rem; }
    .kp-note { font-size: 0.88rem; color: var(--mute); }
    .kp-open ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
    .kp-open li { padding: 10px 0; border-top: 1px solid #e3e8ec; }
    .kp-open a { font-weight: 600; color: #1f3bff; }
    .kp-open p { margin: 2px 0 0; font-size: 0.86rem; color: var(--mute); }
    .kp-checks { margin: 0; padding-left: 1.3em; line-height: 1.8; }
    .kp-warn { margin-top: 20px; padding: 16px 18px; border-radius: 12px; background: #fff4e8; border-left: 4px solid #c2410c; }
    .kp-warn b { color: #9a3412; }
    .kp-warn p { margin: 6px 0 0; line-height: 1.8; }
    .kp-next { margin-top: 18px; display: flex; flex-wrap: wrap; gap: 10px; }
    .kp-next a { padding: 10px 18px; border-radius: 999px; background: #1565d8; color: #fff; font-weight: 700; text-decoration: none; }
    .kp-next a.ghost { background: #fff; color: #1565d8; border: 1px solid #9cc0ee; }
    .kp-hint { margin: 0 0 18px; color: var(--mute); font-size: 0.92rem; }
`;

const body = `    <nav class="area-crumb" aria-label="パンくず"><a href="./">補助金ネット</a> ＞ 買いたいものから探す</nav>
    <div class="pb-banner" style="background-image: url('images/banner/${bannerFor('kaimono.html')}.webp')"><h1 class="pb-title">その買い物、補助金で変わるかも。</h1></div>
    <div style="margin-bottom: 1.5rem;">
      <p class="lead" style="margin-bottom: 0;">「POSレジを買いたい」「店舗を改装したい」など、買い物や投資の内容から、関係しそうな補助金を探せます。制度名がわからなくても使えます。</p>
    </div>

    <section aria-labelledby="kp-pick">
      <h2 id="kp-pick" class="kp-h3" style="margin-top: 0;">買いたいものを選んでください</h2>
      <div class="kp-chips" role="group" aria-label="買いたいもの">
${chips}
      </div>
      <div class="kp-amount">
        <label for="kp-amount-input">購入予定の金額（任意）</label>
        <input id="kp-amount-input" type="number" inputmode="numeric" min="0" step="10000" placeholder="例：300000">
        <span>円</span>
      </div>
      <p class="kp-hint">金額を入れると、補助額の目安の考え方を表示します。補助率や上限は、制度・枠・公募回で変わります。</p>
    </section>

    <section id="kp-result" aria-live="polite" hidden>
${panels}
      <div class="kp-next">
        <a href="hantei.html">AI補助金判定で、条件から調べる</a>
        <a class="ghost" href="consult.html">専門家に無料で相談する</a>
        <a class="ghost" href="search.html">募集中の補助金をすべて探す</a>
      </div>
    </section>

    <p class="area-note">掲載の金額・補助率・対象は目安です。制度は年度や公募回で変わるため、申請や契約の前に必ず公式の公募要領で確認してください。募集中の補助金は jGrants（デジタル庁）の公開データをもとに毎日更新しています。</p>
    <script src="kaimono.js" defer></script>`;

const html = shell({
  title: '買いたいものから補助金を探す｜補助金ネット',
  description: 'POSレジ、店舗の改装、業務用PC、AIツールなど、買い物や投資の内容から関係しそうな補助金を探せます。購入前の確認事項や、契約・発注の注意も表示します。',
  canonicalPath: '/kaimono.html',
  body: body,
}).replace('</style>', `${style}\n  </style>`);

writeFileSync(join(ROOT, 'kaimono.html'), html);
console.log(`買いたいものから探すページを生成：${PURCHASES.length} 件`);
