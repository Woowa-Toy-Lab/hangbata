import { createElement } from "../../../utils/document";
import loadSingleColorSvg from "../../../utils/loadSingleColorSvg";

function TrashCan() {
  const trashCan = createElement("div", {
    class: "trash-can-icon",
  });

  loadSingleColorSvg("trash-can", "#fff").then((text) => {
    trashCan.innerHTML = text;
  });
  trashCan.addEventListener("click", () => {
    console.log("삭제");
  });

  return trashCan;
}

export default TrashCan;
