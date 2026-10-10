// 補助金を探す（search.html）：1つの入力欄で、2つの探し方を切り替える。
// ・文章と郵便番号があるとき：AIが内容を読み取って探す（app.js が /api/search を呼ぶ）
// ・それ以外：grants/search.json（ビルド時に生成）の募集中の補助金を、ブラウザ内で絞り込む
// このファイルは app.js（module）より先に読み込まれるため、送信の処理を先に受け取り、どちらで探すかを決める。
(function () {
  const form = document.getElementById('search-form');
  const list = document.getElementById('s-results');
  const count = document.getElementById('s-count');
  const more = document.getElementById('s-more');
  const kwSection = document.getElementById('kw-results');
  const aiSection = document.getElementById('results');
  const tools = ['amount', 'within', 'sort'].map((id) => document.getElementById(id));
  if (!form || !list) return;
  const PAGE = 50;
  const DAY = 24 * 60 * 60 * 1000;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const dateJa = (iso) => (iso ? new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', month: 'long', day: 'numeric' }).format(new Date(iso)) : '記載なし');
  const yen = (m) => (m ? `上限 ${Number(m).toLocaleString('ja-JP')}円` : '上限は公募要領で確認');
  const area = (a) => {
    const parts = String(a || '全国').split(/\s*[\/／、,]\s*/).filter(Boolean);
    return parts.length > 2 ? `${parts.slice(0, 2).join('・')} ほか${parts.length - 2}地域` : parts.join('・');
  };
  const zipOf = (v) => String(v || '').replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0)).replace(/\D/g, '');
  let items = [];
  let shown = PAGE;
  let loaded = false;

  const field = (name) => form.elements.namedItem(name);
  const text = () => String(field('description').value || '').trim();
  // スペースのない長い文は「文章」とみなし、キーワードの絞り込みには使わない
  const isSentence = (t) => t.length > 20 && !/[\s　]/.test(t);

  // URL の条件を反映する（AI の検索条件は app.js が desc / zip から復元する）
  const params = new URLSearchParams(location.search);
  if (params.has('q') && !params.has('desc')) field('description').value = params.get('q');
  for (const name of ['pref', 'purpose', 'industry']) if (params.has(name)) field(name).value = params.get(name);
  for (const el of tools) if (params.has(el.name)) el.value = params.get(el.name);

  // 郵便番号から分かった都道府県を、都道府県の欄に入れる
  const address = document.getElementById('address');
  new MutationObserver(() => {
    const m = address.textContent.replace(/^📍\s*/u, '').match(/^(北海道|東京都|京都府|大阪府|.{2,3}?県)/);
    if (m && [...field('pref').options].some((o) => o.value === m[1])) field('pref').value = m[1];
  }).observe(address, { childList: true, characterData: true, subtree: true });

  function conditions() {
    const t = text();
    return {
      text: t,
      words: isSentence(t) ? [] : t.split(/[\s　]+/).filter(Boolean),
      pref: field('pref').value,
      purpose: field('purpose').value,
      industry: field('industry').value,
      amount: Number(tools[0].value || 0) * 10000,
      within: Number(tools[1].value || 0),
      sort: tools[2].value || 'end',
    };
  }

  function filtered(c) {
    const now = Date.now();
    let out = items.filter((g) => g.e && Date.parse(g.e) >= now);
    if (c.words.length) out = out.filter((g) => c.words.every((w) => `${g.t} ${g.a}`.includes(w)));
    if (c.pref) out = out.filter((g) => (g.a || '').includes(c.pref) || !g.a || g.a.includes('全国'));
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
    if (!loaded) return;
    const c = conditions();
    const out = filtered(c);
    const now = Date.now();
    const note = isSentence(c.text) ? '文章で探すときは、郵便番号も入れてください（AIが内容を読み取って探します）。いまは場所と条件だけで絞り込んでいます。' : '';
    count.innerHTML = `${out.length ? `<b>${out.length.toLocaleString('ja-JP')}</b> 件の募集中の補助金が見つかりました。` : '条件に合う募集中の補助金は見つかりませんでした。キーワードや条件を減らすか、郵便番号を入れてAIで探してみてください。'}${note ? `<br><small>${esc(note)}</small>` : ''}`;
    list.innerHTML = out.slice(0, shown).map((g) => {
      const days = Math.ceil((Date.parse(g.e) - now) / DAY);
      const soon = days <= 30 ? `<span class="s-soon">締切まで${days}日</span>` : `締切 ${esc(dateJa(g.e))}`;
      return `<li><a href="grants/${encodeURIComponent(g.id)}.html">${esc(g.t)}</a><p>${soon}｜${esc(area(g.a))}｜${esc(yen(g.m))}</p></li>`;
    }).join('');
    more.hidden = out.length <= shown;
  }

  function syncUrl() {
    const c = conditions();
    const q = new URLSearchParams();
    if (c.text) q.set('q', c.text);
    for (const name of ['pref', 'purpose', 'industry']) if (field(name).value) q.set(name, field(name).value);
    for (const el of tools) if (el.value && !(el.name === 'sort' && el.value === 'end')) q.set(el.name, el.value);
    history.replaceState(null, '', `${location.pathname}${q.toString() ? `?${q}` : ''}`);
  }

  function showKeyword(scroll) {
    aiSection.hidden = true;
    kwSection.hidden = false;
    shown = PAGE;
    syncUrl();
    render();
    if (scroll) kwSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // 送信：文章と郵便番号があれば AI（app.js に任せる）、なければ募集中の補助金から絞り込む
  form.addEventListener('submit', (e) => {
    const useAi = zipOf(field('zip').value).length === 7 && text().length >= 5;
    if (useAi) { kwSection.hidden = true; return; }
    e.preventDefault();
    e.stopImmediatePropagation();
    document.getElementById('form-error').hidden = true;
    showKeyword(true);
  });
  for (const el of tools) el.addEventListener('change', () => { shown = PAGE; syncUrl(); render(); });
  more.addEventListener('click', () => { shown += PAGE; render(); });

  // AI の検索条件つきで開いたときは、募集中の一覧を隠しておく
  if (params.has('desc') && params.has('zip')) kwSection.hidden = true;

  fetch('grants/search.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((data) => { items = data.items || []; loaded = true; render(); })
    .catch(() => { count.textContent = '補助金の一覧を読み込めませんでした。時間をおいて、もう一度お試しください。'; });
})();
