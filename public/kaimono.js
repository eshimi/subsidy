// 「買いたいものから探す」：選んだ買い物の目的（data-purposes）で、募集中の補助金を grants/search.json から絞り込む
(function () {
  var chips = document.querySelectorAll('.kp-chip');
  var result = document.getElementById('kp-result');
  var amountInput = document.getElementById('kp-amount-input');
  if (!chips.length || !result) return;
  var DAY = 24 * 60 * 60 * 1000;
  var cache = null;
  var yen = function (n) { return Number(n).toLocaleString('ja-JP') + '円'; };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var dateJa = function (iso) { return iso ? new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', month: 'long', day: 'numeric' }).format(new Date(iso)) : '記載なし'; };

  function loadGrants() {
    if (cache) return Promise.resolve(cache);
    return fetch('grants/search.json').then(function (r) { return r.ok ? r.json() : Promise.reject(new Error(String(r.status))); })
      .then(function (d) { cache = d.items || []; return cache; });
  }

  function openFor(panel, purposes, amount) {
    var box = panel.querySelector('[data-open]');
    var now = Date.now();
    loadGrants().then(function (items) {
      var list = items.filter(function (g) {
        return g.e && Date.parse(g.e) >= now && (g.p || []).some(function (p) { return purposes.indexOf(p) >= 0; });
      }).sort(function (a, b) { return Date.parse(a.e) - Date.parse(b.e); }).slice(0, 8);
      var note = amount ? '<p class="kp-hint">購入予定 ' + yen(amount) + '。補助されるのは対象経費の一部（補助率）で、上限もあります。下の制度ごとの補助率と上限を確認してください。</p>' : '';
      if (!list.length) {
        box.innerHTML = '<h3 class="kp-h3">募集中の補助金（この買い物に関係しそうなもの）</h3>' + note + '<p class="kp-loading">いま募集中で、この目的に当たる補助金は見つかりませんでした。国の制度や、自治体の制度も確認してください。</p>';
        return;
      }
      box.innerHTML = '<h3 class="kp-h3">募集中の補助金（この買い物に関係しそうなもの）</h3>' + note + '<ul>' + list.map(function (g) {
        var days = Math.ceil((Date.parse(g.e) - now) / DAY);
        var mx = g.m ? '上限 ' + yen(g.m) : '上限は公募要領で確認';
        return '<li><a href="grants/' + encodeURIComponent(g.id) + '.html">' + esc(g.t) + '</a><p>締切 ' + esc(dateJa(g.e)) + '（あと' + days + '日）｜' + esc(g.a || '全国') + '｜' + esc(mx) + '</p></li>';
      }).join('') + '</ul>';
    }).catch(function () {
      box.innerHTML = '<h3 class="kp-h3">募集中の補助金（この買い物に関係しそうなもの）</h3><p class="kp-loading">一覧を読み込めませんでした。時間をおいてお試しください。</p>';
    });
  }

  function select(chip) {
    chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
    document.querySelectorAll('.kp-panel').forEach(function (p) { p.hidden = p.getAttribute('data-id') !== chip.getAttribute('data-id'); });
    var panel = document.querySelector('.kp-panel[data-id="' + chip.getAttribute('data-id') + '"]');
    result.hidden = false;
    var amount = Number(amountInput && amountInput.value) || 0;
    openFor(panel, chip.getAttribute('data-purposes').split(' '), amount);
    history.replaceState(null, '', '?item=' + encodeURIComponent(chip.getAttribute('data-id')));
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  chips.forEach(function (chip) { chip.addEventListener('click', function () { select(chip); }); });
  if (amountInput) amountInput.addEventListener('change', function () {
    var chosen = document.querySelector('.kp-chip[aria-pressed="true"]');
    if (chosen) select(chosen);
  });

  var first = new URLSearchParams(location.search).get('item');
  var pre = first && document.querySelector('.kp-chip[data-id="' + first + '"]');
  if (pre) select(pre);
})();
