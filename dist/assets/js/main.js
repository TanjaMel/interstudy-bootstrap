
async function loadPartial(selector, url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    document.querySelector(selector).innerHTML = html;
  } catch (e) {
    console.error('Не удалось загрузить partial:', url, e);
  }
}



// Плавное появление блоков при скролле
function initFadeInOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Если не нужно повторное скрытие — отключаем наблюдение
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', initFadeInOnScroll);

// Год в футере
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Кнопка «Наверх»
const backTop = document.getElementById('backTop');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.style.display = window.scrollY > 400 ? 'block' : 'none';
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
