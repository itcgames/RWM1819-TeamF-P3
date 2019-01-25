/**
 * @description Bomb class inherits from utility, bomb for player character
 * @author John O'Grady
 */
class Bombs extends Utility {
  constructor(width, height) {
    super(width, height);

    this.clock = 0;
    this.exploded = false;
    this.collider = new BoxCollider(
      new Vector2(
        this.position.x,
        this.position.y,
      ),
      this.height,
      this.width,
      ['explosion'],
      ['pickup', 'obstacle']
    );
    gameNs.game.collisionManager.addBoxCollider(this.collider);

    this.setUpSprites();
  }

  /**
   * 
   * @param {*} dt 
   */
  update(dt) {
    this.clock += dt;
    this.sprite.setPos(this.position.x, this.position.y);
    if (this.clock > 1000) {
      this.clock = 0;
      this.exploded = true;
    }
    if (this.exploded) {
      this.explosion.setPos(this.position.x - this.explosion.width / 3, this.position.y - this.explosion.height / 3.5);
      this.explosion.update(dt);
      if (this.clock > 100) {
        this.exploded = false;
        this.alive = false;
      }
    }
  }

  /**
   * 
   * @param {*} orientation 
   * @param {*} position
   */
  plantBomb(orientation, position) {
    this.alive = true;
    switch (orientation) {
      case this.OrientationEnum.East:
        this.setPos(position.x + this.sprite.width, position.y + this.sprite.height / 2);
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

  setUpSprites() {
    this.sprite = new AssetManager(0, 0, this.width, this.height, 0, 0);
    this.sprite.setSpriteSheet("resources/objects.png", 3, 1);
    this.sprite.setScale(25 / this.width, 25 / this.height);

    this.explosion = new AssetManager(0, 0, 228, 283, 0, 0);
    this.explosion.setSpriteSheet("resources/smoke.png", 3, 2);
    this.explosion.setScale(192 / this.explosion.width, 192 / this.explosion.height);

    this.collider.shape.width = 192;
    this.collider.shape.height = 192;
  }

  /**
   * 
   * @param {*} ctx 
   */
  draw(ctx) {
    this.sprite.draw(ctx);
    if (this.exploded) {
      this.explosion.draw(ctx);
    }
  }
}