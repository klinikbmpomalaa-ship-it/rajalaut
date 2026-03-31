/* ============================================================
   RAJA LAUT – SEAFOOD RESTAURANT
   Main JavaScript
   ============================================================ */

'use strict';

/* ---- PRELOADER ---- */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide');
      setTimeout(() => preloader.remove(), 600);
    }, 1600);
  }
});

/* ---- NAVBAR: Scroll + Active Link ---- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id], div[id]');

function updateNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function updateActiveLink() {
  const scrollY = window.pageYOffset;
  sections.forEach(sec => {
    const sTop = sec.offsetTop - 90;
    const sBottom = sTop + sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link && scrollY >= sTop && scrollY < sBottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', () => {
  updateNavbar();
  updateActiveLink();
  toggleBackToTop();
}, { passive: true });

updateNavbar();

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on nav-link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  }
});

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('id-ID');
  }, 16);
}

const counters = document.querySelectorAll('.stat-num');
let countersDone = false;
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersDone) {
      counters.forEach(c => animateCounter(c));
      countersDone = true;
    }
  });
}, { threshold: 0.4 });

const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);

/* ---- MENU FILTER TABS ---- */
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCards = document.querySelectorAll('.menu-card');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const cat = tab.dataset.cat;
    menuCards.forEach(card => {
      if (cat === 'semua' || card.dataset.cat === cat) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeCardIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Inject keyframe for card animation
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes fadeCardIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleEl);

/* ---- SCROLL REVEAL (lightweight) ---- */
const revealEls = document.querySelectorAll(
  '.menu-card, .team-card, .promo-card, .ulasan-card, .gal-item, .fact-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, (i % 4) * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  revealObserver.observe(el);
});

/* ---- BACK TO TOP ---- */
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- RESERVASI FORM → WhatsApp ---- */
const reservasiForm = document.getElementById('reservasiForm');
const reservasiSuccess = document.getElementById('reservasiSuccess');

if (reservasiForm) {
  // Set min date to today
  const dateInput = document.getElementById('r-tgl');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  reservasiForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama    = document.getElementById('r-nama').value.trim();
    const hp      = document.getElementById('r-hp').value.trim();
    const tgl     = document.getElementById('r-tgl').value;
    const jam     = document.getElementById('r-jam').value;
    const tamu    = document.getElementById('r-tamu').value;
    const area    = document.getElementById('r-area').value;
    const catatan = document.getElementById('r-catatan').value.trim();

    if (!nama || !hp || !tgl || !jam || !tamu) {
      showFormError('Harap lengkapi semua field yang wajib diisi (*).');
      return;
    }

    // Format tanggal
    const tglFormatted = new Date(tgl).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const msg = encodeURIComponent(
      `Halo Raja Laut! Saya ingin melakukan reservasi meja.\n\n` +
      `👤 *Nama*: ${nama}\n` +
      `📅 *Tanggal*: ${tglFormatted}\n` +
      `🕐 *Jam*: ${jam} WITA\n` +
      `👥 *Jumlah Tamu*: ${tamu}\n` +
      `🪑 *Area*: ${area || 'Bebas'}\n` +
      `📝 *Catatan*: ${catatan || '-'}\n\n` +
      `Mohon konfirmasinya. Terima kasih!`
    );

    const waUrl = `https://wa.me/6281234567890?text=${msg}`;

    // Show success state
    reservasiForm.style.display = 'none';
    reservasiSuccess.removeAttribute('hidden');

    // Open WhatsApp
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 500);
  });
}

function showFormError(msg) {
  let errEl = document.getElementById('form-error');
  if (!errEl) {
    errEl = document.createElement('div');
    errEl.id = 'form-error';
    errEl.style.cssText = 'background:rgba(232,69,69,0.15);border:1px solid rgba(232,69,69,0.4);color:#e84545;padding:10px 16px;border-radius:8px;margin-bottom:16px;font-size:0.88rem;';
    reservasiForm.insertBefore(errEl, reservasiForm.firstChild);
  }
  errEl.textContent = msg;
  setTimeout(() => errEl.remove(), 4000);
}

/* ---- SMOOTH ANCHOR SCROLL (offset for fixed header) ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---- LOGO PARALLAX ON HERO ---- */
const heroLogo = document.querySelector('.tentang-logo-big');
window.addEventListener('scroll', () => {
  if (heroLogo) {
    const scroll = window.scrollY;
    heroLogo.style.transform = `translateY(${scroll * 0.03}px)`;
  }
}, { passive: true });

/* ---- KEYBOARD NAVIGATION: close mobile menu on Escape ---- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
    hamburger.focus();
  }
});

/* ---- GALLERY: simple lightbox hint ---- */
document.querySelectorAll('.gal-item').forEach(item => {
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});

/* ---- AOS-like simple attribute handler ---- */
document.querySelectorAll('[data-aos]').forEach(el => {
  el.style.opacity = '0';
  const dir = el.getAttribute('data-aos');
  if (dir === 'fade-right') el.style.transform = 'translateX(-30px)';
  if (dir === 'fade-left')  el.style.transform = 'translateX(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translate(0,0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  obs.observe(el);
});

console.log('%c🐟 Raja Laut Seafood Restaurant', 'color:#00b4d8;font-size:16px;font-weight:bold;');
console.log('%cWebsite by Raja Laut Team – Makassar, Sulawesi Selatan', 'color:#7a9bb5;');
