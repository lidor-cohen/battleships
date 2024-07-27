import ModalController from "./js/modalController";
import Player from "./js/objects/Player";
import "./js/style-loader";

const submitBoardBtn = document.getElementById("submit-board-btn");
ModalController.bindEvents();

const player = new Player(document.getElementById("playerBoard"), "player");
// const enemy = new Player(document.getElementById("playerBoard"), "player");
submitBoardBtn.addEventListener("click", () => {
  player.validate();
});
