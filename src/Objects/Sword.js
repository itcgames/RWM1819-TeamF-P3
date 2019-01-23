/**
 * @description Sword class inherits from projectile represents links flying sword
 * @author John O'Grady
 */
class Sword extends Utility{
    /**
     * 
     * @param {*} width 
     * @param {*} height 
     */
    constructor(width, height){
        super(width, height);
        this.setUpSprites();
        this.updateVector = new Vector2();
        this.inFlight = false;
        this.clock = 0;
    }

    /**
     * update for the sword projectile
     */
    update(dt){
        if(this.OrientationEnum === "North" || this.OrientationEnum === "South"){
            this.collider.shape.width = 24;
            this.collider.shape.height = 64;
        } else {
            this.collider.shape.width = 64;
            this.collider.shape.height = 24;
        }
        
        this.setPos(this.position.x + this.updateVector.x, this.position.y + this.updateVector.y);
        this.sprite.setPos(this.position.x, this.position.y);
        this.sprite.update();

        if(this.inFlight){
            if((this.position.x + this.collider.shape.width  > 64 * 15 || this.position.x < 64 ||
                this.position.y + this.collider.shape.height > 64 * 12 || this.position.y < 64 * 3) && this.collided == false){
                    this.processCollision();
                }
            if(this.collided){
                this.clock += dt;
                this.explosion.update();
                if(this.clock > 200){
                    this.collided = false;
                    this.inFlight = false;
                    this.clock = 0;
                }
            }
        }
    }

    processCollision(){
        switch(this.orientation){
            case this.OrientationEnum.North:
                this.explosion.x = this.position.x - this.explosion.width / 2;
                this.explosion.y = this.position.y - this.explosion.height / 2;
                break;
            case this.OrientationEnum.South:
                this.explosion.x = this.position.x - this.explosion.width / 2
                this.explosion.y = this.position.y + this.explosion.height / 2;
                break;
            case this.OrientationEnum.East:
                this.explosion.x = this.position.x;
                this.explosion.y = this.position.y + this.explosion.height / 2;
                break;
            case this.OrientationEnum.West:
                this.explosion.x = this.position.x;
                this.explosion.y = this.position.y - this.explosion.height / 2;
                break;
        }
        this.collided = true;
    }

    melee(orientation, position){
        this.orientation = orientation;
        this.updateVector = new Vector2(0,0);
        switch(this.orientation){
            case this.OrientationEnum.East:
                this.sprite = this.swordRight;
                this.setPos(position.x + this.sprite.width / 2, position.y + this.sprite.height / 1.35);
                break;
            case this.OrientationEnum.West:
                this.sprite = this.swordLeft;
                this.setPos(position.x - this.sprite.width / 1.15, position.y + this.sprite.height / 2);
                break;
            case this.OrientationEnum.North:
                this.sprite = this.swordUp;
                this.setPos(position.x + this.sprite.width / 3, position.y - this.sprite.height / 2);
                break;
            case this.OrientationEnum.South:
                this.sprite = this.swordDown;
                this.setPos(position.x + this.sprite.width / 2, position.y + this.sprite.height / 2);
                break;
        }
    }

    /**
     * @param {*} orientation 
     */
    fire(orientation){
        this.collided = false;
        this.orientation = orientation;
        this.inFlight = true;

        switch(this.orientation){
            case this.OrientationEnum.North:
                this.updateVector = new Vector2(0,-5);
                this.sprite = this.animatedSwordUp;
                break;
            case this.OrientationEnum.South:
                this.updateVector = new Vector2(0,5);
                this.sprite = this.animatedSwordDown;
                break;
            case this.OrientationEnum.East:
                this.updateVector = new Vector2(5,0);
                this.sprite = this.animatedSwordRight;
                break;
            case this.OrientationEnum.West:
                this.updateVector = new Vector2(-5,0);
                this.sprite = this.animatedSwordLeft;
                break;
        }
    }

    /**
     * creating different animations sheets for each direction as well as directional attacks
     */
    setUpSprites(){
        // sword sprite
        this.swordRight = new AssetManager(0, 0, 64, 24, 0, 96);
        this.swordRight.setSpriteSheet("assets/sword.png", 3, 1);
        this.swordLeft = new AssetManager(0, 0, 64, 24, 0, 160);
        this.swordLeft.setSpriteSheet("assets/sword.png", 3, 1); 
        this.swordUp = new AssetManager(0, 0, 24, 64, 0, 0);
        this.swordUp.setSpriteSheet("assets/sword.png", 3, 1); 
        this.swordDown = new AssetManager(0, 0, 24, 64, 0, 48);
        this.swordDown.setSpriteSheet("assets/sword.png", 3, 1);

        //animated sword
        this.animatedSwordRight = new AssetManager(0, 0, 64, 24, 0, 96);
        this.animatedSwordRight.setSpriteSheet("assets/sword.png", 1, 2);
        this.animatedSwordRight.horizontalSheet = false;
        this.animatedSwordLeft = new AssetManager(0, 0, 64, 24, 0, 160);
        this.animatedSwordLeft.setSpriteSheet("assets/sword.png", 1, 2);
        this.animatedSwordLeft.horizontalSheet = false;

        this.animatedSwordUp = new AssetManager(0, 0, 24, 64, 0, 0);
        this.animatedSwordUp.setSpriteSheet("assets/sword.png", 1, 2); 
        this.animatedSwordDown = new AssetManager(0, 0, 24, 64, 0, 48);
        this.animatedSwordDown.setSpriteSheet("assets/sword.png", 1, 2);

        this.explosion = new AssetManager(200,200,18,21,1,1);
        this.explosion.setSpriteSheet("assets/SwordExplosion.png", 1, 2);
        this.explosion.setScale(2.5, 2.5);

        this.collider = new BoxCollider(new Vector2(0,0), 8 ,17, "sword", "obstacle");
    }

    /**
     * 
     * @param {*} ctx 
     */
    draw(ctx){
        if(this.collided){
            this.explosion.draw(ctx);
        }
        else{
            this.sprite.draw(ctx);
        }
    }
}
