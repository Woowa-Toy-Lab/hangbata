import { createElement } from "./utils/document";

console.log("npm run dev 명령어를 통해 행바타 서버를 실행하세요.");

const app = document.querySelector("#app");
const background = createElement("div", {
  id: "background",
  class: "background",
});

if (app) {
  if (background) app.appendChild(background);
}
