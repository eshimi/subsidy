// 補助金の一覧（grants/ の都道府県別・締切・目的別などのページ）の並べ替えと絞り込み。
// 一覧の各項目は data-end / data-start / data-max / data-p（目的） / data-i（業種） / data-t（制度名）を持つ。
(function () {
  const form = document.querySelector('[data-grant-list]');
  const list = document.querySelector('[data-grant-items]');
  if (!form || !list) return;
  const count = document.querySelector('.gl-count');
  const items = [...list.children];
  const DAY = 24 * 60 * 60 * 1000;
  const time = (v) => (v ? Date.parse(v) : NaN);

  // URL の条件を反映する（共有・再読み込みで同じ表示にする）
  const params = new URLSearchParams(location.search);
  for (const el of form.elements) if (el.name && params.has(el.name)) el.value = params.get(el.name);

  const SORTS = {
    end: (a, b) => (time(a.dataset.end) || Infinity) - (time(b.dataset.end) || Infinity),
    'end-desc': (a, b) => (time(b.dataset.end) || -Infinity) - (time(a.dataset.end) || -Infinity),
    new: (a, b) => (time(b.dataset.start) || 0) - (time(a.dataset.start) || 0),
    max: (a, b) => Number(b.dataset.max) - Number(a.dataset.max),
    name: (a, b) => a.dataset.t.localeCompare(b.dataset.t, 'ja'),
  };

  function apply() {
    const f = new FormData(form);
    const words = String(f.get('q') || '').trim().split(/[\s　]+/).filter(Boolean);
    const p = f.get('p');
    const i = f.get('i');
    const m = Number(f.get('m') || 0);
    const d = Number(f.get('d') || 0);
    const now = Date.now();
    let shown = 0;
    const sorted = [...items].sort(SORTS[f.get('s')] || SORTS.end);
    for (const li of sorted) {
      const ok = words.every((w) => li.dataset.t.includes(w))
        && (!p || li.dataset.p.split(' ').includes(p))
        && (!i || li.dataset.i.split(' ').includes(i))
        && (!m || Number(li.dataset.max) >= m)
        && (!d || (time(li.dataset.end) - now <= d * DAY));
      li.hidden = !ok;
      if (ok) shown++;
      list.appendChild(li);
    }
    count.textContent = shown === items.length ? `${items.length} 件` : `${items.length} 件中 ${shown} 件を表示`;
    const q = new URLSearchParams();
    for (const [k, v] of f) if (v && !(k === 's' && v === 'end')) q.set(k, v);
    history.replaceState(null, '', `${location.pathname}${q.toString() ? `?${q}` : ''}`);
  }

  form.addEventListener('input', apply);
  form.addEventListener('change', apply);
  apply();
})();
