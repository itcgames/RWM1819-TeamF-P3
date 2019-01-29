/**
 * @description Base class for character objects.
 * @author D.J. O'Leary
 */
class Character {
  /**
   * 
   * @param {Vector2} position 
   * @param {Vector2} collider 
   */
  constructor(position, collider) {
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
    var grid = gameNs.game.play.overworld[gameNs.game.play.activeScreen].grid;
    var leftTopGridPosition = grid.screenToGridCoords(new Vector2(this.position.x + attemptedMovement.x, this.position.y + attemptedMovement.y));
    var rightBottomGridPosition = grid.screenToGridCoords(new Vector2(this.position.x + this.width + attemptedMovement.x, this.position.y + this.height + attemptedMovement.y));

    rightBottomGridPosition.x = this.clamp(rightBottomGridPosition.x, 0, 15);
    rightBottomGridPosition.y = this.clamp(rightBottomGridPosition.y, 0, 10);

    leftTopGridPosition.x = this.clamp(leftTopGridPosition.x, 0, 15);
    leftTopGridPosition.y = this.clamp(leftTopGridPosition.y, 0, 10);

    //  Moving right.
    if (attemptedMovement.x > 0) {
      if (this.position.x + this.width + attemptedMovement.x < grid.width * grid.tileSize + grid.position.x &&
        grid.getTile(rightBottomGridPosition.x, leftTopGridPosition.y).isTraversable &&
        grid.getTile(rightBottomGridPosition.x, rightBottomGridPosition.y).isTraversable) {
        this.position.x += attemptedMovement.x;
      }
    } else {
      //  Moving left.
      if (this.position.x + attemptedMovement.x > grid.position.x &&
        grid.getTile(leftTopGridPosition.x, leftTopGridPosition.y).isTraversable &&
        grid.getTile(leftTopGridPosition.x, rightBottomGridPosition.y).isTraversable) {
        this.position.x += attemptedMovement.x;
      }
    }

    //  Moving down.
    if (attemptedMovement.y > 0) {
      if (this.position.y + this.height + attemptedMovement.y < grid.height * grid.tileSize + grid.position.y &&
        grid.getTile(leftTopGridPosition.x, rightBottomGridPosition.y).isTraversable &&
        grid.getTile(rightBottomGridPosition.x, rightBottomGridPosition.y).isTraversable) {
        this.position.y += attemptedMovement.y;
      }
    } else {
      //  Moving up.
      if (this.position.y + attemptedMovement.y > grid.position.y &&
        grid.getTile(leftTopGridPosition.x, leftTopGridPosition.y).isTraversable &&
        grid.getTile(rightBottomGridPosition.x, leftTopGridPosition.y).isTraversable) {
        this.position.y += attemptedMovement.y;
      }
    }
  }

  clamp(value, min, max) {
    if (value < min) {
      value = min;
    } else if (value >= max) {
      value = max;
    }
    return value;
  }
}