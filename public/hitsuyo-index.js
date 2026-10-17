// 「やりたいことから探す」（hitsuyo.html）：「お店・会社／個人の住まい」で、分野の棚を切り替える（?aud=biz|per でも開ける）
(function () {
  var seg = document.querySelectorAll('.hp-seg button');
  var shelves = document.querySelectorAll('.hp-shelf');
  if (!seg.length || !shelves.length) return;
  function show(aud, push) {
    seg.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-aud') === aud)); });
    shelves.forEach(function (s) { s.hidden = aud !== 'all' && s.getAttribute('data-aud') !== aud; });
    if (push) {
      try {
        var u = new URL(location.href);
        if (aud === 'all') u.searchParams.delete('aud'); else u.searchParams.set('aud', aud);
        history.replaceState(null, '', u);
      } catch (e) { /* URL を更新できなくても、切り替えは動く */ }
    }
  }
  seg.forEach(function (b) { b.addEventListener('click', function () { show(b.getAttribute('data-aud'), true); }); });
  var q = new URLSearchParams(location.search).get('aud');
  if (q === 'biz' || q === 'per') show(q, false);
})();
