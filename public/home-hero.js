// トップページのヒーロー：「事業者の方／個人の方」の切り替え。
// 切り替えると、検索欄の例と、検索の下の4つの入口、検索に付ける aud（b＝事業者向け／p＝個人向け）が変わる。選んだ内容は、このブラウザに覚えておく。
// JS がないときは、事業者向けの入口が表示される（個人向けの入口は hidden）
(function () {
  var seg = document.getElementById('r-seg');
  if (!seg) return;
  var KEY = 'subsidy-finder:aud';
  var btns = Array.prototype.slice.call(seg.querySelectorAll('[role="radio"]'));
  var aud = document.getElementById('r-aud');
  var q = document.getElementById('r-q');
  var sets = Array.prototype.slice.call(document.querySelectorAll('.r-go-set'));
  function show(a, focus) {
    btns.forEach(function (b) { var on = b.getAttribute('data-aud') === a; b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
    sets.forEach(function (s) { s.hidden = s.getAttribute('data-aud') !== a; });
    aud.value = a;
    q.placeholder = q.getAttribute('data-ph-' + a) || q.placeholder;
  }
  btns.forEach(function (b, i) {
    b.addEventListener('click', function () {
      var a = b.getAttribute('data-aud');
      show(a);
      try { localStorage.setItem(KEY, a); } catch (e) { /* 覚えられなくても動く */ }
    });
    b.addEventListener('keydown', function (e) {
      var k = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
      if (!k) return;
      e.preventDefault();
      var n = btns[(i + k + btns.length) % btns.length];
      show(n.getAttribute('data-aud'), true);
      try { localStorage.setItem(KEY, n.getAttribute('data-aud')); } catch (err) { /* 同上 */ }
    });
  });
  // 初期値：URL の ?aud=p → 前回の選択 → 事業者
  var init = new URLSearchParams(location.search).get('aud');
  if (init !== 'p' && init !== 'b') { try { init = localStorage.getItem(KEY); } catch (e) { init = null; } }
  show(init === 'p' ? 'p' : 'b');
})();
