// 特集ページ（public/feature/）に、「この制度ができた背景と目的」の節を入れる。
//  ・背景・目的・変遷：scripts/data/feature-background.mjs（公的機関の資料で確認できた事実だけを、出典つきで書く）
//  ・関連する記事：当サイトのニュース・ブログ・コラム・活用事例から、キーワードで自動に集める（記事が増えれば、自動で増える）
// 何度実行しても同じ結果。使い方：node scripts/apply-background.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BACKGROUND } from './data/feature-background.mjs';

const PUB = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const RE = /[ \t]*<!-- bg:start -->[\s\S]*?<!-- bg:end -->\n\n/;
const KINDS = [['news', 'ニュース'], ['blog', 'ブログ'], ['columns', 'コラム'], ['cases', '活用事例']];

const h1Of = (html) => ((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();

// 当サイトの記事の一覧（フォルダ・ファイル・題名・日付）
export function articles(pub = PUB) {
  const out = [];
  for (const [folder, label] of KINDS) {
    const dir = join(pub, folder);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.html') && x !== 'index.html')) {
      const html = readFileSync(join(dir, f), 'utf-8');
      const date = (f.match(/^(\d{4}-\d{2}-\d{2})/) || [])[1] || '';
      out.push({ folder, label, file: f, title: h1Of(html), date });
    }
  }
  return out;
}

export function relatedFor(keywords, list, limit = 6) {
  const hit = list.filter((a) => keywords.some((k) => a.title.includes(k)));
  return hit.sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.title.localeCompare(b.title, 'ja')).slice(0, limit);
}

export function bgHtml(def, related) {
  const paras = (arr) => arr.map((t) => `        <p>${t}</p>`).join('\n');
  const topics = def.topics.map((t) => `        <h3>${esc(t.h)}</h3>\n${paras(t.paras)}`).join('\n');
  const rel = related.length ? `        <h3>この制度に関連する、当サイトの記事</h3>
        <ul>
${related.map((a) => `          <li><a href="../${a.folder}/${a.file}">${esc(a.title)}</a>（${esc(a.label)}${a.date ? `｜${esc(a.date)}` : ''}）</li>`).join('\n')}
        </ul>` : '';
  const view = def.view ? `        <h3>当サイトの見方（解釈）</h3>\n${paras(def.view)}` : '';
  const src = `        <h3>出典（確認した日：${esc(def.asOf)}）</h3>
        <ul>
${def.sources.map(([label, url, pub]) => `          <li><a href="${url}" target="_blank" rel="noopener">${esc(label)}</a>（${esc(pub)}）</li>`).join('\n')}
        </ul>`;
  return `    <!-- bg:start -->
    <section class="art-sec" aria-labelledby="bg"><h2 id="bg">この制度ができた背景と目的</h2>
      <div class="area-body">
        <p>${def.lead}</p>
${topics}
${view}
${rel}
${src}
        <p class="area-note">上の内容は、出典に書かれた公開情報の要約です。制度の最新の内容は、必ず公式の公募要領で確認してください。</p>
      </div>
    </section>

    <div class="sec-divider" aria-hidden="true"><img src="../images/dividers/div-05.webp" alt="" loading="lazy"></div>
    <!-- bg:end -->

`;
}

export function applyBackground(html, slug, list) {
  const def = BACKGROUND[slug];
  if (!def) return html;
  const clean = html.replace(RE, '');
  const block = bgHtml(def, relatedFor(def.keywords, list));
  const m = /^[ \t]*<!-- fit:start -->/m.exec(clean) || /^[ \t]*<section class="art-sec" aria-labelledby="[^"]*"><h2 id="[^"]*">(?:<img[^>]*>)?最新情報の確認先/m.exec(clean);
  if (!m) return html;
  return `${clean.slice(0, m.index)}${block}${clean.slice(m.index)}`;
}

export function run() {
  const list = articles();
  let n = 0;
  for (const slug of Object.keys(BACKGROUND)) {
    const p = join(PUB, 'feature', `${slug}.html`);
    if (!existsSync(p)) continue;
    const before = readFileSync(p, 'utf-8');
    const after = applyBackground(before, slug, list);
    if (after !== before) { writeFileSync(p, after); n++; }
  }
  return n;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(`制度の背景と目的を更新：${run()}ページ`);
