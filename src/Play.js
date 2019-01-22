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

  }
    /**
  * initWorld
  * @desc Initialises game world
  */
  initWorld()
  {
    gameNs.game.tileGrid = new Grid(64, 16, 13);

    // Interface testing
    gameNs.game.interface = new Interface(gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.game.input.bind(gameNs.game.interface.trigger, "p");
  }

  /**
 * update
 * @desc calls draw and itself recursively also updates animations
 */
  update()
  {
    gameNs.game.player.update(gameNs.game.dt);

    gameNs.game.interface.update()

    console.log("updating play");
  }

  draw()
  {
    //  Render game objects here.
    this.tileGrid.draw(this.ctx);

    //this.collisionManager.render(this.ctx);

    gameNs.game.player.draw(this.ctx);

    gameNs.game.interface.render(this.ctx);
  }
}
