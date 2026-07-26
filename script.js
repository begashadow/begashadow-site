
window.addEventListener("load", () => {
  window.setTimeout(() => {
    document.getElementById("intro").classList.add("hide");
  }, 3000);
});

document.getElementById("year").textContent = new Date().getFullYear();
