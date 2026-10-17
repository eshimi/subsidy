-- 会員（Google ログイン）とマイページのデータ。Cloudflare D1 用。
-- 適用：npx wrangler d1 migrations apply subsidy-members --remote
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  google_sub TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  name TEXT,
  created_at INTEGER NOT NULL,
  last_login INTEGER NOT NULL
);

-- セッション。Cookie に入れる値そのものではなく、そのハッシュだけを保存する
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id);

-- 保存した制度（状態・結果・メモつき）。第3段階の締切通知は、この表の deadline から作る
CREATE TABLE IF NOT EXISTS saved (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  url TEXT,
  provider TEXT,
  amount TEXT,
  deadline TEXT,
  period TEXT,
  saved_at INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'want',
  result TEXT NOT NULL DEFAULT '',
  memo TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (user_id, id)
);
CREATE INDEX IF NOT EXISTS saved_deadline ON saved(deadline);

-- 閲覧履歴・条件など、まるごと入れ替える小さなデータ
CREATE TABLE IF NOT EXISTS kv (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  k TEXT NOT NULL,
  v TEXT NOT NULL,
  PRIMARY KEY (user_id, k)
);
