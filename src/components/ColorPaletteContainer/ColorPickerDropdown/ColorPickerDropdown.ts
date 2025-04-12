import { createElement, getElement } from "../../../utils/document";
import loadPaletteSvg from "../../../utils/loadPaletteSvg";

function ColorPickerDropdown(targetId: string) {
  const target = getElement(targetId);

  function render() {
    const dropDownContainer = createElement("div", {
      id: "dropDownContainer",
      class: "drop-down-container",
    });

    const colorPicker = (id: string, name: string) => {
      const colorIcon = createElement("div", {
        id: "pickerPaletteIcon",
        class: "picker-palette-icon",
      });

      let paletterColor = getComputedStyle(document.documentElement)
        .getPropertyValue(`--theme-${id}-color`)
        .trim();

      if (paletterColor === "rgba(0, 0, 0, 0)") {
        paletterColor = "#000";
      }

      loadPaletteSvg(paletterColor).then((text) => {
        colorIcon.innerHTML = text;
      });

      const inputIcon = createElement("input", {
        type: "color",
        id: `${id}PickerIcon`,
        class: "picker-icon",
        name: id,
      });

      const inputLabel = createElement("label", {
        for: `${id}PickerIcon`,
      });
      inputLabel.innerHTML = name;

      const pickerContainer = createElement(
        "div",
        {
          id: "pickerContainer",
          class: "picker-container",
        },
        colorIcon,
        inputIcon,
        inputLabel
      );

      return pickerContainer;
    };

    dropDownContainer.append(
      colorPicker("body", "행성"),
      colorPicker("band", "행성 띠")
    );

    target?.append(dropDownContainer);
  }
  render();
}

export default ColorPickerDropdown;
