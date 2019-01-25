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
  updateGridPosition(tileSize) {
    this.gridPosition = new Vector2((this.position.x - this.position.x % tileSize) / tileSize, (this.position.y - this.position.y % tileSize) / tileSize);
  }

  /**
   * 
   * @param {Vector2} attemptedMovement 
   */
  keepOnScreen(attemptedMovement) {
    var grid = gameNs.game.tileGrid;
    var tempGridPosition = grid.screenToGridCoords(this.position.add(attemptedMovement));
    if (this.position.x + attemptedMovement.x < 0 || this.position.x + this.width + attemptedMovement.x > grid.width * grid.tileSize || !grid.getTile(tempGridPosition.x, tempGridPosition.y).isTraversable) {
      /*  Do Nothing  */
    } else {
      this.position.x += attemptedMovement.x;
    }

    if (this.position.y + attemptedMovement.y < 0 || this.position.y + this.height + attemptedMovement.y > grid.height * grid.tileSize || !grid.getTile(tempGridPosition.x, tempGridPosition.y).isTraversable) {
      /*  Do Nothing  */
    } else {
      this.position.y += attemptedMovement.y;
    }
  }
}