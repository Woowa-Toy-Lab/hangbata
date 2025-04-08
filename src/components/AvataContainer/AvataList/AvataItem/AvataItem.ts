import { createElement } from "../../../../utils/document";

const url = "img/";

function AvataItem(svgName: string) {
  const img = createElement("img", {
    src: `/img/${svgName}.svg`,
    alt: `${svgName} 파일 이미지`,
    class: "avata-svg-img",
  });

  return createElement("div", { id: svgName, class: "avata-svg-box" }, img);
}

export default AvataItem;
