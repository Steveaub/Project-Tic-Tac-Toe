const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const makeMove = (index, playerSymbol) => {
      if (board[index] === "") {
          board[index] = playerSymbol;
          return true; // Move was successful
      } else {
          console.log("Invalid choice, please try again");
          return false; // Move was unsuccessful
      }
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

const GameController = (() => {
  const player1 = createPlayer("Alice", "X");
  const player2 = createPlayer("Bob", "O");
  let currentPlayer = player1;

  const updateGameStatus = (message) => {
      const gameStatus = document.getElementById("gameStatus");
      gameStatus.textContent = message;
  };

  const startGame = () => {
      Gameboard.resetBoard();
      currentPlayer = player1;
      updateGameStatus("Player 1's turn");
  };

  const switchTurns = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      updateGameStatus(`Player ${currentPlayer.getName()}'s turn`);
  };

  const checkForWin = () => {
      const symbol = currentPlayer.getSymbol();
      const b = Gameboard.getBoard();

      for (let i = 0; i < 3; i++) {
          if (b[i * 3] === symbol && b[i * 3 + 1] === symbol && b[i * 3 + 2] === symbol) {
              return true;
          }
          if (b[i] === symbol && b[i + 3] === symbol && b[i + 6] === symbol) {
              return true;
          }
      }

      if (b[0] === symbol && b[4] === symbol && b[8] === symbol) return true;
      if (b[2] === symbol && b[4] === symbol && b[6] === symbol) return true;

      return false;
  };

  const checkForDraw = () => {
      return Gameboard.getBoard().every(cell => cell !== "") && !checkForWin();
  };

  const makeMove = (index) => {
      if (Gameboard.makeMove(index, currentPlayer.getSymbol())) {
          if (checkForWin()) {
              updateGameStatus(`Player ${currentPlayer.getName()} wins!`);
          } else if (checkForDraw()) {
              updateGameStatus('Game is a draw!');
          } else {
              switchTurns();
          }
      }
  };

  const resetGame = () => {
      Gameboard.resetBoard();
      startGame();
  };

  return { startGame, makeMove, switchTurns, checkForWin, checkForDraw, resetGame };
})();

// UI Interaction
document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const restartButton = document.getElementById("restartButton");

  GameController.startGame();

  cells.forEach(cell => {
      cell.addEventListener("click", () => {
          GameController.makeMove(parseInt(cell.getAttribute('data-index')));
          updateBoardUI();
      });
  });

  restartButton.addEventListener("click", () => {
      GameController.resetGame();
      updateBoardUI();
  });

  function updateBoardUI() {
      const board = Gameboard.getBoard();
      board.forEach((cell, index) => {
          cells[index].textContent = cell;
      });
  }
});
