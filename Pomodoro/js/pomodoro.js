import { save as saveStorage } from './storage.js';

const timerDisplay = document.getElementById('timerDisplay');
const startBtn      = document.getElementById('startBtn');
const pauseBtn      = document.getElementById('pauseBtn');
const resetBtn      = document.getElementById('resetBtn');
const circle        = document.getElementById('progressCircle');
const quoteText     = document.getElementById('quoteText');

const quotes = [
  "El sabio actúa sin esforzarse...",
  "Las cosas se fortalecen y luego envejecen...",
  "El mejor de todos los guerreros...",
  "El Tao no hace nada, pero...",
  "Cuando dejes que tu mente se calme...",
  "El sabio no acumula...",
  "La naturaleza no se apresura...",
  "El agua es suave y débil...",
  "El que domina a los demás...",
  "El viaje de mil millas..."
];
// … (al inicio, debajo del resto de importaciones)
const chime = document.getElementById('chime');

function playChime() {
  chime.currentTime = 0;
  chime.play().catch(() => {}); // silencia fallos si el usuario bloquea audio
}

function notify(msg) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('⏱ Pomodoro Tao', { body: msg });
  }
  playChime();
}
let timeLeft = 25 * 60;
let isBreak  = false;
let interval = null;

const CIRCUMFERENCE = 2 * Math.PI * 54;

function updateDisplay() {
  const min = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const sec = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
  const offset = CIRCUMFERENCE - (timeLeft / (isBreak ? 5 : 25) / 60) * CIRCUMFERENCE;
  circle.style.strokeDashoffset = offset;
}

function tick() {
  timeLeft--;
  updateDisplay();
  if (timeLeft <= 0) toggleMode();
}

function toggleMode() {
  clearInterval(interval);
  isBreak = !isBreak;
  timeLeft = isBreak ? 5 * 60 : 25 * 60;
  document.body.classList.toggle('break-mode', isBreak);
  if (isBreak) {
    quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    notify('¡Tiempo de descanso!');
  } else notify('¡Nueva sesión de trabajo!');
  updateDisplay();
}

function notify(msg) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Pomodoro Tao', { body: msg });
  }
}

startBtn.addEventListener('click', () => { if (!interval) interval = setInterval(tick, 1000); });
pauseBtn.addEventListener('click', () => { clearInterval(interval); interval = null; });
resetBtn.addEventListener('click', () => { clearInterval(interval); interval = null; startWork(); });

function startWork() {
  isBreak = false;
  timeLeft = 25 * 60;
  document.body.classList.remove('break-mode');
  updateDisplay();
}
startWork();

// Pedir permiso para notificaciones
if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
