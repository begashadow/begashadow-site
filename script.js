
const $ = id => document.getElementById(id);

const icons = {
  youtube: "▶",
  spotify: "●",
  facebook: "f",
  instagram: "◎",
  mail: "✉",
  music: "♫",
  link: "↗"
};

window.addEventListener("load", () => {
  setTimeout(() => $("intro").classList.add("hide"), 3000);
});

document.querySelector(".menu-button").addEventListener("click", () => {
  const nav = document.querySelector(".nav");
  const open = nav.classList.toggle("open");
  document.querySelector(".menu-button").setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  document.querySelector(".nav").classList.remove("open");
}));

fetch(`data/site.json?v=${Date.now()}`)
  .then(r => r.json())
  .then(data => {
    $("listen").href = data.release.url || "#";
    $("listen").querySelector("strong").textContent = `ÉCOUTER ${data.release.title || "INTRO BEGA"}`;
    $("listen").querySelector("small").textContent = data.release.subtitle || "";

    const grid = $("link-grid");
    (data.links || []).filter(link => link.visible && link.url).forEach(link => {
      const a = document.createElement("a");
      a.className = "link-card";
      a.href = link.url;
      if (!link.url.startsWith("mailto:")) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      a.innerHTML = `
        <span class="icon">${icons[link.icon] || icons.link}</span>
        <strong>${link.name}</strong>
        <small>${link.label || ""}</small>
      `;
      grid.appendChild(a);
    });
  })
  .catch(console.error);

$("year").textContent = new Date().getFullYear();
