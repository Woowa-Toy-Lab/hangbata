import { createElement, getElement } from "../../utils/document";

function DownloadContainer(targetId: string) {
  const target = getElement(targetId);

  function render() {
    const download = createElement("div", {
      class: "download-icon",
    });
    download.addEventListener("click", () => {});

    const downloadContainer = createElement("div", {
      id: "downloadContainer",
      class: "download-container",
    });

    target?.append(downloadContainer);
  }
  render();
}

export default DownloadContainer;
