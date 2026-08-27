document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main > section.scroll-fade-in');

  if (!sections.length) return;

  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    sections.forEach((section) => section.classList.add('is-visible'));
    return;
  }

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
});
