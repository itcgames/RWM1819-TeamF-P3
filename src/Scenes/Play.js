/**
 * @author Conor O'Toole
 * C00206724
 * This scene loads all scenes inot the scene manager
 * It updates and renders every class
 * It initialises the first scene alsos
 */

class Play
{
  constructor(title)
  {
    this.title = title;
  }
    /**
  * initWorld
  * @desc Initialises game world
  */
  initWorld()
  {
    gameNs.game.tileGrid = new Grid(64, 16, 13);
    console.log("intiWOrld");
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

  }

  draw()
  {
    //  Render game objects here.
      gameNs.game.tileGrid.draw(gameNs.game.ctx);

    //this.collisionManager.render(this.ctx);

    gameNs.game.player.draw(gameNs.game.ctx);

    gameNs.game.interface.render(gameNs.game.ctx);
  }
}
