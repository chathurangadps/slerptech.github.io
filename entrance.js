(() => {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // The migration flow has its own entrance so it does not animate twice.
  const sections = document.querySelectorAll('main > section:not(.hero):not(#migration):not(.capabilities):not(.agentic-section)');
  const capabilities = Array.from(document.querySelectorAll('.capability, .agent-card'));
  const flow = document.querySelector('.migration-path');
  const flowAnimations = new Set();
  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    flowAnimations.forEach((animation) => animation.cancel());
    flowAnimations.clear();
  });
  const entered = new WeakSet();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entered.has(entry.target)) return;
      entered.add(entry.target);
      observer.unobserve(entry.target);
      if (reducedMotion.matches) return;

      if (capabilities.includes(entry.target)) {
        // Observe each card so stacked mobile cards enter when actually visible.
        const index = capabilities.indexOf(entry.target);
        const animation = entry.target.animate(
          [
            { opacity: 0, transform: 'translateY(28px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 650,
            delay: window.matchMedia('(min-width: 901px)').matches ? (index % 3) * 130 : 0,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'backwards',
          },
        );
        flowAnimations.add(animation);
        animation.finished.then(
          () => flowAnimations.delete(animation),
          () => flowAnimations.delete(animation),
        );
        return;
      }

      if (entry.target === flow) {
        Array.from(flow.children).forEach((step, index) => {
          const animation = step.animate(
            [
              { opacity: 0.35, transform: 'translateY(8px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            {
              duration: 320,
              delay: index * 70,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'backwards',
            },
          );
          flowAnimations.add(animation);
          animation.finished.then(
            () => flowAnimations.delete(animation),
            () => flowAnimations.delete(animation),
          );
        });
        return;
      }

      entry.target.animate(
        [
          { opacity: 0.45, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 460, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      );
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

  sections.forEach((section) => observer.observe(section));
  if (flow) observer.observe(flow);
  capabilities.forEach((card) => observer.observe(card));
  const capabilityHeading = document.querySelector('.capabilities .section-heading');
  if (capabilityHeading) observer.observe(capabilityHeading);
  document.querySelectorAll('.agentic-section .section-heading, .agent-journey, .agent-integration, .agent-platforms, .agent-cta').forEach((item) => observer.observe(item));
})();
