const mobileToggle = document.querySelector(".mobile-nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const modal = document.querySelector(".image-modal");
const modalImage = document.querySelector(".modal-image");
const modalCaption = document.querySelector(".modal-caption");
const modalClose = document.querySelector(".modal-close");
const imageButtons = document.querySelectorAll(".project-image-button");

if (mobileToggle && siteNav) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!siteNav || !mobileToggle) {
      return;
    }

    siteNav.classList.remove("is-open");
    mobileToggle.setAttribute("aria-expanded", "false");
  });
});

function openModal(src, caption) {
  if (!modal || !modalImage || !modalCaption) {
    return;
  }

  modalImage.src = src;
  modalImage.alt = caption;
  modalCaption.textContent = caption;
  modal.showModal();
}

function closeModal() {
  if (!modal || !modal.open) {
    return;
  }

  modal.close();
}

imageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.dataset.image || "", button.dataset.caption || "");
  });
});

modalClose?.addEventListener("click", closeModal);

modal?.addEventListener("click", (event) => {
  const rect = modal.getBoundingClientRect();
  const insideDialog =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!insideDialog) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
