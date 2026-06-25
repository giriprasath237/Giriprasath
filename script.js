// ============================
// 1. SMOOTH SCROLL FOR NAV LINKS
// ============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================
// 2. DARK MODE TOGGLE
// ============================
const toggleBtn = document.getElementById('theme-toggle');
const moonIcon = toggleBtn.querySelector('.icon-moon');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  moonIcon.textContent = '\u2600'; // sun symbol
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    moonIcon.textContent = '\u2600'; // sun
  } else {
    localStorage.setItem('theme', 'light');
    moonIcon.textContent = '\u263D'; // moon
  }
});

// ============================
// 3. FADE-IN SECTIONS ON SCROLL
// ============================
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(section => {
  sectionObserver.observe(section);
});

// ============================
// 4. ANIMATE SKILL BARS WHEN VISIBLE
// ============================
const skillRows = document.querySelectorAll('.skill-row');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const row = entry.target;
      const level = row.getAttribute('data-level') || 0;
      const fill = row.querySelector('.skill-fill');
      fill.style.width = level + '%';
      skillObserver.unobserve(row); // only animate once
    }
  });
}, { threshold: 0.4 });

skillRows.forEach(row => skillObserver.observe(row));

// ============================
// 5. AUTO-UPDATE FOOTER YEAR
// ============================
document.getElementById('year').textContent = new Date().getFullYear();
