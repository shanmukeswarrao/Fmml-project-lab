const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const form = document.querySelector('.contact-form');
const status = document.querySelector('.form-status');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') document.body.classList.add('dark-mode');
const updateThemeIcon = () => { themeIcon.textContent = document.body.classList.contains('dark-mode') ? '☀' : '☾'; };
updateThemeIcon();
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  updateThemeIcon();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.nav-links a').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

document.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  document.querySelector('.scroll-progress').style.width = `${(window.scrollY / scrollable) * 100}%`;
}, { passive: true });

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    status.textContent = 'Please complete all fields with valid details.';
    form.reportValidity();
    return;
  }
  status.textContent = 'Thanks for reaching out. This form is ready to connect to your email service.';
  form.reset();
});
