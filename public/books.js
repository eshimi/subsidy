const AFFILIATE_TAG = 'eshimi-22';

const el = (tag, className, text) => {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text) e.textContent = text;
  return e;
};

// Amazon の書影 → 国立国会図書館の書影 → 書名入りの代替表紙 の順に試す
function coverFor(book) {
  const box = el('div', 'book-cover');
  const sources = [
    `https://images-na.ssl-images-amazon.com/images/P/${book.asin}.09.LZZZZZZZ.jpg`,
    `https://ndlsearch.ndl.go.jp/thumbnail/${book.isbn13}.jpg`,
  ];
  const img = el('img');
  img.alt = book.title;
  img.loading = 'lazy';
  const next = () => {
    const src = sources.shift();
    if (src) img.src = src;
    else box.replaceChildren(el('span', 'book-cover-fallback', book.title));
  };
  img.addEventListener('error', next);
  // Amazon は書影がないとき 1px の画像を返すので、小さすぎる画像も失敗扱いにする
  img.addEventListener('load', () => { if (img.naturalWidth < 10) next(); });
  box.append(img);
  next();
  return box;
}

function bookCard(book) {
  const card = el('a', 'book-card');
  card.href = `https://www.amazon.co.jp/dp/${book.asin}?tag=${AFFILIATE_TAG}`;
  card.target = '_blank';
  card.rel = 'noopener sponsored';

  const info = el('div', 'book-info');
  info.append(
    el('div', 'book-title', book.title),
    el('div', 'book-author', book.author),
    el('div', 'book-meta', `${book.publisher}・${book.published}`),
    el('div', 'book-description', book.description),
    el('div', 'book-link', 'Amazonで見る'),
  );
  card.append(coverFor(book), info);
  return card;
}

async function loadBooks() {
  try {
    const response = await fetch('books.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const books = await response.json();
    document.getElementById('books-grid').replaceChildren(...books.map(bookCard));
  } catch (error) {
    console.error('本の読み込みに失敗しました:', error);
    document.getElementById('books-section').innerHTML = '<p>申し訳ございません。データの読み込みに失敗しました。</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadBooks);
