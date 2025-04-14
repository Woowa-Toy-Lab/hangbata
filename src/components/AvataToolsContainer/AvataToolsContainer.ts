import { createElement, getElement } from "../../utils/document";
import DownloadContainer from "./DownloadContainer/DownloadContainer";
import PaletteContainer from "./PaletteContainer/PaletteContainer";
import TrashCan from "./TrashCan/TrashCan";

function AvataToolsContainer(targetId: string) {
  const target = getElement(targetId);

  function render() {
    const colorPalette = PaletteContainer();
    const trashCan = TrashCan();
    const download = DownloadContainer();

    const avataToolsContainer = createElement(
      "div",
      {
        id: "avataToolsContainer",
        class: "avata-tools-container",
      },
      colorPalette,
      download,
      trashCan
    );

    target?.append(avataToolsContainer);
  }
  render();
}

export default AvataToolsContainer;
