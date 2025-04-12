import { createElement, getElement } from "../../utils/document";
import { Tkey } from "../AvataContainer/AvataList/AvataList";

let instance: ReturnType<typeof Canvas> | null = null;

function Canvas(targetId: string) {
  const target = getElement(targetId);
  const canvas = createElement("canvas", { class: "canvas" });
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
  canvas.append(bodyLayer, faceLayer, itemLayer, effectLayer);
  target?.appendChild(canvas);

  let state = {
    몸통: { svgName: "", element: bodyLayer },
    표정: { svgName: "", element: faceLayer },
    소품: { svgName: "", element: itemLayer },
    특수효과: { svgName: "", element: effectLayer },
    배경: { svgName: "", element: canvas },
  };

  function setCanvasImage(key: Tkey, svgName: string) {
    // as 타입단언을 제거하기 위해 createElement, toElement 수정했고
    // item 선언도 if 분기를 나눠서 진행함
    // 이렇게된 이유는 canvas(배경)은 div고 나머지는 Image태그라서 ㅠㅜ
    if (key === "배경") {
      const item = state["배경"];
      item.svgName = svgName;
      item.element.style.backgroundImage = `url(/img/${svgName}.svg)`;
      return;
    }

    const item = state[key];
    item.svgName = svgName;
    item.element.src = `/img/${svgName}.svg`;
    item.element.classList.remove("hidden");
  }

  return { setCanvasImage };
}

export function canvasInstance() {
  if (!instance) instance = Canvas("#canvasLayout");
  return instance;
}
