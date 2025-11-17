// puts the shared header + footer into every page
document.addEventListener("DOMContentLoaded", () => {

  // Load Header
  fetch("/partials/header.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("header").innerHTML = html;   // FIXED!!!
      // Load mobile nav script after header loads
      const navScript = document.createElement("script");
      navScript.src = "/js/mobile-nav.js";
      document.body.appendChild(navScript);
    });

  // Load Footer
  fetch("/partials/footer.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("footer").innerHTML = html;   // FIXED!!!
    });
});
