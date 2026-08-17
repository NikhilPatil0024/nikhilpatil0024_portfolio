/* main.js — vanilla JS: nav scroll, mobile menu, active links, scroll-reveal */

(function () {
  'use strict';

  /* ---- Sticky nav shadow ---- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile nav toggle ---- */
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('open', !open);
    });

    /* Close on link click */
    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      });
    });

    /* Close on outside click */
    document.addEventListener('click', e => {
      if (!header.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });
  }

  /* ---- Active nav link on scroll ---- */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const NAV_H     = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, {
    rootMargin: `-${NAV_H + 10}px 0px -60% 0px`,
    threshold: 0
  });

  sections.forEach(s => observer.observe(s));

  /* ---- Scroll-reveal ---- */
  const revealEls = document.querySelectorAll(
    '.stat-card, .skill-group, .project-card, .cert-card, .contact-card, .about-text p'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => revealObs.observe(el));

  /* ---- Stagger reveal for grids ---- */
  document.querySelectorAll('.skills-grid, .about-stats, .contact-links, .certs-grid').forEach(grid => {
    const children = grid.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 60}ms`;
    });
  });

})();
