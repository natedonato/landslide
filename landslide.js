
const canvas = document.getElementById("game");
    canvas.width = 640;
    canvas.height = 500;
    ctx = canvas.getContext("2d");
    


    ///new game setup and properties
    let bgcolor = '#FFA500';
    
    let playercolor = "#ff1919";
    let initialX = canvas.width / 2;
    let initialY = canvas.height - 50;
    let guyspeed = 10;
    let friction = 0.85;
    let gravity = 0.3;
    let keys = {};

    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';

    let guy = {
        pos: {
            x: initialX,
            y: initialY
        },
        vel: {
            x: 1,
            y: 0,
        },
        width: 22,
        height: 32,
        maxspeed: guyspeed,
        airborne: true,
    };















    const drawGuy = () => {
        ctx.fillStyle = "#ff1919";
        ctx.fillRect(guy.pos.x, guy.pos.y, guy.width, guy.height);

    };

    const updateGuyPos = (dt) => {
        if(isNaN(dt)){
            dt = 1;
        }
        handleKeys();

        if(guy.pos.x > canvas.width - guy.width / 2)
        {guy.pos.x = -4;}
        else if 
        (guy.pos.x < -5){guy.pos.x = canvas.width - guy.width / 2 - 2;}

        guy.pos.x += guy.vel.x * dt;
    };



    //39 = right arrow,  37 = left arrow

    const handleKeys = () => {
        if(keys[39]){
            if(guy.vel.x < guy.maxspeed){
                guy.vel.x += 1;
            }
        }

        if(keys[37]){
            if(guy.vel.x > -guy.maxspeed){
                guy.vel.x -= 1;
            }
        }
        
        guy.vel.x *= friction;
    };



    //setting up some vars for main loop 
    let end = 0;
    let dt = 0;

    //main loop of game
    const update = (timestamp) => {       
        dt = (timestamp - end) / 10;
        ctx.fillStyle = bgcolor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000000';

        updateGuyPos(dt);
        drawGuy();
        end = timestamp;

        requestAnimationFrame(update);
    };





window.addEventListener("keydown", function(e) {
    e.preventDefault();
    keys[e.keyCode] = true;
    console.log(keys);
});

window.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
    console.log(keys);
});




window.addEventListener("load", function () {
    update();
});
