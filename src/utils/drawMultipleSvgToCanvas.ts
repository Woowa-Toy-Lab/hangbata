export async function drawMultipleSvgToCanvas(svgStrings: string[]) {
  const canvas = document.getElementById("avatarCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  // 캔버스 크기
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
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
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(dpr, dpr);

  for (const svgString of svgStrings) {
    const svgWithColor = svgString
      .replace(/__FILL1__/g, themeBodyColor)
      .replace(/__FILL2__/g, themeBandColor);
    const blob = new Blob([svgWithColor], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        // 우리가 통일한 svg viewBox 크기
        const sourceWidth = 500;
        const sourceHeight = 500;

        const scale = Math.min(width / sourceWidth, height / sourceHeight);
        const drawWidth = sourceWidth * scale;
        const drawHeight = sourceHeight * scale;

        const dx = (width - drawWidth) / 2;
        const dy = (height - drawHeight) / 2;

        ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
        URL.revokeObjectURL(url);
        resolve();
      };

      img.src = url;
    });
  }
}
const svgString1 = await fetch("img/body1.svg").then((res) => res.text());
const svgString2 = await fetch("img/body2.svg").then((res) => res.text());
const svgString3 = await fetch("img/body3.svg").then((res) => res.text());
drawMultipleSvgToCanvas([svgString1, svgString2, svgString3]);
