import Gameboard from "./Gameboard";

class Player {
  constructor(board) {
    this.boardElement = board;
    this.gameboard = new Gameboard();
    this.#initBoard();
  }

  #initBoard() {
    this.boardElement.style.display = "grid";
    this.boardElement.style.gridTemplateColumns = `repeat(${this.gameboard.board.length}, 1fr)`;
    this.boardElement.style.gridTemplateRows = `repeat(${this.gameboard.board.length}, 1fr)`;

    for (let i = 0; i < this.gameboard.board.length; i++) {
      for (let j = 0; j < this.gameboard.board[i].length; j++) {
        const cell = document.createElement("button");
        cell.classList.add("ship-part");
        cell.classList.add("clickableShipPart");
        cell.style.cursor = "pointer";

        const cellContent = document.createElement("h1");
        cellContent.textContent = this.gameboard.board[i][j];

        this.boardElement.appendChild(cell);
      }
    }
  }

  updateBoard() {}
}

export default Player;
