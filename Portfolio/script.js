/* Portfolio interactions — Bhushan Chaudhari */

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Nav scroll effect
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (window.scrollY > 30) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

// IntersectionObserver reveals
const io = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Smooth nav active state
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--gold-2)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => spy.observe(s));

// Contact form → mailto
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const subject = (data.get('subject') || 'Portfolio contact').toString().trim();
  const message = (data.get('message') || '').toString().trim();

  if (!name || !email || !message) {
    note.textContent = 'Please fill in name, email, and message.';
    note.className = 'form-note error';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    note.textContent = 'Please enter a valid email address.';
    note.className = 'form-note error';
    return;
  }

  const body = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
  const mailto = `mailto:bhushanch45@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  window.location.href = mailto;

  note.textContent = 'Opening your email client…';
  note.className = 'form-note success';
  setTimeout(() => { form.reset(); note.textContent = ''; note.className = 'form-note'; }, 4000);
});
