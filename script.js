const intro = document.getElementById('intro');
const site = document.getElementById('site');
const count = document.getElementById('count');
const enter = document.getElementById('enter');

let remaining = 3;
let timer;

function showSite() {
  clearInterval(timer);
  site.hidden = false;
  intro.classList.add('hide');
  setTimeout(() => intro.remove(), 700);
}

timer = setInterval(() => {
  remaining -= 1;
  count.textContent = Math.max(remaining, 0);
  if (remaining <= 0) showSite();
}, 1000);

enter.addEventListener('click', showSite);
