import { createElement, getElement } from "../../../../utils/document";
import fillSVGPath from "../../../../utils/fillSVGPath";

function ColorPalette(id: string) {
  function getColorAndTarget(event: Event) {
    const target = event.target as HTMLInputElement;
    const targetColor = target.value;
    const targetId = target.closest(".palette-option")!.id;
    const targetArea = targetId.match(/^(.+?)-palette$/)?.[1] ?? "";
    return { targetColor, targetArea };
  }

  function changeColor(name: string, color: string) {
    document.documentElement.style.setProperty(`--theme-${name}-color`, color);
  }

  const inputColorPalette = createElement("input", {
    type: "color",
    id: `${id}ColorPalette`,
    class: "input-color-palette",
    name: id,
  });

  inputColorPalette.addEventListener("input", (event) => {
    if (getElement("#canvasBody")?.classList.contains("hidden")) {
      window.alert("행성이를 먼저 선택한 후 색을 정해주세요");
    }
    const { targetColor, targetArea } = getColorAndTarget(event);
    const el = getElement("#canvasBody svg")!.id;
    fillSVGPath(`.canvas #${el} #${targetArea}`, targetColor);
    fillSVGPath(
      `.dropdown #${targetArea}-palette #palette #stroke`,
      targetColor
    );
  });

  inputColorPalette.addEventListener("change", (event) => {
    if (getElement("#canvasBody")?.classList.contains("hidden")) return;
    const { targetColor, targetArea } = getColorAndTarget(event);
    changeColor(targetArea, targetColor);
  });

  return inputColorPalette;
}

export default ColorPalette;
