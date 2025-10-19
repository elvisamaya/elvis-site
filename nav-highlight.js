const currentPage = window.location.pathname.split("/").pop();

// Highlight the link that matches the current page
const links = document.querySelectorAll("nav a");
links.forEach(link => {
  const href = link.getAttribute("href");

  // Match even if href has "./" or relative path
  if (href && href.endsWith(currentPage)) {
    link.classList.add("active");
  }
});

// Highlight the "My Work" tab if on one of its subpages
const workPages = ["software.html", "hardware.html", "research.html", "misc.html"];
const workTab = document.querySelector(".dropdown > a"); // ✅ updated selector

if (workPages.includes(currentPage) && workTab) {
  workTab.classList.add("active");
}