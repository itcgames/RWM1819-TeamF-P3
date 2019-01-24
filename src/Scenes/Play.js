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
    this.overworld = [];
    this.activeScreen = 0;
    this.scrolling = false;

    //this.camera = new Camera(0,0,64*16,64*13);
    this.title = title;
  }

    /**
  * initWorld
  * @desc Initialises game world
  */
  initWorld()
  {
    this.overworld.push(
      new Screen("Screen01"),
      new Screen("Screen02"),
      new Screen("Screen03"),
      new Screen("Screen04"),
      new Screen("Screen05"),
      new Screen("Screen06"),
      new Screen("Screen07"),
      new Screen("Screen08"),
      new Screen("Screen09"),
      new Screen("Screen10"),
      new Screen("Screen11")
    );
    // Interface testing
    gameNs.game.interface = new Interface(gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.game.globalInput.bind(gameNs.game.interface.trigger, "p");
  }

  /**
  * update
  * @desc calls draw and itself recursively also updates animations
  */
  update(dt)
  {
    // for(let i = 0; i < overworld[active.x][active.y].grid.enemyList.length(); i++){
    //   overworld[active.x][active.y].grid.enemyList[i];
    // }
    for(let i = 0; i < this.overworld[this.activeScreen].enemyList.length; i++){
      this.overworld[this.activeScreen].enemyList[i].update(dt);
    }
    //this.camera.follow(gameNs.game.player.position.x, gameNs.game.player.position.y);
    gameNs.game.player.update(gameNs.game.dt);

    gameNs.game.interface.update();

  }

  /**
   * Moves the camera from the current screen to the new screen
   * @param {Screen} newScreen The screen the player's entering
   */
  transition(newScreen){

  }

  draw()
  {
    //gameNs.game.tileGrid.draw(gameNs.game.ctx);
    //gameNs.game.octo.draw(gameNs.game.ctx);

    //this.camera.draw(0,gameNs.game.ctx);
    for(let i = 0; i < this.overworld.length; i++){
      this.overworld[this.activeScreen].render(gameNs.game.ctx, true);
    }

    gameNs.game.collisionManager.render(gameNs.game.ctx);

    gameNs.game.player.draw(gameNs.game.ctx);

    gameNs.game.testHeart.render(gameNs.game.ctx);
    gameNs.game.testBomb.render(gameNs.game.ctx);
    gameNs.game.testRupee.render(gameNs.game.ctx);
    gameNs.game.testKey.render(gameNs.game.ctx);

    gameNs.game.interface.render(gameNs.game.ctx);
  }
}
