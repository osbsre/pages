import { load, save } from './storage.js';

const notesArea = document.getElementById('notesArea');
let notes = load('notes');

// Buscar nota de hoy
let todayNote = notes.find(n => n.fecha === new Date().toLocaleDateString('es-CA'));
if (!todayNote) {
  todayNote = { id: Date.now(), fecha: new Date().toLocaleDateString('es-CA'), contenido: '' };
  notes.push(todayNote);
}

notesArea.value = todayNote.contenido;

notesArea.addEventListener('input', () => {
  todayNote.contenido = notesArea.value;
  save('notes', notes);
});