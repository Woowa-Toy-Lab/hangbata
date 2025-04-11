import { createElement } from "../../../utils/document";
import { canvasInstance } from "../../Canvas/Canvas";
import AvataItem from "./AvataItem/AvataItem";

const avataListData = {
  몸통: ["body1", "body2", "body3", "body4"],
  표정: ["eye", "eye", "eye", ""],
  소품: ["barbell", "coffee", "labtop", "magicwand"],
  특수효과: [],
  배경: ["background1", "background2", "background3", "background4"],
};

export type Tkey = "몸통" | "표정" | "소품" | "특수효과" | "배경";

function AvataList() {
  function onClickHandler(key: Tkey) {
    let prevSelectedElement: Element | null = null;
    return function setCanvasState(e: Event) {
      const selectedElement = (e.target as Element).closest(".avata-svg-box");
      const canvas = canvasInstance();
      selectedElement && canvas.setCanvasImage(key, selectedElement.id);
      prevSelectedElement?.classList.remove("selected");
      selectedElement?.classList.add("selected");
      prevSelectedElement = selectedElement;
    };
  }

  function template(key: Tkey) {
    const avataList = avataListData[key].map((svgName) => AvataItem(svgName));
    const avataListContainer = createElement(
      "div",
      { id: "avataListContainer", class: "avata-list-box" },
      ...avataList
    );
    const clickHandler = onClickHandler(key);
    avataListContainer.removeEventListener("click", clickHandler);
    avataListContainer.addEventListener("click", clickHandler);

    return avataListContainer;
  }

  return { template };
}

export default AvataList;
