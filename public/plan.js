// 事業計画書AI下書き（plan.html）。入力を /api/plan に送り、結果を表示する。
// 結果はこのブラウザ（localStorage）にだけ保存し、再読み込みしても消えないようにする（お試しは1日1回のため）
(function () {
  const form = document.getElementById('pl-form');
  if (!form) return;
  const send = document.getElementById('pl-send');
  const status = document.getElementById('pl-status');
  const result = document.getElementById('pl-result');
  const STORE = 'hojyokin-plan-draft';
  let last = null;

  for (const c of form.querySelectorAll('.pl-count')) {
    const ta = form.elements[c.dataset.for];
    const update = () => { c.textContent = `${ta.value.length} / ${ta.maxLength}`; };
    ta.addEventListener('input', update);
    update();
  }

  const el = (tag, text, cls) => {
    const e = document.createElement(tag);
    if (text != null) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  };

  function render(plan) {
    last = plan;
    document.getElementById('pl-summary').textContent = plan.summary;
    const box = document.getElementById('pl-sections');
    box.replaceChildren();
    for (const s of plan.sections) {
      const sec = el('section', null, 'pl-sec');
      sec.append(el('h3', s.heading), el('p', s.body));
      box.append(sec);
    }
    if (plan.schedule.length) {
      const sec = el('section', null, 'pl-sec');
      const table = el('table');
      for (const r of plan.schedule) {
        const tr = el('tr');
        tr.append(el('th', r.period), el('td', r.task));
        table.append(tr);
      }
      sec.append(el('h3', '実施スケジュールの例'), table);
      box.append(sec);
    }
    if (plan.questions.length) {
      const sec = el('section', null, 'pl-sec pl-q');
      const ol = el('ol');
      for (const q of plan.questions) ol.append(el('li', q));
      sec.append(el('h3', '仕上げる前に、自分で確かめて書き足すこと'), ol);
      box.append(sec);
    }
    result.hidden = false;
  }

  function asText(plan) {
    const lines = [`【${plan.subsidy}】事業計画書の下書き（たたき台）`, '※AIが作成した下書きです。そのまま提出せず、ご自身の言葉で書き直し、事実と数字を確かめてください。', '', plan.summary, ''];
    for (const s of plan.sections) lines.push(`■ ${s.heading}`, s.body, '');
    if (plan.schedule.length) lines.push('■ 実施スケジュールの例', ...plan.schedule.map((r) => `・${r.period}：${r.task}`), '');
    if (plan.questions.length) lines.push('■ 仕上げる前に、自分で確かめて書き足すこと', ...plan.questions.map((q, i) => `${i + 1}. ${q}`), '');
    lines.push('作成：補助金ネット 事業計画書AI下書き（https://hojyokin.net/plan.html）');
    return lines.join('\n');
  }

  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || 'null');
    if (saved && saved.plan) render(saved.plan);
  } catch { /* 保存できない環境では何もしない */ }

  document.getElementById('pl-copy').addEventListener('click', async (e) => {
    if (!last) return;
    try {
      await navigator.clipboard.writeText(asText(last));
      e.target.textContent = 'コピーしました';
    } catch {
      e.target.textContent = 'コピーできませんでした';
    }
    setTimeout(() => { e.target.textContent = 'テキストをコピー'; }, 2000);
  });

  document.getElementById('pl-save').addEventListener('click', () => {
    if (!last) return;
    const url = URL.createObjectURL(new Blob([asText(last)], { type: 'text/plain;charset=utf-8' }));
    const a = el('a');
    a.href = url;
    a.download = '事業計画書_下書き.txt';
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'pl-status';
    if (!form.elements.agree.checked) {
      status.className = 'pl-status err';
      status.textContent = '「ご利用の前に」への同意にチェックを入れてください。';
      return;
    }
    const body = {};
    for (const k of ['subsidy', 'industry', 'employees', 'business', 'issue', 'idea', 'goal', 'website']) body[k] = form.elements[k].value;
    send.disabled = true;
    send.querySelector('span').textContent = '作成しています…';
    status.textContent = '下書きを作成しています。1〜2分ほどかかることがあります。このままお待ちください。';
    try {
      const res = await fetch('/api/plan', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || '下書きを作成できませんでした。時間をおいて、もう一度お試しください。');
      render(data);
      try { localStorage.setItem(STORE, JSON.stringify({ plan: data, at: Date.now() })); } catch { /* 保存できなくても表示は続ける */ }
      status.textContent = '下書きができました。';
      result.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof gtag === 'function') gtag('event', 'plan_draft', { subsidy: body.subsidy });
    } catch (err) {
      status.className = 'pl-status err';
      status.textContent = err.message;
    } finally {
      send.disabled = false;
      send.querySelector('span').textContent = '下書きを作る';
    }
  });
})();
