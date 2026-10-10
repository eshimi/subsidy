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

  // 1件の制度が条件に合うか。over は、1つの条件だけ差し替えて数えるときに使う
  function matches(li, c, over = {}) {
    const x = { ...c, ...over };
    const now = Date.now();
    return x.words.every((w) => li.dataset.t.includes(w))
      && (!x.p || li.dataset.p.split(' ').includes(x.p))
      && (!x.i || li.dataset.i.split(' ').includes(x.i))
      && (!x.m || Number(li.dataset.max) >= x.m)
      && (!x.d || (time(li.dataset.end) - now <= x.d * DAY));
  }

  function conditions() {
    const f = new FormData(form);
    return {
      words: String(f.get('q') || '').trim().split(/[\s　]+/).filter(Boolean),
      p: f.get('p') || '',
      i: f.get('i') || '',
      m: Number(f.get('m') || 0),
      d: Number(f.get('d') || 0),
      s: f.get('s') || 'end',
    };
  }

  // 絞り込みの選択肢ごとに、ほかの条件はそのままで何件になるかを数え、0件の選択肢は選べなくする
  const FACETS = ['p', 'i', 'm', 'd'];
  for (const sel of form.querySelectorAll('select')) for (const o of sel.options) o.dataset.label = o.textContent;
  function updateFacets(c) {
    for (const key of FACETS) {
      const sel = form.elements.namedItem(key);
      if (!sel) continue;
      for (const o of sel.options) {
        const value = key === 'm' || key === 'd' ? Number(o.value || 0) : o.value;
        const n = items.filter((li) => matches(li, c, { [key]: value })).length;
        o.textContent = `${o.dataset.label}（${n}）`;
        o.disabled = n === 0 && o.value !== '' && o.value !== sel.value;
      }
    }
  }

  function apply() {
    const c = conditions();
    let shown = 0;
    const sorted = [...items].sort(SORTS[c.s] || SORTS.end);
    for (const li of sorted) {
      const ok = matches(li, c);
      li.hidden = !ok;
      if (ok) shown++;
      list.appendChild(li);
    }
    updateFacets(c);
    count.textContent = shown === items.length ? `${items.length} 件` : shown ? `${items.length} 件中 ${shown} 件を表示` : '条件に合う制度がありません。キーワードや条件を変えてください。';
    const q = new URLSearchParams();
    for (const [k, v] of new FormData(form)) if (v && !(k === 's' && v === 'end')) q.set(k, v);
    history.replaceState(null, '', `${location.pathname}${q.toString() ? `?${q}` : ''}`);
  }

  form.addEventListener('input', apply);
  form.addEventListener('change', apply);
  apply();
})();
