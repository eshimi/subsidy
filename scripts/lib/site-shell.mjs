// 地域別ページ・制度ページで共有する、サイト共通の見た目（ヘッダー・フッター・スタイル）
export const SITE = 'https://hojyokin.net';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const STYLE = `
    .area-section { background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 32px; margin-bottom: 24px; scroll-margin-top: 72px; }
    .area-num { display: block; font-family: var(--font-mono); font-size: 0.75rem; color: var(--mute); text-transform: uppercase; margin-bottom: 8px; }
    .area-section h2 { font-size: 1.4rem; line-height: 1.5; letter-spacing: -0.02em; margin: 0 0 16px; color: #111; }
    .area-body { max-width: 48em; line-height: 1.85; color: var(--ink); }
    .area-body p, .area-body li { margin-bottom: 0.7rem; }
    .area-body ul { margin: 0 0 1rem 1.5rem; padding: 0; }
    .area-program { border-top: 1px solid #e0e0e0; padding: 18px 0; }
    .area-program:first-child { border-top: 0; padding-top: 0; }
    .area-program h3 { font-size: 1.05rem; margin: 0 0 6px; color: #111; }
    .area-meta { font-size: 0.88rem; color: var(--mute); margin: 0 0 8px; }
    .area-links { display: flex; flex-wrap: wrap; gap: 12px 24px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #e0e0e0; }
    .area-links a { color: #1f3bff; font-weight: 500; text-decoration: none; }
    .area-links a:hover { text-decoration: underline; }
    .area-title-img { display: inline-block; height: 72px; width: auto; margin-left: 12px; vertical-align: middle; }
    .area-crumb { font-size: 0.85rem; color: var(--mute); margin-bottom: 1.5rem; }
    .area-crumb a { color: var(--mute); }
    .area-note { font-size: 0.9rem; color: var(--mute); line-height: 1.8; border-left: 3px solid #e0e0e0; padding-left: 16px; margin: 2rem 0 0; max-width: 48em; }
    .area-groups { display: grid; gap: 28px; }
    .area-groups h2 { font-size: 1.2rem; margin: 0; }
    .area-pref-head { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
    .area-pref-head img { width: 96px; height: auto; flex-shrink: 0; }
    .area-pref-link { margin: 0 0 12px; font-size: 0.9rem; }
    .area-pref-link a { color: #1f3bff; text-decoration: none; }
    .area-pref-link a:hover { text-decoration: underline; }
    .area-groups ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px 16px; }
    .area-groups a { color: #1f3bff; text-decoration: none; }
    .area-groups a:hover { text-decoration: underline; }
    @media (max-width: 760px) { .area-section { padding: 22px; } .area-section h2 { font-size: 1.2rem; } .area-title-img { height: 48px; } }`;

// 共通ヘッダー・フッター（columns.html と同じ構成）。「地域別」は お役立ち情報 の中の項目
function shell({ title, description, canonicalPath, body, jsonLd = '' }) {
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow">
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
</head>
<body>
  <header class="topbar">
    <div class="wrap topbar-inner">
      <a class="wordmark" href="../" aria-label="補助金ネット トップ"><img src="../images/logo-header-v5.webp" alt="補助金ネット"></a>
      <nav class="topnav" id="topnav" aria-label="サイト内">
        <a href="../">補助金を探す</a>
        <a href="../guide.html">使い方</a>
        <details class="navdrop">
          <summary>はじめの一歩</summary>
          <div class="navdrop-panel">
            <a href="../diagnosis.html">今日からできること診断</a>
            <a href="../chat.html">副業壁打ちAI</a>
            <a href="../beginner-guide.html">初心者向けガイド</a>
            <a href="../roadmap.html">創業のステップ</a>
          </div>
        </details>
        <details class="navdrop" data-current>
          <summary>お役立ち情報</summary>
          <div class="navdrop-panel">
            <a href="../columns.html">コラム</a>
            <a href="../real-life.html">補助金のリアル</a>
            <a href="../compare/index.html">比較記事</a>
            <a href="../grants/deadlines.html">締切が近い補助金</a>
            <a href="index.html" aria-current="page">地域別の補助金</a>
            <a href="../books.html">参考図書</a>
            <a href="../resources.html">参考リンク</a>
          </div>
        </details>
      </nav>
      <button type="button" class="nav-toggle" aria-controls="topnav" aria-expanded="false">メニュー</button>
      <span class="edition">JP — FY2026</span>
    </div>
  </header>

  <main class="wrap">
${body}
  </main>

  <footer class="footer">
    <div class="wrap footer-top">
      <div class="footer-info">
        <a class="footer-brand" href="../" aria-label="補助金ネット トップ"><img src="../images/logo-header-v5.webp" alt="補助金ネット" width="200" height="60"></a>
        <p>個人の新規事業・創業向けに、受けられそうな補助金・支援制度を探せるサイトです。</p>
        <p class="footer-source">募集中の補助金データ：<a href="https://www.jgrants-portal.go.jp/" target="_blank" rel="noopener">jGrants（デジタル庁）</a><br>住所検索：<a href="https://zipcloud.ibsnet.co.jp/" target="_blank" rel="noopener">zipcloud</a></p>
        <figure class="footer-qr">
          <img src="../images/qr-hojyokin.png" alt="補助金ネット（hojyokin.net）へのQRコード" width="120" height="120" loading="lazy">
          <figcaption>スマホで開く</figcaption>
        </figure>
      </div>
      <nav class="footer-nav" aria-label="フッター">
          <details class="footer-group">
            <summary>はじめの一歩</summary>
            <ul>
            <li><a href="../diagnosis.html">今日からできること診断</a></li>
            <li><a href="../chat.html">副業壁打ちAI</a></li>
            <li><a href="../beginner-guide.html">初心者向けガイド</a></li>
            <li><a href="../roadmap.html">創業のステップ</a></li>
            </ul>
          </details>
          <details class="footer-group">
            <summary>補助金を探す</summary>
            <ul>
            <li><a href="../">補助金を探す</a></li>
            <li><a href="../grants/deadlines.html">締切が近い補助金</a></li>
            <li><a href="../grants/index.html">制度一覧</a></li>
            <li><a href="../grants/prefectures.html">都道府県別の補助金</a></li>
            <li><a href="../area/index.html">地域別の補助金</a></li>
            </ul>
          </details>
          <details class="footer-group">
            <summary>お役立ち情報</summary>
            <ul>
            <li><a href="../columns.html">コラム</a></li>
            <li><a href="../real-life.html">補助金のリアル</a></li>
            <li><a href="../compare/index.html">比較記事</a></li>
            <li><a href="../books.html">参考図書</a></li>
            <li><a href="../resources.html">参考リンク</a></li>
            </ul>
          </details>
          <details class="footer-group">
            <summary>サイトについて</summary>
            <ul>
            <li><a href="../guide.html">使い方</a></li>
            <li><a href="../sitemap.html">サイトマップ</a></li>
            </ul>
          </details>
        </nav>
    </div>
    <div class="footer-bottom">
      <nav aria-label="補助リンク">
        <ul>
          <li><a href="../sitemap.html">サイトマップ</a></li>
          <li><a href="../guide.html#feedback">フィードバック・バグ報告</a></li>
          <li><a href="../resources.html">参考リンク</a></li>
        </ul>
      </nav>
      <p class="footer-copy">Copyright © 2026 補助金ネット. All rights reserved.</p>
    </div>
  </footer>
  <script src="../site.js"></script>
</body>
</html>
`;
}

export { esc, shell };
