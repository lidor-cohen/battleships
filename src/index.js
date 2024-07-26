import Player from "./js/objects/Player";
import "./js/style-loader";

const submitBoardBtn = document.getElementById("submit-board-btn");

const player = new Player(document.getElementById("playerBoard"), "player");
// const enemy = new Player(document.getElementById("playerBoard"), "player");
submitBoardBtn.addEventListener("click", () => {
  player.validate();
});
