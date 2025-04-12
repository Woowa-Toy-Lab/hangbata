function loadPaletteSvg(color: string) {
  return fetch(`img/palette.svg`)
    .then((res) => res.text())
    .then((res) => res.replace(/__FILL__/g, color));
}

export default loadPaletteSvg;
