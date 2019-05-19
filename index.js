const Game = require("./game");
const GameView = require("./gameview");

document.addEventListener("DOMContentLoaded", () => {
    
    const canvas = document.getElementById("game");
    if(canvas !== null){
        canvas.width = 640;
        canvas.height = 500;
        ctx = canvas.getContext("2d");

        const game = new Game(canvas.height, canvas.width);
        const gameView = new GameView(game, ctx, canvas.height, canvas.width).start();
    }else{
        const canvas = document.getElementById("mobilegame");
        canvas.width = 640;
        canvas.height = 700;
        ctx = canvas.getContext("2d");
        
        const game = new Game(canvas.height, canvas.width);
        const gameView = new GameView(game, ctx, canvas.height, canvas.width).start();
    }

});