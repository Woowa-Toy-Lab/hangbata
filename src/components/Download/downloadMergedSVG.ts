function downloadMergedSVG({
  selector = ".canvas-item svg",
  outputFileName = "merged-canvas.svg",
  svgWidth = 440,
  svgHeight = 240,
} = {}) {
  const svgElements = document.querySelectorAll(selector);

  if (!svgElements.length) {
    alert("다운로드 가능한 SVG 파일이 없습니다.\n파일을 선택해주세요");
    return;
  }

  const viewBox = `0 0 ${svgWidth} ${svgHeight}`;
  let mergedSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="${viewBox}">`;

  svgElements.forEach((svg) => {
    const cloned = svg.cloneNode(true);
    const parent = svg.parentElement;

    const left = parseFloat(parent.style.left || "0");
    const top = parseFloat(parent.style.top || "0");

    const serializer = new XMLSerializer();
    const inner = serializer.serializeToString(cloned);

    mergedSvgContent += `<g transform="translate(${left}, ${top})">${inner}</g>`;
  });

  mergedSvgContent += `</svg>`;

  const blob = new Blob([mergedSvgContent], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = outputFileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default downloadMergedSVG;
