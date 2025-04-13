import { createElement, getElement } from "../../../../utils/document";
import fillSVGPath from "../../../../utils/fillSVGPath";
import PaletteOption from "./PaletteOption/PaletteOption";

function PaletteDropdownContainer() {
  function changeColor(name: string, color: string) {
    document.documentElement.style.setProperty(`--theme-${name}-color`, color);
  }

  function getColorAndTarget(event: Event) {
    const target = event.target as HTMLInputElement;
    const targetColor = target.value;
    const targetId = target.closest(".palette-option")!.id;
    const targetArea = targetId.match(/^(.+?)-palette$/)?.[1] ?? "";
    return { targetColor, targetArea };
  }

  // palette-dropdown 생성 및 event 달아주기
  const paletteDropdown = createElement(
    "div",
    {
      class: "palette-dropdown",
    },
    PaletteOption("body", "행성"),
    PaletteOption("band", "행성 띠")
  );

  paletteDropdown.addEventListener("input", (event) => {
    const { targetColor, targetArea } = getColorAndTarget(event);
    const el = getElement("#canvasBody svg")!.id;
    fillSVGPath(`.canvas #${el} #${targetArea}`, targetColor);
    fillSVGPath(
      `.palette-dropdown #${targetArea}-palette #palette #stroke`,
      targetColor
    );
  });

  paletteDropdown.addEventListener("change", (event) => {
    const { targetColor, targetArea } = getColorAndTarget(event);
    changeColor(targetArea, targetColor);
  });

  // palette-overlay 생성 및 event 달아주기
  const paletteOverlay = createElement("div", {
    class: "palette-overlay",
  });
  paletteOverlay.addEventListener("click", () => {
    getElement("#paletteDropdownContainer")?.classList.toggle("hidden");
  });

  return createElement(
    "div",
    {
      id: "paletteDropdownContainer",
      class: "palette-drop-down-container hidden ",
    },
    paletteDropdown,
    paletteOverlay
  );
}

export default PaletteDropdownContainer;
