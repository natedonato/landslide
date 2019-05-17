class GameView{
    constructor(game, ctx, canvasheight, canvaswidth){
        this.game = game;
        this.ctx = ctx;
        this.guy = game.guy;
        this.keys = {};
        this.canvasheight = canvasheight;
        this.canvaswidth = canvaswidth;
        this.lastUpdated = 0;

        //for throttling key presses
        this.tooSoon = false;

        //color options
        this.bgcolor = '#FFA500';
        this.rockcolor = '#000000';
        this.playercolor = "#ff1919";

        //initial background fill
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

    }

    handleKeys (){
        if (this.keys[38]) {
            if (this.guy.jumps > 0 && this.tooSoon === false) {
                this.tooSoon = true;

                if (this.guy.jumps === 2) {
                    this.guy.vel.y = -8;
                } else { this.guy.vel.y = -6; }
                this.guy.airborne = true;
                this.guy.jumps -= 1;
                setTimeout(() => this.tooSoon = false, 300);
            }
        }

        if (this.keys[39]) {
            if (this.guy.vel.x < this.guy.maxspeed) {
                this.guy.vel.x += 1;
            }
        }

        if (this.keys[37]) {
            if (this.guy.vel.x > -this.guy.maxspeed) {
                this.guy.vel.x -= 1;
            }
        }
    }


    drawGuy(offset){
        this.ctx.fillStyle = this.playercolor;
        //leans guy to side with x - velocity
        this.ctx.save();
        this.ctx.translate(this.guy.pos.x + this.guy.width / 2, this.guy.pos.y + this.guy.height);
        this.ctx.rotate(this.guy.vel.x * 2 * Math.PI / 180);
        this.ctx.fillRect(-this.guy.width / 2, -this.guy.height, this.guy.width, this.guy.height);
        this.ctx.restore();

        this.ctx.fillStyle = "#ffffff";
        this.ctx.textAlign = "end";
        this.ctx.font = "30px Arial";
        this.ctx.fillText(Math.floor(this.game.maxHeight / 10) + ' ft', this.canvaswidth - 10, 35 - offset);
        this.ctx.font = "10px Arial";
        this.ctx.fillText(Math.floor(this.game.currHeight / 10) + ' ft', this.canvaswidth - 10 - 2, 50 - offset);
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

    draw(){
        //moves "camera" with current player
        this.ctx.save();
        let offset = this.game.currHeight - 190;
        this.ctx.translate(0, offset);

        //clears and fills background
        this.ctx.clearRect(0, 0 - offset, this.canvaswidth, this.canvasheight);
        this.ctx.fillStyle = this.bgcolor;
        this.ctx.fillRect(0, 0 - offset, this.canvaswidth, this.canvasheight);

        //adds floor
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, this.canvasheight, this.canvaswidth * 2 / 3, 500);
        this.ctx.fillRect(this.canvaswidth * 2 / 3 + 5, this.canvasheight, this.canvaswidth * 1 / 3, 500);

        this.drawRocks();
        this.drawGuy(offset);
        this.ctx.restore();
    }

    start(){
        this.bindkeys();
        this.update(0);
    }

    update(timestamp) {
        const dt = (timestamp - this.lastUpdated) / 10;
        this.handleKeys();
        this.game.step(timestamp, dt);
        if(this.guy.dead){
                //something when hes dead
        }
        this.draw();
        this.lastUpdated = timestamp;
        requestAnimationFrame(this.update.bind(this));
    }
}



module.exports = GameView;
