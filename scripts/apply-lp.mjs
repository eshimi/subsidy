// 主要ページのランディングページ化：ページ上部に、写真つきのコンパクトなヒーロー（見出し・リード・ボタン）、要点の帯、
// 「いま知りたいこと」への近道（ページ内ジャンプ・買うもの・最新ニュース）を入れ、末尾に相談への呼びかけを入れる（何度実行しても同じ結果になる）。
// 見出し（pb-title）と og:image 用のバナーのマークアップは、ヒーローの中に残す（apply-seo が使うため）。CSS は public/style.css の .lp-*。
// 使い方：node scripts/apply-lp.mjs（生成物はコミットする。build:grants には入れない）
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', 'public');
const HERO = ['<!-- lp-hero -->', '<!-- /lp-hero -->'];
const END = ['<!-- lp-end -->', '<!-- /lp-end -->'];

// ページごとの設定。facts：要点の帯（ページ内の記述にあるものだけ）、jump：ページ内の節（見出しの文字で探す）、buy：買うものの解説、newsKey：最新ニュースのファイル名に含まれる語
export const PAGES = {
  'feature/jizokuka.html': {
    kicker: '特集｜小規模事業者持続化補助金',
    image: 'hero-04.webp',
    facts: [['補助上限', '通常枠 50万円（第20回）／創業型 最大250万円'], ['窓口', '地元の商工会・商工会議所'], ['お金の流れ', '経費を先に払い、後から受け取る'], ['主な使い道', '広告・HP・看板・設備など']],
    jump: [['制度の概要', '概要'], ['対象になる人', '対象になる人'], ['申請の流れ（一般的な例）', '申請の流れ'], ['よくある失敗', 'よくある失敗'], ['よくある質問', 'よくある質問']],
    buy: [['it-website', 'ホームページ・広告'], ['store-signage', '看板・外装'], ['store-renovation', '店舗の改装'], ['it-ec', 'ネットショップ・EC'], ['store-pos', 'POSレジ・会計機器'], ['it-promotion', '広告・チラシ・販促物']],
    newsKey: 'jizokuka',
    searchQ: '持続化補助金',
  },
};

const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const strip = (h) => h.replace(/<[^>]+>/g, '').trim();

function newsOf(key) {
  const dir = join(ROOT, 'news');
  return readdirSync(dir).filter((f) => f.endsWith('.html') && f.includes(key)).sort().reverse().slice(0, 3).map((f) => {
    const t = (readFileSync(join(dir, f), 'utf-8').match(/<title>([^<]*)<\/title>/) || [])[1] || f;
    return { href: `../news/${f}`, date: f.slice(5, 10).replace('-', '/'), title: t.replace(/｜補助金ネット$/, '') };
  });
}

export function heroHtml(html, cfg) {
  const title = strip((html.match(/<h1 class="pb-title"[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
  const bannerStyle = (html.match(/<div class="pb-banner" style="([^"]*)"/) || [])[1] || '';
  const lead = strip((html.match(/<p class="lp-s">([\s\S]*?)<\/p>/) || html.match(/<p class="lead"[^>]*>([\s\S]*?)<\/p>/) || [])[1] || '');
  const ids = Object.fromEntries([...html.matchAll(/<h2 id="(s\d+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => [strip(m[2]), m[1]]));
  const jump = cfg.jump.filter(([h]) => ids[h]).map(([h, label]) => `<a href="#${ids[h]}">${label}</a>`).join('');
  const news = newsOf(cfg.newsKey);
  return `${HERO[0]}
    <section class="lp-hero" aria-labelledby="lp-title">
      <div class="lp-art" style="background-image: url('../images/${cfg.image}')" aria-hidden="true"></div>
      <div class="lp-in">
        <p class="lp-k">${cfg.kicker}</p>
        <div class="pb-banner" style="${attr(bannerStyle)}"><h1 class="pb-title" id="lp-title">${title}</h1></div>
        <p class="lp-s">${lead}</p>
        <div class="lp-btns"><a class="lp-btn p" href="../hantei.html">対象になるか、AIで確かめる <span aria-hidden="true">→</span></a><a class="lp-btn s" href="../consult.html">無料で相談する</a></div>
      </div>
    </section>
    <div class="lp-facts"><dl class="lp-fi">${cfg.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div>
    <section class="lp-next" aria-label="このページの使い方">
      <div class="lp-row"><span class="lp-rl">このページで知る</span><nav class="lp-chips" aria-label="ページ内の節">${jump}</nav></div>
      <div class="lp-row"><span class="lp-rl">何に使いたい？</span><nav class="lp-chips" aria-label="買うものから探す">${cfg.buy.map(([f, t]) => `<a href="${f.startsWith('it-') ? '../hitsuyo/' : '../hitsuyo/'}${f}.html">${t}</a>`).join('')}<a class="more" href="../hitsuyo.html#hp-buy">すべて見る →</a></nav></div>
      <div class="lp-row"><span class="lp-rl">最新のニュース</span><ul class="lp-news">${news.map((n) => `<li><time>${n.date}</time><a href="${n.href}">${n.title}</a></li>`).join('')}<li class="more"><a href="../search.html?q=${encodeURIComponent(cfg.searchQ)}">募集中の公募を探す →</a></li></ul></div>
    </section>
    ${HERO[1]}`;
}

export function endHtml() {
  return `${END[0]}
    <aside class="lp-cta" aria-label="ご相談のご案内">
      <div><p class="lp-ct">対象になるか、迷ったら。</p><p class="lp-cd">いくつかの質問に答えるだけで、使えそうな補助金の候補が出ます。専門家への無料相談もあります。</p></div>
      <div class="lp-btns"><a class="lp-btn w" href="../hantei.html">AI補助金判定へ</a><a class="lp-btn s2" href="../consult.html">無料で相談する</a></div>
    </aside>
    ${END[1]}`;
}

export function apply(html, cfg) {
  const strip2 = (s, [a, b]) => (s.includes(a) ? s.replace(new RegExp(`\\s*${a}[\\s\\S]*?${b}`), '') : s);
  let out = html;
  if (out.includes(HERO[0])) {
    // 前回の分から見出し・リードを読み直す必要がないよう、いったん元の見出し部分を復元せず、置き換える
    const block = heroHtml(out.replace(/<!-- lp-hero -->[\s\S]*?<!-- \/lp-hero -->/, (m) => m), cfg);
    out = out.replace(/<!-- lp-hero -->[\s\S]*?<!-- \/lp-hero -->/, block);
  } else {
    const re = /<div class="pb-banner"[^>]*><h1 class="pb-title">[\s\S]*?<\/h1><\/div>\s*<div style="margin-bottom: 2rem;">[\s\S]*?<\/div>/;
    if (!re.test(out)) throw new Error('ページ上部のバナーが見つかりません');
    out = out.replace(re, () => heroHtml(out, cfg));
  }
  out = strip2(out, END);
  if (out.includes('<!-- /plan-cta -->')) out = out.replace('<!-- /plan-cta -->', `<!-- /plan-cta -->\n    ${endHtml()}`);
  else out = out.replace('</main>', `${endHtml()}\n  </main>`);
  return out;
}

if (process.argv[1] === import.meta.filename) {
  for (const [file, cfg] of Object.entries(PAGES)) {
    const p = join(ROOT, file);
    const before = readFileSync(p, 'utf-8');
    const after = apply(before, cfg);
    if (after !== before) writeFileSync(p, after);
    console.log(`${file}：${after !== before ? '更新' : '変更なし'}`);
  }
}
