document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById("screenshot-dialog");
  const dialogImage = document.getElementById("dialog-img");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDescription = document.getElementById("dialog-desc");
  const closeButton = document.getElementById("dialog-close");

  // Image links still work when native dialogs or JavaScript are unavailable.
  if (!dialog || !dialogImage || !dialogTitle || !dialogDescription ||
      !closeButton || typeof dialog.showModal !== "function") return;

  let trigger = null;
  document.querySelectorAll(".screenshot-link").forEach((link) => {
    link.setAttribute("aria-haspopup", "dialog");
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      trigger = link;
      dialogImage.src = link.href;
      dialogImage.alt = link.querySelector("img")?.alt || link.dataset.title;
      dialogTitle.textContent = link.dataset.title;
      dialogDescription.textContent = link.dataset.description;
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add("dialog-open");
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  // Native Escape handling also restores scrolling and focus through this event.
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    trigger?.focus({ preventScroll: true });
    trigger = null;
  });
});
