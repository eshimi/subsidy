# 補助金ファインダー

考えている新規事業の内容と、事業を行う場所の郵便番号を入力すると、受けられそうな**補助金・助成金・融資・給付金・相談窓口**を関連度順に一覧表示するWebサービスです。

## 主な機能

- **郵便番号 → 住所の自動取得**（zipcloud API。通信できない場合は郵便番号の上3桁から都道府県を推定）
- **事業内容の解析**: 業種（飲食・IT・農業など13分類）と取り組み（雇用・店舗開設・EC・移住・研究開発など）を判定
  - キーワード辞書による判定（追加設定なしで動作）
  - `ANTHROPIC_API_KEY` を設定すると Claude による解析も併用し、精度が上がります
- **支援制度データベースとのマッチング**: 国・都道府県・市区町村の制度を、地域・業種・事業ステージ・必須条件で絞り込み、関連度順に表示。「表示された理由」も確認できます
- **主要都市の独自制度**（札幌・仙台・千葉・渋谷区・世田谷区・横浜・川崎・新潟・浜松・名古屋・京都・神戸・広島・福岡・北九州など）を市区町村単位で判定。締切が過ぎた制度は「今年度は受付終了」として表示し、次回公募に備えられるようにします
- **jGrants（デジタル庁）で現在募集中の補助金**をリアルタイム検索
- **共有**: 検索条件がURLに入るため、リンクを送るだけで同じ結果を共有できます
- **保存**: 気になる制度を「☆ 保存」でブラウザに記録（ログイン不要）
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

`.env.example` に一覧があります。

テスト: `npm test`（外部APIはモックするため、ネットワークなしで実行できます）

## デプロイ

本番運用向けに、セキュリティヘッダー（CSPなど）、IPごとのレート制限、外部APIのキャッシュ（住所1日・jGrants 10分）、ヘルスチェック（`/api/health`）、SIGTERM での安全な終了を組み込んでいます。

### GitHub Pages（無料・いちばん手軽）

サーバーなしでブラウザだけで動く静的版を GitHub Pages で公開できます。

1. リポジトリの **Settings → Pages** を開き、「Build and deployment」の **Source** を **GitHub Actions** にする
2. **Actions** タブで「Deploy to GitHub Pages」を実行する（以降はプッシュのたびに自動で更新）
3. `https://<ユーザー名>.github.io/subsidy/` で公開される

静的版では、住所は zipcloud から JSONP で取得し、募集中の補助金はブラウザから jGrants API を直接呼びます（ブラウザから取得できない場合は「接続できない」と表示）。APIキーを公開できないため、Claude による解析は使えません。全機能を使う場合は下記のサーバー版で公開してください。

ローカルでの確認: `npm run build:static` で `dist/` に書き出されます。

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

### CI

GitHub Actions（`.github/workflows/ci.yml`）で、Node.js 20/22 でのテスト・静的版のビルドと、Docker イメージのビルド・起動確認を行います。GitHub Pages への公開は `.github/workflows/pages.yml` です。

## 構成

```
src/
  server.js          Express サーバー（/api/search, /api/postal/:zip, /api/health）
  middleware.js      キャッシュ・レート制限・セキュリティヘッダー
  search-core.js     検索全体の流れ（住所解決 → 解析 → マッチング → jGrants）。サーバーと静的版で共有
  search.js          サーバー用（Claude による解析を組み合わせる）
  postal.js          郵便番号 → 住所
  classifier.js      キーワードで業種・属性を判定
  ai.js              （任意）Claude による解析（構造化出力）
  matcher.js         制度の絞り込み・スコアリング
  jgrants.js         jGrants 公開APIクライアント
  data/programs.js   支援制度データベース（国・都道府県・市区町村の共通制度）
  data/local-programs.js  主要都市・都道府県の独自制度
  data/taxonomy.js   業種・属性タグとキーワード辞書
public/              フロントエンド（HTML/CSS/JS、ビルド不要）
  calendar.js        締切リマインド用の .ics / Googleカレンダーリンク生成
  intro.js           初回アクセス時の紹介動画の再生と、通常のヒーローへの切り替え
  media/             紹介動画（intro.mp4 / intro.webm）
static/entry.js      GitHub Pages 用の静的版（ブラウザ内で検索）
scripts/build-static.mjs  静的版を dist/ に書き出すビルド
test/                node:test によるテスト
```

## 制度データの追加・更新

`src/data/programs.js` に1件ずつオブジェクトで定義しています。`industries`（対象業種）、`require`（必須条件）、`boost`（加点条件）、`stages`（事業ステージ）、`prefectures` / `excludePrefectures`（地域）を設定すると、自動で絞り込みとスコアリングに使われます。`{pref}` `{city}` はユーザーの住所に置き換わります。

市区町村の独自制度は `src/data/local-programs.js` に追加します。`cities`（例: `['札幌市']`、区まで含む住所にも先頭一致）で対象の市区町村を、`deadline`（`YYYY-MM-DD`）で締切を指定すると、受付状況の表示と締切リマインドに使われます。`period` には公募時期の説明（例:「例年4月頃に公募」）を書きます。

データのない市区町村では「{市区町村名} 創業 補助金」などの検索リンクで案内します。各制度は年度ごとに公募内容が変わるため、毎年4月頃と秋の補正予算の時期に見直すのがおすすめです。

## 注意事項

- 金額・要件・公募時期は年度や公募回で変わります。表示内容は参考情報で、受給を保証するものではありません。
- 制度データは2026年度時点の公開情報をもとにした概要です。定期的な見直しが必要です。

## 今後の拡張案

- 自治体の独自制度データのさらなる拡充（jGrants の地域検索結果の取り込み、管理画面）
- メール・LINE での締切通知（アカウント機能が必要）
- 申請に必要な書類・準備のチェックリスト表示
