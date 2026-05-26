// =========================================================
// BATIMENT RENOVATION PATRIMOINE
// =========================================================

(function () {
  'use strict';

  // ---------- 1. Header scroll state ----------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- 2. Mobile nav toggle ----------
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
      const open = document.body.classList.contains('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav a').forEach(a => {
      a.addEventListener('click', () => document.body.classList.remove('nav-open'));
    });
  }

  // ---------- 3. Reveal on scroll ----------
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el, i) => {
      if (el.style.getPropertyValue('--reveal-delay') === '') {
        el.style.setProperty('--reveal-delay', `${Math.min(i * 60, 400)}ms`);
      }
      obs.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // ---------- 4. Filtres galerie ----------
  const filters = document.querySelectorAll('.filter-btn');
  if (filters.length) {
    const galleryItems = document.querySelectorAll('.gallery [data-cat]');
    const catSections = document.querySelectorAll('[data-cat-section]');

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.filter;
        filters.forEach(b => b.classList.toggle('is-active', b === btn));

        // Mode galerie simple (figures individuelles)
        galleryItems.forEach(item => {
          const show = target === 'all' || item.dataset.cat === target;
          item.style.display = show ? '' : 'none';
        });

        // Mode sections par categorie (chantiers groupes)
        catSections.forEach(s => {
          const show = target === 'all' || s.dataset.catSection === target;
          s.style.display = show ? '' : 'none';
        });

        // Scroll vers la section cible si filtre actif (sauf "tout")
        if (target !== 'all') {
          const targetSection = document.querySelector(`[data-cat-section="${target}"]`);
          if (targetSection) {
            setTimeout(() => targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
          }
        }
      });
    });
  }

  // ---------- 5. Lightbox ----------
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const imgEl = lightbox.querySelector('.lightbox__img');
    const capEl = lightbox.querySelector('.lightbox__caption');
    const btnClose = lightbox.querySelector('.lightbox__close');
    const btnPrev = lightbox.querySelector('.lightbox__nav--prev');
    const btnNext = lightbox.querySelector('.lightbox__nav--next');

    let items = [];
    let index = 0;

    const open = (i) => {
      if (!items.length) return;
      index = (i + items.length) % items.length;
      const it = items[index];
      imgEl.src = it.src;
      imgEl.alt = it.alt || '';
      capEl.textContent = it.caption || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      imgEl.src = '';
    };

    // Bind any gallery figure that contains an img
    const bindGalleries = () => {
      const figures = document.querySelectorAll('[data-lightbox] figure, .gallery figure');
      items = Array.from(figures)
        .filter(f => f.querySelector('img'))
        .map(f => {
          const img = f.querySelector('img');
          const cap = f.querySelector('figcaption');
          return {
            src: img.dataset.full || img.currentSrc || img.src,
            alt: img.alt,
            caption: cap ? cap.textContent.trim() : ''
          };
        });
      figures.forEach((f, i) => {
        if (f.querySelector('img')) {
          f.addEventListener('click', () => open(i));
        }
      });
    };
    bindGalleries();

    btnClose?.addEventListener('click', close);
    btnPrev?.addEventListener('click', () => open(index - 1));
    btnNext?.addEventListener('click', () => open(index + 1));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') open(index - 1);
      if (e.key === 'ArrowRight') open(index + 1);
    });
  }

  // ---------- 6. Slider Avant / Apres ----------
  document.querySelectorAll('.compare').forEach(el => {
    let dragging = false;

    const setPos = (clientX) => {
      const rect = el.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(rect.width, x));
      const pct = (x / rect.width) * 100;
      el.style.setProperty('--pos', pct + '%');
    };

    const onDown = (e) => {
      dragging = true;
      el.style.cursor = 'grabbing';
      const cx = (e.touches ? e.touches[0].clientX : e.clientX);
      setPos(cx);
      e.preventDefault();
    };
    const onMove = (e) => {
      if (!dragging) return;
      const cx = (e.touches ? e.touches[0].clientX : e.clientX);
      setPos(cx);
    };
    const onUp = () => {
      dragging = false;
      el.style.cursor = 'ew-resize';
    };

    // Hover-follow on desktop (intuitive immediate feedback)
    let hoverActive = false;
    el.addEventListener('mouseenter', () => { hoverActive = true; });
    el.addEventListener('mouseleave', () => { hoverActive = false; });
    el.addEventListener('mousemove', (e) => {
      if (dragging) return;
      if (!hoverActive) return;
      // Smooth follow on hover (no click required)
      setPos(e.clientX);
    });

    // Click-drag (also works without hover-follow)
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    // Touch
    el.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
  });

  // ---------- 7. Annee dynamique footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

})();
