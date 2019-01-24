/**
 * @author Conor O'Toole
 * C00206724
 * This scene loads all scenes inot the scene manager
 * It updates and renders every class
 * It initialises the first scene alsos
 */

class Play
{
  constructor()
  {
    this.overworld = [];
    this.activeScreen = {
      x: 0,
      y: 0
    };
    this.scrolling = false;

    //this.camera = new Camera(0,0,64*10,13*10);
  }

    /**
  * initWorld
  * @desc Initialises game world
  */
  initWorld()
  {
  }

  /**
 * update
 * @desc calls draw and itself recursively also updates animations
 */
  update()
  {
    console.log("updating play");

    for(i = 0; i < overworld[active.x][active.y].grid.enemyList.length(); i++){
      overworld[active.x][active.y].grid.enemyList[i];
    }
  }

  /**
   * Moves the camera from the current screen to the new screen
   * @param {Screen} newScreen The screen the player's entering
   */
  transition(newScreen){

  }

  render()
  {
    //this.camera.draw(0,ctx);
  }
}
