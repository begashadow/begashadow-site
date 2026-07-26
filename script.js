const loader = document.querySelector('.loader');
const hideLoader = () => loader?.classList.add('hidden');
window.addEventListener('DOMContentLoaded', () => setTimeout(hideLoader, 500));
window.addEventListener('load', hideLoader);
setTimeout(hideLoader, 2500);

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const toast = document.querySelector('.toast');
document.querySelectorAll('[data-pending]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    toast.textContent = `Le lien ${link.dataset.pending} sera ajouté lors du prochain ajustement.`;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  });
});

const canvas = document.getElementById('embers');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles = Array.from({ length: Math.min(58, Math.floor(innerWidth / 22)) }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.5 + .35,
    vy: Math.random() * .42 + .1,
    vx: (Math.random() - .5) * .18,
    alpha: Math.random() * .55 + .12
  }));
}
function animateParticles() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach(p => {
    p.y -= p.vy;
    p.x += p.vx;
    if (p.y < -6) { p.y = innerHeight + 6; p.x = Math.random() * innerWidth; }
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 166, 40, ${p.alpha})`;
    ctx.shadowColor = 'rgba(255, 130, 20, .8)';
    ctx.shadowBlur = 7;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
resizeCanvas();
animateParticles();
addEventListener('resize', resizeCanvas, { passive: true });
