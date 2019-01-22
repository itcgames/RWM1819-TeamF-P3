var that = {};

class Player{
    constructor(){
    }

    init(){
        that = this;

        this.direction = "North";
        this.alive = true;
        this.position = {x:400, y:400};
        //testing
        this.width = 24;
        this.height = 28;
        this.animating = false;
        this.attacking = false;
        this.attacked = false;

        // binding functions for key handling
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.meleeAttack = this.meleeAttack.bind(this);

        this.setUpSprites();
    }

    setIdle(){
        switch(this.direction){
            case "East":
            this.sprite = this.east;
            break;
            case "West":
            this.sprite = this.west;
            break;
            case "North":
            this.sprite = this.north;
            break;
            case "South":
            this.sprite = this.south;
            break;
        }
        this.sprite.frameIndex = 0;
    }

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

        this.sprite.setPos(this.position.x, this.position.y);
        this.animating = false;
    }

    moveUp(){
        if(!this.animating || !this.attacking){
            this.position.y -= 5;
            this.direction = "North";
            this.sprite = this.north;
            this.animating = true;
        }
    }

    moveDown(){
        if(!this.animating || !this.attacking){
            this.position.y += 5;
            this.direction = "South";
            this.sprite = this.south;
            this.animating = true;
        }
    }

    moveLeft(){
        if(!this.animating || !this.attacking){
            this.position.x -= 5;
            this.direction = "West";
            this.sprite = this.west;
            this.animating = true;
        }
    }

    moveRight(){
        if(!this.animating || !this.attacking){
            this.position.x += 5;
            this.direction = "East";
            this.sprite = this.east;
            this.animating = true;
        }
    }

    meleeAttack(){
        if(!this.animating && !this.attacked){
            switch(this.direction){
                case "East":
                this.sprite = this.attackEast;
                break;
                case "West":
                this.sprite = this.attackWest;
                break;
                case "North":
                this.sprite = this.attackNorth;
                break;
                case "South":
                this.sprite = this.attackSouth;
                break;
            }
            this.attackWindow = 10;
            this.attacking = true;
            
            this.sprite.update();
        }
    }

    draw(ctx){
        this.sprite.setScale(2,2);
        this.sprite.draw(ctx);
    }

    setUpSprites(){
        // testing
        this.west = new AssetManager(this.position.x, this.position.y, this.width, this.height,0,240);
        this.west.setSpriteSheet("assets/test.png", 3, 8);

        this.east = new AssetManager(this.position.x, this.position.y, this.width, this.height,0,240);
        this.east.setSpriteSheet("assets/test.png", 3, 8);
        this.east.flipped = true;

        this.north = new AssetManager(this.position.x, this.position.y, this.width, this.height,120,0);
        this.north.setSpriteSheet("assets/test.png", 3, 8);
        this.north.width = 30;
        this.north.height = 28;

        this.south = new AssetManager(this.position.x, this.position.y, this.width, this.height,32,0);
        this.south.setSpriteSheet("assets/test.png", 3, 8);
        this.south.width = 30;
        this.south.height = 28;

        this.attackWest = new AssetManager(this.position.x, this.position.y, this.width, this.height, 90, 296);
        this.attackWest.setSpriteSheet("assets/test.png", 3, 1)
        this.attackWest.width = 30;
        this.attackWest.height = 30;

        this.attackEast = new AssetManager(this.position.x, this.position.y, this.width, this.height, 90, 296);
        this.attackEast.setSpriteSheet("assets/test.png", 3, 1)
        this.attackEast.width = 30;
        this.attackEast.height = 30;
        this.attackEast.flipped = true;

        this.attackNorth = new AssetManager(this.position.x, this.position.y, this.width, this.height, 176, 54);
        this.attackNorth.setSpriteSheet("assets/test.png", 3, 1)
        this.attackNorth.width = 28;    
        this.attackNorth.height = 32;

        this.attackSouth = new AssetManager(this.position.x, this.position.y, this.width, this.height, 88, 86);
        this.attackSouth.setSpriteSheet("assets/test.png", 3, 1)
        this.attackSouth.width = 28;
        this.attackSouth.height = 32;

        this.sprite = this.north;
    }
}