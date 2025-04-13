import { createElement } from "../../../../utils/document";
import loadThemedSvg from "../../../../utils/loadThemedSvg";

function AvataItem(svgName: string) {
  const avataItem = createElement("div", {
    class: "avata-svg-img",
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

export default AvataItem;
