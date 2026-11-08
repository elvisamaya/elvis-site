// ---------------------------------------------------------------- mobile navigation
const mobileToggle = document.querySelector(".mobile-nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (mobileToggle && siteNav) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      mobileToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---------------------------------------------------------------- image lightbox
const modal = document.querySelector(".image-modal");
const modalImage = document.querySelector(".modal-image");
const modalCaption = document.querySelector(".modal-caption");
const modalClose = document.querySelector(".modal-close");

function openModal(src, caption) {
  if (!modal || !modalImage || !modalCaption) return;
  modalImage.src = src;
  modalImage.alt = caption;
  modalCaption.textContent = caption;
  modal.showModal();
}

function closeModal() {
  if (modal && modal.open) modal.close();
}

document.querySelectorAll(".project-image-button").forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.dataset.image || "", button.dataset.caption || "");
  });
});

modalClose?.addEventListener("click", closeModal);

modal?.addEventListener("click", (event) => {
  const rect = modal.getBoundingClientRect();
  const inside =
    event.clientX >= rect.left && event.clientX <= rect.right &&
    event.clientY >= rect.top && event.clientY <= rect.bottom;
  if (!inside) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

// ---------------------------------------------------------------- project category tabs
// projects.html#embedded opens that tab directly; without JavaScript every panel stays visible.
const tabs = Array.from(document.querySelectorAll('.tab[role="tab"]'));

function selectTab(id, updateHash) {
  const target = tabs.find((t) => t.getAttribute("aria-controls") === id) || tabs[0];
  if (!target) return;
  tabs.forEach((tab) => {
    const selected = tab === target;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    if (panel) panel.hidden = !selected;
  });
  if (updateHash) history.replaceState(null, "", "#" + target.getAttribute("aria-controls"));
}

if (tabs.length) {
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab.getAttribute("aria-controls"), true));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const next = tabs[(index + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      selectTab(next.getAttribute("aria-controls"), true);
    });
  });
  selectTab(location.hash.slice(1), false);
  window.addEventListener("hashchange", () => selectTab(location.hash.slice(1), false));
}

// ---------------------------------------------------------------- hero animation pause
const arrayCard = document.getElementById("array-card");
const pauseButton = document.querySelector(".pause-button");

pauseButton?.addEventListener("click", () => {
  const paused = arrayCard.classList.toggle("paused");
  pauseButton.setAttribute("aria-pressed", String(paused));
  pauseButton.setAttribute("aria-label", paused ? "Play animation" : "Pause animation");
  pauseButton.innerHTML = paused ? "&#9654;" : "&#10074;&#10074;";
});
