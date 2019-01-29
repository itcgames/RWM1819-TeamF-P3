/**
 * @description Describes one screen of the world
 * @author John O'Meara
 */
class Screen {

  /**
   *
   * @param {NPC Array} enemies
   * @param {string} name
   */
  constructor(name){

    this.grid = new Grid(64,name);

    this.enemyList = [];
    this.pickupList = [];

    this.enemyList.push(new Octorok(new Vector2(this.grid.position.x + (5 * this.grid.tileSize), this.grid.position.y + (5 * this.grid.tileSize)), new BoxCollider(), this.grid));
  }


  /**
   * Renders the tiles.
   * @param {context} ctx canvas context
   */
  render(ctx){
    this.grid.draw(ctx);
  }

  /**
   * Renders the monsters, pickups
   * @param {context} ctx canvas context
   */
  renderActive(ctx){
    for(let i = 0; i < this.enemyList.length; i++){
      this.enemyList[i].draw(ctx);
    }
    for(let i = 0; i < this.pickupList.length; i++){
      this.pickupList[i].render(ctx);
    }
  }


  static worldToScreen(worldPos, index){
    const i = index || gameNs.game.play.activeScreen;

    const scr = gameNs.game.play.overworld[i];
    let localPos = new Vector2(
      worldPos.x,
      worldPos.y
    );

    localPos.x -= scr.grid.position.x;
    localPos.y -= scr.grid.position.y;

    return localPos;
  }
}
