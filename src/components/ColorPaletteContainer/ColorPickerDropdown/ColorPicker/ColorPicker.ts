import { createElement } from "../../../../utils/document";
import getCssVarColor from "../../../../utils/getCssVarColor";
import loadPaletteSvg from "../../../../utils/loadPaletteSvg";

function ColorPicker(id: string, name: string) {
  const paletteIcon = createElement("label", {
    id: "pickerPaletteIcon",
    class: "picker-palette-icon",
    for: `${id}PickerIcon`,
  });
  let paletterColor = getCssVarColor(`--theme-${id}-color`);
  if (paletterColor === "rgba(0, 0, 0, 0)") paletterColor = "#000";
  loadPaletteSvg(paletterColor).then((text) => {
    paletteIcon.innerHTML = text;
  });

  const htmlColorPicker = createElement("input", {
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
      id: `${id}-picker`,
      class: "picker-container",
    },
    paletteIcon,
    htmlColorPicker,
    inputLabel
  );

  return pickerContainer;
}

export default ColorPicker;
