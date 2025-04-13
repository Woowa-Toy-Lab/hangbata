import { createElement, getElement } from "../../utils/document";
import loadSingleColorSvg from "../../utils/loadSingleColorSvg";
import downloadMergedSVG from "./downloadMergedSVG";

function DownloadContainer(targetId: string) {
  const target = getElement(targetId);

  function render() {
    const download = createElement("div", {
      class: "download-icon",
    });
    loadSingleColorSvg("download", "#fff").then((text) => {
      download.innerHTML = text;
    });
    download.addEventListener("click", () => {
      downloadMergedSVG();
    });

    const downloadContainer = createElement(
      "div",
      {
        class: "download-container",
      },
      download
    );

    target?.append(downloadContainer);
  }
  render();
}

export default DownloadContainer;
