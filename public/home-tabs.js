// トップページ：検索欄の下の「探し方」タブ（やりたいこと／ほしいもの／地域／AIに相談）。JS がないときは、4つのパネルがすべて表示される
(function () {
  var root = document.getElementById('r-tabs');
  if (!root) return;
  var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
  var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
  function show(i, focus) {
    tabs.forEach(function (t, j) { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
    panels.forEach(function (p, j) { p.hidden = i !== j; });
    if (focus) tabs[i].focus();
  }
  root.classList.add('is-on');
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(i); });
    t.addEventListener('keydown', function (e) {
      var k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (k) { e.preventDefault(); show((i + k + tabs.length) % tabs.length, true); }
    });
  });
  var map = { want: 0, buy: 1, area: 2, ai: 3 };
  var q = new URLSearchParams(location.search).get('tab');
  show(q && map[q] !== undefined ? map[q] : 0);
})();
