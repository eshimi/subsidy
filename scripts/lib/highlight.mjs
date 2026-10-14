// コンテンツ系のページで、特に重要な部分に「太字＋蛍光ペン」（<strong class="hl">）を当てる。
// 強調する語句は scripts/data/highlights.mjs に、ページごとに書く（本文の文字列そのまま）。
// 当てるのは、段落・リストなどの本文の文字だけ（見出し・リンク・表の見出し・ナビ・既存の強調の中は除く）。
// 語句は1つのテキストの中に収まり、ページの中で1か所だけに現れるものに限る（複数あるものは、どれか決められないので当てない）。
const VOID = new Set(['br', 'img', 'hr', 'input', 'meta', 'link', 'source', 'wbr', 'col']);
const BODY = new Set(['p', 'li', 'dd', 'blockquote', 'td']);
const SKIP = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'strong', 'b', 'script', 'style', 'nav', 'aside', 'footer', 'header', 'button', 'summary', 'label', 'th', 'dt', 'figcaption', 'code', 'pre', 'title', 'select', 'option', 'textarea']);

// テキストのうち、強調を当ててよいもの：[{ start, end, text }]
export function eligibleTexts(html) {
  const out = [];
  const stack = [];
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>/g;
  let last = 0;
  const flush = (end) => {
    if (end <= last) return;
    const inBody = stack.some((t) => BODY.has(t));
    const skipped = stack.some((t) => SKIP.has(t));
    if (inBody && !skipped) out.push({ start: last, end, text: html.slice(last, end) });
  };
  for (let m; (m = re.exec(html));) {
    flush(m.index);
    last = m.index + m[0].length;
    if (m[0].startsWith('<!--')) continue;
    const closing = m[1] === '/';
    const name = m[2].toLowerCase();
    if (VOID.has(name) || m[3].trim().endsWith('/')) continue;
    if (closing) {
      const i = stack.lastIndexOf(name);
      if (i >= 0) stack.length = i;
    } else stack.push(name);
  }
  flush(html.length);
  return out;
}

// 語句を当てる。当てた数と、当てられなかった語句（なかった／複数あった）を返す
export function applyHighlights(html, phrases) {
  let out = html;
  const applied = [];
  const skipped = [];
  for (const phrase of phrases || []) {
    const nodes = eligibleTexts(out);
    const hits = [];
    for (const node of nodes) {
      let from = 0;
      for (let i; (i = node.text.indexOf(phrase, from)) >= 0; from = i + phrase.length) hits.push(node.start + i);
    }
    // すでに強調されている（このページを前に処理した）語句は、本文の文字としては見つからない
    if (hits.length !== 1) { skipped.push({ phrase, reason: hits.length ? `${hits.length}か所にある` : '本文に見つからない（または、すでに当てている）' }); continue; }
    out = `${out.slice(0, hits[0])}<strong class="hl">${phrase}</strong>${out.slice(hits[0] + phrase.length)}`;
    applied.push(phrase);
  }
  return { html: out, applied, skipped };
}

// すでに当てている語句の一覧
export const appliedPhrases = (html) => [...html.matchAll(/<strong class="hl">([^<]*)<\/strong>/g)].map((m) => m[1]);

// 一度当てたものを外して、データのとおりに当て直す（データを変えたとき用。何度実行しても同じ結果）
export function rehighlight(html, phrases) {
  const clean = html.replace(/<strong class="hl">([^<]*)<\/strong>/g, '$1');
  return applyHighlights(clean, phrases);
}
