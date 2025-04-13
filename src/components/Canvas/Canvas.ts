import { createElement, getElement } from "../../utils/document";
import loadThemedSvg from "../../utils/loadThemedSvg";
import { Tkey } from "../AvataContainer/AvataList/AvataList";

let instance: ReturnType<typeof Canvas> | null = null;

function Canvas(targetId: string) {
  const target = getElement(targetId);
  const canvas = createElement("div", { class: "canvas" });
  const bodyLayer = createElement("div", {
    id: "canvasBody",
    class: " canvas-item hidden",
  });
  const faceLayer = createElement("div", {
    id: "canvasFace",
    class: "canvas-item hidden",
  });
  const itemLayer = createElement("div", {
    id: "canvasItem",
    class: "canvas-item hidden",
  });
  const effectLayer = createElement("div", {
    id: "canvasEffect",
    class: "canvas-item hidden",
  });
  canvas.append(bodyLayer, faceLayer, itemLayer, effectLayer);
  target?.appendChild(canvas);

  let state = {
    몸통: { svgName: "", element: bodyLayer },
    표정: { svgName: "", element: faceLayer },
    소품: { svgName: "", element: itemLayer },
    특수효과: { svgName: "", element: effectLayer },
    배경: { svgName: "", element: canvas },
  };

  async function setCanvasImage(key: Tkey, svgName: string) {
    if (key === "배경") {
      const item = state["배경"];
      item.svgName = svgName;
      item.element.style.backgroundImage = `url(/img/${svgName}.svg)`;
      return;
    }

    const item = state[key];
    item.svgName = svgName;
    item.element.innerHTML = await loadThemedSvg(svgName, true);
    item.element.classList.remove("hidden");
  }

  return { setCanvasImage };
}

export function canvasInstance() {
  if (!instance) instance = Canvas("#canvasLayout");
  return instance;
}
