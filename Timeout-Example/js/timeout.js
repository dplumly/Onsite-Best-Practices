console.log("Content script loaded");

// ============== Hidden Reset Button ==============
  document.addEventListener("DOMContentLoaded", () => {
        const reloadEl = document.getElementById("hidden-reset");
        if (reloadEl) {
        reloadEl.addEventListener("click", reloadPageOrRedirect);
        }
  });






// ============== SETTINGS ==============
let timeoutTotal = 60000; // 1 minute inactivity time
let countdownSeconds = 10; // countdown before restart

// ============== ELEMENT REFERENCES ==============
const modal = document.getElementById("timerWrapper");
const modalBg = document.getElementById("modalBackground");
const timer = document.getElementById("timer");
const continueBtn = document.getElementById("continue");
const restartBtn = document.getElementById("restart");

// ============== STATE ==============
let timeoutID, intervalID, timeLeft;
let timeoutDisabled = false;

// ============== Redirect to Home Page ==============
const homepage = "https://google.com";


function reloadPageOrRedirect() {
    if (homepage) {
        window.location.href = homepage;
    } else {
        window.location.reload();
    }
}


// ============== Start Timer ==============
function startTimer() {
    if (timeoutDisabled) return;
    timeoutID = setTimeout(showModal, timeoutTotal);
}

function resetTimer(event) {
    if (event && event.target.id === "restart") return;

    hideModal();
    clearInterval(intervalID);
    clearTimeout(timeoutID);

    if (!timeoutDisabled) startTimer();
}

function showModal() {
    modal.style.display = "block";
    modalBg.style.display = "block";
    timer.style.display = "inline-block";
    continueBtn.style.display = "inline-block";
    restartBtn.style.display = "inline-block";

    timeLeft = countdownSeconds;
    timer.textContent = timeLeft;

    intervalID = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft <= 0) {
        clearInterval(intervalID);
        reloadPageOrRedirect();
        }
    }, 1000);
}

function hideModal() {
    modal.style.display = "none";
    modalBg.style.display = "none";
    timer.style.display = "none";
    continueBtn.style.display = "none";
    restartBtn.style.display = "none";
}

// ============== EVENT LISTENERS ==============
restartBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  reloadPageOrRedirect();
});

continueBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  hideModal();
  clearInterval(intervalID);
  clearTimeout(timeoutID);
  if (!timeoutDisabled) startTimer();
});

["click", "mousedown", "keypress", "scroll", "touchmove"].forEach(evt =>
  window.addEventListener(evt, resetTimer)
);

// Start on load
startTimer();

