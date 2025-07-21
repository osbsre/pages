import { load, save } from './storage.js';

const taskForm  = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const pendingUL = document.getElementById('pendingList');
const completedUL = document.getElementById('completedList');

let tasks = load('tasks');

function store() { save('tasks', tasks); }

function render() {
  const pend = tasks.filter(t => !t.completed);
  const done = tasks.filter(t => t.completed);
  const renderList = (list, ul) => {
    ul.innerHTML = '';
    if (!list.length) return ul.appendChild(Object.assign(document.createElement('li'), {textContent: 'Nada aquí', className: 'empty'}));
    list.forEach(t => {
      const li = document.createElement('li');
      li.className = 'task-item' + (t.completed ? ' completed' : '');
      li.innerHTML = `
        <span>${t.text}</span>
        <div>
          ${t.completed
            ? `<button onclick="restoreTask(${t.id})"><i class="fas fa-undo"></i></button>`
            : `<button onclick="completeTask(${t.id})"><i class="fas fa-check"></i></button>`}
          <button onclick="deleteTask(${t.id})"><i class="fas fa-trash"></i></button>
        </div>`;
      ul.appendChild(li);
    });
  };
  renderList(pend, pendingUL);
  renderList(done, completedUL);
}

window.completeTask = id => { const t = tasks.find(x => x.id === id); t.completed = true; t.completedAt = new Date(); store(); render(); };
window.restoreTask  = id => { const t = tasks.find(x => x.id === id); t.completed = false; delete t.completedAt; store(); render(); };
window.deleteTask   = id => { tasks = tasks.filter(x => x.id !== id); store(); render(); };

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, completed: false, createdAt: new Date() });
  taskInput.value = '';
  store();
  render();
});

render();
