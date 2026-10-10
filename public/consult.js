// 無料相談のお申し込み：AI補助金判定の回答（URLの条件）をフォームに入れ、/api/consult に送る
(function () {
  const form = document.getElementById('cs-form');
  if (!form) return;
  const status = document.getElementById('cs-status');
  const cands = document.getElementById('cs-cands');
  const done = document.getElementById('cs-done');
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const params = new URLSearchParams(location.search);
  for (const key of ['kind', 'industry', 'employees', 'koyou', 'shakai', 'topic', 'timing']) {
    const el = form.elements[key];
    const v = params.get(key);
    if (el && v && [...el.options].some((o) => o.value === v)) el.value = v;
  }
  const candidates = (params.get('c') || '').split('|').map((x) => x.trim()).filter(Boolean).slice(0, 8);
  if (candidates.length) {
    cands.innerHTML = `<strong>AI補助金判定で表示した候補</strong><br>${candidates.map(esc).join('<br>')}`;
    cands.hidden = false;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const body = Object.fromEntries(f.entries());
    body.consent = f.get('consent') === 'on';
    body.candidates = candidates;
    const missing = ['kind', 'industry', 'employees', 'koyou', 'shakai', 'topic', 'timing', 'company', 'name', 'phone'].filter((k) => !String(body[k] || '').trim());
    if (missing.length) { status.className = 'cs-status err'; status.textContent = '必須の項目をすべて入力・選択してください。'; return; }
    if (!body.consent) { status.className = 'cs-status err'; status.textContent = '個人情報の取り扱いへの同意が必要です。'; return; }
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.className = 'cs-status';
    status.textContent = '送信しています…';
    try {
      const res = await fetch('/api/consult', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || '送信できませんでした。');
      form.hidden = true;
      done.hidden = false;
      done.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      status.className = 'cs-status err';
      status.textContent = err.message;
    } finally {
      btn.disabled = false;
    }
  });
})();
