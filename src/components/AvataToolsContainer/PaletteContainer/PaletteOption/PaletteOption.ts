import { createElement } from "../../../../utils/document";
import getCssVarColor from "../../../../utils/getCssVarColor";
import loadSingleColorSvg from "../../../../utils/loadSingleColorSvg";
import ColorPalette from "./ColorPalette";

function PaletteOption(id: string, name: string) {
  const paletteIcon = createElement("label", {
    class: "palette-icon",
    for: `${id}ColorPalette`,
  });
  let paletteColor = getCssVarColor(`--theme-${id}-color`);
  if (paletteColor === "rgba(0, 0, 0, 0)") paletteColor = "#000";
  loadSingleColorSvg("palette", paletteColor).then((text) => {
    paletteIcon.innerHTML = text;
  });

  const inputColorPalette = ColorPalette(id);

  const inputLabel = createElement("label", {
    for: `${id}ColorPalette`,
  });
  inputLabel.innerHTML = name;

  const paletteOption = createElement(
    "div",
    {
      id: `${id}-palette`,
      class: "palette-option",
    },
    paletteIcon,
    inputColorPalette,
    inputLabel
  );

  return paletteOption;
}

export default PaletteOption;
