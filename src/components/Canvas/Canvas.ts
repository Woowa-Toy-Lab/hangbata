import { createElement, getElement } from "../../utils/document";
import { Tkey } from "../AvataContainer/AvataList/AvataList";

let instance: ReturnType<typeof Canvas> | null = null;

function Canvas(targetId: string) {
  const target = getElement(targetId);
  const canvas = createElement("div", { class: "canvas" });
  const bodyLayer = createElement("img", {
    id: "canvasBody",
    class: " canvas-item hidden",
  });
  const faceLayer = createElement("img", {
    id: "canvasFace",
    class: "canvas-item hidden",
  });
  const itemLayer = createElement("img", {
    id: "canvasItem",
    class: "canvas-item hidden",
  });
  const effectLayer = createElement("img", {
    id: "canvasEffect",
    class: "canvas-item hidden",
  });
  const backgroundLayer = createElement("img", {
    id: "canvasBackground",
    class: "canvas-item hidden",
  });
  canvas.append(bodyLayer, faceLayer, itemLayer, effectLayer, backgroundLayer);
  target?.appendChild(canvas);

  let state = {
    몸통: { svgName: "", element: bodyLayer },
    표정: { svgName: "", element: faceLayer },
    소품: { svgName: "", element: itemLayer },
    특수효과: { svgName: "", element: effectLayer },
    배경: { svgName: "", element: backgroundLayer },
  };

  function setCanvasImage(key: Tkey, svgName: string) {
    const item = state[key];
    item.svgName = svgName;
    (item.element as HTMLImageElement).src = `/img/${svgName}.svg`;
    item.element.classList.remove("hidden");
  }

  return { setCanvasImage };
}

export function canvasInstance() {
  if (!instance) instance = Canvas("#canvasLayout");
  return instance;
}
