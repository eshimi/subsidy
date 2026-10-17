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
- トップのヒーロー（2026-10-18 に作り直し、案C）: 見出しの下の「事業者の方／個人の方」の切り替え（`#r-seg`、`public/home-hero.js`。選んだ内容は localStorage の `subsidy-finder:aud` に覚え、`?aud=p` でも指定できる）が、検索欄の例（data-ph-b / data-ph-p）、検索に付ける `aud`（search.html の「個人向け／事業者向け」の絞り込みと同じ）、検索の下の4つの入口（`.r-go-set`、事業者向けと個人向け）を切り替える。右上の大きな数字は `<b id="r-live">`、下の数字は `dl.r-nums`（`r-cities` `r-local` `r-guides`＝制度ガイドのページ数 `r-articles`）。数字は scripts/update-stats.mjs が更新する（`r-guides` は public/programs/ のページ数）。以前のタブ（`#r-tabs`、home-tabs.js）・「どこから探しますか？」の5カード・「あなたに合った入口から」は削除した。

- ページ上部のバナー（`.pb-banner`／`.pb-title`）は、画像を出さず見出しだけの表示にしている（CSS のみ。マークアップは残してあり、apply-seo が og:image にバナー画像のURLを使うため消さない）。
- ランディングページ化: `scripts/apply-lp.mjs`（PAGES に追加したページの上部を、写真つきコンパクトなヒーロー＋要点の帯＋近道＋末尾の相談の呼びかけに差し替える。冪等。build:grants には入れず、実行して生成物をコミットする）。CSS は style.css の `.lp-*`。現在は feature/ の jizokuka・digital-subsidy・shoryokuka・monodukuri・growth・succession・employment・popular。各コーナーのトップ（basics・blog・feature・cases・news・who・background・compare・research の index.html）は `hub` 設定でヒーローだけ入れる（コラム columns.html は別テンプレートのため対象外）。挿絵は public/images/lp/（切り抜き）。要点の帯の数字は、そのページ本文に書いてあるものだけを使う。
- 制度ガイド（自治体）: `data/program-details.json`（公式ページの本文から読み取った事実。数字と引用は `scripts/verify-program-details.mjs` で、取得した本文と突き合わせて検証する）→ `scripts/build-program-pages.mjs` が `public/programs/` を生成 → `scripts/apply-program-links.mjs` が area/ のカードにリンクを入れる。ページにするのは中身がそろった制度（`pageable`）だけ。材料は公式の本文にある事実だけ（推測・一般論は書かない）。公式ページの変化の検出は `scripts/check-program-sources.mjs`（毎週月曜の自動更新と手動実行で動き、`data/program-source-state.json` に状態を残す。取得できない状態が続く・申請期間が終わった制度はページを公開せず、数字・引用が本文と合わなくなった、または終了を示す表現が増えた制度は、ページに注意書きを出す）。build:grants で build-program-pages → apply-program-links を毎回実行する。

- マイページ（`public/mypage.html`、noindex）: 保存した制度の締切・進み具合のボード・カレンダー・最近見たページ・条件に合う新着・バックアップ。データ層は `public/mypage-store.js`（置き場は localStorage か、ログイン中はサーバー）、`public/account.js` が置き場を切り替える（Google ログイン）。サーバーは `src/auth.js`（ID トークン検証・Cookie）、`src/members.js`（D1）、`src/worker.js` の `/api/me` `/api/auth/*` `/api/mypage*` `/api/account/delete`。スキーマは `migrations/0001_init.sql`。D1 のバインディング `DB` と Secret `GOOGLE_CLIENT_ID` の両方がないと会員機能はオフ（wrangler.jsonc のコメントに手順）。ヘッダーの「マイページ」は `scripts/lib/nav.mjs` の TOP_END_LINKS。閲覧履歴は `public/site.js` が記録。会員制の段階：1=ログインなしのマイページ（済み）、2=D1＋Google ログイン（実装済み。D1 作成・Secret 登録・wrangler.jsonc への接続は済み。本番での動作確認待ち）、3=メール通知・制度の変更の印・推移グラフ（未着手）。
- 「☆ 保存」ボタン: `public/save-button.js`（`data-save` に保存する制度の JSON を入れたボタンを、クリックで保存／解除。置き場は account.js が決める＝ログイン中は D1、そうでなければ localStorage）。search.js の結果カード（国・自治体・解説の3種）と、制度の詳細ページ（`scripts/build-grant-pages.mjs` の `saveButton`）に付いている。app.js（#results の AI 検索結果）と同じ保存（KEYS.saved）で、変更は `saved-changed` イベントで通知し合う。一覧ページ（`grantListHtml`、grants/ の都道府県別・目的別など）にも付いている。grants/ のページは `build-grant-pages.mjs` の `shell` ラッパーが、`data-save=` を含むページに save-button.js を足す。
- 制度の変更の印: `scripts/build-changes-feed.mjs`（`scripts/lib/changes-feed.mjs`）が `public/grants/changes.json` を作る（build:grants の build-redirects のあと）。国の制度は data/program-history.json の直近60日の変更、自治体の制度は data/program-source-state.json の要確認。マイページ（mypage.js）が、保存したあとに更新があった制度に「更新あり」を出す。
- マイページの「この8週間の動き」: 保存した制度の数（savedAt）と、見たページの数（履歴は最新30件まで）を、週ごと（月曜はじまり・日本時間）の棒グラフで出す（mypage.js の renderActivity）。履歴が残らないもの（解除した保存など）は数えない。
- 締切のメール通知（第3段階）: `src/notify.js`（毎朝 7:00 JST の cron＝wrangler.jsonc の triggers.crons → worker.js の scheduled → runReminders）。会員が /api/notify でオンにした場合だけ、保存した制度の締切の7日前・前日（申請済み・結果は除く）を1通にまとめて送る。送信済みは notify_log（migrations/0002_notify.sql）。配信停止は /api/notify/unsubscribe?u=&t=（メールのリンク・ワンクリック解除）。送信は Cloudflare Email Service の send_email バインディング（`MAIL`、なければ `CONTACT_EMAIL`）。**vars の NOTIFY_ENABLED が "true" のときだけ有効**（2026-10-18 に一度 true にしたが、ユーザーが停止したため false に戻した。再開するときは true に）。
- 利用規約: `public/policy/terms.html`（2026-10-18 に専門家の確認が済み。文面を変えるときは、再確認が望ましい）。フッター（nav.mjs の BOTTOM_LINKS）・プライバシーポリシー・マイページのログイン欄からリンク。
- apply-nav を実行すると、`<nav aria-label="補助リンク">` の行のインデントが増える既知の癖がある。実行後は、その行だけの差分を元に戻す。

- 使い方ページ（`public/guide.html`、手書き）: 機能やページが追加・変更されたら、本文を実態に合わせて更新する（コンテンツ＝記事・ブログ・ニュース・事例・制度ガイドの個別ページ・数字の更新は対象外）。毎朝 7:41（日本時間）の定期タスク「使い方ページの更新」が、直近の変更を見て、必要なときだけ更新・コミット・プッシュする（2026-10-18 に設定）。書いてよいのは、実際に動いている機能だけ（停止中のメール通知は書かない）。

## 未対応・確認待ち
- **会員制（第3段階）の公開前**: D1 に migrations/0002_notify.sql を適用（Console に SQL を貼る。ALTER は1度だけ）。Cloudflare の「メール サービス」で hojyokin.net の Email Sending を有効にしたら、wrangler.jsonc の NOTIFY_ENABLED を "true" に。推移グラフ（マイページの8週間の動き）は実装済み。
- **会員制（第2段階）の公開前**（済み・動作確認待ち）: D1 の作成・マイグレーション適用・`GOOGLE_CLIENT_ID` の登録・wrangler.jsonc の d1_databases のコメント解除。Google Cloud 側で、承認済みの JavaScript 生成元に https://hojyokin.net を追加。会員向けの利用規約はまだない。
- **制度ガイド（自治体）の続き（2026-10-17時点、再開するときはここから）**: 現在 `data/program-details.json` に 479 件（ページ公開 248 件。2026-10-18 に、市区町村の制度が5件以上の自治体の全制度＝212件のうち、公式ページを取得できた192件を統合）。済み＝県の制度（受付中95件）、創業・起業の市区町村の制度、制度が多い上位30自治体の制度。残り：
  1. 取得できなかった制度（`data/program-unfetched.json`。404＝リンク切れは `LOCAL_PROGRAMS` の url を直す／通信エラーは別環境で再試行）。
  2. （2026-10-18 に、制度が5件以上の自治体は済み。次は、4件以下の自治体（約190自治体）への拡大。）手順は、対象の洗い出し → 公式ページの取得（`node scripts/fetch-program-pages.mjs <一覧.json> <出力先>`。curl で取得し `/tmp` に本文化）→ 担当を分けて材料を書き起こし（本文の事実だけ・数字と引用は verify-program-details.mjs で検証・「現年度の記載がない／更新日だけ」は stale として除く）→ 統合 → build-program-pages → apply-program-links。
  3. 本番で初回の週次確認（毎週月曜）の結果を、GitHub Actions の実行画面の概要で確認する。誤検出（公開停止・注意書き）がないか。
  4. Search Console にデータが入ったら、制度ガイドのページ群が検索に出ているか、優先する自治体・制度の見直し。
  5. 他の候補：コラム（columns.html）や個人向け・やりたいこと分野ページのヒーロー、トップの探し方の見直しなど。
- 本番の初回自動更新後に確認: `data/program-history.json`（制度ごとの履歴。scripts/lib/program-history.mjs、update-research-history.mjs が毎朝更新）が保存されること、research/quality.html（品質レポート）と research/changes.html（制度変更履歴）が準備中でなく表示されること、business.html の jGrants 全件セクション、月次レポートの開始、`data/sitemap-lastmod.json` が保存されること。
- ダークモード: 配色は明るい背景前提のため、style.css ではダーク用の配色を持たず常に明るい配色で表示する（淡い背景に淡い文字になる不具合の対策）。
- `build-area-pages.mjs` を実行すると area/ の新ページが sitemap.xml に入る（毎日の自動更新では増えない）。
