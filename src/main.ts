import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let laughCount: number = 0;
let prevTime :number = 0;
const gameName = "My amazing cookies";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const div = document.createElement("div");
div.innerHTML = laughCount + " Laughs";

const button = document.createElement("button");
button.innerHTML = "😆";

//setInterval(incrementNum, 1000);
//calls incrementNum every second
app.append(header);
app.append(button);
app.append(div);
button.addEventListener("click", incrementNum);

function incrementNum() {
  laughCount++;
  div.innerHTML = laughCount + " Laughs";
}
function animate(): void {
  // Perform animation updates here
  laughCount += (performance.now() - prevTime)/1000.0;
  prevTime = performance.now();
  div.innerHTML = laughCount.toFixed(1) + " Laughs";
  requestAnimationFrame(animate);

}

requestAnimationFrame(animate);