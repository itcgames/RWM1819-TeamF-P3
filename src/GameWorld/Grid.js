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
    this.position = new Vector2(
      this.screenData.x * this.screenData.width * 64, 
      this.screenData.y * this.screenData.height * 64
      );
    this.width = this.screenData.width;
    this.height = this.screenData.height;

    this.TileEnum = Object.freeze({      
      //  Sand.
      "Sand"                          :   3,

      //  Snail rocks.
      "Brown_Rock"                    :   2,
      "Green_Rock"                    :   8,

      //  Small trees.
      "Tree"                          :  26,
      "Dead_Tree"                     :  20,

      //  Dungeon entrance.
      "Dungeon_Entrance_BottomLeft"   :  13,
      "Door"                          :  23,
      "Dungeon_Entrance_BottomRight"  :  17,
      "Dungeon_Entrance_TopLeft"      :  14,
      "Dungeon_Entrance_Middle"       :  15,
      "Dungeon_Entrance_TopRight"     :  16,

      //  Brown walls.
      "Top_Brown_Wall"                :  38,
      "Brown_Wall"                    :  56,

      //  Green walls.
      "Top_Green_Wall"                :  44,
      "Green_Wall"                    :  62,
      "Right_Green_Wall"              :  61,      
      "Left_Green_Wall"               :  63,

      //  Water.
      "Water"                         :  98,

      //  Bridge.
      "Bridge"                        : 132,

      //  Big dead tree.
      "Big_Dead_Tree_BottomLeft"      : 22,
      "Big_Dead_Tree_BottomRight"     : 24,
      "Big_Dead_Tree_TopRight"        :  6,
      "Big_Dead_Tree_TopLeft"         :  4
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
        var tilePosition = new Vector2((i * this.tileSize) + this.position.x, (j * this.tileSize) + this.position.y);
        var tileColour = "";
        var tempSprite = null;
        switch (this.screenData.tileData[i + (j * this.width)]) {
          //  Sand
          case this.TileEnum.Sand:
            tileColour = "Bisque";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 128, 320);
            break;

          //  Snail rocks.
          case this.TileEnum.Brown_Rock:
            tileColour = "Brown";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 0, 64);
            break;
          
          case this.TileEnum.Green_Rock:
            tileColour = "Green";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 0, 0);
            break;

          //  Small Trees
          case this.TileEnum.Tree:
            tileColour = "SpringGreen";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 64, 0);
            break;

          case this.TileEnum.Dead_Tree:
            tileColour = "Peru";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 64, 64);
            break;

          //  Dungeon Entrance.
          case this.TileEnum.Dungeon_Entrance_BottomLeft:
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 64, 256);
            break;

          case this.TileEnum.Door:
            tileColour = "Black";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 64, 320);
            break;

          case this.TileEnum.Dungeon_Entrance_BottomRight:
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 64, 384);
            break;

          case this.TileEnum.Dungeon_Entrance_TopLeft:
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 0, 256);
            break;

          case this.TileEnum.Dungeon_Entrance_Middle:
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 0, 320);            
            break;

          case this.TileEnum.Dungeon_Entrance_TopRight:
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 0, 384);
            break;

          //  Brown Walls.
          case this.TileEnum.Top_Brown_Wall:
            tileColour = "SandyBrown";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 320, 0);
            break;

          case this.TileEnum.Brown_Wall:
            tileColour = "Sienna";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 320, 64);
            break;

          //  Green Walls.
          case this.TileEnum.Top_Green_Wall:
            tileColour = "DarkOliveGreen";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 192, 128);
            break;

          case this.TileEnum.Green_Wall:
            tileColour = "DarkGreen";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 192, 320);
            break;

          case this.TileEnum.Right_Green_Wall:
            tileColour = "DarkOliveGreen";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 192, 192);
            break;

          case this.TileEnum.Left_Green_Wall:
            tileColour = "DarkOliveGreen";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 192, 256);
            
            break;

          //  Water.
          case this.TileEnum.Water:
            tileColour = "RoyalBlue";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 128, 0);            
            break;

          //  Bridge
          case this.TileEnum.Bridge:
            tileColour = "SaddleBrown";
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 256, 192);
            break;

          //  Big Dead Tree.
          case this.TileEnum.Big_Dead_Tree_BottomLeft:
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 64, 128);
            break;

          case this.TileEnum.Big_Dead_Tree_BottomRight:
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 64, 192);
            break;
          
          case this.TileEnum.Big_Dead_Tree_TopLeft:
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 0, 128);
            break;

          case this.TileEnum.Big_Dead_Tree_TopRight:
            tempSprite = new AssetManager(tilePosition.x, tilePosition.y, 64, 64, 0, 192);
            break;

          //  Default.
          default:
            tileColour = "Magenta";
            break;
        }

        //  If we are using a sprite.
        if (tempSprite !== null){
          tempSprite.setSpriteSheet('resources/worldTiles.png', 1, 1);
        }
        
        this.tiles[i][j] = new Tile(tilePosition, tempSprite, true, this.tileSize, tileColour); //  Passing null as the sprite for the time being.        
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
    return (this.tiles[x] !== undefined ? this.tiles[x][y] : null);
  }

  /**
   * @param {Vector2} position
   */
  screenToGridCoords(position){
    var screenCoords = Screen.worldToScreen(position, gameNs.game.play.activeScreen);
    return new Vector2((screenCoords.x - screenCoords.x % this.tileSize) / this.tileSize, (screenCoords.y - screenCoords.y % this.tileSize) / this.tileSize);
  }
}