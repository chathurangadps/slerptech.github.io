(() => {
  const header = document.querySelector('.site-header');
  const toggle = header.querySelector('.menu-toggle');
  const navigation = document.getElementById('main-navigation');
  const compact = window.matchMedia('(max-width: 1024px)');

  function setOpen(open, restoreFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });
  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !compact.matches) return;
    setOpen(false);
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setOpen(false);
  });
  header.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget)) setOpen(false);
  });
  compact.addEventListener('change', () => {
    const active = document.activeElement;
    setOpen(false);
    if (compact.matches && navigation.contains(active)) toggle.focus();
    if (!compact.matches && active === toggle) navigation.querySelector('a').focus();
  });
  toggle.hidden = false;
  header.classList.add('navigation-ready');
})();
