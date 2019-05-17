class Rock {
    constructor(posx, posy, size){
        this.pos = {x: posx, y: posy};
        this.width = size;
        this.height = size;
        this.falling = true;
    }

    static generate(minSize, maxSize, maxrockHeight, maxX) {
        let size = minSize + Math.random() * (maxSize - minSize);
        let x = (Math.random() * (maxX - size));
        let y = -220 - maxrockHeight;
        return new Rock(x, y, size);
    }
}
module.exports = Rock;
