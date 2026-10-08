import express from 'express';
import { fileURLToPath } from 'node:url';
import { stat } from 'node:fs/promises';
import { runSearch } from './search.js';
import { lookupPostalCode } from './postal.js';
import { aiEnabled, chatWithClaude } from './ai.js';
import { TtlCache, securityHeaders, rateLimit } from './middleware.js';
import { loadGrants } from './grants-store.js';

const CHAT_MAX_TURNS = 12;
const CHAT_MAX_CHARS = 1000;

function parseChatMessages(input) {
  const bad = (message) => Object.assign(new Error(message), { status: 400, expose: true });
  if (!Array.isArray(input) || input.length === 0) throw bad('メッセージを入力してください');
  const recent = input.slice(-CHAT_MAX_TURNS);
  const messages = recent.map((m) => {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') {
      throw bad('メッセージの形式が正しくありません');
    }
    const content = m.content.trim();
    if (!content) throw bad('空のメッセージは送れません');
    if (content.length > CHAT_MAX_CHARS) throw bad(`メッセージは${CHAT_MAX_CHARS}字以内で入力してください`);
    return { role: m.role, content };
  });
  if (messages[messages.length - 1].role !== 'user') throw bad('最後のメッセージは利用者の発言である必要があります');
  return messages;
}

export function createApp(options = {}) {
  const deps = { cache: new TtlCache(), loadGrants, ...options };
  const app = express();
  app.disable('x-powered-by');
  // Render / Cloud Run などのリバースプロキシ配下で、利用者のIPを正しく取得する
  app.set('trust proxy', Number(process.env.TRUST_PROXY ?? 1));
  app.use(securityHeaders);
  const limit = Number(process.env.RATE_LIMIT_PER_MIN ?? 30);
  app.use('/api/postal', rateLimit({ max: limit * 4 }));
  app.use('/api/search', rateLimit({ max: limit }));
  app.use('/api/chat', rateLimit({ max: Math.max(1, Math.floor(limit / 3)) }));
  app.use(express.json({ limit: '32kb' }));
  app.use(express.static(fileURLToPath(new URL('../public', import.meta.url)), {
    maxAge: '1h',
    // HTML・CSS・JS は毎回更新を確認する（デザイン変更がすぐ反映されるように）
    setHeaders: (res, path) => {
      if (/\.(html|css|js)$|books\.json$/.test(path)) res.setHeader('Cache-Control', 'no-cache');
    },
  }));

  app.get('/api/health', (_req, res) => res.json({ ok: true, ai: aiEnabled() }));

  app.get('/api/config', (_req, res) => {
    res.json({
      googleClientId: process.env.GOOGLE_CLIENT_ID || null,
    });
  });

  app.get('/api/postal/:zip', async (req, res, next) => {
    try {
      res.json(await lookupPostalCode(req.params.zip, deps));
    } catch (e) {
      next(e);
    }
  });

  app.post('/api/chat', async (req, res, next) => {
    try {
      const messages = parseChatMessages(req.body?.messages);
      const reply = await chatWithClaude(messages);
      if (reply === null) {
        const err = new Error('AI機能は現在利用できません');
        Object.assign(err, { status: 503, expose: true });
        throw err;
      }
      res.json({ reply });
    } catch (e) {
      next(e);
    }
  });

  app.post('/api/search', async (req, res, next) => {
    try {
      res.json(await runSearch(req.body ?? {}, deps));
    } catch (e) {
      next(e);
    }
  });

  app.use((err, _req, res, _next) => {
    const status = err.status ?? err.statusCode ?? 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ error: status >= 500 ? 'サーバーでエラーが発生しました' : err.expose === false ? 'リクエストが不正です' : err.message });
  });

  return app;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT) || 3000;
  const server = createApp().listen(port, () => {
    console.log(`補助金ネット: http://localhost:${port}  (AI解析: ${aiEnabled() ? '有効' : '無効'})`);
  });
  // 取り込んだ jGrants データを1日1回更新する（JGRANTS_REFRESH=off で無効）
  if (process.env.JGRANTS_REFRESH !== 'off') {
    const refresh = () =>
      import('../scripts/fetch-jgrants.mjs')
        .then((m) => m.fetchAndWrite({ log: () => {} }))
        .then((r) => console.log(`jGrants データを更新しました（${r.total}件）`))
        .catch((e) => console.warn('jGrants データの更新に失敗しました:', e.message));
    setInterval(refresh, 24 * 60 * 60 * 1000).unref();
    // 起動時にデータが無いか1日以上前のものなら、すぐ取り込む
    stat(new URL('../public/data/jgrants/index.json', import.meta.url))
      .then((s) => Date.now() - s.mtimeMs > 24 * 60 * 60 * 1000 && refresh())
      .catch(() => refresh());
  }
  const shutdown = () => server.close(() => process.exit(0));
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}
