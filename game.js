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
        this.lastRock = 0;
        this.rockInterval = 2000;
        this.rockspeed = 2;

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
        this.currHeight = 0;
        this.maxHeight = 0;
        this.lastRock = 0;
        this.guy = new Guy(this.canvasheight, this.canvaswidth, this.guyspeed);
        return this.guy;
    }


    addRock(rock){
        this.rocks.push(rock);
    }

    rockGenerator(timestamp){
        if (timestamp - this.lastRock > this.rockInterval) {
            this.lastRock = timestamp;
            this.addRock(Rock.generate(this.minSize, this.maxSize, this.maxrockheight, this.maxX));
        }
    }

    checkRockCollision(rock1, rock2) {
        if (rock1.pos.x < rock2.pos.x + rock2.width &&
            rock2.pos.x < rock1.pos.x + rock1.width &&
            rock1.pos.y < rock2.pos.y + rock2.height &&
            rock2.pos.y < rock1.pos.y + rock1.height
        ) {
            //collision has occured
            rock1.falling = false;
            rock2.falling = false;
            //pushes rock generator upwards with height of rock
            if (this.canvasheight - rock1.pos.y > this.maxrockheight) {
                this.maxrockheight = this.canvasheight - rock1.pos.y;
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
                        this.guy.vel.y = this.rockspeed;
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
                        console.log("dead");
                        this.guy.dead = true;
                    }
                    if (this.guy.pos.y + offsety >= this.canvasheight - this.guy.height) { this.guy.pos.y = this.canvasheight - this.guy.height; }
                    else {
                        this.guy.pos.y += offsety;
                        this.guy.vel.y = -this.guy.vel.y;
                    }
                }
            }
            else {
           
                if (vectorx > 0) {
                    collisionSide = "right";
                    this.guy.pos.x += offsetx;
                }
                else {
                    collisionSide = "left";
                    this.guy.pos.x -= offsetx;
                }
            }
        }
        return collisionSide;
    }

    updateRockPos(dt) {
        this.rocks.forEach(rock => {
            if (rock.falling) {
                rock.pos.y += this.rockspeed * dt;
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
        if(this.guy.vel.y > this.gravity + 1){
            this.guy.airborne = true;
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
        }

        //keeps track of current height and max height
        // & pushes rock generator upwards if this.guy is hella high up
        this.currHeight = (500 - this.guy.pos.y - this.guy.height);
        if (this.currHeight > this.maxHeight) { this.maxHeight = this.currHeight; }
        if (this.currHeight + this.canvasheight > this.maxrockheight) {
            this.maxrockheight = this.currHeight + this.canvasheight;
        }
    }


    updatePos(dt){
        //avoids the curse of the NaN on initial render
        if (isNaN(dt)) {
            dt = 1;
        }
        this.updateGuyPos(dt);
        this.updateRockPos(dt);
    }

    step(timestamp, dt) {
        this.rockGenerator(timestamp);
        this.updatePos(dt);
    }
}
module.exports = Game;
