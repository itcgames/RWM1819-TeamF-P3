class Sprite{
    constructor(x, y, width, height, frameLeft, frameTop){
        this.img = src;
        this.position = new Vector2(x, y);
        this.width = width;
        this.height = height;
        this.frameLeft = frameLeft;
        this.frameTop = frameTop;
        
    }

    setPos(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    render(ctx){
        this.image,
        this.frameIndex * this.width / this.numberPerFrame,
        0,
        this.width / this.numberPerFrame,
        this.height,
        this.position.x,
        this.position.y,
        this.width / this.numberPerFrame ,
        this.height);
        ctx.drawImage();
    }
}