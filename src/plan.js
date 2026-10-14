// 事業計画書 AI下書きアシスト（/api/plan）の入力検証と、1日の利用回数の制限。
// 下書き・考えの整理のための補助で、申請書類の作成代行ではない。個人を特定できる情報は受け取らない。
export const PLAN_SUBSIDIES = {
  jizokuka: {
    label: '小規模事業者持続化補助金',
    focus: '販路開拓（新しい顧客の獲得・売上の拡大）と、そのための取組（チラシ・Webサイト・店舗改装・展示会など）。自社の強み、顧客ニーズ、市場の動向を踏まえた経営計画と、補助事業の計画（取組内容・効果）',
  },
  digital: {
    label: 'デジタル化・AI導入補助金（旧IT導入補助金）',
    focus: 'ITツール（ソフトウェア・クラウドサービスなど）の導入による業務の効率化・生産性の向上。現在の業務の流れと課題、導入するツールで何がどう変わるか、労働生産性の向上の見込み',
  },
};

export const PLAN_OPTIONS = {
  industry: ['飲食業', '小売業', '美容・サロン', '建設業', '製造業', 'IT・情報通信', '宿泊・観光', '農林水産業', '医療・介護・保育', 'サービス業（その他）', 'その他'],
  employees: ['0人（自分だけ）', '1〜5人', '6〜20人', '21〜50人', '51人以上'],
};

export const PLAN_FIELDS = {
  business: { label: '事業の内容', min: 20, max: 600 },
  issue: { label: '今の課題', min: 10, max: 600 },
  idea: { label: '補助金で取り組みたいこと', min: 20, max: 600 },
  goal: { label: '目指す効果', min: 0, max: 300 },
};

const bad = (message) => Object.assign(new Error(message), { status: 400, expose: true });
const str = (v) => (typeof v === 'string' ? v.trim() : '');

export function parsePlanInput(body) {
  if (!body || typeof body !== 'object') throw bad('入力が正しくありません');
  if (typeof body.website === 'string' && body.website.trim()) return { spam: true };
  const subsidy = str(body.subsidy);
  if (!Object.hasOwn(PLAN_SUBSIDIES, subsidy)) throw bad('補助金を選んでください');
  const out = { subsidy };
  for (const [key, list] of Object.entries(PLAN_OPTIONS)) {
    const v = str(body[key]);
    if (!list.includes(v)) throw bad('業種と従業員数を選んでください');
    out[key] = v;
  }
  for (const [key, { label, min, max }] of Object.entries(PLAN_FIELDS)) {
    const v = str(body[key]);
    if (v.length < min) throw bad(min > 0 && !v ? `${label}を入力してください` : `${label}は${min}字以上で入力してください`);
    if (v.length > max) throw bad(`${label}は${max}字以内で入力してください`);
    out[key] = v;
  }
  return out;
}

// 日本時間の日付（YYYY-MM-DD）。回数制限は日本時間の0時で切り替わる
export function jstDate(now = Date.now()) {
  return new Date(now + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

// IP アドレスはそのまま保存せず、ハッシュにしてから使う
export async function hashKey(ip) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`hojyokin-plan:${ip}`));
  return [...new Uint8Array(buf)].slice(0, 16).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function quotaExceeded() {
  return Object.assign(new Error('無料お試しは1日1回までです。明日（日本時間の0時以降）にもう一度お試しください。'), { status: 429, expose: true });
}

// 1日あたりの回数制限。store は get/set/delete（非同期可）を持つもの。
// take() で枠を確保し、AI の応答に失敗したときは release() で戻す（利用者が失敗のたびに枠を失わないように）
export function createDailyLimiter({ store, max = 1, now = () => Date.now() } = {}) {
  const keyOf = async (ip) => `${jstDate(now())}/${await hashKey(ip || 'unknown')}`;
  return {
    async take(ip) {
      const key = await keyOf(ip);
      const used = Number((await store.get(key)) ?? 0);
      if (used >= max) throw quotaExceeded();
      await store.set(key, used + 1);
      return key;
    },
    async release(key) {
      const used = Number((await store.get(key)) ?? 0);
      if (used <= 1) await store.delete(key);
      else await store.set(key, used - 1);
    },
  };
}

// プロセス内のメモリに記録する store（Express 用・テスト用）。日付が変わったら古いものを消す
export function memoryStore() {
  const map = new Map();
  return {
    get: (key) => map.get(key),
    set: (key, value) => {
      const day = key.slice(0, 10);
      for (const k of map.keys()) if (!k.startsWith(day)) map.delete(k);
      map.set(key, value);
    },
    delete: (key) => map.delete(key),
  };
}

// Cloudflare Workers の Cache API に記録する store。データセンターごとの記録だが、お試しの回数制限には十分。
// 同じデータセンター内の別インスタンスとも共有される。翌日まで残れば足りるので、有効期限は26時間にする
export function cacheStore(cache, origin = 'https://hojyokin.net') {
  const req = (key) => new Request(`${origin}/__plan-quota/${key}`);
  return {
    async get(key) {
      const res = await cache.match(req(key));
      return res ? Number(await res.text()) : undefined;
    },
    async set(key, value) {
      await cache.put(req(key), new Response(String(value), { headers: { 'cache-control': 'max-age=93600' } }));
    },
    async delete(key) {
      await cache.delete(req(key));
    },
  };
}

export function planText(input) {
  const s = PLAN_SUBSIDIES[input.subsidy];
  return [
    `対象の補助金: ${s.label}`,
    `業種: ${input.industry}`,
    `従業員数: ${input.employees}`,
    '',
    `事業の内容:\n${input.business}`,
    '',
    `今の課題:\n${input.issue}`,
    '',
    `補助金で取り組みたいこと:\n${input.idea}`,
    '',
    `目指す効果:\n${input.goal || '（未記入）'}`,
  ].join('\n');
}
