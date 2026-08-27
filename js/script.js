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

  const worksGrid = document.querySelector('.works-grid');
  const workCards = worksGrid?.querySelectorAll('.work-card');
  const worksDots = document.querySelector('.works-dots');

  if (!worksGrid || !workCards?.length || !worksDots) return;

  const dots = Array.from(workCards, (_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'works-dot';
    dot.setAttribute('aria-label', `${index + 1}枚目の作品を表示`);

    if (index === 0) dot.setAttribute('aria-current', 'true');

    dot.addEventListener('click', () => {
      workCards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    });

    worksDots.append(dot);
    return dot;
  });

  const updateActiveDot = (activeIndex) => {
    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });
  };

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        updateActiveDot(Array.from(workCards).indexOf(entry.target));
      });
    },
    { root: worksGrid, threshold: 0.6 }
  );

  workCards.forEach((card) => cardObserver.observe(card));
});
