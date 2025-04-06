import { createElement } from "./utils/document";

console.log("npm run dev 명령어를 통해 행바타 서버를 실행하세요.");

const app = document.querySelector("#app");
const background = createElement("div", {
  id: "background",
  class: "background",
});

const headerContainer = createElement("div", {
  id: "header-container",
  class: "header",
});

const headerTitle = createElement(
  "div",
  {
    id: "header-title",
    class: "tx-xxl",
  },
  "행바타"
);

const headerSubtitle = createElement(
  "div",
  {
    id: "header-subtitle",
    class: "tx-md",
  },
  "나만의 행성이 만들기"
);

headerContainer.append(headerTitle, headerSubtitle);

if (app) {
  app.appendChild(background);
  app.appendChild(headerContainer);
}
