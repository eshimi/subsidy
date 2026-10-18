// 地域別ページ・制度ページで共有する、サイト共通の見た目（ヘッダー・フッター・スタイル）
import { topnavHtml, footerNavHtml, footerBottomHtml } from './nav.mjs';
import { splitLayout } from './side-layout.mjs';
import { applyBanner } from './banners.mjs';
import { addSectionIcons, addSectionDividers } from './section-icons.mjs';
import { compactFlow } from './flow-compact.mjs';
import { padDescription } from './seo.mjs';

export const SITE = 'https://hojyokin.net';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const STYLE = `
    .art-box { background: #fff; border: 1px solid #e6e8ec; border-radius: 12px; padding: 30px 36px 26px; box-shadow: 0 2px 12px rgba(10, 35, 82, 0.06); margin: 0 0 24px; }
    .art-sec { margin: 0 0 1.8rem; scroll-margin-top: 72px; }
    .art-sec + .art-sec { padding-top: 0; }
    .art-sec h2 { display: flex; align-items: center; gap: 10px; font-size: 1.25rem; line-height: 1.5; letter-spacing: -0.02em; margin: 0 0 0.8rem; color: #0a2352; }
    .art-sec h2::before { content: ""; width: 5px; height: 1.2em; border-radius: 3px; background: #073461; flex-shrink: 0; }
    @media (max-width: 760px) { .art-box { padding: 20px 16px; } .art-sec h2 { font-size: 1.12rem; } }
    .area-section { background: white; border: 1px solid #e6e8ec; border-radius: 8px; padding: 32px; margin-bottom: 24px; scroll-margin-top: 72px; }
    .area-num { display: block; font-family: var(--font-mono); font-size: 0.75rem; color: var(--mute); text-transform: uppercase; margin-bottom: 8px; }
    .area-section h2 { font-size: 1.4rem; line-height: 1.5; letter-spacing: -0.02em; margin: 0 0 16px; color: #0a2352; }
    .area-body { max-width: 48em; line-height: 1.85; color: var(--ink); }
    .area-body p, .area-body li { margin-bottom: 0.7rem; }
    .area-body ul { margin: 0 0 1rem 1.5rem; padding: 0; }
    .area-program { border-top: 1px solid #e6e8ec; padding: 18px 0; }
    .area-program:first-child { border-top: 0; padding-top: 0; }
    .area-program h3 { font-size: 1.05rem; margin: 0 0 6px; color: #0a2352; }
    .area-toc { background: #fff; border: 1px solid #e6e8ec; border-radius: 8px; padding: 16px 22px; margin: 0 0 24px; }
    .area-toc-title { margin: 0 0 8px; font-weight: 700; color: #0a2352; }
    .area-toc ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
    .area-toc li > a { font-weight: 500; }
    .area-toc li b { margin-left: 8px; font-size: 0.88rem; color: #073461; }
    .area-toc-cats { display: flex; flex-wrap: wrap; gap: 4px 6px; margin: 4px 0 0 0; }
    .area-toc-cats a { font-size: 0.8rem; padding: 1px 10px; border-radius: 999px; background: #eaf3fd; color: #073461; text-decoration: none; }
    .area-meta { font-size: 0.88rem; color: var(--mute); margin: 0 0 8px; }
    .area-links { display: flex; flex-wrap: wrap; gap: 12px 24px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #e6e8ec; }
    .area-links a { color: #2b65b1; font-weight: 500; text-decoration: none; }
    .area-links a:hover { text-decoration: underline; }
    .area-title-img { display: inline-block; height: 72px; width: auto; margin-left: 12px; vertical-align: middle; }
    .area-crumb { font-size: 0.85rem; color: var(--mute); margin-bottom: 1.5rem; }
    .area-crumb a { color: var(--mute); }
    .area-note { font-size: 0.9rem; color: var(--mute); line-height: 1.8; border-left: 3px solid #e6e8ec; padding-left: 16px; margin: 2rem 0 0; max-width: 48em; }
    .area-groups { display: grid; gap: 28px; }
    .area-groups h2 { font-size: 1.2rem; margin: 0; }
    .area-pref-head { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
    .area-pref-head img { width: 96px; height: auto; flex-shrink: 0; }
    h1.display { font-size: clamp(1.4rem, 4.7vw, 3rem); overflow-wrap: anywhere; }
    .article-hero { margin: 0 0 24px; }
    .article-hero img { display: block; width: 100%; height: auto; border-radius: 8px; border: 1px solid #e6e8ec; }
    .article-body h3 { font-size: 1.2rem; margin: 1.6em 0 0.7em; }
    .article-body ol { margin: 0 0 1rem 1.5rem; padding: 0; }
    .article-body a { color: #2b65b1; text-decoration: underline; }
    .article-highlight { background: #f0f5ff; border-left: 3px solid #2b65b1; padding: 14px 18px; margin: 1.2rem 0; border-radius: 4px; }
    .area-pref-link { margin: 0 0 12px; font-size: 0.9rem; }
    .area-pref-link a { color: #2b65b1; text-decoration: none; }
    .area-pref-link a:hover { text-decoration: underline; }
    .area-groups ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px 16px; }
    .area-groups a { color: #2b65b1; text-decoration: none; }
    .area-groups a:hover { text-decoration: underline; }
    .ar-hero { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 20px; align-items: center; background: #faf3e6; border-radius: 16px; padding: 24px 30px; margin: 4px 0 18px; }
    .ar-kicker { margin: 0; color: #c9411a; font-weight: 700; font-size: 14px; }
    .ar-hero h1 { margin: 4px 0 8px; font-family: var(--font-display); font-size: clamp(1.4rem, 3.4vw, 1.9rem); line-height: 1.4; color: #0a2352; }
    .ar-hero h1 em { font-style: normal; font-size: 0.6em; color: var(--mute); margin-left: 6px; white-space: nowrap; }
    .ar-lead { margin: 0 0 14px; line-height: 1.8; color: var(--ink); }
    .ar-btns { margin: 0; display: flex; flex-wrap: wrap; gap: 10px; }
    .ar-btn { display: inline-flex; align-items: center; border-radius: 999px; padding: 9px 20px; font-weight: 700; font-size: 14px; text-decoration: none; }
    .ar-btn.p { background: #f8602f; color: #fff; }
    .ar-btn.s { background: #fff; border: 2px solid #073461; color: #073461; padding: 7px 18px; }
    .ar-hero-img { height: 150px; width: auto; max-width: 240px; object-fit: contain; }
    .ar-goals { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; margin: 0 0 24px; }
    .ar-goals a, .ar-goals .is-none { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 14px 6px; border-radius: 12px; background: #fff; box-shadow: 0 2px 10px rgba(10, 35, 82, 0.1); border-bottom: 3px solid #2b65b1; text-decoration: none; text-align: center; transition: transform 0.15s, box-shadow 0.15s; }
    .ar-goals a:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(10, 35, 82, 0.18); }
    .ar-goals .is-none { opacity: 0.55; border-bottom-color: #cdd3dd; box-shadow: none; border: 1px dashed #cdd3dd; }
    .ar-goals i { font-style: normal; font-size: 26px; line-height: 1.2; }
    .ar-goals b { color: #0a2352; font-size: 14px; }
    .ar-goals small { color: var(--mute); font-size: 12px; }
    .area-cat span { margin-left: 10px; font-size: 0.8rem; font-weight: 500; color: var(--mute); }
    .ar-table { border: 1px solid #e6e8ec; border-radius: 10px; overflow: hidden; margin: 0 0 22px; }
    .ar-head, .ar-row { display: grid; grid-template-columns: minmax(0, 1fr) 200px 56px; gap: 12px; align-items: center; padding: 12px 16px; }
    .ar-head { background: #f2f5fa; color: var(--mute); font-size: 12px; font-weight: 700; padding-top: 9px; padding-bottom: 9px; }
    .ar-row { border-top: 1px solid #e6e8ec; scroll-margin-top: 72px; }
    .ar-row:target { background: #fff8e6; }
    .ar-row.is-ended { opacity: 0.6; }
    .ar-tag { display: inline-block; margin-right: 8px; font-size: 11px; font-weight: 700; padding: 1px 9px; border-radius: 999px; background: #e8f2ec; color: #1f5d39; line-height: 1.6; vertical-align: 1px; }
    .ar-name b { display: block; color: #0a2352; font-size: 15px; line-height: 1.5; }
    .ar-name small { display: block; margin-top: 3px; color: var(--mute); font-size: 12.5px; line-height: 1.7; }
    .ar-prov { display: block; margin-top: 3px; color: #8a96a8; font-size: 12px; }
    .ar-amt { font-weight: 700; color: #c9411a; font-size: 14px; line-height: 1.6; }
    .ar-amt-na { font-weight: 500; color: var(--mute); }
    .ar-go { color: #2b65b1; font-weight: 700; font-size: 13px; text-align: right; text-decoration: none; white-space: nowrap; }
    .ar-go:hover { text-decoration: underline; }
    @media (max-width: 760px) {
      .ar-hero { grid-template-columns: minmax(0, 1fr); padding: 20px 18px; }
      .ar-hero-img { display: none; }
      .ar-goals { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .ar-head { display: none; }
      .ar-row { grid-template-columns: minmax(0, 1fr) auto; gap: 6px 10px; }
      .ar-name { grid-column: 1 / 3; }
      .ar-amt { grid-column: 1; }
      .ar-go { grid-column: 2; }
    }
    @media (max-width: 760px) { .area-section { padding: 22px; } .area-section h2 { font-size: 1.2rem; } .area-title-img { height: 48px; } }`;

// 共通ヘッダー・フッター（columns.html と同じ構成）。「地域別」は お役立ち情報 の中の項目
// 記事の各見出しの枠（area-section）を、1つの記事の枠にまとめる。
// 連続する見出しのまとまりを <div class="art-box"> で包み、見出しごとの枠と番号は外す。
export function boxSections(html, prefix = '') {
  const sec = html.replace(/<(?:article|section) class="area-section"([^>]*)>\s*(?:<span class="area-num">[^<]*<\/span>\s*)?/g, '<section class="art-sec"$1>');
  const withEnds = sec.replace(/(<section class="art-sec"[\s\S]*?)<\/article>/g, '$1</section>');
  const boxed = withEnds.replace(/(?:<section class="art-sec"[\s\S]*?<\/section>)(?:\s*<section class="art-sec"[\s\S]*?<\/section>)*/g, (run) => `<div class="art-box">\n${run}\n</div>`);
  return compactFlow(addSectionDividers(addSectionIcons(boxed, prefix), prefix));
}

function shell({ title, description: rawDescription, canonicalPath, body, jsonLd = '', robots = 'index, follow' }) {
  const description = padDescription(rawDescription);
  // 現在のページ（public/ からのパス）。メニューの現在地の表示に使う
  const current = canonicalPath.replace(/^\//, '') || 'index.html';
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="${robots}">
  <link rel="canonical" href="${SITE}${canonicalPath}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="補助金ネット">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${SITE}${canonicalPath}">
  <meta property="og:image" content="${SITE}/images/og-image.png">
  <meta property="og:locale" content="ja_JP">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${SITE}/images/og-image.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700;900&family=IBM+Plex+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="../style.css">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96">
  <link rel="icon" href="/favicon-192x192.png" type="image/png" sizes="192x192">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <style>${STYLE}
  </style>
${jsonLd}  <meta name="google-adsense-account" content="ca-pub-7811993263471350">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7811993263471350"
     crossorigin="anonymous"></script>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-J5DWZQLCB0"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-J5DWZQLCB0');
  </script>
</head>
<body>
  <header class="topbar">
    <div class="wrap topbar-inner">
      <a class="wordmark" href="../" aria-label="補助金ネット トップ"><img src="../images/logo-header-v5.webp" alt="補助金ネット"></a>
      <nav class="topnav" id="topnav" aria-label="サイト内">
${topnavHtml('../', current)}
      </nav>
      <button type="button" class="nav-toggle" aria-controls="topnav" aria-expanded="false">メニュー</button>
    </div>
  </header>

  <main class="wrap">
${boxSections(splitLayout(applyBanner(body, current), current) ?? applyBanner(body, current), '../'.repeat(current.split('/').length - 1))}
  </main>

  <footer class="footer">
    <div class="wrap footer-top">
      <div class="footer-info">
        <a class="footer-brand" href="../" aria-label="補助金ネット トップ"><img src="../images/logo-header-v5.webp" alt="補助金ネット" width="200" height="60"></a>
        <p>事業者・個人のための補助金サイト</p>
        <p class="footer-source">募集中の補助金データ：<a href="https://www.jgrants-portal.go.jp/" target="_blank" rel="noopener">jGrants（デジタル庁）</a><br>住所検索：<a href="https://zipcloud.ibsnet.co.jp/" target="_blank" rel="noopener">zipcloud</a></p>
        <p class="footer-contact">運営者：<a href="../policy/about.html">運営者情報</a><br>お問い合わせ：<a href="../policy/contact.html">フォーム</a></p>
        <figure class="footer-qr">
          <img src="../images/qr-hojyokin.png" alt="補助金ネット（hojyokin.net）へのQRコード" width="120" height="120" loading="lazy">
          <figcaption>スマホで開く</figcaption>
        </figure>
      </div>
      <nav class="footer-nav" aria-label="フッター">
${footerNavHtml('../', current)}
        </nav>
    </div>
    <div class="footer-bottom">
${footerBottomHtml('../')}
      <p class="footer-copy">Copyright © 2026 補助金ネット. All rights reserved.</p>
    </div>
  </footer>
  <script src="../site.js"></script>
</body>
</html>
`;
}

export { esc, shell };
