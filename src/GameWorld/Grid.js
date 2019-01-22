/**
 * @description An object that holds the tiles used to make up a screen.
 * @author D.J. O'Leary
 */
class Grid {
    
    /**
     * Default constructor for the class.
     * @param {Integer} tileSize The size of each tile on screen. e.g. a value of 8 produces tiles with width and height 8. 
     * @param {Integer} width The number of tiles in the grid along the x-axis.
     * @param {Integer} height The number of tiles in the grid along te y-axis.
     */
    constructor(tileSize, width, height){
        this.tileSize = tileSize;
        this.width = width;
        this.height = height;

        //  Initialise the grid with tiles.
        this.tiles = []; 
        for (var i = 0; i < width; i++) {
            this.tiles[i] = [];
            for (var j = 0; j < height; j++) {
                this.tiles[i][j] = new Tile(new Vector2(i * tileSize, j * tileSize), null, true, this.tileSize);    //  Passing null as the sprite for the time being.
            }
        }
    }

    /**
     * Draws the grid.
     * @param {Canvas Context} ctx 
     */
    draw(ctx){
        this.tiles.forEach(tileRow => {
            tileRow.forEach(tile => {
                tile.draw(ctx);
            });
        });
    }
}