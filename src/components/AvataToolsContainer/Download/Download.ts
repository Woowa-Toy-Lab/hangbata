import { createElement, getElement } from "../../../utils/document";
import loadSingleColorSvg from "../../../utils/loadSingleColorSvg";

function Download() {
  const download = createElement("div", {
    class: "download-icon",
  });
  loadSingleColorSvg("download", "#fff").then((text) => {
    download.innerHTML = text;
  });
  download.addEventListener("click", () => {
    console.log();
  });

  return download;
}

export default Download;
