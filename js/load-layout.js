document.addEventListener("DOMContentLoaded", () => {

  // detect how deep the current file is:

  const depth = window.location.pathname.split("/").length - 2;

  let base = "";
  for (let i = 0; i < depth; i++) base += "../";


  // Load Header
  fetch(base + "partials/header.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("header.site-header").innerHTML = html;

      // Load mobile nav script AFTER header loads
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
