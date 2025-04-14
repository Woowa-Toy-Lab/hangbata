import { createElement, getElement } from "../../../utils/document";
import loadSingleColorSvg from "../../../utils/loadSingleColorSvg";
import DropdownContainer from "../../DropdownContainer/DropdownContainer";
import DownloadOption from "./DownloadOption/DownloadOption";

function DownloadContainer() {
  const download = createElement("div", {
    class: "download-icon",
  });
  loadSingleColorSvg("download", "#fff").then((text) => {
    download.innerHTML = text;
  });
  download.addEventListener("click", () => {
    getElement("#downloadDropdownContainer")?.classList.toggle("hidden");
  });

  const downloadContainer = createElement(
    "div",
    {
      id: "downloadContainer",
      class: "download-container",
    },
    download,
    DropdownContainer("downloadDropdownContainer", [
      DownloadOption("png"),
      DownloadOption("svg"),
    ])
  );

  return downloadContainer;
}

export default DownloadContainer;
