const canvas = document.getElementById("game");
    canvas.width = 640;
    canvas.height = 500;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';


    
    let initialX = canvas.width / 2;
    let initialY = canvas.height - 50;

    let guy = {
        x: initialX,
        y: initialY,
        width: 22,
        height: 32,
    };


    const update = () => {

    ctx.clearRect(guy.x, guy.y, guy.width, guy.height);

    guy.x += 2;
    ctx.fillStyle = "#ff1919";
    ctx.fillRect(guy.x, guy.y, guy.width, guy.height);
        setTimeout(update);
    }




window.addEventListener("load", function () {
    setInterval( update, 200);
});









