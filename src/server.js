import express from 'express';
import { fileURLToPath } from 'node:url';
import { runSearch } from './search.js';
import { lookupPostalCode } from './postal.js';
import { aiEnabled } from './ai.js';

export function createApp(deps = {}) {
  const app = express();
  app.use(express.json({ limit: '32kb' }));
  app.use(express.static(fileURLToPath(new URL('../public', import.meta.url))));

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
    const status = err.status ?? 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ error: status >= 500 ? 'サーバーでエラーが発生しました' : err.message });
  });

  return app;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT) || 3000;
  createApp().listen(port, () => {
    console.log(`補助金ファインダー: http://localhost:${port}  (AI解析: ${aiEnabled() ? '有効' : '無効'})`);
  });
}
