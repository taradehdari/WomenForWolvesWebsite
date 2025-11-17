
document.addEventListener('DOMContentLoaded', () => {

  // Wait for the header/nav to be injected by load-layout.js
  const waitForHeader = setInterval(() => {
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    // If header has not been injected yet, keep waiting
    if (!toggle || !mobileNav) return;

    clearInterval(waitForHeader); // Header found — stop checking

    // Helper: close all <details> elements inside mobile nav
    const closeDetails = () => {
      mobileNav.querySelectorAll('details[open]')
        .forEach(d => d.removeAttribute('open'));
    };

    // Toggle the mobile navigation panel
    toggle.addEventListener('click', () => {
      const isOpening = !mobileNav.classList.contains('show');
      mobileNav.classList.toggle('show');
      toggle.setAttribute('aria-expanded', String(isOpening));

      if (!isOpening) closeDetails();
    });

    // Close mobile menu when clicking any link inside it
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        closeDetails();
      });
    });

    // Close/Reset mobile menu when resizing to desktop width
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        mobileNav.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        closeDetails();
      }
    };

    window.addEventListener('resize', handleResize);
  }, 50); // check every 50ms until header loads fully
});
