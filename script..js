// curser
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
if (cursor && ring) {
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove' , e => {
    mx = e.clientX;
    my = e.clientY;
    
    cursor.style.left = (mx - 4) + 'px';
    cursor.style.top = (my - 4) + 'px';
    
});

function animRing() {
    rx += (mx - rx - 18) * 0.12;
    ry += (my - ry - 18) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
}
animRing();
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
    });
{ threshold: 0.12}
});

document.querySelectorAll('.reveal, .divider').forEach(el => observer.observe(el));

// nav au scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 80) {
        nav.style.background = 'rgba(13,13,13,0.95)';
        nav.style.backdropFilter = 'blur(12px)';
        nav.style.padding = '16px 60px';
        nav.style.transition = 'all 0.4s ease';
    } else {
        nav.style.background = '';
        nav.style.backdropFilter = '';
        nav.style.padding = '28px 60px';
    }
});

// parallaxe hero
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = 'translativeY(${window.scrollY * 0.4}px)';
    }
});

// MENU BURGER
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navlinks');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
    }
  });
}

// Section faune et flore
function showTab(id, btn) {
  /* Cache toutes les sections */
  document.querySelectorAll('.section').forEach(s => {
    s.classList.remove('active');
  });

  /* Retire active de tous les boutons */
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.remove('active');
  });

  /* Affiche la section cliquée */
  document.getElementById(id).classList.add('active');

  /* Met le bouton en surbrillance */
  btn.classList.add('active');
}

// CAROUSEL RÉGIONS
const track = document.getElementById('track');
if (track) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const thumbs = document.querySelectorAll('.thumb');
  const progress = document.getElementById('progress');
  const counter = document.getElementById('page-counter');
  const total = slides.length;
  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    thumbs[current].classList.remove('active');

    current = (index + total) % total;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
    thumbs[current].classList.add('active');

    track.style.transform = `translateX(-${current * 100}%)`;
    progress.style.width = `${((current + 1) / total) * 100}%`;
    counter.textContent = `0${current + 1} / 0${total}`;
  }

  document.getElementById('next').addEventListener('click', () => goTo(current + 1));
  document.getElementById('prev').addEventListener('click', () => goTo(current - 1));

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => goTo(i)));

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft')  goTo(current - 1);
  });
}

