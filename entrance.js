(() => {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Leave content visible without setting up observers for reduced-motion users.
  if (reducedMotion.matches) return;

  const desktop = window.matchMedia('(min-width: 901px)');
  const cards = document.querySelectorAll('.capability, .service, .benefit, .steps > li, .agent-journey-steps > li');
  const cardIndexes = new WeakMap();
  const groupCounts = new WeakMap();
  // Compute each card's stagger once, outside the intersection callback.
  cards.forEach((card) => {
    const parent = card.parentElement;
    const index = groupCounts.get(parent) || 0;
    cardIndexes.set(card, index);
    groupCounts.set(parent, index + 1);
  });

  const flow = document.querySelector('.migration-path');
  const flowSteps = flow ? Array.from(flow.children) : [];
  const activeAnimations = new Set();
  const entered = new WeakSet();
  const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const entrance = [
    { opacity: 0, transform: 'translateY(28px)' },
    { opacity: 1, transform: 'translateY(0)' },
  ];

  function animate(element, keyframes, duration, delay = 0) {
    const animation = element.animate(keyframes, { duration, delay, easing, fill: 'backwards' });
    activeAnimations.add(animation);
    const cleanup = () => activeAnimations.delete(animation);
    animation.finished.then(cleanup, cleanup);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting || entered.has(target)) return;
      entered.add(target);
      observer.unobserve(target);
      if (reducedMotion.matches) return;

      if (target === flow) {
        flowSteps.forEach((step, index) => animate(step, [
          { opacity: 0.35, transform: 'translateY(8px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], 320, index * 70));
        return;
      }

      const index = cardIndexes.get(target);
      const delay = index !== undefined && desktop.matches ? (index % 3) * 130 : 0;
      animate(target, entrance, 650, delay);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    activeAnimations.forEach((animation) => animation.cancel());
    activeAnimations.clear();
  });

  // Hero text and platform panel render immediately; animate later sections once.
  document.querySelectorAll('.section-heading, .modernization-copy, .approach-intro, .ai-grid > div, .trust-grid > *, .contact-grid > *, .footer-grid > *, .footer-bottom, .agent-journey > p, .agent-journey > h3, .agent-integration, .agent-platforms, .agent-cta').forEach((item) => observer.observe(item));
  cards.forEach((card) => observer.observe(card));
  if (flow) observer.observe(flow);
})();
