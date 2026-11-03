// Partner links (also hardcoded in index.html for no-JS). Every element with data-cta="<key>" gets this href.
// Same link as the OrbitX site (utm_source still says orbitx-bet-fr).
const CTA_LINKS = {
  vodds: 'https://vodds.com/?utm_source=orbitx-bet-fr',
};

document.querySelectorAll('[data-cta]').forEach((el) => {
  const url = CTA_LINKS[el.dataset.cta];
  if (!url || url === '#') return;
  el.href = url;
  el.target = '_blank';
  el.rel = 'nofollow sponsored noopener';
});

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
