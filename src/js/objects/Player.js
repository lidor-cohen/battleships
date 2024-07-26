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
    this.boardElement.style.placeItems = "center";

    this.updateBoard();
  }

  updateBoard() {
    for (let i = 0; i < this.gameboard.board.length; i++) {
      for (let j = 0; j < this.gameboard.board[i].length; j++) {
        const cell = new Cell(this.type, i, j);
        this.cells.push(cell);
        this.boardElement.appendChild(cell.element);
      }
    }
  }
}

export default Player;
