import { createElement, getElement } from "../../../utils/document";
import { Tkey } from "../AvataList/AvataList";

const avataTabList = [
  { name: "몸통", id: "bodyTab" },
  { name: "표정", id: "faceTab" },
  { name: "소품", id: "itemTab" },
  { name: "배경", id: "backgroundTab" },
];

function AvataTabBar(onTabChange: (key: Tkey) => void) {
  // querySelectorAll로 다 classLIist.remove하는게 비효율적인거같아서 만들었어!
  let prevSelectedElement: Element | null = null;

  function setAvataList(e: Event) {
    const selectedElement = (e.target as Element).closest(".avata-tab-item");
    const selectedId = selectedElement?.id;

    const selectedTab = avataTabList.find((tab) => tab.id === selectedId);
    if (!selectedTab) return;

    prevSelectedElement?.classList.remove("selected");

    selectedElement?.classList.add("selected");
    prevSelectedElement = selectedElement;
    onTabChange(selectedTab.name as Tkey);
  }

  function template(): Element {
    const avataTabBar = createElement(
      "div",
      { id: "avataTabBar", class: "avata-tab-bar" },
      ...avataTabList.map((tab, index) =>
        createElement(
          "button",
          {
            class: `avata-tab-item${index === 0 ? " selected" : ""}`,
            id: tab.id,
          },
          createElement("span", { class: "avata-tab-name tx-lg" }, tab.name)
        )
      )
    );
    prevSelectedElement = avataTabBar.querySelector(".avata-tab-item");
    console.log("prevSelectedElement", prevSelectedElement);
    avataTabBar.removeEventListener("click", setAvataList);
    avataTabBar.addEventListener("click", setAvataList);

    return avataTabBar;
  }
  return { template };
}

export default AvataTabBar;
