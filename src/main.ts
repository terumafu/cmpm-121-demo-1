import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let laughCount: number = 0;
let prevTime: number = 0;
let increments: number = 0;

class Item {
  name: string;
  cost: number;
  button: HTMLButtonElement;
  output: number;
  count: number;
  counttext: HTMLDivElement;
  description: string;
  constructor(name : string, cost : number, button : HTMLButtonElement, output : number, count : number, counttext : HTMLDivElement, description : string){
    this.name = name;
    this.cost = cost;
    this.button = button;
    this.output = output;
    this.count = count;
    this.counttext = counttext;
    this.description = description;
  }
  checkdisabled(){
    if (this.button.disabled == true && laughCount >= this.cost) {
      this.button.disabled = false;
    }
  }
}

function buyItem(item: Item) {
  if (laughCount >= item.cost) {
    increments += item.output;
    laughCount -= item.cost;
    item.count++;
    item.counttext.innerHTML =
      item.count + " " + item.name + " : " + item.description;
    item.cost *= 1.15;
    item.button.innerHTML = item.name + " Costs " + item.cost.toFixed(1);
  }
}
function buttonInit(item: Item) {
  item.button.innerHTML = item.name + " Costs " + item.cost.toFixed(1);
  item.button.disabled = true;
  item.button.addEventListener("click", () => buyItem(item));

  item.counttext.innerHTML =
    item.count + " " + item.name + " : " + item.description;

  app.append(item.button);
  app.append(item.counttext);
}
const availableItems: Item[] = [
   new Item(
     "Newspaper Funnies", 
      10, 
      document.createElement("button"), 
      1, 
      0, 
      document.createElement("div"), 
      "Your sunday comic strips"
    ),
   new Item(
    "Street Mimes", 
     100, 
     document.createElement("button"), 
     2, 
     0, 
     document.createElement("div"), 
     "They're always stuck in a box"
    ),
    new Item(
      "Clowns", 
       1000, 
       document.createElement("button"), 
       50, 
       0, 
       document.createElement("div"), 
       "The last person to invite to the party"
    ),
    new Item(
      "Youtubers", 
       10000, 
       document.createElement("button"), 
       100, 
       0, 
       document.createElement("div"), 
       "Your screentime consumes your day"
    ),
    new Item(
      "Comedians", 
       100000, 
       document.createElement("button"), 
       1000, 
       0, 
       document.createElement("div"), 
       "The tickets cost a fortune"
    ),
];

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

for (let i = 0; i < availableItems.length; i++) {
  buttonInit(availableItems[i]);
}

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
  availableItems.forEach((item) => item.checkdisabled());
}

requestAnimationFrame(animate);


