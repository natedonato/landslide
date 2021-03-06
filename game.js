const Rock = require('./rock');
const Guy = require('./guy');

class Game {
    constructor(canvasheight, canvaswidth){

        //player options can be set here
        this.guyspeed = 10;
        this.friction = 0.85;
        this.gravity = 0.3;
        this.guy = new Guy(canvasheight, canvaswidth, this.guyspeed);

        //rock related options can be set here
        this.minSize = 80;
        this.maxSize = 180;
        this.maxX = canvaswidth;
        this.rockInterval = 1000;
        this.lastRock = this.rockInterval * 2;
        this.rockAvgSpeed = 2;
        this.rockSpeedVariation = 0.5;

        //water related options can be set here
        this.water = {x: 0, 
            y: canvasheight + 600, 
            w : canvaswidth, 
            h: canvasheight + 600, 
            speed: 0.62};

        //canvas & height related variables
        this.canvasheight = canvasheight;
        this.canvaswidth = canvaswidth;
        this.maxrockheight = 0;
        this.currHeight = 0;
        this.maxHeight = 0;

        this.rocks = [];
    }

    reset(){
        this.rocks = [];
        this.maxrockheight = 0;
        this.currHeight = 190;
        this.maxHeight = 0;
        this.lastRock = 0;
        this.guy = new Guy(this.canvasheight, this.canvaswidth, this.guyspeed);
        this.water.y = this.canvasheight + 500;
        return this.guy;
    }


    addRock(rock){
        this.rocks.push(rock);
    }

    rockGenerator(timestamp){
        let rockGenerateHeight = this.maxrockheight;
        if (this.maxHeight + this.canvasheight > this.maxrockheight) {
            rockGenerateHeight = this.maxHeight + this.canvasheight;
        }

        //makes less rocks if just starting
        if (Math.floor(this.maxHeight / 10) < 100) {
            if (timestamp - this.lastRock > this.rockInterval * 2) {
                this.lastRock = timestamp - this.rockInterval / 8 + Math.random() * this.rockInterval / 4;
                this.addRock(Rock.generate(this.minSize, this.maxSize, rockGenerateHeight, this.maxX, this.rockAvgSpeed * 3 / 4, this.rockSpeedVariation));
            }

        }else if (timestamp - this.lastRock > this.rockInterval) {
            this.lastRock = timestamp -this.rockInterval / 8 + Math.random() * this.rockInterval / 4;
            this.addRock(Rock.generate(this.minSize, this.maxSize, rockGenerateHeight, this.maxX, this.rockAvgSpeed, this.rockSpeedVariation));
        }
    }

    checkRockCollision(rock1, rock2) {
        if (rock1.pos.x < rock2.pos.x + rock2.width &&
            rock2.pos.x < rock1.pos.x + rock1.width &&
            rock1.pos.y < rock2.pos.y + rock2.height &&
            rock2.pos.y < rock1.pos.y + rock1.height
        ) {
            //collision has occured if we get here
            if(!rock1.falling || !rock2.falling){
                rock1.falling = false;
                rock2.falling = false;
                //pushes rock generator upwards with height of rock if it lands
                if (this.canvasheight - rock1.pos.y > this.maxrockheight) {
                    this.maxrockheight = this.canvasheight - rock1.pos.y;
                }
            }else{
                let lowerSpeed = Math.min(rock1.rockspeed, rock2.rockspeed);
                rock1.rockspeed = lowerSpeed;
                rock2.rockspeed = lowerSpeed;
            }
        }
    }

    checkPlayerCollision(rock) {
        let collisionSide = "none";
        let vectorx = (this.guy.pos.x + (this.guy.width / 2)) - (rock.pos.x + (rock.width / 2));
        let vectory = (this.guy.pos.y + (this.guy.height / 2)) - (rock.pos.y + (rock.height / 2));
        let avectorx = Math.abs(vectorx);
        let avectory = Math.abs(vectory);
        //can't be closer than half of each width
        let minwidth = (this.guy.width / 2) + (rock.width / 2);
        let minheight = (this.guy.height / 2) + (rock.height / 2);


        if (avectorx < minwidth && avectory < minheight) {
            let offsetx = minwidth - avectorx;
            let offsety = minheight - avectory;
            let xcollisiontime;
            let ycollisiontime;
            //calculates whether we hit the side first or the top or bottom first
            xcollisiontime = Math.abs((offsetx / this.guy.vel.x));
            ycollisiontime = Math.abs((offsety / this.guy.vel.y));
            if (ycollisiontime < xcollisiontime || (this.guy.vel.y === 0 && this.guy.airborne === false)) {
                if (vectory <= 0) {

                    //let him coast on top of falling rock and reset jumps
                    collisionSide = "top";
                    this.guy.pos.y -= offsety;
                    if (rock.falling) {
                        this.guy.vel.y = rock.rockspeed;
                    }
                    else {
                        this.guy.vel.y = 1;
                    }
                    this.guy.airborne = false;
                    this.guy.jumps = 2;
                }

                else {
                    collisionSide = "bottom";
                
                    if (!this.guy.airborne && rock.falling) {
                        this.guy.dead = "crushed";
                    }
                    if (this.guy.pos.y + offsety >= this.canvasheight - this.guy.height) { this.guy.pos.y = this.canvasheight - this.guy.height; }
                    else {
                        this.guy.pos.y += offsety;
                        this.guy.vel.y = rock.rockspeed;
                    }
                }
            }
            else {
                if (vectorx > 0) {
                    collisionSide = "right";
                    this.guy.pos.x += offsetx;
                    this.guy.wallcling = 1;
                }
                else {
                    collisionSide = "left";
                    this.guy.pos.x -= offsetx;
                    this.guy.wallcling = -1;
                }
            }
        }
        return collisionSide;
    }

    checkWaterCollision(){
        if(this.guy.pos.y + this.guy.height > this.water.y){
            this.guy.dead = "drowned";
        }
    }

    updateWaterPos(dt){
        if (Math.floor(this.maxHeight / 10) < 150){
            this.water.y -= this.water.speed * dt / 2;
        }else{
            this.water.y -= this.water.speed * dt;
            if (this.water.y - this.guy.pos.y > 700)
                {this.water.y -= this.water.speed * dt / 2;
            }
            if(this.water.y - this.maxrockheight > 1000)
                {this.water.y -= this.water.speed * dt;}
        }
        this.checkWaterCollision();
    }

    updateRockPos(dt) {
        this.rocks.forEach(rock => {
            if (rock.falling) {
                rock.pos.y += rock.rockspeed * dt;
                if (rock.pos.y + rock.height >= this.canvasheight) {
                    rock.pos.y = this.canvasheight - rock.height;
                    rock.falling = false;
                }
                this.rocks.forEach(rock2 => {
                    if (rock2 !== rock)
                        this.checkRockCollision(rock, rock2);
                });
            }
            this.checkPlayerCollision(rock);
        });
    }
 

    updateGuyPos(dt){
        //applies friction and gravity to guys velocities
        this.guy.vel.x *= this.friction;
        this.guy.vel.y += this.gravity;

        if(this.guy.wallcling !== 0 && this.guy.vel.y > 0){
            this.guy.vel.y -= this.gravity * 2 / 3;
        }

        if(this.guy.vel.y > this.gravity + 1){
            this.guy.airborne = true;
            this.guy.jumps = 0;
        }

        //screen wraparound for guy
        if (this.guy.pos.x > this.canvaswidth - this.guy.width / 2) { this.guy.pos.x = -4; }
        else if (this.guy.pos.x < -this.guy.width / 2) { this.guy.pos.x = this.canvaswidth - this.guy.width / 2 - 2; }

        //updates dudes position using velocity over time
        this.guy.pos.x += this.guy.vel.x * dt;
        this.guy.pos.y += this.guy.vel.y * dt;

        //allows guy to jump off ground, could be removed after refactor ground code
        if (this.guy.pos.y >= this.canvasheight - this.guy.height) {
            this.guy.pos.y = this.canvasheight - this.guy.height;
            this.guy.jumps = 2;
            this.guy.airborne = false;
            this.guy.vel.y = 1;
        }

        //keeps track of current height and max height
        // & pushes rock generator upwards if this.guy is hella high up
        this.currHeight = (500 - this.guy.pos.y - this.guy.height);
        if (this.currHeight > this.maxHeight) { this.maxHeight = this.currHeight; }
        this.guy.wallcling = 0;
    }


    updatePos(dt){
        //avoids the curse of the NaN on initial render
        if (isNaN(dt)) {
            dt = 1;
        }
        this.updateGuyPos(dt);
        this.updateRockPos(dt);
        this.updateWaterPos(dt);
    }

    step(timestamp, dt) {
        this.rockGenerator(timestamp);
        this.updatePos(dt);
    }
}
module.exports = Game;
