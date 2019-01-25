/**
 * @author Conor O'Toole
 * C00206724
 * The scene for the Instruction menu
 */

class EndScene
{
/**
  * @param {title} string title of the EndScene Scene.
  */
  constructor(title)
  {
    this.title = title;
    //this.playBtn = new AssetManager(200, 200, 500, 250, "mycanvas");
    this.win = new Image();
    this.lose = new Image();
    this.win.src = "resources/win.png";
    this.lose.src = "resources/lose.png";
    this.tipText = "Press 'r' to return";
    this.winText = "Congrats on beating Zelda";
    this.flash = 0;


  }


  update()
  {
  }


  reset()
  {
    if (gameNs.game.sceneManager.getScene() === "Ending")
    {
      gameNs.game.play.initWorld();
      gameNs.game.player.setAlive();
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


    //ctx.font = '100px serif'; //48
    //this.playBtn.draw();
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.game.ctx.fillStyle = "Black";
    gameNs.game.ctx.fillRect(0,0,gameNs.game.canvas.width, gameNs.game.canvas.height);

    if ( gameNs.game.result === "win")
    {
      gameNs.game.ctx.drawImage(this.win,50, 75, 1000, 400);
    }
    if ( gameNs.game.result === "lose")
    {
      gameNs.game.ctx.drawImage(this.lose,50, 75, 1000, 400);
    }

  // the outline
    gameNs.game.ctx.fillStyle = "green"; //yellow
    gameNs.game.ctx.font= "100px VT323"; //48
    gameNs.game.ctx.fillText(this.winText, 0,500);

    // the prompt text
    gameNs.game.ctx.fillStyle = "#FFCC00"; //yellow


    if (this.flash >= 60 && this.flash <= 120 )
    {
        gameNs.game.ctx.fillText(this.tipText, 100,600);
    }
    if (this.flash < 120)
    {
      this.flash++;
    }
    if (this.flash >= 120)
      {
        this.flash = 0;
      }




  }


}
