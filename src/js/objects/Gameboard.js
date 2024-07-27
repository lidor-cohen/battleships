import Ship from "./Ship";

class Gameboard {
  constructor() {
    this.board = [];
    this.hits = [];
    this.misses = [];
    this.ships = [];

    for (let i = 0; i < 10; i++) {
      this.board.push(new Array(10).fill(null));
    }
  }

  receiveAttack(row, col) {
    const cell = this.board[row][col];
    if (cell) {
      cell.hit();
      this.hits.push([row, col]);
      return true;
    }

    this.misses.push([row, col]);
    return false;
  }

  addShip(ship, row, col) {
    this.ships.push(ship);
    this.board[row][col] = ship;
  }

  #checkBoardRules(ships) {
    // TODO: Add the rules to the game:
    //       1. No Overlapping: Ships cannot overlap each other on the grid.
    //       2. No Extending Beyond Grid: Ships must be fully within the grid boundaries.
    //       3. Straight Line: Ships must be placed either horizontally or vertically.
    //       4. No Diagonal Placement: Ships cannot be placed diagonally.
    //       5. Fixed Length: Ships must match their designated lengths (e.g., 1-cell, 2-cells, 3-cells, 4-cells, 5-cells).
    //       6. Separate Ships: Ships must be spaced apart; they cannot touch each other, even diagonally.
    //       7. 1x - Ship of 5, 1x - Ship of 4, 2x - Ship of 3, 1x - Ship of 2

    function isAdjacent() {}
  }

  #getCompletedShips(startingCoords) {
    let completedShips = [];

    // Check for completed ships and add to list - VERTICAL
    startingCoords.forEach((coords) => {
      const row = coords[0];
      const col = coords[1];

      let shipLength = 1;
      let alignment = this.board[row][col].split("-")[0];

      // Check for next position with the same orientation
      let shipPart =
        alignment === "vertical"
          ? this.board[row + shipLength][col]
          : this.board[row][col + shipLength];
      while (shipPart !== null) {
        const shipPartAlignment = shipPart.split("-")[0];
        const shipPartPosition = shipPart.split("-")[1];

        if (shipPartAlignment === "vertical") {
          if (shipPartPosition === "body") {
            shipLength++;
            shipPart = this.board[row + shipLength][col];
          } else if (shipPartPosition === "bottom") {
            completedShips.push(new Ship(row, col, shipLength + 1, "vertical"));
            break;
          } else {
            break;
          }
        } else if (shipPartAlignment === "horizontal") {
          if (shipPartPosition === "body") {
            shipLength++;
            shipPart = this.board[row][col + shipLength];
          } else if (shipPartPosition === "right") {
            completedShips.push(
              new Ship(row, col, shipLength + 1, "horizontal")
            );
            break;
          } else {
            break;
          }
        }
      }
    });

    return completedShips;
  }

  #getShipStarts() {
    let shipStarts = [];

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        const cell = this.board[i][j];

        if (cell != null) {
          if (cell.split("-")[1] === "left" || cell.split("-")[1] === "top") {
            shipStarts.push([i, j]);
          }
        }
      }
    }

    return shipStarts;
  }

  validateBoard() {
    let validIndexes = [];
    let invalidIndexes = [];

    // Check for ship starts
    let shipStarts = this.#getShipStarts();

    // Add all completed ships to list of valid indexes
    let completedShips = this.#getCompletedShips(shipStarts);
    completedShips.forEach((ship) => validIndexes.push(ship.getCoordinates()));

    function arrayIncludes(arr, obj) {
      arr.forEach((coords) => {
        if (coords.row === obj.row && coords.col === obj.col) return true;
      });
      return false;
    }

    // Add all parts that arent part of a ship to list of invalid indexes
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        const indexObj = { row: i, col: j };

        if (
          this.board[i][j] !== null &&
          !arrayIncludes(validIndexes, indexObj)
        ) {
          invalidIndexes.push(indexObj);
        }
      }
    }

    return { completedShips, invalidIndexes };
  }

  checkForShip = (row, col) => this.board[row][col] !== null;
  allShipsSunk = () => this.ships.every((item) => item.isSunk());
}

export default Gameboard;
