// 「やりたいことから探す」の各ページ：data-purposes（目的のタグ）に合う、募集中の補助金を grants/search.json から表示する（締切が近い順、最大8件）
(function () {
  var boxes = document.querySelectorAll('[data-open]');
  if (!boxes.length) return;
  var DAY = 24 * 60 * 60 * 1000;
  var base = location.pathname.indexOf('/hitsuyo/') >= 0 ? '../' : '';
  var yen = function (n) { return Number(n).toLocaleString('ja-JP') + '円'; };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var dateJa = function (iso) { return iso ? new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', month: 'long', day: 'numeric' }).format(new Date(iso)) : '記載なし'; };
  fetch(base + 'grants/search.json').then(function (r) { return r.ok ? r.json() : Promise.reject(new Error(String(r.status))); }).then(function (d) {
    var items = d.items || [];
    var now = Date.now();
    boxes.forEach(function (box) {
      var purposes = (box.getAttribute('data-purposes') || '').split(' ').filter(Boolean);
      var list = items.filter(function (g) {
        return g.e && Date.parse(g.e) >= now && (g.p || []).some(function (p) { return purposes.indexOf(p) >= 0; });
      }).sort(function (a, b) { return Date.parse(a.e) - Date.parse(b.e); }).slice(0, 8);
      if (!list.length) { box.innerHTML = '<p class="hp-loading">いま募集中で、この目的に当たる補助金は、見つかりませんでした。<a href="' + base + 'search.html">検索ページ</a>で条件を変えて探せます。</p>'; return; }
      box.innerHTML = '<ul>' + list.map(function (g) {
        var days = Math.ceil((Date.parse(g.e) - now) / DAY);
        var mx = g.m ? '上限 ' + yen(g.m) : '上限は公募要領で確認';
        return '<li><a href="' + base + 'grants/' + encodeURIComponent(g.id) + '.html">' + esc(g.t) + '</a><p>締切 ' + esc(dateJa(g.e)) + '（あと' + days + '日）｜' + esc(g.a || '全国') + '｜' + esc(mx) + '</p></li>';
      }).join('') + '</ul>';
    });
  }).catch(function () {
    boxes.forEach(function (box) { box.innerHTML = '<p class="hp-loading">一覧を読み込めませんでした。時間をおいて、<a href="' + base + 'search.html">検索ページ</a>をご覧ください。</p>'; });
  });
})();
