// 解説記事（基礎知識・対象者別・個人向けなど）の共通の組み立て。
// 見出しはバナー（public/images/banner/）の中、本文はセクションの並び、最後に確認先と関連ページ。
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { esc, shell } from './site-shell.mjs';

export const P = (t) => `        <p>${t}</p>`;
export const UL = (items) => `        <ul>\n${items.map((i) => `          <li>${i}</li>`).join('\n')}\n        </ul>`;
export const OL = (items) => `        <ol>\n${items.map((i) => `          <li>${i}</li>`).join('\n')}\n        </ol>`;
export const QA = (pairs) => pairs.map(([q, a]) => `        <h3>Q. ${q}</h3>\n        <p>A. ${a}</p>`).join('\n');
export const DL = (pairs) => `        <dl class="glossary">\n${pairs.map(([t, d]) => `          <dt>${t}</dt><dd>${d}</dd>`).join('\n')}\n        </dl>`;
export const TABLE = (head, rows) => `        <div class="table-wrap"><table class="feature-table">
          <thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
          <tbody>
${rows.map((r) => `            <tr><th scope="row">${r[0]}</th>${r.slice(1).map((c) => `<td>${c}</td>`).join('')}</tr>`).join('\n')}
          </tbody>
        </table></div>`;
export const NOTE_ALL = '制度の金額・補助率・対象経費は、年度や公募回ごとに決まります。ここでは全体像を説明し、数字は原則として書いていません。最新の内容は公式の情報で確認してください。';

const STYLE = `
    .feature-table { width: 100%; border-collapse: collapse; margin: 8px 0 16px; font-size: 0.92rem; }
    .feature-table th, .feature-table td { border: 1px solid #e0e0e0; padding: 10px 12px; text-align: left; vertical-align: top; }
    .feature-table thead th { background: #f4f6f8; }
    .table-wrap { overflow-x: auto; }
    .glossary dt { font-weight: 700; margin-top: 12px; }
    .glossary dd { margin: 4px 0 0; }
    .feature-card { display: block; padding: 20px 0; border-top: 1px solid #e0e0e0; text-decoration: none; }
    .feature-card:first-child { border-top: 0; }
    .feature-card h2 { font-size: 1.2rem; margin: 0 0 6px; }
    .feature-card p { margin: 0; color: var(--mute); }
`;

const crumb = (items) => `    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ ${items.map(([h, t]) => (h ? `<a href="${h}">${esc(t)}</a>` : esc(t))).join(' ＞ ')}</nav>`;

// 記事の本文（main の中身）
export function articleBody({ section, kicker, title, lead, sections, related = [], sources = [], banner, updated, afterLead = '', sourcesHeading = '最新情報の確認先', sourcesIntro = '制度の内容は変わります。次の公式情報で、最新の内容を確認してください。' }) {
  const body = sections.map(([h, html], i) => `    <article class="area-section" aria-labelledby="s${i}">
      <span class="area-num">${String(i).padStart(2, '0')}</span>
      <h2 id="s${i}">${esc(h)}</h2>
      <div class="area-body">
${html}
      </div>
    </article>`).join('\n\n');
  const src = sources.length ? `
    <article class="area-section" aria-labelledby="sources">
      <span class="area-num">確認</span>
      <h2 id="sources">${esc(sourcesHeading)}</h2>
      <div class="area-body">
        <p>${sourcesIntro}</p>
        <ul>
${sources.map(([label, href, org]) => `          <li><a href="${href}" target="_blank" rel="noopener">${esc(label)}</a>${org ? `（${esc(org)}）` : ''}</li>`).join('\n')}
        </ul>
        <p class="area-note" style="margin-top: 16px;">最終更新日：${esc(updated)}</p>
      </div>
    </article>` : `\n    <p class="area-note">最終更新日：${esc(updated)}</p>`;
  return `${crumb(kicker ? [[section[0], section[1]], [null, kicker]] : [[null, section[1]]])}

    <div class="pb-banner" style="background-image: url('../images/banner/${banner}.webp')"><h1 class="pb-title">${esc(title)}</h1></div>
    <div style="margin-bottom: 2rem;">
      <p class="label" style="margin-bottom: 0.5rem;">${esc(section[1])}</p>
      <p class="lead" style="margin-bottom: 0;">${esc(lead)}</p>
${afterLead}    </div>

${body}
${src}

    <nav class="related-links" aria-label="関連ページ">
      <h2>関連ページ</h2>
      <ul>
${related.map(([href, label]) => `        <li><a href="${href}">${esc(label)}</a></li>`).join('\n')}
      </ul>
    </nav>`;
}

// 一覧ページ（カードの並び）の本文
export function indexBody({ section, title, lead, cards, banner, note = '' }) {
  return `${crumb([[null, section]])}

    <div class="pb-banner" style="background-image: url('../images/banner/${banner}.webp')"><h1 class="pb-title">${esc(title)}</h1></div>
    <div style="margin-bottom: 2rem;">
      <p class="lead" style="margin-bottom: 0;">${esc(lead)}</p>
    </div>

    <section class="area-section" aria-labelledby="list">
      <h2 id="list" class="visually-hidden">記事の一覧</h2>
      <div class="area-body">
${cards.map(([href, t, s]) => `      <a class="feature-card" href="${href}">
        <h2>${esc(t)}</h2>
        <p>${esc(s)}</p>
      </a>`).join('\n')}
      </div>
    </section>
${note ? `\n    <p class="area-note">${note}</p>` : ''}`;
}

export function writeArticle(outDir, folder, file, { title, description, body }) {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, file), shell({ title: `${title}｜補助金ネット`, description, canonicalPath: `/${folder}/${file}`, body }).replace('</style>', `${STYLE}\n  </style>`));
}
