// マイページのデータ層。保存先はこのファイルの中だけにまとめる。
// いまはブラウザの localStorage。会員制にするときは、ここをサーバー（D1）への保存に差し替える。
// 保存した制度の本体は、検索ページ（app.js）が書く 'subsidy-finder:saved' をそのまま使う。

export const STATUSES = [
  { key: 'want', label: '気になる' },
  { key: 'check', label: '対象確認' },
  { key: 'prep', label: '準備中' },
  { key: 'applied', label: '申請済み' },
  { key: 'result', label: '結果' },
];
export const RESULTS = [
  { key: '', label: '結果待ち' },
  { key: 'adopted', label: '採択' },
  { key: 'rejected', label: '不採択' },
];

export const KEYS = {
  saved: 'subsidy-finder:saved',
  meta: 'subsidy-finder:mypage',
  history: 'subsidy-finder:history',
  prefs: 'subsidy-finder:prefs',
};
export const HISTORY_MAX = 30;
const NEW_DAYS = 14;
const DAY = 24 * 60 * 60 * 1000;

const STATUS_KEYS = new Set(STATUSES.map((s) => s.key));
const RESULT_KEYS = new Set(RESULTS.map((s) => s.key));

// 外部から読み込んだ（バックアップなど）URLは、http(s)・相対パスだけを通す
export function safeUrl(u) {
  const s = String(u ?? '').trim();
  if (!s) return '';
  if (/^https?:\/\//i.test(s)) return s;
  if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(s) || s.startsWith('//')) return '';
  return s;
}

export function createStore(storage = globalThis.localStorage, now = () => Date.now()) {
  const read = (key, fallback) => {
    try {
      const v = JSON.parse(storage.getItem(key));
      return v ?? fallback;
    } catch {
      return fallback;
    }
  };
  const write = (key, value) => {
    try {
      storage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  };

  const store = {
    // 保存した制度（状態・メモつき）。保存した新しい順
    list() {
      const saved = read(KEYS.saved, {});
      const meta = read(KEYS.meta, {});
      return Object.values(saved)
        .filter((s) => s && s.id)
        .map((s) => {
          const m = meta[s.id] || {};
          return {
            ...s,
            url: safeUrl(s.url),
            status: STATUS_KEYS.has(m.status) ? m.status : 'want',
            result: RESULT_KEYS.has(m.result) ? m.result : '',
            memo: String(m.memo ?? '').slice(0, 500),
          };
        })
        .sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
    },
    setMeta(id, patch) {
      const meta = read(KEYS.meta, {});
      const cur = meta[id] || {};
      const next = { ...cur };
      if ('status' in patch && STATUS_KEYS.has(patch.status)) next.status = patch.status;
      if ('result' in patch && RESULT_KEYS.has(patch.result)) next.result = patch.result;
      if ('memo' in patch) next.memo = String(patch.memo ?? '').slice(0, 500);
      meta[id] = next;
      return write(KEYS.meta, meta);
    },
    remove(id) {
      const saved = read(KEYS.saved, {});
      delete saved[id];
      const meta = read(KEYS.meta, {});
      delete meta[id];
      write(KEYS.meta, meta);
      return write(KEYS.saved, saved);
    },

    // 最近見たページ（新しい順、同じURLは1件）
    history() {
      const h = read(KEYS.history, []);
      return Array.isArray(h) ? h.filter((x) => x && x.u && x.t).map((x) => ({ ...x, u: safeUrl(x.u) })).filter((x) => x.u) : [];
    },
    addHistory(entry) {
      const rest = this.history().filter((x) => x.u !== entry.u);
      return write(KEYS.history, [{ u: entry.u, t: String(entry.t).slice(0, 120), k: entry.k || '', at: now() }, ...rest].slice(0, HISTORY_MAX));
    },
    clearHistory() {
      return write(KEYS.history, []);
    },

    // 条件（地域・目的・業種）と、新しく出た候補の判定用の「初めて見た日時」
    prefs() {
      const p = read(KEYS.prefs, {});
      return {
        pref: String(p.pref ?? ''),
        purposes: Array.isArray(p.purposes) ? p.purposes.map(String) : [],
        industry: String(p.industry ?? ''),
        first: p.first && typeof p.first === 'object' ? p.first : null,
      };
    },
    setPrefs({ pref, purposes, industry }) {
      // 条件を変えたら、新着の判定をやり直す
      return write(KEYS.prefs, { pref: pref || '', purposes: purposes || [], industry: industry || '', first: null });
    },
    // 条件に合う制度のIDを渡す。初回は「新着」なし。以後に増えた分を、14日間「新着」にする
    trackCandidates(ids) {
      const p = this.prefs();
      const first = {};
      const t = now();
      const initial = p.first === null;
      for (const id of ids) first[id] = initial ? 0 : p.first[id] ?? t;
      write(KEYS.prefs, { pref: p.pref, purposes: p.purposes, industry: p.industry, first });
      return new Set(ids.filter((id) => first[id] && t - first[id] < NEW_DAYS * DAY));
    },

    // バックアップ（ファイルに書き出す／読み込む）
    exportAll() {
      return { app: 'hojyokin-net-mypage', version: 1, exportedAt: new Date(now()).toISOString(), saved: read(KEYS.saved, {}), meta: read(KEYS.meta, {}), history: read(KEYS.history, []), prefs: read(KEYS.prefs, {}) };
    },
    // 読み込みは、いまの保存内容に足す（同じ制度は読み込んだ内容で更新）。足した制度の数を返す
    importAll(data) {
      if (!data || data.app !== 'hojyokin-net-mypage' || typeof data.saved !== 'object' || !data.saved) throw new Error('マイページのバックアップではありません');
      const saved = read(KEYS.saved, {});
      const meta = read(KEYS.meta, {});
      let n = 0;
      for (const [id, s] of Object.entries(data.saved)) {
        if (!s || typeof s !== 'object' || !s.id || s.id !== id) continue;
        if (!saved[id]) n += 1;
        saved[id] = { id, name: String(s.name ?? ''), url: safeUrl(s.url), provider: s.provider ?? null, amount: s.amount ?? null, deadline: s.deadline ?? null, period: s.period ?? null, savedAt: Number(s.savedAt) || now() };
        const m = (data.meta || {})[id];
        if (m && typeof m === 'object') meta[id] = { status: STATUS_KEYS.has(m.status) ? m.status : 'want', result: RESULT_KEYS.has(m.result) ? m.result : '', memo: String(m.memo ?? '').slice(0, 500) };
      }
      write(KEYS.saved, saved);
      write(KEYS.meta, meta);
      return n;
    },
  };
  return store;
}
