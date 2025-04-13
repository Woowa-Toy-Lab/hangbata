import { createElement, getElement } from "../../utils/document";
import PaletteContainer from "./PaletteContainer/PaletteContainer";

function AvataToolsContainer(targetId: string) {
  const target = getElement(targetId);

  function render() {
    const colorPalette = PaletteContainer();
    const avataToolsContainer = createElement(
      "div",
      {
        id: "avataToolsContainer",
        class: "avata-tools-container",
      },
      colorPalette
    );
    target?.append(avataToolsContainer);
  }
  render();
}

export default AvataToolsContainer;
