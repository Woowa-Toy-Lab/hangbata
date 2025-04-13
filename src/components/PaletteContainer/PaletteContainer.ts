import { createElement, getElement } from "../../utils/document";
import loadPaletteSvg from "../../utils/loadPaletteSvg";
import PaletteDropdownContainer from "./PaletteDropdownContainer/PaletteDropdownContainer";

function PaletteContainer(targetId: string) {
  const target = getElement(targetId);

  function render() {
    const paletteTrigger = createElement("div", {
      class: "palette-trigger",
    });
    loadPaletteSvg("#fff").then((text) => {
      paletteTrigger.innerHTML = text;
    });
    paletteTrigger.addEventListener("click", () => {
      getElement("#paletteDropdownContainer")?.classList.toggle("hidden");
    });

    const paletteContainer = createElement(
      "div",
      {
        id: "paletteContainer",
        class: "palette-container",
      },
      paletteTrigger,
      PaletteDropdownContainer()
    );

    target?.append(paletteContainer);
  }
  render();
}

export default PaletteContainer;
