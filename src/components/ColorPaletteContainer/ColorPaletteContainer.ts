import { createElement, getElement } from "../../utils/document";
import loadPaletteSvg from "../../utils/loadPaletteSvg";
import ColorPickerDropdown from "./ColorPickerDropdown/ColorPickerDropdown";

function ColorPaletteContainer(targetId: string) {
  const target = getElement(targetId);
  ColorPickerDropdown(targetId);

  function render() {
    const colorPalette = createElement("div", {
      id: "colorPalette",
      class: "color-palette",
    });

    loadPaletteSvg("#fff").then((text) => {
      colorPalette.innerHTML = text;
    });

    colorPalette.addEventListener("click", () => {
      getElement("#dropDownContainer")?.classList.toggle("hidden");
    });

    target?.append(colorPalette);
  }
  render();
}

export default ColorPaletteContainer;
