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

  const eye1Layer = createElement("div", {
    id: "canvasEye1",
    class: "canvas-item face hidden",
  });
  const eye2Layer = createElement("div", {
    id: "canvasEye2",
    class: "canvas-item face hidden",
  });
  const mouthLayer = createElement("div", {
    id: "canvasMouth",
    class: "canvas-item face hidden",
  });
  const itemLayer = createElement("div", {
    id: "canvasItem",
    class: "canvas-item hidden",
  });
  const effectLayer = createElement("div", {
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

  const draggedElements = new WeakSet<Element>();
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
    if (draggedElements.has(el)) return;
    draggedElements.add(el);

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

    document.addEventListener("mousemove", (e) => {
      if (!isDragging || selectedElement !== el) return;
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!(e.target as HTMLElement)?.classList?.contains("canvas-item")) {
      clearSelection();
    }
    selectElement(target);
  });

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
    if (key === "특수효과" || key === "소품") item.element.style.width = "30%";
    onDragHandler(item.element);
  }

  return { setCanvasImage };
}

export function canvasInstance() {
  if (!instance) instance = Canvas("#canvasLayout");
  return instance;
}
