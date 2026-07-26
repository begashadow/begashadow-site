
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("intro").classList.add("hide"), 3000);
});

const btn = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");
btn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();
