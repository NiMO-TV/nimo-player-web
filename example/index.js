import Player from "../index.js";

const player = new Player({
  uid: "iframe1",
});

player.init({
  container: document.getElementById("iframe"),
});

document.getElementById("play-btn").addEventListener("click", () => {
  player.play();
});

document.getElementById("pause-btn").addEventListener("click", () => {
  player.pause();
});

document.getElementById("get-player-state-btn").addEventListener("click", () => {
  player.getState();
});
