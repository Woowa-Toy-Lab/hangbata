import AvataContainer from "./components/AvataContainer/AvataContainer";
import { canvasInstance } from "./components/Canvas/Canvas";
import { createElement, getElement } from "./utils/document";

const app = document.querySelector("#app");
const background = createElement("div", {
  id: "background",
  class: "background",
});

const headerContainer = createElement("div", { class: "header" });

const titleBox = createElement(
  "div",
  { class: "title-box" },
  createElement("div", { class: "tx-xxl" }, "행바타"),
  createElement("div", { class: "tx-md" }, "나만의 행성이 만들기")
);

const logoBox = createElement(
  "div",
  { class: "logo-box" },
  createElement("img", {
    src: "/img/logo-alpha.svg",
    alt: "hangbata logo image",
  })
);

const logoContainer = createElement(
  "div",
  { class: "logo-container" },
  logoBox,
  titleBox
);

headerContainer.append(logoContainer);
const header = getElement("header");
if (header) {
  header.appendChild(background);
  header.appendChild(headerContainer);
}

const canvas = canvasInstance();
const avataContainer = AvataContainer("#avataLayout");
