import { createElement, getElement } from "../../../utils/document";
import loadSingleColorSvg from "../../../utils/loadSingleColorSvg";
import DropdownContainer from "../../DropdownContainer/DropdownContainer";
import PaletteOption from "./PaletteOption/PaletteOption";

function PaletteContainer() {
  const paletteTrigger = createElement("div", {
    class: "palette-trigger",
  });
  loadSingleColorSvg("palette", "#fff").then((text) => {
    paletteTrigger.innerHTML = text;
  });
  paletteTrigger.addEventListener("click", () => {
    getElement("#dropdownContainer")?.classList.toggle("hidden");
  });

  const paletteContainer = createElement(
    "div",
    {
      id: "paletteContainer",
      class: "palette-container",
    },
    paletteTrigger,
    DropdownContainer([
      PaletteOption("body", "행성"),
      PaletteOption("band", "행성 띠"),
    ])
  );

  return paletteContainer;
}

export default PaletteContainer;
