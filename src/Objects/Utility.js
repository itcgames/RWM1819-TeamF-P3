/**
 * @description Project base class for creating shooting objects
 * @author John O'Grady
 */
class Utility{
    /**
     * 
     * @param {*} width 
     * @param {*} height 
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
     * 
     * @param {*} x 
     * @param {*} y 
     */
    setPos(x, y){
        this.position.x = x;
        this.position.y = y;
    }
}