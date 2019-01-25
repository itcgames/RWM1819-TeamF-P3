/**
 * @description Base class for character objects.
 * @author D.J. O'Leary
 */
class Character {
  /**
   * 
   * @param {Vector2} position 
   * @param {Vector2} collider 
   * @param {Vector2} sprite 
   */
  constructor(position, collider, sprite) {
    this.OrientationEnum = Object.freeze({
      "North": 1,
      "East": 2,
      "South": 3,
      "West": 4
    });

    this.position = position;
    this.gridPosition = new Vector2(0, 0);
    this.orientation = this.OrientationEnum.North;
    this.alive = true;
    this.collider = collider;
    this.sprite = sprite;
  }

  /**
   * 
   */
  updateGridPosition(grid) {
    this.gridPosition = grid.screenToGridCoords(this.position);
  }

  /**
   * 
   * @param {Vector2} attemptedMovement 
   */
  keepOnScreen(attemptedMovement) {
    const pos = Screen.worldToScreen(this.position);
    var grid = gameNs.game.tileGrid;
    var leftTopGridPosition = grid.screenToGridCoords(new Vector2(this.position.x + attemptedMovement.x, this.position.y + attemptedMovement.y));
    var rightBottomGridPosition = grid.screenToGridCoords(new Vector2(this.position.x + this.width + attemptedMovement.x, this.position.y + this.height + attemptedMovement.y));

    //  Moving right.
    if (attemptedMovement.x > 0){
      if ( this.position.x + this.width + attemptedMovement.x < grid.width * grid.tileSize && 
           grid.getTile(rightBottomGridPosition.x, leftTopGridPosition.y).isTraversable && 
           grid.getTile(rightBottomGridPosition.x, rightBottomGridPosition.y).isTraversable) {
        this.position.x += attemptedMovement.x;
      }    
    } else {
      //  Moving left.
      if ( this.position.x + attemptedMovement.x > 0 && 
           grid.getTile(leftTopGridPosition.x, leftTopGridPosition.y).isTraversable && 
           grid.getTile(leftTopGridPosition.x, rightBottomGridPosition.y).isTraversable) {
        this.position.x += attemptedMovement.x;
      }
    }

    //  Moving down.
    if (attemptedMovement.y > 0){
      if ( this.position.y + this.height + attemptedMovement.y < grid.height * grid.tileSize && 
           grid.getTile(leftTopGridPosition.x, rightBottomGridPosition.y).isTraversable && 
           grid.getTile(rightBottomGridPosition.x, rightBottomGridPosition.y).isTraversable ) {
        this.position.y += attemptedMovement.y;
      }
    } else {
      //  Moving up.
    if ( this.position.y + attemptedMovement.y > 0 && 
         grid.getTile(leftTopGridPosition.x, leftTopGridPosition.y).isTraversable &&
         grid.getTile(rightBottomGridPosition.x, leftTopGridPosition.y).isTraversable ){
        this.position.y += attemptedMovement.y;
      }
    }

    
  }
}