import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let laughCount: number = 0;
let prevTime: number = 0;
let increments : number = 0;
const gameName = "My amazing cookies";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const div = document.createElement("div");
div.innerHTML = laughCount + " Laughs";

const firstbutton = document.createElement("button");
firstbutton.innerHTML = "😆";


const newspaperFunnies = document.createElement("button");
let newspaperFunniesCost = 10;
let newspaperFunniesOut = 1;
newspaperFunnies.innerHTML = "Newspaper Funnies Costs " + newspaperFunniesCost;
newspaperFunnies.disabled = true;

//setInterval(incrementNum, 1000);
//calls incrementNum every second
app.append(header);
app.append(firstbutton);
app.append(div);
app.append(newspaperFunnies)

firstbutton.addEventListener("click", incrementNum);
newspaperFunnies.addEventListener("click", ()=>{
  if (laughCount >= newspaperFunniesCost){
    increments += newspaperFunniesOut;
    laughCount -= newspaperFunniesCost;
  }
 

})

function incrementNum() {
  laughCount++;
  div.innerHTML = laughCount + " Laughs";
}
function animate(): void {
  //every frame calls this
  let timepassed = (performance.now() - prevTime) / 1000.0
  
  laughCount += increments * timepassed;
  prevTime = performance.now();
  div.innerHTML = laughCount.toFixed(1) + " Laughs";
  requestAnimationFrame(animate);
  checkdisabled(newspaperFunnies,10);
}

requestAnimationFrame(animate);

function checkdisabled(El : HTMLButtonElement, threshold : number){
  if (El.disabled == true && laughCount >= threshold){
    El.disabled = false;
  }
}