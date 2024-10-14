import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let laughCount: number = 0;

const gameName = "My amazing cookies";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const div = document.createElement("div");
div.innerHTML = laughCount + " Laughs";

const button = document.createElement("button");
button.innerHTML = "😆";

app.append(header);
app.append(button);
app.append(div)
button.addEventListener("click", () => {
  console.log("button clicked");
  laughCount++;
  div.innerHTML = laughCount + " Laughs";
});


