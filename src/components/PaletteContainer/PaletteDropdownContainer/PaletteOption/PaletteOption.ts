import { createElement } from "../../../../utils/document";
import getCssVarColor from "../../../../utils/getCssVarColor";
import loadPaletteSvg from "../../../../utils/loadPaletteSvg";

function PaletteOption(id: string, name: string) {
  const paletteIcon = createElement("label", {
    class: "palette-icon",
    for: `${id}ColorPalette`,
  });
  let paletteColor = getCssVarColor(`--theme-${id}-color`);
  if (paletteColor === "rgba(0, 0, 0, 0)") paletteColor = "#000";
  loadPaletteSvg(paletteColor).then((text) => {
    paletteIcon.innerHTML = text;
  });

  const inputColorPalette = createElement("input", {
    type: "color",
    id: `${id}ColorPalette`,
    class: "input-color-palette",
    name: id,
  });

  const inputLabel = createElement("label", {
    for: `${id}ColorPalette`,
  });
  inputLabel.innerHTML = name;

  return createElement(
    "div",
    {
      id: `${id}-palette`,
      class: "palette-option",
    },
    paletteIcon,
    inputColorPalette,
    inputLabel
  );
}

export default PaletteOption;
