function changeColor(body: string, band: string) {
  document.documentElement.style.setProperty("--theme-body-color", body);
  document.documentElement.style.setProperty("--theme-band-color", band);
}

export default changeColor;
