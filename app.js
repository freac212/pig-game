/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// !!!SCRIPT IS AT THE BOTTOM, NO NEED FOR A DOM EVENT!!!
/**
 * game start / game end resets all player objects scores.
 * 
 * A round is justified by each player updating their current score; whether by landing on a zero, or "holding"
 * 
 * A turn is the player rolling the dice as many times as they want, updating their round score, not total score. If the player rolls a one, their round score becomes 0 and moves to the next player, so we need an exit on if player.roll === 0 || player.hold (is true but that doesn't need a condition)
 * 
 * if the player holds function hold() {total.score += round.score}
 * 
 * Whichever player is active, toggle class"active";
 * 
 * How each round works: Simplified:
 * currentPlayer clicks rollDice
 * diceRolls();
 * if(diceRolls === 1){ exit round; currentPlayer changes}
 * else{ roundscore += diceRolls()}
 * 
 * if(hold is pressed){total.score += round.score, change currentPlayer}
 * 
 * 
 * GAME:
 * ROUND:
 * TURN:
 * 
 * 
 * totalscore = player-score
 * roundscore = player-current-box
 * 
 * 
 * SET TIME OUT FOR DICE SO YOU CAN SEE THE ONE!!!
 * 
 * 
*/

let numOfDice = 2;

let player0 = {
  name: "player1",
  totalScore: 0,
  roundScore: 0,
  classPanel: "player-0-panel",
  roundScoreID: "#current-0.player-current-score",
}

let player1 = {
  name: "player2",
  totalScore: 0,
  roundScore: 0,
  classPanel: "player-1-panel",
  roundScoreID: "#current-1.player-cuurent-score",
}

// ====================GAME========================
document.getElementsByClassName("btn-roll")[0].addEventListener("click", rollDice);
document.getElementsByClassName("btn-hold")[0].addEventListener("click", hold);

let currentPlayerElement = document.getElementsByClassName("active")[0];
let currentPlayer;
// Sets current player to the proper object based on what player is active
if(currentPlayerElement.classList[0] === "player-0-panel"){
  currentPlayer = player0;
  console.log("player 1");
} else {
  currentPlayer = player1;
  console.log("player 2");
}




function hold(){
  currentPlayer.totalScore += currentPlayer.roundScore;
  
 
  if(currentPlayerElement.classList[0] === "player-0-panel"){
    document.getElementById("score-0").innerText = currentPlayer.totalScore;

  } else {
    document.getElementById("score-1").innerText = currentPlayer.totalScore;

  }


  if(currentPlayer.totalScore > 100){
    gameOver();
  } else {
    roundOver();
  }
  
}

function gameOver(){
  if(currentPlayerElement.classList[0] === "player-0-panel"){
    document.getElementById("name-0").innerText = "Winner!";
    document.getElementsByClassName("btn-roll")[0].removeEventListener("click", rollDice);
    document.getElementsByClassName("btn-hold")[0].removeEventListener("click", hold);

  } else {
    document.getElementById("name-1").innerText = "Winner!";
    document.getElementsByClassName("btn-roll")[0].removeEventListener("click", rollDice);
    document.getElementsByClassName("btn-hold")[0].removeEventListener("click", hold);
  }
}


function roundOver(currentPlyr){
  switchPlayer(currentPlyr);
  // empty current for both players, no need for an if statement
  currentPlayer.roundScore = 0;
  document.getElementById("current-0").innerText = "0";
  document.getElementById("current-1").innerText = "0";
}

function switchPlayer(){
  // switches the players at the end of the round
  document.getElementsByClassName("player-0-panel")[0].classList.toggle("active");
  document.getElementsByClassName("player-1-panel")[0].classList.toggle("active");
  //set the currentplayer to which ever is active
  currentPlayerElement = document.getElementsByClassName("active")[0];

  if(currentPlayerElement.classList[0] === "player-0-panel"){
    currentPlayer = player0;
    console.log("player 1");
  } else {
    currentPlayer = player1;
    console.log("player 2");
  }
}


function rollDice(){
  //===========gets current player=======
  // Sets current player to the proper object based on what player is active

  //===================================
  let die = 0;
  let dieStorage = 0;
  
    // Checks to see if the roll is greater than 1, adds it to the players object
    // then returns true, and displays that dice, twice.
  die1 = randomDiceGen();
  die2 = randomDiceGen();
  if(die1 > 1 && die2 > 1){
    dieStorage += die1;
    dieStorage += die2;
    
    displayDice(die1,die2);
    currentPlayer.roundScore += dieStorage;
  } else {
    currentPlayer.roundScore = 0;
    roundOver();
  }
  


  //add dieStorage to the object
  

  //Display roll in current players current point box
  if(currentPlayer.name === "player1"){
    document.getElementById("current-0").textContent = currentPlayer.roundScore;
    
  } else {
    document.getElementById("current-1").textContent = currentPlayer.roundScore;

  }
}


function randomDiceGen(){
  let x = Math.floor(Math.random() * Math.floor(6))+1;
  console.log(x)
  //displayDice(x);
  return x;
  // Mind you, it returns 0, 1, 2, 3, 4, 5, not 6!
  // I added one so it now returns 1 - 6.
}


function displayDice(diceVal1,diceVal2){
  // Add the two dice <img> with src = "" alt="Dice" class="dice"
  document.getElementsByClassName("dice")[0].setAttribute("src",`dice-${diceVal1}.png`);
  document.getElementsByClassName("dice")[1].setAttribute("src",`dice-${diceVal2}.png`);
}
function removeDice(){
  document.getElementsByClassName("wrapper").remove("dice");
}