console.log("npm run dev 명령어를 통해 행바타 서버를 실행하세요.");

addEventListener("load", () => {
  const app = document.querySelector("#app");
  const container = document.createElement("div");
  container.textContent = "행바타";

  if (app) {
    app.appendChild(container);
  }
});
