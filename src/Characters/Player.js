
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
        this.width = 34;
        this.height = 64;
        this.animating = false;
        this.attacking = false;
        this.attacked = false;
        this.hasSword = false;
        this.swordBeam = false;

        // binding functions for key handling
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.meleeAttack = this.meleeAttack.bind(this);
        this.plantBomb = this.plantBomb.bind(this);

        this.sword = new Sword(64, 24);
        this.projectile = new Sword(64, 24);
        this.bomb = new Bombs(50,61);

        this.health = 6;
        this.rupees = 0;
        this.bombs = 0;
        this.keys = 0;

        this.collider = new BoxCollider(
            new Vector2(
                this.position.x,
                this.position.y,
            ),
            this.width,
            this.height,
            ['player'],
            ['sword']
        );
        gameNs.game.collisionManager.addBoxCollider(this.collider);

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
        if(this.bomb.alive){
            this.bomb.update(dt);
        }

        if(this.attacking){
            this.sword.update(dt);
        }
        if(this.projectile.inFlight){
            this.projectile.update(dt);
        }

        this.sprite.setPos(this.position.x, this.position.y);
        this.collider.shape.position = new Vector2(this.position.x, this.position.y);
        this.animating = false;

        //console.log("World:  "+this.position.x+","+this.position.y);
        //console.log("Screen: "+Screen.worldToScreen(this.position).x+","+Screen.worldToScreen(this.position).y);
        console.log(this.position);
        console.log(Screen.worldToScreen(this.position,1));
    }

    /**
     * function to move the player up and update the sprite
     */
    moveUp(){
        if(!this.animating || !this.attacking){
            this.keepOnScreen(64*15, 64*11, new Vector2(0, -5));
            //this.position.y -= 5;
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
            this.keepOnScreen(64*15, 64*11, new Vector2(0, 5));
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
            this.keepOnScreen(64*15, 64*11, new Vector2(-5, 0));
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
            this.keepOnScreen(64*15, 64*12, new Vector2(5, 0));
            this.orientation = this.OrientationEnum.East;
            this.sprite = this.east;
            this.animating = true;
        }
    }

    launchSword(){
        if(!this.swordBeam){
            this.swordCharges = this.swordCharges - 1;
            this.projectile.setPos(this.position.x, this.position.y);
            this.projectile.fire(this.orientation);
            this.swordBeam = true;
        }
    }

    plantBomb(){
        if(!this.bomb.alive){
            this.bombs--;
            this.bomb.plantBomb(this.orientation, this.position);
        }
    }

    processPickup(type){
        switch(type){
            case "rupee":
                this.rupees++;
                break;
            case "key":
                this.keys++;
                break;
            case "bomb":
                this.bombs++;
                break;
            case "heart":
                if(this.health < 6){
                    this.health++;
                }
                break;
        }
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
                    break;
                case this.OrientationEnum.West:
                    this.sprite = this.attackWest;
                    break;
                case this.OrientationEnum.North:
                    this.sprite = this.attackNorth;
                    break;
                case this.OrientationEnum.South:
                    this.sprite = this.attackSouth;
                    break;
            }
            
            this.sword.melee(this.orientation, this.position);
            if(this.swordCharges >= 0 ){
                this.launchSword();
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
            this.sword.draw(ctx);
        }
        if(this.bomb.alive){
            this.bomb.draw(ctx);
        }
        if(this.swordBeam){
            this.projectile.draw(ctx);
        }
        this.sprite.horizontalSheet = false;
        this.sprite.draw(ctx);
    }

    /**
     * creating different animations sheets for each direction as well as directional attacks
     */
    setUpSprites(){
        this.west = new AssetManager(this.position.x, this.position.y, 38, 63,0,36);
        this.west.setSpriteSheet("resources/link.png", 4, 2);
        this.west.horizontalSheet = false;
        this.west.flipped = true;

        this.east = new AssetManager(this.position.x, this.position.y, 38, 63,0,36);
        this.east.setSpriteSheet("resources/link.png", 4, 2);
        this.east.horizontalSheet = false;

        this.north = new AssetManager(this.position.x, this.position.y, 32, 62, 62,0);
        this.north.setSpriteSheet("resources/link.png", 4, 2);
        this.north.horizontalSheet = false;

        this.south = new AssetManager(this.position.x, this.position.y, 32, 63 , 0, 82);
        this.south.setSpriteSheet("resources/link.png", 4, 3);
        this.south.horizontalSheet = false;

        // attack animations
        this.attackWest = new AssetManager(this.position.x, this.position.y, 38, 63, 63, 36);
        this.attackWest.setSpriteSheet("resources/link.png", 4, 1);
        this.attackWest.flipped = true;

        this.attackEast = new AssetManager(this.position.x, this.position.y, 38, 63, 63, 36);
        this.attackEast.setSpriteSheet("resources/link.png", 4, 1);

        this.attackNorth = new AssetManager(this.position.x, this.position.y, 32, 63, 0, 0);
        this.attackNorth.setSpriteSheet("resources/link.png", 3, 1);

        this.attackSouth = new AssetManager(this.position.x, this.position.y, 32, 63, 0, 82);
        this.attackSouth.setSpriteSheet("resources/link.png", 3, 1);

        this.sprite = this.north;
        this.swordCharges = 5;
    }
}