
const $ = (id) => document.getElementById(id);

function setExternalLink(id, url) {
  const element = $(id);
  if (!element) return;
  if (url) {
    element.href = url;
    element.style.display = "";
  } else {
    element.style.display = "none";
  }
}

async function loadSite() {
  try {
    const response = await fetch(`data/site.json?v=${Date.now()}`);
    if (!response.ok) throw new Error("Erreur de chargement");
    const data = await response.json();

    const release = data.release || {};
    const card = $("release-card");

    if (release.published === false) {
      card.style.display = "none";
      $("release-status").textContent = "Prochaine annonce bientôt";
    } else {
      $("release-status").textContent = release.status || "À la une";
      $("release-title").textContent = release.title || "";
      $("release-message").textContent = release.message || "";
      $("release-date").textContent = release.date || "";

      if (release.cover) {
        $("release-cover").src = release.cover;
        $("release-cover").alt = `Visuel de ${release.title || "la sortie"}`;
      }

      const button = $("release-button");
      if (release.button_url && release.button_label) {
        button.href = release.button_url;
        button.textContent = release.button_label;
        button.classList.remove("hidden");
      } else {
        button.classList.add("hidden");
      }
    }

    const socials = data.socials || {};
    setExternalLink("youtube", socials.youtube);
    setExternalLink("facebook", socials.facebook);
    setExternalLink("instagram", socials.instagram);

    const email = data.contact_email || "contact@begashadow.com";
    $("contact-button").href = `mailto:${email}?subject=Contact%20BEGA%20Shadow%20Resistance`;
    $("contact-email").href = `mailto:${email}`;
    $("contact-email").textContent = email;
  } catch (error) {
    console.error(error);
  }
}

$("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const canvas = $("embers");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  particles = Array.from(
    { length: Math.min(45, Math.max(24, Math.floor(innerWidth / 30))) },
    () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      radius: Math.random() * 1.7 + 0.4,
      speed: Math.random() * 0.3 + 0.08,
      alpha: Math.random() * 0.45 + 0.12
    })
  );
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const particle of particles) {
    particle.y -= particle.speed;
    if (particle.y < -5) {
      particle.y = innerHeight + 5;
      particle.x = Math.random() * innerWidth;
    }
    ctx.beginPath();
    ctx.fillStyle = `rgba(245,207,121,${particle.alpha})`;
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(animate);
}

addEventListener("resize", resizeCanvas);
resizeCanvas();
animate();
loadSite();
