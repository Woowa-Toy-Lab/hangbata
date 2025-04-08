import { createElement, getElement } from "../../utils/document";
import AvataList from "./AvataList/AvataList";

function AvataContainer(targetId: string) {
  // 다음 리스트 페이지를 불러오는 기능
  // 리스트가 렌더링이 돼야함
  const target = getElement(targetId);

  function render() {
    const prevArrow = createElement("img", {
      id: "prevArrow",
      class: "arrow-icon",
      src: "/img/prev-arrow.svg",
      alt: "prev arrow",
    });

    const nextArrow = createElement("img", {
      id: "nextArrow",
      class: "arrow-icon",
      src: "/img/next-arrow.svg",
      alt: "next arrow",
    });

    const avataContainer = createElement(
      "div",
      {
        class: "avata-container",
      },
      prevArrow,
      nextArrow,
      AvataList("몸통")
    );

    target?.append(avataContainer);
  }

  render();
}

export default AvataContainer;
