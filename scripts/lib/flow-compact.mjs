// 記事の「申請の流れ（一般的な例）」の節の手順（<ol>）を、番号つきで横に並べる短い表示にする（特集・個人向けなど）。
// 生成ページは site-shell.mjs の boxSections から、公開済みのページは scripts/apply-flow-compact.mjs から呼ぶ。何度実行しても同じ結果。
const RE = /(<section class="art-sec" aria-labelledby="[^"]*"><h2[^>]*>(?:<img[^>]*>)?申請の流れ（一般的な例）<\/h2>\s*<div class="area-body">\s*)<ol>([\s\S]*?)<\/ol>/g;

export function compactFlow(html) {
  return html.replace(RE, (m, head, items) => {
    const lis = [...items.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((x) => x[1].trim());
    if (lis.length < 2) return m;
    return `${head}<ol class="flow-mini">\n${lis.map((t, i) => `          <li><span class="flow-mini-no">${i + 1}</span><span>${t}</span></li>`).join('\n')}\n        </ol>`;
  });
}
