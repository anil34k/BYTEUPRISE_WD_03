let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 1);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = true;
        lapBtn.disabled = false;
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = false;
        lapBtn.disabled = true;
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.000';
    difference = 0;
    running = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    laps.innerHTML = '';
    lapCount = 0;
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    let date = new Date(time);
    let minutes = ('0' + date.getUTCMinutes()).slice(-2);
    let seconds = ('0' + date.getUTCSeconds()).slice(-2);
    let milliseconds = ('00' + date.getUTCMilliseconds()).slice(-3);
    return `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    lapCount++;
    let lapTime = formatTime(new Date().getTime() - startTime);
    let lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    laps.appendChild(lapItem);
}
