import { getElement } from "./document";

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const dropDown = getElement("#dropdownContainer");
    dropDown?.classList.add("hidden");
  }
});
