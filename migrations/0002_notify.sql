-- 締切のメール通知（第3段階）。適用：npx wrangler d1 migrations apply subsidy-members --remote
-- ※ ALTER TABLE は、1度だけ実行する（もう一度実行すると「duplicate column」のエラーになる）
ALTER TABLE users ADD COLUMN notify INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN notify_token TEXT;

-- 送った通知の記録（同じ制度・同じ締切・同じ種類（7日前／前日）を、二重に送らない）
CREATE TABLE IF NOT EXISTS notify_log (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  saved_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  deadline TEXT NOT NULL,
  sent_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, saved_id, kind, deadline)
);
