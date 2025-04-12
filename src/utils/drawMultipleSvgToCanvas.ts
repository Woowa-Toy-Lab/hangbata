async function drawMultipleSvgToCanvas(svgStrings: string[]) {
  const canvas = document.getElementById("avatarCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 색상 가져오기
  const themeBodyColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--theme-body-color")
    .trim();
  const themeBandColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--theme-band-color")
    .trim();

  // 캔버스 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const svgString of svgStrings) {
    const svgWithColor = svgString
      .replace(/__FILL0__/g, "#000")
      .replace(/__FILL1__/g, themeBodyColor)
      .replace(/__FILL2__/g, themeBandColor);

    const blob = new Blob([svgWithColor], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0); // 💡 여기서 덧그리기
        URL.revokeObjectURL(url);
        resolve();
      };
      img.src = url;
    });
  }
}

export default drawMultipleSvgToCanvas;
