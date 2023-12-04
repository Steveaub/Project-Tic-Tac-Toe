
function updateBoardUI() {
  const board = Gameboard.getBoard();
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
      cell.textContent = board[index];
      cell.disabled = board[index] !== ""; // Disable the cell if it's already been played
  });
}

const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => [...board];  // Return a copy of the board to prevent direct mutation

  const makeMove = (index, playerSymbol) => {
      if (board[index] === "") {
          board[index] = playerSymbol;
          return true;  // Move was successful
      }
      return false;  // Move was unsuccessful
  };

  const resetBoard = () => {
      board.fill("");
  };

  return { getBoard, makeMove, resetBoard };
})();

function createPlayer(name, symbol) {
  return {
      name,
      symbol,
      getName: () => name,
      getSymbol: () => symbol,
  };
}

const GameController = (() => {
  let player1, player2;
  let currentPlayer;

  const updateGameStatus = (message) => {
      const gameStatus = document.getElementById("gameStatus");
      gameStatus.textContent = message;
  };

  const startGame = () => {
      player1 = createPlayer(document.getElementById('player1Name').value || "Player 1", "X");
      player2 = createPlayer(document.getElementById('player2Name').value || "Player 2", "O");
      currentPlayer = player1;
      Gameboard.resetBoard();
      updateGameStatus(`${currentPlayer.getName()}'s turn`);
      document.getElementById('playerSetup').style.display = 'none';  // Hide setup fields
      updateBoardUI();
  };

  const switchTurns = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      updateGameStatus(`${currentPlayer.getName()}'s turn`);
  };

  const makeMove = (index) => {
      if (Gameboard.makeMove(index, currentPlayer.getSymbol())) {
          updateBoardUI();
          if (checkForWin()) {
              updateGameStatus(`${currentPlayer.getName()} wins!`);
              endGame();
          } else if (checkForDraw()) {
              updateGameStatus('Game is a draw!');
              endGame();
          } else {
              switchTurns();
          }
      }
  };

  const checkForWin = () => {
      const b = Gameboard.getBoard();
      const s = currentPlayer.getSymbol();
      const winConditions = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
          [0, 4, 8], [2, 4, 6]              // Diagonals
      ];
      return winConditions.some(condition => 
          condition.every(index => b[index] === s));
  };

  const checkForDraw = () => {
      return Gameboard.getBoard().every(cell => cell !== "") && !checkForWin();
  };

  const endGame = () => {
      document.querySelectorAll('.cell').forEach(cell => cell.disabled = true);
  };

  const resetGame = () => {
      Gameboard.resetBoard();
      document.querySelectorAll('.cell').forEach(cell => cell.disabled = false);
      startGame();  // Begin a new game
  };

  return { startGame, makeMove, switchTurns, checkForWin, checkForDraw, resetGame };
})();

// UI Interaction
document.addEventListener("DOMContentLoaded", () => {
  const startGameButton = document.getElementById('startGameButton');
  const restartButton = document.getElementById('restartButton');

  startGameButton.addEventListener('click', GameController.startGame);
  restartButton.addEventListener('click', GameController.resetGame);

  document.querySelectorAll(".cell").forEach(cell => {
      cell.addEventListener('click', (e) => {
          const index = parseInt(e.target.getAttribute('data-index'));
          GameController.makeMove(index);
      });
  });
});