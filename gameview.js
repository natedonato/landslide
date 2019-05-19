class GameView{
    constructor(game, ctx, canvasheight, canvaswidth){
        this.game = game;
        this.ctx = ctx;
        this.guy = game.guy;
        this.keys = {};
        this.canvasheight = canvasheight;
        this.canvaswidth = canvaswidth;
        this.lastUpdated = 0;
        this.water = game.water;
        this.jumpSound = new Audio('./soundfx/jump1.wav');
        this.jumpSound.volume = 0.2;
        this.jumpSound2 = new Audio('./soundfx/jump2.wav');
        this.jumpSound2.volume = 0.3;
        this.waterSound = new Audio('./soundfx/drowned.wav');
        this.crushSound = new Audio ('./soundfx/crushed.wav');
        this.crushSound.volume = 0.3;
        this.colorSound = new Audio ('./soundfx/colorshift.wav');
        this.colorSound.volume = 0.35;
        this.bgm = new Audio('./soundfx/Fantasies_of_Yonder.mp3');
        this.bgm.volume = 0.35;
        this.bgm.loop = true;

        //for throttling key presses
        this.tooSoon = false;
        this.tooSoonMute = false;

        //color options
        this.bgcolor = '#FFA500';
        this.rockcolor = '#000000';
        this.playercolor = "#ff1919";
        this.watercolor = 'blue';
        this.colorChangeHeight = 300;

        //initial background fill
        this.colorChangeCurrent = this.colorChangeHeight;
        this.ctx.fillStyle = this.bgcolor;
        this.ctx.fillRect(0, 0, this.game.canvaswidth, this.game.canvasheight);
    }

    bindkeys(){

        let gameview = this;

        window.addEventListener("keydown", function (e) {
            e.preventDefault();
            gameview.keys[e.keyCode] = true;
        });
        window.addEventListener("keyup", function (e) {
            gameview.keys[e.keyCode] = false;
        });


        let jumpbutton = document.getElementById('jump-button');
        if (jumpbutton !== null) {
            jumpbutton.addEventListener("touchstart", (e) => {
                e.preventDefault();
                gameview.keys.jump = true;
            });
            let left = document.getElementById('left');
            left.addEventListener("touchstart", (e) => {
                e.preventDefault();
                gameview.keys[37] = true;
            });
            left.addEventListener('touchend', (e) => {
                e.preventDefault();
                gameview.keys[37] = false;
            });
            left.addEventListener('touchmove', (e) => {
                e.preventDefault();
                gameview.keys[37] = false;
            });
            
        }
    }

    jump(){
        if (this.guy.wallcling !== 0 && this.guy.airborne === true && this.tooSoon === false) {

            this.jumpSound2.play();
            this.tooSoon = true;
            
            this.guy.vel.y = -8;
            this.guy.vel.x = this.guy.wallcling * 6;
            setTimeout(() => this.tooSoon = false, 300);
        }
        else if (this.guy.jumps > 0 && this.tooSoon === false) {
            this.jumpSound.play();
            this.tooSoon = true;

            if (this.guy.jumps === 2) {
                this.guy.vel.y = -8;
            } else { this.guy.vel.y = -6; }
            this.guy.airborne = true;
            this.guy.jumps -= 2;
            setTimeout(() => this.tooSoon = false, 300);
        }  
    }

    moveRight(){
        if (this.guy.vel.x < this.guy.maxspeed) {
            this.guy.vel.x += 1;
        }
    }

    moveLeft(){
        if (this.guy.vel.x > -this.guy.maxspeed) {
            this.guy.vel.x -= 1;
        }
    }

    handleKeys (){
        if(this.keys.jump){
            this.jump();
            this.keys.jump = false;
        }

        if (this.keys[38] || this.keys[32]) {   
            this.jump();
        }

        if (this.keys[39]) {
            this.moveRight();
        }

        if (this.keys[37]) {
            this.moveLeft();
        }

        if (this.keys[13]){
            this.reset();
        }
        if(this.keys[77]){
            if(this.tooSoonMute === false){

            this.tooSoonMute = true;
            if(this.bgm.volume === 0.35)
                 {this.bgm.volume = 0;
                 this.bgm.pause();}
            else{(this.bgm.volume = 0.35);
            this.bgm.play();}

            setTimeout(() => this.tooSoonMute = false, 300);}
        }
    }

    reset(){
        // this.bgm.stop();
        this.gameEndHeight = this.maxHeight;
        if(this.guy.dead === "drowned"){
            this.waterSound.play();
        }else if(this.guy.dead === "crushed"){this.crushSound.play();}

        this.guy = this.game.reset();
        this.colorChangeCurrent = this.colorChangeHeight;
        this.bgcolor = '#FFA500';
        this.bgm.currentTime = 0;
        this.bgm.play();
    }


    drawGuy(offset){
        if(!this.guy.dead){
        this.ctx.fillStyle = this.playercolor;
        //leans guy to side with x - velocity


        this.ctx.save();
        this.ctx.translate(this.guy.pos.x + this.guy.width / 2 - this.guy.wallcling *4, this.guy.pos.y + this.guy.height);


        if(this.guy.wallcling === 0){
        this.ctx.rotate(this.guy.vel.x * 2 * Math.PI / 180);
        } else {
            this.ctx.rotate(this.guy.wallcling * 12 * Math.PI / 180);
}





        let w = this.guy.width;
        let h = this.guy.height;
        if(this.guy.airborne){
            let scale = this.guy.vel.y;
            if (scale > 6) {scale = 6;}
            h -= scale;
           
            if (scale > 2) { scale = 2; }
            w += scale;
        }

        this.ctx.fillRect(-w / 2, -h, w, h);
        this.ctx.restore();

        this.ctx.fillStyle = "#ffffff";
        this.ctx.textAlign = "end";
        this.ctx.font = "30px Arial";
        this.ctx.fillText(Math.floor(this.game.maxHeight / 10) + ' ft', this.canvaswidth - 10, 35 - offset);
        this.ctx.font = "10px Arial";
        this.ctx.fillText(Math.floor(this.game.currHeight / 10) + ' ft', this.canvaswidth - 10 - 2, 50 - offset);
        }
    }

    drawRocks(){
        this.game.rocks.forEach(rock => {
            this.ctx.fillStyle = this.rockcolor;
            this.ctx.fillRect(rock.pos.x, rock.pos.y, rock.width, rock.height);
            this.ctx.fillStyle = this.bgcolor;
            this.ctx.beginPath();
            this.ctx.arc(rock.pos.x + (rock.width / 2), rock.pos.y + (rock.width / 2), rock.width / 2 * 0.7, 0, 2 * Math.PI);
            this.ctx.fill();
        }
        );
    };

    drawWater(){
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = this.watercolor;
        this.ctx.fillRect(this.water.x, this.water.y, this.water.w, this.water.h);
        this.ctx.globalAlpha = 1.0;
    }

    draw(){



        if(this.game.maxHeight > this.colorChangeCurrent){
            this.colorSound.play();
            this.colorChangeCurrent += this.colorChangeHeight;
            let hue = Math.random()*290 + 20;
            this.bgcolor = 'hsl(' + hue + ',100%, 50%)';
            this.rockcolor === 'white' ? this.rockcolor = 'black' : this.rockcolor = 'white';
        }

        //moves "camera" with current player
        this.ctx.save();
        let offset = this.game.currHeight - 190;
        this.ctx.translate(0, offset);

        //clears and fills background
        this.ctx.clearRect(0, 0 - offset, this.canvaswidth, this.canvasheight);
        this.ctx.fillStyle = this.bgcolor;
        this.ctx.fillRect(0, 0 - offset, this.canvaswidth, this.canvasheight);

       
        this.drawRocks();
        this.drawWater();
        this.drawGuy(offset);


        //adds floor
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, this.canvasheight, this.canvaswidth * 2 / 3, 500);
        this.ctx.fillRect(this.canvaswidth * 2 / 3 + 5, this.canvasheight, this.canvaswidth * 1 / 3, 500);

        this.ctx.restore();
    }

    start(){
        this.bindkeys();
        this.bgm.play();
        this.update(0);
    }


    update(timestamp) {
        const dt = (timestamp - this.lastUpdated) / 10;
        this.handleKeys();
        this.game.step(timestamp, dt);
        if(this.guy.dead){
                this.bgm.pause();
                this.reset();
        }
        this.draw();
        this.lastUpdated = timestamp;
        requestAnimationFrame(this.update.bind(this));
    }
}



module.exports = GameView;
