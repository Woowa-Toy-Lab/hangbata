import { createElement, getElement } from "../../../utils/document";
import loadSingleColorSvg from "../../../utils/loadSingleColorSvg";
import { Tkey } from "../../AvataContainer/AvataList/AvataList";
import { canvasInstance } from "../../Canvas/Canvas";

function TrashCan() {
  const trashCan = createElement("div", {
    class: "trash-can-icon",
  });

  loadSingleColorSvg("trash-can", "#fff").then((text) => {
    trashCan.innerHTML = text;
  });

  const labelMap: Record<string, Tkey> = {
    bodyTab: "몸통",
    faceTab: "표정",
    itemTab: "소품",
    faceTab2: "특수효과",
    backgroundTab: "배경",
  };

  trashCan.addEventListener("click", () => {
    const selectedTabElement = getElement(".avata-tab-item.selected");
    const selectedTab = selectedTabElement?.id;
    const canvas = canvasInstance();
    selectedTab && canvas.removeCanvasImage(labelMap[selectedTab]);

    const selectedAvataElement = getElement(".avata-svg-box.selected");
    selectedAvataElement?.classList.remove("selected");
  });

  return trashCan;
}

export default TrashCan;
