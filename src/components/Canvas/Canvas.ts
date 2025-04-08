import { createElement, getElement } from "../../utils/document";

function Canvas(targetId: string) {
  const target = getElement(targetId);

  function render() {
    const canvas = createElement("div", { class: "canvas" });
    target?.appendChild(canvas);
  }
  render();
}

export default Canvas;
