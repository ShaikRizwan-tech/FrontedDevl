let completed = 0;

function addTask(){
  let input = document.getElementById("taskInput");
  if(input.value === "") return;

  let li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onchange="toggleTask(this)"> ${input.value}`;
  document.getElementById("taskList").appendChild(li);

  input.value="";
  updateStats();
}

function toggleTask(cb){
  completed += cb.checked ? 1 : -1;
  updateStats();
}

function clearCompleted(){
  let list = document.getElementById("taskList");
  [...list.children].forEach(li=>{
    if(li.querySelector("input").checked) li.remove();
  });
  completed=0;
  updateStats();
}

function updateStats(){
  let total = document.getElementById("taskList").children.length;
  document.getElementById("stats").innerText =
    total + " tasks • " + completed + " completed";
}

function addGoal(){
  let input = document.getElementById("goalInput");
  if(input.value==="") return;
  let li = document.createElement("li");
  li.innerText=input.value;
  document.getElementById("goalList").appendChild(li);
  input.value="";
}

const quotes=[
  "Discipline creates success.",
  "Consistency beats talent.",
  "Focus on progress, not perfection."
];

function newQuote(){
  document.getElementById("quoteBox").innerText =
    quotes[Math.floor(Math.random()*quotes.length)];
}
