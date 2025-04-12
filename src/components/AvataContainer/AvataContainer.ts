import { createElement, getElement } from "../../utils/document";
import AvataList, { Tkey } from "./AvataList/AvataList";
import AvataTabBar from "./AvataTabBar/AvataTabBar";

function AvataContainer(targetId: string) {
  const target = getElement(targetId);
  const avataList = AvataList();
  const avataListElements = {
    몸통: avataList.template("몸통"),
    눈1: avataList.template("눈1"),
    눈2: avataList.template("눈2"),
    입: avataList.template("입"),
    소품: avataList.template("소품"),
    배경: avataList.template("배경"),
    특수효과: avataList.template("특수효과"),
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
