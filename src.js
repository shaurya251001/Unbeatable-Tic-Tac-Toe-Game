let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const checkWin = (board, moveSymbol) => {
  if (
    (board[0] == moveSymbol &&
      board[4] == moveSymbol &&
      board[8] == moveSymbol) ||
    (board[2] == moveSymbol &&
      board[4] == moveSymbol &&
      board[6] == moveSymbol) ||
    (board[0] == moveSymbol &&
      board[1] == moveSymbol &&
      board[2] == moveSymbol) ||
    (board[3] == moveSymbol &&
      board[4] == moveSymbol &&
      board[5] == moveSymbol) ||
    (board[6] == moveSymbol &&
      board[7] == moveSymbol &&
      board[8] == moveSymbol) ||
    (board[0] == moveSymbol &&
      board[3] == moveSymbol &&
      board[6] == moveSymbol) ||
    (board[1] == moveSymbol &&
      board[4] == moveSymbol &&
      board[7] == moveSymbol) ||
    (board[2] == moveSymbol && board[5] == moveSymbol && board[8] == moveSymbol)
  ) {
    return true;
  } else {
    return false;
  }
};
const filterEmpty = (board) => {
  return board.filter((move) => move != "X" && move != "O");
};
const clearBoard = () => {
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  boxes.forEach((box) => {
    box.textContent = "-";
  });
};

const main = () => {
  const minimax = (dupBoard, player) => {
    const emptyCells = filterEmpty(dupBoard);
    if (checkWin(dupBoard, "X")) {
      return { score: -10 };
    } else if (checkWin(dupBoard, "O")) {
      return { score: 10 };
    } else if (emptyCells.length === 0) {
      return { score: 0 };
    }
    let moves = [];

    for (let i = 0; i < emptyCells.length; i++) {
      let move = {};
      move.index = dupBoard[emptyCells[i]];

      dupBoard[emptyCells[i]] = player;

      if (player == "O") {
        var result = minimax(dupBoard, "X");
        move.score = result.score;
      } else {
        var result = minimax(dupBoard, "O");
        move.score = result.score;
      }

      dupBoard[emptyCells[i]] = move.index;

      moves.push(move);
    }

    let bestMove;
    if (player === "O") {
      let bestScore = -100;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 100;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  };

  let bestMove = minimax(board, "O");

  board[bestMove.index] = "O";
  boxes[bestMove.index].textContent = "O";
};

const boxes = document.querySelectorAll(".box");
console.log(boxes);

boxes.forEach((box, key) => {
  box.addEventListener("click", () => {
    if (box.textContent === "-") {
      box.textContent = "X";
      board[key] = "X";
      if (filterEmpty(board).length === 0) {
        alert("It is a tie!");
        clearBoard();
      } else {
        main();
        if (checkWin(board, "O")) {
          alert("Computer Wins!");
          clearBoard();
        }
      }
    }
  });
});
