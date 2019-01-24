/**
 * @description Bomb class inherits from utility, bomb for player character
 * @author John O'Grady
 */
class Boomerang extends Utility{
    constructor(width, height){
        super(width, height);
        this.collided = false;
        this.collider = new BoxCollider(
            new Vector2(
                this.position.x,
                this.position.y,
            ),
            this.height * 4,
            this.width * 4,
            ['boomerang'],
            ['pickup', 'obstacle']
        );
        gameNs.game.collisionManager.addBoxCollider(this.collider);
        
        this.setUpSprites();
    }

    /**
     * 
     * @param {*} dt 
     */
    update(){
        this.sprite.setPos(this.position.x + 5, this.position.y);
        this.sprite.update();
        this.collider.position = new Vector2(this.position.x, this.position.y);
    }

    /**
     * 
     * @param {*} orientation 
     * @param {*} position
     */
    throw(orientation, position){
        this.alive = true;
        switch(orientation){
            case this.OrientationEnum.East:
                this.setPos(position.x + this.sprite.width , position.y + this.sprite.height / 2);
                break;
            case this.OrientationEnum.West:
                this.setPos(position.x - this.sprite.width / 1.15, position.y + this.sprite.height / 2);
                break;
            case this.OrientationEnum.North:
                this.setPos(position.x, position.y - this.sprite.height / 2);
                break;
            case this.OrientationEnum.South:
                this.setPos(position.x, position.y + this.sprite.height);
                break;
        }
        this.collider.position = new Vector2(this.position.x - this.collider.width / 2.5, this.position.y - this.collider.height / 2.5);
    }

    setUpSprites(){
        this.sprite = new AssetManager(0, 0, this.width, this.height, 128, 0);
        this.sprite.setSpriteSheet("resources/objects.png", 3, 4);
    }

    /**
     * 
     * @param {*} ctx 
     */
    draw(ctx){
        this.sprite.draw(ctx);
    }
}