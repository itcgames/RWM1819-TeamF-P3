/**
 * @description An object that holds the tiles used to make up a screen.
 * @author D.J. O'Leary
 */
class Grid {

  /**
   * Default constructor for the class.
   * @param {Integer} tileSize The size of each tile on screen. e.g. a value of 8 produces tiles with width and height 8. 
   * @param {String} screen The screen name as a string.
   */
  constructor(tileSize, screen) {
    this.tileSize = tileSize;
    this.screenData = ScreenData[screen];
    this.position = new Vector2(this.screenData.x, this.screenData.y);
    this.width = this.screenData.width;
    this.height = this.screenData.height;

    this.TileEnum = Object.freeze({
      "Sand"              : 3,
      "Door"              : 23,
      "Green_Wall_Top"    : 43,
      "Right_Green_Wall"  : 60,
      "Green_Wall"        : 61,
      "Left_Green_Wall"   : 62
    });

    this.TraversableTiles = Object.freeze([
      this.TileEnum.Sand, 
      this.TileEnum.Door
    ]);

    //  Initialise the grid with tiles.
    this.tiles = [];
    for (var i = 0; i < this.width; i++) {
      this.tiles[i] = [];
      for (var j = 0; j < this.height; j++) {
        this.tiles[i][j] = new Tile(new Vector2((i * this.tileSize) + this.position.x, (j * this.tileSize) + this.position.y), null, true, this.tileSize); //  Passing null as the sprite for the time being.
        
        var tempTileValue = this.screenData.tileData[i + (j * this.width)];
        if (CollisionManager.ArrayContainsElement(this.TraversableTiles, tempTileValue)){
          this.tiles[i][j].isTraversable = true;
        } else {
          this.tiles[i][j].isTraversable = false;
        }
      }
    }
  }

  /**
   * Draws the grid.
   * @param {Canvas Context} ctx 
   */
  draw(ctx) {
    this.tiles.forEach(tileRow => {
      tileRow.forEach(tile => {
        tile.draw(ctx);
      });
    });
  }

  /**
   * @param {Integer} x
   * @param {Integer} y
   */
  getTile(x, y) {
    return this.tiles[x][y];
  }
}