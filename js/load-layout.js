document.addEventListener("DOMContentLoaded", () => {


  // DEPTH CALCULATION (GitHub Pages compatible)
  const repo = "WomenForWolvesWebsite";   // your repo name
  const partsRaw = window.location.pathname.split("/").filter(Boolean);

  // Remove repo folder if present (GitHub Pages always includes it)
  if (partsRaw[0] === repo) partsRaw.shift();

  // Remaining path parts (folders + file)
  const depth = partsRaw.length - 1;

  // Build correct "../" path
  let base = "";
  for (let i = 0; i < depth; i++) base += "../";


  // =======================================================
  // LOAD HEADER
  // =======================================================
  fetch(base + "partials/header.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("header.site-header").innerHTML = html;

      // Fix dynamic links + logos
      document.querySelectorAll("[data-href]").forEach(link => {
        link.href = base + link.dataset.href;
      });
      document.querySelectorAll("[data-logo]").forEach(img => {
        img.src = base + img.dataset.logo;
      });

      // Load mobile nav script
      const navScript = document.createElement("script");
      navScript.src = base + "js/mobile-nav.js";
      document.body.appendChild(navScript);
    });

  // =======================================================
  // LOAD FOOTER
  // =======================================================
  fetch(base + "partials/footer.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("footer.site-footer").innerHTML = html;
    });

  // =======================================================
  // LOAD HERO (GLOBAL TITLE BANNER)
  // =======================================================
  const hero = document.getElementById("hero-target");
  if (hero) {
    fetch(base + "partials/page-hero.html")
      .then(res => res.text())
      .then(html => {
        html = html
          .replace("{{BG}}", hero.dataset.bg)
          .replace("{{TITLE}}", hero.dataset.title)
          .replace("{{SUBTITLE}}", hero.dataset.sub || "");

        hero.outerHTML = html;
      })
      .catch(err => console.error("Hero load error:", err));
  }
});
