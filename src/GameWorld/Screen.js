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
  }


  /**
   * Renders the tiles. If the screen is active, render the enemies/pickups
   * @param {context} ctx canvas context
   * @param {bool} active Whether the screen is active
   */
  render(ctx, active){
    this.grid.draw(ctx);
  }

  /**
   * 
   * @param {*} worldPos 
   */
  worldToScreen(worldPos){
    let localPos = worldPos;

    return localPos;
  }
}