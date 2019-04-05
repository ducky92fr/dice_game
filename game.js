// Initialization
var winningScore = (document.querySelector(".winningScore").textContent = "");
var score = [0, 0];
var currentValue = 0;
var activePlayer = 0;
var die1Random;
var die2Random;
function random() {
  var dieRandom = Math.floor(Math.random() * 6 + 1);
  return dieRandom;
}

function init() {
  const winningScoreInputReset = (document.querySelector(
    ".winningScore"
  ).value = "");
  // hiding the dice at the beginning
  const die1Reset = (document.getElementById("die1").style.display = "none");
  const die2Reset = (document.getElementById("die2").style.display = "none");

  // resetting the scores (global and current)
  const score1Reset = (document.getElementById("score1").textContent = "0");
  const score2Reset = (document.getElementById("score2").textContent = "0");
  const currentValue1Reset = (document.getElementById(
    "currentValue1"
  ).textContent = "0");
  const currentValue2Reset = (document.getElementById(
    "currentValue2"
  ).textContent = "0");

  // changing the players name
  document.getElementById("name1").textContent = "Player1";
  document.getElementById("name2").textContent = "Player2";

  // remove "winner" class
  document.querySelector(".player1Zone").classList.remove("winner");
  document.querySelector(".player2Zone").classList.remove("winner");

  // remove "active" class
  document.querySelector(".player1Zone").classList.remove("active");
  document.querySelector(".player2Zone").classList.remove("active");
  document.querySelector(".player1Zone").classList.add("active");
}

init();

// Click on NEW GAME BUTTON
document.getElementById("btnNew").addEventListener("click", init);

// Click on ROLL BUTTON
document.getElementById("btnRoll").addEventListener("click", function roll() {
  // if it's the current player's turn
  // Getting random numbers for the dice :
  die1Random = random();
  die2Random = random();

  var die1 = document.getElementById("die1");
  var die2 = document.getElementById("die2");

  die1.style.display = "block";
  die2.style.display = "block";

  // Display the image depending on the random dice numbers gotten
  die1.src = "./img/dice-" + die1Random + ".png";
  die2.src = "./img/dice-" + die2Random + ".png";

  // Update current score if no 1 on dice
  if (die1Random !== 1 && die2Random !== 1 && die1Random !== die2Random) {
    console.log("pas de 1 et pas de double");
    currentValue = die1Random + die2Random;
    document.querySelector(
      "#currentValue" + (activePlayer + 1)
    ).textContent = currentValue;
  } else if (
    die1Random !== 1 &&
    die2Random !== 1 &&
    die1Random === die2Random
  ) {
    console.log("on a un double (mais pas de 1)");
    currentValue = die1Random + die2Random;
    if (activePlayer === 0) {
      document.querySelector(
        "#currentValue" + (activePlayer + 1)
      ).textContent = currentValue;
      document.querySelector("#currentValue2").textContent = -currentValue;
    } else {
      document.querySelector(
        "#currentValue" + (activePlayer + 1)
      ).textContent = currentValue;
      document.querySelector("#currentValue1").textContent = -currentValue;
    }
  } else if (die1Random === 1 && die2Random === 1) {
    console.log(die1Random);
    console.log(die2Random);
    console.log("on a deux 1");
    doubleSkunk();
  } else if (die1Random === 1 || die2Random === 1) {
    console.log("on a un 1");
    nextPlayer();
  }
});

function doubleSkunk() {
  score[activePlayer] = 0;
  console.log(score[activePlayer]);
  document.querySelector("#score" + (activePlayer + 1)).textContent =
    score[activePlayer];
  nextPlayer();
}

// Player change
function nextPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  currentValue = 0;

  // reset the current values at 0
  document.getElementById("currentValue1").textContent = "0";
  document.getElementById("currentValue2").textContent = "0";

  // toggling the "active" class
  document.querySelector(".player1Zone").classList.toggle("active");
  document.querySelector(".player2Zone").classList.toggle("active");
}

// Click on HOLD BUTTON
document.getElementById("btnHold").addEventListener("click", function roll() {
  // if it's the current player's turn
  if (die1Random !== 1 && die2Random !== 1 && die1Random !== die2Random) {
    score[activePlayer] += currentValue;
    // updating the player's current score
    document.querySelector("#score" + (activePlayer + 1)).textContent =
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
      // overlay
      const win = document.getElementById("overlay");
      win.style.display = "block";
      setTimeout(() => (win.style.display = "none"), 5000);

      document
        .querySelector(".player" + (activePlayer + 1) + "Zone")
        .classList.add("winner");
      document
        .querySelector(".player" + (activePlayer + 1) + "Zone")
        .classList.remove("active");
    } else console.log("on va au joueur suivant");
    nextPlayer();
  } // adding the current score to the player's global score
  else if (die1Random !== 1 && die2Random !== 1 && die1Random === die2Random) {
    score[activePlayer] += currentValue;
    document.querySelector("#score" + (activePlayer + 1)).textContent =
      score[activePlayer];

    if (activePlayer === 0) {
      score[1] -= currentValue;
      if (score[1] < 0) {
        score[1] = 0;
      } else score[1];
      document.querySelector("#score2").textContent = score[1];
    } else {
      score[0] -= currentValue;
      if (score[0] < 0) {
        score[0] = 0;
      } else score[0];
      document.querySelector("#score1").textContent = score[0];
    }
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
      // overlay
      const win = document.getElementById("overlay");
      win.style.display = "block";
      setTimeout(() => (win.style.display = "none"), 5000);

      document
        .querySelector(".player" + (activePlayer + 1) + "Zone")
        .classList.add("winner");
      document
        .querySelector(".player" + (activePlayer + 1) + "Zone")
        .classList.remove("active");
    } else console.log("on va au joueur suivant");
    nextPlayer();
  }
});

// échelle en bas montrant l'évolution des points de chaque joueur (comme une course) avec ligne d'arrivée
// lorsqu'il y a un double, si le joueur décide de garder la somme, elle lui est augmentée (comme d'habitude),mais elle est aussi retirée à l'autre joueur

// page de garde avec le nom du jeu, et 2 inputs pour insérer le nom des joueurs (et reprendre les noms ensuite)
// bouton "?" avec règles du jeu

// pb ac New Game button
// add the name of the winner
