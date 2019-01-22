/**
 * @description Base class for npc objects.
 * @author D.J. O'Leary
 */
class Npc extends Character {
    /**
     * 
     * @param {Vector2} position 
     * @param {Collider} collider 
     * @param {Sprite} sprite 
     */
    constructor(position, collider, sprite) {
        super(position, collider, sprite);

    }

    /**
     * 
     */
    wander(dt) {
        
    }

    /**
     * Generates a random number to decide if the Npc should turn left or right from its current position.
     */
    turn() {
        var result = RandomNum(0,100);
        switch (this.orientation) {
            case this.OrientationEnum.North:
                if (result < 50) {
                    this.orientation = this.OrientationEnum.West;
                } else {
                    this.orientation = this.OrientationEnum.East;
                }
                break;
            case this.OrientationEnum.East:
                if (result < 50) {
                    this.orientation = this.OrientationEnum.North;
                } else {
                    this.orientation = this.OrientationEnum.South;
                }
                break;
            case this.OrientationEnum.South:
                if (result < 50) {
                    this.orientation = this.OrientationEnum.East;
                } else {
                    this.orientation = this.OrientationEnum.West;
                }
                break;

            case this.OrientationEnum.West:
                if (result < 50) {
                    this.orientation = this.OrientationEnum.South;
                } else {
                    this.orientation = this.OrientationEnum.North;
                }
                break;
            default:
                /*  Do Nothing  */
                break;
        }
    }

    /**
     * 
     * @param {Integer} max 
     * @param {Integer} min 
     */
    static RandomNum(max, min) {
        return Math.floor(Math.random() * (max - min + 1) - min);
    }
}