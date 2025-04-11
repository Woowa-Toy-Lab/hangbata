import { createElement, getElement } from "../../utils/document";
import AvataList, { Tkey } from "./AvataList/AvataList";
import AvataTabBar from "./AvataTabBar/AvataTabBar";

function AvataContainer(targetId: string) {
  // 다음 리스트 페이지를 불러오는 기능
  // 리스트가 렌더링이 돼야함
  const target = getElement(targetId);
  const avataList = AvataList();
  const avataListElements = {
    몸통: avataList.template("몸통"),
    표정: avataList.template("표정"),
    소품: avataList.template("소품"),
    배경: avataList.template("배경"),
  };

  function replaceAvataList(key: Tkey) {
    const prevList = getElement("#avataListContainer");
    const nextList = avataListElements[key];
    if (prevList && nextList) {
      prevList.replaceWith(nextList);
    }
  }

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

    const avataListContainer = createElement(
      "div",
      {
        class: "avata-list-container",
      },
      prevArrow,
      nextArrow,
      avataListElements["몸통"]
    );

    const avataContainer = createElement("div", { class: "avata-container" });

    const avataTabBar = AvataTabBar(replaceAvataList);
    avataContainer.append(avataTabBar.template(), avataListContainer);

    target?.append(avataContainer);
  }

  render();
}

export default AvataContainer;
