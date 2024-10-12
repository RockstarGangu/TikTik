let displayArea = document.getElementById("display-div");
let clockDisplay = document.getElementById("display-clock");
let alarmDisplay = document.getElementById("display-alarm");
let stopwatchDisplay = document.getElementById("display-stopwatch");
let timerDisplay = document.getElementById("display-timer");

const clock = document.getElementById("clock");
const timer = document.getElementById("timer");
const alarm = document.getElementById("alarm");
const stopWatch = document.getElementById("stopwatch");

// Function to hide all displays
function hideAllDisplays() {
  clockDisplay.style.display = "none";
  alarmDisplay.style.display = "none";
  stopwatchDisplay.style.display = "none";
  timerDisplay.style.display = "none";
}

// Clock functionality
let clockInterval;

async function clocking() {
  hideAllDisplays(); // Hide all other displays
  clockDisplay.style.display = "block";
  // Clear previous interval if it exists
  await clearInterval(clockInterval);

  // Initialize time elements outside the interval to avoid DOM manipulation within it
  clockDisplay.innerHTML = `
  <div id="running" >
  <h1 id="our-need"></h1>
  <span id="meridian"></span>
  </div>
  <p id="current-date"></p>
  <h2 id="date"></h2>
    <h2 id="day"></h2>
  `;

  const dateEl = document.getElementById("date");
  const currentDateEl = document.getElementById("current-date");
  const timeEl = document.getElementById("our-need");
  const dayEl = document.getElementById("day");
  const meridianEl = document.getElementById("meridian");

  // Update elements inside the interval without modifying the DOM tree
  clockInterval = await setInterval(function () {
    const time = new Date();
    dateEl.innerText = `${time.toDateString().split(" ")[1]} ${
      time.toDateString().split(" ")[2]
    } ${time.toDateString().split(" ")[3]}`;
    currentDateEl.innerText = time.toLocaleDateString();
    const [timeString, meridian] = time.toLocaleTimeString().split(" ");
    timeEl.innerText = timeString;
    meridianEl.innerText = meridian;
    dayEl.innerText = time.toDateString().split(" ")[0];
  }, 1000);
}

// Stopwatch functionality
function stopwatching() {
  hideAllDisplays(); // Hide all other displays
  stopwatchDisplay.style.display = "block";
  let counter = 0;
  let maxRunTime = 600000;

  // Set up the structure once
  stopwatchDisplay.innerHTML = `
    <h1 id="counter">0</h1>
    <div id="stopwatch-controls">
      <button class="controls" type="button" id="restart">Restart</button>
      <button class="controls" type="button" id="start">Start</button>
      <button class="controls" type="button" id="pause">Pause</button>
    </div>
  `;

  const countdown = document.getElementById("counter");
  const pauseBtn = document.getElementById("pause");
  const restartBtn = document.getElementById("restart");
  const startBtn = document.getElementById("start");

  let stopwatchInterval;

  // Start button logic
  startBtn.addEventListener("click", function () {
    if (!stopwatchInterval) {
      // Prevent multiple intervals from starting
      stopwatchInterval = setInterval(function () {
        counter += 1;
        countdown.innerText = counter;
        if (counter === maxRunTime) {
          clearInterval(stopwatchInterval);
        }
      }, 1000);
    }
  });

  // Pause button logic
  pauseBtn.addEventListener("click", function () {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null; // Reset interval so it can be started again
  });

  // Restart button logic
  restartBtn.addEventListener("click", function () {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null; // Reset interval
    counter = 0;
    countdown.innerText = counter;
  });
}

// Timer functionaliaty
function timering() {
  hideAllDisplays(); // Hide all other displays
  timerDisplay.style.display = "block";

  let timerInterval;
  let minutes = 0;
  let seconds = 0;

  // Create the timer UI once
  timerDisplay.innerHTML = `
    <div id="counter-div" >
      <h1 id="timer-minutes">00</h1>:
      <h1 id="timer-seconds">00</h1>
    </div>
    <div id="controls">
    <div id="input-div">
      <div>
      <label for="minutes">Minutes: </label>
      <input
        type="number"
        class="timer-inputs"
        inputmode="numeric"
        id="input-minutes"
        name="minutes"
        placeholder="00"
        min="0"
        max="59"
      />
      </div>
      <div><label for="seconds">Seconds: </label>
      <input
        type="number"
        class="timer-inputs"
        inputmode="numeric"
        id="input-seconds"
        name="seconds"
        placeholder="00"
        min="0"
        max="59"
      /></div>
      
    </div>
    <div id="timer-controls">
    <button class="controls" type="button"  id="restart" >Restart</button>
    <button class="controls" type="button"  id="start" >Start</button>
    <button class="controls" type="button"  id="pause" >Pause</button>
    </div>
    </div>
  `;

  const minDisplay = document.getElementById("timer-minutes");
  const secDisplay = document.getElementById("timer-seconds");
  const startTimerBtn = document.getElementById("start");
  const pauseTimerBtn = document.getElementById("pause");
  const restartTimerBtn = document.getElementById("restart");
  const inputMinutes = document.getElementById("input-minutes");
  const inputSeconds = document.getElementById("input-seconds");

  // Formatting helper
  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  // Function to start the timer
  startTimerBtn.addEventListener("click", function () {
    if (!timerInterval) {
      // Get user input
      minutes = parseInt(inputMinutes.value) || 0;
      seconds = parseInt(inputSeconds.value) || 0;

      if (minutes === 0 && seconds === 0) {
        alert("Please enter a valid time");
        return;
      }

      secDisplay.innerText = formatTime(seconds);
      minDisplay.innerText = formatTime(minutes);

      timerInterval = setInterval(function () {
        if (minutes === 0 && seconds === 0) {
          clearInterval(timerInterval);
          timerInterval = null;
          const music = new Audio(
            "./assets/music/happy-media-music-opener(chosic.com).mp3"
          );
          music.play();

          // Reset the timer
          minutes = 0;
          seconds = 0;
          inputMinutes.value = "";
          inputSeconds.value = "";
        } else {
          if (seconds === 0) {
            minutes -= 1;
            seconds = 59;
          } else {
            seconds -= 1;
          }
        }

        // Update the display
        minDisplay.innerText = formatTime(minutes);
        secDisplay.innerText = formatTime(seconds);
      }, 1000); // Decrement every second
    }
  });

  // Pause button logic
  pauseTimerBtn.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null; // Reset interval
  });

  // Restart button logic
  restartTimerBtn.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null; // Reset interval
    minutes = 0;
    seconds = 0;
    minDisplay.innerText = "00";
    secDisplay.innerText = "00";
  });
}

// Add event listeners for each option
clock.addEventListener("click", clocking);
stopWatch.addEventListener("click", stopwatching);
timer.addEventListener("click", timering);

// Initially hide all sections
hideAllDisplays();
