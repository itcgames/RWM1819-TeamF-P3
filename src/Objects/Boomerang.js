/**
 * @description Bomb class inherits from utility, bomb for player character
 * @author John O'Grady
 */
class Boomerang extends Utility {
    /**
     * constructor
     * @param {*} width width of the boomerang object
     * @param {*} height height of the boomerang object
     */
    constructor(width, height) {
        super(width, height);
        this.collider = new BoxCollider(
            new Vector2(
                this.position.x,
                this.position.y,
            ),
            this.height,
            this.width,
            ['boomerang'],
            ['pickup', 'obstacle']
        );
        this.collider.shape.height = 30; // collider dimensions
        this.collider.shape.width = 30;

        gameNs.game.collisionManager.addBoxCollider(this.collider);
        this.setUpSprites();
    }

    /**
     * update the boomerangs position and collider position
     */
    update() {
        this.setPos(this.position.x + this.updateVector.x, this.position.y + this.updateVector.y)
        this.sprite.setPos(this.position.x, this.position.y);
        this.sprite.update();
        this.collider.position = new Vector2(this.position.x, this.position.y);

        if ((((this.position.x + this.collider.shape.width > 64 * 15 || this.position.x < 64 ||
                    this.position.y + this.collider.shape.height > 64 * 12 || this.position.y < 64 * 2) ||
                gameNs.game.collisionManager.boxCollidedWithTag(this.collider, 'enemy')))) {
            this.processCollision();
        }
    }

    /**
     * throw the boomerang in a direction
     * @param {*} orientation direction for the boomerang to travel in
     * @param {*} position position reference for spawning the boomerang
     */
    throw (orientation, position) {
        this.alive = true;
        switch (orientation) {
            case this.OrientationEnum.East:
                this.updateVector = new Vector2(5, 0);
                this.setPos(position.x + this.sprite.width, position.y + this.sprite.height / 2);
                break;
            case this.OrientationEnum.West:
                this.updateVector = new Vector2(-5, 0);
                this.setPos(position.x - this.sprite.width / 1.15, position.y + this.sprite.height / 2);
                break;
            case this.OrientationEnum.North:
                this.updateVector = new Vector2(0, -5);
                this.setPos(position.x, position.y - this.sprite.height / 2);
                break;
            case this.OrientationEnum.South:
                this.updateVector = new Vector2(0, 5);
                this.setPos(position.x, position.y + this.sprite.height);
                break;
        }
        this.collider.position = new Vector2(this.position.x - this.collider.width / 2.5, this.position.y - this.collider.height / 2.5);
    }

    /**
     * check to stop rendering the boomerang
     */
    processCollision() {
        this.alive = false;
    }

    /**
     * set up the sprite sheet for the boomerang animation
     */
    setUpSprites() {
        this.sprite = new AssetManager(0, 0, this.width, this.height, 128, 0);
        this.sprite.setSpriteSheet("resources/objects.png", 5, 4);
        this.sprite.setScale(30 / this.width, 30 / this.height);
    }

    /**
     * render the entity
     * @param {*} ctx canvas contex
     */
    draw(ctx) {
        this.sprite.draw(ctx);
    }
}