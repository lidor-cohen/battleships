class Ship {
  constructor(row, col, length, alignment) {
    this.row = row;
    this.col = col;
    this.length = length;
    this.alignment = alignment;

    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits++;

    if (this.isSunk()) {
      this.sink();
    }
  }

  getCoordinates() {
    const coordinates = [];
    for (let i = 0; i < this.length; i++) {
      const row = this.alignment === "vertical" ? this.row + i : this.row;
      const col = this.alignment === "vertical" ? this.col : this.col + i;
      coordinates.push({ row, col });
    }
    return coordinates;
  }

  isSunk = () => this.hits === this.length;

  sink = () => (this.sunk = true);
}

export default Ship;
