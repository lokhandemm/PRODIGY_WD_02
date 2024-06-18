let timer;
let elapsedTime = 0;
let running = false;
let lapTimes = [];
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;}
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);}
function startStop() {
    if (running) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        timer = setInterval(() => {
            elapsedTime += 100;
            updateDisplay();
        }, 100);
        startStopBtn.textContent = 'Stop';
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    updateDisplay();
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
    lapTimes = [];
}
function recordLap() {
    if (running) {
        const lapTime = elapsedTime - (lapTimes.length > 0 ? lapTimes.reduce((a, b) => a + b) : 0);
        lapTimes.push(lapTime);
        const lapDiv = document.createElement('div');
        lapDiv.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
        laps.appendChild(lapDiv);
    }
}
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
updateDisplay();
