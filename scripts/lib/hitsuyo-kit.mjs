// 「やりたいことから探す」の個別の解説で使う部品（本文の組み立て、募集中の補助金の枠、掲載データから作る自治体の制度の例）
import { P, UL, OL, QA, TABLE } from './article.mjs';
import { esc } from './site-shell.mjs';
import { isEnded } from './ended.mjs';
import { LOCAL_PROGRAMS } from '../../src/data/local-programs.js';
import { RESIDENT_PROGRAMS } from '../../src/data/resident-programs.js';
import { AREA_CITIES } from '../../src/data/area-cities.js';
import { PREF_SLUGS } from '../../src/data/prefectures.js';

// 募集中の補助金（ブラウザで、grants/search.json から目的で絞り込む）
export const openBlock = (purposes) => `        <div class="hp-open" data-open data-purposes="${esc(purposes.join(' '))}"><p class="hp-loading">読み込み中…</p></div>`;

// 契約・発注の注意
export const WARN = (text) => `        <div class="hp-warn" role="note"><b>⚠ 契約・発注の注意</b><p>${text}</p></div>`;

// 掲載している自治体の制度から、条件に合うものを例として並べる（データから作る。受付が終了したものは除き、都道府県が重ならないように選ぶ）
// kind: 'biz'（事業者向け）／'res'（個人向け）。match: 制度の名前・概要に含まれる言葉の正規表現。
export function localExamples({ kind = 'biz', match, limit = 6, category, allowLoan = false }) {
  const pool = (kind === 'res' ? RESIDENT_PROGRAMS : LOCAL_PROGRAMS)
    .filter((p) => !isEnded(p) && (!category || p.category === category) && (allowLoan || p.type !== '融資'));
  // まず、制度の名前に言葉が入っているものを。足りなければ、概要に言葉が入っているものも加える
  const byName = pool.filter((p) => match.test(p.name));
  const list = byName.length >= 3 ? byName : [...byName, ...pool.filter((p) => !match.test(p.name) && match.test(p.summary || ''))];
  const seen = new Set();
  const picked = [];
  for (const p of list) {
    const pref = (p.prefectures || [])[0];
    if (seen.has(pref)) continue;
    seen.add(pref);
    picked.push(p);
    if (picked.length >= limit) break;
  }
  if (!picked.length) return '';
  const li = picked.map((p) => {
    const city = AREA_CITIES.find((c) => (p.cities || []).includes(c.name));
    const slug = PREF_SLUGS[(p.prefectures || [])[0]];
    const href = city ? `../area/${city.slug}.html#${esc(p.id)}` : slug ? `../area/pref-${slug}.html#${esc(p.id)}` : '../area/index.html';
    const where = [...(p.prefectures || []), ...(p.cities || [])].join('・');
    return `          <li><a href="${href}">${esc(p.name)}</a><br><small>${esc(where)}｜${esc(p.amount || '要確認')}${p.deadline ? `｜締切：${esc(p.deadline)}` : ''}</small></li>`;
  }).join('\n');
  return `        <p>掲載している自治体の制度の例です（全${list.length}件のうち${picked.length}件を、地域が重ならないように表示）。<strong>実施の有無・金額・受付期間は、地域と年度で変わります。</strong>最新の内容は、各自治体の公式ページで確認してください。</p>
        <ul class="hp-examples">
${li}
        </ul>
        <p><a href="../area/index.html">地図から都道府県を選んで、ほかの地域の制度も探す →</a></p>`;
}

export const kit = { P, UL, OL, QA, TABLE, WARN, openBlock, localExamples };
