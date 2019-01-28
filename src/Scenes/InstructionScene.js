/**
 * @author Conor O'Toole
 * C00206724
 * The scene for the Instruction menu
 */

class InstructionsScene
{
/**
  * @param {title} string title of the Instructions Scene.
  * This construcor uses the keyword super to inherit from the Scene class
  */
  constructor(title)
  {
    this.title = title;
    this.instructions = new Image();
    this.instructions.src = "resources/InstructionMenu.png";
  }


  update()
  {
  }

  comeBack()
  {
    if (gameNs.game.sceneManager.getScene() === "Instructions")
    {
      gameNs.game.sceneManager.goToScene("Menu");
    }
  }
/**
  * creates a canvas and context
  * changes the color of the background to green
  * changes the font and the font size
  */
  draw()
  {
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.game.ctx.drawImage(this.instructions,0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
  }


}
