class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits++;

    if (this.isSunk()) {
      this.sink();
    }
  }

  isSunk = () => this.hits === this.length;

  sink = () => (this.sunk = true);
}

module.exports = Ship;
