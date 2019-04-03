// Initialization
function init() {
  var winningScore = (document.querySelector(".winningScore").textContent = "");
  var score = [0, 0];
  var roundScore = 0;
  var activePlayer = 0;
  var isPlaying = true;

  // hiding the dice at the beginning
  document.getElementById("die1").style.display = "none";
  document.getElementById("die2").style.display = "none";

  // resetting the scores (global and current)
  document.getElementById("score1").textContent = "0";
  document.getElementById("score2").textContent = "0";
  document.getElementById("currentValue1").textContent = "0";
  document.getElementById("currentValue2").textContent = "0";

  // changing the players name
  document.getElementById("name1").textContent = "Player1";
  document.getElementById("name2").textContent = "Player2";

  // remove "winner" class
  document.querySelector(".player1Zone").classList.remove("winner");
  document.querySelector(".player2Zone").classList.remove("winner");

  // remove "active" class
  document.querySelector(".player1Zone").classList.remove("active");
  document.querySelector(".player2Zone").classList.remove("active");
}
init();

// Click on NEW GAME BUTTON
document.getElementById("btnNew").addEventListener("click", init);

// Click on ROLL BUTTON
document.getElementById("btnRoll").addEventListener("click", function roll() {
  if (isPlaying) {
    // if it's the current player's turn
    // Getting random numbers for the dice :
    var die1Random = Math.floor(Math.random() * 6 + 1);
    var die2Random = Math.floor(Math.random() * 6 + 1);

    var die1 = document.getElementById("die1");
    var die2 = document.getElementById("die2");

    die1.style.display = "block";
    die2.style.display = "block";

    // Display the image depending on the random dice numbers gotten
    die1.src = "./img/dice-" + die1Random + ".png";
    die2.src = "./img/dice-" + die2Random + ".png";

    // Update current score if no 1 on dice
    if (die1Random !== 1 && die2Random !== 1) {
      currentValue = die1Random + die2Random;
      document.querySelector(
        "#currentValue" + activePlayer
      ).textContent = currentValue;
    } else nextPlayer(); // if there is a 1 on one die, it's the next player's turn
  }
});

// Click on HOLD BUTTON
document.getElementById("btnHold").addEventListener("click", function roll() {
  if (isPlaying) {
    // if it's the current player's turn
    score[activePlayer] += currentValue; // adding the current score to the player's global score

    // updating the player's current score
    document.querySelector("#score" + activePlayer).textContent =
      score[activePlayer];

    // getting and setting the winning score
    var input = document.querySelector(".winningScore").value;
    var winningScore;
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // when there's a winner
    if (score[activePlayer] >= winningScore) {
      document.querySelector("#name" + activePlayer).textContent = "Winner!";
      document
        .querySelector(".player" + activePlayer + "Zone")
        .classList.add("winner");
      document.querySelector(
        ".player" + activePlayer + "Zone".classList.remove("active")
      );
      isPlaying = false;
    } else nextPlayer();
  }
});

// Player change
function nextPlayer() {
  if (activePlayer === 1) {
    activePlayer = 2;
  } else activePlayer = 1;

  currentValue = 0;

  // reset the current values at 0
  document.getElementById("currentValue1").textContent = "0";
  document.getElementById("currentValue2").textContent = "0";

  // toggling the "active" class
  document.querySelector("player1Zone").classList.toggle("active");
  document.querySelector("player2Zone").classList.toggle("active");
}
