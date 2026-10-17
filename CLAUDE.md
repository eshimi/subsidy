# 補助金ネット（https://hojyokin.net）作業メモ

ユーザーは日本語。**返答は常に日本語**。

## 構成
- 静的サイト生成（Node ESM の scripts/）＋ Cloudflare Workers（`src/worker.js` が `/api/*`、静的ファイルは `public/`）。
- 本番の自動更新: `.github/workflows/cloudflare.yml`（毎日 21:12 UTC / 手動）。`wrangler.jsonc` の build.command は `npm run build:grants`。
- データ: `LOCAL_PROGRAMS`（事業者向け自治体制度）、`RESIDENT_PROGRAMS`（個人向け）、`AREA_CITIES`、`data/*.json`（jgrants-details / research-history / jgrants-ids / analysis-latest / sitemap-lastmod / notices）。
- jGrants API はこの作業環境から取得できない（本番でのみ取れる）。

## 作業の決まり（毎回）
1. 変更は必ずコミットし、次の3つへプッシュ:
   - `claude/subsidy-finder-cloudflare-2oorwy` と `claude/business-subsidy-finder-2v9gwr`（早送りできるときだけ）
     `git fetch -q origin $b && git merge-base --is-ancestor origin/$b HEAD && git push -q origin HEAD:$b`
   - 作業ブランチ `design/jgrants-details`（`git push -q -f origin HEAD:design/jgrants-details`）
   - ネットワーク/500 エラーは間隔を空けて再試行。ユーザーが手動実行した GitHub Actions の最中はプッシュしない。
2. コミットメッセージの末尾に（モデル名は実行中のものに合わせる）:
   `Co-Authored-By: Claude <noreply@anthropic.com>` と `Claude-Session: <セッションURL>`
3. PR はユーザーが頼んだときだけ。
4. `public/index.html` / `public/search.html` の一覧は「読み込み中…」のプレースホルダーのままコミットする（prerender はデプロイ時に走る）。ローカルで prerender した結果はコミットしない。
5. ページ生成後の後処理の流れ（package.json の `build:grants` 参照）: …apply-side → apply-related → apply-research-links → apply-highlight → apply-seo → update-sitemap → update-latest。実行後は空白だけの差分を戻し、`git checkout public/hitsuyo.html` を忘れない。
6. 変更前後に `npm test`（node --test、現在154件）。

## 仕組みの要点
- 蛍光ペン: `<strong class="hl">` を本文の p/li/dd/blockquote/td にだけ付ける（`scripts/data/highlights.mjs`、フレーズは本文中で1回だけ出るもの。冪等）。
- 事業計画書AI: `src/ai.js`、`src/plan.js`、`public/plan.js`、`public/plan-docx.js`。無料の簡易版が標準、詳しい版は `PLAN_DETAILED` フラグの裏。
- リサーチ（分析）: `scripts/lib/analysis.mjs`、`update-analysis.mjs`、`build-analysis-pages.mjs`（事業向け・個人向け・地域×目的の空白・月次）、`build-research-pages.mjs`。説明枠は末尾へ（`introLast`）。
- ナビ・サイトマップ: `scripts/lib/nav.mjs`、`scripts/lib/sitemap.mjs`。sitemap.xml の更新日はページ**本文**（`<main>`。ナビ・右の列・空白は除く）のハッシュで `data/sitemap-lastmod.json` に記録（本文が変わったページだけ日本時間の今日に進む。ハッシュは `v2:` 付き）。
- トップの探し方は、ヒーロー（検索欄）の下のタブ（`#r-tabs`、`public/home-tabs.js`）：「やりたいこと」「ほしいもの」「地域」「AIに相談」。パネルの中身は `public/index.html` に直接書いてある（購入物のチップは scripts/data/purchases.mjs と hitsuyo/ のページに合わせる）。以前の「どこから探しますか？」の5カードと「あなたに合った入口から」は削除した（`.rw*` / `.r-who*` の CSS は未使用）。

- ページ上部のバナー（`.pb-banner`／`.pb-title`）は、画像を出さず見出しだけの表示にしている（CSS のみ。マークアップは残してあり、apply-seo が og:image にバナー画像のURLを使うため消さない）。

## 未対応・確認待ち
- 本番の初回自動更新後に確認: `data/program-history.json`（制度ごとの履歴。scripts/lib/program-history.mjs、update-research-history.mjs が毎朝更新）が保存されること、research/quality.html（品質レポート）と research/changes.html（制度変更履歴）が準備中でなく表示されること、business.html の jGrants 全件セクション、月次レポートの開始、`data/sitemap-lastmod.json` が保存されること。
- ダークモード: 配色は明るい背景前提のため、style.css ではダーク用の配色を持たず常に明るい配色で表示する（淡い背景に淡い文字になる不具合の対策）。
- `build-area-pages.mjs` を実行すると area/ の新ページが sitemap.xml に入る（毎日の自動更新では増えない）。
