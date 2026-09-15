/* ============================================
   ARTISKIN BY JEENA — NAV JS
   Hamburger · Scroll state · Active link
   ============================================ */

(function () {
  'use strict';

  const nav       = document.querySelector('.site-nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer    = document.querySelector('.nav-drawer');
  const drawerLinks = document.querySelectorAll('.nav-drawer a');
  const navLinks  = document.querySelectorAll('.nav-links a, .nav-drawer a');

  // --- Scroll state ---
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // --- Hamburger toggle ---
  function closeDrawer() {
    if (!hamburger || !drawer) return;
    hamburger.classList.remove('is-open');
    drawer.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  }

  function openDrawer() {
    if (!hamburger || !drawer) return;
    hamburger.classList.add('is-open');
    drawer.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
  }

  if (hamburger && drawer) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'nav-drawer');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    drawer.setAttribute('id', 'nav-drawer');
    drawer.setAttribute('aria-hidden', 'true');

    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.contains('is-open');
      if (isOpen) {
        closeDrawer();
        hamburger.setAttribute('aria-label', 'Open navigation menu');
      } else {
        openDrawer();
        hamburger.setAttribute('aria-label', 'Close navigation menu');
      }
    });

    // Close when a drawer link is clicked
    drawerLinks.forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    // Close if clicking outside
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !drawer.contains(e.target)) {
        closeDrawer();
      }
    });
  }

  // --- Active page link ---
  const currentPath = window.location.pathname;

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;

    // Normalize paths
    const linkPath = new URL(href, window.location.origin).pathname;

    if (linkPath === currentPath ||
        (currentPath === '/' && (linkPath === '/index.html' || href === 'index.html')) ||
        (currentPath.endsWith('/index.html') && href === 'index.html')) {
      link.classList.add('is-active');
    }

    // Handle pages: /services.html, /blog.html, etc.
    const currentFile = currentPath.split('/').pop() || 'index.html';
    const linkFile    = linkPath.split('/').pop() || 'index.html';

    if (currentFile === linkFile && currentFile !== '') {
      link.classList.add('is-active');
    }

    // Blog post pages
    if (currentPath.includes('/posts/') && href.includes('blog.html')) {
      link.classList.add('is-active');
    }
  });

})();
