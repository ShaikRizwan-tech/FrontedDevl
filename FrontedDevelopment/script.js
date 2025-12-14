/* =========================
   LifeCanvas – JavaScript
   ========================= */

/* Motivation Quotes */
const quotes = [
  "Small steps every day lead to big results.",
  "Discipline beats motivation.",
  "Focus on progress, not perfection.",
  "Your future depends on what you do today.",
  "Consistency creates long-term success."
];

/* Show Daily Quote */
(function showDailyQuote() {
  const quoteElement = document.getElementById("quoteText");
  const todayIndex = new Date().getDate() % quotes.length;
  quoteElement.textContent = quotes[todayIndex];
})();

/* Add Task Function */
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.textContent = taskText;

  /* Mark task as completed on click */
  li.addEventListener("click", () => {
    li.style.textDecoration = "line-through";
    li.style.opacity = "0.6";
  });

  taskList.appendChild(li);
  input.value = "";
}

/* Enter key support */
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
