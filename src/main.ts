import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let laughCount: number = 0;
let prevTime: number = 0;
let increments: number = 0;

interface Item{
  name :string,
  cost : number,
  button : HTMLButtonElement,
  output : number,
  count : number,
  counttext : HTMLDivElement,
}

function buyItem(item : Item){
  if (laughCount >= item.cost){
    increments += item.output;
    laughCount -= item.cost;
    item.count ++;
    item.counttext.innerHTML = item.count + " " + item.name;
  }
}
function buttonInit(item : Item){
  item.button.innerHTML = item.name + " Costs " + item.cost;
  item.button.disabled = true;
  item.button.addEventListener("click", () => buyItem(item));
  
  item.counttext.innerHTML = item.count + " " + item.name;

  app.append(item.button);
  app.append(item.counttext);
}
const gameName = "Laugh Generator";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const count = document.createElement("div");
count.innerHTML = laughCount + " Laughs";

const incrementRate = document.createElement("div");
incrementRate.innerHTML = increments + "/sec";

const firstbutton = document.createElement("button");
firstbutton.innerHTML = "😆";


app.append(header);
app.append(firstbutton);
app.append(count);
app.append(incrementRate);
firstbutton.addEventListener("click", incrementNum);



const newspaperFunnies : Item = {name: "Newspaper Funnies",cost:10, button: document.createElement("button"),output: 1, count: 0, counttext: document.createElement("div")};
buttonInit(newspaperFunnies)

const streetMime : Item = {name: "Street Mimes", cost: 100,button: document.createElement("button"), output: 2, count: 0,counttext: document.createElement("div")};
buttonInit(streetMime);

function incrementNum() {
  laughCount++;
  count.innerHTML = laughCount + " Laughs";
}

function animate(): void {
  //every frame calls this
  const timepassed = (performance.now() - prevTime) / 1000.0;

  laughCount += increments * timepassed;
  prevTime = performance.now();
  count.innerHTML = laughCount.toFixed(1) + " Laughs";
  incrementRate.innerHTML = increments + "/sec";
  requestAnimationFrame(animate);
  checkdisabled(newspaperFunnies);
  checkdisabled(streetMime)
}

requestAnimationFrame(animate);

function checkdisabled(item: Item) {
  if (item.button.disabled == true && laughCount >= item.cost) {
    item.button.disabled = false;
  }
}
