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
  const eye1Layer = createElement("img", {
    id: "canvasEye1",
    class: "canvas-item face hidden",
  });
  const eye2Layer = createElement("img", {
    id: "canvasEye2",
    class: "canvas-item face hidden",
  });
  const mouthLayer = createElement("img", {
    id: "canvasMouth",
    class: "canvas-item face hidden",
  });
  const itemLayer = createElement("img", {
    id: "canvasItem",
    class: "canvas-item hidden",
  });
  const effectLayer = createElement("img", {
    id: "canvasEffect",
    class: "canvas-item hidden",
  });
  canvas.append(
    bodyLayer,
    itemLayer,
    effectLayer,
    eye1Layer,
    eye2Layer,
    mouthLayer
  );
  target?.appendChild(canvas);

  let state = {
    몸통: { svgName: "", element: bodyLayer },
    눈1: { svgName: "", element: eye1Layer },
    눈2: { svgName: "", element: eye2Layer },
    입: { svgName: "", element: mouthLayer },
    소품: { svgName: "", element: itemLayer },
    특수효과: { svgName: "", element: effectLayer },
    배경: { svgName: "", element: canvas },
  };

  Object.values(state).forEach(({ element }) => {
    if (element !== canvas) onDragHandler(element);
  });

  let selectedElement: HTMLElement | null = null;

  function selectElement(el: HTMLElement) {
    clearSelection();
    selectedElement = el;
    selectedElement.classList.add("selected");
  }

  function clearSelection() {
    if (selectedElement) {
      selectedElement.classList.remove("selected");
      selectedElement = null;
    }
  }

  function onDragHandler(el: HTMLElement) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    el.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      isDragging = true;
      selectElement(el);
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
    });

    el.addEventListener("mousemove", (e) => {
      if (!isDragging || selectedElement !== el) return;
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });

    el.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }

  canvas.addEventListener("click", (e) => {
    if (!(e.target as HTMLElement)?.classList?.contains("canvas-item")) {
      clearSelection();
    }
  });

  function setCanvasImage(key: Tkey, svgName: string) {
    if (key === "배경") {
      const item = state["배경"];
      item.svgName = svgName;
      item.element.style.backgroundImage = `url(/img/${svgName}.svg)`;
      return;
    }

    const item = state[key];
    item.svgName = svgName;
    item.element.src = `/img/${svgName}.svg`;
    if (key === "특수효과" || key === "소품") item.element.style.width = "30%";
    item.element.classList.remove("hidden");
  }

  return { setCanvasImage };
}

export function canvasInstance() {
  if (!instance) instance = Canvas("#canvasLayout");
  return instance;
}
