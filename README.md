# 補助金ファインダー

考えている新規事業の内容と、事業を行う場所の郵便番号を入力すると、受けられそうな**補助金・助成金・融資・給付金・相談窓口**を関連度順に一覧表示するWebサービスです。

## 主な機能

- **郵便番号 → 住所の自動取得**（zipcloud API。通信できない場合は郵便番号の上3桁から都道府県を推定）
- **事業内容の解析**: 業種（飲食・IT・農業など13分類）と取り組み（雇用・店舗開設・EC・移住・研究開発など）を判定
  - キーワード辞書による判定（追加設定なしで動作）
  - `ANTHROPIC_API_KEY` を設定すると Claude による解析も併用し、精度が上がります
- **支援制度データベースとのマッチング**: 国・都道府県・市区町村の制度を、地域・業種・事業ステージ・必須条件で絞り込み、関連度順に表示。「表示された理由」も確認できます
- **主要都市の独自制度**（札幌・仙台・千葉・渋谷区・世田谷区・横浜・川崎・新潟・浜松・名古屋・京都・神戸・広島・福岡・北九州など）を市区町村単位で判定。締切が過ぎた制度は「今年度は受付終了」として表示し、次回公募に備えられるようにします
- **jGrants（デジタル庁）の募集中の補助金を毎日取り込み**: 全国・各都道府県・市区町村の募集中の補助金をまとめて取得し、事業内容・住所との関連度順に表示（自分の市区町村の制度を優先し、他の市区町村の制度は除外）
- **共有**: 検索条件がURLに入るため、リンクを送るだけで同じ結果を共有できます
- **保存**: 気になる制度を「☆ 保存」でブラウザに記録（オプション: `GOOGLE_CLIENT_ID` で Google Sign-In によるログイン保護が可能）
- **締切リマインド**: 締切をGoogleカレンダーに追加、または .ics（7日前・前日に通知）をダウンロード。保存した制度の締切をまとめて書き出すこともできます
- **紹介動画**: はじめてのアクセス時だけ、トップのヒーローで10秒の紹介動画を再生（音はオフで開始、スキップ可）。以降は通常の表示になり、「紹介動画を見る」でいつでも再生できます。検索条件つきの共有リンクや「視差効果を減らす」設定では再生しません
- 種類（補助金／助成金／融資…）での絞り込み、スマホ表示・ダークモード対応

## 使い方

```bash
npm install
npm start          # http://localhost:3000
```

| 環境変数 | 説明 |
| --- | --- |
| `PORT` | 待ち受けポート（既定: 3000） |
| `ANTHROPIC_API_KEY` | 設定すると Claude による事業内容の解析を有効化（任意） |
| `CLAUDE_MODEL` | 解析に使うモデル（既定: `claude-opus-5-5`） |
| `SUBSIDY_AI=off` | APIキーがあってもAI解析を無効化 |
| `RATE_LIMIT_PER_MIN` | IPごとの1分あたり検索回数の上限（既定: 30） |
| `TRUST_PROXY` | 信頼するリバースプロキシの段数（既定: 1） |
| `JGRANTS_REFRESH` | `off` にすると、サーバー版での jGrants データの1日1回の自動更新を無効化 |
| `GOOGLE_CLIENT_ID` | 設定すると、Google Sign-In で保存機能をログイン保護（任意） |

`.env.example` に一覧があります。

### Google Sign-In の設定（オプション）

保存機能を Google アカウントでのログインで保護したい場合：

1. [Google Cloud Console](https://console.cloud.google.com/) で新しいプロジェクトを作成
2. 「APIs と サービス」 → 「認証情報」を開き、「認証情報を作成」 → 「OAuth 2.0 クライアント ID」を選択
3. アプリケーションのタイプ：「ウェブアプリケーション」を選択
4. 「承認済みの JavaScript 生成元」に `http://localhost:3000`（開発）と本番ドメイン（例: `https://hojyokin.net`）を追加
5. 「承認済みのリダイレクト URI」に本番ドメイン + `/` を追加（例: `https://hojyokin.net/`）
6. 「クライアント ID」をコピーして、`GOOGLE_CLIENT_ID` 環境変数に設定

設定しない場合は、保存機能はログイン不要で従来通り動作します。ログイン機能の有効化は完全に任意です。

テスト: `npm test`（外部APIはモックするため、ネットワークなしで実行できます）

## デプロイ

本番運用向けに、セキュリティヘッダー（CSPなど）、IPごとのレート制限、外部APIのキャッシュ（住所1日・jGrants 10分）、ヘルスチェック（`/api/health`）、SIGTERM での安全な終了を組み込んでいます。

### GitHub Pages（無料・いちばん手軽）

サーバーなしでブラウザだけで動く静的版を GitHub Pages で公開できます。

1. リポジトリの **Settings → Pages** を開き、「Build and deployment」の **Source** を **GitHub Actions** にする
2. **Actions** タブで「Deploy to GitHub Pages」を実行する（以降はプッシュのたびに自動で更新）
3. `https://<ユーザー名>.github.io/subsidy/` で公開される

静的版では、住所は zipcloud から JSONP で取得します。募集中の補助金は、ビルド時に jGrants から取り込んだデータ（`data/jgrants/`）を使います。公開ワークフローは毎朝（日本時間 5:47）自動で実行され、データが更新されます。APIキーを公開できないため、Claude による解析は使えません。全機能を使う場合は下記のサーバー版で公開してください。

ローカルでの確認: `npm run fetch:jgrants`（jGrants データの取得）→ `npm run build:static` で `dist/` に書き出されます。

### Docker（Cloud Run・Fly.io・自前サーバーなど）

```bash
docker build -t subsidy-finder .
docker run -p 3000:3000 -e ANTHROPIC_API_KEY=... subsidy-finder
```

Google Cloud Run の例:

```bash
gcloud run deploy subsidy-finder --source . --region asia-northeast1 --allow-unauthenticated
```

### Render

リポジトリの `render.yaml` を使って Blueprint としてデプロイできます（Render のダッシュボードで「New → Blueprint」からこのリポジトリを選択）。`ANTHROPIC_API_KEY` は任意で、ダッシュボードから設定します。

### Cloudflare Workers

`src/worker.js` と `wrangler.jsonc` で Cloudflare Workers にデプロイできます（Render と同じ機能。Render の設定は移行完了まで残しています）。

- **静的ファイル**（`public/`）は Workers Assets が配信し、`/api/*` と `/`（トップページ）だけが Worker に届きます。URL は従来のまま（`/guide.html` など）です。
- **API**: `/api/health`、`/api/config`、`/api/postal/:zip`、`/api/search`、`/api/chat`。検索・住所・分類・マッチングは Express 版と同じモジュールを使います。
- **jGrants データ**: `npm run fetch:jgrants` で `public/data/jgrants/` に取得し、デプロイ時にアセットとして同梱します。データが無い場合は jGrants API の直接検索に切り替わります。
- **定期更新**: `.github/workflows/cloudflare.yml` が毎朝（日本時間 6:12）データを取り直して再デプロイします。
- **レート制限**: Worker では行いません。Cloudflare ダッシュボードの **Security → WAF → Rate limiting rules** で設定してください（下記）。

```bash
npm ci
npm run fetch:jgrants          # 任意（jGrants データを同梱する場合）
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler deploy
```

ローカル確認は `.dev.vars.example` を `.dev.vars` にコピーして値を入れ、`npx wrangler dev` を実行します。

必要な設定:

| 種類 | 名前 | 内容 |
| --- | --- | --- |
| Secret | `ANTHROPIC_API_KEY` | 副業壁打ちAI・事業内容の解析に使う Anthropic API キー（未設定ならこれらの AI 機能は無効） |
| Secret | `GOOGLE_CLIENT_ID` | Google Sign-In を使う場合のみ（任意） |
| 変数（`wrangler.jsonc`） | `CLAUDE_MODEL` | 使用するモデル（既定: `claude-opus-5-5`） |
| GitHub Secrets | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | 毎朝の再デプロイ用（未設定ならスキップ） |

推奨のレート制限ルール（AI の利用料と悪用を防ぐため）:

- `/api/chat`: URI Path が `/api/chat` に一致 → 1 IP あたり 10 リクエスト / 1 分、超過したらブロック
- `/api/search`・`/api/postal/*`: 1 IP あたり 30〜60 リクエスト / 1 分

> `wrangler.jsonc` に `vars` を書いているため、ダッシュボードで追加した「変数（Variable）」はデプロイで上書きされます。値を足す場合は Secret として登録してください。

### CI

GitHub Actions（`.github/workflows/ci.yml`）で、Node.js 20/22 でのテスト・静的版のビルドと、Docker イメージのビルド・起動確認、Cloudflare Workers のバンドル確認（Node 22 のみ）を行います。GitHub Pages への公開は `.github/workflows/pages.yml` です。

## 構成

```
src/
  server.js          Express サーバー（/api/search, /api/postal/:zip, /api/health）
  middleware.js      キャッシュ・レート制限・セキュリティヘッダー
  worker.js          Cloudflare Workers のエントリーポイント（server.js と同じ API）
  grants-assets.js   Workers 版で取り込みデータを Assets 経由で読み込む
  chat-input.js      /api/chat の入力検証（Express・Workers 共通）
  http-error.js      エラー応答の整形（Express・Workers 共通）
  search-core.js     検索全体の流れ（住所解決 → 解析 → マッチング → jGrants）。サーバーと静的版で共有
  search.js          サーバー用（Claude による解析を組み合わせる）
  postal.js          郵便番号 → 住所
  classifier.js      キーワードで業種・属性を判定
  ai.js              （任意）Claude による解析（構造化出力）
  matcher.js         制度の絞り込み・スコアリング
  jgrants.js         jGrants 公開APIクライアント（取り込みデータが無いときの直接検索）
  jgrants-rank.js    取り込んだ jGrants データを関連度順に並べる
  grants-store.js    サーバー版で取り込みデータを読み込む
  data/programs.js   支援制度データベース（国・都道府県・市区町村の共通制度）
  data/local-programs.js  主要都市・都道府県の独自制度
  data/taxonomy.js   業種・属性タグとキーワード辞書
public/              フロントエンド（HTML/CSS/JS、ビルド不要）
  calendar.js        締切リマインド用の .ics / Googleカレンダーリンク生成
  intro.js           初回アクセス時の紹介動画の再生と、通常のヒーローへの切り替え
  media/             紹介動画（intro.mp4 / intro.webm）
static/entry.js      GitHub Pages 用の静的版（ブラウザ内で検索）
scripts/build-static.mjs  静的版を dist/ に書き出すビルド
scripts/fetch-jgrants.mjs jGrants の募集中の補助金を取得し public/data/jgrants/ に都道府県別で保存
test/                node:test によるテスト
```

## 制度データの追加・更新

`src/data/programs.js` に1件ずつオブジェクトで定義しています。`industries`（対象業種）、`require`（必須条件）、`boost`（加点条件）、`stages`（事業ステージ）、`prefectures` / `excludePrefectures`（地域）を設定すると、自動で絞り込みとスコアリングに使われます。`{pref}` `{city}` はユーザーの住所に置き換わります。

市区町村の独自制度は `src/data/local-programs.js` に追加します。`cities`（例: `['札幌市']`、区まで含む住所にも先頭一致）で対象の市区町村を、`deadline`（`YYYY-MM-DD`）で締切を指定すると、受付状況の表示と締切リマインドに使われます。`period` には公募時期の説明（例:「例年4月頃に公募」）を書きます。

手作業のデータがない市区町村でも、jGrants に掲載されている制度は毎日の取り込みで表示されます。それ以外は「{市区町村名} 創業 補助金」などの検索リンクで案内します。各制度は年度ごとに公募内容が変わるため、毎年4月頃と秋の補正予算の時期に見直すのがおすすめです。

## 注意事項

- 金額・要件・公募時期は年度や公募回で変わります。表示内容は参考情報で、受給を保証するものではありません。
- 制度データは2026年度時点の公開情報をもとにした概要です。定期的な見直しが必要です。

## 今後の拡張案

- 自治体の独自制度データのさらなる拡充（jGrants の地域検索結果の取り込み、管理画面）
- メール・LINE での締切通知（アカウント機能が必要）
- 申請に必要な書類・準備のチェックリスト表示
