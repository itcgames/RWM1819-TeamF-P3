class Projectile{
    constructor(width, height){
        this.OrientationEnum = Object.freeze({
            "North":1,
            "East":2,
            "South":3,
            "West":4
        });

        this.orientation = this.OrientationEnum.North;
        this.position = new Vector2(0,0);
        this.alive = false;
        this.collider = new BoxCollider(this.position, width, height, "sword", "obstacle");
        this.sprite = {};
    }

    setPos(x, y){
        this.position.x = x;
        this.position.y = y;
        this.collider.position.x = x;
        this.collider.position.y = y;
    }
}