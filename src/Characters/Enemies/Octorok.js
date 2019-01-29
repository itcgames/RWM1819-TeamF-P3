class Octorok extends Npc {

  /**
   * 
   * @param {Vector2} position 
   * @param {Collider} collider 
   * @param {Grid} grid 
   */
  constructor(position, collider, grid) {
    super(position, collider, grid);
    this.timer = 0;
    this.alive = true;
    this.collider = new BoxCollider(new Vector2(this.position.x,this.position.y,),this.tileSize,this.tileSize,['enemy']);
    this.sprite = new AssetManager(this.position.x, this.position.y, 64, 64, 64, 0);
    this.sprite.setSpriteSheet('resources/npcSprites.png', 1, 1);
    gameNs.game.collisionManager.addBoxCollider(this.collider);
  }

  /**
   * 
   * @param {DeltaTime} dt 
   */
  update(dt) {
    if (this.alive) {
      this.timer += dt;
      if (this.timer > 200) {
        this.wander();
        this.timer = 0;
      }

      if (this.sprite !== null){
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
      }

      if (gameNs.game.collisionManager.boxCollidedWithTag(this.collider, 'sword')) {
        this.alive = false;
      }
      if (gameNs.game.player.bomb.exploded) {
        if (gameNs.game.collisionManager.boxCollidedWithTag(this.collider, 'explosion')) {
          this.alive = false;
        }
      }
      if (gameNs.game.player.boomerang.alive) {
        if (gameNs.game.collisionManager.boxCollidedWithTag(this.collider, 'boomerang')) {
          this.alive = false;
        }
      }

      if (gameNs.game.collisionManager.boxCollidedWithTag(this.collider, 'player')) {
        if(this.alive){
          gameNs.game.player.health--;
        }
      }

      if(!this.alive){
        var i = Npc.RandomNum(0, 5);
        gameNs.game.play.spawnPickup(i, this.position);
      }
    }
  }

  /**
   * 
   * @param {Canvas Context} ctx 
   */
  draw(ctx) {
    if (this.alive) {
      //  If the sprite is empty don't try and draw it, instead draw a rectangle.
      if (this.sprite !== null) {
        this.sprite.draw(ctx);
      } else {
        //  Draw a outline for the tile.
        ctx.beginPath()
        ctx.fillStyle = "Black";
        ctx.rect(this.position.x, this.position.y, this.tileSize, this.tileSize);
        ctx.fill();

        //  Draw a rectangle to represent the tile.
        ctx.beginPath();
        ctx.fillStyle = "Red";
        ctx.rect(this.position.x + 2, this.position.y + 2, this.tileSize - 2, this.tileSize - 2);
        ctx.fill();
      }
    }
  }
}