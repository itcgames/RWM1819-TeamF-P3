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
      "Brown_Rock"        :   2,
      "Sand"              :   3,
      "Green_Rock"        :   8,
      "Dead_Tree"         :  20,
      "Door"              :  23,
      "Tree"              :  26,
      "Top_Brown_Wall"    :  38,
      "Top_Green_Wall_v1" :  43,
      "Top_Green_Wall_v2" :  44,
      "Brown_Wall"        :  56,
      "Right_Green_Wall"  :  61,
      "Green_Wall"        :  62,
      "Left_Green_Wall"   :  63,
      "Water"             :  98,
      "Bridge"            : 132,
    });

    this.TraversableTiles = Object.freeze([
      this.TileEnum.Sand, 
      this.TileEnum.Door,
      this.TileEnum.Bridge
    ]);

    //  Initialise the grid with tiles.
    this.tiles = [];
    for (var i = 0; i < this.width; i++) {
      this.tiles[i] = [];
      for (var j = 0; j < this.height; j++) {
        var tileColour = "";
        switch (this.screenData.tileData[i + (j * this.width)]) {
          case this.TileEnum.Brown_Rock:
            tileColour = "Brown";
            break;

          case this.TileEnum.Sand:
            tileColour = "Bisque";
            break;

          case this.TileEnum.Green_Rock:
            tileColour = "Green";
            break;

          case this.TileEnum.Dead_Tree:
            tileColour = "Peru";
            break;

          case this.TileEnum.Door:
            tileColour = "Black";
            break;

          case this.TileEnum.Tree:
            tileColour = "SpringGreen";
            break;

          case this.TileEnum.Top_Brown_Wall:
            tileColour = "SandyBrown";
            break;

          case this.TileEnum.Top_Green_Wall_v1:
            tileColour = "DarkOliveGreen";
            break;
            
          case this.TileEnum.Top_Green_Wall_v2:
            tileColour = "DarkOliveGreen";
            break;

          case this.TileEnum.Brown_Wall:
            tileColour = "Sienna";
            break;

          case this.TileEnum.Right_Green_Wall:
            tileColour = "DarkOliveGreen";
            break;

          case this.TileEnum.Green_Wall:
            tileColour = "DarkGreen";
            break;

          case this.TileEnum.Left_Green_Wall:
            tileColour = "DarkOliveGreen";
            break;

          case this.TileEnum.Water:
            tileColour = "RoyalBlue";
            break;

          case this.TileEnum.Bridge:
            tileColour = "SaddleBrown";
            break;
        
          default:
            tileColour = "Magenta";
            break;
        }
        
        this.tiles[i][j] = new Tile(new Vector2((i * this.tileSize) + this.position.x, (j * this.tileSize) + this.position.y), null, true, this.tileSize, tileColour); //  Passing null as the sprite for the time being.        
        var tileType = this.screenData.tileData[i + (j * this.width)];
        if (CollisionManager.ArrayContainsElement(this.TraversableTiles, tileType)){
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

  /**
   * @param {Vector2} position
   */
  screenToGridCoords(position){
    return new Vector2((position.x - position.x % this.tileSize) / this.tileSize, (position.y - position.y % this.tileSize) / this.tileSize);
  }
}