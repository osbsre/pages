// Claves únicas en localStorage
const KEYS = { tasks: 'pomodoroTareas', notes: 'pomodoroNotas' };

export const load = (key) => JSON.parse(localStorage.getItem(KEYS[key]) || '[]');
export const save = (key, data) => localStorage.setItem(KEYS[key], JSON.stringify(data));