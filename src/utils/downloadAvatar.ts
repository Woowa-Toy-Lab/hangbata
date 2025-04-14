async function fetchImageAsBase64(url: string): Promise<string> {
  const res = await fetch(url, { mode: "cors" });
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

export async function downloadAvatar(format: string) {
  const canvasEl = document.querySelector(".canvas") as HTMLElement;
  const backgroundUrl = getComputedStyle(canvasEl).backgroundImage;
  const extractedUrl = backgroundUrl.match(/url\(["']?(.+?)["']?\)/)?.[1] || "";
  const fullUrl = extractedUrl.includes("canvas") ? "" : extractedUrl;

  let backgroundBase64 = "";
  if (fullUrl) {
    try {
      backgroundBase64 = await fetchImageAsBase64(fullUrl);
    } catch (err) {
      console.warn("⚠️ 배경 이미지 base64 변환 실패", err);
    }
  }

  const svgList = Array.from(
    canvasEl.querySelectorAll(".canvas-item:not(.hidden) > svg")
  );

  const canvasRect = canvasEl.getBoundingClientRect();
  const targetWidth = 1920;
  const scale = targetWidth / canvasRect.width;
  const targetHeight = canvasRect.height * scale;

  const combinedSvgInner = svgList
    .map((svg) => {
      const wrapper = svg.closest(".canvas-item") as HTMLElement;
      const rect = wrapper.getBoundingClientRect();
      const offsetX = rect.left - canvasRect.left;
      const offsetY = rect.top - canvasRect.top;
      const width = rect.width;
      const height = rect.height;

      const clonedSvg = svg.cloneNode(true) as SVGElement;
      clonedSvg.setAttribute("width", width.toString());
      clonedSvg.setAttribute("height", height.toString());

      return `
          <g transform="translate(${offsetX}, ${offsetY})">
            ${new XMLSerializer().serializeToString(clonedSvg)}
          </g>
        `;
    })
    .join("\n");

  const backgroundImageElement = backgroundBase64
    ? `<image href="${backgroundBase64}" x="0" y="0" width="${canvasRect.width}" height="${canvasRect.height}" preserveAspectRatio="none"/>`
    : "";

  const finalSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${targetWidth}" height="${targetHeight}" viewBox="0 0 ${canvasRect.width} ${canvasRect.height}">
        ${backgroundImageElement}
        ${combinedSvgInner}
      </svg>
    `.trim();

  if (format === "svg") {
    const blob = new Blob([finalSvg], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "out.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else if (format === "png") {
    const svgBlob = new Blob([finalSvg], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "나만의 행성이.png";
      link.click();

      URL.revokeObjectURL(url);
    };
    img.src = url;
  }
}
