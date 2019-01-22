/**
 * @description A class used to represent a tile in the game.
 * @author D.J. O'Leary
 */
class Tile {

    /**
     * Default constructor for the class.
     * @param {Vector2} position the position on screen of the tile.
     * @param {Sprite} sprite the sprite that represents the tile.
     * @param {Boolean} isTraversable if the tile can be stepped through.
     * @param {Integer} tileSize the size of the tile in pixels.
     */
    constructor(position, sprite, isTraversable, tileSize){
        this.position = position;
        this.sprite = sprite;
        this.isTraversable = isTraversable;
        this.tileSize = tileSize;
    }

    /**
     * Function to draw the tile.
     * @param {Canvas Context} ctx 
     */
    draw(ctx){
        //  If the sprite is empty don't try and draw it, instead draw a rectangle.
        if (this.sprite !== null){
            this.sprite.draw(ctx);
        } else {
            //  Draw a outline for the tile.
            ctx.beginPath()
            ctx.fillStyle = "Black";
            ctx.rect(this.position.x, this.position.y, this.tileSize, this.tileSize);
            ctx.fill();

            //  Draw a rectangle to represent the tile.
            ctx.beginPath();
            ctx.fillStyle = "White";
            ctx.rect(this.position.x + 2, this.position.y + 2, this.tileSize - 2, this.tileSize - 2);
            ctx.fill();
        }        
    }
}