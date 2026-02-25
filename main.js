/* =============================================
   BUS BY ALLRIDES – main.js
   Minimal vanilla JS, no dependencies
   ============================================= */

(function () {
  'use strict';

  /* ---- Dynamic footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Navbar scroll shadow ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ---- Mobile hamburger toggle ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Trial form submit ---- */
  const trialForm = document.getElementById('trial-form');
  const formNote = document.getElementById('form-note');

  if (trialForm && formNote) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phoneInput = document.getElementById('trial-phone');
      const phone = phoneInput.value.trim();

      // Simple 10-digit validation
      if (!/^\d{10}$/.test(phone)) {
        formNote.textContent = '⚠️ Please enter a valid 10-digit WhatsApp number.';
        formNote.style.color = '#f87171';
        phoneInput.focus();
        return;
      }

      formNote.textContent = '✅ Thank you! We'll reach out on WhatsApp shortly.';
      formNote.style.color = '#86efac';
      phoneInput.value = '';

      // Reset message after 5s
      setTimeout(() => { formNote.textContent = ''; }, 5000);
    });
  }

  /* ---- Intersection Observer – fade-in cards ---- */
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply animation to cards & sections
  const animatables = document.querySelectorAll(
    '.feature-card, .pricing-card, .contact-item, .section-header'
  );
  animatables.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    observer.observe(el);
  });

  /* ---- Pause marquee on hover for accessibility ---- */
  const marquee = document.querySelector('.marquee-track');
  if (marquee) {
    const wrapper = marquee.closest('.marquee-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', () => {
        marquee.style.animationPlayState = 'paused';
      });
      wrapper.addEventListener('mouseleave', () => {
        marquee.style.animationPlayState = 'running';
      });
    }
  }

  /* ---- FAQ Accordion ---- */
  const faqItems = document.querySelectorAll('.faq-item');

  // Set initial max-height for open items
  faqItems.forEach(item => {
    if (item.classList.contains('open')) {
      const content = item.querySelector('.faq-content');
      if (content) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    }
  });

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        const content = item.querySelector('.faq-content');

        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
            const otherContent = otherItem.querySelector('.faq-content');
            if (otherContent) otherContent.style.maxHeight = '0px';
            const otherHeader = otherItem.querySelector('.faq-header');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('open');
          header.setAttribute('aria-expanded', 'false');
          if (content) content.style.maxHeight = '0px';
        } else {
          item.classList.add('open');
          header.setAttribute('aria-expanded', 'true');
          if (content) content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

})();
