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
    constructor(position, collider, sprite){
        this.OrientationEnum = Object.freeze({
            "North":1,
            "East":2,
            "South":3,
            "West":4
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
     * @param {Integer} screenWidth 
     * @param {Integer} screenHeight 
     * @param {Vector2} attemptedMovement 
     */
    keepOnScreen(screenWidth, screenHeight, attemptedMovement){
        const pos = Screen.worldToScreen(this.position);
        if (pos.x + attemptedMovement.x < 0 || pos.x + attemptedMovement.x > screenWidth) {
            /*  Do Nothing  */
        } else {
            this.position.x += attemptedMovement.x; 
        }

        if (pos.y + attemptedMovement.y < 0 || pos.y + attemptedMovement.y > screenHeight) {
            /*  Do Nothing  */
        } else {
            this.position.y += attemptedMovement.y;
        }
    }
}