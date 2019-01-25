/**
 * @description Player class that manages player entity
 * @author John O'Grady
 */
class Player extends Character {
  /**
   *
   * @param {Vector2} position
   * @param {Collider} collider
   * @param {Sprite} sprite
   */
  constructor(position, collider, sprite) {
    super(position, collider, sprite);

    this.CurrentUtility = Object.freeze({
      "Boomerang": 1,
      "Bomb": 2
    });
  }

  /**
   * initialise the player entity - bind functions for key handling and setup sprite
   */
  init() {
    console.log(this.util);

    //testing
    this.width = 48;
    this.height = 56;
    this.animating = false;
    this.attacking = false;
    this.attacked = false;
    this.swordBeam = false;
    this.currentUtil = this.CurrentUtility.Bomb;

    // binding functions for key handling
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.meleeAttack = this.meleeAttack.bind(this);
    this.useUtility = this.useUtility.bind(this);

    this.sword = new Sword('sword', 64, 24);
    this.projectile = new Sword('flying sword', 64, 24);
    this.bomb = new Bombs(50, 61);
    this.boomerang = new Boomerang(64, 64);

    //collectable variables and player info
    this.clock = 0;
    this.health = 6;
    this.maxHealth = 6;
    this.rupees = 0;
    this.bombs = 0;
    this.keys = 0;
    this.stopWatch = false;
    this.compass = false;
    this.map = false;
    this.hasSword = false;
    this.hasBoomerang = false;

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
  setIdle() {
    switch (this.orientation) {
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
  update(dt) {
    if (this.animating) {
      this.sprite.update();
    }
    if (this.attacking) {
      this.attackWindow--;
      if (this.attackWindow < 0) {
        this.attacking = false;
        this.attacked = true;
        this.attackDelay = 20;
        this.setIdle();
      }
    }
    if (this.attacked) {
      this.attackDelay--;
      if (this.attackDelay < 0) {
        this.attacked = false;
      }
    }
    if (this.bomb.alive) {
      this.bomb.update(dt);
    }
    if (this.attacking) {
      this.sword.update(dt);
    }
    if (this.projectile.inFlight) {
      this.projectile.update(dt);
    }
    if (this.boomerang.alive) {
      this.boomerang.update();
    }




        if(this.stopWatch){
            this.clock += dt;
            if(this.clock > 5000){
                this.clock = 0;
                this.stopWatch = false;
                this.alive = false;
            }
        }
        if (this.alive === false)
        {
          gameNs.game.result = "lose";
          this.changeScene("Ending");
        }

    this.sprite.setPos(this.position.x, this.position.y);
    this.collider.shape.position = new Vector2(this.position.x, this.position.y);
    this.animating = false;

    //console.log("World:  "+this.position.x+","+this.position.y);
    //console.log("Screen: "+Screen.worldToScreen(this.position).x+","+Screen.worldToScreen(this.position).y);
    console.log(this.position);
    console.log(Screen.worldToScreen(this.position, 1));
    if ((gameNs.game.interface.active === false) && (gameNs.game.interface.moving === false) && (this.stopwatch === false)) {
      gameNs.game.octo.update(gameNs.game.dt);
    }


  }

  /**
   * function to move the player up and update the sprite
   */
  moveUp() {
    if (!this.animating || !this.attacking) {
      this.keepOnScreen(new Vector2(0, -2));
      this.orientation = this.OrientationEnum.North;
      this.sprite = this.north;
      this.animating = true;
    }

  }
    setAlive()
    {
      this.alive = true;
    }
    changeScene(title)
    {
      gameNs.game.sceneManager.goToScene(title)
    }

  /**
   * function to move the player down and update the sprite
   */
  moveDown() {
    if (!this.animating || !this.attacking) {
      this.keepOnScreen(new Vector2(0, 2));
      this.orientation = this.OrientationEnum.South;
      this.sprite = this.south;
      this.animating = true;
    }
  }

  /**
   * function to move the player left and update the sprite
   */
  moveLeft() {
    if (!this.animating || !this.attacking) {
      this.keepOnScreen(new Vector2(-2, 0));
      this.orientation = this.OrientationEnum.West;
      this.sprite = this.west;
      this.animating = true;
    }
  }

  /**
   * function to move the player right and update the sprite
   */
  moveRight() {
    if (!this.animating || !this.attacking) {
      this.keepOnScreen(new Vector2(2, 0));
      this.orientation = this.OrientationEnum.East;
      this.sprite = this.east;
      this.animating = true;
    }
  }

  launchSword() {
    if (!this.swordBeam) {
      this.projectile.setPos(this.position.x, this.position.y);
      this.projectile.fire(this.orientation);
      this.swordBeam = true;
    }
  }

  plantBomb() {
    if (!this.bomb.alive && this.bombs > 0) {
      this.bombs--;
      this.bomb.plantBomb(this.orientation, this.position);
    }
  }

  throwBoomerang() {
    if (!this.boomerang.alive && this.hasBoomerang) {
      this.boomerang.throw(this.orientation, this.position);
    }
  }

  useUtility() {
    switch (this.currentUtil) {
      case this.CurrentUtility.Boomerang:
        this.throwBoomerang();
        break;
      case this.CurrentUtility.Bomb:
        this.plantBomb();
        break;
    }
  }

  processPickup(type) {
    switch (type) {
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
        if (this.health < this.maxHealth) {
          this.health++;
        }
        break;
      case "stopwatch":
        this.stopWatch = true;
        break;
      case "compass":
        this.compass = true;
        break;
      case "map":
        this.map = true;
        break;
      case "heartContainer":
        this.maxHealth++;
        break;
      case "triforcePiece":
        break;
      case "swordPickup":
        this.hasSword = true;
        break;
      case "fairy":
        this.health = this.maxHealth;
        break;
    }
  }

  /**
   * melee attack function - check the direction the player is facing
   * and attack in that dirction - create a timer to determine how long the
   * attack lasts
   */
  meleeAttack() {
    if (this.hasSword === true) {
      if (!this.animating && !this.attacked) {
        switch (this.orientation) {
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
        if (this.health === this.maxHealth) {
          this.launchSword();
        }

        this.attackWindow = 10;
        this.attacking = true;
        this.sprite.update();
      }
    }
  }

  /**
   * sizing up the sprite and rendering it
   */
  draw(ctx) {
    if (this.attacking) {
      this.sword.draw(ctx);
    }
    if (this.bomb.alive) {
      this.bomb.draw(ctx);
    }
    if (this.swordBeam) {
      this.projectile.draw(ctx);
    }
    if (this.boomerang.alive) {
      this.boomerang.draw(ctx);
    }
    this.sprite.horizontalSheet = false;
    this.sprite.draw(ctx);
  }

  /**
   * creating different animations sheets for each direction as well as directional attacks
   */
  setUpSprites() {
    this.west = new AssetManager(this.position.x, this.position.y, 48, 64, 0, 48);
    this.west.setSpriteSheet("resources/link.png", 4, 2);
    this.west.horizontalSheet = false;
    this.west.flipped = true;

    this.east = new AssetManager(this.position.x, this.position.y, 48, 64, 0, 48);
    this.east.setSpriteSheet("resources/link.png", 4, 2);
    this.east.horizontalSheet = false;

    this.north = new AssetManager(this.position.x, this.position.y, 48, 64, 0, 96);
    this.north.setSpriteSheet("resources/link.png", 4, 3);
    this.north.horizontalSheet = false;

    this.south = new AssetManager(this.position.x, this.position.y, 48, 64, 0, 0);
    this.south.setSpriteSheet("resources/link.png", 4, 3);
    this.south.horizontalSheet = false;

    // attack animations
    this.attackWest = new AssetManager(this.position.x, this.position.y, 48, 64, 64, 48);
    this.attackWest.setSpriteSheet("resources/link.png", 4, 1);
    this.attackWest.flipped = true;

    this.attackEast = new AssetManager(this.position.x, this.position.y, 48, 64, 64, 48);
    this.attackEast.setSpriteSheet("resources/link.png", 4, 1);

    this.attackNorth = new AssetManager(this.position.x, this.position.y, 48, 64, 0, 144);
    this.attackNorth.setSpriteSheet("resources/link.png", 3, 1);

    this.attackSouth = new AssetManager(this.position.x, this.position.y, 48, 64, 64, 144);
    this.attackSouth.setSpriteSheet("resources/link.png", 3, 1);

    this.sprite = this.north;
  }
}
