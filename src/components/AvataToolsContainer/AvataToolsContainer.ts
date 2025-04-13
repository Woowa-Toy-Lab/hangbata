import { createElement, getElement } from "../../utils/document";
import PaletteContainer from "./PaletteContainer/PaletteContainer";
import TrashCan from "./TrashCan/TrashCan";

function AvataToolsContainer(targetId: string) {
  const target = getElement(targetId);

  function render() {
    const colorPalette = PaletteContainer();
    const trashCan = TrashCan();

    const avataToolsContainer = createElement(
      "div",
      {
        id: "avataToolsContainer",
        class: "avata-tools-container",
      },
      colorPalette,
      trashCan
    );

    target?.append(avataToolsContainer);
  }
  render();
}

export default AvataToolsContainer;
