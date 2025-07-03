let buttonEl = document.getElementById("roll-button");
let diceEl = document.getElementById("dice");
let rollHistoryEl = document.getElementById("roll-history");
let clearHistoryBtn = document.getElementById("clear-history");
let autoRollBtn = document.getElementById("auto-roll-toggle");
let themeToggleBtn = document.getElementById("theme-toggle");
let historyList = [];
let rollCounts = [0, 0, 0, 0, 0, 0];
let autoRollInterval = null;

function rollDice() {
  let rollResult = Math.floor(Math.random() * 6) + 1;
  let diceFace = getDiceFace(rollResult);
  diceEl.innerHTML = diceFace;
  historyList.push(rollResult);
  rollCounts[rollResult - 1]++;
  updateRollHistory();
  updateStats();
}

function updateRollHistory() {
  rollHistoryEl.innerHTML = "";
  for (let i = 0; i < historyList.length; i++) {
    let listItem = document.createElement("li");
    listItem.innerHTML = `Roll ${i + 1}: <span>${getDiceFace(historyList[i])}</span>`;
    rollHistoryEl.prepend(listItem);
  }
}

function updateStats() {
  for (let i = 0; i < 6; i++) {
    document.getElementById(`stat-${i + 1}`).textContent = rollCounts[i];
  }
}

function getDiceFace(rollResult) {
  switch (rollResult) {
    case 1: return "&#9856;";
    case 2: return "&#9857;";
    case 3: return "&#9858;";
    case 4: return "&#9859;";
    case 5: return "&#9860;";
    case 6: return "&#9861;";
  }
}

buttonEl.addEventListener("click", function() {
  diceEl.classList.add("roll-animation");
  setTimeout(function() {
    diceEl.classList.remove("roll-animation");
    rollDice();
  }, 1200);
});

clearHistoryBtn.addEventListener("click", function() {
  historyList = [];
  rollCounts = [0, 0, 0, 0, 0, 0];
  updateRollHistory();
  updateStats();
});

autoRollBtn.addEventListener("click", function() {
  if (autoRollInterval === null) {
    autoRollInterval = setInterval(function() {
      buttonEl.click();
    }, 2000);
    autoRollBtn.textContent = "Stop Auto-Roll";
  } else {
    clearInterval(autoRollInterval);
    autoRollInterval = null;
    autoRollBtn.textContent = "Start Auto-Roll";
  }
});

themeToggleBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark");
  let isDark = document.body.classList.contains("dark");
  themeToggleBtn.innerHTML = isDark ? "<img src='https://img.icons8.com/ios-filled/50/000000/sun--v1.png' alt='Light Mode' id='light-icon' class='image-dimension'/>" : "<img src='https://img.icons8.com/ios-filled/50/000000/moon-symbol.png' alt='Dark Mode' id='dark-icon' class='image-dimension'/>";
});