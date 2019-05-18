class Rock {
    constructor(posx, posy, size, speed, variation){
        this.pos = {x: posx, y: posy};
        this.width = size;
        this.height = size;
        this.falling = true;
        this.rockspeed = (speed-(variation/2)+(Math.random()*variation));
    }

    static generate(minSize, maxSize, maxrockHeight, maxX, speed, variation) {
        let size = minSize + Math.random() * (maxSize - minSize);
        let x = (Math.random() * (maxX - size));
        let y = -220 - maxrockHeight;
        return new Rock(x, y, size, speed, variation);
    }
}
module.exports = Rock;
