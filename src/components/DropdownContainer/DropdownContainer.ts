import { createElement, getElement } from "../../utils/document";

function DropdownContainer(id: string, dropdownOptions: Element[]) {
  const dropdown = createElement(
    "div",
    {
      class: "dropdown",
    },
    ...dropdownOptions
  );

  const dropdownOverlay = createElement("div", {
    class: "dropdown-overlay",
  });
  dropdownOverlay.addEventListener("click", () => {
    getElement(`#${id}`)?.classList.toggle("hidden");
  });

  const dropdownContainer = createElement(
    "div",
    {
      id,
      class: "drop-down-container hidden ",
    },
    dropdown,
    dropdownOverlay
  );

  return dropdownContainer;
}

export default DropdownContainer;
