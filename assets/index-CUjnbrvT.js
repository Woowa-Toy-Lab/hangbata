(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function toElement(template, tag) {
  const container = document.createElement("div");
  container.innerHTML = template;
  const el = container.firstElementChild;
  if (!el) {
    throw new Error("toElement 유틸 에러: element가 없습니다.");
  }
  return el;
}
function createElement(tag, args, ...children) {
  const attribute = Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(" ");
  const template = `<${tag} ${attribute}></${tag}>`;
  const element = toElement(template);
  children.forEach((child) => {
    if (typeof child === "string") element.textContent = child;
    else element.appendChild(child);
  });
  return element;
}
function getElement(target) {
  return document.querySelector(target);
}
function getCssVarColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
function loadThemedSvg(svgName, isCanvas) {
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
  const svgString = fetch(`img/${svgName}.svg`).then((res) => res.text()).then(
    (res) => res.replace(/__FILL0__/g, borderColor).replace(/__FILL1__/g, themeBodyColor).replace(/__FILL2__/g, themeBandColor).replace(/__FILL3__/g, themeItemColor)
  );
  return svgString;
}
let instance = null;
function Canvas(targetId) {
  const target = getElement(targetId);
  const canvas = createElement("div", { class: "canvas" });
  const bodyLayer = createElement("div", {
    id: "canvasBody",
    class: "canvas-item body hidden"
  });
  const eye1Layer = createElement("div", {
    id: "canvasEye1",
    class: "canvas-item face hidden"
  });
  const eye2Layer = createElement("div", {
    id: "canvasEye2",
    class: "canvas-item face hidden"
  });
  const mouthLayer = createElement("div", {
    id: "canvasMouth",
    class: "canvas-item face hidden"
  });
  const itemLayer = createElement("div", {
    id: "canvasItem",
    class: "canvas-item effect hidden"
  });
  const effectLayer = createElement("div", {
    id: "canvasEffect",
    class: "canvas-item effect hidden"
  });
  canvas.append(
    bodyLayer,
    itemLayer,
    effectLayer,
    eye1Layer,
    eye2Layer,
    mouthLayer
  );
  target == null ? void 0 : target.appendChild(canvas);
  let state = {
    몸통: { svgName: "", element: bodyLayer },
    눈1: { svgName: "", element: eye1Layer },
    눈2: { svgName: "", element: eye2Layer },
    입: { svgName: "", element: mouthLayer },
    소품: { svgName: "", element: itemLayer },
    특수효과: { svgName: "", element: effectLayer },
    배경: { svgName: "", element: canvas }
  };
  Object.values(state).forEach(({ element }) => {
    if (element !== canvas) onDragHandler(element);
  });
  let selectedElement = null;
  function selectElement(el) {
    clearSelection();
    selectedElement = el;
    selectedElement.classList.add("selected");
  }
  function clearSelection() {
    if (selectedElement) {
      selectedElement.classList.remove("selected");
      selectedElement = null;
    }
  }
  function onDragHandler(el) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    el.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      isDragging = true;
      selectElement(el);
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
    });
    el.addEventListener("mousemove", (e) => {
      if (!isDragging || selectedElement !== el) return;
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });
    el.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }
  canvas.addEventListener("click", (e) => {
    var _a;
    if (!((_a = e.target) == null ? void 0 : _a.closest(".canvas-item"))) {
      clearSelection();
    }
  });
  async function setCanvasImage(key, svgName) {
    if (key === "배경") {
      const item2 = state["배경"];
      item2.svgName = svgName;
      item2.element.style.backgroundImage = `url(/img/${svgName}.svg)`;
      return;
    }
    const item = state[key];
    item.svgName = svgName;
    item.element.innerHTML = await loadThemedSvg(svgName, true);
    item.element.classList.remove("hidden");
  }
  function removeCanvasImage() {
    if (!selectedElement) {
      const item = state["배경"];
      item.svgName = "";
      item.element.style.removeProperty("background-image");
      return;
    }
    selectedElement == null ? void 0 : selectedElement.classList.add("hidden");
  }
  return {
    setCanvasImage,
    removeCanvasImage,
    getCurrentSelectedElement: () => selectedElement
  };
}
function canvasInstance() {
  if (!instance) instance = Canvas("#canvasLayout");
  return instance;
}
function AvataItem(svgName) {
  const avataItem = createElement("div", {
    class: "avata-svg-img"
  });
  loadThemedSvg(svgName, false).then((text) => {
    avataItem.innerHTML = text;
  });
  return createElement(
    "div",
    { id: svgName, class: "avata-svg-box" },
    avataItem
  );
}
const avataListData = {
  몸통: ["body1", "body2", "body3", "body4"],
  눈1: ["eye70", "stareye70", "bangbangeye70", "hearteye70"],
  눈2: ["eye70", "stareye70", "bangbangeye70", "hearteye70"],
  입: ["mouth1", "mouth2", "mouth3", "mouth4"],
  소품: ["barbell", "coffee", "labtop", "magicwand"],
  특수효과: ["effect1", "effect2", "effect3", "effect4"],
  배경: ["background1", "background2", "background3", "background4"]
};
function AvataList() {
  function onClickHandler(key) {
    let prevSelectedElement = null;
    return function setCanvasState(e) {
      const selectedElement = e.target.closest(".avata-svg-box");
      const canvas = canvasInstance();
      selectedElement && canvas.setCanvasImage(key, selectedElement.id);
      prevSelectedElement == null ? void 0 : prevSelectedElement.classList.remove("selected");
      selectedElement == null ? void 0 : selectedElement.classList.add("selected");
      prevSelectedElement = selectedElement;
    };
  }
  function template(key) {
    const avataList = avataListData[key].map((svgName) => AvataItem(svgName));
    const avataListContainer = createElement(
      "div",
      { id: "avataListContainer", class: "avata-list-box" },
      ...avataList
    );
    const clickHandler = onClickHandler(key);
    avataListContainer.removeEventListener("click", clickHandler);
    avataListContainer.addEventListener("click", clickHandler);
    return avataListContainer;
  }
  return { template };
}
const avataTabList = [
  { name: "몸통", id: "bodyTab" },
  { name: "눈1", id: "eye1Tab" },
  { name: "눈2", id: "eye2Tab" },
  { name: "입", id: "mouthTab" },
  { name: "소품", id: "itemTab" },
  { name: "특수효과", id: "effectTab" },
  { name: "배경", id: "backgroundTab" }
];
function AvataTabBar(onTabChange) {
  let prevSelectedElement = null;
  function setAvataList(e) {
    const selectedElement = e.target.closest(".avata-tab-item");
    const selectedId = selectedElement == null ? void 0 : selectedElement.id;
    const selectedTab = avataTabList.find((tab) => tab.id === selectedId);
    if (!selectedTab) return;
    prevSelectedElement == null ? void 0 : prevSelectedElement.classList.remove("selected");
    selectedElement == null ? void 0 : selectedElement.classList.add("selected");
    prevSelectedElement = selectedElement;
    onTabChange(selectedTab.name);
  }
  function template() {
    const avataTabBar = createElement(
      "div",
      { id: "avataTabBar", class: "avata-tab-bar" },
      ...avataTabList.map(
        (tab, index) => createElement(
          "button",
          {
            class: `avata-tab-item${index === 0 ? " selected" : ""}`,
            id: tab.id
          },
          createElement("span", { class: "avata-tab-name tx-lg" }, tab.name)
        )
      )
    );
    prevSelectedElement = avataTabBar.querySelector(".avata-tab-item");
    avataTabBar.removeEventListener("click", setAvataList);
    avataTabBar.addEventListener("click", setAvataList);
    return avataTabBar;
  }
  return { template };
}
function AvataContainer(targetId) {
  const target = getElement(targetId);
  const avataList = AvataList();
  const avataListElements = {
    몸통: avataList.template("몸통"),
    눈1: avataList.template("눈1"),
    눈2: avataList.template("눈2"),
    입: avataList.template("입"),
    소품: avataList.template("소품"),
    특수효과: avataList.template("특수효과"),
    배경: avataList.template("배경")
  };
  function replaceAvataList(key) {
    const prevList = getElement("#avataListContainer");
    const nextList = avataListElements[key];
    if (prevList && nextList) {
      prevList.replaceWith(nextList);
    }
  }
  function render() {
    const avataListContainer = createElement(
      "div",
      {
        class: "avata-list-container"
      },
      avataListElements["몸통"]
    );
    const avataContainer = createElement("div", {
      id: "avataContainer",
      class: "avata-container"
    });
    const avataTabBar = AvataTabBar(replaceAvataList);
    avataContainer.append(avataTabBar.template(), avataListContainer);
    target == null ? void 0 : target.append(avataContainer);
  }
  render();
}
function loadSingleColorSvg(svgName, color) {
  return fetch(`img/${svgName}.svg`).then((res) => res.text()).then((res) => res.replace(/__FILL__/g, color));
}
function DropdownContainer(id, dropdownOptions) {
  const dropdown = createElement(
    "div",
    {
      class: "dropdown"
    },
    ...dropdownOptions
  );
  const dropdownOverlay = createElement("div", {
    class: "dropdown-overlay"
  });
  dropdownOverlay.addEventListener("click", () => {
    var _a;
    (_a = getElement(`#${id}`)) == null ? void 0 : _a.classList.toggle("hidden");
  });
  const dropdownContainer = createElement(
    "div",
    {
      id,
      class: "drop-down-container hidden "
    },
    dropdown,
    dropdownOverlay
  );
  return dropdownContainer;
}
async function fetchImageAsBase64(url) {
  const res = await fetch(url, { mode: "cors" });
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
async function downloadAvatar(format) {
  var _a;
  const canvasEl = document.querySelector(".canvas");
  const backgroundUrl = getComputedStyle(canvasEl).backgroundImage;
  const extractedUrl = ((_a = backgroundUrl.match(/url\(["']?(.+?)["']?\)/)) == null ? void 0 : _a[1]) || "";
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
  const combinedSvgInner = svgList.map((svg) => {
    const wrapper = svg.closest(".canvas-item");
    const rect = wrapper.getBoundingClientRect();
    const offsetX = rect.left - canvasRect.left;
    const offsetY = rect.top - canvasRect.top;
    const width = rect.width;
    const height = rect.height;
    const clonedSvg = svg.cloneNode(true);
    clonedSvg.setAttribute("width", width.toString());
    clonedSvg.setAttribute("height", height.toString());
    return `
          <g transform="translate(${offsetX}, ${offsetY})">
            ${new XMLSerializer().serializeToString(clonedSvg)}
          </g>
        `;
  }).join("\n");
  const backgroundImageElement = backgroundBase64 ? `<image href="${backgroundBase64}" x="0" y="0" width="${canvasRect.width}" height="${canvasRect.height}" preserveAspectRatio="none"/>` : "";
  const finalSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${targetWidth}" height="${targetHeight}" viewBox="0 0 ${canvasRect.width} ${canvasRect.height}">
        ${backgroundImageElement}
        ${combinedSvgInner}
      </svg>
    `.trim();
  if (format === "svg") {
    const blob = new Blob([finalSvg], {
      type: "image/svg+xml;charset=utf-8"
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
      type: "image/svg+xml;charset=utf-8"
    });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");
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
function DownloadOption(type) {
  const downloadOption = createElement("div", {
    class: "download-option"
  });
  downloadOption.innerHTML = `${type} 다운로드`;
  downloadOption.addEventListener("click", () => {
    downloadAvatar(type);
  });
  return downloadOption;
}
function DownloadContainer() {
  const download = createElement("div", {
    class: "download-icon"
  });
  loadSingleColorSvg("download", "#fff").then((text) => {
    download.innerHTML = text;
  });
  download.addEventListener("click", () => {
    var _a;
    (_a = getElement("#downloadDropdownContainer")) == null ? void 0 : _a.classList.toggle("hidden");
  });
  const downloadContainer = createElement(
    "div",
    {
      id: "downloadContainer",
      class: "download-container"
    },
    download,
    DropdownContainer("downloadDropdownContainer", [
      DownloadOption("png"),
      DownloadOption("svg")
    ])
  );
  return downloadContainer;
}
function fillSVGPath(targetElement, targetColor) {
  const SVG = getElement(targetElement);
  const paths = SVG == null ? void 0 : SVG.querySelectorAll("path");
  paths == null ? void 0 : paths.forEach((path) => {
    path.setAttribute("fill", targetColor);
  });
}
function ColorPalette(id) {
  function getColorAndTarget(event) {
    var _a;
    const target = event.target;
    const targetColor = target.value;
    const targetId = target.closest(".palette-option").id;
    const targetArea = ((_a = targetId.match(/^(.+?)-palette$/)) == null ? void 0 : _a[1]) ?? "";
    return { targetColor, targetArea };
  }
  function changeColor(name, color) {
    document.documentElement.style.setProperty(`--theme-${name}-color`, color);
  }
  const inputColorPalette = createElement("input", {
    type: "color",
    id: `${id}ColorPalette`,
    class: "input-color-palette",
    name: id
  });
  inputColorPalette.addEventListener("input", (event) => {
    var _a;
    if ((_a = getElement("#canvasBody")) == null ? void 0 : _a.classList.contains("hidden")) {
      window.alert("행성이를 먼저 선택한 후 색을 정해주세요");
    }
    const { targetColor, targetArea } = getColorAndTarget(event);
    const el = getElement("#canvasBody svg").id;
    fillSVGPath(`.canvas #${el} #${targetArea}`, targetColor);
    fillSVGPath(
      `.dropdown #${targetArea}-palette #palette #stroke`,
      targetColor
    );
  });
  inputColorPalette.addEventListener("change", (event) => {
    var _a;
    if ((_a = getElement("#canvasBody")) == null ? void 0 : _a.classList.contains("hidden")) return;
    const { targetColor, targetArea } = getColorAndTarget(event);
    changeColor(targetArea, targetColor);
  });
  return inputColorPalette;
}
function PaletteOption(id, name) {
  const paletteIcon = createElement("label", {
    class: "palette-icon",
    for: `${id}ColorPalette`
  });
  let paletteColor = getCssVarColor(`--theme-${id}-color`);
  if (paletteColor === "rgba(0, 0, 0, 0)") paletteColor = "#000";
  loadSingleColorSvg("palette", paletteColor).then((text) => {
    paletteIcon.innerHTML = text;
  });
  const inputColorPalette = ColorPalette(id);
  const inputLabel = createElement("label", {
    for: `${id}ColorPalette`
  });
  inputLabel.innerHTML = name;
  const paletteOption = createElement(
    "div",
    {
      id: `${id}-palette`,
      class: "palette-option"
    },
    paletteIcon,
    inputColorPalette,
    inputLabel
  );
  return paletteOption;
}
function PaletteContainer() {
  const paletteTrigger = createElement("div", {
    class: "palette-trigger"
  });
  loadSingleColorSvg("palette", "#fff").then((text) => {
    paletteTrigger.innerHTML = text;
  });
  paletteTrigger.addEventListener("click", () => {
    var _a;
    (_a = getElement("#paletteDropdownContainer")) == null ? void 0 : _a.classList.toggle("hidden");
  });
  const paletteContainer = createElement(
    "div",
    {
      id: "paletteContainer",
      class: "palette-container"
    },
    paletteTrigger,
    DropdownContainer("paletteDropdownContainer", [
      PaletteOption("body", "행성"),
      PaletteOption("band", "행성 띠")
    ])
  );
  return paletteContainer;
}
function TrashCan() {
  const trashCan = createElement("div", {
    class: "trash-can-icon"
  });
  loadSingleColorSvg("trash-can", "#fff").then((text) => {
    trashCan.innerHTML = text;
  });
  trashCan.addEventListener("click", () => {
    var _a;
    const canvas = canvasInstance();
    canvas.removeCanvasImage();
    if (((_a = canvas.getCurrentSelectedElement()) == null ? void 0 : _a.id) === "canvasBody") {
      const selectedAvataElement = getElement(".avata-svg-box.selected");
      selectedAvataElement == null ? void 0 : selectedAvataElement.classList.remove("selected");
      document.documentElement.style.setProperty(
        `--theme-body-color`,
        "rgba(0, 0, 0, 0)"
      );
      document.documentElement.style.setProperty(
        `--theme-band-color`,
        "rgba(0, 0, 0, 0)"
      );
      fillSVGPath(`.dropdown #body-palette #palette #stroke`, "#000 ");
      fillSVGPath(`.dropdown #band-palette #palette #stroke`, "#000 ");
    }
  });
  return trashCan;
}
function AvataToolsContainer(targetId) {
  const target = getElement(targetId);
  function render() {
    const colorPalette = PaletteContainer();
    const trashCan = TrashCan();
    const download = DownloadContainer();
    const avataToolsContainer = createElement(
      "div",
      {
        id: "avataToolsContainer",
        class: "avata-tools-container"
      },
      colorPalette,
      download,
      trashCan
    );
    target == null ? void 0 : target.append(avataToolsContainer);
  }
  render();
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const dropDown = getElement("#dropdownContainer");
    dropDown == null ? void 0 : dropDown.classList.add("hidden");
  }
});
document.querySelector("#app");
const background = createElement("div", {
  id: "background",
  class: "background"
});
const headerContainer = createElement("div", { class: "header" });
const titleBox = createElement(
  "div",
  { class: "title-box" },
  createElement("div", { class: "tx-xxl" }, "행바타"),
  createElement("div", { class: "tx-md" }, "나만의 행성이 만들기")
);
const logoBox = createElement(
  "div",
  { class: "logo-box" },
  createElement("img", {
    src: "/img/logo-alpha.svg",
    alt: "hangbata logo image"
  })
);
const logoContainer = createElement(
  "div",
  { class: "logo-container" },
  logoBox,
  titleBox
);
headerContainer.append(logoContainer);
const header = getElement("header");
if (header) {
  header.appendChild(background);
  header.appendChild(headerContainer);
}
canvasInstance();
AvataContainer("#avataLayout");
AvataToolsContainer("#avataLayout");
