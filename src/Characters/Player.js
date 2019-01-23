/**
 * @description Player class that manages player entity
 * @author John O'Grady
 */
class Player extends Character{
    /**
     * 
     * @param {Vector2} position 
     * @param {Collider} collider 
     * @param {Sprite} sprite 
     */
    constructor(position, collider, sprite){
        super(position, collider, sprite);
    }

    /**
     * initialise the player entity - bind functions for key handling and setup sprite 
     */
    init(){
        //testing
        this.width = 14;
        this.height = 16;
        this.animating = false;
        this.attacking = false;
        this.attacked = false;

        // binding functions for key handling
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.meleeAttack = this.meleeAttack.bind(this);
        this.plantBomb = this.plantBomb.bind(this);

        this.swordProjectile = new Sword(8, 16);

        this.setUpSprites();
    }

    /**
     * Based on the direction of the player set them to the first frame in the sprite loop
     */
    setIdle(){
        switch(this.orientation){
            case this.OrientationEnum.East:
                this.sprite = this.east;
                break;
            case this.OrientationEnum.West:
                this.sprite = this.west;
                break;
            case this.OrientationEnum.North:
                this.sprite = this.north;
                break;
            case this.OrientationEnum.South:
                this.sprite = this.south;
                break;
        }
        this.sprite.frameIndex = 0;
    }

    /**
     * Function that updates the sprites current animation frame if moving
     * If the player is attacking with their melee attack decrememnet the timer and stop return
     * to idle when it is complete.
     * Update the sprite position.
     * @param {int} dt - clock 
     */
    update(dt){
        if(this.animating){
            this.sprite.update();
        }
        if(this.attacking){
            this.attackWindow--;
            if(this.attackWindow < 0){
                this.attacking = false;
                this.attacked = true;
                this.attackDelay = 20;
                this.setIdle();
            }
        }
        if(this.attacked){
            this.attackDelay--;
            if(this.attackDelay < 0){
                this.attacked = false;
            }
        }

        if(this.swordProjectile.alive){
            this.swordProjectile.update(dt);
        }

        this.sprite.setPos(this.position.x, this.position.y);
        this.collider.position.x = this.position.x;
        this.collider.position.y = this.position.y;
        this.animating = false;
    }

    /**
     * function to move the player up and update the sprite
     */
    moveUp(){
        if(!this.animating || !this.attacking){
            this.position.y -= 5;
            this.orientation = this.OrientationEnum.North;
            this.sprite = this.north;
            this.animating = true;
        }
    }

    /**
     * function to move the player down and update the sprite
     */
    moveDown(){
        if(!this.animating || !this.attacking){
            this.position.y += 5;
            this.orientation = this.OrientationEnum.South;
            this.sprite = this.south;
            this.animating = true;
        }
    }

    /**
     * function to move the player left and update the sprite
     */
    moveLeft(){
        if(!this.animating || !this.attacking){
            this.position.x -= 5;
            this.orientation = this.OrientationEnum.West;
            this.sprite = this.west;
            this.animating = true;
        }
    }

    /**
     * function to move the player right and update the sprite
     */
    moveRight(){
        if(!this.animating || !this.attacking){
            this.position.x += 5;
            this.orientation = this.OrientationEnum.East;
            this.sprite = this.east;
            this.animating = true;
        }
    }

    launchSword(){
        this.swordProjectile.setPos(this.position.x, this.position.y);
        this.swordProjectile.fire(this.orientation);
    }

    plantBomb(){

    }

    /**
     * melee attack function - check the direction the player is facing
     * and attack in that dirction - create a timer to determine how long the 
     * attack lasts
     */
    meleeAttack(){
        if(!this.animating && !this.attacked){
            switch(this.orientation){
                case this.OrientationEnum.East:
                    this.sprite = this.attackEast;
                    this.sword = this.swordRight;
                    this.sword.setPos(this.position.x + this.sword.width / 2, this.position.y + this.sword.height);
                    if(this.swordCharges > 0){
                        this.launchSword();
                    }
                    break;
                case this.OrientationEnum.West:
                    this.sprite = this.attackWest;
                    this.sword = this.swordLeft;
                    this.sword.setPos(this.position.x - this.sword.width * 2, this.position.y + this.sword.height);
                    if(this.swordCharges > 0){
                        this.launchSword();
                    }
                    break;
                case this.OrientationEnum.North:
                    this.sprite = this.attackNorth;
                    this.sword = this.swordUp;
                    this.sword.setPos(this.position.x + this.sword.width * 2, this.position.y - this.sword.height * 2);
                    if(this.swordCharges > 0){
                        this.launchSword();
                    }
                    break;
                case this.OrientationEnum.South:
                    this.sprite = this.attackSouth;
                    this.sword = this.swordDown;
                    this.sword.setPos(this.position.x + this.sword.width * 1.5, this.position.y + this.sword.height * 2);
                    if(this.swordCharges > 0){
                        this.launchSword();
                    }
                    break;
            }
            this.attackWindow = 10;
            this.attacking = true;
            
            this.sprite.update();
        }
    }

    /**
     * sizing up the sprite and rendering it
     */
    draw(ctx){
        if(this.attacking){
            this.sword.setScale(2.5,2.5);
            this.sword.draw(ctx);
        }
        if(this.swordProjectile.alive){
            this.swordProjectile.draw(ctx);
        }

        this.sprite.horizontalSheet = false;
        this.sprite.setScale(2.5,2.5);
        this.sprite.draw(ctx);
    }

    /**
     * creating different animations sheets for each direction as well as directional attacks
     */
    setUpSprites(){
        this.west = new AssetManager(this.position.x, this.position.y, this.width, this.height,0,14);
        this.west.setSpriteSheet("assets/LinkSpriteSheet.png", 4, 2);
        this.east = new AssetManager(this.position.x, this.position.y, this.width, this.height,0,14);
        this.east.setSpriteSheet("assets/LinkSpriteSheet.png", 4, 2);
        this.east.flipped = true;
        this.north = new AssetManager(this.position.x, this.position.y, this.width, this.height,0,28);
        this.north.setSpriteSheet("assets/LinkSpriteSheet.png", 4, 2);
        this.south = new AssetManager(this.position.x, this.position.y, this.width, this.height,0,0);
        this.south.setSpriteSheet("assets/LinkSpriteSheet.png", 4, 2);

        // attack animations
        this.attackWest = new AssetManager(this.position.x, this.position.y, this.width, this.height, 32, 15);
        this.attackWest.setSpriteSheet("assets/LinkSpriteSheet.png", 4, 1);
        this.attackEast = new AssetManager(this.position.x, this.position.y, this.width, this.height, 32, 15);
        this.attackEast.setSpriteSheet("assets/LinkSpriteSheet.png", 4, 1);
        this.attackEast.flipped = true;

        this.attackNorth = new AssetManager(this.position.x, this.position.y, this.width, this.height, 16, 28);
        this.attackNorth.setSpriteSheet("assets/LinkSpriteSheet.png", 3, 1);
        this.attackSouth = new AssetManager(this.position.x, this.position.y, this.width, this.height, 32, 0);
        this.attackSouth.setSpriteSheet("assets/LinkSpriteSheet.png", 3, 1);

        // sword sprite
        this.swordRight = new AssetManager(this.position.x, this.position.y, 16, 8, 0, 0);
        this.swordRight.setSpriteSheet("assets/Sword.png", 3, 1);
        this.swordLeft = new AssetManager(200, 200, 16, 8, 0, 52);
        this.swordLeft.setSpriteSheet("assets/Sword.png", 3, 1); 
        this.swordUp = new AssetManager(200, 200, 8, 16, 0, 34);
        this.swordUp.setSpriteSheet("assets/Sword.png", 3, 1); 
        this.swordDown = new AssetManager(200, 200, 8, 16, 0, 18);
        this.swordDown.setSpriteSheet("assets/Sword.png", 3, 1);

        this.sword = this.swordDown;
        this.sprite = this.north;
        this.swordCharges = 5;
    }
}