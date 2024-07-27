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

  getBorder() {
    const coordinates = this.getCoordinates();
    const borderCells = new Set();

    coordinates.forEach(({ row, col }) => {
      // Check all 8 possible directions around the ship's coordinates
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          // Skip the center cell (dx === 0 and dy === 0)
          if (dx === 0 && dy === 0) continue;

          const borderRow = row + dx;
          const borderCol = col + dy;
          // Add the cell to the border set
          borderCells.add(`${borderRow},${borderCol}`);
        }
      }
    });

    // Remove cells that are part of the ship itself
    coordinates.forEach(({ row, col }) => {
      borderCells.delete(`${row},${col}`);
    });

    // Inner function to filter out invalid coordinates
    const filterValidCells = (cells) => {
      return cells.filter(({ row, col }) => row >= 0 && col >= 0);
    };

    // Convert the Set to an array of objects, filter out invalid cells
    const validBorderCells = filterValidCells(
      Array.from(borderCells).map((cell) => {
        const [row, col] = cell.split(",").map(Number);
        return { row, col };
      })
    );

    return validBorderCells;
  }

  isSunk = () => this.hits === this.length;

  sink = () => (this.sunk = true);
}

export default Ship;
