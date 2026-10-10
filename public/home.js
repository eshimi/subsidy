// トップページ：締切が近い補助金と新着の補助金を、grants/search.json（ビルド時に生成）から表示する
(function () {
  const soon = document.getElementById('r-soon');
  const fresh = document.getElementById('r-new');
  const total = document.getElementById('r-total');
  if (!soon || !fresh) return;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const DAY = 24 * 60 * 60 * 1000;
  const area = (a) => {
    const parts = String(a || '全国').split(/\s*[\/／、,]\s*/).filter(Boolean);
    return parts.length > 2 ? `${parts.slice(0, 2).join('・')} ほか${parts.length - 2}地域` : parts.join('・');
  };
  const empty = (el, msg) => { el.innerHTML = `<li class="r-empty">${esc(msg)}</li>`; };
  const item = (g, meta) => `<li><a href="grants/${encodeURIComponent(g.id)}.html">${esc(g.t)}</a><span class="m">${meta}｜${esc(area(g.a))}</span></li>`;
  fetch('grants/search.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((data) => {
      const now = Date.now();
      const open = (data.items || []).filter((g) => g.e && Date.parse(g.e) >= now);
      if (total && open.length) total.textContent = `いま募集中 ${open.length.toLocaleString('ja-JP')} 件・毎日更新。`;
      const live = document.getElementById('r-live');
      if (live && open.length) live.innerHTML = `${open.length.toLocaleString('ja-JP')}<small>件</small>`;
      const bySoon = [...open].sort((a, b) => Date.parse(a.e) - Date.parse(b.e)).slice(0, 6);
      const byNew = [...open].filter((g) => g.s).sort((a, b) => Date.parse(b.s) - Date.parse(a.s)).slice(0, 6);
      if (bySoon.length) soon.innerHTML = bySoon.map((g) => item(g, `<span class="soon">締切まで${Math.max(0, Math.ceil((Date.parse(g.e) - now) / DAY))}日</span>`)).join('');
      else empty(soon, '表示できる制度がありません。');
      if (byNew.length) fresh.innerHTML = byNew.map((g) => item(g, '受付中')).join('');
      else empty(fresh, '表示できる制度がありません。');
    })
    .catch(() => {
      empty(soon, '一覧を読み込めませんでした。締切が近い補助金のページをご覧ください。');
      empty(fresh, '一覧を読み込めませんでした。キーワード検索のページをご覧ください。');
    });
})();
