document.addEventListener("DOMContentLoaded", () => {

  // =======================================================
  // DEPTH CALCULATION FOR ALL HOSTS (GitHub Pages safe)
  // =======================================================
  const repo = "WomenForWolvesWebsite";
  let base = "";

  const isGitHub = window.location.hostname.includes("github.io");

  if (isGitHub) {
    // GitHub Pages always serves from /repo/
    base = `/${repo}/`;
  } else {
    // Local: calculate depth normally
    let parts = window.location.pathname.split("/").filter(p => p.length > 0);
    const depth = parts.length - 1;

    for (let i = 0; i < depth; i++) {
      base += "../";
    }
  }


  // LOAD HEADER
  fetch(base + "partials/header.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("header.site-header").innerHTML = html;

      // Fix dynamic links
      document.querySelectorAll("[data-href]").forEach(link => {
        link.href = base + link.dataset.href;
      });

      // Fix dynamic logos
      document.querySelectorAll("[data-logo]").forEach(img => {
        img.src = base + img.dataset.logo;
      });

      // Load mobile nav script
      const navScript = document.createElement("script");
      navScript.src = base + "js/mobile-nav.js";
      document.body.appendChild(navScript);
    });


  // LOAD FOOTER
  fetch(base + "partials/footer.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("footer.site-footer").innerHTML = html;
    });


  // LOAD HERO (GLOBAL PAGE TITLE SECTION)
  const hero = document.getElementById("hero-target");
  if (hero) {
    fetch(base + "partials/page-hero.html")
      .then(res => res.text())
      .then(html => {
        html = html
          .replace("{{BG}}", base + hero.dataset.bg.replace(/^(\.\.\/)+/, ""))
          .replace("{{TITLE}}", hero.dataset.title)
          .replace("{{SUBTITLE}}", hero.dataset.sub || "");

        hero.outerHTML = html;
      })
      .catch(err => console.error("Hero load error:", err));
  }

});
