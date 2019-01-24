class Octorok extends Npc {
    
    /**
     * 
     * @param {Vector2} position 
     * @param {Collider} collider 
     * @param {Sprite} sprite 
     * @param {Grid} grid 
     */
    constructor(position, collider, sprite, grid){
        super(position, collider, sprite, grid);

        this.timer = 0;
        this.alive = true;

        this.collider = new BoxCollider(
            new Vector2(
                this.position.x,
                this.position.y,
            ),
            this.tileSize,
            this.tileSize,
            ['enemy']
        );

        gameNs.game.collisionManager.addBoxCollider(this.collider);
    }

    /**
     * 
     * @param {DeltaTime} dt 
     */
    update(dt){
        if(this.alive){
            this.timer += dt;     
            if (this.timer > 500){
                this.wander();
                this.timer = 0;
            }
            
            if (gameNs.game.collisionManager.boxCollidedWithTag(this.collider, 'sword')) {
                this.alive = false;
            }
            if(gameNs.game.player.bomb.exploded){
                if (gameNs.game.collisionManager.boxCollidedWithTag(this.collider, 'explosion')) {
                    this.alive = false;
                }
            }
        }
    }

    /**
     * 
     * @param {Canvas Context} ctx 
     */
    draw(ctx){
        if(this.alive){
            //  If the sprite is empty don't try and draw it, instead draw a rectangle.
            if (this.sprite !== null){
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