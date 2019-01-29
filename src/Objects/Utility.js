/**
 * @description Project base class for creating shooting objects
 * @author John O'Grady
 */
class Utility{
    /**
     * constrctuor
     * @param {Width} width 
     * @param {Height} height 
     */
    constructor(width, height){
        this.OrientationEnum = Object.freeze({
            "North":1,
            "East":2,
            "South":3,
            "West":4
        });
        
        this.width = width;
        this.height = height;
        this.collider = {};
        this.orientation = this.OrientationEnum.North;
        this.position = new Vector2(0,0);
        this.alive = false;
        this.sprite = {};
    }

    /**
     * update the x and y positions of the utilities vector component
     * @param {X position} x 
     * @param {Y position} y 
     */
    setPos(x, y){
        this.position.x = x;
        this.position.y = y;
    }
}