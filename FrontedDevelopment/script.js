// ================= TASKS =================

// Task form
const taskForm = document.querySelectorAll("form")[0];
const taskInput = taskForm.querySelector("input[type='text']");
const taskList = document.querySelector("ul");
const totalPara = document.querySelectorAll("section p")[3];
const completedPara = document.querySelectorAll("section p")[4];
const clearBtn = document.querySelector("button");

let totalTasks = 3;       // already existing list items
let completedTasks = 1;   // given in HTML

taskForm.addEventListener("submit", function (e) {
    e.preventDefault(); // page reload stop

    if (taskInput.value.trim() === "") return;

    const li = document.createElement("li");
    li.textContent = taskInput.value;

    taskList.appendChild(li);
    totalTasks++;

    totalPara.textContent = "Total Tasks: " + totalTasks;
    completedPara.textContent = "Completed Tasks: " + completedTasks;

    taskInput.value = "";
});

clearBtn.addEventListener("click", function () {
    taskList.innerHTML = "";
    totalTasks = 0;
    completedTasks = 0;

    totalPara.textContent = "Total Tasks: 0";
    completedPara.textContent = "Completed Tasks: 0";
});


// ================= GOALS =================

const goalForm = document.querySelectorAll("form")[1];
const goalInput = goalForm.querySelector("input[type='text']");
const goalList = document.querySelector("ol");

goalForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (goalInput.value.trim() === "") return;

    const li = document.createElement("li");
    li.textContent = goalInput.value;

    goalList.appendChild(li);
    goalInput.value = "";
});


// ================= MOTIVATION =================

const quoteBtn = document.querySelectorAll("button")[1];
const quoteBox = document.querySelector("blockquote");

const quotes = [
    "Believe in yourself and all that you are.",
    "Small steps every day lead to big success.",
    "Discipline is the bridge between goals and achievement.",
    "Consistency beats motivation.",
    "Your future depends on what you do today."
];

quoteBtn.addEventListener("click", function () {
    const random = Math.floor(Math.random() * quotes.length);
    quoteBox.textContent = "“" + quotes[random] + "”";
});
