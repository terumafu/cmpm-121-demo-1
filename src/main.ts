import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing cookies";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const button = document.createElement("button");
button.innerHTML = "😆";
app.append(header);
app.append(button);
button.addEventListener("click", () => {
  console.log("button clicked");
});
