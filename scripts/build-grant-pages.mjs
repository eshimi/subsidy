// jGrants の取得データ（public/data/jgrants/）から、制度ごとのページ・一覧・締切一覧を生成する。
// GitHub Actions のデプロイ前（Fetch jGrants data の後）に実行する。生成物は public/grants/ で、コミットしない。
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, esc, shell } from './lib/site-shell.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'public', 'data', 'jgrants');
const OUT = join(ROOT, 'public', 'grants');
const SITEMAP = join(ROOT, 'public', 'sitemap.xml');
const SOON_DAYS = 30;
const JGRANTS = 'https://www.jgrants-portal.go.jp/';

const DAY = 24 * 60 * 60 * 1000;
const dateJa = (iso) => (iso ? new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(iso)) : '記載なし');
const amountJa = (max) => (max ? `${Number(max).toLocaleString('ja-JP')}円まで` : '公募要領で確認');

// 締切までの状態。now は比較の基準時刻（テストで差し替えできるように引数にする）
export function statusOf(end, now) {
  if (!end) return { key: 'unknown', label: '締切不明', daysLeft: null };
  const days = Math.ceil((new Date(end).getTime() - now) / DAY);
  if (days < 0) return { key: 'closed', label: '受付終了', daysLeft: days };
  if (days <= SOON_DAYS) return { key: 'soon', label: `締切まで${days}日`, daysLeft: days };
  return { key: 'open', label: '受付中', daysLeft: days };
}

// 全国版と都道府県版の両方から読み、ID で重複を除く
export function loadGrants(dir = DATA) {
  const index = join(dir, 'index.json');
  if (!existsSync(index) || !JSON.parse(readFileSync(index, 'utf-8')).available) return null;
  const byId = new Map();
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json') && f !== 'index.json')) {
    for (const g of JSON.parse(readFileSync(join(dir, file), 'utf-8'))) {
      if (g.id && /^[A-Za-z0-9_-]+$/.test(g.id)) byId.set(g.id, g);
    }
  }
  return [...byId.values()].sort((a, b) => String(a.end).localeCompare(String(b.end)));
}

const STYLE_EXTRA = `
    .grant-facts { display: grid; grid-template-columns: max-content 1fr; gap: 10px 20px; margin: 0; }
    .grant-facts dt { color: var(--mute); }
    .grant-facts dd { margin: 0; }
    .grant-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
    .grant-list li { border-top: 1px solid #e0e0e0; padding-top: 12px; }
    .grant-list a { color: #1f3bff; font-weight: 500; text-decoration: none; }
    .grant-list a:hover { text-decoration: underline; }
    .grant-meta { font-size: 0.85rem; color: var(--mute); margin: 4px 0 0; }`;

const crumb = (items) => `    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ ${items.map(([h, t]) => (h ? `<a href="${h}">${esc(t)}</a>` : esc(t))).join(' ＞ ')}</nav>`;

function grantPage(g, now) {
  const st = statusOf(g.end, now);
  const title = `${g.title}｜補助金ネット`;
  const description = `${g.title}の対象地域（${g.area || '記載なし'}）、上限額、申請期間を一覧で確認できます。申請要件は公式サイトで確認してください。`.slice(0, 160);
  const url = `${SITE}/grants/${g.id}.html`;
  const body = `${crumb([['index.html', '制度一覧'], [null, g.title]])}

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem; font-size: clamp(1.5rem, 3.5vw, 2.2rem);">${esc(g.title)}</h1>
      <p class="lead" style="margin-bottom: 0;">${esc(st.label)}｜締切：${esc(dateJa(g.end))}</p>
    </div>

    <section class="area-section" aria-labelledby="facts">
      <span class="area-num">01</span>
      <h2 id="facts">制度の概要</h2>
      <dl class="grant-facts">
        <dt>対象地域</dt><dd>${esc(g.area || '記載なし')}</dd>
        <dt>上限額</dt><dd>${esc(amountJa(g.max))}</dd>
        <dt>対象の従業員数</dt><dd>${esc(g.employees || '記載なし')}</dd>
        <dt>受付開始</dt><dd>${esc(dateJa(g.start))}</dd>
        <dt>受付締切</dt><dd>${esc(dateJa(g.end))}</dd>
      </dl>
      <div class="area-links">
        <a href="${JGRANTS}" target="_blank" rel="noopener">jGrants で公式の情報を見る →</a>
      </div>
    </section>

    <section class="area-section" aria-labelledby="check">
      <span class="area-num">02</span>
      <h2 id="check">申請前に確認したいこと</h2>
      <div class="area-body">
        <ul>
          <li>自分が対象になるか（事業者の種類、創業後の年数、従業員数など）</li>
          <li>対象になる経費は何か。交付決定の前に発注すると対象外になることがあります。</li>
          <li>多くの補助金は後払いのため、先に自己資金で支払う必要があります。</li>
        </ul>
      </div>
      <div class="area-links">
        <a href="../columns.html#column2">後払いの仕組みを読む →</a>
        <a href="../columns.html#column3">補助金の探し方を読む →</a>
      </div>
    </section>

    <nav class="related-links" aria-label="関連ページ">
      <h2>関連ページ</h2>
      <ul>
        <li><a href="deadlines.html">締切が近い補助金</a></li>
        <li><a href="index.html">制度一覧</a></li>
        <li><a href="../area/index.html">地域別の補助金</a></li>
        <li><a href="../columns.html">コラム</a></li>
        <li><a href="../">補助金を探す</a></li>
      </ul>
    </nav>

    <p class="area-note">この情報は jGrants（デジタル庁）の公開データをもとに自動で作成しています。対象・金額・締切は変わることがあるため、申請前に必ず公式サイトで確認してください。</p>`;
  return shell({ title, description, canonicalPath: `/grants/${g.id}.html`, body }).replace('</style>', `${STYLE_EXTRA}\n  </style>`);
}

function listPage({ title, heading, lead, items, now, canonicalPath }) {
  const lis = items.map((g) => {
    const st = statusOf(g.end, now);
    return `        <li><a href="${g.id}.html">${esc(g.title)}</a><p class="grant-meta">${esc(st.label)}｜締切 ${esc(dateJa(g.end))}｜${esc(g.area || '記載なし')}</p></li>`;
  }).join('\n');
  const body = `${crumb([['../', '補助金ネット'], [null, heading]])}

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">${esc(heading)}</h1>
      <p class="lead" style="margin-bottom: 0;">${esc(lead)}</p>
    </div>

    <section class="area-section" aria-labelledby="list">
      <ul class="grant-list">
${lis || '        <li>現在、表示できる制度がありません。</li>'}
      </ul>
    </section>

    <p class="area-note">情報は jGrants（デジタル庁）の公開データをもとに、毎日自動で更新しています。最新の要件は公式サイトで確認してください。</p>`;
  return shell({ title, description: lead, canonicalPath, body }).replace('</style>', `${STYLE_EXTRA}\n  </style>`);
}

// sitemap.xml に制度ページを追加する（前回の追加分は取り除いてから入れ直す）
export function sitemapWith(xml, urls, lastmod) {
  const cleaned = xml.replace(/\s*<!-- grants:start -->[\s\S]*?<!-- grants:end -->/, '');
  const entries = urls.map((u) => `  <url><loc>${SITE}/${u}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n');
  return cleaned.replace('</urlset>', `  <!-- grants:start -->\n${entries}\n  <!-- grants:end -->\n</urlset>`);
}

export function buildAll({ dir = DATA, out = OUT, sitemap = SITEMAP, now = Date.now(), lastmod = new Date(now).toISOString().slice(0, 10) } = {}) {
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  const grants = loadGrants(dir);
  if (!grants) {
    // データが取れなかった日は、案内だけを出して、古い制度ページは作らない
    const msg = '制度データを取得できなかったため、一覧は準備中です。';
    writeFileSync(join(out, 'index.html'), listPage({ title: '制度一覧', heading: '制度一覧', lead: msg, items: [], now, canonicalPath: '/grants/index.html' }));
    writeFileSync(join(out, 'deadlines.html'), listPage({ title: '締切が近い補助金', heading: '締切が近い補助金', lead: msg, items: [], now, canonicalPath: '/grants/deadlines.html' }));
    return { pages: 0 };
  }
  const soon = grants.filter((g) => statusOf(g.end, now).key !== 'closed');
  for (const g of grants) writeFileSync(join(out, `${g.id}.html`), grantPage(g, now));
  writeFileSync(join(out, 'index.html'), listPage({ title: '制度一覧｜補助金ネット', heading: '制度一覧', lead: `jGrants で募集中の補助金 ${grants.length} 件を、締切の早い順に並べています。`, items: grants, now, canonicalPath: '/grants/index.html' }));
  writeFileSync(join(out, 'deadlines.html'), listPage({ title: '締切が近い補助金｜補助金ネット', heading: '締切が近い補助金', lead: `受付中の補助金 ${soon.length} 件を、締切の早い順に並べています。`, items: soon, now, canonicalPath: '/grants/deadlines.html' }));
  if (existsSync(sitemap)) {
    const urls = ['grants/index.html', 'grants/deadlines.html', ...grants.map((g) => `grants/${g.id}.html`)];
    writeFileSync(sitemap, sitemapWith(readFileSync(sitemap, 'utf-8'), urls, lastmod));
  }
  return { pages: grants.length };
}

// 直接実行されたときだけ生成する（テストから import しても副作用が出ないようにする）
if (import.meta.url === `file://${process.argv[1]}`) {
  const { pages } = buildAll();
  console.log(`制度ページを生成: ${pages} 件`);
}
