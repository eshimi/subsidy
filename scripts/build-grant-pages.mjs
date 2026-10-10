// jGrants の取得データ（public/data/jgrants/）から、制度ごとのページ・一覧・締切一覧を生成する。
// GitHub Actions のデプロイ前（Fetch jGrants data の後）に実行する。生成物は public/grants/ で、コミットしない。
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, esc, shell } from './lib/site-shell.mjs';
import { PREFECTURES, PREF_SLUGS } from '../src/data/prefectures.js';

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


// カレンダー（ICS）用の日付。締切日（日本時間）の終日予定にする
const icsDate = (iso) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(iso)).replace(/-/g, '');
const xmlEsc = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);

// 締切が残っている制度を、締切日の終日予定として並べたカレンダー（ICS）
export function icsFor(grants, now) {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//補助金ネット//JA', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:補助金の締切（補助金ネット）'];
  const stamp = new Date(now).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  for (const g of grants) {
    if (!g.end || statusOf(g.end, now).key === 'closed') continue;
    lines.push('BEGIN:VEVENT', `UID:${g.id}@hojyokin.net`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDate(g.end)}`, `SUMMARY:締切：${g.title.replace(/[,;\\\n]/g, ' ')}`,
      `URL:${SITE}/grants/${g.id}.html`, 'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}

// 新しく募集が始まった制度の RSS（開始日の新しい順）
export function rssFor(grants, now) {
  const open = grants.filter((g) => statusOf(g.end, now).key !== 'closed')
    .sort((a, b) => String(b.start).localeCompare(String(a.start))).slice(0, 50);
  const items = open.map((g) => `    <item>
      <title>${xmlEsc(g.title)}</title>
      <link>${SITE}/grants/${g.id}.html</link>
      <guid isPermaLink="true">${SITE}/grants/${g.id}.html</guid>
      <description>${xmlEsc(`${g.area || '地域の記載なし'}｜締切 ${dateJa(g.end)}`)}</description>
      ${g.start ? `<pubDate>${new Date(g.start).toUTCString()}</pubDate>` : ''}
    </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>補助金ネット｜募集中の補助金</title>
    <link>${SITE}/grants/index.html</link>
    <description>jGrants で募集中の補助金を、新しい順にお知らせします。</description>
    <language>ja</language>
${items}
  </channel>
</rss>
`;
}

const tile = (href, title, count) => `        <li><a href="${href}"><span class="pref-name">${esc(title)}</span><span class="pref-count">${count}件</span></a></li>`;

// 都道府県別の一覧（タイル）と、都道府県ごとの制度ページ
export function prefectureCounts(dir = DATA) {
  return Object.fromEntries(PREFECTURES.map((pref) => {
    const file = join(dir, `pref-${String(PREFECTURES.indexOf(pref) + 1).padStart(2, '0')}.json`);
    const list = existsSync(file) ? JSON.parse(readFileSync(file, 'utf-8')) : [];
    return [pref, list];
  }));
}

function prefPage(pref, list, now) {
  const slug = PREF_SLUGS[pref];
  const open = list.filter((g) => statusOf(g.end, now).key !== 'closed');
  const lis = open.map((g) => `        <li><a href="${g.id}.html">${esc(g.title)}</a><p class="grant-meta">${esc(statusOf(g.end, now).label)}｜締切 ${esc(dateJa(g.end))}</p></li>`).join('\n');
  const body = `${crumb([['../', '補助金ネット'], ['prefectures.html', '都道府県別'], [null, pref]])}

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">${esc(pref)}の補助金</h1>
      <p class="lead" style="margin-bottom: 0;">${esc(pref)}を対象にした、募集中の補助金 ${open.length} 件です。締切の早い順に並べています。</p>
    </div>

    <section class="area-section" aria-labelledby="list">
      <ul class="grant-list">
${lis || '        <li>現在、募集中の制度はありません。</li>'}
      </ul>
    </section>

    <nav class="related-links" aria-label="関連ページ">
      <h2>関連ページ</h2>
      <ul>
        <li><a href="prefectures.html">都道府県別の補助金</a></li>
        <li><a href="deadlines.html">締切が近い補助金</a></li>
        <li><a href="../area/index.html">地域別の補助金（市区町村）</a></li>
      </ul>
    </nav>

    <p class="area-note">情報は jGrants（デジタル庁）の公開データをもとに、毎日自動で更新しています。全国向けの制度は含まれていない場合があります。最新の要件は公式サイトで確認してください。</p>`;
  return shell({ title: `${pref}の補助金・募集中の制度｜補助金ネット`, description: `${pref}で募集中の補助金 ${open.length} 件を、締切の早い順に一覧できます。`, canonicalPath: `/grants/pref-${slug}.html`, body }).replace('</style>', `${STYLE_EXTRA}\n  </style>`);
}

function prefectureIndex(counts, now) {
  const tiles = PREFECTURES.map((pref) => {
    const n = counts[pref].filter((g) => statusOf(g.end, now).key !== 'closed').length;
    return tile(`pref-${PREF_SLUGS[pref]}.html`, pref, n);
  }).join('\n');
  const body = `${crumb([['../', '補助金ネット'], [null, '都道府県別の補助金']])}

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">都道府県別の補助金</h1>
      <p class="lead" style="margin-bottom: 0;">都道府県を選ぶと、その地域で募集中の補助金を締切の早い順に確認できます。</p>
    </div>

    <section class="area-section" aria-labelledby="prefs">
      <ul class="pref-grid">
${tiles}
      </ul>
    </section>

    <p class="area-note">件数は、都道府県を対象にした募集中の制度の数です。全国向けの制度は各都道府県の一覧には含まれません。</p>`;
  return shell({ title: '都道府県別の補助金一覧｜補助金ネット', description: '47都道府県ごとに、募集中の補助金の件数と一覧を確認できます。', canonicalPath: '/grants/prefectures.html', body }).replace('</style>', `${STYLE_EXTRA}\n  </style>`);
}

const STYLE_EXTRA = `
    .grant-facts { display: grid; grid-template-columns: max-content 1fr; gap: 10px 20px; margin: 0; }
    .grant-facts dt { color: var(--mute); }
    .grant-facts dd { margin: 0; }
    .grant-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
    .grant-list li { border-top: 1px solid #e0e0e0; padding-top: 12px; }
    .grant-list a { color: #1f3bff; font-weight: 500; text-decoration: none; }
    .grant-list a:hover { text-decoration: underline; }
    .grant-meta { font-size: 0.85rem; color: var(--mute); margin: 4px 0 0; }
    .pref-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
    .pref-grid a { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px 14px; text-decoration: none; color: var(--ink); background: #fff; }
    .pref-grid a:hover { border-color: var(--accent); }
    .pref-count { font-family: var(--font-mono); font-size: 0.8rem; color: var(--mute); }`;

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

function listPage({ title, heading, lead, items, now, canonicalPath, extra = '' }) {
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

${extra}
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
    writeFileSync(join(out, 'prefectures.html'), prefectureIndex(Object.fromEntries(PREFECTURES.map((p) => [p, []])), now));
    writeFileSync(join(out, 'deadlines.ics'), icsFor([], now));
    writeFileSync(join(out, 'feed.xml'), rssFor([], now));
    return { pages: 0 };
  }
  const soon = grants.filter((g) => statusOf(g.end, now).key !== 'closed');
  for (const g of grants) writeFileSync(join(out, `${g.id}.html`), grantPage(g, now));
  writeFileSync(join(out, 'index.html'), listPage({ title: '制度一覧｜補助金ネット', heading: '制度一覧', lead: `jGrants で募集中の補助金 ${grants.length} 件を、締切の早い順に並べています。`, items: grants, now, canonicalPath: '/grants/index.html' }));
  writeFileSync(join(out, 'deadlines.html'), listPage({ title: '締切が近い補助金｜補助金ネット', heading: '締切が近い補助金', lead: `受付中の補助金 ${soon.length} 件を、締切の早い順に並べています。`, items: soon, now, canonicalPath: '/grants/deadlines.html', extra: `
    <nav class="related-links" aria-label="カレンダーと RSS">
      <h2>登録・購読</h2>
      <ul>
        <li><a href="deadlines.ics">締切をカレンダーに追加（ICS）</a></li>
        <li><a href="feed.xml">新着の補助金を RSS で受け取る</a></li>
        <li><a href="prefectures.html">都道府県別に見る</a></li>
      </ul>
    </nav>` }));
  writeFileSync(join(out, 'deadlines.ics'), icsFor(grants, now));
  writeFileSync(join(out, 'feed.xml'), rssFor(grants, now));
  const counts = prefectureCounts(dir);
  writeFileSync(join(out, 'prefectures.html'), prefectureIndex(counts, now));
  for (const pref of PREFECTURES) writeFileSync(join(out, `pref-${PREF_SLUGS[pref]}.html`), prefPage(pref, counts[pref], now));
  if (existsSync(sitemap)) {
    const urls = ['grants/index.html', 'grants/deadlines.html', 'grants/prefectures.html', ...PREFECTURES.map((p) => `grants/pref-${PREF_SLUGS[p]}.html`), ...grants.map((g) => `grants/${g.id}.html`)];
    writeFileSync(sitemap, sitemapWith(readFileSync(sitemap, 'utf-8'), urls, lastmod));
  }
  return { pages: grants.length };
}

// 直接実行されたときだけ生成する（テストから import しても副作用が出ないようにする）
if (import.meta.url === `file://${process.argv[1]}`) {
  const { pages } = buildAll();
  console.log(`制度ページを生成: ${pages} 件`);
}
