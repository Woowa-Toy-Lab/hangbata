import { createElement } from "../../../../utils/document";
import getCssVarColor from "../../../../utils/getCssVarColor";
import loadPaletteSvg from "../../../../utils/loadSingleColorSvg";

function ColorPalette(id: string, name: string) {
  const paletteIcon = createElement("label", {
    class: "palette-icon",
    for: `${id}PaletteIcon`,
  });
  let paletteColor = getCssVarColor(`--theme-${id}-color`);
  if (paletteColor === "rgba(0, 0, 0, 0)") paletteColor = "#000";
  loadPaletteSvg("palette", paletteColor).then((text) => {
    paletteIcon.innerHTML = text;
  });

  const inputColorPalette = createElement("input", {
    type: "color",
    id: `${id}PaletteIcon`,
    class: "input-palette-icon",
    name: id,
  });

  const inputLabel = createElement("label", {
    for: `${id}PaletteIcon`,
  });
  inputLabel.innerHTML = name;

  return createElement(
    "div",
    {
      id: `${id}-picker`,
      class: "picker-container",
    },
    paletteIcon,
    inputColorPalette,
    inputLabel
  );
}

export default ColorPalette;
