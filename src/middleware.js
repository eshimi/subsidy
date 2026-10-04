// 本番運用向けの小さなミドルウェアとキャッシュ。

// 有効期限付きのインメモリキャッシュ（件数上限つき、古いものから削除）
export class TtlCache {
  constructor({ max = 1000 } = {}) {
    this.max = max;
    this.map = new Map();
  }

  get(key) {
    const hit = this.map.get(key);
    if (!hit) return undefined;
    if (hit.expires < Date.now()) {
      this.map.delete(key);
      return undefined;
    }
    return hit.value;
  }

  set(key, value, ttlMs) {
    this.map.delete(key);
    this.map.set(key, { value, expires: Date.now() + ttlMs });
    if (this.map.size > this.max) this.map.delete(this.map.keys().next().value);
  }
}

// キャッシュがあれば使い、なければ計算して保存する
export async function cached(cache, key, ttlMs, compute, shouldCache = () => true) {
  if (!cache) return compute();
  const hit = cache.get(key);
  if (hit !== undefined) return hit;
  const value = await compute();
  if (shouldCache(value)) cache.set(key, value, ttlMs);
  return value;
}

export function securityHeaders(_req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
}

// IPごとの固定ウィンドウ方式のレート制限
export function rateLimit({ windowMs = 60_000, max = 30 } = {}) {
  const hits = new Map();
  let windowStart = Date.now();
  return (req, res, next) => {
    const now = Date.now();
    if (now - windowStart >= windowMs) {
      hits.clear();
      windowStart = now;
    }
    const key = req.ip ?? 'unknown';
    const count = (hits.get(key) ?? 0) + 1;
    hits.set(key, count);
    if (count > max) {
      res.setHeader('Retry-After', String(Math.ceil((windowStart + windowMs - now) / 1000)));
      return res.status(429).json({ error: 'アクセスが集中しています。少し時間をおいてから再度お試しください。' });
    }
    next();
  };
}
