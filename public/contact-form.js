(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('contact-status');
  const button = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'contact-status';
    status.textContent = '送信しています…';
    button.disabled = true;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || '送信できませんでした。メールでご連絡ください。');
      form.reset();
      status.className = 'contact-status ok';
      status.textContent = '送信しました。お問い合わせありがとうございます。お返事には、お時間をいただく場合があります。';
    } catch (err) {
      status.className = 'contact-status err';
      status.textContent = err.message;
    } finally {
      button.disabled = false;
    }
  });
})();
