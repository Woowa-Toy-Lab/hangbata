import { createElement, getElement } from "../../../utils/document";
import ColorPicker from "./ColorPicker/ColorPicker";

function ColorPickerDropdown(targetId: string) {
  const target = getElement(targetId);

  function changeColor(name: string, color: string) {
    document.documentElement.style.setProperty(`--theme-${name}-color`, color);
  }

  function render() {
    const dropDownContainer = createElement("div", {
      id: "dropDownContainer",
      class: "drop-down-container",
    });

    dropDownContainer.append(
      ColorPicker("body", "행성"),
      ColorPicker("band", "행성 띠")
    );

    dropDownContainer.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      const targetColor = target.value;

      const targetId = target.closest(".picker-container")!.id;
      const changeTarget = targetId.match(/^(.+?)-picker$/)?.[1] ?? "";
      changeColor(changeTarget, targetColor);

      const el = getElement("#canvasBody svg")!.id;
      const svg = document.querySelector(`.canvas #${el}`);
      const bodySVG = svg?.querySelector(`#${changeTarget}`);
      const paths = bodySVG?.querySelectorAll("path");

      paths?.forEach((path) => {
        path.setAttribute("fill", targetColor);
      });
    });

    target?.append(dropDownContainer);
  }
  render();
}

export default ColorPickerDropdown;
