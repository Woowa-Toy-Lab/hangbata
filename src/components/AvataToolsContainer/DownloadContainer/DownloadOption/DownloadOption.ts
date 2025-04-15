import { createElement } from "../../../../utils/document";
import { downloadAvatar } from "../../../../utils/downloadAvatar";

function DownloadOption(type: string) {
  const downloadOption = createElement("div", {
    class: "download-option",
  });
  downloadOption.innerHTML = `${type} 다운로드`;
  downloadOption.addEventListener("click", () => {
    downloadAvatar(type);
  });

  return downloadOption;
}

export default DownloadOption;
