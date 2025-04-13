import { createElement, getElement } from "../../../utils/document";
import fillSVGPath from "../../../utils/fillSVGPath";
import loadSingleColorSvg from "../../../utils/loadSingleColorSvg";
import { canvasInstance } from "../../Canvas/Canvas";

function TrashCan() {
  const trashCan = createElement("div", {
    class: "trash-can-icon",
  });

  loadSingleColorSvg("trash-can", "#fff").then((text) => {
    trashCan.innerHTML = text;
  });

  trashCan.addEventListener("click", () => {
    const canvas = canvasInstance();
    canvas.removeCanvasImage();
    if (canvas.getCurrentSelectedElement()?.id === "canvasBody") {
      const selectedAvataElement = getElement(".avata-svg-box.selected");
      selectedAvataElement?.classList.remove("selected");

      document.documentElement.style.setProperty(
        `--theme-body-color`,
        "rgba(0, 0, 0, 0)"
      );
      document.documentElement.style.setProperty(
        `--theme-band-color`,
        "rgba(0, 0, 0, 0)"
      );

      fillSVGPath(`.palette-dropdown #body-palette #palette #stroke`, "#000 ");
      fillSVGPath(`.palette-dropdown #band-palette #palette #stroke`, "#000 ");
    }
  });

  return trashCan;
}

export default TrashCan;
