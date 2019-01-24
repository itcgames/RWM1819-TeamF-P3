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