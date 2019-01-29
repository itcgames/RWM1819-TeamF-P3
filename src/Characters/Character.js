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
    const pos = Screen.worldToScreen(
      this.position,
      gameNs.game.play.activeScreen
    );
    var grid = gameNs.game.play.overworld[gameNs.game.play.activeScreen].grid;
    // var leftTopGridPosition = grid.screenToGridCoords(new Vector2(pos.x + attemptedMovement.x, pos.y + attemptedMovement.y));
    // var rightBottomGridPosition = grid.screenToGridCoords(new Vector2(pos.x + this.width + attemptedMovement.x, pos.y + this.height + attemptedMovement.y));
    var leftTopGridPosition = grid.screenToGridCoords(new Vector2(pos.x + attemptedMovement.x, pos.y + attemptedMovement.y));
    var rightBottomGridPosition = grid.screenToGridCoords(new Vector2(pos.x + this.width + attemptedMovement.x, pos.y + this.height + attemptedMovement.y));
    //  Moving right.
    if (attemptedMovement.x > 0) {
      if (pos.x + this.width + attemptedMovement.x < grid.width * grid.tileSize &&
        grid.getTile(rightBottomGridPosition.x, leftTopGridPosition.y).isTraversable &&
        grid.getTile(rightBottomGridPosition.x, rightBottomGridPosition.y).isTraversable) {
        this.position.x += attemptedMovement.x;
      }
    } else {
      //  Moving left.
      if (pos.x + attemptedMovement.x > 0 &&
        grid.getTile(leftTopGridPosition.x, leftTopGridPosition.y).isTraversable &&
        grid.getTile(leftTopGridPosition.x, rightBottomGridPosition.y).isTraversable) {
        this.position.x += attemptedMovement.x;
      }
    }

    //  Moving down.
    if (attemptedMovement.y > 0) {
      if (pos.y + this.height + attemptedMovement.y < grid.height * grid.tileSize &&
        grid.getTile(leftTopGridPosition.x, rightBottomGridPosition.y).isTraversable &&
        grid.getTile(rightBottomGridPosition.x, rightBottomGridPosition.y).isTraversable) {
        this.position.y += attemptedMovement.y;
      }
    } else {
      //  Moving up.
      if (pos.y + attemptedMovement.y > 0 &&
        grid.getTile(leftTopGridPosition.x, leftTopGridPosition.y).isTraversable &&
        grid.getTile(rightBottomGridPosition.x, leftTopGridPosition.y).isTraversable) {
        this.position.y += attemptedMovement.y;
      }
    }


  }
}