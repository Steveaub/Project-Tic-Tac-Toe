const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const makeMove = (index, playerSymbol) => {
 if (board[index] === "") {
  board[index] = playerSymbol;

 } else {console.log("Invalid choice please try again")}

  };

  const resetBoard = () => {
    board.fill("");
  };

  return { getBoard, makeMove, resetBoard };
})();


console.log(Gameboard.getBoard())

