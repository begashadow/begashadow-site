
const $ = id => document.getElementById(id);

function setLink(id, url){
  const el = $(id);
  if(!el) return;
  if(url){ el.href = url; el.style.display = ""; }
  else el.style.display = "none";
}

async function loadSite(){
  try{
    const response = await fetch(`data/site.json?v=${Date.now()}`);
    const data = await response.json();

    if(data.banner){
      $("banner-title").textContent = data.banner.title || "";
      $("banner-subtitle").textContent = data.banner.subtitle || "";
      if(data.banner.image) $("banner-image").src = data.banner.image;
    }

    const r = data.release || {};
    if(r.published === false){
      $("release-card").style.display = "none";
      $("release-status").textContent = "Prochaine annonce bientôt";
    }else{
      $("release-status").textContent = r.status || "À la une";
      $("release-title").textContent = r.title || "";
      $("release-message").textContent = r.message || "";
      $("release-date").textContent = r.date || "";
      if(r.cover) $("release-cover").src = r.cover;
      const btn = $("release-button");
      if(r.button_url){
        btn.href = r.button_url;
        btn.textContent = r.button_label || "Découvrir";
      }else btn.classList.add("hidden");
    }

    const s = data.socials || {};
    setLink("youtube", s.youtube);
    setLink("facebook", s.facebook);
    setLink("instagram", s.instagram);

    const email = data.contact_email || "contact@begashadow.com";
    $("contact-button").href = `mailto:${email}?subject=Contact%20BEGA`;
    $("contact-email").href = `mailto:${email}`;
    $("contact-email").textContent = email;
  }catch(err){ console.error(err); }
}

const menuBtn = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");
menuBtn.addEventListener("click", ()=>{
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

$("year").textContent = new Date().getFullYear();
loadSite();
