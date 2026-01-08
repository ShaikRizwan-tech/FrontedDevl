let completed = 0;

/* TASKS */
function addTask(){
  const input = document.getElementById("taskInput");
  if(input.value === ""){
    alert("Please enter a task");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${input.value}</span>
    <input type="checkbox" onchange="toggleTask(this)">
  `;
  document.getElementById("taskList").appendChild(li);
  input.value = "";
  updateStats();
}

function toggleTask(cb){
  completed += cb.checked ? 1 : -1;
  updateStats();
}

function clearCompleted(){
  const list = document.getElementById("taskList");
  [...list.children].forEach(li=>{
    if(li.querySelector("input").checked){
      li.remove();
    }
  });
  completed = 0;
  updateStats();
}

function updateStats(){
  const total = document.getElementById("taskList").children.length;
  document.getElementById("taskCount").innerText = total + " tasks";
  document.getElementById("completedCount").innerText = completed + " completed";
}

/* GOALS */
function addGoal(){
  const input = document.getElementById("goalInput");
  if(input.value === ""){
    alert("Please enter a goal");
    return;
  }
  const li = document.createElement("li");
  li.innerText = input.value;
  document.getElementById("goalList").appendChild(li);
  input.value = "";
}

/* MOTIVATION */
const quotes = [
  "Believe you can and you're halfway there.",
  "Small steps every day lead to big success.",
  "Discipline creates freedom.",
  "Your future depends on what you do today.",
  "Consistency beats motivation."
];

let auto = false;
let interval;

function newQuote(){
  const q = quotes[Math.floor(Math.random()*quotes.length)];
  document.getElementById("quoteBox").innerText = "“" + q + "”";
}

function toggleAuto(){
  auto = !auto;
  document.getElementById("autoState").innerText = auto ? "On" : "Off";
  if(auto){
    interval = setInterval(newQuote, 3000);
  }else{
    clearInterval(interval);
  }
}
