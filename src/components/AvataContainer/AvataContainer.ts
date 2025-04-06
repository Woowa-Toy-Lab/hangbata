import { createElement, getElement } from "../../utils/document";

function AvataContainer() {
  // 다음 리스트 페이지를 불러오는 기능
  // 리스트가 렌더링이 돼야함

  function render(targetId: string) {
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

    const container = createElement(
      "div",
      {
        class: "container",
      },
      "공간 유지를 위한 공간입니다 "
    );

    const avataContainer = createElement(
      "div",
      {
        class: "avata-container",
      },
      prevArrow,
      nextArrow,
      container
    );

    getElement(targetId)?.append(avataContainer);
  }

  return { render };
}

export default AvataContainer;
