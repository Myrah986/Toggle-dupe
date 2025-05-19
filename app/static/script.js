let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

// 🎀 Update the pretty timer display
function updateDisplay() {
  const display = document.getElementById('focus-timer');
  display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 🍓 Start the timer (Yasss, let's focus!) 🍓
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    // Update button states (disabled/enabled)
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('resetBtn').disabled = false;

    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          alert('🎉 Focus session complete! Treat yourself! 🍰');
          resetTimer(); // Reset after finishing
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      updateDisplay();
    }, 1000);
  }
}

// 🍰 Pause the timer (Take a lil’ break!) 🍰
function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  // Update buttons
  document.getElementById('startBtn').disabled = false;
  document.getElementById('pauseBtn').disabled = true;
}

// 🦄 Reset the timer (Fresh start, queen!) 🦄
function resetTimer() {
  pauseTimer(); // Stop if running
  minutes = 25;
  seconds = 0;
  updateDisplay();
  // Reset buttons to initial state
  document.getElementById('startBtn').disabled = false;
  document.getElementById('pauseBtn').disabled = true;
  document.getElementById('resetBtn').disabled = true;
}

// 👑 Initialize when the page loads 👑
document.addEventListener('DOMContentLoaded', function() {
  // Tab switching logic (unchanged, still flawless)
  const buttons = document.querySelectorAll('.taskbar-btn');
  const sections = document.querySelectorAll('.content-section');

  sections.forEach((section, index) => {
    section.style.display = index === 0 ? 'block' : 'none';
  });

  if (buttons.length > 0) buttons[0].classList.add('active');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const targetId = this.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      sections.forEach(section => {
        section.style.display = 'none';
      });

      if (targetSection) {
        targetSection.style.display = 'block';
      }

      buttons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Pause timer if leaving focus tab
      if (targetId !== 'focus-timer-section') {
        pauseTimer();
      }
    });
  });

  // ⏰ Initialize timer & buttons ⏰
  updateDisplay();
  document.getElementById('pauseBtn').disabled = true;
  document.getElementById('resetBtn').disabled = true;

  // 🎀 Connect buttons to their functions 🎀
  document.getElementById('startBtn').addEventListener('click', startTimer);
  document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
  document.getElementById('resetBtn').addEventListener('click', resetTimer);
});

function animateTimerComplete() {
    const timerDisplay = document.getElementById('focus-timer');
    timerDisplay.style.animation = 'celebrate 0.5s ease 3';
}