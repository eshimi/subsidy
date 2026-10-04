// トップの紹介動画: はじめてのアクセス時だけヒーローで再生し、終わったら通常のヒーローに切り替える
const SEEN_KEY = 'subsidy-finder:intro-seen';
const LOAD_TIMEOUT_MS = 4000;

const hero = document.querySelector('#hero');
const intro = document.querySelector('#hero-intro');
const content = document.querySelector('#hero-content');
const video = document.querySelector('#intro-video');
const soundBtn = document.querySelector('#intro-sound');
const skipBtn = document.querySelector('#intro-skip');
const replayBtn = document.querySelector('#intro-replay');

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let playing = false;
let loadTimer;

function hasSeen() {
  try {
    return localStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}
function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, '1');
  } catch {
    // 保存できない環境では毎回スキップ扱いにはせず、そのまま続ける
  }
}

// ヒーローの高さを、切り替え前から切り替え後へなめらかに変える
function swapWithHeightTransition(swap) {
  const from = hero.offsetHeight;
  swap();
  const to = hero.offsetHeight;
  if (reducedMotion || from === to) return;
  hero.style.height = `${from}px`;
  hero.style.overflow = 'hidden';
  void hero.offsetHeight;
  hero.style.transition = 'height 0.6s cubic-bezier(0.65, 0, 0.35, 1)';
  hero.style.height = `${to}px`;
  const done = () => {
    hero.style.removeProperty('height');
    hero.style.removeProperty('overflow');
    hero.style.removeProperty('transition');
  };
  hero.addEventListener('transitionend', done, { once: true });
  setTimeout(done, 800);
}

function showContent(animate) {
  content.hidden = false;
  content.classList.remove('reveal');
  if (animate && !reducedMotion) {
    void content.offsetWidth;
    content.classList.add('reveal');
  }
}

function finish({ animate = true } = {}) {
  clearTimeout(loadTimer);
  if (!playing) return;
  playing = false;
  video.pause();
  document.removeEventListener('keydown', onKey);
  const swap = () => {
    intro.hidden = true;
    intro.classList.remove('leaving');
    showContent(animate);
  };
  if (!animate || reducedMotion) {
    swap();
    return;
  }
  intro.classList.add('leaving');
  setTimeout(() => swapWithHeightTransition(swap), 450);
}

function onKey(ev) {
  if (ev.key === 'Escape') finish();
}

function start() {
  playing = true;
  swapWithHeightTransition(() => {
    content.hidden = true;
    intro.hidden = false;
  });
  video.currentTime = 0;
  video.muted = soundBtn.getAttribute('aria-pressed') !== 'true';
  document.addEventListener('keydown', onKey);
  // 読み込みが遅い・自動再生できない場合は動画を出さずに通常のヒーローへ
  loadTimer = setTimeout(() => {
    if (video.readyState < 3) finish({ animate: false });
  }, LOAD_TIMEOUT_MS);
  video.play().then(() => {
    clearTimeout(loadTimer);
    markSeen();
  }).catch(() => finish({ animate: false }));
}

video.addEventListener('ended', () => finish());
video.addEventListener('error', () => finish({ animate: false }), true);
skipBtn.addEventListener('click', () => {
  finish();
  replayBtn.focus({ preventScroll: true });
});
soundBtn.addEventListener('click', () => {
  const on = soundBtn.getAttribute('aria-pressed') !== 'true';
  soundBtn.setAttribute('aria-pressed', String(on));
  soundBtn.textContent = on ? '音を消す' : '音を出す';
  video.muted = !on;
});
replayBtn.addEventListener('click', () => {
  if (!playing) start();
});

// 共有リンク（検索条件つき）で開いたときや、動きを減らす設定のときは再生しない
const sharedLink = new URLSearchParams(location.search).has('q');
if (!hasSeen() && !reducedMotion && !sharedLink) start();
