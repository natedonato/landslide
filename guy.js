class Guy{
    constructor(canvaswidth, canvasheight, guyspeed){

        this.pos = {
            x: canvaswidth / 2,
            y: canvasheight - 50
        };

        this.vel = {
                x: 0,
            y: 5,
        };

        this.width = 22;
        this.height = 32;
        this.maxspeed = guyspeed;
        this.jumps = 0;
        this.airborne = true;
        this.dead = false;
        this.wallcling = 0;
    }
}

module.exports = Guy;