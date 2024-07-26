import Gameboard from "./Gameboard";
import Cell from "./Cell";

class Player {
  constructor(board, type) {
    this.boardElement = board;
    this.cells = [];
    this.gameboard = new Gameboard();
    this.type = type;
    this.#initBoard();
  }

  #initBoard() {
    this.boardElement.style.display = "grid";
    this.boardElement.style.gridTemplateColumns = `repeat(${this.gameboard.board.length}, 1fr)`;
    this.boardElement.style.gridTemplateRows = `repeat(${this.gameboard.board.length}, 1fr)`;
    this.boardElement.style.gap = "10px";
    this.boardElement.style.placeItems = "center";

    this.updateBoard();
  }

  updateBoard() {
    for (let i = 0; i < this.gameboard.board.length; i++) {
      for (let j = 0; j < this.gameboard.board[i].length; j++) {
        const cell = new Cell(this.gameboard, this.type, i, j);
        this.cells.push(cell);
        this.boardElement.appendChild(cell.element);
      }
    }
  }

  validate() {
    const boardValid = this.gameboard.validateBoard();

    boardValid.completedShips.forEach((shipObj) => {
      for (let i = 0; i < shipObj.length; i++) {
        let currCell = null;

        if (shipObj.alignment === "vertical") {
          currCell = this.boardElement.querySelector(
            `#player-${shipObj.startIndex[0] + i}-${shipObj.startIndex[1]}`
          );
        } else {
          currCell = this.boardElement.querySelector(
            `#player-${shipObj.startIndex[0]}-${shipObj.startIndex[1] + i}`
          );
        }
        currCell.style.border = "2px solid lime";
        currCell.style.boxShadow = "2px 3px lime";
      }
    });

    boardValid.invalidIndexes.forEach((indexCouple) => {
      let currCell = this.boardElement.querySelector(
        `#player-${indexCouple[0]}-${indexCouple[1]}`
      );

      currCell.style.border = "2px solid red";
      currCell.style.boxShadow = "2px 3px red";
    });
  }
}

export default Player;
