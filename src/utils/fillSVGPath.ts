import { getElement } from "./document";

function fillSVGPath(targetElement: string, targetColor: string) {
  const SVG = getElement(targetElement);
  const paths = SVG?.querySelectorAll("path");
  paths?.forEach((path) => {
    path.setAttribute("fill", targetColor);
  });
}

export default fillSVGPath;
