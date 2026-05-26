/* ============================================
   MUSHARRAF BUBERE — PORTFOLIO JAVASCRIPT
   ============================================ */


/* ==========================================
   1. HAMBURGER MENU (Mobile nav toggle)
   ========================================== */

const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Close menu when any nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('open');
  });
});


/* ==========================================
   2. NAVBAR — shrink + highlight on scroll
   ========================================== */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {

  // Shrink navbar on scroll
  if (window.scrollY > 50) {
    navbar.style.padding = '12px 5%';
    navbar.style.background = 'rgba(10, 10, 15, 0.97)';
  } else {
    navbar.style.padding = '18px 5%';
    navbar.style.background = 'rgba(10, 10, 15, 0.85)';
  }

  // Highlight active nav link based on scroll position
  const sections  = document.querySelectorAll('section');
  const navAnchors = document.querySelectorAll('.nav-links a');

  sections.forEach(section => {
    const top    = section.offsetTop - 120;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (window.scrollY >= top && window.scrollY < top + height) {
      navAnchors.forEach(a => a.classList.remove('active-link'));
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active-link');
    }
  });
});


/* ==========================================
   3. TYPING EFFECT — hero tagline cycles
   ========================================== */

const taglines = [
  'AI Builder & Data Scientist',
  'Machine Learning Engineer',
  'Generative AI Developer',
  'Data Analyst & Storyteller',
  'Problem Solver with Python 🐍'
];

const taglineEl = document.querySelector('.hero-tagline');
let taglineIndex = 0;
let charIndex    = 0;
let isDeleting   = false;
let typingSpeed  = 80;

function typeEffect() {
  const current = taglines[taglineIndex];

  if (isDeleting) {
    taglineEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 40;
  } else {
    taglineEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === current.length) {
    // Pause at end of word
    typingSpeed = 1800;
    isDeleting  = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    taglineIndex = (taglineIndex + 1) % taglines.length;
    typingSpeed  = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after 1 second
setTimeout(typeEffect, 1000);


/* ==========================================
   4. SCROLL ANIMATIONS — fade in on scroll
   ========================================== */

// Add fade-in class to all animatable elements
const animateTargets = document.querySelectorAll(
  '.skill-category, .project-card, .cert-card, .blog-card, .stat, .about-text, .about-image, .contact-item'
);

animateTargets.forEach(el => {
  el.classList.add('fade-in');
});

// Watch when elements enter the viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.1 });

animateTargets.forEach(el => observer.observe(el));


/* ==========================================
   5. CONTACT FORM — success message
   ========================================== */

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault(); // stop page refresh

  const btn = contactForm.querySelector('button');

  // Change button to success state
  btn.innerHTML = '✅ Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
  btn.disabled = true;

  // Reset after 3 seconds
  setTimeout(() => {
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 3000);
});


/* ==========================================
   6. HAMBURGER ANIMATION (X shape on open)
   ========================================== */

// This is handled via CSS class .open — add this to your style.css


/* ==========================================
   7. SMOOTH BACK-TO-TOP on logo click
   ========================================== */

document.querySelector('.nav-logo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});