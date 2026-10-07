async function loadBooks() {
  try {
    const response = await fetch('/data/books.json');
    const books = await response.json();
    const grid = document.getElementById('books-grid');

    books.forEach(book => {
      const card = document.createElement('a');
      card.href = book.amazonUrl;
      card.target = '_blank';
      card.rel = 'noopener';
      card.className = 'book-card';

      const stars = '★'.repeat(Math.floor(book.rating)) + '☆'.repeat(5 - Math.floor(book.rating));

      card.innerHTML = `
        <div class="book-cover">
          <img src="${book.image}" alt="${book.title}" loading="lazy">
        </div>
        <div class="book-info">
          <div class="book-title">${book.title}</div>
          <div class="book-author">${book.author}</div>
          <div class="book-description">${book.description}</div>
          <div class="book-rating">
            <span class="book-stars">${stars}</span>
            <span class="book-reviews">${book.reviews}件</span>
          </div>
          <div class="book-link">Amazonで見る</div>
        </div>
      `;

      grid.appendChild(card);
    });
  } catch (error) {
    console.error('本の読み込みに失敗しました:', error);
    document.getElementById('books-section').innerHTML = '<p>申し訳ございません。データの読み込みに失敗しました。</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadBooks);
