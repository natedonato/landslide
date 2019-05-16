
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
    //for doublejump
    let tooSoon = false;
    let currHeight = 0;
    let maxHeight = 0;


    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';

    let guy = {
        pos: {
            x: initialX,
            y: initialY
        },
        vel: {
            x: 0,
            y: -5,
        },
        width: 22,
        height: 32,
        maxspeed: guyspeed,
        jumps: 0,
        airborne: true,
    };















    const drawGuy = () => {
                ctx.fillStyle = "#ff1919";

         //ctx.fillRect(guy.pos.x, guy.pos.y, guy.width, guy.height);

        //leans guy to side with x - velocity

        ctx.save();
        ctx.translate(guy.pos.x + guy.width / 2, guy.pos.y + guy.height);
        ctx.rotate(guy.vel.x * 2 * Math.PI / 180);
        ctx.fillRect(-guy.width/2, -guy.height, guy.width, guy.height);
        ctx.restore();





        //guy height stuff
        currHeight = Math.floor((500 - guy.pos.y - guy.height)/10);
        if(currHeight > maxHeight){
        maxHeight = currHeight;
        }
        ctx.fillStyle= "#ffffff";
        ctx.textAlign = "end"; 
        ctx.font = "30px Arial";
        ctx.fillText(maxHeight + ' ft', canvas.width - 10, 35);
        ctx.font = "10px Arial";
        ctx.fillText(currHeight + ' ft', canvas.width - 10 - 2, 50);

    };

    const updateGuyPos = (dt) => {
        if(isNaN(dt)){
            dt = 1;
        }
        handleKeys();

        if(guy.pos.x > canvas.width - guy.width / 2)
        {guy.pos.x = -4;}
        else if 
        (guy.pos.x < -guy.width / 2){guy.pos.x = canvas.width - guy.width / 2 - 2;}

        guy.pos.x += guy.vel.x * dt;
        guy.pos.y += guy.vel.y * dt;
        if(guy.pos.y >= canvas.height - guy.height)
        {guy.pos.y = canvas.height - guy.height;
        guy.jumps = 2;
        guy.airborne = false;
        }
    };



    //39 = right arrow,  37 = left arrow

    const handleKeys = () => {
        if(keys[38]){

            if(guy.jumps > 0 && tooSoon === false){
            tooSoon = true;
            
            if(guy.jumps === 2){
            guy.vel.y = -8;
            }else{guy.vel.y = -6}
            guy.airborne = true;
            guy.jumps -= 1;
            setTimeout(()=> tooSoon = false, 300);
            }
        }

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
        guy.vel.y += gravity;
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
