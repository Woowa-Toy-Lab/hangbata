import AvataContainer from "./components/AvataContainer/AvataContainer";
import Canvas from "./components/Canvas/Canvas";
import { createElement, getElement } from "./utils/document";

console.log("npm run dev 명령어를 통해 행바타 서버를 실행하세요.");

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

const canvas = Canvas("#canvasLayout");
const avataContainer = AvataContainer("#avataLayout");
