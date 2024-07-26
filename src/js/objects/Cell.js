class Cell {
  constructor(type, i, j) {
    this.parts =
      type === "player"
        ? [
            "",
            "vertical-top-ship",
            "vertical-body-ship",
            "vertical-bottom-ship",
            "horizontal-left-ship",
            "horizontal-body-ship",
            "horizontal-right-ship",
          ]
        : ["", "hit", "miss"];

    this.currPart = this.parts[0];
    this.type = type;
    this.i = i;
    this.j = j;

    this.element = this.#constructCell();
    this.#bindEvents();
  }

  #constructCell() {
    const cell = document.createElement("button");
    cell.classList.add("ship-part");
    cell.classList.add("clickable-ship-part");
    cell.classList.add(`${this.type.toLowerCase()}-ship-part`);
    cell.id = `${this.type}-${this.i}-${this.j}`;
    cell.style.cursor = "pointer";

    return cell;
  }

  #bindEvents() {
    this.element.addEventListener("click", () => {
      this.currPart = this.parts.shift();
      this.parts.push(this.currPart);
      this.currPart = this.parts[0];

      this.element.innerHTML = `<div class="${
        this.currPart.split("-")[0]
      }-ship-part-art ${this.currPart}"></div>`;

      console.log(this.currPart);

      // this.gameboard.board[i][j] = currPart;
      // console.log(currPart, parts);
    });
    this.element.addEventListener("contextmenu", (event) => {
      event.preventDefault();

      this.currPart = this.parts.pop();
      this.parts.unshift(this.currPart);
      this.currPart = this.parts[0];

      this.element.innerHTML = `<div class="${
        this.currPart.split("-")[0]
      }-ship-part-art ${this.currPart}"></div>`;

      console.log(this.currPart);

      // this.gameboard.board[i][j] = currPart;
      // console.log(currPart, parts);
    });
  }
}

export default Cell;
