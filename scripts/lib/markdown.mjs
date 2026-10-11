// ブログ記事（content/blog/*.md）を HTML にする、最小限の Markdown の変換。
// 対応：front matter（--- で囲んだ key: value）、## の見出し（記事の節）、### の小見出し、段落、
//       箇条書き（- と 1.）、引用（>）、**太字**、`コード`、[リンク](URL)
// 対応していない書き方（表・画像・コードブロックなど）は、そのまま文字として出る。
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const unquote = (s) => s.replace(/^(["'])(.*)\1$/, '$2');

function parseValue(v) {
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v.startsWith('[') && v.endsWith(']')) return v.slice(1, -1).split(',').map((s) => unquote(s.trim())).filter(Boolean);
  return unquote(v);
}

// 先頭の front matter を読む。無ければ data は空、body は全文
export function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: src };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) data[kv[1]] = parseValue(kv[2].trim());
  }
  return { data, body: src.slice(m[0].length) };
}

// 行の中の書式（コード・太字・リンク）。先に HTML を文字として逃がしてから、記号を変換する
export function inline(text) {
  let s = esc(text);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    // javascript: などの危険な URL は、リンクにせず文字だけ残す
    if (!/^(https?:\/\/|\/|\.{1,2}\/|#|[\w.\-/]+$)/.test(href)) return label;
    const ext = /^https?:\/\//.test(href);
    return `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`;
  });
  return s;
}

// 見出し以外の部分（段落・箇条書き・引用・小見出し）を HTML にする
export function blocksToHtml(md) {
  const out = [];
  let para = [];
  let list = null; // { tag, items }
  let quote = [];
  const flush = () => {
    if (para.length) { out.push(`<p>${para.map(inline).join('<br>')}</p>`); para = []; }
    if (list) { out.push(`<${list.tag}>\n${list.items.map((i) => `          <li>${inline(i)}</li>`).join('\n')}\n        </${list.tag}>`); list = null; }
    if (quote.length) { out.push(`<blockquote><p>${quote.map(inline).join('<br>')}</p></blockquote>`); quote = []; }
  };
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trimEnd();
    let m;
    if (!line.trim()) { flush(); continue; }
    if ((m = line.match(/^###\s+(.*)$/))) { flush(); out.push(`<h3>${inline(m[1])}</h3>`); continue; }
    if ((m = line.match(/^(?:-|\*)\s+(.*)$/))) {
      if (!list || list.tag !== 'ul') { flush(); list = { tag: 'ul', items: [] }; }
      list.items.push(m[1]);
      continue;
    }
    if ((m = line.match(/^\d+\.\s+(.*)$/))) {
      if (!list || list.tag !== 'ol') { flush(); list = { tag: 'ol', items: [] }; }
      list.items.push(m[1]);
      continue;
    }
    if ((m = line.match(/^>\s?(.*)$/))) {
      if (!quote.length) flush();
      quote.push(m[1]);
      continue;
    }
    if (list || quote.length) flush();
    para.push(line);
  }
  flush();
  return out.map((b) => `        ${b}`).join('\n');
}

// 本文を、## の見出しごとの節に分ける。最初の ## より前の文章は「はじめに」の節になる
export function renderPost(body) {
  const parts = body.split(/^##\s+(.+)$/m);
  const sections = [];
  const intro = parts[0].trim();
  if (intro) sections.push(['はじめに', blocksToHtml(intro)]);
  for (let i = 1; i < parts.length; i += 2) {
    sections.push([parts[i].trim(), blocksToHtml(parts[i + 1].trim())]);
  }
  return sections;
}
