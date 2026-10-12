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
  let zipRest = '';
  let zipPref = '';
  let cityNames = [];

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
    if (m && [...field('pref').options].some((o) => o.value === m[1])) {
      field('pref').value = m[1];
      // 都道府県のあとの住所（市区町村の判定に使う）。「（推定）」のときは市区町村が分からない
      zipPref = m[1];
      zipRest = /（推定）/.test(address.textContent) ? '' : address.textContent.replace(/^📍\s*/u, '').slice(m[1].length);
    } else { zipRest = ''; zipPref = ''; }
    if (loaded) render();
    renderAiLocal();
  }).observe(address, { childList: true, characterData: true, subtree: true });

  // 入力から、都道府県名と、探す言葉を取り出す（「東京で耐震」→ 東京都 ／ 耐震）
  const prefOptions = [...field('pref').options].map((o) => o.value).filter(Boolean);
  const splitQuery = (t) => {
    let rest = t;
    let pref = '';
    for (const v of prefOptions) {
      const short = v === '北海道' ? v : v.replace(/[都府県]$/, '');
      if (short.length >= 2 && rest.includes(short)) {
        pref = pref || v;
        rest = rest.replace(short, ' ');
      }
    }
    // 市区町村名（制度のある市区町村の名前を、長いものから探す。「四日市市」が「四日市」にならないように）
    let city = '';
    for (const n of cityNames) {
      if (rest.includes(n)) { city = n; rest = rest.replace(n, ' '); break; }
    }
    const words = rest.split(/[\s　]+|では|で|の|に|を|が|は|や|と|も|から|など/).filter((w) => w.length >= 1);
    return { pref, city, words };
  };

  // 制度の地域（「東京都・足立区」）から、市区町村の名前を取り出す。市区町村の制度だけに付く
  const cityOf = (g) => (g.local ? String(g.a || '').split('・')[1] || '' : '');
  const prefOfCity = (city) => {
    if (!city) return '';
    const hit = items.find((g) => g.local && cityOf(g) === city);
    return hit ? String(hit.a).split('・')[0] : '';
  };
  // 郵便番号の住所から、制度のある市区町村を探す（長い名前から）
  // 郵便番号の都道府県と、選んでいる都道府県が違うときは、その市区町村は使わない
  const zipCityOf = (pref) => (!pref || pref === zipPref ? cityNames.find((n) => zipRest.startsWith(n)) || '' : '');

  function conditions() {
    const t = text();
    const q = isSentence(t) ? { pref: '', city: '', words: [] } : splitQuery(t);
    // 市区町村：入力した名前を優先し、なければ郵便番号の住所から
    const city = q.city || zipCityOf(field('pref').value || q.pref);
    const pref = field('pref').value || q.pref || prefOfCity(city);
    return {
      text: t,
      words: q.words,
      city,
      pref,
      purpose: field('purpose').value,
      industry: field('industry').value,
      amount: Number(tools[0].value || 0) * 10000,
      within: Number(tools[1].value || 0),
      sort: tools[2].value || 'end',
    };
  }

  // 言葉から、補助金の目的・業種のタグを推測する（日常の言葉で探せるように）
  const TAG_HINTS = [
    [/設備|機械|機器|工場|改装|改修|車両|内装|厨房|客席|加工機|ロボット|搬送|検査装置|製造ライン|釣銭/, 'purposes', 'equipment'],
    [/IT|ＩＴ|DX|デジタル|システム|ソフト|会計|AI|アプリ|レジ|POS|ＰＯＳ|券売機|キャッシュレス|注文端末|在庫|パソコン|タブレット|受発注|サーバー|周辺機器/i, 'purposes', 'digital'],
    [/販路|販売|販促|ホームページ|HP|広告|チラシ|EC|通販|展示会|海外|輸出|売上|集客|パンフ|看板|出展/i, 'purposes', 'sales'],
    [/人材|雇用|採用|研修|教育|賃上げ|正社員|従業員|資格|講座|リスキリング/, 'purposes', 'hiring'],
    [/省エネ|脱炭素|再エネ|太陽光|LED|環境|空調|エアコン|冷蔵|蓄電池|照明/i, 'purposes', 'green'],
    [/研究|開発|試作|新製品|新商品|技術/, 'purposes', 'research'],
    [/承継|引継|M&A|仲介|会社を譲/i, 'purposes', 'succession'],
    [/創業|起業|開業|副業|独立/, 'purposes', 'startup'],
    [/地域|観光|農林|農業|漁業|移住|地方/, 'purposes', 'region'],
    [/飲食|カフェ|レストラン|居酒屋|食品|料理|弁当/, 'industries', 'food'],
    [/小売|商店|物販|販売店/, 'industries', 'retail'],
    [/美容|理容|サロン|エステ/, 'industries', 'beauty'],
    [/建設|住宅|リフォーム|工務/, 'industries', 'construction'],
    [/製造|ものづくり|加工/, 'industries', 'manufacturing'],
    [/情報通信|ソフトウェア/, 'industries', 'it'],
    [/宿泊|旅館|ホテル|観光/, 'industries', 'tourism'],
    [/農業|農林|漁業|水産/, 'industries', 'agriculture'],
    [/医療|介護|保育|福祉/, 'industries', 'care'],
  ];
  const bigrams = (t) => {
    const x = t.replace(/[\s　、。,.!！?？]/g, '');
    const set = new Set();
    for (let i = 0; i < x.length - 1; i++) set.add(x.slice(i, i + 2));
    return set;
  };

  // 1件の補助金の関連度。タイトルの一致を最も重く、次に目的・業種のタグ、地域の順
  function scoreOf(g, c) {
    const query = c.text;
    const title = String(g.t || '');
    const area = String(g.a || '');
    let s = 0;
    // ふだんの言葉（g.k）：入力と、言葉どうしが含み合うときに一致とみなす（1語のときは完全一致も可）
    const everyday = Array.isArray(g.k) ? g.k : [];
    for (const w of c.words) {
      const lw = w.toLowerCase();
      if (title.toLowerCase().includes(lw)) s += 3;
      else if (area.toLowerCase().includes(lw)) s += 1;
      if (everyday.some((k) => k === w || (w.length >= 2 && k.includes(w)) || (k.length >= 2 && w.includes(k)))) s += 2;
    }
    const hits = new Set();
    for (const [re, kind, slug] of TAG_HINTS) if (re.test(query)) hits.add(kind + ':' + slug);
    for (const hit of hits) {
      const [kind, slug] = hit.split(':');
      const tags = kind === 'purposes' ? g.p : g.i;
      if ((tags || []).includes(slug)) s += 2;
    }
    if (c.words.length === 0 && query) {
      // 文章の場合：文字の並びの重なりで、タイトルとの近さを見る
      const q = bigrams(query);
      const tb = bigrams(`${title} ${everyday.join(' ')}`);
      let n = 0;
      for (const b of q) if (tb.has(b)) n++;
      const ratio = q.size ? n / q.size : 0;
      if (ratio >= 0.2) s += Math.round(ratio * 6);
    }
    return s;
  }

  function filtered(c) {
    const now = Date.now();
    let out = items.filter((g) => g.guide || (g.e && Date.parse(g.e) >= now));
    // 探す言葉があるとき（文章を含む）は、関連度で絞る。地域だけのときは絞らない
    const hasQuery = c.words.length > 0 || isSentence(c.text);
    const scores = new Map();
    if (hasQuery) {
      out = out.filter((g) => {
        const s = scoreOf(g, c);
        if (s > 0) scores.set(g, s);
        return s > 0;
      });
    }
    if (c.pref) out = out.filter((g) => (g.a || '').includes(c.pref) || !g.a || g.a.includes('全国'));
    // 市区町村が分かっているときは、ほかの市区町村の制度は出さない（県の制度・全国の制度は残す）
    if (c.city) out = out.filter((g) => !cityOf(g) || cityOf(g) === c.city);
    if (c.purpose) out = out.filter((g) => (g.p || []).includes(c.purpose));
    if (c.industry) out = out.filter((g) => (g.i || []).includes(c.industry));
    if (c.amount) out = out.filter((g) => g.m && g.m >= c.amount);
    if (c.within) out = out.filter((g) => Date.parse(g.e) - now <= c.within * DAY);
    // 締切のない解説ページは、締切の順の最後に並べる
    const endOf = (g) => { const d = g.e || g.dl; return d && Date.parse(d) >= now ? Date.parse(d) : Infinity; };
    const byEnd = (a, b) => (endOf(a) === endOf(b) ? 0 : endOf(a) < endOf(b) ? -1 : 1);
    const by = {
      end: byEnd,
      new: (a, b) => Date.parse(b.s || 0) - Date.parse(a.s || 0),
      amount: (a, b) => (b.m || 0) - (a.m || 0),
    }[c.sort] || byEnd;
    // キーワードで探したときは、関連度の高い順（同じなら締切の早い順）。並べ替えを選んだときはそれに従う
    // 市区町村が分かっているときは、その市区町村の制度を先に並べる
    const near = (g) => (c.city && cityOf(g) === c.city ? 0 : 1);
    if (hasQuery && c.sort === 'end') return out.sort((a, b) => near(a) - near(b) || (scores.get(b) || 0) - (scores.get(a) || 0) || byEnd(a, b));
    if (c.city && c.sort === 'end') return out.sort((a, b) => near(a) - near(b) || byEnd(a, b));
    return out.sort(by);
  }

  // ── カード（AIで探した結果と同じ見た目） ──
  const LEVEL = { national: '国', prefecture: '都道府県', municipality: '市区町村' };
  const kindOf = (g) => (g.resident ? g.cat : g.local ? '事業者向けの制度' : g.guide ? '解説ページ' : g.url ? '国の制度' : '募集中の補助金');
  const deadlineOf = (g) => g.e || g.dl || '';
  function statusBadge(g, now) {
    const d = deadlineOf(g);
    if (!d) return '';
    const days = Math.ceil((Date.parse(d) - now) / DAY);
    if (days < 0) return '<span class="badge closed">今年度は受付終了</span>';
    if (days <= 30) return `<span class="badge closing">締切間近 あと${days}日</span>`;
    return `<span class="badge open">締切 ${esc(dateJa(d))}${g.est ? '（見込み）' : ''}</span>`;
  }
  function card(g, i, now) {
    const idx = String(i + 1).padStart(2, '0');
    const status = statusBadge(g, now);
    if (g.local) {
      const city = cityOf(g);
      const more = g.url ? `<a href="${esc(g.url)}">${city ? `${esc(city)}の` : ''}ページで、ほかの制度も見る</a>` : '';
      return `<article class="program"><div class="p-index">${idx}</div><div class="p-main">
        <div class="meta-line"><span class="badge level">${esc(LEVEL[g.lv] || '自治体')}</span>${g.ty ? `<span class="badge type">${esc(g.ty)}</span>` : ''}<span class="badge live">${esc(g.cat || '事業者向け')}</span>${status}</div>
        <h3><a href="${esc(g.url)}">${esc(g.t)}</a></h3>
        <p class="provider">${esc(g.pv || g.a)}</p>
        ${g.sm ? `<p class="summary-text">${esc(g.sm)}</p>` : ''}
        ${g.el && g.el.length ? `<details><summary>主な要件</summary><ul>${g.el.map((e) => `<li>${esc(e)}</li>`).join('')}</ul><p class="checked-at"><small>⚠️ 申請の前に、必ず公式ページで最新の内容を確認してください。</small></p></details>` : ''}
        <div class="link-row">${g.o ? `<a href="${esc(g.o)}" target="_blank" rel="noopener">公式ページを見る ↗</a>` : ''}${more}</div>
      </div><div class="p-side">${g.am ? `<p class="amount">${esc(g.am)}</p>` : ''}${g.pd ? `<p class="period">${esc(g.pd)}</p>` : ''}</div></article>`;
    }
    if (g.guide) {
      return `<article class="program"><div class="p-index">${idx}</div><div class="p-main">
        <div class="meta-line"><span class="badge level">解説</span></div>
        <h3><a href="${esc(g.url)}">${esc(g.t)}</a></h3>
        <p class="summary-text">個人の方向けの、仕組みと申請の流れをまとめたページです。</p>
        <div class="link-row"><a href="${esc(g.url)}">解説ページを見る</a></div>
      </div><div class="p-side"></div></article>`;
    }
    const href = g.url ? esc(g.url) : `grants/${encodeURIComponent(g.id)}.html`;
    const ext = g.url ? ' target="_blank" rel="noopener"' : '';
    return `<article class="program"><div class="p-index">${idx}</div><div class="p-main">
      <div class="meta-line"><span class="badge live">${g.url ? '国' : '募集中'}</span>${status}</div>
      <h3><a href="${href}"${ext}>${esc(g.t)}</a></h3>
      <p class="provider">対象地域：${esc(area(g.a))}</p>
      <div class="link-row"><a href="${href}"${ext}>${g.url ? '公式ページを見る ↗' : '詳細を見る'}</a></div>
    </div><div class="p-side"><p class="amount">${esc(yen(g.m))}</p></div></article>`;
  }

  let activeKind = 'すべて';
  function render() {
    if (!loaded) return;
    const c = conditions();
    const all = filtered(c);
    const now = Date.now();
    // 分野の絞り込みボタン（件数つき）
    const kinds = [...new Set(all.map(kindOf))];
    if (activeKind !== 'すべて' && !kinds.includes(activeKind)) activeKind = 'すべて';
    const out = activeKind === 'すべて' ? all : all.filter((g) => kindOf(g) === activeKind);
    const countOf = (k) => (k === 'すべて' ? all.length : all.filter((g) => kindOf(g) === k).length);
    document.getElementById('s-filters').innerHTML = ['すべて', ...kinds].map((k) => `<button type="button" class="filter" aria-pressed="${k === activeKind}" data-kind="${esc(k)}">${esc(k)}<sup>${countOf(k)}</sup></button>`).join('');
    document.getElementById('s-listcount').textContent = out.length ? `${out.length.toLocaleString('ja-JP')}件・${c.text && !isSentence(c.text) ? '関連度順' : '締切順'}` : '';
    // 概要
    const place = `${c.city || c.pref || ''}`;
    const title = place ? `${place}${c.words.length ? `の「${c.words.join('・')}」` : ''}で使えそうな補助金` : c.text && !isSentence(c.text) ? `「${c.text}」に近い補助金` : '募集中の補助金';
    const chips = [c.pref, c.city, ...c.words, c.purpose && '目的で絞り込み中', c.industry && '業種で絞り込み中'].filter(Boolean);
    const note = isSentence(c.text) ? '文章から言葉を拾って、近い制度を探しています。郵便番号も入れると、AIが内容を読み取って探します。' : '';
    count.innerHTML = out.length
      ? `<p class="summary-count"><span class="big-num">${out.length.toLocaleString('ja-JP')}</span><span class="big-unit">件</span></p>
         <div class="summary-body"><p class="label">検索結果</p><h2>${esc(title)}</h2>
         ${chips.length ? `<div class="tags">${chips.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : ''}
         ${c.city ? `<p class="notice">${esc(c.city)}の制度を先に表示しています。県・全国の制度も含みます。</p>` : ''}
         ${note ? `<p class="notice">${esc(note)}</p>` : ''}</div>`
      : `<div class="summary-body"><p class="label">検索結果</p><h2>条件に合う募集中の補助金は見つかりませんでした</h2><p class="notice">キーワードや条件を減らすか、郵便番号を入れてAIで探してみてください。</p></div>`;
    list.innerHTML = out.slice(0, shown).map((g, i) => card(g, i, now)).join('');
    more.hidden = out.length <= shown;
  }
  document.getElementById('s-filters').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-kind]');
    if (!b) return;
    activeKind = b.dataset.kind;
    shown = PAGE;
    render();
  });

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
    form.classList.add('is-compact');
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


  // ── 結果の見出しの行の「条件」ボタン（郵便番号・都道府県・目的・業種・事業の状況・当てはまるもの） ──
  // 条件の入力はここにまとめる。上のフォームの同じ欄（画面では隠している）と値を共有するので、AIの検索にもそのまま使われる。
  // AIで探した結果が出ているときは、郵便番号・事業の状況・当てはまるものを変えるとAIで探し直す。それ以外は、その場で絞り込む。
  const attrBoxes = [...form.querySelectorAll('input[name="attributes"]')];
  const attrLabel = (box) => box.closest('label').textContent.trim();
  const cityField = form.querySelector('.city-field');
  const opts = (name) => field(name).innerHTML;
  function refinePop() {
    const el = document.createElement('details');
    el.className = 'refine-pop';
    el.innerHTML = `
      <summary class="refine-btn" aria-label="条件を追加して絞り込む">条件を追加 <span class="n" aria-hidden="true"></span> <span aria-hidden="true">▾</span></summary>
      <div class="refine-panel" role="group" aria-label="条件を追加して絞り込む">
        <div class="refine-grid">
          <label class="u-sub">郵便番号<input data-r="zip" inputmode="numeric" autocomplete="postal-code" placeholder="123-4567" maxlength="8"></label>
          <label class="u-sub">都道府県<select data-r="pref">${opts('pref')}</select></label>
          <label class="u-sub">目的<select data-r="purpose">${opts('purpose')}</select></label>
          <label class="u-sub">業種<select data-r="industry">${opts('industry')}</select></label>
          <label class="u-sub">事業の状況<select data-r="stage">${opts('stage')}</select></label>
          <label class="u-sub" data-city hidden>市区町村<input data-r="city" placeholder="例：横浜市中区"></label>
        </div>
        <p class="hint" data-r="address" aria-live="polite"></p>
        <div class="refine-attrs" role="group" aria-label="当てはまるもの">${attrBoxes.map((b) => `<label class="toggle"><input type="checkbox" data-r-attr="${esc(b.value)}"><span>${esc(attrLabel(b))}</span></label>`).join('')}</div>
        <button type="button" class="refine-clear" data-clear>条件をすべてクリア</button>
      </div>`;
    return el;
  }
  const bars = [refinePop(), refinePop()];
  // 置き場所：キーワードの結果は「上限額・締切・並び順」の左、AIの結果は種類・金額の絞り込みの行
  kwSection.querySelector('.u-tools').prepend(bars[0]);
  bars[1].classList.add('at-left');
  document.querySelector('#results .toolbar').prepend(bars[1]);

  function syncBars() {
    const filled = [];
    for (const bar of bars) {
      for (const c of bar.querySelectorAll('[data-r]')) {
        const name = c.dataset.r;
        if (name === 'address') c.textContent = address.textContent.replace(/^📍\s*/u, '');
        else if (document.activeElement !== c) c.value = field(name).value;
      }
      for (const c of bar.querySelectorAll('[data-r-attr]')) c.checked = attrBoxes.some((b) => b.value === c.dataset.rAttr && b.checked);
      bar.querySelector('[data-city]').hidden = !cityField || cityField.hidden;
    }
    // 入れてある条件の数（ボタンに表示）
    let n = ['zip', 'pref', 'purpose', 'industry', 'stage'].filter((k) => String(field(k).value || '').trim()).length;
    n += attrBoxes.filter((b) => b.checked).length;
    for (const bar of bars) bar.querySelector('.n').textContent = n ? String(n) : '';
  }
  let reTimer;
  function applyRefine(name, isAttr) {
    syncBars();
    if (aiSection.hidden) { shown = PAGE; syncUrl(); render(); return; }
    // AIの結果が出ているとき：AIが使う条件（郵便番号・市区町村・事業の状況・当てはまるもの）を変えたら、探し直す
    if (!['zip', 'city', 'stage'].includes(name) && !isAttr) return;
    clearTimeout(reTimer);
    reTimer = setTimeout(() => {
      if (zipOf(field('zip').value).length === 7 && text().length >= 5) form.requestSubmit();
    }, 500);
  }
  function refineChanged(target) {
    const name = target.dataset.r;
    if (name) {
      field(name).value = target.value;
      // 郵便番号は、上の欄に入れて入力の通知を出す（app.js が住所を調べる）
      if (name === 'zip') field('zip').dispatchEvent(new Event('input', { bubbles: true }));
    } else if (target.dataset.rAttr) {
      for (const b of attrBoxes) if (b.value === target.dataset.rAttr) b.checked = target.checked;
    } else return;
    applyRefine(name, Boolean(target.dataset.rAttr));
  }
  for (const bar of bars) {
    bar.addEventListener('input', (e) => { if (e.target.matches('input[data-r]')) refineChanged(e.target); });
    bar.addEventListener('change', (e) => { if (e.target.matches('select, input[data-r-attr]')) refineChanged(e.target); });
    bar.querySelector('[data-clear]').addEventListener('click', () => {
      for (const k of ['zip', 'pref', 'purpose', 'industry', 'stage', 'city']) if (field(k)) field(k).value = '';
      for (const b of attrBoxes) b.checked = false;
      field('zip').dispatchEvent(new Event('input', { bubbles: true }));
      applyRefine('zip', false);
    });
  }
  // 外を押したら、閉じる。片方を開いたら、もう片方は閉じる
  document.addEventListener('click', (e) => { for (const bar of bars) if (bar.open && !bar.contains(e.target)) bar.open = false; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') for (const bar of bars) bar.open = false; });
  // 上のフォームが変わったとき（例を押した・住所が分かった など）も、欄に反映する
  form.addEventListener('input', syncBars);
  form.addEventListener('change', syncBars);
  new MutationObserver(syncBars).observe(address, { childList: true, characterData: true, subtree: true });
  if (cityField) new MutationObserver(syncBars).observe(cityField, { attributes: true, attributeFilter: ['hidden'] });
  setTimeout(syncBars, 0);

  // 検索したあとは、入力欄を1行にして、結果を上に出す
  const compact = () => form.classList.add('is-compact');
  if (['q', 'desc', 'zip', 'pref', 'purpose', 'industry'].some((k) => params.has(k))) compact();

  // AIで探した結果の下に、お住まいの市区町村の個人向け制度（自治体）を出す
  const aiLocal = document.createElement('section');
  aiLocal.id = 'ai-local';
  aiLocal.className = 'u-results';
  aiLocal.hidden = true;
  aiSection.after(aiLocal);
  function renderAiLocal() {
    const city = zipCityOf();
    if (!loaded || !city || aiSection.hidden) { aiLocal.hidden = true; return; }
    const mine = items.filter((g) => cityOf(g) === city);
    if (!mine.length) { aiLocal.hidden = true; return; }
    const slug = mine[0].url.split('#')[0];
    aiLocal.innerHTML = `<div class="u-rhead"><h2 class="u-h">${esc(city)}の個人向けの制度（自治体）</h2></div><div class="list">${mine.slice(0, 20).map((g, i) => card(g, i, Date.now())).join('')}</div><p><a href="${esc(slug)}">${esc(city)}の補助金ページで、すべて見る</a></p>`;
    aiLocal.hidden = false;
  }
  new MutationObserver(renderAiLocal).observe(aiSection, { attributes: true, attributeFilter: ['hidden'] });

  fetch('grants/search.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((data) => {
      items = data.items || [];
      // 制度のある市区町村の名前（長いものから）
      cityNames = [...new Set(items.map(cityOf).filter(Boolean))].sort((a, b) => b.length - a.length);
      loaded = true;
      render();
      renderAiLocal();
    })
    .catch(() => { count.textContent = '補助金の一覧を読み込めませんでした。時間をおいて、もう一度お試しください。'; });
})();
