(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('topnav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
})();

// 広告の表示のスイッチ。false の間は、下部の広告枠・右側の広告枠を、どのページにも出さない（再開するときは true にする）
const SHOW_ADS = false;

// A8.net アフィリエイト広告：トップページ・方針ページ以外の各ページに、2社のうち1社をランダムで1つだけ表示する
(function () {
  const path = location.pathname.replace(/index\.html$/, '');
  if (!SHOW_ADS || path === '/' || path === '' || path.indexOf('/policy/') === 0 || path === '/compare/virtual-office.html') return;
  const main = document.querySelector('main');
  if (!main) return;
  const ads = [
    {
      name: '株式会社Karigo',
      text: '自宅住所を出したくない方・法人登記の住所が必要な方に：バーチャルオフィス。プラン・料金・条件は公式サイトで確認してください。',
      href: 'https://px.a8.net/svt/ejp?a8mat=4BED91+6EERW2+1N1U+6EER5',
      img: 'https://www29.a8.net/svt/bgt?aid=261010837387&wid=001&eno=01&mid=s00000007653001075000&mc=1',
      w: 728, h: 90,
      pixel: 'https://www11.a8.net/0.gif?a8mat=4BED91+6EERW2+1N1U+6EER5'
    },
    {
      name: '一般社団法人和文化推進協会',
      text: 'バーチャルオフィス（広告主の説明では、年会費6,000円のみ・士業会員の支援を年1回以上受けることが条件の「副業・起業支援プラン」あり）。条件・料金は公式サイトで確認してください。',
      href: 'https://px.a8.net/svt/ejp?a8mat=4BED91+6D7WOI+4V0U+15OZHT',
      img: 'https://www28.a8.net/svt/bgt?aid=261010837385&wid=001&eno=01&mid=s00000022683007003000&mc=1',
      w: 120, h: 60,
      pixel: 'https://www19.a8.net/0.gif?a8mat=4BED91+6D7WOI+4V0U+15OZHT'
    },
    // 広告主名・説明が未確認の広告。バナーの画像が広告主を示す。分かり次第 name / text を書き足す
    {
      name: '提携先の広告',
      href: 'https://px.a8.net/svt/ejp?a8mat=4BED92+9N3QGI+4JGQ+C4TB5',
      img: 'https://www21.a8.net/svt/bgt?aid=261010838583&wid=001&eno=01&mid=s00000021185002038000&mc=1',
      w: 728, h: 90,
      pixel: 'https://www15.a8.net/0.gif?a8mat=4BED92+9N3QGI+4JGQ+C4TB5'
    },
    {
      name: '提携先の広告',
      href: 'https://px.a8.net/svt/ejp?a8mat=4BED92+9UUDBM+35XE+65EOH',
      img: 'https://www23.a8.net/svt/bgt?aid=261010838596&wid=001&eno=01&mid=s00000014765001033000&mc=1',
      w: 728, h: 90,
      pixel: 'https://www19.a8.net/0.gif?a8mat=4BED92+9UUDBM+35XE+65EOH'
    }
  ];
  const ad = ads[Math.floor(Math.random() * ads.length)];
  const box = document.createElement('aside');
  box.className = 'pr-box';
  box.setAttribute('aria-label', '広告');
  const label = document.createElement('p');
  label.className = 'pr-label';
  const tag = document.createElement('span');
  tag.className = 'pr-tag';
  tag.textContent = 'PR';
  label.append(tag, ' ' + ad.name);
  const text = document.createElement('p');
  text.className = 'pr-text';
  text.textContent = ad.text || '';
  const a = document.createElement('a');
  a.href = ad.href;
  a.rel = 'sponsored nofollow noopener';
  a.target = '_blank';
  const img = document.createElement('img');
  img.width = ad.w;
  img.height = ad.h;
  img.alt = ad.name + '（広告）';
  img.loading = 'lazy';
  img.src = ad.img;
  a.appendChild(img);
  const pixel = document.createElement('img');
  pixel.className = 'pr-pixel';
  pixel.width = 1;
  pixel.height = 1;
  pixel.alt = '';
  pixel.src = ad.pixel;
  const note = document.createElement('p');
  note.className = 'pr-note';
  note.textContent = '※本ページにはアフィリエイト広告が含まれます。広告の掲載は、制度情報の内容には影響しません。';
  if (ad.text) box.append(label, text, a, pixel, note);
  else box.append(label, a, pixel, note);
  main.appendChild(box);
})();

// A8.net アフィリエイト広告（300x250）：右側の列（関連ページの下）に1つ表示する。右側の列があるページだけ。
// 300x250 の広告が増えたら sideAds に足す（複数あるときは、ページごとにランダムで1つ）
(function () {
  const path = location.pathname.replace(/index\.html$/, '');
  if (!SHOW_ADS || path === '/' || path === '' || path.indexOf('/policy/') === 0 || path === '/compare/virtual-office.html') return;
  const side = document.querySelector('.page-side');
  if (!side) return;
  const sideAds = [
    // 広告主名が未確認の広告。分かり次第 name を書き換える
    {
      name: '提携先の広告',
      href: 'https://px.a8.net/svt/ejp?a8mat=4BED92+98TBXU+5UY6+5ZMCH',
      img: 'https://www27.a8.net/svt/bgt?aid=261010838559&wid=001&eno=01&mid=s00000027339001006000&mc=1',
      pixel: 'https://www17.a8.net/0.gif?a8mat=4BED92+98TBXU+5UY6+5ZMCH'
    }
  ];
  const ad = sideAds[Math.floor(Math.random() * sideAds.length)];
  const box = document.createElement('div');
  box.className = 'pr-side';
  const label = document.createElement('p');
  label.className = 'pr-side-label';
  const tag = document.createElement('span');
  tag.className = 'pr-tag';
  tag.textContent = 'PR';
  label.append(tag, ' 広告');
  const a = document.createElement('a');
  a.href = ad.href;
  a.rel = 'sponsored nofollow noopener';
  a.target = '_blank';
  const img = document.createElement('img');
  img.width = 300;
  img.height = 250;
  img.alt = ad.name + '（広告）';
  img.loading = 'lazy';
  img.src = ad.img;
  a.appendChild(img);
  const pixel = document.createElement('img');
  pixel.className = 'pr-pixel';
  pixel.width = 1;
  pixel.height = 1;
  pixel.alt = '';
  pixel.src = ad.pixel;
  box.append(label, a, pixel);
  side.classList.add('has-ad');
  side.appendChild(box);
})();

// フッターのリンク：全カテゴリを開いたままにする
document.querySelectorAll('.footer-group').forEach((d) => { d.open = true; });

// 右の列の目次：いま読んでいる節を強調する（目次がないページでは何もしない）
(function () {
  try {
    var nav = document.querySelector('.page-side nav[aria-label="このページの内容"]');
    if (!nav || !('IntersectionObserver' in window)) return;
    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var heads = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        map[e.target.id].setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-80px 0px -65% 0px' });
    heads.forEach(function (h) { io.observe(h); });
  } catch (e) { /* 目次の強調ができなくても、リンクは使える */ }
})();

// 右の列をスクロールについてこさせる（パソコン幅）。右の列が画面より長いときは、最後まで見えた所で止める
(function () {
  try {
    var side = document.querySelector('.page-split > .page-side');
    if (!side) return;
    var fit = function () {
      var room = window.innerHeight - side.offsetHeight - 16;
      side.style.setProperty('--side-top', Math.min(84, room) + 'px');
    };
    fit();
    window.addEventListener('resize', fit);
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(side);
  } catch (e) { /* 動かなくても、右の列はふつうに表示される */ }
})();
