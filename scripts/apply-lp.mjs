// 主要ページのランディングページ化：ページ上部に、写真つきのコンパクトなヒーロー（見出し・リード・ボタン）、要点の帯、
// 「いま知りたいこと」への近道（ページ内ジャンプ・買うもの・最新ニュース）を入れ、末尾に相談への呼びかけを入れる（何度実行しても同じ結果になる）。
// 見出し（pb-title）と og:image 用のバナーのマークアップは、ヒーローの中に残す（apply-seo が使うため）。CSS は public/style.css の .lp-*。
// 使い方：node scripts/apply-lp.mjs（生成物はコミットする。build:grants には入れない）
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', 'public');
const HERO = ['<!-- lp-hero -->', '<!-- /lp-hero -->'];
const END = ['<!-- lp-end -->', '<!-- /lp-end -->'];

// ページごとの設定。pic：ヒーロー右の小さな挿絵（public/images/lp/、切り抜き）、bg：その挿絵の背景色。facts：要点の帯（ページ内の記述にあるものだけ）、jump：ページ内の節（見出しの文字で探す）、buy：買うものの解説、newsKey：最新ニュースのファイル名に含まれる語
export const PAGES = {
  'feature/jizokuka.html': {
    kicker: '特集｜小規模事業者持続化補助金',
    pic: 'lp-jizokuka.webp', bg: '#f9f5f0',
    facts: [['補助上限', '通常枠 50万円（第20回）／創業型 最大250万円'], ['窓口', '地元の商工会・商工会議所'], ['お金の流れ', '経費を先に払い、後から受け取る'], ['主な使い道', '広告・HP・看板・設備など']],
    jump: [['制度の概要', '概要'], ['対象になる人', '対象になる人'], ['申請の流れ（一般的な例）', '申請の流れ'], ['よくある失敗', 'よくある失敗'], ['よくある質問', 'よくある質問']],
    buy: [['it-website', 'ホームページ・広告'], ['store-signage', '看板・外装'], ['store-renovation', '店舗の改装'], ['it-ec', 'ネットショップ・EC'], ['store-pos', 'POSレジ・会計機器'], ['it-promotion', '広告・チラシ・販促物']],
    newsKey: 'jizokuka',
    searchQ: '持続化補助金',
  },
  'feature/digital-subsidy.html': {
    kicker: '特集｜デジタル化・AI導入補助金',
    pic: 'lp-digital.webp', bg: '#fbf4e6',
    facts: [['対象', '登録されたITツール（クラウド利用料を含む）'], ['申請', 'IT導入支援事業者と一緒に（8ステップ）'], ['事前準備', 'gBizIDプライムの取得'], ['対象者', '個人事業主・法人']],
    jump: [['デジタル補助金の主な種類', '主な種類'], ['対象になるもの・ならないもの', '対象になるもの'], ['申請の流れ（8ステップ）', '申請の流れ'], ['よくある失敗', 'よくある失敗'], ['よくある質問', 'よくある質問']],
    buy: [['it-ai', 'AIツール'], ['it-software', '会計・予約・顧客管理ソフト'], ['it-pc', '業務用PC'], ['it-ec', 'ネットショップ・EC'], ['it-security', 'セキュリティ対策'], ['store-pos', 'POSレジ・会計機器']],
    newsKey: 'digital-ai',
    searchQ: 'デジタル化・AI導入補助金',
  },
  'feature/shoryokuka.html': {
    kicker: '特集｜中小企業省力化投資補助金',
    pic: 'lp-shoryokuka.webp', bg: '#faf8f1',
    facts: [['仕組み', '製品をカタログから選ぶ（カタログ注文型）'], ['目的', '人手不足を、機械・ロボットで補う'], ['対象', '中小企業・小規模事業者'], ['金額', '公式の最新情報で確認']],
    jump: [['制度の概要', '概要'], ['対象になる人', '対象になる人'], ['申請の流れ（一般的な例）', '申請の流れ'], ['よくある失敗', 'よくある失敗'], ['よくある質問', 'よくある質問']],
    buy: [['store-robot', 'ロボット・自動化装置'], ['store-machine', '機械・生産設備'], ['store-kitchen', '厨房機器'], ['store-refrigeration', '冷蔵・冷凍設備'], ['store-pos', 'POSレジ・券売機'], ['store-energy', '省エネ設備']],
    newsKey: 'shoryokuka',
    searchQ: '省力化投資補助金',
  },
  'feature/monodukuri.html': {
    kicker: '特集｜新事業進出・ものづくり商業サービス補助金',
    pic: 'lp-monodukuri.webp', bg: '#fbf3e8',
    facts: [['制度', '新事業進出・ものづくり商業サービス補助金'], ['向く投資', '新しい製品・サービス、新事業への設備投資'], ['申請', '電子申請（gBizIDプライムが必要）'], ['金額', '枠・公募回ごと。公式で確認']],
    jump: [['制度の名称の移り変わり', '名称の移り変わり'], ['枠の考え方', '枠の考え方'], ['対象になる人', '対象になる人'], ['申請の流れ（一般的な例）', '申請の流れ'], ['よくある失敗', 'よくある失敗'], ['よくある質問', 'よくある質問']],
    buy: [['store-machine', '機械・生産設備'], ['store-robot', 'ロボット・自動化装置'], ['store-renovation', '店舗の改装'], ['startup-product', '新商品の開発'], ['startup-overseas', '海外展開'], ['store-energy', '省エネ設備']],
    newsKey: 'shinjigyo', searchQ: 'ものづくり補助金',
  },
  'feature/growth.html': {
    kicker: '特集｜中小企業成長加速化補助金',
    pic: 'lp-growth.webp', bg: '#faf7f1',
    facts: [['対象', '売上高10億円以上100億円未満の中小企業'], ['補助上限', '5億円（補助率1/2）'], ['投資額', '1億円以上'], ['事業期間', '交付決定から24か月以内']],
    jump: [['どんな企業向けか', 'どんな企業向けか'], ['対象になりやすい投資（例）', '対象になりやすい投資'], ['申請の前に確認すること', '申請の前に'], ['よくある質問', 'よくある質問']],
    buy: [['store-machine', '機械・生産設備'], ['store-robot', 'ロボット・自動化装置'], ['store-energy', '省エネ設備'], ['startup-overseas', '海外展開'], ['startup-product', '新商品の開発'], ['store-renovation', '店舗の改装']],
    newsKey: 'seicho', searchQ: '成長加速化補助金',
  },
  'feature/succession.html': {
    kicker: '特集｜事業承継・M&A補助金',
    pic: 'lp-succession.webp', bg: '#faf3e6',
    facts: [['対象', '中小企業・小規模事業者（引継ぎやM&Aの当事者）'], ['名称', '事業承継・M&A補助金'], ['枠', '承継・M&A・廃業など、段階ごとに分かれる'], ['金額', '枠と回で異なる。公式で確認']],
    jump: [['制度の概要', '概要'], ['対象になる人', '対象になる人'], ['補助の対象になりやすい費用（例）', '対象になりやすい費用'], ['申請の流れ（一般的な例）', '申請の流れ'], ['よくある失敗', 'よくある失敗'], ['よくある質問', 'よくある質問']],
    buy: [['startup-succession', '事業承継・M&Aの解説'], ['store-machine', '設備の更新'], ['it-software', '会計・予約・顧客管理ソフト'], ['people-hiring', '正社員化・採用'], ['people-training', '研修・リスキリング']],
    newsKey: '', searchQ: '事業承継',
  },
  'feature/employment.html': {
    kicker: '特集｜雇用関係の助成金',
    pic: 'lp-employment.webp', bg: '#faf3e5',
    facts: [['所管', '厚生労働省の助成金'], ['特徴', '要件を満たせば受け取れるものが多い'], ['主な助成金', 'キャリアアップ・人材開発・業務改善など'], ['金額', '助成金ごとに違う。公式で確認']],
    jump: [['主な助成金', '主な助成金'], ['受け取るための基本的な条件', '基本的な条件'], ['申請の流れ（一般的な例）', '申請の流れ'], ['よくある質問', 'よくある質問']],
    buy: [['people-hiring', '正社員化・採用'], ['people-wage', '賃上げ'], ['people-training', '研修・リスキリング'], ['people-balance', '育児・介護との両立'], ['people-workplace', '職場環境の改善'], ['people-safety', '安全衛生']],
    newsKey: 'gyomu-kaizen', searchQ: '雇用 助成金',
  },
  'feature/popular.html': {
    kicker: '特集｜特に人気の5つの補助金',
    pic: 'lp-popular.webp', bg: '#fcf5ea',
    facts: [['販路開拓', '小規模事業者持続化補助金'], ['IT・AI', 'デジタル化・AI導入補助金'], ['新事業・設備', '新事業進出・ものづくり補助金'], ['省力化・承継', '省力化投資補助金／事業承継・M&amp;A補助金']],
    jump: [['1. 小規模事業者持続化補助金', '持続化補助金'], ['2. IT導入補助金（デジタル化・AI導入補助金）', 'デジタル化・AI導入'], ['3. 新事業進出・ものづくり商業サービス補助金', '新事業進出・ものづくり'], ['4. 中小企業省力化投資補助金', '省力化投資'], ['5. 事業承継・M&amp;A補助金', '事業承継・M&amp;A']],
    buy: [['it-website', 'ホームページ・広告'], ['it-ai', 'AIツール'], ['store-machine', '機械・生産設備'], ['store-robot', 'ロボット・自動化装置'], ['startup-succession', '事業承継・M&amp;A'], ['store-pos', 'POSレジ・会計機器']],
    newsKey: 'deadline', searchQ: '補助金',
  },
};

// 各コーナーのトップ（一覧）のページ：ヒーローだけ入れる（要点の帯・近道・末尾の呼びかけは入れない）
const HUB_BTNS = [['補助金を探す', '../search.html', 'p'], ['AIで確かめる', '../hantei.html', 's']];
const hub = (kicker, pic, bg) => ({ hub: true, kicker, pic, bg });
Object.assign(PAGES, {
  'basics/index.html': hub('基礎知識', 'lp-employment.webp', '#faf3e5'),
  'blog/index.html': hub('ブログ', 'lp-growth.webp', '#faf7f1'),
  'feature/index.html': hub('特集', 'lp-shoryokuka.webp', '#faf8f1'),
  'cases/index.html': hub('活用事例', 'lp-succession.webp', '#faf3e6'),
  'news/index.html': hub('補助金ニュース', 'lp-jizokuka.webp', '#f9f5f0'),
  'who/index.html': hub('対象者別', 'lp-popular.webp', '#fcf5ea'),
  'background/index.html': hub('制度の背景ガイド', 'lp-thread.webp', '#faf4e7'),
  'compare/index.html': hub('比較記事', 'lp-monodukuri.webp', '#fbf3e8'),
  'research/index.html': hub('補助金データ', 'lp-digital.webp', '#fbf4e6'),
});

const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const strip = (h) => h.replace(/<[^>]+>/g, '').trim();

function newsOf(key) {
  const dir = join(ROOT, 'news');
  return !key ? [] : readdirSync(dir).filter((f) => f.endsWith('.html') && f.includes(key)).sort().reverse().slice(0, 3).map((f) => {
    const t = (readFileSync(join(dir, f), 'utf-8').match(/<title>([^<]*)<\/title>/) || [])[1] || f;
    return { href: `../news/${f}`, date: f.slice(5, 10).replace('-', '/'), title: t.replace(/｜補助金ネット$/, '') };
  });
}

export function heroHtml(html, cfg) {
  const title = strip((html.match(/<h1 class="pb-title"[^>]*>([\s\S]*?)<\/h1>/) || html.match(/<h1 class="display"[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
  const bannerStyle = (html.match(/<div class="pb-banner" style="([^"]*)"/) || [])[1] || '';
  const lead = strip((html.match(/<p class="lp-s">([\s\S]*?)<\/p>/) || html.match(/<p class="lead"[^>]*>([\s\S]*?)<\/p>/) || [])[1] || '');
  const ids = Object.fromEntries([...html.matchAll(/<h2 id="(s\d+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => [strip(m[2]), m[1]]));
  const jump = (cfg.jump || []).filter(([h]) => ids[h]).map(([h, label]) => `<a href="#${ids[h]}">${label}</a>`).join('');
  const news = newsOf(cfg.newsKey);
  const meta = (html.match(/<p class="fx-meta"[\s\S]*?<\/p>/) || [''])[0];
  return `${HERO[0]}
    <section class="lp-hero" aria-labelledby="lp-title" style="background-color: ${cfg.bg}">
      <img class="lp-pic" src="../images/lp/${cfg.pic}" alt="" width="500" height="190" loading="lazy">
      <div class="lp-in">
        <p class="lp-k">${cfg.kicker}</p>
        <div class="pb-banner"${bannerStyle ? ` style="${attr(bannerStyle)}"` : ''}><h1 class="pb-title" id="lp-title">${title}</h1></div>
        <p class="lp-s">${lead}</p>
        ${btnsHtml(cfg)}
      </div>
    </section>${cfg.hub ? '' : lpBody(cfg, jump, news, meta)}
    ${HERO[1]}`;
}

function lpBody(cfg, jump, news, meta) {
  return `
    <div class="lp-facts"><dl class="lp-fi">${cfg.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div>${meta ? `\n    ${meta}` : ''}
    <section class="lp-next" aria-label="このページの使い方">
      <div class="lp-row"><span class="lp-rl">このページで知る</span><nav class="lp-chips" aria-label="ページ内の節">${jump}</nav></div>
      <div class="lp-row"><span class="lp-rl">何に使いたい？</span><nav class="lp-chips" aria-label="買うものから探す">${cfg.buy.map(([f, t]) => `<a href="${f.startsWith('it-') ? '../hitsuyo/' : '../hitsuyo/'}${f}.html">${t}</a>`).join('')}<a class="more" href="../hitsuyo.html#hp-buy">すべて見る →</a></nav></div>
      <div class="lp-row"><span class="lp-rl">最新のニュース</span><ul class="lp-news">${news.map((n) => `<li><time>${n.date}</time><a href="${n.href}">${n.title}</a></li>`).join('')}<li class="more"><a href="../search.html?q=${encodeURIComponent(cfg.searchQ)}">募集中の公募を探す →</a></li></ul></div>
    </section>`;
}

const btnsHtml = (cfg) => {
  const b = cfg.hub ? HUB_BTNS : [['対象になるか、AIで確かめる', '../hantei.html', 'p'], ['無料で相談する', '../consult.html', 's']];
  return `<div class="lp-btns">${b.map(([t, h, c]) => `<a class="lp-btn ${c}" href="${h}">${t}${c === 'p' ? ' <span aria-hidden="true">→</span>' : ''}</a>`).join('')}</div>`;
};

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
    const re = /(?:<div class="fx-hero">\s*)?<div class="pb-banner"[^>]*><h1 class="pb-title">[\s\S]*?<\/h1><\/div>(?:\s*<\/div>\s*<div class="fx-lead">[\s\S]*?<\/p>\s*<p class="lead">[\s\S]*?<\/p>\s*<\/div>|\s*<div style="margin-bottom: [\d.]+rem;">[\s\S]*?<\/div>)/;
    const re2 = /<div style="margin-bottom: [\d.]+rem;">\s*<h1 class="display"[^>]*>[\s\S]*?<\/h1>\s*<p class="lead"[^>]*>[\s\S]*?<\/p>\s*<\/div>/;
    const target = re.test(out) ? re : re2;
    if (!target.test(out)) throw new Error('ページ上部のバナーが見つかりません');
    out = out.replace(target, () => heroHtml(out, cfg));
  }
  out = strip2(out, END);
  if (cfg.hub) return out;
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
