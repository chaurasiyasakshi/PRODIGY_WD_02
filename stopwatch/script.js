let timer;
let startTime;
let lapCounter = 0;

function startStop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    document.getElementById('startStop').innerHTML = 'Start';
    document.getElementById('lapReset').innerHTML = 'Lap';
  } else {
    startTime = Date.now() - lapCounter;
    timer = setInterval(updateTime, 10);
    document.getElementById('startStop').innerHTML = 'Stop';
    document.getElementById('lapReset').innerHTML = 'Lap';
  }
}

function lapReset() {
  if (timer) {
    // Record lap time
    let lapTime = Date.now() - startTime;
    lapCounter += lapTime;
    
    // Display lap time
    let formattedTime = formatTime(lapTime);
    let lapList = document.getElementById('laps');
    let li = document.createElement('li');
    li.textContent = `Lap ${lapList.childElementCount + 1}: ${formattedTime}`;
    lapList.appendChild(li);
  } else {
    // Reset stopwatch and laps
    clearInterval(timer);
    timer = null;
    lapCounter = 0;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('laps').innerHTML = '';
    document.getElementById('startStop').innerHTML = 'Start';
    document.getElementById('lapReset').innerHTML = 'Lap';
  }
}

function reset() {
  clearInterval(timer);
  timer = null;
  lapCounter = 0;
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('laps').innerHTML = '';
  document.getElementById('startStop').innerHTML = 'Start';
  document.getElementById('lapReset').innerHTML = 'Lap';
}

function updateTime() {
  let elapsedTime = Date.now() - startTime;
  document.getElementById('display').textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
  let date = new Date(ms);
  let minutes = date.getUTCMinutes();
  let seconds = date.getUTCSeconds();
  let milliseconds = Math.floor(date.getUTCMilliseconds() / 10);
  return (
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds + ':' +
    (milliseconds < 10 ? '0' : '') + milliseconds
  );
}