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

  validateBoard() {
    function arraysEqual(a, b) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    function arrayIncludes(arr, subArray) {
      return arr.some((element) => arraysEqual(element, subArray));
    }

    let completedShips = [];
    let horizontalShipStarts = [];
    let verticalShipStarts = [];

    let validIndexes = [];
    let invalidIndexes = [];

    // Check for ship starts
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        const cell = this.board[i][j];

        if (cell !== null) {
          const alignment = cell.split("-")[0];

          if (alignment === "horizontal") {
            if (cell.split("-")[1] === "left") {
              horizontalShipStarts.push([i, j]);
            }
          } else if (alignment === "vertical") {
            if (cell.split("-")[1] === "top") {
              verticalShipStarts.push([i, j]);
            }
          }
        }
      }
    }

    // Check for completed ships and add to list - VERTICAL
    verticalShipStarts.forEach((indexes) => {
      const row = indexes[0];
      const col = indexes[1];

      let forwardIndex = 1;
      let shipLength = 1;

      let shipPart = this.board[row + forwardIndex][col];
      while (shipPart !== null) {
        shipPart = this.board[row + forwardIndex][col];
        const shipPartAlignment = shipPart.split("-")[0];
        const shipPartPosition = shipPart.split("-")[1];

        if (shipPartAlignment === "vertical") {
          if (shipPartPosition === "body") {
            shipLength++;
            forwardIndex++;
          } else if (shipPartPosition === "bottom") {
            completedShips.push({
              alignment: "vertical",
              startIndex: [row, col],
              endIndex: [row + forwardIndex, col],
              length: shipLength + 1,
            });

            break;
          } else {
            break;
          }
        }
      }
    });

    // Check for completed ships and add to list - HORIZONTAL
    horizontalShipStarts.forEach((indexes) => {
      const row = indexes[0];
      const col = indexes[1];

      let forwardIndex = 1;
      let shipLength = 1;

      let shipPart = this.board[row][col + forwardIndex];
      while (shipPart !== null) {
        shipPart = this.board[row][col + forwardIndex];
        const shipPartAlignment = shipPart.split("-")[0];
        const shipPartPosition = shipPart.split("-")[1];

        if (shipPartAlignment === "horizontal") {
          if (shipPartPosition === "body") {
            shipLength++;
            forwardIndex++;
          } else if (shipPartPosition === "right") {
            completedShips.push({
              alignment: "horizontal",
              startIndex: [row, col],
              endIndex: [row, col + forwardIndex],
              length: shipLength + 1,
            });

            break;
          } else {
            break;
          }
        }
      }
    });

    console.log("completedShips:");
    console.log(completedShips);

    // Add all ships to list of valid indexes
    completedShips.forEach((shipObj) => {
      if (shipObj.alignment === "horizontal") {
        for (let i = 0; i < shipObj.length; i++) {
          validIndexes.push([shipObj.startIndex[0], shipObj.startIndex[1] + i]);
        }
      } else {
        for (let i = 0; i < shipObj.length; i++) {
          validIndexes.push([shipObj.startIndex[0] + i, shipObj.startIndex[1]]);
        }
      }
    });

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[i][j] !== null && !arrayIncludes(validIndexes, [i, j])) {
          invalidIndexes.push([i, j]);
        }
      }
    }

    console.log(invalidIndexes);
  }

  checkForShip = (row, col) => this.board[row][col] !== null;
  allShipsSunk = () => this.ships.every((item) => item.isSunk());
}

export default Gameboard;
