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
    //this.playBtn = new AssetManager(200, 200, 500, 250, "mycanvas");
    this.instructions = new Image();
    this.instructions.src = "resources/images/InstructionMenu.png";


  }


  update()
  {
  }

/**
  * creates a canvas and context
  * changes the color of the background to green
  * changes the font and the font size
  */
  render()
  {


    //ctx.font = '100px serif'; //48
    //this.playBtn.draw();
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.game.ctx.drawImage(this.instructions,0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);

  // the outline
    

    // the fill color
    gameNs.game.ctx.font= "100px VT323"; //48
    gameNs.game.ctx.fillText(this.title, 700,900);
    //gameNs.game.ctx.fill();

    //ctx.fillText(this.title, 100,100);
  }


}
