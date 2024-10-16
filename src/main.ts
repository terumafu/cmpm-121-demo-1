import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let laughCount: number = 0;
let prevTime: number = 0;
let increments: number = 0;

interface Item {
  name: string;
  cost: number;
  button: HTMLButtonElement;
  output: number;
  count: number;
  counttext: HTMLDivElement;
}

function buyItem(item: Item) {
  if (laughCount >= item.cost) {
    increments += item.output;
    laughCount -= item.cost;
    item.count++;
    item.counttext.innerHTML = item.count + " " + item.name;
    item.cost *= 1.15;
    item.button.innerHTML = item.name + " Costs " + item.cost.toFixed(1);
  }
}
function buttonInit(item: Item) {
  item.button.innerHTML = item.name + " Costs " + item.cost.toFixed(1);
  item.button.disabled = true;
  item.button.addEventListener("click", () => buyItem(item));

  item.counttext.innerHTML = item.count + " " + item.name;

  app.append(item.button);
  app.append(item.counttext);
}
const availableItems: Item[] = [
  {
    name: "Newspaper Funnies",
    cost: 10,
    button: document.createElement("button"),
    output: 1,
    count: 0,
    counttext: document.createElement("div"),
  },
  {
    name: "Street Mimes",
    cost: 100,
    button: document.createElement("button"),
    output: 2,
    count: 0,
    counttext: document.createElement("div"),
  },
  {
    name: "Comedians",
    cost: 1000,
    button: document.createElement("button"),
    output: 50,
    count: 0,
    counttext: document.createElement("div"),
  },

]

const gameName = "Laugh Generator";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const count = document.createElement("div");
count.innerHTML = laughCount + " Laughs";

const incrementRate = document.createElement("div");
incrementRate.innerHTML = increments + "/sec";

const firstbutton = document.createElement("button");
const buttonsprite = document.createElement("img");
buttonsprite.src = "src/assets/laughemoji.webp";
buttonsprite.width = 100;
app.append(header);
app.append(firstbutton);
app.append(count);
app.append(incrementRate);
firstbutton.append(buttonsprite);
firstbutton.addEventListener("click", incrementNum);

for (let i = 0; i < availableItems.length; i++){
  buttonInit(availableItems[i]);
};

function incrementNum() {
  laughCount++;
  count.innerHTML = laughCount + " Laughs";
};

function animate(): void {
  //every frame calls this
  const timepassed = (performance.now() - prevTime) / 1000.0;

  laughCount += increments * timepassed;
  prevTime = performance.now();
  count.innerHTML = laughCount.toFixed(1) + " Laughs";
  incrementRate.innerHTML = increments + "/sec";
  requestAnimationFrame(animate);
  checkdisabled(availableItems);
}

requestAnimationFrame(animate);

function checkdisabled(items: Item[]) {
  for (let i = 0; i < items.length; i++){
    if (items[i].button.disabled == true && laughCount >= items[i].cost) {
      items[i].button.disabled = false;
    }
  }
  
}
