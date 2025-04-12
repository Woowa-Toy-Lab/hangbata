import getCssVarColor from "./getCssVarColor";

function loadColoredSvg(svgName: string, isCanvas: boolean) {
  let borderColor = "#fff";
  let themeBodyColor = "rgba(0,0,0,0)";
  let themeBandColor = "rgba(0,0,0,0)";
  let themeItemColor = "rgba(0,0,0,0)";

  if (isCanvas) {
    borderColor = "#000";
    themeBodyColor = getCssVarColor("--theme-body-color");
    themeBandColor = getCssVarColor("--theme-band-color");
    themeItemColor = getCssVarColor("--theme-item-color");
  }

  const svgString = fetch(`img/${svgName}.svg`)
    .then((res) => res.text())
    .then((res) =>
      res
        .replace(/__FILL0__/g, borderColor)
        .replace(/__FILL1__/g, themeBodyColor)
        .replace(/__FILL2__/g, themeBandColor)
        .replace(/__FILL3__/g, themeItemColor)
    );

  return svgString;
}

export default loadColoredSvg;
