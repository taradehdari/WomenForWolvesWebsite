document.addEventListener("DOMContentLoaded", () => {

  // Detect depth correctly for GitHub Pages
  const path = window.location.pathname;

  // EXAMPLE:
  // /WomenForWolvesWebsite/index.html → ["", "WomenForWolvesWebsite", "index.html"]
  // /WomenForWolvesWebsite/get-involved/events.html → ["", "WomenForWolvesWebsite", "get-involved", "events.html"]

  const parts = path.split("/").filter(p => p.length > 0);

  // Ignore the repo name (WomenForWolvesWebsite)
  const depth = parts.length - 2;

  // Build the correct prefix
  let base = "";
  for (let i = 0; i < depth; i++) base += "../";

  // Load Header
  fetch(base + "partials/header.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("header.site-header").innerHTML = html;

      // Fix dynamic links
      document.querySelectorAll("[data-href]").forEach(link => {
        link.href = base + link.dataset.href;
      });

      // Fix dynamic logo
      document.querySelectorAll("[data-logo]").forEach(img => {
        img.src = base + img.dataset.logo;
      });

      // Load mobile nav script
      const navScript = document.createElement("script");
      navScript.src = base + "js/mobile-nav.js";
      document.body.appendChild(navScript);
    });

  // Load Footer
  fetch(base + "partials/footer.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("footer.site-footer").innerHTML = html;
    });
});


//add hero to each page
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero-target");
  if (!hero) return;

  // Build correct base path depending on folder depth
  const depth = window.location.pathname.split("/").length - 2;
  let base = "";
  for (let i = 0; i < depth; i++) base += "../";

  fetch(base + "partials/page-hero.html")
    .then(res => res.text())
    .then(html => {
      // Replace template tags
      html = html
        .replace("{{BG}}", hero.dataset.bg)
        .replace("{{TITLE}}", hero.dataset.title)
        .replace("{{SUBTITLE}}", hero.dataset.sub || "");

      // Render hero + divider
      hero.outerHTML = html;
    })
    .catch(err => console.error("Hero load error:", err));
});

