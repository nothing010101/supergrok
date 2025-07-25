// plugin.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('[plugin.js] Initialized ✅');

  // === Toggle terminal panel (jika ada tombol OPEN TERMINAL) ===
  const openBtn = document.getElementById('open-terminal');
  const terminal = document.getElementById('terminal');

  if (openBtn && terminal) {
    openBtn.addEventListener('click', () => {
      terminal.classList.toggle('active');
      console.log('Terminal toggled');
    });
  }

  // === Enable smooth scroll (jika ada anchor) ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // === Simple animation on scroll ===
  const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });
  animateOnScroll.forEach(el => observer.observe(el));

  // === Example log for plugin testing
  const pluginElements = document.querySelectorAll('[data-plugin]');
  pluginElements.forEach(el => {
    console.log(`Plugin hook: ${el.dataset.plugin}`);
  });
});
