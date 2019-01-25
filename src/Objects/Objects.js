/**
 * @description Items that appear on overworld and can be interacted with
 * @author John O'Meara
 */
class Objects {

  /**
   * Constructs the base object class
   * @param {string} type the type of pickup (for tagging)
   * @param {number} x x-coordinatr
   * @param {number} y y-coordinate
   * @param {number} w width
   * @param {number} h height
   * @param {number} frameWidth width of the image on spritesheet
   * @param {number} frameHeight height of the image on spritesheet
   * @param {number} frameTop y-coordinate of frame
   * @param {number} frameLeft x-coordinate of frame
   * @param {number} ticksperframe ticks per frame
   * @param {number} numberperframe frame count
   * @param {string} filepath path to spritesheet
   */
  constructor(type, x, y, w, h, frameWidth, frameHeight, frameTop, frameLeft, ticksperframe, numberperframe, filepath) {
    // position
    this.pos = {
      x: x,
      y: y,
    };

    this.alive = true;
    this.type = type;

    // sprite
    this.sprite = new AssetManager(
      this.pos.x,
      this.pos.y,
      frameWidth,
      frameHeight,
      frameTop,
      frameLeft
    );
    this.sprite.setSpriteSheet(filepath, ticksperframe, numberperframe);
    this.sprite.setScale(w/frameWidth, h/frameHeight);

    // collider
    this.bounds = new BoxCollider(
      new Vector2(
        this.pos.x,
        this.pos.y
      ),
      w,
      h,
      ['pickup'],
      ['flying sword', 'enemy']
    );
    gameNs.game.collisionManager.addBoxCollider(this.bounds);
  }

  /**
   * Keeps the sprite and collider position correct
   */
  updatePos() {
    this.sprite.setPos(this.pos.x, this.pos.y);
    this.bounds.setPos(this.pos.x, this.pos.y);
  }

  update(){
    if(this.alive)
    {
      this.sprite.update();
      if (gameNs.game.collisionManager.boxCollidedWithTag(this.bounds, 'player') 
      || gameNs.game.collisionManager.boxCollidedWithTag(this.bounds, 'sword')) {
        this.alive = false;
        gameNs.game.player.processPickup(this.type);
        gameNs.game.collisionManager.removeBoxCollider(this.bounds);
        gameNs.game.collisionManager.checkBoxColliderArray();
      }
    }
  }

  /**
   * Renders the object to the screen
   * @param {context} ctx context
   */
  draw(ctx) {
    if(this.alive)
    {
      this.sprite.draw(ctx);
    }
  }
}

