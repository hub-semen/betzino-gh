// Partner links (also hardcoded in index.html for no-JS). Every element with data-cta="<key>" gets this href.
const CTA_LINKS = {
  alternatives: 'https://vodds.com/bookmakers/?utm_source=betzino-fr',
};

document.querySelectorAll('[data-cta]').forEach((el) => {
  const url = CTA_LINKS[el.dataset.cta];
  if (!url || url === '#') return;
  el.href = url;
  el.target = '_blank';
  el.rel = 'nofollow sponsored noopener';
});

// "Visit BetZino" buttons open the "offer unavailable" pop-up; its button leads to the alternatives.
// Without <dialog> support (or JS) the link goes straight to the alternatives page.
const modal = document.getElementById('offer-modal');
if (modal && typeof modal.showModal === 'function') {
  document.querySelectorAll('[data-offer]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      modal.showModal();
    });
  });
  modal.addEventListener('click', (e) => {
    // Close on the × button or a click on the backdrop
    if (e.target.closest('[data-close]') || e.target === modal) modal.close();
  });
}

const canObserve = 'IntersectionObserver' in window;

// Fade-in blocks on scroll
if (canObserve) {
  document.documentElement.classList.add('js');
  let firstBatch = true;
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      // Blocks already on screen at load appear without animation
      if (firstBatch) entry.target.style.transition = 'none';
      entry.target.classList.add('in');
      revealer.unobserve(entry.target);
    });
    firstBatch = false;
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => revealer.observe(el));
}

// Highlight current section in the sticky subnav and keep the active pill visible
const navRow = document.querySelector('.subnav-row');
const navLinks = [...document.querySelectorAll('.subnav a')];
if (navLinks.length && canObserve) {
  const byId = new Map(navLinks.map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const link = byId.get(entry.target.id);
      if (!link) return;
      navLinks.forEach((a) => a.classList.remove('active'));
      link.classList.add('active');
      navRow.scrollTo({ left: link.offsetLeft - navRow.clientWidth / 2 + link.clientWidth / 2, behavior: 'smooth' });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  });
}

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
