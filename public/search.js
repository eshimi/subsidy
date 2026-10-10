// 補助金の検索画面：grants/search.json（ビルド時に生成）を読み込み、ブラウザ内で絞り込む
(function () {
  const form = document.getElementById('s-form');
  const list = document.getElementById('s-results');
  const count = document.getElementById('s-count');
  const more = document.getElementById('s-more');
  if (!form || !list) return;
  const PAGE = 50;
  const DAY = 24 * 60 * 60 * 1000;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const dateJa = (iso) => (iso ? new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', month: 'long', day: 'numeric' }).format(new Date(iso)) : '記載なし');
  const yen = (m) => (m ? `上限 ${Number(m).toLocaleString('ja-JP')}円` : '上限は公募要領で確認');
  let items = [];
  const area = (a) => {
    const parts = String(a || '全国').split(/\s*[\/／、,]\s*/).filter(Boolean);
    return parts.length > 2 ? `${parts.slice(0, 2).join('・')} ほか${parts.length - 2}地域` : parts.join('・');
  };
  let shown = PAGE;

  // URL の条件をフォームに反映する
  const params = new URLSearchParams(location.search);
  for (const el of form.elements) {
    if (!el.name || !params.has(el.name)) continue;
    if (el.type === 'checkbox') el.checked = params.get(el.name) === '1';
    else el.value = params.get(el.name);
  }

  function conditions() {
    const f = new FormData(form);
    return {
      words: String(f.get('q') || '').trim().split(/[\s　]+/).filter(Boolean),
      pref: f.get('pref') || '',
      purpose: f.get('purpose') || '',
      industry: f.get('industry') || '',
      amount: Number(f.get('amount') || 0) * 10000,
      within: Number(f.get('within') || 0),
      sort: f.get('sort') || 'end',
      national: f.get('national') === '1',
    };
  }

  function filtered(c) {
    const now = Date.now();
    let out = items.filter((g) => g.e && Date.parse(g.e) >= now);
    if (c.words.length) out = out.filter((g) => c.words.every((w) => `${g.t} ${g.a}`.includes(w)));
    if (c.pref) out = out.filter((g) => (g.a || '').includes(c.pref) || (c.national && (!g.a || g.a.includes('全国'))));
    if (c.purpose) out = out.filter((g) => (g.p || []).includes(c.purpose));
    if (c.industry) out = out.filter((g) => (g.i || []).includes(c.industry));
    if (c.amount) out = out.filter((g) => g.m && g.m >= c.amount);
    if (c.within) out = out.filter((g) => Date.parse(g.e) - now <= c.within * DAY);
    const by = {
      end: (a, b) => Date.parse(a.e) - Date.parse(b.e),
      new: (a, b) => Date.parse(b.s || 0) - Date.parse(a.s || 0),
      amount: (a, b) => (b.m || 0) - (a.m || 0),
    }[c.sort] || ((a, b) => Date.parse(a.e) - Date.parse(b.e));
    return out.sort(by);
  }

  function render() {
    const c = conditions();
    const out = filtered(c);
    const now = Date.now();
    count.textContent = out.length ? `${out.length.toLocaleString('ja-JP')} 件の募集中の補助金が見つかりました。` : '条件に合う募集中の補助金は見つかりませんでした。条件を減らすか、AIに相談して探すもお試しください。';
    list.innerHTML = out.slice(0, shown).map((g) => {
      const days = Math.ceil((Date.parse(g.e) - now) / DAY);
      const soon = days <= 30 ? `<span class="s-soon">締切まで${days}日</span>` : `締切 ${esc(dateJa(g.e))}`;
      return `<li><a href="grants/${encodeURIComponent(g.id)}.html">${esc(g.t)}</a><p>${soon}｜${esc(area(g.a))}｜${esc(yen(g.m))}</p></li>`;
    }).join('');
    more.hidden = out.length <= shown;
  }

  function syncUrl() {
    const f = new FormData(form);
    const q = new URLSearchParams();
    for (const [k, v] of f) if (v) q.set(k, v);
    if (!f.has('national')) q.set('national', '0');
    history.replaceState(null, '', `${location.pathname}${q.toString() ? `?${q}` : ''}`);
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); shown = PAGE; syncUrl(); render(); });
  form.addEventListener('change', () => { shown = PAGE; syncUrl(); render(); });
  more.addEventListener('click', () => { shown += PAGE; render(); });

  fetch('grants/search.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((data) => { items = data.items || []; render(); })
    .catch(() => { count.textContent = '補助金の一覧を読み込めませんでした。時間をおいて、もう一度お試しください。'; });
})();
