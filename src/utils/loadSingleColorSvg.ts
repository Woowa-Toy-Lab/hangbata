function loadSingleColorSvg(svgName: string, color: string) {
  return fetch(`img/${svgName}.svg`)
    .then((res) => res.text())
    .then((res) => res.replace(/__FILL__/g, color));
}

export default loadSingleColorSvg;
