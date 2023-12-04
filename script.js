const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const makeMove = (index, playerSymbol) => {
 if (board[index] === "") {
  board[index] = playerSymbol;

 } else {console.log("Invalid choice please try again")}
return playerSymbol
  };

  const resetBoard = () => {
    board.fill("");
  };

  return { getBoard, makeMove, resetBoard };
})();

function createPlayer(name, symbol) {
  
  return {
      getName: () => name,
      getSymbol: () => symbol,
      
  };
}


// Usage
const player1 = createPlayer("Alice", "X");
const player2 = createPlayer("Bob", "O");

console.log(player1.getName());

const GameController = (() => {
  let currentPlayer;

  const startGame = () => {
    Gameboard.resetBoard();
    currentPlayer = player1; 
  };
  const makeMove = (index) => {
    if (Gameboard.makeMove(index, currentPlayer.getSymbol())) {
        if (checkForWin()) {
            // Handle win
        } else if (checkForDraw()) {
            // Handle draw
        } else {
            switchTurns();
        }
    }
};
const switchTurns = () => {
  currentPlayer = (currentPlayer === player1) ? player2 : player1;
  
};

const checkForWin = () => {
  const symbol = currentPlayer.getSymbol();
  
  for (let i = 0; i < 3; i++) {
      if (board[i * 3] === symbol && board[i * 3 + 1] === symbol && board[i * 3 + 2] === symbol) {
          return true;
      }
  }
 

    if (board[0] === symbol && board[4] === symbol && board[8] === symbol) {
      return true;
  }
  if (board[2] === symbol && board[4] === symbol && board[6] === symbol) {
      return true;
  }

  return false; 

};


const checkForDraw = () => {
  const isBoardFull = board.every(cell => cell !== "");

  const noWinner = !checkForWin();

  return isBoardFull && noWinner;
};


  const resetGame = () => {
    Gameboard.resetBoard();
    startGame()
  };

  return { startGame, switchTurns, checkForWin, checkForDraw, resetGame };
})();


console.log(Gameboard.getBoard())
console.log(Gameboard.makeMove(0, "X"));
console.log(Gameboard.getBoard());
