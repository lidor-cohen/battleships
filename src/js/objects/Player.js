import Gameboard from "./Gameboard";
import Cell from "./Cell";
import ModalController from "../modalController";

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
    // Reset all previously applied styles to cells
    Array.from(this.boardElement.children).forEach((cell) => {
      cell.style.border = "2px solid black";
      cell.style.boxShadow = "2px 3px black";
    });

    const boardValid = this.gameboard.validateBoard();

    const errorList = {
      invalidIndexes: boardValid.invalidIndexes,
      adjacentShips: boardValid.validators.adjacentShips,
      rightAmountOfShips: boardValid.validators.rightAmountShips,
    };

    // Set good ships to color lime
    boardValid.completedShips.forEach((ship) => {
      ship.getCoordinates().forEach((coords) => {
        const cell = this.boardElement.querySelector(
          `#player-${coords.row}-${coords.col}`
        );

        cell.style.border = "2px solid lime";
        cell.style.boxShadow = "2px 3px lime";
      });
    });

    // Set invalid indexes to color red
    errorList.invalidIndexes.forEach((object) => {
      const cell = this.boardElement.querySelector(
        `#player-${object.row}-${object.col}`
      );

      cell.style.border = "2px solid red";
      cell.style.boxShadow = "2px 3px red";
    });

    // Set every adjacent ship to incorrent
    errorList.adjacentShips.forEach((ship) => {
      ship.getCoordinates().forEach((coords) => {
        const cell = this.boardElement.querySelector(
          `#player-${coords.row}-${coords.col}`
        );

        cell.style.border = "2px solid red";
        cell.style.boxShadow = "2px 3px red";
      });
    });

    ModalController.showErrors(errorList);
  }
}

export default Player;
