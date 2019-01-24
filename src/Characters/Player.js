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
        this.height = 32;
        this.animating = false;
        this.attacking = false;
        this.attacked = false;

        // binding functions for key handling
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.meleeAttack = this.meleeAttack.bind(this);

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
            "player"
        );
        gameNs.game.collisionManager.addBoxCollider(this.collider);

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

    update(dt, cols){
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
        this.collider.shape.position = new Vector2(this.position.x, this.position.y);

        if (gameNs.game.collisionManager.boxCollidedWithTag(this.collider, 'heart')) {
            console.log('heart');
            if(this.health < 6){
                this.health += 1;
            }
        }
        if (gameNs.game.collisionManager.boxCollidedWithTag(this.collider, 'bomb')) {
            console.log('bomb');
            this.bombs++;
        }
        if (gameNs.game.collisionManager.boxCollidedWithTag(this.collider, 'rupee')) {
            console.log('rupee');
            this.rupees++;
        }
        if (gameNs.game.collisionManager.boxCollidedWithTag(this.collider, 'key')) {
            console.log('key');
            this.keys++;
        }

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
        this.sprite.draw(ctx);
    }

    setUpSprites(){
        // testing
        this.west = new AssetManager(this.position.x, this.position.y, this.width, this.height,0,240);
        this.west.setSpriteSheet("resources/test.png", 3, 8);

        this.east = new AssetManager(this.position.x, this.position.y, this.width, this.height,0,240);
        this.east.setSpriteSheet("resources/test.png", 3, 8);
        this.east.flipped = true;

        this.north = new AssetManager(this.position.x, this.position.y, this.width, this.height,120,0);
        this.north.setSpriteSheet("resources/test.png", 3, 8);
        this.north.width = 30;
        this.north.height = 30;

        this.south = new AssetManager(this.position.x, this.position.y, this.width, this.height,32,0);
        this.south.setSpriteSheet("resources/test.png", 3, 8);
        this.south.width = 30;
        this.south.height = 30;

        this.attackWest = new AssetManager(this.position.x, this.position.y, this.width, this.height, 90, 294);
        this.attackWest.setSpriteSheet("resources/test.png", 3, 1)
        this.attackWest.width = 32;
        this.attackWest.height = 32;

        this.attackEast = new AssetManager(this.position.x, this.position.y, this.width, this.height, 90, 294);
        this.attackEast.setSpriteSheet("resources/test.png", 3, 1)
        this.attackEast.width = 32;
        this.attackEast.height = 32;
        this.attackEast.flipped = true;

        this.attackNorth = new AssetManager(this.position.x, this.position.y, this.width, this.height, 176, 54);
        this.attackNorth.setSpriteSheet("resources/test.png", 3, 1)
        this.attackNorth.width = 28;
        this.attackNorth.height = 34;

        this.attackSouth = new AssetManager(this.position.x, this.position.y, this.width, this.height, 88, 86);
        this.attackSouth.setSpriteSheet("resources/test.png", 3, 1)
        this.attackSouth.width = 28;
        this.attackSouth.height = 32;

        this.sprite = this.north;
    }
}