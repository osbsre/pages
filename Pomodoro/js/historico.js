import { load } from './storage.js';

const tasks = load('tasks');
const notes = load('notes');

const histTasks = document.getElementById('histTasks');
const histNotes = document.getElementById('histNotes');

function renderList(arr, container) {
  container.innerHTML = '';
  if (!arr.length) {
    container.innerHTML = '<li class="empty">Sin registros</li>';
    return;
  }
  arr.sort((a, b) => new Date(b.createdAt || b.fecha) - new Date(a.createdAt || a.fecha));
  container.innerHTML = arr.map(item => `
    <li class="hist-item">
      <small>${item.fecha || item.createdAt?.split('T')[0] || ''}</small>
      <p>${item.text || item.contenido}</p>
    </li>`).join('');
}

renderList(tasks, histTasks);
renderList(notes, histNotes);

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
  });
});