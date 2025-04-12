import changeColor from "../../utils/changeColor";
import { createElement, getElement } from "../../utils/document";

function ColorPalette(targetId: string) {
  const target = getElement(targetId);

  function render() {
    const colorPalette = createElement("img", {
      id: "colorPalette",
      class: "color-palette",
      src: "/img/palette.svg",
      alt: "color-palette",
    });

    target?.append(colorPalette);
  }
  render();

  function setCustomColor() {
    changeColor("#aeffcf", "#aeffcf");
  }
}

export default ColorPalette;
