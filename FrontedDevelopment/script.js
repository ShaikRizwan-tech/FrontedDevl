const STORAGE_KEYS = {
  TASKS: 'lifecanvas_tasks_v1',
  GOALS: 'lifecanvas_goals_v1',
};

const sampleQuotes = [
  "Start where you are. Use what you have. Do what you can.",
  "The secret of getting ahead is getting started.",
  "Small steps every day lead to big results.",
  "You don't have to be great to start, but you have to start to be great.",
  "What you do today can improve all your tomorrows.",
  "Focus on progress, not perfection."
];

// ---------- Helpers ----------
const qs = (sel, parent=document) => parent.querySelector(sel);
const qsa = (sel, parent=document) => Array.from(parent.querySelectorAll(sel));

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function load(key, fallback=[]) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch(e) {
    console.error('Failed to load', e);
    return fallback;
  }
}


// ---------- Tasks ----------
let tasks = load(STORAGE_KEYS.TASKS, []);

const taskForm = qs('#task-form');
const taskInput = qs('#task-input');
const taskListEl = qs('#task-list');
const taskCountEl = qs('#task-count');
const completedCountEl = qs('#completed-count');
const clearCompletedBtn = qs('#clear-completed');

function renderTasks() {
  taskListEl.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    const left = document.createElement('div'); left.className='left';
    const checkbox = document.createElement('button');
    checkbox.className = 'checkbox';
    checkbox.innerHTML = task.done ? '✓' : '';
    checkbox.title = 'Toggle complete';
    const text = document.createElement('div');
    text.className = 'item-text' + (task.done ? ' done' : '');
    text.textContent = task.text;
    left.appendChild(checkbox);
    left.appendChild(text);

    const actions = document.createElement('div'); actions.className='actions';
    const del = document.createElement('button');
    del.className = 'button-small';
    del.textContent = 'Delete';

    li.appendChild(left);
    actions.appendChild(del);
    li.appendChild(actions);

    // events
    checkbox.addEventListener('click', () => {
      task.done = !task.done;
      save(STORAGE_KEYS.TASKS, tasks);
      renderTasks();
      updateCounts();
    });
    del.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      save(STORAGE_KEYS.TASKS, tasks);
      renderTasks();
      updateCounts();
    });

    taskListEl.appendChild(li);
  });

  updateCounts();
}

function updateCounts() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  taskCountEl.textContent = ${total} task${total !== 1 ? 's' : ''};
  completedCountEl.textContent = ${completed} completed;
}

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  const newTask = { id: Date.now().toString(36), text, done: false };
  tasks.unshift(newTask);
  save(STORAGE_KEYS.TASKS, tasks);
  taskInput.value = '';
  renderTasks();
});

// Clear completed tasks
clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.done);
  save(STORAGE_KEYS.TASKS, tasks);
  renderTasks();
});

// ---------- Goals ----------
let goals = load(STORAGE_KEYS.GOALS, []);
const goalForm = qs('#goal-form');
const goalInput = qs('#goal-input');
const goalListEl = qs('#goal-list');

function renderGoals() {
  goalListEl.innerHTML = '';
  goals.forEach(g => {
    const li = document.createElement('li');
    const left = document.createElement('div'); left.className = 'left';
    const text = document.createElement('div');
    text.className = 'item-text';
    text.textContent = g.text;
    left.appendChild(text);

    const actions = document.createElement('div'); actions.className='actions';
    const del = document.createElement('button'); del.className='button-small'; del.textContent='Delete';
    actions.appendChild(del);

    li.appendChild(left);
    li.appendChild(actions);

    del.addEventListener('click', () => {
      goals = goals.filter(x => x.id !== g.id);
      save(STORAGE_KEYS.GOALS, goals);
      renderGoals();
    });

    goalListEl.appendChild(li);
  });
}

goalForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = goalInput.value.trim();
  if (!text) return;
  const newGoal = { id: Date.now().toString(36), text };
  goals.unshift(newGoal);
  save(STORAGE_KEYS.GOALS, goals);
  goalInput.value = '';
  renderGoals();
});

// ---------- Quotes ----------
const quoteEl = qs('#quote');
const newQuoteBtn = qs('#new-quote');
const autoQuoteToggle = qs('#auto-quote-toggle');
let autoRotate = false;
let autoRotateInterval = null;

function showRandomQuote() {
  const i = Math.floor(Math.random() * sampleQuotes.length);
  quoteEl.textContent = “${sampleQuotes[i]}”;
}
newQuoteBtn.addEventListener('click', showRandomQuote);

autoQuoteToggle.addEventListener('click', () => {
  autoRotate = !autoRotate;
  autoQuoteToggle.textContent = Auto Rotate: ${autoRotate ? 'On' : 'Off'};
  if (autoRotate) {
    autoRotateInterval = setInterval(showRandomQuote, 6000);
  } else {
    clearInterval(autoRotateInterval);
  }
});

// ---------- Init ----------
function init() {
  // Basic seed: if no quotes shown, show one
  if (!quoteEl.textContent) showRandomQuote();
  renderTasks();
  renderGoals();
}


init();
