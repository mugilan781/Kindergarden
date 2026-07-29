/* ============================================================
   KINDERGARDEN — Premium Kindergarten & Primary School
   Master JavaScript
   ============================================================ */

// === DOCUMENT READY ===
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initHeroSlider();
  initScrollReveal();
  initCounterAnimation();
  initFaqAccordion();
  initBackToTop();
  initSmoothScroll();
  initGalleryFilter();
  initFormValidation();
  initActiveNavLink();
  initThemeToggle();
  initRtlToggle();
  initProfileDropdown();
  initTestimonialSlider();
});

// === NAVBAR ===
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// === MOBILE MENU ===
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// === HERO SLIDER ===
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const dots = slider.querySelectorAll('.hero-dot');
  let current = 0;
  let interval;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    current = index;
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function startAutoPlay() {
    interval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(interval);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      stopAutoPlay();
      startAutoPlay();
    });
  });

  if (slides.length > 0) {
    goToSlide(0);
    startAutoPlay();
  }
}

// === SCROLL REVEAL ===
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// === COUNTER ANIMATION ===
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');

  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        // Extract number from text (handle formats like "99%", "500+", "15+", etc.)
        const numMatch = text.match(/\d[\d,]*/);
        if (!numMatch) return;

        const targetValue = parseInt(numMatch[0].replace(/,/g, ''));
        const suffix = text.replace(numMatch[0], '');
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          const currentValue = Math.floor(eased * targetValue);

          target.textContent = currentValue.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            target.textContent = targetValue.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// === FAQ ACCORDION ===
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

// === BACK TO TOP ===
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// === GALLERY FILTER ===
function initGalleryFilter() {
  const filters = document.querySelectorAll('.gallery-filter');
  if (filters.length === 0) return;

  const items = document.querySelectorAll('.gallery-item');

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      const value = filter.getAttribute('data-filter') || 'all';

      items.forEach(item => {
        if (value === 'all' || item.classList.contains(value)) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// === FORM VALIDATION ===
function initFormValidation() {
  const forms = document.querySelectorAll('.auth-form, .contact-form');
  if (forms.length === 0) return;

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

      inputs.forEach(input => {
        const errorEl = input.parentElement.querySelector('.form-error') || (() => {
          const el = document.createElement('span');
          el.className = 'form-error';
          el.style.cssText = 'color: var(--coral); font-size: 0.8125rem; margin-top: 4px; display: block;';
          input.parentElement.appendChild(el);
          return el;
        })();

        if (!input.value.trim()) {
          errorEl.textContent = 'This field is required';
          input.style.borderColor = 'var(--coral)';
          isValid = false;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          errorEl.textContent = 'Please enter a valid email';
          input.style.borderColor = 'var(--coral)';
          isValid = false;
        } else if (input.type === 'password' && input.value.length < 6) {
          errorEl.textContent = 'Password must be at least 6 characters';
          input.style.borderColor = 'var(--coral)';
          isValid = false;
        } else {
          errorEl.textContent = '';
          input.style.borderColor = '';
        }
      });

      // Password match check
      const password = form.querySelector('input[name="password"]');
      const confirm = form.querySelector('input[name="confirm-password"]');
      if (password && confirm) {
        const errorEl = confirm.parentElement.querySelector('.form-error');
        if (password.value !== confirm.value) {
          errorEl.textContent = 'Passwords do not match';
          confirm.style.borderColor = 'var(--coral)';
          isValid = false;
        }
      }

      if (isValid) {
        const btn = form.querySelector('.btn');
        if (btn) {
          btn.textContent = btn.textContent.includes('In') ? 'Signing In...' : 'Processing...';
          btn.disabled = true;
          setTimeout(() => {
            btn.textContent = btn.textContent.includes('Sign') ? 'Sign In' : 'Submit';
            btn.disabled = false;
            if (form.closest('.auth-card')) {
              window.location.href = 'dashboard/index.html';
            } else {
              const successMsg = document.createElement('div');
              successMsg.style.cssText = 'padding: 16px 20px; background: rgba(110,231,183,0.2); color: #059669; border-radius: 12px; font-weight: 600; text-align: center; margin-top: 16px;';
              successMsg.textContent = 'Thank you! Your message has been sent successfully.';
              form.appendChild(successMsg);
              form.reset();
              setTimeout(() => successMsg.remove(), 5000);
            }
          }, 1500);
        }
      }
    });

    form.querySelectorAll('input, textarea, select').forEach(input => {
      input.addEventListener('input', () => {
        input.style.borderColor = '';
        const errorEl = input.parentElement.querySelector('.form-error');
        if (errorEl) errorEl.textContent = '';
      });
    });
  });
}

// === PROFILE DROPDOWN ===
function initProfileDropdown() {
  const wrap = document.querySelector('.profile-wrap');
  if (!wrap) return;
  const btn = wrap.querySelector('.profile-btn');
  const dropdown = wrap.querySelector('.profile-dropdown');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
}

// === ACTIVE NAV LINK ===
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
}

// === THEME TOGGLE (Dark/Light) ===
function initThemeToggle() {
  const stored = localStorage.getItem('kindergarden-theme');
  if (stored === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  if (stored === 'dark') {
    toggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  } else {
    toggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  }

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('kindergarden-theme', 'light');
      toggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('kindergarden-theme', 'dark');
      toggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  });
}

// === RTL TOGGLE ===
function initRtlToggle() {
  const toggle = document.querySelector('.rtl-toggle');
  if (!toggle) return;

  const stored = localStorage.getItem('kindergarden-rtl');
  const updateLabel = () => {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    toggle.textContent = isRtl ? 'LTR' : 'RTL';
  };

  if (stored === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
    updateLabel();
  }

  toggle.addEventListener('click', () => {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    if (isRtl) {
      document.documentElement.removeAttribute('dir');
      localStorage.setItem('kindergarden-rtl', 'ltr');
    } else {
      document.documentElement.setAttribute('dir', 'rtl');
      localStorage.setItem('kindergarden-rtl', 'rtl');
    }
    updateLabel();
  });
}

// === TESTIMONIALS SLIDER (Home 2) ===
function initTestimonialSlider() {
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  
  if (!track || !prevBtn || !nextBtn) return;
  
  const originalCards = Array.from(track.children);
  const originalCount = originalCards.length;
  if (originalCount === 0) return;
  
  // Clone cards for infinite loop
  // Append clones
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('clone-appended');
    track.appendChild(clone);
  });
  
  // Prepend clones
  originalCards.slice().reverse().forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('clone-prepended');
    track.insertBefore(clone, track.firstChild);
  });
  
  const cloneCount = originalCount;
  let currentIndex = cloneCount; // Start at the first original card
  let isTransitioning = false;
  let slideWidth = 0;
  let autoplayInterval;
  
  function updateSlideWidth() {
    const card = track.querySelector('.testimonial2-card');
    if (card) {
      const cardWidth = card.getBoundingClientRect().width;
      const gap = parseInt(window.getComputedStyle(track).gap) || 0;
      slideWidth = cardWidth + gap;
    }
  }
  
  function updatePosition() {
    track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    updateDots();
  }
  
  function updateDots() {
    const dots = document.querySelectorAll('.testimonial2-dot');
    if (dots.length === 0) return;
    
    const activeIndex = (currentIndex - cloneCount + originalCount) % originalCount;
    dots.forEach((dot, i) => {
      if (i === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  function moveSlider(dir) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    
    if (dir === 'next') {
      currentIndex++;
    } else {
      currentIndex--;
    }
    
    updatePosition();
  }
  
  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    
    // Seamless jump at boundaries
    if (currentIndex >= originalCount + cloneCount) {
      track.style.transition = 'none';
      currentIndex = cloneCount;
      updatePosition();
    } else if (currentIndex < cloneCount) {
      track.style.transition = 'none';
      currentIndex = originalCount + cloneCount - 1;
      updatePosition();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    stopAutoplay();
    moveSlider('next');
    startAutoplay();
  });
  
  prevBtn.addEventListener('click', () => {
    stopAutoplay();
    moveSlider('prev');
    startAutoplay();
  });
  
  // Create dots dynamically
  const dotsContainer = document.getElementById('testimonialDots');
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < originalCount; i++) {
      const dot = document.createElement('button');
      dot.className = `testimonial2-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        stopAutoplay();
        currentIndex = cloneCount + i;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        updatePosition();
        startAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }
  
  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      moveSlider('next');
    }, 5000);
  }
  
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }
  
  const wrapper = track.parentElement;
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);
  }
  
  // Drag / Swipe Interaction
  let startX = 0;
  let isDragging = false;
  let startTranslate = 0;
  
  track.addEventListener('pointerdown', (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    stopAutoplay();
    isDragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
    
    const transformMatrix = window.getComputedStyle(track).transform;
    if (transformMatrix && transformMatrix !== 'none') {
      const matrixValues = transformMatrix.split('(')[1].split(')')[0].split(',');
      startTranslate = parseFloat(matrixValues[4]);
    } else {
      startTranslate = -currentIndex * slideWidth;
    }
    
    track.setPointerCapture(e.pointerId);
  });
  
  track.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const deltaX = currentX - startX;
    track.style.transform = `translateX(${startTranslate + deltaX}px)`;
  });
  
  track.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.releasePointerCapture(e.pointerId);
    
    const deltaX = e.clientX - startX;
    const threshold = slideWidth * 0.15;
    
    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    isTransitioning = true;
    
    if (deltaX < -threshold) {
      currentIndex++;
    } else if (deltaX > threshold) {
      currentIndex--;
    }
    
    updatePosition();
    startAutoplay();
  });
  
  track.addEventListener('pointercancel', (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    isTransitioning = true;
    updatePosition();
    startAutoplay();
  });
  
  window.addEventListener('resize', () => {
    updateSlideWidth();
    track.style.transition = 'none';
    updatePosition();
  });
  
  // Start slider
  setTimeout(() => {
    updateSlideWidth();
    updatePosition();
    startAutoplay();
  }, 100);
}
