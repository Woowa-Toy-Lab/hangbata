import { createElement, getElement } from "../../utils/document";
import loadSingleColorSvg from "../../utils/loadSingleColorSvg";
import PaletteDropdownContainer from "./PaletteDropdownContainer/PaletteDropdownContainer";

function PaletteContainer(targetId: string) {
  const target = getElement(targetId);

  function render() {
    const paletteTrigger = createElement("div", {
      class: "palette-trigger",
    });
    loadSingleColorSvg("palette", "#fff").then((text) => {
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
