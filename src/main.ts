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
  constructor(name: string, cost: number, output: number, description: string) {
    this.name = name;
    this.cost = cost;
    this.button = document.createElement("button");
    const descriptionText = document.createElement("desc");
    descriptionText.textContent = description;
    descriptionText.style.position = "absolute";
    descriptionText.hidden = true;
    document.body.appendChild(descriptionText);
    //Add Event Listeners --------
    // Hide and Show description based on if its inside the button or not
    this.button.addEventListener("mouseenter", function () {
      descriptionText.hidden = false;
    });
    this.button.addEventListener("mouseleave", function () {
      descriptionText.hidden = true;
    });
    // Track Mouse for Description location only when hovering the button
    this.button.addEventListener("mousemove", function (event) {
      if (!descriptionText.hidden) {
        descriptionText.style.left = event.pageX + 10 + "px";
        descriptionText.style.top = event.pageY + 10 + "px";
      }
    });

    this.output = output;
    this.count = 0;
    this.counttext = document.createElement("div");
  }
  checkdisabled() {
    if (this.button.disabled == true && laughCount >= this.cost) {
      this.button.disabled = false;
    }
  }
}
function returnCostString(name: string, cost: string) {
  return name + " Costs " + cost;
}
function returnCountString(count: number, name: string) {
  return count + " " + name;
}

function buyItem(item: Item) {
  if (laughCount >= item.cost) {
    increments += item.output;
    laughCount -= item.cost;
    item.count++;
    item.counttext.innerHTML = returnCountString(item.count, item.name);
    item.cost *= 1.15;
    item.button.innerHTML = returnCostString(item.name, item.cost.toFixed(1));
  }
}
function buttonInit(item: Item) {
  item.button.innerHTML = returnCostString(item.name, item.cost.toFixed(1));
  item.button.disabled = true;
  item.button.addEventListener("click", () => buyItem(item));

  item.counttext.innerHTML = returnCountString(item.count, item.name);

  app.append(item.button);
  app.append(item.counttext);
}

const availableItems: Item[] = [
  new Item("Newspaper Funnies", 10, 1, "Your sunday comic strips"),
  new Item("Street Mimes", 100, 2, "They're always stuck in a box"),
  new Item("Clowns", 1000, 50, "The last person to invite to the party"),
  new Item("Youtubers", 10000, 100, "Your screentime consumes your day"),
  new Item("Comedians", 100000, 1000, "The tickets cost a fortune"),
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
