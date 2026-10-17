// 「☆ 保存」ボタン（検索結果のカード・制度の詳細ページ）。data-save に、保存する制度の情報（JSON）を入れておく。
// ログイン中はサーバー（D1）、そうでなければこのブラウザに保存する（置き場は account.js が決める）。
// 検索ページの app.js（#results の AI 検索結果）も、同じ保存（KEYS.saved）と、同じ 'saved-changed' の通知を使う。
import { accountReady } from './account.js';
import { KEYS } from './mypage-store.js';

const { storage } = await accountReady;

const load = () => {
  try { return JSON.parse(storage.getItem(KEYS.saved)) ?? {}; } catch { return {}; }
};
const info = (btn) => {
  try {
    const it = JSON.parse(btn.dataset.save);
    return it && it.id && it.name ? it : null;
  } catch { return null; }
};
const paint = (btn, on) => {
  btn.setAttribute('aria-pressed', String(on));
  btn.textContent = on ? '★ 保存済み' : '☆ 保存';
};
const paintAll = () => {
  const saved = load();
  document.querySelectorAll('[data-save]').forEach((b) => {
    const it = info(b);
    if (it) paint(b, !!saved[it.id]);
  });
};

let toastTimer;
function toast(msg) {
  document.querySelector('.toast')?.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = msg;
  document.body.append(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), 2400);
}

document.addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-save]');
  if (!btn) return;
  const it = info(btn);
  if (!it) return;
  const saved = load();
  if (saved[it.id]) delete saved[it.id];
  else {
    saved[it.id] = { id: it.id, name: it.name, url: it.url || '', provider: it.provider ?? null, amount: it.amount ?? null, deadline: it.deadline ?? null, period: it.period ?? null, savedAt: Date.now() };
  }
  try {
    storage.setItem(KEYS.saved, JSON.stringify(saved));
  } catch {
    toast('このブラウザでは保存できませんでした');
    return;
  }
  toast(saved[it.id] ? 'マイページに保存しました' : '保存をはずしました');
  document.dispatchEvent(new Event('saved-changed'));
});

document.addEventListener('saved-changed', paintAll);
// 検索結果は何度も描き直されるので、描き直したあとの状態（★／☆）も合わせる
let pending = false;
new MutationObserver(() => {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => { pending = false; paintAll(); });
}).observe(document.body, { childList: true, subtree: true });
paintAll();
