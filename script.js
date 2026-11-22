/**
 * BHAVYA LAKHWAN - PERSONAL PORTFOLIO SCRIPT
 * Features:
 * - Pastel Light / Velvet Rose Dark Theme Switcher with LocalStorage
 * - Category-based Project Filtering (All, C Programming, Frontend)
 * - Active Navigation ScrollSpy via IntersectionObserver
 * - Mobile Navigation Menu Toggle
 * - Interactive Contact Form with Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initProjectFilter();
  initMobileNav();
  initScrollSpy();
  initContactForm();
});

// ==========================================================================
// 1. Theme Switcher (Pastel Light & Velvet Rose Dark)
// ==========================================================================
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const STORAGE_KEY = 'bhavya_portfolio_theme';

  // Check saved theme or default to pastel-light
  const savedTheme = localStorage.getItem(STORAGE_KEY) || 'pastel-light';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'pastel-light';
    const newTheme = currentTheme === 'pastel-light' ? 'pastel-dark' : 'pastel-light';
    applyTheme(newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    themeIcon.textContent = theme === 'pastel-light' ? '🌸' : '🌙';
  }
}

// ==========================================================================
// 2. Project Category Filtering
// ==========================================================================
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Set active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedCategory = button.getAttribute('data-filter');

      // Filter cards
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

// ==========================================================================
// 3. Mobile Navigation Menu Toggle
// ==========================================================================
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!mobileToggle || !mobileMenu) return;

  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// ==========================================================================
// 4. ScrollSpy (Active Navigation Highlighting)
// ==========================================================================
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

// ==========================================================================
// 5. Contact Form Submission
// ==========================================================================
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccessMessage');

  if (!contactForm || !successMessage) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    // Display smooth pastel success banner
    successMessage.style.display = 'block';
    successMessage.textContent = `🌸 Thank you, ${name}! Your message has been received.`;
    contactForm.reset();

    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 6000);
  });
}
