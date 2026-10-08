(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('topnav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
})();
