/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
/**=====MABIES=====
 * If I had a function that is called updatePlayer, checks which player it is, then updates their
 * score would save me having to add a ton of shit. remember to remove the check in the rest of the code if 
 * you do this.
 * 
 * add a round counter in the end round function?
 * add a wins counter for each player.
 * 
 * Display (current) score, whether that's 0 or an actual num ==at the end of the roll die event==.
 * actually maybe not... Add it in the if statement for now, check later.
 * 
 * add "you bust!" in roll dice event if player gets a one, in the if statement
 * 
 * If there's an event that allows you to check to see if a class changes: so that I could put that player check in that instead of all the event listeners
 */

//===On start up===

// No dice are visible,
// is player ones turn
// Events exist (and are applied to the current player.)
//(i.e. check and set current player, and allow the rest of the code to just apply things dynamicaly)

//RollDice: 
// randomNumGenerator, 
// update the dice images with the two dice nums
// if one of the dice is 1, display the animation to the one die, wait 2 seconds, then use endCrntPlayersTurn
// ELSE add both die nums and update the currentplayers "current-points" 

//HOLD:
// Add the current players round score (current score) to the player total game score.
// Then set the current players (current score) to 0 (i.e use endCrntPlayersTurn)
// Update HTML for both scores
// check if the players total score is greater than 100, if so, the current player wins add function for gameOver?

//NewGame:
// On eventClick of new game,
// reset player name span back to players name (incase of a winnner) 
// Also make roll dice and hold reappear (again, incase of a winner)
// reset: totalScore && roundScore for both players,
// set currentPlayer to P1,

//Function: EndCrntPlayersTurn
// sets current players (current score) to 0;
// and sets current player, to the opposite player.

/**
 * Todo:
 * On game startup -> have  a model show up, showing the rules and ask for the top score + how many games.
 * 
 * On player hiting a 1, do *something*
 * 
 * on roundWin, model, *Blah* wins the round!
 * Count round wins
 * on gameWin, model, *Blah* wins the game!
 * 
 * Add best of game score
 * add model on hitting a 1
 * add model on game win.
 */


//Players
let player0 = {
  name: "player0",
  totalScore: 0,
  roundScore: 0, //current score
  roundWins: 0,
  classPanel: "player-0-panel",
  currentScoreID: "current-0",
  totalScoreID: "score-0",

  isTurn: true,
}
let player1 = {
  name: "player1",
  totalScore: 0,
  roundScore: 0, //current score
  roundWins: 0,
  classPanel: "player-1-panel",
  currentScoreID: "current-1",
  totalScoreID: "score-1",
  
  isTurn: false,
}
//================Game Start===================
// MODAL STUFFS
//================Game start Modal================
let maxGameScore = 100;
let rounds = 1;
document.getElementById("maxTotalScore").value = maxGameScore;
document.getElementById("rounds").value = rounds;
// Get the modal
let modal = document.getElementById("gameStartModal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let modalSubmit = document.getElementById("modalSubmit");

// When the user clicks on the button, open the modal 
function startModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.addEventListener("click",function() {
  // The game needs to begin, so if the player clicks x it just does the same as "begin"
  modal.style.display = "none";
  newGame();

  document.getElementById("maxGameScoreDisplay").innerHTML = `Max Score: ${maxGameScore}`;
  document.getElementById("roundsDisplay").innerHTML = `Rounds: ${rounds}`;
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

modalSubmit.addEventListener("click", function(){
  modal.style.display = "none";
  newGame();
  // prolly should adjust the game here with the new maxGameScore and rounds
});

startModal();


//===============Rolling a 1 modal====================
let roll1Modal = document.getElementById("rolledAOneModal");
let rndCntSubmit = document.getElementById("modalRoundContinue");

function rolledAOne() {
  roll1Modal.style.display = "block";
}

span.addEventListener("click",function() {
  roll1Modal.style.display = "none";
});

rndCntSubmit.addEventListener("click", function(){
  roll1Modal.style.display = "none";
  endCrntPlayersTurn();
  // prolly should adjust the game here with the new maxGameScore and rounds
});


//===============Winning the game modal=================
let gameOverModal = document.getElementById("gameOverModalID");
let newGameSubmit = document.getElementById("modalNewGame");

function gameOverModalF() {
  document.getElementById("maxGameScoreDisplay").style.display = "none";
  document.getElementById("roundsDisplay").style.display = "none";
  gameOverModal.style.display = "block";
  if(player0.isTurn) {
    document.getElementById("playerName").innerText = `PLAYER1 Wins! with best of ${currentPlayer.roundWins}`;
  } else {
    document.getElementById("playerName").innerText = `PLAYER2 Wins! with best of ${currentPlayer.roundWins}`;
  }
  
}

span.addEventListener("click",function() {
  gameOverModal.style.display = "none";
});

newGameSubmit.addEventListener("click", function(){
  gameOverModal.style.display = "none";
  startModal();
  // prolly should adjust the game here with the new maxGameScore and rounds
});




//game start==================================


// Get current player; 
//it has to be in any event listener, downside to this way to code.
let currentPlayer;
document.getElementById("dice-1").style.display = "none";
document.getElementById("dice-2").style.display = "none";


// RollDice event
document.getElementsByClassName("btn-roll")[0].addEventListener("click", function (){
  // have to set the current player everytime in all events,
  if(player0.isTurn) {
    currentPlayer = player0;
  } else {
    currentPlayer = player1;
  }
  // gets two random die nums.
  let die1 = randomDiceGen();
  let die2 = randomDiceGen();

  // update the die images, re enabling them, then changing the source.
  document.getElementById("dice-1").style.display = "block";
  document.getElementById("dice-1").setAttribute("src",`dice-${die1}.png`);
  document.getElementById("dice-2").style.display = "block";
  document.getElementById("dice-2").setAttribute("src",`dice-${die2}.png`);


  if(die1 === 1 || die2 === 1){
    // Sets (current) score to 0
    currentPlayer.roundScore = 0;

    // Update current players (current) score
    document.getElementById(currentPlayer.currentScoreID).textContent = currentPlayer.roundScore;

    // Add time out here for the ===BUST===

    //  Roll a one modal
    rolledAOne();
    // End current players turn
    
    
  } else {
    // adds both dice together, then updates (current) score.
    currentPlayer.roundScore += (die1 + die2);
    // Update current players (current) score
    document.getElementById(currentPlayer.currentScoreID).textContent = currentPlayer.roundScore;
  }
})


// Hold event
document.getElementsByClassName("btn-hold")[0].addEventListener("click", function (){
  // have to set the current player everytime in all events,
  if(player0.isTurn) {
    currentPlayer = player0;
  } else {
    currentPlayer = player1;
  }

  // Add the current players round score (current score) to the player total game score.
  currentPlayer.totalScore += currentPlayer.roundScore;
  
  // Then set the current players (current score) to 0 (i.e use endCrntPlayersTurn)
  currentPlayer.roundScore = 0;

  // Update the html for total and round score
  document.getElementById(currentPlayer.currentScoreID).textContent = currentPlayer.roundScore;
  document.getElementById(currentPlayer.totalScoreID).textContent = currentPlayer.totalScore;

  if(currentPlayer.totalScore >= maxGameScore){
    // End game
    currentPlayer.roundWins++;
    // Add the "Best of (rounds) function in here"
    // say we have 5 rounds, if a player wins 3, he wins, because
    // it's impossible for the other player to win by rounds at that point.
    if(currentPlayer.roundWins >= Math.ceil(rounds/2)){
      if(player0.isTurn) {
        // Update HTML
        document.getElementById("round-score-0").innerText = currentPlayer.roundWins;
        // round over, like gameover but doesnt end the game, 
      } else {
        // Update HTML
        document.getElementById("round-score-1").innerText = currentPlayer.roundWins;
      }
      gameOverModalF();
    } else {
      // update player round wins
      if(player0.isTurn) {
        // Update HTML
        document.getElementById("round-score-0").innerText = currentPlayer.roundWins;
        // round over, like gameover but doesnt end the game, 
        roundOver();

      } else {
        // Update HTML
        document.getElementById("round-score-1").innerText = currentPlayer.roundWins;
        roundOver();

      }
    }
    
  } else {
    // End turn
    endCrntPlayersTurn()
  }
});

// New game event
document.getElementsByClassName("btn-new")[0].addEventListener("click", function(){
  startModal();
});

function newGame(){
  maxGameScore = document.getElementById("maxTotalScore").value;
  rounds = document.getElementById("rounds").value;
  
  document.getElementById("maxGameScoreDisplay").innerHTML = `Max Score: ${maxGameScore}`;
  document.getElementById("roundsDisplay").innerHTML = `Rounds: ${rounds}`;

  document.getElementById("maxGameScoreDisplay").style.display = "block";
  document.getElementById("roundsDisplay").style.display = "block";

  // reset player name span back to players name (incase of a winner) 
  document.getElementById("name-0").innerText = "Player 1";
  document.getElementById("name-1").innerText = "Player 2";
  // Also make roll dice and hold reappear (again, incase of a winner)
  document.getElementsByClassName("btn-hold")[0].style.display = "block";
  document.getElementsByClassName("btn-roll")[0].style.display = "block";
  // Hide the dice for whatever reason.. 
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
  // reset: totalScore && roundScore for both players,
  player0.roundScore = 0;
  player0.totalScore = 0;
  player1.roundScore = 0;
  player1.totalScore = 0;
  // Because of the new round score counter, we need to reset it
  player0.roundWins = 0;
  player1.roundWins = 0;

  // update the html for both players
  document.getElementById("current-0").textContent = player0.roundScore;
  document.getElementById("score-0").textContent = player0.totalScore;
  document.getElementById("round-score-0").textContent = player0.roundWins;

  document.getElementById("current-1").textContent = player1.roundScore;
  document.getElementById("score-1").textContent = player1.totalScore;
  document.getElementById("round-score-1").textContent = player1.roundWins;

  
  document.getElementById("round-score-0");

  // set currentPlayer to P1
  player0.isTurn = true;
  player1.isTurn = false;
  document.getElementsByClassName("player-0-panel")[0].classList.add("active");
  document.getElementsByClassName("player-1-panel")[0].classList.remove("active");
}


function endCrntPlayersTurn(){
  // set current player round score to 0
  // currentPlayer.roundScore = 0;

  //check which player it is, and swap currentPlayer to the other player "ending" the round.
  if(currentPlayer.name === "player0"){
    player0.isTurn = false;
    player1.isTurn = true;
    document.getElementsByClassName("player-0-panel")[0].classList.toggle("active");
    document.getElementsByClassName("player-1-panel")[0].classList.toggle("active");

  } else {
    player1.isTurn = false;
    player0.isTurn = true;
    document.getElementsByClassName("player-0-panel")[0].classList.toggle("active");
    document.getElementsByClassName("player-1-panel")[0].classList.toggle("active");

  }
}


function randomDiceGen(){
  let x = Math.floor(Math.random() * Math.floor(6))+1;
  console.log(x)
  return x;
  // returns 1 - 6.
}


function gameOver(){
  //change the name plates (span) to the winner!
  if(currentPlayer.name === "player0"){
    // Player1(0) Wins!
    document.getElementById("name-0").innerText = "Winner!";

  } else {
    // Player2(1) Wins!
    document.getElementById("name-1").innerText = "Winner!";
    
  }
  //hide the roll dice and hold buttons
  document.querySelector(".btn-newRnd").style.display = "none";
  document.getElementsByClassName("btn-hold")[0].style.display = "none";
  document.getElementsByClassName("btn-roll")[0].style.display = "none";
}


function roundOver(){
  if(currentPlayer.name === "player0"){
    // Player1(0) Wins!
    document.getElementById("name-0").innerText = "Winner!";

  } else {
    // Player2(1) Wins!
    document.getElementById("name-1").innerText = "Winner!";
    
  }
  //hide the roll dice and hold buttons
  document.querySelector(".btn-newRnd").style.display = "block";
  document.getElementsByClassName("btn-hold")[0].style.display = "none";
  document.getElementsByClassName("btn-roll")[0].style.display = "none";

  // THE EVENT LISTENER for THE NEW RND BUTTON
  document.querySelector(".btn-newRnd").addEventListener("click", function(){
    // reset player name span back to players name (incase of a winner) 
    document.getElementById("name-0").innerText = "Player 1";
    document.getElementById("name-1").innerText = "Player 2";
    // Also make roll dice and hold reappear; and make the new round disappear (again, incase of a winner)
    document.querySelector(".btn-newRnd").style.display = "none";
    document.getElementsByClassName("btn-hold")[0].style.display = "block";
    document.getElementsByClassName("btn-roll")[0].style.display = "block";
    // Hide the dice for whatever reason.. 
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
    // reset: totalScore && roundScore for both players,
    player0.roundScore = 0;
    player0.totalScore = 0;
    player1.roundScore = 0;
    player1.totalScore = 0;
    // update the html for both players
    document.getElementById("current-0").textContent = player0.roundScore;
    document.getElementById("score-0").textContent = player0.totalScore;
  
    document.getElementById("current-1").textContent = player1.roundScore;
    document.getElementById("score-1").textContent = player1.totalScore;
  
    // set currentPlayer to P1
    player0.isTurn = true;
    player1.isTurn = false;
    document.getElementsByClassName("player-0-panel")[0].classList.add("active");
    document.getElementsByClassName("player-1-panel")[0].classList.remove("active");
  });
}