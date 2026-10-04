import express from 'express';
import { fileURLToPath } from 'node:url';
import { runSearch } from './search.js';
import { lookupPostalCode } from './postal.js';
import { aiEnabled } from './ai.js';
import { TtlCache, securityHeaders, rateLimit } from './middleware.js';

export function createApp(options = {}) {
  const deps = { cache: new TtlCache(), ...options };
  const app = express();
  app.disable('x-powered-by');
  // Render / Cloud Run などのリバースプロキシ配下で、利用者のIPを正しく取得する
  app.set('trust proxy', Number(process.env.TRUST_PROXY ?? 1));
  app.use(securityHeaders);
  const limit = Number(process.env.RATE_LIMIT_PER_MIN ?? 30);
  app.use('/api/postal', rateLimit({ max: limit * 4 }));
  app.use('/api/search', rateLimit({ max: limit }));
  app.use(express.json({ limit: '32kb' }));
  app.use(express.static(fileURLToPath(new URL('../public', import.meta.url)), { maxAge: '1h' }));

  app.get('/api/health', (_req, res) => res.json({ ok: true, ai: aiEnabled() }));

  app.get('/api/postal/:zip', async (req, res, next) => {
    try {
      res.json(await lookupPostalCode(req.params.zip, deps));
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
    console.log(`補助金ファインダー: http://localhost:${port}  (AI解析: ${aiEnabled() ? '有効' : '無効'})`);
  });
  const shutdown = () => server.close(() => process.exit(0));
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}
