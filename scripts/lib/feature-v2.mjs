// 特集記事の共通部品（新レイアウト）。スタイルは public/style.css の「特集記事の共通スタイル（fx-）」。
// 記事の全体は <div class="fx" data-layout="feature-v2"> で包む。この目印があるページには、
// 見出しのアイコン・区切り絵・背景/向き不向きの自動挿入（apply-*.mjs）は掛からない。
export const LAYOUT_MARK = 'data-layout="feature-v2"';
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ICON = {
  info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.6v.01"/></svg>',
  chev: '<svg class="fx-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  circle: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/></svg>',
  cross: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14"/><path d="M19 5L5 19"/></svg>',
  check: '<svg class="fx-mk" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  x: '<svg class="fx-mk" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M7 7l10 10"/><path d="M17 7L7 17"/></svg>',
  dash: '<svg class="fx-mk" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 12h12"/></svg>',
  warn: '<svg class="fx-mk" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5L2.5 20h19L12 3.5z"/><path d="M12 10v4.5"/><path d="M12 17.5v.01"/></svg>',
  person: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/></svg>',
  arrow: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>',
  ext: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
};
export { ICON };

// 節の見出し。id は節（section）につけ、旧来のアンカー（#s1 など）は h2 に残す
export function section(id, hid, title, inner, { tone = 'orange', first = false } = {}) {
  return `    <section class="fx-sec${first ? ' fx-sec--first' : ''}" id="${id}" aria-labelledby="${hid}">
      <div class="fx-h2"><span class="fx-bar fx-bar--${tone}" aria-hidden="true"></span><h2 id="${hid}">${esc(title)}</h2></div>
${inner}
    </section>`;
}

export function partHead(n, title, tone = 'orange') {
  return `    <div class="fx-part fx-part--${tone}">
      <p class="fx-part-no">PART ${n}</p>
      <p class="fx-part-title">${esc(title)}</p>
    </div>`;
}

export function conclusion(items, noteHtml, title = 'この記事の結論') {
  return `    <section class="fx-sec fx-sec--first fx-card fx-pad-l" aria-labelledby="s0">
      <div class="fx-h2"><span class="fx-bar fx-bar--orange" aria-hidden="true"></span><h2 id="s0">${esc(title)}</h2></div>
      <ol class="fx-sum">
${items.map(([head, body], i) => `        <li><span class="fx-num">${i + 1}</span><div><p class="fx-sum-h">${head}</p><p>${body}</p></div></li>`).join('\n')}
      </ol>
      <p class="fx-note">${ICON.info}<span>${noteHtml}</span></p>
    </section>`;
}

export function toc(parts) {
  return `    <nav class="fx-toc fx-card" aria-labelledby="toc">
      <h2 id="toc">目次</h2>
      <div class="fx-toc-cols">
${parts.map(([label, tone, links]) => `        <div>
          ${label ? `<p class="fx-toc-part fx-toc-part--${tone}">${esc(label)}</p>` : ''}
          <ol>
${links.map(([href, text]) => `            <li><a href="${href}">${esc(text)}</a></li>`).join('\n')}
          </ol>
        </div>`).join('\n')}
      </div>
    </nav>`;
}

export const chip = (t) => `<span class="fx-chip">${esc(t)}</span>`;

export function typeList(rows) {
  return `      <div class="fx-card fx-rows">
${rows.map(([name, sub, target, text]) => `        <div class="fx-row">
          <div class="fx-row-l"><p class="fx-row-name">${name}${sub ? `<br><span>${sub}</span>` : ''}</p>${chip(target)}</div>
          <p class="fx-row-r">${text}</p>
        </div>`).join('\n')}
      </div>`;
}

// ○✕ の2つの箱。items は [本文, 補足] 。kind: ok | ng | muted
export function markBox(kind, title, items, { icon } = {}) {
  const mk = { ok: ICON.check, ng: ICON.x, muted: ICON.dash }[kind];
  const head = { ok: ICON.circle, ng: ICON.cross }[kind] || '';
  return `        <div class="fx-card fx-mbox fx-mbox--${kind}">
          <p class="fx-mbox-h">${icon ?? head}${title}</p>
          <ul class="fx-mlist">
${items.map(([t, sub]) => `            <li>${mk}<span>${t}${sub ? `<br><span class="fx-sub">${sub}</span>` : ''}</span></li>`).join('\n')}
          </ul>
        </div>`;
}

export function table(head, rows, { align = [] } = {}) {
  const th = (h, i) => `<th scope="col"${align[i] === 'r' ? ' class="fx-r"' : ''}>${h}</th>`;
  return `      <div class="fx-card fx-scroll">
        <table class="fx-table">
          <thead><tr>${head.map(th).join('')}</tr></thead>
          <tbody>
${rows.map((r) => `            <tr><th scope="row">${r[0]}</th>${r.slice(1).map((c, i) => `<td${align[i + 1] === 'r' ? ' class="fx-r"' : ''}>${c}</td>`).join('')}</tr>`).join('\n')}
          </tbody>
        </table>
      </div>`;
}

// 申請の流れ（縦のステップ）。groups: [{label, start, steps:[{title, html, badge, tone}], gate}]
export function steps(groups) {
  return `      <div class="fx-card fx-steps-box">
${groups.map((g) => `        <p class="fx-steps-label">${esc(g.label)}</p>
        <ol class="fx-steps" start="${g.start}">
${g.steps.map((s, i) => `          <li class="fx-step${i === g.steps.length - 1 ? ' fx-step--last' : ''}"><div class="fx-step-l"><span class="fx-step-no${s.tone ? ` fx-step-no--${s.tone}` : ''}">${g.start + i}</span></div><div class="fx-step-r"><p class="fx-step-h">${s.title}${s.badge ? ` ${chip(s.badge)}` : ''}</p><p>${s.html}</p></div></li>`).join('\n')}
        </ol>${g.gate ? `
        <div class="fx-gate" role="note"><span></span><b>${esc(g.gate)}</b><span></span></div>` : ''}`).join('\n')}
      </div>`;
}

export function mistakes(items, cta) {
  return `      <div class="fx-grid">
${items.map(([h, t]) => `        <div class="fx-card fx-pad-m fx-mistake"><p class="fx-mistake-h">${ICON.warn}<span>${h}</span></p><p>${t}</p></div>`).join('\n')}
${cta ? `        <div class="fx-cta"><p>${cta[0]}</p><a href="${cta[1]}">${cta[2]}</a></div>` : ''}
      </div>`;
}

export function faq(items) {
  return `      <div class="fx-card fx-acc">
${items.map(([q, a], i) => `        <details${i === 0 ? ' open' : ''}>
          <summary><span class="fx-qa fx-qa--q">Q</span><span class="fx-acc-t">${q}</span>${ICON.chev}</summary>
          <div class="fx-ans"><span class="fx-qa fx-qa--a">A</span><p>${a}</p></div>
        </details>`).join('\n')}
      </div>`;
}

export function glossary(items) {
  return `      <dl class="fx-gl">
${items.map(([t, d]) => `        <div class="fx-card fx-pad-s"><dt>${t}</dt><dd>${d}</dd></div>`).join('\n')}
      </dl>`;
}

export function accordion(items) {
  return `      <div class="fx-card fx-acc fx-acc--plain">
${items.map(({ h, paras }) => `        <details>
          <summary><span class="fx-acc-t">${h}</span>${ICON.chev}</summary>
          <div class="fx-acc-body">
${paras.map((p) => `            <p>${p}</p>`).join('\n')}
          </div>
        </details>`).join('\n')}
      </div>`;
}

export function bgCards(cards) {
  return `      <div class="fx-grid fx-grid--3">
${cards.map(([label, head, body]) => `        <div class="fx-card fx-pad-m fx-bgc"><p class="fx-bgc-l">${label}</p><p class="fx-bgc-h">${head}</p><p>${body}</p></div>`).join('\n')}
      </div>`;
}

export function flow3(flow, ariaLabel) {
  const cells = flow.map(([k, v], i) => `${i ? `<span class="fx-flow-ar" aria-hidden="true">${ICON.arrow}</span>` : ''}<div class="fx-flow-c${i === flow.length - 1 ? ' fx-flow-c--goal' : ''}"><em>${esc(k)}</em><b>${esc(v).replace(/\n/g, '<br>')}</b></div>`).join('');
  return `      <div class="fx-card fx-flow" role="img" aria-label="${esc(ariaLabel)}">${cells}</div>`;
}

// 年表。items: [{year, sub, head, body, badge, chips, last}]
export function timeline(items) {
  return `      <div class="fx-card fx-tl-box">
        <h3>制度のあゆみ</h3>
        <ol class="fx-tl">
${items.map((t) => `          <li${t.last ? ' class="fx-tl-last"' : ''}><p class="fx-tl-date">${esc(t.year)}${t.sub ? `<span>${esc(t.sub)}</span>` : ''}</p><div class="fx-tl-body"><span class="fx-dot" aria-hidden="true"></span><p class="fx-tl-head">${t.head}${t.badge ? ` <span class="fx-badge">${esc(t.badge)}</span>` : ''}</p><p>${t.body}</p>${t.chips ? `<div class="fx-chips">${t.chips.map(chip).join('')}</div>` : ''}</div></li>`).join('\n')}
        </ol>
      </div>`;
}

export function viewBox(lead, items) {
  return `      <div class="fx-card fx-pad-l fx-view">
        <p class="fx-view-lead">${lead}</p>
        <ol class="fx-view-list">
${items.map((t, i) => `          <li><span class="fx-num fx-num--s">${i + 1}</span><span>${t}</span></li>`).join('\n')}
        </ol>
      </div>`;
}

export function linkList(items) {
  return `      <ul class="fx-card fx-links">
${items.map(([href, label, sub, ext]) => `        <li><a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}><span><strong>${label}</strong>${sub ? `<br><span class="fx-sub">${sub}</span>` : ''}</span>${ext ? ICON.ext : ''}</a></li>`).join('\n')}
      </ul>`;
}

export function relatedArticles(list) {
  if (!list.length) return '';
  return `    <section class="fx-sec" aria-labelledby="fx-related">
      <h2 class="fx-h2-plain" id="fx-related">この制度に関連する、当サイトの記事</h2>
      <ul class="fx-card fx-links fx-links--rel">
${list.map((a) => `        <li><a href="../${a.folder}/${a.file}"><span class="fx-kind">${esc(a.label)}</span><span class="fx-rel-t">${esc(a.title)}</span><span aria-hidden="true" class="fx-rel-ar">→</span></a></li>`).join('\n')}
      </ul>
    </section>`;
}

export function divider(n) {
  return `    <div class="sec-divider" aria-hidden="true"><img src="../images/dividers/div-${String(n).padStart(2, '0')}.webp" alt="" loading="lazy"></div>`;
}
