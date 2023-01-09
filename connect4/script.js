var playerRed = 'R';
var playerYellow = 'Y';
var pCurrent = playerRed;

var redWins = 0
var yellowWins = 0

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = [];

document.getElementById('Current-Player').innerHTML = "Player Red's Turn"
document.getElementById("Current-Player").style.color = "red";

window.onload = function() {
  setGame();
  addEventListeners();
}
// This function sets the game
function setGame() {
  board = []; // creates empty board
  currColumns = [5, 5, 5, 5, 5, 5, 5] //Sets all columns to be able to take 5 pieces
 //creating game board
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(' ');
      let checker = document.createElement('div');
      checker.id = r.toString() + "-" + c.toString();
      checker.classList.add("checker");
      checker.addEventListener("click", setPiece);
      document.getElementById("board").append(checker);
    }
    board.push(row);
  }
}
// This function is called when a player clicks on a cell
function setPiece() {
  //checking if game is already finished
  if (gameOver == false) {
    displayplayer();//displays/updattes current player by calling function
    
    // Gets the row and column indices of the clicked cell
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    
    // Get the lowest available row in the selected column using currColumn list
    r = currColumns[c];
    //if that value is 0 that column is full and the function doesnt do anything 
    if (r < 0) {
      return;
    }
    // Place the current player's piece in the board and update the column height
    board[r][c] = pCurrent;
    let checker = document.getElementById(r.toString() + "-" + c.toString())

    if (pCurrent == playerRed) {
      checker.classList.add("red-piece");
      pCurrent = playerYellow;
    } else {
      checker.classList.add("yellow-piece");
      pCurrent = playerRed;
    }
    //update how many more pieces that row can take 
    r = r - 1 
    currColumns[c] = r;
    // Check if the current player has won the game
    checkWinner();
    // If no winner was found, check if the game is a draw
    checkForDraw();
  }

  else {
    return;
  }
}
// Check the board for a winning combination of four pieces
function checkWinner() {
  //Horizonal check
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        // Check if there are four consecutive cells with the same player's
        //If yes call's set winner
        if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
  //Vertical check
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] != ' ') {
        // Check if there are four consecutive cells with the same player's
        //If yes call's set winner
        if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
// anti diagonal
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != ' ') {
        // Check if there are four consecutive cells with the same player's
        //If yes call's set winner
        if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
//diagonal
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != ' ') {
        // Check if there are four consecutive cells with the same player's
        //If yes call's set winner
        if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}
//Function that sets winner
function setWinner(r, c) {
  let winner = document.getElementById('winner');
  //check color of peice and display winner and update counter
  if (board[r][c] == playerRed) {
    winner.innerText = 'Red Wins!!!!'
    document.getElementById('winner').style.color = "red";
    redWins = redWins + 1 //win tracker 
  }

  else if (board[r][c] == playerYellow){
    winner.innerText = 'Yellow Wins!!!!';
    yellowWins = yellowWins + 1;
    document.getElementById('winner').style.color = "#F6BE00";
  }
  //game over and set the end game data
  document.getElementById('Current-Player').innerHTML = "Game Over!!!";
  gameOver = true;
  document.getElementById("score").innerHTML = "Score: Red: " + redWins + " Yellow: " + yellowWins;
  document.querySelector('.end').classList.add('visible');

}

//Checks if board is filled
function checkForDraw() {
  //runs through the board if even one cell is empty if breaks  
  let isBoardFilled = true;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == ' ') {
        isBoardFilled = false;
        break;
      }
    }
  }
 //if it is filled the game is over and the game over container appears
  if (isBoardFilled) {
    
    document.getElementById('winner').innerHTML = "The match ended in a draw!";
    document.getElementById('Current-Player').innerHTML = "Game Over!!!";
    document.getElementById("score").innerHTML = "Score: Red: " + redWins + " Yellow: " + yellowWins;
    document.querySelector('.end').classList.add('visible');
        gameOver = true;
  } 
}
//this funnction displays what players turn it is
function displayplayer() {
 // if game over display no player, display game over
  if (gameOver) {
    document.getElementById('Current-Player').innerHTML = "Game Over!!!"
  }

  else {
    //check what players turn ended and display opposite player with text in their color
    if (pCurrent === playerRed) {
        document.getElementById("Current-Player").innerHTML = "Player Yellow's Turn";
        document.getElementById("Current-Player").style.color = "#F6BE00";
    } else {
        document.getElementById("Current-Player").innerHTML = "Player Red's Turn";
        document.getElementById("Current-Player").style.color = "red";
    }
  }
}
//even listener for the play again botton, ig clicekd call reset game
function addEventListeners() {
  document.querySelector('.play-again').addEventListener('click', resetGame);
}

//Bassically resets the whole game and calls setGame
function resetGame() {
  document.querySelector('.end').classList.remove('visible');
  gameOver = false;
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];
  pCurrent = playerRed;
 
  document.getElementById('board').innerHTML = '';
  document.getElementById('winner').innerHTML = '';
  document.getElementById('Current-Player').innerHTML = "Player Red's Turn";
  document.getElementById("Current-Player").style.color = "red";

  setGame();
}