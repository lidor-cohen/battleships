class Gameboard {
  constructor() {
    this.board = [];
    this.hits = [];
    this.misses = [];
    this.ships = [];

    for (let i = 0; i < 10; i++) {
      this.board.push(new Array(10).fill(false));
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
}

module.exports = Gameboard;