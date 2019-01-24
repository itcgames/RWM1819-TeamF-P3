/**
 * @description Describes one screen of the world
 * @author John O'Meara
 */
class Screen {

  /**
   * 
   * @param {NPC Array} enemies 
   */
  constructor(enemies){

    this.grid = new Grid(64,16,11);

    this.enemyList = [];
    this.pickupList = [];
  }


  /**
   * Called when the player enters the screen.
   * Creates enemies on screen
   */
  enter(){
    
  }

  /**
   * Called when the player leaves the screen.
   * Destroys enemies on screen
   */
  leave(){

  }
}