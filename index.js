const Game = require("./game");
const GameView = require("./gameview");

document.addEventListener("DOMContentLoaded", () => {
    
    const canvas = document.getElementById("game");
    if(canvas !== null){
        canvas.width = 640;
        canvas.height = 500;
        ctx = canvas.getContext("2d");
        fetchScores();

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

fetchScores = () => {
    document.getElementById('table').innerHTML = "<tr>LOADING SCORES...</tr>";
    fetch('/api/scores').then(res =>
            res.json()
        )
        .then( response => {
            let scores = (response);
            console.log(scores);
            let tableEntries = "";
            scores.forEach(score => {
                let date = new Date(score.date)
                date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

                tableEntries += ' <tr><td>' + score.score + '</td><td>' + score.name + '</td><td>' + date + '</td></tr>'
            });
            document.getElementById('table').innerHTML = tableEntries;
        });
};

fetchPost = (name, score) => {
    fetch("/api/scores", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: name, score: score})
    }).then(()=> {
        console.log("posted");
        fetchScores();
    }
    );
};