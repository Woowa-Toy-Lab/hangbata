import { createElement, getElement } from "../../../utils/document";
import ColorPicker from "./ColorPicker/ColorPicker";

function ColorPickerDropdown(targetId: string) {
  const target = getElement(targetId);

  function changeColor(name: string, color: string) {
    document.documentElement.style.setProperty(`--theme-${name}-color`, color);
  }

  function render() {
    const dropDown = createElement(
      "div",
      {
        id: "dropDown",
        class: "drop-down",
      },
      ColorPicker("body", "행성"),
      ColorPicker("band", "행성 띠")
    );

    dropDown.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      const targetColor = target.value;

      const targetId = target.closest(".picker-container")!.id;
      const changeTarget = targetId.match(/^(.+?)-picker$/)?.[1] ?? "";
      changeColor(changeTarget, targetColor);

      const el = getElement("#canvasBody svg")!.id;
      const bodyElement = document.querySelector(`.canvas #${el}`);
      const paletteElement = document.querySelector(
        `#dropDown #${changeTarget}-picker #palette`
      );

      const bodySVG = bodyElement?.querySelector(`#${changeTarget}`);
      const paletteSVG = paletteElement?.querySelector(`#stroke`);

      const bodyPaths = bodySVG?.querySelectorAll("path");
      const palettePaths = paletteSVG?.querySelectorAll("path");

      bodyPaths?.forEach((path) => {
        path.setAttribute("fill", targetColor);
      });

      palettePaths?.forEach((path) => {
        path.setAttribute("fill", targetColor);
      });
    });

    const dropDownBackground = createElement("div", {
      id: "dropDownBackground",
      class: "drop-down-background",
    });

    dropDownBackground.addEventListener("click", () => {
      getElement("#dropDownContainer")?.classList.toggle("hidden");
    });

    const dropDownContainer = createElement(
      "div",
      {
        id: "dropDownContainer",
        class: "drop-down-container hidden ",
      },
      dropDown,
      dropDownBackground
    );

    target?.append(dropDownContainer);
  }
  render();
}

export default ColorPickerDropdown;
