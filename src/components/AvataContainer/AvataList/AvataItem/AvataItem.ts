import { createElement } from "../../../../utils/document";
import loadColoredSvg from "../../../../utils/loadColoredSvg";

function AvataItem(svgName: string) {
  const avataItem = createElement("div", {
    class: "avata-svg-img",
  });

  loadColoredSvg(svgName, false).then((text) => {
    avataItem.innerHTML = text;
  });

  return createElement(
    "div",
    { id: svgName, class: "avata-svg-box" },
    avataItem
  );
}

export default AvataItem;
