const Game = require("./game");
const GameView = require("./gameview");

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game");
    canvas.width = 640;
    canvas.height = 500;
    ctx = canvas.getContext("2d");

    const game = new Game(canvas.height, canvas.width);
    new GameView(game, ctx, canvas.height, canvas.width).start();
});