
const canvas = document.getElementById("game");
    canvas.width = 640;
    canvas.height = 500;
    ctx = canvas.getContext("2d");

    ///new game setup and properties
    let bgcolor = '#FFA500';
    let rockcolor = '#000000';
    let friction = 0.85;
    let gravity = 0.3;
    //for player
    let playercolor = "#ff1919";
    let initialX = canvas.width / 2;
    let initialY = canvas.height - 50;
    let guyspeed = 10;
    let keys = {};
    let tooSoon = false;
    let currHeight = 0;
    let maxHeight = 0;
    let offset = 0;
    let maxrockHeight = 0;
    let rockspeed = 2;

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
    //for main loop
    let end = 0;
    let dt = 0;

    //for rocks
    let rocks = [];
    let minSize = 80;
    let maxSize = 180;
    let minX = 0;
    let maxX = canvas.width;
    let lastRock = 1000;
    let rockInterval = 2000;

    rocks.push(
    );


    const rockGenerator = (timestamp) => {
        if(timestamp - lastRock > rockInterval){
            lastRock = timestamp;

            let size = minSize + Math.random() * (maxSize-minSize);
            rocks.push({
                pos: {x: Math.random() * (maxX -size),
                    y: -220 - maxrockHeight, //might need to make max square height for offset
                },
                width: size,
                height: size,
                falling: true
            });
        }
    };

    //DRAWING STUFF
    //initial fill in bg
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';

    const drawGuy = () => {
        ctx.fillStyle = "#ff1919";
        //leans guy to side with x - velocity
        ctx.save();
        ctx.translate(guy.pos.x + guy.width / 2, guy.pos.y + guy.height);
        ctx.rotate(guy.vel.x * 2 * Math.PI / 180);
        ctx.fillRect(-guy.width/2, -guy.height, guy.width, guy.height);
        ctx.restore();

        ctx.fillStyle= "#ffffff";
        ctx.textAlign = "end"; 
        ctx.font = "30px Arial";
        ctx.fillText(Math.floor(maxHeight/10) + ' ft', canvas.width - 10, 35 - offset);
        ctx.font = "10px Arial";
        ctx.fillText(Math.floor(currHeight/10) + ' ft', canvas.width - 10 - 2, 50 - offset);
    };

    const drawRocks = () => {
        
        rocks.forEach( rock => {
            ctx.fillStyle = rockcolor;
            ctx.fillRect(rock.pos.x, rock.pos.y, rock.width, rock.height);
            
            ctx.fillStyle = bgcolor;
            ctx.beginPath();
            ctx.arc(rock.pos.x + (rock.width / 2), rock.pos.y + (rock.width / 2), rock.width / 2 * 0.7 , 0, 2 * Math.PI);
            ctx.fill();
            }
        );
    };

    const draw = () => {
 
        drawRocks();
        drawGuy();
    };


    //moving stuff
    const updatePos = (dt) => {
        if(isNaN(dt)){
            dt = 1;
        }
        
        handleKeys();
        updateGuyPos(dt);
        updateRockPos(dt);
  
    };

    const updateGuyPos = (dt) => {

        //wraparound
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

        //guy height stuff
        currHeight = (500 - guy.pos.y - guy.height);
        if(currHeight > maxHeight){maxHeight = currHeight;}

    };








    const updateRockPos = (dt) => {
        rocks.forEach( rock => {
            if(rock.falling){
                rock.pos.y += rockspeed * dt;
                if(rock.pos.y + rock.height >= canvas.height){
                    rock.pos.y = canvas.height - rock.height;
                    rock.falling = false;
                    maxrockHeight = rock.pos.y;
                }
                rocks.forEach (rock2 => {
                    if(rock2 !== rock)
                    checkRockCollision(rock, rock2);
                });
            }
            checkPlayerCollision(rock);
        });
    };

    const checkRockCollision = (rock1, rock2) => {
        if(rock1.pos.x < rock2.pos.x + rock2.width &&
            rock2.pos.x < rock1.pos.x + rock1.width  &&
            rock1.pos.y < rock2.pos.y + rock2.height &&
            rock2.pos.y < rock1.pos.y + rock1.height
            ){
                //collision has occured
                rock1.falling = false;
                rock2.falling = false;
            }   
    };


    //vector collision code based on somethinghitme.com example
    const checkPlayerCollision = (rock) => {
        let collisionSide = "none";
        let vectorx = (guy.pos.x + (guy.width / 2)) - (rock.pos.x + (rock.width / 2));
        let vectory = (guy.pos.y + (guy.height / 2)) - (rock.pos.y + (rock.height / 2));
            avectorx = Math.abs(vectorx);
            avectory = Math.abs(vectory);

        //can't be closer than half of each width
        let minwidth = (guy.width / 2) + (rock.width / 2);
        let minheight = (guy.height / 2) + (rock.height / 2);

        if(avectorx < minwidth && avectory < minheight){
            let offsetx = minwidth - avectorx;
            let offsety = minheight - avectory;
            let xcollisiontime;
            let ycollisiontime;

            xcollisiontime = (offsetx / Math.abs(guy.vel.x));
            ycollisiontime = (offsety / Math.abs(guy.vel.y));


            if(ycollisiontime < xcollisiontime){
                if(vectory < 0){
                    collisionSide = "top";
                    guy.pos.y -= offsety;
                    if(rock.falling){
                        guy.vel.y = rockspeed;}
                    else{
                        guy.vel.y = 0;
                    }
                    guy.airborne = false;
                    guy.jumps = 2;
                    }
                
                else{
                    collisionSide = "bottom";
                    if(guy.airborne === false){
                        console.log("YOU DEAD");
                    }
                    if(guy.pos.y + offsety >= canvas.height - guy.height)
                        {guy.pos.y = canvas.height - guy.height;}
                    else{
                        guy.pos.y += offsety;
                        guy.vel.y = -guy.vel.y;
                    }
                }
            }
        else{
            if(vectorx > 0){
                collisionSide = "right";
                guy.pos.x += offsetx;
            }
            else{
                collisionSide = "left";
                guy.pos.x -= offsetx;
                }
            }
        };
        return collisionSide;
    };


    //39 = right arrow,  37 = left arrow, 38 = up arrow
    const handleKeys = () => {
        if(keys[38]){

            if(guy.jumps > 0 && tooSoon === false){
            tooSoon = true;
            
            if(guy.jumps === 2){
            guy.vel.y = -8;
            }else{guy.vel.y = -6;}
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


    //main loop of game
    const update = (timestamp) => {       
        dt = (timestamp - end) / 10;

        rockGenerator(timestamp);
        updatePos(dt);

        ctx.save();
        offset = currHeight - 190;
        ctx.translate(0, offset);



        ctx.clearRect(0, 0 - offset, canvas.width, canvas.height);
        ctx.fillStyle = bgcolor;
        ctx.fillRect(0, 0 - offset, canvas.width, canvas.height);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, canvas.height, canvas.width * 2/3, 500);
        
        ctx.fillRect(canvas.width*2/3 + 5, canvas.height, canvas.width * 1/3, 500);

        draw();
        ctx.restore();

        end = timestamp;
        requestAnimationFrame(update);
    };





window.addEventListener("keydown", function(e) {
    e.preventDefault();
    keys[e.keyCode] = true;
});

window.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load", function () {
    update();
});
