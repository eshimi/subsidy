// 地域別ページ・制度ページで共有する、サイト共通の見た目（ヘッダー・フッター・スタイル）
import { topnavHtml, footerNavHtml, footerBottomHtml } from './nav.mjs';
import { splitLayout } from './side-layout.mjs';
import { applyBanner } from './banners.mjs';

export const SITE = 'https://hojyokin.net';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const STYLE = `
    .art-box { background: #fff; border: 1px solid #e6e8ec; border-radius: 12px; padding: 30px 36px 26px; box-shadow: 0 2px 12px rgba(10, 35, 82, 0.06); margin: 0 0 24px; }
    .art-sec { margin: 0 0 1.8rem; scroll-margin-top: 72px; }
    .art-sec + .art-sec { border-top: 1px dashed #e6e8ec; padding-top: 1.6rem; }
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
    @media (max-width: 760px) { .area-section { padding: 22px; } .area-section h2 { font-size: 1.2rem; } .area-title-img { height: 48px; } }`;

// 共通ヘッダー・フッター（columns.html と同じ構成）。「地域別」は お役立ち情報 の中の項目
// 記事の各見出しの枠（area-section）を、1つの記事の枠にまとめる。
// 連続する見出しのまとまりを <div class="art-box"> で包み、見出しごとの枠と番号は外す。
export function boxSections(html) {
  const sec = html.replace(/<(?:article|section) class="area-section"([^>]*)>\s*(?:<span class="area-num">[^<]*<\/span>\s*)?/g, '<section class="art-sec"$1>');
  const withEnds = sec.replace(/(<section class="art-sec"[\s\S]*?)<\/article>/g, '$1</section>');
  return withEnds.replace(/(?:<section class="art-sec"[\s\S]*?<\/section>)(?:\s*<section class="art-sec"[\s\S]*?<\/section>)*/g, (run) => `<div class="art-box">\n${run}\n</div>`);
}

function shell({ title, description, canonicalPath, body, jsonLd = '', robots = 'index, follow' }) {
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
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180.png">
  <style>${STYLE}
  </style>
${jsonLd}  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7811993263471350"
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
      <span class="edition">JP — FY2026</span>
    </div>
  </header>

  <main class="wrap">
${boxSections(splitLayout(applyBanner(body, current), current) ?? applyBanner(body, current))}
  </main>

  <footer class="footer">
    <div class="wrap footer-top">
      <div class="footer-info">
        <a class="footer-brand" href="../" aria-label="補助金ネット トップ"><img src="../images/logo-header-v5.webp" alt="補助金ネット" width="200" height="60"></a>
        <p>事業者の補助金・助成金・支援制度を、目的・地域・締切から探せるサイトです。創業や副業を始める方向けの解説も載せています。</p>
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
