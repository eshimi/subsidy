// 会員（Google ログイン）のブラウザ側。ログイン中は、保存データの置き場（storage）をサーバー（D1）に切り替える。
// storage は localStorage と同じ getItem / setItem だけを持つので、mypage-store.js も app.js も、置き場の違いを知らなくてよい。
// 会員機能が未設定のサーバー、またはログインしていないときは、いままでどおりこのブラウザの localStorage を使う。
import { KEYS } from './mypage-store.js';

const SAVED = KEYS.saved, META = KEYS.meta;
const parse = (v, fallback) => { try { return JSON.parse(v) ?? fallback; } catch { return fallback; } };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const DEFAULT_META = { status: 'want', result: '', memo: '' };

async function api(path, body) {
  const res = await fetch(path, body === undefined ? { credentials: 'same-origin' } : { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || String(res.status)), { status: res.status });
  return data;
}

// サーバーのデータを手元に持ち、書き込みの差分を変更の一覧（ops）にして、まとめて送る
export function serverStorage(initial, send) {
  const mem = { [SAVED]: initial.saved || {}, [META]: initial.meta || {}, [KEYS.history]: initial.history || [], [KEYS.prefs]: initial.prefs || {} };
  let queue = [];
  let timer = null;
  let sending = Promise.resolve();

  const flush = () => {
    clearTimeout(timer);
    timer = null;
    sending = sending.then(async () => {
      while (queue.length) {
        const chunk = queue.slice(0, 200);
        try { await send(chunk); queue = queue.slice(chunk.length); } catch (e) { if (e.status === 401 || e.status === 400) queue = queue.slice(chunk.length); return; }
      }
    });
    return sending;
  };
  const push = (ops) => {
    queue.push(...ops);
    if (!timer) timer = setTimeout(flush, 600);
  };

  return {
    getItem: (key) => (key in mem ? JSON.stringify(mem[key]) : null),
    setItem(key, value) {
      if (!(key in mem)) return;
      const next = parse(value, key === KEYS.history ? [] : {});
      const prev = mem[key];
      if (same(prev, next)) return;
      const ops = [];
      if (key === SAVED) {
        for (const [id, it] of Object.entries(next)) if (!same(prev[id], it)) ops.push({ op: 'save', item: it });
        for (const id of Object.keys(prev)) if (!(id in next)) ops.push({ op: 'remove', id });
      } else if (key === META) {
        for (const [id, m] of Object.entries(next)) if (!same(prev[id], m)) ops.push({ op: 'meta', id, meta: m });
        for (const id of Object.keys(prev)) if (!(id in next) && id in mem[SAVED]) ops.push({ op: 'meta', id, meta: DEFAULT_META });
      } else {
        ops.push({ op: 'kv', k: key === KEYS.history ? 'history' : 'prefs', v: next });
      }
      mem[key] = next;
      push(ops);
    },
    flush,
    pending: () => queue.length,
  };
}

export function loadGis() {
  if (window.google?.accounts?.id) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.onload = resolve;
    s.onerror = () => reject(new Error('gis'));
    document.head.append(s);
  });
}

// Google のボタンを container に出す。ログインできたらページを読み込み直す
export async function renderLoginButton(container) {
  const { googleClientId } = await fetch('/api/config').then((r) => r.json());
  if (!googleClientId) return false;
  await loadGis();
  window.google.accounts.id.initialize({
    client_id: googleClientId,
    callback: async ({ credential }) => {
      try { await api('/api/auth/google', { credential }); location.reload(); } catch (e) { container.dataset.error = e.message; container.dispatchEvent(new CustomEvent('login-error', { detail: e.message })); }
    },
  });
  window.google.accounts.id.renderButton(container, { theme: 'outline', size: 'large', text: 'signin_with', locale: 'ja' });
  return true;
}

export async function logout() {
  await accountReady.then((a) => a.storage.flush?.());
  await api('/api/auth/logout', {});
  location.reload();
}
export async function deleteAccount() {
  await api('/api/account/delete', {});
  location.reload();
}

async function init() {
  const guest = { enabled: false, user: null, storage: globalThis.localStorage };
  try {
    const me = await api('/api/me');
    if (!me.enabled) return guest;
    if (!me.user) return { ...guest, enabled: true };
    const data = await api('/api/mypage');
    const storage = serverStorage(data, (ops) => api('/api/mypage/ops', { ops }));
    // タブを閉じる・移動する前に、送っていない変更を送る
    addEventListener('pagehide', () => {
      if (!storage.pending()) return;
      storage.flush();
    });
    return { enabled: true, user: me.user, storage };
  } catch {
    return guest; // 読み込めないときは、ログインしていないときと同じ扱い（このブラウザの保存）
  }
}

export const accountReady = init();
