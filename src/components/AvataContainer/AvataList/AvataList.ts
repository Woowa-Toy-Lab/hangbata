import { createElement } from "../../../utils/document";
import { canvasInstance } from "../../Canvas/Canvas";
import AvataItem from "./AvataItem/AvataItem";

const avataListData = {
  몸통: ["body1", "body2", "body3", "body4"],
  표정: [],
  소품: [],
  특수효과: [],
  배경: [],
};

export type Tkey = "몸통" | "표정" | "소품" | "특수효과" | "배경";

function AvataList(key: Tkey) {
  function setCanvasState(e: Event) {
    const selectedElement = (e.target as Element).closest(".avata-svg-box");
    const canvas = canvasInstance();
    selectedElement && canvas.setCanvasImage(key, selectedElement.id);
  }

  const avataList = avataListData[key].map((svgName) => AvataItem(svgName));
  const avataListContainer = createElement(
    "div",
    { id: "avataListContainer", class: "avata-list-container" },
    ...avataList
  );
  avataListContainer.removeEventListener("click", setCanvasState);
  avataListContainer.addEventListener("click", setCanvasState);

  return avataListContainer;
}

export default AvataList;
