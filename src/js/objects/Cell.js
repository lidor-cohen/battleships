class Cell {
  constructor(type, i, j) {
    const cell = document.createElement("button");
    cell.classList.add("ship-part");
    cell.classList.add("clickable-ship-part");
    cell.classList.add(`${type.toLowerCase()}-ship-part`);
    cell.id = `${type}-${i}-${j}`;
    cell.style.cursor = "pointer";

    this.element = cell;
    this.#bindEvents();
    this.i = i;
    this.j = j;

    this.parts =
      type === "player"
        ? [
            "vertical-top-ship",
            "vertical-body-ship",
            "vertical-bottom-ship",
            "horizontal-left-ship",
            "horizontal-body-ship",
            "horizontal-right-ship",
            "",
          ]
        : ["", "hit", "miss"];
  }

  #bindEvents() {
    this.element.addEventListener("click", () => {
      let currPart = this.parts.shift();
      this.parts.push(currPart);
      this.element.innerHTML = `<div class="${
        currPart.split("-")[0]
      }-ship-part-art ${currPart}"></div>`;

      // this.gameboard.board[i][j] = currPart;
      // console.log(currPart, parts);
    });
  }
}

export default Cell;
