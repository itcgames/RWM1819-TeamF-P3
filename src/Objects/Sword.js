class Sword extends Projectile{
    constructor(width, height){
        super(width, height);
        this.setUpSprites();
    }

    update(){
        switch(this.orientationEnum){
            case this.OrientationEnum.North:
            this.setPos(this.position.x, this.position.y - 5);
            this.sprite = this.animatedSwordUp;
            this.collider.shape.width = 8;
            this.collider.shape.height = 16;
            break;
            case this.OrientationEnum.South:
            this.setPos(this.position.x, this.position.y + 5);
            this.sprite = this.animatedSwordDown;
            this.collider.shape.width = 8;
            this.collider.shape.height = 16;
            break;
            case this.OrientationEnum.East:
            this.setPos(this.position.x + 5, this.position.y);
            this.sprite = this.animatedSwordRight;
            this.collider.shape.width = 16;
            this.collider.shape.height = 8;
            break;
            case this.OrientationEnum.West:
            this.setPos(this.position.x - 5, this.position.y);
            this.sprite = this.animatedSwordLeft;
            this.collider.shape.width = 16;
            this.collider.shape.height = 8;
            break;
        }
        this.sprite.setPos(this.position.x, this.position.y);
        this.sprite.update();
    }

    fire(orientation){
        this.orientationEnum = orientation;
        this.alive = true;
    }

    setUpSprites(){
        //animated sword
        this.animatedSwordRight = new AssetManager(0, 0, 16, 8, 0, 0);
        this.animatedSwordRight.setSpriteSheet("assets/Sword.png", 1, 2);
        this.animatedSwordLeft = new AssetManager(0, 0, 16, 8, 0, 52);
        this.animatedSwordLeft.setSpriteSheet("assets/Sword.png", 1, 2); 
        this.animatedSwordUp = new AssetManager(0, 0, 8, 16, 0, 34);
        this.animatedSwordUp.setSpriteSheet("assets/Sword.png", 1, 2); 
        this.animatedSwordDown = new AssetManager(0, 0, 8, 16, 0, 18);
        this.animatedSwordDown.setSpriteSheet("assets/Sword.png", 1, 2);
    }

    draw(ctx){
        this.sprite.setScale(2.5, 2.5);
        this.sprite.draw(ctx);
    }
}
